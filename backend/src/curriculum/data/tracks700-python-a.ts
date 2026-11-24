import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
  {
    "id": "python-first-steps",
    "slug": "python-first-steps",
    "language": "python",
    "category": "languages",
    "title": "Python Setup & First Program",
    "description": "Install Python, run your first program, and learn print() and input() with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "Installing Python",
      "Running Python code",
      "The print() function",
      "Comments",
      "Reading input",
      "The Python REPL",
      "Python files",
      "Debugging a first program"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to switch on a new kitchen appliance: once you know where the button is, you can start cooking.",
    "modules": [
      {
        "id": "python-first-steps-m1",
        "title": "Python Setup & First Program Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-first-steps-m1-l1",
            "slug": "python-first-steps-m1-l1",
            "title": "Installing Python and Checking the Version",
            "concept": "Python is a programming language you install once on your computer, and the python3 --version command shows which version is installed. The version matters because newer features only exist in newer releases, so checking it first avoids confusing errors later.",
            "syntax": "python3 --version",
            "exampleCode": "print(\"Hello from Python!\")\nprint(\"Python is ready to run your code.\")",
            "exampleLanguage": "python",
            "mistake": "Typing python instead of python3 on a system where python still points to Python 2 or to nothing at all.",
            "bug": {
              "prompt": "Find the bug: this program should print a greeting, but nothing appears.",
              "buggyCode": "# print(\"Hello!\")",
              "fixedCode": "print(\"Hello!\")",
              "explanation": "A line starting with # is a comment, so Python ignores it and prints nothing."
            },
            "exercise": {
              "title": "Practise Installing Python and Checking the Version",
              "type": "write-code",
              "instructions": "Print exactly this line: Hello, CodeForge!",
              "starterCode": "# TODO: write this line",
              "solution": "print(\"Hello, CodeForge!\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print a greeting",
                  "stdin": "",
                  "expectedStdout": "Hello, CodeForge!\n",
                  "hidden": false
                },
                {
                  "name": "Print a greeting again",
                  "stdin": "",
                  "expectedStdout": "Hello, CodeForge!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Installing Python and Checking the Version is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-first-steps-m1-l2",
            "slug": "python-first-steps-m1-l2",
            "title": "Your First print() Program",
            "concept": "The print() function displays text or values on the screen, and it adds a newline after each call. You pass the value to display inside the parentheses, and strings go in quotes.",
            "syntax": "print(\"Hello, World!\")",
            "exampleCode": "name = \"Ada\"\nprint(\"Hello,\", name)",
            "exampleLanguage": "python",
            "mistake": "Forgetting the quotes around a string, so Python treats the text as a variable name and raises NameError.",
            "bug": {
              "prompt": "Find the bug: this program should print Hello, Ada but it crashes.",
              "buggyCode": "name = \"Ada\"\nprint(\"Hello,\", Ada)",
              "fixedCode": "name = \"Ada\"\nprint(\"Hello,\", name)",
              "explanation": "Ada without quotes is read as a variable name, but no variable called Ada exists; you must use the variable name instead."
            },
            "exercise": {
              "title": "Practise Your First print() Program",
              "type": "write-code",
              "instructions": "Read a name from input, then print Hello, <name>! with the name you read.",
              "starterCode": "name = input()\n# TODO: write this line",
              "solution": "name = input()\nprint(\"Hello, \" + name + \"!\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Greet Ada",
                  "stdin": "Ada\n",
                  "expectedStdout": "Hello, Ada!\n",
                  "hidden": false
                },
                {
                  "name": "Greet Grace",
                  "stdin": "Grace\n",
                  "expectedStdout": "Hello, Grace!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Your First print() Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-first-steps-m1-l3",
            "slug": "python-first-steps-m1-l3",
            "title": "What print() Does",
            "concept": "print() sends its arguments to standard output, converting each one to text and separating them with a space by default. It is the simplest way to see what a program computed, which makes it the first debugging tool most programmers reach for.",
            "syntax": "print(value1, value2)",
            "exampleCode": "print(\"The answer is\", 42)",
            "exampleLanguage": "python",
            "mistake": "Expecting print() to return the value it displays, when it actually returns None.",
            "bug": {
              "prompt": "Find the bug: this program should store the printed text, but result is None.",
              "buggyCode": "result = print(\"done\")\nprint(result)",
              "fixedCode": "result = \"done\"\nprint(result)",
              "explanation": "print() displays text but returns None, so assigning its result stores None instead of the text."
            },
            "exercise": {
              "title": "Check your understanding: What print() Does",
              "type": "multiple-choice",
              "instructions": "Which statement about print() is correct?",
              "starterCode": "",
              "solution": "print() displays values on the screen and adds a newline at the end.",
              "solutionExplanation": "print() displays values on the screen and adds a newline at the end. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "print() displays values on the screen and adds a newline at the end.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of What print() Does from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "print() returns the value it displays, so it can be stored in a variable.",
                "print() can only display numbers, never text.",
                "print() displays values on the screen and adds a newline at the end.",
                "print() writes its output to a file by default."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-first-steps-m1-l4",
            "slug": "python-first-steps-m1-l4",
            "title": "Writing Comments",
            "concept": "A comment starts with # and Python ignores everything after it on that line, so comments explain code to humans without changing what runs. Good comments explain why the code does something, not what each line literally does.",
            "syntax": "# this is a comment",
            "exampleCode": "# Greet the user\nprint(\"Welcome!\")  # shown when the program starts",
            "exampleLanguage": "python",
            "mistake": "Writing comments that just repeat the code instead of explaining the reason behind it.",
            "bug": {
              "prompt": "Find the bug: this program should print Hello! but it is a syntax error.",
              "buggyCode": "// Say hello\nprint(\"Hello!\")",
              "fixedCode": "# Say hello\nprint(\"Hello!\")",
              "explanation": "Python comments start with #, not //; // is the floor-division operator, so the line is a syntax error."
            },
            "exercise": {
              "title": "Practise Writing Comments",
              "type": "write-code",
              "instructions": "Write a program with a comment on its own line, then print exactly: Comments help readers.",
              "starterCode": "# Comments explain code to humans\n# TODO: write this line",
              "solution": "# Comments explain code to humans\nprint(\"Comments help readers.\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print with a comment",
                  "stdin": "",
                  "expectedStdout": "Comments help readers.\n",
                  "hidden": false
                },
                {
                  "name": "Print with a comment again",
                  "stdin": "",
                  "expectedStdout": "Comments help readers.\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Writing Comments is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-first-steps-m1-l5",
            "slug": "python-first-steps-m1-l5",
            "title": "Running Python from the Command Line",
            "concept": "You run a saved program with python3 file.py, and Python executes the file from top to bottom. If the file has an error, Python stops and prints a traceback naming the line where it failed.",
            "syntax": "python3 hello.py",
            "exampleCode": "# hello.py\nprint(\"Hello from a file!\")",
            "exampleLanguage": "python",
            "mistake": "Running python3 on a file in the wrong folder, so Python reports that it cannot open the file.",
            "bug": {
              "prompt": "Find the bug: this program should print Hello! but it is a syntax error.",
              "buggyCode": "print \"Hello!\"",
              "fixedCode": "print(\"Hello!\")",
              "explanation": "In Python 3, print is a function and needs parentheses; print without them is a syntax error."
            },
            "exercise": {
              "title": "Check your understanding: Running Python from the Command Line",
              "type": "multiple-choice",
              "instructions": "Which statement about running a Python file is correct?",
              "starterCode": "",
              "solution": "python3 hello.py runs the file from top to bottom.",
              "solutionExplanation": "python3 hello.py runs the file from top to bottom. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "python3 hello.py runs the file from top to bottom.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Running Python from the Command Line from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "python3 hello.py runs the file from top to bottom.",
                "You must compile a .py file into a binary before you can run it.",
                "python3 hello.py only runs the first line of the file.",
                "A Python file can only be run from inside a code editor."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-first-steps-m2",
        "title": "Python Setup & First Program in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-first-steps-m2-l1",
            "slug": "python-first-steps-m2-l1",
            "title": "Reading Input with input()",
            "concept": "input() pauses the program, reads a line the user types, and returns it as a string. Because the result is always a string, you must convert it with int() or float() before doing arithmetic with it.",
            "syntax": "name = input(\"What is your name? \")",
            "exampleCode": "name = input()\nprint(\"Nice to meet you,\", name)",
            "exampleLanguage": "python",
            "mistake": "Forgetting that input() returns a string, so adding two inputs joins them instead of adding the numbers.",
            "bug": {
              "prompt": "Find the bug: entering 4 and 5 should print 9, but it prints 45.",
              "buggyCode": "a = input()\nb = input()\nprint(a + b)",
              "fixedCode": "a = int(input())\nb = int(input())\nprint(a + b)",
              "explanation": "input() returns strings, so + joins them; converting each input with int() first makes + add the numbers."
            },
            "exercise": {
              "title": "Practise Reading Input with input()",
              "type": "write-code",
              "instructions": "Read a name and an age from input, then print: <name> is <age> years old.",
              "starterCode": "name = input()\nage = input()\n# TODO: write this line",
              "solution": "name = input()\nage = input()\nprint(name + \" is \" + age + \" years old.\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada, 30",
                  "stdin": "Ada\n30\n",
                  "expectedStdout": "Ada is 30 years old.\n",
                  "hidden": false
                },
                {
                  "name": "Grace, 25",
                  "stdin": "Grace\n25\n",
                  "expectedStdout": "Grace is 25 years old.\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Reading Input with input() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-first-steps-m2-l2",
            "slug": "python-first-steps-m2-l2",
            "title": "Printing with sep and end",
            "concept": "print() separates multiple values with a space and ends with a newline, but you can change both with the sep and end keyword arguments. sep controls what goes between values and end controls what goes after the last one.",
            "syntax": "print(\"a\", \"b\", sep=\"-\", end=\"!\")",
            "exampleCode": "print(\"2026\", \"11\", \"24\", sep=\"-\")",
            "exampleLanguage": "python",
            "mistake": "Passing sep and end as positional arguments instead of keyword arguments, which changes the values being printed.",
            "bug": {
              "prompt": "Find the bug: this should print 1-2-3 but it prints 1 2 3 -.",
              "buggyCode": "print(\"1\", \"2\", \"3\", \"-\")",
              "fixedCode": "print(\"1\", \"2\", \"3\", sep=\"-\")",
              "explanation": "The string \"-\" was passed as a fourth value to print instead of as the sep keyword argument, so it was printed as a value."
            },
            "exercise": {
              "title": "Practise Printing with sep and end",
              "type": "write-code",
              "instructions": "Print the date 24/11/2026 using a single print() call with sep=\"/\".",
              "starterCode": "# TODO: write this line",
              "solution": "print(\"24\", \"11\", \"2026\", sep=\"/\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print a date",
                  "stdin": "",
                  "expectedStdout": "24/11/2026\n",
                  "hidden": false
                },
                {
                  "name": "Print a date again",
                  "stdin": "",
                  "expectedStdout": "24/11/2026\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Printing with sep and end is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-first-steps-m2-l3",
            "slug": "python-first-steps-m2-l3",
            "title": "The Python REPL",
            "concept": "The REPL is the interactive Python prompt you get by typing python3 with no file, and it runs each line as soon as you press Enter. It is ideal for trying out small expressions and checking how a function behaves before writing a full program.",
            "syntax": "python3  # start the REPL",
            "exampleCode": "print(2 + 3)",
            "exampleLanguage": "python",
            "mistake": "Typing multi-line code such as a function definition into the REPL without the blank line that ends the block.",
            "bug": {
              "prompt": "Find the bug: this line works when typed at the REPL prompt, but pasting it into a file is a syntax error.",
              "buggyCode": ">>> print(\"hi\")",
              "fixedCode": "print(\"hi\")",
              "explanation": "The >>> is the REPL prompt, not part of the code; pasting it makes Python try to run it as code."
            },
            "exercise": {
              "title": "Check your understanding: The Python REPL",
              "type": "multiple-choice",
              "instructions": "Which statement about the Python REPL is correct?",
              "starterCode": "",
              "solution": "The REPL runs each line immediately, so it is good for quick experiments.",
              "solutionExplanation": "The REPL runs each line immediately, so it is good for quick experiments. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The REPL runs each line immediately, so it is good for quick experiments.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of The Python REPL from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "The REPL can only run complete programs saved in files.",
                "Code typed in the REPL is automatically saved to a file.",
                "The REPL compiles code to machine code before running it.",
                "The REPL runs each line immediately, so it is good for quick experiments."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-first-steps-m2-l4",
            "slug": "python-first-steps-m2-l4",
            "title": "Escape Characters and Newlines",
            "concept": "Escape sequences such as \\n for a newline and \\t for a tab let a string contain characters that are hard to type directly. A backslash before a quote lets the quote appear inside a string delimited by the same kind of quote.",
            "syntax": "print(\"Line one\\nLine two\")",
            "exampleCode": "print(\"Name:\\tAda\")",
            "exampleLanguage": "python",
            "mistake": "Writing a Windows path like \"C:\\new\\test.py\" and being surprised when \\n and \\t become a newline and a tab.",
            "bug": {
              "prompt": "Find the bug: this should print She said \"hi\" but it crashes.",
              "buggyCode": "print(\"She said \"hi\"\")",
              "fixedCode": "print('She said \"hi\"')",
              "explanation": "The inner double quotes end the string early; using single quotes for the outer string lets the double quotes appear inside it."
            },
            "exercise": {
              "title": "Practise Escape Characters and Newlines",
              "type": "write-code",
              "instructions": "Print a two-line address: the first line Ada Lovelace and the second line 12 Analytical Way, using \\n inside one string.",
              "starterCode": "# TODO: write this line",
              "solution": "print(\"Ada Lovelace\\n12 Analytical Way\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print an address",
                  "stdin": "",
                  "expectedStdout": "Ada Lovelace\n12 Analytical Way\n",
                  "hidden": false
                },
                {
                  "name": "Print an address again",
                  "stdin": "",
                  "expectedStdout": "Ada Lovelace\n12 Analytical Way\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Escape Characters and Newlines is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-first-steps-m2-l5",
            "slug": "python-first-steps-m2-l5",
            "title": "Your First Multi-line Program",
            "concept": "A real program is a sequence of statements that run in order, each building on the values stored by the ones before it. Variables let later lines reuse earlier results, so a program can read input, transform it, and print a summary.",
            "syntax": "name = input()\nprint(name)",
            "exampleCode": "city = \"London\"\nprint(\"I live in\", city)",
            "exampleLanguage": "python",
            "mistake": "Using a variable before assigning it, which raises NameError because the name does not exist yet.",
            "bug": {
              "prompt": "Find the bug: this should print the total but it crashes.",
              "buggyCode": "print(total)\ntotal = 4 + 5",
              "fixedCode": "total = 4 + 5\nprint(total)",
              "explanation": "Statements run top to bottom, so total must be assigned before the print statement that uses it."
            },
            "exercise": {
              "title": "Practise Your First Multi-line Program",
              "type": "write-code",
              "instructions": "Read a name and a city from input, then print: <name> lives in <city>.",
              "starterCode": "name = input()\ncity = input()\n# TODO: write this line",
              "solution": "name = input()\ncity = input()\nprint(name + \" lives in \" + city + \".\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada in London",
                  "stdin": "Ada\nLondon\n",
                  "expectedStdout": "Ada lives in London.\n",
                  "hidden": false
                },
                {
                  "name": "Grace in Paris",
                  "stdin": "Grace\nParis\n",
                  "expectedStdout": "Grace lives in Paris.\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Your First Multi-line Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Python Setup & First Program Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a name, a favourite colour, and a lucky number, then prints two sentences: \"<name>'s favourite colour is <colour>.\" and \"<name>'s lucky number is <number>.\"",
      "starterCode": "name = input()\ncolour = input()\nnumber = input()\n# TODO: write this line\n# TODO: write this line",
      "solution": "name = input()\ncolour = input()\nnumber = input()\nprint(name + \"'s favourite colour is \" + colour + \".\")\nprint(name + \"'s lucky number is \" + number + \".\")",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Ada, blue, 7",
          "stdin": "Ada\nblue\n7\n",
          "expectedStdout": "Ada's favourite colour is blue.\nAda's lucky number is 7.\n",
          "hidden": false
        },
        {
          "name": "Grace, red, 3",
          "stdin": "Grace\nred\n3\n",
          "expectedStdout": "Grace's favourite colour is red.\nGrace's lucky number is 3.\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Python Setup & First Program Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Python Setup & First Program Capstone Project",
      "description": "A small end-to-end Python program that puts Python Setup & First Program into practice.",
      "requirements": [
        "Use the core ideas of Python Setup & First Program in a working Python program.",
        "Apply at least three of these skills: Installing Python, Running Python code, The print() function, Comments.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Python Setup & First Program correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-variables-types",
    "slug": "python-variables-types",
    "language": "python",
    "category": "languages",
    "title": "Variables & Data Types",
    "description": "Learn variables, assignment, and Python's core types \u2014 int, float, str, and bool \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "Variables",
      "Assignment",
      "Dynamic typing",
      "int",
      "float",
      "str",
      "bool",
      "type()"
    ],
    "prerequisites": [
      "python-first-steps"
    ],
    "analogy": "Learning {topic} is like labelling boxes before a move: once every box has a clear name, you always know where everything is.",
    "modules": [
      {
        "id": "python-variables-types-m1",
        "title": "Variables & Data Types Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-variables-types-m1-l1",
            "slug": "python-variables-types-m1-l1",
            "title": "What Is a Variable",
            "concept": "A variable is a name that refers to a value stored in memory, and assignment with = binds the name to the value. Once assigned, you can use the name anywhere the value is needed, and the program reads the current value each time.",
            "syntax": "age = 30  # an int",
            "exampleCode": "name = \"Ada\"\nprint(name)",
            "exampleLanguage": "python",
            "mistake": "Using a variable name with a typo, which creates a new name or raises NameError instead of using the intended variable.",
            "bug": {
              "prompt": "Find the bug: this should print 30 but it crashes.",
              "buggyCode": "age = 30\nprint(ag)",
              "fixedCode": "age = 30\nprint(age)",
              "explanation": "ag is a different name from age, and no variable called ag exists; the name must match exactly."
            },
            "exercise": {
              "title": "Practise What Is a Variable",
              "type": "write-code",
              "instructions": "Assign the number 42 to a variable called answer, then print it.",
              "starterCode": "answer = 42\n# TODO: write this line",
              "solution": "answer = 42\nprint(answer)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print 42",
                  "stdin": "",
                  "expectedStdout": "42\n",
                  "hidden": false
                },
                {
                  "name": "Print 42 again",
                  "stdin": "",
                  "expectedStdout": "42\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "What Is a Variable is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-variables-types-m1-l2",
            "slug": "python-variables-types-m1-l2",
            "title": "Assigning and Reassigning Variables",
            "concept": "Assignment stores a value under a name, and assigning again replaces the old value with the new one. The variable always holds the most recent value, so earlier values are lost unless you saved them elsewhere.",
            "syntax": "score = 0\nscore = 10",
            "exampleCode": "count = 1\ncount = count + 1\nprint(count)",
            "exampleLanguage": "python",
            "mistake": "Assuming a variable keeps its old value after you assign a new one to it.",
            "bug": {
              "prompt": "Find the bug: this should print 10 but it prints 0.",
              "buggyCode": "score = 0\nscore + 10\nprint(score)",
              "fixedCode": "score = 0\nscore = score + 10\nprint(score)",
              "explanation": "score + 10 computes a value but does not store it; you must assign the result back to score."
            },
            "exercise": {
              "title": "Practise Assigning and Reassigning Variables",
              "type": "write-code",
              "instructions": "Read a number from input, add 5 to it, and print the result.",
              "starterCode": "n = int(input())\nn = n + 5\n# TODO: write this line",
              "solution": "n = int(input())\nn = n + 5\nprint(n)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "10 + 5",
                  "stdin": "10\n",
                  "expectedStdout": "15\n",
                  "hidden": false
                },
                {
                  "name": "3 + 5",
                  "stdin": "3\n",
                  "expectedStdout": "8\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Assigning and Reassigning Variables is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-variables-types-m1-l3",
            "slug": "python-variables-types-m1-l3",
            "title": "Variables and Names",
            "concept": "Variable names can contain letters, digits, and underscores, but they must start with a letter or underscore and cannot be a Python keyword. Descriptive names make code readable, while single letters are fine for short loop counters.",
            "syntax": "user_name = \"Ada\"",
            "exampleCode": "user_name = \"Ada\"\nuser_age = 30\nprint(user_name, user_age)",
            "exampleLanguage": "python",
            "mistake": "Using a Python keyword such as class or for as a variable name, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should store a subject name but it is a syntax error.",
              "buggyCode": "class = \"Biology\"\nprint(class)",
              "fixedCode": "subject = \"Biology\"\nprint(subject)",
              "explanation": "class is a Python keyword and cannot be used as a variable name; choose a different name such as subject."
            },
            "exercise": {
              "title": "Check your understanding: Variables and Names",
              "type": "multiple-choice",
              "instructions": "Which statement about variables in Python is correct?",
              "starterCode": "",
              "solution": "A variable is a name bound to a value, and assigning again replaces the old value.",
              "solutionExplanation": "A variable is a name bound to a value, and assigning again replaces the old value. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A variable is a name bound to a value, and assigning again replaces the old value.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Variables and Names from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A variable can only hold one value forever and can never be reassigned.",
                "Variable names must start with a number.",
                "A variable is a name bound to a value, and assigning again replaces the old value.",
                "Assigning to a variable prints its value automatically."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-variables-types-m1-l4",
            "slug": "python-variables-types-m1-l4",
            "title": "Integers and Floats",
            "concept": "Python has two main number types: int for whole numbers and float for numbers with a decimal point. Arithmetic on two ints usually gives an int, but division with / always gives a float, even when the result is whole.",
            "syntax": "whole = 7\npi = 3.14",
            "exampleCode": "a = 7\nb = 2\nprint(a / b)",
            "exampleLanguage": "python",
            "mistake": "Expecting 7 / 2 to give 3, when / always produces a float result of 3.5.",
            "bug": {
              "prompt": "Find the bug: this should print 3.5 but it prints 3.",
              "buggyCode": "a = 7\nb = 2\nprint(a // b)",
              "fixedCode": "a = 7\nb = 2\nprint(a / b)",
              "explanation": "// is floor division and drops the remainder, giving 3; plain / gives the exact result 3.5."
            },
            "exercise": {
              "title": "Practise Integers and Floats",
              "type": "write-code",
              "instructions": "Read two numbers from input and print their sum as a float.",
              "starterCode": "a = int(input())\nb = int(input())\n# TODO: write this line",
              "solution": "a = int(input())\nb = int(input())\nprint(float(a + b))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "2 + 3",
                  "stdin": "2\n3\n",
                  "expectedStdout": "5.0\n",
                  "hidden": false
                },
                {
                  "name": "10 + 4",
                  "stdin": "10\n4\n",
                  "expectedStdout": "14.0\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Integers and Floats is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-variables-types-m1-l5",
            "slug": "python-variables-types-m1-l5",
            "title": "Dynamic Typing",
            "concept": "Python is dynamically typed, which means a variable's type is decided by the value it currently holds, not by a declaration. The same name can refer to an int in one line and a string in the next, and type() tells you what a value is right now.",
            "syntax": "x = 5\nx = \"five\"",
            "exampleCode": "x = 5\nprint(type(x))\nx = \"five\"\nprint(type(x))",
            "exampleLanguage": "python",
            "mistake": "Assuming a variable keeps the type it had when first assigned, and passing it to code that expects the old type.",
            "bug": {
              "prompt": "Find the bug: this should print the length 4 but it crashes.",
              "buggyCode": "word = 1234\nprint(len(word))",
              "fixedCode": "word = \"1234\"\nprint(len(word))",
              "explanation": "len() works on strings, not on numbers; the value must be a string for len() to count its characters."
            },
            "exercise": {
              "title": "Check your understanding: Dynamic Typing",
              "type": "multiple-choice",
              "instructions": "Which statement about Python's typing is correct?",
              "starterCode": "",
              "solution": "A variable can hold a number now and a string later, because Python types values, not names.",
              "solutionExplanation": "A variable can hold a number now and a string later, because Python types values, not names. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A variable can hold a number now and a string later, because Python types values, not names.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Dynamic Typing from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A variable can hold a number now and a string later, because Python types values, not names.",
                "You must declare a variable's type before using it, as in Java.",
                "Once a variable holds a number it can never hold a string.",
                "Python checks all types before the program runs and rejects mismatches."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-variables-types-m2",
        "title": "Variables & Data Types in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-variables-types-m2-l1",
            "slug": "python-variables-types-m2-l1",
            "title": "The type() Function",
            "concept": "type() returns the type of any value, such as int, float, str, or bool. It is useful when debugging, because it shows what kind of value a variable actually holds at that point in the program.",
            "syntax": "type(42)  # <class 'int'>",
            "exampleCode": "print(type(42))\nprint(type(3.5))\nprint(type(\"hi\"))",
            "exampleLanguage": "python",
            "mistake": "Comparing types with == on the type object instead of using isinstance() when checking for subclasses.",
            "bug": {
              "prompt": "Find the bug: this should print True for an int but it prints False.",
              "buggyCode": "x = 5\nprint(type(x) == \"int\")",
              "fixedCode": "x = 5\nprint(type(x) == int)",
              "explanation": "type() returns the type object int, not the string \"int\"; compare it with the type itself, without quotes."
            },
            "exercise": {
              "title": "Practise The type() Function",
              "type": "write-code",
              "instructions": "Read a word from input and print its type.",
              "starterCode": "word = input()\n# TODO: write this line",
              "solution": "word = input()\nprint(type(word))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Type of Ada",
                  "stdin": "Ada\n",
                  "expectedStdout": "<class 'str'>\n",
                  "hidden": false
                },
                {
                  "name": "Type of hello",
                  "stdin": "hello\n",
                  "expectedStdout": "<class 'str'>\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The type() Function is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-variables-types-m2-l2",
            "slug": "python-variables-types-m2-l2",
            "title": "Strings as Data",
            "concept": "A string is a sequence of characters enclosed in single or double quotes, and Python treats text as data you can store, combine, and inspect. Strings are immutable, so operations on a string produce a new string instead of changing the original.",
            "syntax": "greeting = \"Hello\"",
            "exampleCode": "word = \"Python\"\nprint(word)\nprint(len(word))",
            "exampleLanguage": "python",
            "mistake": "Trying to change one character of a string with indexing, which fails because strings are immutable.",
            "bug": {
              "prompt": "Find the bug: this should print Jython but it crashes.",
              "buggyCode": "word = \"Python\"\nword[0] = \"J\"\nprint(word)",
              "fixedCode": "word = \"Python\"\nword = \"J\" + word[1:]\nprint(word)",
              "explanation": "Strings are immutable, so you cannot assign to word[0]; build a new string instead."
            },
            "exercise": {
              "title": "Practise Strings as Data",
              "type": "write-code",
              "instructions": "Read a word from input and print it together with its length, like: Ada has 3 letters.",
              "starterCode": "word = input()\n# TODO: write this line",
              "solution": "word = input()\nprint(word + \" has \" + str(len(word)) + \" letters.\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada",
                  "stdin": "Ada\n",
                  "expectedStdout": "Ada has 3 letters.\n",
                  "hidden": false
                },
                {
                  "name": "Python",
                  "stdin": "Python\n",
                  "expectedStdout": "Python has 6 letters.\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Strings as Data is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-variables-types-m2-l3",
            "slug": "python-variables-types-m2-l3",
            "title": "Booleans and Truth Values",
            "concept": "A bool has only two values, True and False, and every comparison such as ==, <, or > produces one. Booleans drive decisions in programs, and bool() converts other values, with 0, empty strings, and empty collections counting as False.",
            "syntax": "is_ready = True",
            "exampleCode": "print(3 > 2)\nprint(bool(0))\nprint(bool(\"hi\"))",
            "exampleLanguage": "python",
            "mistake": "Writing True and False with a lowercase first letter, which Python reads as undefined variable names.",
            "bug": {
              "prompt": "Find the bug: this should print True but it crashes.",
              "buggyCode": "flag = true\nprint(flag)",
              "fixedCode": "flag = True\nprint(flag)",
              "explanation": "Python spells the boolean values True and False with a capital first letter; lowercase true is an undefined name."
            },
            "exercise": {
              "title": "Check your understanding: Booleans and Truth Values",
              "type": "multiple-choice",
              "instructions": "Which statement about booleans in Python is correct?",
              "starterCode": "",
              "solution": "bool values are True and False, and comparison operators produce them.",
              "solutionExplanation": "bool values are True and False, and comparison operators produce them. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "bool values are True and False, and comparison operators produce them.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Booleans and Truth Values from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "True and False are strings in Python.",
                "Booleans can only be used inside if statements.",
                "The result of 3 > 2 is the number 1, not a boolean.",
                "bool values are True and False, and comparison operators produce them."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-variables-types-m2-l4",
            "slug": "python-variables-types-m2-l4",
            "title": "Naming Variables Well",
            "concept": "Good variable names describe what the value means, use lowercase words joined by underscores, and avoid single letters except for tiny counters. Clear names make code readable without comments, while vague names like x or data force readers to guess.",
            "syntax": "total_price = 19.99",
            "exampleCode": "total_price = 19.99\ntax_rate = 0.2\nprint(total_price * tax_rate)",
            "exampleLanguage": "python",
            "mistake": "Using the letter l or O as a variable name, which look like the digits 1 and 0.",
            "bug": {
              "prompt": "Find the bug: this should print the total but the names are confusing.",
              "buggyCode": "l = 10\nO = 5\nprint(l + O)",
              "fixedCode": "apples = 10\noranges = 5\nprint(apples + oranges)",
              "explanation": "The names l and O are easy to confuse with the digits 1 and 0; descriptive names such as apples and oranges are clearer."
            },
            "exercise": {
              "title": "Practise Naming Variables Well",
              "type": "write-code",
              "instructions": "Read a price and a quantity from input, then print the total cost as a number.",
              "starterCode": "price = float(input())\nquantity = int(input())\n# TODO: write this line",
              "solution": "price = float(input())\nquantity = int(input())\nprint(price * quantity)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "2.5 x 4",
                  "stdin": "2.5\n4\n",
                  "expectedStdout": "10.0\n",
                  "hidden": false
                },
                {
                  "name": "10 x 3",
                  "stdin": "10\n3\n",
                  "expectedStdout": "30.0\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Naming Variables Well is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-variables-types-m2-l5",
            "slug": "python-variables-types-m2-l5",
            "title": "Variables in a Small Program",
            "concept": "A small program combines variables, input, and arithmetic: read values, store them under clear names, compute a result, and print it. Keeping each step in its own line makes the program easy to read and to debug when the output is wrong.",
            "syntax": "name = input()\nage = int(input())",
            "exampleCode": "name = \"Ada\"\nage = 36\nprint(name, \"is\", age, \"years old\")",
            "exampleLanguage": "python",
            "mistake": "Forgetting to convert input before arithmetic, so the program joins strings instead of adding numbers.",
            "bug": {
              "prompt": "Find the bug: entering 20 and 5 should print 25 but it prints 205.",
              "buggyCode": "a = input()\nb = input()\nprint(a + b)",
              "fixedCode": "a = int(input())\nb = int(input())\nprint(a + b)",
              "explanation": "input() returns strings, so + joins them; convert both inputs with int() first."
            },
            "exercise": {
              "title": "Practise Variables in a Small Program",
              "type": "write-code",
              "instructions": "Read a name, an age, and a height in metres from input, then print: <name> is <age> years old and <height> m tall.",
              "starterCode": "name = input()\nage = input()\nheight = input()\n# TODO: write this line",
              "solution": "name = input()\nage = input()\nheight = input()\nprint(name + \" is \" + age + \" years old and \" + height + \" m tall.\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada 36 1.65",
                  "stdin": "Ada\n36\n1.65\n",
                  "expectedStdout": "Ada is 36 years old and 1.65 m tall.\n",
                  "hidden": false
                },
                {
                  "name": "Grace 28 1.7",
                  "stdin": "Grace\n28\n1.7\n",
                  "expectedStdout": "Grace is 28 years old and 1.7 m tall.\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Variables in a Small Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Variables & Data Types Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a name, an age, and a city, then prints three lines: \"Name: <name>\", \"Age: <age>\", and \"City: <city>\".",
      "starterCode": "name = input()\nage = input()\ncity = input()\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line",
      "solution": "name = input()\nage = input()\ncity = input()\nprint(\"Name: \" + name)\nprint(\"Age: \" + age)\nprint(\"City: \" + city)",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Ada 30 London",
          "stdin": "Ada\n30\nLondon\n",
          "expectedStdout": "Name: Ada\nAge: 30\nCity: London\n",
          "hidden": false
        },
        {
          "name": "Grace 25 Paris",
          "stdin": "Grace\n25\nParis\n",
          "expectedStdout": "Name: Grace\nAge: 25\nCity: Paris\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Variables & Data Types Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Variables & Data Types Capstone Project",
      "description": "A small end-to-end Python program that puts Variables & Data Types into practice.",
      "requirements": [
        "Use the core ideas of Variables & Data Types in a working Python program.",
        "Apply at least three of these skills: Variables, Assignment, Dynamic typing, int.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Variables & Data Types correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-numbers-math",
    "slug": "python-numbers-math",
    "language": "python",
    "category": "languages",
    "title": "Numbers & Arithmetic",
    "description": "Master Python arithmetic \u2014 addition, division, modulo, powers, rounding, and conversions \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "Arithmetic operators",
      "Integer division",
      "Modulo",
      "Exponentiation",
      "Operator precedence",
      "Rounding",
      "int()/float() conversion",
      "Math expressions"
    ],
    "prerequisites": [
      "python-variables-types"
    ],
    "analogy": "Learning {topic} is like learning to use a calculator: once the buttons make sense, every sum is just a few presses away.",
    "modules": [
      {
        "id": "python-numbers-math-m1",
        "title": "Numbers & Arithmetic Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-numbers-math-m1-l1",
            "slug": "python-numbers-math-m1-l1",
            "title": "Addition and Subtraction",
            "concept": "+ adds two numbers and - subtracts the second from the first, and both work on ints and floats. When you mix an int with a float, Python converts the int and the result is a float.",
            "syntax": "total = 4 + 5",
            "exampleCode": "print(4 + 5)\nprint(10 - 3)\nprint(2.5 + 1)",
            "exampleLanguage": "python",
            "mistake": "Adding a number to a string, which raises TypeError because + cannot mix the two types.",
            "bug": {
              "prompt": "Find the bug: this should print 15 but it crashes.",
              "buggyCode": "total = 10 + \"5\"\nprint(total)",
              "fixedCode": "total = 10 + 5\nprint(total)",
              "explanation": "You cannot add a string to a number; both operands must be numbers."
            },
            "exercise": {
              "title": "Practise Addition and Subtraction",
              "type": "write-code",
              "instructions": "Read two numbers from input and print their sum.",
              "starterCode": "a = int(input())\nb = int(input())\n# TODO: write this line",
              "solution": "a = int(input())\nb = int(input())\nprint(a + b)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "4 + 5",
                  "stdin": "4\n5\n",
                  "expectedStdout": "9\n",
                  "hidden": false
                },
                {
                  "name": "12 + 8",
                  "stdin": "12\n8\n",
                  "expectedStdout": "20\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Addition and Subtraction is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-numbers-math-m1-l2",
            "slug": "python-numbers-math-m1-l2",
            "title": "Multiplication and Division",
            "concept": "* multiplies two numbers, and / divides them, always returning a float. Division by zero raises ZeroDivisionError, so programs that divide by user input must be ready for a zero.",
            "syntax": "area = 3 * 4",
            "exampleCode": "print(3 * 4)\nprint(10 / 4)\nprint(2.5 * 2)",
            "exampleLanguage": "python",
            "mistake": "Using / when you wanted the whole-number quotient, and getting a float with a decimal part instead.",
            "bug": {
              "prompt": "Find the bug: this should print 3.0 but it prints 2.",
              "buggyCode": "print(6 // 3)",
              "fixedCode": "print(6 / 3)",
              "explanation": "// is floor division and drops the fractional part; / gives the exact quotient 3.0."
            },
            "exercise": {
              "title": "Practise Multiplication and Division",
              "type": "write-code",
              "instructions": "Read a length and a width from input and print the area of the rectangle.",
              "starterCode": "length = float(input())\nwidth = float(input())\n# TODO: write this line",
              "solution": "length = float(input())\nwidth = float(input())\nprint(length * width)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "3 x 4",
                  "stdin": "3\n4\n",
                  "expectedStdout": "12.0\n",
                  "hidden": false
                },
                {
                  "name": "2.5 x 2",
                  "stdin": "2.5\n2\n",
                  "expectedStdout": "5.0\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Multiplication and Division is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-numbers-math-m1-l3",
            "slug": "python-numbers-math-m1-l3",
            "title": "Arithmetic Operators",
            "concept": "Python's arithmetic operators are + for addition, - for subtraction, * for multiplication, / for division, // for floor division, % for the remainder, and ** for powers. Each one follows the same precedence rules as in school mathematics.",
            "syntax": "print(2 + 3 * 4)  # 14",
            "exampleCode": "print(2 + 3 * 4)\nprint(10 % 3)\nprint(2 ** 3)",
            "exampleLanguage": "python",
            "mistake": "Forgetting that * and / run before + and -, so 2 + 3 * 4 is 14, not 20.",
            "bug": {
              "prompt": "Find the bug: this should print 20 but it prints 14.",
              "buggyCode": "print(2 + 3 * 4)",
              "fixedCode": "print((2 + 3) * 4)",
              "explanation": "Multiplication runs before addition, so 2 + 3 * 4 is 14; parentheses force the addition first, giving 20."
            },
            "exercise": {
              "title": "Check your understanding: Arithmetic Operators",
              "type": "multiple-choice",
              "instructions": "Which statement about arithmetic operators is correct?",
              "starterCode": "",
              "solution": "* multiplies, / divides and always returns a float, and % gives the remainder.",
              "solutionExplanation": "* multiplies, / divides and always returns a float, and % gives the remainder. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "* multiplies, / divides and always returns a float, and % gives the remainder.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Arithmetic Operators from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "The / operator always returns a whole number.",
                "The % operator divides two numbers and returns the quotient.",
                "* multiplies, / divides and always returns a float, and % gives the remainder.",
                "The * operator can only multiply integers, never floats."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-numbers-math-m1-l4",
            "slug": "python-numbers-math-m1-l4",
            "title": "Integer Division and Modulo",
            "concept": "// divides and rounds the result down to a whole number, while % gives the remainder left over. Together they split a quantity into groups and leftovers, for example turning 125 minutes into 2 hours and 5 minutes.",
            "syntax": "hours = 125 // 60",
            "exampleCode": "print(125 // 60)\nprint(125 % 60)",
            "exampleLanguage": "python",
            "mistake": "Using % on negative numbers and being surprised that the result follows the divisor's sign.",
            "bug": {
              "prompt": "Find the bug: this should print 2 hours and 5 minutes but it prints 125 minutes.",
              "buggyCode": "minutes = 125\nprint(minutes, \"minutes\")",
              "fixedCode": "minutes = 125\nprint(minutes // 60, \"hours and\", minutes % 60, \"minutes\")",
              "explanation": "Printing the raw number does not split it; // gives the whole hours and % gives the remaining minutes."
            },
            "exercise": {
              "title": "Practise Integer Division and Modulo",
              "type": "write-code",
              "instructions": "Read a number of minutes from input and print how many whole hours and remaining minutes it is, like: 2 hours and 5 minutes.",
              "starterCode": "minutes = int(input())\n# TODO: write this line",
              "solution": "minutes = int(input())\nprint(str(minutes // 60) + \" hours and \" + str(minutes % 60) + \" minutes\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "125 minutes",
                  "stdin": "125\n",
                  "expectedStdout": "2 hours and 5 minutes\n",
                  "hidden": false
                },
                {
                  "name": "90 minutes",
                  "stdin": "90\n",
                  "expectedStdout": "1 hours and 30 minutes\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Integer Division and Modulo is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-numbers-math-m1-l5",
            "slug": "python-numbers-math-m1-l5",
            "title": "Operator Precedence",
            "concept": "Operators run in a fixed order: ** first, then * / // %, then + and -, with parentheses overriding everything. When operators have the same precedence they run left to right, except ** which runs right to left.",
            "syntax": "print(2 ** 3 ** 2)  # 512",
            "exampleCode": "print(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(10 - 4 - 3)",
            "exampleLanguage": "python",
            "mistake": "Writing 10 - 4 + 3 and expecting 3, when left-to-right evaluation gives 9.",
            "bug": {
              "prompt": "Find the bug: this should print 9 but it prints 3.",
              "buggyCode": "print(10 - (4 + 3))",
              "fixedCode": "print(10 - 4 + 3)",
              "explanation": "The parentheses made Python add 4 + 3 first; without them, - and + run left to right, giving 9."
            },
            "exercise": {
              "title": "Check your understanding: Operator Precedence",
              "type": "multiple-choice",
              "instructions": "Which statement about operator precedence is correct?",
              "starterCode": "",
              "solution": "** runs first, then * / // %, then + -, and parentheses override all of them.",
              "solutionExplanation": "** runs first, then * / // %, then + -, and parentheses override all of them. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "** runs first, then * / // %, then + -, and parentheses override all of them.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Operator Precedence from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "** runs first, then * / // %, then + -, and parentheses override all of them.",
                "Operators run strictly left to right, in the order they are written.",
                "Addition always runs before multiplication.",
                "Parentheses have no effect on the order of operations."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-numbers-math-m2",
        "title": "Numbers & Arithmetic in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-numbers-math-m2-l1",
            "slug": "python-numbers-math-m2-l1",
            "title": "Exponentiation and Powers",
            "concept": "** raises a number to a power, so 2 ** 3 is 8, and a fractional exponent such as 0.5 computes a square root. Powers grow fast, so even small exponents can produce very large numbers.",
            "syntax": "square = 5 ** 2",
            "exampleCode": "print(2 ** 3)\nprint(5 ** 2)\nprint(9 ** 0.5)",
            "exampleLanguage": "python",
            "mistake": "Writing 2 ^ 3 expecting a power, when ^ is the bitwise XOR operator in Python.",
            "bug": {
              "prompt": "Find the bug: this should print 8 but it prints 1.",
              "buggyCode": "print(2 ^ 3)",
              "fixedCode": "print(2 ** 3)",
              "explanation": "^ is the bitwise XOR operator, not a power; use ** for exponentiation."
            },
            "exercise": {
              "title": "Practise Exponentiation and Powers",
              "type": "write-code",
              "instructions": "Read a base and an exponent from input and print the power.",
              "starterCode": "base = int(input())\nexp = int(input())\n# TODO: write this line",
              "solution": "base = int(input())\nexp = int(input())\nprint(base ** exp)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "2^3",
                  "stdin": "2\n3\n",
                  "expectedStdout": "8\n",
                  "hidden": false
                },
                {
                  "name": "5^2",
                  "stdin": "5\n2\n",
                  "expectedStdout": "25\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Exponentiation and Powers is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-numbers-math-m2-l2",
            "slug": "python-numbers-math-m2-l2",
            "title": "Rounding with round()",
            "concept": "round() rounds a float to the nearest value, and round(x, 2) keeps two decimal places, which is what money calculations usually need. Banker's rounding applies to exact halves, so round(2.5) gives 2 and round(3.5) gives 4.",
            "syntax": "round(3.14159, 2)  # 3.14",
            "exampleCode": "print(round(3.14159, 2))\nprint(round(2.5))\nprint(round(3.5))",
            "exampleLanguage": "python",
            "mistake": "Expecting round(2.5) to give 3, when Python rounds halves to the nearest even number.",
            "bug": {
              "prompt": "Find the bug: this should print 3.14 but it prints 3.",
              "buggyCode": "print(round(3.14159))",
              "fixedCode": "print(round(3.14159, 2))",
              "explanation": "round() with no second argument rounds to a whole number; pass 2 to keep two decimal places."
            },
            "exercise": {
              "title": "Practise Rounding with round()",
              "type": "write-code",
              "instructions": "Read a price from input and print it rounded to two decimal places.",
              "starterCode": "price = float(input())\n# TODO: write this line",
              "solution": "price = float(input())\nprint(round(price, 2))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "3.14159",
                  "stdin": "3.14159\n",
                  "expectedStdout": "3.14\n",
                  "hidden": false
                },
                {
                  "name": "2.567",
                  "stdin": "2.567\n",
                  "expectedStdout": "2.57\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Rounding with round() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-numbers-math-m2-l3",
            "slug": "python-numbers-math-m2-l3",
            "title": "Float Precision",
            "concept": "Floats store numbers in binary, so most decimal fractions such as 0.1 cannot be represented exactly. Small rounding errors appear in arithmetic, which is why money is often stored in cents as integers or rounded before display.",
            "syntax": "print(0.1 + 0.2)",
            "exampleCode": "print(0.1 + 0.2)\nprint(0.3 == 0.1 + 0.2)",
            "exampleLanguage": "python",
            "mistake": "Comparing floats with == and being surprised when two values that look equal are not.",
            "bug": {
              "prompt": "Find the bug: this should print True but it prints False.",
              "buggyCode": "print(0.1 + 0.2 == 0.3)",
              "fixedCode": "print(abs((0.1 + 0.2) - 0.3) < 0.000001)",
              "explanation": "0.1 + 0.2 is 0.30000000000000004, not exactly 0.3; compare floats by checking that the difference is tiny."
            },
            "exercise": {
              "title": "Check your understanding: Float Precision",
              "type": "multiple-choice",
              "instructions": "Which statement about float arithmetic is correct?",
              "starterCode": "",
              "solution": "Floats are binary approximations, so 0.1 + 0.2 is 0.30000000000000004, not exactly 0.3.",
              "solutionExplanation": "Floats are binary approximations, so 0.1 + 0.2 is 0.30000000000000004, not exactly 0.3. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Floats are binary approximations, so 0.1 + 0.2 is 0.30000000000000004, not exactly 0.3.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Float Precision from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Floats store decimal numbers exactly, so 0.1 + 0.2 is exactly 0.3.",
                "Floats can represent every decimal number precisely.",
                "Adding two floats always gives a clean decimal result.",
                "Floats are binary approximations, so 0.1 + 0.2 is 0.30000000000000004, not exactly 0.3."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-numbers-math-m2-l4",
            "slug": "python-numbers-math-m2-l4",
            "title": "Converting Between int and float",
            "concept": "int() converts a float or a numeric string to a whole number by truncating towards zero, and float() converts an int or a numeric string to a float. Conversions fail with ValueError when the text is not a valid number.",
            "syntax": "int(3.9)  # 3",
            "exampleCode": "print(int(3.9))\nprint(float(7))\nprint(int(\"42\"))",
            "exampleLanguage": "python",
            "mistake": "Using int() on a string like \"3.5\", which raises ValueError because int() does not accept decimal points in strings.",
            "bug": {
              "prompt": "Find the bug: this should print 3 but it crashes.",
              "buggyCode": "print(int(\"3.5\"))",
              "fixedCode": "print(int(float(\"3.5\")))",
              "explanation": "int() cannot parse \"3.5\" directly; convert to float first, then truncate with int()."
            },
            "exercise": {
              "title": "Practise Converting Between int and float",
              "type": "write-code",
              "instructions": "Read a decimal number from input and print its whole-number part.",
              "starterCode": "value = float(input())\n# TODO: write this line",
              "solution": "value = float(input())\nprint(int(value))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "3.9",
                  "stdin": "3.9\n",
                  "expectedStdout": "3\n",
                  "hidden": false
                },
                {
                  "name": "7.2",
                  "stdin": "7.2\n",
                  "expectedStdout": "7\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Converting Between int and float is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-numbers-math-m2-l5",
            "slug": "python-numbers-math-m2-l5",
            "title": "A Calculator Program",
            "concept": "A calculator reads two numbers and an operation, then uses if/elif to pick the arithmetic to perform. It is a small program that combines input, conversion, branching, and output, which are the building blocks of almost every larger program.",
            "syntax": "a = int(input())\nb = int(input())",
            "exampleCode": "a = 6\nb = 3\nprint(a + b)\nprint(a - b)\nprint(a * b)",
            "exampleLanguage": "python",
            "mistake": "Forgetting to handle division by zero, so the calculator crashes on 6 / 0.",
            "bug": {
              "prompt": "Find the bug: this should print the product but it prints the sum.",
              "buggyCode": "a = 6\nb = 3\nprint(a + b)",
              "fixedCode": "a = 6\nb = 3\nprint(a * b)",
              "explanation": "The operator was + instead of *; the code must use the operator that matches the intended calculation."
            },
            "exercise": {
              "title": "Practise A Calculator Program",
              "type": "write-code",
              "instructions": "Read two numbers from input and print their sum, difference, product, and quotient, each on its own line.",
              "starterCode": "a = float(input())\nb = float(input())\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line",
              "solution": "a = float(input())\nb = float(input())\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "6, 3",
                  "stdin": "6\n3\n",
                  "expectedStdout": "9.0\n3.0\n18.0\n2.0\n",
                  "hidden": false
                },
                {
                  "name": "10, 4",
                  "stdin": "10\n4\n",
                  "expectedStdout": "14.0\n6.0\n40.0\n2.5\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Calculator Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Numbers & Arithmetic Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a total bill and a number of people, then prints how much each person pays, rounded to two decimal places.",
      "starterCode": "total = float(input())\npeople = int(input())\n# TODO: write this line",
      "solution": "total = float(input())\npeople = int(input())\nprint(round(total / people, 2))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "100, 3",
          "stdin": "100\n3\n",
          "expectedStdout": "33.33\n",
          "hidden": false
        },
        {
          "name": "50, 4",
          "stdin": "50\n4\n",
          "expectedStdout": "12.5\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Numbers & Arithmetic Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Numbers & Arithmetic Capstone Project",
      "description": "A small end-to-end Python program that puts Numbers & Arithmetic into practice.",
      "requirements": [
        "Use the core ideas of Numbers & Arithmetic in a working Python program.",
        "Apply at least three of these skills: Arithmetic operators, Integer division, Modulo, Exponentiation.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Numbers & Arithmetic correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-strings",
    "slug": "python-strings",
    "language": "python",
    "category": "languages",
    "title": "Working with Strings",
    "description": "Learn to create, combine, index, slice, and measure strings \u2014 the building blocks of all text processing in Python \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "String literals",
      "Concatenation",
      "Repetition",
      "Indexing",
      "Slicing",
      "len()",
      "String comparison",
      "Multiline strings"
    ],
    "prerequisites": [
      "python-variables-types"
    ],
    "analogy": "Learning {topic} is like learning to thread beads: each character is a bead, and once you can pick them up and rearrange them, you can make anything.",
    "modules": [
      {
        "id": "python-strings-m1",
        "title": "Working with Strings Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-strings-m1-l1",
            "slug": "python-strings-m1-l1",
            "title": "Creating Strings",
            "concept": "A string is text enclosed in single or double quotes, and both kinds work the same way in Python. You can include the other kind of quote inside a string without escaping it, which is handy for sentences with apostrophes or quoted speech.",
            "syntax": "name = \"Ada\"",
            "exampleCode": "print(\"Hello\")\nprint('It\\'s fine')\nprint('She said \"hi\"')",
            "exampleLanguage": "python",
            "mistake": "Starting a string with one kind of quote and ending it with the other, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should print Hello but it is a syntax error.",
              "buggyCode": "print(\"Hello')",
              "fixedCode": "print(\"Hello\")",
              "explanation": "A string must end with the same kind of quote it started with."
            },
            "exercise": {
              "title": "Practise Creating Strings",
              "type": "write-code",
              "instructions": "Print exactly: Python is fun!",
              "starterCode": "# TODO: write this line",
              "solution": "print(\"Python is fun!\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print a sentence",
                  "stdin": "",
                  "expectedStdout": "Python is fun!\n",
                  "hidden": false
                },
                {
                  "name": "Print a sentence again",
                  "stdin": "",
                  "expectedStdout": "Python is fun!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Creating Strings is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-strings-m1-l2",
            "slug": "python-strings-m1-l2",
            "title": "Concatenating Strings",
            "concept": "The + operator joins two strings into one, and * repeats a string a number of times. Concatenation builds messages from pieces, but f-strings are usually clearer when you mix text with values.",
            "syntax": "full = first + \" \" + last",
            "exampleCode": "first = \"Ada\"\nlast = \"Lovelace\"\nprint(first + \" \" + last)",
            "exampleLanguage": "python",
            "mistake": "Trying to add a number to a string with +, which raises TypeError instead of converting the number.",
            "bug": {
              "prompt": "Find the bug: this should print Score: 10 but it crashes.",
              "buggyCode": "print(\"Score: \" + 10)",
              "fixedCode": "print(\"Score: \" + str(10))",
              "explanation": "+ cannot join a string and a number; convert the number with str() first."
            },
            "exercise": {
              "title": "Practise Concatenating Strings",
              "type": "write-code",
              "instructions": "Read a first name and a last name from input, then print the full name with a space between them.",
              "starterCode": "first = input()\nlast = input()\n# TODO: write this line",
              "solution": "first = input()\nlast = input()\nprint(first + \" \" + last)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada Lovelace",
                  "stdin": "Ada\nLovelace\n",
                  "expectedStdout": "Ada Lovelace\n",
                  "hidden": false
                },
                {
                  "name": "Grace Hopper",
                  "stdin": "Grace\nHopper\n",
                  "expectedStdout": "Grace Hopper\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Concatenating Strings is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-strings-m1-l3",
            "slug": "python-strings-m1-l3",
            "title": "Quotes and Strings",
            "concept": "Strings are sequences of characters, and Python gives you two quote styles so you can nest one inside the other. Triple quotes create multi-line strings, which are useful for long text and for docstrings.",
            "syntax": "text = '''multi\nline'''",
            "exampleCode": "print('It\\'s')\nprint(\"It's\")\nprint('''one\ntwo''')",
            "exampleLanguage": "python",
            "mistake": "Forgetting to escape an apostrophe inside a single-quoted string.",
            "bug": {
              "prompt": "Find the bug: this should print It's fine but it is a syntax error.",
              "buggyCode": "print('It's fine')",
              "fixedCode": "print(\"It's fine\")",
              "explanation": "The apostrophe ends the single-quoted string early; use double quotes for the outer string instead."
            },
            "exercise": {
              "title": "Check your understanding: Quotes and Strings",
              "type": "multiple-choice",
              "instructions": "Which statement about Python strings is correct?",
              "starterCode": "",
              "solution": "Strings can use single or double quotes, and a string must end with the same quote it started with.",
              "solutionExplanation": "Strings can use single or double quotes, and a string must end with the same quote it started with. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Strings can use single or double quotes, and a string must end with the same quote it started with.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Quotes and Strings from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A string started with a double quote must end with a single quote.",
                "Strings cannot contain spaces.",
                "Strings can use single or double quotes, and a string must end with the same quote it started with.",
                "Single quotes and double quotes create different types of strings."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-strings-m1-l4",
            "slug": "python-strings-m1-l4",
            "title": "String Repetition",
            "concept": "Multiplying a string by an integer repeats it that many times, so \"ab\" * 3 is \"ababab\". Repetition is useful for drawing lines, padding text, and building simple patterns.",
            "syntax": "\"ha\" * 3  # 'hahaha'",
            "exampleCode": "print(\"ha\" * 3)\nprint(\"-\" * 10)",
            "exampleLanguage": "python",
            "mistake": "Multiplying a string by a float, which raises TypeError because repetition needs a whole number.",
            "bug": {
              "prompt": "Find the bug: this should print hahaha but it crashes.",
              "buggyCode": "print(\"ha\" * 3.0)",
              "fixedCode": "print(\"ha\" * 3)",
              "explanation": "String repetition needs an integer count; a float such as 3.0 is not accepted."
            },
            "exercise": {
              "title": "Practise String Repetition",
              "type": "write-code",
              "instructions": "Read a word and a count from input, then print the word repeated that many times.",
              "starterCode": "word = input()\ncount = int(input())\n# TODO: write this line",
              "solution": "word = input()\ncount = int(input())\nprint(word * count)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "ha, 3",
                  "stdin": "ha\n3\n",
                  "expectedStdout": "hahaha\n",
                  "hidden": false
                },
                {
                  "name": "ab, 2",
                  "stdin": "ab\n2\n",
                  "expectedStdout": "abab\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "String Repetition is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-strings-m1-l5",
            "slug": "python-strings-m1-l5",
            "title": "String Indexing",
            "concept": "Each character in a string has a position, called an index, starting at 0 for the first character. Negative indexes count backwards from the end, so -1 is the last character and -2 is the one before it.",
            "syntax": "word = \"Python\"\nword[0]  # 'P'",
            "exampleCode": "word = \"Python\"\nprint(word[0])\nprint(word[-1])",
            "exampleLanguage": "python",
            "mistake": "Using an index equal to the string's length, which is one past the last character and raises IndexError.",
            "bug": {
              "prompt": "Find the bug: this should print the last letter but it crashes.",
              "buggyCode": "word = \"Python\"\nprint(word[6])",
              "fixedCode": "word = \"Python\"\nprint(word[-1])",
              "explanation": "\"Python\" has 6 characters with indexes 0 to 5, so index 6 is out of range; -1 gives the last character."
            },
            "exercise": {
              "title": "Check your understanding: String Indexing",
              "type": "multiple-choice",
              "instructions": "Which statement about string indexing is correct?",
              "starterCode": "",
              "solution": "Python indexes from 0, so word[0] is the first character and word[-1] is the last.",
              "solutionExplanation": "Python indexes from 0, so word[0] is the first character and word[-1] is the last. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Python indexes from 0, so word[0] is the first character and word[-1] is the last.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of String Indexing from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Python indexes from 0, so word[0] is the first character and word[-1] is the last.",
                "Python indexes from 1, so word[1] is the first character.",
                "Negative indexes count from the start of the string.",
                "word[0] returns the whole string, not one character."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-strings-m2",
        "title": "Working with Strings in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-strings-m2-l1",
            "slug": "python-strings-m2-l1",
            "title": "Indexing Characters",
            "concept": "Indexing with square brackets returns a single character as a one-character string. Because strings are immutable, indexing can read a character but never change it in place.",
            "syntax": "word[2]  # third character",
            "exampleCode": "word = \"Python\"\nprint(word[2])\nprint(word[0] + word[1])",
            "exampleLanguage": "python",
            "mistake": "Forgetting that indexes start at 0, so word[1] is the second character, not the first.",
            "bug": {
              "prompt": "Find the bug: this should print P but it prints y.",
              "buggyCode": "word = \"Python\"\nprint(word[1])",
              "fixedCode": "word = \"Python\"\nprint(word[0])",
              "explanation": "Indexes start at 0, so the first character is word[0], not word[1]."
            },
            "exercise": {
              "title": "Practise Indexing Characters",
              "type": "write-code",
              "instructions": "Read a word from input and print its first and last characters separated by a space.",
              "starterCode": "word = input()\n# TODO: write this line",
              "solution": "word = input()\nprint(word[0] + \" \" + word[-1])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Python",
                  "stdin": "Python\n",
                  "expectedStdout": "P n\n",
                  "hidden": false
                },
                {
                  "name": "Ada",
                  "stdin": "Ada\n",
                  "expectedStdout": "A a\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Indexing Characters is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-strings-m2-l2",
            "slug": "python-strings-m2-l2",
            "title": "Slicing Strings",
            "concept": "A slice word[start:stop] returns the characters from start up to, but not including, stop. Omitting start means the beginning, omitting stop means the end, and a third value sets the step, so word[::-1] reverses the string.",
            "syntax": "word[1:4]  # slice",
            "exampleCode": "word = \"Python\"\nprint(word[1:4])\nprint(word[:3])\nprint(word[::-1])",
            "exampleLanguage": "python",
            "mistake": "Expecting the stop index to be included in the slice, when it is always excluded.",
            "bug": {
              "prompt": "Find the bug: this should print Pyt but it prints Py.",
              "buggyCode": "word = \"Python\"\nprint(word[0:2])",
              "fixedCode": "word = \"Python\"\nprint(word[0:3])",
              "explanation": "The stop index is excluded, so word[0:2] gives only Py; use 3 to include the character at index 2."
            },
            "exercise": {
              "title": "Practise Slicing Strings",
              "type": "write-code",
              "instructions": "Read a word from input and print its first three characters.",
              "starterCode": "word = input()\n# TODO: write this line",
              "solution": "word = input()\nprint(word[:3])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Python",
                  "stdin": "Python\n",
                  "expectedStdout": "Pyt\n",
                  "hidden": false
                },
                {
                  "name": "Hello",
                  "stdin": "Hello\n",
                  "expectedStdout": "Hel\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Slicing Strings is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-strings-m2-l3",
            "slug": "python-strings-m2-l3",
            "title": "Slicing Rules",
            "concept": "Slicing copies a range of characters into a new string and never changes the original. A slice that runs past the end of the string simply stops at the end instead of raising an error, which makes slices forgiving to use.",
            "syntax": "word[2:]  # to the end",
            "exampleCode": "word = \"Python\"\nprint(word[2:])\nprint(word[:10])",
            "exampleLanguage": "python",
            "mistake": "Using a slice on a string and expecting the original variable to change.",
            "bug": {
              "prompt": "Find the bug: this should print ython but it prints Python.",
              "buggyCode": "word = \"Python\"\nword[1:]\nprint(word)",
              "fixedCode": "word = \"Python\"\nword = word[1:]\nprint(word)",
              "explanation": "Slicing returns a new string and leaves the original unchanged; you must assign the result back to word."
            },
            "exercise": {
              "title": "Check your understanding: Slicing Rules",
              "type": "multiple-choice",
              "instructions": "Which statement about slicing is correct?",
              "starterCode": "",
              "solution": "In word[a:b], the character at index b is not included, and omitting a or b means the start or end.",
              "solutionExplanation": "In word[a:b], the character at index b is not included, and omitting a or b means the start or end. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "In word[a:b], the character at index b is not included, and omitting a or b means the start or end.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Slicing Rules from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "In word[a:b], both the characters at a and b are included.",
                "A slice with a missing start always starts at index 1.",
                "Slices change the original string in place.",
                "In word[a:b], the character at index b is not included, and omitting a or b means the start or end."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-strings-m2-l4",
            "slug": "python-strings-m2-l4",
            "title": "The len() Function",
            "concept": "len() returns the number of characters in a string, counting spaces and punctuation too. It is the usual way to check whether a string is empty or to loop over its positions.",
            "syntax": "len(\"hello\")  # 5",
            "exampleCode": "print(len(\"hello\"))\nprint(len(\"\"))\nprint(len(\"a b\"))",
            "exampleLanguage": "python",
            "mistake": "Calling len() on a number, which raises TypeError because numbers have no length.",
            "bug": {
              "prompt": "Find the bug: this should print 4 but it crashes.",
              "buggyCode": "print(len(1234))",
              "fixedCode": "print(len(\"1234\"))",
              "explanation": "len() works on sequences such as strings, not on numbers; convert the number to a string first."
            },
            "exercise": {
              "title": "Practise The len() Function",
              "type": "write-code",
              "instructions": "Read a sentence from input and print how many characters it has.",
              "starterCode": "sentence = input()\n# TODO: write this line",
              "solution": "sentence = input()\nprint(len(sentence))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Hello world",
                  "stdin": "Hello world\n",
                  "expectedStdout": "11\n",
                  "hidden": false
                },
                {
                  "name": "Hi",
                  "stdin": "Hi\n",
                  "expectedStdout": "2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The len() Function is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-strings-m2-l5",
            "slug": "python-strings-m2-l5",
            "title": "Building Messages from Strings",
            "concept": "Real programs build messages by combining fixed text with values from variables, using concatenation, f-strings, or formatting. Choosing the clearest method matters more than the shortest one, because messages are read by humans.",
            "syntax": "f\"Hello, {name}!\"",
            "exampleCode": "name = \"Ada\"\nage = 36\nprint(f\"{name} is {age} years old\")",
            "exampleLanguage": "python",
            "mistake": "Forgetting the f before an f-string, so {name} is printed literally instead of being replaced.",
            "bug": {
              "prompt": "Find the bug: this should print Hello, Ada but it prints Hello, {name}.",
              "buggyCode": "name = \"Ada\"\nprint(\"Hello, {name}\")",
              "fixedCode": "name = \"Ada\"\nprint(f\"Hello, {name}\")",
              "explanation": "Without the f prefix the string is an ordinary string, so {name} is printed literally; the f makes it an f-string."
            },
            "exercise": {
              "title": "Practise Building Messages from Strings",
              "type": "write-code",
              "instructions": "Read a name and a favourite food from input, then print: <name> loves <food>.",
              "starterCode": "name = input()\nfood = input()\n# TODO: write this line",
              "solution": "name = input()\nfood = input()\nprint(name + \" loves \" + food + \".\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada pizza",
                  "stdin": "Ada\npizza\n",
                  "expectedStdout": "Ada loves pizza.\n",
                  "hidden": false
                },
                {
                  "name": "Grace sushi",
                  "stdin": "Grace\nsushi\n",
                  "expectedStdout": "Grace loves sushi.\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Building Messages from Strings is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Working with Strings Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a first name and a last name, then prints three lines: the full name, the initials, and a username made of the lowercase first name, a dot, and the lowercase last name.",
      "starterCode": "first = input()\nlast = input()\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line",
      "solution": "first = input()\nlast = input()\nprint(first + \" \" + last)\nprint(first[0] + last[0])\nprint(first.lower() + \".\" + last.lower())",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Ada Lovelace",
          "stdin": "Ada\nLovelace\n",
          "expectedStdout": "Ada Lovelace\nAL\nada.lovelace\n",
          "hidden": false
        },
        {
          "name": "Grace Hopper",
          "stdin": "Grace\nHopper\n",
          "expectedStdout": "Grace Hopper\nGH\ngrace.hopper\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Working with Strings Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Working with Strings Capstone Project",
      "description": "A small end-to-end Python program that puts Working with Strings into practice.",
      "requirements": [
        "Use the core ideas of Working with Strings in a working Python program.",
        "Apply at least three of these skills: String literals, Concatenation, Repetition, Indexing.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Working with Strings correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-string-methods",
    "slug": "python-string-methods",
    "language": "python",
    "category": "languages",
    "title": "String Methods & Formatting",
    "description": "Learn the string methods Python programmers use every day \u2014 upper, strip, replace, split, join, and f-strings \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "upper()/lower()",
      "strip()",
      "replace()",
      "split()",
      "join()",
      "find()",
      "startswith()/endswith()",
      "f-strings"
    ],
    "prerequisites": [
      "python-strings"
    ],
    "analogy": "Learning {topic} is like learning to use a toolbox: each method is one tool, and knowing which one to reach for makes every job faster.",
    "modules": [
      {
        "id": "python-string-methods-m1",
        "title": "String Methods & Formatting Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-string-methods-m1-l1",
            "slug": "python-string-methods-m1-l1",
            "title": "upper() and lower()",
            "concept": "upper() returns a copy of a string with all letters in uppercase, and lower() returns one with all letters in lowercase. Neither changes the original string, so you must store or print the result.",
            "syntax": "\"Hello\".upper()  # 'HELLO'",
            "exampleCode": "word = \"Python\"\nprint(word.upper())\nprint(word.lower())\nprint(word)",
            "exampleLanguage": "python",
            "mistake": "Calling upper() and expecting the original variable to change, when it returns a new string.",
            "bug": {
              "prompt": "Find the bug: this should print HELLO but it prints Hello.",
              "buggyCode": "word = \"Hello\"\nword.upper()\nprint(word)",
              "fixedCode": "word = \"Hello\"\nword = word.upper()\nprint(word)",
              "explanation": "upper() returns a new string and leaves the original unchanged; assign the result back to word."
            },
            "exercise": {
              "title": "Practise upper() and lower()",
              "type": "write-code",
              "instructions": "Read a word from input and print it in uppercase.",
              "starterCode": "word = input()\n# TODO: write this line",
              "solution": "word = input()\nprint(word.upper())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Python",
                  "stdin": "Python\n",
                  "expectedStdout": "PYTHON\n",
                  "hidden": false
                },
                {
                  "name": "hello",
                  "stdin": "hello\n",
                  "expectedStdout": "HELLO\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "upper() and lower() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-string-methods-m1-l2",
            "slug": "python-string-methods-m1-l2",
            "title": "strip() and Whitespace",
            "concept": "strip() removes whitespace from both ends of a string, lstrip() removes it from the left, and rstrip() from the right. It is the standard way to clean up input, because users often type extra spaces by accident.",
            "syntax": "\"  hi  \".strip()  # 'hi'",
            "exampleCode": "print(\"  hi  \".strip())\nprint(\"--hi--\".strip(\"-\"))",
            "exampleLanguage": "python",
            "mistake": "Expecting strip() to remove spaces from the middle of a string as well.",
            "bug": {
              "prompt": "Find the bug: this should print hello without spaces but it prints '  hello  '.",
              "buggyCode": "text = \"  hello  \"\nprint(text)",
              "fixedCode": "text = \"  hello  \"\nprint(text.strip())",
              "explanation": "strip() must be called to remove the surrounding spaces; printing the raw string keeps them."
            },
            "exercise": {
              "title": "Practise strip() and Whitespace",
              "type": "write-code",
              "instructions": "Read a line from input and print it with surrounding whitespace removed.",
              "starterCode": "line = input()\n# TODO: write this line",
              "solution": "line = input()\nprint(line.strip())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "padded",
                  "stdin": "  hello  \n",
                  "expectedStdout": "hello\n",
                  "hidden": false
                },
                {
                  "name": "clean",
                  "stdin": "world\n",
                  "expectedStdout": "world\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "strip() and Whitespace is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-string-methods-m1-l3",
            "slug": "python-string-methods-m1-l3",
            "title": "String Immutability",
            "concept": "Strings are immutable, so every string method returns a brand-new string and leaves the original untouched. This is why method calls must be assigned or printed to be useful, and why chaining methods such as text.strip().lower() works.",
            "syntax": "text.strip().lower()",
            "exampleCode": "text = \"  Hello World  \"\nprint(text.strip().lower())\nprint(text)",
            "exampleLanguage": "python",
            "mistake": "Chaining methods in the wrong order, such as calling split() before strip() and keeping empty pieces.",
            "bug": {
              "prompt": "Find the bug: this should print hello but it prints Hello.",
              "buggyCode": "text = \"Hello\"\ntext.lower()\nprint(text)",
              "fixedCode": "text = \"Hello\"\ntext = text.lower()\nprint(text)",
              "explanation": "lower() returns a new string; the result must be assigned back to text."
            },
            "exercise": {
              "title": "Check your understanding: String Immutability",
              "type": "multiple-choice",
              "instructions": "Which statement about string methods is correct?",
              "starterCode": "",
              "solution": "String methods return new strings; the original string never changes.",
              "solutionExplanation": "String methods return new strings; the original string never changes. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "String methods return new strings; the original string never changes.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of String Immutability from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "upper() changes the original string in place.",
                "Strings can be modified by assigning to an index.",
                "String methods return new strings; the original string never changes.",
                "String methods delete the original string after use."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-string-methods-m1-l4",
            "slug": "python-string-methods-m1-l4",
            "title": "replace()",
            "concept": "replace(old, new) returns a copy of the string with every occurrence of old swapped for new. It is useful for fixing typos, swapping separators, and cleaning data, and it leaves the original string unchanged.",
            "syntax": "\"a-b-c\".replace(\"-\", \" \")",
            "exampleCode": "print(\"a-b-c\".replace(\"-\", \" \"))\nprint(\"hello\".replace(\"l\", \"L\"))",
            "exampleLanguage": "python",
            "mistake": "Expecting replace() to change the original string instead of returning a new one.",
            "bug": {
              "prompt": "Find the bug: this should print a b c but it prints a-b-c.",
              "buggyCode": "text = \"a-b-c\"\ntext.replace(\"-\", \" \")\nprint(text)",
              "fixedCode": "text = \"a-b-c\"\ntext = text.replace(\"-\", \" \")\nprint(text)",
              "explanation": "replace() returns a new string; assign it back to text to keep the change."
            },
            "exercise": {
              "title": "Practise replace()",
              "type": "write-code",
              "instructions": "Read a sentence from input and print it with every space replaced by a dash.",
              "starterCode": "sentence = input()\n# TODO: write this line",
              "solution": "sentence = input()\nprint(sentence.replace(\" \", \"-\"))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "hello world",
                  "stdin": "hello world\n",
                  "expectedStdout": "hello-world\n",
                  "hidden": false
                },
                {
                  "name": "a b c",
                  "stdin": "a b c\n",
                  "expectedStdout": "a-b-c\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "replace() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-string-methods-m1-l5",
            "slug": "python-string-methods-m1-l5",
            "title": "split() and join()",
            "concept": "split() divides a string into a list of pieces at a separator, defaulting to any whitespace, while join() does the reverse, gluing a list of strings together with a separator between them. They are the standard pair for turning text into data and back again.",
            "syntax": "\"a b c\".split()",
            "exampleCode": "print(\"a b c\".split())\nprint(\"-\".join([\"a\", \"b\", \"c\"]))",
            "exampleLanguage": "python",
            "mistake": "Calling join() on a list that contains numbers, which raises TypeError because join() needs strings.",
            "bug": {
              "prompt": "Find the bug: this should print 1-2-3 but it crashes.",
              "buggyCode": "print(\"-\".join([1, 2, 3]))",
              "fixedCode": "print(\"-\".join([\"1\", \"2\", \"3\"]))",
              "explanation": "join() only works on strings; the numbers must be strings first."
            },
            "exercise": {
              "title": "Check your understanding: split() and join()",
              "type": "multiple-choice",
              "instructions": "Which statement about split() and join() is correct?",
              "starterCode": "",
              "solution": "split() breaks a string into a list at a separator, and join() glues a list back into one string.",
              "solutionExplanation": "split() breaks a string into a list at a separator, and join() glues a list back into one string. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "split() breaks a string into a list at a separator, and join() glues a list back into one string.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of split() and join() from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "split() breaks a string into a list at a separator, and join() glues a list back into one string.",
                "split() joins a list into a string.",
                "join() breaks a string into a list.",
                "split() and join() both change the original string in place."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-string-methods-m2",
        "title": "String Methods & Formatting in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-string-methods-m2-l1",
            "slug": "python-string-methods-m2-l1",
            "title": "split() into Words",
            "concept": "split() with no argument splits on any run of whitespace and drops empty pieces, which makes it ideal for breaking a sentence into words. Passing a separator such as \",\" splits on exactly that character instead.",
            "syntax": "\"a, b\".split(\", \")",
            "exampleCode": "print(\"one two three\".split())\nprint(\"a,b,c\".split(\",\"))",
            "exampleLanguage": "python",
            "mistake": "Splitting on a single space and getting empty strings when the input has double spaces.",
            "bug": {
              "prompt": "Find the bug: this should print 3 words but it prints 4 pieces.",
              "buggyCode": "print(\"one  two three\".split(\" \"))",
              "fixedCode": "print(\"one  two three\".split())",
              "explanation": "Splitting on a single space keeps an empty piece where the double space was; split() with no argument splits on any whitespace and drops empties."
            },
            "exercise": {
              "title": "Practise split() into Words",
              "type": "write-code",
              "instructions": "Read a sentence from input and print how many words it has.",
              "starterCode": "sentence = input()\n# TODO: write this line",
              "solution": "sentence = input()\nprint(len(sentence.split()))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "hello world foo",
                  "stdin": "hello world foo\n",
                  "expectedStdout": "3\n",
                  "hidden": false
                },
                {
                  "name": "one two",
                  "stdin": "one two\n",
                  "expectedStdout": "2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "split() into Words is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-string-methods-m2-l2",
            "slug": "python-string-methods-m2-l2",
            "title": "join() Words Together",
            "concept": "The join method is called on the separator string, so \", \".join(words) puts a comma and a space between each word. It is the reverse of split(), and it only accepts a list of strings.",
            "syntax": "\", \".join([\"a\", \"b\"])",
            "exampleCode": "print(\", \".join([\"a\", \"b\", \"c\"]))\nprint(\" \".join([\"red\", \"blue\"]))",
            "exampleLanguage": "python",
            "mistake": "Calling words.join(\", \") instead of \", \".join(words), which is the wrong way round.",
            "bug": {
              "prompt": "Find the bug: this should print a, b, c but it crashes.",
              "buggyCode": "words = [\"a\", \"b\", \"c\"]\nprint(words.join(\", \"))",
              "fixedCode": "words = [\"a\", \"b\", \"c\"]\nprint(\", \".join(words))",
              "explanation": "join() is a string method called on the separator, not on the list; the separator goes first."
            },
            "exercise": {
              "title": "Practise join() Words Together",
              "type": "write-code",
              "instructions": "Read three words from input, one per line, and print them joined with a comma and a space.",
              "starterCode": "a = input()\nb = input()\nc = input()\n# TODO: write this line",
              "solution": "a = input()\nb = input()\nc = input()\nprint(\", \".join([a, b, c]))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "red green blue",
                  "stdin": "red\ngreen\nblue\n",
                  "expectedStdout": "red, green, blue\n",
                  "hidden": false
                },
                {
                  "name": "one two three",
                  "stdin": "one\ntwo\nthree\n",
                  "expectedStdout": "one, two, three\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "join() Words Together is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-string-methods-m2-l3",
            "slug": "python-string-methods-m2-l3",
            "title": "f-Strings",
            "concept": "An f-string starts with f before the opening quote, and anything inside curly braces is evaluated and inserted as text. They are the clearest way to build messages that mix fixed words with values, and they can include full expressions such as {price * 2}.",
            "syntax": "f\"{name} is {age}\"",
            "exampleCode": "name = \"Ada\"\nage = 36\nprint(f\"{name} is {age}\")\nprint(f\"Double age: {age * 2}\")",
            "exampleLanguage": "python",
            "mistake": "Forgetting the f prefix, so the braces are printed literally.",
            "bug": {
              "prompt": "Find the bug: this should print Hello, Ada but it prints Hello, {name}.",
              "buggyCode": "name = \"Ada\"\nprint(\"Hello, {name}\")",
              "fixedCode": "name = \"Ada\"\nprint(f\"Hello, {name}\")",
              "explanation": "Without the f prefix the string is ordinary, so {name} is printed literally."
            },
            "exercise": {
              "title": "Check your understanding: f-Strings",
              "type": "multiple-choice",
              "instructions": "Which statement about f-strings is correct?",
              "starterCode": "",
              "solution": "An f-string starts with f and replaces {expression} with the value of the expression.",
              "solutionExplanation": "An f-string starts with f and replaces {expression} with the value of the expression. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An f-string starts with f and replaces {expression} with the value of the expression.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of f-Strings from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "F-strings only work with numbers, not with text.",
                "The f in an f-string stands for file, and it reads from a file.",
                "Curly braces in an f-string are printed literally.",
                "An f-string starts with f and replaces {expression} with the value of the expression."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-string-methods-m2-l4",
            "slug": "python-string-methods-m2-l4",
            "title": "f-String Formatting",
            "concept": "F-strings support format specifiers after a colon, such as {price:.2f} for two decimal places or {name:>10} to right-align in ten characters. Formatting keeps output tidy without extra round() or padding code.",
            "syntax": "f\"{price:.2f}\"",
            "exampleCode": "price = 3.14159\nprint(f\"{price:.2f}\")\nprint(f\"{'Ada':>10}\")",
            "exampleLanguage": "python",
            "mistake": "Using .2f on a value that is not a number, which raises ValueError.",
            "bug": {
              "prompt": "Find the bug: this should print 3.14 but it crashes.",
              "buggyCode": "price = \"3.14159\"\nprint(f\"{price:.2f}\")",
              "fixedCode": "price = 3.14159\nprint(f\"{price:.2f}\")",
              "explanation": ":.2f needs a number; the string \"3.14159\" must be a float first."
            },
            "exercise": {
              "title": "Practise f-String Formatting",
              "type": "write-code",
              "instructions": "Read a price from input and print it with exactly two decimal places, like: 3.14",
              "starterCode": "price = float(input())\n# TODO: write this line",
              "solution": "price = float(input())\nprint(f\"{price:.2f}\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "3.14159",
                  "stdin": "3.14159\n",
                  "expectedStdout": "3.14\n",
                  "hidden": false
                },
                {
                  "name": "2.5",
                  "stdin": "2.5\n",
                  "expectedStdout": "2.50\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "f-String Formatting is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-string-methods-m2-l5",
            "slug": "python-string-methods-m2-l5",
            "title": "Cleaning Up User Input",
            "concept": "Real input is messy: extra spaces, mixed case, and empty lines. A cleaning step that strips whitespace, normalises case, and checks for empty input turns raw typing into data a program can trust.",
            "syntax": "clean = raw.strip().lower()",
            "exampleCode": "raw = \"  HELLO World  \"\nprint(raw.strip().lower())",
            "exampleLanguage": "python",
            "mistake": "Cleaning the input for display but forgetting to clean the copy used for comparisons.",
            "bug": {
              "prompt": "Find the bug: typing YES should be accepted but it is rejected.",
              "buggyCode": "answer = input()\nprint(answer == \"yes\")",
              "fixedCode": "answer = input()\nprint(answer.strip().lower() == \"yes\")",
              "explanation": "The raw input keeps its spaces and capitals, so it never equals \"yes\"; strip and lower it before comparing."
            },
            "exercise": {
              "title": "Practise Cleaning Up User Input",
              "type": "write-code",
              "instructions": "Read a name from input and print it cleaned up: stripped of spaces and in title case.",
              "starterCode": "name = input()\n# TODO: write this line",
              "solution": "name = input()\nprint(name.strip().title())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "  ada  ",
                  "stdin": "  ada  \n",
                  "expectedStdout": "Ada\n",
                  "hidden": false
                },
                {
                  "name": "GRACE",
                  "stdin": "GRACE\n",
                  "expectedStdout": "Grace\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Cleaning Up User Input is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise String Methods & Formatting Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a sentence, then prints four lines: the sentence stripped of surrounding spaces, the sentence in lowercase, the sentence in title case, and the number of words it has.",
      "starterCode": "sentence = input()\nclean = sentence.strip()\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line",
      "solution": "sentence = input()\nclean = sentence.strip()\nprint(clean)\nprint(clean.lower())\nprint(clean.title())\nprint(len(clean.split()))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "  Hello WORLD  ",
          "stdin": "  Hello WORLD  \n",
          "expectedStdout": "Hello WORLD\nhello world\nHello World\n2\n",
          "hidden": false
        },
        {
          "name": "PYTHON is FUN",
          "stdin": "PYTHON is FUN\n",
          "expectedStdout": "PYTHON is FUN\npython is fun\nPython Is Fun\n3\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "String Methods & Formatting Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "String Methods & Formatting Capstone Project",
      "description": "A small end-to-end Python program that puts String Methods & Formatting into practice.",
      "requirements": [
        "Use the core ideas of String Methods & Formatting in a working Python program.",
        "Apply at least three of these skills: upper()/lower(), strip(), replace(), split().",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates String Methods & Formatting correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-lists",
    "slug": "python-lists",
    "language": "python",
    "category": "languages",
    "title": "Lists",
    "description": "Learn Python's most useful collection \u2014 lists: creating, indexing, appending, looping, and searching them \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Creating lists",
      "Indexing",
      "Appending",
      "len()",
      "Iterating lists",
      "Membership in",
      "Lists of numbers",
      "Nested lists"
    ],
    "prerequisites": [
      "python-variables-types"
    ],
    "analogy": "Learning {topic} is like learning to keep a shopping list: one list holds everything you need, in order, and you can cross things off as you go.",
    "modules": [
      {
        "id": "python-lists-m1",
        "title": "Lists Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-lists-m1-l1",
            "slug": "python-lists-m1-l1",
            "title": "Creating a List",
            "concept": "A list is an ordered collection written in square brackets, and it can hold values of different types, including other lists. Lists are mutable, so you can change, add, and remove items after creating one.",
            "syntax": "fruits = [\"apple\", \"banana\"]",
            "exampleCode": "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits)\nprint(len(fruits))",
            "exampleLanguage": "python",
            "mistake": "Forgetting the commas between items, which joins adjacent strings into one.",
            "bug": {
              "prompt": "Find the bug: this list should have 3 items but it has 2.",
              "buggyCode": "fruits = [\"apple\" \"banana\", \"cherry\"]\nprint(len(fruits))",
              "fixedCode": "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(len(fruits))",
              "explanation": "Two string literals next to each other with no comma are joined into one string by Python."
            },
            "exercise": {
              "title": "Practise Creating a List",
              "type": "write-code",
              "instructions": "Create a list of three colours and print it.",
              "starterCode": "colours = [\"red\", \"green\", \"blue\"]\n# TODO: write this line",
              "solution": "colours = [\"red\", \"green\", \"blue\"]\nprint(colours)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print colours",
                  "stdin": "",
                  "expectedStdout": "['red', 'green', 'blue']\n",
                  "hidden": false
                },
                {
                  "name": "Print colours again",
                  "stdin": "",
                  "expectedStdout": "['red', 'green', 'blue']\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Creating a List is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-lists-m1-l2",
            "slug": "python-lists-m1-l2",
            "title": "Indexing a List",
            "concept": "List items are numbered from 0, just like string characters, and negative indexes count from the end. Indexing returns the item itself, so you can use it in expressions or assign it to another variable.",
            "syntax": "fruits[0]  # first item",
            "exampleCode": "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits[0])\nprint(fruits[-1])",
            "exampleLanguage": "python",
            "mistake": "Using an index equal to the list's length, which raises IndexError.",
            "bug": {
              "prompt": "Find the bug: this should print cherry but it crashes.",
              "buggyCode": "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits[3])",
              "fixedCode": "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits[2])",
              "explanation": "A 3-item list has indexes 0 to 2, so index 3 is out of range; the last item is at index 2, or -1."
            },
            "exercise": {
              "title": "Practise Indexing a List",
              "type": "write-code",
              "instructions": "Print the first and last colours of the list [\"red\", \"green\", \"blue\"], each on its own line.",
              "starterCode": "colours = [\"red\", \"green\", \"blue\"]\n# TODO: write this line\n# TODO: write this line",
              "solution": "colours = [\"red\", \"green\", \"blue\"]\nprint(colours[0])\nprint(colours[-1])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "First and last",
                  "stdin": "",
                  "expectedStdout": "red\nblue\n",
                  "hidden": false
                },
                {
                  "name": "First and last again",
                  "stdin": "",
                  "expectedStdout": "red\nblue\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Indexing a List is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-lists-m1-l3",
            "slug": "python-lists-m1-l3",
            "title": "Lists vs Variables",
            "concept": "A list groups related values under a single name, keeping them in the order you added them. Unlike a set of separate variables, a list can be looped over, counted, and passed around as one value.",
            "syntax": "scores = [88, 92, 79]",
            "exampleCode": "scores = [88, 92, 79]\nprint(scores)\nprint(scores[1])",
            "exampleLanguage": "python",
            "mistake": "Using separate variables for a collection of values instead of a list, which makes loops and counting awkward.",
            "bug": {
              "prompt": "Find the bug: this should print the second score, 92, but it prints 88.",
              "buggyCode": "scores = [88, 92, 79]\nprint(scores[0])",
              "fixedCode": "scores = [88, 92, 79]\nprint(scores[1])",
              "explanation": "Indexes start at 0, so the second item is at index 1, not index 0."
            },
            "exercise": {
              "title": "Check your understanding: Lists vs Variables",
              "type": "multiple-choice",
              "instructions": "Which statement about lists is correct?",
              "starterCode": "",
              "solution": "A list holds many values under one name, in order, and can be changed after creation.",
              "solutionExplanation": "A list holds many values under one name, in order, and can be changed after creation. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A list holds many values under one name, in order, and can be changed after creation.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Lists vs Variables from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A list can only hold numbers.",
                "A list has a fixed size once created.",
                "A list holds many values under one name, in order, and can be changed after creation.",
                "Items in a list have no order."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-lists-m1-l4",
            "slug": "python-lists-m1-l4",
            "title": "Appending Items",
            "concept": "append() adds one item to the end of a list, growing it by one. It changes the list in place and returns None, so you must not assign its result back to the list.",
            "syntax": "fruits.append(\"mango\")",
            "exampleCode": "fruits = [\"apple\"]\nfruits.append(\"banana\")\nprint(fruits)",
            "exampleLanguage": "python",
            "mistake": "Writing fruits = fruits.append(\"mango\"), which sets fruits to None because append() returns None.",
            "bug": {
              "prompt": "Find the bug: this should print the list with mango added but it prints None.",
              "buggyCode": "fruits = [\"apple\"]\nfruits = fruits.append(\"mango\")\nprint(fruits)",
              "fixedCode": "fruits = [\"apple\"]\nfruits.append(\"mango\")\nprint(fruits)",
              "explanation": "append() changes the list in place and returns None, so assigning its result replaces the list with None."
            },
            "exercise": {
              "title": "Practise Appending Items",
              "type": "write-code",
              "instructions": "Start with the list [\"red\", \"green\"], append \"blue\", then print the list.",
              "starterCode": "colours = [\"red\", \"green\"]\ncolours.append(\"blue\")\n# TODO: write this line",
              "solution": "colours = [\"red\", \"green\"]\ncolours.append(\"blue\")\nprint(colours)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Append blue",
                  "stdin": "",
                  "expectedStdout": "['red', 'green', 'blue']\n",
                  "hidden": false
                },
                {
                  "name": "Append blue again",
                  "stdin": "",
                  "expectedStdout": "['red', 'green', 'blue']\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Appending Items is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-lists-m1-l5",
            "slug": "python-lists-m1-l5",
            "title": "Negative Indexing",
            "concept": "Negative indexes count backwards from the end of a list, so -1 is the last item and -len(list) is the first. They are handy when you need the end of a list without knowing its length.",
            "syntax": "scores[-1]  # last score",
            "exampleCode": "scores = [88, 92, 79]\nprint(scores[-1])\nprint(scores[-3])",
            "exampleLanguage": "python",
            "mistake": "Using -0 expecting the last item, when -0 is the same as 0, the first item.",
            "bug": {
              "prompt": "Find the bug: this should print the last score, 79, but it prints 88.",
              "buggyCode": "scores = [88, 92, 79]\nprint(scores[-0])",
              "fixedCode": "scores = [88, 92, 79]\nprint(scores[-1])",
              "explanation": "-0 is the same as 0, which is the first item; the last item is at -1."
            },
            "exercise": {
              "title": "Check your understanding: Negative Indexing",
              "type": "multiple-choice",
              "instructions": "Which statement about negative indexes is correct?",
              "starterCode": "",
              "solution": "fruits[-1] is the last item and fruits[-2] is the one before it.",
              "solutionExplanation": "fruits[-1] is the last item and fruits[-2] is the one before it. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "fruits[-1] is the last item and fruits[-2] is the one before it.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Negative Indexing from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "fruits[-1] is the last item and fruits[-2] is the one before it.",
                "fruits[-1] is the first item.",
                "Negative indexes start counting from 0 at the end.",
                "Negative indexes only work on strings, not on lists."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-lists-m2",
        "title": "Lists in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-lists-m2-l1",
            "slug": "python-lists-m2-l1",
            "title": "The len() of a List",
            "concept": "len() returns how many items a list holds, and it is the usual way to check whether a list is empty or to loop over its indexes. An empty list has length 0 and is falsy in a boolean context.",
            "syntax": "len(scores)  # 3",
            "exampleCode": "scores = [88, 92, 79]\nprint(len(scores))\nprint(len([]))",
            "exampleLanguage": "python",
            "mistake": "Calling len() on a single value instead of a list, which raises TypeError.",
            "bug": {
              "prompt": "Find the bug: this should print 3 but it crashes.",
              "buggyCode": "print(len(88))",
              "fixedCode": "print(len([88, 92, 79]))",
              "explanation": "len() needs a collection such as a list; a single number has no length."
            },
            "exercise": {
              "title": "Practise The len() of a List",
              "type": "write-code",
              "instructions": "Read three numbers from input, store them in a list, and print how many numbers are in the list.",
              "starterCode": "a = int(input())\nb = int(input())\nc = int(input())\nscores = [a, b, c]\n# TODO: write this line",
              "solution": "a = int(input())\nb = int(input())\nc = int(input())\nscores = [a, b, c]\nprint(len(scores))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "3 numbers",
                  "stdin": "5\n6\n7\n",
                  "expectedStdout": "3\n",
                  "hidden": false
                },
                {
                  "name": "3 more",
                  "stdin": "1\n2\n3\n",
                  "expectedStdout": "3\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The len() of a List is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-lists-m2-l2",
            "slug": "python-lists-m2-l2",
            "title": "Looping Over a List",
            "concept": "A for loop visits each item of a list in order, binding the item to a loop variable one at a time. Looping over the list directly is clearer and safer than looping over indexes.",
            "syntax": "for fruit in fruits:\n    print(fruit)",
            "exampleCode": "fruits = [\"apple\", \"banana\"]\nfor fruit in fruits:\n    print(fruit)",
            "exampleLanguage": "python",
            "mistake": "Modifying a list while looping over it, which skips items or produces surprising results.",
            "bug": {
              "prompt": "Find the bug: this should print all three fruits but it prints only two.",
              "buggyCode": "fruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    fruits.remove(fruit)\n    print(fruit)",
              "fixedCode": "fruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit)",
              "explanation": "Removing items while looping over the same list shifts the remaining items and skips some; loop over a copy if you must remove items."
            },
            "exercise": {
              "title": "Practise Looping Over a List",
              "type": "write-code",
              "instructions": "Print each colour in the list [\"red\", \"green\", \"blue\"] on its own line, using a for loop.",
              "starterCode": "colours = [\"red\", \"green\", \"blue\"]\nfor colour in colours:\n# TODO: write this line",
              "solution": "colours = [\"red\", \"green\", \"blue\"]\nfor colour in colours:\n    print(colour)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print colours",
                  "stdin": "",
                  "expectedStdout": "red\ngreen\nblue\n",
                  "hidden": false
                },
                {
                  "name": "Print colours again",
                  "stdin": "",
                  "expectedStdout": "red\ngreen\nblue\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Looping Over a List is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-lists-m2-l3",
            "slug": "python-lists-m2-l3",
            "title": "The in Operator",
            "concept": "in tests whether a value is present in a list, returning True or False. It is the clearest way to check membership, and it works on strings, tuples, sets, and dictionaries too.",
            "syntax": "\"banana\" in fruits",
            "exampleCode": "fruits = [\"apple\", \"banana\"]\nprint(\"banana\" in fruits)\nprint(\"mango\" in fruits)",
            "exampleLanguage": "python",
            "mistake": "Using in on a string when you meant to check a list of words, and matching a substring instead of a whole word.",
            "bug": {
              "prompt": "Find the bug: this should print False but it prints True.",
              "buggyCode": "print(\"app\" in \"apple\")",
              "fixedCode": "print(\"app\" in [\"apple\", \"banana\"])",
              "explanation": "in on a string tests for a substring, so \"app\" is in \"apple\"; in on a list tests for a whole item."
            },
            "exercise": {
              "title": "Check your understanding: The in Operator",
              "type": "multiple-choice",
              "instructions": "Which statement about the in operator is correct?",
              "starterCode": "",
              "solution": "\"banana\" in fruits is True when the list contains banana, and False otherwise.",
              "solutionExplanation": "\"banana\" in fruits is True when the list contains banana, and False otherwise. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "\"banana\" in fruits is True when the list contains banana, and False otherwise.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of The in Operator from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "The in operator only works with numbers.",
                "\"banana\" in fruits returns the position of banana.",
                "The in operator adds an item to a list if it is missing.",
                "\"banana\" in fruits is True when the list contains banana, and False otherwise."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-lists-m2-l4",
            "slug": "python-lists-m2-l4",
            "title": "Lists of Numbers",
            "concept": "Lists of numbers work with the built-in functions sum(), min(), and max(), which add them up or find the smallest and largest. These functions turn a list of numbers into a single summary value in one call.",
            "syntax": "sum([1, 2, 3])  # 6",
            "exampleCode": "scores = [88, 92, 79]\nprint(sum(scores))\nprint(min(scores))\nprint(max(scores))",
            "exampleLanguage": "python",
            "mistake": "Calling sum() on a list that contains strings, which raises TypeError.",
            "bug": {
              "prompt": "Find the bug: this should print 259 but it crashes.",
              "buggyCode": "scores = [\"88\", \"92\", \"79\"]\nprint(sum(scores))",
              "fixedCode": "scores = [88, 92, 79]\nprint(sum(scores))",
              "explanation": "sum() needs numbers; the strings must be converted to ints first."
            },
            "exercise": {
              "title": "Practise Lists of Numbers",
              "type": "write-code",
              "instructions": "Read three numbers from input and print their total.",
              "starterCode": "a = int(input())\nb = int(input())\nc = int(input())\n# TODO: write this line",
              "solution": "a = int(input())\nb = int(input())\nc = int(input())\nprint(a + b + c)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "1+2+3",
                  "stdin": "1\n2\n3\n",
                  "expectedStdout": "6\n",
                  "hidden": false
                },
                {
                  "name": "10+20+30",
                  "stdin": "10\n20\n30\n",
                  "expectedStdout": "60\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Lists of Numbers is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-lists-m2-l5",
            "slug": "python-lists-m2-l5",
            "title": "A Shopping List Program",
            "concept": "A shopping list program combines everything about lists: create the list, add items, count them, and print them one by one. Small programs like this are the pattern for most list-based tools, from playlists to to-do lists.",
            "syntax": "items = []\nitems.append(x)",
            "exampleCode": "items = []\nitems.append(\"milk\")\nitems.append(\"bread\")\nprint(items)",
            "exampleLanguage": "python",
            "mistake": "Starting with items = None instead of items = [], then calling append() on None.",
            "bug": {
              "prompt": "Find the bug: this should print the shopping list but it crashes.",
              "buggyCode": "items = None\nitems.append(\"milk\")\nprint(items)",
              "fixedCode": "items = []\nitems.append(\"milk\")\nprint(items)",
              "explanation": "append() needs a real list; start with an empty list [] instead of None."
            },
            "exercise": {
              "title": "Practise A Shopping List Program",
              "type": "write-code",
              "instructions": "Read three shopping items from input, store them in a list, and print the list.",
              "starterCode": "a = input()\nb = input()\nc = input()\nitems = [a, b, c]\n# TODO: write this line",
              "solution": "a = input()\nb = input()\nc = input()\nitems = [a, b, c]\nprint(items)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "milk bread eggs",
                  "stdin": "milk\nbread\neggs\n",
                  "expectedStdout": "['milk', 'bread', 'eggs']\n",
                  "hidden": false
                },
                {
                  "name": "a b c",
                  "stdin": "a\nb\nc\n",
                  "expectedStdout": "['a', 'b', 'c']\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Shopping List Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Lists Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads three scores, stores them in a list, then prints the list, the total, and the average, each on its own line.",
      "starterCode": "a = int(input())\nb = int(input())\nc = int(input())\nscores = [a, b, c]\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line",
      "solution": "a = int(input())\nb = int(input())\nc = int(input())\nscores = [a, b, c]\nprint(scores)\nprint(sum(scores))\nprint(sum(scores) / 3)",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "88 92 79",
          "stdin": "88\n92\n79\n",
          "expectedStdout": "[88, 92, 79]\n259\n86.33333333333333\n",
          "hidden": false
        },
        {
          "name": "100 90 80",
          "stdin": "100\n90\n80\n",
          "expectedStdout": "[100, 90, 80]\n270\n90.0\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Lists Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Lists Capstone Project",
      "description": "A small end-to-end Python program that puts Lists into practice.",
      "requirements": [
        "Use the core ideas of Lists in a working Python program.",
        "Apply at least three of these skills: Creating lists, Indexing, Appending, len().",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Lists correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-list-methods",
    "slug": "python-list-methods",
    "language": "python",
    "category": "languages",
    "title": "List Methods & Slicing",
    "description": "Go deeper with lists: insert, remove, sort, slice, copy, and the built-in summary functions \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "append()/insert()",
      "remove()/pop()",
      "sort()/sorted()",
      "reverse()",
      "count()/index()",
      "Slicing lists",
      "Copying lists",
      "min()/max()/sum()"
    ],
    "prerequisites": [
      "python-lists"
    ],
    "analogy": "Learning {topic} is like learning to organise a bookshelf: once you can add, remove, sort, and copy books, the shelf always stays tidy.",
    "modules": [
      {
        "id": "python-list-methods-m1",
        "title": "List Methods & Slicing Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-list-methods-m1-l1",
            "slug": "python-list-methods-m1-l1",
            "title": "append() and insert()",
            "concept": "append() adds an item to the end of a list, while insert(index, item) puts it at a chosen position, shifting later items right. Both change the list in place and return None.",
            "syntax": "nums.insert(1, 99)",
            "exampleCode": "nums = [1, 2, 3]\nnums.append(4)\nnums.insert(1, 99)\nprint(nums)",
            "exampleLanguage": "python",
            "mistake": "Using insert() with an index past the end and expecting an error, when Python just appends at the end.",
            "bug": {
              "prompt": "Find the bug: this should print [1, 99, 2, 3] but it prints [1, 2, 3, 99].",
              "buggyCode": "nums = [1, 2, 3]\nnums.insert(3, 99)\nprint(nums)",
              "fixedCode": "nums = [1, 2, 3]\nnums.insert(1, 99)\nprint(nums)",
              "explanation": "insert(3, 99) puts 99 at index 3, the end; to place it second, use index 1."
            },
            "exercise": {
              "title": "Practise append() and insert()",
              "type": "write-code",
              "instructions": "Start with [1, 2, 3], insert 99 at index 1, then print the list.",
              "starterCode": "nums = [1, 2, 3]\nnums.insert(1, 99)\n# TODO: write this line",
              "solution": "nums = [1, 2, 3]\nnums.insert(1, 99)\nprint(nums)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Insert 99",
                  "stdin": "",
                  "expectedStdout": "[1, 99, 2, 3]\n",
                  "hidden": false
                },
                {
                  "name": "Insert 99 again",
                  "stdin": "",
                  "expectedStdout": "[1, 99, 2, 3]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "append() and insert() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-list-methods-m1-l2",
            "slug": "python-list-methods-m1-l2",
            "title": "Removing Items with remove() and pop()",
            "concept": "remove(value) deletes the first item equal to the value, while pop() removes and returns the last item, or the item at a given index. remove() raises ValueError when the value is not in the list.",
            "syntax": "nums.pop()  # last item",
            "exampleCode": "nums = [1, 2, 3]\nnums.remove(2)\nprint(nums.pop())\nprint(nums)",
            "exampleLanguage": "python",
            "mistake": "Calling remove() with a value that is not in the list, which raises ValueError.",
            "bug": {
              "prompt": "Find the bug: this should remove 2 but it crashes.",
              "buggyCode": "nums = [1, 3, 5]\nnums.remove(2)\nprint(nums)",
              "fixedCode": "nums = [1, 2, 3]\nnums.remove(2)\nprint(nums)",
              "explanation": "remove() raises ValueError when the value is missing; the list must actually contain 2."
            },
            "exercise": {
              "title": "Practise Removing Items with remove() and pop()",
              "type": "write-code",
              "instructions": "Start with [\"a\", \"b\", \"c\"], remove \"b\", then print the list.",
              "starterCode": "letters = [\"a\", \"b\", \"c\"]\nletters.remove(\"b\")\n# TODO: write this line",
              "solution": "letters = [\"a\", \"b\", \"c\"]\nletters.remove(\"b\")\nprint(letters)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Remove b",
                  "stdin": "",
                  "expectedStdout": "['a', 'c']\n",
                  "hidden": false
                },
                {
                  "name": "Remove b again",
                  "stdin": "",
                  "expectedStdout": "['a', 'c']\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Removing Items with remove() and pop() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-list-methods-m1-l3",
            "slug": "python-list-methods-m1-l3",
            "title": "Mutation",
            "concept": "Most list methods mutate the list they are called on, changing it in place and returning None. This is different from string methods, which return new strings, and it is why assigning the result of append() or sort() is a common bug.",
            "syntax": "nums.sort()  # in place",
            "exampleCode": "nums = [3, 1, 2]\nnums.sort()\nprint(nums)",
            "exampleLanguage": "python",
            "mistake": "Assigning the result of sort() back to the variable, which replaces the list with None.",
            "bug": {
              "prompt": "Find the bug: this should print the sorted list but it prints None.",
              "buggyCode": "nums = [3, 1, 2]\nnums = nums.sort()\nprint(nums)",
              "fixedCode": "nums = [3, 1, 2]\nnums.sort()\nprint(nums)",
              "explanation": "sort() returns None and sorts in place; calling it without assignment is enough."
            },
            "exercise": {
              "title": "Check your understanding: Mutation",
              "type": "multiple-choice",
              "instructions": "Which statement about list methods is correct?",
              "starterCode": "",
              "solution": "Methods such as append() and sort() change the list in place and return None.",
              "solutionExplanation": "Methods such as append() and sort() change the list in place and return None. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Methods such as append() and sort() change the list in place and return None.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Mutation from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "append() returns a new list and leaves the original unchanged.",
                "sort() returns a sorted copy of the list.",
                "Methods such as append() and sort() change the list in place and return None.",
                "List methods never change the list they are called on."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-list-methods-m1-l4",
            "slug": "python-list-methods-m1-l4",
            "title": "Sorting with sort()",
            "concept": "sort() orders a list in place, ascending by default, and sort(reverse=True) orders it descending. It works on numbers and strings, but mixing types raises TypeError because Python cannot compare them.",
            "syntax": "nums.sort(reverse=True)",
            "exampleCode": "nums = [3, 1, 2]\nnums.sort()\nprint(nums)\nnums.sort(reverse=True)\nprint(nums)",
            "exampleLanguage": "python",
            "mistake": "Sorting a list of mixed types, such as numbers and strings, which raises TypeError.",
            "bug": {
              "prompt": "Find the bug: this should print [1, 2, 3] but it crashes.",
              "buggyCode": "nums = [3, \"1\", 2]\nnums.sort()\nprint(nums)",
              "fixedCode": "nums = [3, 1, 2]\nnums.sort()\nprint(nums)",
              "explanation": "Python cannot compare a string with a number, so a list must hold one comparable type to sort."
            },
            "exercise": {
              "title": "Practise Sorting with sort()",
              "type": "write-code",
              "instructions": "Sort the list [5, 2, 8, 1] in ascending order and print it.",
              "starterCode": "nums = [5, 2, 8, 1]\nnums.sort()\n# TODO: write this line",
              "solution": "nums = [5, 2, 8, 1]\nnums.sort()\nprint(nums)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Sort numbers",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 5, 8]\n",
                  "hidden": false
                },
                {
                  "name": "Sort numbers again",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 5, 8]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Sorting with sort() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-list-methods-m1-l5",
            "slug": "python-list-methods-m1-l5",
            "title": "sorted() vs sort()",
            "concept": "sorted() is a built-in function that returns a new list in sorted order and never touches the original, while the sort() method rearranges the list itself. Use sorted() when you need to keep the original order, and sort() when you do not.",
            "syntax": "new = sorted(nums)",
            "exampleCode": "nums = [3, 1, 2]\nprint(sorted(nums))\nprint(nums)",
            "exampleLanguage": "python",
            "mistake": "Using sorted() and expecting the original list to be sorted afterwards.",
            "bug": {
              "prompt": "Find the bug: this should print [1, 2, 3] but it prints [3, 1, 2].",
              "buggyCode": "nums = [3, 1, 2]\nsorted(nums)\nprint(nums)",
              "fixedCode": "nums = [3, 1, 2]\nnums = sorted(nums)\nprint(nums)",
              "explanation": "sorted() returns a new list and leaves the original unchanged; assign the result to keep it."
            },
            "exercise": {
              "title": "Check your understanding: sorted() vs sort()",
              "type": "multiple-choice",
              "instructions": "Which statement about sorted() and sort() is correct?",
              "starterCode": "",
              "solution": "sorted() returns a new sorted list and leaves the original alone, while sort() sorts in place and returns None.",
              "solutionExplanation": "sorted() returns a new sorted list and leaves the original alone, while sort() sorts in place and returns None. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "sorted() returns a new sorted list and leaves the original alone, while sort() sorts in place and returns None.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of sorted() vs sort() from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "sorted() returns a new sorted list and leaves the original alone, while sort() sorts in place and returns None.",
                "sorted() and sort() do exactly the same thing.",
                "sort() returns a new list and sorted() sorts in place.",
                "sorted() can only sort numbers, not strings."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-list-methods-m2",
        "title": "List Methods & Slicing in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-list-methods-m2-l1",
            "slug": "python-list-methods-m2-l1",
            "title": "Slicing a List",
            "concept": "Slicing a list with [start:stop] returns a new list with the items from start up to, but not including, stop. Slices never raise IndexError when they run past the end, and a slice is a copy, so changing it does not change the original.",
            "syntax": "nums[1:3]  # slice",
            "exampleCode": "nums = [1, 2, 3, 4]\nprint(nums[1:3])\nprint(nums[:2])\nprint(nums[::-1])",
            "exampleLanguage": "python",
            "mistake": "Expecting a slice to be a live view of the original list, when it is an independent copy.",
            "bug": {
              "prompt": "Find the bug: this should print [2, 3] but it prints [1, 2].",
              "buggyCode": "nums = [1, 2, 3, 4]\nprint(nums[0:2])",
              "fixedCode": "nums = [1, 2, 3, 4]\nprint(nums[1:3])",
              "explanation": "The slice starts at index 0, not 1; use [1:3] to get the second and third items."
            },
            "exercise": {
              "title": "Practise Slicing a List",
              "type": "write-code",
              "instructions": "Print the middle two items of the list [10, 20, 30, 40] using a slice.",
              "starterCode": "nums = [10, 20, 30, 40]\n# TODO: write this line",
              "solution": "nums = [10, 20, 30, 40]\nprint(nums[1:3])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Middle two",
                  "stdin": "",
                  "expectedStdout": "[20, 30]\n",
                  "hidden": false
                },
                {
                  "name": "Middle two again",
                  "stdin": "",
                  "expectedStdout": "[20, 30]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Slicing a List is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-list-methods-m2-l2",
            "slug": "python-list-methods-m2-l2",
            "title": "Copying a List",
            "concept": "Assigning a list to a new name copies the reference, not the list, so both names point at the same list. To get an independent copy, use list.copy(), a full slice [:], or the list() constructor.",
            "syntax": "copy = nums.copy()",
            "exampleCode": "nums = [1, 2, 3]\ncopy = nums.copy()\ncopy.append(4)\nprint(nums)\nprint(copy)",
            "exampleLanguage": "python",
            "mistake": "Copying with = and then being surprised when changing the copy changes the original too.",
            "bug": {
              "prompt": "Find the bug: this should print [1, 2, 3] then [1, 2, 3, 4] but it prints [1, 2, 3, 4] twice.",
              "buggyCode": "nums = [1, 2, 3]\ncopy = nums\ncopy.append(4)\nprint(nums)\nprint(copy)",
              "fixedCode": "nums = [1, 2, 3]\ncopy = nums.copy()\ncopy.append(4)\nprint(nums)\nprint(copy)",
              "explanation": "copy = nums only copies the reference, so both names share one list; .copy() makes a separate list."
            },
            "exercise": {
              "title": "Practise Copying a List",
              "type": "write-code",
              "instructions": "Copy the list [1, 2, 3] with .copy(), append 4 to the copy, then print the original list.",
              "starterCode": "nums = [1, 2, 3]\ncopy = nums.copy()\n# TODO: write this line\nprint(nums)",
              "solution": "nums = [1, 2, 3]\ncopy = nums.copy()\ncopy.append(4)\nprint(nums)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Copy and append",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 3]\n",
                  "hidden": false
                },
                {
                  "name": "Copy and append again",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 3]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Copying a List is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-list-methods-m2-l3",
            "slug": "python-list-methods-m2-l3",
            "title": "List Aliasing",
            "concept": "A list variable holds a reference to the list, not the list itself, so assignment shares that reference between names. Changes made through one name are visible through the other, which is called aliasing.",
            "syntax": "a = [1, 2]\nb = a",
            "exampleCode": "a = [1, 2]\nb = a\nb.append(3)\nprint(a)",
            "exampleLanguage": "python",
            "mistake": "Passing a list to a function and forgetting the function can change the caller's list.",
            "bug": {
              "prompt": "Find the bug: this should leave a unchanged but a gains an item.",
              "buggyCode": "a = [1, 2]\nb = a\nb.append(3)\nprint(a)",
              "fixedCode": "a = [1, 2]\nb = a.copy()\nb.append(3)\nprint(a)",
              "explanation": "b = a aliases the same list, so appending through b changes a; copy the list first."
            },
            "exercise": {
              "title": "Check your understanding: List Aliasing",
              "type": "multiple-choice",
              "instructions": "Which statement about list assignment is correct?",
              "starterCode": "",
              "solution": "Assigning a list to another name makes both names refer to the same list.",
              "solutionExplanation": "Assigning a list to another name makes both names refer to the same list. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Assigning a list to another name makes both names refer to the same list.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of List Aliasing from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Assigning a list to another name always makes an independent copy.",
                "Two names for the same list can never affect each other.",
                "Lists cannot be assigned to more than one name.",
                "Assigning a list to another name makes both names refer to the same list."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-list-methods-m2-l4",
            "slug": "python-list-methods-m2-l4",
            "title": "min(), max() and sum()",
            "concept": "min() returns the smallest item, max() the largest, and sum() the total of a list of numbers. They all take any iterable, so they work on lists, tuples, and other collections.",
            "syntax": "max([1, 2, 3])  # 3",
            "exampleCode": "nums = [4, 9, 2]\nprint(min(nums))\nprint(max(nums))\nprint(sum(nums))",
            "exampleLanguage": "python",
            "mistake": "Calling min() or max() on an empty list, which raises ValueError.",
            "bug": {
              "prompt": "Find the bug: this should print 9 but it crashes.",
              "buggyCode": "print(max([]))",
              "fixedCode": "print(max([4, 9, 2]))",
              "explanation": "max() of an empty list has no answer and raises ValueError; the list must contain at least one item."
            },
            "exercise": {
              "title": "Practise min(), max() and sum()",
              "type": "write-code",
              "instructions": "Read three numbers from input and print the largest one.",
              "starterCode": "a = int(input())\nb = int(input())\nc = int(input())\n# TODO: write this line",
              "solution": "a = int(input())\nb = int(input())\nc = int(input())\nprint(max([a, b, c]))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "5 9 2",
                  "stdin": "5\n9\n2\n",
                  "expectedStdout": "9\n",
                  "hidden": false
                },
                {
                  "name": "3 1 7",
                  "stdin": "3\n1\n7\n",
                  "expectedStdout": "7\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "min(), max() and sum() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-list-methods-m2-l5",
            "slug": "python-list-methods-m2-l5",
            "title": "Managing a Playlist",
            "concept": "A playlist is a list of songs you can add to, remove from, sort, and print. Building one program that uses several list methods together shows how the methods combine into a small, useful tool.",
            "syntax": "playlist = []\nplaylist.append(song)",
            "exampleCode": "playlist = [\"Song A\", \"Song B\"]\nplaylist.append(\"Song C\")\nplaylist.sort()\nprint(playlist)",
            "exampleLanguage": "python",
            "mistake": "Removing a song with remove() when it is not in the playlist, which raises ValueError.",
            "bug": {
              "prompt": "Find the bug: this should print the playlist but it crashes.",
              "buggyCode": "playlist = [\"Song A\"]\nplaylist.remove(\"Song Z\")\nprint(playlist)",
              "fixedCode": "playlist = [\"Song A\"]\nplaylist.append(\"Song B\")\nprint(playlist)",
              "explanation": "remove() raises ValueError when the song is missing; the song must be in the list first."
            },
            "exercise": {
              "title": "Practise Managing a Playlist",
              "type": "write-code",
              "instructions": "Read three song titles from input, sort them alphabetically, and print the sorted list.",
              "starterCode": "a = input()\nb = input()\nc = input()\nplaylist = [a, b, c]\nplaylist.sort()\n# TODO: write this line",
              "solution": "a = input()\nb = input()\nc = input()\nplaylist = [a, b, c]\nplaylist.sort()\nprint(playlist)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "C A B",
                  "stdin": "C\nA\nB\n",
                  "expectedStdout": "['A', 'B', 'C']\n",
                  "hidden": false
                },
                {
                  "name": "z m a",
                  "stdin": "z\nm\na\n",
                  "expectedStdout": "['a', 'm', 'z']\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Managing a Playlist is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise List Methods & Slicing Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads three song titles, sorts them alphabetically, then prints the sorted list, the number of songs, and the first song, each on its own line.",
      "starterCode": "a = input()\nb = input()\nc = input()\nplaylist = [a, b, c]\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line",
      "solution": "a = input()\nb = input()\nc = input()\nplaylist = [a, b, c]\nplaylist.sort()\nprint(playlist)\nprint(len(playlist))\nprint(playlist[0])",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "C A B",
          "stdin": "C\nA\nB\n",
          "expectedStdout": "['A', 'B', 'C']\n3\nA\n",
          "hidden": false
        },
        {
          "name": "z m a",
          "stdin": "z\nm\na\n",
          "expectedStdout": "['a', 'm', 'z']\n3\na\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "List Methods & Slicing Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "List Methods & Slicing Capstone Project",
      "description": "A small end-to-end Python program that puts List Methods & Slicing into practice.",
      "requirements": [
        "Use the core ideas of List Methods & Slicing in a working Python program.",
        "Apply at least three of these skills: append()/insert(), remove()/pop(), sort()/sorted(), reverse().",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates List Methods & Slicing correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-dicts",
    "slug": "python-dicts",
    "language": "python",
    "category": "languages",
    "title": "Dictionaries",
    "description": "Learn Python dictionaries \u2014 key-value pairs, lookups, get(), and looping over entries \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "Creating dicts",
      "Accessing values",
      "Adding/updating keys",
      "keys()/values()/items()",
      "get() with default",
      "in for dicts",
      "Nested dicts",
      "Looping over dicts"
    ],
    "prerequisites": [
      "python-lists"
    ],
    "analogy": "Learning {topic} is like learning to use a real dictionary: once you know how to look a word up by its spelling, every definition is one lookup away.",
    "modules": [
      {
        "id": "python-dicts-m1",
        "title": "Dictionaries Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-dicts-m1-l1",
            "slug": "python-dicts-m1-l1",
            "title": "Creating a Dictionary",
            "concept": "A dictionary stores key-value pairs inside curly braces, so you can look up a value by its key instead of by a position. Keys are usually strings, values can be anything, and each key appears only once.",
            "syntax": "ages = {\"Ada\": 36, \"Grace\": 28}",
            "exampleCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nprint(ages)\nprint(len(ages))",
            "exampleLanguage": "python",
            "mistake": "Using a list as a dictionary key, which raises TypeError because keys must be hashable.",
            "bug": {
              "prompt": "Find the bug: this dictionary should be created but it crashes.",
              "buggyCode": "scores = {[1, 2]: 10}\nprint(scores)",
              "fixedCode": "scores = {\"team1\": 10}\nprint(scores)",
              "explanation": "Lists are unhashable and cannot be dictionary keys; use a string or a tuple instead."
            },
            "exercise": {
              "title": "Practise Creating a Dictionary",
              "type": "write-code",
              "instructions": "Create a dictionary with the keys \"red\" and \"blue\" mapped to 1 and 2, then print it.",
              "starterCode": "colours = {\"red\": 1, \"blue\": 2}\n# TODO: write this line",
              "solution": "colours = {\"red\": 1, \"blue\": 2}\nprint(colours)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print dict",
                  "stdin": "",
                  "expectedStdout": "{'red': 1, 'blue': 2}\n",
                  "hidden": false
                },
                {
                  "name": "Print dict again",
                  "stdin": "",
                  "expectedStdout": "{'red': 1, 'blue': 2}\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Creating a Dictionary is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-dicts-m1-l2",
            "slug": "python-dicts-m1-l2",
            "title": "Accessing Values by Key",
            "concept": "You read a value from a dictionary with square brackets and its key, just like indexing a list but with a name instead of a number. Asking for a missing key raises KeyError, which is why get() exists.",
            "syntax": "ages[\"Ada\"]  # 36",
            "exampleCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nprint(ages[\"Ada\"])",
            "exampleLanguage": "python",
            "mistake": "Using a key that does not exist and getting KeyError instead of a default value.",
            "bug": {
              "prompt": "Find the bug: this should print 28 but it crashes.",
              "buggyCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nprint(ages[\"grace\"])",
              "fixedCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nprint(ages[\"Grace\"])",
              "explanation": "Dictionary keys are case-sensitive, so \"grace\" and \"Grace\" are different keys."
            },
            "exercise": {
              "title": "Practise Accessing Values by Key",
              "type": "write-code",
              "instructions": "Read a name from input and print that person's age from the dictionary {\"Ada\": 36, \"Grace\": 28}.",
              "starterCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nname = input()\n# TODO: write this line",
              "solution": "ages = {\"Ada\": 36, \"Grace\": 28}\nname = input()\nprint(ages[name])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada",
                  "stdin": "Ada\n",
                  "expectedStdout": "36\n",
                  "hidden": false
                },
                {
                  "name": "Grace",
                  "stdin": "Grace\n",
                  "expectedStdout": "28\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Accessing Values by Key is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-dicts-m1-l3",
            "slug": "python-dicts-m1-l3",
            "title": "Dictionary Keys",
            "concept": "Dictionary keys must be hashable, which means strings, numbers, and tuples work, but lists and other dictionaries do not. Assigning to an existing key replaces its value instead of adding a second entry.",
            "syntax": "d = {\"a\": 1}",
            "exampleCode": "d = {\"a\": 1}\nd[\"a\"] = 2\nprint(d)",
            "exampleLanguage": "python",
            "mistake": "Expecting a dictionary to keep two entries with the same key.",
            "bug": {
              "prompt": "Find the bug: this should store two ages but it stores one.",
              "buggyCode": "ages = {\"Ada\": 36, \"Ada\": 28}\nprint(len(ages))",
              "fixedCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nprint(len(ages))",
              "explanation": "Duplicate keys collapse into one entry; use different keys for different people."
            },
            "exercise": {
              "title": "Check your understanding: Dictionary Keys",
              "type": "multiple-choice",
              "instructions": "Which statement about dictionary keys is correct?",
              "starterCode": "",
              "solution": "Keys must be unique and hashable, and each key maps to one value.",
              "solutionExplanation": "Keys must be unique and hashable, and each key maps to one value. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Keys must be unique and hashable, and each key maps to one value.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Dictionary Keys from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A dictionary can hold the same key twice with different values.",
                "Lists can be used as dictionary keys.",
                "Keys must be unique and hashable, and each key maps to one value.",
                "Dictionary keys are always numbers."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-dicts-m1-l4",
            "slug": "python-dicts-m1-l4",
            "title": "Adding and Updating Entries",
            "concept": "Assigning to a new key adds an entry to a dictionary, and assigning to an existing key replaces its value. This single operation is how dictionaries grow and change over time.",
            "syntax": "ages[\"Alan\"] = 41",
            "exampleCode": "ages = {\"Ada\": 36}\nages[\"Alan\"] = 41\nages[\"Ada\"] = 37\nprint(ages)",
            "exampleLanguage": "python",
            "mistake": "Using append() on a dictionary, which has no append method.",
            "bug": {
              "prompt": "Find the bug: this should add Alan but it crashes.",
              "buggyCode": "ages = {\"Ada\": 36}\nages.append(\"Alan\", 41)\nprint(ages)",
              "fixedCode": "ages = {\"Ada\": 36}\nages[\"Alan\"] = 41\nprint(ages)",
              "explanation": "Dictionaries have no append() method; add an entry by assigning to its key."
            },
            "exercise": {
              "title": "Practise Adding and Updating Entries",
              "type": "write-code",
              "instructions": "Start with {\"Ada\": 36}, add \"Grace\": 28, then print the dictionary.",
              "starterCode": "ages = {\"Ada\": 36}\nages[\"Grace\"] = 28\n# TODO: write this line",
              "solution": "ages = {\"Ada\": 36}\nages[\"Grace\"] = 28\nprint(ages)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Add Grace",
                  "stdin": "",
                  "expectedStdout": "{'Ada': 36, 'Grace': 28}\n",
                  "hidden": false
                },
                {
                  "name": "Add Grace again",
                  "stdin": "",
                  "expectedStdout": "{'Ada': 36, 'Grace': 28}\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Adding and Updating Entries is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-dicts-m1-l5",
            "slug": "python-dicts-m1-l5",
            "title": "KeyError",
            "concept": "Reading a missing key with square brackets raises KeyError, which crashes the program unless caught. The get() method avoids this by returning None, or a default you choose, when the key is absent.",
            "syntax": "ages.get(\"Bob\", 0)",
            "exampleCode": "ages = {\"Ada\": 36}\nprint(ages.get(\"Bob\"))\nprint(ages.get(\"Bob\", 0))",
            "exampleLanguage": "python",
            "mistake": "Using [] for a key that might be missing instead of get() with a sensible default.",
            "bug": {
              "prompt": "Find the bug: this should print 0 for a missing person but it crashes.",
              "buggyCode": "ages = {\"Ada\": 36}\nprint(ages[\"Bob\"])",
              "fixedCode": "ages = {\"Ada\": 36}\nprint(ages.get(\"Bob\", 0))",
              "explanation": "Square brackets raise KeyError for a missing key; get() with a default returns 0 instead."
            },
            "exercise": {
              "title": "Check your understanding: KeyError",
              "type": "multiple-choice",
              "instructions": "Which statement about a missing dictionary key is correct?",
              "starterCode": "",
              "solution": "Accessing a missing key with [] raises KeyError, while get() returns None or a default.",
              "solutionExplanation": "Accessing a missing key with [] raises KeyError, while get() returns None or a default. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Accessing a missing key with [] raises KeyError, while get() returns None or a default.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of KeyError from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Accessing a missing key with [] raises KeyError, while get() returns None or a default.",
                "Accessing a missing key returns None silently.",
                "Accessing a missing key creates it with value 0.",
                "KeyError is raised when a key exists twice."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-dicts-m2",
        "title": "Dictionaries in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-dicts-m2-l1",
            "slug": "python-dicts-m2-l1",
            "title": "get() with a Default",
            "concept": "get(key, default) returns the value for the key when it exists and the default when it does not, without ever raising KeyError. It is the standard way to read optional entries, such as counting how many times a word appears.",
            "syntax": "count = words.get(word, 0)",
            "exampleCode": "ages = {\"Ada\": 36}\nprint(ages.get(\"Ada\", 0))\nprint(ages.get(\"Bob\", 0))",
            "exampleLanguage": "python",
            "mistake": "Forgetting the default argument and getting None back instead of a usable number.",
            "bug": {
              "prompt": "Find the bug: this should print 1 but it crashes.",
              "buggyCode": "counts = {}\ncounts[\"a\"] = counts.get(\"a\") + 1\nprint(counts)",
              "fixedCode": "counts = {}\ncounts[\"a\"] = counts.get(\"a\", 0) + 1\nprint(counts)",
              "explanation": "get() without a default returns None for a missing key, and None + 1 fails; pass 0 as the default."
            },
            "exercise": {
              "title": "Practise get() with a Default",
              "type": "write-code",
              "instructions": "Read a name from input and print the age from {\"Ada\": 36, \"Grace\": 28}, or 0 if the name is not in the dictionary.",
              "starterCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nname = input()\n# TODO: write this line",
              "solution": "ages = {\"Ada\": 36, \"Grace\": 28}\nname = input()\nprint(ages.get(name, 0))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada",
                  "stdin": "Ada\n",
                  "expectedStdout": "36\n",
                  "hidden": false
                },
                {
                  "name": "Bob",
                  "stdin": "Bob\n",
                  "expectedStdout": "0\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "get() with a Default is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-dicts-m2-l2",
            "slug": "python-dicts-m2-l2",
            "title": "Looping Over keys() and items()",
            "concept": "A for loop over a dictionary visits its keys, while .items() gives key-value pairs and .values() gives just the values. Looping over items() is the clearest way to use both the key and the value together.",
            "syntax": "for name, age in ages.items():",
            "exampleCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nfor name, age in ages.items():\n    print(name, age)",
            "exampleLanguage": "python",
            "mistake": "Changing a dictionary's size while looping over it, which raises RuntimeError.",
            "bug": {
              "prompt": "Find the bug: this should print both entries but it crashes.",
              "buggyCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nfor name in ages:\n    ages[name + \"!\"] = 0\n    print(name)",
              "fixedCode": "ages = {\"Ada\": 36, \"Grace\": 28}\nfor name in ages:\n    print(name)",
              "explanation": "Adding keys while looping over a dictionary raises RuntimeError; loop over a copy or collect changes first."
            },
            "exercise": {
              "title": "Practise Looping Over keys() and items()",
              "type": "write-code",
              "instructions": "Print each key and value of the dictionary {\"red\": 1, \"blue\": 2} on its own line, like: red 1",
              "starterCode": "colours = {\"red\": 1, \"blue\": 2}\nfor name, value in colours.items():\n# TODO: write this line",
              "solution": "colours = {\"red\": 1, \"blue\": 2}\nfor name, value in colours.items():\n    print(name, value)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print entries",
                  "stdin": "",
                  "expectedStdout": "red 1\nblue 2\n",
                  "hidden": false
                },
                {
                  "name": "Print entries again",
                  "stdin": "",
                  "expectedStdout": "red 1\nblue 2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Looping Over keys() and items() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-dicts-m2-l3",
            "slug": "python-dicts-m2-l3",
            "title": "Dictionary Ordering",
            "concept": "Since Python 3.7, dictionaries remember the order in which entries were added, so looping over one visits entries in insertion order. Equality between dictionaries ignores order, but iteration does not.",
            "syntax": "list({\"b\": 1, \"a\": 2})",
            "exampleCode": "d = {\"b\": 1, \"a\": 2}\nprint(list(d))\nprint(d == {\"a\": 2, \"b\": 1})",
            "exampleLanguage": "python",
            "mistake": "Assuming two dictionaries with the same entries in different orders are unequal.",
            "bug": {
              "prompt": "Find the bug: this should print True but it prints False.",
              "buggyCode": "print({\"a\": 1, \"b\": 2} == [(\"a\", 1), (\"b\", 2)])",
              "fixedCode": "print({\"a\": 1, \"b\": 2} == {\"b\": 2, \"a\": 1})",
              "explanation": "A dictionary is not equal to a list of pairs; dictionary equality ignores entry order, so the two dicts are equal."
            },
            "exercise": {
              "title": "Check your understanding: Dictionary Ordering",
              "type": "multiple-choice",
              "instructions": "Which statement about dictionaries is correct?",
              "starterCode": "",
              "solution": "Since Python 3.7, dictionaries keep entries in the order they were added.",
              "solutionExplanation": "Since Python 3.7, dictionaries keep entries in the order they were added. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Since Python 3.7, dictionaries keep entries in the order they were added.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Dictionary Ordering from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Dictionaries sort their keys alphabetically by default.",
                "Dictionaries have no order at all, ever.",
                "Dictionary entries are stored in reverse order.",
                "Since Python 3.7, dictionaries keep entries in the order they were added."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-dicts-m2-l4",
            "slug": "python-dicts-m2-l4",
            "title": "Nested Dictionaries",
            "concept": "A dictionary value can itself be a dictionary, which lets you model structured data such as a student with a name, age, and grades. You reach inner values by chaining square brackets, one per level.",
            "syntax": "students[\"Ada\"][\"age\"]",
            "exampleCode": "students = {\"Ada\": {\"age\": 36, \"grade\": \"A\"}}\nprint(students[\"Ada\"][\"age\"])",
            "exampleLanguage": "python",
            "mistake": "Forgetting a level of brackets when reaching into a nested dictionary.",
            "bug": {
              "prompt": "Find the bug: this should print 36 but it prints the whole inner dictionary.",
              "buggyCode": "students = {\"Ada\": {\"age\": 36}}\nprint(students[\"Ada\"])",
              "fixedCode": "students = {\"Ada\": {\"age\": 36}}\nprint(students[\"Ada\"][\"age\"])",
              "explanation": "students[\"Ada\"] returns the inner dictionary; a second [\"age\"] is needed to reach the number."
            },
            "exercise": {
              "title": "Practise Nested Dictionaries",
              "type": "write-code",
              "instructions": "Print the age of Ada from the nested dictionary {\"Ada\": {\"age\": 36, \"city\": \"London\"}}.",
              "starterCode": "students = {\"Ada\": {\"age\": 36, \"city\": \"London\"}}\n# TODO: write this line",
              "solution": "students = {\"Ada\": {\"age\": 36, \"city\": \"London\"}}\nprint(students[\"Ada\"][\"age\"])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print age",
                  "stdin": "",
                  "expectedStdout": "36\n",
                  "hidden": false
                },
                {
                  "name": "Print age again",
                  "stdin": "",
                  "expectedStdout": "36\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Nested Dictionaries is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-dicts-m2-l5",
            "slug": "python-dicts-m2-l5",
            "title": "A Phone Book Program",
            "concept": "A phone book is a dictionary of names to numbers, and the classic operations are look up, add, and list all entries. It shows how a dictionary replaces a long chain of if statements with a single lookup.",
            "syntax": "book = {\"Ada\": \"555-1234\"}",
            "exampleCode": "book = {\"Ada\": \"555-1234\"}\nbook[\"Grace\"] = \"555-9876\"\nprint(book.get(\"Ada\"))",
            "exampleLanguage": "python",
            "mistake": "Storing phone numbers as ints, which drops leading zeros and cannot hold dashes.",
            "bug": {
              "prompt": "Find the bug: this should print 555-1234 but it prints 5551234.",
              "buggyCode": "book = {\"Ada\": 5551234}\nprint(book[\"Ada\"])",
              "fixedCode": "book = {\"Ada\": \"555-1234\"}\nprint(book[\"Ada\"])",
              "explanation": "Phone numbers are text, not numbers; storing one as an int loses the dash and any leading zero."
            },
            "exercise": {
              "title": "Practise A Phone Book Program",
              "type": "write-code",
              "instructions": "Read a name from input and print the phone number from {\"Ada\": \"555-1234\", \"Grace\": \"555-9876\"}, or \"unknown\" if the name is not there.",
              "starterCode": "book = {\"Ada\": \"555-1234\", \"Grace\": \"555-9876\"}\nname = input()\n# TODO: write this line",
              "solution": "book = {\"Ada\": \"555-1234\", \"Grace\": \"555-9876\"}\nname = input()\nprint(book.get(name, \"unknown\"))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada",
                  "stdin": "Ada\n",
                  "expectedStdout": "555-1234\n",
                  "hidden": false
                },
                {
                  "name": "Bob",
                  "stdin": "Bob\n",
                  "expectedStdout": "unknown\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Phone Book Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Dictionaries Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a name, an age, and a grade, stores them in a dictionary, then prints the dictionary and a summary line like: Ada is 36 years old with grade A",
      "starterCode": "name = input()\nage = int(input())\ngrade = input()\nstudent = {\"name\": name, \"age\": age, \"grade\": grade}\n# TODO: write this line\n# TODO: write this line",
      "solution": "name = input()\nage = int(input())\ngrade = input()\nstudent = {\"name\": name, \"age\": age, \"grade\": grade}\nprint(student)\nprint(name + \" is \" + str(age) + \" years old with grade \" + grade)",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Ada 36 A",
          "stdin": "Ada\n36\nA\n",
          "expectedStdout": "{'name': 'Ada', 'age': 36, 'grade': 'A'}\nAda is 36 years old with grade A\n",
          "hidden": false
        },
        {
          "name": "Grace 28 B",
          "stdin": "Grace\n28\nB\n",
          "expectedStdout": "{'name': 'Grace', 'age': 28, 'grade': 'B'}\nGrace is 28 years old with grade B\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Dictionaries Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Dictionaries Capstone Project",
      "description": "A small end-to-end Python program that puts Dictionaries into practice.",
      "requirements": [
        "Use the core ideas of Dictionaries in a working Python program.",
        "Apply at least three of these skills: Creating dicts, Accessing values, Adding/updating keys, keys()/values()/items().",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Dictionaries correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-sets-tuples",
    "slug": "python-sets-tuples",
    "language": "python",
    "category": "languages",
    "title": "Sets & Tuples",
    "description": "Learn tuples and sets \u2014 fixed pairs, unpacking, uniqueness, and set operations \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "Tuples",
      "Tuple unpacking",
      "Sets",
      "Set operations",
      "Membership",
      "Immutable sequences",
      "When to use each",
      "Converting collections"
    ],
    "prerequisites": [
      "python-dicts"
    ],
    "analogy": "Learning {topic} is like learning the difference between a fixed photo frame and a bag of marbles: one holds things in place, the other holds one of each.",
    "modules": [
      {
        "id": "python-sets-tuples-m1",
        "title": "Sets & Tuples Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-sets-tuples-m1-l1",
            "slug": "python-sets-tuples-m1-l1",
            "title": "Tuples and Immutability",
            "concept": "A tuple is an ordered collection written in parentheses, like a list that cannot be changed after creation. Tuples are used for fixed groups of values, such as coordinates or a function's multiple return values.",
            "syntax": "point = (3, 4)",
            "exampleCode": "point = (3, 4)\nprint(point)\nprint(point[0])\nprint(len(point))",
            "exampleLanguage": "python",
            "mistake": "Trying to append to a tuple, which has no append method.",
            "bug": {
              "prompt": "Find the bug: this should print (3, 4, 5) but it crashes.",
              "buggyCode": "point = (3, 4)\npoint.append(5)\nprint(point)",
              "fixedCode": "point = (3, 4)\npoint = point + (5,)\nprint(point)",
              "explanation": "Tuples are immutable and have no append(); adding a one-item tuple creates a new tuple."
            },
            "exercise": {
              "title": "Practise Tuples and Immutability",
              "type": "write-code",
              "instructions": "Create the tuple (10, 20) and print it.",
              "starterCode": "point = (10, 20)\n# TODO: write this line",
              "solution": "point = (10, 20)\nprint(point)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print tuple",
                  "stdin": "",
                  "expectedStdout": "(10, 20)\n",
                  "hidden": false
                },
                {
                  "name": "Print tuple again",
                  "stdin": "",
                  "expectedStdout": "(10, 20)\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Tuples and Immutability is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-sets-tuples-m1-l2",
            "slug": "python-sets-tuples-m1-l2",
            "title": "Tuple Unpacking",
            "concept": "Tuple unpacking assigns each item of a tuple to its own variable in one line, so x, y = (3, 4) sets x to 3 and y to 4. It is the idiomatic way to swap two variables and to receive several values from a function.",
            "syntax": "x, y = (3, 4)",
            "exampleCode": "x, y = (3, 4)\nx, y = y, x\nprint(x, y)",
            "exampleLanguage": "python",
            "mistake": "Unpacking a tuple into the wrong number of variables, which raises ValueError.",
            "bug": {
              "prompt": "Find the bug: this should print 3 and 4 but it crashes.",
              "buggyCode": "x, y, z = (3, 4)\nprint(x, y)",
              "fixedCode": "x, y = (3, 4)\nprint(x, y)",
              "explanation": "Unpacking needs exactly as many variables as there are items; (3, 4) has two items, not three."
            },
            "exercise": {
              "title": "Practise Tuple Unpacking",
              "type": "write-code",
              "instructions": "Read two numbers from input, unpack them into x and y, and print their sum.",
              "starterCode": "x, y = int(input()), int(input())\n# TODO: write this line",
              "solution": "x, y = int(input()), int(input())\nprint(x + y)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "3 4",
                  "stdin": "3\n4\n",
                  "expectedStdout": "7\n",
                  "hidden": false
                },
                {
                  "name": "10 5",
                  "stdin": "10\n5\n",
                  "expectedStdout": "15\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Tuple Unpacking is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-sets-tuples-m1-l3",
            "slug": "python-sets-tuples-m1-l3",
            "title": "Tuple vs List",
            "concept": "Tuples and lists are both ordered collections, but tuples cannot be changed after creation while lists can. Tuples are used for fixed data such as coordinates or dictionary keys, and lists for collections that grow and change.",
            "syntax": "coords = (3, 4)",
            "exampleCode": "coords = (3, 4)\nprint(coords[0])\nprint(len(coords))",
            "exampleLanguage": "python",
            "mistake": "Writing (5) and expecting a one-item tuple, when the parentheses are just grouping and the value is the int 5.",
            "bug": {
              "prompt": "Find the bug: this should print a tuple but it prints 5.",
              "buggyCode": "single = (5)\nprint(single)",
              "fixedCode": "single = (5,)\nprint(single)",
              "explanation": "A one-item tuple needs a trailing comma; (5) is just the number 5 in parentheses."
            },
            "exercise": {
              "title": "Check your understanding: Tuple vs List",
              "type": "multiple-choice",
              "instructions": "Which statement about tuples and lists is correct?",
              "starterCode": "",
              "solution": "Tuples are immutable and lists are mutable; both are ordered and indexed from 0.",
              "solutionExplanation": "Tuples are immutable and lists are mutable; both are ordered and indexed from 0. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Tuples are immutable and lists are mutable; both are ordered and indexed from 0.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Tuple vs List from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Tuples can be changed but lists cannot.",
                "Tuples have no order, while lists do.",
                "Tuples are immutable and lists are mutable; both are ordered and indexed from 0.",
                "Tuples and lists are exactly the same type."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-sets-tuples-m1-l4",
            "slug": "python-sets-tuples-m1-l4",
            "title": "Creating a Set",
            "concept": "A set is an unordered collection of unique values written in curly braces, and duplicates are dropped automatically. Sets are used when you care about membership and uniqueness, not about order or position.",
            "syntax": "tags = {\"red\", \"blue\"}",
            "exampleCode": "tags = {\"red\", \"blue\", \"red\"}\nprint(sorted(tags))\nprint(len(tags))",
            "exampleLanguage": "python",
            "mistake": "Creating an empty set with {}, which actually creates an empty dictionary.",
            "bug": {
              "prompt": "Find the bug: this should print a set with 1 item but it prints an empty dict.",
              "buggyCode": "tags = {}\ntags.add(\"red\")\nprint(tags)",
              "fixedCode": "tags = set()\ntags.add(\"red\")\nprint(sorted(tags))",
              "explanation": "{} is an empty dictionary, not a set; use set() to create an empty set."
            },
            "exercise": {
              "title": "Practise Creating a Set",
              "type": "write-code",
              "instructions": "Create the set {\"a\", \"b\", \"a\"} and print its items sorted \u2014 duplicates should disappear.",
              "starterCode": "letters = {\"a\", \"b\", \"a\"}\n# TODO: write this line",
              "solution": "letters = {\"a\", \"b\", \"a\"}\nprint(sorted(letters))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print sorted set",
                  "stdin": "",
                  "expectedStdout": "['a', 'b']\n",
                  "hidden": false
                },
                {
                  "name": "Print sorted set again",
                  "stdin": "",
                  "expectedStdout": "['a', 'b']\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Creating a Set is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-sets-tuples-m1-l5",
            "slug": "python-sets-tuples-m1-l5",
            "title": "Duplicates in Sets",
            "concept": "Sets store each value only once, so adding a duplicate has no effect and the set's size stays the same. This makes sets ideal for removing duplicates from a list or for tracking which values have been seen.",
            "syntax": "seen = set()",
            "exampleCode": "seen = set()\nseen.add(1)\nseen.add(1)\nprint(len(seen))",
            "exampleLanguage": "python",
            "mistake": "Expecting a set to keep items in the order they were added.",
            "bug": {
              "prompt": "Find the bug: this should print the numbers in order but they come out unordered.",
              "buggyCode": "nums = {3, 1, 2}\nprint(nums)",
              "fixedCode": "nums = {3, 1, 2}\nprint(sorted(nums))",
              "explanation": "Sets are unordered, so printing one shows items in an arbitrary order; sort them first when order matters."
            },
            "exercise": {
              "title": "Check your understanding: Duplicates in Sets",
              "type": "multiple-choice",
              "instructions": "Which statement about sets is correct?",
              "starterCode": "",
              "solution": "A set automatically drops duplicate values, so {1, 1, 2} has two items.",
              "solutionExplanation": "A set automatically drops duplicate values, so {1, 1, 2} has two items. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A set automatically drops duplicate values, so {1, 1, 2} has two items.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Duplicates in Sets from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A set automatically drops duplicate values, so {1, 1, 2} has two items.",
                "A set keeps every duplicate value.",
                "Sets remember the order items were added.",
                "A set can only hold numbers."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-sets-tuples-m2",
        "title": "Sets & Tuples in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-sets-tuples-m2-l1",
            "slug": "python-sets-tuples-m2-l1",
            "title": "Set Union and Intersection",
            "concept": "Union (|) combines two sets into one with every value from either set, while intersection (&) keeps only the values in both. These operations answer questions such as which tags two articles share.",
            "syntax": "a | b  # union",
            "exampleCode": "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(sorted(a | b))\nprint(sorted(a & b))",
            "exampleLanguage": "python",
            "mistake": "Using + to combine two sets, which raises TypeError because sets do not support +.",
            "bug": {
              "prompt": "Find the bug: this should print the union but it crashes.",
              "buggyCode": "a = {1, 2}\nb = {3, 4}\nprint(a + b)",
              "fixedCode": "a = {1, 2}\nb = {3, 4}\nprint(sorted(a | b))",
              "explanation": "Sets do not support +; use the | operator for a union."
            },
            "exercise": {
              "title": "Practise Set Union and Intersection",
              "type": "write-code",
              "instructions": "Print the sorted union of the sets {1, 2, 3} and {3, 4, 5}.",
              "starterCode": "a = {1, 2, 3}\nb = {3, 4, 5}\n# TODO: write this line",
              "solution": "a = {1, 2, 3}\nb = {3, 4, 5}\nprint(sorted(a | b))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Sorted union",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 3, 4, 5]\n",
                  "hidden": false
                },
                {
                  "name": "Sorted union again",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 3, 4, 5]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Set Union and Intersection is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-sets-tuples-m2-l2",
            "slug": "python-sets-tuples-m2-l2",
            "title": "Set Difference",
            "concept": "Difference (-) keeps the values in the first set that are not in the second, so {1, 2, 3} - {2} is {1, 3}. It answers questions such as which items are new, or which tags were removed.",
            "syntax": "a - b  # difference",
            "exampleCode": "a = {1, 2, 3}\nb = {2}\nprint(sorted(a - b))",
            "exampleLanguage": "python",
            "mistake": "Expecting a - b to equal b - a, when difference depends on the order.",
            "bug": {
              "prompt": "Find the bug: this should print [1, 3] but it prints [2].",
              "buggyCode": "a = {1, 2, 3}\nb = {2}\nprint(sorted(b - a))",
              "fixedCode": "a = {1, 2, 3}\nb = {2}\nprint(sorted(a - b))",
              "explanation": "b - a keeps the values in b that are not in a, which is just [2]; a - b gives [1, 3]."
            },
            "exercise": {
              "title": "Practise Set Difference",
              "type": "write-code",
              "instructions": "Print the sorted difference of the sets {1, 2, 3, 4} and {2, 4}.",
              "starterCode": "a = {1, 2, 3, 4}\nb = {2, 4}\n# TODO: write this line",
              "solution": "a = {1, 2, 3, 4}\nb = {2, 4}\nprint(sorted(a - b))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Sorted difference",
                  "stdin": "",
                  "expectedStdout": "[1, 3]\n",
                  "hidden": false
                },
                {
                  "name": "Sorted difference again",
                  "stdin": "",
                  "expectedStdout": "[1, 3]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Set Difference is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-sets-tuples-m2-l3",
            "slug": "python-sets-tuples-m2-l3",
            "title": "Hashability",
            "concept": "Set members must be hashable, which means their value never changes in a way that affects equality. Strings, numbers, and tuples of hashable values qualify, while lists and dictionaries do not.",
            "syntax": "s = {(1, 2), (3, 4)}",
            "exampleCode": "s = {(1, 2), (3, 4)}\nprint(len(s))",
            "exampleLanguage": "python",
            "mistake": "Trying to add a list to a set, which raises TypeError because lists are unhashable.",
            "bug": {
              "prompt": "Find the bug: this should create a set but it crashes.",
              "buggyCode": "s = {[1, 2], [3, 4]}\nprint(s)",
              "fixedCode": "s = {(1, 2), (3, 4)}\nprint(len(s))",
              "explanation": "Lists are unhashable and cannot be set members; use tuples instead."
            },
            "exercise": {
              "title": "Check your understanding: Hashability",
              "type": "multiple-choice",
              "instructions": "Which statement about set members is correct?",
              "starterCode": "",
              "solution": "Set members must be hashable, so strings, numbers, and tuples work, but lists do not.",
              "solutionExplanation": "Set members must be hashable, so strings, numbers, and tuples work, but lists do not. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Set members must be hashable, so strings, numbers, and tuples work, but lists do not.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Hashability from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Lists can be added to a set.",
                "Any value can be a set member.",
                "Sets can only hold strings.",
                "Set members must be hashable, so strings, numbers, and tuples work, but lists do not."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-sets-tuples-m2-l4",
            "slug": "python-sets-tuples-m2-l4",
            "title": "Choosing the Right Collection",
            "concept": "Choose a list when order matters and items may repeat, a tuple for a fixed group of values, a set when you need uniqueness and membership tests, and a dictionary when each value needs a name. The right collection makes the code simpler.",
            "syntax": "data = [1, 2, 2, 3]",
            "exampleCode": "data = [1, 2, 2, 3]\nprint(len(data))\nprint(len(set(data)))",
            "exampleLanguage": "python",
            "mistake": "Using a list to test membership in a large collection, when a set would be much faster.",
            "bug": {
              "prompt": "Find the bug: this should count the unique values but it counts all of them.",
              "buggyCode": "data = [1, 2, 2, 3]\nprint(len(data))",
              "fixedCode": "data = [1, 2, 2, 3]\nprint(len(set(data)))",
              "explanation": "len() on the list counts duplicates too; converting to a set first drops them."
            },
            "exercise": {
              "title": "Practise Choosing the Right Collection",
              "type": "write-code",
              "instructions": "Read three words from input and print how many unique words there are.",
              "starterCode": "a = input()\nb = input()\nc = input()\n# TODO: write this line",
              "solution": "a = input()\nb = input()\nc = input()\nprint(len({a, b, c}))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "a b a",
                  "stdin": "a\nb\na\n",
                  "expectedStdout": "2\n",
                  "hidden": false
                },
                {
                  "name": "x y z",
                  "stdin": "x\ny\nz\n",
                  "expectedStdout": "3\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Choosing the Right Collection is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-sets-tuples-m2-l5",
            "slug": "python-sets-tuples-m2-l5",
            "title": "Coordinates and Tags Program",
            "concept": "Coordinates are naturally tuples, because a point's x and y belong together and never change, while tags are naturally sets, because each tag appears once. Matching the collection to the data is a core design skill.",
            "syntax": "point = (3, 4)",
            "exampleCode": "point = (3, 4)\nprint(point[0], point[1])\ntags = {\"red\", \"blue\"}\nprint(\"red\" in tags)",
            "exampleLanguage": "python",
            "mistake": "Using a list for a coordinate and accidentally changing it later.",
            "bug": {
              "prompt": "Find the bug: this should print the point (3, 4) but it prints [3, 4, 5].",
              "buggyCode": "point = [3, 4]\npoint.append(5)\nprint(point)",
              "fixedCode": "point = (3, 4)\nprint(point)",
              "explanation": "A list can be changed by accident; a tuple protects a fixed pair of values."
            },
            "exercise": {
              "title": "Practise Coordinates and Tags Program",
              "type": "write-code",
              "instructions": "Read an x and a y from input, store them as a tuple, and print the tuple.",
              "starterCode": "x = int(input())\ny = int(input())\npoint = (x, y)\n# TODO: write this line",
              "solution": "x = int(input())\ny = int(input())\npoint = (x, y)\nprint(point)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "3 4",
                  "stdin": "3\n4\n",
                  "expectedStdout": "(3, 4)\n",
                  "hidden": false
                },
                {
                  "name": "10 20",
                  "stdin": "10\n20\n",
                  "expectedStdout": "(10, 20)\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Coordinates and Tags Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Sets & Tuples Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a sentence, then prints the sorted list of unique words (lowercased) and the number of unique words, each on its own line.",
      "starterCode": "sentence = input()\nwords = sentence.lower().split()\nunique = sorted(set(words))\n# TODO: write this line\n# TODO: write this line",
      "solution": "sentence = input()\nwords = sentence.lower().split()\nunique = sorted(set(words))\nprint(unique)\nprint(len(unique))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "the cat sat on the mat",
          "stdin": "the cat sat on the mat\n",
          "expectedStdout": "['cat', 'mat', 'on', 'sat', 'the']\n5\n",
          "hidden": false
        },
        {
          "name": "a b a c",
          "stdin": "a b a c\n",
          "expectedStdout": "['a', 'b', 'c']\n3\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Sets & Tuples Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Sets & Tuples Capstone Project",
      "description": "A small end-to-end Python program that puts Sets & Tuples into practice.",
      "requirements": [
        "Use the core ideas of Sets & Tuples in a working Python program.",
        "Apply at least three of these skills: Tuples, Tuple unpacking, Sets, Set operations.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Sets & Tuples correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-conditionals",
    "slug": "python-conditionals",
    "language": "python",
    "category": "languages",
    "title": "Conditionals",
    "description": "Learn to make decisions in Python \u2014 if, elif, else, comparisons, and boolean logic \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "if statements",
      "Comparison operators",
      "elif chains",
      "else",
      "Boolean logic and/or/not",
      "Nested conditionals",
      "Ternary expressions",
      "Truthiness"
    ],
    "prerequisites": [
      "python-variables-types"
    ],
    "analogy": "Learning {topic} is like learning to follow a recipe with choices: if you have eggs, make an omelette; otherwise, make toast.",
    "modules": [
      {
        "id": "python-conditionals-m1",
        "title": "Conditionals Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-conditionals-m1-l1",
            "slug": "python-conditionals-m1-l1",
            "title": "The if Statement",
            "concept": "An if statement runs its indented block only when its condition is True, and skips it otherwise. The condition is any expression that produces a boolean, such as a comparison.",
            "syntax": "if age >= 18:\n    print(\"adult\")",
            "exampleCode": "age = 20\nif age >= 18:\n    print(\"adult\")",
            "exampleLanguage": "python",
            "mistake": "Forgetting the colon at the end of the if line, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should print adult but it is a syntax error.",
              "buggyCode": "age = 20\nif age >= 18\n    print(\"adult\")",
              "fixedCode": "age = 20\nif age >= 18:\n    print(\"adult\")",
              "explanation": "An if statement needs a colon at the end of its line."
            },
            "exercise": {
              "title": "Practise The if Statement",
              "type": "write-code",
              "instructions": "Read a number from input and print \"positive\" if it is greater than 0.",
              "starterCode": "n = int(input())\nif n > 0:\n# TODO: write this line",
              "solution": "n = int(input())\nif n > 0:\n    print(\"positive\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "5",
                  "stdin": "5\n",
                  "expectedStdout": "positive\n",
                  "hidden": false
                },
                {
                  "name": "10",
                  "stdin": "10\n",
                  "expectedStdout": "positive\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The if Statement is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-conditionals-m1-l2",
            "slug": "python-conditionals-m1-l2",
            "title": "Comparison Operators",
            "concept": "Comparison operators \u2014 ==, !=, <, <=, > and >= \u2014 compare two values and produce a boolean. They work on numbers and strings, and strings compare alphabetically by character.",
            "syntax": "a == b  # equal?",
            "exampleCode": "print(3 == 3)\nprint(3 != 4)\nprint(\"a\" < \"b\")",
            "exampleLanguage": "python",
            "mistake": "Using = (assignment) instead of == (comparison) inside an if condition.",
            "bug": {
              "prompt": "Find the bug: this should test equality but it is a syntax error.",
              "buggyCode": "x = 5\nif x = 5:\n    print(\"five\")",
              "fixedCode": "x = 5\nif x == 5:\n    print(\"five\")",
              "explanation": "= assigns a value, while == compares two values; a condition needs ==."
            },
            "exercise": {
              "title": "Practise Comparison Operators",
              "type": "write-code",
              "instructions": "Read two numbers from input and print True if they are equal, otherwise False.",
              "starterCode": "a = int(input())\nb = int(input())\n# TODO: write this line",
              "solution": "a = int(input())\nb = int(input())\nprint(a == b)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "5 5",
                  "stdin": "5\n5\n",
                  "expectedStdout": "True\n",
                  "hidden": false
                },
                {
                  "name": "5 6",
                  "stdin": "5\n6\n",
                  "expectedStdout": "False\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Comparison Operators is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-conditionals-m1-l3",
            "slug": "python-conditionals-m1-l3",
            "title": "== vs =",
            "concept": "= is the assignment operator, which stores a value under a name, while == is the equality operator, which compares two values and returns True or False. Mixing them up is one of the most common beginner mistakes.",
            "syntax": "x = 5  # assign\nx == 5  # compare",
            "exampleCode": "x = 5\nprint(x == 5)\nprint(x == 6)",
            "exampleLanguage": "python",
            "mistake": "Writing if x = 5: instead of if x == 5:, which is a syntax error in Python.",
            "bug": {
              "prompt": "Find the bug: this should print True but it is a syntax error.",
              "buggyCode": "x = 5\nprint(x = 5)",
              "fixedCode": "x = 5\nprint(x == 5)",
              "explanation": "= is assignment and cannot be used inside print(); == compares the values."
            },
            "exercise": {
              "title": "Check your understanding: == vs =",
              "type": "multiple-choice",
              "instructions": "Which statement about == and = is correct?",
              "starterCode": "",
              "solution": "== compares two values and returns a boolean, while = assigns a value to a name.",
              "solutionExplanation": "== compares two values and returns a boolean, while = assigns a value to a name. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "== compares two values and returns a boolean, while = assigns a value to a name.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of == vs = from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "= compares two values and == assigns a value.",
                "== and = do exactly the same thing.",
                "== compares two values and returns a boolean, while = assigns a value to a name.",
                "== can only compare strings, never numbers."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-conditionals-m1-l4",
            "slug": "python-conditionals-m1-l4",
            "title": "if/else",
            "concept": "An if/else statement runs one block when the condition is True and the other when it is False, so exactly one of the two blocks always runs. It is how a program makes a two-way choice.",
            "syntax": "if age >= 18:\n    print(\"adult\")\nelse:\n    print(\"minor\")",
            "exampleCode": "age = 15\nif age >= 18:\n    print(\"adult\")\nelse:\n    print(\"minor\")",
            "exampleLanguage": "python",
            "mistake": "Indenting the else block at the wrong level, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should print minor but it is a syntax error.",
              "buggyCode": "age = 15\nif age >= 18:\n    print(\"adult\")\n    else:\n    print(\"minor\")",
              "fixedCode": "age = 15\nif age >= 18:\n    print(\"adult\")\nelse:\n    print(\"minor\")",
              "explanation": "else must line up with its if, at the same indentation; indenting it under the if block is a syntax error."
            },
            "exercise": {
              "title": "Practise if/else",
              "type": "write-code",
              "instructions": "Read a number from input and print \"even\" if it is even, otherwise print \"odd\".",
              "starterCode": "n = int(input())\nif n % 2 == 0:\n# TODO: write this line\nelse:\n# TODO: write this line",
              "solution": "n = int(input())\nif n % 2 == 0:\n    print(\"even\")\nelse:\n    print(\"odd\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "4",
                  "stdin": "4\n",
                  "expectedStdout": "even\n",
                  "hidden": false
                },
                {
                  "name": "7",
                  "stdin": "7\n",
                  "expectedStdout": "odd\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "if/else is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-conditionals-m1-l5",
            "slug": "python-conditionals-m1-l5",
            "title": "elif Order",
            "concept": "An if/elif/else chain checks conditions from top to bottom and runs only the first block whose condition is True, skipping the rest. Putting the most specific condition first matters, because a broad condition above it would swallow the case.",
            "syntax": "if score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")",
            "exampleCode": "score = 85\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelse:\n    print(\"C\")",
            "exampleLanguage": "python",
            "mistake": "Putting a broad condition before a specific one, so the specific branch never runs.",
            "bug": {
              "prompt": "Find the bug: a score of 95 should print A but it prints B.",
              "buggyCode": "score = 95\nif score >= 80:\n    print(\"B\")\nelif score >= 90:\n    print(\"A\")",
              "fixedCode": "score = 95\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")",
              "explanation": "The first True condition wins, so >= 80 catches 95 before >= 90 is checked; test the highest range first."
            },
            "exercise": {
              "title": "Check your understanding: elif Order",
              "type": "multiple-choice",
              "instructions": "Which statement about elif is correct?",
              "starterCode": "",
              "solution": "Python checks elif conditions in order and runs only the first one that is True.",
              "solutionExplanation": "Python checks elif conditions in order and runs only the first one that is True. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Python checks elif conditions in order and runs only the first one that is True.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of elif Order from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Python checks elif conditions in order and runs only the first one that is True.",
                "Python runs every elif block whose condition is True.",
                "elif blocks are checked in reverse order.",
                "elif can be used without an if before it."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-conditionals-m2",
        "title": "Conditionals in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-conditionals-m2-l1",
            "slug": "python-conditionals-m2-l1",
            "title": "elif Chains",
            "concept": "elif adds extra conditions to an if statement, letting a program choose between many outcomes. The chain ends with an optional else that catches everything the earlier conditions missed.",
            "syntax": "if x < 0:\n    print(\"negative\")\nelif x == 0:\n    print(\"zero\")",
            "exampleCode": "x = 0\nif x < 0:\n    print(\"negative\")\nelif x == 0:\n    print(\"zero\")\nelse:\n    print(\"positive\")",
            "exampleLanguage": "python",
            "mistake": "Writing separate if statements instead of elif, so more than one block can run.",
            "bug": {
              "prompt": "Find the bug: this should print exactly one grade but it prints two.",
              "buggyCode": "score = 95\nif score >= 80:\n    print(\"B\")\nif score >= 90:\n    print(\"A\")",
              "fixedCode": "score = 95\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")",
              "explanation": "Separate if statements are independent, so both can run; an elif chain runs only the first True branch."
            },
            "exercise": {
              "title": "Practise elif Chains",
              "type": "write-code",
              "instructions": "Read a score from input and print \"A\" if it is 90 or more, \"B\" if it is 80 or more, otherwise \"C\".",
              "starterCode": "score = int(input())\nif score >= 90:\n# TODO: write this line\nelif score >= 80:\n# TODO: write this line\nelse:\n# TODO: write this line",
              "solution": "score = int(input())\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelse:\n    print(\"C\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "95",
                  "stdin": "95\n",
                  "expectedStdout": "A\n",
                  "hidden": false
                },
                {
                  "name": "85",
                  "stdin": "85\n",
                  "expectedStdout": "B\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "elif Chains is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-conditionals-m2-l2",
            "slug": "python-conditionals-m2-l2",
            "title": "and, or, not",
            "concept": "and is True only when both sides are True, or is True when at least one side is True, and not flips a boolean. They combine simple conditions into richer rules, such as age >= 18 and has_ticket.",
            "syntax": "if age >= 18 and has_ticket:",
            "exampleCode": "age = 20\nhas_ticket = True\nprint(age >= 18 and has_ticket)\nprint(age < 18 or not has_ticket)",
            "exampleLanguage": "python",
            "mistake": "Writing if 18 <= age <= 65 as if age <= 18 and age <= 65, which is a different range.",
            "bug": {
              "prompt": "Find the bug: this should print True for age 20 but it prints False.",
              "buggyCode": "age = 20\nprint(age < 18 and age > 65)",
              "fixedCode": "age = 20\nprint(age >= 18 and age <= 65)",
              "explanation": "No age can be both under 18 and over 65, so and gives False; the intended range check is 18 to 65."
            },
            "exercise": {
              "title": "Practise and, or, not",
              "type": "write-code",
              "instructions": "Read an age from input and print True if the age is between 18 and 65 inclusive, otherwise False.",
              "starterCode": "age = int(input())\n# TODO: write this line",
              "solution": "age = int(input())\nprint(age >= 18 and age <= 65)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "20",
                  "stdin": "20\n",
                  "expectedStdout": "True\n",
                  "hidden": false
                },
                {
                  "name": "70",
                  "stdin": "70\n",
                  "expectedStdout": "False\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "and, or, not is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-conditionals-m2-l3",
            "slug": "python-conditionals-m2-l3",
            "title": "Boolean Logic",
            "concept": "Boolean operators combine conditions: and is True only when both parts are True, or is True when either part is True, and not reverses a value. Python short-circuits them, so it stops as soon as the result is decided.",
            "syntax": "True and False  # False",
            "exampleCode": "print(True and False)\nprint(True or False)\nprint(not True)",
            "exampleLanguage": "python",
            "mistake": "Writing if x == 1 or 2: expecting it to test x against both values, when it actually tests 2 on its own, which is always truthy.",
            "bug": {
              "prompt": "Find the bug: this should print False for x = 3 but it prints True.",
              "buggyCode": "x = 3\nprint(x == 1 or 2)",
              "fixedCode": "x = 3\nprint(x == 1 or x == 2)",
              "explanation": "or 2 tests the number 2 itself, which is truthy; each side must be a full comparison with x."
            },
            "exercise": {
              "title": "Check your understanding: Boolean Logic",
              "type": "multiple-choice",
              "instructions": "Which statement about and and or is correct?",
              "starterCode": "",
              "solution": "and needs both sides True, while or needs at least one side True.",
              "solutionExplanation": "and needs both sides True, while or needs at least one side True. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "and needs both sides True, while or needs at least one side True.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Boolean Logic from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "and is True when either side is True.",
                "or is True only when both sides are True.",
                "and and or do the same thing.",
                "and needs both sides True, while or needs at least one side True."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-conditionals-m2-l4",
            "slug": "python-conditionals-m2-l4",
            "title": "Nested Conditionals",
            "concept": "An if statement inside another if statement's block is called nested, and the inner condition is only tested when the outer one is True. Nesting handles two-part decisions, but deep nesting is hard to read, so and is often clearer.",
            "syntax": "if a:\n    if b:\n        print(\"both\")",
            "exampleCode": "age = 20\nhas_ticket = True\nif age >= 18:\n    if has_ticket:\n        print(\"welcome\")",
            "exampleLanguage": "python",
            "mistake": "Nesting too deeply instead of combining conditions with and, which makes the code hard to follow.",
            "bug": {
              "prompt": "Find the bug: this should print welcome but it prints nothing.",
              "buggyCode": "age = 20\nhas_ticket = True\nif age >= 18:\n    if not has_ticket:\n        print(\"welcome\")",
              "fixedCode": "age = 20\nhas_ticket = True\nif age >= 18:\n    if has_ticket:\n        print(\"welcome\")",
              "explanation": "not has_ticket is False when the ticket exists, so the inner block never runs; the condition should be has_ticket."
            },
            "exercise": {
              "title": "Practise Nested Conditionals",
              "type": "write-code",
              "instructions": "Read an age and a ticket answer (yes/no) from input, then print \"welcome\" if the age is 18 or more and the answer is yes, otherwise print \"denied\".",
              "starterCode": "age = int(input())\nticket = input()\nif age >= 18:\n    if ticket == \"yes\":\n# TODO: write this line\n    else:\n# TODO: write this line\nelse:\n# TODO: write this line",
              "solution": "age = int(input())\nticket = input()\nif age >= 18:\n    if ticket == \"yes\":\n        print(\"welcome\")\n    else:\n        print(\"denied\")\nelse:\n    print(\"denied\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "20 yes",
                  "stdin": "20\nyes\n",
                  "expectedStdout": "welcome\n",
                  "hidden": false
                },
                {
                  "name": "16 yes",
                  "stdin": "16\nyes\n",
                  "expectedStdout": "denied\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Nested Conditionals is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-conditionals-m2-l5",
            "slug": "python-conditionals-m2-l5",
            "title": "A Grading Program",
            "concept": "A grading program maps a numeric score to a letter grade with an if/elif/else chain, testing the highest boundary first. It is a classic example of a multi-way decision, and the same pattern sorts values into any set of bands.",
            "syntax": "if score >= 90:\n    grade = \"A\"",
            "exampleCode": "score = 88\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"\nelse:\n    grade = \"C\"\nprint(grade)",
            "exampleLanguage": "python",
            "mistake": "Forgetting the final else, so a score below every boundary produces no grade at all.",
            "bug": {
              "prompt": "Find the bug: a score of 50 should print C but it prints nothing.",
              "buggyCode": "score = 50\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")",
              "fixedCode": "score = 50\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelse:\n    print(\"C\")",
              "explanation": "Without a final else, scores below 80 match no branch and print nothing; the else catches them."
            },
            "exercise": {
              "title": "Practise A Grading Program",
              "type": "write-code",
              "instructions": "Read a score from input and print the grade: A for 90+, B for 80+, C for 70+, otherwise D.",
              "starterCode": "score = int(input())\nif score >= 90:\n# TODO: write this line\nelif score >= 80:\n# TODO: write this line\nelif score >= 70:\n# TODO: write this line\nelse:\n# TODO: write this line",
              "solution": "score = int(input())\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelif score >= 70:\n    print(\"C\")\nelse:\n    print(\"D\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "95",
                  "stdin": "95\n",
                  "expectedStdout": "A\n",
                  "hidden": false
                },
                {
                  "name": "75",
                  "stdin": "75\n",
                  "expectedStdout": "C\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Grading Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Conditionals Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads an age and prints the ticket price: 0 for under 5, 10 for ages 5 to 17, 20 for ages 18 to 64, and 12 for 65 and over.",
      "starterCode": "age = int(input())\nif age < 5:\n# TODO: write this line\nelif age < 18:\n# TODO: write this line\nelif age < 65:\n# TODO: write this line\nelse:\n# TODO: write this line",
      "solution": "age = int(input())\nif age < 5:\n    print(0)\nelif age < 18:\n    print(10)\nelif age < 65:\n    print(20)\nelse:\n    print(12)",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "30",
          "stdin": "30\n",
          "expectedStdout": "20\n",
          "hidden": false
        },
        {
          "name": "70",
          "stdin": "70\n",
          "expectedStdout": "12\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Conditionals Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Conditionals Capstone Project",
      "description": "A small end-to-end Python program that puts Conditionals into practice.",
      "requirements": [
        "Use the core ideas of Conditionals in a working Python program.",
        "Apply at least three of these skills: if statements, Comparison operators, elif chains, else.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Conditionals correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-loops",
    "slug": "python-loops",
    "language": "python",
    "category": "languages",
    "title": "For & While Loops",
    "description": "Learn to repeat work with for and while loops \u2014 range(), looping over collections, and the accumulator pattern \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 9,
    "skills": [
      "for loops",
      "range()",
      "while loops",
      "Looping over collections",
      "Accumulators",
      "Loop patterns",
      "Infinite loops",
      "Loop variables"
    ],
    "prerequisites": [
      "python-conditionals"
    ],
    "analogy": "Learning {topic} is like learning to knead dough: the same motion, repeated patiently, turns simple ingredients into something finished.",
    "modules": [
      {
        "id": "python-loops-m1",
        "title": "For & While Loops Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-loops-m1-l1",
            "slug": "python-loops-m1-l1",
            "title": "for Loops with range()",
            "concept": "A for loop repeats its indented block once for each value in a sequence, and range(n) produces the numbers 0 to n-1. It is the standard way to repeat work a known number of times.",
            "syntax": "for i in range(5):\n    print(i)",
            "exampleCode": "for i in range(3):\n    print(i)",
            "exampleLanguage": "python",
            "mistake": "Expecting range(5) to include 5, when it stops at 4.",
            "bug": {
              "prompt": "Find the bug: this should print 1, 2, 3 but it prints 0, 1, 2.",
              "buggyCode": "for i in range(3):\n    print(i)",
              "fixedCode": "for i in range(1, 4):\n    print(i)",
              "explanation": "range(3) gives 0, 1, 2; range(1, 4) gives 1, 2, 3."
            },
            "exercise": {
              "title": "Practise for Loops with range()",
              "type": "write-code",
              "instructions": "Print the numbers 1 to 5, each on its own line, using a for loop with range().",
              "starterCode": "for i in range(1, 6):\n# TODO: write this line",
              "solution": "for i in range(1, 6):\n    print(i)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print 1 to 5",
                  "stdin": "",
                  "expectedStdout": "1\n2\n3\n4\n5\n",
                  "hidden": false
                },
                {
                  "name": "Print 1 to 5 again",
                  "stdin": "",
                  "expectedStdout": "1\n2\n3\n4\n5\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "for Loops with range() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loops-m1-l2",
            "slug": "python-loops-m1-l2",
            "title": "Looping Over a List",
            "concept": "A for loop over a list visits each item in order, binding it to the loop variable. This is how programs process every item of a collection without writing the same code for each one.",
            "syntax": "for item in items:",
            "exampleCode": "fruits = [\"apple\", \"banana\"]\nfor fruit in fruits:\n    print(fruit)",
            "exampleLanguage": "python",
            "mistake": "Looping over a list of numbers and forgetting the items are the values, not the indexes.",
            "bug": {
              "prompt": "Find the bug: this should print the scores but it prints 0, 1, 2.",
              "buggyCode": "scores = [88, 92, 79]\nfor i in range(len(scores)):\n    print(i)",
              "fixedCode": "scores = [88, 92, 79]\nfor score in scores:\n    print(score)",
              "explanation": "range(len(scores)) gives indexes 0, 1, 2; looping over the list directly gives the scores themselves."
            },
            "exercise": {
              "title": "Practise Looping Over a List",
              "type": "write-code",
              "instructions": "Read three numbers from input, store them in a list, then print each number on its own line using a for loop.",
              "starterCode": "a = int(input())\nb = int(input())\nc = int(input())\nnums = [a, b, c]\nfor n in nums:\n# TODO: write this line",
              "solution": "a = int(input())\nb = int(input())\nc = int(input())\nnums = [a, b, c]\nfor n in nums:\n    print(n)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "1 2 3",
                  "stdin": "1\n2\n3\n",
                  "expectedStdout": "1\n2\n3\n",
                  "hidden": false
                },
                {
                  "name": "7 8 9",
                  "stdin": "7\n8\n9\n",
                  "expectedStdout": "7\n8\n9\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Looping Over a List is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-loops-m1-l3",
            "slug": "python-loops-m1-l3",
            "title": "range()",
            "concept": "range(start, stop, step) produces numbers from start up to, but not including, stop, moving by step each time. With one argument, start defaults to 0 and step to 1, and a negative step counts downwards.",
            "syntax": "range(1, 10, 2)",
            "exampleCode": "print(list(range(5)))\nprint(list(range(1, 10, 2)))",
            "exampleLanguage": "python",
            "mistake": "Using range() where a list is needed, and forgetting that range is lazy and must be converted with list().",
            "bug": {
              "prompt": "Find the bug: this should print [0, 1, 2] but it prints range(0, 3).",
              "buggyCode": "print(range(3))",
              "fixedCode": "print(list(range(3)))",
              "explanation": "range(3) is a range object, not a list; list() converts it so it prints as [0, 1, 2]."
            },
            "exercise": {
              "title": "Check your understanding: range()",
              "type": "multiple-choice",
              "instructions": "Which statement about range() is correct?",
              "starterCode": "",
              "solution": "range(5) gives 0, 1, 2, 3, 4, and range(1, 6) gives 1 to 5.",
              "solutionExplanation": "range(5) gives 0, 1, 2, 3, 4, and range(1, 6) gives 1 to 5. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "range(5) gives 0, 1, 2, 3, 4, and range(1, 6) gives 1 to 5.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of range() from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "range(5) gives 1, 2, 3, 4, 5.",
                "range() includes its stop value.",
                "range(5) gives 0, 1, 2, 3, 4, and range(1, 6) gives 1 to 5.",
                "range() can only count upwards by 1."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-loops-m1-l4",
            "slug": "python-loops-m1-l4",
            "title": "while Loops",
            "concept": "A while loop repeats its block as long as its condition stays True, checking the condition before each repetition. It is used when you do not know in advance how many repetitions you need.",
            "syntax": "while count < 3:\n    count += 1",
            "exampleCode": "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
            "exampleLanguage": "python",
            "mistake": "Forgetting to update the loop variable inside the body, so the condition never becomes False and the loop never ends.",
            "bug": {
              "prompt": "Find the bug: this loop should print 0, 1, 2 and stop, but it never stops.",
              "buggyCode": "count = 0\nwhile count < 3:\n    print(count)",
              "fixedCode": "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
              "explanation": "count never changes, so count < 3 stays True forever; incrementing count inside the loop lets it finish."
            },
            "exercise": {
              "title": "Practise while Loops",
              "type": "write-code",
              "instructions": "Print the numbers 0, 1, 2 using a while loop.",
              "starterCode": "count = 0\nwhile count < 3:\n# TODO: write this line\n    count += 1",
              "solution": "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print 0 1 2",
                  "stdin": "",
                  "expectedStdout": "0\n1\n2\n",
                  "hidden": false
                },
                {
                  "name": "Print 0 1 2 again",
                  "stdin": "",
                  "expectedStdout": "0\n1\n2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "while Loops is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loops-m1-l5",
            "slug": "python-loops-m1-l5",
            "title": "while vs for",
            "concept": "A for loop is best when you iterate over a known sequence or a fixed count, while a while loop fits when repetition depends on a condition that changes during the loop, such as waiting for valid input.",
            "syntax": "while answer != \"yes\":",
            "exampleCode": "count = 0\nwhile count < 2:\n    count += 1\nprint(\"done\")",
            "exampleLanguage": "python",
            "mistake": "Using a while loop for a fixed count and forgetting the update step, which causes an infinite loop.",
            "bug": {
              "prompt": "Find the bug: this should count to 3 but it runs forever.",
              "buggyCode": "n = 0\nwhile n < 3:\n    print(n)",
              "fixedCode": "n = 0\nwhile n < 3:\n    print(n)\n    n += 1",
              "explanation": "n never increases, so n < 3 is always True; the update n += 1 must be inside the loop."
            },
            "exercise": {
              "title": "Check your understanding: while vs for",
              "type": "multiple-choice",
              "instructions": "Which statement about while and for loops is correct?",
              "starterCode": "",
              "solution": "Use for when you know how many times to repeat, and while when the count depends on a condition.",
              "solutionExplanation": "Use for when you know how many times to repeat, and while when the count depends on a condition. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Use for when you know how many times to repeat, and while when the count depends on a condition.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of while vs for from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Use for when you know how many times to repeat, and while when the count depends on a condition.",
                "while loops can only run a fixed number of times.",
                "for loops cannot loop over a list.",
                "while and for loops are identical in every way."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-loops-m2",
        "title": "For & While Loops in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-loops-m2-l1",
            "slug": "python-loops-m2-l1",
            "title": "Accumulator Pattern",
            "concept": "An accumulator is a variable that starts at a neutral value, such as 0 for a total, and is updated on each loop iteration. It is the standard pattern for totals, counts, and averages.",
            "syntax": "total = 0\nfor n in nums:\n    total += n",
            "exampleCode": "nums = [1, 2, 3, 4]\ntotal = 0\nfor n in nums:\n    total += n\nprint(total)",
            "exampleLanguage": "python",
            "mistake": "Starting the accumulator inside the loop, which resets it on every iteration.",
            "bug": {
              "prompt": "Find the bug: this should print 10 but it prints 4.",
              "buggyCode": "nums = [1, 2, 3, 4]\nfor n in nums:\n    total = 0\n    total += n\nprint(total)",
              "fixedCode": "nums = [1, 2, 3, 4]\ntotal = 0\nfor n in nums:\n    total += n\nprint(total)",
              "explanation": "total = 0 inside the loop resets the total on every iteration; it must be set once, before the loop."
            },
            "exercise": {
              "title": "Practise Accumulator Pattern",
              "type": "write-code",
              "instructions": "Read three numbers from input and print their total, using an accumulator.",
              "starterCode": "total = 0\nfor _ in range(3):\n    total += int(input())\n# TODO: write this line",
              "solution": "total = 0\nfor _ in range(3):\n    total += int(input())\nprint(total)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "1 2 3",
                  "stdin": "1\n2\n3\n",
                  "expectedStdout": "6\n",
                  "hidden": false
                },
                {
                  "name": "10 20 30",
                  "stdin": "10\n20\n30\n",
                  "expectedStdout": "60\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Accumulator Pattern is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-loops-m2-l2",
            "slug": "python-loops-m2-l2",
            "title": "Counting Down with range()",
            "concept": "range() with a negative step counts downwards, so range(5, 0, -1) gives 5, 4, 3, 2, 1. The stop value is still excluded, so counting down to 0 needs a stop of -1.",
            "syntax": "range(5, 0, -1)",
            "exampleCode": "for i in range(3, 0, -1):\n    print(i)",
            "exampleLanguage": "python",
            "mistake": "Writing range(3, 0) and expecting it to count down, when a positive step with a smaller stop gives nothing.",
            "bug": {
              "prompt": "Find the bug: this should print 3, 2, 1 but it prints nothing.",
              "buggyCode": "for i in range(3, 0):\n    print(i)",
              "fixedCode": "for i in range(3, 0, -1):\n    print(i)",
              "explanation": "range(3, 0) with the default step of +1 is empty, because 3 is already past 0; a step of -1 counts down."
            },
            "exercise": {
              "title": "Practise Counting Down with range()",
              "type": "write-code",
              "instructions": "Print the numbers 5, 4, 3, 2, 1, each on its own line, using range() with a negative step.",
              "starterCode": "for i in range(5, 0, -1):\n# TODO: write this line",
              "solution": "for i in range(5, 0, -1):\n    print(i)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Count down",
                  "stdin": "",
                  "expectedStdout": "5\n4\n3\n2\n1\n",
                  "hidden": false
                },
                {
                  "name": "Count down again",
                  "stdin": "",
                  "expectedStdout": "5\n4\n3\n2\n1\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Counting Down with range() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loops-m2-l3",
            "slug": "python-loops-m2-l3",
            "title": "Infinite Loops",
            "concept": "An infinite loop repeats forever because its exit condition never becomes true, usually because the loop variable is never updated or the condition is always True. Pressing Ctrl+C stops a runaway program in the terminal.",
            "syntax": "while True:\n    pass",
            "exampleCode": "count = 0\nwhile count < 3:\n    count += 1\nprint(\"finished\")",
            "exampleLanguage": "python",
            "mistake": "Writing while True without a break, and having no way to stop the loop.",
            "bug": {
              "prompt": "Find the bug: this loop should stop after 3 prints but it never stops.",
              "buggyCode": "count = 0\nwhile True:\n    print(count)\n    count += 1",
              "fixedCode": "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
              "explanation": "while True never becomes False; the condition must be count < 3 so the loop ends."
            },
            "exercise": {
              "title": "Check your understanding: Infinite Loops",
              "type": "multiple-choice",
              "instructions": "Which statement about infinite loops is correct?",
              "starterCode": "",
              "solution": "A loop is infinite when its condition never becomes False, often because the loop variable is never updated.",
              "solutionExplanation": "A loop is infinite when its condition never becomes False, often because the loop variable is never updated. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A loop is infinite when its condition never becomes False, often because the loop variable is never updated.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Infinite Loops from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Infinite loops are always a syntax error.",
                "A while loop can never be infinite.",
                "Infinite loops only happen in for loops.",
                "A loop is infinite when its condition never becomes False, often because the loop variable is never updated."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-loops-m2-l4",
            "slug": "python-loops-m2-l4",
            "title": "Nested Loops",
            "concept": "A loop inside another loop runs its full cycle for every iteration of the outer loop, which is how programs visit every combination of two collections. The inner loop finishes completely before the outer loop moves on.",
            "syntax": "for i in range(3):\n    for j in range(2):",
            "exampleCode": "for i in range(2):\n    for j in range(2):\n        print(i, j)",
            "exampleLanguage": "python",
            "mistake": "Reusing the same loop variable name for both loops, which overwrites the outer value.",
            "bug": {
              "prompt": "Find the bug: this should print 4 pairs but it prints only 2.",
              "buggyCode": "for i in range(2):\n    for i in range(2):\n        print(i)",
              "fixedCode": "for i in range(2):\n    for j in range(2):\n        print(i, j)",
              "explanation": "The inner loop reuses i, overwriting the outer loop's variable; use a different name such as j."
            },
            "exercise": {
              "title": "Practise Nested Loops",
              "type": "write-code",
              "instructions": "Print a 2x3 grid of stars: two rows, each with three stars on one line, like ***",
              "starterCode": "for row in range(2):\n# TODO: write this line",
              "solution": "for row in range(2):\n    print(\"*\" * 3)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Star grid",
                  "stdin": "",
                  "expectedStdout": "***\n***\n",
                  "hidden": false
                },
                {
                  "name": "Star grid again",
                  "stdin": "",
                  "expectedStdout": "***\n***\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Nested Loops is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loops-m2-l5",
            "slug": "python-loops-m2-l5",
            "title": "A Times Table Program",
            "concept": "A times table is a loop that multiplies one number by 1 through 10, printing each step. It combines a loop, arithmetic, and formatted output into a small, complete program.",
            "syntax": "for i in range(1, 11):\n    print(n, \"x\", i, \"=\", n * i)",
            "exampleCode": "n = 5\nfor i in range(1, 4):\n    print(n, \"x\", i, \"=\", n * i)",
            "exampleLanguage": "python",
            "mistake": "Starting the table at 0, which prints a useless 0 row first.",
            "bug": {
              "prompt": "Find the bug: this should start at 5 x 1 but it starts at 5 x 0.",
              "buggyCode": "n = 5\nfor i in range(0, 4):\n    print(n, \"x\", i, \"=\", n * i)",
              "fixedCode": "n = 5\nfor i in range(1, 4):\n    print(n, \"x\", i, \"=\", n * i)",
              "explanation": "range(0, 4) starts at 0; range(1, 4) starts the table at 1."
            },
            "exercise": {
              "title": "Practise A Times Table Program",
              "type": "write-code",
              "instructions": "Read a number from input and print its times table for 1, 2, and 3, like: 5 x 1 = 5",
              "starterCode": "n = int(input())\nfor i in range(1, 4):\n# TODO: write this line",
              "solution": "n = int(input())\nfor i in range(1, 4):\n    print(n, \"x\", i, \"=\", n * i)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "5",
                  "stdin": "5\n",
                  "expectedStdout": "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n",
                  "hidden": false
                },
                {
                  "name": "3",
                  "stdin": "3\n",
                  "expectedStdout": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Times Table Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise For & While Loops Capstone",
      "type": "write-code",
      "instructions": "Write a guessing game with the secret number 42. Read guesses from input until the guess is correct, printing \"too low\" or \"too high\" after each wrong guess, then print \"correct!\" at the end.",
      "starterCode": "secret = 42\nguess = int(input())\nwhile guess != secret:\n    if guess < secret:\n# TODO: write this line\n    else:\n# TODO: write this line\n    guess = int(input())\n# TODO: write this line",
      "solution": "secret = 42\nguess = int(input())\nwhile guess != secret:\n    if guess < secret:\n        print(\"too low\")\n    else:\n        print(\"too high\")\n    guess = int(input())\nprint(\"correct!\")",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "10 50 42",
          "stdin": "10\n50\n42\n",
          "expectedStdout": "too low\ntoo high\ncorrect!\n",
          "hidden": false
        },
        {
          "name": "42",
          "stdin": "42\n",
          "expectedStdout": "correct!\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "For & While Loops Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "For & While Loops Capstone Project",
      "description": "A small end-to-end Python program that puts For & While Loops into practice.",
      "requirements": [
        "Use the core ideas of For & While Loops in a working Python program.",
        "Apply at least three of these skills: for loops, range(), while loops, Looping over collections.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates For & While Loops correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-loop-control",
    "slug": "python-loop-control",
    "language": "python",
    "category": "languages",
    "title": "Loop Control & Patterns",
    "description": "Learn to steer loops with break and continue, loop else clauses, and the enumerate() and zip() helpers \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "break",
      "continue",
      "else on loops",
      "enumerate()",
      "zip()",
      "Loop-and-a-half",
      "Sentinel values",
      "Nested loop control"
    ],
    "prerequisites": [
      "python-loops"
    ],
    "analogy": "Learning {topic} is like learning to drive with brakes and a steering wheel: loops get you moving, and these tools let you decide where to stop and turn.",
    "modules": [
      {
        "id": "python-loop-control-m1",
        "title": "Loop Control & Patterns Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-loop-control-m1-l1",
            "slug": "python-loop-control-m1-l1",
            "title": "Breaking Out with break",
            "concept": "break ends a loop immediately, jumping to the first statement after it, even if the loop condition is still True. It is used to stop early, for example when you have found what you were looking for.",
            "syntax": "for n in nums:\n    if n == target:\n        break",
            "exampleCode": "for n in [1, 2, 3, 4]:\n    if n == 3:\n        break\n    print(n)",
            "exampleLanguage": "python",
            "mistake": "Expecting break to exit all nested loops, when it only exits the innermost one.",
            "bug": {
              "prompt": "Find the bug: this should stop at 3 but it prints 4 too.",
              "buggyCode": "for n in [1, 2, 3, 4]:\n    print(n)\n    if n == 3:\n        continue",
              "fixedCode": "for n in [1, 2, 3, 4]:\n    print(n)\n    if n == 3:\n        break",
              "explanation": "continue only skips to the next iteration; break stops the loop entirely."
            },
            "exercise": {
              "title": "Practise Breaking Out with break",
              "type": "write-code",
              "instructions": "Print the numbers 1, 2, 3 and then stop, using break when you reach 3.",
              "starterCode": "for n in [1, 2, 3, 4, 5]:\n# TODO: write this line\n    if n == 3:\n# TODO: write this line",
              "solution": "for n in [1, 2, 3, 4, 5]:\n    print(n)\n    if n == 3:\n        break",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Break at 3",
                  "stdin": "",
                  "expectedStdout": "1\n2\n3\n",
                  "hidden": false
                },
                {
                  "name": "Break at 3 again",
                  "stdin": "",
                  "expectedStdout": "1\n2\n3\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Breaking Out with break is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loop-control-m1-l2",
            "slug": "python-loop-control-m1-l2",
            "title": "Skipping with continue",
            "concept": "continue skips the rest of the current iteration and jumps straight to the next one, leaving the loop running. It is used to skip items that do not need processing, such as negative numbers in a sum.",
            "syntax": "if n < 0:\n    continue",
            "exampleCode": "for n in [1, -2, 3]:\n    if n < 0:\n        continue\n    print(n)",
            "exampleLanguage": "python",
            "mistake": "Using continue where break was needed, so the loop keeps going instead of stopping.",
            "bug": {
              "prompt": "Find the bug: this should print only 1 and 3 but it prints 1, -2, 3.",
              "buggyCode": "for n in [1, -2, 3]:\n    if n < 0:\n        pass\n    print(n)",
              "fixedCode": "for n in [1, -2, 3]:\n    if n < 0:\n        continue\n    print(n)",
              "explanation": "pass does nothing, so the print still runs; continue skips the rest of the iteration."
            },
            "exercise": {
              "title": "Practise Skipping with continue",
              "type": "write-code",
              "instructions": "Print the numbers 1 to 5, skipping 3, using continue.",
              "starterCode": "for n in range(1, 6):\n    if n == 3:\n# TODO: write this line\n# TODO: write this line",
              "solution": "for n in range(1, 6):\n    if n == 3:\n        continue\n    print(n)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Skip 3",
                  "stdin": "",
                  "expectedStdout": "1\n2\n4\n5\n",
                  "hidden": false
                },
                {
                  "name": "Skip 3 again",
                  "stdin": "",
                  "expectedStdout": "1\n2\n4\n5\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Skipping with continue is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loop-control-m1-l3",
            "slug": "python-loop-control-m1-l3",
            "title": "break vs continue",
            "concept": "break exits the loop completely, while continue jumps to the next iteration without leaving the loop. Both are used inside if statements within a loop body, and both only affect the innermost loop.",
            "syntax": "break  # exit loop",
            "exampleCode": "for n in range(5):\n    if n == 2:\n        break\n    print(n)",
            "exampleLanguage": "python",
            "mistake": "Using break outside a loop, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should stop the loop but it is a syntax error.",
              "buggyCode": "n = 1\nif n == 1:\n    break",
              "fixedCode": "for n in range(3):\n    if n == 1:\n        break",
              "explanation": "break only works inside a loop; using it in a plain if statement is a syntax error."
            },
            "exercise": {
              "title": "Check your understanding: break vs continue",
              "type": "multiple-choice",
              "instructions": "Which statement about break and continue is correct?",
              "starterCode": "",
              "solution": "break ends the whole loop, while continue skips only the current iteration.",
              "solutionExplanation": "break ends the whole loop, while continue skips only the current iteration. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "break ends the whole loop, while continue skips only the current iteration.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of break vs continue from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "break and continue do the same thing.",
                "continue ends the whole loop.",
                "break ends the whole loop, while continue skips only the current iteration.",
                "break skips only the current iteration."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-loop-control-m1-l4",
            "slug": "python-loop-control-m1-l4",
            "title": "The else Clause on Loops",
            "concept": "A for or while loop can have an else block that runs only when the loop finishes normally, without hitting break. It is the natural place for the not found case after a search loop.",
            "syntax": "for n in nums:\n    if n == target:\n        break\nelse:\n    print(\"not found\")",
            "exampleCode": "for n in [1, 2]:\n    if n == 3:\n        break\nelse:\n    print(\"not found\")",
            "exampleLanguage": "python",
            "mistake": "Expecting the loop's else to run when the loop breaks, when it runs only when the loop does not break.",
            "bug": {
              "prompt": "Find the bug: this should print found but it prints not found as well.",
              "buggyCode": "for n in [1, 2, 3]:\n    if n == 3:\n        print(\"found\")\nelse:\n    print(\"not found\")",
              "fixedCode": "for n in [1, 2, 3]:\n    if n == 3:\n        print(\"found\")\n        break\nelse:\n    print(\"not found\")",
              "explanation": "Without break, the loop finishes normally and the else runs too; break after finding the item prevents the else."
            },
            "exercise": {
              "title": "Practise The else Clause on Loops",
              "type": "write-code",
              "instructions": "Search for 5 in the list [1, 2, 3] with a for loop and break; if it is not found, print \"not found\" using the loop's else.",
              "starterCode": "for n in [1, 2, 3]:\n    if n == 5:\n        print(\"found\")\n        break\nelse:\n# TODO: write this line",
              "solution": "for n in [1, 2, 3]:\n    if n == 5:\n        print(\"found\")\n        break\nelse:\n    print(\"not found\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Search for 5",
                  "stdin": "",
                  "expectedStdout": "not found\n",
                  "hidden": false
                },
                {
                  "name": "Search for 5 again",
                  "stdin": "",
                  "expectedStdout": "not found\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The else Clause on Loops is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loop-control-m1-l5",
            "slug": "python-loop-control-m1-l5",
            "title": "for-else",
            "concept": "The else block after a loop runs when the loop ends normally, and is skipped when break exits the loop. It pairs naturally with a search: break on success, and else handles the failure case.",
            "syntax": "while n < 3:\n    n += 1\nelse:\n    print(\"done\")",
            "exampleCode": "n = 0\nwhile n < 2:\n    n += 1\nelse:\n    print(\"done\")",
            "exampleLanguage": "python",
            "mistake": "Confusing a loop's else with an if/else, and expecting it to run when the condition is False.",
            "bug": {
              "prompt": "Find the bug: this should print done but it prints nothing.",
              "buggyCode": "n = 0\nwhile n < 2:\n    n += 1\n    break\nelse:\n    print(\"done\")",
              "fixedCode": "n = 0\nwhile n < 2:\n    n += 1\nelse:\n    print(\"done\")",
              "explanation": "break skips the else, so the loop's else never runs when break is hit."
            },
            "exercise": {
              "title": "Check your understanding: for-else",
              "type": "multiple-choice",
              "instructions": "Which statement about a loop's else clause is correct?",
              "starterCode": "",
              "solution": "The else runs when the loop finishes without break, so it is the natural not-found case.",
              "solutionExplanation": "The else runs when the loop finishes without break, so it is the natural not-found case. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The else runs when the loop finishes without break, so it is the natural not-found case.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of for-else from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "The else runs when the loop finishes without break, so it is the natural not-found case.",
                "The else runs when the loop breaks.",
                "The else runs before the loop starts.",
                "The else runs on every iteration."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-loop-control-m2",
        "title": "Loop Control & Patterns in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-loop-control-m2-l1",
            "slug": "python-loop-control-m2-l1",
            "title": "enumerate()",
            "concept": "enumerate() wraps a sequence and yields (index, item) pairs, so you get both the position and the value in one loop. It is cleaner than looping over range(len(...)) and indexing by hand.",
            "syntax": "for i, item in enumerate(items):",
            "exampleCode": "fruits = [\"apple\", \"banana\"]\nfor i, fruit in enumerate(fruits):\n    print(i, fruit)",
            "exampleLanguage": "python",
            "mistake": "Forgetting that enumerate() starts at 0 by default, and using the index as a 1-based number.",
            "bug": {
              "prompt": "Find the bug: this should print 1 apple, 2 banana but it prints 0 apple, 1 banana.",
              "buggyCode": "fruits = [\"apple\", \"banana\"]\nfor i, fruit in enumerate(fruits):\n    print(i, fruit)",
              "fixedCode": "fruits = [\"apple\", \"banana\"]\nfor i, fruit in enumerate(fruits, start=1):\n    print(i, fruit)",
              "explanation": "enumerate() starts at 0 by default; pass start=1 to number items from 1."
            },
            "exercise": {
              "title": "Practise enumerate()",
              "type": "write-code",
              "instructions": "Print each colour in [\"red\", \"green\", \"blue\"] with its position, like: 0 red",
              "starterCode": "colours = [\"red\", \"green\", \"blue\"]\nfor i, colour in enumerate(colours):\n# TODO: write this line",
              "solution": "colours = [\"red\", \"green\", \"blue\"]\nfor i, colour in enumerate(colours):\n    print(i, colour)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Enumerate colours",
                  "stdin": "",
                  "expectedStdout": "0 red\n1 green\n2 blue\n",
                  "hidden": false
                },
                {
                  "name": "Enumerate colours again",
                  "stdin": "",
                  "expectedStdout": "0 red\n1 green\n2 blue\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "enumerate() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loop-control-m2-l2",
            "slug": "python-loop-control-m2-l2",
            "title": "zip() Two Lists Together",
            "concept": "zip() pairs up items from two or more sequences, stopping at the shortest one. It is the standard way to loop over two related lists together, such as names and scores.",
            "syntax": "for name, score in zip(names, scores):",
            "exampleCode": "names = [\"Ada\", \"Grace\"]\nscores = [90, 85]\nfor name, score in zip(names, scores):\n    print(name, score)",
            "exampleLanguage": "python",
            "mistake": "Expecting zip() to pair every item when the lists have different lengths, when it stops at the shortest.",
            "bug": {
              "prompt": "Find the bug: this should print both pairs but it prints only one.",
              "buggyCode": "names = [\"Ada\", \"Grace\"]\nscores = [90]\nfor name, score in zip(names, scores):\n    print(name, score)",
              "fixedCode": "names = [\"Ada\", \"Grace\"]\nscores = [90, 85]\nfor name, score in zip(names, scores):\n    print(name, score)",
              "explanation": "zip() stops at the shortest list, so the extra name is dropped; both lists must have the same length to pair everything."
            },
            "exercise": {
              "title": "Practise zip() Two Lists Together",
              "type": "write-code",
              "instructions": "Print each name and score from names [\"Ada\", \"Grace\"] and scores [90, 85], like: Ada 90",
              "starterCode": "names = [\"Ada\", \"Grace\"]\nscores = [90, 85]\nfor name, score in zip(names, scores):\n# TODO: write this line",
              "solution": "names = [\"Ada\", \"Grace\"]\nscores = [90, 85]\nfor name, score in zip(names, scores):\n    print(name, score)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Zip names and scores",
                  "stdin": "",
                  "expectedStdout": "Ada 90\nGrace 85\n",
                  "hidden": false
                },
                {
                  "name": "Zip again",
                  "stdin": "",
                  "expectedStdout": "Ada 90\nGrace 85\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "zip() Two Lists Together is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-loop-control-m2-l3",
            "slug": "python-loop-control-m2-l3",
            "title": "enumerate() and zip()",
            "concept": "enumerate() turns a sequence into (index, item) pairs, and zip() turns two sequences into (item1, item2) pairs. Both are lazy, so they produce pairs one at a time as the loop asks for them.",
            "syntax": "list(enumerate([\"a\", \"b\"]))",
            "exampleCode": "print(list(enumerate([\"a\", \"b\"])))\nprint(list(zip([1, 2], [\"a\", \"b\"])))",
            "exampleLanguage": "python",
            "mistake": "Converting enumerate() to a list and expecting the original list back.",
            "bug": {
              "prompt": "Find the bug: this should print the names but it prints (0, 'Ada') and (1, 'Grace').",
              "buggyCode": "names = [\"Ada\", \"Grace\"]\nfor name in enumerate(names):\n    print(name)",
              "fixedCode": "names = [\"Ada\", \"Grace\"]\nfor i, name in enumerate(names):\n    print(name)",
              "explanation": "enumerate() yields (index, item) pairs, so a single loop variable holds the pair; unpack it into i and name to get the name alone."
            },
            "exercise": {
              "title": "Check your understanding: enumerate() and zip()",
              "type": "multiple-choice",
              "instructions": "Which statement about enumerate() and zip() is correct?",
              "starterCode": "",
              "solution": "enumerate() adds indexes to one sequence, and zip() pairs items from two sequences.",
              "solutionExplanation": "enumerate() adds indexes to one sequence, and zip() pairs items from two sequences. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "enumerate() adds indexes to one sequence, and zip() pairs items from two sequences.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of enumerate() and zip() from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "enumerate() pairs two lists together.",
                "zip() adds indexes to a single list.",
                "enumerate() and zip() both sort their input.",
                "enumerate() adds indexes to one sequence, and zip() pairs items from two sequences."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-loop-control-m2-l4",
            "slug": "python-loop-control-m2-l4",
            "title": "Sentinel-Controlled Loops",
            "concept": "A sentinel is a special value, such as -1 or an empty line, that signals the end of input, and a while loop keeps reading until it appears. It is the standard way to accept an unknown amount of input.",
            "syntax": "while value != -1:",
            "exampleCode": "total = 0\nvalue = 5\nwhile value != -1:\n    total += value\n    value = -1\nprint(total)",
            "exampleLanguage": "python",
            "mistake": "Forgetting to read the next value inside the loop, so the sentinel is never reached and the loop never ends.",
            "bug": {
              "prompt": "Find the bug: this loop should stop when it reads -1 but it never stops.",
              "buggyCode": "value = 5\nwhile value != -1:\n    print(value)",
              "fixedCode": "value = 5\nwhile value != -1:\n    print(value)\n    value = -1",
              "explanation": "value never changes inside the loop, so the condition stays True; reading a new value each time lets the loop reach the sentinel."
            },
            "exercise": {
              "title": "Practise Sentinel-Controlled Loops",
              "type": "write-code",
              "instructions": "Read numbers from input until -1 appears, then print how many numbers were read (not counting -1).",
              "starterCode": "count = 0\nvalue = int(input())\nwhile value != -1:\n    count += 1\n    value = int(input())\n# TODO: write this line",
              "solution": "count = 0\nvalue = int(input())\nwhile value != -1:\n    count += 1\n    value = int(input())\nprint(count)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "5 3 -1",
                  "stdin": "5\n3\n-1\n",
                  "expectedStdout": "2\n",
                  "hidden": false
                },
                {
                  "name": "10 -1",
                  "stdin": "10\n-1\n",
                  "expectedStdout": "1\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Sentinel-Controlled Loops is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          },
          {
            "id": "python-loop-control-m2-l5",
            "slug": "python-loop-control-m2-l5",
            "title": "Processing Input Until Done",
            "concept": "A loop that reads input until a sentinel combines while, input(), and an accumulator: read a value, process it if it is not the sentinel, then read again. It is the pattern behind score collectors, shopping lists, and chat programs.",
            "syntax": "while True:\n    line = input()\n    if line == \"done\":\n        break",
            "exampleCode": "total = 0\nwhile True:\n    line = \"done\"\n    if line == \"done\":\n        break\n    total += int(line)\nprint(total)",
            "exampleLanguage": "python",
            "mistake": "Checking the sentinel after processing the value, so the sentinel itself gets processed once.",
            "bug": {
              "prompt": "Find the bug: this should print 8 but it prints 7.",
              "buggyCode": "total = 0\nvalue = 5\nwhile value != -1:\n    value = -1\n    total += value\nprint(total)",
              "fixedCode": "total = 0\nvalue = 5\nwhile value != -1:\n    total += value\n    value = -1\nprint(total)",
              "explanation": "Updating value before adding it adds the sentinel -1 to the total; add the value first, then read the next one."
            },
            "exercise": {
              "title": "Practise Processing Input Until Done",
              "type": "write-code",
              "instructions": "Read numbers from input until -1 appears, then print their total (not counting -1).",
              "starterCode": "total = 0\nvalue = int(input())\nwhile value != -1:\n    total += value\n    value = int(input())\n# TODO: write this line",
              "solution": "total = 0\nvalue = int(input())\nwhile value != -1:\n    total += value\n    value = int(input())\nprint(total)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "5 3 -1",
                  "stdin": "5\n3\n-1\n",
                  "expectedStdout": "8\n",
                  "hidden": false
                },
                {
                  "name": "10 20 -1",
                  "stdin": "10\n20\n-1\n",
                  "expectedStdout": "30\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Processing Input Until Done is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Loop Control & Patterns Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads scores until -1 appears, then prints three lines: how many scores were read, their average, and the highest score.",
      "starterCode": "count = 0\ntotal = 0\nbest = 0\nscore = int(input())\nwhile score != -1:\n    count += 1\n    total += score\n    if score > best:\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line\nprint(total / count)\nprint(best)",
      "solution": "count = 0\ntotal = 0\nbest = 0\nscore = int(input())\nwhile score != -1:\n    count += 1\n    total += score\n    if score > best:\n        best = score\n    score = int(input())\nprint(count)\nprint(total / count)\nprint(best)",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "80 90 70 -1",
          "stdin": "80\n90\n70\n-1\n",
          "expectedStdout": "3\n80.0\n90\n",
          "hidden": false
        },
        {
          "name": "100 50 -1",
          "stdin": "100\n50\n-1\n",
          "expectedStdout": "2\n75.0\n100\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Loop Control & Patterns Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Loop Control & Patterns Capstone Project",
      "description": "A small end-to-end Python program that puts Loop Control & Patterns into practice.",
      "requirements": [
        "Use the core ideas of Loop Control & Patterns in a working Python program.",
        "Apply at least three of these skills: break, continue, else on loops, enumerate().",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Loop Control & Patterns correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-functions",
    "slug": "python-functions",
    "language": "python",
    "category": "languages",
    "title": "Functions",
    "description": "Learn to define and call functions, pass arguments, and return values \u2014 the core skill for organising any program \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Defining functions",
      "Calling functions",
      "Parameters",
      "Return values",
      "None return",
      "Docstrings",
      "Multiple returns",
      "Functions calling functions"
    ],
    "prerequisites": [
      "python-loops"
    ],
    "analogy": "Learning {topic} is like learning to write recipes: once a recipe is written down, anyone can cook the same dish again and again.",
    "modules": [
      {
        "id": "python-functions-m1",
        "title": "Functions Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-functions-m1-l1",
            "slug": "python-functions-m1-l1",
            "title": "Defining a Function",
            "concept": "A function is a named block of code defined with def, and it runs only when called. Defining a function does not run its body; the body runs each time the function is called.",
            "syntax": "def greet():\n    print(\"Hello\")",
            "exampleCode": "def greet():\n    print(\"Hello\")\n\ngreet()",
            "exampleLanguage": "python",
            "mistake": "Defining a function but never calling it, so its body never runs.",
            "bug": {
              "prompt": "Find the bug: this should print Hello but it prints nothing.",
              "buggyCode": "def greet():\n    print(\"Hello\")",
              "fixedCode": "def greet():\n    print(\"Hello\")\n\ngreet()",
              "explanation": "Defining a function only stores it; you must call greet() to run its body."
            },
            "exercise": {
              "title": "Practise Defining a Function",
              "type": "write-code",
              "instructions": "Define a function called say_hi that prints \"Hi!\" and then call it.",
              "starterCode": "def say_hi():\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def say_hi():\n    print(\"Hi!\")\n\nsay_hi()",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Call say_hi",
                  "stdin": "",
                  "expectedStdout": "Hi!\n",
                  "hidden": false
                },
                {
                  "name": "Call say_hi again",
                  "stdin": "",
                  "expectedStdout": "Hi!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Defining a Function is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-functions-m1-l2",
            "slug": "python-functions-m1-l2",
            "title": "Calling Functions",
            "concept": "Calling a function runs its body, and the call can appear anywhere after the definition. Functions can be called many times, and each call runs the body fresh from the top.",
            "syntax": "greet()  # call it",
            "exampleCode": "def greet():\n    print(\"Hello\")\n\ngreet()\ngreet()",
            "exampleLanguage": "python",
            "mistake": "Calling a function before it is defined, which raises NameError.",
            "bug": {
              "prompt": "Find the bug: this should print Hello but it crashes.",
              "buggyCode": "greet()\n\ndef greet():\n    print(\"Hello\")",
              "fixedCode": "def greet():\n    print(\"Hello\")\n\ngreet()",
              "explanation": "A function must be defined before it is called; the def must come first."
            },
            "exercise": {
              "title": "Practise Calling Functions",
              "type": "write-code",
              "instructions": "Define a function called cheer that prints \"Go team!\" and call it twice.",
              "starterCode": "def cheer():\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "def cheer():\n    print(\"Go team!\")\n\ncheer()\ncheer()",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Cheer twice",
                  "stdin": "",
                  "expectedStdout": "Go team!\nGo team!\n",
                  "hidden": false
                },
                {
                  "name": "Cheer twice again",
                  "stdin": "",
                  "expectedStdout": "Go team!\nGo team!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Calling Functions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-functions-m1-l3",
            "slug": "python-functions-m1-l3",
            "title": "def",
            "concept": "The def keyword starts a function definition, giving the function a name and, optionally, parameters in parentheses. The body is the indented block under the def line, and it runs only when the function is called.",
            "syntax": "def add(a, b):\n    return a + b",
            "exampleCode": "def add(a, b):\n    return a + b\n\nprint(add(2, 3))",
            "exampleLanguage": "python",
            "mistake": "Forgetting the colon at the end of the def line.",
            "bug": {
              "prompt": "Find the bug: this should define a function but it is a syntax error.",
              "buggyCode": "def greet()\n    print(\"Hello\")",
              "fixedCode": "def greet():\n    print(\"Hello\")",
              "explanation": "A def line needs a colon at the end, just like if and for lines."
            },
            "exercise": {
              "title": "Check your understanding: def",
              "type": "multiple-choice",
              "instructions": "Which statement about defining functions is correct?",
              "starterCode": "",
              "solution": "def creates a function that runs only when called, and the body is indented under the def line.",
              "solutionExplanation": "def creates a function that runs only when called, and the body is indented under the def line. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "def creates a function that runs only when called, and the body is indented under the def line.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of def from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "def runs the function body immediately.",
                "A function body does not need to be indented.",
                "def creates a function that runs only when called, and the body is indented under the def line.",
                "Functions must be defined after they are called."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-functions-m1-l4",
            "slug": "python-functions-m1-l4",
            "title": "Parameters",
            "concept": "Parameters are the names listed in a function's definition, and arguments are the values passed in a call. Inside the body, parameters behave like local variables holding the passed values.",
            "syntax": "def greet(name):\n    print(\"Hello\", name)",
            "exampleCode": "def greet(name):\n    print(\"Hello,\", name)\n\ngreet(\"Ada\")",
            "exampleLanguage": "python",
            "mistake": "Calling a function with the wrong number of arguments, which raises TypeError.",
            "bug": {
              "prompt": "Find the bug: this should print Hello, Ada but it crashes.",
              "buggyCode": "def greet(name):\n    print(\"Hello,\", name)\n\ngreet()",
              "fixedCode": "def greet(name):\n    print(\"Hello,\", name)\n\ngreet(\"Ada\")",
              "explanation": "greet() needs one argument, but none was passed; call it with a name."
            },
            "exercise": {
              "title": "Practise Parameters",
              "type": "write-code",
              "instructions": "Define a function called greet that takes a name and prints \"Hello, <name>!\", then call it with \"Ada\".",
              "starterCode": "def greet(name):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def greet(name):\n    print(\"Hello, \" + name + \"!\")\n\ngreet(\"Ada\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Greet Ada",
                  "stdin": "",
                  "expectedStdout": "Hello, Ada!\n",
                  "hidden": false
                },
                {
                  "name": "Greet Ada again",
                  "stdin": "",
                  "expectedStdout": "Hello, Ada!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Parameters is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-functions-m1-l5",
            "slug": "python-functions-m1-l5",
            "title": "Arguments vs Parameters",
            "concept": "Parameters are placeholders named in the def line, while arguments are the concrete values supplied when the function is called. Each call binds its arguments to the parameters, so the same function can work on different values.",
            "syntax": "def double(n):\n    return n * 2",
            "exampleCode": "def double(n):\n    return n * 2\n\nprint(double(4))",
            "exampleLanguage": "python",
            "mistake": "Using the parameter name outside the function, where it does not exist.",
            "bug": {
              "prompt": "Find the bug: this should print 8 but it crashes.",
              "buggyCode": "def double(n):\n    return n * 2\n\nprint(n)",
              "fixedCode": "def double(n):\n    return n * 2\n\nprint(double(4))",
              "explanation": "n only exists inside double(); outside the function you must call double(4) to get the value."
            },
            "exercise": {
              "title": "Check your understanding: Arguments vs Parameters",
              "type": "multiple-choice",
              "instructions": "Which statement about parameters and arguments is correct?",
              "starterCode": "",
              "solution": "Parameters are the names in the definition, and arguments are the values passed in a call.",
              "solutionExplanation": "Parameters are the names in the definition, and arguments are the values passed in a call. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Parameters are the names in the definition, and arguments are the values passed in a call.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Arguments vs Parameters from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Parameters are the names in the definition, and arguments are the values passed in a call.",
                "Parameters and arguments are the same thing.",
                "Arguments are defined in the def line.",
                "Parameters are the values passed in a call."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-functions-m2",
        "title": "Functions in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-functions-m2-l1",
            "slug": "python-functions-m2-l1",
            "title": "Return Values",
            "concept": "return sends a value back to the caller and ends the function immediately, so the caller can store or use the result. A function without return gives back None.",
            "syntax": "def add(a, b):\n    return a + b",
            "exampleCode": "def add(a, b):\n    return a + b\n\nprint(add(2, 3))",
            "exampleLanguage": "python",
            "mistake": "Printing inside a function instead of returning, so the caller gets None instead of the value.",
            "bug": {
              "prompt": "Find the bug: this should print 5 but it prints None.",
              "buggyCode": "def add(a, b):\n    print(a + b)\n\nprint(add(2, 3))",
              "fixedCode": "def add(a, b):\n    return a + b\n\nprint(add(2, 3))",
              "explanation": "print() displays the value but returns None; return sends the value back to the caller."
            },
            "exercise": {
              "title": "Practise Return Values",
              "type": "write-code",
              "instructions": "Define a function called square that returns the square of its argument, then print square(5).",
              "starterCode": "def square(n):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def square(n):\n    return n * n\n\nprint(square(5))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Square of 5",
                  "stdin": "",
                  "expectedStdout": "25\n",
                  "hidden": false
                },
                {
                  "name": "Square of 5 again",
                  "stdin": "",
                  "expectedStdout": "25\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Return Values is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-functions-m2-l2",
            "slug": "python-functions-m2-l2",
            "title": "Functions That Return None",
            "concept": "A function with no return statement, or with a bare return, gives back None. This is fine for functions whose job is to do something, such as printing, rather than to compute a value.",
            "syntax": "def greet():\n    print(\"Hi\")",
            "exampleCode": "def greet():\n    print(\"Hi\")\n\nprint(greet())",
            "exampleLanguage": "python",
            "mistake": "Using the return value of a function that only prints, and getting None.",
            "bug": {
              "prompt": "Find the bug: this should print Hi once but it prints Hi and then None.",
              "buggyCode": "def greet():\n    print(\"Hi\")\n\nprint(greet())",
              "fixedCode": "def greet():\n    print(\"Hi\")\n\ngreet()",
              "explanation": "greet() prints Hi and returns None, so print(greet()) prints None as well; call it on its own."
            },
            "exercise": {
              "title": "Practise Functions That Return None",
              "type": "write-code",
              "instructions": "Define a function called show that prints \"shown\" and returns nothing, then call it and print its return value.",
              "starterCode": "def show():\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def show():\n    print(\"shown\")\n\nprint(show())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Show and print",
                  "stdin": "",
                  "expectedStdout": "shown\nNone\n",
                  "hidden": false
                },
                {
                  "name": "Show and print again",
                  "stdin": "",
                  "expectedStdout": "shown\nNone\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Functions That Return None is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-functions-m2-l3",
            "slug": "python-functions-m2-l3",
            "title": "return vs print",
            "concept": "print() displays a value and returns None, while return gives a value back to the caller without displaying it. A function that computes a result should return it, so the caller can decide what to do with it.",
            "syntax": "return a + b",
            "exampleCode": "def add(a, b):\n    return a + b\n\nresult = add(2, 3)\nprint(result)",
            "exampleLanguage": "python",
            "mistake": "Writing code after a return statement and expecting it to run.",
            "bug": {
              "prompt": "Find the bug: this should print both lines but it prints only the first.",
              "buggyCode": "def f():\n    print(\"first\")\n    return 1\n    print(\"second\")\n\nf()",
              "fixedCode": "def f():\n    print(\"first\")\n    print(\"second\")\n    return 1\n\nf()",
              "explanation": "return ends the function immediately, so code after it never runs; move the print before the return."
            },
            "exercise": {
              "title": "Check your understanding: return vs print",
              "type": "multiple-choice",
              "instructions": "Which statement about return and print is correct?",
              "starterCode": "",
              "solution": "return sends a value back to the caller, while print only displays a value on the screen.",
              "solutionExplanation": "return sends a value back to the caller, while print only displays a value on the screen. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "return sends a value back to the caller, while print only displays a value on the screen.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of return vs print from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "return and print do the same thing.",
                "print sends a value back to the caller.",
                "return displays a value on the screen.",
                "return sends a value back to the caller, while print only displays a value on the screen."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-functions-m2-l4",
            "slug": "python-functions-m2-l4",
            "title": "Docstrings",
            "concept": "A docstring is a string literal as the first line of a function body, written in triple quotes, that documents what the function does. help() displays it, and good docstrings make functions usable without reading their code.",
            "syntax": "def add(a, b):\n    \"\"\"Return the sum of a and b.\"\"\"\n    return a + b",
            "exampleCode": "def add(a, b):\n    \"\"\"Return the sum of a and b.\"\"\"\n    return a + b\n\nprint(add.__doc__)",
            "exampleLanguage": "python",
            "mistake": "Writing a docstring after other code in the body, so it is just an unused string literal instead of documentation.",
            "bug": {
              "prompt": "Find the bug: this should show the docstring but it shows None.",
              "buggyCode": "def add(a, b):\n    total = a + b\n    \"\"\"Return the sum.\"\"\"\n    return total\n\nprint(add.__doc__)",
              "fixedCode": "def add(a, b):\n    \"\"\"Return the sum.\"\"\"\n    return a + b\n\nprint(add.__doc__)",
              "explanation": "A docstring must be the first statement in the body; placed later, it is just a string that is ignored."
            },
            "exercise": {
              "title": "Practise Docstrings",
              "type": "write-code",
              "instructions": "Define a function called cube with the docstring \"Return the cube of n.\" that returns n ** 3, then print cube(3).",
              "starterCode": "def cube(n):\n    \"\"\"Return the cube of n.\"\"\"\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def cube(n):\n    \"\"\"Return the cube of n.\"\"\"\n    return n ** 3\n\nprint(cube(3))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Cube of 3",
                  "stdin": "",
                  "expectedStdout": "27\n",
                  "hidden": false
                },
                {
                  "name": "Cube of 3 again",
                  "stdin": "",
                  "expectedStdout": "27\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Docstrings is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-functions-m2-l5",
            "slug": "python-functions-m2-l5",
            "title": "A Function Toolkit",
            "concept": "A toolkit of small functions \u2014 one for each job, with clear names and return values \u2014 turns a program into a set of reusable parts. Each function is tested on its own, and the main program just calls them in order.",
            "syntax": "def main():\n    print(greet(\"Ada\"))",
            "exampleCode": "def double(n):\n    return n * 2\n\ndef triple(n):\n    return n * 3\n\nprint(double(4), triple(4))",
            "exampleLanguage": "python",
            "mistake": "Writing one giant function that does everything, instead of splitting the work into small functions.",
            "bug": {
              "prompt": "Find the bug: this should print 8 and 12 but it prints 8 and 8.",
              "buggyCode": "def double(n):\n    return n * 2\n\ndef triple(n):\n    return n * 2\n\nprint(double(4), triple(4))",
              "fixedCode": "def double(n):\n    return n * 2\n\ndef triple(n):\n    return n * 3\n\nprint(double(4), triple(4))",
              "explanation": "triple() multiplies by 2 instead of 3; each function must do its own job."
            },
            "exercise": {
              "title": "Practise A Function Toolkit",
              "type": "write-code",
              "instructions": "Read a number from input, then print its double and its triple on one line, using two functions.",
              "starterCode": "def double(n):\n# TODO: write this line\n\ndef triple(n):\n# TODO: write this line\n\nn = int(input())\n# TODO: write this line",
              "solution": "def double(n):\n    return n * 2\n\ndef triple(n):\n    return n * 3\n\nn = int(input())\nprint(double(n), triple(n))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "4",
                  "stdin": "4\n",
                  "expectedStdout": "8 12\n",
                  "hidden": false
                },
                {
                  "name": "5",
                  "stdin": "5\n",
                  "expectedStdout": "10 15\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Function Toolkit is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Functions Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a radius, then prints the area and the circumference of the circle, each on its own line, using two functions and pi = 3.14159.",
      "starterCode": "def area(r):\n# TODO: write this line\n\ndef circumference(r):\n# TODO: write this line\n\nradius = float(input())\n# TODO: write this line\n# TODO: write this line",
      "solution": "def area(r):\n    return 3.14159 * r * r\n\ndef circumference(r):\n    return 2 * 3.14159 * r\n\nradius = float(input())\nprint(area(radius))\nprint(circumference(radius))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "2",
          "stdin": "2\n",
          "expectedStdout": "12.56636\n12.56636\n",
          "hidden": false
        },
        {
          "name": "3",
          "stdin": "3\n",
          "expectedStdout": "28.274309999999996\n18.849539999999998\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Functions Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Functions Capstone Project",
      "description": "A small end-to-end Python program that puts Functions into practice.",
      "requirements": [
        "Use the core ideas of Functions in a working Python program.",
        "Apply at least three of these skills: Defining functions, Calling functions, Parameters, Return values.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Functions correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-function-args",
    "slug": "python-function-args",
    "language": "python",
    "category": "languages",
    "title": "Function Arguments & Return Values",
    "description": "Learn the flexible ways to pass arguments \u2014 positional, keyword, defaults, *args, and **kwargs \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Positional vs keyword args",
      "Default values",
      "*args",
      "**kwargs",
      "Keyword-only args",
      "Passing functions",
      "Type hints intro",
      "Argument pitfalls"
    ],
    "prerequisites": [
      "python-functions"
    ],
    "analogy": "Learning {topic} is like learning to order at a restaurant: you can point at the menu in order, name each dish, or just say 'the usual'.",
    "modules": [
      {
        "id": "python-function-args-m1",
        "title": "Function Arguments & Return Values Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-function-args-m1-l1",
            "slug": "python-function-args-m1-l1",
            "title": "Positional and Keyword Arguments",
            "concept": "Arguments can be passed by position, in the order the parameters are defined, or by keyword, naming each parameter. Keyword arguments make calls clearer and let you pass arguments in any order.",
            "syntax": "greet(name=\"Ada\", loud=True)",
            "exampleCode": "def greet(name, loud=False):\n    print(\"Hello,\", name)\n\ngreet(\"Ada\")\ngreet(name=\"Grace\")",
            "exampleLanguage": "python",
            "mistake": "Passing a positional argument after a keyword argument, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should print Hello, Ada but it is a syntax error.",
              "buggyCode": "def greet(name, loud=False):\n    print(\"Hello,\", name)\n\ngreet(loud=True, \"Ada\")",
              "fixedCode": "def greet(name, loud=False):\n    print(\"Hello,\", name)\n\ngreet(\"Ada\", loud=True)",
              "explanation": "Positional arguments must come before keyword arguments; \"Ada\" cannot follow loud=True."
            },
            "exercise": {
              "title": "Practise Positional and Keyword Arguments",
              "type": "write-code",
              "instructions": "Define a function called power that takes base and exp and returns base ** exp, then print power(2, exp=3).",
              "starterCode": "def power(base, exp):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def power(base, exp):\n    return base ** exp\n\nprint(power(2, exp=3))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "2 to the 3",
                  "stdin": "",
                  "expectedStdout": "8\n",
                  "hidden": false
                },
                {
                  "name": "2 to the 3 again",
                  "stdin": "",
                  "expectedStdout": "8\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Positional and Keyword Arguments is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-function-args-m1-l2",
            "slug": "python-function-args-m1-l2",
            "title": "Default Parameter Values",
            "concept": "A parameter with a default value, such as def greet(name=\"friend\"), is optional: callers can omit it and the default is used. Defaults are evaluated once, when the function is defined, which matters for mutable defaults.",
            "syntax": "def greet(name=\"friend\"):",
            "exampleCode": "def greet(name=\"friend\"):\n    print(\"Hello,\", name)\n\ngreet()\ngreet(\"Ada\")",
            "exampleLanguage": "python",
            "mistake": "Putting a parameter without a default after one with a default, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should define the function but it is a syntax error.",
              "buggyCode": "def greet(name=\"friend\", loud):\n    print(\"Hello,\", name)",
              "fixedCode": "def greet(loud, name=\"friend\"):\n    print(\"Hello,\", name)",
              "explanation": "Parameters without defaults must come before parameters with defaults."
            },
            "exercise": {
              "title": "Practise Default Parameter Values",
              "type": "write-code",
              "instructions": "Define a function called repeat that takes a word and a count with default 2, and returns the word repeated count times. Print repeat(\"ha\").",
              "starterCode": "def repeat(word, count=2):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def repeat(word, count=2):\n    return word * count\n\nprint(repeat(\"ha\"))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Repeat ha",
                  "stdin": "",
                  "expectedStdout": "haha\n",
                  "hidden": false
                },
                {
                  "name": "Repeat ha again",
                  "stdin": "",
                  "expectedStdout": "haha\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Default Parameter Values is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-function-args-m1-l3",
            "slug": "python-function-args-m1-l3",
            "title": "Default Values",
            "concept": "Default values let callers omit arguments, and they are evaluated once when the function is defined. For immutable defaults such as numbers and strings this is harmless, but a mutable default such as [] is shared between calls.",
            "syntax": "def add(item, items=None):",
            "exampleCode": "def greet(name=\"friend\"):\n    return \"Hello, \" + name\n\nprint(greet())",
            "exampleLanguage": "python",
            "mistake": "Using a mutable default such as [] and being surprised when it keeps values between calls.",
            "bug": {
              "prompt": "Find the bug: this should print [1] twice but it prints [1] then [1, 1].",
              "buggyCode": "def add(item, items=[]):\n    items.append(item)\n    return items\n\nprint(add(1))\nprint(add(1))",
              "fixedCode": "def add(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n\nprint(add(1))\nprint(add(1))",
              "explanation": "The default [] is created once and shared between calls; use None as the default and create a fresh list inside."
            },
            "exercise": {
              "title": "Check your understanding: Default Values",
              "type": "multiple-choice",
              "instructions": "Which statement about default parameter values is correct?",
              "starterCode": "",
              "solution": "A parameter with a default is optional, and the default is used when the caller omits that argument.",
              "solutionExplanation": "A parameter with a default is optional, and the default is used when the caller omits that argument. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A parameter with a default is optional, and the default is used when the caller omits that argument.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Default Values from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Default values are evaluated fresh on every call.",
                "A parameter with a default must always be passed.",
                "A parameter with a default is optional, and the default is used when the caller omits that argument.",
                "Default values can only be numbers."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-function-args-m1-l4",
            "slug": "python-function-args-m1-l4",
            "title": "*args for Extra Arguments",
            "concept": "*args collects any extra positional arguments into a tuple, so a function can accept any number of them. Inside the body, args is an ordinary tuple you can loop over or pass to sum().",
            "syntax": "def total(*args):\n    return sum(args)",
            "exampleCode": "def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3))\nprint(total())",
            "exampleLanguage": "python",
            "mistake": "Forgetting the * and treating args as a single value instead of a tuple.",
            "bug": {
              "prompt": "Find the bug: this should print 6 but it crashes.",
              "buggyCode": "def total(args):\n    return sum(args)\n\nprint(total(1, 2, 3))",
              "fixedCode": "def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3))",
              "explanation": "Without *, the function takes one argument; *args collects all the passed values into a tuple."
            },
            "exercise": {
              "title": "Practise *args for Extra Arguments",
              "type": "write-code",
              "instructions": "Define a function called total that takes any number of arguments and returns their sum, then print total(1, 2, 3, 4).",
              "starterCode": "def total(*args):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3, 4))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Total 1-4",
                  "stdin": "",
                  "expectedStdout": "10\n",
                  "hidden": false
                },
                {
                  "name": "Total 1-4 again",
                  "stdin": "",
                  "expectedStdout": "10\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "*args for Extra Arguments is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-function-args-m1-l5",
            "slug": "python-function-args-m1-l5",
            "title": "*args",
            "concept": "The * in *args packs extra positional arguments into a tuple named args, and the matching ** in **kwargs packs extra keyword arguments into a dictionary. Both let a function accept a flexible number of arguments.",
            "syntax": "def f(*args, **kwargs):",
            "exampleCode": "def show(*args):\n    print(args)\n\nshow(1, 2, 3)",
            "exampleLanguage": "python",
            "mistake": "Putting *args after a keyword-only parameter, which changes how arguments are matched.",
            "bug": {
              "prompt": "Find the bug: this should print (1, 2, 3) but it crashes.",
              "buggyCode": "def show(args):\n    print(args)\n\nshow(1, 2, 3)",
              "fixedCode": "def show(*args):\n    print(args)\n\nshow(1, 2, 3)",
              "explanation": "show() takes one argument, but three were passed; *args collects them all into a tuple."
            },
            "exercise": {
              "title": "Check your understanding: *args",
              "type": "multiple-choice",
              "instructions": "Which statement about *args is correct?",
              "starterCode": "",
              "solution": "*args collects extra positional arguments into a tuple inside the function.",
              "solutionExplanation": "*args collects extra positional arguments into a tuple inside the function. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "*args collects extra positional arguments into a tuple inside the function.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of *args from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "*args collects extra positional arguments into a tuple inside the function.",
                "*args collects extra keyword arguments into a dictionary.",
                "*args can only collect exactly one argument.",
                "*args makes a function return a tuple of all its results."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-function-args-m2",
        "title": "Function Arguments & Return Values in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-function-args-m2-l1",
            "slug": "python-function-args-m2-l1",
            "title": "**kwargs for Named Extras",
            "concept": "**kwargs collects extra keyword arguments into a dictionary, so a function can accept any named options. Inside the body, kwargs maps each option name to its value, and .get() reads optional ones safely.",
            "syntax": "def build(**kwargs):\n    return kwargs",
            "exampleCode": "def build(**kwargs):\n    return kwargs\n\nprint(build(name=\"Ada\", age=36))",
            "exampleLanguage": "python",
            "mistake": "Passing a keyword argument that is not a valid identifier, such as a number.",
            "bug": {
              "prompt": "Find the bug: this should print the options but it crashes.",
              "buggyCode": "def build(**kwargs):\n    return kwargs\n\nprint(build(1=\"one\"))",
              "fixedCode": "def build(**kwargs):\n    return kwargs\n\nprint(build(one=1))",
              "explanation": "Keyword argument names must be valid identifiers; 1 is not one, so the call is a syntax error."
            },
            "exercise": {
              "title": "Practise **kwargs for Named Extras",
              "type": "write-code",
              "instructions": "Define a function called show_options that takes **kwargs and returns the dictionary, then print show_options(colour=\"red\", size=3).",
              "starterCode": "def show_options(**kwargs):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def show_options(**kwargs):\n    return kwargs\n\nprint(show_options(colour=\"red\", size=3))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Show options",
                  "stdin": "",
                  "expectedStdout": "{'colour': 'red', 'size': 3}\n",
                  "hidden": false
                },
                {
                  "name": "Show options again",
                  "stdin": "",
                  "expectedStdout": "{'colour': 'red', 'size': 3}\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "**kwargs for Named Extras is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-function-args-m2-l2",
            "slug": "python-function-args-m2-l2",
            "title": "Mixing Argument Kinds",
            "concept": "A function can mix positional parameters, defaults, *args, and **kwargs, but they must appear in that order in the definition. Calls follow the same order: positionals first, then keywords.",
            "syntax": "def f(a, b=2, *args, **kwargs):",
            "exampleCode": "def f(a, b=2, *args, **kwargs):\n    return (a, b, args, kwargs)\n\nprint(f(1))\nprint(f(1, 3, 4, 5, x=6))",
            "exampleLanguage": "python",
            "mistake": "Passing the same argument both positionally and by keyword, which raises TypeError.",
            "bug": {
              "prompt": "Find the bug: this should print (1, 2) but it crashes.",
              "buggyCode": "def f(a, b=2):\n    return (a, b)\n\nprint(f(1, b=2, a=3))",
              "fixedCode": "def f(a, b=2):\n    return (a, b)\n\nprint(f(1, 2))",
              "explanation": "a is passed both positionally as 1 and by keyword as 3; each argument may be given only once."
            },
            "exercise": {
              "title": "Practise Mixing Argument Kinds",
              "type": "write-code",
              "instructions": "Define a function called describe that takes a name, an age with default 0, and any extra keyword options, and returns a tuple of (name, age, options). Print describe(\"Ada\", 36, city=\"London\").",
              "starterCode": "def describe(name, age=0, **options):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def describe(name, age=0, **options):\n    return (name, age, options)\n\nprint(describe(\"Ada\", 36, city=\"London\"))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Describe Ada",
                  "stdin": "",
                  "expectedStdout": "('Ada', 36, {'city': 'London'})\n",
                  "hidden": false
                },
                {
                  "name": "Describe Ada again",
                  "stdin": "",
                  "expectedStdout": "('Ada', 36, {'city': 'London'})\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Mixing Argument Kinds is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-function-args-m2-l3",
            "slug": "python-function-args-m2-l3",
            "title": "Mutable Defaults",
            "concept": "Default values are evaluated once, when the def statement runs, so a mutable default such as [] is the same object on every call. The standard fix is to default to None and create the list inside the body.",
            "syntax": "def f(items=None):\n    if items is None:\n        items = []",
            "exampleCode": "def add(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n\nprint(add(1))\nprint(add(2))",
            "exampleLanguage": "python",
            "mistake": "Using a dictionary as a default and accumulating entries across calls.",
            "bug": {
              "prompt": "Find the bug: this should print {} then {'a': 1} but it prints {'a': 1} twice.",
              "buggyCode": "def store(d={}):\n    d[\"a\"] = 1\n    return d\n\nprint(store())\nprint(store())",
              "fixedCode": "def store(d=None):\n    if d is None:\n        d = {}\n    d[\"a\"] = 1\n    return d\n\nprint(store())\nprint(store())",
              "explanation": "The default {} is shared between calls, so the second call sees the first call's entry; use None and build a fresh dict inside."
            },
            "exercise": {
              "title": "Check your understanding: Mutable Defaults",
              "type": "multiple-choice",
              "instructions": "Which statement about mutable default values is correct?",
              "starterCode": "",
              "solution": "A list default is created once and shared between calls, so use None and create a fresh list inside.",
              "solutionExplanation": "A list default is created once and shared between calls, so use None and create a fresh list inside. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A list default is created once and shared between calls, so use None and create a fresh list inside.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Mutable Defaults from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A list default is created fresh on every call.",
                "Mutable defaults are the recommended way to share state.",
                "Default values are never shared between calls.",
                "A list default is created once and shared between calls, so use None and create a fresh list inside."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-function-args-m2-l4",
            "slug": "python-function-args-m2-l4",
            "title": "Type Hints in Signatures",
            "concept": "Type hints such as def add(a: int, b: int) -> int: document the expected types of parameters and the return value. Python ignores them at runtime, but editors and type checkers use them to catch mistakes early.",
            "syntax": "def add(a: int, b: int) -> int:",
            "exampleCode": "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(2, 3))",
            "exampleLanguage": "python",
            "mistake": "Assuming type hints are enforced at runtime, when Python ignores them completely.",
            "bug": {
              "prompt": "Find the bug: this should fail with a type error but it prints 23.",
              "buggyCode": "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(\"2\", \"3\"))",
              "fixedCode": "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(2, 3))",
              "explanation": "Type hints are documentation only; Python does not check them, so add(\"2\", \"3\") happily joins the strings."
            },
            "exercise": {
              "title": "Practise Type Hints in Signatures",
              "type": "write-code",
              "instructions": "Define a function called shout with a type hint, def shout(word: str) -> str:, that returns the word in uppercase, then print shout(\"hello\").",
              "starterCode": "def shout(word: str) -> str:\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "def shout(word: str) -> str:\n    return word.upper()\n\nprint(shout(\"hello\"))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Shout hello",
                  "stdin": "",
                  "expectedStdout": "HELLO\n",
                  "hidden": false
                },
                {
                  "name": "Shout hello again",
                  "stdin": "",
                  "expectedStdout": "HELLO\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Type Hints in Signatures is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-function-args-m2-l5",
            "slug": "python-function-args-m2-l5",
            "title": "A Flexible Greeting Function",
            "concept": "A greeting function with a default name, an optional punctuation choice, and *args for extra names shows how defaults and *args combine. One flexible function replaces several narrow ones.",
            "syntax": "def greet(*names, punctuation=\"!\"):",
            "exampleCode": "def greet(*names, punctuation=\"!\"):\n    for name in names:\n        print(\"Hello,\", name + punctuation)\n\ngreet(\"Ada\", \"Grace\")",
            "exampleLanguage": "python",
            "mistake": "Putting a regular parameter after *args without making it keyword-only, and being surprised by how it must be passed.",
            "bug": {
              "prompt": "Find the bug: this should greet Ada and Grace with '?' but it greets a third name instead.",
              "buggyCode": "def greet(*names, punctuation=\"!\"):\n    for name in names:\n        print(\"Hello,\", name + punctuation)\n\ngreet(\"Ada\", \"Grace\", \"?\")",
              "fixedCode": "def greet(*names, punctuation=\"!\"):\n    for name in names:\n        print(\"Hello,\", name + punctuation)\n\ngreet(\"Ada\", \"Grace\", punctuation=\"?\")",
              "explanation": "After *args, punctuation is keyword-only, so \"?\" passed positionally is treated as another name; pass it as punctuation=\"?\"."
            },
            "exercise": {
              "title": "Practise A Flexible Greeting Function",
              "type": "write-code",
              "instructions": "Read two names from input, then print a greeting for each one using a function that takes *names.",
              "starterCode": "def greet(*names):\n    for name in names:\n# TODO: write this line\n\na = input()\n# TODO: write this line\ngreet(a, b)",
              "solution": "def greet(*names):\n    for name in names:\n        print(\"Hello, \" + name + \"!\")\n\na = input()\nb = input()\ngreet(a, b)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Ada Grace",
                  "stdin": "Ada\nGrace\n",
                  "expectedStdout": "Hello, Ada!\nHello, Grace!\n",
                  "hidden": false
                },
                {
                  "name": "Tom Jerry",
                  "stdin": "Tom\nJerry\n",
                  "expectedStdout": "Hello, Tom!\nHello, Jerry!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Flexible Greeting Function is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Function Arguments & Return Values Capstone",
      "type": "write-code",
      "instructions": "Write a function called calculate that takes an operation (\"add\" or \"multiply\") and any number of values, and returns the sum or the product. Print calculate(\"add\", 1, 2, 3) and calculate(\"multiply\", 2, 3, 4).",
      "starterCode": "def calculate(operation, *numbers):\n    if operation == \"add\":\n# TODO: write this line\n    if operation == \"multiply\":\n        result = 1\n        for n in numbers:\n            result *= n\n# TODO: write this line\n    return 0\n\n# TODO: write this line\n# TODO: write this line",
      "solution": "def calculate(operation, *numbers):\n    if operation == \"add\":\n        return sum(numbers)\n    if operation == \"multiply\":\n        result = 1\n        for n in numbers:\n            result *= n\n        return result\n    return 0\n\nprint(calculate(\"add\", 1, 2, 3))\nprint(calculate(\"multiply\", 2, 3, 4))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Add and multiply",
          "stdin": "",
          "expectedStdout": "6\n24\n",
          "hidden": false
        },
        {
          "name": "Add and multiply again",
          "stdin": "",
          "expectedStdout": "6\n24\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Function Arguments & Return Values Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
        "structure": "Write a short program that prints exactly what the instructions ask for."
      }
    },
    "capstone": {
      "title": "Function Arguments & Return Values Capstone Project",
      "description": "A small end-to-end Python program that puts Function Arguments & Return Values into practice.",
      "requirements": [
        "Use the core ideas of Function Arguments & Return Values in a working Python program.",
        "Apply at least three of these skills: Positional vs keyword args, Default values, *args, **kwargs.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Function Arguments & Return Values correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-scope-lambda",
    "slug": "python-scope-lambda",
    "language": "python",
    "category": "languages",
    "title": "Scope, Lambda & Higher-Order Functions",
    "description": "Learn scope, the global keyword, lambdas, map and filter, and closures \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "Local vs global scope",
      "The global keyword",
      "LEGB rule",
      "Lambda expressions",
      "map()/filter()",
      "Closures",
      "Nested functions",
      "nonlocal"
    ],
    "prerequisites": [
      "python-function-args"
    ],
    "analogy": "Learning {topic} is like learning the rooms of a house: each room has its own things, and you need to know which door leads where.",
    "modules": [
      {
        "id": "python-scope-lambda-m1",
        "title": "Scope, Lambda & Higher-Order Functions Fundamentals",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-scope-lambda-m1-l1",
            "slug": "python-scope-lambda-m1-l1",
            "title": "Local and Global Scope",
            "concept": "A variable defined inside a function is local: it exists only while the function runs. A variable defined at the top level is global: any function can read it, but assigning to it inside a function creates a new local instead.",
            "syntax": "x = 10  # global",
            "exampleCode": "x = 10\n\ndef show():\n    y = 5\n    print(x, y)\n\nshow()",
            "exampleLanguage": "python",
            "mistake": "Reading a global variable inside a function and then assigning to the same name later in the function, which makes Python treat it as local everywhere in that function.",
            "bug": {
              "prompt": "Find the bug: this should print 10 then 11 but it crashes.",
              "buggyCode": "x = 10\n\ndef show():\n    print(x)\n    x = 11\n\nshow()",
              "fixedCode": "x = 10\n\ndef show():\n    print(x)\n\nshow()",
              "explanation": "Assigning to x anywhere in the function makes x local throughout it, so the print reads the local x before it is assigned."
            },
            "exercise": {
              "title": "Practise Local and Global Scope",
              "type": "write-code",
              "instructions": "Define a global variable called version set to 1, and a function that prints it. Call the function.",
              "starterCode": "version = 1\n\ndef show_version():\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "version = 1\n\ndef show_version():\n    print(version)\n\nshow_version()",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print version",
                  "stdin": "",
                  "expectedStdout": "1\n",
                  "hidden": false
                },
                {
                  "name": "Print version again",
                  "stdin": "",
                  "expectedStdout": "1\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Local and Global Scope is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-scope-lambda-m1-l2",
            "slug": "python-scope-lambda-m1-l2",
            "title": "The global Keyword",
            "concept": "The global statement tells Python that an assignment inside a function refers to the global variable, not a new local one. It is rarely the best design \u2014 returning a value is usually clearer \u2014 but it is the way to change global state from inside a function.",
            "syntax": "global count",
            "exampleCode": "count = 0\n\ndef bump():\n    global count\n    count += 1\n\nbump()\nprint(count)",
            "exampleLanguage": "python",
            "mistake": "Forgetting global and creating a local variable that shadows the global one.",
            "bug": {
              "prompt": "Find the bug: this should print 1 but it prints 0.",
              "buggyCode": "count = 0\n\ndef bump():\n    count = count + 1\n\nbump()\nprint(count)",
              "fixedCode": "count = 0\n\ndef bump():\n    global count\n    count = count + 1\n\nbump()\nprint(count)",
              "explanation": "Without global, count = count + 1 creates a local count; global makes the assignment change the global one."
            },
            "exercise": {
              "title": "Practise The global Keyword",
              "type": "write-code",
              "instructions": "Start with a global total of 0. Define a function called add_to_total that adds a number to the global total using the global keyword, call it with 5, then print total.",
              "starterCode": "total = 0\n\ndef add_to_total(n):\n    global total\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "total = 0\n\ndef add_to_total(n):\n    global total\n    total += n\n\nadd_to_total(5)\nprint(total)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Add 5 to total",
                  "stdin": "",
                  "expectedStdout": "5\n",
                  "hidden": false
                },
                {
                  "name": "Add 5 again",
                  "stdin": "",
                  "expectedStdout": "5\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The global Keyword is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-scope-lambda-m1-l3",
            "slug": "python-scope-lambda-m1-l3",
            "title": "Scope",
            "concept": "Scope decides where a name is visible: local names live inside one function, enclosing names live in an outer function, global names live at module level, and built-in names are always available. Python looks names up in that order, which is the LEGB rule.",
            "syntax": "x = 1  # global",
            "exampleCode": "x = 1\n\ndef f():\n    x = 2\n    print(x)\n\nf()\nprint(x)",
            "exampleLanguage": "python",
            "mistake": "Assuming a change to a local variable affects the global variable of the same name.",
            "bug": {
              "prompt": "Find the bug: this should leave the global x at 1 but it prints 2.",
              "buggyCode": "x = 1\n\ndef f():\n    global x\n    x = 2\n\nf()\nprint(x)",
              "fixedCode": "x = 1\n\ndef f():\n    x = 2\n\nf()\nprint(x)",
              "explanation": "global x makes the assignment change the module-level x; without it, f() only changes its own local x."
            },
            "exercise": {
              "title": "Check your understanding: Scope",
              "type": "multiple-choice",
              "instructions": "Which statement about scope is correct?",
              "starterCode": "",
              "solution": "A variable defined inside a function is local to that function and does not exist outside it.",
              "solutionExplanation": "A variable defined inside a function is local to that function and does not exist outside it. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A variable defined inside a function is local to that function and does not exist outside it.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Scope from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Variables defined in a function are visible everywhere.",
                "A global variable cannot be read inside a function.",
                "A variable defined inside a function is local to that function and does not exist outside it.",
                "Local variables keep their values between calls."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-scope-lambda-m1-l4",
            "slug": "python-scope-lambda-m1-l4",
            "title": "Lambda Expressions",
            "concept": "A lambda is a small anonymous function written as lambda args: expression, and it returns the value of the expression. Lambdas are used where a tiny function is needed once, such as a sort key.",
            "syntax": "double = lambda n: n * 2",
            "exampleCode": "double = lambda n: n * 2\nprint(double(4))\nprint(sorted([3, 1, 2], key=lambda n: -n))",
            "exampleLanguage": "python",
            "mistake": "Trying to put statements such as if or a loop inside a lambda, which only allows a single expression.",
            "bug": {
              "prompt": "Find the bug: this should print 8 but it is a syntax error.",
              "buggyCode": "double = lambda n: return n * 2\nprint(double(4))",
              "fixedCode": "double = lambda n: n * 2\nprint(double(4))",
              "explanation": "A lambda body is a single expression, not a statement; return is not allowed inside one."
            },
            "exercise": {
              "title": "Practise Lambda Expressions",
              "type": "write-code",
              "instructions": "Define a lambda called triple that multiplies its argument by 3, then print triple(4).",
              "starterCode": "triple = lambda n: n * 3\n# TODO: write this line",
              "solution": "triple = lambda n: n * 3\nprint(triple(4))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Triple 4",
                  "stdin": "",
                  "expectedStdout": "12\n",
                  "hidden": false
                },
                {
                  "name": "Triple 4 again",
                  "stdin": "",
                  "expectedStdout": "12\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Lambda Expressions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-scope-lambda-m1-l5",
            "slug": "python-scope-lambda-m1-l5",
            "title": "Lambda",
            "concept": "lambda creates a function without a name, useful for short throwaway functions passed to other functions. A lambda body is one expression, so anything needing statements belongs in a def instead.",
            "syntax": "key=lambda s: len(s)",
            "exampleCode": "print(sorted([\"pear\", \"fig\", \"apple\"], key=lambda s: len(s)))",
            "exampleLanguage": "python",
            "mistake": "Assigning a lambda to a name instead of using def, which linters flag because a def is clearer.",
            "bug": {
              "prompt": "Find the bug: this should print the longest word but it prints the shortest.",
              "buggyCode": "words = [\"pear\", \"fig\", \"apple\"]\nprint(min(words, key=lambda s: len(s)))",
              "fixedCode": "words = [\"pear\", \"fig\", \"apple\"]\nprint(max(words, key=lambda s: len(s)))",
              "explanation": "min() with a length key finds the shortest word; max() finds the longest."
            },
            "exercise": {
              "title": "Check your understanding: Lambda",
              "type": "multiple-choice",
              "instructions": "Which statement about lambda is correct?",
              "starterCode": "",
              "solution": "A lambda is a small anonymous function whose body is a single expression.",
              "solutionExplanation": "A lambda is a small anonymous function whose body is a single expression. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A lambda is a small anonymous function whose body is a single expression.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Lambda from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A lambda is a small anonymous function whose body is a single expression.",
                "A lambda can contain any number of statements.",
                "A lambda must always be given a name.",
                "A lambda cannot take arguments."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-scope-lambda-m2",
        "title": "Scope, Lambda & Higher-Order Functions in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-scope-lambda-m2-l1",
            "slug": "python-scope-lambda-m2-l1",
            "title": "map() with a Function",
            "concept": "map(function, iterable) applies the function to every item and returns a lazy iterator of the results. Wrapping it in list() gives the results as a list, and map() with a lambda is a compact way to transform data.",
            "syntax": "list(map(str, [1, 2]))",
            "exampleCode": "print(list(map(lambda n: n * 2, [1, 2, 3])))",
            "exampleLanguage": "python",
            "mistake": "Forgetting that map() is lazy and printing the map object instead of its items.",
            "bug": {
              "prompt": "Find the bug: this should print [2, 4, 6] but it prints <map object ...>.",
              "buggyCode": "print(map(lambda n: n * 2, [1, 2, 3]))",
              "fixedCode": "print(list(map(lambda n: n * 2, [1, 2, 3])))",
              "explanation": "map() returns a lazy iterator, not a list; list() materialises it so the values print."
            },
            "exercise": {
              "title": "Practise map() with a Function",
              "type": "write-code",
              "instructions": "Use map() with a lambda to double each number in [1, 2, 3, 4] and print the resulting list.",
              "starterCode": "# TODO: write this line",
              "solution": "print(list(map(lambda n: n * 2, [1, 2, 3, 4])))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Double numbers",
                  "stdin": "",
                  "expectedStdout": "[2, 4, 6, 8]\n",
                  "hidden": false
                },
                {
                  "name": "Double numbers again",
                  "stdin": "",
                  "expectedStdout": "[2, 4, 6, 8]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "map() with a Function is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-scope-lambda-m2-l2",
            "slug": "python-scope-lambda-m2-l2",
            "title": "filter() with a Function",
            "concept": "filter(function, iterable) keeps only the items for which the function returns True, and returns a lazy iterator. It is the functional way to select items, and a list comprehension often reads more clearly.",
            "syntax": "list(filter(lambda n: n > 0, nums))",
            "exampleCode": "print(list(filter(lambda n: n > 0, [-1, 2, -3, 4])))",
            "exampleLanguage": "python",
            "mistake": "Forgetting that filter() keeps items where the function is truthy, not where it is False.",
            "bug": {
              "prompt": "Find the bug: this should print [2, 4] but it prints [-1, -3].",
              "buggyCode": "print(list(filter(lambda n: n < 0, [-1, 2, -3, 4])))",
              "fixedCode": "print(list(filter(lambda n: n > 0, [-1, 2, -3, 4])))",
              "explanation": "filter() keeps items where the test is True; n < 0 keeps the negatives instead of the positives."
            },
            "exercise": {
              "title": "Practise filter() with a Function",
              "type": "write-code",
              "instructions": "Use filter() with a lambda to keep only the even numbers from [1, 2, 3, 4, 5, 6] and print the resulting list.",
              "starterCode": "# TODO: write this line",
              "solution": "print(list(filter(lambda n: n % 2 == 0, [1, 2, 3, 4, 5, 6])))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Even numbers",
                  "stdin": "",
                  "expectedStdout": "[2, 4, 6]\n",
                  "hidden": false
                },
                {
                  "name": "Even numbers again",
                  "stdin": "",
                  "expectedStdout": "[2, 4, 6]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "filter() with a Function is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-scope-lambda-m2-l3",
            "slug": "python-scope-lambda-m2-l3",
            "title": "map/filter Laziness",
            "concept": "map() and filter() return lazy iterators that produce values one at a time, and they can only be consumed once. Converting them with list() gives a reusable list of results.",
            "syntax": "list(map(f, xs))",
            "exampleCode": "m = map(lambda n: n * 2, [1, 2])\nprint(list(m))\nprint(list(m))",
            "exampleLanguage": "python",
            "mistake": "Iterating over a map object twice and being surprised that the second pass is empty.",
            "bug": {
              "prompt": "Find the bug: this should print [2, 4] twice but the second print is [].",
              "buggyCode": "m = map(lambda n: n * 2, [1, 2])\nprint(list(m))\nprint(list(m))",
              "fixedCode": "m = map(lambda n: n * 2, [1, 2])\nprint(list(m))\nm = map(lambda n: n * 2, [1, 2])\nprint(list(m))",
              "explanation": "A map iterator is exhausted after one pass; create a fresh map, or store the list, to use the results again."
            },
            "exercise": {
              "title": "Check your understanding: map/filter Laziness",
              "type": "multiple-choice",
              "instructions": "Which statement about map() and filter() is correct?",
              "starterCode": "",
              "solution": "Both return lazy iterators, so you must wrap them in list() to see all the results.",
              "solutionExplanation": "Both return lazy iterators, so you must wrap them in list() to see all the results. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Both return lazy iterators, so you must wrap them in list() to see all the results.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of map/filter Laziness from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "map() and filter() both return lists.",
                "map() returns a list but filter() returns an iterator.",
                "map() and filter() change the original list in place.",
                "Both return lazy iterators, so you must wrap them in list() to see all the results."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-scope-lambda-m2-l4",
            "slug": "python-scope-lambda-m2-l4",
            "title": "Nested Functions and Closures",
            "concept": "A function defined inside another function can read the outer function's variables, and if the inner function is returned, it remembers them even after the outer call ends. That remembered state is called a closure.",
            "syntax": "def make_adder(n):\n    def add(x):\n        return x + n\n    return add",
            "exampleCode": "def make_adder(n):\n    def add(x):\n        return x + n\n    return add\n\nadd5 = make_adder(5)\nprint(add5(10))",
            "exampleLanguage": "python",
            "mistake": "Expecting the inner function to keep a copy of the outer variable, when it keeps a reference that can change.",
            "bug": {
              "prompt": "Find the bug: this should print 15 but it prints 10.",
              "buggyCode": "def make_adder(n):\n    def add(x):\n        return x\n    return add\n\nadd5 = make_adder(5)\nprint(add5(10))",
              "fixedCode": "def make_adder(n):\n    def add(x):\n        return x + n\n    return add\n\nadd5 = make_adder(5)\nprint(add5(10))",
              "explanation": "The inner function must use n from the enclosing scope; returning x alone ignores the captured value."
            },
            "exercise": {
              "title": "Practise Nested Functions and Closures",
              "type": "write-code",
              "instructions": "Define a function called make_multiplier that takes n and returns a function multiplying its argument by n. Create times3 = make_multiplier(3) and print times3(7).",
              "starterCode": "def make_multiplier(n):\n    def multiply(x):\n# TODO: write this line\n    return multiply\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "def make_multiplier(n):\n    def multiply(x):\n        return x * n\n    return multiply\n\ntimes3 = make_multiplier(3)\nprint(times3(7))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Times 3 of 7",
                  "stdin": "",
                  "expectedStdout": "21\n",
                  "hidden": false
                },
                {
                  "name": "Times 3 of 7 again",
                  "stdin": "",
                  "expectedStdout": "21\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Nested Functions and Closures is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-scope-lambda-m2-l5",
            "slug": "python-scope-lambda-m2-l5",
            "title": "A Sorting Key Program",
            "concept": "The key argument of sorted() takes a function that computes a sort key for each item, and lambdas are the usual way to write those keys. Sorting by length, by the last character, or by a field of a tuple all use the same pattern.",
            "syntax": "sorted(words, key=len)",
            "exampleCode": "words = [\"pear\", \"fig\", \"apple\"]\nprint(sorted(words, key=len))\nprint(sorted(words, key=lambda s: s[-1]))",
            "exampleLanguage": "python",
            "mistake": "Passing the result of calling the key function instead of the function itself.",
            "bug": {
              "prompt": "Find the bug: this should sort by length but it crashes.",
              "buggyCode": "words = [\"pear\", \"fig\", \"apple\"]\nprint(sorted(words, key=len(words)))",
              "fixedCode": "words = [\"pear\", \"fig\", \"apple\"]\nprint(sorted(words, key=len))",
              "explanation": "key needs the function itself, len, not the result of calling it, len(words), which is a number."
            },
            "exercise": {
              "title": "Practise A Sorting Key Program",
              "type": "write-code",
              "instructions": "Sort the words [\"pear\", \"fig\", \"apple\", \"banana\"] by length and print the sorted list.",
              "starterCode": "words = [\"pear\", \"fig\", \"apple\", \"banana\"]\n# TODO: write this line",
              "solution": "words = [\"pear\", \"fig\", \"apple\", \"banana\"]\nprint(sorted(words, key=len))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Sort by length",
                  "stdin": "",
                  "expectedStdout": "['fig', 'pear', 'apple', 'banana']\n",
                  "hidden": false
                },
                {
                  "name": "Sort by length again",
                  "stdin": "",
                  "expectedStdout": "['fig', 'pear', 'apple', 'banana']\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Sorting Key Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Scope, Lambda & Higher-Order Functions Capstone",
      "type": "write-code",
      "instructions": "Write a program that starts with the list [3, -1, 4, -2, 5], keeps only the positive numbers with filter() and a lambda, doubles them with map() and a lambda, then prints the sorted doubled list and their total, each on its own line.",
      "starterCode": "nums = [3, -1, 4, -2, 5]\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line",
      "solution": "nums = [3, -1, 4, -2, 5]\npositives = list(filter(lambda n: n > 0, nums))\ndoubled = list(map(lambda n: n * 2, positives))\nprint(sorted(doubled))\nprint(sum(doubled))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Transform numbers",
          "stdin": "",
          "expectedStdout": "[6, 8, 10]\n24\n",
          "hidden": false
        },
        {
          "name": "Transform again",
          "stdin": "",
          "expectedStdout": "[6, 8, 10]\n24\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Scope, Lambda & Higher-Order Functions Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
        "structure": "Write a short program that prints exactly what the instructions ask for."
      }
    },
    "capstone": {
      "title": "Scope, Lambda & Higher-Order Functions Capstone Project",
      "description": "A small end-to-end Python program that puts Scope, Lambda & Higher-Order Functions into practice.",
      "requirements": [
        "Use the core ideas of Scope, Lambda & Higher-Order Functions in a working Python program.",
        "Apply at least three of these skills: Local vs global scope, The global keyword, LEGB rule, Lambda expressions.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Scope, Lambda & Higher-Order Functions correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-modules",
    "slug": "python-modules",
    "language": "python",
    "category": "languages",
    "title": "Modules & Imports",
    "description": "Learn to use Python's standard library \u2014 math, random, datetime \u2014 and to organise your own code into modules, with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 8,
    "skills": [
      "import",
      "from import",
      "math module",
      "random module",
      "datetime",
      "Creating your own module",
      "__name__ == \"__main__\"",
      "Module search path"
    ],
    "prerequisites": [
      "python-functions"
    ],
    "analogy": "Learning {topic} is like learning to use a library: instead of writing every book yourself, you borrow the ones you need.",
    "modules": [
      {
        "id": "python-modules-m1",
        "title": "Modules & Imports Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-modules-m1-l1",
            "slug": "python-modules-m1-l1",
            "title": "Importing a Module",
            "concept": "A module is a file of Python code, and import brings it into your program under its name. You then use its contents with dot notation, such as math.sqrt(16).",
            "syntax": "import math",
            "exampleCode": "import math\nprint(math.sqrt(16))\nprint(math.pi)",
            "exampleLanguage": "python",
            "mistake": "Importing a module and then using its functions without the module name prefix.",
            "bug": {
              "prompt": "Find the bug: this should print 4.0 but it crashes.",
              "buggyCode": "import math\nprint(sqrt(16))",
              "fixedCode": "import math\nprint(math.sqrt(16))",
              "explanation": "import math binds the name math, not the names inside it; use math.sqrt() with the prefix."
            },
            "exercise": {
              "title": "Practise Importing a Module",
              "type": "write-code",
              "instructions": "Import the math module and print the value of math.pi rounded to 2 decimal places.",
              "starterCode": "import math\n# TODO: write this line",
              "solution": "import math\nprint(round(math.pi, 2))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print pi",
                  "stdin": "",
                  "expectedStdout": "3.14\n",
                  "hidden": false
                },
                {
                  "name": "Print pi again",
                  "stdin": "",
                  "expectedStdout": "3.14\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Importing a Module is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-modules-m1-l2",
            "slug": "python-modules-m1-l2",
            "title": "from ... import ...",
            "concept": "from math import sqrt imports just sqrt into your namespace, so you can call sqrt(16) without the math prefix. It is convenient for one or two names, but importing many names this way can cause collisions.",
            "syntax": "from math import sqrt",
            "exampleCode": "from math import sqrt, pi\nprint(sqrt(16))\nprint(round(pi, 2))",
            "exampleLanguage": "python",
            "mistake": "Using from module import * which imports every name and can silently overwrite your own variables.",
            "bug": {
              "prompt": "Find the bug: this should print 4.0 but it prints the wrong value.",
              "buggyCode": "from math import sqrt\nsqrt = 99\nprint(sqrt(16))",
              "fixedCode": "from math import sqrt\nprint(sqrt(16))",
              "explanation": "Assigning to sqrt after importing it replaces the function with the number 99; do not reuse imported names."
            },
            "exercise": {
              "title": "Practise from ... import ...",
              "type": "write-code",
              "instructions": "Import sqrt from math and print sqrt(25).",
              "starterCode": "from math import sqrt\n# TODO: write this line",
              "solution": "from math import sqrt\nprint(sqrt(25))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "sqrt of 25",
                  "stdin": "",
                  "expectedStdout": "5.0\n",
                  "hidden": false
                },
                {
                  "name": "sqrt of 25 again",
                  "stdin": "",
                  "expectedStdout": "5.0\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "from ... import ... is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-modules-m1-l3",
            "slug": "python-modules-m1-l3",
            "title": "Import",
            "concept": "import loads a module once and binds its name, while from ... import ... loads it and binds selected names from it. Both run the module's top-level code the first time, and later imports reuse the loaded module.",
            "syntax": "import math as m",
            "exampleCode": "import math as m\nprint(m.sqrt(16))",
            "exampleLanguage": "python",
            "mistake": "Importing the same module under two different names and getting confused about which is which.",
            "bug": {
              "prompt": "Find the bug: this should print 4.0 but it crashes.",
              "buggyCode": "import math\nprint(m.sqrt(16))",
              "fixedCode": "import math as m\nprint(m.sqrt(16))",
              "explanation": "The name m only exists if you import with as m; plain import math binds the name math."
            },
            "exercise": {
              "title": "Check your understanding: Import",
              "type": "multiple-choice",
              "instructions": "Which statement about importing is correct?",
              "starterCode": "",
              "solution": "import math makes the module available as math, and from math import sqrt brings in just sqrt.",
              "solutionExplanation": "import math makes the module available as math, and from math import sqrt brings in just sqrt. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "import math makes the module available as math, and from math import sqrt brings in just sqrt.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Import from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "import math makes sqrt available directly.",
                "from math import sqrt makes math.pi available.",
                "import math makes the module available as math, and from math import sqrt brings in just sqrt.",
                "Modules must be imported inside every function that uses them."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-modules-m1-l4",
            "slug": "python-modules-m1-l4",
            "title": "The math Module",
            "concept": "The math module provides constants such as pi and e, and functions such as sqrt(), floor(), ceil(), and factorial(). It covers the mathematics that the built-in operators do not.",
            "syntax": "math.factorial(5)  # 120",
            "exampleCode": "import math\nprint(math.factorial(5))\nprint(math.floor(3.7))\nprint(math.ceil(3.2))",
            "exampleLanguage": "python",
            "mistake": "Using math.sqrt() on a negative number, which raises ValueError because the result is not real.",
            "bug": {
              "prompt": "Find the bug: this should print 5 but it crashes.",
              "buggyCode": "import math\nprint(math.sqrt(-25))",
              "fixedCode": "import math\nprint(math.sqrt(25))",
              "explanation": "math.sqrt() only works on non-negative numbers; -25 has no real square root."
            },
            "exercise": {
              "title": "Practise The math Module",
              "type": "write-code",
              "instructions": "Import math and print the factorial of 5.",
              "starterCode": "import math\n# TODO: write this line",
              "solution": "import math\nprint(math.factorial(5))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Factorial of 5",
                  "stdin": "",
                  "expectedStdout": "120\n",
                  "hidden": false
                },
                {
                  "name": "Factorial of 5 again",
                  "stdin": "",
                  "expectedStdout": "120\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The math Module is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-modules-m1-l5",
            "slug": "python-modules-m1-l5",
            "title": "Namespaces",
            "concept": "A module's names live in the module's own namespace, which is why math.sqrt and your own sqrt can coexist. The module name acts as a prefix that keeps its contents separate from yours.",
            "syntax": "math.sqrt(16)",
            "exampleCode": "import math\nsqrt = 99\nprint(math.sqrt(16))\nprint(sqrt)",
            "exampleLanguage": "python",
            "mistake": "Naming your own variable the same as a module you imported, and then trying to use the module.",
            "bug": {
              "prompt": "Find the bug: this should print 4.0 but it crashes.",
              "buggyCode": "import math\nmath = 99\nprint(math.sqrt(16))",
              "fixedCode": "import math\nprint(math.sqrt(16))",
              "explanation": "Assigning to math replaces the module with the number 99; do not reuse a module's name for a variable."
            },
            "exercise": {
              "title": "Check your understanding: Namespaces",
              "type": "multiple-choice",
              "instructions": "Which statement about module namespaces is correct?",
              "starterCode": "",
              "solution": "Each module has its own namespace, so two modules can both define a name without clashing.",
              "solutionExplanation": "Each module has its own namespace, so two modules can both define a name without clashing. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Each module has its own namespace, so two modules can both define a name without clashing.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Namespaces from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Each module has its own namespace, so two modules can both define a name without clashing.",
                "All imported names share one global namespace.",
                "A module's names overwrite your program's names automatically.",
                "Importing a module runs it every time you import it."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-modules-m2",
        "title": "Modules & Imports in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-modules-m2-l1",
            "slug": "python-modules-m2-l1",
            "title": "The random Module",
            "concept": "The random module provides randint(a, b) for a random integer, choice() for a random item from a sequence, and shuffle() for rearranging a list in place. random.seed() makes the sequence repeatable, which is useful for testing.",
            "syntax": "random.randint(1, 6)",
            "exampleCode": "import random\nrandom.seed(0)\nprint(random.randint(1, 6))\nprint(random.choice([\"a\", \"b\", \"c\"]))",
            "exampleLanguage": "python",
            "mistake": "Expecting random numbers to be the same on every run without setting a seed.",
            "bug": {
              "prompt": "Find the bug: this should print the same number every time but it changes.",
              "buggyCode": "import random\nprint(random.randint(1, 6))",
              "fixedCode": "import random\nrandom.seed(0)\nprint(random.randint(1, 6))",
              "explanation": "Without a seed, randint() gives a different number each run; seed(0) makes the sequence repeatable."
            },
            "exercise": {
              "title": "Practise The random Module",
              "type": "write-code",
              "instructions": "Seed the random module with 7, then print a random integer from 1 to 6.",
              "starterCode": "import random\nrandom.seed(7)\n# TODO: write this line",
              "solution": "import random\nrandom.seed(7)\nprint(random.randint(1, 6))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Seeded roll",
                  "stdin": "",
                  "expectedStdout": "3\n",
                  "hidden": false
                },
                {
                  "name": "Seeded roll again",
                  "stdin": "",
                  "expectedStdout": "3\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The random Module is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-modules-m2-l2",
            "slug": "python-modules-m2-l2",
            "title": "The datetime Module",
            "concept": "The datetime module works with dates and times: date.today() gives today's date, and datetime objects can be formatted with strftime(). Dates support arithmetic, so you can compute the days between two dates.",
            "syntax": "datetime.date(2026, 11, 24)",
            "exampleCode": "import datetime\ntoday = datetime.date(2026, 11, 24)\nprint(today.strftime(\"%Y-%m-%d\"))",
            "exampleLanguage": "python",
            "mistake": "Mixing up date and datetime objects, which cannot be compared directly.",
            "bug": {
              "prompt": "Find the bug: this should print 2026 but it crashes.",
              "buggyCode": "import datetime\nd = datetime.date(2026, 11, 24)\nprint(d.yearly)",
              "fixedCode": "import datetime\nd = datetime.date(2026, 11, 24)\nprint(d.year)",
              "explanation": "date objects have a year attribute, not yearly; the correct attribute is .year."
            },
            "exercise": {
              "title": "Practise The datetime Module",
              "type": "write-code",
              "instructions": "Create the date 2026-11-24 with datetime.date and print its year, month, and day on one line.",
              "starterCode": "import datetime\nd = datetime.date(2026, 11, 24)\n# TODO: write this line",
              "solution": "import datetime\nd = datetime.date(2026, 11, 24)\nprint(d.year, d.month, d.day)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print date parts",
                  "stdin": "",
                  "expectedStdout": "2026 11 24\n",
                  "hidden": false
                },
                {
                  "name": "Print date parts again",
                  "stdin": "",
                  "expectedStdout": "2026 11 24\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The datetime Module is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-modules-m2-l3",
            "slug": "python-modules-m2-l3",
            "title": "The Standard Library",
            "concept": "Python ships with a large standard library of modules for maths, randomness, dates, files, networking, and more. Importing a standard library module needs no installation, which is why Python is called a batteries-included language.",
            "syntax": "import random",
            "exampleCode": "import math\nimport random\nprint(math.pi)\nprint(random.seed)",
            "exampleLanguage": "python",
            "mistake": "Reinstalling a standard library module with pip, which is unnecessary and can shadow the built-in one.",
            "bug": {
              "prompt": "Find the bug: this should print pi but it crashes.",
              "buggyCode": "import maths\nprint(maths.pi)",
              "fixedCode": "import math\nprint(math.pi)",
              "explanation": "The module is called math, not maths; a misspelled import raises ModuleNotFoundError."
            },
            "exercise": {
              "title": "Check your understanding: The Standard Library",
              "type": "multiple-choice",
              "instructions": "Which statement about the standard library is correct?",
              "starterCode": "",
              "solution": "The standard library is a set of modules shipped with Python, such as math, random, and datetime, that you import to use.",
              "solutionExplanation": "The standard library is a set of modules shipped with Python, such as math, random, and datetime, that you import to use. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The standard library is a set of modules shipped with Python, such as math, random, and datetime, that you import to use.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of The Standard Library from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "The standard library must be downloaded separately for every project.",
                "The standard library only contains the math module.",
                "Standard library modules cannot be imported, only installed.",
                "The standard library is a set of modules shipped with Python, such as math, random, and datetime, that you import to use."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-modules-m2-l4",
            "slug": "python-modules-m2-l4",
            "title": "Writing Your Own Module",
            "concept": "Any .py file is a module you can import, and organising code into modules keeps programs manageable. A module's functions are used with the module name as a prefix, exactly like the standard library.",
            "syntax": "import helpers",
            "exampleCode": "def double(n):\n    return n * 2\n\nprint(double(4))",
            "exampleLanguage": "python",
            "mistake": "Naming your own file math.py, which shadows the standard library module of the same name.",
            "bug": {
              "prompt": "Find the bug: importing this module prints 4, but importing should be silent.",
              "buggyCode": "def double(n):\n    return n * 2\n\nprint(double(4))",
              "fixedCode": "def double(n):\n    return n * 2\n\nif __name__ == \"__main__\":\n    print(double(4))",
              "explanation": "Top-level code runs on import, so the print fires when the module is imported; guarding it with if __name__ == \"__main__\" runs it only when the file is executed directly."
            },
            "exercise": {
              "title": "Practise Writing Your Own Module",
              "type": "write-code",
              "instructions": "Write a small module-style program: define a function called cube that returns n ** 3, then, guarded by if __name__ == \"__main__\":, print cube(3).",
              "starterCode": "def cube(n):\n# TODO: write this line\n\nif __name__ == \"__main__\":\n# TODO: write this line",
              "solution": "def cube(n):\n    return n ** 3\n\nif __name__ == \"__main__\":\n    print(cube(3))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Cube of 3",
                  "stdin": "",
                  "expectedStdout": "27\n",
                  "hidden": false
                },
                {
                  "name": "Cube of 3 again",
                  "stdin": "",
                  "expectedStdout": "27\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Writing Your Own Module is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-modules-m2-l5",
            "slug": "python-modules-m2-l5",
            "title": "A Dice Roller Program",
            "concept": "A dice roller uses random.randint(1, 6) to simulate a die, and rolling several dice shows how randomness and loops combine. Seeding the generator makes the rolls repeatable for testing.",
            "syntax": "random.randint(1, 6)",
            "exampleCode": "import random\nrandom.seed(1)\nprint([random.randint(1, 6) for _ in range(3)])",
            "exampleLanguage": "python",
            "mistake": "Using randint(0, 6) for a die, which can roll a 0 that no real die has.",
            "bug": {
              "prompt": "Find the bug: this should roll between 1 and 6 but it can roll 0.",
              "buggyCode": "import random\nrandom.seed(1)\nprint(random.randint(0, 6))",
              "fixedCode": "import random\nrandom.seed(1)\nprint(random.randint(1, 6))",
              "explanation": "randint(0, 6) includes 0; a six-sided die needs randint(1, 6)."
            },
            "exercise": {
              "title": "Practise A Dice Roller Program",
              "type": "write-code",
              "instructions": "Seed random with 7, then print three dice rolls (1 to 6) as a list.",
              "starterCode": "import random\nrandom.seed(7)\n# TODO: write this line",
              "solution": "import random\nrandom.seed(7)\nprint([random.randint(1, 6) for _ in range(3)])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Three rolls",
                  "stdin": "",
                  "expectedStdout": "[3, 2, 4]\n",
                  "hidden": false
                },
                {
                  "name": "Three rolls again",
                  "stdin": "",
                  "expectedStdout": "[3, 2, 4]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Dice Roller Program is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Modules & Imports Capstone",
      "type": "write-code",
      "instructions": "Write a program that imports math and datetime, reads a radius, prints the circle's area rounded to 2 decimal places, then reads a year, month, and day and prints the weekday name of that date.",
      "starterCode": "import math\nimport datetime\n# TODO: write this line\nprint(round(math.pi * radius * radius, 2))\nyear = int(input())\nmonth = int(input())\n# TODO: write this line\nd = datetime.date(year, month, day)\nprint(d.strftime(\"%A\"))",
      "solution": "import math\nimport datetime\nradius = float(input())\nprint(round(math.pi * radius * radius, 2))\nyear = int(input())\nmonth = int(input())\nday = int(input())\nd = datetime.date(year, month, day)\nprint(d.strftime(\"%A\"))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "2 2026-11-24",
          "stdin": "2\n2026\n11\n24\n",
          "expectedStdout": "12.57\nTuesday\n",
          "hidden": false
        },
        {
          "name": "1 2025-01-01",
          "stdin": "1\n2025\n1\n1\n",
          "expectedStdout": "3.14\nWednesday\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Modules & Imports Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Modules & Imports Capstone Project",
      "description": "A small end-to-end Python program that puts Modules & Imports into practice.",
      "requirements": [
        "Use the core ideas of Modules & Imports in a working Python program.",
        "Apply at least three of these skills: import, from import, math module, random module.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Modules & Imports correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-file-io",
    "slug": "python-file-io",
    "language": "python",
    "category": "languages",
    "title": "File Input & Output",
    "description": "Learn to read and write files with open(), with, and the csv module \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "open()/read",
      "Writing files",
      "with statement",
      "readlines()",
      "Appending",
      "File paths",
      "try/except around files",
      "csv module"
    ],
    "prerequisites": [
      "python-modules"
    ],
    "analogy": "Learning {topic} is like learning to keep a diary: writing things down means they are still there when you come back tomorrow.",
    "modules": [
      {
        "id": "python-file-io-m1",
        "title": "File Input & Output Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-file-io-m1-l1",
            "slug": "python-file-io-m1-l1",
            "title": "Opening and Reading a File",
            "concept": "open() returns a file object, and its read() method returns the whole contents as one string. Reading a file that does not exist raises FileNotFoundError, so programs check first or catch the error.",
            "syntax": "f = open(\"notes.txt\")",
            "exampleCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello\")\nwith open(\"notes.txt\") as f:\n    print(f.read())",
            "exampleLanguage": "python",
            "mistake": "Forgetting to close a file, which can lose buffered writes on some systems.",
            "bug": {
              "prompt": "Find the bug: this should print the file contents but it prints nothing.",
              "buggyCode": "f = open(\"notes.txt\", \"w\")\nf.write(\"hello\")\nprint(f.read())",
              "fixedCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello\")\nwith open(\"notes.txt\") as f:\n    print(f.read())",
              "explanation": "A file opened for writing cannot be read, and unwritten data sits in a buffer; write, close, then reopen for reading."
            },
            "exercise": {
              "title": "Practise Opening and Reading a File",
              "type": "write-code",
              "instructions": "Write the text \"hello file\" to notes.txt, then read it back and print it.",
              "starterCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello file\")\nwith open(\"notes.txt\") as f:\n# TODO: write this line",
              "solution": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello file\")\nwith open(\"notes.txt\") as f:\n    print(f.read())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Write and read",
                  "stdin": "",
                  "expectedStdout": "hello file\n",
                  "hidden": false
                },
                {
                  "name": "Write and read again",
                  "stdin": "",
                  "expectedStdout": "hello file\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Opening and Reading a File is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-file-io-m1-l2",
            "slug": "python-file-io-m1-l2",
            "title": "Writing to a File",
            "concept": "open() with mode \"w\" creates a file or erases an existing one, and write() puts text into it. The text is buffered, so it may not reach the disk until the file is closed or flushed.",
            "syntax": "open(\"out.txt\", \"w\")",
            "exampleCode": "with open(\"out.txt\", \"w\") as f:\n    f.write(\"line one\\n\")\n    f.write(\"line two\\n\")",
            "exampleLanguage": "python",
            "mistake": "Opening an existing file with \"w\" and being surprised that the old contents are gone.",
            "bug": {
              "prompt": "Find the bug: this should keep the old text and add a line, but the old text is gone.",
              "buggyCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"new line\")",
              "fixedCode": "with open(\"notes.txt\", \"a\") as f:\n    f.write(\"new line\")",
              "explanation": "\"w\" erases the file first; \"a\" appends to the end and keeps the old text."
            },
            "exercise": {
              "title": "Practise Writing to a File",
              "type": "write-code",
              "instructions": "Write two lines, \"first\" and \"second\", to lines.txt, then read the file back and print its contents.",
              "starterCode": "with open(\"lines.txt\", \"w\") as f:\n    f.write(\"first\\n\")\n    f.write(\"second\\n\")\nwith open(\"lines.txt\") as f:\n# TODO: write this line",
              "solution": "with open(\"lines.txt\", \"w\") as f:\n    f.write(\"first\\n\")\n    f.write(\"second\\n\")\nwith open(\"lines.txt\") as f:\n    print(f.read())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Write two lines",
                  "stdin": "",
                  "expectedStdout": "first\nsecond\n\n",
                  "hidden": false
                },
                {
                  "name": "Write two lines again",
                  "stdin": "",
                  "expectedStdout": "first\nsecond\n\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Writing to a File is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-file-io-m1-l3",
            "slug": "python-file-io-m1-l3",
            "title": "File Modes",
            "concept": "open() takes a mode: \"r\" reads and requires the file to exist, \"w\" writes and erases existing content, \"a\" appends to the end, and \"x\" creates a new file but fails if it already exists. Adding \"b\" opens the file in binary mode.",
            "syntax": "open(\"f.txt\", \"a\")",
            "exampleCode": "with open(\"notes.txt\", \"a\") as f:\n    f.write(\"more\\n\")",
            "exampleLanguage": "python",
            "mistake": "Opening a file with \"w\" when you meant \"a\", and losing the existing contents.",
            "bug": {
              "prompt": "Find the bug: this should read the file but it crashes.",
              "buggyCode": "with open(\"missing.txt\") as f:\n    print(f.read())",
              "fixedCode": "try:\n    with open(\"missing.txt\") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print(\"missing\")",
              "explanation": "Opening a missing file for reading raises FileNotFoundError; catching it lets the program handle the missing file gracefully."
            },
            "exercise": {
              "title": "Check your understanding: File Modes",
              "type": "multiple-choice",
              "instructions": "Which statement about file modes is correct?",
              "starterCode": "",
              "solution": "\"w\" creates or erases a file, \"a\" appends to it, and \"r\" reads it and fails if it is missing.",
              "solutionExplanation": "\"w\" creates or erases a file, \"a\" appends to it, and \"r\" reads it and fails if it is missing. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "\"w\" creates or erases a file, \"a\" appends to it, and \"r\" reads it and fails if it is missing.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of File Modes from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "\"w\" appends to a file without erasing it.",
                "\"r\" creates a file if it does not exist.",
                "\"w\" creates or erases a file, \"a\" appends to it, and \"r\" reads it and fails if it is missing.",
                "\"a\" erases a file before writing."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-file-io-m1-l4",
            "slug": "python-file-io-m1-l4",
            "title": "The with Statement",
            "concept": "The with statement opens a file and guarantees it is closed when the block ends, even if an error occurs. It is the standard way to work with files, because it removes the need to remember close().",
            "syntax": "with open(\"f.txt\") as f:",
            "exampleCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello\")\nprint(\"closed\")",
            "exampleLanguage": "python",
            "mistake": "Using the file object after the with block ends, when it is already closed.",
            "bug": {
              "prompt": "Find the bug: this should print the contents but it crashes.",
              "buggyCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello\")\nprint(f.read())",
              "fixedCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hello\")\nwith open(\"notes.txt\") as f:\n    print(f.read())",
              "explanation": "The file is closed when the with block ends, so reading after it fails; reopen the file to read it."
            },
            "exercise": {
              "title": "Practise The with Statement",
              "type": "write-code",
              "instructions": "Use a with statement to write \"with works\" to w.txt, then use another with statement to read it back and print it.",
              "starterCode": "with open(\"w.txt\", \"w\") as f:\n    f.write(\"with works\")\nwith open(\"w.txt\") as f:\n# TODO: write this line",
              "solution": "with open(\"w.txt\", \"w\") as f:\n    f.write(\"with works\")\nwith open(\"w.txt\") as f:\n    print(f.read())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "With write/read",
                  "stdin": "",
                  "expectedStdout": "with works\n",
                  "hidden": false
                },
                {
                  "name": "With write/read again",
                  "stdin": "",
                  "expectedStdout": "with works\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The with Statement is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-file-io-m1-l5",
            "slug": "python-file-io-m1-l5",
            "title": "Closing Files",
            "concept": "A file should be closed when you are done with it, so buffered writes reach the disk and the operating system releases the handle. with does this automatically, which is why it is preferred over manual open() and close().",
            "syntax": "f.close()  # manual",
            "exampleCode": "f = open(\"notes.txt\", \"w\")\nf.write(\"hi\")\nf.close()",
            "exampleLanguage": "python",
            "mistake": "Relying on the garbage collector to close files instead of using with.",
            "bug": {
              "prompt": "Find the bug: this should print the written text but the file is empty.",
              "buggyCode": "f = open(\"notes.txt\", \"w\")\nf.write(\"hello\")",
              "fixedCode": "f = open(\"notes.txt\", \"w\")\nf.write(\"hello\")\nf.close()",
              "explanation": "Writes sit in a buffer until the file is closed; without close(), the text may never reach the disk."
            },
            "exercise": {
              "title": "Check your understanding: Closing Files",
              "type": "multiple-choice",
              "instructions": "Which statement about closing files is correct?",
              "starterCode": "",
              "solution": "The with statement closes the file automatically when its block ends, even if an error occurs.",
              "solutionExplanation": "The with statement closes the file automatically when its block ends, even if an error occurs. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The with statement closes the file automatically when its block ends, even if an error occurs.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Closing Files from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "The with statement closes the file automatically when its block ends, even if an error occurs.",
                "Files close themselves as soon as you stop using them.",
                "You never need to close a file in Python.",
                "The with statement keeps a file open after its block ends."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-file-io-m2",
        "title": "File Input & Output in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-file-io-m2-l1",
            "slug": "python-file-io-m2-l1",
            "title": "Reading Line by Line",
            "concept": "A file object is iterable, so a for loop over it yields one line at a time, including the newline at the end of each line. readlines() returns all the lines as a list, and readline() returns the next line only.",
            "syntax": "for line in open(\"f.txt\"):",
            "exampleCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"one\\ntwo\\n\")\nwith open(\"notes.txt\") as f:\n    for line in f:\n        print(line.strip())",
            "exampleLanguage": "python",
            "mistake": "Forgetting that each line keeps its trailing newline, so printing it adds a blank line.",
            "bug": {
              "prompt": "Find the bug: this should print one and two on separate lines with no blank lines, but it prints blank lines too.",
              "buggyCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"one\\ntwo\\n\")\nwith open(\"notes.txt\") as f:\n    for line in f:\n        print(line)",
              "fixedCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"one\\ntwo\\n\")\nwith open(\"notes.txt\") as f:\n    for line in f:\n        print(line.strip())",
              "explanation": "Each line ends with \\n, and print() adds another, so a blank line appears; strip() removes the trailing newline."
            },
            "exercise": {
              "title": "Practise Reading Line by Line",
              "type": "write-code",
              "instructions": "Write the lines \"red\", \"green\", \"blue\" to colours.txt, then read the file and print how many lines it has.",
              "starterCode": "with open(\"colours.txt\", \"w\") as f:\n    f.write(\"red\\ngreen\\nblue\\n\")\nwith open(\"colours.txt\") as f:\n    lines = f.readlines()\n# TODO: write this line",
              "solution": "with open(\"colours.txt\", \"w\") as f:\n    f.write(\"red\\ngreen\\nblue\\n\")\nwith open(\"colours.txt\") as f:\n    lines = f.readlines()\nprint(len(lines))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Count lines",
                  "stdin": "",
                  "expectedStdout": "3\n",
                  "hidden": false
                },
                {
                  "name": "Count lines again",
                  "stdin": "",
                  "expectedStdout": "3\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Reading Line by Line is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-file-io-m2-l2",
            "slug": "python-file-io-m2-l2",
            "title": "Appending to a File",
            "concept": "Opening a file with mode \"a\" moves the write position to the end, so new text is added after the existing content. Appending is how logs and notes grow over time without losing earlier entries.",
            "syntax": "open(\"log.txt\", \"a\")",
            "exampleCode": "with open(\"log.txt\", \"w\") as f:\n    f.write(\"start\\n\")\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"more\\n\")\nwith open(\"log.txt\") as f:\n    print(f.read())",
            "exampleLanguage": "python",
            "mistake": "Appending without a trailing newline, so the new text joins the last line.",
            "bug": {
              "prompt": "Find the bug: this should print two lines but it prints one joined line.",
              "buggyCode": "with open(\"log.txt\", \"w\") as f:\n    f.write(\"start\")\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"more\")\nwith open(\"log.txt\") as f:\n    print(f.read())",
              "fixedCode": "with open(\"log.txt\", \"w\") as f:\n    f.write(\"start\\n\")\nwith open(\"log.txt\", \"a\") as f:\n    f.write(\"more\\n\")\nwith open(\"log.txt\") as f:\n    print(f.read())",
              "explanation": "Without \\n at the end of each write, the appended text joins the previous line; end each line with a newline."
            },
            "exercise": {
              "title": "Practise Appending to a File",
              "type": "write-code",
              "instructions": "Write \"one\" to nums.txt, then append \"two\", then read the file back and print its contents.",
              "starterCode": "with open(\"nums.txt\", \"w\") as f:\n    f.write(\"one\\n\")\nwith open(\"nums.txt\", \"a\") as f:\n    f.write(\"two\\n\")\n# TODO: write this line\n    print(f.read())",
              "solution": "with open(\"nums.txt\", \"w\") as f:\n    f.write(\"one\\n\")\nwith open(\"nums.txt\", \"a\") as f:\n    f.write(\"two\\n\")\nwith open(\"nums.txt\") as f:\n    print(f.read())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Write and append",
                  "stdin": "",
                  "expectedStdout": "one\ntwo\n\n",
                  "hidden": false
                },
                {
                  "name": "Write and append again",
                  "stdin": "",
                  "expectedStdout": "one\ntwo\n\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Appending to a File is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-file-io-m2-l3",
            "slug": "python-file-io-m2-l3",
            "title": "File Paths",
            "concept": "A relative path such as notes.txt is resolved from the current working directory, while an absolute path such as /home/user/notes.txt names the file exactly. Programs that run from different folders can fail to find a relative path, so joining paths with os.path.join is safer.",
            "syntax": "open(\"data/notes.txt\")",
            "exampleCode": "import os\nprint(os.path.join(\"data\", \"notes.txt\"))",
            "exampleLanguage": "python",
            "mistake": "Using a backslash in a Windows path without escaping it, so \\n becomes a newline.",
            "bug": {
              "prompt": "Find the bug: this path should open notes.txt but it opens a file with a newline in its name.",
              "buggyCode": "path = \"data\\notes.txt\"\nprint(repr(path))",
              "fixedCode": "path = \"data/notes.txt\"\nprint(repr(path))",
              "explanation": "\\n inside a normal string is a newline; use a forward slash or a raw string for paths."
            },
            "exercise": {
              "title": "Check your understanding: File Paths",
              "type": "multiple-choice",
              "instructions": "Which statement about file paths is correct?",
              "starterCode": "",
              "solution": "A relative path is resolved from the program's working directory, while an absolute path starts from the filesystem root.",
              "solutionExplanation": "A relative path is resolved from the program's working directory, while an absolute path starts from the filesystem root. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A relative path is resolved from the program's working directory, while an absolute path starts from the filesystem root.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of File Paths from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A relative path always starts from the filesystem root.",
                "Python cannot open files in other folders.",
                "Absolute paths are resolved from the current directory.",
                "A relative path is resolved from the program's working directory, while an absolute path starts from the filesystem root."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-file-io-m2-l4",
            "slug": "python-file-io-m2-l4",
            "title": "Handling a Missing File",
            "concept": "Opening a missing file for reading raises FileNotFoundError, and catching it with try/except lets the program use a default instead of crashing. This is the standard way to handle optional files such as settings or saved data.",
            "syntax": "try:\n    f = open(\"f.txt\")\nexcept FileNotFoundError:",
            "exampleCode": "try:\n    with open(\"missing.txt\") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print(\"no file\")",
            "exampleLanguage": "python",
            "mistake": "Catching a broad Exception and hiding a real bug, instead of catching only FileNotFoundError.",
            "bug": {
              "prompt": "Find the bug: this should print no file but it crashes.",
              "buggyCode": "with open(\"missing.txt\") as f:\n    print(f.read())",
              "fixedCode": "try:\n    with open(\"missing.txt\") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print(\"no file\")",
              "explanation": "Opening a missing file raises FileNotFoundError; catching that specific error lets the program continue."
            },
            "exercise": {
              "title": "Practise Handling a Missing File",
              "type": "write-code",
              "instructions": "Try to read missing.txt; if it does not exist, print \"not found\".",
              "starterCode": "try:\n    with open(\"missing.txt\") as f:\n        print(f.read())\nexcept FileNotFoundError:\n# TODO: write this line",
              "solution": "try:\n    with open(\"missing.txt\") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print(\"not found\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Missing file",
                  "stdin": "",
                  "expectedStdout": "not found\n",
                  "hidden": false
                },
                {
                  "name": "Missing file again",
                  "stdin": "",
                  "expectedStdout": "not found\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Handling a Missing File is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-file-io-m2-l5",
            "slug": "python-file-io-m2-l5",
            "title": "A Notes App",
            "concept": "A notes app combines file writing, appending, and reading: write a note, add more notes later, and list them all. It is a small program that shows how files give a program memory between runs.",
            "syntax": "with open(\"notes.txt\", \"a\") as f:",
            "exampleCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"buy milk\\n\")\nwith open(\"notes.txt\") as f:\n    print(f.read())",
            "exampleLanguage": "python",
            "mistake": "Reading a file you just wrote without closing it first, so the new text is not yet on disk.",
            "bug": {
              "prompt": "Find the bug: this should print the note but it prints nothing.",
              "buggyCode": "f = open(\"notes.txt\", \"w\")\nf.write(\"buy milk\")\nprint(open(\"notes.txt\").read())",
              "fixedCode": "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"buy milk\")\nwith open(\"notes.txt\") as f:\n    print(f.read())",
              "explanation": "The first file is still open and its buffered write has not reached the disk; closing it first, or using with, makes the text readable."
            },
            "exercise": {
              "title": "Practise A Notes App",
              "type": "write-code",
              "instructions": "Write the notes \"milk\" and \"bread\" to shopping.txt, one per line, then read the file back and print the number of notes.",
              "starterCode": "with open(\"shopping.txt\", \"w\") as f:\n    f.write(\"milk\\nbread\\n\")\nwith open(\"shopping.txt\") as f:\n# TODO: write this line",
              "solution": "with open(\"shopping.txt\", \"w\") as f:\n    f.write(\"milk\\nbread\\n\")\nwith open(\"shopping.txt\") as f:\n    print(len(f.readlines()))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Count notes",
                  "stdin": "",
                  "expectedStdout": "2\n",
                  "hidden": false
                },
                {
                  "name": "Count notes again",
                  "stdin": "",
                  "expectedStdout": "2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Notes App is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise File Input & Output Capstone",
      "type": "write-code",
      "instructions": "Write a program that creates app.log with four lines \u2014 \"INFO start\", \"ERROR disk full\", \"INFO retry\", \"ERROR timeout\" \u2014 then reads it back and prints the number of lines and the number of lines containing \"ERROR\".",
      "starterCode": "with open(\"app.log\", \"w\") as f:\n    f.write(\"INFO start\\n\")\n    f.write(\"ERROR disk full\\n\")\n    f.write(\"INFO retry\\n\")\n    f.write(\"ERROR timeout\\n\")\nwith open(\"app.log\") as f:\n    lines = f.readlines()\nerrors = 0\nfor line in lines:\n    if \"ERROR\" in line:\n        errors += 1\n# TODO: write this line\n# TODO: write this line",
      "solution": "with open(\"app.log\", \"w\") as f:\n    f.write(\"INFO start\\n\")\n    f.write(\"ERROR disk full\\n\")\n    f.write(\"INFO retry\\n\")\n    f.write(\"ERROR timeout\\n\")\nwith open(\"app.log\") as f:\n    lines = f.readlines()\nerrors = 0\nfor line in lines:\n    if \"ERROR\" in line:\n        errors += 1\nprint(len(lines))\nprint(errors)",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Analyse log",
          "stdin": "",
          "expectedStdout": "4\n2\n",
          "hidden": false
        },
        {
          "name": "Analyse log again",
          "stdin": "",
          "expectedStdout": "4\n2\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "File Input & Output Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
        "structure": "Write a short program that prints exactly what the instructions ask for."
      }
    },
    "capstone": {
      "title": "File Input & Output Capstone Project",
      "description": "A small end-to-end Python program that puts File Input & Output into practice.",
      "requirements": [
        "Use the core ideas of File Input & Output in a working Python program.",
        "Apply at least three of these skills: open()/read, Writing files, with statement, readlines().",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates File Input & Output correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-exceptions",
    "slug": "python-exceptions",
    "language": "python",
    "category": "languages",
    "title": "Exceptions & Error Handling",
    "description": "Learn to handle errors gracefully with try/except, else, finally, and raise \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "try/except",
      "except Exception types",
      "else/finally",
      "Raising exceptions",
      "ValueError/ZeroDivisionError",
      "Input validation loops",
      "Custom exceptions intro",
      "Tracebacks"
    ],
    "prerequisites": [
      "python-file-io"
    ],
    "analogy": "Learning {topic} is like learning to wear a seatbelt: you hope nothing goes wrong, but when it does, you are glad the protection is there.",
    "modules": [
      {
        "id": "python-exceptions-m1",
        "title": "Exceptions & Error Handling Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-exceptions-m1-l1",
            "slug": "python-exceptions-m1-l1",
            "title": "What Is an Exception",
            "concept": "An exception is an error that interrupts a program, such as dividing by zero or opening a missing file. When one is raised and nothing catches it, Python prints a traceback and stops the program.",
            "syntax": "1 / 0  # ZeroDivisionError",
            "exampleCode": "try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print(\"cannot divide by zero\")",
            "exampleLanguage": "python",
            "mistake": "Assuming an exception is the same as a syntax error, when syntax errors are caught before the program runs at all.",
            "bug": {
              "prompt": "Find the bug: this should print a message but it crashes.",
              "buggyCode": "print(1 / 0)",
              "fixedCode": "try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print(\"cannot divide by zero\")",
              "explanation": "Dividing by zero raises ZeroDivisionError; catching it lets the program print a message instead of crashing."
            },
            "exercise": {
              "title": "Practise What Is an Exception",
              "type": "write-code",
              "instructions": "Try to print 1 / 0, and if it raises ZeroDivisionError, print \"cannot divide by zero\".",
              "starterCode": "try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n# TODO: write this line",
              "solution": "try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print(\"cannot divide by zero\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Divide by zero",
                  "stdin": "",
                  "expectedStdout": "cannot divide by zero\n",
                  "hidden": false
                },
                {
                  "name": "Divide by zero again",
                  "stdin": "",
                  "expectedStdout": "cannot divide by zero\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "What Is an Exception is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-exceptions-m1-l2",
            "slug": "python-exceptions-m1-l2",
            "title": "try and except",
            "concept": "A try block runs code that might fail, and the except block runs only when an exception is raised inside it. Code after the try/except runs normally either way, so the program survives the error.",
            "syntax": "try:\n    risky()\nexcept ValueError:\n    print(\"bad value\")",
            "exampleCode": "try:\n    n = int(\"abc\")\nexcept ValueError:\n    print(\"not a number\")",
            "exampleLanguage": "python",
            "mistake": "Putting code that cannot fail inside the try block, which hides the real source of an error.",
            "bug": {
              "prompt": "Find the bug: this should print not a number but it crashes.",
              "buggyCode": "n = int(\"abc\")\nprint(\"not a number\")",
              "fixedCode": "try:\n    n = int(\"abc\")\nexcept ValueError:\n    print(\"not a number\")",
              "explanation": "The conversion must be inside the try block; outside it, the ValueError is not caught."
            },
            "exercise": {
              "title": "Practise try and except",
              "type": "write-code",
              "instructions": "Try to convert the string \"abc\" to an int; if it fails with ValueError, print \"not a number\".",
              "starterCode": "try:\n    n = int(\"abc\")\nexcept ValueError:\n# TODO: write this line",
              "solution": "try:\n    n = int(\"abc\")\nexcept ValueError:\n    print(\"not a number\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Bad conversion",
                  "stdin": "",
                  "expectedStdout": "not a number\n",
                  "hidden": false
                },
                {
                  "name": "Bad conversion again",
                  "stdin": "",
                  "expectedStdout": "not a number\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "try and except is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-exceptions-m1-l3",
            "slug": "python-exceptions-m1-l3",
            "title": "Exception Flow",
            "concept": "When the try block runs without an exception, the except block is skipped entirely. When an exception is raised, Python jumps to the matching except block, and execution continues after the whole try/except statement.",
            "syntax": "try:\n    pass\nexcept ValueError:\n    pass",
            "exampleCode": "try:\n    print(\"ok\")\nexcept ValueError:\n    print(\"failed\")\nprint(\"done\")",
            "exampleLanguage": "python",
            "mistake": "Expecting code after the failing line inside try to run, when Python jumps straight to except.",
            "bug": {
              "prompt": "Find the bug: this should print before, after, and failed but it prints before and failed.",
              "buggyCode": "try:\n    print(\"before\")\n    int(\"abc\")\n    print(\"after\")\nexcept ValueError:\n    print(\"failed\")",
              "fixedCode": "try:\n    print(\"before\")\nexcept ValueError:\n    print(\"failed\")\nprint(\"after\")",
              "explanation": "When int(\"abc\") raises ValueError, Python jumps to except immediately, so print(\"after\") inside try never runs; code after the whole try/except always runs."
            },
            "exercise": {
              "title": "Check your understanding: Exception Flow",
              "type": "multiple-choice",
              "instructions": "Which statement about try/except is correct?",
              "starterCode": "",
              "solution": "The except block runs only when an exception is raised in the try block; otherwise it is skipped.",
              "solutionExplanation": "The except block runs only when an exception is raised in the try block; otherwise it is skipped. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The except block runs only when an exception is raised in the try block; otherwise it is skipped.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Exception Flow from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "The except block always runs, even when nothing fails.",
                "The try block runs only when an exception occurs.",
                "The except block runs only when an exception is raised in the try block; otherwise it is skipped.",
                "Code after a try/except never runs."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-exceptions-m1-l4",
            "slug": "python-exceptions-m1-l4",
            "title": "Catching Specific Errors",
            "concept": "Each except clause names the error type it handles, so except ValueError catches bad conversions and except ZeroDivisionError catches division by zero. Catching specific types avoids hiding unrelated bugs.",
            "syntax": "except ValueError:",
            "exampleCode": "try:\n    print(int(\"x\"))\nexcept ValueError:\n    print(\"bad number\")\nexcept ZeroDivisionError:\n    print(\"bad division\")",
            "exampleLanguage": "python",
            "mistake": "Catching a broad Exception and hiding a real programming bug.",
            "bug": {
              "prompt": "Find the bug: this should print bad number but it crashes.",
              "buggyCode": "try:\n    print(int(\"x\"))\nexcept ZeroDivisionError:\n    print(\"bad division\")",
              "fixedCode": "try:\n    print(int(\"x\"))\nexcept ValueError:\n    print(\"bad number\")",
              "explanation": "int(\"x\") raises ValueError, not ZeroDivisionError, so the except clause does not match and the error is not caught."
            },
            "exercise": {
              "title": "Practise Catching Specific Errors",
              "type": "write-code",
              "instructions": "Try to print 10 / 0; if it raises ZeroDivisionError, print \"cannot divide by zero\".",
              "starterCode": "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n# TODO: write this line",
              "solution": "try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"cannot divide by zero\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Divide 10 by 0",
                  "stdin": "",
                  "expectedStdout": "cannot divide by zero\n",
                  "hidden": false
                },
                {
                  "name": "Divide 10 by 0 again",
                  "stdin": "",
                  "expectedStdout": "cannot divide by zero\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Catching Specific Errors is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-exceptions-m1-l5",
            "slug": "python-exceptions-m1-l5",
            "title": "Bare except",
            "concept": "A bare except: with no type catches every exception, including KeyboardInterrupt and SystemExit, which makes debugging hard. Catching specific exception types keeps errors visible and programs predictable.",
            "syntax": "except ValueError:",
            "exampleCode": "try:\n    int(\"x\")\nexcept ValueError:\n    print(\"caught\")",
            "exampleLanguage": "python",
            "mistake": "Using a bare except to silence an error instead of fixing its cause.",
            "bug": {
              "prompt": "Find the bug: this should catch ValueError but it also hides a NameError.",
              "buggyCode": "try:\n    print(undefined_name)\nexcept:\n    print(\"caught\")",
              "fixedCode": "try:\n    print(int(\"x\"))\nexcept ValueError:\n    print(\"caught\")",
              "explanation": "A bare except catches the NameError too, hiding the real bug; catching only ValueError lets other errors surface."
            },
            "exercise": {
              "title": "Check your understanding: Bare except",
              "type": "multiple-choice",
              "instructions": "Which statement about except clauses is correct?",
              "starterCode": "",
              "solution": "A bare except catches every exception, including ones you did not expect, so it usually hides bugs.",
              "solutionExplanation": "A bare except catches every exception, including ones you did not expect, so it usually hides bugs. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A bare except catches every exception, including ones you did not expect, so it usually hides bugs.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Bare except from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A bare except catches every exception, including ones you did not expect, so it usually hides bugs.",
                "A bare except is the recommended way to handle all errors.",
                "A bare except only catches ValueError.",
                "A bare except is required for every try block."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-exceptions-m2",
        "title": "Exceptions & Error Handling in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-exceptions-m2-l1",
            "slug": "python-exceptions-m2-l1",
            "title": "The else Clause",
            "concept": "The else block of a try statement runs only when the try block finishes without an exception. It holds code that should run after success but that you do not want protected by the except clause.",
            "syntax": "try:\n    n = int(s)\nexcept ValueError:\n    print(\"bad\")\nelse:\n    print(n)",
            "exampleCode": "try:\n    n = int(\"42\")\nexcept ValueError:\n    print(\"bad\")\nelse:\n    print(n)",
            "exampleLanguage": "python",
            "mistake": "Putting success code inside try instead of else, so an error in it is caught by the wrong handler.",
            "bug": {
              "prompt": "Find the bug: this should print 42 but it prints bad.",
              "buggyCode": "try:\n    n = int(\"42\")\n    print(n + undefined)\nexcept ValueError:\n    print(\"bad\")",
              "fixedCode": "try:\n    n = int(\"42\")\nexcept ValueError:\n    print(\"bad\")\nelse:\n    print(n)",
              "explanation": "Code after the risky line inside try is also protected, so the NameError is caught as if it were a ValueError; success code belongs in else."
            },
            "exercise": {
              "title": "Practise The else Clause",
              "type": "write-code",
              "instructions": "Try to convert \"42\" to an int; on success, print the number in the else block; on ValueError, print \"bad\".",
              "starterCode": "try:\n    n = int(\"42\")\nexcept ValueError:\n    print(\"bad\")\nelse:\n# TODO: write this line",
              "solution": "try:\n    n = int(\"42\")\nexcept ValueError:\n    print(\"bad\")\nelse:\n    print(n)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Convert 42",
                  "stdin": "",
                  "expectedStdout": "42\n",
                  "hidden": false
                },
                {
                  "name": "Convert 42 again",
                  "stdin": "",
                  "expectedStdout": "42\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The else Clause is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-exceptions-m2-l2",
            "slug": "python-exceptions-m2-l2",
            "title": "finally for Cleanup",
            "concept": "The finally block runs no matter what happens in the try block, whether it succeeds, raises, or returns. It is used for cleanup such as closing files or releasing locks.",
            "syntax": "try:\n    f = open(\"f.txt\")\nfinally:\n    f.close()",
            "exampleCode": "try:\n    print(\"work\")\nfinally:\n    print(\"cleanup\")",
            "exampleLanguage": "python",
            "mistake": "Putting cleanup code after the try/except instead of in finally, so it is skipped when an exception is raised.",
            "bug": {
              "prompt": "Find the bug: this should print cleanup after the error but it prints only caught.",
              "buggyCode": "try:\n    int(\"x\")\n    print(\"cleanup\")\nexcept ValueError:\n    print(\"caught\")",
              "fixedCode": "try:\n    int(\"x\")\nexcept ValueError:\n    print(\"caught\")\nfinally:\n    print(\"cleanup\")",
              "explanation": "Code inside try after the failing line never runs; finally runs whether or not an exception occurred."
            },
            "exercise": {
              "title": "Practise finally for Cleanup",
              "type": "write-code",
              "instructions": "Try to convert \"x\" to an int; on ValueError print \"caught\", and in a finally block print \"cleanup\".",
              "starterCode": "try:\n    int(\"x\")\nexcept ValueError:\n# TODO: write this line\nfinally:\n# TODO: write this line",
              "solution": "try:\n    int(\"x\")\nexcept ValueError:\n    print(\"caught\")\nfinally:\n    print(\"cleanup\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Caught and cleanup",
                  "stdin": "",
                  "expectedStdout": "caught\ncleanup\n",
                  "hidden": false
                },
                {
                  "name": "Caught and cleanup again",
                  "stdin": "",
                  "expectedStdout": "caught\ncleanup\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "finally for Cleanup is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-exceptions-m2-l3",
            "slug": "python-exceptions-m2-l3",
            "title": "raise",
            "concept": "raise throws an exception on purpose, usually to signal that an argument is invalid or a condition the program cannot handle. The exception travels up the call stack until something catches it or the program stops with a traceback.",
            "syntax": "raise ValueError(\"bad age\")",
            "exampleCode": "def set_age(age):\n    if age < 0:\n        raise ValueError(\"age cannot be negative\")\n    return age",
            "exampleLanguage": "python",
            "mistake": "Raising a generic Exception instead of a specific type, which makes the error harder to handle.",
            "bug": {
              "prompt": "Find the bug: this should print caught ValueError but it crashes.",
              "buggyCode": "try:\n    raise Exception(\"bad age\")\nexcept ValueError:\n    print(\"caught ValueError\")",
              "fixedCode": "try:\n    raise ValueError(\"bad age\")\nexcept ValueError:\n    print(\"caught ValueError\")",
              "explanation": "Raising a generic Exception gives callers no way to distinguish the error; raising ValueError lets callers catch that specific type."
            },
            "exercise": {
              "title": "Check your understanding: raise",
              "type": "multiple-choice",
              "instructions": "Which statement about raise is correct?",
              "starterCode": "",
              "solution": "raise creates an exception, and raise ValueError(\"message\") raises one with a message.",
              "solutionExplanation": "raise creates an exception, and raise ValueError(\"message\") raises one with a message. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "raise creates an exception, and raise ValueError(\"message\") raises one with a message.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of raise from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "raise catches an exception.",
                "raise can only be used inside an except block.",
                "raise stops the program without any error message.",
                "raise creates an exception, and raise ValueError(\"message\") raises one with a message."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-exceptions-m2-l4",
            "slug": "python-exceptions-m2-l4",
            "title": "Raising Your Own Exceptions",
            "concept": "You can raise an exception with raise to signal invalid input or an impossible state, and callers can catch it like any other error. Raising early, with a clear message, makes bugs easier to find.",
            "syntax": "raise ValueError(\"age cannot be negative\")",
            "exampleCode": "def set_age(age):\n    if age < 0:\n        raise ValueError(\"age cannot be negative\")\n    return age\n\nprint(set_age(5))",
            "exampleLanguage": "python",
            "mistake": "Raising an exception for a normal case that should be handled with a return value instead.",
            "bug": {
              "prompt": "Find the bug: this should print the age but it crashes.",
              "buggyCode": "def set_age(age):\n    raise ValueError(\"bad\")\n    return age\n\nprint(set_age(5))",
              "fixedCode": "def set_age(age):\n    if age < 0:\n        raise ValueError(\"age cannot be negative\")\n    return age\n\nprint(set_age(5))",
              "explanation": "Raising unconditionally makes the function always fail; raise only when the age is actually invalid."
            },
            "exercise": {
              "title": "Practise Raising Your Own Exceptions",
              "type": "write-code",
              "instructions": "Define a function called check_age that raises ValueError if the age is negative, otherwise returns the age. Call it with 25 inside a try block and print the result.",
              "starterCode": "def check_age(age):\n    if age < 0:\n# TODO: write this line\n    return age\n\ntry:\n# TODO: write this line\nexcept ValueError:\n    print(\"bad age\")",
              "solution": "def check_age(age):\n    if age < 0:\n        raise ValueError(\"age cannot be negative\")\n    return age\n\ntry:\n    print(check_age(25))\nexcept ValueError:\n    print(\"bad age\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Check age 25",
                  "stdin": "",
                  "expectedStdout": "25\n",
                  "hidden": false
                },
                {
                  "name": "Check age 25 again",
                  "stdin": "",
                  "expectedStdout": "25\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Raising Your Own Exceptions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-exceptions-m2-l5",
            "slug": "python-exceptions-m2-l5",
            "title": "Validating User Input",
            "concept": "A validation loop asks for input inside a try block and repeats until the conversion succeeds, so a typo never crashes the program. It is the pattern behind every robust prompt that needs a number.",
            "syntax": "while True:\n    try:\n        n = int(input())\n        break\n    except ValueError:\n        print(\"try again\")",
            "exampleCode": "try:\n    n = int(\"12\")\n    print(n)\nexcept ValueError:\n    print(\"bad\")",
            "exampleLanguage": "python",
            "mistake": "Catching ValueError but forgetting to ask again, so the program continues with no value.",
            "bug": {
              "prompt": "Find the bug: this should print 12 but it prints bad.",
              "buggyCode": "try:\n    n = int(\"x\")\nexcept ValueError:\n    print(\"bad\")",
              "fixedCode": "try:\n    n = int(\"12\")\nexcept ValueError:\n    print(\"bad\")\nelse:\n    print(n)",
              "explanation": "The try block must contain the actual conversion; with a fixed value the except never runs and else prints the number."
            },
            "exercise": {
              "title": "Practise Validating User Input",
              "type": "write-code",
              "instructions": "Read a number from input inside a try block; print the number if it converts, otherwise print \"not a number\".",
              "starterCode": "try:\n    n = int(input())\n# TODO: write this line\nexcept ValueError:\n    print(\"not a number\")",
              "solution": "try:\n    n = int(input())\n    print(n)\nexcept ValueError:\n    print(\"not a number\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "42",
                  "stdin": "42\n",
                  "expectedStdout": "42\n",
                  "hidden": false
                },
                {
                  "name": "abc",
                  "stdin": "abc\n",
                  "expectedStdout": "not a number\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Validating User Input is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Exceptions & Error Handling Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads two numbers and prints their quotient. If the divisor is zero, print \"cannot divide by zero\"; if the input is not a number, print \"not a number\".",
      "starterCode": "try:\n    a = float(input())\n    b = float(input())\n# TODO: write this line\nexcept ZeroDivisionError:\n    print(\"cannot divide by zero\")\nexcept ValueError:\n    print(\"not a number\")",
      "solution": "try:\n    a = float(input())\n    b = float(input())\n    print(a / b)\nexcept ZeroDivisionError:\n    print(\"cannot divide by zero\")\nexcept ValueError:\n    print(\"not a number\")",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "10 2",
          "stdin": "10\n2\n",
          "expectedStdout": "5.0\n",
          "hidden": false
        },
        {
          "name": "10 0",
          "stdin": "10\n0\n",
          "expectedStdout": "cannot divide by zero\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Exceptions & Error Handling Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Exceptions & Error Handling Capstone Project",
      "description": "A small end-to-end Python program that puts Exceptions & Error Handling into practice.",
      "requirements": [
        "Use the core ideas of Exceptions & Error Handling in a working Python program.",
        "Apply at least three of these skills: try/except, except Exception types, else/finally, Raising exceptions.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Exceptions & Error Handling correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-classes",
    "slug": "python-classes",
    "language": "python",
    "category": "languages",
    "title": "Classes & Objects",
    "description": "Learn classes and objects \u2014 __init__, self, methods, and attributes \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Beginner",
    "estimatedHours": 12,
    "skills": [
      "class keyword",
      "__init__",
      "self",
      "Attributes",
      "Methods",
      "Instances",
      "__str__",
      "Class vs instance attributes"
    ],
    "prerequisites": [
      "python-exceptions"
    ],
    "analogy": "Learning {topic} is like learning to bake from a recipe: the class is the recipe, and every cake you bake from it is an object.",
    "modules": [
      {
        "id": "python-classes-m1",
        "title": "Classes & Objects Fundamentals",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-classes-m1-l1",
            "slug": "python-classes-m1-l1",
            "title": "What Is a Class",
            "concept": "A class is a blueprint for creating objects, bundling data (attributes) and behaviour (methods) into one type. An object is an instance of a class, created by calling the class like a function.",
            "syntax": "class Dog:\n    pass",
            "exampleCode": "class Dog:\n    def bark(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.bark()",
            "exampleLanguage": "python",
            "mistake": "Forgetting that a class is only a blueprint, and expecting class Dog: to create a dog.",
            "bug": {
              "prompt": "Find the bug: this should print Woof! but it prints nothing.",
              "buggyCode": "class Dog:\n    def bark(self):\n        print(\"Woof!\")",
              "fixedCode": "class Dog:\n    def bark(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.bark()",
              "explanation": "Defining a class only creates the blueprint; you must create an instance and call its method."
            },
            "exercise": {
              "title": "Practise What Is a Class",
              "type": "write-code",
              "instructions": "Define a class called Cat with a method called meow that prints \"Meow!\", then create a Cat and call meow().",
              "starterCode": "class Cat:\n    def meow(self):\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "class Cat:\n    def meow(self):\n        print(\"Meow!\")\n\nc = Cat()\nc.meow()",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Cat meows",
                  "stdin": "",
                  "expectedStdout": "Meow!\n",
                  "hidden": false
                },
                {
                  "name": "Cat meows again",
                  "stdin": "",
                  "expectedStdout": "Meow!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "What Is a Class is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-classes-m1-l2",
            "slug": "python-classes-m1-l2",
            "title": "__init__ and Attributes",
            "concept": "__init__ is the method Python calls when an object is created, and it sets up the object's attributes from the arguments passed. Attributes are stored on self, so each instance keeps its own values.",
            "syntax": "def __init__(self, name):\n    self.name = name",
            "exampleCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nprint(d.name)",
            "exampleLanguage": "python",
            "mistake": "Forgetting self when assigning an attribute, which creates a local variable that disappears when __init__ ends.",
            "bug": {
              "prompt": "Find the bug: this should print Rex but it crashes.",
              "buggyCode": "class Dog:\n    def __init__(self, name):\n        name = name\n\nd = Dog(\"Rex\")\nprint(d.name)",
              "fixedCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nprint(d.name)",
              "explanation": "name = name only assigns a local variable; self.name = name stores the value on the object."
            },
            "exercise": {
              "title": "Practise __init__ and Attributes",
              "type": "write-code",
              "instructions": "Define a class called Person with __init__ that stores a name, then create a Person called \"Ada\" and print the name.",
              "starterCode": "class Person:\n    def __init__(self, name):\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "class Person:\n    def __init__(self, name):\n        self.name = name\n\np = Person(\"Ada\")\nprint(p.name)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Person Ada",
                  "stdin": "",
                  "expectedStdout": "Ada\n",
                  "hidden": false
                },
                {
                  "name": "Person Ada again",
                  "stdin": "",
                  "expectedStdout": "Ada\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "__init__ and Attributes is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-classes-m1-l3",
            "slug": "python-classes-m1-l3",
            "title": "Class vs Instance",
            "concept": "A class defines the shape of its objects, while each instance holds its own attribute values. Two instances of the same class can have different names, ages, or states, and changing one does not affect the other.",
            "syntax": "d1 = Dog(\"Rex\")\nd2 = Dog(\"Max\")",
            "exampleCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd1 = Dog(\"Rex\")\nd2 = Dog(\"Max\")\nprint(d1.name, d2.name)",
            "exampleLanguage": "python",
            "mistake": "Changing an attribute on one instance and expecting all instances to change.",
            "bug": {
              "prompt": "Find the bug: this should print Rex and Max but it prints Max and Max.",
              "buggyCode": "class Dog:\n    name = \"Rex\"\n    def __init__(self, name):\n        Dog.name = name\n\nd1 = Dog(\"Rex\")\nd2 = Dog(\"Max\")\nprint(d1.name, d2.name)",
              "fixedCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd1 = Dog(\"Rex\")\nd2 = Dog(\"Max\")\nprint(d1.name, d2.name)",
              "explanation": "Assigning to Dog.name changes the class attribute shared by all instances; self.name stores the value on each instance separately."
            },
            "exercise": {
              "title": "Check your understanding: Class vs Instance",
              "type": "multiple-choice",
              "instructions": "Which statement about classes and instances is correct?",
              "starterCode": "",
              "solution": "A class is a blueprint, and an instance is one object created from it, with its own attribute values.",
              "solutionExplanation": "A class is a blueprint, and an instance is one object created from it, with its own attribute values. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A class is a blueprint, and an instance is one object created from it, with its own attribute values.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Class vs Instance from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A class and an instance are the same thing.",
                "Every instance of a class shares the same attribute values.",
                "A class is a blueprint, and an instance is one object created from it, with its own attribute values.",
                "You cannot create more than one instance of a class."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-classes-m1-l4",
            "slug": "python-classes-m1-l4",
            "title": "Methods and self",
            "concept": "A method is a function defined inside a class, and its first parameter, self, refers to the instance the method was called on. Python passes the instance automatically, so you call d.bark() without passing self yourself.",
            "syntax": "def bark(self):",
            "exampleCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(self.name, \"says woof\")\n\nd = Dog(\"Rex\")\nd.bark()",
            "exampleLanguage": "python",
            "mistake": "Forgetting self in a method definition, which raises TypeError when the method is called.",
            "bug": {
              "prompt": "Find the bug: this should print Rex says woof but it crashes.",
              "buggyCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark():\n        print(\"woof\")\n\nd = Dog(\"Rex\")\nd.bark()",
              "fixedCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(self.name, \"says woof\")\n\nd = Dog(\"Rex\")\nd.bark()",
              "explanation": "A method needs self as its first parameter; without it, Python passes the instance as an extra argument and the call fails."
            },
            "exercise": {
              "title": "Practise Methods and self",
              "type": "write-code",
              "instructions": "Define a class called Greeter with a method called hello that takes a name and prints \"Hello, <name>!\". Create a Greeter and call hello(\"Ada\").",
              "starterCode": "class Greeter:\n    def hello(self, name):\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "class Greeter:\n    def hello(self, name):\n        print(\"Hello, \" + name + \"!\")\n\ng = Greeter()\ng.hello(\"Ada\")",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Greet Ada",
                  "stdin": "",
                  "expectedStdout": "Hello, Ada!\n",
                  "hidden": false
                },
                {
                  "name": "Greet Ada again",
                  "stdin": "",
                  "expectedStdout": "Hello, Ada!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Methods and self is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-classes-m1-l5",
            "slug": "python-classes-m1-l5",
            "title": "self",
            "concept": "self is the conventional name for the first parameter of a method, and Python fills it in automatically with the instance. Through self, a method reads and writes the instance's attributes.",
            "syntax": "def method(self):",
            "exampleCode": "class Counter:\n    def __init__(self):\n        self.n = 0\n    def bump(self):\n        self.n += 1",
            "exampleLanguage": "python",
            "mistake": "Using self outside a method, where it has no meaning.",
            "bug": {
              "prompt": "Find the bug: this should print 1 but it crashes.",
              "buggyCode": "class Counter:\n    def __init__(self):\n        self.n = 0\n\nprint(self.n)",
              "fixedCode": "class Counter:\n    def __init__(self):\n        self.n = 0\n\nc = Counter()\nprint(c.n)",
              "explanation": "self only exists inside a method; outside the class you use the instance, c, to reach its attributes."
            },
            "exercise": {
              "title": "Check your understanding: self",
              "type": "multiple-choice",
              "instructions": "Which statement about self is correct?",
              "starterCode": "",
              "solution": "self is the first parameter of a method and refers to the instance the method was called on.",
              "solutionExplanation": "self is the first parameter of a method and refers to the instance the method was called on. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "self is the first parameter of a method and refers to the instance the method was called on.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of self from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "self is the first parameter of a method and refers to the instance the method was called on.",
                "self is a keyword that cannot be renamed.",
                "self refers to the class, not the instance.",
                "self must be passed explicitly in every method call."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-classes-m2",
        "title": "Classes & Objects in Practice",
        "level": "beginner",
        "lessons": [
          {
            "id": "python-classes-m2-l1",
            "slug": "python-classes-m2-l1",
            "title": "Creating Multiple Instances",
            "concept": "Each call to a class creates a new, independent instance with its own attributes. Methods called on one instance affect only that instance, so objects can track separate state.",
            "syntax": "d1 = Dog(\"Rex\")\nd2 = Dog(\"Max\")",
            "exampleCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd1 = Dog(\"Rex\")\nd2 = Dog(\"Max\")\nprint(d1.name)\nprint(d2.name)",
            "exampleLanguage": "python",
            "mistake": "Creating one instance and reusing it where two separate objects were needed.",
            "bug": {
              "prompt": "Find the bug: this should print two different names but it prints the same name twice.",
              "buggyCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nd.name = \"Max\"\nprint(d.name)\nprint(d.name)",
              "fixedCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd1 = Dog(\"Rex\")\nd2 = Dog(\"Max\")\nprint(d1.name)\nprint(d2.name)",
              "explanation": "One instance holds one name; two different names need two instances."
            },
            "exercise": {
              "title": "Practise Creating Multiple Instances",
              "type": "write-code",
              "instructions": "Define a class called Point with x and y attributes, create points (1, 2) and (3, 4), and print both points' x values on one line.",
              "starterCode": "class Point:\n    def __init__(self, x, y):\n# TODO: write this line\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line",
              "solution": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np1 = Point(1, 2)\np2 = Point(3, 4)\nprint(p1.x, p2.x)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Two points",
                  "stdin": "",
                  "expectedStdout": "1 3\n",
                  "hidden": false
                },
                {
                  "name": "Two points again",
                  "stdin": "",
                  "expectedStdout": "1 3\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Creating Multiple Instances is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-classes-m2-l2",
            "slug": "python-classes-m2-l2",
            "title": "__str__ for Readable Objects",
            "concept": "__str__ returns the string Python uses when you print an object, so defining it makes objects readable instead of showing a memory address. It should return a short, human-friendly description.",
            "syntax": "def __str__(self):\n    return f\"Dog({self.name})\"",
            "exampleCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return \"Dog named \" + self.name\n\nd = Dog(\"Rex\")\nprint(d)",
            "exampleLanguage": "python",
            "mistake": "Printing inside __str__ instead of returning a string, which makes print() show None.",
            "bug": {
              "prompt": "Find the bug: this should print Dog named Rex but it prints None.",
              "buggyCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        print(\"Dog named \" + self.name)\n\nd = Dog(\"Rex\")\nprint(d)",
              "fixedCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return \"Dog named \" + self.name\n\nd = Dog(\"Rex\")\nprint(d)",
              "explanation": "__str__ must return a string; printing inside it returns None, which print() then shows."
            },
            "exercise": {
              "title": "Practise __str__ for Readable Objects",
              "type": "write-code",
              "instructions": "Define a class called Book with a title attribute and a __str__ method that returns \"Book: <title>\". Create a Book called \"Python 101\" and print it.",
              "starterCode": "class Book:\n    def __init__(self, title):\n        self.title = title\n    def __str__(self):\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "class Book:\n    def __init__(self, title):\n        self.title = title\n    def __str__(self):\n        return \"Book: \" + self.title\n\nb = Book(\"Python 101\")\nprint(b)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print a book",
                  "stdin": "",
                  "expectedStdout": "Book: Python 101\n",
                  "hidden": false
                },
                {
                  "name": "Print a book again",
                  "stdin": "",
                  "expectedStdout": "Book: Python 101\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "__str__ for Readable Objects is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-classes-m2-l3",
            "slug": "python-classes-m2-l3",
            "title": "Attributes",
            "concept": "Attributes hold an object's data, and they are created by assignment to self.name, usually in __init__ but also in other methods. Reading an attribute that was never set raises AttributeError.",
            "syntax": "self.name = name",
            "exampleCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nprint(d.name)",
            "exampleLanguage": "python",
            "mistake": "Reading an attribute before it is set, which raises AttributeError.",
            "bug": {
              "prompt": "Find the bug: this should print Rex but it crashes.",
              "buggyCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nprint(d.age)",
              "fixedCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nprint(d.name)",
              "explanation": "age was never set on the object, so reading it raises AttributeError; only name exists."
            },
            "exercise": {
              "title": "Check your understanding: Attributes",
              "type": "multiple-choice",
              "instructions": "Which statement about attributes is correct?",
              "starterCode": "",
              "solution": "Attributes are stored on an instance with self.name = value, and each instance has its own copy.",
              "solutionExplanation": "Attributes are stored on an instance with self.name = value, and each instance has its own copy. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Attributes are stored on an instance with self.name = value, and each instance has its own copy.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Attributes from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Attributes are shared between all instances of a class.",
                "Attributes can only be set inside __init__.",
                "Attributes must be declared before the class is defined.",
                "Attributes are stored on an instance with self.name = value, and each instance has its own copy."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-classes-m2-l4",
            "slug": "python-classes-m2-l4",
            "title": "Class Attributes",
            "concept": "A class attribute is defined directly in the class body and is shared by all instances, while an instance attribute is set on self and belongs to one object. Class attributes are used for constants and values that are the same for every instance.",
            "syntax": "class Dog:\n    species = \"dog\"",
            "exampleCode": "class Dog:\n    species = \"dog\"\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nprint(d.species)\nprint(Dog.species)",
            "exampleLanguage": "python",
            "mistake": "Changing a class attribute through an instance, which creates an instance attribute that shadows it instead.",
            "bug": {
              "prompt": "Find the bug: this should change the species for all dogs but it changes only one.",
              "buggyCode": "class Dog:\n    species = \"dog\"\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nd.species = \"cat\"\nprint(Dog.species)",
              "fixedCode": "class Dog:\n    species = \"dog\"\n    def __init__(self, name):\n        self.name = name\n\nd = Dog(\"Rex\")\nDog.species = \"cat\"\nprint(Dog.species)",
              "explanation": "Assigning through an instance creates a shadowing instance attribute; assign through the class to change it for all instances."
            },
            "exercise": {
              "title": "Practise Class Attributes",
              "type": "write-code",
              "instructions": "Define a class called Circle with a class attribute pi = 3.14159 and an __init__ that stores a radius. Create a Circle with radius 2 and print Circle.pi.",
              "starterCode": "class Circle:\n    pi = 3.14159\n    def __init__(self, radius):\n        self.radius = radius\n# TODO: write this line\nc = Circle(2)\n# TODO: write this line",
              "solution": "class Circle:\n    pi = 3.14159\n    def __init__(self, radius):\n        self.radius = radius\n\nc = Circle(2)\nprint(Circle.pi)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print pi",
                  "stdin": "",
                  "expectedStdout": "3.14159\n",
                  "hidden": false
                },
                {
                  "name": "Print pi again",
                  "stdin": "",
                  "expectedStdout": "3.14159\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Class Attributes is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-classes-m2-l5",
            "slug": "python-classes-m2-l5",
            "title": "A Bank Account Class",
            "concept": "A bank account class combines everything about classes: __init__ sets the balance, deposit() and withdraw() change it, and __str__ shows it. It is the classic example of an object that guards its own state.",
            "syntax": "class Account:\n    def __init__(self, balance):\n        self.balance = balance",
            "exampleCode": "class Account:\n    def __init__(self, balance):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n\na = Account(100)\na.deposit(50)\nprint(a.balance)",
            "exampleLanguage": "python",
            "mistake": "Letting withdraw() take the balance below zero without checking.",
            "bug": {
              "prompt": "Find the bug: this should keep the balance at 100 but it goes to -50.",
              "buggyCode": "class Account:\n    def __init__(self, balance):\n        self.balance = balance\n    def withdraw(self, amount):\n        self.balance -= amount\n\na = Account(100)\na.withdraw(150)\nprint(a.balance)",
              "fixedCode": "class Account:\n    def __init__(self, balance):\n        self.balance = balance\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n\na = Account(100)\na.withdraw(150)\nprint(a.balance)",
              "explanation": "withdraw() must check that the amount is available; without the check the balance goes negative."
            },
            "exercise": {
              "title": "Practise A Bank Account Class",
              "type": "write-code",
              "instructions": "Define a BankAccount class with deposit() and a balance attribute. Create an account with 100, deposit 25, and print the balance.",
              "starterCode": "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n    def deposit(self, amount):\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line\nprint(a.balance)",
              "solution": "class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n\na = BankAccount(100)\na.deposit(25)\nprint(a.balance)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Deposit 25",
                  "stdin": "",
                  "expectedStdout": "125\n",
                  "hidden": false
                },
                {
                  "name": "Deposit 25 again",
                  "stdin": "",
                  "expectedStdout": "125\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Bank Account Class is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Classes & Objects Capstone",
      "type": "write-code",
      "instructions": "Write a Book class with title, author, and borrowed attributes, borrow() and return_book() methods, and a __str__ that shows the title, author, and whether the book is available or borrowed. Create a Book, print it, borrow it, print it, return it, and print it again.",
      "starterCode": "class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n        self.borrowed = False\n    def borrow(self):\n        self.borrowed = True\n    def return_book(self):\n        self.borrowed = False\n    def __str__(self):\n        status = \"borrowed\" if self.borrowed else \"available\"\n        return self.title + \" by \" + self.author + \" (\" + status + \")\"\n\n# TODO: write this line\nprint(b)\n# TODO: write this line\nprint(b)\n# TODO: write this line\nprint(b)",
      "solution": "class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n        self.borrowed = False\n    def borrow(self):\n        self.borrowed = True\n    def return_book(self):\n        self.borrowed = False\n    def __str__(self):\n        status = \"borrowed\" if self.borrowed else \"available\"\n        return self.title + \" by \" + self.author + \" (\" + status + \")\"\n\nb = Book(\"Python 101\", \"Ada\")\nprint(b)\nb.borrow()\nprint(b)\nb.return_book()\nprint(b)",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Book manager",
          "stdin": "",
          "expectedStdout": "Python 101 by Ada (available)\nPython 101 by Ada (borrowed)\nPython 101 by Ada (available)\n",
          "hidden": false
        },
        {
          "name": "Book manager again",
          "stdin": "",
          "expectedStdout": "Python 101 by Ada (available)\nPython 101 by Ada (borrowed)\nPython 101 by Ada (available)\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Classes & Objects Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
        "structure": "Write a short program that prints exactly what the instructions ask for."
      }
    },
    "capstone": {
      "title": "Classes & Objects Capstone Project",
      "description": "A small end-to-end Python program that puts Classes & Objects into practice.",
      "requirements": [
        "Use the core ideas of Classes & Objects in a working Python program.",
        "Apply at least three of these skills: class keyword, __init__, self, Attributes.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Classes & Objects correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-oop-methods",
    "slug": "python-oop-methods",
    "language": "python",
    "category": "languages",
    "title": "Methods, Attributes & Special Methods",
    "description": "Go deeper with classes \u2014 __repr__, __eq__, @property, @classmethod, @staticmethod, and operator overloading \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "__repr__",
      "__eq__",
      "@property",
      "@classmethod",
      "@staticmethod",
      "Dunder methods",
      "Operator overloading __add__",
      "Encapsulation conventions"
    ],
    "prerequisites": [
      "python-classes"
    ],
    "analogy": "Learning {topic} is like learning the hidden controls of a car: the steering wheel is obvious, but the real power is in the gears underneath.",
    "modules": [
      {
        "id": "python-oop-methods-m1",
        "title": "Methods, Attributes & Special Methods Fundamentals",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-oop-methods-m1-l1",
            "slug": "python-oop-methods-m1-l1",
            "title": "__repr__ vs __str__",
            "concept": "__repr__ returns the unambiguous representation used in the REPL and in containers, while __str__ returns the human-friendly text used by print(). If you define only __repr__, Python falls back to it for printing too.",
            "syntax": "def __repr__(self):\n    return f\"Dog({self.name!r})\"",
            "exampleCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def __repr__(self):\n        return \"Dog(\" + repr(self.name) + \")\"\n\nd = Dog(\"Rex\")\nprint(d)\nprint([d])",
            "exampleLanguage": "python",
            "mistake": "Defining __str__ but not __repr__, so objects inside lists still show the default address form.",
            "bug": {
              "prompt": "Find the bug: this should print [Dog('Rex')] but it prints a memory address.",
              "buggyCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return \"Dog named \" + self.name\n\nd = Dog(\"Rex\")\nprint([d])",
              "fixedCode": "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def __repr__(self):\n        return \"Dog(\" + repr(self.name) + \")\"\n\nd = Dog(\"Rex\")\nprint([d])",
              "explanation": "Containers use __repr__, not __str__; defining __repr__ makes the list show Dog('Rex')."
            },
            "exercise": {
              "title": "Practise __repr__ vs __str__",
              "type": "write-code",
              "instructions": "Define a class called Point with x and y and a __repr__ that returns \"Point(x, y)\" with the values filled in. Create Point(1, 2) and print it.",
              "starterCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n# TODO: write this line\n        return \"Point(\" + str(self.x) + \", \" + str(self.y) + \")\"\n# TODO: write this line\n# TODO: write this line\nprint(p)",
              "solution": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __repr__(self):\n        return \"Point(\" + str(self.x) + \", \" + str(self.y) + \")\"\n\np = Point(1, 2)\nprint(p)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Print a point",
                  "stdin": "",
                  "expectedStdout": "Point(1, 2)\n",
                  "hidden": false
                },
                {
                  "name": "Print a point again",
                  "stdin": "",
                  "expectedStdout": "Point(1, 2)\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "__repr__ vs __str__ is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-oop-methods-m1-l2",
            "slug": "python-oop-methods-m1-l2",
            "title": "Equality with __eq__",
            "concept": "By default, == compares objects by identity, so two objects with the same values are not equal. Defining __eq__ lets you compare by value, and you should also define __hash__ or set it to None when you do.",
            "syntax": "def __eq__(self, other):\n    return self.x == other.x",
            "exampleCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\nprint(Point(1, 2) == Point(1, 2))",
            "exampleLanguage": "python",
            "mistake": "Defining __eq__ without handling the case where other is a different type, which raises AttributeError.",
            "bug": {
              "prompt": "Find the bug: this should print True but it prints False.",
              "buggyCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nprint(Point(1, 2) == Point(1, 2))",
              "fixedCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\nprint(Point(1, 2) == Point(1, 2))",
              "explanation": "Without __eq__, == compares identity, so two different objects are never equal even with the same values."
            },
            "exercise": {
              "title": "Practise Equality with __eq__",
              "type": "write-code",
              "instructions": "Define a class called Point with __eq__ that compares x and y, then print whether Point(1, 2) equals Point(1, 2).",
              "starterCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n# TODO: write this line\n        return self.x == other.x and self.y == other.y\n# TODO: write this line\nprint(Point(1, 2) == Point(1, 2))",
              "solution": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\nprint(Point(1, 2) == Point(1, 2))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Compare points",
                  "stdin": "",
                  "expectedStdout": "True\n",
                  "hidden": false
                },
                {
                  "name": "Compare points again",
                  "stdin": "",
                  "expectedStdout": "True\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Equality with __eq__ is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-oop-methods-m1-l3",
            "slug": "python-oop-methods-m1-l3",
            "title": "Dunder Methods",
            "concept": "Dunder methods, named with double underscores, hook your classes into Python's built-in behaviour: __str__ for printing, __eq__ for equality, __len__ for len(), and __add__ for +. Defining them makes your objects behave like built-in types.",
            "syntax": "def __len__(self):",
            "exampleCode": "class Team:\n    def __init__(self, members):\n        self.members = members\n    def __len__(self):\n        return len(self.members)\n\nprint(len(Team([\"a\", \"b\"])))",
            "exampleLanguage": "python",
            "mistake": "Returning a non-integer from __len__, which raises TypeError.",
            "bug": {
              "prompt": "Find the bug: this should print 2 but it crashes.",
              "buggyCode": "class Team:\n    def __init__(self, members):\n        self.members = members\n    def __len__(self):\n        return \"two\"\n\nprint(len(Team([\"a\", \"b\"])))",
              "fixedCode": "class Team:\n    def __init__(self, members):\n        self.members = members\n    def __len__(self):\n        return len(self.members)\n\nprint(len(Team([\"a\", \"b\"])))",
              "explanation": "__len__ must return an integer; returning a string raises TypeError."
            },
            "exercise": {
              "title": "Check your understanding: Dunder Methods",
              "type": "multiple-choice",
              "instructions": "Which statement about dunder methods is correct?",
              "starterCode": "",
              "solution": "Dunder methods such as __str__ and __eq__ let your objects work with built-in operations like print() and ==.",
              "solutionExplanation": "Dunder methods such as __str__ and __eq__ let your objects work with built-in operations like print() and ==. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Dunder methods such as __str__ and __eq__ let your objects work with built-in operations like print() and ==.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Dunder Methods from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Dunder methods are only used by the Python interpreter, never by your code.",
                "You must define every dunder method for a class to work.",
                "Dunder methods such as __str__ and __eq__ let your objects work with built-in operations like print() and ==.",
                "Dunder methods cannot be defined in your own classes."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-oop-methods-m1-l4",
            "slug": "python-oop-methods-m1-l4",
            "title": "@property",
            "concept": "@property turns a method into an attribute that is computed when read, so circle.diameter looks like data but runs code. A setter with @name.setter lets you validate values when they are assigned.",
            "syntax": "@property\ndef diameter(self):\n    return self.radius * 2",
            "exampleCode": "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    @property\n    def diameter(self):\n        return self.radius * 2\n\nc = Circle(3)\nprint(c.diameter)",
            "exampleLanguage": "python",
            "mistake": "Forgetting @property and calling the attribute as a method, or vice versa.",
            "bug": {
              "prompt": "Find the bug: this should print 6 but it prints a method object.",
              "buggyCode": "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    def diameter(self):\n        return self.radius * 2\n\nc = Circle(3)\nprint(c.diameter)",
              "fixedCode": "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    @property\n    def diameter(self):\n        return self.radius * 2\n\nc = Circle(3)\nprint(c.diameter)",
              "explanation": "Without @property, diameter is a method and printing it shows the method object; the decorator makes it behave like an attribute."
            },
            "exercise": {
              "title": "Practise @property",
              "type": "write-code",
              "instructions": "Define a class called Square with a side attribute and a @property called area that returns side * side. Create Square(4) and print its area.",
              "starterCode": "class Square:\n    def __init__(self, side):\n        self.side = side\n    @property\n# TODO: write this line\n        return self.side * self.side\n# TODO: write this line\n# TODO: write this line\nprint(s.area)",
              "solution": "class Square:\n    def __init__(self, side):\n        self.side = side\n    @property\n    def area(self):\n        return self.side * self.side\n\ns = Square(4)\nprint(s.area)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Square area",
                  "stdin": "",
                  "expectedStdout": "16\n",
                  "hidden": false
                },
                {
                  "name": "Square area again",
                  "stdin": "",
                  "expectedStdout": "16\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "@property is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-oop-methods-m1-l5",
            "slug": "python-oop-methods-m1-l5",
            "title": "Property",
            "concept": "A property is a method decorated with @property, accessed like an attribute but computed on demand. Properties let you add validation or computed values without changing how callers use the object.",
            "syntax": "@property\ndef area(self):",
            "exampleCode": "class Square:\n    def __init__(self, side):\n        self.side = side\n    @property\n    def area(self):\n        return self.side * self.side\n\nprint(Square(5).area)",
            "exampleLanguage": "python",
            "mistake": "Assigning to a read-only property, which raises AttributeError.",
            "bug": {
              "prompt": "Find the bug: this should print 25 but it crashes.",
              "buggyCode": "class Square:\n    def __init__(self, side):\n        self.side = side\n    @property\n    def area(self):\n        return self.side * self.side\n\ns = Square(5)\ns.area = 30\nprint(s.area)",
              "fixedCode": "class Square:\n    def __init__(self, side):\n        self.side = side\n    @property\n    def area(self):\n        return self.side * self.side\n\ns = Square(5)\nprint(s.area)",
              "explanation": "A property without a setter is read-only; assigning to it raises AttributeError."
            },
            "exercise": {
              "title": "Check your understanding: Property",
              "type": "multiple-choice",
              "instructions": "Which statement about @property is correct?",
              "starterCode": "",
              "solution": "@property makes a method behave like an attribute that is computed when it is read.",
              "solutionExplanation": "@property makes a method behave like an attribute that is computed when it is read. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "@property makes a method behave like an attribute that is computed when it is read.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Property from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "@property makes a method behave like an attribute that is computed when it is read.",
                "@property makes an attribute behave like a method.",
                "A property can only be read once.",
                "@property only works on class attributes."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-oop-methods-m2",
        "title": "Methods, Attributes & Special Methods in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-oop-methods-m2-l1",
            "slug": "python-oop-methods-m2-l1",
            "title": "@classmethod",
            "concept": "A classmethod receives the class itself as its first argument, cls, instead of an instance. It is used for alternative constructors, such as from_string(), that build an instance in a special way.",
            "syntax": "@classmethod\ndef from_string(cls, s):",
            "exampleCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    @classmethod\n    def from_string(cls, s):\n        x, y = s.split(\",\")\n        return cls(int(x), int(y))\n\np = Point.from_string(\"3,4\")\nprint(p.x, p.y)",
            "exampleLanguage": "python",
            "mistake": "Using self instead of cls in a classmethod, which breaks subclassing.",
            "bug": {
              "prompt": "Find the bug: this should print 3 4 but it crashes.",
              "buggyCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def from_string(s):\n        x, y = s.split(\",\")\n        return Point(int(x), int(y))\n\np = Point.from_string(\"3,4\")\nprint(p.x, p.y)",
              "fixedCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    @classmethod\n    def from_string(cls, s):\n        x, y = s.split(\",\")\n        return cls(int(x), int(y))\n\np = Point.from_string(\"3,4\")\nprint(p.x, p.y)",
              "explanation": "Without @classmethod, from_string is a regular method and calling it on the class passes no instance; the decorator makes cls the class itself."
            },
            "exercise": {
              "title": "Practise @classmethod",
              "type": "write-code",
              "instructions": "Define a class called Person with a @classmethod called from_pair that takes a (name, age) tuple and returns a Person. Create one from (\"Ada\", 36) and print the name and age.",
              "starterCode": "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    @classmethod\n# TODO: write this line\n        return cls(pair[0], pair[1])\n# TODO: write this line\n# TODO: write this line\nprint(p.name, p.age)",
              "solution": "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    @classmethod\n    def from_pair(cls, pair):\n        return cls(pair[0], pair[1])\n\np = Person.from_pair((\"Ada\", 36))\nprint(p.name, p.age)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Person from pair",
                  "stdin": "",
                  "expectedStdout": "Ada 36\n",
                  "hidden": false
                },
                {
                  "name": "Person from pair again",
                  "stdin": "",
                  "expectedStdout": "Ada 36\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "@classmethod is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-oop-methods-m2-l2",
            "slug": "python-oop-methods-m2-l2",
            "title": "@staticmethod",
            "concept": "A staticmethod takes neither self nor cls, so it behaves like a plain function that lives inside a class for organisation. It is used for helper functions that belong to the class but do not need its data.",
            "syntax": "@staticmethod\ndef is_even(n):\n    return n % 2 == 0",
            "exampleCode": "class Math:\n    @staticmethod\n    def is_even(n):\n        return n % 2 == 0\n\nprint(Math.is_even(4))",
            "exampleLanguage": "python",
            "mistake": "Using a staticmethod where a classmethod was needed, and losing access to the class.",
            "bug": {
              "prompt": "Find the bug: this should print True but it crashes.",
              "buggyCode": "class Math:\n    def is_even(n):\n        return n % 2 == 0\n\nm = Math()\nprint(m.is_even(4))",
              "fixedCode": "class Math:\n    @staticmethod\n    def is_even(n):\n        return n % 2 == 0\n\nm = Math()\nprint(m.is_even(4))",
              "explanation": "Without @staticmethod, calling the method on an instance passes the instance as an extra argument; the decorator stops that."
            },
            "exercise": {
              "title": "Practise @staticmethod",
              "type": "write-code",
              "instructions": "Define a class called Helper with a @staticmethod called double that returns n * 2. Print Helper.double(5).",
              "starterCode": "class Helper:\n    @staticmethod\n    def double(n):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "class Helper:\n    @staticmethod\n    def double(n):\n        return n * 2\n\nprint(Helper.double(5))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Double 5",
                  "stdin": "",
                  "expectedStdout": "10\n",
                  "hidden": false
                },
                {
                  "name": "Double 5 again",
                  "stdin": "",
                  "expectedStdout": "10\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "@staticmethod is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-oop-methods-m2-l3",
            "slug": "python-oop-methods-m2-l3",
            "title": "Method Kinds",
            "concept": "Python has three method kinds: instance methods receive the instance as self, classmethods receive the class as cls, and staticmethods receive neither. Choosing the right kind keeps the code honest about what data it needs.",
            "syntax": "@classmethod\ndef create(cls):",
            "exampleCode": "class A:\n    @classmethod\n    def make(cls):\n        return cls()\n    @staticmethod\n    def hi():\n        return \"hi\"\n\nprint(A.make())\nprint(A.hi())",
            "exampleLanguage": "python",
            "mistake": "Calling a classmethod on an instance and expecting cls to be the instance.",
            "bug": {
              "prompt": "Find the bug: this should create an instance but it crashes.",
              "buggyCode": "class A:\n    def make(s):\n        return s()\n\nprint(A.make())",
              "fixedCode": "class A:\n    @classmethod\n    def make(cls):\n        return cls()\n\nprint(A.make())",
              "explanation": "Without @classmethod, make() expects an argument; the decorator supplies the class as cls."
            },
            "exercise": {
              "title": "Check your understanding: Method Kinds",
              "type": "multiple-choice",
              "instructions": "Which statement about method kinds is correct?",
              "starterCode": "",
              "solution": "Instance methods take self, classmethods take cls, and staticmethods take neither.",
              "solutionExplanation": "Instance methods take self, classmethods take cls, and staticmethods take neither. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Instance methods take self, classmethods take cls, and staticmethods take neither.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Method Kinds from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Classmethods take self and instance methods take cls.",
                "Staticmethods take self like any method.",
                "All three kinds of method take exactly the same first argument.",
                "Instance methods take self, classmethods take cls, and staticmethods take neither."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-oop-methods-m2-l4",
            "slug": "python-oop-methods-m2-l4",
            "title": "Operator Overloading",
            "concept": "Defining __add__ lets your objects work with +, __sub__ with -, and so on. The method receives the other operand and returns the result, so a Point + Point can return a new Point.",
            "syntax": "def __add__(self, other):\n    return Point(self.x + other.x, self.y + other.y)",
            "exampleCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return \"Point(\" + str(self.x) + \", \" + str(self.y) + \")\"\n\nprint(Point(1, 2) + Point(3, 4))",
            "exampleLanguage": "python",
            "mistake": "Forgetting to return a new object from __add__, and returning None instead.",
            "bug": {
              "prompt": "Find the bug: this should print Point(4, 6) but it prints None.",
              "buggyCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        Point(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return \"Point(\" + str(self.x) + \", \" + str(self.y) + \")\"\n\nprint(Point(1, 2) + Point(3, 4))",
              "fixedCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return \"Point(\" + str(self.x) + \", \" + str(self.y) + \")\"\n\nprint(Point(1, 2) + Point(3, 4))",
              "explanation": "__add__ must return the new object; without return, the result is None."
            },
            "exercise": {
              "title": "Practise Operator Overloading",
              "type": "write-code",
              "instructions": "Define a Point class with __add__ and __repr__ so that Point(1, 2) + Point(3, 4) prints Point(4, 6).",
              "starterCode": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n# TODO: write this line\n    def __repr__(self):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return \"Point(\" + str(self.x) + \", \" + str(self.y) + \")\"\n\nprint(Point(1, 2) + Point(3, 4))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Add points",
                  "stdin": "",
                  "expectedStdout": "Point(4, 6)\n",
                  "hidden": false
                },
                {
                  "name": "Add points again",
                  "stdin": "",
                  "expectedStdout": "Point(4, 6)\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Operator Overloading is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-oop-methods-m2-l5",
            "slug": "python-oop-methods-m2-l5",
            "title": "A Money Class",
            "concept": "A Money class with __add__, __eq__, and __str__ shows how dunder methods combine: money adds like numbers, compares by value, and prints nicely. It is a small example of a class that feels like a built-in type.",
            "syntax": "class Money:\n    def __init__(self, cents):\n        self.cents = cents",
            "exampleCode": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n    def __add__(self, other):\n        return Money(self.cents + other.cents)\n    def __str__(self):\n        return \"$\" + str(self.cents / 100)\n\nprint(Money(150) + Money(250))",
            "exampleLanguage": "python",
            "mistake": "Storing money as a float, which introduces rounding errors in cents.",
            "bug": {
              "prompt": "Find the bug: this should print $0.3 but it prints $0.30000000000000004.",
              "buggyCode": "class Money:\n    def __init__(self, amount):\n        self.amount = amount\n    def __add__(self, other):\n        return Money(self.amount + other.amount)\n    def __str__(self):\n        return \"$\" + str(self.amount)\n\nprint(Money(0.1) + Money(0.2))",
              "fixedCode": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n    def __add__(self, other):\n        return Money(self.cents + other.cents)\n    def __str__(self):\n        return \"$\" + str(self.cents / 100)\n\nprint(Money(10) + Money(20))",
              "explanation": "Floats cannot represent 0.1 exactly, so the sum shows rounding error; storing cents as integers keeps money exact."
            },
            "exercise": {
              "title": "Practise A Money Class",
              "type": "write-code",
              "instructions": "Define a Money class that stores cents, with __add__ and __str__ that prints like $1.5. Print Money(100) + Money(50).",
              "starterCode": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n    def __add__(self, other):\n# TODO: write this line\n    def __str__(self):\n# TODO: write this line\n\n# TODO: write this line",
              "solution": "class Money:\n    def __init__(self, cents):\n        self.cents = cents\n    def __add__(self, other):\n        return Money(self.cents + other.cents)\n    def __str__(self):\n        return \"$\" + str(self.cents / 100)\n\nprint(Money(100) + Money(50))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Add money",
                  "stdin": "",
                  "expectedStdout": "$1.5\n",
                  "hidden": false
                },
                {
                  "name": "Add money again",
                  "stdin": "",
                  "expectedStdout": "$1.5\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Money Class is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Methods, Attributes & Special Methods Capstone",
      "type": "write-code",
      "instructions": "Write a Vector class with x and y attributes, __add__ that returns a new Vector, __eq__ that compares x and y, and __repr__ that prints like Vector(4, 6). Print Vector(1, 2) + Vector(3, 4) and Vector(1, 2) == Vector(1, 2).",
      "starterCode": "class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n# TODO: write this line\n    def __eq__(self, other):\n# TODO: write this line\n    def __repr__(self):\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
      "solution": "class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n    def __repr__(self):\n        return \"Vector(\" + str(self.x) + \", \" + str(self.y) + \")\"\n\nprint(Vector(1, 2) + Vector(3, 4))\nprint(Vector(1, 2) == Vector(1, 2))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Vector ops",
          "stdin": "",
          "expectedStdout": "Vector(4, 6)\nTrue\n",
          "hidden": false
        },
        {
          "name": "Vector ops again",
          "stdin": "",
          "expectedStdout": "Vector(4, 6)\nTrue\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Methods, Attributes & Special Methods Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
        "structure": "Write a short program that prints exactly what the instructions ask for."
      }
    },
    "capstone": {
      "title": "Methods, Attributes & Special Methods Capstone Project",
      "description": "A small end-to-end Python program that puts Methods, Attributes & Special Methods into practice.",
      "requirements": [
        "Use the core ideas of Methods, Attributes & Special Methods in a working Python program.",
        "Apply at least three of these skills: __repr__, __eq__, @property, @classmethod.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Methods, Attributes & Special Methods correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-inheritance",
    "slug": "python-inheritance",
    "language": "python",
    "category": "languages",
    "title": "Inheritance & Polymorphism",
    "description": "Learn inheritance \u2014 subclasses, super(), overriding, isinstance(), and abstract base classes \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "Subclasses",
      "super()",
      "Overriding methods",
      "isinstance()",
      "Multiple inheritance intro",
      "Abstract base classes intro",
      "Polymorphism",
      "MRO intro"
    ],
    "prerequisites": [
      "python-oop-methods"
    ],
    "analogy": "Learning {topic} is like learning a family tree: children inherit traits from their parents, then add their own.",
    "modules": [
      {
        "id": "python-inheritance-m1",
        "title": "Inheritance & Polymorphism Fundamentals",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-inheritance-m1-l1",
            "slug": "python-inheritance-m1-l1",
            "title": "Creating a Subclass",
            "concept": "A subclass is defined with class Child(Parent): and inherits all of the parent's methods and attributes. It can add new methods and override old ones, reusing the parent's code without copying it.",
            "syntax": "class Dog(Animal):",
            "exampleCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.speak()",
            "exampleLanguage": "python",
            "mistake": "Forgetting to list the parent class, so the subclass inherits from nothing.",
            "bug": {
              "prompt": "Find the bug: this should print Woof! but it prints ...",
              "buggyCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog:\n    pass\n\nd = Dog()\nd.speak()",
              "fixedCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.speak()",
              "explanation": "class Dog: with no parent does not inherit speak(); class Dog(Animal): does."
            },
            "exercise": {
              "title": "Practise Creating a Subclass",
              "type": "write-code",
              "instructions": "Define a class Animal with a method move that prints \"moving\", and a subclass Bird that inherits it. Create a Bird and call move().",
              "starterCode": "class Animal:\n    def move(self):\n        print(\"moving\")\n\nclass Bird(Animal):\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "class Animal:\n    def move(self):\n        print(\"moving\")\n\nclass Bird(Animal):\n    pass\n\nb = Bird()\nb.move()",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Bird moves",
                  "stdin": "",
                  "expectedStdout": "moving\n",
                  "hidden": false
                },
                {
                  "name": "Bird moves again",
                  "stdin": "",
                  "expectedStdout": "moving\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Creating a Subclass is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-inheritance-m1-l2",
            "slug": "python-inheritance-m1-l2",
            "title": "super() and Parent __init__",
            "concept": "super() gives access to the parent class, and super().__init__(...) runs the parent's setup before the subclass adds its own attributes. It keeps the parent's initialisation in one place instead of duplicating it.",
            "syntax": "super().__init__(name)",
            "exampleCode": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n\nd = Dog(\"Rex\", \"Lab\")\nprint(d.name, d.breed)",
            "exampleLanguage": "python",
            "mistake": "Overriding __init__ without calling super().__init__(), so the parent's attributes are never set.",
            "bug": {
              "prompt": "Find the bug: this should print Rex Lab but it crashes.",
              "buggyCode": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        self.breed = breed\n\nd = Dog(\"Rex\", \"Lab\")\nprint(d.name, d.breed)",
              "fixedCode": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n\nd = Dog(\"Rex\", \"Lab\")\nprint(d.name, d.breed)",
              "explanation": "Without super().__init__(name), the parent's __init__ never runs and name is never set."
            },
            "exercise": {
              "title": "Practise super() and Parent __init__",
              "type": "write-code",
              "instructions": "Define Animal with __init__ storing name, and Dog(Animal) with __init__ that calls super().__init__(name) and stores breed. Create Dog(\"Rex\", \"Lab\") and print its name and breed.",
              "starterCode": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n# TODO: write this line\n# TODO: write this line\n        self.breed = breed\n# TODO: write this line\n# TODO: write this line\nprint(d.name, d.breed)",
              "solution": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, breed):\n        super().__init__(name)\n        self.breed = breed\n\nd = Dog(\"Rex\", \"Lab\")\nprint(d.name, d.breed)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Dog with breed",
                  "stdin": "",
                  "expectedStdout": "Rex Lab\n",
                  "hidden": false
                },
                {
                  "name": "Dog with breed again",
                  "stdin": "",
                  "expectedStdout": "Rex Lab\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "super() and Parent __init__ is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-inheritance-m1-l3",
            "slug": "python-inheritance-m1-l3",
            "title": "Inheritance",
            "concept": "Inheritance lets a subclass reuse a parent's code and specialise it, so common behaviour lives in one place. The subclass is a kind of the parent: a Dog is an Animal, so anywhere an Animal works, a Dog works too.",
            "syntax": "class Dog(Animal):",
            "exampleCode": "class Animal:\n    def breathe(self):\n        print(\"breathing\")\n\nclass Dog(Animal):\n    pass\n\nd = Dog()\nd.breathe()",
            "exampleLanguage": "python",
            "mistake": "Making everything inherit from one giant base class instead of composing small, focused classes.",
            "bug": {
              "prompt": "Find the bug: this should print breathing but it crashes.",
              "buggyCode": "class Animal:\n    def breathe(self):\n        print(\"breathing\")\n\nclass Dog:\n    pass\n\nd = Dog()\nd.breathe()",
              "fixedCode": "class Animal:\n    def breathe(self):\n        print(\"breathing\")\n\nclass Dog(Animal):\n    pass\n\nd = Dog()\nd.breathe()",
              "explanation": "Dog does not inherit from Animal, so it has no breathe() method; class Dog(Animal) fixes it."
            },
            "exercise": {
              "title": "Check your understanding: Inheritance",
              "type": "multiple-choice",
              "instructions": "Which statement about inheritance is correct?",
              "starterCode": "",
              "solution": "A subclass inherits its parent's methods and attributes, and can override them or add new ones.",
              "solutionExplanation": "A subclass inherits its parent's methods and attributes, and can override them or add new ones. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A subclass inherits its parent's methods and attributes, and can override them or add new ones.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Inheritance from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A subclass starts with no methods at all.",
                "A parent class inherits from its subclasses.",
                "A subclass inherits its parent's methods and attributes, and can override them or add new ones.",
                "A subclass cannot add methods of its own."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-inheritance-m1-l4",
            "slug": "python-inheritance-m1-l4",
            "title": "Overriding Methods",
            "concept": "A subclass can define a method with the same name as the parent's, and the subclass version runs instead. Overriding specialises behaviour while keeping the same interface, so callers do not need to know which class they have.",
            "syntax": "class Dog(Animal):\n    def speak(self):",
            "exampleCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nclass Cat(Animal):\n    def speak(self):\n        print(\"Meow!\")\n\nDog().speak()\nCat().speak()",
            "exampleLanguage": "python",
            "mistake": "Overriding a method with a different signature, so calls that worked on the parent fail on the child.",
            "bug": {
              "prompt": "Find the bug: this should print Woof! but it prints ...",
              "buggyCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def bark(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.speak()",
              "fixedCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.speak()",
              "explanation": "Defining bark() does not override speak(); the method must have the same name to replace the parent's version."
            },
            "exercise": {
              "title": "Practise Overriding Methods",
              "type": "write-code",
              "instructions": "Define Animal with speak() printing \"...\", and Dog(Animal) overriding speak() to print \"Woof!\". Create a Dog and call speak().",
              "starterCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n# TODO: write this line\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.speak()",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Dog speaks",
                  "stdin": "",
                  "expectedStdout": "Woof!\n",
                  "hidden": false
                },
                {
                  "name": "Dog speaks again",
                  "stdin": "",
                  "expectedStdout": "Woof!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Overriding Methods is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-inheritance-m1-l5",
            "slug": "python-inheritance-m1-l5",
            "title": "Overriding",
            "concept": "When a subclass defines a method with the same name as the parent's, calls on the subclass use the new version, while calls on the parent still use the old one. The parent's version can still be reached with super().",
            "syntax": "super().speak()",
            "exampleCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        super().speak()\n        print(\"Woof!\")\n\nDog().speak()",
            "exampleLanguage": "python",
            "mistake": "Overriding a method and forgetting to call super(), so the parent's work is lost.",
            "bug": {
              "prompt": "Find the bug: this should print ... then Woof! but it prints only Woof!.",
              "buggyCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nDog().speak()",
              "fixedCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        super().speak()\n        print(\"Woof!\")\n\nDog().speak()",
              "explanation": "The override replaces the parent's method entirely; calling super().speak() runs the parent's version first."
            },
            "exercise": {
              "title": "Check your understanding: Overriding",
              "type": "multiple-choice",
              "instructions": "Which statement about overriding is correct?",
              "starterCode": "",
              "solution": "A subclass method with the same name as the parent's replaces it when called on the subclass.",
              "solutionExplanation": "A subclass method with the same name as the parent's replaces it when called on the subclass. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A subclass method with the same name as the parent's replaces it when called on the subclass.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Overriding from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A subclass method with the same name as the parent's replaces it when called on the subclass.",
                "A subclass cannot replace a parent's method.",
                "Overriding a method also changes the parent's method.",
                "An overriding method must have a different name."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-inheritance-m2",
        "title": "Inheritance & Polymorphism in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-inheritance-m2-l1",
            "slug": "python-inheritance-m2-l1",
            "title": "isinstance() and Polymorphism",
            "concept": "isinstance(obj, Class) is True when obj is an instance of the class or any of its subclasses. Polymorphism means code that works with a parent class works with any subclass, because each subclass provides the same methods with its own behaviour.",
            "syntax": "isinstance(d, Animal)",
            "exampleCode": "class Animal:\n    def speak(self):\n        print(\"...\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nd = Dog()\nprint(isinstance(d, Animal))\nprint(isinstance(d, Dog))",
            "exampleLanguage": "python",
            "mistake": "Using type(obj) == Class instead of isinstance(), which fails for subclasses.",
            "bug": {
              "prompt": "Find the bug: this should print True but it prints False.",
              "buggyCode": "class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nd = Dog()\nprint(type(d) == Animal)",
              "fixedCode": "class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nd = Dog()\nprint(isinstance(d, Animal))",
              "explanation": "type(d) is Dog, not Animal, so the equality is False; isinstance() is True for subclasses too."
            },
            "exercise": {
              "title": "Practise isinstance() and Polymorphism",
              "type": "write-code",
              "instructions": "Define Animal and Dog(Animal). Create a Dog and print isinstance(d, Animal) and isinstance(d, Dog).",
              "starterCode": "class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\n# TODO: write this line\n# TODO: write this line\nprint(isinstance(d, Dog))",
              "solution": "class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nd = Dog()\nprint(isinstance(d, Animal))\nprint(isinstance(d, Dog))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Check types",
                  "stdin": "",
                  "expectedStdout": "True\nTrue\n",
                  "hidden": false
                },
                {
                  "name": "Check types again",
                  "stdin": "",
                  "expectedStdout": "True\nTrue\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "isinstance() and Polymorphism is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-inheritance-m2-l2",
            "slug": "python-inheritance-m2-l2",
            "title": "Extending with New Methods",
            "concept": "A subclass can add methods the parent does not have, extending what its objects can do. Code that only knows about the parent cannot call the new methods, so they are used where the subclass is known.",
            "syntax": "class Dog(Animal):\n    def fetch(self):",
            "exampleCode": "class Animal:\n    def move(self):\n        print(\"moving\")\n\nclass Dog(Animal):\n    def fetch(self):\n        print(\"fetching\")\n\nd = Dog()\nd.move()\nd.fetch()",
            "exampleLanguage": "python",
            "mistake": "Adding a method to the parent that only makes sense for one subclass.",
            "bug": {
              "prompt": "Find the bug: this should print fetching but it crashes.",
              "buggyCode": "class Animal:\n    def move(self):\n        print(\"moving\")\n\nclass Dog(Animal):\n    pass\n\nd = Dog()\nd.fetch()",
              "fixedCode": "class Animal:\n    def move(self):\n        print(\"moving\")\n\nclass Dog(Animal):\n    def fetch(self):\n        print(\"fetching\")\n\nd = Dog()\nd.fetch()",
              "explanation": "fetch() was never defined on Dog; add the method to the subclass to extend it."
            },
            "exercise": {
              "title": "Practise Extending with New Methods",
              "type": "write-code",
              "instructions": "Define Animal with move() printing \"moving\", and Cat(Animal) with a new method purr() printing \"purring\". Create a Cat and call both methods.",
              "starterCode": "class Animal:\n    def move(self):\n        print(\"moving\")\n\nclass Cat(Animal):\n# TODO: write this line\n        print(\"purring\")\n# TODO: write this line\n# TODO: write this line\n# TODO: write this line\nc.purr()",
              "solution": "class Animal:\n    def move(self):\n        print(\"moving\")\n\nclass Cat(Animal):\n    def purr(self):\n        print(\"purring\")\n\nc = Cat()\nc.move()\nc.purr()",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Cat moves and purrs",
                  "stdin": "",
                  "expectedStdout": "moving\npurring\n",
                  "hidden": false
                },
                {
                  "name": "Cat moves and purrs again",
                  "stdin": "",
                  "expectedStdout": "moving\npurring\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Extending with New Methods is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-inheritance-m2-l3",
            "slug": "python-inheritance-m2-l3",
            "title": "MRO",
            "concept": "The method resolution order is the order Python searches classes to find a method, and you can see it with Class.__mro__. For single inheritance it is the class, then the parent, then object; for multiple inheritance it follows the C3 linearisation.",
            "syntax": "Dog.__mro__",
            "exampleCode": "class A:\n    pass\n\nclass B(A):\n    pass\n\nprint([c.__name__ for c in B.__mro__])",
            "exampleLanguage": "python",
            "mistake": "Relying on the MRO of a complex multiple-inheritance hierarchy instead of keeping the hierarchy simple.",
            "bug": {
              "prompt": "Find the bug: this should print B, A, object but it prints A, B, object.",
              "buggyCode": "class A:\n    pass\n\nclass B(A):\n    pass\n\nprint([c.__name__ for c in A.__mro__])",
              "fixedCode": "class A:\n    pass\n\nclass B(A):\n    pass\n\nprint([c.__name__ for c in B.__mro__])",
              "explanation": "A.__mro__ is the order for A, not for B; B.__mro__ starts with B, then A, then object."
            },
            "exercise": {
              "title": "Check your understanding: MRO",
              "type": "multiple-choice",
              "instructions": "Which statement about the method resolution order is correct?",
              "starterCode": "",
              "solution": "Python searches a class, then its parents in order, to find a method \u2014 that search order is the MRO.",
              "solutionExplanation": "Python searches a class, then its parents in order, to find a method \u2014 that search order is the MRO. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Python searches a class, then its parents in order, to find a method \u2014 that search order is the MRO.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of MRO from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "Python searches parent classes before the class itself.",
                "The MRO is the same for every class.",
                "Python picks a method at random when several classes define it.",
                "Python searches a class, then its parents in order, to find a method \u2014 that search order is the MRO."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-inheritance-m2-l4",
            "slug": "python-inheritance-m2-l4",
            "title": "Abstract Base Classes",
            "concept": "An abstract base class defines methods that subclasses must implement, using @abstractmethod, and cannot be instantiated itself. It documents an interface and lets Python enforce that subclasses provide the required behaviour.",
            "syntax": "class Shape(ABC):\n    @abstractmethod\n    def area(self):",
            "exampleCode": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\nprint(Square(4).area())",
            "exampleLanguage": "python",
            "mistake": "Trying to create an instance of an abstract class, which raises TypeError.",
            "bug": {
              "prompt": "Find the bug: this should create a Square but it crashes.",
              "buggyCode": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nprint(Shape())",
              "fixedCode": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\nprint(Square(4).area())",
              "explanation": "An abstract class with unimplemented abstract methods cannot be instantiated; a concrete subclass that implements area() can."
            },
            "exercise": {
              "title": "Practise Abstract Base Classes",
              "type": "write-code",
              "instructions": "Define an abstract Shape class with an abstract area() method, and a Circle subclass that returns 3.14159 * r * r. Create Circle(2) and print its area.",
              "starterCode": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, r):\n# TODO: write this line\n# TODO: write this line\n        return 3.14159 * self.r * self.r\n# TODO: write this line\nprint(Circle(2).area())",
              "solution": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14159 * self.r * self.r\n\nprint(Circle(2).area())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Circle area",
                  "stdin": "",
                  "expectedStdout": "12.56636\n",
                  "hidden": false
                },
                {
                  "name": "Circle area again",
                  "stdin": "",
                  "expectedStdout": "12.56636\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Abstract Base Classes is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-inheritance-m2-l5",
            "slug": "python-inheritance-m2-l5",
            "title": "A Shape Hierarchy",
            "concept": "A shape hierarchy puts shared behaviour in a Shape base class and specialises area() in each subclass, so code that works with shapes works with any of them. It is the classic example of polymorphism in action.",
            "syntax": "class Square(Shape):",
            "exampleCode": "class Shape:\n    def area(self):\n        return 0\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\nprint(Square(3).area())",
            "exampleLanguage": "python",
            "mistake": "Duplicating the area calculation in every subclass instead of sharing common parts in the base class.",
            "bug": {
              "prompt": "Find the bug: this should print 9 but it prints 0.",
              "buggyCode": "class Shape:\n    def area(self):\n        return 0\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\nprint(Square(3).area())",
              "fixedCode": "class Shape:\n    def area(self):\n        return 0\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\nprint(Square(3).area())",
              "explanation": "Square never overrides area(), so the base class version returns 0; the subclass must define its own area()."
            },
            "exercise": {
              "title": "Practise A Shape Hierarchy",
              "type": "write-code",
              "instructions": "Define a Shape base class with area() returning 0, and a Rectangle subclass storing width and height with area() returning width * height. Print Rectangle(3, 4).area().",
              "starterCode": "class Shape:\n    def area(self):\n        return 0\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n# TODO: write this line\n# TODO: write this line\n    def area(self):\n# TODO: write this line\n\nprint(Rectangle(3, 4).area())",
              "solution": "class Shape:\n    def area(self):\n        return 0\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height\n\nprint(Rectangle(3, 4).area())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Rectangle area",
                  "stdin": "",
                  "expectedStdout": "12\n",
                  "hidden": false
                },
                {
                  "name": "Rectangle area again",
                  "stdin": "",
                  "expectedStdout": "12\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Shape Hierarchy is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Inheritance & Polymorphism Capstone",
      "type": "write-code",
      "instructions": "Write an Employee base class with name, salary, and a pay() method returning the salary. Add a Manager subclass with a bonus added to pay(), and a Developer subclass with overtime added to pay(). Print Manager(\"Ada\", 5000, 1000).pay() and Developer(\"Grace\", 4000, 500).pay().",
      "starterCode": "class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n    def pay(self):\n        return self.salary\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        super().__init__(name, salary)\n        self.bonus = bonus\n    def pay(self):\n# TODO: write this line\n\nclass Developer(Employee):\n    def __init__(self, name, salary, overtime):\n        super().__init__(name, salary)\n        self.overtime = overtime\n    def pay(self):\n# TODO: write this line\n\n# TODO: write this line\n# TODO: write this line",
      "solution": "class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n    def pay(self):\n        return self.salary\n\nclass Manager(Employee):\n    def __init__(self, name, salary, bonus):\n        super().__init__(name, salary)\n        self.bonus = bonus\n    def pay(self):\n        return self.salary + self.bonus\n\nclass Developer(Employee):\n    def __init__(self, name, salary, overtime):\n        super().__init__(name, salary)\n        self.overtime = overtime\n    def pay(self):\n        return self.salary + self.overtime\n\nprint(Manager(\"Ada\", 5000, 1000).pay())\nprint(Developer(\"Grace\", 4000, 500).pay())",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Payroll",
          "stdin": "",
          "expectedStdout": "6000\n4500\n",
          "hidden": false
        },
        {
          "name": "Payroll again",
          "stdin": "",
          "expectedStdout": "6000\n4500\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Inheritance & Polymorphism Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
        "structure": "Write a short program that prints exactly what the instructions ask for."
      }
    },
    "capstone": {
      "title": "Inheritance & Polymorphism Capstone Project",
      "description": "A small end-to-end Python program that puts Inheritance & Polymorphism into practice.",
      "requirements": [
        "Use the core ideas of Inheritance & Polymorphism in a working Python program.",
        "Apply at least three of these skills: Subclasses, super(), Overriding methods, isinstance().",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Inheritance & Polymorphism correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-comprehensions",
    "slug": "python-comprehensions",
    "language": "python",
    "category": "languages",
    "title": "Comprehensions",
    "description": "Learn list, dict, and set comprehensions \u2014 Python's compact way to build collections \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "List comprehensions",
      "Conditionals in comprehensions",
      "Dict comprehensions",
      "Set comprehensions",
      "Generator expressions intro",
      "Nested comprehensions",
      "When not to use them",
      "Readability"
    ],
    "prerequisites": [
      "python-loops"
    ],
    "analogy": "Learning {topic} is like learning shorthand: once you can write a whole loop in one line, your notes get much shorter.",
    "modules": [
      {
        "id": "python-comprehensions-m1",
        "title": "Comprehensions Fundamentals",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-comprehensions-m1-l1",
            "slug": "python-comprehensions-m1-l1",
            "title": "List Comprehension Basics",
            "concept": "A list comprehension [expr for item in items] builds a new list by transforming each item, replacing a three-line loop with one expression. It is faster to read once you are used to it, and faster to run.",
            "syntax": "[n * 2 for n in nums]",
            "exampleCode": "nums = [1, 2, 3]\nprint([n * 2 for n in nums])",
            "exampleLanguage": "python",
            "mistake": "Writing a comprehension with a side effect, such as print(), instead of building a list.",
            "bug": {
              "prompt": "Find the bug: this should print [2, 4, 6] but it prints [None, None, None].",
              "buggyCode": "nums = [1, 2, 3]\nprint([print(n * 2) for n in nums])",
              "fixedCode": "nums = [1, 2, 3]\nprint([n * 2 for n in nums])",
              "explanation": "print() returns None, so the comprehension collects Nones; the expression should be the value itself, n * 2."
            },
            "exercise": {
              "title": "Practise List Comprehension Basics",
              "type": "write-code",
              "instructions": "Use a list comprehension to square the numbers in [1, 2, 3, 4] and print the resulting list.",
              "starterCode": "# TODO: write this line",
              "solution": "print([n * n for n in [1, 2, 3, 4]])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Square numbers",
                  "stdin": "",
                  "expectedStdout": "[1, 4, 9, 16]\n",
                  "hidden": false
                },
                {
                  "name": "Square numbers again",
                  "stdin": "",
                  "expectedStdout": "[1, 4, 9, 16]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "List Comprehension Basics is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-comprehensions-m1-l2",
            "slug": "python-comprehensions-m1-l2",
            "title": "Comprehension with a Condition",
            "concept": "Adding if to a comprehension filters the items, so [n for n in nums if n > 0] keeps only the positives. The condition comes after the for, and only items that pass it are transformed.",
            "syntax": "[n for n in nums if n > 0]",
            "exampleCode": "nums = [-1, 2, -3, 4]\nprint([n for n in nums if n > 0])",
            "exampleLanguage": "python",
            "mistake": "Putting the if before the for, which is a syntax error in a comprehension.",
            "bug": {
              "prompt": "Find the bug: this should print [2, 4] but it is a syntax error.",
              "buggyCode": "nums = [-1, 2, -3, 4]\nprint([n if n > 0 for n in nums])",
              "fixedCode": "nums = [-1, 2, -3, 4]\nprint([n for n in nums if n > 0])",
              "explanation": "The filter if comes after the for clause; putting it before the for is a syntax error."
            },
            "exercise": {
              "title": "Practise Comprehension with a Condition",
              "type": "write-code",
              "instructions": "Use a list comprehension to keep only the even numbers from [1, 2, 3, 4, 5, 6] and print the list.",
              "starterCode": "# TODO: write this line",
              "solution": "print([n for n in [1, 2, 3, 4, 5, 6] if n % 2 == 0])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Even numbers",
                  "stdin": "",
                  "expectedStdout": "[2, 4, 6]\n",
                  "hidden": false
                },
                {
                  "name": "Even numbers again",
                  "stdin": "",
                  "expectedStdout": "[2, 4, 6]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Comprehension with a Condition is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-comprehensions-m1-l3",
            "slug": "python-comprehensions-m1-l3",
            "title": "Comprehensions",
            "concept": "A list comprehension is a compact way to build a list: an expression, a for clause, and an optional if filter, all inside square brackets. It creates a new list and leaves the original unchanged.",
            "syntax": "[s.upper() for s in words]",
            "exampleCode": "words = [\"a\", \"b\"]\nprint([s.upper() for s in words])",
            "exampleLanguage": "python",
            "mistake": "Writing a comprehension so long that a plain loop would be clearer.",
            "bug": {
              "prompt": "Find the bug: this should print ['A', 'B'] but it prints ['a', 'b'].",
              "buggyCode": "words = [\"a\", \"b\"]\nprint([s for s in words])",
              "fixedCode": "words = [\"a\", \"b\"]\nprint([s.upper() for s in words])",
              "explanation": "The expression is just s, so the list is unchanged; the expression must transform the item, such as s.upper()."
            },
            "exercise": {
              "title": "Check your understanding: Comprehensions",
              "type": "multiple-choice",
              "instructions": "Which statement about list comprehensions is correct?",
              "starterCode": "",
              "solution": "A comprehension builds a new list from an expression, a loop, and an optional filter, in one line.",
              "solutionExplanation": "A comprehension builds a new list from an expression, a loop, and an optional filter, in one line. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A comprehension builds a new list from an expression, a loop, and an optional filter, in one line.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Comprehensions from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A comprehension changes the original list in place.",
                "A comprehension can only contain numbers.",
                "A comprehension builds a new list from an expression, a loop, and an optional filter, in one line.",
                "A comprehension always runs slower than a for loop."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-comprehensions-m1-l4",
            "slug": "python-comprehensions-m1-l4",
            "title": "Transforming with Comprehensions",
            "concept": "The expression at the start of a comprehension transforms each item, so [len(s) for s in words] gives the lengths and [s.upper() for s in words] gives the uppercase versions. Any expression works, including a function call.",
            "syntax": "[len(s) for s in words]",
            "exampleCode": "words = [\"pear\", \"fig\"]\nprint([len(s) for s in words])\nprint([s.upper() for s in words])",
            "exampleLanguage": "python",
            "mistake": "Forgetting the brackets and writing a generator expression instead of a list.",
            "bug": {
              "prompt": "Find the bug: this should print [4, 3] but it prints a generator object.",
              "buggyCode": "words = [\"pear\", \"fig\"]\nprint((len(s) for s in words))",
              "fixedCode": "words = [\"pear\", \"fig\"]\nprint([len(s) for s in words])",
              "explanation": "Parentheses make a generator expression, which is lazy; square brackets make a list."
            },
            "exercise": {
              "title": "Practise Transforming with Comprehensions",
              "type": "write-code",
              "instructions": "Use a list comprehension to get the lengths of the words in [\"apple\", \"fig\", \"pear\"] and print the list.",
              "starterCode": "# TODO: write this line",
              "solution": "print([len(s) for s in [\"apple\", \"fig\", \"pear\"]])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Word lengths",
                  "stdin": "",
                  "expectedStdout": "[5, 3, 4]\n",
                  "hidden": false
                },
                {
                  "name": "Word lengths again",
                  "stdin": "",
                  "expectedStdout": "[5, 3, 4]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Transforming with Comprehensions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-comprehensions-m1-l5",
            "slug": "python-comprehensions-m1-l5",
            "title": "Readability",
            "concept": "Comprehensions are clearest for one transformation or one filter. When the logic needs several steps, nested conditions, or side effects, a plain loop with named variables is easier to read and to debug.",
            "syntax": "[x for x in xs if x]",
            "exampleCode": "nums = [1, 2, 3]\nprint([n * 2 for n in nums])",
            "exampleLanguage": "python",
            "mistake": "Nesting three comprehensions deep, which nobody can read at a glance.",
            "bug": {
              "prompt": "Find the bug: this comprehension is correct but unreadable \u2014 what should it be?",
              "buggyCode": "print([[y * 2 for y in [x for x in range(3)]] for _ in range(1)])",
              "fixedCode": "nums = [0, 1, 2]\ndoubled = [n * 2 for n in nums]\nprint(doubled)",
              "explanation": "Deeply nested comprehensions hide the logic; a simple comprehension with a clear name is easier to read."
            },
            "exercise": {
              "title": "Check your understanding: Readability",
              "type": "multiple-choice",
              "instructions": "Which statement about comprehension style is correct?",
              "starterCode": "",
              "solution": "A comprehension is best for a simple transform or filter; a plain loop is clearer for complex logic.",
              "solutionExplanation": "A comprehension is best for a simple transform or filter; a plain loop is clearer for complex logic. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A comprehension is best for a simple transform or filter; a plain loop is clearer for complex logic.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Readability from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A comprehension is best for a simple transform or filter; a plain loop is clearer for complex logic.",
                "Comprehensions should always replace loops, however complex.",
                "A comprehension must never contain an if.",
                "Loops are always faster than comprehensions."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-comprehensions-m2",
        "title": "Comprehensions in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-comprehensions-m2-l1",
            "slug": "python-comprehensions-m2-l1",
            "title": "Dict Comprehensions",
            "concept": "A dict comprehension {key: value for item in items} builds a dictionary in one line, such as {s: len(s) for s in words}. An optional if filters the items, just like in a list comprehension.",
            "syntax": "{s: len(s) for s in words}",
            "exampleCode": "words = [\"apple\", \"fig\"]\nprint({s: len(s) for s in words})",
            "exampleLanguage": "python",
            "mistake": "Forgetting the colon between the key and the value, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should print {'apple': 5, 'fig': 3} but it is a syntax error.",
              "buggyCode": "words = [\"apple\", \"fig\"]\nprint({s len(s) for s in words})",
              "fixedCode": "words = [\"apple\", \"fig\"]\nprint({s: len(s) for s in words})",
              "explanation": "A dict comprehension needs a colon between the key and the value; without it the expression is invalid."
            },
            "exercise": {
              "title": "Practise Dict Comprehensions",
              "type": "write-code",
              "instructions": "Use a dict comprehension to map each number in [1, 2, 3] to its square, and print the dictionary.",
              "starterCode": "# TODO: write this line",
              "solution": "print({n: n * n for n in [1, 2, 3]})",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Squares dict",
                  "stdin": "",
                  "expectedStdout": "{1: 1, 2: 4, 3: 9}\n",
                  "hidden": false
                },
                {
                  "name": "Squares dict again",
                  "stdin": "",
                  "expectedStdout": "{1: 1, 2: 4, 3: 9}\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Dict Comprehensions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-comprehensions-m2-l2",
            "slug": "python-comprehensions-m2-l2",
            "title": "Set Comprehensions",
            "concept": "A set comprehension {expr for item in items} builds a set, dropping duplicates automatically. It is the compact way to collect unique transformed values, such as the first letters of a list of words.",
            "syntax": "{s[0] for s in words}",
            "exampleCode": "words = [\"apple\", \"apricot\", \"fig\"]\nprint(sorted({s[0] for s in words}))",
            "exampleLanguage": "python",
            "mistake": "Using a set comprehension when the order of results matters.",
            "bug": {
              "prompt": "Find the bug: this should print the unique first letters in order but they come out unordered.",
              "buggyCode": "words = [\"apple\", \"apricot\", \"fig\"]\nprint({s[0] for s in words})",
              "fixedCode": "words = [\"apple\", \"apricot\", \"fig\"]\nprint(sorted({s[0] for s in words}))",
              "explanation": "Sets are unordered, so printing one shows items in an arbitrary order; sort them when order matters."
            },
            "exercise": {
              "title": "Practise Set Comprehensions",
              "type": "write-code",
              "instructions": "Use a set comprehension to collect the unique remainders of [1, 2, 3, 4, 5] divided by 2, and print them sorted.",
              "starterCode": "# TODO: write this line",
              "solution": "print(sorted({n % 2 for n in [1, 2, 3, 4, 5]}))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Unique remainders",
                  "stdin": "",
                  "expectedStdout": "[0, 1]\n",
                  "hidden": false
                },
                {
                  "name": "Unique remainders again",
                  "stdin": "",
                  "expectedStdout": "[0, 1]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Set Comprehensions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-comprehensions-m2-l3",
            "slug": "python-comprehensions-m2-l3",
            "title": "Dict/Set Comprehensions",
            "concept": "Dict and set comprehensions share the same shape, differing only in the colon: {k: v for ...} builds a dict, while {v for ...} builds a set. Both can filter with if, and both build a new collection.",
            "syntax": "{k: v for k, v in pairs}",
            "exampleCode": "print({n: n * n for n in [1, 2]})\nprint({n % 2 for n in [1, 2, 3]})",
            "exampleLanguage": "python",
            "mistake": "Writing {k, v for ...} with a comma instead of a colon, which builds a set of tuples instead of a dict.",
            "bug": {
              "prompt": "Find the bug: this should print a dict but it prints a set.",
              "buggyCode": "print({n, n * n for n in [1, 2]})",
              "fixedCode": "print({n: n * n for n in [1, 2]})",
              "explanation": "A comma makes a set of tuples; a colon between the key and the value makes a dict."
            },
            "exercise": {
              "title": "Check your understanding: Dict/Set Comprehensions",
              "type": "multiple-choice",
              "instructions": "Which statement about dict and set comprehensions is correct?",
              "starterCode": "",
              "solution": "A dict comprehension uses {key: value for ...} and a set comprehension uses {value for ...}.",
              "solutionExplanation": "A dict comprehension uses {key: value for ...} and a set comprehension uses {value for ...}. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A dict comprehension uses {key: value for ...} and a set comprehension uses {value for ...}.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Dict/Set Comprehensions from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A dict comprehension and a set comprehension have the same syntax.",
                "Dict comprehensions cannot have a filter.",
                "Set comprehensions keep duplicate values.",
                "A dict comprehension uses {key: value for ...} and a set comprehension uses {value for ...}."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-comprehensions-m2-l4",
            "slug": "python-comprehensions-m2-l4",
            "title": "Nested Comprehensions",
            "concept": "A comprehension can contain another for clause, so [x for row in grid for x in row] flattens a grid into one list. The clauses read left to right, like nested loops, and the expression comes first.",
            "syntax": "[x for row in grid for x in row]",
            "exampleCode": "grid = [[1, 2], [3, 4]]\nprint([x for row in grid for x in row])",
            "exampleLanguage": "python",
            "mistake": "Writing the for clauses in the wrong order, which changes which loop is outer.",
            "bug": {
              "prompt": "Find the bug: this should print [1, 2, 3, 4] but it prints the rows repeated.",
              "buggyCode": "grid = [[1, 2], [3, 4]]\nprint([row for row in grid for x in row])",
              "fixedCode": "grid = [[1, 2], [3, 4]]\nprint([x for row in grid for x in row])",
              "explanation": "The expression is row, so each row is repeated once per item; the expression must be x, the item inside the row."
            },
            "exercise": {
              "title": "Practise Nested Comprehensions",
              "type": "write-code",
              "instructions": "Flatten the grid [[1, 2], [3, 4], [5, 6]] into one list with a nested comprehension and print it.",
              "starterCode": "grid = [[1, 2], [3, 4], [5, 6]]\n# TODO: write this line",
              "solution": "grid = [[1, 2], [3, 4], [5, 6]]\nprint([x for row in grid for x in row])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Flatten grid",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 3, 4, 5, 6]\n",
                  "hidden": false
                },
                {
                  "name": "Flatten grid again",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 3, 4, 5, 6]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Nested Comprehensions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-comprehensions-m2-l5",
            "slug": "python-comprehensions-m2-l5",
            "title": "Rewriting Loops as Comprehensions",
            "concept": "A simple loop that builds a list \u2014 create an empty list, append a transformed value for each item \u2014 rewrites directly as a comprehension. The rewrite is shorter and usually faster, but only when the loop body is a single append.",
            "syntax": "result = [f(x) for x in xs]",
            "exampleCode": "nums = [1, 2, 3]\nresult = []\nfor n in nums:\n    result.append(n * 2)\nprint(result)\nprint([n * 2 for n in nums])",
            "exampleLanguage": "python",
            "mistake": "Rewriting a loop with side effects as a comprehension, which collects useless values.",
            "bug": {
              "prompt": "Find the bug: this loop version prints [2, 4, 6] but the comprehension version prints [None, None, None].",
              "buggyCode": "nums = [1, 2, 3]\nprint([print(n * 2) for n in nums])",
              "fixedCode": "nums = [1, 2, 3]\nprint([n * 2 for n in nums])",
              "explanation": "The comprehension collects the return values of print(), which are None; the expression must be the value, not a print call."
            },
            "exercise": {
              "title": "Practise Rewriting Loops as Comprehensions",
              "type": "write-code",
              "instructions": "Read three numbers from input and print a list of their doubles, using a list comprehension.",
              "starterCode": "a = int(input())\nb = int(input())\nc = int(input())\n# TODO: write this line",
              "solution": "a = int(input())\nb = int(input())\nc = int(input())\nprint([n * 2 for n in [a, b, c]])",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "1 2 3",
                  "stdin": "1\n2\n3\n",
                  "expectedStdout": "[2, 4, 6]\n",
                  "hidden": false
                },
                {
                  "name": "5 6 7",
                  "stdin": "5\n6\n7\n",
                  "expectedStdout": "[10, 12, 14]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Rewriting Loops as Comprehensions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Comprehensions Capstone",
      "type": "write-code",
      "instructions": "Write a program that reads a sentence, counts how many times each word appears (lowercased) using a dict comprehension, then prints the sorted list of (word, count) pairs and the number of unique words.",
      "starterCode": "sentence = input()\nwords = sentence.lower().split()\ncounts = {word: words.count(word) for word in set(words)}\n# TODO: write this line\n# TODO: write this line",
      "solution": "sentence = input()\nwords = sentence.lower().split()\ncounts = {word: words.count(word) for word in set(words)}\nprint(sorted(counts.items()))\nprint(len(counts))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "the cat sat on the mat",
          "stdin": "the cat sat on the mat\n",
          "expectedStdout": "[('cat', 1), ('mat', 1), ('on', 1), ('sat', 1), ('the', 2)]\n5\n",
          "hidden": false
        },
        {
          "name": "a b a",
          "stdin": "a b a\n",
          "expectedStdout": "[('a', 2), ('b', 1)]\n2\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Comprehensions Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read input with input(), compute the result, then print it with print()."
      }
    },
    "capstone": {
      "title": "Comprehensions Capstone Project",
      "description": "A small end-to-end Python program that puts Comprehensions into practice.",
      "requirements": [
        "Use the core ideas of Comprehensions in a working Python program.",
        "Apply at least three of these skills: List comprehensions, Conditionals in comprehensions, Dict comprehensions, Set comprehensions.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Comprehensions correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-iterators-generators",
    "slug": "python-iterators-generators",
    "language": "python",
    "category": "languages",
    "title": "Iterators & Generators",
    "description": "Learn iterators, yield, generator functions, and lazy evaluation \u2014 with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "iter() and next()",
      "Iterables vs iterators",
      "The iterator protocol",
      "yield",
      "Generator functions",
      "Generator expressions",
      "Lazy evaluation",
      "itertools intro"
    ],
    "prerequisites": [
      "python-comprehensions"
    ],
    "analogy": "Learning {topic} is like learning to drink from a stream instead of carrying a bucket: you take what you need, when you need it.",
    "modules": [
      {
        "id": "python-iterators-generators-m1",
        "title": "Iterators & Generators Fundamentals",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-iterators-generators-m1-l1",
            "slug": "python-iterators-generators-m1-l1",
            "title": "Iterables and iter()",
            "concept": "An iterable is any object you can loop over, such as a list or a string, and iter() returns an iterator for it. The iterator hands out items one at a time and remembers where it stopped.",
            "syntax": "it = iter([1, 2, 3])",
            "exampleCode": "it = iter([1, 2, 3])\nprint(next(it))\nprint(next(it))",
            "exampleLanguage": "python",
            "mistake": "Calling iter() on a number, which raises TypeError because numbers are not iterable.",
            "bug": {
              "prompt": "Find the bug: this should print 1 then 2 but it crashes.",
              "buggyCode": "it = iter(123)\nprint(next(it))",
              "fixedCode": "it = iter([1, 2, 3])\nprint(next(it))\nprint(next(it))",
              "explanation": "An int is not iterable, so iter() fails; a list is iterable and gives an iterator."
            },
            "exercise": {
              "title": "Practise Iterables and iter()",
              "type": "write-code",
              "instructions": "Create an iterator over [10, 20, 30] with iter(), then print the first item with next().",
              "starterCode": "it = iter([10, 20, 30])\n# TODO: write this line",
              "solution": "it = iter([10, 20, 30])\nprint(next(it))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "First item",
                  "stdin": "",
                  "expectedStdout": "10\n",
                  "hidden": false
                },
                {
                  "name": "First item again",
                  "stdin": "",
                  "expectedStdout": "10\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Iterables and iter() is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-iterators-generators-m1-l2",
            "slug": "python-iterators-generators-m1-l2",
            "title": "next() and StopIteration",
            "concept": "next() returns the next item from an iterator, and raises StopIteration when there are no more items. Passing a default, next(it, None), returns the default instead of raising.",
            "syntax": "next(it, None)",
            "exampleCode": "it = iter([1])\nprint(next(it))\nprint(next(it, \"done\"))",
            "exampleLanguage": "python",
            "mistake": "Calling next() on an exhausted iterator without a default, which raises StopIteration.",
            "bug": {
              "prompt": "Find the bug: this should print done but it crashes.",
              "buggyCode": "it = iter([1])\nprint(next(it))\nprint(next(it))",
              "fixedCode": "it = iter([1])\nprint(next(it))\nprint(next(it, \"done\"))",
              "explanation": "The iterator is exhausted after the first item, so the second next() raises StopIteration; a default returns \"done\" instead."
            },
            "exercise": {
              "title": "Practise next() and StopIteration",
              "type": "write-code",
              "instructions": "Create an iterator over [5], print its item, then print next(it, \"empty\") when it is exhausted.",
              "starterCode": "it = iter([5])\nprint(next(it))\n# TODO: write this line",
              "solution": "it = iter([5])\nprint(next(it))\nprint(next(it, \"empty\"))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Exhausted iterator",
                  "stdin": "",
                  "expectedStdout": "5\nempty\n",
                  "hidden": false
                },
                {
                  "name": "Exhausted again",
                  "stdin": "",
                  "expectedStdout": "5\nempty\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "next() and StopIteration is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-iterators-generators-m1-l3",
            "slug": "python-iterators-generators-m1-l3",
            "title": "Iterables",
            "concept": "Lists, strings, tuples, sets, and dictionaries are iterable, while numbers are not. An iterator is a one-way stream: it gives each item once and then it is exhausted, unlike a list which can be looped over again and again.",
            "syntax": "iter(\"abc\")",
            "exampleCode": "it = iter(\"abc\")\nprint(next(it))\nprint(list(it))",
            "exampleLanguage": "python",
            "mistake": "Looping over an iterator twice and being surprised that the second loop finds nothing.",
            "bug": {
              "prompt": "Find the bug: this should print a, b, c twice but the second loop prints nothing.",
              "buggyCode": "it = iter([\"a\", \"b\", \"c\"])\nfor x in it:\n    print(x)\nfor x in it:\n    print(x)",
              "fixedCode": "xs = [\"a\", \"b\", \"c\"]\nfor x in xs:\n    print(x)\nfor x in xs:\n    print(x)",
              "explanation": "An iterator is exhausted after one pass; a list can be looped over as many times as you like."
            },
            "exercise": {
              "title": "Check your understanding: Iterables",
              "type": "multiple-choice",
              "instructions": "Which statement about iterables is correct?",
              "starterCode": "",
              "solution": "An iterable is an object you can loop over, and iter() returns an iterator that hands out its items one at a time.",
              "solutionExplanation": "An iterable is an object you can loop over, and iter() returns an iterator that hands out its items one at a time. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An iterable is an object you can loop over, and iter() returns an iterator that hands out its items one at a time.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Iterables from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "An iterable and an iterator are the same thing.",
                "Numbers are iterable.",
                "An iterable is an object you can loop over, and iter() returns an iterator that hands out its items one at a time.",
                "An iterator can be looped over many times."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-iterators-generators-m1-l4",
            "slug": "python-iterators-generators-m1-l4",
            "title": "Writing a Generator Function",
            "concept": "A function with yield is a generator function: calling it returns a generator, and each next() runs it until the next yield, pausing there. Generators produce values lazily, one at a time, without building a list.",
            "syntax": "def count_up(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1",
            "exampleCode": "def count_up(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1\n\nprint(list(count_up(3)))",
            "exampleLanguage": "python",
            "mistake": "Using return with a value inside a generator, which raises StopIteration with that value instead of yielding it.",
            "bug": {
              "prompt": "Find the bug: this should print [1, 2, 3] but it prints [].",
              "buggyCode": "def count_up(n):\n    i = 1\n    while i <= n:\n        return i\n        i += 1\n\nprint(list(count_up(3)))",
              "fixedCode": "def count_up(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1\n\nprint(list(count_up(3)))",
              "explanation": "return ends the generator immediately, so nothing is ever yielded; yield pauses and produces a value."
            },
            "exercise": {
              "title": "Practise Writing a Generator Function",
              "type": "write-code",
              "instructions": "Define a generator function called evens that yields the even numbers from 2 up to n, then print list(evens(6)).",
              "starterCode": "def evens(n):\n    i = 2\n    while i <= n:\n        yield i\n        i += 2\n# TODO: write this line\nprint(list(evens(6)))",
              "solution": "def evens(n):\n    i = 2\n    while i <= n:\n        yield i\n        i += 2\n\nprint(list(evens(6)))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Evens to 6",
                  "stdin": "",
                  "expectedStdout": "[2, 4, 6]\n",
                  "hidden": false
                },
                {
                  "name": "Evens to 6 again",
                  "stdin": "",
                  "expectedStdout": "[2, 4, 6]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Writing a Generator Function is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-iterators-generators-m1-l5",
            "slug": "python-iterators-generators-m1-l5",
            "title": "yield",
            "concept": "yield turns a function into a generator: calling it does not run the body at all, it only creates the generator. Each next() runs the body until the next yield, which pauses it and hands out a value.",
            "syntax": "yield value",
            "exampleCode": "def gen():\n    yield 1\n    yield 2\n\nprint(list(gen()))",
            "exampleLanguage": "python",
            "mistake": "Calling a generator function and expecting it to run, when it only creates a generator object.",
            "bug": {
              "prompt": "Find the bug: this should print 1 and 2 but it prints a generator object.",
              "buggyCode": "def gen():\n    yield 1\n    yield 2\n\nprint(gen())",
              "fixedCode": "def gen():\n    yield 1\n    yield 2\n\nprint(list(gen()))",
              "explanation": "Calling a generator function only creates the generator; list() runs it and collects the values."
            },
            "exercise": {
              "title": "Check your understanding: yield",
              "type": "multiple-choice",
              "instructions": "Which statement about yield is correct?",
              "starterCode": "",
              "solution": "yield pauses a generator function and produces a value; the next next() call resumes it just after the yield.",
              "solutionExplanation": "yield pauses a generator function and produces a value; the next next() call resumes it just after the yield. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "yield pauses a generator function and produces a value; the next next() call resumes it just after the yield.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of yield from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "yield pauses a generator function and produces a value; the next next() call resumes it just after the yield.",
                "yield ends the function permanently, like return.",
                "yield produces all values at once, like a list.",
                "A function with yield runs its body when it is called."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-iterators-generators-m2",
        "title": "Iterators & Generators in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-iterators-generators-m2-l1",
            "slug": "python-iterators-generators-m2-l1",
            "title": "Generator Expressions",
            "concept": "A generator expression (expr for item in items) is like a list comprehension with parentheses, but it produces values lazily instead of building a list. It is ideal for piping large data through sum() or max() without storing it all.",
            "syntax": "sum(n * n for n in range(5))",
            "exampleCode": "print(sum(n * n for n in range(5)))\nprint(list(n * 2 for n in [1, 2, 3]))",
            "exampleLanguage": "python",
            "mistake": "Indexing a generator expression, which fails because generators are not subscriptable.",
            "bug": {
              "prompt": "Find the bug: this should print 2 but it crashes.",
              "buggyCode": "g = (n * 2 for n in [1, 2, 3])\nprint(g[0])",
              "fixedCode": "g = (n * 2 for n in [1, 2, 3])\nprint(next(g))",
              "explanation": "Generators do not support indexing; use next() to take the first value, or list() to materialise them."
            },
            "exercise": {
              "title": "Practise Generator Expressions",
              "type": "write-code",
              "instructions": "Use a generator expression to compute the sum of the squares of 1, 2, and 3, and print the result.",
              "starterCode": "# TODO: write this line",
              "solution": "print(sum(n * n for n in [1, 2, 3]))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Sum of squares",
                  "stdin": "",
                  "expectedStdout": "14\n",
                  "hidden": false
                },
                {
                  "name": "Sum of squares again",
                  "stdin": "",
                  "expectedStdout": "14\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Generator Expressions is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-iterators-generators-m2-l2",
            "slug": "python-iterators-generators-m2-l2",
            "title": "Lazy Evaluation",
            "concept": "Lazy evaluation means values are produced only when asked for, so a generator over a million numbers uses almost no memory. It also means an infinite generator is safe, because you only ever take as many values as you need.",
            "syntax": "def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1",
            "exampleCode": "def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\ng = naturals()\nprint(next(g))\nprint(next(g))",
            "exampleLanguage": "python",
            "mistake": "Converting an infinite generator to a list, which never finishes.",
            "bug": {
              "prompt": "Find the bug: this should print the first 3 naturals but it never finishes.",
              "buggyCode": "def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\nprint(list(naturals()))",
              "fixedCode": "def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\nimport itertools\nprint(list(itertools.islice(naturals(), 3)))",
              "explanation": "list() on an infinite generator never ends; islice() takes only the first 3 values."
            },
            "exercise": {
              "title": "Practise Lazy Evaluation",
              "type": "write-code",
              "instructions": "Define an infinite generator called naturals that yields 1, 2, 3, ... and print the first 3 values using itertools.islice.",
              "starterCode": "import itertools\n\ndef naturals():\n    n = 1\n    while True:\n        yield n\n# TODO: write this line\n\nprint(list(itertools.islice(naturals(), 3)))",
              "solution": "import itertools\n\ndef naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\nprint(list(itertools.islice(naturals(), 3)))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "First 3 naturals",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 3]\n",
                  "hidden": false
                },
                {
                  "name": "First 3 naturals again",
                  "stdin": "",
                  "expectedStdout": "[1, 2, 3]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Lazy Evaluation is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-iterators-generators-m2-l3",
            "slug": "python-iterators-generators-m2-l3",
            "title": "Laziness",
            "concept": "Lazy evaluation defers work until the value is needed, which keeps memory low and lets programs work with infinite sequences. The trade-off is that a generator can only be consumed once, and its values disappear after use.",
            "syntax": "(n for n in range(10**9))",
            "exampleCode": "g = (n * n for n in range(3))\nprint(next(g))\nprint(next(g))",
            "exampleLanguage": "python",
            "mistake": "Assuming a generator expression has computed its values, when nothing has run yet.",
            "bug": {
              "prompt": "Find the bug: this should print the first square but it prints a generator object.",
              "buggyCode": "g = (n * n for n in range(3))\nprint(g)",
              "fixedCode": "g = (n * n for n in range(3))\nprint(next(g))",
              "explanation": "Creating a generator expression runs nothing; next() asks it for its first value."
            },
            "exercise": {
              "title": "Check your understanding: Laziness",
              "type": "multiple-choice",
              "instructions": "Which statement about lazy evaluation is correct?",
              "starterCode": "",
              "solution": "A generator produces each value only when it is requested, so it uses little memory even for huge sequences.",
              "solutionExplanation": "A generator produces each value only when it is requested, so it uses little memory even for huge sequences. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A generator produces each value only when it is requested, so it uses little memory even for huge sequences.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Laziness from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A generator computes all its values as soon as it is created.",
                "A generator always uses more memory than a list.",
                "Lazy evaluation means values are computed twice.",
                "A generator produces each value only when it is requested, so it uses little memory even for huge sequences."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-iterators-generators-m2-l4",
            "slug": "python-iterators-generators-m2-l4",
            "title": "itertools.count and islice",
            "concept": "itertools.count() is an infinite counter, and islice() takes a slice of any iterator, including an infinite one. Together they are the standard way to take the first few values of a stream.",
            "syntax": "itertools.islice(itertools.count(1), 3)",
            "exampleCode": "import itertools\nprint(list(itertools.islice(itertools.count(10, 2), 3)))",
            "exampleLanguage": "python",
            "mistake": "Forgetting that islice() stops at the given count, and expecting it to return the whole sequence.",
            "bug": {
              "prompt": "Find the bug: this should print [10, 12, 14] but it prints [10, 12, 14, 16, 18].",
              "buggyCode": "import itertools\nprint(list(itertools.islice(itertools.count(10, 2), 5)))",
              "fixedCode": "import itertools\nprint(list(itertools.islice(itertools.count(10, 2), 3)))",
              "explanation": "islice(..., 5) takes five values; islice(..., 3) takes three."
            },
            "exercise": {
              "title": "Practise itertools.count and islice",
              "type": "write-code",
              "instructions": "Use itertools.count starting at 5 with a step of 5, and islice to print the first 4 values as a list.",
              "starterCode": "import itertools\n# TODO: write this line",
              "solution": "import itertools\nprint(list(itertools.islice(itertools.count(5, 5), 4)))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Count by 5",
                  "stdin": "",
                  "expectedStdout": "[5, 10, 15, 20]\n",
                  "hidden": false
                },
                {
                  "name": "Count by 5 again",
                  "stdin": "",
                  "expectedStdout": "[5, 10, 15, 20]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "itertools.count and islice is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-iterators-generators-m2-l5",
            "slug": "python-iterators-generators-m2-l5",
            "title": "A Fibonacci Generator",
            "concept": "The Fibonacci sequence is a classic generator: each value is the sum of the previous two, and yield produces them one at a time without storing the whole sequence. It shows how a generator keeps its state between calls.",
            "syntax": "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b",
            "exampleCode": "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nimport itertools\nprint(list(itertools.islice(fib(), 6)))",
            "exampleLanguage": "python",
            "mistake": "Updating a and b in two separate statements, which breaks the swap.",
            "bug": {
              "prompt": "Find the bug: this should print [0, 1, 1, 2, 3, 5] but it prints [0, 1, 1, 1, 1, 1].",
              "buggyCode": "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a = b\n        b = a + b\n\nimport itertools\nprint(list(itertools.islice(fib(), 6)))",
              "fixedCode": "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nimport itertools\nprint(list(itertools.islice(fib(), 6)))",
              "explanation": "a = b then b = a + b uses the new a, so b never changes; the tuple assignment a, b = b, a + b updates both at once."
            },
            "exercise": {
              "title": "Practise A Fibonacci Generator",
              "type": "write-code",
              "instructions": "Define a Fibonacci generator and print the first 6 Fibonacci numbers as a list, using itertools.islice.",
              "starterCode": "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n# TODO: write this line\nprint(list(itertools.islice(fib(), 6)))",
              "solution": "def fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nimport itertools\nprint(list(itertools.islice(fib(), 6)))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "First 6 Fibonacci",
                  "stdin": "",
                  "expectedStdout": "[0, 1, 1, 2, 3, 5]\n",
                  "hidden": false
                },
                {
                  "name": "First 6 Fibonacci again",
                  "stdin": "",
                  "expectedStdout": "[0, 1, 1, 2, 3, 5]\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Fibonacci Generator is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Iterators & Generators Capstone",
      "type": "write-code",
      "instructions": "Write a generator function called error_lines that takes a filename and yields each line containing \"ERROR\", stripped of whitespace. Create app2.log with four lines \u2014 two INFO and two ERROR \u2014 then print the list of error lines.",
      "starterCode": "def error_lines(filename):\n    with open(filename) as f:\n        for line in f:\n            if \"ERROR\" in line:\n                yield line.strip()\n\nwith open(\"app2.log\", \"w\") as f:\n    f.write(\"INFO ok\\n\")\n    f.write(\"ERROR bad\\n\")\n    f.write(\"INFO ok\\n\")\n# TODO: write this line\n\nprint(list(error_lines(\"app2.log\")))",
      "solution": "def error_lines(filename):\n    with open(filename) as f:\n        for line in f:\n            if \"ERROR\" in line:\n                yield line.strip()\n\nwith open(\"app2.log\", \"w\") as f:\n    f.write(\"INFO ok\\n\")\n    f.write(\"ERROR bad\\n\")\n    f.write(\"INFO ok\\n\")\n    f.write(\"ERROR worse\\n\")\n\nprint(list(error_lines(\"app2.log\")))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Error lines",
          "stdin": "",
          "expectedStdout": "['ERROR bad', 'ERROR worse']\n",
          "hidden": false
        },
        {
          "name": "Error lines again",
          "stdin": "",
          "expectedStdout": "['ERROR bad', 'ERROR worse']\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Iterators & Generators Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
        "structure": "Write a short program that prints exactly what the instructions ask for."
      }
    },
    "capstone": {
      "title": "Iterators & Generators Capstone Project",
      "description": "A small end-to-end Python program that puts Iterators & Generators into practice.",
      "requirements": [
        "Use the core ideas of Iterators & Generators in a working Python program.",
        "Apply at least three of these skills: iter() and next(), Iterables vs iterators, The iterator protocol, yield.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Iterators & Generators correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "python-decorators",
    "slug": "python-decorators",
    "language": "python",
    "category": "languages",
    "title": "Decorators",
    "description": "Learn decorators \u2014 functions that wrap functions \u2014 including @ syntax, functools.wraps, decorators with arguments, and chaining, with hands-on lessons and exercises that build working code step by step.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "Functions as values",
      "Wrapper functions",
      "@ syntax",
      "functools.wraps",
      "Decorators with arguments",
      "Timing decorator",
      "Logging decorator",
      "Chaining decorators"
    ],
    "prerequisites": [
      "python-functions"
    ],
    "analogy": "Learning {topic} is like learning to gift-wrap: the present inside stays the same, but the wrapping adds something extra.",
    "modules": [
      {
        "id": "python-decorators-m1",
        "title": "Decorators Fundamentals",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-decorators-m1-l1",
            "slug": "python-decorators-m1-l1",
            "title": "Functions as First-Class Values",
            "concept": "In Python, functions are values: you can assign them to variables, store them in lists, and pass them to other functions. This is what makes decorators and callbacks possible.",
            "syntax": "f = shout  # store the function",
            "exampleCode": "def shout(s):\n    return s.upper()\n\nf = shout\nprint(f(\"hello\"))",
            "exampleLanguage": "python",
            "mistake": "Writing f = shout() with parentheses, which calls the function instead of storing it.",
            "bug": {
              "prompt": "Find the bug: this should print HELLO but it crashes.",
              "buggyCode": "def shout(s):\n    return s.upper()\n\nf = shout()\nprint(f(\"hello\"))",
              "fixedCode": "def shout(s):\n    return s.upper()\n\nf = shout\nprint(f(\"hello\"))",
              "explanation": "shout() calls the function with no arguments and stores its result; shout without parentheses stores the function itself."
            },
            "exercise": {
              "title": "Practise Functions as First-Class Values",
              "type": "write-code",
              "instructions": "Define a function called double that returns n * 2, assign it to a variable called f, and print f(5).",
              "starterCode": "def double(n):\n    return n * 2\n\n# TODO: write this line\n# TODO: write this line",
              "solution": "def double(n):\n    return n * 2\n\nf = double\nprint(f(5))",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Double via f",
                  "stdin": "",
                  "expectedStdout": "10\n",
                  "hidden": false
                },
                {
                  "name": "Double via f again",
                  "stdin": "",
                  "expectedStdout": "10\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Functions as First-Class Values is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-decorators-m1-l2",
            "slug": "python-decorators-m1-l2",
            "title": "Writing a Simple Decorator",
            "concept": "A decorator is a function that takes a function and returns a new function, usually a wrapper that adds behaviour around the original call. The wrapper calls the original function inside, so the result is unchanged unless the decorator changes it.",
            "syntax": "def my_decorator(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper",
            "exampleCode": "def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@shout\ndef greet(name):\n    return \"hello, \" + name\n\nprint(greet(\"Ada\"))",
            "exampleLanguage": "python",
            "mistake": "Forgetting to return the wrapper from the decorator, so the decorated name becomes None.",
            "bug": {
              "prompt": "Find the bug: this should print HELLO, ADA but it crashes.",
              "buggyCode": "def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n\n@shout\ndef greet(name):\n    return \"hello, \" + name\n\nprint(greet(\"Ada\"))",
              "fixedCode": "def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@shout\ndef greet(name):\n    return \"hello, \" + name\n\nprint(greet(\"Ada\"))",
              "explanation": "The decorator must return the wrapper; without the return, greet becomes None and calling it fails."
            },
            "exercise": {
              "title": "Practise Writing a Simple Decorator",
              "type": "write-code",
              "instructions": "Write a decorator called exclaim that adds \"!\" to the result of a function, apply it to a function called hi that returns \"hello\", and print hi().",
              "starterCode": "def exclaim(func):\n    def wrapper(*args, **kwargs):\n# TODO: write this line\n# TODO: write this line\n\n@exclaim\ndef hi():\n# TODO: write this line\n\nprint(hi())",
              "solution": "def exclaim(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\n@exclaim\ndef hi():\n    return \"hello\"\n\nprint(hi())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Exclaim hi",
                  "stdin": "",
                  "expectedStdout": "hello!\n",
                  "hidden": false
                },
                {
                  "name": "Exclaim hi again",
                  "stdin": "",
                  "expectedStdout": "hello!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Writing a Simple Decorator is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-decorators-m1-l3",
            "slug": "python-decorators-m1-l3",
            "title": "Decorators",
            "concept": "A decorator wraps a function with extra behaviour \u2014 logging, timing, caching, or access control \u2014 without changing the function's own code. The @ syntax applies the decorator at definition time.",
            "syntax": "@my_decorator\ndef f():",
            "exampleCode": "def double_result(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@double_result\ndef five():\n    return 5\n\nprint(five())",
            "exampleLanguage": "python",
            "mistake": "Applying a decorator to a function and then calling the original name, expecting the undecorated behaviour.",
            "bug": {
              "prompt": "Find the bug: this should print 10 but it prints 5.",
              "buggyCode": "def double_result(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\ndef five():\n    return 5\n\nprint(five())",
              "fixedCode": "def double_result(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@double_result\ndef five():\n    return 5\n\nprint(five())",
              "explanation": "Without the @ line the decorator is never applied, so five() returns 5; the @ applies it."
            },
            "exercise": {
              "title": "Check your understanding: Decorators",
              "type": "multiple-choice",
              "instructions": "Which statement about decorators is correct?",
              "starterCode": "",
              "solution": "A decorator is a function that takes a function and returns a new function, usually a wrapper around the original.",
              "solutionExplanation": "A decorator is a function that takes a function and returns a new function, usually a wrapper around the original. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A decorator is a function that takes a function and returns a new function, usually a wrapper around the original.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Decorators from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "A decorator changes a function's code in place.",
                "A decorator can only be used on classes.",
                "A decorator is a function that takes a function and returns a new function, usually a wrapper around the original.",
                "A decorator runs the function it decorates immediately."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "python-decorators-m1-l4",
            "slug": "python-decorators-m1-l4",
            "title": "The @ Syntax",
            "concept": "@decorator above a def is shorthand for name = decorator(name) after the definition. It runs at definition time, so the decorated function is the wrapper from the moment the module loads.",
            "syntax": "@decorator\ndef f():",
            "exampleCode": "def tag(func):\n    def wrapper(*args, **kwargs):\n        return \"<b>\" + func(*args, **kwargs) + \"</b>\"\n    return wrapper\n\n@tag\ndef hi():\n    return \"hello\"\n\nprint(hi())",
            "exampleLanguage": "python",
            "mistake": "Putting the @ line after the def, which is a syntax error.",
            "bug": {
              "prompt": "Find the bug: this should print <b>hello</b> but it is a syntax error.",
              "buggyCode": "def hi():\n    return \"hello\"\n@tag\nprint(hi())",
              "fixedCode": "def tag(func):\n    def wrapper(*args, **kwargs):\n        return \"<b>\" + func(*args, **kwargs) + \"</b>\"\n    return wrapper\n\n@tag\ndef hi():\n    return \"hello\"\n\nprint(hi())",
              "explanation": "A decorator must come directly before the def it decorates; placing it after the function is a syntax error."
            },
            "exercise": {
              "title": "Practise The @ Syntax",
              "type": "write-code",
              "instructions": "Write a decorator called stars that wraps a function's result in \"**\", apply it to a function called word that returns \"hi\", and print word().",
              "starterCode": "def stars(func):\n    def wrapper(*args, **kwargs):\n# TODO: write this line\n# TODO: write this line\n\n@stars\ndef word():\n# TODO: write this line\n\nprint(word())",
              "solution": "def stars(func):\n    def wrapper(*args, **kwargs):\n        return \"**\" + func(*args, **kwargs) + \"**\"\n    return wrapper\n\n@stars\ndef word():\n    return \"hi\"\n\nprint(word())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Stars word",
                  "stdin": "",
                  "expectedStdout": "**hi**\n",
                  "hidden": false
                },
                {
                  "name": "Stars word again",
                  "stdin": "",
                  "expectedStdout": "**hi**\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The @ Syntax is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-decorators-m1-l5",
            "slug": "python-decorators-m1-l5",
            "title": "@ Placement",
            "concept": "The @ line sits directly above the def and applies the decorator when the function is defined. Several decorators can stack, and they apply from the bottom up.",
            "syntax": "@a\n@b\ndef f():",
            "exampleCode": "def add_bang(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\n@add_bang\ndef hi():\n    return \"hello\"\n\nprint(hi())",
            "exampleLanguage": "python",
            "mistake": "Stacking decorators in the wrong order and getting the wrappers applied backwards.",
            "bug": {
              "prompt": "Find the bug: this should print **hello!** but it prints **hello**!.",
              "buggyCode": "def bang(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\ndef stars(func):\n    def wrapper(*args, **kwargs):\n        return \"**\" + func(*args, **kwargs) + \"**\"\n    return wrapper\n\n@bang\n@stars\ndef hi():\n    return \"hello\"\n\nprint(hi())",
              "fixedCode": "def bang(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\ndef stars(func):\n    def wrapper(*args, **kwargs):\n        return \"**\" + func(*args, **kwargs) + \"**\"\n    return wrapper\n\n@stars\n@bang\ndef hi():\n    return \"hello\"\n\nprint(hi())",
              "explanation": "Decorators apply from the bottom up, so @bang on top runs last; putting @stars on top makes it run last and wrap the bang."
            },
            "exercise": {
              "title": "Check your understanding: @ Placement",
              "type": "multiple-choice",
              "instructions": "Which statement about the @ syntax is correct?",
              "starterCode": "",
              "solution": "@decorator above a def is shorthand for name = decorator(name) after the definition.",
              "solutionExplanation": "@decorator above a def is shorthand for name = decorator(name) after the definition. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "@decorator above a def is shorthand for name = decorator(name) after the definition.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of @ Placement from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "@decorator above a def is shorthand for name = decorator(name) after the definition.",
                "@decorator must come after the def it decorates.",
                "The @ line runs the function immediately.",
                "@decorator only works on functions with no arguments."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "python-decorators-m2",
        "title": "Decorators in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "python-decorators-m2-l1",
            "slug": "python-decorators-m2-l1",
            "title": "Preserving Metadata with wraps",
            "concept": "functools.wraps copies the wrapped function's name, docstring, and other metadata onto the wrapper, so the decorated function still looks like itself. Without it, help() and debugging tools show the wrapper's details instead.",
            "syntax": "from functools import wraps",
            "exampleCode": "from functools import wraps\n\ndef tag(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@tag\ndef greet():\n    \"\"\"Say hello.\"\"\"\n    return \"hello\"\n\nprint(greet.__name__)\nprint(greet.__doc__)",
            "exampleLanguage": "python",
            "mistake": "Forgetting @wraps, so the decorated function's __name__ becomes \"wrapper\".",
            "bug": {
              "prompt": "Find the bug: this should print greet but it prints wrapper.",
              "buggyCode": "def tag(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@tag\ndef greet():\n    return \"hello\"\n\nprint(greet.__name__)",
              "fixedCode": "from functools import wraps\n\ndef tag(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@tag\ndef greet():\n    return \"hello\"\n\nprint(greet.__name__)",
              "explanation": "Without @wraps, the wrapper keeps its own name, \"wrapper\"; @wraps copies the original function's name onto it."
            },
            "exercise": {
              "title": "Practise Preserving Metadata with wraps",
              "type": "write-code",
              "instructions": "Write a decorator that uses @wraps, apply it to a function called my_func, and print my_func.__name__.",
              "starterCode": "from functools import wraps\n\ndef tag(func):\n    @wraps(func)\n# TODO: write this line\n        return func(*args, **kwargs)\n    return wrapper\n\n@tag\n# TODO: write this line\n    return \"done\"\n# TODO: write this line\nprint(my_func.__name__)",
              "solution": "from functools import wraps\n\ndef tag(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@tag\ndef my_func():\n    return \"done\"\n\nprint(my_func.__name__)",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Preserve name",
                  "stdin": "",
                  "expectedStdout": "my_func\n",
                  "hidden": false
                },
                {
                  "name": "Preserve name again",
                  "stdin": "",
                  "expectedStdout": "my_func\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Preserving Metadata with wraps is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-decorators-m2-l2",
            "slug": "python-decorators-m2-l2",
            "title": "Decorators with Arguments",
            "concept": "A decorator that takes arguments is a function returning a decorator: the outer function receives the arguments and returns the real decorator, which then wraps the function. The @ line calls the outer function first.",
            "syntax": "@repeat(3)\ndef f():",
            "exampleCode": "def repeat(times):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            result = None\n            for _ in range(times):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef hi():\n    return \"hello\"\n\nprint(hi())",
            "exampleLanguage": "python",
            "mistake": "Forgetting the extra level of nesting, so the decorator receives the function where it expected an argument.",
            "bug": {
              "prompt": "Find the bug: this should print hello but it crashes.",
              "buggyCode": "def repeat(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@repeat(3)\ndef hi():\n    return \"hello\"\n\nprint(hi())",
              "fixedCode": "def repeat(times):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            return func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef hi():\n    return \"hello\"\n\nprint(hi())",
              "explanation": "@repeat(3) calls repeat(3) first, so repeat must take the argument and return a decorator; a plain decorator receives the function, not the number."
            },
            "exercise": {
              "title": "Practise Decorators with Arguments",
              "type": "write-code",
              "instructions": "Write a decorator factory called add_suffix that takes a suffix and returns a decorator appending it. Apply @add_suffix(\"!\") to a function called word that returns \"hi\", and print word().",
              "starterCode": "def add_suffix(suffix):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n# TODO: write this line\n# TODO: write this line\n    return decorator\n\n@add_suffix(\"!\")\ndef word():\n# TODO: write this line\n\nprint(word())",
              "solution": "def add_suffix(suffix):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            return func(*args, **kwargs) + suffix\n        return wrapper\n    return decorator\n\n@add_suffix(\"!\")\ndef word():\n    return \"hi\"\n\nprint(word())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Add suffix",
                  "stdin": "",
                  "expectedStdout": "hi!\n",
                  "hidden": false
                },
                {
                  "name": "Add suffix again",
                  "stdin": "",
                  "expectedStdout": "hi!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Decorators with Arguments is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-decorators-m2-l3",
            "slug": "python-decorators-m2-l3",
            "title": "wraps",
            "concept": "functools.wraps is a decorator for wrappers that copies __name__, __doc__, and other metadata from the wrapped function. It keeps debugging, help(), and stack traces showing the real function.",
            "syntax": "@wraps(func)",
            "exampleCode": "from functools import wraps\n\ndef tag(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@tag\ndef greet():\n    \"\"\"Say hello.\"\"\"\n    return \"hello\"\n\nprint(greet.__doc__)",
            "exampleLanguage": "python",
            "mistake": "Using @wraps on the outer decorator function instead of on the wrapper.",
            "bug": {
              "prompt": "Find the bug: this should print Say hello. but it prints None.",
              "buggyCode": "def tag(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@tag\ndef greet():\n    \"\"\"Say hello.\"\"\"\n    return \"hello\"\n\nprint(greet.__doc__)",
              "fixedCode": "from functools import wraps\n\ndef tag(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@tag\ndef greet():\n    \"\"\"Say hello.\"\"\"\n    return \"hello\"\n\nprint(greet.__doc__)",
              "explanation": "Without @wraps, the wrapper's __doc__ is None; @wraps(func) copies the original docstring onto the wrapper."
            },
            "exercise": {
              "title": "Check your understanding: wraps",
              "type": "multiple-choice",
              "instructions": "Which statement about functools.wraps is correct?",
              "starterCode": "",
              "solution": "@wraps copies the wrapped function's name, docstring, and module onto the wrapper.",
              "solutionExplanation": "@wraps copies the wrapped function's name, docstring, and module onto the wrapper. The other options are false: they contradict how Python actually works.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "@wraps copies the wrapped function's name, docstring, and module onto the wrapper.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of wraps from the lesson: what does it actually do in a Python program?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true for all Python programs."
              },
              "options": [
                "@wraps changes what the wrapper returns.",
                "@wraps makes the wrapper run faster.",
                "@wraps is required for a decorator to work at all.",
                "@wraps copies the wrapped function's name, docstring, and module onto the wrapper."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "python-decorators-m2-l4",
            "slug": "python-decorators-m2-l4",
            "title": "A Timing Decorator",
            "concept": "A timing decorator records the time before and after the call and prints how long it took, which is how you find slow functions without changing their code. It uses time.perf_counter() for accurate measurements.",
            "syntax": "import time\nstart = time.perf_counter()",
            "exampleCode": "import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(\"took\", round(time.perf_counter() - start, 6))\n        return result\n    return wrapper\n\n@timer\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))",
            "exampleLanguage": "python",
            "mistake": "Forgetting to return the result from the wrapper, so the decorated function returns None.",
            "bug": {
              "prompt": "Find the bug: this should print 5 but it prints None.",
              "buggyCode": "import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        func(*args, **kwargs)\n        print(\"done\")\n    return wrapper\n\n@timer\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))",
              "fixedCode": "import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(\"done\")\n        return result\n    return wrapper\n\n@timer\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))",
              "explanation": "The wrapper must return the result of the call; without return, the decorated function gives back None."
            },
            "exercise": {
              "title": "Practise A Timing Decorator",
              "type": "write-code",
              "instructions": "Write a decorator called announce that prints \"calling\" before the function runs and returns its result. Apply it to a function called get_five that returns 5, and print get_five().",
              "starterCode": "def announce(func):\n    def wrapper(*args, **kwargs):\n# TODO: write this line\n# TODO: write this line\n    return wrapper\n\n@announce\n# TODO: write this line\n    return 5\n\nprint(get_five())",
              "solution": "def announce(func):\n    def wrapper(*args, **kwargs):\n        print(\"calling\")\n        return func(*args, **kwargs)\n    return wrapper\n\n@announce\ndef get_five():\n    return 5\n\nprint(get_five())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Announce five",
                  "stdin": "",
                  "expectedStdout": "calling\n5\n",
                  "hidden": false
                },
                {
                  "name": "Announce five again",
                  "stdin": "",
                  "expectedStdout": "calling\n5\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Timing Decorator is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          },
          {
            "id": "python-decorators-m2-l5",
            "slug": "python-decorators-m2-l5",
            "title": "Chaining Decorators",
            "concept": "Several decorators can stack on one function, and they apply from the bottom up: the lowest decorator wraps the function first, and each one above wraps the result. The order matters, because each wrapper sees the output of the one below it.",
            "syntax": "@a\n@b\ndef f():",
            "exampleCode": "def bang(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\ndef stars(func):\n    def wrapper(*args, **kwargs):\n        return \"**\" + func(*args, **kwargs) + \"**\"\n    return wrapper\n\n@stars\n@bang\ndef hi():\n    return \"hello\"\n\nprint(hi())",
            "exampleLanguage": "python",
            "mistake": "Stacking decorators in the wrong order and getting the wrappers applied backwards.",
            "bug": {
              "prompt": "Find the bug: this should print **hello!** but it prints **hello**!.",
              "buggyCode": "def bang(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\ndef stars(func):\n    def wrapper(*args, **kwargs):\n        return \"**\" + func(*args, **kwargs) + \"**\"\n    return wrapper\n\n@bang\n@stars\ndef hi():\n    return \"hello\"\n\nprint(hi())",
              "fixedCode": "def bang(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\ndef stars(func):\n    def wrapper(*args, **kwargs):\n        return \"**\" + func(*args, **kwargs) + \"**\"\n    return wrapper\n\n@stars\n@bang\ndef hi():\n    return \"hello\"\n\nprint(hi())",
              "explanation": "Decorators apply from the bottom up, so @bang on top runs last; putting @stars on top makes it run last and wrap the bang."
            },
            "exercise": {
              "title": "Practise Chaining Decorators",
              "type": "write-code",
              "instructions": "Apply two decorators to a function called word that returns \"hi\": one that uppercases the result and one that adds \"!\". Print word() \u2014 it should print \"HI!\".",
              "starterCode": "def upper(func):\n    def wrapper(*args, **kwargs):\n# TODO: write this line\n# TODO: write this line\n\ndef bang(func):\n    def wrapper(*args, **kwargs):\n# TODO: write this line\n# TODO: write this line\n\n@upper\n@bang\n# TODO: write this line\n    return \"hi\"\n\nprint(word())",
              "solution": "def upper(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\ndef bang(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\n@upper\n@bang\ndef word():\n    return \"hi\"\n\nprint(word())",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Chain decorators",
                  "stdin": "",
                  "expectedStdout": "HI!\n",
                  "hidden": false
                },
                {
                  "name": "Chain decorators again",
                  "stdin": "",
                  "expectedStdout": "HI!\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Chaining Decorators is the key idea here: think about what the program must produce before you write any code.",
                "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
                "structure": "Write a short program that prints exactly what the instructions ask for."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Decorators Capstone",
      "type": "write-code",
      "instructions": "Write a decorator called log_calls that prints \"calling <name>\" before calling the function, where <name> is the function's __name__. Apply it to add(a, b) and greet(name), then print add(2, 3) and greet(\"Ada\").",
      "starterCode": "def log_calls(func):\n    def wrapper(*args, **kwargs):\n# TODO: write this line\n# TODO: write this line\n    return wrapper\n\n@log_calls\n# TODO: write this line\n# TODO: write this line\n\n@log_calls\n# TODO: write this line\n# TODO: write this line\n\nprint(add(2, 3))\nprint(greet(\"Ada\"))",
      "solution": "def log_calls(func):\n    def wrapper(*args, **kwargs):\n        print(\"calling \" + func.__name__)\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_calls\ndef add(a, b):\n    return a + b\n\n@log_calls\ndef greet(name):\n    return \"hello \" + name\n\nprint(add(2, 3))\nprint(greet(\"Ada\"))",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Log calls",
          "stdin": "",
          "expectedStdout": "calling add\n5\ncalling greet\nhello Ada\n",
          "hidden": false
        },
        {
          "name": "Log calls again",
          "stdin": "",
          "expectedStdout": "calling add\n5\ncalling greet\nhello Ada\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Decorators Capstone is the key idea here: think about what the program must produce before you write any code.",
        "approach": "Work out the exact output on paper first, then write the Python code that prints it.",
        "structure": "Write a short program that prints exactly what the instructions ask for."
      }
    },
    "capstone": {
      "title": "Decorators Capstone Project",
      "description": "A small end-to-end Python program that puts Decorators into practice.",
      "requirements": [
        "Use the core ideas of Decorators in a working Python program.",
        "Apply at least three of these skills: Functions as values, Wrapper functions, @ syntax, functools.wraps.",
        "Handle input and errors correctly, with no crashes on valid or invalid input.",
        "Keep the code organised into clear functions and readable lines."
      ],
      "rubric": [
        "Program runs and demonstrates Decorators correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Errors and edge cases are handled, not ignored.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
