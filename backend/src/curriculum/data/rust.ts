import type { Course, MasteryAssessment } from '../types.js';

export const RUST_COURSE: Course = {
  "id": "rust",
  "slug": "rust",
  "language": "rust",
  "title": "Rust",
  "description": "Learn Rust from the ground up: ownership, borrowing, traits, error handling, concurrency and async, with a working program in every lesson and real projects along the way.",
  "difficulty": "All levels",
  "estimatedHours": 60,
  "skills": [
    "Ownership and borrowing",
    "Structs, enums and pattern matching",
    "Error handling with Result",
    "Generics and traits",
    "Iterators and collections",
    "Testing in Rust",
    "Concurrency with threads and channels",
    "Async Rust with Tokio",
    "Systems programming"
  ],
  "prerequisites": [],
  "modules": [
    {
      "id": "rust-m1",
      "title": "Introduction",
      "description": "Introduction: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "rust-m1-l1",
          "slug": "rust-m1-l1",
          "title": "What Is Rust?",
          "objectives": [
            "Explain what What Is Rust? is and when to use it",
            "Write the What Is Rust? pattern from the syntax in this lesson",
            "Build a small Rust program that uses What Is Rust? correctly"
          ],
          "introduction": "What Is Rust? is a core part of writing Rust. Rust is a systems programming language that gives you control over memory without a garbage collector, while the compiler checks memory safety before your program ever runs. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Rust is a systems programming language that gives you control over memory without a garbage collector, while the compiler checks memory safety before your program ever runs. It is fast like C and C++, but its ownership rules prevent entire classes of bugs such as use-after-free and data races. Rust is used for operating systems, browsers, servers and embedded devices. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn main() {\n    println!(\"Hello, world!\");\n}",
          "analogy": "Like a strict but fair building inspector who checks the plans before construction starts, not after the roof falls in.",
          "exampleCode": "fn main() {\n    let message = String::from(\"ferris\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem What Is Rust? solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = ferris'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the What Is Rust? syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to What Is Rust?, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the What Is Rust? pattern from this lesson.",
          "summary": "Rust is a systems programming language that gives you control over memory without a garbage collector, while the compiler checks memory safety before your program ever runs. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use What Is Rust? in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of What Is Rust??",
              "options": [
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "give low-level control with compile-time memory safety and no garbage collector",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Give low-level control with compile-time memory safety and no garbage collector — that is the purpose of What Is Rust?."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = ferris"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = ferris'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m1-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises What Is Rust?.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * n);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for square a number, and prints it. It follows the What Is Rust? pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "6",
                  "expectedStdout": "36",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "9",
                  "expectedStdout": "81",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for What Is Rust?: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m1-l2",
          "slug": "rust-m1-l2",
          "title": "Installing Rust and Cargo",
          "objectives": [
            "Explain what Installing Rust and Cargo is and when to use it",
            "Write the Installing Rust and Cargo pattern from the syntax in this lesson",
            "Build a small Rust program that uses Installing Rust and Cargo correctly"
          ],
          "introduction": "Installing Rust and Cargo is a core part of writing Rust. Rust is installed with rustup, which manages toolchains, and every project is managed by Cargo, the build tool and package manager. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Rust is installed with rustup, which manages toolchains, and every project is managed by Cargo, the build tool and package manager. Cargo creates a project with cargo new, builds it with cargo build, runs it with cargo run, and fetches dependencies from crates.io. A Cargo.toml file describes your project and its dependencies. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "cargo new hello\ncargo run",
          "analogy": "Like a workshop that comes with the tools, the parts catalogue and the instruction manual in one box.",
          "exampleCode": "fn main() {\n    let count = 42;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Installing Rust and Cargo solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 42'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Installing Rust and Cargo syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Installing Rust and Cargo, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Installing Rust and Cargo pattern from this lesson.",
          "summary": "Rust is installed with rustup, which manages toolchains, and every project is managed by Cargo, the build tool and package manager. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Installing Rust and Cargo in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Installing Rust and Cargo?",
              "options": [
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "manage Rust projects, builds and dependencies with Cargo"
              ],
              "answer": 3,
              "explanation": "Manage Rust projects, builds and dependencies with Cargo — that is the purpose of Installing Rust and Cargo."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 42",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 42'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m1-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Installing Rust and Cargo.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n + 10);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add ten, and prints it. It follows the Installing Rust and Cargo pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "15",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "0",
                  "expectedStdout": "10",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Installing Rust and Cargo: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m2",
      "title": "Variables",
      "description": "Variables: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "rust-m2-l1",
          "slug": "rust-m2-l1",
          "title": "Declaring Variables with let",
          "objectives": [
            "Explain what Declaring Variables with let is and when to use it",
            "Write the Declaring Variables with let pattern from the syntax in this lesson",
            "Build a small Rust program that uses Declaring Variables with let correctly"
          ],
          "introduction": "Declaring Variables with let is a core part of writing Rust. Variables in Rust are declared with let and are immutable by default, which means you cannot change their value after assigning it. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Variables in Rust are declared with let and are immutable by default, which means you cannot change their value after assigning it. The compiler usually infers the type, but you can write it explicitly, as in let count: i32 = 5. Immutability by default makes code easier to reason about, because a value cannot change unexpectedly. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let count = 5;\nlet name: &str = \"Ada\";",
          "analogy": "Like writing a value in pen instead of pencil: it stays as it is unless you deliberately choose otherwise.",
          "exampleCode": "fn main() {\n    let count = 5;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Declaring Variables with let solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Declaring Variables with let syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Declaring Variables with let, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Declaring Variables with let pattern from this lesson.",
          "summary": "Variables in Rust are declared with let and are immutable by default, which means you cannot change their value after assigning it. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Declaring Variables with let in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Declaring Variables with let?",
              "options": [
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "declare immutable bindings with let and let the compiler infer the type"
              ],
              "answer": 3,
              "explanation": "Declare immutable bindings with let and let the compiler infer the type — that is the purpose of Declaring Variables with let."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 5",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 5'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m2-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Declaring Variables with let.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] * parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for multiply two numbers, and prints it. It follows the Declaring Variables with let pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "12",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "5 6",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Declaring Variables with let: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m2-l2",
          "slug": "rust-m2-l2",
          "title": "Mutability",
          "objectives": [
            "Explain what Mutability is and when to use it",
            "Write the Mutability pattern from the syntax in this lesson",
            "Build a small Rust program that uses Mutability correctly"
          ],
          "introduction": "Mutability is a core part of writing Rust. Adding mut to a declaration, as in let mut count = 0, allows the variable to be reassigned later, while its type still cannot change. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Adding mut to a declaration, as in let mut count = 0, allows the variable to be reassigned later, while its type still cannot change. Rust makes mutability explicit so that anyone reading the code can see which values are meant to change. Use mut only where a value genuinely needs to change over time. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let mut count = 0;\ncount += 1;",
          "analogy": "Like a whiteboard instead of a printed sign: you can erase and rewrite it, but only because you chose a whiteboard.",
          "exampleCode": "fn main() {\n    let count = 1;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Mutability solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 1'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Mutability syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Mutability, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Mutability pattern from this lesson.",
          "summary": "Adding mut to a declaration, as in let mut count = 0, allows the variable to be reassigned later, while its type still cannot change. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Mutability in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Mutability?",
              "options": [
                "allow reassignment by marking a variable mut",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Allow reassignment by marking a variable mut — that is the purpose of Mutability."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 1",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 1'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m2-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Mutability.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    if n % 2 == 0 { println!(\"even\"); } else { println!(\"odd\"); }\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for even or odd, and prints it. It follows the Mutability pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "4",
                  "expectedStdout": "even",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "7",
                  "expectedStdout": "odd",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Mutability: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m3",
      "title": "Data Types",
      "description": "Data Types: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 3,
      "lessons": [
        {
          "id": "rust-m3-l1",
          "slug": "rust-m3-l1",
          "title": "Scalar Types",
          "objectives": [
            "Explain what Scalar Types is and when to use it",
            "Write the Scalar Types pattern from the syntax in this lesson",
            "Build a small Rust program that uses Scalar Types correctly"
          ],
          "introduction": "Scalar Types is a core part of writing Rust. Rust has four scalar types: integers such as i32 and u64, floating-point numbers f32 and f64, booleans, and characters. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Rust has four scalar types: integers such as i32 and u64, floating-point numbers f32 and f64, booleans, and characters. Integer types differ by size and signedness, and choosing the right one matters for range and overflow behaviour. Numbers default to i32 and f64 when the type is not written out. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let a: i32 = -7;\nlet b: f64 = 3.14;\nlet ok: bool = true;\nlet c: char = 'R';",
          "analogy": "Like different sized boxes: a small box cannot hold a big item, and the label tells you what fits.",
          "exampleCode": "fn main() {\n    let count = 7;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Scalar Types solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 7'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Scalar Types syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Scalar Types, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Scalar Types pattern from this lesson.",
          "summary": "Rust has four scalar types: integers such as i32 and u64, floating-point numbers f32 and f64, booleans, and characters. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Scalar Types in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Scalar Types?",
              "options": [
                "store single values with integer, float, boolean and character types",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Store single values with integer, float, boolean and character types — that is the purpose of Scalar Types."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "count = 7"
              ],
              "answer": 3,
              "explanation": "The example prints 'count = 7'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m3-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Scalar Types.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", input.trim().len());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for word length, and prints it. It follows the Scalar Types pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "rust",
                  "expectedStdout": "4",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "ownership",
                  "expectedStdout": "9",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Scalar Types: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m3-l2",
          "slug": "rust-m3-l2",
          "title": "Compound Types: Tuples and Arrays",
          "objectives": [
            "Explain what Compound Types: Tuples and Arrays is and when to use it",
            "Write the Compound Types: Tuples and Arrays pattern from the syntax in this lesson",
            "Build a small Rust program that uses Compound Types: Tuples and Arrays correctly"
          ],
          "introduction": "Compound Types: Tuples and Arrays is a core part of writing Rust. Tuples group values of different types together, such as (500, 6.4, 'x'), and you read elements with dot notation like tup.0. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Tuples group values of different types together, such as (500, 6.4, 'x'), and you read elements with dot notation like tup.0. Arrays hold many values of one type with a fixed length, written as [1, 2, 3], and indexing past the end panics at runtime. Use tuples for mixed data and arrays for fixed-size lists. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let tup = (500, 6.4, 'x');\nlet arr = [1, 2, 3];\nlet first = arr[0];",
          "analogy": "Like a lunchbox with separate compartments: each slot holds one thing, and the box has a fixed size.",
          "exampleCode": "fn main() {\n    let items = vec![1,2,3];\n    println!(\"items = {}\", items.len());\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Compound Types: Tuples and Arrays solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'items = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Compound Types: Tuples and Arrays syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Compound Types: Tuples and Arrays, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Compound Types: Tuples and Arrays pattern from this lesson.",
          "summary": "Tuples group values of different types together, such as (500, 6.4, 'x'), and you read elements with dot notation like tup.0. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Compound Types: Tuples and Arrays in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Compound Types: Tuples and Arrays?",
              "options": [
                "To make the program use more memory on purpose",
                "group values with tuples and fixed-length arrays",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Group values with tuples and fixed-length arrays — that is the purpose of Compound Types: Tuples and Arrays."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "items = 3",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'items = 3'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m3-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Compound Types: Tuples and Arrays.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * 2);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for double a number, and prints it. It follows the Compound Types: Tuples and Arrays pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "10",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "21",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Compound Types: Tuples and Arrays: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m4",
      "title": "Control Flow",
      "description": "Control Flow: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 4,
      "lessons": [
        {
          "id": "rust-m4-l1",
          "slug": "rust-m4-l1",
          "title": "if Expressions",
          "objectives": [
            "Explain what if Expressions is and when to use it",
            "Write the if Expressions pattern from the syntax in this lesson",
            "Build a small Rust program that uses if Expressions correctly"
          ],
          "introduction": "if Expressions is a core part of writing Rust. In Rust, if is an expression, which means it produces a value: let n = if x > 5 { 10 } else { 0 };. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "In Rust, if is an expression, which means it produces a value: let n = if x > 5 { 10 } else { 0 };. Conditions must be booleans, so if x = 5 is a compile error, not a silent bug. Every branch of an if used as an expression must return the same type, which the compiler checks for you. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let n = if x > 5 { 10 } else { 0 };",
          "analogy": "Like a fork in a road: you take one branch, and you always end up at the same destination type.",
          "exampleCode": "fn main() {\n    let is_greater = 8 > 5;\n    println!(\"is_greater = {}\", is_greater);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem if Expressions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'is_greater = true'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the if Expressions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to if Expressions, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the if Expressions pattern from this lesson.",
          "summary": "In Rust, if is an expression, which means it produces a value: let n = if x > 5 { 10 } else { 0 };. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use if Expressions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of if Expressions?",
              "options": [
                "To make the program use more memory on purpose",
                "branch on boolean conditions and produce values from if expressions",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Branch on boolean conditions and produce values from if expressions — that is the purpose of if Expressions."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "is_greater = true",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'is_greater = true'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m4-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises if Expressions.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] + parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add two numbers, and prints it. It follows the if Expressions pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "7",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "10 20",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for if Expressions: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m4-l2",
          "slug": "rust-m4-l2",
          "title": "Loops: loop, while and for",
          "objectives": [
            "Explain what Loops: loop, while and for is and when to use it",
            "Write the Loops: loop, while and for pattern from the syntax in this lesson",
            "Build a small Rust program that uses Loops: loop, while and for correctly"
          ],
          "introduction": "Loops: loop, while and for is a core part of writing Rust. Rust has three loops: loop runs forever until break, while runs while a condition holds, and for iterates over a range or collection. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Rust has three loops: loop runs forever until break, while runs while a condition holds, and for iterates over a range or collection. A loop can return a value with break value, and for is the safest choice for walking through arrays because it cannot index out of bounds. Choose the loop that matches the shape of the work. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "for i in 0..3 {\n    println!(\"{}\", i);\n}",
          "analogy": "Like a washing machine cycle: it repeats the same steps until the timer says stop.",
          "exampleCode": "fn main() {\n    let count = 3;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Loops: loop, while and for solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Loops: loop, while and for syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Loops: loop, while and for, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Loops: loop, while and for pattern from this lesson.",
          "summary": "Rust has three loops: loop runs forever until break, while runs while a condition holds, and for iterates over a range or collection. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Loops: loop, while and for in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Loops: loop, while and for?",
              "options": [
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "repeat work with loop, while and for",
                "To compile Rust directly into a web page with no JavaScript"
              ],
              "answer": 2,
              "explanation": "Repeat work with loop, while and for — that is the purpose of Loops: loop, while and for."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 3",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 3'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m4-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Loops: loop, while and for.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"Hello, {}!\", input.trim());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for greet by name, and prints it. It follows the Loops: loop, while and for pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "Ada",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "Grace",
                  "expectedStdout": "Hello, Grace!",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Loops: loop, while and for: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m5",
      "title": "Functions",
      "description": "Functions: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 5,
      "lessons": [
        {
          "id": "rust-m5-l1",
          "slug": "rust-m5-l1",
          "title": "Defining and Calling Functions",
          "objectives": [
            "Explain what Defining and Calling Functions is and when to use it",
            "Write the Defining and Calling Functions pattern from the syntax in this lesson",
            "Build a small Rust program that uses Defining and Calling Functions correctly"
          ],
          "introduction": "Defining and Calling Functions is a core part of writing Rust. Functions are declared with fn, take typed parameters, and are called by name with arguments in parentheses. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Functions are declared with fn, take typed parameters, and are called by name with arguments in parentheses. Rust uses snake_case for function names, and the last expression in the body is the return value without a semicolon. Functions are the basic unit for organising a Rust program into understandable pieces. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}",
          "analogy": "Like a kitchen appliance: you put ingredients in, it does one job, and the result comes out.",
          "exampleCode": "fn main() {\n    let total = 3 + 4;\n    println!(\"total = {}\", total);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Defining and Calling Functions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'total = 7'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Defining and Calling Functions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Defining and Calling Functions, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Defining and Calling Functions pattern from this lesson.",
          "summary": "Functions are declared with fn, take typed parameters, and are called by name with arguments in parentheses. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Defining and Calling Functions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Defining and Calling Functions?",
              "options": [
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "organise code into named, typed functions",
                "To compile Rust directly into a web page with no JavaScript"
              ],
              "answer": 2,
              "explanation": "Organise code into named, typed functions — that is the purpose of Defining and Calling Functions."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "total = 7"
              ],
              "answer": 3,
              "explanation": "The example prints 'total = 7'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m5-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Defining and Calling Functions.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * n);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for square a number, and prints it. It follows the Defining and Calling Functions pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "6",
                  "expectedStdout": "36",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "9",
                  "expectedStdout": "81",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Defining and Calling Functions: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m5-l2",
          "slug": "rust-m5-l2",
          "title": "Parameters and Return Values",
          "objectives": [
            "Explain what Parameters and Return Values is and when to use it",
            "Write the Parameters and Return Values pattern from the syntax in this lesson",
            "Build a small Rust program that uses Parameters and Return Values correctly"
          ],
          "introduction": "Parameters and Return Values is a core part of writing Rust. A function declares each parameter's type and may declare a return type after an arrow, as in fn square(n: i32) -> i32. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A function declares each parameter's type and may declare a return type after an arrow, as in fn square(n: i32) -> i32. The final expression without a semicolon is returned implicitly, while return ends the function early. Returning a value with a semicolon by mistake turns it into a statement and causes a type error. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn square(n: i32) -> i32 {\n    n * n\n}",
          "analogy": "Like a vending machine slot: the coin type is fixed, and the item that comes out is fixed too.",
          "exampleCode": "fn main() {\n    let count = 6;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Parameters and Return Values solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 6'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Parameters and Return Values syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Parameters and Return Values, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Parameters and Return Values pattern from this lesson.",
          "summary": "A function declares each parameter's type and may declare a return type after an arrow, as in fn square(n: i32) -> i32. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Parameters and Return Values in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Parameters and Return Values?",
              "options": [
                "To store data permanently in a database without code",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "pass typed parameters and return values from functions"
              ],
              "answer": 3,
              "explanation": "Pass typed parameters and return values from functions — that is the purpose of Parameters and Return Values."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 6",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 6'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m5-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Parameters and Return Values.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n + 10);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add ten, and prints it. It follows the Parameters and Return Values pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "15",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "0",
                  "expectedStdout": "10",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Parameters and Return Values: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m6",
      "title": "Ownership",
      "description": "Ownership: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 6,
      "lessons": [
        {
          "id": "rust-m6-l1",
          "slug": "rust-m6-l1",
          "title": "What Ownership Means",
          "objectives": [
            "Explain what What Ownership Means is and when to use it",
            "Write the What Ownership Means pattern from the syntax in this lesson",
            "Build a small Rust program that uses What Ownership Means correctly"
          ],
          "introduction": "What Ownership Means is a core part of writing Rust. Ownership is Rust's central idea: every value has exactly one owner, the value is freed when the owner goes out of scope, and ownership can be moved to a new owner. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Ownership is Rust's central idea: every value has exactly one owner, the value is freed when the owner goes out of scope, and ownership can be moved to a new owner. This lets Rust free memory automatically without a garbage collector, at compile time. The compiler tracks owners, so memory bugs become compile errors instead of crashes. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let s1 = String::from(\"hello\");\nlet s2 = s1; // s1 is moved",
          "analogy": "Like a library book: only one person holds it at a time, and it returns to the shelf when they leave.",
          "exampleCode": "fn main() {\n    let message = String::from(\"hello\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem What Ownership Means solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = hello'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the What Ownership Means syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to What Ownership Means, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the What Ownership Means pattern from this lesson.",
          "summary": "Ownership is Rust's central idea: every value has exactly one owner, the value is freed when the owner goes out of scope, and ownership can be moved to a new owner. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use What Ownership Means in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of What Ownership Means?",
              "options": [
                "To store data permanently in a database without code",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "track exactly one owner per value and free it when the owner goes out of scope"
              ],
              "answer": 3,
              "explanation": "Track exactly one owner per value and free it when the owner goes out of scope — that is the purpose of What Ownership Means."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "message = hello",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'message = hello'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m6-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises What Ownership Means.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] * parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for multiply two numbers, and prints it. It follows the What Ownership Means pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "12",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "5 6",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for What Ownership Means: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m6-l2",
          "slug": "rust-m6-l2",
          "title": "Moves and Cloning",
          "objectives": [
            "Explain what Moves and Cloning is and when to use it",
            "Write the Moves and Cloning pattern from the syntax in this lesson",
            "Build a small Rust program that uses Moves and Cloning correctly"
          ],
          "introduction": "Moves and Cloning is a core part of writing Rust. Assigning a String moves ownership, so the old variable can no longer be used, while assigning an integer copies it because integers implement Copy. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Assigning a String moves ownership, so the old variable can no longer be used, while assigning an integer copies it because integers implement Copy. When you genuinely need two owners, call .clone() to make a deep copy, which is explicit because it costs time and memory. The compiler tells you when you use a moved value. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let s1 = String::from(\"hi\");\nlet s2 = s1.clone();\nprintln!(\"{}\", s1);",
          "analogy": "Like handing over the only key to a house versus cutting a copy: moving gives it away, cloning duplicates it.",
          "exampleCode": "fn main() {\n    let message = String::from(\"hi\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Moves and Cloning solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = hi'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Moves and Cloning syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Moves and Cloning, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Moves and Cloning pattern from this lesson.",
          "summary": "Assigning a String moves ownership, so the old variable can no longer be used, while assigning an integer copies it because integers implement Copy. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Moves and Cloning in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Moves and Cloning?",
              "options": [
                "move values by default, copy cheap types, and clone explicitly when needed",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically"
              ],
              "answer": 0,
              "explanation": "Move values by default, copy cheap types, and clone explicitly when needed — that is the purpose of Moves and Cloning."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = hi",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = hi'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m6-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Moves and Cloning.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    if n % 2 == 0 { println!(\"even\"); } else { println!(\"odd\"); }\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for even or odd, and prints it. It follows the Moves and Cloning pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "4",
                  "expectedStdout": "even",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "7",
                  "expectedStdout": "odd",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Moves and Cloning: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m7",
      "title": "Borrowing",
      "description": "Borrowing: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 7,
      "lessons": [
        {
          "id": "rust-m7-l1",
          "slug": "rust-m7-l1",
          "title": "References and Borrowing",
          "objectives": [
            "Explain what References and Borrowing is and when to use it",
            "Write the References and Borrowing pattern from the syntax in this lesson",
            "Build a small Rust program that uses References and Borrowing correctly"
          ],
          "introduction": "References and Borrowing is a core part of writing Rust. Borrowing lets a function use a value without taking ownership, by passing a reference such as &s. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Borrowing lets a function use a value without taking ownership, by passing a reference such as &s. The borrower can read the value but cannot free it, and the owner keeps using it afterwards. References are how Rust code shares data cheaply while the compiler still guarantees the data stays alive. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn len(s: &String) -> usize {\n    s.len()\n}",
          "analogy": "Like lending a book: your friend reads it, but it still belongs to you and comes back to your shelf.",
          "exampleCode": "fn main() {\n    let message = String::from(\"borrow\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem References and Borrowing solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = borrow'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the References and Borrowing syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to References and Borrowing, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the References and Borrowing pattern from this lesson.",
          "summary": "Borrowing lets a function use a value without taking ownership, by passing a reference such as &s. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use References and Borrowing in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of References and Borrowing?",
              "options": [
                "share data temporarily through references without taking ownership",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically"
              ],
              "answer": 0,
              "explanation": "Share data temporarily through references without taking ownership — that is the purpose of References and Borrowing."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = borrow"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = borrow'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m7-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises References and Borrowing.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", input.trim().len());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for word length, and prints it. It follows the References and Borrowing pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "rust",
                  "expectedStdout": "4",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "ownership",
                  "expectedStdout": "9",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for References and Borrowing: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m7-l2",
          "slug": "rust-m7-l2",
          "title": "Mutable References",
          "objectives": [
            "Explain what Mutable References is and when to use it",
            "Write the Mutable References pattern from the syntax in this lesson",
            "Build a small Rust program that uses Mutable References correctly"
          ],
          "introduction": "Mutable References is a core part of writing Rust. A mutable reference, written &mut s, lets the borrower change the value, but Rust allows only one mutable reference at a time, and no immutable references alongside it. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A mutable reference, written &mut s, lets the borrower change the value, but Rust allows only one mutable reference at a time, and no immutable references alongside it. This rule prevents data races at compile time: no two parts of the program can change the same data at once. The borrow checker enforces these rules for you. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn push(s: &mut String) {\n    s.push_str(\"!\");\n}",
          "analogy": "Like a single pen for a shared notebook: only one person writes at a time, so nothing gets overwritten.",
          "exampleCode": "fn main() {\n    let message = String::from(\"rust!\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Mutable References solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = rust!'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Mutable References syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Mutable References, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Mutable References pattern from this lesson.",
          "summary": "A mutable reference, written &mut s, lets the borrower change the value, but Rust allows only one mutable reference at a time, and no immutable references alongside it. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Mutable References in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Mutable References?",
              "options": [
                "To run Rust programs without ever compiling them",
                "change borrowed data through exactly one mutable reference at a time",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose"
              ],
              "answer": 1,
              "explanation": "Change borrowed data through exactly one mutable reference at a time — that is the purpose of Mutable References."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = rust!",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = rust!'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m7-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Mutable References.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * 2);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for double a number, and prints it. It follows the Mutable References pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "10",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "21",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Mutable References: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m8",
      "title": "Strings",
      "description": "Strings: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 8,
      "lessons": [
        {
          "id": "rust-m8-l1",
          "slug": "rust-m8-l1",
          "title": "String vs str",
          "objectives": [
            "Explain what String vs str is and when to use it",
            "Write the String vs str pattern from the syntax in this lesson",
            "Build a small Rust program that uses String vs str correctly"
          ],
          "introduction": "String vs str is a core part of writing Rust. Rust has two string types: String is a growable, owned, heap-allocated string, while &str is a borrowed view into string data, often a literal. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Rust has two string types: String is a growable, owned, heap-allocated string, while &str is a borrowed view into string data, often a literal. String literals such as \"hello\" are &str values baked into the program. Convert with to_string() or String::from(), and use &str for function parameters that only need to read text. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let owned = String::from(\"hello\");\nlet borrowed: &str = &owned;",
          "analogy": "Like a house versus a photograph of it: one you own and can extend, the other just shows you the house.",
          "exampleCode": "fn main() {\n    let message = String::from(\"hello\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem String vs str solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = hello'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the String vs str syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to String vs str, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the String vs str pattern from this lesson.",
          "summary": "Rust has two string types: String is a growable, owned, heap-allocated string, while &str is a borrowed view into string data, often a literal. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use String vs str in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of String vs str?",
              "options": [
                "To run Rust programs without ever compiling them",
                "use owned String for growable text and borrowed &str for reading it",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose"
              ],
              "answer": 1,
              "explanation": "Use owned String for growable text and borrowed &str for reading it — that is the purpose of String vs str."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "message = hello",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'message = hello'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m8-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises String vs str.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] + parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add two numbers, and prints it. It follows the String vs str pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "7",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "10 20",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for String vs str: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m8-l2",
          "slug": "rust-m8-l2",
          "title": "Working with Strings",
          "objectives": [
            "Explain what Working with Strings is and when to use it",
            "Write the Working with Strings pattern from the syntax in this lesson",
            "Build a small Rust program that uses Working with Strings correctly"
          ],
          "introduction": "Working with Strings is a core part of writing Rust. Strings support pushing characters and slices with push and push_str, concatenation with +, and formatting with format!. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Strings support pushing characters and slices with push and push_str, concatenation with +, and formatting with format!. Indexing a String with [0] is not allowed, because UTF-8 characters take different numbers of bytes; iterate with chars() or bytes() instead. The + operator moves the left operand, so clone it first if you still need it. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let mut s = String::from(\"foo\");\ns.push_str(\"bar\");",
          "analogy": "Like a train you can add carriages to, but you cannot point at a carriage by counting seats from the front.",
          "exampleCode": "fn main() {\n    let message = String::from(\"foobar\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Working with Strings solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = foobar'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Working with Strings syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Working with Strings, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Working with Strings pattern from this lesson.",
          "summary": "Strings support pushing characters and slices with push and push_str, concatenation with +, and formatting with format!. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Working with Strings in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Working with Strings?",
              "options": [
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "build and combine strings with push, push_str and format",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 2,
              "explanation": "Build and combine strings with push, push_str and format — that is the purpose of Working with Strings."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = foobar",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = foobar'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m8-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Working with Strings.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"Hello, {}!\", input.trim());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for greet by name, and prints it. It follows the Working with Strings pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "Ada",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "Grace",
                  "expectedStdout": "Hello, Grace!",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Working with Strings: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m9",
      "title": "Structs",
      "description": "Structs: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 9,
      "lessons": [
        {
          "id": "rust-m9-l1",
          "slug": "rust-m9-l1",
          "title": "Defining Structs",
          "objectives": [
            "Explain what Defining Structs is and when to use it",
            "Write the Defining Structs pattern from the syntax in this lesson",
            "Build a small Rust program that uses Defining Structs correctly"
          ],
          "introduction": "Defining Structs is a core part of writing Rust. A struct groups related fields under one name, such as a User with username, email and age, and each field has its own type. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A struct groups related fields under one name, such as a User with username, email and age, and each field has its own type. You create an instance by naming every field, and read fields with dot notation. Structs turn scattered variables into one meaningful value that the compiler checks as a whole. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "struct User {\n    name: String,\n    age: u32,\n}\nlet u = User { name: String::from(\"Ada\"), age: 36 };",
          "analogy": "Like a form with labelled boxes: name, age and email each have their own labelled space.",
          "exampleCode": "fn main() {\n    let count = 36;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Defining Structs solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 36'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Defining Structs syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Defining Structs, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Defining Structs pattern from this lesson.",
          "summary": "A struct groups related fields under one name, such as a User with username, email and age, and each field has its own type. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Defining Structs in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Defining Structs?",
              "options": [
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "group related fields into a named struct type",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 2,
              "explanation": "Group related fields into a named struct type — that is the purpose of Defining Structs."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "count = 36"
              ],
              "answer": 3,
              "explanation": "The example prints 'count = 36'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m9-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Defining Structs.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * n);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for square a number, and prints it. It follows the Defining Structs pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "6",
                  "expectedStdout": "36",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "9",
                  "expectedStdout": "81",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Defining Structs: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m9-l2",
          "slug": "rust-m9-l2",
          "title": "Methods and Associated Functions",
          "objectives": [
            "Explain what Methods and Associated Functions is and when to use it",
            "Write the Methods and Associated Functions pattern from the syntax in this lesson",
            "Build a small Rust program that uses Methods and Associated Functions correctly"
          ],
          "introduction": "Methods and Associated Functions is a core part of writing Rust. Methods are functions defined in an impl block that take &self and act on an instance, while associated functions such as new() do not take self and are called on the type itself. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Methods are functions defined in an impl block that take &self and act on an instance, while associated functions such as new() do not take self and are called on the type itself. Methods give your data behaviour: user.greet() reads better than greet(user). The first parameter being &self is what makes a function a method. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "impl User {\n    fn greet(&self) -> String {\n        format!(\"Hello, {}\", self.name)\n    }\n}",
          "analogy": "Like teaching a dog tricks: the tricks belong to the dog, and you call them on that dog.",
          "exampleCode": "fn main() {\n    let message = String::from(\"Ada\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Methods and Associated Functions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = Ada'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Methods and Associated Functions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Methods and Associated Functions, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Methods and Associated Functions pattern from this lesson.",
          "summary": "Methods are functions defined in an impl block that take &self and act on an instance, while associated functions such as new() do not take self and are called on the type itself. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Methods and Associated Functions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Methods and Associated Functions?",
              "options": [
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "attach behaviour to structs with methods and associated functions"
              ],
              "answer": 3,
              "explanation": "Attach behaviour to structs with methods and associated functions — that is the purpose of Methods and Associated Functions."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = Ada",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = Ada'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m9-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Methods and Associated Functions.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n + 10);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add ten, and prints it. It follows the Methods and Associated Functions pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "15",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "0",
                  "expectedStdout": "10",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Methods and Associated Functions: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m10",
      "title": "Enums",
      "description": "Enums: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 10,
      "lessons": [
        {
          "id": "rust-m10-l1",
          "slug": "rust-m10-l1",
          "title": "Defining Enums",
          "objectives": [
            "Explain what Defining Enums is and when to use it",
            "Write the Defining Enums pattern from the syntax in this lesson",
            "Build a small Rust program that uses Defining Enums correctly"
          ],
          "introduction": "Defining Enums is a core part of writing Rust. An enum lists the possible variants of a value, such as Coin::Penny or Coin::Quarter, and each variant can carry different data. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "An enum lists the possible variants of a value, such as Coin::Penny or Coin::Quarter, and each variant can carry different data. Enums model choices exactly: a value is one variant and nothing else, so invalid states cannot be represented. Option and Result, the most important enums in Rust, are built on this idea. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "enum Coin { Penny, Nickel, Dime, Quarter }\nlet c = Coin::Quarter;",
          "analogy": "Like a multiple-choice question on paper: exactly one box is ticked, never two and never none.",
          "exampleCode": "fn main() {\n    let count = 25;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Defining Enums solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 25'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Defining Enums syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Defining Enums, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Defining Enums pattern from this lesson.",
          "summary": "An enum lists the possible variants of a value, such as Coin::Penny or Coin::Quarter, and each variant can carry different data. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Defining Enums in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Defining Enums?",
              "options": [
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "model a fixed set of choices with enums"
              ],
              "answer": 3,
              "explanation": "Model a fixed set of choices with enums — that is the purpose of Defining Enums."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 25",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 25'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m10-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Defining Enums.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] * parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for multiply two numbers, and prints it. It follows the Defining Enums pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "12",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "5 6",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Defining Enums: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m10-l2",
          "slug": "rust-m10-l2",
          "title": "Pattern Matching with match",
          "objectives": [
            "Explain what Pattern Matching with match is and when to use it",
            "Write the Pattern Matching with match pattern from the syntax in this lesson",
            "Build a small Rust program that uses Pattern Matching with match correctly"
          ],
          "introduction": "Pattern Matching with match is a core part of writing Rust. match compares a value against patterns and runs the arm that fits, and the compiler requires every possible case to be handled, so nothing is forgotten. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "match compares a value against patterns and runs the arm that fits, and the compiler requires every possible case to be handled, so nothing is forgotten. Each arm is a pattern followed by => and an expression, and _ catches everything else. Exhaustive matching turns forgotten cases into compile errors. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "match coin {\n    Coin::Penny => 1,\n    Coin::Quarter => 25,\n    _ => 0,\n}",
          "analogy": "Like a postman sorting letters: every letter goes into exactly one pigeonhole, and none is left on the floor.",
          "exampleCode": "fn main() {\n    let count = 25;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Pattern Matching with match solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 25'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Pattern Matching with match syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Pattern Matching with match, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Pattern Matching with match pattern from this lesson.",
          "summary": "match compares a value against patterns and runs the arm that fits, and the compiler requires every possible case to be handled, so nothing is forgotten. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Pattern Matching with match in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Pattern Matching with match?",
              "options": [
                "handle every variant exhaustively with match",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "To compile Rust directly into a web page with no JavaScript"
              ],
              "answer": 0,
              "explanation": "Handle every variant exhaustively with match — that is the purpose of Pattern Matching with match."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 25",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 25'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m10-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Pattern Matching with match.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    if n % 2 == 0 { println!(\"even\"); } else { println!(\"odd\"); }\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for even or odd, and prints it. It follows the Pattern Matching with match pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "4",
                  "expectedStdout": "even",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "7",
                  "expectedStdout": "odd",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Pattern Matching with match: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m11",
      "title": "Beginner Projects",
      "description": "Beginner Projects: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 11,
      "lessons": [
        {
          "id": "rust-m11-l1",
          "slug": "rust-m11-l1",
          "title": "Project: Guessing Game",
          "objectives": [
            "Explain what Project: Guessing Game is and when to use it",
            "Write the Project: Guessing Game pattern from the syntax in this lesson",
            "Build a small Rust program that uses Project: Guessing Game correctly"
          ],
          "introduction": "Project: Guessing Game is a core part of writing Rust. The guessing game reads a number from the user, compares it with a secret, and tells the player whether the guess is too high or too low, looping until they are right. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "The guessing game reads a number from the user, compares it with a secret, and tells the player whether the guess is too high or too low, looping until they are right. It combines input, parsing, comparison and match in one small program, and it is the standard first Rust project for good reason. Handling a failed parse with a loop instead of a crash is the key lesson. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let mut guess = String::new();\nstd::io::stdin().read_line(&mut guess).unwrap();\nlet guess: u32 = guess.trim().parse().unwrap();",
          "analogy": "Like a fairground game where the stallholder says higher or lower until you guess the number.",
          "exampleCode": "fn main() {\n    let count = 42;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Project: Guessing Game solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 42'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Guessing Game syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: Guessing Game, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: Guessing Game pattern from this lesson.",
          "summary": "The guessing game reads a number from the user, compares it with a secret, and tells the player whether the guess is too high or too low, looping until they are right. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Guessing Game in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Guessing Game?",
              "options": [
                "build a guessing game with input, parsing and comparison",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "To compile Rust directly into a web page with no JavaScript"
              ],
              "answer": 0,
              "explanation": "Build a guessing game with input, parsing and comparison — that is the purpose of Project: Guessing Game."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "count = 42"
              ],
              "answer": 3,
              "explanation": "The example prints 'count = 42'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m11-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Project: Guessing Game.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", input.trim().len());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for word length, and prints it. It follows the Project: Guessing Game pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "rust",
                  "expectedStdout": "4",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "ownership",
                  "expectedStdout": "9",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Project: Guessing Game: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m11-l2",
          "slug": "rust-m11-l2",
          "title": "Project: Temperature Converter",
          "objectives": [
            "Explain what Project: Temperature Converter is and when to use it",
            "Write the Project: Temperature Converter pattern from the syntax in this lesson",
            "Build a small Rust program that uses Project: Temperature Converter correctly"
          ],
          "introduction": "Project: Temperature Converter is a core part of writing Rust. A temperature converter reads a value and a unit, applies the conversion formula, and prints the result, for example Celsius to Fahrenheit with F = C * 9/5 + 32. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A temperature converter reads a value and a unit, applies the conversion formula, and prints the result, for example Celsius to Fahrenheit with F = C * 9/5 + 32. The project practices functions, floating-point arithmetic and formatted output. A small helper function per direction keeps the code tidy and testable. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn c_to_f(c: f64) -> f64 {\n    c * 9.0 / 5.0 + 32.0\n}",
          "analogy": "Like a currency exchange booth: one rate in, the converted amount out, with the maths done for you.",
          "exampleCode": "fn main() {\n    let price = 21.0;\n    println!(\"price = {}\", price);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Project: Temperature Converter solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'price = 21.0'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Temperature Converter syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: Temperature Converter, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: Temperature Converter pattern from this lesson.",
          "summary": "A temperature converter reads a value and a unit, applies the conversion formula, and prints the result, for example Celsius to Fahrenheit with F = C * 9/5 + 32. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Temperature Converter in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Temperature Converter?",
              "options": [
                "To store data permanently in a database without code",
                "build a temperature converter with functions and float arithmetic",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them"
              ],
              "answer": 1,
              "explanation": "Build a temperature converter with functions and float arithmetic — that is the purpose of Project: Temperature Converter."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "price = 21.0",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'price = 21.0'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m11-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Project: Temperature Converter.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * 2);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for double a number, and prints it. It follows the Project: Temperature Converter pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "10",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "21",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Project: Temperature Converter: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m12",
      "title": "Collections",
      "description": "Collections: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 12,
      "lessons": [
        {
          "id": "rust-m12-l1",
          "slug": "rust-m12-l1",
          "title": "Vectors",
          "objectives": [
            "Explain what Vectors is and when to use it",
            "Write the Vectors pattern from the syntax in this lesson",
            "Build a small Rust program that uses Vectors correctly"
          ],
          "introduction": "Vectors is a core part of writing Rust. A Vec<T> is a growable list of values of one type, created with Vec::new() or the vec! macro. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A Vec<T> is a growable list of values of one type, created with Vec::new() or the vec! macro. You add items with push, read them with indexing or get, and iterate with a for loop. Vectors allocate on the heap and can grow, which is why they are the default collection when the size is not known in advance. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let mut v = vec![1, 2, 3];\nv.push(4);",
          "analogy": "Like an expandable folder: it starts small and grows a page at a time as you add sheets.",
          "exampleCode": "fn main() {\n    let items = vec![1,2,3];\n    println!(\"items = {}\", items.len());\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Vectors solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'items = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Vectors syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Vectors, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Vectors pattern from this lesson.",
          "summary": "A Vec<T> is a growable list of values of one type, created with Vec::new() or the vec! macro. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Vectors in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Vectors?",
              "options": [
                "To store data permanently in a database without code",
                "store growable lists of one type with Vec",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them"
              ],
              "answer": 1,
              "explanation": "Store growable lists of one type with Vec — that is the purpose of Vectors."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "items = 3",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'items = 3'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m12-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Vectors.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] + parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add two numbers, and prints it. It follows the Vectors pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "7",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "10 20",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Vectors: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m12-l2",
          "slug": "rust-m12-l2",
          "title": "HashMaps",
          "objectives": [
            "Explain what HashMaps is and when to use it",
            "Write the HashMaps pattern from the syntax in this lesson",
            "Build a small Rust program that uses HashMaps correctly"
          ],
          "introduction": "HashMaps is a core part of writing Rust. A HashMap<K, V> stores key-value pairs and finds a value by its key in roughly constant time. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A HashMap<K, V> stores key-value pairs and finds a value by its key in roughly constant time. Insert with insert, read with get, which returns an Option, and iterate over pairs. The entry API lets you update a value if present or insert a default if absent, which is ideal for counting occurrences. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "use std::collections::HashMap;\nlet mut scores = HashMap::new();\nscores.insert(\"Ada\", 10);",
          "analogy": "Like a dictionary: you look up a word and get its definition without reading the whole book.",
          "exampleCode": "fn main() {\n    let count = 10;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem HashMaps solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 10'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the HashMaps syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to HashMaps, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the HashMaps pattern from this lesson.",
          "summary": "A HashMap<K, V> stores key-value pairs and finds a value by its key in roughly constant time. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use HashMaps in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of HashMaps?",
              "options": [
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "store and look up key-value pairs with HashMap",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Store and look up key-value pairs with HashMap — that is the purpose of HashMaps."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 10",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 10'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m12-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises HashMaps.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"Hello, {}!\", input.trim());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for greet by name, and prints it. It follows the HashMaps pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "Ada",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "Grace",
                  "expectedStdout": "Hello, Grace!",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for HashMaps: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m13",
      "title": "Error Handling",
      "description": "Error Handling: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 13,
      "lessons": [
        {
          "id": "rust-m13-l1",
          "slug": "rust-m13-l1",
          "title": "Result and Recoverable Errors",
          "objectives": [
            "Explain what Result and Recoverable Errors is and when to use it",
            "Write the Result and Recoverable Errors pattern from the syntax in this lesson",
            "Build a small Rust program that uses Result and Recoverable Errors correctly"
          ],
          "introduction": "Result and Recoverable Errors is a core part of writing Rust. Most Rust functions report failure with Result<T, E>, which is Ok(value) on success and Err(error) on failure. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Most Rust functions report failure with Result<T, E>, which is Ok(value) on success and Err(error) on failure. The ? operator returns the error early if a call fails, and match lets you handle each case explicitly. Because errors are values, the compiler forces you to decide what happens when something goes wrong. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn read() -> Result<String, std::io::Error> {\n    std::fs::read_to_string(\"a.txt\")\n}",
          "analogy": "Like a parcel that arrives either with the goods inside or with a note explaining why it did not.",
          "exampleCode": "fn main() {\n    let message = String::from(\"ok\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Result and Recoverable Errors solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = ok'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Result and Recoverable Errors syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Result and Recoverable Errors, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Result and Recoverable Errors pattern from this lesson.",
          "summary": "Most Rust functions report failure with Result<T, E>, which is Ok(value) on success and Err(error) on failure. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Result and Recoverable Errors in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Result and Recoverable Errors?",
              "options": [
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "handle recoverable failures with Result and the ? operator",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Handle recoverable failures with Result and the ? operator — that is the purpose of Result and Recoverable Errors."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = ok"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = ok'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m13-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Result and Recoverable Errors.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * n);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for square a number, and prints it. It follows the Result and Recoverable Errors pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "6",
                  "expectedStdout": "36",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "9",
                  "expectedStdout": "81",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Result and Recoverable Errors: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m13-l2",
          "slug": "rust-m13-l2",
          "title": "panic! and Unrecoverable Errors",
          "objectives": [
            "Explain what panic! and Unrecoverable Errors is and when to use it",
            "Write the panic! and Unrecoverable Errors pattern from the syntax in this lesson",
            "Build a small Rust program that uses panic! and Unrecoverable Errors correctly"
          ],
          "introduction": "panic! and Unrecoverable Errors is a core part of writing Rust. panic! stops the program immediately with an error message, and it is used for bugs the program cannot recover from, such as an array index out of bounds. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "panic! stops the program immediately with an error message, and it is used for bugs the program cannot recover from, such as an array index out of bounds. Use panic for programming errors, not for expected failures such as a missing file: those deserve a Result. Unwrapping a Result with unwrap is a panic in disguise, fine for examples but risky in real code. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let v = vec![1, 2, 3];\nlet x = v[99]; // panics",
          "analogy": "Like a fire alarm: it stops everything at once, which is right for a fire but wrong for a burnt toast.",
          "exampleCode": "fn main() {\n    let count = 99;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem panic! and Unrecoverable Errors solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 99'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the panic! and Unrecoverable Errors syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to panic! and Unrecoverable Errors, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the panic! and Unrecoverable Errors pattern from this lesson.",
          "summary": "panic! stops the program immediately with an error message, and it is used for bugs the program cannot recover from, such as an array index out of bounds. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use panic! and Unrecoverable Errors in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of panic! and Unrecoverable Errors?",
              "options": [
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "stop the program for unrecoverable bugs with panic"
              ],
              "answer": 3,
              "explanation": "Stop the program for unrecoverable bugs with panic — that is the purpose of panic! and Unrecoverable Errors."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 99",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 99'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m13-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises panic! and Unrecoverable Errors.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n + 10);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add ten, and prints it. It follows the panic! and Unrecoverable Errors pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "15",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "0",
                  "expectedStdout": "10",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for panic! and Unrecoverable Errors: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m14",
      "title": "Generics",
      "description": "Generics: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 14,
      "lessons": [
        {
          "id": "rust-m14-l1",
          "slug": "rust-m14-l1",
          "title": "Generic Functions",
          "objectives": [
            "Explain what Generic Functions is and when to use it",
            "Write the Generic Functions pattern from the syntax in this lesson",
            "Build a small Rust program that uses Generic Functions correctly"
          ],
          "introduction": "Generic Functions is a core part of writing Rust. Generics let you write one function that works for many types, by declaring a type parameter such as <T> and using T where a concrete type would go. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Generics let you write one function that works for many types, by declaring a type parameter such as <T> and using T where a concrete type would go. The compiler generates a specialised copy for each type used, so there is no runtime cost. Trait bounds such as T: PartialOrd restrict which types are allowed and which operations the function may use. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn largest<T: PartialOrd>(a: T, b: T) -> T {\n    if a > b { a } else { b }\n}",
          "analogy": "Like a universal phone charger with interchangeable tips: one design, many devices.",
          "exampleCode": "fn main() {\n    let total = 9 + 4;\n    println!(\"total = {}\", total);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Generic Functions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'total = 13'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Generic Functions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Generic Functions, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Generic Functions pattern from this lesson.",
          "summary": "Generics let you write one function that works for many types, by declaring a type parameter such as <T> and using T where a concrete type would go. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Generic Functions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Generic Functions?",
              "options": [
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "write one function that works for many types with generics"
              ],
              "answer": 3,
              "explanation": "Write one function that works for many types with generics — that is the purpose of Generic Functions."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "total = 13",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'total = 13'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m14-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Generic Functions.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] * parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for multiply two numbers, and prints it. It follows the Generic Functions pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "12",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "5 6",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Generic Functions: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m14-l2",
          "slug": "rust-m14-l2",
          "title": "Generic Structs and Enums",
          "objectives": [
            "Explain what Generic Structs and Enums is and when to use it",
            "Write the Generic Structs and Enums pattern from the syntax in this lesson",
            "Build a small Rust program that uses Generic Structs and Enums correctly"
          ],
          "introduction": "Generic Structs and Enums is a core part of writing Rust. Structs and enums can also be generic, such as Option<T> or a Point<T> with x and y of type T. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Structs and enums can also be generic, such as Option<T> or a Point<T> with x and y of type T. A generic struct may hold different types in different instances, and methods can be written for all T or only for specific types such as Point<f32>. Generics keep data structures reusable without giving up type safety. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "struct Point<T> { x: T, y: T }\nlet p = Point { x: 5, y: 10 };",
          "analogy": "Like an adjustable shelf: it holds books, boxes or plants, and the shelf itself does not care which.",
          "exampleCode": "fn main() {\n    let count = 5;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Generic Structs and Enums solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Generic Structs and Enums syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Generic Structs and Enums, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Generic Structs and Enums pattern from this lesson.",
          "summary": "Structs and enums can also be generic, such as Option<T> or a Point<T> with x and y of type T. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Generic Structs and Enums in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Generic Structs and Enums?",
              "options": [
                "make structs and enums reusable over many types",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Make structs and enums reusable over many types — that is the purpose of Generic Structs and Enums."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 5",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 5'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m14-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Generic Structs and Enums.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    if n % 2 == 0 { println!(\"even\"); } else { println!(\"odd\"); }\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for even or odd, and prints it. It follows the Generic Structs and Enums pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "4",
                  "expectedStdout": "even",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "7",
                  "expectedStdout": "odd",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Generic Structs and Enums: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m15",
      "title": "Lifetimes",
      "description": "Lifetimes: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 15,
      "lessons": [
        {
          "id": "rust-m15-l1",
          "slug": "rust-m15-l1",
          "title": "Lifetime Basics",
          "objectives": [
            "Explain what Lifetime Basics is and when to use it",
            "Write the Lifetime Basics pattern from the syntax in this lesson",
            "Build a small Rust program that uses Lifetime Basics correctly"
          ],
          "introduction": "Lifetime Basics is a core part of writing Rust. A lifetime is the span of time for which a reference is valid, and the borrow checker uses lifetimes to reject references that could outlive the data they point to. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A lifetime is the span of time for which a reference is valid, and the borrow checker uses lifetimes to reject references that could outlive the data they point to. Most lifetimes are inferred, and you only annotate them when a function takes two references and returns one of them. A dangling reference is a compile error in Rust, not a crash at runtime. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}",
          "analogy": "Like a library loan period: the book must be returned before the library closes, never after.",
          "exampleCode": "fn main() {\n    let message = String::from(\"longest\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Lifetime Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = longest'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Lifetime Basics syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Lifetime Basics, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Lifetime Basics pattern from this lesson.",
          "summary": "A lifetime is the span of time for which a reference is valid, and the borrow checker uses lifetimes to reject references that could outlive the data they point to. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Lifetime Basics in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Lifetime Basics?",
              "options": [
                "ensure references never outlive the data they point to",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Ensure references never outlive the data they point to — that is the purpose of Lifetime Basics."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = longest"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = longest'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m15-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Lifetime Basics.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", input.trim().len());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for word length, and prints it. It follows the Lifetime Basics pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "rust",
                  "expectedStdout": "4",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "ownership",
                  "expectedStdout": "9",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Lifetime Basics: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m15-l2",
          "slug": "rust-m15-l2",
          "title": "Lifetime Elision and Annotations",
          "objectives": [
            "Explain what Lifetime Elision and Annotations is and when to use it",
            "Write the Lifetime Elision and Annotations pattern from the syntax in this lesson",
            "Build a small Rust program that uses Lifetime Elision and Annotations correctly"
          ],
          "introduction": "Lifetime Elision and Annotations is a core part of writing Rust. Lifetime elision rules let you omit annotations in the common cases: each input reference gets its own lifetime, and if there is one input, the output gets that lifetime. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Lifetime elision rules let you omit annotations in the common cases: each input reference gets its own lifetime, and if there is one input, the output gets that lifetime. When elision cannot decide, the compiler asks you to write the annotations, which name the relationship between inputs and output. Annotations describe relationships; they do not change how long anything lives. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn first<'a>(x: &'a str, _y: &str) -> &'a str { x }",
          "analogy": "Like pronouns in a sentence: usually the meaning is obvious, and you only spell it out when it is ambiguous.",
          "exampleCode": "fn main() {\n    let message = String::from(\"first\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Lifetime Elision and Annotations solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = first'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Lifetime Elision and Annotations syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Lifetime Elision and Annotations, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Lifetime Elision and Annotations pattern from this lesson.",
          "summary": "Lifetime elision rules let you omit annotations in the common cases: each input reference gets its own lifetime, and if there is one input, the output gets that lifetime. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Lifetime Elision and Annotations in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Lifetime Elision and Annotations?",
              "options": [
                "To make the program use more memory on purpose",
                "omit lifetime annotations where elision rules apply and write them where needed",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Omit lifetime annotations where elision rules apply and write them where needed — that is the purpose of Lifetime Elision and Annotations."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = first",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = first'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m15-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Lifetime Elision and Annotations.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * 2);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for double a number, and prints it. It follows the Lifetime Elision and Annotations pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "10",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "21",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Lifetime Elision and Annotations: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m16",
      "title": "Modules",
      "description": "Modules: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 16,
      "lessons": [
        {
          "id": "rust-m16-l1",
          "slug": "rust-m16-l1",
          "title": "Modules and Visibility",
          "objectives": [
            "Explain what Modules and Visibility is and when to use it",
            "Write the Modules and Visibility pattern from the syntax in this lesson",
            "Build a small Rust program that uses Modules and Visibility correctly"
          ],
          "introduction": "Modules and Visibility is a core part of writing Rust. Modules organise code into namespaces with mod, and items are private by default: pub makes a function, struct or module visible outside its module. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Modules organise code into namespaces with mod, and items are private by default: pub makes a function, struct or module visible outside its module. Nested modules form a tree, and paths such as crate::utils::helper name items by their position in it. Visibility is how a crate hides its internals and exposes a clean public API. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "mod utils {\n    pub fn helper() {}\n}",
          "analogy": "Like rooms in a house: the kitchen is public, but the locked cupboard stays private.",
          "exampleCode": "fn main() {\n    let message = String::from(\"utils\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Modules and Visibility solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = utils'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Modules and Visibility syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Modules and Visibility, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Modules and Visibility pattern from this lesson.",
          "summary": "Modules organise code into namespaces with mod, and items are private by default: pub makes a function, struct or module visible outside its module. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Modules and Visibility in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Modules and Visibility?",
              "options": [
                "To make the program use more memory on purpose",
                "organise code into modules with explicit visibility",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Organise code into modules with explicit visibility — that is the purpose of Modules and Visibility."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "message = utils",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'message = utils'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m16-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Modules and Visibility.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] + parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add two numbers, and prints it. It follows the Modules and Visibility pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "7",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "10 20",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Modules and Visibility: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m16-l2",
          "slug": "rust-m16-l2",
          "title": "Crates and use",
          "objectives": [
            "Explain what Crates and use is and when to use it",
            "Write the Crates and use pattern from the syntax in this lesson",
            "Build a small Rust program that uses Crates and use correctly"
          ],
          "introduction": "Crates and use is a core part of writing Rust. A crate is a compilation unit: a binary crate has a main function, a library crate exposes an API, and external crates come from crates.io. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A crate is a compilation unit: a binary crate has a main function, a library crate exposes an API, and external crates come from crates.io. The use keyword brings a path into scope so you can write helper() instead of the full path. Splitting a growing binary into a library crate plus a thin main is a common refactoring step. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "use std::collections::HashMap;\nuse crate::utils::helper;",
          "analogy": "Like importing a toolbox into your workshop instead of walking to the shed for every tool.",
          "exampleCode": "fn main() {\n    let message = String::from(\"crates\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Crates and use solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = crates'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Crates and use syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Crates and use, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Crates and use pattern from this lesson.",
          "summary": "A crate is a compilation unit: a binary crate has a main function, a library crate exposes an API, and external crates come from crates.io. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Crates and use in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Crates and use?",
              "options": [
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "bring items into scope with use and split code into crates",
                "To compile Rust directly into a web page with no JavaScript"
              ],
              "answer": 2,
              "explanation": "Bring items into scope with use and split code into crates — that is the purpose of Crates and use."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = crates",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = crates'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m16-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Crates and use.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"Hello, {}!\", input.trim());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for greet by name, and prints it. It follows the Crates and use pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "Ada",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "Grace",
                  "expectedStdout": "Hello, Grace!",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Crates and use: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m17",
      "title": "Iterators",
      "description": "Iterators: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 17,
      "lessons": [
        {
          "id": "rust-m17-l1",
          "slug": "rust-m17-l1",
          "title": "Iterator Basics",
          "objectives": [
            "Explain what Iterator Basics is and when to use it",
            "Write the Iterator Basics pattern from the syntax in this lesson",
            "Build a small Rust program that uses Iterator Basics correctly"
          ],
          "introduction": "Iterator Basics is a core part of writing Rust. An iterator produces a sequence of values one at a time, and in Rust every iterator is lazy: nothing happens until you call a consuming method such as collect or sum. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "An iterator produces a sequence of values one at a time, and in Rust every iterator is lazy: nothing happens until you call a consuming method such as collect or sum. You create iterators from collections with iter, iter_mut or into_iter, and a for loop works because it calls next repeatedly. Laziness means you can chain operations without intermediate allocations. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let v = vec![1, 2, 3];\nlet sum: i32 = v.iter().sum();",
          "analogy": "Like a conveyor belt: items arrive one by one, and the belt only moves when someone is ready to take them.",
          "exampleCode": "fn main() {\n    let items = vec![1,2,3];\n    println!(\"items = {}\", items.len());\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Iterator Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'items = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Iterator Basics syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Iterator Basics, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Iterator Basics pattern from this lesson.",
          "summary": "An iterator produces a sequence of values one at a time, and in Rust every iterator is lazy: nothing happens until you call a consuming method such as collect or sum. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Iterator Basics in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Iterator Basics?",
              "options": [
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "produce values lazily one at a time with iterators",
                "To compile Rust directly into a web page with no JavaScript"
              ],
              "answer": 2,
              "explanation": "Produce values lazily one at a time with iterators — that is the purpose of Iterator Basics."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "items = 3"
              ],
              "answer": 3,
              "explanation": "The example prints 'items = 3'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m17-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Iterator Basics.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * n);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for square a number, and prints it. It follows the Iterator Basics pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "6",
                  "expectedStdout": "36",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "9",
                  "expectedStdout": "81",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Iterator Basics: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m17-l2",
          "slug": "rust-m17-l2",
          "title": "map, filter and collect",
          "objectives": [
            "Explain what map, filter and collect is and when to use it",
            "Write the map, filter and collect pattern from the syntax in this lesson",
            "Build a small Rust program that uses map, filter and collect correctly"
          ],
          "introduction": "map, filter and collect is a core part of writing Rust. Iterator adaptors transform a sequence: map applies a function to each item, filter keeps only the items matching a predicate, and collect gathers the results into a new collection. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Iterator adaptors transform a sequence: map applies a function to each item, filter keeps only the items matching a predicate, and collect gathers the results into a new collection. Chaining adaptors reads like a pipeline and avoids manual loops and temporary vectors. Because iterators are lazy, the whole chain runs in a single pass when consumed. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let doubled: Vec<i32> = vec![1, 2, 3].iter().map(|x| x * 2).collect();",
          "analogy": "Like an assembly line: each station changes the item, and the finished goods roll off the end.",
          "exampleCode": "fn main() {\n    let items = vec![2,4,6];\n    println!(\"items = {}\", items.len());\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem map, filter and collect solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'items = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the map, filter and collect syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to map, filter and collect, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the map, filter and collect pattern from this lesson.",
          "summary": "Iterator adaptors transform a sequence: map applies a function to each item, filter keeps only the items matching a predicate, and collect gathers the results into a new collection. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use map, filter and collect in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of map, filter and collect?",
              "options": [
                "To store data permanently in a database without code",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "transform sequences with map, filter and collect"
              ],
              "answer": 3,
              "explanation": "Transform sequences with map, filter and collect — that is the purpose of map, filter and collect."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "items = 3",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'items = 3'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m17-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises map, filter and collect.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n + 10);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add ten, and prints it. It follows the map, filter and collect pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "15",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "0",
                  "expectedStdout": "10",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for map, filter and collect: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m18",
      "title": "Testing",
      "description": "Testing: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 18,
      "lessons": [
        {
          "id": "rust-m18-l1",
          "slug": "rust-m18-l1",
          "title": "Writing Unit Tests",
          "objectives": [
            "Explain what Writing Unit Tests is and when to use it",
            "Write the Writing Unit Tests pattern from the syntax in this lesson",
            "Build a small Rust program that uses Writing Unit Tests correctly"
          ],
          "introduction": "Writing Unit Tests is a core part of writing Rust. Tests live in a #[cfg(test)] module at the bottom of the file, and each test is a function marked #[test] that uses assert!, assert_eq! and assert_ne!. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Tests live in a #[cfg(test)] module at the bottom of the file, and each test is a function marked #[test] that uses assert!, assert_eq! and assert_ne!. cargo test compiles and runs them, reporting failures with the values that differed. Writing tests next to the code makes it easy to check behaviour as you change it. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "#[test]\nfn adds_two() {\n    assert_eq!(2 + 2, 4);\n}",
          "analogy": "Like a spellchecker for logic: it catches mistakes in your reasoning before your users do.",
          "exampleCode": "fn main() {\n    let count = 4;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Writing Unit Tests solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 4'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Writing Unit Tests syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Writing Unit Tests, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Writing Unit Tests pattern from this lesson.",
          "summary": "Tests live in a #[cfg(test)] module at the bottom of the file, and each test is a function marked #[test] that uses assert!, assert_eq! and assert_ne!. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Writing Unit Tests in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Writing Unit Tests?",
              "options": [
                "To store data permanently in a database without code",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "write unit tests with #[test] and assertions"
              ],
              "answer": 3,
              "explanation": "Write unit tests with #[test] and assertions — that is the purpose of Writing Unit Tests."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 4",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 4'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m18-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Writing Unit Tests.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] * parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for multiply two numbers, and prints it. It follows the Writing Unit Tests pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "12",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "5 6",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Writing Unit Tests: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m18-l2",
          "slug": "rust-m18-l2",
          "title": "Integration Tests and Documentation Tests",
          "objectives": [
            "Explain what Integration Tests and Documentation Tests is and when to use it",
            "Write the Integration Tests and Documentation Tests pattern from the syntax in this lesson",
            "Build a small Rust program that uses Integration Tests and Documentation Tests correctly"
          ],
          "introduction": "Integration Tests and Documentation Tests is a core part of writing Rust. Integration tests live in the tests directory and test the public API as an outside user would, while documentation examples in /// comments are also run as tests. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Integration tests live in the tests directory and test the public API as an outside user would, while documentation examples in /// comments are also run as tests. Keeping integration tests separate forces you to test through the real API, and doctests keep examples in documentation honest. A failing doctest means the docs lie, which is a bug worth fixing. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "// tests/add.rs\n#[test]\nfn it_adds() { assert_eq!(1 + 1, 2); }",
          "analogy": "Like a driving test: the examiner does not read your notes, they watch you actually drive.",
          "exampleCode": "fn main() {\n    let count = 2;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Integration Tests and Documentation Tests solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 2'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Integration Tests and Documentation Tests syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Integration Tests and Documentation Tests, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Integration Tests and Documentation Tests pattern from this lesson.",
          "summary": "Integration tests live in the tests directory and test the public API as an outside user would, while documentation examples in /// comments are also run as tests. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Integration Tests and Documentation Tests in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Integration Tests and Documentation Tests?",
              "options": [
                "test the public API with integration tests and doctests",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically"
              ],
              "answer": 0,
              "explanation": "Test the public API with integration tests and doctests — that is the purpose of Integration Tests and Documentation Tests."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 2",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 2'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m18-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Integration Tests and Documentation Tests.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    if n % 2 == 0 { println!(\"even\"); } else { println!(\"odd\"); }\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for even or odd, and prints it. It follows the Integration Tests and Documentation Tests pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "4",
                  "expectedStdout": "even",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "7",
                  "expectedStdout": "odd",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Integration Tests and Documentation Tests: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m19",
      "title": "Intermediate Projects",
      "description": "Intermediate Projects: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 19,
      "lessons": [
        {
          "id": "rust-m19-l1",
          "slug": "rust-m19-l1",
          "title": "Project: CLI Todo Tool",
          "objectives": [
            "Explain what Project: CLI Todo Tool is and when to use it",
            "Write the Project: CLI Todo Tool pattern from the syntax in this lesson",
            "Build a small Rust program that uses Project: CLI Todo Tool correctly"
          ],
          "introduction": "Project: CLI Todo Tool is a core part of writing Rust. A command-line todo tool stores tasks in a file, adds a task with add, lists them with list, and marks one done with done. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A command-line todo tool stores tasks in a file, adds a task with add, lists them with list, and marks one done with done. It combines argument parsing, file I/O, Result error handling and a small data model. The file format is your choice: one task per line is enough, and JSON is a good second step. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let args: Vec<String> = std::env::args().collect();",
          "analogy": "Like a paper notebook with commands: add a line, list the lines, cross one out.",
          "exampleCode": "fn main() {\n    let message = String::from(\"todo\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Project: CLI Todo Tool solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = todo'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: CLI Todo Tool syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: CLI Todo Tool, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: CLI Todo Tool pattern from this lesson.",
          "summary": "A command-line todo tool stores tasks in a file, adds a task with add, lists them with list, and marks one done with done. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: CLI Todo Tool in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: CLI Todo Tool?",
              "options": [
                "build a CLI todo tool with file storage",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically"
              ],
              "answer": 0,
              "explanation": "Build a CLI todo tool with file storage — that is the purpose of Project: CLI Todo Tool."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = todo"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = todo'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m19-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Project: CLI Todo Tool.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", input.trim().len());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for word length, and prints it. It follows the Project: CLI Todo Tool pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "rust",
                  "expectedStdout": "4",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "ownership",
                  "expectedStdout": "9",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Project: CLI Todo Tool: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m19-l2",
          "slug": "rust-m19-l2",
          "title": "Project: File Word Counter",
          "objectives": [
            "Explain what Project: File Word Counter is and when to use it",
            "Write the Project: File Word Counter pattern from the syntax in this lesson",
            "Build a small Rust program that uses Project: File Word Counter correctly"
          ],
          "introduction": "Project: File Word Counter is a core part of writing Rust. A word counter reads a file, splits its text into words, and counts them with a HashMap, printing the total and the most common words. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A word counter reads a file, splits its text into words, and counts them with a HashMap, printing the total and the most common words. It practices reading files, iterating over lines and words, and the entry API for counting. The same pipeline appears in log analysis, search indexing and text processing. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let text = std::fs::read_to_string(\"input.txt\").unwrap();\nlet words = text.split_whitespace().count();",
          "analogy": "Like counting the words in a book by tallying each one as you turn the pages.",
          "exampleCode": "fn main() {\n    let count = 100;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Project: File Word Counter solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 100'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: File Word Counter syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: File Word Counter, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: File Word Counter pattern from this lesson.",
          "summary": "A word counter reads a file, splits its text into words, and counts them with a HashMap, printing the total and the most common words. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: File Word Counter in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: File Word Counter?",
              "options": [
                "To run Rust programs without ever compiling them",
                "build a word counter with file I/O and a HashMap",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose"
              ],
              "answer": 1,
              "explanation": "Build a word counter with file I/O and a HashMap — that is the purpose of Project: File Word Counter."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 100",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 100'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m19-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Project: File Word Counter.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * 2);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for double a number, and prints it. It follows the Project: File Word Counter pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "10",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "21",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Project: File Word Counter: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m20",
      "title": "Advanced Traits",
      "description": "Advanced Traits: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 20,
      "lessons": [
        {
          "id": "rust-m20-l1",
          "slug": "rust-m20-l1",
          "title": "Trait Bounds and Default Methods",
          "objectives": [
            "Explain what Trait Bounds and Default Methods is and when to use it",
            "Write the Trait Bounds and Default Methods pattern from the syntax in this lesson",
            "Build a small Rust program that uses Trait Bounds and Default Methods correctly"
          ],
          "introduction": "Trait Bounds and Default Methods is a core part of writing Rust. A trait defines shared behaviour, and a trait bound such as T: Display requires a type to implement that behaviour before it can be used. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A trait defines shared behaviour, and a trait bound such as T: Display requires a type to implement that behaviour before it can be used. Traits can provide default method implementations that types may override, so common behaviour is written once. Bounds turn requirements into compile-time contracts that the compiler enforces. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "trait Greet {\n    fn greet(&self) -> String {\n        String::from(\"Hello\")\n    }\n}",
          "analogy": "Like a job description: it lists the skills required, and anyone hired must have them.",
          "exampleCode": "fn main() {\n    let message = String::from(\"Hello\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Trait Bounds and Default Methods solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = Hello'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Trait Bounds and Default Methods syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Trait Bounds and Default Methods, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Trait Bounds and Default Methods pattern from this lesson.",
          "summary": "A trait defines shared behaviour, and a trait bound such as T: Display requires a type to implement that behaviour before it can be used. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Trait Bounds and Default Methods in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Trait Bounds and Default Methods?",
              "options": [
                "To run Rust programs without ever compiling them",
                "require shared behaviour with trait bounds and default methods",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose"
              ],
              "answer": 1,
              "explanation": "Require shared behaviour with trait bounds and default methods — that is the purpose of Trait Bounds and Default Methods."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "message = Hello",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'message = Hello'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m20-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Trait Bounds and Default Methods.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] + parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add two numbers, and prints it. It follows the Trait Bounds and Default Methods pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "7",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "10 20",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Trait Bounds and Default Methods: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m20-l2",
          "slug": "rust-m20-l2",
          "title": "Associated Types and Supertraits",
          "objectives": [
            "Explain what Associated Types and Supertraits is and when to use it",
            "Write the Associated Types and Supertraits pattern from the syntax in this lesson",
            "Build a small Rust program that uses Associated Types and Supertraits correctly"
          ],
          "introduction": "Associated Types and Supertraits is a core part of writing Rust. An associated type lets a trait name a type that each implementation chooses, such as Iterator::Item, so the trait stays generic without extra parameters. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "An associated type lets a trait name a type that each implementation chooses, such as Iterator::Item, so the trait stays generic without extra parameters. A supertrait, written trait Child: Parent, requires implementors to also implement the parent trait. Associated types keep generic code readable by hiding type plumbing inside the trait. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "trait Container {\n    type Item;\n    fn get(&self) -> Self::Item;\n}",
          "analogy": "Like a recipe that says 'one fruit' instead of listing apples: the cook chooses the fruit, the recipe stays general.",
          "exampleCode": "fn main() {\n    let message = String::from(\"item\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Associated Types and Supertraits solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = item'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Associated Types and Supertraits syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Associated Types and Supertraits, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Associated Types and Supertraits pattern from this lesson.",
          "summary": "An associated type lets a trait name a type that each implementation chooses, such as Iterator::Item, so the trait stays generic without extra parameters. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Associated Types and Supertraits in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Associated Types and Supertraits?",
              "options": [
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "use associated types and supertraits to design flexible traits",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 2,
              "explanation": "Use associated types and supertraits to design flexible traits — that is the purpose of Associated Types and Supertraits."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = item",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = item'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m20-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Associated Types and Supertraits.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"Hello, {}!\", input.trim());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for greet by name, and prints it. It follows the Associated Types and Supertraits pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "Ada",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "Grace",
                  "expectedStdout": "Hello, Grace!",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Associated Types and Supertraits: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m21",
      "title": "Advanced Lifetimes",
      "description": "Advanced Lifetimes: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 21,
      "lessons": [
        {
          "id": "rust-m21-l1",
          "slug": "rust-m21-l1",
          "title": "Lifetime Subtyping",
          "objectives": [
            "Explain what Lifetime Subtyping is and when to use it",
            "Write the Lifetime Subtyping pattern from the syntax in this lesson",
            "Build a small Rust program that uses Lifetime Subtyping correctly"
          ],
          "introduction": "Lifetime Subtyping is a core part of writing Rust. One lifetime can outlive another, written 'a: 'b, meaning data valid for 'a is also valid for the shorter 'b. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "One lifetime can outlive another, written 'a: 'b, meaning data valid for 'a is also valid for the shorter 'b. Subtyping lets a long-lived reference be used where a shorter one is expected, which is how functions can accept references with different lifetimes. The compiler checks these relationships so a short-lived value is never treated as long-lived. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn pick<'a, 'b: 'a>(x: &'a str, _y: &'b str) -> &'a str { x }",
          "analogy": "Like a long train ticket that is also valid for a shorter journey, but never the other way round.",
          "exampleCode": "fn main() {\n    let message = String::from(\"pick\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Lifetime Subtyping solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = pick'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Lifetime Subtyping syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Lifetime Subtyping, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Lifetime Subtyping pattern from this lesson.",
          "summary": "One lifetime can outlive another, written 'a: 'b, meaning data valid for 'a is also valid for the shorter 'b. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Lifetime Subtyping in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Lifetime Subtyping?",
              "options": [
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "relate lifetimes with subtyping so long-lived references can stand in for short ones",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 2,
              "explanation": "Relate lifetimes with subtyping so long-lived references can stand in for short ones — that is the purpose of Lifetime Subtyping."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = pick"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = pick'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m21-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Lifetime Subtyping.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * n);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for square a number, and prints it. It follows the Lifetime Subtyping pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "6",
                  "expectedStdout": "36",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "9",
                  "expectedStdout": "81",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Lifetime Subtyping: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m21-l2",
          "slug": "rust-m21-l2",
          "title": "Higher-Ranked Trait Bounds",
          "objectives": [
            "Explain what Higher-Ranked Trait Bounds is and when to use it",
            "Write the Higher-Ranked Trait Bounds pattern from the syntax in this lesson",
            "Build a small Rust program that uses Higher-Ranked Trait Bounds correctly"
          ],
          "introduction": "Higher-Ranked Trait Bounds is a core part of writing Rust. Higher-ranked trait bounds, written for<'a>, say a bound must hold for every possible lifetime, not one particular lifetime. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Higher-ranked trait bounds, written for<'a>, say a bound must hold for every possible lifetime, not one particular lifetime. They appear with closures and function pointers that accept references, where the caller chooses the lifetime. HRTBs are an advanced corner, but recognising the for<'a> syntax makes otherwise cryptic errors readable. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "fn apply<F>(f: F) where F: for<'a> Fn(&'a str) { }",
          "analogy": "Like a universal key cut to fit every lock of a given shape, not just one door.",
          "exampleCode": "fn main() {\n    let message = String::from(\"hrtb\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Higher-Ranked Trait Bounds solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = hrtb'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Higher-Ranked Trait Bounds syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Higher-Ranked Trait Bounds, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Higher-Ranked Trait Bounds pattern from this lesson.",
          "summary": "Higher-ranked trait bounds, written for<'a>, say a bound must hold for every possible lifetime, not one particular lifetime. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Higher-Ranked Trait Bounds in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Higher-Ranked Trait Bounds?",
              "options": [
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "express bounds that hold for every lifetime with for<'a>"
              ],
              "answer": 3,
              "explanation": "Express bounds that hold for every lifetime with for<'a> — that is the purpose of Higher-Ranked Trait Bounds."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = hrtb",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = hrtb'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m21-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Higher-Ranked Trait Bounds.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n + 10);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add ten, and prints it. It follows the Higher-Ranked Trait Bounds pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "15",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "0",
                  "expectedStdout": "10",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Higher-Ranked Trait Bounds: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m22",
      "title": "Concurrency",
      "description": "Concurrency: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 22,
      "lessons": [
        {
          "id": "rust-m22-l1",
          "slug": "rust-m22-l1",
          "title": "Threads and Ownership",
          "objectives": [
            "Explain what Threads and Ownership is and when to use it",
            "Write the Threads and Ownership pattern from the syntax in this lesson",
            "Build a small Rust program that uses Threads and Ownership correctly"
          ],
          "introduction": "Threads and Ownership is a core part of writing Rust. Threads are spawned with thread::spawn and a closure, and the closure must own everything it uses, which move guarantees. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Threads are spawned with thread::spawn and a closure, and the closure must own everything it uses, which move guarantees. Ownership makes thread safety a compile-time property: a value moved into a thread cannot be used by the parent afterwards. Joining a thread with handle.join() waits for it to finish and returns its result. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let h = std::thread::spawn(|| 42);\nlet result = h.join().unwrap();",
          "analogy": "Like sending a worker to another room with their own tools: they cannot borrow yours while they are gone.",
          "exampleCode": "fn main() {\n    let count = 42;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Threads and Ownership solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 42'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Threads and Ownership syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Threads and Ownership, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Threads and Ownership pattern from this lesson.",
          "summary": "Threads are spawned with thread::spawn and a closure, and the closure must own everything it uses, which move guarantees. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Threads and Ownership in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Threads and Ownership?",
              "options": [
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "spawn threads that own their data with move closures"
              ],
              "answer": 3,
              "explanation": "Spawn threads that own their data with move closures — that is the purpose of Threads and Ownership."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 42",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 42'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m22-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Threads and Ownership.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] * parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for multiply two numbers, and prints it. It follows the Threads and Ownership pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "12",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "5 6",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Threads and Ownership: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m22-l2",
          "slug": "rust-m22-l2",
          "title": "Message Passing with Channels",
          "objectives": [
            "Explain what Message Passing with Channels is and when to use it",
            "Write the Message Passing with Channels pattern from the syntax in this lesson",
            "Build a small Rust program that uses Message Passing with Channels correctly"
          ],
          "introduction": "Message Passing with Channels is a core part of writing Rust. Channels let threads communicate by sending values: mpsc::channel gives a sender and receiver, send moves a value in, and recv blocks until one arrives. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Channels let threads communicate by sending values: mpsc::channel gives a sender and receiver, send moves a value in, and recv blocks until one arrives. Because ownership moves through the channel, only one thread holds a value at a time, which rules out data races. Message passing is the idiomatic Rust alternative to shared mutable state. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let (tx, rx) = std::sync::mpsc::channel();\ntx.send(42).unwrap();\nlet v = rx.recv().unwrap();",
          "analogy": "Like passing notes between desks: the note changes hands, and only the holder can read it.",
          "exampleCode": "fn main() {\n    let count = 42;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Message Passing with Channels solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 42'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Message Passing with Channels syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Message Passing with Channels, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Message Passing with Channels pattern from this lesson.",
          "summary": "Channels let threads communicate by sending values: mpsc::channel gives a sender and receiver, send moves a value in, and recv blocks until one arrives. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Message Passing with Channels in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Message Passing with Channels?",
              "options": [
                "communicate between threads by sending owned values through channels",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "To compile Rust directly into a web page with no JavaScript"
              ],
              "answer": 0,
              "explanation": "Communicate between threads by sending owned values through channels — that is the purpose of Message Passing with Channels."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 42",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 42'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m22-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Message Passing with Channels.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    if n % 2 == 0 { println!(\"even\"); } else { println!(\"odd\"); }\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for even or odd, and prints it. It follows the Message Passing with Channels pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "4",
                  "expectedStdout": "even",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "7",
                  "expectedStdout": "odd",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Message Passing with Channels: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m23",
      "title": "Async Rust",
      "description": "Async Rust: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 23,
      "lessons": [
        {
          "id": "rust-m23-l1",
          "slug": "rust-m23-l1",
          "title": "async and await",
          "objectives": [
            "Explain what async and await is and when to use it",
            "Write the async and await pattern from the syntax in this lesson",
            "Build a small Rust program that uses async and await correctly"
          ],
          "introduction": "async and await is a core part of writing Rust. An async fn returns a future, a value that represents work not yet done, and .await pauses the current task until the future completes without blocking the thread. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "An async fn returns a future, a value that represents work not yet done, and .await pauses the current task until the future completes without blocking the thread. Async code reads like sequential code but runs concurrently with other tasks. A future does nothing until it is awaited or spawned, so forgetting await means the work never runs. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "async fn fetch() -> String {\n    String::from(\"data\")\n}\nlet data = fetch().await;",
          "analogy": "Like ordering a coffee and stepping aside: you wait for your name to be called instead of blocking the queue.",
          "exampleCode": "fn main() {\n    let message = String::from(\"data\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem async and await solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = data'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the async and await syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to async and await, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the async and await pattern from this lesson.",
          "summary": "An async fn returns a future, a value that represents work not yet done, and .await pauses the current task until the future completes without blocking the thread. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use async and await in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of async and await?",
              "options": [
                "write non-blocking code with async functions and await",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code",
                "To compile Rust directly into a web page with no JavaScript"
              ],
              "answer": 0,
              "explanation": "Write non-blocking code with async functions and await — that is the purpose of async and await."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = data"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = data'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m23-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises async and await.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", input.trim().len());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for word length, and prints it. It follows the async and await pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "rust",
                  "expectedStdout": "4",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "ownership",
                  "expectedStdout": "9",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for async and await: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m23-l2",
          "slug": "rust-m23-l2",
          "title": "Futures and the Tokio Runtime",
          "objectives": [
            "Explain what Futures and the Tokio Runtime is and when to use it",
            "Write the Futures and the Tokio Runtime pattern from the syntax in this lesson",
            "Build a small Rust program that uses Futures and the Tokio Runtime correctly"
          ],
          "introduction": "Futures and the Tokio Runtime is a core part of writing Rust. Futures need an executor to run, and Tokio is the standard async runtime for Rust, providing the executor, timers, networking and file I/O. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Futures need an executor to run, and Tokio is the standard async runtime for Rust, providing the executor, timers, networking and file I/O. tokio::main turns main into an async entry point, and tokio::spawn runs tasks concurrently. Choosing a runtime is a real decision: Tokio is the default for servers, while async-std is a lighter alternative. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "#[tokio::main]\nasync fn main() {\n    println!(\"running\");\n}",
          "analogy": "Like a theatre stage manager: the actors are the futures, and the manager decides who is on stage.",
          "exampleCode": "fn main() {\n    let message = String::from(\"running\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Futures and the Tokio Runtime solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = running'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Futures and the Tokio Runtime syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Futures and the Tokio Runtime, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Futures and the Tokio Runtime pattern from this lesson.",
          "summary": "Futures need an executor to run, and Tokio is the standard async runtime for Rust, providing the executor, timers, networking and file I/O. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Futures and the Tokio Runtime in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Futures and the Tokio Runtime?",
              "options": [
                "To store data permanently in a database without code",
                "run futures on the Tokio async runtime",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them"
              ],
              "answer": 1,
              "explanation": "Run futures on the Tokio async runtime — that is the purpose of Futures and the Tokio Runtime."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = running",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = running'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m23-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Futures and the Tokio Runtime.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * 2);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for double a number, and prints it. It follows the Futures and the Tokio Runtime pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "10",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "21",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Futures and the Tokio Runtime: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m24",
      "title": "Unsafe Rust",
      "description": "Unsafe Rust: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 24,
      "lessons": [
        {
          "id": "rust-m24-l1",
          "slug": "rust-m24-l1",
          "title": "Raw Pointers and unsafe Blocks",
          "objectives": [
            "Explain what Raw Pointers and unsafe Blocks is and when to use it",
            "Write the Raw Pointers and unsafe Blocks pattern from the syntax in this lesson",
            "Build a small Rust program that uses Raw Pointers and unsafe Blocks correctly"
          ],
          "introduction": "Raw Pointers and unsafe Blocks is a core part of writing Rust. Raw pointers *const T and *mut T can point to arbitrary memory and are not checked by the borrow checker, so dereferencing them requires an unsafe block. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Raw pointers *const T and *mut T can point to arbitrary memory and are not checked by the borrow checker, so dereferencing them requires an unsafe block. Unsafe code is how Rust talks to hardware and C libraries, and the unsafe keyword marks the boundary where the programmer takes responsibility for correctness. Safe abstractions should wrap unsafe internals so callers stay safe. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let raw = &x as *const i32;\nunsafe { println!(\"{}\", *raw); }",
          "analogy": "Like a fenced-off construction site: trained workers go in with a helmet, everyone else stays behind the fence.",
          "exampleCode": "fn main() {\n    let count = 5;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Raw Pointers and unsafe Blocks solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Raw Pointers and unsafe Blocks syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Raw Pointers and unsafe Blocks, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Raw Pointers and unsafe Blocks pattern from this lesson.",
          "summary": "Raw pointers *const T and *mut T can point to arbitrary memory and are not checked by the borrow checker, so dereferencing them requires an unsafe block. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Raw Pointers and unsafe Blocks in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Raw Pointers and unsafe Blocks?",
              "options": [
                "To store data permanently in a database without code",
                "dereference raw pointers inside unsafe blocks",
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them"
              ],
              "answer": 1,
              "explanation": "Dereference raw pointers inside unsafe blocks — that is the purpose of Raw Pointers and unsafe Blocks."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 5",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 5'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m24-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Raw Pointers and unsafe Blocks.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] + parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add two numbers, and prints it. It follows the Raw Pointers and unsafe Blocks pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "7",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "10 20",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Raw Pointers and unsafe Blocks: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m24-l2",
          "slug": "rust-m24-l2",
          "title": "Unsafe Traits and FFI Basics",
          "objectives": [
            "Explain what Unsafe Traits and FFI Basics is and when to use it",
            "Write the Unsafe Traits and FFI Basics pattern from the syntax in this lesson",
            "Build a small Rust program that uses Unsafe Traits and FFI Basics correctly"
          ],
          "introduction": "Unsafe Traits and FFI Basics is a core part of writing Rust. Some traits are unsafe to implement because they promise invariants the compiler cannot check, and foreign function interfaces use extern \"C\" to call C code. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Some traits are unsafe to implement because they promise invariants the compiler cannot check, and foreign function interfaces use extern \"C\" to call C code. FFI declarations describe the C function signature in Rust, and calling them is unsafe because Rust cannot verify the C code. Unsafe traits and FFI are the escape hatches that connect Rust to the rest of the system. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "extern \"C\" { fn abs(x: i32) -> i32; }",
          "analogy": "Like a diplomatic translator: both sides agree on the words, but neither can check the other's promises.",
          "exampleCode": "fn main() {\n    let count = 5;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Unsafe Traits and FFI Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Unsafe Traits and FFI Basics syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Unsafe Traits and FFI Basics, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Unsafe Traits and FFI Basics pattern from this lesson.",
          "summary": "Some traits are unsafe to implement because they promise invariants the compiler cannot check, and foreign function interfaces use extern \"C\" to call C code. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Unsafe Traits and FFI Basics in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Unsafe Traits and FFI Basics?",
              "options": [
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "call C code and implement unsafe traits through FFI",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Call C code and implement unsafe traits through FFI — that is the purpose of Unsafe Traits and FFI Basics."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 5",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 5'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m24-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Unsafe Traits and FFI Basics.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"Hello, {}!\", input.trim());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for greet by name, and prints it. It follows the Unsafe Traits and FFI Basics pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "Ada",
                  "expectedStdout": "Hello, Ada!",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "Grace",
                  "expectedStdout": "Hello, Grace!",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Unsafe Traits and FFI Basics: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m25",
      "title": "Systems Programming",
      "description": "Systems Programming: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 25,
      "lessons": [
        {
          "id": "rust-m25-l1",
          "slug": "rust-m25-l1",
          "title": "Reading Files and the Filesystem",
          "objectives": [
            "Explain what Reading Files and the Filesystem is and when to use it",
            "Write the Reading Files and the Filesystem pattern from the syntax in this lesson",
            "Build a small Rust program that uses Reading Files and the Filesystem correctly"
          ],
          "introduction": "Reading Files and the Filesystem is a core part of writing Rust. The std::fs module reads and writes files, lists directories and creates paths, and almost every operation returns a Result because the filesystem can fail in many ways. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "The std::fs module reads and writes files, lists directories and creates paths, and almost every operation returns a Result because the filesystem can fail in many ways. read_to_string loads a whole file into a String, while BufReader streams it line by line for large files. Always handle the Result: a missing file is a normal situation, not a surprise. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let contents = std::fs::read_to_string(\"notes.txt\")?;",
          "analogy": "Like a filing cabinet: you ask for a drawer by name, and sometimes the drawer is empty or locked.",
          "exampleCode": "fn main() {\n    let message = String::from(\"notes\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Reading Files and the Filesystem solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = notes'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Reading Files and the Filesystem syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Indexing a vector past its end, which panics at runtime."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Reading Files and the Filesystem, but it does not work because of using a moved value. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
            "fixedCode": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1.clone();\n    println!(\"{}\", s1);\n}",
            "explanation": "Assigning a String moves ownership; clone it when you need to keep using the original. The String was moved into s2, so s1 can no longer be used."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Reading Files and the Filesystem pattern from this lesson.",
          "summary": "The std::fs module reads and writes files, lists directories and creates paths, and almost every operation returns a Result because the filesystem can fail in many ways. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Reading Files and the Filesystem in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Reading Files and the Filesystem?",
              "options": [
                "To compile Rust directly into a web page with no JavaScript",
                "To run Rust programs without ever compiling them",
                "read and write files with std::fs and handle the Result",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Read and write files with std::fs and handle the Result — that is the purpose of Reading Files and the Filesystem."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = notes"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = notes'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m25-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Reading Files and the Filesystem.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * n);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for square a number, and prints it. It follows the Reading Files and the Filesystem pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "6",
                  "expectedStdout": "36",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "9",
                  "expectedStdout": "81",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Reading Files and the Filesystem: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m25-l2",
          "slug": "rust-m25-l2",
          "title": "Command-Line Arguments and Environment",
          "objectives": [
            "Explain what Command-Line Arguments and Environment is and when to use it",
            "Write the Command-Line Arguments and Environment pattern from the syntax in this lesson",
            "Build a small Rust program that uses Command-Line Arguments and Environment correctly"
          ],
          "introduction": "Command-Line Arguments and Environment is a core part of writing Rust. Command-line arguments arrive through std::env::args, which yields the program name first and then each argument as a String. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Command-line arguments arrive through std::env::args, which yields the program name first and then each argument as a String. Environment variables are read with std::env::var, which returns a Result when the variable is missing. Real CLIs use a library such as clap for parsing, but env::args is enough for small tools and for understanding what clap does for you. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let args: Vec<String> = std::env::args().collect();",
          "analogy": "Like the delivery instructions on a parcel: the program reads them when it starts and acts accordingly.",
          "exampleCode": "fn main() {\n    let message = String::from(\"args\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Command-Line Arguments and Environment solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = args'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Command-Line Arguments and Environment syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Cloning a large value in a loop instead of borrowing it, which wastes time and memory."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Command-Line Arguments and Environment, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
            "fixedCode": "fn main() {\n    let n: i32 = 42;\n    println!(\"{}\", n);\n}",
            "explanation": "Rust checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an i32 variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Command-Line Arguments and Environment pattern from this lesson.",
          "summary": "Command-line arguments arrive through std::env::args, which yields the program name first and then each argument as a String. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Command-Line Arguments and Environment in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Command-Line Arguments and Environment?",
              "options": [
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "read command-line arguments and environment variables"
              ],
              "answer": 3,
              "explanation": "Read command-line arguments and environment variables — that is the purpose of Command-Line Arguments and Environment."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = args",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = args'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m25-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Command-Line Arguments and Environment.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n + 10);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for add ten, and prints it. It follows the Command-Line Arguments and Environment pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "15",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "0",
                  "expectedStdout": "10",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Command-Line Arguments and Environment: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m26",
      "title": "Performance",
      "description": "Performance: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 26,
      "lessons": [
        {
          "id": "rust-m26-l1",
          "slug": "rust-m26-l1",
          "title": "Zero-Cost Abstractions",
          "objectives": [
            "Explain what Zero-Cost Abstractions is and when to use it",
            "Write the Zero-Cost Abstractions pattern from the syntax in this lesson",
            "Build a small Rust program that uses Zero-Cost Abstractions correctly"
          ],
          "introduction": "Zero-Cost Abstractions is a core part of writing Rust. Zero-cost abstractions mean high-level Rust code compiles to the same machine code as hand-written low-level code: iterators, closures and generics cost nothing at runtime. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Zero-cost abstractions mean high-level Rust code compiles to the same machine code as hand-written low-level code: iterators, closures and generics cost nothing at runtime. The compiler monomorphises generics and inlines small functions, so abstraction is free. This is why idiomatic Rust is usually as fast as equivalent C, without the manual bookkeeping. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let total: i32 = (1..=100).sum();",
          "analogy": "Like a well-designed kitchen: the tools are fancy, but the cooking itself is just as fast as with a plain knife.",
          "exampleCode": "fn main() {\n    let count = 100;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Zero-Cost Abstractions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 100'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Zero-Cost Abstractions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring a Result with unwrap in production code instead of handling the error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Zero-Cost Abstractions, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 5.0 / 2.0);\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Zero-Cost Abstractions pattern from this lesson.",
          "summary": "Zero-cost abstractions mean high-level Rust code compiles to the same machine code as hand-written low-level code: iterators, closures and generics cost nothing at runtime. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Zero-Cost Abstractions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Zero-Cost Abstractions?",
              "options": [
                "To run Rust programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "use high-level abstractions that compile to fast machine code"
              ],
              "answer": 3,
              "explanation": "Use high-level abstractions that compile to fast machine code — that is the purpose of Zero-Cost Abstractions."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 100",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 100'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m26-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Zero-Cost Abstractions.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] * parts[1]);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for multiply two numbers, and prints it. It follows the Zero-Cost Abstractions pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "3 4",
                  "expectedStdout": "12",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "5 6",
                  "expectedStdout": "30",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Zero-Cost Abstractions: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m26-l2",
          "slug": "rust-m26-l2",
          "title": "Profiling and Optimisation Basics",
          "objectives": [
            "Explain what Profiling and Optimisation Basics is and when to use it",
            "Write the Profiling and Optimisation Basics pattern from the syntax in this lesson",
            "Build a small Rust program that uses Profiling and Optimisation Basics correctly"
          ],
          "introduction": "Profiling and Optimisation Basics is a core part of writing Rust. Optimisation starts with measurement: profile with a tool such as perf or cargo-flamegraph before changing anything, because intuition about hot spots is usually wrong. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Optimisation starts with measurement: profile with a tool such as perf or cargo-flamegraph before changing anything, because intuition about hot spots is usually wrong. Release builds with cargo build --release enable optimisations that debug builds skip. Common wins are avoiding needless clones, choosing the right data structure, and reducing allocations in hot loops. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "cargo build --release",
          "analogy": "Like a doctor checking your pulse before prescribing: measure first, treat second.",
          "exampleCode": "fn main() {\n    let count = 100;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Profiling and Optimisation Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 100'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Profiling and Optimisation Basics syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting the semicolon at the end of a statement, which the compiler reports as a syntax error."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Profiling and Optimisation Basics, but it does not work because of an off-by-one range. Find and fix the bug.",
            "buggyCode": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
            "fixedCode": "fn main() {\n    for i in 1..=3 {\n        println!(\"{}\", i);\n    }\n}",
            "explanation": "Rust ranges are exclusive at the end: use ..= for an inclusive range. The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Profiling and Optimisation Basics pattern from this lesson.",
          "summary": "Optimisation starts with measurement: profile with a tool such as perf or cargo-flamegraph before changing anything, because intuition about hot spots is usually wrong. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Profiling and Optimisation Basics in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Profiling and Optimisation Basics?",
              "options": [
                "profile before optimising and use release builds for measurement",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Profile before optimising and use release builds for measurement — that is the purpose of Profiling and Optimisation Basics."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 100",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 100'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m26-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Profiling and Optimisation Basics.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    if n % 2 == 0 { println!(\"even\"); } else { println!(\"odd\"); }\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for even or odd, and prints it. It follows the Profiling and Optimisation Basics pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "4",
                  "expectedStdout": "even",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "7",
                  "expectedStdout": "odd",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Profiling and Optimisation Basics: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rust-m27",
      "title": "Advanced Projects",
      "description": "Advanced Projects: two lessons that build real Rust skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 27,
      "lessons": [
        {
          "id": "rust-m27-l1",
          "slug": "rust-m27-l1",
          "title": "Project: Tiny HTTP Server",
          "objectives": [
            "Explain what Project: Tiny HTTP Server is and when to use it",
            "Write the Project: Tiny HTTP Server pattern from the syntax in this lesson",
            "Build a small Rust program that uses Project: Tiny HTTP Server correctly"
          ],
          "introduction": "Project: Tiny HTTP Server is a core part of writing Rust. A tiny HTTP server listens on a TCP socket, reads the request line, and writes back a response with a status line, headers and a body. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A tiny HTTP server listens on a TCP socket, reads the request line, and writes back a response with a status line, headers and a body. It combines TcpListener, threads, string parsing and error handling into one recognisable system. Handling each connection on its own thread is the simplest design, and it is enough to serve real requests. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let listener = std::net::TcpListener::bind(\"127.0.0.1:7878\").unwrap();",
          "analogy": "Like a reception desk: listen for the doorbell, greet the visitor, and hand them what they asked for.",
          "exampleCode": "fn main() {\n    let count = 7878;\n    println!(\"count = {}\", count);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Project: Tiny HTTP Server solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 7878'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Tiny HTTP Server syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using a value after moving it, which the borrow checker rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: Tiny HTTP Server, but it does not work because of a missing semicolon. Find and fix the bug.",
            "buggyCode": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
            "fixedCode": "fn main() {\n    let x = 5;\n    println!(\"{}\", x);\n}",
            "explanation": "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error. The statement is missing its semicolon, so the compiler cannot parse the program."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: Tiny HTTP Server pattern from this lesson.",
          "summary": "A tiny HTTP server listens on a TCP socket, reads the request line, and writes back a response with a status line, headers and a body. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Tiny HTTP Server in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Tiny HTTP Server?",
              "options": [
                "build a tiny HTTP server on TCP sockets",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Rust compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Build a tiny HTTP server on TCP sockets — that is the purpose of Project: Tiny HTTP Server."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "count = 7878"
              ],
              "answer": 3,
              "explanation": "The example prints 'count = 7878'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m27-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Project: Tiny HTTP Server.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", input.trim().len());\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for word length, and prints it. It follows the Project: Tiny HTTP Server pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "rust",
                  "expectedStdout": "4",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "ownership",
                  "expectedStdout": "9",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Project: Tiny HTTP Server: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        },
        {
          "id": "rust-m27-l2",
          "slug": "rust-m27-l2",
          "title": "Project: Concurrent Key-Value Store",
          "objectives": [
            "Explain what Project: Concurrent Key-Value Store is and when to use it",
            "Write the Project: Concurrent Key-Value Store pattern from the syntax in this lesson",
            "Build a small Rust program that uses Project: Concurrent Key-Value Store correctly"
          ],
          "introduction": "Project: Concurrent Key-Value Store is a core part of writing Rust. A concurrent key-value store holds a HashMap behind a Mutex or RwLock, accepts set and get commands over TCP, and serves many clients from a thread pool. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A concurrent key-value store holds a HashMap behind a Mutex or RwLock, accepts set and get commands over TCP, and serves many clients from a thread pool. It practices shared state, locking, and protocol design in one project. The hard part is not the map, it is deciding the locking discipline so threads never deadlock or corrupt data. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "let store = std::sync::Arc::new(std::sync::Mutex::new(HashMap::new()));",
          "analogy": "Like a shared whiteboard in a busy office: one marker at a time, and everyone reads the same board.",
          "exampleCode": "fn main() {\n    let message = String::from(\"store\");\n    println!(\"message = {}\", message);\n}",
          "exampleLanguage": "rust",
          "walkthrough": [
            "Read the concept above and note what problem Project: Concurrent Key-Value Store solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = store'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Concurrent Key-Value Store syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Writing a number literal with the wrong type, such as assigning a string to an i32."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: Concurrent Key-Value Store, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
            "fixedCode": "fn main() {\n    println!(\"{}\", 10 + 20);\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: Concurrent Key-Value Store pattern from this lesson.",
          "summary": "A concurrent key-value store holds a HashMap behind a Mutex or RwLock, accepts set and get commands over TCP, and serves many clients from a thread pool. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Concurrent Key-Value Store in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Concurrent Key-Value Store?",
              "options": [
                "To make the program use more memory on purpose",
                "build a concurrent key-value store with shared state and locking",
                "To replace the Rust compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Build a concurrent key-value store with shared state and locking — that is the purpose of Project: Concurrent Key-Value Store."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = store",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = store'."
            }
          ],
          "exercises": [
            {
              "id": "rust-m27-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Project: Concurrent Key-Value Store.",
              "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * 2);\n}",
              "solutionExplanation": "The solution reads all of stdin, parses the input, computes the answer for double a number, and prints it. It follows the Project: Concurrent Key-Value Store pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "5",
                  "expectedStdout": "10",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "21",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Project: Concurrent Key-Value Store: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const RUST_ASSESSMENT: MasteryAssessment = {
  "courseSlug": "rust",
  "passPercent": 80,
  "questions": [
    {
      "id": "rust-assess-q1",
      "kind": "conceptual",
      "topic": "What Is Rust?",
      "question": "Which statement best describes What Is Rust??",
      "options": [
        "give low-level control with compile-time memory safety and no garbage collector",
        "To replace the Rust compiler with a faster one",
        "To store data permanently in a database without code",
        "To compile Rust directly into a web page with no JavaScript"
      ],
      "answer": 0,
      "explanation": "Give low-level control with compile-time memory safety and no garbage collector."
    },
    {
      "id": "rust-assess-q2",
      "kind": "conceptual",
      "topic": "Installing Rust and Cargo",
      "question": "Which statement best describes Installing Rust and Cargo?",
      "options": [
        "To store data permanently in a database without code",
        "manage Rust projects, builds and dependencies with Cargo",
        "To compile Rust directly into a web page with no JavaScript",
        "To run Rust programs without ever compiling them"
      ],
      "answer": 1,
      "explanation": "Manage Rust projects, builds and dependencies with Cargo."
    },
    {
      "id": "rust-assess-q3",
      "kind": "conceptual",
      "topic": "Declaring Variables with let",
      "question": "Which statement best describes Declaring Variables with let?",
      "options": [
        "To compile Rust directly into a web page with no JavaScript",
        "To run Rust programs without ever compiling them",
        "declare immutable bindings with let and let the compiler infer the type",
        "To delete unused files from the project automatically"
      ],
      "answer": 2,
      "explanation": "Declare immutable bindings with let and let the compiler infer the type."
    },
    {
      "id": "rust-assess-q4",
      "kind": "conceptual",
      "topic": "Mutability",
      "question": "Which statement best describes Mutability?",
      "options": [
        "To run Rust programs without ever compiling them",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "allow reassignment by marking a variable mut"
      ],
      "answer": 3,
      "explanation": "Allow reassignment by marking a variable mut."
    },
    {
      "id": "rust-assess-q5",
      "kind": "conceptual",
      "topic": "Scalar Types",
      "question": "Which statement best describes Scalar Types?",
      "options": [
        "store single values with integer, float, boolean and character types",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "To replace the Rust compiler with a faster one"
      ],
      "answer": 0,
      "explanation": "Store single values with integer, float, boolean and character types."
    },
    {
      "id": "rust-assess-q6",
      "kind": "conceptual",
      "topic": "Compound Types: Tuples and Arrays",
      "question": "Which statement best describes Compound Types: Tuples and Arrays?",
      "options": [
        "To make the program use more memory on purpose",
        "group values with tuples and fixed-length arrays",
        "To replace the Rust compiler with a faster one",
        "To store data permanently in a database without code"
      ],
      "answer": 1,
      "explanation": "Group values with tuples and fixed-length arrays."
    },
    {
      "id": "rust-assess-q7",
      "kind": "conceptual",
      "topic": "if Expressions",
      "question": "Which statement best describes if Expressions?",
      "options": [
        "To replace the Rust compiler with a faster one",
        "To store data permanently in a database without code",
        "branch on boolean conditions and produce values from if expressions",
        "To compile Rust directly into a web page with no JavaScript"
      ],
      "answer": 2,
      "explanation": "Branch on boolean conditions and produce values from if expressions."
    },
    {
      "id": "rust-assess-q8",
      "kind": "conceptual",
      "topic": "Loops: loop, while and for",
      "question": "Which statement best describes Loops: loop, while and for?",
      "options": [
        "To store data permanently in a database without code",
        "To compile Rust directly into a web page with no JavaScript",
        "To run Rust programs without ever compiling them",
        "repeat work with loop, while and for"
      ],
      "answer": 3,
      "explanation": "Repeat work with loop, while and for."
    },
    {
      "id": "rust-assess-q9",
      "kind": "conceptual",
      "topic": "Defining and Calling Functions",
      "question": "Which statement best describes Defining and Calling Functions?",
      "options": [
        "organise code into named, typed functions",
        "To compile Rust directly into a web page with no JavaScript",
        "To run Rust programs without ever compiling them",
        "To delete unused files from the project automatically"
      ],
      "answer": 0,
      "explanation": "Organise code into named, typed functions."
    },
    {
      "id": "rust-assess-q10",
      "kind": "conceptual",
      "topic": "Parameters and Return Values",
      "question": "Which statement best describes Parameters and Return Values?",
      "options": [
        "To run Rust programs without ever compiling them",
        "pass typed parameters and return values from functions",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose"
      ],
      "answer": 1,
      "explanation": "Pass typed parameters and return values from functions."
    },
    {
      "id": "rust-assess-q11",
      "kind": "conceptual",
      "topic": "What Ownership Means",
      "question": "Which statement best describes What Ownership Means?",
      "options": [
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "track exactly one owner per value and free it when the owner goes out of scope",
        "To replace the Rust compiler with a faster one"
      ],
      "answer": 2,
      "explanation": "Track exactly one owner per value and free it when the owner goes out of scope."
    },
    {
      "id": "rust-assess-q12",
      "kind": "conceptual",
      "topic": "Moves and Cloning",
      "question": "Which statement best describes Moves and Cloning?",
      "options": [
        "To make the program use more memory on purpose",
        "To replace the Rust compiler with a faster one",
        "To store data permanently in a database without code",
        "move values by default, copy cheap types, and clone explicitly when needed"
      ],
      "answer": 3,
      "explanation": "Move values by default, copy cheap types, and clone explicitly when needed."
    },
    {
      "id": "rust-assess-q13",
      "kind": "conceptual",
      "topic": "References and Borrowing",
      "question": "Which statement best describes References and Borrowing?",
      "options": [
        "share data temporarily through references without taking ownership",
        "To replace the Rust compiler with a faster one",
        "To store data permanently in a database without code",
        "To compile Rust directly into a web page with no JavaScript"
      ],
      "answer": 0,
      "explanation": "Share data temporarily through references without taking ownership."
    },
    {
      "id": "rust-assess-q14",
      "kind": "conceptual",
      "topic": "Mutable References",
      "question": "Which statement best describes Mutable References?",
      "options": [
        "To store data permanently in a database without code",
        "change borrowed data through exactly one mutable reference at a time",
        "To compile Rust directly into a web page with no JavaScript",
        "To run Rust programs without ever compiling them"
      ],
      "answer": 1,
      "explanation": "Change borrowed data through exactly one mutable reference at a time."
    },
    {
      "id": "rust-assess-q15",
      "kind": "conceptual",
      "topic": "String vs str",
      "question": "Which statement best describes String vs str?",
      "options": [
        "To compile Rust directly into a web page with no JavaScript",
        "To run Rust programs without ever compiling them",
        "use owned String for growable text and borrowed &str for reading it",
        "To delete unused files from the project automatically"
      ],
      "answer": 2,
      "explanation": "Use owned String for growable text and borrowed &str for reading it."
    },
    {
      "id": "rust-assess-q16",
      "kind": "conceptual",
      "topic": "Working with Strings",
      "question": "Which statement best describes Working with Strings?",
      "options": [
        "To run Rust programs without ever compiling them",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "build and combine strings with push, push_str and format"
      ],
      "answer": 3,
      "explanation": "Build and combine strings with push, push_str and format."
    },
    {
      "id": "rust-assess-q17",
      "kind": "conceptual",
      "topic": "Defining Structs",
      "question": "Which statement best describes Defining Structs?",
      "options": [
        "group related fields into a named struct type",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "To replace the Rust compiler with a faster one"
      ],
      "answer": 0,
      "explanation": "Group related fields into a named struct type."
    },
    {
      "id": "rust-assess-q18",
      "kind": "conceptual",
      "topic": "Methods and Associated Functions",
      "question": "Which statement best describes Methods and Associated Functions?",
      "options": [
        "To make the program use more memory on purpose",
        "attach behaviour to structs with methods and associated functions",
        "To replace the Rust compiler with a faster one",
        "To store data permanently in a database without code"
      ],
      "answer": 1,
      "explanation": "Attach behaviour to structs with methods and associated functions."
    },
    {
      "id": "rust-assess-q19",
      "kind": "conceptual",
      "topic": "Defining Enums",
      "question": "Which statement best describes Defining Enums?",
      "options": [
        "To replace the Rust compiler with a faster one",
        "To store data permanently in a database without code",
        "model a fixed set of choices with enums",
        "To compile Rust directly into a web page with no JavaScript"
      ],
      "answer": 2,
      "explanation": "Model a fixed set of choices with enums."
    },
    {
      "id": "rust-assess-q20",
      "kind": "conceptual",
      "topic": "Pattern Matching with match",
      "question": "Which statement best describes Pattern Matching with match?",
      "options": [
        "To store data permanently in a database without code",
        "To compile Rust directly into a web page with no JavaScript",
        "To run Rust programs without ever compiling them",
        "handle every variant exhaustively with match"
      ],
      "answer": 3,
      "explanation": "Handle every variant exhaustively with match."
    },
    {
      "id": "rust-assess-q21",
      "kind": "code-reading",
      "topic": "Project: Guessing Game",
      "question": "What does this code do?",
      "code": "let mut guess = String::new();\nstd::io::stdin().read_line(&mut guess).unwrap();\nlet guess: u32 = guess.trim().parse().unwrap();",
      "options": [
        "It demonstrates a different Rust pattern",
        "It demonstrates Project: Guessing Game",
        "It is invalid Rust that cannot compile",
        "It only works in a debug build"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for Project: Guessing Game: build a guessing game with input, parsing and comparison."
    },
    {
      "id": "rust-assess-q22",
      "kind": "code-reading",
      "topic": "Project: Temperature Converter",
      "question": "What does this code do?",
      "code": "fn c_to_f(c: f64) -> f64 {\n    c * 9.0 / 5.0 + 32.0\n}",
      "options": [
        "It demonstrates a different Rust pattern",
        "It is invalid Rust that cannot compile",
        "It demonstrates Project: Temperature Converter",
        "It only works in a debug build"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for Project: Temperature Converter: build a temperature converter with functions and float arithmetic."
    },
    {
      "id": "rust-assess-q23",
      "kind": "code-reading",
      "topic": "Vectors",
      "question": "What does this code do?",
      "code": "let mut v = vec![1, 2, 3];\nv.push(4);",
      "options": [
        "It demonstrates a different Rust pattern",
        "It is invalid Rust that cannot compile",
        "It only works in a debug build",
        "It demonstrates Vectors"
      ],
      "answer": 3,
      "explanation": "The snippet is the syntax for Vectors: store growable lists of one type with Vec."
    },
    {
      "id": "rust-assess-q24",
      "kind": "code-reading",
      "topic": "HashMaps",
      "question": "What does this code do?",
      "code": "use std::collections::HashMap;\nlet mut scores = HashMap::new();\nscores.insert(\"Ada\", 10);",
      "options": [
        "It demonstrates HashMaps",
        "It demonstrates a different Rust pattern",
        "It is invalid Rust that cannot compile",
        "It only works in a debug build"
      ],
      "answer": 0,
      "explanation": "The snippet is the syntax for HashMaps: store and look up key-value pairs with HashMap."
    },
    {
      "id": "rust-assess-q25",
      "kind": "code-reading",
      "topic": "Result and Recoverable Errors",
      "question": "What does this code do?",
      "code": "fn read() -> Result<String, std::io::Error> {\n    std::fs::read_to_string(\"a.txt\")\n}",
      "options": [
        "It demonstrates a different Rust pattern",
        "It demonstrates Result and Recoverable Errors",
        "It is invalid Rust that cannot compile",
        "It only works in a debug build"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for Result and Recoverable Errors: handle recoverable failures with Result and the ? operator."
    },
    {
      "id": "rust-assess-q26",
      "kind": "code-reading",
      "topic": "panic! and Unrecoverable Errors",
      "question": "What does this code do?",
      "code": "let v = vec![1, 2, 3];\nlet x = v[99]; // panics",
      "options": [
        "It demonstrates a different Rust pattern",
        "It is invalid Rust that cannot compile",
        "It demonstrates panic! and Unrecoverable Errors",
        "It only works in a debug build"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for panic! and Unrecoverable Errors: stop the program for unrecoverable bugs with panic."
    },
    {
      "id": "rust-assess-q27",
      "kind": "code-reading",
      "topic": "Generic Functions",
      "question": "What does this code do?",
      "code": "fn largest<T: PartialOrd>(a: T, b: T) -> T {\n    if a > b { a } else { b }\n}",
      "options": [
        "It demonstrates a different Rust pattern",
        "It is invalid Rust that cannot compile",
        "It only works in a debug build",
        "It demonstrates Generic Functions"
      ],
      "answer": 3,
      "explanation": "The snippet is the syntax for Generic Functions: write one function that works for many types with generics."
    },
    {
      "id": "rust-assess-q28",
      "kind": "code-reading",
      "topic": "Generic Structs and Enums",
      "question": "What does this code do?",
      "code": "struct Point<T> { x: T, y: T }\nlet p = Point { x: 5, y: 10 };",
      "options": [
        "It demonstrates Generic Structs and Enums",
        "It demonstrates a different Rust pattern",
        "It is invalid Rust that cannot compile",
        "It only works in a debug build"
      ],
      "answer": 0,
      "explanation": "The snippet is the syntax for Generic Structs and Enums: make structs and enums reusable over many types."
    },
    {
      "id": "rust-assess-q29",
      "kind": "code-reading",
      "topic": "Lifetime Basics",
      "question": "What does this code do?",
      "code": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}",
      "options": [
        "It demonstrates a different Rust pattern",
        "It demonstrates Lifetime Basics",
        "It is invalid Rust that cannot compile",
        "It only works in a debug build"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for Lifetime Basics: ensure references never outlive the data they point to."
    },
    {
      "id": "rust-assess-q30",
      "kind": "code-reading",
      "topic": "Lifetime Elision and Annotations",
      "question": "What does this code do?",
      "code": "fn first<'a>(x: &'a str, _y: &str) -> &'a str { x }",
      "options": [
        "It demonstrates a different Rust pattern",
        "It is invalid Rust that cannot compile",
        "It demonstrates Lifetime Elision and Annotations",
        "It only works in a debug build"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for Lifetime Elision and Annotations: omit lifetime annotations where elision rules apply and write them where needed."
    },
    {
      "id": "rust-assess-q31",
      "kind": "debugging",
      "topic": "Modules and Visibility",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
      "options": [
        "The program imports the wrong crate",
        "The program is missing a Cargo.toml file",
        "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error.",
        "The program uses too much memory"
      ],
      "answer": 2,
      "explanation": "The statement is missing its semicolon, so the compiler cannot parse the program."
    },
    {
      "id": "rust-assess-q32",
      "kind": "debugging",
      "topic": "Crates and use",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
      "options": [
        "The program imports the wrong crate",
        "The program is missing a Cargo.toml file",
        "The program uses too much memory",
        "Read the operator carefully: a single wrong character changes the whole result."
      ],
      "answer": 3,
      "explanation": "The program subtracts where it should add, so it prints -10 instead of the sum 30."
    },
    {
      "id": "rust-assess-q33",
      "kind": "debugging",
      "topic": "Iterator Basics",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
      "options": [
        "Assigning a String moves ownership; clone it when you need to keep using the original.",
        "The program imports the wrong crate",
        "The program is missing a Cargo.toml file",
        "The program uses too much memory"
      ],
      "answer": 0,
      "explanation": "The String was moved into s2, so s1 can no longer be used."
    },
    {
      "id": "rust-assess-q34",
      "kind": "debugging",
      "topic": "map, filter and collect",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
      "options": [
        "The program imports the wrong crate",
        "Rust checks types at compile time: a string is not a number, even when it looks like one.",
        "The program is missing a Cargo.toml file",
        "The program uses too much memory"
      ],
      "answer": 1,
      "explanation": "A string literal is assigned to an i32 variable, which the compiler rejects."
    },
    {
      "id": "rust-assess-q35",
      "kind": "debugging",
      "topic": "Writing Unit Tests",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    println!(\"{}\", 5 / 2);\n}",
      "options": [
        "The program imports the wrong crate",
        "The program is missing a Cargo.toml file",
        "Use floating-point literals when you need a fractional result; integer division discards the remainder.",
        "The program uses too much memory"
      ],
      "answer": 2,
      "explanation": "Integer division truncates, so 5 / 2 is 2, not 2.5."
    },
    {
      "id": "rust-assess-q36",
      "kind": "debugging",
      "topic": "Integration Tests and Documentation Tests",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    for i in 0..3 {\n        println!(\"{}\", i);\n    }\n}",
      "options": [
        "The program imports the wrong crate",
        "The program is missing a Cargo.toml file",
        "The program uses too much memory",
        "Rust ranges are exclusive at the end: use ..= for an inclusive range."
      ],
      "answer": 3,
      "explanation": "The range 0..3 yields 0, 1 and 2, not 1, 2 and 3."
    },
    {
      "id": "rust-assess-q37",
      "kind": "debugging",
      "topic": "Project: CLI Todo Tool",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    let x = 5\n    println!(\"{}\", x);\n}",
      "options": [
        "Every statement in Rust ends with a semicolon; without it the compiler reports a syntax error.",
        "The program imports the wrong crate",
        "The program is missing a Cargo.toml file",
        "The program uses too much memory"
      ],
      "answer": 0,
      "explanation": "The statement is missing its semicolon, so the compiler cannot parse the program."
    },
    {
      "id": "rust-assess-q38",
      "kind": "debugging",
      "topic": "Project: File Word Counter",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    println!(\"{}\", 10 - 20);\n}",
      "options": [
        "The program imports the wrong crate",
        "Read the operator carefully: a single wrong character changes the whole result.",
        "The program is missing a Cargo.toml file",
        "The program uses too much memory"
      ],
      "answer": 1,
      "explanation": "The program subtracts where it should add, so it prints -10 instead of the sum 30."
    },
    {
      "id": "rust-assess-q39",
      "kind": "debugging",
      "topic": "Trait Bounds and Default Methods",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
      "options": [
        "The program imports the wrong crate",
        "The program is missing a Cargo.toml file",
        "Assigning a String moves ownership; clone it when you need to keep using the original.",
        "The program uses too much memory"
      ],
      "answer": 2,
      "explanation": "The String was moved into s2, so s1 can no longer be used."
    },
    {
      "id": "rust-assess-q40",
      "kind": "debugging",
      "topic": "Associated Types and Supertraits",
      "question": "What is wrong with this program?",
      "code": "fn main() {\n    let n: i32 = \"42\";\n    println!(\"{}\", n);\n}",
      "options": [
        "The program imports the wrong crate",
        "The program is missing a Cargo.toml file",
        "The program uses too much memory",
        "Rust checks types at compile time: a string is not a number, even when it looks like one."
      ],
      "answer": 3,
      "explanation": "A string literal is assigned to an i32 variable, which the compiler rejects."
    }
  ],
  "programmingExercises": [
    {
      "id": "rust-assess-ex1",
      "title": "Double It",
      "type": "build-program",
      "instructions": "Read one integer and print twice its value.",
      "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * 2);\n}",
      "solutionExplanation": "The solution reads stdin, parses the input, computes the answer, and prints it.",
      "complexity": "O(1) time, O(1) extra space",
      "tests": [
        {
          "name": "example input",
          "stdin": "5",
          "expectedStdout": "10",
          "hidden": false
        },
        {
          "name": "hidden input",
          "stdin": "21",
          "expectedStdout": "42",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the task for Double It: Read one integer and print twice its value."
        },
        {
          "level": 2,
          "title": "Plan the program",
          "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
        }
      ]
    },
    {
      "id": "rust-assess-ex2",
      "title": "Add Two Numbers",
      "type": "build-program",
      "instructions": "Read two integers separated by a space and print their sum.",
      "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let parts: Vec<i64> = input.split_whitespace().map(|s| s.parse().unwrap()).collect();\n    println!(\"{}\", parts[0] + parts[1]);\n}",
      "solutionExplanation": "The solution reads stdin, parses the input, computes the answer, and prints it.",
      "complexity": "O(1) time, O(1) extra space",
      "tests": [
        {
          "name": "example input",
          "stdin": "3 4",
          "expectedStdout": "7",
          "hidden": false
        },
        {
          "name": "hidden input",
          "stdin": "10 20",
          "expectedStdout": "30",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the task for Add Two Numbers: Read two integers separated by a space and print their sum."
        },
        {
          "level": 2,
          "title": "Plan the program",
          "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
        }
      ]
    },
    {
      "id": "rust-assess-ex3",
      "title": "Greet by Name",
      "type": "build-program",
      "instructions": "Read a name and print 'Hello, NAME!'.",
      "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"Hello, {}!\", input.trim());\n}",
      "solutionExplanation": "The solution reads stdin, parses the input, computes the answer, and prints it.",
      "complexity": "O(1) time, O(1) extra space",
      "tests": [
        {
          "name": "example input",
          "stdin": "Ada",
          "expectedStdout": "Hello, Ada!",
          "hidden": false
        },
        {
          "name": "hidden input",
          "stdin": "Grace",
          "expectedStdout": "Hello, Grace!",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the task for Greet by Name: Read a name and print 'Hello, NAME!'."
        },
        {
          "level": 2,
          "title": "Plan the program",
          "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
        }
      ]
    },
    {
      "id": "rust-assess-ex4",
      "title": "Square It",
      "type": "build-program",
      "instructions": "Read one integer and print its square.",
      "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    println!(\"{}\", n * n);\n}",
      "solutionExplanation": "The solution reads stdin, parses the input, computes the answer, and prints it.",
      "complexity": "O(1) time, O(1) extra space",
      "tests": [
        {
          "name": "example input",
          "stdin": "6",
          "expectedStdout": "36",
          "hidden": false
        },
        {
          "name": "hidden input",
          "stdin": "9",
          "expectedStdout": "81",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the task for Square It: Read one integer and print its square."
        },
        {
          "level": 2,
          "title": "Plan the program",
          "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
        }
      ]
    },
    {
      "id": "rust-assess-ex5",
      "title": "Even or Odd",
      "type": "build-program",
      "instructions": "Read one integer and print 'even' or 'odd'.",
      "starterCode": "fn main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "fn main() {\n    use std::io::{self, Read};\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let n: i64 = input.trim().parse().unwrap();\n    if n % 2 == 0 { println!(\"even\"); } else { println!(\"odd\"); }\n}",
      "solutionExplanation": "The solution reads stdin, parses the input, computes the answer, and prints it.",
      "complexity": "O(1) time, O(1) extra space",
      "tests": [
        {
          "name": "example input",
          "stdin": "4",
          "expectedStdout": "even",
          "hidden": false
        },
        {
          "name": "hidden input",
          "stdin": "7",
          "expectedStdout": "odd",
          "hidden": true
        }
      ],
      "hints": [
        {
          "level": 1,
          "title": "What is the goal?",
          "content": "Re-read the task for Even or Odd: Read one integer and print 'even' or 'odd'."
        },
        {
          "level": 2,
          "title": "Plan the program",
          "content": "Read all of stdin into a String, trim it, and parse it into the type you need before computing the answer."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "read stdin to string; parse the value(s); compute the result; println! the result. For two numbers, split_whitespace gives you each part."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program panics on parse, check that you trimmed the input — a trailing newline makes parse fail. If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it reads stdin with read_to_string, parses with .parse().unwrap(), computes the answer, and prints it with println!."
        }
      ]
    }
  ],
  "capstone": {
    "title": "Command-Line Task Manager",
    "description": "Build a complete command-line task manager in Rust: add, list, complete and delete tasks stored in a file, with proper error handling, unit tests, and a clean module structure.",
    "requirements": [
      "Parse subcommands add, list, done and remove from the command line",
      "Persist tasks in a file and load them on every run",
      "Handle missing files, bad input and invalid task ids with Result, not panics",
      "Organise the code into at least three modules with clear responsibilities",
      "Include unit tests for the core task logic with at least 80 percent coverage of it",
      "Support a --help flag that prints usage information"
    ],
    "rubric": [
      "The CLI works end to end for all four subcommands",
      "Errors are handled with Result and clear messages, not unwrap in main paths",
      "Ownership and borrowing are used correctly with no compiler warnings",
      "Tests cover the core logic and pass with cargo test",
      "Code is organised into modules and is readable and idiomatic"
    ]
  }
};
