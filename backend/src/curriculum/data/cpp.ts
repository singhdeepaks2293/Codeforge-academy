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

export const CPP_COURSE: Course = {
  id: 'cpp',
  slug: 'cpp',
  language: 'cpp',
  title: 'C++ Programming: From First Program to Modern C++',
  description: 'Learn C++ from the ground up: basics, object-oriented programming, the STL, modern C++ features, templates, concurrency, and systems programming, with hands-on projects at every stage.',
  difficulty: 'All levels',
  estimatedHours: 65,
  skills: ['C++ programming', 'Object-oriented design', 'STL containers and algorithms', 'Smart pointers and RAII', 'Templates and generics', 'Move semantics', 'Concurrency', 'Systems programming', 'Performance optimization', 'Networking'],
  prerequisites: ['Basic C knowledge'],
  modules: [
    {
      id: 'cpp-m1',
      title: 'C++ Introduction',
      description: 'What C++ is, how it extends C, and how to write, compile, and run your first C++ program.',
      level: 'beginner',
      order: 1,
      lessons: [
        {
          id: 'cpp-m1-l1',
          slug: 'hello-cpp',
          title: 'Hello, C++: Your First Program',
          objectives: ['Explain what C++ is and how it differs from C', 'Write a minimal C++ program using iostream', 'Compile and run a C++ program with g++'],
          introduction: 'C++ began as "C with Classes" and grew into a language of its own, adding classes, templates, and a rich standard library while keeping C\'s speed. In this lesson you will write your first C++ program and understand every line.',
          concept: 'C++ was created by Bjarne Stroustrup in the early 1980s as an extension of C, adding object-oriented programming and stronger type checking while keeping direct access to hardware. A C++ program is still compiled to machine code, and execution begins in main, but input and output use streams instead of printf and scanf: std::cout sends data to the screen and std::endl ends the line. The line #include <iostream> brings in the stream library, and std:: is a namespace that prevents name clashes with other libraries. The insertion operator << sends values into a stream and can be chained, so std::cout << "Hello" << std::endl prints text and a newline. C++ is a superset of much of C, so the C you already know transfers directly, and the new features build on that foundation rather than replacing it.',
          syntax: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}',
          analogy: 'C++ is to C what a modern workshop is to a toolbox: the same reliable tools are all there, plus new machines for bigger jobs.',
          exampleCode: `#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    std::cout << "Welcome to CodeForge Academy." << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['The #include line brings in iostream for input and output.', 'Execution starts at main.', 'std::cout << sends text to the screen.', 'std::endl ends the line and flushes the stream.', 'return 0 reports success to the operating system.'],
          commonMistakes: ['Forgetting std:: before cout, which causes a compile error', 'Writing Cout with a capital C; C++ is case-sensitive', 'Omitting #include <iostream>'],
          debuggingExercise: {
            prompt: 'This program fails to compile with "cout was not declared". Fix it.',
            buggyCode: `#include <iostream>

int main() {
    cout << "Hello!" << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

int main() {
    std::cout << "Hello!" << std::endl;
    return 0;
}`,
            explanation: 'cout lives in the std namespace, so it must be written as std::cout unless a using declaration is present.'
          },
          miniChallenge: 'Modify the program to print your name and your favourite number on two separate lines.',
          summary: 'You wrote your first C++ program using std::cout and std::endl. C++ builds on C with namespaces, streams, and classes. Next you will learn how to compile with g++ and use namespaces.',
          knowledgeCheck: [
            q('What does std::cout do?', ['Reads input', 'Writes output to the screen', 'Compiles the program', 'Declares a variable'], 1, 'std::cout is the standard output stream; the << operator sends values to it.'),
            q('Why do we write std:: before cout?', ['For speed', 'cout lives in the std namespace', 'It is a comment', 'To print in colour'], 1, 'The standard library lives in namespace std, so its names are qualified with std::.')
          ],
          exercises: [
            ex('cpp-m1-l1-e1', 'Print a greeting', 'write-code', 'Write a program that prints exactly "Welcome to C++" followed by a newline.',
              '#include <iostream>\n\nint main() {\n    // print "Welcome to C++" here\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    std::cout << "Welcome to C++" << std::endl;\n    return 0;\n}',
              'std::cout with << prints the string, and std::endl adds the newline.',
              'O(1)', [tc('prints greeting', '', 'Welcome to C++')], h5(
                'std::cout sends text to the screen with the << operator.',
                'Include <iostream> and write std::cout << "Welcome to C++" << std::endl; in main.',
                'int main() { std::cout << "Welcome to C++" << std::endl; return 0; }',
                'If the compiler says cout was not declared, add std:: before it or check the include.',
                'Solution: std::cout << "Welcome to C++" << std::endl; The << operator chains values into the stream.'))
          ]
        },
        {
          id: 'cpp-m1-l2',
          slug: 'compiling-namespaces',
          title: 'Compiling with g++ and Using Namespaces',
          objectives: ['Compile C++ code with g++', 'Explain what namespaces are and why they exist', 'Use using declarations safely'],
          introduction: 'C++ files are compiled with g++, and large programs organize names into namespaces to avoid collisions. This lesson covers the build command and the namespace rules that keep big codebases manageable.',
          concept: 'The g++ compiler driver works like gcc but links the C++ standard library automatically: g++ main.cpp -o app compiles and links in one step, and -std=c++17 or -std=c++20 selects the language standard. A namespace is a named scope that groups related declarations; the standard library uses std, so std::cout and std::string are distinct from any cout or string you might define. The using directive, using namespace std;, pulls every name from std into the current scope, which is convenient in small examples but dangerous in headers and large files because it can cause ambiguous names. The safer habit is to qualify names with std:: or to import only what you need with using std::cout;. Namespaces can be nested, aliased with namespace fs = std::filesystem;, and extended across files. Anonymous namespaces give a file-local scope that replaces the old static keyword for internal linkage.',
          syntax: 'g++ -std=c++17 -Wall -Wextra main.cpp -o app\nnamespace math {\n    int add(int a, int b) { return a + b; }\n}\nint sum = math::add(2, 3);',
          analogy: 'A namespace is like a surname: two people can both be called "Alex", but "Alex Chen" and "Alex Patel" are unambiguous.',
          exampleCode: `#include <iostream>

namespace math {
    int add(int a, int b) { return a + b; }
    int multiply(int a, int b) { return a * b; }
}

int main() {
    std::cout << math::add(2, 3) << std::endl;
    std::cout << math::multiply(2, 3) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a namespace math with add and multiply.', 'Call math::add(2, 3) to get 5.', 'Call math::multiply(2, 3) to get 6.', 'Print both results.', 'Compile with g++ -std=c++17 to verify.'],
          commonMistakes: ['Putting using namespace std; in a header, which pollutes every file that includes it', 'Compiling C++ with gcc instead of g++, which fails to link the standard library', 'Forgetting the -std flag and getting an old default standard'],
          debuggingExercise: {
            prompt: 'This program compiles but the linker reports undefined references to std::cout. What is wrong?',
            buggyCode: `$ gcc main.cpp -o app
/usr/bin/ld: undefined reference to std::cout`,
            fixedCode: `$ g++ main.cpp -o app
$ ./app`,
            explanation: 'gcc does not link the C++ standard library by default. g++ is the C++ driver and links libstdc++ automatically.'
          },
          miniChallenge: 'Create a namespace called geometry with a function area that computes the area of a rectangle, and call it from main.',
          summary: 'g++ compiles and links C++ code, and namespaces group names to prevent collisions. Qualify standard names with std:: and avoid using namespace std; in headers. Next module: variables and types.',
          knowledgeCheck: [
            q('Which compiler driver should you use for C++?', ['gcc', 'g++', 'python', 'make'], 1, 'g++ links the C++ standard library; gcc does not by default.'),
            q('Why is using namespace std; discouraged in headers?', ['It is slow', 'It pulls all std names into every file that includes the header, causing collisions', 'It is a syntax error', 'It only works in main'], 1, 'A using directive in a header leaks into all includers, which can create ambiguous names.')
          ],
          exercises: [
            ex('cpp-m1-l2-e1', 'Namespace addition', 'write-code', 'Read two integers and print their sum. Put the addition in a namespace calc with a function add, and call calc::add from main.',
              '#include <iostream>\n\nnamespace calc {\n    int add(int a, int b) { return a + b; }\n}\n\nint main() {\n    int a, b;\n    // read a and b, print calc::add(a, b)\n    return 0;\n}',
              '#include <iostream>\n\nnamespace calc {\n    int add(int a, int b) { return a + b; }\n}\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    std::cout << calc::add(a, b) << std::endl;\n    return 0;\n}',
              'std::cin reads the values and calc::add computes the sum.',
              'O(1)', [tc('add 3 and 4', '3 4\n', '7'), tc('add negatives', '-2 5\n', '3', true)], h5(
                'A namespace function is called with namespace::function.',
                'Read a and b with std::cin, then print calc::add(a, b).',
                'std::cin >> a >> b; std::cout << calc::add(a, b) << std::endl;',
                'If the compiler cannot find add, check the call uses calc::add with the scope operator.',
                'Solution: std::cout << calc::add(a, b). Input "3 4" gives 7.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m2',
      title: 'Variables and Data Types',
      description: 'Declaring variables, type deduction with auto, constants, and references.',
      level: 'beginner',
      order: 2,
      lessons: [
        {
          id: 'cpp-m2-l1',
          slug: 'variables-auto-const',
          title: 'Variables, auto, and const',
          objectives: ['Declare and initialize variables in C++ style', 'Use auto for type deduction', 'Use const and constexpr for constants'],
          introduction: 'C++ offers several ways to declare variables, including uniform initialization and type deduction with auto. This lesson covers modern declaration style and the const correctness that makes code safer.',
          concept: 'C++ variables can be initialized in several ways: int x = 5; is copy initialization, int x(5); is direct initialization, and int x{5}; is uniform or brace initialization, which is preferred in modern C++ because it forbids narrowing conversions, so int x{3.14}; is an error rather than a silent truncation. The auto keyword deduces the type from the initializer, as in auto x = 5;, which is an int, and auto is essential for long iterator and template types. const marks a value that cannot change after initialization, and the compiler enforces it, catching accidental modification. constexpr goes further: the value is computed at compile time, so constexpr int size = 10; can be used where a compile-time constant is required, such as an array size. References, covered in detail later, are aliases: int& ref = x; makes ref another name for x. Prefer const for values that should not change and auto where the type is obvious or verbose.',
          syntax: 'int x{5};\nauto y = 3.14;      // double\nconst int limit = 100;\nconstexpr int size = 10;\nint arr[size];',
          analogy: 'auto is like a smart label maker: it reads what you put in the box and prints the right label automatically, instead of you writing it by hand.',
          exampleCode: `#include <iostream>

int main() {
    int score{85};
    auto pi = 3.14159;
    const int max_score{100};
    constexpr int bonus{5};
    std::cout << "Score: " << score << " / " << max_score << std::endl;
    std::cout << "Pi: " << pi << ", Bonus: " << bonus << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Declare score with brace initialization.', 'Deduce pi as a double with auto.', 'Declare max_score as const.', 'Declare bonus as constexpr.', 'Print all the values.'],
          commonMistakes: ['Using auto without an initializer, which the compiler rejects', 'Writing const after the fact and trying to modify the variable', 'Using copy initialization with a narrowing conversion that brace initialization would have caught'],
          debuggingExercise: {
            prompt: 'This program should store 3.14 in a double but stores 3. Fix it.',
            buggyCode: `#include <iostream>

int main() {
    int pi{3.14};
    std::cout << pi << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

int main() {
    double pi{3.14};
    std::cout << pi << std::endl;
    return 0;
}`,
            explanation: 'Brace initialization forbids narrowing, so int pi{3.14} is actually a compile error in standard C++; the correct fix is to use the right type, double, for a fractional value.'
          },
          miniChallenge: 'Declare a constexpr double for the tax rate 0.2 and use it to compute the price of an item including tax.',
          summary: 'Brace initialization prevents narrowing, auto deduces types, const prevents modification, and constexpr computes at compile time. Next: strings and input with std::cin.',
          knowledgeCheck: [
            q('What does auto x = 5; deduce x to be?', ['double', 'int', 'char', 'It has no type'], 1, 'auto deduces the type from the initializer, and 5 is an int.'),
            q('What is the advantage of brace initialization int x{3.14};?', ['It is faster', 'It is a compile error instead of a silent narrowing conversion', 'It allows floats', 'It makes x const'], 1, 'Brace initialization forbids narrowing, so mistakes are caught at compile time.')
          ],
          exercises: [
            ex('cpp-m2-l1-e1', 'Double it with auto', 'write-code', 'Read an integer and print twice its value. Declare the result with auto.',
              '#include <iostream>\n\nint main() {\n    int n;\n    // read n, print 2 * n using auto\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    auto doubled = 2 * n;\n    std::cout << doubled << std::endl;\n    return 0;\n}',
              'auto deduces doubled as int from the expression 2 * n.',
              'O(1)', [tc('double 21', '21\n', '42'), tc('double negative', '-5\n', '-10', true)], h5(
                'Use auto for the doubled value; the type is deduced from 2 * n.',
                'Read n with std::cin, then auto doubled = 2 * n; and print it.',
                'auto doubled = 2 * n; std::cout << doubled << std::endl;',
                'If the output is 0, check std::cin actually read into n.',
                'Solution: auto doubled = 2 * n; Input 21 gives 42.'))
          ]
        },
        {
          id: 'cpp-m2-l2',
          slug: 'strings-and-cin',
          title: 'std::string and Input with std::cin',
          objectives: ['Use std::string for text', 'Read input with std::cin', 'Read whole lines with std::getline'],
          introduction: 'C++ replaces C character arrays with std::string, a class that manages its own memory and grows as needed. This lesson covers strings, reading input, and whole-line input with std::getline.',
          concept: 'std::string is a class in the <string> header that owns a dynamic character buffer, so it grows automatically and frees its memory when it goes out of scope. You can concatenate with +, compare with ==, get the length with .size(), and access characters with [i] or .at(i), which checks bounds. Strings can be copied and assigned safely, unlike C arrays. std::cin reads formatted input with >>, which skips whitespace and stops at the next whitespace, so reading a name with std::cin >> name only gets the first word. std::getline(std::cin, line) reads a whole line including spaces, up to the newline. A common pitfall is mixing >> and getline: the >> leaves a newline behind, and getline immediately reads that empty line, so you discard it first with std::cin.ignore(). C++ streams also report failure: if the user types text where a number is expected, the stream enters a failed state and further reads do nothing until you clear it.',
          syntax: '#include <string>\nstd::string name = "Ada";\nname += " Lovelace";\nstd::cout << name.size() << std::endl;\nstd::string line;\nstd::getline(std::cin, line);',
          analogy: 'std::string is like a self-expanding notebook: it adds pages automatically when you write more, and you never have to count the pages yourself.',
          exampleCode: `#include <iostream>
#include <string>

int main() {
    std::string first = "Ada";
    std::string last = "Lovelace";
    std::string full = first + " " + last;
    std::cout << full << std::endl;
    std::cout << "Length: " << full.size() << std::endl;
    std::cout << "First letter: " << full[0] << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create two strings for a first and last name.', 'Concatenate them with + and a space.', 'Print the full name.', 'Print its length with .size().', 'Access the first character with [0].'],
          commonMistakes: ['Using >> to read a full name and getting only the first word', 'Mixing >> and getline without ignoring the leftover newline', 'Comparing strings with strcmp instead of =='],
          debuggingExercise: {
            prompt: 'This program skips the name prompt. Fix it.',
            buggyCode: `#include <iostream>
#include <string>

int main() {
    int age;
    std::string name;
    std::cin >> age;
    std::getline(std::cin, name);
    std::cout << age << " " << name << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <string>

int main() {
    int age;
    std::string name;
    std::cin >> age;
    std::cin.ignore();
    std::getline(std::cin, name);
    std::cout << age << " " << name << std::endl;
    return 0;
}`,
            explanation: 'The >> operator left a newline in the stream, and getline read it as an empty line. std::cin.ignore() discards the leftover newline first.'
          },
          miniChallenge: 'Write a program that reads a full line and prints it in reverse using a loop over the string indices.',
          summary: 'std::string manages its own memory, supports + and ==, and grows automatically. Use >> for single words and getline for whole lines, ignoring the leftover newline in between. Next module: operators.',
          knowledgeCheck: [
            q('How do you compare two std::string values for equality?', ['strcmp(a, b) == 0', 'a == b', 'a = b', 'a.equals(b)'], 1, 'std::string overloads == to compare contents.'),
            q('What does std::getline do that >> does not?', ['It reads numbers', 'It reads a whole line including spaces', 'It is faster', 'It reads from a file'], 1, 'getline reads until the newline, keeping spaces, while >> stops at whitespace.')
          ],
          exercises: [
            ex('cpp-m2-l2-e1', 'Greet by name', 'write-code', 'Read a single word (a name) and print "Hello, <name>!" on one line.',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string name;\n    // read name, print "Hello, <name>!"\n    return 0;\n}',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string name;\n    std::cin >> name;\n    std::cout << "Hello, " << name << "!" << std::endl;\n    return 0;\n}',
              'Read the name with >> and build the greeting with chained <<.',
              'O(n)', [tc('greet Ada', 'Ada\n', 'Hello, Ada!'), tc('greet Bob', 'Bob\n', 'Hello, Bob!', true)], h5(
                'Build the output by chaining << with the pieces of the greeting.',
                'Read name with std::cin >> name, then print "Hello, " << name << "!".',
                'std::cout << "Hello, " << name << "!" << std::endl;',
                'If the exclamation mark is missing, check it is inside the quoted string.',
                'Solution: std::cout << "Hello, " << name << "!" << std::endl; Input "Ada" gives "Hello, Ada!".'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m3',
      title: 'Operators',
      description: 'Arithmetic, relational, logical, and bitwise operators, plus operator overloading preview.',
      level: 'beginner',
      order: 3,
      lessons: [
        {
          id: 'cpp-m3-l1',
          slug: 'arithmetic-relational',
          title: 'Arithmetic and Relational Operators',
          objectives: ['Use arithmetic operators including modulo', 'Compare values with relational operators', 'Explain integer division and type promotion'],
          introduction: 'Operators are the verbs of C++: they add, subtract, compare, and assign. This lesson covers arithmetic and relational operators, including the integer division rules inherited from C.',
          concept: 'C++ provides the arithmetic operators + - * / and % for remainder, plus compound assignments like += -= *= /= %= that combine an operation with assignment. Integer division truncates toward zero, so 7 / 2 is 3, while 7.0 / 2 is 3.5 because one operand is a double. When you mix types, the usual arithmetic conversions promote the narrower type: int and double produce a double. Relational operators == != < <= > >= compare two values and produce a bool, true or false, which prints as 1 or 0 unless you enable std::boolalpha. The increment and decrement operators ++ and -- have prefix and postfix forms: ++x increments first and yields the new value, while x++ yields the old value and increments afterwards. Operator precedence decides evaluation order: multiplication binds tighter than addition, so 2 + 3 * 4 is 14, and parentheses override precedence. C++ also lets you overload operators for your own types, which is covered in the OOP modules.',
          syntax: 'int x = 7;\nint q = x / 2;      // 3\nint r = x % 2;      // 1\ndouble d = 7.0 / 2; // 3.5\nbool big = (x > 5); // true',
          analogy: 'Operators are like the buttons on a calculator: each one does exactly one job, and the order you press them in changes the answer.',
          exampleCode: `#include <iostream>

int main() {
    int a = 7, b = 2;
    std::cout << "7 / 2 = " << a / b << std::endl;
    std::cout << "7 % 2 = " << a % b << std::endl;
    std::cout << "7.0 / 2 = " << 7.0 / 2 << std::endl;
    std::cout << std::boolalpha;
    std::cout << "7 > 2: " << (a > b) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Divide 7 by 2 as ints to get 3.', 'Take 7 % 2 to get the remainder 1.', 'Divide 7.0 by 2 to get 3.5.', 'Enable boolalpha so bools print as true and false.', 'Print the comparison result.'],
          commonMistakes: ['Expecting 7 / 2 to be 3.5 when both operands are ints', 'Writing = when == was intended', 'Using x++ inside a complex expression and being surprised by the value'],
          debuggingExercise: {
            prompt: 'This program should print 3.5 but prints 3. Fix it.',
            buggyCode: `#include <iostream>

int main() {
    int a = 7, b = 2;
    std::cout << a / b << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

int main() {
    double a = 7, b = 2;
    std::cout << a / b << std::endl;
    return 0;
}`,
            explanation: 'Both operands were ints, so the division truncated. Making the operands doubles, or writing 7.0 / 2, keeps the fractional part.'
          },
          miniChallenge: 'Write a program that reads a total number of minutes and prints the equivalent hours and remaining minutes.',
          summary: 'Arithmetic operators follow precedence rules, integer division truncates, and relational operators produce bools. Next: logical operators and short-circuiting.',
          knowledgeCheck: [
            q('What is 7 / 2 in C++ when both operands are int?', ['3.5', '3', '4', '2'], 1, 'Integer division truncates toward zero, so 7 / 2 is 3.'),
            q('What does std::boolalpha do?', ['Makes bools print as true/false', 'Makes ints print as hex', 'Disables bool', 'Sorts bools'], 0, 'boolalpha changes bool output from 1/0 to true/false.')
          ],
          exercises: [
            ex('cpp-m3-l1-e1', 'Quotient and remainder', 'write-code', 'Read two integers a and b (b not zero) and print the quotient and remainder on one line, separated by a space.',
              '#include <iostream>\n\nint main() {\n    int a, b;\n    // read a and b, print a / b and a % b\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    std::cout << a / b << " " << a % b << std::endl;\n    return 0;\n}',
              'Integer division gives the quotient and % gives the remainder.',
              'O(1)', [tc('17 divided by 5', '17 5\n', '3 2'), tc('10 divided by 3', '10 3\n', '3 1', true)], h5(
                'The quotient is a / b and the remainder is a % b.',
                'Read a and b, then print a / b, a space, and a % b.',
                'std::cout << a / b << " " << a % b << std::endl;',
                'If the remainder looks like the quotient, check you used % for the second value.',
                'Solution: print a / b and a % b separated by a space. 17 / 5 gives "3 2".'))
          ]
        },
        {
          id: 'cpp-m3-l2',
          slug: 'logical-bitwise',
          title: 'Logical and Bitwise Operators',
          objectives: ['Combine conditions with &&, ||, and !', 'Explain short-circuit evaluation', 'Use bitwise operators for flags'],
          introduction: 'Programs make decisions by combining conditions, and low-level code manipulates individual bits. This lesson covers logical operators with short-circuiting and the bitwise operators used for flags and masks.',
          concept: 'Logical operators combine bool values: && is true only when both sides are true, || is true when at least one side is true, and ! flips a value. C++ evaluates && and || with short-circuiting: in a && b, if a is false the whole expression is false and b is never evaluated; in a || b, if a is true the result is true without evaluating b. This is useful for safety checks such as p != nullptr && p->value > 0, where the second part would crash if the first were false. Bitwise operators work on each bit: & AND, | OR, ^ XOR, ~ NOT, << left shift, >> right shift. A common idiom tests a bit with (flags & MASK) != 0, sets a bit with flags |= MASK, and clears a bit with flags &= ~MASK. Bitwise operators differ from logical operators: & works bit by bit while && works on truth values. In C++, bool is a real type, so logical operators return bool rather than int, and std::boolalpha prints them as true and false.',
          syntax: 'bool ok = (age >= 18) && (has_ticket);\nbool any = (a < 0) || (b < 0);\nunsigned int flags = 0;\nflags |= (1u << 2); // set bit 2',
          analogy: 'Logical operators are like security checkpoints: && means you need both badges, || means either badge will do. Bitwise operators are like light switches: each one is independent.',
          exampleCode: `#include <iostream>

int main() {
    int age = 20;
    bool has_ticket = true;
    bool can_enter = (age >= 18) && has_ticket;
    std::cout << std::boolalpha << "Can enter: " << can_enter << std::endl;
    unsigned int flags = 0;
    flags |= (1u << 1);
    std::cout << "flags = " << flags << std::endl;
    std::cout << "bit 1 set: " << ((flags & (1u << 1)) != 0) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Combine age and ticket checks with &&.', 'Print the result as true.', 'Set bit 1 of flags, giving 2.', 'Test bit 1 with a mask.', 'Print the test result as true.'],
          commonMistakes: ['Writing = instead of == in a comparison', 'Chaining comparisons like 0 < x < 10, which does not mean what it looks like', 'Confusing & with && and | with ||'],
          debuggingExercise: {
            prompt: 'This program prints true for x = 20 even though 20 is not between 0 and 10. Fix it.',
            buggyCode: `#include <iostream>

int main() {
    int x = 20;
    std::cout << std::boolalpha << (0 < x < 10) << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

int main() {
    int x = 20;
    std::cout << std::boolalpha << ((x > 0) && (x < 10)) << std::endl;
    return 0;
}`,
            explanation: 'C++ evaluates 0 < x < 10 as (0 < x) < 10. Since 0 < 20 is true (1), and 1 < 10 is true, the result is true. Range checks need two comparisons joined with &&.'
          },
          miniChallenge: 'Write a program that reads an age and prints true if the person is a teenager (13 to 19 inclusive) and false otherwise.',
          summary: 'Logical operators combine conditions with short-circuiting, and bitwise operators manipulate individual bits. Remember == for comparison and && for range checks. Next module: control flow.',
          knowledgeCheck: [
            q('What is the result of (5 > 3) && (2 > 4)?', ['true', 'false', '5', '2'], 1, 'The first part is true but the second is false, so && gives false.'),
            q('How do you set bit 2 of flags?', ['flags = 1 << 2', 'flags |= (1u << 2)', 'flags & (1u << 2)', 'flags ^ 2'], 1, 'OR-ing with the mask sets the bit while leaving the others unchanged.')
          ],
          exercises: [
            ex('cpp-m3-l2-e1', 'Is it in range?', 'write-code', 'Read one integer and print "true" if it is between 10 and 20 inclusive, otherwise print "false". Use std::boolalpha.',
              '#include <iostream>\n\nint main() {\n    int n;\n    // read n, print true if 10 <= n <= 20\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::cout << std::boolalpha << ((n >= 10) && (n <= 20)) << std::endl;\n    return 0;\n}',
              'Two comparisons joined with && test both ends of the range; boolalpha prints true/false.',
              'O(1)', [tc('15 in range', '15\n', 'true'), tc('25 out of range', '25\n', 'false', true)], h5(
                'A range check needs two comparisons: n >= 10 and n <= 20.',
                'Join them with && and print the result with std::boolalpha.',
                'std::cout << std::boolalpha << ((n >= 10) && (n <= 20)) << std::endl;',
                'If 25 prints true, you probably chained the comparisons; use && instead.',
                'Solution: print ((n >= 10) && (n <= 20)) with boolalpha. 15 gives true, 25 gives false.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m4',
      title: 'Control Flow',
      description: 'if, switch, loops, and range-based for.',
      level: 'beginner',
      order: 4,
      lessons: [
        {
          id: 'cpp-m4-l1',
          slug: 'if-switch',
          title: 'if, else, and switch',
          objectives: ['Write if / else if / else chains', 'Write switch statements with break', 'Use the ternary operator'],
          introduction: 'Conditional statements let a program choose different paths based on data. This lesson covers if chains, switch statements, and the ternary operator for compact two-way choices.',
          concept: 'An if statement evaluates a condition and runs its block only when the condition is true. An optional else block runs when it is false, and else if chains test several conditions in order, running the first branch that matches. Braces are optional for a single statement but always recommended, because a second statement added later without braces silently falls outside the if. A classic bug is writing if (x = 5) instead of if (x == 5): the assignment sets x to 5 and the condition is always true. A switch evaluates an integer or character expression and jumps to the matching case label; each case typically ends with break, and without it execution falls through to the next case. The optional default label runs when no case matches. The ternary operator condition ? a : b is an expression that yields a when the condition is true and b otherwise, so int max = (a > b) ? a : b; picks the larger value in one line.',
          syntax: 'if (score >= 90) {\n    std::cout << "A\\n";\n} else if (score >= 80) {\n    std::cout << "B\\n";\n} else {\n    std::cout << "C or below\\n";\n}\nint max = (a > b) ? a : b;',
          analogy: 'An if chain is like a set of doors in a hallway: you try each door in order and walk through the first one that opens.',
          exampleCode: `#include <iostream>

int main() {
    int score = 85;
    if (score >= 90) {
        std::cout << "Grade A" << std::endl;
    } else if (score >= 80) {
        std::cout << "Grade B" << std::endl;
    } else {
        std::cout << "Grade C or below" << std::endl;
    }
    int day = 3;
    switch (day) {
        case 1: std::cout << "Monday" << std::endl; break;
        case 3: std::cout << "Wednesday" << std::endl; break;
        default: std::cout << "Another day" << std::endl; break;
    }
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Set score to 85.', 'The first test fails, the second succeeds, so print Grade B.', 'Set day to 3.', 'switch jumps to case 3 and prints Wednesday.', 'break exits the switch.'],
          commonMistakes: ['Writing if (x = 5) instead of if (x == 5)', 'Forgetting break and falling through cases', 'Omitting braces and adding a second statement that runs unconditionally'],
          debuggingExercise: {
            prompt: 'This program always prints "Pass" even for a score of 30. Fix it.',
            buggyCode: `#include <iostream>

int main() {
    int score = 30;
    if (score = 50) {
        std::cout << "Pass" << std::endl;
    } else {
        std::cout << "Fail" << std::endl;
    }
    return 0;
}`,
            fixedCode: `#include <iostream>

int main() {
    int score = 30;
    if (score >= 50) {
        std::cout << "Pass" << std::endl;
    } else {
        std::cout << "Fail" << std::endl;
    }
    return 0;
}`,
            explanation: 'score = 50 assigns 50 to score and the condition is 50, which is non-zero and therefore true. The intended test is score >= 50, a comparison.'
          },
          miniChallenge: 'Write a program that reads a temperature and prints "Cold", "Mild", or "Hot" using an if chain.',
          summary: 'if, else if, and else select one branch based on the first true condition, switch matches integer values against constant cases, and the ternary compresses a two-way choice. Next: loops.',
          knowledgeCheck: [
            q('In an if / else if chain, how many branches can run?', ['All of them', 'At most one', 'Exactly two', 'None'], 1, 'Execution stops at the first true condition, so at most one branch runs.'),
            q('What happens if a case in a switch has no break?', ['Compile error', 'Execution falls through to the next case', 'The switch restarts', 'The program crashes'], 1, 'Without break, control continues into the following case body.')
          ],
          exercises: [
            ex('cpp-m4-l1-e1', 'Pass or fail', 'write-code', 'Read a score and print "pass" if it is 50 or more, otherwise print "fail".',
              '#include <iostream>\n\nint main() {\n    int score;\n    // read score, print pass or fail\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int score;\n    std::cin >> score;\n    if (score >= 50) {\n        std::cout << "pass" << std::endl;\n    } else {\n        std::cout << "fail" << std::endl;\n    }\n    return 0;\n}',
              'An if/else on score >= 50 prints the right word.',
              'O(1)', [tc('score 72', '72\n', 'pass'), tc('score 49', '49\n', 'fail', true)], h5(
                'Compare the score with >= 50 to decide the branch.',
                'Use if (score >= 50) to print "pass", else print "fail".',
                'if (score >= 50) { std::cout << "pass"; } else { std::cout << "fail"; }',
                'If both words print, check the braces around each branch.',
                'Solution: if (score >= 50) print "pass", else print "fail". The boundary 50 counts as a pass.'))
          ]
        },
        {
          id: 'cpp-m4-l2',
          slug: 'loops-range-for',
          title: 'Loops and Range-Based for',
          objectives: ['Write while, for, and do-while loops', 'Use range-based for to iterate containers', 'Use break and continue'],
          introduction: 'Loops repeat work, and C++ adds a range-based for loop that iterates a container without manual indexing. This lesson covers all the loop forms and when to use each.',
          concept: 'A while loop checks its condition before each iteration, a do-while loop checks after, so it always runs at least once, and a for loop bundles initialization, condition, and update into one line. The range-based for loop, for (int x : numbers), visits every element of a container or array without an index, which is cleaner and less error-prone than manual indexing. Use auto& to modify elements in place, for (auto& x : numbers), and const auto& to read without copying, which matters for strings and large objects. break exits the nearest enclosing loop immediately, and continue skips to the next iteration. Every loop needs a guarantee of progress toward termination, and off-by-one errors are the classic loop bug, so check whether the last value should be included by testing the boundary. Range-based for cannot change the size of the container while iterating, and it always visits every element, so use an index loop when you need to skip elements or stop early.',
          syntax: 'for (int i = 0; i < 5; i++) { std::cout << i << std::endl; }\nfor (int x : numbers) { std::cout << x << std::endl; }\nfor (const auto& s : names) { std::cout << s << std::endl; }',
          analogy: 'A range-based for loop is like a conveyor belt: each item comes to you in turn, and you never have to count how many items there are.',
          exampleCode: `#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int x : numbers) {
        sum += x;
    }
    std::cout << "Sum: " << sum << std::endl;
    std::vector<std::string> names = {"Ada", "Grace", "Alan"};
    for (const auto& name : names) {
        std::cout << name << std::endl;
    }
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a vector of numbers 1 through 5.', 'Sum them with a range-based for loop, getting 15.', 'Create a vector of names.', 'Print each name with const auto& to avoid copies.', 'Note that no index variable was needed.'],
          commonMistakes: ['Modifying a container while iterating it with range-based for', 'Using auto (a copy) when you meant auto& to modify elements', 'Writing for (i = 0; i <= n; i++) when you meant i < n'],
          debuggingExercise: {
            prompt: 'This loop should double every element but the vector is unchanged. Fix it.',
            buggyCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    for (auto x : v) {
        x *= 2;
    }
    for (auto x : v) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    for (auto& x : v) {
        x *= 2;
    }
    for (auto x : v) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
            explanation: 'auto x is a copy of each element, so modifying it does nothing to the vector. auto& binds a reference to the actual element, so the change persists.'
          },
          miniChallenge: 'Write a program that reads 5 numbers into a vector and prints them in reverse using a range-based for loop over a reversed view, or an index loop.',
          summary: 'Range-based for iterates containers cleanly; use const auto& to read and auto& to modify. while and for cover the rest, with break and continue for control. Next module: functions.',
          knowledgeCheck: [
            q('What does for (const auto& x : v) do?', ['Copies each element', 'Binds a read-only reference to each element without copying', 'Modifies each element', 'Sorts the vector'], 1, 'const auto& reads each element by reference, avoiding copies and preventing modification.'),
            q('How many times does a do-while loop run its body at minimum?', ['Zero', 'Once', 'Twice', 'Until break'], 1, 'The condition is checked after the body, so the body always runs at least once.')
          ],
          exercises: [
            ex('cpp-m4-l2-e1', 'Sum with range-for', 'write-code', 'Read 5 integers into a vector and print their sum, using a range-based for loop.',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v(5);\n    // read 5 numbers into v, print their sum with range-for\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v(5);\n    for (int i = 0; i < 5; i++) std::cin >> v[i];\n    int sum = 0;\n    for (int x : v) sum += x;\n    std::cout << sum << std::endl;\n    return 0;\n}',
              'A range-based for loop visits every element and adds it to the sum.',
              'O(n)', [tc('sum 1..5', '1 2 3 4 5\n', '15'), tc('all tens', '10 10 10 10 10\n', '50', true)], h5(
                'A range-based for loop visits every element of the vector.',
                'Read the five numbers, then loop for (int x : v) sum += x; and print sum.',
                'int sum = 0; for (int x : v) sum += x; std::cout << sum << std::endl;',
                'If the sum is 0, check the loop actually adds x to sum.',
                'Solution: for (int x : v) sum += x; Input 1 2 3 4 5 gives 15.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m5',
      title: 'Functions',
      description: 'Defining functions, overloading, default arguments, and lambdas.',
      level: 'beginner',
      order: 5,
      lessons: [
        {
          id: 'cpp-m5-l1',
          slug: 'functions-overloading',
          title: 'Functions and Overloading',
          objectives: ['Define functions with parameters and return values', 'Overload functions by parameter types', 'Use default arguments'],
          introduction: 'Functions package reusable logic, and C++ lets several functions share one name as long as their parameters differ. This lesson covers function definitions, overloading, and default arguments.',
          concept: 'A C++ function has a return type, a name, a parameter list, and a body. When you call it, arguments are copied into parameters, and return sends a value back. Unlike C, C++ allows function overloading: several functions can share a name if their parameter lists differ in number or type, and the compiler picks the best match at the call site. Overloading is how std::abs works for both int and double. Default arguments let callers omit parameters, as in void greet(std::string name = "Guest");, and they must appear at the end of the parameter list. Functions can also be declared before they are defined, with a prototype near the top of the file. Parameters are passed by value by default, which copies the argument; passing by reference, covered in the pointers and references module, avoids the copy and lets the function modify the caller\'s variable. Good functions do one thing well and have descriptive names.',
          syntax: 'int add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nvoid greet(std::string name = "Guest") {\n    std::cout << "Hello, " << name << std::endl;\n}',
          analogy: 'Overloading is like a restaurant that takes orders by phone, at the counter, or online: same restaurant, same "order" idea, different ways of placing it.',
          exampleCode: `#include <iostream>
#include <string>

int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

void greet(std::string name = "Guest") {
    std::cout << "Hello, " << name << "!" << std::endl;
}

int main() {
    std::cout << add(2, 3) << std::endl;
    std::cout << add(2.5, 3.5) << std::endl;
    greet();
    greet("Ada");
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define two add overloads, one for int and one for double.', 'Call add(2, 3) and the int version is chosen.', 'Call add(2.5, 3.5) and the double version is chosen.', 'Call greet() with no argument to use the default "Guest".', 'Call greet("Ada") to override the default.'],
          commonMistakes: ['Overloading only by return type, which is not allowed', 'Putting a default argument in the middle of the parameter list', 'Creating ambiguous overloads that the compiler cannot choose between'],
          debuggingExercise: {
            prompt: 'This program fails to compile with "ambiguous call". Fix it.',
            buggyCode: `#include <iostream>

void print(int x) { std::cout << "int " << x << std::endl; }
void print(double x) { std::cout << "double " << x << std::endl; }

int main() {
    print(5.0f);
    return 0;
}`,
            fixedCode: `#include <iostream>

void print(int x) { std::cout << "int " << x << std::endl; }
void print(double x) { std::cout << "double " << x << std::endl; }

int main() {
    print(5.0);
    return 0;
}`,
            explanation: 'A float literal converts equally well to int and double, so the call is ambiguous. Passing a double literal 5.0 selects the double overload unambiguously.'
          },
          miniChallenge: 'Write overloaded functions area that compute the area of a square (one side) and of a rectangle (two sides).',
          summary: 'Functions can be overloaded by parameter types, and default arguments let callers omit trailing parameters. The compiler picks the best match. Next: lambdas.',
          knowledgeCheck: [
            q('Can two functions have the same name but different return types only?', ['Yes', 'No, overloading requires different parameter lists', 'Only for main', 'Only in classes'], 1, 'Overloading is resolved by parameter lists; the return type alone is not enough to distinguish overloads.'),
            q('Where must default arguments appear?', ['At the start', 'At the end of the parameter list', 'Anywhere', 'In the body'], 1, 'Parameters with defaults must come after all parameters without defaults.')
          ],
          exercises: [
            ex('cpp-m5-l1-e1', 'Maximum of two', 'write-code', 'Read two integers and print the larger one. Implement int max2(int a, int b) and call it from main.',
              '#include <iostream>\n\nint max2(int a, int b) {\n    // return the larger of a and b\n    return 0;\n}\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    std::cout << max2(a, b) << std::endl;\n    return 0;\n}',
              '#include <iostream>\n\nint max2(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    std::cout << max2(a, b) << std::endl;\n    return 0;\n}',
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
          id: 'cpp-m5-l2',
          slug: 'lambdas',
          title: 'Lambdas and Function Objects',
          objectives: ['Write lambda expressions', 'Capture variables by value and by reference', 'Pass lambdas to standard algorithms'],
          introduction: 'A lambda is a small anonymous function you can define inline, right where you use it. This lesson covers lambda syntax, captures, and their use with standard algorithms like std::sort.',
          concept: 'A lambda expression has the form [captures](parameters) -> return_type { body };, where the return type is usually deduced and can be omitted. The capture list controls which surrounding variables the lambda can use: [] captures nothing, [=] captures by value, [&] captures by reference, and [x] or [&x] capture specific variables. Capturing by reference lets the lambda modify the original variable, while capturing by value gives it a copy frozen at creation time. Lambdas are commonly passed to algorithms: std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; }); sorts descending with a one-line comparator. A lambda can be stored in a variable with auto, or in a std::function<int(int, int)> when it needs a fixed type. Lambdas make code shorter and keep small logic close to where it is used, instead of forcing a named function far away.',
          syntax: 'auto square = [](int x) { return x * x; };\nint factor = 10;\nauto times = [factor](int x) { return x * factor; };\nstd::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });',
          analogy: 'A lambda is like a sticky note with instructions: you write it on the spot, use it once, and throw it away, instead of filing a formal document.',
          exampleCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {3, 1, 4, 1, 5};
    std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
    int factor = 10;
    auto times = [factor](int x) { return x * factor; };
    std::cout << times(5) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a vector of numbers.', 'Sort it descending with a lambda comparator.', 'Print the sorted values: 5 4 3 1 1.', 'Capture factor by value in a lambda that multiplies by 10.', 'Call it with 5 to get 50.'],
          commonMistakes: ['Capturing a local by reference and using the lambda after the local is destroyed', 'Forgetting the capture list entirely', 'Assuming a lambda with [=] sees later changes to the captured variable'],
          debuggingExercise: {
            prompt: 'This lambda prints 0 instead of 10. Fix it.',
            buggyCode: `#include <iostream>

int main() {
    int factor = 0;
    auto times = [factor](int x) { return x * factor; };
    factor = 10;
    std::cout << times(5) << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

int main() {
    int factor = 0;
    auto times = [&factor](int x) { return x * factor; };
    factor = 10;
    std::cout << times(5) << std::endl;
    return 0;
}`,
            explanation: 'The lambda captured factor by value, freezing it at 0. Capturing by reference [&factor] makes the lambda see the updated value 10.'
          },
          miniChallenge: 'Use std::count_if with a lambda to count how many numbers in a vector are even.',
          summary: 'Lambdas define small functions inline; captures control which variables they see, by value or by reference. They are the natural way to customize standard algorithms. Next module: arrays and strings.',
          knowledgeCheck: [
            q('What does [=] in a lambda capture list mean?', ['Capture nothing', 'Capture all used variables by value', 'Capture all by reference', 'Capture only the first variable'], 1, '[=] captures the variables the lambda uses by value, copying them at creation.'),
            q('Why would you capture by reference [&]?', ['It is faster to type', 'So the lambda sees later changes to the variable', 'To make the lambda slower', 'It is required'], 1, 'A reference capture lets the lambda read and modify the original variable.')
          ],
          exercises: [
            ex('cpp-m5-l2-e1', 'Lambda doubling', 'write-code', 'Read an integer and print twice its value, computing the doubling with a lambda stored in auto.',
              '#include <iostream>\n\nint main() {\n    int n;\n    // read n, double it with a lambda\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    auto twice = [](int x) { return 2 * x; };\n    std::cout << twice(n) << std::endl;\n    return 0;\n}',
              'A lambda [](int x) { return 2 * x; } doubles its argument.',
              'O(1)', [tc('double 21', '21\n', '42'), tc('double 0', '0\n', '0', true)], h5(
                'A lambda is a small anonymous function you can store in auto.',
                'Define auto twice = [](int x) { return 2 * x; }; then print twice(n).',
                'auto twice = [](int x) { return 2 * x; }; std::cout << twice(n) << std::endl;',
                'If the program prints the lambda address, check you called twice(n) with parentheses.',
                'Solution: auto twice = [](int x) { return 2 * x; }; Input 21 gives 42.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m6',
      title: 'Arrays and Strings',
      description: 'C-style arrays, std::array, std::vector, and string manipulation.',
      level: 'beginner',
      order: 6,
      lessons: [
        {
          id: 'cpp-m6-l1',
          slug: 'arrays-vector',
          title: 'Arrays, std::array, and std::vector',
          objectives: ['Use C-style arrays and std::array', 'Use std::vector for dynamic storage', 'Choose the right container for the job'],
          introduction: 'C++ keeps C-style arrays but adds safer options: std::array for fixed sizes and std::vector for dynamic sizes. This lesson compares all three and shows when each is right.',
          concept: 'A C-style array int a[5]; is a contiguous block with no size information and no bounds checking, so it is easy to overrun. std::array<int, 5> wraps the same storage in a class that knows its size, offers .size() and .at() with bounds checking, and works with range-based for and standard algorithms. std::vector<int> is the workhorse: it grows automatically with push_back, shrinks with pop_back, reports its size with .size(), and manages its own memory, freeing it when the vector goes out of scope. Vectors store elements contiguously, so indexing is fast and cache-friendly. Both std::array and std::vector are passed by value, which copies all elements, so functions usually take them by const reference. For most code, std::vector is the default choice; std::array is for fixed sizes known at compile time, and C-style arrays are mostly for interfacing with C APIs.',
          syntax: 'int c_array[5] = {1, 2, 3, 4, 5};\nstd::array<int, 5> arr = {1, 2, 3, 4, 5};\nstd::vector<int> v = {1, 2, 3};\nv.push_back(4);\nstd::cout << v.size() << std::endl;',
          analogy: 'A C array is a row of open boxes with no labels; std::array is the same row with a label saying how many boxes there are; std::vector is a row that adds new boxes automatically when you need them.',
          exampleCode: `#include <iostream>
#include <array>
#include <vector>

int main() {
    std::array<int, 3> arr = {10, 20, 30};
    std::cout << "array size: " << arr.size() << std::endl;
    std::vector<int> v = {1, 2, 3};
    v.push_back(4);
    v.push_back(5);
    std::cout << "vector size: " << v.size() << std::endl;
    int sum = 0;
    for (int x : v) sum += x;
    std::cout << "sum: " << sum << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a std::array of three values and print its size.', 'Create a vector with three values.', 'Add two more with push_back.', 'Print the new size, 5.', 'Sum the vector with a range-based for loop to get 15.'],
          commonMistakes: ['Accessing v[i] beyond v.size(), which is undefined behaviour', 'Passing a vector by value and paying the copy cost', 'Using .at() in a hot loop where bounds checking hurts performance'],
          debuggingExercise: {
            prompt: 'This program crashes. Fix it.',
            buggyCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    std::cout << v[5] << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    std::cout << v.at(2) << std::endl;
    return 0;
}`,
            explanation: 'Index 5 is out of bounds for a three-element vector, which is undefined behaviour. Accessing the last valid index, 2, is safe, and .at() would throw an exception instead of silently misbehaving.'
          },
          miniChallenge: 'Write a program that reads 5 numbers into a vector, sorts it with std::sort, and prints the median.',
          summary: 'std::array adds size and safety to fixed arrays, and std::vector adds dynamic growth and automatic memory management. Prefer them over C-style arrays. Next: string manipulation.',
          knowledgeCheck: [
            q('What does std::vector::push_back do?', ['Removes the last element', 'Adds an element to the end, growing the vector if needed', 'Sorts the vector', 'Clears the vector'], 1, 'push_back appends an element, allocating more capacity when the vector is full.'),
            q('What is the advantage of std::array over a C-style array?', ['It is faster', 'It knows its size and offers bounds-checked access', 'It can grow', 'It uses less memory'], 1, 'std::array wraps fixed storage in a class with .size() and .at().')
          ],
          exercises: [
            ex('cpp-m6-l1-e1', 'Vector sum', 'write-code', 'Read n, then n integers into a vector, and print their sum.',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    // read n numbers into a vector, print their sum\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        std::cin >> v[i];\n        sum += v[i];\n    }\n    std::cout << sum << std::endl;\n    return 0;\n}',
              'Read n values into the vector and accumulate their sum.',
              'O(n)', [tc('sum 1..5', '5\n1 2 3 4 5\n', '15'), tc('sum 1 number', '1\n42\n', '42', true)], h5(
                'A vector sized n holds exactly the numbers you read.',
                'Create std::vector<int> v(n), loop to read each value and add it to sum.',
                'std::vector<int> v(n); int sum = 0; for (int i = 0; i < n; i++) { std::cin >> v[i]; sum += v[i]; }',
                'If the sum is missing the last number, check the loop runs n times.',
                'Solution: read n values into a vector and print their sum. Input 5 then 1 2 3 4 5 gives 15.'))
          ]
        },
        {
          id: 'cpp-m6-l2',
          slug: 'string-manipulation',
          title: 'String Manipulation with std::string',
          objectives: ['Search and extract substrings', 'Convert between strings and numbers', 'Use string algorithms'],
          introduction: 'std::string is more than storage: it offers searching, substrings, and conversions. This lesson covers the member functions and free functions that make text processing easy in C++.',
          concept: 'std::string provides find to locate a substring or character, returning std::string::npos when it is not found, and substr to extract a range by position and length. The + operator concatenates, += appends, and insert and erase modify the string in place. Comparisons with ==, <, and > work lexicographically, which makes sorting strings natural. Converting between strings and numbers uses std::stoi, std::stod, and std::to_string, which throw std::invalid_argument on bad input. The <algorithm> header adds tools like std::count, std::find, and std::reverse that work on strings as well as other containers. Strings are value types: copying a string copies its contents, and moving a string transfers ownership without copying, which the move semantics module covers. Because std::string manages its own buffer, you never need to worry about the null terminator, though .c_str() gives a C-style pointer when a C API needs one.',
          syntax: 'std::string s = "hello world";\nauto pos = s.find("world");\nstd::string sub = s.substr(0, 5); // "hello"\nint n = std::stoi("42");\nstd::string t = std::to_string(42);',
          analogy: 'std::string functions are like a word processor\'s find and replace: find locates the word, substr copies a passage, and erase deletes it.',
          exampleCode: `#include <iostream>
#include <string>

int main() {
    std::string s = "hello world";
    auto pos = s.find("world");
    std::cout << "Found at: " << pos << std::endl;
    std::cout << "First word: " << s.substr(0, 5) << std::endl;
    std::cout << "Number: " << std::stoi("42") + 8 << std::endl;
    std::cout << "As string: " << std::to_string(42) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Find "world" in the string; it starts at index 6.', 'Extract the first five characters, "hello".', 'Convert "42" to an int and add 8 to get 50.', 'Convert 42 back to a string.', 'Print each result.'],
          commonMistakes: ['Comparing the result of find with -1 instead of std::string::npos', 'Using substr with a position beyond the string length', 'Forgetting that stoi throws on invalid input'],
          debuggingExercise: {
            prompt: 'This program prints a huge number instead of "not found". Fix it.',
            buggyCode: `#include <iostream>
#include <string>

int main() {
    std::string s = "hello";
    auto pos = s.find("z");
    if (pos == -1) {
        std::cout << "not found" << std::endl;
    }
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <string>

int main() {
    std::string s = "hello";
    auto pos = s.find("z");
    if (pos == std::string::npos) {
        std::cout << "not found" << std::endl;
    }
    return 0;
}`,
            explanation: 'find returns std::string::npos, which is the largest size_t value, not -1. Comparing with npos is the correct test for "not found".'
          },
          miniChallenge: 'Write a program that reads a sentence and prints how many times the word "the" appears in it.',
          summary: 'std::string offers find, substr, and conversions to and from numbers, and algorithms work on strings like any container. Next module: pointers and references.',
          knowledgeCheck: [
            q('What does std::string::find return when the substring is not found?', ['-1', 'std::string::npos', '0', 'An exception'], 1, 'find returns npos, a special constant meaning "not found".'),
            q('What does std::stoi("42") return?', ['The string "42"', 'The integer 42', '4.2', 'An error'], 1, 'stoi converts a string to an int, throwing on invalid input.')
          ],
          exercises: [
            ex('cpp-m6-l2-e1', 'Count a character', 'write-code', 'Read a word and a character, and print how many times the character appears in the word.',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string word;\n    char c;\n    // read word and c, print the count of c in word\n    return 0;\n}',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string word;\n    char c;\n    std::cin >> word >> c;\n    int count = 0;\n    for (char ch : word) {\n        if (ch == c) count++;\n    }\n    std::cout << count << std::endl;\n    return 0;\n}',
              'A range-based for loop over the string counts matching characters.',
              'O(n)', [tc('count l in hello', 'hello l\n', '2'), tc('count z in hello', 'hello z\n', '0', true)], h5(
                'Loop over each character of the string and compare it with c.',
                'Use for (char ch : word) if (ch == c) count++; then print count.',
                'int count = 0; for (char ch : word) if (ch == c) count++;',
                'If the count is always 0, check the input order: word first, then the character.',
                'Solution: count characters equal to c. "hello" contains "l" twice.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m7',
      title: 'Pointers and References',
      description: 'Raw pointers, references, pass-by-reference, and const correctness.',
      level: 'beginner',
      order: 7,
      lessons: [
        {
          id: 'cpp-m7-l1',
          slug: 'references',
          title: 'References: Aliases for Variables',
          objectives: ['Explain what a reference is', 'Pass arguments by reference', 'Use const references for efficient read-only access'],
          introduction: 'A reference is an alias: another name for an existing variable. References let functions modify caller variables and avoid expensive copies, and they are safer than pointers because they cannot be null or reseated.',
          concept: 'A reference is declared with &, as in int& ref = x;, and from then on ref is x: reading ref reads x, and writing ref writes x. A reference must be initialized when declared and cannot be changed to refer to another variable afterwards. Passing by reference, void increment(int& x), lets a function modify the caller\'s variable, which is how std::swap works. Passing by const reference, void print(const std::string& s), avoids copying a large object while guaranteeing the function cannot modify it, and it is the standard way to pass strings, vectors, and other big values. A reference cannot be null, unlike a pointer, which makes it safer for function parameters that must always refer to a valid object. References are also used for return values in operator overloading, such as operator[] returning a reference so v[i] = 5 works. The key rule is that a reference must always bind to a variable that outlives it; returning a reference to a local variable is a dangling reference and a serious bug.',
          syntax: 'int x = 5;\nint& ref = x;\nref = 10; // x is now 10\nvoid increment(int& x) { x++; }\nvoid print(const std::string& s);',
          analogy: 'A reference is like a nickname: "Liz" and "Elizabeth" are the same person, and calling either name reaches the same person.',
          exampleCode: `#include <iostream>
#include <string>

void increment(int& x) {
    x++;
}

void print(const std::string& s) {
    std::cout << s << std::endl;
}

int main() {
    int x = 5;
    int& ref = x;
    ref = 10;
    std::cout << "x = " << x << std::endl;
    increment(x);
    std::cout << "x = " << x << std::endl;
    print("Hello, reference!");
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Declare x as 5 and ref as a reference to x.', 'Assign through ref to change x to 10.', 'Call increment(x), which modifies x through its reference parameter.', 'Print x, now 11.', 'Pass a string literal to print by const reference.'],
          commonMistakes: ['Returning a reference to a local variable', 'Declaring a reference without initializing it', 'Passing a large object by value instead of const reference'],
          debuggingExercise: {
            prompt: 'This function returns a dangling reference. Fix it.',
            buggyCode: `#include <iostream>
#include <string>

const std::string& make_greeting() {
    std::string s = "Hello";
    return s;
}

int main() {
    std::cout << make_greeting() << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <string>

std::string make_greeting() {
    std::string s = "Hello";
    return s;
}

int main() {
    std::cout << make_greeting() << std::endl;
    return 0;
}`,
            explanation: 's is destroyed when make_greeting returns, so the reference dangles. Returning by value copies or moves the string safely to the caller.'
          },
          miniChallenge: 'Write a swap function that exchanges two ints using references, and test it in main.',
          summary: 'References are aliases that cannot be null or reseated. Pass by reference to modify, and by const reference to read large objects cheaply. Next: raw pointers.',
          knowledgeCheck: [
            q('What is a reference in C++?', ['A pointer that can be null', 'An alias for an existing variable', 'A copy of a variable', 'A function pointer'], 1, 'A reference is another name for a variable; it must be initialized and cannot be reseated.'),
            q('Why pass a std::string by const reference?', ['To modify it', 'To avoid copying it while preventing modification', 'To make it global', 'To print it'], 1, 'const reference avoids the copy cost and guarantees the function cannot change the string.')
          ],
          exercises: [
            ex('cpp-m7-l1-e1', 'Swap with references', 'write-code', 'Read two integers and print them in swapped order. Implement void swap_values(int& a, int& b) and call it from main.',
              '#include <iostream>\n\nvoid swap_values(int& a, int& b) {\n    // swap a and b\n}\n\nint main() {\n    int x, y;\n    std::cin >> x >> y;\n    swap_values(x, y);\n    std::cout << x << " " << y << std::endl;\n    return 0;\n}',
              '#include <iostream>\n\nvoid swap_values(int& a, int& b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x, y;\n    std::cin >> x >> y;\n    swap_values(x, y);\n    std::cout << x << " " << y << std::endl;\n    return 0;\n}',
              'A temporary holds a while the reference parameters exchange values.',
              'O(1)', [tc('swap 3 and 9', '3 9\n', '9 3'), tc('swap equal', '5 5\n', '5 5', true)], h5(
                'Reference parameters let the function change the caller\'s variables.',
                'Save a in a temp, assign b to a, then assign temp to b.',
                'int temp = a; a = b; b = temp;',
                'If the values do not change, check the parameters are references (int&) and not values.',
                'Solution: int temp = a; a = b; b = temp; Input 3 9 prints "9 3".'))
          ]
        },
        {
          id: 'cpp-m7-l2',
          slug: 'raw-pointers',
          title: 'Raw Pointers and new/delete',
          objectives: ['Use raw pointers with new and delete', 'Explain the difference between stack and heap', 'Avoid leaks, dangling pointers, and double-free'],
          introduction: 'Pointers hold addresses, and new allocates memory on the heap. This lesson covers raw pointers, new and delete, and the pitfalls that smart pointers later remove.',
          concept: 'A pointer stores a memory address. If int x = 42; then &x is the address of x, and int* p = &x; makes p point at x; *p reads or writes the value through the pointer. The new operator allocates on the heap: int* p = new int(42); creates an int with value 42 and returns its address, and delete p frees it. Arrays use new int[n] and delete[] p, and mixing the two forms is undefined behaviour. A pointer that does not point at anything valid should be nullptr, the modern null pointer constant, and dereferencing nullptr crashes. Every new must have a matching delete, or the program leaks; deleting the same pointer twice is undefined behaviour; and using memory after delete is use-after-free. These rules are hard to follow perfectly in complex code, which is why modern C++ prefers smart pointers and containers that manage memory automatically. Raw pointers are still essential for interfacing with C and for understanding what smart pointers do.',
          syntax: 'int x = 42;\nint* p = &x;\n*p = 100;\nint* q = new int(5);\ndelete q;\nint* arr = new int[10];\ndelete[] arr;\nint* np = nullptr;',
          analogy: 'A raw pointer is like a house key with no owner: whoever holds it can enter, but nobody tracks who is responsible for locking up.',
          exampleCode: `#include <iostream>

int main() {
    int x = 42;
    int* p = &x;
    std::cout << "x = " << x << ", *p = " << *p << std::endl;
    *p = 100;
    std::cout << "x is now " << x << std::endl;
    int* heap = new int(7);
    std::cout << "heap value: " << *heap << std::endl;
    delete heap;
    heap = nullptr;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Declare x and point p at it.', 'Read the value through *p.', 'Write through *p to change x to 100.', 'Allocate an int on the heap with new.', 'Print it, delete it, and set the pointer to nullptr.'],
          commonMistakes: ['Forgetting delete and leaking memory', 'Using delete instead of delete[] for arrays', 'Dereferencing a pointer after delete'],
          debuggingExercise: {
            prompt: 'This program leaks memory. Fix it.',
            buggyCode: `#include <iostream>

int main() {
    int* p = new int(42);
    std::cout << *p << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

int main() {
    int* p = new int(42);
    std::cout << *p << std::endl;
    delete p;
    return 0;
}`,
            explanation: 'The allocated int was never freed. Adding delete p returns the memory to the heap. In modern C++ a std::unique_ptr would do this automatically.'
          },
          miniChallenge: 'Write a program that allocates an array of n ints with new, fills it with squares, prints them, and deletes the array correctly.',
          summary: 'Raw pointers hold addresses; new allocates on the heap and delete frees it. Every new needs a matching delete, and nullptr marks an empty pointer. Next module: classes, where RAII makes this automatic.',
          knowledgeCheck: [
            q('What does new int(42) return?', ['The integer 42', 'A pointer to a heap int holding 42', 'A reference to 42', 'Nothing'], 1, 'new allocates on the heap and returns the address of the new object.'),
            q('What is wrong with using delete on memory from new int[10]?', ['Nothing', 'Arrays from new[] must be freed with delete[]', 'It is slower', 'It leaks the first element'], 1, 'Mismatched new/delete forms are undefined behaviour; use delete[] for arrays.')
          ],
          exercises: [
            ex('cpp-m7-l2-e1', 'Dynamic array sum', 'write-code', 'Read n, then n integers, and print their sum. Allocate the array with new int[n] and free it with delete[] before exiting.',
              '#include <iostream>\n\nint main() {\n    int n;\n    // read n, allocate, read n numbers, print sum, delete[]\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    int* a = new int[n];\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        std::cin >> a[i];\n        sum += a[i];\n    }\n    std::cout << sum << std::endl;\n    delete[] a;\n    return 0;\n}',
              'new int[n] allocates the array; the loop reads and sums; delete[] frees it.',
              'O(n)', [tc('sum 3 numbers', '3\n1 2 3\n', '6'), tc('sum 1 number', '1\n42\n', '42', true)], h5(
                'Use new int[n] to get an array whose size is only known at runtime.',
                'Allocate, loop to read each value and add it to sum, then delete[] the array.',
                'int* a = new int[n]; ... delete[] a;',
                'If the program crashes, check the allocation used new int[n] and the free used delete[].',
                'Solution: new int[n], read and sum n values, print sum, delete[] a. Input 3 then 1 2 3 gives 6.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m8',
      title: 'Classes',
      description: 'Defining classes, constructors, destructors, and encapsulation.',
      level: 'beginner',
      order: 8,
      lessons: [
        {
          id: 'cpp-m8-l1',
          slug: 'class-basics',
          title: 'Defining Classes and Encapsulation',
          objectives: ['Define a class with data members and member functions', 'Explain public vs private', 'Use encapsulation to protect invariants'],
          introduction: 'A class bundles data and the functions that operate on it into one type. This lesson introduces class definitions, access control, and encapsulation, the idea that an object should protect its own invariants.',
          concept: 'A class is a user-defined type that groups data members and member functions. Members are private by default in a class, meaning only member functions can access them, while public members form the interface other code uses. This separation is encapsulation: the class hides its internal representation and exposes only safe operations, so it can maintain invariants such as "the balance is never negative". Member functions are defined inside the class or outside with the scope operator, as in void BankAccount::deposit(double amount). Objects are created like variables, BankAccount account;, and members are accessed with the dot operator or -> through a pointer. A struct is the same as a class except its members are public by default, so structs are used for plain data and classes for types with behaviour. The this pointer refers to the current object inside a member function. Good classes have a clear responsibility, a small public interface, and no way to break their invariants.',
          syntax: 'class BankAccount {\nprivate:\n    double balance = 0;\npublic:\n    void deposit(double amount) { balance += amount; }\n    double get_balance() const { return balance; }\n};',
          analogy: 'A class is like a vending machine: the buttons and coin slot are the public interface, while the internal mechanism is private and you cannot reach in and grab the snacks directly.',
          exampleCode: `#include <iostream>

class BankAccount {
private:
    double balance = 0;
public:
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
    double get_balance() const { return balance; }
};

int main() {
    BankAccount account;
    account.deposit(100);
    account.withdraw(30);
    std::cout << "Balance: " << account.get_balance() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define BankAccount with a private balance.', 'deposit adds money only for positive amounts.', 'withdraw checks the amount and the balance before deducting.', 'get_balance is const, so it promises not to modify the object.', 'Deposit 100, withdraw 30, and print the balance 70.'],
          commonMistakes: ['Making all members public, which defeats encapsulation', 'Forgetting the semicolon after the class definition', 'Accessing private members from outside the class'],
          debuggingExercise: {
            prompt: 'This program fails to compile because balance is private. Fix it without making balance public.',
            buggyCode: `#include <iostream>

class BankAccount {
private:
    double balance = 0;
public:
    void deposit(double amount) { balance += amount; }
};

int main() {
    BankAccount account;
    account.balance = 100;
    return 0;
}`,
            fixedCode: `#include <iostream>

class BankAccount {
private:
    double balance = 0;
public:
    void deposit(double amount) { balance += amount; }
    double get_balance() const { return balance; }
};

int main() {
    BankAccount account;
    account.deposit(100);
    std::cout << account.get_balance() << std::endl;
    return 0;
}`,
            explanation: 'Private members can only be touched by member functions. Using deposit to set the balance and a getter to read it respects encapsulation.'
          },
          miniChallenge: 'Write a class Rectangle with private width and height, a public area() method, and a setter that rejects negative dimensions.',
          summary: 'Classes bundle data and behaviour; private members hide implementation and public members form the interface. Encapsulation protects invariants. Next: constructors and destructors.',
          knowledgeCheck: [
            q('What is the default access for members of a class?', ['public', 'private', 'protected', 'There is no default'], 1, 'Class members are private by default; struct members are public by default.'),
            q('What is encapsulation?', ['Hiding data inside functions', 'Bundling data with behaviour and exposing only a safe public interface', 'Inheriting from a base class', 'Using templates'], 1, 'Encapsulation hides the internal representation and protects the object\'s invariants.')
          ],
          exercises: [
            ex('cpp-m8-l1-e1', 'Circle area', 'write-code', 'Read a radius as a double and print the area of the circle (pi * r * r) with two decimal places. Use a class Circle with a private radius and a public area() method.',
              '#include <iostream>\n#include <iomanip>\n\nclass Circle {\nprivate:\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double area() const { return 3.14159265358979 * radius * radius; }\n};\n\nint main() {\n    double r;\n    // read r, create a Circle, print its area with 2 decimals\n    return 0;\n}',
              '#include <iostream>\n#include <iomanip>\n\nclass Circle {\nprivate:\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double area() const { return 3.14159265358979 * radius * radius; }\n};\n\nint main() {\n    double r;\n    std::cin >> r;\n    Circle c(r);\n    std::cout << std::fixed << std::setprecision(2) << c.area() << std::endl;\n    return 0;\n}',
              'The Circle class stores the radius and computes pi * r * r in area().',
              'O(1)', [tc('radius 1', '1\n', '3.14'), tc('radius 2', '2\n', '12.57', true)], h5(
                'The area of a circle is pi times radius squared.',
                'Read r, construct Circle c(r), and print c.area() with fixed and setprecision(2).',
                'Circle c(r); std::cout << std::fixed << std::setprecision(2) << c.area() << std::endl;',
                'If the area prints without decimals, check fixed and setprecision(2) are applied.',
                'Solution: area() returns pi * r * r. Radius 1 gives 3.14 and radius 2 gives 12.57.'))
          ]
        },
        {
          id: 'cpp-m8-l2',
          slug: 'constructors-destructors',
          title: 'Constructors, Destructors, and RAII',
          objectives: ['Write constructors with initializer lists', 'Explain what a destructor does', 'Apply RAII to manage resources'],
          introduction: 'Constructors initialize objects and destructors clean them up. Together they enable RAII, the C++ idiom where resource management is tied to object lifetime, which makes leaks nearly impossible.',
          concept: 'A constructor is a special member function with the same name as the class and no return type; it runs when an object is created. The member initializer list, Circle(double r) : radius(r) {}, initializes members before the body runs, which is required for const members and references and more efficient for class members. A class can have several constructors, and a default constructor takes no arguments. The destructor, ~ClassName(), runs when the object goes out of scope or is deleted, and it releases resources the object owns, such as heap memory or file handles. RAII, Resource Acquisition Is Initialization, means the constructor acquires a resource and the destructor releases it, so the resource is always freed exactly once, even when an exception is thrown. This is why std::string, std::vector, and std::unique_ptr never leak: their destructors do the cleanup. The rule of zero says to prefer these managed types so you rarely need to write a destructor at all.',
          syntax: 'class File {\npublic:\n    File(const std::string& path) { /* open */ }\n    ~File() { /* close */ }\n};',
          analogy: 'RAII is like a hotel room key: you get the key at check-in (construction), and returning it at check-out (destruction) is automatic when you leave, so the room is never left locked forever.',
          exampleCode: `#include <iostream>
#include <string>

class Greeter {
private:
    std::string name;
public:
    Greeter(const std::string& n) : name(n) {
        std::cout << "Hello, " << name << "!" << std::endl;
    }
    ~Greeter() {
        std::cout << "Goodbye, " << name << "!" << std::endl;
    }
};

int main() {
    Greeter g("Ada");
    std::cout << "Inside main." << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define Greeter with a constructor that prints a hello message.', 'The constructor uses an initializer list to set name.', 'The destructor prints a goodbye message.', 'Creating g runs the constructor.', 'When g goes out of scope at the end of main, the destructor runs.'],
          commonMistakes: ['Forgetting the member initializer list and assigning in the body instead', 'Writing a destructor that throws an exception', 'Declaring a constructor and forgetting to define it'],
          debuggingExercise: {
            prompt: 'This class leaks memory. Fix it with a destructor.',
            buggyCode: `#include <iostream>

class Buffer {
private:
    int* data;
public:
    Buffer(int n) { data = new int[n]; }
};

int main() {
    Buffer b(10);
    return 0;
}`,
            fixedCode: `#include <iostream>

class Buffer {
private:
    int* data;
public:
    Buffer(int n) : data(new int[n]) {}
    ~Buffer() { delete[] data; }
};

int main() {
    Buffer b(10);
    return 0;
}`,
            explanation: 'The class allocated memory in its constructor but never freed it. A destructor that calls delete[] releases the memory when the object goes out of scope.'
          },
          miniChallenge: 'Write a class Counter that prints a message when constructed and when destroyed, and create two Counters in nested scopes to see the order.',
          summary: 'Constructors initialize objects via initializer lists, destructors clean up when objects die, and RAII ties resources to lifetimes so cleanup is automatic. Next module: object-oriented programming.',
          knowledgeCheck: [
            q('When does a destructor run?', ['When the object is created', 'When the object goes out of scope or is deleted', 'Never', 'Only for heap objects'], 1, 'The destructor runs at the end of the object\'s lifetime, releasing its resources.'),
            q('What is RAII?', ['A sorting algorithm', 'Tying resource management to object lifetime so cleanup is automatic', 'A type of inheritance', 'A compiler flag'], 1, 'RAII means the constructor acquires a resource and the destructor releases it, guaranteeing cleanup.')
          ],
          exercises: [
            ex('cpp-m8-l2-e1', 'Rectangle perimeter', 'write-code', 'Read width and height as doubles and print the perimeter of the rectangle with two decimal places. Use a class Rectangle with a constructor and a perimeter() method.',
              '#include <iostream>\n#include <iomanip>\n\nclass Rectangle {\nprivate:\n    double width, height;\npublic:\n    Rectangle(double w, double h) : width(w), height(h) {}\n    double perimeter() const { return 2 * (width + height); }\n};\n\nint main() {\n    double w, h;\n    // read w and h, print the perimeter with 2 decimals\n    return 0;\n}',
              '#include <iostream>\n#include <iomanip>\n\nclass Rectangle {\nprivate:\n    double width, height;\npublic:\n    Rectangle(double w, double h) : width(w), height(h) {}\n    double perimeter() const { return 2 * (width + height); }\n};\n\nint main() {\n    double w, h;\n    std::cin >> w >> h;\n    Rectangle r(w, h);\n    std::cout << std::fixed << std::setprecision(2) << r.perimeter() << std::endl;\n    return 0;\n}',
              'The perimeter is 2 * (width + height).',
              'O(1)', [tc('perimeter 3x4', '3 4\n', '14.00'), tc('perimeter 1x1', '1 1\n', '4.00', true)], h5(
                'The perimeter of a rectangle is twice the width plus twice the height.',
                'Construct Rectangle r(w, h) and print r.perimeter() with fixed and setprecision(2).',
                'Rectangle r(w, h); std::cout << std::fixed << std::setprecision(2) << r.perimeter() << std::endl;',
                'If the perimeter is half the expected value, check the formula multiplies the sum by 2.',
                'Solution: perimeter() returns 2 * (width + height). 3 by 4 gives 14.00.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m9',
      title: 'OOP',
      description: 'Inheritance, polymorphism, virtual functions, and abstract classes.',
      level: 'beginner',
      order: 9,
      lessons: [
        {
          id: 'cpp-m9-l1',
          slug: 'inheritance',
          title: 'Inheritance: Building on Base Classes',
          objectives: ['Derive a class from a base class', 'Use protected members', 'Override base class functions'],
          introduction: 'Inheritance lets a new class reuse and extend an existing one. This lesson covers deriving classes, access levels, and overriding, the foundation of object-oriented design in C++.',
          concept: 'Inheritance expresses an "is-a" relationship: a Dog is an Animal, so class Dog : public Animal makes Dog inherit Animal\'s members. Public inheritance means the public interface of the base becomes the public interface of the derived class. Members marked protected are accessible to derived classes but not to outside code, which is the middle ground between private and public. A derived class can override a base class function by redefining it, and it can call the base version with Base::function(). The derived constructor should initialize the base part, usually through the initializer list, as in Dog(std::string n) : Animal(n) {}. Inheritance is powerful but should be used when the relationship is genuinely "is-a"; composition, having a member object, is often the better choice for "has-a" relationships. Overusing inheritance creates rigid hierarchies that are hard to change.',
          syntax: 'class Animal {\npublic:\n    virtual void speak() const { std::cout << "..." << std::endl; }\n};\nclass Dog : public Animal {\npublic:\n    void speak() const override { std::cout << "Woof" << std::endl; }\n};',
          analogy: 'Inheritance is like a family recipe book: the child inherits all the parent\'s recipes and can add new ones or improve an old one.',
          exampleCode: `#include <iostream>
#include <string>

class Animal {
protected:
    std::string name;
public:
    Animal(const std::string& n) : name(n) {}
    std::string get_name() const { return name; }
    virtual void speak() const {
        std::cout << name << " makes a sound." << std::endl;
    }
};

class Dog : public Animal {
public:
    Dog(const std::string& n) : Animal(n) {}
    void speak() const override {
        std::cout << name << " says Woof!" << std::endl;
    }
};

int main() {
    Dog dog("Rex");
    dog.speak();
    std::cout << "Name: " << dog.get_name() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define Animal with a protected name and a virtual speak.', 'Derive Dog from Animal.', 'Override speak in Dog to print Woof.', 'Create a Dog named Rex.', 'Call speak and get_name to see inherited and overridden behaviour.'],
          commonMistakes: ['Forgetting public in class Dog : public Animal, which makes inheritance private by default', 'Hiding a base function instead of overriding it because the signature differs', 'Using inheritance for a has-a relationship where composition fits better'],
          debuggingExercise: {
            prompt: 'This program cannot access name from main. Why, and how do you fix it properly?',
            buggyCode: `#include <iostream>
#include <string>

class Animal {
protected:
    std::string name;
public:
    Animal(const std::string& n) : name(n) {}
};

int main() {
    Animal a("Rex");
    std::cout << a.name << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <string>

class Animal {
protected:
    std::string name;
public:
    Animal(const std::string& n) : name(n) {}
    std::string get_name() const { return name; }
};

int main() {
    Animal a("Rex");
    std::cout << a.get_name() << std::endl;
    return 0;
}`,
            explanation: 'protected members are accessible to derived classes, not to outside code. A public getter is the proper way to expose the name.'
          },
          miniChallenge: 'Create a base class Shape with a virtual area() and derived classes Circle and Square that override it.',
          summary: 'Public inheritance models is-a relationships; protected members are visible to derived classes; derived classes override base functions. Next: polymorphism and virtual functions.',
          knowledgeCheck: [
            q('What does class Dog : public Animal mean?', ['Dog contains an Animal', 'Dog inherits publicly from Animal', 'Animal inherits from Dog', 'Dog is a namespace'], 1, 'Public inheritance makes Dog a kind of Animal, inheriting its public interface.'),
            q('What is protected access?', ['Accessible everywhere', 'Accessible to the class and its derived classes, but not outside code', 'The same as private', 'The same as public'], 1, 'protected sits between private and public: derived classes can use the member, outside code cannot.')
          ],
          exercises: [
            ex('cpp-m9-l1-e1', 'Shape area via inheritance', 'write-code', 'Read a side length as a double and print the area of a square with two decimal places. Use a base class Shape with a virtual area() and a derived class Square that overrides it.',
              '#include <iostream>\n#include <iomanip>\n\nclass Shape {\npublic:\n    virtual double area() const { return 0; }\n    virtual ~Shape() = default;\n};\n\nclass Square : public Shape {\nprivate:\n    double side;\npublic:\n    Square(double s) : side(s) {}\n    double area() const override { return side * side; }\n};\n\nint main() {\n    double s;\n    // read s, create a Square, print its area with 2 decimals\n    return 0;\n}',
              '#include <iostream>\n#include <iomanip>\n\nclass Shape {\npublic:\n    virtual double area() const { return 0; }\n    virtual ~Shape() = default;\n};\n\nclass Square : public Shape {\nprivate:\n    double side;\npublic:\n    Square(double s) : side(s) {}\n    double area() const override { return side * side; }\n};\n\nint main() {\n    double s;\n    std::cin >> s;\n    Square sq(s);\n    std::cout << std::fixed << std::setprecision(2) << sq.area() << std::endl;\n    return 0;\n}',
              'Square overrides area() to return side * side.',
              'O(1)', [tc('square side 3', '3\n', '9.00'), tc('square side 2.5', '2.5\n', '6.25', true)], h5(
                'The area of a square is side times side.',
                'Read s, construct Square sq(s), and print sq.area() with fixed and setprecision(2).',
                'Square sq(s); std::cout << std::fixed << std::setprecision(2) << sq.area() << std::endl;',
                'If the area is the side itself, check area() multiplies side by side.',
                'Solution: area() returns side * side. Side 3 gives 9.00.'))
          ]
        },
        {
          id: 'cpp-m9-l2',
          slug: 'polymorphism-virtual',
          title: 'Polymorphism and Virtual Functions',
          objectives: ['Explain runtime polymorphism', 'Use virtual functions and override', 'Use abstract classes with pure virtual functions'],
          introduction: 'Polymorphism lets code treat different objects through a common base interface, with the right behaviour selected at runtime. This lesson covers virtual functions, override, and abstract classes.',
          concept: 'When a base class function is marked virtual, calling it through a base pointer or reference invokes the derived class\'s version, which is decided at runtime. This is runtime polymorphism: a std::vector<std::unique_ptr<Shape>> can hold circles, squares, and triangles, and calling shape->area() on each runs the right code. The override keyword on the derived function makes the compiler check that it really overrides a base virtual, catching signature mistakes. A virtual destructor is essential in a base class: deleting a derived object through a base pointer without one is undefined behaviour, because the derived destructor never runs. A pure virtual function, virtual double area() const = 0;, has no implementation and makes the class abstract, meaning it cannot be instantiated; derived classes must implement it. Abstract classes define interfaces, and concrete classes implement them, which is the core of object-oriented design.',
          syntax: 'class Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\nclass Circle : public Shape {\npublic:\n    double area() const override { return 3.14 * r * r; }\n};',
          analogy: 'Polymorphism is like a universal remote: one "play" button works for the TV, the stereo, and the DVD player, and each device knows what "play" means for itself.',
          exampleCode: `#include <iostream>
#include <vector>
#include <memory>

class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() const override { return side * side; }
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Square>(3));
    shapes.push_back(std::make_unique<Circle>(2));
    double total = 0;
    for (const auto& s : shapes) total += s->area();
    std::cout << "Total area: " << total << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define Shape as an abstract class with a pure virtual area.', 'Implement Square and Circle, each overriding area.', 'Store both in a vector of unique_ptr<Shape>.', 'Loop over the vector calling area() on each.', 'The right implementation runs for each shape, giving 9 + 12.566 = 21.566.'],
          commonMistakes: ['Forgetting virtual on the base function, so the base version always runs', 'Forgetting a virtual destructor in a base class', 'Slicing: storing a derived object in a base variable by value, losing the derived part'],
          debuggingExercise: {
            prompt: 'This program always prints the base message instead of "Woof". Fix it.',
            buggyCode: `#include <iostream>

class Animal {
public:
    void speak() const { std::cout << "Sound" << std::endl; }
};

class Dog : public Animal {
public:
    void speak() const { std::cout << "Woof" << std::endl; }
};

int main() {
    Animal* a = new Dog();
    a->speak();
    delete a;
    return 0;
}`,
            fixedCode: `#include <iostream>

class Animal {
public:
    virtual void speak() const { std::cout << "Sound" << std::endl; }
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void speak() const override { std::cout << "Woof" << std::endl; }
};

int main() {
    Animal* a = new Dog();
    a->speak();
    delete a;
    return 0;
}`,
            explanation: 'Without virtual, the call is resolved at compile time to the base version. Making speak virtual selects the derived version at runtime, and a virtual destructor makes the delete safe.'
          },
          miniChallenge: 'Add a Triangle class to the shape example and compute the total area of a mixed vector of shapes.',
          summary: 'Virtual functions enable runtime polymorphism, override checks your work, pure virtual functions create abstract interfaces, and base classes need virtual destructors. Next module: beginner projects.',
          knowledgeCheck: [
            q('What does a pure virtual function do?', ['It is the fastest function', 'It makes the class abstract so it cannot be instantiated', 'It cannot be overridden', 'It is private'], 1, 'A pure virtual function (= 0) has no implementation in the base and forces derived classes to implement it.'),
            q('Why does a base class need a virtual destructor?', ['For speed', 'So deleting a derived object through a base pointer runs the derived destructor', 'To prevent inheritance', 'To allow copying'], 1, 'Without a virtual destructor, deleting through a base pointer is undefined behaviour and derived cleanup is skipped.')
          ],
          exercises: [
            ex('cpp-m9-l2-e1', 'Polymorphic area', 'write-code', 'Read a radius as a double and print the area of a circle with two decimal places, calling area() through a Shape base pointer.',
              '#include <iostream>\n#include <iomanip>\n#include <memory>\n\nclass Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Circle : public Shape {\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double area() const override { return 3.14159265358979 * radius * radius; }\n};\n\nint main() {\n    double r;\n    // read r, create a Circle via a Shape pointer, print area with 2 decimals\n    return 0;\n}',
              '#include <iostream>\n#include <iomanip>\n#include <memory>\n\nclass Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Circle : public Shape {\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double area() const override { return 3.14159265358979 * radius * radius; }\n};\n\nint main() {\n    double r;\n    std::cin >> r;\n    std::unique_ptr<Shape> s = std::make_unique<Circle>(r);\n    std::cout << std::fixed << std::setprecision(2) << s->area() << std::endl;\n    return 0;\n}',
              'The virtual call s->area() dispatches to Circle::area at runtime.',
              'O(1)', [tc('circle radius 1', '1\n', '3.14'), tc('circle radius 2', '2\n', '12.57', true)], h5(
                'Store the Circle in a unique_ptr<Shape> and call area() through it.',
                'Create the Circle with make_unique, then print s->area() with fixed and setprecision(2).',
                'std::unique_ptr<Shape> s = std::make_unique<Circle>(r); std::cout << s->area();',
                'If the area prints 0, check area() is virtual in Shape and overridden in Circle.',
                'Solution: virtual dispatch calls Circle::area. Radius 1 gives 3.14.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m10',
      title: 'Beginner Projects',
      description: 'A number guessing game and a simple calculator with classes.',
      level: 'beginner',
      order: 10,
      lessons: [
        {
          id: 'cpp-m10-l1',
          slug: 'guessing-game',
          title: 'Project: Number Guessing Game',
          objectives: ['Generate random numbers with <random>', 'Build an interactive loop with feedback', 'Structure the game as a class'],
          introduction: 'Time to build something complete. In this project you will write a number guessing game as a class, using the modern <random> library for fair random numbers.',
          concept: 'The modern C++ random library separates the engine from the distribution: std::mt19937 is a high-quality engine seeded from std::random_device, and std::uniform_int_distribution<int> maps its output to a range such as 1 to 100. This is far better than rand() % 100, which has poor low bits and bias. The game itself is a class with a secret number, an attempt count, and a play() method that loops reading guesses, printing "too high" or "too low", until the guess is correct. Structuring the game as a class keeps the state together and makes the logic testable. Input validation matters: if the user types a letter, std::cin enters a failed state, so a robust game checks the stream, clears the error, and discards the bad input before asking again. The same loop-and-feedback pattern appears in many interactive programs.',
          syntax: '#include <random>\nstd::random_device rd;\nstd::mt19937 gen(rd());\nstd::uniform_int_distribution<int> dist(1, 100);\nint secret = dist(gen);',
          analogy: 'The game loop is like a game of "hot or cold": each guess is a step, and the hints tell you whether you are getting warmer.',
          exampleCode: `#include <iostream>
#include <random>

class GuessingGame {
private:
    int secret;
    int attempts = 0;
public:
    GuessingGame() {
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<int> dist(1, 100);
        secret = dist(gen);
    }
    void play() {
        std::cout << "Guess a number from 1 to 100:" << std::endl;
        int guess = 0;
        while (std::cin >> guess) {
            attempts++;
            if (guess == secret) {
                std::cout << "Correct! You won in " << attempts << " attempts." << std::endl;
                return;
            } else if (guess < secret) {
                std::cout << "Too low." << std::endl;
            } else {
                std::cout << "Too high." << std::endl;
            }
        }
    }
};

int main() {
    GuessingGame game;
    game.play();
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Seed an mt19937 engine with random_device.', 'Draw the secret from a uniform distribution over 1 to 100.', 'Loop reading guesses with std::cin.', 'Compare each guess and print a hint.', 'When the guess matches, print the attempt count and return.'],
          commonMistakes: ['Using rand() % 100, which is biased and low quality', 'Seeding with the same value every run', 'Not checking the stream state after bad input'],
          debuggingExercise: {
            prompt: 'This game always picks the same secret number. Fix it.',
            buggyCode: `#include <iostream>
#include <random>

int main() {
    std::mt19937 gen(42);
    std::uniform_int_distribution<int> dist(1, 100);
    std::cout << dist(gen) << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <random>

int main() {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dist(1, 100);
    std::cout << dist(gen) << std::endl;
    return 0;
}`,
            explanation: 'Seeding the engine with a fixed value 42 makes the sequence identical every run. Seeding from std::random_device gives a different seed each time.'
          },
          miniChallenge: 'Add a limit of 10 attempts to the game and print "Game over" when the player runs out.',
          summary: 'You built a complete interactive game as a class, using <random> for fair numbers. The loop-and-feedback pattern is the backbone of interactive programs. Next: the calculator project.',
          knowledgeCheck: [
            q('Why use std::mt19937 and uniform_int_distribution instead of rand() % 100?', ['It is shorter', 'Better randomness quality and no modulo bias', 'It is faster to type', 'rand is removed'], 1, 'mt19937 is a high-quality engine and the distribution maps its output to the range without bias.'),
            q('What does std::random_device do?', ['Generates the same number always', 'Provides a non-deterministic seed for the engine', 'Sorts numbers', 'Prints random numbers'], 1, 'random_device supplies entropy from the operating system to seed the engine differently each run.')
          ],
          exercises: [
            ex('cpp-m10-l1-e1', 'Guess hint', 'write-code', 'Read a secret number and a guess, then print "correct", "too low", or "too high". This is the core comparison logic of the guessing game.',
              '#include <iostream>\n\nint main() {\n    int secret, guess;\n    // read secret and guess, print the hint\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int secret, guess;\n    std::cin >> secret >> guess;\n    if (guess == secret) std::cout << "correct" << std::endl;\n    else if (guess < secret) std::cout << "too low" << std::endl;\n    else std::cout << "too high" << std::endl;\n    return 0;\n}',
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
          id: 'cpp-m10-l2',
          slug: 'calculator-project',
          title: 'Project: Simple Calculator with Classes',
          objectives: ['Parse an operator and two operands', 'Dispatch operations with a class', 'Handle division by zero with exceptions or error values'],
          introduction: 'The second beginner project is a calculator built as a class: read two numbers and an operator, compute the result, and handle errors like division by zero cleanly.',
          concept: 'A calculator class encapsulates the arithmetic: a calculate method takes two doubles and a char operator and returns the result, dispatching with a switch. Division needs a guard: dividing a double by zero gives infinity rather than crashing, but a calculator should still report it as an error, so the method can throw a std::runtime_error or return an error indicator. Splitting the work into a class separates the math from the input and output, making it easy to test each operation. A loop around the interaction turns the calculator into a REPL that keeps accepting expressions until the user enters q, which is the same pattern used by shells and database clients. Reading the operator as a char with std::cin >> op skips whitespace automatically, which avoids the leftover-newline problem that C scanf has with %c. The project shows how a small class with one clear responsibility makes a program easier to extend, for example by adding a power operator later.',
          syntax: 'class Calculator {\npublic:\n    double calculate(double a, char op, double b) {\n        switch (op) {\n            case \'+\': return a + b;\n            case \'/\': if (b == 0) throw std::runtime_error("division by zero");\n                       return a / b;\n            default: throw std::runtime_error("unknown operator");\n        }\n    }\n};',
          analogy: 'A calculator class is like a vending machine for arithmetic: you insert two numbers and press an operator button, and it dispenses the result.',
          exampleCode: `#include <iostream>
#include <stdexcept>

class Calculator {
public:
    double calculate(double a, char op, double b) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/':
                if (b == 0) throw std::runtime_error("division by zero");
                return a / b;
            default: throw std::runtime_error("unknown operator");
        }
    }
};

int main() {
    Calculator calc;
    double a, b;
    char op;
    std::cout << "Enter expression (e.g. 12 + 5): ";
    if (!(std::cin >> a >> op >> b)) {
        std::cout << "Invalid input." << std::endl;
        return 1;
    }
    try {
        std::cout << calc.calculate(a, op, b) << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Error: " << e.what() << std::endl;
    }
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a Calculator class with a calculate method.', 'Dispatch on the operator with a switch.', 'Throw an exception for division by zero and unknown operators.', 'Read a number, an operator, and a number with std::cin.', 'Call calculate inside a try block and print any error.'],
          commonMistakes: ['Forgetting the division-by-zero check', 'Catching exceptions by value instead of by const reference', 'Reading the operator without checking the stream state'],
          debuggingExercise: {
            prompt: 'This calculator crashes on division by zero instead of printing an error. Fix it.',
            buggyCode: `#include <iostream>

int main() {
    double a = 10, b = 0;
    std::cout << a / b << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

int main() {
    double a = 10, b = 0;
    if (b == 0) {
        std::cout << "Error: division by zero." << std::endl;
    } else {
        std::cout << a / b << std::endl;
    }
    return 0;
}`,
            explanation: 'Floating-point division by zero produces infinity instead of crashing, but a calculator should report it as an error. Checking the divisor first gives a clear message.'
          },
          miniChallenge: 'Extend the calculator with a % operator for integers and a loop that keeps calculating until the user enters q.',
          summary: 'You built a calculator as a class that parses an operator, dispatches with switch, and reports errors with exceptions. This completes the beginner level. Next: the STL.',
          knowledgeCheck: [
            q('Why throw an exception for division by zero in a calculator?', ['To crash faster', 'To report the error to the caller, which can handle it cleanly', 'To make the code longer', 'To avoid using if'], 1, 'Exceptions separate error reporting from normal results, and the caller decides how to handle them.'),
            q('How should you catch an exception?', ['By value', 'By const reference', 'By pointer', 'You cannot catch it'], 1, 'Catching by const reference avoids copying and preserves the dynamic type.')
          ],
          exercises: [
            ex('cpp-m10-l2-e1', 'Simple calculator', 'write-code', 'Read two doubles and a character operator (+, -, *, /) on one line, e.g. "12 + 5", and print the result with two decimal places. Assume the divisor is not zero.',
              '#include <iostream>\n#include <iomanip>\n\nint main() {\n    double a, b;\n    char op;\n    // read a op b, print the result with 2 decimals\n    return 0;\n}',
              '#include <iostream>\n#include <iomanip>\n\nint main() {\n    double a, b;\n    char op;\n    std::cin >> a >> op >> b;\n    double result = 0;\n    switch (op) {\n        case \'+\': result = a + b; break;\n        case \'-\': result = a - b; break;\n        case \'*\': result = a * b; break;\n        case \'/\': result = a / b; break;\n    }\n    std::cout << std::fixed << std::setprecision(2) << result << std::endl;\n    return 0;\n}',
              'A switch on the operator computes the result, printed with fixed and setprecision(2).',
              'O(1)', [tc('12 + 5', '12 + 5\n', '17.00'), tc('10 / 4', '10 / 4\n', '2.50', true)], h5(
                'Read a number, an operator character, and a number with std::cin.',
                'Use std::cin >> a >> op >> b then switch on op to compute the result.',
                'switch (op) { case \'+\': result = a + b; break; ... }',
                'If the operator reads as a space, remember >> skips whitespace for char too.',
                'Solution: switch on op to compute result; print with fixed and setprecision(2). 12 + 5 gives 17.00.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m11',
      title: 'STL',
      description: 'The Standard Template Library: containers, strings, and utilities.',
      level: 'intermediate',
      order: 11,
      lessons: [
        {
          id: 'cpp-m11-l1',
          slug: 'stl-containers',
          title: 'STL Containers: vector, map, set, and More',
          objectives: ['Choose between vector, deque, list, map, set, and unordered_map', 'Use map and unordered_map for key-value data', 'Explain container complexity guarantees'],
          introduction: 'The STL provides ready-made containers for every common need. This lesson tours the main containers, their performance guarantees, and how to choose between them.',
          concept: 'The STL containers fall into three families. Sequence containers store elements in order: std::vector is a dynamic array with fast random access and amortized constant-time push_back, std::deque allows fast insertion at both ends, and std::list is a doubly linked list with constant-time insertion anywhere but no random access. Associative containers keep elements sorted: std::map stores key-value pairs in a balanced tree with logarithmic lookup, and std::set stores unique sorted keys. Unordered containers use hash tables: std::unordered_map gives average constant-time lookup but no ordering. The rule of thumb is to start with std::vector, use std::map when you need sorted keys, and std::unordered_map when you need fast lookup without order. All containers share a common interface style: size, empty, begin, end, and insert, which makes switching containers easy. Elements are value types by default, so containers copy them, and storing large objects by value can be expensive.',
          syntax: 'std::vector<int> v = {1, 2, 3};\nstd::map<std::string, int> scores;\nscores["Ada"] = 95;\nstd::set<int> unique = {1, 2, 2, 3}; // {1, 2, 3}\nstd::unordered_map<std::string, int> ages;',
          analogy: 'Containers are like storage furniture: a vector is a bookshelf (fast to reach any book), a map is a filing cabinet (sorted by label), and an unordered_map is a set of labelled bins (fast to find, no order).',
          exampleCode: `#include <iostream>
#include <map>
#include <set>
#include <string>

int main() {
    std::map<std::string, int> scores;
    scores["Ada"] = 95;
    scores["Grace"] = 98;
    scores["Alan"] = 87;
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << std::endl;
    }
    std::set<int> unique = {3, 1, 2, 2, 3};
    std::cout << "Unique count: " << unique.size() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a map from names to scores.', 'Insert three entries with operator[].', 'Iterate with a structured binding to print each pair in sorted order.', 'Create a set from values with duplicates.', 'The set keeps only unique values, so its size is 3.'],
          commonMistakes: ['Using operator[] on a map to look up a key, which silently inserts a default entry', 'Assuming unordered_map iterates in insertion order', 'Using std::list when a vector would be faster due to cache locality'],
          debuggingExercise: {
            prompt: 'This program prints 0 for a missing key instead of reporting it missing. Fix it.',
            buggyCode: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> scores;
    scores["Ada"] = 95;
    std::cout << scores["Bob"] << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> scores;
    scores["Ada"] = 95;
    auto it = scores.find("Bob");
    if (it == scores.end()) {
        std::cout << "not found" << std::endl;
    } else {
        std::cout << it->second << std::endl;
    }
    return 0;
}`,
            explanation: 'operator[] inserts a default-constructed value (0) for a missing key. find returns end() when the key is absent, which is the correct way to test for presence.'
          },
          miniChallenge: 'Write a program that counts word frequencies in a sentence using std::map, then prints each word and its count.',
          summary: 'Start with vector, use map for sorted keys, unordered_map for fast lookup, and set for unique values. Use find to test for a key without inserting. Next: iterators.',
          knowledgeCheck: [
            q('Which container gives average constant-time lookup by key?', ['std::vector', 'std::map', 'std::unordered_map', 'std::list'], 2, 'unordered_map is a hash table with average O(1) lookup, at the cost of ordering.'),
            q('What does map["Bob"] do when "Bob" is not in the map?', ['Throws', 'Inserts "Bob" with a default value and returns it', 'Returns nullptr', 'Crashes'], 1, 'operator[] inserts a default-constructed value for a missing key; use find to test without inserting.')
          ],
          exercises: [
            ex('cpp-m11-l1-e1', 'Word count with map', 'write-code', 'Read n, then n words, and print the number of distinct words. Use std::set to collect them.',
              '#include <iostream>\n#include <set>\n#include <string>\n\nint main() {\n    int n;\n    // read n words, print the count of distinct words\n    return 0;\n}',
              '#include <iostream>\n#include <set>\n#include <string>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::set<std::string> words;\n    for (int i = 0; i < n; i++) {\n        std::string w;\n        std::cin >> w;\n        words.insert(w);\n    }\n    std::cout << words.size() << std::endl;\n    return 0;\n}',
              'A set keeps only unique values, so its size is the distinct word count.',
              'O(n log n)', [tc('distinct words', '5\ncat dog cat bird dog\n', '3'), tc('all same', '3\nx x x\n', '1', true)], h5(
                'A std::set stores each value only once.',
                'Insert every word into a set, then print the set size.',
                'std::set<std::string> words; for (...) { std::string w; std::cin >> w; words.insert(w); } std::cout << words.size();',
                'If the count equals n, the words were not inserted into the set.',
                'Solution: insert all words into a set and print its size. cat, dog, cat, bird, dog has 3 distinct words.'))
          ]
        },
        {
          id: 'cpp-m11-l2',
          slug: 'stl-utilities',
          title: 'STL Utilities: pair, tuple, optional, and variant',
          objectives: ['Use std::pair and std::tuple for grouped values', 'Use std::optional for values that may be absent', 'Use std::variant for type-safe unions'],
          introduction: 'Not every value fits in a single variable. This lesson covers the STL utilities for grouping values, representing absence, and holding one of several types safely.',
          concept: 'std::pair groups two values of possibly different types, as in std::pair<std::string, int>{"Ada", 95};, with .first and .second members, and std::make_pair builds one. std::tuple generalizes this to any number of values, accessed with std::get<0>(t), and structured bindings, auto [name, score] = pair;, unpack them cleanly. std::optional<T> represents a value that may be absent: it holds a T or nothing, and you test it with has_value() or by using it in a boolean context, then access the value with *opt or .value(). This is far safer than returning a magic number like -1 for "not found". std::variant<Types...> holds one of several types at a time, like a type-safe union, and std::visit applies a visitor to whichever type is active. std::any holds any type but loses type safety, so it is rarely used. These utilities make function return types expressive: a function can return an optional result instead of a magic value.',
          syntax: 'std::pair<std::string, int> p = {"Ada", 95};\nstd::optional<int> maybe = std::nullopt;\nif (maybe) { std::cout << *maybe << std::endl; }\nstd::tuple<int, std::string, double> t = {1, "x", 2.5};',
          analogy: 'std::optional is like a gift box that may be empty: you check whether there is something inside before you open it, instead of assuming.',
          exampleCode: `#include <iostream>
#include <optional>
#include <string>
#include <vector>

std::optional<int> find_index(const std::vector<int>& v, int target) {
    for (size_t i = 0; i < v.size(); i++) {
        if (v[i] == target) return static_cast<int>(i);
    }
    return std::nullopt;
}

int main() {
    std::vector<int> v = {10, 20, 30};
    auto idx = find_index(v, 20);
    if (idx) {
        std::cout << "Found at " << *idx << std::endl;
    } else {
        std::cout << "Not found" << std::endl;
    }
    auto missing = find_index(v, 99);
    std::cout << "Found 99: " << std::boolalpha << missing.has_value() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define find_index to return an optional index.', 'Return the index when the target is found.', 'Return nullopt when it is not found.', 'Check the result with if (idx) and dereference to get the value.', 'Show that a missing value gives has_value() == false.'],
          commonMistakes: ['Dereferencing an empty optional, which is undefined behaviour', 'Using -1 as a magic "not found" value instead of optional', 'Forgetting that variant requires std::visit or std::get to access the value'],
          debuggingExercise: {
            prompt: 'This program crashes when the value is missing. Fix it.',
            buggyCode: `#include <iostream>
#include <optional>

int main() {
    std::optional<int> maybe = std::nullopt;
    std::cout << *maybe << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <optional>

int main() {
    std::optional<int> maybe = std::nullopt;
    if (maybe) {
        std::cout << *maybe << std::endl;
    } else {
        std::cout << "no value" << std::endl;
    }
    return 0;
}`,
            explanation: 'Dereferencing an empty optional is undefined behaviour. Always check has_value() or use it in a boolean context first.'
          },
          miniChallenge: 'Write a function that returns std::optional<std::string> for a user lookup by id, returning nullopt when the id is unknown.',
          summary: 'pair and tuple group values, optional represents absence safely, and variant holds one of several types. Prefer optional over magic values. Next module: iterators.',
          knowledgeCheck: [
            q('What should a function return when a lookup may fail?', ['-1', 'std::optional<T> with nullopt on failure', '0', 'An exception always'], 1, 'optional expresses "a value or nothing" in the type system, so callers must check.'),
            q('How do you test whether an optional has a value?', ['Compare with -1', 'Use has_value() or test it in a boolean context', 'Call .size()', 'It always has a value'], 1, 'An optional converts to bool and has has_value(); dereferencing an empty optional is undefined behaviour.')
          ],
          exercises: [
            ex('cpp-m11-l2-e1', 'Optional lookup', 'write-code', 'Read n, then n integers, then a target value. Print the index of the first occurrence of the target, or -1 if it is absent. (This models a function returning std::optional<int>.)',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    // read n numbers and a target, print the first index or -1\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    for (int i = 0; i < n; i++) std::cin >> v[i];\n    int target;\n    std::cin >> target;\n    int found = -1;\n    for (int i = 0; i < n; i++) {\n        if (v[i] == target) { found = i; break; }\n    }\n    std::cout << found << std::endl;\n    return 0;\n}',
              'A linear scan finds the first matching index; -1 means the target was absent.',
              'O(n)', [tc('find 30', '3\n10 20 30\n30\n', '2'), tc('not found', '3\n10 20 30\n99\n', '-1', true)], h5(
                'Scan the vector from the start and stop at the first match.',
                'Loop i from 0, and when v[i] == target, record i and break.',
                'int found = -1; for (int i = 0; i < n; i++) if (v[i] == target) { found = i; break; }',
                'If the last occurrence is returned instead of the first, you forgot to break.',
                'Solution: scan and break at the first match; print -1 when absent. 30 is at index 2.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m12',
      title: 'Iterators',
      description: 'Iterator categories, begin/end, and writing iterator-based code.',
      level: 'intermediate',
      order: 12,
      lessons: [
        {
          id: 'cpp-m12-l1',
          slug: 'iterator-basics',
          title: 'Iterators: begin, end, and Traversal',
          objectives: ['Use begin() and end() to traverse containers', 'Explain iterator categories', 'Write loops with explicit iterators'],
          introduction: 'Iterators are the glue between containers and algorithms: they point at elements and move through them. This lesson covers how iterators work and why the STL is built on them.',
          concept: 'An iterator is an object that points to an element in a container and can be advanced with ++ and dereferenced with *. Every container provides begin(), an iterator to the first element, and end(), an iterator one past the last element, which must never be dereferenced. The standard loop pattern is for (auto it = v.begin(); it != v.end(); ++it), and range-based for is syntactic sugar over exactly this loop. Iterators come in categories: input and output iterators move forward once, forward iterators can be used repeatedly, bidirectional iterators also move backwards with --, and random-access iterators support arithmetic like it + 3 and it[2]. Vector iterators are random-access, while list iterators are bidirectional, which is why std::sort works on vectors but not on lists. Iterator invalidation matters: inserting into a vector can move its elements and invalidate all iterators, while inserting into a list invalidates none. const_iterator prevents modification, and reverse iterators from rbegin() traverse backwards.',
          syntax: 'for (auto it = v.begin(); it != v.end(); ++it) {\n    std::cout << *it << std::endl;\n}\nauto it = std::find(v.begin(), v.end(), 42);',
          analogy: 'An iterator is like a bookmark that can move through a book: it points at one page at a time, and you turn the pages with ++.',
          exampleCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9};
    auto it = std::find(v.begin(), v.end(), 8);
    if (it != v.end()) {
        std::cout << "Found 8 at position " << (it - v.begin()) << std::endl;
    }
    std::cout << "Reverse: ";
    for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
        std::cout << *rit << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a vector of five numbers.', 'Use std::find with begin and end to locate 8.', 'Check the result against end() before dereferencing.', 'Compute the position by subtracting begin() from the iterator.', 'Traverse backwards with reverse iterators.'],
          commonMistakes: ['Dereferencing end()', 'Using an iterator after the container was modified', 'Assuming all iterators support arithmetic'],
          debuggingExercise: {
            prompt: 'This program crashes. Fix it.',
            buggyCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    auto it = v.end();
    std::cout << *it << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v = {1, 2, 3};
    auto it = v.end();
    if (it != v.begin()) {
        --it;
        std::cout << *it << std::endl;
    }
    return 0;
}`,
            explanation: 'end() points one past the last element and must never be dereferenced. Decrementing it first gives the last element, 3.'
          },
          miniChallenge: 'Write a program that erases all even numbers from a vector using the erase-remove idiom, and explain why a raw loop would be error-prone.',
          summary: 'Iterators generalize pointers for containers; begin and end delimit the range, and categories describe what each iterator can do. Never dereference end(). Next: iterator adaptors.',
          knowledgeCheck: [
            q('What does v.end() point to?', ['The last element', 'One past the last element', 'The first element', 'Nothing'], 1, 'end() is one past the last element; it is a sentinel for comparison, not a dereferenceable position.'),
            q('Which container has random-access iterators?', ['std::list', 'std::vector', 'std::map', 'std::set'], 1, 'Vector iterators support arithmetic; list iterators are only bidirectional.')
          ],
          exercises: [
            ex('cpp-m12-l1-e1', 'Find with iterators', 'write-code', 'Read n, then n integers, then a target. Print the index of the first occurrence of the target, or -1 if absent. Use std::find with begin() and end().',
              '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    int n;\n    // read n numbers and a target, print the index or -1\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    for (int i = 0; i < n; i++) std::cin >> v[i];\n    int target;\n    std::cin >> target;\n    auto it = std::find(v.begin(), v.end(), target);\n    if (it == v.end()) std::cout << -1 << std::endl;\n    else std::cout << (it - v.begin()) << std::endl;\n    return 0;\n}',
              'std::find returns an iterator to the match or end(); subtracting begin() gives the index.',
              'O(n)', [tc('find 30', '3\n10 20 30\n30\n', '2'), tc('not found', '3\n10 20 30\n99\n', '-1', true)], h5(
                'std::find takes begin() and end() and returns an iterator to the match.',
                'Compare the result with v.end(); if equal print -1, else print it - v.begin().',
                'auto it = std::find(v.begin(), v.end(), target); if (it == v.end()) ... else std::cout << (it - v.begin());',
                'If the index is wrong, check you subtracted v.begin() and not v.end().',
                'Solution: std::find gives the iterator; it - v.begin() is the index. 30 is at index 2.'))
          ]
        },
        {
          id: 'cpp-m12-l2',
          slug: 'iterator-adaptors',
          title: 'Iterator Adaptors: insert, stream, and reverse',
          objectives: ['Use back_inserter and front_inserter', 'Use stream iterators for I/O', 'Use reverse iterators'],
          introduction: 'Iterator adaptors turn one kind of iterator into another: inserting into a container, reading from a stream, or walking backwards. This lesson covers the adaptors that make algorithms flexible.',
          concept: 'An iterator adaptor wraps an iterator and changes its behaviour. std::back_inserter(v) creates an output iterator that calls push_back on assignment, so std::copy(src.begin(), src.end(), std::back_inserter(dst)) appends all elements to dst without pre-sizing it. std::front_inserter does the same with push_front for deques and lists. std::istream_iterator<int> reads values from a stream, and the default-constructed one acts as the end sentinel, so std::vector<int> v((std::istream_iterator<int>(std::cin)), std::istream_iterator<int>()); reads all ints from stdin. std::ostream_iterator<int> writes values to a stream with a delimiter, which makes printing a container a one-liner. Reverse iterators from rbegin() and rend() traverse a container backwards, and std::reverse_iterator adapts any bidirectional iterator. Adaptors compose with algorithms, which is the real power: the same std::copy works with vectors, streams, and inserters, and the same code can target a file, a container, or the console.',
          syntax: 'std::copy(src.begin(), src.end(), std::back_inserter(dst));\nstd::vector<int> v((std::istream_iterator<int>(std::cin)), std::istream_iterator<int>());\nstd::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, " "));',
          analogy: 'A back_inserter is like a funnel: you pour elements in one end and they land neatly appended to the container at the other.',
          exampleCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    std::vector<int> src = {1, 2, 3};
    std::vector<int> dst;
    std::copy(src.begin(), src.end(), std::back_inserter(dst));
    std::cout << "Copied: ";
    std::copy(dst.begin(), dst.end(), std::ostream_iterator<int>(std::cout, " "));
    std::cout << std::endl;
    std::cout << "Reversed: ";
    for (auto it = dst.rbegin(); it != dst.rend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a source vector with 1, 2, 3.', 'Copy it into an empty destination with back_inserter.', 'Print the destination with an ostream_iterator.', 'Traverse the destination backwards with reverse iterators.', 'Print the reversed values.'],
          commonMistakes: ['Using std::copy into a destination that is too small, which is undefined behaviour', 'Forgetting the extra parentheses around istream_iterator construction, which the compiler parses as a function declaration', 'Using back_inserter on a container without push_back'],
          debuggingExercise: {
            prompt: 'This program writes out of bounds. Fix it.',
            buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> src = {1, 2, 3, 4, 5};
    std::vector<int> dst(3);
    std::copy(src.begin(), src.end(), dst.begin());
    for (int x : dst) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

int main() {
    std::vector<int> src = {1, 2, 3, 4, 5};
    std::vector<int> dst;
    std::copy(src.begin(), src.end(), std::back_inserter(dst));
    for (int x : dst) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
            explanation: 'dst had room for 3 elements but the copy wrote 5, which is undefined behaviour. back_inserter grows the destination as needed.'
          },
          miniChallenge: 'Read all integers from stdin into a vector using istream_iterator, sort it, and print it with ostream_iterator.',
          summary: 'Iterator adaptors let algorithms write to containers, streams, and reversed ranges. back_inserter grows the destination safely. Next module: algorithms.',
          knowledgeCheck: [
            q('What does std::back_inserter(v) do?', ['Returns the last element', 'Creates an output iterator that push_backs into v', 'Reverses v', 'Sorts v'], 1, 'back_inserter adapts push_back into an output iterator, so algorithms can append safely.'),
            q('Why is std::copy into a too-small vector dangerous?', ['It is slow', 'It writes past the end, which is undefined behaviour', 'It throws always', 'It sorts the vector'], 1, 'copy trusts the destination to have room; without it, it writes out of bounds.')
          ],
          exercises: [
            ex('cpp-m12-l2-e1', 'Copy and reverse', 'write-code', 'Read n, then n integers, and print them in reverse order separated by spaces on one line. Use reverse iterators.',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    // read n numbers, print them in reverse\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    for (int i = 0; i < n; i++) std::cin >> v[i];\n    for (auto it = v.rbegin(); it != v.rend(); ++it) {\n        if (it != v.rbegin()) std::cout << " ";\n        std::cout << *it;\n    }\n    std::cout << std::endl;\n    return 0;\n}',
              'Reverse iterators from rbegin() to rend() visit the elements backwards.',
              'O(n)', [tc('reverse 1..5', '5\n1 2 3 4 5\n', '5 4 3 2 1'), tc('reverse one', '1\n7\n', '7', true)], h5(
                'Reverse iterators start at the last element and move backwards.',
                'Loop from v.rbegin() to v.rend(), printing each element with a space separator.',
                'for (auto it = v.rbegin(); it != v.rend(); ++it) std::cout << *it;',
                'Watch the spacing: print a space before each element except the first.',
                'Solution: iterate with reverse iterators. Input 1 2 3 4 5 prints "5 4 3 2 1".'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m13',
      title: 'Algorithms',
      description: 'The <algorithm> header: sorting, searching, transforming, and numeric algorithms.',
      level: 'intermediate',
      order: 13,
      lessons: [
        {
          id: 'cpp-m13-l1',
          slug: 'sorting-searching',
          title: 'Sorting and Searching with <algorithm>',
          objectives: ['Sort ranges with std::sort', 'Search with std::find and std::binary_search', 'Use custom comparators'],
          introduction: 'The <algorithm> header provides fast, tested implementations of sorting and searching. This lesson covers std::sort, std::find, std::binary_search, and custom comparators.',
          concept: 'std::sort(begin, end) sorts a range in O(n log n) time using introsort, a hybrid of quicksort, heapsort, and insertion sort. It requires random-access iterators, so it works on vectors, arrays, and deques, but not on lists, which have their own sort method. A comparator customizes the order: std::sort(v.begin(), v.end(), std::greater<int>()) sorts descending, and a lambda can sort by any criterion, such as string length. std::find searches linearly and returns an iterator to the first match or end(), while std::binary_search requires a sorted range and runs in O(log n). std::lower_bound and std::upper_bound find insertion points in sorted ranges, which is how you maintain a sorted container. std::min_element and std::max_element find the smallest and largest elements. Algorithms never change the container\'s size; they rearrange or read elements, and they work on any range given by two iterators.',
          syntax: 'std::sort(v.begin(), v.end());\nstd::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });\nauto it = std::find(v.begin(), v.end(), 42);\nbool present = std::binary_search(v.begin(), v.end(), 42);',
          analogy: 'std::sort is like a professional librarian: you hand over a pile of books and get them back in perfect order, without having to sort them yourself.',
          exampleCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9};
    std::sort(v.begin(), v.end());
    std::cout << "Sorted: ";
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
    std::cout << "Has 8: " << std::boolalpha
              << std::binary_search(v.begin(), v.end(), 8) << std::endl;
    std::vector<std::string> words = {"banana", "apple", "cherry"};
    std::sort(words.begin(), words.end(),
              [](const std::string& a, const std::string& b) {
                  return a.size() < b.size();
              });
    std::cout << "Shortest first: " << words[0] << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Sort the vector ascending with std::sort.', 'Print the sorted values.', 'Use binary_search to test for 8 in the sorted range.', 'Sort words by length with a lambda comparator.', 'Print the shortest word, "apple".'],
          commonMistakes: ['Calling binary_search on an unsorted range', 'Calling std::sort on a list, which lacks random-access iterators', 'Forgetting that sort invalidates no iterators but reorders elements'],
          debuggingExercise: {
            prompt: 'This program says 8 is not present even though it is in the vector. Fix it.',
            buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9};
    std::cout << std::binary_search(v.begin(), v.end(), 8) << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9};
    std::sort(v.begin(), v.end());
    std::cout << std::binary_search(v.begin(), v.end(), 8) << std::endl;
    return 0;
}`,
            explanation: 'binary_search requires a sorted range; on an unsorted range its result is meaningless. Sorting first makes the search correct.'
          },
          miniChallenge: 'Write a program that reads n numbers, sorts them, and prints the median.',
          summary: 'std::sort orders ranges in O(n log n), binary_search needs a sorted range, and lambdas customize ordering. Next: transforming and numeric algorithms.',
          knowledgeCheck: [
            q('What is the complexity of std::sort?', ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], 1, 'std::sort uses introsort, which is O(n log n) on average and in the worst case.'),
            q('What does std::binary_search require?', ['A sorted range', 'A vector only', 'Unique elements', 'A lambda'], 0, 'Binary search only works on sorted ranges; on unsorted input its result is meaningless.')
          ],
          exercises: [
            ex('cpp-m13-l1-e1', 'Sort and print', 'write-code', 'Read n, then n integers, sort them ascending with std::sort, and print them separated by spaces on one line.',
              '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    int n;\n    // read n numbers, sort, print separated by spaces\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    for (int i = 0; i < n; i++) std::cin >> v[i];\n    std::sort(v.begin(), v.end());\n    for (int i = 0; i < n; i++) {\n        if (i > 0) std::cout << " ";\n        std::cout << v[i];\n    }\n    std::cout << std::endl;\n    return 0;\n}',
              'std::sort orders the vector; printing with separators gives the sorted list.',
              'O(n log n)', [tc('sort 5 numbers', '5\n5 2 8 1 9\n', '1 2 5 8 9'), tc('sort one', '1\n7\n', '7', true)], h5(
                'std::sort orders a range from begin() to end().',
                'Read the numbers, call std::sort(v.begin(), v.end()), then print them.',
                'std::sort(v.begin(), v.end()); for (...) std::cout << v[i];',
                'Watch the spacing: print a space before each element except the first.',
                'Solution: sort then print. Input 5 2 8 1 9 gives "1 2 5 8 9".'))
          ]
        },
        {
          id: 'cpp-m13-l2',
          slug: 'transform-numeric',
          title: 'Transform, Accumulate, and Numeric Algorithms',
          objectives: ['Transform ranges with std::transform', 'Accumulate values with std::accumulate', 'Use std::count_if and other predicates'],
          introduction: 'Many loops are just "do something to every element" or "combine all elements into one value". This lesson covers the algorithms that replace those loops: transform, accumulate, count_if, and more.',
          concept: 'std::transform applies a function to every element of a range and writes the results elsewhere, as in std::transform(v.begin(), v.end(), out.begin(), [](int x) { return x * x; });, which squares every element. std::accumulate from <numeric> combines a range into a single value, starting from an initial value: std::accumulate(v.begin(), v.end(), 0) sums the elements, and a custom binary operation can compute a product or a maximum. std::count_if counts elements satisfying a predicate, std::all_of, std::any_of, and std::none_of test whether a predicate holds for all, any, or no elements, and std::for_each applies a function to every element for its side effects. std::remove_if moves unwanted elements to the end and returns the new logical end; you must call erase to actually remove them, which is the erase-remove idiom. These algorithms express intent directly: reading std::accumulate tells you the code sums a range, while a hand-written loop could be doing anything. They also compose with lambdas and are often faster than naive loops because the library is heavily optimized.',
          syntax: 'std::transform(v.begin(), v.end(), v.begin(), [](int x) { return x * 2; });\nint sum = std::accumulate(v.begin(), v.end(), 0);\nint evens = std::count_if(v.begin(), v.end(), [](int x) { return x % 2 == 0; });\nv.erase(std::remove_if(v.begin(), v.end(), [](int x) { return x < 0; }), v.end());',
          analogy: 'std::transform is like a factory line: each item passes through the same machine and comes out changed, without you handling each one by hand.',
          exampleCode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::transform(v.begin(), v.end(), v.begin(),
                   [](int x) { return x * x; });
    std::cout << "Squares: ";
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
    int sum = std::accumulate(v.begin(), v.end(), 0);
    std::cout << "Sum of squares: " << sum << std::endl;
    int evens = std::count_if(v.begin(), v.end(),
                              [](int x) { return x % 2 == 0; });
    std::cout << "Evens: " << evens << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Square every element in place with transform.', 'Print the squares: 1 4 9 16 25.', 'Sum them with accumulate to get 55.', 'Count the even squares with count_if, getting 2.', 'Print the results.'],
          commonMistakes: ['Using std::remove without erase, which leaves the elements in place', 'Forgetting the initial value of accumulate, which sets the result type', 'Passing an output range that is too small to transform'],
          debuggingExercise: {
            prompt: 'This program still prints the negative numbers. Fix it.',
            buggyCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {1, -2, 3, -4, 5};
    std::remove_if(v.begin(), v.end(), [](int x) { return x < 0; });
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {1, -2, 3, -4, 5};
    v.erase(std::remove_if(v.begin(), v.end(), [](int x) { return x < 0; }), v.end());
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
            explanation: 'remove_if only moves unwanted elements to the end and returns the new logical end; the vector size is unchanged. Erasing from that iterator to end() actually removes them.'
          },
          miniChallenge: 'Use std::accumulate with a lambda to compute the product of all numbers in a vector.',
          summary: 'transform maps, accumulate folds, count_if counts, and remove_if plus erase deletes. Algorithms express intent and replace error-prone loops. Next module: memory management.',
          knowledgeCheck: [
            q('What does std::accumulate do?', ['Sorts a range', 'Combines all elements into a single value using an operation', 'Copies a range', 'Reverses a range'], 1, 'accumulate folds a range into one value, such as a sum or product, starting from an initial value.'),
            q('Why does std::remove_if need erase afterwards?', ['It is slow', 'remove_if only moves elements to the end; erase actually removes them', 'It throws', 'It sorts the vector'], 1, 'Algorithms cannot change a container\'s size, so remove_if returns the new logical end and erase does the removal.')
          ],
          exercises: [
            ex('cpp-m13-l2-e1', 'Sum of squares', 'write-code', 'Read n, then n integers, and print the sum of their squares. Use std::accumulate with a lambda or a transform plus accumulate.',
              '#include <iostream>\n#include <vector>\n#include <numeric>\n\nint main() {\n    int n;\n    // read n numbers, print the sum of their squares\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n#include <numeric>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    for (int i = 0; i < n; i++) std::cin >> v[i];\n    int sum = std::accumulate(v.begin(), v.end(), 0,\n        [](int total, int x) { return total + x * x; });\n    std::cout << sum << std::endl;\n    return 0;\n}',
              'accumulate with a lambda adds x * x for each element.',
              'O(n)', [tc('squares of 1,2,3', '3\n1 2 3\n', '14'), tc('squares of 4', '1\n4\n', '16', true)], h5(
                'accumulate can add the square of each element instead of the element itself.',
                'Use std::accumulate with a lambda that returns total + x * x.',
                'int sum = std::accumulate(v.begin(), v.end(), 0, [](int total, int x) { return total + x * x; });',
                'If the answer is the plain sum, the lambda is adding x instead of x * x.',
                'Solution: accumulate with [](int total, int x) { return total + x * x; }. 1, 2, 3 gives 14.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m14',
      title: 'Memory Management',
      description: 'Smart pointers, RAII, and the rule of five.',
      level: 'intermediate',
      order: 14,
      lessons: [
        {
          id: 'cpp-m14-l1',
          slug: 'smart-pointers',
          title: 'Smart Pointers: unique_ptr and shared_ptr',
          objectives: ['Use std::unique_ptr for exclusive ownership', 'Use std::shared_ptr for shared ownership', 'Explain when to use each'],
          introduction: 'Smart pointers manage heap memory automatically: they delete what they own when they go out of scope. This lesson covers unique_ptr for exclusive ownership and shared_ptr for shared ownership.',
          concept: 'std::unique_ptr owns an object exclusively and deletes it when the unique_ptr is destroyed or reset. It cannot be copied, only moved, which enforces single ownership at compile time. Create one with std::make_unique<T>(args), which is safer than new because it cannot leak if an exception is thrown during construction. std::shared_ptr allows several owners: it keeps a reference count, and the object is deleted when the last shared_ptr is destroyed. It is created with std::make_shared<T>(args) and copied freely. shared_ptr has a cost: the control block and atomic reference counting, so prefer unique_ptr by default and use shared_ptr only when ownership is genuinely shared. std::weak_ptr is a non-owning observer of a shared_ptr that can be locked to get a temporary shared_ptr; it breaks reference cycles, where two objects hold shared_ptrs to each other and never get deleted. Smart pointers are the modern answer to manual new and delete.',
          syntax: 'auto p = std::make_unique<int>(42);\nstd::cout << *p << std::endl; // p deleted automatically\nauto s = std::make_shared<std::string>("hello");\nauto s2 = s; // reference count is now 2\nstd::weak_ptr<std::string> w = s;',
          analogy: 'A unique_ptr is like a car with one key: whoever holds the key owns the car, and returning the key (going out of scope) parks it. A shared_ptr is like a library book with a sign-out sheet: it is returned when the last borrower brings it back.',
          exampleCode: `#include <iostream>
#include <memory>
#include <string>

class Widget {
public:
    Widget(const std::string& n) : name(n) {
        std::cout << "Widget " << name << " created." << std::endl;
    }
    ~Widget() {
        std::cout << "Widget " << name << " destroyed." << std::endl;
    }
private:
    std::string name;
};

int main() {
    auto w = std::make_unique<Widget>("Alpha");
    {
        auto shared = std::make_shared<Widget>("Beta");
        std::cout << "Beta use count: " << shared.use_count() << std::endl;
        auto copy = shared;
        std::cout << "Beta use count: " << shared.use_count() << std::endl;
    }
    std::cout << "End of main." << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a unique_ptr to a Widget named Alpha.', 'Create a shared_ptr to a Widget named Beta in a nested scope.', 'Copy the shared_ptr and watch the use count rise from 1 to 2.', 'When the scope ends, Beta is destroyed.', 'When main ends, Alpha is destroyed automatically.'],
          commonMistakes: ['Using new with unique_ptr instead of make_unique', 'Creating two shared_ptrs from the same raw pointer, which double-frees', 'Creating a reference cycle with shared_ptr and never using weak_ptr'],
          debuggingExercise: {
            prompt: 'This program double-frees. Fix it.',
            buggyCode: `#include <iostream>
#include <memory>

int main() {
    int* raw = new int(42);
    std::shared_ptr<int> a(raw);
    std::shared_ptr<int> b(raw);
    std::cout << *a << " " << *b << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <memory>

int main() {
    auto a = std::make_shared<int>(42);
    auto b = a;
    std::cout << *a << " " << *b << std::endl;
    return 0;
}`,
            explanation: 'Two shared_ptrs from the same raw pointer each think they own it, so both try to delete it. make_shared creates one control block, and copying shares it correctly.'
          },
          miniChallenge: 'Write a function that returns a unique_ptr to a vector of the first n square numbers.',
          summary: 'unique_ptr enforces single ownership, shared_ptr shares ownership with a reference count, and weak_ptr breaks cycles. Prefer make_unique and make_shared. Next: the rule of five.',
          knowledgeCheck: [
            q('Can a std::unique_ptr be copied?', ['Yes', 'No, it can only be moved', 'Only for ints', 'Only in C++20'], 1, 'unique_ptr enforces exclusive ownership, so copying is deleted and only moving is allowed.'),
            q('What does std::weak_ptr do?', ['Owns an object', 'Observes a shared_ptr without owning, breaking reference cycles', 'Deletes objects', 'Copies shared_ptrs'], 1, 'weak_ptr does not affect the reference count and can be locked to get a temporary shared_ptr.')
          ],
          exercises: [
            ex('cpp-m14-l1-e1', 'Unique pointer value', 'write-code', 'Read an integer and print it, storing it in a std::unique_ptr<int> created with std::make_unique.',
              '#include <iostream>\n#include <memory>\n\nint main() {\n    int n;\n    // read n into a unique_ptr and print it\n    return 0;\n}',
              '#include <iostream>\n#include <memory>\n\nint main() {\n    int n;\n    std::cin >> n;\n    auto p = std::make_unique<int>(n);\n    std::cout << *p << std::endl;\n    return 0;\n}',
              'make_unique allocates the int on the heap; dereferencing prints its value.',
              'O(1)', [tc('value 42', '42\n', '42'), tc('value -3', '-3\n', '-3', true)], h5(
                'std::make_unique<int>(n) creates a unique_ptr holding n.',
                'Create auto p = std::make_unique<int>(n); then print *p.',
                'auto p = std::make_unique<int>(n); std::cout << *p << std::endl;',
                'If the address prints instead of the value, you forgot to dereference with *p.',
                'Solution: auto p = std::make_unique<int>(n); std::cout << *p. Input 42 gives 42.'))
          ]
        },
        {
          id: 'cpp-m14-l2',
          slug: 'rule-of-five',
          title: 'The Rule of Five and Copy Semantics',
          objectives: ['Explain the rule of three and five', 'Write a copy constructor and copy assignment', 'Write a move constructor and move assignment'],
          introduction: 'When a class manages a resource, the compiler-generated copy operations may be wrong. This lesson covers the rule of five: destructor, copy constructor, copy assignment, move constructor, and move assignment.',
          concept: 'The compiler generates a destructor, copy constructor, copy assignment operator, move constructor, and move assignment operator for every class, and for simple classes these are correct. But when a class owns a resource, such as heap memory, the default copy copies the pointer, not the data, so two objects end up owning the same memory and both try to delete it. The rule of three says that if you need a custom destructor, copy constructor, or copy assignment, you probably need all three. The rule of five extends this to the move operations. The copy constructor creates a new object as a deep copy of another, the copy assignment replaces an existing object with a deep copy and must handle self-assignment, the move constructor steals the resources of a temporary, and the move assignment does the same for an existing object. The modern guidance is the rule of zero: prefer std::string, std::vector, and smart pointers so the compiler-generated operations are correct and you write none of these yourself.',
          syntax: 'class Buffer {\npublic:\n    Buffer(const Buffer& other);            // copy constructor\n    Buffer& operator=(const Buffer& other); // copy assignment\n    Buffer(Buffer&& other) noexcept;        // move constructor\n    Buffer& operator=(Buffer&& other) noexcept; // move assignment\n    ~Buffer();\n};',
          analogy: 'Copying a class with a raw pointer is like photocopying a house key: now two people think they own the same house, and both try to sell it.',
          exampleCode: `#include <iostream>
#include <cstring>

class MyString {
private:
    char* data;
    size_t len;
public:
    MyString(const char* s) : len(std::strlen(s)) {
        data = new char[len + 1];
        std::strcpy(data, s);
    }
    MyString(const MyString& other) : len(other.len) {
        data = new char[len + 1];
        std::strcpy(data, other.data);
    }
    MyString& operator=(const MyString& other) {
        if (this != &other) {
            delete[] data;
            len = other.len;
            data = new char[len + 1];
            std::strcpy(data, other.data);
        }
        return *this;
    }
    ~MyString() { delete[] data; }
    const char* c_str() const { return data; }
};

int main() {
    MyString a("hello");
    MyString b = a;
    std::cout << b.c_str() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define MyString with a raw char pointer.', 'The constructor allocates and copies the string.', 'The copy constructor performs a deep copy.', 'Copy assignment checks for self-assignment, frees the old buffer, and deep-copies.', 'The destructor frees the buffer. Copying a gives b its own memory.'],
          commonMistakes: ['Forgetting the self-assignment check in copy assignment', 'Forgetting to free the old resource in copy assignment', 'Writing a copy constructor but no copy assignment, or vice versa'],
          debuggingExercise: {
            prompt: 'This program double-frees. What is missing?',
            buggyCode: `#include <iostream>
#include <cstring>

class MyString {
private:
    char* data;
public:
    MyString(const char* s) {
        data = new char[std::strlen(s) + 1];
        std::strcpy(data, s);
    }
    ~MyString() { delete[] data; }
    const char* c_str() const { return data; }
};

int main() {
    MyString a("hello");
    MyString b = a;
    std::cout << b.c_str() << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <cstring>

class MyString {
private:
    char* data;
public:
    MyString(const char* s) {
        data = new char[std::strlen(s) + 1];
        std::strcpy(data, s);
    }
    MyString(const MyString& other) {
        data = new char[std::strlen(other.data) + 1];
        std::strcpy(data, other.data);
    }
    MyString& operator=(const MyString& other) {
        if (this != &other) {
            delete[] data;
            data = new char[std::strlen(other.data) + 1];
            std::strcpy(data, other.data);
        }
        return *this;
    }
    ~MyString() { delete[] data; }
    const char* c_str() const { return data; }
};

int main() {
    MyString a("hello");
    MyString b = a;
    std::cout << b.c_str() << std::endl;
    return 0;
}`,
            explanation: 'The class defined a destructor but no copy operations, so the compiler-generated copy copied the pointer and both objects deleted the same memory. A deep-copy copy constructor and assignment fix it.'
          },
          miniChallenge: 'Add a move constructor and move assignment to MyString, and verify with a program that moves a string into a new variable.',
          summary: 'The rule of five says that a custom destructor, copy, or move operation usually means you need all five. The rule of zero says to prefer managed types so you need none. Next module: modern C++.',
          knowledgeCheck: [
            q('What is the rule of three?', ['Three classes per file', 'If you define a destructor, copy constructor, or copy assignment, you likely need all three', 'Three parameters maximum', 'Three inheritance levels'], 1, 'These three operations manage the same resource, so customizing one usually means customizing all three.'),
            q('What is the rule of zero?', ['Never write classes', 'Prefer managed types like std::string and std::vector so the compiler-generated operations are correct', 'Zero destructors', 'Zero constructors'], 1, 'Using RAII types means the default copy and move operations are correct and no custom ones are needed.')
          ],
          exercises: [
            ex('cpp-m14-l2-e1', 'Copy a vector', 'write-code', 'Read n, then n integers into a vector, copy the vector into a second vector, and print the sum of the copy. (Copying a vector performs a deep copy.)',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    // read n numbers, copy the vector, print the sum of the copy\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    for (int i = 0; i < n; i++) std::cin >> v[i];\n    std::vector<int> copy = v;\n    int sum = 0;\n    for (int x : copy) sum += x;\n    std::cout << sum << std::endl;\n    return 0;\n}',
              'Copying a vector duplicates its elements; summing the copy gives the same total.',
              'O(n)', [tc('sum of copy', '3\n1 2 3\n', '6'), tc('copy one', '1\n9\n', '9', true)], h5(
                'Copying a vector with = creates an independent deep copy.',
                'Create std::vector<int> copy = v; then sum the copy with a range-based for loop.',
                'std::vector<int> copy = v; int sum = 0; for (int x : copy) sum += x;',
                'If the sum is 0, check the copy was made after the vector was filled.',
                'Solution: copy the vector and sum the copy. 1, 2, 3 gives 6.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m15',
      title: 'Modern C++',
      description: 'C++11/14/17/20 features: auto, ranged for, constexpr, structured bindings, and more.',
      level: 'intermediate',
      order: 15,
      lessons: [
        {
          id: 'cpp-m15-l1',
          slug: 'modern-cpp-features',
          title: 'Modern C++: auto, constexpr, and Structured Bindings',
          objectives: ['Use auto and decltype effectively', 'Write constexpr functions', 'Unpack values with structured bindings'],
          introduction: 'Modern C++ (C++11 and later) added features that make code shorter and safer. This lesson covers auto, constexpr, structured bindings, and the other conveniences of the modern language.',
          concept: 'C++11 introduced auto for type deduction, range-based for, lambdas, smart pointers, and move semantics, and later standards kept adding. constexpr marks a function or variable that can be evaluated at compile time, so constexpr int square(int x) { return x * x; } can be used in array sizes and template arguments when called with constants, and it still works at runtime for other inputs. Structured bindings, from C++17, unpack a pair, tuple, or struct into named variables: auto [name, score] = get_result(); is far clearer than .first and .second. The if with initializer, if (auto it = map.find(key); it != map.end()), limits a variable to the scope of the if, which prevents accidental reuse. nullptr replaces NULL and 0 for null pointers, and it has its own type, std::nullptr_t, so overloads resolve correctly. The [[nodiscard]] attribute warns when a return value is ignored, and std::string_view from C++17 provides a non-owning view of a string without copying it.',
          syntax: 'constexpr int square(int x) { return x * x; }\nconstexpr int s = square(5); // 25 at compile time\nauto [name, score] = std::make_pair("Ada", 95);\nif (auto it = scores.find("Ada"); it != scores.end()) { /* use it */ }',
          analogy: 'Structured bindings are like unpacking a suitcase: instead of reaching in for each item by position, you lay everything out with a name at once.',
          exampleCode: `#include <iostream>
#include <map>
#include <string>

constexpr int square(int x) { return x * x; }

int main() {
    constexpr int s = square(5);
    std::cout << "Square of 5: " << s << std::endl;
    std::map<std::string, int> scores = {{"Ada", 95}, {"Grace", 98}};
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << std::endl;
    }
    if (auto it = scores.find("Ada"); it != scores.end()) {
        std::cout << "Found Ada: " << it->second << std::endl;
    }
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a constexpr square function.', 'Evaluate it at compile time into s.', 'Iterate a map with structured bindings.', 'Use an if with an initializer to find Ada safely.', 'Print the results.'],
          commonMistakes: ['Using auto& where auto is needed and accidentally modifying the original', 'Writing constexpr functions that call non-constexpr code', 'Using structured bindings on a type that does not support them'],
          debuggingExercise: {
            prompt: 'This program fails to compile. Fix it.',
            buggyCode: `#include <iostream>

constexpr int square(int x) {
    int y = x;
    y = y * y;
    return y;
}

int main() {
    constexpr int s = square(5);
    std::cout << s << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

constexpr int square(int x) {
    return x * x;
}

int main() {
    constexpr int s = square(5);
    std::cout << s << std::endl;
    return 0;
}`,
            explanation: 'In C++11, constexpr functions were restricted to a single return statement; later standards relaxed this, but the simplest fix is to write the function as a single return expression, which works in every standard.'
          },
          miniChallenge: 'Write a constexpr function that computes the factorial of n at compile time and use it to size an array.',
          summary: 'Modern C++ features like constexpr, structured bindings, and if with initializer make code shorter and safer. Prefer them over the old spellings. Next: move semantics in depth.',
          knowledgeCheck: [
            q('What does constexpr mean for a function?', ['It runs faster always', 'It can be evaluated at compile time when called with constants', 'It cannot take parameters', 'It is private'], 1, 'A constexpr function may be evaluated at compile time, and it still works at runtime for other inputs.'),
            q('What do structured bindings do?', ['Sort a container', 'Unpack a pair, tuple, or struct into named variables', 'Create a new struct', 'Bind a reference'], 1, 'auto [a, b] = pair; gives names to the elements of an aggregate.')
          ],
          exercises: [
            ex('cpp-m15-l1-e1', 'Constexpr square', 'write-code', 'Read an integer and print its square. Use a constexpr function square for the computation.',
              '#include <iostream>\n\nconstexpr int square(int x) { return x * x; }\n\nint main() {\n    int n;\n    // read n, print square(n)\n    return 0;\n}',
              '#include <iostream>\n\nconstexpr int square(int x) { return x * x; }\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::cout << square(n) << std::endl;\n    return 0;\n}',
              'A constexpr function computes the square and works at runtime for input values.',
              'O(1)', [tc('square of 7', '7\n', '49'), tc('square of -4', '-4\n', '16', true)], h5(
                'A constexpr function can be called with runtime values too.',
                'Read n and print square(n).',
                'std::cout << square(n) << std::endl;',
                'If the result is n itself, check square returns x * x and not x.',
                'Solution: constexpr int square(int x) { return x * x; } Input 7 gives 49.'))
          ]
        },
        {
          id: 'cpp-m15-l2',
          slug: 'string-view-and-attributes',
          title: 'string_view, [[nodiscard]], and Other Modern Idioms',
          objectives: ['Use std::string_view for non-owning string access', 'Apply [[nodiscard]] to important return values', 'Use if with initializer and other C++17 idioms'],
          introduction: 'C++17 added string_view, a lightweight window into string data that never copies, and attributes like [[nodiscard]] that catch mistakes at compile time. This lesson covers these and other modern idioms.',
          concept: 'std::string_view is a non-owning view of a sequence of characters: it holds a pointer and a length, so constructing one is cheap and it never allocates. It is ideal for function parameters that only read a string, as in void print(std::string_view s), because it accepts std::string, string literals, and substrings without copying. The view does not own the data, so the underlying string must outlive it, and string_view is not null-terminated, so passing it to a C function expecting a char* is wrong. [[nodiscard]] on a function tells the compiler to warn when the caller ignores the return value, which is perfect for functions like empty() or find() whose result is the whole point. The [[maybe_unused]] attribute silences warnings for intentionally unused parameters. std::string_view and [[nodiscard]] are small features, but they remove whole classes of bugs and unnecessary copies.',
          syntax: '#include <string_view>\nvoid print(std::string_view s) { std::cout << s << std::endl; }\n[[nodiscard]] bool is_empty(const std::string& s) { return s.empty(); }',
          analogy: 'A string_view is like looking through a window at a painting: you can see it clearly, but you do not own it and you cannot take it home.',
          exampleCode: `#include <iostream>
#include <string>
#include <string_view>

[[nodiscard]] bool starts_with(std::string_view s, std::string_view prefix) {
    return s.substr(0, prefix.size()) == prefix;
}

int main() {
    std::string greeting = "Hello, world!";
    std::cout << std::boolalpha << starts_with(greeting, "Hello") << std::endl;
    std::cout << std::boolalpha << starts_with(greeting, "Goodbye") << std::endl;
    std::string_view view = greeting;
    std::cout << "View: " << view.substr(0, 5) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define starts_with taking string_views, so no copies are made.', 'Call it with a std::string and a literal; both convert to string_view.', 'Print true for "Hello" and false for "Goodbye".', 'Create a string_view of the greeting.', 'Print a substring of the view.'],
          commonMistakes: ['Storing a string_view beyond the lifetime of the underlying string', 'Passing a string_view to a C function expecting a null-terminated string', 'Ignoring a [[nodiscard]] return value'],
          debuggingExercise: {
            prompt: 'This program prints garbage. Fix it.',
            buggyCode: `#include <iostream>
#include <string>
#include <string_view>

std::string_view make_view() {
    std::string s = "hello";
    return s;
}

int main() {
    std::cout << make_view() << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <string>
#include <string_view>

std::string make_value() {
    return "hello";
}

int main() {
    std::cout << make_value() << std::endl;
    return 0;
}`,
            explanation: 'The string_view pointed at a local string that was destroyed when make_view returned, leaving a dangling view. Returning the string by value keeps the data alive.'
          },
          miniChallenge: 'Write a function that takes a std::string_view and returns true if it contains only digits, using std::all_of.',
          summary: 'string_view reads strings without copying but never owns the data; [[nodiscard]] catches ignored results. Both are cheap, safe habits. Next module: move semantics.',
          knowledgeCheck: [
            q('What is std::string_view?', ['A string that owns its data', 'A non-owning view of character data, with a pointer and a length', 'A string that is always empty', 'A C-style string'], 1, 'string_view is a lightweight, non-owning window into existing character data.'),
            q('What does [[nodiscard]] do?', ['Makes a function faster', 'Warns when the caller ignores the return value', 'Deletes the function', 'Makes the function private'], 1, '[[nodiscard]] asks the compiler to warn if the return value is discarded.')
          ],
          exercises: [
            ex('cpp-m15-l2-e1', 'Prefix check', 'write-code', 'Read two words: a word and a prefix. Print "true" if the word starts with the prefix, otherwise print "false". Use a function taking std::string_view.',
              '#include <iostream>\n#include <string>\n#include <string_view>\n\nbool starts_with(std::string_view s, std::string_view prefix) {\n    return s.size() >= prefix.size() && s.substr(0, prefix.size()) == prefix;\n}\n\nint main() {\n    std::string word, prefix;\n    // read word and prefix, print true or false\n    return 0;\n}',
              '#include <iostream>\n#include <string>\n#include <string_view>\n\nbool starts_with(std::string_view s, std::string_view prefix) {\n    return s.size() >= prefix.size() && s.substr(0, prefix.size()) == prefix;\n}\n\nint main() {\n    std::string word, prefix;\n    std::cin >> word >> prefix;\n    std::cout << std::boolalpha << starts_with(word, prefix) << std::endl;\n    return 0;\n}',
              'The word starts with the prefix when its first prefix.size() characters equal the prefix.',
              'O(n)', [tc('hello starts with he', 'hello he\n', 'true'), tc('hello starts with hi', 'hello hi\n', 'false', true)], h5(
                'Compare the first characters of the word with the prefix.',
                'Use s.substr(0, prefix.size()) == prefix, guarded by a size check.',
                'std::cout << std::boolalpha << starts_with(word, prefix) << std::endl;',
                'If a short word matches a long prefix, check the size guard comes first.',
                'Solution: compare the leading substring with the prefix. "hello" starts with "he" but not "hi".'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m16',
      title: 'Move Semantics',
      description: 'Rvalue references, std::move, and perfect forwarding.',
      level: 'intermediate',
      order: 16,
      lessons: [
        {
          id: 'cpp-m16-l1',
          slug: 'rvalues-and-move',
          title: 'Rvalue References and std::move',
          objectives: ['Distinguish lvalues from rvalues', 'Write a move constructor', 'Use std::move correctly'],
          introduction: 'Move semantics lets C++ transfer resources from temporaries instead of copying them, which makes returning large objects cheap. This lesson explains lvalues, rvalues, and std::move.',
          concept: 'An lvalue is an expression with a persistent address, like a named variable, while an rvalue is a temporary, like the result of a function call or a literal. An rvalue reference, written T&&, binds to rvalues, and a move constructor takes one: MyString(MyString&& other) steals the other object\'s pointer and leaves it in a valid but empty state. std::move is a cast that turns an lvalue into an rvalue reference, signalling that the object may be moved from; it does not move anything by itself. After a move, the source object is in a valid but unspecified state, so you should only destroy it or assign to it. Moving is what makes returning a std::vector from a function cheap: the vector\'s heap buffer is transferred, not copied. The compiler also performs copy elision, constructing the return value directly in the caller\'s storage, which is even better than moving.',
          syntax: 'std::vector<int> make() { return {1, 2, 3}; }\nstd::vector<int> v = make(); // moved or elided\nstd::string a = "hello";\nstd::string b = std::move(a); // a is now empty (valid but unspecified)',
          analogy: 'Copying is like photocopying a document; moving is like handing the original to someone else. The original owner no longer has it, but nothing was duplicated.',
          exampleCode: `#include <iostream>
#include <vector>
#include <string>

std::vector<int> make_squares(int n) {
    std::vector<int> v;
    for (int i = 1; i <= n; i++) v.push_back(i * i);
    return v;
}

int main() {
    std::vector<int> v = make_squares(5);
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
    std::string a = "hello";
    std::string b = std::move(a);
    std::cout << "b = " << b << ", a is now \"" << a << "\"" << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['make_squares builds a vector and returns it.', 'The return is moved or elided, so no copy happens.', 'Print the squares 1 4 9 16 25.', 'Move the string a into b with std::move.', 'Print b and the now-empty a.'],
          commonMistakes: ['Using std::move on a const object, which silently copies instead', 'Using a moved-from object as if it still held its value', 'Writing std::move everywhere, which can prevent copy elision'],
          debuggingExercise: {
            prompt: 'This code copies instead of moving. Fix it.',
            buggyCode: `#include <iostream>
#include <string>

void take(std::string s) {
    std::cout << s << std::endl;
}

int main() {
    const std::string name = "Ada";
    take(std::move(name));
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <string>

void take(std::string s) {
    std::cout << s << std::endl;
}

int main() {
    std::string name = "Ada";
    take(std::move(name));
    return 0;
}`,
            explanation: 'std::move on a const object produces a const rvalue reference, which binds to the copy constructor instead of the move constructor. Removing const lets the move happen.'
          },
          miniChallenge: 'Write a class with a move constructor that prints a message, and observe when it runs versus the copy constructor.',
          summary: 'Rvalue references bind to temporaries, move constructors steal resources, and std::move marks an object as movable. Do not use moved-from objects except to destroy or reassign them. Next: perfect forwarding.',
          knowledgeCheck: [
            q('What does std::move do?', ['It moves an object immediately', 'It casts an lvalue to an rvalue reference, allowing a move', 'It copies an object', 'It deletes an object'], 1, 'std::move is a cast; the actual move happens in the move constructor or move assignment that receives the result.'),
            q('What state is a moved-from object in?', ['Destroyed', 'Valid but unspecified', 'Unchanged', 'Always empty'], 1, 'A moved-from object is valid but its value is unspecified; only destroy it or assign to it.')
          ],
          exercises: [
            ex('cpp-m16-l1-e1', 'Move a vector', 'write-code', 'Read n, then n integers into a vector, move the vector into a second vector with std::move, and print the sum of the second vector.',
              '#include <iostream>\n#include <vector>\n#include <utility>\n\nint main() {\n    int n;\n    // read n numbers, move the vector, print the sum of the moved-to vector\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n#include <utility>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    for (int i = 0; i < n; i++) std::cin >> v[i];\n    std::vector<int> moved = std::move(v);\n    int sum = 0;\n    for (int x : moved) sum += x;\n    std::cout << sum << std::endl;\n    return 0;\n}',
              'std::move transfers the vector\'s buffer to the new vector without copying.',
              'O(n)', [tc('sum after move', '3\n1 2 3\n', '6'), tc('move one', '1\n9\n', '9', true)], h5(
                'std::move transfers ownership of the vector\'s storage.',
                'Create std::vector<int> moved = std::move(v); then sum moved.',
                'std::vector<int> moved = std::move(v); int sum = 0; for (int x : moved) sum += x;',
                'If the sum is 0, check the vector was filled before the move.',
                'Solution: move the vector and sum the destination. 1, 2, 3 gives 6.'))
          ]
        },
        {
          id: 'cpp-m16-l2',
          slug: 'perfect-forwarding',
          title: 'Perfect Forwarding and Universal References',
          objectives: ['Explain forwarding references', 'Use std::forward to preserve value category', 'Write a factory function with perfect forwarding'],
          introduction: 'Perfect forwarding passes arguments to another function while preserving whether they were lvalues or rvalues. This lesson covers forwarding references, std::forward, and the factory pattern that uses them.',
          concept: 'In a template, a parameter written T&& is a forwarding reference, not an rvalue reference: it binds to both lvalues and rvalues, and T deduces to an lvalue reference for lvalues and a plain type for rvalues. Inside the function, the parameter itself is an lvalue, so passing it on directly would always copy; std::forward<T>(arg) restores the original value category, forwarding lvalues as lvalues and rvalues as rvalues. This is how std::make_unique and std::make_shared forward constructor arguments, and how emplace_back constructs an element in place from its arguments without an extra copy or move. A factory function template<typename T, typename... Args> std::unique_ptr<T> make(Args&&... args) { return std::make_unique<T>(std::forward<Args>(args)...); } is the canonical example. Perfect forwarding is an advanced technique, but understanding it explains why emplace is faster than push_back for complex objects and how the standard library avoids unnecessary copies.',
          syntax: 'template <typename T, typename... Args>\nstd::unique_ptr<T> make(Args&&... args) {\n    return std::make_unique<T>(std::forward<Args>(args)...);\n}',
          analogy: 'Perfect forwarding is like a postal service that delivers a parcel exactly as it arrived: fragile items stay fragile, heavy items stay heavy, instead of repacking everything the same way.',
          exampleCode: `#include <iostream>
#include <vector>
#include <string>

class Person {
public:
    std::string name;
    int age;
    Person(std::string n, int a) : name(std::move(n)), age(a) {}
};

int main() {
    std::vector<Person> people;
    people.emplace_back("Ada", 36);
    people.emplace_back("Grace", 85);
    for (const auto& p : people) {
        std::cout << p.name << ", " << p.age << std::endl;
    }
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a Person class with a name and age.', 'Use emplace_back to construct Persons directly inside the vector.', 'No temporary Person is created and copied.', 'Print each person.', 'Note that emplace_back forwards its arguments to the constructor.'],
          commonMistakes: ['Using std::move instead of std::forward in a forwarding function, which always moves', 'Overloading on T&& in a non-template, which is just an rvalue reference', 'Forgetting that a forwarding reference parameter is itself an lvalue inside the function'],
          debuggingExercise: {
            prompt: 'This factory always copies its argument instead of moving it. Fix it.',
            buggyCode: `#include <iostream>
#include <string>
#include <utility>

template <typename T>
void forward_it(T&& value) {
    std::string s = value;
    std::cout << s << std::endl;
}

int main() {
    std::string name = "Ada";
    forward_it(std::move(name));
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <string>
#include <utility>

template <typename T>
void forward_it(T&& value) {
    std::string s = std::forward<T>(value);
    std::cout << s << std::endl;
}

int main() {
    std::string name = "Ada";
    forward_it(std::move(name));
    return 0;
}`,
            explanation: 'Inside the function, value is an lvalue, so assigning it always copies. std::forward<T>(value) restores the rvalue-ness when the caller passed an rvalue, so the string is moved.'
          },
          miniChallenge: 'Write a function template that forwards its argument to a std::vector::emplace_back call and verify it constructs in place.',
          summary: 'Forwarding references bind to anything, and std::forward preserves the original value category. This is how make_unique and emplace_back avoid copies. Next module: templates.',
          knowledgeCheck: [
            q('What is a forwarding reference?', ['An rvalue reference', 'A template parameter T&& that binds to both lvalues and rvalues', 'A const reference', 'A pointer'], 1, 'In a template, T&& deduces to an lvalue reference for lvalues and a plain type for rvalues.'),
            q('Why use std::forward instead of std::move in a forwarding function?', ['It is shorter', 'forward preserves whether the argument was an lvalue or rvalue; move always moves', 'forward is faster', 'move does not work in templates'], 1, 'std::forward<T> restores the original value category, so lvalues are copied and rvalues are moved.')
          ],
          exercises: [
            ex('cpp-m16-l2-e1', 'Emplace into a vector', 'write-code', 'Read n, then n integers, and print their sum. Build the vector with emplace_back instead of push_back.',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    // read n numbers with emplace_back, print their sum\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v;\n    for (int i = 0; i < n; i++) {\n        int x;\n        std::cin >> x;\n        v.emplace_back(x);\n    }\n    int sum = 0;\n    for (int x : v) sum += x;\n    std::cout << sum << std::endl;\n    return 0;\n}',
              'emplace_back constructs each element in place in the vector.',
              'O(n)', [tc('sum 1..5', '5\n1 2 3 4 5\n', '15'), tc('sum one', '1\n7\n', '7', true)], h5(
                'emplace_back adds an element constructed from its arguments.',
                'Read each value and call v.emplace_back(x), then sum the vector.',
                'for (...) { int x; std::cin >> x; v.emplace_back(x); }',
                'If the sum is 0, check the values are read before emplace_back.',
                'Solution: emplace each value, then sum the vector. 1 2 3 4 5 gives 15.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m17',
      title: 'Templates',
      description: 'Function templates, class templates, and template specialization.',
      level: 'intermediate',
      order: 17,
      lessons: [
        {
          id: 'cpp-m17-l1',
          slug: 'function-templates',
          title: 'Function Templates',
          objectives: ['Write function templates', 'Explain template type deduction', 'Use template constraints with concepts'],
          introduction: 'Templates let you write one function that works for many types. This lesson covers function templates, how the compiler deduces types, and how concepts constrain them.',
          concept: 'A function template is a pattern for generating functions: template <typename T> T max_value(T a, T b) { return (a > b) ? a : b; } works for int, double, std::string, and any type supporting >. When you call max_value(3, 5), the compiler deduces T as int and generates that version; calling it with doubles generates another. Templates are instantiated on demand, so only the versions you use are compiled. If the types differ, as in max_value(3, 5.0), deduction fails and you must specify the type explicitly, max_value<double>(3, 5.0). Multiple template parameters are allowed, and non-type parameters like template <int N> let you pass compile-time constants. C++20 concepts constrain templates: template <typename T> requires std::totally_ordered<T> T max_value(T a, T b); rejects types without ordering at the call site with a clear error, instead of a deep template error. The STL is built entirely on templates, which is why std::vector works for any element type.',
          syntax: 'template <typename T>\nT max_value(T a, T b) {\n    return (a > b) ? a : b;\n}\nint m = max_value(3, 5);\ndouble d = max_value(2.5, 3.5);',
          analogy: 'A template is like a cookie cutter: one cutter makes cookies from any dough, and the dough you use decides what the cookie is made of.',
          exampleCode: `#include <iostream>
#include <string>

template <typename T>
T max_value(T a, T b) {
    return (a > b) ? a : b;
}

template <typename T>
void swap_values(T& a, T& b) {
    T temp = std::move(a);
    a = std::move(b);
    b = std::move(temp);
}

int main() {
    std::cout << max_value(3, 5) << std::endl;
    std::cout << max_value(2.5, 3.5) << std::endl;
    std::cout << max_value(std::string("apple"), std::string("banana")) << std::endl;
    int x = 1, y = 2;
    swap_values(x, y);
    std::cout << x << " " << y << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a max_value template that works for any ordered type.', 'Call it with ints, doubles, and strings.', 'Define a swap_values template that moves instead of copying.', 'Swap two ints with it.', 'Print the results.'],
          commonMistakes: ['Calling a template with mixed types and getting a deduction failure', 'Defining a template in a .cpp file and getting linker errors, because templates must be visible where they are used', 'Writing a template that works for ints but fails for a type without the operators it uses'],
          debuggingExercise: {
            prompt: 'This program fails to compile. Fix it.',
            buggyCode: `#include <iostream>

template <typename T>
T max_value(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << max_value(3, 5.0) << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

template <typename T>
T max_value(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << max_value<double>(3, 5.0) << std::endl;
    return 0;
}`,
            explanation: 'Template deduction requires both arguments to have the same type, but 3 is an int and 5.0 is a double. Specifying <double> explicitly converts the int and resolves the call.'
          },
          miniChallenge: 'Write a function template that returns the average of two values of any arithmetic type.',
          summary: 'Function templates generate type-specific functions on demand, with deduction from the arguments. Concepts constrain them with clear errors. Next: class templates.',
          knowledgeCheck: [
            q('What happens when you call a function template?', ['It runs at runtime for any type', 'The compiler generates a version for the deduced types', 'It is interpreted', 'It always copies'], 1, 'Templates are instantiated at compile time for each set of deduced argument types.'),
            q('Why must templates usually be defined in headers?', ['For speed', 'The compiler needs the full definition to instantiate them where they are used', 'It is a style rule', 'They cannot be compiled'], 1, 'Template instantiation happens at the call site, so the definition must be visible there.')
          ],
          exercises: [
            ex('cpp-m17-l1-e1', 'Template maximum', 'write-code', 'Read two integers and print the larger one, using a function template max_value<T> that works for any ordered type.',
              '#include <iostream>\n\ntemplate <typename T>\nT max_value(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nint main() {\n    int a, b;\n    // read a and b, print max_value(a, b)\n    return 0;\n}',
              '#include <iostream>\n\ntemplate <typename T>\nT max_value(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    std::cout << max_value(a, b) << std::endl;\n    return 0;\n}',
              'The template deduces T as int and returns the larger value.',
              'O(1)', [tc('max of 3 and 9', '3 9\n', '9'), tc('max of 10 and 2', '10 2\n', '10', true)], h5(
                'A function template works for any type that supports >.',
                'Call max_value(a, b) and print the result; T is deduced as int.',
                'std::cout << max_value(a, b) << std::endl;',
                'If the smaller value prints, check the ternary returns a when a > b.',
                'Solution: max_value(a, b) with T deduced as int. Input 3 9 gives 9.'))
          ]
        },
        {
          id: 'cpp-m17-l2',
          slug: 'class-templates',
          title: 'Class Templates and Specialization',
          objectives: ['Write class templates', 'Use template specialization', 'Explain how std::vector is a class template'],
          introduction: 'Class templates let you define a container or utility that works for any element type. This lesson covers class templates, specialization, and how the STL builds on them.',
          concept: 'A class template is a pattern for generating classes: template <typename T> class Box { T value; }; generates Box<int>, Box<std::string>, and so on, each a distinct type. Member functions of a class template are themselves templates and are only instantiated when used, which is why a template class can have a member that would not compile for some types, as long as you never call it for those types. Template specialization provides a different implementation for a specific type: template <> class Box<bool> can store bits packed together, which is exactly what std::vector<bool> does. Partial specialization matches a pattern, such as all pointer types, template <typename T> class Box<T*>. Class template argument deduction, from C++17, lets the compiler deduce the type from the constructor arguments, so std::pair p = {1, 2.5}; deduces pair<int, double>. The STL containers are all class templates, which is why one std::vector implementation serves every element type.',
          syntax: 'template <typename T>\nclass Box {\nprivate:\n    T value;\npublic:\n    Box(T v) : value(v) {}\n    T get() const { return value; }\n};\nBox<int> b(42);',
          analogy: 'A class template is like a blueprint for a warehouse: the same blueprint builds a warehouse for books, for shoes, or for electronics, depending on what you store in it.',
          exampleCode: `#include <iostream>
#include <string>

template <typename T>
class Box {
private:
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
    void set(T v) { value = v; }
};

int main() {
    Box<int> int_box(42);
    Box<std::string> str_box("hello");
    std::cout << int_box.get() << std::endl;
    std::cout << str_box.get() << std::endl;
    str_box.set("world");
    std::cout << str_box.get() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a Box class template holding a value of type T.', 'Create a Box<int> holding 42.', 'Create a Box<std::string> holding "hello".', 'Print both values.', 'Change the string box to "world" and print it.'],
          commonMistakes: ['Forgetting that Box<int> and Box<double> are unrelated types', 'Defining a class template member in a .cpp file and getting linker errors', 'Assuming template code is compiled when the template is defined, rather than when it is used'],
          debuggingExercise: {
            prompt: 'This program fails to compile with "Box is not a type". Fix it.',
            buggyCode: `#include <iostream>

template <typename T>
class Box {
private:
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
};

int main() {
    Box b(42);
    std::cout << b.get() << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

template <typename T>
class Box {
private:
    T value;
public:
    Box(T v) : value(v) {}
    T get() const { return value; }
};

int main() {
    Box<int> b(42);
    std::cout << b.get() << std::endl;
    return 0;
}`,
            explanation: 'Box without template arguments is not a type; the compiler needs Box<int> to know which instantiation to create. (C++17 deduction guides can infer it, but explicit arguments are clearer here.)'
          },
          miniChallenge: 'Write a class template Stack with push, pop, and top methods, backed by a std::vector<T>.',
          summary: 'Class templates generate types on demand; specialization customizes them for specific types. The STL containers are the canonical examples. Next module: exceptions.',
          knowledgeCheck: [
            q('Are Box<int> and Box<double> the same type?', ['Yes', 'No, each template instantiation is a distinct type', 'Only if the values are equal', 'They are the same class'], 1, 'Each instantiation of a class template is a separate, unrelated type.'),
            q('What is template specialization?', ['A faster template', 'A different implementation for a specific type or pattern', 'A template with no parameters', 'A private template'], 1, 'Specialization lets you provide a custom implementation for a particular type, like std::vector<bool>.')
          ],
          exercises: [
            ex('cpp-m17-l2-e1', 'Template box', 'write-code', 'Read an integer and print it, storing it in a Box<int> class template with a get() method.',
              '#include <iostream>\n\ntemplate <typename T>\nclass Box {\nprivate:\n    T value;\npublic:\n    Box(T v) : value(v) {}\n    T get() const { return value; }\n};\n\nint main() {\n    int n;\n    // read n, store it in Box<int>, print get()\n    return 0;\n}',
              '#include <iostream>\n\ntemplate <typename T>\nclass Box {\nprivate:\n    T value;\npublic:\n    Box(T v) : value(v) {}\n    T get() const { return value; }\n};\n\nint main() {\n    int n;\n    std::cin >> n;\n    Box<int> b(n);\n    std::cout << b.get() << std::endl;\n    return 0;\n}',
              'Box<int> stores the value and get() returns it.',
              'O(1)', [tc('box 42', '42\n', '42'), tc('box -7', '-7\n', '-7', true)], h5(
                'A class template is instantiated with a concrete type like Box<int>.',
                'Read n, create Box<int> b(n), and print b.get().',
                'Box<int> b(n); std::cout << b.get() << std::endl;',
                'If the compiler says Box is not a type, add <int> after Box.',
                'Solution: Box<int> b(n); std::cout << b.get(); Input 42 gives 42.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m18',
      title: 'Exceptions',
      description: 'Throwing, catching, exception safety, and the standard exception hierarchy.',
      level: 'intermediate',
      order: 18,
      lessons: [
        {
          id: 'cpp-m18-l1',
          slug: 'throw-catch',
          title: 'Throwing and Catching Exceptions',
          objectives: ['Throw exceptions with throw', 'Catch by const reference', 'Use the standard exception hierarchy'],
          introduction: 'Exceptions separate error handling from normal logic: code throws when something goes wrong, and a caller catches it where it can be handled. This lesson covers the mechanics and the standard exception types.',
          concept: 'An exception is an object thrown with throw, which unwinds the stack, destroying local objects along the way, until it reaches a matching catch block. Catch handlers are tried in order, and the first whose type matches, including base classes, handles the exception. Always catch by const reference, catch (const std::exception& e), to avoid copying and to preserve the dynamic type. The standard library provides a hierarchy rooted at std::exception, with std::runtime_error for errors detectable only at runtime, std::logic_error for programming mistakes, std::out_of_range for bad indices, and std::invalid_argument for bad arguments. The .what() method returns a message describing the error. Uncaught exceptions call std::terminate and abort the program. Functions can be marked noexcept to promise they never throw, which lets the compiler optimize and is required for move operations to be used in some STL contexts.',
          syntax: 'throw std::runtime_error("division by zero");\ntry {\n    risky();\n} catch (const std::runtime_error& e) {\n    std::cout << e.what() << std::endl;\n} catch (const std::exception& e) {\n    std::cout << "Other: " << e.what() << std::endl;\n}',
          analogy: 'Throwing an exception is like pulling a fire alarm: the normal work stops immediately, and the response team (the catch block) takes over.',
          exampleCode: `#include <iostream>
#include <stdexcept>
#include <vector>

int get_element(const std::vector<int>& v, size_t index) {
    if (index >= v.size()) {
        throw std::out_of_range("index out of range");
    }
    return v[index];
}

int main() {
    std::vector<int> v = {10, 20, 30};
    try {
        std::cout << get_element(v, 5) << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }
    std::cout << "Program continues." << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define get_element to throw out_of_range for a bad index.', 'Call it with index 5 on a three-element vector.', 'The exception unwinds to the catch block.', 'Print the error message from what().', 'The program continues after the catch.'],
          commonMistakes: ['Catching by value, which slices the exception', 'Catching std::exception before a more specific type, so the specific handler never runs', 'Throwing from a destructor, which terminates the program during unwinding'],
          debuggingExercise: {
            prompt: 'This program catches the wrong handler. Fix it.',
            buggyCode: `#include <iostream>
#include <stdexcept>

int main() {
    try {
        throw std::out_of_range("bad index");
    } catch (const std::exception& e) {
        std::cout << "general" << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "out of range" << std::endl;
    }
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <stdexcept>

int main() {
    try {
        throw std::out_of_range("bad index");
    } catch (const std::out_of_range& e) {
        std::cout << "out of range" << std::endl;
    } catch (const std::exception& e) {
        std::cout << "general" << std::endl;
    }
    return 0;
}`,
            explanation: 'Catch handlers are tried in order, and std::exception matches every standard exception, so it must come last. The most specific handler goes first.'
          },
          miniChallenge: 'Write a function that throws std::invalid_argument for a negative age, and catch it in main to print the error.',
          summary: 'Exceptions unwind the stack to the first matching catch; catch by const reference, most specific first, and use the standard hierarchy. Next: exception safety guarantees.',
          knowledgeCheck: [
            q('How should you catch an exception?', ['By value', 'By const reference', 'By pointer', 'You cannot catch it'], 1, 'Catching by const reference avoids copying and preserves the dynamic type.'),
            q('What happens to local objects during stack unwinding?', ['They leak', 'Their destructors run, which is why RAII works', 'They are copied', 'Nothing'], 1, 'Stack unwinding destroys local objects, so RAII cleanup happens automatically even when an exception is thrown.')
          ],
          exercises: [
            ex('cpp-m18-l1-e1', 'Validate a divisor', 'write-code', 'Read two integers a and b. If b is zero, print "error". Otherwise print a / b using integer division. (In real code this would throw; here you report the error.)',
              '#include <iostream>\n\nint main() {\n    int a, b;\n    // read a and b; print "error" if b == 0, else a / b\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    if (b == 0) {\n        std::cout << "error" << std::endl;\n    } else {\n        std::cout << a / b << std::endl;\n    }\n    return 0;\n}',
              'Checking the divisor before dividing prevents a crash and reports the error.',
              'O(1)', [tc('10 / 2', '10 2\n', '5'), tc('divide by zero', '10 0\n', 'error', true)], h5(
                'Division by zero must be checked before the division runs.',
                'If b is 0 print "error", otherwise print a / b.',
                'if (b == 0) std::cout << "error"; else std::cout << a / b;',
                'If the program crashes on zero, the check is missing or after the division.',
                'Solution: check b == 0 before dividing. 10 / 2 gives 5 and 10 / 0 prints "error".'))
          ]
        },
        {
          id: 'cpp-m18-l2',
          slug: 'exception-safety',
          title: 'Exception Safety and RAII',
          objectives: ['Explain the three exception safety guarantees', 'Write exception-safe code with RAII', 'Use noexcept correctly'],
          introduction: 'Exception safety is about what happens to your objects when an exception is thrown: do they stay valid, unchanged, or broken? This lesson covers the three guarantees and the RAII techniques that provide them.',
          concept: 'There are three exception safety guarantees. The basic guarantee says that no resources leak and objects remain in a valid, if changed, state. The strong guarantee says the operation either succeeds completely or leaves everything unchanged, as if it never happened. The nothrow guarantee says the operation never throws. The key technique is RAII: resources are owned by objects whose destructors clean up during unwinding, so the basic guarantee comes almost for free. The strong guarantee is often achieved with copy-and-swap: work on a copy, then swap it in with a nothrow operation. A function that allocates memory with new and then throws before deleting it leaks, but the same code using std::unique_ptr or std::vector does not. The noexcept specifier promises a function never throws; if it does anyway, std::terminate is called. Move constructors and move assignment should be noexcept so that containers like std::vector can use them safely when growing. Writing exception-safe code is mostly about choosing RAII types and keeping operations simple.',
          syntax: 'class Safe {\npublic:\n    void update(const std::string& s) {\n        std::string copy = s;   // may throw, original untouched\n        data.swap(copy);          // nothrow\n    }\nprivate:\n    std::string data;\n};',
          analogy: 'Exception safety is like a bank transaction: either the whole transfer completes, or nothing changes, and the bank never loses money in between.',
          exampleCode: `#include <iostream>
#include <memory>
#include <stdexcept>

void risky() {
    auto resource = std::make_unique<int>(42);
    std::cout << "Resource: " << *resource << std::endl;
    throw std::runtime_error("something went wrong");
}

int main() {
    try {
        risky();
    } catch (const std::exception& e) {
        std::cout << "Caught: " << e.what() << std::endl;
    }
    std::cout << "No leak: unique_ptr cleaned up during unwinding." << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['risky allocates an int with make_unique.', 'It prints the value, then throws.', 'During unwinding, the unique_ptr destructor frees the int.', 'The catch block prints the error.', 'No leak occurs because RAII handled the cleanup.'],
          commonMistakes: ['Allocating with new and throwing before delete', 'Writing a move constructor that is not noexcept, so vector falls back to copying', 'Catching an exception and swallowing it without handling the error'],
          debuggingExercise: {
            prompt: 'This code leaks when the second allocation throws. Fix it.',
            buggyCode: `#include <iostream>
#include <stdexcept>

void work() {
    int* a = new int(1);
    int* b = new int(2);
    throw std::runtime_error("fail");
    delete a;
    delete b;
}

int main() {
    try { work(); } catch (...) {}
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <memory>
#include <stdexcept>

void work() {
    auto a = std::make_unique<int>(1);
    auto b = std::make_unique<int>(2);
    throw std::runtime_error("fail");
}

int main() {
    try { work(); } catch (...) {}
    return 0;
}`,
            explanation: 'The throw skipped the deletes, leaking both allocations. unique_ptr destructors run during unwinding, so the memory is freed automatically.'
          },
          miniChallenge: 'Rewrite a function that uses new/delete to use unique_ptr instead, and verify it is exception-safe.',
          summary: 'RAII gives the basic guarantee for free, copy-and-swap gives the strong guarantee, and noexcept move operations let containers move safely. Next module: intermediate projects.',
          knowledgeCheck: [
            q('What is the strong exception safety guarantee?', ['The operation never throws', 'The operation either succeeds completely or leaves everything unchanged', 'No resources leak', 'The program never crashes'], 1, 'Strong guarantee means commit-or-rollback: on failure, the state is exactly as before the operation.'),
            q('Why should move constructors be noexcept?', ['For speed only', 'So containers like std::vector can use them safely when growing', 'To prevent copying', 'They must always be noexcept'], 1, 'A vector growing its storage prefers noexcept moves; a throwing move forces it to copy instead.')
          ],
          exercises: [
            ex('cpp-m18-l2-e1', 'Clamp a value', 'write-code', 'Read three integers value, low, and high. Print value clamped into the range [low, high]: if value < low print low, if value > high print high, otherwise print value.',
              '#include <iostream>\n\nint main() {\n    int value, low, high;\n    // read the three numbers, print the clamped value\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int value, low, high;\n    std::cin >> value >> low >> high;\n    if (value < low) std::cout << low << std::endl;\n    else if (value > high) std::cout << high << std::endl;\n    else std::cout << value << std::endl;\n    return 0;\n}',
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
      id: 'cpp-m19',
      title: 'Intermediate Projects',
      description: 'A student records system and a text-based todo list with file persistence.',
      level: 'intermediate',
      order: 19,
      lessons: [
        {
          id: 'cpp-m19-l1',
          slug: 'student-records',
          title: 'Project: Student Records System',
          objectives: ['Model records with a class and std::vector', 'Implement add, search, and list operations', 'Sort records with std::sort and a lambda'],
          introduction: 'This project combines classes, vectors, strings, and sorting into a student records system: add students, list them, search by name, and sort by grade.',
          concept: 'A records system stores a std::vector<Student>, where Student is a class with a name, an id, and a grade. Adding a student pushes it onto the vector, which grows automatically. Searching loops through the vector or uses std::find_if with a lambda that compares names, returning an iterator or an optional index. Sorting by grade uses std::sort with a lambda comparing grades, which is a one-liner compared to the hand-written sort a C program needs. Splitting the program into a Student class and a Records class keeps the data and the operations together: the Records class owns the vector and exposes add, find, sort, and list methods. A menu loop in main reads a choice and dispatches to the right method. This design shows the payoff of the earlier modules: vectors replace manual memory management, strings replace char arrays, and algorithms replace hand-written loops.',
          syntax: 'class Student {\npublic:\n    std::string name;\n    int id;\n    double grade;\n};\nstd::vector<Student> students;\nstudents.push_back({"Ada", 1, 9.5});',
          analogy: 'The records system is like a filing cabinet with labelled drawers: each drawer is a Student object, the vector is the cabinet, and searching is opening drawers until you find the right file.',
          exampleCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

struct Student {
    std::string name;
    int id;
    double grade;
};

int main() {
    std::vector<Student> students = {
        {"Ada", 1, 9.5}, {"Grace", 2, 9.8}, {"Alan", 3, 8.7}
    };
    std::sort(students.begin(), students.end(),
              [](const Student& a, const Student& b) {
                  return a.grade > b.grade;
              });
    for (const auto& s : students) {
        std::cout << s.name << ": " << s.grade << std::endl;
    }
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a Student struct with name, id, and grade.', 'Create a vector of three students.', 'Sort by grade descending with a lambda.', 'Print the students in sorted order: Grace, Ada, Alan.', 'Note how std::sort replaces a hand-written sorting loop.'],
          commonMistakes: ['Sorting by swapping only the grade and not the whole struct', 'Comparing names with == on char arrays instead of std::string', 'Forgetting that std::sort needs a strict weak ordering'],
          debuggingExercise: {
            prompt: 'This search never finds a student that exists. Fix it.',
            buggyCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

struct Student { std::string name; int id; };

int main() {
    std::vector<Student> students = {{"Ada", 1}, {"Grace", 2}};
    auto it = std::find(students.begin(), students.end(), "Grace");
    std::cout << (it == students.end() ? "not found" : "found") << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

struct Student { std::string name; int id; };

int main() {
    std::vector<Student> students = {{"Ada", 1}, {"Grace", 2}};
    auto it = std::find_if(students.begin(), students.end(),
        [](const Student& s) { return s.name == "Grace"; });
    std::cout << (it == students.end() ? "not found" : "found") << std::endl;
    return 0;
}`,
            explanation: 'std::find compares whole Student objects with ==, which does not exist for this struct. std::find_if with a lambda comparing the name field is the correct search.'
          },
          miniChallenge: 'Add a function that prints the student with the highest grade, using std::max_element.',
          summary: 'You built a records system with a Student type, a vector, and std::sort. The same pattern powers address books, inventories, and catalogues. Next: a persistent todo list.',
          knowledgeCheck: [
            q('Why use std::find_if instead of std::find to search by name?', ['It is faster', 'find compares whole objects; find_if takes a predicate that can test one field', 'find cannot search vectors', 'find_if sorts first'], 1, 'find_if accepts a lambda that tests exactly the field you care about.'),
            q('What does std::sort need from its comparator?', ['Nothing', 'A strict weak ordering: it must behave like less-than', 'It must return bool always true', 'It must be a class'], 1, 'The comparator must define a consistent ordering, or sort produces undefined behaviour.')
          ],
          exercises: [
            ex('cpp-m19-l1-e1', 'Average grade', 'write-code', 'Read n, then n grades as doubles, and print their average with two decimal places. Use std::accumulate.',
              '#include <iostream>\n#include <iomanip>\n#include <vector>\n#include <numeric>\n\nint main() {\n    int n;\n    // read n grades, print the average with 2 decimals\n    return 0;\n}',
              '#include <iostream>\n#include <iomanip>\n#include <vector>\n#include <numeric>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<double> grades(n);\n    for (int i = 0; i < n; i++) std::cin >> grades[i];\n    double sum = std::accumulate(grades.begin(), grades.end(), 0.0);\n    std::cout << std::fixed << std::setprecision(2) << sum / n << std::endl;\n    return 0;\n}',
              'accumulate sums the grades; dividing by n gives the average.',
              'O(n)', [tc('average of 3 grades', '3\n9.0 8.0 7.0\n', '8.00'), tc('average of 1', '1\n10.0\n', '10.00', true)], h5(
                'Add all the grades and divide by how many there are.',
                'Read the grades into a vector, sum with std::accumulate, then print sum / n with fixed and setprecision(2).',
                'double sum = std::accumulate(grades.begin(), grades.end(), 0.0); std::cout << sum / n;',
                'If the average is an integer like 8 instead of 8.00, check the format is fixed with setprecision(2).',
                'Solution: sum the grades with accumulate and print sum / n. Grades 9, 8, 7 average 8.00.'))
          ]
        },
        {
          id: 'cpp-m19-l2',
          slug: 'todo-list-file',
          title: 'Project: Todo List with File Persistence',
          objectives: ['Design a todo item class', 'Save and load items with file streams', 'Implement add, complete, and list operations'],
          introduction: 'The second intermediate project is a todo list that saves its items to a file, so tasks survive between runs. It combines classes, vectors, menus, and C++ file streams.',
          concept: 'Persistence means data outlives the process. The todo program keeps its items in a std::vector<Todo>, and on exit it writes each item to a text file with std::ofstream, one per line, with a done flag. On startup it reads the file back with std::ifstream and std::getline, parsing each line to rebuild the vector. A simple text format, such as "0 Buy milk" where 0 means not done, is easy to debug and edit by hand. The menu loop offers add, list, complete, and quit, and each command is a small method on a TodoList class. Saving after every change is simpler and safer than saving only at exit, because a crash would otherwise lose work. C++ file streams are RAII objects: the file closes automatically when the stream goes out of scope, so you cannot forget to close it. This project is a miniature database: the file is the storage, the vector is the cache, and the methods are the queries.',
          syntax: 'std::ofstream out("todos.txt");\nout << done << " " << text << "\\n";\nstd::ifstream in("todos.txt");\nstd::string line;\nstd::getline(in, line);',
          analogy: 'File persistence is like writing your shopping list on paper instead of keeping it in your head: the paper is still there tomorrow even if you forget.',
          exampleCode: `#include <iostream>
#include <vector>
#include <string>
#include <fstream>

struct Todo {
    std::string text;
    bool done = false;
};

void list_todos(const std::vector<Todo>& todos) {
    for (size_t i = 0; i < todos.size(); i++) {
        std::cout << i + 1 << ". [" << (todos[i].done ? 'x' : ' ') << "] "
                  << todos[i].text << std::endl;
    }
}

int main() {
    std::vector<Todo> todos = {{"Buy milk", false}, {"Read book", true}, {"Write code", false}};
    list_todos(todos);
    std::ofstream out("todos.txt");
    for (const auto& t : todos) {
        out << (t.done ? 1 : 0) << " " << t.text << "\\n";
    }
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a Todo struct with text and a done flag.', 'list_todos prints each item with [x] for done and [ ] for pending.', 'Create three sample todos.', 'Print the list.', 'Save the list to todos.txt with an ofstream, which closes automatically.'],
          commonMistakes: ['Saving only at exit and losing data on a crash', 'Using a format that cannot represent spaces in the task text', 'Not checking whether the input file opened successfully'],
          debuggingExercise: {
            prompt: 'This program silently does nothing when the file is missing. Fix it.',
            buggyCode: `#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream in("todos.txt");
    std::string line;
    while (std::getline(in, line)) {
        std::cout << line << std::endl;
    }
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <fstream>
#include <string>

int main() {
    std::ifstream in("todos.txt");
    if (!in) {
        std::cerr << "Could not open todos.txt" << std::endl;
        return 1;
    }
    std::string line;
    while (std::getline(in, line)) {
        std::cout << line << std::endl;
    }
    return 0;
}`,
            explanation: 'A failed ifstream simply makes the read loop end immediately, with no error. Checking the stream after opening reports the problem clearly.'
          },
          miniChallenge: 'Add a "delete" command to the todo list that removes an item by index using vector::erase.',
          summary: 'You designed a persistent todo list with a simple text format, a vector, and a menu loop. File streams are RAII, so files close automatically. This completes the intermediate level. Next: advanced OOP.',
          knowledgeCheck: [
            q('Why save after every change instead of only at exit?', ['It is faster', 'A crash would otherwise lose unsaved work', 'Files require it', 'It uses less memory'], 1, 'Saving eagerly protects against crashes; saving only at exit risks losing everything since the last save.'),
            q('What happens when an ofstream goes out of scope?', ['The file is deleted', 'The file is closed automatically', 'The data is lost', 'Nothing'], 1, 'File streams are RAII objects: their destructors close the file and flush the buffer.')
          ],
          exercises: [
            ex('cpp-m19-l2-e1', 'Count completed todos', 'write-code', 'Read n, then n lines each starting with 0 or 1 (done flag) followed by a space and a task name. Print how many tasks are marked done (flag 1). Task names are single words.',
              '#include <iostream>\n#include <string>\n\nint main() {\n    int n;\n    // read n tasks, count those with flag 1\n    return 0;\n}',
              '#include <iostream>\n#include <string>\n\nint main() {\n    int n;\n    std::cin >> n;\n    int done_count = 0;\n    for (int i = 0; i < n; i++) {\n        int flag;\n        std::string name;\n        std::cin >> flag >> name;\n        if (flag == 1) done_count++;\n    }\n    std::cout << done_count << std::endl;\n    return 0;\n}',
              'Each line gives a flag and a name; count the lines whose flag is 1.',
              'O(n)', [tc('two of three done', '3\n1 milk\n0 bread\n1 eggs\n', '2'), tc('none done', '2\n0 a\n0 b\n', '0', true)], h5(
                'Each task line has a flag and a name; only the flag matters for the count.',
                'Loop n times, read flag and name with std::cin, and increment the counter when flag is 1.',
                'std::cin >> flag >> name; if (flag == 1) done_count++;',
                'If the count is 0 for done tasks, check the comparison uses == 1 and the flag is read first.',
                'Solution: read flag and name per line, count flags equal to 1. Two of three done gives 2.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m20',
      title: 'Advanced OOP',
      description: 'Multiple inheritance, interfaces, operator overloading, and design patterns.',
      level: 'advanced',
      order: 20,
      lessons: [
        {
          id: 'cpp-m20-l1',
          slug: 'operator-overloading',
          title: 'Operator Overloading',
          objectives: ['Overload arithmetic and comparison operators', 'Overload stream operators << and >>', 'Follow the conventions for operator overloading'],
          introduction: 'Operator overloading lets your types work with the same syntax as built-in types: vectors can be added, dates can be compared, and custom types can be printed with <<. This lesson covers the conventions that make overloading safe and intuitive.',
          concept: 'Operator overloading defines what an operator means for a user-defined type. Binary arithmetic operators are usually implemented as member or free functions returning a new value by value, as in Vector operator+(const Vector& other) const. Comparison operators should be consistent: if you define ==, also define !=, and in C++20 the three-way comparison operator <=> generates all the relational operators from one definition. Stream operators are free functions: std::ostream& operator<<(std::ostream& os, const Vector& v) prints the object and returns the stream so calls can chain. The assignment operator returns a reference to *this so assignments can chain. The subscript operator operator[] usually comes in const and non-const versions. The rule is to overload only when the meaning is obvious and consistent with the built-in meaning; overloading + to mean something surprising makes code unreadable. The copy-and-swap idiom implements assignment safely in terms of a swap function.',
          syntax: 'class Vector {\npublic:\n    Vector operator+(const Vector& other) const;\n    bool operator==(const Vector& other) const;\n};\nstd::ostream& operator<<(std::ostream& os, const Vector& v);',
          analogy: 'Operator overloading is like teaching a new employee the company shorthand: once they know that "+" means "combine", they can use it just like everyone else.',
          exampleCode: `#include <iostream>

class Vector2D {
private:
    double x, y;
public:
    Vector2D(double x_, double y_) : x(x_), y(y_) {}
    Vector2D operator+(const Vector2D& other) const {
        return Vector2D(x + other.x, y + other.y);
    }
    bool operator==(const Vector2D& other) const {
        return x == other.x && y == other.y;
    }
    friend std::ostream& operator<<(std::ostream& os, const Vector2D& v) {
        return os << "(" << v.x << ", " << v.y << ")";
    }
};

int main() {
    Vector2D a(1, 2), b(3, 4);
    Vector2D c = a + b;
    std::cout << c << std::endl;
    std::cout << std::boolalpha << (c == Vector2D(4, 6)) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define Vector2D with x and y.', 'Overload + to return a new vector with added components.', 'Overload == to compare both components.', 'Overload << as a friend so it can access private members.', 'Add two vectors and print the result (4, 6).'],
          commonMistakes: ['Overloading an operator with a surprising meaning', 'Forgetting to return the stream from operator<<', 'Implementing operator+ as a member that modifies the object instead of returning a new one'],
          debuggingExercise: {
            prompt: 'This program fails to compile when printing a Vector2D. Fix it.',
            buggyCode: `#include <iostream>

class Vector2D {
private:
    double x, y;
public:
    Vector2D(double x_, double y_) : x(x_), y(y_) {}
    std::ostream& operator<<(std::ostream& os) {
        return os << "(" << x << ", " << y << ")";
    }
};

int main() {
    Vector2D v(1, 2);
    std::cout << v << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

class Vector2D {
private:
    double x, y;
public:
    Vector2D(double x_, double y_) : x(x_), y(y_) {}
    friend std::ostream& operator<<(std::ostream& os, const Vector2D& v) {
        return os << "(" << v.x << ", " << v.y << ")";
    }
};

int main() {
    Vector2D v(1, 2);
    std::cout << v << std::endl;
    return 0;
}`,
            explanation: 'The stream operator must be a free function taking the stream as its left operand; as a member it would require v << std::cout syntax. A friend declaration gives it access to private members.'
          },
          miniChallenge: 'Overload operator- and operator* (scalar multiplication) for Vector2D, and add a <=> comparison in C++20.',
          summary: 'Operator overloading makes custom types feel built-in, but only when the meaning matches intuition. Stream operators are free functions; assignment returns *this. Next: multiple inheritance and interfaces.',
          knowledgeCheck: [
            q('Why is operator<< a free function rather than a member?', ['It is faster', 'The left operand is the stream, so the function must take it as a parameter', 'Members cannot print', 'It is a rule with no reason'], 1, 'For std::cout << v, the left operand is std::ostream, so the operator must be a free function taking the stream first.'),
            q('What should operator+ return?', ['A reference to *this', 'A new value by value', 'Nothing', 'A pointer'], 1, 'operator+ creates a new value without modifying its operands, so it returns by value.')
          ],
          exercises: [
            ex('cpp-m20-l1-e1', 'Add two vectors', 'write-code', 'Read four integers x1 y1 x2 y2 and print the sum vector as "(x, y)". Implement a Vector2D class with operator+ and operator<<.',
              '#include <iostream>\n\nclass Vector2D {\nprivate:\n    int x, y;\npublic:\n    Vector2D(int x_, int y_) : x(x_), y(y_) {}\n    Vector2D operator+(const Vector2D& other) const {\n        return Vector2D(x + other.x, y + other.y);\n    }\n    friend std::ostream& operator<<(std::ostream& os, const Vector2D& v) {\n        return os << "(" << v.x << ", " << v.y << ")";\n    }\n};\n\nint main() {\n    int x1, y1, x2, y2;\n    // read the two vectors, print their sum\n    return 0;\n}',
              '#include <iostream>\n\nclass Vector2D {\nprivate:\n    int x, y;\npublic:\n    Vector2D(int x_, int y_) : x(x_), y(y_) {}\n    Vector2D operator+(const Vector2D& other) const {\n        return Vector2D(x + other.x, y + other.y);\n    }\n    friend std::ostream& operator<<(std::ostream& os, const Vector2D& v) {\n        return os << "(" << v.x << ", " << v.y << ")";\n    }\n};\n\nint main() {\n    int x1, y1, x2, y2;\n    std::cin >> x1 >> y1 >> x2 >> y2;\n    Vector2D a(x1, y1), b(x2, y2);\n    std::cout << (a + b) << std::endl;\n    return 0;\n}',
              'operator+ adds the components and operator<< prints the result as (x, y).',
              'O(1)', [tc('add (1,2) and (3,4)', '1 2 3 4\n', '(4, 6)'), tc('add zeros', '0 0 0 0\n', '(0, 0)', true)], h5(
                'Vector addition adds each component separately.',
                'Read the four numbers, construct two Vector2Ds, and print a + b.',
                'Vector2D a(x1, y1), b(x2, y2); std::cout << (a + b) << std::endl;',
                'If the output lacks parentheses, check operator<< formats as "(" << x << ", " << y << ")".',
                'Solution: a + b uses the overloaded operator+. (1,2) + (3,4) gives (4, 6).'))
          ]
        },
        {
          id: 'cpp-m20-l2',
          slug: 'multiple-inheritance-interfaces',
          title: 'Multiple Inheritance, Interfaces, and the Diamond Problem',
          objectives: ['Use multiple inheritance for interfaces', 'Explain the diamond problem', 'Use virtual inheritance to solve it'],
          introduction: 'C++ allows a class to inherit from several bases, which is how interfaces are composed. This lesson covers multiple inheritance, the diamond problem it creates, and virtual inheritance as the fix.',
          concept: 'Multiple inheritance lets a class derive from more than one base: class Duck : public Bird, public Swimmer. It is most useful for interfaces, abstract classes with only pure virtual functions, such as Drawable and Serializable, which a class can implement several of without the problems of inheriting state from multiple bases. The diamond problem arises when two bases share a common ancestor: class A, class B : public A, class C : public A, class D : public B, public C has two copies of A inside D, which makes access to A\'s members ambiguous. Virtual inheritance, class B : public virtual A, makes the bases share a single copy of A, solving the ambiguity at the cost of extra indirection. In practice, most C++ code uses single inheritance for implementation and multiple inheritance only for interfaces, which avoids the diamond entirely. Composition is often a better design than multiple inheritance of stateful classes.',
          syntax: 'class Drawable {\npublic:\n    virtual void draw() const = 0;\n    virtual ~Drawable() = default;\n};\nclass Circle : public Shape, public Drawable {\npublic:\n    void draw() const override { /* ... */ }\n};',
          analogy: 'Multiple inheritance is like a person with two jobs: they can be both a teacher and a musician, but if both jobs give them the same company car, there is a conflict about which car is theirs.',
          exampleCode: `#include <iostream>
#include <string>

class Printable {
public:
    virtual std::string to_string() const = 0;
    virtual ~Printable() = default;
};

class Named {
public:
    virtual std::string name() const = 0;
    virtual ~Named() = default;
};

class Person : public Printable, public Named {
private:
    std::string person_name;
public:
    Person(const std::string& n) : person_name(n) {}
    std::string name() const override { return person_name; }
    std::string to_string() const override { return "Person: " + person_name; }
};

int main() {
    Person p("Ada");
    std::cout << p.to_string() << std::endl;
    std::cout << p.name() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define two interfaces, Printable and Named, as abstract classes.', 'Derive Person from both.', 'Implement name() and to_string() in Person.', 'Create a Person named Ada.', 'Call both interface methods.'],
          commonMistakes: ['Inheriting state from multiple bases and hitting the diamond problem', 'Forgetting virtual destructors in interface classes', 'Using multiple inheritance where composition would be simpler'],
          debuggingExercise: {
            prompt: 'This program fails with "ambiguous access to value". Fix it.',
            buggyCode: `#include <iostream>

class Base { public: int value = 1; };
class Left : public Base {};
class Right : public Base {};
class Bottom : public Left, public Right {};

int main() {
    Bottom b;
    std::cout << b.value << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>

class Base { public: int value = 1; };
class Left : public virtual Base {};
class Right : public virtual Base {};
class Bottom : public Left, public Right {};

int main() {
    Bottom b;
    std::cout << b.value << std::endl;
    return 0;
}`,
            explanation: 'Without virtual inheritance, Bottom contains two copies of Base, so value is ambiguous. Virtual inheritance shares a single Base subobject, removing the ambiguity.'
          },
          miniChallenge: 'Design two interfaces, Flyable and Swimmable, and a Duck class that implements both.',
          summary: 'Multiple inheritance is best for interfaces; virtual inheritance solves the diamond problem by sharing the common base. Prefer composition for state. Next module: advanced templates.',
          knowledgeCheck: [
            q('What is the diamond problem?', ['A sorting problem', 'Two bases sharing a common ancestor give a derived class two copies of that ancestor, making access ambiguous', 'A memory leak', 'A template error'], 1, 'In a diamond hierarchy, the most derived class contains two copies of the shared base unless virtual inheritance is used.'),
            q('When is multiple inheritance safest?', ['Always', 'When inheriting only interfaces (pure abstract classes) without state', 'When inheriting many stateful classes', 'Never'], 1, 'Interfaces carry no state, so multiple interface inheritance avoids the diamond problem entirely.')
          ],
          exercises: [
            ex('cpp-m20-l2-e1', 'Interface area', 'write-code', 'Read a side length as a double and print the area of a square with two decimal places. Use two interfaces: Shape with area() and Named with name(), implemented by a Square class.',
              '#include <iostream>\n#include <iomanip>\n#include <string>\n\nclass Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Named {\npublic:\n    virtual std::string name() const = 0;\n    virtual ~Named() = default;\n};\n\nclass Square : public Shape, public Named {\n    double side;\npublic:\n    Square(double s) : side(s) {}\n    double area() const override { return side * side; }\n    std::string name() const override { return "Square"; }\n};\n\nint main() {\n    double s;\n    // read s, print the area with 2 decimals\n    return 0;\n}',
              '#include <iostream>\n#include <iomanip>\n#include <string>\n\nclass Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Named {\npublic:\n    virtual std::string name() const = 0;\n    virtual ~Named() = default;\n};\n\nclass Square : public Shape, public Named {\n    double side;\npublic:\n    Square(double s) : side(s) {}\n    double area() const override { return side * side; }\n    std::string name() const override { return "Square"; }\n};\n\nint main() {\n    double s;\n    std::cin >> s;\n    Square sq(s);\n    std::cout << std::fixed << std::setprecision(2) << sq.area() << std::endl;\n    return 0;\n}',
              'Square implements both interfaces; area() returns side * side.',
              'O(1)', [tc('square side 3', '3\n', '9.00'), tc('square side 2.5', '2.5\n', '6.25', true)], h5(
                'A class can implement several interfaces at once.',
                'Construct Square sq(s) and print sq.area() with fixed and setprecision(2).',
                'Square sq(s); std::cout << std::fixed << std::setprecision(2) << sq.area() << std::endl;',
                'If the area is the side itself, check area() multiplies side by side.',
                'Solution: Square implements Shape and Named; area() is side * side. Side 3 gives 9.00.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m21',
      title: 'Advanced Templates',
      description: 'Variadic templates, SFINAE, concepts, and template metaprogramming.',
      level: 'advanced',
      order: 21,
      lessons: [
        {
          id: 'cpp-m21-l1',
          slug: 'variadic-templates',
          title: 'Variadic Templates and Parameter Packs',
          objectives: ['Write variadic function templates', 'Expand parameter packs', 'Use fold expressions'],
          introduction: 'Variadic templates accept any number of arguments of any types. This lesson covers parameter packs, fold expressions, and the recursive patterns that process them.',
          concept: 'A variadic template takes a parameter pack: template <typename... Args> void print_all(Args... args); accepts any number of arguments. The pack can be expanded with a fold expression, introduced in C++17: (std::cout << ... << args) prints every argument separated by nothing, and (args + ...) sums them all. Fold expressions come in unary and binary forms and work with any operator, including && and ||, which makes them perfect for combining conditions. Before C++17, packs were processed recursively: a function taking one argument plus a pack calls itself with the rest until the pack is empty, with a base case for zero arguments. Parameter packs also appear in class templates, as in std::tuple<Types...>, and in perfect forwarding, where Args&&... forwards each argument with its original value category. Variadic templates power std::make_unique, std::thread, and formatting libraries.',
          syntax: 'template <typename... Args>\nvoid print_all(Args... args) {\n    (std::cout << ... << args) << std::endl;\n}\n\ntemplate <typename... Args>\nauto sum_all(Args... args) {\n    return (args + ...);\n}',
          analogy: 'A parameter pack is like a shopping list of any length: the same checkout process handles one item or a hundred.',
          exampleCode: `#include <iostream>
#include <string>

template <typename... Args>
void print_all(Args... args) {
    (std::cout << ... << args) << std::endl;
}

template <typename... Args>
auto sum_all(Args... args) {
    return (args + ...);
}

int main() {
    print_all("Hello", " ", "world", "! ", 2026);
    std::cout << "Sum: " << sum_all(1, 2, 3, 4, 5) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define print_all with a parameter pack.', 'Expand the pack with a fold expression over <<.', 'Define sum_all with a fold over +.', 'Print a mix of strings and an int.', 'Sum five numbers to get 15.'],
          commonMistakes: ['Forgetting the base case in recursive pack processing', 'Using a fold expression on an empty pack with an operator that has no identity', 'Expanding a pack in the wrong place, so the compiler cannot deduce it'],
          debuggingExercise: {
            prompt: 'This recursive print function fails to compile. Fix it.',
            buggyCode: `#include <iostream>

template <typename T, typename... Args>
void print_all(T first, Args... rest) {
    std::cout << first << " ";
    print_all(rest...);
}

int main() {
    print_all(1, 2, 3);
    return 0;
}`,
            fixedCode: `#include <iostream>

void print_all() {
    std::cout << std::endl;
}

template <typename T, typename... Args>
void print_all(T first, Args... rest) {
    std::cout << first << " ";
    print_all(rest...);
}

int main() {
    print_all(1, 2, 3);
    return 0;
}`,
            explanation: 'The recursion had no base case for zero arguments, so the compiler could not find a matching overload. Adding a zero-argument print_all ends the recursion.'
          },
          miniChallenge: 'Write a variadic function that returns true if all its arguments are positive, using a fold expression over &&.',
          summary: 'Variadic templates accept any number of arguments, and fold expressions process the whole pack in one expression. Next: concepts and SFINAE.',
          knowledgeCheck: [
            q('What does (args + ...) do?', ['Adds the first two arguments', 'Folds the parameter pack with +, summing all arguments', 'Creates a vector', 'Sorts the arguments'], 1, 'A fold expression applies the operator across the whole pack.'),
            q('What is a parameter pack?', ['A fixed list of parameters', 'A template parameter that accepts zero or more types or values', 'A container', 'A macro'], 1, 'A parameter pack, written typename... Args, holds any number of template arguments.')
          ],
          exercises: [
            ex('cpp-m21-l1-e1', 'Sum of three', 'write-code', 'Read three integers and print their sum. (This models a variadic sum fold over three arguments.)',
              '#include <iostream>\n\nint main() {\n    int a, b, c;\n    // read a, b, c, print their sum\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int a, b, c;\n    std::cin >> a >> b >> c;\n    std::cout << a + b + c << std::endl;\n    return 0;\n}',
              'Adding the three values gives their sum.',
              'O(1)', [tc('sum 1 2 3', '1 2 3\n', '6'), tc('sum 10 20 30', '10 20 30\n', '60', true)], h5(
                'Add all three inputs together.',
                'Read a, b, c and print a + b + c.',
                'std::cout << a + b + c << std::endl;',
                'If one value is missing from the sum, check all three are added.',
                'Solution: print a + b + c. 1 + 2 + 3 is 6.'))
          ]
        },
        {
          id: 'cpp-m21-l2',
          slug: 'concepts-sfinae',
          title: 'Concepts and SFINAE',
          objectives: ['Write C++20 concepts', 'Constrain templates with requires clauses', 'Explain SFINAE and why concepts replace it'],
          introduction: 'Concepts let you state what a template parameter must support, with clear errors when it does not. This lesson covers writing concepts and the older SFINAE technique they replace.',
          concept: 'A concept is a compile-time predicate on types: template <typename T> concept Addable = requires(T a, T b) { a + b; }; states that a type is Addable when two values of it can be added. A constrained template, template <Addable T> T add(T a, T b), only accepts types satisfying the concept, and the compiler reports a clear error naming the concept when it does not. The standard library provides concepts like std::integral, std::floating_point, and std::totally_ordered in the <concepts> header. Before concepts, SFINAE, Substitution Failure Is Not An Error, achieved the same thing with std::enable_if, which made templates that silently disappeared from overload resolution when a condition failed, producing notoriously cryptic errors. Concepts are easier to read, produce better errors, and are the modern way to constrain templates. A requires clause can also appear on a function: template <typename T> T add(T a, T b) requires Addable<T>; is equivalent to the constrained form.',
          syntax: '#include <concepts>\ntemplate <typename T>\nconcept Addable = requires(T a, T b) { a + b; };\n\ntemplate <Addable T>\nT add(T a, T b) { return a + b; }',
          analogy: 'A concept is like a job description: it lists the skills a candidate must have, and the compiler checks the candidate against the list before hiring.',
          exampleCode: `#include <iostream>
#include <concepts>

template <typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template <Numeric T>
T double_value(T x) {
    return x * 2;
}

int main() {
    std::cout << double_value(21) << std::endl;
    std::cout << double_value(2.5) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a Numeric concept as integral or floating point.', 'Constrain double_value with it.', 'Call it with an int to get 42.', 'Call it with a double to get 5.0.', 'Calling it with a string would fail with a clear concept error.'],
          commonMistakes: ['Writing a concept that is too strict and rejects valid types', 'Using enable_if when a concept would be clearer', 'Forgetting that concepts are checked at the call site, not at the definition'],
          debuggingExercise: {
            prompt: 'This template should only accept numbers, but it accepts strings too. Fix it.',
            buggyCode: `#include <iostream>

template <typename T>
T double_value(T x) {
    return x * 2;
}

int main() {
    std::cout << double_value(std::string("ab")) << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <concepts>
#include <string>

template <typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template <Numeric T>
T double_value(T x) {
    return x * 2;
}

int main() {
    std::cout << double_value(21) << std::endl;
    return 0;
}`,
            explanation: 'The unconstrained template accepted any type supporting *, including std::string, which repeats it. Constraining with a Numeric concept rejects strings at the call site.'
          },
          miniChallenge: 'Write a concept Sortable that requires a type to support < and use it to constrain a max_value template.',
          summary: 'Concepts state template requirements clearly and produce readable errors, replacing the cryptic SFINAE technique. Next module: concurrency.',
          knowledgeCheck: [
            q('What is a concept in C++20?', ['A class', 'A compile-time predicate that constrains template parameters', 'A design pattern', 'A namespace'], 1, 'A concept names a set of requirements on a type, and constrained templates only accept types that satisfy it.'),
            q('What does SFINAE stand for?', ['Substitution Failure Is Not An Error', 'Standard Function Is Not Available', 'Static Function Is Not Executed', 'Simple Function Is Not Enough'], 0, 'SFINAE means a failed template substitution removes the overload from consideration instead of erroring.')
          ],
          exercises: [
            ex('cpp-m21-l2-e1', 'Constrained double', 'write-code', 'Read an integer and print twice its value. Use a function template double_value with a static_assert that T is an integral type (the C++17 way to constrain a template; C++20 concepts do the same job more cleanly).',
              '#include <iostream>\n#include <type_traits>\n\ntemplate <typename T>\nT double_value(T x) {\n    static_assert(std::is_integral<T>::value, "T must be an integral type");\n    return x * 2;\n}\n\nint main() {\n    int n;\n    // read n, print double_value(n)\n    return 0;\n}',
              '#include <iostream>\n#include <type_traits>\n\ntemplate <typename T>\nT double_value(T x) {\n    static_assert(std::is_integral<T>::value, "T must be an integral type");\n    return x * 2;\n}\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::cout << double_value(n) << std::endl;\n    return 0;\n}',
              'The static_assert constrains the template to integral types at compile time, like a concept would in C++20.',
              'O(1)', [tc('double 21', '21\n', '42'), tc('double -5', '-5\n', '-10', true)], h5(
                'A static_assert inside a template constrains which types it accepts.',
                'Call double_value(n) and print the result.',
                'std::cout << double_value(n) << std::endl;',
                'If the compiler rejects the call, check the include <type_traits> is present.',
                'Solution: template <typename T> T double_value(T x) { static_assert(std::is_integral<T>::value, "..."); return x * 2; } Input 21 gives 42.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m22',
      title: 'Concurrency',
      description: 'Threads, mutexes, atomics, and futures in modern C++.',
      level: 'advanced',
      order: 22,
      lessons: [
        {
          id: 'cpp-m22-l1',
          slug: 'std-thread',
          title: 'Threads with std::thread',
          objectives: ['Create threads with std::thread', 'Pass arguments to threads safely', 'Join threads and handle exceptions'],
          introduction: 'std::thread brings portable threading to C++: create a thread from any callable, pass it arguments, and join it. This lesson covers the basics and the pitfalls of thread arguments.',
          concept: 'std::thread starts a new thread running a callable: std::thread t(worker, 42); runs worker(42) in parallel. Arguments are copied or moved into the thread\'s storage, so passing a reference requires std::ref, as in std::thread t(worker, std::ref(data));, and the referenced object must outlive the thread. Every thread must be joined with t.join() or detached with t.detach() before the std::thread object is destroyed, or std::terminate is called. Threads share the process memory, which makes communication easy and data races possible: two threads writing the same variable at the same time is undefined behaviour. The main thread must join all threads before returning from main, or the program may exit while they are still running. std::thread can run lambdas, member functions, and function objects, and std::jthread from C++20 joins automatically in its destructor and supports cooperative cancellation with a stop token.',
          syntax: '#include <thread>\nvoid worker(int id) { /* ... */ }\nstd::thread t(worker, 1);\nt.join();',
          analogy: 'std::thread is like hiring a worker: you give them a job and the tools they need, and you wait (join) until they finish before closing the shop.',
          exampleCode: `#include <iostream>
#include <thread>
#include <vector>

void print_numbers(int id) {
    for (int i = 0; i < 3; i++) {
        std::cout << "Thread " << id << ": " << i << std::endl;
    }
}

int main() {
    std::thread t1(print_numbers, 1);
    std::thread t2(print_numbers, 2);
    t1.join();
    t2.join();
    std::cout << "All threads done." << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a worker that prints numbers with its id.', 'Create two threads running the worker.', 'The threads run concurrently and print interleaved lines.', 'Join both threads to wait for them.', 'Print a final message once all threads are done.'],
          commonMistakes: ['Forgetting to join a thread, which calls std::terminate', 'Passing a reference without std::ref, so the thread gets a copy', 'Passing a pointer to a local that goes out of scope before the thread finishes'],
          debuggingExercise: {
            prompt: 'This program terminates with an error. Fix it.',
            buggyCode: `#include <iostream>
#include <thread>

void worker() {
    std::cout << "Working" << std::endl;
}

int main() {
    std::thread t(worker);
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <thread>

void worker() {
    std::cout << "Working" << std::endl;
}

int main() {
    std::thread t(worker);
    t.join();
    return 0;
}`,
            explanation: 'Destroying a joinable std::thread calls std::terminate. Joining the thread before main returns waits for it to finish.'
          },
          miniChallenge: 'Write a program that splits summing a vector of 1000 numbers across 4 threads, each summing a quarter.',
          summary: 'std::thread runs a callable in parallel; join it before it is destroyed, and use std::ref for reference arguments. Next: mutexes and atomics.',
          knowledgeCheck: [
            q('What happens if a joinable std::thread is destroyed?', ['Nothing', 'std::terminate is called', 'The thread keeps running', 'The program pauses'], 1, 'Destroying a joinable thread terminates the program; you must join or detach it first.'),
            q('How do you pass a reference to a thread function?', ['Just pass it', 'Wrap it in std::ref', 'Pass a pointer always', 'References cannot be passed'], 1, 'Thread arguments are copied by default; std::ref wraps a reference so the thread sees the original.')
          ],
          exercises: [
            ex('cpp-m22-l1-e1', 'Parallel sum parts', 'write-code', 'Read 4 integers and print their sum. (This models a thread splitting work into parts and combining the partial results.)',
              '#include <iostream>\n\nint main() {\n    int parts[4];\n    // read 4 numbers, print their sum\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int parts[4];\n    int sum = 0;\n    for (int i = 0; i < 4; i++) {\n        std::cin >> parts[i];\n        sum += parts[i];\n    }\n    std::cout << sum << std::endl;\n    return 0;\n}',
              'Reading four partial sums and adding them gives the total.',
              'O(n)', [tc('sum of parts', '10 20 30 40\n', '100'), tc('all zero', '0 0 0 0\n', '0', true)], h5(
                'Combine partial results by adding them together.',
                'Read the four numbers into an array and accumulate their sum.',
                'int sum = 0; for (int i = 0; i < 4; i++) { std::cin >> parts[i]; sum += parts[i]; }',
                'If the sum is missing a part, check the loop runs four times.',
                'Solution: read four values and print their sum. 10 + 20 + 30 + 40 is 100.'))
          ]
        },
        {
          id: 'cpp-m22-l2',
          slug: 'mutexes-atomics-futures',
          title: 'Mutexes, Atomics, and Futures',
          objectives: ['Protect shared data with std::mutex and std::lock_guard', 'Use std::atomic for lock-free counters', 'Run async work with std::async and std::future'],
          introduction: 'Shared data needs protection, and sometimes a lock is more than you need. This lesson covers mutexes with RAII locking, atomics for simple shared values, and futures for getting results back from async work.',
          concept: 'A std::mutex is a lock that only one thread can hold at a time. std::lock_guard<std::mutex> acquires the lock in its constructor and releases it in its destructor, so the lock is always released, even if an exception is thrown, which is RAII applied to locking. A data race is when two threads access the same memory concurrently and at least one writes; it is undefined behaviour. The classic example is two threads incrementing a shared counter without a lock, losing updates. std::atomic<int> provides lock-free atomic operations for simple types: counter++ on an atomic is a single indivisible operation, which is faster than a mutex for counters and flags. std::async launches a function asynchronously and returns a std::future holding the result; calling future.get() waits for the result and rethrows any exception the function threw. std::promise and std::future let one thread deliver a value to another. Keep critical sections short, never call blocking operations while holding a lock, and prefer designs where threads own their own data.',
          syntax: 'std::mutex m;\n{\n    std::lock_guard<std::mutex> lock(m);\n    counter++;\n}\nstd::atomic<int> atomic_counter{0};\nauto fut = std::async(std::launch::async, [] { return 42; });\nint result = fut.get();',
          analogy: 'A mutex is like the key to a single-occupancy bathroom: only the thread holding the key can enter. An atomic is like a turnstile that counts people one at a time without a guard.',
          exampleCode: `#include <iostream>
#include <thread>
#include <mutex>
#include <atomic>
#include <future>

int main() {
    std::atomic<int> counter{0};
    auto worker = [&counter]() {
        for (int i = 0; i < 100000; i++) counter++;
    };
    std::thread t1(worker);
    std::thread t2(worker);
    t1.join();
    t2.join();
    std::cout << "Counter: " << counter << std::endl;
    auto fut = std::async(std::launch::async, [] { return 6 * 7; });
    std::cout << "Async result: " << fut.get() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Declare an atomic counter.', 'Two threads each increment it 100,000 times.', 'Atomic increments are indivisible, so no updates are lost.', 'Join both threads and print 200,000.', 'Run a computation with std::async and get its result from the future.'],
          commonMistakes: ['Forgetting to unlock a mutex on an early return, which lock_guard prevents', 'Locking two mutexes in different orders, causing deadlock', 'Using a plain int for a shared counter instead of an atomic or a mutex'],
          debuggingExercise: {
            prompt: 'This program usually prints less than 200000. Fix it.',
            buggyCode: `#include <iostream>
#include <thread>

int counter = 0;

void increment() {
    for (int i = 0; i < 100000; i++) {
        counter++;
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    t1.join();
    t2.join();
    std::cout << "Counter: " << counter << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <thread>
#include <atomic>

std::atomic<int> counter{0};

void increment() {
    for (int i = 0; i < 100000; i++) {
        counter++;
    }
}

int main() {
    std::thread t1(increment);
    std::thread t2(increment);
    t1.join();
    t2.join();
    std::cout << "Counter: " << counter << std::endl;
    return 0;
}`,
            explanation: 'Two threads incremented a plain int without synchronization, so increments were lost in a data race. An atomic counter makes each increment indivisible.'
          },
          miniChallenge: 'Write a program where two threads each add 100,000 to a shared total protected by a mutex, and verify the result is 200,000.',
          summary: 'lock_guard gives RAII locking, atomics give lock-free simple operations, and futures return results from async work. Keep critical sections short. Next module: systems programming.',
          knowledgeCheck: [
            q('What does std::lock_guard do?', ['Locks a mutex forever', 'Acquires a mutex in its constructor and releases it in its destructor', 'Deletes a mutex', 'Creates a thread'], 1, 'lock_guard is RAII for mutexes: the lock is released automatically when the guard goes out of scope.'),
            q('What is std::async used for?', ['Sorting', 'Running a function asynchronously and getting its result through a future', 'Locking', 'Printing'], 1, 'std::async launches work and returns a future; get() waits for the result.')
          ],
          exercises: [
            ex('cpp-m22-l2-e1', 'Atomic counter simulation', 'write-code', 'Read two integers a and b, each representing increments from a thread, and print their total. (In real threaded code an atomic or mutex would protect the shared counter; here you compute the correct combined total.)',
              '#include <iostream>\n\nint main() {\n    int a, b;\n    // read a and b, print a + b\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int a, b;\n    std::cin >> a >> b;\n    std::cout << a + b << std::endl;\n    return 0;\n}',
              'Adding the two partial counts gives the protected total.',
              'O(1)', [tc('100000 + 100000', '100000 100000\n', '200000'), tc('0 + 5', '0 5\n', '5', true)], h5(
                'The correct total is the sum of the two partial counts.',
                'Read a and b and print a + b.',
                'std::cout << a + b << std::endl;',
                'If the total is short, one of the partial counts was lost, which is what an atomic prevents.',
                'Solution: print a + b. 100000 + 100000 is 200000.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m23',
      title: 'Systems Programming',
      description: 'Processes, files, and POSIX APIs from C++.',
      level: 'advanced',
      order: 23,
      lessons: [
        {
          id: 'cpp-m23-l1',
          slug: 'filesystem',
          title: 'The <filesystem> Library',
          objectives: ['Navigate directories with std::filesystem', 'Create, copy, and remove files and directories', 'Handle filesystem errors with error_code'],
          introduction: 'C++17 added a standard filesystem library for working with paths, directories, and files portably. This lesson covers the path type, directory iteration, and error handling.',
          concept: 'std::filesystem::path represents a file path portably: it handles separators, extensions, and parent directories, and it can be built with the / operator, as in std::filesystem::path("data") / "file.txt";. The library provides functions to test existence, check whether a path is a file or directory, get its size, and create or remove directories. directory_iterator walks the entries of a directory, and recursive_directory_iterator walks a whole tree. Most functions come in two forms: one that throws std::filesystem::filesystem_error on failure, and one that takes a std::error_code and reports the failure without throwing. The error_code form is better for code that must handle missing files gracefully. The filesystem library replaces platform-specific code and the old C functions for directory work, and it works the same on Linux, macOS, and Windows.',
          syntax: 'namespace fs = std::filesystem;\nfs::path p = fs::path("data") / "file.txt";\nbool exists = fs::exists(p);\nfor (const auto& entry : fs::directory_iterator(".")) {\n    std::cout << entry.path() << std::endl;\n}',
          analogy: 'std::filesystem is like a map of a city: paths are addresses, directories are streets, and iterators let you walk every street without getting lost.',
          exampleCode: `#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main() {
    fs::path p = fs::path("data") / "notes.txt";
    std::cout << "Path: " << p << std::endl;
    std::cout << "Filename: " << p.filename() << std::endl;
    std::cout << "Extension: " << p.extension() << std::endl;
    std::cout << "Parent: " << p.parent_path() << std::endl;
    std::cout << "Exists: " << std::boolalpha << fs::exists(p) << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Build a path by joining "data" and "notes.txt" with /.', 'Print the full path.', 'Print the filename, extension, and parent path components.', 'Test whether the file exists.', 'Note that no file is created; the path is just manipulated.'],
          commonMistakes: ['Using the throwing form and not catching filesystem_error', 'Assuming path separators are the same on all platforms', 'Forgetting that directory_iterator throws if the directory does not exist'],
          debuggingExercise: {
            prompt: 'This program crashes when the directory does not exist. Fix it.',
            buggyCode: `#include <iostream>
#include <filesystem>

int main() {
    for (const auto& entry : std::filesystem::directory_iterator("missing")) {
        std::cout << entry.path() << std::endl;
    }
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <filesystem>

int main() {
    std::error_code ec;
    for (const auto& entry : std::filesystem::directory_iterator("missing", ec)) {
        std::cout << entry.path() << std::endl;
    }
    if (ec) {
        std::cout << "Error: " << ec.message() << std::endl;
    }
    return 0;
}`,
            explanation: 'directory_iterator throws when the directory cannot be opened. The error_code overload reports the failure without throwing, so the program can handle it gracefully.'
          },
          miniChallenge: 'Write a program that lists all files in the current directory with their sizes, sorted by size.',
          summary: 'std::filesystem provides portable paths, directory iteration, and file operations, with error_code overloads for graceful handling. Next: processes and system calls.',
          knowledgeCheck: [
            q('What does fs::path("data") / "file.txt" do?', ['Divides two numbers', 'Joins path components with the platform separator', 'Deletes the file', 'Copies the file'], 1, 'The / operator joins path components portably.'),
            q('Why use the error_code overload of a filesystem function?', ['It is faster', 'It reports failure without throwing an exception', 'It works on more files', 'It is shorter'], 1, 'The error_code form lets code handle missing files gracefully instead of throwing.')
          ],
          exercises: [
            ex('cpp-m23-l1-e1', 'Path components', 'write-code', 'Read a filename (one word) and print its length. (This models extracting a filename component from a path.)',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string filename;\n    // read filename, print its length\n    return 0;\n}',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string filename;\n    std::cin >> filename;\n    std::cout << filename.size() << std::endl;\n    return 0;\n}',
              'The length of the filename is its size.',
              'O(n)', [tc('length of notes.txt', 'notes.txt\n', '9'), tc('length of a', 'a\n', '1', true)], h5(
                'std::string::size() gives the length of a string.',
                'Read the filename and print filename.size().',
                'std::cout << filename.size() << std::endl;',
                'If the length is one too many, check the input has no trailing spaces.',
                'Solution: print filename.size(). "notes.txt" has length 9.'))
          ]
        },
        {
          id: 'cpp-m23-l2',
          slug: 'processes-and-system',
          title: 'Processes and System Calls from C++',
          objectives: ['Launch processes with std::system and popen', 'Use fork and exec from C++', 'Explain when to use each approach'],
          introduction: 'C++ programs can launch other programs and interact with the operating system. This lesson covers std::system, popen for capturing output, and the POSIX fork/exec model.',
          concept: 'The simplest way to run another program is std::system("ls -l"), which runs the command in a shell and returns its exit status. It is easy but slow, shell-dependent, and risky with untrusted input, because shell metacharacters can inject commands. popen("ls", "r") runs a command and returns a FILE* you can read its output from, which is useful for capturing results. For full control, C++ can use the POSIX fork and exec functions directly: fork duplicates the process, the child calls execlp to run the new program, and the parent calls wait to collect the exit status. C++ adds RAII wrappers around these calls in real code, such as a Process class whose destructor waits for the child. The C++ standard also provides std::system_error for reporting OS errors. Choose std::system for quick scripts, popen for capturing output, and fork/exec for production code that needs control over the child\'s environment and file descriptors.',
          syntax: 'int status = std::system("ls -l");\nFILE* pipe = popen("ls", "r");\n// POSIX:\npid_t pid = fork();\nif (pid == 0) { execlp("ls", "ls", nullptr); }',
          analogy: 'Launching a process is like hiring a subcontractor: std::system is a phone call, popen is a phone call with a written report back, and fork/exec is a full contract with supervision.',
          exampleCode: `#include <iostream>
#include <cstdio>
#include <array>

int main() {
    std::array<char, 128> buffer;
    FILE* pipe = popen("echo hello from child", "r");
    if (pipe == nullptr) {
        std::cerr << "popen failed" << std::endl;
        return 1;
    }
    while (fgets(buffer.data(), static_cast<int>(buffer.size()), pipe) != nullptr) {
        std::cout << "Output: " << buffer.data();
    }
    int status = pclose(pipe);
    std::cout << "Exit status: " << status << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Open a pipe to the command echo hello from child.', 'Check that popen succeeded.', 'Read the output line by line with fgets.', 'Print each line.', 'Close the pipe with pclose and print the exit status.'],
          commonMistakes: ['Using std::system with untrusted input, enabling shell injection', 'Forgetting pclose, which leaks the child process', 'Assuming popen output is available immediately without reading'],
          debuggingExercise: {
            prompt: 'This program leaks a child process. Fix it.',
            buggyCode: `#include <cstdio>

int main() {
    FILE* pipe = popen("ls", "r");
    char buffer[128];
    while (fgets(buffer, sizeof(buffer), pipe) != nullptr) {
    }
    return 0;
}`,
            fixedCode: `#include <cstdio>

int main() {
    FILE* pipe = popen("ls", "r");
    if (pipe == nullptr) return 1;
    char buffer[128];
    while (fgets(buffer, sizeof(buffer), pipe) != nullptr) {
    }
    pclose(pipe);
    return 0;
}`,
            explanation: 'popen creates a child process that is only reaped by pclose. Forgetting pclose leaves a zombie process behind.'
          },
          miniChallenge: 'Write a program that runs "date" with popen and prints the output.',
          summary: 'std::system runs commands, popen captures their output, and fork/exec gives full control. Avoid shell injection by never passing untrusted input to a shell. Next module: performance.',
          knowledgeCheck: [
            q('What does popen do?', ['Opens a file', 'Runs a command and returns a stream to its output or input', 'Creates a thread', 'Opens a socket'], 1, 'popen runs a command and gives you a FILE* to read its output or write its input.'),
            q('Why is std::system risky with untrusted input?', ['It is slow', 'Shell metacharacters in the input can inject commands', 'It crashes', 'It cannot run'], 1, 'system passes the string to a shell, so a semicolon or backtick in the input can run arbitrary commands.')
          ],
          exercises: [
            ex('cpp-m23-l2-e1', 'Count processes', 'write-code', 'Read an integer n (number of child processes) and print n + 1, the total number of processes after forking n children (parent plus children).',
              '#include <iostream>\n\nint main() {\n    int n;\n    // read n, print n + 1\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::cout << n + 1 << std::endl;\n    return 0;\n}',
              'Forking n children from one parent creates n + 1 processes in total.',
              'O(1)', [tc('fork 3 children', '3\n', '4'), tc('fork 0 children', '0\n', '1', true)], h5(
                'The parent counts as one process too.',
                'Print n + 1.',
                'std::cout << n + 1 << std::endl;',
                'If the answer is n, you forgot to count the parent process.',
                'Solution: print n + 1. Forking 3 children gives 4 processes total.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m24',
      title: 'Performance',
      description: 'Measuring, profiling, and optimizing C++ code.',
      level: 'advanced',
      order: 24,
      lessons: [
        {
          id: 'cpp-m24-l1',
          slug: 'benchmarking',
          title: 'Benchmarking with std::chrono',
          objectives: ['Time code with std::chrono', 'Write reliable microbenchmarks', 'Interpret results and avoid common traps'],
          introduction: 'You cannot optimize what you cannot measure. This lesson covers timing code with std::chrono, writing benchmarks that the compiler cannot cheat on, and interpreting the results.',
          concept: 'std::chrono provides clocks for measuring time: std::chrono::steady_clock is monotonic and is the right choice for timing, while system_clock can jump if the system time changes. A typical benchmark records the start time, runs the work, records the end time, and computes the duration with std::chrono::duration_cast<std::chrono::milliseconds>. A single run is noisy, so benchmark by repeating the work many times and reporting the average, and warm up caches first. The biggest benchmarking trap is the compiler optimizing away the work: if the result is never used, the compiler can delete the whole loop, so benchmarks must use the result, for example by printing it or passing it to a function the compiler cannot see through. Another trap is measuring debug builds, which are far slower than optimized builds; always benchmark with -O2. Libraries like Google Benchmark handle these traps automatically and are the professional choice for serious work.',
          syntax: 'auto start = std::chrono::steady_clock::now();\n// ... work ...\nauto end = std::chrono::steady_clock::now();\nauto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);\nstd::cout << ms.count() << " ms" << std::endl;',
          analogy: 'Benchmarking is like timing a race with a stopwatch: you need a fair track, a real finish line, and several runs to know the true time.',
          exampleCode: `#include <iostream>
#include <chrono>
#include <vector>

int main() {
    auto start = std::chrono::steady_clock::now();
    long sum = 0;
    for (long i = 0; i < 100000000; i++) {
        sum += i;
    }
    auto end = std::chrono::steady_clock::now();
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
    std::cout << "Sum: " << sum << ", Time: " << ms.count() << " ms" << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Record the start time with steady_clock.', 'Run a loop that adds numbers from 0 to 100 million.', 'Record the end time.', 'Compute the elapsed milliseconds.', 'Print the sum so the compiler cannot delete the loop, and the time.'],
          commonMistakes: ['Timing a single run and trusting the noise', 'Forgetting to use the result, so the compiler deletes the work', 'Benchmarking a debug build and concluding the code is slow'],
          debuggingExercise: {
            prompt: 'This benchmark reports 0 ms even for a large loop. Why?',
            buggyCode: `#include <iostream>
#include <chrono>

int main() {
    auto start = std::chrono::steady_clock::now();
    long sum = 0;
    for (long i = 0; i < 100000000; i++) {
        sum += i;
    }
    auto end = std::chrono::steady_clock::now();
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
    std::cout << ms.count() << " ms" << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <chrono>

int main() {
    auto start = std::chrono::steady_clock::now();
    long sum = 0;
    for (long i = 0; i < 100000000; i++) {
        sum += i;
    }
    auto end = std::chrono::steady_clock::now();
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);
    std::cout << "Sum: " << sum << ", Time: " << ms.count() << " ms" << std::endl;
    return 0;
}`,
            explanation: 'The sum was never used, so the compiler deleted the entire loop as dead code. Printing sum forces the compiler to actually compute it.'
          },
          miniChallenge: 'Benchmark std::sort against a hand-written bubble sort on 100,000 integers and compare the results.',
          summary: 'Use steady_clock for timing, repeat work and average, and always use the result so the compiler cannot delete it. Benchmark optimized builds. Next: cache-friendly code.',
          knowledgeCheck: [
            q('Which clock should you use for benchmarking?', ['system_clock', 'steady_clock', 'high_resolution_clock always', 'A wall clock'], 1, 'steady_clock is monotonic and never jumps, so it is the right choice for measuring elapsed time.'),
            q('Why must a benchmark use its result?', ['For style', 'Otherwise the compiler may delete the work as dead code', 'To print it', 'To slow it down'], 1, 'An unused computation can be optimized away entirely, making the benchmark measure nothing.')
          ],
          exercises: [
            ex('cpp-m24-l1-e1', 'Count operations', 'write-code', 'Read n and print the number of loop iterations a nested loop would perform: for i in 1..n, for j in 1..i, count++. (This is n(n+1)/2; compute it with a formula.)',
              '#include <iostream>\n\nint main() {\n    long n;\n    // read n, print n*(n+1)/2\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    long n;\n    std::cin >> n;\n    std::cout << n * (n + 1) / 2 << std::endl;\n    return 0;\n}',
              'The inner loop runs 1 + 2 + ... + n times, which equals n(n+1)/2.',
              'O(1)', [tc('n = 10', '10\n', '55'), tc('n = 100', '100\n', '5050', true)], h5(
                'The nested loops run 1 + 2 + ... + n times in total.',
                'Use the formula n * (n + 1) / 2 instead of looping.',
                'std::cout << n * (n + 1) / 2 << std::endl;',
                'If the answer is off by one, check the formula uses n + 1, not n - 1.',
                'Solution: n * (n + 1) / 2. For n = 10 the count is 55.'))
          ]
        },
        {
          id: 'cpp-m24-l2',
          slug: 'cache-and-optimization',
          title: 'Cache-Friendly Code and Compiler Optimizations',
          objectives: ['Explain how CPU caches affect performance', 'Write cache-friendly loops', 'Use move semantics and reserve() to avoid copies'],
          introduction: 'Modern CPUs are fast, but memory is slow, so the cache decides performance. This lesson explains cache locality, the vector optimizations that exploit it, and how the compiler helps.',
          concept: 'A CPU cache holds recently used memory in small, fast storage close to the processor. When the program accesses memory, the CPU loads a whole cache line, typically 64 bytes, so accessing nearby data is cheap and jumping around is expensive. Sequential access is fast because each cache line is used fully before moving on, while strided access wastes most of each line. For a 2D array stored row-major, looping row by row visits memory in order, but looping column by column jumps by the row size on every step and can be many times slower. std::vector stores elements contiguously, which is why it is usually faster than std::list for iteration, despite the list\'s better insertion complexity. Calling v.reserve(n) before pushing n elements avoids repeated reallocations and copies. Moving instead of copying, and passing large objects by const reference, removes unnecessary work. Compiler flags matter: -O2 enables most optimizations, and -march=native lets the compiler use the CPU\'s newest instructions. But the biggest wins usually come from better algorithms and better memory layout, not from micro-optimizations.',
          syntax: 'std::vector<int> v;\nv.reserve(1000); // avoid reallocations\n// Row-major traversal is cache-friendly:\nfor (int r = 0; r < N; r++)\n    for (int c = 0; c < N; c++)\n        sum += grid[r][c];',
          analogy: 'The cache is like a desk: data on the desk is instant to reach, data in the filing cabinet takes a trip, so you keep the papers you are working on together on the desk.',
          exampleCode: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.reserve(5);
    for (int i = 1; i <= 5; i++) {
        v.push_back(i * 10);
    }
    int sum = 0;
    for (int x : v) sum += x;
    std::cout << "Sum: " << sum << std::endl;
    std::cout << "Capacity: " << v.capacity() << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a vector and reserve space for 5 elements.', 'Push five values without any reallocation.', 'Sum the elements with a range-based for loop.', 'Print the sum, 150.', 'Print the capacity to confirm the reservation.'],
          commonMistakes: ['Looping column-major over a row-major array', 'Pushing into a vector without reserve in a hot loop', 'Passing large objects by value'],
          debuggingExercise: {
            prompt: 'This loop is slow on a large matrix. What is wrong and how do you fix it?',
            buggyCode: `#include <iostream>
#include <vector>

int main() {
    const int N = 1024;
    std::vector<std::vector<int>> grid(N, std::vector<int>(N, 0));
    long sum = 0;
    for (int c = 0; c < N; c++) {
        for (int r = 0; r < N; r++) {
            sum += grid[r][c];
        }
    }
    std::cout << sum << std::endl;
    return 0;
}`,
            fixedCode: `#include <iostream>
#include <vector>

int main() {
    const int N = 1024;
    std::vector<std::vector<int>> grid(N, std::vector<int>(N, 0));
    long sum = 0;
    for (int r = 0; r < N; r++) {
        for (int c = 0; c < N; c++) {
            sum += grid[r][c];
        }
    }
    std::cout << sum << std::endl;
    return 0;
}`,
            explanation: 'The loops visited memory column by column, jumping a whole row on every access and wasting cache lines. Swapping the loops to row-major order makes access sequential and much faster.'
          },
          miniChallenge: 'Benchmark row-major versus column-major summation on a 1024x1024 matrix and report the speed difference.',
          summary: 'Sequential, cache-friendly access beats strided access by a wide margin. Use reserve() to avoid reallocations, move instead of copy, and profile before optimizing. Next module: networking.',
          knowledgeCheck: [
            q('Why is row-major traversal of a C++ 2D array faster than column-major?', ['It uses less code', 'It accesses memory sequentially, using each cache line fully', 'It uses fewer variables', 'It avoids the stack'], 1, 'C++ arrays are row-major, so row-by-row access is sequential and cache-friendly.'),
            q('What does vector::reserve(n) do?', ['Sets the size to n', 'Allocates capacity for n elements without changing the size', 'Sorts the vector', 'Clears the vector'], 1, 'reserve allocates capacity so later push_back calls do not reallocate.')
          ],
          exercises: [
            ex('cpp-m24-l2-e1', 'Row sum', 'write-code', 'Read a 3x3 grid of integers and print the sum of each row on its own line. (Row-major traversal: process one row completely before the next.)',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> grid(3, std::vector<int>(3));\n    // read 9 numbers, print the sum of each row\n    return 0;\n}',
              '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> grid(3, std::vector<int>(3));\n    for (int r = 0; r < 3; r++) {\n        for (int c = 0; c < 3; c++) std::cin >> grid[r][c];\n    }\n    for (int r = 0; r < 3; r++) {\n        int sum = 0;\n        for (int c = 0; c < 3; c++) sum += grid[r][c];\n        std::cout << sum << std::endl;\n    }\n    return 0;\n}',
              'Two nested loops in row-major order read the grid, then a second pass sums each row.',
              'O(n^2)', [tc('row sums', '1 2 3\n4 5 6\n7 8 9\n', '6\n15\n24'), tc('all ones', '1 1 1\n1 1 1\n1 1 1\n', '3\n3\n3', true)], h5(
                'Process the grid row by row, summing each row separately.',
                'Read the grid with nested loops, then loop rows again summing the three columns.',
                'for (int r = 0; r < 3; r++) { int sum = 0; for (int c = 0; c < 3; c++) sum += grid[r][c]; std::cout << sum << std::endl; }',
                'If the sums accumulate across rows, reset sum to 0 at the start of each row.',
                'Solution: sum each row separately and print it. Rows of 1..9 give 6, 15, 24.'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m25',
      title: 'Networking',
      description: 'Sockets, TCP clients and servers, and modern C++ networking.',
      level: 'advanced',
      order: 25,
      lessons: [
        {
          id: 'cpp-m25-l1',
          slug: 'sockets-cpp',
          title: 'Sockets in C++: TCP Clients',
          objectives: ['Explain what a socket is', 'Create a TCP client socket', 'Send and receive data over a socket'],
          introduction: 'Sockets are the endpoints of network communication, and C++ uses the same POSIX socket API as C, wrapped in RAII classes. This lesson introduces the socket API and a TCP client.',
          concept: 'A socket is an endpoint for communication, created with socket(AF_INET, SOCK_STREAM, 0) for TCP over IPv4. The client fills a sockaddr_in structure with the server\'s address and port, using inet_pton to convert a dotted address like "127.0.0.1" to binary, and htons to convert the port to network byte order. connect() establishes the TCP connection, after which send() and recv() exchange bytes, just like writing and reading a file. recv returns the number of bytes read, 0 when the peer closes the connection, and -1 on error. TCP is a byte stream, not a message stream, so a single send may arrive in several recv calls, and a program must loop until it has the expected number of bytes. In C++, the raw socket descriptor should be wrapped in a class whose destructor calls close(), so the socket is always released, even when an exception is thrown. Always check every call for errors, because networks fail in ways local code does not.',
          syntax: 'int sock = socket(AF_INET, SOCK_STREAM, 0);\nstruct sockaddr_in addr = {};\naddr.sin_family = AF_INET;\naddr.sin_port = htons(8080);\ninet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);\nconnect(sock, (struct sockaddr*)&addr, sizeof(addr));',
          analogy: 'A socket is like a telephone: socket() buys the phone, connect() dials the number, and send() and recv() are speaking and listening.',
          exampleCode: `#include <iostream>
#include <string>
#include <cstring>
#include <unistd.h>
#include <arpa/inet.h>

class Socket {
private:
    int fd = -1;
public:
    Socket() : fd(socket(AF_INET, SOCK_STREAM, 0)) {}
    ~Socket() { if (fd >= 0) close(fd); }
    Socket(const Socket&) = delete;
    Socket& operator=(const Socket&) = delete;
    int get() const { return fd; }
    bool valid() const { return fd >= 0; }
};

int main() {
    Socket sock;
    if (!sock.valid()) { std::cerr << "socket failed" << std::endl; return 1; }
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);
    if (connect(sock.get(), (sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("connect");
        return 1;
    }
    std::string msg = "Hello, server!\\n";
    send(sock.get(), msg.data(), msg.size(), 0);
    char buf[256];
    ssize_t n = recv(sock.get(), buf, sizeof(buf) - 1, 0);
    if (n > 0) {
        buf[n] = '\\0';
        std::cout << "Reply: " << buf;
    }
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Define a Socket RAII class that closes the descriptor in its destructor.', 'Create a socket and check it is valid.', 'Fill in the server address and port 8080.', 'Connect to the server.', 'Send a greeting, receive the reply, and print it; the socket closes automatically.'],
          commonMistakes: ['Forgetting htons on the port, so the client dials the wrong port', 'Assuming one recv returns a whole message', 'Not checking the return value of recv'],
          debuggingExercise: {
            prompt: 'This client fails to connect to a server on port 8080. Fix it.',
            buggyCode: `#include <arpa/inet.h>

int main() {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_port = 8080;
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);
    connect(sock, (sockaddr*)&addr, sizeof(addr));
    return 0;
}`,
            fixedCode: `#include <arpa/inet.h>

int main() {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &addr.sin_addr);
    connect(sock, (sockaddr*)&addr, sizeof(addr));
    return 0;
}`,
            explanation: 'The port must be in network byte order. On a little-endian machine, 8080 without htons is byte-swapped, so the client dialled the wrong port.'
          },
          miniChallenge: 'Modify the client to send a message typed by the user and print the server reply.',
          summary: 'Sockets connect programs over a network: socket creates one, connect dials the server, and send/recv exchange a byte stream. Wrap the descriptor in RAII. Next: writing the server side.',
          knowledgeCheck: [
            q('What does htons do?', ['Converts a host to a socket', 'Converts a 16-bit value from host byte order to network byte order', 'Prints a port', 'Opens a socket'], 1, 'Network byte order is big-endian; htons converts the port so both ends agree.'),
            q('What does recv returning 0 mean?', ['An error', 'The peer closed the connection', 'No data yet', 'The buffer is full'], 1, 'recv returns 0 when the peer has closed its side of the connection.')
          ],
          exercises: [
            ex('cpp-m25-l1-e1', 'Port byte order', 'write-code', 'Read a port number and print it unchanged. (In real socket code you would wrap it in htons; this exercise checks the value flows through correctly.)',
              '#include <iostream>\n\nint main() {\n    int port;\n    // read port, print it\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int port;\n    std::cin >> port;\n    std::cout << port << std::endl;\n    return 0;\n}',
              'Read the port and print it back.',
              'O(1)', [tc('port 8080', '8080\n', '8080'), tc('port 80', '80\n', '80', true)], h5(
                'Read the integer and print it with std::cout.',
                'std::cin >> port; std::cout << port << std::endl;',
                'std::cin >> port; std::cout << port << std::endl;',
                'If nothing prints, check std::cin actually read into port.',
                'Solution: std::cin >> port; std::cout << port; Input 8080 prints 8080.'))
          ]
        },
        {
          id: 'cpp-m25-l2',
          slug: 'tcp-server-cpp',
          title: 'Writing a TCP Server in C++',
          objectives: ['Bind, listen, and accept connections', 'Handle clients in threads', 'Explain the accept loop'],
          introduction: 'Servers wait for clients to connect. This lesson covers bind, listen, and accept, and builds a threaded echo server that handles each client in its own thread.',
          concept: 'A TCP server creates a socket, binds it to an address and port with bind(), and marks it as listening with listen(), which sets the backlog of pending connections. accept() blocks until a client connects, then returns a new socket dedicated to that client, while the listening socket stays open for more connections. The server reads from the client socket with recv, processes the data, and replies with send, in a loop until the client disconnects. A simple server handles one client at a time, which blocks other clients; a threaded server spawns a std::thread per client, which is easy to write and fine for learning, while production servers use thread pools or non-blocking I/O with poll or epoll. The SO_REUSEADDR socket option lets the server restart immediately without waiting for old connections to time out. Setting the listening address to INADDR_ANY, 0.0.0.0, accepts connections on all interfaces. In C++, the listening socket should be an RAII class, and each client thread should own its socket.',
          syntax: 'int server = socket(AF_INET, SOCK_STREAM, 0);\nbind(server, (sockaddr*)&addr, sizeof(addr));\nlisten(server, 5);\nint client = accept(server, nullptr, nullptr);',
          analogy: 'A server is like a reception desk: the listening socket is the front door, accept() is the receptionist greeting each visitor, and the client socket is the private room where the conversation happens.',
          exampleCode: `#include <iostream>
#include <string>
#include <thread>
#include <unistd.h>
#include <arpa/inet.h>

void handle_client(int client) {
    char buf[256];
    ssize_t n = recv(client, buf, sizeof(buf) - 1, 0);
    if (n > 0) {
        buf[n] = '\\0';
        std::cout << "Received: " << buf;
        send(client, buf, static_cast<size_t>(n), 0);
    }
    close(client);
}

int main() {
    int server = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    bind(server, (sockaddr*)&addr, sizeof(addr));
    listen(server, 5);
    std::cout << "Listening on port 8080..." << std::endl;
    while (true) {
        int client = accept(server, nullptr, nullptr);
        std::thread(handle_client, client).detach();
    }
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a listening socket and set SO_REUSEADDR.', 'Bind to all interfaces on port 8080.', 'Listen with a backlog of 5.', 'Loop accepting clients.', 'Spawn a detached thread per client to echo its message back.'],
          commonMistakes: ['Forgetting SO_REUSEADDR and getting "address already in use" on restart', 'Detaching threads without any limit, so a flood of clients exhausts resources', 'Sharing one client socket between threads'],
          debuggingExercise: {
            prompt: 'This server fails to restart quickly with "Address already in use". Fix it.',
            buggyCode: `#include <arpa/inet.h>

int main() {
    int server = socket(AF_INET, SOCK_STREAM, 0);
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    bind(server, (sockaddr*)&addr, sizeof(addr));
    listen(server, 5);
    return 0;
}`,
            fixedCode: `#include <arpa/inet.h>

int main() {
    int server = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    bind(server, (sockaddr*)&addr, sizeof(addr));
    listen(server, 5);
    return 0;
}`,
            explanation: 'After the server exits, its connections linger in TIME_WAIT and the port stays reserved. SO_REUSEADDR lets the new server bind the port immediately.'
          },
          miniChallenge: 'Extend the echo server to use a thread pool with a fixed number of worker threads instead of one thread per client.',
          summary: 'A TCP server binds, listens, and accepts, getting a fresh socket per client. Threads let it serve many clients at once. This completes networking. Next: the advanced projects.',
          knowledgeCheck: [
            q('What does accept() return?', ['The listening socket', 'A new socket for the connected client', 'The client address', 'Nothing'], 1, 'accept returns a new socket dedicated to that client; the listening socket stays open.'),
            q('What does SO_REUSEADDR allow?', ['Faster sends', 'Binding a port that is in TIME_WAIT after a previous server exited', 'More clients', 'Encrypted connections'], 1, 'SO_REUSEADDR lets a server rebind a port whose old connections are still timing out.')
          ],
          exercises: [
            ex('cpp-m25-l2-e1', 'Echo a message', 'write-code', 'Read a line of input and print it back prefixed with "echo: ". (This models a server echoing a client message.)',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string line;\n    // read a line, print "echo: " followed by the line\n    return 0;\n}',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string line;\n    std::getline(std::cin, line);\n    std::cout << "echo: " << line << std::endl;\n    return 0;\n}',
              'std::getline reads the line and the output adds the echo prefix.',
              'O(n)', [tc('echo hello', 'hello\n', 'echo: hello'), tc('echo C++', 'C++\n', 'echo: C++', true)], h5(
                'Read the line with std::getline.',
                'Print "echo: " plus the line.',
                'std::getline(std::cin, line); std::cout << "echo: " << line << std::endl;',
                'If the line is empty, check getline read from std::cin and not from an empty stream.',
                'Solution: getline the line and print "echo: " before it. Input "hello" gives "echo: hello".'))
          ]
        }
      ]
    },
    {
      id: 'cpp-m26',
      title: 'Advanced Projects',
      description: 'A thread pool and a mini HTTP server in modern C++.',
      level: 'advanced',
      order: 26,
      lessons: [
        {
          id: 'cpp-m26-l1',
          slug: 'thread-pool',
          title: 'Project: Thread Pool',
          objectives: ['Design a thread pool with a task queue', 'Use condition variables to wake workers', 'Submit tasks and collect results with futures'],
          introduction: 'The capstone concurrency project: a thread pool that keeps a fixed set of worker threads busy with tasks from a queue, returning results through futures.',
          concept: 'A thread pool owns a fixed number of worker threads and a queue of tasks. The main thread submits work with enqueue, which returns a std::future holding the result, and the workers wait on a condition variable until a task arrives. The condition variable lets workers sleep without consuming CPU, waking only when there is work or when the pool shuts down. A mutex protects the queue, and the workers loop: lock, wait for a task or shutdown, pop the task, unlock, and run it. The task is stored as a std::function<void()> or as a packaged_task wrapped in a shared_ptr so the future can be returned. The pool destructor sets the shutdown flag, notifies all workers, and joins them, so no thread outlives the pool. Thread pools are the standard way to parallelize work in servers and games: creating a thread per task is expensive, while a pool reuses threads and bounds resource use.',
          syntax: 'class ThreadPool {\npublic:\n    ThreadPool(size_t threads);\n    template <typename F, typename... Args>\n    auto enqueue(F&& f, Args&&... args) -> std::future<decltype(f(args...))>;\n    ~ThreadPool();\nprivate:\n    std::vector<std::thread> workers;\n    std::queue<std::function<void()>> tasks;\n    std::mutex queue_mutex;\n    std::condition_variable condition;\n    bool stop = false;\n};',
          analogy: 'A thread pool is like a restaurant kitchen: a fixed crew of cooks waits for orders, and each order is a ticket on the rail; when a cook finishes one dish, they take the next ticket.',
          exampleCode: `#include <iostream>
#include <vector>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <future>
#include <functional>

class ThreadPool {
public:
    ThreadPool(size_t threads) {
        for (size_t i = 0; i < threads; i++) {
            workers.emplace_back([this] {
                while (true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(queue_mutex);
                        condition.wait(lock, [this] {
                            return stop || !tasks.empty();
                        });
                        if (stop && tasks.empty()) return;
                        task = std::move(tasks.front());
                        tasks.pop();
                    }
                    task();
                }
            });
        }
    }
    template <typename F, typename... Args>
    auto enqueue(F&& f, Args&&... args)
        -> std::future<decltype(f(args...))> {
        using ReturnType = decltype(f(args...));
        auto task = std::make_shared<std::packaged_task<ReturnType()>>(
            std::bind(std::forward<F>(f), std::forward<Args>(args)...));
        std::future<ReturnType> result = task->get_future();
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            tasks.emplace([task]() { (*task)(); });
        }
        condition.notify_one();
        return result;
    }
    ~ThreadPool() {
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            stop = true;
        }
        condition.notify_all();
        for (auto& worker : workers) worker.join();
    }
private:
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex queue_mutex;
    std::condition_variable condition;
    bool stop = false;
};

int main() {
    ThreadPool pool(4);
    std::vector<std::future<int>> results;
    for (int i = 0; i < 8; i++) {
        results.emplace_back(pool.enqueue([i] { return i * i; }));
    }
    for (auto& r : results) {
        std::cout << r.get() << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create a pool with 4 workers.', 'Enqueue 8 tasks that compute squares.', 'Each enqueue returns a future.', 'Collect the results with get(), which waits for completion.', 'The pool destructor shuts down the workers cleanly.'],
          commonMistakes: ['Forgetting to notify the condition variable after enqueueing', 'Not checking the stop flag after waking, so workers hang on shutdown', 'Submitting tasks after the pool has started shutting down'],
          debuggingExercise: {
            prompt: 'This worker loop busy-waits and burns CPU. Fix it.',
            buggyCode: `while (true) {
    std::unique_lock<std::mutex> lock(queue_mutex);
    if (!tasks.empty()) {
        auto task = std::move(tasks.front());
        tasks.pop();
        lock.unlock();
        task();
    }
}`,
            fixedCode: `while (true) {
    std::function<void()> task;
    {
        std::unique_lock<std::mutex> lock(queue_mutex);
        condition.wait(lock, [this] { return stop || !tasks.empty(); });
        if (stop && tasks.empty()) return;
        task = std::move(tasks.front());
        tasks.pop();
    }
    task();
}`,
            explanation: 'The loop spun without waiting, re-locking the mutex constantly. condition.wait blocks the worker until a task arrives or shutdown begins, so it consumes no CPU while idle.'
          },
          miniChallenge: 'Use the thread pool to parallelize summing a large vector, and compare the time with a single-threaded sum.',
          summary: 'A thread pool reuses a fixed set of workers, a queue, and a condition variable to run tasks efficiently. Futures return the results. Next: the final project, a mini HTTP server.',
          knowledgeCheck: [
            q('What does a condition variable do?', ['Locks a mutex', 'Lets a thread sleep until a condition becomes true, without busy-waiting', 'Creates a thread', 'Sorts tasks'], 1, 'A condition variable blocks a thread until another thread notifies it, which is how workers wait for tasks.'),
            q('Why use a thread pool instead of one thread per task?', ['It is simpler', 'Creating threads is expensive; a pool reuses them and bounds resource use', 'It is slower', 'It avoids mutexes'], 1, 'Thread creation has real cost, and unbounded threads exhaust resources; a pool amortizes the cost.')
          ],
          exercises: [
            ex('cpp-m26-l1-e1', 'Parallel sum parts', 'write-code', 'Read 4 integers and print their sum. (This models a thread pool splitting work into parts and combining the partial results.)',
              '#include <iostream>\n\nint main() {\n    int parts[4];\n    // read 4 numbers, print their sum\n    return 0;\n}',
              '#include <iostream>\n\nint main() {\n    int parts[4];\n    int sum = 0;\n    for (int i = 0; i < 4; i++) {\n        std::cin >> parts[i];\n        sum += parts[i];\n    }\n    std::cout << sum << std::endl;\n    return 0;\n}',
              'Reading four partial sums and adding them gives the total.',
              'O(n)', [tc('sum of parts', '10 20 30 40\n', '100'), tc('all zero', '0 0 0 0\n', '0', true)], h5(
                'Combine partial results by adding them together.',
                'Read the four numbers into an array and accumulate their sum.',
                'int sum = 0; for (int i = 0; i < 4; i++) { std::cin >> parts[i]; sum += parts[i]; }',
                'If the sum is missing a part, check the loop runs four times.',
                'Solution: read four values and print their sum. 10 + 20 + 30 + 40 is 100.'))
          ]
        },
        {
          id: 'cpp-m26-l2',
          slug: 'mini-http-server-cpp',
          title: 'Project: Mini HTTP Server in C++',
          objectives: ['Parse an HTTP request line', 'Serve a static response over a socket', 'Handle clients with the thread pool'],
          introduction: 'The final project brings everything together: a mini HTTP server in modern C++ that listens on a port, reads a request, and replies with a valid HTTP response, serving each client through the thread pool.',
          concept: 'HTTP is a text protocol on top of TCP. A client connects and sends a request like "GET / HTTP/1.1" followed by headers and a blank line, and the server replies with a status line such as "HTTP/1.1 200 OK", headers including Content-Type and Content-Length, a blank line, and the body. The server reads the request with recv, parses the method and path with a string stream, and builds the response with std::ostringstream, computing the body length with .size(). A loop around accept hands each client to the thread pool, so many clients can be served at once. Parsing must be defensive: a request longer than the buffer must be rejected, and the path must be validated so a client cannot request files outside the served directory. This project shows that the web is built from the same sockets, strings, and streams you have already learned, and that modern C++ makes the code shorter and safer than the equivalent C.',
          syntax: 'std::ostringstream response;\nresponse << "HTTP/1.1 200 OK\\r\\n"\n         << "Content-Type: text/html\\r\\n"\n         << "Content-Length: " << body.size() << "\\r\\n\\r\\n"\n         << body;',
          analogy: 'An HTTP server is like a waiter in a restaurant: the client orders (the request), the waiter writes it down (parses it), and the kitchen sends back the dish (the response).',
          exampleCode: `#include <iostream>
#include <string>
#include <sstream>
#include <unistd.h>
#include <arpa/inet.h>

int main() {
    int server = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(8080);
    bind(server, (sockaddr*)&addr, sizeof(addr));
    listen(server, 5);
    std::cout << "Mini HTTP server on port 8080. Try: curl http://localhost:8080/" << std::endl;
    while (true) {
        int client = accept(server, nullptr, nullptr);
        char request[1024];
        ssize_t n = recv(client, request, sizeof(request) - 1, 0);
        if (n > 0) {
            request[n] = '\\0';
            std::istringstream in(request);
            std::string method, path;
            in >> method >> path;
            std::cout << "Request: " << method << " " << path << std::endl;
            std::string body = "<h1>Hello from C++!</h1>";
            std::ostringstream response;
            response << "HTTP/1.1 200 OK\\r\\n"
                     << "Content-Type: text/html\\r\\n"
                     << "Content-Length: " << body.size() << "\\r\\n\\r\\n"
                     << body;
            std::string out = response.str();
            send(client, out.data(), out.size(), 0);
        }
        close(client);
    }
}`,
          exampleLanguage: 'cpp',
          walkthrough: ['Create, bind, and listen on port 8080 as in the TCP server lesson.', 'Loop accepting clients one at a time.', 'Read the request and parse the method and path with a string stream.', 'Build a valid HTTP response with ostringstream.', 'Send it and close the client socket.'],
          commonMistakes: ['Forgetting the blank line between HTTP headers and the body', 'Sending a wrong Content-Length, so the client hangs or truncates the body', 'Using \\n instead of \\r\\n in HTTP headers'],
          debuggingExercise: {
            prompt: 'A browser hangs when loading the page from this server. What is wrong?',
            buggyCode: `std::string body = "Hello";
std::ostringstream response;
response << "HTTP/1.1 200 OK\\r\\n"
         << "Content-Length: 100\\r\\n\\r\\n"
         << body;`,
            fixedCode: `std::string body = "Hello";
std::ostringstream response;
response << "HTTP/1.1 200 OK\\r\\n"
         << "Content-Length: " << body.size() << "\\r\\n\\r\\n"
         << body;`,
            explanation: 'The header claimed 100 bytes but the body is only 5, so the client waited for 95 more bytes that never came. Content-Length must equal the actual body length.'
          },
          miniChallenge: 'Extend the server to return a 404 response when the requested path is not "/", and to serve the contents of a file for other paths.',
          summary: 'You built a working HTTP server from sockets, string streams, and the thread pool. That is the whole C++ course: from Hello World to a web server, with classes, the STL, templates, threads, and networking along the way. Take the mastery assessment to prove it.',
          knowledgeCheck: [
            q('What separates HTTP headers from the body?', ['A space', 'A blank line (CRLF CRLF)', 'A comma', 'Nothing'], 1, 'The headers end with an empty line, after which the body begins.'),
            q('Why must Content-Length match the body exactly?', ['For style', 'The client reads exactly that many bytes, so a mismatch hangs or truncates the response', 'It is optional', 'To save bandwidth'], 1, 'HTTP clients use Content-Length to know where the body ends.')
          ],
          exercises: [
            ex('cpp-m26-l2-e1', 'Build an HTTP response', 'write-code', 'Read a short body string (one word) and print the HTTP status line and Content-Length header for it: first line "HTTP/1.1 200 OK", second line "Content-Length: N" where N is the length of the word.',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string body;\n    // read a word, print the status line and Content-Length\n    return 0;\n}',
              '#include <iostream>\n#include <string>\n\nint main() {\n    std::string body;\n    std::cin >> body;\n    std::cout << "HTTP/1.1 200 OK" << std::endl;\n    std::cout << "Content-Length: " << body.size() << std::endl;\n    return 0;\n}',
              'The body size is the Content-Length.',
              'O(n)', [tc('body Hello', 'Hello\n', 'HTTP/1.1 200 OK\nContent-Length: 5'), tc('body Hi', 'Hi\n', 'HTTP/1.1 200 OK\nContent-Length: 2', true)], h5(
                'Content-Length is the length of the body string.',
                'Read the word, print the status line, then print Content-Length with body.size().',
                'std::cout << "HTTP/1.1 200 OK" << std::endl; std::cout << "Content-Length: " << body.size() << std::endl;',
                'If the length is one too many, check the input word has no trailing spaces.',
                'Solution: print the status line and "Content-Length: " with body.size(). "Hello" gives 5.'))
          ]
        }
      ]
    }
  ]
};

export const CPP_ASSESSMENT: MasteryAssessment = {
  courseSlug: 'cpp',
  passPercent: 80,
  questions: [
    aq('cpp-a1', 'conceptual', 'Basics', 'What does std::cout do?', ['Reads input', 'Writes output to the screen', 'Compiles the program', 'Declares a variable'], 1, 'std::cout is the standard output stream; the << operator sends values to it.'),
    aq('cpp-a2', 'conceptual', 'Basics', 'Which compiler driver should you use for C++?', ['gcc', 'g++', 'python', 'make'], 1, 'g++ links the C++ standard library; gcc does not by default.'),
    aq('cpp-a3', 'conceptual', 'Variables', 'What does auto x = 5; deduce x to be?', ['double', 'int', 'char', 'It has no type'], 1, 'auto deduces the type from the initializer, and 5 is an int.'),
    aq('cpp-a4', 'conceptual', 'Variables', 'What is the advantage of brace initialization int x{3.14};?', ['It is faster', 'It is a compile error instead of a silent narrowing conversion', 'It allows floats', 'It makes x const'], 1, 'Brace initialization forbids narrowing, so mistakes are caught at compile time.'),
    aq('cpp-a5', 'conceptual', 'Strings', 'How do you compare two std::string values for equality?', ['strcmp(a, b) == 0', 'a == b', 'a = b', 'a.equals(b)'], 1, 'std::string overloads == to compare contents.'),
    aq('cpp-a6', 'conceptual', 'Operators', 'What is 7 / 2 in C++ when both operands are int?', ['3.5', '3', '4', '2'], 1, 'Integer division truncates toward zero, so 7 / 2 is 3.'),
    aq('cpp-a7', 'conceptual', 'Control flow', 'In an if / else if chain, how many branches can run?', ['All of them', 'At most one', 'Exactly two', 'None'], 1, 'Execution stops at the first true condition, so at most one branch runs.'),
    aq('cpp-a8', 'conceptual', 'Control flow', 'What does for (const auto& x : v) do?', ['Copies each element', 'Binds a read-only reference to each element without copying', 'Modifies each element', 'Sorts the vector'], 1, 'const auto& reads each element by reference, avoiding copies and preventing modification.'),
    aq('cpp-a9', 'conceptual', 'Functions', 'Can two functions have the same name but different return types only?', ['Yes', 'No, overloading requires different parameter lists', 'Only for main', 'Only in classes'], 1, 'Overloading is resolved by parameter lists; the return type alone is not enough to distinguish overloads.'),
    aq('cpp-a10', 'conceptual', 'Functions', 'What does [=] in a lambda capture list mean?', ['Capture nothing', 'Capture all used variables by value', 'Capture all by reference', 'Capture only the first variable'], 1, '[=] captures the variables the lambda uses by value, copying them at creation.'),
    aq('cpp-a11', 'conceptual', 'Containers', 'What does std::vector::push_back do?', ['Removes the last element', 'Adds an element to the end, growing the vector if needed', 'Sorts the vector', 'Clears the vector'], 1, 'push_back appends an element, allocating more capacity when the vector is full.'),
    aq('cpp-a12', 'conceptual', 'Containers', 'Which container gives average constant-time lookup by key?', ['std::vector', 'std::map', 'std::unordered_map', 'std::list'], 2, 'unordered_map is a hash table with average O(1) lookup, at the cost of ordering.'),
    aq('cpp-a13', 'conceptual', 'References', 'What is a reference in C++?', ['A pointer that can be null', 'An alias for an existing variable', 'A copy of a variable', 'A function pointer'], 1, 'A reference is another name for a variable; it must be initialized and cannot be reseated.'),
    aq('cpp-a14', 'conceptual', 'Classes', 'What is the default access for members of a class?', ['public', 'private', 'protected', 'There is no default'], 1, 'Class members are private by default; struct members are public by default.'),
    aq('cpp-a15', 'conceptual', 'Classes', 'When does a destructor run?', ['When the object is created', 'When the object goes out of scope or is deleted', 'Never', 'Only for heap objects'], 1, 'The destructor runs at the end of the object\'s lifetime, releasing its resources.'),
    aq('cpp-a16', 'conceptual', 'OOP', 'What does a pure virtual function do?', ['It is the fastest function', 'It makes the class abstract so it cannot be instantiated', 'It cannot be overridden', 'It is private'], 1, 'A pure virtual function (= 0) has no implementation in the base and forces derived classes to implement it.'),
    aq('cpp-a17', 'conceptual', 'Memory', 'Can a std::unique_ptr be copied?', ['Yes', 'No, it can only be moved', 'Only for ints', 'Only in C++20'], 1, 'unique_ptr enforces exclusive ownership, so copying is deleted and only moving is allowed.'),
    aq('cpp-a18', 'conceptual', 'Templates', 'What happens when you call a function template?', ['It runs at runtime for any type', 'The compiler generates a version for the deduced types', 'It is interpreted', 'It always copies'], 1, 'Templates are instantiated at compile time for each set of deduced argument types.'),
    aq('cpp-a19', 'conceptual', 'Exceptions', 'How should you catch an exception?', ['By value', 'By const reference', 'By pointer', 'You cannot catch it'], 1, 'Catching by const reference avoids copying and preserves the dynamic type.'),
    aq('cpp-a20', 'conceptual', 'Concurrency', 'What happens if a joinable std::thread is destroyed?', ['Nothing', 'std::terminate is called', 'The thread keeps running', 'The program pauses'], 1, 'Destroying a joinable thread terminates the program; you must join or detach it first.'),
    aq('cpp-a21', 'code-reading', 'References', 'What does this program print?', ['5', '10', '11', '0'], 2, 'ref is an alias for x, so ref = 10 makes x 10, and increment(x) makes it 11.', 'int x = 5;\nint& ref = x;\nref = 10;\nref++;\nstd::cout << x << std::endl;'),
    aq('cpp-a22', 'code-reading', 'Operators', 'What is the value of y after this code?', ['5', '6', '7', '4'], 1, 'Prefix ++x increments x to 6 first, then assigns 6 to y.', 'int x = 5;\nint y = ++x;'),
    aq('cpp-a23', 'code-reading', 'Loops', 'What does this loop print?', ['1 2 3', '0 1 2', '1 2 3 4', 'Nothing'], 0, 'i runs from 1 to 3 inclusive, printing 1, 2, 3.', 'for (int i = 1; i <= 3; i++) {\n    std::cout << i << " ";\n}'),
    aq('cpp-a24', 'code-reading', 'Vectors', 'What is v.size() after this code?', ['3', '4', '5', '2'], 2, 'The vector starts with 3 elements and push_back adds 2 more, giving 5.', 'std::vector<int> v = {1, 2, 3};\nv.push_back(4);\nv.push_back(5);'),
    aq('cpp-a25', 'code-reading', 'Strings', 'What does s.size() return for this string?', ['3', '4', '5', '0'], 0, 'The string "Ada" has 3 characters.', 'std::string s = "Ada";\nstd::cout << s.size() << std::endl;'),
    aq('cpp-a26', 'code-reading', 'Functions', 'What does this program print?', ['7', '3', '4', '0'], 0, 'add(3, 4) returns 7.', 'int add(int a, int b) { return a + b; }\nint main() {\n    std::cout << add(3, 4) << std::endl;\n    return 0;\n}'),
    aq('cpp-a27', 'code-reading', 'Classes', 'What does this program print?', ['0', '70', '100', '30'], 1, 'Deposit 100 and withdraw 30 leaves a balance of 70.', 'BankAccount account;\naccount.deposit(100);\naccount.withdraw(30);\nstd::cout << account.get_balance() << std::endl;'),
    aq('cpp-a28', 'code-reading', 'Algorithms', 'What does this program print?', ['1 2 3 4 5', '5 4 3 2 1', '1 2 3', '5 4 3'], 0, 'std::sort orders the vector ascending: 1 2 3 4 5.', 'std::vector<int> v = {5, 2, 8, 1, 9};\nstd::sort(v.begin(), v.end());'),
    aq('cpp-a29', 'code-reading', 'Smart pointers', 'What does this program print?', ['42', '0', 'The address', 'Nothing'], 0, 'make_unique creates an int holding 42, and dereferencing prints 42.', 'auto p = std::make_unique<int>(42);\nstd::cout << *p << std::endl;'),
    aq('cpp-a30', 'code-reading', 'Templates', 'What does this program print?', ['3', '5', '8', '0'], 1, 'max_value(3, 5) returns the larger, 5.', 'template <typename T>\nT max_value(T a, T b) { return (a > b) ? a : b; }\nstd::cout << max_value(3, 5) << std::endl;'),
    aq('cpp-a31', 'debugging', 'Pointers', 'This program crashes. What is the bug?', ['The cout is wrong', 'p is uninitialized and dereferencing it is undefined behaviour', 'The return type is wrong', 'iostream is missing'], 1, 'p holds a garbage address; writing through it crashes. It must point at a real variable first.', 'int* p;\n*p = 42;\nstd::cout << *p << std::endl;'),
    aq('cpp-a32', 'debugging', 'Vectors', 'What is wrong with this code?', ['It prints too few elements', 'It reads v[5], which is out of bounds', 'It never runs', 'It prints the vector backwards'], 1, 'The vector has indices 0-2; v[5] is out of bounds and undefined behaviour.', 'std::vector<int> v = {1, 2, 3};\nstd::cout << v[5] << std::endl;'),
    aq('cpp-a33', 'debugging', 'Strings', 'Why does this program print a huge number instead of "not found"?', ['find is misspelled', 'find returns npos, not -1', 'The string is empty', 'The comparison is backwards'], 1, 'find returns std::string::npos when the substring is absent; comparing with -1 never matches.', 'std::string s = "hello";\nauto pos = s.find("z");\nif (pos == -1) std::cout << "not found" << std::endl;'),
    aq('cpp-a34', 'debugging', 'Memory', 'What is wrong with this class?', ['It returns the wrong type', 'It defines a destructor but no copy operations, so copies double-free', 'It leaks memory', 'It never returns'], 1, 'The default copy copies the pointer, so two objects delete the same memory. A deep-copy copy constructor and assignment are needed.', 'class MyString {\n    char* data;\npublic:\n    MyString(const char* s) { /* allocate and copy */ }\n    ~MyString() { delete[] data; }\n};'),
    aq('cpp-a35', 'debugging', 'Input', 'Why does this program skip the name prompt?', ['getline is broken', 'The >> operator left a newline that getline reads as an empty line', 'The string is too small', 'The format is wrong'], 1, 'After >> reads the age, the newline remains; getline reads it immediately. std::cin.ignore() discards it first.', 'int age;\nstd::string name;\nstd::cin >> age;\nstd::getline(std::cin, name);'),
    aq('cpp-a36', 'debugging', 'Switch', 'Why does this print all three days?', ['The cases are in the wrong order', 'Missing break statements cause fall-through', 'The variable is wrong', 'switch cannot use ints'], 1, 'Without break, execution falls through from case 1 into cases 2 and 3.', 'switch (day) {\n    case 1: std::cout << "Monday" << std::endl;\n    case 2: std::cout << "Tuesday" << std::endl;\n    case 3: std::cout << "Wednesday" << std::endl;\n}'),
    aq('cpp-a37', 'debugging', 'Loops', 'Why does this loop not double the vector elements?', ['The loop never runs', 'auto x is a copy; only auto& modifies the actual elements', 'The vector is const', 'The multiplication is wrong'], 1, 'Range-based for with auto copies each element, so modifying x does nothing to the vector. auto& binds a reference to the real element.', 'std::vector<int> v = {1, 2, 3};\nfor (auto x : v) { x *= 2; }'),
    aq('cpp-a38', 'debugging', 'Conditionals', 'Why does this always print "Pass"?', ['The condition is always true', 'score = 50 assigns 50 instead of comparing', 'The else is missing', 'The format is wrong'], 1, 'Assignment inside the condition sets score to 50, which is non-zero and therefore true. Use == or >=.', 'int score = 30;\nif (score = 50) std::cout << "Pass" << std::endl;\nelse std::cout << "Fail" << std::endl;'),
    aq('cpp-a39', 'debugging', 'Memory', 'What is the bug here?', ['new is too slow', 'The allocated memory is never freed, leaking it', 'The pointer is nullptr', 'The array is too small'], 1, 'Every new needs a matching delete; this program exits without freeing p.', 'int* p = new int(42);\nstd::cout << *p << std::endl;\nreturn 0;'),
    aq('cpp-a40', 'debugging', 'Exceptions', 'Why does the specific handler never run?', ['It is misspelled', 'The std::exception handler comes first and matches everything', 'The exception is not thrown', 'The try block is empty'], 1, 'Catch handlers are tried in order; std::exception matches all standard exceptions, so it must come last.', 'try {\n    throw std::out_of_range("bad index");\n} catch (const std::exception& e) {\n    std::cout << "general" << std::endl;\n} catch (const std::out_of_range& e) {\n    std::cout << "out of range" << std::endl;\n}')
  ],
  programmingExercises: [
    ex('cpp-assess-e1', 'Sum of even numbers', 'write-code', 'Read n, then n integers, and print the sum of the even ones.',
      '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    // read n numbers, print the sum of the even ones\n    return 0;\n}',
      '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        std::cin >> v[i];\n        if (v[i] % 2 == 0) sum += v[i];\n    }\n    std::cout << sum << std::endl;\n    return 0;\n}',
      'Loop over the numbers, adding only those where v % 2 == 0.',
      'O(n)', [tc('evens in 1..5', '5\n1 2 3 4 5\n', '6'), tc('no evens', '3\n1 3 5\n', '0', true)], h5(
        'An even number has remainder 0 when divided by 2.',
        'Read each value, test v % 2 == 0, and add it to the sum when true.',
        'int sum = 0; for (...) { int v; std::cin >> v; if (v % 2 == 0) sum += v; }',
        'If odd numbers are included, check the condition uses == 0 and not != 0.',
        'Solution: add v to sum only when v % 2 == 0. For 1 2 3 4 5 the even sum is 6.')),
    ex('cpp-assess-e2', 'Reverse a string', 'write-code', 'Read a single word and print it reversed. Use std::reverse or a loop.',
      '#include <iostream>\n#include <string>\n#include <algorithm>\n\nint main() {\n    std::string word;\n    // read a word, print it reversed\n    return 0;\n}',
      '#include <iostream>\n#include <string>\n#include <algorithm>\n\nint main() {\n    std::string word;\n    std::cin >> word;\n    std::reverse(word.begin(), word.end());\n    std::cout << word << std::endl;\n    return 0;\n}',
      'std::reverse reverses the string in place; printing it gives the reversed word.',
      'O(n)', [tc('reverse hello', 'hello\n', 'olleh'), tc('reverse C++', 'C++\n', '++C', true)], h5(
        'std::reverse flips a range in place.',
        'Read the word, call std::reverse(word.begin(), word.end()), then print it.',
        'std::reverse(word.begin(), word.end()); std::cout << word << std::endl;',
        'If the word is unchanged, check reverse was called before printing.',
        'Solution: std::reverse(word.begin(), word.end()); "hello" becomes "olleh".')),
    ex('cpp-assess-e3', 'Prime check', 'write-code', 'Read an integer n (n >= 2) and print "prime" if it is prime, otherwise print "not prime".',
      '#include <iostream>\n\nint main() {\n    int n;\n    // read n, print prime or not prime\n    return 0;\n}',
      '#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    bool is_prime = true;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) { is_prime = false; break; }\n    }\n    std::cout << (is_prime ? "prime" : "not prime") << std::endl;\n    return 0;\n}',
      'Test divisors from 2 up to the square root of n; any divisor means the number is not prime.',
      'O(sqrt(n))', [tc('7 is prime', '7\n', 'prime'), tc('9 is not prime', '9\n', 'not prime', true)], h5(
        'A prime has no divisors other than 1 and itself.',
        'Try dividing n by every i from 2 up to sqrt(n); if any divides evenly, n is not prime.',
        'for (int i = 2; i * i <= n; i++) if (n % i == 0) { is_prime = false; break; }',
        'If 9 prints "prime", check the loop condition reaches i = 3 (i * i <= n).',
        'Solution: test i from 2 while i * i <= n; if n % i == 0 the number is not prime. 7 is prime, 9 is not.')),
    ex('cpp-assess-e4', 'Second largest', 'write-code', 'Read n (n >= 2), then n integers, and print the second largest distinct value. Assume there are at least two distinct values.',
      '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    // read n numbers, print the second largest distinct value\n    return 0;\n}',
      '#include <iostream>\n#include <vector>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::vector<int> v(n);\n    for (int i = 0; i < n; i++) std::cin >> v[i];\n    int largest = v[0];\n    int second = v[0];\n    for (int x : v) {\n        if (x > largest) { second = largest; largest = x; }\n        else if (x > second && x < largest) { second = x; }\n    }\n    std::cout << second << std::endl;\n    return 0;\n}',
      'Track the largest and second largest values in one pass, updating both when a new largest appears.',
      'O(n)', [tc('second largest of 5', '5\n3 9 1 9 4\n', '4'), tc('second largest of 2', '2\n10 20\n', '10', true)], h5(
        'Keep two variables: the largest value seen and the second largest.',
        'When a value beats the largest, the old largest becomes the second largest.',
        'if (x > largest) { second = largest; largest = x; } else if (x > second && x < largest) second = x;',
        'If duplicates of the largest become the second largest, add the x < largest condition.',
        'Solution: one pass tracking largest and second. For 3 9 1 9 4 the second largest distinct value is 4.')),
    ex('cpp-assess-e5', 'Count vowels', 'write-code', 'Read a single word and print how many vowels (a, e, i, o, u, case-insensitive) it contains. Use std::count_if with a lambda.',
      '#include <iostream>\n#include <string>\n#include <algorithm>\n#include <cctype>\n\nint main() {\n    std::string word;\n    // read a word, print the vowel count\n    return 0;\n}',
      '#include <iostream>\n#include <string>\n#include <algorithm>\n#include <cctype>\n\nint main() {\n    std::string word;\n    std::cin >> word;\n    int count = std::count_if(word.begin(), word.end(), [](char c) {\n        char lower = static_cast<char>(std::tolower(static_cast<unsigned char>(c)));\n        return lower == \'a\' || lower == \'e\' || lower == \'i\' || lower == \'o\' || lower == \'u\';\n    });\n    std::cout << count << std::endl;\n    return 0;\n}',
      'count_if with a lambda counts characters that are vowels after lowercasing.',
      'O(n)', [tc('vowels in hello', 'hello\n', '2'), tc('vowels in AEIOU', 'AEIOU\n', '5', true)], h5(
        'The vowels are a, e, i, o, u; tolower makes the check case-insensitive.',
        'Use std::count_if with a lambda that lowercases the character and tests for a vowel.',
        'std::count_if(word.begin(), word.end(), [](char c) { char l = tolower(c); return l == \'a\' || ...; });',
        'If uppercase vowels are missed, check tolower is applied before the comparison.',
        'Solution: count_if with a lambda testing lowercased vowels. "hello" has 2 vowels and "AEIOU" has 5.'))
  ],
  capstone: {
    title: 'Build a Contact Manager',
    description: 'Build a complete command-line contact manager in modern C++ that stores contacts in a file, lets the user add, search, list, and delete contacts, and uses RAII throughout so it never leaks.',
    requirements: [
      'Define a Contact class with name, phone, and email, stored in a std::vector<Contact> owned by a ContactManager class',
      'Implement a menu loop with add, list, search by name, delete, and quit commands, using std::optional for search results',
      'Persist contacts to a text file on every change with std::ofstream and load them at startup with std::ifstream',
      'Validate input: reject empty names and phone numbers with non-digit characters, throwing std::invalid_argument on bad data',
      'Use smart pointers, std::string, and std::vector throughout; no raw new or delete anywhere in the code',
      'Compile warning-free with -std=c++17 -Wall -Wextra -Werror and run clean under AddressSanitizer'
    ],
    rubric: [
      'Correctness: all menu operations work and contacts survive a restart via the file',
      'Memory safety: no leaks, no use-after-free, no out-of-bounds access under sanitizers',
      'Code structure: classes with clear responsibilities, no function over 50 lines, headers and source files separated',
      'Modern C++: RAII, smart pointers, STL algorithms, and const correctness used throughout',
      'Quality: compiles warning-free with -Wall -Wextra -Werror and the code is readable with consistent style'
    ]
  }
};
