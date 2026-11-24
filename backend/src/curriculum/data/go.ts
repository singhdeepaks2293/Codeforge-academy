import type { Course, MasteryAssessment } from '../types.js';

export const GO_COURSE: Course = {
  "id": "go",
  "slug": "go",
  "language": "go",
  "title": "Go",
  "description": "Learn Go from the ground up: variables, functions, structs, interfaces, error handling, testing, HTTP servers and concurrency with goroutines and channels, with a working program in every lesson.",
  "difficulty": "All levels",
  "estimatedHours": 50,
  "skills": [
    "Go syntax and types",
    "Functions and multiple returns",
    "Structs, methods and interfaces",
    "Error handling",
    "Packages and modules",
    "Testing and benchmarking",
    "HTTP servers and JSON",
    "Goroutines and channels",
    "Context and cancellation"
  ],
  "prerequisites": [],
  "modules": [
    {
      "id": "go-m1",
      "title": "Introduction",
      "description": "Introduction: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "go-m1-l1",
          "slug": "go-m1-l1",
          "title": "What Is Go?",
          "objectives": [
            "Explain what What Is Go? is and when to use it",
            "Write the What Is Go? pattern from the syntax in this lesson",
            "Build a small Go program that uses What Is Go? correctly"
          ],
          "introduction": "What Is Go? is a core part of writing Go. Go is a compiled language created at Google for building fast, reliable servers and tools. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Go is a compiled language created at Google for building fast, reliable servers and tools. It has a small, clean syntax, a garbage collector, and built-in support for concurrency with goroutines and channels. Go compiles to a single binary, which makes deployment as simple as copying one file. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n}",
          "analogy": "Like a well-organised toolbox: few tools, each one excellent, and nothing you do not need.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"gopher\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem What Is Go? solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = gopher'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the What Is Go? syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Copying a struct that contains a mutex, which breaks the lock."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to What Is Go?, but it does not work because of using = instead of ==. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x == 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "explanation": "Comparison uses ==; a single = is assignment and is not allowed as a condition. A single = assigns instead of comparing, which is a compile error in an if condition."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the What Is Go? pattern from this lesson.",
          "summary": "Go is a compiled language created at Google for building fast, reliable servers and tools. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use What Is Go? in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of What Is Go??",
              "options": [
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "build fast, reliable servers with a small, clean language",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Build fast, reliable servers with a small, clean language — that is the purpose of What Is Go?."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = gopher"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = gopher'."
            }
          ],
          "exercises": [
            {
              "id": "go-m1-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises What Is Go?.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * n)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for square a number, and prints it. It follows the What Is Go? pattern from this lesson.",
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
                  "content": "Re-read the task for What Is Go?: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m1-l2",
          "slug": "go-m1-l2",
          "title": "Installing Go and Your First Program",
          "objectives": [
            "Explain what Installing Go and Your First Program is and when to use it",
            "Write the Installing Go and Your First Program pattern from the syntax in this lesson",
            "Build a small Go program that uses Installing Go and Your First Program correctly"
          ],
          "introduction": "Installing Go and Your First Program is a core part of writing Go. Go is installed from the official download, and a project is a module created with go mod init, which records the module path in go.mod. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Go is installed from the official download, and a project is a module created with go mod init, which records the module path in go.mod. A program starts in package main and func main, and go run executes it while go build produces a binary. The gofmt tool formats every file the same way, so Go code looks consistent everywhere. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "go mod init example.com/hello\ngo run .",
          "analogy": "Like a new workshop with the benches already bolted down: you just walk in and start building.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 42\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Installing Go and Your First Program solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 42'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Installing Go and Your First Program syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Starting a goroutine without a way to wait for it or stop it."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Installing Go and Your First Program, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = 42\n    fmt.Println(n)\n}",
            "explanation": "Go checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an int variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Installing Go and Your First Program pattern from this lesson.",
          "summary": "Go is installed from the official download, and a project is a module created with go mod init, which records the module path in go.mod. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Installing Go and Your First Program in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Installing Go and Your First Program?",
              "options": [
                "To run Go programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "create a module, write package main, and run it with go run"
              ],
              "answer": 3,
              "explanation": "Create a module, write package main, and run it with go run — that is the purpose of Installing Go and Your First Program."
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
              "id": "go-m1-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Installing Go and Your First Program.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n + 10)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add ten, and prints it. It follows the Installing Go and Your First Program pattern from this lesson.",
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
                  "content": "Re-read the task for Installing Go and Your First Program: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m2",
      "title": "Variables",
      "description": "Variables: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "go-m2-l1",
          "slug": "go-m2-l1",
          "title": "Declaring Variables",
          "objectives": [
            "Explain what Declaring Variables is and when to use it",
            "Write the Declaring Variables pattern from the syntax in this lesson",
            "Build a small Go program that uses Declaring Variables correctly"
          ],
          "introduction": "Declaring Variables is a core part of writing Go. Variables are declared with var, giving the name and type, as in var count int = 5, or with the type inferred from the value. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Variables are declared with var, giving the name and type, as in var count int = 5, or with the type inferred from the value. Go is statically typed, so a variable's type is fixed when it is declared and cannot change later. Declared but unused variables are a compile error, which keeps code tidy. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "var count int = 5\nvar name = \"Ada\"",
          "analogy": "Like labelled jars on a shelf: each jar holds one kind of thing, and the label never changes.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 5\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Declaring Variables solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Declaring Variables syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Sharing a map between goroutines without a mutex, which causes a fatal concurrent map write."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Declaring Variables, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5.0 / 2.0)\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Declaring Variables pattern from this lesson.",
          "summary": "Variables are declared with var, giving the name and type, as in var count int = 5, or with the type inferred from the value. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Declaring Variables in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Declaring Variables?",
              "options": [
                "To run Go programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "declare typed variables with var"
              ],
              "answer": 3,
              "explanation": "Declare typed variables with var — that is the purpose of Declaring Variables."
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
              "id": "go-m2-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Declaring Variables.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a * b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for multiply two numbers, and prints it. It follows the Declaring Variables pattern from this lesson.",
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
                  "content": "Re-read the task for Declaring Variables: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m2-l2",
          "slug": "go-m2-l2",
          "title": "Short Variable Declarations",
          "objectives": [
            "Explain what Short Variable Declarations is and when to use it",
            "Write the Short Variable Declarations pattern from the syntax in this lesson",
            "Build a small Go program that uses Short Variable Declarations correctly"
          ],
          "introduction": "Short Variable Declarations is a core part of writing Go. Inside a function you can declare and initialise a variable with :=, as in count := 5, and Go infers the type for you. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Inside a function you can declare and initialise a variable with :=, as in count := 5, and Go infers the type for you. The short form can only be used inside functions, and at least one variable on the left must be new. It is the idiomatic way to declare locals in Go code. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "count := 5\nname := \"Ada\"",
          "analogy": "Like a sticky note: quick to write, clear enough for the moment, and only used inside the room.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 5\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Short Variable Declarations solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Short Variable Declarations syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting to check an error return, which hides failures until they cause a bigger problem."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Short Variable Declarations, but it does not work because of an off-by-one loop. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "explanation": "Check the loop bounds: start, condition and step together decide exactly which values appear. The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Short Variable Declarations pattern from this lesson.",
          "summary": "Inside a function you can declare and initialise a variable with :=, as in count := 5, and Go infers the type for you. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Short Variable Declarations in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Short Variable Declarations?",
              "options": [
                "declare local variables concisely with :=",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Go compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Declare local variables concisely with := — that is the purpose of Short Variable Declarations."
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
              "id": "go-m2-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Short Variable Declarations.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    if n%2 == 0 {\n        fmt.Println(\"even\")\n    } else {\n        fmt.Println(\"odd\")\n    }\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for even or odd, and prints it. It follows the Short Variable Declarations pattern from this lesson.",
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
                  "content": "Re-read the task for Short Variable Declarations: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m3",
      "title": "Types",
      "description": "Types: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 3,
      "lessons": [
        {
          "id": "go-m3-l1",
          "slug": "go-m3-l1",
          "title": "Basic Types",
          "objectives": [
            "Explain what Basic Types is and when to use it",
            "Write the Basic Types pattern from the syntax in this lesson",
            "Build a small Go program that uses Basic Types correctly"
          ],
          "introduction": "Basic Types is a core part of writing Go. Go's basic types include integers such as int, int64 and uint, floating-point numbers float64, booleans, and strings. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Go's basic types include integers such as int, int64 and uint, floating-point numbers float64, booleans, and strings. The int type is at least 32 bits and is the default for whole numbers, while float64 is the default for decimals. Choosing the right type matters for range, precision and how values behave in arithmetic. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "var a int = -7\nvar b float64 = 3.14\nvar ok bool = true\nvar s string = \"Go\"",
          "analogy": "Like different sized boxes: a small box cannot hold a big item, and the label tells you what fits.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 7\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Basic Types solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 7'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Basic Types syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using = instead of == in a condition, which the compiler rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Basic Types, but it does not work because of a missing closing brace. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n}",
            "explanation": "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one. The main function is missing its closing brace, so the program does not compile."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Basic Types pattern from this lesson.",
          "summary": "Go's basic types include integers such as int, int64 and uint, floating-point numbers float64, booleans, and strings. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Basic Types in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Basic Types?",
              "options": [
                "store values with int, float64, bool and string types",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Go compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Store values with int, float64, bool and string types — that is the purpose of Basic Types."
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
              "id": "go-m3-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Basic Types.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var word string\n    fmt.Scan(&word)\n    fmt.Println(len(word))\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for word length, and prints it. It follows the Basic Types pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "go",
                  "expectedStdout": "2",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "gopher",
                  "expectedStdout": "6",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Basic Types: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m3-l2",
          "slug": "go-m3-l2",
          "title": "Type Conversion",
          "objectives": [
            "Explain what Type Conversion is and when to use it",
            "Write the Type Conversion pattern from the syntax in this lesson",
            "Build a small Go program that uses Type Conversion correctly"
          ],
          "introduction": "Type Conversion is a core part of writing Go. Go never converts types implicitly: you must write the conversion, as in float64(count) or int(price). In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Go never converts types implicitly: you must write the conversion, as in float64(count) or int(price). This explicitness prevents silent precision loss and makes every conversion visible in the code. Converting between incompatible types, such as a string and an int, is a compile error rather than a runtime surprise. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "count := 5\nprice := float64(count) * 1.5",
          "analogy": "Like exchanging currency at a desk: you state the amount and the currency, and the exchange is explicit.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    price := 7.5\n    fmt.Println(\"price =\", price)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Type Conversion solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'price = 7.5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Type Conversion syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring the value returned by append, which can silently drop the new element."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Type Conversion, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 + 20)\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Type Conversion pattern from this lesson.",
          "summary": "Go never converts types implicitly: you must write the conversion, as in float64(count) or int(price). In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Type Conversion in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Type Conversion?",
              "options": [
                "To make the program use more memory on purpose",
                "convert between types explicitly with T(value)",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Convert between types explicitly with T(value) — that is the purpose of Type Conversion."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "price = 7.5",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'price = 7.5'."
            }
          ],
          "exercises": [
            {
              "id": "go-m3-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Type Conversion.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * 2)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for double a number, and prints it. It follows the Type Conversion pattern from this lesson.",
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
                  "content": "Re-read the task for Type Conversion: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m4",
      "title": "Operators",
      "description": "Operators: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 4,
      "lessons": [
        {
          "id": "go-m4-l1",
          "slug": "go-m4-l1",
          "title": "Arithmetic Operators",
          "objectives": [
            "Explain what Arithmetic Operators is and when to use it",
            "Write the Arithmetic Operators pattern from the syntax in this lesson",
            "Build a small Go program that uses Arithmetic Operators correctly"
          ],
          "introduction": "Arithmetic Operators is a core part of writing Go. Go provides the usual arithmetic operators: + for addition, - for subtraction, * for multiplication, / for division and % for the remainder. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Go provides the usual arithmetic operators: + for addition, - for subtraction, * for multiplication, / for division and % for the remainder. Integer division truncates towards zero, so 5 / 2 is 2, while float division gives 2.5. The operators +=, -= and similar update a variable in place. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "total := 3 + 4\nrem := 7 % 3",
          "analogy": "Like a pocket calculator: the same five buttons, and the same rules about whole numbers.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    total := 3 + 4\n    fmt.Println(\"total =\", total)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Arithmetic Operators solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'total = 7'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Arithmetic Operators syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Copying a struct that contains a mutex, which breaks the lock."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Arithmetic Operators, but it does not work because of using = instead of ==. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x == 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "explanation": "Comparison uses ==; a single = is assignment and is not allowed as a condition. A single = assigns instead of comparing, which is a compile error in an if condition."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Arithmetic Operators pattern from this lesson.",
          "summary": "Go provides the usual arithmetic operators: + for addition, - for subtraction, * for multiplication, / for division and % for the remainder. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Arithmetic Operators in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Arithmetic Operators?",
              "options": [
                "To make the program use more memory on purpose",
                "compute with arithmetic operators and compound assignment",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Compute with arithmetic operators and compound assignment — that is the purpose of Arithmetic Operators."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "total = 7",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'total = 7'."
            }
          ],
          "exercises": [
            {
              "id": "go-m4-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Arithmetic Operators.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add two numbers, and prints it. It follows the Arithmetic Operators pattern from this lesson.",
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
                  "content": "Re-read the task for Arithmetic Operators: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m4-l2",
          "slug": "go-m4-l2",
          "title": "Comparison and Logical Operators",
          "objectives": [
            "Explain what Comparison and Logical Operators is and when to use it",
            "Write the Comparison and Logical Operators pattern from the syntax in this lesson",
            "Build a small Go program that uses Comparison and Logical Operators correctly"
          ],
          "introduction": "Comparison and Logical Operators is a core part of writing Go. Comparison operators ==, !=, <, <=, > and >= produce booleans, and logical operators &&, || and ! combine them. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Comparison operators ==, !=, <, <=, > and >= produce booleans, and logical operators &&, || and ! combine them. Go uses short-circuit evaluation: the right side of && is skipped when the left side is false. Conditions in if statements must be booleans, so if x = 5 is a compile error. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "ok := age >= 18 && hasTicket",
          "analogy": "Like a bouncer with a checklist: every condition must pass before you get in.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    isGreater := 8 > 5\n    fmt.Println(\"isGreater =\", isGreater)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Comparison and Logical Operators solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'isGreater = true'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Comparison and Logical Operators syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Starting a goroutine without a way to wait for it or stop it."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Comparison and Logical Operators, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = 42\n    fmt.Println(n)\n}",
            "explanation": "Go checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an int variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Comparison and Logical Operators pattern from this lesson.",
          "summary": "Comparison operators ==, !=, <, <=, > and >= produce booleans, and logical operators &&, || and ! combine them. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Comparison and Logical Operators in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Comparison and Logical Operators?",
              "options": [
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "compare values and combine conditions with logical operators",
                "To compile Go directly into a web page with no JavaScript"
              ],
              "answer": 2,
              "explanation": "Compare values and combine conditions with logical operators — that is the purpose of Comparison and Logical Operators."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "isGreater = true",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'isGreater = true'."
            }
          ],
          "exercises": [
            {
              "id": "go-m4-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Comparison and Logical Operators.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var name string\n    fmt.Scan(&name)\n    fmt.Printf(\"Hello, %s!\\n\", name)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for greet by name, and prints it. It follows the Comparison and Logical Operators pattern from this lesson.",
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
                  "content": "Re-read the task for Comparison and Logical Operators: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m5",
      "title": "Control Flow",
      "description": "Control Flow: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 5,
      "lessons": [
        {
          "id": "go-m5-l1",
          "slug": "go-m5-l1",
          "title": "if and else",
          "objectives": [
            "Explain what if and else is and when to use it",
            "Write the if and else pattern from the syntax in this lesson",
            "Build a small Go program that uses if and else correctly"
          ],
          "introduction": "if and else is a core part of writing Go. Go's if statement takes a boolean condition with no parentheses, and may include a short statement before the condition, as in if n, err := read(); err != nil. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Go's if statement takes a boolean condition with no parentheses, and may include a short statement before the condition, as in if n, err := read(); err != nil. An else if chain tests conditions in order, and the first true branch runs. Keeping conditions simple and branches short makes control flow easy to follow. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "if age >= 18 {\n    fmt.Println(\"adult\")\n} else {\n    fmt.Println(\"minor\")\n}",
          "analogy": "Like a fork in a road: you take one branch, and the sign tells you which.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    isGreater := 18 > 17\n    fmt.Println(\"isGreater =\", isGreater)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem if and else solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'isGreater = true'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the if and else syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Sharing a map between goroutines without a mutex, which causes a fatal concurrent map write."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to if and else, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5.0 / 2.0)\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the if and else pattern from this lesson.",
          "summary": "Go's if statement takes a boolean condition with no parentheses, and may include a short statement before the condition, as in if n, err := read(); err != nil. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use if and else in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of if and else?",
              "options": [
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "branch on boolean conditions with if and else",
                "To compile Go directly into a web page with no JavaScript"
              ],
              "answer": 2,
              "explanation": "Branch on boolean conditions with if and else — that is the purpose of if and else."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "isGreater = true"
              ],
              "answer": 3,
              "explanation": "The example prints 'isGreater = true'."
            }
          ],
          "exercises": [
            {
              "id": "go-m5-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises if and else.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * n)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for square a number, and prints it. It follows the if and else pattern from this lesson.",
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
                  "content": "Re-read the task for if and else: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m5-l2",
          "slug": "go-m5-l2",
          "title": "switch and Loops",
          "objectives": [
            "Explain what switch and Loops is and when to use it",
            "Write the switch and Loops pattern from the syntax in this lesson",
            "Build a small Go program that uses switch and Loops correctly"
          ],
          "introduction": "switch and Loops is a core part of writing Go. A switch statement matches a value against cases and stops after the first match, with no fallthrough unless you write it. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A switch statement matches a value against cases and stops after the first match, with no fallthrough unless you write it. Go has only one loop keyword, for, which covers while-style loops, counted loops and iteration over collections. A for loop with no condition runs forever until break, and range gives index and value. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "for i := 0; i < 3; i++ {\n    fmt.Println(i)\n}",
          "analogy": "Like a train timetable: switch picks the platform, and for repeats the journey until the last stop.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 3\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem switch and Loops solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the switch and Loops syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting to check an error return, which hides failures until they cause a bigger problem."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to switch and Loops, but it does not work because of an off-by-one loop. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "explanation": "Check the loop bounds: start, condition and step together decide exactly which values appear. The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the switch and Loops pattern from this lesson.",
          "summary": "A switch statement matches a value against cases and stops after the first match, with no fallthrough unless you write it. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use switch and Loops in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of switch and Loops?",
              "options": [
                "To store data permanently in a database without code",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "choose with switch and repeat with for loops"
              ],
              "answer": 3,
              "explanation": "Choose with switch and repeat with for loops — that is the purpose of switch and Loops."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 3",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 3'."
            }
          ],
          "exercises": [
            {
              "id": "go-m5-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises switch and Loops.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n + 10)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add ten, and prints it. It follows the switch and Loops pattern from this lesson.",
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
                  "content": "Re-read the task for switch and Loops: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m6",
      "title": "Functions",
      "description": "Functions: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 6,
      "lessons": [
        {
          "id": "go-m6-l1",
          "slug": "go-m6-l1",
          "title": "Defining Functions",
          "objectives": [
            "Explain what Defining Functions is and when to use it",
            "Write the Defining Functions pattern from the syntax in this lesson",
            "Build a small Go program that uses Defining Functions correctly"
          ],
          "introduction": "Defining Functions is a core part of writing Go. Functions are declared with func, a name, typed parameters and an optional return type, and they are called with arguments in parentheses. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Functions are declared with func, a name, typed parameters and an optional return type, and they are called with arguments in parentheses. Go uses camelCase for function names, and a function can return a value with return or end by falling off the end. Functions are the basic unit for organising a Go program. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func add(a, b int) int {\n    return a + b\n}",
          "analogy": "Like a kitchen appliance: you put ingredients in, it does one job, and the result comes out.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    total := 3 + 4\n    fmt.Println(\"total =\", total)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Defining Functions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'total = 7'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Defining Functions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using = instead of == in a condition, which the compiler rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Defining Functions, but it does not work because of a missing closing brace. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n}",
            "explanation": "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one. The main function is missing its closing brace, so the program does not compile."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Defining Functions pattern from this lesson.",
          "summary": "Functions are declared with func, a name, typed parameters and an optional return type, and they are called with arguments in parentheses. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Defining Functions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Defining Functions?",
              "options": [
                "To store data permanently in a database without code",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "organise code into named, typed functions"
              ],
              "answer": 3,
              "explanation": "Organise code into named, typed functions — that is the purpose of Defining Functions."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "total = 7",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'total = 7'."
            }
          ],
          "exercises": [
            {
              "id": "go-m6-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Defining Functions.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a * b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for multiply two numbers, and prints it. It follows the Defining Functions pattern from this lesson.",
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
                  "content": "Re-read the task for Defining Functions: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m6-l2",
          "slug": "go-m6-l2",
          "title": "Multiple Return Values",
          "objectives": [
            "Explain what Multiple Return Values is and when to use it",
            "Write the Multiple Return Values pattern from the syntax in this lesson",
            "Build a small Go program that uses Multiple Return Values correctly"
          ],
          "introduction": "Multiple Return Values is a core part of writing Go. Go functions can return several values at once, which is how they usually report errors: func read() (string, error). In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Go functions can return several values at once, which is how they usually report errors: func read() (string, error). Callers receive all the values, often with one assigned to _ when it is not needed. Multiple returns keep error handling local instead of hiding it in exceptions. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func divide(a, b int) (int, error) {\n    if b == 0 {\n        return 0, fmt.Errorf(\"divide by zero\")\n    }\n    return a / b, nil\n}",
          "analogy": "Like a vending machine that returns both your snack and your change in one go.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 6\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Multiple Return Values solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 6'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Multiple Return Values syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring the value returned by append, which can silently drop the new element."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Multiple Return Values, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 + 20)\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Multiple Return Values pattern from this lesson.",
          "summary": "Go functions can return several values at once, which is how they usually report errors: func read() (string, error). In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Multiple Return Values in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Multiple Return Values?",
              "options": [
                "return several values at once, usually a result and an error",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "To delete unused files from the project automatically"
              ],
              "answer": 0,
              "explanation": "Return several values at once, usually a result and an error — that is the purpose of Multiple Return Values."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "count = 6",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'count = 6'."
            }
          ],
          "exercises": [
            {
              "id": "go-m6-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Multiple Return Values.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    if n%2 == 0 {\n        fmt.Println(\"even\")\n    } else {\n        fmt.Println(\"odd\")\n    }\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for even or odd, and prints it. It follows the Multiple Return Values pattern from this lesson.",
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
                  "content": "Re-read the task for Multiple Return Values: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m7",
      "title": "Collections",
      "description": "Collections: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 7,
      "lessons": [
        {
          "id": "go-m7-l1",
          "slug": "go-m7-l1",
          "title": "Arrays and Slices",
          "objectives": [
            "Explain what Arrays and Slices is and when to use it",
            "Write the Arrays and Slices pattern from the syntax in this lesson",
            "Build a small Go program that uses Arrays and Slices correctly"
          ],
          "introduction": "Arrays and Slices is a core part of writing Go. An array has a fixed length, such as [3]int{1, 2, 3}, while a slice is a flexible view over an array, created with make or by slicing. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "An array has a fixed length, such as [3]int{1, 2, 3}, while a slice is a flexible view over an array, created with make or by slicing. Slices grow with append, which may allocate a new array, so you should always use the returned slice. Most Go code uses slices, not arrays, because their size can change. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "nums := []int{1, 2, 3}\nnums = append(nums, 4)",
          "analogy": "Like a notebook versus a loose-leaf binder: one is fixed, the other grows a page at a time.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    items := []int{1,2,3}\n    fmt.Println(\"items =\", len(items))\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Arrays and Slices solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'items = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Arrays and Slices syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Copying a struct that contains a mutex, which breaks the lock."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Arrays and Slices, but it does not work because of using = instead of ==. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x == 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "explanation": "Comparison uses ==; a single = is assignment and is not allowed as a condition. A single = assigns instead of comparing, which is a compile error in an if condition."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Arrays and Slices pattern from this lesson.",
          "summary": "An array has a fixed length, such as [3]int{1, 2, 3}, while a slice is a flexible view over an array, created with make or by slicing. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Arrays and Slices in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Arrays and Slices?",
              "options": [
                "store ordered values with arrays and growable slices",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "To delete unused files from the project automatically"
              ],
              "answer": 0,
              "explanation": "Store ordered values with arrays and growable slices — that is the purpose of Arrays and Slices."
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
              "id": "go-m7-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Arrays and Slices.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var word string\n    fmt.Scan(&word)\n    fmt.Println(len(word))\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for word length, and prints it. It follows the Arrays and Slices pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "go",
                  "expectedStdout": "2",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "gopher",
                  "expectedStdout": "6",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Arrays and Slices: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m7-l2",
          "slug": "go-m7-l2",
          "title": "Maps",
          "objectives": [
            "Explain what Maps is and when to use it",
            "Write the Maps pattern from the syntax in this lesson",
            "Build a small Go program that uses Maps correctly"
          ],
          "introduction": "Maps is a core part of writing Go. A map stores key-value pairs, created with make(map[string]int) or a literal, and looking up a missing key returns the zero value. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A map stores key-value pairs, created with make(map[string]int) or a literal, and looking up a missing key returns the zero value. The comma-ok idiom, v, ok := m[\"key\"], tells you whether the key was actually present. Maps are not safe for concurrent use without a mutex, and iterating them visits keys in random order. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "scores := map[string]int{\"Ada\": 10}\nscores[\"Grace\"] = 12",
          "analogy": "Like a dictionary: you look up a word and get its definition without reading the whole book.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 10\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Maps solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 10'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Maps syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Starting a goroutine without a way to wait for it or stop it."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Maps, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = 42\n    fmt.Println(n)\n}",
            "explanation": "Go checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an int variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Maps pattern from this lesson.",
          "summary": "A map stores key-value pairs, created with make(map[string]int) or a literal, and looking up a missing key returns the zero value. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Maps in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Maps?",
              "options": [
                "To run Go programs without ever compiling them",
                "store and look up key-value pairs with maps",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose"
              ],
              "answer": 1,
              "explanation": "Store and look up key-value pairs with maps — that is the purpose of Maps."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 10",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 10'."
            }
          ],
          "exercises": [
            {
              "id": "go-m7-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Maps.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * 2)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for double a number, and prints it. It follows the Maps pattern from this lesson.",
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
                  "content": "Re-read the task for Maps: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m8",
      "title": "Structs",
      "description": "Structs: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 8,
      "lessons": [
        {
          "id": "go-m8-l1",
          "slug": "go-m8-l1",
          "title": "Defining Structs",
          "objectives": [
            "Explain what Defining Structs is and when to use it",
            "Write the Defining Structs pattern from the syntax in this lesson",
            "Build a small Go program that uses Defining Structs correctly"
          ],
          "introduction": "Defining Structs is a core part of writing Go. A struct groups related fields under one name, such as a User with Name, Email and Age, and each field has its own type. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A struct groups related fields under one name, such as a User with Name, Email and Age, and each field has its own type. Fields starting with a capital letter are exported and visible outside the package; lowercase fields are private. You create a struct with a literal naming each field, and read fields with dot notation. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "type User struct {\n    Name string\n    Age  int\n}\nu := User{Name: \"Ada\", Age: 36}",
          "analogy": "Like a form with labelled boxes: name, age and email each have their own labelled space.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 36\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
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
            "Sharing a map between goroutines without a mutex, which causes a fatal concurrent map write."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Defining Structs, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5.0 / 2.0)\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Defining Structs pattern from this lesson.",
          "summary": "A struct groups related fields under one name, such as a User with Name, Email and Age, and each field has its own type. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Defining Structs in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Defining Structs?",
              "options": [
                "To run Go programs without ever compiling them",
                "group related fields into a named struct type",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose"
              ],
              "answer": 1,
              "explanation": "Group related fields into a named struct type — that is the purpose of Defining Structs."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 36",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 36'."
            }
          ],
          "exercises": [
            {
              "id": "go-m8-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Defining Structs.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add two numbers, and prints it. It follows the Defining Structs pattern from this lesson.",
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
                  "content": "Re-read the task for Defining Structs: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m8-l2",
          "slug": "go-m8-l2",
          "title": "Methods on Structs",
          "objectives": [
            "Explain what Methods on Structs is and when to use it",
            "Write the Methods on Structs pattern from the syntax in this lesson",
            "Build a small Go program that uses Methods on Structs correctly"
          ],
          "introduction": "Methods on Structs is a core part of writing Go. A method is a function with a receiver, written func (u User) Greet() string, which attaches behaviour to a struct type. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A method is a function with a receiver, written func (u User) Greet() string, which attaches behaviour to a struct type. A value receiver works on a copy, while a pointer receiver can change the struct and avoids copying large values. Methods give your data behaviour, so user.Greet() reads better than greet(user). When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func (u User) Greet() string {\n    return \"Hello, \" + u.Name\n}",
          "analogy": "Like teaching a dog tricks: the tricks belong to the dog, and you call them on that dog.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"Ada\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Methods on Structs solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = Ada'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Methods on Structs syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting to check an error return, which hides failures until they cause a bigger problem."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Methods on Structs, but it does not work because of an off-by-one loop. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "explanation": "Check the loop bounds: start, condition and step together decide exactly which values appear. The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Methods on Structs pattern from this lesson.",
          "summary": "A method is a function with a receiver, written func (u User) Greet() string, which attaches behaviour to a struct type. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Methods on Structs in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Methods on Structs?",
              "options": [
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "attach behaviour to structs with methods and receivers",
                "To replace the Go compiler with a faster one"
              ],
              "answer": 2,
              "explanation": "Attach behaviour to structs with methods and receivers — that is the purpose of Methods on Structs."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = Ada",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = Ada'."
            }
          ],
          "exercises": [
            {
              "id": "go-m8-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Methods on Structs.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var name string\n    fmt.Scan(&name)\n    fmt.Printf(\"Hello, %s!\\n\", name)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for greet by name, and prints it. It follows the Methods on Structs pattern from this lesson.",
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
                  "content": "Re-read the task for Methods on Structs: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m9",
      "title": "Interfaces",
      "description": "Interfaces: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 9,
      "lessons": [
        {
          "id": "go-m9-l1",
          "slug": "go-m9-l1",
          "title": "Interfaces Basics",
          "objectives": [
            "Explain what Interfaces Basics is and when to use it",
            "Write the Interfaces Basics pattern from the syntax in this lesson",
            "Build a small Go program that uses Interfaces Basics correctly"
          ],
          "introduction": "Interfaces Basics is a core part of writing Go. An interface defines a set of methods, and any type that implements those methods satisfies the interface automatically, with no declaration needed. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "An interface defines a set of methods, and any type that implements those methods satisfies the interface automatically, with no declaration needed. This implicit satisfaction keeps Go flexible: a new type works with old code as soon as it has the right methods. Small interfaces with one or two methods are idiomatic in Go. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "type Greeter interface {\n    Greet() string\n}",
          "analogy": "Like a job description: it lists the skills required, and anyone with them qualifies.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"Hello\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Interfaces Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = Hello'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Interfaces Basics syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using = instead of == in a condition, which the compiler rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Interfaces Basics, but it does not work because of a missing closing brace. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n}",
            "explanation": "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one. The main function is missing its closing brace, so the program does not compile."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Interfaces Basics pattern from this lesson.",
          "summary": "An interface defines a set of methods, and any type that implements those methods satisfies the interface automatically, with no declaration needed. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Interfaces Basics in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Interfaces Basics?",
              "options": [
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "define behaviour with interfaces satisfied implicitly",
                "To replace the Go compiler with a faster one"
              ],
              "answer": 2,
              "explanation": "Define behaviour with interfaces satisfied implicitly — that is the purpose of Interfaces Basics."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = Hello"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = Hello'."
            }
          ],
          "exercises": [
            {
              "id": "go-m9-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Interfaces Basics.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * n)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for square a number, and prints it. It follows the Interfaces Basics pattern from this lesson.",
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
                  "content": "Re-read the task for Interfaces Basics: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m9-l2",
          "slug": "go-m9-l2",
          "title": "The empty interface and Type Assertions",
          "objectives": [
            "Explain what The empty interface and Type Assertions is and when to use it",
            "Write the The empty interface and Type Assertions pattern from the syntax in this lesson",
            "Build a small Go program that uses The empty interface and Type Assertions correctly"
          ],
          "introduction": "The empty interface and Type Assertions is a core part of writing Go. The empty interface, any, accepts a value of any type, which is how functions such as fmt.Println take anything. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "The empty interface, any, accepts a value of any type, which is how functions such as fmt.Println take anything. A type assertion, v.(string), recovers the concrete type, and the comma-ok form, s, ok := v.(string), avoids a panic when the type is different. A type switch handles several possible types in one place. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "var v any = \"hello\"\ns, ok := v.(string)",
          "analogy": "Like a plain box labelled 'contents unknown': you open it and check what is inside before using it.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"hello\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem The empty interface and Type Assertions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = hello'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the The empty interface and Type Assertions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring the value returned by append, which can silently drop the new element."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to The empty interface and Type Assertions, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 + 20)\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the The empty interface and Type Assertions pattern from this lesson.",
          "summary": "The empty interface, any, accepts a value of any type, which is how functions such as fmt.Println take anything. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use The empty interface and Type Assertions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of The empty interface and Type Assertions?",
              "options": [
                "To make the program use more memory on purpose",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "hold any value with any and recover its type safely"
              ],
              "answer": 3,
              "explanation": "Hold any value with any and recover its type safely — that is the purpose of The empty interface and Type Assertions."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = hello",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = hello'."
            }
          ],
          "exercises": [
            {
              "id": "go-m9-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises The empty interface and Type Assertions.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n + 10)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add ten, and prints it. It follows the The empty interface and Type Assertions pattern from this lesson.",
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
                  "content": "Re-read the task for The empty interface and Type Assertions: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m10",
      "title": "Beginner Projects",
      "description": "Beginner Projects: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "beginner",
      "order": 10,
      "lessons": [
        {
          "id": "go-m10-l1",
          "slug": "go-m10-l1",
          "title": "Project: CLI Calculator",
          "objectives": [
            "Explain what Project: CLI Calculator is and when to use it",
            "Write the Project: CLI Calculator pattern from the syntax in this lesson",
            "Build a small Go program that uses Project: CLI Calculator correctly"
          ],
          "introduction": "Project: CLI Calculator is a core part of writing Go. A command-line calculator reads two numbers and an operator, computes the result, and prints it, handling divide-by-zero with an error message. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A command-line calculator reads two numbers and an operator, computes the result, and prints it, handling divide-by-zero with an error message. It combines input, parsing, switch and functions in one small program. Splitting the calculation into a function per operator keeps the main function short and testable. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func calculate(a, b int, op string) (int, error) {\n    switch op {\n    case \"+\":\n        return a + b, nil\n    }\n    return 0, fmt.Errorf(\"unknown op\")\n}",
          "analogy": "Like a pocket calculator with buttons: type the numbers, pick the operation, read the answer.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    total := 3 + 4\n    fmt.Println(\"total =\", total)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Project: CLI Calculator solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'total = 7'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: CLI Calculator syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Copying a struct that contains a mutex, which breaks the lock."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: CLI Calculator, but it does not work because of using = instead of ==. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x == 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "explanation": "Comparison uses ==; a single = is assignment and is not allowed as a condition. A single = assigns instead of comparing, which is a compile error in an if condition."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: CLI Calculator pattern from this lesson.",
          "summary": "A command-line calculator reads two numbers and an operator, computes the result, and prints it, handling divide-by-zero with an error message. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: CLI Calculator in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: CLI Calculator?",
              "options": [
                "To make the program use more memory on purpose",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "build a CLI calculator with input, switch and functions"
              ],
              "answer": 3,
              "explanation": "Build a CLI calculator with input, switch and functions — that is the purpose of Project: CLI Calculator."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "total = 7",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'total = 7'."
            }
          ],
          "exercises": [
            {
              "id": "go-m10-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Project: CLI Calculator.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a * b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for multiply two numbers, and prints it. It follows the Project: CLI Calculator pattern from this lesson.",
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
                  "content": "Re-read the task for Project: CLI Calculator: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m10-l2",
          "slug": "go-m10-l2",
          "title": "Project: Todo List",
          "objectives": [
            "Explain what Project: Todo List is and when to use it",
            "Write the Project: Todo List pattern from the syntax in this lesson",
            "Build a small Go program that uses Project: Todo List correctly"
          ],
          "introduction": "Project: Todo List is a core part of writing Go. A todo list keeps tasks in a slice, adds a task from the command line, lists them with numbers, and marks one done by index. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A todo list keeps tasks in a slice, adds a task from the command line, lists them with numbers, and marks one done by index. It practices slices, structs, loops and input in one project. Storing tasks in a file is the natural next step, and it turns the toy into a tool you can actually use. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "type Task struct {\n    Title string\n    Done  bool\n}",
          "analogy": "Like a shopping list on the fridge: add lines, cross them off, and the list always shows the truth.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"todos\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Project: Todo List solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = todos'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Todo List syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Starting a goroutine without a way to wait for it or stop it."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: Todo List, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = 42\n    fmt.Println(n)\n}",
            "explanation": "Go checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an int variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: Todo List pattern from this lesson.",
          "summary": "A todo list keeps tasks in a slice, adds a task from the command line, lists them with numbers, and marks one done by index. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Todo List in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Todo List?",
              "options": [
                "build a todo list with slices, structs and input",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "To compile Go directly into a web page with no JavaScript"
              ],
              "answer": 0,
              "explanation": "Build a todo list with slices, structs and input — that is the purpose of Project: Todo List."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = todos",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = todos'."
            }
          ],
          "exercises": [
            {
              "id": "go-m10-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Project: Todo List.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    if n%2 == 0 {\n        fmt.Println(\"even\")\n    } else {\n        fmt.Println(\"odd\")\n    }\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for even or odd, and prints it. It follows the Project: Todo List pattern from this lesson.",
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
                  "content": "Re-read the task for Project: Todo List: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m11",
      "title": "Error Handling",
      "description": "Error Handling: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 11,
      "lessons": [
        {
          "id": "go-m11-l1",
          "slug": "go-m11-l1",
          "title": "The error Type",
          "objectives": [
            "Explain what The error Type is and when to use it",
            "Write the The error Type pattern from the syntax in this lesson",
            "Build a small Go program that uses The error Type correctly"
          ],
          "introduction": "The error Type is a core part of writing Go. In Go, errors are values of the built-in error interface, returned as the last value from a function, and callers check if err != nil. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "In Go, errors are values of the built-in error interface, returned as the last value from a function, and callers check if err != nil. There are no exceptions: every failure is visible in the function signature and handled where it happens. Returning a wrapped error with fmt.Errorf keeps the context of what went wrong. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "data, err := os.ReadFile(\"a.txt\")\nif err != nil {\n    return err\n}",
          "analogy": "Like a parcel that arrives either with the goods inside or with a note explaining why it did not.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"ok\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem The error Type solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = ok'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the The error Type syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Sharing a map between goroutines without a mutex, which causes a fatal concurrent map write."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to The error Type, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5.0 / 2.0)\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the The error Type pattern from this lesson.",
          "summary": "In Go, errors are values of the built-in error interface, returned as the last value from a function, and callers check if err != nil. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use The error Type in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of The error Type?",
              "options": [
                "handle failures by returning and checking error values",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "To compile Go directly into a web page with no JavaScript"
              ],
              "answer": 0,
              "explanation": "Handle failures by returning and checking error values — that is the purpose of The error Type."
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
              "id": "go-m11-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises The error Type.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var word string\n    fmt.Scan(&word)\n    fmt.Println(len(word))\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for word length, and prints it. It follows the The error Type pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "go",
                  "expectedStdout": "2",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "gopher",
                  "expectedStdout": "6",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for The error Type: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m11-l2",
          "slug": "go-m11-l2",
          "title": "Custom Errors and Wrapping",
          "objectives": [
            "Explain what Custom Errors and Wrapping is and when to use it",
            "Write the Custom Errors and Wrapping pattern from the syntax in this lesson",
            "Build a small Go program that uses Custom Errors and Wrapping correctly"
          ],
          "introduction": "Custom Errors and Wrapping is a core part of writing Go. Custom errors are types that implement Error() string, and fmt.Errorf with %w wraps an underlying error so callers can unwrap it with errors.Is and errors.As. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Custom errors are types that implement Error() string, and fmt.Errorf with %w wraps an underlying error so callers can unwrap it with errors.Is and errors.As. Wrapping adds context at each layer, such as 'reading config: file not found', while keeping the original error reachable. Sentinel errors such as io.EOF are shared values compared with errors.Is. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "return fmt.Errorf(\"reading config: %w\", err)",
          "analogy": "Like a chain of sticky notes: each person adds what they know, and the original note is still at the bottom.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"wrapped\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Custom Errors and Wrapping solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = wrapped'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Custom Errors and Wrapping syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting to check an error return, which hides failures until they cause a bigger problem."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Custom Errors and Wrapping, but it does not work because of an off-by-one loop. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "explanation": "Check the loop bounds: start, condition and step together decide exactly which values appear. The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Custom Errors and Wrapping pattern from this lesson.",
          "summary": "Custom errors are types that implement Error() string, and fmt.Errorf with %w wraps an underlying error so callers can unwrap it with errors.Is and errors.As. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Custom Errors and Wrapping in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Custom Errors and Wrapping?",
              "options": [
                "To store data permanently in a database without code",
                "create custom errors and wrap them with context",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them"
              ],
              "answer": 1,
              "explanation": "Create custom errors and wrap them with context — that is the purpose of Custom Errors and Wrapping."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = wrapped",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = wrapped'."
            }
          ],
          "exercises": [
            {
              "id": "go-m11-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Custom Errors and Wrapping.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * 2)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for double a number, and prints it. It follows the Custom Errors and Wrapping pattern from this lesson.",
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
                  "content": "Re-read the task for Custom Errors and Wrapping: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m12",
      "title": "Packages",
      "description": "Packages: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 12,
      "lessons": [
        {
          "id": "go-m12-l1",
          "slug": "go-m12-l1",
          "title": "Creating Packages",
          "objectives": [
            "Explain what Creating Packages is and when to use it",
            "Write the Creating Packages pattern from the syntax in this lesson",
            "Build a small Go program that uses Creating Packages correctly"
          ],
          "introduction": "Creating Packages is a core part of writing Go. A package is a directory of Go files sharing a package clause, and it groups related code under one import path. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A package is a directory of Go files sharing a package clause, and it groups related code under one import path. Exported names start with a capital letter and are visible to other packages; lowercase names stay private. A well-designed package has one clear responsibility and a small exported API. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "package mathutil\n\nfunc Double(n int) int {\n    return n * 2\n}",
          "analogy": "Like a drawer in a workshop: everything inside belongs together, and the label says what it is for.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 10\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Creating Packages solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 10'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Creating Packages syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using = instead of == in a condition, which the compiler rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Creating Packages, but it does not work because of a missing closing brace. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n}",
            "explanation": "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one. The main function is missing its closing brace, so the program does not compile."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Creating Packages pattern from this lesson.",
          "summary": "A package is a directory of Go files sharing a package clause, and it groups related code under one import path. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Creating Packages in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Creating Packages?",
              "options": [
                "To store data permanently in a database without code",
                "organise code into packages with exported and private names",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them"
              ],
              "answer": 1,
              "explanation": "Organise code into packages with exported and private names — that is the purpose of Creating Packages."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 10",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 10'."
            }
          ],
          "exercises": [
            {
              "id": "go-m12-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Creating Packages.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add two numbers, and prints it. It follows the Creating Packages pattern from this lesson.",
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
                  "content": "Re-read the task for Creating Packages: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m12-l2",
          "slug": "go-m12-l2",
          "title": "Importing and Using Packages",
          "objectives": [
            "Explain what Importing and Using Packages is and when to use it",
            "Write the Importing and Using Packages pattern from the syntax in this lesson",
            "Build a small Go program that uses Importing and Using Packages correctly"
          ],
          "introduction": "Importing and Using Packages is a core part of writing Go. Importing a package with import brings its exported names into scope, qualified by the package name, as in fmt.Println. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Importing a package with import brings its exported names into scope, qualified by the package name, as in fmt.Println. The standard library covers strings, I/O, HTTP, JSON and more, and third-party packages are fetched with go get and recorded in go.mod. Unused imports are a compile error, so imports stay honest. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "import (\n    \"fmt\"\n    \"strings\"\n)",
          "analogy": "Like borrowing a book from a library: you name the book, and you can only use what is on its pages.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"imported\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Importing and Using Packages solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = imported'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Importing and Using Packages syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring the value returned by append, which can silently drop the new element."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Importing and Using Packages, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 + 20)\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Importing and Using Packages pattern from this lesson.",
          "summary": "Importing a package with import brings its exported names into scope, qualified by the package name, as in fmt.Println. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Importing and Using Packages in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Importing and Using Packages?",
              "options": [
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "import standard and third-party packages and use their exported names",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Import standard and third-party packages and use their exported names — that is the purpose of Importing and Using Packages."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = imported",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = imported'."
            }
          ],
          "exercises": [
            {
              "id": "go-m12-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Importing and Using Packages.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var name string\n    fmt.Scan(&name)\n    fmt.Printf(\"Hello, %s!\\n\", name)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for greet by name, and prints it. It follows the Importing and Using Packages pattern from this lesson.",
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
                  "content": "Re-read the task for Importing and Using Packages: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m13",
      "title": "Pointers",
      "description": "Pointers: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 13,
      "lessons": [
        {
          "id": "go-m13-l1",
          "slug": "go-m13-l1",
          "title": "Pointer Basics",
          "objectives": [
            "Explain what Pointer Basics is and when to use it",
            "Write the Pointer Basics pattern from the syntax in this lesson",
            "Build a small Go program that uses Pointer Basics correctly"
          ],
          "introduction": "Pointer Basics is a core part of writing Go. A pointer holds the memory address of a value, created with &value and dereferenced with *p to read or change the value. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A pointer holds the memory address of a value, created with &value and dereferenced with *p to read or change the value. Pointers let functions modify their arguments and avoid copying large structs. Go pointers are safe: there is no pointer arithmetic, and the garbage collector keeps pointed-to values alive. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "x := 5\np := &x\n*p = 10",
          "analogy": "Like a home address versus the house itself: the address tells you where to find it, not what is inside.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 10\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Pointer Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 10'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Pointer Basics syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Copying a struct that contains a mutex, which breaks the lock."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Pointer Basics, but it does not work because of using = instead of ==. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x == 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "explanation": "Comparison uses ==; a single = is assignment and is not allowed as a condition. A single = assigns instead of comparing, which is a compile error in an if condition."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Pointer Basics pattern from this lesson.",
          "summary": "A pointer holds the memory address of a value, created with &value and dereferenced with *p to read or change the value. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Pointer Basics in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Pointer Basics?",
              "options": [
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "refer to values by address with pointers",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Refer to values by address with pointers — that is the purpose of Pointer Basics."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "count = 10"
              ],
              "answer": 3,
              "explanation": "The example prints 'count = 10'."
            }
          ],
          "exercises": [
            {
              "id": "go-m13-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Pointer Basics.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * n)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for square a number, and prints it. It follows the Pointer Basics pattern from this lesson.",
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
                  "content": "Re-read the task for Pointer Basics: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m13-l2",
          "slug": "go-m13-l2",
          "title": "Pointers and Functions",
          "objectives": [
            "Explain what Pointers and Functions is and when to use it",
            "Write the Pointers and Functions pattern from the syntax in this lesson",
            "Build a small Go program that uses Pointers and Functions correctly"
          ],
          "introduction": "Pointers and Functions is a core part of writing Go. Passing a pointer to a function lets it change the caller's variable, which is how functions such as json.Unmarshal fill a struct. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Passing a pointer to a function lets it change the caller's variable, which is how functions such as json.Unmarshal fill a struct. Pointer receivers on methods let the method modify the struct, while value receivers work on a copy. Use pointers when a function must change its argument or the value is large to copy. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func increment(n *int) {\n    *n++\n}",
          "analogy": "Like giving someone your house key instead of a photograph of the house: they can actually change things inside.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 11\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Pointers and Functions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 11'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Pointers and Functions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Starting a goroutine without a way to wait for it or stop it."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Pointers and Functions, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = 42\n    fmt.Println(n)\n}",
            "explanation": "Go checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an int variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Pointers and Functions pattern from this lesson.",
          "summary": "Passing a pointer to a function lets it change the caller's variable, which is how functions such as json.Unmarshal fill a struct. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Pointers and Functions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Pointers and Functions?",
              "options": [
                "To run Go programs without ever compiling them",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "let functions modify caller data through pointers"
              ],
              "answer": 3,
              "explanation": "Let functions modify caller data through pointers — that is the purpose of Pointers and Functions."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 11",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 11'."
            }
          ],
          "exercises": [
            {
              "id": "go-m13-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Pointers and Functions.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n + 10)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add ten, and prints it. It follows the Pointers and Functions pattern from this lesson.",
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
                  "content": "Re-read the task for Pointers and Functions: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m14",
      "title": "Generics",
      "description": "Generics: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 14,
      "lessons": [
        {
          "id": "go-m14-l1",
          "slug": "go-m14-l1",
          "title": "Generic Functions",
          "objectives": [
            "Explain what Generic Functions is and when to use it",
            "Write the Generic Functions pattern from the syntax in this lesson",
            "Build a small Go program that uses Generic Functions correctly"
          ],
          "introduction": "Generic Functions is a core part of writing Go. Generics, added in Go 1.18, let you write one function that works for many types by declaring a type parameter, as in func first[T any](s []T) T. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Generics, added in Go 1.18, let you write one function that works for many types by declaring a type parameter, as in func first[T any](s []T) T. The compiler generates a specialised copy for each type used, so there is no runtime cost. Constraints such as comparable limit which types are allowed. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func first[T any](s []T) T {\n    return s[0]\n}",
          "analogy": "Like a universal phone charger with interchangeable tips: one design, many devices.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    items := []int{1,2,3}\n    fmt.Println(\"items =\", len(items))\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Generic Functions solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'items = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Generic Functions syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Sharing a map between goroutines without a mutex, which causes a fatal concurrent map write."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Generic Functions, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5.0 / 2.0)\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Generic Functions pattern from this lesson.",
          "summary": "Generics, added in Go 1.18, let you write one function that works for many types by declaring a type parameter, as in func first[T any](s []T) T. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Generic Functions in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Generic Functions?",
              "options": [
                "To run Go programs without ever compiling them",
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
              "id": "go-m14-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Generic Functions.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a * b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for multiply two numbers, and prints it. It follows the Generic Functions pattern from this lesson.",
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
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m14-l2",
          "slug": "go-m14-l2",
          "title": "Generic Types and Constraints",
          "objectives": [
            "Explain what Generic Types and Constraints is and when to use it",
            "Write the Generic Types and Constraints pattern from the syntax in this lesson",
            "Build a small Go program that uses Generic Types and Constraints correctly"
          ],
          "introduction": "Generic Types and Constraints is a core part of writing Go. Structs and other types can also be generic, such as type Stack[T any] struct, and constraints are interfaces that list the operations a type parameter must support. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Structs and other types can also be generic, such as type Stack[T any] struct, and constraints are interfaces that list the operations a type parameter must support. The comparable constraint allows == and !=, while a union such as int | float64 allows arithmetic. Constraints turn requirements into compile-time contracts. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "type Stack[T any] struct {\n    items []T\n}",
          "analogy": "Like an adjustable shelf: it holds books, boxes or plants, and the shelf itself does not care which.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 5\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Generic Types and Constraints solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Generic Types and Constraints syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting to check an error return, which hides failures until they cause a bigger problem."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Generic Types and Constraints, but it does not work because of an off-by-one loop. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "explanation": "Check the loop bounds: start, condition and step together decide exactly which values appear. The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Generic Types and Constraints pattern from this lesson.",
          "summary": "Structs and other types can also be generic, such as type Stack[T any] struct, and constraints are interfaces that list the operations a type parameter must support. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Generic Types and Constraints in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Generic Types and Constraints?",
              "options": [
                "make types generic and restrict them with constraints",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Go compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Make types generic and restrict them with constraints — that is the purpose of Generic Types and Constraints."
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
              "id": "go-m14-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Generic Types and Constraints.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    if n%2 == 0 {\n        fmt.Println(\"even\")\n    } else {\n        fmt.Println(\"odd\")\n    }\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for even or odd, and prints it. It follows the Generic Types and Constraints pattern from this lesson.",
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
                  "content": "Re-read the task for Generic Types and Constraints: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m15",
      "title": "Testing",
      "description": "Testing: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 15,
      "lessons": [
        {
          "id": "go-m15-l1",
          "slug": "go-m15-l1",
          "title": "Writing Tests with go test",
          "objectives": [
            "Explain what Writing Tests with go test is and when to use it",
            "Write the Writing Tests with go test pattern from the syntax in this lesson",
            "Build a small Go program that uses Writing Tests with go test correctly"
          ],
          "introduction": "Writing Tests with go test is a core part of writing Go. Tests live in files ending in _test.go, in functions named TestXxx that take *testing.T and use t.Errorf or t.Fatalf to report failures. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Tests live in files ending in _test.go, in functions named TestXxx that take *testing.T and use t.Errorf or t.Fatalf to report failures. go test runs them and reports which passed, and go test -v shows each test by name. Keeping tests beside the code makes it easy to check behaviour as you change it. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func TestAdd(t *testing.T) {\n    if got := Add(2, 3); got != 5 {\n        t.Errorf(\"got %d, want 5\", got)\n    }\n}",
          "analogy": "Like a spellchecker for logic: it catches mistakes in your reasoning before your users do.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 5\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Writing Tests with go test solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Writing Tests with go test syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using = instead of == in a condition, which the compiler rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Writing Tests with go test, but it does not work because of a missing closing brace. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n}",
            "explanation": "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one. The main function is missing its closing brace, so the program does not compile."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Writing Tests with go test pattern from this lesson.",
          "summary": "Tests live in files ending in _test.go, in functions named TestXxx that take *testing.T and use t.Errorf or t.Fatalf to report failures. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Writing Tests with go test in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Writing Tests with go test?",
              "options": [
                "write unit tests with the testing package and go test",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "To replace the Go compiler with a faster one"
              ],
              "answer": 0,
              "explanation": "Write unit tests with the testing package and go test — that is the purpose of Writing Tests with go test."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "count = 5"
              ],
              "answer": 3,
              "explanation": "The example prints 'count = 5'."
            }
          ],
          "exercises": [
            {
              "id": "go-m15-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Writing Tests with go test.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var word string\n    fmt.Scan(&word)\n    fmt.Println(len(word))\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for word length, and prints it. It follows the Writing Tests with go test pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "go",
                  "expectedStdout": "2",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "gopher",
                  "expectedStdout": "6",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Writing Tests with go test: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m15-l2",
          "slug": "go-m15-l2",
          "title": "Table-Driven Tests",
          "objectives": [
            "Explain what Table-Driven Tests is and when to use it",
            "Write the Table-Driven Tests pattern from the syntax in this lesson",
            "Build a small Go program that uses Table-Driven Tests correctly"
          ],
          "introduction": "Table-Driven Tests is a core part of writing Go. Table-driven tests list many inputs and expected outputs in a slice of structs, then loop over them running the same assertions for each case. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Table-driven tests list many inputs and expected outputs in a slice of structs, then loop over them running the same assertions for each case. Adding a case means adding a row, not a new test function, which keeps tests compact and complete. Subtests with t.Run give each row its own name in the output. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "tests := []struct{ a, b, want int }{{1, 2, 3}, {2, 3, 5}}\nfor _, tc := range tests {\n    if got := Add(tc.a, tc.b); got != tc.want {\n        t.Errorf(\"got %d\", got)\n    }\n}",
          "analogy": "Like a teacher's answer sheet: one table, many questions, and every answer checked the same way.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    total := 1 + 2\n    fmt.Println(\"total =\", total)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Table-Driven Tests solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'total = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Table-Driven Tests syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring the value returned by append, which can silently drop the new element."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Table-Driven Tests, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 + 20)\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Table-Driven Tests pattern from this lesson.",
          "summary": "Table-driven tests list many inputs and expected outputs in a slice of structs, then loop over them running the same assertions for each case. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Table-Driven Tests in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Table-Driven Tests?",
              "options": [
                "To make the program use more memory on purpose",
                "cover many cases with table-driven tests",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Cover many cases with table-driven tests — that is the purpose of Table-Driven Tests."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "total = 3",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'total = 3'."
            }
          ],
          "exercises": [
            {
              "id": "go-m15-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Table-Driven Tests.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * 2)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for double a number, and prints it. It follows the Table-Driven Tests pattern from this lesson.",
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
                  "content": "Re-read the task for Table-Driven Tests: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m16",
      "title": "Networking",
      "description": "Networking: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 16,
      "lessons": [
        {
          "id": "go-m16-l1",
          "slug": "go-m16-l1",
          "title": "HTTP Servers with net/http",
          "objectives": [
            "Explain what HTTP Servers with net/http is and when to use it",
            "Write the HTTP Servers with net/http pattern from the syntax in this lesson",
            "Build a small Go program that uses HTTP Servers with net/http correctly"
          ],
          "introduction": "HTTP Servers with net/http is a core part of writing Go. The net/http package serves HTTP with a handler function that receives a ResponseWriter and a Request, and http.ListenAndServe starts the server. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "The net/http package serves HTTP with a handler function that receives a ResponseWriter and a Request, and http.ListenAndServe starts the server. Handlers read the request, do the work, and write the response, while http.ServeMux routes paths to handlers. A few lines of Go are enough to serve a real API. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "http.HandleFunc(\"/hello\", func(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintln(w, \"Hello\")\n})\nhttp.ListenAndServe(\":8080\", nil)",
          "analogy": "Like a reception desk: a visitor arrives, you take their request, and you hand back an answer.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 8080\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem HTTP Servers with net/http solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 8080'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the HTTP Servers with net/http syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Copying a struct that contains a mutex, which breaks the lock."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to HTTP Servers with net/http, but it does not work because of using = instead of ==. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x == 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "explanation": "Comparison uses ==; a single = is assignment and is not allowed as a condition. A single = assigns instead of comparing, which is a compile error in an if condition."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the HTTP Servers with net/http pattern from this lesson.",
          "summary": "The net/http package serves HTTP with a handler function that receives a ResponseWriter and a Request, and http.ListenAndServe starts the server. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use HTTP Servers with net/http in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of HTTP Servers with net/http?",
              "options": [
                "To make the program use more memory on purpose",
                "serve HTTP requests with handlers and net/http",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code"
              ],
              "answer": 1,
              "explanation": "Serve HTTP requests with handlers and net/http — that is the purpose of HTTP Servers with net/http."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 8080",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 8080'."
            }
          ],
          "exercises": [
            {
              "id": "go-m16-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises HTTP Servers with net/http.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add two numbers, and prints it. It follows the HTTP Servers with net/http pattern from this lesson.",
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
                  "content": "Re-read the task for HTTP Servers with net/http: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m16-l2",
          "slug": "go-m16-l2",
          "title": "HTTP Clients and JSON",
          "objectives": [
            "Explain what HTTP Clients and JSON is and when to use it",
            "Write the HTTP Clients and JSON pattern from the syntax in this lesson",
            "Build a small Go program that uses HTTP Clients and JSON correctly"
          ],
          "introduction": "HTTP Clients and JSON is a core part of writing Go. An HTTP client fetches data with http.Get, reads the body, and decodes JSON into a struct with encoding/json. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "An HTTP client fetches data with http.Get, reads the body, and decodes JSON into a struct with encoding/json. Struct tags such as `json:\"name\"` map JSON keys to fields, and errors at every step must be checked. The same encoding package marshals structs back into JSON for responses. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "resp, err := http.Get(\"https://example.com/api\")\nif err != nil {\n    return err\n}",
          "analogy": "Like ordering by post: you send a request, the reply arrives in an envelope, and you open it carefully.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"json\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem HTTP Clients and JSON solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = json'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the HTTP Clients and JSON syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Starting a goroutine without a way to wait for it or stop it."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to HTTP Clients and JSON, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = 42\n    fmt.Println(n)\n}",
            "explanation": "Go checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an int variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the HTTP Clients and JSON pattern from this lesson.",
          "summary": "An HTTP client fetches data with http.Get, reads the body, and decodes JSON into a struct with encoding/json. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use HTTP Clients and JSON in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of HTTP Clients and JSON?",
              "options": [
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "fetch data with HTTP clients and decode JSON into structs",
                "To compile Go directly into a web page with no JavaScript"
              ],
              "answer": 2,
              "explanation": "Fetch data with HTTP clients and decode JSON into structs — that is the purpose of HTTP Clients and JSON."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = json",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = json'."
            }
          ],
          "exercises": [
            {
              "id": "go-m16-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises HTTP Clients and JSON.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var name string\n    fmt.Scan(&name)\n    fmt.Printf(\"Hello, %s!\\n\", name)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for greet by name, and prints it. It follows the HTTP Clients and JSON pattern from this lesson.",
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
                  "content": "Re-read the task for HTTP Clients and JSON: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m17",
      "title": "Intermediate Projects",
      "description": "Intermediate Projects: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "intermediate",
      "order": 17,
      "lessons": [
        {
          "id": "go-m17-l1",
          "slug": "go-m17-l1",
          "title": "Project: REST API for Tasks",
          "objectives": [
            "Explain what Project: REST API for Tasks is and when to use it",
            "Write the Project: REST API for Tasks pattern from the syntax in this lesson",
            "Build a small Go program that uses Project: REST API for Tasks correctly"
          ],
          "introduction": "Project: REST API for Tasks is a core part of writing Go. A REST API for tasks exposes endpoints to list, create, update and delete tasks, storing them in a slice or map behind a mutex. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A REST API for tasks exposes endpoints to list, create, update and delete tasks, storing them in a slice or map behind a mutex. It combines HTTP handlers, JSON encoding, routing and error handling into one recognisable backend. Returning the right status code for each outcome is as important as returning the right data. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "http.HandleFunc(\"/tasks\", tasksHandler)",
          "analogy": "Like a restaurant kitchen with a menu: each order (endpoint) comes back as a dish (response).",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"tasks\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Project: REST API for Tasks solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = tasks'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: REST API for Tasks syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Sharing a map between goroutines without a mutex, which causes a fatal concurrent map write."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: REST API for Tasks, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5.0 / 2.0)\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: REST API for Tasks pattern from this lesson.",
          "summary": "A REST API for tasks exposes endpoints to list, create, update and delete tasks, storing them in a slice or map behind a mutex. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: REST API for Tasks in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: REST API for Tasks?",
              "options": [
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "build a REST API with handlers, JSON and routing",
                "To compile Go directly into a web page with no JavaScript"
              ],
              "answer": 2,
              "explanation": "Build a REST API with handlers, JSON and routing — that is the purpose of Project: REST API for Tasks."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = tasks"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = tasks'."
            }
          ],
          "exercises": [
            {
              "id": "go-m17-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Project: REST API for Tasks.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * n)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for square a number, and prints it. It follows the Project: REST API for Tasks pattern from this lesson.",
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
                  "content": "Re-read the task for Project: REST API for Tasks: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m17-l2",
          "slug": "go-m17-l2",
          "title": "Project: File Server",
          "objectives": [
            "Explain what Project: File Server is and when to use it",
            "Write the Project: File Server pattern from the syntax in this lesson",
            "Build a small Go program that uses Project: File Server correctly"
          ],
          "introduction": "Project: File Server is a core part of writing Go. A file server maps URL paths to files on disk, serves them with the right content type, and returns 404 for missing files. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A file server maps URL paths to files on disk, serves them with the right content type, and returns 404 for missing files. It practices path handling, file I/O and HTTP responses in one project. The standard library's http.FileServer does the heavy lifting, and your job is to wire it up safely, rejecting paths that escape the root directory. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "http.Handle(\"/files/\", http.StripPrefix(\"/files/\", http.FileServer(http.Dir(\"./static\"))))",
          "analogy": "Like a librarian fetching books from the shelves: ask by title, receive the book, or a polite 'not found'.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"files\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Project: File Server solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = files'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: File Server syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting to check an error return, which hides failures until they cause a bigger problem."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: File Server, but it does not work because of an off-by-one loop. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "explanation": "Check the loop bounds: start, condition and step together decide exactly which values appear. The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: File Server pattern from this lesson.",
          "summary": "A file server maps URL paths to files on disk, serves them with the right content type, and returns 404 for missing files. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: File Server in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: File Server?",
              "options": [
                "To store data permanently in a database without code",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "serve files over HTTP safely with http.FileServer"
              ],
              "answer": 3,
              "explanation": "Serve files over HTTP safely with http.FileServer — that is the purpose of Project: File Server."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = files",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = files'."
            }
          ],
          "exercises": [
            {
              "id": "go-m17-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Project: File Server.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n + 10)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add ten, and prints it. It follows the Project: File Server pattern from this lesson.",
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
                  "content": "Re-read the task for Project: File Server: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m18",
      "title": "Concurrency",
      "description": "Concurrency: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 18,
      "lessons": [
        {
          "id": "go-m18-l1",
          "slug": "go-m18-l1",
          "title": "Goroutines",
          "objectives": [
            "Explain what Goroutines is and when to use it",
            "Write the Goroutines pattern from the syntax in this lesson",
            "Build a small Go program that uses Goroutines correctly"
          ],
          "introduction": "Goroutines is a core part of writing Go. A goroutine is a lightweight thread of execution started with the go keyword, and a program can run thousands of them cheaply. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A goroutine is a lightweight thread of execution started with the go keyword, and a program can run thousands of them cheaply. Goroutines run concurrently, and the scheduler multiplexes them onto a small number of operating system threads. Starting a goroutine is easy; coordinating it safely is the real skill, and channels are the usual tool. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "go func() {\n    fmt.Println(\"in a goroutine\")\n}()",
          "analogy": "Like hiring extra hands in a kitchen: more cooks, same kitchen, and someone has to coordinate them.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"goroutine\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Goroutines solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = goroutine'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Goroutines syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using = instead of == in a condition, which the compiler rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Goroutines, but it does not work because of a missing closing brace. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n}",
            "explanation": "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one. The main function is missing its closing brace, so the program does not compile."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Goroutines pattern from this lesson.",
          "summary": "A goroutine is a lightweight thread of execution started with the go keyword, and a program can run thousands of them cheaply. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Goroutines in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Goroutines?",
              "options": [
                "To store data permanently in a database without code",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "run code concurrently with goroutines"
              ],
              "answer": 3,
              "explanation": "Run code concurrently with goroutines — that is the purpose of Goroutines."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "message = goroutine",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'message = goroutine'."
            }
          ],
          "exercises": [
            {
              "id": "go-m18-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Goroutines.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a * b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for multiply two numbers, and prints it. It follows the Goroutines pattern from this lesson.",
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
                  "content": "Re-read the task for Goroutines: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m18-l2",
          "slug": "go-m18-l2",
          "title": "Channels Basics",
          "objectives": [
            "Explain what Channels Basics is and when to use it",
            "Write the Channels Basics pattern from the syntax in this lesson",
            "Build a small Go program that uses Channels Basics correctly"
          ],
          "introduction": "Channels Basics is a core part of writing Go. A channel carries values between goroutines: make(chan int) creates one, ch <- 42 sends, and v := <-ch receives. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A channel carries values between goroutines: make(chan int) creates one, ch <- 42 sends, and v := <-ch receives. Sending blocks until a receiver is ready, and receiving blocks until a sender arrives, which synchronises the two sides. Channels are how Go programs share data by communicating instead of sharing memory. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "ch := make(chan int)\ngo func() { ch <- 42 }()\nv := <-ch",
          "analogy": "Like a pneumatic tube between desks: put a message in one end, and it pops out the other.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 42\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Channels Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 42'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Channels Basics syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring the value returned by append, which can silently drop the new element."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Channels Basics, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 + 20)\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Channels Basics pattern from this lesson.",
          "summary": "A channel carries values between goroutines: make(chan int) creates one, ch <- 42 sends, and v := <-ch receives. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Channels Basics in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Channels Basics?",
              "options": [
                "communicate between goroutines with channels",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "To delete unused files from the project automatically"
              ],
              "answer": 0,
              "explanation": "Communicate between goroutines with channels — that is the purpose of Channels Basics."
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
              "id": "go-m18-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Channels Basics.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    if n%2 == 0 {\n        fmt.Println(\"even\")\n    } else {\n        fmt.Println(\"odd\")\n    }\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for even or odd, and prints it. It follows the Channels Basics pattern from this lesson.",
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
                  "content": "Re-read the task for Channels Basics: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m19",
      "title": "Synchronization",
      "description": "Synchronization: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 19,
      "lessons": [
        {
          "id": "go-m19-l1",
          "slug": "go-m19-l1",
          "title": "Mutexes",
          "objectives": [
            "Explain what Mutexes is and when to use it",
            "Write the Mutexes pattern from the syntax in this lesson",
            "Build a small Go program that uses Mutexes correctly"
          ],
          "introduction": "Mutexes is a core part of writing Go. A sync.Mutex guards shared data: Lock before touching it, Unlock when done, and only one goroutine holds the lock at a time. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A sync.Mutex guards shared data: Lock before touching it, Unlock when done, and only one goroutine holds the lock at a time. Forgetting to unlock deadlocks the program, so defer Unlock right after Lock. Mutexes are the right tool when several goroutines update the same variable; channels are often better when they pass work along. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "var mu sync.Mutex\nmu.Lock()\ncount++\nmu.Unlock()",
          "analogy": "Like a single key for a bathroom: whoever holds it is inside, and everyone else waits.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 1\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Mutexes solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 1'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Mutexes syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Copying a struct that contains a mutex, which breaks the lock."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Mutexes, but it does not work because of using = instead of ==. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x == 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "explanation": "Comparison uses ==; a single = is assignment and is not allowed as a condition. A single = assigns instead of comparing, which is a compile error in an if condition."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Mutexes pattern from this lesson.",
          "summary": "A sync.Mutex guards shared data: Lock before touching it, Unlock when done, and only one goroutine holds the lock at a time. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Mutexes in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Mutexes?",
              "options": [
                "protect shared data with a mutex",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "To delete unused files from the project automatically"
              ],
              "answer": 0,
              "explanation": "Protect shared data with a mutex — that is the purpose of Mutexes."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "count = 1"
              ],
              "answer": 3,
              "explanation": "The example prints 'count = 1'."
            }
          ],
          "exercises": [
            {
              "id": "go-m19-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Mutexes.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var word string\n    fmt.Scan(&word)\n    fmt.Println(len(word))\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for word length, and prints it. It follows the Mutexes pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "go",
                  "expectedStdout": "2",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "gopher",
                  "expectedStdout": "6",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Mutexes: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m19-l2",
          "slug": "go-m19-l2",
          "title": "WaitGroups and sync.Once",
          "objectives": [
            "Explain what WaitGroups and sync.Once is and when to use it",
            "Write the WaitGroups and sync.Once pattern from the syntax in this lesson",
            "Build a small Go program that uses WaitGroups and sync.Once correctly"
          ],
          "introduction": "WaitGroups and sync.Once is a core part of writing Go. A sync.WaitGroup waits for a set of goroutines to finish: Add counts them, Done marks one finished, and Wait blocks until all are done. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A sync.WaitGroup waits for a set of goroutines to finish: Add counts them, Done marks one finished, and Wait blocks until all are done. sync.Once runs a function exactly once, which is ideal for lazy initialisation shared by many goroutines. Both are small tools that prevent the most common coordination bugs. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    work()\n}()\nwg.Wait()",
          "analogy": "Like a teacher waiting for every pupil to hand in their homework before leaving the room.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 1\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem WaitGroups and sync.Once solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 1'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the WaitGroups and sync.Once syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Starting a goroutine without a way to wait for it or stop it."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to WaitGroups and sync.Once, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = 42\n    fmt.Println(n)\n}",
            "explanation": "Go checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an int variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the WaitGroups and sync.Once pattern from this lesson.",
          "summary": "A sync.WaitGroup waits for a set of goroutines to finish: Add counts them, Done marks one finished, and Wait blocks until all are done. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use WaitGroups and sync.Once in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of WaitGroups and sync.Once?",
              "options": [
                "To run Go programs without ever compiling them",
                "wait for goroutines with WaitGroup and initialise once with sync.Once",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose"
              ],
              "answer": 1,
              "explanation": "Wait for goroutines with WaitGroup and initialise once with sync.Once — that is the purpose of WaitGroups and sync.Once."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 1",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 1'."
            }
          ],
          "exercises": [
            {
              "id": "go-m19-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises WaitGroups and sync.Once.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * 2)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for double a number, and prints it. It follows the WaitGroups and sync.Once pattern from this lesson.",
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
                  "content": "Re-read the task for WaitGroups and sync.Once: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m20",
      "title": "Concurrency Patterns",
      "description": "Concurrency Patterns: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 20,
      "lessons": [
        {
          "id": "go-m20-l1",
          "slug": "go-m20-l1",
          "title": "Worker Pools",
          "objectives": [
            "Explain what Worker Pools is and when to use it",
            "Write the Worker Pools pattern from the syntax in this lesson",
            "Build a small Go program that uses Worker Pools correctly"
          ],
          "introduction": "Worker Pools is a core part of writing Go. A worker pool starts a fixed number of goroutines that read jobs from a channel, do the work, and send results to another channel. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A worker pool starts a fixed number of goroutines that read jobs from a channel, do the work, and send results to another channel. It limits how much runs at once, which protects memory and downstream services from being overwhelmed. Closing the jobs channel tells workers there is no more work, and each worker exits when the channel closes. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "jobs := make(chan int, 10)\nfor w := 0; w < 3; w++ {\n    go worker(jobs)\n}",
          "analogy": "Like a team of baristas sharing one order queue: orders come in, any free barista takes the next one.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 3\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Worker Pools solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 3'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Worker Pools syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Sharing a map between goroutines without a mutex, which causes a fatal concurrent map write."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Worker Pools, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5.0 / 2.0)\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Worker Pools pattern from this lesson.",
          "summary": "A worker pool starts a fixed number of goroutines that read jobs from a channel, do the work, and send results to another channel. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Worker Pools in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Worker Pools?",
              "options": [
                "To run Go programs without ever compiling them",
                "limit concurrency with a fixed pool of workers",
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose"
              ],
              "answer": 1,
              "explanation": "Limit concurrency with a fixed pool of workers — that is the purpose of Worker Pools."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "count = 3",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'count = 3'."
            }
          ],
          "exercises": [
            {
              "id": "go-m20-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Worker Pools.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add two numbers, and prints it. It follows the Worker Pools pattern from this lesson.",
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
                  "content": "Re-read the task for Worker Pools: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m20-l2",
          "slug": "go-m20-l2",
          "title": "Fan-Out and Fan-In",
          "objectives": [
            "Explain what Fan-Out and Fan-In is and when to use it",
            "Write the Fan-Out and Fan-In pattern from the syntax in this lesson",
            "Build a small Go program that uses Fan-Out and Fan-In correctly"
          ],
          "introduction": "Fan-Out and Fan-In is a core part of writing Go. Fan-out sends work to many goroutines at once, and fan-in merges their results into a single channel that the consumer reads. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Fan-out sends work to many goroutines at once, and fan-in merges their results into a single channel that the consumer reads. Together they form a pipeline: split the work, process it in parallel, and collect the results in order. The pattern is the backbone of parallel data processing in Go. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "out := make(chan int)\ngo func() {\n    out <- process(in)\n}()",
          "analogy": "Like a river splitting into streams and joining again: the water is the same, it just travels in parallel.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 2\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Fan-Out and Fan-In solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 2'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Fan-Out and Fan-In syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting to check an error return, which hides failures until they cause a bigger problem."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Fan-Out and Fan-In, but it does not work because of an off-by-one loop. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "explanation": "Check the loop bounds: start, condition and step together decide exactly which values appear. The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Fan-Out and Fan-In pattern from this lesson.",
          "summary": "Fan-out sends work to many goroutines at once, and fan-in merges their results into a single channel that the consumer reads. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Fan-Out and Fan-In in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Fan-Out and Fan-In?",
              "options": [
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "split work across goroutines and merge the results",
                "To replace the Go compiler with a faster one"
              ],
              "answer": 2,
              "explanation": "Split work across goroutines and merge the results — that is the purpose of Fan-Out and Fan-In."
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
              "id": "go-m20-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Fan-Out and Fan-In.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var name string\n    fmt.Scan(&name)\n    fmt.Printf(\"Hello, %s!\\n\", name)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for greet by name, and prints it. It follows the Fan-Out and Fan-In pattern from this lesson.",
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
                  "content": "Re-read the task for Fan-Out and Fan-In: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m21",
      "title": "Context",
      "description": "Context: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 21,
      "lessons": [
        {
          "id": "go-m21-l1",
          "slug": "go-m21-l1",
          "title": "Context Basics",
          "objectives": [
            "Explain what Context Basics is and when to use it",
            "Write the Context Basics pattern from the syntax in this lesson",
            "Build a small Go program that uses Context Basics correctly"
          ],
          "introduction": "Context Basics is a core part of writing Go. A context.Context carries deadlines, cancellation signals and request-scoped values through a chain of function calls. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A context.Context carries deadlines, cancellation signals and request-scoped values through a chain of function calls. Functions that do I/O accept a ctx as their first parameter and stop work when ctx.Done closes. Context is how a request's lifetime flows from an HTTP handler down to the database call. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "ctx := context.Background()\nreq = req.WithContext(ctx)",
          "analogy": "Like a baton in a relay race: it passes from runner to runner, and everyone knows when the race is over.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"context\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Context Basics solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = context'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Context Basics syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using = instead of == in a condition, which the compiler rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Context Basics, but it does not work because of a missing closing brace. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n}",
            "explanation": "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one. The main function is missing its closing brace, so the program does not compile."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Context Basics pattern from this lesson.",
          "summary": "A context.Context carries deadlines, cancellation signals and request-scoped values through a chain of function calls. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Context Basics in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Context Basics?",
              "options": [
                "To delete unused files from the project automatically",
                "To make the program use more memory on purpose",
                "carry deadlines and cancellation through call chains with context",
                "To replace the Go compiler with a faster one"
              ],
              "answer": 2,
              "explanation": "Carry deadlines and cancellation through call chains with context — that is the purpose of Context Basics."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = context"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = context'."
            }
          ],
          "exercises": [
            {
              "id": "go-m21-l1-ex1",
              "title": "Build: square a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print its square. This exercise practises Context Basics.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * n)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for square a number, and prints it. It follows the Context Basics pattern from this lesson.",
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
                  "content": "Re-read the task for Context Basics: Read one integer from stdin and print its square."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m21-l2",
          "slug": "go-m21-l2",
          "title": "Cancellation and Timeouts",
          "objectives": [
            "Explain what Cancellation and Timeouts is and when to use it",
            "Write the Cancellation and Timeouts pattern from the syntax in this lesson",
            "Build a small Go program that uses Cancellation and Timeouts correctly"
          ],
          "introduction": "Cancellation and Timeouts is a core part of writing Go. context.WithCancel returns a cancel function that stops the work, and WithTimeout adds a deadline after which the context cancels itself. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "context.WithCancel returns a cancel function that stops the work, and WithTimeout adds a deadline after which the context cancels itself. Long-running work should select on ctx.Done and return promptly, releasing its resources. Timeouts turn a hung dependency into a fast, visible error instead of a silent stall. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "ctx, cancel := context.WithTimeout(context.Background(), time.Second)\ndefer cancel()",
          "analogy": "Like a kitchen timer: when it rings, you stop cooking, whatever state the dish is in.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 1\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Cancellation and Timeouts solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 1'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Cancellation and Timeouts syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring the value returned by append, which can silently drop the new element."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Cancellation and Timeouts, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 + 20)\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Cancellation and Timeouts pattern from this lesson.",
          "summary": "context.WithCancel returns a cancel function that stops the work, and WithTimeout adds a deadline after which the context cancels itself. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Cancellation and Timeouts in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Cancellation and Timeouts?",
              "options": [
                "To make the program use more memory on purpose",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "cancel work and enforce timeouts with context"
              ],
              "answer": 3,
              "explanation": "Cancel work and enforce timeouts with context — that is the purpose of Cancellation and Timeouts."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "count = 1",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'count = 1'."
            }
          ],
          "exercises": [
            {
              "id": "go-m21-l2-ex1",
              "title": "Build: add ten",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print the number plus ten. This exercise practises Cancellation and Timeouts.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n + 10)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add ten, and prints it. It follows the Cancellation and Timeouts pattern from this lesson.",
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
                  "content": "Re-read the task for Cancellation and Timeouts: Read one integer from stdin and print the number plus ten."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m22",
      "title": "Performance",
      "description": "Performance: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 22,
      "lessons": [
        {
          "id": "go-m22-l1",
          "slug": "go-m22-l1",
          "title": "Benchmarking with go test",
          "objectives": [
            "Explain what Benchmarking with go test is and when to use it",
            "Write the Benchmarking with go test pattern from the syntax in this lesson",
            "Build a small Go program that uses Benchmarking with go test correctly"
          ],
          "introduction": "Benchmarking with go test is a core part of writing Go. Benchmarks are functions named BenchmarkXxx that take *testing.B and run the code b.N times, and go test -bench=. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Benchmarks are functions named BenchmarkXxx that take *testing.B and run the code b.N times, and go test -bench=. reports the time per operation. Benchmarks measure real performance instead of guessing, and the -benchmem flag adds allocation counts. Always benchmark before and after an optimisation to prove it helped. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func BenchmarkAdd(b *testing.B) {\n    for i := 0; i < b.N; i++ {\n        Add(2, 3)\n    }\n}",
          "analogy": "Like a stopwatch at a race: it tells you who is actually fastest, not who looks fastest.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 5\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Benchmarking with go test solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 5'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Benchmarking with go test syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Copying a struct that contains a mutex, which breaks the lock."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Benchmarking with go test, but it does not work because of using = instead of ==. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x == 5 {\n        fmt.Println(\"five\")\n    }\n}",
            "explanation": "Comparison uses ==; a single = is assignment and is not allowed as a condition. A single = assigns instead of comparing, which is a compile error in an if condition."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Benchmarking with go test pattern from this lesson.",
          "summary": "Benchmarks are functions named BenchmarkXxx that take *testing.B and run the code b.N times, and go test -bench=. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Benchmarking with go test in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Benchmarking with go test?",
              "options": [
                "To make the program use more memory on purpose",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "measure performance with benchmarks in go test"
              ],
              "answer": 3,
              "explanation": "Measure performance with benchmarks in go test — that is the purpose of Benchmarking with go test."
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
              "id": "go-m22-l1-ex1",
              "title": "Build: multiply two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their product. This exercise practises Benchmarking with go test.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a * b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for multiply two numbers, and prints it. It follows the Benchmarking with go test pattern from this lesson.",
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
                  "content": "Re-read the task for Benchmarking with go test: Read two integers separated by a space and print their product."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m22-l2",
          "slug": "go-m22-l2",
          "title": "Profiling with pprof",
          "objectives": [
            "Explain what Profiling with pprof is and when to use it",
            "Write the Profiling with pprof pattern from the syntax in this lesson",
            "Build a small Go program that uses Profiling with pprof correctly"
          ],
          "introduction": "Profiling with pprof is a core part of writing Go. Go's pprof tool profiles CPU and memory usage, showing which functions spend the time and allocate the memory. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Go's pprof tool profiles CPU and memory usage, showing which functions spend the time and allocate the memory. Import net/http/pprof in a server to expose profiles, or use go test -cpuprofile for a benchmark. Profiling finds the real hot spot, which is rarely where intuition says it is. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "go test -bench=. -cpuprofile=cpu.prof\ngo tool pprof cpu.prof",
          "analogy": "Like a doctor checking your pulse before prescribing: measure first, treat second.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    count := 100\n    fmt.Println(\"count =\", count)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Profiling with pprof solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'count = 100'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Profiling with pprof syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Starting a goroutine without a way to wait for it or stop it."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Profiling with pprof, but it does not work because of a type mismatch. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = 42\n    fmt.Println(n)\n}",
            "explanation": "Go checks types at compile time: a string is not a number, even when it looks like one. A string literal is assigned to an int variable, which the compiler rejects."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Profiling with pprof pattern from this lesson.",
          "summary": "Go's pprof tool profiles CPU and memory usage, showing which functions spend the time and allocate the memory. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Profiling with pprof in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Profiling with pprof?",
              "options": [
                "find hot spots with CPU and memory profiling",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "To compile Go directly into a web page with no JavaScript"
              ],
              "answer": 0,
              "explanation": "Find hot spots with CPU and memory profiling — that is the purpose of Profiling with pprof."
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
              "id": "go-m22-l2-ex1",
              "title": "Build: even or odd",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print 'even' if it is even and 'odd' otherwise. This exercise practises Profiling with pprof.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    if n%2 == 0 {\n        fmt.Println(\"even\")\n    } else {\n        fmt.Println(\"odd\")\n    }\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for even or odd, and prints it. It follows the Profiling with pprof pattern from this lesson.",
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
                  "content": "Re-read the task for Profiling with pprof: Read one integer from stdin and print 'even' if it is even and 'odd' otherwise."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m23",
      "title": "Backend Engineering",
      "description": "Backend Engineering: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 23,
      "lessons": [
        {
          "id": "go-m23-l1",
          "slug": "go-m23-l1",
          "title": "Middleware and Routing",
          "objectives": [
            "Explain what Middleware and Routing is and when to use it",
            "Write the Middleware and Routing pattern from the syntax in this lesson",
            "Build a small Go program that uses Middleware and Routing correctly"
          ],
          "introduction": "Middleware and Routing is a core part of writing Go. Middleware wraps a handler with extra behaviour such as logging, authentication or recovery, and a router such as chi or the standard ServeMux maps paths to handlers. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "Middleware wraps a handler with extra behaviour such as logging, authentication or recovery, and a router such as chi or the standard ServeMux maps paths to handlers. Handlers stay focused on one endpoint, middleware handles cross-cutting concerns, and the chain composes in a readable order. Good middleware is small, testable and reusable. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "func logging(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        log.Println(r.URL.Path)\n        next.ServeHTTP(w, r)\n    })\n}",
          "analogy": "Like airport security: every passenger passes through the same checks before reaching their gate.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"middleware\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Middleware and Routing solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = middleware'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Middleware and Routing syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Sharing a map between goroutines without a mutex, which causes a fatal concurrent map write."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Middleware and Routing, but it does not work because of integer division. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5.0 / 2.0)\n}",
            "explanation": "Use floating-point literals when you need a fractional result; integer division discards the remainder. Integer division truncates, so 5 / 2 is 2, not 2.5."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Middleware and Routing pattern from this lesson.",
          "summary": "Middleware wraps a handler with extra behaviour such as logging, authentication or recovery, and a router such as chi or the standard ServeMux maps paths to handlers. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Middleware and Routing in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Middleware and Routing?",
              "options": [
                "compose handlers with middleware and routing",
                "To replace the Go compiler with a faster one",
                "To store data permanently in a database without code",
                "To compile Go directly into a web page with no JavaScript"
              ],
              "answer": 0,
              "explanation": "Compose handlers with middleware and routing — that is the purpose of Middleware and Routing."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "Nothing is printed",
                "message = middleware"
              ],
              "answer": 3,
              "explanation": "The example prints 'message = middleware'."
            }
          ],
          "exercises": [
            {
              "id": "go-m23-l1-ex1",
              "title": "Build: word length",
              "type": "build-program",
              "instructions": "Read one word from stdin and print the number of characters in it. This exercise practises Middleware and Routing.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var word string\n    fmt.Scan(&word)\n    fmt.Println(len(word))\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for word length, and prints it. It follows the Middleware and Routing pattern from this lesson.",
              "complexity": "O(1) time, O(1) extra space",
              "tests": [
                {
                  "name": "example input",
                  "stdin": "go",
                  "expectedStdout": "2",
                  "hidden": false
                },
                {
                  "name": "hidden input",
                  "stdin": "gopher",
                  "expectedStdout": "6",
                  "hidden": true
                }
              ],
              "hints": [
                {
                  "level": 1,
                  "title": "What is the goal?",
                  "content": "Re-read the task for Middleware and Routing: Read one word from stdin and print the number of characters in it."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m23-l2",
          "slug": "go-m23-l2",
          "title": "Databases with database/sql",
          "objectives": [
            "Explain what Databases with database/sql is and when to use it",
            "Write the Databases with database/sql pattern from the syntax in this lesson",
            "Build a small Go program that uses Databases with database/sql correctly"
          ],
          "introduction": "Databases with database/sql is a core part of writing Go. The database/sql package talks to any database through a driver, with DB as a connection pool, Query for rows and Exec for writes. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "The database/sql package talks to any database through a driver, with DB as a connection pool, Query for rows and Exec for writes. Use placeholders such as $1 or ? to pass parameters safely and prevent SQL injection, and always close rows and check errors. A connection pool reuses connections instead of opening one per request. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "db, err := sql.Open(\"postgres\", connStr)\nrows, err := db.Query(\"SELECT name FROM users\")",
          "analogy": "Like a switchboard: one pool of lines, many callers, and every call logged and checked.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"database\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Databases with database/sql solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = database'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Databases with database/sql syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Forgetting to check an error return, which hides failures until they cause a bigger problem."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Databases with database/sql, but it does not work because of an off-by-one loop. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        fmt.Println(i)\n    }\n}",
            "explanation": "Check the loop bounds: start, condition and step together decide exactly which values appear. The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Databases with database/sql pattern from this lesson.",
          "summary": "The database/sql package talks to any database through a driver, with DB as a connection pool, Query for rows and Exec for writes. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Databases with database/sql in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Databases with database/sql?",
              "options": [
                "To store data permanently in a database without code",
                "query databases safely with database/sql and placeholders",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them"
              ],
              "answer": 1,
              "explanation": "Query databases safely with database/sql and placeholders — that is the purpose of Databases with database/sql."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "message = database",
                "0",
                "An error",
                "Nothing is printed"
              ],
              "answer": 0,
              "explanation": "The example prints 'message = database'."
            }
          ],
          "exercises": [
            {
              "id": "go-m23-l2-ex1",
              "title": "Build: double a number",
              "type": "build-program",
              "instructions": "Read one integer from stdin and print twice its value. This exercise practises Databases with database/sql.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * 2)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for double a number, and prints it. It follows the Databases with database/sql pattern from this lesson.",
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
                  "content": "Re-read the task for Databases with database/sql: Read one integer from stdin and print twice its value."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "go-m24",
      "title": "Advanced Projects",
      "description": "Advanced Projects: two lessons that build real Go skill step by step, with a worked example and a hands-on exercise in each lesson.",
      "level": "advanced",
      "order": 24,
      "lessons": [
        {
          "id": "go-m24-l1",
          "slug": "go-m24-l1",
          "title": "Project: URL Shortener Service",
          "objectives": [
            "Explain what Project: URL Shortener Service is and when to use it",
            "Write the Project: URL Shortener Service pattern from the syntax in this lesson",
            "Build a small Go program that uses Project: URL Shortener Service correctly"
          ],
          "introduction": "Project: URL Shortener Service is a core part of writing Go. A URL shortener stores a mapping from a short code to a long URL, redirects visitors, and counts clicks, with a mutex guarding the map. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A URL shortener stores a mapping from a short code to a long URL, redirects visitors, and counts clicks, with a mutex guarding the map. It combines HTTP handlers, random code generation, persistence and concurrency in one service. Choosing short, unguessable codes and handling collisions are the interesting design decisions. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "http.HandleFunc(\"/s/\", redirectHandler)",
          "analogy": "Like a nickname: short, easy to say, and it always points to the same person.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"shortener\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Project: URL Shortener Service solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = shortener'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: URL Shortener Service syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Using = instead of == in a condition, which the compiler rejects."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: URL Shortener Service, but it does not work because of a missing closing brace. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n}",
            "explanation": "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one. The main function is missing its closing brace, so the program does not compile."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: URL Shortener Service pattern from this lesson.",
          "summary": "A URL shortener stores a mapping from a short code to a long URL, redirects visitors, and counts clicks, with a mutex guarding the map. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: URL Shortener Service in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: URL Shortener Service?",
              "options": [
                "To store data permanently in a database without code",
                "build a URL shortener with storage, redirects and click counts",
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them"
              ],
              "answer": 1,
              "explanation": "Build a URL shortener with storage, redirects and click counts — that is the purpose of Project: URL Shortener Service."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "message = shortener",
                "An error",
                "Nothing is printed"
              ],
              "answer": 1,
              "explanation": "The example prints 'message = shortener'."
            }
          ],
          "exercises": [
            {
              "id": "go-m24-l1-ex1",
              "title": "Build: add two numbers",
              "type": "build-program",
              "instructions": "Read two integers separated by a space and print their sum. This exercise practises Project: URL Shortener Service.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for add two numbers, and prints it. It follows the Project: URL Shortener Service pattern from this lesson.",
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
                  "content": "Re-read the task for Project: URL Shortener Service: Read two integers separated by a space and print their sum."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        },
        {
          "id": "go-m24-l2",
          "slug": "go-m24-l2",
          "title": "Project: Concurrent Chat Server",
          "objectives": [
            "Explain what Project: Concurrent Chat Server is and when to use it",
            "Write the Project: Concurrent Chat Server pattern from the syntax in this lesson",
            "Build a small Go program that uses Project: Concurrent Chat Server correctly"
          ],
          "introduction": "Project: Concurrent Chat Server is a core part of writing Go. A chat server accepts many TCP connections, broadcasts each message to all the others, and removes clients that disconnect. In this lesson you will see how it works, study a complete example, and practise it yourself.",
          "concept": "A chat server accepts many TCP connections, broadcasts each message to all the others, and removes clients that disconnect. It combines goroutines, channels and a broadcast hub in the classic Go concurrency design. The hub owns the client set, so no mutex is needed: all state changes happen in one goroutine. When you use this in a real program, start from the syntax shown in this lesson and adapt it to your own data. The example below is a small, complete program, so you can see every piece working together before you change it. Pay attention to how each line connects to the idea above, because that connection is what makes the pattern reusable. A good way to check your understanding is to change one small part of the example and predict the result before you run it. If the result surprises you, re-read the explanation and trace the values through the program step by step.",
          "syntax": "go handleConn(conn)",
          "analogy": "Like a conference call: everyone speaks into one room, and everyone hears everyone else.",
          "exampleCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    message := \"chat\"\n    fmt.Println(\"message =\", message)\n}",
          "exampleLanguage": "go",
          "walkthrough": [
            "Read the concept above and note what problem Project: Concurrent Chat Server solves.",
            "Study the syntax block and identify each part of the pattern.",
            "Read the example program line by line and trace how it prints 'message = chat'.",
            "Predict what would change if you replaced the value in the example with your own.",
            "Run the example, compare the output with your prediction, and re-read any step that surprised you.",
            "Complete the exercise below using the same pattern."
          ],
          "commonMistakes": [
            "Forgetting a key part of the Project: Concurrent Chat Server syntax, which makes the program fail to compile.",
            "Hard-coding the example value instead of reading real input, so the program cannot handle new data.",
            "Ignoring the value returned by append, which can silently drop the new element."
          ],
          "debuggingExercise": {
            "prompt": "This program is related to Project: Concurrent Chat Server, but it does not work because of subtracting instead of adding. Find and fix the bug.",
            "buggyCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
            "fixedCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 + 20)\n}",
            "explanation": "Read the operator carefully: a single wrong character changes the whole result. The program subtracts where it should add, so it prints -10 instead of the sum 30."
          },
          "miniChallenge": "Modify the example program so it prints a second line with your own value, using the Project: Concurrent Chat Server pattern from this lesson.",
          "summary": "A chat server accepts many TCP connections, broadcasts each message to all the others, and removes clients that disconnect. In this lesson you saw the syntax, a working example, and the mistakes to avoid when you use Project: Concurrent Chat Server in your own programs.",
          "knowledgeCheck": [
            {
              "question": "What is the main purpose of Project: Concurrent Chat Server?",
              "options": [
                "To compile Go directly into a web page with no JavaScript",
                "To run Go programs without ever compiling them",
                "build a concurrent chat server with goroutines and a broadcast hub",
                "To delete unused files from the project automatically"
              ],
              "answer": 2,
              "explanation": "Build a concurrent chat server with goroutines and a broadcast hub — that is the purpose of Project: Concurrent Chat Server."
            },
            {
              "question": "What does the example program in this lesson print?",
              "options": [
                "0",
                "An error",
                "message = chat",
                "Nothing is printed"
              ],
              "answer": 2,
              "explanation": "The example prints 'message = chat'."
            }
          ],
          "exercises": [
            {
              "id": "go-m24-l2-ex1",
              "title": "Build: greet by name",
              "type": "build-program",
              "instructions": "Read a name from stdin and print a greeting in the form 'Hello, NAME!'. This exercise practises Project: Concurrent Chat Server.",
              "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
              "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var name string\n    fmt.Scan(&name)\n    fmt.Printf(\"Hello, %s!\\n\", name)\n}",
              "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer for greet by name, and prints it. It follows the Project: Concurrent Chat Server pattern from this lesson.",
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
                  "content": "Re-read the task for Project: Concurrent Chat Server: Read a name from stdin and print a greeting in the form 'Hello, NAME!'."
                },
                {
                  "level": 2,
                  "title": "Plan the program",
                  "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
                },
                {
                  "level": 3,
                  "title": "Pseudocode",
                  "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
                },
                {
                  "level": 4,
                  "title": "Debugging",
                  "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
                },
                {
                  "level": 5,
                  "title": "Full solution",
                  "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const GO_ASSESSMENT: MasteryAssessment = {
  "courseSlug": "go",
  "passPercent": 80,
  "questions": [
    {
      "id": "go-assess-q1",
      "kind": "conceptual",
      "topic": "What Is Go?",
      "question": "Which statement best describes What Is Go??",
      "options": [
        "build fast, reliable servers with a small, clean language",
        "To replace the Go compiler with a faster one",
        "To store data permanently in a database without code",
        "To compile Go directly into a web page with no JavaScript"
      ],
      "answer": 0,
      "explanation": "Build fast, reliable servers with a small, clean language."
    },
    {
      "id": "go-assess-q2",
      "kind": "conceptual",
      "topic": "Installing Go and Your First Program",
      "question": "Which statement best describes Installing Go and Your First Program?",
      "options": [
        "To store data permanently in a database without code",
        "create a module, write package main, and run it with go run",
        "To compile Go directly into a web page with no JavaScript",
        "To run Go programs without ever compiling them"
      ],
      "answer": 1,
      "explanation": "Create a module, write package main, and run it with go run."
    },
    {
      "id": "go-assess-q3",
      "kind": "conceptual",
      "topic": "Declaring Variables",
      "question": "Which statement best describes Declaring Variables?",
      "options": [
        "To compile Go directly into a web page with no JavaScript",
        "To run Go programs without ever compiling them",
        "declare typed variables with var",
        "To delete unused files from the project automatically"
      ],
      "answer": 2,
      "explanation": "Declare typed variables with var."
    },
    {
      "id": "go-assess-q4",
      "kind": "conceptual",
      "topic": "Short Variable Declarations",
      "question": "Which statement best describes Short Variable Declarations?",
      "options": [
        "To run Go programs without ever compiling them",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "declare local variables concisely with :="
      ],
      "answer": 3,
      "explanation": "Declare local variables concisely with :=."
    },
    {
      "id": "go-assess-q5",
      "kind": "conceptual",
      "topic": "Basic Types",
      "question": "Which statement best describes Basic Types?",
      "options": [
        "store values with int, float64, bool and string types",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "To replace the Go compiler with a faster one"
      ],
      "answer": 0,
      "explanation": "Store values with int, float64, bool and string types."
    },
    {
      "id": "go-assess-q6",
      "kind": "conceptual",
      "topic": "Type Conversion",
      "question": "Which statement best describes Type Conversion?",
      "options": [
        "To make the program use more memory on purpose",
        "convert between types explicitly with T(value)",
        "To replace the Go compiler with a faster one",
        "To store data permanently in a database without code"
      ],
      "answer": 1,
      "explanation": "Convert between types explicitly with T(value)."
    },
    {
      "id": "go-assess-q7",
      "kind": "conceptual",
      "topic": "Arithmetic Operators",
      "question": "Which statement best describes Arithmetic Operators?",
      "options": [
        "To replace the Go compiler with a faster one",
        "To store data permanently in a database without code",
        "compute with arithmetic operators and compound assignment",
        "To compile Go directly into a web page with no JavaScript"
      ],
      "answer": 2,
      "explanation": "Compute with arithmetic operators and compound assignment."
    },
    {
      "id": "go-assess-q8",
      "kind": "conceptual",
      "topic": "Comparison and Logical Operators",
      "question": "Which statement best describes Comparison and Logical Operators?",
      "options": [
        "To store data permanently in a database without code",
        "To compile Go directly into a web page with no JavaScript",
        "To run Go programs without ever compiling them",
        "compare values and combine conditions with logical operators"
      ],
      "answer": 3,
      "explanation": "Compare values and combine conditions with logical operators."
    },
    {
      "id": "go-assess-q9",
      "kind": "conceptual",
      "topic": "if and else",
      "question": "Which statement best describes if and else?",
      "options": [
        "branch on boolean conditions with if and else",
        "To compile Go directly into a web page with no JavaScript",
        "To run Go programs without ever compiling them",
        "To delete unused files from the project automatically"
      ],
      "answer": 0,
      "explanation": "Branch on boolean conditions with if and else."
    },
    {
      "id": "go-assess-q10",
      "kind": "conceptual",
      "topic": "switch and Loops",
      "question": "Which statement best describes switch and Loops?",
      "options": [
        "To run Go programs without ever compiling them",
        "choose with switch and repeat with for loops",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose"
      ],
      "answer": 1,
      "explanation": "Choose with switch and repeat with for loops."
    },
    {
      "id": "go-assess-q11",
      "kind": "conceptual",
      "topic": "Defining Functions",
      "question": "Which statement best describes Defining Functions?",
      "options": [
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "organise code into named, typed functions",
        "To replace the Go compiler with a faster one"
      ],
      "answer": 2,
      "explanation": "Organise code into named, typed functions."
    },
    {
      "id": "go-assess-q12",
      "kind": "conceptual",
      "topic": "Multiple Return Values",
      "question": "Which statement best describes Multiple Return Values?",
      "options": [
        "To make the program use more memory on purpose",
        "To replace the Go compiler with a faster one",
        "To store data permanently in a database without code",
        "return several values at once, usually a result and an error"
      ],
      "answer": 3,
      "explanation": "Return several values at once, usually a result and an error."
    },
    {
      "id": "go-assess-q13",
      "kind": "conceptual",
      "topic": "Arrays and Slices",
      "question": "Which statement best describes Arrays and Slices?",
      "options": [
        "store ordered values with arrays and growable slices",
        "To replace the Go compiler with a faster one",
        "To store data permanently in a database without code",
        "To compile Go directly into a web page with no JavaScript"
      ],
      "answer": 0,
      "explanation": "Store ordered values with arrays and growable slices."
    },
    {
      "id": "go-assess-q14",
      "kind": "conceptual",
      "topic": "Maps",
      "question": "Which statement best describes Maps?",
      "options": [
        "To store data permanently in a database without code",
        "store and look up key-value pairs with maps",
        "To compile Go directly into a web page with no JavaScript",
        "To run Go programs without ever compiling them"
      ],
      "answer": 1,
      "explanation": "Store and look up key-value pairs with maps."
    },
    {
      "id": "go-assess-q15",
      "kind": "conceptual",
      "topic": "Defining Structs",
      "question": "Which statement best describes Defining Structs?",
      "options": [
        "To compile Go directly into a web page with no JavaScript",
        "To run Go programs without ever compiling them",
        "group related fields into a named struct type",
        "To delete unused files from the project automatically"
      ],
      "answer": 2,
      "explanation": "Group related fields into a named struct type."
    },
    {
      "id": "go-assess-q16",
      "kind": "conceptual",
      "topic": "Methods on Structs",
      "question": "Which statement best describes Methods on Structs?",
      "options": [
        "To run Go programs without ever compiling them",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "attach behaviour to structs with methods and receivers"
      ],
      "answer": 3,
      "explanation": "Attach behaviour to structs with methods and receivers."
    },
    {
      "id": "go-assess-q17",
      "kind": "conceptual",
      "topic": "Interfaces Basics",
      "question": "Which statement best describes Interfaces Basics?",
      "options": [
        "define behaviour with interfaces satisfied implicitly",
        "To delete unused files from the project automatically",
        "To make the program use more memory on purpose",
        "To replace the Go compiler with a faster one"
      ],
      "answer": 0,
      "explanation": "Define behaviour with interfaces satisfied implicitly."
    },
    {
      "id": "go-assess-q18",
      "kind": "conceptual",
      "topic": "The empty interface and Type Assertions",
      "question": "Which statement best describes The empty interface and Type Assertions?",
      "options": [
        "To make the program use more memory on purpose",
        "hold any value with any and recover its type safely",
        "To replace the Go compiler with a faster one",
        "To store data permanently in a database without code"
      ],
      "answer": 1,
      "explanation": "Hold any value with any and recover its type safely."
    },
    {
      "id": "go-assess-q19",
      "kind": "conceptual",
      "topic": "Project: CLI Calculator",
      "question": "Which statement best describes Project: CLI Calculator?",
      "options": [
        "To replace the Go compiler with a faster one",
        "To store data permanently in a database without code",
        "build a CLI calculator with input, switch and functions",
        "To compile Go directly into a web page with no JavaScript"
      ],
      "answer": 2,
      "explanation": "Build a CLI calculator with input, switch and functions."
    },
    {
      "id": "go-assess-q20",
      "kind": "conceptual",
      "topic": "Project: Todo List",
      "question": "Which statement best describes Project: Todo List?",
      "options": [
        "To store data permanently in a database without code",
        "To compile Go directly into a web page with no JavaScript",
        "To run Go programs without ever compiling them",
        "build a todo list with slices, structs and input"
      ],
      "answer": 3,
      "explanation": "Build a todo list with slices, structs and input."
    },
    {
      "id": "go-assess-q21",
      "kind": "code-reading",
      "topic": "The error Type",
      "question": "What does this code do?",
      "code": "data, err := os.ReadFile(\"a.txt\")\nif err != nil {\n    return err\n}",
      "options": [
        "It demonstrates a different Go pattern",
        "It demonstrates The error Type",
        "It is invalid Go that cannot compile",
        "It only works on Linux"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for The error Type: handle failures by returning and checking error values."
    },
    {
      "id": "go-assess-q22",
      "kind": "code-reading",
      "topic": "Custom Errors and Wrapping",
      "question": "What does this code do?",
      "code": "return fmt.Errorf(\"reading config: %w\", err)",
      "options": [
        "It demonstrates a different Go pattern",
        "It is invalid Go that cannot compile",
        "It demonstrates Custom Errors and Wrapping",
        "It only works on Linux"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for Custom Errors and Wrapping: create custom errors and wrap them with context."
    },
    {
      "id": "go-assess-q23",
      "kind": "code-reading",
      "topic": "Creating Packages",
      "question": "What does this code do?",
      "code": "package mathutil\n\nfunc Double(n int) int {\n    return n * 2\n}",
      "options": [
        "It demonstrates a different Go pattern",
        "It is invalid Go that cannot compile",
        "It only works on Linux",
        "It demonstrates Creating Packages"
      ],
      "answer": 3,
      "explanation": "The snippet is the syntax for Creating Packages: organise code into packages with exported and private names."
    },
    {
      "id": "go-assess-q24",
      "kind": "code-reading",
      "topic": "Importing and Using Packages",
      "question": "What does this code do?",
      "code": "import (\n    \"fmt\"\n    \"strings\"\n)",
      "options": [
        "It demonstrates Importing and Using Packages",
        "It demonstrates a different Go pattern",
        "It is invalid Go that cannot compile",
        "It only works on Linux"
      ],
      "answer": 0,
      "explanation": "The snippet is the syntax for Importing and Using Packages: import standard and third-party packages and use their exported names."
    },
    {
      "id": "go-assess-q25",
      "kind": "code-reading",
      "topic": "Pointer Basics",
      "question": "What does this code do?",
      "code": "x := 5\np := &x\n*p = 10",
      "options": [
        "It demonstrates a different Go pattern",
        "It demonstrates Pointer Basics",
        "It is invalid Go that cannot compile",
        "It only works on Linux"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for Pointer Basics: refer to values by address with pointers."
    },
    {
      "id": "go-assess-q26",
      "kind": "code-reading",
      "topic": "Pointers and Functions",
      "question": "What does this code do?",
      "code": "func increment(n *int) {\n    *n++\n}",
      "options": [
        "It demonstrates a different Go pattern",
        "It is invalid Go that cannot compile",
        "It demonstrates Pointers and Functions",
        "It only works on Linux"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for Pointers and Functions: let functions modify caller data through pointers."
    },
    {
      "id": "go-assess-q27",
      "kind": "code-reading",
      "topic": "Generic Functions",
      "question": "What does this code do?",
      "code": "func first[T any](s []T) T {\n    return s[0]\n}",
      "options": [
        "It demonstrates a different Go pattern",
        "It is invalid Go that cannot compile",
        "It only works on Linux",
        "It demonstrates Generic Functions"
      ],
      "answer": 3,
      "explanation": "The snippet is the syntax for Generic Functions: write one function that works for many types with generics."
    },
    {
      "id": "go-assess-q28",
      "kind": "code-reading",
      "topic": "Generic Types and Constraints",
      "question": "What does this code do?",
      "code": "type Stack[T any] struct {\n    items []T\n}",
      "options": [
        "It demonstrates Generic Types and Constraints",
        "It demonstrates a different Go pattern",
        "It is invalid Go that cannot compile",
        "It only works on Linux"
      ],
      "answer": 0,
      "explanation": "The snippet is the syntax for Generic Types and Constraints: make types generic and restrict them with constraints."
    },
    {
      "id": "go-assess-q29",
      "kind": "code-reading",
      "topic": "Writing Tests with go test",
      "question": "What does this code do?",
      "code": "func TestAdd(t *testing.T) {\n    if got := Add(2, 3); got != 5 {\n        t.Errorf(\"got %d, want 5\", got)\n    }\n}",
      "options": [
        "It demonstrates a different Go pattern",
        "It demonstrates Writing Tests with go test",
        "It is invalid Go that cannot compile",
        "It only works on Linux"
      ],
      "answer": 1,
      "explanation": "The snippet is the syntax for Writing Tests with go test: write unit tests with the testing package and go test."
    },
    {
      "id": "go-assess-q30",
      "kind": "code-reading",
      "topic": "Table-Driven Tests",
      "question": "What does this code do?",
      "code": "tests := []struct{ a, b, want int }{{1, 2, 3}, {2, 3, 5}}\nfor _, tc := range tests {\n    if got := Add(tc.a, tc.b); got != tc.want {\n        t.Errorf(\"got %d\", got)\n    }\n}",
      "options": [
        "It demonstrates a different Go pattern",
        "It is invalid Go that cannot compile",
        "It demonstrates Table-Driven Tests",
        "It only works on Linux"
      ],
      "answer": 2,
      "explanation": "The snippet is the syntax for Table-Driven Tests: cover many cases with table-driven tests."
    },
    {
      "id": "go-assess-q31",
      "kind": "debugging",
      "topic": "HTTP Servers with net/http",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
      "options": [
        "The program imports the wrong package",
        "The program is missing a go.mod file",
        "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one.",
        "The program uses too much memory"
      ],
      "answer": 2,
      "explanation": "The main function is missing its closing brace, so the program does not compile."
    },
    {
      "id": "go-assess-q32",
      "kind": "debugging",
      "topic": "HTTP Clients and JSON",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
      "options": [
        "The program imports the wrong package",
        "The program is missing a go.mod file",
        "The program uses too much memory",
        "Read the operator carefully: a single wrong character changes the whole result."
      ],
      "answer": 3,
      "explanation": "The program subtracts where it should add, so it prints -10 instead of the sum 30."
    },
    {
      "id": "go-assess-q33",
      "kind": "debugging",
      "topic": "Project: REST API for Tasks",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
      "options": [
        "Comparison uses ==; a single = is assignment and is not allowed as a condition.",
        "The program imports the wrong package",
        "The program is missing a go.mod file",
        "The program uses too much memory"
      ],
      "answer": 0,
      "explanation": "A single = assigns instead of comparing, which is a compile error in an if condition."
    },
    {
      "id": "go-assess-q34",
      "kind": "debugging",
      "topic": "Project: File Server",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
      "options": [
        "The program imports the wrong package",
        "Go checks types at compile time: a string is not a number, even when it looks like one.",
        "The program is missing a go.mod file",
        "The program uses too much memory"
      ],
      "answer": 1,
      "explanation": "A string literal is assigned to an int variable, which the compiler rejects."
    },
    {
      "id": "go-assess-q35",
      "kind": "debugging",
      "topic": "Goroutines",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(5 / 2)\n}",
      "options": [
        "The program imports the wrong package",
        "The program is missing a go.mod file",
        "Use floating-point literals when you need a fractional result; integer division discards the remainder.",
        "The program uses too much memory"
      ],
      "answer": 2,
      "explanation": "Integer division truncates, so 5 / 2 is 2, not 2.5."
    },
    {
      "id": "go-assess-q36",
      "kind": "debugging",
      "topic": "Channels Basics",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}",
      "options": [
        "The program imports the wrong package",
        "The program is missing a go.mod file",
        "The program uses too much memory",
        "Check the loop bounds: start, condition and step together decide exactly which values appear."
      ],
      "answer": 3,
      "explanation": "The loop starts at 0 and stops before 3, printing 0, 1 and 2 instead of 1, 2 and 3."
    },
    {
      "id": "go-assess-q37",
      "kind": "debugging",
      "topic": "Mutexes",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"hi\")\n",
      "options": [
        "Every opening brace needs a closing brace; gofmt and the compiler both point at the missing one.",
        "The program imports the wrong package",
        "The program is missing a go.mod file",
        "The program uses too much memory"
      ],
      "answer": 0,
      "explanation": "The main function is missing its closing brace, so the program does not compile."
    },
    {
      "id": "go-assess-q38",
      "kind": "debugging",
      "topic": "WaitGroups and sync.Once",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(10 - 20)\n}",
      "options": [
        "The program imports the wrong package",
        "Read the operator carefully: a single wrong character changes the whole result.",
        "The program is missing a go.mod file",
        "The program uses too much memory"
      ],
      "answer": 1,
      "explanation": "The program subtracts where it should add, so it prints -10 instead of the sum 30."
    },
    {
      "id": "go-assess-q39",
      "kind": "debugging",
      "topic": "Worker Pools",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 5\n    if x = 5 {\n        fmt.Println(\"five\")\n    }\n}",
      "options": [
        "The program imports the wrong package",
        "The program is missing a go.mod file",
        "Comparison uses ==; a single = is assignment and is not allowed as a condition.",
        "The program uses too much memory"
      ],
      "answer": 2,
      "explanation": "A single = assigns instead of comparing, which is a compile error in an if condition."
    },
    {
      "id": "go-assess-q40",
      "kind": "debugging",
      "topic": "Fan-Out and Fan-In",
      "question": "What is wrong with this program?",
      "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int = \"42\"\n    fmt.Println(n)\n}",
      "options": [
        "The program imports the wrong package",
        "The program is missing a go.mod file",
        "The program uses too much memory",
        "Go checks types at compile time: a string is not a number, even when it looks like one."
      ],
      "answer": 3,
      "explanation": "A string literal is assigned to an int variable, which the compiler rejects."
    }
  ],
  "programmingExercises": [
    {
      "id": "go-assess-ex1",
      "title": "Double It",
      "type": "build-program",
      "instructions": "Read one integer and print twice its value.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * 2)\n}",
      "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer, and prints it.",
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
          "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
        }
      ]
    },
    {
      "id": "go-assess-ex2",
      "title": "Add Two Numbers",
      "type": "build-program",
      "instructions": "Read two integers separated by a space and print their sum.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var a, b int\n    fmt.Scan(&a, &b)\n    fmt.Println(a + b)\n}",
      "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer, and prints it.",
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
          "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
        }
      ]
    },
    {
      "id": "go-assess-ex3",
      "title": "Greet by Name",
      "type": "build-program",
      "instructions": "Read a name and print 'Hello, NAME!'.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var name string\n    fmt.Scan(&name)\n    fmt.Printf(\"Hello, %s!\\n\", name)\n}",
      "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer, and prints it.",
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
          "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
        }
      ]
    },
    {
      "id": "go-assess-ex4",
      "title": "Square It",
      "type": "build-program",
      "instructions": "Read one integer and print its square.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    fmt.Println(n * n)\n}",
      "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer, and prints it.",
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
          "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
        }
      ]
    },
    {
      "id": "go-assess-ex5",
      "title": "Even or Odd",
      "type": "build-program",
      "instructions": "Read one integer and print 'even' or 'odd'.",
      "starterCode": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Read from stdin and print the answer.\n}",
      "solution": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var n int\n    fmt.Scan(&n)\n    if n%2 == 0 {\n        fmt.Println(\"even\")\n    } else {\n        fmt.Println(\"odd\")\n    }\n}",
      "solutionExplanation": "The solution reads input with fmt.Scan, computes the answer, and prints it.",
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
          "content": "Declare variables with var, read them with fmt.Scan, compute the answer, and print it with fmt.Println."
        },
        {
          "level": 3,
          "title": "Pseudocode",
          "content": "var n int; fmt.Scan(&n); result := n * 2 (or the operation for this task); fmt.Println(result). For two numbers, scan two variables."
        },
        {
          "level": 4,
          "title": "Debugging",
          "content": "If the program prints 0, check that you passed pointers to Scan — fmt.Scan(&n), not fmt.Scan(n). If the output is wrong, check the operator."
        },
        {
          "level": 5,
          "title": "Full solution",
          "content": "See the solution code: it declares the variables, reads them with fmt.Scan, computes the answer, and prints it with fmt.Println."
        }
      ]
    }
  ],
  "capstone": {
    "title": "Task Manager REST API",
    "description": "Build a complete task manager REST API in Go: CRUD endpoints for tasks, JSON request and response bodies, middleware for logging and recovery, graceful shutdown with context, and tests for every handler.",
    "requirements": [
      "Implement list, create, get, update and delete endpoints for tasks",
      "Store tasks safely for concurrent access using a mutex or channels",
      "Validate request bodies and return the correct HTTP status codes",
      "Add logging and recovery middleware to the handler chain",
      "Persist tasks to a JSON file so they survive a restart",
      "Write table-driven tests for the handlers with at least 80 percent coverage"
    ],
    "rubric": [
      "All five endpoints work end to end with correct status codes",
      "Concurrent requests are handled safely with no data races",
      "Errors are returned as values and mapped to clear HTTP responses",
      "Middleware is reusable and handlers stay focused on one endpoint",
      "Tests cover the handlers and pass with go test"
    ]
  }
};
