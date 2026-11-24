// CodeForge Academy — Mobile tracks (100-track expansion).
// Flutter (Dart), React Native, Android (Kotlin), iOS (SwiftUI), .NET MAUI (C#),
// Progressive Web Apps. Dart/Kotlin/Swift/C# exercises run where the toolchain
// exists and honestly report runtime_unavailable (503) in this sandbox;
// JavaScript exercises run on Node. Quiz exercises never touch the executor.
import { buildCourse, buildShortAssessment } from '../builder.js';
import type { Course, MasteryAssessment } from '../types.js';

export const TRACKS_MOBILE: Course[] = [
  buildCourse({
  "id": "flutter",
  "slug": "flutter",
  "language": "dart",
  "category": "mobile",
  "title": "Flutter",
  "description": "Build cross-platform mobile apps with Flutter and Dart: widgets, layouts, state, navigation, async data, forms and release builds.",
  "difficulty": "All levels",
  "estimatedHours": 20,
  "skills": [
    "Dart",
    "Flutter widgets",
    "Layouts",
    "State management",
    "Navigation",
    "Async data with FutureBuilder",
    "Forms and validation",
    "Widget testing",
    "Release builds"
  ],
  "prerequisites": [
    "Basic programming concepts"
  ],
  "modules": [
    {
      "id": "flutter-m1",
      "title": "Dart Foundations",
      "description": "The Dart language underneath every Flutter app: types, functions and null safety.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "flutter-m1-l1",
          "slug": "flutter-m1-l1",
          "title": "Dart Variables and Types",
          "objectives": [
            "Declare variables with var, final and const in Dart",
            "Distinguish int, double, String and bool",
            "Explain type inference and why Dart is soundly typed"
          ],
          "introduction": "Every Flutter widget is built from Dart values, so the language comes first: a variable that cannot change by accident is a bug that never ships.",
          "concept": "Dart variables carry a static type that the compiler checks before your app ever runs, which catches whole classes of mistakes at write time instead of on a user's phone. Declare a value with var and Dart infers the type from the first assignment, use final for a value set once and never reassigned, and use const for values fixed at compile time. The core types are int for whole numbers, double for decimals, String for text, bool for true/false, and List and Map for collections. Dart is soundly typed: a variable declared as int can never hold a String, so a type error is a compile error, not a crash in production.",
          "syntax": "var age = 30;\nfinal String name = 'Ada';\nconst double pi = 3.14159;",
          "analogy": "Dart types are like labelled jars in a pantry: the label tells you exactly what goes inside, and the compiler refuses to pour soup into the sugar jar.",
          "exampleCode": "var score = 0;\nfinal String player = 'Ada';\nconst int maxLives = 3;\ndouble average = (score + 10) / 2;\nprint('$player scored $score with $maxLives lives left');",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Declare score with var so its value can change as the game progresses.",
            "Mark player final because the name is set once and never reassigned.",
            "Use const for maxLives since the limit is fixed when the program is compiled.",
            "Interpolate variables into a string with $name inside a Dart string."
          ],
          "commonMistakes": [
            "Reassigning a final variable, which is a compile error because final means set once.",
            "Using var for a value that never changes, when final would document the intent.",
            "Forgetting that Dart strings use single quotes by convention and mixing quote styles inconsistently."
          ],
          "debugging": {
            "prompt": "The program should print the player name and score, but it fails to compile. Find the bug.",
            "buggyCode": "final String player = 'Ada';\nplayer = 'Grace';\nprint(player);",
            "fixedCode": "final String player = 'Ada';\nprint(player);",
            "explanation": "player is final, so it can only be assigned once. Remove the reassignment, or declare it with var if the name genuinely needs to change."
          },
          "miniChallenge": "Write a Dart program that declares a final String for your favourite city and a var int for its population, then prints both in one sentence.",
          "summary": "Dart gives every variable a static type; var infers it, final sets it once, and const fixes it at compile time, so type mistakes surface before the app runs.",
          "quiz": [
            {
              "question": "Which keyword declares a variable that can be assigned exactly once?",
              "options": [
                "var",
                "final",
                "late",
                "dynamic"
              ],
              "answer": 1,
              "explanation": "final allows one assignment; a second assignment is a compile error."
            },
            {
              "question": "What is the type of the value 3.5 in Dart?",
              "options": [
                "int",
                "num only",
                "double",
                "String"
              ],
              "answer": 2,
              "explanation": "Numbers with a decimal point are double; whole numbers are int."
            }
          ],
          "exercise": {
            "id": "flutter-m1-l1-e1",
            "title": "Greet a player",
            "type": "build-program",
            "instructions": "Read a player name and a score (one per line) and print exactly: <name> scored <score> points.",
            "starterCode": "import 'dart:io';\n\nvoid main() {\n  // read name and score, then print the greeting\n}\n",
            "solution": "import 'dart:io';\n\nvoid main() {\n  final String name = stdin.readLineSync() ?? '';\n  final int score = int.parse(stdin.readLineSync() ?? '0');\n  print('$name scored $score points.');\n}\n",
            "solutionExplanation": "readLineSync returns the name and the score text; int.parse converts the score, and string interpolation builds the sentence.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Ada",
                "stdin": "Ada\n42\n",
                "expectedStdout": "Ada scored 42 points.",
                "hidden": false
              },
              {
                "name": "Grace",
                "stdin": "Grace\n7\n",
                "expectedStdout": "Grace scored 7 points.",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Dart types are checked at compile time, so the declared type is a promise the compiler enforces.",
              "approach": "Decide first whether each value ever changes: never means const or final, sometimes means var.",
              "structure": "Declare the variable, then use $name inside the string to print it."
            }
          }
        },
        {
          "id": "flutter-m1-l2",
          "slug": "flutter-m1-l2",
          "title": "Functions and Null Safety",
          "objectives": [
            "Write Dart functions with named and optional parameters",
            "Explain how null safety prevents null crashes",
            "Use ? and ?? to handle nullable values safely"
          ],
          "introduction": "Null-pointer crashes are the most common mobile-app killer, and Dart was redesigned so the compiler makes them nearly impossible.",
          "concept": "Dart functions are first-class values: declare them with a return type, a name, and parameters, and call them like any other value. Null safety means a variable of type String can never be null, while String? explicitly allows null, so the compiler forces you to handle the null case before using the value. The ?? operator supplies a default when a nullable value is null, and ?. calls a method only when the value is not null. Named parameters in curly braces make call sites self-documenting, and required marks the ones callers must supply.",
          "syntax": "String greet({required String name, String title = 'friend'}) => 'Hello, $title $name';",
          "analogy": "Null safety is like a seatbelt sensor: the car will not start until everyone is buckled in, so the crash never gets a chance to happen.",
          "exampleCode": "String greet({required String name, String? nickname}) {\n  return 'Hello, ${nickname ?? name}!';\n}\nvoid main() {\n  print(greet(name: 'Ada'));\n  print(greet(name: 'Ada', nickname: 'Ace'));\n}",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Declare greet with a required named parameter name and an optional nullable nickname.",
            "Use ?? to fall back to name when nickname is null.",
            "Call greet with named arguments so each call reads clearly.",
            "Run the program and check both calls print the expected greeting."
          ],
          "commonMistakes": [
            "Using a nullable value without a null check, which the compiler rejects.",
            "Forgetting required on a named parameter and then wondering why callers omit it.",
            "Using ! to force-unwrap a null instead of handling it, which reintroduces the crash."
          ],
          "debugging": {
            "prompt": "The function should greet with the nickname when one exists, but it crashes on a null nickname. Find the bug.",
            "buggyCode": "String greet(String? nickname) {\n  return 'Hello, ' + nickname.toUpperCase() + '!';\n}",
            "fixedCode": "String greet(String? nickname) {\n  return 'Hello, ' + (nickname ?? 'friend').toUpperCase() + '!';\n}",
            "explanation": "nickname is nullable, so calling a method on it directly is unsafe. Use ?? to supply a default before calling toUpperCase."
          },
          "miniChallenge": "Write a function fullName that takes a required first name and an optional middle name, and returns the name with the middle name included only when it is not null.",
          "summary": "Dart functions support named and optional parameters, and null safety plus ?? and ?. make null values explicit so the compiler, not the user, finds the missing case.",
          "quiz": [
            {
              "question": "What does String? mean in Dart?",
              "options": [
                "A String that is always null",
                "A String that may be null",
                "A String with no characters",
                "A String constant"
              ],
              "answer": 1,
              "explanation": "The ? marks the type as nullable, so it may hold null."
            },
            {
              "question": "What does the ?? operator do?",
              "options": [
                "Compares two values for equality",
                "Returns the left value unless it is null, then the right value",
                "Makes a variable constant",
                "Throws an exception"
              ],
              "answer": 1,
              "explanation": "a ?? b evaluates to a when a is not null, otherwise b."
            }
          ],
          "exercise": {
            "id": "flutter-m1-l2-e1",
            "title": "Double or default",
            "type": "build-program",
            "instructions": "Read one line: either an integer or the word null. Print the doubled value, or 0 when the input is null.",
            "starterCode": "import 'dart:io';\n\nvoid main() {\n  // read the line, double it, or print 0 for null\n}\n",
            "solution": "import 'dart:io';\n\nint doubleOrZero(int? value) => (value ?? 0) * 2;\n\nvoid main() {\n  final String line = stdin.readLineSync() ?? '';\n  final int? value = line == 'null' ? null : int.parse(line);\n  print(doubleOrZero(value));\n}\n",
            "solutionExplanation": "The nullable int is handled with ?? inside doubleOrZero, so a null input safely becomes 0 before doubling.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Five",
                "stdin": "5\n",
                "expectedStdout": "10",
                "hidden": false
              },
              {
                "name": "Null input",
                "stdin": "null\n",
                "expectedStdout": "0",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A ? after a type means the value may be null, and the compiler will demand a check before use.",
              "approach": "Reach for ?? to supply a friendly default instead of forcing a null through with !.",
              "structure": "Write the function signature first, then the ?? fallback inside the return."
            }
          }
        }
      ]
    },
    {
      "id": "flutter-m2",
      "title": "Your First Flutter App",
      "description": "Widgets, the widget tree, and the MaterialApp shell every Flutter screen lives inside.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "flutter-m2-l1",
          "slug": "flutter-m2-l1",
          "title": "Widgets and the Widget Tree",
          "objectives": [
            "Explain that everything in Flutter is a widget",
            "Describe how widgets compose into a tree",
            "Identify the roles of build, context and the widget tree"
          ],
          "introduction": "Flutter has no separate layout language and no XML views: the entire screen is Dart code, and every pixel on it is a widget.",
          "concept": "In Flutter, a widget is an immutable description of part of the user interface: a Text widget describes text, a Container describes a box, and a Row describes children laid out side by side. Widgets nest inside each other to form a tree, and Flutter walks that tree to paint pixels on screen. Each widget has a build method that returns the widget below it, receiving a BuildContext that locates the widget in the tree. Because widgets are immutable, changing the screen means building a new widget description, which is why Flutter can rebuild the interface cheaply and often.",
          "syntax": "Widget build(BuildContext context) {\n  return Text('Hello, Flutter');\n}",
          "analogy": "A widget tree is like a set of Russian dolls: each doll holds smaller dolls, and the whole collection is the screen.",
          "exampleCode": "class Greeting extends StatelessWidget {\n  const Greeting({super.key});\n  @override\n  Widget build(BuildContext context) {\n    return const Center(\n      child: Text('Hello, Flutter'),\n    );\n  }\n}",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Create a widget class that extends StatelessWidget for a screen that never changes.",
            "Override build and return the widget that describes the screen.",
            "Nest a Text inside a Center so the text sits in the middle of the screen.",
            "Mark the widget const where possible so Flutter can reuse it."
          ],
          "commonMistakes": [
            "Trying to mutate a widget after building it, when widgets are immutable by design.",
            "Forgetting the build method or returning nothing from it.",
            "Confusing the widget tree (descriptions) with the render tree (pixels) when debugging layout."
          ],
          "debugging": {
            "prompt": "The widget should show centred text, but nothing appears on screen. Find the bug.",
            "buggyCode": "Widget build(BuildContext context) {\n  Center(child: Text('Hi'));\n}",
            "fixedCode": "Widget build(BuildContext context) {\n  return Center(child: Text('Hi'));\n}",
            "explanation": "build must return the widget it creates; without return, the method produces nothing and the screen stays empty."
          },
          "miniChallenge": "Write a widget that shows your name in a Text widget wrapped in a Center widget, with a build method that returns it.",
          "summary": "Flutter screens are trees of immutable widgets; each widget's build method returns the widgets below it, and Flutter renders the tree.",
          "quiz": [
            {
              "question": "What does a widget's build method do?",
              "options": [
                "It downloads assets",
                "It returns the widget tree below it",
                "It saves data to disk",
                "It starts the app"
              ],
              "answer": 1,
              "explanation": "build returns the widgets that describe this part of the screen."
            },
            {
              "question": "Why are widgets immutable in Flutter?",
              "options": [
                "To save memory only",
                "So the framework can rebuild the UI cheaply from new descriptions",
                "Because Dart has no mutable types",
                "To prevent all animations"
              ],
              "answer": 1,
              "explanation": "Immutable descriptions let Flutter discard and rebuild the tree cheaply whenever state changes."
            }
          ],
          "exercise": {
            "id": "flutter-m2-l1-e1",
            "title": "Widget tree order",
            "type": "multiple-choice",
            "instructions": "A screen shows a Center containing a Column containing two Text widgets. Which statement about the widget tree is true?",
            "starterCode": "Center(\n  child: Column(\n    children: [Text('A'), Text('B')],\n  ),\n)",
            "solution": "The Column is the child of the Center, and both Text widgets are children of the Column.",
            "solutionExplanation": "The Column is the child of the Center, and both Text widgets are children of the Column: the tree nests exactly as the code nests, with each widget owning the widgets passed to it.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "The Column is the child of the Center, and both Text widgets are children of the Column.",
                "hidden": false
              }
            ],
            "options": [
              "The Text widgets are siblings of the Center",
              "The Column is the child of the Center, and both Text widgets are children of the Column",
              "The Center is a child of the Text widgets",
              "Column and Center are unrelated widgets"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "A widget is an immutable description, not the pixels themselves; build returns the next layer down.",
              "approach": "Start from the outermost widget and nest inward: Center holds Text, not the other way round.",
              "structure": "Write the class, override build, and return the nested widget."
            }
          }
        },
        {
          "id": "flutter-m2-l2",
          "slug": "flutter-m2-l2",
          "title": "StatelessWidget and MaterialApp",
          "objectives": [
            "Build a screen with StatelessWidget",
            "Explain what MaterialApp provides to an app",
            "Use Scaffold, AppBar and Text to compose a first screen"
          ],
          "introduction": "A real app needs more than one widget: MaterialApp supplies the theme, navigation and Material styling that every screen shares.",
          "concept": "MaterialApp is the root widget of most Flutter apps: it configures the app title, the theme colours and text styles, the home screen, and the navigation system. Inside it, a Scaffold provides the standard Material screen structure with an app bar, a body, and optional drawers or floating buttons. A StatelessWidget is the right choice for any screen whose appearance depends only on the values passed into its constructor, because it has no mutable state of its own. Together they form the skeleton of nearly every Flutter screen: MaterialApp at the root, a Scaffold for structure, and small StatelessWidgets for content.",
          "syntax": "MaterialApp(\n  home: Scaffold(\n    appBar: AppBar(title: Text('Hello')),\n    body: Center(child: Text('Welcome')),\n  ),\n)",
          "analogy": "MaterialApp is like the frame and wiring of a house: you never see it directly, but every room depends on it for power, water and structure.",
          "exampleCode": "void main() => runApp(const MyApp());\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'Greetings',\n      home: Scaffold(\n        appBar: AppBar(title: const Text('Greetings')),\n        body: const Center(child: Text('Welcome to Flutter')),\n      ),\n    );\n  }\n}",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Call runApp with your root widget in main to start the app.",
            "Return a MaterialApp from the root widget with a title and a home screen.",
            "Place a Scaffold inside home to get the app bar and body structure.",
            "Put the screen content in the Scaffold body, centred with a Center widget."
          ],
          "commonMistakes": [
            "Forgetting runApp, so the app compiles but shows a blank screen.",
            "Using a Scaffold outside a MaterialApp, which loses the theme and navigation.",
            "Rebuilding the whole MaterialApp when only one screen needs to change."
          ],
          "debugging": {
            "prompt": "The app should show an app bar titled \"Greetings\", but the bar is missing. Find the bug.",
            "buggyCode": "MaterialApp(\n  home: Center(child: Text('Welcome')),\n)",
            "fixedCode": "MaterialApp(\n  home: Scaffold(\n    appBar: AppBar(title: Text('Greetings')),\n    body: Center(child: Text('Welcome')),\n  ),\n)",
            "explanation": "The app bar comes from the Scaffold, not from MaterialApp; without a Scaffold there is nowhere for the AppBar to live."
          },
          "miniChallenge": "Build a MaterialApp whose home is a Scaffold with an AppBar titled with your name and a body Text saying hello.",
          "summary": "MaterialApp configures the whole app and Scaffold provides the screen structure; StatelessWidget builds screens that depend only on their constructor values.",
          "quiz": [
            {
              "question": "What does MaterialApp provide to a Flutter app?",
              "options": [
                "Only the app icon",
                "Theme, navigation and the Material design system",
                "Database storage",
                "Push notifications"
              ],
              "answer": 1,
              "explanation": "MaterialApp wires up theming, routing and Material defaults for the whole app."
            },
            {
              "question": "When should you choose a StatelessWidget?",
              "options": [
                "When the screen changes over time",
                "When the UI depends only on constructor values and never changes itself",
                "When you need animations",
                "When the app fetches data"
              ],
              "answer": 1,
              "explanation": "StatelessWidget has no mutable state, so it fits screens that never change on their own."
            }
          ],
          "exercise": {
            "id": "flutter-m2-l2-e1",
            "title": "What does runApp do?",
            "type": "predict-output",
            "instructions": "What happens when main() calls runApp(const MyApp())?",
            "starterCode": "void main() => runApp(const MyApp());",
            "solution": "Flutter inflates MyApp, builds its widget tree, and renders it on screen.",
            "solutionExplanation": "runApp attaches the given widget as the root of the widget tree and asks Flutter to render it; without runApp nothing is drawn.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Flutter inflates MyApp, builds its widget tree, and renders it on screen.",
                "hidden": false
              }
            ],
            "options": [
              "It compiles the app to native code",
              "Flutter inflates MyApp, builds its widget tree, and renders it on screen",
              "It downloads the Flutter SDK",
              "It opens the app store listing"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "MaterialApp is the root: theme and navigation live there, the screen lives in home.",
              "approach": "Put the AppBar inside a Scaffold, and the Scaffold inside MaterialApp home.",
              "structure": "main calls runApp, the root returns MaterialApp, home returns Scaffold."
            }
          }
        }
      ]
    },
    {
      "id": "flutter-m3",
      "title": "Layouts and Interaction",
      "description": "Rows, columns, flex layout and the stateful widgets that respond to taps.",
      "level": "intermediate",
      "order": 3,
      "lessons": [
        {
          "id": "flutter-m3-l1",
          "slug": "flutter-m3-l1",
          "title": "Rows, Columns and Flex Layout",
          "objectives": [
            "Lay out children with Row and Column",
            "Control spacing with MainAxisAlignment and CrossAxisAlignment",
            "Use Expanded and Flexible to share space"
          ],
          "introduction": "A phone screen is a narrow rectangle, so most Flutter layout is deciding how widgets share a row or a column.",
          "concept": "Row lays its children out horizontally and Column lays them out vertically, and both are flex widgets: they hand out space along a main axis and align children along a cross axis. MainAxisAlignment controls spacing along the main axis, for example spaceBetween or center, while CrossAxisAlignment controls alignment across it, such as start or stretch. A child wrapped in Expanded takes a share of the remaining free space, with flex values deciding the proportions, while Flexible lets a child size itself within its share. Getting layout right means thinking in axes: pick the widget, pick the axis, then pick the alignment.",
          "syntax": "Row(\n  mainAxisAlignment: MainAxisAlignment.spaceBetween,\n  children: [Text('Left'), Text('Right')],\n)",
          "analogy": "Row and Column are like shelves and bookcases: the shelf is the axis, and alignment decides whether the books sit left, centred, or spread out.",
          "exampleCode": "Column(\n  mainAxisAlignment: MainAxisAlignment.center,\n  crossAxisAlignment: CrossAxisAlignment.stretch,\n  children: [\n    const Text('Username'),\n    const TextField(),\n    Expanded(child: Container(color: Colors.blue)),\n  ],\n)",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Choose Column when children stack vertically and Row when they sit side by side.",
            "Set mainAxisAlignment to spread or centre children along the main axis.",
            "Set crossAxisAlignment to stretch children across the other axis.",
            "Wrap a child in Expanded to give it a share of the leftover space."
          ],
          "commonMistakes": [
            "Putting an Expanded directly inside a Column that is itself inside a scrollable, which has unbounded height.",
            "Mixing up main and cross axes when switching between Row and Column.",
            "Nesting Rows inside Rows without Expanded, causing overflow errors on narrow screens."
          ],
          "debugging": {
            "prompt": "The layout overflows with a yellow-and-black striped warning on the right edge. Find the bug.",
            "buggyCode": "Row(children: [Text('A very long piece of text that never ends'), Text('B')])",
            "fixedCode": "Row(children: [Expanded(child: Text('A very long piece of text that never ends')), Text('B')])",
            "explanation": "The long Text takes unlimited width inside a Row, so the row overflows. Wrapping it in Expanded caps it at the remaining space and lets it wrap."
          },
          "miniChallenge": "Build a Column with three Text widgets spaced evenly and stretched to full width, then wrap the middle one in an Expanded inside a fixed-height Container.",
          "summary": "Row and Column distribute children along a main axis and align them on a cross axis; Expanded hands out leftover space in flex proportions.",
          "quiz": [
            {
              "question": "In a Column, which axis is the main axis?",
              "options": [
                "Horizontal",
                "Vertical",
                "Diagonal",
                "Depth"
              ],
              "answer": 1,
              "explanation": "A Column stacks children vertically, so vertical is its main axis."
            },
            {
              "question": "What does wrapping a child in Expanded do?",
              "options": [
                "It hides the child",
                "It gives the child a share of the remaining free space",
                "It makes the child scrollable",
                "It removes the child from the tree"
              ],
              "answer": 1,
              "explanation": "Expanded takes leftover space along the flex widget's main axis, split by flex values."
            }
          ],
          "exercise": {
            "id": "flutter-m3-l1-e1",
            "title": "Flex proportions",
            "type": "multiple-choice",
            "instructions": "A Row has two Expanded children, one with flex 1 and one with flex 3, in a 400-pixel-wide row. How wide is each child?",
            "starterCode": "Row(children: [\n  Expanded(flex: 1, child: Container()),\n  Expanded(flex: 3, child: Container()),\n])",
            "solution": "100 pixels and 300 pixels.",
            "solutionExplanation": "The flex values total 4, so each unit is 100 pixels: flex 1 takes 100 and flex 3 takes 300.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "100 pixels and 300 pixels.",
                "hidden": false
              }
            ],
            "options": [
              "200 pixels each",
              "100 pixels and 300 pixels",
              "133 and 267 pixels",
              "400 pixels and 0 pixels"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Think in axes: the main axis is the direction children stack, the cross axis is the other one.",
              "approach": "Overflow on a narrow screen usually means a child needs Expanded to cap its size.",
              "structure": "Pick Row or Column, set the two alignments, then wrap the flexible child in Expanded."
            }
          }
        },
        {
          "id": "flutter-m3-l2",
          "slug": "flutter-m3-l2",
          "title": "StatefulWidget and setState",
          "objectives": [
            "Explain the difference between ephemeral and app state",
            "Build a StatefulWidget with a State class",
            "Trigger rebuilds correctly with setState"
          ],
          "introduction": "A counter that never counts is a broken app: state is what turns a static picture into a program that responds.",
          "concept": "A StatefulWidget splits into two classes: the widget itself, which is immutable and holds configuration, and a State object, which is mutable and lives as long as the widget is on screen. When something changes, you call setState with a function that mutates the state, and Flutter marks the widget dirty and rebuilds it on the next frame. Everything outside setState that changes state will not trigger a rebuild, so the screen silently shows stale data. Ephemeral state, like the current tab or a text field value, belongs in the widget; shared app state belongs higher up, in a state management solution.",
          "syntax": "setState(() {\n  _counter++;\n});",
          "analogy": "setState is like ringing a bell after rearranging furniture: the room only gets repainted once the bell tells the painter something changed.",
          "exampleCode": "class Counter extends StatefulWidget {\n  const Counter({super.key});\n  @override\n  State<Counter> createState() => _CounterState();\n}\n\nclass _CounterState extends State<Counter> {\n  int _count = 0;\n  @override\n  Widget build(BuildContext context) {\n    return Column(\n      children: [\n        Text('Count: $_count'),\n        ElevatedButton(\n          onPressed: () => setState(() => _count++),\n          child: const Text('Add one'),\n        ),\n      ],\n    );\n  }\n}",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Create a StatefulWidget and a matching State class via createState.",
            "Store the mutable value, such as _count, as a field of the State class.",
            "Wrap every mutation of that value in setState so Flutter rebuilds.",
            "Read the state value in build so the new value appears on screen."
          ],
          "commonMistakes": [
            "Mutating state without setState, so the value changes but the screen does not.",
            "Calling setState after the widget has been disposed, which throws an error.",
            "Storing mutable state on the widget class instead of the State class."
          ],
          "debugging": {
            "prompt": "Tapping the button increments the counter variable, but the number on screen never changes. Find the bug.",
            "buggyCode": "onPressed: () { _count++; },",
            "fixedCode": "onPressed: () { setState(() { _count++; }); },",
            "explanation": "Changing _count without setState leaves Flutter unaware of the change, so no rebuild happens and the old text stays on screen."
          },
          "miniChallenge": "Turn the counter into a stepper with two buttons, one adding and one subtracting, both updating through setState, and never letting the count go below zero.",
          "summary": "StatefulWidget pairs an immutable widget with a mutable State object; setState marks the widget dirty and Flutter rebuilds it with the new values.",
          "quiz": [
            {
              "question": "Where does mutable state live in a StatefulWidget?",
              "options": [
                "On the widget class",
                "In the State object returned by createState",
                "In the BuildContext",
                "In main()"
              ],
              "answer": 1,
              "explanation": "The State object persists while the widget is mounted and holds the mutable fields."
            },
            {
              "question": "What happens if you change a state field without calling setState?",
              "options": [
                "The screen rebuilds anyway",
                "The value changes but the screen keeps showing the old value",
                "The app crashes immediately",
                "The widget is removed"
              ],
              "answer": 1,
              "explanation": "Flutter only rebuilds widgets marked dirty by setState, so the UI stays stale."
            }
          ],
          "exercise": {
            "id": "flutter-m3-l2-e1",
            "title": "Counter commands",
            "type": "build-program",
            "instructions": "Simulate a Flutter counter: read lines of commands INC, DEC or RESET (one per line) starting from 0, never going below 0, and print the final count.",
            "starterCode": "import 'dart:io';\n\nvoid main() {\n  // read commands, update the counter like setState would\n}\n",
            "solution": "import 'dart:io';\n\nvoid main() {\n  int count = 0;\n  String? line;\n  while ((line = stdin.readLineSync()) != null) {\n    if (line == 'INC') {\n      count++;\n    } else if (line == 'DEC') {\n      if (count > 0) count--;\n    } else if (line == 'RESET') {\n      count = 0;\n    }\n  }\n  print(count);\n}\n",
            "solutionExplanation": "Each command mutates count the way setState would, DEC clamps at zero, and the final value is printed once.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "INC\nINC\nDEC\nINC\n",
                "expectedStdout": "2",
                "hidden": false
              },
              {
                "name": "Clamped",
                "stdin": "DEC\nDEC\nINC\nRESET\nINC\n",
                "expectedStdout": "1",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "State lives in the State class, and only setState tells Flutter to rebuild.",
              "approach": "Every mutation of a state field belongs inside a setState callback.",
              "structure": "Button press calls setState, setState mutates the field, build reads the new value."
            }
          }
        }
      ]
    },
    {
      "id": "flutter-m4",
      "title": "Navigation and Data",
      "description": "Moving between screens and loading data asynchronously without freezing the UI.",
      "level": "intermediate",
      "order": 4,
      "lessons": [
        {
          "id": "flutter-m4-l1",
          "slug": "flutter-m4-l1",
          "title": "Navigation and Routes",
          "objectives": [
            "Push and pop screens with Navigator",
            "Pass arguments to a new route",
            "Compare named routes with on-the-fly MaterialPageRoute"
          ],
          "introduction": "No real app fits on one screen: navigation is the map that lets users move between screens and back again.",
          "concept": "Flutter navigation is a stack of routes managed by the Navigator: pushing a route slides a new screen on top, and popping it returns to the screen below. Navigator.push takes a MaterialPageRoute whose builder returns the new screen widget, and Navigator.pop removes the top route, optionally returning a result value to the screen that pushed it. Arguments travel inside the pushed widget's constructor, which keeps them type-safe, while named routes register screens in a table and navigate by string name. The back button and the system gesture both pop the stack, so the navigation history always matches what the user sees.",
          "syntax": "Navigator.push(\n  context,\n  MaterialPageRoute(builder: (context) => DetailScreen(item: item)),\n);",
          "analogy": "The Navigator stack is like a pile of plates: you add one on top to open a screen and lift it off to go back.",
          "exampleCode": "ElevatedButton(\n  onPressed: () {\n    Navigator.push(\n      context,\n      MaterialPageRoute(\n        builder: (context) => DetailScreen(title: 'Ada'),\n      ),\n    );\n  },\n  child: const Text('Open details'),\n)",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Call Navigator.push with the current BuildContext when the user taps a button.",
            "Build a MaterialPageRoute whose builder returns the destination screen.",
            "Pass data through the destination widget's constructor.",
            "Call Navigator.pop on the detail screen to return, optionally with a result."
          ],
          "commonMistakes": [
            "Using a BuildContext that is no longer in the tree, for example after an await.",
            "Pushing the same screen repeatedly instead of replacing it when the flow should not stack.",
            "Forgetting to pass required arguments, which the compiler catches but beginners misread."
          ],
          "debugging": {
            "prompt": "Tapping the button should open the detail screen, but nothing happens and an error mentions a deactivated context. Find the bug.",
            "buggyCode": "onPressed: () async {\n  await Future.delayed(const Duration(seconds: 1));\n  Navigator.push(context, MaterialPageRoute(builder: (_) => DetailScreen()));\n}",
            "fixedCode": "onPressed: () async {\n  await Future.delayed(const Duration(seconds: 1));\n  if (!context.mounted) return;\n  Navigator.push(context, MaterialPageRoute(builder: (_) => DetailScreen()));\n}",
            "explanation": "After an await the widget may have been removed, so its context is deactivated. Check context.mounted before using it."
          },
          "miniChallenge": "Add a second screen that receives a product name, shows it in an AppBar, and returns \"bought\" when the user taps a Buy button.",
          "summary": "Navigator manages a stack of routes; push adds a screen, pop removes it, and arguments travel through the destination widget's constructor.",
          "quiz": [
            {
              "question": "What does Navigator.push do?",
              "options": [
                "It deletes the current screen",
                "It adds a new route on top of the navigation stack",
                "It closes the app",
                "It reloads the whole app"
              ],
              "answer": 1,
              "explanation": "Push adds a route; the previous screen stays underneath and returns when the new one pops."
            },
            {
              "question": "How should data reach a pushed screen?",
              "options": [
                "Through a global variable only",
                "Through the destination widget constructor or route arguments",
                "By editing the source file",
                "It cannot be passed"
              ],
              "answer": 1,
              "explanation": "Passing data via the constructor keeps it type-safe and explicit."
            }
          ],
          "exercise": {
            "id": "flutter-m4-l1-e1",
            "title": "Back button behaviour",
            "type": "multiple-choice",
            "instructions": "The navigation stack is [Home, List, Detail]. The user presses the system back button once. Which screen is visible?",
            "starterCode": "Navigator stack: [Home, List, Detail]  // Detail is on top",
            "solution": "List.",
            "solutionExplanation": "Back pops the top route, so Detail is removed and List, the route underneath, becomes visible.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "List.",
                "hidden": false
              }
            ],
            "options": [
              "Home",
              "List",
              "Detail",
              "The app closes"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Navigation is a stack: push adds a screen on top, pop takes it off.",
              "approach": "Check context.mounted after any await before navigating with that context.",
              "structure": "Push with a MaterialPageRoute whose builder returns the destination widget."
            }
          }
        },
        {
          "id": "flutter-m4-l2",
          "slug": "flutter-m4-l2",
          "title": "Lists, Futures and Async Data",
          "objectives": [
            "Build efficient lists with ListView.builder",
            "Explain what a Future is in Dart",
            "Show loading, error and data states with FutureBuilder"
          ],
          "introduction": "A list of a thousand items cannot all live on screen at once, and network data never arrives instantly: both problems have one Flutter answer.",
          "concept": "ListView.builder only builds the list items currently visible on screen, calling its itemBuilder lazily as the user scrolls, which keeps even huge lists fast. A Future in Dart represents a value that will arrive later, such as an HTTP response; await pauses the function until it completes without blocking the interface. FutureBuilder is a widget that listens to a Future and rebuilds itself through three states: waiting, where you show a spinner; error, where you show a message; and done, where you show the data. Storing the Future in a state field stops it from restarting every time the widget rebuilds.",
          "syntax": "FutureBuilder<List<String>>(\n  future: _itemsFuture,\n  builder: (context, snapshot) {\n    if (snapshot.hasData) return ListView.builder(...);\n    return const CircularProgressIndicator();\n  },\n)",
          "analogy": "FutureBuilder is like a waiter who checks the kitchen: still cooking means a spinner, a burnt dish means an apology, and a ready dish means dinner is served.",
          "exampleCode": "FutureBuilder<List<String>>(\n  future: fetchItems(),\n  builder: (context, snapshot) {\n    if (snapshot.connectionState == ConnectionState.waiting) {\n      return const CircularProgressIndicator();\n    }\n    if (snapshot.hasError) {\n      return Text('Error: ${snapshot.error}');\n    }\n    final items = snapshot.data ?? [];\n    return ListView.builder(\n      itemCount: items.length,\n      itemBuilder: (context, i) => ListTile(title: Text(items[i])),\n    );\n  },\n)",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Create the Future once in initState and store it in a field.",
            "Pass it to FutureBuilder and check the connection state first.",
            "Show a progress indicator while waiting and an error message on failure.",
            "Render the data with ListView.builder once snapshot.hasData is true."
          ],
          "commonMistakes": [
            "Creating the Future inside build, so every rebuild refetches the data.",
            "Forgetting the error state, so a failed request leaves a permanent spinner.",
            "Using a plain ListView with thousands of children instead of the lazy builder."
          ],
          "debugging": {
            "prompt": "The list fetches its data again on every rebuild, flickering back to the loading spinner. Find the bug.",
            "buggyCode": "Widget build(BuildContext context) {\n  return FutureBuilder(future: fetchItems(), builder: ...);\n}",
            "fixedCode": "late final Future<List<String>> _itemsFuture;\n@override\nvoid initState() {\n  super.initState();\n  _itemsFuture = fetchItems();\n}\nWidget build(BuildContext context) {\n  return FutureBuilder(future: _itemsFuture, builder: ...);\n}",
            "explanation": "Calling fetchItems inside build creates a new Future on every rebuild. Create it once in initState and reuse the stored Future."
          },
          "miniChallenge": "Build a screen that loads a list of five names from a Future, shows a spinner while waiting, and renders them in a ListView.builder.",
          "summary": "ListView.builder lazily builds only visible rows, and FutureBuilder renders loading, error and data states from a single stored Future.",
          "quiz": [
            {
              "question": "Why is ListView.builder faster than a plain ListView for long lists?",
              "options": [
                "It downloads items faster",
                "It only builds the items currently visible",
                "It uses less network",
                "It caches images"
              ],
              "answer": 1,
              "explanation": "The builder is lazy: off-screen items are not built until the user scrolls to them."
            },
            {
              "question": "Why store a Future in a state field instead of creating it in build?",
              "options": [
                "It is required by law",
                "Creating it in build refetches on every rebuild",
                "Fields are faster to type",
                "Futures cannot be created in build"
              ],
              "answer": 1,
              "explanation": "build runs on every rebuild, so a Future created there restarts the async work each time."
            }
          ],
          "exercise": {
            "id": "flutter-m4-l2-e1",
            "title": "FutureBuilder states",
            "type": "predict-output",
            "instructions": "A FutureBuilder receives a Future that is still running. What does its builder return in the example code?",
            "starterCode": "if (snapshot.connectionState == ConnectionState.waiting) {\n  return const CircularProgressIndicator();\n}",
            "solution": "A CircularProgressIndicator spinner.",
            "solutionExplanation": "While the Future is running the connection state is waiting, so the builder returns the progress indicator.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "A CircularProgressIndicator spinner.",
                "hidden": false
              }
            ],
            "options": [
              "The data list",
              "A CircularProgressIndicator spinner",
              "An error message",
              "An empty container"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "A Future is a value that arrives later; FutureBuilder renders a widget per state.",
              "approach": "Create the Future once in initState and store it, never inside build.",
              "structure": "Check waiting, then error, then data, and hand the data to ListView.builder."
            }
          }
        }
      ]
    },
    {
      "id": "flutter-m5",
      "title": "State, Persistence and Polish",
      "description": "Shared state, forms, testing and shipping the app to real users.",
      "level": "advanced",
      "order": 5,
      "lessons": [
        {
          "id": "flutter-m5-l1",
          "slug": "flutter-m5-l1",
          "title": "State Management with Provider",
          "objectives": [
            "Explain why state shared across screens needs a manager",
            "Provide a ChangeNotifier with Provider",
            "Rebuild only the widgets that listen to the state"
          ],
          "introduction": "When two screens must agree on the same shopping cart, local setState is not enough: the state has to live above both of them.",
          "concept": "Provider lifts state above the widgets that use it: a ChangeNotifier holds the data and the methods that change it, and calls notifyListeners whenever a change happens. ChangeNotifierProvider creates the model near the top of the tree, and widgets read it with context.watch to rebuild when it changes, or context.read when they only need to call a method once. Widgets that watch rebuild on every notification, so keeping the watched part small keeps the app fast. Provider is deliberately simple: it is InheritedWidget with less boilerplate, and it scales well for small and medium apps before heavier solutions earn their complexity.",
          "syntax": "ChangeNotifierProvider(\n  create: (_) => CartModel(),\n  child: const MyApp(),\n)",
          "analogy": "Provider is like a noticeboard in a shared office: anyone can read it, updates are posted once, and only the people watching that board react.",
          "exampleCode": "class CartModel extends ChangeNotifier {\n  final List<String> _items = [];\n  List<String> get items => List.unmodifiable(_items);\n  void add(String item) {\n    _items.add(item);\n    notifyListeners();\n  }\n}\n\n// In the UI:\nText('Items: ${context.watch<CartModel>().items.length}')",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Create a ChangeNotifier class holding the shared data and mutation methods.",
            "Call notifyListeners at the end of every method that changes the data.",
            "Provide the model above the widgets that need it with ChangeNotifierProvider.",
            "Use context.watch where the UI must rebuild and context.read inside button handlers."
          ],
          "commonMistakes": [
            "Calling context.watch inside a button handler, which rebuilds the button unnecessarily.",
            "Forgetting notifyListeners, so the model changes but no widget rebuilds.",
            "Providing the model below a widget that tries to read it, which throws a ProviderNotFound error."
          ],
          "debugging": {
            "prompt": "Adding an item updates the cart model, but the item count on screen never changes. Find the bug.",
            "buggyCode": "void add(String item) {\n  _items.add(item);\n}",
            "fixedCode": "void add(String item) {\n  _items.add(item);\n  notifyListeners();\n}",
            "explanation": "Listeners only rebuild when notifyListeners is called; mutating the list alone leaves every watching widget unaware."
          },
          "miniChallenge": "Build a theme model with Provider that toggles between light and dark mode from an AppBar button, and have the MaterialApp theme follow it.",
          "summary": "Provider shares a ChangeNotifier above the widgets that need it; notifyListeners rebuilds exactly the widgets watching that model.",
          "quiz": [
            {
              "question": "What does notifyListeners do?",
              "options": [
                "It saves data to disk",
                "It tells watching widgets to rebuild",
                "It deletes the model",
                "It navigates to a new screen"
              ],
              "answer": 1,
              "explanation": "Widgets that watch the model rebuild when notifyListeners fires after a change."
            },
            {
              "question": "When should a widget use context.read instead of context.watch?",
              "options": [
                "When it must rebuild on changes",
                "When it only needs to call a method once, without rebuilding",
                "When it is the root widget",
                "Never"
              ],
              "answer": 1,
              "explanation": "read fetches the model once without subscribing, which fits event handlers."
            }
          ],
          "exercise": {
            "id": "flutter-m5-l1-e1",
            "title": "Provider scope",
            "type": "multiple-choice",
            "instructions": "A ChangeNotifierProvider wraps the Home screen only. A Settings screen pushed on top tries to read the model. What happens?",
            "starterCode": "MaterialApp(home: ChangeNotifierProvider(create: (_) => CartModel(), child: HomeScreen()))",
            "solution": "It works, because a pushed route is still below the provider in the tree.",
            "solutionExplanation": "Pushed routes are descendants of the home screen in the widget tree, so the provider above Home is also above the pushed Settings screen.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "It works, because a pushed route is still below the provider in the tree.",
                "hidden": false
              }
            ],
            "options": [
              "A ProviderNotFound error, because the provider is on another screen",
              "It works, because a pushed route is still below the provider in the tree",
              "The app restarts",
              "The model is duplicated"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Shared state lives above its users in a ChangeNotifier, and notifyListeners is the signal.",
              "approach": "Watch where the UI displays the value, read where a button only triggers a change.",
              "structure": "Model with notifyListeners, provider above the app, watch in the UI."
            }
          }
        },
        {
          "id": "flutter-m5-l2",
          "slug": "flutter-m5-l2",
          "title": "Forms and Input Validation",
          "objectives": [
            "Build a form with a GlobalKey and Form widget",
            "Validate input with validator functions",
            "Show errors and save valid input safely"
          ],
          "introduction": "A sign-up form that accepts an empty password is a security bug wearing a friendly face: validation is the gatekeeper.",
          "concept": "Flutter forms group text fields under a Form widget identified by a GlobalKey, which lets the app validate and save every field at once. Each TextFormField takes a validator function that receives the current text and returns an error message, or null when the value is acceptable. Calling formKey.currentState?.validate runs every validator and shows the error messages inline; only when all return null should the app call save and submit the data. Validators run on demand and optionally on every change, so users get feedback as they type without the form nagging them before they start.",
          "syntax": "TextFormField(\n  validator: (value) => value == null || value.isEmpty ? 'Required' : null,\n)",
          "analogy": "A validator is like a bouncer checking tickets: no ticket, no entry, and the reason is printed on the door for everyone to read.",
          "exampleCode": "final _formKey = GlobalKey<FormState>();\n\nForm(\n  key: _formKey,\n  child: Column(\n    children: [\n      TextFormField(\n        validator: (value) =>\n            value == null || value.length < 6 ? 'Password needs 6+ characters' : null,\n      ),\n      ElevatedButton(\n        onPressed: () {\n          if (_formKey.currentState?.validate() ?? false) {\n            // submit the form\n          }\n        },\n        child: const Text('Sign up'),\n      ),\n    ],\n  ),\n)",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Create a GlobalKey<FormState> and attach it to the Form widget.",
            "Give each TextFormField a validator that returns an error string or null.",
            "Call validate on the form state when the submit button is pressed.",
            "Only submit when validate returns true, meaning every field passed."
          ],
          "commonMistakes": [
            "Returning an empty string from a validator instead of null, which counts as an error.",
            "Calling validate on the wrong key, so nothing is ever checked.",
            "Validating on every keystroke from the start, which shows errors before the user types."
          ],
          "debugging": {
            "prompt": "The form submits even when the password field is empty. Find the bug.",
            "buggyCode": "onPressed: () {\n  _formKey.currentState?.save();\n  submit();\n}",
            "fixedCode": "onPressed: () {\n  if (_formKey.currentState?.validate() ?? false) {\n    _formKey.currentState?.save();\n    submit();\n  }\n}",
            "explanation": "save runs without checking validity, so empty values are submitted. Call validate first and only save and submit when it returns true."
          },
          "miniChallenge": "Build a login form with email and password fields: the email validator requires an @ sign and the password validator requires at least 8 characters.",
          "summary": "A Form with a GlobalKey validates all its fields at once; each validator returns an error message or null, and the app submits only when every validator passes.",
          "quiz": [
            {
              "question": "What does a validator return when the input is valid?",
              "options": [
                "An empty string",
                "null",
                "true",
                "The input itself"
              ],
              "answer": 1,
              "explanation": "Validators return null for valid input and an error message string for invalid input."
            },
            {
              "question": "What does formKey.currentState?.validate() do?",
              "options": [
                "It clears all fields",
                "It runs every validator and returns true only if all pass",
                "It submits the form to a server",
                "It rebuilds the app"
              ],
              "answer": 1,
              "explanation": "validate runs each field validator, shows the errors, and reports whether the whole form is valid."
            }
          ],
          "exercise": {
            "id": "flutter-m5-l2-e1",
            "title": "Validate a signup",
            "type": "build-program",
            "instructions": "Read a username and a password (one per line). Print VALID only when the username is at least 3 characters and the password is at least 6 characters; otherwise print INVALID.",
            "starterCode": "import 'dart:io';\n\nvoid main() {\n  // read username and password, print VALID or INVALID\n}\n",
            "solution": "import 'dart:io';\n\nvoid main() {\n  final String username = stdin.readLineSync() ?? '';\n  final String password = stdin.readLineSync() ?? '';\n  final bool ok = username.length >= 3 && password.length >= 6;\n  print(ok ? 'VALID' : 'INVALID');\n}\n",
            "solutionExplanation": "The two length checks mirror the two field validators; only when both pass is the form VALID.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Valid",
                "stdin": "ada\nsecret1\n",
                "expectedStdout": "VALID",
                "hidden": false
              },
              {
                "name": "Short password",
                "stdin": "ada\nabc\n",
                "expectedStdout": "INVALID",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A validator returns null for valid input and an error string otherwise.",
              "approach": "Gate the submit button behind validate, and only save when it returns true.",
              "structure": "Form with a GlobalKey, validator per field, validate on submit."
            }
          }
        },
        {
          "id": "flutter-m5-l3",
          "slug": "flutter-m5-l3",
          "title": "Testing and Building for Release",
          "objectives": [
            "Write a widget test with testWidgets",
            "Explain the release build and app bundle steps",
            "List the pre-release checks for both stores"
          ],
          "introduction": "The difference between a demo and a product is the release checklist: tests that catch regressions and a signed build the stores accept.",
          "concept": "Widget tests use testWidgets to pump a widget into a test environment, tap on it with tester.tap, and assert with expect and findsOneWidget that the screen changed as intended. Unit tests cover pure Dart logic such as validators and models without any widgets. For release, flutter build appbundle produces an Android App Bundle for Google Play and flutter build ipa produces an iOS archive for App Store Connect, both in release mode with tree-shaking and obfuscation options. Before shipping, check the app icon, the version in pubspec.yaml, permissions in the manifests, and that no debug banner or test data remains.",
          "syntax": "testWidgets('counter increments', (tester) async {\n  await tester.pumpWidget(const Counter());\n  await tester.tap(find.text('Add one'));\n  expect(find.text('Count: 1'), findsOneWidget);\n});",
          "analogy": "A release checklist is like a pilot's pre-flight walkaround: boring, repetitive, and the reason the plane does not fall out of the sky.",
          "exampleCode": "testWidgets('counter increments on tap', (tester) async {\n  await tester.pumpWidget(const MaterialApp(home: Counter()));\n  await tester.tap(find.text('Add one'));\n  await tester.pump();\n  expect(find.text('Count: 1'), findsOneWidget);\n});",
          "exampleLanguage": "dart",
          "walkthrough": [
            "Write the widget test with testWidgets and pump the widget under test.",
            "Simulate the user action with tester.tap and advance frames with tester.pump.",
            "Assert the expected text appears exactly once with findsOneWidget.",
            "Build the release bundle with flutter build appbundle or flutter build ipa."
          ],
          "commonMistakes": [
            "Forgetting tester.pump after a tap, so the rebuilt frame is never checked.",
            "Testing with debug-only data that never exists in release mode.",
            "Shipping a release build with the version number unchanged from the last release."
          ],
          "debugging": {
            "prompt": "The test taps the button but the assertion still sees the old count. Find the bug.",
            "buggyCode": "await tester.tap(find.text('Add one'));\nexpect(find.text('Count: 1'), findsOneWidget);",
            "fixedCode": "await tester.tap(find.text('Add one'));\nawait tester.pump();\nexpect(find.text('Count: 1'), findsOneWidget);",
            "explanation": "Tapping schedules a rebuild but the frame is only rendered after pump; without it the test inspects the stale frame."
          },
          "miniChallenge": "Write a widget test for your login form asserting that submitting with an empty password shows the validation error.",
          "summary": "Widget tests pump, tap and assert on real widgets; release builds produce signed app bundles, and a short checklist keeps debug artefacts out of the store.",
          "quiz": [
            {
              "question": "What does tester.pump() do in a widget test?",
              "options": [
                "It installs the app",
                "It advances the test frame so rebuilds render",
                "It deletes the widget",
                "It connects to a device"
              ],
              "answer": 1,
              "explanation": "pump triggers a frame, letting setState rebuilds and animations render before assertions."
            },
            {
              "question": "Which command builds the Android release artefact for Google Play?",
              "options": [
                "flutter run",
                "flutter build appbundle",
                "flutter test",
                "flutter create"
              ],
              "answer": 1,
              "explanation": "flutter build appbundle produces the signed Android App Bundle uploaded to Play."
            }
          ],
          "exercise": {
            "id": "flutter-m5-l3-e1",
            "title": "Release checklist",
            "type": "multiple-choice",
            "instructions": "Which of these belongs on the pre-release checklist before uploading a Flutter app?",
            "starterCode": "// pubspec.yaml\nversion: 1.0.0+1",
            "solution": "Bump the version in pubspec.yaml and confirm the app icon and permissions are final.",
            "solutionExplanation": "Store uploads reject a build whose version matches the previous release, and a placeholder icon or stray debug permission is a common rejection reason.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Bump the version in pubspec.yaml and confirm the app icon and permissions are final.",
                "hidden": false
              }
            ],
            "options": [
              "Leave the debug banner enabled for testers",
              "Bump the version in pubspec.yaml and confirm the app icon and permissions are final",
              "Ship with test accounts hardcoded",
              "Remove the app icon to save space"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Widget tests pump the widget, act on it, pump again, then assert.",
              "approach": "After every tap, call tester.pump before asserting the new state.",
              "structure": "Test with pump/tap/pump/expect, then build the signed bundle."
            }
          }
        }
      ]
    }
  ]
}),
  buildCourse({
  "id": "react-native",
  "slug": "react-native",
  "language": "javascript",
  "category": "mobile",
  "title": "React Native",
  "description": "Build cross-platform mobile apps with React Native: components, lists, navigation, forms, data fetching, persistence, animations and release.",
  "difficulty": "All levels",
  "estimatedHours": 20,
  "skills": [
    "React Native",
    "React hooks",
    "FlatList",
    "React Navigation",
    "Forms",
    "Data fetching",
    "AsyncStorage",
    "Animations",
    "Testing",
    "Release builds"
  ],
  "prerequisites": [
    "JavaScript fundamentals",
    "Basic React concepts"
  ],
  "modules": [
    {
      "id": "react-native-m1",
      "title": "JavaScript and React Refresher",
      "description": "The React mental model on mobile: components, JSX and hooks in a React Native app.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "react-native-m1-l1",
          "slug": "react-native-m1-l1",
          "title": "Components and JSX in React Native",
          "objectives": [
            "Explain how React Native renders components to native views",
            "Write a function component returning JSX",
            "Distinguish React Native components from web DOM elements"
          ],
          "introduction": "React Native lets JavaScript describe a real native screen: there is no browser and no DOM, only components that become native views.",
          "concept": "React Native components are JavaScript functions that return JSX describing a native interface: a View becomes a native container, a Text becomes a native label, and a Button becomes a native button. JSX looks like HTML but compiles to React.createElement calls, and the bridge (or the new architecture's Fabric renderer) turns that tree into real iOS and Android views. Unlike the web, there are no divs or spans: every element is a React Native component with mobile-specific props. A component re-renders whenever its props or state change, and React Native updates only the native views that differ.",
          "syntax": "function Greeting({ name }) {\n  return <Text>Hello, {name}</Text>;\n}",
          "analogy": "JSX is like a recipe card: it describes the dish in plain language, and the kitchen (the native platform) does the actual cooking.",
          "exampleCode": "import { Text, View } from 'react-native';\n\nfunction Greeting({ name }) {\n  return (\n    <View>\n      <Text>Hello, {name}!</Text>\n      <Text>Welcome to React Native.</Text>\n    </View>\n  );\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Import the native components you need from react-native, such as View and Text.",
            "Write a function component that returns JSX describing the screen.",
            "Pass data into the component as props and render it with curly braces.",
            "Export the component so a screen can render it like any other element."
          ],
          "commonMistakes": [
            "Using a web div or span, which does not exist in React Native.",
            "Forgetting to import a component from react-native before using it in JSX.",
            "Returning two sibling elements without wrapping them in a single parent View."
          ],
          "debugging": {
            "prompt": "The screen should show a greeting, but the app crashes on launch with an unknown element error. Find the bug.",
            "buggyCode": "function Greeting() {\n  return <div>Hello</div>;\n}",
            "fixedCode": "import { Text } from 'react-native';\nfunction Greeting() {\n  return <Text>Hello</Text>;\n}",
            "explanation": "React Native has no DOM and no div element. Text must be imported from react-native and used instead."
          },
          "miniChallenge": "Build a Profile component that receives name and city props and renders them in two Text elements inside a View.",
          "summary": "React Native function components return JSX that renders to real native views; View and Text replace div and span, and re-renders follow props and state.",
          "quiz": [
            {
              "question": "What does a View render to on a phone?",
              "options": [
                "An HTML div in a browser",
                "A native container view on iOS or Android",
                "A database row",
                "A PDF page"
              ],
              "answer": 1,
              "explanation": "View maps to a real native container (UIView on iOS, android.view.View on Android)."
            },
            {
              "question": "What is JSX in a React Native component?",
              "options": [
                "A database query language",
                "Syntax that describes UI elements and compiles to element-creation calls",
                "A styling language",
                "A testing framework"
              ],
              "answer": 1,
              "explanation": "JSX is syntactic sugar for creating React elements that describe the interface."
            }
          ],
          "exercise": {
            "id": "react-native-m1-l1-e1",
            "title": "Render a component with props",
            "type": "build-program",
            "instructions": "Read a component name on line 1, then lines of key=value props. Print exactly: <Name key=\"value\" key=\"value\" /> with the props in input order.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// read the component name and props, then print the JSX element\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst name = lines[0];\nconst props = lines.slice(1).filter(Boolean).map((l) => {\n  const [k, v] = l.split('=');\n  return `${k}=\"${v}\"`;\n});\nconsole.log(`<${name}${props.length ? ' ' + props.join(' ') : ''} />`);\n",
            "solutionExplanation": "The first line is the element name and the rest are props; each becomes key=\"value\" inside the element tag.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "With props",
                "stdin": "Greeting\nname=Ada\ncity=Paris\n",
                "expectedStdout": "<Greeting name=\"Ada\" city=\"Paris\" />",
                "hidden": false
              },
              {
                "name": "No props",
                "stdin": "Spacer\n",
                "expectedStdout": "<Spacer />",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "JSX describes native views, not web pages: View and Text are the building blocks.",
              "approach": "Render props inside curly braces and keep one parent element per component.",
              "structure": "Import from react-native, write the function, return the JSX tree."
            }
          }
        },
        {
          "id": "react-native-m1-l2",
          "slug": "react-native-m1-l2",
          "title": "Props and State with Hooks",
          "objectives": [
            "Pass data down with props",
            "Manage local state with useState",
            "Explain why state updates are asynchronous"
          ],
          "introduction": "Props flow down and state lives where it changes: that one-way river is what keeps a React app predictable.",
          "concept": "Props are read-only values a parent passes to a child, and changing them re-renders the child with new data. State, created with the useState hook, is data a component owns and can change; calling the setter schedules a re-render with the new value. The setter is asynchronous and may batch several updates, so reading state right after setting it still shows the old value. Hooks must be called at the top level of a component, never inside loops or conditions, because React tracks them by call order. Lifting state up means moving it to the nearest common ancestor when two siblings need the same value.",
          "syntax": "const [count, setCount] = useState(0);\n// later: setCount(count + 1);",
          "analogy": "Props are like letters delivered to a house: the house can read them but cannot rewrite the sender's copy; state is the diary kept inside.",
          "exampleCode": "import { useState } from 'react';\nimport { Button, Text, View } from 'react-native';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <View>\n      <Text>Count: {count}</Text>\n      <Button title=\"Add one\" onPress={() => setCount(count + 1)} />\n    </View>\n  );\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Call useState with the initial value to get the current value and its setter.",
            "Render the state value in JSX so the screen shows it.",
            "Call the setter inside an event handler to schedule a re-render.",
            "Use the functional form setCount(c => c + 1) when the new value depends on the old one."
          ],
          "commonMistakes": [
            "Mutating state directly instead of calling the setter, so no re-render happens.",
            "Reading state immediately after setState and expecting the new value.",
            "Calling a hook inside a condition, which breaks React's hook ordering."
          ],
          "debugging": {
            "prompt": "Tapping the button should increase the count, but the number never moves. Find the bug.",
            "buggyCode": "let count = 0;\nfunction Counter() {\n  return <Button title='Add' onPress={() => { count++; }} />;\n}",
            "fixedCode": "function Counter() {\n  const [count, setCount] = useState(0);\n  return <Button title='Add' onPress={() => setCount(count + 1)} />;\n}",
            "explanation": "A plain variable is not state: changing it does not tell React to re-render. useState owns the value and its setter schedules the re-render."
          },
          "miniChallenge": "Add a Reset button to the counter that sets the count back to zero, and a second state value tracking how many times any button was pressed.",
          "summary": "Props flow down read-only; useState owns mutable component data, and its setter schedules the re-render that shows the new value.",
          "quiz": [
            {
              "question": "What does calling a useState setter do?",
              "options": [
                "It changes the value immediately and synchronously",
                "It schedules a re-render with the new value",
                "It deletes the component",
                "It saves the value to disk"
              ],
              "answer": 1,
              "explanation": "Setters schedule a re-render; React may batch updates, so the new value appears on the next render."
            },
            {
              "question": "Why must hooks be called at the top level of a component?",
              "options": [
                "For performance only",
                "React tracks hooks by call order, so conditions or loops would misalign them",
                "It is a style preference",
                "Hooks do not work inside functions"
              ],
              "answer": 1,
              "explanation": "React identifies each hook by its position in the call order, which must be identical on every render."
            }
          ],
          "exercise": {
            "id": "react-native-m1-l2-e1",
            "title": "Counter command log",
            "type": "build-program",
            "instructions": "Read lines of commands INC, DEC or RESET starting from 0 (never below 0). Print the final count, then on a second line the number of commands processed.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// simulate the counter state machine\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nlet count = 0;\nlet seen = 0;\nfor (const cmd of lines) {\n  if (!cmd) continue;\n  seen++;\n  if (cmd === 'INC') count++;\n  else if (cmd === 'DEC') count = Math.max(0, count - 1);\n  else if (cmd === 'RESET') count = 0;\n}\nconsole.log(count);\nconsole.log(seen);\n",
            "solutionExplanation": "Each command is a state update applied in order; DEC clamps at zero just like a guarded setter.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "INC\nINC\nDEC\nINC\n",
                "expectedStdout": "2\n4",
                "hidden": false
              },
              {
                "name": "Reset",
                "stdin": "INC\nINC\nRESET\nINC\n",
                "expectedStdout": "1\n4",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "State belongs to the component that owns it; the setter is the only way to change it.",
              "approach": "When the new value depends on the old one, use the functional setter form.",
              "structure": "Declare useState at the top, render the value, update it in the handler."
            }
          }
        }
      ]
    },
    {
      "id": "react-native-m2",
      "title": "Core Components",
      "description": "The building blocks of every screen: views, text, styles and lists.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "react-native-m2-l1",
          "slug": "react-native-m2-l1",
          "title": "View, Text and StyleSheet",
          "objectives": [
            "Compose screens from View, Text and Image",
            "Style components with StyleSheet",
            "Explain the flexbox layout model React Native uses"
          ],
          "introduction": "Every React Native screen is a flexbox: one container, children in a row or a column, and styles that travel with the component.",
          "concept": "View is the fundamental container: it groups children, draws backgrounds and borders, and responds to touches. Text renders strings and is the only component that may contain raw text; nesting Text inside Text inherits styles, which is how bold words appear inside a paragraph. StyleSheet.create collects styles into an object and validates them once, which is faster and cleaner than inline style objects. React Native lays out with flexbox by default: flexDirection column stacks children vertically, alignItems positions them across the axis, and justifyContent spaces them along it.",
          "syntax": "const styles = StyleSheet.create({\n  box: { flex: 1, padding: 16, backgroundColor: '#fff' },\n});",
          "analogy": "StyleSheet is like a tailor's pattern book: each named style is cut once, measured, and reused for every garment.",
          "exampleCode": "import { StyleSheet, Text, View } from 'react-native';\n\nconst styles = StyleSheet.create({\n  card: { flex: 1, padding: 16, backgroundColor: '#eef', borderRadius: 8 },\n  title: { fontSize: 20, fontWeight: 'bold' },\n});\n\nfunction Card() {\n  return (\n    <View style={styles.card}>\n      <Text style={styles.title}>Hello</Text>\n      <Text>Styled with StyleSheet.</Text>\n    </View>\n  );\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Wrap the screen content in a View so it has a container to style.",
            "Create named styles with StyleSheet.create and reference them by key.",
            "Put raw text only inside Text components, never directly in a View.",
            "Use flexbox properties such as flexDirection and justifyContent to arrange children."
          ],
          "commonMistakes": [
            "Putting raw text directly inside a View, which React Native rejects.",
            "Creating style objects inline on every render instead of using StyleSheet.",
            "Forgetting that flexDirection defaults to column, not row as on the web."
          ],
          "debugging": {
            "prompt": "The text \"Hello\" should appear, but the app throws an error about text strings. Find the bug.",
            "buggyCode": "function Card() {\n  return <View>Hello</View>;\n}",
            "fixedCode": "import { Text, View } from 'react-native';\nfunction Card() {\n  return <View><Text>Hello</Text></View>;\n}",
            "explanation": "Raw text cannot be a direct child of View; all text must live inside a Text component."
          },
          "miniChallenge": "Style a profile card: a View with padding and a light background, a bold title Text, and a smaller subtitle Text.",
          "summary": "View contains, Text renders, and StyleSheet names reusable flexbox styles; text never sits directly inside a View.",
          "quiz": [
            {
              "question": "Why use StyleSheet.create instead of inline style objects?",
              "options": [
                "Inline styles are forbidden",
                "Styles are created once, validated, and reused instead of rebuilt each render",
                "It adds animations",
                "It changes the theme"
              ],
              "answer": 1,
              "explanation": "StyleSheet.create builds the style objects once and gives them stable references."
            },
            {
              "question": "What is the default flexDirection in React Native?",
              "options": [
                "row",
                "column",
                "row-reverse",
                "none"
              ],
              "answer": 1,
              "explanation": "Unlike CSS on the web, React Native defaults to column, stacking children vertically."
            }
          ],
          "exercise": {
            "id": "react-native-m2-l1-e1",
            "title": "Merge two styles",
            "type": "build-program",
            "instructions": "Read a base style and an override style, each as lines of key=value ending with a blank line between them (input lines: base lines, then ---, then override lines). Print the merged style as key=value lines sorted alphabetically, overrides winning.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// merge base and override styles\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst sep = lines.indexOf('---');\nconst merged = {};\nfor (const l of lines.slice(0, sep === -1 ? lines.length : sep)) {\n  if (!l) continue;\n  const [k, v] = l.split('=');\n  merged[k] = v;\n}\nfor (const l of lines.slice(sep + 1)) {\n  if (!l) continue;\n  const [k, v] = l.split('=');\n  merged[k] = v;\n}\nfor (const k of Object.keys(merged).sort()) console.log(`${k}=${merged[k]}`);\n",
            "solutionExplanation": "Later style properties override earlier ones with the same key, exactly like spreading a base style and then an override.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Override wins",
                "stdin": "color=red\nsize=12\n---\ncolor=blue\nweight=bold\n",
                "expectedStdout": "color=blue\nsize=12\nweight=bold",
                "hidden": false
              },
              {
                "name": "No override",
                "stdin": "color=red\n---\n",
                "expectedStdout": "color=red",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Text is the only home for raw strings; View is the container.",
              "approach": "Move repeated inline styles into StyleSheet.create and reference them by name.",
              "structure": "Container View, styles object, Text children in order."
            }
          }
        },
        {
          "id": "react-native-m2-l2",
          "slug": "react-native-m2-l2",
          "title": "Lists with FlatList",
          "objectives": [
            "Render long lists efficiently with FlatList",
            "Provide a keyExtractor for stable item identity",
            "Handle empty lists and pull-to-refresh"
          ],
          "introduction": "A contacts app with ten thousand entries cannot render ten thousand rows: FlatList renders only the rows on screen.",
          "concept": "FlatList is the list component for long data: it virtualises its rows, rendering only the items near the viewport and recycling rows as the user scrolls. It takes a data array and a renderItem function that receives each item and returns its row, plus a keyExtractor that returns a stable string key per item so React can track rows across updates. A ListEmptyComponent renders when the data array is empty, and onRefresh with the refreshing prop wires up pull-to-refresh. Forgetting a stable key makes React reuse the wrong row state after inserts and deletes, which shows up as flickering or duplicated content.",
          "syntax": "<FlatList\n  data={items}\n  keyExtractor={(item) => item.id}\n  renderItem={({ item }) => <Text>{item.name}</Text>}\n/>",
          "analogy": "FlatList is like a shop window: only the goods in the window are on display, and the stockroom swaps them in as you walk past.",
          "exampleCode": "import { FlatList, Text } from 'react-native';\n\nfunction Contacts({ people }) {\n  return (\n    <FlatList\n      data={people}\n      keyExtractor={(item) => item.id}\n      renderItem={({ item }) => <Text>{item.name}</Text>}\n      ListEmptyComponent={<Text>No contacts yet.</Text>}\n    />\n  );\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Pass the array to data and a row renderer to renderItem.",
            "Return a stable unique key per item from keyExtractor.",
            "Add ListEmptyComponent so an empty list explains itself.",
            "Wire onRefresh and refreshing for pull-to-refresh behaviour."
          ],
          "commonMistakes": [
            "Using the array index as the key, which breaks row identity after inserts.",
            "Nesting a FlatList inside a ScrollView, which disables virtualisation.",
            "Rendering the whole list with map inside a ScrollView for thousands of items."
          ],
          "debugging": {
            "prompt": "After deleting the first contact, the wrong row disappears from the list. Find the bug.",
            "buggyCode": "keyExtractor={(item, index) => String(index)}",
            "fixedCode": "keyExtractor={(item) => item.id}",
            "explanation": "Index keys make React think the row at position 0 is the same row after a delete, so it removes the wrong one. Stable ids keep identity correct."
          },
          "miniChallenge": "Build a FlatList of tasks with a keyExtractor on task id, a ListEmptyComponent, and a header showing the task count.",
          "summary": "FlatList virtualises long lists, rendering only visible rows; a stable keyExtractor keeps each row's identity correct across updates.",
          "quiz": [
            {
              "question": "What does FlatList virtualisation mean?",
              "options": [
                "It downloads items lazily",
                "It renders only rows near the viewport and recycles them while scrolling",
                "It compresses the data",
                "It hides the list"
              ],
              "answer": 1,
              "explanation": "Virtualisation keeps memory and render cost flat by only mounting visible rows."
            },
            {
              "question": "What is keyExtractor for?",
              "options": [
                "Styling rows",
                "Returning a stable unique key per item so React tracks row identity",
                "Sorting the data",
                "Fetching more items"
              ],
              "answer": 1,
              "explanation": "Stable keys let React match rows to data across inserts, deletes and reorders."
            }
          ],
          "exercise": {
            "id": "react-native-m2-l2-e1",
            "title": "Paginate a list",
            "type": "build-program",
            "instructions": "Line 1 is the page size, line 2 is the page number (1-based), remaining lines are items. Print the items on that page, one per line, or EMPTY when the page has no items.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// return one page of the list\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst size = parseInt(lines[0], 10);\nconst page = parseInt(lines[1], 10);\nconst items = lines.slice(2).filter(Boolean);\nconst start = (page - 1) * size;\nconst slice = items.slice(start, start + size);\nconsole.log(slice.length ? slice.join('\\n') : 'EMPTY');\n",
            "solutionExplanation": "The page window is [(page-1)*size, page*size); slicing the array gives exactly that window.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Page 2",
                "stdin": "2\n2\nAda\nBob\nCid\nDee\n",
                "expectedStdout": "Cid\nDee",
                "hidden": false
              },
              {
                "name": "Empty page",
                "stdin": "2\n3\nAda\nBob\n",
                "expectedStdout": "EMPTY",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "FlatList renders only visible rows; keys keep row identity stable.",
              "approach": "Never use the index as a key when items can be added or removed.",
              "structure": "data, keyExtractor with a stable id, renderItem for the row."
            }
          }
        }
      ]
    },
    {
      "id": "react-native-m3",
      "title": "Navigation and Input",
      "description": "Moving between screens and collecting user input with forms.",
      "level": "intermediate",
      "order": 3,
      "lessons": [
        {
          "id": "react-native-m3-l1",
          "slug": "react-native-m3-l1",
          "title": "Stack Navigation with React Navigation",
          "objectives": [
            "Set up a stack navigator with screens",
            "Navigate and pass params between screens",
            "Customise headers and handle the back action"
          ],
          "introduction": "Tapping a contact should open their details and the back button should return: that push-and-pop dance is stack navigation.",
          "concept": "React Navigation is the community-standard router for React Native. A stack navigator holds screens in a stack: navigation.navigate moves to a named screen, optionally carrying params, and navigation.goBack pops the top screen. Screens receive route and navigation props; route.params holds the values passed in, and options on a screen configure its header title and buttons. The NavigationContainer wraps the whole navigator and owns the navigation state, including deep links. A stack matches the phone's mental model: each new screen slides in on top, and back returns exactly where you came from.",
          "syntax": "<Stack.Navigator>\n  <Stack.Screen name=\"Home\" component={HomeScreen} />\n  <Stack.Screen name=\"Details\" component={DetailsScreen} />\n</Stack.Navigator>",
          "analogy": "A stack navigator is like a browser history for an app: each screen is a page, and back is the history button.",
          "exampleCode": "import { NavigationContainer } from '@react-navigation/native';\nimport { createNativeStackNavigator } from '@react-navigation/native-stack';\n\nconst Stack = createNativeStackNavigator();\n\nfunction App() {\n  return (\n    <NavigationContainer>\n      <Stack.Navigator>\n        <Stack.Screen name=\"Home\" component={HomeScreen} />\n        <Stack.Screen name=\"Details\" component={DetailsScreen} />\n      </Stack.Navigator>\n    </NavigationContainer>\n  );\n}\n\n// Inside HomeScreen:\nnavigation.navigate('Details', { name: 'Ada' });",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Wrap the navigator in a NavigationContainer at the app root.",
            "Register each screen with a name and a component in the Stack.Navigator.",
            "Call navigation.navigate with a screen name and params to move.",
            "Read the params on the destination screen from route.params."
          ],
          "commonMistakes": [
            "Navigating to a screen name that was never registered, which throws at runtime.",
            "Forgetting the NavigationContainer, so navigation is undefined everywhere.",
            "Reading route.params without a fallback when a screen can also open without params."
          ],
          "debugging": {
            "prompt": "Tapping a contact should open Details, but the app crashes saying the route was not found. Find the bug.",
            "buggyCode": "navigation.navigate('Detail', { name: 'Ada' }); // registered as 'Details'",
            "fixedCode": "navigation.navigate('Details', { name: 'Ada' });",
            "explanation": "The registered screen name is Details, not Detail. Navigation matches names exactly, so a typo means no such route exists."
          },
          "miniChallenge": "Add a Profile screen to the stack that receives a user id param, shows it in the header title, and returns to Home with goBack.",
          "summary": "A stack navigator registers named screens; navigate pushes with params, goBack pops, and route.params delivers the data.",
          "quiz": [
            {
              "question": "What does navigation.navigate('Details', { id: 7 }) do?",
              "options": [
                "It deletes the Home screen",
                "It pushes the Details screen and passes id 7 as a param",
                "It reloads the app",
                "It opens a web page"
              ],
              "answer": 1,
              "explanation": "navigate pushes the named screen onto the stack with the given params."
            },
            {
              "question": "Where does a pushed screen read its params?",
              "options": [
                "From AsyncStorage",
                "From route.params",
                "From the app icon",
                "Params cannot be read"
              ],
              "answer": 1,
              "explanation": "React Navigation delivers passed values on the route prop as route.params."
            }
          ],
          "exercise": {
            "id": "react-native-m3-l1-e1",
            "title": "Navigation stack simulator",
            "type": "build-program",
            "instructions": "Read lines of commands: PUSH <screen> or POP. Print the final stack joined with \" > \", or EMPTY when the stack is empty. POP on an empty stack does nothing.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// simulate the navigation stack\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst stack = [];\nfor (const l of lines) {\n  if (!l) continue;\n  if (l.startsWith('PUSH ')) stack.push(l.slice(5));\n  else if (l === 'POP') stack.pop();\n}\nconsole.log(stack.length ? stack.join(' > ') : 'EMPTY');\n",
            "solutionExplanation": "PUSH appends to the stack and POP removes the top, exactly like a stack navigator.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Push and pop",
                "stdin": "PUSH Home\nPUSH List\nPUSH Detail\nPOP\n",
                "expectedStdout": "Home > List",
                "hidden": false
              },
              {
                "name": "Empty",
                "stdin": "PUSH Home\nPOP\nPOP\n",
                "expectedStdout": "EMPTY",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Screens are registered by exact name; navigate pushes, goBack pops.",
              "approach": "Match the navigate name character-for-character with the registered screen name.",
              "structure": "NavigationContainer wraps the navigator, screens register, navigate passes params."
            }
          }
        },
        {
          "id": "react-native-m3-l2",
          "slug": "react-native-m3-l2",
          "title": "TextInput and Forms",
          "objectives": [
            "Collect text with TextInput and controlled state",
            "Validate input before submitting a form",
            "Manage the keyboard and focus behaviour"
          ],
          "introduction": "A login screen is just two text fields and a button, but the details — controlled values, validation, keyboard — decide whether it feels professional.",
          "concept": "TextInput is a controlled component in React Native: its value comes from state and onChangeText updates that state on every keystroke, so the component always owns the current text. A form keeps one state value per field, validates them on submit, and shows an error message under any field that fails. The keyboardType prop picks the right keyboard, such as email-address or numeric, and secureTextEntry hides password input. Dismissing the keyboard when the user taps outside the form, and returning focus to the next field, are small touches that make a form feel finished.",
          "syntax": "const [email, setEmail] = useState('');\n<TextInput value={email} onChangeText={setEmail} keyboardType=\"email-address\" />",
          "analogy": "A controlled TextInput is like a dictation: every word you speak is written down immediately, so the page always matches what was said.",
          "exampleCode": "import { useState } from 'react';\nimport { Button, Text, TextInput, View } from 'react-native';\n\nfunction LoginForm() {\n  const [email, setEmail] = useState('');\n  const [error, setError] = useState('');\n  const submit = () => {\n    if (!email.includes('@')) { setError('Enter a valid email'); return; }\n    setError('');\n  };\n  return (\n    <View>\n      <TextInput value={email} onChangeText={setEmail} placeholder=\"Email\" keyboardType=\"email-address\" />\n      {error ? <Text>{error}</Text> : null}\n      <Button title=\"Log in\" onPress={submit} />\n    </View>\n  );\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Create one useState value per field and bind it to the TextInput value prop.",
            "Update the state in onChangeText so the field stays controlled.",
            "Validate all fields in the submit handler and store error messages in state.",
            "Render error text under the failing field and only proceed when every check passes."
          ],
          "commonMistakes": [
            "Leaving a TextInput uncontrolled, so the app cannot read what the user typed.",
            "Validating only on submit and never clearing the error after the user fixes it.",
            "Using the default keyboard for an email field instead of keyboardType email-address."
          ],
          "debugging": {
            "prompt": "Typing in the email field shows nothing: the field stays blank. Find the bug.",
            "buggyCode": "<TextInput value={email} />",
            "fixedCode": "<TextInput value={email} onChangeText={setEmail} />",
            "explanation": "A controlled input with a value prop but no onChangeText can never change: every keystroke is ignored because state is never updated."
          },
          "miniChallenge": "Extend the login form with a password field using secureTextEntry and a rule that the password must be at least 8 characters.",
          "summary": "TextInput is controlled through value and onChangeText; forms validate on submit, show errors under the failing field, and pick the right keyboard per field.",
          "quiz": [
            {
              "question": "What makes a TextInput controlled?",
              "options": [
                "It has a placeholder",
                "Its value comes from state and onChangeText updates that state",
                "It is inside a ScrollView",
                "It uses secureTextEntry"
              ],
              "answer": 1,
              "explanation": "A controlled input is driven by state: value displays it and onChangeText writes changes back."
            },
            {
              "question": "What does keyboardType=\"email-address\" do?",
              "options": [
                "It validates the email",
                "It shows a keyboard with @ and . keys handy",
                "It sends the email",
                "It hides the keyboard"
              ],
              "answer": 1,
              "explanation": "keyboardType chooses the keyboard layout; email-address surfaces the @ key for faster typing."
            }
          ],
          "exercise": {
            "id": "react-native-m3-l2-e1",
            "title": "Validate a login form",
            "type": "build-program",
            "instructions": "Read an email on line 1 and a password on line 2. Print VALID only when the email contains @ and a dot after it, and the password is at least 8 characters; otherwise print INVALID.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// validate the login form\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst email = lines[0] || '';\nconst password = lines[1] || '';\nconst at = email.indexOf('@');\nconst emailOk = at > 0 && email.indexOf('.', at) > at + 1;\nconsole.log(emailOk && password.length >= 8 ? 'VALID' : 'INVALID');\n",
            "solutionExplanation": "The email check mirrors the validator: @ present with a dot after it; the password check mirrors the length rule.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Valid",
                "stdin": "ada@example.com\nsecret99\n",
                "expectedStdout": "VALID",
                "hidden": false
              },
              {
                "name": "Bad email",
                "stdin": "adaexample.com\nsecret99\n",
                "expectedStdout": "INVALID",
                "hidden": true
              },
              {
                "name": "Short password",
                "stdin": "ada@example.com\nshort\n",
                "expectedStdout": "INVALID",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Controlled input means value from state plus onChangeText writing back.",
              "approach": "Validate in the submit handler and keep the error in state so it renders.",
              "structure": "State per field, value plus onChangeText, validate on submit."
            }
          }
        }
      ]
    },
    {
      "id": "react-native-m4",
      "title": "Data and Device APIs",
      "description": "Fetching remote data and persisting it on the device.",
      "level": "intermediate",
      "order": 4,
      "lessons": [
        {
          "id": "react-native-m4-l1",
          "slug": "react-native-m4-l1",
          "title": "Fetching Data and Loading States",
          "objectives": [
            "Fetch JSON with fetch and async/await",
            "Model loading, success and error states",
            "Render fetched data once it arrives"
          ],
          "introduction": "A mobile app without data is a brochure: fetching turns it into a living product, and loading states decide whether users wait or leave.",
          "concept": "Fetching in React Native uses the same fetch API as the web: await fetch(url) returns a response, and await response.json parses the body. Because the request takes time, the screen needs three states: loading while the request is in flight, error when it fails, and data when it succeeds. A useEffect with an empty dependency array runs the fetch once when the screen mounts, and an AbortController or a mounted flag prevents setting state after the user has navigated away. Never fetch during render: the render function must stay pure, and side effects belong in effects.",
          "syntax": "useEffect(() => {\n  fetch(url).then(r => r.json()).then(setData);\n}, []);",
          "analogy": "Fetching data is like ordering delivery: you place the order, wait by the door (loading), and either eat (data) or get a refund (error).",
          "exampleCode": "import { useEffect, useState } from 'react';\nimport { ActivityIndicator, Text } from 'react-native';\n\nfunction UserList() {\n  const [users, setUsers] = useState(null);\n  const [error, setError] = useState(null);\n  useEffect(() => {\n    fetch('https://example.com/users')\n      .then((r) => r.json())\n      .then(setUsers)\n      .catch((e) => setError(e.message));\n  }, []);\n  if (error) return <Text>Error: {error}</Text>;\n  if (!users) return <ActivityIndicator />;\n  return <Text>Loaded {users.length} users</Text>;\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Create state for the data and for any error, starting with null.",
            "Start the fetch inside useEffect with an empty dependency array.",
            "Parse the JSON and store it with the setter on success.",
            "Render a spinner while loading, an error message on failure, and the data when ready."
          ],
          "commonMistakes": [
            "Fetching inside the render body, which refetches on every render.",
            "Forgetting the loading state, so the screen shows stale or empty content.",
            "Setting state after unmount, which logs a warning about updating an unmounted component."
          ],
          "debugging": {
            "prompt": "The user list refetches in an infinite loop and the spinner never stops. Find the bug.",
            "buggyCode": "function UserList() {\n  fetch(url).then(r => r.json()).then(setUsers);\n  ...\n}",
            "fixedCode": "useEffect(() => {\n  fetch(url).then(r => r.json()).then(setUsers);\n}, []);",
            "explanation": "Fetching during render triggers a state update, which triggers another render, which fetches again. Effects run once per mount instead."
          },
          "miniChallenge": "Add a manual refresh button that refetches the users and shows the spinner again while the new request runs.",
          "summary": "Fetch inside useEffect, keep loading/error/data states in state, and render a spinner, an error, or the data depending on which state holds.",
          "quiz": [
            {
              "question": "Why fetch inside useEffect instead of during render?",
              "options": [
                "It is faster",
                "Render must stay pure; fetching there would refetch on every render",
                "Effects use less memory",
                "Fetch does not work in render"
              ],
              "answer": 1,
              "explanation": "A fetch during render sets state, which re-renders, which fetches again in a loop."
            },
            {
              "question": "What should the screen show while a fetch is in flight?",
              "options": [
                "The old data silently",
                "A loading indicator",
                "A blank white screen forever",
                "An error"
              ],
              "answer": 1,
              "explanation": "A spinner or skeleton tells the user the app is working instead of frozen."
            }
          ],
          "exercise": {
            "id": "react-native-m4-l1-e1",
            "title": "Fetch result simulator",
            "type": "build-program",
            "instructions": "Read lines of records id:name, then a final line QUERY <id>. Print LOADING on the first line, then the matching name or NOT_FOUND on the second line.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// simulate a fetch: loading, then the result\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst query = lines[lines.length - 1];\nconst id = query.split(' ')[1];\nconst records = {};\nfor (const l of lines.slice(0, -1)) {\n  if (!l) continue;\n  const [k, v] = l.split(':');\n  records[k] = v;\n}\nconsole.log('LOADING');\nconsole.log(records[id] ?? 'NOT_FOUND');\n",
            "solutionExplanation": "The lookup happens after the loading line, mirroring a fetch that resolves after the spinner.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Found",
                "stdin": "1:Ada\n2:Bob\nQUERY 2\n",
                "expectedStdout": "LOADING\nBob",
                "hidden": false
              },
              {
                "name": "Missing",
                "stdin": "1:Ada\nQUERY 9\n",
                "expectedStdout": "LOADING\nNOT_FOUND",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Three states cover every fetch: loading, error, and data.",
              "approach": "Start the request in useEffect with an empty dependency array so it runs once.",
              "structure": "State for data and error, effect to fetch, conditional render by state."
            }
          }
        },
        {
          "id": "react-native-m4-l2",
          "slug": "react-native-m4-l2",
          "title": "AsyncStorage and Local Persistence",
          "objectives": [
            "Persist small data with AsyncStorage",
            "Explain the async key-value API",
            "Load saved data when a screen mounts"
          ],
          "introduction": "Users expect the app to remember them: a token saved today must still be there after the phone restarts.",
          "concept": "AsyncStorage is React Native's built-in asynchronous key-value store for small data such as tokens, settings and favourites. Every operation returns a Promise: setItem stores a string under a key, getItem reads it back, and removeItem deletes it. Values must be strings, so objects are saved with JSON.stringify and restored with JSON.parse. Because the API is asynchronous, screens load saved values inside useEffect and show a sensible default until the real value arrives. AsyncStorage is not a database and not encrypted: large structured data belongs in SQLite and secrets belong in a secure store.",
          "syntax": "await AsyncStorage.setItem('theme', 'dark');\nconst theme = await AsyncStorage.getItem('theme');",
          "analogy": "AsyncStorage is like a coat-check ticket: you hand over a small labelled item and get it back later by presenting the same ticket.",
          "exampleCode": "import AsyncStorage from '@react-native-async-storage/async-storage';\n\nasync function saveTheme(theme) {\n  await AsyncStorage.setItem('theme', theme);\n}\nasync function loadTheme() {\n  return (await AsyncStorage.getItem('theme')) ?? 'light';\n}\n// In a component:\nuseEffect(() => { loadTheme().then(setTheme); }, []);",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Import AsyncStorage and choose a clear key such as theme.",
            "Save with setItem, awaiting it so the write completes.",
            "Load with getItem inside useEffect and fall back to a default when null.",
            "Stringify objects before saving and parse them after loading."
          ],
          "commonMistakes": [
            "Forgetting to await setItem and reading the value before the write lands.",
            "Storing an object directly, which saves the string [object Object].",
            "Keeping passwords or tokens in AsyncStorage instead of a secure store."
          ],
          "debugging": {
            "prompt": "Saved settings load as [object Object] instead of the real values. Find the bug.",
            "buggyCode": "await AsyncStorage.setItem('settings', settings);",
            "fixedCode": "await AsyncStorage.setItem('settings', JSON.stringify(settings));\nconst saved = JSON.parse(await AsyncStorage.getItem('settings'));",
            "explanation": "AsyncStorage stores strings only; an object is coerced to [object Object]. Stringify on save and parse on load."
          },
          "miniChallenge": "Persist a favourites list: save the array with JSON.stringify on every change and load it when the app starts.",
          "summary": "AsyncStorage is an async string key-value store for small data; stringify objects, await every call, and load saved values in an effect.",
          "quiz": [
            {
              "question": "What type of value does AsyncStorage store?",
              "options": [
                "Objects directly",
                "Strings only",
                "Numbers only",
                "Files"
              ],
              "answer": 1,
              "explanation": "AsyncStorage stores strings; objects must be serialised with JSON first."
            },
            {
              "question": "Why is getItem awaited inside useEffect?",
              "options": [
                "It is optional",
                "It is asynchronous, and the value must load after mount without blocking render",
                "Effects are the only place await works",
                "It saves battery"
              ],
              "answer": 1,
              "explanation": "getItem returns a Promise, so the screen loads it after mounting and updates state when it resolves."
            }
          ],
          "exercise": {
            "id": "react-native-m4-l2-e1",
            "title": "Key-value store commands",
            "type": "build-program",
            "instructions": "Read lines of commands: SET <key> <value>, GET <key>, REMOVE <key>. Print the result of each GET on its own line, or NULL when the key is missing.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// simulate AsyncStorage commands\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst store = {};\nconst out = [];\nfor (const l of lines) {\n  if (!l) continue;\n  const parts = l.split(' ');\n  if (parts[0] === 'SET') store[parts[1]] = parts.slice(2).join(' ');\n  else if (parts[0] === 'GET') out.push(store[parts[1]] ?? 'NULL');\n  else if (parts[0] === 'REMOVE') delete store[parts[1]];\n}\nconsole.log(out.join('\\n'));\n",
            "solutionExplanation": "SET writes, GET reads with a NULL fallback, and REMOVE deletes, mirroring the AsyncStorage API.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "SET theme dark\nGET theme\nSET theme light\nGET theme\nREMOVE theme\nGET theme\n",
                "expectedStdout": "dark\nlight\nNULL",
                "hidden": false
              },
              {
                "name": "Missing key",
                "stdin": "GET nope\n",
                "expectedStdout": "NULL",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "AsyncStorage is async and string-only: await it and serialise objects.",
              "approach": "Save with JSON.stringify, load with JSON.parse, and default when null.",
              "structure": "setItem on change, getItem in an effect on mount."
            }
          }
        }
      ]
    },
    {
      "id": "react-native-m5",
      "title": "Polish and Ship",
      "description": "Platform quirks, animation and getting the app into the stores.",
      "level": "advanced",
      "order": 5,
      "lessons": [
        {
          "id": "react-native-m5-l1",
          "slug": "react-native-m5-l1",
          "title": "Platform Differences and Safe Areas",
          "objectives": [
            "Handle iOS and Android differences with Platform",
            "Keep content out of notches with SafeAreaView",
            "Choose platform-specific components and styles"
          ],
          "introduction": "The same screen on an iPhone and a Pixel is never quite the same: notches, navigation bars and back buttons all differ.",
          "concept": "React Native exposes the Platform module so code can branch on the operating system: Platform.OS is ios or android, Platform.select picks a value per platform, and Platform.Version gives the OS version. SafeAreaView insets content away from notches, the status bar and the home indicator so text never hides under hardware. Android has a hardware back button that iOS lacks, and its status bar and ripple effects behave differently, so navigation and touch feedback often need platform-specific handling. Most differences are small, but finding them early with a real device on each platform saves a rejection or a one-star review.",
          "syntax": "const padding = Platform.select({ ios: 20, android: 16, default: 16 });",
          "analogy": "Platform code is like driving in two countries: the car is the same, but which side of the road you use changes at the border.",
          "exampleCode": "import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';\n\nconst styles = StyleSheet.create({\n  screen: { flex: 1, paddingTop: Platform.OS === 'android' ? 24 : 0 },\n});\n\nfunction Screen() {\n  return (\n    <SafeAreaView style={styles.screen}>\n      <Text>Runs on {Platform.OS}</Text>\n    </SafeAreaView>\n  );\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Wrap the screen in SafeAreaView so content avoids notches and system bars.",
            "Use Platform.OS or Platform.select for values that differ per platform.",
            "Test touch feedback on Android, where ripples replace iOS opacity fades.",
            "Verify the layout on a real device for each platform before release."
          ],
          "commonMistakes": [
            "Hardcoding iPhone layout values that break on Android status bars.",
            "Using SafeAreaView only on iOS and letting Android content slide under the status bar.",
            "Branching on Platform.OS inside render for values that could live in the stylesheet."
          ],
          "debugging": {
            "prompt": "On Android the title hides under the status bar, but it looks fine on iOS. Find the bug.",
            "buggyCode": "<View style={{ flex: 1 }}><Text>Title</Text></View>",
            "fixedCode": "<SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 24 : 0 }}><Text>Title</Text></SafeAreaView>",
            "explanation": "Without SafeAreaView and Android status-bar padding, content starts at the very top of the screen and slides under the system bar."
          },
          "miniChallenge": "Add a platform-specific header height using Platform.select and wrap your longest screen in SafeAreaView, then check it on both platforms.",
          "summary": "Platform.select branches values per OS and SafeAreaView keeps content clear of notches and system bars on both platforms.",
          "quiz": [
            {
              "question": "What does SafeAreaView do?",
              "options": [
                "It encrypts the screen",
                "It insets content away from notches, status bars and the home indicator",
                "It speeds up rendering",
                "It blocks screenshots"
              ],
              "answer": 1,
              "explanation": "SafeAreaView applies padding so content never hides under hardware or system UI."
            },
            {
              "question": "When should you use Platform.select?",
              "options": [
                "For every style",
                "When a value legitimately differs between iOS and Android",
                "Only for colours",
                "Never"
              ],
              "answer": 1,
              "explanation": "Platform.select picks one value per platform, keeping platform branches explicit and local."
            }
          ],
          "exercise": {
            "id": "react-native-m5-l1-e1",
            "title": "Pick the platform value",
            "type": "build-program",
            "instructions": "Line 1 is a platform (ios or android), then lines of key=value pairs, each key suffixed .ios or .android (e.g. padding.ios=20). Print the values for that platform as key=value lines in input order.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// select platform-specific values\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst platform = lines[0];\nfor (const l of lines.slice(1)) {\n  if (!l) continue;\n  const [k, v] = l.split('=');\n  if (k.endsWith('.' + platform)) console.log(`${k.slice(0, k.length - platform.length - 1)}=${v}`);\n}\n",
            "solutionExplanation": "Each key carries its platform suffix; only the entries matching the requested platform are printed, suffix stripped.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "iOS",
                "stdin": "ios\npadding.ios=20\npadding.android=16\ntitle.ios=Hello\n",
                "expectedStdout": "padding=20\ntitle=Hello",
                "hidden": false
              },
              {
                "name": "Android",
                "stdin": "android\npadding.ios=20\npadding.android=16\n",
                "expectedStdout": "padding=16",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "SafeAreaView handles notches; Platform.select handles per-OS values.",
              "approach": "Check the layout on a real device per platform instead of trusting one simulator.",
              "structure": "SafeAreaView wrapper, Platform.select for differing values."
            }
          }
        },
        {
          "id": "react-native-m5-l2",
          "slug": "react-native-m5-l2",
          "title": "Animations with Reanimated Basics",
          "objectives": [
            "Explain the difference between JS-driven and native animations",
            "Animate a value with shared values and withTiming",
            "Trigger animations from gestures and state changes"
          ],
          "introduction": "A button that jumps is fine; a card that glides is delightful: animation is the polish users feel but never name.",
          "concept": "Animations in React Native run either on the JavaScript thread, where they can stutter when JS is busy, or on the UI thread, where they stay smooth. Reanimated moves animation work to the UI thread using shared values: a value created with useSharedValue that any worklet can read and write. withTiming animates a shared value to a target over a duration with easing, and useAnimatedStyle turns shared values into styles that update without crossing the bridge. Because the animation runs natively, it keeps 60 frames per second even while JavaScript fetches data or renders lists.",
          "syntax": "const offset = useSharedValue(0);\nconst style = useAnimatedStyle(() => ({ transform: [{ translateX: offset.value }] }));",
          "analogy": "A shared value is like a puppet string pulled by the stage crew directly: the puppet moves smoothly even while the director is busy talking.",
          "exampleCode": "import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';\n\nfunction SlidingCard() {\n  const offset = useSharedValue(0);\n  const style = useAnimatedStyle(() => ({\n    transform: [{ translateX: offset.value }],\n  }));\n  return (\n    <Animated.View style={style}>\n      <Button title=\"Slide\" onPress={() => { offset.value = withTiming(100, { duration: 300 }); }} />\n    </Animated.View>\n  );\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Create a shared value with useSharedValue for the animated property.",
            "Derive styles from it with useAnimatedStyle so updates stay on the UI thread.",
            "Assign withTiming inside an event handler to animate to the target value.",
            "Render the animated component with Animated.View instead of a plain View."
          ],
          "commonMistakes": [
            "Reading a shared value directly in render, which does not trigger updates.",
            "Animating on the JS thread with setState, which drops frames under load.",
            "Forgetting to install the Reanimated Babel plugin, so worklets never run."
          ],
          "debugging": {
            "prompt": "The card should slide right when the button is pressed, but it jumps instantly instead of animating. Find the bug.",
            "buggyCode": "onPress={() => { offset.value = 100; }}",
            "fixedCode": "onPress={() => { offset.value = withTiming(100, { duration: 300 }); }}",
            "explanation": "Assigning a raw number changes the value immediately. withTiming animates the shared value to the target over the given duration."
          },
          "miniChallenge": "Animate a card fading in on mount: start opacity at 0, animate to 1 with withTiming over 500 milliseconds.",
          "summary": "Reanimated shared values live on the UI thread; withTiming animates them smoothly, and useAnimatedStyle turns them into styles.",
          "quiz": [
            {
              "question": "Why run animations on the UI thread with Reanimated?",
              "options": [
                "It uses less code",
                "Animations stay smooth even when the JS thread is busy",
                "It works without JavaScript",
                "It is required for all apps"
              ],
              "answer": 1,
              "explanation": "UI-thread animations do not compete with JavaScript work, so they hold 60fps under load."
            },
            {
              "question": "What does withTiming do?",
              "options": [
                "It delays the app start",
                "It animates a shared value to a target over a duration",
                "It measures frame rate",
                "It stops an animation"
              ],
              "answer": 1,
              "explanation": "withTiming interpolates a shared value towards its target with easing over the given time."
            }
          ],
          "exercise": {
            "id": "react-native-m5-l2-e1",
            "title": "Interpolate animation frames",
            "type": "build-program",
            "instructions": "Read start, end and steps (one per line). Print the interpolated values from start to end inclusive, one per line, each with exactly 2 decimal places.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// compute animation frames\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst start = parseFloat(lines[0]);\nconst end = parseFloat(lines[1]);\nconst steps = parseInt(lines[2], 10);\nfor (let i = 0; i <= steps; i++) {\n  console.log((start + ((end - start) * i) / steps).toFixed(2));\n}\n",
            "solutionExplanation": "Each frame is start plus the fraction i/steps of the total distance, formatted to two decimals.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Slide",
                "stdin": "0\n100\n4\n",
                "expectedStdout": "0.00\n25.00\n50.00\n75.00\n100.00",
                "hidden": false
              },
              {
                "name": "Fade",
                "stdin": "1\n0\n2\n",
                "expectedStdout": "1.00\n0.50\n0.00",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Shared values live on the UI thread; withTiming animates them.",
              "approach": "Assign the animation in the handler, not a raw number, for smooth motion.",
              "structure": "useSharedValue, useAnimatedStyle, withTiming on press."
            }
          }
        },
        {
          "id": "react-native-m5-l3",
          "slug": "react-native-m5-l3",
          "title": "Debugging, Testing and App Store Release",
          "objectives": [
            "Debug with Flipper, logs and the React DevTools",
            "Write component tests with Testing Library",
            "Prepare a release build for both stores"
          ],
          "introduction": "Shipping is a skill of its own: the app that passes tests on your machine still has to survive review on two stores.",
          "concept": "Debugging React Native starts with the Metro bundler logs and console output, then Flipper for network inspection, AsyncStorage browsing and layout inspection, and React DevTools for the component tree. Component tests use React Native Testing Library: render the component, fire events with fireEvent, and assert on the text on screen, which tests behaviour instead of implementation details. For release, EAS Build or the native toolchains produce signed binaries: an Android App Bundle for Google Play and an archive for App Store Connect. The release checklist covers the app icon, version numbers in app.json and the native projects, permissions, and removing test data and console logs.",
          "syntax": "render(<Counter />);\nfireEvent.press(screen.getByText('Add one'));\nexpect(screen.getByText('Count: 1')).toBeTruthy();",
          "analogy": "Releasing an app is like opening a restaurant: the kitchen tests are done, the menu is printed, and the health inspector (the store) still has to walk through.",
          "exampleCode": "import { fireEvent, render, screen } from '@testing-library/react-native';\n\ntest('counter increments', () => {\n  render(<Counter />);\n  fireEvent.press(screen.getByText('Add one'));\n  expect(screen.getByText('Count: 1')).toBeTruthy();\n});",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Reproduce the bug with Metro logs and Flipper before changing any code.",
            "Render the component in a test and fire the user event.",
            "Assert on visible text, which tests what the user experiences.",
            "Build the signed release binary and walk the store checklist."
          ],
          "commonMistakes": [
            "Testing implementation details such as internal state instead of visible behaviour.",
            "Shipping a debug build to the store, which is slower and unsigned.",
            "Leaving console.log calls and test accounts in the release build."
          ],
          "debugging": {
            "prompt": "The test presses the button but the count text is still 0. Find the bug.",
            "buggyCode": "fireEvent.press(screen.getByText('Add one'));\nexpect(screen.getByText('Count: 1')).toBeTruthy(); // Counter renders 'Count: 0'",
            "fixedCode": "fireEvent.press(screen.getByText('Add one'));\nexpect(screen.getByText('Count: 1')).toBeTruthy(); // after fixing Counter to use useState",
            "explanation": "The Counter was storing the count in a plain variable instead of useState, so pressing the button never re-rendered. The test exposed the missing state."
          },
          "miniChallenge": "Write a test for your login form asserting that submitting an invalid email shows the error text.",
          "summary": "Debug with Metro logs and Flipper, test visible behaviour with Testing Library, and ship signed release builds after the store checklist.",
          "quiz": [
            {
              "question": "What should a component test assert on?",
              "options": [
                "Internal state variables",
                "Visible behaviour such as text on screen",
                "The source code formatting",
                "The bundle size"
              ],
              "answer": 1,
              "explanation": "Testing visible behaviour keeps tests valid when the implementation changes."
            },
            {
              "question": "What artefact does Google Play accept for a React Native release?",
              "options": [
                "A debug APK",
                "A signed Android App Bundle",
                "The JavaScript source",
                "A screenshot"
              ],
              "answer": 1,
              "explanation": "Play accepts a signed AAB; debug builds are unsigned and unoptimised."
            }
          ],
          "exercise": {
            "id": "react-native-m5-l3-e1",
            "title": "Bump the release version",
            "type": "build-program",
            "instructions": "Read a version like 1.2.3 and a bump type (major, minor or patch) on line 2. Print the new version, resetting lower parts to 0 on major/minor bumps.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// compute the next release version\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst [major, minor, patch] = lines[0].split('.').map(Number);\nconst bump = lines[1];\nif (bump === 'major') console.log(`${major + 1}.0.0`);\nelse if (bump === 'minor') console.log(`${major}.${minor + 1}.0`);\nelse console.log(`${major}.${minor}.${patch + 1}`);\n",
            "solutionExplanation": "A major bump increments the first number and resets the rest; minor resets only the patch; patch increments the last number.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Patch",
                "stdin": "1.2.3\npatch\n",
                "expectedStdout": "1.2.4",
                "hidden": false
              },
              {
                "name": "Minor",
                "stdin": "1.2.3\nminor\n",
                "expectedStdout": "1.3.0",
                "hidden": true
              },
              {
                "name": "Major",
                "stdin": "1.2.3\nmajor\n",
                "expectedStdout": "2.0.0",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Test what the user sees, not how the component stores it.",
              "approach": "Reproduce first with logs and Flipper, then fix, then cover with a test.",
              "structure": "Render, fire the event, assert on visible text."
            }
          }
        }
      ]
    }
  ]
}),
  buildCourse({
  "id": "android-kotlin",
  "slug": "android-kotlin",
  "language": "kotlin",
  "category": "mobile",
  "title": "Android Development (Kotlin)",
  "description": "Build native Android apps with Kotlin: the language, activities, Jetpack Compose, navigation, Room, coroutines, ViewModels, Retrofit and Play publishing.",
  "difficulty": "All levels",
  "estimatedHours": 22,
  "skills": [
    "Kotlin",
    "Android lifecycle",
    "Jetpack Compose",
    "Navigation",
    "Room",
    "Coroutines",
    "ViewModel and StateFlow",
    "Retrofit",
    "Espresso testing",
    "Google Play release"
  ],
  "prerequisites": [
    "Basic programming concepts"
  ],
  "modules": [
    {
      "id": "android-kotlin-m1",
      "title": "Kotlin for Android",
      "description": "The Kotlin language as Android uses it: null safety, classes and collections.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "android-kotlin-m1-l1",
          "slug": "android-kotlin-m1-l1",
          "title": "Kotlin Variables, Null Safety and Functions",
          "objectives": [
            "Declare val and var with Kotlin type inference",
            "Handle nulls with ? and the Elvis operator",
            "Write functions with default and named arguments"
          ],
          "introduction": "Kotlin was built to end the NullPointerException: the type system itself refuses to let a null slip through unnoticed.",
          "concept": "Kotlin variables are declared with val for read-only values and var for mutable ones, and the compiler infers the type from the initial value. Null safety is built into the type system: String cannot be null, while String? can, and the compiler forces a check before you use a nullable value. The safe call ?. runs a method only when the value is not null, and the Elvis operator ?: supplies a default when it is null. Functions declare their return type after the parameter list, support default arguments and named arguments at call sites, and single-expression functions can use = instead of braces.",
          "syntax": "val name: String = \"Ada\"\nvar score = 0\nfun greet(name: String?): String = \"Hello, ${name ?: \"friend\"}\"",
          "analogy": "Kotlin null safety is like a customs form: the nullable stamp must be declared at the border, and nothing undeclared gets through.",
          "exampleCode": "fun greet(name: String?): String {\n    return \"Hello, ${name ?: \"friend\"}!\"\n}\n\nfun main() {\n    val user: String? = null\n    println(greet(user))\n    println(greet(\"Ada\"))\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Declare read-only values with val and mutable ones with var.",
            "Mark types that may be null with ? so the compiler tracks them.",
            "Use ?. to call methods only on non-null values.",
            "Supply defaults with the Elvis operator ?: when a value may be null."
          ],
          "commonMistakes": [
            "Using !! to force-unwrap a null, which brings back the crash Kotlin prevents.",
            "Declaring everything var when most values never change and should be val.",
            "Forgetting that a nullable type needs a check before calling methods on it."
          ],
          "debugging": {
            "prompt": "The app should greet the user or fall back to \"friend\", but it crashes on a null name. Find the bug.",
            "buggyCode": "fun greet(name: String?): String {\n    return \"Hello, \" + name!!.uppercase() + \"!\"\n}",
            "fixedCode": "fun greet(name: String?): String {\n    return \"Hello, \" + (name ?: \"friend\").uppercase() + \"!\"\n}",
            "explanation": "The !! operator asserts the name is not null and crashes when it is. The Elvis operator supplies the fallback safely instead."
          },
          "miniChallenge": "Write a function describe that takes a nullable age and returns \"Age: <n>\" or \"Age unknown\" when the age is null.",
          "summary": "Kotlin separates val from var and nullable types from non-null ones; ?. and ?: handle nulls safely without ever crashing.",
          "quiz": [
            {
              "question": "What is the difference between val and var in Kotlin?",
              "options": [
                "They are identical",
                "val is read-only, var is mutable",
                "val is for numbers only",
                "var is deprecated"
              ],
              "answer": 1,
              "explanation": "val can be assigned once; var can be reassigned."
            },
            {
              "question": "What does the Elvis operator ?: do?",
              "options": [
                "It compares two values",
                "It returns the left value unless it is null, then the right value",
                "It throws an exception",
                "It creates a list"
              ],
              "answer": 1,
              "explanation": "a ?: b evaluates to a when a is not null, otherwise b."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m1-l1-e1",
            "title": "Greet with a fallback",
            "type": "build-program",
            "instructions": "Read one line: either a name or the word null. Print exactly: Hello, <name>! using friend when the input is null.",
            "starterCode": "fun main() {\n    // read the line, print the greeting with a fallback\n}\n",
            "solution": "fun main() {\n    val name: String? = readLine()?.takeIf { it != \"null\" }\n    println(\"Hello, ${name ?: \"friend\"}!\")\n}\n",
            "solutionExplanation": "The nullable name is read with a safe call and the Elvis operator supplies friend when the input is null.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Named",
                "stdin": "Ada\n",
                "expectedStdout": "Hello, Ada!",
                "hidden": false
              },
              {
                "name": "Null input",
                "stdin": "null\n",
                "expectedStdout": "Hello, friend!",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A ? on a type means null is allowed and the compiler will demand handling.",
              "approach": "Prefer ?: with a sensible default over !!, which can still crash.",
              "structure": "Declare with val or var, mark nullable types with ?, fall back with ?:."
            }
          }
        },
        {
          "id": "android-kotlin-m1-l2",
          "slug": "android-kotlin-m1-l2",
          "title": "Classes, Data Classes and Collections",
          "objectives": [
            "Define classes with primary constructors",
            "Use data classes for value types",
            "Work with lists, sets and maps idiomatically"
          ],
          "introduction": "An Android app is a graph of objects — users, tasks, messages — and Kotlin classes describe each one in a handful of lines.",
          "concept": "Kotlin classes declare their properties directly in the primary constructor, so a class with two properties needs no boilerplate getters or setters. A data class adds equals, hashCode, toString and copy for free, which makes it the right choice for value objects such as a User or a Task. Collections are first-class: listOf and mutableListOf create lists, mapOf creates maps, and operations such as map, filter and firstOrNull transform them without loops. Kotlin separates read-only collection interfaces from mutable ones, so a function receiving a List cannot accidentally change the caller's data.",
          "syntax": "data class User(val id: Int, val name: String)\nval names = users.map { it.name }",
          "analogy": "A data class is like a printed form: the fields are the blanks, and the form knows how to compare itself, copy itself and describe itself.",
          "exampleCode": "data class Task(val id: Int, val title: String, val done: Boolean = false)\n\nfun main() {\n    val tasks = listOf(Task(1, \"Buy milk\"), Task(2, \"Call Ada\", true))\n    val open = tasks.filter { !it.done }.map { it.title }\n    println(open)\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Declare a class with its properties in the primary constructor.",
            "Mark value types as data classes to get equals, copy and toString.",
            "Build collections with listOf and transform them with map and filter.",
            "Prefer read-only List parameters so callers keep control of mutation."
          ],
          "commonMistakes": [
            "Writing manual equals and toString for a class that should be a data class.",
            "Mutating a list passed as a read-only List, which the compiler prevents.",
            "Using a loop with an index where map or filter expresses the intent directly."
          ],
          "debugging": {
            "prompt": "The program should print only the unfinished tasks, but it prints all of them. Find the bug.",
            "buggyCode": "val open = tasks.filter { it.done }.map { it.title }",
            "fixedCode": "val open = tasks.filter { !it.done }.map { it.title }",
            "explanation": "The filter keeps tasks where done is true, the opposite of what is wanted. Negating the condition keeps only unfinished tasks."
          },
          "miniChallenge": "Define a data class Contact with id, name and phone, then build a list of three contacts and print the names of those whose name starts with A.",
          "summary": "Kotlin classes carry properties in the constructor, data classes add value semantics for free, and map and filter replace manual loops.",
          "quiz": [
            {
              "question": "What does a data class give you automatically?",
              "options": [
                "A database",
                "equals, hashCode, toString and copy",
                "A user interface",
                "Network access"
              ],
              "answer": 1,
              "explanation": "The compiler generates the value-type boilerplate for data classes."
            },
            {
              "question": "What does tasks.filter { !it.done } return?",
              "options": [
                "All tasks",
                "Only the tasks that are not done",
                "Only the done tasks",
                "The first task"
              ],
              "answer": 1,
              "explanation": "filter keeps exactly the elements for which the predicate is true."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m1-l2-e1",
            "title": "Filter and sum scores",
            "type": "build-program",
            "instructions": "Read a line of space-separated integers. Print the sum of the numbers greater than 10, or 0 when there are none.",
            "starterCode": "fun main() {\n    // read the numbers, sum those greater than 10\n}\n",
            "solution": "fun main() {\n    val numbers = readLine().orEmpty().split(\" \").filter { it.isNotEmpty() }.map { it.toInt() }\n    println(numbers.filter { it > 10 }.sum())\n}\n",
            "solutionExplanation": "The numbers are parsed, filtered to those greater than 10, and summed with the collection operations.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Some big",
                "stdin": "5 12 3 20 8\n",
                "expectedStdout": "32",
                "hidden": false
              },
              {
                "name": "None big",
                "stdin": "1 2 3\n",
                "expectedStdout": "0",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Data classes are for values: equals, copy and toString come free.",
              "approach": "Transform collections with filter and map instead of index loops.",
              "structure": "Constructor properties, data class marker, filter then map."
            }
          }
        }
      ]
    },
    {
      "id": "android-kotlin-m2",
      "title": "First Android App",
      "description": "Activities, the lifecycle and the views that make up a screen.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "android-kotlin-m2-l1",
          "slug": "android-kotlin-m2-l1",
          "title": "Activities, the Lifecycle and the Manifest",
          "objectives": [
            "Explain what an Activity is",
            "Trace the activity lifecycle callbacks",
            "Declare an activity in AndroidManifest.xml"
          ],
          "introduction": "An Android app is a set of screens that the system can destroy at any moment: the lifecycle is how your app survives that.",
          "concept": "An Activity is a single screen with a user interface, and Android manages it through a lifecycle of callbacks: onCreate builds the screen, onStart makes it visible, onResume lets the user interact, onPause suspends interaction, onStop hides it, and onDestroy removes it. The system may destroy a backgrounded activity to reclaim memory, then recreate it later, so state that matters must be saved in onSaveInstanceState or in a ViewModel. The AndroidManifest.xml declares every activity, the launcher activity that opens first, and the permissions the app needs. Understanding the lifecycle is what separates apps that survive rotation and phone calls from apps that crash or lose data.",
          "syntax": "class MainActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n    }\n}",
          "analogy": "The activity lifecycle is like a play with acts: the actor enters, performs, exits stage left, and may be called back for an encore.",
          "exampleCode": "class MainActivity : AppCompatActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n    }\n    override fun onResume() {\n        super.onResume()\n        Log.d(\"MainActivity\", \"resumed\")\n    }\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Extend AppCompatActivity and override onCreate to build the screen.",
            "Call setContentView with the layout resource for the activity.",
            "Override onResume and onPause for work that should start and stop with visibility.",
            "Declare the activity in AndroidManifest.xml with the launcher intent filter."
          ],
          "commonMistakes": [
            "Doing heavy work in onCreate, which delays the first frame.",
            "Forgetting super.onCreate, which crashes the activity immediately.",
            "Storing important state only in activity fields, which vanish when the system destroys it."
          ],
          "debugging": {
            "prompt": "The app crashes the moment the activity opens. Find the bug.",
            "buggyCode": "override fun onCreate(savedInstanceState: Bundle?) {\n    setContentView(R.layout.activity_main)\n}",
            "fixedCode": "override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    setContentView(R.layout.activity_main)\n}",
            "explanation": "The base class onCreate must run first; skipping super.onCreate leaves the activity uninitialised and it crashes."
          },
          "miniChallenge": "Add log statements to onCreate, onStart, onResume, onPause, onStop and onDestroy, then rotate the device and read the order in Logcat.",
          "summary": "An Activity is a screen managed through lifecycle callbacks; onCreate builds it, onResume interacts, and the manifest declares it.",
          "quiz": [
            {
              "question": "Which callback builds the activity screen?",
              "options": [
                "onResume",
                "onCreate",
                "onDestroy",
                "onPause"
              ],
              "answer": 1,
              "explanation": "onCreate runs once when the activity is created and sets up its UI."
            },
            {
              "question": "Why must important state not live only in activity fields?",
              "options": [
                "Fields are slow",
                "The system may destroy the activity and recreate it, losing field values",
                "Fields cannot hold strings",
                "Activities have no fields"
              ],
              "answer": 1,
              "explanation": "A destroyed activity loses its fields; saved state or a ViewModel survives recreation."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m2-l1-e1",
            "title": "Lifecycle order",
            "type": "multiple-choice",
            "instructions": "An activity is launched fresh. In which order do its first three lifecycle callbacks run?",
            "starterCode": "override fun onCreate(...) { ... }\noverride fun onStart() { ... }\noverride fun onResume() { ... }",
            "solution": "onCreate, onStart, onResume.",
            "solutionExplanation": "Creation always runs onCreate, then onStart makes the activity visible, then onResume lets the user interact.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "onCreate, onStart, onResume.",
                "hidden": false
              }
            ],
            "options": [
              "onResume, onStart, onCreate",
              "onCreate, onStart, onResume",
              "onStart, onCreate, onResume",
              "onCreate, onResume, onStart"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "The lifecycle is a sequence: create, start, resume, pause, stop, destroy.",
              "approach": "Always call the super method first in every lifecycle override.",
              "structure": "Extend the activity, override onCreate, set the content view."
            }
          }
        },
        {
          "id": "android-kotlin-m2-l2",
          "slug": "android-kotlin-m2-l2",
          "title": "Views, View Binding and Layouts",
          "objectives": [
            "Build layouts with XML view hierarchies",
            "Access views safely with View Binding",
            "Handle clicks and update the UI"
          ],
          "introduction": "Before Jetpack Compose, Android screens were XML: a hierarchy of views inflated into objects your code can touch.",
          "concept": "Android layouts are XML files describing a hierarchy of views: a LinearLayout or ConstraintLayout contains TextViews, Buttons and EditTexts, each with an id. The activity inflates the layout with setContentView, turning XML into live view objects. View Binding generates a binding class from the layout so code accesses views through typed properties such as binding.titleText instead of findViewById casts. Click listeners attach to buttons with setOnClickListener, and updating a TextView text property immediately redraws that view. ConstraintLayout positions views relative to each other and the parent, which keeps layouts flat and fast on every screen size.",
          "syntax": "binding.titleText.text = \"Hello\"\nbinding.saveButton.setOnClickListener { save() }",
          "analogy": "Inflating a layout is like assembling flat-pack furniture: the XML is the instruction sheet and the binding is the labelled bag of parts.",
          "exampleCode": "class MainActivity : AppCompatActivity() {\n    private lateinit var binding: ActivityMainBinding\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        binding = ActivityMainBinding.inflate(layoutInflater)\n        setContentView(binding.root)\n        binding.saveButton.setOnClickListener {\n            binding.titleText.text = \"Saved!\"\n        }\n    }\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Define the layout XML with ids on the views your code needs.",
            "Inflate the binding in onCreate and set the content view to binding.root.",
            "Access views through the binding instead of findViewById.",
            "Attach click listeners and update view properties in response."
          ],
          "commonMistakes": [
            "Accessing a view before setContentView, when it does not exist yet.",
            "Using findViewById with a wrong cast, which crashes at runtime.",
            "Holding a binding reference after the view is destroyed in a fragment."
          ],
          "debugging": {
            "prompt": "Tapping Save should change the title text, but nothing happens. Find the bug.",
            "buggyCode": "binding.saveButton.setOnClickListener {\n    titleText.text = \"Saved!\"\n}",
            "fixedCode": "binding.saveButton.setOnClickListener {\n    binding.titleText.text = \"Saved!\"\n}",
            "explanation": "The unqualified titleText does not refer to the bound view. Views must be accessed through the binding object."
          },
          "miniChallenge": "Add an EditText and a Button to a layout: tapping the button copies the typed name into a TextView greeting.",
          "summary": "XML layouts inflate into view hierarchies; View Binding gives typed access to each view, and listeners update them in response to taps.",
          "quiz": [
            {
              "question": "What does View Binding generate?",
              "options": [
                "A database",
                "A typed binding class for each layout, exposing its views as properties",
                "A new activity",
                "An app icon"
              ],
              "answer": 1,
              "explanation": "The binding class mirrors the layout XML with a property per view id."
            },
            {
              "question": "Why prefer View Binding over findViewById?",
              "options": [
                "It is shorter to type only",
                "It is type-safe and null-safe: wrong ids fail at compile time",
                "It loads faster from the network",
                "findViewById is removed"
              ],
              "answer": 1,
              "explanation": "Binding properties are checked at compile time, so missing or mistyped views cannot crash at runtime."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m2-l2-e1",
            "title": "Binding access",
            "type": "predict-output",
            "instructions": "After the button is tapped, what text does the title TextView show?",
            "starterCode": "binding.saveButton.setOnClickListener {\n    binding.titleText.text = \"Saved!\"\n}",
            "solution": "Saved!",
            "solutionExplanation": "The click listener assigns the string Saved! to the title view text property, which redraws immediately.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Saved!",
                "hidden": false
              }
            ],
            "options": [
              "Hello",
              "Saved!",
              "Save",
              ""
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "View Binding turns layout ids into typed properties on the binding object.",
              "approach": "Inflate the binding in onCreate and use binding.root as the content view.",
              "structure": "Inflate, set content view, access views through binding, attach listeners."
            }
          }
        }
      ]
    },
    {
      "id": "android-kotlin-m3",
      "title": "Jetpack Compose",
      "description": "The modern declarative UI toolkit: composables, state and Material 3.",
      "level": "intermediate",
      "order": 3,
      "lessons": [
        {
          "id": "android-kotlin-m3-l1",
          "slug": "android-kotlin-m3-l1",
          "title": "Composable Functions and State",
          "objectives": [
            "Write @Composable functions",
            "Manage UI state with remember and mutableStateOf",
            "Explain recomposition"
          ],
          "introduction": "Compose throws away XML: the screen is Kotlin functions, and changing state re-runs the functions that read it.",
          "concept": "In Jetpack Compose, a composable function annotated with @Composable describes part of the UI and emits other composables, building the screen as a tree of function calls. State is held with remember and mutableStateOf: reading a state value inside a composable subscribes it, and writing a new value triggers recomposition, which re-runs only the composables that read that state. Composables must be side-effect free, because recomposition can run them many times; work such as network calls belongs in effects or a ViewModel. State hoisting lifts state to the caller so a composable stays reusable and testable, receiving its value and an on-change callback as parameters.",
          "syntax": "@Composable\nfun Greeting(name: String) {\n    Text(text = \"Hello, $name!\")\n}",
          "analogy": "Recomposition is like a spreadsheet: change one cell and only the formulas that depend on it recalculate.",
          "exampleCode": "@Composable\nfun Counter() {\n    var count by remember { mutableStateOf(0) }\n    Column {\n        Text(text = \"Count: $count\")\n        Button(onClick = { count++ }) {\n            Text(\"Add one\")\n        }\n    }\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Annotate the UI function with @Composable so it can emit other composables.",
            "Hold mutable UI state with remember and mutableStateOf.",
            "Read the state value in the composable so recomposition tracks it.",
            "Write the new value in the click handler and let Compose re-run the affected composables."
          ],
          "commonMistakes": [
            "Reading state without remember, so the value resets on every recomposition.",
            "Putting side effects such as network calls directly inside a composable.",
            "Hoisting state nowhere, leaving every composable holding its own copy."
          ],
          "debugging": {
            "prompt": "The counter resets to zero whenever the screen recomposes for another reason. Find the bug.",
            "buggyCode": "var count by mutableStateOf(0)",
            "fixedCode": "var count by remember { mutableStateOf(0) }",
            "explanation": "Without remember the state is recreated on every recomposition. remember keeps the value alive across recompositions."
          },
          "miniChallenge": "Build a composable with a text field and a greeting that updates live as the user types, using remember for the input state.",
          "summary": "Composable functions describe the UI; remember plus mutableStateOf holds state, and writing it triggers recomposition of the readers.",
          "quiz": [
            {
              "question": "What is recomposition in Compose?",
              "options": [
                "Rebuilding the app",
                "Re-running the composables that read changed state",
                "Deleting the screen",
                "Restarting the activity"
              ],
              "answer": 1,
              "explanation": "When state changes, Compose re-executes the composables that read it, updating only those parts."
            },
            {
              "question": "Why wrap mutableStateOf in remember?",
              "options": [
                "It is required syntax",
                "So the state survives recomposition instead of resetting",
                "It makes state global",
                "It adds animation"
              ],
              "answer": 1,
              "explanation": "remember preserves the state object across recompositions of the same composable."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m3-l1-e1",
            "title": "Compose counter commands",
            "type": "build-program",
            "instructions": "Read lines of INC, DEC or RESET starting from 0 (never below 0). Print the final count.",
            "starterCode": "fun main() {\n    // simulate the counter state, like a Compose remember block\n}\n",
            "solution": "fun main() {\n    var count = 0\n    while (true) {\n        val line = readLine() ?: break\n        when (line) {\n            \"INC\" -> count++\n            \"DEC\" -> if (count > 0) count--\n            \"RESET\" -> count = 0\n        }\n    }\n    println(count)\n}\n",
            "solutionExplanation": "Each command is a state write; DEC clamps at zero and the final value is what recomposition would display.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "INC\nINC\nDEC\n",
                "expectedStdout": "1",
                "hidden": false
              },
              {
                "name": "Reset",
                "stdin": "INC\nRESET\nINC\nINC\n",
                "expectedStdout": "2",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "State is read inside composables and written in handlers; recomposition follows the reads.",
              "approach": "Wrap every mutableStateOf in remember or it resets on the next recomposition.",
              "structure": "Composable annotation, remember state, read in UI, write in handler."
            }
          }
        },
        {
          "id": "android-kotlin-m3-l2",
          "slug": "android-kotlin-m3-l2",
          "title": "LazyColumn Lists and Material 3",
          "objectives": [
            "Render long lists with LazyColumn",
            "Apply Material 3 theming with MaterialTheme",
            "Build cards and list rows with Material components"
          ],
          "introduction": "A list of a thousand contacts must scroll at sixty frames a second: LazyColumn only composes the rows on screen.",
          "concept": "LazyColumn is Compose's virtualised list: its items block only composes the rows currently visible, recycling them as the user scrolls, so a list of any size stays fast. Each item needs a stable key so Compose can track rows across inserts and deletes. Material 3 is the design system Compose themes with: MaterialTheme supplies the colour scheme, typography and shapes, and components such as Card, Button and TopAppBar follow it automatically. A Scaffold provides the standard screen structure with a top bar, content area and floating action button, all respecting the theme.",
          "syntax": "LazyColumn {\n    items(users, key = { it.id }) { user ->\n        Text(user.name)\n    }\n}",
          "analogy": "LazyColumn is like a conveyor belt sushi bar: only the plates passing your seat exist on the belt; the rest wait in the kitchen.",
          "exampleCode": "@Composable\nfun UserList(users: List<User>) {\n    LazyColumn {\n        items(users, key = { it.id }) { user ->\n            Card(modifier = Modifier.fillMaxWidth().padding(8.dp)) {\n                Text(text = user.name, modifier = Modifier.padding(16.dp))\n            }\n        }\n    }\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Pass the data to LazyColumn and declare rows in the items block.",
            "Give each item a stable key from its id.",
            "Wrap rows in Material 3 components such as Card for consistent styling.",
            "Let MaterialTheme supply colours and typography instead of hardcoding them."
          ],
          "commonMistakes": [
            "Using the list index as the key, which misidentifies rows after deletes.",
            "Putting a LazyColumn inside a vertically scrolling Column, which breaks virtualisation.",
            "Hardcoding colours instead of using the MaterialTheme colour scheme."
          ],
          "debugging": {
            "prompt": "After deleting the first user, the wrong row disappears from the list. Find the bug.",
            "buggyCode": "items(users) { user -> Text(user.name) }",
            "fixedCode": "items(users, key = { it.id }) { user -> Text(user.name) }",
            "explanation": "Without a stable key Compose tracks rows by position, so deleting the first row shifts every identity. The id key keeps each row attached to its user."
          },
          "miniChallenge": "Build a LazyColumn of tasks with a checkbox per row that toggles the task done state, keyed by task id.",
          "summary": "LazyColumn composes only visible rows keyed by stable ids, and Material 3 components render them in the app theme.",
          "quiz": [
            {
              "question": "Why does LazyColumn only compose visible rows?",
              "options": [
                "To save network",
                "To keep scrolling fast and memory flat for lists of any size",
                "To hide data",
                "To animate better"
              ],
              "answer": 1,
              "explanation": "Virtualisation means the list cost depends on the viewport, not the data size."
            },
            {
              "question": "What does a stable key in items() protect against?",
              "options": [
                "Slow scrolling",
                "Rows being misidentified after inserts or deletes",
                "Theme changes",
                "Crashes on rotation"
              ],
              "answer": 1,
              "explanation": "Keys bind each composed row to its data item across list changes."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m3-l2-e1",
            "title": "LazyColumn vs Column",
            "type": "multiple-choice",
            "instructions": "A list has 5,000 items. Which composable should render it and why?",
            "starterCode": "LazyColumn { items(huge) { ... } }",
            "solution": "LazyColumn, because it only composes the rows on screen.",
            "solutionExplanation": "A Column would compose all 5,000 rows at once; LazyColumn composes only the visible window and recycles rows while scrolling.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "LazyColumn, because it only composes the rows on screen.",
                "hidden": false
              }
            ],
            "options": [
              "Column, because it is simpler",
              "LazyColumn, because it only composes the rows on screen",
              "Row, because lists are horizontal",
              "Box, because it stacks children"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "LazyColumn virtualises: only visible rows are composed.",
              "approach": "Always pass a stable id as the key when the list can change.",
              "structure": "LazyColumn, items with a key, Material Card rows."
            }
          }
        }
      ]
    },
    {
      "id": "android-kotlin-m4",
      "title": "Data and Navigation",
      "description": "Moving between destinations and persisting data locally.",
      "level": "intermediate",
      "order": 4,
      "lessons": [
        {
          "id": "android-kotlin-m4-l1",
          "slug": "android-kotlin-m4-l1",
          "title": "Navigation Component and Arguments",
          "objectives": [
            "Define a navigation graph with destinations",
            "Navigate with actions and pass typed arguments",
            "Handle back navigation and deep links"
          ],
          "introduction": "Every screen in a modern Android app is a destination on a map, and the navigation graph is that map.",
          "concept": "The Navigation Component models an app as a graph of destinations connected by actions. A NavHost hosts the graph, each destination is a composable or fragment screen, and navController.navigate moves along an action. Arguments are declared on the destination with a type and travel in the route, so the receiving screen reads them type-safely from its arguments. The back stack records the journey, and the system back button pops it. Deep links map a URL to a destination, letting notifications and links open the right screen directly.",
          "syntax": "navController.navigate(\"detail/${user.id}\")",
          "analogy": "A navigation graph is like a subway map: stations are destinations, lines are actions, and the back stack is your journey home.",
          "exampleCode": "@Composable\nfun AppNav() {\n    val navController = rememberNavController()\n    NavHost(navController, startDestination = \"home\") {\n        composable(\"home\") { HomeScreen(onUser = { navController.navigate(\"detail/${it.id}\") }) }\n        composable(\"detail/{userId}\") { backStack ->\n            DetailScreen(userId = backStack.arguments?.getString(\"userId\"))\n        }\n    }\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Create a NavHost with a start destination and a composable per screen.",
            "Declare arguments in the destination route with their types.",
            "Navigate with navController.navigate and the argument values in the route.",
            "Read the arguments from the back stack entry on the destination screen."
          ],
          "commonMistakes": [
            "Navigating to a route string that does not match any destination.",
            "Reading an argument with the wrong type, which returns null or crashes.",
            "Pushing the same destination repeatedly instead of using popUpTo for top-level flows."
          ],
          "debugging": {
            "prompt": "Navigating to the detail screen crashes with a missing argument error. Find the bug.",
            "buggyCode": "navController.navigate(\"detail\") // route declared as detail/{userId}",
            "fixedCode": "navController.navigate(\"detail/${user.id}\")",
            "explanation": "The route declares a userId argument, so navigating to plain detail leaves it missing. The value must be included in the route."
          },
          "miniChallenge": "Add a settings destination to the graph, reachable from Home, with a back button that returns via the back stack.",
          "summary": "The Navigation Component connects destinations in a graph; actions navigate with typed arguments, and the back stack records the path.",
          "quiz": [
            {
              "question": "What is a NavHost?",
              "options": [
                "A web server",
                "The composable that hosts the navigation graph and shows the current destination",
                "A database",
                "A test runner"
              ],
              "answer": 1,
              "explanation": "NavHost owns the graph and renders whichever destination is currently on top of the back stack."
            },
            {
              "question": "How do arguments reach a destination?",
              "options": [
                "Through a global variable",
                "In the route string, read from the back stack entry arguments",
                "By editing the manifest",
                "They cannot be passed"
              ],
              "answer": 1,
              "explanation": "Arguments travel in the route and are read type-safely from the destination arguments."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m4-l1-e1",
            "title": "Back stack",
            "type": "multiple-choice",
            "instructions": "The back stack is [home, list, detail]. The user presses the system back button. Which destination shows?",
            "starterCode": "NavHost back stack: home -> list -> detail",
            "solution": "list.",
            "solutionExplanation": "Back pops the top destination, so detail is removed and list becomes current.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "list.",
                "hidden": false
              }
            ],
            "options": [
              "home",
              "list",
              "detail",
              "The app exits"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Destinations are routes in a graph; navigate moves along them with arguments.",
              "approach": "Declare the argument in the route and include its value when navigating.",
              "structure": "NavHost with destinations, navigate with the route, read arguments on arrival."
            }
          }
        },
        {
          "id": "android-kotlin-m4-l2",
          "slug": "android-kotlin-m4-l2",
          "title": "Room Database and Coroutines",
          "objectives": [
            "Define Room entities, DAOs and the database",
            "Explain suspend functions and coroutines",
            "Load data off the main thread with a Flow"
          ],
          "introduction": "A notes app that forgets its notes is useless: Room gives Android a real local database, and coroutines keep it off the main thread.",
          "concept": "Room is Android's persistence library over SQLite: an @Entity data class defines a table, a @Dao interface declares queries with @Query and @Insert, and the @Database class ties them together. DAO functions are suspend functions, which run inside coroutines: lightweight tasks that suspend instead of blocking a thread. Calling a suspend function from the main thread is safe because Room runs the query on a background dispatcher, and a Flow return type streams updates so the UI refreshes whenever the table changes. The golden rule is simple: never touch the database on the main thread, and coroutines make that rule easy to follow.",
          "syntax": "@Dao\ninterface TaskDao {\n    @Query(\"SELECT * FROM tasks\")\n    fun getAll(): Flow<List<Task>>\n}",
          "analogy": "A coroutine is like a chef who starts the rice, sets a timer, and prepares vegetables while it cooks instead of staring at the pot.",
          "exampleCode": "@Entity\ndata class Task(@PrimaryKey(autoGenerate = true) val id: Int = 0, val title: String)\n\n@Dao\ninterface TaskDao {\n    @Query(\"SELECT * FROM tasks\")\n    fun getAll(): Flow<List<Task>>\n    @Insert\n    suspend fun insert(task: Task)\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Annotate the data class with @Entity and a primary key.",
            "Declare queries in a @Dao interface, returning Flow for live updates.",
            "Make write functions suspend so they run in a coroutine.",
            "Collect the Flow in the UI so the list refreshes when the table changes."
          ],
          "commonMistakes": [
            "Running a Room query on the main thread, which crashes the app.",
            "Calling a suspend function from a non-suspend context without launching a coroutine.",
            "Forgetting autoGenerate on the primary key and inserting duplicate ids."
          ],
          "debugging": {
            "prompt": "The app crashes when loading tasks, complaining the database was accessed on the main thread. Find the bug.",
            "buggyCode": "val tasks = dao.getAllBlocking() // called from onCreate",
            "fixedCode": "lifecycleScope.launch {\n    dao.getAll().collect { tasks -> updateUi(tasks) }\n}",
            "explanation": "Database access must happen off the main thread. Collecting the Flow inside a coroutine scope moves the work to a background dispatcher."
          },
          "miniChallenge": "Add a delete function to the DAO and a swipe-to-delete action in the list that calls it from a coroutine scope.",
          "summary": "Room maps entities and DAOs onto SQLite; suspend functions and Flows run database work in coroutines off the main thread.",
          "quiz": [
            {
              "question": "What does a suspend function do?",
              "options": [
                "It blocks the thread",
                "It can pause and resume without blocking its thread",
                "It runs only once",
                "It deletes data"
              ],
              "answer": 1,
              "explanation": "Suspend functions pause at suspension points and resume later, freeing the thread in between."
            },
            {
              "question": "Why return Flow<List<Task>> from a DAO query?",
              "options": [
                "It is faster to type",
                "The UI receives a new list automatically whenever the table changes",
                "It uses less storage",
                "It prevents all errors"
              ],
              "answer": 1,
              "explanation": "A Flow emits a new value on every table change, so collecting it keeps the UI live."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m4-l2-e1",
            "title": "Suspend and resume",
            "type": "predict-output",
            "instructions": "A coroutine launches, calls a suspend function that waits one second, then prints Done. What happens to the main thread during that second?",
            "starterCode": "lifecycleScope.launch {\n    delay(1000)\n    println(\"Done\")\n}",
            "solution": "It stays free to draw the UI and handle input.",
            "solutionExplanation": "delay suspends the coroutine without blocking its thread, so the main thread keeps running the interface.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "It stays free to draw the UI and handle input.",
                "hidden": false
              }
            ],
            "options": [
              "It freezes until Done prints",
              "It stays free to draw the UI and handle input",
              "The app crashes",
              "The coroutine runs on a new process"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Room is SQLite with compile-time checks; coroutines keep it off the main thread.",
              "approach": "DAO queries return Flow for live lists and suspend for writes.",
              "structure": "Entity, DAO with Flow, collect in a coroutine scope."
            }
          }
        }
      ]
    },
    {
      "id": "android-kotlin-m5",
      "title": "Production Android",
      "description": "Architecture, networking and shipping to Google Play.",
      "level": "advanced",
      "order": 5,
      "lessons": [
        {
          "id": "android-kotlin-m5-l1",
          "slug": "android-kotlin-m5-l1",
          "title": "ViewModel and StateFlow",
          "objectives": [
            "Explain why a ViewModel survives configuration changes",
            "Expose UI state as StateFlow",
            "Collect state in Compose with collectAsState"
          ],
          "introduction": "Rotate the phone and the activity dies — but the ViewModel does not, which is exactly why the data lives there.",
          "concept": "A ViewModel holds UI state and business logic in a lifecycle-aware object that survives configuration changes such as rotation, because it is scoped to the activity or navigation destination rather than the UI itself. It exposes state as a StateFlow, a hot flow that always holds the latest value, and the UI collects it with collectAsState so every emission recomposes the screen. The ViewModel never holds a reference to a view or a context, which prevents memory leaks, and its onCleared callback cancels work when the screen is truly finished. This separation is the core of modern Android architecture: the UI renders state, and the ViewModel owns it.",
          "syntax": "class TasksViewModel : ViewModel() {\n    private val _tasks = MutableStateFlow<List<Task>>(emptyList())\n    val tasks: StateFlow<List<Task>> = _tasks\n}",
          "analogy": "A ViewModel is like a stage manager: the actors (screens) come and go, but the manager keeps the script and the props.",
          "exampleCode": "class CounterViewModel : ViewModel() {\n    private val _count = MutableStateFlow(0)\n    val count: StateFlow<Int> = _count\n    fun increment() { _count.value += 1 }\n}\n\n@Composable\nfun CounterScreen(viewModel: CounterViewModel = viewModel()) {\n    val count by viewModel.count.collectAsState()\n    Text(text = \"Count: $count\")\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Create a ViewModel holding the screen state in a MutableStateFlow.",
            "Expose the state as a read-only StateFlow so the UI cannot mutate it.",
            "Collect the flow in the composable with collectAsState.",
            "Mutate state only through ViewModel functions, never from the UI directly."
          ],
          "commonMistakes": [
            "Holding a view or Activity reference in a ViewModel, which leaks memory.",
            "Exposing the MutableStateFlow directly, letting the UI write state.",
            "Creating a new ViewModel instance manually instead of using the viewModel delegate."
          ],
          "debugging": {
            "prompt": "The counter resets to zero on rotation even though it lives in a ViewModel. Find the bug.",
            "buggyCode": "val viewModel = CounterViewModel() // created in the composable",
            "fixedCode": "val viewModel: CounterViewModel = viewModel()",
            "explanation": "A manually created ViewModel is recreated with the composable. The viewModel delegate retrieves the lifecycle-scoped instance that survives rotation."
          },
          "miniChallenge": "Move your task list state into a ViewModel backed by a StateFlow, and collect it in the list screen.",
          "summary": "A ViewModel survives configuration changes and exposes StateFlow; the UI collects it and renders, while the ViewModel owns all mutations.",
          "quiz": [
            {
              "question": "What survives a screen rotation: the Activity or the ViewModel?",
              "options": [
                "The Activity",
                "The ViewModel",
                "Neither",
                "Both always"
              ],
              "answer": 1,
              "explanation": "The Activity is destroyed and recreated, but the ViewModel is retained across the change."
            },
            {
              "question": "Why expose StateFlow instead of MutableStateFlow?",
              "options": [
                "It is shorter",
                "So the UI can observe but not mutate the state directly",
                "It is faster",
                "Mutable flows are deprecated"
              ],
              "answer": 1,
              "explanation": "Exposing the read-only type enforces one-way data flow: mutations go through ViewModel functions."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m5-l1-e1",
            "title": "ViewModel counter commands",
            "type": "build-program",
            "instructions": "Read lines of INC, DEC or RESET starting from 0 (never below 0). Print the final count.",
            "starterCode": "fun main() {\n    // simulate the ViewModel counter state\n}\n",
            "solution": "fun main() {\n    var count = 0\n    while (true) {\n        val line = readLine() ?: break\n        when (line) {\n            \"INC\" -> count++\n            \"DEC\" -> if (count > 0) count--\n            \"RESET\" -> count = 0\n        }\n    }\n    println(count)\n}\n",
            "solutionExplanation": "The counter state lives in one place and each command is a ViewModel-style mutation of it.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "INC\nINC\nDEC\nINC\n",
                "expectedStdout": "2",
                "hidden": false
              },
              {
                "name": "Clamp",
                "stdin": "DEC\nINC\nRESET\n",
                "expectedStdout": "0",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "ViewModels outlive the UI; StateFlow carries the latest state to collectors.",
              "approach": "Obtain the ViewModel with the viewModel delegate, never with a constructor call.",
              "structure": "MutableStateFlow inside, StateFlow outside, collectAsState in the UI."
            }
          }
        },
        {
          "id": "android-kotlin-m5-l2",
          "slug": "android-kotlin-m5-l2",
          "title": "Retrofit Networking and Repositories",
          "objectives": [
            "Define a Retrofit API interface",
            "Explain the repository pattern",
            "Handle network errors and loading states"
          ],
          "introduction": "Most Android apps are windows onto a server: Retrofit turns an HTTP API into a Kotlin interface you call like any function.",
          "concept": "Retrofit maps a REST API onto a Kotlin interface: annotations such as @GET declare the endpoint and path, and the return type is a suspend function or a Call. A repository sits between the network and the UI: it decides whether data comes from the network, the local database, or both, and it converts network errors into results the UI can display. Moshi or Gson converts JSON into data classes automatically. The ViewModel calls the repository from a coroutine, and the UI shows loading, data, or an error message depending on the result. Keeping network code out of the UI is what makes it testable and replaceable.",
          "syntax": "interface UserApi {\n    @GET(\"users\")\n    suspend fun getUsers(): List<User>\n}",
          "analogy": "A repository is like a librarian: you ask for a book, and the librarian decides whether it is on the shelf, in the archive, or must be ordered.",
          "exampleCode": "interface UserApi {\n    @GET(\"users\")\n    suspend fun getUsers(): List<User>\n}\n\nclass UserRepository(private val api: UserApi) {\n    suspend fun loadUsers(): Result<List<User>> = try {\n        Result.success(api.getUsers())\n    } catch (e: Exception) {\n        Result.failure(e)\n    }\n}",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Declare the API as an interface with @GET annotations and suspend functions.",
            "Build the Retrofit instance with a base URL and a JSON converter.",
            "Write a repository that calls the API and wraps failures in a Result.",
            "Call the repository from the ViewModel and expose loading, data and error states."
          ],
          "commonMistakes": [
            "Calling the API from the UI thread without a coroutine.",
            "Ignoring network errors, so a failed request leaves a permanent spinner.",
            "Hardcoding the full URL in every endpoint instead of using a base URL."
          ],
          "debugging": {
            "prompt": "The user list never loads and the app shows a blank screen with no error. Find the bug.",
            "buggyCode": "val users = api.getUsers() // called from a composable body",
            "fixedCode": "lifecycleScope / viewModelScope.launch {\n    val result = repository.loadUsers()\n    // update loading / data / error state from the result\n}",
            "explanation": "Calling a suspend API function from a composable body runs it during composition and swallows the result. Call it from a ViewModel coroutine and expose the outcome as state."
          },
          "miniChallenge": "Add a search endpoint to the API that takes a query parameter, and a repository method that returns matching users.",
          "summary": "Retrofit turns HTTP endpoints into suspend functions; a repository mediates between network, database and UI, surfacing loading and error states.",
          "quiz": [
            {
              "question": "What does the @GET annotation do in Retrofit?",
              "options": [
                "It creates a database table",
                "It declares that the function performs an HTTP GET on the given path",
                "It starts the app",
                "It validates input"
              ],
              "answer": 1,
              "explanation": "Retrofit generates the HTTP request from the annotation and the function signature."
            },
            {
              "question": "What is the repository pattern for?",
              "options": [
                "It stores passwords",
                "It centralises data access so the UI does not know where data comes from",
                "It replaces the ViewModel",
                "It draws the UI"
              ],
              "answer": 1,
              "explanation": "The repository hides the source of data (network, cache, database) behind one interface."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m5-l2-e1",
            "title": "Where does the network call live?",
            "type": "multiple-choice",
            "instructions": "Where should a Retrofit call be made in a well-architected Android app?",
            "starterCode": "class UserRepository(private val api: UserApi) {\n    suspend fun loadUsers() = api.getUsers()\n}",
            "solution": "In the repository, called from a ViewModel coroutine.",
            "solutionExplanation": "The UI stays free of networking: the repository owns the call and the ViewModel owns the coroutine that runs it.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "In the repository, called from a ViewModel coroutine.",
                "hidden": false
              }
            ],
            "options": [
              "Directly in a composable",
              "In the repository, called from a ViewModel coroutine",
              "In AndroidManifest.xml",
              "In the Room DAO"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Retrofit interfaces declare endpoints; the repository decides where data comes from.",
              "approach": "Wrap API calls in try/catch and surface the failure as UI state.",
              "structure": "Interface with @GET, repository with Result, ViewModel coroutine."
            }
          }
        },
        {
          "id": "android-kotlin-m5-l3",
          "slug": "android-kotlin-m5-l3",
          "title": "Testing and Publishing to Google Play",
          "objectives": [
            "Write unit tests with JUnit and local tests",
            "Write instrumented UI tests with Espresso",
            "Prepare a signed release bundle for Google Play"
          ],
          "introduction": "The Play Store is the front door to a billion phones: a signed bundle, a store listing and tests are the price of entry.",
          "concept": "Android testing has two layers: local unit tests run on the JVM with JUnit and cover ViewModels, repositories and pure logic quickly, while instrumented tests run on a device or emulator with Espresso, tapping real views and asserting what the user sees. A release build is signed with an upload key and produced as an Android App Bundle with ./gradlew bundleRelease, which Google Play splits into optimised APKs per device. The store listing needs an icon, screenshots, a description, a privacy policy and a content rating. Before uploading, run the release build through the pre-launch report and check that no debug logging or test data remains.",
          "syntax": "./gradlew bundleRelease\n// test: assertEquals(4, 2 + 2)",
          "analogy": "Publishing is like a final exam with a strict invigilator: the bundle, the listing and the tests are all checked before anyone sees your work.",
          "exampleCode": "// Local unit test (test/ folder, runs on the JVM)\n@Test\nfun `counter increments`() {\n    val viewModel = CounterViewModel()\n    viewModel.increment()\n    assertEquals(1, viewModel.count.value)\n}\n\n// UI test (androidTest/ folder, runs on a device)\nonView(withText(\"Add one\")).perform(click())\nonView(withText(\"Count: 1\")).check(matches(isDisplayed()))",
          "exampleLanguage": "kotlin",
          "walkthrough": [
            "Write JUnit tests for ViewModel logic in the test source set.",
            "Write Espresso tests for critical user flows in the androidTest source set.",
            "Run both suites and fix failures before touching release settings.",
            "Build the signed bundle with bundleRelease and upload it to Play Console."
          ],
          "commonMistakes": [
            "Testing only happy paths and never the error states.",
            "Losing the upload keystore, which makes updating the app impossible.",
            "Uploading a debug build, which Play rejects."
          ],
          "debugging": {
            "prompt": "The release upload fails with a message that the bundle is not signed. Find the bug.",
            "buggyCode": "./gradlew assembleDebug",
            "fixedCode": "./gradlew bundleRelease // with signingConfig set in build.gradle",
            "explanation": "assembleDebug produces an unsigned debug build. Release uploads need the signed bundleRelease task with a signing config."
          },
          "miniChallenge": "Write a unit test for your repository that asserts a failed network call returns a failure Result, using a fake API.",
          "summary": "JUnit tests cover logic on the JVM, Espresso tests cover real user flows on device, and bundleRelease produces the signed bundle for Play.",
          "quiz": [
            {
              "question": "Where do local unit tests run?",
              "options": [
                "On a phone only",
                "On the JVM on the development machine",
                "On Google Play",
                "In the browser"
              ],
              "answer": 1,
              "explanation": "Local tests run on the JVM, which makes them fast; device tests need an emulator or phone."
            },
            {
              "question": "Which Gradle task builds the signed release bundle?",
              "options": [
                "assembleDebug",
                "bundleRelease",
                "testDebug",
                "clean"
              ],
              "answer": 1,
              "explanation": "bundleRelease produces the signed Android App Bundle for upload to Play."
            }
          ],
          "exercise": {
            "id": "android-kotlin-m5-l3-e1",
            "title": "Keystore loss",
            "type": "multiple-choice",
            "instructions": "A developer loses the upload keystore for a published app. What is the consequence?",
            "starterCode": "keystore.jks — the only copy, now deleted",
            "solution": "The app can never be updated with the same signing key; a new key requires Play support and a new listing flow.",
            "solutionExplanation": "Google Play verifies updates against the original signing key, so losing the keystore blocks future updates of that app.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "The app can never be updated with the same signing key; a new key requires Play support and a new listing flow.",
                "hidden": false
              }
            ],
            "options": [
              "Nothing, Play generates a new one automatically",
              "The app can never be updated with the same signing key; a new key requires Play support and a new listing flow",
              "The app is deleted from the store",
              "Users lose their data immediately"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Unit tests run on the JVM; Espresso tests run on a device.",
              "approach": "Test the logic and the critical flows before building the release.",
              "structure": "JUnit for logic, Espresso for flows, bundleRelease to ship."
            }
          }
        }
      ]
    }
  ]
}),
  buildCourse({
  "id": "ios-swiftui",
  "slug": "ios-swiftui",
  "language": "swift",
  "category": "mobile",
  "title": "iOS Development (SwiftUI)",
  "description": "Build native iOS apps with Swift and SwiftUI: the language, views, state, lists, observable models, SwiftData, networking, animation and App Store release.",
  "difficulty": "All levels",
  "estimatedHours": 22,
  "skills": [
    "Swift",
    "SwiftUI",
    "Optionals",
    "State and bindings",
    "Lists and navigation",
    "Observable models",
    "SwiftData",
    "URLSession",
    "Animations",
    "XCTest",
    "App Store release"
  ],
  "prerequisites": [
    "Basic programming concepts"
  ],
  "modules": [
    {
      "id": "ios-swiftui-m1",
      "title": "Swift Foundations",
      "description": "The Swift language as iOS uses it: types, optionals, structs and protocols.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "ios-swiftui-m1-l1",
          "slug": "ios-swiftui-m1-l1",
          "title": "Swift Types, Optionals and Functions",
          "objectives": [
            "Declare constants and variables with let and var",
            "Unwrap optionals safely with if let and guard let",
            "Write functions with labels and default values"
          ],
          "introduction": "Swift makes the uncertain explicit: a value that might be missing is an Optional, and the compiler will not let you forget it.",
          "concept": "Swift constants use let and variables use var, and the compiler infers the type from the first value. An Optional type, written String?, wraps a value that may be absent: it is either .some(value) or .none, which Swift spells nil. Safe unwrapping uses if let to bind the value only when it exists, or guard let to exit early when it does not; force-unwrapping with ! crashes on nil and is a last resort. Functions use argument labels at call sites, which makes Swift calls read like sentences, and they can return multiple values through tuples or optionals.",
          "syntax": "let name = \"Ada\"\nvar score = 0\nfunc greet(name: String?) -> String { name ?? \"friend\" }",
          "analogy": "An Optional is like a gift box: it may hold something wonderful or be empty, and you must open it before you can use what is inside.",
          "exampleCode": "func greet(name: String?) -> String {\n    guard let name = name else {\n        return \"Hello, friend!\"\n    }\n    return \"Hello, \\(name)!\"\n}\n\nprint(greet(name: nil))\nprint(greet(name: \"Ada\"))",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Declare values with let when they never change and var when they do.",
            "Mark a type Optional with ? when the value may be absent.",
            "Unwrap with guard let to exit early on nil, or if let to use the value locally.",
            "Use ?? to supply a default when an Optional is nil."
          ],
          "commonMistakes": [
            "Force-unwrapping an Optional that turns out to be nil, crashing the app.",
            "Using var for values that never change, hiding the intent from readers.",
            "Nesting if let pyramids instead of using guard let for early exits."
          ],
          "debugging": {
            "prompt": "The app should greet the user or fall back to \"friend\", but it crashes when the name is missing. Find the bug.",
            "buggyCode": "func greet(name: String?) -> String {\n    return \"Hello, \\(name!)!\"\n}",
            "fixedCode": "func greet(name: String?) -> String {\n    return \"Hello, \\(name ?? \"friend\")!\"\n}",
            "explanation": "Force-unwrapping with ! crashes when the Optional is nil. The nil-coalescing operator supplies the fallback safely."
          },
          "miniChallenge": "Write a function that takes an optional email string and returns it uppercased, or \"NO EMAIL\" when it is nil.",
          "summary": "Swift separates let from var and wraps absence in Optionals; guard let, if let and ?? unwrap them without ever crashing.",
          "quiz": [
            {
              "question": "What is an Optional in Swift?",
              "options": [
                "A value that is always present",
                "A type that wraps a value that may be absent (nil)",
                "A deprecated type",
                "A kind of loop"
              ],
              "answer": 1,
              "explanation": "Optional adds a nil case to any type, so absence is explicit and checked."
            },
            {
              "question": "What does guard let do?",
              "options": [
                "It crashes on nil",
                "It unwraps an Optional or exits the current scope early when it is nil",
                "It creates a constant",
                "It sorts a list"
              ],
              "answer": 1,
              "explanation": "guard let binds the unwrapped value for the rest of the scope and returns early on nil."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m1-l1-e1",
            "title": "Greet with a fallback",
            "type": "build-program",
            "instructions": "Read one line: either a name or the word null. Print exactly: Hello, <name>! using friend when the input is null.",
            "starterCode": "import Foundation\n\n// read the line, print the greeting with a fallback\n",
            "solution": "import Foundation\n\nlet line = readLine() ?? \"\"\nlet name: String? = line == \"null\" ? nil : line\nprint(\"Hello, \\(name ?? \"friend\")!\")\n",
            "solutionExplanation": "The input becomes an Optional that is nil for the word null, and ?? supplies friend when printing.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Named",
                "stdin": "Ada\n",
                "expectedStdout": "Hello, Ada!",
                "hidden": false
              },
              {
                "name": "Null input",
                "stdin": "null\n",
                "expectedStdout": "Hello, friend!",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Optionals make absence explicit; unwrap before use, never force-unwrap blindly.",
              "approach": "Reach for guard let to exit early, or ?? for a one-line default.",
              "structure": "Declare with let or var, mark ?, unwrap with guard let."
            }
          }
        },
        {
          "id": "ios-swiftui-m1-l2",
          "slug": "ios-swiftui-m1-l2",
          "title": "Structs, Enums and Protocols",
          "objectives": [
            "Model data with structs",
            "Express choices with enums and associated values",
            "Define shared behaviour with protocols"
          ],
          "introduction": "SwiftUI screens are built from structs, and Swift structs are values: copying one gives you a fresh, independent copy.",
          "concept": "Swift structs are value types: assigning one copies it, so two variables never share the same data by accident, which is exactly what a declarative UI wants. Structs get a free memberwise initialiser and can carry methods and computed properties. Enums model a closed set of choices, and each case can carry associated values, such as a success with data or a failure with an error. Protocols declare a set of requirements that many types can adopt, letting different types share behaviour without inheritance. Together, structs for data, enums for state, and protocols for behaviour are the Swift way to model an app.",
          "syntax": "struct User { let id: Int; let name: String }\nenum LoadState { case loading; case loaded([User]); case failed(Error) }",
          "analogy": "A struct is like a photocopy: the copy is yours to scribble on, and the original never changes.",
          "exampleCode": "struct Task: Identifiable {\n    let id = UUID()\n    var title: String\n    var done = false\n}\n\nenum Filter { case all, open, done }\n\nlet tasks = [Task(title: \"Buy milk\"), Task(title: \"Call Ada\", done: true)]\nlet open = tasks.filter { !$0.done }\nprint(open.map { $0.title })",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Model each data type as a struct with stored properties.",
            "Use an enum to represent a state that has a fixed set of cases.",
            "Attach associated values to enum cases to carry their data.",
            "Declare shared behaviour in a protocol and adopt it where needed."
          ],
          "commonMistakes": [
            "Using a class where a struct would do, inviting shared-mutation bugs.",
            "Forgetting a case in a switch over an enum, which Swift refuses to compile.",
            "Mutating a struct property from outside without marking the method mutating."
          ],
          "debugging": {
            "prompt": "The switch over the filter should handle all cases, but the compiler complains it is not exhaustive. Find the bug.",
            "buggyCode": "switch filter {\ncase .all: showAll()\ncase .open: showOpen()\n}",
            "fixedCode": "switch filter {\ncase .all: showAll()\ncase .open: showOpen()\ncase .done: showDone()\n}",
            "explanation": "The Filter enum has three cases and the switch covered only two. Swift requires every case to be handled, so add the missing .done branch."
          },
          "miniChallenge": "Model a download state as an enum with cases idle, downloading(progress: Double) and finished(data: String), then write a function describing each case.",
          "summary": "Structs model data as values, enums model finite states with associated values, and protocols share behaviour across types.",
          "quiz": [
            {
              "question": "What happens when you assign a Swift struct to a new variable?",
              "options": [
                "Both variables share one object",
                "The struct is copied, so the two are independent",
                "It crashes",
                "The struct is deleted"
              ],
              "answer": 1,
              "explanation": "Structs are value types: assignment copies the value."
            },
            {
              "question": "What can an enum case carry?",
              "options": [
                "Nothing",
                "Associated values, such as data tied to that case",
                "Only integers",
                "Only strings"
              ],
              "answer": 1,
              "explanation": "Associated values let each case carry the data that makes sense for it."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m1-l2-e1",
            "title": "Filter open tasks",
            "type": "build-program",
            "instructions": "Read lines of tasks as title:done where done is true or false. Print the titles of the unfinished tasks, one per line, or NONE when there are none.",
            "starterCode": "import Foundation\n\n// read title:done lines, print unfinished titles\n",
            "solution": "import Foundation\n\nvar open: [String] = []\nwhile let line = readLine() {\n    let parts = line.split(separator: \":\")\n    if parts.count == 2 && parts[1] == \"false\" {\n        open.append(String(parts[0]))\n    }\n}\nprint(open.isEmpty ? \"NONE\" : open.joined(separator: \"\\n\"))\n",
            "solutionExplanation": "Each line is parsed into a title and a done flag, mirroring a Task struct, and only unfinished titles are collected.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Some open",
                "stdin": "Buy milk:false\nCall Ada:true\nRead:false\n",
                "expectedStdout": "Buy milk\nRead",
                "hidden": false
              },
              {
                "name": "None open",
                "stdin": "Buy milk:true\n",
                "expectedStdout": "NONE",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Structs copy on assignment; enums enumerate states; protocols share behaviour.",
              "approach": "Model the state as an enum first, then switch over it exhaustively.",
              "structure": "Struct for the data, enum for the state, protocol for shared behaviour."
            }
          }
        }
      ]
    },
    {
      "id": "ios-swiftui-m2",
      "title": "First SwiftUI App",
      "description": "Views, modifiers and layout in the declarative SwiftUI world.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "ios-swiftui-m2-l1",
          "slug": "ios-swiftui-m2-l1",
          "title": "Views, Modifiers and the Canvas",
          "objectives": [
            "Build a screen from SwiftUI views",
            "Apply modifiers such as padding and font",
            "Preview a view in the Xcode canvas"
          ],
          "introduction": "In SwiftUI you describe the screen you want and the framework draws it: the code is the design, and the preview is live.",
          "concept": "A SwiftUI view is a struct conforming to the View protocol, and its body property returns the views it contains. Modifiers are methods that wrap a view and return a new one: .padding() adds space, .font() sets the text style, and .foregroundStyle() sets the colour. The order of modifiers matters, because each one wraps the result of the previous one. The Xcode canvas previews the view live as you type, and the preview provider lets you show the same view in different devices, colour schemes and dynamic type sizes without running the app.",
          "syntax": "struct HelloView: View {\n    var body: some View {\n        Text(\"Hello\").font(.title).padding()\n    }\n}",
          "analogy": "Modifiers are like layers of clothing: each one goes on top of the last, and the order changes the outfit.",
          "exampleCode": "struct WelcomeView: View {\n    var body: some View {\n        VStack {\n            Text(\"Welcome\")\n                .font(.largeTitle)\n                .bold()\n            Text(\"Your first SwiftUI app\")\n                .foregroundStyle(.secondary)\n        }\n        .padding()\n    }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Create a struct conforming to View with a body property.",
            "Return the view hierarchy from body, such as a Text inside a VStack.",
            "Apply modifiers such as font and padding to style each view.",
            "Check the result live in the Xcode canvas preview."
          ],
          "commonMistakes": [
            "Applying a modifier to the wrong view in a chain, styling the container instead of the text.",
            "Forgetting that modifier order matters, for example padding before background.",
            "Returning two views from body without a container, which SwiftUI rejects."
          ],
          "debugging": {
            "prompt": "The label should be a blue chip with padding inside the colour, but the blue only covers the letters. Find the bug.",
            "buggyCode": "Text(\"Hi\").background(.blue).padding()",
            "fixedCode": "Text(\"Hi\").padding().background(.blue)",
            "explanation": "Each modifier wraps the result of the previous one: background before padding paints only behind the letters. Padding first makes the blue cover the text and its padding."
          },
          "miniChallenge": "Build a welcome screen with a large bold title, a secondary subtitle, and a button, checking each modifier in the canvas.",
          "summary": "SwiftUI views are structs whose body returns the hierarchy; modifiers wrap views in order, and the canvas previews the result live.",
          "quiz": [
            {
              "question": "What does a SwiftUI view's body return?",
              "options": [
                "A string",
                "The view hierarchy that describes the screen",
                "A database row",
                "A file"
              ],
              "answer": 1,
              "explanation": "body computes the views that make up this part of the interface."
            },
            {
              "question": "Why does modifier order matter?",
              "options": [
                "It does not",
                "Each modifier wraps the result of the previous one, so the order changes the result",
                "It affects compile speed only",
                "It changes the app name"
              ],
              "answer": 1,
              "explanation": "Modifiers transform the view they are applied to, so padding-then-background differs from background-then-padding."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m2-l1-e1",
            "title": "Modifier chain",
            "type": "multiple-choice",
            "instructions": "What does Text(\"Hi\").padding().background(.blue) draw?",
            "starterCode": "Text(\"Hi\").padding().background(.blue)",
            "solution": "Blue behind the text and its padding.",
            "solutionExplanation": "padding wraps the text first, then background paints behind the padded result, so the blue covers the padding area too.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Blue behind the text and its padding.",
                "hidden": false
              }
            ],
            "options": [
              "Blue only behind the letters",
              "Blue behind the text and its padding",
              "No background at all",
              "Blue covering the whole screen"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "A view is a struct with a body; modifiers wrap the view they follow.",
              "approach": "Apply font and colour to the Text itself, then wrap with padding.",
              "structure": "Struct with body, views inside, modifiers in order."
            }
          }
        },
        {
          "id": "ios-swiftui-m2-l2",
          "slug": "ios-swiftui-m2-l2",
          "title": "Stacks, Layout and Alignment",
          "objectives": [
            "Arrange views with VStack, HStack and ZStack",
            "Control alignment and spacing",
            "Use Spacer and frames to control size"
          ],
          "introduction": "Every SwiftUI screen is a stack of stacks: vertical for rows of content, horizontal for side-by-side items, layered for overlays.",
          "concept": "VStack arranges views vertically, HStack arranges them horizontally, and ZStack layers them on top of each other, back to front. Each stack takes an alignment for the cross axis and a spacing between children, and a Spacer pushes siblings apart by expanding to fill free space. The frame modifier fixes or bounds a view's size, and alignment guides fine-tune positioning inside a stack. SwiftUI proposes sizes top-down and children report their ideal sizes bottom-up, so the layout that results is a negotiation between what the parent offers and what each child wants.",
          "syntax": "VStack(alignment: .leading, spacing: 8) {\n    Text(\"Title\")\n    Text(\"Subtitle\")\n}",
          "analogy": "Stacks are like shelves and drawers: VStack is a bookshelf, HStack is a row of jars, and ZStack is a pile of papers.",
          "exampleCode": "VStack(alignment: .leading, spacing: 8) {\n    Text(\"Ada Lovelace\")\n        .font(.headline)\n    HStack {\n        Text(\"Engineer\")\n        Spacer()\n        Text(\"London\")\n            .foregroundStyle(.secondary)\n    }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Choose VStack for vertical content and HStack for side-by-side content.",
            "Set alignment and spacing on the stack to control the arrangement.",
            "Insert Spacer where a gap should absorb the free space.",
            "Use frame to bound a view's size when its ideal size is wrong."
          ],
          "commonMistakes": [
            "Nesting stacks too deeply, which makes the layout hard to reason about.",
            "Forgetting that a Spacer inside a stack expands and pushes siblings to the edges.",
            "Setting a fixed frame that clips content on smaller devices."
          ],
          "debugging": {
            "prompt": "The city name should sit at the right edge, but it appears next to the job title. Find the bug.",
            "buggyCode": "HStack { Text(\"Engineer\"); Text(\"London\") }",
            "fixedCode": "HStack { Text(\"Engineer\"); Spacer(); Text(\"London\") }",
            "explanation": "Without a Spacer the two texts sit adjacent. A Spacer expands between them and pushes the city to the far edge."
          },
          "miniChallenge": "Build a profile header: a VStack with a name and a bio, and an HStack below it with a location on the left and a Follow button on the right.",
          "summary": "VStack, HStack and ZStack arrange views vertically, horizontally and layered; Spacer absorbs free space and frame bounds size.",
          "quiz": [
            {
              "question": "What does a Spacer do inside a stack?",
              "options": [
                "It deletes a view",
                "It expands to fill free space, pushing siblings apart",
                "It adds a border",
                "It scrolls the view"
              ],
              "answer": 1,
              "explanation": "A Spacer takes all available space along the stack axis."
            },
            {
              "question": "What does ZStack do?",
              "options": [
                "It sorts views alphabetically",
                "It layers views on top of each other, back to front",
                "It deletes the bottom view",
                "It animates views"
              ],
              "answer": 1,
              "explanation": "ZStack overlays its children, with later children drawn above earlier ones."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m2-l2-e1",
            "title": "Stack layout",
            "type": "predict-output",
            "instructions": "A VStack contains Text(\"A\") then Text(\"B\"). How are they arranged?",
            "starterCode": "VStack { Text(\"A\"); Text(\"B\") }",
            "solution": "A above B, stacked vertically.",
            "solutionExplanation": "VStack lays its children out top to bottom in order, so A appears above B.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "A above B, stacked vertically.",
                "hidden": false
              }
            ],
            "options": [
              "A left of B",
              "A above B, stacked vertically",
              "B above A",
              "A on top of B, overlapping"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Stacks arrange along one axis; Spacer takes the free space.",
              "approach": "Put a Spacer between items that should sit at opposite edges.",
              "structure": "Pick the stack, set alignment and spacing, add Spacers."
            }
          }
        }
      ]
    },
    {
      "id": "ios-swiftui-m3",
      "title": "State and Lists",
      "description": "How data flows through a SwiftUI app and how lists present it.",
      "level": "intermediate",
      "order": 3,
      "lessons": [
        {
          "id": "ios-swiftui-m3-l1",
          "slug": "ios-swiftui-m3-l1",
          "title": "@State, @Binding and Data Flow",
          "objectives": [
            "Hold local state with @State",
            "Share it with child views via @Binding",
            "Explain the single source of truth"
          ],
          "introduction": "A toggle that flips itself but forgets the change is a broken promise: state must have one owner and one source of truth.",
          "concept": "@State marks a property that a view owns: SwiftUI stores it outside the struct and re-renders the view whenever it changes. Because views are structs and therefore values, a child cannot mutate the parent's state directly; instead the parent passes a @Binding, a two-way reference created with the $ prefix, which lets the child read and write the same storage. The single source of truth rule says every piece of state lives in exactly one place, and every view that needs it reads it from there. When the state changes, SwiftUI re-invokes body for the views that depend on it and updates only what changed.",
          "syntax": "@State private var count = 0\n// in a child: @Binding var count: Int",
          "analogy": "@State is like the thermostat in your own house; @Binding is the spare key you lend a neighbour so they can adjust it too.",
          "exampleCode": "struct CounterView: View {\n    @State private var count = 0\n    var body: some View {\n        VStack {\n            Text(\"Count: \\(count)\")\n            StepperView(count: $count)\n        }\n    }\n}\n\nstruct StepperView: View {\n    @Binding var count: Int\n    var body: some View {\n        Button(\"Add one\") { count += 1 }\n    }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Declare the state with @State in the view that owns it.",
            "Pass a binding to children with $count so they can mutate it.",
            "Declare the child's property with @Binding to receive the two-way reference.",
            "Read the state in body so the view re-renders when it changes."
          ],
          "commonMistakes": [
            "Storing state in a plain var, which resets every time body re-runs.",
            "Passing the value instead of the binding, so the child edits a copy.",
            "Keeping two copies of the same state in parent and child, which drift apart."
          ],
          "debugging": {
            "prompt": "Tapping Add one in the child view does not change the count shown by the parent. Find the bug.",
            "buggyCode": "StepperView(count: count) // child declares @State var count: Int",
            "fixedCode": "StepperView(count: $count) // child declares @Binding var count: Int",
            "explanation": "Passing count by value gives the child its own copy. Passing $count gives a binding to the parent's storage, so the change is shared."
          },
          "miniChallenge": "Build a settings screen where a parent owns a dark-mode boolean and a child toggle binds to it, with the background colour following the value.",
          "summary": "@State owns local state and @Binding shares it two-way with children; one source of truth keeps every view in agreement.",
          "quiz": [
            {
              "question": "What does @State do?",
              "options": [
                "It saves to disk",
                "It marks a property SwiftUI stores and watches, re-rendering the view on change",
                "It creates a global variable",
                "It fetches data"
              ],
              "answer": 1,
              "explanation": "@State properties live outside the struct; writing one invalidates the view and triggers a re-render."
            },
            {
              "question": "How does a child mutate a parent's @State value?",
              "options": [
                "It cannot",
                "Through a @Binding passed with the $ prefix",
                "By editing the parent source",
                "Through a global"
              ],
              "answer": 1,
              "explanation": "A binding is a two-way reference to the same storage, so the child's write lands in the parent."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m3-l1-e1",
            "title": "Counter commands",
            "type": "build-program",
            "instructions": "Read lines of INC, DEC or RESET starting from 0 (never below 0). Print the final count.",
            "starterCode": "import Foundation\n\n// simulate the @State counter\n",
            "solution": "import Foundation\n\nvar count = 0\nwhile let line = readLine() {\n    switch line {\n    case \"INC\": count += 1\n    case \"DEC\": count = max(0, count - 1)\n    case \"RESET\": count = 0\n    default: break\n    }\n}\nprint(count)\n",
            "solutionExplanation": "Each command mutates the single count value, and DEC clamps at zero like a guarded state update.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "INC\nINC\nDEC\nINC\n",
                "expectedStdout": "2",
                "hidden": false
              },
              {
                "name": "Clamp",
                "stdin": "DEC\nDEC\nINC\n",
                "expectedStdout": "1",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "State has one owner; children get a binding, not a copy.",
              "approach": "Pass $value to the child and declare @Binding there.",
              "structure": "@State in the owner, $ binding down, @Binding in the child."
            }
          }
        },
        {
          "id": "ios-swiftui-m3-l2",
          "slug": "ios-swiftui-m3-l2",
          "title": "Lists, NavigationStack and Detail Views",
          "objectives": [
            "Render collections with List",
            "Navigate with NavigationStack and NavigationLink",
            "Delete and move rows with edit actions"
          ],
          "introduction": "A list that opens a detail screen is the shape of most iOS apps: contacts, messages, settings, all the same pattern.",
          "concept": "List renders a collection of rows with the native iOS styling, including separators, selection and swipe actions, and it virtualises rows like any good list. Each row needs a stable identity, which the Identifiable protocol provides through an id. NavigationStack hosts the navigation state: a NavigationLink inside a row pushes a detail view when tapped, and the back button pops it. List rows support onDelete and onMove, which mutate the underlying collection when the user swipes or drags. Navigation is value-driven in modern SwiftUI: the stack holds a path of values, and pushing means appending to the path.",
          "syntax": "List(tasks) { task in\n    NavigationLink(task.title) { TaskDetail(task: task) }\n}",
          "analogy": "NavigationStack is like a trail of breadcrumbs: each link adds a crumb, and back follows them home.",
          "exampleCode": "struct TaskList: View {\n    @State private var tasks = [Task(title: \"Buy milk\"), Task(title: \"Call Ada\")]\n    var body: some View {\n        NavigationStack {\n            List {\n                ForEach(tasks) { task in\n                    NavigationLink(task.title) {\n                        Text(\"Details for \\(task.title)\")\n                    }\n                }\n                .onDelete { tasks.remove(atOffsets: $0) }\n            }\n            .navigationTitle(\"Tasks\")\n        }\n    }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Wrap the list in a NavigationStack and give it a navigation title.",
            "Render rows with ForEach over an Identifiable collection.",
            "Wrap each row in a NavigationLink to its detail view.",
            "Add onDelete so a swipe removes the row from the data."
          ],
          "commonMistakes": [
            "Forgetting Identifiable, so List cannot tell rows apart.",
            "Placing the NavigationStack inside the List instead of around it.",
            "Mutating the array without @State, so the list never refreshes."
          ],
          "debugging": {
            "prompt": "Swiping to delete removes a row, but the wrong task disappears from the list. Find the bug.",
            "buggyCode": "ForEach(tasks.indices, id: \\.self) { i in Text(tasks[i].title) }",
            "fixedCode": "ForEach(tasks) { task in Text(task.title) } // Task: Identifiable",
            "explanation": "Index-based identity shifts when a row is deleted, so the wrong row is removed. Identifiable ids keep each row bound to its task."
          },
          "miniChallenge": "Build a contacts list where tapping a row opens a detail view with the contact's phone number, and swiping deletes the contact.",
          "summary": "List renders Identifiable rows; NavigationStack plus NavigationLink pushes detail views, and onDelete keeps the data in sync.",
          "quiz": [
            {
              "question": "What does NavigationLink do?",
              "options": [
                "It opens a web page",
                "It pushes a destination view when the row is tapped",
                "It deletes the row",
                "It sorts the list"
              ],
              "answer": 1,
              "explanation": "A NavigationLink inside a NavigationStack pushes its destination onto the stack on tap."
            },
            {
              "question": "Why must list items be Identifiable?",
              "options": [
                "For styling",
                "So SwiftUI can track each row across inserts, deletes and moves",
                "For the app icon",
                "It is optional decoration"
              ],
              "answer": 1,
              "explanation": "Stable identity lets the list animate and update the right rows when the data changes."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m3-l2-e1",
            "title": "Delete behaviour",
            "type": "multiple-choice",
            "instructions": "A List has tasks [A, B, C]. The user swipes to delete B. What should the data contain afterwards?",
            "starterCode": "tasks.remove(atOffsets: IndexSet(integer: 1))",
            "solution": "[A, C].",
            "solutionExplanation": "Removing the element at index 1 leaves A and C, and the list re-renders with those two rows.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "[A, C].",
                "hidden": false
              }
            ],
            "options": [
              "[B, C]",
              "[A, C]",
              "[A, B]",
              "[A, B, C]"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "List needs Identifiable rows; NavigationLink pushes the detail.",
              "approach": "Use the item id for identity, never the row index.",
              "structure": "NavigationStack, List with ForEach, NavigationLink per row."
            }
          }
        }
      ]
    },
    {
      "id": "ios-swiftui-m4",
      "title": "Data and Persistence",
      "description": "Observable models and storing data on the device.",
      "level": "intermediate",
      "order": 4,
      "lessons": [
        {
          "id": "ios-swiftui-m4-l1",
          "slug": "ios-swiftui-m4-l1",
          "title": "Observable Models and @Observable",
          "objectives": [
            "Explain the @Observable macro",
            "Share a model with @State and environment",
            "Update the UI when model data changes"
          ],
          "introduction": "When the same data appears on three screens, it belongs in a model that every screen observes — not in three copies.",
          "concept": "The @Observable macro turns a class into an observable model: SwiftUI tracks which properties a view reads and re-renders it when those properties change. A view holds the model with @State when it creates it, or receives it through the environment with @Environment when an ancestor provides it. Unlike the older ObservableObject, @Observable needs no @Published annotations and no objectWillChange calls; plain stored properties are tracked automatically. The model owns the data and the logic that changes it, the views only observe and render, and that separation is what keeps a growing app understandable.",
          "syntax": "@Observable\nclass TaskStore {\n    var tasks: [Task] = []\n    func add(_ title: String) { tasks.append(Task(title: title)) }\n}",
          "analogy": "An observable model is like a radio station: any view tuned in hears the broadcast the moment the song changes.",
          "exampleCode": "@Observable\nclass TaskStore {\n    var tasks: [Task] = []\n    func add(_ title: String) { tasks.append(Task(title: title)) }\n    func toggle(_ task: Task) {\n        if let i = tasks.firstIndex(where: { $0.id == task.id }) {\n            tasks[i].done.toggle()\n        }\n    }\n}\n\nstruct TaskList: View {\n    @State private var store = TaskStore()\n    var body: some View {\n        List(store.tasks) { task in Text(task.title) }\n    }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Mark the model class with @Observable and give it stored properties.",
            "Write methods on the model that mutate the data.",
            "Hold the model in a view with @State, or pass it through the environment.",
            "Read the model properties in body so the view tracks them."
          ],
          "commonMistakes": [
            "Holding the model in a plain property, so changes never re-render the view.",
            "Creating a new model instance in every view, splitting the data into copies.",
            "Mutating model data from a view instead of through a model method."
          ],
          "debugging": {
            "prompt": "Toggling a task updates the model, but the list never refreshes. Find the bug.",
            "buggyCode": "let store = TaskStore() // plain property in the view",
            "fixedCode": "@State private var store = TaskStore()",
            "explanation": "A plain property is not tracked, so SwiftUI never learns the model changed. @State makes the view observe the model."
          },
          "miniChallenge": "Move your counter into an observable CounterModel with increment and reset methods, and have two different views observe the same instance.",
          "summary": "@Observable models are tracked automatically; views hold them with @State or read them from the environment, and mutations re-render the readers.",
          "quiz": [
            {
              "question": "What does @Observable do to a class?",
              "options": [
                "It saves it to disk",
                "It makes SwiftUI track its stored properties and re-render readers on change",
                "It makes it a singleton",
                "It deletes it"
              ],
              "answer": 1,
              "explanation": "The macro adds observation machinery so property changes invalidate dependent views."
            },
            {
              "question": "How should two screens share one model instance?",
              "options": [
                "Each creates its own",
                "One creates it and passes it through the environment or as a parameter",
                "Through a global variable",
                "They cannot share"
              ],
              "answer": 1,
              "explanation": "Sharing one instance through the environment keeps a single source of truth across screens."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m4-l1-e1",
            "title": "Observation tracking",
            "type": "multiple-choice",
            "instructions": "A view reads store.tasks in its body. The model appends a task. What happens?",
            "starterCode": "store.tasks.append(Task(title: \"New\"))",
            "solution": "The view re-renders with the new task.",
            "solutionExplanation": "The view tracked the tasks property, so the mutation invalidates it and SwiftUI re-renders with the updated list.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "The view re-renders with the new task.",
                "hidden": false
              }
            ],
            "options": [
              "Nothing changes",
              "The view re-renders with the new task",
              "The app crashes",
              "The task is lost"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "The model owns data and logic; views observe it.",
              "approach": "Hold the model with @State where it is created, share it via environment.",
              "structure": "@Observable class, methods mutate, @State holds, body reads."
            }
          }
        },
        {
          "id": "ios-swiftui-m4-l2",
          "slug": "ios-swiftui-m4-l2",
          "title": "SwiftData Persistence",
          "objectives": [
            "Define a @Model for SwiftData",
            "Insert, query and delete with ModelContext",
            "Explain how SwiftData differs from Core Data"
          ],
          "introduction": "An app that forgets everything on restart is a demo: SwiftData persists your models with almost no extra code.",
          "concept": "SwiftData is Apple's modern persistence framework: a class marked @Model becomes a persisted entity, and the ModelContainer owns the storage. Views access the ModelContext from the environment to insert, delete and save objects, and @Query fetches a live list that updates whenever the data changes. SwiftData builds on Core Data's engine but replaces its boilerplate with Swift macros and type-safe queries: a @Query with a sort descriptor returns the tasks ordered as requested, and a #Predicate filters them. Data saved in SwiftData survives app restarts and is ready for CloudKit sync when the app needs it.",
          "syntax": "@Model\nclass Task { var title: String; init(title: String) { self.title = title } }",
          "analogy": "SwiftData is like a filing cabinet that files itself: you drop a model in a drawer and it is still there tomorrow, in order.",
          "exampleCode": "@Model\nclass Task {\n    var title: String\n    var done = false\n    init(title: String) { self.title = title }\n}\n\nstruct TaskList: View {\n    @Query(sort: \\Task.title) var tasks: [Task]\n    @Environment(\\.modelContext) private var context\n    var body: some View {\n        List(tasks) { task in Text(task.title) }\n    }\n    func add(_ title: String) { context.insert(Task(title: title)) }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Mark the persisted class with @Model.",
            "Read live data with @Query, adding sort descriptors as needed.",
            "Insert and delete through the ModelContext from the environment.",
            "Attach the ModelContainer to the app scene so the context exists."
          ],
          "commonMistakes": [
            "Forgetting the ModelContainer, so the context is missing at runtime.",
            "Querying with @Query but mutating a plain array copy instead of the context.",
            "Using @Model on a struct, which SwiftData does not support."
          ],
          "debugging": {
            "prompt": "New tasks appear in the list but vanish after restarting the app. Find the bug.",
            "buggyCode": "var tasks: [Task] = [] // plain array in the view",
            "fixedCode": "@Query var tasks: [Task]\n@Environment(\\.modelContext) private var context",
            "explanation": "A plain array lives only in memory. SwiftData persists through the model context, and @Query reads the stored data back."
          },
          "miniChallenge": "Add a delete action to your SwiftData task list that removes the task through the model context.",
          "summary": "SwiftData persists @Model classes through the ModelContainer; @Query reads live lists and the ModelContext inserts and deletes.",
          "quiz": [
            {
              "question": "What does @Model do?",
              "options": [
                "It draws the UI",
                "It marks a class as a persisted SwiftData entity",
                "It fetches from the network",
                "It creates a test"
              ],
              "answer": 1,
              "explanation": "@Model tells SwiftData to store instances of the class in its database."
            },
            {
              "question": "What does @Query give a view?",
              "options": [
                "A network request",
                "A live list of stored objects that updates when the data changes",
                "A random sample",
                "A file handle"
              ],
              "answer": 1,
              "explanation": "@Query observes the store and re-renders the view whenever matching objects change."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m4-l2-e1",
            "title": "Query sorting",
            "type": "predict-output",
            "instructions": "Tasks are stored titled Banana, Apple, Cherry. A @Query sorts by title ascending. In which order does the List show them?",
            "starterCode": "@Query(sort: \\Task.title) var tasks: [Task]",
            "solution": "Apple, Banana, Cherry.",
            "solutionExplanation": "The sort descriptor orders the fetched objects by title, so the list shows them alphabetically.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Apple, Banana, Cherry.",
                "hidden": false
              }
            ],
            "options": [
              "Banana, Apple, Cherry",
              "Apple, Banana, Cherry",
              "Cherry, Banana, Apple",
              "Insertion order, unsorted"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "SwiftData stores @Model classes; @Query reads them live.",
              "approach": "Mutate through the model context, never a plain array copy.",
              "structure": "@Model class, @Query list, context insert and delete."
            }
          }
        }
      ]
    },
    {
      "id": "ios-swiftui-m5",
      "title": "Polish and Ship",
      "description": "Networking, motion and the App Store.",
      "level": "advanced",
      "order": 5,
      "lessons": [
        {
          "id": "ios-swiftui-m5-l1",
          "slug": "ios-swiftui-m5-l1",
          "title": "Async Networking with URLSession",
          "objectives": [
            "Fetch JSON with URLSession and async/await",
            "Decode responses with Codable",
            "Handle errors and show loading states"
          ],
          "introduction": "Real apps talk to servers, and Swift's async/await makes a network call read like a straight line of code.",
          "concept": "URLSession fetches data over the network, and its async data(from:) method suspends the task until the response arrives without blocking the main thread. The returned Data is decoded with JSONDecoder into a struct conforming to Codable, which maps JSON keys to Swift properties, renaming them with CodingKeys when the names differ. Network work belongs in a model method marked async, and the view starts it from a .task modifier so it runs when the view appears and cancels when the view disappears. Errors are thrown as values, so a do-catch in the model turns a failed request into an error state the UI can display.",
          "syntax": "let (data, _) = try await URLSession.shared.data(from: url)\nlet users = try JSONDecoder().decode([User].self, from: data)",
          "analogy": "async/await is like a bookmark: you pause the story at the network call and pick it up exactly where you left off when the reply arrives.",
          "exampleCode": "struct User: Codable, Identifiable {\n    let id: Int\n    let name: String\n}\n\n@Observable\nclass UserStore {\n    var users: [User] = []\n    func load() async {\n        guard let url = URL(string: \"https://example.com/users\") else { return }\n        let (data, _) = try! await URLSession.shared.data(from: url)\n        users = try! JSONDecoder().decode([User].self, from: data)\n    }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Model the response as a Codable struct matching the JSON shape.",
            "Fetch with URLSession data(from:) inside an async model method.",
            "Decode the Data with JSONDecoder into the struct.",
            "Start the load from the view with .task and handle errors as state."
          ],
          "commonMistakes": [
            "Forgetting try or await on the async call, which the compiler rejects.",
            "Decoding into the wrong shape, so the decoder throws at runtime.",
            "Fetching in body instead of .task, which refetches on every render."
          ],
          "debugging": {
            "prompt": "The user list stays empty even though the server returns users. Find the bug.",
            "buggyCode": "let users = try JSONDecoder().decode(User.self, from: data) // server returns an array",
            "fixedCode": "let users = try JSONDecoder().decode([User].self, from: data)",
            "explanation": "The JSON is an array of users, so it must decode into [User], not a single User. The shape must match the payload."
          },
          "miniChallenge": "Add a refresh button that reloads the users and shows a spinner while the request runs.",
          "summary": "URLSession plus async/await fetches data without blocking; JSONDecoder maps it into Codable structs, and .task starts the work.",
          "quiz": [
            {
              "question": "What does Codable do?",
              "options": [
                "It draws the UI",
                "It lets a type convert to and from encoded formats such as JSON",
                "It encrypts data",
                "It sorts arrays"
              ],
              "answer": 1,
              "explanation": "Codable combines Encodable and Decodable for serialisation."
            },
            {
              "question": "Why start a network load in .task instead of in body?",
              "options": [
                "It is faster",
                "body can run many times; .task runs once when the view appears and cancels on disappear",
                "body cannot call functions",
                "It uses less memory"
              ],
              "answer": 1,
              "explanation": "body is a pure description that may re-run; .task owns the side effect with proper cancellation."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m5-l1-e1",
            "title": "Decoder error",
            "type": "multiple-choice",
            "instructions": "The server returns {\"id\": 1, \"name\": \"Ada\"} but the code decodes [User].self. What happens?",
            "starterCode": "JSONDecoder().decode([User].self, from: data) // data is a single object",
            "solution": "Decoding throws a type mismatch error.",
            "solutionExplanation": "An array type expects a JSON array; a single object does not match, so the decoder throws.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Decoding throws a type mismatch error.",
                "hidden": false
              }
            ],
            "options": [
              "It returns an empty array",
              "Decoding throws a type mismatch error",
              "It returns one user",
              "It crashes the server"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Model the JSON as Codable, fetch with async URLSession, decode.",
              "approach": "Match the decoded type to the payload shape: array decodes to an array.",
              "structure": "Codable struct, async load, .task to start."
            }
          }
        },
        {
          "id": "ios-swiftui-m5-l2",
          "slug": "ios-swiftui-m5-l2",
          "title": "Animations and Gestures",
          "objectives": [
            "Animate state changes with withAnimation",
            "Add transitions for appearing views",
            "Respond to taps, drags and long presses"
          ],
          "introduction": "Motion is meaning: a card that slides away tells the user it was deleted, with no words at all.",
          "concept": "SwiftUI animations are state-driven: wrap a state change in withAnimation and every view that depends on that state animates to its new value, choosing a spring or an ease curve. The .animation modifier attaches an animation to a specific value, so only changes to that value animate. Views that appear or disappear can use .transition to slide, fade or scale in and out. Gestures such as onTapGesture, onLongPressGesture and DragGesture attach directly to views and feed their values into state, which is how a draggable card or a swipe-to-dismiss interaction is built.",
          "syntax": "withAnimation(.spring()) { showDetail.toggle() }",
          "analogy": "Animation in SwiftUI is like a director's note: you do not choreograph every frame, you just say \"move gracefully\" and the actors do it.",
          "exampleCode": "struct CardView: View {\n    @State private var expanded = false\n    var body: some View {\n        VStack {\n            Text(\"Card\")\n            if expanded { Text(\"More details here\") }\n        }\n        .onTapGesture {\n            withAnimation(.spring()) { expanded.toggle() }\n        }\n    }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Identify the state value whose change should animate.",
            "Wrap the mutation in withAnimation with a chosen curve.",
            "Add a transition to views that appear or disappear.",
            "Attach gestures to views and feed their values into state."
          ],
          "commonMistakes": [
            "Animating everything by putting .animation on a parent, which animates unrelated changes.",
            "Changing state without withAnimation and wondering why the change jumps.",
            "Forgetting that implicit animation needs a value parameter to scope it."
          ],
          "debugging": {
            "prompt": "Tapping the card should expand it smoothly, but it jumps instantly. Find the bug.",
            "buggyCode": "Button(\"Toggle\") { expanded.toggle() }",
            "fixedCode": "Button(\"Toggle\") { withAnimation(.spring()) { expanded.toggle() } }",
            "explanation": "A bare state change applies immediately. Wrapping it in withAnimation interpolates the dependent views to their new values."
          },
          "miniChallenge": "Make a list row that scales up slightly while pressed using a long-press gesture and a scaleEffect driven by state.",
          "summary": "SwiftUI animates state changes: withAnimation drives the transition, transitions handle appearance, and gestures feed state.",
          "quiz": [
            {
              "question": "What does withAnimation do?",
              "options": [
                "It delays the app",
                "It animates the views that depend on the state changed inside it",
                "It plays a video",
                "It disables gestures"
              ],
              "answer": 1,
              "explanation": "withAnimation interpolates dependent views from their old values to their new ones."
            },
            {
              "question": "What is a transition in SwiftUI?",
              "options": [
                "A network request",
                "An animation applied when a view appears or disappears",
                "A type of list",
                "A colour scheme"
              ],
              "answer": 1,
              "explanation": "Transitions describe how a view enters or leaves the hierarchy, such as sliding or fading."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m5-l2-e1",
            "title": "Interpolate animation frames",
            "type": "build-program",
            "instructions": "Read start, end and steps (one per line). Print the interpolated values from start to end inclusive, one per line, each with exactly 2 decimal places.",
            "starterCode": "import Foundation\n\n// compute animation frames\n",
            "solution": "import Foundation\n\nlet start = Double(readLine() ?? \"0\") ?? 0\nlet end = Double(readLine() ?? \"0\") ?? 0\nlet steps = Int(readLine() ?? \"1\") ?? 1\nfor i in 0...steps {\n    let v = start + (end - start) * Double(i) / Double(steps)\n    print(String(format: \"%.2f\", v))\n}\n",
            "solutionExplanation": "Each frame is start plus the fraction i/steps of the distance, formatted to two decimals like an animation timeline.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Slide",
                "stdin": "0\n100\n4\n",
                "expectedStdout": "0.00\n25.00\n50.00\n75.00\n100.00",
                "hidden": false
              },
              {
                "name": "Fade",
                "stdin": "1\n0\n2\n",
                "expectedStdout": "1.00\n0.50\n0.00",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Animate the state change, not the view: wrap the mutation in withAnimation.",
              "approach": "Scope animations to the value that changed to avoid animating everything.",
              "structure": "State change inside withAnimation, transition for appearance."
            }
          }
        },
        {
          "id": "ios-swiftui-m5-l3",
          "slug": "ios-swiftui-m5-l3",
          "title": "Testing, App Store Connect and Release",
          "objectives": [
            "Write unit tests with XCTest",
            "Test SwiftUI views and view models",
            "Archive and submit through App Store Connect"
          ],
          "introduction": "The App Store is a gate, not a finish line: tests, an archive and a review are the last mile of every iOS app.",
          "concept": "XCTest is Apple's testing framework: unit tests assert on model logic and view models with XCTAssertEqual and friends, and UI tests drive the real app through XCUIApplication, tapping elements by accessibility label. SwiftUI views are tested through their view models and through UI tests, since the views themselves are value types driven by state. For release, Xcode archives the app, which signs it with the distribution certificate and provisioning profile, and the archive uploads to App Store Connect, where the listing, screenshots, privacy details and review notes complete the submission. TestFlight lets testers try the build before the public review, catching the bugs that only appear on real devices.",
          "syntax": "func testCounterIncrements() {\n    let model = CounterModel()\n    model.increment()\n    XCTAssertEqual(model.count, 1)\n}",
          "analogy": "App review is like a dress rehearsal with a strict critic: better to hear the notes from TestFlight than from a one-star review.",
          "exampleCode": "import XCTest\n\nfinal class CounterModelTests: XCTestCase {\n    func testIncrement() {\n        let model = CounterModel()\n        model.increment()\n        XCTAssertEqual(model.count, 1)\n    }\n    func testReset() {\n        let model = CounterModel()\n        model.increment()\n        model.reset()\n        XCTAssertEqual(model.count, 0)\n    }\n}",
          "exampleLanguage": "swift",
          "walkthrough": [
            "Write XCTest cases for the model logic, one behaviour per test.",
            "Drive critical flows with UI tests using accessibility labels.",
            "Run the full suite in Xcode before archiving.",
            "Archive, upload to App Store Connect, and distribute a TestFlight build first."
          ],
          "commonMistakes": [
            "Testing the view instead of the model, which makes tests brittle.",
            "Skipping UI tests for the purchase or login flow.",
            "Submitting without TestFlight and discovering a device-only bug in review."
          ],
          "debugging": {
            "prompt": "The UI test cannot find the Add button even though it is on screen. Find the bug.",
            "buggyCode": "Button(\"Add one\") { count += 1 } // no accessibility identifier",
            "fixedCode": "Button(\"Add one\") { count += 1 }\n    .accessibilityIdentifier(\"addButton\")",
            "explanation": "UI tests locate elements by accessibility identifiers. Without one, the test cannot reliably find the button."
          },
          "miniChallenge": "Write a UI test that launches the app, adds a task through the UI, and asserts the task appears in the list.",
          "summary": "XCTest covers model logic and UI flows; Xcode archives the signed app for App Store Connect, and TestFlight catches device-only bugs first.",
          "quiz": [
            {
              "question": "What do UI tests in XCTest drive?",
              "options": [
                "The source code",
                "The real running app through accessibility elements",
                "The App Store",
                "The simulator settings"
              ],
              "answer": 1,
              "explanation": "UI tests launch the app and interact with it like a user, finding elements by accessibility labels."
            },
            {
              "question": "What is TestFlight for?",
              "options": [
                "It is a flight simulator",
                "It distributes beta builds to testers before public release",
                "It tests network speed",
                "It archives the app"
              ],
              "answer": 1,
              "explanation": "TestFlight lets real users try a build on real devices before it goes to public review."
            }
          ],
          "exercise": {
            "id": "ios-swiftui-m5-l3-e1",
            "title": "Release artefact",
            "type": "multiple-choice",
            "instructions": "What does Xcode produce when you archive an app for the App Store?",
            "starterCode": "Product > Archive",
            "solution": "A signed archive ready to upload to App Store Connect.",
            "solutionExplanation": "Archiving builds the release configuration, signs it with the distribution certificate, and prepares it for upload.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "A signed archive ready to upload to App Store Connect.",
                "hidden": false
              }
            ],
            "options": [
              "A debug build for the simulator",
              "A signed archive ready to upload to App Store Connect",
              "A source code zip",
              "A TestFlight email"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Test models with XCTest and flows with UI tests.",
              "approach": "Give interactive elements accessibility identifiers so UI tests can find them.",
              "structure": "Unit tests for logic, UI tests for flows, archive for the store."
            }
          }
        }
      ]
    }
  ]
}),
  buildCourse({
  "id": "maui",
  "slug": "maui",
  "language": "csharp",
  "category": "mobile",
  "title": "Xamarin / .NET MAUI",
  "description": "Build cross-platform apps with .NET MAUI and C#: XAML pages, layouts, data binding, MVVM, SQLite, platform APIs, styling and store publishing.",
  "difficulty": "All levels",
  "estimatedHours": 18,
  "skills": [
    "C#",
    "XAML",
    "MAUI layouts",
    "Navigation and Shell",
    "Data binding",
    "MVVM",
    "SQLite",
    "Platform APIs",
    "Theming",
    "xUnit testing",
    "Store publishing"
  ],
  "prerequisites": [
    "Basic programming concepts"
  ],
  "modules": [
    {
      "id": "maui-m1",
      "title": ".NET and MAUI Foundations",
      "description": "C# essentials and the first MAUI app: one codebase, every platform.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "maui-m1-l1",
          "slug": "maui-m1-l1",
          "title": "C# Essentials for MAUI",
          "objectives": [
            "Declare variables with var and explicit types",
            "Write methods and use string interpolation",
            "Handle nulls with nullable reference types"
          ],
          "introduction": "MAUI apps are C#: the same language that powers the UI, the logic and the platform code underneath.",
          "concept": "C# is a statically typed language: every variable has a type the compiler checks, and var lets the compiler infer it from the value. Methods declare their return type and parameters, and string interpolation with $ and curly braces builds text from values without concatenation. Nullable reference types mark a string that may be null as string?, and the compiler warns when such a value is used without a check. Properties with getters and setters expose data with control, and object initialisers create an object and set its properties in one expression. These are the building blocks every MAUI view model is made from.",
          "syntax": "var name = \"Ada\";\nstring Greet(string? name) => $\"Hello, {name ?? \"friend\"}!\";",
          "analogy": "C# types are like shipping labels: the label says what is inside the box, and the warehouse refuses a box whose label lies.",
          "exampleCode": "string Greet(string? name) => $\"Hello, {name ?? \"friend\"}!\";\n\nvar user = new User { Name = \"Ada\", Age = 30 };\nConsole.WriteLine(Greet(user.Name));\nConsole.WriteLine(Greet(null));\n\nclass User\n{\n    public string Name { get; set; } = \"\";\n    public int Age { get; set; }\n}",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Declare variables with var and let the compiler infer the type.",
            "Write a method with a return type and parameters.",
            "Interpolate values into strings with $ and braces.",
            "Mark nullable strings with ? and supply a default with ??."
          ],
          "commonMistakes": [
            "Using a nullable string without a check, which the compiler warns about.",
            "Concatenating strings with + in a loop instead of interpolation or a builder.",
            "Forgetting to initialise a non-nullable property, which the compiler rejects."
          ],
          "debugging": {
            "prompt": "The program should greet the user or fall back to \"friend\", but it crashes on a null name. Find the bug.",
            "buggyCode": "string Greet(string? name) => $\"Hello, {name!.ToUpper()}!\";",
            "fixedCode": "string Greet(string? name) => $\"Hello, {(name ?? \"friend\").ToUpper()}!\";",
            "explanation": "The ! operator asserts the name is not null and crashes when it is. The ?? operator supplies the fallback safely before calling ToUpper."
          },
          "miniChallenge": "Write a method that takes a nullable city name and returns \"City: <name>\" or \"City unknown\" when it is null.",
          "summary": "C# gives every value a static type; var infers it, interpolation builds strings, and ? plus ?? keep nulls safe.",
          "quiz": [
            {
              "question": "What does string? mean in C#?",
              "options": [
                "A string that is always null",
                "A string reference that may be null",
                "A string constant",
                "A string with no characters"
              ],
              "answer": 1,
              "explanation": "The ? marks the reference type as nullable, so the compiler tracks possible nulls."
            },
            {
              "question": "What does $\"Hello, {name}!\" do?",
              "options": [
                "It concatenates files",
                "It interpolates the value of name into the string",
                "It creates a list",
                "It throws an exception"
              ],
              "answer": 1,
              "explanation": "String interpolation inserts the expression value directly into the text."
            }
          ],
          "exercise": {
            "id": "maui-m1-l1-e1",
            "title": "Greet with a fallback",
            "type": "build-program",
            "instructions": "Read one line: either a name or the word null. Print exactly: Hello, <name>! using friend when the input is null.",
            "starterCode": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        // read the line, print the greeting with a fallback\n    }\n}\n",
            "solution": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string? line = Console.ReadLine();\n        string? name = line == \"null\" ? null : line;\n        Console.WriteLine($\"Hello, {name ?? \"friend\"}!\");\n    }\n}\n",
            "solutionExplanation": "The input becomes a nullable string that is null for the word null, and ?? supplies friend when printing.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Named",
                "stdin": "Ada\n",
                "expectedStdout": "Hello, Ada!",
                "hidden": false
              },
              {
                "name": "Null input",
                "stdin": "null\n",
                "expectedStdout": "Hello, friend!",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "C# types are checked at compile time; ? marks a reference that may be null.",
              "approach": "Use ?? to supply a default instead of forcing a null through with !.",
              "structure": "Declare with var, interpolate with $, fall back with ??."
            }
          }
        },
        {
          "id": "maui-m1-l2",
          "slug": "maui-m1-l2",
          "title": "Your First MAUI App and XAML",
          "objectives": [
            "Explain how XAML describes a MAUI page",
            "Build a page with a Label and a Button",
            "Wire a button click to a C# handler"
          ],
          "introduction": "MAUI pages are declared in XAML and brought to life in C#: markup for what it looks like, code for what it does.",
          "concept": "XAML is the XML dialect MAUI uses to declare user interfaces: a ContentPage contains a layout, the layout contains controls such as Label and Button, and attributes set their properties. The code-behind file is the C# partial class for the page, where event handlers such as a button click live. Naming a control with x:Name lets the code-behind reach it by name and update its properties. MAUI renders the same XAML to native controls on Android, iOS, macOS and Windows, so one page definition serves every platform. The App class creates the first page, and the MauiProgram builder registers fonts, services and handlers at startup.",
          "syntax": "<ContentPage>\n  <VerticalStackLayout>\n    <Label Text=\"Hello\" />\n    <Button Text=\"Tap me\" Clicked=\"OnTap\" />\n  </VerticalStackLayout>\n</ContentPage>",
          "analogy": "XAML is like a theatre set design: the markup describes the stage, and the code-behind is the actors who move on it.",
          "exampleCode": "<ContentPage xmlns=\"http://schemas.microsoft.com/dotnet/2021/maui\"\n             x:Class=\"HelloApp.MainPage\">\n  <VerticalStackLayout Padding=\"20\" Spacing=\"10\">\n    <Label x:Name=\"GreetingLabel\" Text=\"Hello, MAUI!\" FontSize=\"24\" />\n    <Button Text=\"Tap me\" Clicked=\"OnTap\" />\n  </VerticalStackLayout>\n</ContentPage>\n\n// Code-behind:\nvoid OnTap(object sender, EventArgs e)\n{\n    GreetingLabel.Text = \"Tapped!\";\n}",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Declare the page in XAML with a layout containing the controls.",
            "Give a control an x:Name when code needs to reach it.",
            "Attach the Clicked event to a handler in the code-behind.",
            "Update the control properties from the handler."
          ],
          "commonMistakes": [
            "Referencing a control by name without an x:Name, which does not compile.",
            "Putting logic in XAML, which can only declare the interface.",
            "Forgetting to set the MainPage in the App class, so the app shows nothing."
          ],
          "debugging": {
            "prompt": "Tapping the button should change the label, but nothing happens. Find the bug.",
            "buggyCode": "<Button Text=\"Tap me\" />\n// code-behind has OnTap, but nothing references it",
            "fixedCode": "<Button Text=\"Tap me\" Clicked=\"OnTap\" />",
            "explanation": "The handler exists but the button never calls it. The Clicked attribute must name the handler in XAML."
          },
          "miniChallenge": "Add an Entry and a Button to the page: tapping the button shows \"Hello, <name>!\" in the label.",
          "summary": "XAML declares the page, x:Name exposes controls to the code-behind, and event attributes wire controls to C# handlers.",
          "quiz": [
            {
              "question": "What is XAML in a MAUI app?",
              "options": [
                "A database language",
                "An XML dialect that declares the user interface",
                "A testing framework",
                "A network protocol"
              ],
              "answer": 1,
              "explanation": "XAML markup describes pages, layouts and controls; C# code-behind supplies behaviour."
            },
            {
              "question": "How does code-behind reach a XAML control?",
              "options": [
                "By its position",
                "By the x:Name given to it in XAML",
                "By its colour",
                "It cannot"
              ],
              "answer": 1,
              "explanation": "x:Name generates a field the code-behind can use to read and update the control."
            }
          ],
          "exercise": {
            "id": "maui-m1-l2-e1",
            "title": "One codebase, many platforms",
            "type": "multiple-choice",
            "instructions": "A MAUI app defines its main page once in XAML. Which platforms can run it?",
            "starterCode": "<ContentPage xmlns=\"http://schemas.microsoft.com/dotnet/2021/maui\">",
            "solution": "Android, iOS, macOS and Windows from the single codebase.",
            "solutionExplanation": "MAUI renders the same page definition to native controls on each supported platform.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Android, iOS, macOS and Windows from the single codebase.",
                "hidden": false
              }
            ],
            "options": [
              "Android only",
              "iOS only",
              "Android, iOS, macOS and Windows from the single codebase",
              "Windows only"
            ],
            "answerIndex": 2,
            "hintNotes": {
              "concept": "XAML declares, C# behaves; x:Name bridges the two.",
              "approach": "Check that every event attribute names a handler that exists in code-behind.",
              "structure": "Page in XAML, x:Name on controls, handler in code-behind."
            }
          }
        }
      ]
    },
    {
      "id": "maui-m2",
      "title": "Pages and Layouts",
      "description": "Navigation, shells and the layouts that arrange every screen.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "maui-m2-l1",
          "slug": "maui-m2-l1",
          "title": "Pages, Navigation and Shell",
          "objectives": [
            "Explain the MAUI page types",
            "Navigate with PushAsync and PopAsync",
            "Structure an app with Shell, tabs and flyouts"
          ],
          "introduction": "An app with one page is a poster: Shell gives it tabs, a flyout menu and a navigation stack in a few lines.",
          "concept": "MAUI navigation is a stack of pages: Navigation.PushAsync adds a page on top and PopAsync removes it, with the hardware back button popping automatically. Shell is the app container that organises pages into a flyout menu and tab bar: a FlyoutItem groups pages behind a menu entry, and a Tab groups pages behind a tab. Routes are registered by name so pages can be navigated to with GoToAsync using a URI such as //details?id=7, and query parameters arrive as properties on the destination. Shell also provides the search handler, the title view and the back button behaviour for free, which is why most MAUI apps start with it.",
          "syntax": "await Navigation.PushAsync(new DetailPage(item));\nawait Shell.Current.GoToAsync($\"//details?id={item.Id}\");",
          "analogy": "Shell is like the lobby of an office building: the directory, the lifts and the signs are all there, and each floor is a page.",
          "exampleCode": "<Shell xmlns=\"http://schemas.microsoft.com/dotnet/2021/maui\">\n  <FlyoutItem Title=\"Home\" Icon=\"home.png\">\n    <ShellContent ContentTemplate=\"{DataTemplate local:HomePage}\" />\n  </FlyoutItem>\n  <FlyoutItem Title=\"Settings\" Icon=\"settings.png\">\n    <ShellContent ContentTemplate=\"{DataTemplate local:SettingsPage}\" />\n  </FlyoutItem>\n</Shell>",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Define the Shell with FlyoutItems for the top-level sections.",
            "Register a route for any page reached by URI navigation.",
            "Push pages with PushAsync for drill-down flows and pop with PopAsync.",
            "Pass data through the page constructor or as Shell query parameters."
          ],
          "commonMistakes": [
            "Navigating to a route that was never registered, which throws at runtime.",
            "Pushing pages in a Shell app instead of using GoToAsync routes.",
            "Forgetting that PopAsync on the root page exits the app."
          ],
          "debugging": {
            "prompt": "Tapping a contact should open the detail page, but the app throws a route-not-found error. Find the bug.",
            "buggyCode": "await Shell.Current.GoToAsync(\"detail\"); // route never registered",
            "fixedCode": "Routing.RegisterRoute(\"detail\", typeof(DetailPage));\nawait Shell.Current.GoToAsync(\"detail\");",
            "explanation": "Shell URI navigation only works for registered routes. Register the route before navigating to it."
          },
          "miniChallenge": "Add a tab bar with Home and Profile tabs to your Shell, and a detail route that receives an id query parameter.",
          "summary": "Shell organises pages into flyouts and tabs; PushAsync and PopAsync manage the stack, and registered routes enable URI navigation.",
          "quiz": [
            {
              "question": "What does PushAsync do?",
              "options": [
                "It deletes the current page",
                "It adds a new page on top of the navigation stack",
                "It closes the app",
                "It reloads the app"
              ],
              "answer": 1,
              "explanation": "Push adds a page; Pop removes it and returns to the page below."
            },
            {
              "question": "Why register a route before using GoToAsync?",
              "options": [
                "It is optional decoration",
                "Shell can only navigate to routes it knows about",
                "It speeds up the app",
                "It changes the theme"
              ],
              "answer": 1,
              "explanation": "Unregistered route names throw at runtime because Shell has no page to resolve them to."
            }
          ],
          "exercise": {
            "id": "maui-m2-l1-e1",
            "title": "Back button in Shell",
            "type": "multiple-choice",
            "instructions": "The navigation stack is [Home, List, Detail]. The user presses the Android back button. Which page shows?",
            "starterCode": "Navigation stack: Home -> List -> Detail",
            "solution": "List.",
            "solutionExplanation": "Back pops the top page, so Detail is removed and List becomes current.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "List.",
                "hidden": false
              }
            ],
            "options": [
              "Home",
              "List",
              "Detail",
              "The app closes"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Shell is the container: flyout, tabs and routes live there.",
              "approach": "Register every route before navigating to it by URI.",
              "structure": "Shell with items, routes registered, GoToAsync to move."
            }
          }
        },
        {
          "id": "maui-m2-l2",
          "slug": "maui-m2-l2",
          "title": "Layouts, Grids and FlexLayout",
          "objectives": [
            "Arrange controls with StackLayout and Grid",
            "Define rows and columns with proportional sizes",
            "Use FlexLayout for flowing content"
          ],
          "introduction": "A settings screen is a grid of labels and switches: the layout you pick decides whether it survives a small phone.",
          "concept": "MAUI layouts arrange controls: VerticalStackLayout stacks them top to bottom, HorizontalStackLayout side by side, and Grid divides the space into rows and columns. Grid rows and columns size themselves with Auto for content size, * for proportional shares of the remaining space, and fixed numbers for exact sizes. Controls are placed with Grid.Row and Grid.Column attached properties, and RowSpan or ColumnSpan lets one control cover several cells. FlexLayout flows children like a flexbox, wrapping them onto new lines when they run out of room, which suits tags and chips. The right layout is the one that adapts: proportional grids and flex layouts survive screen sizes a fixed layout cannot.",
          "syntax": "<Grid RowDefinitions=\"Auto,*\" ColumnDefinitions=\"*,Auto\">\n  <Label Grid.Row=\"0\" Text=\"Title\" />\n</Grid>",
          "analogy": "A Grid is like a spreadsheet: rows and columns divide the space, and each control lives in its cell.",
          "exampleCode": "<Grid RowDefinitions=\"Auto,*\" ColumnDefinitions=\"*,Auto\" Padding=\"16\">\n  <Label Grid.Row=\"0\" Grid.Column=\"0\" Text=\"Tasks\" FontSize=\"20\" />\n  <Button Grid.Row=\"0\" Grid.Column=\"1\" Text=\"Add\" Clicked=\"OnAdd\" />\n  <CollectionView Grid.Row=\"1\" Grid.ColumnSpan=\"2\" x:Name=\"TaskList\" />\n</Grid>",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Choose Grid when controls align in rows and columns.",
            "Define RowDefinitions and ColumnDefinitions with Auto, * and fixed sizes.",
            "Place each control with Grid.Row and Grid.Column.",
            "Span a control across cells when it needs the full width."
          ],
          "commonMistakes": [
            "Placing two controls in the same cell, so they overlap.",
            "Using fixed sizes everywhere, which breaks on small screens.",
            "Forgetting Grid.ColumnSpan on a control that should stretch across the grid."
          ],
          "debugging": {
            "prompt": "The task list should fill the screen below the header, but it overlaps the title. Find the bug.",
            "buggyCode": "<CollectionView Grid.Row=\"0\" Grid.ColumnSpan=\"2\" />",
            "fixedCode": "<CollectionView Grid.Row=\"1\" Grid.ColumnSpan=\"2\" />",
            "explanation": "The list was placed in row 0 with the title. Row 1 is the starred row below the header, where the list belongs."
          },
          "miniChallenge": "Build a two-column settings grid: labels on the left, switches on the right, with the header spanning both columns.",
          "summary": "Grid divides space into rows and columns sized Auto, * or fixed; attached properties place controls, and spans stretch them across cells.",
          "quiz": [
            {
              "question": "What does * mean in a Grid row or column definition?",
              "options": [
                "Fixed size",
                "A proportional share of the remaining space",
                "Content size",
                "Hidden"
              ],
              "answer": 1,
              "explanation": "Star sizing splits the leftover space proportionally between starred rows or columns."
            },
            {
              "question": "What does Auto sizing do?",
              "options": [
                "It hides the row",
                "It sizes the row or column to fit its content",
                "It fills the screen",
                "It animates"
              ],
              "answer": 1,
              "explanation": "Auto measures the content and gives the row or column exactly that size."
            }
          ],
          "exercise": {
            "id": "maui-m2-l2-e1",
            "title": "Compute grid column widths",
            "type": "build-program",
            "instructions": "Read the total width on line 1, then column definitions on the following lines: a number (fixed pixels), * (star) or auto:<pixels>. Print the width of each column, one per line, as integers; stars share the remaining space equally.",
            "starterCode": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        // read total width and definitions, print each column width\n    }\n}\n",
            "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        int total = int.Parse(Console.ReadLine() ?? \"0\");\n        var defs = new List<string>();\n        string? line;\n        while ((line = Console.ReadLine()) != null) defs.Add(line);\n        int fixedSum = 0, stars = 0;\n        foreach (var d in defs)\n        {\n            if (d == \"*\") stars++;\n            else if (d.StartsWith(\"auto:\")) fixedSum += int.Parse(d.Substring(5));\n            else fixedSum += int.Parse(d);\n        }\n        int starWidth = stars == 0 ? 0 : (total - fixedSum) / stars;\n        foreach (var d in defs)\n        {\n            if (d == \"*\") Console.WriteLine(starWidth);\n            else if (d.StartsWith(\"auto:\")) Console.WriteLine(int.Parse(d.Substring(5)));\n            else Console.WriteLine(int.Parse(d));\n        }\n    }\n}\n",
            "solutionExplanation": "Fixed and auto columns take their size first; the remaining space is split equally between star columns.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "400\n100\n*\n*\nauto:50\n",
                "expectedStdout": "100\n125\n125\n50",
                "hidden": false
              },
              {
                "name": "No stars",
                "stdin": "300\n100\nauto:50\n",
                "expectedStdout": "100\n50",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Grids divide space; Auto fits content, * shares the rest.",
              "approach": "Give every control an explicit row and column so none overlap.",
              "structure": "Row and column definitions, then Grid.Row and Grid.Column per control."
            }
          }
        }
      ]
    },
    {
      "id": "maui-m3",
      "title": "Data Binding and MVVM",
      "description": "Bindings, commands and the MVVM pattern that keeps MAUI apps testable.",
      "level": "intermediate",
      "order": 3,
      "lessons": [
        {
          "id": "maui-m3-l1",
          "slug": "maui-m3-l1",
          "title": "Bindings, Converters and Commands",
          "objectives": [
            "Bind a control to a view model property",
            "Explain OneWay versus TwoWay binding",
            "Convert values with IValueConverter"
          ],
          "introduction": "A label that updates itself when the data changes is data binding: the UI and the model stay in sync without manual code.",
          "concept": "Data binding connects a control property to a view model property: {Binding Title} on a Label shows the view model Title, and changes to the model update the label automatically when the model raises PropertyChanged. Binding modes control the direction: OneWay flows from model to view, TwoWay flows both ways and is the default for inputs such as Entry, and OneTime reads the value once. Converters implement IValueConverter to translate between the model value and the display value, such as turning a boolean into a colour. Commands expose actions as ICommand properties, so a Button binds its Command instead of a click handler, which keeps the view model testable without any UI.",
          "syntax": "<Label Text=\"{Binding Title}\" />\n<Entry Text=\"{Binding Name, Mode=TwoWay}\" />\n<Button Text=\"Save\" Command=\"{Binding SaveCommand}\" />",
          "analogy": "Binding is like a live news ticker: the moment the story changes at the source, every screen showing it updates.",
          "exampleCode": "<Label Text=\"{Binding Count, StringFormat='Count: {0}'}\" />\n<Entry Text=\"{Binding Name, Mode=TwoWay}\" Placeholder=\"Your name\" />\n<Button Text=\"Add one\" Command=\"{Binding IncrementCommand}\" />\n\n// View model:\npublic int Count { get; set; } // with INotifyPropertyChanged raising in the setter",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Set the page BindingContext to the view model instance.",
            "Bind display properties with OneWay and inputs with TwoWay.",
            "Raise PropertyChanged in every property setter that the UI binds to.",
            "Expose button actions as ICommand properties and bind Command to them."
          ],
          "commonMistakes": [
            "Forgetting to set the BindingContext, so every binding silently shows nothing.",
            "Not raising PropertyChanged, so the model changes but the UI never updates.",
            "Binding an Entry with OneWay, so typing never reaches the view model."
          ],
          "debugging": {
            "prompt": "The count label never changes when the button is tapped, even though the view model value increases. Find the bug.",
            "buggyCode": "public int Count { get; set; }",
            "fixedCode": "public int Count\n{\n    get => _count;\n    set { _count = value; OnPropertyChanged(); }\n}",
            "explanation": "Without raising PropertyChanged the binding never learns the value changed, so the label keeps showing the old count."
          },
          "miniChallenge": "Bind a slider to a view model value and a label that shows the value, using TwoWay binding on the slider.",
          "summary": "Bindings sync controls with view model properties; PropertyChanged notifies the UI, converters translate values, and commands expose actions.",
          "quiz": [
            {
              "question": "What does TwoWay binding do?",
              "options": [
                "It reads the value once",
                "It keeps the control and the view model in sync in both directions",
                "It deletes the binding",
                "It binds two controls together"
              ],
              "answer": 1,
              "explanation": "TwoWay pushes changes from the model to the control and from the control back to the model."
            },
            {
              "question": "What happens when a bound property changes without raising PropertyChanged?",
              "options": [
                "The UI updates anyway",
                "The UI keeps showing the old value",
                "The app crashes",
                "The property resets"
              ],
              "answer": 1,
              "explanation": "Bindings listen for PropertyChanged; without the notification they never refresh."
            }
          ],
          "exercise": {
            "id": "maui-m3-l1-e1",
            "title": "Celsius to Fahrenheit converter",
            "type": "build-program",
            "instructions": "Read temperatures in Celsius, one per line. Print each converted to Fahrenheit with exactly 1 decimal place, like a value converter.",
            "starterCode": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        // read Celsius values, print Fahrenheit with 1 decimal\n    }\n}\n",
            "solution": "using System;\nusing System.Globalization;\n\nclass Program\n{\n    static void Main()\n    {\n        string? line;\n        while ((line = Console.ReadLine()) != null)\n        {\n            double c = double.Parse(line, CultureInfo.InvariantCulture);\n            double f = c * 9.0 / 5.0 + 32;\n            Console.WriteLine(f.ToString(\"F1\", CultureInfo.InvariantCulture));\n        }\n    }\n}\n",
            "solutionExplanation": "The converter applies F = C * 9/5 + 32 to each input value and formats the result to one decimal place.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Two values",
                "stdin": "0\n100\n",
                "expectedStdout": "32.0\n212.0",
                "hidden": false
              },
              {
                "name": "Negative",
                "stdin": "-40\n",
                "expectedStdout": "-40.0",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Bindings need a BindingContext and PropertyChanged notifications to work.",
              "approach": "Set TwoWay on inputs so typing reaches the view model.",
              "structure": "BindingContext, binding expression, PropertyChanged in the setter."
            }
          }
        },
        {
          "id": "maui-m3-l2",
          "slug": "maui-m3-l2",
          "title": "MVVM with CommunityToolkit",
          "objectives": [
            "Structure an app as Model, View and ViewModel",
            "Use ObservableObject and RelayCommand from the Toolkit",
            "Explain why the ViewModel never references the View"
          ],
          "introduction": "MVVM is the architecture that makes a MAUI app testable: the ViewModel holds the logic, and the View is just a skin.",
          "concept": "MVVM splits an app into three parts: the Model holds the data and the rules, the View declares the interface, and the ViewModel exposes the data and commands the View binds to. The CommunityToolkit.Mvvm package removes the boilerplate: ObservableObject supplies SetProperty and PropertyChanged, [ObservableProperty] generates a property from a field, and [RelayCommand] generates an ICommand from a method. The ViewModel never references a view or a control, so it can be unit-tested without any UI running. Services such as navigation and storage are injected into the ViewModel through its constructor, which keeps every dependency explicit and replaceable in tests.",
          "syntax": "public partial class CounterViewModel : ObservableObject\n{\n    [ObservableProperty] int count;\n    [RelayCommand] void Increment() => Count++;\n}",
          "analogy": "MVVM is like a restaurant kitchen and dining room: the ViewModel is the kitchen that prepares the food, and the View is the dining room that serves it.",
          "exampleCode": "public partial class TasksViewModel : ObservableObject\n{\n    [ObservableProperty]\n    ObservableCollection<TaskItem> tasks = new();\n\n    [RelayCommand]\n    void AddTask(string title)\n    {\n        if (!string.IsNullOrWhiteSpace(title))\n            Tasks.Add(new TaskItem { Title = title });\n    }\n}",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Create a partial ViewModel class extending ObservableObject.",
            "Declare state with [ObservableProperty] fields so the Toolkit generates the properties.",
            "Expose actions with [RelayCommand] methods.",
            "Bind the View to the ViewModel and keep all logic out of the code-behind."
          ],
          "commonMistakes": [
            "Referencing a view from the ViewModel, which breaks testability.",
            "Writing manual PropertyChanged code when the Toolkit generates it.",
            "Using a plain List instead of ObservableCollection, so added items never appear."
          ],
          "debugging": {
            "prompt": "New tasks are added to the collection, but the list on screen never grows. Find the bug.",
            "buggyCode": "ObservableCollection<TaskItem> tasks = new(); // exposed as List<TaskItem> Tasks",
            "fixedCode": "[ObservableProperty]\nObservableCollection<TaskItem> tasks = new();",
            "explanation": "A plain List does not notify the UI when items are added. ObservableCollection raises collection-changed events the list listens to."
          },
          "miniChallenge": "Convert your counter page to MVVM with the Toolkit: an ObservableProperty count and a RelayCommand that increments it.",
          "summary": "MVVM separates Model, View and ViewModel; the Toolkit generates observable properties and commands, and the ViewModel stays UI-free and testable.",
          "quiz": [
            {
              "question": "What does [ObservableProperty] generate?",
              "options": [
                "A database table",
                "A public property with change notification from a private field",
                "A UI control",
                "A network call"
              ],
              "answer": 1,
              "explanation": "The source generator creates the property and raises PropertyChanged when it is set."
            },
            {
              "question": "Why must a ViewModel never reference a View?",
              "options": [
                "It is forbidden by law",
                "So the ViewModel can be unit-tested without any UI",
                "It slows the app",
                "Views have no references"
              ],
              "answer": 1,
              "explanation": "A UI-free ViewModel can be constructed and tested in isolation, which is the point of MVVM."
            }
          ],
          "exercise": {
            "id": "maui-m3-l2-e1",
            "title": "ObservableCollection",
            "type": "multiple-choice",
            "instructions": "Why does a ListView bound to a plain List not update when an item is added?",
            "starterCode": "Tasks.Add(new TaskItem { Title = \"New\" }); // Tasks is List<TaskItem>",
            "solution": "A plain List raises no notification, so the binding never learns about the change.",
            "solutionExplanation": "Only ObservableCollection raises CollectionChanged, which the list control listens for.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "A plain List raises no notification, so the binding never learns about the change.",
                "hidden": false
              }
            ],
            "options": [
              "Lists are read-only",
              "A plain List raises no notification, so the binding never learns about the change",
              "The item was not added",
              "The UI is frozen"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "The Toolkit generates the MVVM boilerplate; the ViewModel stays UI-free.",
              "approach": "Use ObservableCollection for lists so the UI sees additions.",
              "structure": "ObservableObject, ObservableProperty fields, RelayCommand methods."
            }
          }
        }
      ]
    },
    {
      "id": "maui-m4",
      "title": "Data and Platform Features",
      "description": "Local storage and the native capabilities of each device.",
      "level": "intermediate",
      "order": 4,
      "lessons": [
        {
          "id": "maui-m4-l1",
          "slug": "maui-m4-l1",
          "title": "SQLite Storage and Preferences",
          "objectives": [
            "Store structured data with SQLite",
            "Save small settings with Preferences",
            "Explain when to use each store"
          ],
          "introduction": "A to-do app that forgets its tasks on restart is broken: SQLite stores the list, and Preferences remembers the settings.",
          "concept": "MAUI apps store structured data in SQLite through the sqlite-net-pcl package: a class with attributes becomes a table, and the connection inserts, queries, updates and deletes rows with LINQ-like calls. Preferences is the simple key-value store for settings such as a theme choice or a username: Preferences.Set saves a value under a key and Preferences.Get reads it back with a default. The rule of thumb is small, flat settings in Preferences and anything relational or list-shaped in SQLite. Both stores live in the app sandbox, survive restarts, and need no server.",
          "syntax": "Preferences.Set(\"theme\", \"dark\");\nvar theme = Preferences.Get(\"theme\", \"light\");",
          "analogy": "Preferences is like a sticky note on the fridge; SQLite is the filing cabinet for everything that needs order.",
          "exampleCode": "public class TaskItem\n{\n    [PrimaryKey, AutoIncrement]\n    public int Id { get; set; }\n    public string Title { get; set; } = \"\";\n    public bool Done { get; set; }\n}\n\nvar db = new SQLiteAsyncConnection(dbPath);\nawait db.CreateTableAsync<TaskItem>();\nawait db.InsertAsync(new TaskItem { Title = \"Buy milk\" });\nvar tasks = await db.Table<TaskItem>().ToListAsync();",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Define the table class with PrimaryKey and AutoIncrement attributes.",
            "Create the connection and the table at startup.",
            "Insert, query and update through the async connection methods.",
            "Keep small settings in Preferences with a sensible default on read."
          ],
          "commonMistakes": [
            "Blocking the UI thread with the synchronous SQLite connection.",
            "Storing a whole list as one Preferences string instead of using a table.",
            "Forgetting CreateTableAsync, so the first insert throws."
          ],
          "debugging": {
            "prompt": "The first insert throws an error that the table does not exist. Find the bug.",
            "buggyCode": "var db = new SQLiteAsyncConnection(dbPath);\nawait db.InsertAsync(new TaskItem { Title = \"Buy milk\" });",
            "fixedCode": "var db = new SQLiteAsyncConnection(dbPath);\nawait db.CreateTableAsync<TaskItem>();\nawait db.InsertAsync(new TaskItem { Title = \"Buy milk\" });",
            "explanation": "The table must be created before any row is inserted. CreateTableAsync creates it if it does not exist."
          },
          "miniChallenge": "Add a delete method to your task store and a swipe action in the UI that removes the task from SQLite.",
          "summary": "SQLite stores structured data in tables; Preferences stores small settings as key-value pairs with defaults.",
          "quiz": [
            {
              "question": "When should you use Preferences instead of SQLite?",
              "options": [
                "For large lists",
                "For small flat settings such as a theme or username",
                "For images",
                "Never"
              ],
              "answer": 1,
              "explanation": "Preferences is a simple key-value store for settings; relational data belongs in SQLite."
            },
            {
              "question": "What does CreateTableAsync do?",
              "options": [
                "It deletes the database",
                "It creates the table if it does not exist yet",
                "It inserts a row",
                "It backs up data"
              ],
              "answer": 1,
              "explanation": "CreateTableAsync is idempotent: it creates the table on first run and does nothing afterwards."
            }
          ],
          "exercise": {
            "id": "maui-m4-l1-e1",
            "title": "Preferences store commands",
            "type": "build-program",
            "instructions": "Read lines of commands: SET <key> <value>, GET <key>, REMOVE <key>. Print the result of each GET on its own line, or NULL when the key is missing.",
            "starterCode": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        // simulate the Preferences key-value store\n    }\n}\n",
            "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        var store = new Dictionary<string, string>();\n        string? line;\n        while ((line = Console.ReadLine()) != null)\n        {\n            var parts = line.Split(' ', 3);\n            if (parts[0] == \"SET\") store[parts[1]] = parts[2];\n            else if (parts[0] == \"GET\") Console.WriteLine(store.TryGetValue(parts[1], out var v) ? v : \"NULL\");\n            else if (parts[0] == \"REMOVE\") store.Remove(parts[1]);\n        }\n    }\n}\n",
            "solutionExplanation": "SET writes, GET reads with a NULL fallback, and REMOVE deletes, mirroring the Preferences API.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "SET theme dark\nGET theme\nSET theme light\nGET theme\nREMOVE theme\nGET theme\n",
                "expectedStdout": "dark\nlight\nNULL",
                "hidden": false
              },
              {
                "name": "Missing key",
                "stdin": "GET nope\n",
                "expectedStdout": "NULL",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "SQLite for lists and relations, Preferences for small settings.",
              "approach": "Create the table before inserting, and use the async connection.",
              "structure": "Table class with keys, CreateTableAsync, async queries."
            }
          }
        },
        {
          "id": "maui-m4-l2",
          "slug": "maui-m4-l2",
          "title": "Platform APIs: Sensors, Camera and Permissions",
          "objectives": [
            "Explain how MAUI exposes native features",
            "Request runtime permissions correctly",
            "Read a sensor and handle the result"
          ],
          "introduction": "A phone is a pocketful of sensors and a camera: MAUI Essentials wraps them in one cross-platform API.",
          "concept": "MAUI Essentials provides cross-platform APIs for device features: Geolocation reads the position, MediaPicker captures or picks photos, and Connectivity reports the network state. Android and iOS both require runtime permissions for sensitive features, so the app checks the status with Permissions.CheckStatusAsync, requests it with RequestAsync, and explains why it needs the permission when the user declines. Sensor readings arrive through events or async calls and must be marshalled back to the UI thread before updating bound properties. Platform-specific code still exists for features with no cross-platform wrapper, reached through conditional compilation or partial classes.",
          "syntax": "var status = await Permissions.CheckStatusAsync<Permissions.LocationWhenInUse>();\nif (status != PermissionStatus.Granted)\n    status = await Permissions.RequestAsync<Permissions.LocationWhenInUse>();",
          "analogy": "Permissions are like knocking before entering: you ask, the user answers, and a no means you find another way in.",
          "exampleCode": "async Task<Location?> GetLocationAsync()\n{\n    var status = await Permissions.CheckStatusAsync<Permissions.LocationWhenInUse>();\n    if (status != PermissionStatus.Granted)\n        status = await Permissions.RequestAsync<Permissions.LocationWhenInUse>();\n    if (status != PermissionStatus.Granted)\n        return null;\n    return await Geolocation.GetLocationAsync();\n}",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Check the permission status before using a protected feature.",
            "Request the permission when it is not granted, and handle a refusal gracefully.",
            "Call the Essentials API only after the permission is granted.",
            "Update the UI on the main thread after an async sensor result."
          ],
          "commonMistakes": [
            "Calling a protected API without requesting the permission, which throws.",
            "Assuming a granted permission stays granted forever.",
            "Updating bound properties from a background thread, which crashes."
          ],
          "debugging": {
            "prompt": "The location call throws even though the permission was requested once. Find the bug.",
            "buggyCode": "await Permissions.RequestAsync<Permissions.LocationWhenInUse>();\nvar location = await Geolocation.GetLocationAsync();",
            "fixedCode": "var status = await Permissions.RequestAsync<Permissions.LocationWhenInUse>();\nif (status != PermissionStatus.Granted) return null;\nvar location = await Geolocation.GetLocationAsync();",
            "explanation": "The request result was ignored: a denied request still leads to the API call. Check the returned status before proceeding."
          },
          "miniChallenge": "Add a photo capture button that requests camera permission, picks a photo with MediaPicker, and shows it in an Image control.",
          "summary": "Essentials wraps sensors and device features; permissions are checked, requested and honoured, and results return to the UI thread.",
          "quiz": [
            {
              "question": "What should an app do when a permission request is denied?",
              "options": [
                "Crash",
                "Handle the refusal gracefully and explain or offer an alternative",
                "Request it in a loop",
                "Ignore it and call the API anyway"
              ],
              "answer": 1,
              "explanation": "A denial is a valid answer: the app must degrade gracefully and explain why the feature needs it."
            },
            {
              "question": "What does Geolocation.GetLocationAsync return?",
              "options": [
                "A photo",
                "The device location, or null when unavailable",
                "The network state",
                "A contact"
              ],
              "answer": 1,
              "explanation": "It returns a Location with latitude and longitude, or null when no fix is available."
            }
          ],
          "exercise": {
            "id": "maui-m4-l2-e1",
            "title": "Permission flow",
            "type": "multiple-choice",
            "instructions": "The user denies location permission permanently. What should the app do?",
            "starterCode": "PermissionStatus.Denied",
            "solution": "Show the feature as unavailable and offer to open app settings.",
            "solutionExplanation": "A permanent denial cannot be re-requested in-app; the user must change it in system settings, so the app should explain and link there.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Show the feature as unavailable and offer to open app settings.",
                "hidden": false
              }
            ],
            "options": [
              "Keep requesting on every launch",
              "Show the feature as unavailable and offer to open app settings",
              "Use the location anyway",
              "Crash with an error"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Check, request, then use: never call a protected API before its permission.",
              "approach": "Always inspect the request result instead of assuming it was granted.",
              "structure": "Check status, request, verify granted, call the API."
            }
          }
        }
      ]
    },
    {
      "id": "maui-m5",
      "title": "Polish and Ship",
      "description": "Styling, theming and publishing to both stores.",
      "level": "advanced",
      "order": 5,
      "lessons": [
        {
          "id": "maui-m5-l1",
          "slug": "maui-m5-l1",
          "title": "Styling, Themes and Custom Controls",
          "objectives": [
            "Style controls with implicit and explicit styles",
            "Define light and dark themes with AppThemeBinding",
            "Build a reusable custom control"
          ],
          "introduction": "A consistent app is a styled app: one style dictionary keeps every button, label and card looking like they belong together.",
          "concept": "MAUI styles live in a ResourceDictionary: an implicit style applies to every control of its target type, while an explicit style with an x:Key applies only where referenced. Setters in a style assign property values, and styles can inherit from each other with BasedOn. AppThemeBinding picks a value per theme, so a background can be white in light mode and dark grey in dark mode without code. Custom controls combine existing controls into a reusable component with bindable properties, letting the app repeat a complex piece of UI, such as a rating control, with one line of XAML everywhere.",
          "syntax": "<Style TargetType=\"Button\">\n  <Setter Property=\"BackgroundColor\" Value=\"{AppThemeBinding Light=Blue, Dark=Navy}\" />\n</Style>",
          "analogy": "A style dictionary is like a brand guide: define the colours once, and every page follows them without thinking.",
          "exampleCode": "<ResourceDictionary>\n  <Style TargetType=\"Button\">\n    <Setter Property=\"BackgroundColor\" Value=\"{AppThemeBinding Light=#512BD4, Dark=#8A6DFF}\" />\n    <Setter Property=\"TextColor\" Value=\"White\" />\n    <Setter Property=\"CornerRadius\" Value=\"8\" />\n  </Style>\n</ResourceDictionary>",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Define implicit styles for the common controls in App.xaml.",
            "Use explicit styles with x:Key for one-off variations.",
            "Pick theme-aware values with AppThemeBinding.",
            "Extract repeated UI into a custom control with bindable properties."
          ],
          "commonMistakes": [
            "Hardcoding colours on every page instead of using styles.",
            "Forgetting dark mode, so light-mode text becomes invisible on dark backgrounds.",
            "Duplicating the same XAML on five pages instead of extracting a control."
          ],
          "debugging": {
            "prompt": "Buttons look right in light mode but their text vanishes in dark mode. Find the bug.",
            "buggyCode": "<Setter Property=\"TextColor\" Value=\"Black\" />",
            "fixedCode": "<Setter Property=\"TextColor\" Value=\"{AppThemeBinding Light=Black, Dark=White}\" />",
            "explanation": "A fixed black text colour is invisible on a dark background. AppThemeBinding supplies a readable colour per theme."
          },
          "miniChallenge": "Create a card style with rounded corners and a theme-aware background, then apply it to three cards on a page.",
          "summary": "ResourceDictionary styles keep an app consistent; AppThemeBinding adapts values per theme, and custom controls package repeated UI.",
          "quiz": [
            {
              "question": "What is an implicit style in MAUI?",
              "options": [
                "A style with no setters",
                "A style without x:Key that applies to every control of its target type",
                "A style that only works once",
                "A style for images only"
              ],
              "answer": 1,
              "explanation": "Implicit styles target a type and apply automatically to all instances in scope."
            },
            {
              "question": "What does AppThemeBinding do?",
              "options": [
                "It changes the app name",
                "It selects a value depending on the current light or dark theme",
                "It downloads a theme",
                "It disables dark mode"
              ],
              "answer": 1,
              "explanation": "AppThemeBinding provides one value per theme and switches automatically."
            }
          ],
          "exercise": {
            "id": "maui-m5-l1-e1",
            "title": "Implicit style scope",
            "type": "predict-output",
            "instructions": "An implicit Button style sets BackgroundColor to purple in App.xaml. What colour is a Button on a page with no local style?",
            "starterCode": "<Style TargetType=\"Button\"><Setter Property=\"BackgroundColor\" Value=\"Purple\" /></Style>",
            "solution": "Purple.",
            "solutionExplanation": "Implicit styles apply to every control of the target type in scope, so the button inherits the purple background.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "Purple.",
                "hidden": false
              }
            ],
            "options": [
              "Default grey",
              "Purple",
              "Transparent",
              "Red"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "Styles live once in the dictionary; AppThemeBinding handles light and dark.",
              "approach": "Use implicit styles for the common look and explicit keys for exceptions.",
              "structure": "ResourceDictionary styles, AppThemeBinding for colours."
            }
          }
        },
        {
          "id": "maui-m5-l2",
          "slug": "maui-m5-l2",
          "title": "Testing and Publishing to App Stores",
          "objectives": [
            "Write unit tests for ViewModels with xUnit",
            "Explain the release build for Android and iOS",
            "List the store submission requirements"
          ],
          "introduction": "Two stores, two review processes, one codebase: the release is the last skill a MAUI developer needs.",
          "concept": "MAUI ViewModels are plain C# classes, so xUnit tests can construct them, invoke commands and assert on properties without any UI running. UI tests use Appium with the MAUI driver to drive the real app on a device or emulator, tapping controls by automation id. Android releases are signed Android App Bundles built in Release configuration, and iOS releases are archives built on a Mac and uploaded to App Store Connect. Each store needs an icon, screenshots, a description, a privacy policy and a content rating, and both review the app before it reaches users. Keeping the version in the project file in sync with the store listing avoids the most common rejection.",
          "syntax": "[Fact]\npublic void Increment_IncreasesCount()\n{\n    var vm = new CounterViewModel();\n    vm.IncrementCommand.Execute(null);\n    Assert.Equal(1, vm.Count);\n}",
          "analogy": "Publishing to two stores is like launching a product in two countries: same product, different paperwork, and both must be right.",
          "exampleCode": "[Fact]\npublic void AddTask_AddsToCollection()\n{\n    var vm = new TasksViewModel();\n    vm.AddTaskCommand.Execute(\"Buy milk\");\n    Assert.Single(vm.Tasks);\n    Assert.Equal(\"Buy milk\", vm.Tasks[0].Title);\n}",
          "exampleLanguage": "csharp",
          "walkthrough": [
            "Write xUnit tests for ViewModel commands and properties.",
            "Add automation ids to controls for Appium UI tests.",
            "Build the Android bundle and the iOS archive in Release configuration.",
            "Complete both store listings and submit for review."
          ],
          "commonMistakes": [
            "Testing only the happy path and never the error states.",
            "Forgetting to bump the version before a new submission.",
            "Losing the Android keystore, which blocks future updates."
          ],
          "debugging": {
            "prompt": "The ViewModel test fails because the command does nothing. Find the bug.",
            "buggyCode": "[RelayCommand]\nvoid AddTask(string title) { }\n// test executes AddTaskCommand with \"Buy milk\" and expects one task",
            "fixedCode": "[RelayCommand]\nvoid AddTask(string title)\n{\n    if (!string.IsNullOrWhiteSpace(title)) Tasks.Add(new TaskItem { Title = title });\n}",
            "explanation": "The generated command called an empty method, so nothing was added. The command body must perform the work."
          },
          "miniChallenge": "Write an xUnit test for your counter ViewModel asserting that increment then reset returns the count to zero.",
          "summary": "xUnit tests ViewModels without UI, Appium tests real flows, and Release builds produce the signed artefacts both stores require.",
          "quiz": [
            {
              "question": "Why are ViewModels easy to unit test?",
              "options": [
                "They are small",
                "They are plain classes with no UI dependencies",
                "They run on the device",
                "They need no code"
              ],
              "answer": 1,
              "explanation": "A UI-free ViewModel can be constructed in a test and exercised directly."
            },
            {
              "question": "What does Google Play accept for a MAUI Android release?",
              "options": [
                "A debug APK",
                "A signed Android App Bundle",
                "The source code",
                "A screenshot"
              ],
              "answer": 1,
              "explanation": "Play accepts a signed AAB built in Release configuration."
            }
          ],
          "exercise": {
            "id": "maui-m5-l2-e1",
            "title": "Version mismatch",
            "type": "multiple-choice",
            "instructions": "The store listing says version 2.0 but the uploaded bundle says 1.0. What happens?",
            "starterCode": "version: 1.0 in the project, 2.0 in the listing",
            "solution": "The submission is rejected or confused until the versions match.",
            "solutionExplanation": "Stores compare the uploaded binary version against the listing; a mismatch blocks or confuses the release.",
            "tests": [
              {
                "name": "Correct answer",
                "expectedStdout": "The submission is rejected or confused until the versions match.",
                "hidden": false
              }
            ],
            "options": [
              "It is accepted silently",
              "The submission is rejected or confused until the versions match",
              "Users get version 2.0 anyway",
              "The app is deleted"
            ],
            "answerIndex": 1,
            "hintNotes": {
              "concept": "ViewModels are plain classes: test commands and properties directly.",
              "approach": "Build Release artefacts for both stores and keep versions in sync.",
              "structure": "xUnit for ViewModels, Appium for flows, Release for stores."
            }
          }
        }
      ]
    }
  ]
}),
  buildCourse({
  "id": "pwa",
  "slug": "pwa",
  "language": "javascript",
  "category": "mobile",
  "title": "Progressive Web Apps",
  "description": "Build installable, offline-capable Progressive Web Apps: manifests, service workers, caching, background sync, push, IndexedDB, performance and deployment.",
  "difficulty": "All levels",
  "estimatedHours": 18,
  "skills": [
    "Web app manifest",
    "Service workers",
    "Caching strategies",
    "Offline and background sync",
    "Install prompts",
    "Web push",
    "IndexedDB",
    "Lighthouse",
    "Performance budgets",
    "PWA deployment"
  ],
  "prerequisites": [
    "HTML, CSS and JavaScript fundamentals"
  ],
  "modules": [
    {
      "id": "pwa-m1",
      "title": "Web App Foundations",
      "description": "What makes a web app installable, reliable and app-like.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "pwa-m1-l1",
          "slug": "pwa-m1-l1",
          "title": "What Makes an App a PWA",
          "objectives": [
            "Explain the three PWA pillars: installable, reliable, capable",
            "Distinguish a PWA from a native app and a website",
            "List the requirements for installability"
          ],
          "introduction": "A PWA is a website that behaves like an app: installable from the browser, working offline, and updating itself silently.",
          "concept": "A Progressive Web App is a website built to three standards: it must be reliable, loading instantly and working offline through a service worker; it must be installable, offering an Add to Home Screen prompt with an icon and a name; and it must be capable, using modern web APIs for notifications, background sync and device features. A PWA is served over HTTPS, has a web app manifest, and registers a service worker with a fetch handler. Unlike a native app it needs no store review and updates the moment the server changes, and unlike a plain website it keeps working when the network drops. The same codebase reaches every device with a browser, which is the PWA's greatest strength.",
          "syntax": "if (\"serviceWorker\" in navigator) {\n  navigator.serviceWorker.register(\"/sw.js\");\n}",
          "analogy": "A PWA is like a food truck with a permanent address: it shows up anywhere, works rain or shine, and regulars can pin it to their street.",
          "exampleCode": "if ('serviceWorker' in navigator) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/sw.js')\n      .then((reg) => console.log('SW registered:', reg.scope))\n      .catch((err) => console.log('SW failed:', err));\n  });\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Serve the app over HTTPS so service workers and installation are allowed.",
            "Register a service worker from the main page after load.",
            "Add a web app manifest describing the name, icons and display mode.",
            "Verify the install prompt and offline behaviour in the browser."
          ],
          "commonMistakes": [
            "Registering the service worker on an HTTP page, where it is silently blocked.",
            "Forgetting the fetch handler, so the worker installs but never serves offline.",
            "Treating a PWA as a native app and expecting store distribution."
          ],
          "debugging": {
            "prompt": "The service worker should register, but nothing happens and no error appears. Find the bug.",
            "buggyCode": "navigator.serviceWorker.register('/sw.js'); // page served over http://localhost",
            "fixedCode": "navigator.serviceWorker.register('/sw.js'); // page served over https://example.com",
            "explanation": "Service workers require a secure context. Plain http:// origins are rejected, while https:// and localhost are allowed."
          },
          "miniChallenge": "Audit a sample site against the PWA checklist: HTTPS, manifest, service worker with fetch handler, and icons, and list what is missing.",
          "summary": "A PWA is a website that is reliable, installable and capable, built on HTTPS, a manifest and a service worker.",
          "quiz": [
            {
              "question": "Which three things does a PWA need to be installable?",
              "options": [
                "A store listing, a price and a review",
                "HTTPS, a manifest and a service worker with a fetch handler",
                "A native wrapper, a splash screen and ads",
                "A domain, a logo and a blog"
              ],
              "answer": 1,
              "explanation": "Browsers require a secure context, a valid manifest and a service worker before offering installation."
            },
            {
              "question": "What is the main advantage of a PWA over a native app?",
              "options": [
                "It is faster always",
                "One codebase reaches every device with no store review, updating instantly",
                "It uses more battery",
                "It cannot work offline"
              ],
              "answer": 1,
              "explanation": "A PWA ships from the web: no store approval, no install friction, and updates land immediately."
            }
          ],
          "exercise": {
            "id": "pwa-m1-l1-e1",
            "title": "PWA readiness check",
            "type": "build-program",
            "instructions": "Read lines of features present in an app (one per line). Print PWA_READY when https, manifest and service-worker are all present; otherwise print MISSING: followed by the missing ones, comma-separated, in the order https, manifest, service-worker.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// check the PWA requirements\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst have = new Set(lines.filter(Boolean));\nconst need = ['https', 'manifest', 'service-worker'];\nconst missing = need.filter((n) => !have.has(n));\nconsole.log(missing.length ? 'MISSING: ' + missing.join(', ') : 'PWA_READY');\n",
            "solutionExplanation": "The three installability requirements are checked as a set; any absent one is reported in a fixed order.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Ready",
                "stdin": "https\nmanifest\nservice-worker\nicons\n",
                "expectedStdout": "PWA_READY",
                "hidden": false
              },
              {
                "name": "Missing two",
                "stdin": "https\n",
                "expectedStdout": "MISSING: manifest, service-worker",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A PWA is a website plus HTTPS, a manifest and a service worker.",
              "approach": "Check the secure context first when registration silently fails.",
              "structure": "HTTPS, manifest, service worker with a fetch handler."
            }
          }
        },
        {
          "id": "pwa-m1-l2",
          "slug": "pwa-m1-l2",
          "title": "The Web App Manifest",
          "objectives": [
            "Write a manifest with name, icons and display mode",
            "Explain how display modes change the app chrome",
            "Choose icons and theme colours correctly"
          ],
          "introduction": "The manifest is the app's identity card: its name, icon and colours are what the home screen shows.",
          "concept": "The web app manifest is a JSON file that tells the browser how the app should look when installed: name and short_name for the home screen label, icons in several sizes including a 192 and a 512 pixel icon, start_url for where the app opens, display for the chrome mode, and theme_color and background_color for the surrounding UI. The display mode matters most: standalone removes the browser chrome and feels like an app, fullscreen hides even the status bar, and minimal-ui keeps a small browser bar. The manifest is linked from the page with a link rel=manifest tag, and browsers validate it before offering installation. A missing 512 icon or a wrong start_url are the most common reasons an install prompt never appears.",
          "syntax": "{\n  \"name\": \"Tasks\",\n  \"short_name\": \"Tasks\",\n  \"start_url\": \"/\",\n  \"display\": \"standalone\",\n  \"icons\": [{ \"src\": \"/icon-512.png\", \"sizes\": \"512x512\", \"type\": \"image/png\" }]\n}",
          "analogy": "The manifest is like a business card: name, photo and address, handed to the browser so it can introduce your app properly.",
          "exampleCode": "{\n  \"name\": \"Task Manager\",\n  \"short_name\": \"Tasks\",\n  \"description\": \"A simple task list that works offline.\",\n  \"start_url\": \"/\",\n  \"display\": \"standalone\",\n  \"background_color\": \"#ffffff\",\n  \"theme_color\": \"#512BD4\",\n  \"icons\": [\n    { \"src\": \"/icons/icon-192.png\", \"sizes\": \"192x192\", \"type\": \"image/png\" },\n    { \"src\": \"/icons/icon-512.png\", \"sizes\": \"512x512\", \"type\": \"image/png\" }\n  ]\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Create manifest.webmanifest with name, short_name and start_url.",
            "Add 192 and 512 pixel icons in PNG format.",
            "Set display to standalone for an app-like experience.",
            "Link the manifest from the page and set theme and background colours."
          ],
          "commonMistakes": [
            "Forgetting the 512 icon, which blocks installation in Chrome.",
            "Using a start_url that points to a page that does not exist.",
            "Setting display to browser, which keeps the full browser chrome."
          ],
          "debugging": {
            "prompt": "The install prompt never appears even though the manifest exists. Find the bug.",
            "buggyCode": "{ \"name\": \"Tasks\", \"display\": \"standalone\" } // no icons field",
            "fixedCode": "{ \"name\": \"Tasks\", \"display\": \"standalone\",\n  \"icons\": [{ \"src\": \"/icon-512.png\", \"sizes\": \"512x512\", \"type\": \"image/png\" }] }",
            "explanation": "Chrome requires at least one icon of 192 pixels or more (and a 512 icon for the full prompt). Without icons the manifest fails validation."
          },
          "miniChallenge": "Write a manifest for a notes app with a 192 and 512 icon, standalone display, and a purple theme colour.",
          "summary": "The manifest declares the app identity: name, icons, start URL, display mode and colours; browsers validate it before offering installation.",
          "quiz": [
            {
              "question": "What does display: standalone do?",
              "options": [
                "It shows the full browser",
                "It opens the app without browser chrome, like a native app",
                "It hides the app",
                "It forces fullscreen video"
              ],
              "answer": 1,
              "explanation": "Standalone removes the address bar and browser UI while keeping the system status bar."
            },
            {
              "question": "Which icon size is required for the install prompt in Chrome?",
              "options": [
                "16x16",
                "192x192 or larger, with 512 recommended",
                "32x32",
                "Any size"
              ],
              "answer": 1,
              "explanation": "Chrome requires a 192 pixel icon and uses the 512 icon for the install prompt and splash screen."
            }
          ],
          "exercise": {
            "id": "pwa-m1-l2-e1",
            "title": "Validate a manifest",
            "type": "build-program",
            "instructions": "Read lines of key=value manifest fields. Print VALID when name, start_url, display and icons are all present; otherwise print MISSING: followed by the missing fields, comma-separated, in that order.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// validate manifest fields\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst have = new Set();\nfor (const l of lines) {\n  if (!l) continue;\n  have.add(l.split('=')[0]);\n}\nconst need = ['name', 'start_url', 'display', 'icons'];\nconst missing = need.filter((n) => !have.has(n));\nconsole.log(missing.length ? 'MISSING: ' + missing.join(', ') : 'VALID');\n",
            "solutionExplanation": "The four required manifest fields are checked as a set and any absent ones are reported in a fixed order.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Valid",
                "stdin": "name=Tasks\nstart_url=/\ndisplay=standalone\nicons=2\n",
                "expectedStdout": "VALID",
                "hidden": false
              },
              {
                "name": "Missing icons",
                "stdin": "name=Tasks\nstart_url=/\ndisplay=standalone\n",
                "expectedStdout": "MISSING: icons",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "The manifest is JSON identity: name, icons, start URL, display.",
              "approach": "Missing icons are the usual reason an install prompt never appears.",
              "structure": "Name and short_name, 192 and 512 icons, standalone display."
            }
          }
        }
      ]
    },
    {
      "id": "pwa-m2",
      "title": "Service Workers",
      "description": "The background script that intercepts requests and serves the app offline.",
      "level": "beginner",
      "order": 2,
      "lessons": [
        {
          "id": "pwa-m2-l1",
          "slug": "pwa-m2-l1",
          "title": "Service Worker Lifecycle and Registration",
          "objectives": [
            "Explain install, activate and fetch events",
            "Register a worker with the right scope",
            "Update a worker safely with skipWaiting"
          ],
          "introduction": "A service worker is a proxy that lives between your app and the network — but it has a lifecycle you must respect.",
          "concept": "A service worker is a JavaScript file the browser runs in the background, separate from the page, with no access to the DOM. Its lifecycle has three stages: install, where it caches the app shell; activate, where it cleans up old caches; and fetch, where it intercepts network requests. Registration returns a promise and sets the worker scope to the directory the script lives in, so a worker at /sw.js controls the whole site. A new worker waits until all tabs using the old one close, unless skipWaiting tells it to take over immediately. Versioning the cache name on every deploy is how updates reach users: the new worker installs, activates, and deletes the old cache.",
          "syntax": "self.addEventListener('install', (event) => {\n  event.waitUntil(caches.open('v1').then((c) => c.addAll(['/'])));\n});",
          "analogy": "A service worker is like a concierge: it checks in once, learns the building, and then answers every knock at the door.",
          "exampleCode": "const CACHE = 'tasks-v1';\n\nself.addEventListener('install', (event) => {\n  event.waitUntil(\n    caches.open(CACHE).then((cache) => cache.addAll(['/', '/index.html', '/app.js']))\n  );\n});\n\nself.addEventListener('activate', (event) => {\n  event.waitUntil(\n    caches.keys().then((keys) => Promise.all(\n      keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))\n    ))\n  );\n});",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Register the worker from the page with the script path.",
            "Cache the app shell files in the install event.",
            "Delete old caches in the activate event.",
            "Bump the cache version on every deploy so users get fresh files."
          ],
          "commonMistakes": [
            "Registering the worker in a subdirectory, which limits its scope.",
            "Forgetting to version the cache, so users stay stuck on old files.",
            "Caching the worker script itself, which prevents updates."
          ],
          "debugging": {
            "prompt": "Users keep getting the old version of the app after a deploy. Find the bug.",
            "buggyCode": "const CACHE = 'tasks-v1'; // unchanged across deploys",
            "fixedCode": "const CACHE = 'tasks-v2'; // bumped on deploy",
            "explanation": "The activate handler only deletes caches whose name differs from CACHE. With the same name the old cache survives and the old files keep serving."
          },
          "miniChallenge": "Write a service worker that caches the app shell on install and deletes any cache that is not the current version on activate.",
          "summary": "A service worker installs, activates and intercepts fetches; versioned caches and cleanup on activate keep updates flowing.",
          "quiz": [
            {
              "question": "What happens in the install event?",
              "options": [
                "The worker is deleted",
                "The app shell files are cached for offline use",
                "The page reloads",
                "The user is logged out"
              ],
              "answer": 1,
              "explanation": "Install is where the worker pre-caches the files the app needs offline."
            },
            {
              "question": "Why version the cache name on each deploy?",
              "options": [
                "It is required by law",
                "So the activate handler deletes the old cache and users get fresh files",
                "It makes the app faster",
                "It changes the icon"
              ],
              "answer": 1,
              "explanation": "A new cache name lets the new worker clean up the old one during activation."
            }
          ],
          "exercise": {
            "id": "pwa-m2-l1-e1",
            "title": "Service worker state machine",
            "type": "build-program",
            "instructions": "Read lines of events: install, activate, fetch, or update. Starting from idle, print the final state: installed, activated, or idle. install moves idle to installed, activate moves installed to activated, update moves activated back to installed, fetch changes nothing.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// track the service worker lifecycle\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nlet state = 'idle';\nfor (const e of lines) {\n  if (e === 'install' && state === 'idle') state = 'installed';\n  else if (e === 'activate' && state === 'installed') state = 'activated';\n  else if (e === 'update' && state === 'activated') state = 'installed';\n}\nconsole.log(state);\n",
            "solutionExplanation": "The lifecycle is a small state machine: install, then activate, then an update returns to installed.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Full lifecycle",
                "stdin": "install\nactivate\n",
                "expectedStdout": "activated",
                "hidden": false
              },
              {
                "name": "Update cycle",
                "stdin": "install\nactivate\nupdate\n",
                "expectedStdout": "installed",
                "hidden": true
              },
              {
                "name": "Fetch only",
                "stdin": "fetch\nfetch\n",
                "expectedStdout": "idle",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "The worker lifecycle is install, activate, fetch; scope comes from the script path.",
              "approach": "Bump the cache version on deploy or users stay on the old files.",
              "structure": "Register, cache the shell on install, clean old caches on activate."
            }
          }
        },
        {
          "id": "pwa-m2-l2",
          "slug": "pwa-m2-l2",
          "title": "Caching Strategies: Cache First and Network First",
          "objectives": [
            "Explain cache-first, network-first and stale-while-revalidate",
            "Choose the right strategy per resource",
            "Implement a fetch handler"
          ],
          "introduction": "Offline is not one behaviour: static files want the cache, live data wants the network, and news wants a bit of both.",
          "concept": "The fetch handler decides how each request is answered. Cache-first checks the cache and only goes to the network on a miss, which is perfect for static assets that rarely change and must load instantly offline. Network-first tries the network and falls back to the cache on failure, which suits API data that should be fresh but still available offline. Stale-while-revalidate serves the cached copy immediately and refreshes it in the background, so the next visit is fresh without making this one wait. Choosing per resource type is the whole skill: the app shell is cache-first, user data is network-first, and images are often stale-while-revalidate.",
          "syntax": "self.addEventListener('fetch', (event) => {\n  event.respondWith(caches.match(event.request).then((r) => r || fetch(event.request)));\n});",
          "analogy": "Caching strategies are like a pantry: cache-first eats what is on the shelf, network-first goes to the shop first, stale-while-revalidate eats now and shops for tomorrow.",
          "exampleCode": "self.addEventListener('fetch', (event) => {\n  const url = new URL(event.request.url);\n  if (url.pathname.startsWith('/api/')) {\n    // Network-first for live data\n    event.respondWith(\n      fetch(event.request).catch(() => caches.match(event.request))\n    );\n  } else {\n    // Cache-first for static assets\n    event.respondWith(\n      caches.match(event.request).then((hit) => hit || fetch(event.request))\n    );\n  }\n});",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Listen for the fetch event in the service worker.",
            "Match the request against the cache first for static assets.",
            "Fall back to the network on a cache miss.",
            "Use network-first with a cache fallback for API requests."
          ],
          "commonMistakes": [
            "Using cache-first for API data, so users see stale data forever.",
            "Forgetting the cache fallback in network-first, so offline API calls fail.",
            "Caching POST requests, which must never be cached."
          ],
          "debugging": {
            "prompt": "The news feed shows yesterday's headlines even with a working connection. Find the bug.",
            "buggyCode": "event.respondWith(caches.match(event.request).then((hit) => hit || fetch(event.request))); // used for /api/news",
            "fixedCode": "event.respondWith(fetch(event.request).catch(() => caches.match(event.request))); // network-first for /api/news",
            "explanation": "Cache-first serves the stale cached response whenever one exists. Live API data needs network-first so fresh data wins when the network is up."
          },
          "miniChallenge": "Add a stale-while-revalidate branch for images: serve the cached image immediately and update the cache in the background.",
          "summary": "Cache-first suits static assets, network-first suits live data, and stale-while-revalidate balances freshness with speed.",
          "quiz": [
            {
              "question": "Which strategy fits a rarely changing JavaScript bundle?",
              "options": [
                "Network-first",
                "Cache-first",
                "No caching",
                "Stale-while-revalidate for the bundle"
              ],
              "answer": 1,
              "explanation": "Static assets change rarely and must load fast offline, so cache-first is right."
            },
            {
              "question": "What does stale-while-revalidate do?",
              "options": [
                "It never caches",
                "It serves the cached copy now and refreshes it in the background",
                "It deletes the cache",
                "It blocks the network"
              ],
              "answer": 1,
              "explanation": "The user gets an instant response while the worker updates the cache for the next visit."
            }
          ],
          "exercise": {
            "id": "pwa-m2-l2-e1",
            "title": "Cache-first lookup",
            "type": "build-program",
            "instructions": "Line 1 is the number of cached entries, then that many lines of cached URL, then lines of requests. For each request print HIT <url> when cached, otherwise MISS <url>.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// simulate cache-first lookups\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(lines[0], 10);\nconst cache = new Set(lines.slice(1, 1 + n));\nfor (const req of lines.slice(1 + n)) {\n  if (!req) continue;\n  console.log((cache.has(req) ? 'HIT ' : 'MISS ') + req);\n}\n",
            "solutionExplanation": "A cache-first lookup checks the set and reports a hit or a miss for every request.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "2\n/app.js\n/style.css\n/app.js\n/api/data\n/style.css\n",
                "expectedStdout": "HIT /app.js\nMISS /api/data\nHIT /style.css",
                "hidden": false
              },
              {
                "name": "All miss",
                "stdin": "0\n/app.js\n",
                "expectedStdout": "MISS /app.js",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Pick the strategy by resource: static is cache-first, live data is network-first.",
              "approach": "Network-first must fall back to the cache or offline requests fail.",
              "structure": "Fetch handler branches by URL, cache-first for assets, network-first for APIs."
            }
          }
        }
      ]
    },
    {
      "id": "pwa-m3",
      "title": "Offline and Installable",
      "description": "Offline pages, background sync and the install experience.",
      "level": "intermediate",
      "order": 3,
      "lessons": [
        {
          "id": "pwa-m3-l1",
          "slug": "pwa-m3-l1",
          "title": "Offline Pages and Background Sync",
          "objectives": [
            "Serve an offline fallback page",
            "Queue mutations while offline",
            "Sync queued work with Background Sync"
          ],
          "introduction": "Offline is not an error state: a good PWA queues your work and syncs it the moment the network returns.",
          "concept": "An offline fallback page is a cached HTML page the service worker serves when a navigation request fails, so users see a branded message instead of the browser dinosaur. Mutations made offline, such as a new task or a form submission, are stored in IndexedDB with a pending flag instead of being lost. The Background Sync API registers a sync event, and the browser fires it when connectivity returns, letting the worker replay the queued mutations against the server. The pattern is queue, confirm, sync: the user sees their change immediately, the app stores it durably, and the server eventually agrees.",
          "syntax": "self.addEventListener('sync', (event) => {\n  if (event.tag === 'sync-tasks') event.waitUntil(replayQueue());\n});",
          "analogy": "Background sync is like a postal service: you drop the letter in the box, and it is delivered the moment the roads reopen.",
          "exampleCode": "// In the page: queue a task while offline\nasync function addTask(title) {\n  const queue = JSON.parse(localStorage.getItem('queue') || '[]');\n  queue.push({ title, done: false });\n  localStorage.setItem('queue', JSON.stringify(queue));\n  const reg = await navigator.serviceWorker.ready;\n  await reg.sync.register('sync-tasks');\n}\n\n// In the service worker:\nself.addEventListener('sync', (event) => {\n  if (event.tag === 'sync-tasks') event.waitUntil(replayQueue());\n});",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Cache an offline fallback page during install.",
            "Serve it from the fetch handler when a navigation request fails.",
            "Queue offline mutations in IndexedDB with a pending flag.",
            "Register a sync event and replay the queue when connectivity returns."
          ],
          "commonMistakes": [
            "Losing offline input because it was only kept in memory.",
            "Registering sync without a fallback for browsers that lack the API.",
            "Replaying the queue without de-duplication, so tasks appear twice."
          ],
          "debugging": {
            "prompt": "Tasks added offline disappear when the user closes the tab. Find the bug.",
            "buggyCode": "let queue = []; // kept only in memory\nqueue.push({ title });",
            "fixedCode": "const queue = JSON.parse(localStorage.getItem('queue') || '[]');\nqueue.push({ title });\nlocalStorage.setItem('queue', JSON.stringify(queue));",
            "explanation": "An in-memory queue dies with the tab. Durable storage such as localStorage or IndexedDB survives until the sync runs."
          },
          "miniChallenge": "Build an offline notes page that saves notes locally, shows them immediately, and marks them as synced when the queue replays.",
          "summary": "Offline PWAs serve a fallback page, queue mutations durably, and replay them with Background Sync when the network returns.",
          "quiz": [
            {
              "question": "What does Background Sync do?",
              "options": [
                "It deletes the cache",
                "It replays queued work when connectivity returns",
                "It speeds up the CPU",
                "It logs the user out"
              ],
              "answer": 1,
              "explanation": "The browser fires the registered sync event once the network is back, letting the worker flush the queue."
            },
            {
              "question": "Why store offline mutations in IndexedDB instead of memory?",
              "options": [
                "It is faster",
                "Memory is lost when the tab closes; IndexedDB survives",
                "Memory cannot hold objects",
                "IndexedDB is required by law"
              ],
              "answer": 1,
              "explanation": "Durable storage keeps queued work safe until the sync event can replay it."
            }
          ],
          "exercise": {
            "id": "pwa-m3-l1-e1",
            "title": "Offline queue replay",
            "type": "build-program",
            "instructions": "Read lines: ONLINE or OFFLINE, then actions ADD <task>. When online, ADD prints SYNCED <task>; when offline, ADD prints QUEUED <task>. A later ONLINE line prints REPLAYED <n> for the queued tasks (if any) before continuing. Print one line per event.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// simulate the offline queue and background sync\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nlet online = false;\nlet queued = 0;\nfor (const l of lines) {\n  if (!l) continue;\n  if (l === 'ONLINE') {\n    online = true;\n    if (queued > 0) { console.log('REPLAYED ' + queued); queued = 0; }\n  } else if (l === 'OFFLINE') online = false;\n  else if (l.startsWith('ADD ')) {\n    if (online) console.log('SYNCED ' + l.slice(4));\n    else { console.log('QUEUED ' + l.slice(4)); queued++; }\n  }\n}\n",
            "solutionExplanation": "Offline adds queue up; the next ONLINE replays them in one batch, mirroring Background Sync.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Queue then sync",
                "stdin": "OFFLINE\nADD Buy milk\nADD Call Ada\nONLINE\nADD Read book\n",
                "expectedStdout": "QUEUED Buy milk\nQUEUED Call Ada\nREPLAYED 2\nSYNCED Read book",
                "hidden": false
              },
              {
                "name": "Always online",
                "stdin": "ONLINE\nADD One\n",
                "expectedStdout": "SYNCED One",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Offline work must be stored durably, then replayed on sync.",
              "approach": "Keep the queue in IndexedDB, not in a variable that dies with the tab.",
              "structure": "Fallback page, durable queue, sync event to replay."
            }
          }
        },
        {
          "id": "pwa-m3-l2",
          "slug": "pwa-m3-l2",
          "title": "Install Prompts and App Shortcuts",
          "objectives": [
            "Capture the beforeinstallprompt event",
            "Show a custom install button",
            "Add shortcuts and share targets to the manifest"
          ],
          "introduction": "The browser offers installation at its own moment — unless you catch the prompt and offer it when the user is ready.",
          "concept": "When a PWA meets the installability criteria, the browser fires beforeinstallprompt, and the app can capture the event, prevent the automatic mini-infobar, and show its own install button at a better moment, such as after the user finishes a task. Calling prompt on the saved event shows the browser install dialog, and the userChoice promise reports whether the user accepted or dismissed it. The manifest shortcuts array adds long-press actions on the home screen icon, such as New Note or Open Inbox, and share_target lets the app appear in the system share sheet. A well-timed install prompt converts far better than a banner on first load.",
          "syntax": "let deferredPrompt;\nwindow.addEventListener('beforeinstallprompt', (e) => {\n  e.preventDefault();\n  deferredPrompt = e;\n});",
          "analogy": "Catching the install prompt is like holding a door open: you wait for the right moment instead of blocking the hallway.",
          "exampleCode": "let deferredPrompt = null;\n\nwindow.addEventListener('beforeinstallprompt', (event) => {\n  event.preventDefault();\n  deferredPrompt = event;\n  document.getElementById('installBtn').hidden = false;\n});\n\nasync function installApp() {\n  if (!deferredPrompt) return;\n  deferredPrompt.prompt();\n  const choice = await deferredPrompt.userChoice;\n  console.log('Install choice:', choice.outcome);\n  deferredPrompt = null;\n}",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Listen for beforeinstallprompt and prevent the default mini-infobar.",
            "Save the event and reveal a custom install button.",
            "Call prompt on the saved event when the user taps install.",
            "Read userChoice to learn whether the install was accepted."
          ],
          "commonMistakes": [
            "Showing the install button before the event fires, so it does nothing.",
            "Calling prompt twice on the same event, which the browser ignores.",
            "Prompting on first load, when the user has no reason to install yet."
          ],
          "debugging": {
            "prompt": "The custom install button appears but tapping it does nothing. Find the bug.",
            "buggyCode": "installBtn.onclick = () => { deferredPrompt.prompt(); }; // deferredPrompt is null",
            "fixedCode": "window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });",
            "explanation": "The button was wired before the event fired, so deferredPrompt is still null. The event must be captured first, then the button can use it."
          },
          "miniChallenge": "Add a manifest shortcut that opens the new-note screen directly from a long press on the home screen icon.",
          "summary": "beforeinstallprompt lets the app offer installation at the right moment; shortcuts and share targets extend the installed app.",
          "quiz": [
            {
              "question": "What does beforeinstallprompt let an app do?",
              "options": [
                "It installs the app automatically",
                "It defers the install prompt and shows it at a better moment",
                "It deletes the app",
                "It blocks installation"
              ],
              "answer": 1,
              "explanation": "Capturing the event lets the app control when the install dialog appears."
            },
            {
              "question": "What do manifest shortcuts do?",
              "options": [
                "They speed up loading",
                "They add long-press actions to the home screen icon",
                "They change the theme",
                "They delete the app"
              ],
              "answer": 1,
              "explanation": "Shortcuts are quick actions, such as New Note, available from the installed icon."
            }
          ],
          "exercise": {
            "id": "pwa-m3-l2-e1",
            "title": "Install criteria check",
            "type": "build-program",
            "instructions": "Read lines of criteria met (one per line). Print INSTALLABLE when https, manifest, service-worker and icons are all present; otherwise print NOT_INSTALLABLE: followed by the missing ones, comma-separated, in the order https, manifest, service-worker, icons.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// check installability criteria\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst have = new Set(lines.filter(Boolean));\nconst need = ['https', 'manifest', 'service-worker', 'icons'];\nconst missing = need.filter((n) => !have.has(n));\nconsole.log(missing.length ? 'NOT_INSTALLABLE: ' + missing.join(', ') : 'INSTALLABLE');\n",
            "solutionExplanation": "All four installability criteria are checked as a set and any missing ones are reported in order.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Installable",
                "stdin": "https\nmanifest\nservice-worker\nicons\n",
                "expectedStdout": "INSTALLABLE",
                "hidden": false
              },
              {
                "name": "Missing icons",
                "stdin": "https\nmanifest\nservice-worker\n",
                "expectedStdout": "NOT_INSTALLABLE: icons",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Capture the install event first; the button uses the saved event.",
              "approach": "Prompt at a moment of success, not on first load.",
              "structure": "Capture event, reveal button, prompt on tap, read userChoice."
            }
          }
        }
      ]
    },
    {
      "id": "pwa-m4",
      "title": "Push and Performance",
      "description": "Reaching users again and keeping the app fast.",
      "level": "intermediate",
      "order": 4,
      "lessons": [
        {
          "id": "pwa-m4-l1",
          "slug": "pwa-m4-l1",
          "title": "Web Push Notifications",
          "objectives": [
            "Explain the push subscription flow",
            "Subscribe with PushManager and VAPID keys",
            "Send a notification from a server"
          ],
          "introduction": "A task reminder that arrives on time is worth more than any feature: push lets the app speak when it is not open.",
          "concept": "Web Push has three actors: the app subscribes the user through PushManager with a VAPID public key, the browser stores the subscription endpoint, and a server sends messages to that endpoint through the push service. The service worker receives the push event even when the app is closed and shows a notification with showNotification. The user must grant notification permission first, and the app should ask only after explaining the value, such as reminders for due tasks. VAPID keys identify the sender so push services can contact the app owner about abuse, and the subscription must be sent to the application server to be useful.",
          "syntax": "const sub = await reg.pushManager.subscribe({\n  userVisibleOnly: true,\n  applicationServerKey: vapidPublicKey,\n});",
          "analogy": "Push is like a letterbox: the subscription is the address, the push service is the postman, and the service worker opens the letters.",
          "exampleCode": "async function subscribeToPush() {\n  const reg = await navigator.serviceWorker.ready;\n  const permission = await Notification.requestPermission();\n  if (permission !== 'granted') return;\n  const sub = await reg.pushManager.subscribe({\n    userVisibleOnly: true,\n    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),\n  });\n  await fetch('/api/subscriptions', { method: 'POST', body: JSON.stringify(sub) });\n}\n\n// In the service worker:\nself.addEventListener('push', (event) => {\n  const data = event.data ? event.data.json() : {};\n  event.waitUntil(self.registration.showNotification(data.title || 'Reminder', {\n    body: data.body || 'You have a task due.',\n  }));\n});",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Ask for notification permission at a moment when the value is clear.",
            "Subscribe through PushManager with the VAPID public key.",
            "Send the subscription to the application server.",
            "Show the notification from the push event in the service worker."
          ],
          "commonMistakes": [
            "Asking for permission on first load, which users usually deny.",
            "Forgetting to send the subscription to the server, so nothing can be pushed.",
            "Sending silent pushes, which browsers reject because notifications must be visible."
          ],
          "debugging": {
            "prompt": "The subscription succeeds but no notification ever arrives. Find the bug.",
            "buggyCode": "const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });\n// subscription never sent anywhere",
            "fixedCode": "const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });\nawait fetch('/api/subscriptions', { method: 'POST', body: JSON.stringify(sub) });",
            "explanation": "The subscription endpoint lives only in the browser until the app sends it to its server. Without that step no server can address the push."
          },
          "miniChallenge": "Add a notification settings screen with a toggle that subscribes or unsubscribes, and a test button that triggers a local notification.",
          "summary": "Push subscribes the browser with a VAPID key, the server sends to the endpoint, and the service worker shows the notification.",
          "quiz": [
            {
              "question": "What is a VAPID key for?",
              "options": [
                "It encrypts the app",
                "It identifies the push sender to the push service",
                "It stores the subscription",
                "It draws the notification"
              ],
              "answer": 1,
              "explanation": "VAPID lets the push service identify and contact the application server behind the pushes."
            },
            {
              "question": "When should an app ask for notification permission?",
              "options": [
                "On first load",
                "After showing the value, such as when enabling reminders",
                "Never",
                "Every visit"
              ],
              "answer": 1,
              "explanation": "A contextual request after the user understands the benefit is far more likely to be granted."
            }
          ],
          "exercise": {
            "id": "pwa-m4-l1-e1",
            "title": "Format a push payload",
            "type": "build-program",
            "instructions": "Read a title on line 1 and a body on line 2. Print exactly: NOTIFY | <title> | <body>.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// format the notification payload\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst title = lines[0] || '';\nconst body = lines[1] || '';\nconsole.log(`NOTIFY | ${title} | ${body}`);\n",
            "solutionExplanation": "The notification is assembled from its title and body in a fixed format, like the payload the worker receives.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Reminder",
                "stdin": "Task due\nBuy milk before 6pm\n",
                "expectedStdout": "NOTIFY | Task due | Buy milk before 6pm",
                "hidden": false
              },
              {
                "name": "Empty body",
                "stdin": "Hello\n\n",
                "expectedStdout": "NOTIFY | Hello | ",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Push needs permission, a subscription, and a server that knows the endpoint.",
              "approach": "Send the subscription to the server or nothing can ever be pushed.",
              "structure": "Permission, subscribe with VAPID, send subscription to server."
            }
          }
        },
        {
          "id": "pwa-m4-l2",
          "slug": "pwa-m4-l2",
          "title": "Performance Budgets and Lighthouse",
          "objectives": [
            "Explain Core Web Vitals",
            "Set a performance budget",
            "Audit a PWA with Lighthouse and fix the findings"
          ],
          "introduction": "A slow app is an uninstalled app: performance is a feature, and Lighthouse is the scoreboard.",
          "concept": "Performance is measured with Core Web Vitals: Largest Contentful Paint for how fast the main content appears, Interaction to Next Paint for how quickly taps respond, and Cumulative Layout Shift for how much the page jumps while loading. A performance budget turns those numbers into rules, such as JavaScript under 170 kilobytes or LCP under 2.5 seconds, and the build fails when the budget is exceeded. Lighthouse audits a PWA in the browser and scores performance, accessibility, best practices, SEO and PWA installability, with concrete fixes for each failure. The biggest wins are usually the same: smaller bundles, compressed images, and fonts that do not block rendering.",
          "syntax": "// budget: JS <= 170KB, LCP <= 2.5s, CLS <= 0.1\n// audit: Chrome DevTools > Lighthouse > Analyze page load",
          "analogy": "A performance budget is like a luggage allowance: decide what fits before the trip, or pay excess at the gate.",
          "exampleCode": "// lighthouse budget file (budget.json)\n[\n  {\n    \"path\": \"/*\",\n    \"resourceSizes\": [{ \"resourceType\": \"script\", \"budget\": 170 }],\n    \"timings\": [{ \"metric\": \"largest-contentful-paint\", \"budget\": 2500 }]\n  }\n]",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Measure the current Core Web Vitals with Lighthouse.",
            "Set budgets for bundle size and the key timings.",
            "Fix the largest failures first: images, bundles and render-blocking fonts.",
            "Re-run the audit and confirm the scores improve."
          ],
          "commonMistakes": [
            "Optimising the score instead of the user experience it measures.",
            "Shipping uncompressed hero images that dominate the load time.",
            "Setting a budget but never enforcing it in the build."
          ],
          "debugging": {
            "prompt": "The page jumps around while loading and Lighthouse reports a high layout shift. Find the bug.",
            "buggyCode": "<img src=\"/hero.jpg\">",
            "fixedCode": "<img src=\"/hero.jpg\" width=\"800\" height=\"450\" style=\"aspect-ratio: 16 / 9\">",
            "explanation": "Without dimensions the browser reserves no space for the image, so content jumps when it loads. Fixed dimensions reserve the space up front."
          },
          "miniChallenge": "Audit your PWA with Lighthouse, list the three worst findings, and fix at least one with a measurable improvement.",
          "summary": "Core Web Vitals measure load, responsiveness and stability; budgets enforce them, and Lighthouse finds the fixes.",
          "quiz": [
            {
              "question": "What does Largest Contentful Paint measure?",
              "options": [
                "How much the page shifts",
                "How long until the main content is visible",
                "How fast taps respond",
                "How big the bundle is"
              ],
              "answer": 1,
              "explanation": "LCP marks when the largest visible content element renders."
            },
            {
              "question": "What causes Cumulative Layout Shift?",
              "options": [
                "Slow JavaScript",
                "Content moving after load, such as images without dimensions",
                "Too many colours",
                "Offline mode"
              ],
              "answer": 1,
              "explanation": "CLS measures visual instability: elements moving as late resources arrive."
            }
          ],
          "exercise": {
            "id": "pwa-m4-l2-e1",
            "title": "Score a Lighthouse audit",
            "type": "build-program",
            "instructions": "Read metric values as lines of name=value (lcp in ms, inp in ms, cls as a decimal). Print PASS when lcp<=2500, inp<=200 and cls<=0.1, otherwise print FAIL: followed by the failing metric names, comma-separated, in the order lcp, inp, cls.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// evaluate the performance budget\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst m = {};\nfor (const l of lines) {\n  if (!l) continue;\n  const [k, v] = l.split('=');\n  m[k] = parseFloat(v);\n}\nconst bad = [];\nif (!(m.lcp <= 2500)) bad.push('lcp');\nif (!(m.inp <= 200)) bad.push('inp');\nif (!(m.cls <= 0.1)) bad.push('cls');\nconsole.log(bad.length ? 'FAIL: ' + bad.join(', ') : 'PASS');\n",
            "solutionExplanation": "Each metric is compared with its budget threshold and the failures are listed in a fixed order.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Pass",
                "stdin": "lcp=1800\ninp=120\ncls=0.05\n",
                "expectedStdout": "PASS",
                "hidden": false
              },
              {
                "name": "Fail two",
                "stdin": "lcp=3200\ninp=120\ncls=0.25\n",
                "expectedStdout": "FAIL: lcp, cls",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Measure with Lighthouse, then fix the biggest failures first.",
              "approach": "Reserve space for images or the layout shifts as they load.",
              "structure": "Audit, budget, fix images and bundles, re-audit."
            }
          }
        }
      ]
    },
    {
      "id": "pwa-m5",
      "title": "Polish and Ship",
      "description": "Offline data and getting the PWA into users' hands.",
      "level": "advanced",
      "order": 5,
      "lessons": [
        {
          "id": "pwa-m5-l1",
          "slug": "pwa-m5-l1",
          "title": "IndexedDB for Offline Data",
          "objectives": [
            "Explain when IndexedDB fits and localStorage does not",
            "Open a database and create object stores",
            "Read and write records with transactions"
          ],
          "introduction": "localStorage holds strings; IndexedDB holds your app's real data — tasks, notes and queues — structured and searchable.",
          "concept": "IndexedDB is the browser database for structured offline data: it stores objects in object stores, indexes them for fast lookup, and holds far more than localStorage's few megabytes. A database is opened with a version number, and the onupgradeneeded handler creates object stores and indexes when the version increases. Every read and write runs inside a transaction on a store, using put to save, get to fetch by key, and delete to remove. Transactions are asynchronous and event-driven, so modern code wraps them in promises. Offline-first apps keep their working data in IndexedDB and sync it with the server when the network returns.",
          "syntax": "const db = await openDB('tasks', 1, {\n  upgrade(db) { db.createObjectStore('tasks', { keyPath: 'id' }); },\n});",
          "analogy": "IndexedDB is like a library with a catalogue: books are shelved by key, and the index finds them without searching every shelf.",
          "exampleCode": "import { openDB } from 'idb';\n\nconst db = await openDB('tasks-db', 1, {\n  upgrade(db) {\n    db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });\n  },\n});\n\nawait db.put('tasks', { title: 'Buy milk', done: false });\nconst all = await db.getAll('tasks');",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Open the database with a version and create object stores in onupgradeneeded.",
            "Put records into a store inside a transaction.",
            "Get records by key or list them all with getAll.",
            "Bump the version when the schema changes so the upgrade handler runs."
          ],
          "commonMistakes": [
            "Using localStorage for large structured data that belongs in IndexedDB.",
            "Forgetting to bump the version after changing the schema.",
            "Reading a record outside a transaction, which IndexedDB forbids."
          ],
          "debugging": {
            "prompt": "The app should list saved tasks after a reload, but the list is always empty. Find the bug.",
            "buggyCode": "await db.put('tasks', { title: 'Buy milk' }); // opened with keyPath 'id', no id given",
            "fixedCode": "await db.add('tasks', { title: 'Buy milk' }); // keyPath 'id' with autoIncrement: true",
            "explanation": "The store uses keyPath id without autoIncrement, so a record without an id cannot be stored. Adding autoIncrement generates the key."
          },
          "miniChallenge": "Build an offline task store in IndexedDB with add, list, toggle and delete operations, and render the list from the database.",
          "summary": "IndexedDB stores structured offline data in versioned object stores; transactions put, get and delete records by key.",
          "quiz": [
            {
              "question": "When should you choose IndexedDB over localStorage?",
              "options": [
                "For a single setting",
                "For structured data, lists and anything over a few megabytes",
                "For passwords",
                "Never"
              ],
              "answer": 1,
              "explanation": "IndexedDB is a real database for objects and queries; localStorage is a small string store."
            },
            {
              "question": "What is an object store?",
              "options": [
                "A shop",
                "A table-like container for records inside an IndexedDB database",
                "A file",
                "A cookie"
              ],
              "answer": 1,
              "explanation": "Object stores hold records keyed by a key path, like tables hold rows."
            }
          ],
          "exercise": {
            "id": "pwa-m5-l1-e1",
            "title": "Object store commands",
            "type": "build-program",
            "instructions": "Read lines of commands: PUT <id> <value>, GET <id>, DELETE <id>. Print the result of each GET on its own line, or NULL when the key is missing.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// simulate an IndexedDB object store\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst store = {};\nconst out = [];\nfor (const l of lines) {\n  if (!l) continue;\n  const parts = l.split(' ');\n  if (parts[0] === 'PUT') store[parts[1]] = parts.slice(2).join(' ');\n  else if (parts[0] === 'GET') out.push(store[parts[1]] ?? 'NULL');\n  else if (parts[0] === 'DELETE') delete store[parts[1]];\n}\nconsole.log(out.join('\\n'));\n",
            "solutionExplanation": "PUT writes by key, GET reads with a NULL fallback, and DELETE removes, mirroring an object store.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Mixed",
                "stdin": "PUT 1 Buy milk\nPUT 2 Call Ada\nGET 1\nDELETE 1\nGET 1\nGET 2\n",
                "expectedStdout": "Buy milk\nNULL\nCall Ada",
                "hidden": false
              },
              {
                "name": "Missing key",
                "stdin": "GET 9\n",
                "expectedStdout": "NULL",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "IndexedDB is the offline database; localStorage is for small strings.",
              "approach": "Bump the database version when the schema changes.",
              "structure": "Open with a version, create stores on upgrade, transact to read and write."
            }
          }
        },
        {
          "id": "pwa-m5-l2",
          "slug": "pwa-m5-l2",
          "title": "Deploying and Auditing Your PWA",
          "objectives": [
            "Deploy a PWA to static hosting with HTTPS",
            "Run the full Lighthouse PWA audit",
            "Plan updates so installed users get them"
          ],
          "introduction": "Shipping a PWA is deploying a website — and then proving, with an audit, that it behaves like an app.",
          "concept": "Deploying a PWA means shipping static files to any host that serves HTTPS: the HTML, the JavaScript, the manifest and the service worker, with the worker served from the root so its scope covers the site. Cache headers matter: the service worker script must never be cached by the browser, or updates will not reach users, while hashed static assets can be cached for a year. The Lighthouse PWA audit checks installability, offline behaviour, the manifest and the service worker, and the report is the release gate: every category should be green before announcing the launch. After launch, updates flow through the service worker lifecycle, and a small update banner tells users a new version is ready when the new worker activates.",
          "syntax": "# hosting checklist\n# - HTTPS on\n# - /sw.js served with Cache-Control: no-cache\n# - hashed assets cached for 1 year\n# - Lighthouse PWA audit all green",
          "analogy": "Deploying a PWA is like opening a shop: the sign (manifest) must be up, the door (HTTPS) unlocked, and the shelves (cache) stocked.",
          "exampleCode": "# Example deploy checklist (run before every release)\n# 1. npm run build\n# 2. Deploy dist/ to static hosting with HTTPS\n# 3. Verify /sw.js responds with Cache-Control: no-cache\n# 4. Run Lighthouse: PWA category must be 100\n# 5. Install the PWA and test offline mode",
          "exampleLanguage": "javascript",
          "walkthrough": [
            "Build the production bundle and deploy it to HTTPS hosting.",
            "Serve the service worker with no-cache headers.",
            "Run the Lighthouse PWA audit and fix every failing check.",
            "Install the app, test it offline, and confirm updates arrive."
          ],
          "commonMistakes": [
            "Caching the service worker script, which blocks updates.",
            "Deploying over HTTP, which disables the whole PWA.",
            "Skipping the audit and discovering a missing icon from a user report."
          ],
          "debugging": {
            "prompt": "Installed users never receive updates even after new deploys. Find the bug.",
            "buggyCode": "Cache-Control: max-age=86400 // on /sw.js",
            "fixedCode": "Cache-Control: no-cache // on /sw.js",
            "explanation": "A cached service worker script is never re-fetched, so the browser never learns a new version exists. The worker must always be revalidated."
          },
          "miniChallenge": "Deploy your PWA, run the Lighthouse audit, and record the PWA score and the three checks you fixed to reach it.",
          "summary": "A PWA deploys as HTTPS static files with a never-cached service worker; the Lighthouse audit is the release gate.",
          "quiz": [
            {
              "question": "Why must the service worker script be served with no-cache?",
              "options": [
                "It is large",
                "So the browser re-fetches it and learns about new versions",
                "It is secret",
                "It changes the icon"
              ],
              "answer": 1,
              "explanation": "A cached worker is never updated, so installed users stay on the old app forever."
            },
            {
              "question": "What does the Lighthouse PWA audit check?",
              "options": [
                "Only the design",
                "Installability, offline behaviour, the manifest and the service worker",
                "The server hardware",
                "The domain price"
              ],
              "answer": 1,
              "explanation": "The PWA category verifies the app meets the installable, reliable and capable bar."
            }
          ],
          "exercise": {
            "id": "pwa-m5-l2-e1",
            "title": "Audit checklist score",
            "type": "build-program",
            "instructions": "Read lines of check results as name=pass or name=fail. Print SCORE <passed>/<total> on the first line and ALL_GREEN when every check passes, otherwise NEEDS_WORK on the second line.",
            "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// score the deployment audit\n",
            "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nlet passed = 0, total = 0;\nfor (const l of lines) {\n  if (!l) continue;\n  total++;\n  if (l.endsWith('=pass')) passed++;\n}\nconsole.log(`SCORE ${passed}/${total}`);\nconsole.log(passed === total ? 'ALL_GREEN' : 'NEEDS_WORK');\n",
            "solutionExplanation": "Each check contributes to the total; the verdict is green only when every check passes.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "All green",
                "stdin": "https=pass\nmanifest=pass\nsw=pass\noffline=pass\n",
                "expectedStdout": "SCORE 4/4\nALL_GREEN",
                "hidden": false
              },
              {
                "name": "One fail",
                "stdin": "https=pass\nmanifest=fail\nsw=pass\n",
                "expectedStdout": "SCORE 2/3\nNEEDS_WORK",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Deploy over HTTPS, never cache the worker, audit before launch.",
              "approach": "A cached worker blocks updates for every installed user.",
              "structure": "Build, deploy to HTTPS, no-cache the worker, audit, test offline."
            }
          }
        }
      ]
    }
  ]
}),
];

export const SHORT_ASSESSMENTS_MOBILE: MasteryAssessment[] = [
  buildShortAssessment("flutter", [
  {
    "id": "flutter-a1",
    "kind": "conceptual",
    "topic": "Widgets",
    "question": "What is a widget in Flutter?",
    "options": [
      "A database row",
      "An immutable description of part of the UI",
      "A native binary",
      "A test file"
    ],
    "answer": 1,
    "explanation": "Widgets are immutable descriptions; Flutter renders them into pixels."
  },
  {
    "id": "flutter-a2",
    "kind": "conceptual",
    "topic": "State",
    "question": "When should you use a StatefulWidget instead of a StatelessWidget?",
    "options": [
      "Always",
      "When the UI changes over time in response to interaction or data",
      "When the app is small",
      "Never"
    ],
    "answer": 1,
    "explanation": "StatefulWidget owns mutable state; StatelessWidget depends only on constructor values."
  },
  {
    "id": "flutter-a3",
    "kind": "conceptual",
    "topic": "Navigation",
    "question": "What does the Navigator manage?",
    "options": [
      "The database",
      "A stack of routes (screens)",
      "The file system",
      "The theme only"
    ],
    "answer": 1,
    "explanation": "Navigator pushes and pops routes on a stack."
  },
  {
    "id": "flutter-a4",
    "kind": "conceptual",
    "topic": "Async",
    "question": "What does a Future represent in Dart?",
    "options": [
      "A value that will arrive later",
      "A value that is always null",
      "A widget",
      "A database table"
    ],
    "answer": 0,
    "explanation": "A Future is a placeholder for a value that completes asynchronously."
  },
  {
    "id": "flutter-a5",
    "kind": "conceptual",
    "topic": "State management",
    "question": "What does notifyListeners do in a ChangeNotifier?",
    "options": [
      "It saves data",
      "It tells watching widgets to rebuild",
      "It deletes the model",
      "It navigates"
    ],
    "answer": 1,
    "explanation": "Watching widgets rebuild when notifyListeners fires."
  },
  {
    "id": "flutter-a6",
    "kind": "code-reading",
    "topic": "Layout",
    "question": "What does this Row render?",
    "options": [
      "Two texts side by side",
      "Two texts stacked",
      "One text",
      "Nothing"
    ],
    "answer": 0,
    "explanation": "Row lays children out horizontally.",
    "code": "Row(children: [Text(\"Left\"), Text(\"Right\")])"
  },
  {
    "id": "flutter-a7",
    "kind": "code-reading",
    "topic": "Null safety",
    "question": "What does this expression evaluate to when nickname is null?",
    "options": [
      "null",
      "\"friend\"",
      "An error",
      "\"\""
    ],
    "answer": 1,
    "explanation": "?? supplies the right-hand default when the left side is null.",
    "code": "nickname ?? 'friend'"
  },
  {
    "id": "flutter-a8",
    "kind": "code-reading",
    "topic": "Forms",
    "question": "When the password is \"abc\", what does this validator return?",
    "options": [
      "null",
      "\"Password needs 6+ characters\"",
      "true",
      "0"
    ],
    "answer": 1,
    "explanation": "A 3-character password fails the length check, so the error string is returned.",
    "code": "validator: (v) => v == null || v.length < 6 ? 'Password needs 6+ characters' : null"
  },
  {
    "id": "flutter-a9",
    "kind": "debugging",
    "topic": "setState",
    "question": "The counter value changes but the screen does not update. What is wrong?",
    "options": [
      "The widget is wrong",
      "State was mutated without setState",
      "The app needs restarting",
      "The button is disabled"
    ],
    "answer": 1,
    "explanation": "Without setState Flutter never rebuilds, so the UI stays stale.",
    "code": "onPressed: () { _count++; }"
  },
  {
    "id": "flutter-a10",
    "kind": "debugging",
    "topic": "FutureBuilder",
    "question": "The list refetches on every rebuild. What is the fix?",
    "options": [
      "Use a bigger list",
      "Create the Future once in initState and reuse it",
      "Remove the FutureBuilder",
      "Add more widgets"
    ],
    "answer": 1,
    "explanation": "A Future created in build restarts on every rebuild; storing it in initState fixes it.",
    "code": "FutureBuilder(future: fetchItems(), ...) // inside build"
  }
], {
  "id": "flutter-assess-prog",
  "title": "Simulate a Flutter widget rebuild log",
  "type": "build-program",
  "instructions": "SIMULATION (Python): model a Flutter widget tree rebuild. Read lines of widget names that changed state. For each line print REBUILD <name>. After the input ends, print TOTAL <n> where n is the number of rebuilds.",
  "starterCode": "widgets = []\n# read widget names from stdin, print REBUILD lines and a TOTAL\n",
  "solution": "import sys\nnames = [l.strip() for l in sys.stdin if l.strip()]\nfor n in names:\n    print(f\"REBUILD {n}\")\nprint(f\"TOTAL {len(names)}\")\n",
  "solutionExplanation": "Each changed widget triggers one rebuild line, and the total counts them.",
  "tests": [
    {
      "name": "Two widgets",
      "stdin": "Counter\nTitle\n",
      "expectedStdout": "REBUILD Counter\nREBUILD Title\nTOTAL 2",
      "hidden": false
    },
    {
      "name": "One widget",
      "stdin": "List\n",
      "expectedStdout": "REBUILD List\nTOTAL 1",
      "hidden": true
    }
  ],
  "language": "python",
  "hintNotes": {
    "concept": "This assessment models simulate a flutter widget rebuild log: work out the exact output format from the requirements first.",
    "approach": "Handle the input line by line, keeping one piece of state for the result.",
    "structure": "Parse the input, apply the rules in order, then print the final result once."
  }
}, {
  "title": "Flutter Counter App",
  "description": "Build a small Flutter counter app with navigation, a form and a test.",
  "requirements": [
    "A MaterialApp with a home screen and a detail screen reached by navigation",
    "A counter using StatefulWidget and setState",
    "A form with at least one validated field",
    "A widget test for the counter"
  ],
  "rubric": [
    "Navigation pushes and pops correctly",
    "Counter updates through setState",
    "Form validation blocks invalid input",
    "Widget test passes"
  ]
}),
  buildShortAssessment("react-native", [
  {
    "id": "rn-a1",
    "kind": "conceptual",
    "topic": "Components",
    "question": "What does a React Native View render to?",
    "options": [
      "An HTML div",
      "A native container view on iOS or Android",
      "A database row",
      "A PDF"
    ],
    "answer": 1,
    "explanation": "View maps to a real native container view."
  },
  {
    "id": "rn-a2",
    "kind": "conceptual",
    "topic": "State",
    "question": "What does calling a useState setter do?",
    "options": [
      "It changes the value synchronously",
      "It schedules a re-render with the new value",
      "It deletes the component",
      "It saves to disk"
    ],
    "answer": 1,
    "explanation": "Setters schedule a re-render; updates may be batched."
  },
  {
    "id": "rn-a3",
    "kind": "conceptual",
    "topic": "Lists",
    "question": "Why use FlatList instead of mapping over an array in a ScrollView?",
    "options": [
      "It is shorter",
      "It virtualises rows, rendering only visible ones",
      "It fetches data",
      "It styles rows"
    ],
    "answer": 1,
    "explanation": "Virtualisation keeps long lists fast and memory-flat."
  },
  {
    "id": "rn-a4",
    "kind": "conceptual",
    "topic": "Navigation",
    "question": "What does navigation.navigate do?",
    "options": [
      "It closes the app",
      "It pushes a named screen onto the stack",
      "It reloads data",
      "It deletes history"
    ],
    "answer": 1,
    "explanation": "navigate pushes the named screen with optional params."
  },
  {
    "id": "rn-a5",
    "kind": "conceptual",
    "topic": "Persistence",
    "question": "What type of value does AsyncStorage store?",
    "options": [
      "Objects",
      "Strings only",
      "Numbers only",
      "Files"
    ],
    "answer": 1,
    "explanation": "AsyncStorage is a string key-value store; objects need JSON."
  },
  {
    "id": "rn-a6",
    "kind": "code-reading",
    "topic": "Hooks",
    "question": "What is count after the button is pressed once, starting from 0?",
    "options": [
      "0",
      "1",
      "2",
      "It crashes"
    ],
    "answer": 1,
    "explanation": "setCount(count + 1) schedules a render with 1.",
    "code": "const [count, setCount] = useState(0);\n<Button onPress={() => setCount(count + 1)} />"
  },
  {
    "id": "rn-a7",
    "kind": "code-reading",
    "topic": "FlatList",
    "question": "Which prop returns the stable key for each row?",
    "options": [
      "data",
      "renderItem",
      "keyExtractor",
      "style"
    ],
    "answer": 2,
    "explanation": "keyExtractor returns the stable key per item."
  },
  {
    "id": "rn-a8",
    "kind": "code-reading",
    "topic": "Forms",
    "question": "The email field has value={email} but no onChangeText. What happens when the user types?",
    "options": [
      "It updates",
      "Nothing: the field stays unchanged",
      "The app crashes",
      "The keyboard closes"
    ],
    "answer": 1,
    "explanation": "A controlled input without onChangeText cannot change."
  },
  {
    "id": "rn-a9",
    "kind": "debugging",
    "topic": "Fetching",
    "question": "The list refetches in an infinite loop. What is the cause?",
    "options": [
      "The server is slow",
      "The fetch runs during render instead of in useEffect",
      "The list is too long",
      "The phone is offline"
    ],
    "answer": 1,
    "explanation": "Fetching during render sets state, re-renders, and fetches again."
  },
  {
    "id": "rn-a10",
    "kind": "debugging",
    "topic": "Keys",
    "question": "After deleting the first contact, the wrong row disappears. What is wrong?",
    "options": [
      "The data is corrupt",
      "The keyExtractor uses the array index instead of a stable id",
      "The list is sorted",
      "The screen is too small"
    ],
    "answer": 1,
    "explanation": "Index keys misidentify rows after a delete; stable ids fix it."
  }
], {
  "id": "react-native-assess-prog",
  "title": "Render a FlatList page",
  "type": "build-program",
  "instructions": "Read a page size on line 1, a page number on line 2, then item lines. Print the items on that page, one per line, or EMPTY when the page has no items.",
  "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// print one page of the list\n",
  "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst size = parseInt(lines[0], 10);\nconst page = parseInt(lines[1], 10);\nconst items = lines.slice(2).filter(Boolean);\nconst slice = items.slice((page - 1) * size, page * size);\nconsole.log(slice.length ? slice.join('\\n') : 'EMPTY');\n",
  "solutionExplanation": "The page window is sliced from the items array and printed, or EMPTY when it has no items.",
  "tests": [
    {
      "name": "Page 2",
      "stdin": "2\n2\nAda\nBob\nCid\nDee\n",
      "expectedStdout": "Cid\nDee",
      "hidden": false
    },
    {
      "name": "Empty page",
      "stdin": "2\n3\nAda\n",
      "expectedStdout": "EMPTY",
      "hidden": true
    }
  ],
  "language": "javascript",
  "hintNotes": {
    "concept": "This assessment models render a flatlist page: work out the exact output format from the requirements first.",
    "approach": "Handle the input line by line, keeping one piece of state for the result.",
    "structure": "Parse the input, apply the rules in order, then print the final result once."
  }
}, {
  "title": "React Native Contacts App",
  "description": "Build a contacts app with a list, detail screen, form and local persistence.",
  "requirements": [
    "A FlatList of contacts with stable keys",
    "Stack navigation to a detail screen with params",
    "A form to add a contact with validation",
    "Contacts persist with AsyncStorage"
  ],
  "rubric": [
    "List virtualises and keys are stable",
    "Navigation passes params correctly",
    "Form validation blocks bad input",
    "Contacts survive a restart"
  ]
}),
  buildShortAssessment("android-kotlin", [
  {
    "id": "android-a1",
    "kind": "conceptual",
    "topic": "Null safety",
    "question": "What does String? mean in Kotlin?",
    "options": [
      "A String that is always null",
      "A String that may be null",
      "A String constant",
      "A String with no characters"
    ],
    "answer": 1,
    "explanation": "The ? marks the type as nullable."
  },
  {
    "id": "android-a2",
    "kind": "conceptual",
    "topic": "Lifecycle",
    "question": "Which callback builds the activity screen?",
    "options": [
      "onResume",
      "onCreate",
      "onDestroy",
      "onPause"
    ],
    "answer": 1,
    "explanation": "onCreate runs once at creation and sets up the UI."
  },
  {
    "id": "android-a3",
    "kind": "conceptual",
    "topic": "Compose",
    "question": "What is recomposition?",
    "options": [
      "Rebuilding the app",
      "Re-running the composables that read changed state",
      "Deleting the screen",
      "Restarting the activity"
    ],
    "answer": 1,
    "explanation": "State changes re-execute the composables that read the state."
  },
  {
    "id": "android-a4",
    "kind": "conceptual",
    "topic": "Coroutines",
    "question": "What does a suspend function do?",
    "options": [
      "It blocks the thread",
      "It can pause and resume without blocking its thread",
      "It runs only once",
      "It deletes data"
    ],
    "answer": 1,
    "explanation": "Suspend functions pause at suspension points and free the thread."
  },
  {
    "id": "android-a5",
    "kind": "conceptual",
    "topic": "Architecture",
    "question": "What survives a screen rotation: the Activity or the ViewModel?",
    "options": [
      "The Activity",
      "The ViewModel",
      "Neither",
      "Both always"
    ],
    "answer": 1,
    "explanation": "The Activity is recreated; the ViewModel is retained."
  },
  {
    "id": "android-a6",
    "kind": "code-reading",
    "topic": "Collections",
    "question": "What does this expression return for tasks [done, open, done]?",
    "options": [
      "All tasks",
      "Only the open task",
      "Only done tasks",
      "Nothing"
    ],
    "answer": 1,
    "explanation": "filter keeps elements where the predicate is true.",
    "code": "tasks.filter { !it.done }"
  },
  {
    "id": "android-a7",
    "kind": "code-reading",
    "topic": "Null safety",
    "question": "What does this print when name is null?",
    "options": [
      "null",
      "friend",
      "An error",
      "\"\""
    ],
    "answer": 1,
    "explanation": "The Elvis operator supplies friend when name is null.",
    "code": "name ?: \"friend\""
  },
  {
    "id": "android-a8",
    "kind": "code-reading",
    "topic": "Compose",
    "question": "Why is the counter reset on every recomposition here?",
    "options": [
      "The button is broken",
      "The state is not wrapped in remember",
      "The text is wrong",
      "The activity is destroyed"
    ],
    "answer": 1,
    "explanation": "Without remember the state is recreated each recomposition.",
    "code": "var count by mutableStateOf(0)"
  },
  {
    "id": "android-a9",
    "kind": "debugging",
    "topic": "Room",
    "question": "The app crashes accessing the database on the main thread. What is the fix?",
    "options": [
      "Use a bigger database",
      "Run the query in a coroutine and collect the Flow",
      "Delete the DAO",
      "Use a List instead"
    ],
    "answer": 1,
    "explanation": "Database work must run off the main thread, via coroutines."
  },
  {
    "id": "android-a10",
    "kind": "debugging",
    "topic": "ViewModel",
    "question": "The counter resets on rotation even though it lives in a ViewModel. What is wrong?",
    "options": [
      "The ViewModel is wrong",
      "It was created with a constructor call instead of the viewModel delegate",
      "The state is too big",
      "Rotation is unsupported"
    ],
    "answer": 1,
    "explanation": "Only the lifecycle-scoped instance from the viewModel delegate survives rotation."
  }
], {
  "id": "android-kotlin-assess-prog",
  "title": "Simulate the Android activity lifecycle",
  "type": "build-program",
  "instructions": "SIMULATION (Python): model the activity lifecycle. Read lines of events: CREATE, START, RESUME, PAUSE, STOP, DESTROY. Print the matching callback name for each valid event in order (onCreate, onStart, onResume, onPause, onStop, onDestroy), one per line. Ignore unknown lines.",
  "starterCode": "events = []\n# read events from stdin and print the lifecycle callbacks\n",
  "solution": "import sys\nmapping = {\"CREATE\": \"onCreate\", \"START\": \"onStart\", \"RESUME\": \"onResume\", \"PAUSE\": \"onPause\", \"STOP\": \"onStop\", \"DESTROY\": \"onDestroy\"}\nfor line in sys.stdin:\n    e = line.strip()\n    if e in mapping:\n        print(mapping[e])\n",
  "solutionExplanation": "Each lifecycle event maps to its callback name, and unknown lines are ignored.",
  "tests": [
    {
      "name": "Launch",
      "stdin": "CREATE\nSTART\nRESUME\n",
      "expectedStdout": "onCreate\nonStart\nonResume",
      "hidden": false
    },
    {
      "name": "Background",
      "stdin": "PAUSE\nSTOP\nDESTROY\n",
      "expectedStdout": "onPause\nonStop\nonDestroy",
      "hidden": true
    }
  ],
  "language": "python",
  "hintNotes": {
    "concept": "This assessment models simulate the android activity lifecycle: work out the exact output format from the requirements first.",
    "approach": "Handle the input line by line, keeping one piece of state for the result.",
    "structure": "Parse the input, apply the rules in order, then print the final result once."
  }
}, {
  "title": "Android Task Manager",
  "description": "Build a task manager with Compose, Room persistence, navigation and a ViewModel.",
  "requirements": [
    "A LazyColumn task list with stable keys",
    "Room persistence for tasks",
    "Navigation to a detail screen",
    "A ViewModel exposing tasks as StateFlow"
  ],
  "rubric": [
    "List updates when tasks change",
    "Tasks survive a restart",
    "Navigation passes the task id",
    "Rotation keeps the state"
  ]
}),
  buildShortAssessment("ios-swiftui", [
  {
    "id": "ios-a1",
    "kind": "conceptual",
    "topic": "Optionals",
    "question": "What is an Optional in Swift?",
    "options": [
      "A value that is always present",
      "A type that wraps a value that may be absent (nil)",
      "A deprecated type",
      "A kind of loop"
    ],
    "answer": 1,
    "explanation": "Optional adds an explicit nil case to a type."
  },
  {
    "id": "ios-a2",
    "kind": "conceptual",
    "topic": "Views",
    "question": "What does a SwiftUI view's body return?",
    "options": [
      "A string",
      "The view hierarchy that describes the screen",
      "A database row",
      "A file"
    ],
    "answer": 1,
    "explanation": "body computes the views that make up the interface."
  },
  {
    "id": "ios-a3",
    "kind": "conceptual",
    "topic": "State",
    "question": "What does @State do?",
    "options": [
      "It saves to disk",
      "It marks a property SwiftUI stores and watches, re-rendering on change",
      "It creates a global",
      "It fetches data"
    ],
    "answer": 1,
    "explanation": "@State lives outside the struct and invalidates the view on change."
  },
  {
    "id": "ios-a4",
    "kind": "conceptual",
    "topic": "Data",
    "question": "What does @Observable do to a class?",
    "options": [
      "It saves it to disk",
      "It makes SwiftUI track its properties and re-render readers on change",
      "It makes it a singleton",
      "It deletes it"
    ],
    "answer": 1,
    "explanation": "The macro adds observation so property changes invalidate dependent views."
  },
  {
    "id": "ios-a5",
    "kind": "conceptual",
    "topic": "Persistence",
    "question": "What does @Model do in SwiftData?",
    "options": [
      "It draws the UI",
      "It marks a class as a persisted entity",
      "It fetches from the network",
      "It creates a test"
    ],
    "answer": 1,
    "explanation": "@Model tells SwiftData to store instances of the class."
  },
  {
    "id": "ios-a6",
    "kind": "code-reading",
    "topic": "Optionals",
    "question": "What does greet(name: nil) return?",
    "options": [
      "\"Hello, !\"",
      "\"Hello, friend!\"",
      "nil",
      "It crashes"
    ],
    "answer": 1,
    "explanation": "guard let exits early on nil and returns the friend greeting.",
    "code": "func greet(name: String?) -> String {\n    guard let name = name else { return \"Hello, friend!\" }\n    return \"Hello, \\(name)!\"\n}"
  },
  {
    "id": "ios-a7",
    "kind": "code-reading",
    "topic": "Stacks",
    "question": "How are Text(\"A\") and Text(\"B\") arranged in a VStack?",
    "options": [
      "A left of B",
      "A above B",
      "B above A",
      "Overlapping"
    ],
    "answer": 1,
    "explanation": "VStack lays children out top to bottom in order."
  },
  {
    "id": "ios-a8",
    "kind": "code-reading",
    "topic": "Lists",
    "question": "After removing the element at index 1 from [A, B, C], what remains?",
    "options": [
      "[B, C]",
      "[A, C]",
      "[A, B]",
      "[A, B, C]"
    ],
    "answer": 1,
    "explanation": "Removing index 1 leaves A and C."
  },
  {
    "id": "ios-a9",
    "kind": "debugging",
    "topic": "Bindings",
    "question": "Tapping Add in the child does not change the parent count. What is wrong?",
    "options": [
      "The button is broken",
      "The value was passed by copy instead of a $ binding",
      "The parent is wrong",
      "The state is too big"
    ],
    "answer": 1,
    "explanation": "Passing the value gives the child a copy; a binding shares the storage."
  },
  {
    "id": "ios-a10",
    "kind": "debugging",
    "topic": "Networking",
    "question": "The list stays empty even though the server returns an array of users. What is wrong?",
    "options": [
      "The server is down",
      "The code decodes a single User instead of [User]",
      "The list is hidden",
      "The app is offline"
    ],
    "answer": 1,
    "explanation": "The decoded type must match the payload shape: an array decodes to [User]."
  }
], {
  "id": "ios-swiftui-assess-prog",
  "title": "Simulate SwiftUI state updates",
  "type": "build-program",
  "instructions": "SIMULATION (Python): model a SwiftUI @State counter. Read lines of INC, DEC or RESET starting from 0 (never below 0). Print the final count.",
  "starterCode": "count = 0\n# read commands from stdin, print the final count\n",
  "solution": "import sys\ncount = 0\nfor line in sys.stdin:\n    cmd = line.strip()\n    if cmd == \"INC\": count += 1\n    elif cmd == \"DEC\": count = max(0, count - 1)\n    elif cmd == \"RESET\": count = 0\nprint(count)\n",
  "solutionExplanation": "Each command is a state update applied in order, with DEC clamped at zero.",
  "tests": [
    {
      "name": "Mixed",
      "stdin": "INC\nINC\nDEC\nINC\n",
      "expectedStdout": "2",
      "hidden": false
    },
    {
      "name": "Reset",
      "stdin": "INC\nINC\nRESET\nINC\n",
      "expectedStdout": "1",
      "hidden": true
    }
  ],
  "language": "python",
  "hintNotes": {
    "concept": "This assessment models simulate swiftui state updates: work out the exact output format from the requirements first.",
    "approach": "Handle the input line by line, keeping one piece of state for the result.",
    "structure": "Parse the input, apply the rules in order, then print the final result once."
  }
}, {
  "title": "iOS Task Manager",
  "description": "Build a task manager with SwiftUI lists, navigation, an observable model and SwiftData persistence.",
  "requirements": [
    "A List of tasks with navigation to detail views",
    "An @Observable model shared across screens",
    "SwiftData persistence for tasks",
    "A unit test for the model"
  ],
  "rubric": [
    "List and detail navigation work",
    "Model changes update every screen",
    "Tasks survive a restart",
    "Unit test passes"
  ]
}),
  buildShortAssessment("maui", [
  {
    "id": "maui-a1",
    "kind": "conceptual",
    "topic": "XAML",
    "question": "What is XAML in a MAUI app?",
    "options": [
      "A database language",
      "An XML dialect that declares the user interface",
      "A testing framework",
      "A network protocol"
    ],
    "answer": 1,
    "explanation": "XAML markup describes pages, layouts and controls."
  },
  {
    "id": "maui-a2",
    "kind": "conceptual",
    "topic": "Binding",
    "question": "What does TwoWay binding do?",
    "options": [
      "It reads the value once",
      "It keeps the control and the view model in sync in both directions",
      "It deletes the binding",
      "It binds two controls together"
    ],
    "answer": 1,
    "explanation": "TwoWay pushes changes both ways between control and view model."
  },
  {
    "id": "maui-a3",
    "kind": "conceptual",
    "topic": "MVVM",
    "question": "Why must a ViewModel never reference a View?",
    "options": [
      "It is forbidden by law",
      "So the ViewModel can be unit-tested without any UI",
      "It slows the app",
      "Views have no references"
    ],
    "answer": 1,
    "explanation": "A UI-free ViewModel can be constructed and tested in isolation."
  },
  {
    "id": "maui-a4",
    "kind": "conceptual",
    "topic": "Storage",
    "question": "When should you use Preferences instead of SQLite?",
    "options": [
      "For large lists",
      "For small flat settings such as a theme",
      "For images",
      "Never"
    ],
    "answer": 1,
    "explanation": "Preferences is a simple key-value store for settings."
  },
  {
    "id": "maui-a5",
    "kind": "conceptual",
    "topic": "Navigation",
    "question": "What does PushAsync do?",
    "options": [
      "It deletes the current page",
      "It adds a new page on top of the navigation stack",
      "It closes the app",
      "It reloads the app"
    ],
    "answer": 1,
    "explanation": "Push adds a page; Pop removes it."
  },
  {
    "id": "maui-a6",
    "kind": "code-reading",
    "topic": "Grid",
    "question": "What does * mean in a Grid row or column definition?",
    "options": [
      "Fixed size",
      "A proportional share of the remaining space",
      "Content size",
      "Hidden"
    ],
    "answer": 1,
    "explanation": "Star sizing splits leftover space proportionally."
  },
  {
    "id": "maui-a7",
    "kind": "code-reading",
    "topic": "Binding",
    "question": "The count label never changes when the button is tapped. What is missing?",
    "options": [
      "The button",
      "A PropertyChanged notification in the setter",
      "The label",
      "The page"
    ],
    "answer": 1,
    "explanation": "Without PropertyChanged the binding never learns the value changed."
  },
  {
    "id": "maui-a8",
    "kind": "code-reading",
    "topic": "Converters",
    "question": "0 degrees Celsius converts to what Fahrenheit?",
    "options": [
      "0.0",
      "32.0",
      "100.0",
      "-32.0"
    ],
    "answer": 1,
    "explanation": "F = C * 9/5 + 32, so 0C is 32F."
  },
  {
    "id": "maui-a9",
    "kind": "debugging",
    "topic": "Shell",
    "question": "Navigating to \"detail\" throws a route-not-found error. What is wrong?",
    "options": [
      "The page is too big",
      "The route was never registered with RegisterRoute",
      "The app is offline",
      "The button is disabled"
    ],
    "answer": 1,
    "explanation": "Shell can only navigate to registered routes."
  },
  {
    "id": "maui-a10",
    "kind": "debugging",
    "topic": "SQLite",
    "question": "The first insert throws that the table does not exist. What is missing?",
    "options": [
      "The database file",
      "A CreateTableAsync call before the insert",
      "The model class",
      "The connection string"
    ],
    "answer": 1,
    "explanation": "The table must be created before any row is inserted."
  }
], {
  "id": "maui-assess-prog",
  "title": "Simulate MAUI Shell navigation",
  "type": "build-program",
  "instructions": "SIMULATION (Python): model a MAUI navigation stack. Read lines of PUSH <page> or POP. Print the final stack joined with \" > \", or EMPTY when the stack is empty. POP on an empty stack does nothing.",
  "starterCode": "stack = []\n# read commands from stdin, print the final stack\n",
  "solution": "import sys\nstack = []\nfor line in sys.stdin:\n    parts = line.strip().split(\" \", 1)\n    if not parts or not parts[0]: continue\n    if parts[0] == \"PUSH\" and len(parts) > 1: stack.append(parts[1])\n    elif parts[0] == \"POP\" and stack: stack.pop()\nprint(\" > \".join(stack) if stack else \"EMPTY\")\n",
  "solutionExplanation": "PUSH appends to the stack and POP removes the top, exactly like Shell navigation.",
  "tests": [
    {
      "name": "Push and pop",
      "stdin": "PUSH Home\nPUSH List\nPUSH Detail\nPOP\n",
      "expectedStdout": "Home > List",
      "hidden": false
    },
    {
      "name": "Empty",
      "stdin": "PUSH Home\nPOP\nPOP\n",
      "expectedStdout": "EMPTY",
      "hidden": true
    }
  ],
  "language": "python",
  "hintNotes": {
    "concept": "This assessment models simulate maui shell navigation: work out the exact output format from the requirements first.",
    "approach": "Handle the input line by line, keeping one piece of state for the result.",
    "structure": "Parse the input, apply the rules in order, then print the final result once."
  }
}, {
  "title": "MAUI Task Manager",
  "description": "Build a cross-platform task manager with MVVM, SQLite persistence, Shell navigation and tests.",
  "requirements": [
    "Shell navigation with tabs and a detail route",
    "A ViewModel with observable properties and commands",
    "SQLite persistence for tasks",
    "An xUnit test for the ViewModel"
  ],
  "rubric": [
    "Navigation works across sections",
    "Tasks persist and update the UI",
    "ViewModel is UI-free and tested",
    "App runs on two platforms"
  ]
}),
  buildShortAssessment("pwa", [
  {
    "id": "pwa-a1",
    "kind": "conceptual",
    "topic": "PWA",
    "question": "What are the three pillars of a PWA?",
    "options": [
      "Fast, cheap, pretty",
      "Reliable, installable, capable",
      "Native, hybrid, web",
      "Big, small, medium"
    ],
    "answer": 1,
    "explanation": "A PWA is reliable, installable and capable."
  },
  {
    "id": "pwa-a2",
    "kind": "conceptual",
    "topic": "Manifest",
    "question": "What does display: standalone do?",
    "options": [
      "It shows the full browser",
      "It opens the app without browser chrome",
      "It hides the app",
      "It forces fullscreen video"
    ],
    "answer": 1,
    "explanation": "Standalone removes the browser UI while keeping the system status bar."
  },
  {
    "id": "pwa-a3",
    "kind": "conceptual",
    "topic": "Service worker",
    "question": "What happens in the install event?",
    "options": [
      "The worker is deleted",
      "The app shell files are cached for offline use",
      "The page reloads",
      "The user is logged out"
    ],
    "answer": 1,
    "explanation": "Install is where the worker pre-caches the files the app needs offline."
  },
  {
    "id": "pwa-a4",
    "kind": "conceptual",
    "topic": "Caching",
    "question": "Which strategy fits a rarely changing JavaScript bundle?",
    "options": [
      "Network-first",
      "Cache-first",
      "No caching",
      "Always fetch"
    ],
    "answer": 1,
    "explanation": "Static assets change rarely and must load fast offline."
  },
  {
    "id": "pwa-a5",
    "kind": "conceptual",
    "topic": "Push",
    "question": "What is a VAPID key for?",
    "options": [
      "It encrypts the app",
      "It identifies the push sender to the push service",
      "It stores the subscription",
      "It draws the notification"
    ],
    "answer": 1,
    "explanation": "VAPID lets the push service identify the application server."
  },
  {
    "id": "pwa-a6",
    "kind": "code-reading",
    "topic": "Lifecycle",
    "question": "After install then activate, what state is the worker in?",
    "options": [
      "idle",
      "installed",
      "activated",
      "deleted"
    ],
    "answer": 2,
    "explanation": "Install moves to installed, activate moves to activated."
  },
  {
    "id": "pwa-a7",
    "kind": "code-reading",
    "topic": "Caching",
    "question": "The cache holds /app.js and /style.css. A request for /app.js returns what?",
    "options": [
      "MISS",
      "HIT",
      "An error",
      "Nothing"
    ],
    "answer": 1,
    "explanation": "Cache-first finds the entry and reports a hit."
  },
  {
    "id": "pwa-a8",
    "kind": "code-reading",
    "topic": "Performance",
    "question": "LCP is 3200ms. Does it pass a 2500ms budget?",
    "options": [
      "Yes",
      "No",
      "Only on mobile",
      "Only with caching"
    ],
    "answer": 1,
    "explanation": "3200 exceeds the 2500 budget, so it fails."
  },
  {
    "id": "pwa-a9",
    "kind": "debugging",
    "topic": "Updates",
    "question": "Installed users never receive updates. What is the cause?",
    "options": [
      "The manifest is wrong",
      "The service worker script is served with a long cache lifetime",
      "The icons are missing",
      "The app is too big"
    ],
    "answer": 1,
    "explanation": "A cached worker is never re-fetched, so new versions never arrive."
  },
  {
    "id": "pwa-a10",
    "kind": "debugging",
    "topic": "Offline",
    "question": "Tasks added offline disappear when the tab closes. What is wrong?",
    "options": [
      "The tasks were too big",
      "The queue was kept only in memory instead of durable storage",
      "The server is down",
      "The manifest is wrong"
    ],
    "answer": 1,
    "explanation": "An in-memory queue dies with the tab; IndexedDB survives."
  }
], {
  "id": "pwa-assess-prog",
  "title": "Cache-first lookup",
  "type": "build-program",
  "instructions": "Line 1 is the number of cached entries, then that many lines of cached URL, then lines of requests. For each request print HIT <url> when cached, otherwise MISS <url>.",
  "starterCode": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n// simulate cache-first lookups\n",
  "solution": "import fs from 'node:fs';\nconst lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(lines[0], 10);\nconst cache = new Set(lines.slice(1, 1 + n));\nfor (const req of lines.slice(1 + n)) {\n  if (!req) continue;\n  console.log((cache.has(req) ? 'HIT ' : 'MISS ') + req);\n}\n",
  "solutionExplanation": "A cache-first lookup checks the set and reports a hit or a miss for every request.",
  "tests": [
    {
      "name": "Mixed",
      "stdin": "2\n/app.js\n/style.css\n/app.js\n/api/data\n/style.css\n",
      "expectedStdout": "HIT /app.js\nMISS /api/data\nHIT /style.css",
      "hidden": false
    },
    {
      "name": "All miss",
      "stdin": "0\n/app.js\n",
      "expectedStdout": "MISS /app.js",
      "hidden": true
    }
  ],
  "language": "javascript",
  "hintNotes": {
    "concept": "This assessment models cache-first lookup: work out the exact output format from the requirements first.",
    "approach": "Handle the input line by line, keeping one piece of state for the result.",
    "structure": "Parse the input, apply the rules in order, then print the final result once."
  }
}, {
  "title": "Offline Notes PWA",
  "description": "Build an installable offline notes PWA with a manifest, service worker, IndexedDB storage and an audit pass.",
  "requirements": [
    "A valid manifest with 192 and 512 icons",
    "A service worker caching the app shell",
    "Notes stored in IndexedDB and working offline",
    "A Lighthouse PWA audit with all checks green"
  ],
  "rubric": [
    "App installs from the browser",
    "App works fully offline",
    "Notes persist across restarts",
    "Lighthouse PWA score is green"
  ]
}),
];
