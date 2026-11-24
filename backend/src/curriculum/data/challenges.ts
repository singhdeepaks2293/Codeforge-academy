// Short timed code challenges. Each challenge is graded by running the
// learner's code against real tests through the existing executor — never
// by pattern-matching the source. Tests are stored server-side only.
import type { TestCase } from '../types.js';

export interface Challenge {
  id: string;
  title: string;
  language: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimitSeconds: number;
  instructions: string;
  starterCode: string;
  tests: TestCase[];
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'fizzbuzz', title: 'FizzBuzz', language: 'python', difficulty: 'Easy', timeLimitSeconds: 600,
    instructions: 'Read an integer n from stdin and print the numbers 1..n, one per line, replacing multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".',
    starterCode: 'n = int(input())\n# print 1..n with FizzBuzz rules\n',
    tests: [
      { name: 'n=3', stdin: '3\n', expectedStdout: '1\n2\nFizz', hidden: false },
      { name: 'n=15', stdin: '15\n', expectedStdout: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', hidden: false },
      { name: 'n=1', stdin: '1\n', expectedStdout: '1', hidden: true },
    ],
  },
  {
    id: 'reverse-string', title: 'Reverse a String', language: 'python', difficulty: 'Easy', timeLimitSeconds: 600,
    instructions: 'Read a line from stdin and print it reversed.',
    starterCode: 's = input()\n# print s reversed\n',
    tests: [
      { name: 'hello', stdin: 'hello\n', expectedStdout: 'olleh', hidden: false },
      { name: 'palindrome', stdin: 'racecar\n', expectedStdout: 'racecar', hidden: false },
      { name: 'empty', stdin: '\n', expectedStdout: '', hidden: true },
    ],
  },
  {
    id: 'sum-of-digits', title: 'Sum of Digits', language: 'python', difficulty: 'Easy', timeLimitSeconds: 600,
    instructions: 'Read an integer from stdin and print the sum of its decimal digits.',
    starterCode: 'n = int(input())\n# print the sum of the digits of n\n',
    tests: [
      { name: '123', stdin: '123\n', expectedStdout: '6', hidden: false },
      { name: '999', stdin: '999\n', expectedStdout: '27', hidden: false },
      { name: 'zero', stdin: '0\n', expectedStdout: '0', hidden: true },
    ],
  },
  {
    id: 'is-prime', title: 'Prime Check', language: 'python', difficulty: 'Medium', timeLimitSeconds: 900,
    instructions: 'Read an integer n from stdin and print "prime" if n is prime, otherwise "not prime". 1 and below are not prime.',
    starterCode: 'n = int(input())\n# print "prime" or "not prime"\n',
    tests: [
      { name: '7 is prime', stdin: '7\n', expectedStdout: 'prime', hidden: false },
      { name: '10 is not', stdin: '10\n', expectedStdout: 'not prime', hidden: false },
      { name: '1 is not', stdin: '1\n', expectedStdout: 'not prime', hidden: true },
      { name: '97 is prime', stdin: '97\n', expectedStdout: 'prime', hidden: true },
    ],
  },
  {
    id: 'two-sum-count', title: 'Count Pairs Summing to Target', language: 'python', difficulty: 'Medium', timeLimitSeconds: 900,
    instructions: 'Read two lines: the first is space-separated integers, the second is the target. Print how many distinct index pairs (i < j) sum to the target.',
    starterCode: 'nums = list(map(int, input().split()))\ntarget = int(input())\n# print the number of pairs summing to target\n',
    tests: [
      { name: 'basic', stdin: '1 2 3 4 5\n6\n', expectedStdout: '2', hidden: false },
      { name: 'none', stdin: '1 1 1\n10\n', expectedStdout: '0', hidden: false },
      { name: 'duplicates', stdin: '2 2 2 2\n4\n', expectedStdout: '6', hidden: true },
    ],
  },
  {
    id: 'c-hello-sum', title: 'Sum Two Numbers (C)', language: 'c', difficulty: 'Easy', timeLimitSeconds: 600,
    instructions: 'Read two integers from stdin and print their sum.',
    starterCode: '#include <stdio.h>\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    // print a + b\n    return 0;\n}\n',
    tests: [
      { name: '2+3', stdin: '2 3\n', expectedStdout: '5', hidden: false },
      { name: 'negatives', stdin: '-4 10\n', expectedStdout: '6', hidden: false },
      { name: 'zero', stdin: '0 0\n', expectedStdout: '0', hidden: true },
    ],
  },
  {
    id: 'c-factorial', title: 'Factorial (C)', language: 'c', difficulty: 'Easy', timeLimitSeconds: 600,
    instructions: 'Read a non-negative integer n from stdin and print n! (factorial).',
    starterCode: '#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    // print n!\n    return 0;\n}\n',
    tests: [
      { name: '5!', stdin: '5\n', expectedStdout: '120', hidden: false },
      { name: '0!', stdin: '0\n', expectedStdout: '1', hidden: false },
      { name: '10!', stdin: '10\n', expectedStdout: '3628800', hidden: true },
    ],
  },
  {
    id: 'ts-add', title: 'Add Function (TypeScript)', language: 'typescript', difficulty: 'Easy', timeLimitSeconds: 600,
    instructions: 'The program reads two integers from stdin (one per line) and must print their sum. Implement it in TypeScript.',
    starterCode: 'import * as fs from "fs";\nconst lines = fs.readFileSync(0, "utf-8").trim().split(/\\s+/);\nconst a: number = Number(lines[0]);\nconst b: number = Number(lines[1]);\n// print the sum of a and b\nconsole.log(0);\n',
    tests: [
      { name: '3+4', stdin: '3\n4\n', expectedStdout: '7', hidden: false },
      { name: 'negatives', stdin: '-5\n5\n', expectedStdout: '0', hidden: true },
    ],
  },
];
