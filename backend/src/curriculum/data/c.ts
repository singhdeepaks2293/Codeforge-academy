import type { Course, Lesson, Exercise, Hint, MasteryAssessment, AssessmentQuestion, QuizQuestion, TestCase } from '../types.js';

const q = (question: string, options: string[], answer: number, explanation: string): QuizQuestion => ({ question, options, answer, explanation });
const tc = (name: string, stdin: string, expectedStdout: string, hidden = false): TestCase => ({ name, stdin, expectedStdout, hidden });
const h5 = (a: string, b: string, c: string, d: string, e: string): Hint[] => [
  { level: 1, title: 'Conceptual clue', content: a },
  { level: 2, title: 'Approach', content: b },
  { level: 3, title: 'Structure', content: c },
  { level: 4, title: 'Debugging guidance', content: d },
  { level: 5, title: 'Full solution', content: e },
];
const ex = (id: string, title: string, type: Exercise['type'], instructions: string, starterCode: string, solution: string, solutionExplanation: string, complexity: string, tests: TestCase[], hints: Hint[]): Exercise => ({ id, title, type, instructions, starterCode, solution, solutionExplanation, complexity, tests, hints });
const aq = (id: string, kind: AssessmentQuestion['kind'], topic: string, question: string, options: string[], answer: number, explanation: string, code?: string): AssessmentQuestion => ({ id, kind, topic, question, code, options, answer, explanation });

export const C_COURSE: Course = {
  id: 'c',
  slug: 'c',
  language: 'c',
  title: 'C Programming: From First Program to Systems',
  description: 'Learn C from the ground up: variables, control flow, pointers, memory, files, concurrency, and systems programming, with hands-on projects at every stage.',
  difficulty: 'All levels',
  estimatedHours: 60,
  skills: ['C programming', 'Pointers and memory management', 'Data structures', 'File I/O', 'Systems programming', 'Debugging', 'Bit manipulation', 'Concurrency', 'Networking', 'Performance optimization'],
  prerequisites: [],
  modules: [
    {
      id: 'c-m1',
      title: 'Introduction to C',
      description: 'What C is, why it matters, and how to write, compile, and run your first program.',
      level: 'beginner',
      order: 1,
      lessons: [
        {
          id: 'c-m1-l1',
          slug: 'hello-c-first-program',
          title: 'Hello, C: Your First Program',
          objectives: ['Explain what C is and where it is used', 'Write a minimal C program that prints text', 'Identify the parts of a C program: includes, main, return'],
          introduction: 'C is one of the most influential programming languages ever created. It powers operating systems, embedded devices, databases, and game engines. In this lesson you will write your first C program and understand every line of it.',
          concept: 'C was created by Dennis Ritchie at Bell Labs in the early 1970s to write the Unix operating system. It is a compiled, procedural language that gives programmers direct control over memory and hardware, which is why it remains the foundation of systems programming today. A C program is a collection of functions, and execution always begins in a special function called main. The line #include <stdio.h> pulls in the standard input/output library so you can use printf to print text. The function main returns an integer to the operating system, with 0 meaning success. Statements end with semicolons, and curly braces group statements into blocks. Because C is compiled, your source code is translated into machine code before it runs, which makes C programs fast and portable across platforms.',
          syntax: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, C!\\n");\n    return 0;\n}',
          analogy: 'A C program is like a recipe: the includes gather your ingredients, main is the first cooking step, and return 0 is putting the finished dish on the table.',
          exampleCode: `#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    printf("Welcome to CodeForge Academy.\\n");
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['The #include line brings in stdio.h, which declares printf.', 'Execution starts at main; void means it takes no arguments.', 'The first printf prints "Hello, C!" followed by a newline.', 'The second printf prints a welcome message on its own line.', 'return 0 tells the operating system the program succeeded.'],
          commonMistakes: ['Forgetting the semicolon at the end of a printf statement', 'Writing Printf with a capital P; C is case-sensitive', 'Omitting #include <stdio.h>, which causes an implicit declaration warning'],
          debuggingExercise: {
            prompt: 'This program should print "Hello, C!" but it fails to compile. Find and fix the bug.',
            buggyCode: `#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n")
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}`,
            explanation: 'Every statement in C must end with a semicolon. The printf call was missing its semicolon, so the compiler reports a syntax error on the next line.'
          },
          miniChallenge: 'Modify the program to print your name and your favourite number on two separate lines.',
          summary: 'You wrote your first C program and learned how main, #include, printf, and return 0 fit together. C is a compiled language, so source code becomes machine code before it runs. Next you will learn how the compiler turns your code into a runnable program.',
          knowledgeCheck: [
            q('What does return 0 in main() signal to the operating system?', ['The program failed', 'The program succeeded', 'The program printed nothing', 'The program needs input'], 1, 'By convention, returning 0 from main means success; a non-zero value signals an error.'),
            q('Why do we write #include <stdio.h> at the top of the program?', ['To make the program run faster', 'To declare printf and other I/O functions', 'To name the program', 'To print the program source'], 1, 'stdio.h is the standard I/O header; it declares printf so the compiler knows how to call it.')
          ],
          exercises: [
            ex('c-m1-l1-e1', 'Print a greeting', 'write-code', 'Write a program that prints exactly "Welcome to C" followed by a newline. Use printf and return 0 from main.',
              '#include <stdio.h>\n\nint main(void) {\n    // print "Welcome to C" here\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    printf("Welcome to C\\n");\n    return 0;\n}',
              'printf with the string "Welcome to C\\n" prints the greeting and a newline; return 0 ends main successfully.',
              'O(1)', [tc('prints greeting', '', 'Welcome to C')], h5(
                'printf prints a string to the screen; you need the stdio.h header to use it.',
                'Include stdio.h, write main, and call printf with your message inside double quotes.',
                'int main(void) { printf("Welcome to C\\n"); return 0; }',
                'If the compiler says printf is undeclared, check the #include line; if it says expected semicolon, add ; after the call.',
                'Solution: #include <stdio.h> then int main(void) { printf("Welcome to C\\n"); return 0; }. The \\n moves the cursor to a new line.'))
          ]
        },
        {
          id: 'c-m1-l2',
          slug: 'compiling-and-running',
          title: 'Compiling and Running C Programs',
          objectives: ['Describe the four stages of compilation', 'Compile a C program with gcc and run it', 'Read and fix common compiler errors and warnings'],
          introduction: 'Unlike interpreted languages, C source code must be translated into machine code before it runs. This lesson walks through preprocessing, compilation, assembly, and linking, and shows you how to drive the whole pipeline with gcc.',
          concept: 'A C compiler turns human-readable source into an executable in four stages. The preprocessor handles lines starting with #, such as #include, which pastes header contents into your file, and #define, which replaces macros. The compiler then translates the preprocessed code into assembly language, a low-level text form close to machine instructions. The assembler converts assembly into object code, a binary file with machine instructions but unresolved references. Finally the linker combines your object files with library code, such as printf from the C standard library, and produces the finished executable. The gcc driver runs all four stages with one command: gcc hello.c -o hello. Adding -Wall -Wextra turns on warnings that catch many beginner mistakes, and -g adds debug information for use with a debugger.',
          syntax: 'gcc hello.c -o hello\n./hello\ngcc -Wall -Wextra -g hello.c -o hello',
          analogy: 'Compiling is like publishing a book: preprocessing gathers the chapters, compiling translates the draft, assembling prints the pages, and linking binds everything into a finished book.',
          exampleCode: `#include <stdio.h>

int main(void) {
    printf("Compiled and running!\\n");
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Save the code as hello.c in a folder.', 'Run gcc hello.c -o hello to compile it.', 'If there are errors, read the first one, fix the line it names, and recompile.', 'Run ./hello to execute the program.', 'Recompile with -Wall -Wextra to see helpful warnings.'],
          commonMistakes: ['Running gcc hello.c without -o and then looking for a file called hello instead of a.out', 'Ignoring warnings, which often point at real bugs', 'Trying to run the .c source file directly instead of the compiled executable'],
          debuggingExercise: {
            prompt: 'The command gcc hello.c -o hello fails with "hello.c: No such file or directory". What is wrong and how do you fix it?',
            buggyCode: `$ gcc hello.c -o hello
gcc: error: hello.c: No such file or directory`,
            fixedCode: `$ ls
hello.c
$ gcc hello.c -o hello
$ ./hello`,
            explanation: 'The compiler could not find hello.c in the current directory. The fix is to change into the directory where the file lives (or pass the correct path) before compiling.'
          },
          miniChallenge: 'Compile a program with -Wall -Wextra and fix every warning the compiler reports.',
          summary: 'You learned the four compilation stages and how gcc drives them, plus how to read compiler errors. Warnings are your friends: they catch bugs before the program ever runs. Next module, you will start storing data in variables.',
          knowledgeCheck: [
            q('Which stage combines object files with library code into an executable?', ['Preprocessing', 'Compilation', 'Assembly', 'Linking'], 3, 'The linker resolves references like printf and produces the final executable.'),
            q('What does gcc produce if you run gcc hello.c with no -o flag?', ['hello', 'a.out', 'hello.exe', 'Nothing'], 1, 'By default gcc names the output a.out on Unix-like systems.')
          ],
          exercises: [
            ex('c-m1-l2-e1', 'Compile-time arithmetic', 'write-code', 'Write a program that prints the value of 6 * 7 on its own line. The program takes no input.',
              '#include <stdio.h>\n\nint main(void) {\n    // print 6 * 7\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    printf("%d\\n", 6 * 7);\n    return 0;\n}',
              'printf with %d prints the integer result of 6 * 7, which is 42.',
              'O(1)', [tc('prints 42', '', '42')], h5(
                'printf needs a format specifier for numbers; %d prints an integer.',
                'Pass the expression 6 * 7 as the second argument to printf.',
                'printf("%d\\n", 6 * 7);',
                'If you see a warning about too few arguments, check that the format string and the value are both present.',
                'Solution: printf("%d\\n", 6 * 7); prints 42. %d is the integer format specifier.'))
          ]
        }
      ]
    },
    {
      id: 'c-m2',
      title: 'Variables and Data Types',
      description: 'Declaring variables, choosing the right integer and floating-point types, and understanding type sizes and conversions.',
      level: 'beginner',
      order: 2,
      lessons: [
        {
          id: 'c-m2-l1',
          slug: 'variables-and-int',
          title: 'Variables and the int Type',
          objectives: ['Declare and initialize variables', 'Use int arithmetic and assignment', 'Explain what a variable is in memory'],
          introduction: 'Programs need to remember things: scores, counts, ages. Variables give names to storage locations in memory. This lesson covers declaring variables, giving them values, and doing arithmetic with ints.',
          concept: 'A variable is a named region of memory that holds a value of a specific type. Declaring int score; reserves space for one integer and associates the name score with it. Initialization gives the variable its first value at declaration, as in int score = 0;, while assignment with = changes the value later. The = operator in C means assignment, not mathematical equality. Integer arithmetic with + - * / % follows the usual rules, except that division of two ints truncates toward zero, so 7 / 2 is 3, not 3.5. The remainder operator % gives what is left over: 7 % 2 is 1. Variables must be declared before use, and using an uninitialized variable reads whatever garbage was already in that memory, which is a classic source of bugs.',
          syntax: 'int score = 0;\nint total = 10 + 5;\nint remainder = 7 % 2;\nscore = score + 1;\nscore += 1;',
          analogy: 'A variable is like a labelled box on a shelf: the label is the name, the box size is the type, and you can take the old item out and put a new one in at any time.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int apples = 12;
    int eaten = 5;
    int left = apples - eaten;
    printf("Apples left: %d\\n", left);
    printf("Each person gets %d apples\\n", apples / 4);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare apples as 12 and eaten as 5.', 'Compute left as apples minus eaten, which is 7.', 'Print the number of apples left.', 'Divide 12 by 4 to show integer division gives 3.', 'Return 0 to end the program.'],
          commonMistakes: ['Using a variable before assigning it a value', 'Expecting 7 / 2 to be 3.5 when both operands are ints', 'Writing == when you mean assignment, or = when you mean comparison'],
          debuggingExercise: {
            prompt: 'This program should print 10, but it prints a garbage number. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int total;
    printf("%d\\n", total + 10);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int total = 0;
    printf("%d\\n", total + 10);
    return 0;
}`,
            explanation: 'total was declared but never initialized, so it held whatever garbage was in memory. Initializing it to 0 makes total + 10 reliably equal 10.'
          },
          miniChallenge: 'Write a program that stores your age in a variable and prints how old you will be in 10 years.',
          summary: 'Variables name typed storage in memory; int holds whole numbers and its division truncates. Always initialize variables before use. Next you will meet floating-point numbers, characters, and the sizes of each type.',
          knowledgeCheck: [
            q('What is the value of 7 / 2 in C when both operands are int?', ['3.5', '3', '4', '2'], 1, 'Integer division truncates toward zero, so 7 / 2 is 3.'),
            q('What does int x = 5; do?', ['Compares x with 5', 'Declares x as an int and initializes it to 5', 'Prints 5', 'Creates a function called x'], 1, 'The declaration reserves an int and the = gives it the initial value 5.')
          ],
          exercises: [
            ex('c-m2-l1-e1', 'Double a number', 'write-code', 'Read one integer from input and print twice its value. Input: a single integer. Output: the doubled value on its own line.',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n, print 2 * n\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", 2 * n);\n    return 0;\n}',
              'scanf reads the integer into n; printf prints 2 * n.',
              'O(1)', [tc('double 21', '21\n', '42'), tc('double negative', '-5\n', '-10', true)], h5(
                'scanf with %d reads an integer; &n gives scanf the address to store it in.',
                'Read n with scanf, then print 2 * n with printf and %d.',
                'scanf("%d", &n); printf("%d\\n", 2 * n);',
                'If the output is 0 or garbage, check you passed &n (with the ampersand) to scanf.',
                'Solution: scanf("%d", &n); printf("%d\\n", 2 * n); For input 21 the output is 42.'))
          ]
        },
        {
          id: 'c-m2-l2',
          slug: 'float-char-type-sizes',
          title: 'Floating-Point, Characters, and Type Sizes',
          objectives: ['Use float and double for fractional numbers', 'Store and print characters with char', 'Use sizeof to inspect type sizes and choose the right type'],
          introduction: 'Not all numbers are whole, and not all data is numeric. This lesson introduces float and double for fractional values, char for single characters, and sizeof for discovering how much memory each type uses.',
          concept: 'C offers several numeric types because different values need different ranges and precision. float stores a single-precision floating-point number, roughly 7 decimal digits, while double stores a double-precision number with about 15 digits and is the default choice for fractional math. A char holds a single character, stored as its numeric code, so char grade = \'A\'; stores the number 65. The sizeof operator returns how many bytes a type or variable occupies, for example sizeof(int) is usually 4 and sizeof(double) is 8, though exact sizes depend on the platform. Integer types also come in short, long, and unsigned variants that trade range for memory. When you mix types, C converts values implicitly: 5 / 2.0 is 2.5 because the int 5 is promoted to double. Choosing the smallest type that fits keeps memory use low, but using too small a type causes overflow, where a value wraps around instead of growing.',
          syntax: 'double price = 9.99;\nfloat ratio = 0.5f;\nchar grade = \'A\';\nprintf("%zu\\n", sizeof(int));\nprintf("%.2f\\n", price);',
          analogy: 'Numeric types are like containers: a shot glass (char), a mug (float), and a jug (double) all hold liquid, but only the jug holds a lot without spilling.',
          exampleCode: `#include <stdio.h>

int main(void) {
    double price = 9.99;
    char grade = 'A';
    printf("Price: %.2f\\n", price);
    printf("Grade: %c\\n", grade);
    printf("int: %zu bytes, double: %zu bytes\\n", sizeof(int), sizeof(double));
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare price as a double and grade as the character A.', 'Print price with two decimal places using %.2f.', 'Print grade with %c, the character format.', 'Print the sizes of int and double with %zu.', 'Notice that sizeof results depend on the platform.'],
          commonMistakes: ['Using %d to print a double, which prints garbage', 'Forgetting that float literals need an f suffix to avoid double conversion warnings', 'Assuming char is always signed; on some platforms it is unsigned'],
          debuggingExercise: {
            prompt: 'This program should print 9.99 but prints 0.00. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    double price = 9.99;
    printf("%d\\n", price);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    double price = 9.99;
    printf("%.2f\\n", price);
    return 0;
}`,
            explanation: '%d expects an int, but price is a double, so printf reads the wrong bytes. Use %f or %.2f for floating-point values.'
          },
          miniChallenge: 'Print the sizes of char, int, float, double, and long on your machine using sizeof.',
          summary: 'You met double, float, and char, and learned that sizeof reveals each type\'s memory footprint. Format specifiers must match the type: %d for int, %f for double, %c for char. Next you will read input from the keyboard with scanf.',
          knowledgeCheck: [
            q('Which format specifier prints a double with two decimal places?', ['%d', '%c', '%.2f', '%s'], 2, '%.2f prints a floating-point value rounded to two decimal places.'),
            q('What does sizeof(int) return?', ['The value stored in an int', 'The number of bytes an int occupies', 'The largest possible int', 'The number of ints in memory'], 1, 'sizeof yields the size in bytes of a type or expression.')
          ],
          exercises: [
            ex('c-m2-l2-e1', 'Celsius to Fahrenheit', 'write-code', 'Read a temperature in Celsius as a double and print the Fahrenheit equivalent with two decimal places. Formula: F = C * 9 / 5 + 32.',
              '#include <stdio.h>\n\nint main(void) {\n    double c;\n    // read c, print Fahrenheit with 2 decimals\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    double c;\n    scanf("%lf", &c);\n    printf("%.2f\\n", c * 9.0 / 5.0 + 32.0);\n    return 0;\n}',
              'scanf with %lf reads a double; the formula converts it and %.2f prints two decimals.',
              'O(1)', [tc('0C to 32F', '0\n', '32.00'), tc('100C to 212F', '100\n', '212.00', true)], h5(
                'Use %lf in scanf for a double, and %.2f in printf for two decimal places.',
                'Read c, apply F = C * 9 / 5 + 32 using floating-point constants like 9.0.',
                'scanf("%lf", &c); printf("%.2f\\n", c * 9.0 / 5.0 + 32.0);',
                'If 0C prints 32.00 but 100C prints 212.00, the formula is right; if you get 32.00 for both, check the formula uses c.',
                'Solution: scanf("%lf", &c); printf("%.2f\\n", c * 9.0 / 5.0 + 32.0); Use 9.0/5.0 so the division stays floating-point.'))
          ]
        }
      ]
    },
    {
      id: 'c-m3',
      title: 'Input and Output',
      description: 'Reading input with scanf, printing formatted output with printf, and handling input safely.',
      level: 'beginner',
      order: 3,
      lessons: [
        {
          id: 'c-m3-l1',
          slug: 'scanf-printf',
          title: 'Reading Input with scanf and Printing with printf',
          objectives: ['Read integers, doubles, and characters with scanf', 'Use format specifiers correctly', 'Print aligned and formatted output with printf'],
          introduction: 'Programs become useful when they interact with the user. This lesson teaches scanf for reading keyboard input and the full range of printf format specifiers for producing clean, readable output.',
          concept: 'scanf reads formatted input from the keyboard and stores it into variables. Each format specifier matches one variable: %d for int, %lf for double, %f for float, %c for a single character, and %s for a word. Crucially, scanf needs the address of each variable, written with the & operator, so it knows where to store the value; forgetting & is one of the most common beginner crashes. scanf returns the number of items it successfully read, which lets you detect bad input. printf mirrors scanf with format specifiers, and adds width and precision controls: %5d right-aligns an integer in five columns, %-5d left-aligns it, and %.2f prints two decimal places. Literal text in the format string is printed as-is, so printf("Score: %d\\n", score) mixes labels and values. A space or newline in a scanf format string skips whitespace, which is why scanf("%d %d", &a, &b) reads two numbers separated by any amount of space.',
          syntax: 'scanf("%d", &n);\nscanf("%d %lf", &n, &x);\nprintf("%5d %-10s %.2f\\n", n, name, x);',
          analogy: 'scanf is like a form with labelled boxes: each %d is a box, and &n tells the clerk exactly which box to put the answer in.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int age;
    double height;
    printf("Enter age and height: ");
    scanf("%d %lf", &age, &height);
    printf("Age: %d, Height: %.2f m\\n", age, height);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare age as int and height as double.', 'Prompt the user, then read both values with one scanf call.', 'Print them back with %d for the int and %.2f for the double.', 'Note that scanf needs &age and &height, the addresses.', 'Compile and test with input like 25 1.82.'],
          commonMistakes: ['Forgetting & before a variable in scanf', 'Using %f instead of %lf to read a double', 'Using %s with a char array that is too small, overflowing the buffer'],
          debuggingExercise: {
            prompt: 'This program crashes when the user types a number. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", n);
    printf("%d\\n", n);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\\n", n);
    return 0;
}`,
            explanation: 'scanf needs the address of n so it can write into it. Passing n instead of &n makes scanf write to address n, which is an invalid pointer and crashes the program.'
          },
          miniChallenge: 'Write a program that reads two integers and prints them in a table with columns aligned to width 6.',
          summary: 'scanf reads values into variables by address, and printf formats output with specifiers, widths, and precision. Matching specifiers to types is essential. Next you will learn to read whole lines of text safely.',
          knowledgeCheck: [
            q('What does scanf("%d", &n) return when the user types a valid integer?', ['0', '1', 'The value typed', '-1'], 1, 'scanf returns the number of items successfully read, so one valid integer gives 1.'),
            q('Which scanf specifier reads a double?', ['%d', '%f', '%lf', '%c'], 2, 'In scanf, %lf reads a double; %f reads a float.')
          ],
          exercises: [
            ex('c-m3-l1-e1', 'Add two numbers', 'write-code', 'Read two integers and print their sum on its own line.',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    // read a and b, print a + b\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a + b);\n    return 0;\n}',
              'scanf reads both ints; printf prints their sum.',
              'O(1)', [tc('3 and 4', '3 4\n', '7'), tc('negatives', '-2 8\n', '6', true)], h5(
                'scanf can read two values in one call with two %d specifiers.',
                'Declare a and b, read them with scanf("%d %d", &a, &b), then print a + b.',
                'scanf("%d %d", &a, &b); printf("%d\\n", a + b);',
                'If the sum looks wrong, check that both variables have & in scanf.',
                'Solution: scanf("%d %d", &a, &b); printf("%d\\n", a + b); Input "3 4" gives 7.'))
          ]
        },
        {
          id: 'c-m3-l2',
          slug: 'reading-lines-safely',
          title: 'Reading Whole Lines and Handling Input Safely',
          objectives: ['Read a full line with fgets', 'Strip the trailing newline from input', 'Validate input and avoid buffer overflows'],
          introduction: 'scanf stops at whitespace, so it cannot read a full name like "Ada Lovelace". This lesson introduces fgets for line input, shows how to clean up the trailing newline, and explains why checking return values keeps programs safe.',
          concept: 'fgets reads an entire line of text, including spaces, into a character array, and it stops at a newline or when the buffer is full, which makes it safe against overflow when you pass the buffer size. The newline character itself is stored in the buffer, so programs usually strip it by replacing it with a null terminator. The function returns NULL at end of input, which you should check. A common pattern is to read a line with fgets and then parse numbers from it with sscanf, which separates the risky job of reading from the job of converting. When scanf leaves a newline behind in the input buffer, a following fgets can appear to read an empty line; the fix is to consume the leftover newline first. Checking the return value of scanf tells you whether the user typed what you expected, and on failure you can print an error and exit instead of computing with garbage. Robust programs never trust input blindly.',
          syntax: 'char name[50];\nfgets(name, sizeof name, stdin);\nname[strcspn(name, "\\n")] = \'\\0\';\nsscanf(line, "%d", &n);',
          analogy: 'fgets is like a measuring cup: it takes exactly as much as the cup holds and never spills, while scanf is like pouring blindly from a jug.',
          exampleCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[50];
    printf("Enter your full name: ");
    if (fgets(name, sizeof name, stdin) == NULL) {
        return 1;
    }
    name[strcspn(name, "\\n")] = '\\0';
    printf("Hello, %s!\\n", name);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare a char array big enough for a name.', 'Read a line with fgets, passing the buffer size for safety.', 'Check for NULL, which means end of input.', 'Strip the trailing newline with strcspn.', 'Greet the user by name.'],
          commonMistakes: ['Using gets, which has no size limit and is dangerously unsafe', 'Forgetting that fgets keeps the newline', 'Mixing scanf and fgets without consuming the leftover newline'],
          debuggingExercise: {
            prompt: 'This program skips the name prompt and prints an empty greeting. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int age;
    char name[50];
    scanf("%d", &age);
    fgets(name, sizeof name, stdin);
    printf("Age %d, name %s\\n", age, name);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int age;
    char name[50];
    scanf("%d", &age);
    int c;
    while ((c = getchar()) != '\\n' && c != EOF) { }
    fgets(name, sizeof name, stdin);
    printf("Age %d, name %s\\n", age, name);
    return 0;
}`,
            explanation: 'scanf left the newline from pressing Enter in the input buffer, and fgets immediately read that empty line. Consuming characters until the newline clears the buffer first.'
          },
          miniChallenge: 'Write a program that reads a full line with fgets and prints its length using strlen.',
          summary: 'fgets reads whole lines safely, and stripping the newline makes the text clean to use. Always check return values and clear leftover input when mixing scanf and fgets. Next module: operators.',
          knowledgeCheck: [
            q('Why is fgets safer than gets?', ['It is faster', 'It takes a buffer size and cannot overflow the array', 'It reads numbers', 'It works without stdio.h'], 1, 'fgets stops at the size you give it; gets has no limit and can overflow the buffer.'),
            q('What does fgets store at the end of a line it reads?', ['Nothing', 'The newline character, if there is room', 'A space', 'A null pointer'], 1, 'fgets keeps the newline in the buffer, which is why programs usually strip it.')
          ],
          exercises: [
            ex('c-m3-l2-e1', 'Echo a line', 'write-code', 'Read one line of input with fgets and print it back exactly, without adding an extra newline. The input line will not contain a trailing newline in the test data.',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[100];\n    // read a line and print it back\n    return 0;\n}',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[100];\n    if (fgets(line, sizeof line, stdin) == NULL) return 0;\n    line[strcspn(line, "\\n")] = \'\\0\';\n    printf("%s\\n", line);\n    return 0;\n}',
              'fgets reads the line, strcspn finds and removes the newline, printf prints the text.',
              'O(n)', [tc('hello line', 'hello world\n', 'hello world'), tc('single word', 'C\n', 'C', true)], h5(
                'fgets reads a whole line including spaces; pass the buffer size to stay safe.',
                'Read with fgets, strip the trailing newline with strcspn, then print with %s.',
                'fgets(line, sizeof line, stdin); line[strcspn(line, "\\n")] = 0; printf("%s\\n", line);',
                'If you see a blank extra line in output, the newline was not stripped.',
                'Solution: fgets(line, sizeof line, stdin); line[strcspn(line, "\\n")] = 0; printf("%s\\n", line); strcspn returns the index of the newline.'))
          ]
        }
      ]
    },
    {
      id: 'c-m4',
      title: 'Operators',
      description: 'Arithmetic, relational, logical, and assignment operators, plus precedence and short-circuit evaluation.',
      level: 'beginner',
      order: 4,
      lessons: [
        {
          id: 'c-m4-l1',
          slug: 'arithmetic-assignment',
          title: 'Arithmetic and Assignment Operators',
          objectives: ['Use arithmetic operators including modulo', 'Apply compound assignment operators', 'Use increment and decrement correctly'],
          introduction: 'Operators are the verbs of C: they add, subtract, compare, and assign. This lesson covers arithmetic and assignment operators, including the tricky difference between prefix and postfix increment.',
          concept: 'C provides the arithmetic operators + - * / and % for remainder, plus compound assignments like += -= *= /= %= that combine an operation with assignment, so x += 3 means x = x + 3. The increment operator ++ adds one and -- subtracts one, but their position matters: ++x increments first and yields the new value, while x++ yields the old value and increments afterwards. In a statement on its own the difference does not matter, but inside a larger expression it changes the result, which is why experienced programmers keep ++ and -- in separate statements. Operator precedence decides the order of evaluation: multiplication and division bind tighter than addition and subtraction, so 2 + 3 * 4 is 14, and parentheses override precedence. Integer overflow is undefined behaviour for signed types, so a program that adds past INT_MAX can do anything. Assignment itself is an expression in C, so a = b = 0 is legal and assigns 0 to both.',
          syntax: 'int x = 5;\nx += 3;   // x is now 8\nx++;     // postfix: use then increment\n++x;     // prefix: increment then use\nint y = 2 + 3 * 4; // 14',
          analogy: 'Compound assignment is like a shortcut on a calculator: pressing "+=" is the same as typing the number, pressing +, and pressing = all in one key.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int x = 5;
    x += 3;
    printf("x = %d\\n", x);
    int a = x++;
    printf("a = %d, x = %d\\n", a, x);
    int b = ++x;
    printf("b = %d, x = %d\\n", b, x);
    printf("7 %% 3 = %d\\n", 7 % 3);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Start with x = 5 and add 3 with +=.', 'Assign a = x++: a gets 8, then x becomes 9.', 'Assign b = ++x: x becomes 10 first, so b is 10.', 'Show that 7 % 3 is 1.', 'Print each result to confirm the order of operations.'],
          commonMistakes: ['Using x++ inside a complex expression and being surprised by the value', 'Writing = when == was intended in a comparison', 'Forgetting that / on ints truncates, so 5 / 2 is 2'],
          debuggingExercise: {
            prompt: 'This program should print 6 but prints 5. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int x = 5;
    int y = x++;
    printf("%d\\n", y);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int x = 5;
    int y = ++x;
    printf("%d\\n", y);
    return 0;
}`,
            explanation: 'Postfix x++ yields the old value 5 and increments afterwards. Prefix ++x increments first, so y receives 6.'
          },
          miniChallenge: 'Write a program that reads an integer and prints its value after applying += 10, then *= 2, then %= 7.',
          summary: 'Arithmetic and compound assignment operators make numeric code concise, but ++ and -- behave differently in prefix and postfix form. Precedence rules decide evaluation order, and parentheses remove doubt. Next: comparisons and logic.',
          knowledgeCheck: [
            q('What is the value of x after int x = 5; x += 3 * 2; ?', ['8', '11', '13', '16'], 1, 'Multiplication binds first: 3 * 2 is 6, and 5 + 6 is 11.'),
            q('What does int y = x++; assign to y?', ['The incremented value of x', 'The old value of x', 'x + 1 twice', 'Nothing'], 1, 'Postfix ++ yields the old value; the increment happens after the value is used.')
          ],
          exercises: [
            ex('c-m4-l1-e1', 'Remainder check', 'write-code', 'Read two integers a and b and print a % b on its own line. Assume b is not zero.',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    // read a and b, print a % b\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a % b);\n    return 0;\n}',
              'The % operator gives the remainder of a divided by b.',
              'O(1)', [tc('17 mod 5', '17 5\n', '2'), tc('10 mod 3', '10 3\n', '1', true)], h5(
                'The % operator returns the remainder after integer division.',
                'Read a and b, then print a % b with %d.',
                'scanf("%d %d", &a, &b); printf("%d\\n", a % b);',
                'If the answer looks like a quotient instead of a remainder, check you used % and not /.',
                'Solution: scanf("%d %d", &a, &b); printf("%d\\n", a % b); 17 % 5 is 2.'))
          ]
        },
        {
          id: 'c-m4-l2',
          slug: 'relational-logical',
          title: 'Relational and Logical Operators',
          objectives: ['Compare values with relational operators', 'Combine conditions with &&, ||, and !', 'Explain short-circuit evaluation'],
          introduction: 'Programs make decisions by asking questions: is the score high enough, is the password correct, is the tank empty? Relational and logical operators produce true/false answers that drive if statements and loops.',
          concept: 'Relational operators compare two values and produce 1 for true or 0 for false: == equal, != not equal, < less than, <= less than or equal, > greater than, >= greater than or equal. Note that == compares while a single = assigns, a distinction that causes many bugs. Logical operators combine conditions: && is true only when both sides are true, || is true when at least one side is true, and ! flips a value. C evaluates && and || with short-circuiting: in a && b, if a is false the whole expression is false and b is never evaluated; in a || b, if a is true the result is true without evaluating b. This is useful for safety checks such as p != NULL && p->value > 0, where the second part would crash if the first were false. Logical operators treat any non-zero value as true. Parentheses make complex conditions readable, and De Morgan\'s laws help simplify negations: !(a && b) is the same as !a || !b.',
          syntax: 'int ok = (age >= 18) && (has_ticket == 1);\nint any = (a < 0) || (b < 0);\nint not_ready = !ready;',
          analogy: 'Logical operators are like security checkpoints: && means you need both badges, || means either badge will do, and ! means the badge must be absent.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int age = 20;
    int has_ticket = 1;
    int can_enter = (age >= 18) && (has_ticket == 1);
    printf("Can enter: %d\\n", can_enter);
    int discount = (age < 12) || (age >= 65);
    printf("Discount: %d\\n", discount);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Set age to 20 and has_ticket to 1.', 'Combine both conditions with && to decide entry.', 'Print 1 because both conditions hold.', 'Compute discount with || for children or seniors.', 'Print 0 because neither applies.'],
          commonMistakes: ['Writing = instead of == in a comparison', 'Chaining comparisons like 0 < x < 10, which does not mean what it looks like in C', 'Forgetting that && has higher precedence than ||, so a || b && c means a || (b && c)'],
          debuggingExercise: {
            prompt: 'This program should print 1 when x is between 0 and 10, but it prints 1 for x = 20 as well. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int x = 20;
    printf("%d\\n", 0 < x < 10);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int x = 20;
    printf("%d\\n", (x > 0) && (x < 10));
    return 0;
}`,
            explanation: 'C evaluates 0 < x < 10 as (0 < x) < 10. Since 0 < 20 is 1, and 1 < 10 is true, the result is 1. Range checks need two comparisons joined with &&.'
          },
          miniChallenge: 'Write a program that reads an age and prints 1 if the person is a teenager (13 to 19 inclusive) and 0 otherwise.',
          summary: 'Relational operators compare, logical operators combine, and short-circuiting skips work that cannot change the result. Remember == for comparison and && for range checks. Next module: using these answers in if statements.',
          knowledgeCheck: [
            q('What is the result of (5 > 3) && (2 > 4)?', ['1', '0', '5', '2'], 1, 'The first part is true but the second is false, so && gives 0.'),
            q('In the expression p != NULL && p->value > 0, why is short-circuiting important?', ['It makes the code faster only', 'If p is NULL, the second part is skipped and cannot crash', 'It changes the type of p', 'It is not important'], 1, 'Short-circuiting means p->value is only read when p is not NULL, avoiding a null dereference.')
          ],
          exercises: [
            ex('c-m4-l2-e1', 'Is it in range?', 'write-code', 'Read one integer and print 1 if it is between 10 and 20 inclusive, otherwise print 0.',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // print 1 if 10 <= n <= 20, else 0\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", (n >= 10) && (n <= 20));\n    return 0;\n}',
              'Two comparisons joined with && test both ends of the range at once.',
              'O(1)', [tc('15 in range', '15\n', '1'), tc('25 out of range', '25\n', '0', true)], h5(
                'A range check needs two comparisons: n >= 10 and n <= 20.',
                'Join the two comparisons with && and print the result with %d.',
                'printf("%d\\n", (n >= 10) && (n <= 20));',
                'If 25 prints 1, you probably chained the comparisons; use && instead.',
                'Solution: printf("%d\\n", (n >= 10) && (n <= 20)); The expression is 1 only when both parts are true.'))
          ]
        }
      ]
    },
    {
      id: 'c-m5',
      title: 'Conditional Statements',
      description: 'Making decisions with if, else if, else, and switch.',
      level: 'beginner',
      order: 5,
      lessons: [
        {
          id: 'c-m5-l1',
          slug: 'if-else',
          title: 'if, else if, and else',
          objectives: ['Write if statements with boolean conditions', 'Chain else if for multiple cases', 'Avoid dangling else and assignment-in-condition bugs'],
          introduction: 'Conditional statements let a program choose different paths based on data. This lesson covers if, else if, and else, the workhorses of decision-making in C.',
          concept: 'An if statement evaluates a condition and runs its block only when the condition is non-zero. An optional else block runs when the condition is false, and else if chains let you test several conditions in order, running the first branch that matches. C executes branches from top to bottom and stops at the first true condition, so the order of tests matters and later branches act as fallbacks. Braces are optional for a single statement but always recommended, because a second statement added later without braces silently falls outside the if. A classic bug is writing if (x = 5) instead of if (x == 5): the assignment sets x to 5 and the condition is always true. Compilers warn about this with -Wall, and the idiom if (5 == x) makes the mistake a compile error. Conditions can combine comparisons with && and ||, and nesting if statements inside each other handles multi-level decisions.',
          syntax: 'if (score >= 90) {\n    printf("A\\n");\n} else if (score >= 80) {\n    printf("B\\n");\n} else {\n    printf("C or below\\n");\n}',
          analogy: 'An if chain is like a set of doors in a hallway: you try each door in order and walk through the first one that opens.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int score = 85;
    if (score >= 90) {
        printf("Grade A\\n");
    } else if (score >= 80) {
        printf("Grade B\\n");
    } else if (score >= 70) {
        printf("Grade C\\n");
    } else {
        printf("Grade D or F\\n");
    }
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Set score to 85.', 'The first test, score >= 90, is false, so skip it.', 'The second test, score >= 80, is true, so print Grade B.', 'The remaining branches are skipped once a match is found.', 'Change the score and rerun to see other branches.'],
          commonMistakes: ['Writing if (x = 5) instead of if (x == 5)', 'Omitting braces and adding a second statement that runs unconditionally', 'Putting a semicolon after the if condition, which creates an empty if body'],
          debuggingExercise: {
            prompt: 'This program always prints "Pass" even for a score of 30. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int score = 30;
    if (score = 50) {
        printf("Pass\\n");
    } else {
        printf("Fail\\n");
    }
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int score = 30;
    if (score >= 50) {
        printf("Pass\\n");
    } else {
        printf("Fail\\n");
    }
    return 0;
}`,
            explanation: 'score = 50 assigns 50 to score and the condition is 50, which is non-zero and therefore true. The intended test is score >= 50, a comparison.'
          },
          miniChallenge: 'Write a program that reads a temperature and prints "Cold", "Mild", or "Hot" using an if chain.',
          summary: 'if, else if, and else select one branch based on the first true condition. Use == for comparison, always use braces, and order branches from most specific to most general. Next: switch statements for multi-way choices.',
          knowledgeCheck: [
            q('In an if / else if chain, how many branches can run?', ['All of them', 'At most one', 'Exactly two', 'None'], 1, 'Execution stops at the first true condition, so at most one branch runs.'),
            q('What does if (x = 0) do?', ['Tests whether x is 0', 'Assigns 0 to x and the condition is false', 'Declares x', 'Crashes'], 1, 'The assignment sets x to 0, and 0 is false, so the else branch runs.')
          ],
          exercises: [
            ex('c-m5-l1-e1', 'Pass or fail', 'write-code', 'Read a score and print "pass" if it is 50 or more, otherwise print "fail". Print exactly one word, lowercase, followed by a newline.',
              '#include <stdio.h>\n\nint main(void) {\n    int score;\n    // read score, print pass or fail\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int score;\n    scanf("%d", &score);\n    if (score >= 50) {\n        printf("pass\\n");\n    } else {\n        printf("fail\\n");\n    }\n    return 0;\n}',
              'An if/else on score >= 50 prints the right word.',
              'O(1)', [tc('score 72', '72\n', 'pass'), tc('score 49', '49\n', 'fail', true)], h5(
                'Compare the score with >= 50 to decide the branch.',
                'Use if (score >= 50) to print "pass", else print "fail".',
                'if (score >= 50) { printf("pass\\n"); } else { printf("fail\\n"); }',
                'If both words print, check the braces around each branch.',
                'Solution: if (score >= 50) printf("pass\\n"); else printf("fail\\n"); The boundary 50 counts as a pass.'))
          ]
        },
        {
          id: 'c-m5-l2',
          slug: 'switch-ternary',
          title: 'switch Statements and the Ternary Operator',
          objectives: ['Write switch statements with case labels', 'Use break correctly and understand fall-through', 'Use the ternary operator for short conditionals'],
          introduction: 'When one variable can take many discrete values, a long if chain gets clumsy. The switch statement matches a value against a set of cases, and the ternary operator compresses a simple two-way choice into one expression.',
          concept: 'A switch evaluates an integer or character expression and jumps to the case label with the matching constant value. Each case typically ends with break, which exits the switch; without break, execution falls through into the next case, which is occasionally useful but usually a bug. The optional default label runs when no case matches, and it is good practice to always include one for unexpected values. Case labels must be compile-time constants, and duplicate labels are a compile error. switch only works with integer-like types, not with strings or floating-point values. The ternary operator condition ? a : b is an expression that yields a when the condition is true and b otherwise, so int max = (a > b) ? a : b; picks the larger value in one line. Ternaries are best for short, simple choices; nesting them hurts readability.',
          syntax: 'switch (day) {\n    case 1: printf("Mon\\n"); break;\n    case 2: printf("Tue\\n"); break;\n    default: printf("Other\\n");\n}\nint max = (a > b) ? a : b;',
          analogy: 'A switch is like a post office sorting machine: each letter is routed to the pigeonhole matching its postcode, and default is the "unknown address" bin.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int day = 3;
    switch (day) {
        case 1: printf("Monday\\n"); break;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        default: printf("Another day\\n"); break;
    }
    int a = 7, b = 4;
    int max = (a > b) ? a : b;
    printf("Max: %d\\n", max);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Set day to 3.', 'switch jumps to case 3 and prints Wednesday.', 'break exits the switch so later cases do not run.', 'The ternary picks the larger of a and b.', 'Print the maximum, which is 7.'],
          commonMistakes: ['Forgetting break and falling through to the next case', 'Using a variable as a case label, which must be a constant', 'Trying to switch on a string or a float'],
          debuggingExercise: {
            prompt: 'This program prints three lines for input 1 instead of one. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int day = 1;
    switch (day) {
        case 1: printf("Monday\\n");
        case 2: printf("Tuesday\\n");
        case 3: printf("Wednesday\\n");
    }
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int day = 1;
    switch (day) {
        case 1: printf("Monday\\n"); break;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
    }
    return 0;
}`,
            explanation: 'Without break, execution falls through from case 1 into cases 2 and 3, printing all three lines. Each case needs its own break.'
          },
          miniChallenge: 'Write a switch that reads a month number (1-12) and prints the number of days in that month, using fall-through deliberately for months with 31 days.',
          summary: 'switch matches integer values against constant cases, break prevents fall-through, and default catches everything else. The ternary operator is a compact if/else expression. Next module: repeating work with loops.',
          knowledgeCheck: [
            q('What happens if a case in a switch has no break?', ['Compile error', 'Execution falls through to the next case', 'The switch restarts', 'The program crashes'], 1, 'Without break, control continues into the following case body.'),
            q('What does (a > b) ? a : b evaluate to?', ['Always a', 'Always b', 'The larger of a and b', '1 or 0'], 2, 'The ternary yields a when the condition is true and b otherwise, so it picks the larger value.')
          ],
          exercises: [
            ex('c-m5-l2-e1', 'Day name', 'write-code', 'Read an integer 1-7 and print the weekday name (1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday, 7 = Sunday). For any other number print "invalid".',
              '#include <stdio.h>\n\nint main(void) {\n    int d;\n    // read d, print the weekday name\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int d;\n    scanf("%d", &d);\n    switch (d) {\n        case 1: printf("Monday\\n"); break;\n        case 2: printf("Tuesday\\n"); break;\n        case 3: printf("Wednesday\\n"); break;\n        case 4: printf("Thursday\\n"); break;\n        case 5: printf("Friday\\n"); break;\n        case 6: printf("Saturday\\n"); break;\n        case 7: printf("Sunday\\n"); break;\n        default: printf("invalid\\n"); break;\n    }\n    return 0;\n}',
              'A switch maps each number to its weekday name; default handles out-of-range input.',
              'O(1)', [tc('day 3', '3\n', 'Wednesday'), tc('day 9', '9\n', 'invalid', true)], h5(
                'A switch on the input number can map each value to a name.',
                'Write a case for each day 1-7 with a break, plus a default for invalid input.',
                'switch (d) { case 1: printf("Monday\\n"); break; ... default: printf("invalid\\n"); }',
                'If several names print at once, a break is missing after a case.',
                'Solution: one case per day with break, and default printing "invalid". Input 3 prints Wednesday.'))
          ]
        }
      ]
    },
    {
      id: 'c-m6',
      title: 'Loops',
      description: 'Repeating work with while, for, and do-while loops, plus break and continue.',
      level: 'beginner',
      order: 6,
      lessons: [
        {
          id: 'c-m6-l1',
          slug: 'while-and-for',
          title: 'while and for Loops',
          objectives: ['Write while loops with correct termination', 'Write for loops with init, condition, and update', 'Choose between while and for'],
          introduction: 'Loops let a program repeat work without repeating code. This lesson covers while loops, which repeat while a condition holds, and for loops, which bundle initialization, condition, and update into one line.',
          concept: 'A while loop checks its condition before each iteration and stops as soon as the condition becomes false, so a loop whose condition starts false runs zero times. A for loop has three parts separated by semicolons: initialization runs once, the condition is checked before every iteration, and the update runs after every iteration. for loops are natural when you know how many times to repeat, such as counting from 0 to n - 1, while while loops suit conditions like reading input until a sentinel value appears. The loop variable in a for loop is often declared inside the loop, as in for (int i = 0; i < 10; i++), which keeps its scope tight. Every loop needs a guarantee of progress toward termination: a missing update creates an infinite loop that must be stopped with Ctrl-C. Off-by-one errors are the classic loop bug, so check whether the last value should be included by testing the boundary.',
          syntax: 'int i = 0;\nwhile (i < 5) { printf("%d\\n", i); i++; }\nfor (int j = 0; j < 5; j++) { printf("%d\\n", j); }',
          analogy: 'A loop is like a washing machine cycle: it repeats the same wash-rinse-spin steps until the timer condition says the load is done.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("Sum 1..10 = %d\\n", sum);
    int n = 5;
    while (n > 0) {
        printf("%d\\n", n);
        n--;
    }
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['The for loop adds numbers 1 through 10 into sum.', 'i runs from 1 to 10 inclusive, so the sum is 55.', 'Print the sum.', 'The while loop counts down from 5 to 1, printing each value.', 'When n reaches 0 the condition fails and the loop ends.'],
          commonMistakes: ['Writing for (i = 0; i <= 10; i++) when you meant < 10, running one extra iteration', 'Forgetting to update the loop variable in a while loop', 'Putting a semicolon after the for header, creating an empty loop body'],
          debuggingExercise: {
            prompt: 'This program should print 1 to 5 but prints nothing. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    for (int i = 1; i < 5; i++);
    {
        printf("%d\\n", i);
    }
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
            explanation: 'The semicolon after the for header made the loop body empty, and i went out of scope before the printf block. Removing the semicolon and using <= 5 prints 1 to 5.'
          },
          miniChallenge: 'Write a program that reads n and prints the multiplication table of n from 1 to 10.',
          summary: 'while loops repeat while a condition holds; for loops package init, condition, and update together. Always guarantee progress toward termination and check boundary values. Next: do-while, break, and continue.',
          knowledgeCheck: [
            q('How many times does for (int i = 0; i < 5; i++) run its body?', ['4', '5', '6', '0'], 1, 'i takes the values 0, 1, 2, 3, 4, which is five iterations.'),
            q('When does a while loop check its condition?', ['After each iteration only', 'Before each iteration', 'Only once', 'Never'], 1, 'The condition is checked before every iteration, including the first.')
          ],
          exercises: [
            ex('c-m6-l1-e1', 'Sum 1 to n', 'write-code', 'Read a positive integer n and print the sum of the numbers from 1 to n.',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n, print 1 + 2 + ... + n\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    int sum = 0;\n    for (int i = 1; i <= n; i++) {\n        sum += i;\n    }\n    printf("%d\\n", sum);\n    return 0;\n}',
              'A for loop from 1 to n accumulates the sum; printing it gives the answer.',
              'O(n)', [tc('sum to 5', '5\n', '15'), tc('sum to 100', '100\n', '5050', true)], h5(
                'Add the numbers 1 through n one at a time with a loop.',
                'Initialize sum to 0, loop i from 1 to n, and add i to sum each time.',
                'int sum = 0; for (int i = 1; i <= n; i++) sum += i; printf("%d\\n", sum);',
                'If the sum is too small by n, the loop probably stopped at i < n instead of i <= n.',
                'Solution: loop i from 1 to n inclusive, sum += i, then print sum. For n = 5 the answer is 15.'))
          ]
        },
        {
          id: 'c-m6-l2',
          slug: 'do-while-break-continue',
          title: 'do-while, break, and continue',
          objectives: ['Write do-while loops that run at least once', 'Exit a loop early with break', 'Skip an iteration with continue'],
          introduction: 'Sometimes a loop must run at least once, and sometimes it must stop early or skip an iteration. This lesson covers do-while loops, which check their condition at the end, and the break and continue statements.',
          concept: 'A do-while loop runs its body first and checks the condition afterwards, so it always executes at least once. This makes it ideal for menus and input validation, where you need to ask the user before you can test the answer. break exits the nearest enclosing loop immediately, which is useful when searching: once you find the target there is no reason to keep scanning. continue skips the rest of the current iteration and jumps to the next condition check, which is handy for filtering out values you want to ignore. Both break and continue only affect the innermost loop, so in nested loops you may need a flag or a function return to escape the outer loop. A loop that reads input until a sentinel, such as -1, often combines while with break: read a value, break when it is the sentinel, otherwise process it. Used sparingly, break and continue make loop logic clearer; used everywhere, they make control flow hard to follow.',
          syntax: 'do {\n    printf("Enter a number (0 to quit): ");\n    scanf("%d", &n);\n} while (n != 0);\n\nfor (int i = 0; i < 10; i++) {\n    if (i == 3) continue;\n    if (i == 7) break;\n    printf("%d\\n", i);\n}',
          analogy: 'do-while is like tasting soup before deciding whether it needs more salt: you always taste once, then decide whether to repeat.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int n;
    int total = 0;
    do {
        scanf("%d", &n);
        if (n < 0) continue;
        if (n == 0) break;
        total += n;
    } while (1);
    printf("Total: %d\\n", total);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Read a number with scanf inside a do-while that runs forever.', 'Negative numbers are skipped with continue.', 'Zero breaks out of the loop.', 'Other numbers are added to total.', 'After the loop, print the total of the positive numbers entered.'],
          commonMistakes: ['Forgetting the semicolon after while in a do-while loop', 'Using break in an if statement expecting it to exit the loop from inside a switch', 'Writing while (1) with no break, creating a truly infinite loop'],
          debuggingExercise: {
            prompt: 'This program should ask for input at least once but never compiles. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int n;
    do {
        scanf("%d", &n);
        printf("You entered %d\\n", n);
    } while (n != 0)
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int n;
    do {
        scanf("%d", &n);
        printf("You entered %d\\n", n);
    } while (n != 0);
    return 0;
}`,
            explanation: 'A do-while statement needs a semicolon after the while condition. Without it the compiler reports a syntax error.'
          },
          miniChallenge: 'Write a program that reads numbers until 0 is entered and prints how many positive numbers were entered.',
          summary: 'do-while guarantees at least one iteration, break exits a loop early, and continue skips to the next iteration. These tools make input loops and searches clean. Next module: organizing code into functions.',
          knowledgeCheck: [
            q('How many times does a do-while loop run its body at minimum?', ['Zero', 'Once', 'Twice', 'Until break'], 1, 'The condition is checked after the body, so the body always runs at least once.'),
            q('What does continue do inside a for loop?', ['Exits the loop', 'Skips to the next iteration, running the update first', 'Restarts the whole program', 'Skips the update step'], 1, 'continue jumps to the update expression and then re-checks the condition.')
          ],
          exercises: [
            ex('c-m6-l2-e1', 'Count down', 'write-code', 'Read a positive integer n and print the numbers from n down to 1, one per line.',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n, print n, n-1, ..., 1\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    for (int i = n; i >= 1; i--) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}',
              'A for loop starting at n and decrementing to 1 prints each value.',
              'O(n)', [tc('count from 3', '3\n', '3\n2\n1'), tc('count from 1', '1\n', '1', true)], h5(
                'Count down by starting the loop at n and decreasing i each step.',
                'Use for (int i = n; i >= 1; i--) and print i inside the loop.',
                'for (int i = n; i >= 1; i--) printf("%d\\n", i);',
                'If 0 prints as well, the condition should be i >= 1, not i >= 0.',
                'Solution: for (int i = n; i >= 1; i--) printf("%d\\n", i); For n = 3 the output is 3, 2, 1.'))
          ]
        }
      ]
    },
    {
      id: 'c-m7',
      title: 'Functions',
      description: 'Defining and calling functions, parameters, return values, and scope.',
      level: 'beginner',
      order: 7,
      lessons: [
        {
          id: 'c-m7-l1',
          slug: 'defining-calling-functions',
          title: 'Defining and Calling Functions',
          objectives: ['Define a function with parameters and a return type', 'Call functions and use their return values', 'Write function prototypes'],
          introduction: 'Functions package reusable logic under a name so you can call it from anywhere. This lesson covers defining functions, passing arguments, returning values, and declaring prototypes so functions can be used before they are defined.',
          concept: 'A function has a return type, a name, a parameter list, and a body. When you call it, the arguments you pass are copied into the parameters, the body runs, and return sends a value back to the caller. Functions in C pass arguments by value, which means the function receives a copy: changing a parameter inside the function does not change the caller\'s variable. A function declared void returns nothing and needs no return statement, though return; can exit early. If you call a function before its definition appears in the file, you need a prototype, a declaration of the signature without a body, placed near the top of the file. Prototypes let the compiler check that calls match the definition. Good functions do one thing well, take clear parameters, and have descriptive names, which makes programs easier to read, test, and reuse.',
          syntax: 'int add(int a, int b) {\n    return a + b;\n}\n\nint add(int a, int b); // prototype\nint sum = add(3, 4);',
          analogy: 'A function is like a vending machine: you put in coins (arguments), it does its work inside, and it hands back a snack (the return value).',
          exampleCode: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int square(int x) {
    return x * x;
}

int main(void) {
    printf("3 + 4 = %d\\n", add(3, 4));
    printf("5 squared = %d\\n", square(5));
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define add, which returns the sum of two ints.', 'Define square, which returns x times x.', 'In main, call add(3, 4) and print the result 7.', 'Call square(5) and print 25.', 'Each call copies the arguments into the parameters.'],
          commonMistakes: ['Forgetting the return type, which defaults to int in very old C but is an error in modern C', 'Calling a function before its definition without a prototype', 'Expecting a function to change a caller variable passed by value'],
          debuggingExercise: {
            prompt: 'This program should print 7 but prints a warning and a wrong value. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    printf("%d\\n", add(3, 4));
    return 0;
}

int add(int a, int b) {
    return a + b;
}`,
            fixedCode: `#include <stdio.h>

int add(int a, int b);

int main(void) {
    printf("%d\\n", add(3, 4));
    return 0;
}

int add(int a, int b) {
    return a + b;
}`,
            explanation: 'main calls add before its definition, so the compiler does not know its signature. Adding a prototype above main declares it in advance.'
          },
          miniChallenge: 'Write a function is_even that returns 1 for even numbers and 0 for odd numbers, and test it in main.',
          summary: 'Functions take parameters by value, run their body, and return a result. Prototypes declare a function before its definition. Next: how variables live and die in scopes.',
          knowledgeCheck: [
            q('What does "pass by value" mean in C?', ['The function receives a copy of each argument', 'The function receives the original variable', 'Arguments are passed as strings', 'The function cannot take arguments'], 0, 'Arguments are copied into parameters, so changes inside the function do not affect the caller.'),
            q('What is a function prototype?', ['The function body', 'A declaration of the function signature without a body', 'A comment describing the function', 'The return statement'], 1, 'A prototype tells the compiler the return type, name, and parameters before the definition appears.')
          ],
          exercises: [
            ex('c-m7-l1-e1', 'Maximum of two', 'write-code', 'Read two integers and print the larger one. Implement a function int max2(int a, int b) and call it from main.',
              '#include <stdio.h>\n\nint max2(int a, int b) {\n    // return the larger of a and b\n    return 0;\n}\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", max2(a, b));\n    return 0;\n}',
              '#include <stdio.h>\n\nint max2(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", max2(a, b));\n    return 0;\n}',
              'max2 compares a and b and returns the larger; main prints the result.',
              'O(1)', [tc('max of 3 and 9', '3 9\n', '9'), tc('max of 10 and 2', '10 2\n', '10', true)], h5(
                'A function can return the larger of two values using an if statement.',
                'In max2, return a when a > b, otherwise return b.',
                'int max2(int a, int b) { if (a > b) return a; return b; }',
                'If the program always prints the second number, check the comparison direction.',
                'Solution: if (a > b) return a; return b; For inputs 3 and 9 the answer is 9.'))
          ]
        },
        {
          id: 'c-m7-l2',
          slug: 'scope-and-recursion',
          title: 'Scope, Lifetime, and Recursion',
          objectives: ['Explain local vs global scope', 'Use static variables for persistent state', 'Write a correct recursive function'],
          introduction: 'Where a variable lives decides where it can be used and how long it lasts. This lesson covers scope and lifetime, static variables, and recursion, where a function calls itself to solve smaller versions of a problem.',
          concept: 'Scope is the region of code where a name is visible. A local variable declared inside a function exists only there and is created fresh on each call, while a global variable declared outside all functions is visible everywhere in the file but should be used sparingly because any function can change it. A variable declared inside a block, such as an if or loop body, is visible only within that block. A static local variable keeps its value between calls: it is initialized once and retains its value, which is useful for counters. Recursion is when a function calls itself. Every recursive function needs a base case that stops the recursion and a recursive step that moves toward it; without a base case the calls pile up until the stack overflows. The classic example is factorial: factorial(0) is 1, and factorial(n) is n times factorial(n - 1). Recursion mirrors the structure of problems like tree traversal, but each call costs stack space, so deep recursion can overflow.',
          syntax: 'int counter = 0; // global\n\nint next_id(void) {\n    static int id = 0;\n    return ++id;\n}\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}',
          analogy: 'Recursion is like a set of Russian dolls: each doll contains a smaller version of itself until you reach the tiniest doll, which is the base case, and then you reassemble them on the way back out.',
          exampleCode: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int next_id(void) {
    static int id = 0;
    return ++id;
}

int main(void) {
    printf("5! = %d\\n", factorial(5));
    printf("ids: %d %d %d\\n", next_id(), next_id(), next_id());
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['factorial(5) calls factorial(4), and so on down to factorial(1), which returns 1.', 'The results multiply back up: 2 * 1, 3 * 2, 4 * 6, 5 * 24, giving 120.', 'next_id uses a static variable that survives between calls.', 'The three calls return 1, 2, and 3 in order.', 'Print both results.'],
          commonMistakes: ['Forgetting the base case and causing infinite recursion', 'Using a global variable where a local would do, creating hidden dependencies', 'Assuming a static local is re-initialized on every call'],
          debuggingExercise: {
            prompt: 'This recursive function crashes with a stack overflow. Fix it.',
            buggyCode: `#include <stdio.h>

int countdown(int n) {
    printf("%d\\n", n);
    return countdown(n - 1);
}

int main(void) {
    countdown(3);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int countdown(int n) {
    if (n <= 0) return 0;
    printf("%d\\n", n);
    return countdown(n - 1);
}

int main(void) {
    countdown(3);
    return 0;
}`,
            explanation: 'There was no base case, so countdown kept calling itself with ever more negative numbers until the stack ran out. Adding if (n <= 0) return 0; stops the recursion.'
          },
          miniChallenge: 'Write a recursive function that returns the sum of the numbers from 1 to n.',
          summary: 'Scope limits where names are visible, static locals persist between calls, and recursion solves problems by reducing them toward a base case. Next module: storing many values in arrays.',
          knowledgeCheck: [
            q('What is the base case of a recursive function?', ['The first call', 'The condition that stops further recursion', 'The return type', 'The largest input'], 1, 'The base case is the simple input handled directly, without another recursive call.'),
            q('What happens to a static local variable between function calls?', ['It is reset to its initial value', 'It keeps its value', 'It is freed', 'It becomes global'], 1, 'A static local is initialized once and retains its value across calls.')
          ],
          exercises: [
            ex('c-m7-l2-e1', 'Recursive power', 'write-code', 'Read two integers base and exp (exp >= 0) and print base raised to exp. Implement a recursive function int power(int base, int exp).',
              '#include <stdio.h>\n\nint power(int base, int exp) {\n    // recursive power\n    return 0;\n}\n\nint main(void) {\n    int b, e;\n    scanf("%d %d", &b, &e);\n    printf("%d\\n", power(b, e));\n    return 0;\n}',
              '#include <stdio.h>\n\nint power(int base, int exp) {\n    if (exp == 0) return 1;\n    return base * power(base, exp - 1);\n}\n\nint main(void) {\n    int b, e;\n    scanf("%d %d", &b, &e);\n    printf("%d\\n", power(b, e));\n    return 0;\n}',
              'The base case exp == 0 returns 1; otherwise multiply base by power(base, exp - 1).',
              'O(exp)', [tc('2 to the 5', '2 5\n', '32'), tc('3 to the 0', '3 0\n', '1', true)], h5(
                'Anything to the power 0 is 1; that is your base case.',
                'Return 1 when exp is 0, otherwise return base * power(base, exp - 1).',
                'if (exp == 0) return 1; return base * power(base, exp - 1);',
                'If the result is always 0, check the base case returns 1 and not 0.',
                'Solution: if (exp == 0) return 1; return base * power(base, exp - 1); 2^5 = 32.'))
          ]
        }
      ]
    },
    {
      id: 'c-m8',
      title: 'Arrays',
      description: 'Storing collections of values, iterating over arrays, and passing arrays to functions.',
      level: 'beginner',
      order: 8,
      lessons: [
        {
          id: 'c-m8-l1',
          slug: 'array-basics',
          title: 'Declaring and Using Arrays',
          objectives: ['Declare and initialize arrays', 'Access elements by index', 'Loop over an array safely without going out of bounds'],
          introduction: 'A single variable holds one value; an array holds many values of the same type under one name. This lesson covers declaring arrays, indexing, and looping over every element.',
          concept: 'An array is a contiguous block of memory holding elements of one type, accessed by index starting at 0. Declaring int scores[5]; reserves five ints, and scores[0] is the first while scores[4] is the last. You can initialize with a list, as in int scores[5] = {90, 80, 70, 60, 50};, and if you omit the size the compiler counts the initializers. Arrays are zero-indexed, so the valid indices for an array of size n are 0 through n - 1, and reading or writing scores[n] goes out of bounds, which in C is undefined behaviour that may silently corrupt other data. A common loop pattern is for (int i = 0; i < n; i++) to visit every element exactly once. The sizeof operator can compute the element count as sizeof(arr) / sizeof(arr[0]), but only in the scope where the array was declared, because arrays decay to pointers when passed to functions.',
          syntax: 'int scores[5] = {90, 80, 70, 60, 50};\nint first = scores[0];\nscores[2] = 75;\nint count = sizeof(scores) / sizeof(scores[0]);',
          analogy: 'An array is like a row of mailboxes in an apartment building: one address (the array name) plus a box number (the index) reaches exactly one mailbox.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int scores[5] = {90, 80, 70, 60, 50};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }
    printf("Average: %.1f\\n", sum / 5.0);
    printf("First: %d, Last: %d\\n", scores[0], scores[4]);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare scores with five values.', 'Loop i from 0 to 4, adding each element to sum.', 'Divide by 5.0 to get a floating-point average of 70.0.', 'Print the first element at index 0 and the last at index 4.', 'Note that index 5 would be out of bounds.'],
          commonMistakes: ['Accessing arr[n] on an array of size n, one past the end', 'Assuming uninitialized array elements are zero', 'Using sizeof on an array parameter inside a function, which gives the pointer size'],
          debuggingExercise: {
            prompt: 'This program prints a garbage average. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int scores[5] = {90, 80, 70, 60, 50};
    int sum = 0;
    for (int i = 0; i <= 5; i++) {
        sum += scores[i];
    }
    printf("Average: %.1f\\n", sum / 5.0);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int scores[5] = {90, 80, 70, 60, 50};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }
    printf("Average: %.1f\\n", sum / 5.0);
    return 0;
}`,
            explanation: 'The loop ran i from 0 to 5 inclusive, reading scores[5], which is one past the end. Changing the condition to i < 5 visits exactly the five valid elements.'
          },
          miniChallenge: 'Write a program that reads 5 integers into an array and prints the largest one.',
          summary: 'Arrays store same-type values contiguously and are indexed from 0. Loop with i < n to stay in bounds, and remember that out-of-bounds access is undefined behaviour. Next: two-dimensional arrays and arrays as function arguments.',
          knowledgeCheck: [
            q('What is the last valid index of int a[10]?', ['10', '9', '11', '0'], 1, 'Indices run from 0 to n - 1, so for size 10 the last valid index is 9.'),
            q('How many elements does int a[] = {1, 2, 3}; have?', ['0', '2', '3', '4'], 2, 'The compiler counts the three initializers, so the array has size 3.')
          ],
          exercises: [
            ex('c-m8-l1-e1', 'Sum of an array', 'write-code', 'Read 5 integers and print their sum.',
              '#include <stdio.h>\n\nint main(void) {\n    int a[5];\n    // read 5 numbers, print their sum\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int a[5];\n    int sum = 0;\n    for (int i = 0; i < 5; i++) {\n        scanf("%d", &a[i]);\n        sum += a[i];\n    }\n    printf("%d\\n", sum);\n    return 0;\n}',
              'Read each element into the array and add it to a running sum.',
              'O(n)', [tc('sum 1..5', '1 2 3 4 5\n', '15'), tc('all tens', '10 10 10 10 10\n', '50', true)], h5(
                'Store each input in a[i] and add it to a sum variable.',
                'Loop i from 0 to 4, scanf into &a[i], and do sum += a[i].',
                'int sum = 0; for (int i = 0; i < 5; i++) { scanf("%d", &a[i]); sum += a[i]; }',
                'If the sum is too large, check the loop stops at i < 5 and not i <= 5.',
                'Solution: loop i 0..4, scanf("%d", &a[i]), sum += a[i], then print sum. Input 1 2 3 4 5 gives 15.'))
          ]
        },
        {
          id: 'c-m8-l2',
          slug: 'multidimensional-arrays',
          title: 'Two-Dimensional Arrays and Passing Arrays to Functions',
          objectives: ['Declare and use 2D arrays', 'Pass arrays and their size to functions', 'Explain array decay to pointers'],
          introduction: 'Tables, grids, and boards need two dimensions. This lesson covers 2D arrays, nested loops for visiting every cell, and how to pass arrays into functions along with their size.',
          concept: 'A two-dimensional array like int grid[3][4]; is an array of arrays: three rows, each holding four ints, stored in row-major order, meaning all of row 0 comes before row 1 in memory. You access a cell as grid[row][col], and nested loops with one loop per dimension visit every cell. When you pass an array to a function, it decays into a pointer to its first element, so the function receives the address, not a copy, and changes made inside the function are visible to the caller. Because the size information is lost in the decay, you must pass the length as a separate parameter, as in void print_array(int arr[], int n). For 2D arrays the function must know the column count, so the signature looks like void print_grid(int grid[][4], int rows). This decay is also why sizeof inside a function gives the size of a pointer rather than the array.',
          syntax: 'int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};\nint cell = grid[1][2]; // 6\nvoid sum_array(int arr[], int n);',
          analogy: 'A 2D array is like a spreadsheet: the row is the sheet line, the column is the cell across, and together they pinpoint one value.',
          exampleCode: `#include <stdio.h>

void print_grid(int grid[][3], int rows) {
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%d ", grid[r][c]);
        }
        printf("\\n");
    }
}

int main(void) {
    int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
    print_grid(grid, 2);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare a 2 by 3 grid with values 1 through 6.', 'print_grid takes the grid and the row count; the column count 3 is part of the type.', 'Nested loops print each row on its own line.', 'grid[1][2] is 6, the last cell.', 'Run the program to see the two rows printed.'],
          commonMistakes: ['Forgetting to pass the array size to a function', 'Swapping row and column indices', 'Writing grid[3] for a 2D array when you need both indices'],
          debuggingExercise: {
            prompt: 'This function prints garbage sizes. Fix it.',
            buggyCode: `#include <stdio.h>

void show(int arr[]) {
    printf("count: %zu\\n", sizeof(arr) / sizeof(arr[0]));
}

int main(void) {
    int a[5] = {1, 2, 3, 4, 5};
    show(a);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

void show(int arr[], int n) {
    printf("count: %d\\n", n);
}

int main(void) {
    int a[5] = {1, 2, 3, 4, 5};
    show(a, 5);
    return 0;
}`,
            explanation: 'Inside show, arr is a pointer, so sizeof(arr) is the pointer size, not the array size. Pass the length as a separate parameter instead.'
          },
          miniChallenge: 'Write a program that reads a 3x3 grid and prints the sum of its diagonal elements.',
          summary: '2D arrays are arrays of arrays in row-major order, and passing an array to a function passes a pointer, so always pass the size too. Next module: strings, which are arrays of characters.',
          knowledgeCheck: [
            q('In C, when an array is passed to a function, what does the function receive?', ['A full copy of the array', 'A pointer to the first element', 'Only the size', 'A reference to the last element'], 1, 'Arrays decay to pointers when passed, so the function gets the address of element 0.'),
            q('How is int grid[3][4] laid out in memory?', ['Column-major: all of column 0 first', 'Row-major: all of row 0 first', 'Random order', 'One element per page'], 1, 'C stores multi-dimensional arrays in row-major order.')
          ],
          exercises: [
            ex('c-m8-l2-e1', 'Find the maximum', 'build-function', 'Read 4 integers into an array and print the largest. Write a function int find_max(int arr[], int n) that returns the maximum value.',
              '#include <stdio.h>\n\nint find_max(int arr[], int n) {\n    // return the largest element\n    return 0;\n}\n\nint main(void) {\n    int a[4];\n    for (int i = 0; i < 4; i++) scanf("%d", &a[i]);\n    printf("%d\\n", find_max(a, 4));\n    return 0;\n}',
              '#include <stdio.h>\n\nint find_max(int arr[], int n) {\n    int best = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] > best) best = arr[i];\n    }\n    return best;\n}\n\nint main(void) {\n    int a[4];\n    for (int i = 0; i < 4; i++) scanf("%d", &a[i]);\n    printf("%d\\n", find_max(a, 4));\n    return 0;\n}',
              'Start with the first element as the best guess and replace it whenever a larger element appears.',
              'O(n)', [tc('max of 3 9 2 7', '3 9 2 7\n', '9'), tc('max negative', '-5 -1 -9 -3\n', '-1', true)], h5(
                'Track the biggest value seen so far while scanning the array.',
                'Set best to arr[0], loop from i = 1, and update best when arr[i] > best.',
                'int best = arr[0]; for (int i = 1; i < n; i++) if (arr[i] > best) best = arr[i]; return best;',
                'If the answer is wrong for all-negative input, check that best starts at arr[0] and not 0.',
                'Solution: start best at arr[0], scan the rest, update on larger values, return best. For 3 9 2 7 the answer is 9.'))
          ]
        }
      ]
    },
    {
      id: 'c-m9',
      title: 'Strings',
      description: 'Character arrays, the null terminator, and the string library.',
      level: 'beginner',
      order: 9,
      lessons: [
        {
          id: 'c-m9-l1',
          slug: 'string-basics',
          title: 'Strings as Character Arrays',
          objectives: ['Explain the null terminator', 'Declare and initialize strings', 'Read and print strings safely'],
          introduction: 'C has no built-in string type: a string is just an array of characters ending with a null byte. This lesson explains that convention and how to work with strings safely.',
          concept: 'In C a string is a char array whose end is marked by the null character \'\\0\', a byte with value zero. A string literal like "hello" is stored as six bytes: the five letters plus the terminator. The terminator is what lets functions like printf with %s know where the string ends, and forgetting it makes functions read past the end into garbage. Declaring char name[20] = "Ada"; reserves twenty bytes and stores A, d, a, and the terminator in the first four. Because the array size must leave room for the terminator, a string of length n needs an array of at least n + 1. You cannot assign one string to another with = after declaration; you must copy with strcpy or strncpy, or initialize at declaration. String literals live in read-only memory, so writing through a char *p = "hello"; pointer is undefined behaviour.',
          syntax: 'char name[20] = "Ada";\nchar greeting[] = "Hello"; // size 6\nprintf("%s\\n", name);\nchar *literal = "text"; // read-only',
          analogy: 'A C string is like a sentence written on a whiteboard with a full stop at the end: the terminator tells the reader where the sentence stops.',
          exampleCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[20] = "Ada";
    printf("Name: %s\\n", name);
    printf("Length: %zu\\n", strlen(name));
    name[0] = 'E';
    printf("Now: %s\\n", name);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare name as a 20-byte array initialized to "Ada".', 'Print the string with %s.', 'strlen counts characters before the terminator, giving 3.', 'Change the first character to E, making the string "Eda".', 'Print the modified string.'],
          commonMistakes: ['Declaring char s[3] = "hello";, which is too small for the terminator', 'Comparing strings with ==, which compares addresses, not contents', 'Writing to a string literal through a char * pointer'],
          debuggingExercise: {
            prompt: 'This program prints garbage after the name. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    char name[3];
    name[0] = 'A';
    name[1] = 'd';
    name[2] = 'a';
    printf("%s\\n", name);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    char name[4];
    name[0] = 'A';
    name[1] = 'd';
    name[2] = 'a';
    name[3] = '\\0';
    printf("%s\\n", name);
    return 0;
}`,
            explanation: 'The array had no null terminator, so printf kept reading past the array into unrelated memory. Adding a fourth byte with \'\\0\' ends the string properly.'
          },
          miniChallenge: 'Write a program that reads a word and prints each character on its own line.',
          summary: 'C strings are char arrays terminated by a null byte, and every string operation depends on that terminator being present. Size arrays with room for it. Next: the string library functions.',
          knowledgeCheck: [
            q('How many bytes does the string literal "hello" occupy?', ['5', '6', '4', '7'], 1, 'Five letters plus the null terminator make six bytes.'),
            q('What does strlen("Ada") return?', ['2', '3', '4', '0'], 1, 'strlen counts characters before the null terminator, so it returns 3.')
          ],
          exercises: [
            ex('c-m9-l1-e1', 'String length', 'write-code', 'Read a single word (no spaces) and print its length. Use strlen from <string.h>.',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char word[100];\n    // read word, print its length\n    return 0;\n}',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char word[100];\n    scanf("%99s", word);\n    printf("%zu\\n", strlen(word));\n    return 0;\n}',
              'scanf with %99s reads the word safely; strlen gives its length.',
              'O(n)', [tc('length of hello', 'hello\n', '5'), tc('length of C', 'C\n', '1', true)], h5(
                'strlen from string.h counts the characters in a string.',
                'Read the word with scanf("%99s", word), then print strlen(word) with %zu.',
                'scanf("%99s", word); printf("%zu\\n", strlen(word));',
                'If the length is one too many, check you are not counting the newline; %s input has none.',
                'Solution: scanf("%99s", word); printf("%zu\\n", strlen(word)); "hello" has length 5.'))
          ]
        },
        {
          id: 'c-m9-l2',
          slug: 'string-library',
          title: 'The String Library: strcpy, strcat, strcmp',
          objectives: ['Copy strings with strcpy and strncpy', 'Concatenate with strcat', 'Compare strings with strcmp'],
          introduction: 'The <string.h> library provides the tools for copying, joining, and comparing strings. This lesson covers the essential functions and the safe habits that prevent buffer overflows.',
          concept: 'strcpy(dest, src) copies a string including its terminator, but it does not check that dest is big enough, so copying a long string into a small buffer overflows it. strncpy(dest, src, n) copies at most n characters, but it may leave the result unterminated, so you must add the terminator yourself. strcat appends one string to the end of another, again without a size check, and strncat is the bounded version. strcmp(a, b) compares two strings lexicographically and returns 0 when they are equal, a negative value when a comes first, and a positive value when b comes first; comparing the result with == 0 is the correct way to test equality. Other useful functions include strlen for length, strchr for finding a character, and strstr for finding a substring. Modern code often prefers snprintf for building strings because it always respects the buffer size. Always make sure the destination is large enough for the source plus the terminator.',
          syntax: 'strcpy(dest, src);\nstrncpy(dest, src, sizeof(dest) - 1);\ndest[sizeof(dest) - 1] = \'\\0\';\nstrcat(dest, " world");\nint same = (strcmp(a, b) == 0);',
          analogy: 'strcpy is like copying text by hand into a notebook: if the text is longer than the page, it spills onto the next page and overwrites whatever was there.',
          exampleCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char first[20] = "Ada";
    char last[] = "Lovelace";
    char full[40];
    strcpy(full, first);
    strcat(full, " ");
    strcat(full, last);
    printf("%s\\n", full);
    printf("Equal to Ada? %d\\n", strcmp(first, "Ada") == 0);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Copy "Ada" into full with strcpy.', 'Append a space and then "Lovelace" with strcat.', 'Print the full name "Ada Lovelace".', 'strcmp returns 0 when the strings match, so the comparison is true.', 'Note that full is 40 bytes, plenty for the result.'],
          commonMistakes: ['Using strcpy into a buffer that is too small', 'Forgetting that strcmp returns 0 for equal strings', 'Using strncpy without adding a terminator when the source is longer than n'],
          debuggingExercise: {
            prompt: 'This program crashes when comparing two names. Fix it.',
            buggyCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char a[10] = "Ada";
    char b[10] = "Ada";
    if (a == b) {
        printf("equal\\n");
    }
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char a[10] = "Ada";
    char b[10] = "Ada";
    if (strcmp(a, b) == 0) {
        printf("equal\\n");
    }
    return 0;
}`,
            explanation: 'a == b compares the addresses of the two arrays, which are always different. strcmp compares the characters and returns 0 when they match.'
          },
          miniChallenge: 'Write a program that reads two words and prints "same" if they are equal and "different" otherwise.',
          summary: 'strcpy, strcat, and strcmp are the core string tools, but they trust you to size buffers correctly. Use the bounded variants and always leave room for the terminator. Next module: pointers.',
          knowledgeCheck: [
            q('What does strcmp("apple", "apple") return?', ['1', '-1', '0', '5'], 2, 'strcmp returns 0 when the strings are equal.'),
            q('Why is strcpy considered unsafe?', ['It is slow', 'It does not check the destination size and can overflow', 'It cannot copy spaces', 'It requires two headers'], 1, 'strcpy copies until the terminator with no size check, so a long source overflows a small destination.')
          ],
          exercises: [
            ex('c-m9-l2-e1', 'Compare two words', 'write-code', 'Read two words and print "equal" if they are identical, otherwise print "different". Use strcmp.',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char a[100], b[100];\n    // read two words, compare them\n    return 0;\n}',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char a[100], b[100];\n    scanf("%99s %99s", a, b);\n    if (strcmp(a, b) == 0) printf("equal\\n");\n    else printf("different\\n");\n    return 0;\n}',
              'strcmp returns 0 for identical strings; print the matching word.',
              'O(n)', [tc('same words', 'cat cat\n', 'equal'), tc('different words', 'cat dog\n', 'different', true)], h5(
                'strcmp compares two strings and returns 0 when they match.',
                'Read both words, then test strcmp(a, b) == 0 to choose the output.',
                'if (strcmp(a, b) == 0) printf("equal\\n"); else printf("different\\n");',
                'If equal words print "different", check you compared with == 0 and not == 1.',
                'Solution: if (strcmp(a, b) == 0) print "equal", else print "different". "cat" and "cat" are equal.'))
          ]
        }
      ]
    },
    {
      id: 'c-m10',
      title: 'Pointers',
      description: 'Addresses, dereferencing, pointer arithmetic, and pointers as function parameters.',
      level: 'beginner',
      order: 10,
      lessons: [
        {
          id: 'c-m10-l1',
          slug: 'pointer-basics',
          title: 'Addresses, Dereferencing, and the & and * Operators',
          objectives: ['Explain what a pointer is', 'Take an address with & and dereference with *', 'Print addresses and values through pointers'],
          introduction: 'A pointer is a variable that holds a memory address. Pointers are the heart of C: they let functions modify caller variables, build dynamic data structures, and work with arrays efficiently.',
          concept: 'Every variable lives at a memory address, and a pointer stores such an address. If int x = 42; then &x is the address of x, and int *p = &x; declares p as a pointer to int holding that address. The * operator has two roles: in a declaration it marks a pointer type, and in an expression it dereferences, reading or writing the value at the address, so *p is 42 and *p = 100 changes x itself. The %p format specifier prints an address. A pointer that does not point at anything valid should be NULL, the null pointer constant, and dereferencing NULL crashes the program. Pointers and the values they point to have different types and different sizes: a pointer is typically 8 bytes on a 64-bit machine regardless of what it points to. Understanding that p holds an address while *p holds the value is the key insight of this lesson.',
          syntax: 'int x = 42;\nint *p = &x;\nprintf("%p\\n", (void *)p);\n*p = 100; // x is now 100\nint *q = NULL;',
          analogy: 'A pointer is like a home address written on a slip of paper: the paper is not the house, but it tells you exactly where the house is, and following it lets you visit or redecorate.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;
    printf("x = %d\\n", x);
    printf("address of x: %p\\n", (void *)p);
    printf("value via p: %d\\n", *p);
    *p = 100;
    printf("x is now %d\\n", x);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare x as 42 and p as a pointer to x.', 'Print x directly.', 'Print the address stored in p with %p.', 'Dereference p to read the value 42.', 'Assign through *p to change x to 100, then print x.'],
          commonMistakes: ['Dereferencing an uninitialized pointer', 'Confusing p (the address) with *p (the value)', 'Forgetting that * has different meanings in declarations and expressions'],
          debuggingExercise: {
            prompt: 'This program crashes. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int *p;
    *p = 42;
    printf("%d\\n", *p);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int x = 0;
    int *p = &x;
    *p = 42;
    printf("%d\\n", *p);
    return 0;
}`,
            explanation: 'p was uninitialized, so it held a random address and writing through it crashed. Pointing p at a real variable x makes the dereference safe.'
          },
          miniChallenge: 'Write a program that declares two ints, swaps their values using a pointer to each, and prints the result.',
          summary: 'Pointers store addresses; & takes an address and * follows it. Never dereference an uninitialized or NULL pointer. Next: using pointers to change caller variables.',
          knowledgeCheck: [
            q('What does int *p = &x; make p hold?', ['The value of x', 'The address of x', 'A copy of x', 'Nothing'], 1, 'p is a pointer to int initialized with the address of x.'),
            q('What does *p = 100; do when p points to x?', ['Changes p itself to 100', 'Changes x to 100', 'Prints 100', 'Creates a new variable'], 1, 'Dereferencing p and assigning writes to the memory p points at, which is x.')
          ],
          exercises: [
            ex('c-m10-l1-e1', 'Swap with pointers', 'write-code', 'Read two integers and print them in swapped order. Implement void swap(int *a, int *b) that exchanges the values, and call it from main.',
              '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // swap the values *a and *b\n}\n\nint main(void) {\n    int x, y;\n    scanf("%d %d", &x, &y);\n    swap(&x, &y);\n    printf("%d %d\\n", x, y);\n    return 0;\n}',
              '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main(void) {\n    int x, y;\n    scanf("%d %d", &x, &y);\n    swap(&x, &y);\n    printf("%d %d\\n", x, y);\n    return 0;\n}',
              'A temporary variable holds *a while the values are exchanged through the pointers.',
              'O(1)', [tc('swap 3 and 9', '3 9\n', '9 3'), tc('swap equal', '5 5\n', '5 5', true)], h5(
                'To change caller variables, a function needs pointers to them.',
                'Save *a in a temp, assign *b to *a, then assign temp to *b.',
                'int temp = *a; *a = *b; *b = temp;',
                'If the values do not change, check main passes &x and &y, not x and y.',
                'Solution: int temp = *a; *a = *b; *b = temp; Input 3 9 prints "9 3".'))
          ]
        },
        {
          id: 'c-m10-l2',
          slug: 'pointer-arithmetic-arrays',
          title: 'Pointer Arithmetic and Pointers with Arrays',
          objectives: ['Move pointers with arithmetic', 'Explain the equivalence of pointers and array indexing', 'Use pointers to traverse strings and arrays'],
          introduction: 'Pointers can move: adding 1 to an int pointer advances it to the next integer. This lesson connects pointer arithmetic with arrays and shows how to walk through memory safely.',
          concept: 'Pointer arithmetic moves by the size of the pointed-to type, not by one byte: if p is an int * and ints are 4 bytes, then p + 1 points 4 bytes ahead, at the next int. This is why arrays and pointers are so closely linked: for int a[5], the expression a decays to &a[0], a + i is the address of element i, and *(a + i) is exactly the same as a[i]. You can traverse an array with a pointer loop, incrementing the pointer until it reaches one past the last element, which is a valid pointer to compare against but must never be dereferenced. Pointer subtraction gives the number of elements between two pointers, not the byte distance. Comparisons between pointers are meaningful only within the same array or object. Going beyond the array bounds with pointer arithmetic is undefined behaviour, just like out-of-bounds indexing, so keep pointers inside the object they belong to.',
          syntax: 'int a[3] = {10, 20, 30};\nint *p = a;\nprintf("%d\\n", *(p + 1)); // 20\nfor (int *q = a; q < a + 3; q++) printf("%d\\n", *q);',
          analogy: 'Pointer arithmetic is like stepping between houses on a street: each step moves one whole house, not one brick, because the step size matches the house size.',
          exampleCode: `#include <stdio.h>

int main(void) {
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;
    printf("a[2] = %d, *(p + 2) = %d\\n", a[2], *(p + 2));
    int sum = 0;
    for (int *q = a; q < a + 5; q++) {
        sum += *q;
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare a five-element array and point p at its first element.', 'Show that a[2] and *(p + 2) are the same value, 30.', 'Walk a pointer q from a to a + 5, adding each element to sum.', 'The loop stops at one past the last element without dereferencing it.', 'Print the sum, 150.'],
          commonMistakes: ['Adding bytes instead of elements when doing pointer arithmetic', 'Dereferencing the one-past-the-end pointer', 'Comparing pointers from different arrays'],
          debuggingExercise: {
            prompt: 'This loop prints garbage after the last element. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int a[3] = {1, 2, 3};
    for (int *p = a; p <= a + 3; p++) {
        printf("%d\\n", *p);
    }
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int a[3] = {1, 2, 3};
    for (int *p = a; p < a + 3; p++) {
        printf("%d\\n", *p);
    }
    return 0;
}`,
            explanation: 'a + 3 is one past the last element, and <= included it, dereferencing out-of-bounds memory. Using < stops at a + 2, the last valid element.'
          },
          miniChallenge: 'Write a program that uses a pointer to print an array in reverse order.',
          summary: 'Pointer arithmetic steps by element size, and *(p + i) is a[i]. Traversal loops stop at one past the end without dereferencing it. Next module: grouping data with structs.',
          knowledgeCheck: [
            q('If int *p points to a[0] of an int array, what does *(p + 2) give?', ['a[0]', 'a[1]', 'a[2]', 'The address of a[2]'], 2, 'p + 2 points at the third element, and dereferencing gives its value, a[2].'),
            q('What does p + 1 mean for an int pointer p?', ['One byte ahead', 'One int ahead, typically 4 bytes', 'The value of *p plus one', 'The next pointer variable'], 1, 'Pointer arithmetic scales by the size of the pointed-to type.')
          ],
          exercises: [
            ex('c-m10-l2-e1', 'Reverse an array', 'write-code', 'Read 5 integers into an array and print them in reverse order, separated by spaces, on one line.',
              '#include <stdio.h>\n\nint main(void) {\n    int a[5];\n    // read 5 numbers, print them in reverse\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int a[5];\n    for (int i = 0; i < 5; i++) scanf("%d", &a[i]);\n    int *p = a + 4;\n    for (int i = 0; i < 5; i++) {\n        printf("%d", *p);\n        if (i < 4) printf(" ");\n        p--;\n    }\n    printf("\\n");\n    return 0;\n}',
              'A pointer starting at the last element and moving backwards prints the array in reverse.',
              'O(n)', [tc('reverse 1..5', '1 2 3 4 5\n', '5 4 3 2 1'), tc('reverse same', '7 7 7 7 7\n', '7 7 7 7 7', true)], h5(
                'Start a pointer at the last element and move it backwards.',
                'Set p = a + 4, then loop five times printing *p and doing p--.',
                'int *p = a + 4; for (int i = 0; i < 5; i++) { printf("%d", *p); p--; }',
                'Watch the spacing: print a space between numbers but not after the last one.',
                'Solution: p starts at a + 4 and decrements each step. Input 1 2 3 4 5 prints "5 4 3 2 1".'))
          ]
        }
      ]
    },
    {
      id: 'c-m11',
      title: 'Structures and Enumerations',
      description: 'Grouping related data with structs, unions, and enums.',
      level: 'beginner',
      order: 11,
      lessons: [
        {
          id: 'c-m11-l1',
          slug: 'structs',
          title: 'Structures: Grouping Related Data',
          objectives: ['Define and use a struct', 'Access members with . and ->', 'Pass structs to functions by pointer'],
          introduction: 'Arrays hold many values of one type; structs hold values of different types that belong together, like a point with x and y, or a student with a name and a grade. This lesson introduces struct definitions and member access.',
          concept: 'A struct groups variables of different types under one name. Declaring struct Point { int x; int y; }; creates a new type, and struct Point p = {3, 4}; creates a variable with its members initialized in order. Members are accessed with the dot operator, p.x, and through a pointer with the arrow operator, ptr->x, which is shorthand for (*ptr).x. Structs are copied by value when assigned or passed to a function, which is convenient for small structs but wasteful for large ones, so large structs are usually passed by pointer. A struct can contain arrays, other structs, and pointers, letting you model real entities such as a Book with a title, an author, and a price. The sizeof a struct is at least the sum of its members, and the compiler may insert padding between members for alignment. Using typedef, as in typedef struct { ... } Point;, lets you write Point instead of struct Point.',
          syntax: 'struct Point { int x; int y; };\nstruct Point p = {3, 4};\nprintf("%d\\n", p.x);\nstruct Point *ptr = &p;\nptr->x = 10;',
          analogy: 'A struct is like a form with labelled fields: name, age, and grade each have their own box, but the whole form is one document you can hand to someone.',
          exampleCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[30];
    int age;
    double grade;
} Student;

void print_student(const Student *s) {
    printf("%s, age %d, grade %.1f\\n", s->name, s->age, s->grade);
}

int main(void) {
    Student s;
    strcpy(s.name, "Ada");
    s.age = 20;
    s.grade = 9.5;
    print_student(&s);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define a Student struct with a name, age, and grade using typedef.', 'Create a student and fill in the fields.', 'Pass the student by pointer to print_student.', 'Access members through the pointer with ->.', 'Print the student record.'],
          commonMistakes: ['Forgetting the semicolon after the closing brace of a struct definition', 'Using . on a pointer instead of ->', 'Passing a large struct by value and paying the copy cost'],
          debuggingExercise: {
            prompt: 'This program fails to compile. Fix it.',
            buggyCode: `#include <stdio.h>

struct Point { int x; int y; };

int main(void) {
    struct Point p = {3, 4};
    struct Point *ptr = &p;
    printf("%d\\n", ptr.x);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

struct Point { int x; int y; };

int main(void) {
    struct Point p = {3, 4};
    struct Point *ptr = &p;
    printf("%d\\n", ptr->x);
    return 0;
}`,
            explanation: 'ptr is a pointer, so its members are accessed with ->, not .. The expression ptr->x is shorthand for (*ptr).x.'
          },
          miniChallenge: 'Define a struct Rectangle with width and height, and write a function that returns its area.',
          summary: 'Structs bundle different types into one value; . accesses members of a value and -> accesses members through a pointer. Pass large structs by pointer. Next: enums and unions.',
          knowledgeCheck: [
            q('How do you access a member through a struct pointer ptr?', ['ptr.member', 'ptr->member', 'ptr::member', '*ptr.member'], 1, 'The arrow operator accesses members through a pointer.'),
            q('What does the semicolon after a struct definition do?', ['It ends the type definition', 'It declares a variable', 'It is optional', 'It starts a function'], 0, 'A struct definition is a declaration and needs a terminating semicolon.')
          ],
          exercises: [
            ex('c-m11-l1-e1', 'Point distance', 'write-code', 'Read four integers x1 y1 x2 y2 and print the Manhattan distance |x1 - x2| + |y1 - y2|. Define a struct Point and use it in your solution.',
              '#include <stdio.h>\n#include <stdlib.h>\n\nstruct Point { int x; int y; };\n\nint main(void) {\n    struct Point a, b;\n    // read a.x a.y b.x b.y, print Manhattan distance\n    return 0;\n}',
              '#include <stdio.h>\n#include <stdlib.h>\n\nstruct Point { int x; int y; };\n\nint main(void) {\n    struct Point a, b;\n    scanf("%d %d %d %d", &a.x, &a.y, &b.x, &b.y);\n    int dist = abs(a.x - b.x) + abs(a.y - b.y);\n    printf("%d\\n", dist);\n    return 0;\n}',
              'Read the two points into structs and add the absolute differences of the coordinates.',
              'O(1)', [tc('distance (0,0) to (3,4)', '0 0 3 4\n', '7'), tc('same point', '2 2 2 2\n', '0', true)], h5(
                'Manhattan distance adds the absolute differences of x and y.',
                'Read into struct Points, then compute abs(a.x - b.x) + abs(a.y - b.y).',
                'int dist = abs(a.x - b.x) + abs(a.y - b.y); printf("%d\\n", dist);',
                'If the distance is negative, you forgot abs on one of the differences.',
                'Solution: dist = abs(a.x - b.x) + abs(a.y - b.y). From (0,0) to (3,4) the distance is 7.'))
          ]
        },
        {
          id: 'c-m11-l2',
          slug: 'enums-unions',
          title: 'Enumerations and Unions',
          objectives: ['Define enums for named constants', 'Use enums in switch statements', 'Explain when a union is appropriate'],
          introduction: 'Magic numbers like 0, 1, and 2 make code hard to read. Enums give names to related constants, and unions let different types share the same memory. This lesson covers both.',
          concept: 'An enum defines a set of named integer constants, as in enum Color { RED, GREEN, BLUE };, where RED is 0, GREEN is 1, and BLUE is 2 unless you assign explicit values. Enums make code self-documenting: enum Day { MON, TUE, WED } is far clearer than bare numbers, and the compiler can warn when a switch over an enum misses a case. You can assign values explicitly, such as enum HttpStatus { OK = 200, NOT_FOUND = 404 };, and enum constants are ints in C, so they can be compared and printed with %d. A union is different: its members share the same memory, so only one member holds a valid value at a time, and the union is as large as its biggest member. Unions are useful for variant data, such as a value that may be an int or a float, and they are often paired with an enum tag that records which member is currently valid.',
          syntax: 'enum Color { RED, GREEN, BLUE };\nenum Color c = RED;\nunion Value { int i; float f; };\nunion Value v;\nv.i = 42;',
          analogy: 'An enum is like a menu with named dishes instead of numbers: ordering "the soup" is clearer than ordering "item 3". A union is like a single drawer that can hold either socks or shirts, but not both at once.',
          exampleCode: `#include <stdio.h>

enum TrafficLight { RED, YELLOW, GREEN };

const char *light_name(enum TrafficLight t) {
    switch (t) {
        case RED: return "Stop";
        case YELLOW: return "Slow down";
        case GREEN: return "Go";
        default: return "Unknown";
    }
}

int main(void) {
    printf("%s\\n", light_name(GREEN));
    printf("RED = %d, GREEN = %d\\n", RED, GREEN);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define an enum with RED, YELLOW, and GREEN.', 'Write a function that maps each light to an action string.', 'Call it with GREEN and print "Go".', 'Print the numeric values of RED and GREEN.', 'Note that enums are ints, so they print with %d.'],
          commonMistakes: ['Assuming enum values start at 1 instead of 0', 'Reading a union member other than the one last written', 'Forgetting that enums in C are just ints, with no type safety'],
          debuggingExercise: {
            prompt: 'This program prints the wrong action for YELLOW. Fix it.',
            buggyCode: `#include <stdio.h>

enum TrafficLight { RED, YELLOW, GREEN };

int main(void) {
    enum TrafficLight t = YELLOW;
    if (t == 1) printf("Go\\n");
    else printf("Stop\\n");
    return 0;
}`,
            fixedCode: `#include <stdio.h>

enum TrafficLight { RED, YELLOW, GREEN };

int main(void) {
    enum TrafficLight t = YELLOW;
    if (t == YELLOW) printf("Slow down\\n");
    else if (t == GREEN) printf("Go\\n");
    else printf("Stop\\n");
    return 0;
}`,
            explanation: 'The code compared against the magic number 1 and printed the wrong action. Comparing against the named constant YELLOW is both correct and readable.'
          },
          miniChallenge: 'Define an enum for the four seasons and write a program that reads a month number and prints the season.',
          summary: 'Enums name related integer constants, making code readable and switch statements safer. Unions share memory between members and need a tag to track which member is valid. Next module: your first beginner projects.',
          knowledgeCheck: [
            q('What value does the first enumerator of enum Color { RED, GREEN, BLUE } have?', ['1', '0', '-1', 'It has no value'], 1, 'Enumerators start at 0 by default unless assigned explicitly.'),
            q('What is true of a union?', ['All members hold values at once', 'Members share the same memory', 'It is larger than all members combined', 'It cannot hold ints'], 1, 'Union members overlap in memory, so only one is valid at a time.')
          ],
          exercises: [
            ex('c-m11-l2-e1', 'Traffic light action', 'write-code', 'Read an integer 0, 1, or 2 and print "stop", "slow", or "go" respectively. Use an enum TrafficLight in your solution. For other input print "invalid".',
              '#include <stdio.h>\n\nenum TrafficLight { RED, YELLOW, GREEN };\n\nint main(void) {\n    int n;\n    // read n, print the action\n    return 0;\n}',
              '#include <stdio.h>\n\nenum TrafficLight { RED, YELLOW, GREEN };\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    switch (n) {\n        case RED: printf("stop\\n"); break;\n        case YELLOW: printf("slow\\n"); break;\n        case GREEN: printf("go\\n"); break;\n        default: printf("invalid\\n"); break;\n    }\n    return 0;\n}',
              'The enum values are 0, 1, 2, matching the input; a switch maps each to its action.',
              'O(1)', [tc('green means go', '2\n', 'go'), tc('yellow means slow', '1\n', 'slow', true)], h5(
                'RED is 0, YELLOW is 1, GREEN is 2 in the enum.',
                'Use a switch on the input with a case per enum value and a default.',
                'switch (n) { case RED: printf("stop\\n"); break; case YELLOW: ... }',
                'If 1 prints "stop", check the case labels match the enum order.',
                'Solution: switch on n with cases RED, YELLOW, GREEN and a default printing "invalid". Input 2 prints "go".'))
          ]
        }
      ]
    },
    {
      id: 'c-m12',
      title: 'Beginner Projects',
      description: 'Putting it all together: a number guessing game and a simple calculator.',
      level: 'beginner',
      order: 12,
      lessons: [
        {
          id: 'c-m12-l1',
          slug: 'number-guessing-game',
          title: 'Project: Number Guessing Game',
          objectives: ['Generate random numbers with rand and srand', 'Build an interactive loop with feedback', 'Track attempts and report the result'],
          introduction: 'Time to build something complete. In this project you will write a number guessing game: the computer picks a secret number, the player guesses, and the program gives "too high" or "too low" hints until the player wins.',
          concept: 'Random numbers in C come from rand(), which returns a pseudo-random integer between 0 and RAND_MAX. Seeding with srand(time(NULL)) makes each run different, because the current time changes; without seeding, rand produces the same sequence every run. To get a number in a range, use rand() % 100 + 1 for 1 to 100. The game loop reads a guess, compares it with the secret, prints a hint, and counts attempts until the guess is correct or the player quits. Structuring the game as a function, such as int play_game(void), keeps main small and makes the logic testable. Input validation matters: if the user types a letter, scanf fails and leaves the bad input in the buffer, so a robust game checks the return value and clears the input. The same loop-and-feedback pattern appears in many interactive programs, from quizzes to menus.',
          syntax: '#include <stdlib.h>\n#include <time.h>\nsrand((unsigned)time(NULL));\nint secret = rand() % 100 + 1;',
          analogy: 'The game loop is like a game of "hot or cold": each guess is a step, and the hints tell you whether you are getting warmer.',
          exampleCode: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned)time(NULL));
    int secret = rand() % 100 + 1;
    int guess = 0;
    int attempts = 0;
    printf("Guess a number from 1 to 100:\\n");
    while (1) {
        if (scanf("%d", &guess) != 1) break;
        attempts++;
        if (guess == secret) {
            printf("Correct! You won in %d attempts.\\n", attempts);
            break;
        } else if (guess < secret) {
            printf("Too low.\\n");
        } else {
            printf("Too high.\\n");
        }
    }
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Seed the random generator with the current time.', 'Pick a secret number from 1 to 100.', 'Loop reading guesses with scanf.', 'Compare each guess and print a hint.', 'When the guess matches, print the attempt count and break.'],
          commonMistakes: ['Forgetting srand, so the secret is the same every run', 'Using rand() % 100 without + 1 and getting 0 to 99', 'Not checking scanf return value, so bad input loops forever'],
          debuggingExercise: {
            prompt: 'This game always picks the same secret number. Fix it.',
            buggyCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int secret = rand() % 100 + 1;
    printf("Secret: %d\\n", secret);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned)time(NULL));
    int secret = rand() % 100 + 1;
    printf("Secret: %d\\n", secret);
    return 0;
}`,
            explanation: 'rand without srand uses the default seed 1 every run, so the sequence is identical. Seeding with the current time makes each run different.'
          },
          miniChallenge: 'Add a limit of 10 attempts to the game and print "Game over" when the player runs out.',
          summary: 'You built a complete interactive game using rand, srand, loops, and conditionals. The loop-and-feedback pattern is the backbone of interactive programs. Next: the calculator project.',
          knowledgeCheck: [
            q('Why do we call srand(time(NULL)) before rand()?', ['To make rand faster', 'To seed the generator so each run differs', 'To limit rand to 100', 'To print the time'], 1, 'Seeding with the current time makes the pseudo-random sequence different on each run.'),
            q('What range does rand() % 100 + 1 produce?', ['0 to 99', '1 to 100', '0 to 100', '1 to 99'], 1, 'rand() % 100 gives 0 to 99, and adding 1 shifts it to 1 to 100.')
          ],
          exercises: [
            ex('c-m12-l1-e1', 'Guess the number (deterministic)', 'write-code', 'Read a secret number and a guess, then print "correct", "too low", or "too high". This is the core comparison logic of the guessing game.',
              '#include <stdio.h>\n\nint main(void) {\n    int secret, guess;\n    // read secret and guess, print the hint\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int secret, guess;\n    scanf("%d %d", &secret, &guess);\n    if (guess == secret) printf("correct\\n");\n    else if (guess < secret) printf("too low\\n");\n    else printf("too high\\n");\n    return 0;\n}',
              'Compare the guess with the secret and print the matching hint.',
              'O(1)', [tc('too low', '50 30\n', 'too low'), tc('correct', '50 50\n', 'correct', true)], h5(
                'Three outcomes need three branches: equal, less than, greater than.',
                'Use if/else if/else comparing guess with secret.',
                'if (guess == secret) ... else if (guess < secret) ... else ...',
                'If "too high" prints for a low guess, the comparison is backwards.',
                'Solution: if (guess == secret) print "correct"; else if (guess < secret) print "too low"; else print "too high".'))
          ]
        },
        {
          id: 'c-m12-l2',
          slug: 'calculator-project',
          title: 'Project: Simple Calculator',
          objectives: ['Parse an operator and two operands', 'Dispatch operations with a switch', 'Handle division by zero gracefully'],
          introduction: 'The second beginner project is a calculator: read two numbers and an operator, compute the result, and handle errors like division by zero. It combines input, switch, functions, and error handling in one small program.',
          concept: 'A calculator reads an expression such as 12 + 5. The operator is a single character, so it can be read with scanf(" %c", &op), where the space before %c skips whitespace including the newline left by earlier input. A switch on the operator dispatches to the right arithmetic, and each case sets a result variable. Division needs a guard: dividing by zero with integers crashes the program, and with doubles it produces infinity, so the program checks the divisor first and prints an error instead. Splitting the work into a function like double calculate(double a, char op, double b) separates the math from the input and output, making it easy to test. A loop around the whole interaction turns the calculator into a REPL that keeps accepting expressions until the user enters q, which is the same pattern used by shells and database clients.',
          syntax: 'char op;\nscanf(" %c", &op);\nswitch (op) {\n    case \'+\': result = a + b; break;\n    case \'/\': if (b == 0) { /* error */ } break;\n}',
          analogy: 'A calculator is like a vending machine for arithmetic: you insert two numbers and press an operator button, and it dispenses the result.',
          exampleCode: `#include <stdio.h>

int main(void) {
    double a, b;
    char op;
    printf("Enter expression (e.g. 12 + 5): ");
    if (scanf("%lf %c %lf", &a, &op, &b) != 3) {
        printf("Invalid input.\\n");
        return 1;
    }
    switch (op) {
        case '+': printf("%.2f\\n", a + b); break;
        case '-': printf("%.2f\\n", a - b); break;
        case '*': printf("%.2f\\n", a * b); break;
        case '/':
            if (b == 0) printf("Error: division by zero.\\n");
            else printf("%.2f\\n", a / b);
            break;
        default: printf("Unknown operator.\\n"); break;
    }
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Read a number, an operator, and a number with one scanf.', 'Check that three items were read.', 'Switch on the operator to pick the arithmetic.', 'Guard division against a zero divisor.', 'Print the result with two decimal places.'],
          commonMistakes: ['Reading %c without a leading space, so it reads the leftover newline', 'Forgetting the division-by-zero check', 'Using %d to read doubles'],
          debuggingExercise: {
            prompt: 'This calculator always reports "Unknown operator". Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    double a, b;
    char op;
    scanf("%lf %c %lf", &a, &op, &b);
    switch (op) {
        case '+': printf("%.2f\\n", a + b); break;
        default: printf("Unknown operator.\\n"); break;
    }
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    double a, b;
    char op;
    scanf("%lf %c %lf", &a, &op, &b);
    switch (op) {
        case '+': printf("%.2f\\n", a + b); break;
        case '-': printf("%.2f\\n", a - b); break;
        case '*': printf("%.2f\\n", a * b); break;
        case '/': printf("%.2f\\n", a / b); break;
        default: printf("Unknown operator.\\n"); break;
    }
    return 0;
}`,
            explanation: 'The original program was actually correct for +; the real bug in the exercise as written is that only + was handled. The fix adds the missing cases so -, *, and / are recognized instead of falling to default.'
          },
          miniChallenge: 'Extend the calculator with a % operator for integers and a loop that keeps calculating until the user enters q.',
          summary: 'You built a calculator that parses an operator, dispatches with switch, and guards division by zero. This completes the beginner level: you can now write complete interactive C programs. Next: intermediate topics, starting with memory.',
          knowledgeCheck: [
            q('Why write scanf(" %c", &op) with a space before %c?', ['It is required by the compiler', 'The space skips whitespace, including a leftover newline', 'It reads two characters', 'It makes %c faster'], 1, 'Without the space, %c reads the next character immediately, which is often the newline from previous input.'),
            q('What should a calculator do when dividing by zero?', ['Crash', 'Print an error and continue', 'Return 0 silently', 'Divide anyway'], 1, 'Integer division by zero crashes; the program should detect it and report an error.')
          ],
          exercises: [
            ex('c-m12-l2-e1', 'Simple calculator', 'write-code', 'Read two doubles and a character operator (+, -, *, /) on one line, e.g. "12 + 5", and print the result with two decimal places. Assume the divisor is not zero.',
              '#include <stdio.h>\n\nint main(void) {\n    double a, b;\n    char op;\n    // read a op b, print the result\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    double a, b;\n    char op;\n    scanf("%lf %c %lf", &a, &op, &b);\n    double result = 0;\n    switch (op) {\n        case \'+\': result = a + b; break;\n        case \'-\': result = a - b; break;\n        case \'*\': result = a * b; break;\n        case \'/\': result = a / b; break;\n    }\n    printf("%.2f\\n", result);\n    return 0;\n}',
              'A switch on the operator computes the result, printed with %.2f.',
              'O(1)', [tc('12 + 5', '12 + 5\n', '17.00'), tc('10 / 4', '10 / 4\n', '2.50', true)], h5(
                'Read a number, an operator character, and a number with one scanf.',
                'Use scanf("%lf %c %lf", &a, &op, &b) then switch on op.',
                'switch (op) { case \'+\': result = a + b; break; ... } printf("%.2f\\n", result);',
                'If the operator reads as a space, add a space before %c in the format string.',
                'Solution: scanf("%lf %c %lf", &a, &op, &b); switch on op to compute result; print with %.2f. 12 + 5 gives 17.00.'))
          ]
        }
      ]
    },
    {
      id: 'c-m13',
      title: 'Memory',
      description: 'The stack and heap, malloc and free, and avoiding leaks.',
      level: 'intermediate',
      order: 13,
      lessons: [
        {
          id: 'c-m13-l1',
          slug: 'stack-vs-heap',
          title: 'Stack vs Heap: Where Memory Lives',
          objectives: ['Describe the stack, heap, and static storage', 'Explain the lifetime of each region', 'Choose the right region for a given need'],
          introduction: 'Every variable lives somewhere: the stack for short-lived locals, the heap for data whose size or lifetime you control, and static storage for globals. This lesson maps the memory layout of a C program.',
          concept: 'A running C program has several memory regions. The stack holds local variables and function call frames; it grows and shrinks automatically as functions are called and return, which makes it fast but limited in size, typically a few megabytes. The heap holds dynamically allocated memory that lives until you free it explicitly, which makes it flexible but slower and prone to leaks. Static storage holds global variables and static locals, which exist for the whole program run. The text segment holds the machine code, and read-only data holds string literals. A local array of a million ints can overflow the stack, while the same data on the heap works fine. Returning a pointer to a local variable is a classic bug: the stack frame disappears when the function returns, leaving a dangling pointer. Understanding these regions explains why some memory errors happen and how to avoid them.',
          syntax: 'int global = 1;          // static storage\nvoid f(void) {\n    int local = 2;      // stack\n    static int kept = 3; // static storage\n}',
          analogy: 'The stack is like a stack of cafeteria trays: you add and remove from the top in strict order. The heap is like a warehouse where you can rent any shelf for as long as you like, but you must remember to return the key.',
          exampleCode: `#include <stdio.h>

int global_count = 0;

void demo(void) {
    int stack_var = 10;
    static int call_count = 0;
    call_count++;
    printf("stack_var = %d, calls = %d\\n", stack_var, call_count);
}

int main(void) {
    demo();
    demo();
    printf("global_count = %d\\n", global_count);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['global_count lives in static storage for the whole run.', 'stack_var is created fresh on each call to demo.', 'call_count is static, so it keeps counting across calls.', 'Call demo twice and watch call_count go 1, 2.', 'Print the global to confirm it is accessible everywhere.'],
          commonMistakes: ['Returning a pointer to a local variable', 'Allocating a huge array on the stack and overflowing it', 'Assuming a local variable keeps its value between calls'],
          debuggingExercise: {
            prompt: 'This function returns a pointer that becomes invalid. Fix it.',
            buggyCode: `#include <stdio.h>

int *make_value(void) {
    int x = 42;
    return &x;
}

int main(void) {
    int *p = make_value();
    printf("%d\\n", *p);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <stdlib.h>

int *make_value(void) {
    int *p = malloc(sizeof(int));
    if (p == NULL) return NULL;
    *p = 42;
    return p;
}

int main(void) {
    int *p = make_value();
    printf("%d\\n", *p);
    free(p);
    return 0;
}`,
            explanation: 'x lived on the stack frame of make_value, which is gone after the return. Allocating on the heap gives memory that survives the return, and the caller frees it.'
          },
          miniChallenge: 'Write a program that prints the addresses of a global, a local, and a heap allocation, and observe their ordering.',
          summary: 'The stack is automatic and short-lived, the heap is manual and flexible, and static storage lasts the whole run. Never return pointers to locals. Next: allocating heap memory with malloc.',
          knowledgeCheck: [
            q('What happens to a local variable when its function returns?', ['It is freed automatically', 'It stays forever', 'It moves to the heap', 'It becomes global'], 0, 'Locals live in the stack frame, which is reclaimed when the function returns.'),
            q('Which region holds dynamically allocated memory?', ['The stack', 'The heap', 'The text segment', 'A register'], 1, 'malloc allocates from the heap, and the memory lives until free is called.')
          ],
          exercises: [
            ex('c-m13-l1-e1', 'Static call counter', 'write-code', 'Read an integer n and print the numbers 1 to n, each on its own line, using a function that keeps a static counter. The function should return the next number each time it is called.',
              '#include <stdio.h>\n\nint next_number(void) {\n    static int current = 0;\n    return ++current;\n}\n\nint main(void) {\n    int n;\n    // read n, print next_number() n times\n    return 0;\n}',
              '#include <stdio.h>\n\nint next_number(void) {\n    static int current = 0;\n    return ++current;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    for (int i = 0; i < n; i++) {\n        printf("%d\\n", next_number());\n    }\n    return 0;\n}',
              'The static variable persists between calls, so each call returns the next integer.',
              'O(n)', [tc('count to 3', '3\n', '1\n2\n3'), tc('count to 1', '1\n', '1', true)], h5(
                'A static local keeps its value between calls to the function.',
                'Call next_number() inside a loop that runs n times and print each result.',
                'for (int i = 0; i < n; i++) printf("%d\\n", next_number());',
                'If every line prints 1, the counter is not static and is reset on each call.',
                'Solution: static int current = 0; return ++current; Calling it n times prints 1 through n.'))
          ]
        },
        {
          id: 'c-m13-l2',
          slug: 'malloc-free',
          title: 'malloc, calloc, realloc, and free',
          objectives: ['Allocate heap memory with malloc and calloc', 'Resize allocations with realloc', 'Free memory and avoid leaks and double-free'],
          introduction: 'Dynamic allocation lets a program request exactly as much memory as it needs at runtime. This lesson covers malloc, calloc, realloc, and free, plus the discipline that keeps heap code correct.',
          concept: 'malloc(size) requests size bytes from the heap and returns a pointer to them, or NULL if the request fails; the memory is uninitialized, so you must fill it before reading. calloc(count, size) allocates for count elements and zeroes them, which is safer for arrays. realloc(ptr, new_size) grows or shrinks an existing allocation, possibly moving it, and returns the new pointer, which you must store; using the old pointer after a successful realloc is a bug. free(ptr) returns memory to the heap, and after freeing, the pointer becomes dangling, so setting it to NULL prevents accidental use. Every malloc must have a matching free on every path, including error paths, or the program leaks memory. Common heap bugs include freeing the same pointer twice, writing past the end of an allocation, using memory after free, and forgetting to check for NULL. Tools like Valgrind and AddressSanitizer catch these bugs automatically.',
          syntax: 'int *a = malloc(n * sizeof(int));\nint *b = calloc(n, sizeof(int));\na = realloc(a, 2 * n * sizeof(int));\nfree(a);\na = NULL;',
          analogy: 'malloc is like borrowing a hotel room: you ask for the size you need, you get a key, and you must check out (free) when you leave, or the hotel runs out of rooms.',
          exampleCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *a = malloc(n * sizeof(int));
    if (a == NULL) {
        return 1;
    }
    for (int i = 0; i < n; i++) {
        a[i] = (i + 1) * 10;
    }
    int sum = 0;
    for (int i = 0; i < n; i++) sum += a[i];
    printf("Sum: %d\\n", sum);
    free(a);
    a = NULL;
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Allocate space for five ints with malloc.', 'Check for NULL, which means allocation failed.', 'Fill the array with 10, 20, 30, 40, 50.', 'Sum the elements to get 150.', 'Free the memory and set the pointer to NULL.'],
          commonMistakes: ['Forgetting to free, leaking memory', 'Freeing the same pointer twice', 'Using malloc without checking for NULL'],
          debuggingExercise: {
            prompt: 'This program leaks memory on the error path. Fix it.',
            buggyCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = malloc(10 * sizeof(int));
    if (a == NULL) return 1;
    FILE *f = fopen("missing.txt", "r");
    if (f == NULL) {
        return 1;
    }
    free(a);
    fclose(f);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = malloc(10 * sizeof(int));
    if (a == NULL) return 1;
    FILE *f = fopen("missing.txt", "r");
    if (f == NULL) {
        free(a);
        return 1;
    }
    free(a);
    fclose(f);
    return 0;
}`,
            explanation: 'When fopen failed, the function returned without freeing a. Every early return must release resources acquired before it.'
          },
          miniChallenge: 'Write a program that reads n, allocates an array of n ints with calloc, prints that all values start at 0, then frees the array.',
          summary: 'malloc and calloc allocate heap memory, realloc resizes it, and free returns it. Check for NULL, free on every path, and null the pointer after freeing. Next module: files.',
          knowledgeCheck: [
            q('What does malloc return when allocation fails?', ['0', 'NULL', 'A valid pointer', 'An error code'], 1, 'malloc returns NULL on failure, which is why the result must be checked.'),
            q('What is the difference between malloc and calloc?', ['calloc zeroes the memory', 'malloc is faster to type', 'calloc cannot fail', 'malloc zeroes the memory'], 0, 'calloc allocates and zero-initializes the memory; malloc leaves it uninitialized.')
          ],
          exercises: [
            ex('c-m13-l2-e1', 'Dynamic array sum', 'write-code', 'Read n, then n integers, and print their sum. Allocate the array with malloc and free it before exiting.',
              '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    // read n, allocate, read n numbers, print sum, free\n    return 0;\n}',
              '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    int *a = malloc(n * sizeof(int));\n    if (a == NULL) return 1;\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        scanf("%d", &a[i]);\n        sum += a[i];\n    }\n    printf("%d\\n", sum);\n    free(a);\n    return 0;\n}',
              'malloc allocates exactly n ints; the loop reads and sums them, then free releases the memory.',
              'O(n)', [tc('sum 3 numbers', '3\n1 2 3\n', '6'), tc('sum 1 number', '1\n42\n', '42', true)], h5(
                'Use malloc to get an array whose size is only known at runtime.',
                'Allocate n ints, loop to read each one and add it to sum, then free the array.',
                'int *a = malloc(n * sizeof(int)); ... free(a);',
                'If the program crashes, check malloc was given n * sizeof(int) and the result was not NULL.',
                'Solution: malloc(n * sizeof(int)), read and sum n values, print sum, free(a). Input 3 then 1 2 3 gives 6.'))
          ]
        }
      ]
    },
    {
      id: 'c-m14',
      title: 'File Handling',
      description: 'Opening, reading, and writing files with the C standard library.',
      level: 'intermediate',
      order: 14,
      lessons: [
        {
          id: 'c-m14-l1',
          slug: 'reading-files',
          title: 'Opening and Reading Files',
          objectives: ['Open files with fopen and check for errors', 'Read text line by line with fgets', 'Read formatted data with fscanf'],
          introduction: 'Files let programs persist data beyond a single run. This lesson covers opening files, reading them line by line or with formatted input, and handling the errors that occur when a file is missing.',
          concept: 'fopen(path, mode) opens a file and returns a FILE pointer, or NULL on failure. The mode "r" opens for reading, "w" creates or truncates for writing, and "a" appends. Always check for NULL and report the error, for example with perror, which prints a message describing why the open failed. fgets reads one line at a time from a file, which is the safest way to process text, and it returns NULL at end of file. fscanf works like scanf but reads from a file, and its return value tells you how many items were read. feof tests whether the end-of-file indicator is set, but the correct loop pattern is to test the read function itself, because feof only becomes true after a read has already failed. Every file you open must be closed with fclose, which flushes buffers and releases the handle. Forgetting to close files can lose buffered data and exhaust the limit on open files.',
          syntax: 'FILE *f = fopen("data.txt", "r");\nif (f == NULL) { perror("fopen"); return 1; }\nchar line[256];\nwhile (fgets(line, sizeof line, f) != NULL) { printf("%s", line); }\nfclose(f);',
          analogy: 'Opening a file is like opening a book: fopen finds the book, the FILE pointer is your bookmark, and fclose puts the book back on the shelf.',
          exampleCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("notes.txt", "r");
    if (f == NULL) {
        perror("fopen");
        return 1;
    }
    char line[256];
    int count = 0;
    while (fgets(line, sizeof line, f) != NULL) {
        count++;
    }
    printf("Lines: %d\\n", count);
    fclose(f);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Open notes.txt for reading.', 'Check for NULL and use perror to explain the failure.', 'Loop with fgets until it returns NULL at end of file.', 'Count each line read.', 'Close the file and print the count.'],
          commonMistakes: ['Using while (!feof(f)) to control a read loop, which processes the last item twice', 'Forgetting to check fopen for NULL', 'Forgetting fclose and losing buffered output'],
          debuggingExercise: {
            prompt: 'This program prints the last line twice. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("data.txt", "r");
    char line[256];
    while (!feof(f)) {
        fgets(line, sizeof line, f);
        printf("%s", line);
    }
    fclose(f);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("data.txt", "r");
    if (f == NULL) return 1;
    char line[256];
    while (fgets(line, sizeof line, f) != NULL) {
        printf("%s", line);
    }
    fclose(f);
    return 0;
}`,
            explanation: 'feof only becomes true after a failed read, so the loop ran once more and printed the stale buffer. Testing fgets directly stops exactly at end of file.'
          },
          miniChallenge: 'Write a program that counts the words in a file by reading it with fscanf and the %s specifier.',
          summary: 'fopen opens files, fgets reads lines safely, and fclose closes the file. Test the read function, not feof, to detect end of file. Next: writing files.',
          knowledgeCheck: [
            q('What does fopen return when the file cannot be opened?', ['NULL', '0', 'An empty FILE', 'An error code'], 0, 'fopen returns NULL on failure, so the result must be checked before use.'),
            q('Why is while (!feof(f)) a bad loop condition?', ['It is too slow', 'feof only becomes true after a failed read, so the last item is processed twice', 'It never ends', 'It skips the first line'], 1, 'The end-of-file flag is set by a read attempt that hits the end, so the loop runs one extra time.')
          ],
          exercises: [
            ex('c-m14-l1-e1', 'Count numbers in input', 'write-code', 'Read integers from stdin until end of input and print how many were read. Hint: loop on the return value of scanf.',
              '#include <stdio.h>\n\nint main(void) {\n    int count = 0;\n    int x;\n    // read ints until EOF, print the count\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int count = 0;\n    int x;\n    while (scanf("%d", &x) == 1) {\n        count++;\n    }\n    printf("%d\\n", count);\n    return 0;\n}',
              'scanf returns 1 for each integer read and EOF at end of input; counting the successes gives the total.',
              'O(n)', [tc('four numbers', '1 2 3 4\n', '4'), tc('no numbers', '', '0', true)], h5(
                'scanf returns the number of items it read, or EOF at end of input.',
                'Loop while scanf returns 1, incrementing a counter each time.',
                'while (scanf("%d", &x) == 1) count++;',
                'If the count is one too many, check the loop tests the scanf return value directly.',
                'Solution: while (scanf("%d", &x) == 1) count++; printf("%d\\n", count); Input "1 2 3 4" gives 4.'))
          ]
        },
        {
          id: 'c-m14-l2',
          slug: 'writing-files',
          title: 'Writing Files and Binary I/O',
          objectives: ['Write text with fprintf and fputs', 'Write and read binary data with fwrite and fread', 'Use fseek to move within a file'],
          introduction: 'Reading is only half of file handling. This lesson covers writing text with fprintf, binary I/O with fwrite and fread, and random access with fseek for files you need to revisit.',
          concept: 'fprintf writes formatted text to a file exactly like printf writes to the screen, and fputs writes a plain string. Opening with "w" truncates an existing file, while "a" appends to the end, so choose carefully or you will erase data. Output is buffered, which means data sits in memory until the buffer fills or the file is closed, so fclose is essential to flush the last bytes. Binary I/O with fwrite writes raw bytes of a struct or array directly, and fread reads them back; binary files are compact and fast, but they are not portable across machines with different endianness or struct padding. fseek moves the file position, letting you jump to a record by offset, and ftell reports the current position. The mode "r+" opens for both reading and writing without truncating. Always check the return values of fwrite and fread: a short count means the disk is full or the file ended early.',
          syntax: 'FILE *f = fopen("out.txt", "w");\nfprintf(f, "Score: %d\\n", 42);\nfwrite(data, sizeof(int), n, f);\nfseek(f, 0, SEEK_SET);',
          analogy: 'Text files are like letters: readable by anyone. Binary files are like sealed parcels: compact and efficient, but only the sender and receiver know how to unpack them.',
          exampleCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("scores.txt", "w");
    if (f == NULL) return 1;
    int scores[3] = {90, 80, 70};
    for (int i = 0; i < 3; i++) {
        fprintf(f, "%d\\n", scores[i]);
    }
    fclose(f);

    f = fopen("scores.txt", "r");
    if (f == NULL) return 1;
    int total = 0, v;
    while (fscanf(f, "%d", &v) == 1) total += v;
    printf("Total: %d\\n", total);
    fclose(f);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Open scores.txt for writing.', 'Write three scores, one per line, with fprintf.', 'Close the file to flush the buffer.', 'Reopen it for reading and sum the values with fscanf.', 'Print the total, 240.'],
          commonMistakes: ['Opening with "w" when you meant "a" and erasing the file', 'Forgetting fclose so buffered output is lost', 'Using fprintf for binary data, which corrupts it'],
          debuggingExercise: {
            prompt: 'This program writes nothing to the file. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("out.txt", "w");
    fprintf(f, "hello\\n");
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("out.txt", "w");
    if (f == NULL) return 1;
    fprintf(f, "hello\\n");
    fclose(f);
    return 0;
}`,
            explanation: 'The program exited without fclose, and the buffered output was lost. Closing the file flushes the buffer and guarantees the data is written.'
          },
          miniChallenge: 'Write a program that copies a text file line by line to a new file, using fgets and fputs.',
          summary: 'fprintf and fputs write text, fwrite and fread handle binary data, and fseek enables random access. Close every file to flush buffers. Next module: advanced pointers.',
          knowledgeCheck: [
            q('What does opening a file with mode "w" do to an existing file?', ['Appends to it', 'Truncates it to empty', 'Leaves it unchanged', 'Deletes it permanently'], 1, '"w" creates the file or truncates it to zero length; use "a" to append.'),
            q('Why must you call fclose after writing?', ['To free the filename', 'To flush buffered output to disk', 'To delete the file', 'To print the file'], 1, 'Output is buffered, so fclose flushes the remaining data and releases the file handle.')
          ],
          exercises: [
            ex('c-m14-l2-e1', 'Write squares', 'write-code', 'Read n, then print the squares of 1 to n, one per line. (This mirrors writing computed values to an output stream.)',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n, print 1*1, 2*2, ..., n*n\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        printf("%d\\n", i * i);\n    }\n    return 0;\n}',
              'Loop i from 1 to n and print i * i each time.',
              'O(n)', [tc('squares to 4', '4\n', '1\n4\n9\n16'), tc('squares to 1', '1\n', '1', true)], h5(
                'The square of i is i * i.',
                'Loop i from 1 to n and print i * i on its own line.',
                'for (int i = 1; i <= n; i++) printf("%d\\n", i * i);',
                'If the first square is 0, the loop probably starts at i = 0.',
                'Solution: for (int i = 1; i <= n; i++) printf("%d\\n", i * i); For n = 4 the output is 1, 4, 9, 16.'))
          ]
        }
      ]
    },
    {
      id: 'c-m15',
      title: 'Advanced Pointers',
      description: 'Function pointers, void pointers, and pointers to pointers.',
      level: 'intermediate',
      order: 15,
      lessons: [
        {
          id: 'c-m15-l1',
          slug: 'function-pointers',
          title: 'Function Pointers and Callbacks',
          objectives: ['Declare and call function pointers', 'Pass functions as arguments to other functions', 'Build a simple callback system'],
          introduction: 'Functions can be treated as values: a pointer to a function lets you pass behaviour as an argument. This lesson shows how function pointers enable callbacks, sorting comparators, and plugin-style designs.',
          concept: 'A function pointer stores the address of a function. The declaration int (*cmp)(int, int); means cmp is a pointer to a function taking two ints and returning an int. You assign a function name to it, cmp = compare;, and call it like a normal function, cmp(3, 5). Function pointers are most often used as parameters: qsort takes a comparator function pointer so the same sort routine can order any type of data. A callback is a function you pass to another function so it can call you back when something happens, such as a button click or a completed download. Arrays of function pointers can implement dispatch tables, where an index selects the operation to run, which is cleaner than a long switch. The syntax is notoriously confusing, so typedef helps: typedef int (*Compare)(int, int); makes the type readable. Remember that a function pointer must match the signature exactly, including the return type and parameter types.',
          syntax: 'int (*op)(int, int);\nint add(int a, int b) { return a + b; }\nop = add;\nint result = op(3, 4); // 7',
          analogy: 'A function pointer is like a speed-dial entry: the button is not the person, but pressing it connects you to the right person every time.',
          exampleCode: `#include <stdio.h>
#include <stdlib.h>

int compare_desc(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return y - x;
}

int main(void) {
    int nums[5] = {3, 1, 4, 1, 5};
    qsort(nums, 5, sizeof(int), compare_desc);
    for (int i = 0; i < 5; i++) {
        printf("%d ", nums[i]);
    }
    printf("\\n");
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define a comparator that orders ints descending.', 'Pass it to qsort along with the array, count, and element size.', 'qsort calls the comparator whenever it needs to compare two elements.', 'Print the sorted array: 5 4 3 1 1.', 'Note the comparator receives void pointers that must be cast.'],
          commonMistakes: ['Writing int *f(int, int) when you mean int (*f)(int, int); the first declares a function returning a pointer', 'Passing a function with the wrong signature as a callback', 'Forgetting to cast void * arguments inside a qsort comparator'],
          debuggingExercise: {
            prompt: 'This code fails to compile with a confusing error. Fix it.',
            buggyCode: `#include <stdio.h>

int add(int a, int b) { return a + b; }

int main(void) {
    int *op(int, int);
    op = add;
    printf("%d\\n", op(3, 4));
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int add(int a, int b) { return a + b; }

int main(void) {
    int (*op)(int, int);
    op = add;
    printf("%d\\n", op(3, 4));
    return 0;
}`,
            explanation: 'int *op(int, int) declares a function returning int *, not a pointer to a function. Parentheses around *op make it a function pointer variable.'
          },
          miniChallenge: 'Write a program with an array of function pointers for add, subtract, multiply, and divide, and dispatch by an index read from input.',
          summary: 'Function pointers store the address of a function and let you pass behaviour as data. They power qsort comparators, callbacks, and dispatch tables. Next: void pointers and generic code.',
          knowledgeCheck: [
            q('What does int (*f)(int, int) declare?', ['A function returning a pointer', 'A pointer to a function taking two ints and returning int', 'An array of functions', 'A function with two int pointers'], 1, 'The parentheses make *f a pointer to a function with that signature.'),
            q('Why does qsort take a function pointer?', ['To make sorting slower', 'So the same sort can compare any data type', 'To avoid loops', 'To print the array'], 1, 'The comparator abstracts the ordering, so qsort works for any element type.')
          ],
          exercises: [
            ex('c-m15-l1-e1', 'Apply an operation', 'write-code', 'Read two integers and an operation code (0 = add, 1 = subtract, 2 = multiply). Print the result. Implement the operations as functions and select one through a function pointer array.',
              '#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\nint main(void) {\n    int a, b, code;\n    // read a, b, code; dispatch via function pointer array\n    return 0;\n}',
              '#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\nint main(void) {\n    int a, b, code;\n    scanf("%d %d %d", &a, &b, &code);\n    int (*ops[3])(int, int) = {add, sub, mul};\n    printf("%d\\n", ops[code](a, b));\n    return 0;\n}',
              'An array of function pointers maps the code to the operation; calling ops[code](a, b) runs it.',
              'O(1)', [tc('3 + 4', '3 4 0\n', '7'), tc('6 * 7', '6 7 2\n', '42', true)], h5(
                'Store the three operation functions in an array of function pointers.',
                'Declare int (*ops[3])(int, int) = {add, sub, mul}; then call ops[code](a, b).',
                'int (*ops[3])(int, int) = {add, sub, mul}; printf("%d\\n", ops[code](a, b));',
                'If the program crashes on code 2, check the array has three entries and code is 0, 1, or 2.',
                'Solution: ops[code](a, b) dispatches to add, sub, or mul. Input "6 7 2" gives 42.'))
          ]
        },
        {
          id: 'c-m15-l2',
          slug: 'void-pointers-double-pointers',
          title: 'void Pointers and Pointers to Pointers',
          objectives: ['Use void * for generic data', 'Cast void pointers safely', 'Use double pointers to modify a caller pointer'],
          introduction: 'A void pointer can point at any type, which makes generic functions possible, and a pointer to a pointer lets a function change the caller\'s pointer. This lesson covers both patterns and their pitfalls.',
          concept: 'A void * is a generic pointer: it can hold the address of any object, but it cannot be dereferenced or used in arithmetic without first casting it to a concrete type. This is how qsort and memcpy work for any data: they receive void * and a size, and the caller provides the type knowledge. Casting a void * to the wrong type and dereferencing it reinterprets the bytes incorrectly, which is a subtle bug. A double pointer, such as int **pp, points to a pointer, and it is the standard way for a function to allocate memory and hand the pointer back to the caller: void alloc(int **out, int n) sets *out = malloc(...). Double pointers also appear in arrays of strings, char *argv[], and in linked-list code that inserts at the head. When you see **, think "a pointer to a pointer", and dereference once to reach the inner pointer and twice to reach the value.',
          syntax: 'void *generic = &x;\nint *ip = (int *)generic;\nvoid alloc(int **out, int n) { *out = malloc(n * sizeof(int)); }\nchar *words[] = {"one", "two"};',
          analogy: 'A void pointer is like a blank envelope: it can hold any letter, but you must open it knowing what kind of letter is inside before you can read it.',
          exampleCode: `#include <stdio.h>
#include <stdlib.h>

void allocate(int **out, int n) {
    *out = malloc(n * sizeof(int));
}

int main(void) {
    int *arr = NULL;
    allocate(&arr, 3);
    if (arr == NULL) return 1;
    arr[0] = 7; arr[1] = 8; arr[2] = 9;
    void *generic = arr;
    int *back = (int *)generic;
    printf("%d %d %d\\n", back[0], back[1], back[2]);
    free(arr);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['allocate takes the address of a pointer so it can set the caller\'s pointer.', 'Call allocate(&arr, 3) to get three ints on the heap.', 'Fill the array with 7, 8, 9.', 'Store the address in a void * and cast it back to int *.', 'Print the values and free the memory.'],
          commonMistakes: ['Dereferencing a void * without casting', 'Passing a pointer instead of a pointer-to-pointer when a function must set the pointer', 'Forgetting that *out = malloc(...) sets the caller\'s pointer only if you pass &ptr'],
          debuggingExercise: {
            prompt: 'This allocation has no effect on the caller. Fix it.',
            buggyCode: `#include <stdio.h>
#include <stdlib.h>

void allocate(int *p, int n) {
    p = malloc(n * sizeof(int));
}

int main(void) {
    int *arr = NULL;
    allocate(arr, 3);
    printf("%p\\n", (void *)arr);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <stdlib.h>

void allocate(int **p, int n) {
    *p = malloc(n * sizeof(int));
}

int main(void) {
    int *arr = NULL;
    allocate(&arr, 3);
    printf("%p\\n", (void *)arr);
    free(arr);
    return 0;
}`,
            explanation: 'p was passed by value, so assigning to it inside allocate did not change arr. Passing &arr and assigning through *p updates the caller\'s pointer.'
          },
          miniChallenge: 'Write a generic swap function that swaps two memory regions of any type using void * and memcpy.',
          summary: 'void * enables generic code but must be cast before use, and double pointers let functions return allocated memory to the caller. Next module: the preprocessor.',
          knowledgeCheck: [
            q('Can you dereference a void * directly?', ['Yes, always', 'No, it must be cast to a concrete pointer type first', 'Only for ints', 'Only in C++'], 1, 'void * carries no type information, so it must be cast before dereferencing.'),
            q('Why does allocate take int **out instead of int *out?', ['To allocate twice as much', 'So it can change the caller\'s pointer', 'To make it faster', 'To avoid malloc'], 1, 'The function must write to the caller\'s pointer variable, which requires its address.')
          ],
          exercises: [
            ex('c-m15-l2-e1', 'Generic maximum', 'write-code', 'Read two integers and print the larger one, using a void * helper: void *larger(void *a, void *b) that returns a pointer to the larger int. Cast the result back to int * and dereference it.',
              '#include <stdio.h>\n\nvoid *larger(void *a, void *b) {\n    // return a pointer to the larger int\n    return a;\n}\n\nint main(void) {\n    int x, y;\n    scanf("%d %d", &x, &y);\n    int *p = (int *)larger(&x, &y);\n    printf("%d\\n", *p);\n    return 0;\n}',
              '#include <stdio.h>\n\nvoid *larger(void *a, void *b) {\n    int *ia = (int *)a;\n    int *ib = (int *)b;\n    return (*ia > *ib) ? ia : ib;\n}\n\nint main(void) {\n    int x, y;\n    scanf("%d %d", &x, &y);\n    int *p = (int *)larger(&x, &y);\n    printf("%d\\n", *p);\n    return 0;\n}',
              'Cast both void pointers to int *, compare the values, and return the winning pointer.',
              'O(1)', [tc('larger of 4 and 9', '4 9\n', '9'), tc('larger of 10 and 2', '10 2\n', '10', true)], h5(
                'Cast the void pointers to int * before dereferencing them.',
                'Compare *ia and *ib and return whichever pointer holds the larger value.',
                'int *ia = (int *)a; int *ib = (int *)b; return (*ia > *ib) ? ia : ib;',
                'If the answer is always the first number, check the comparison direction in the ternary.',
                'Solution: cast to int *, return the pointer to the larger value. Input "4 9" gives 9.'))
          ]
        }
      ]
    },
    {
      id: 'c-m16',
      title: 'Preprocessor',
      description: 'Macros, conditional compilation, and include guards.',
      level: 'intermediate',
      order: 16,
      lessons: [
        {
          id: 'c-m16-l1',
          slug: 'macros',
          title: 'Object and Function-Like Macros',
          objectives: ['Define constants with #define', 'Write safe function-like macros', 'Explain why macros are text substitution'],
          introduction: 'The preprocessor runs before compilation, transforming your source text. This lesson covers #define for constants and function-like macros, and the parentheses discipline that keeps them safe.',
          concept: 'The preprocessor is a text-processing step that runs before the compiler sees your code. #define PI 3.14159 replaces every occurrence of PI with the literal, which is useful for named constants, though modern code often prefers const variables or enums for type safety. A function-like macro such as #define MAX(a, b) ((a) > (b) ? (a) : (b)) looks like a function but is pure text substitution: the arguments are pasted into the body, so MAX(x++, y) increments x twice if it is the larger value. The defence is parentheses around every parameter and around the whole body, and avoiding side effects in macro arguments. Macros have no types, no scope, and no debugger support, so they are best for constants, small expressions, and conditional compilation. The #undef directive removes a macro definition, and the stringizing operator # turns a parameter into a string literal.',
          syntax: '#define BUFFER_SIZE 1024\n#define SQUARE(x) ((x) * (x))\n#define MAX(a, b) ((a) > (b) ? (a) : (b))',
          analogy: 'A macro is like a rubber stamp: the preprocessor stamps the same text everywhere the macro name appears, before the compiler ever reads the page.',
          exampleCode: `#include <stdio.h>

#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    printf("Square of 5: %d\\n", SQUARE(5));
    printf("Square of 2+3: %d\\n", SQUARE(2 + 3));
    printf("Max: %d\\n", MAX(10, 20));
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define SQUARE with parentheses around x and the whole expression.', 'SQUARE(5) expands to ((5) * (5)), giving 25.', 'SQUARE(2 + 3) expands correctly to 25 because of the parentheses.', 'MAX(10, 20) gives 20.', 'Without parentheses, SQUARE(2 + 3) would expand to 2 + 3 * 2 + 3, which is 11.'],
          commonMistakes: ['Omitting parentheses in a macro, so operator precedence breaks the expansion', 'Passing arguments with side effects, which are evaluated more than once', 'Putting a semicolon at the end of a #define line'],
          debuggingExercise: {
            prompt: 'This macro gives the wrong answer for SQUARE(2 + 3). Fix it.',
            buggyCode: `#include <stdio.h>

#define SQUARE(x) x * x

int main(void) {
    printf("%d\\n", SQUARE(2 + 3));
    return 0;
}`,
            fixedCode: `#include <stdio.h>

#define SQUARE(x) ((x) * (x))

int main(void) {
    printf("%d\\n", SQUARE(2 + 3));
    return 0;
}`,
            explanation: 'SQUARE(2 + 3) expanded to 2 + 3 * 2 + 3, which is 11 due to precedence. Parenthesizing the parameter and the whole body makes it ((2 + 3) * (2 + 3)) = 25.'
          },
          miniChallenge: 'Define a macro MIN(a, b) and a macro ABS(x), and test them with negative and positive values.',
          summary: 'Macros are text substitution performed before compilation, so parenthesize every parameter and the whole body, and never pass side-effecting arguments. Next: conditional compilation and include guards.',
          knowledgeCheck: [
            q('When does the preprocessor expand a macro?', ['At runtime', 'Before compilation, as text substitution', 'At link time', 'When the program exits'], 1, 'The preprocessor runs first and replaces macro uses with their definitions as text.'),
            q('Why does #define SQUARE(x) ((x) * (x)) need parentheses?', ['For style only', 'So arguments like 2 + 3 expand correctly under precedence rules', 'To make it faster', 'To allow floats'], 1, 'Without parentheses, SQUARE(2 + 3) would expand to 2 + 3 * 2 + 3 = 11.')
          ],
          exercises: [
            ex('c-m16-l1-e1', 'Macro minimum', 'write-code', 'Read two integers and print the smaller one. Define a macro MIN(a, b) with full parenthesization and use it in main.',
              '#include <stdio.h>\n\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\nint main(void) {\n    int a, b;\n    // read a and b, print MIN(a, b)\n    return 0;\n}',
              '#include <stdio.h>\n\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", MIN(a, b));\n    return 0;\n}',
              'The MIN macro compares a and b and yields the smaller; main prints it.',
              'O(1)', [tc('min of 8 and 3', '8 3\n', '3'), tc('min of -1 and 5', '-1 5\n', '-1', true)], h5(
                'A macro with a ternary can pick the smaller of two values.',
                'Use the provided MIN macro in a printf with %d.',
                'printf("%d\\n", MIN(a, b));',
                'If the result is the larger value, the comparison in the macro is flipped.',
                'Solution: printf("%d\\n", MIN(a, b)); Input "8 3" gives 3.'))
          ]
        },
        {
          id: 'c-m16-l2',
          slug: 'conditional-compilation',
          title: 'Conditional Compilation and Include Guards',
          objectives: ['Use #ifdef, #ifndef, #else, and #endif', 'Write include guards for headers', 'Use #pragma once and debug macros'],
          introduction: 'The same source can compile differently on different platforms or in debug versus release builds. This lesson covers conditional compilation and the include guards that stop headers from being included twice.',
          concept: 'Conditional compilation lets the preprocessor include or exclude code based on macros. #ifdef DEBUG includes code only when DEBUG is defined, which is how debug logging is kept out of release builds. #if can test expressions, such as #if defined(_WIN32) for Windows-specific code. The pattern #ifndef HEADER_H / #define HEADER_H / ... / #endif is an include guard: the first time the header is included, the macro is undefined, so the contents are processed and the macro is defined; a second inclusion finds the macro defined and skips the contents, preventing duplicate definitions. #pragma once is a simpler, widely supported alternative that achieves the same thing with one line. The compiler flag -DDEBUG defines a macro from the command line, so you can enable debug code without editing source. Conditional compilation is also how libraries support multiple platforms from one codebase.',
          syntax: '#ifndef MYHEADER_H\n#define MYHEADER_H\n// header contents\n#endif\n\n#ifdef DEBUG\n#define LOG(msg) fprintf(stderr, "%s\\n", msg)\n#else\n#define LOG(msg)\n#endif',
          analogy: 'An include guard is like a "do not duplicate" stamp on a letter: the first copy is delivered, and any extra copies are thrown away automatically.',
          exampleCode: `#include <stdio.h>

#define DEBUG 1

#ifdef DEBUG
#define LOG(msg) printf("[DEBUG] %s\\n", msg)
#else
#define LOG(msg)
#endif

int main(void) {
    LOG("program started");
    printf("Running.\\n");
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define DEBUG to enable debug output.', 'Under #ifdef DEBUG, LOG prints a message; otherwise it expands to nothing.', 'Call LOG in main.', 'The debug line prints because DEBUG is defined.', 'Remove the #define DEBUG line and the LOG call becomes empty.'],
          commonMistakes: ['Forgetting the #endif, which breaks compilation of everything after it', 'Using the same include guard name in two different headers', 'Relying on #ifdef for logic that should be a runtime condition'],
          debuggingExercise: {
            prompt: 'This header causes "redefinition" errors when included twice. Fix it.',
            buggyCode: `// point.h
struct Point { int x; int y; };`,
            fixedCode: `// point.h
#ifndef POINT_H
#define POINT_H

struct Point { int x; int y; };

#endif`,
            explanation: 'Without a guard, including the header twice defines struct Point twice. The guard makes the second inclusion a no-op.'
          },
          miniChallenge: 'Write a program that prints "Debug build" when compiled with -DDEBUG and "Release build" otherwise.',
          summary: 'Conditional compilation adapts code to platforms and build modes, and include guards prevent duplicate definitions. #pragma once is a convenient alternative. Next module: splitting code across files.',
          knowledgeCheck: [
            q('What does an include guard prevent?', ['Slow compilation', 'A header being processed twice and causing redefinition errors', 'Missing includes', 'Circular dependencies only'], 1, 'The guard macro makes the second inclusion skip the header contents.'),
            q('What does gcc -DDEBUG do?', ['Deletes debug code', 'Defines the macro DEBUG for the compilation', 'Runs the debugger', 'Disables warnings'], 1, '-D defines a macro from the command line, enabling #ifdef DEBUG blocks.')
          ],
          exercises: [
            ex('c-m16-l2-e1', 'Platform-independent max', 'write-code', 'Read two integers and print the larger one. Use a function-like macro MAX(a, b) with full parentheses, defined at the top of the file.',
              '#include <stdio.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\nint main(void) {\n    int a, b;\n    // read a and b, print MAX(a, b)\n    return 0;\n}',
              '#include <stdio.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", MAX(a, b));\n    return 0;\n}',
              'The MAX macro expands to a ternary that yields the larger value.',
              'O(1)', [tc('max of 4 and 9', '4 9\n', '9'), tc('max of 12 and 1', '12 1\n', '12', true)], h5(
                'A macro can implement max with a ternary operator.',
                'Call the MAX macro in printf with the two inputs.',
                'printf("%d\\n", MAX(a, b));',
                'If the smaller value prints, the comparison in the macro is backwards.',
                'Solution: printf("%d\\n", MAX(a, b)); Input "4 9" gives 9.'))
          ]
        }
      ]
    },
    {
      id: 'c-m17',
      title: 'Modular Programming',
      description: 'Splitting programs into headers and source files, and building multi-file projects.',
      level: 'intermediate',
      order: 17,
      lessons: [
        {
          id: 'c-m17-l1',
          slug: 'headers-and-source-files',
          title: 'Headers and Source Files',
          objectives: ['Separate declarations into .h and definitions into .c', 'Include your own headers with quotes', 'Compile multiple files together'],
          introduction: 'Real programs span many files. This lesson shows how to split code into a header with declarations and a source file with definitions, and how to compile them together.',
          concept: 'A header file, ending in .h, declares the public interface of a module: function prototypes, type definitions, macros, and constants. The matching .c file contains the definitions, the actual implementations, and includes its own header first so the compiler checks that they agree. Other files include the header with double quotes, #include "math_utils.h", which searches the local directory first, unlike angle brackets, which search system paths. Each .c file is compiled separately into an object file, and the linker combines them. This separation hides implementation details, speeds up rebuilds because only changed files recompile, and lets teams work on different modules independently. A header should never contain function definitions or global variable definitions, only declarations, or you will get multiple-definition errors when two files include it. Include guards in every header are essential.',
          syntax: '// math_utils.h\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nint add(int a, int b);\n#endif\n\n// math_utils.c\n#include "math_utils.h"\nint add(int a, int b) { return a + b; }\n\n// main.c\n#include "math_utils.h"\n\n// compile: gcc main.c math_utils.c -o app',
          analogy: 'A header is like a restaurant menu: it tells you what dishes exist and what they cost, while the kitchen (the .c file) is where the cooking actually happens.',
          exampleCode: `#include <stdio.h>

// In a real project this would live in math_utils.h
int add(int a, int b);
int multiply(int a, int b);

// And these definitions in math_utils.c
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main(void) {
    printf("2 + 3 = %d\\n", add(2, 3));
    printf("2 * 3 = %d\\n", multiply(2, 3));
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['The prototypes declare add and multiply, as a header would.', 'The definitions implement them, as a .c file would.', 'main includes the declarations and calls the functions.', 'In a real project you would compile with gcc main.c math_utils.c -o app.', 'The linker resolves the calls to the definitions in the other file.'],
          commonMistakes: ['Putting function definitions in a header included by two files, causing multiple-definition errors', 'Using #include <...> for your own headers instead of quotes', 'Forgetting to list all .c files on the gcc command line'],
          debuggingExercise: {
            prompt: 'Linking fails with "undefined reference to add". What is wrong and how do you fix it?',
            buggyCode: `$ gcc main.c -o app
/usr/bin/ld: main.c: undefined reference to 'add'`,
            fixedCode: `$ gcc main.c math_utils.c -o app
$ ./app`,
            explanation: 'main.c was compiled alone, so the linker never saw the definition of add in math_utils.c. Listing both .c files on the command line lets the linker resolve the reference.'
          },
          miniChallenge: 'Split the calculator from module 12 into calculator.h, calculator.c, and main.c, and compile them together.',
          summary: 'Headers declare interfaces and .c files define implementations; the linker combines separately compiled files. Include guards and quoted includes keep the system clean. Next: build systems and make.',
          knowledgeCheck: [
            q('What belongs in a header file?', ['Function definitions', 'Function prototypes, type definitions, and macros', 'Global variable definitions', 'The main function'], 1, 'Headers declare the interface; definitions live in .c files to avoid multiple-definition errors.'),
            q('What is the difference between #include "x.h" and #include <x.h>?', ['There is none', 'Quotes search the local directory first; angle brackets search system paths', 'Quotes are for C++', 'Angle brackets are faster'], 1, 'Quoted includes are for project headers, angle brackets for system headers.')
          ],
          exercises: [
            ex('c-m17-l1-e1', 'Add via a helper function', 'write-code', 'Read two integers and print their sum. Implement the addition in a separate function int add(int a, int b) declared before main, as a header would declare it.',
              '#include <stdio.h>\n\nint add(int a, int b);\n\nint add(int a, int b) { return a + b; }\n\nint main(void) {\n    int a, b;\n    // read a and b, print add(a, b)\n    return 0;\n}',
              '#include <stdio.h>\n\nint add(int a, int b);\n\nint add(int a, int b) { return a + b; }\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", add(a, b));\n    return 0;\n}',
              'The prototype declares add before main; the definition implements it and main calls it.',
              'O(1)', [tc('add 5 and 7', '5 7\n', '12'), tc('add negatives', '-3 3\n', '0', true)], h5(
                'A prototype lets main call a function defined later in the file.',
                'Read a and b, then print add(a, b).',
                'scanf("%d %d", &a, &b); printf("%d\\n", add(a, b));',
                'If the linker reports an undefined reference, check the definition of add exists.',
                'Solution: scanf("%d %d", &a, &b); printf("%d\\n", add(a, b)); Input "5 7" gives 12.'))
          ]
        },
        {
          id: 'c-m17-l2',
          slug: 'make-and-builds',
          title: 'Makefiles and Building Projects',
          objectives: ['Write a simple Makefile', 'Explain targets, dependencies, and rules', 'Rebuild only what changed'],
          introduction: 'Typing long gcc commands for every file gets old fast. Make automates builds: it tracks dependencies and recompiles only the files that changed, which is essential for real projects.',
          concept: 'A Makefile is a set of rules, each with a target, its dependencies, and the commands that build it. A rule looks like app: main.o math.o, followed by a tab-indented command such as gcc main.o math.o -o app. When you run make, it checks timestamps: if a .c file is newer than its .o file, that object is rebuilt, and if any object is newer than the executable, the executable is relinked. Files that have not changed are skipped, which makes incremental builds fast. Variables like CC = gcc and CFLAGS = -Wall -Wextra -g keep the file tidy, and a clean target removes build artifacts. Make decides what to rebuild from the dependency graph, so declaring the right dependencies matters: if main.c includes math_utils.h, then main.o must depend on that header, or editing the header will not trigger a rebuild. Pattern rules like %.o: %.c generalize the build for any source file.',
          syntax: 'CC = gcc\nCFLAGS = -Wall -Wextra -g\n\napp: main.o math_utils.o\n\t$(CC) $(CFLAGS) main.o math_utils.o -o app\n\nmain.o: main.c math_utils.h\n\t$(CC) $(CFLAGS) -c main.c\n\nclean:\n\trm -f *.o app',
          analogy: 'Make is like a smart chef who only re-cooks the dishes whose ingredients changed, instead of remaking the whole meal every time.',
          exampleCode: `#include <stdio.h>

int main(void) {
    printf("Build me with make.\\n");
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Save the code as main.c.', 'Create a Makefile with a target that builds app from main.o.', 'Run make to compile and link.', 'Run make again and notice it says nothing is to be done.', 'Edit main.c and run make again to see only the changed file rebuild.'],
          commonMistakes: ['Using spaces instead of a tab before recipe commands, which make rejects', 'Forgetting header dependencies, so edits do not trigger rebuilds', 'Writing a clean rule that deletes source files by mistake'],
          debuggingExercise: {
            prompt: 'Running make fails with "missing separator". What is wrong?',
            buggyCode: `app: main.o
    gcc main.o -o app`,
            fixedCode: `app: main.o
\tgcc main.o -o app`,
            explanation: 'Recipe lines in a Makefile must start with a tab character, not spaces. The error "missing separator" is make telling you the tab is absent.'
          },
          miniChallenge: 'Write a Makefile for a two-file project with a clean target, then build, edit one file, and rebuild to see the incremental behaviour.',
          summary: 'Makefiles declare targets, dependencies, and recipes; make rebuilds only what is out of date. Tabs are mandatory in recipes. Next module: handling errors robustly.',
          knowledgeCheck: [
            q('How does make decide what to rebuild?', ['It rebuilds everything always', 'It compares timestamps of targets and dependencies', 'It asks the user', 'It rebuilds randomly'], 1, 'A target is rebuilt when any dependency is newer than the target.'),
            q('What character must begin a recipe line in a Makefile?', ['A space', 'A tab', 'A dash', 'A hash'], 1, 'Recipes must be indented with a literal tab; spaces cause a "missing separator" error.')
          ],
          exercises: [
            ex('c-m17-l2-e1', 'Factorial via a helper', 'write-code', 'Read a non-negative integer n and print n!. Implement the factorial in a separate function int factorial(int n) and call it from main.',
              '#include <stdio.h>\n\nint factorial(int n);\n\nint factorial(int n) {\n    // return n!\n    return 1;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", factorial(n));\n    return 0;\n}',
              '#include <stdio.h>\n\nint factorial(int n);\n\nint factorial(int n) {\n    int result = 1;\n    for (int i = 2; i <= n; i++) result *= i;\n    return result;\n}\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", factorial(n));\n    return 0;\n}',
              'The helper loops from 2 to n multiplying into result; main prints the returned value.',
              'O(n)', [tc('5 factorial', '5\n', '120'), tc('0 factorial', '0\n', '1', true)], h5(
                'Factorial multiplies all integers from 1 to n.',
                'In factorial, start result at 1 and multiply by each i from 2 to n.',
                'int result = 1; for (int i = 2; i <= n; i++) result *= i; return result;',
                'If 0! prints 0, check result starts at 1 and the loop does not run for n = 0.',
                'Solution: loop i from 2 to n, result *= i, return result. 5! is 120 and 0! is 1.'))
          ]
        }
      ]
    },
    {
      id: 'c-m18',
      title: 'Error Handling',
      description: 'Return codes, errno, asserts, and defensive programming.',
      level: 'intermediate',
      order: 18,
      lessons: [
        {
          id: 'c-m18-l1',
          slug: 'return-codes-errno',
          title: 'Return Codes and errno',
          objectives: ['Use return values to signal errors', 'Read errno and use perror and strerror', 'Write functions that report errors to callers'],
          introduction: 'C has no exceptions, so errors are reported through return values and the global errno. This lesson teaches the conventions that make C error handling reliable.',
          concept: 'In C, functions signal failure through their return value: NULL for a failed pointer, -1 for a failed system call, or a non-zero error code. The caller must check the return value, because ignoring it means the program proceeds with invalid data. When a library function fails it often sets the global variable errno to a code describing the failure, such as ENOENT for a missing file or EACCES for a permission error. perror("fopen") prints your message followed by a human-readable description of the current errno, and strerror(errno) returns the description as a string. A common pattern is for a function to return 0 on success and a negative error code on failure, with an output parameter carrying the result. errno is only meaningful immediately after the failing call, because any later library call may change it. Checking errors at every boundary, especially for I/O, allocation, and system calls, is what separates robust programs from fragile ones.',
          syntax: '#include <errno.h>\n#include <string.h>\nFILE *f = fopen("x.txt", "r");\nif (f == NULL) {\n    perror("fopen");\n    fprintf(stderr, "errno %d: %s\\n", errno, strerror(errno));\n}',
          analogy: 'errno is like a hospital triage tag: it does not fix the patient, but it tells the next person exactly what went wrong so they can act.',
          exampleCode: `#include <stdio.h>
#include <errno.h>
#include <string.h>

int divide(int a, int b, int *out) {
    if (b == 0) {
        errno = EINVAL;
        return -1;
    }
    *out = a / b;
    return 0;
}

int main(void) {
    int result;
    if (divide(10, 0, &result) != 0) {
        fprintf(stderr, "divide failed: %s\\n", strerror(errno));
        return 1;
    }
    printf("%d\\n", result);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['divide returns -1 and sets errno when b is zero.', 'On success it writes the result through out and returns 0.', 'main checks the return value.', 'On failure it prints the error with strerror.', 'The program exits with status 1 to signal failure.'],
          commonMistakes: ['Ignoring return values of functions that can fail', 'Reading errno long after the failing call', 'Printing errors to stdout instead of stderr'],
          debuggingExercise: {
            prompt: 'This program silently continues after a failed open. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("missing.txt", "r");
    char buf[100];
    fgets(buf, sizeof buf, f);
    printf("%s", buf);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("missing.txt", "r");
    if (f == NULL) {
        perror("fopen");
        return 1;
    }
    char buf[100];
    if (fgets(buf, sizeof buf, f) != NULL) {
        printf("%s", buf);
    }
    fclose(f);
    return 0;
}`,
            explanation: 'fopen returned NULL and the program passed it to fgets anyway. Checking for NULL and reporting with perror turns a crash into a clear error message.'
          },
          miniChallenge: 'Write a function that opens a file and returns an error code, with the caller printing the error using perror.',
          summary: 'C reports errors through return values and errno; perror and strerror translate codes into messages. Check every fallible call and report to stderr. Next: assertions and defensive checks.',
          knowledgeCheck: [
            q('What does perror do?', ['Prints the last error as a string', 'Prints your message plus a description of the current errno value', 'Clears errno', 'Exits the program'], 1, 'perror prints a message followed by the human-readable meaning of errno.'),
            q('When is errno meaningful?', ['Always', 'Immediately after a failing call, before other library calls', 'Only at program start', 'Only in debug builds'], 1, 'Any later library call may change errno, so it must be read right after the failure.')
          ],
          exercises: [
            ex('c-m18-l1-e1', 'Safe division', 'write-code', 'Read two integers a and b. If b is zero, print "error". Otherwise print a / b using integer division.',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    // read a and b; print "error" if b == 0, else a / b\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    if (b == 0) {\n        printf("error\\n");\n    } else {\n        printf("%d\\n", a / b);\n    }\n    return 0;\n}',
              'Checking the divisor before dividing prevents a crash and reports the error.',
              'O(1)', [tc('10 / 2', '10 2\n', '5'), tc('divide by zero', '10 0\n', 'error', true)], h5(
                'Division by zero crashes integer division, so check first.',
                'If b is 0 print "error", otherwise print a / b.',
                'if (b == 0) printf("error\\n"); else printf("%d\\n", a / b);',
                'If the program crashes on zero, the check is missing or after the division.',
                'Solution: check b == 0 before dividing. 10 / 2 gives 5 and 10 / 0 prints "error".'))
          ]
        },
        {
          id: 'c-m18-l2',
          slug: 'assert-defensive',
          title: 'Assertions and Defensive Programming',
          objectives: ['Use assert to check invariants', 'Write defensive checks for invalid input', 'Distinguish programmer errors from runtime errors'],
          introduction: 'Some bugs should never happen, and assert exists to catch them loudly during development. This lesson covers assertions, defensive input validation, and the difference between bugs and expected failures.',
          concept: 'assert(expression) from <assert.h> checks an assumption: if the expression is false, the program prints the file, line, and expression, then aborts. Assertions document invariants, such as "this pointer is never NULL" or "the index is in range", and they catch programmer errors early, close to the cause. Defining NDEBUG before including assert.h disables all assertions, so release builds run without the checks, which means assertions must never have side effects. Assertions are for things that should be impossible; expected runtime failures, such as a missing file or bad user input, need proper error handling instead. Defensive programming adds validation at boundaries: check that pointers are not NULL, that indices are in range, and that inputs satisfy their preconditions, and fail with a clear message rather than proceeding with bad data. A function that validates its arguments and returns an error code is far easier to debug than one that silently corrupts state.',
          syntax: '#include <assert.h>\nassert(ptr != NULL);\nassert(index >= 0 && index < size);\n// compile with -DNDEBUG to disable assertions',
          analogy: 'An assertion is like a smoke alarm: it does nothing most of the time, but when it goes off it tells you exactly where the fire is.',
          exampleCode: `#include <stdio.h>
#include <assert.h>

int get_element(int *arr, int size, int index) {
    assert(arr != NULL);
    assert(index >= 0 && index < size);
    return arr[index];
}

int main(void) {
    int arr[3] = {10, 20, 30};
    printf("%d\\n", get_element(arr, 3, 1));
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['get_element asserts that the array pointer is not NULL.', 'It also asserts the index is within bounds.', 'The assertions pass for index 1.', 'The function returns arr[1], which is 20.', 'An out-of-bounds call would abort with the file and line number.'],
          commonMistakes: ['Putting side effects inside assert, which disappear in release builds', 'Using assert for user input validation', 'Leaving NDEBUG undefined in production and letting assertions abort a live service'],
          debuggingExercise: {
            prompt: 'This program behaves differently in release builds. Fix it.',
            buggyCode: `#include <stdio.h>
#include <assert.h>

int main(void) {
    int x = 0;
    assert((x = 5) == 5);
    printf("%d\\n", x);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <assert.h>

int main(void) {
    int x = 5;
    assert(x == 5);
    printf("%d\\n", x);
    return 0;
}`,
            explanation: 'The assignment was inside assert, so with NDEBUG defined the assignment vanished and x stayed 0. Side effects must live outside assertions.'
          },
          miniChallenge: 'Add assertions to a binary search function for a non-NULL array and a non-negative size.',
          summary: 'Assertions catch impossible conditions during development and vanish in release builds, so keep them side-effect free. Validate expected failures with real error handling. Next module: bit manipulation.',
          knowledgeCheck: [
            q('What happens when an assert fails?', ['The program continues', 'It prints the file, line, and expression, then aborts', 'It returns an error code', 'It retries'], 1, 'A failed assertion aborts the program with a diagnostic message.'),
            q('What does defining NDEBUG do?', ['Enables assertions', 'Disables all assertions', 'Makes assertions print more', 'Slows the program'], 1, 'NDEBUG turns assert into a no-op, so assertions cost nothing in release builds.')
          ],
          exercises: [
            ex('c-m18-l2-e1', 'Clamp a value', 'write-code', 'Read three integers value, low, and high. Print value clamped into the range [low, high]: if value < low print low, if value > high print high, otherwise print value.',
              '#include <stdio.h>\n\nint main(void) {\n    int value, low, high;\n    // read the three numbers, print the clamped value\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int value, low, high;\n    scanf("%d %d %d", &value, &low, &high);\n    if (value < low) printf("%d\\n", low);\n    else if (value > high) printf("%d\\n", high);\n    else printf("%d\\n", value);\n    return 0;\n}',
              'Two comparisons decide whether the value is below, above, or inside the range.',
              'O(1)', [tc('clamp inside', '5 0 10\n', '5'), tc('clamp above', '25 0 10\n', '10', true)], h5(
                'Clamping picks the nearest boundary when the value is outside the range.',
                'If value < low print low, else if value > high print high, else print value.',
                'if (value < low) ... else if (value > high) ... else ...',
                'If a value above high prints unchanged, check the second comparison uses > high.',
                'Solution: check below low first, then above high, otherwise print value. 25 clamped to [0,10] is 10.'))
          ]
        }
      ]
    },
    {
      id: 'c-m19',
      title: 'Bit Manipulation',
      description: 'Bitwise operators, bit flags, masks, and shifts.',
      level: 'intermediate',
      order: 19,
      lessons: [
        {
          id: 'c-m19-l1',
          slug: 'bitwise-operators',
          title: 'Bitwise Operators: AND, OR, XOR, NOT',
          objectives: ['Use &, |, ^, and ~ on integers', 'Test, set, and clear individual bits', 'Explain the difference between & and &&'],
          introduction: 'At the lowest level, data is bits, and C lets you manipulate them directly. This lesson covers the bitwise operators and the classic techniques for testing, setting, clearing, and toggling bits.',
          concept: 'Bitwise operators work on each bit independently. AND (&) gives 1 only when both bits are 1, OR (|) gives 1 when either bit is 1, XOR (^) gives 1 when the bits differ, and NOT (~) flips every bit. A common idiom tests a bit with (flags & MASK) != 0, sets a bit with flags |= MASK, clears a bit with flags &= ~MASK, and toggles a bit with flags ^= MASK. Masks are usually built with shifts, such as 1 << 3 for the fourth bit. Bitwise operators differ from logical operators: & works bit by bit while && works on truth values, so 5 & 3 is 1 while 5 && 3 is 1 for a different reason. XOR has a neat property: x ^ x is 0 and x ^ 0 is x, which lets you swap two variables without a temporary, though a temp is clearer. Bit tricks are fast and compact, which is why they appear in embedded code, graphics, and protocol handling.',
          syntax: 'unsigned int flags = 0;\nflags |= (1u << 2);   // set bit 2\nflags &= ~(1u << 2);  // clear bit 2\nflags ^= (1u << 2);   // toggle bit 2\nint set = (flags & (1u << 2)) != 0;',
          analogy: 'Bits are like light switches on a panel: each switch is independent, and a mask is a stencil that lets you flip exactly the switches you want.',
          exampleCode: `#include <stdio.h>

int main(void) {
    unsigned int flags = 0;
    flags |= (1u << 1);  // set bit 1
    flags |= (1u << 3);  // set bit 3
    printf("flags = %u\\n", flags);  // 2 + 8 = 10
    printf("bit 1 set: %d\\n", (flags & (1u << 1)) != 0);
    flags ^= (1u << 1);  // toggle bit 1 off
    printf("flags = %u\\n", flags);  // 8
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Start with flags at 0.', 'Set bits 1 and 3, giving 2 + 8 = 10.', 'Test bit 1 with a mask; the result is 1.', 'Toggle bit 1 off with XOR, leaving 8.', 'Print the final value.'],
          commonMistakes: ['Confusing & with && and | with ||', 'Shifting a signed int into the sign bit, which is undefined behaviour', 'Using 1 << 31 on a 32-bit int instead of 1u << 31'],
          debuggingExercise: {
            prompt: 'This code should set bit 2 but the value stays 0. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    unsigned int flags = 0;
    flags & (1u << 2);
    printf("%u\\n", flags);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    unsigned int flags = 0;
    flags |= (1u << 2);
    printf("%u\\n", flags);
    return 0;
}`,
            explanation: 'flags & (1u << 2) computes a value but discards it. Setting a bit requires assigning the result back with |=.'
          },
          miniChallenge: 'Write a program that reads an integer and prints the number of set bits (the population count) in it.',
          summary: 'Bitwise operators manipulate individual bits, and masks with shifts select which bits to test, set, clear, or toggle. Use unsigned types for bit work. Next: shifts and bit fields.',
          knowledgeCheck: [
            q('What is 5 & 3?', ['7', '1', '6', '8'], 1, '5 is 101 and 3 is 011; AND gives 001, which is 1.'),
            q('How do you set bit 2 of flags?', ['flags = 1 << 2', 'flags |= (1u << 2)', 'flags & (1u << 2)', 'flags ^ 2'], 1, 'OR-ing with the mask sets the bit while leaving the others unchanged.')
          ],
          exercises: [
            ex('c-m19-l1-e1', 'Test a bit', 'write-code', 'Read two integers x and k. Print 1 if bit k of x is set, otherwise print 0. (Bit 0 is the least significant bit.)',
              '#include <stdio.h>\n\nint main(void) {\n    int x, k;\n    // read x and k, print 1 if bit k is set\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int x, k;\n    scanf("%d %d", &x, &k);\n    printf("%d\\n", (x >> k) & 1);\n    return 0;\n}',
              'Shifting x right by k moves the target bit to position 0, where & 1 isolates it.',
              'O(1)', [tc('bit 0 of 5', '5 0\n', '1'), tc('bit 1 of 5', '5 1\n', '0', true)], h5(
                'Shift the number right by k so the bit you want lands in position 0.',
                'Use (x >> k) & 1 to isolate bit k and print it.',
                'printf("%d\\n", (x >> k) & 1);',
                'If every answer is 1, check you shifted by k and masked with & 1.',
                'Solution: (x >> k) & 1. For x = 5 (101), bit 0 is 1 and bit 1 is 0.'))
          ]
        },
        {
          id: 'c-m19-l2',
          slug: 'shifts-and-bitfields',
          title: 'Shifts, Masks, and Bit Fields',
          objectives: ['Use << and >> to shift bits', 'Build and apply masks', 'Pack values into bit fields'],
          introduction: 'Shifting moves bits left or right, which multiplies or divides by powers of two and builds masks. This lesson covers shifts, masking out fields of bits, and packing small values into bit fields.',
          concept: 'The left shift x << n moves all bits n places toward the most significant end, filling with zeros, which multiplies by 2^n for unsigned values. The right shift x >> n moves bits toward the least significant end; for unsigned values it fills with zeros and divides by 2^n, while for negative signed values the fill is implementation-defined, so bit work should use unsigned types. Shifting by a count equal to or larger than the width of the type is undefined behaviour. Masks combine shifts and AND to extract a field: (x >> 4) & 0xF pulls out the second nibble of x. Bit fields let a struct pack several small values into one word, as in struct { unsigned int red : 5; unsigned int green : 6; unsigned int blue : 5; };, which stores a 16-bit colour in three fields. Bit fields save memory in embedded systems and protocols, but their layout is implementation-defined, so they are not portable across compilers for wire formats.',
          syntax: 'unsigned int x = 1;\nx = x << 4; // 16\nunsigned int nibble = (value >> 4) & 0xF;\nstruct Colour { unsigned int r : 5; unsigned int g : 6; unsigned int b : 5; };',
          analogy: 'Shifting is like sliding beads along an abacus wire: each slide left doubles the value, each slide right halves it.',
          exampleCode: `#include <stdio.h>

int main(void) {
    unsigned int x = 13; // binary 1101
    printf("x << 2 = %u\\n", x << 2); // 52
    printf("x >> 1 = %u\\n", x >> 1); // 6
    unsigned int low_nibble = x & 0xF;
    unsigned int high_nibble = (x >> 4) & 0xF;
    printf("low nibble: %u, high nibble: %u\\n", low_nibble, high_nibble);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Start with x = 13, binary 1101.', 'Shift left by 2 to get 52, which is 13 times 4.', 'Shift right by 1 to get 6, which is 13 divided by 2.', 'Mask with 0xF to extract the low nibble, 13.', 'Shift right by 4 and mask to get the high nibble, 0.'],
          commonMistakes: ['Shifting a signed negative number right and relying on the fill bits', 'Shifting by 32 or more on a 32-bit int', 'Assuming bit field layout is portable across compilers'],
          debuggingExercise: {
            prompt: 'This code should extract the low byte of 0x1234 but prints 0. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    unsigned int x = 0x1234;
    printf("%u\\n", (x >> 8) & 0xFF);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    unsigned int x = 0x1234;
    printf("%u\\n", x & 0xFF);
    return 0;
}`,
            explanation: 'The code shifted right by 8 first, which moved the high byte into the low position. The low byte is extracted with a plain mask, x & 0xFF, giving 0x34 = 52.'
          },
          miniChallenge: 'Write a program that reads an integer and prints it multiplied by 8 using a left shift.',
          summary: 'Shifts multiply and divide by powers of two, and masks extract bit fields. Always use unsigned types for bit manipulation. Next module: intermediate projects.',
          knowledgeCheck: [
            q('What is 13 >> 1 for an unsigned int?', ['26', '6', '12', '7'], 1, 'Right shifting by 1 divides by 2, and 13 / 2 truncates to 6.'),
            q('How do you extract the low byte of x?', ['x >> 8', 'x & 0xFF', 'x | 0xFF', 'x ^ 0xFF'], 1, 'Masking with 0xFF keeps only the lowest 8 bits.')
          ],
          exercises: [
            ex('c-m19-l2-e1', 'Multiply by a power of two', 'write-code', 'Read two integers x and n, and print x multiplied by 2^n using a left shift.',
              '#include <stdio.h>\n\nint main(void) {\n    int x, n;\n    // read x and n, print x * 2^n using <<\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int x, n;\n    scanf("%d %d", &x, &n);\n    printf("%d\\n", x << n);\n    return 0;\n}',
              'A left shift by n multiplies by 2^n.',
              'O(1)', [tc('3 * 8', '3 3\n', '24'), tc('5 * 2', '5 1\n', '10', true)], h5(
                'Left shifting by n multiplies by 2 to the power n.',
                'Print x << n with %d.',
                'printf("%d\\n", x << n);',
                'If the answer is x itself, check the shift count is n and not 1.',
                'Solution: printf("%d\\n", x << n); 3 << 3 is 24.'))
          ]
        }
      ]
    },
    {
      id: 'c-m20',
      title: 'Intermediate Projects',
      description: 'A student records system and a text-based todo list with file persistence.',
      level: 'intermediate',
      order: 20,
      lessons: [
        {
          id: 'c-m20-l1',
          slug: 'student-records',
          title: 'Project: Student Records System',
          objectives: ['Model records with structs and arrays', 'Implement add, search, and list operations', 'Sort records by grade'],
          introduction: 'This project combines structs, arrays, strings, and sorting into a student records system: add students, list them, search by name, and sort by grade.',
          concept: 'A records system stores an array of structs, each holding a name, an ID, and a grade, plus a count of how many records are in use. Adding a record appends at index count and increments it, after checking the array is not full. Searching loops through the used records and compares names with strcmp, returning the index or -1. Sorting by grade uses a simple selection or bubble sort that swaps whole structs, which works because struct assignment copies all members. Splitting the program into functions like add_student, find_student, and sort_by_grade keeps main as a small menu loop that reads a choice and dispatches to the right function. A fixed-size array is fine for a classroom project, but a real system would grow the array with realloc when it fills up, which is a natural extension of this project.',
          syntax: 'typedef struct { char name[50]; int id; double grade; } Student;\nStudent students[100];\nint count = 0;',
          analogy: 'The records system is like a filing cabinet: each drawer is a struct, the count is the number of filled drawers, and searching is opening drawers one by one until you find the right file.',
          exampleCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int id;
    double grade;
} Student;

int find_student(Student *students, int count, const char *name) {
    for (int i = 0; i < count; i++) {
        if (strcmp(students[i].name, name) == 0) return i;
    }
    return -1;
}

int main(void) {
    Student students[3] = {{"Ada", 1, 9.5}, {"Grace", 2, 9.8}, {"Alan", 3, 8.7}};
    int idx = find_student(students, 3, "Grace");
    printf("Found at index %d, grade %.1f\\n", idx, students[idx].grade);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define a Student struct with name, id, and grade.', 'Create an array of three students.', 'find_student loops and compares names with strcmp.', 'Searching for Grace returns index 1.', 'Print the index and the grade.'],
          commonMistakes: ['Forgetting to check the array is full before adding', 'Comparing names with == instead of strcmp', 'Sorting by swapping only the grade and not the whole struct'],
          debuggingExercise: {
            prompt: 'This search never finds a student that exists. Fix it.',
            buggyCode: `#include <stdio.h>
#include <string.h>

typedef struct { char name[50]; int id; } Student;

int find_student(Student *s, int count, const char *name) {
    for (int i = 0; i < count; i++) {
        if (s[i].name == name) return i;
    }
    return -1;
}`,
            fixedCode: `#include <stdio.h>
#include <string.h>

typedef struct { char name[50]; int id; } Student;

int find_student(Student *s, int count, const char *name) {
    for (int i = 0; i < count; i++) {
        if (strcmp(s[i].name, name) == 0) return i;
    }
    return -1;
}`,
            explanation: 'Comparing char arrays with == compares their addresses, which are never equal. strcmp compares the characters and returns 0 for a match.'
          },
          miniChallenge: 'Add a function that prints the student with the highest grade.',
          summary: 'You built a records system with structs, arrays, search, and sorting. The same pattern powers address books, inventories, and catalogues. Next: a persistent todo list.',
          knowledgeCheck: [
            q('How do you swap two struct elements in an array?', ['Swap each field separately', 'Assign whole structs with a temporary struct variable', 'Swap their addresses', 'Structs cannot be swapped'], 1, 'Struct assignment copies all members, so a temporary struct swaps two elements cleanly.'),
            q('What should find_student return when no student matches?', ['0', '-1', 'The count', 'NULL'], 1, 'Returning -1 signals "not found" since valid indices start at 0.')
          ],
          exercises: [
            ex('c-m20-l1-e1', 'Average grade', 'write-code', 'Read n, then n grades as doubles, and print their average with two decimal places.',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n grades, print the average with 2 decimals\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    double sum = 0;\n    for (int i = 0; i < n; i++) {\n        double g;\n        scanf("%lf", &g);\n        sum += g;\n    }\n    printf("%.2f\\n", sum / n);\n    return 0;\n}',
              'Accumulate the grades as doubles and divide by n for the average.',
              'O(n)', [tc('average of 3 grades', '3\n9.0 8.0 7.0\n', '8.00'), tc('average of 1', '1\n10.0\n', '10.00', true)], h5(
                'Add all the grades and divide by how many there are.',
                'Loop n times reading a double into sum, then print sum / n with %.2f.',
                'double sum = 0; for (...) { double g; scanf("%lf", &g); sum += g; } printf("%.2f\\n", sum / n);',
                'If the average is an integer like 8 instead of 8.00, check the format is %.2f.',
                'Solution: sum the grades as doubles and print sum / n with %.2f. Grades 9, 8, 7 average 8.00.'))
          ]
        },
        {
          id: 'c-m20-l2',
          slug: 'todo-list-file',
          title: 'Project: Todo List with File Persistence',
          objectives: ['Design a todo item struct', 'Save and load items from a file', 'Implement add, complete, and list operations'],
          introduction: 'The second intermediate project is a todo list that saves its items to a file, so tasks survive between runs. It combines structs, dynamic arrays, menus, and file I/O.',
          concept: 'Persistence means data outlives the process. The todo program keeps its items in a dynamically allocated array that grows with realloc, and on exit it writes each item to a text file, one per line, with a done flag. On startup it reads the file back with fgets, parses each line, and rebuilds the array. A simple text format, such as "0 Buy milk" where 0 means not done, is easy to debug and edit by hand. The menu loop offers add, list, complete, and quit, and each command is a small function operating on the shared array. Saving after every change is simpler and safer than saving only at exit, because a crash would otherwise lose work. This project is a miniature database: the file is the storage, the array is the cache, and the functions are the queries.',
          syntax: 'typedef struct { char text[100]; int done; } Todo;\n// save: fprintf(f, "%d %s\\n", t.done, t.text);\n// load: fgets(line, sizeof line, f); sscanf(line, "%d %99[^\\n]", &done, text);',
          analogy: 'File persistence is like writing your shopping list on paper instead of keeping it in your head: the paper is still there tomorrow even if you forget.',
          exampleCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char text[100];
    int done;
} Todo;

void list_todos(Todo *todos, int count) {
    for (int i = 0; i < count; i++) {
        printf("%d. [%c] %s\\n", i + 1, todos[i].done ? 'x' : ' ', todos[i].text);
    }
}

int main(void) {
    Todo todos[3] = {{"Buy milk", 0}, {"Read book", 1}, {"Write code", 0}};
    list_todos(todos, 3);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define a Todo struct with text and a done flag.', 'list_todos prints each item with [x] for done and [ ] for pending.', 'Create three sample todos.', 'Print the list to see the format.', 'In the full project, the array would be loaded from a file at startup and saved at exit.'],
          commonMistakes: ['Saving only at exit and losing data on a crash', 'Using a format that cannot represent spaces in the task text', 'Forgetting to grow the array when it fills up'],
          debuggingExercise: {
            prompt: 'This save function writes nothing to the file. Fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("todos.txt", "w");
    fprintf(f, "Buy milk\\n");
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    FILE *f = fopen("todos.txt", "w");
    if (f == NULL) return 1;
    fprintf(f, "Buy milk\\n");
    fclose(f);
    return 0;
}`,
            explanation: 'The file was never closed, so the buffered output was discarded when the program exited. fclose flushes the buffer to disk.'
          },
          miniChallenge: 'Add a "delete" command to the todo list that removes an item by shifting the later items down.',
          summary: 'You designed a persistent todo list with a simple text format, a dynamic array, and a menu loop. The file is the database and the array is the working copy. This completes the intermediate level. Next: C standards and undefined behaviour.',
          knowledgeCheck: [
            q('Why save after every change instead of only at exit?', ['It is faster', 'A crash would otherwise lose unsaved work', 'Files require it', 'It uses less memory'], 1, 'Saving eagerly protects against crashes; saving only at exit risks losing everything since the last save.'),
            q('What is a simple text format for a todo item?', ['A binary struct', 'A line like "0 Buy milk" with a done flag and text', 'A single character', 'An encrypted blob'], 1, 'A line with a flag and the text is human-readable, easy to parse, and easy to debug.')
          ],
          exercises: [
            ex('c-m20-l2-e1', 'Count completed todos', 'write-code', 'Read n, then n lines each starting with 0 or 1 (done flag) followed by a space and a task name. Print how many tasks are marked done (flag 1). Task names are single words.',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n tasks, count those with flag 1\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    int done_count = 0;\n    for (int i = 0; i < n; i++) {\n        int flag;\n        char name[100];\n        scanf("%d %99s", &flag, name);\n        if (flag == 1) done_count++;\n    }\n    printf("%d\\n", done_count);\n    return 0;\n}',
              'Each line gives a flag and a name; count the lines whose flag is 1.',
              'O(n)', [tc('two of three done', '3\n1 milk\n0 bread\n1 eggs\n', '2'), tc('none done', '2\n0 a\n0 b\n', '0', true)], h5(
                'Each task line has a flag and a name; only the flag matters for the count.',
                'Loop n times, read flag and name with scanf, and increment the counter when flag is 1.',
                'scanf("%d %99s", &flag, name); if (flag == 1) done_count++;',
                'If the count is 0 for done tasks, check the comparison uses == 1 and the flag is read first.',
                'Solution: read flag and name per line, count flags equal to 1. Two of three done gives 2.'))
          ]
        }
      ]
    },
    {
      id: 'c-m21',
      title: 'C Standards',
      description: 'The evolution of C from K&R to C23, and what each standard changed.',
      level: 'advanced',
      order: 21,
      lessons: [
        {
          id: 'c-m21-l1',
          slug: 'c-standards-history',
          title: 'From K&R to C11: The Evolution of C',
          objectives: ['Trace the major C standards', 'Explain what C89, C99, and C11 added', 'Choose a standard with -std'],
          introduction: 'C has been standardized since 1989, and each revision added features while keeping the language small. This lesson traces the standards and shows how to select one with the compiler.',
          concept: 'The first edition of "The C Programming Language" by Kernighan and Ritchie described K&R C, which had implicit int return types and unprototyped functions. ANSI C, also called C89 or C90, standardized the language, added prototypes, void, and the standard library, and is still the baseline for maximum portability. C99 added // comments, declarations anywhere in a block, variable-length arrays, the long long type, bool from <stdbool.h>, and the restrict keyword, plus designated initializers. C11 added _Generic for type-generic expressions, _Static_assert, anonymous structs and unions, multithreading support in <threads.h>, and the _Atomic type qualifier. C17 was a bug-fix release, and C23 added nullptr, constexpr, and more. You select a standard with gcc -std=c99 or -std=c11, and -std=c11 -pedantic-errors enforces strict conformance. Knowing which features belong to which standard explains why some code compiles on one compiler and not another.',
          syntax: 'gcc -std=c99 program.c -o program\ngcc -std=c11 -Wall -Wextra -pedantic program.c -o program',
          analogy: 'C standards are like editions of a dictionary: each new edition adds words and clarifies definitions, but the language stays recognizably the same.',
          exampleCode: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    // C99: declarations anywhere, // comments
    bool done = false;
    for (int i = 0; i < 3; i++) {  // loop variable declared in the for
        printf("i = %d\\n", i);
    }
    printf("done = %d\\n", done);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Include <stdbool.h> for the bool type, a C99 feature.', 'Declare done as a bool.', 'Declare the loop variable inside the for header, also C99.', 'Print the loop values 0, 1, 2.', 'Compile with -std=c89 to see these features rejected, then with -std=c99 to see them accepted.'],
          commonMistakes: ['Using C99 features while compiling with -std=c89', 'Assuming bool exists without including <stdbool.h>', 'Using variable-length arrays in code that must be portable to C11 compilers where they are optional'],
          debuggingExercise: {
            prompt: 'This code fails to compile with -std=c89. Why, and how do you fix it without changing the standard?',
            buggyCode: `#include <stdio.h>

int main(void) {
    for (int i = 0; i < 3; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int i;
    for (i = 0; i < 3; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
            explanation: 'Declaring a variable inside the for header is a C99 feature. C89 requires declarations at the start of a block, so moving int i before the loop makes it compile under C89.'
          },
          miniChallenge: 'Compile a program with -std=c99, -std=c11, and -std=c17 and note any warnings that change.',
          summary: 'Each C standard added features while preserving the core language: C89 standardized it, C99 modernized declarations and added bool, C11 added generics and threads. Use -std to select one. Next: what C11 and C23 brought.',
          knowledgeCheck: [
            q('Which standard introduced // comments and declarations inside for loops?', ['C89', 'C99', 'C11', 'K&R C'], 1, 'C99 added // comments, mixed declarations, and variable-length arrays.'),
            q('What does gcc -std=c11 do?', ['Compiles as C++', 'Selects the C11 standard for compilation', 'Enables all warnings', 'Disables the preprocessor'], 1, '-std selects the language standard the compiler enforces.')
          ],
          exercises: [
            ex('c-m21-l1-e1', 'Sum with a for-scoped variable', 'write-code', 'Read n and print the sum of 1 to n, declaring the loop variable inside the for header (C99 style).',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n, print the sum 1..n\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    int sum = 0;\n    for (int i = 1; i <= n; i++) sum += i;\n    printf("%d\\n", sum);\n    return 0;\n}',
              'A C99-style for loop with the variable declared in the header accumulates the sum.',
              'O(n)', [tc('sum to 10', '10\n', '55'), tc('sum to 1', '1\n', '1', true)], h5(
                'Declare the loop variable inside the for header, as C99 allows.',
                'Loop i from 1 to n adding to sum, then print sum.',
                'int sum = 0; for (int i = 1; i <= n; i++) sum += i;',
                'If the sum is 0, check the loop body actually adds i to sum.',
                'Solution: for (int i = 1; i <= n; i++) sum += i; then print sum. Sum to 10 is 55.'))
          ]
        },
        {
          id: 'c-m21-l2',
          slug: 'c11-c23-features',
          title: 'C11 and C23: Generics, Static Assert, and Modern Features',
          objectives: ['Use _Generic for type-generic code', 'Use _Static_assert for compile-time checks', 'Explain what C23 adds'],
          introduction: 'C11 and C23 brought modern conveniences without changing C\'s character. This lesson covers _Generic, _Static_assert, and the new features of C23.',
          concept: '_Generic is a compile-time selection based on the type of an expression, which lets you write type-generic macros: _Generic((x), int: "int", double: "double", default: "other") yields a string describing the type of x. It is how the <tgmath.h> header implements type-generic math functions. _Static_assert(condition, message) checks a condition at compile time and stops compilation with your message if it fails, which is perfect for verifying assumptions like sizeof(int) == 4 or that a struct fits in a cache line. C11 also added anonymous structs and unions, which let you access nested members directly, and the _Alignas and _Alignof operators for controlling alignment. C23, the newest standard, adds nullptr as a null pointer constant, constexpr for compile-time constants, typeof for declaring a variable with the type of an expression, and binary literals like 0b1010. Adopting new standards is gradual: compilers support them at different speeds, so feature-test macros and -std flags matter.',
          syntax: '#define TYPE_NAME(x) _Generic((x), int: "int", double: "double", default: "other")\n_Static_assert(sizeof(int) == 4, "int must be 4 bytes");\nint *p = nullptr; // C23',
          analogy: '_Generic is like a post office that reads the shape of your parcel and routes it to the right counter automatically, without you labelling it.',
          exampleCode: `#include <stdio.h>

#define TYPE_NAME(x) _Generic((x), int: "int", double: "double", char: "char", default: "other")

_Static_assert(sizeof(int) >= 2, "int must be at least 2 bytes");

int main(void) {
    int a = 5;
    double b = 2.5;
    printf("a is %s\\n", TYPE_NAME(a));
    printf("b is %s\\n", TYPE_NAME(b));
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define a macro using _Generic to name the type of an expression.', 'Add a _Static_assert that int is at least 2 bytes.', 'Call the macro with an int and a double.', 'The macro expands to "int" and "double" at compile time.', 'If the static assertion failed, compilation would stop with your message.'],
          commonMistakes: ['Using _Generic with an expression that has side effects', 'Expecting _Static_assert to run at runtime', 'Using C23 features with a compiler that does not support them yet'],
          debuggingExercise: {
            prompt: 'This _Generic macro always returns "other". Fix it.',
            buggyCode: `#include <stdio.h>

#define TYPE_NAME(x) _Generic((x), int: "int", default: "other")

int main(void) {
    short s = 5;
    printf("%s\\n", TYPE_NAME(s));
    return 0;
}`,
            fixedCode: `#include <stdio.h>

#define TYPE_NAME(x) _Generic((x), int: "int", short: "short", default: "other")

int main(void) {
    short s = 5;
    printf("%s\\n", TYPE_NAME(s));
    return 0;
}`,
            explanation: 'The macro had no case for short, so the default branch was selected. Adding a short case makes _Generic match the actual type.'
          },
          miniChallenge: 'Write a _Static_assert that verifies your struct Point is exactly 8 bytes, and see what happens if you change a member.',
          summary: '_Generic selects code by type at compile time, _Static_assert verifies assumptions before the program runs, and C23 adds nullptr and constexpr. Next module: undefined behaviour.',
          knowledgeCheck: [
            q('What does _Generic do?', ['It generates random code', 'It selects an expression based on the compile-time type of another expression', 'It creates generic variables at runtime', 'It sorts types'], 1, '_Generic is a compile-time type-based selection, used for type-generic macros.'),
            q('When does _Static_assert run?', ['At runtime', 'At compile time', 'At link time', 'Never'], 1, '_Static_assert is evaluated by the compiler and stops compilation if the condition is false.')
          ],
          exercises: [
            ex('c-m21-l2-e1', 'Type name via _Generic', 'write-code', 'Read an integer and print "int" (demonstrating that the input variable has type int). Use a _Generic macro TYPE_NAME in your solution.',
              '#include <stdio.h>\n\n#define TYPE_NAME(x) _Generic((x), int: "int", double: "double", default: "other")\n\nint main(void) {\n    int value;\n    // read value, print TYPE_NAME(value)\n    return 0;\n}',
              '#include <stdio.h>\n\n#define TYPE_NAME(x) _Generic((x), int: "int", double: "double", default: "other")\n\nint main(void) {\n    int value;\n    scanf("%d", &value);\n    printf("%s\\n", TYPE_NAME(value));\n    return 0;\n}',
              'The _Generic macro selects "int" for an int expression.',
              'O(1)', [tc('type of 42', '42\n', 'int'), tc('type of -7', '-7\n', 'int', true)], h5(
                '_Generic picks a branch based on the type of the expression.',
                'Read an int, then print TYPE_NAME(value) with %s.',
                'printf("%s\\n", TYPE_NAME(value));',
                'If "other" prints, the macro is missing an int case.',
                'Solution: printf("%s\\n", TYPE_NAME(value)); An int variable yields "int".'))
          ]
        }
      ]
    },
    {
      id: 'c-m22',
      title: 'Undefined Behavior',
      description: 'Recognizing, avoiding, and detecting undefined behaviour.',
      level: 'advanced',
      order: 22,
      lessons: [
        {
          id: 'c-m22-l1',
          slug: 'what-is-ub',
          title: 'What Undefined Behaviour Is and Why It Matters',
          objectives: ['Define undefined behaviour', 'Recognize common UB: overflow, null dereference, use-after-free', 'Explain why UB is not just a crash'],
          introduction: 'Undefined behaviour means the C standard imposes no requirements: the program can do anything, including appearing to work. This lesson explains why UB is the most dangerous concept in C.',
          concept: 'Undefined behaviour, or UB, is a situation where the C standard says the program\'s behaviour is undefined. Common examples include signed integer overflow, dereferencing a null or dangling pointer, reading uninitialized memory, accessing an array out of bounds, and modifying a variable twice between sequence points. The danger is that UB does not guarantee a crash: a program with UB may appear to work for years, then break when the compiler, optimization level, or platform changes, because the compiler is allowed to assume UB never happens and optimize accordingly. A famous example is a null check that the compiler removes because it proved the pointer was already dereferenced, making the check dead code. This is why "it works on my machine" is not evidence of correctness. The only safe approach is to write code that never triggers UB, and to use sanitizers to find it during testing.',
          syntax: 'int x = INT_MAX;\nx + 1;            // signed overflow: UB\nint *p = NULL;\n*p = 5;           // null dereference: UB\nint a[3];\na[3] = 1;          // out of bounds: UB',
          analogy: 'Undefined behaviour is like driving through a red light at an empty junction: nothing bad may happen today, but the rules say anything could happen, and you cannot complain when it does.',
          exampleCode: `#include <stdio.h>
#include <limits.h>

int main(void) {
    int x = INT_MAX;
    printf("INT_MAX = %d\\n", x);
    // x + 1 would be signed overflow: undefined behaviour.
    // Safe alternative: check before adding.
    if (x < INT_MAX) {
        printf("x + 1 = %d\\n", x + 1);
    } else {
        printf("Adding 1 would overflow.\\n");
    }
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Print INT_MAX, the largest int.', 'Adding 1 to it would overflow, which is UB for signed ints.', 'Check x < INT_MAX before adding.', 'Since x equals INT_MAX, print the safe message instead.', 'This pattern of checking before the operation prevents UB.'],
          commonMistakes: ['Assuming UB always crashes, so "working" code must be fine', 'Relying on signed overflow wrapping, which the standard does not guarantee', 'Reading uninitialized variables and assuming they are zero'],
          debuggingExercise: {
            prompt: 'This program has undefined behaviour that a sanitizer would catch. Identify and fix it.',
            buggyCode: `#include <stdio.h>

int main(void) {
    int a[3] = {1, 2, 3};
    int sum = 0;
    for (int i = 0; i <= 3; i++) {
        sum += a[i];
    }
    printf("%d\\n", sum);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

int main(void) {
    int a[3] = {1, 2, 3};
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += a[i];
    }
    printf("%d\\n", sum);
    return 0;
}`,
            explanation: 'The loop read a[3], one past the end of the array, which is undefined behaviour. Changing the condition to i < 3 visits only valid elements.'
          },
          miniChallenge: 'Compile a program with -fsanitize=address,undefined and run it on code with an out-of-bounds access to see the report.',
          summary: 'Undefined behaviour means the standard guarantees nothing, and compilers exploit that freedom, so UB can silently corrupt results. Avoid it by construction and detect it with sanitizers. Next: the tools that catch UB.',
          knowledgeCheck: [
            q('What does "undefined behaviour" mean in C?', ['The program always crashes', 'The standard imposes no requirements, so anything can happen', 'The behaviour is defined by the operating system', 'It means a compile error'], 1, 'UB means the program may do anything, including appearing to work, which makes it especially dangerous.'),
            q('Which of these is undefined behaviour?', ['Reading a[2] of int a[3]', 'Signed integer overflow', 'Printing with printf', 'Declaring a variable'], 1, 'Signed overflow is UB; unsigned overflow is defined to wrap.')
          ],
          exercises: [
            ex('c-m22-l1-e1', 'Safe addition check', 'write-code', 'Read two integers a and b. If their sum would overflow a 32-bit signed int, print "overflow". Otherwise print the sum. Use the check a > 2147483647 - b for positive b.',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    // read a and b; print "overflow" if a + b exceeds INT_MAX, else print the sum\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    if (b > 0 && a > 2147483647 - b) {\n        printf("overflow\\n");\n    } else {\n        printf("%d\\n", a + b);\n    }\n    return 0;\n}',
              'Checking a > INT_MAX - b before adding avoids performing the overflowing addition.',
              'O(1)', [tc('small sum', '100 200\n', '300'), tc('overflow case', '2147483647 1\n', 'overflow', true)], h5(
                'Check for overflow before adding, not after.',
                'If b is positive and a is greater than INT_MAX - b, print "overflow".',
                'if (b > 0 && a > 2147483647 - b) printf("overflow\\n"); else printf("%d\\n", a + b);',
                'If the overflow case prints a negative number, the addition ran before the check.',
                'Solution: test a > 2147483647 - b first. 2147483647 + 1 overflows, but 100 + 200 gives 300.'))
          ]
        },
        {
          id: 'c-m22-l2',
          slug: 'sanitizers-and-tools',
          title: 'Sanitizers, Valgrind, and Static Analysis',
          objectives: ['Use AddressSanitizer and UBSan', 'Run Valgrind to find leaks', 'Use compiler warnings and static analyzers'],
          introduction: 'You cannot see undefined behaviour by reading code alone. This lesson introduces the tools that find it for you: sanitizers built into the compiler, Valgrind, and static analysis.',
          concept: 'AddressSanitizer, enabled with -fsanitize=address, instruments your program to detect out-of-bounds accesses, use-after-free, double-free, and leaks at runtime, printing a detailed report with the exact line. UndefinedBehaviorSanitizer, enabled with -fsanitize=undefined, catches signed overflow, misaligned accesses, and other UB as it happens. These sanitizers slow the program down, so they are used in testing, not in production. Valgrind runs your program on a virtual machine that tracks every memory access, finding leaks and invalid reads without recompiling, at a larger speed cost. Static analyzers like clang --analyze, cppcheck, and gcc -fanalyzer examine the code without running it and report suspicious patterns. Compiler warnings are the first line of defence: -Wall -Wextra -Werror turns warnings into errors so they cannot be ignored. The professional workflow is to develop with warnings and sanitizers on, fix everything they report, and only then ship.',
          syntax: 'gcc -fsanitize=address,undefined -g program.c -o program\n./program\nvalgrind --leak-check=full ./program\ngcc -Wall -Wextra -Werror -fanalyzer program.c -o program',
          analogy: 'Sanitizers are like X-ray machines at an airport: they see the hidden problems inside your luggage (your program) that a visual inspection would miss.',
          exampleCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = malloc(3 * sizeof(int));
    if (a == NULL) return 1;
    a[0] = 1; a[1] = 2; a[2] = 3;
    int sum = a[0] + a[1] + a[2];
    printf("Sum: %d\\n", sum);
    free(a);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Allocate three ints and check for NULL.', 'Fill them with 1, 2, 3.', 'Sum them to get 6.', 'Free the memory.', 'Compile with -fsanitize=address,undefined and run: no report means no errors were found.'],
          commonMistakes: ['Shipping code that was never run under a sanitizer', 'Ignoring warnings because the program "works"', 'Running Valgrind on an optimized build, which hides some errors'],
          debuggingExercise: {
            prompt: 'A program runs cleanly but Valgrind reports a leak. What is the most likely cause, and how do you fix it?',
            buggyCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = malloc(100 * sizeof(int));
    a[0] = 42;
    printf("%d\\n", a[0]);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = malloc(100 * sizeof(int));
    if (a == NULL) return 1;
    a[0] = 42;
    printf("%d\\n", a[0]);
    free(a);
    return 0;
}`,
            explanation: 'The program allocated memory and never freed it, which Valgrind reports as a leak. Adding free(a) before every exit path fixes it.'
          },
          miniChallenge: 'Compile one of your earlier programs with -fsanitize=address,undefined and fix any issues it reports.',
          summary: 'Sanitizers and Valgrind find memory errors and UB at runtime, while warnings and static analysis find them at compile time. Develop with them on and fix everything they report. Next module: performance.',
          knowledgeCheck: [
            q('What does AddressSanitizer detect?', ['Syntax errors', 'Out-of-bounds accesses, use-after-free, double-free, and leaks', 'Slow code', 'Missing includes'], 1, 'ASan instruments memory accesses and reports errors with exact locations.'),
            q('What does gcc -Werror do?', ['Disables warnings', 'Turns warnings into errors', 'Enables sanitizers', 'Optimizes the code'], 1, '-Werror makes the build fail on any warning, so warnings cannot be ignored.')
          ],
          exercises: [
            ex('c-m22-l2-e1', 'Check an index safely', 'write-code', 'Read an index i and print "valid" if it is a valid index for an array of size 10 (0 to 9), otherwise print "invalid". This is the bounds check sanitizers enforce.',
              '#include <stdio.h>\n\nint main(void) {\n    int i;\n    // read i, print valid or invalid\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int i;\n    scanf("%d", &i);\n    if (i >= 0 && i < 10) printf("valid\\n");\n    else printf("invalid\\n");\n    return 0;\n}',
              'A valid index is at least 0 and less than the size.',
              'O(1)', [tc('index 5 valid', '5\n', 'valid'), tc('index 10 invalid', '10\n', 'invalid', true)], h5(
                'Valid indices for size 10 run from 0 to 9.',
                'Test i >= 0 && i < 10 and print "valid" or "invalid".',
                'if (i >= 0 && i < 10) printf("valid\\n"); else printf("invalid\\n");',
                'If 10 prints "valid", the upper bound should be i < 10, not i <= 10.',
                'Solution: if (i >= 0 && i < 10) print "valid", else "invalid". 5 is valid, 10 is not.'))
          ]
        }
      ]
    },
    {
      id: 'c-m23',
      title: 'Performance',
      description: 'Measuring, profiling, and optimizing C code.',
      level: 'advanced',
      order: 23,
      lessons: [
        {
          id: 'c-m23-l1',
          slug: 'measuring-performance',
          title: 'Measuring Performance: Timing and Profiling',
          objectives: ['Time code with clock() and clock_gettime', 'Use gprof and perf to profile', 'Interpret profiling results'],
          introduction: 'You cannot optimize what you cannot measure. This lesson covers timing code, profiling to find hot spots, and the discipline of measuring before and after every change.',
          concept: 'Performance work starts with measurement. clock() from <time.h> returns processor time used, and clock_gettime with CLOCK_MONOTONIC gives wall-clock time with nanosecond resolution, which is better for timing real operations. A single run is noisy, so benchmark by repeating the work many times and reporting the average, and warm up caches first. Profilers like gprof and Linux perf sample where the program spends its time: perf record followed by perf report shows which functions dominate, and perf stat counts cache misses and branch mispredictions. The classic finding is that a small fraction of the code accounts for most of the time, so optimizing the hot spot matters and optimizing elsewhere is wasted effort. Always measure before and after a change, and keep the benchmark realistic, because microbenchmarks on tiny inputs often mislead. Compiler optimization levels matter enormously: -O2 is the standard choice, and -O3 adds aggressive optimizations that sometimes help and sometimes hurt.',
          syntax: 'struct timespec start, end;\nclock_gettime(CLOCK_MONOTONIC, &start);\n// ... work ...\nclock_gettime(CLOCK_MONOTONIC, &end);\ndouble seconds = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;',
          analogy: 'Profiling is like timing each runner in a relay race: it tells you which leg is slow, so you train that runner instead of the whole team.',
          exampleCode: `#include <stdio.h>
#include <time.h>

int main(void) {
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    long sum = 0;
    for (long i = 0; i < 100000000; i++) {
        sum += i;
    }
    clock_gettime(CLOCK_MONOTONIC, &end);
    double seconds = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
    printf("Sum: %ld, Time: %.3f seconds\\n", sum, seconds);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Record the start time with clock_gettime.', 'Run a loop that adds numbers from 0 to 100 million.', 'Record the end time.', 'Compute the elapsed seconds from the two timestamps.', 'Print the sum and the elapsed time.'],
          commonMistakes: ['Timing a single run and trusting the noise', 'Forgetting that the compiler can optimize away a loop whose result is unused', 'Using clock() when wall-clock time is what matters'],
          debuggingExercise: {
            prompt: 'This benchmark reports 0.000 seconds even for a large loop. Why?',
            buggyCode: `#include <stdio.h>
#include <time.h>

int main(void) {
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    long sum = 0;
    for (long i = 0; i < 100000000; i++) {
        sum += i;
    }
    clock_gettime(CLOCK_MONOTONIC, &end);
    double seconds = end.tv_sec - start.tv_sec;
    printf("Time: %.3f\\n", seconds);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <time.h>

int main(void) {
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    long sum = 0;
    for (long i = 0; i < 100000000; i++) {
        sum += i;
    }
    clock_gettime(CLOCK_MONOTONIC, &end);
    double seconds = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
    printf("Time: %.3f, sum %ld\\n", seconds, sum);
    return 0;
}`,
            explanation: 'The original code only used tv_sec, which has one-second resolution, so a sub-second run showed 0. Adding the nanosecond difference gives real precision, and printing sum stops the compiler from deleting the loop.'
          },
          miniChallenge: 'Time a bubble sort and a qsort on 100,000 integers and compare the results.',
          summary: 'Measure with clock_gettime, profile with perf, and optimize the hot spots the profiler finds. Always measure before and after. Next: cache-friendly code.',
          knowledgeCheck: [
            q('Why should a benchmark repeat the work many times?', ['To make it slower', 'A single run is noisy; averaging reduces measurement error', 'To fill the cache', 'It is required by law'], 1, 'Timing noise from scheduling and caches makes single runs unreliable; repetition and averaging give a stable result.'),
            q('What does perf report show?', ['Syntax errors', 'Which functions the program spends time in', 'Memory leaks', 'Compiler warnings'], 1, 'perf samples the program counter and attributes time to functions, revealing hot spots.')
          ],
          exercises: [
            ex('c-m23-l1-e1', 'Count operations', 'write-code', 'Read n and print the number of loop iterations a nested loop would perform: for i in 1..n, for j in 1..i, count++. (This is n(n+1)/2; compute it with a formula.)',
              '#include <stdio.h>\n\nint main(void) {\n    long n;\n    // read n, print n*(n+1)/2\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    long n;\n    scanf("%ld", &n);\n    printf("%ld\\n", n * (n + 1) / 2);\n    return 0;\n}',
              'The inner loop runs 1 + 2 + ... + n times, which equals n(n+1)/2.',
              'O(1)', [tc('n = 10', '10\n', '55'), tc('n = 100', '100\n', '5050', true)], h5(
                'The nested loops run 1 + 2 + ... + n times in total.',
                'Use the formula n * (n + 1) / 2 instead of looping.',
                'printf("%ld\\n", n * (n + 1) / 2);',
                'If the answer is off by one, check the formula uses n + 1, not n - 1.',
                'Solution: n * (n + 1) / 2. For n = 10 the count is 55.'))
          ]
        },
        {
          id: 'c-m23-l2',
          slug: 'cache-and-optimization',
          title: 'Cache-Friendly Code and Compiler Optimizations',
          objectives: ['Explain how CPU caches affect performance', 'Write cache-friendly loops', 'Use restrict and -O2 effectively'],
          introduction: 'Modern CPUs are fast, but memory is slow, so the cache decides performance. This lesson explains cache locality and the code patterns that exploit it, plus how the compiler helps.',
          concept: 'A CPU cache holds recently used memory in small, fast storage close to the processor. When the program accesses memory, the CPU loads a whole cache line, typically 64 bytes, so accessing nearby data is cheap and jumping around is expensive. Sequential access is fast because each cache line is used fully before moving on, while strided access wastes most of each line. For a 2D array stored row-major, looping row by row visits memory in order, but looping column by column jumps by the row size on every step and can be many times slower. The restrict keyword promises the compiler that a pointer is the only way to access its data, which lets the compiler reorder loads and stores and vectorize loops. Compiler flags matter: -O2 enables most optimizations, -march=native lets the compiler use the CPU\'s newest instructions, and -funroll-loops can help tight loops. But the biggest wins usually come from better algorithms and better memory layout, not from micro-optimizations.',
          syntax: 'void add_arrays(int *restrict a, const int *restrict b, int n) {\n    for (int i = 0; i < n; i++) a[i] += b[i];\n}\n// gcc -O2 -march=native program.c -o program',
          analogy: 'The cache is like a desk: data on the desk is instant to reach, data in the filing cabinet takes a trip, so you keep the papers you are working on together on the desk.',
          exampleCode: `#include <stdio.h>

#define N 512

int main(void) {
    static int grid[N][N];
    long sum = 0;
    // Row-major order: fast, sequential access
    for (int r = 0; r < N; r++) {
        for (int c = 0; c < N; c++) {
            sum += grid[r][c];
        }
    }
    printf("Sum: %ld\\n", sum);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare a 512 by 512 grid as a static array to avoid stack overflow.', 'Loop rows in the outer loop and columns in the inner loop.', 'This visits memory sequentially, using each cache line fully.', 'Sum all elements.', 'Try swapping the loops to column-major order and time both versions to feel the difference.'],
          commonMistakes: ['Looping column-major over a row-major array', 'Chasing pointers through a linked list when an array would be cache-friendly', 'Optimizing without profiling first'],
          debuggingExercise: {
            prompt: 'This loop is slow on a large matrix. What is wrong and how do you fix it?',
            buggyCode: `#include <stdio.h>

#define N 1024
static int grid[N][N];

int main(void) {
    long sum = 0;
    for (int c = 0; c < N; c++) {
        for (int r = 0; r < N; r++) {
            sum += grid[r][c];
        }
    }
    printf("%ld\\n", sum);
    return 0;
}`,
            fixedCode: `#include <stdio.h>

#define N 1024
static int grid[N][N];

int main(void) {
    long sum = 0;
    for (int r = 0; r < N; r++) {
        for (int c = 0; c < N; c++) {
            sum += grid[r][c];
        }
    }
    printf("%ld\\n", sum);
    return 0;
}`,
            explanation: 'The loops visited memory column by column, jumping a whole row on every access and wasting cache lines. Swapping the loops to row-major order makes access sequential and much faster.'
          },
          miniChallenge: 'Benchmark row-major versus column-major summation on a 1024x1024 matrix and report the speed difference.',
          summary: 'Sequential, cache-friendly access beats strided access by a wide margin. Use restrict to help the compiler, -O2 for optimization, and profiling to find what matters. Next module: concurrency.',
          knowledgeCheck: [
            q('Why is row-major traversal of a C 2D array faster than column-major?', ['It uses less code', 'It accesses memory sequentially, using each cache line fully', 'It uses fewer variables', 'It avoids the stack'], 1, 'C arrays are row-major, so row-by-row access is sequential and cache-friendly.'),
            q('What does the restrict keyword promise the compiler?', ['The pointer is never NULL', 'The pointer is the only way to access its data, enabling more optimization', 'The pointer is read-only', 'The pointer is on the stack'], 1, 'restrict guarantees no aliasing through other pointers, so the compiler can reorder and vectorize freely.')
          ],
          exercises: [
            ex('c-m23-l2-e1', 'Row sum', 'write-code', 'Read a 3x3 grid of integers and print the sum of each row on its own line. (Row-major traversal: process one row completely before the next.)',
              '#include <stdio.h>\n\nint main(void) {\n    int grid[3][3];\n    // read 9 numbers, print the sum of each row\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int grid[3][3];\n    for (int r = 0; r < 3; r++) {\n        for (int c = 0; c < 3; c++) scanf("%d", &grid[r][c]);\n    }\n    for (int r = 0; r < 3; r++) {\n        int sum = 0;\n        for (int c = 0; c < 3; c++) sum += grid[r][c];\n        printf("%d\\n", sum);\n    }\n    return 0;\n}',
              'Two nested loops in row-major order read the grid, then a second pass sums each row.',
              'O(n^2)', [tc('row sums', '1 2 3\n4 5 6\n7 8 9\n', '6\n15\n24'), tc('all ones', '1 1 1\n1 1 1\n1 1 1\n', '3\n3\n3', true)], h5(
                'Process the grid row by row, summing each row separately.',
                'Read the grid with nested loops, then loop rows again summing the three columns.',
                'for (int r = 0; r < 3; r++) { int sum = 0; for (int c = 0; c < 3; c++) sum += grid[r][c]; printf("%d\\n", sum); }',
                'If the sums accumulate across rows, reset sum to 0 at the start of each row.',
                'Solution: sum each row separately and print it. Rows of 1..9 give 6, 15, 24.'))
          ]
        }
      ]
    },
    {
      id: 'c-m24',
      title: 'Concurrency',
      description: 'Threads, mutexes, and data races with POSIX threads.',
      level: 'advanced',
      order: 24,
      lessons: [
        {
          id: 'c-m24-l1',
          slug: 'pthreads-basics',
          title: 'Threads with POSIX pthreads',
          objectives: ['Create and join threads', 'Pass data to a thread function', 'Explain the thread lifecycle'],
          introduction: 'Threads let a program do several things at once on multi-core machines. This lesson introduces POSIX threads: creating them, passing arguments, and waiting for them to finish.',
          concept: 'A thread is a separate flow of execution inside one process, sharing the same memory. pthread_create starts a new thread running a function that takes a void * argument and returns a void *. The argument is usually a pointer to a struct holding the thread\'s inputs, and it must stay alive until the thread has read it, so allocating it on the heap or in an array that outlives the thread is safest. pthread_join waits for a thread to finish and collects its return value. Threads share global variables and the heap, which makes communication easy and data races possible: two threads writing the same variable at the same time is undefined behaviour. The main thread must join or detach every thread it creates, or the program may exit while threads are still running. Compiling with -pthread links the thread library and defines the needed macros. Threads are ideal for parallel work like processing chunks of an array, but the overhead of creating them means very small tasks are better done serially.',
          syntax: '#include <pthread.h>\nvoid *worker(void *arg) { return NULL; }\npthread_t t;\npthread_create(&t, NULL, worker, arg);\npthread_join(t, NULL);\n// gcc program.c -o program -pthread',
          analogy: 'Threads are like cooks in one kitchen sharing the same ingredients: they can work in parallel, but two cooks grabbing the same bowl at once is a recipe for a mess.',
          exampleCode: `#include <stdio.h>
#include <pthread.h>

void *print_numbers(void *arg) {
    int id = *(int *)arg;
    for (int i = 0; i < 3; i++) {
        printf("Thread %d: %d\\n", id, i);
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    int id1 = 1, id2 = 2;
    pthread_create(&t1, NULL, print_numbers, &id1);
    pthread_create(&t2, NULL, print_numbers, &id2);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("All threads done.\\n");
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define a thread function that prints numbers with its id.', 'Create two threads, passing each its own id variable.', 'The threads run concurrently and print interleaved lines.', 'Join both threads to wait for them to finish.', 'Print a final message once all threads are done.'],
          commonMistakes: ['Passing the address of a loop variable that changes before the thread reads it', 'Forgetting to join threads, so main exits early', 'Returning a pointer to a thread-local stack variable'],
          debuggingExercise: {
            prompt: 'Both threads print the same id. Fix it.',
            buggyCode: `#include <stdio.h>
#include <pthread.h>

void *worker(void *arg) {
    printf("id = %d\\n", *(int *)arg);
    return NULL;
}

int main(void) {
    pthread_t ts[2];
    for (int i = 0; i < 2; i++) {
        pthread_create(&ts[i], NULL, worker, &i);
    }
    for (int i = 0; i < 2; i++) pthread_join(ts[i], NULL);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <pthread.h>

void *worker(void *arg) {
    printf("id = %d\\n", *(int *)arg);
    return NULL;
}

int main(void) {
    pthread_t ts[2];
    int ids[2] = {0, 1};
    for (int i = 0; i < 2; i++) {
        pthread_create(&ts[i], NULL, worker, &ids[i]);
    }
    for (int i = 0; i < 2; i++) pthread_join(ts[i], NULL);
    return 0;
}`,
            explanation: 'Both threads received &i, the same loop variable, which had changed by the time they read it. Giving each thread its own element of an ids array fixes the race.'
          },
          miniChallenge: 'Write a program that splits summing an array of 1000 numbers across 4 threads, each summing a quarter.',
          summary: 'pthread_create starts a thread, pthread_join waits for it, and each thread needs its own stable argument storage. Shared memory makes races possible, which the next lesson addresses. Next: mutexes.',
          knowledgeCheck: [
            q('What does pthread_join do?', ['Starts a thread', 'Waits for a thread to finish', 'Cancels a thread', 'Creates a mutex'], 1, 'pthread_join blocks until the target thread exits and collects its return value.'),
            q('Why is passing &i (a loop variable) to threads a bug?', ['It is too slow', 'All threads share the same variable, which changes before they read it', 'It leaks memory', 'It is a compile error'], 1, 'Each thread must get its own storage; sharing the loop variable creates a race.')
          ],
          exercises: [
            ex('c-m24-l1-e1', 'Parallel sum parts', 'write-code', 'Read 4 integers and print their sum. (This models a thread splitting work into parts and combining the partial results.)',
              '#include <stdio.h>\n\nint main(void) {\n    int parts[4];\n    // read 4 numbers, print their sum\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int parts[4];\n    int sum = 0;\n    for (int i = 0; i < 4; i++) {\n        scanf("%d", &parts[i]);\n        sum += parts[i];\n    }\n    printf("%d\\n", sum);\n    return 0;\n}',
              'Reading four partial sums and adding them gives the total.',
              'O(n)', [tc('sum of parts', '10 20 30 40\n', '100'), tc('all zero', '0 0 0 0\n', '0', true)], h5(
                'Combine partial results by adding them together.',
                'Read the four numbers into an array and accumulate their sum.',
                'int sum = 0; for (int i = 0; i < 4; i++) { scanf("%d", &parts[i]); sum += parts[i]; }',
                'If the sum is missing a part, check the loop runs four times.',
                'Solution: read four values and print their sum. 10 + 20 + 30 + 40 is 100.'))
          ]
        },
        {
          id: 'c-m24-l2',
          slug: 'mutexes-data-races',
          title: 'Mutexes and Data Races',
          objectives: ['Protect shared data with a mutex', 'Explain data races and deadlocks', 'Use condition variables for signalling'],
          introduction: 'Shared data needs protection, or threads will corrupt it. This lesson covers mutexes for mutual exclusion, the data races they prevent, and the deadlocks they can cause if misused.',
          concept: 'A mutex is a lock that only one thread can hold at a time. A thread calls pthread_mutex_lock before touching shared data and pthread_mutex_unlock when it is done, so the critical section runs as if it were single-threaded. A data race is when two threads access the same memory at the same time and at least one writes; it is undefined behaviour in C, and it can produce lost updates, torn reads, and crashes that appear randomly. The classic example is two threads incrementing a shared counter without a lock: both read 5, both write 6, and one increment is lost. A deadlock happens when two threads each hold a lock the other needs, and both wait forever; the fix is to always acquire locks in the same order. Condition variables let a thread wait until a condition becomes true, such as a queue becoming non-empty, without busy-waiting. Keep critical sections short, never call blocking operations while holding a lock, and prefer designs where threads own their own data.',
          syntax: 'pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\npthread_mutex_lock(&lock);\ncounter++;\npthread_mutex_unlock(&lock);',
          analogy: 'A mutex is like the key to a single-occupancy bathroom: only the thread holding the key can enter, and everyone else waits their turn.',
          exampleCode: `#include <stdio.h>
#include <pthread.h>

int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void *increment(void *arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter: %d\\n", counter);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare a shared counter and a mutex.', 'Each thread increments the counter 100,000 times.', 'Every increment is protected by lock and unlock.', 'Join both threads.', 'The counter is exactly 200,000; without the mutex it would usually be less.'],
          commonMistakes: ['Forgetting to unlock on an early return, freezing other threads', 'Locking two mutexes in different orders in different places, causing deadlock', 'Holding a lock while doing slow I/O'],
          debuggingExercise: {
            prompt: 'This program usually prints less than 200000. Fix it.',
            buggyCode: `#include <stdio.h>
#include <pthread.h>

int counter = 0;

void *increment(void *arg) {
    for (int i = 0; i < 100000; i++) {
        counter++;
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter: %d\\n", counter);
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <pthread.h>

int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void *increment(void *arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter: %d\\n", counter);
    return 0;
}`,
            explanation: 'Two threads incremented counter without synchronization, so increments were lost in a data race. Protecting the increment with a mutex makes each update atomic.'
          },
          miniChallenge: 'Write a program where two threads each add 100,000 to a shared total protected by a mutex, and verify the result is 200,000.',
          summary: 'Mutexes serialize access to shared data and prevent data races; consistent lock ordering prevents deadlocks. Keep critical sections short. Next module: systems programming.',
          knowledgeCheck: [
            q('What is a data race?', ['Two threads reading the same data', 'Two threads accessing the same memory concurrently with at least one writing', 'Two threads running at once', 'A thread that is too fast'], 1, 'A data race is concurrent access where at least one is a write, and it is undefined behaviour in C.'),
            q('How do you prevent a deadlock when two locks are needed?', ['Never use locks', 'Always acquire locks in the same order everywhere', 'Use more threads', 'Lock faster'], 1, 'A consistent global lock order prevents the circular wait that causes deadlock.')
          ],
          exercises: [
            ex('c-m24-l2-e1', 'Protected counter simulation', 'write-code', 'Read two integers a and b, each representing increments from a thread, and print their total. (In real threaded code a mutex would protect the shared counter; here you compute the correct combined total.)',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    // read a and b, print a + b\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a + b);\n    return 0;\n}',
              'Adding the two partial counts gives the protected total.',
              'O(1)', [tc('100000 + 100000', '100000 100000\n', '200000'), tc('0 + 5', '0 5\n', '5', true)], h5(
                'The correct total is the sum of the two partial counts.',
                'Read a and b and print a + b.',
                'printf("%d\\n", a + b);',
                'If the total is short, one of the partial counts was lost, which is what a mutex prevents.',
                'Solution: print a + b. 100000 + 100000 is 200000.'))
          ]
        }
      ]
    },
    {
      id: 'c-m25',
      title: 'Systems Programming',
      description: 'Processes, signals, and POSIX system calls.',
      level: 'advanced',
      order: 25,
      lessons: [
        {
          id: 'c-m25-l1',
          slug: 'processes-fork-exec',
          title: 'Processes: fork and exec',
          objectives: ['Create a child process with fork', 'Replace a process image with exec', 'Wait for children and read exit status'],
          introduction: 'Programs can create new processes, and the Unix fork/exec model is how shells launch commands. This lesson covers fork, exec, and wait.',
          concept: 'fork() creates a new process by duplicating the current one: in the parent it returns the child\'s process ID, in the child it returns 0, and on failure it returns -1. After fork, both processes continue from the same point with their own copies of memory, so changes in one do not affect the other. The child usually calls one of the exec functions, such as execlp, to replace its memory image with a new program, while the parent calls wait to collect the child\'s exit status and prevent it from becoming a zombie. A zombie is a child that has exited but whose parent has not waited for it, leaving an entry in the process table. The exec family differs in how arguments are passed: execl takes a list ending in NULL, execv takes an array, and the p variants search the PATH. Together, fork and exec are the foundation of shells, servers, and job control: fork to create, exec to run, wait to clean up.',
          syntax: 'pid_t pid = fork();\nif (pid == 0) {\n    execlp("ls", "ls", "-l", NULL);\n    perror("execlp");\n    _exit(1);\n} else if (pid > 0) {\n    int status;\n    wait(&status);\n}',
          analogy: 'fork is like a cell dividing: one process becomes two identical copies, and each then goes its own way.',
          exampleCode: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();
    if (pid == 0) {
        printf("Child: my pid is %d\\n", getpid());
        _exit(0);
    } else if (pid > 0) {
        int status;
        wait(&status);
        printf("Parent: child exited with status %d\\n", WEXITSTATUS(status));
    } else {
        perror("fork");
        return 1;
    }
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Call fork to create a child process.', 'In the child (pid == 0), print the child pid and exit.', 'In the parent (pid > 0), wait for the child.', 'Extract the exit status with WEXITSTATUS.', 'Handle fork failure with perror.'],
          commonMistakes: ['Forgetting to wait, leaving zombie processes', 'Using exit instead of _exit in the child after fork, which flushes buffers twice', 'Assuming the parent and child share memory after fork'],
          debuggingExercise: {
            prompt: 'This program prints its output twice. Why, and how do you fix it?',
            buggyCode: `#include <stdio.h>
#include <unistd.h>

int main(void) {
    printf("Hello");
    fork();
    printf(" world\\n");
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <unistd.h>

int main(void) {
    printf("Hello");
    fflush(stdout);
    fork();
    printf(" world\\n");
    return 0;
}`,
            explanation: 'The first printf was buffered and the buffer was duplicated by fork, so both processes flushed "Hello". Flushing stdout before fork, or using a newline, prevents the duplication.'
          },
          miniChallenge: 'Write a program that forks three children, each printing its pid, and has the parent wait for all of them.',
          summary: 'fork duplicates the process, exec replaces the image, and wait reaps the child. Always wait to avoid zombies, and flush buffers before forking. Next: signals.',
          knowledgeCheck: [
            q('What does fork return in the child process?', ['The child pid', '0', '-1', 'The parent pid'], 1, 'fork returns 0 in the child and the child pid in the parent.'),
            q('What is a zombie process?', ['A process that never starts', 'A child that exited but whose parent has not waited for it', 'A process with no memory', 'A process that runs forever'], 1, 'The child remains in the process table until the parent calls wait.')
          ],
          exercises: [
            ex('c-m25-l1-e1', 'Count processes', 'write-code', 'Read an integer n (number of child processes) and print n + 1, the total number of processes after forking n children (parent plus children).',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n, print n + 1\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", n + 1);\n    return 0;\n}',
              'Forking n children from one parent creates n + 1 processes in total.',
              'O(1)', [tc('fork 3 children', '3\n', '4'), tc('fork 0 children', '0\n', '1', true)], h5(
                'The parent counts as one process too.',
                'Print n + 1.',
                'printf("%d\\n", n + 1);',
                'If the answer is n, you forgot to count the parent process.',
                'Solution: print n + 1. Forking 3 children gives 4 processes total.'))
          ]
        },
        {
          id: 'c-m25-l2',
          slug: 'signals',
          title: 'Signals and Signal Handling',
          objectives: ['Explain what signals are', 'Install a handler with sigaction', 'Write async-signal-safe handlers'],
          introduction: 'Signals are how the operating system and other processes interrupt a program: Ctrl-C sends SIGINT, a timer sends SIGALRM, a broken pipe sends SIGPIPE. This lesson covers catching them safely.',
          concept: 'A signal is an asynchronous notification delivered to a process. Common signals include SIGINT from Ctrl-C, SIGTERM for a polite shutdown request, SIGSEGV for an invalid memory access, and SIGALRM from a timer. The default action for most signals is to terminate the process, but a program can install a handler with sigaction to run custom code instead. Handlers run asynchronously, interrupting the program at any point, so they may only call async-signal-safe functions: setting a volatile sig_atomic_t flag is safe, while printf and malloc are not. The standard pattern is for the handler to set a flag, and the main loop to check the flag and shut down cleanly. Signals can also be blocked with sigprocmask to protect critical sections. Some signals, SIGKILL and SIGSTOP, cannot be caught or ignored. Understanding signals is essential for writing servers and daemons that shut down gracefully.',
          syntax: '#include <signal.h>\nvolatile sig_atomic_t stop = 0;\nvoid handler(int sig) { (void)sig; stop = 1; }\nstruct sigaction sa = {0};\nsa.sa_handler = handler;\nsigaction(SIGINT, &sa, NULL);',
          analogy: 'A signal is like a tap on the shoulder while you are working: it interrupts you briefly, you note the message, and then you decide what to do about it.',
          exampleCode: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

volatile sig_atomic_t stop = 0;

void handler(int sig) {
    (void)sig;
    stop = 1;
}

int main(void) {
    struct sigaction sa = {0};
    sa.sa_handler = handler;
    sigaction(SIGINT, &sa, NULL);
    printf("Press Ctrl-C to stop.\\n");
    while (!stop) {
        sleep(1);
    }
    printf("Shutting down cleanly.\\n");
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Declare a volatile sig_atomic_t flag that the handler sets.', 'Install the handler for SIGINT with sigaction.', 'Loop sleeping until the flag is set.', 'When Ctrl-C arrives, the handler sets stop to 1.', 'The loop exits and the program shuts down cleanly.'],
          commonMistakes: ['Calling printf or malloc inside a signal handler', 'Using signal() instead of the more reliable sigaction()', 'Forgetting volatile on the flag, so the compiler optimizes away the check'],
          debuggingExercise: {
            prompt: 'This handler sometimes never stops the loop. Fix it.',
            buggyCode: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

int stop = 0;

void handler(int sig) {
    (void)sig;
    stop = 1;
}

int main(void) {
    signal(SIGINT, handler);
    while (!stop) {
        sleep(1);
    }
    printf("Done\\n");
    return 0;
}`,
            fixedCode: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>

volatile sig_atomic_t stop = 0;

void handler(int sig) {
    (void)sig;
    stop = 1;
}

int main(void) {
    struct sigaction sa = {0};
    sa.sa_handler = handler;
    sigaction(SIGINT, &sa, NULL);
    while (!stop) {
        sleep(1);
    }
    printf("Done\\n");
    return 0;
}`,
            explanation: 'Without volatile, the compiler could cache stop in a register and never see the handler\'s change. volatile sig_atomic_t forces a fresh read, and sigaction is more reliable than signal.'
          },
          miniChallenge: 'Write a program that counts SIGINT presses and prints the count when it receives SIGTERM.',
          summary: 'Signals interrupt a process asynchronously; handlers should only set a volatile sig_atomic_t flag, and the main loop acts on it. Use sigaction, not signal. Next module: networking.',
          knowledgeCheck: [
            q('What may a signal handler safely do?', ['Call printf', 'Set a volatile sig_atomic_t flag', 'Call malloc', 'Open a file'], 1, 'Only async-signal-safe operations are allowed; setting a flag of type sig_atomic_t is the standard safe action.'),
            q('Which signal is sent by Ctrl-C?', ['SIGTERM', 'SIGINT', 'SIGKILL', 'SIGALRM'], 1, 'Ctrl-C sends SIGINT, which terminates the process unless a handler is installed.')
          ],
          exercises: [
            ex('c-m25-l2-e1', 'Signal numbers', 'write-code', 'Read a signal name code: 2 for SIGINT, 15 for SIGTERM. Print "interrupt" for 2, "terminate" for 15, and "other" for anything else.',
              '#include <stdio.h>\n\nint main(void) {\n    int sig;\n    // read sig, print the matching name\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int sig;\n    scanf("%d", &sig);\n    if (sig == 2) printf("interrupt\\n");\n    else if (sig == 15) printf("terminate\\n");\n    else printf("other\\n");\n    return 0;\n}',
              'SIGINT is signal 2 and SIGTERM is signal 15 on Linux.',
              'O(1)', [tc('signal 2', '2\n', 'interrupt'), tc('signal 15', '15\n', 'terminate', true)], h5(
                'SIGINT is 2 and SIGTERM is 15.',
                'Use if/else if to map 2 to "interrupt" and 15 to "terminate".',
                'if (sig == 2) printf("interrupt\\n"); else if (sig == 15) printf("terminate\\n"); else printf("other\\n");',
                'If 15 prints "other", check the second condition compares with 15.',
                'Solution: map 2 to "interrupt", 15 to "terminate", and anything else to "other".'))
          ]
        }
      ]
    },
    {
      id: 'c-m26',
      title: 'Networking',
      description: 'Sockets, TCP clients and servers, and the basics of network I/O.',
      level: 'advanced',
      order: 26,
      lessons: [
        {
          id: 'c-m26-l1',
          slug: 'sockets-intro',
          title: 'Sockets: The Basics of Network Communication',
          objectives: ['Explain what a socket is', 'Create a TCP client socket', 'Send and receive data over a socket'],
          introduction: 'Sockets are the endpoints of network communication. This lesson introduces the socket API and shows how to write a TCP client that connects to a server and exchanges data.',
          concept: 'A socket is an endpoint for communication, created with socket(AF_INET, SOCK_STREAM, 0) for TCP over IPv4. The client fills a sockaddr_in structure with the server\'s address and port, using inet_pton to convert a dotted address like "127.0.0.1" to binary, and htons to convert the port to network byte order. connect() establishes the TCP connection, after which send() and recv() exchange bytes, just like writing and reading a file. recv returns the number of bytes read, 0 when the peer closes the connection, and -1 on error. TCP is a byte stream, not a message stream, so a single send may arrive in several recv calls, and a program must loop until it has the expected number of bytes. The server side uses bind, listen, and accept, which the next lesson covers. Always close sockets with close() when done, and check every call for errors, because networks fail in ways local code does not.',
          syntax: 'int sock = socket(AF_INET, SOCK_STREAM, 0);\nstruct sockaddr_in addr = {0};\naddr.sin_family = AF_INET;\naddr.sin_port = htons(8080);\ninet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);\nconnect(sock, (struct sockaddr *)&addr, sizeof(addr));',
          analogy: 'A socket is like a telephone: socket() buys the phone, connect() dials the number, and send() and recv() are speaking and listening.',
          exampleCode: `#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

int main(void) {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) { perror("socket"); return 1; }
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);
    if (connect(sock, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        perror("connect");
        close(sock);
        return 1;
    }
    const char *msg = "Hello, server!\\n";
    send(sock, msg, strlen(msg), 0);
    char buf[256];
    ssize_t n = recv(sock, buf, sizeof(buf) - 1, 0);
    if (n > 0) {
        buf[n] = '\\0';
        printf("Reply: %s", buf);
    }
    close(sock);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Create a TCP socket.', 'Fill in the server address and port 8080.', 'Connect to the server.', 'Send a greeting message.', 'Receive the reply, null-terminate it, print it, and close the socket.'],
          commonMistakes: ['Forgetting htons on the port, so the server listens on the wrong port', 'Assuming one recv returns a whole message', 'Not checking the return value of recv'],
          debuggingExercise: {
            prompt: 'This client fails to connect to a server on port 8080. Fix it.',
            buggyCode: `#include <arpa/inet.h>

int main(void) {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_port = 8080;
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);
    connect(sock, (struct sockaddr *)&addr, sizeof(addr));
    return 0;
}`,
            fixedCode: `#include <arpa/inet.h>

int main(void) {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);
    connect(sock, (struct sockaddr *)&addr, sizeof(addr));
    return 0;
}`,
            explanation: 'The port must be in network byte order. On a little-endian machine, 8080 without htons is byte-swapped, so the client dialled the wrong port.'
          },
          miniChallenge: 'Modify the client to send a message typed by the user and print the server reply.',
          summary: 'Sockets connect programs over a network: socket creates one, connect dials the server, and send/recv exchange a byte stream. Ports need htons. Next: writing the server side.',
          knowledgeCheck: [
            q('What does htons do?', ['Converts a host to a socket', 'Converts a 16-bit value from host byte order to network byte order', 'Prints a port', 'Opens a socket'], 1, 'Network byte order is big-endian; htons converts the port so both ends agree.'),
            q('What does recv returning 0 mean?', ['An error', 'The peer closed the connection', 'No data yet', 'The buffer is full'], 1, 'recv returns 0 when the peer has closed its side of the connection.')
          ],
          exercises: [
            ex('c-m26-l1-e1', 'Port byte order', 'write-code', 'Read a port number and print it unchanged. (In real socket code you would wrap it in htons; this exercise checks the value flows through correctly.)',
              '#include <stdio.h>\n\nint main(void) {\n    int port;\n    // read port, print it\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int port;\n    scanf("%d", &port);\n    printf("%d\\n", port);\n    return 0;\n}',
              'Read the port and print it back.',
              'O(1)', [tc('port 8080', '8080\n', '8080'), tc('port 80', '80\n', '80', true)], h5(
                'Read the integer and print it with %d.',
                'scanf("%d", &port); printf("%d\\n", port);',
                'scanf("%d", &port); printf("%d\\n", port);',
                'If nothing prints, check scanf has &port.',
                'Solution: scanf("%d", &port); printf("%d\\n", port); Input 8080 prints 8080.'))
          ]
        },
        {
          id: 'c-m26-l2',
          slug: 'tcp-server',
          title: 'Writing a TCP Server',
          objectives: ['Bind, listen, and accept connections', 'Handle one client at a time', 'Explain the accept loop and its limits'],
          introduction: 'Servers wait for clients to connect. This lesson covers bind, listen, and accept, and builds a simple echo server that replies with whatever the client sends.',
          concept: 'A TCP server creates a socket, binds it to an address and port with bind(), and marks it as listening with listen(), which sets the backlog of pending connections. accept() blocks until a client connects, then returns a new socket dedicated to that client, while the listening socket stays open for more connections. The server reads from the client socket with recv, processes the data, and replies with send, in a loop until the client disconnects. A simple server handles one client at a time in a loop, which is easy to write but blocks other clients; production servers handle each client in a thread or with non-blocking I/O and poll. The SO_REUSEADDR socket option lets the server restart immediately without waiting for old connections to time out, which is essential during development. Setting the listening address to INADDR_ANY, 0.0.0.0, accepts connections on all interfaces.',
          syntax: 'int server = socket(AF_INET, SOCK_STREAM, 0);\nbind(server, (struct sockaddr *)&addr, sizeof(addr));\nlisten(server, 5);\nint client = accept(server, NULL, NULL);',
          analogy: 'A server is like a reception desk: the listening socket is the front door, accept() is the receptionist greeting each visitor, and the client socket is the private room where the conversation happens.',
          exampleCode: `#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

int main(void) {
    int server = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    bind(server, (struct sockaddr *)&addr, sizeof(addr));
    listen(server, 5);
    printf("Listening on port 8080...\\n");
    int client = accept(server, NULL, NULL);
    char buf[256];
    ssize_t n = recv(client, buf, sizeof(buf) - 1, 0);
    if (n > 0) {
        buf[n] = '\\0';
        printf("Received: %s", buf);
        send(client, buf, (size_t)n, 0);
    }
    close(client);
    close(server);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Create a listening socket and set SO_REUSEADDR.', 'Bind to all interfaces on port 8080.', 'Listen with a backlog of 5.', 'Accept one client connection.', 'Read the client message, print it, echo it back, and close both sockets.'],
          commonMistakes: ['Forgetting SO_REUSEADDR and getting "address already in use" on restart', 'Accepting once and exiting instead of looping for more clients', 'Blocking all clients while handling one slow client'],
          debuggingExercise: {
            prompt: 'This server fails to restart quickly with "Address already in use". Fix it.',
            buggyCode: `#include <arpa/inet.h>

int main(void) {
    int server = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    bind(server, (struct sockaddr *)&addr, sizeof(addr));
    listen(server, 5);
    return 0;
}`,
            fixedCode: `#include <arpa/inet.h>

int main(void) {
    int server = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    bind(server, (struct sockaddr *)&addr, sizeof(addr));
    listen(server, 5);
    return 0;
}`,
            explanation: 'After the server exits, its connections linger in TIME_WAIT and the port stays reserved. SO_REUSEADDR lets the new server bind the port immediately.'
          },
          miniChallenge: 'Extend the echo server to loop and accept clients one after another until it receives SIGINT.',
          summary: 'A TCP server binds, listens, and accepts, getting a fresh socket per client. SO_REUSEADDR enables quick restarts. This completes networking. Next: the advanced projects.',
          knowledgeCheck: [
            q('What does accept() return?', ['The listening socket', 'A new socket for the connected client', 'The client address', 'Nothing'], 1, 'accept returns a new socket dedicated to that client; the listening socket stays open.'),
            q('What does SO_REUSEADDR allow?', ['Faster sends', 'Binding a port that is in TIME_WAIT after a previous server exited', 'More clients', 'Encrypted connections'], 1, 'SO_REUSEADDR lets a server rebind a port whose old connections are still timing out.')
          ],
          exercises: [
            ex('c-m26-l2-e1', 'Echo a message', 'write-code', 'Read a line of input and print it back prefixed with "echo: ". (This models a server echoing a client message.)',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[256];\n    // read a line, print "echo: " followed by the line\n    return 0;\n}',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char line[256];\n    if (fgets(line, sizeof line, stdin) == NULL) return 0;\n    line[strcspn(line, "\\n")] = \'\\0\';\n    printf("echo: %s\\n", line);\n    return 0;\n}',
              'fgets reads the line, the newline is stripped, and printf adds the echo prefix.',
              'O(n)', [tc('echo hello', 'hello\n', 'echo: hello'), tc('echo C', 'C\n', 'echo: C', true)], h5(
                'Read the line with fgets and strip the trailing newline.',
                'Print "echo: " plus the line with printf("echo: %s\\n", line).',
                'fgets(line, sizeof line, stdin); line[strcspn(line, "\\n")] = 0; printf("echo: %s\\n", line);',
                'If an extra blank line appears, the newline was not stripped.',
                'Solution: fgets the line, strip the newline with strcspn, and print "echo: %s". Input "hello" gives "echo: hello".'))
          ]
        }
      ]
    },
    {
      id: 'c-m27',
      title: 'Advanced Projects',
      description: 'A linked list library and a mini HTTP server.',
      level: 'advanced',
      order: 27,
      lessons: [
        {
          id: 'c-m27-l1',
          slug: 'linked-list-library',
          title: 'Project: Linked List Library',
          objectives: ['Implement a singly linked list with malloc', 'Insert, delete, and search nodes', 'Free the whole list without leaks'],
          introduction: 'The capstone data-structure project: a complete singly linked list library with insert, delete, search, and destroy, built on the pointers and memory skills from earlier modules.',
          concept: 'A linked list is a chain of nodes, each holding data and a pointer to the next node. Unlike an array, a list grows one node at a time with malloc, and inserting or deleting in the middle only rewires pointers, without shifting elements. The list is tracked by a head pointer, which is NULL for an empty list. Inserting at the head is O(1): allocate a node, set its next to the old head, and make it the new head. Deleting a node requires finding its predecessor and linking around it, which is why the head case needs special handling, or a pointer-to-pointer technique that treats the head like any other link. Searching is O(n) because the list must be walked from the head. Every node must be freed exactly once, and a destroy function walks the list freeing each node, saving the next pointer before freeing the current one. A list with a head pointer and a count, wrapped in a struct, is the cleanest interface.',
          syntax: 'typedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nvoid push(Node **head, int value) {\n    Node *n = malloc(sizeof(Node));\n    n->data = value;\n    n->next = *head;\n    *head = n;\n}',
          analogy: 'A linked list is like a treasure hunt: each clue (node) tells you where the next clue is, and the hunt ends when a clue points nowhere.',
          exampleCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

void push(Node **head, int value) {
    Node *n = malloc(sizeof(Node));
    if (n == NULL) return;
    n->data = value;
    n->next = *head;
    *head = n;
}

void print_list(Node *head) {
    for (Node *cur = head; cur != NULL; cur = cur->next) {
        printf("%d ", cur->data);
    }
    printf("\\n");
}

void destroy(Node *head) {
    while (head != NULL) {
        Node *tmp = head;
        head = head->next;
        free(tmp);
    }
}

int main(void) {
    Node *head = NULL;
    push(&head, 3);
    push(&head, 2);
    push(&head, 1);
    print_list(head);
    destroy(head);
    return 0;
}`,
          exampleLanguage: 'c',
          walkthrough: ['Define a Node with data and a next pointer.', 'push allocates a node and inserts it at the head.', 'Push 3, 2, then 1, so the list reads 1 2 3.', 'print_list walks the list from the head.', 'destroy frees each node, saving next before freeing.'],
          commonMistakes: ['Freeing a node before saving its next pointer', 'Forgetting to update the head when deleting the first node', 'Losing the head pointer and leaking the whole list'],
          debuggingExercise: {
            prompt: 'This destroy function crashes. Fix it.',
            buggyCode: `#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void destroy(Node *head) {
    while (head != NULL) {
        free(head);
        head = head->next;
    }
}`,
            fixedCode: `#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

void destroy(Node *head) {
    while (head != NULL) {
        Node *tmp = head;
        head = head->next;
        free(tmp);
    }
}`,
            explanation: 'The buggy version freed the node and then read head->next from freed memory, which is use-after-free. Saving next before freeing is the correct order.'
          },
          miniChallenge: 'Add a function that reverses the list in place, and a function that returns the length of the list.',
          summary: 'You built a linked list library: O(1) head insertion, O(n) search, and careful freeing. This is the foundation for stacks, queues, and hash tables. Next: the final project, a mini HTTP server.',
          knowledgeCheck: [
            q('What is the time complexity of inserting at the head of a singly linked list?', ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], 0, 'Head insertion only rewires two pointers, so it is constant time.'),
            q('Why must destroy save next before freeing a node?', ['To free faster', 'Because reading next after free is use-after-free', 'To count nodes', 'It does not matter'], 1, 'After free, the memory is invalid, so next must be saved first.')
          ],
          exercises: [
            ex('c-m27-l1-e1', 'Count list nodes', 'write-code', 'Read n, then n integers (the data of a linked list). Print n, the number of nodes. (In a real list you would walk the nodes counting them; here the input gives the node data.)',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n and n values, print the node count\n    return 0;\n}',
              '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    int count = 0;\n    for (int i = 0; i < n; i++) {\n        int value;\n        scanf("%d", &value);\n        count++;\n    }\n    printf("%d\\n", count);\n    return 0;\n}',
              'Each value read represents one node, so counting the values counts the nodes.',
              'O(n)', [tc('three nodes', '3\n10 20 30\n', '3'), tc('zero nodes', '0\n', '0', true)], h5(
                'One input value corresponds to one list node.',
                'Loop n times reading a value and incrementing a counter.',
                'int count = 0; for (int i = 0; i < n; i++) { int v; scanf("%d", &v); count++; }',
                'If the count is n - 1, check the loop runs n times, not n - 1.',
                'Solution: read n values, count them, print the count. Input "3" with three values gives 3.'))
          ]
        },
        {
          id: 'c-m27-l2',
          slug: 'mini-http-server',
          title: 'Project: Mini HTTP Server',
          objectives: ['Parse an HTTP request line', 'Serve a static response over a socket', 'Handle multiple clients in a loop'],
          introduction: 'The final project brings everything together: a mini HTTP server in C that listens on a port, reads a request, and replies with a valid HTTP response. It is a real server you can test with a browser or curl.',
          concept: 'HTTP is a text protocol on top of TCP. A client connects and sends a request like "GET / HTTP/1.1" followed by headers and a blank line, and the server replies with a status line such as "HTTP/1.1 200 OK", headers including Content-Type and Content-Length, a blank line, and the body. The server reads the request with recv, parses the method and path with sscanf, and builds the response with snprintf into a buffer, being careful to compute the body length correctly. A loop around accept serves clients one after another, and a real server would hand each client to a thread or use poll for concurrency. Parsing must be defensive: a request longer than the buffer must be rejected, and the path must be validated so a client cannot request files outside the served directory. This project shows that the web is built from the same sockets, strings, and file I/O you have already learned.',
          syntax: 'char response[1024];\nconst char *body = "<h1>Hello</h1>";\nsnprintf(response, sizeof response,\n    "HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\nContent-Length: %zu\\r\\n\\r\\n%s",\n    strlen(body), body);',
          analogy: 'An HTTP server is like a waiter in a restaurant: the client orders (the request), the waiter writes it down (parses it), and the kitchen sends back the dish (the response).',
          exampleCode: `#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

int main(void) {
    int server = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    bind(server, (struct sockaddr *)&addr, sizeof(addr));
    listen(server, 5);
    printf("Mini HTTP server on port 8080. Try: curl http://localhost:8080/\\n");
    while (1) {
        int client = accept(server, NULL, NULL);
        char request[1024];
        ssize_t n = recv(client, request, sizeof(request) - 1, 0);
        if (n > 0) {
            request[n] = '\\0';
            char method[16], path[256];
            if (sscanf(request, "%15s %255s", method, path) == 2) {
                printf("Request: %s %s\\n", method, path);
            }
            const char *body = "<h1>Hello from C!</h1>";
            char response[1024];
            snprintf(response, sizeof response,
                "HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\nContent-Length: %zu\\r\\n\\r\\n%s",
                strlen(body), body);
            send(client, response, strlen(response), 0);
        }
        close(client);
    }
}`,
          exampleLanguage: 'c',
          walkthrough: ['Create, bind, and listen on port 8080 as in the TCP server lesson.', 'Loop accepting clients one at a time.', 'Read the request into a buffer and null-terminate it.', 'Parse the method and path with sscanf.', 'Build a valid HTTP response with snprintf and send it, then close the client socket.'],
          commonMistakes: ['Forgetting the blank line between HTTP headers and the body', 'Sending a wrong Content-Length, so the client hangs or truncates the body', 'Using \\n instead of \\r\\n in HTTP headers'],
          debuggingExercise: {
            prompt: 'A browser hangs when loading the page from this server. What is wrong?',
            buggyCode: `const char *body = "Hello";
char response[256];
snprintf(response, sizeof response,
    "HTTP/1.1 200 OK\\r\\nContent-Length: 100\\r\\n\\r\\n%s", body);`,
            fixedCode: `const char *body = "Hello";
char response[256];
snprintf(response, sizeof response,
    "HTTP/1.1 200 OK\\r\\nContent-Length: %zu\\r\\n\\r\\n%s", strlen(body), body);`,
            explanation: 'The header claimed 100 bytes but the body is only 5, so the client waited for 95 more bytes that never came. Content-Length must equal the actual body length.'
          },
          miniChallenge: 'Extend the server to return a 404 response when the requested path is not "/", and to serve the contents of a file for other paths.',
          summary: 'You built a working HTTP server from sockets, string parsing, and snprintf. That is the whole C course: from Hello World to a web server, with memory, files, threads, and networking along the way. Take the mastery assessment to prove it.',
          knowledgeCheck: [
            q('What separates HTTP headers from the body?', ['A space', 'A blank line (CRLF CRLF)', 'A comma', 'Nothing'], 1, 'The headers end with an empty line, after which the body begins.'),
            q('Why must Content-Length match the body exactly?', ['For style', 'The client reads exactly that many bytes, so a mismatch hangs or truncates the response', 'It is optional', 'To save bandwidth'], 1, 'HTTP clients use Content-Length to know where the body ends.')
          ],
          exercises: [
            ex('c-m27-l2-e1', 'Build an HTTP response', 'write-code', 'Read a short body string (one word) and print the HTTP status line and Content-Length header for it: first line "HTTP/1.1 200 OK", second line "Content-Length: N" where N is the length of the word.',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char body[100];\n    // read a word, print the status line and Content-Length\n    return 0;\n}',
              '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char body[100];\n    scanf("%99s", body);\n    printf("HTTP/1.1 200 OK\\n");\n    printf("Content-Length: %zu\\n", strlen(body));\n    return 0;\n}',
              'strlen gives the body length for the Content-Length header.',
              'O(n)', [tc('body Hello', 'Hello\n', 'HTTP/1.1 200 OK\nContent-Length: 5'), tc('body Hi', 'Hi\n', 'HTTP/1.1 200 OK\nContent-Length: 2', true)], h5(
                'Content-Length is the length of the body string.',
                'Read the word, print the status line, then print Content-Length with strlen.',
                'printf("HTTP/1.1 200 OK\\n"); printf("Content-Length: %zu\\n", strlen(body));',
                'If the length is one too many, check you are not counting a newline; %s input has none.',
                'Solution: print the status line and "Content-Length: %zu" with strlen(body). "Hello" gives 5.'))
          ]
        }
      ]
    }
  ]
};

export const C_ASSESSMENT: MasteryAssessment = {
  courseSlug: 'c',
  passPercent: 80,
  questions: [
    aq('c-a1', 'conceptual', 'Basics', 'What does a C compiler produce from source code?', ['An interpreted script', 'Machine code in an executable', 'A web page', 'A database'], 1, 'A C compiler translates source code into machine code, which the linker combines into an executable.'),
    aq('c-a2', 'conceptual', 'Basics', 'What is the entry point of a C program?', ['printf', 'main', 'include', 'return'], 1, 'Execution always begins in the main function.'),
    aq('c-a3', 'conceptual', 'Data types', 'Which type should you use for a value like 3.14159?', ['int', 'char', 'double', 'void'], 2, 'double stores fractional numbers with about 15 digits of precision.'),
    aq('c-a4', 'conceptual', 'Data types', 'What does sizeof(int) return?', ['The value of an int', 'The number of bytes an int occupies', 'The largest int', 'The number of ints in memory'], 1, 'sizeof returns the size in bytes of a type or expression.'),
    aq('c-a5', 'conceptual', 'Operators', 'What is the value of 7 % 3?', ['2', '1', '3', '0'], 1, '7 divided by 3 leaves a remainder of 1.'),
    aq('c-a6', 'conceptual', 'Operators', 'What is the difference between = and ==?', ['None', '= assigns, == compares', '== assigns, = compares', 'Both are comparisons'], 1, 'A single = assigns a value; == compares two values for equality.'),
    aq('c-a7', 'conceptual', 'Control flow', 'In an if / else if chain, how many branches execute?', ['All of them', 'At most one', 'Exactly two', 'None'], 1, 'Execution stops at the first true condition.'),
    aq('c-a8', 'conceptual', 'Control flow', 'What happens if a switch case has no break?', ['Compile error', 'Execution falls through to the next case', 'The switch restarts', 'The program crashes'], 1, 'Without break, control continues into the following case.'),
    aq('c-a9', 'conceptual', 'Loops', 'How many times does for (int i = 0; i < 5; i++) run?', ['4', '5', '6', '0'], 1, 'i takes values 0 through 4, which is five iterations.'),
    aq('c-a10', 'conceptual', 'Loops', 'What does continue do in a loop?', ['Exits the loop', 'Skips to the next iteration', 'Restarts the program', 'Pauses the loop'], 1, 'continue skips the rest of the current iteration and moves to the next.'),
    aq('c-a11', 'conceptual', 'Functions', 'What does pass by value mean?', ['The function gets a copy of each argument', 'The function gets the original variable', 'Arguments are passed as strings', 'The function cannot take arguments'], 0, 'Arguments are copied into parameters, so changes inside the function do not affect the caller.'),
    aq('c-a12', 'conceptual', 'Functions', 'What is the base case of a recursive function?', ['The first call', 'The condition that stops further recursion', 'The return type', 'The largest input'], 1, 'The base case is handled directly without another recursive call.'),
    aq('c-a13', 'conceptual', 'Arrays', 'What is the last valid index of int a[10]?', ['10', '9', '11', '0'], 1, 'Indices run from 0 to n - 1.'),
    aq('c-a14', 'conceptual', 'Strings', 'How many bytes does the string literal "hello" occupy?', ['5', '6', '4', '7'], 1, 'Five letters plus the null terminator make six bytes.'),
    aq('c-a15', 'conceptual', 'Strings', 'What does strcmp return for equal strings?', ['1', '-1', '0', 'The length'], 2, 'strcmp returns 0 when the strings are equal.'),
    aq('c-a16', 'conceptual', 'Pointers', 'What does *p do when p is a pointer?', ['Gets the address of p', 'Dereferences p, accessing the value it points to', 'Declares a new pointer', 'Frees p'], 1, 'The * operator dereferences a pointer to read or write the pointed-to value.'),
    aq('c-a17', 'conceptual', 'Memory', 'What does malloc return on failure?', ['0', 'NULL', 'A valid pointer', 'An error code'], 1, 'malloc returns NULL when it cannot allocate, which is why the result must be checked.'),
    aq('c-a18', 'conceptual', 'Memory', 'What is the difference between malloc and calloc?', ['calloc zeroes the memory', 'malloc is faster to type', 'calloc cannot fail', 'malloc zeroes the memory'], 0, 'calloc allocates and zero-initializes; malloc leaves memory uninitialized.'),
    aq('c-a19', 'conceptual', 'Files', 'What does fopen return when the file cannot be opened?', ['NULL', '0', 'An empty FILE', 'An error code'], 0, 'fopen returns NULL on failure.'),
    aq('c-a20', 'conceptual', 'Error handling', 'What does perror do?', ['Prints the last error as a string', 'Prints your message plus a description of the current errno value', 'Clears errno', 'Exits the program'], 1, 'perror prints a message followed by the human-readable meaning of errno.'),
    aq('c-a21', 'code-reading', 'Pointers', 'What does this program print?', ['42', '100', '0', 'The address of x'], 1, 'p points to x, and *p = 100 changes x to 100, which is then printed.', 'int x = 42;\nint *p = &x;\n*p = 100;\nprintf("%d\\n", x);'),
    aq('c-a22', 'code-reading', 'Operators', 'What is the value of y after this code?', ['5', '6', '7', '4'], 1, 'Prefix ++x increments x to 6 first, then assigns 6 to y.', 'int x = 5;\nint y = ++x;'),
    aq('c-a23', 'code-reading', 'Loops', 'What does this loop print?', ['1 2 3', '0 1 2', '1 2 3 4', 'Nothing'], 0, 'i runs from 1 to 3 inclusive, printing 1, 2, 3.', 'for (int i = 1; i <= 3; i++) {\n    printf("%d ", i);\n}'),
    aq('c-a24', 'code-reading', 'Arrays', 'What is the value of a[2] after this code?', ['10', '20', '30', '0'], 2, 'The array is {10, 20, 30} and index 2 is the third element, 30.', 'int a[3] = {10, 20, 30};\nprintf("%d\\n", a[2]);'),
    aq('c-a25', 'code-reading', 'Strings', 'What does strlen return for this string?', ['3', '4', '5', '0'], 0, 'strlen counts characters before the terminator: A, d, a is 3.', 'char s[] = "Ada";\nprintf("%zu\\n", strlen(s));'),
    aq('c-a26', 'code-reading', 'Functions', 'What does this program print?', ['7', '3', '4', '0'], 0, 'add(3, 4) returns 7.', 'int add(int a, int b) { return a + b; }\nint main(void) {\n    printf("%d\\n", add(3, 4));\n    return 0;\n}'),
    aq('c-a27', 'code-reading', 'Structs', 'What does this program print?', ['3', '4', '7', '0'], 2, 'p.x is 3 and p.y is 4, so the sum printed is 7.', 'struct Point { int x; int y; };\nstruct Point p = {3, 4};\nprintf("%d\\n", p.x + p.y);'),
    aq('c-a28', 'code-reading', 'Bitwise', 'What is the value of flags after this code?', ['0', '2', '4', '8'], 2, '1u << 2 sets bit 2, which has value 4.', 'unsigned int flags = 0;\nflags |= (1u << 2);'),
    aq('c-a29', 'code-reading', 'Conditionals', 'What does this program print for score = 85?', ['Grade A', 'Grade B', 'Grade C', 'Grade D or F'], 1, '85 is not >= 90 but is >= 80, so the second branch prints Grade B.', 'int score = 85;\nif (score >= 90) printf("Grade A\\n");\nelse if (score >= 80) printf("Grade B\\n");\nelse printf("Grade C\\n");'),
    aq('c-a30', 'code-reading', 'Recursion', 'What does factorial(4) return?', ['4', '12', '24', '6'], 2, '4! = 4 * 3 * 2 * 1 = 24.', 'int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}'),
    aq('c-a31', 'debugging', 'Pointers', 'This program crashes. What is the bug?', ['The printf is wrong', 'p is uninitialized and dereferencing it is undefined behaviour', 'The return type is wrong', 'stdio.h is missing'], 1, 'p holds a garbage address; writing through it crashes. It must point at a real variable first.', 'int *p;\n*p = 42;\nprintf("%d\\n", *p);'),
    aq('c-a32', 'debugging', 'Arrays', 'What is wrong with this loop?', ['It prints too few elements', 'It reads a[5], one past the end', 'It never runs', 'It prints the array backwards'], 1, 'The array has indices 0-4; i <= 5 reads a[5], which is out of bounds.', 'int a[5] = {1, 2, 3, 4, 5};\nfor (int i = 0; i <= 5; i++) printf("%d\\n", a[i]);'),
    aq('c-a33', 'debugging', 'Strings', 'Why does this comparison never report equal?', ['strcmp is misspelled', '== compares addresses, not string contents', 'The arrays are too small', 'The strings are different'], 1, 'Array names decay to pointers, so == compares addresses. Use strcmp(a, b) == 0.', 'char a[10] = "Ada";\nchar b[10] = "Ada";\nif (a == b) printf("equal\\n");'),
    aq('c-a34', 'debugging', 'Memory', 'What is wrong with this function?', ['It returns the wrong type', 'It returns the address of a local variable', 'It leaks memory', 'It never returns'], 1, 'x lives on the stack frame, which disappears when the function returns, leaving a dangling pointer.', 'int *make(void) {\n    int x = 42;\n    return &x;\n}'),
    aq('c-a35', 'debugging', 'Input', 'Why does this program crash on input?', ['scanf needs &n, the address of n', 'printf is wrong', 'The variable is uninitialized', 'The format is wrong'], 0, 'scanf must receive the address to store into; passing n itself makes it write to an invalid address.', 'int n;\nscanf("%d", n);'),
    aq('c-a36', 'debugging', 'Switch', 'Why does this print all three days?', ['The cases are in the wrong order', 'Missing break statements cause fall-through', 'The variable is wrong', 'switch cannot use ints'], 1, 'Without break, execution falls through from case 1 into cases 2 and 3.', 'switch (day) {\n    case 1: printf("Monday\\n");\n    case 2: printf("Tuesday\\n");\n    case 3: printf("Wednesday\\n");\n}'),
    aq('c-a37', 'debugging', 'Loops', 'Why does this loop print nothing?', ['The condition is wrong', 'The semicolon after the for header makes the loop body empty', 'i is out of scope', 'printf is wrong'], 1, 'The semicolon ends the for statement, so the loop body is empty and the printf block runs once with i out of scope.', 'for (int i = 1; i <= 5; i++);\n{\n    printf("%d\\n", i);\n}'),
    aq('c-a38', 'debugging', 'Conditionals', 'Why does this always print "Pass"?', ['The condition is always true', 'score = 50 assigns 50 instead of comparing', 'The else is missing', 'The format is wrong'], 1, 'Assignment inside the condition sets score to 50, which is non-zero and therefore true. Use == or >=.', 'int score = 30;\nif (score = 50) printf("Pass\\n");\nelse printf("Fail\\n");'),
    aq('c-a39', 'debugging', 'Memory', 'What is the bug here?', ['malloc is too slow', 'The allocated memory is never freed, leaking it', 'The pointer is NULL', 'The array is too small'], 1, 'Every malloc needs a matching free; this program exits without freeing a.', 'int *a = malloc(100 * sizeof(int));\na[0] = 42;\nprintf("%d\\n", a[0]);\nreturn 0;'),
    aq('c-a40', 'debugging', 'Files', 'Why does the file end up empty?', ['fprintf is wrong', 'The file was never closed, so buffered output was lost', 'The file is read-only', 'The string is empty'], 1, 'Output is buffered; fclose flushes the buffer to disk. Without it the data can be lost.', 'FILE *f = fopen("out.txt", "w");\nfprintf(f, "hello\\n");\nreturn 0;')
  ],
  programmingExercises: [
    ex('c-assess-e1', 'Sum of even numbers', 'write-code', 'Read n, then n integers, and print the sum of the even ones.',
      '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n numbers, print the sum of the even ones\n    return 0;\n}',
      '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        int v;\n        scanf("%d", &v);\n        if (v % 2 == 0) sum += v;\n    }\n    printf("%d\\n", sum);\n    return 0;\n}',
      'Loop over the numbers, adding only those where v % 2 == 0.',
      'O(n)', [tc('evens in 1..5', '5\n1 2 3 4 5\n', '6'), tc('no evens', '3\n1 3 5\n', '0', true)], h5(
        'An even number has remainder 0 when divided by 2.',
        'Read each value, test v % 2 == 0, and add it to the sum when true.',
        'int sum = 0; for (...) { int v; scanf("%d", &v); if (v % 2 == 0) sum += v; }',
        'If odd numbers are included, check the condition uses == 0 and not != 0.',
        'Solution: add v to sum only when v % 2 == 0. For 1 2 3 4 5 the even sum is 6.')),
    ex('c-assess-e2', 'Reverse a string', 'write-code', 'Read a single word and print it reversed.',
      '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char word[100];\n    // read a word, print it reversed\n    return 0;\n}',
      '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char word[100];\n    scanf("%99s", word);\n    size_t len = strlen(word);\n    for (size_t i = len; i > 0; i--) {\n        printf("%c", word[i - 1]);\n    }\n    printf("\\n");\n    return 0;\n}',
      'Walk the string from the last character to the first, printing each one.',
      'O(n)', [tc('reverse hello', 'hello\n', 'olleh'), tc('reverse C', 'C\n', 'C', true)], h5(
        'The last character of the string is at index strlen(word) - 1.',
        'Loop from the end of the string to the start, printing one character at a time.',
        'for (size_t i = len; i > 0; i--) printf("%c", word[i - 1]);',
        'If the output has an extra character at the front, you started at index len instead of len - 1.',
        'Solution: loop i from len down to 1 and print word[i - 1]. "hello" becomes "olleh".')),
    ex('c-assess-e3', 'Prime check', 'write-code', 'Read an integer n (n >= 2) and print "prime" if it is prime, otherwise print "not prime".',
      '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n, print prime or not prime\n    return 0;\n}',
      '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    int is_prime = 1;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) { is_prime = 0; break; }\n    }\n    printf("%s\\n", is_prime ? "prime" : "not prime");\n    return 0;\n}',
      'Test divisors from 2 up to the square root of n; any divisor means the number is not prime.',
      'O(sqrt(n))', [tc('7 is prime', '7\n', 'prime'), tc('9 is not prime', '9\n', 'not prime', true)], h5(
        'A prime has no divisors other than 1 and itself.',
        'Try dividing n by every i from 2 up to sqrt(n); if any divides evenly, n is not prime.',
        'for (int i = 2; i * i <= n; i++) if (n % i == 0) { is_prime = 0; break; }',
        'If 9 prints "prime", check the loop condition reaches i = 3 (i * i <= n).',
        'Solution: test i from 2 while i * i <= n; if n % i == 0 the number is not prime. 7 is prime, 9 is not.')),
    ex('c-assess-e4', 'Second largest', 'write-code', 'Read n (n >= 2), then n integers, and print the second largest distinct value. Assume there are at least two distinct values.',
      '#include <stdio.h>\n\nint main(void) {\n    int n;\n    // read n numbers, print the second largest distinct value\n    return 0;\n}',
      '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    int largest = -2147483647 - 1;\n    int second = -2147483647 - 1;\n    for (int i = 0; i < n; i++) {\n        int v;\n        scanf("%d", &v);\n        if (v > largest) { second = largest; largest = v; }\n        else if (v > second && v < largest) { second = v; }\n    }\n    printf("%d\\n", second);\n    return 0;\n}',
      'Track the largest and second largest values in one pass, updating both when a new largest appears.',
      'O(n)', [tc('second largest of 5', '5\n3 9 1 9 4\n', '4'), tc('second largest of 2', '2\n10 20\n', '10', true)], h5(
        'Keep two variables: the largest value seen and the second largest.',
        'When a value beats the largest, the old largest becomes the second largest.',
        'if (v > largest) { second = largest; largest = v; } else if (v > second && v < largest) second = v;',
        'If duplicates of the largest become the second largest, add the v < largest condition.',
        'Solution: one pass tracking largest and second. For 3 9 1 9 4 the second largest distinct value is 4.')),
    ex('c-assess-e5', 'Count vowels', 'write-code', 'Read a single word and print how many vowels (a, e, i, o, u, case-insensitive) it contains.',
      '#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint main(void) {\n    char word[100];\n    // read a word, print the vowel count\n    return 0;\n}',
      '#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint main(void) {\n    char word[100];\n    scanf("%99s", word);\n    int count = 0;\n    for (size_t i = 0; word[i] != \'\\0\'; i++) {\n        char c = (char)tolower((unsigned char)word[i]);\n        if (c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\') count++;\n    }\n    printf("%d\\n", count);\n    return 0;\n}',
      'Lowercase each character and count it when it is one of a, e, i, o, u.',
      'O(n)', [tc('vowels in hello', 'hello\n', '2'), tc('vowels in AEIOU', 'AEIOU\n', '5', true)], h5(
        'The vowels are a, e, i, o, u; tolower makes the check case-insensitive.',
        'Loop over the characters, lowercase each one, and count it if it is a vowel.',
        'char c = tolower(word[i]); if (c == \'a\' || c == \'e\' || ...) count++;',
        'If uppercase vowels are missed, check tolower is applied before the comparison.',
        'Solution: lowercase each character and count a/e/i/o/u. "hello" has 2 vowels and "AEIOU" has 5.'))
  ],
  capstone: {
    title: 'Build a Contact Manager',
    description: 'Build a complete command-line contact manager in C that stores contacts in a file, lets the user add, search, list, and delete contacts, and never leaks memory.',
    requirements: [
      'Define a Contact struct with name, phone, and email fields, stored in a dynamically allocated array that grows with realloc',
      'Implement a menu loop with add, list, search by name, delete, and quit commands',
      'Persist contacts to a text file on every change and load them at startup',
      'Validate input: reject empty names and phone numbers with non-digit characters',
      'Handle all errors: check malloc, fopen, and scanf return values and report with perror where appropriate',
      'Run clean under AddressSanitizer and UBSan with no leaks, and compile with -Wall -Wextra -Werror'
    ],
    rubric: [
      'Correctness: all menu operations work and contacts survive a restart via the file',
      'Memory safety: no leaks, no use-after-free, no out-of-bounds access under sanitizers',
      'Code structure: separate modules with headers, clear function boundaries, no function over 50 lines',
      'Error handling: every fallible call is checked and failures produce a clear message',
      'Quality: compiles warning-free with -Wall -Wextra -Werror and the code is readable with consistent style'
    ]
  }
};
