import { buildCourse, buildShortAssessment } from '../builder.js';
import type { Course, MasteryAssessment } from '../types.js';

// CS Foundations & Career — 13 tracks, 136 lessons, 136 exercises.
export const TRACKS_CS: Course[] = [
  buildCourse({
    "id": "operating-systems",
    "slug": "operating-systems",
    "language": "c",
    "category": "cs-career",
    "title": "Operating Systems",
    "description": "How operating systems manage processes, memory, files, and hardware: from the kernel and scheduling to paging, deadlocks, and system calls.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Process management",
      "CPU scheduling",
      "Virtual memory",
      "Paging",
      "Concurrency",
      "Deadlocks",
      "File systems",
      "System calls"
    ],
    "prerequisites": [
      "Basic C programming",
      "Comfort with the command line"
    ],
    "modules": [
      {
        "id": "operating-systems-m1",
        "title": "Operating System Foundations",
        "description": "What an operating system is, and how processes relate to the kernel.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "operating-systems-m1-l1",
            "slug": "operating-systems-m1-l1",
            "title": "What Is an Operating System",
            "objectives": [
              "Explain what the role of an operating system means and where it appears in real systems",
              "Apply the role of an operating system to a small realistic problem",
              "Recognise the common mistakes people make with the role of an operating system"
            ],
            "introduction": "Here you will get hands-on with the role of an operating system: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "An operating system is the layer of software that stands between user programs and the hardware, deciding who gets the CPU, the memory, and the disk at any moment. Without it, every program would have to drive the disk controller, the keyboard, and the screen itself, and two programs could never safely share one machine. The kernel is the privileged core of the OS: it runs in kernel mode with full hardware access, while ordinary programs run in user mode and must ask the kernel for anything sensitive through system calls. That split is what keeps a crashing browser from taking down the whole machine.",
            "syntax": "user program -> system call -> kernel -> hardware",
            "analogy": "An operating system is like a hotel manager: guests (programs) never touch the boiler room or the safe directly; they ask the manager, who schedules everything fairly.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    printf(\"User mode: limited access\\n\");\n    printf(\"Kernel mode: full hardware access\\n\");\n    printf(\"System calls bridge the two.\\n\");\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where the role of an operating system does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Assuming the OS runs your program's logic for you, instead of just scheduling it.",
              "Forgetting that user-mode programs must ask the kernel for hardware access.",
              "Confusing the kernel with the shell or the desktop environment."
            ],
            "debugging": {
              "prompt": "This program should report how many programs the OS is managing, but it prints the wrong count. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"The OS manages %d programs.\\n\", n + 1);\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"The OS manages %d programs.\\n\", n);\n    return 0;\n}",
              "explanation": "The program adds 1 to the count for no reason; printing n itself gives the correct number of programs."
            },
            "miniChallenge": "Extend the exercise: apply the role of an operating system to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "An operating system mediates between programs and hardware; its privileged kernel runs in kernel mode while user programs ask for resources through system calls.",
            "quiz": [
              {
                "question": "What is the kernel's main job?",
                "options": [
                  "To draw windows on the screen",
                  "To manage hardware and mediate between programs and resources",
                  "To compile user programs",
                  "To store passwords"
                ],
                "answer": 1,
                "explanation": "The kernel manages hardware resources and mediates access so programs can share the machine safely."
              },
              {
                "question": "Why do programs run in user mode instead of kernel mode?",
                "options": [
                  "User mode is faster",
                  "So a bug in one program cannot corrupt the whole system",
                  "Kernel mode has no memory",
                  "User mode uses less disk space"
                ],
                "answer": 1,
                "explanation": "User mode limits what a program can touch, so one program's bug stays contained."
              }
            ],
            "exercise": {
              "title": "Count the programs the OS manages",
              "type": "write-code",
              "instructions": "Write a program that reads the number of running programs and prints exactly: The OS manages N programs.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    // print the message here\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"The OS manages %d programs.\\n\", n);\n    return 0;\n}",
              "solutionExplanation": "Read the count with scanf and print it inside the sentence with %d.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Three programs",
                  "hidden": false,
                  "stdin": "3\n",
                  "expectedStdout": "The OS manages 3 programs."
                },
                {
                  "name": "Seven programs",
                  "hidden": true,
                  "stdin": "7\n",
                  "expectedStdout": "The OS manages 7 programs."
                }
              ],
              "hintNotes": {
                "concept": "The OS itself does not run your program's logic; it just schedules it — your job is to read the number and print it.",
                "approach": "Use scanf with %d to read the integer, then printf with the same %d placeholder.",
                "structure": "Structure: include stdio, declare main, read n, print the sentence, return 0."
              },
              "id": "operating-systems-m1-l1-e1"
            }
          },
          {
            "id": "operating-systems-m1-l2",
            "slug": "operating-systems-m1-l2",
            "title": "Processes and the Kernel",
            "objectives": [
              "Explain what processes and the kernel means and where it appears in real systems",
              "Apply processes and the kernel to a small realistic problem",
              "Recognise the common mistakes people make with processes and the kernel"
            ],
            "introduction": "This lesson introduces processes and the kernel. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A process is a program in execution, and the operating system treats each one as an independent unit with its own memory, file handles, and identity. When you double-click an app, the kernel loads its code, creates a process control block (PCB) holding its registers, program counter, and state, and assigns it a process ID (PID). Every process except the first is created by another process — its parent — which is why the kernel can build a whole process tree from a single ancestor. Processes are the OS's basic unit of work: scheduling, memory, and protection all operate per process.",
            "syntax": "fork() creates a child process; getpid() returns the current PID",
            "analogy": "A process is like a chef with their own workstation: their own ingredients, tools, and recipe card, separate from every other chef in the kitchen.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int pid = 42, ppid = 1;\n    printf(\"Process %d runs under parent %d.\\n\", pid, ppid);\n    printf(\"Each process has its own memory.\\n\");\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Start by naming the problem processes and the kernel solves in plain words.",
              "Follow the example step by step and note where processes and the kernel changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Thinking a process is the same thing as the program file on disk.",
              "Assuming a child process shares memory with its parent by default.",
              "Forgetting that PIDs are assigned by the kernel, not chosen by the program."
            ],
            "debugging": {
              "prompt": "This program should print the process and its parent, but the two numbers are swapped. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int pid = 42, ppid = 1;\n    printf(\"Process %d runs under parent %d.\\n\", ppid, pid);\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int pid = 42, ppid = 1;\n    printf(\"Process %d runs under parent %d.\\n\", pid, ppid);\n    return 0;\n}",
              "explanation": "The printf arguments are in the wrong order: pid must come first, then ppid, to match the sentence."
            },
            "miniChallenge": "Extend the exercise: apply processes and the kernel to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A process is a running program with its own memory and a PCB; the kernel tracks it by PID and organises processes into a parent-child tree.",
            "quiz": [
              {
                "question": "What does the process control block (PCB) store?",
                "options": [
                  "The user's password",
                  "The process state, registers, program counter, and PID",
                  "The source code of the program",
                  "The contents of the hard disk"
                ],
                "answer": 1,
                "explanation": "The PCB is the kernel's record of a process: its state, registers, program counter, and identity."
              },
              {
                "question": "What is a process's parent?",
                "options": [
                  "The program that compiled it",
                  "The process that created it",
                  "The first process on the disk",
                  "The kernel's backup copy"
                ],
                "answer": 1,
                "explanation": "Every process is created by another process, its parent, forming a process tree."
              }
            ],
            "exercise": {
              "title": "Report a process and its parent",
              "type": "write-code",
              "instructions": "Write a program that reads a PID and its parent PID and prints exactly: Process <pid> runs under parent <ppid>.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int pid, ppid;\n    scanf(\"%d %d\", &pid, &ppid);\n    // print the message here\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int pid, ppid;\n    scanf(\"%d %d\", &pid, &ppid);\n    printf(\"Process %d runs under parent %d.\\n\", pid, ppid);\n    return 0;\n}",
              "solutionExplanation": "Read both integers with one scanf call, then print them in the same order with two %d placeholders.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "PID 42 parent 1",
                  "hidden": false,
                  "stdin": "42 1\n",
                  "expectedStdout": "Process 42 runs under parent 1."
                },
                {
                  "name": "PID 100 parent 50",
                  "hidden": true,
                  "stdin": "100 50\n",
                  "expectedStdout": "Process 100 runs under parent 50."
                }
              ],
              "hintNotes": {
                "concept": "A process ID is just a number the kernel assigns; printing it is plain printf work.",
                "approach": "Read pid and ppid in one scanf with two %d placeholders, in the order given.",
                "structure": "Structure: read both values, then one printf with the two numbers in order."
              },
              "id": "operating-systems-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "operating-systems-m2",
        "title": "Processes and Scheduling",
        "description": "How the kernel switches between processes and decides who runs next.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "operating-systems-m2-l1",
            "slug": "operating-systems-m2-l1",
            "title": "Process States and the PCB",
            "objectives": [
              "Explain what process states means and where it appears in real systems",
              "Apply process states to a small realistic problem",
              "Recognise the common mistakes people make with process states"
            ],
            "introduction": "In this lesson you will see process states in action, work through a guided example, and practise it yourself.",
            "concept": "Every process is always in one of a few states, and the kernel moves it between them as events happen. A new process starts in the ready state, waiting for the CPU; when the scheduler picks it, it becomes running; if it waits for disk or input it moves to waiting (blocked); when the wait ends it returns to ready; when it finishes it becomes terminated. The PCB stores the state plus everything needed to pause and resume the process — registers, program counter, and open files — which is what makes a context switch possible. Without saved state, switching processes would lose their place entirely.",
            "syntax": "new -> ready -> running -> waiting -> ready -> terminated",
            "analogy": "Process states are like a hospital waiting room: patients wait (ready), see the doctor (running), wait for test results (waiting), and are discharged (terminated).",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int state = 1;\n    if (state == 0) printf(\"ready\\n\");\n    else if (state == 1) printf(\"running\\n\");\n    else printf(\"waiting\\n\");\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Read the example and trace how process states is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Believing a waiting process still holds the CPU while it waits.",
              "Thinking the ready and running states are the same thing.",
              "Forgetting that a process can return to ready many times before it terminates."
            ],
            "debugging": {
              "prompt": "This program should print the state name for code 1 (running), but it prints the wrong state. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int state = 1;\n    if (state == 0) printf(\"ready\\n\");\n    else if (state == 2) printf(\"running\\n\");\n    else printf(\"waiting\\n\");\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int state = 1;\n    if (state == 0) printf(\"ready\\n\");\n    else if (state == 1) printf(\"running\\n\");\n    else printf(\"waiting\\n\");\n    return 0;\n}",
              "explanation": "The running branch checks for 2 instead of 1, so state 1 falls through to the waiting branch."
            },
            "miniChallenge": "Extend the exercise: apply process states to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Processes move between ready, running, waiting, and terminated states; the PCB stores the state and the saved registers that make context switches possible.",
            "quiz": [
              {
                "question": "Which state is a process in while it waits for disk I/O?",
                "options": [
                  "Running",
                  "Ready",
                  "Waiting (blocked)",
                  "Terminated"
                ],
                "answer": 2,
                "explanation": "A process waiting for I/O is blocked: it cannot run until the device responds."
              },
              {
                "question": "What makes a context switch possible?",
                "options": [
                  "The PCB saves the process's registers and program counter",
                  "The CPU runs twice as fast",
                  "The disk stores a copy of RAM",
                  "The compiler inserts switch code"
                ],
                "answer": 0,
                "explanation": "The PCB preserves everything needed to resume a process exactly where it stopped."
              }
            ],
            "exercise": {
              "title": "Name a process state",
              "type": "write-code",
              "instructions": "Write a program that reads a state code (0=ready, 1=running, 2=waiting) and prints the state name on its own line.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int state;\n    scanf(\"%d\", &state);\n    // print ready, running, or waiting\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int state;\n    scanf(\"%d\", &state);\n    if (state == 0) printf(\"ready\\n\");\n    else if (state == 1) printf(\"running\\n\");\n    else printf(\"waiting\\n\");\n    return 0;\n}",
              "solutionExplanation": "Use an if / else-if chain to map each code to its name, printing exactly one line.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Running",
                  "hidden": false,
                  "stdin": "1\n",
                  "expectedStdout": "running"
                },
                {
                  "name": "Waiting",
                  "hidden": true,
                  "stdin": "2\n",
                  "expectedStdout": "waiting"
                }
              ],
              "hintNotes": {
                "concept": "A state code is just a number; your job is to translate it into the matching word.",
                "approach": "Compare the code with == against 0, 1, and 2, printing the matching name.",
                "structure": "Structure: read the code, then an if / else-if chain with one printf per branch."
              },
              "id": "operating-systems-m2-l1-e1"
            }
          },
          {
            "id": "operating-systems-m2-l2",
            "slug": "operating-systems-m2-l2",
            "title": "Scheduling Algorithms",
            "objectives": [
              "Explain what CPU scheduling means and where it appears in real systems",
              "Apply CPU scheduling to a small realistic problem",
              "Recognise the common mistakes people make with CPU scheduling"
            ],
            "introduction": "Here you will get hands-on with CPU scheduling: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "CPU scheduling is the kernel's answer to a simple question: with many ready processes and one CPU, who runs next? First-come-first-served (FCFS) runs processes in arrival order — simple and fair, but one long job can hold up everything behind it, the convoy effect. Shortest-job-first (SJF) minimises average waiting time but needs to know how long jobs will run, which the kernel can only estimate. Round-robin gives every process a short time slice in turn, which is why your editor stays responsive while a compile runs in the background. The metric that matters most is usually waiting time: how long a process sits ready before it gets the CPU.",
            "syntax": "FCFS: run in arrival order; SJF: shortest burst first; RR: fixed time slices",
            "analogy": "Scheduling is like a single checkout lane: FCFS serves shoppers in order, SJF lets the person with one item jump ahead, and round-robin lets everyone scan a few items at a time.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int b1 = 4, b2 = 3, b3 = 2;\n    int w1 = 0, w2 = b1, w3 = b1 + b2;\n    printf(\"Waiting times: %d %d %d\\n\", w1, w2, w3);\n    printf(\"Average: %.2f\\n\", (w1 + w2 + w3) / 3.0);\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where CPU scheduling does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Thinking waiting time includes the time a process spends running.",
              "Forgetting that the first process under FCFS waits zero time.",
              "Using integer division (sum / 3) and losing the fractional part of the average."
            ],
            "debugging": {
              "prompt": "This FCFS program should compute waiting times 0, 4, 7 for bursts 4, 3, 2, but its third waiting time is wrong. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int b1 = 4, b2 = 3, b3 = 2;\n    int w1 = 0, w2 = b1, w3 = b2;\n    printf(\"Waiting times: %d %d %d\\n\", w1, w2, w3);\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int b1 = 4, b2 = 3, b3 = 2;\n    int w1 = 0, w2 = b1, w3 = b1 + b2;\n    printf(\"Waiting times: %d %d %d\\n\", w1, w2, w3);\n    return 0;\n}",
              "explanation": "The third process waits for both earlier bursts, so w3 must be b1 + b2, not just b2."
            },
            "miniChallenge": "Extend the exercise: apply CPU scheduling to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "FCFS runs jobs in arrival order, SJF minimises average waiting time, and round-robin shares short time slices; waiting time is the key metric for comparing them.",
            "quiz": [
              {
                "question": "What is the convoy effect in FCFS scheduling?",
                "options": [
                  "Short jobs finish first",
                  "One long job delays every shorter job behind it",
                  "The CPU overheats",
                  "Processes arrive in the wrong order"
                ],
                "answer": 1,
                "explanation": "Under FCFS, a long burst at the front makes all later jobs wait, even if they are tiny."
              },
              {
                "question": "Why does round-robin keep interactive programs responsive?",
                "options": [
                  "It runs jobs in alphabetical order",
                  "Every process gets a short time slice in turn, so no one waits long",
                  "It uses more CPUs",
                  "It skips long jobs entirely"
                ],
                "answer": 1,
                "explanation": "Short slices shared in turn mean each process gets the CPU frequently, keeping response times low."
              }
            ],
            "exercise": {
              "title": "Average waiting time under FCFS",
              "type": "write-code",
              "instructions": "Write a program that reads three burst times and prints the average waiting time under FCFS with two decimal places, exactly: Average waiting time: X.XX",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int b1, b2, b3;\n    scanf(\"%d %d %d\", &b1, &b2, &b3);\n    // waiting times are 0, b1, b1+b2; print the average\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int b1, b2, b3;\n    scanf(\"%d %d %d\", &b1, &b2, &b3);\n    int w1 = 0, w2 = b1, w3 = b1 + b2;\n    printf(\"Average waiting time: %.2f\\n\", (w1 + w2 + w3) / 3.0);\n    return 0;\n}",
              "solutionExplanation": "Waiting times are 0, b1, and b1+b2; divide their sum by 3.0 (not 3) so the average is a float printed with %.2f.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Bursts 4 3 2",
                  "hidden": false,
                  "stdin": "4 3 2\n",
                  "expectedStdout": "Average waiting time: 3.67"
                },
                {
                  "name": "Bursts 5 5 5",
                  "hidden": true,
                  "stdin": "5 5 5\n",
                  "expectedStdout": "Average waiting time: 5.00"
                }
              ],
              "hintNotes": {
                "concept": "Under FCFS the first process waits 0, the second waits for the first burst, the third waits for both.",
                "approach": "Sum the three waiting times and divide by 3.0 to keep the fractional part.",
                "structure": "Structure: read the bursts, compute w1/w2/w3, then one printf with %.2f."
              },
              "id": "operating-systems-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "operating-systems-m3",
        "title": "Memory Management",
        "description": "Virtual memory, paging, and how the OS hands out RAM.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "operating-systems-m3-l1",
            "slug": "operating-systems-m3-l1",
            "title": "Virtual Memory and Address Spaces",
            "objectives": [
              "Explain what virtual memory means and where it appears in real systems",
              "Apply virtual memory to a small realistic problem",
              "Recognise the common mistakes people make with virtual memory"
            ],
            "introduction": "This lesson introduces virtual memory. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Virtual memory gives every process the illusion of its own large, private address space, even though physical RAM is shared and much smaller. The memory management unit (MMU) translates each virtual address the process uses into a physical address, using page tables the kernel maintains per process. Because translation happens in hardware, a process cannot accidentally (or deliberately) read another process's memory — the mapping simply does not exist. Virtual memory also lets the OS move pages to disk when RAM runs short and bring them back on demand, which is why a machine can run more programs than fit in RAM at once.",
            "syntax": "virtual address -> MMU + page table -> physical address",
            "analogy": "Virtual memory is like a hotel giving every guest a room number starting at 1: the numbers look the same to each guest, but the front desk maps them to different real rooms.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int addr = 4097, size = 1024;\n    printf(\"Page %d Offset %d\\n\", addr / size, addr % size);\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Start by naming the problem virtual memory solves in plain words.",
              "Follow the example step by step and note where virtual memory changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Confusing a virtual address with the physical address it maps to.",
              "Thinking each process sees the same addresses as every other process.",
              "Forgetting that the offset is always smaller than the page size."
            ],
            "debugging": {
              "prompt": "This program should split address 4097 into page 4 and offset 1 with a 1024-byte page, but it prints the wrong page. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int addr = 4097, size = 1024;\n    printf(\"Page %d Offset %d\\n\", addr % size, addr / size);\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int addr = 4097, size = 1024;\n    printf(\"Page %d Offset %d\\n\", addr / size, addr % size);\n    return 0;\n}",
              "explanation": "Page and offset are swapped: the page number is addr / size and the offset is addr % size."
            },
            "miniChallenge": "Extend the exercise: apply virtual memory to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Virtual memory gives each process a private address space; the MMU translates virtual addresses to physical ones through per-process page tables, providing isolation.",
            "quiz": [
              {
                "question": "What does the MMU do?",
                "options": [
                  "It compiles programs",
                  "It translates virtual addresses to physical addresses in hardware",
                  "It writes files to disk",
                  "It schedules processes"
                ],
                "answer": 1,
                "explanation": "The MMU performs address translation on every memory access, using the process's page tables."
              },
              {
                "question": "Why does virtual memory improve isolation?",
                "options": [
                  "Each process has its own page tables, so it cannot map another process's pages",
                  "Virtual memory is encrypted",
                  "Processes share one address space",
                  "RAM becomes faster"
                ],
                "answer": 0,
                "explanation": "Separate mappings mean a process simply has no way to address another process's memory."
              }
            ],
            "exercise": {
              "title": "Split an address into page and offset",
              "type": "write-code",
              "instructions": "Write a program that reads a virtual address and a page size and prints exactly: Page <p> Offset <o>.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int addr, size;\n    scanf(\"%d %d\", &addr, &size);\n    // page = addr / size, offset = addr % size\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int addr, size;\n    scanf(\"%d %d\", &addr, &size);\n    printf(\"Page %d Offset %d\\n\", addr / size, addr % size);\n    return 0;\n}",
              "solutionExplanation": "Integer division gives the page number and the remainder operator % gives the offset within the page.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Address 4097 size 1024",
                  "hidden": false,
                  "stdin": "4097 1024\n",
                  "expectedStdout": "Page 4 Offset 1"
                },
                {
                  "name": "Address 8192 size 4096",
                  "hidden": true,
                  "stdin": "8192 4096\n",
                  "expectedStdout": "Page 2 Offset 0"
                }
              ],
              "hintNotes": {
                "concept": "A virtual address is page number times page size plus offset — division and remainder split it apart.",
                "approach": "Use addr / size for the page and addr % size for the offset.",
                "structure": "Structure: read both numbers, then one printf with the two computed values."
              },
              "id": "operating-systems-m3-l1-e1"
            }
          },
          {
            "id": "operating-systems-m3-l2",
            "slug": "operating-systems-m3-l2",
            "title": "Paging and Page Tables",
            "objectives": [
              "Explain what paging and page tables means and where it appears in real systems",
              "Apply paging and page tables to a small realistic problem",
              "Recognise the common mistakes people make with paging and page tables"
            ],
            "introduction": "This lesson introduces paging and page tables. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Paging splits both virtual and physical memory into fixed-size blocks called pages and frames, and a page table maps each virtual page to the frame that holds it. Because every page is the same size, there is no external fragmentation: any free frame can hold any page. A page-table entry also carries flags — present, read/write, and accessed bits — so the kernel can tell whether a page is in RAM at all and whether the process may write to it. When a process touches a page marked not-present, the hardware raises a page fault and the kernel loads the page from disk before letting the process continue.",
            "syntax": "page table entry: frame number + present + read/write flags",
            "analogy": "Paging is like a library where every book is the same thickness: any empty shelf slot fits any book, and the catalogue tells you exactly which slot holds which book.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int page = 3, size = 1024;\n    printf(\"Page %d starts at byte %d\\n\", page, page * size);\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Start by naming the problem paging and page tables solves in plain words.",
              "Follow the example step by step and note where paging and page tables changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Mixing up a page (virtual) with a frame (physical).",
              "Thinking a page fault always means the program has a bug.",
              "Assuming page-table entries only store the frame number, ignoring the flags."
            ],
            "debugging": {
              "prompt": "This program should print the starting byte of page 3 with 1024-byte pages (3072), but it prints 3. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int page = 3, size = 1024;\n    printf(\"Page %d starts at byte %d\\n\", page, page);\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int page = 3, size = 1024;\n    printf(\"Page %d starts at byte %d\\n\", page, page * size);\n    return 0;\n}",
              "explanation": "The second value must be page * size — the byte address where the page starts — not the page number again."
            },
            "miniChallenge": "Extend the exercise: apply paging and page tables to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Paging maps fixed-size virtual pages to physical frames through a page table; equal page sizes remove external fragmentation, and a page fault lets the kernel load a missing page on demand.",
            "quiz": [
              {
                "question": "Why does paging eliminate external fragmentation?",
                "options": [
                  "Pages are variable size",
                  "Every page is the same size, so any free frame fits any page",
                  "Page tables are stored on disk",
                  "Frames are larger than pages"
                ],
                "answer": 1,
                "explanation": "Fixed-size pages mean a free frame is interchangeable — there are never unusable gaps between allocations."
              },
              {
                "question": "What happens on a page fault?",
                "options": [
                  "The program crashes immediately",
                  "The kernel loads the missing page from disk and resumes the process",
                  "The page table is deleted",
                  "The CPU switches to another computer"
                ],
                "answer": 1,
                "explanation": "A not-present page triggers a fault; the kernel fetches the page and restarts the faulting instruction."
              }
            ],
            "exercise": {
              "title": "Find a page's starting byte",
              "type": "write-code",
              "instructions": "Write a program that reads a page number and a page size and prints exactly: Page <p> starts at byte <b>.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int page, size;\n    scanf(\"%d %d\", &page, &size);\n    // starting byte = page * size\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int page, size;\n    scanf(\"%d %d\", &page, &size);\n    printf(\"Page %d starts at byte %d\\n\", page, page * size);\n    return 0;\n}",
              "solutionExplanation": "Multiply the page number by the page size to get the byte address of the page's first byte.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Page 3 size 1024",
                  "hidden": false,
                  "stdin": "3 1024\n",
                  "expectedStdout": "Page 3 starts at byte 3072"
                },
                {
                  "name": "Page 5 size 4096",
                  "hidden": true,
                  "stdin": "5 4096\n",
                  "expectedStdout": "Page 5 starts at byte 20480"
                }
              ],
              "hintNotes": {
                "concept": "Pages are numbered from zero, and each page occupies exactly one page-size block of addresses.",
                "approach": "The starting byte is page * size — a single multiplication.",
                "structure": "Structure: read page and size, then one printf with the page and the product."
              },
              "id": "operating-systems-m3-l2-e1"
            }
          },
          {
            "id": "operating-systems-m3-l3",
            "slug": "operating-systems-m3-l3",
            "title": "Allocation and Fragmentation",
            "objectives": [
              "Explain what memory allocation and fragmentation means and where it appears in real systems",
              "Apply memory allocation and fragmentation to a small realistic problem",
              "Recognise the common mistakes people make with memory allocation and fragmentation"
            ],
            "introduction": "In this lesson you will see memory allocation and fragmentation in action, work through a guided example, and practise it yourself.",
            "concept": "When the kernel or a program asks for memory, the allocator must find a free block that fits, and the choice matters. First-fit takes the first block large enough, which is fast but tends to shred the start of memory into small pieces. Best-fit takes the smallest block that fits, which wastes the least space per allocation but leaves tiny unusable slivers everywhere. Worst-fit takes the largest block, hoping the leftover stays useful. Over time, repeated allocation and freeing leaves free memory scattered — fragmentation — and a request can fail even though enough total free memory exists, because no single block is big enough.",
            "syntax": "first-fit: first block that fits; best-fit: smallest block that fits",
            "analogy": "Memory allocation is like parking cars in a lot: first-fit takes the first open space, best-fit squeezes into the tightest one, and fragmentation is the scattered single spaces no car can use.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int size = 5000, block = 1024;\n    int blocks = (size + block - 1) / block;\n    printf(\"Blocks needed: %d\\n\", blocks);\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Read the example and trace how memory allocation and fragmentation is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Using plain division and silently dropping the partial last block.",
              "Thinking fragmentation means memory is completely full.",
              "Assuming best-fit is always better than first-fit."
            ],
            "debugging": {
              "prompt": "This program should compute 5 blocks for 5000 bytes in 1024-byte blocks, but it prints 4. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int size = 5000, block = 1024;\n    int blocks = size / block;\n    printf(\"Blocks needed: %d\\n\", blocks);\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int size = 5000, block = 1024;\n    int blocks = (size + block - 1) / block;\n    printf(\"Blocks needed: %d\\n\", blocks);\n    return 0;\n}",
              "explanation": "Plain division truncates, so a partial last block is lost; adding block - 1 before dividing rounds the count up."
            },
            "miniChallenge": "Extend the exercise: apply memory allocation and fragmentation to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Allocators choose blocks by first-fit, best-fit, or worst-fit; over time, freeing and reallocating fragments free memory so a request can fail despite enough total free space.",
            "quiz": [
              {
                "question": "What is fragmentation?",
                "options": [
                  "Memory that is never used",
                  "Free memory split into pieces too small to satisfy a request, even though the total is enough",
                  "A program that uses too much RAM",
                  "The page table growing too large"
                ],
                "answer": 1,
                "explanation": "Fragmentation scatters free space so no single contiguous block fits, even when the total free space is sufficient."
              },
              {
                "question": "What is the downside of best-fit allocation?",
                "options": [
                  "It is very slow to search",
                  "It leaves behind tiny slivers that are too small to use",
                  "It never finds a block",
                  "It wastes the most space per allocation"
                ],
                "answer": 1,
                "explanation": "Best-fit leaves the smallest leftover, which is often too small for any future request."
              }
            ],
            "exercise": {
              "title": "Count the blocks a file needs",
              "type": "write-code",
              "instructions": "Write a program that reads a file size in bytes and a block size and prints exactly: Blocks needed: <n>. Round up for a partial block.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int size, block;\n    scanf(\"%d %d\", &size, &block);\n    // round up: (size + block - 1) / block\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int size, block;\n    scanf(\"%d %d\", &size, &block);\n    printf(\"Blocks needed: %d\\n\", (size + block - 1) / block);\n    return 0;\n}",
              "solutionExplanation": "Use (size + block - 1) / block: integer division after adding block - 1 rounds up to cover a partial final block.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5000 bytes, 1024 blocks",
                  "hidden": false,
                  "stdin": "5000 1024\n",
                  "expectedStdout": "Blocks needed: 5"
                },
                {
                  "name": "4096 bytes, 1024 blocks",
                  "hidden": true,
                  "stdin": "4096 1024\n",
                  "expectedStdout": "Blocks needed: 4"
                }
              ],
              "hintNotes": {
                "concept": "A partial block still needs a whole block, so the count must round up, not down.",
                "approach": "Add block - 1 to the size before dividing — the classic ceiling-division trick.",
                "structure": "Structure: read size and block, then one printf with the ceiling division."
              },
              "id": "operating-systems-m3-l3-e1"
            }
          }
        ]
      },
      {
        "id": "operating-systems-m4",
        "title": "Concurrency and File Systems",
        "description": "Threads, synchronisation, deadlocks, and how files are stored.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "operating-systems-m4-l1",
            "slug": "operating-systems-m4-l1",
            "title": "Threads and Synchronisation",
            "objectives": [
              "Explain what threads and synchronisation means and where it appears in real systems",
              "Apply threads and synchronisation to a small realistic problem",
              "Recognise the common mistakes people make with threads and synchronisation"
            ],
            "introduction": "In this lesson you will see threads and synchronisation in action, work through a guided example, and practise it yourself.",
            "concept": "A thread is a unit of execution inside a process: threads in one process share the same memory and file handles but each has its own stack and registers. That sharing makes threads cheap to create and fast to communicate, but it also means two threads can step on each other's data. If two threads both read a counter, add one, and write it back, one update can be lost — a race condition. The fix is synchronisation: a mutex (lock) lets only one thread touch shared data at a time, and the thread that holds the lock must release it so others can proceed. Correct threaded code is mostly about deciding what the lock protects.",
            "syntax": "mutex: only the thread holding the lock may touch the shared data",
            "analogy": "Threads are like cooks sharing one kitchen: they share the pantry and the stove, but only one cook may use the sharp knife at a time — the knife is the lock.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int threads = 4, per_thread = 1000;\n    printf(\"Total increments: %d\\n\", threads * per_thread);\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Read the example and trace how threads and synchronisation is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Assuming threads in one process have separate memory like processes do.",
              "Forgetting to release a mutex, so other threads wait forever.",
              "Locking too much code and turning parallel threads back into serial ones."
            ],
            "debugging": {
              "prompt": "This program should report 4000 total increments for 4 threads doing 1000 each, but it prints 1000. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int threads = 4, per_thread = 1000;\n    printf(\"Total increments: %d\\n\", per_thread);\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int threads = 4, per_thread = 1000;\n    printf(\"Total increments: %d\\n\", threads * per_thread);\n    return 0;\n}",
              "explanation": "The total is threads times per-thread work, not just the per-thread count — the multiplication was missing."
            },
            "miniChallenge": "Extend the exercise: apply threads and synchronisation to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Threads in a process share memory but have their own stacks; unsynchronised access causes race conditions, and a mutex serialises access to shared data.",
            "quiz": [
              {
                "question": "What is a race condition?",
                "options": [
                  "Two threads running on different CPUs",
                  "The result depends on the timing of two threads accessing shared data",
                  "A thread that runs too fast",
                  "Two processes with the same PID"
                ],
                "answer": 1,
                "explanation": "When unsynchronised threads interleave reads and writes, the outcome depends on scheduling order and can be wrong."
              },
              {
                "question": "What does a mutex guarantee?",
                "options": [
                  "Only one thread holds it at a time, so the protected data is touched by one thread at once",
                  "Threads never wait",
                  "The program runs faster",
                  "Deadlocks cannot happen"
                ],
                "answer": 0,
                "explanation": "A mutex serialises access to the shared data it guards; only the holder may enter the critical section."
              }
            ],
            "exercise": {
              "title": "Total work across threads",
              "type": "write-code",
              "instructions": "Write a program that reads the number of threads and the increments each thread performs, and prints exactly: Total increments: <n>.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int threads, per_thread;\n    scanf(\"%d %d\", &threads, &per_thread);\n    // total = threads * per_thread\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int threads, per_thread;\n    scanf(\"%d %d\", &threads, &per_thread);\n    printf(\"Total increments: %d\\n\", threads * per_thread);\n    return 0;\n}",
              "solutionExplanation": "Multiply the thread count by the per-thread increments to get the total work.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "4 threads x 1000",
                  "hidden": false,
                  "stdin": "4 1000\n",
                  "expectedStdout": "Total increments: 4000"
                },
                {
                  "name": "8 threads x 250",
                  "hidden": true,
                  "stdin": "8 250\n",
                  "expectedStdout": "Total increments: 2000"
                }
              ],
              "hintNotes": {
                "concept": "Each thread contributes its own share, so the total is the per-thread count times the number of threads.",
                "approach": "Read both numbers, multiply them, and print the result.",
                "structure": "Structure: read threads and per_thread, then one printf with the product."
              },
              "id": "operating-systems-m4-l1-e1"
            }
          },
          {
            "id": "operating-systems-m4-l2",
            "slug": "operating-systems-m4-l2",
            "title": "Deadlocks",
            "objectives": [
              "Explain what deadlocks means and where it appears in real systems",
              "Apply deadlocks to a small realistic problem",
              "Recognise the common mistakes people make with deadlocks"
            ],
            "introduction": "In this lesson you will see deadlocks in action, work through a guided example, and practise it yourself.",
            "concept": "A deadlock is a standstill: two or more processes each hold a resource the other one needs, and none of them can move. Four conditions must all hold for a deadlock to be possible — mutual exclusion, hold-and-wait, no preemption, and circular wait — so breaking any one of them prevents deadlock. The classic prevention is to order resources: if every process always acquires locks in the same global order, a circular wait can never form. Detection is the other approach: the OS periodically checks the wait graph for a cycle and, if it finds one, kills or rolls back a process to break it. Deadlocks are rare but catastrophic, which is why lock ordering is a habit worth building early.",
            "syntax": "deadlock needs: mutual exclusion + hold-and-wait + no preemption + circular wait",
            "analogy": "A deadlock is like two people in a narrow hallway, each waiting for the other to step aside — nobody moves until someone breaks the pattern.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int requested = 2, available = 5;\n    if (requested <= available) printf(\"SAFE\\n\");\n    else printf(\"DEADLOCK RISK\\n\");\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Read the example and trace how deadlocks is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Thinking a deadlock needs many processes — two are enough.",
              "Forgetting that hold-and-wait is required: a process that grabs everything at once cannot deadlock.",
              "Assuming deadlocks only happen with locks, not with any exclusive resource."
            ],
            "debugging": {
              "prompt": "This check should report SAFE when the request fits the available resources, but it reports DEADLOCK RISK. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int requested = 2, available = 5;\n    if (requested >= available) printf(\"SAFE\\n\");\n    else printf(\"DEADLOCK RISK\\n\");\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int requested = 2, available = 5;\n    if (requested <= available) printf(\"SAFE\\n\");\n    else printf(\"DEADLOCK RISK\\n\");\n    return 0;\n}",
              "explanation": "The comparison is backwards: SAFE means the request fits inside the available resources, so the test must be requested <= available."
            },
            "miniChallenge": "Extend the exercise: apply deadlocks to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Deadlock needs mutual exclusion, hold-and-wait, no preemption, and circular wait; a fixed global lock order breaks the cycle, and the OS can also detect and recover from it.",
            "quiz": [
              {
                "question": "Which set of conditions must all hold for a deadlock?",
                "options": [
                  "Mutual exclusion, hold-and-wait, no preemption, circular wait",
                  "Two CPUs, one disk, no memory, one user",
                  "High load, low memory, slow disk, many users",
                  "One process, one thread, one lock, one file"
                ],
                "answer": 0,
                "explanation": "All four Coffman conditions are necessary; breaking any one of them prevents deadlock."
              },
              {
                "question": "How does a fixed global lock order prevent deadlock?",
                "options": [
                  "It makes locks faster",
                  "It makes a circular wait impossible, because every process acquires locks in the same order",
                  "It removes the need for locks",
                  "It lets the OS preempt locks"
                ],
                "answer": 1,
                "explanation": "With one global acquisition order, a process can never hold a later lock while waiting for an earlier one, so no cycle can form."
              }
            ],
            "exercise": {
              "title": "Detect a deadlock risk",
              "type": "write-code",
              "instructions": "Write a program that reads held, requested, and available resource counts and prints SAFE if requested <= available, otherwise DEADLOCK RISK.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int held, requested, available;\n    scanf(\"%d %d %d\", &held, &requested, &available);\n    // print SAFE or DEADLOCK RISK\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int held, requested, available;\n    scanf(\"%d %d %d\", &held, &requested, &available);\n    if (requested <= available) printf(\"SAFE\\n\");\n    else printf(\"DEADLOCK RISK\\n\");\n    return 0;\n}",
              "solutionExplanation": "Compare requested against available with <=; print SAFE when the request fits, DEADLOCK RISK otherwise. The held count is context, not part of the test.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Request fits",
                  "hidden": false,
                  "stdin": "3 2 5\n",
                  "expectedStdout": "SAFE"
                },
                {
                  "name": "Request exceeds",
                  "hidden": true,
                  "stdin": "4 6 5\n",
                  "expectedStdout": "DEADLOCK RISK"
                }
              ],
              "hintNotes": {
                "concept": "The safety question is simple: can the request be satisfied from what is available right now?",
                "approach": "Use an if with requested <= available to choose between the two messages.",
                "structure": "Structure: read three numbers, then one if/else printing exactly one line."
              },
              "id": "operating-systems-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "operating-systems-m5",
        "title": "Storage, Calls and Protection",
        "description": "File systems, system calls, and keeping processes apart.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "operating-systems-m5-l1",
            "slug": "operating-systems-m5-l1",
            "title": "File Systems and Inodes",
            "objectives": [
              "Explain what file systems and inodes means and where it appears in real systems",
              "Apply file systems and inodes to a small realistic problem",
              "Recognise the common mistakes people make with file systems and inodes"
            ],
            "introduction": "In this lesson you will see file systems and inodes in action, work through a guided example, and practise it yourself.",
            "concept": "A file system turns a raw disk — a flat array of blocks — into named files arranged in directories. Each file has an inode, a small record holding its size, owner, permissions, timestamps, and the list of disk blocks that store its bytes; the filename itself lives in the directory, pointing at the inode. Because files occupy whole blocks, a 5000-byte file in 1024-byte blocks uses 5 blocks and wastes 120 bytes in the last one — internal fragmentation at the file-system level. Directories are just special files whose contents are name-to-inode mappings, which is why renaming a file is cheap: only the directory entry changes, not the data.",
            "syntax": "inode: metadata + block list; directory: name -> inode number",
            "analogy": "A file system is like a library catalogue: the directory is the card index, the inode is the card with the book's details, and the blocks are the shelves holding the pages.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int size = 5000, block = 1024;\n    int blocks = (size + block - 1) / block;\n    printf(\"Blocks: %d, wasted bytes: %d\\n\", blocks, blocks * block - size);\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Read the example and trace how file systems and inodes is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Thinking the filename is stored inside the inode.",
              "Forgetting that the last block of a file is usually partly wasted.",
              "Assuming a directory is fundamentally different from a file."
            ],
            "debugging": {
              "prompt": "This program should report 5 blocks and 120 wasted bytes for a 5000-byte file, but the wasted count is wrong. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int size = 5000, block = 1024;\n    int blocks = (size + block - 1) / block;\n    printf(\"Blocks: %d, wasted bytes: %d\\n\", blocks, size - blocks * block);\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int size = 5000, block = 1024;\n    int blocks = (size + block - 1) / block;\n    printf(\"Blocks: %d, wasted bytes: %d\\n\", blocks, blocks * block - size);\n    return 0;\n}",
              "explanation": "Wasted bytes are the allocated space minus the file size — blocks * block - size — not the other way round, which would be negative."
            },
            "miniChallenge": "Extend the exercise: apply file systems and inodes to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A file system maps names to inodes in directories; the inode holds metadata and block pointers, and files waste the unused tail of their last block.",
            "quiz": [
              {
                "question": "What does an inode store?",
                "options": [
                  "The filename",
                  "The file's metadata and the list of its disk blocks",
                  "The file's contents",
                  "The directory path"
                ],
                "answer": 1,
                "explanation": "The inode holds size, owner, permissions, timestamps, and block pointers; names live in directories."
              },
              {
                "question": "Why is renaming a file cheap?",
                "options": [
                  "Only the directory entry changes; the inode and data blocks stay put",
                  "The file is copied to a new disk",
                  "Renaming compresses the file",
                  "The kernel caches all names"
                ],
                "answer": 0,
                "explanation": "A rename just updates the name-to-inode mapping in the directory — no data moves."
              }
            ],
            "exercise": {
              "title": "Blocks and wasted space for a file",
              "type": "write-code",
              "instructions": "Write a program that reads a file size and a block size and prints exactly: Blocks: <b>, wasted bytes: <w>.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int size, block;\n    scanf(\"%d %d\", &size, &block);\n    // blocks = ceil(size / block); wasted = blocks*block - size\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int size, block;\n    scanf(\"%d %d\", &size, &block);\n    int blocks = (size + block - 1) / block;\n    printf(\"Blocks: %d, wasted bytes: %d\\n\", blocks, blocks * block - size);\n    return 0;\n}",
              "solutionExplanation": "Round the block count up with ceiling division, then wasted space is the allocated bytes minus the file size.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5000 bytes, 1024 blocks",
                  "hidden": false,
                  "stdin": "5000 1024\n",
                  "expectedStdout": "Blocks: 5, wasted bytes: 120"
                },
                {
                  "name": "2048 bytes, 1024 blocks",
                  "hidden": true,
                  "stdin": "2048 1024\n",
                  "expectedStdout": "Blocks: 2, wasted bytes: 0"
                }
              ],
              "hintNotes": {
                "concept": "A file always occupies whole blocks, so the last block is usually partly empty.",
                "approach": "Compute blocks with ceiling division, then wasted = blocks * block - size.",
                "structure": "Structure: read size and block, compute blocks, then one printf with both values."
              },
              "id": "operating-systems-m5-l1-e1"
            }
          },
          {
            "id": "operating-systems-m5-l2",
            "slug": "operating-systems-m5-l2",
            "title": "System Calls and Protection",
            "objectives": [
              "Explain what system calls and protection means and where it appears in real systems",
              "Apply system calls and protection to a small realistic problem",
              "Recognise the common mistakes people make with system calls and protection"
            ],
            "introduction": "In this lesson you will see system calls and protection in action, work through a guided example, and practise it yourself.",
            "concept": "A system call is the controlled doorway through which a user program asks the kernel to do something privileged: read a file, create a process, send a packet. The program places the call number and arguments in registers, triggers a trap into kernel mode, and the kernel checks the request before acting — a process may only read a file it has permission for, for example. This gatekeeping is the foundation of protection: the kernel is the only code that touches hardware directly, and every access goes through its checks. Without system calls, protection would be a polite request instead of an enforced rule.",
            "syntax": "trap into kernel mode -> kernel validates -> kernel acts -> return to user mode",
            "analogy": "A system call is like ordering at a bank counter: you fill in a slip (the call number and arguments), hand it over, and the clerk checks your ID before doing anything.",
            "exampleCode": "#include <stdio.h>\nint main(void) {\n    int call = 1;\n    if (call == 0) printf(\"read\\n\");\n    else if (call == 1) printf(\"write\\n\");\n    else printf(\"unknown syscall\\n\");\n    return 0;\n}",
            "exampleLanguage": "c",
            "walkthrough": [
              "Read the example and trace how system calls and protection is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Thinking a system call is the same as an ordinary function call.",
              "Assuming the kernel trusts whatever arguments a program passes.",
              "Forgetting that entering kernel mode is what makes the check enforceable."
            ],
            "debugging": {
              "prompt": "This program should print the name of syscall 1 (write), but it prints read. Find the bug.",
              "buggyCode": "#include <stdio.h>\nint main(void) {\n    int call = 1;\n    if (call == 1) printf(\"read\\n\");\n    else if (call == 0) printf(\"write\\n\");\n    else printf(\"unknown syscall\\n\");\n    return 0;\n}",
              "fixedCode": "#include <stdio.h>\nint main(void) {\n    int call = 1;\n    if (call == 0) printf(\"read\\n\");\n    else if (call == 1) printf(\"write\\n\");\n    else printf(\"unknown syscall\\n\");\n    return 0;\n}",
              "explanation": "The names are attached to the wrong numbers: 0 is read and 1 is write, so the branches must be swapped."
            },
            "miniChallenge": "Extend the exercise: apply system calls and protection to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "System calls are the controlled doorway into the kernel: a trap switches to kernel mode, the kernel validates the request, and protection becomes enforceable rather than voluntary.",
            "quiz": [
              {
                "question": "Why must programs use system calls instead of touching hardware directly?",
                "options": [
                  "Hardware is too slow",
                  "So the kernel can validate every privileged action and enforce protection",
                  "Programs do not know the hardware addresses",
                  "System calls use less power"
                ],
                "answer": 1,
                "explanation": "The kernel is the only code allowed to touch hardware; system calls let it check permissions on every request."
              },
              {
                "question": "What happens when a program makes a system call?",
                "options": [
                  "It restarts",
                  "It traps into kernel mode, the kernel handles the request, then control returns",
                  "It becomes the kernel permanently",
                  "It skips all permission checks"
                ],
                "answer": 1,
                "explanation": "A trap switches the CPU to kernel mode; after handling the call, the kernel returns to user mode."
              }
            ],
            "exercise": {
              "title": "Name a system call",
              "type": "write-code",
              "instructions": "Write a program that reads a syscall number (0=read, 1=write, 2=open, 3=close) and prints its name, or unknown syscall for any other number.",
              "starterCode": "#include <stdio.h>\nint main(void) {\n    int call;\n    scanf(\"%d\", &call);\n    // print read, write, open, close, or unknown syscall\n    return 0;\n}",
              "solution": "#include <stdio.h>\nint main(void) {\n    int call;\n    scanf(\"%d\", &call);\n    if (call == 0) printf(\"read\\n\");\n    else if (call == 1) printf(\"write\\n\");\n    else if (call == 2) printf(\"open\\n\");\n    else if (call == 3) printf(\"close\\n\");\n    else printf(\"unknown syscall\\n\");\n    return 0;\n}",
              "solutionExplanation": "Use an if / else-if chain mapping each number to its name, with a final else for unknown numbers.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Syscall 1",
                  "hidden": false,
                  "stdin": "1\n",
                  "expectedStdout": "write"
                },
                {
                  "name": "Syscall 2",
                  "hidden": true,
                  "stdin": "2\n",
                  "expectedStdout": "open"
                }
              ],
              "hintNotes": {
                "concept": "A syscall number is just a code; the kernel keeps a table mapping each code to a handler.",
                "approach": "Chain if / else-if checks for 0, 1, 2, and 3, ending with an else for anything else.",
                "structure": "Structure: read the number, then the chain, each branch printing one name."
              },
              "id": "operating-systems-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "computer-networks",
    "slug": "computer-networks",
    "language": "python",
    "category": "cs-career",
    "title": "Computer Networks",
    "description": "How data moves across networks: the OSI model, IP addressing, TCP and UDP, sockets, HTTP and DNS, TLS, and the tools engineers use to diagnose problems.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "OSI model",
      "IP addressing and subnetting",
      "TCP and UDP",
      "Python sockets",
      "HTTP and DNS",
      "TLS",
      "Network troubleshooting"
    ],
    "prerequisites": [
      "Basic Python programming"
    ],
    "modules": [
      {
        "id": "computer-networks-m1",
        "title": "Networking Basics",
        "description": "What networks are and how the OSI model organises them.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "computer-networks-m1-l1",
            "slug": "computer-networks-m1-l1",
            "title": "What Is a Network",
            "objectives": [
              "Explain what what a network is means and where it appears in real systems",
              "Apply what a network is to a small realistic problem",
              "Recognise the common mistakes people make with what a network is"
            ],
            "introduction": "Here you will get hands-on with what a network is: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A network is a set of devices connected so they can exchange data, and the internet is simply a network of networks agreeing on shared rules called protocols. When you load a web page, your request travels from your laptop through a home router, an ISP, and several backbone links before reaching a server, and the response comes back the same way. Protocols matter because every device on the path must agree on the format of the messages, or nothing arrives intact. Networks are judged by bandwidth (how much data per second), latency (how long one trip takes), and reliability (how much arrives uncorrupted).",
            "syntax": "bandwidth = data per second; latency = time for one round trip",
            "analogy": "A network is like a postal system: addresses, sorting offices, and delivery routes let a letter reach any house, and the rules of addressing are the protocol.",
            "exampleCode": "print(\"A network connects devices so they can exchange data.\")\nprint(\"The internet is a network of networks.\")\nprint(\"Protocols are the shared rules every device follows.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where what a network is does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Confusing bandwidth (how much) with latency (how fast).",
              "Thinking the internet is one central computer instead of many networks.",
              "Assuming a protocol is a piece of hardware."
            ],
            "debugging": {
              "prompt": "This program should report the round-trip time, but it prints the one-way time twice. Find the bug.",
              "buggyCode": "one_way = 25\nprint(\"Round trip:\", one_way)",
              "fixedCode": "one_way = 25\nprint(\"Round trip:\", one_way * 2)",
              "explanation": "A round trip is there and back, so the time is twice the one-way time."
            },
            "miniChallenge": "Extend the exercise: apply what a network is to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A network connects devices that exchange data under shared protocols; bandwidth, latency, and reliability are the three qualities that describe any network.",
            "quiz": [
              {
                "question": "What is the internet, in one sentence?",
                "options": [
                  "One giant computer",
                  "A network of networks that agree on shared protocols",
                  "A single company's private system",
                  "A kind of Wi-Fi router"
                ],
                "answer": 1,
                "explanation": "The internet is many independent networks interconnected through common protocols."
              },
              {
                "question": "What does latency measure?",
                "options": [
                  "How much data fits in a second",
                  "How long one trip across the network takes",
                  "How many devices are connected",
                  "How big a packet can be"
                ],
                "answer": 1,
                "explanation": "Latency is the time for data to travel from source to destination."
              }
            ],
            "exercise": {
              "title": "Compute round-trip time",
              "type": "write-code",
              "instructions": "Write a program that reads a one-way latency in milliseconds and prints exactly: Round trip: <n> ms.",
              "starterCode": "one_way = int(input())\n# print the round-trip time\n",
              "solution": "one_way = int(input())\nprint(f\"Round trip: {one_way * 2} ms\")",
              "solutionExplanation": "Double the one-way latency to get the round-trip time and print it with the ms label.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "One-way 25 ms",
                  "hidden": false,
                  "stdin": "25\n",
                  "expectedStdout": "Round trip: 50 ms"
                },
                {
                  "name": "One-way 120 ms",
                  "hidden": true,
                  "stdin": "120\n",
                  "expectedStdout": "Round trip: 240 ms"
                }
              ],
              "hintNotes": {
                "concept": "A round trip goes there and back, so it takes twice the one-way time.",
                "approach": "Multiply the input by 2 and format it with an f-string.",
                "structure": "Structure: read the integer, then one print with the doubled value."
              },
              "id": "computer-networks-m1-l1-e1"
            }
          },
          {
            "id": "computer-networks-m1-l2",
            "slug": "computer-networks-m1-l2",
            "title": "The OSI Model",
            "objectives": [
              "Explain what the OSI model means and where it appears in real systems",
              "Apply the OSI model to a small realistic problem",
              "Recognise the common mistakes people make with the OSI model"
            ],
            "introduction": "In this lesson you will see the OSI model in action, work through a guided example, and practise it yourself.",
            "concept": "The OSI model organises networking into seven layers, each with one job, so engineers can change one layer without breaking the rest. At the bottom, the physical layer moves bits over cables and radio; the data link layer frames them for one hop; the network layer routes packets across networks with IP addresses; the transport layer (TCP/UDP) delivers them to the right application; and the session, presentation, and application layers handle conversations, formats, and the services users actually see, like HTTP. In practice the top three layers are often merged into one application layer in the TCP/IP model, but the OSI vocabulary is still how engineers talk about where a problem lives.",
            "syntax": "7 Physical, 6 Data Link, 5 Network, 4 Transport, 3 Session, 2 Presentation, 1 Application",
            "analogy": "The OSI model is like sending a parcel: packaging, labelling, routing, delivery, and unpacking are separate jobs done by different people, each handing the parcel to the next.",
            "exampleCode": "layers = [\"Physical\", \"Data Link\", \"Network\", \"Transport\", \"Session\", \"Presentation\", \"Application\"]\nfor i, layer in enumerate(layers, 1):\n    print(i, layer)",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how the OSI model is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Numbering the layers from the top (Application as layer 1).",
              "Putting TCP at the network layer instead of the transport layer.",
              "Thinking each layer is a separate physical device."
            ],
            "debugging": {
              "prompt": "This program should list the seven OSI layers in order, but it starts at the wrong end. Find the bug.",
              "buggyCode": "layers = [\"Application\", \"Presentation\", \"Session\", \"Transport\", \"Network\", \"Data Link\", \"Physical\"]\nfor i, layer in enumerate(layers, 1):\n    print(i, layer)",
              "fixedCode": "layers = [\"Physical\", \"Data Link\", \"Network\", \"Transport\", \"Session\", \"Presentation\", \"Application\"]\nfor i, layer in enumerate(layers, 1):\n    print(i, layer)",
              "explanation": "The list is reversed: layer 1 is Physical at the bottom and layer 7 is Application at the top."
            },
            "miniChallenge": "Extend the exercise: apply the OSI model to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "The OSI model splits networking into seven layers — physical, data link, network, transport, session, presentation, application — each with one job, so layers can change independently.",
            "quiz": [
              {
                "question": "Which OSI layer routes packets between networks?",
                "options": [
                  "Data Link",
                  "Network",
                  "Transport",
                  "Application"
                ],
                "answer": 1,
                "explanation": "The network layer (layer 3) handles addressing and routing across networks using IP."
              },
              {
                "question": "Which layer does TCP belong to?",
                "options": [
                  "Physical",
                  "Data Link",
                  "Network",
                  "Transport"
                ],
                "answer": 3,
                "explanation": "TCP is a transport-layer protocol: it delivers data reliably to the right application."
              }
            ],
            "exercise": {
              "title": "Name an OSI layer by number",
              "type": "write-code",
              "instructions": "Write a program that reads a layer number from 1 to 7 and prints the layer name: 1 Physical, 2 Data Link, 3 Network, 4 Transport, 5 Session, 6 Presentation, 7 Application.",
              "starterCode": "layers = [\"Physical\", \"Data Link\", \"Network\", \"Transport\", \"Session\", \"Presentation\", \"Application\"]\nn = int(input())\n# print layers[n - 1]\n",
              "solution": "layers = [\"Physical\", \"Data Link\", \"Network\", \"Transport\", \"Session\", \"Presentation\", \"Application\"]\nn = int(input())\nprint(layers[n - 1])",
              "solutionExplanation": "Index the list with n - 1 because layer numbers start at 1 while list indexes start at 0.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Layer 3",
                  "hidden": false,
                  "stdin": "3\n",
                  "expectedStdout": "Network"
                },
                {
                  "name": "Layer 7",
                  "hidden": true,
                  "stdin": "7\n",
                  "expectedStdout": "Application"
                }
              ],
              "hintNotes": {
                "concept": "The OSI layers have a fixed order, so a list holds them and the number picks one out.",
                "approach": "Store the seven names in a list and print the element at index n - 1.",
                "structure": "Structure: define the list, read n, print layers[n - 1]."
              },
              "id": "computer-networks-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "computer-networks-m2",
        "title": "TCP/IP and Addressing",
        "description": "IP addresses, subnetting, and the difference between TCP and UDP.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "computer-networks-m2-l1",
            "slug": "computer-networks-m2-l1",
            "title": "IP Addressing and Subnetting",
            "objectives": [
              "Explain what IP addressing and subnetting means and where it appears in real systems",
              "Apply IP addressing and subnetting to a small realistic problem",
              "Recognise the common mistakes people make with IP addressing and subnetting"
            ],
            "introduction": "Here you will get hands-on with IP addressing and subnetting: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "An IP address identifies a device on a network, and a subnet mask splits that address into a network part and a host part. In 192.168.1.10 with a /24 mask, the first 24 bits (192.168.1) name the network and the last 8 bits name the host, leaving 254 usable host addresses. Two devices can talk directly only if they share a network part; otherwise a router must forward the packet. IPv4's 32-bit space is exhausted, which is why IPv6 uses 128-bit addresses — enough for every grain of sand to have its own network. Subnetting lets one organisation carve a big network into smaller ones for security and traffic control.",
            "syntax": "192.168.1.10/24 -> network 192.168.1.0, hosts 1-254, broadcast 192.168.1.255",
            "analogy": "An IP address is like a street address with a postcode: the network part is the postcode (which neighbourhood), the host part is the house number.",
            "exampleCode": "ip = \"192.168.1.10\"\nnetwork, host = ip.rsplit(\".\", 1)\nprint(\"Network part:\", network)\nprint(\"Host part:\", host)",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where IP addressing and subnetting does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Counting the network and broadcast addresses as usable hosts.",
              "Thinking the subnet mask is part of the IP address itself.",
              "Confusing the number of host bits with the number of hosts."
            ],
            "debugging": {
              "prompt": "This program should print the host part of 192.168.1.10, but it prints the network part. Find the bug.",
              "buggyCode": "ip = \"192.168.1.10\"\nnetwork, host = ip.rsplit(\".\", 1)\nprint(\"Host part:\", network)",
              "fixedCode": "ip = \"192.168.1.10\"\nnetwork, host = ip.rsplit(\".\", 1)\nprint(\"Host part:\", host)",
              "explanation": "rsplit splits off the last octet into host; the program printed network instead of host."
            },
            "miniChallenge": "Extend the exercise: apply IP addressing and subnetting to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "An IP address splits into a network part and a host part by the subnet mask; a /24 network holds 254 usable hosts, and routers forward packets between networks.",
            "quiz": [
              {
                "question": "In 192.168.1.10/24, which part is the host part?",
                "options": [
                  "192",
                  "192.168.1",
                  "10",
                  "192.168"
                ],
                "answer": 2,
                "explanation": "With a /24 mask the last 8 bits are the host part, here 10."
              },
              {
                "question": "How many usable hosts does a /24 network have?",
                "options": [
                  "24",
                  "254",
                  "256",
                  "1024"
                ],
                "answer": 1,
                "explanation": "256 addresses minus the network and broadcast addresses leaves 254 usable hosts."
              }
            ],
            "exercise": {
              "title": "Count usable hosts in a subnet",
              "type": "write-code",
              "instructions": "Write a program that reads the number of host bits and prints exactly: Usable hosts: <n>. Usable hosts = 2**host_bits - 2.",
              "starterCode": "bits = int(input())\n# usable = 2**bits - 2\n",
              "solution": "bits = int(input())\nprint(f\"Usable hosts: {2 ** bits - 2}\")",
              "solutionExplanation": "Raise 2 to the number of host bits, then subtract 2 for the network and broadcast addresses.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "8 host bits",
                  "hidden": false,
                  "stdin": "8\n",
                  "expectedStdout": "Usable hosts: 254"
                },
                {
                  "name": "4 host bits",
                  "hidden": true,
                  "stdin": "4\n",
                  "expectedStdout": "Usable hosts: 14"
                }
              ],
              "hintNotes": {
                "concept": "A subnet reserves two addresses: the network address itself and the broadcast address.",
                "approach": "Compute 2 ** bits - 2 with the ** operator.",
                "structure": "Structure: read bits, then one print with the formula."
              },
              "id": "computer-networks-m2-l1-e1"
            }
          },
          {
            "id": "computer-networks-m2-l2",
            "slug": "computer-networks-m2-l2",
            "title": "TCP vs UDP",
            "objectives": [
              "Explain what TCP and UDP means and where it appears in real systems",
              "Apply TCP and UDP to a small realistic problem",
              "Recognise the common mistakes people make with TCP and UDP"
            ],
            "introduction": "Here you will get hands-on with TCP and UDP: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "TCP and UDP are the two transport protocols, and they make opposite trade-offs. TCP is a reliable, ordered, connection-oriented stream: it handshakes first, numbers every byte, retransmits what is lost, and delivers data in order — which is why the web, email, and file transfers use it. UDP is a bare datagram service: no handshake, no retransmission, no ordering, just a best-effort packet — which is why live video, voice calls, and DNS use it, where a late packet is worse than a lost one. Choosing between them is choosing between reliability and speed: TCP pays overhead for guarantees, UDP pays nothing and guarantees nothing.",
            "syntax": "TCP: reliable, ordered, handshake. UDP: fast, unordered, best-effort.",
            "analogy": "TCP is like registered post with tracking and signatures; UDP is like throwing a postcard into a mailbox and hoping it arrives.",
            "exampleCode": "print(\"TCP: handshake, retransmission, in-order delivery\")\nprint(\"UDP: no handshake, no retransmission, fast\")\nprint(\"Use TCP for files, UDP for live video.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where TCP and UDP does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Assuming UDP is unreliable and therefore useless.",
              "Thinking TCP is always faster because it is more advanced.",
              "Forgetting that TCP's reliability costs extra round trips."
            ],
            "debugging": {
              "prompt": "This program should label TCP as reliable and UDP as fast, but the labels are swapped. Find the bug.",
              "buggyCode": "print(\"TCP: fast, no guarantees\")\nprint(\"UDP: reliable, ordered delivery\")",
              "fixedCode": "print(\"TCP: reliable, ordered delivery\")\nprint(\"UDP: fast, no guarantees\")",
              "explanation": "TCP is the reliable, ordered protocol; UDP is the fast, best-effort one — the labels were reversed."
            },
            "miniChallenge": "Extend the exercise: apply TCP and UDP to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "TCP offers reliable, ordered delivery with a handshake and retransmission; UDP offers fast, best-effort datagrams — choose reliability for files, speed for live media.",
            "quiz": [
              {
                "question": "Why does a video call prefer UDP over TCP?",
                "options": [
                  "UDP is encrypted",
                  "A late retransmitted frame is useless, so speed matters more than reliability",
                  "UDP uses more bandwidth",
                  "TCP cannot carry video"
                ],
                "answer": 1,
                "explanation": "For live media, an old packet arriving late is worthless; UDP's low latency wins over TCP's guarantees."
              },
              {
                "question": "What does TCP's three-way handshake establish?",
                "options": [
                  "The encryption key",
                  "A connection with agreed sequence numbers before any data flows",
                  "The IP address",
                  "The file size"
                ],
                "answer": 1,
                "explanation": "The SYN, SYN-ACK, ACK exchange sets up the connection and synchronises sequence numbers."
              }
            ],
            "exercise": {
              "title": "Choose TCP or UDP",
              "type": "write-code",
              "instructions": "Write a program that reads a use case (video, file, dns, or voice) and prints TCP for file, UDP for video, dns, or voice.",
              "starterCode": "use = input().strip()\n# file -> TCP, anything else -> UDP\n",
              "solution": "use = input().strip()\nprint(\"TCP\" if use == \"file\" else \"UDP\")",
              "solutionExplanation": "File transfer needs TCP's reliability; the other three cases favour UDP's speed.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "File transfer",
                  "hidden": false,
                  "stdin": "file\n",
                  "expectedStdout": "TCP"
                },
                {
                  "name": "Video call",
                  "hidden": true,
                  "stdin": "video\n",
                  "expectedStdout": "UDP"
                }
              ],
              "hintNotes": {
                "concept": "Ask what the application needs: guaranteed delivery, or the lowest possible delay?",
                "approach": "Use a conditional expression: TCP only for 'file', UDP otherwise.",
                "structure": "Structure: read the use case, then one print with the conditional."
              },
              "id": "computer-networks-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "computer-networks-m3",
        "title": "Sockets in Python",
        "description": "Writing real network programs with Python sockets.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "computer-networks-m3-l1",
            "slug": "computer-networks-m3-l1",
            "title": "Building a TCP Client",
            "objectives": [
              "Explain what building a TCP client means and where it appears in real systems",
              "Apply building a TCP client to a small realistic problem",
              "Recognise the common mistakes people make with building a TCP client"
            ],
            "introduction": "In this lesson you will see building a TCP client in action, work through a guided example, and practise it yourself.",
            "concept": "A TCP client is the simplest real network program: create a socket, connect it to a server's address and port, send bytes, and read the reply. In Python the socket module gives you socket(), connect((host, port)), sendall(), and recv(), and the crucial detail is that data travels as bytes, not strings — so you encode text before sending and decode it after receiving. A recv() call returns whatever has arrived so far, which may be less than you asked for, so real clients loop until they have the full message or the connection closes. The client in this lesson talks to a server on the same machine (localhost), which is how every network program is first tested.",
            "syntax": "socket.socket() -> connect((host, port)) -> sendall(bytes) -> recv(4096)",
            "analogy": "A TCP client is like phoning a restaurant: you dial (connect), speak your order (send), and listen for the reply (recv) — and you must speak the same language (bytes).",
            "exampleCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nprint(\"Socket created. Use connect((host, port)) to dial the server.\")\ns.close()",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how building a TCP client is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Passing a str to sendall instead of bytes.",
              "Assuming one recv returns the whole message.",
              "Forgetting to close the socket when done."
            ],
            "debugging": {
              "prompt": "This client should send a greeting as bytes, but it crashes. Find the bug.",
              "buggyCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.sendall(\"hello\")",
              "fixedCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.sendall(b\"hello\")",
              "explanation": "sendall needs bytes, not a str — use a bytes literal b\"hello\" or encode the string."
            },
            "miniChallenge": "Extend the exercise: apply building a TCP client to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A TCP client creates a socket, connects to host and port, sends encoded bytes, and loops on recv until the reply is complete.",
            "quiz": [
              {
                "question": "Why must socket data be bytes, not str?",
                "options": [
                  "Strings are too slow",
                  "Networks move bytes; text must be encoded before sending and decoded after receiving",
                  "Sockets only accept numbers",
                  "Python strings cannot leave the process"
                ],
                "answer": 1,
                "explanation": "The wire carries bytes, so str must be encoded (e.g. UTF-8) to send and decoded to read back."
              },
              {
                "question": "What can recv(4096) return?",
                "options": [
                  "Always exactly 4096 bytes",
                  "Up to 4096 bytes — possibly fewer, so you loop until the message is complete",
                  "Only one byte",
                  "The server's IP address"
                ],
                "answer": 1,
                "explanation": "recv returns whatever has arrived so far, which may be a partial message."
              }
            ],
            "exercise": {
              "title": "Encode a message for a socket",
              "type": "write-code",
              "instructions": "Write a program that reads a message and prints exactly: Bytes to send: <n> bytes. The message is encoded as UTF-8; count its bytes with len(message.encode()).",
              "starterCode": "msg = input()\n# print the byte count\n",
              "solution": "msg = input()\nprint(f\"Bytes to send: {len(msg.encode())} bytes\")",
              "solutionExplanation": "Encode the message to UTF-8 bytes and count them with len(); the byte count can exceed the character count for non-ASCII text.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "hello",
                  "hidden": false,
                  "stdin": "hello\n",
                  "expectedStdout": "Bytes to send: 5 bytes"
                },
                {
                  "name": "hello world",
                  "hidden": true,
                  "stdin": "hello world\n",
                  "expectedStdout": "Bytes to send: 11 bytes"
                }
              ],
              "hintNotes": {
                "concept": "Sockets send bytes, so the first step is always to encode the text.",
                "approach": "Use len(msg.encode()) to count UTF-8 bytes, not len(msg) characters.",
                "structure": "Structure: read the message, then one print with the encoded length."
              },
              "id": "computer-networks-m3-l1-e1"
            }
          },
          {
            "id": "computer-networks-m3-l2",
            "slug": "computer-networks-m3-l2",
            "title": "Building a TCP Server",
            "objectives": [
              "Explain what building a TCP server means and where it appears in real systems",
              "Apply building a TCP server to a small realistic problem",
              "Recognise the common mistakes people make with building a TCP server"
            ],
            "introduction": "Here you will get hands-on with building a TCP server: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A TCP server does the opposite job of a client: it binds a socket to an address and port, listens for incoming connections, and accepts them one at a time. The accept() call blocks until a client connects and returns a brand-new socket just for that client, so the listening socket stays free to accept the next one. A server that handles one client at a time is fine for learning, but real servers hand each connection to a thread or use non-blocking I/O so one slow client cannot freeze everyone else. Binding to port 0 lets the OS pick a free port; binding to a port below 1024 usually needs administrator rights.",
            "syntax": "socket.socket() -> bind((host, port)) -> listen() -> accept() -> new socket per client",
            "analogy": "A TCP server is like a shop counter: the listening socket is the open door, and each accept() is a new customer getting their own till.",
            "exampleCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind((\"127.0.0.1\", 0))\nprint(\"Server bound to port\", s.getsockname()[1])\ns.close()",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where building a TCP server does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Closing the listening socket after the first accept.",
              "Binding to a port that is already in use and not handling the error.",
              "Assuming accept returns the message instead of a socket."
            ],
            "debugging": {
              "prompt": "This server should print the port it bound to, but it prints the wrong tuple element. Find the bug.",
              "buggyCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind((\"127.0.0.1\", 0))\nprint(\"Server bound to port\", s.getsockname()[0])\ns.close()",
              "fixedCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind((\"127.0.0.1\", 0))\nprint(\"Server bound to port\", s.getsockname()[1])\ns.close()",
              "explanation": "getsockname returns (host, port), so the port is element [1], not [0]."
            },
            "miniChallenge": "Extend the exercise: apply building a TCP server to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A TCP server binds, listens, and accepts: each accept returns a new socket for one client while the listening socket keeps accepting more.",
            "quiz": [
              {
                "question": "What does accept() return?",
                "options": [
                  "The server's IP address",
                  "A new socket dedicated to that client, plus the client's address",
                  "The next message",
                  "Nothing — it only wakes the server"
                ],
                "answer": 1,
                "explanation": "accept returns a fresh connected socket for the client and the client's address, while the listening socket keeps listening."
              },
              {
                "question": "Why does a real server use threads or non-blocking I/O?",
                "options": [
                  "To use less memory",
                  "So one slow client cannot block all the others",
                  "To encrypt traffic",
                  "To bind more ports"
                ],
                "answer": 1,
                "explanation": "Handling one client at a time in a loop means a slow client stalls everyone; threads or async I/O fix that."
              }
            ],
            "exercise": {
              "title": "Pick the next free port",
              "type": "write-code",
              "instructions": "Write a program that reads a starting port and prints exactly: Next port: <n>. The next free port is simply start + 1 (a real server would try binding until one works).",
              "starterCode": "start = int(input())\n# print start + 1\n",
              "solution": "start = int(input())\nprint(f\"Next port: {start + 1}\")",
              "solutionExplanation": "Add one to the starting port to get the next candidate port.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Start 8000",
                  "hidden": false,
                  "stdin": "8000\n",
                  "expectedStdout": "Next port: 8001"
                },
                {
                  "name": "Start 443",
                  "hidden": true,
                  "stdin": "443\n",
                  "expectedStdout": "Next port: 444"
                }
              ],
              "hintNotes": {
                "concept": "Port numbers are just integers, so the next candidate is one more than the last tried.",
                "approach": "Add 1 to the input and print it with the label.",
                "structure": "Structure: read the port, then one print with start + 1."
              },
              "id": "computer-networks-m3-l2-e1"
            }
          },
          {
            "id": "computer-networks-m3-l3",
            "slug": "computer-networks-m3-l3",
            "title": "UDP and Datagrams",
            "objectives": [
              "Explain what UDP datagrams means and where it appears in real systems",
              "Apply UDP datagrams to a small realistic problem",
              "Recognise the common mistakes people make with UDP datagrams"
            ],
            "introduction": "This lesson introduces UDP datagrams. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "UDP has no connections, so a UDP program never calls connect or accept: it sends a datagram to an address with sendto(data, (host, port)) and receives one with recvfrom(), which returns both the data and the sender's address. Each datagram is independent — it may arrive, arrive out of order, or never arrive — and there is a size limit: a datagram larger than the network's MTU gets fragmented or dropped. DNS is the classic UDP application: one small question, one small answer, and if the answer never comes the client simply asks again. That retry logic lives in the application, because UDP itself provides none.",
            "syntax": "sendto(data, (host, port)) and recvfrom() -> (data, sender address)",
            "analogy": "UDP is like sending postcards: each one is independent, some may never arrive, and the sender's address on the back tells you who to reply to.",
            "exampleCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\nprint(\"UDP socket ready. Use sendto() with an address each time.\")\ns.close()",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem UDP datagrams solves in plain words.",
              "Follow the example step by step and note where UDP datagrams changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Using send() on a UDP socket that was never connected.",
              "Assuming datagrams arrive in the order they were sent.",
              "Sending a datagram larger than the MTU and expecting it to arrive whole."
            ],
            "debugging": {
              "prompt": "This UDP code should send a datagram to the DNS server, but it crashes. Find the bug.",
              "buggyCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\ns.send(b\"query\")",
              "fixedCode": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\ns.sendto(b\"query\", (\"8.8.8.8\", 53))",
              "explanation": "UDP has no connection, so send() has nowhere to go — sendto() must name the destination address and port."
            },
            "miniChallenge": "Extend the exercise: apply UDP datagrams to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "UDP programs use sendto and recvfrom with an explicit address per datagram; each datagram is independent and may be lost, so applications retry when needed.",
            "quiz": [
              {
                "question": "How does a UDP server know where to reply?",
                "options": [
                  "It asks the client first",
                  "recvfrom returns the sender's address along with the data",
                  "It guesses from the port",
                  "UDP replies are broadcast"
                ],
                "answer": 1,
                "explanation": "recvfrom returns (data, address), so the server can sendto that address to reply."
              },
              {
                "question": "Why is DNS a good fit for UDP?",
                "options": [
                  "DNS answers are tiny and a lost query can simply be retried",
                  "DNS needs ordered delivery",
                  "DNS packets are huge",
                  "DNS never fails"
                ],
                "answer": 0,
                "explanation": "A DNS query and answer are small and idempotent, so retrying a lost datagram is cheap and safe."
              }
            ],
            "exercise": {
              "title": "Build a tiny DNS-style query",
              "type": "write-code",
              "instructions": "Write a program that reads a hostname and prints exactly: Query for <host> (UDP, 53). DNS uses UDP port 53.",
              "starterCode": "host = input().strip()\n# print the query line\n",
              "solution": "host = input().strip()\nprint(f\"Query for {host} (UDP, 53)\")",
              "solutionExplanation": "Format the hostname into the fixed query line with the UDP port 53 label.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "example.com",
                  "hidden": false,
                  "stdin": "example.com\n",
                  "expectedStdout": "Query for example.com (UDP, 53)"
                },
                {
                  "name": "localhost",
                  "hidden": true,
                  "stdin": "localhost\n",
                  "expectedStdout": "Query for localhost (UDP, 53)"
                }
              ],
              "hintNotes": {
                "concept": "A DNS query is a small datagram asking for one hostname, sent to port 53.",
                "approach": "Use an f-string to put the hostname into the fixed sentence.",
                "structure": "Structure: read the host, strip whitespace, then one print."
              },
              "id": "computer-networks-m3-l3-e1"
            }
          }
        ]
      },
      {
        "id": "computer-networks-m4",
        "title": "Application Protocols",
        "description": "HTTP, DNS, and TLS — the protocols users actually meet.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "computer-networks-m4-l1",
            "slug": "computer-networks-m4-l1",
            "title": "HTTP and DNS",
            "objectives": [
              "Explain what HTTP and DNS means and where it appears in real systems",
              "Apply HTTP and DNS to a small realistic problem",
              "Recognise the common mistakes people make with HTTP and DNS"
            ],
            "introduction": "Here you will get hands-on with HTTP and DNS: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "HTTP is the application protocol of the web: a client sends a request line (method, path, version), headers, and an optional body, and the server answers with a status line, headers, and a body. DNS is the lookup service that turns the hostname in a URL into an IP address, usually over UDP port 53, through a chain of resolvers and authoritative servers. Together they explain a page load: DNS resolves the name, TCP connects to the address, HTTP requests the page, and the browser renders the response. Status codes are grouped by hundreds: 2xx success, 3xx redirect, 4xx client error, 5xx server error.",
            "syntax": "URL -> DNS lookup -> TCP connect -> HTTP request -> status + body",
            "analogy": "HTTP is like ordering from a menu (the request) and getting a dish plus a receipt (the response); DNS is the phone book that turns the restaurant's name into its address.",
            "exampleCode": "print(\"GET /index.html HTTP/1.1\")\nprint(\"Host: example.com\")\nprint(\"Status 200 means the request succeeded.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where HTTP and DNS does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Thinking DNS resolves IP addresses back to names by default.",
              "Treating a 404 as a server failure instead of a missing resource.",
              "Forgetting that HTTP itself is stateless — cookies and tokens add state."
            ],
            "debugging": {
              "prompt": "This code should print a valid HTTP request line, but the method and path are swapped. Find the bug.",
              "buggyCode": "print(\"/index.html GET HTTP/1.1\")",
              "fixedCode": "print(\"GET /index.html HTTP/1.1\")",
              "explanation": "An HTTP request line is METHOD, then PATH, then VERSION — GET comes first."
            },
            "miniChallenge": "Extend the exercise: apply HTTP and DNS to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "DNS turns hostnames into IP addresses; HTTP then exchanges a request (method, path, headers) for a response (status, headers, body), with status codes grouped by hundreds.",
            "quiz": [
              {
                "question": "What does DNS do?",
                "options": [
                  "Encrypts web traffic",
                  "Translates a hostname into an IP address",
                  "Compresses images",
                  "Stores passwords"
                ],
                "answer": 1,
                "explanation": "DNS resolves names like example.com to IP addresses so TCP can connect."
              },
              {
                "question": "What does a 404 status code mean?",
                "options": [
                  "The server is down",
                  "The requested resource was not found",
                  "The request succeeded",
                  "You must log in"
                ],
                "answer": 1,
                "explanation": "404 is a client-error status: the server understood the request but has no such resource."
              }
            ],
            "exercise": {
              "title": "Classify an HTTP status code",
              "type": "write-code",
              "instructions": "Write a program that reads an HTTP status code and prints Success for 2xx, Redirect for 3xx, Client error for 4xx, Server error for 5xx, or Unknown otherwise.",
              "starterCode": "code = int(input())\n# classify by hundreds digit\n",
              "solution": "code = int(input())\nif 200 <= code < 300:\n    print(\"Success\")\nelif 300 <= code < 400:\n    print(\"Redirect\")\nelif 400 <= code < 500:\n    print(\"Client error\")\nelif 500 <= code < 600:\n    print(\"Server error\")\nelse:\n    print(\"Unknown\")",
              "solutionExplanation": "Check which hundred-range the code falls in with chained comparisons, printing the matching class.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "200",
                  "hidden": false,
                  "stdin": "200\n",
                  "expectedStdout": "Success"
                },
                {
                  "name": "404",
                  "hidden": true,
                  "stdin": "404\n",
                  "expectedStdout": "Client error"
                }
              ],
              "hintNotes": {
                "concept": "Status codes are grouped by their first digit: 2 success, 3 redirect, 4 client error, 5 server error.",
                "approach": "Use if/elif ranges like 200 <= code < 300 to pick the class.",
                "structure": "Structure: read the code, then a chain of range checks, each printing one word."
              },
              "id": "computer-networks-m4-l1-e1"
            }
          },
          {
            "id": "computer-networks-m4-l2",
            "slug": "computer-networks-m4-l2",
            "title": "TLS and Secure Communication",
            "objectives": [
              "Explain what TLS and secure communication means and where it appears in real systems",
              "Apply TLS and secure communication to a small realistic problem",
              "Recognise the common mistakes people make with TLS and secure communication"
            ],
            "introduction": "In this lesson you will see TLS and secure communication in action, work through a guided example, and practise it yourself.",
            "concept": "TLS is what turns HTTP into HTTPS: it encrypts the connection, authenticates the server, and guarantees the data was not tampered with in transit. The handshake starts with the client and server agreeing on a cipher, then the server presents a certificate proving it owns the domain, signed by a certificate authority the browser trusts. They then agree on a session key — using public-key cryptography for the exchange — and switch to fast symmetric encryption for the rest of the session. TLS protects data in transit, but it does not make a site honest: a phishing site can have a perfectly valid certificate for its own (misleading) domain.",
            "syntax": "handshake -> certificate check -> session key -> symmetric encryption",
            "analogy": "TLS is like a sealed envelope with a wax stamp: the seal proves who sent it and that nobody opened it on the way, but it says nothing about whether the letter itself is honest.",
            "exampleCode": "print(\"TLS: handshake, certificate, session key, encryption\")\nprint(\"https means HTTP over TLS.\")\nprint(\"A valid certificate proves domain ownership, not honesty.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how TLS and secure communication is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Thinking the padlock icon means a website is safe or honest.",
              "Confusing encryption (secrecy) with authentication (identity).",
              "Assuming TLS encrypts data stored on the server."
            ],
            "debugging": {
              "prompt": "This code lists the TLS handshake steps in the wrong order. Find the bug.",
              "buggyCode": "steps = [\"encrypt data\", \"verify certificate\", \"agree cipher\", \"agree session key\"]\nprint(\" -> \".join(steps))",
              "fixedCode": "steps = [\"agree cipher\", \"verify certificate\", \"agree session key\", \"encrypt data\"]\nprint(\" -> \".join(steps))",
              "explanation": "The handshake must agree a cipher and verify the certificate before exchanging a session key; encryption only starts after the key is agreed."
            },
            "miniChallenge": "Extend the exercise: apply TLS and secure communication to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "TLS encrypts traffic, authenticates the server's domain via certificates, and detects tampering — but a valid certificate never proves a site is honest.",
            "quiz": [
              {
                "question": "What does a TLS certificate prove?",
                "options": [
                  "That the site is honest",
                  "That the server owns the domain, as vouched for by a trusted authority",
                  "That the site is fast",
                  "That the password is strong"
                ],
                "answer": 1,
                "explanation": "A certificate binds a public key to a domain name, signed by a CA — it proves ownership, not trustworthiness."
              },
              {
                "question": "Why does TLS switch to symmetric encryption after the handshake?",
                "options": [
                  "Symmetric encryption is much faster for bulk data",
                  "Public-key encryption is banned",
                  "Symmetric keys are longer",
                  "The handshake deletes the keys"
                ],
                "answer": 0,
                "explanation": "Public-key crypto sets up the session key; symmetric crypto then encrypts the bulk traffic efficiently."
              }
            ],
            "exercise": {
              "title": "Spot the TLS misconception",
              "type": "multiple-choice",
              "instructions": "Which statement about TLS is FALSE?",
              "starterCode": "",
              "solution": "A phishing site can have a valid TLS certificate",
              "solutionExplanation": "TLS encrypts data in transit and authenticates the server's domain. A padlock does not mean a site is honest — a phishing site can hold a valid certificate for its own domain. The false claim is that a padlock guarantees trustworthiness.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "A padlock proves the connection is encrypted and the domain is authenticated — nothing more.",
                "approach": "Look for the option that over-claims what TLS guarantees.",
                "structure": "Structure: TLS guarantees encryption, integrity, and domain authentication — not honesty."
              },
              "options": [
                "TLS encrypts data in transit",
                "A padlock means a site is completely trustworthy",
                "TLS uses a certificate to authenticate the server",
                "TLS protects data from tampering in transit"
              ],
              "answerIndex": 1,
              "id": "computer-networks-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "computer-networks-m5",
        "title": "Network Tools and Troubleshooting",
        "description": "Diagnosing networks like an engineer: ping, traceroute, and firewalls.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "computer-networks-m5-l1",
            "slug": "computer-networks-m5-l1",
            "title": "Ping, Traceroute and Diagnostics",
            "objectives": [
              "Explain what network diagnostics means and where it appears in real systems",
              "Apply network diagnostics to a small realistic problem",
              "Recognise the common mistakes people make with network diagnostics"
            ],
            "introduction": "Here you will get hands-on with network diagnostics: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "When a network breaks, engineers reach for the same small tools: ping sends ICMP echo requests and reports round-trip time and packet loss, telling you whether a host is reachable at all. Traceroute sends packets with increasing TTL values so each router on the path reveals itself when the packet expires, mapping every hop between you and the destination. DNS lookup tools check whether a name resolves, and a quick check of the local interface and default gateway separates 'my machine is broken' from 'the network is broken'. The discipline is to test layer by layer, bottom-up: link, then IP, then DNS, then the application.",
            "syntax": "ping: reachable? traceroute: which hop fails? dig: does the name resolve?",
            "analogy": "Network diagnosis is like tracing a parcel: ping asks 'did it arrive?', traceroute shows every depot it passed through, and the first depot that never answers is where it got stuck.",
            "exampleCode": "print(\"ping: ICMP echo, measures RTT and loss\")\nprint(\"traceroute: TTL trick reveals each hop\")\nprint(\"Diagnose bottom-up: link, IP, DNS, app.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where network diagnostics does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Reading a traceroute timeout as proof the destination is down.",
              "Testing the application before checking the link and DNS.",
              "Assuming 0% loss to one host means the whole network is healthy."
            ],
            "debugging": {
              "prompt": "This diagnostic should report packet loss as a percentage, but it computes it backwards. Find the bug.",
              "buggyCode": "sent = 10\nreceived = 8\nloss = received / sent * 100\nprint(\"Loss:\", loss, \"%\")",
              "fixedCode": "sent = 10\nreceived = 8\nloss = (sent - received) / sent * 100\nprint(\"Loss:\", loss, \"%\")",
              "explanation": "Loss is the fraction that did NOT arrive: (sent - received) / sent, not received / sent."
            },
            "miniChallenge": "Extend the exercise: apply network diagnostics to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Diagnose bottom-up: ping checks reachability and loss, traceroute maps each hop, and DNS checks isolate naming problems from connectivity problems.",
            "quiz": [
              {
                "question": "What does a traceroute timeout at hop 5 mean?",
                "options": [
                  "The destination is down",
                  "Hop 5 (or its replies) is not responding — the path fails around there",
                  "Your computer is offline",
                  "DNS is broken"
                ],
                "answer": 1,
                "explanation": "A timeout at a hop means packets stop getting a reply there; the problem is at or just after that hop."
              },
              {
                "question": "What is the first step in bottom-up network diagnosis?",
                "options": [
                  "Reinstall the browser",
                  "Check the local link and IP configuration",
                  "Call the ISP",
                  "Restart the server"
                ],
                "answer": 1,
                "explanation": "Start at the bottom: is the local link up and does the machine have an IP and gateway?"
              }
            ],
            "exercise": {
              "title": "Compute packet loss",
              "type": "write-code",
              "instructions": "Write a program that reads packets sent and packets received and prints exactly: Packet loss: <n>% with one decimal place.",
              "starterCode": "sent = int(input())\nreceived = int(input())\n# loss = (sent - received) / sent * 100\n",
              "solution": "sent = int(input())\nreceived = int(input())\nprint(f\"Packet loss: {(sent - received) / sent * 100:.1f}%\")",
              "solutionExplanation": "Subtract received from sent, divide by sent, multiply by 100, and format with one decimal place.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "10 sent, 8 received",
                  "hidden": false,
                  "stdin": "10\n8\n",
                  "expectedStdout": "Packet loss: 20.0%"
                },
                {
                  "name": "20 sent, 19 received",
                  "hidden": true,
                  "stdin": "20\n19\n",
                  "expectedStdout": "Packet loss: 5.0%"
                }
              ],
              "hintNotes": {
                "concept": "Packet loss is the share of sent packets that never arrived.",
                "approach": "Compute (sent - received) / sent * 100 and format with :.1f.",
                "structure": "Structure: read two numbers, then one print with the percentage."
              },
              "id": "computer-networks-m5-l1-e1"
            }
          },
          {
            "id": "computer-networks-m5-l2",
            "slug": "computer-networks-m5-l2",
            "title": "Firewalls and NAT",
            "objectives": [
              "Explain what firewalls and NAT means and where it appears in real systems",
              "Apply firewalls and NAT to a small realistic problem",
              "Recognise the common mistakes people make with firewalls and NAT"
            ],
            "introduction": "In this lesson you will see firewalls and NAT in action, work through a guided example, and practise it yourself.",
            "concept": "A firewall is a filter on network traffic: rules decide which packets may pass based on source, destination, port, and protocol, and the default is usually to deny everything not explicitly allowed. NAT (network address translation) lets many private devices share one public IP address: the home router rewrites the source address and port of outgoing packets and remembers the mapping so replies find their way back. That is why devices on a home network have private addresses like 192.168.1.x — they are not reachable from the internet directly, which is both a limitation and a layer of protection. Port forwarding is the deliberate exception: a NAT rule that sends traffic on one public port to a specific private device.",
            "syntax": "firewall: allow/deny by rule; NAT: many private addresses, one public address",
            "analogy": "A firewall is like a bouncer with a guest list; NAT is like a company switchboard where many extensions share one public phone number.",
            "exampleCode": "print(\"Firewall: default deny, allow by rule\")\nprint(\"NAT: private 192.168.1.x -> one public IP\")\nprint(\"Port forwarding: one public port -> one private device.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how firewalls and NAT is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Thinking NAT is a security feature rather than an address-sharing trick.",
              "Assuming a firewall rule that allows a port also encrypts its traffic.",
              "Forgetting that private addresses are not reachable from the internet."
            ],
            "debugging": {
              "prompt": "This firewall check should block port 23, but it prints ALLOW. Find the bug.",
              "buggyCode": "allowed = {80, 443, 23}\nport = 23\nprint(\"ALLOW\" if port in allowed else \"DENY\")",
              "fixedCode": "allowed = {80, 443}\nport = 23\nprint(\"ALLOW\" if port in allowed else \"DENY\")",
              "explanation": "Port 23 (Telnet) was wrongly added to the allowed set; removing it makes the check print DENY."
            },
            "miniChallenge": "Extend the exercise: apply firewalls and NAT to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Firewalls filter traffic by rule with a default-deny stance; NAT shares one public IP among many private devices, and port forwarding deliberately exposes one internal service.",
            "quiz": [
              {
                "question": "Why do home devices use private addresses like 192.168.1.x?",
                "options": [
                  "They are faster",
                  "NAT lets many devices share one public IP, and private addresses are not routable on the internet",
                  "Private addresses are encrypted",
                  "The ISP requires it"
                ],
                "answer": 1,
                "explanation": "Private ranges are for internal use; the router's NAT maps them to the single public address."
              },
              {
                "question": "What is port forwarding?",
                "options": [
                  "Blocking a port",
                  "A NAT rule sending traffic on a public port to a specific private device",
                  "Opening every port",
                  "Encrypting a port"
                ],
                "answer": 1,
                "explanation": "Port forwarding maps one public port to one internal host so an outside service can reach it."
              }
            ],
            "exercise": {
              "title": "Check a port against firewall rules",
              "type": "write-code",
              "instructions": "Write a program that reads a port number and prints ALLOW if it is 80 or 443, otherwise DENY.",
              "starterCode": "port = int(input())\n# allow 80 and 443 only\n",
              "solution": "port = int(input())\nprint(\"ALLOW\" if port in {80, 443} else \"DENY\")",
              "solutionExplanation": "Test membership in the allowed set {80, 443} and print ALLOW or DENY accordingly.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Port 443",
                  "hidden": false,
                  "stdin": "443\n",
                  "expectedStdout": "ALLOW"
                },
                {
                  "name": "Port 23",
                  "hidden": true,
                  "stdin": "23\n",
                  "expectedStdout": "DENY"
                }
              ],
              "hintNotes": {
                "concept": "A firewall rule is a set of allowed ports; anything not in the set is denied.",
                "approach": "Use `in` with the set {80, 443} and a conditional expression.",
                "structure": "Structure: read the port, then one print choosing ALLOW or DENY."
              },
              "id": "computer-networks-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "system-design",
    "slug": "system-design",
    "language": "python",
    "category": "cs-career",
    "title": "System Design",
    "description": "Design systems that scale: capacity estimation, load balancing, caching, databases, queues, consistency, and the trade-offs behind real architectures.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Capacity estimation",
      "Load balancing",
      "Caching",
      "Sharding",
      "Replication",
      "Consistency models",
      "Message queues",
      "Rate limiting"
    ],
    "prerequisites": [
      "Basic Python programming",
      "Familiarity with web applications"
    ],
    "modules": [
      {
        "id": "system-design-m1",
        "title": "Design Foundations",
        "description": "What system design is and how to estimate capacity.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "system-design-m1-l1",
            "slug": "system-design-m1-l1",
            "title": "What Is System Design",
            "objectives": [
              "Explain what system design means and where it appears in real systems",
              "Apply system design to a small realistic problem",
              "Recognise the common mistakes people make with system design"
            ],
            "introduction": "This lesson introduces system design. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "System design is the practice of turning product requirements into an architecture: choosing components, drawing the boundaries between them, and deciding how they talk to each other. A good design starts from what the system must do — functional requirements like 'users can post photos' — and what it must be like — non-functional requirements like '99.9% available' and 'under 200 ms latency'. Engineers then sketch the pieces (load balancers, app servers, databases, caches, queues) and the flows between them, and argue about trade-offs before writing code. The skill is not memorising diagrams; it is reasoning about what breaks first as load grows.",
            "syntax": "requirements -> components -> flows -> trade-offs -> bottlenecks",
            "analogy": "System design is like planning a city: you decide where the roads, power stations, and hospitals go before anyone lays a brick, because moving them later is ruinously expensive.",
            "exampleCode": "print(\"Functional: what the system does\")\nprint(\"Non-functional: how well it does it\")\nprint(\"Design = components + flows + trade-offs\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem system design solves in plain words.",
              "Follow the example step by step and note where system design changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Starting with a database choice before understanding the requirements.",
              "Treating a design diagram as the goal instead of the reasoning behind it.",
              "Ignoring non-functional requirements until the system is built."
            ],
            "debugging": {
              "prompt": "This design note lists a requirement in the wrong category. Which one is misplaced?",
              "buggyCode": "functional = [\"users can post photos\"]\nnon_functional = [\"p99 latency under 200ms\", \"users can delete photos\"]",
              "fixedCode": "functional = [\"users can post photos\", \"users can delete photos\"]\nnon_functional = [\"p99 latency under 200ms\"]",
              "explanation": "'Users can delete photos' is a feature — a functional requirement — not a quality like latency."
            },
            "miniChallenge": "Extend the exercise: apply system design to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "System design turns requirements into an architecture of components and flows; functional requirements say what it does, non-functional ones say how well, and trade-offs are the real work.",
            "quiz": [
              {
                "question": "What is a non-functional requirement?",
                "options": [
                  "A feature users click",
                  "A quality the system must have, like availability or latency",
                  "A database table",
                  "A programming language"
                ],
                "answer": 1,
                "explanation": "Non-functional requirements describe qualities — availability, latency, scalability — rather than features."
              },
              {
                "question": "What should a design discussion focus on first?",
                "options": [
                  "The exact code",
                  "Requirements, then components and their trade-offs",
                  "The logo",
                  "The cheapest server"
                ],
                "answer": 1,
                "explanation": "Start from requirements, choose components to meet them, and argue the trade-offs."
              }
            ],
            "exercise": {
              "title": "Sort the requirement",
              "type": "multiple-choice",
              "instructions": "Which of these is a non-functional requirement?",
              "starterCode": "",
              "solution": "The system must stay available 99.9% of the time",
              "solutionExplanation": "Non-functional requirements are qualities (availability, latency, scale), not features. 'Users can upload photos' is a feature; 99.9% availability is a quality the system must have.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Ask: is this something the system does, or how well it does it?",
                "approach": "Look for the option phrased as a quality or a number, not a feature.",
                "structure": "Structure: features are functional; qualities like availability and latency are non-functional."
              },
              "options": [
                "Users can upload photos",
                "Users can follow other users",
                "The system must stay available 99.9% of the time",
                "Users can comment on posts"
              ],
              "answerIndex": 2,
              "id": "system-design-m1-l1-e1"
            }
          },
          {
            "id": "system-design-m1-l2",
            "slug": "system-design-m1-l2",
            "title": "Requirements and Capacity Estimation",
            "objectives": [
              "Explain what capacity estimation means and where it appears in real systems",
              "Apply capacity estimation to a small realistic problem",
              "Recognise the common mistakes people make with capacity estimation"
            ],
            "introduction": "In this lesson you will see capacity estimation in action, work through a guided example, and practise it yourself.",
            "concept": "Capacity estimation turns vague scale ('lots of users') into numbers you can design against, using simple arithmetic and explicit assumptions. Start with daily active users, multiply by actions per user per day, and divide by seconds in a day to get requests per second; then multiply by the peak factor (often 2-3x the average) because traffic is never flat. Storage follows the same pattern: new items per day times average size times retention days. The numbers do not need to be exact — they need to be explicit, so anyone can challenge the assumptions and see where the design breaks.",
            "syntax": "QPS = DAU x actions per user / 86400; peak QPS = average x peak factor",
            "analogy": "Capacity estimation is like catering a wedding: guests times portions per guest gives the total, and you add a margin because everyone eats at once, not evenly through the day.",
            "exampleCode": "dau = 1_000_000\nactions = 5\nqps = dau * actions / 86400\nprint(f\"Average QPS: {qps:.1f}\")\nprint(f\"Peak QPS: {qps * 3:.1f}\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how capacity estimation is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Designing for the average load and ignoring the peak.",
              "Hiding assumptions instead of stating them so they can be challenged.",
              "Estimating storage without a retention period."
            ],
            "debugging": {
              "prompt": "This estimate divides by the wrong number of seconds. Find the bug.",
              "buggyCode": "dau = 1_000_000\nactions = 5\nqps = dau * actions / 3600\nprint(f\"Average QPS: {qps:.1f}\")",
              "fixedCode": "dau = 1_000_000\nactions = 5\nqps = dau * actions / 86400\nprint(f\"Average QPS: {qps:.1f}\")",
              "explanation": "A day has 86400 seconds, not 3600 (one hour); dividing by 3600 inflates the QPS by 24x."
            },
            "miniChallenge": "Extend the exercise: apply capacity estimation to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Capacity estimation converts daily totals into per-second rates with explicit assumptions, then applies a peak factor — the numbers exist so they can be challenged.",
            "quiz": [
              {
                "question": "Why do you multiply average QPS by a peak factor?",
                "options": [
                  "To make the numbers look bigger",
                  "Traffic is uneven, so the system must survive the busiest hour, not the average",
                  "Servers are slower at night",
                  "The formula requires it"
                ],
                "answer": 1,
                "explanation": "Peak traffic can be several times the average; designing for the average guarantees an outage at peak."
              },
              {
                "question": "How many seconds are in a day, and why does it matter here?",
                "options": [
                  "3600 — one hour",
                  "86400 — converting daily totals into per-second rates",
                  "1000 — a round number",
                  "60 — one minute"
                ],
                "answer": 1,
                "explanation": "Dividing a daily total by 86400 seconds converts it into a per-second rate like QPS."
              }
            ],
            "exercise": {
              "title": "Estimate average QPS",
              "type": "write-code",
              "instructions": "Write a program that reads daily active users and actions per user per day, then prints exactly: Average QPS: <n> with one decimal place. QPS = dau * actions / 86400.",
              "starterCode": "dau = int(input())\nactions = int(input())\n# qps = dau * actions / 86400\n",
              "solution": "dau = int(input())\nactions = int(input())\nprint(f\"Average QPS: {dau * actions / 86400:.1f}\")",
              "solutionExplanation": "Multiply users by actions per user, divide by 86400 seconds, and format with one decimal place.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "1M users, 5 actions",
                  "hidden": false,
                  "stdin": "1000000\n5\n",
                  "expectedStdout": "Average QPS: 57.9"
                },
                {
                  "name": "86400 users, 1 action",
                  "hidden": true,
                  "stdin": "86400\n1\n",
                  "expectedStdout": "Average QPS: 1.0"
                }
              ],
              "hintNotes": {
                "concept": "QPS means requests per second, so a daily total must be divided by the seconds in a day.",
                "approach": "Compute dau * actions / 86400 and format with :.1f.",
                "structure": "Structure: read two numbers, then one print with the formula."
              },
              "id": "system-design-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "system-design-m2",
        "title": "Scaling",
        "description": "Load balancing and caching: the two levers that make systems scale.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "system-design-m2-l1",
            "slug": "system-design-m2-l1",
            "title": "Load Balancing",
            "objectives": [
              "Explain what load balancing means and where it appears in real systems",
              "Apply load balancing to a small realistic problem",
              "Recognise the common mistakes people make with load balancing"
            ],
            "introduction": "This lesson introduces load balancing. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A load balancer sits in front of a pool of identical servers and spreads incoming requests across them, so no single server is overwhelmed and the failure of one server only removes a fraction of capacity. The simplest algorithm is round-robin: requests go to server 1, then 2, then 3, then back to 1. Least-connections sends each request to the server with the fewest active requests, which adapts when requests take different amounts of time. Health checks matter as much as distribution: the balancer must stop sending traffic to a server that has stopped responding. Load balancing is what turns one server's limit into a pool's limit.",
            "syntax": "client -> load balancer -> server pool (round-robin / least-connections)",
            "analogy": "A load balancer is like a supermarket with many tills and one queue manager who sends each shopper to the shortest till and closes a till that breaks down.",
            "exampleCode": "servers = [\"s1\", \"s2\", \"s3\"]\nfor i in range(5):\n    print(f\"Request {i+1} -> {servers[i % len(servers)]}\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem load balancing solves in plain words.",
              "Follow the example step by step and note where load balancing changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Assuming the load balancer itself can never fail — it needs redundancy too.",
              "Using round-robin when requests vary wildly in cost.",
              "Forgetting health checks, so dead servers keep receiving traffic."
            ],
            "debugging": {
              "prompt": "This round-robin distributor sends every request to the same server. Find the bug.",
              "buggyCode": "servers = [\"s1\", \"s2\", \"s3\"]\nfor i in range(5):\n    print(f\"Request {i+1} -> {servers[0]}\")",
              "fixedCode": "servers = [\"s1\", \"s2\", \"s3\"]\nfor i in range(5):\n    print(f\"Request {i+1} -> {servers[i % len(servers)]}\")",
              "explanation": "The index never changes; it must be i % len(servers) so requests cycle through the pool."
            },
            "miniChallenge": "Extend the exercise: apply load balancing to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A load balancer spreads requests across a server pool and routes around unhealthy servers; round-robin is simple, least-connections adapts to uneven work.",
            "quiz": [
              {
                "question": "What does a load balancer do when a server fails its health check?",
                "options": [
                  "It restarts the whole system",
                  "It stops sending traffic to that server",
                  "It sends it more traffic",
                  "It deletes the server's data"
                ],
                "answer": 1,
                "explanation": "Health checks let the balancer route around dead servers so users never notice."
              },
              {
                "question": "When is least-connections better than round-robin?",
                "options": [
                  "When all requests take the same time",
                  "When requests vary a lot in duration",
                  "When there is only one server",
                  "When traffic is very low"
                ],
                "answer": 1,
                "explanation": "Round-robin ignores how long requests take; least-connections adapts to uneven work."
              }
            ],
            "exercise": {
              "title": "Round-robin server picker",
              "type": "write-code",
              "instructions": "Write a program that reads a request number and prints exactly: Server: <name>. Servers are s1, s2, s3 in rotation; request 1 goes to s1.",
              "starterCode": "servers = [\"s1\", \"s2\", \"s3\"]\nreq = int(input())\n# request 1 -> index 0\n",
              "solution": "servers = [\"s1\", \"s2\", \"s3\"]\nreq = int(input())\nprint(f\"Server: {servers[(req - 1) % len(servers)]}\")",
              "solutionExplanation": "Subtract 1 so request 1 maps to index 0, then use modulo to wrap around the pool.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Request 1",
                  "hidden": false,
                  "stdin": "1\n",
                  "expectedStdout": "Server: s1"
                },
                {
                  "name": "Request 4",
                  "hidden": true,
                  "stdin": "4\n",
                  "expectedStdout": "Server: s1"
                }
              ],
              "hintNotes": {
                "concept": "Round-robin cycles through the pool, wrapping back to the start after the last server.",
                "approach": "Use (req - 1) % len(servers) as the index — the -1 handles 1-based request numbers.",
                "structure": "Structure: define the list, read the request, print the chosen server."
              },
              "id": "system-design-m2-l1-e1"
            }
          },
          {
            "id": "system-design-m2-l2",
            "slug": "system-design-m2-l2",
            "title": "Caching Strategies",
            "objectives": [
              "Explain what caching strategies means and where it appears in real systems",
              "Apply caching strategies to a small realistic problem",
              "Recognise the common mistakes people make with caching strategies"
            ],
            "introduction": "This lesson introduces caching strategies. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A cache is fast storage that holds copies of slow-to-compute or slow-to-fetch data, and the hit rate — the fraction of requests served from cache — decides whether it helps. Cache-aside is the common pattern: the application checks the cache first, falls back to the database on a miss, and writes the result back to the cache. Every cached item needs an expiry (TTL), because stale data is the cache's central risk: a profile cached for an hour may be an hour out of date. Cache invalidation — deciding when to throw data away — is famously hard, which is why short TTLs are often preferred over clever invalidation. A cache that fills up evicts items, usually the least-recently-used ones.",
            "syntax": "cache-aside: check cache -> miss -> read DB -> write cache -> return",
            "analogy": "A cache is like a notepad by your phone: you write down numbers you call often so you don't have to look them up in the directory every time — but numbers change, so you re-check sometimes.",
            "exampleCode": "cache = {\"user:42\": \"Ada\"}\nprint(\"Hit!\" if \"user:42\" in cache else \"Miss — read the database\")\nprint(\"TTL: cached items expire so data cannot go too stale.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem caching strategies solves in plain words.",
              "Follow the example step by step and note where caching strategies changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Caching without a TTL and serving data that is days old.",
              "Caching data that changes on every request — the cache never helps.",
              "Checking the cache values instead of the keys when testing for a hit."
            ],
            "debugging": {
              "prompt": "This cache lookup should return 'Hit!' for a cached key, but it always misses. Find the bug.",
              "buggyCode": "cache = {\"user:42\": \"Ada\"}\nkey = \"user:42\"\nprint(\"Hit!\" if key in cache.values() else \"Miss\")",
              "fixedCode": "cache = {\"user:42\": \"Ada\"}\nkey = \"user:42\"\nprint(\"Hit!\" if key in cache else \"Miss\")",
              "explanation": "The check searched the values ('Ada') instead of the keys; `key in cache` tests the keys."
            },
            "miniChallenge": "Extend the exercise: apply caching strategies to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Caching trades freshness for speed: cache-aside with a TTL and a healthy hit rate keeps reads fast, while stale data is the risk you manage with expiry.",
            "quiz": [
              {
                "question": "What is cache-aside?",
                "options": [
                  "The database writes to the cache on every change",
                  "The application checks the cache, falls back to the database on a miss, and stores the result",
                  "The cache replaces the database",
                  "Data is never cached"
                ],
                "answer": 1,
                "explanation": "In cache-aside the application owns the cache: look up, miss, read the source, populate, return."
              },
              {
                "question": "What is the main risk of caching?",
                "options": [
                  "It uses too little memory",
                  "Stale data — serving an out-of-date copy",
                  "It makes reads slower",
                  "It deletes the database"
                ],
                "answer": 1,
                "explanation": "Cached copies age; without expiry or invalidation, users see data that is no longer true."
              }
            ],
            "exercise": {
              "title": "Compute a cache hit rate",
              "type": "write-code",
              "instructions": "Write a program that reads total requests and cache hits, then prints exactly: Hit rate: <n>% with one decimal place.",
              "starterCode": "total = int(input())\nhits = int(input())\n# hit rate = hits / total * 100\n",
              "solution": "total = int(input())\nhits = int(input())\nprint(f\"Hit rate: {hits / total * 100:.1f}%\")",
              "solutionExplanation": "Divide hits by total, multiply by 100, and format with one decimal place.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "1000 requests, 850 hits",
                  "hidden": false,
                  "stdin": "1000\n850\n",
                  "expectedStdout": "Hit rate: 85.0%"
                },
                {
                  "name": "200 requests, 150 hits",
                  "hidden": true,
                  "stdin": "200\n150\n",
                  "expectedStdout": "Hit rate: 75.0%"
                }
              ],
              "hintNotes": {
                "concept": "The hit rate is the fraction of requests the cache served, as a percentage.",
                "approach": "Compute hits / total * 100 and format with :.1f.",
                "structure": "Structure: read two numbers, then one print with the percentage."
              },
              "id": "system-design-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "system-design-m3",
        "title": "Data at Scale",
        "description": "Databases, replication, and asynchronous processing.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "system-design-m3-l1",
            "slug": "system-design-m3-l1",
            "title": "Databases and Sharding",
            "objectives": [
              "Explain what database sharding means and where it appears in real systems",
              "Apply database sharding to a small realistic problem",
              "Recognise the common mistakes people make with database sharding"
            ],
            "introduction": "In this lesson you will see database sharding in action, work through a guided example, and practise it yourself.",
            "concept": "When one database can no longer hold the data or serve the writes, sharding splits the data across several databases by a shard key — for example, users with IDs 0-999 on shard A and 1000-1999 on shard B. A good shard key spreads load evenly and keeps the queries you actually run on one shard; a bad one, like country, puts most users on one shard and leaves the rest idle. Sharding buys scale but costs simplicity: joins across shards become application logic, transactions across shards are hard, and re-sharding when a shard fills up is a project in itself. That is why the advice is to shard late — only when a single database genuinely cannot cope.",
            "syntax": "shard key -> which shard holds this row; range vs hash sharding",
            "analogy": "Sharding is like splitting a phone book into volumes by surname: each volume is manageable, but a query spanning volumes means checking several books.",
            "exampleCode": "def shard(user_id):\n    return f\"shard-{user_id // 1000}\"\nprint(shard(42))\nprint(shard(1500))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how database sharding is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Sharding on a key that concentrates load, like country or a celebrity user.",
              "Sharding before a single database has actually run out of room.",
              "Forgetting that cross-shard transactions lose atomicity."
            ],
            "debugging": {
              "prompt": "This sharding function should put user 1500 on shard-1, but it puts them on shard-0. Find the bug.",
              "buggyCode": "def shard(user_id):\n    return f\"shard-{user_id // 100}\"\nprint(shard(1500))",
              "fixedCode": "def shard(user_id):\n    return f\"shard-{user_id // 1000}\"\nprint(shard(1500))",
              "explanation": "With 1000 users per shard the divisor is 1000; dividing by 100 gives shard-15 instead of shard-1."
            },
            "miniChallenge": "Extend the exercise: apply database sharding to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Sharding splits data across databases by a shard key; a good key balances load and keeps queries local, but cross-shard joins and transactions become application problems.",
            "quiz": [
              {
                "question": "What makes a good shard key?",
                "options": [
                  "It puts most data on one shard",
                  "It spreads load evenly and keeps common queries on a single shard",
                  "It never changes",
                  "It is always a string"
                ],
                "answer": 1,
                "explanation": "A good key balances the load and localises the queries you actually run."
              },
              {
                "question": "What is the main cost of sharding?",
                "options": [
                  "It is slower for every query",
                  "Cross-shard joins and transactions become hard or impossible",
                  "It uses more disk",
                  "It needs more RAM"
                ],
                "answer": 1,
                "explanation": "Shards are independent databases, so operations spanning shards lose database-level joins and transactions."
              }
            ],
            "exercise": {
              "title": "Pick a shard for a user",
              "type": "write-code",
              "instructions": "Write a program that reads a user ID and prints exactly: Shard: <n>. Users are sharded by user_id // 1000.",
              "starterCode": "user_id = int(input())\n# shard = user_id // 1000\n",
              "solution": "user_id = int(input())\nprint(f\"Shard: {user_id // 1000}\")",
              "solutionExplanation": "Integer-divide the user ID by 1000 to get the shard number.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "User 42",
                  "hidden": false,
                  "stdin": "42\n",
                  "expectedStdout": "Shard: 0"
                },
                {
                  "name": "User 2500",
                  "hidden": true,
                  "stdin": "2500\n",
                  "expectedStdout": "Shard: 2"
                }
              ],
              "hintNotes": {
                "concept": "Range sharding groups consecutive IDs together, so the shard is the ID divided by the shard size.",
                "approach": "Use integer division // by 1000.",
                "structure": "Structure: read the ID, then one print with the shard number."
              },
              "id": "system-design-m3-l1-e1"
            }
          },
          {
            "id": "system-design-m3-l2",
            "slug": "system-design-m3-l2",
            "title": "Replication and Consistency",
            "objectives": [
              "Explain what replication and consistency means and where it appears in real systems",
              "Apply replication and consistency to a small realistic problem",
              "Recognise the common mistakes people make with replication and consistency"
            ],
            "introduction": "This lesson introduces replication and consistency. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Replication keeps copies of the same data on several machines so the system survives a failure and can serve reads from the nearest copy. The primary handles writes and streams them to replicas; a replica that applies every write immediately is strongly consistent but slow, while one that lags is eventually consistent — reads may briefly return old data. Synchronous replication waits for replicas before acknowledging a write, which is safe but slow and stalls if a replica is down; asynchronous replication acknowledges at once and catches up later, which is fast but can lose a recent write in a crash. Most real systems pick a middle ground: a few synchronous replicas for safety, the rest asynchronous.",
            "syntax": "primary writes -> replicas apply; sync = wait, async = catch up later",
            "analogy": "Replication is like printing a newspaper in several cities: readers get a nearby copy fast, but a late-breaking story may not be in every edition yet.",
            "exampleCode": "print(\"Primary: accepts writes\")\nprint(\"Replica: applies writes, serves reads\")\nprint(\"Sync: safe and slow. Async: fast, may lag.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem replication and consistency solves in plain words.",
              "Follow the example step by step and note where replication and consistency changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Assuming all replicas see every write instantly.",
              "Choosing synchronous replication and then being surprised by write latency.",
              "Reading from a lagging replica for data the user just wrote."
            ],
            "debugging": {
              "prompt": "This replication check should report LAGGING when the replica is behind, but it reports OK. Find the bug.",
              "buggyCode": "primary_seq = 100\nreplica_seq = 95\nprint(\"OK\" if replica_seq < primary_seq else \"LAGGING\")",
              "fixedCode": "primary_seq = 100\nreplica_seq = 95\nprint(\"LAGGING\" if replica_seq < primary_seq else \"OK\")",
              "explanation": "The labels are backwards: a replica sequence behind the primary means it is lagging, not OK."
            },
            "miniChallenge": "Extend the exercise: apply replication and consistency to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Replication copies data to several machines for survival and scale; synchronous replication is safe but slow, asynchronous is fast but may lag or lose a recent write.",
            "quiz": [
              {
                "question": "What does eventual consistency mean?",
                "options": [
                  "Data is never consistent",
                  "Replicas may briefly disagree but will converge if writes stop",
                  "Writes are lost",
                  "Only one replica exists"
                ],
                "answer": 1,
                "explanation": "Eventual consistency guarantees convergence after writes stop, not that every read is current."
              },
              {
                "question": "What is the main risk of asynchronous replication?",
                "options": [
                  "Reads are too slow",
                  "A crash can lose a write that was acknowledged but not yet replicated",
                  "It needs more disks",
                  "Replicas cannot serve reads"
                ],
                "answer": 1,
                "explanation": "Async replication acknowledges before replicas have the data, so a primary crash can lose acknowledged writes."
              }
            ],
            "exercise": {
              "title": "Measure replication lag",
              "type": "write-code",
              "instructions": "Write a program that reads the primary sequence number and the replica sequence number, then prints exactly: Lag: <n> writes.",
              "starterCode": "primary = int(input())\nreplica = int(input())\n# lag = primary - replica\n",
              "solution": "primary = int(input())\nreplica = int(input())\nprint(f\"Lag: {primary - replica} writes\")",
              "solutionExplanation": "Subtract the replica's sequence from the primary's to get how many writes it is behind.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Primary 100, replica 95",
                  "hidden": false,
                  "stdin": "100\n95\n",
                  "expectedStdout": "Lag: 5 writes"
                },
                {
                  "name": "Primary 50, replica 50",
                  "hidden": true,
                  "stdin": "50\n50\n",
                  "expectedStdout": "Lag: 0 writes"
                }
              ],
              "hintNotes": {
                "concept": "Replication lag is the gap between what the primary has written and what the replica has applied.",
                "approach": "Compute primary - replica and print it with the label.",
                "structure": "Structure: read two numbers, then one print with the difference."
              },
              "id": "system-design-m3-l2-e1"
            }
          },
          {
            "id": "system-design-m3-l3",
            "slug": "system-design-m3-l3",
            "title": "Message Queues and Async Processing",
            "objectives": [
              "Explain what message queues means and where it appears in real systems",
              "Apply message queues to a small realistic problem",
              "Recognise the common mistakes people make with message queues"
            ],
            "introduction": "Here you will get hands-on with message queues: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A message queue decouples producers from consumers: instead of calling a service directly and waiting, a producer drops a message on a queue and a worker picks it up when it can. That absorbs bursts — a spike of sign-ups becomes a queue that drains at the workers' pace instead of an outage — and lets slow work like sending emails or resizing images happen outside the request path. Messages should be idempotent, because a worker that crashes mid-task may see the same message twice. The trade-off is that work is no longer immediate: the user sees 'processing' instead of 'done', and the system must handle a queue that grows faster than workers can drain it.",
            "syntax": "producer -> queue -> worker; bursts become a backlog, not an outage",
            "analogy": "A message queue is like a restaurant order rail: waiters clip orders to the rail and cooks work through them in order, so a rush becomes a queue, not chaos.",
            "exampleCode": "from collections import deque\nqueue = deque([\"email:42\", \"resize:7\"])\nprint(\"Next job:\", queue.popleft())\nprint(\"Remaining:\", len(queue))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where message queues does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Assuming a queue makes slow work instant instead of merely deferred.",
              "Writing handlers that break when a message is delivered twice.",
              "Letting the queue grow without alerting when workers fall behind."
            ],
            "debugging": {
              "prompt": "This queue code should take the oldest job first, but it takes the newest. Find the bug.",
              "buggyCode": "from collections import deque\nqueue = deque([\"email:42\", \"resize:7\"])\nprint(\"Next job:\", queue.pop())",
              "fixedCode": "from collections import deque\nqueue = deque([\"email:42\", \"resize:7\"])\nprint(\"Next job:\", queue.popleft())",
              "explanation": "pop() takes from the right (newest); a FIFO queue must use popleft() to take the oldest job first."
            },
            "miniChallenge": "Extend the exercise: apply message queues to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Message queues decouple producers from consumers, absorb bursts as backlogs, and move slow work off the request path — with idempotent handlers because delivery may repeat.",
            "quiz": [
              {
                "question": "What is the main benefit of a message queue during a traffic spike?",
                "options": [
                  "It makes the database faster",
                  "It absorbs the burst as a backlog that workers drain at their own pace",
                  "It deletes extra requests",
                  "It adds more servers automatically"
                ],
                "answer": 1,
                "explanation": "Queues buffer bursts so producers never wait and workers process at a steady rate."
              },
              {
                "question": "Why should queue messages be idempotent?",
                "options": [
                  "To make them smaller",
                  "A worker may process the same message twice after a crash, and the result must be the same",
                  "To encrypt them",
                  "To order them correctly"
                ],
                "answer": 1,
                "explanation": "At-least-once delivery means duplicates happen; idempotent handlers make a duplicate harmless."
              }
            ],
            "exercise": {
              "title": "Estimate queue drain time",
              "type": "write-code",
              "instructions": "Write a program that reads the number of queued jobs and the jobs processed per minute, then prints exactly: Drain time: <n> minutes. Round up partial minutes.",
              "starterCode": "jobs = int(input())\nrate = int(input())\n# ceiling division\n",
              "solution": "jobs = int(input())\nrate = int(input())\nprint(f\"Drain time: {(jobs + rate - 1) // rate} minutes\")",
              "solutionExplanation": "Use ceiling division (jobs + rate - 1) // rate so a partial final minute counts as a whole minute.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100 jobs, 30 per minute",
                  "hidden": false,
                  "stdin": "100\n30\n",
                  "expectedStdout": "Drain time: 4 minutes"
                },
                {
                  "name": "60 jobs, 30 per minute",
                  "hidden": true,
                  "stdin": "60\n30\n",
                  "expectedStdout": "Drain time: 2 minutes"
                }
              ],
              "hintNotes": {
                "concept": "The drain time is the backlog divided by the processing rate, rounded up.",
                "approach": "Use ceiling division: (jobs + rate - 1) // rate.",
                "structure": "Structure: read two numbers, then one print with the ceiling division."
              },
              "id": "system-design-m3-l3-e1"
            }
          }
        ]
      },
      {
        "id": "system-design-m4",
        "title": "Reliability",
        "description": "Consistency trade-offs, rate limiting, and graceful degradation.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "system-design-m4-l1",
            "slug": "system-design-m4-l1",
            "title": "CAP Theorem and Trade-offs",
            "objectives": [
              "Explain what CAP theorem means and where it appears in real systems",
              "Apply CAP theorem to a small realistic problem",
              "Recognise the common mistakes people make with CAP theorem"
            ],
            "introduction": "This lesson introduces CAP theorem. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "The CAP theorem says a distributed system cannot guarantee consistency, availability, and partition tolerance all at once when the network splits: if two halves cannot talk, you must either stop serving (consistency) or serve possibly-stale data (availability). Since partitions happen in real networks, the practical choice is between CP and AP. A bank ledger chooses consistency — better to refuse than to show a wrong balance — while a social feed chooses availability — better to show a slightly old feed than nothing. The theorem is often over-applied: in normal operation without a partition, you can have both, and the real design question is how the system behaves during the partition, not in theory.",
            "syntax": "partition -> choose consistency (stop) or availability (serve stale)",
            "analogy": "CAP is like a shop during a phone outage: either close until the card machine works again (consistency) or take cash and reconcile later (availability).",
            "exampleCode": "print(\"C: every read sees the latest write\")\nprint(\"A: every request gets an answer\")\nprint(\"P: the system keeps working during a network split\")\nprint(\"During a partition, pick C or A.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem CAP theorem solves in plain words.",
              "Follow the example step by step and note where CAP theorem changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Quoting CAP as if it forbids consistency and availability in normal operation.",
              "Choosing AP for data where a wrong answer costs money.",
              "Forgetting that partitions are a matter of when, not if."
            ],
            "debugging": {
              "prompt": "This CAP choice should pick consistency for a bank ledger, but it picks availability. Find the bug.",
              "buggyCode": "system = \"bank ledger\"\nchoice = \"availability\" if system == \"bank ledger\" else \"consistency\"\nprint(choice)",
              "fixedCode": "system = \"bank ledger\"\nchoice = \"consistency\" if system == \"bank ledger\" else \"availability\"\nprint(choice)",
              "explanation": "The branches are swapped: a bank ledger needs consistency, while a feed can accept availability."
            },
            "miniChallenge": "Extend the exercise: apply CAP theorem to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "CAP forces a choice during a network partition: consistency (refuse rather than be wrong) or availability (serve possibly-stale data and reconcile later).",
            "quiz": [
              {
                "question": "During a network partition, what must a system choose between?",
                "options": [
                  "Speed and cost",
                  "Consistency and availability",
                  "Security and usability",
                  "Reads and writes"
                ],
                "answer": 1,
                "explanation": "When the network splits, a system cannot be both fully consistent and fully available — it must pick one."
              },
              {
                "question": "Which system would choose consistency over availability?",
                "options": [
                  "A social media feed",
                  "A bank ledger",
                  "A video recommendations page",
                  "A weather widget"
                ],
                "answer": 1,
                "explanation": "Money demands correctness: a bank would rather refuse a transaction than risk a wrong balance."
              }
            ],
            "exercise": {
              "title": "Pick the CAP trade-off",
              "type": "multiple-choice",
              "instructions": "A network partition splits a shopping cart service from its database. Which behaviour fits an AP (availability-first) choice?",
              "starterCode": "",
              "solution": "Keep serving carts, accepting that two devices may briefly show different carts",
              "solutionExplanation": "An AP system keeps serving during a partition and reconciles afterwards, accepting temporary inconsistency. A CP system would refuse requests until the partition heals.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Availability-first means the system keeps answering even when it cannot check the latest data.",
                "approach": "Look for the option that keeps serving and accepts a temporary mismatch.",
                "structure": "Structure: AP = serve now, reconcile later; CP = refuse rather than risk a wrong answer."
              },
              "options": [
                "Refuse all cart requests until the partition heals",
                "Keep serving carts, accepting that two devices may briefly show different carts",
                "Delete all carts to avoid inconsistency",
                "Shut down the whole service"
              ],
              "answerIndex": 1,
              "id": "system-design-m4-l1-e1"
            }
          },
          {
            "id": "system-design-m4-l2",
            "slug": "system-design-m4-l2",
            "title": "Rate Limiting and Backpressure",
            "objectives": [
              "Explain what rate limiting and backpressure means and where it appears in real systems",
              "Apply rate limiting and backpressure to a small realistic problem",
              "Recognise the common mistakes people make with rate limiting and backpressure"
            ],
            "introduction": "This lesson introduces rate limiting and backpressure. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Rate limiting protects a system from being overwhelmed by capping how many requests a client may make in a window — say 100 requests per minute — and answering the rest with HTTP 429 (Too Many Requests). The token bucket is the classic algorithm: tokens refill at a fixed rate, each request spends one, and a request with no token available is rejected or queued. Backpressure is the same idea between internal services: when a downstream service is slow, the upstream slows down or sheds load instead of piling up work that will time out anyway. Without these, one greedy client or one slow dependency can take down the whole system.",
            "syntax": "token bucket: tokens refill at a rate; each request spends one; empty bucket = 429",
            "analogy": "Rate limiting is like a nightclub door: a steady stream gets in, but when the room is full the bouncer turns people away instead of letting the crowd crush everyone inside.",
            "exampleCode": "tokens = 5\nfor request in range(7):\n    if tokens > 0:\n        tokens -= 1\n        print(f\"Request {request+1}: allowed, {tokens} tokens left\")\n    else:\n        print(f\"Request {request+1}: 429 Too Many Requests\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem rate limiting and backpressure solves in plain words.",
              "Follow the example step by step and note where rate limiting and backpressure changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Returning a 500 instead of a 429, so clients retry aggressively.",
              "Rate-limiting by IP when many users share one IP (an office NAT).",
              "Letting a slow downstream service accumulate an unbounded backlog."
            ],
            "debugging": {
              "prompt": "This token bucket should allow 5 requests and reject the 6th, but it allows 6. Find the bug.",
              "buggyCode": "tokens = 5\nallowed = 0\nfor request in range(6):\n    if tokens >= 0:\n        tokens -= 1\n        allowed += 1\nprint(\"Allowed:\", allowed)",
              "fixedCode": "tokens = 5\nallowed = 0\nfor request in range(6):\n    if tokens > 0:\n        tokens -= 1\n        allowed += 1\nprint(\"Allowed:\", allowed)",
              "explanation": "The check must be tokens > 0: with >= 0 the bucket is allowed to go to -1, letting one extra request through."
            },
            "miniChallenge": "Extend the exercise: apply rate limiting and backpressure to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Rate limiting caps requests per window (429 when exceeded) and token buckets implement it; backpressure spreads the slowdown upstream instead of letting work pile up.",
            "quiz": [
              {
                "question": "What should a rate-limited client receive?",
                "options": [
                  "A 500 error",
                  "A 429 Too Many Requests response",
                  "A redirect",
                  "A faster connection"
                ],
                "answer": 1,
                "explanation": "429 tells the client it has exceeded its allowance and should slow down or retry later."
              },
              {
                "question": "What is backpressure?",
                "options": [
                  "Pushing more data downstream",
                  "An upstream service slowing down or shedding load when downstream cannot keep up",
                  "Increasing the rate limit",
                  "Restarting the downstream service"
                ],
                "answer": 1,
                "explanation": "Backpressure propagates the slowdown upstream so work does not pile up and time out."
              }
            ],
            "exercise": {
              "title": "Check a token bucket",
              "type": "write-code",
              "instructions": "Write a program that reads tokens available and requests wanted, then prints exactly: Allowed: <n>. Each request spends one token; requests beyond the tokens are rejected.",
              "starterCode": "tokens = int(input())\nwanted = int(input())\n# allowed = min(tokens, wanted)\n",
              "solution": "tokens = int(input())\nwanted = int(input())\nprint(f\"Allowed: {min(tokens, wanted)}\")",
              "solutionExplanation": "The allowed count is the smaller of the tokens available and the requests wanted.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5 tokens, 7 wanted",
                  "hidden": false,
                  "stdin": "5\n7\n",
                  "expectedStdout": "Allowed: 5"
                },
                {
                  "name": "10 tokens, 3 wanted",
                  "hidden": true,
                  "stdin": "10\n3\n",
                  "expectedStdout": "Allowed: 3"
                }
              ],
              "hintNotes": {
                "concept": "A token bucket can only serve as many requests as it has tokens.",
                "approach": "Use min(tokens, wanted) to cap the allowed count.",
                "structure": "Structure: read two numbers, then one print with the minimum."
              },
              "id": "system-design-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "system-design-m5",
        "title": "Design Practice",
        "description": "Putting it together: two complete designs, end to end.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "system-design-m5-l1",
            "slug": "system-design-m5-l1",
            "title": "Designing a URL Shortener",
            "objectives": [
              "Explain what designing a URL shortener means and where it appears in real systems",
              "Apply designing a URL shortener to a small realistic problem",
              "Recognise the common mistakes people make with designing a URL shortener"
            ],
            "introduction": "This lesson introduces designing a URL shortener. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A URL shortener is the classic first design exercise because it is small but touches everything: a user submits a long URL, the service returns a short code like abc123, and visiting the short link redirects to the original. The core decisions are the ID scheme — a counter encoded in base 62 gives short, unique codes — and the storage: a key-value store mapping code to URL, cached in front for hot links. Capacity is easy to estimate: 100 million new URLs a day at ~500 bytes each is about 50 GB a day, so retention policy matters more than the code length. Analytics (click counts) belong in a separate async pipeline so they never slow down the redirect path.",
            "syntax": "POST /shorten -> base62(counter) -> store code->URL -> GET /abc123 -> 302 redirect",
            "analogy": "A URL shortener is like a coat-check: you hand in a long coat (URL), get a small ticket (code), and the ticket alone retrieves the coat later.",
            "exampleCode": "import string\nALPHABET = string.digits + string.ascii_letters\ndef encode(n):\n    s = \"\"\n    while n > 0:\n        s = ALPHABET[n % 62] + s\n        n //= 62\n    return s or \"0\"\nprint(encode(125))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem designing a URL shortener solves in plain words.",
              "Follow the example step by step and note where designing a URL shortener changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Generating random codes and then checking for collisions on every write.",
              "Putting analytics on the synchronous redirect path.",
              "Forgetting that a short code must stay unique forever."
            ],
            "debugging": {
              "prompt": "This base-62 encoder should turn 125 into '21', but it returns '12'. Find the bug.",
              "buggyCode": "ALPHABET = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\"\ndef encode(n):\n    s = \"\"\n    while n > 0:\n        s = s + ALPHABET[n % 62]\n        n //= 62\n    return s or \"0\"\nprint(encode(125))",
              "fixedCode": "ALPHABET = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\"\ndef encode(n):\n    s = \"\"\n    while n > 0:\n        s = ALPHABET[n % 62] + s\n        n //= 62\n    return s or \"0\"\nprint(encode(125))",
              "explanation": "Each new digit is the least significant, so it must be prepended — appending reverses the code."
            },
            "miniChallenge": "Extend the exercise: apply designing a URL shortener to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A URL shortener maps base-62 codes to URLs in a key-value store behind a cache, with analytics handled asynchronously so redirects stay fast.",
            "quiz": [
              {
                "question": "Why use a counter encoded in base 62 for short codes?",
                "options": [
                  "It encrypts the URL",
                  "It guarantees unique, short codes that grow slowly",
                  "It makes codes random",
                  "It avoids using a database"
                ],
                "answer": 1,
                "explanation": "A counter guarantees uniqueness, and base 62 packs the most information per character, keeping codes short."
              },
              {
                "question": "Where should click analytics go in a URL shortener?",
                "options": [
                  "In the redirect path, synchronously",
                  "In a separate async pipeline, so redirects stay fast",
                  "In the user's browser",
                  "Nowhere — analytics are useless"
                ],
                "answer": 1,
                "explanation": "Analytics must not slow the hot redirect path; an async queue handles them separately."
              }
            ],
            "exercise": {
              "title": "Estimate shortener storage",
              "type": "write-code",
              "instructions": "Write a program that reads new URLs per day (in millions) and bytes per record, then prints exactly: Storage per day: <n> GB. 1 GB = 1,000,000,000 bytes; round to the nearest whole GB.",
              "starterCode": "millions = int(input())\nbytes_each = int(input())\n# total bytes = millions * 1e6 * bytes_each\n",
              "solution": "millions = int(input())\nbytes_each = int(input())\ngb = millions * 1_000_000 * bytes_each / 1_000_000_000\nprint(f\"Storage per day: {round(gb)} GB\")",
              "solutionExplanation": "Multiply millions of URLs by a million and by the bytes per record, divide by a billion, and round to the nearest GB.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100M URLs, 500 bytes",
                  "hidden": false,
                  "stdin": "100\n500\n",
                  "expectedStdout": "Storage per day: 50 GB"
                },
                {
                  "name": "10M URLs, 500 bytes",
                  "hidden": true,
                  "stdin": "10\n500\n",
                  "expectedStdout": "Storage per day: 5 GB"
                }
              ],
              "hintNotes": {
                "concept": "Storage per day is just new items times size per item, converted to gigabytes.",
                "approach": "Compute millions * 1_000_000 * bytes_each / 1_000_000_000 and round it.",
                "structure": "Structure: read two numbers, compute the GB value, then one print."
              },
              "id": "system-design-m5-l1-e1"
            }
          },
          {
            "id": "system-design-m5-l2",
            "slug": "system-design-m5-l2",
            "title": "Designing a News Feed",
            "objectives": [
              "Explain what designing a news feed means and where it appears in real systems",
              "Apply designing a news feed to a small realistic problem",
              "Recognise the common mistakes people make with designing a news feed"
            ],
            "introduction": "In this lesson you will see designing a news feed in action, work through a guided example, and practise it yourself.",
            "concept": "A news feed is a harder design problem than it looks: when a user posts, do you push the post into every follower's feed immediately (fan-out on write) or build the feed when someone opens the app (fan-out on read)? Fan-out on write makes reads instant — the feed is precomputed — but a celebrity with ten million followers turns one post into ten million writes. Fan-out on read is cheap for posting but slow for reading, since the feed must be assembled from every followed account. Real systems mix them: fan-out on write for ordinary users, fan-out on read for celebrities, and a cache in front so the hot feeds never touch the database.",
            "syntax": "fan-out on write: fast reads, expensive posts. Fan-out on read: cheap posts, slow reads.",
            "analogy": "A news feed is like a newspaper: either print a personal copy for every subscriber when news breaks (write), or print it when each reader asks (read) — the first is fast to read, the second is cheap to publish.",
            "exampleCode": "followers = 10_000_000\nwrites_per_post = followers\nprint(\"Fan-out on write:\", writes_per_post, \"writes per post\")\nprint(\"Fan-out on read: 0 writes, feed built at read time\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how designing a news feed is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Fan-out on write for every user, including celebrities with millions of followers.",
              "Rebuilding the whole feed from scratch on every read.",
              "Forgetting to cache hot feeds in front of the database."
            ],
            "debugging": {
              "prompt": "This fan-out estimate should show 10,000,000 writes for a celebrity post, but it shows 10,000. Find the bug.",
              "buggyCode": "followers = 10_000\nwrites_per_post = followers\nprint(\"Writes per post:\", writes_per_post)",
              "fixedCode": "followers = 10_000_000\nwrites_per_post = followers\nprint(\"Writes per post:\", writes_per_post)",
              "explanation": "The follower count is wrong: the celebrity has ten million followers (10_000_000), not ten thousand."
            },
            "miniChallenge": "Extend the exercise: apply designing a news feed to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A news feed trades write cost against read cost: fan-out on write precomputes feeds, fan-out on read assembles them on demand, and real systems mix the two.",
            "quiz": [
              {
                "question": "What is the main cost of fan-out on write?",
                "options": [
                  "Reads become slow",
                  "One post by a popular user becomes millions of writes",
                  "Posts are lost",
                  "The database shrinks"
                ],
                "answer": 1,
                "explanation": "Precomputing feeds means every post is copied to every follower's feed — expensive for celebrities."
              },
              {
                "question": "Why do real systems mix both fan-out strategies?",
                "options": [
                  "To confuse attackers",
                  "Ordinary users get cheap precomputed feeds while celebrities use read-time assembly",
                  "Mixing is required by law",
                  "To use more servers"
                ],
                "answer": 1,
                "explanation": "A hybrid avoids the celebrity write explosion while keeping ordinary feeds fast."
              }
            ],
            "exercise": {
              "title": "Estimate fan-out writes",
              "type": "write-code",
              "instructions": "Write a program that reads a follower count and posts per day, then prints exactly: Writes per day: <n>.",
              "starterCode": "followers = int(input())\nposts = int(input())\n# writes = followers * posts\n",
              "solution": "followers = int(input())\nposts = int(input())\nprint(f\"Writes per day: {followers * posts}\")",
              "solutionExplanation": "Multiply followers by posts per day to get the total fan-out writes.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "1000 followers, 2 posts",
                  "hidden": false,
                  "stdin": "1000\n2\n",
                  "expectedStdout": "Writes per day: 2000"
                },
                {
                  "name": "500 followers, 10 posts",
                  "hidden": true,
                  "stdin": "500\n10\n",
                  "expectedStdout": "Writes per day: 5000"
                }
              ],
              "hintNotes": {
                "concept": "Fan-out on write copies each post to every follower, so the work multiplies.",
                "approach": "Multiply followers by posts per day.",
                "structure": "Structure: read two numbers, then one print with the product."
              },
              "id": "system-design-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "ood",
    "slug": "ood",
    "language": "python",
    "category": "cs-career",
    "title": "Object-Oriented Design",
    "description": "Design software with objects: encapsulation, SOLID principles, design patterns, UML modelling, and refactoring real code into clean classes.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Encapsulation",
      "SOLID principles",
      "Design patterns",
      "UML class diagrams",
      "Domain modelling",
      "Refactoring"
    ],
    "prerequisites": [
      "Basic Python programming",
      "Familiarity with classes"
    ],
    "modules": [
      {
        "id": "ood-m1",
        "title": "OOP Foundations",
        "description": "Classes, objects, encapsulation, and abstraction.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "ood-m1-l1",
            "slug": "ood-m1-l1",
            "title": "Classes and Objects Revisited",
            "objectives": [
              "Explain what classes and objects means and where it appears in real systems",
              "Apply classes and objects to a small realistic problem",
              "Recognise the common mistakes people make with classes and objects"
            ],
            "introduction": "Here you will get hands-on with classes and objects: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A class is a blueprint and an object is a thing built from it: the class defines the data (attributes) and behaviour (methods) that all its objects share, while each object holds its own values. The __init__ method runs when an object is created and sets up its initial state, and self is how a method refers to the object it belongs to. Good classes model one clear idea from the problem domain — a BankAccount, not a DataManager — and hide their internal details behind a small public interface. When you find yourself passing the same group of values around together, that group is usually a class waiting to be born.",
            "syntax": "class BankAccount: def __init__(self, balance): self.balance = balance",
            "analogy": "A class is like a cookie cutter: the cutter (class) defines the shape, and each cookie (object) is a separate instance with its own icing.",
            "exampleCode": "class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\nacc = BankAccount(100)\nacc.deposit(50)\nprint(\"Balance:\", acc.balance)",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where classes and objects does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Using = instead of += in a method that should accumulate.",
              "Forgetting self when accessing an attribute inside a method.",
              "Modelling a vague 'Manager' class instead of a real domain idea."
            ],
            "debugging": {
              "prompt": "This BankAccount should hold a balance of 150 after depositing 50 into 100, but it shows 50. Find the bug.",
              "buggyCode": "class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance = amount\nacc = BankAccount(100)\nacc.deposit(50)\nprint(\"Balance:\", acc.balance)",
              "fixedCode": "class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\nacc = BankAccount(100)\nacc.deposit(50)\nprint(\"Balance:\", acc.balance)",
              "explanation": "deposit must add to the balance (+=), not replace it (=) — assignment throws away the existing balance."
            },
            "miniChallenge": "Extend the exercise: apply classes and objects to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A class is a blueprint; objects are instances with their own state. __init__ sets up initial state, and methods use self to work on their own object.",
            "quiz": [
              {
                "question": "What is the difference between a class and an object?",
                "options": [
                  "They are the same thing",
                  "A class is the blueprint; an object is an instance built from it",
                  "A class holds data, an object holds code",
                  "An object is compiled, a class is not"
                ],
                "answer": 1,
                "explanation": "The class defines structure and behaviour; each object is a separate instance with its own state."
              },
              {
                "question": "What does __init__ do?",
                "options": [
                  "It deletes the object",
                  "It runs when an object is created to set up its initial state",
                  "It prints the object",
                  "It imports the class"
                ],
                "answer": 1,
                "explanation": "__init__ initialises a new object, typically assigning its attributes."
              }
            ],
            "exercise": {
              "title": "Deposit into an account",
              "type": "build-function",
              "instructions": "Write a program that reads a starting balance and a deposit amount, then prints exactly: Balance: <n>. Use a BankAccount class with a deposit method.",
              "starterCode": "class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        # add amount to the balance\n        pass\n\nstart = int(input())\namount = int(input())\nacc = BankAccount(start)\nacc.deposit(amount)\nprint(f\"Balance: {acc.balance}\")",
              "solution": "class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n\nstart = int(input())\namount = int(input())\nacc = BankAccount(start)\nacc.deposit(amount)\nprint(f\"Balance: {acc.balance}\")",
              "solutionExplanation": "The deposit method adds the amount to self.balance with +=; the program then prints the updated balance.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100 + 50",
                  "hidden": false,
                  "stdin": "100\n50\n",
                  "expectedStdout": "Balance: 150"
                },
                {
                  "name": "0 + 25",
                  "hidden": true,
                  "stdin": "0\n25\n",
                  "expectedStdout": "Balance: 25"
                }
              ],
              "hintNotes": {
                "concept": "A deposit adds money to the existing balance — it never replaces it.",
                "approach": "Implement deposit with self.balance += amount.",
                "structure": "Structure: the class, then read the two numbers, create the account, deposit, print."
              },
              "id": "ood-m1-l1-e1"
            }
          },
          {
            "id": "ood-m1-l2",
            "slug": "ood-m1-l2",
            "title": "Encapsulation and Abstraction",
            "objectives": [
              "Explain what encapsulation and abstraction means and where it appears in real systems",
              "Apply encapsulation and abstraction to a small realistic problem",
              "Recognise the common mistakes people make with encapsulation and abstraction"
            ],
            "introduction": "Here you will get hands-on with encapsulation and abstraction: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Encapsulation means bundling data with the methods that operate on it and hiding the internal details behind a clean interface. In Python the convention is a leading underscore for 'private' attributes like _balance, and properties let you control access — a balance property can refuse a negative value instead of letting any code set it directly. Abstraction is the other side: callers work with what an object does, not how it does it, so you can change the implementation without changing every caller. Together they are why object-oriented code stays maintainable: the surface stays small and stable while the insides are free to change.",
            "syntax": "private by convention: _balance; controlled access via @property",
            "analogy": "Encapsulation is like a vending machine: you press buttons (the interface) and get a drink; you never reach inside to move the cans around yourself.",
            "exampleCode": "class BankAccount:\n    def __init__(self):\n        self._balance = 0\n    @property\n    def balance(self):\n        return self._balance\n    def deposit(self, amount):\n        if amount > 0:\n            self._balance += amount\nacc = BankAccount()\nacc.deposit(30)\nprint(\"Balance:\", acc.balance)",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where encapsulation and abstraction does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Letting outside code set _balance directly and bypass the rules.",
              "Adding validation in every caller instead of once inside the class.",
              "Exposing every internal detail as a public attribute."
            ],
            "debugging": {
              "prompt": "This deposit should refuse a negative amount, but it accepts -50. Find the bug.",
              "buggyCode": "class BankAccount:\n    def __init__(self):\n        self._balance = 100\n    def deposit(self, amount):\n        self._balance += amount\nacc = BankAccount()\nacc.deposit(-50)\nprint(\"Balance:\", acc.balance)",
              "fixedCode": "class BankAccount:\n    def __init__(self):\n        self._balance = 100\n    def deposit(self, amount):\n        if amount > 0:\n            self._balance += amount\nacc = BankAccount()\nacc.deposit(-50)\nprint(\"Balance:\", acc.balance)",
              "explanation": "The method never validates the amount; a guard `if amount > 0` refuses negative deposits."
            },
            "miniChallenge": "Extend the exercise: apply encapsulation and abstraction to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Encapsulation hides an object's internals behind methods that enforce its rules; abstraction lets callers use what an object does without knowing how it does it.",
            "quiz": [
              {
                "question": "What does encapsulation protect?",
                "options": [
                  "The source code from being read",
                  "An object's internal state from being changed in invalid ways",
                  "The program from running",
                  "The database from queries"
                ],
                "answer": 1,
                "explanation": "Encapsulation hides internals so state can only change through methods that enforce the rules."
              },
              {
                "question": "What is the Python convention for a private attribute?",
                "options": [
                  "A double underscore only",
                  "A single leading underscore, e.g. _balance",
                  "Capital letters",
                  "The word private"
                ],
                "answer": 1,
                "explanation": "A leading underscore signals 'internal, do not touch from outside' by convention."
              }
            ],
            "exercise": {
              "title": "Guarded deposit",
              "type": "build-function",
              "instructions": "Write a program that reads a starting balance and a deposit amount, then prints exactly: Balance: <n>. Deposits of zero or less must be ignored.",
              "starterCode": "class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        # ignore non-positive amounts\n        pass\n\nstart = int(input())\namount = int(input())\nacc = BankAccount(start)\nacc.deposit(amount)\nprint(f\"Balance: {acc.balance}\")",
              "solution": "class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        if amount > 0:\n            self.balance += amount\n\nstart = int(input())\namount = int(input())\nacc = BankAccount(start)\nacc.deposit(amount)\nprint(f\"Balance: {acc.balance}\")",
              "solutionExplanation": "Guard the deposit with `if amount > 0` so invalid amounts leave the balance unchanged.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100 + 50",
                  "hidden": false,
                  "stdin": "100\n50\n",
                  "expectedStdout": "Balance: 150"
                },
                {
                  "name": "100 + -20 ignored",
                  "hidden": true,
                  "stdin": "100\n-20\n",
                  "expectedStdout": "Balance: 100"
                }
              ],
              "hintNotes": {
                "concept": "Encapsulation lets the class enforce its own rules instead of trusting every caller.",
                "approach": "Add a guard `if amount > 0:` before updating the balance.",
                "structure": "Structure: the class with the guarded deposit, then read, create, deposit, print."
              },
              "id": "ood-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "ood-m2",
        "title": "SOLID Principles",
        "description": "The five principles that keep object-oriented code flexible.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "ood-m2-l1",
            "slug": "ood-m2-l1",
            "title": "SOLID Principles Part 1",
            "objectives": [
              "Explain what SOLID principles (SRP, OCP, LSP) means and where it appears in real systems",
              "Apply SOLID principles (SRP, OCP, LSP) to a small realistic problem",
              "Recognise the common mistakes people make with SOLID principles (SRP, OCP, LSP)"
            ],
            "introduction": "In this lesson you will see SOLID principles (SRP, OCP, LSP) in action, work through a guided example, and practise it yourself.",
            "concept": "SOLID is five principles for keeping classes changeable without breaking everything around them. Single Responsibility says a class should have one reason to change — a Report class should not also send emails. Open/Closed says a class should be open for extension but closed for modification: add new behaviour by adding new code, not by editing old code, usually through polymorphism. Liskov Substitution says a subclass must be usable wherever its parent is expected — if a subclass breaks the parent's contract, the hierarchy is wrong. These three are about shape: small classes, extension points, and honest hierarchies.",
            "syntax": "S: one reason to change; O: extend, don't modify; L: subclasses honour the parent contract",
            "analogy": "SOLID is like building with Lego: each brick does one job, you add new bricks instead of sawing old ones apart, and any brick fits any socket of the same shape.",
            "exampleCode": "class Bird:\n    def fly(self):\n        return \"flying\"\nclass Penguin(Bird):\n    def fly(self):\n        raise NotImplementedError(\"penguins cannot fly\")\nprint(\"A Penguin that cannot fly breaks Liskov substitution.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how SOLID principles (SRP, OCP, LSP) is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Splitting a class into pieces so small that nothing is coherent.",
              "Subclassing to reuse code while breaking the parent's contract.",
              "Editing a stable class for every new feature instead of extending it."
            ],
            "debugging": {
              "prompt": "This class violates Single Responsibility by also sending email. What is the fix?",
              "buggyCode": "class Report:\n    def generate(self):\n        return \"report data\"\n    def send_email(self, to):\n        print(f\"Emailing report to {to}\")",
              "fixedCode": "class Report:\n    def generate(self):\n        return \"report data\"\nclass EmailSender:\n    def send(self, report, to):\n        print(f\"Emailing report to {to}\")",
              "explanation": "Split the responsibilities: Report generates, EmailSender sends — each class then has one reason to change."
            },
            "miniChallenge": "Extend the exercise: apply SOLID principles (SRP, OCP, LSP) to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "SOLID's first three principles: one responsibility per class, extend without modifying, and subclasses that honour the parent's contract wherever it is used.",
            "quiz": [
              {
                "question": "What does the Single Responsibility Principle say?",
                "options": [
                  "A class should do everything",
                  "A class should have one reason to change",
                  "A class should have one method",
                  "A class should never change"
                ],
                "answer": 1,
                "explanation": "SRP: a class has a single responsibility, so it changes for one reason only."
              },
              {
                "question": "What does Liskov Substitution require?",
                "options": [
                  "Subclasses must be usable wherever the parent class is expected",
                  "Subclasses must add new methods",
                  "Subclasses must be smaller",
                  "Subclasses must not override anything"
                ],
                "answer": 0,
                "explanation": "LSP: if code works with the parent, it must work with any subclass without surprises."
              }
            ],
            "exercise": {
              "title": "Spot the SRP violation",
              "type": "multiple-choice",
              "instructions": "Which class most clearly violates the Single Responsibility Principle?",
              "starterCode": "",
              "solution": "UserManager that creates users, hashes passwords, sends welcome emails, and writes audit logs",
              "solutionExplanation": "A class with four unrelated jobs has four reasons to change. The others each do one thing: a class that only sends email, only formats a report, or only validates an address.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Count the reasons a class would have to change — one job means one reason.",
                "approach": "Look for the class doing several unrelated things at once.",
                "structure": "Structure: SRP = one responsibility per class; pick the class with many jobs."
              },
              "options": [
                "EmailSender that sends emails",
                "ReportFormatter that formats reports",
                "UserManager that creates users, hashes passwords, sends welcome emails, and writes audit logs",
                "AddressValidator that validates addresses"
              ],
              "answerIndex": 2,
              "id": "ood-m2-l1-e1"
            }
          },
          {
            "id": "ood-m2-l2",
            "slug": "ood-m2-l2",
            "title": "SOLID Principles Part 2",
            "objectives": [
              "Explain what SOLID principles (ISP, DIP) means and where it appears in real systems",
              "Apply SOLID principles (ISP, DIP) to a small realistic problem",
              "Recognise the common mistakes people make with SOLID principles (ISP, DIP)"
            ],
            "introduction": "Here you will get hands-on with SOLID principles (ISP, DIP): first the idea, then an example, then your own attempt in the exercise.",
            "concept": "The last two SOLID principles are about dependencies. Interface Segregation says clients should not be forced to depend on methods they do not use: a single fat interface with twenty methods forces every implementer to stub out the ones they don't need, so split it into small, focused interfaces. Dependency Inversion says high-level modules should not depend on low-level modules; both should depend on abstractions. In practice that means a service takes a database interface as a constructor argument instead of creating a concrete MySQL connection itself — which is also what makes the service testable with a fake. Together, ISP and DIP keep the seams of a system small and swappable.",
            "syntax": "I: small focused interfaces; D: depend on abstractions, inject them",
            "analogy": "Dependency inversion is like a lamp that takes any bulb fitting the socket: the lamp (high-level) depends on the socket shape (abstraction), not on one brand of bulb.",
            "exampleCode": "class Notifier:\n    def __init__(self, sender):\n        self.sender = sender\n    def notify(self, msg):\n        self.sender.send(msg)\nclass ConsoleSender:\n    def send(self, msg):\n        print(\"Sent:\", msg)\nNotifier(ConsoleSender()).notify(\"hello\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where SOLID principles (ISP, DIP) does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Creating concrete dependencies inside a class instead of injecting them.",
              "Forcing every implementer to stub out methods of a fat interface.",
              "Depending on a concrete class and then needing a subclass to test it."
            ],
            "debugging": {
              "prompt": "This service creates its own database connection, making it untestable. What is the fix?",
              "buggyCode": "class OrderService:\n    def __init__(self):\n        self.db = MySQLConnection()\n    def total(self):\n        return self.db.query(\"SELECT ...\")",
              "fixedCode": "class OrderService:\n    def __init__(self, db):\n        self.db = db\n    def total(self):\n        return self.db.query(\"SELECT ...\")",
              "explanation": "Inject the database through the constructor (dependency inversion) so tests can pass a fake."
            },
            "miniChallenge": "Extend the exercise: apply SOLID principles (ISP, DIP) to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Interface Segregation keeps interfaces small and focused; Dependency Inversion makes high-level code depend on abstractions that can be injected and swapped.",
            "quiz": [
              {
                "question": "What does Dependency Inversion achieve?",
                "options": [
                  "Faster code",
                  "High-level code depends on abstractions, so low-level details can be swapped or faked in tests",
                  "Fewer classes",
                  "No interfaces are needed"
                ],
                "answer": 1,
                "explanation": "Depending on an abstraction lets you inject a real implementation in production and a fake in tests."
              },
              {
                "question": "What is the problem with a fat interface?",
                "options": [
                  "It is too fast",
                  "Implementers must stub out methods they do not use",
                  "It has too few methods",
                  "It cannot be tested"
                ],
                "answer": 1,
                "explanation": "Interface Segregation: split fat interfaces so clients only depend on what they actually use."
              }
            ],
            "exercise": {
              "title": "Inject a fake sender",
              "type": "build-function",
              "instructions": "Write a program that reads a message and prints exactly: Sent: <msg>. Build a Notifier that takes a sender object and calls sender.send(msg); use a ConsoleSender that prints 'Sent: <msg>'.",
              "starterCode": "class ConsoleSender:\n    def send(self, msg):\n        print(f\"Sent: {msg}\")\n\nclass Notifier:\n    def __init__(self, sender):\n        self.sender = sender\n    def notify(self, msg):\n        # delegate to the sender\n        pass\n\nmsg = input()\nNotifier(ConsoleSender()).notify(msg)",
              "solution": "class ConsoleSender:\n    def send(self, msg):\n        print(f\"Sent: {msg}\")\n\nclass Notifier:\n    def __init__(self, sender):\n        self.sender = sender\n    def notify(self, msg):\n        self.sender.send(msg)\n\nmsg = input()\nNotifier(ConsoleSender()).notify(msg)",
              "solutionExplanation": "The Notifier stores the injected sender and delegates notify() to sender.send(msg) — it never creates a sender itself.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "hello",
                  "hidden": false,
                  "stdin": "hello\n",
                  "expectedStdout": "Sent: hello"
                },
                {
                  "name": "order shipped",
                  "hidden": true,
                  "stdin": "order shipped\n",
                  "expectedStdout": "Sent: order shipped"
                }
              ],
              "hintNotes": {
                "concept": "Dependency inversion: the Notifier depends on a sender abstraction, not a concrete class.",
                "approach": "Store the sender in __init__ and call self.sender.send(msg) in notify.",
                "structure": "Structure: sender class, Notifier class with injection, then read and notify."
              },
              "id": "ood-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "ood-m3",
        "title": "Design Patterns",
        "description": "Reusable solutions: creational, structural, and behavioural patterns.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "ood-m3-l1",
            "slug": "ood-m3-l1",
            "title": "Creational Patterns",
            "objectives": [
              "Explain what creational patterns means and where it appears in real systems",
              "Apply creational patterns to a small realistic problem",
              "Recognise the common mistakes people make with creational patterns"
            ],
            "introduction": "This lesson introduces creational patterns. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Creational patterns solve the problem of how objects get made. A Factory Method lets a class defer instantiation to subclasses, so the code that uses the object never names the concrete class. A Builder constructs a complex object step by step — think of building an HTTP request with method, headers, and body — instead of a constructor with ten parameters. A Singleton guarantees exactly one instance, useful for a configuration object, though it is often overused and makes testing harder. The unifying idea is to separate the knowledge of how to build an object from the code that uses it.",
            "syntax": "Factory: create without naming the class; Builder: step-by-step construction; Singleton: one instance",
            "analogy": "A factory is like a car dealership: you ask for a car of a type and they hand you one, without you needing to know how the factory floor built it.",
            "exampleCode": "class Dog:\n    def speak(self):\n        return \"woof\"\nclass Cat:\n    def speak(self):\n        return \"meow\"\ndef make_animal(kind):\n    return {\"dog\": Dog, \"cat\": Cat}[kind]()\nprint(make_animal(\"dog\").speak())",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem creational patterns solves in plain words.",
              "Follow the example step by step and note where creational patterns changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Using a Singleton for everything and making the code untestable.",
              "Building a factory for a single class with no variation.",
              "Letting the Builder return a half-built object."
            ],
            "debugging": {
              "prompt": "This factory crashes for an unknown animal kind. What is the safest fix?",
              "buggyCode": "def make_animal(kind):\n    return {\"dog\": Dog, \"cat\": Cat}[kind]()",
              "fixedCode": "def make_animal(kind):\n    animals = {\"dog\": Dog, \"cat\": Cat}\n    if kind not in animals:\n        raise ValueError(f\"Unknown animal: {kind}\")\n    return animals[kind]()",
              "explanation": "A direct dict lookup raises a bare KeyError; checking first and raising a clear ValueError names the problem."
            },
            "miniChallenge": "Extend the exercise: apply creational patterns to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Creational patterns separate how objects are built from how they are used: factories choose the class, builders assemble complex objects step by step, singletons guarantee one instance.",
            "quiz": [
              {
                "question": "What problem does a Factory solve?",
                "options": [
                  "Too many classes",
                  "Creating objects without the caller naming the concrete class",
                  "Slow object creation",
                  "Too much memory"
                ],
                "answer": 1,
                "explanation": "A factory centralises creation so callers ask for a kind and get an object, decoupled from the concrete class."
              },
              {
                "question": "When is a Builder the right choice?",
                "options": [
                  "For a simple object with one field",
                  "For a complex object built step by step with many optional parts",
                  "For a singleton",
                  "For a loop"
                ],
                "answer": 1,
                "explanation": "Builders shine when an object has many optional pieces — each step adds one, and the result is complete at the end."
              }
            ],
            "exercise": {
              "title": "Animal factory",
              "type": "build-function",
              "instructions": "Write a program that reads an animal kind (dog or cat) and prints its sound: woof for dog, meow for cat. Use a factory function make_animal(kind) returning the right object.",
              "starterCode": "class Dog:\n    def speak(self):\n        return \"woof\"\nclass Cat:\n    def speak(self):\n        return \"meow\"\n\ndef make_animal(kind):\n    # return Dog() or Cat()\n    pass\n\nkind = input().strip()\nprint(make_animal(kind).speak())",
              "solution": "class Dog:\n    def speak(self):\n        return \"woof\"\nclass Cat:\n    def speak(self):\n        return \"meow\"\n\ndef make_animal(kind):\n    return {\"dog\": Dog, \"cat\": Cat}[kind]()\n\nkind = input().strip()\nprint(make_animal(kind).speak())",
              "solutionExplanation": "The factory maps the kind string to a class and instantiates it; the caller only uses the returned object's speak() method.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "dog",
                  "hidden": false,
                  "stdin": "dog\n",
                  "expectedStdout": "woof"
                },
                {
                  "name": "cat",
                  "hidden": true,
                  "stdin": "cat\n",
                  "expectedStdout": "meow"
                }
              ],
              "hintNotes": {
                "concept": "A factory hides which concrete class gets built — the caller just names the kind.",
                "approach": "Map the kind to the class in a dict and call it to create the object.",
                "structure": "Structure: two classes, the factory, then read the kind and print the sound."
              },
              "id": "ood-m3-l1-e1"
            }
          },
          {
            "id": "ood-m3-l2",
            "slug": "ood-m3-l2",
            "title": "Structural Patterns",
            "objectives": [
              "Explain what structural patterns means and where it appears in real systems",
              "Apply structural patterns to a small realistic problem",
              "Recognise the common mistakes people make with structural patterns"
            ],
            "introduction": "This lesson introduces structural patterns. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Structural patterns organise how classes and objects fit together. An Adapter lets two incompatible interfaces work together — like wrapping a legacy payment API so the rest of the code sees the new interface. A Decorator adds behaviour by wrapping an object, so you can stack logging, caching, and validation around a core object without changing it. A Composite treats a single object and a group of objects uniformly, which is how a file and a folder can both be 'nodes' in a tree. The theme is composition over inheritance: build behaviour by combining objects, not by growing a class hierarchy.",
            "syntax": "Adapter: translate interfaces; Decorator: wrap to add behaviour; Composite: part-whole trees",
            "analogy": "A decorator is like gift wrap: the present inside is unchanged, but each layer of wrapping adds something — a bow, a card, a ribbon — and you can add or remove layers freely.",
            "exampleCode": "class Coffee:\n    def cost(self):\n        return 2\nclass Milk:\n    def __init__(self, drink):\n        self.drink = drink\n    def cost(self):\n        return self.drink.cost() + 1\nprint(\"Coffee with milk:\", Milk(Coffee()).cost())",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem structural patterns solves in plain words.",
              "Follow the example step by step and note where structural patterns changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Reaching for inheritance when composition would be simpler.",
              "Writing an adapter that leaks the old interface through.",
              "Decorating so many layers that nobody can tell what the core object does."
            ],
            "debugging": {
              "prompt": "This decorator should add 1 to the coffee's cost, but the total is wrong. Find the bug.",
              "buggyCode": "class Coffee:\n    def cost(self):\n        return 2\nclass Milk:\n    def __init__(self, drink):\n        self.drink = drink\n    def cost(self):\n        return 1\nprint(Milk(Coffee()).cost())",
              "fixedCode": "class Coffee:\n    def cost(self):\n        return 2\nclass Milk:\n    def __init__(self, drink):\n        self.drink = drink\n    def cost(self):\n        return self.drink.cost() + 1\nprint(Milk(Coffee()).cost())",
              "explanation": "The decorator ignored the wrapped drink and returned a flat 1; it must add to self.drink.cost()."
            },
            "miniChallenge": "Extend the exercise: apply structural patterns to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Structural patterns compose objects: adapters translate interfaces, decorators add behaviour by wrapping, and composites treat parts and wholes uniformly.",
            "quiz": [
              {
                "question": "What does the Decorator pattern do?",
                "options": [
                  "It changes a class's parent",
                  "It wraps an object to add behaviour without modifying it",
                  "It deletes methods",
                  "It creates a singleton"
                ],
                "answer": 1,
                "explanation": "A decorator wraps the original object and adds behaviour around its methods, and decorators can be stacked."
              },
              {
                "question": "When would you use an Adapter?",
                "options": [
                  "To make two incompatible interfaces work together",
                  "To speed up a loop",
                  "To hide a database",
                  "To sort a list"
                ],
                "answer": 0,
                "explanation": "An adapter translates one interface into another so existing code can use a component it was not designed for."
              }
            ],
            "exercise": {
              "title": "Decorate a coffee",
              "type": "build-function",
              "instructions": "Write a program that reads the number of milk add-ons (each costs 1) and prints exactly: Total: <n>. A plain coffee costs 2; each Milk decorator adds 1.",
              "starterCode": "class Coffee:\n    def cost(self):\n        return 2\nclass Milk:\n    def __init__(self, drink):\n        self.drink = drink\n    def cost(self):\n        return self.drink.cost() + 1\n\nn = int(input())\ndrink = Coffee()\nfor _ in range(n):\n    drink = Milk(drink)\nprint(f\"Total: {drink.cost()}\")",
              "solution": "class Coffee:\n    def cost(self):\n        return 2\nclass Milk:\n    def __init__(self, drink):\n        self.drink = drink\n    def cost(self):\n        return self.drink.cost() + 1\n\nn = int(input())\ndrink = Coffee()\nfor _ in range(n):\n    drink = Milk(drink)\nprint(f\"Total: {drink.cost()}\")",
              "solutionExplanation": "Wrap the coffee in a Milk decorator once per add-on; each layer adds 1 to the wrapped drink's cost.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "0 add-ons",
                  "hidden": false,
                  "stdin": "0\n",
                  "expectedStdout": "Total: 2"
                },
                {
                  "name": "3 add-ons",
                  "hidden": true,
                  "stdin": "3\n",
                  "expectedStdout": "Total: 5"
                }
              ],
              "hintNotes": {
                "concept": "Decorators stack: each one wraps the previous drink and adds its own cost.",
                "approach": "Loop n times, wrapping the drink in Milk each time, then print drink.cost().",
                "structure": "Structure: the two classes, then read n, wrap in a loop, print the total."
              },
              "id": "ood-m3-l2-e1"
            }
          },
          {
            "id": "ood-m3-l3",
            "slug": "ood-m3-l3",
            "title": "Behavioural Patterns",
            "objectives": [
              "Explain what behavioural patterns means and where it appears in real systems",
              "Apply behavioural patterns to a small realistic problem",
              "Recognise the common mistakes people make with behavioural patterns"
            ],
            "introduction": "Here you will get hands-on with behavioural patterns: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Behavioural patterns organise how objects communicate and share work. The Observer lets many listeners subscribe to a subject and get notified when it changes — the pattern behind event systems and UI updates. The Strategy encapsulates interchangeable algorithms behind one interface, so a payment can be by card, PayPal, or crypto without the checkout code knowing the difference. The Command turns a request into an object, which makes undo, queuing, and logging possible. The common thread is replacing tangled if/else chains with objects that know their own behaviour.",
            "syntax": "Observer: subscribe and notify; Strategy: swap algorithms; Command: requests as objects",
            "analogy": "The Observer pattern is like a newsletter: readers subscribe once, and every new issue is delivered to all of them automatically — the publisher never tracks the list by hand.",
            "exampleCode": "class Subject:\n    def __init__(self):\n        self.listeners = []\n    def subscribe(self, fn):\n        self.listeners.append(fn)\n    def publish(self, msg):\n        for fn in self.listeners:\n            fn(msg)\nnews = Subject()\nnews.subscribe(lambda m: print(\"Reader got:\", m))\nnews.publish(\"Hello!\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where behavioural patterns does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Using Observer when a single direct call would do.",
              "Letting strategies leak their differences into the caller with isinstance checks.",
              "Storing subscribers but never removing them, causing memory leaks."
            ],
            "debugging": {
              "prompt": "This observer should notify two listeners, but only one is called. Find the bug.",
              "buggyCode": "class Subject:\n    def __init__(self):\n        self.listeners = []\n    def subscribe(self, fn):\n        self.listeners = [fn]\n    def publish(self, msg):\n        for fn in self.listeners:\n            fn(msg)",
              "fixedCode": "class Subject:\n    def __init__(self):\n        self.listeners = []\n    def subscribe(self, fn):\n        self.listeners.append(fn)\n    def publish(self, msg):\n        for fn in self.listeners:\n            fn(msg)",
              "explanation": "subscribe replaced the whole list with [fn] instead of appending, so only the last subscriber survived."
            },
            "miniChallenge": "Extend the exercise: apply behavioural patterns to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Behavioural patterns organise communication: observers subscribe and get notified, strategies swap algorithms behind one interface, and commands turn requests into objects.",
            "quiz": [
              {
                "question": "What is the Observer pattern for?",
                "options": [
                  "Sorting a list",
                  "Letting subscribers get notified automatically when a subject changes",
                  "Creating objects",
                  "Encrypting messages"
                ],
                "answer": 1,
                "explanation": "Observers subscribe once; the subject notifies them all on change, decoupling publisher from subscribers."
              },
              {
                "question": "What does the Strategy pattern replace?",
                "options": [
                  "A class hierarchy",
                  "A tangled if/else chain choosing between algorithms",
                  "A database",
                  "A loop"
                ],
                "answer": 1,
                "explanation": "Strategy puts each algorithm behind one interface so the caller picks one without branching on types."
              }
            ],
            "exercise": {
              "title": "Strategy pricing",
              "type": "build-function",
              "instructions": "Write a program that reads a price and a strategy (regular or sale) and prints exactly: Price: <n>. Regular pays the full price; sale pays 80% of it (integer result).",
              "starterCode": "class Regular:\n    def price(self, amount):\n        return amount\nclass Sale:\n    def price(self, amount):\n        return amount * 80 // 100\n\ndef checkout(strategy, amount):\n    return strategy.price(amount)\n\namount = int(input())\nkind = input().strip()\nstrategy = Sale() if kind == \"sale\" else Regular()\nprint(f\"Price: {checkout(strategy, amount)}\")",
              "solution": "class Regular:\n    def price(self, amount):\n        return amount\nclass Sale:\n    def price(self, amount):\n        return amount * 80 // 100\n\ndef checkout(strategy, amount):\n    return strategy.price(amount)\n\namount = int(input())\nkind = input().strip()\nstrategy = Sale() if kind == \"sale\" else Regular()\nprint(f\"Price: {checkout(strategy, amount)}\")",
              "solutionExplanation": "Each strategy implements price() behind the same interface; checkout just calls it, never branching on the kind itself.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100 regular",
                  "hidden": false,
                  "stdin": "100\nregular\n",
                  "expectedStdout": "Price: 100"
                },
                {
                  "name": "100 sale",
                  "hidden": true,
                  "stdin": "100\nsale\n",
                  "expectedStdout": "Price: 80"
                }
              ],
              "hintNotes": {
                "concept": "A strategy hides the algorithm behind one method name — the caller just calls price().",
                "approach": "Pick the strategy object from the kind, then call checkout with it.",
                "structure": "Structure: two strategy classes, a checkout function, then read and print."
              },
              "id": "ood-m3-l3-e1"
            }
          }
        ]
      },
      {
        "id": "ood-m4",
        "title": "Modelling",
        "description": "UML diagrams and turning a problem domain into classes.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "ood-m4-l1",
            "slug": "ood-m4-l1",
            "title": "UML and Class Diagrams",
            "objectives": [
              "Explain what UML class diagrams means and where it appears in real systems",
              "Apply UML class diagrams to a small realistic problem",
              "Recognise the common mistakes people make with UML class diagrams"
            ],
            "introduction": "In this lesson you will see UML class diagrams in action, work through a guided example, and practise it yourself.",
            "concept": "UML class diagrams are the shared sketch language for object design: a box per class with its name, attributes, and methods, and lines for relationships. An arrow with a hollow triangle means inheritance ('is-a'), a plain line means association ('uses' or 'has'), a filled diamond means composition (the part cannot live without the whole), and a hollow diamond means aggregation (the part can exist alone). Multiplicity on a line says how many: 1, 0..1, or 1..*. Drawing the diagram before coding forces the design questions early — what owns what, and what depends on what — when they are still cheap to answer.",
            "syntax": "box: class + attributes + methods; triangle: inheritance; diamond: composition/aggregation",
            "analogy": "A UML diagram is like an architect's floor plan: it shows the rooms and how they connect, so builders argue about the layout before pouring concrete.",
            "exampleCode": "print(\"Customer 1 -- * Order : places\")\nprint(\"Order * -- * Product : contains\")\nprint(\"Order <>-- OrderLine : composition\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how UML class diagrams is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Drawing every private helper method on the diagram and drowning it in detail.",
              "Using inheritance arrows for 'uses' relationships.",
              "Forgetting multiplicity, so nobody knows if it is one or many."
            ],
            "debugging": {
              "prompt": "This UML line says an Order contains Products, but the multiplicity is wrong for a shop. What should it be?",
              "buggyCode": "print(\"Order 1 -- 1 Product : contains\")",
              "fixedCode": "print(\"Order 1 -- * Product : contains\")",
              "explanation": "An order can contain many products, so the product end must be * (many), not 1."
            },
            "miniChallenge": "Extend the exercise: apply UML class diagrams to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "UML class diagrams sketch classes as boxes and relationships as lines: inheritance, association, composition, and aggregation, with multiplicity saying how many.",
            "quiz": [
              {
                "question": "What does a hollow triangle arrow mean in UML?",
                "options": [
                  "Association",
                  "Inheritance — the subclass points to its parent",
                  "Composition",
                  "Dependency"
                ],
                "answer": 1,
                "explanation": "The hollow triangle denotes generalisation: the subclass inherits from the class the triangle points to."
              },
              {
                "question": "What does a filled diamond mean?",
                "options": [
                  "The part belongs to the whole and cannot exist without it",
                  "The part is optional",
                  "Two classes are equal",
                  "The relationship is temporary"
                ],
                "answer": 0,
                "explanation": "A filled diamond is composition: strong ownership, where destroying the whole destroys the parts."
              }
            ],
            "exercise": {
              "title": "Read the UML relationship",
              "type": "multiple-choice",
              "instructions": "In UML, a class diagram shows: Order <>-- OrderLine (filled diamond). What does this mean?",
              "starterCode": "",
              "solution": "An Order owns its OrderLines; destroying the Order destroys its lines",
              "solutionExplanation": "A filled diamond is composition — strong ownership. The OrderLine cannot exist without its Order, unlike aggregation (hollow diamond) where the part can live alone.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "The filled diamond is the key symbol — it means strong ownership.",
                "approach": "Ask: can the part exist without the whole? A filled diamond says no.",
                "structure": "Structure: filled diamond = composition = the part dies with the whole."
              },
              "options": [
                "An OrderLine can exist without an Order",
                "An Order owns its OrderLines; destroying the Order destroys its lines",
                "Order inherits from OrderLine",
                "Order and OrderLine are unrelated"
              ],
              "answerIndex": 1,
              "id": "ood-m4-l1-e1"
            }
          },
          {
            "id": "ood-m4-l2",
            "slug": "ood-m4-l2",
            "title": "Domain Modelling",
            "objectives": [
              "Explain what domain modelling means and where it appears in real systems",
              "Apply domain modelling to a small realistic problem",
              "Recognise the common mistakes people make with domain modelling"
            ],
            "introduction": "Here you will get hands-on with domain modelling: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Domain modelling is the work of turning a problem area into classes that match how the business actually thinks. Start with the nouns in the requirements — customer, order, product, payment — and the verbs — place, pay, ship — which become classes and methods. Then ask the hard questions: does an Order own its OrderLines, or can a line exist alone? Is a Payment a separate entity or just a field on the Order? The answers come from the domain, not from the code: in a shop, a payment is a real thing with its own lifecycle, so it deserves a class. A model that mirrors the domain is easy to explain to non-programmers and easy to change when the business changes.",
            "syntax": "nouns -> classes; verbs -> methods; ownership questions -> relationships",
            "analogy": "Domain modelling is like writing a play: first you list the characters (nouns) and what they do (verbs), and only then do you build the stage.",
            "exampleCode": "class Order:\n    def __init__(self):\n        self.lines = []\n        self.paid = False\n    def add_line(self, product, qty):\n        self.lines.append((product, qty))\n    def pay(self):\n        self.paid = True\norder = Order()\norder.add_line(\"book\", 2)\norder.pay()\nprint(\"Paid:\", order.paid, \"| Lines:\", len(order.lines))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where domain modelling does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Modelling database tables instead of domain concepts.",
              "Making everything a field on one god class instead of separate entities.",
              "Naming classes after technical things (DataManager) instead of domain things (Order)."
            ],
            "debugging": {
              "prompt": "This Order should track 2 lines after adding two items, but it shows 1. Find the bug.",
              "buggyCode": "class Order:\n    def __init__(self):\n        self.lines = []\n    def add_line(self, product, qty):\n        self.lines = [(product, qty)]\norder = Order()\norder.add_line(\"book\", 2)\norder.add_line(\"pen\", 1)\nprint(\"Lines:\", len(order.lines))",
              "fixedCode": "class Order:\n    def __init__(self):\n        self.lines = []\n    def add_line(self, product, qty):\n        self.lines.append((product, qty))\norder = Order()\norder.add_line(\"book\", 2)\norder.add_line(\"pen\", 1)\nprint(\"Lines:\", len(order.lines))",
              "explanation": "add_line replaced the whole list instead of appending, so only the last line survived."
            },
            "miniChallenge": "Extend the exercise: apply domain modelling to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Domain modelling turns requirements' nouns into classes and verbs into methods, with ownership decided by the domain — and things with their own lifecycle become their own classes.",
            "quiz": [
              {
                "question": "Where do candidate classes come from in domain modelling?",
                "options": [
                  "The programming language",
                  "The nouns in the requirements",
                  "The database tables",
                  "The test files"
                ],
                "answer": 1,
                "explanation": "Nouns in the problem description are the first candidates for classes; verbs suggest methods."
              },
              {
                "question": "Why does a Payment deserve its own class in a shop system?",
                "options": [
                  "It is a large file",
                  "It has its own lifecycle — created, authorised, refunded — independent of the Order",
                  "Payments are always slow",
                  "The database requires it"
                ],
                "answer": 1,
                "explanation": "Things with their own lifecycle and rules are entities in their own right, not fields on another class."
              }
            ],
            "exercise": {
              "title": "Model an order",
              "type": "build-function",
              "instructions": "Write a program that reads the number of items in an order and the total price, then prints exactly: Order: <n> items, total <t>. Use an Order class with add_line and total methods.",
              "starterCode": "class Order:\n    def __init__(self):\n        self.lines = []\n    def add_line(self, qty, price):\n        self.lines.append(qty * price)\n    def total(self):\n        return sum(self.lines)\n\nn = int(input())\nprice = int(input())\norder = Order()\nfor _ in range(n):\n    order.add_line(1, price)\nprint(f\"Order: {n} items, total {order.total()}\")",
              "solution": "class Order:\n    def __init__(self):\n        self.lines = []\n    def add_line(self, qty, price):\n        self.lines.append(qty * price)\n    def total(self):\n        return sum(self.lines)\n\nn = int(input())\nprice = int(input())\norder = Order()\nfor _ in range(n):\n    order.add_line(1, price)\nprint(f\"Order: {n} items, total {order.total()}\")",
              "solutionExplanation": "The Order collects line totals in a list; total() sums them, and the program prints the count and the sum.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "2 items at 10",
                  "hidden": false,
                  "stdin": "2\n10\n",
                  "expectedStdout": "Order: 2 items, total 20"
                },
                {
                  "name": "3 items at 5",
                  "hidden": true,
                  "stdin": "3\n5\n",
                  "expectedStdout": "Order: 3 items, total 15"
                }
              ],
              "hintNotes": {
                "concept": "An Order owns its lines, so the class should collect them and compute the total itself.",
                "approach": "Add one line per item with add_line, then call order.total() for the sum.",
                "structure": "Structure: the Order class, then read n and price, add lines in a loop, print."
              },
              "id": "ood-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "ood-m5",
        "title": "Design Practice",
        "description": "Refactoring a messy class and designing a library system.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "ood-m5-l1",
            "slug": "ood-m5-l1",
            "title": "Refactoring a God Class",
            "objectives": [
              "Explain what refactoring a god class means and where it appears in real systems",
              "Apply refactoring a god class to a small realistic problem",
              "Recognise the common mistakes people make with refactoring a god class"
            ],
            "introduction": "Here you will get hands-on with refactoring a god class: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A god class is a class that does everything — it has dozens of methods, touches every part of the system, and changes for every reason. Refactoring it starts by finding clusters of methods and fields that belong together and extracting them into their own classes, one cluster at a time, with tests pinning the behaviour before each move. The Extract Method step comes first: pull a block of code into a named method so its purpose is visible. Then Extract Class: move the method and its fields into a new class, and let the old class delegate to it. Done in small steps with tests green throughout, the god class shrinks into a coordinator that delegates to focused collaborators.",
            "syntax": "1. tests first 2. extract method 3. extract class 4. delegate",
            "analogy": "Refactoring a god class is like tidying a junk drawer: first you group the batteries, the screws, and the cables, then each group gets its own small box, and the drawer just holds the boxes.",
            "exampleCode": "class Report:\n    def generate(self):\n        return \"data\"\nclass Emailer:\n    def send(self, report):\n        return f\"sent: {report}\"\nreport = Report().generate()\nprint(Emailer().send(report))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where refactoring a god class does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Refactoring without tests and discovering the breakage in production.",
              "Extracting a class but leaving the old class doing the work too.",
              "Rewriting from scratch instead of refactoring in small steps."
            ],
            "debugging": {
              "prompt": "This 'refactored' code still does everything in one class. What is missing?",
              "buggyCode": "class Report:\n    def generate(self):\n        return \"data\"\n    def send_email(self, to):\n        print(f\"Emailing to {to}\")\n    def save_to_disk(self, path):\n        print(f\"Saving to {path}\")",
              "fixedCode": "class Report:\n    def generate(self):\n        return \"data\"\nclass Emailer:\n    def send(self, report, to):\n        print(f\"Emailing to {to}\")\nclass Saver:\n    def save(self, report, path):\n        print(f\"Saving to {path}\")",
              "explanation": "Nothing was extracted: the email and save responsibilities still live in Report. Each belongs in its own class."
            },
            "miniChallenge": "Extend the exercise: apply refactoring a god class to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Refactor a god class in small tested steps: extract methods to name behaviour, then extract classes to move each responsibility into its own collaborator.",
            "quiz": [
              {
                "question": "What is the first step when refactoring a god class?",
                "options": [
                  "Delete half the methods",
                  "Pin the current behaviour with tests, then extract in small steps",
                  "Rewrite it from scratch",
                  "Rename the class"
                ],
                "answer": 1,
                "explanation": "Tests first: they prove each small extraction did not change behaviour."
              },
              {
                "question": "What does Extract Class do?",
                "options": [
                  "It deletes a class",
                  "It moves a cluster of methods and fields into a new class the old one delegates to",
                  "It renames a class",
                  "It merges two classes"
                ],
                "answer": 1,
                "explanation": "Extract Class carves a coherent cluster out of the god class into a focused collaborator."
              }
            ],
            "exercise": {
              "title": "Extract an emailer",
              "type": "build-function",
              "instructions": "Write a program that reads a report name and prints exactly: Sent: <name>. Use a Report class with generate() returning the name and an Emailer class whose send(report) prints the message.",
              "starterCode": "class Report:\n    def __init__(self, name):\n        self.name = name\n    def generate(self):\n        return self.name\n\nclass Emailer:\n    def send(self, report):\n        print(f\"Sent: {report}\")\n\nname = input().strip()\nEmailer().send(Report(name).generate())",
              "solution": "class Report:\n    def __init__(self, name):\n        self.name = name\n    def generate(self):\n        return self.name\n\nclass Emailer:\n    def send(self, report):\n        print(f\"Sent: {report}\")\n\nname = input().strip()\nEmailer().send(Report(name).generate())",
              "solutionExplanation": "The Report only generates; the Emailer only sends — the two responsibilities are separate classes, and main wires them together.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "sales",
                  "hidden": false,
                  "stdin": "sales\n",
                  "expectedStdout": "Sent: sales"
                },
                {
                  "name": "weekly",
                  "hidden": true,
                  "stdin": "weekly\n",
                  "expectedStdout": "Sent: weekly"
                }
              ],
              "hintNotes": {
                "concept": "Each class does one job: Report generates, Emailer sends.",
                "approach": "Create the Report, call generate(), and pass the result to Emailer.send.",
                "structure": "Structure: two small classes, then read the name and wire them together."
              },
              "id": "ood-m5-l1-e1"
            }
          },
          {
            "id": "ood-m5-l2",
            "slug": "ood-m5-l2",
            "title": "Designing a Library System",
            "objectives": [
              "Explain what designing a library system means and where it appears in real systems",
              "Apply designing a library system to a small realistic problem",
              "Recognise the common mistakes people make with designing a library system"
            ],
            "introduction": "This lesson introduces designing a library system. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A library system is a good capstone design because its domain is familiar and its rules are real: books, members, loans, and fines. A Book has copies; a Loan links one member to one copy with a due date; a Member may borrow only up to a limit and may not borrow while they owe fines. The design decisions are about ownership — the Library owns the catalogue, a Loan belongs to a Member and a Copy — and about where the rules live: the borrow limit is enforced by the Library's lend() method, not by the caller remembering to check. The patterns from this track fit naturally: a factory creates loans, an observer notifies members of overdue books, and the catalogue is a repository the rest of the code depends on through an interface.",
            "syntax": "Book -> Copy; Member -> Loan -> Copy; Library.lend() enforces the rules",
            "analogy": "Designing a library is like designing a kitchen: the pantry (catalogue), the borrowers (members), and the lending rules all have their place, and the rules live in one spot so nobody forgets them.",
            "exampleCode": "class Library:\n    def __init__(self):\n        self.loans = {}\n    def lend(self, member, book):\n        if member in self.loans:\n            return \"already borrowing\"\n        self.loans[member] = book\n        return f\"lent {book} to {member}\"\nlib = Library()\nprint(lib.lend(\"Ada\", \"Dune\"))\nprint(lib.lend(\"Ada\", \"Dune\"))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem designing a library system solves in plain words.",
              "Follow the example step by step and note where designing a library system changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Letting callers enforce the borrow rules instead of the Library.",
              "Modelling a Loan as a field on the Book instead of its own entity.",
              "Forgetting the due date — a loan without a return date is not a loan."
            ],
            "debugging": {
              "prompt": "This lend() allows the same member to borrow the same book twice. Find the bug.",
              "buggyCode": "class Library:\n    def __init__(self):\n        self.loans = {}\n    def lend(self, member, book):\n        self.loans[member] = book\n        return f\"lent {book} to {member}\"",
              "fixedCode": "class Library:\n    def __init__(self):\n        self.loans = {}\n    def lend(self, member, book):\n        if member in self.loans:\n            return \"already borrowing\"\n        self.loans[member] = book\n        return f\"lent {book} to {member}\"",
              "explanation": "lend() never checks whether the member already has a loan; a guard on `member in self.loans` refuses the second borrow."
            },
            "miniChallenge": "Extend the exercise: apply designing a library system to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A library design centres on ownership — the Library owns the catalogue and the loans — with rules like the borrow limit enforced inside lend(), where they cannot be forgotten.",
            "quiz": [
              {
                "question": "Where should the borrow limit be enforced?",
                "options": [
                  "In the caller, before calling lend()",
                  "Inside the Library's lend() method, so the rule lives in one place",
                  "In the Book class",
                  "Nowhere — limits are optional"
                ],
                "answer": 1,
                "explanation": "Rules enforced inside lend() cannot be forgotten by callers; the rule has one home."
              },
              {
                "question": "What owns a Loan in this design?",
                "options": [
                  "The Book",
                  "The Library, linking a Member to a Copy with a due date",
                  "The Member's name",
                  "The catalogue"
                ],
                "answer": 1,
                "explanation": "A Loan is a relationship between a Member and a Copy, owned and tracked by the Library."
              }
            ],
            "exercise": {
              "title": "Library lending rule",
              "type": "build-function",
              "instructions": "Write a program that reads a member name and a book title, then prints exactly: Lent <book> to <member>. If the same member borrows twice in one run, print already borrowing for the second request. Input has two lines: member, book — the program lends the same member the same book twice to demonstrate the rule.",
              "starterCode": "class Library:\n    def __init__(self):\n        self.loans = {}\n    def lend(self, member, book):\n        if member in self.loans:\n            return \"already borrowing\"\n        self.loans[member] = book\n        return f\"Lent {book} to {member}\"\n\nmember = input().strip()\nbook = input().strip()\nlib = Library()\nprint(lib.lend(member, book))\nprint(lib.lend(member, book))",
              "solution": "class Library:\n    def __init__(self):\n        self.loans = {}\n    def lend(self, member, book):\n        if member in self.loans:\n            return \"already borrowing\"\n        self.loans[member] = book\n        return f\"Lent {book} to {member}\"\n\nmember = input().strip()\nbook = input().strip()\nlib = Library()\nprint(lib.lend(member, book))\nprint(lib.lend(member, book))",
              "solutionExplanation": "The Library tracks loans in a dict and refuses a second loan to a member who already has one; calling lend twice shows both outcomes.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Ada borrows Dune",
                  "hidden": false,
                  "stdin": "Ada\nDune\n",
                  "expectedStdout": "Lent Dune to Ada\nalready borrowing"
                },
                {
                  "name": "Bob borrows 1984",
                  "hidden": true,
                  "stdin": "Bob\n1984\n",
                  "expectedStdout": "Lent 1984 to Bob\nalready borrowing"
                }
              ],
              "hintNotes": {
                "concept": "The rule lives in lend(): check the loans dict before recording a new loan.",
                "approach": "Guard with `if member in self.loans` and return 'already borrowing'.",
                "structure": "Structure: the Library class, then read member and book, call lend twice, print both results."
              },
              "id": "ood-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "functional-programming",
    "slug": "functional-programming",
    "language": "javascript",
    "category": "cs-career",
    "title": "Functional Programming",
    "description": "Think in functions: pure functions, immutability, map/filter/reduce, composition, currying, recursion, and closures — in JavaScript.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Pure functions",
      "Immutability",
      "map/filter/reduce",
      "Higher-order functions",
      "Function composition",
      "Currying",
      "Recursion",
      "Closures"
    ],
    "prerequisites": [
      "Basic JavaScript programming"
    ],
    "modules": [
      {
        "id": "functional-programming-m1",
        "title": "Functional Foundations",
        "description": "Pure functions, immutability, and why they matter.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "functional-programming-m1-l1",
            "slug": "functional-programming-m1-l1",
            "title": "What Is Functional Programming",
            "objectives": [
              "Explain what functional programming means and where it appears in real systems",
              "Apply functional programming to a small realistic problem",
              "Recognise the common mistakes people make with functional programming"
            ],
            "introduction": "In this lesson you will see functional programming in action, work through a guided example, and practise it yourself.",
            "concept": "Functional programming treats computation as the evaluation of functions, not as a sequence of commands that mutate state. Instead of changing a variable in place, you compute a new value; instead of a loop that accumulates a total, you describe the transformation of a list. The payoff is code that is easier to reason about, because a function's result depends only on its inputs — the same inputs always give the same output, which makes testing almost trivial. JavaScript supports the style well: functions are first-class values, so you can pass them around, return them, and store them in variables like any other data.",
            "syntax": "functions as values; new values instead of mutation; same input -> same output",
            "analogy": "Functional programming is like a recipe that never touches the ingredients: it takes flour and eggs and returns a cake, leaving the original ingredients untouched.",
            "exampleCode": "const double = (x) => x * 2;\nconst nums = [1, 2, 3];\nconsole.log(nums.map(double));\nconsole.log(\"Original unchanged:\", nums);",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Read the example and trace how functional programming is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Mutating the input array and calling it functional.",
              "Using a for loop with a side effect where map would say what you mean.",
              "Assuming map changes the original array."
            ],
            "debugging": {
              "prompt": "This function should double each number without changing the original array, but it mutates it. Find the bug.",
              "buggyCode": "const nums = [1, 2, 3];\nfor (let i = 0; i < nums.length; i++) nums[i] = nums[i] * 2;\nconsole.log(nums);",
              "fixedCode": "const nums = [1, 2, 3];\nconst doubled = nums.map((x) => x * 2);\nconsole.log(doubled);",
              "explanation": "The loop mutates the array in place; map returns a new array and leaves the original unchanged."
            },
            "miniChallenge": "Extend the exercise: apply functional programming to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Functional programming computes new values with functions instead of mutating state; JavaScript's first-class functions make the style natural.",
            "quiz": [
              {
                "question": "What is the core idea of functional programming?",
                "options": [
                  "Mutating state as fast as possible",
                  "Computing new values with functions instead of mutating state",
                  "Avoiding functions entirely",
                  "Using only loops"
                ],
                "answer": 1,
                "explanation": "FP favours pure functions and new values over in-place mutation and hidden state."
              },
              {
                "question": "Why are functions called first-class in JavaScript?",
                "options": [
                  "They run faster",
                  "They can be passed around, returned, and stored like any other value",
                  "They are compiled first",
                  "They cannot take arguments"
                ],
                "answer": 1,
                "explanation": "First-class means functions are ordinary values: assignable, passable, and returnable."
              }
            ],
            "exercise": {
              "title": "Double numbers without mutation",
              "type": "write-code",
              "instructions": "Write a program that reads numbers separated by spaces and prints the doubled numbers separated by spaces. Use map; do not mutate the input array.",
              "starterCode": "import * as fs from 'node:fs';\nconst nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\n// print nums.map(x => x * 2) joined by spaces",
              "solution": "import * as fs from 'node:fs';\nconst nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\nconsole.log(nums.map((x) => x * 2).join(' '));",
              "solutionExplanation": "map transforms each element into a new array; join with a space for the output format.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "1 2 3",
                  "hidden": false,
                  "stdin": "1 2 3\n",
                  "expectedStdout": "2 4 6"
                },
                {
                  "name": "5 10",
                  "hidden": true,
                  "stdin": "5 10\n",
                  "expectedStdout": "10 20"
                }
              ],
              "hintNotes": {
                "concept": "map builds a new array — the original stays untouched, which is the functional way.",
                "approach": "Read stdin, split on whitespace, map each number to its double, join with spaces.",
                "structure": "Structure: read and parse the numbers, then one console.log with map and join."
              },
              "id": "functional-programming-m1-l1-e1"
            }
          },
          {
            "id": "functional-programming-m1-l2",
            "slug": "functional-programming-m1-l2",
            "title": "Pure Functions and Immutability",
            "objectives": [
              "Explain what pure functions and immutability means and where it appears in real systems",
              "Apply pure functions and immutability to a small realistic problem",
              "Recognise the common mistakes people make with pure functions and immutability"
            ],
            "introduction": "Here you will get hands-on with pure functions and immutability: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A pure function has two properties: its result depends only on its arguments, and it has no side effects — it does not change anything outside itself, read the clock, or roll dice. Pure functions are predictable (same input, same output), trivially testable (no setup needed), and safe to run in parallel. Immutability is the matching discipline for data: instead of changing an object, you create a new one with the change applied — in JavaScript, the spread operator {...user, age: 31} is the idiom. Together they remove whole classes of bugs: no function can secretly change data another function relies on.",
            "syntax": "pure: same input -> same output, no side effects; immutable: new object, not mutation",
            "analogy": "A pure function is like a calculator: press 2 + 3 and you always get 5, and the calculator never changes the numbers you typed in.",
            "exampleCode": "const add = (a, b) => a + b;\nconsole.log(add(2, 3));\nconst user = { name: \"Ada\", age: 30 };\nconst older = { ...user, age: 31 };\nconsole.log(user.age, older.age);",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where pure functions and immutability does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Reading a global or the clock inside a function and calling it pure.",
              "Mutating an object passed in as an argument.",
              "Using Math.random() inside a function that should be deterministic."
            ],
            "debugging": {
              "prompt": "This 'pure' function secretly depends on a global variable. What is the fix?",
              "buggyCode": "let tax = 0.2;\nconst total = (price) => price + price * tax;",
              "fixedCode": "const total = (price, tax) => price + price * tax;",
              "explanation": "Pass tax as a parameter so the result depends only on the arguments — the function is then truly pure."
            },
            "miniChallenge": "Extend the exercise: apply pure functions and immutability to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Pure functions depend only on their arguments and change nothing; immutability creates new data instead of mutating it — together they make code predictable and testable.",
            "quiz": [
              {
                "question": "Which function is pure?",
                "options": [
                  "One that reads the current time",
                  "One that returns a + b and touches nothing else",
                  "One that writes to a global variable",
                  "One that picks a random number"
                ],
                "answer": 1,
                "explanation": "A pure function's result depends only on its inputs and it changes nothing outside itself."
              },
              {
                "question": "What does {...user, age: 31} do?",
                "options": [
                  "It changes user's age to 31",
                  "It creates a new object with age 31, leaving user unchanged",
                  "It deletes user",
                  "It merges two users"
                ],
                "answer": 1,
                "explanation": "Spread copies the object and overrides age in the copy; the original is untouched."
              }
            ],
            "exercise": {
              "title": "Pure total with tax",
              "type": "write-code",
              "instructions": "Write a program that reads a price and a tax rate (as a decimal, e.g. 0.2) and prints the total with two decimal places, using a pure function total(price, tax).",
              "starterCode": "import * as fs from 'node:fs';\nconst [price, tax] = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\nconst total = (p, t) => p + p * t;\n// print total(price, tax) with 2 decimals",
              "solution": "import * as fs from 'node:fs';\nconst [price, tax] = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\nconst total = (p, t) => p + p * t;\nconsole.log(total(price, tax).toFixed(2));",
              "solutionExplanation": "A pure total takes price and tax as parameters and returns price + price * tax; format with toFixed(2).",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100 at 0.2",
                  "hidden": false,
                  "stdin": "100 0.2\n",
                  "expectedStdout": "120.00"
                },
                {
                  "name": "50 at 0.1",
                  "hidden": true,
                  "stdin": "50 0.1\n",
                  "expectedStdout": "55.00"
                }
              ],
              "hintNotes": {
                "concept": "A pure function takes everything it needs as parameters — no globals, no surprises.",
                "approach": "Define total(price, tax) returning p + p * t, then print it with toFixed(2).",
                "structure": "Structure: read the two numbers, define the pure function, print the result."
              },
              "id": "functional-programming-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "functional-programming-m2",
        "title": "Core Tools",
        "description": "Map, filter, reduce, and higher-order functions.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "functional-programming-m2-l1",
            "slug": "functional-programming-m2-l1",
            "title": "Map, Filter, Reduce",
            "objectives": [
              "Explain what map, filter, reduce means and where it appears in real systems",
              "Apply map, filter, reduce to a small realistic problem",
              "Recognise the common mistakes people make with map, filter, reduce"
            ],
            "introduction": "This lesson introduces map, filter, reduce. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Map, filter, and reduce are the three verbs of functional data processing, and together they replace most loops. Map transforms every element (prices to prices-with-tax), filter keeps only the elements that pass a test (orders over 100), and reduce folds a list into a single value (the total of all orders). Each takes a small function and returns a new array or value, so they chain: orders.filter(big).map(withTax).reduce(sum, 0) reads like a sentence. The power is compositional — small, testable functions combine into a pipeline that is easier to read than a loop with three jobs inside it.",
            "syntax": "map: transform each; filter: keep matches; reduce: fold to one value",
            "analogy": "Map, filter, and reduce are like a factory line: one station paints every item, the next removes the faulty ones, and the last packs them into a single box.",
            "exampleCode": "const orders = [40, 120, 80, 200];\nconst big = orders.filter((x) => x >= 100);\nconst total = big.reduce((sum, x) => sum + x, 0);\nconsole.log(\"Big orders:\", big);\nconsole.log(\"Total:\", total);",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Start by naming the problem map, filter, reduce solves in plain words.",
              "Follow the example step by step and note where map, filter, reduce changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Forgetting reduce's initial value and getting a wrong result on an empty array.",
              "Using map when you need filter, and producing undefined entries.",
              "Writing a loop with three jobs instead of a readable chain."
            ],
            "debugging": {
              "prompt": "This code should total only the orders of 100 or more, but it totals everything. Find the bug.",
              "buggyCode": "const orders = [40, 120, 80, 200];\nconst total = orders.reduce((sum, x) => sum + x, 0);\nconsole.log(total);",
              "fixedCode": "const orders = [40, 120, 80, 200];\nconst total = orders.filter((x) => x >= 100).reduce((sum, x) => sum + x, 0);\nconsole.log(total);",
              "explanation": "The filter step is missing: reduce alone sums every order, including the small ones."
            },
            "miniChallenge": "Extend the exercise: apply map, filter, reduce to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Map transforms, filter selects, and reduce folds — three small verbs that chain into pipelines and replace most manual loops.",
            "quiz": [
              {
                "question": "What does filter do?",
                "options": [
                  "It changes every element",
                  "It keeps only the elements that pass a test, returning a new array",
                  "It sums the array",
                  "It sorts the array"
                ],
                "answer": 1,
                "explanation": "filter returns a new array containing only elements for which the predicate returns true."
              },
              {
                "question": "What does reduce need that map and filter do not?",
                "options": [
                  "A starting value (accumulator seed) to fold the list into one result",
                  "A sorting function",
                  "A global variable",
                  "Two arrays"
                ],
                "answer": 0,
                "explanation": "reduce folds elements into one value, starting from an initial accumulator you supply."
              }
            ],
            "exercise": {
              "title": "Sum the big orders",
              "type": "write-code",
              "instructions": "Write a program that reads numbers separated by spaces and prints the sum of the numbers that are 100 or more.",
              "starterCode": "import * as fs from 'node:fs';\nconst nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\n// filter >= 100, then reduce to a sum",
              "solution": "import * as fs from 'node:fs';\nconst nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\nconsole.log(nums.filter((x) => x >= 100).reduce((sum, x) => sum + x, 0));",
              "solutionExplanation": "Chain filter to keep numbers >= 100, then reduce with an initial 0 to sum them.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "40 120 80 200",
                  "hidden": false,
                  "stdin": "40 120 80 200\n",
                  "expectedStdout": "320"
                },
                {
                  "name": "10 20 30",
                  "hidden": true,
                  "stdin": "10 20 30\n",
                  "expectedStdout": "0"
                }
              ],
              "hintNotes": {
                "concept": "Filter first, then reduce — each step does one job and the chain reads in order.",
                "approach": "Use filter((x) => x >= 100) then reduce((sum, x) => sum + x, 0).",
                "structure": "Structure: read the numbers, then one console.log with the chained call."
              },
              "id": "functional-programming-m2-l1-e1"
            }
          },
          {
            "id": "functional-programming-m2-l2",
            "slug": "functional-programming-m2-l2",
            "title": "First-Class and Higher-Order Functions",
            "objectives": [
              "Explain what higher-order functions means and where it appears in real systems",
              "Apply higher-order functions to a small realistic problem",
              "Recognise the common mistakes people make with higher-order functions"
            ],
            "introduction": "This lesson introduces higher-order functions. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A higher-order function is one that takes a function as an argument or returns one — and since JavaScript functions are first-class values, this is idiomatic, not exotic. map, filter, and reduce are higher-order functions: you hand them a small function and they apply it. Returning a function is just as useful: a function that makes greeting functions, or one that wraps another with logging, builds behaviour from behaviour. Callbacks are the everyday form of this — setTimeout takes a function and runs it later — and the pattern scales up to the middleware and plugin systems of real applications.",
            "syntax": "higher-order: takes a function, returns a function, or both",
            "analogy": "A higher-order function is like a kitchen gadget that takes a blade as an attachment: the same handle slices, dices, or grates depending on which blade you plug in.",
            "exampleCode": "const applyTwice = (f, x) => f(f(x));\nconst addOne = (x) => x + 1;\nconsole.log(applyTwice(addOne, 5));\nconst makeGreeter = (word) => (name) => `${word}, ${name}!`;\nconsole.log(makeGreeter(\"Hello\")(\"Ada\"));",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Start by naming the problem higher-order functions solves in plain words.",
              "Follow the example step by step and note where higher-order functions changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Passing a function's result instead of the function itself.",
              "Forgetting that a returned function must be called to do anything.",
              "Nesting callbacks so deeply the flow becomes unreadable."
            ],
            "debugging": {
              "prompt": "This code should apply the function twice, but it applies it once. Find the bug.",
              "buggyCode": "const applyTwice = (f, x) => f(x);\nconsole.log(applyTwice((x) => x + 1, 5));",
              "fixedCode": "const applyTwice = (f, x) => f(f(x));\nconsole.log(applyTwice((x) => x + 1, 5));",
              "explanation": "applyTwice must call f on the result of f(x) — f(f(x)) — not just once."
            },
            "miniChallenge": "Extend the exercise: apply higher-order functions to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Higher-order functions take or return functions, turning small behaviours into composable building blocks — map and filter are just the famous examples.",
            "quiz": [
              {
                "question": "What is a higher-order function?",
                "options": [
                  "A function that runs faster",
                  "A function that takes another function as an argument or returns one",
                  "A function with many parameters",
                  "A function that cannot be stored"
                ],
                "answer": 1,
                "explanation": "Higher-order functions operate on functions: they accept them, return them, or both."
              },
              {
                "question": "What does makeGreeter('Hello') return?",
                "options": [
                  "A string",
                  "A new function that greets with 'Hello'",
                  "An error",
                  "Nothing"
                ],
                "answer": 1,
                "explanation": "makeGreeter returns a function closing over the word, ready to greet any name."
              }
            ],
            "exercise": {
              "title": "Apply a function twice",
              "type": "write-code",
              "instructions": "Write a program that reads a number and prints the result of adding 1 twice (n + 2), using a higher-order function applyTwice(f, x).",
              "starterCode": "import * as fs from 'node:fs';\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconst applyTwice = (f, x) => f(f(x));\nconst addOne = (x) => x + 1;\n// print applyTwice(addOne, n)",
              "solution": "import * as fs from 'node:fs';\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconst applyTwice = (f, x) => f(f(x));\nconst addOne = (x) => x + 1;\nconsole.log(applyTwice(addOne, n));",
              "solutionExplanation": "applyTwice takes a function and a value and calls the function on its own result: f(f(x)).",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5",
                  "hidden": false,
                  "stdin": "5\n",
                  "expectedStdout": "7"
                },
                {
                  "name": "10",
                  "hidden": true,
                  "stdin": "10\n",
                  "expectedStdout": "12"
                }
              ],
              "hintNotes": {
                "concept": "A higher-order function treats the passed function as a value it can call.",
                "approach": "Define applyTwice as (f, x) => f(f(x)) and call it with addOne.",
                "structure": "Structure: read n, define both functions, then one console.log."
              },
              "id": "functional-programming-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "functional-programming-m3",
        "title": "Composition",
        "description": "Composition, currying, and recursion.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "functional-programming-m3-l1",
            "slug": "functional-programming-m3-l1",
            "title": "Function Composition",
            "objectives": [
              "Explain what function composition means and where it appears in real systems",
              "Apply function composition to a small realistic problem",
              "Recognise the common mistakes people make with function composition"
            ],
            "introduction": "This lesson introduces function composition. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Composition is the act of building a big function out of small ones: given f and g, the composition f(g(x)) applies g first, then f. A compose helper makes it explicit — compose(f, g)(x) — and a pipe helper runs them left to right, which reads more naturally: pipe(trim, lower, slugify)(title). The rule is that each function takes one value and returns one value, so the output of one feeds the input of the next. Well-composed code reads like a description of the data's journey, and each step is independently testable.",
            "syntax": "compose(f, g)(x) = f(g(x)); pipe runs left to right",
            "analogy": "Composition is like plumbing: each pipe section does one thing to the water, and you join sections so the water flows through them in order.",
            "exampleCode": "const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);\nconst trim = (s) => s.trim();\nconst lower = (s) => s.toLowerCase();\nconsole.log(pipe(trim, lower)(\"  Hello World \"));",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Start by naming the problem function composition solves in plain words.",
              "Follow the example step by step and note where function composition changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Mixing up the order — compose(f, g) applies g first.",
              "Composing functions whose input and output shapes do not match.",
              "Building one giant function instead of composing small ones."
            ],
            "debugging": {
              "prompt": "This compose helper runs the functions in the wrong order. Find the bug.",
              "buggyCode": "const compose = (f, g) => (x) => g(f(x));\nconsole.log(compose((x) => x + 1, (x) => x * 2)(5));",
              "fixedCode": "const compose = (f, g) => (x) => f(g(x));\nconsole.log(compose((x) => x + 1, (x) => x * 2)(5));",
              "explanation": "compose(f, g) applies g first, then f: f(g(x)). The buggy version applied f first, giving 12 instead of 11."
            },
            "miniChallenge": "Extend the exercise: apply function composition to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Composition builds big functions from small ones; compose applies right-to-left, pipe runs left-to-right, and each step's output feeds the next step's input.",
            "quiz": [
              {
                "question": "What does pipe(trim, lower)('  Hi ') return?",
                "options": [
                  "'  Hi '",
                  "'hi'",
                  "'HI'",
                  "'Hi'"
                ],
                "answer": 1,
                "explanation": "pipe runs left to right: trim removes the spaces, then lower lowercases, giving 'hi'."
              },
              {
                "question": "Why must composed functions take one value and return one value?",
                "options": [
                  "It is a law",
                  "So the output of one can feed directly into the input of the next",
                  "To make them faster",
                  "To avoid using variables"
                ],
                "answer": 1,
                "explanation": "Composition chains functions by feeding each output into the next input — mismatched shapes break the chain."
              }
            ],
            "exercise": {
              "title": "Compose add-then-double",
              "type": "write-code",
              "instructions": "Write a program that reads a number and prints the result of doubling it and then adding 1, using compose(addOne, double)(n) where compose(f, g) applies g first.",
              "starterCode": "import * as fs from 'node:fs';\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconst compose = (f, g) => (x) => f(g(x));\nconst double = (x) => x * 2;\nconst addOne = (x) => x + 1;\n// print compose(addOne, double)(n)",
              "solution": "import * as fs from 'node:fs';\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconst compose = (f, g) => (x) => f(g(x));\nconst double = (x) => x * 2;\nconst addOne = (x) => x + 1;\nconsole.log(compose(addOne, double)(n));",
              "solutionExplanation": "compose(addOne, double) applies double first, then addOne: n * 2 + 1.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5",
                  "hidden": false,
                  "stdin": "5\n",
                  "expectedStdout": "11"
                },
                {
                  "name": "10",
                  "hidden": true,
                  "stdin": "10\n",
                  "expectedStdout": "21"
                }
              ],
              "hintNotes": {
                "concept": "compose(f, g) means 'g first, then f' — the rightmost function runs first.",
                "approach": "Define compose as (f, g) => (x) => f(g(x)) and call it with addOne and double.",
                "structure": "Structure: read n, define the helpers, then one console.log."
              },
              "id": "functional-programming-m3-l1-e1"
            }
          },
          {
            "id": "functional-programming-m3-l2",
            "slug": "functional-programming-m3-l2",
            "title": "Currying and Partial Application",
            "objectives": [
              "Explain what currying and partial application means and where it appears in real systems",
              "Apply currying and partial application to a small realistic problem",
              "Recognise the common mistakes people make with currying and partial application"
            ],
            "introduction": "This lesson introduces currying and partial application. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Currying turns a function of several arguments into a chain of functions each taking one argument: add(2, 3) becomes add(2)(3). The point is not the syntax — it is that you can fix the first argument and get back a specialised function, like addTax(0.2) returning a function that adds 20% tax to any price. Partial application is the looser cousin: fix any subset of arguments now and supply the rest later, which is how you build configured helpers from general functions. Both are ways of turning configuration into a function you can pass around.",
            "syntax": "curried: f(a)(b); partial: fix some args now, the rest later",
            "analogy": "Currying is like a coffee machine with one dial per setting: set the strength once, and every cup after that uses it until you change it.",
            "exampleCode": "const add = (a) => (b) => a + b;\nconst addFive = add(5);\nconsole.log(addFive(10));\nconst multiply = (a, b) => a * b;\nconst double = multiply.bind(null, 2);\nconsole.log(double(21));",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Start by naming the problem currying and partial application solves in plain words.",
              "Follow the example step by step and note where currying and partial application changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Currying a function and then calling it with both arguments at once.",
              "Fixing arguments in the wrong order and getting a surprising result.",
              "Over-currying simple functions until the code is harder to read."
            ],
            "debugging": {
              "prompt": "This curried add should return 15 for add(5)(10), but it returns 5. Find the bug.",
              "buggyCode": "const add = (a) => (b) => a;\nconsole.log(add(5)(10));",
              "fixedCode": "const add = (a) => (b) => a + b;\nconsole.log(add(5)(10));",
              "explanation": "The inner function returns only a; it must return a + b to combine both arguments."
            },
            "miniChallenge": "Extend the exercise: apply currying and partial application to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Currying chains single-argument functions so you can fix arguments early; partial application specialises general functions — both turn configuration into reusable functions.",
            "quiz": [
              {
                "question": "What does add(5) return when add is curried?",
                "options": [
                  "15",
                  "A function that adds 5 to its argument",
                  "An error",
                  "5"
                ],
                "answer": 1,
                "explanation": "A curried add(5) returns a function waiting for the second argument."
              },
              {
                "question": "What is partial application used for?",
                "options": [
                  "To run a function faster",
                  "To fix some arguments now and create a specialised function for later",
                  "To delete arguments",
                  "To make a function pure"
                ],
                "answer": 1,
                "explanation": "Partial application pre-fills arguments, producing a ready-to-use specialised function."
              }
            ],
            "exercise": {
              "title": "Curried tax adder",
              "type": "write-code",
              "instructions": "Write a program that reads a tax rate and a price and prints the price with tax, with two decimal places. Use a curried addTax(rate)(price) function.",
              "starterCode": "import * as fs from 'node:fs';\nconst [rate, price] = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\nconst addTax = (r) => (p) => p + p * r;\n// print addTax(rate)(price) with 2 decimals",
              "solution": "import * as fs from 'node:fs';\nconst [rate, price] = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\nconst addTax = (r) => (p) => p + p * r;\nconsole.log(addTax(rate)(price).toFixed(2));",
              "solutionExplanation": "addTax(rate) returns a function that adds that rate's tax to any price; call it with the price and format to two decimals.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "0.2 and 100",
                  "hidden": false,
                  "stdin": "0.2 100\n",
                  "expectedStdout": "120.00"
                },
                {
                  "name": "0.1 and 50",
                  "hidden": true,
                  "stdin": "0.1 50\n",
                  "expectedStdout": "55.00"
                }
              ],
              "hintNotes": {
                "concept": "Currying lets you fix the tax rate once and reuse the resulting function for many prices.",
                "approach": "Define addTax as (r) => (p) => p + p * r, then call addTax(rate)(price).",
                "structure": "Structure: read both numbers, define the curried function, print with toFixed(2)."
              },
              "id": "functional-programming-m3-l2-e1"
            }
          },
          {
            "id": "functional-programming-m3-l3",
            "slug": "functional-programming-m3-l3",
            "title": "Recursion and Tail Calls",
            "objectives": [
              "Explain what recursion and tail calls means and where it appears in real systems",
              "Apply recursion and tail calls to a small realistic problem",
              "Recognise the common mistakes people make with recursion and tail calls"
            ],
            "introduction": "Here you will get hands-on with recursion and tail calls: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Recursion solves a problem by calling the same function on a smaller piece of it, with a base case that stops the chain. A factorial is the classic example: fact(n) = n * fact(n-1), and fact(0) = 1. The danger is the call stack: every recursive call adds a frame, so deep recursion can overflow it. A tail call — where the recursive call is the very last thing the function does, with the result accumulated in a parameter — lets an optimising engine reuse the same stack frame, though JavaScript engines in practice do not reliably optimise tail calls, so deep recursion is still best rewritten as a loop or with an explicit stack.",
            "syntax": "base case stops the chain; tail call: recursion is the last action",
            "analogy": "Recursion is like Russian dolls: each doll contains a smaller version of itself, until you reach the smallest doll that contains nothing more.",
            "exampleCode": "const fact = (n, acc = 1) => (n <= 1 ? acc : fact(n - 1, acc * n));\nconsole.log(fact(5));\nconsole.log(fact(0));",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where recursion and tail calls does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Forgetting the base case and recursing forever.",
              "Making the recursive call on the same input instead of a smaller one.",
              "Assuming JavaScript always optimises tail calls — it does not reliably do so."
            ],
            "debugging": {
              "prompt": "This factorial should return 120 for 5, but it returns 0. Find the bug.",
              "buggyCode": "const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));\nconsole.log(fact(5) * 0);",
              "fixedCode": "const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));\nconsole.log(fact(5));",
              "explanation": "The function itself is correct — the bug is multiplying its result by 0 when printing. Print fact(5) directly."
            },
            "miniChallenge": "Extend the exercise: apply recursion and tail calls to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Recursion breaks a problem into smaller copies of itself with a base case to stop; tail calls put the recursion last so the stack frame can be reused.",
            "quiz": [
              {
                "question": "What is the base case of a recursive function?",
                "options": [
                  "The first call",
                  "The case that stops the recursion instead of calling again",
                  "The largest input",
                  "The error handler"
                ],
                "answer": 1,
                "explanation": "The base case returns a result directly; without it, recursion never stops."
              },
              {
                "question": "What makes a call a tail call?",
                "options": [
                  "It is the last call in the program",
                  "The recursive call is the function's final action, with no work left after it",
                  "It uses the tail of an array",
                  "It is called from a loop"
                ],
                "answer": 1,
                "explanation": "In a tail call nothing remains to do after the recursion returns, so the frame can be reused."
              }
            ],
            "exercise": {
              "title": "Recursive factorial",
              "type": "write-code",
              "instructions": "Write a program that reads a non-negative integer and prints its factorial, computed with a recursive function.",
              "starterCode": "import * as fs from 'node:fs';\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconst fact = (x) => (x <= 1 ? 1 : x * fact(x - 1));\n// print fact(n)",
              "solution": "import * as fs from 'node:fs';\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconst fact = (x) => (x <= 1 ? 1 : x * fact(x - 1));\nconsole.log(fact(n));",
              "solutionExplanation": "The base case is x <= 1 returning 1; otherwise return x * fact(x - 1).",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5",
                  "hidden": false,
                  "stdin": "5\n",
                  "expectedStdout": "120"
                },
                {
                  "name": "0",
                  "hidden": true,
                  "stdin": "0\n",
                  "expectedStdout": "1"
                }
              ],
              "hintNotes": {
                "concept": "Recursion needs a base case that stops and a smaller call that moves toward it.",
                "approach": "Define fact with the ternary: x <= 1 ? 1 : x * fact(x - 1).",
                "structure": "Structure: read n, define fact, print fact(n)."
              },
              "id": "functional-programming-m3-l3-e1"
            }
          }
        ]
      },
      {
        "id": "functional-programming-m4",
        "title": "Advanced Functional Ideas",
        "description": "Closures, scope, and functors in everyday code.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "functional-programming-m4-l1",
            "slug": "functional-programming-m4-l1",
            "title": "Closures and Scope",
            "objectives": [
              "Explain what closures and scope means and where it appears in real systems",
              "Apply closures and scope to a small realistic problem",
              "Recognise the common mistakes people make with closures and scope"
            ],
            "introduction": "In this lesson you will see closures and scope in action, work through a guided example, and practise it yourself.",
            "concept": "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished running. When makeCounter() returns a function that increments a local count, the returned function keeps count alive — that is why each counter is independent. Closures are how JavaScript does private state: the only way to touch the variable is through the functions that close over it. They also cause the classic bug: a loop variable declared with var is shared by every closure created in the loop, so they all see the final value — let fixes it by giving each iteration its own binding.",
            "syntax": "closure: a function + the variables it captured from its birth scope",
            "analogy": "A closure is like a packed lunch: the function carries the ingredients from the kitchen where it was made, even when it is eaten far away.",
            "exampleCode": "const makeCounter = () => {\n  let count = 0;\n  return () => ++count;\n};\nconst c = makeCounter();\nconsole.log(c(), c(), c());",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Read the example and trace how closures and scope is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Creating closures in a var loop and sharing one binding.",
              "Assuming a closure copies the variable instead of keeping a live reference.",
              "Holding a huge object in a closure and leaking memory."
            ],
            "debugging": {
              "prompt": "These three closures should print 0, 1, 2, but all print 3. Find the bug.",
              "buggyCode": "const fns = [];\nfor (var i = 0; i < 3; i++) fns.push(() => i);\nconsole.log(fns.map((f) => f()).join(\" \"));",
              "fixedCode": "const fns = [];\nfor (let i = 0; i < 3; i++) fns.push(() => i);\nconsole.log(fns.map((f) => f()).join(\" \"));",
              "explanation": "var shares one binding across iterations; let gives each iteration its own i, so each closure keeps its own value."
            },
            "miniChallenge": "Extend the exercise: apply closures and scope to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A closure is a function plus the variables it captured from its birth scope — the mechanism behind private state, counters, and the classic var-in-a-loop bug.",
            "quiz": [
              {
                "question": "What does a closure capture?",
                "options": [
                  "The global scope only",
                  "The variables from the scope where the function was created",
                  "The function's arguments only",
                  "Nothing — functions are stateless"
                ],
                "answer": 1,
                "explanation": "A closure keeps a live reference to the variables in its birth scope, even after that scope exits."
              },
              {
                "question": "Why do closures created in a var loop all see the final value?",
                "options": [
                  "Because var is scoped to the function, so all closures share one binding",
                  "Because closures copy values",
                  "Because loops are slow",
                  "Because of hoisting of the function"
                ],
                "answer": 0,
                "explanation": "var has function scope, so one binding is shared; let gives each iteration its own binding."
              }
            ],
            "exercise": {
              "title": "Counter closure",
              "type": "write-code",
              "instructions": "Write a program that reads a number n and prints the first n values of a counter starting at 1 (1 2 3 ... n), using a closure made by makeCounter().",
              "starterCode": "import * as fs from 'node:fs';\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconst makeCounter = () => {\n  let count = 0;\n  return () => ++count;\n};\nconst counter = makeCounter();\n// collect n values from counter() and print them joined by spaces",
              "solution": "import * as fs from 'node:fs';\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconst makeCounter = () => {\n  let count = 0;\n  return () => ++count;\n};\nconst counter = makeCounter();\nconst values = [];\nfor (let i = 0; i < n; i++) values.push(counter());\nconsole.log(values.join(' '));",
              "solutionExplanation": "makeCounter returns a function closing over count; calling it n times yields 1, 2, 3, ... n.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "3",
                  "hidden": false,
                  "stdin": "3\n",
                  "expectedStdout": "1 2 3"
                },
                {
                  "name": "5",
                  "hidden": true,
                  "stdin": "5\n",
                  "expectedStdout": "1 2 3 4 5"
                }
              ],
              "hintNotes": {
                "concept": "A closure keeps its captured variable alive between calls — that is the counter's memory.",
                "approach": "Call the counter n times in a loop, collect the results, and join them with spaces.",
                "structure": "Structure: read n, build the counter, loop to collect values, print."
              },
              "id": "functional-programming-m4-l1-e1"
            }
          },
          {
            "id": "functional-programming-m4-l2",
            "slug": "functional-programming-m4-l2",
            "title": "Functors and Monads in Practice",
            "objectives": [
              "Explain what functors and monads means and where it appears in real systems",
              "Apply functors and monads to a small realistic problem",
              "Recognise the common mistakes people make with functors and monads"
            ],
            "introduction": "This lesson introduces functors and monads. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A functor is a container you can map over: an array is a functor because map applies a function to what's inside without you unwrapping it. A monad is a functor you can also flatten — a Promise is the everyday example: .then() maps over the eventual value, and returning a promise inside .then() flattens instead of nesting. You do not need category theory to use them; the practical rule is to keep values wrapped (in an array, a Promise, or an Option) and transform them with map and flatMap instead of unwrapping early. That keeps null checks and async plumbing in one place instead of scattered through the code.",
            "syntax": "functor: map over a container; monad: map + flatten (Promise.then)",
            "analogy": "A functor is like a gift box with a window: you can paint what is inside through the window (map) without opening the box, and a monad lets you put a box inside a box and still have one box.",
            "exampleCode": "const maybe = (v) => (v == null ? [] : [v]);\nconsole.log(maybe(5).map((x) => x * 2));\nconsole.log(maybe(null).map((x) => x * 2));\nPromise.resolve(5).then((x) => x * 2).then(console.log);",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Start by naming the problem functors and monads solves in plain words.",
              "Follow the example step by step and note where functors and monads changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Unwrapping a container early and scattering null checks everywhere.",
              "Nesting promises instead of returning them from .then().",
              "Treating map on an array as if it mutated the original."
            ],
            "debugging": {
              "prompt": "This Maybe-style code should print [] for null, but it crashes. Find the bug.",
              "buggyCode": "const maybe = (v) => [v];\nconsole.log(maybe(null).map((x) => x * 2));",
              "fixedCode": "const maybe = (v) => (v == null ? [] : [v]);\nconsole.log(maybe(null).map((x) => x * 2));",
              "explanation": "maybe(null) must produce an empty container, not [null] — otherwise map tries to double null."
            },
            "miniChallenge": "Extend the exercise: apply functors and monads to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Functors let you map over wrapped values; monads add flattening, as Promises show with .then() — keep values wrapped and transform them instead of unwrapping early.",
            "quiz": [
              {
                "question": "What makes an array a functor?",
                "options": [
                  "It can be sorted",
                  "You can map a function over its contents without unwrapping it yourself",
                  "It is mutable",
                  "It holds only numbers"
                ],
                "answer": 1,
                "explanation": "A functor is a container with a map that applies a function to the wrapped values."
              },
              {
                "question": "What does .then() on a Promise do that is monad-like?",
                "options": [
                  "It deletes the promise",
                  "It maps over the eventual value and flattens a returned promise instead of nesting",
                  "It runs the code twice",
                  "It cancels the promise"
                ],
                "answer": 1,
                "explanation": "then maps the resolved value and flattens promises returned from the callback — the monadic bind."
              }
            ],
            "exercise": {
              "title": "Map over a maybe value",
              "type": "write-code",
              "instructions": "Write a program that reads a number or the word null. If it is a number, print double it; if null, print empty. Use a maybe-style container: an array with the value, or an empty array.",
              "starterCode": "import * as fs from 'node:fs';\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nconst maybe = (v) => (v === null ? [] : [v]);\nconst value = raw === 'null' ? null : Number(raw);\n// map over maybe(value) doubling it, print the result or 'empty'",
              "solution": "import * as fs from 'node:fs';\nconst raw = fs.readFileSync(0, 'utf-8').trim();\nconst maybe = (v) => (v === null ? [] : [v]);\nconst value = raw === 'null' ? null : Number(raw);\nconst doubled = maybe(value).map((x) => x * 2);\nconsole.log(doubled.length ? doubled[0] : 'empty');",
              "solutionExplanation": "Wrap the value in an array (or an empty array for null), map the doubling over it, and print the result or 'empty'.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5",
                  "hidden": false,
                  "stdin": "5\n",
                  "expectedStdout": "10"
                },
                {
                  "name": "null",
                  "hidden": true,
                  "stdin": "null\n",
                  "expectedStdout": "empty"
                }
              ],
              "hintNotes": {
                "concept": "A maybe container holds either a value or nothing, so mapping over it handles both cases uniformly.",
                "approach": "Build maybe(value), map the doubling, then print the first element or 'empty'.",
                "structure": "Structure: read the input, parse null vs number, wrap, map, print."
              },
              "id": "functional-programming-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "functional-programming-m5",
        "title": "Functional Practice",
        "description": "Pipelines and functional style in real codebases.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "functional-programming-m5-l1",
            "slug": "functional-programming-m5-l1",
            "title": "Building a Data Pipeline",
            "objectives": [
              "Explain what building a data pipeline means and where it appears in real systems",
              "Apply building a data pipeline to a small realistic problem",
              "Recognise the common mistakes people make with building a data pipeline"
            ],
            "introduction": "Here you will get hands-on with building a data pipeline: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A data pipeline is a chain of small pure functions, each transforming the data one step: parse the raw text, filter out the bad rows, normalise the fields, and aggregate the result. Because every step is pure, each one is testable on its own, and the pipeline reads top-to-bottom as a description of the data's journey. The practical skills are choosing the right step for each job — map for transforming, filter for removing, reduce for aggregating — and keeping the intermediate shapes simple, usually plain arrays of plain objects. When a step needs configuration, a curried function supplies it without breaking the chain.",
            "syntax": "parse -> filter -> transform -> aggregate, each step pure",
            "analogy": "A data pipeline is like an assembly line: raw material enters at one end, each station does one job, and a finished product comes out the other end.",
            "exampleCode": "const sales = [\"10,book\", \"5,pen\", \"bad\", \"20,book\"];\nconst total = sales\n  .map((line) => line.split(\",\"))\n  .filter((parts) => parts.length === 2)\n  .map((parts) => Number(parts[0]))\n  .reduce((sum, x) => sum + x, 0);\nconsole.log(\"Total sales:\", total);",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where building a data pipeline does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Converting before filtering, so bad data becomes NaN and poisons the result.",
              "Letting one step do parsing, filtering, and aggregation at once.",
              "Mutating the data between pipeline steps."
            ],
            "debugging": {
              "prompt": "This pipeline should total only the valid sales rows, but it crashes on 'bad'. Find the bug.",
              "buggyCode": "const sales = [\"10,book\", \"5,pen\", \"bad\", \"20,book\"];\nconst total = sales.map((line) => Number(line.split(\",\")[0])).reduce((s, x) => s + x, 0);\nconsole.log(total);",
              "fixedCode": "const sales = [\"10,book\", \"5,pen\", \"bad\", \"20,book\"];\nconst total = sales.map((line) => line.split(\",\")).filter((parts) => parts.length === 2).map((parts) => Number(parts[0])).reduce((sum, x) => sum + x, 0);\nconsole.log(total);",
              "explanation": "The pipeline never filters out the malformed row, so Number('bad') becomes NaN and poisons the total — filter before converting."
            },
            "miniChallenge": "Extend the exercise: apply building a data pipeline to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A data pipeline chains pure steps — parse, filter, transform, aggregate — so each step is testable alone and the whole journey reads top to bottom.",
            "quiz": [
              {
                "question": "Why should pipeline steps be pure?",
                "options": [
                  "To make them faster",
                  "So each step is independently testable and the pipeline is predictable",
                  "To use less memory",
                  "To avoid using map"
                ],
                "answer": 1,
                "explanation": "Pure steps depend only on their input, so each can be tested alone and the whole pipeline is deterministic."
              },
              {
                "question": "Which step removes bad rows from a pipeline?",
                "options": [
                  "map",
                  "filter",
                  "reduce",
                  "sort"
                ],
                "answer": 1,
                "explanation": "filter keeps only the rows that pass a validity test, dropping the malformed ones."
              }
            ],
            "exercise": {
              "title": "Total valid sales",
              "type": "write-code",
              "instructions": "Write a program that reads a line of comma-separated numbers, some of which may be the word bad, and prints the sum of the valid numbers.",
              "starterCode": "import * as fs from 'node:fs';\nconst parts = fs.readFileSync(0, 'utf-8').trim().split(',');\n// filter out 'bad', map to Number, reduce to a sum",
              "solution": "import * as fs from 'node:fs';\nconst parts = fs.readFileSync(0, 'utf-8').trim().split(',');\nconsole.log(parts.filter((p) => p !== 'bad').map(Number).reduce((sum, x) => sum + x, 0));",
              "solutionExplanation": "Filter out the 'bad' entries, convert the rest to numbers, and reduce them to a sum.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "10,bad,20",
                  "hidden": false,
                  "stdin": "10,bad,20\n",
                  "expectedStdout": "30"
                },
                {
                  "name": "5,bad,bad,5",
                  "hidden": true,
                  "stdin": "5,bad,bad,5\n",
                  "expectedStdout": "10"
                }
              ],
              "hintNotes": {
                "concept": "A pipeline handles messy input by filtering first, then converting, then aggregating.",
                "approach": "Chain filter, map(Number), and reduce with an initial 0.",
                "structure": "Structure: read the line, split on commas, then one console.log with the chain."
              },
              "id": "functional-programming-m5-l1-e1"
            }
          },
          {
            "id": "functional-programming-m5-l2",
            "slug": "functional-programming-m5-l2",
            "title": "FP in Real Codebases",
            "objectives": [
              "Explain what FP in real codebases means and where it appears in real systems",
              "Apply FP in real codebases to a small realistic problem",
              "Recognise the common mistakes people make with FP in real codebases"
            ],
            "introduction": "This lesson introduces FP in real codebases. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Real codebases are rarely purely functional; the skill is knowing where functional style pays and where it fights you. Pure functions shine for data transformations, validation, and business rules — the parts you want to test heavily. Side effects belong at the edges: reading input, writing to a database, and sending responses, kept in a thin layer that calls into the pure core. The pragmatic rule is to push effects outward and purity inward, so most of the code is easy to test and the messy parts are few and obvious. Teams that adopt FP gradually — replacing one tangled loop with a pipeline at a time — get most of the benefit without a rewrite.",
            "syntax": "pure core + thin effectful shell; adopt one pipeline at a time",
            "analogy": "FP in a real codebase is like a clean kitchen inside a busy restaurant: the cooking (pure logic) happens in a controlled space, and the messy deliveries and dishwashing (effects) stay at the edges.",
            "exampleCode": "const validate = (user) => user.name && user.age >= 18;\nconst save = (user) => console.log(\"Saved:\", user.name);\nconst register = (user) => (validate(user) ? save(user) : console.log(\"Invalid user\"));\nregister({ name: \"Ada\", age: 30 });",
            "exampleLanguage": "javascript",
            "walkthrough": [
              "Start by naming the problem FP in real codebases solves in plain words.",
              "Follow the example step by step and note where FP in real codebases changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Putting validation inside the save function where it cannot be tested alone.",
              "Trying to make everything pure, including I/O, and fighting the language.",
              "Rewriting a whole codebase at once instead of converting one piece at a time."
            ],
            "debugging": {
              "prompt": "This register function saves invalid users. Find the bug.",
              "buggyCode": "const validate = (user) => user.name && user.age >= 18;\nconst save = (user) => console.log(\"Saved:\", user.name);\nconst register = (user) => save(user);\nregister({ name: \"Ada\", age: 15 });",
              "fixedCode": "const validate = (user) => user.name && user.age >= 18;\nconst save = (user) => console.log(\"Saved:\", user.name);\nconst register = (user) => (validate(user) ? save(user) : console.log(\"Invalid user\"));\nregister({ name: \"Ada\", age: 15 });",
              "explanation": "register never calls validate — the pure validation must gate the effectful save."
            },
            "miniChallenge": "Extend the exercise: apply FP in real codebases to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "In real codebases, keep a pure core for rules and transformations and a thin effectful shell for I/O — and adopt the style one pipeline at a time.",
            "quiz": [
              {
                "question": "Where should side effects live in a mostly-functional codebase?",
                "options": [
                  "Everywhere",
                  "At the edges, in a thin layer around a pure core",
                  "Inside every function",
                  "Nowhere — effects are banned"
                ],
                "answer": 1,
                "explanation": "Push effects outward: a thin shell does I/O while the core stays pure and testable."
              },
              {
                "question": "Why adopt FP gradually instead of rewriting?",
                "options": [
                  "Rewrites are fun",
                  "Replacing one tangled loop at a time delivers most of the benefit without the risk of a rewrite",
                  "Gradual adoption is slower",
                  "Managers prefer it"
                ],
                "answer": 1,
                "explanation": "Incremental adoption is low-risk: each pipeline you convert is independently testable and shippable."
              }
            ],
            "exercise": {
              "title": "Validate then save",
              "type": "write-code",
              "instructions": "Write a program that reads a name and an age, then prints Saved: <name> if the user is 18 or older, otherwise Invalid user. Use a pure validate function.",
              "starterCode": "import * as fs from 'node:fs';\nconst [name, ageStr] = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nconst age = Number(ageStr);\nconst validate = (user) => user.name && user.age >= 18;\n// print 'Saved: <name>' if valid, else 'Invalid user'",
              "solution": "import * as fs from 'node:fs';\nconst [name, ageStr] = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\nconst age = Number(ageStr);\nconst validate = (user) => user.name && user.age >= 18;\nconsole.log(validate({ name, age }) ? `Saved: ${name}` : 'Invalid user');",
              "solutionExplanation": "validate is pure: it only inspects the user object. The print is the effectful edge that uses its result.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Ada 30",
                  "hidden": false,
                  "stdin": "Ada 30\n",
                  "expectedStdout": "Saved: Ada"
                },
                {
                  "name": "Bo 15",
                  "hidden": true,
                  "stdin": "Bo 15\n",
                  "expectedStdout": "Invalid user"
                }
              ],
              "hintNotes": {
                "concept": "Keep the rule pure (validate) and the effect (printing) at the edge.",
                "approach": "Call validate with the user object and choose the message with a ternary.",
                "structure": "Structure: read name and age, define validate, then one console.log."
              },
              "id": "functional-programming-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "testing-tdd",
    "slug": "testing-tdd",
    "language": "python",
    "category": "cs-career",
    "title": "Testing & TDD",
    "description": "Write tests that catch bugs: pytest, fixtures, mocking, test-driven development, integration tests, and measuring coverage honestly.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "pytest",
      "Unit testing",
      "Fixtures",
      "Mocking",
      "Test-driven development",
      "Integration testing",
      "Property-based testing",
      "Coverage"
    ],
    "prerequisites": [
      "Basic Python programming"
    ],
    "modules": [
      {
        "id": "testing-tdd-m1",
        "title": "Testing Foundations",
        "description": "Why tests matter and what a good test looks like.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "testing-tdd-m1-l1",
            "slug": "testing-tdd-m1-l1",
            "title": "Why Test",
            "objectives": [
              "Explain what why testing matters means and where it appears in real systems",
              "Apply why testing matters to a small realistic problem",
              "Recognise the common mistakes people make with why testing matters"
            ],
            "introduction": "Here you will get hands-on with why testing matters: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Tests are executable proof that code does what it claims: they catch regressions the moment they are introduced, document the intended behaviour for the next reader, and give you the confidence to refactor without fear. The cost of a bug grows the later it is found — a mistake caught by a unit test costs minutes, the same mistake found by a customer costs a release, a hotfix, and trust. Good tests are fast, independent, and deterministic: they run in milliseconds, do not depend on each other, and give the same result every time. A codebase without tests is not 'done faster'; it is a codebase nobody dares to change.",
            "syntax": "tests = proof + documentation + courage to refactor",
            "analogy": "Tests are like the guardrails on a mountain road: you rarely notice them, but they are what let you drive fast without fear of the edge.",
            "exampleCode": "def add(a, b):\n    return a + b\nassert add(2, 3) == 5\nassert add(-1, 1) == 0\nprint(\"All assertions passed.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where why testing matters does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Testing only the happy path and never the edge cases.",
              "Writing tests that depend on each other or on shared state.",
              "Treating a failing test as an annoyance instead of a signal."
            ],
            "debugging": {
              "prompt": "This test should pass for add(2, 3), but it fails. Find the bug.",
              "buggyCode": "def add(a, b):\n    return a + b\nassert add(2, 3) == 6",
              "fixedCode": "def add(a, b):\n    return a + b\nassert add(2, 3) == 5",
              "explanation": "The expected value is wrong: 2 + 3 is 5, not 6 — the test, not the code, has the bug."
            },
            "miniChallenge": "Extend the exercise: apply why testing matters to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Tests are executable proof of behaviour: they catch regressions early, document intent, and make refactoring safe — and the later a bug is found, the more it costs.",
            "quiz": [
              {
                "question": "Why are tests worth writing even when the code seems to work?",
                "options": [
                  "They make the code faster",
                  "They catch regressions, document behaviour, and give confidence to refactor",
                  "They are required by law",
                  "They replace documentation"
                ],
                "answer": 1,
                "explanation": "Tests prove behaviour, catch future breakage, and make change safe."
              },
              {
                "question": "What makes a good unit test?",
                "options": [
                  "It is slow and thorough",
                  "It is fast, independent, and deterministic",
                  "It tests everything at once",
                  "It needs a database"
                ],
                "answer": 1,
                "explanation": "Good tests run quickly, do not depend on each other, and give the same result every run."
              }
            ],
            "exercise": {
              "title": "Assert a sum",
              "type": "write-code",
              "instructions": "Write a program that reads two numbers and prints PASS if their sum equals the third input number, otherwise FAIL. (This mimics a test assertion.)",
              "starterCode": "a = int(input())\nb = int(input())\nexpected = int(input())\n# print PASS if a + b == expected else FAIL\n",
              "solution": "a = int(input())\nb = int(input())\nexpected = int(input())\nprint(\"PASS\" if a + b == expected else \"FAIL\")",
              "solutionExplanation": "Compare the computed sum with the expected value and print PASS or FAIL.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "2 + 3 == 5",
                  "hidden": false,
                  "stdin": "2\n3\n5\n",
                  "expectedStdout": "PASS"
                },
                {
                  "name": "2 + 3 == 6",
                  "hidden": true,
                  "stdin": "2\n3\n6\n",
                  "expectedStdout": "FAIL"
                }
              ],
              "hintNotes": {
                "concept": "A test is just a comparison: compute the value, compare it with what you expect.",
                "approach": "Use a conditional expression comparing a + b with expected.",
                "structure": "Structure: read three numbers, then one print with PASS or FAIL."
              },
              "id": "testing-tdd-m1-l1-e1"
            }
          },
          {
            "id": "testing-tdd-m1-l2",
            "slug": "testing-tdd-m1-l2",
            "title": "Test Anatomy with pytest",
            "objectives": [
              "Explain what pytest test anatomy means and where it appears in real systems",
              "Apply pytest test anatomy to a small realistic problem",
              "Recognise the common mistakes people make with pytest test anatomy"
            ],
            "introduction": "This lesson introduces pytest test anatomy. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A pytest test is an ordinary function whose name starts with test_ and whose body uses plain assert statements — no special base class, no framework magic. Tests live in files named test_*.py, and running pytest discovers and runs them all, reporting a dot for each pass and a detailed failure for each miss. The arrange-act-assert pattern keeps tests readable: set up the inputs, call the code, then assert the result. A test should check one behaviour; when a test with five asserts fails, you should know exactly which behaviour broke from the test's name alone.",
            "syntax": "arrange -> act -> assert; test files: test_*.py; run: pytest",
            "analogy": "A test is like a lab experiment: set up the apparatus (arrange), run the reaction (act), then measure the result against what you predicted (assert).",
            "exampleCode": "def total(items):\n    return sum(items)\n\ndef test_total():\n    assert total([1, 2, 3]) == 6\n    assert total([]) == 0\nprint(\"Run with: pytest\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem pytest test anatomy solves in plain words.",
              "Follow the example step by step and note where pytest test anatomy changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Naming tests vaguely so a failure tells you nothing.",
              "Putting several behaviours in one test with many asserts.",
              "Forgetting the test_ prefix so pytest never runs the test."
            ],
            "debugging": {
              "prompt": "This test file should be discovered by pytest, but it is ignored. Find the bug.",
              "buggyCode": "def check_total():\n    assert sum([1, 2, 3]) == 6",
              "fixedCode": "def test_total():\n    assert sum([1, 2, 3]) == 6",
              "explanation": "pytest only collects functions whose names start with test_; check_total is never run."
            },
            "miniChallenge": "Extend the exercise: apply pytest test anatomy to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A pytest test is a test_ function with plain asserts, organised arrange-act-assert, and discovered automatically from test_*.py files.",
            "quiz": [
              {
                "question": "What does pytest discover as a test?",
                "options": [
                  "Any function",
                  "A function named test_* in a file named test_*.py",
                  "Any file with asserts",
                  "Only classes"
                ],
                "answer": 1,
                "explanation": "pytest collects test_ functions from test_*.py files by default."
              },
              {
                "question": "What is arrange-act-assert?",
                "options": [
                  "A testing framework",
                  "Set up inputs, call the code, assert the result",
                  "Three kinds of tests",
                  "A debugging technique"
                ],
                "answer": 1,
                "explanation": "AAA structures a test into setup, action, and verification, keeping it readable."
              }
            ],
            "exercise": {
              "title": "Count passing assertions",
              "type": "write-code",
              "instructions": "Write a program that reads three expected values and three actual values (six lines) and prints exactly: Passed: <n>/3. Compare each pair in order.",
              "starterCode": "expected = [int(input()) for _ in range(3)]\nactual = [int(input()) for _ in range(3)]\npassed = sum(1 for e, a in zip(expected, actual) if e == a)\nprint(f\"Passed: {passed}/3\")",
              "solution": "expected = [int(input()) for _ in range(3)]\nactual = [int(input()) for _ in range(3)]\npassed = sum(1 for e, a in zip(expected, actual) if e == a)\nprint(f\"Passed: {passed}/3\")",
              "solutionExplanation": "Zip the expected and actual lists, count the pairs that match, and print the count out of 3.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "All pass",
                  "hidden": false,
                  "stdin": "1\n2\n3\n1\n2\n3\n",
                  "expectedStdout": "Passed: 3/3"
                },
                {
                  "name": "One fails",
                  "hidden": true,
                  "stdin": "1\n2\n3\n1\n2\n9\n",
                  "expectedStdout": "Passed: 2/3"
                }
              ],
              "hintNotes": {
                "concept": "A test run is a count of comparisons that matched versus the total.",
                "approach": "Zip the two lists and count equal pairs with a generator expression.",
                "structure": "Structure: read both lists, count matches, print the summary."
              },
              "id": "testing-tdd-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "testing-tdd-m2",
        "title": "Unit Testing",
        "description": "Assertions, fixtures, and mocking.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "testing-tdd-m2-l1",
            "slug": "testing-tdd-m2-l1",
            "title": "Assertions and Fixtures",
            "objectives": [
              "Explain what assertions and fixtures means and where it appears in real systems",
              "Apply assertions and fixtures to a small realistic problem",
              "Recognise the common mistakes people make with assertions and fixtures"
            ],
            "introduction": "In this lesson you will see assertions and fixtures in action, work through a guided example, and practise it yourself.",
            "concept": "Assertions are the vocabulary of tests: assert == for equality, assert x in y for membership, assert x is None for absence, and pytest.raises for exceptions — with raises, the code that should fail goes inside a with block. Fixtures are pytest's way of sharing setup: a function decorated with @pytest.fixture returns the object tests need, and any test that takes it as a parameter receives a fresh copy. Fixtures keep tests DRY without shared mutable state, because each test gets its own instance. The most useful fixtures are small: a fresh database, a temporary directory, or a sample object in a known state.",
            "syntax": "@pytest.fixture provides fresh setup; pytest.raises checks exceptions",
            "analogy": "A fixture is like a stagehand who rebuilds the set before every scene: each test starts with a fresh, identical stage and never sees the previous scene's mess.",
            "exampleCode": "import pytest\n\n@pytest.fixture\ndef account():\n    return {\"balance\": 100}\n\ndef test_deposit(account):\n    account[\"balance\"] += 50\n    assert account[\"balance\"] == 150",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how assertions and fixtures is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Sharing mutable state between tests through a module-level object.",
              "Testing exceptions by catching them instead of using pytest.raises.",
              "Making fixtures do real work like network calls."
            ],
            "debugging": {
              "prompt": "This fixture should give each test a fresh account, but tests interfere with each other. Find the bug.",
              "buggyCode": "import pytest\nshared = {\"balance\": 100}\n@pytest.fixture\ndef account():\n    return shared",
              "fixedCode": "import pytest\n@pytest.fixture\ndef account():\n    return {\"balance\": 100}",
              "explanation": "The fixture returns the same shared dict to every test, so one test's changes leak into the next; it must build a fresh dict each time."
            },
            "miniChallenge": "Extend the exercise: apply assertions and fixtures to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Assertions check behaviour (including exceptions via pytest.raises) and fixtures supply fresh setup per test, so tests stay independent and readable.",
            "quiz": [
              {
                "question": "What does a pytest fixture provide?",
                "options": [
                  "Faster code",
                  "Fresh, reusable setup that each test receives as a parameter",
                  "A mock database",
                  "A test report"
                ],
                "answer": 1,
                "explanation": "Fixtures build the setup each test needs, fresh per test, keeping tests short and independent."
              },
              {
                "question": "How do you test that code raises an exception?",
                "options": [
                  "With assert == ",
                  "With pytest.raises inside a with block",
                  "With a try that swallows it",
                  "You cannot test exceptions"
                ],
                "answer": 1,
                "explanation": "pytest.raises(ExceptionType) asserts the block raises that exception, and fails if it does not."
              }
            ],
            "exercise": {
              "title": "Check a balance after deposit",
              "type": "write-code",
              "instructions": "Write a program that reads a starting balance and a deposit, then prints exactly: Balance: <n>. Simulate a fresh fixture by starting from the given balance each run.",
              "starterCode": "balance = int(input())\ndeposit = int(input())\n# fresh account each run: balance + deposit\n",
              "solution": "balance = int(input())\ndeposit = int(input())\nprint(f\"Balance: {balance + deposit}\")",
              "solutionExplanation": "Add the deposit to the starting balance and print the result.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100 + 50",
                  "hidden": false,
                  "stdin": "100\n50\n",
                  "expectedStdout": "Balance: 150"
                },
                {
                  "name": "0 + 10",
                  "hidden": true,
                  "stdin": "0\n10\n",
                  "expectedStdout": "Balance: 10"
                }
              ],
              "hintNotes": {
                "concept": "A fixture gives each test a fresh start — here, each run starts from the given balance.",
                "approach": "Add balance and deposit and print the result.",
                "structure": "Structure: read two numbers, then one print with the sum."
              },
              "id": "testing-tdd-m2-l1-e1"
            }
          },
          {
            "id": "testing-tdd-m2-l2",
            "slug": "testing-tdd-m2-l2",
            "title": "Mocking and Fakes",
            "objectives": [
              "Explain what mocking and fakes means and where it appears in real systems",
              "Apply mocking and fakes to a small realistic problem",
              "Recognise the common mistakes people make with mocking and fakes"
            ],
            "introduction": "In this lesson you will see mocking and fakes in action, work through a guided example, and practise it yourself.",
            "concept": "Some code is hard to test because it talks to the outside world — a payment API, the clock, or the file system. Mocking replaces the real collaborator with a controlled stand-in: a Mock records how it was called so you can assert the code called the right method with the right arguments, while a fake is a simple working implementation, like an in-memory database. The rule is to mock at the boundary: replace the HTTP client, not the function you are testing. Over-mocking is the trap — if your test mocks everything, it tests nothing but the mocks themselves.",
            "syntax": "mock: records calls; fake: simple working stand-in; mock at the boundary",
            "analogy": "A mock is like a stunt double: it stands in for the real actor during the dangerous scene, and the director checks afterwards that it did exactly what the script said.",
            "exampleCode": "from unittest.mock import Mock\nsender = Mock()\nsender.send(\"hello\")\nprint(\"Called:\", sender.send.called)\nprint(\"With:\", sender.send.call_args)",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how mocking and fakes is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Mocking the code under test instead of its dependencies.",
              "Asserting on mock internals instead of observable behaviour.",
              "Mocking so much that the test cannot fail even when the code is wrong."
            ],
            "debugging": {
              "prompt": "This test should verify the sender was called, but the assertion always passes. Find the bug.",
              "buggyCode": "from unittest.mock import Mock\nsender = Mock()\nprint(\"Called:\", sender.send.called)",
              "fixedCode": "from unittest.mock import Mock\nsender = Mock()\nsender.send(\"hello\")\nprint(\"Called:\", sender.send.called)",
              "explanation": "The test never called send, so `called` is False — the assertion must come after actually invoking the code under test."
            },
            "miniChallenge": "Extend the exercise: apply mocking and fakes to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Mocks stand in for external collaborators and record their calls; fakes are simple working replacements. Mock at the boundary, and never mock the code you are testing.",
            "quiz": [
              {
                "question": "What is the difference between a mock and a fake?",
                "options": [
                  "They are the same",
                  "A mock records calls for assertion; a fake is a simple working implementation",
                  "A mock is slower",
                  "A fake cannot be used in tests"
                ],
                "answer": 1,
                "explanation": "Mocks verify interactions; fakes provide real (simplified) behaviour, like an in-memory store."
              },
              {
                "question": "Where should you mock?",
                "options": [
                  "Everywhere",
                  "At the boundary — replace the external collaborator, not the code under test",
                  "Inside the function being tested",
                  "Never"
                ],
                "answer": 1,
                "explanation": "Mock the external dependency so the test exercises your real code against a controlled stand-in."
              }
            ],
            "exercise": {
              "title": "Count mock calls",
              "type": "write-code",
              "instructions": "Write a program that reads a number of send calls to simulate and prints exactly: send called <n> times. (This models asserting a mock's call count.)",
              "starterCode": "n = int(input())\n# simulate n calls, then report the count\n",
              "solution": "n = int(input())\nprint(f\"send called {n} times\")",
              "solutionExplanation": "The call count is the number of simulated calls; print it in the given format.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "3 calls",
                  "hidden": false,
                  "stdin": "3\n",
                  "expectedStdout": "send called 3 times"
                },
                {
                  "name": "0 calls",
                  "hidden": true,
                  "stdin": "0\n",
                  "expectedStdout": "send called 0 times"
                }
              ],
              "hintNotes": {
                "concept": "A mock records how many times it was called — the count is the assertion.",
                "approach": "Read the count and print it in the required sentence.",
                "structure": "Structure: read n, then one print with the count."
              },
              "id": "testing-tdd-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "testing-tdd-m3",
        "title": "Test-Driven Development",
        "description": "Red-green-refactor, test doubles, and edge cases.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "testing-tdd-m3-l1",
            "slug": "testing-tdd-m3-l1",
            "title": "Red-Green-Refactor",
            "objectives": [
              "Explain what red-green-refactor means and where it appears in real systems",
              "Apply red-green-refactor to a small realistic problem",
              "Recognise the common mistakes people make with red-green-refactor"
            ],
            "introduction": "Here you will get hands-on with red-green-refactor: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Test-driven development is a rhythm, not a religion: write a failing test first (red), write the smallest code that makes it pass (green), then clean up the code while the tests stay green (refactor). The red step matters most — a test that never failed cannot prove anything, because it might pass even if the code is wrong. The green step demands discipline: write only enough code to pass, even if it feels like a hack, because the next test will force the real design. The refactor step is where the design improves, safely, because the tests catch any behaviour change immediately. TDD's real product is not the tests; it is the small, testable design the rhythm forces you into.",
            "syntax": "red: failing test; green: minimal code; refactor: clean up, tests green",
            "analogy": "TDD is like building a bridge by first hanging a net: you prove the net catches you (red), walk across (green), then tidy the bridge while the net stays in place (refactor).",
            "exampleCode": "def test_add():\n    assert add(2, 3) == 5  # red: add does not exist yet\n\ndef add(a, b):\n    return a + b  # green: minimal code\nprint(\"Now the test passes.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where red-green-refactor does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Writing the test after the code and calling it TDD.",
              "Writing too much code in the green step.",
              "Skipping the refactor step until the code is a mess."
            ],
            "debugging": {
              "prompt": "This TDD sequence is out of order. What is the correct order?",
              "buggyCode": "print(\"1. Write code  2. Write test  3. Refactor\")",
              "fixedCode": "print(\"1. Write failing test  2. Minimal code  3. Refactor\")",
              "explanation": "TDD is red (failing test), green (minimal code), refactor — writing the code first skips the proof that the test works."
            },
            "miniChallenge": "Extend the exercise: apply red-green-refactor to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "TDD is a red-green-refactor rhythm: a failing test first (to prove it can fail), minimal code to pass, then safe refactoring with the tests as a net.",
            "quiz": [
              {
                "question": "Why must the test fail first in TDD?",
                "options": [
                  "To waste time",
                  "A test that never failed might pass even with broken code, so it proves nothing",
                  "To make the suite red",
                  "It is a tradition"
                ],
                "answer": 1,
                "explanation": "Seeing red proves the test actually exercises the code; a test that starts green may be vacuous."
              },
              {
                "question": "What is allowed in the green step?",
                "options": [
                  "Any amount of code",
                  "Only the smallest code that makes the test pass",
                  "Refactoring the whole module",
                  "Deleting tests"
                ],
                "answer": 1,
                "explanation": "Green means minimal: just enough to pass. The next test drives the next piece of design."
              }
            ],
            "exercise": {
              "title": "Order the TDD cycle",
              "type": "multiple-choice",
              "instructions": "Which is the correct TDD cycle order?",
              "starterCode": "",
              "solution": "Write a failing test, write minimal code to pass, refactor",
              "solutionExplanation": "TDD is red-green-refactor: the failing test comes first so it can prove the code works, minimal code makes it pass, and refactoring improves the design while tests stay green.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "The test must fail first — that is the proof it can catch a bug.",
                "approach": "Look for the order that starts with a failing test.",
                "structure": "Structure: red, green, refactor — test first, then code, then clean-up."
              },
              "options": [
                "Write the code, write the test, refactor",
                "Write a failing test, write minimal code to pass, refactor",
                "Refactor, write the test, write the code",
                "Write the test, refactor, write the code"
              ],
              "answerIndex": 1,
              "id": "testing-tdd-m3-l1-e1"
            }
          },
          {
            "id": "testing-tdd-m3-l2",
            "slug": "testing-tdd-m3-l2",
            "title": "Test Doubles in Depth",
            "objectives": [
              "Explain what test doubles in depth means and where it appears in real systems",
              "Apply test doubles in depth to a small realistic problem",
              "Recognise the common mistakes people make with test doubles in depth"
            ],
            "introduction": "In this lesson you will see test doubles in depth in action, work through a guided example, and practise it yourself.",
            "concept": "Test doubles come in flavours, and picking the right one matters: a dummy is a placeholder argument that is never used; a stub returns canned answers; a spy records how it was called; a mock is a spy with expectations set in advance; and a fake is a working implementation with shortcuts, like an in-memory repository. Use a stub when the code needs an answer, a spy or mock when the code must call something, and a fake when the code needs a whole subsystem. The deeper principle is that doubles exist to control the boundary — if you find yourself doubling your own code, the design needs a seam, not a better double.",
            "syntax": "dummy: unused; stub: canned answers; spy: records; mock: expectations; fake: working shortcut",
            "analogy": "Test doubles are like film props: a dummy is a background extra, a stub is a prop that looks right, and a fake is a working replica of the real thing.",
            "exampleCode": "class FakeRepo:\n    def __init__(self):\n        self.data = {}\n    def save(self, key, value):\n        self.data[key] = value\n    def get(self, key):\n        return self.data.get(key)\nrepo = FakeRepo()\nrepo.save(\"a\", 1)\nprint(\"Fake repo returns:\", repo.get(\"a\"))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how test doubles in depth is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Using a mock where a simple stub would do.",
              "Doubling your own code instead of adding a seam at the boundary.",
              "Letting a fake diverge from the real implementation's behaviour."
            ],
            "debugging": {
              "prompt": "This 'fake' repository loses data between calls. Find the bug.",
              "buggyCode": "class FakeRepo:\n    def save(self, key, value):\n        data = {}\n        data[key] = value\n    def get(self, key):\n        return None",
              "fixedCode": "class FakeRepo:\n    def __init__(self):\n        self.data = {}\n    def save(self, key, value):\n        self.data[key] = value\n    def get(self, key):\n        return self.data.get(key)",
              "explanation": "The fake stored data in a local variable that vanished each call; state must live on self so it persists."
            },
            "miniChallenge": "Extend the exercise: apply test doubles in depth to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Test doubles range from dummies and stubs to spies, mocks, and fakes; choose by what the code needs — an answer, a recorded call, or a working subsystem.",
            "quiz": [
              {
                "question": "When should you use a stub?",
                "options": [
                  "When you need to verify a call happened",
                  "When the code under test needs a canned answer from a collaborator",
                  "When you need a whole subsystem",
                  "Never"
                ],
                "answer": 1,
                "explanation": "Stubs answer questions with fixed values so the code under test can proceed."
              },
              {
                "question": "What is a fake?",
                "options": [
                  "A mock with expectations",
                  "A simple working implementation, like an in-memory repository",
                  "A placeholder that is never used",
                  "A broken implementation"
                ],
                "answer": 1,
                "explanation": "A fake really works, just with shortcuts — an in-memory store instead of a real database."
              }
            ],
            "exercise": {
              "title": "Fake repository round-trip",
              "type": "write-code",
              "instructions": "Write a program that reads a key and a value, stores them in a dict (a fake repository), then prints exactly: Stored <key>=<value>, got <value>.",
              "starterCode": "key = input().strip()\nvalue = input().strip()\nrepo = {}\n# store and retrieve\n",
              "solution": "key = input().strip()\nvalue = input().strip()\nrepo = {}\nrepo[key] = value\nprint(f\"Stored {key}={value}, got {repo[key]}\")",
              "solutionExplanation": "Store the pair in a dict and read it back to prove the round-trip works.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "a=1",
                  "hidden": false,
                  "stdin": "a\n1\n",
                  "expectedStdout": "Stored a=1, got 1"
                },
                {
                  "name": "name=Ada",
                  "hidden": true,
                  "stdin": "name\nAda\n",
                  "expectedStdout": "Stored name=Ada, got Ada"
                }
              ],
              "hintNotes": {
                "concept": "A fake repository is just a dict: store a value, read it back, and the round-trip proves it works.",
                "approach": "Assign repo[key] = value, then read repo[key] in the print.",
                "structure": "Structure: read key and value, store, then one print with both."
              },
              "id": "testing-tdd-m3-l2-e1"
            }
          },
          {
            "id": "testing-tdd-m3-l3",
            "slug": "testing-tdd-m3-l3",
            "title": "Testing Edge Cases",
            "objectives": [
              "Explain what testing edge cases means and where it appears in real systems",
              "Apply testing edge cases to a small realistic problem",
              "Recognise the common mistakes people make with testing edge cases"
            ],
            "introduction": "Here you will get hands-on with testing edge cases: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Bugs live at the edges: empty inputs, zero, one, the maximum, the day the year changes, and the string with the unexpected character. A good test suite probes boundaries deliberately — for a function that accepts 1 to 100, test 0, 1, 100, and 101, not just 50. Parametrisation is pytest's tool for this: @pytest.mark.parametrize runs the same test with many inputs, so one test function covers the whole boundary table. Edge cases also include the unhappy paths: what happens when the file is missing, the network fails, or the input is None? Code that handles only the happy path is code that will fail in production at 3 a.m.",
            "syntax": "boundaries: 0, 1, max, max+1; parametrize to cover the table",
            "analogy": "Testing edge cases is like checking a bridge at its limits: you test the lightest load, the heaviest load, and one tonne over — not just an average car.",
            "exampleCode": "def clamp(value, low, high):\n    return max(low, min(high, value))\nfor v in [0, 1, 50, 100, 101]:\n    print(v, \"->\", clamp(v, 1, 100))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where testing edge cases does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Testing only the middle of the range and missing off-by-one errors.",
              "Writing a separate test function for each boundary value instead of parametrising.",
              "Forgetting the unhappy paths: missing files, None inputs, failed networks."
            ],
            "debugging": {
              "prompt": "This clamp should return 1 for input 0, but it returns 0. Find the bug.",
              "buggyCode": "def clamp(value, low, high):\n    return min(high, value)\nprint(clamp(0, 1, 100))",
              "fixedCode": "def clamp(value, low, high):\n    return max(low, min(high, value))\nprint(clamp(0, 1, 100))",
              "explanation": "The clamp is missing the lower bound: max(low, ...) is needed to lift values below low up to low."
            },
            "miniChallenge": "Extend the exercise: apply testing edge cases to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Bugs live at the edges: test the boundaries and just beyond them, parametrise to cover the table, and always test the unhappy paths too.",
            "quiz": [
              {
                "question": "For a function accepting 1 to 100, which values should you test?",
                "options": [
                  "Only 50",
                  "0, 1, 100, and 101 — the boundaries and just outside them",
                  "Only 1 and 100",
                  "Random values"
                ],
                "answer": 1,
                "explanation": "Boundary testing probes the edges and just beyond them, where off-by-one bugs live."
              },
              {
                "question": "What does @pytest.mark.parametrize do?",
                "options": [
                  "It runs tests in parallel",
                  "It runs the same test with many different inputs",
                  "It skips tests",
                  "It measures coverage"
                ],
                "answer": 1,
                "explanation": "Parametrisation turns one test function into many cases, one per input row."
              }
            ],
            "exercise": {
              "title": "Clamp a value",
              "type": "write-code",
              "instructions": "Write a program that reads a value, a low bound, and a high bound, then prints the clamped value: below low prints low, above high prints high, otherwise the value.",
              "starterCode": "value = int(input())\nlow = int(input())\nhigh = int(input())\n# clamp with max(low, min(high, value))\n",
              "solution": "value = int(input())\nlow = int(input())\nhigh = int(input())\nprint(max(low, min(high, value)))",
              "solutionExplanation": "Use min to cap at the high bound and max to lift to the low bound.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "0 clamped to 1..100",
                  "hidden": false,
                  "stdin": "0\n1\n100\n",
                  "expectedStdout": "1"
                },
                {
                  "name": "150 clamped to 1..100",
                  "hidden": true,
                  "stdin": "150\n1\n100\n",
                  "expectedStdout": "100"
                }
              ],
              "hintNotes": {
                "concept": "Clamping has two edges: below the low bound and above the high bound.",
                "approach": "Compute max(low, min(high, value)) and print it.",
                "structure": "Structure: read three numbers, then one print with the clamp expression."
              },
              "id": "testing-tdd-m3-l3-e1"
            }
          }
        ]
      },
      {
        "id": "testing-tdd-m4",
        "title": "Beyond Unit Tests",
        "description": "Integration tests, end-to-end tests, and property-based testing.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "testing-tdd-m4-l1",
            "slug": "testing-tdd-m4-l1",
            "title": "Integration and End-to-End Tests",
            "objectives": [
              "Explain what integration and end-to-end tests means and where it appears in real systems",
              "Apply integration and end-to-end tests to a small realistic problem",
              "Recognise the common mistakes people make with integration and end-to-end tests"
            ],
            "introduction": "Here you will get hands-on with integration and end-to-end tests: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Unit tests prove a piece works in isolation; integration tests prove the pieces work together — the API talking to the real database, the service calling the real queue. They are slower and more fragile, so you need fewer of them, and they should test the seams: does the query return what the API expects, does the message arrive in the format the worker reads? End-to-end tests go further, driving the whole system through its real interface — a browser clicking through the checkout flow. The test pyramid guides the mix: many unit tests at the base, fewer integration tests in the middle, and a handful of end-to-end tests at the top.",
            "syntax": "pyramid: many unit, fewer integration, few end-to-end",
            "analogy": "The test pyramid is like a food pyramid: unit tests are the daily bread you eat most of, integration tests are the vegetables, and end-to-end tests are the occasional feast.",
            "exampleCode": "print(\"Unit: one function, mocked dependencies\")\nprint(\"Integration: real database, real queue\")\nprint(\"End-to-end: real browser, whole system\")\nprint(\"Pyramid: many unit, fewer integration, few E2E\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where integration and end-to-end tests does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Testing everything end-to-end because unit tests feel like extra work.",
              "Mocking the database in an integration test and testing nothing real.",
              "Letting integration tests depend on each other's data."
            ],
            "debugging": {
              "prompt": "This test suite has 100 end-to-end tests and 5 unit tests. What is wrong?",
              "buggyCode": "print(\"E2E: 100, unit: 5\")",
              "fixedCode": "print(\"Unit: 100, E2E: 5\")",
              "explanation": "The pyramid is inverted: most tests should be fast unit tests, with only a few slow end-to-end tests at the top."
            },
            "miniChallenge": "Extend the exercise: apply integration and end-to-end tests to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "The test pyramid mixes many fast unit tests, fewer integration tests at the real seams, and a handful of end-to-end tests over the critical paths.",
            "quiz": [
              {
                "question": "What does an integration test prove that a unit test does not?",
                "options": [
                  "That the code is fast",
                  "That the pieces work together across a real seam",
                  "That the code compiles",
                  "That the UI looks good"
                ],
                "answer": 1,
                "explanation": "Integration tests exercise real collaborations — API to database, service to queue — where unit tests use doubles."
              },
              {
                "question": "Why should end-to-end tests be few?",
                "options": [
                  "They are useless",
                  "They are slow, fragile, and expensive to maintain",
                  "They cannot find bugs",
                  "They run too fast"
                ],
                "answer": 1,
                "explanation": "E2E tests drive the whole system, so they are slow and break for many unrelated reasons — a few, covering the critical paths, is right."
              }
            ],
            "exercise": {
              "title": "Place the test in the pyramid",
              "type": "multiple-choice",
              "instructions": "A test drives a real browser through the whole checkout flow. Where does it belong in the test pyramid?",
              "starterCode": "",
              "solution": "At the top — a few end-to-end tests covering critical paths",
              "solutionExplanation": "End-to-end tests are slow and fragile, so the pyramid keeps only a handful at the top, with many fast unit tests at the base.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Ask what the test drives: a whole system through its real interface is end-to-end.",
                "approach": "End-to-end tests are the top of the pyramid — few and precious.",
                "structure": "Structure: unit at the base, integration in the middle, E2E at the top."
              },
              "options": [
                "At the base — write hundreds of them",
                "In the middle, with integration tests",
                "At the top — a few end-to-end tests covering critical paths",
                "Nowhere — browser tests are useless"
              ],
              "answerIndex": 2,
              "id": "testing-tdd-m4-l1-e1"
            }
          },
          {
            "id": "testing-tdd-m4-l2",
            "slug": "testing-tdd-m4-l2",
            "title": "Property-Based Testing",
            "objectives": [
              "Explain what property-based testing means and where it appears in real systems",
              "Apply property-based testing to a small realistic problem",
              "Recognise the common mistakes people make with property-based testing"
            ],
            "introduction": "Here you will get hands-on with property-based testing: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Property-based testing flips the usual approach: instead of writing examples, you state a property the code must always satisfy, and the framework generates hundreds of random inputs to try to break it. For a sorting function the property is simple — the output is sorted and contains the same elements as the input. The framework shrinks any failing input to the smallest example that still fails, which makes the bug obvious. Property tests are best for pure functions with clear invariants: parsers, encoders, arithmetic, and data structures. They do not replace example tests — a property can pass while a specific important case is wrong — but they find the edge cases you would never think to write.",
            "syntax": "state a property; the framework generates inputs and shrinks failures",
            "analogy": "Property-based testing is like hiring a mischievous assistant who tries hundreds of weird inputs to break your code, then shows you the smallest one that did.",
            "exampleCode": "def is_sorted(xs):\n    return all(xs[i] <= xs[i + 1] for i in range(len(xs) - 1))\nprint(is_sorted(sorted([3, 1, 2])))\nprint(is_sorted([3, 1, 2]))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where property-based testing does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Writing a property so weak that broken code passes it.",
              "Using property tests for code with no clear invariant.",
              "Replacing all example tests with property tests."
            ],
            "debugging": {
              "prompt": "This property check for sorting is incomplete. What is missing?",
              "buggyCode": "def check(xs):\n    return is_sorted(sorted(xs))",
              "fixedCode": "def check(xs):\n    result = sorted(xs)\n    return is_sorted(result) and sorted(result) == sorted(xs)",
              "explanation": "Sortedness alone is not enough — the output must also contain the same elements as the input, or a function returning [] would pass."
            },
            "miniChallenge": "Extend the exercise: apply property-based testing to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Property-based testing states an invariant and lets the framework hunt for counterexamples, shrinking failures to the smallest breaking input — ideal for pure functions with clear rules.",
            "quiz": [
              {
                "question": "What do you write in a property-based test?",
                "options": [
                  "Many examples",
                  "A property the code must satisfy for all inputs, and the framework generates the inputs",
                  "A mock",
                  "A performance benchmark"
                ],
                "answer": 1,
                "explanation": "You state the invariant; the framework generates hundreds of cases and hunts for a counterexample."
              },
              {
                "question": "What is shrinking?",
                "options": [
                  "Making the test run faster",
                  "Reducing a failing input to the smallest example that still fails",
                  "Compressing the output",
                  "Deleting the test"
                ],
                "answer": 1,
                "explanation": "Shrinking minimises the failing case so the bug is easy to see and reproduce."
              }
            ],
            "exercise": {
              "title": "Check the sorted property",
              "type": "write-code",
              "instructions": "Write a program that reads numbers separated by spaces and prints SORTED if they are in non-decreasing order, otherwise UNSORTED.",
              "starterCode": "nums = [int(x) for x in input().split()]\n# sorted if each element <= the next\n",
              "solution": "nums = [int(x) for x in input().split()]\nprint(\"SORTED\" if all(nums[i] <= nums[i + 1] for i in range(len(nums) - 1)) else \"UNSORTED\")",
              "solutionExplanation": "Check every adjacent pair: the list is sorted when each element is at most the next one.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "1 2 3",
                  "hidden": false,
                  "stdin": "1 2 3\n",
                  "expectedStdout": "SORTED"
                },
                {
                  "name": "3 1 2",
                  "hidden": true,
                  "stdin": "3 1 2\n",
                  "expectedStdout": "UNSORTED"
                }
              ],
              "hintNotes": {
                "concept": "The sorted property is about adjacent pairs: each one must be no bigger than the next.",
                "approach": "Use all() over the adjacent comparisons.",
                "structure": "Structure: read the numbers, then one print with the property check."
              },
              "id": "testing-tdd-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "testing-tdd-m5",
        "title": "Testing in Practice",
        "description": "Coverage, mutation testing, and testing in CI.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "testing-tdd-m5-l1",
            "slug": "testing-tdd-m5-l1",
            "title": "Coverage and Mutation Testing",
            "objectives": [
              "Explain what coverage and mutation testing means and where it appears in real systems",
              "Apply coverage and mutation testing to a small realistic problem",
              "Recognise the common mistakes people make with coverage and mutation testing"
            ],
            "introduction": "In this lesson you will see coverage and mutation testing in action, work through a guided example, and practise it yourself.",
            "concept": "Coverage measures which lines your tests execute: 100% line coverage means every line ran at least once, but it says nothing about whether the tests actually checked the results — a test can execute a line and assert nothing about it. Branch coverage is stricter, requiring both sides of every if to run. Mutation testing goes further: it deliberately breaks the code (changing + to -, or True to False) and checks that a test fails. A mutant that survives means your tests are not really checking that behaviour. Coverage tells you what you have not tested; mutation testing tells you whether what you did test actually matters.",
            "syntax": "line coverage: lines executed; mutation: break the code, tests must fail",
            "analogy": "Coverage is like checking that every room in a house was visited; mutation testing is like checking that the smoke alarm actually goes off when there is smoke.",
            "exampleCode": "def add(a, b):\n    return a + b\nprint(\"Line coverage: was add() executed?\")\nprint(\"Mutation: change + to - ; a good test must fail.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how coverage and mutation testing is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Chasing 100% coverage by testing trivial code and ignoring risky code.",
              "Treating coverage as a quality target instead of a gap-finder.",
              "Writing tests with no assertions just to raise coverage."
            ],
            "debugging": {
              "prompt": "This test suite has 100% coverage but a mutant changing + to - survives. What is wrong?",
              "buggyCode": "def test_add():\n    add(2, 3)  # no assertion",
              "fixedCode": "def test_add():\n    assert add(2, 3) == 5",
              "explanation": "The test executes add() but asserts nothing, so breaking the code changes no test result — coverage without assertions is theatre."
            },
            "miniChallenge": "Extend the exercise: apply coverage and mutation testing to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Coverage shows which lines tests execute; mutation testing shows whether tests actually verify behaviour — a surviving mutant means an untested behaviour.",
            "quiz": [
              {
                "question": "What does 100% line coverage guarantee?",
                "options": [
                  "The code is bug-free",
                  "Every line ran at least once — nothing about whether results were checked",
                  "Every branch was tested",
                  "The tests are fast"
                ],
                "answer": 1,
                "explanation": "Coverage measures execution, not verification: a test can run a line and assert nothing about it."
              },
              {
                "question": "What does a surviving mutant mean?",
                "options": [
                  "The code is correct",
                  "No test failed when the code was deliberately broken, so that behaviour is untested",
                  "The mutation tool is broken",
                  "Coverage is 100%"
                ],
                "answer": 1,
                "explanation": "A surviving mutant proves the tests do not check the mutated behaviour."
              }
            ],
            "exercise": {
              "title": "Compute line coverage",
              "type": "write-code",
              "instructions": "Write a program that reads total lines and lines executed by tests, then prints exactly: Coverage: <n>% with one decimal place.",
              "starterCode": "total = int(input())\nexecuted = int(input())\n# coverage = executed / total * 100\n",
              "solution": "total = int(input())\nexecuted = int(input())\nprint(f\"Coverage: {executed / total * 100:.1f}%\")",
              "solutionExplanation": "Divide executed lines by total lines, multiply by 100, and format with one decimal place.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100 lines, 85 executed",
                  "hidden": false,
                  "stdin": "100\n85\n",
                  "expectedStdout": "Coverage: 85.0%"
                },
                {
                  "name": "200 lines, 200 executed",
                  "hidden": true,
                  "stdin": "200\n200\n",
                  "expectedStdout": "Coverage: 100.0%"
                }
              ],
              "hintNotes": {
                "concept": "Coverage is the fraction of lines the tests actually executed.",
                "approach": "Compute executed / total * 100 and format with :.1f.",
                "structure": "Structure: read two numbers, then one print with the percentage."
              },
              "id": "testing-tdd-m5-l1-e1"
            }
          },
          {
            "id": "testing-tdd-m5-l2",
            "slug": "testing-tdd-m5-l2",
            "title": "Testing in CI",
            "objectives": [
              "Explain what testing in CI means and where it appears in real systems",
              "Apply testing in CI to a small realistic problem",
              "Recognise the common mistakes people make with testing in CI"
            ],
            "introduction": "In this lesson you will see testing in CI in action, work through a guided example, and practise it yourself.",
            "concept": "Continuous integration runs your tests on every push, so a broken change is caught within minutes instead of at release time. The CI pipeline typically checks out the code, installs dependencies, runs the linter and the test suite, and reports the result on the pull request — a red check blocks the merge. Tests that run in CI must be reliable: a flaky test that fails randomly trains the team to ignore failures, which is worse than no test at all. The discipline is to keep the suite fast enough that developers run it before pushing, and deterministic enough that a failure always means a real problem.",
            "syntax": "CI: tests run on every push; red blocks the merge; flaky tests must be fixed or deleted",
            "analogy": "CI is like a spell-checker that runs every time you save: it catches the mistake while the sentence is still fresh in your mind, not when the book is printed.",
            "exampleCode": "print(\"CI pipeline: checkout -> install -> lint -> test -> report\")\nprint(\"Red check = do not merge.\")\nprint(\"Flaky test? Fix it or delete it.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how testing in CI is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Letting flaky tests stay in the suite until everyone ignores CI.",
              "Running the suite only before releases instead of on every push.",
              "Merging with a red check 'just this once'."
            ],
            "debugging": {
              "prompt": "This CI config runs the tests but never blocks a broken merge. What is missing?",
              "buggyCode": "steps:\n  - run: pytest\n  - run: merge anyway",
              "fixedCode": "steps:\n  - run: pytest\n  - run: merge only if tests pass",
              "explanation": "The pipeline must gate the merge on the test result; running tests without acting on them is decoration."
            },
            "miniChallenge": "Extend the exercise: apply testing in CI to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "CI runs the test suite on every push and blocks merges on failure; the suite must be fast enough to run often and deterministic enough that red always means a real problem.",
            "quiz": [
              {
                "question": "What should happen when CI tests fail on a pull request?",
                "options": [
                  "Merge anyway",
                  "The merge is blocked until the tests pass",
                  "Delete the tests",
                  "Ignore the failure"
                ],
                "answer": 1,
                "explanation": "A red CI check blocks merging so broken code never reaches the main branch."
              },
              {
                "question": "Why are flaky tests dangerous?",
                "options": [
                  "They are slow",
                  "They train the team to ignore failures, so real breakages get missed",
                  "They use too much memory",
                  "They cannot run in CI"
                ],
                "answer": 1,
                "explanation": "Random failures teach everyone that red is normal — and then a real failure is ignored too."
              }
            ],
            "exercise": {
              "title": "CI gate decision",
              "type": "write-code",
              "instructions": "Write a program that reads the number of failed tests and prints exactly: MERGE BLOCKED if any failed, otherwise MERGE OK.",
              "starterCode": "failed = int(input())\n# blocked if failed > 0\n",
              "solution": "failed = int(input())\nprint(\"MERGE BLOCKED\" if failed > 0 else \"MERGE OK\")",
              "solutionExplanation": "Any failure blocks the merge; zero failures allow it.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "0 failed",
                  "hidden": false,
                  "stdin": "0\n",
                  "expectedStdout": "MERGE OK"
                },
                {
                  "name": "2 failed",
                  "hidden": true,
                  "stdin": "2\n",
                  "expectedStdout": "MERGE BLOCKED"
                }
              ],
              "hintNotes": {
                "concept": "A CI gate is a simple rule: any red test blocks the merge.",
                "approach": "Use a conditional expression on failed > 0.",
                "structure": "Structure: read the failure count, then one print with the decision."
              },
              "id": "testing-tdd-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "debugging-mastery",
    "slug": "debugging-mastery",
    "language": "python",
    "category": "cs-career",
    "title": "Debugging Mastery",
    "description": "Find bugs like a professional: the scientific method, reading errors, pdb, boundary bugs, state bugs, race conditions, and performance debugging.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Scientific debugging",
      "Reading tracebacks",
      "pdb",
      "Print debugging",
      "Off-by-one errors",
      "State bugs",
      "Race conditions",
      "Profiling"
    ],
    "prerequisites": [
      "Basic Python programming"
    ],
    "modules": [
      {
        "id": "debugging-mastery-m1",
        "title": "Debugging Mindset",
        "description": "The scientific method and reading error messages.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "debugging-mastery-m1-l1",
            "slug": "debugging-mastery-m1-l1",
            "title": "The Scientific Method of Debugging",
            "objectives": [
              "Explain what scientific debugging means and where it appears in real systems",
              "Apply scientific debugging to a small realistic problem",
              "Recognise the common mistakes people make with scientific debugging"
            ],
            "introduction": "This lesson introduces scientific debugging. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Debugging is not guessing — it is the scientific method applied to code. First reproduce the bug reliably, so you know when it is fixed. Then form a hypothesis about the cause, based on what you have observed. Then design the smallest experiment that can prove or disprove it: change one thing, run it, and watch. If the hypothesis is wrong, you have still learned something — the bug is not there — and you form the next one. The most common failure is changing three things at once and not knowing which one fixed it, or 'fixing' a bug you never reproduced and cannot verify.",
            "syntax": "reproduce -> hypothesise -> experiment -> observe -> repeat",
            "analogy": "Debugging is like detective work: you gather evidence, form a theory, test it, and only arrest the suspect when the evidence fits — never on a hunch.",
            "exampleCode": "print(\"1. Reproduce the bug reliably\")\nprint(\"2. Hypothesise one cause\")\nprint(\"3. Change one thing and test it\")\nprint(\"4. Repeat until the evidence fits\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem scientific debugging solves in plain words.",
              "Follow the example step by step and note where scientific debugging changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Fixing a bug you never reproduced, so you cannot verify the fix.",
              "Changing several things at once and not knowing what worked.",
              "Assuming the first hypothesis is right without testing it."
            ],
            "debugging": {
              "prompt": "A developer changed three things at once and the bug vanished. What is the problem?",
              "buggyCode": "print(\"Changed: config, library, and code — bug gone\")",
              "fixedCode": "print(\"Changed: one thing at a time — bug gone after the config change\")",
              "explanation": "With three simultaneous changes, nobody knows which one fixed the bug — or whether it is really fixed at all."
            },
            "miniChallenge": "Extend the exercise: apply scientific debugging to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Debugging is the scientific method: reproduce reliably, hypothesise one cause, test it with a single controlled change, and repeat until the evidence fits.",
            "quiz": [
              {
                "question": "Why must you reproduce a bug before fixing it?",
                "options": [
                  "To waste time",
                  "So you know when it is actually fixed and can verify the fix",
                  "To show your manager",
                  "Reproduction is optional"
                ],
                "answer": 1,
                "explanation": "Without a reliable reproduction you cannot tell whether your fix worked or the bug just hid."
              },
              {
                "question": "Why change only one thing at a time?",
                "options": [
                  "To save typing",
                  "So you know which change fixed the bug",
                  "To make the code shorter",
                  "It is a company rule"
                ],
                "answer": 1,
                "explanation": "Changing several things at once leaves you unable to say which one mattered — or whether any of them did."
              }
            ],
            "exercise": {
              "title": "Pick the scientific step",
              "type": "multiple-choice",
              "instructions": "You have a hypothesis about a bug. What is the right next step?",
              "starterCode": "",
              "solution": "Design the smallest experiment that can prove or disprove it",
              "solutionExplanation": "A hypothesis is only useful if you test it with one controlled change and observe the result. Guessing, or changing everything at once, teaches you nothing.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "A hypothesis needs a test — one change, one observation.",
                "approach": "Look for the option that tests the idea with a small controlled change.",
                "structure": "Structure: hypothesise, then experiment with a single change."
              },
              "options": [
                "Change three things at once and see what happens",
                "Design the smallest experiment that can prove or disprove it",
                "Delete the code and rewrite it",
                "Ask a colleague to fix it without evidence"
              ],
              "answerIndex": 1,
              "id": "debugging-mastery-m1-l1-e1"
            }
          },
          {
            "id": "debugging-mastery-m1-l2",
            "slug": "debugging-mastery-m1-l2",
            "title": "Reading Error Messages",
            "objectives": [
              "Explain what reading error messages means and where it appears in real systems",
              "Apply reading error messages to a small realistic problem",
              "Recognise the common mistakes people make with reading error messages"
            ],
            "introduction": "In this lesson you will see reading error messages in action, work through a guided example, and practise it yourself.",
            "concept": "Python's tracebacks are the most useful debugging tool you already have — if you read them bottom-up. The last line names the error and the message: NameError means a name does not exist, TypeError means the wrong kind of value, IndexError means an out-of-range index, and KeyError means a missing dict key. The lines above it are the call stack, newest call last, with file names and line numbers pointing at exactly where the failure happened. The most common beginner mistake is reading the first line of the traceback, which is the oldest call, instead of the last line, which is the actual error.",
            "syntax": "read the last line first: error type + message, then the stack above it",
            "analogy": "A traceback is like a crime scene report read backwards: the last line is the cause of death, and the lines above it trace how the victim got there.",
            "exampleCode": "try:\n    items = [1, 2, 3]\n    print(items[5])\nexcept IndexError as e:\n    print(\"Caught IndexError:\", e)",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how reading error messages is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Reading the first line of a traceback instead of the last.",
              "Catching a broad Exception and hiding the real error.",
              "Assuming the line in the traceback is always where the bug was introduced."
            ],
            "debugging": {
              "prompt": "This code should catch the IndexError, but it crashes. Find the bug.",
              "buggyCode": "try:\n    items = [1, 2, 3]\n    print(items[5])\nexcept KeyError:\n    print(\"Caught it\")",
              "fixedCode": "try:\n    items = [1, 2, 3]\n    print(items[5])\nexcept IndexError:\n    print(\"Caught it\")",
              "explanation": "An out-of-range list index raises IndexError, not KeyError — the except clause names the wrong exception."
            },
            "miniChallenge": "Extend the exercise: apply reading error messages to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Read tracebacks bottom-up: the last line names the error, the stack above shows how execution got there — and each error type points at a specific mistake.",
            "quiz": [
              {
                "question": "Where is the actual error in a traceback?",
                "options": [
                  "The first line",
                  "The last line — the error type and message",
                  "The middle line",
                  "The file name"
                ],
                "answer": 1,
                "explanation": "The last line names the exception and its message; the stack above shows the call chain."
              },
              {
                "question": "What does a KeyError mean?",
                "options": [
                  "The dict is empty",
                  "A dict was accessed with a key that does not exist",
                  "The key is too long",
                  "The dict is full"
                ],
                "answer": 1,
                "explanation": "KeyError is raised when you look up a missing key in a dict."
              }
            ],
            "exercise": {
              "title": "Name the error type",
              "type": "write-code",
              "instructions": "Write a program that reads an index for the list [10, 20, 30] and prints the value, or IndexError if the index is out of range. Use try/except.",
              "starterCode": "items = [10, 20, 30]\ni = int(input())\n# try items[i], except IndexError print \"IndexError\"\n",
              "solution": "items = [10, 20, 30]\ni = int(input())\ntry:\n    print(items[i])\nexcept IndexError:\n    print(\"IndexError\")",
              "solutionExplanation": "Indexing outside the list raises IndexError; catch it and print the error name.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Index 1",
                  "hidden": false,
                  "stdin": "1\n",
                  "expectedStdout": "20"
                },
                {
                  "name": "Index 5",
                  "hidden": true,
                  "stdin": "5\n",
                  "expectedStdout": "IndexError"
                }
              ],
              "hintNotes": {
                "concept": "Python names its errors: an out-of-range index is an IndexError.",
                "approach": "Wrap the lookup in try/except IndexError and print the value or the error name.",
                "structure": "Structure: read the index, try the lookup, catch IndexError."
              },
              "id": "debugging-mastery-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "debugging-mastery-m2",
        "title": "Debugging Tools",
        "description": "Print debugging done right and the pdb debugger.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "debugging-mastery-m2-l1",
            "slug": "debugging-mastery-m2-l1",
            "title": "Print Debugging Done Right",
            "objectives": [
              "Explain what print debugging means and where it appears in real systems",
              "Apply print debugging to a small realistic problem",
              "Recognise the common mistakes people make with print debugging"
            ],
            "introduction": "In this lesson you will see print debugging in action, work through a guided example, and practise it yourself.",
            "concept": "Print debugging gets mocked, but done well it is fast and effective: print the value that matters, with a label, at the point where it matters — not a bare print(x) that leaves you guessing which print it was. Print the inputs and the output of the suspicious function, print the type as well as the value when the value looks right but the code still fails, and print a marker when a branch is taken so you know which path executed. The discipline is to remove the prints afterwards (or use logging, which can stay) and to print the smallest amount that answers your question — a flood of output is as useless as none.",
            "syntax": "print labelled values at the suspicious point; include the type when stuck",
            "analogy": "Print debugging is like leaving breadcrumbs: a few labelled markers show exactly where the trail went, but a whole loaf scattered everywhere hides it.",
            "exampleCode": "def double(x):\n    print(f\"double called with x={x!r} type={type(x).__name__}\")\n    return x * 2\nprint(double(21))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how print debugging is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Printing bare values with no label, so you cannot tell which print is which.",
              "Printing everything instead of the one value that matters.",
              "Leaving debug prints in production code."
            ],
            "debugging": {
              "prompt": "This debug print is useless because it has no label. What is wrong?",
              "buggyCode": "x = \"21\"\nprint(x)",
              "fixedCode": "x = \"21\"\nprint(f\"x={x!r} type={type(x).__name__}\")",
              "explanation": "A bare print shows 21 with no clue it is a string; a labelled print with the type reveals the bug immediately."
            },
            "miniChallenge": "Extend the exercise: apply print debugging to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Print debugging works when prints are labelled, placed at the suspicious point, and include the type when the value looks right but the code still fails.",
            "quiz": [
              {
                "question": "What should a debug print include?",
                "options": [
                  "Only the value",
                  "A label, the value, and the type when the value looks right but the code fails",
                  "The whole program state",
                  "Nothing — prints are useless"
                ],
                "answer": 1,
                "explanation": "A labelled print with the type tells you exactly what the code saw, including surprises like '21' the string."
              },
              {
                "question": "What is the main risk of print debugging?",
                "options": [
                  "It is too slow",
                  "Leaving the prints in, or printing so much that the signal drowns",
                  "It changes the result",
                  "It only works once"
                ],
                "answer": 1,
                "explanation": "Stray prints pollute output and logs; a flood of prints hides the one line that matters."
              }
            ],
            "exercise": {
              "title": "Labelled debug print",
              "type": "write-code",
              "instructions": "Write a program that reads a value and prints exactly: value=<v> type=<t> where <t> is int if the input is a whole number. (All inputs here are integers.)",
              "starterCode": "raw = input().strip()\nvalue = int(raw)\n# print value=<value> type=int\n",
              "solution": "raw = input().strip()\nvalue = int(raw)\nprint(f\"value={value} type={type(value).__name__}\")",
              "solutionExplanation": "Use an f-string with the value and type(value).__name__ to produce a labelled debug line.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "42",
                  "hidden": false,
                  "stdin": "42\n",
                  "expectedStdout": "value=42 type=int"
                },
                {
                  "name": "7",
                  "hidden": true,
                  "stdin": "7\n",
                  "expectedStdout": "value=7 type=int"
                }
              ],
              "hintNotes": {
                "concept": "A good debug print labels the value and shows its type.",
                "approach": "Use an f-string with {value} and {type(value).__name__}.",
                "structure": "Structure: read and convert the input, then one labelled print."
              },
              "id": "debugging-mastery-m2-l1-e1"
            }
          },
          {
            "id": "debugging-mastery-m2-l2",
            "slug": "debugging-mastery-m2-l2",
            "title": "Using pdb",
            "objectives": [
              "Explain what using pdb means and where it appears in real systems",
              "Apply using pdb to a small realistic problem",
              "Recognise the common mistakes people make with using pdb"
            ],
            "introduction": "Here you will get hands-on with using pdb: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "pdb is Python's built-in debugger, and it beats print debugging when you need to explore: breakpoint() drops you into an interactive prompt at that line, where you can inspect any variable, step to the next line with n, step into a call with s, continue with c, and print expressions with p. The workflow is to set a breakpoint just before the suspicious code, step through it line by line, and watch the values change — which usually shows the bug within a minute. The most useful commands are the smallest set: n (next), s (step into), c (continue), p (print), and l (list the surrounding code).",
            "syntax": "breakpoint() -> n next, s step in, c continue, p print, l list",
            "analogy": "pdb is like freezing time in a film: you pause the scene, walk around the set, and inspect every prop before letting the action continue.",
            "exampleCode": "def total(items):\n    result = 0\n    for item in items:\n        result += item\n    return result\nprint(total([1, 2, 3]))\nprint(\"Add breakpoint() before the loop to inspect result step by step.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where using pdb does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Adding prints everywhere instead of stepping through once in pdb.",
              "Setting a breakpoint after the bug has already happened.",
              "Forgetting to remove breakpoint() calls before committing."
            ],
            "debugging": {
              "prompt": "This debugging session never pauses. What is missing?",
              "buggyCode": "def total(items):\n    result = 0\n    for item in items:\n        result += item\n    return result\nprint(total([1, 2, 3]))",
              "fixedCode": "def total(items):\n    result = 0\n    breakpoint()\n    for item in items:\n        result += item\n    return result\nprint(total([1, 2, 3]))",
              "explanation": "There is no breakpoint() call, so the program runs straight through — the debugger is never entered."
            },
            "miniChallenge": "Extend the exercise: apply using pdb to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "pdb pauses execution at breakpoint() so you can inspect variables and step through code with n, s, c, p, and l — far faster than guessing with prints.",
            "quiz": [
              {
                "question": "What does breakpoint() do?",
                "options": [
                  "It stops the program forever",
                  "It drops you into an interactive debugger prompt at that line",
                  "It prints the variables",
                  "It restarts the program"
                ],
                "answer": 1,
                "explanation": "breakpoint() pauses execution in pdb, where you can inspect state and step through code."
              },
              {
                "question": "What does the pdb command n do?",
                "options": [
                  "It creates a new variable",
                  "It executes the next line and stays in the debugger",
                  "It quits",
                  "It runs to the end"
                ],
                "answer": 1,
                "explanation": "n steps over the next line, letting you watch values change one line at a time."
              }
            ],
            "exercise": {
              "title": "Pick the pdb command",
              "type": "multiple-choice",
              "instructions": "You are paused in pdb at a function call and want to step INTO the function to see what it does. Which command?",
              "starterCode": "",
              "solution": "s (step into)",
              "solutionExplanation": "s steps into the called function; n would execute the whole call and stay at the next line of the current function, and c would run to the next breakpoint.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Stepping into a call means entering the called function — that is s.",
                "approach": "n steps over, s steps in, c continues — pick the one that enters.",
                "structure": "Structure: s = step into, n = next line, c = continue."
              },
              "options": [
                "n (next)",
                "c (continue)",
                "s (step into)",
                "q (quit)"
              ],
              "answerIndex": 2,
              "id": "debugging-mastery-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "debugging-mastery-m3",
        "title": "Common Bug Families",
        "description": "Off-by-one errors and state bugs.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "debugging-mastery-m3-l1",
            "slug": "debugging-mastery-m3-l1",
            "title": "Off-by-One and Boundary Errors",
            "objectives": [
              "Explain what off-by-one errors means and where it appears in real systems",
              "Apply off-by-one errors to a small realistic problem",
              "Recognise the common mistakes people make with off-by-one errors"
            ],
            "introduction": "This lesson introduces off-by-one errors. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Off-by-one errors are the most common bug in programming: a loop that runs one time too many or too few, a slice that drops the last element, or a range that starts at 1 instead of 0. The classic forms are range(n) giving 0..n-1 (not 1..n), a fencepost error — ten fence sections need eleven posts — and comparing with < when you meant <=. The defence is to test the boundaries explicitly: run the code with n=0, n=1, and n=2, and check the first and last elements by hand. If a loop feels right but the count is wrong by one, it almost always is an off-by-one error.",
            "syntax": "range(n) = 0..n-1; fencepost: n sections need n+1 posts",
            "analogy": "Off-by-one is like building a fence: count the sections and you forget the extra post at the end — the fence looks right until you try to close it.",
            "exampleCode": "print(list(range(3)))  # 0, 1, 2 — not 1, 2, 3\nprint(\"10 sections need\", 10 + 1, \"posts\")\nprint(\"Last element:\", [10, 20, 30][-1])",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem off-by-one errors solves in plain words.",
              "Follow the example step by step and note where off-by-one errors changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Using range(n) when you need 1..n.",
              "Using < instead of <= at a boundary (or the reverse).",
              "Testing only the middle values and never 0, 1, or the maximum."
            ],
            "debugging": {
              "prompt": "This loop should print 1, 2, 3 but it prints 0, 1, 2. Find the bug.",
              "buggyCode": "for i in range(3):\n    print(i)",
              "fixedCode": "for i in range(1, 4):\n    print(i)",
              "explanation": "range(3) starts at 0; to print 1, 2, 3 you need range(1, 4)."
            },
            "miniChallenge": "Extend the exercise: apply off-by-one errors to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Off-by-one errors hide at boundaries: range(n) is 0..n-1, fenceposts need n+1 posts, and the fix is to test n=0, n=1, and the last element by hand.",
            "quiz": [
              {
                "question": "What does range(3) produce?",
                "options": [
                  "1, 2, 3",
                  "0, 1, 2",
                  "0, 1, 2, 3",
                  "3"
                ],
                "answer": 1,
                "explanation": "range(n) produces 0 through n-1 — three values for range(3)."
              },
              {
                "question": "What is a fencepost error?",
                "options": [
                  "A bug in a fence",
                  "Counting sections instead of posts, so the count is off by one at the boundary",
                  "An error in a loop variable",
                  "A missing import"
                ],
                "answer": 1,
                "explanation": "n sections need n+1 posts; counting only the sections is off by one."
              }
            ],
            "exercise": {
              "title": "Print 1 to n",
              "type": "write-code",
              "instructions": "Write a program that reads n and prints the numbers 1 through n separated by spaces.",
              "starterCode": "n = int(input())\n# range(1, n + 1) gives 1..n\n",
              "solution": "n = int(input())\nprint(\" \".join(str(i) for i in range(1, n + 1)))",
              "solutionExplanation": "range(1, n + 1) produces 1 through n; join the numbers with spaces.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "n=3",
                  "hidden": false,
                  "stdin": "3\n",
                  "expectedStdout": "1 2 3"
                },
                {
                  "name": "n=5",
                  "hidden": true,
                  "stdin": "5\n",
                  "expectedStdout": "1 2 3 4 5"
                }
              ],
              "hintNotes": {
                "concept": "range(n) stops at n-1, so to include n you must write range(1, n + 1).",
                "approach": "Build the range from 1 to n + 1 and join with spaces.",
                "structure": "Structure: read n, then one print with the joined range."
              },
              "id": "debugging-mastery-m3-l1-e1"
            }
          },
          {
            "id": "debugging-mastery-m3-l2",
            "slug": "debugging-mastery-m3-l2",
            "title": "State and Mutation Bugs",
            "objectives": [
              "Explain what state and mutation bugs means and where it appears in real systems",
              "Apply state and mutation bugs to a small realistic problem",
              "Recognise the common mistakes people make with state and mutation bugs"
            ],
            "introduction": "In this lesson you will see state and mutation bugs in action, work through a guided example, and practise it yourself.",
            "concept": "State bugs happen when a value changes somewhere you did not expect: a function mutates a list its caller still uses, a default argument is shared between calls, or a global is modified by a function that was supposed to be read-only. Python's most famous trap is the mutable default argument — def f(items=[]) shares one list across every call, so items accumulate forever. The defence is to make sharing explicit: default to None and create a fresh list inside, copy data before mutating it, and prefer returning new values over modifying inputs. When a value is wrong and you cannot see why, ask 'who else could have touched this?' and search for every mutation of it.",
            "syntax": "mutable default args are shared; mutating inputs surprises callers",
            "analogy": "A state bug is like a shared fridge in an office: someone else keeps eating your lunch, and the only fix is to find out who has access and label your food.",
            "exampleCode": "def add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\nprint(add_item(\"a\"))\nprint(add_item(\"b\"))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how state and mutation bugs is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Using a mutable object as a default argument.",
              "Mutating a list a caller passed in, without telling them.",
              "Storing state in a global that any function can change."
            ],
            "debugging": {
              "prompt": "This function should return ['b'] on the second call, but it returns ['a', 'b']. Find the bug.",
              "buggyCode": "def add_item(item, items=[]):\n    items.append(item)\n    return items\nprint(add_item(\"a\"))\nprint(add_item(\"b\"))",
              "fixedCode": "def add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\nprint(add_item(\"a\"))\nprint(add_item(\"b\"))",
              "explanation": "The default list is created once and shared, so the second call sees the first call's items; default to None and build a fresh list."
            },
            "miniChallenge": "Extend the exercise: apply state and mutation bugs to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "State bugs come from unexpected sharing: mutable defaults, mutated inputs, and globals. Default to None, copy before mutating, and return new values.",
            "quiz": [
              {
                "question": "Why is def f(items=[]) dangerous?",
                "options": [
                  "It is slow",
                  "The same list is shared across all calls, so items accumulate",
                  "It cannot be called",
                  "It uses too much memory"
                ],
                "answer": 1,
                "explanation": "Default arguments are evaluated once, so every call shares the same list object."
              },
              {
                "question": "What is the safe pattern for a mutable default?",
                "options": [
                  "Use a tuple",
                  "Default to None and create a fresh list inside the function",
                  "Use a global",
                  "Do not use defaults"
                ],
                "answer": 1,
                "explanation": "None as the default plus creating the list inside gives each call its own fresh object."
              }
            ],
            "exercise": {
              "title": "Fresh list per call",
              "type": "write-code",
              "instructions": "Write a program that reads two words and prints each on its own line, using a function collect(item, items=None) that returns a fresh list each call. Print the result of two separate calls.",
              "starterCode": "def collect(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n\na = input().strip()\nb = input().strip()\nprint(collect(a))\nprint(collect(b))",
              "solution": "def collect(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n\na = input().strip()\nb = input().strip()\nprint(collect(a))\nprint(collect(b))",
              "solutionExplanation": "Defaulting to None and creating the list inside gives each call its own fresh list, so the two calls do not share state.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "a then b",
                  "hidden": false,
                  "stdin": "a\nb\n",
                  "expectedStdout": "['a']\n['b']"
                },
                {
                  "name": "x then y",
                  "hidden": true,
                  "stdin": "x\ny\n",
                  "expectedStdout": "['x']\n['y']"
                }
              ],
              "hintNotes": {
                "concept": "Each call must get its own fresh list — the None default plus creating it inside is the pattern.",
                "approach": "Define collect with items=None and build the list inside.",
                "structure": "Structure: the function, read two words, print two separate calls."
              },
              "id": "debugging-mastery-m3-l2-e1"
            }
          }
        ]
      },
      {
        "id": "debugging-mastery-m4",
        "title": "Hard Bugs",
        "description": "Race conditions and performance debugging.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "debugging-mastery-m4-l1",
            "slug": "debugging-mastery-m4-l1",
            "title": "Race Conditions and Timing Bugs",
            "objectives": [
              "Explain what race conditions means and where it appears in real systems",
              "Apply race conditions to a small realistic problem",
              "Recognise the common mistakes people make with race conditions"
            ],
            "introduction": "In this lesson you will see race conditions in action, work through a guided example, and practise it yourself.",
            "concept": "A race condition is a bug that depends on timing: two threads or processes interleave in a way that produces a wrong result, but only sometimes — which is what makes them so hard to reproduce. The classic example is two threads incrementing a shared counter: both read 5, both add 1, both write 6, and one increment is lost. The fix is synchronisation (a lock around the read-modify-write) or removing the shared state entirely (each thread keeps its own count, merged at the end). Timing bugs also include code that depends on the order of events — a message arriving before its handler is registered — and the only reliable fix is to make the order explicit rather than hoping it works out.",
            "syntax": "race: result depends on interleaving; fix with a lock or no shared state",
            "analogy": "A race condition is like two people editing the same document at once: each sees the old version, each saves, and one person's changes vanish.",
            "exampleCode": "import threading\ncounter = 0\nlock = threading.Lock()\ndef bump():\n    global counter\n    with lock:\n        counter += 1\nprint(\"With a lock, increments are never lost.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how race conditions is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Assuming code that works once will work every time under concurrency.",
              "Locking only the write and not the read-modify-write as a whole.",
              "Depending on the order of events without making it explicit."
            ],
            "debugging": {
              "prompt": "Two threads increment a shared counter 1000 times each, but the total is less than 2000. What is wrong?",
              "buggyCode": "counter = 0\ndef bump():\n    global counter\n    counter += 1",
              "fixedCode": "counter = 0\nlock = threading.Lock()\ndef bump():\n    global counter\n    with lock:\n        counter += 1",
              "explanation": "The increment is a read-modify-write: two threads can read the same value and one update is lost. A lock makes it atomic."
            },
            "miniChallenge": "Extend the exercise: apply race conditions to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Race conditions depend on timing and vanish when you look for them; fix them with locks around the whole read-modify-write or by removing the shared state.",
            "quiz": [
              {
                "question": "Why are race conditions hard to reproduce?",
                "options": [
                  "They only happen on fast machines",
                  "The result depends on thread timing, which changes every run",
                  "They need a special compiler",
                  "They only happen at night"
                ],
                "answer": 1,
                "explanation": "Interleaving varies run to run, so the bug appears and disappears seemingly at random."
              },
              {
                "question": "What is the safest fix for a lost-update race on a counter?",
                "options": [
                  "Add more threads",
                  "Guard the read-modify-write with a lock, or give each thread its own counter",
                  "Ignore it",
                  "Use a faster CPU"
                ],
                "answer": 1,
                "explanation": "A lock serialises the update, or per-thread counters remove the sharing entirely."
              }
            ],
            "exercise": {
              "title": "Count increments without loss",
              "type": "write-code",
              "instructions": "Write a program that reads the number of threads and increments per thread, then prints exactly: Total: <n>. Each thread's increments are its own (no sharing), so the total is threads * per_thread.",
              "starterCode": "threads = int(input())\nper = int(input())\n# no shared state: total = threads * per\n",
              "solution": "threads = int(input())\nper = int(input())\nprint(f\"Total: {threads * per}\")",
              "solutionExplanation": "Without shared state there is nothing to race over: the total is simply threads times increments per thread.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "2 threads x 1000",
                  "hidden": false,
                  "stdin": "2\n1000\n",
                  "expectedStdout": "Total: 2000"
                },
                {
                  "name": "4 threads x 250",
                  "hidden": true,
                  "stdin": "4\n250\n",
                  "expectedStdout": "Total: 1000"
                }
              ],
              "hintNotes": {
                "concept": "A race needs shared mutable state; per-thread counts merged at the end have no race.",
                "approach": "Multiply threads by per-thread increments.",
                "structure": "Structure: read two numbers, then one print with the product."
              },
              "id": "debugging-mastery-m4-l1-e1"
            }
          },
          {
            "id": "debugging-mastery-m4-l2",
            "slug": "debugging-mastery-m4-l2",
            "title": "Performance Debugging",
            "objectives": [
              "Explain what performance debugging means and where it appears in real systems",
              "Apply performance debugging to a small realistic problem",
              "Recognise the common mistakes people make with performance debugging"
            ],
            "introduction": "In this lesson you will see performance debugging in action, work through a guided example, and practise it yourself.",
            "concept": "Performance bugs are usually not where you think: the instinct is to optimise the clever algorithm, but the real cost is usually a hidden quadratic loop, a database query inside a loop, or a function called a million times. The method is to measure first: profile with cProfile to find where the time actually goes, and only then optimise the hotspot. Common wins are using a set for membership tests instead of a list (O(1) instead of O(n)), building strings with join instead of += in a loop, and caching a repeated computation. Never optimise without measuring — you will optimise the wrong thing and make the code worse.",
            "syntax": "measure first with a profiler; the hotspot is rarely where you guessed",
            "analogy": "Performance debugging is like finding a traffic jam: you check the map (the profiler) instead of widening a random road and hoping it helps.",
            "exampleCode": "import cProfile\ndef slow():\n    return sum(i * i for i in range(1000))\ncProfile.run(\"slow()\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how performance debugging is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Optimising without profiling and fixing the wrong thing.",
              "Running a database query inside a loop (the N+1 problem).",
              "Building strings with += in a loop instead of join."
            ],
            "debugging": {
              "prompt": "This membership test is slow on a large list. What is the fix?",
              "buggyCode": "items = list(range(100000))\nprint(99999 in items)",
              "fixedCode": "items = set(range(100000))\nprint(99999 in items)",
              "explanation": "Use a set for membership tests: O(1) hashing instead of an O(n) linear scan through the list."
            },
            "miniChallenge": "Extend the exercise: apply performance debugging to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Performance debugging starts with measurement: profile first, fix the real hotspot — often a hidden quadratic loop, an N+1 query, or a linear membership test.",
            "quiz": [
              {
                "question": "What should you do first when code is slow?",
                "options": [
                  "Rewrite the algorithm",
                  "Profile to find where the time actually goes",
                  "Buy a faster computer",
                  "Add caching everywhere"
                ],
                "answer": 1,
                "explanation": "Measure first: the hotspot is rarely where you guessed, and optimising the wrong place wastes effort."
              },
              {
                "question": "Why is `x in my_list` slow for large lists?",
                "options": [
                  "Lists are unordered",
                  "Membership in a list is a linear scan, O(n); a set is O(1)",
                  "Lists cannot be searched",
                  "It copies the list"
                ],
                "answer": 1,
                "explanation": "List membership scans element by element; a set hashes the value and finds it in constant time."
              }
            ],
            "exercise": {
              "title": "Fast membership count",
              "type": "write-code",
              "instructions": "Write a program that reads a list of numbers (space-separated) and a query number, then prints YES if the query is in the list, otherwise NO. Build a set for the lookup.",
              "starterCode": "nums = set(int(x) for x in input().split())\nq = int(input())\nprint(\"YES\" if q in nums else \"NO\")",
              "solution": "nums = set(int(x) for x in input().split())\nq = int(input())\nprint(\"YES\" if q in nums else \"NO\")",
              "solutionExplanation": "A set gives O(1) membership testing; check whether the query is in the set.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "1 2 3, query 2",
                  "hidden": false,
                  "stdin": "1 2 3\n2\n",
                  "expectedStdout": "YES"
                },
                {
                  "name": "1 2 3, query 9",
                  "hidden": true,
                  "stdin": "1 2 3\n9\n",
                  "expectedStdout": "NO"
                }
              ],
              "hintNotes": {
                "concept": "Membership testing is the set's job — a list scan is O(n) and gets slow.",
                "approach": "Build a set from the numbers and test `q in nums`.",
                "structure": "Structure: read the list into a set, read the query, print YES or NO."
              },
              "id": "debugging-mastery-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "debugging-mastery-m5",
        "title": "Debugging in Practice",
        "description": "Real scenarios and preventing bugs with logging.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "debugging-mastery-m5-l1",
            "slug": "debugging-mastery-m5-l1",
            "title": "Debugging a Real-World Scenario",
            "objectives": [
              "Explain what debugging a real scenario means and where it appears in real systems",
              "Apply debugging a real scenario to a small realistic problem",
              "Recognise the common mistakes people make with debugging a real scenario"
            ],
            "introduction": "Here you will get hands-on with debugging a real scenario: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Real bugs rarely arrive with a neat reproduction: a user reports 'the checkout is broken sometimes', and you have to work backwards from a vague symptom. The method is to narrow the space: reproduce it if you can, otherwise gather the evidence — logs, the exact time, the user's steps, and what changed recently (a deploy is the prime suspect). Then bisect: the bug is either in the code, the data, or the environment, and each hypothesis can be tested cheaply — try the same steps with different data, on a different machine, or against the previous release. The breakthrough usually comes from one sharp question: what is different about the cases that fail?",
            "syntax": "narrow: reproduce, gather evidence, bisect code/data/environment",
            "analogy": "Real debugging is like a doctor diagnosing a patient: the symptom is vague, so you ask what changed, when it started, and what is different about the cases that fail.",
            "exampleCode": "print(\"What changed recently? (deploy is the prime suspect)\")\nprint(\"What is different about failing cases?\")\nprint(\"Bisect: code, data, or environment?\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where debugging a real scenario does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Assuming a bug is random when it actually depends on the data.",
              "Ignoring what changed recently, especially a deploy.",
              "Debugging in production instead of reproducing it elsewhere first."
            ],
            "debugging": {
              "prompt": "Checkout fails only for users with more than 10 items. What does that suggest?",
              "buggyCode": "print(\"The bug is random\")",
              "fixedCode": "print(\"The bug depends on the cart size — test with 10 vs 11 items\")",
              "explanation": "A threshold in the data (10 vs 11 items) suggests a boundary bug in the cart code — reproduce with exactly 11 items."
            },
            "miniChallenge": "Extend the exercise: apply debugging a real scenario to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Real bugs start vague: gather evidence, ask what changed and what differs about failing cases, then bisect between code, data, and environment.",
            "quiz": [
              {
                "question": "When a bug appears right after a deploy, what is the prime suspect?",
                "options": [
                  "The users",
                  "The deploy — what changed in it",
                  "The hardware",
                  "The weather"
                ],
                "answer": 1,
                "explanation": "A bug that starts with a release is most likely caused by something in that release; check the diff first."
              },
              {
                "question": "What is the key question when only some cases fail?",
                "options": [
                  "How many users are there?",
                  "What is different about the cases that fail?",
                  "What time is it?",
                  "Who wrote the code?"
                ],
                "answer": 1,
                "explanation": "Comparing failing and passing cases isolates the distinguishing factor — the clue that points at the cause."
              }
            ],
            "exercise": {
              "title": "Bisect by cart size",
              "type": "write-code",
              "instructions": "Write a program that reads a cart size and prints FAILS if the size is greater than 10, otherwise WORKS. (This models the failing-vs-passing split.)",
              "starterCode": "size = int(input())\n# fails only when size > 10\n",
              "solution": "size = int(input())\nprint(\"FAILS\" if size > 10 else \"WORKS\")",
              "solutionExplanation": "The boundary is 10: sizes above it fail, sizes at or below it work.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "11 items",
                  "hidden": false,
                  "stdin": "11\n",
                  "expectedStdout": "FAILS"
                },
                {
                  "name": "10 items",
                  "hidden": true,
                  "stdin": "10\n",
                  "expectedStdout": "WORKS"
                }
              ],
              "hintNotes": {
                "concept": "Comparing failing and passing cases finds the boundary where behaviour changes.",
                "approach": "Use a conditional on size > 10.",
                "structure": "Structure: read the size, then one print with the result."
              },
              "id": "debugging-mastery-m5-l1-e1"
            }
          },
          {
            "id": "debugging-mastery-m5-l2",
            "slug": "debugging-mastery-m5-l2",
            "title": "Preventing Bugs with Logging",
            "objectives": [
              "Explain what preventing bugs with logging means and where it appears in real systems",
              "Apply preventing bugs with logging to a small realistic problem",
              "Recognise the common mistakes people make with preventing bugs with logging"
            ],
            "introduction": "This lesson introduces preventing bugs with logging. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Logging is debugging for the bugs you have not found yet: good logs record what happened, when, and with which inputs, so a future failure can be diagnosed from the log alone. Use levels properly — DEBUG for detail, INFO for normal events, WARNING for something odd, ERROR for a failure — and log structured facts (user id, order id, the value that was wrong), not just 'it failed'. The most valuable log line is often the one at the boundary: what came in, what went out, and how long it took. Logs you can search beat logs you can only read, so keep the format consistent and include a correlation id that ties one request's lines together.",
            "syntax": "log levels: DEBUG < INFO < WARNING < ERROR; log facts, not feelings",
            "analogy": "Logging is like a flight recorder: nobody reads it on a good flight, but after a crash it is the only record of what actually happened.",
            "exampleCode": "import logging\nlogging.basicConfig(level=logging.INFO)\nlogging.info(\"Order %s placed by user %s\", 42, \"ada\")\nlogging.warning(\"Slow query: %s ms\", 850)",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem preventing bugs with logging solves in plain words.",
              "Follow the example step by step and note where preventing bugs with logging changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Logging 'it failed' with no facts about what, who, or why.",
              "Logging everything at INFO so real problems drown in noise.",
              "Logging secrets like passwords or tokens."
            ],
            "debugging": {
              "prompt": "This log line is useless for debugging. What is wrong?",
              "buggyCode": "import logging\nlogging.error(\"it failed\")",
              "fixedCode": "import logging\nlogging.error(\"Order 42 failed for user ada: payment declined\")",
              "explanation": "The log says nothing about what failed or for whom; structured facts (order, user, reason) make it diagnosable."
            },
            "miniChallenge": "Extend the exercise: apply preventing bugs with logging to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Logging prevents future debugging pain: structured facts at the right level, at the boundaries, with a correlation id — so a failure can be diagnosed from the log alone.",
            "quiz": [
              {
                "question": "What should a log line contain?",
                "options": [
                  "Feelings about the code",
                  "Structured facts: what happened, when, and the relevant ids and values",
                  "The whole database",
                  "Nothing"
                ],
                "answer": 1,
                "explanation": "Good logs record facts — ids, values, timings — so a failure can be reconstructed from the log alone."
              },
              {
                "question": "When should you use ERROR level?",
                "options": [
                  "For normal events",
                  "When something failed",
                  "For debug detail",
                  "For warnings"
                ],
                "answer": 1,
                "explanation": "ERROR is for failures; INFO is for normal events, WARNING for oddities, DEBUG for detail."
              }
            ],
            "exercise": {
              "title": "Format a structured log line",
              "type": "write-code",
              "instructions": "Write a program that reads an order id and a status, then prints exactly: INFO order=<id> status=<status>.",
              "starterCode": "order_id = input().strip()\nstatus = input().strip()\n# structured log line\n",
              "solution": "order_id = input().strip()\nstatus = input().strip()\nprint(f\"INFO order={order_id} status={status}\")",
              "solutionExplanation": "A structured log line puts facts in key=value form so logs can be searched and filtered.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Order 42 shipped",
                  "hidden": false,
                  "stdin": "42\nshipped\n",
                  "expectedStdout": "INFO order=42 status=shipped"
                },
                {
                  "name": "Order 7 pending",
                  "hidden": true,
                  "stdin": "7\npending\n",
                  "expectedStdout": "INFO order=7 status=pending"
                }
              ],
              "hintNotes": {
                "concept": "Structured logs use key=value facts so a search can find every line about one order.",
                "approach": "Use an f-string with order= and status= fields.",
                "structure": "Structure: read both values, then one print with the log line."
              },
              "id": "debugging-mastery-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "algorithms-refresher",
    "slug": "algorithms-refresher",
    "language": "python",
    "category": "cs-career",
    "title": "Algorithms Refresher",
    "description": "The algorithms that matter in practice: Big-O, arrays and strings, binary search, sorting, hash maps, stacks and heaps, recursion, DP, and graphs.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Big-O analysis",
      "Binary search",
      "Sorting",
      "Hash maps",
      "Stacks and queues",
      "Heaps",
      "Recursion",
      "Dynamic programming",
      "BFS and DFS",
      "Shortest paths"
    ],
    "prerequisites": [
      "Basic Python programming",
      "Familiarity with lists and dicts"
    ],
    "modules": [
      {
        "id": "algorithms-refresher-m1",
        "title": "Foundations",
        "description": "Big-O and the array/string techniques that solve most problems.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "algorithms-refresher-m1-l1",
            "slug": "algorithms-refresher-m1-l1",
            "title": "Big-O Revisited",
            "objectives": [
              "Explain what Big-O analysis means and where it appears in real systems",
              "Apply Big-O analysis to a small realistic problem",
              "Recognise the common mistakes people make with Big-O analysis"
            ],
            "introduction": "In this lesson you will see Big-O analysis in action, work through a guided example, and practise it yourself.",
            "concept": "Big-O describes how an algorithm's cost grows as the input grows, ignoring constants and hardware: O(1) is constant, O(log n) halves the problem each step, O(n) scans once, O(n log n) is the sorting class, and O(n^2) compares everything with everything. The point is not the exact time — it is the shape of the growth: an O(n^2) algorithm that is fine for 100 items is 10,000 times slower for 10,000. When you analyse code, count the loops and their nesting: one loop over n is O(n), a loop inside a loop is O(n^2), and a loop that halves its range each time is O(log n).",
            "syntax": "O(1) < O(log n) < O(n) < O(n log n) < O(n^2); count the loops",
            "analogy": "Big-O is like comparing delivery routes: a direct trip is O(1), visiting every house once is O(n), and visiting every house from every other house is O(n^2) — the shape matters more than the speed of the van.",
            "exampleCode": "def linear_search(xs, target):\n    for x in xs:  # O(n)\n        if x == target:\n            return True\n    return False\nprint(linear_search([1, 2, 3], 2))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how Big-O analysis is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Counting only the outer loop and missing the inner one.",
              "Treating Big-O as an exact time instead of a growth shape.",
              "Forgetting that a loop halving its range is O(log n), not O(n)."
            ],
            "debugging": {
              "prompt": "This nested loop is O(n^2), but the comment says O(n). What is wrong?",
              "buggyCode": "for i in range(n):  # O(n)\n    for j in range(n):\n        print(i, j)",
              "fixedCode": "for i in range(n):  # O(n^2): n x n iterations\n    for j in range(n):\n        print(i, j)",
              "explanation": "A loop inside a loop multiplies the iterations: n times n is O(n^2), not O(n)."
            },
            "miniChallenge": "Extend the exercise: apply Big-O analysis to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Big-O describes growth, not exact time: count loops and their nesting — one loop is O(n), nested loops multiply, and halving is O(log n).",
            "quiz": [
              {
                "question": "What does O(n^2) mean?",
                "options": [
                  "The algorithm takes n squared seconds",
                  "The cost grows with the square of the input size",
                  "The algorithm uses n squared memory",
                  "The input has n squared elements"
                ],
                "answer": 1,
                "explanation": "Big-O describes growth: O(n^2) means doubling the input roughly quadruples the cost."
              },
              {
                "question": "Why is O(n log n) the sorting class?",
                "options": [
                  "Sorting is slow",
                  "Comparison sorting cannot beat n log n in the worst case",
                  "Sorting uses logs",
                  "n log n is the fastest possible"
                ],
                "answer": 1,
                "explanation": "Any comparison sort needs at least n log n comparisons; efficient sorts like mergesort achieve it."
              }
            ],
            "exercise": {
              "title": "Count nested-loop iterations",
              "type": "write-code",
              "instructions": "Write a program that reads n and prints exactly: Iterations: <n*n>. A doubly nested loop over n runs n squared times.",
              "starterCode": "n = int(input())\n# nested loops: n * n\n",
              "solution": "n = int(input())\nprint(f\"Iterations: {n * n}\")",
              "solutionExplanation": "A loop inside a loop multiplies: n iterations of n iterations is n*n.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "n=5",
                  "hidden": false,
                  "stdin": "5\n",
                  "expectedStdout": "Iterations: 25"
                },
                {
                  "name": "n=10",
                  "hidden": true,
                  "stdin": "10\n",
                  "expectedStdout": "Iterations: 100"
                }
              ],
              "hintNotes": {
                "concept": "Nested loops multiply their iteration counts.",
                "approach": "Compute n * n and print it with the label.",
                "structure": "Structure: read n, then one print with the product."
              },
              "id": "algorithms-refresher-m1-l1-e1"
            }
          },
          {
            "id": "algorithms-refresher-m1-l2",
            "slug": "algorithms-refresher-m1-l2",
            "title": "Arrays and Strings",
            "objectives": [
              "Explain what arrays and strings means and where it appears in real systems",
              "Apply arrays and strings to a small realistic problem",
              "Recognise the common mistakes people make with arrays and strings"
            ],
            "introduction": "Here you will get hands-on with arrays and strings: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Most interview and real-world problems start with arrays and strings, and two techniques solve a surprising number of them: the two-pointer technique, which walks from both ends of a sorted array toward the middle, and the sliding window, which maintains a window of elements that grows and shrinks as it scans. Strings are arrays of characters with the same tricks, plus the habit of using a hash map to count frequencies — the fastest way to answer 'how many of each?' or 'is this an anagram?'. The key insight is that a sorted array is far more powerful than an unsorted one: sorting costs O(n log n) once and then unlocks binary search and two pointers.",
            "syntax": "two pointers: ends move inward; sliding window: grow/shrink; frequency map: count",
            "analogy": "Two pointers are like two people walking toward each other across a bridge: they meet in the middle having checked everything between them, without either one walking the whole bridge twice.",
            "exampleCode": "def is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True\nprint(is_palindrome(\"racecar\"))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where arrays and strings does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Using a nested loop where two pointers would do in O(n).",
              "Forgetting that strings are immutable and trying to assign to an index.",
              "Counting frequencies with a list scan instead of a dict."
            ],
            "debugging": {
              "prompt": "This palindrome check compares the wrong characters. Find the bug.",
              "buggyCode": "def is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[left]:\n            return False\n        left += 1\n        right -= 1\n    return True",
              "fixedCode": "def is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True",
              "explanation": "The comparison must be s[left] != s[right]; comparing s[left] with itself is always equal, so every string 'passes'."
            },
            "miniChallenge": "Extend the exercise: apply arrays and strings to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Arrays and strings yield to two pointers, sliding windows, and frequency maps — and a sorted array unlocks binary search and more.",
            "quiz": [
              {
                "question": "What is the two-pointer technique?",
                "options": [
                  "Using two arrays",
                  "Walking two indexes toward each other, usually from opposite ends",
                  "Pointing at the same element twice",
                  "Using two loops"
                ],
                "answer": 1,
                "explanation": "Two pointers move indexes from both ends (or at different speeds) to check pairs without nested loops."
              },
              {
                "question": "What is a sliding window used for?",
                "options": [
                  "Sorting",
                  "Examining a contiguous range that grows and shrinks as it scans the array",
                  "Reversing an array",
                  "Counting elements"
                ],
                "answer": 1,
                "explanation": "A sliding window maintains a range of elements, adjusting its edges as it moves through the data."
              }
            ],
            "exercise": {
              "title": "Reverse a string",
              "type": "write-code",
              "instructions": "Write a program that reads a word and prints it reversed, using two pointers (or slicing — the idea is the same: swap from both ends).",
              "starterCode": "s = input().strip()\n# reverse with slicing\n",
              "solution": "s = input().strip()\nprint(s[::-1])",
              "solutionExplanation": "Reversing a string swaps characters from both ends toward the middle; slicing with a step of -1 does exactly that.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "hello",
                  "hidden": false,
                  "stdin": "hello\n",
                  "expectedStdout": "olleh"
                },
                {
                  "name": "racecar",
                  "hidden": true,
                  "stdin": "racecar\n",
                  "expectedStdout": "racecar"
                }
              ],
              "hintNotes": {
                "concept": "Reversing means the first character becomes the last and vice versa.",
                "approach": "Use slicing with a step of -1 to reverse the string.",
                "structure": "Structure: read the word, strip it, print the reversed string."
              },
              "id": "algorithms-refresher-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "algorithms-refresher-m2",
        "title": "Searching and Sorting",
        "description": "Binary search and how sorting algorithms compare.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "algorithms-refresher-m2-l1",
            "slug": "algorithms-refresher-m2-l1",
            "title": "Binary Search",
            "objectives": [
              "Explain what binary search means and where it appears in real systems",
              "Apply binary search to a small realistic problem",
              "Recognise the common mistakes people make with binary search"
            ],
            "introduction": "In this lesson you will see binary search in action, work through a guided example, and practise it yourself.",
            "concept": "Binary search finds a value in a sorted array by repeatedly halving the search range: compare the middle element with the target, discard the half that cannot contain it, and repeat. Each step halves the range, so a million elements need only about 20 comparisons — O(log n). The classic bugs are in the boundaries: using low <= high (not <), computing mid as (low + high) // 2, and moving low to mid + 1 (not mid) when the target is larger. Binary search is also a pattern, not just a function: any monotonic predicate ('is this enough?') can be binary-searched, which is how you find the minimum feasible value for a problem.",
            "syntax": "halve the range each step; low <= high; mid = (low + high) // 2",
            "analogy": "Binary search is like finding a word in a dictionary: open in the middle, decide which half it is in, and repeat — you never read every page.",
            "exampleCode": "def binary_search(xs, target):\n    low, high = 0, len(xs) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if xs[mid] == target:\n            return mid\n        if xs[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\nprint(binary_search([1, 3, 5, 7, 9], 7))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how binary search is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Using low < high instead of low <= high and missing the last element.",
              "Setting low = mid instead of mid + 1 and looping forever.",
              "Running binary search on an unsorted array."
            ],
            "debugging": {
              "prompt": "This binary search loops forever on some inputs. Find the bug.",
              "buggyCode": "def binary_search(xs, target):\n    low, high = 0, len(xs) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if xs[mid] == target:\n            return mid\n        if xs[mid] < target:\n            low = mid\n        else:\n            high = mid - 1\n    return -1",
              "fixedCode": "def binary_search(xs, target):\n    low, high = 0, len(xs) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if xs[mid] == target:\n            return mid\n        if xs[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
              "explanation": "low must move to mid + 1: setting low = mid can leave the range unchanged and loop forever."
            },
            "miniChallenge": "Extend the exercise: apply binary search to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Binary search halves a sorted range each step (O(log n)); the boundaries — low <= high, mid + 1 — are where the bugs live, and the pattern generalises to any monotonic predicate.",
            "quiz": [
              {
                "question": "How many comparisons does binary search need for a million sorted elements?",
                "options": [
                  "About a million",
                  "About 20",
                  "About 1000",
                  "About 500,000"
                ],
                "answer": 1,
                "explanation": "Halving each time means log2(1,000,000) is about 20 steps."
              },
              {
                "question": "What is required for binary search to work?",
                "options": [
                  "The array must be sorted",
                  "The array must be small",
                  "The values must be unique",
                  "The array must be a list"
                ],
                "answer": 0,
                "explanation": "Binary search relies on order to discard half the range at each step."
              }
            ],
            "exercise": {
              "title": "Binary search steps",
              "type": "write-code",
              "instructions": "Write a program that reads a sorted list size n (a power of two) and prints how many halving steps binary search needs at most: the number of times you can halve n until 1. Use integer log2: steps = n.bit_length() - 1 for powers of two... simpler: count while n > 1: n //= 2, steps += 1.",
              "starterCode": "n = int(input())\nsteps = 0\nwhile n > 1:\n    n //= 2\n    steps += 1\nprint(steps)",
              "solution": "n = int(input())\nsteps = 0\nwhile n > 1:\n    n //= 2\n    steps += 1\nprint(steps)",
              "solutionExplanation": "Each halving is one step; count how many halvings reduce n to 1.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "n=8",
                  "hidden": false,
                  "stdin": "8\n",
                  "expectedStdout": "3"
                },
                {
                  "name": "n=1024",
                  "hidden": true,
                  "stdin": "1024\n",
                  "expectedStdout": "10"
                }
              ],
              "hintNotes": {
                "concept": "Binary search halves the range each step, so the step count is the number of halvings.",
                "approach": "Loop while n > 1, halving n and counting each step.",
                "structure": "Structure: read n, loop and count, print the count."
              },
              "id": "algorithms-refresher-m2-l1-e1"
            }
          },
          {
            "id": "algorithms-refresher-m2-l2",
            "slug": "algorithms-refresher-m2-l2",
            "title": "Sorting Algorithms Compared",
            "objectives": [
              "Explain what sorting algorithms means and where it appears in real systems",
              "Apply sorting algorithms to a small realistic problem",
              "Recognise the common mistakes people make with sorting algorithms"
            ],
            "introduction": "Here you will get hands-on with sorting algorithms: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Sorting is the most studied problem in computer science because so much depends on it: quicksort is fast in practice (average O(n log n)) but O(n^2) in the worst case; mergesort is always O(n log n) and stable but needs extra memory; heapsort is O(n log n) in place but not stable; and insertion sort is O(n^2) yet the fastest for nearly-sorted data. Python's built-in sort (Timsort) is a hybrid that exploits existing order, which is why sorted() is almost always the right choice in real code. The interview value of sorting is not implementing quicksort from memory — it is knowing the trade-offs and recognising when a problem is really a sorting problem in disguise.",
            "syntax": "quicksort: fast average, worst O(n^2); mergesort: always O(n log n), stable; Timsort: hybrid",
            "analogy": "Sorting algorithms are like tidying a room: quicksort picks a pivot and sorts around it, mergesort sorts halves and merges them, and insertion sort slides each item into its place.",
            "exampleCode": "nums = [5, 2, 9, 1, 7]\nprint(\"sorted():\", sorted(nums))\nprint(\"Timsort: O(n log n), stable, exploits existing order\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where sorting algorithms does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Reimplementing sort by hand when sorted() is available and faster.",
              "Forgetting that quicksort's worst case is O(n^2) on already-sorted data with a bad pivot.",
              "Assuming a sort is stable when it is not."
            ],
            "debugging": {
              "prompt": "This selection sort should sort the list, but it leaves it unsorted. Find the bug.",
              "buggyCode": "def sort(xs):\n    for i in range(len(xs)):\n        for j in range(i + 1, len(xs)):\n            if xs[i] > xs[j]:\n                xs[i], xs[j] = xs[i], xs[j]\n    return xs\nprint(sort([5, 2, 9, 1]))",
              "fixedCode": "def sort(xs):\n    for i in range(len(xs)):\n        for j in range(i + 1, len(xs)):\n            if xs[i] > xs[j]:\n                xs[i], xs[j] = xs[j], xs[i]\n    return xs\nprint(sort([5, 2, 9, 1]))",
              "explanation": "The swap assigns each element to itself (xs[i], xs[j] = xs[i], xs[j]) instead of swapping them — the values must cross."
            },
            "miniChallenge": "Extend the exercise: apply sorting algorithms to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Sorting trade-offs: quicksort is fast on average, mergesort is always O(n log n) and stable, insertion sort wins on nearly-sorted data — and Python's Timsort is the pragmatic default.",
            "quiz": [
              {
                "question": "Which sort is guaranteed O(n log n) and stable?",
                "options": [
                  "Quicksort",
                  "Mergesort",
                  "Heapsort",
                  "Insertion sort"
                ],
                "answer": 1,
                "explanation": "Mergesort always runs in O(n log n) and preserves the order of equal elements (stable)."
              },
              {
                "question": "When is insertion sort the fastest choice?",
                "options": [
                  "On large random data",
                  "On nearly-sorted data",
                  "On reversed data",
                  "Never"
                ],
                "answer": 1,
                "explanation": "Insertion sort is nearly O(n) when the data is almost sorted — each element moves only a little."
              }
            ],
            "exercise": {
              "title": "Sort three numbers",
              "type": "write-code",
              "instructions": "Write a program that reads three numbers and prints them sorted ascending, separated by spaces.",
              "starterCode": "nums = [int(input()) for _ in range(3)]\n# sort and print\n",
              "solution": "nums = [int(input()) for _ in range(3)]\nprint(\" \".join(str(x) for x in sorted(nums)))",
              "solutionExplanation": "Python's sorted() returns a new sorted list; join the numbers with spaces.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "3 1 2",
                  "hidden": false,
                  "stdin": "3\n1\n2\n",
                  "expectedStdout": "1 2 3"
                },
                {
                  "name": "9 5 7",
                  "hidden": true,
                  "stdin": "9\n5\n7\n",
                  "expectedStdout": "5 7 9"
                }
              ],
              "hintNotes": {
                "concept": "Sorting three numbers is a job for sorted() — no need to hand-roll a sort.",
                "approach": "Read the three numbers, sort them, join with spaces.",
                "structure": "Structure: read into a list, then one print with sorted and join."
              },
              "id": "algorithms-refresher-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "algorithms-refresher-m3",
        "title": "Data Structures in Practice",
        "description": "Hash maps, stacks, queues, and heaps.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "algorithms-refresher-m3-l1",
            "slug": "algorithms-refresher-m3-l1",
            "title": "Hash Maps in Practice",
            "objectives": [
              "Explain what hash maps means and where it appears in real systems",
              "Apply hash maps to a small realistic problem",
              "Recognise the common mistakes people make with hash maps"
            ],
            "introduction": "In this lesson you will see hash maps in action, work through a guided example, and practise it yourself.",
            "concept": "A hash map (Python dict) is the workhorse data structure: it maps keys to values in average O(1) time by hashing the key to a bucket. That makes it the answer to a huge class of problems — counting frequencies, grouping anagrams, finding a complement (two-sum), and memoising results. The costs are real but manageable: hash collisions degrade performance, keys must be hashable (so lists cannot be keys), and iteration order is insertion order in modern Python, not sorted order. When a problem asks 'have I seen this before?' or 'how many of each?', reach for a dict before anything else.",
            "syntax": "dict: average O(1) lookup; use for frequencies, complements, memoisation",
            "analogy": "A hash map is like a coat-check with numbered tickets: the ticket (hash) takes you straight to your coat without searching the whole rail.",
            "exampleCode": "from collections import Counter\nprint(Counter(\"banana\"))\nprint(\"Two-sum: look up the complement in a dict, O(n) total.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how hash maps is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Using a list as a dict key (unhashable) instead of a tuple.",
              "Scanning a list for membership when a set or dict would be O(1).",
              "Assuming dict iteration order is sorted order."
            ],
            "debugging": {
              "prompt": "This frequency count should count 'banana' as b:1, a:3, n:2, but it counts every letter once. Find the bug.",
              "buggyCode": "counts = {}\nfor ch in \"banana\":\n    counts[ch] = 1\nprint(counts)",
              "fixedCode": "counts = {}\nfor ch in \"banana\":\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts)",
              "explanation": "Assigning 1 every time overwrites the count; it must add 1 to the existing count (defaulting to 0)."
            },
            "miniChallenge": "Extend the exercise: apply hash maps to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Hash maps give average O(1) lookup and solve frequencies, complements, grouping, and memoisation — the first tool to reach for when a problem asks 'have I seen this?'",
            "quiz": [
              {
                "question": "What is the average lookup time of a hash map?",
                "options": [
                  "O(n)",
                  "O(1)",
                  "O(log n)",
                  "O(n^2)"
                ],
                "answer": 1,
                "explanation": "Hashing the key jumps straight to its bucket, giving average constant-time lookup."
              },
              {
                "question": "Which problem is a hash map the natural answer to?",
                "options": [
                  "Sorting a list",
                  "Finding two numbers that sum to a target (two-sum)",
                  "Reversing a string",
                  "Finding the maximum"
                ],
                "answer": 1,
                "explanation": "Two-sum is O(n) with a dict: for each number, look up whether its complement was seen."
              }
            ],
            "exercise": {
              "title": "Count letter frequencies",
              "type": "write-code",
              "instructions": "Write a program that reads a word and prints the count of the letter 'a' in it.",
              "starterCode": "word = input().strip()\n# count the letter a\n",
              "solution": "word = input().strip()\nprint(word.count(\"a\"))",
              "solutionExplanation": "Count occurrences of 'a' in the word and print the number.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "banana",
                  "hidden": false,
                  "stdin": "banana\n",
                  "expectedStdout": "3"
                },
                {
                  "name": "apple",
                  "hidden": true,
                  "stdin": "apple\n",
                  "expectedStdout": "1"
                }
              ],
              "hintNotes": {
                "concept": "Counting is the hash map's home turf — here the string's count does the same job.",
                "approach": "Use word.count('a') and print the result.",
                "structure": "Structure: read the word, then one print with the count."
              },
              "id": "algorithms-refresher-m3-l1-e1"
            }
          },
          {
            "id": "algorithms-refresher-m3-l2",
            "slug": "algorithms-refresher-m3-l2",
            "title": "Stacks, Queues and Heaps",
            "objectives": [
              "Explain what stacks, queues and heaps means and where it appears in real systems",
              "Apply stacks, queues and heaps to a small realistic problem",
              "Recognise the common mistakes people make with stacks, queues and heaps"
            ],
            "introduction": "Here you will get hands-on with stacks, queues and heaps: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Stacks, queues, and heaps are three containers with three different rules for what comes out next. A stack is last-in-first-out (LIFO) — the classic uses are undo, backtracking, and matching brackets. A queue is first-in-first-out (FIFO) — the rule for breadth-first search and task scheduling. A heap is a priority queue: the smallest (or largest) element always comes out first, which makes it the tool for top-k problems and Dijkstra's shortest path. In Python, a list is a fine stack (append/pop), collections.deque is the queue, and heapq is the heap — each with O(1) or O(log n) operations that a list scan cannot match.",
            "syntax": "stack: LIFO; queue: FIFO; heap: smallest first",
            "analogy": "A stack is a pile of plates (last on, first off), a queue is a supermarket line (first in, first out), and a heap is a hospital triage (the most urgent patient first).",
            "exampleCode": "from collections import deque\nimport heapq\nstack = [1, 2, 3]\nprint(\"Stack pop:\", stack.pop())\nq = deque([1, 2, 3])\nprint(\"Queue pop:\", q.popleft())\nheap = [3, 1, 2]\nheapq.heapify(heap)\nprint(\"Heap pop:\", heapq.heappop(heap))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where stacks, queues and heaps does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Using a list as a queue with pop(0), which is O(n).",
              "Forgetting to check for an empty stack before popping.",
              "Sorting the whole list when only the smallest few are needed."
            ],
            "debugging": {
              "prompt": "This bracket checker should accept '([])' but it rejects it. Find the bug.",
              "buggyCode": "def check(s):\n    stack = []\n    pairs = {\")\": \"(\", \"]\": \"{\", \"}\": \"[\"}\n    for ch in s:\n        if ch in \"([{\":\n            stack.append(ch)\n        elif not stack or stack.pop() != pairs[ch]:\n            return False\n    return not stack\nprint(check(\"([])\"))",
              "fixedCode": "def check(s):\n    stack = []\n    pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    for ch in s:\n        if ch in \"([{\":\n            stack.append(ch)\n        elif not stack or stack.pop() != pairs[ch]:\n            return False\n    return not stack\nprint(check(\"([])\"))",
              "explanation": "The pairs dict maps ] to { and } to [ — swapped — so a correct ']' is compared against the wrong opener and rejected."
            },
            "miniChallenge": "Extend the exercise: apply stacks, queues and heaps to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Stacks (LIFO), queues (FIFO), and heaps (smallest first) each answer 'what comes out next?' differently — match the structure to the order you need.",
            "quiz": [
              {
                "question": "Which structure matches brackets correctly?",
                "options": [
                  "A queue",
                  "A stack — push opens, pop on close, and they must match",
                  "A heap",
                  "A dict"
                ],
                "answer": 1,
                "explanation": "Brackets nest, so the last opened must be the first closed — exactly LIFO stack behaviour."
              },
              {
                "question": "What does a heap give you that a sorted list does not?",
                "options": [
                  "Faster sorting",
                  "The smallest element in O(log n) after each insertion, without sorting everything",
                  "More memory",
                  "Faster iteration"
                ],
                "answer": 1,
                "explanation": "A heap keeps the minimum at the top with cheap inserts, which is what top-k and Dijkstra need."
              }
            ],
            "exercise": {
              "title": "Smallest of three with a heap",
              "type": "write-code",
              "instructions": "Write a program that reads three numbers and prints the smallest, using heapq: heapify the list and heappop once.",
              "starterCode": "import heapq\nnums = [int(input()) for _ in range(3)]\nheapq.heapify(nums)\nprint(heapq.heappop(nums))",
              "solution": "import heapq\nnums = [int(input()) for _ in range(3)]\nheapq.heapify(nums)\nprint(heapq.heappop(nums))",
              "solutionExplanation": "heapify turns the list into a heap in place; heappop returns the smallest element.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5 2 9",
                  "hidden": false,
                  "stdin": "5\n2\n9\n",
                  "expectedStdout": "2"
                },
                {
                  "name": "7 7 3",
                  "hidden": true,
                  "stdin": "7\n7\n3\n",
                  "expectedStdout": "3"
                }
              ],
              "hintNotes": {
                "concept": "A heap always hands you the smallest element first.",
                "approach": "Heapify the list, then heappop once and print it.",
                "structure": "Structure: read three numbers, heapify, pop and print."
              },
              "id": "algorithms-refresher-m3-l2-e1"
            }
          }
        ]
      },
      {
        "id": "algorithms-refresher-m4",
        "title": "Recursion and Dynamic Programming",
        "description": "Memoisation and the DP mindset.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "algorithms-refresher-m4-l1",
            "slug": "algorithms-refresher-m4-l1",
            "title": "Recursion and Memoisation",
            "objectives": [
              "Explain what recursion and memoisation means and where it appears in real systems",
              "Apply recursion and memoisation to a small realistic problem",
              "Recognise the common mistakes people make with recursion and memoisation"
            ],
            "introduction": "In this lesson you will see recursion and memoisation in action, work through a guided example, and practise it yourself.",
            "concept": "Recursion solves a problem by reducing it to smaller copies of itself, and memoisation is the trick that makes naive recursion fast: store each result the first time you compute it, and reuse it instead of recomputing. Fibonacci is the canonical example — the naive version recomputes fib(3) thousands of times and runs in exponential time, while the memoised version is linear. In Python, functools.lru_cache adds memoisation with one decorator, but the idea matters more than the tool: whenever a recursive function solves the same subproblem twice, cache it. Recursion plus memoisation is the doorway to dynamic programming.",
            "syntax": "memoisation: cache results; fib without it is exponential, with it linear",
            "analogy": "Memoisation is like keeping a notebook of answers: the first time you solve a sum you write it down, and the next time you just look it up instead of working it out again.",
            "exampleCode": "from functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\nprint(fib(20))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how recursion and memoisation is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Recomputing overlapping subproblems instead of caching them.",
              "Using a mutable default dict as a memo (shared-state trap).",
              "Forgetting the base case and recursing forever."
            ],
            "debugging": {
              "prompt": "This memoised Fibonacci returns 4 for fib(4) instead of 3. Find the bug.",
              "buggyCode": "def fib(n, memo={}):\n    if n < 2:\n        return n\n    if n in memo:\n        return memo[n]\n    memo[n] = fib(n - 1) + fib(n - 1)\n    return memo[n]\nprint(fib(4))",
              "fixedCode": "def fib(n, memo=None):\n    if memo is None:\n        memo = {}\n    if n < 2:\n        return n\n    if n in memo:\n        return memo[n]\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]\nprint(fib(4))",
              "explanation": "Two bugs: the recurrence adds fib(n-1) twice instead of fib(n-1) + fib(n-2), and the memo dict is a shared mutable default — the fix uses memo=None and passes the dict along."
            },
            "miniChallenge": "Extend the exercise: apply recursion and memoisation to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Recursion plus memoisation turns exponential recomputation into linear work: cache each subproblem's result once, and reuse it.",
            "quiz": [
              {
                "question": "Why is naive Fibonacci exponential?",
                "options": [
                  "It uses too much memory",
                  "It recomputes the same subproblems many times",
                  "It is recursive",
                  "It uses big numbers"
                ],
                "answer": 1,
                "explanation": "fib(n) calls fib(n-1) and fib(n-2), and their subtrees overlap enormously — the same values are computed again and again."
              },
              {
                "question": "What does memoisation change about Fibonacci?",
                "options": [
                  "It makes it iterative",
                  "It caches each result once, so each value is computed a single time — O(n)",
                  "It uses less code",
                  "It removes the base case"
                ],
                "answer": 1,
                "explanation": "Caching turns the exponential tree into a linear chain: each fib(k) is computed once."
              }
            ],
            "exercise": {
              "title": "Fibonacci with memoisation",
              "type": "write-code",
              "instructions": "Write a program that reads n and prints fib(n), where fib(0)=0, fib(1)=1, computed iteratively (the memoised idea: keep the last two values).",
              "starterCode": "n = int(input())\na, b = 0, 1\nfor _ in range(n):\n    a, b = b, a + b\nprint(a)",
              "solution": "n = int(input())\na, b = 0, 1\nfor _ in range(n):\n    a, b = b, a + b\nprint(a)",
              "solutionExplanation": "Keep the last two Fibonacci numbers and roll them forward n times; after n steps, a is fib(n).",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "fib(10)",
                  "hidden": false,
                  "stdin": "10\n",
                  "expectedStdout": "55"
                },
                {
                  "name": "fib(0)",
                  "hidden": true,
                  "stdin": "0\n",
                  "expectedStdout": "0"
                }
              ],
              "hintNotes": {
                "concept": "Iterative Fibonacci is memoisation in its simplest form: remember the last two values.",
                "approach": "Roll a, b forward n times with tuple assignment.",
                "structure": "Structure: read n, loop n times updating a and b, print a."
              },
              "id": "algorithms-refresher-m4-l1-e1"
            }
          },
          {
            "id": "algorithms-refresher-m4-l2",
            "slug": "algorithms-refresher-m4-l2",
            "title": "Dynamic Programming Basics",
            "objectives": [
              "Explain what dynamic programming basics means and where it appears in real systems",
              "Apply dynamic programming basics to a small realistic problem",
              "Recognise the common mistakes people make with dynamic programming basics"
            ],
            "introduction": "In this lesson you will see dynamic programming basics in action, work through a guided example, and practise it yourself.",
            "concept": "Dynamic programming is recursion plus memoisation, organised as a table: define the state (what a subproblem is), the recurrence (how a state relates to smaller states), and the base cases, then fill the table bottom-up. The classic is the coin-change or staircase problem — the number of ways to climb n stairs taking 1 or 2 steps is ways(n) = ways(n-1) + ways(n-2), which is Fibonacci in disguise. The skill is recognising the two DP signals: optimal substructure (the answer is built from answers to smaller problems) and overlapping subproblems (the same smaller problems recur). When both hold, a table beats brute force by orders of magnitude.",
            "syntax": "state + recurrence + base cases; fill the table bottom-up",
            "analogy": "Dynamic programming is like building a staircase from the bottom: each step rests on the ones below it, and you never rebuild a step you already finished.",
            "exampleCode": "def ways(n):\n    a, b = 1, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a\nprint(\"Ways to climb 5 stairs:\", ways(5))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how dynamic programming basics is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Solving the same subproblem repeatedly without a table.",
              "Defining the state wrong so the recurrence does not hold.",
              "Using recursion without memoisation and timing out."
            ],
            "debugging": {
              "prompt": "This stair-climbing count is wrong for n=3. Find the bug.",
              "buggyCode": "def ways(n):\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 3)\nprint(ways(3))",
              "fixedCode": "def ways(n):\n    if n <= 1:\n        return 1\n    return ways(n - 1) + ways(n - 2)\nprint(ways(3))",
              "explanation": "The recurrence must add ways(n-1) and ways(n-2) — steps of 1 or 2 — not ways(n-3), which is a step of 3."
            },
            "miniChallenge": "Extend the exercise: apply dynamic programming basics to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Dynamic programming is a table built from a recurrence: define the state, the base cases, and how each state follows from smaller ones — then fill it bottom-up.",
            "quiz": [
              {
                "question": "What are the two signals that a problem suits DP?",
                "options": [
                  "It is hard and it is long",
                  "Optimal substructure and overlapping subproblems",
                  "It uses a graph and a tree",
                  "It is recursive and slow"
                ],
                "answer": 1,
                "explanation": "DP works when the answer builds from smaller answers and those smaller problems repeat."
              },
              {
                "question": "What is the recurrence for climbing stairs taking 1 or 2 steps?",
                "options": [
                  "ways(n) = ways(n-1) + ways(n-2)",
                  "ways(n) = ways(n-1) * 2",
                  "ways(n) = n!",
                  "ways(n) = 2^n"
                ],
                "answer": 0,
                "explanation": "From step n you came from n-1 or n-2, so the counts add — the Fibonacci recurrence."
              }
            ],
            "exercise": {
              "title": "Ways to climb stairs",
              "type": "write-code",
              "instructions": "Write a program that reads n and prints the number of ways to climb n stairs taking 1 or 2 steps at a time. ways(0)=1, ways(1)=1.",
              "starterCode": "n = int(input())\na, b = 1, 1\nfor _ in range(n):\n    a, b = b, a + b\nprint(a)",
              "solution": "n = int(input())\na, b = 1, 1\nfor _ in range(n):\n    a, b = b, a + b\nprint(a)",
              "solutionExplanation": "The count follows the Fibonacci recurrence: ways(n) = ways(n-1) + ways(n-2); rolling two values forward n times gives ways(n).",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "n=3",
                  "hidden": false,
                  "stdin": "3\n",
                  "expectedStdout": "3"
                },
                {
                  "name": "n=5",
                  "hidden": true,
                  "stdin": "5\n",
                  "expectedStdout": "8"
                }
              ],
              "hintNotes": {
                "concept": "Each step comes from one step below or two steps below, so the counts add.",
                "approach": "Roll a, b forward n times; a holds the answer.",
                "structure": "Structure: read n, loop n times updating a and b, print a."
              },
              "id": "algorithms-refresher-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "algorithms-refresher-m5",
        "title": "Graphs",
        "description": "BFS, DFS, and shortest paths.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "algorithms-refresher-m5-l1",
            "slug": "algorithms-refresher-m5-l1",
            "title": "BFS and DFS",
            "objectives": [
              "Explain what BFS and DFS means and where it appears in real systems",
              "Apply BFS and DFS to a small realistic problem",
              "Recognise the common mistakes people make with BFS and DFS"
            ],
            "introduction": "This lesson introduces BFS and DFS. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Breadth-first search and depth-first search are the two ways to walk a graph, and the difference is the container: BFS uses a queue and visits nodes level by level (nearest first), while DFS uses a stack — or recursion — and plunges down one path before backtracking. BFS is the tool when you need the shortest path in an unweighted graph, because the first time it reaches a node is via the fewest edges. DFS is the tool for exploring connectivity, detecting cycles, and topological sorting. Both run in O(V + E) and both need a visited set, or they will loop forever on a cycle.",
            "syntax": "BFS: queue, level by level, shortest path. DFS: stack, deep first, cycles/topology.",
            "analogy": "BFS is like ripples spreading across a pond — every point at the same distance is reached together. DFS is like exploring a maze by always turning left until you hit a dead end.",
            "exampleCode": "from collections import deque\ndef bfs(graph, start):\n    seen = {start}\n    q = deque([start])\n    order = []\n    while q:\n        node = q.popleft()\n        order.append(node)\n        for nb in graph[node]:\n            if nb not in seen:\n                seen.add(nb)\n                q.append(nb)\n    return order\nprint(bfs({\"A\": [\"B\", \"C\"], \"B\": [\"D\"], \"C\": [], \"D\": []}, \"A\"))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem BFS and DFS solves in plain words.",
              "Follow the example step by step and note where BFS and DFS changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Using a stack where BFS needs a queue (and getting DFS order).",
              "Forgetting the visited set and looping on a cycle.",
              "Using DFS when the problem asks for the shortest path."
            ],
            "debugging": {
              "prompt": "This BFS visits nodes in the wrong order — it behaves like DFS. Find the bug.",
              "buggyCode": "from collections import deque\ndef bfs(graph, start):\n    seen = {start}\n    q = deque([start])\n    order = []\n    while q:\n        node = q.pop()\n        order.append(node)\n        for nb in graph[node]:\n            if nb not in seen:\n                seen.add(nb)\n                q.append(nb)\n    return order",
              "fixedCode": "from collections import deque\ndef bfs(graph, start):\n    seen = {start}\n    q = deque([start])\n    order = []\n    while q:\n        node = q.popleft()\n        order.append(node)\n        for nb in graph[node]:\n            if nb not in seen:\n                seen.add(nb)\n                q.append(nb)\n    return order",
              "explanation": "pop() takes from the right (LIFO, like a stack); BFS needs popleft() so nodes leave in the order they were found."
            },
            "miniChallenge": "Extend the exercise: apply BFS and DFS to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "BFS (queue, level by level) finds shortest paths in unweighted graphs; DFS (stack, deep first) explores connectivity and cycles — both need a visited set.",
            "quiz": [
              {
                "question": "When should you use BFS instead of DFS?",
                "options": [
                  "When you need the shortest path in an unweighted graph",
                  "When the graph is a tree",
                  "When you need to detect cycles",
                  "When memory is tight"
                ],
                "answer": 0,
                "explanation": "BFS explores level by level, so the first visit to a node is via the shortest path."
              },
              {
                "question": "Why do BFS and DFS both need a visited set?",
                "options": [
                  "To save memory",
                  "To avoid looping forever on cycles and revisiting nodes",
                  "To sort the output",
                  "To count nodes"
                ],
                "answer": 1,
                "explanation": "Without visited tracking, a cycle makes the search loop forever and nodes get processed repeatedly."
              }
            ],
            "exercise": {
              "title": "Count nodes reachable in a line graph",
              "type": "write-code",
              "instructions": "Write a program that reads n (nodes in a line 0-1-2-...-n-1) and prints exactly: Reachable: <n>. A line graph is fully connected, so BFS from node 0 reaches all n nodes.",
              "starterCode": "n = int(input())\n# line graph: every node reachable from 0\n",
              "solution": "n = int(input())\nprint(f\"Reachable: {n}\")",
              "solutionExplanation": "In a connected line graph, BFS from the first node visits every node, so the count is n.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5 nodes",
                  "hidden": false,
                  "stdin": "5\n",
                  "expectedStdout": "Reachable: 5"
                },
                {
                  "name": "1 node",
                  "hidden": true,
                  "stdin": "1\n",
                  "expectedStdout": "Reachable: 1"
                }
              ],
              "hintNotes": {
                "concept": "A connected graph means BFS reaches every node from any start.",
                "approach": "The answer is simply n for a connected line graph.",
                "structure": "Structure: read n, then one print with the count."
              },
              "id": "algorithms-refresher-m5-l1-e1"
            }
          },
          {
            "id": "algorithms-refresher-m5-l2",
            "slug": "algorithms-refresher-m5-l2",
            "title": "Shortest Paths",
            "objectives": [
              "Explain what shortest paths means and where it appears in real systems",
              "Apply shortest paths to a small realistic problem",
              "Recognise the common mistakes people make with shortest paths"
            ],
            "introduction": "This lesson introduces shortest paths. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Shortest paths come in flavours by what the graph allows: BFS handles unweighted graphs, Dijkstra handles weighted graphs with non-negative weights, and Bellman-Ford handles negative weights (but no negative cycles). Dijkstra's idea is greedy and elegant: always expand the unvisited node with the smallest known distance, because with non-negative weights that distance can never improve later. A priority queue (heap) makes it efficient: O((V + E) log V). The classic mistake is running Dijkstra on negative weights — a later edge can improve a distance that was already 'finalised', and the answer comes out wrong.",
            "syntax": "BFS: unweighted; Dijkstra: non-negative weights + heap; Bellman-Ford: negative weights",
            "analogy": "Dijkstra is like exploring a city by always visiting the nearest unvisited place first: once you have visited somewhere, you know you took the shortest route to get there.",
            "exampleCode": "import heapq\ndef dijkstra(graph, start):\n    dist = {start: 0}\n    heap = [(0, start)]\n    while heap:\n        d, node = heapq.heappop(heap)\n        if d != dist[node]:\n            continue\n        for nb, w in graph[node]:\n            nd = d + w\n            if nd < dist.get(nb, float(\"inf\")):\n                dist[nb] = nd\n                heapq.heappush(heap, (nd, nb))\n    return dist\nprint(dijkstra({\"A\": [(\"B\", 1), (\"C\", 4)], \"B\": [(\"C\", 2)], \"C\": []}, \"A\"))",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem shortest paths solves in plain words.",
              "Follow the example step by step and note where shortest paths changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Running Dijkstra on negative weights.",
              "Forgetting to skip stale heap entries.",
              "Using BFS on a weighted graph and getting the wrong 'shortest' path."
            ],
            "debugging": {
              "prompt": "This Dijkstra implementation returns wrong distances. Find the bug.",
              "buggyCode": "import heapq\ndef dijkstra(graph, start):\n    dist = {start: 0}\n    heap = [(0, start)]\n    while heap:\n        d, node = heapq.heappop(heap)\n        for nb, w in graph[node]:\n            nd = d + w\n            if nd < dist.get(nb, float(\"inf\")):\n                dist[nb] = nd\n                heapq.heappush(heap, (nd, nb))\n    return dist",
              "fixedCode": "import heapq\ndef dijkstra(graph, start):\n    dist = {start: 0}\n    heap = [(0, start)]\n    while heap:\n        d, node = heapq.heappop(heap)\n        if d != dist[node]:\n            continue\n        for nb, w in graph[node]:\n            nd = d + w\n            if nd < dist.get(nb, float(\"inf\")):\n                dist[nb] = nd\n                heapq.heappush(heap, (nd, nb))\n    return dist",
              "explanation": "Without the stale-entry check (if d != dist[node]: continue), an outdated heap entry re-expands a node with a worse distance."
            },
            "miniChallenge": "Extend the exercise: apply shortest paths to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "BFS for unweighted graphs, Dijkstra (with a heap) for non-negative weights, Bellman-Ford for negative weights — and never Dijkstra on negative edges.",
            "quiz": [
              {
                "question": "When is Dijkstra's algorithm the right choice?",
                "options": [
                  "Unweighted graphs",
                  "Weighted graphs with non-negative weights",
                  "Graphs with negative cycles",
                  "Trees only"
                ],
                "answer": 1,
                "explanation": "Dijkstra needs non-negative weights so that the smallest known distance is final when a node is expanded."
              },
              {
                "question": "Why does Dijkstra use a heap?",
                "options": [
                  "To sort the graph",
                  "To always expand the unvisited node with the smallest known distance, efficiently",
                  "To store the path",
                  "To avoid cycles"
                ],
                "answer": 1,
                "explanation": "The heap always yields the closest unvisited node in O(log V), which is the heart of the algorithm."
              }
            ],
            "exercise": {
              "title": "Shortest path in a line",
              "type": "write-code",
              "instructions": "Write a program that reads the number of edges n in a line graph where each edge weighs 2, then prints exactly: Distance: <2*n>. The shortest path from the first to the last node crosses all n edges.",
              "starterCode": "n = int(input())\n# each edge weighs 2; path crosses n edges\n",
              "solution": "n = int(input())\nprint(f\"Distance: {2 * n}\")",
              "solutionExplanation": "The path from one end of the line to the other crosses every edge, each weighing 2.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "3 edges",
                  "hidden": false,
                  "stdin": "3\n",
                  "expectedStdout": "Distance: 6"
                },
                {
                  "name": "5 edges",
                  "hidden": true,
                  "stdin": "5\n",
                  "expectedStdout": "Distance: 10"
                }
              ],
              "hintNotes": {
                "concept": "In a line there is only one path, so its length is the number of edges times the weight.",
                "approach": "Compute 2 * n and print it with the label.",
                "structure": "Structure: read n, then one print with the distance."
              },
              "id": "algorithms-refresher-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "interview-prep",
    "slug": "interview-prep",
    "language": "python",
    "category": "cs-career",
    "title": "Interview Preparation",
    "description": "Get hired: how technical interviews work, behavioural questions with STAR, coding patterns, system-design interviews, take-homes, and negotiating offers.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Interview strategy",
      "STAR method",
      "Coding patterns",
      "System design interviews",
      "Take-home assignments",
      "Live coding",
      "Salary negotiation"
    ],
    "prerequisites": [
      "Basic Python programming",
      "Some coding practice"
    ],
    "modules": [
      {
        "id": "interview-prep-m1",
        "title": "Interview Strategy",
        "description": "How interviews work and how to answer behavioural questions.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "interview-prep-m1-l1",
            "slug": "interview-prep-m1-l1",
            "title": "How Technical Interviews Work",
            "objectives": [
              "Explain what how technical interviews work means and where it appears in real systems",
              "Apply how technical interviews work to a small realistic problem",
              "Recognise the common mistakes people make with how technical interviews work"
            ],
            "introduction": "Here you will get hands-on with how technical interviews work: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A technical interview is a structured prediction exercise: the company is trying to predict whether you will do the job well, using a small sample of your work. The typical pipeline is a recruiter screen, a technical screen (coding or take-home), an on-site loop of coding, system design, and behavioural rounds, and finally a hiring-committee review. Each round measures something different — coding rounds test problem solving under time pressure, design rounds test judgment at scale, and behavioural rounds test how you work with others. Knowing what each round measures lets you prepare for the right thing instead of everything at once.",
            "syntax": "pipeline: screen -> technical screen -> on-site loop -> hiring committee",
            "analogy": "An interview is like an audition: the panel is not judging whether you are a good person, but whether you can play the part — so practise the actual scenes, not just the theory.",
            "exampleCode": "print(\"Recruiter screen: motivation and logistics\")\nprint(\"Technical screen: coding or take-home\")\nprint(\"On-site: coding, design, behavioural\")\nprint(\"Committee: the final decision\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where how technical interviews work does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Preparing for every round the same way instead of targeting what each measures.",
              "Treating the interview as a test of worth rather than a prediction exercise.",
              "Skipping the recruiter screen preparation because it seems easy."
            ],
            "debugging": {
              "prompt": "This preparation plan spends all its time on trivia. What is wrong?",
              "buggyCode": "plan = [\"memorise trivia\", \"memorise trivia\", \"memorise trivia\"]",
              "fixedCode": "plan = [\"practise coding patterns\", \"practise system design\", \"prepare STAR stories\"]",
              "explanation": "Trivia is not what rounds measure — practise the actual skills each round tests: coding, design, and behavioural stories."
            },
            "miniChallenge": "Extend the exercise: apply how technical interviews work to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Interviews predict job performance through a pipeline — screen, technical screen, on-site loop, committee — and each round measures a different skill, so prepare for each one specifically.",
            "quiz": [
              {
                "question": "What is a hiring committee's job?",
                "options": [
                  "To write the questions",
                  "To review all interview feedback and make the final decision",
                  "To negotiate salary",
                  "To onboard the hire"
                ],
                "answer": 1,
                "explanation": "The committee weighs every round's signal and decides, which is why one weak round rarely decides alone."
              },
              {
                "question": "What does a coding round actually measure?",
                "options": [
                  "Typing speed",
                  "Problem solving under time pressure, communicated clearly",
                  "Memory of syntax",
                  "Knowledge of trivia"
                ],
                "answer": 1,
                "explanation": "Coding rounds test how you think through a problem and explain it, not how fast you type."
              }
            ],
            "exercise": {
              "title": "Order the interview pipeline",
              "type": "multiple-choice",
              "instructions": "Which is the usual order of a technical hiring pipeline?",
              "starterCode": "",
              "solution": "Recruiter screen, technical screen, on-site loop, hiring committee",
              "solutionExplanation": "The pipeline narrows gradually: a recruiter screen first, then a technical screen, then the on-site loop of several rounds, and finally a committee decision.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "The pipeline narrows from a short screen to a full loop to a final decision.",
                "approach": "Look for the order that starts with the recruiter and ends with the committee.",
                "structure": "Structure: screen, technical screen, on-site, committee."
              },
              "options": [
                "On-site loop, recruiter screen, technical screen, hiring committee",
                "Recruiter screen, technical screen, on-site loop, hiring committee",
                "Hiring committee, on-site loop, technical screen, recruiter screen",
                "Technical screen, hiring committee, recruiter screen, on-site loop"
              ],
              "answerIndex": 1,
              "id": "interview-prep-m1-l1-e1"
            }
          },
          {
            "id": "interview-prep-m1-l2",
            "slug": "interview-prep-m1-l2",
            "title": "Behavioural Questions and STAR",
            "objectives": [
              "Explain what behavioural questions and STAR means and where it appears in real systems",
              "Apply behavioural questions and STAR to a small realistic problem",
              "Recognise the common mistakes people make with behavioural questions and STAR"
            ],
            "introduction": "This lesson introduces behavioural questions and STAR. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Behavioural questions ('Tell me about a time you disagreed with a teammate') test how you actually behaved, not what you would do in theory. The STAR method structures the answer: Situation (the context in one or two sentences), Task (what you were responsible for), Action (what you specifically did — the bulk of the answer), and Result (what happened, with numbers if possible). The most common failure is spending the whole answer on the situation and never reaching the action — the interviewer learns nothing about you. Prepare five or six stories that cover leadership, conflict, failure, and learning, and practise telling each in under two minutes.",
            "syntax": "STAR: Situation -> Task -> Action -> Result (action is the bulk)",
            "analogy": "STAR is like a short story with a shape: set the scene quickly, say what was at stake, spend most of the time on what you did, and end with what changed.",
            "exampleCode": "story = {\"S\": \"The payment service went down on Black Friday\", \"T\": \"I owned the incident\", \"A\": \"I rolled back the deploy and added a circuit breaker\", \"R\": \"Downtime cut from 40 to 5 minutes\"} \nprint(\"Action is the longest part — it is the part about you.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem behavioural questions and STAR solves in plain words.",
              "Follow the example step by step and note where behavioural questions and STAR changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Spending the whole answer on the situation and never reaching the action.",
              "Saying 'we did' for everything instead of 'I did'.",
              "Preparing only success stories and having no failure story."
            ],
            "debugging": {
              "prompt": "This STAR answer never reaches what the candidate did. What is wrong?",
              "buggyCode": "answer = \"The situation was complex. The team was large. The deadline was tight. The stakeholders were worried.\"",
              "fixedCode": "answer = \"Situation: the service was down. Task: I owned the fix. Action: I rolled back and added a breaker. Result: downtime fell to 5 minutes.\"",
              "explanation": "The answer is all Situation and no Action — the interviewer learns nothing about what the candidate actually did."
            },
            "miniChallenge": "Extend the exercise: apply behavioural questions and STAR to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "STAR structures behavioural answers — Situation, Task, Action, Result — with the Action as the bulk, told in under two minutes, with 'I did' not 'we did'.",
            "quiz": [
              {
                "question": "What is the most important part of a STAR answer?",
                "options": [
                  "The Situation",
                  "The Action — what you specifically did",
                  "The Result",
                  "The Task"
                ],
                "answer": 1,
                "explanation": "The Action is the evidence about you; the Situation is just context and should stay short."
              },
              {
                "question": "How long should a STAR story take?",
                "options": [
                  "Ten minutes",
                  "Under two minutes",
                  "Thirty seconds",
                  "As long as needed"
                ],
                "answer": 1,
                "explanation": "A tight story under two minutes keeps the interviewer's attention and leaves time for follow-ups."
              }
            ],
            "exercise": {
              "title": "Score a STAR story",
              "type": "write-code",
              "instructions": "Write a program that reads four numbers — the seconds spent on Situation, Task, Action, and Result — and prints BALANCED if Action is the largest part, otherwise UNBALANCED.",
              "starterCode": "s = int(input())\nt = int(input())\na = int(input())\nr = int(input())\n# balanced if action is the largest\n",
              "solution": "s = int(input())\nt = int(input())\na = int(input())\nr = int(input())\nprint(\"BALANCED\" if a > s and a > t and a > r else \"UNBALANCED\")",
              "solutionExplanation": "A good STAR story spends the most time on the Action; compare the action time against the other three.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Action longest",
                  "hidden": false,
                  "stdin": "20\n10\n60\n15\n",
                  "expectedStdout": "BALANCED"
                },
                {
                  "name": "Situation longest",
                  "hidden": true,
                  "stdin": "60\n10\n20\n15\n",
                  "expectedStdout": "UNBALANCED"
                }
              ],
              "hintNotes": {
                "concept": "In STAR, the Action is the bulk — it should be the longest section.",
                "approach": "Check that a is greater than s, t, and r.",
                "structure": "Structure: read four numbers, then one print with the comparison."
              },
              "id": "interview-prep-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "interview-prep-m2",
        "title": "Coding Interviews",
        "description": "Talking through solutions and the patterns that recur.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "interview-prep-m2-l1",
            "slug": "interview-prep-m2-l1",
            "title": "Talking Through Your Solution",
            "objectives": [
              "Explain what talking through your solution means and where it appears in real systems",
              "Apply talking through your solution to a small realistic problem",
              "Recognise the common mistakes people make with talking through your solution"
            ],
            "introduction": "In this lesson you will see talking through your solution in action, work through a guided example, and practise it yourself.",
            "concept": "Interviewers grade your thinking out loud, not just your final code — a silent candidate who produces a perfect answer still scores badly, because the interviewer cannot see the reasoning. The method is to narrate continuously: restate the problem in your own words, ask clarifying questions, state your approach and its complexity before coding, and talk through each step as you write it. When you are stuck, say so and describe what you have tried — interviewers help candidates who show their working and stay quiet for candidates who go silent. The code is the evidence; the talking is the interview.",
            "syntax": "narrate: restate -> clarify -> approach + complexity -> code aloud -> test",
            "analogy": "Talking through a solution is like a chef narrating a recipe on television: the audience learns from the explanation, not just from the finished dish.",
            "exampleCode": "print(\"Restate the problem in your own words\")\nprint(\"Ask: what are the inputs, edge cases, constraints?\")\nprint(\"State the approach and Big-O before coding\")\nprint(\"Code aloud, then test with an example\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how talking through your solution is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Coding in silence and hiding your reasoning.",
              "Jumping to code before clarifying the problem.",
              "Stating the complexity after the fact instead of before."
            ],
            "debugging": {
              "prompt": "This candidate solved the problem in silence. What did they lose?",
              "buggyCode": "print(\"Perfect code, zero talking\")",
              "fixedCode": "print(\"Good code, narrated throughout\")",
              "explanation": "The interviewer could not see the reasoning, so the thinking — the thing being graded — was invisible."
            },
            "miniChallenge": "Extend the exercise: apply talking through your solution to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "In coding rounds, narrate continuously: restate, clarify, state the approach and complexity, code aloud, and test — the thinking is what is graded.",
            "quiz": [
              {
                "question": "Why should you state the approach and complexity before coding?",
                "options": [
                  "To impress the interviewer",
                  "So the interviewer can follow your reasoning and catch a wrong direction early",
                  "To waste time",
                  "It is required"
                ],
                "answer": 1,
                "explanation": "Stating the plan lets the interviewer validate it before you invest in code — and shows structured thinking."
              },
              {
                "question": "What should you do when you are stuck?",
                "options": [
                  "Stay silent until you solve it",
                  "Say so, describe what you have tried, and think aloud",
                  "Give up",
                  "Ask for the answer"
                ],
                "answer": 1,
                "explanation": "Interviewers help candidates who show their working; silence gives them nothing to work with."
              }
            ],
            "exercise": {
              "title": "What to do first in a coding round",
              "type": "multiple-choice",
              "instructions": "You are given a coding problem. What is the best first move?",
              "starterCode": "",
              "solution": "Restate the problem and ask clarifying questions",
              "solutionExplanation": "Restating proves you understood the problem and surfaces hidden constraints before you invest in a wrong approach.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Before coding, make sure you are solving the right problem.",
                "approach": "Look for the option that checks understanding before writing code.",
                "structure": "Structure: restate, clarify, plan, then code."
              },
              "options": [
                "Start coding immediately",
                "Restate the problem and ask clarifying questions",
                "Write the most complex solution you can think of",
                "Ask for a different problem"
              ],
              "answerIndex": 1,
              "id": "interview-prep-m2-l1-e1"
            }
          },
          {
            "id": "interview-prep-m2-l2",
            "slug": "interview-prep-m2-l2",
            "title": "Common Coding Patterns",
            "objectives": [
              "Explain what common coding patterns means and where it appears in real systems",
              "Apply common coding patterns to a small realistic problem",
              "Recognise the common mistakes people make with common coding patterns"
            ],
            "introduction": "In this lesson you will see common coding patterns in action, work through a guided example, and practise it yourself.",
            "concept": "Most coding interview problems are variations on a small set of patterns, and recognising the pattern is half the solution. Two pointers for sorted arrays and palindromes, sliding window for subarrays, hash maps for complements and frequencies, fast and slow pointers for cycles in linked lists, and BFS/DFS for trees and graphs. The preparation method is to learn each pattern's signal — the phrase in the problem that hints at it — and to solve three or four problems per pattern until the recognition is automatic. In the interview, naming the pattern out loud ('this looks like a sliding window') shows the interviewer you have a method, not just luck.",
            "syntax": "patterns: two pointers, sliding window, hash map, fast/slow, BFS/DFS",
            "analogy": "Coding patterns are like chess openings: you do not memorise every game, you learn the handful of openings and recognise which one the position calls for.",
            "exampleCode": "print(\"Sorted array + pairs -> two pointers\")\nprint(\"Subarray + constraint -> sliding window\")\nprint(\"Complement / frequency -> hash map\")\nprint(\"Cycle in a list -> fast and slow pointers\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how common coding patterns is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Memorising solutions instead of learning the patterns behind them.",
              "Using a nested loop where a pattern would give O(n).",
              "Never naming the pattern, so the interviewer sees luck instead of method."
            ],
            "debugging": {
              "prompt": "This problem asks for the longest subarray with sum at most K. Which pattern fits?",
              "buggyCode": "print(\"Two pointers\")",
              "fixedCode": "print(\"Sliding window\")",
              "explanation": "A contiguous subarray with a constraint is the sliding window's home turf: expand right, shrink left when the constraint breaks."
            },
            "miniChallenge": "Extend the exercise: apply common coding patterns to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Coding interviews reward pattern recognition: two pointers, sliding window, hash maps, fast/slow pointers, and BFS/DFS cover most problems — learn each pattern's signal.",
            "quiz": [
              {
                "question": "Which pattern fits 'find two numbers in a sorted array that sum to a target'?",
                "options": [
                  "Sliding window",
                  "Two pointers",
                  "BFS",
                  "Dynamic programming"
                ],
                "answer": 1,
                "explanation": "Two pointers from opposite ends of a sorted array find the pair in O(n)."
              },
              {
                "question": "Which pattern fits 'longest substring without repeating characters'?",
                "options": [
                  "Two pointers",
                  "Sliding window",
                  "Binary search",
                  "Recursion"
                ],
                "answer": 1,
                "explanation": "A sliding window with a set of seen characters expands and shrinks as it scans the string."
              }
            ],
            "exercise": {
              "title": "Two-sum with two pointers",
              "type": "write-code",
              "instructions": "Write a program that reads a target and a sorted list of numbers (space-separated), then prints YES if any two sum to the target, otherwise NO. Use two pointers from both ends.",
              "starterCode": "target = int(input())\nnums = [int(x) for x in input().split()]\nleft, right = 0, len(nums) - 1\nfound = False\nwhile left < right:\n    s = nums[left] + nums[right]\n    if s == target:\n        found = True\n        break\n    if s < target:\n        left += 1\n    else:\n        right -= 1\nprint(\"YES\" if found else \"NO\")",
              "solution": "target = int(input())\nnums = [int(x) for x in input().split()]\nleft, right = 0, len(nums) - 1\nfound = False\nwhile left < right:\n    s = nums[left] + nums[right]\n    if s == target:\n        found = True\n        break\n    if s < target:\n        left += 1\n    else:\n        right -= 1\nprint(\"YES\" if found else \"NO\")",
              "solutionExplanation": "Two pointers converge: if the sum is too small, move left up; if too big, move right down — O(n) on a sorted array.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Target 9 in 2 7 11 15",
                  "hidden": false,
                  "stdin": "9\n2 7 11 15\n",
                  "expectedStdout": "YES"
                },
                {
                  "name": "Target 9 in 1 2 3",
                  "hidden": true,
                  "stdin": "9\n1 2 3\n",
                  "expectedStdout": "NO"
                }
              ],
              "hintNotes": {
                "concept": "A sorted array lets two pointers find the pair in one pass.",
                "approach": "Move left up when the sum is too small, right down when it is too big.",
                "structure": "Structure: read the target and list, loop with two pointers, print YES or NO."
              },
              "id": "interview-prep-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "interview-prep-m3",
        "title": "System Design Interviews",
        "description": "The framework and the trade-off discussions.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "interview-prep-m3-l1",
            "slug": "interview-prep-m3-l1",
            "title": "The Interview Framework",
            "objectives": [
              "Explain what the system design interview framework means and where it appears in real systems",
              "Apply the system design interview framework to a small realistic problem",
              "Recognise the common mistakes people make with the system design interview framework"
            ],
            "introduction": "Here you will get hands-on with the system design interview framework: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A system design interview is a 45-minute conversation, and the framework keeps it on track: clarify the requirements and scope (five minutes), estimate capacity with rough numbers (five minutes), sketch the high-level design (ten minutes), deep-dive into the two or three components that matter most (fifteen minutes), and close with bottlenecks and improvements (ten minutes). The most common failure is spending twenty minutes on the database schema and never reaching the scaling discussion. Drive the conversation yourself: state assumptions out loud, ask the interviewer to confirm the scope, and keep moving — the interviewer is grading the journey, not the final diagram.",
            "syntax": "clarify -> estimate -> sketch -> deep-dive -> bottlenecks",
            "analogy": "A design interview is like a guided tour: you decide the route in advance, keep moving, and spend the most time at the two or three sights that matter most.",
            "exampleCode": "print(\"1. Clarify requirements and scope (5 min)\")\nprint(\"2. Estimate capacity (5 min)\")\nprint(\"3. High-level design (10 min)\")\nprint(\"4. Deep-dive key components (15 min)\")\nprint(\"5. Bottlenecks and improvements (10 min)\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where the system design interview framework does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Designing before clarifying the scope.",
              "Spending the whole interview on one component.",
              "Waiting for the interviewer to drive the conversation."
            ],
            "debugging": {
              "prompt": "This candidate spent 25 minutes on the database schema. What went wrong?",
              "buggyCode": "print(\"Detailed schema, no time for scaling\")",
              "fixedCode": "print(\"Rough sketch, then deep-dive on the two hardest components\")",
              "explanation": "They spent the whole interview on one component and never reached the scaling discussion the interview was measuring."
            },
            "miniChallenge": "Extend the exercise: apply the system design interview framework to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A design interview follows a framework — clarify, estimate, sketch, deep-dive, bottlenecks — and you must drive it yourself, keeping time for the scaling discussion.",
            "quiz": [
              {
                "question": "What should you do in the first five minutes of a design interview?",
                "options": [
                  "Draw the database schema",
                  "Clarify requirements and agree the scope",
                  "Start coding",
                  "List every technology you know"
                ],
                "answer": 1,
                "explanation": "Clarifying scope first prevents designing the wrong system for twenty minutes."
              },
              {
                "question": "What is the deep-dive for?",
                "options": [
                  "Showing off trivia",
                  "Going deep on the two or three components that matter most for this system",
                  "Drawing more boxes",
                  "Repeating the sketch"
                ],
                "answer": 1,
                "explanation": "The deep-dive is where real judgment shows — the components where the system's hardest trade-offs live."
              }
            ],
            "exercise": {
              "title": "Plan the interview time",
              "type": "write-code",
              "instructions": "Write a program that reads the minutes spent on each of the five phases (clarify, estimate, sketch, deep-dive, close) and prints OVER if the total exceeds 45, otherwise ON TRACK.",
              "starterCode": "times = [int(input()) for _ in range(5)]\nprint(\"OVER\" if sum(times) > 45 else \"ON TRACK\")",
              "solution": "times = [int(input()) for _ in range(5)]\nprint(\"OVER\" if sum(times) > 45 else \"ON TRACK\")",
              "solutionExplanation": "Add the five phase times and compare the total with the 45-minute budget.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5 5 10 15 10",
                  "hidden": false,
                  "stdin": "5\n5\n10\n15\n10\n",
                  "expectedStdout": "ON TRACK"
                },
                {
                  "name": "10 10 20 15 10",
                  "hidden": true,
                  "stdin": "10\n10\n20\n15\n10\n",
                  "expectedStdout": "OVER"
                }
              ],
              "hintNotes": {
                "concept": "A design interview has a fixed budget — the phases must add up to 45 minutes.",
                "approach": "Sum the five times and compare with 45.",
                "structure": "Structure: read five numbers, sum them, print the verdict."
              },
              "id": "interview-prep-m3-l1-e1"
            }
          },
          {
            "id": "interview-prep-m3-l2",
            "slug": "interview-prep-m3-l2",
            "title": "Trade-off Discussions",
            "objectives": [
              "Explain what trade-off discussions means and where it appears in real systems",
              "Apply trade-off discussions to a small realistic problem",
              "Recognise the common mistakes people make with trade-off discussions"
            ],
            "introduction": "Here you will get hands-on with trade-off discussions: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Interviewers do not expect one right design; they expect you to name the trade-offs and justify your choices. Every decision has a cost: a cache makes reads fast but risks stale data, sharding scales writes but makes joins hard, synchronous replication is safe but slow. The winning move is to state the trade-off explicitly ('I am choosing availability over consistency here because...') and to name the alternative you rejected and why. Candidates who pretend there is no downside look naive; candidates who surface the trade-off and reason about it look senior. The design is the argument, not the diagram.",
            "syntax": "name the trade-off, justify the choice, name the rejected alternative",
            "analogy": "A trade-off discussion is like choosing a route on a map: there is no perfect road, only the one whose downsides you understand and accept.",
            "exampleCode": "print(\"Cache: fast reads, stale data risk\")\nprint(\"Sharding: scalable writes, hard joins\")\nprint(\"Sync replication: safe, slow\")\nprint(\"Say the trade-off out loud, then justify the choice.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where trade-off discussions does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Pretending your design has no downsides.",
              "Choosing a technology because it is fashionable, not because it fits.",
              "Refusing to consider an alternative the interviewer suggests."
            ],
            "debugging": {
              "prompt": "This candidate chose a cache and never mentioned staleness. What is missing?",
              "buggyCode": "print(\"Cache: reads are fast\")",
              "fixedCode": "print(\"Cache: reads are fast, but data can go stale — I accept a 60s TTL for this feed\")",
              "explanation": "The trade-off was never named: fast reads cost freshness, and the candidate must say what staleness they accept and why."
            },
            "miniChallenge": "Extend the exercise: apply trade-off discussions to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Design interviews grade the argument, not the diagram: name each trade-off, justify your choice for this system, and name the alternative you rejected.",
            "quiz": [
              {
                "question": "What should you do when the interviewer asks 'why not use X instead?'",
                "options": [
                  "Defend your choice blindly",
                  "Explain the trade-off: what X gains, what it costs, and why your choice fits this system",
                  "Switch immediately",
                  "Say you do not know X"
                ],
                "answer": 1,
                "explanation": "A good answer compares the options on their trade-offs and justifies the choice for this system's needs."
              },
              {
                "question": "Why do interviewers prefer candidates who name trade-offs?",
                "options": [
                  "It fills time",
                  "It shows senior judgment: every design has costs, and naming them proves you see them",
                  "It makes the diagram prettier",
                  "It avoids coding"
                ],
                "answer": 1,
                "explanation": "Surfacing trade-offs is what senior engineers do; pretending there is no downside looks naive."
              }
            ],
            "exercise": {
              "title": "Justify a trade-off",
              "type": "multiple-choice",
              "instructions": "You chose asynchronous replication for a social feed. What is the best justification?",
              "starterCode": "",
              "solution": "Feeds tolerate brief staleness, and async replication keeps writes fast — the trade-off fits this system",
              "solutionExplanation": "A justification connects the choice to the system's needs: feeds can be briefly stale, so the speed of async replication is worth the lag. For a bank ledger the answer would be the opposite.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "A justification links the trade-off to what this system can tolerate.",
                "approach": "Look for the answer that names what is given up and why it is acceptable here.",
                "structure": "Structure: trade-off + why it fits this system's needs."
              },
              "options": [
                "Async is always better",
                "Feeds tolerate brief staleness, and async replication keeps writes fast — the trade-off fits this system",
                "Sync replication is too hard to implement",
                "The interviewer prefers async"
              ],
              "answerIndex": 1,
              "id": "interview-prep-m3-l2-e1"
            }
          }
        ]
      },
      {
        "id": "interview-prep-m4",
        "title": "Take-Homes and Live Coding",
        "description": "Assignments and performing under pressure.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "interview-prep-m4-l1",
            "slug": "interview-prep-m4-l1",
            "title": "Take-Home Assignments",
            "objectives": [
              "Explain what take-home assignments means and where it appears in real systems",
              "Apply take-home assignments to a small realistic problem",
              "Recognise the common mistakes people make with take-home assignments"
            ],
            "introduction": "In this lesson you will see take-home assignments in action, work through a guided example, and practise it yourself.",
            "concept": "A take-home assignment replaces a live round with a small project you complete in your own time, usually in a few hours. The grading is different from live coding: the code is read carefully, so structure, naming, tests, and a README matter as much as correctness. The winning approach is to treat it like real work — read the requirements twice, build the smallest thing that satisfies them, write tests for the core behaviour, and document your assumptions and what you would do with more time. The most common failure is over-engineering: a sprawling framework for a task that needed a script, or gold-plating features nobody asked for.",
            "syntax": "read twice, build the smallest thing, test the core, document assumptions",
            "analogy": "A take-home is like a cooking audition at home: the judges taste the dish, but they also inspect your kitchen — clean code, tests, and a README are the tidy worktops.",
            "exampleCode": "print(\"Read the requirements twice\")\nprint(\"Build the smallest thing that works\")\nprint(\"Test the core behaviour\")\nprint(\"README: assumptions + what you would do next\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how take-home assignments is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Over-engineering a small task into a framework.",
              "Skipping tests and a README because 'it works'.",
              "Building features nobody asked for instead of the core."
            ],
            "debugging": {
              "prompt": "This take-home added a web framework, a database, and a CI pipeline for a script task. What is wrong?",
              "buggyCode": "print(\"Built: framework + database + CI for a 100-line task\")",
              "fixedCode": "print(\"Built: a clean script, tests, and a README\")",
              "explanation": "Over-engineering: the task needed a script, and the extra machinery shows poor scope judgment."
            },
            "miniChallenge": "Extend the exercise: apply take-home assignments to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Take-homes are judged like real work: the smallest thing that satisfies the requirements, built cleanly, tested, and documented with your assumptions.",
            "quiz": [
              {
                "question": "What matters most in a take-home, beyond correctness?",
                "options": [
                  "Speed of delivery",
                  "Structure, naming, tests, and a README — the code is read carefully",
                  "Using the newest framework",
                  "The number of features"
                ],
                "answer": 1,
                "explanation": "Take-homes are read like real code, so quality, tests, and documentation carry as much weight as the result."
              },
              {
                "question": "What is the most common take-home failure?",
                "options": [
                  "Submitting too early",
                  "Over-engineering — building far more than was asked",
                  "Writing tests",
                  "Using a README"
                ],
                "answer": 1,
                "explanation": "Gold-plating and sprawling frameworks signal poor judgment; the smallest working thing, well built, wins."
              }
            ],
            "exercise": {
              "title": "Estimate take-home scope",
              "type": "write-code",
              "instructions": "Write a program that reads the hours available and the hours the core task needs, then prints ENOUGH if the core fits in the available time with at least 1 hour left for tests and README, otherwise TOO BIG.",
              "starterCode": "available = int(input())\ncore = int(input())\nprint(\"ENOUGH\" if available - core >= 1 else \"TOO BIG\")",
              "solution": "available = int(input())\ncore = int(input())\nprint(\"ENOUGH\" if available - core >= 1 else \"TOO BIG\")",
              "solutionExplanation": "Reserve at least one hour for tests and documentation; the core must fit in the remaining time.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "4 hours, core 2",
                  "hidden": false,
                  "stdin": "4\n2\n",
                  "expectedStdout": "ENOUGH"
                },
                {
                  "name": "3 hours, core 3",
                  "hidden": true,
                  "stdin": "3\n3\n",
                  "expectedStdout": "TOO BIG"
                }
              ],
              "hintNotes": {
                "concept": "Scope the work so tests and a README fit — they are part of the deliverable.",
                "approach": "Check that available - core leaves at least 1 hour.",
                "structure": "Structure: read two numbers, then one print with the verdict."
              },
              "id": "interview-prep-m4-l1-e1"
            }
          },
          {
            "id": "interview-prep-m4-l2",
            "slug": "interview-prep-m4-l2",
            "title": "Live Coding Under Pressure",
            "objectives": [
              "Explain what live coding under pressure means and where it appears in real systems",
              "Apply live coding under pressure to a small realistic problem",
              "Recognise the common mistakes people make with live coding under pressure"
            ],
            "introduction": "This lesson introduces live coding under pressure. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Live coding is stressful because it combines problem solving with performance, and the stress itself is part of what is measured — can you think clearly with someone watching? The techniques that help are all preparation: practise out loud so narrating becomes automatic, keep a checklist (clarify, brute force, optimise, test) so you never freeze, and rehearse the common patterns until recognition is fast. When you do freeze, the recovery is to go back to the smallest step: restate the problem, write down an example, and solve that example by hand. Interviewers expect nerves; what they remember is how you recovered, not that you were nervous.",
            "syntax": "practise aloud, keep a checklist, recover via the smallest step",
            "analogy": "Live coding under pressure is like playing a piano recital: the practice is what carries you when nerves hit, and a stumble is fine if you find your place and continue.",
            "exampleCode": "print(\"Checklist: clarify -> brute force -> optimise -> test\")\nprint(\"Stuck? Restate, write an example, solve it by hand.\")\nprint(\"Nerves are expected; recovery is what is remembered.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem live coding under pressure solves in plain words.",
              "Follow the example step by step and note where live coding under pressure changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Freezing in silence instead of thinking aloud.",
              "Practising only silently, then being unable to narrate under pressure.",
              "Skipping the brute-force solution to hunt for the optimal one immediately."
            ],
            "debugging": {
              "prompt": "This candidate froze and stayed silent for two minutes. What should they have done?",
              "buggyCode": "print(\"Stayed silent\")",
              "fixedCode": "print(\"Restated the problem and worked a small example by hand\")",
              "explanation": "Silence gives the interviewer nothing; restating and solving a small example restarts the thinking and shows the working."
            },
            "miniChallenge": "Extend the exercise: apply live coding under pressure to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Live coding measures thinking under pressure: practise out loud, follow a checklist, and recover from a freeze by returning to the smallest concrete step.",
            "quiz": [
              {
                "question": "What is the best recovery when you freeze in a live coding round?",
                "options": [
                  "Stay silent",
                  "Go back to the smallest step: restate the problem and solve a small example by hand",
                  "Start over from scratch",
                  "Apologise and stop"
                ],
                "answer": 1,
                "explanation": "A small concrete step restarts your thinking; interviewers remember the recovery, not the freeze."
              },
              {
                "question": "Why practise coding out loud?",
                "options": [
                  "To be louder",
                  "So narrating becomes automatic and you can think and talk at the same time under pressure",
                  "To memorise solutions",
                  "It is not useful"
                ],
                "answer": 1,
                "explanation": "Out-loud practice makes the narration automatic, so pressure does not steal your ability to explain."
              }
            ],
            "exercise": {
              "title": "Recover from a freeze",
              "type": "multiple-choice",
              "instructions": "You freeze halfway through a live coding problem. What is the best move?",
              "starterCode": "",
              "solution": "Restate the problem and solve a small example by hand",
              "solutionExplanation": "Going back to the smallest concrete step restarts your thinking and gives the interviewer something to follow — silence or restarting from scratch does neither.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "A freeze needs a small concrete step, not a big restart.",
                "approach": "Look for the option that restarts thinking with a tiny example.",
                "structure": "Structure: restate, example by hand, continue."
              },
              "options": [
                "Stay silent until the answer comes",
                "Restate the problem and solve a small example by hand",
                "Delete everything and start over",
                "Ask to skip the question"
              ],
              "answerIndex": 1,
              "id": "interview-prep-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "interview-prep-m5",
        "title": "Offers and Negotiation",
        "description": "Salary negotiation and choosing between offers.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "interview-prep-m5-l1",
            "slug": "interview-prep-m5-l1",
            "title": "Salary Negotiation",
            "objectives": [
              "Explain what salary negotiation means and where it appears in real systems",
              "Apply salary negotiation to a small realistic problem",
              "Recognise the common mistakes people make with salary negotiation"
            ],
            "introduction": "Here you will get hands-on with salary negotiation: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Salary negotiation starts before the offer: research the market rate for the role and location, know your walk-away number, and never name a number first if you can avoid it — let the company anchor, then negotiate from their range. When the offer arrives, negotiate the whole package (base, equity, bonus, signing, remote flexibility), not just the base salary, and always negotiate in writing with a calm, collaborative tone: 'I am excited about the role, and based on the market data I was hoping for X.' The biggest mistake is accepting the first offer on the spot; companies expect a counter, and a polite one never costs you the offer.",
            "syntax": "research the market, know your walk-away, negotiate the whole package",
            "analogy": "Negotiation is like buying a house: the asking price is the start of the conversation, not the end — and the buyer who did their research gets the better deal.",
            "exampleCode": "print(\"Research: market rate for role + location\")\nprint(\"Know your walk-away number\")\nprint(\"Negotiate the whole package, not just base\")\nprint(\"Counter politely, in writing — never accept on the spot\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where salary negotiation does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Accepting the first offer on the spot.",
              "Negotiating only base salary and ignoring equity and bonus.",
              "Naming a number first without knowing the market range."
            ],
            "debugging": {
              "prompt": "This candidate accepted the first offer immediately. What did they lose?",
              "buggyCode": "print(\"Accepted on the spot\")",
              "fixedCode": "print(\"Thanked them, asked for time, countered with market data\")",
              "explanation": "Companies expect a polite counter, and the first offer is rarely the best — accepting on the spot leaves money and terms on the table."
            },
            "miniChallenge": "Extend the exercise: apply salary negotiation to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Negotiate the whole package from market data, know your walk-away, let the company anchor first, and always counter politely — companies expect it.",
            "quiz": [
              {
                "question": "Why should you avoid naming a salary number first?",
                "options": [
                  "It is rude",
                  "Letting the company anchor first gives you their range to negotiate from",
                  "It is illegal",
                  "Numbers do not matter"
                ],
                "answer": 1,
                "explanation": "Whoever names a number first anchors the discussion; their range is information you want before you counter."
              },
              {
                "question": "What should you negotiate besides base salary?",
                "options": [
                  "Nothing",
                  "The whole package: equity, bonus, signing, flexibility",
                  "Only the job title",
                  "Only the start date"
                ],
                "answer": 1,
                "explanation": "Total compensation includes equity, bonus, signing, and flexibility — often worth more than a base bump."
              }
            ],
            "exercise": {
              "title": "Compare total compensation",
              "type": "write-code",
              "instructions": "Write a program that reads base salary and equity value (two lines) and prints exactly: Total: <n>. Total compensation is base + equity.",
              "starterCode": "base = int(input())\nequity = int(input())\nprint(f\"Total: {base + equity}\")",
              "solution": "base = int(input())\nequity = int(input())\nprint(f\"Total: {base + equity}\")",
              "solutionExplanation": "Total compensation is the base salary plus the equity value.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "100000 + 20000",
                  "hidden": false,
                  "stdin": "100000\n20000\n",
                  "expectedStdout": "Total: 120000"
                },
                {
                  "name": "80000 + 5000",
                  "hidden": true,
                  "stdin": "80000\n5000\n",
                  "expectedStdout": "Total: 85000"
                }
              ],
              "hintNotes": {
                "concept": "Compare offers by total compensation, not base salary alone.",
                "approach": "Add base and equity and print the total.",
                "structure": "Structure: read two numbers, then one print with the sum."
              },
              "id": "interview-prep-m5-l1-e1"
            }
          },
          {
            "id": "interview-prep-m5-l2",
            "slug": "interview-prep-m5-l2",
            "title": "Choosing Between Offers",
            "objectives": [
              "Explain what choosing between offers means and where it appears in real systems",
              "Apply choosing between offers to a small realistic problem",
              "Recognise the common mistakes people make with choosing between offers"
            ],
            "introduction": "Here you will get hands-on with choosing between offers: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Choosing between offers is a decision under uncertainty, so make it explicit: list what matters to you — compensation, growth, the team, the product, location, stability — weight each factor, and score each offer honestly. Then look beyond the numbers: who will your manager be, what will you learn in the first year, and would you take the job if the pay were equal? Talk to future teammates before deciding; the team is the job. And remember that the best offer is not always the highest-paying one — the job that grows you fastest usually pays best over a career.",
            "syntax": "weight what matters, score each offer, look beyond the numbers",
            "analogy": "Choosing an offer is like choosing a house: the price matters, but you live in the neighbourhood, the light, and the neighbours — the team is the job.",
            "exampleCode": "print(\"List factors: pay, growth, team, product, location, stability\")\nprint(\"Weight each, score each offer\")\nprint(\"Talk to future teammates\")\nprint(\"Ask: would I take it if the pay were equal?\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where choosing between offers does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Choosing purely on pay and ignoring the team and growth.",
              "Deciding without talking to future teammates.",
              "Treating the decision as permanent instead of the best choice with current information."
            ],
            "debugging": {
              "prompt": "Two offers pay the same, but one has a team you admire and a manager who mentors. Which should you pick?",
              "buggyCode": "print(\"Pick randomly\")",
              "fixedCode": "print(\"Pick the team you admire — the team is the job\")",
              "explanation": "With pay equal, the team, manager, and growth decide — and they also decide what you will earn next."
            },
            "miniChallenge": "Extend the exercise: apply choosing between offers to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Choose offers by scoring what matters — pay, growth, team, product — and remember the team is the job; the fastest-growing job usually pays best over a career.",
            "quiz": [
              {
                "question": "What is the most important factor to check beyond pay?",
                "options": [
                  "The office furniture",
                  "The team and manager — they are the job",
                  "The company logo",
                  "The commute playlist"
                ],
                "answer": 1,
                "explanation": "Your day-to-day experience is the team and manager; pay is only one factor."
              },
              {
                "question": "What question reveals what you really value in an offer?",
                "options": [
                  "Would I take it if the pay were equal?",
                  "Is the office nice?",
                  "How big is the company?",
                  "What is the dress code?"
                ],
                "answer": 0,
                "explanation": "Removing pay from the comparison exposes whether the work, team, and growth are what you actually want."
              }
            ],
            "exercise": {
              "title": "Score an offer",
              "type": "write-code",
              "instructions": "Write a program that reads three factor scores (pay, growth, team) each out of 10, then prints exactly: Score: <n>. The total is the sum of the three scores.",
              "starterCode": "pay = int(input())\ngrowth = int(input())\nteam = int(input())\nprint(f\"Score: {pay + growth + team}\")",
              "solution": "pay = int(input())\ngrowth = int(input())\nteam = int(input())\nprint(f\"Score: {pay + growth + team}\")",
              "solutionExplanation": "Add the three factor scores to get the offer's total score.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "8 7 9",
                  "hidden": false,
                  "stdin": "8\n7\n9\n",
                  "expectedStdout": "Score: 24"
                },
                {
                  "name": "10 5 5",
                  "hidden": true,
                  "stdin": "10\n5\n5\n",
                  "expectedStdout": "Score: 20"
                }
              ],
              "hintNotes": {
                "concept": "Scoring makes the decision explicit: weight what matters and add it up.",
                "approach": "Sum the three scores and print the total.",
                "structure": "Structure: read three numbers, then one print with the sum."
              },
              "id": "interview-prep-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "open-source",
    "slug": "open-source",
    "language": "bash",
    "category": "cs-career",
    "title": "Open Source Contribution",
    "description": "Contribute to open source: find a project, fork and clone, branch and commit, write pull requests, handle code review, and grow into a maintainer.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Git workflow",
      "Forking and cloning",
      "Pull requests",
      "Code review",
      "Issue triage",
      "Licensing",
      "Community"
    ],
    "prerequisites": [
      "Basic Git knowledge",
      "Comfort with the command line"
    ],
    "modules": [
      {
        "id": "open-source-m1",
        "title": "Getting Started",
        "description": "How open source works and how to find a project.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "open-source-m1-l1",
            "slug": "open-source-m1-l1",
            "title": "How Open Source Works",
            "objectives": [
              "Explain what how open source works means and where it appears in real systems",
              "Apply how open source works to a small realistic problem",
              "Recognise the common mistakes people make with how open source works"
            ],
            "introduction": "In this lesson you will see how open source works in action, work through a guided example, and practise it yourself.",
            "concept": "Open source is software whose source code is public and licensed so anyone may use, study, modify, and share it. A project is usually a repository with a maintainer (or team) who reviews contributions, an issue tracker where work is discussed, and a license file that states the legal terms. Contributions are not only code: documentation, bug reports, tests, and translations are all valued, and many projects label beginner-friendly work as 'good first issue'. The social contract is simple: you may take the code for free, and in return you are expected to follow the project's norms — read the CONTRIBUTING guide before you touch anything.",
            "syntax": "repository + maintainer + issues + license; contributions include docs and bug reports",
            "analogy": "Open source is like a community garden: anyone may plant and harvest, but you follow the garden's rules, ask before digging up a bed, and leave the place better than you found it.",
            "exampleCode": "echo \"Open source: public code, a license, a maintainer, an issue tracker\"\necho \"Contributions: code, docs, bug reports, tests, translations\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Read the example and trace how how open source works is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Opening a huge pull request without reading CONTRIBUTING or discussing it first.",
              "Assuming only code counts as a contribution.",
              "Ignoring the license and copying code into a project with an incompatible one."
            ],
            "debugging": {
              "prompt": "This newcomer skipped the CONTRIBUTING guide and opened a huge pull request. What is wrong?",
              "buggyCode": "echo \"PR: 5000 lines, no discussion, no guide read\"",
              "fixedCode": "echo \"Read CONTRIBUTING, discussed the issue, small PR\"",
              "explanation": "The guide states the project's norms — without it, a huge unsolicited PR usually gets closed, not merged."
            },
            "miniChallenge": "Extend the exercise: apply how open source works to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Open source is public code under a license, stewarded by maintainers; contributions include docs, tests, and bug reports, and the CONTRIBUTING guide is the first thing to read.",
            "quiz": [
              {
                "question": "What does a project's license file do?",
                "options": [
                  "It lists the contributors",
                  "It states the legal terms under which the code may be used and shared",
                  "It describes the features",
                  "It is the README"
                ],
                "answer": 1,
                "explanation": "The license is the legal permission slip: it says what you may do with the code."
              },
              {
                "question": "What is a 'good first issue'?",
                "options": [
                  "A bug nobody wants",
                  "An issue labelled as suitable for a newcomer",
                  "The first bug ever filed",
                  "A paid task"
                ],
                "answer": 1,
                "explanation": "Maintainers label approachable issues so newcomers can make a first contribution safely."
              }
            ],
            "exercise": {
              "title": "Create a project README",
              "type": "write-code",
              "instructions": "Write a script that creates a file README.md containing the line '# My Project' and then prints exactly: README_OK. Run in a fresh directory.",
              "starterCode": "echo \"# My Project\" > README.md\ntest -f README.md && echo \"README_OK\"",
              "solution": "echo \"# My Project\" > README.md\ntest -f README.md && echo \"README_OK\"",
              "solutionExplanation": "Write the heading into README.md, then verify the file exists with test -f and print the marker.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "README created",
                  "expectedContains": "README_OK",
                  "hidden": false
                },
                {
                  "name": "README created again",
                  "expectedContains": "README_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A README is the front door of a project — even a one-line one counts.",
                "approach": "Use echo with > to write the file, then test -f to check it exists.",
                "structure": "Structure: write the file, verify it, print the marker."
              },
              "id": "open-source-m1-l1-e1"
            }
          },
          {
            "id": "open-source-m1-l2",
            "slug": "open-source-m1-l2",
            "title": "Finding a Project",
            "objectives": [
              "Explain what finding a project means and where it appears in real systems",
              "Apply finding a project to a small realistic problem",
              "Recognise the common mistakes people make with finding a project"
            ],
            "introduction": "This lesson introduces finding a project. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Finding the right project matters more than finding any project: pick something you actually use, because you will understand its users and stay motivated. Check the project's health before investing — recent commits, responsive maintainers, a CONTRIBUTING guide, and labelled good-first-issues are all green flags; a year of silence is a red one. Start by using the project, then by reproducing a bug or improving the docs, and only then by writing a feature. The best first contribution is small and certain: a typo fix or a missing test proves you can follow the workflow, and maintainers remember contributors who start small and deliver.",
            "syntax": "use it first, check health, start small and certain",
            "analogy": "Finding a project is like joining a sports club: pick one you enjoy, check it is active and welcoming, and start with the easy training sessions before the big match.",
            "exampleCode": "echo \"Green flags: recent commits, responsive maintainers, CONTRIBUTING guide\"\necho \"Red flags: a year of silence, no guide, ignored issues\"\necho \"First step: use it, then fix a typo or a test\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Start by naming the problem finding a project solves in plain words.",
              "Follow the example step by step and note where finding a project changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Picking a dead project with no active maintainers.",
              "Proposing a huge rewrite as a first contribution.",
              "Contributing to a project you never use and do not understand."
            ],
            "debugging": {
              "prompt": "This contributor picked a project they never use and proposed a huge rewrite. What is wrong?",
              "buggyCode": "echo \"Project: never used. Proposal: rewrite the core.\"",
              "fixedCode": "echo \"Project: used daily. Proposal: fix a typo, then a small bug.\"",
              "explanation": "Without using the project you cannot judge what matters, and a huge rewrite from a stranger is rarely merged — start small, in a project you know."
            },
            "miniChallenge": "Extend the exercise: apply finding a project to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Pick a project you use, check its health (recent commits, responsive maintainers, a guide), and start with a small, certain contribution.",
            "quiz": [
              {
                "question": "What is the best first contribution to a project?",
                "options": [
                  "A huge new feature",
                  "A small, certain fix — a typo or a missing test — that proves you can follow the workflow",
                  "A rewrite of the core",
                  "A complaint about the design"
                ],
                "answer": 1,
                "explanation": "Small first contributions build trust and teach you the workflow with low risk."
              },
              {
                "question": "Which is a green flag for a project's health?",
                "options": [
                  "No commits for a year",
                  "Recent commits and responsive maintainers",
                  "No issue tracker",
                  "A closed README"
                ],
                "answer": 1,
                "explanation": "Activity and responsive maintainers show the project is alive and welcoming."
              }
            ],
            "exercise": {
              "title": "Check a project's health markers",
              "type": "write-code",
              "instructions": "Write a script that creates files CONTRIBUTING.md and README.md, then prints exactly: HEALTH_OK if both exist.",
              "starterCode": "touch CONTRIBUTING.md README.md\nif test -f CONTRIBUTING.md && test -f README.md; then echo \"HEALTH_OK\"; fi",
              "solution": "touch CONTRIBUTING.md README.md\nif test -f CONTRIBUTING.md && test -f README.md; then echo \"HEALTH_OK\"; fi",
              "solutionExplanation": "Create both marker files, then check each exists with test -f before printing the marker.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Health markers present",
                  "expectedContains": "HEALTH_OK",
                  "hidden": false
                },
                {
                  "name": "Health markers present again",
                  "expectedContains": "HEALTH_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A healthy project has a README and a CONTRIBUTING guide — check for both.",
                "approach": "Create the files with touch, then test -f for each.",
                "structure": "Structure: create, check both, print the marker."
              },
              "id": "open-source-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "open-source-m2",
        "title": "Git Workflow",
        "description": "Forking, cloning, branches, and commits.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "open-source-m2-l1",
            "slug": "open-source-m2-l1",
            "title": "Forking and Cloning",
            "objectives": [
              "Explain what forking and cloning means and where it appears in real systems",
              "Apply forking and cloning to a small realistic problem",
              "Recognise the common mistakes people make with forking and cloning"
            ],
            "introduction": "This lesson introduces forking and cloning. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "On GitHub, contributing starts with a fork: your own copy of the repository under your account, which gives you permission to push. You then clone your fork to your machine, and you add the original repository as a second remote called upstream, so you can pull in the latest changes. The fork model exists because you cannot push directly to a project you do not own — your fork is your workspace, and a pull request is how you propose your fork's changes back. The two remotes are the key mental model: origin is your fork, upstream is the original, and keeping them straight prevents most beginner mistakes.",
            "syntax": "fork: your copy on GitHub; clone: local copy; origin = fork, upstream = original",
            "analogy": "A fork is like photocopying a recipe book: you scribble in your copy freely, and when a recipe improves you send the original author your page to consider.",
            "exampleCode": "echo \"Fork on GitHub -> clone your fork -> add upstream remote\"\necho \"origin = your fork; upstream = the original project\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Start by naming the problem forking and cloning solves in plain words.",
              "Follow the example step by step and note where forking and cloning changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Cloning the original and trying to push to it directly.",
              "Confusing origin (your fork) with upstream (the original).",
              "Never adding the upstream remote, so the fork goes stale."
            ],
            "debugging": {
              "prompt": "This contributor cloned the original repository and tried to push. What went wrong?",
              "buggyCode": "echo \"Cloned upstream, pushed -> permission denied\"",
              "fixedCode": "echo \"Forked, cloned the fork, pushed to origin\"",
              "explanation": "You cannot push to a project you do not own; you push to your fork (origin) and propose the change with a pull request."
            },
            "miniChallenge": "Extend the exercise: apply forking and cloning to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Fork to get your own copy, clone your fork, add the original as upstream: origin is where you push, upstream is where you pull updates from.",
            "quiz": [
              {
                "question": "What is a fork?",
                "options": [
                  "A branch",
                  "Your own copy of a repository under your account",
                  "A deleted repository",
                  "A local folder"
                ],
                "answer": 1,
                "explanation": "A fork is a server-side copy you own, giving you somewhere to push your changes."
              },
              {
                "question": "What is the upstream remote for?",
                "options": [
                  "To delete the fork",
                  "To pull the latest changes from the original project",
                  "To push to the original directly",
                  "To rename the fork"
                ],
                "answer": 1,
                "explanation": "upstream points at the original repository so you can stay up to date with it."
              }
            ],
            "exercise": {
              "title": "Clone a local repository",
              "type": "write-code",
              "instructions": "Write a script that creates a bare repository source.git, clones it into myfork, and prints exactly: CLONE_OK if the clone directory exists.",
              "starterCode": "git init --bare -q source.git\ngit clone -q source.git myfork\ntest -d myfork/.git && echo \"CLONE_OK\"",
              "solution": "git init --bare -q source.git\ngit clone -q source.git myfork\ntest -d myfork/.git && echo \"CLONE_OK\"",
              "solutionExplanation": "Initialise a bare repo, clone it, and verify the clone has a .git directory.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Clone succeeded",
                  "expectedContains": "CLONE_OK",
                  "hidden": false
                },
                {
                  "name": "Clone succeeded again",
                  "expectedContains": "CLONE_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Cloning copies the whole repository, including its .git directory.",
                "approach": "Use git init --bare for the source, git clone for the copy, test -d to verify.",
                "structure": "Structure: create the source, clone it, check .git exists, print the marker."
              },
              "id": "open-source-m2-l1-e1"
            }
          },
          {
            "id": "open-source-m2-l2",
            "slug": "open-source-m2-l2",
            "title": "Branches and Commits",
            "objectives": [
              "Explain what branches and commits means and where it appears in real systems",
              "Apply branches and commits to a small realistic problem",
              "Recognise the common mistakes people make with branches and commits"
            ],
            "introduction": "Here you will get hands-on with branches and commits: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Every contribution lives on a branch: you create a descriptively named branch from the latest main (git checkout -b fix/typo-in-readme), make your changes, and commit them in small, focused commits with clear messages. A good commit message has a short summary in the imperative mood ('Fix typo in README') and, when needed, a body explaining why. Small commits matter because reviewers review commit by commit, and a single giant commit hides the change's shape. Before pushing, sync with upstream and rebase your branch so your commits sit cleanly on top of the latest main.",
            "syntax": "branch per change; small focused commits; imperative messages; rebase on latest main",
            "analogy": "A branch is like a draft of an essay: you write in the draft, polish it in small edits, and only hand in the clean final version — never the scribbled notebook.",
            "exampleCode": "git init -q repo && cd repo && git config user.email \"a@b.c\" && git config user.name \"Ada\"\necho \"hello\" > file.txt && git add . && git commit -qm \"Add greeting file\"\ngit log --oneline",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where branches and commits does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Committing unrelated changes together in one giant commit.",
              "Writing vague commit messages like 'fix stuff'.",
              "Branching from a stale main and merging in old conflicts."
            ],
            "debugging": {
              "prompt": "This branch contains three unrelated changes in one commit. What is wrong?",
              "buggyCode": "echo \"One commit: typo fix + new feature + refactor\"",
              "fixedCode": "echo \"Three commits: typo fix, new feature, refactor\"",
              "explanation": "Unrelated changes in one commit cannot be reviewed or reverted separately — split them into focused commits."
            },
            "miniChallenge": "Extend the exercise: apply branches and commits to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "One branch per change, small focused commits with imperative messages, and rebase onto the latest main before pushing — reviewers review commit by commit.",
            "quiz": [
              {
                "question": "What makes a good commit message?",
                "options": [
                  "A long essay",
                  "A short imperative summary ('Fix typo') with a why in the body when needed",
                  "A random string",
                  "The date"
                ],
                "answer": 1,
                "explanation": "Imperative summaries read as instructions ('Fix typo') and make history scannable."
              },
              {
                "question": "Why keep commits small and focused?",
                "options": [
                  "To use more disk",
                  "Reviewers review commit by commit, and small commits show the change's shape",
                  "To slow down",
                  "It is not important"
                ],
                "answer": 1,
                "explanation": "Small commits are reviewable; one giant commit hides what changed and why."
              }
            ],
            "exercise": {
              "title": "Commit on a branch",
              "type": "write-code",
              "instructions": "Write a script that initialises a repo, configures a local user, creates a branch called fix/typo, commits a file on it, and prints exactly: COMMIT_OK if the commit exists.",
              "starterCode": "git init -q repo && cd repo && git config user.email \"a@b.c\" && git config user.name \"Ada\"\ngit checkout -qb fix/typo\necho \"hello\" > file.txt && git add . && git commit -qm \"Fix typo\"\ngit log --oneline | grep -q \"Fix typo\" && echo \"COMMIT_OK\"",
              "solution": "git init -q repo && cd repo && git config user.email \"a@b.c\" && git config user.name \"Ada\"\ngit checkout -qb fix/typo\necho \"hello\" > file.txt && git add . && git commit -qm \"Fix typo\"\ngit log --oneline | grep -q \"Fix typo\" && echo \"COMMIT_OK\"",
              "solutionExplanation": "Initialise the repo, create the branch, add and commit the file, then grep the log for the message.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Commit exists",
                  "expectedContains": "COMMIT_OK",
                  "hidden": false
                },
                {
                  "name": "Commit exists again",
                  "expectedContains": "COMMIT_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A branch holds one change; a commit records it with a clear message.",
                "approach": "Use git checkout -b for the branch, git add and commit for the change, git log to verify.",
                "structure": "Structure: init, configure, branch, commit, verify with grep."
              },
              "id": "open-source-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "open-source-m3",
        "title": "Contributing",
        "description": "Writing pull requests and handling code review.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "open-source-m3-l1",
            "slug": "open-source-m3-l1",
            "title": "Writing a Good Pull Request",
            "objectives": [
              "Explain what writing a good pull request means and where it appears in real systems",
              "Apply writing a good pull request to a small realistic problem",
              "Recognise the common mistakes people make with writing a good pull request"
            ],
            "introduction": "This lesson introduces writing a good pull request. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A pull request is a proposal, and a good one makes the reviewer's job easy: a clear title, a description of what changed and why, a link to the issue it closes, and notes on how it was tested. The diff should be as small as the change allows — reviewers trust a 50-line PR and dread a 5,000-line one — and the CI checks must be green before anyone is asked to review. Respond to the PR template the project provides; it exists because maintainers are tired of guessing what a PR does. A PR that is easy to review gets merged quickly; a PR that is hard to review waits.",
            "syntax": "small diff, clear title, what + why + tests, green CI, link the issue",
            "analogy": "A pull request is like a job application: a clear cover letter (description), a tidy CV (small diff), and references (tests and CI) get you the interview; a messy pile gets ignored.",
            "exampleCode": "echo \"Title: Fix typo in README\"\necho \"Closes #42\"\necho \"What: corrects a spelling error\"\necho \"Tested: docs build passes, CI green\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Start by naming the problem writing a good pull request solves in plain words.",
              "Follow the example step by step and note where writing a good pull request changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Opening a PR with a huge diff and no description.",
              "Asking for review while CI is red.",
              "Forgetting to link the issue the PR closes."
            ],
            "debugging": {
              "prompt": "This PR has no description, no linked issue, and red CI. What is wrong?",
              "buggyCode": "echo \"PR: 2000 lines, no description, CI failing\"",
              "fixedCode": "echo \"PR: 50 lines, description, closes #42, CI green\"",
              "explanation": "The reviewer cannot tell what it does, why, or whether it works — a PR must explain itself and be green before review."
            },
            "miniChallenge": "Extend the exercise: apply writing a good pull request to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A good PR is small, described (what, why, issue, tests), and green in CI — easy to review means quick to merge.",
            "quiz": [
              {
                "question": "What should a PR description contain?",
                "options": [
                  "Only the title",
                  "What changed, why, the linked issue, and how it was tested",
                  "The author's biography",
                  "A copy of the code"
                ],
                "answer": 1,
                "explanation": "The description answers the reviewer's first questions: what, why, which issue, and how it was verified."
              },
              {
                "question": "Why keep a PR small?",
                "options": [
                  "To save disk space",
                  "Reviewers trust and merge small diffs quickly; huge ones wait",
                  "Small PRs are faster to write",
                  "It is a rule"
                ],
                "answer": 1,
                "explanation": "A small diff is reviewable in one sitting; a huge one is intimidating and gets delayed."
              }
            ],
            "exercise": {
              "title": "Verify a clean diff",
              "type": "write-code",
              "instructions": "Write a script that initialises a repo, commits a file, adds one new line to it, and prints exactly: DIFF_OK if git diff shows the new line.",
              "starterCode": "git init -q repo && cd repo && git config user.email \"a@b.c\" && git config user.name \"Ada\"\necho \"line one\" > file.txt && git add . && git commit -qm \"Add file\"\necho \"line two\" >> file.txt\ngit diff | grep -q \"line two\" && echo \"DIFF_OK\"",
              "solution": "git init -q repo && cd repo && git config user.email \"a@b.c\" && git config user.name \"Ada\"\necho \"line one\" > file.txt && git add . && git commit -qm \"Add file\"\necho \"line two\" >> file.txt\ngit diff | grep -q \"line two\" && echo \"DIFF_OK\"",
              "solutionExplanation": "Commit the file first, then modify it; git diff shows the uncommitted change, which grep can verify.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Diff shows the change",
                  "expectedContains": "DIFF_OK",
                  "hidden": false
                },
                {
                  "name": "Diff shows the change again",
                  "expectedContains": "DIFF_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A PR is a diff — the change between the branch and main.",
                "approach": "Commit the base, modify the file, then grep git diff for the new line.",
                "structure": "Structure: init, commit, modify, verify the diff."
              },
              "id": "open-source-m3-l1-e1"
            }
          },
          {
            "id": "open-source-m3-l2",
            "slug": "open-source-m3-l2",
            "title": "Code Review Etiquette",
            "objectives": [
              "Explain what code review etiquette means and where it appears in real systems",
              "Apply code review etiquette to a small realistic problem",
              "Recognise the common mistakes people make with code review etiquette"
            ],
            "introduction": "Here you will get hands-on with code review etiquette: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Code review is a conversation, not a verdict: as an author, respond to every comment, explain your reasoning where you disagree, and thank reviewers for their time — they are volunteering it. As a reviewer, comment on the code, not the person; ask questions instead of giving orders ('Would it be clearer to...?'); and separate blocking issues from nits so the author knows what must change. The goal is shared ownership of the code, and the fastest way to get a PR merged is to make the reviewer's job pleasant: small PRs, quick responses, and a visible willingness to improve. Everyone remembers how a review felt, long after the code is forgotten.",
            "syntax": "author: respond to all, explain disagreements kindly; reviewer: comment on code, ask, separate blocking from nits",
            "analogy": "Code review is like an editor working with a writer: the editor's job is to make the book better, not to prove the writer wrong — and the writer's job is to listen.",
            "exampleCode": "echo \"Author: respond to every comment, thank reviewers\"\necho \"Reviewer: comment on the code, ask questions, separate blocking from nits\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where code review etiquette does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Reviewing the person instead of the code.",
              "Leaving comments unanswered so the reviewer does not know what happened.",
              "Treating every nit as a blocking issue (or vice versa)."
            ],
            "debugging": {
              "prompt": "This review comment attacks the author, not the code. What is wrong?",
              "buggyCode": "echo \"Review: This code is stupid.\"",
              "fixedCode": "echo \"Review: Would it be clearer to extract this into a helper?\"",
              "explanation": "Reviews must comment on the code, phrased as a question or suggestion — never on the person."
            },
            "miniChallenge": "Extend the exercise: apply code review etiquette to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Code review is a conversation: authors respond to every comment, reviewers ask questions about the code, and blocking issues are separated from nits.",
            "quiz": [
              {
                "question": "As a reviewer, how should you phrase a suggestion?",
                "options": [
                  "As an order",
                  "As a question — 'Would it be clearer to...?'",
                  "As an insult",
                  "You should not suggest anything"
                ],
                "answer": 1,
                "explanation": "Questions invite discussion; orders invite defensiveness. The code is the subject, never the person."
              },
              {
                "question": "What should an author do with review comments?",
                "options": [
                  "Ignore them",
                  "Respond to every one, explaining reasoning where they disagree",
                  "Delete the PR",
                  "Argue about all of them"
                ],
                "answer": 1,
                "explanation": "Responding to every comment — even to disagree politely — shows the review was read and respected."
              }
            ],
            "exercise": {
              "title": "Count review comments addressed",
              "type": "write-code",
              "instructions": "Write a script that creates a file review.txt with two lines 'blocking: fixed' and 'nit: fixed', then prints exactly: REVIEW_OK if both lines contain 'fixed'.",
              "starterCode": "printf \"blocking: fixed\\nnit: fixed\\n\" > review.txt\ngrep -q \"blocking: fixed\" review.txt && grep -q \"nit: fixed\" review.txt && echo \"REVIEW_OK\"",
              "solution": "printf \"blocking: fixed\\nnit: fixed\\n\" > review.txt\ngrep -q \"blocking: fixed\" review.txt && grep -q \"nit: fixed\" review.txt && echo \"REVIEW_OK\"",
              "solutionExplanation": "Write the two comment lines, then grep for each 'fixed' marker before printing the result.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Review addressed",
                  "expectedContains": "REVIEW_OK",
                  "hidden": false
                },
                {
                  "name": "Review addressed again",
                  "expectedContains": "REVIEW_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Every review comment deserves a response — track them until each is addressed.",
                "approach": "Use printf to write both lines, then grep -q for each marker.",
                "structure": "Structure: write the file, check both lines, print the marker."
              },
              "id": "open-source-m3-l2-e1"
            }
          }
        ]
      },
      {
        "id": "open-source-m4",
        "title": "Maintainers",
        "description": "Issue triage and maintaining a project.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "open-source-m4-l1",
            "slug": "open-source-m4-l1",
            "title": "Issue Triage",
            "objectives": [
              "Explain what issue triage means and where it appears in real systems",
              "Apply issue triage to a small realistic problem",
              "Recognise the common mistakes people make with issue triage"
            ],
            "introduction": "Here you will get hands-on with issue triage: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Issue triage is the maintainer's inbox zero: every new issue gets read, labelled, and routed — is it a bug, a feature request, or a question? Can it be reproduced? Is it a duplicate? Good triage asks for a minimal reproduction and the version number before anything else, because most reports are missing exactly those two facts. Labels are the triage system: bug, enhancement, good-first-issue, help-wanted, and wontfix each tell contributors what to do next. Triage is also where maintainers say no kindly: closing an issue that does not fit the project, with a clear reason and a pointer elsewhere, is a service, not a rejection.",
            "syntax": "read -> label -> reproduce? -> duplicate? -> route or close kindly",
            "analogy": "Issue triage is like a hospital reception: every patient is seen, assessed, and sent to the right department — or politely told this is the wrong hospital.",
            "exampleCode": "echo \"Labels: bug, enhancement, good-first-issue, help-wanted, wontfix\"\necho \"Ask first: minimal reproduction? version number? duplicate?\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where issue triage does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Investigating a report with no reproduction and no version.",
              "Leaving issues unlabelled so nobody knows what to do with them.",
              "Closing issues rudely instead of explaining why."
            ],
            "debugging": {
              "prompt": "This issue report has no version and no reproduction steps. What should triage do?",
              "buggyCode": "echo \"Issue: it is broken\"",
              "fixedCode": "echo \"Issue: version 2.1, steps to reproduce: 1... 2... 3...\"",
              "explanation": "Ask for the missing facts — a minimal reproduction and the version — before investigating, or the report cannot be acted on."
            },
            "miniChallenge": "Extend the exercise: apply issue triage to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Triage reads, labels, and routes every issue: ask for a reproduction and version, check for duplicates, and close kindly when something does not fit.",
            "quiz": [
              {
                "question": "What should triage ask for first?",
                "options": [
                  "The reporter's name",
                  "A minimal reproduction and the version number",
                  "A pull request",
                  "A donation"
                ],
                "answer": 1,
                "explanation": "Most reports lack a reproduction and a version — without them, the bug cannot be investigated."
              },
              {
                "question": "What does the 'good-first-issue' label do?",
                "options": [
                  "It marks easy bugs nobody wants",
                  "It tells newcomers which issues are suitable first contributions",
                  "It closes the issue",
                  "It marks paid work"
                ],
                "answer": 1,
                "explanation": "The label routes newcomers to approachable work and grows the contributor base."
              }
            ],
            "exercise": {
              "title": "Label an issue",
              "type": "write-code",
              "instructions": "Write a script that creates issue.txt containing 'type: bug' and prints exactly: TRIAGE_OK if the file contains 'type: bug'.",
              "starterCode": "echo \"type: bug\" > issue.txt\ngrep -q \"type: bug\" issue.txt && echo \"TRIAGE_OK\"",
              "solution": "echo \"type: bug\" > issue.txt\ngrep -q \"type: bug\" issue.txt && echo \"TRIAGE_OK\"",
              "solutionExplanation": "Write the label into the file, then grep to confirm the triage label is recorded.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Issue labelled",
                  "expectedContains": "TRIAGE_OK",
                  "hidden": false
                },
                {
                  "name": "Issue labelled again",
                  "expectedContains": "TRIAGE_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Triage starts with a label — the first fact that routes the issue.",
                "approach": "Write the label with echo, then grep -q to verify it.",
                "structure": "Structure: write the file, check the label, print the marker."
              },
              "id": "open-source-m4-l1-e1"
            }
          },
          {
            "id": "open-source-m4-l2",
            "slug": "open-source-m4-l2",
            "title": "Maintaining a Project",
            "objectives": [
              "Explain what maintaining a project means and where it appears in real systems",
              "Apply maintaining a project to a small realistic problem",
              "Recognise the common mistakes people make with maintaining a project"
            ],
            "introduction": "In this lesson you will see maintaining a project in action, work through a guided example, and practise it yourself.",
            "concept": "Maintaining a project is mostly not writing code: it is reviewing PRs, triaging issues, cutting releases, and keeping the project welcoming. Releases need a rhythm — semantic versioning (major.minor.patch) tells users what changed, and a changelog tells them why it matters. Saying no is a maintainer skill: every feature request adds permanent maintenance cost, so the default answer to a niche request is a polite no or a pointer to a plugin. Burnout is the real risk, so healthy projects share the load — multiple maintainers, clear contribution guides, and automation (CI, bots) for the repetitive parts.",
            "syntax": "semver: major.minor.patch; changelog; say no kindly; share the load",
            "analogy": "Maintaining a project is like running a public park: most of the work is mowing, emptying bins, and keeping the gates open — not planting new trees every day.",
            "exampleCode": "echo \"Version 2.1.0: major=breaking, minor=feature, patch=fix\"\necho \"Changelog: what changed and why it matters\"\necho \"Share the load: co-maintainers, guides, automation\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Read the example and trace how maintaining a project is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Being the only maintainer with no succession plan.",
              "Bumping versions randomly instead of following semver.",
              "Accepting every feature request and drowning in maintenance."
            ],
            "debugging": {
              "prompt": "This project has one maintainer, no changelog, and random version numbers. What is the risk?",
              "buggyCode": "echo \"One maintainer, no changelog, versions 1, 7, 3\"",
              "fixedCode": "echo \"Co-maintainers, changelog, semver 2.1.0\"",
              "explanation": "A single maintainer is a bus factor of one, and users cannot tell what changed — share the load and version honestly."
            },
            "miniChallenge": "Extend the exercise: apply maintaining a project to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Maintaining means releases with semver and a changelog, kind noes to niche features, and sharing the load so the project survives its maintainer's bad week.",
            "quiz": [
              {
                "question": "What does a minor version bump mean in semantic versioning?",
                "options": [
                  "A breaking change",
                  "A new feature, backwards compatible",
                  "A bug fix only",
                  "A rewrite"
                ],
                "answer": 1,
                "explanation": "Minor means new functionality that does not break existing users; major means breaking, patch means a fix."
              },
              {
                "question": "Why do maintainers say no to feature requests?",
                "options": [
                  "They are lazy",
                  "Every feature adds permanent maintenance cost",
                  "Features are banned",
                  "Users should fork"
                ],
                "answer": 1,
                "explanation": "Each accepted feature must be maintained forever, so the default for niche requests is a polite no."
              }
            ],
            "exercise": {
              "title": "Write a changelog entry",
              "type": "write-code",
              "instructions": "Write a script that creates CHANGELOG.md with the line '## 1.1.0 - Added search' and prints exactly: CHANGELOG_OK if the file contains '1.1.0'.",
              "starterCode": "echo \"## 1.1.0 - Added search\" > CHANGELOG.md\ngrep -q \"1.1.0\" CHANGELOG.md && echo \"CHANGELOG_OK\"",
              "solution": "echo \"## 1.1.0 - Added search\" > CHANGELOG.md\ngrep -q \"1.1.0\" CHANGELOG.md && echo \"CHANGELOG_OK\"",
              "solutionExplanation": "Write the versioned changelog line, then grep to confirm the version is recorded.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Changelog written",
                  "expectedContains": "CHANGELOG_OK",
                  "hidden": false
                },
                {
                  "name": "Changelog written again",
                  "expectedContains": "CHANGELOG_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A changelog tells users what changed in each release, in version order.",
                "approach": "Use echo to write the version line, then grep -q for the version.",
                "structure": "Structure: write the file, check the version, print the marker."
              },
              "id": "open-source-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "open-source-m5",
        "title": "Community",
        "description": "Licensing, governance, and building a reputation.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "open-source-m5-l1",
            "slug": "open-source-m5-l1",
            "title": "Licensing and Governance",
            "objectives": [
              "Explain what licensing and governance means and where it appears in real systems",
              "Apply licensing and governance to a small realistic problem",
              "Recognise the common mistakes people make with licensing and governance"
            ],
            "introduction": "In this lesson you will see licensing and governance in action, work through a guided example, and practise it yourself.",
            "concept": "A license is what makes code open source: without one, the code is copyrighted by default and nobody may legally use it. Permissive licenses (MIT, Apache) let anyone do almost anything, including building closed products on top; copyleft licenses (GPL) require derivatives to stay open too. Governance is how decisions get made: a single maintainer (benevolent dictator), a core team, or a foundation, with written rules about who can merge and how disputes are resolved. As a contributor, the practical rules are simple: respect the license, do not relicense other people's code, and follow the project's decision process instead of going around it.",
            "syntax": "no license = no permission; permissive (MIT) vs copyleft (GPL); governance = who decides",
            "analogy": "A license is like the deed to a house: it says who owns it and what guests may do — without a deed, nobody can legally move in.",
            "exampleCode": "echo \"No license: copyrighted by default, nobody may use it\"\necho \"MIT/Apache: permissive, almost anything allowed\"\necho \"GPL: copyleft, derivatives stay open\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Read the example and trace how licensing and governance is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Assuming code without a license is free to use.",
              "Mixing GPL code into a permissively licensed project.",
              "Ignoring the project's governance and going around the maintainers."
            ],
            "debugging": {
              "prompt": "This contributor copied GPL code into an MIT project. What is wrong?",
              "buggyCode": "echo \"Copied GPL code into an MIT project\"",
              "fixedCode": "echo \"Checked the license first; kept GPL code in a GPL project\"",
              "explanation": "GPL code requires derivatives to stay open, so it cannot be folded into a permissively licensed project without violating the GPL."
            },
            "miniChallenge": "Extend the exercise: apply licensing and governance to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Without a license, code is copyrighted by default; MIT is permissive, GPL is copyleft, and governance is the written process for who decides what.",
            "quiz": [
              {
                "question": "What happens if a project has no license?",
                "options": [
                  "It is public domain",
                  "It is copyrighted by default and nobody may legally use it",
                  "Anyone can do anything",
                  "It is automatically MIT"
                ],
                "answer": 1,
                "explanation": "No license means default copyright: no permission is granted to use, modify, or share the code."
              },
              {
                "question": "What is the difference between MIT and GPL?",
                "options": [
                  "There is none",
                  "MIT is permissive; GPL is copyleft and requires derivatives to stay open",
                  "MIT is for companies only",
                  "GPL is permissive"
                ],
                "answer": 1,
                "explanation": "MIT allows almost anything including closed derivatives; GPL requires derivatives to remain open source."
              }
            ],
            "exercise": {
              "title": "Add a license file",
              "type": "write-code",
              "instructions": "Write a script that creates a LICENSE file containing the line 'MIT License' and prints exactly: LICENSE_OK if the file contains 'MIT License'.",
              "starterCode": "echo \"MIT License\" > LICENSE\ngrep -q \"MIT License\" LICENSE && echo \"LICENSE_OK\"",
              "solution": "echo \"MIT License\" > LICENSE\ngrep -q \"MIT License\" LICENSE && echo \"LICENSE_OK\"",
              "solutionExplanation": "Write the license name into the LICENSE file, then grep to confirm it is there.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "License added",
                  "expectedContains": "LICENSE_OK",
                  "hidden": false
                },
                {
                  "name": "License added again",
                  "expectedContains": "LICENSE_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Every open source project needs a LICENSE file stating its terms.",
                "approach": "Use echo to write the license line, then grep -q to verify.",
                "structure": "Structure: write the file, check the contents, print the marker."
              },
              "id": "open-source-m5-l1-e1"
            }
          },
          {
            "id": "open-source-m5-l2",
            "slug": "open-source-m5-l2",
            "title": "Building Your Reputation",
            "objectives": [
              "Explain what building your reputation means and where it appears in real systems",
              "Apply building your reputation to a small realistic problem",
              "Recognise the common mistakes people make with building your reputation"
            ],
            "introduction": "In this lesson you will see building your reputation in action, work through a guided example, and practise it yourself.",
            "concept": "A reputation in open source is built the same way as anywhere else: by showing up, doing good work, and being easy to work with. Consistent small contributions beat one dramatic PR; helping in issues and reviewing others' code counts as much as writing features; and the way you handle disagreement is remembered far longer than any single commit. Over time, trust compounds: maintainers invite reliable contributors to review, then to triage, then to maintain. The career payoff is real — public work is a portfolio that hiring managers can actually read — but the reputation has to be earned in public, one merged PR at a time.",
            "syntax": "show up, small consistent contributions, help others, handle disagreement well",
            "analogy": "Reputation in open source is like a credit score: it is built slowly by many small reliable payments, and one careless default can damage it for years.",
            "exampleCode": "echo \"Small consistent PRs beat one dramatic PR\"\necho \"Reviewing and helping in issues counts too\"\necho \"Trust compounds: contributor -> reviewer -> maintainer\"",
            "exampleLanguage": "bash",
            "walkthrough": [
              "Read the example and trace how building your reputation is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Trying to build a reputation with one dramatic PR.",
              "Arguing aggressively in issues and burning trust.",
              "Contributing only for the CV and disappearing afterwards."
            ],
            "debugging": {
              "prompt": "This contributor argues aggressively in every issue and wonders why nobody merges their PRs. What is wrong?",
              "buggyCode": "echo \"Aggressive in issues, PRs ignored\"",
              "fixedCode": "echo \"Helpful in issues, small clean PRs, PRs merged\"",
              "explanation": "How you handle disagreement is remembered longer than any commit — a difficult reputation makes maintainers avoid your work."
            },
            "miniChallenge": "Extend the exercise: apply building your reputation to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Reputation compounds from small, consistent, helpful contributions — and public work is a portfolio that hiring managers can read and verify.",
            "quiz": [
              {
                "question": "What builds an open source reputation fastest?",
                "options": [
                  "One huge PR",
                  "Consistent small contributions and helping others, over time",
                  "Arguing in issues",
                  "Forking many projects"
                ],
                "answer": 1,
                "explanation": "Reliability compounds: small merged contributions plus helpful reviews build trust faster than one big splash."
              },
              {
                "question": "Why is public open source work valuable for a career?",
                "options": [
                  "It is required",
                  "It is a portfolio hiring managers can actually read and verify",
                  "It pays well",
                  "It replaces a CV"
                ],
                "answer": 1,
                "explanation": "Public contributions are verifiable evidence of skill, communication, and follow-through."
              }
            ],
            "exercise": {
              "title": "List your contributions",
              "type": "write-code",
              "instructions": "Write a script that creates a file contributions.txt with three lines (one per contribution) and prints exactly: CONTRIBUTIONS_OK if the file has 3 lines.",
              "starterCode": "printf \"fix typo\\nadd test\\nimprove docs\\n\" > contributions.txt\ntest \"$(wc -l < contributions.txt)\" = \"3\" && echo \"CONTRIBUTIONS_OK\"",
              "solution": "printf \"fix typo\\nadd test\\nimprove docs\\n\" > contributions.txt\ntest \"$(wc -l < contributions.txt)\" = \"3\" && echo \"CONTRIBUTIONS_OK\"",
              "solutionExplanation": "Write three contribution lines, count them with wc -l, and print the marker when the count is 3.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Contributions listed",
                  "expectedContains": "CONTRIBUTIONS_OK",
                  "hidden": false
                },
                {
                  "name": "Contributions listed again",
                  "expectedContains": "CONTRIBUTIONS_OK",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A reputation is a record of contributions — keep the list visible and growing.",
                "approach": "Use printf for the three lines, then wc -l to count them.",
                "structure": "Structure: write the file, count the lines, print the marker."
              },
              "id": "open-source-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "freelancing-career",
    "slug": "freelancing-career",
    "language": "python",
    "category": "cs-career",
    "title": "Freelancing & Career",
    "description": "Build a freelance career: finding clients, pricing, contracts, delivering work, handling difficult clients, and growing from freelancer to agency.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Finding clients",
      "Pricing",
      "Contracts",
      "Project management",
      "Client relations",
      "Portfolio",
      "Personal branding",
      "Freelance finances"
    ],
    "prerequisites": [
      "Basic Python programming"
    ],
    "modules": [
      {
        "id": "freelancing-career-m1",
        "title": "Freelancing Basics",
        "description": "Is freelancing right for you, and how to find a first client.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "freelancing-career-m1-l1",
            "slug": "freelancing-career-m1-l1",
            "title": "Is Freelancing Right for You",
            "objectives": [
              "Explain what is freelancing right for you means and where it appears in real systems",
              "Apply is freelancing right for you to a small realistic problem",
              "Recognise the common mistakes people make with is freelancing right for you"
            ],
            "introduction": "In this lesson you will see is freelancing right for you in action, work through a guided example, and practise it yourself.",
            "concept": "Freelancing trades a salary's predictability for freedom and upside: you choose your clients, set your rates, and keep the profit — but you also find the work, chase the invoices, and cover the dry months yourself. It suits people who are self-directed, comfortable with uncertainty, and good at selling their own work; it punishes people who need structure handed to them. The honest test is financial: can you cover three to six months of expenses before the first invoice lands, and can you survive a client disappearing? If the answer is yes and the freedom excites you more than it frightens you, freelancing is worth trying — ideally as a side project first, while the salary still pays the rent.",
            "syntax": "freedom + upside vs uncertainty + self-management; 3-6 months runway",
            "analogy": "Freelancing is like running your own food truck instead of working in a restaurant: you pick the menu and keep the takings, but you also find the pitch, fix the engine, and survive the rainy weeks.",
            "exampleCode": "print(\"Freelancing: freedom, upside, and all the risk\")\nprint(\"Needs: self-direction, sales, a 3-6 month runway\")\nprint(\"Try it as a side project first.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how is freelancing right for you is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Quitting with no savings and no client pipeline.",
              "Assuming freedom means no structure — freelancing needs more discipline, not less.",
              "Pricing by what feels right instead of by costs and market rates."
            ],
            "debugging": {
              "prompt": "This plan quits the job with no savings and no clients. What is wrong?",
              "buggyCode": "print(\"Quit today, no savings, no clients\")",
              "fixedCode": "print(\"Build a runway, find clients on the side, then quit\")",
              "explanation": "Without a runway or a pipeline, the first dry month becomes a crisis — freelancing needs savings and clients before the leap."
            },
            "miniChallenge": "Extend the exercise: apply is freelancing right for you to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Freelancing trades predictability for freedom and upside; it needs self-direction, sales ability, and a 3-6 month runway — best tested as a side project first.",
            "quiz": [
              {
                "question": "What is the honest financial test for freelancing?",
                "options": [
                  "Do you own a laptop?",
                  "Can you cover 3-6 months of expenses before the first invoice lands?",
                  "Do you have a degree?",
                  "Can you work from home?"
                ],
                "answer": 1,
                "explanation": "A runway of several months absorbs the gap between starting and getting paid."
              },
              {
                "question": "Why try freelancing as a side project first?",
                "options": [
                  "It is required by law",
                  "The salary still pays the rent while you test whether it suits you",
                  "Clients prefer it",
                  "It is faster"
                ],
                "answer": 1,
                "explanation": "A side project lets you test the lifestyle and build a client base without betting your income on it."
              }
            ],
            "exercise": {
              "title": "Check your runway",
              "type": "write-code",
              "instructions": "Write a program that reads savings and monthly expenses, then prints exactly: Runway: <n> months. Runway = savings // expenses.",
              "starterCode": "savings = int(input())\nexpenses = int(input())\nprint(f\"Runway: {savings // expenses} months\")",
              "solution": "savings = int(input())\nexpenses = int(input())\nprint(f\"Runway: {savings // expenses} months\")",
              "solutionExplanation": "Divide savings by monthly expenses (integer division) to get the months you can survive without income.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "12000 savings, 2000/month",
                  "hidden": false,
                  "stdin": "12000\n2000\n",
                  "expectedStdout": "Runway: 6 months"
                },
                {
                  "name": "5000 savings, 2000/month",
                  "hidden": true,
                  "stdin": "5000\n2000\n",
                  "expectedStdout": "Runway: 2 months"
                }
              ],
              "hintNotes": {
                "concept": "Your runway is savings divided by what you spend each month.",
                "approach": "Use integer division // and print the result with the label.",
                "structure": "Structure: read two numbers, then one print with the runway."
              },
              "id": "freelancing-career-m1-l1-e1"
            }
          },
          {
            "id": "freelancing-career-m1-l2",
            "slug": "freelancing-career-m1-l2",
            "title": "Finding Your First Client",
            "objectives": [
              "Explain what finding your first client means and where it appears in real systems",
              "Apply finding your first client to a small realistic problem",
              "Recognise the common mistakes people make with finding your first client"
            ],
            "introduction": "This lesson introduces finding your first client. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "The first client is the hardest because you have no track record, so the strategy is to borrow trust: former colleagues, your existing network, and small jobs on platforms where reviews accumulate. A good first-client pitch is specific — it names the client's problem, the outcome you will deliver, and the price — instead of a generic 'I am a developer, hire me'. Warm outreach beats cold outreach by an order of magnitude: a message to someone who knows your work converts far better than a hundred cold emails. And the first client is worth more than the fee — a testimonial and a referral from them is what brings the second and third.",
            "syntax": "borrow trust: network, former colleagues, small platform jobs; pitch the outcome",
            "analogy": "Finding a first client is like getting a first job: nobody hires a stranger on a CV alone — a recommendation from someone they trust opens the door.",
            "exampleCode": "print(\"Borrow trust: network, ex-colleagues, small platform jobs\")\nprint(\"Pitch the outcome, not yourself\")\nprint(\"First client = fee + testimonial + referral\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem finding your first client solves in plain words.",
              "Follow the example step by step and note where finding your first client changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Sending a hundred cold emails instead of ten warm messages.",
              "Pitching yourself instead of the client's outcome.",
              "Underpricing the first job so much it sets a bad precedent."
            ],
            "debugging": {
              "prompt": "This pitch says 'I am a developer, hire me.' What is wrong?",
              "buggyCode": "print(\"I am a developer, hire me.\")",
              "fixedCode": "print(\"I can rebuild your checkout to cut abandoned carts — fixed price, two weeks.\")",
              "explanation": "The pitch is generic; a good pitch names the client's problem, the outcome, and the price."
            },
            "miniChallenge": "Extend the exercise: apply finding your first client to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "First clients come from borrowed trust — your network, former colleagues, small platform jobs — with a pitch that names the problem, the outcome, and the price.",
            "quiz": [
              {
                "question": "Why is warm outreach better than cold outreach?",
                "options": [
                  "It is cheaper",
                  "A message to someone who knows your work converts far better than cold emails",
                  "It is faster to write",
                  "Cold outreach is illegal"
                ],
                "answer": 1,
                "explanation": "Trust is the bottleneck for a first client, and warm contacts already have it."
              },
              {
                "question": "What is a first client worth beyond the fee?",
                "options": [
                  "Nothing",
                  "A testimonial and a referral that bring the next clients",
                  "A free laptop",
                  "A tax deduction"
                ],
                "answer": 1,
                "explanation": "The testimonial and referral from the first client are what make the second and third possible."
              }
            ],
            "exercise": {
              "title": "Pick the better pitch",
              "type": "multiple-choice",
              "instructions": "Which pitch is most likely to win a first client?",
              "starterCode": "",
              "solution": "I can rebuild your checkout to cut abandoned carts — fixed price, two weeks",
              "solutionExplanation": "A specific pitch names the problem, the outcome, and the price. A generic 'hire me' gives the client nothing to say yes to.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "A pitch must name the client's problem and the outcome you deliver.",
                "approach": "Look for the option with a specific problem, outcome, and price.",
                "structure": "Structure: problem + outcome + price beats a generic introduction."
              },
              "options": [
                "I am a developer, hire me",
                "I can rebuild your checkout to cut abandoned carts — fixed price, two weeks",
                "I know many languages",
                "I am available immediately"
              ],
              "answerIndex": 1,
              "id": "freelancing-career-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "freelancing-career-m2",
        "title": "Pricing and Contracts",
        "description": "How to price your work and protect it with contracts.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "freelancing-career-m2-l1",
            "slug": "freelancing-career-m2-l1",
            "title": "Pricing Your Work",
            "objectives": [
              "Explain what pricing your work means and where it appears in real systems",
              "Apply pricing your work to a small realistic problem",
              "Recognise the common mistakes people make with pricing your work"
            ],
            "introduction": "This lesson introduces pricing your work. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Pricing is where most freelancers lose money, because they price by the hour and then work slowly, or they price by guessing. The three honest methods are cost-plus (your costs divided by billable hours, plus margin), market rate (what others with your skills charge), and value-based (a share of the value you create — a checkout fix worth $50k a month is not a $500 job). Value-based pricing pays best but needs confidence and proof; hourly is simplest but caps your income at your hours; project pricing sits in between. Whatever you choose, raise your rates regularly: every project that books easily is a signal you are too cheap.",
            "syntax": "cost-plus, market rate, value-based; hourly caps income at hours",
            "analogy": "Pricing is like selling a painting: by the hour you are paid for the brushstrokes, by value you are paid for what the painting is worth to the buyer.",
            "exampleCode": "print(\"Cost-plus: costs / billable hours + margin\")\nprint(\"Market: what peers charge\")\nprint(\"Value-based: a share of the value created\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem pricing your work solves in plain words.",
              "Follow the example step by step and note where pricing your work changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Pricing by guessing instead of by costs, market, or value.",
              "Charging hourly and being punished for working efficiently.",
              "Never raising rates even when every project books easily."
            ],
            "debugging": {
              "prompt": "This freelancer charges by the hour and works slowly to earn more. What is wrong?",
              "buggyCode": "print(\"Hourly rate, slow work, more hours, more pay\")",
              "fixedCode": "print(\"Project price for the outcome, fast work, same pay\")",
              "explanation": "Hourly pricing rewards slowness and punishes efficiency — the incentive points the wrong way."
            },
            "miniChallenge": "Extend the exercise: apply pricing your work to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Price by cost-plus, market rate, or value — hourly caps income at your hours, value-based pricing pays for the outcome, and rates should rise as demand grows.",
            "quiz": [
              {
                "question": "Why does hourly pricing cap your income?",
                "options": [
                  "It is illegal",
                  "You can only sell as many hours as you have",
                  "Clients hate it",
                  "It is hard to calculate"
                ],
                "answer": 1,
                "explanation": "Hourly income is bounded by your time; value and project pricing decouple pay from hours."
              },
              {
                "question": "What is value-based pricing?",
                "options": [
                  "Charging by the hour",
                  "Charging a share of the value your work creates for the client",
                  "Charging the market rate",
                  "Charging whatever feels right"
                ],
                "answer": 1,
                "explanation": "Value-based pricing ties the fee to the outcome's worth — a fix worth $50k a month is not a $500 job."
              }
            ],
            "exercise": {
              "title": "Compute an hourly rate",
              "type": "write-code",
              "instructions": "Write a program that reads annual costs and billable hours per year, then prints exactly: Rate: <n> per hour. Rate = costs // hours.",
              "starterCode": "costs = int(input())\nhours = int(input())\nprint(f\"Rate: {costs // hours} per hour\")",
              "solution": "costs = int(input())\nhours = int(input())\nprint(f\"Rate: {costs // hours} per hour\")",
              "solutionExplanation": "Divide annual costs by billable hours to get the minimum hourly rate that covers them.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "60000 costs, 1000 hours",
                  "hidden": false,
                  "stdin": "60000\n1000\n",
                  "expectedStdout": "Rate: 60 per hour"
                },
                {
                  "name": "80000 costs, 800 hours",
                  "hidden": true,
                  "stdin": "80000\n800\n",
                  "expectedStdout": "Rate: 100 per hour"
                }
              ],
              "hintNotes": {
                "concept": "Your rate must cover your costs spread over the hours you can actually bill.",
                "approach": "Divide costs by hours with integer division.",
                "structure": "Structure: read two numbers, then one print with the rate."
              },
              "id": "freelancing-career-m2-l1-e1"
            }
          },
          {
            "id": "freelancing-career-m2-l2",
            "slug": "freelancing-career-m2-l2",
            "title": "Contracts and Scope",
            "objectives": [
              "Explain what contracts and scope means and where it appears in real systems",
              "Apply contracts and scope to a small realistic problem",
              "Recognise the common mistakes people make with contracts and scope"
            ],
            "introduction": "This lesson introduces contracts and scope. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A contract is not bureaucracy; it is the agreement that prevents the two most common freelance disasters — scope creep and non-payment. At minimum it should state the scope (what is included), the price and payment schedule (with a deposit upfront), the timeline, who owns the work, and what happens when the client asks for more (it costs more, in writing). Scope creep is the slow expansion of 'just one more thing' until the project is unrecognisable; the defence is a written change process — every addition gets a price and a date before work starts. Never start work without a signed agreement and a deposit: the clients who resist a contract are the ones you need it for most.",
            "syntax": "scope + price + schedule + ownership + change process; deposit upfront",
            "analogy": "A contract is like a fence around a garden: it does not stop neighbours visiting, it just makes clear where your land ends and theirs begins.",
            "exampleCode": "print(\"Contract: scope, price, schedule, ownership, change process\")\nprint(\"Deposit upfront, before work starts\")\nprint(\"Scope creep: every addition gets a price and a date\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem contracts and scope solves in plain words.",
              "Follow the example step by step and note where contracts and scope changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Starting work without a signed contract or deposit.",
              "Accepting 'just one more thing' without a price or a date.",
              "Leaving ownership of the work unstated in the agreement."
            ],
            "debugging": {
              "prompt": "This freelancer started work with no contract and no deposit. What is the risk?",
              "buggyCode": "print(\"Started work, no contract, no deposit\")",
              "fixedCode": "print(\"Signed contract, deposit paid, then started\")",
              "explanation": "Without an agreement there is no scope, no payment schedule, and no protection when the client adds work or disappears."
            },
            "miniChallenge": "Extend the exercise: apply contracts and scope to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A contract states scope, price, schedule, ownership, and a change process — with a deposit upfront; every scope addition gets a price and a date in writing.",
            "quiz": [
              {
                "question": "What is scope creep?",
                "options": [
                  "The project finishing early",
                  "The slow expansion of 'just one more thing' until the project is unrecognisable",
                  "A type of contract",
                  "A payment method"
                ],
                "answer": 1,
                "explanation": "Scope creep is uncontrolled growth of requirements without matching time or pay."
              },
              {
                "question": "Why take a deposit before starting?",
                "options": [
                  "To buy equipment",
                  "It commits the client and protects you if they disappear",
                  "It is a tax requirement",
                  "To impress the client"
                ],
                "answer": 1,
                "explanation": "A deposit proves the client is serious and covers your early work if the project stalls."
              }
            ],
            "exercise": {
              "title": "Price a scope change",
              "type": "write-code",
              "instructions": "Write a program that reads the original price and an extra feature price, then prints exactly: New total: <n>.",
              "starterCode": "original = int(input())\nextra = int(input())\nprint(f\"New total: {original + extra}\")",
              "solution": "original = int(input())\nextra = int(input())\nprint(f\"New total: {original + extra}\")",
              "solutionExplanation": "A scope change adds its price to the original total — in writing, before the work starts.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "1000 + 250",
                  "hidden": false,
                  "stdin": "1000\n250\n",
                  "expectedStdout": "New total: 1250"
                },
                {
                  "name": "500 + 0",
                  "hidden": true,
                  "stdin": "500\n0\n",
                  "expectedStdout": "New total: 500"
                }
              ],
              "hintNotes": {
                "concept": "Every addition to scope gets a price — the new total is the old price plus the extra.",
                "approach": "Add the two prices and print the total.",
                "structure": "Structure: read two numbers, then one print with the sum."
              },
              "id": "freelancing-career-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "freelancing-career-m3",
        "title": "Delivery",
        "description": "Managing projects and clients, including difficult ones.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "freelancing-career-m3-l1",
            "slug": "freelancing-career-m3-l1",
            "title": "Managing Projects and Clients",
            "objectives": [
              "Explain what managing projects and clients means and where it appears in real systems",
              "Apply managing projects and clients to a small realistic problem",
              "Recognise the common mistakes people make with managing projects and clients"
            ],
            "introduction": "In this lesson you will see managing projects and clients in action, work through a guided example, and practise it yourself.",
            "concept": "Freelance delivery is project management without a manager: you set the milestones, you track the risks, and you communicate before problems become surprises. The rhythm that works is a short weekly update — what was done, what is next, what is blocked — which builds trust far more than a big reveal at the end. Milestones should be tied to payments, so a stalled project is also a visible one, and every decision should be confirmed in writing, because 'I thought you meant...' is the most expensive sentence in freelancing. The goal is that the client never has to ask for a status update, because you already sent one.",
            "syntax": "weekly updates, milestones tied to payments, decisions in writing",
            "analogy": "Managing a freelance project is like driving a taxi with a running commentary: the passenger relaxes when they always know where they are and what happens next.",
            "exampleCode": "print(\"Weekly update: done, next, blocked\")\nprint(\"Milestones tied to payments\")\nprint(\"Confirm every decision in writing\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how managing projects and clients is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Going silent until the work is done.",
              "Confirming decisions verbally and forgetting what was agreed.",
              "Letting a stalled project stay invisible by not tying it to milestones."
            ],
            "debugging": {
              "prompt": "This freelancer went silent for three weeks, then delivered everything at once. What is wrong?",
              "buggyCode": "print(\"Silent for 3 weeks, big reveal at the end\")",
              "fixedCode": "print(\"Weekly updates: done, next, blocked\")",
              "explanation": "Silence breeds anxiety and hides problems; weekly updates keep the client informed and the project on track."
            },
            "miniChallenge": "Extend the exercise: apply managing projects and clients to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Deliver with a weekly rhythm — done, next, blocked — milestones tied to payments, and every decision confirmed in writing so the client never has to chase status.",
            "quiz": [
              {
                "question": "Why tie milestones to payments?",
                "options": [
                  "To make the client pay more",
                  "So a stalled project is visible and you are paid for completed work",
                  "To finish faster",
                  "It is a legal requirement"
                ],
                "answer": 1,
                "explanation": "Payment milestones make progress concrete and protect you if the project stalls."
              },
              {
                "question": "What is the most valuable freelance habit?",
                "options": [
                  "Working long hours",
                  "Proactive communication — the client never has to ask for status",
                  "Hiding problems",
                  "Sending one big update at the end"
                ],
                "answer": 1,
                "explanation": "Regular updates build trust and surface problems while they are still small."
              }
            ],
            "exercise": {
              "title": "Project progress percent",
              "type": "write-code",
              "instructions": "Write a program that reads completed milestones and total milestones, then prints exactly: Progress: <n>% with one decimal place.",
              "starterCode": "done = int(input())\ntotal = int(input())\nprint(f\"Progress: {done / total * 100:.1f}%\")",
              "solution": "done = int(input())\ntotal = int(input())\nprint(f\"Progress: {done / total * 100:.1f}%\")",
              "solutionExplanation": "Divide completed milestones by total milestones and format as a percentage with one decimal.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "3 of 4",
                  "hidden": false,
                  "stdin": "3\n4\n",
                  "expectedStdout": "Progress: 75.0%"
                },
                {
                  "name": "1 of 2",
                  "hidden": true,
                  "stdin": "1\n2\n",
                  "expectedStdout": "Progress: 50.0%"
                }
              ],
              "hintNotes": {
                "concept": "Progress is the share of milestones completed, as a percentage.",
                "approach": "Compute done / total * 100 and format with :.1f.",
                "structure": "Structure: read two numbers, then one print with the percentage."
              },
              "id": "freelancing-career-m3-l1-e1"
            }
          },
          {
            "id": "freelancing-career-m3-l2",
            "slug": "freelancing-career-m3-l2",
            "title": "Handling Difficult Clients",
            "objectives": [
              "Explain what handling difficult clients means and where it appears in real systems",
              "Apply handling difficult clients to a small realistic problem",
              "Recognise the common mistakes people make with handling difficult clients"
            ],
            "introduction": "Here you will get hands-on with handling difficult clients: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Difficult clients are a normal part of freelancing, and the skill is to handle them professionally rather than personally. The patterns are familiar: the scope-creeper who adds work daily, the ghost who disappears for weeks then demands urgency, the micromanager who wants hourly reports, and the non-payer who always has a reason the invoice is late. The responses are structural, not emotional: the contract's change process for scope, a pause clause for ghosts, a communication rhythm for micromanagers, and a stop-work clause for non-payment. And sometimes the right move is to fire the client — politely, professionally, and with notice — because a bad client costs more in stress and lost work than they pay.",
            "syntax": "respond structurally: contract, pause clause, rhythm, stop-work clause",
            "analogy": "Handling a difficult client is like handling a difficult passenger: you stay calm, follow the procedure, and remember you are allowed to stop the car.",
            "exampleCode": "print(\"Scope-creeper: the change process\")\nprint(\"Ghost: the pause clause\")\nprint(\"Non-payer: the stop-work clause\")\nprint(\"Sometimes: fire the client, politely\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where handling difficult clients does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Doing free extra work to keep a difficult client happy.",
              "Taking a client's behaviour personally instead of responding structurally.",
              "Keeping a client who costs more in stress than they pay."
            ],
            "debugging": {
              "prompt": "This freelancer did three weeks of free extra work for a scope-creeper. What should they have done?",
              "buggyCode": "print(\"Did the extra work for free\")",
              "fixedCode": "print(\"Used the change process: priced and scheduled each addition\")",
              "explanation": "Free extra work rewards scope creep; the contract's change process makes each addition a priced decision."
            },
            "miniChallenge": "Extend the exercise: apply handling difficult clients to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Handle difficult clients structurally — the change process, pause clause, and stop-work clause — and be willing to fire a client politely when the cost exceeds the pay.",
            "quiz": [
              {
                "question": "What is the right response to a scope-creeper?",
                "options": [
                  "Do the extra work for free",
                  "Use the contract's change process — every addition gets a price and a date",
                  "Argue about it",
                  "Ignore the requests"
                ],
                "answer": 1,
                "explanation": "The change process turns 'just one more thing' into a priced, scheduled decision."
              },
              {
                "question": "When should you fire a client?",
                "options": [
                  "Never",
                  "When the stress and lost work cost more than they pay, after a polite, professional exit",
                  "At the first disagreement",
                  "When they ask a question"
                ],
                "answer": 1,
                "explanation": "A bad client can cost more than they pay; a professional exit with notice protects your reputation."
              }
            ],
            "exercise": {
              "title": "Respond to a non-payer",
              "type": "multiple-choice",
              "instructions": "A client is two weeks late paying an invoice. What is the best first move?",
              "starterCode": "",
              "solution": "Remind them politely in writing and pause further work under the stop-work clause",
              "solutionExplanation": "A written reminder plus a pause is professional and structural — it protects you without burning the relationship. Doing more unpaid work rewards the delay.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "The response should be structural — the contract's clause — not emotional.",
                "approach": "Look for the option that reminds in writing and pauses work.",
                "structure": "Structure: remind, pause, and let the contract do the talking."
              },
              "options": [
                "Do more unpaid work to keep them happy",
                "Remind them politely in writing and pause further work under the stop-work clause",
                "Threaten legal action immediately",
                "Ignore it and hope"
              ],
              "answerIndex": 1,
              "id": "freelancing-career-m3-l2-e1"
            }
          }
        ]
      },
      {
        "id": "freelancing-career-m4",
        "title": "Career Growth",
        "description": "Portfolio, personal branding, and getting better clients.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "freelancing-career-m4-l1",
            "slug": "freelancing-career-m4-l1",
            "title": "Building a Portfolio",
            "objectives": [
              "Explain what building a portfolio means and where it appears in real systems",
              "Apply building a portfolio to a small realistic problem",
              "Recognise the common mistakes people make with building a portfolio"
            ],
            "introduction": "Here you will get hands-on with building a portfolio: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A portfolio is proof, not a promise: it shows what you have actually built and what it achieved, in a form a busy client can judge in two minutes. The best entries are case studies, not screenshots — the problem, what you did, and the result, with numbers ('cut load time from 4s to 0.8s'). Three strong case studies beat twenty thin ones, and real client work beats tutorial projects, because it proves you can deliver for someone else. Keep it current: a portfolio that ends two years ago suggests you stopped, whatever the reason. And make the next step obvious — a contact button, not a maze.",
            "syntax": "case studies: problem -> what you did -> result with numbers",
            "analogy": "A portfolio is like a restaurant's tasting menu: three excellent dishes prove more than twenty mediocre ones, and the diner decides in the first bite.",
            "exampleCode": "print(\"Case study: problem, what you did, result with numbers\")\nprint(\"Three strong studies beat twenty thin ones\")\nprint(\"Real client work beats tutorial projects\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where building a portfolio does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Showing tutorial projects instead of real client work.",
              "Listing twenty thin pieces instead of three strong case studies.",
              "Letting the portfolio go stale for years."
            ],
            "debugging": {
              "prompt": "This portfolio lists twenty tutorial projects and no results. What is wrong?",
              "buggyCode": "print(\"20 tutorials, no outcomes, last updated 2 years ago\")",
              "fixedCode": "print(\"3 case studies with numbers, updated this year\")",
              "explanation": "Tutorials prove you can follow instructions; case studies with measured results prove you can deliver for a client."
            },
            "miniChallenge": "Extend the exercise: apply building a portfolio to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A portfolio proves with case studies — problem, actions, measured result — and three strong, recent ones beat twenty thin ones.",
            "quiz": [
              {
                "question": "What makes a portfolio entry strong?",
                "options": [
                  "A screenshot",
                  "A case study with the problem, your actions, and a measured result",
                  "A long list of technologies",
                  "A tutorial project"
                ],
                "answer": 1,
                "explanation": "Case studies with numbers prove you delivered real outcomes, not just that you followed a tutorial."
              },
              {
                "question": "How many portfolio pieces should you show?",
                "options": [
                  "As many as possible",
                  "Three strong case studies beat twenty thin ones",
                  "One is enough",
                  "Fifty"
                ],
                "answer": 1,
                "explanation": "A few excellent, recent case studies are more convincing than a long list of thin work."
              }
            ],
            "exercise": {
              "title": "Portfolio impact score",
              "type": "write-code",
              "instructions": "Write a program that reads the load time before (seconds) and after optimisation, then prints exactly: Improvement: <n>% with one decimal place. Improvement = (before - after) / before * 100.",
              "starterCode": "before = float(input())\nafter = float(input())\nprint(f\"Improvement: {(before - after) / before * 100:.1f}%\")",
              "solution": "before = float(input())\nafter = float(input())\nprint(f\"Improvement: {(before - after) / before * 100:.1f}%\")",
              "solutionExplanation": "Compute the reduction as a percentage of the original time.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "4s to 0.8s",
                  "hidden": false,
                  "stdin": "4\n0.8\n",
                  "expectedStdout": "Improvement: 80.0%"
                },
                {
                  "name": "2s to 1s",
                  "hidden": true,
                  "stdin": "2\n1\n",
                  "expectedStdout": "Improvement: 50.0%"
                }
              ],
              "hintNotes": {
                "concept": "A portfolio result is a number — the improvement as a percentage of the original.",
                "approach": "Compute (before - after) / before * 100 and format with :.1f.",
                "structure": "Structure: read two numbers, then one print with the percentage."
              },
              "id": "freelancing-career-m4-l1-e1"
            }
          },
          {
            "id": "freelancing-career-m4-l2",
            "slug": "freelancing-career-m4-l2",
            "title": "Personal Branding",
            "objectives": [
              "Explain what personal branding means and where it appears in real systems",
              "Apply personal branding to a small realistic problem",
              "Recognise the common mistakes people make with personal branding"
            ],
            "introduction": "Here you will get hands-on with personal branding: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Personal branding for a freelancer is not self-promotion; it is making it easy for the right clients to find you and trust you. The mechanism is simple: pick a niche you can be known for, publish useful things about it regularly (writing, talks, open source), and make your expertise visible where clients look. A niche feels limiting but does the opposite — 'the developer who fixes slow checkouts' is memorable and referable, while 'a general developer' is forgettable. Consistency beats intensity: one useful post a week for a year builds more trust than a burst of ten posts and silence.",
            "syntax": "niche + regular useful publishing + visible expertise",
            "analogy": "Personal branding is like a lighthouse: it does not chase ships, it stands in one place shining steadily so the right ships can find it.",
            "exampleCode": "print(\"Pick a niche you can be known for\")\nprint(\"Publish something useful every week\")\nprint(\"Be visible where your clients look\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where personal branding does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Trying to be visible to everyone instead of known for one thing.",
              "Publishing in bursts and then going silent.",
              "Treating branding as self-promotion instead of useful publishing."
            ],
            "debugging": {
              "prompt": "This freelancer posts ten times in a week, then nothing for six months. What is wrong?",
              "buggyCode": "print(\"Burst of 10 posts, then silence for 6 months\")",
              "fixedCode": "print(\"One useful post every week for a year\")",
              "explanation": "Trust comes from consistency — a steady rhythm beats a burst followed by silence."
            },
            "miniChallenge": "Extend the exercise: apply personal branding to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Personal branding is a niche plus steady, useful publishing where clients look — consistency over a year beats a burst of posts and silence.",
            "quiz": [
              {
                "question": "Why does a niche help a freelancer?",
                "options": [
                  "It limits your work",
                  "A specific expertise is memorable and referable; a generalist is forgettable",
                  "It is required",
                  "It raises your prices automatically"
                ],
                "answer": 1,
                "explanation": "'The developer who fixes slow checkouts' is a referral people can make; 'a developer' is not."
              },
              {
                "question": "What matters more in personal branding?",
                "options": [
                  "Intensity — a burst of posts",
                  "Consistency — one useful post a week for a year",
                  "Follower count",
                  "Expensive equipment"
                ],
                "answer": 1,
                "explanation": "Trust compounds from steady, useful output over time, not from a short burst."
              }
            ],
            "exercise": {
              "title": "Posting consistency check",
              "type": "write-code",
              "instructions": "Write a program that reads the number of posts in the last 12 weeks and prints CONSISTENT if there are at least 12 (one per week), otherwise INCONSISTENT.",
              "starterCode": "posts = int(input())\nprint(\"CONSISTENT\" if posts >= 12 else \"INCONSISTENT\")",
              "solution": "posts = int(input())\nprint(\"CONSISTENT\" if posts >= 12 else \"INCONSISTENT\")",
              "solutionExplanation": "One useful post per week for 12 weeks means at least 12 posts.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "12 posts",
                  "hidden": false,
                  "stdin": "12\n",
                  "expectedStdout": "CONSISTENT"
                },
                {
                  "name": "5 posts",
                  "hidden": true,
                  "stdin": "5\n",
                  "expectedStdout": "INCONSISTENT"
                }
              ],
              "hintNotes": {
                "concept": "Consistency is a count over time — one post a week, every week.",
                "approach": "Check whether posts >= 12 and print the verdict.",
                "structure": "Structure: read the count, then one print with the comparison."
              },
              "id": "freelancing-career-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "freelancing-career-m5",
        "title": "Business",
        "description": "Taxes, finances, and scaling to an agency.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "freelancing-career-m5-l1",
            "slug": "freelancing-career-m5-l1",
            "title": "Taxes and Finances for Freelancers",
            "objectives": [
              "Explain what taxes and finances for freelancers means and where it appears in real systems",
              "Apply taxes and finances for freelancers to a small realistic problem",
              "Recognise the common mistakes people make with taxes and finances for freelancers"
            ],
            "introduction": "Here you will get hands-on with taxes and finances for freelancers: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Freelance finances have three rules that employees never think about: set aside tax on every payment (a separate account, 25-30% is a common rule of thumb), pay yourself a fixed monthly salary from the business account so your personal spending is stable, and track every expense because deductible costs lower your tax bill. Invoicing promptly matters as much as the work itself — an invoice sent late is money that arrives late — and a simple rule (invoice on delivery, payment in 14 days, reminder at 15) prevents most cash-flow pain. The goal is a boring, predictable money system, so your attention stays on the work.",
            "syntax": "separate tax account, fixed salary, track expenses, invoice promptly",
            "analogy": "Freelance finances are like plumbing: boring, predictable pipes beat exciting leaks — set the money aside before you spend it, and invoice the day the work is done.",
            "exampleCode": "print(\"Set aside 25-30% of every payment for tax\")\nprint(\"Pay yourself a fixed monthly salary\")\nprint(\"Invoice on delivery, 14-day terms, reminder at 15\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where taxes and finances for freelancers does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Spending payments as they arrive with no tax reserve.",
              "Mixing business and personal money in one account.",
              "Invoicing late and then wondering why cash flow is painful."
            ],
            "debugging": {
              "prompt": "This freelancer spends each payment as it arrives and panics at tax time. What is wrong?",
              "buggyCode": "print(\"Spend everything, tax bill arrives, panic\")",
              "fixedCode": "print(\"Set aside 25% per payment, fixed salary, expenses tracked\")",
              "explanation": "Without a tax reserve and a fixed salary, lumpy income becomes a cash-flow crisis at tax time."
            },
            "miniChallenge": "Extend the exercise: apply taxes and finances for freelancers to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Freelance finances: a separate tax reserve on every payment, a fixed personal salary, tracked expenses, and invoices sent on delivery with clear terms.",
            "quiz": [
              {
                "question": "Why set aside tax in a separate account?",
                "options": [
                  "To earn interest",
                  "So the tax bill never surprises you and the money is there when it is due",
                  "To hide income",
                  "It is a legal requirement everywhere"
                ],
                "answer": 1,
                "explanation": "Tax set aside per payment means the bill is already funded when it arrives."
              },
              {
                "question": "Why pay yourself a fixed monthly salary?",
                "options": [
                  "To pay less tax",
                  "So personal spending is stable despite lumpy freelance income",
                  "To impress the bank",
                  "To avoid invoicing"
                ],
                "answer": 1,
                "explanation": "A fixed salary smooths the feast-and-famine of freelance income into predictable personal finances."
              }
            ],
            "exercise": {
              "title": "Tax reserve",
              "type": "write-code",
              "instructions": "Write a program that reads a payment amount and prints exactly: Set aside: <n>. Set aside 25% of the payment, as a whole number (integer division).",
              "starterCode": "payment = int(input())\nprint(f\"Set aside: {payment * 25 // 100}\")",
              "solution": "payment = int(input())\nprint(f\"Set aside: {payment * 25 // 100}\")",
              "solutionExplanation": "25% of the payment is payment * 25 // 100; set it aside before spending anything.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Payment 4000",
                  "hidden": false,
                  "stdin": "4000\n",
                  "expectedStdout": "Set aside: 1000"
                },
                {
                  "name": "Payment 1000",
                  "hidden": true,
                  "stdin": "1000\n",
                  "expectedStdout": "Set aside: 250"
                }
              ],
              "hintNotes": {
                "concept": "Tax is a percentage of each payment, set aside the moment it arrives.",
                "approach": "Compute payment * 25 // 100 and print it with the label.",
                "structure": "Structure: read the payment, then one print with the reserve."
              },
              "id": "freelancing-career-m5-l1-e1"
            }
          },
          {
            "id": "freelancing-career-m5-l2",
            "slug": "freelancing-career-m5-l2",
            "title": "Scaling from Freelance to Agency",
            "objectives": [
              "Explain what scaling from freelance to agency means and where it appears in real systems",
              "Apply scaling from freelance to agency to a small realistic problem",
              "Recognise the common mistakes people make with scaling from freelance to agency"
            ],
            "introduction": "Here you will get hands-on with scaling from freelance to agency: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Scaling from freelancer to agency is a change of job, not just a change of size: you stop selling your hours and start selling a team's output, which means hiring, process, and sales become the work. The transition usually starts with subcontractors for overflow, then a first employee, then a repeatable service — a packaged offer with a fixed scope and price that can be delivered by others. The trap is scaling the chaos: if your freelance work depends on you personally for every decision, adding people multiplies the confusion. The test of readiness is whether the business can deliver without you for a week — if it cannot, fix the process before hiring anyone.",
            "syntax": "sell the team's output, not your hours; packaged services; process before people",
            "analogy": "Scaling to an agency is like going from cooking alone to running a restaurant: the recipes, the stations, and the training must work without you standing at every stove.",
            "exampleCode": "print(\"Start with subcontractors for overflow\")\nprint(\"Package a repeatable service: fixed scope, fixed price\")\nprint(\"Test: can the business deliver without you for a week?\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where scaling from freelance to agency does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Hiring before documenting the process.",
              "Selling hours instead of a packaged, repeatable service.",
              "Scaling chaos instead of fixing it first."
            ],
            "debugging": {
              "prompt": "This freelancer hired three people but still makes every decision personally. What is wrong?",
              "buggyCode": "print(\"Hired 3 people, still decides everything\")",
              "fixedCode": "print(\"Documented the process, then hired to run it\")",
              "explanation": "Scaling the chaos: without process, new people add confusion instead of capacity — document first, hire second."
            },
            "miniChallenge": "Extend the exercise: apply scaling from freelance to agency to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Scaling means selling a team's output through packaged services and documented process — and the readiness test is whether the business delivers without you for a week.",
            "quiz": [
              {
                "question": "What changes when you scale from freelancer to agency?",
                "options": [
                  "Nothing",
                  "You sell a team's output, so hiring, process, and sales become the work",
                  "You work fewer hours",
                  "You charge less"
                ],
                "answer": 1,
                "explanation": "An agency sells what a team delivers, which makes process and hiring the core job."
              },
              {
                "question": "What is the readiness test for hiring?",
                "options": [
                  "Do you have money?",
                  "Can the business deliver without you for a week?",
                  "Do you have an office?",
                  "Do you have a logo?"
                ],
                "answer": 1,
                "explanation": "If delivery depends on you personally, adding people multiplies the confusion — fix the process first."
              }
            ],
            "exercise": {
              "title": "Agency capacity",
              "type": "write-code",
              "instructions": "Write a program that reads the number of team members and projects each can handle, then prints exactly: Capacity: <n> projects.",
              "starterCode": "members = int(input())\nper = int(input())\nprint(f\"Capacity: {members * per} projects\")",
              "solution": "members = int(input())\nper = int(input())\nprint(f\"Capacity: {members * per} projects\")",
              "solutionExplanation": "Team capacity is members times projects per member.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "3 members x 2 projects",
                  "hidden": false,
                  "stdin": "3\n2\n",
                  "expectedStdout": "Capacity: 6 projects"
                },
                {
                  "name": "5 members x 4 projects",
                  "hidden": true,
                  "stdin": "5\n4\n",
                  "expectedStdout": "Capacity: 20 projects"
                }
              ],
              "hintNotes": {
                "concept": "An agency's capacity is the team's output, not one person's hours.",
                "approach": "Multiply members by projects per member.",
                "structure": "Structure: read two numbers, then one print with the capacity."
              },
              "id": "freelancing-career-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "technical-writing",
    "slug": "technical-writing",
    "language": "python",
    "category": "cs-career",
    "title": "Technical Writing",
    "description": "Write documentation people actually read: audience, structure, tutorials, plain language, diagrams, API docs, READMEs, and docs-as-code.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Audience analysis",
      "Document structure",
      "Tutorials",
      "Plain language",
      "Diagrams",
      "API documentation",
      "README files",
      "Docs as code"
    ],
    "prerequisites": [
      "Basic Python programming",
      "Comfortable writing in English"
    ],
    "modules": [
      {
        "id": "technical-writing-m1",
        "title": "Foundations",
        "description": "What makes good technical writing and who it is for.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "technical-writing-m1-l1",
            "slug": "technical-writing-m1-l1",
            "title": "What Makes Good Technical Writing",
            "objectives": [
              "Explain what good technical writing means and where it appears in real systems",
              "Apply good technical writing to a small realistic problem",
              "Recognise the common mistakes people make with good technical writing"
            ],
            "introduction": "This lesson introduces good technical writing. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Good technical writing is invisible: the reader gets the answer and never notices the prose. It has four qualities — accuracy (every fact is correct), clarity (one idea per sentence, no jargon without a definition), completeness (the reader can finish the task without going elsewhere), and findability (headings and structure that let a reader jump to the part they need). The test of a document is not whether it reads well but whether a stranger can follow it to success: if a new hire can set up the project from your guide without asking anyone, the guide is good. Writing is a design skill, and the user is the reader.",
            "syntax": "accurate, clear, complete, findable; test: can a stranger succeed alone?",
            "analogy": "Good technical writing is like a clear road sign: you read it in a second, you know exactly where to go, and you never think about the sign itself.",
            "exampleCode": "print(\"Good docs: accurate, clear, complete, findable\")\nprint(\"Test: can a stranger follow it to success alone?\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem good technical writing solves in plain words.",
              "Follow the example step by step and note where good technical writing changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Writing to impress instead of to help the reader succeed.",
              "Using jargon without defining it.",
              "Publishing steps you never tested yourself."
            ],
            "debugging": {
              "prompt": "This guide is beautifully written but the setup steps are wrong. What is the problem?",
              "buggyCode": "print(\"Beautiful prose, wrong commands\")",
              "fixedCode": "print(\"Plain prose, correct commands, tested by a stranger\")",
              "explanation": "Accuracy beats style: a guide with wrong steps fails its only job, however well it reads."
            },
            "miniChallenge": "Extend the exercise: apply good technical writing to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Good technical writing is accurate, clear, complete, and findable — and its test is whether a stranger can succeed from it alone.",
            "quiz": [
              {
                "question": "What is the test of a good technical document?",
                "options": [
                  "It reads beautifully",
                  "A stranger can follow it to success without asking anyone",
                  "It is long",
                  "It uses impressive words"
                ],
                "answer": 1,
                "explanation": "Documentation succeeds when a reader can complete the task from it alone."
              },
              {
                "question": "Which is NOT one of the four qualities of good technical writing?",
                "options": [
                  "Accuracy",
                  "Clarity",
                  "Completeness",
                  "Cleverness"
                ],
                "answer": 3,
                "explanation": "The four qualities are accuracy, clarity, completeness, and findability — cleverness is not one of them."
              }
            ],
            "exercise": {
              "title": "Judge the document",
              "type": "multiple-choice",
              "instructions": "Which document is better technical writing?",
              "starterCode": "",
              "solution": "Plain prose with correct, tested steps a stranger can follow",
              "solutionExplanation": "Accuracy and usability beat beautiful prose — the reader's success is the measure, not the style.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Ask: can a stranger succeed with this document alone?",
                "approach": "Look for the option that is accurate and tested, not the prettiest.",
                "structure": "Structure: accuracy + clarity + completeness + findability."
              },
              "options": [
                "Beautiful prose with wrong setup steps",
                "Plain prose with correct, tested steps a stranger can follow",
                "A long essay about the product's history",
                "A document full of unexplained jargon"
              ],
              "answerIndex": 1,
              "id": "technical-writing-m1-l1-e1"
            }
          },
          {
            "id": "technical-writing-m1-l2",
            "slug": "technical-writing-m1-l2",
            "title": "Know Your Audience",
            "objectives": [
              "Explain what knowing your audience means and where it appears in real systems",
              "Apply knowing your audience to a small realistic problem",
              "Recognise the common mistakes people make with knowing your audience"
            ],
            "introduction": "Here you will get hands-on with knowing your audience: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Every document has a reader, and the reader's knowledge decides everything: what you can assume, what you must explain, and what you can skip. A guide for new hires explains the setup from zero; a reference for experienced engineers lists the options and edge cases. The practical method is to write a one-line persona before you start — 'a backend developer who has never used our API' — and to test every sentence against it: would this person know this term? Would they need this step? The most common failure is writing for yourself, the expert who already knows the answer, instead of for the reader who does not.",
            "syntax": "persona first: who reads this, what do they know, what do they need?",
            "analogy": "Knowing your audience is like cooking for a guest: you ask about allergies first, because the same dish is a delight for one person and a disaster for another.",
            "exampleCode": "print(\"Persona: a backend developer who has never used our API\")\nprint(\"Test every sentence: would this person know this term?\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where knowing your audience does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Writing for yourself instead of the reader.",
              "Assuming knowledge the persona does not have.",
              "Skipping the persona and guessing at the audience."
            ],
            "debugging": {
              "prompt": "This API guide assumes the reader knows the auth flow and never explains it. What is wrong?",
              "buggyCode": "print(\"Guide assumes auth knowledge, never explains it\")",
              "fixedCode": "print(\"Guide explains auth in three steps for a first-time user\")",
              "explanation": "The guide was written for the expert, not the stated persona — a first-time user is stuck at step one."
            },
            "miniChallenge": "Extend the exercise: apply knowing your audience to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Know your audience first: write a one-line persona and test every sentence against it — would this person know this term, need this step, find this heading?",
            "quiz": [
              {
                "question": "Why write a persona before drafting?",
                "options": [
                  "It is a formality",
                  "It decides what you can assume, explain, and skip",
                  "It makes the document longer",
                  "Personas are for marketing"
                ],
                "answer": 1,
                "explanation": "The persona is the standard every sentence is tested against."
              },
              {
                "question": "What is the most common audience failure?",
                "options": [
                  "Writing too little",
                  "Writing for yourself, the expert, instead of for the reader who does not know",
                  "Writing too much",
                  "Using headings"
                ],
                "answer": 1,
                "explanation": "Experts skip the steps beginners need, because the expert no longer sees them."
              }
            ],
            "exercise": {
              "title": "Reading level check",
              "type": "write-code",
              "instructions": "Write a program that reads the number of jargon terms in a document and prints TOO MUCH JARGON if there are more than 5, otherwise OK.",
              "starterCode": "jargon = int(input())\nprint(\"TOO MUCH JARGON\" if jargon > 5 else \"OK\")",
              "solution": "jargon = int(input())\nprint(\"TOO MUCH JARGON\" if jargon > 5 else \"OK\")",
              "solutionExplanation": "More than five unexplained jargon terms means the document is written for the author, not the reader.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "3 terms",
                  "hidden": false,
                  "stdin": "3\n",
                  "expectedStdout": "OK"
                },
                {
                  "name": "8 terms",
                  "hidden": true,
                  "stdin": "8\n",
                  "expectedStdout": "TOO MUCH JARGON"
                }
              ],
              "hintNotes": {
                "concept": "Jargon without definitions excludes the reader the document is for.",
                "approach": "Compare the count with 5 and print the verdict.",
                "structure": "Structure: read the count, then one print with the comparison."
              },
              "id": "technical-writing-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "technical-writing-m2",
        "title": "Structure",
        "description": "Structuring documents and writing tutorials.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "technical-writing-m2-l1",
            "slug": "technical-writing-m2-l1",
            "title": "Structuring a Document",
            "objectives": [
              "Explain what structuring a document means and where it appears in real systems",
              "Apply structuring a document to a small realistic problem",
              "Recognise the common mistakes people make with structuring a document"
            ],
            "introduction": "This lesson introduces structuring a document. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Structure is what lets a reader find the answer in thirty seconds instead of reading the whole document: a clear title, a one-paragraph summary of what the document covers, headings that describe the content (not 'Introduction' but 'Installing the CLI'), and the most important information first. The inverted pyramid from journalism applies: the conclusion and the key facts come first, the detail follows. Task documents should be organised by the reader's goal, not by the system's architecture — 'Deploying the app' is a better heading than 'The deployment module', because the reader thinks in goals.",
            "syntax": "title, summary, descriptive headings, most important first, organise by reader goals",
            "analogy": "Document structure is like a supermarket layout: the essentials are at the front, the aisles are signposted, and nobody has to walk the whole store to find the milk.",
            "exampleCode": "print(\"Title: what this document does\")\nprint(\"Summary: one paragraph\")\nprint(\"Headings by reader goal: Deploying the app\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem structuring a document solves in plain words.",
              "Follow the example step by step and note where structuring a document changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Using 'Introduction' and 'Overview' as headings instead of describing the content.",
              "Burying the answer at the end of the document.",
              "Organising by system architecture instead of reader goals."
            ],
            "debugging": {
              "prompt": "This document buries the answer on page five. What is wrong?",
              "buggyCode": "print(\"Answer on page 5, after history and background\")",
              "fixedCode": "print(\"Answer first, then background\")",
              "explanation": "The inverted pyramid is violated: the most important information must come first, not last."
            },
            "miniChallenge": "Extend the exercise: apply structuring a document to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Structure for findability: a clear title, a summary, descriptive goal-based headings, and the most important information first.",
            "quiz": [
              {
                "question": "Why organise by the reader's goal instead of the system's architecture?",
                "options": [
                  "It is shorter",
                  "Readers think in goals ('Deploying the app'), not in modules",
                  "It is a rule",
                  "Architectures change"
                ],
                "answer": 1,
                "explanation": "Headings that match the reader's task let them find the section they need immediately."
              },
              {
                "question": "What is the inverted pyramid?",
                "options": [
                  "A diagram",
                  "The most important information first, detail after",
                  "A short document",
                  "A type of heading"
                ],
                "answer": 1,
                "explanation": "Putting conclusions and key facts first means readers get the answer even if they stop early."
              }
            ],
            "exercise": {
              "title": "Heading quality check",
              "type": "write-code",
              "instructions": "Write a program that reads a heading and prints GOOD if it starts with a verb (Deploy, Install, Configure, Create), otherwise VAGUE. Check the first word against the verb list.",
              "starterCode": "heading = input().strip()\nverbs = {\"Deploy\", \"Install\", \"Configure\", \"Create\"}\nfirst = heading.split()[0] if heading.split() else \"\"\nprint(\"GOOD\" if first in verbs else \"VAGUE\")",
              "solution": "heading = input().strip()\nverbs = {\"Deploy\", \"Install\", \"Configure\", \"Create\"}\nfirst = heading.split()[0] if heading.split() else \"\"\nprint(\"GOOD\" if first in verbs else \"VAGUE\")",
              "solutionExplanation": "A good heading starts with a verb describing the reader's goal; 'Introduction' or 'Overview' says nothing.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Deploying the app",
                  "hidden": false,
                  "stdin": "Deploying the app\n",
                  "expectedStdout": "VAGUE"
                },
                {
                  "name": "Deploy the app",
                  "hidden": true,
                  "stdin": "Deploy the app\n",
                  "expectedStdout": "GOOD"
                }
              ],
              "hintNotes": {
                "concept": "Headings should describe the reader's goal, and goal headings start with a verb.",
                "approach": "Split the heading, check the first word against the verb set.",
                "structure": "Structure: read the heading, extract the first word, print GOOD or VAGUE."
              },
              "id": "technical-writing-m2-l1-e1"
            }
          },
          {
            "id": "technical-writing-m2-l2",
            "slug": "technical-writing-m2-l2",
            "title": "Writing Tutorials",
            "objectives": [
              "Explain what writing tutorials means and where it appears in real systems",
              "Apply writing tutorials to a small realistic problem",
              "Recognise the common mistakes people make with writing tutorials"
            ],
            "introduction": "Here you will get hands-on with writing tutorials: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A tutorial teaches by doing: the reader follows steps and ends with something working. The structure is a goal stated upfront, prerequisites listed honestly, steps that are small and verifiable ('run this command, you should see this output'), and a working result at the end. Each step must be testable — the reader should know immediately whether it worked — and the tutorial must be tested from scratch by someone who did not write it, because the author cannot see the steps they skipped. The most common failure is a tutorial that works on the author's machine and nowhere else, because a prerequisite was never mentioned.",
            "syntax": "goal upfront, prerequisites, small verifiable steps, tested from scratch",
            "analogy": "A tutorial is like a recipe: it lists the ingredients first, gives steps you can check as you go, and ends with a dish — a recipe that only works in the author's kitchen is useless.",
            "exampleCode": "print(\"Goal: build a working to-do API in 20 minutes\")\nprint(\"Prerequisites: Python 3.12, pip\")\nprint(\"Each step: run this, you should see this\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where writing tutorials does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Writing steps the reader cannot verify.",
              "Forgetting to list prerequisites.",
              "Never testing the tutorial from scratch."
            ],
            "debugging": {
              "prompt": "This tutorial works on the author's machine and nowhere else. What is missing?",
              "buggyCode": "print(\"Works here, fails elsewhere, no prerequisites listed\")",
              "fixedCode": "print(\"Prerequisites listed, tested from scratch by a colleague\")",
              "explanation": "Unlisted prerequisites — the tutorial assumed an environment only the author had."
            },
            "miniChallenge": "Extend the exercise: apply writing tutorials to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Tutorials teach by doing: a stated goal, honest prerequisites, small verifiable steps, and a working result — tested from scratch by someone else.",
            "quiz": [
              {
                "question": "What makes a tutorial step good?",
                "options": [
                  "It is long",
                  "It is small and verifiable — the reader knows immediately whether it worked",
                  "It has no output",
                  "It is optional"
                ],
                "answer": 1,
                "explanation": "Verifiable steps let the reader catch a mistake at the step where it happened, not ten steps later."
              },
              {
                "question": "Why must a tutorial be tested by someone who did not write it?",
                "options": [
                  "To be polite",
                  "The author cannot see the steps they skipped",
                  "It is faster",
                  "It is a rule"
                ],
                "answer": 1,
                "explanation": "Authors fill in gaps from memory; a fresh reader finds the missing prerequisites and steps."
              }
            ],
            "exercise": {
              "title": "Check tutorial steps",
              "type": "write-code",
              "instructions": "Write a program that reads the number of steps and the number with expected output shown, then prints exactly: Coverage: <n>% with one decimal place.",
              "starterCode": "steps = int(input())\nshown = int(input())\nprint(f\"Coverage: {shown / steps * 100:.1f}%\")",
              "solution": "steps = int(input())\nshown = int(input())\nprint(f\"Coverage: {shown / steps * 100:.1f}%\")",
              "solutionExplanation": "Coverage is the share of steps that show their expected output, as a percentage.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "10 steps, 8 shown",
                  "hidden": false,
                  "stdin": "10\n8\n",
                  "expectedStdout": "Coverage: 80.0%"
                },
                {
                  "name": "5 steps, 5 shown",
                  "hidden": true,
                  "stdin": "5\n5\n",
                  "expectedStdout": "Coverage: 100.0%"
                }
              ],
              "hintNotes": {
                "concept": "Every tutorial step should show what the reader should see — that is how they know it worked.",
                "approach": "Compute shown / steps * 100 and format with :.1f.",
                "structure": "Structure: read two numbers, then one print with the percentage."
              },
              "id": "technical-writing-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "technical-writing-m3",
        "title": "Clarity",
        "description": "Plain language, precision, diagrams, and examples.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "technical-writing-m3-l1",
            "slug": "technical-writing-m3-l1",
            "title": "Plain Language and Precision",
            "objectives": [
              "Explain what plain language and precision means and where it appears in real systems",
              "Apply plain language and precision to a small realistic problem",
              "Recognise the common mistakes people make with plain language and precision"
            ],
            "introduction": "This lesson introduces plain language and precision. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Plain language is not dumbing down; it is removing the obstacles between the reader and the meaning. Use short sentences, one idea each; prefer active voice ('Run the command') over passive ('The command should be run'); define every term the first time it appears; and cut words that add nothing ('in order to' becomes 'to'). Precision matters as much as simplicity: 'usually' and 'sometimes' are not instructions — say exactly when something happens, with the condition stated. The test is to read a sentence aloud: if you stumble, the reader will too.",
            "syntax": "short sentences, active voice, define terms, precise conditions",
            "analogy": "Plain language is like a clean window: you look through it and see the garden, not the glass — and precision is knowing exactly which plant you are pointing at.",
            "exampleCode": "print(\"Active: Run the command.\")\nprint(\"Passive: The command should be run. (avoid)\")\nprint(\"Precise: If the file is missing, the server exits with code 1.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem plain language and precision solves in plain words.",
              "Follow the example step by step and note where plain language and precision changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Writing in passive voice so nobody knows who should act.",
              "Using vague words like 'usually' and 'sometimes' in instructions.",
              "Padding sentences with filler like 'in order to' and 'it is important to note'."
            ],
            "debugging": {
              "prompt": "This sentence says 'the file should be updated in order to ensure correctness.' How would you improve it?",
              "buggyCode": "print(\"The file should be updated in order to ensure correctness.\")",
              "fixedCode": "print(\"Update the file to keep it correct.\")",
              "explanation": "Active voice, fewer words, same meaning: 'Update the file to keep it correct.'"
            },
            "miniChallenge": "Extend the exercise: apply plain language and precision to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Plain language is short sentences, active voice, defined terms, and exact conditions — read a sentence aloud, and if you stumble, rewrite it.",
            "quiz": [
              {
                "question": "Why prefer active voice in technical writing?",
                "options": [
                  "It is shorter",
                  "It names who does what, so instructions are unambiguous",
                  "It sounds formal",
                  "It is a rule"
                ],
                "answer": 1,
                "explanation": "'Run the command' names the actor and the action; passive voice hides both."
              },
              {
                "question": "What is wrong with 'sometimes the server restarts'?",
                "options": [
                  "Nothing",
                  "It is imprecise — the reader cannot tell when it happens",
                  "It is too long",
                  "It is active voice"
                ],
                "answer": 1,
                "explanation": "Instructions need exact conditions: say when it happens, not that it sometimes does."
              }
            ],
            "exercise": {
              "title": "Choose the clearer sentence",
              "type": "multiple-choice",
              "instructions": "Which sentence is clearest?",
              "starterCode": "",
              "solution": "Update the file to keep it correct",
              "solutionExplanation": "Active voice, short, and direct — it names the action and the reason in seven words. The passive version hides the actor and pads the sentence.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Active voice and short sentences win — name the action directly.",
                "approach": "Look for the shortest, most direct instruction.",
                "structure": "Structure: active voice, one idea, no filler words."
              },
              "options": [
                "The file should be updated in order to ensure correctness",
                "Update the file to keep it correct",
                "It is recommended that the updating of the file be performed",
                "Correctness is ensured by the file being updated"
              ],
              "answerIndex": 1,
              "id": "technical-writing-m3-l1-e1"
            }
          },
          {
            "id": "technical-writing-m3-l2",
            "slug": "technical-writing-m3-l2",
            "title": "Diagrams and Examples",
            "objectives": [
              "Explain what diagrams and examples means and where it appears in real systems",
              "Apply diagrams and examples to a small realistic problem",
              "Recognise the common mistakes people make with diagrams and examples"
            ],
            "introduction": "This lesson introduces diagrams and examples. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "A diagram is worth a thousand words only when it shows the right thing: a sequence diagram for a flow over time, a component diagram for a system's parts, a state diagram for a lifecycle. The rules are to keep diagrams simple (five boxes beat fifteen), label everything, and keep them next to the text that explains them. Examples follow the same discipline: a minimal example that runs, with realistic data — not foo, bar, and baz, which teach nothing about the real use. A good example shows the common case first and the edge cases after, and every example in a document must actually run, or it will rot into a lie.",
            "syntax": "right diagram for the job, five boxes beat fifteen, realistic examples that run",
            "analogy": "A diagram is like a map: it shows the roads and the landmarks at a glance, but a map with every side street drawn is unreadable — and an example is a guided walk, not a list of street names.",
            "exampleCode": "print(\"Flow over time: sequence diagram\")\nprint(\"System parts: component diagram\")\nprint(\"Examples: minimal, realistic, and actually runnable\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem diagrams and examples solves in plain words.",
              "Follow the example step by step and note where diagrams and examples changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Drawing a fifteen-box diagram nobody can read.",
              "Using foo, bar, and baz in examples.",
              "Publishing examples that no longer run."
            ],
            "debugging": {
              "prompt": "This document's examples use foo, bar, and baz. What is wrong?",
              "buggyCode": "print(\"Example: foo(bar, baz)\")",
              "fixedCode": "print(\"Example: create_order(customer=ada, items=[book])\")",
              "explanation": "Placeholder names hide what the feature is for; realistic data shows the real use at a glance."
            },
            "miniChallenge": "Extend the exercise: apply diagrams and examples to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Diagrams show the right thing simply — five boxes beat fifteen — and examples use realistic data, show the common case first, and must actually run.",
            "quiz": [
              {
                "question": "Why use realistic data in examples instead of foo and bar?",
                "options": [
                  "It is longer",
                  "Realistic data teaches the real use; foo and bar teach nothing about it",
                  "It is required",
                  "It looks professional"
                ],
                "answer": 1,
                "explanation": "An example with realistic values shows what the feature is for; placeholder names hide the purpose."
              },
              {
                "question": "What is the rule for diagram complexity?",
                "options": [
                  "More boxes is better",
                  "Five boxes beat fifteen — keep it simple and label everything",
                  "Never use diagrams",
                  "Diagrams must be colourful"
                ],
                "answer": 1,
                "explanation": "A simple diagram with clear labels communicates; a dense one confuses."
              }
            ],
            "exercise": {
              "title": "Count diagram boxes",
              "type": "write-code",
              "instructions": "Write a program that reads the number of boxes in a diagram and prints SIMPLE if there are 5 or fewer, otherwise TOO COMPLEX.",
              "starterCode": "boxes = int(input())\nprint(\"SIMPLE\" if boxes <= 5 else \"TOO COMPLEX\")",
              "solution": "boxes = int(input())\nprint(\"SIMPLE\" if boxes <= 5 else \"TOO COMPLEX\")",
              "solutionExplanation": "Five boxes or fewer keeps a diagram readable; more than that needs splitting or simplifying.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "4 boxes",
                  "hidden": false,
                  "stdin": "4\n",
                  "expectedStdout": "SIMPLE"
                },
                {
                  "name": "12 boxes",
                  "hidden": true,
                  "stdin": "12\n",
                  "expectedStdout": "TOO COMPLEX"
                }
              ],
              "hintNotes": {
                "concept": "A readable diagram is a simple one — five boxes is the rule of thumb.",
                "approach": "Compare the count with 5 and print the verdict.",
                "structure": "Structure: read the count, then one print with the comparison."
              },
              "id": "technical-writing-m3-l2-e1"
            }
          }
        ]
      },
      {
        "id": "technical-writing-m4",
        "title": "Documentation Types",
        "description": "API docs, READMEs, and runbooks.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "technical-writing-m4-l1",
            "slug": "technical-writing-m4-l1",
            "title": "API Documentation",
            "objectives": [
              "Explain what API documentation means and where it appears in real systems",
              "Apply API documentation to a small realistic problem",
              "Recognise the common mistakes people make with API documentation"
            ],
            "introduction": "This lesson introduces API documentation. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "API documentation has two audiences and two jobs: the reference, which lists every endpoint, parameter, and response precisely; and the guide, which shows how to do the common tasks. The reference must be generated from the code where possible, because hand-written references rot the moment the code changes. Every endpoint needs an example request and response, error codes with their meanings, and authentication explained before the first call. The guide answers the questions a new developer actually asks: how do I authenticate, how do I do the common thing, and what do I do when it fails?",
            "syntax": "reference (generated, precise) + guide (tasks, examples, errors)",
            "analogy": "API docs are like a cookbook plus an ingredient encyclopaedia: the guide is the recipes, the reference is the full list of ingredients and their properties.",
            "exampleCode": "print(\"GET /users/{id} -> 200 {id, name} | 404 user not found\")\nprint(\"Reference: every endpoint, parameter, response\")\nprint(\"Guide: authenticate, do the common thing, handle errors\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem API documentation solves in plain words.",
              "Follow the example step by step and note where API documentation changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Hand-writing a reference that rots when the code changes.",
              "Documenting endpoints without example requests and responses.",
              "Explaining authentication after the first example call."
            ],
            "debugging": {
              "prompt": "This API reference lists endpoints but no example requests. What is missing?",
              "buggyCode": "print(\"GET /users/{id}\")",
              "fixedCode": "print(\"GET /users/{id} -> 200 {id, name} | 404 user not found\")",
              "explanation": "Without an example request and response, the developer must guess the format — and errors must be documented too."
            },
            "miniChallenge": "Extend the exercise: apply API documentation to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "API docs need a generated reference (precise, in sync) and a guide (tasks, examples, errors) — with authentication explained before the first call.",
            "quiz": [
              {
                "question": "Why generate API references from code?",
                "options": [
                  "It is faster to write",
                  "Hand-written references rot the moment the code changes",
                  "It looks better",
                  "It is required"
                ],
                "answer": 1,
                "explanation": "Generated references stay in sync with the code; hand-written ones drift and lie."
              },
              {
                "question": "What must every endpoint document?",
                "options": [
                  "Only the URL",
                  "An example request and response, error codes, and authentication",
                  "Only the response",
                  "The author's name"
                ],
                "answer": 1,
                "explanation": "Developers need to see a working call, what can go wrong, and how to authenticate."
              }
            ],
            "exercise": {
              "title": "Classify an API status",
              "type": "write-code",
              "instructions": "Write a program that reads an HTTP status code and prints OK for 200, NOT FOUND for 404, or ERROR for anything else.",
              "starterCode": "code = int(input())\nif code == 200:\n    print(\"OK\")\nelif code == 404:\n    print(\"NOT FOUND\")\nelse:\n    print(\"ERROR\")",
              "solution": "code = int(input())\nif code == 200:\n    print(\"OK\")\nelif code == 404:\n    print(\"NOT FOUND\")\nelse:\n    print(\"ERROR\")",
              "solutionExplanation": "Match the status code to its meaning: 200 is success, 404 is a missing resource, anything else is an error here.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "200",
                  "hidden": false,
                  "stdin": "200\n",
                  "expectedStdout": "OK"
                },
                {
                  "name": "404",
                  "hidden": true,
                  "stdin": "404\n",
                  "expectedStdout": "NOT FOUND"
                }
              ],
              "hintNotes": {
                "concept": "API docs must state what each status code means for each endpoint.",
                "approach": "Use if/elif to map 200 and 404, with else for the rest.",
                "structure": "Structure: read the code, then a chain printing the meaning."
              },
              "id": "technical-writing-m4-l1-e1"
            }
          },
          {
            "id": "technical-writing-m4-l2",
            "slug": "technical-writing-m4-l2",
            "title": "README Files and Runbooks",
            "objectives": [
              "Explain what README files and runbooks means and where it appears in real systems",
              "Apply README files and runbooks to a small realistic problem",
              "Recognise the common mistakes people make with README files and runbooks"
            ],
            "introduction": "Here you will get hands-on with README files and runbooks: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A README is a project's front door: in thirty seconds it must answer what the project is, how to install it, how to run it, and where to get help. The order matters — the quick start comes before the architecture, because most readers only need the quick start. A runbook is the README's operational sibling: a step-by-step guide for a specific incident ('the database is down'), written for a tired engineer at 3 a.m., with the exact commands to run, the expected output, and when to escalate. Both share the same test: can a stranger succeed from the document alone, under pressure, without asking anyone?",
            "syntax": "README: what, install, run, help — quick start first; runbook: exact commands for an incident",
            "analogy": "A README is like the sign outside a shop: what it sells, when it opens, and how to get in. A runbook is the fire drill poster inside: exact steps, in order, for when things go wrong.",
            "exampleCode": "print(\"README: what, install, run, help — quick start first\")\nprint(\"Runbook: exact commands, expected output, when to escalate\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where README files and runbooks does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Putting architecture before the quick start in a README.",
              "Writing a runbook with vague advice instead of exact commands.",
              "Forgetting to say when to escalate in a runbook."
            ],
            "debugging": {
              "prompt": "This runbook says 'restart the database if it seems broken.' What is wrong?",
              "buggyCode": "print(\"Restart the database if it seems broken.\")",
              "fixedCode": "print(\"1. Run: systemctl status db  2. If active (exited), run: systemctl restart db  3. Expect: Active: active (running)  4. If still down after 5 min, page the on-call.\")",
              "explanation": "A runbook needs exact commands, expected output, and an escalation point — 'if it seems broken' is not an instruction."
            },
            "miniChallenge": "Extend the exercise: apply README files and runbooks to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "READMEs answer what, install, run, and help with the quick start first; runbooks give exact commands, expected output, and escalation points for incidents.",
            "quiz": [
              {
                "question": "What should come first in a README?",
                "options": [
                  "The architecture",
                  "The quick start — install and run",
                  "The license",
                  "The changelog"
                ],
                "answer": 1,
                "explanation": "Most readers only need to install and run it; the quick start serves them first."
              },
              {
                "question": "Who is a runbook written for?",
                "options": [
                  "The author",
                  "A tired engineer at 3 a.m. handling an incident",
                  "A new hire",
                  "The marketing team"
                ],
                "answer": 1,
                "explanation": "Runbooks are for incidents, so they must work under stress: exact commands, expected output, escalation points."
              }
            ],
            "exercise": {
              "title": "Check README sections",
              "type": "write-code",
              "instructions": "Write a program that reads the number of README sections present (of 4: what, install, run, help) and prints COMPLETE if all 4 are present, otherwise INCOMPLETE.",
              "starterCode": "sections = int(input())\nprint(\"COMPLETE\" if sections == 4 else \"INCOMPLETE\")",
              "solution": "sections = int(input())\nprint(\"COMPLETE\" if sections == 4 else \"INCOMPLETE\")",
              "solutionExplanation": "A README needs all four sections: what it is, how to install, how to run, and where to get help.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "4 sections",
                  "hidden": false,
                  "stdin": "4\n",
                  "expectedStdout": "COMPLETE"
                },
                {
                  "name": "2 sections",
                  "hidden": true,
                  "stdin": "2\n",
                  "expectedStdout": "INCOMPLETE"
                }
              ],
              "hintNotes": {
                "concept": "A README's front door needs four things: what, install, run, help.",
                "approach": "Check whether the count equals 4.",
                "structure": "Structure: read the count, then one print with the verdict."
              },
              "id": "technical-writing-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "technical-writing-m5",
        "title": "Process",
        "description": "Editing, review, and docs as code.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "technical-writing-m5-l1",
            "slug": "technical-writing-m5-l1",
            "title": "Editing and Review",
            "objectives": [
              "Explain what editing and review means and where it appears in real systems",
              "Apply editing and review to a small realistic problem",
              "Recognise the common mistakes people make with editing and review"
            ],
            "introduction": "Here you will get hands-on with editing and review: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Editing is where good writing is made: the first draft gets the ideas down, and the edit makes them readable. The method is to edit in passes — first for structure (does the order make sense?), then for clarity (is every sentence doing work?), then for correctness (are the commands and facts right?), and finally for style. Review by a second person catches what the author cannot see, and the best review question is 'could you follow this to success?' rather than 'does this read well?'. Docs deserve the same review process as code: a pull request, a reviewer, and a check that the examples still run.",
            "syntax": "edit in passes: structure, clarity, correctness, style; review like code",
            "analogy": "Editing is like sharpening a knife: you work through the grades from coarse to fine, and the last pass is the one that makes it cut cleanly.",
            "exampleCode": "print(\"Pass 1: structure — does the order make sense?\")\nprint(\"Pass 2: clarity — is every sentence doing work?\")\nprint(\"Pass 3: correctness — do the commands run?\")\nprint(\"Pass 4: style\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where editing and review does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Editing style before fixing incorrect commands.",
              "Reviewing docs for grammar instead of for reader success.",
              "Skipping review for docs while requiring it for code."
            ],
            "debugging": {
              "prompt": "This edit fixed the commas but left a wrong command in the guide. What went wrong?",
              "buggyCode": "print(\"Edited style only, wrong command still there\")",
              "fixedCode": "print(\"Edited in passes: structure, clarity, correctness, style\")",
              "explanation": "Style was edited before correctness — the passes must include a correctness pass that runs the commands."
            },
            "miniChallenge": "Extend the exercise: apply editing and review to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Edit in passes — structure, clarity, correctness, style — and review docs like code, asking whether a reader could follow them to success.",
            "quiz": [
              {
                "question": "Why edit in passes instead of all at once?",
                "options": [
                  "It is slower",
                  "Each pass has one job, so nothing is missed and the work stays focused",
                  "It is a rule",
                  "Passes are faster"
                ],
                "answer": 1,
                "explanation": "One concern per pass — structure, then clarity, then correctness, then style — keeps the edit thorough."
              },
              {
                "question": "What is the best review question for documentation?",
                "options": [
                  "Does this read well?",
                  "Could you follow this to success?",
                  "Is it long enough?",
                  "Is the grammar perfect?"
                ],
                "answer": 1,
                "explanation": "The reader's success is the measure; beautiful prose that does not work is a failed document."
              }
            ],
            "exercise": {
              "title": "Count edit passes",
              "type": "write-code",
              "instructions": "Write a program that reads the number of edit passes completed (of 4: structure, clarity, correctness, style) and prints DONE if all 4 are done, otherwise REMAINING: <4-n>.",
              "starterCode": "passes = int(input())\nprint(\"DONE\" if passes == 4 else f\"REMAINING: {4 - passes}\")",
              "solution": "passes = int(input())\nprint(\"DONE\" if passes == 4 else f\"REMAINING: {4 - passes}\")",
              "solutionExplanation": "Four passes make a complete edit; anything fewer leaves work remaining.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "4 passes",
                  "hidden": false,
                  "stdin": "4\n",
                  "expectedStdout": "DONE"
                },
                {
                  "name": "2 passes",
                  "hidden": true,
                  "stdin": "2\n",
                  "expectedStdout": "REMAINING: 2"
                }
              ],
              "hintNotes": {
                "concept": "Editing in passes means counting them — structure, clarity, correctness, style.",
                "approach": "Check whether passes equals 4, else print how many remain.",
                "structure": "Structure: read the count, then one print with the verdict."
              },
              "id": "technical-writing-m5-l1-e1"
            }
          },
          {
            "id": "technical-writing-m5-l2",
            "slug": "technical-writing-m5-l2",
            "title": "Docs as Code",
            "objectives": [
              "Explain what docs as code means and where it appears in real systems",
              "Apply docs as code to a small realistic problem",
              "Recognise the common mistakes people make with docs as code"
            ],
            "introduction": "In this lesson you will see docs as code in action, work through a guided example, and practise it yourself.",
            "concept": "Docs as code means treating documentation like software: write it in plain text (Markdown), keep it in version control, review it with pull requests, and build and test it in CI. The payoff is that docs stay in sync with the code they describe — a docs change rides the same PR as the code change — and that broken links and untested examples are caught automatically. The tooling is simple: a static site generator for the site, a link checker, and a test that runs every code example. The mindset shift is the point: documentation is part of the product, maintained with the same discipline as the code.",
            "syntax": "Markdown + version control + PR review + CI checks (links, examples)",
            "analogy": "Docs as code is like keeping the instruction manual in the same toolbox as the tools: when a tool changes, the manual is right there to change with it.",
            "exampleCode": "print(\"Docs in Markdown, in git, reviewed by PR\")\nprint(\"CI checks: links work, examples run\")\nprint(\"Docs change rides the same PR as the code change\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how docs as code is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Keeping docs in a wiki that nobody updates.",
              "Reviewing code changes without reviewing their docs.",
              "Publishing examples that CI never runs."
            ],
            "debugging": {
              "prompt": "This team keeps docs in a separate wiki nobody updates. What is wrong?",
              "buggyCode": "print(\"Docs in a wiki, updated never, code changed often\")",
              "fixedCode": "print(\"Docs in git, same PR as the code, CI checks links and examples\")",
              "explanation": "Separate docs drift from the code; docs as code keeps them together and checked."
            },
            "miniChallenge": "Extend the exercise: apply docs as code to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Docs as code: Markdown in version control, reviewed by PR, built and checked in CI — so documentation stays in sync with the code it describes.",
            "quiz": [
              {
                "question": "What is the main benefit of docs as code?",
                "options": [
                  "Prettier docs",
                  "Docs stay in sync with the code and are checked automatically",
                  "Faster writing",
                  "Fewer docs"
                ],
                "answer": 1,
                "explanation": "Version control plus CI means docs change with the code and broken links or examples are caught."
              },
              {
                "question": "What should CI check in documentation?",
                "options": [
                  "Spelling only",
                  "That links work and code examples run",
                  "The author's name",
                  "The file size"
                ],
                "answer": 1,
                "explanation": "Automated checks catch the two ways docs rot: dead links and examples that no longer run."
              }
            ],
            "exercise": {
              "title": "Docs freshness check",
              "type": "write-code",
              "instructions": "Write a program that reads the days since the docs were last updated and the days since the code changed, then prints STALE if docs are older than the code change, otherwise FRESH. (Docs are stale if docs_days > code_days.)",
              "starterCode": "docs_days = int(input())\ncode_days = int(input())\nprint(\"STALE\" if docs_days > code_days else \"FRESH\")",
              "solution": "docs_days = int(input())\ncode_days = int(input())\nprint(\"STALE\" if docs_days > code_days else \"FRESH\")",
              "solutionExplanation": "If the docs were updated longer ago than the last code change, they may not describe the current code.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Docs 30 days, code 5 days",
                  "hidden": false,
                  "stdin": "30\n5\n",
                  "expectedStdout": "STALE"
                },
                {
                  "name": "Docs 2 days, code 5 days",
                  "hidden": true,
                  "stdin": "2\n5\n",
                  "expectedStdout": "FRESH"
                }
              ],
              "hintNotes": {
                "concept": "Docs go stale when the code changes after them — compare the two ages.",
                "approach": "Check whether docs_days is greater than code_days.",
                "structure": "Structure: read two numbers, then one print with the verdict."
              },
              "id": "technical-writing-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
  buildCourse({
    "id": "agile-scrum",
    "slug": "agile-scrum",
    "language": "python",
    "category": "cs-career",
    "title": "Agile & Scrum",
    "description": "Work the agile way: the manifesto, Scrum roles and events, user stories, estimation, Kanban, scaling, and the anti-patterns to avoid.",
    "difficulty": "All levels",
    "estimatedHours": 20,
    "skills": [
      "Agile manifesto",
      "Scrum roles",
      "Sprint planning",
      "Standups",
      "Retrospectives",
      "User stories",
      "Estimation",
      "Kanban"
    ],
    "prerequisites": [
      "Basic Python programming"
    ],
    "modules": [
      {
        "id": "agile-scrum-m1",
        "title": "Agile Foundations",
        "description": "The manifesto and the Scrum roles.",
        "level": "beginner",
        "order": 1,
        "lessons": [
          {
            "id": "agile-scrum-m1-l1",
            "slug": "agile-scrum-m1-l1",
            "title": "The Agile Manifesto",
            "objectives": [
              "Explain what the Agile manifesto means and where it appears in real systems",
              "Apply the Agile manifesto to a small realistic problem",
              "Recognise the common mistakes people make with the Agile manifesto"
            ],
            "introduction": "Here you will get hands-on with the Agile manifesto: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "The Agile Manifesto, written in 2001, values four things: individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, and responding to change over following a plan. The items on the right still matter — documentation and plans have their place — but the items on the left matter more. Behind the values are twelve principles, including delivering working software frequently, welcoming changing requirements, and reflecting regularly on how to become more effective. Agile is a mindset about feedback and adaptation, not a set of meetings — teams that adopt the ceremonies without the mindset get the overhead without the benefit.",
            "syntax": "4 values: people, working software, collaboration, responding to change",
            "analogy": "Agile is like sailing: you set a course, but you adjust the sails constantly as the wind changes — a rigid plan in a changing sea is a recipe for running aground.",
            "exampleCode": "print(\"Individuals and interactions over processes and tools\")\nprint(\"Working software over comprehensive documentation\")\nprint(\"Customer collaboration over contract negotiation\")\nprint(\"Responding to change over following a plan\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where the Agile manifesto does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Treating agile as a set of meetings instead of a mindset.",
              "Valuing the plan over responding to change.",
              "Measuring progress by documents produced instead of working software."
            ],
            "debugging": {
              "prompt": "This team follows every Scrum ceremony but never adapts to feedback. What is wrong?",
              "buggyCode": "print(\"All ceremonies, no adaptation\")",
              "fixedCode": "print(\"Ceremonies plus regular reflection and change\")",
              "explanation": "They adopted the meetings without the mindset — agile is feedback and adaptation, not a checklist of events."
            },
            "miniChallenge": "Extend the exercise: apply the Agile manifesto to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "The Agile Manifesto values people, working software, collaboration, and responding to change — a mindset of feedback and adaptation, not a checklist of ceremonies.",
            "quiz": [
              {
                "question": "What does the manifesto value over comprehensive documentation?",
                "options": [
                  "Nothing",
                  "Working software",
                  "More meetings",
                  "Faster typing"
                ],
                "answer": 1,
                "explanation": "Working software is the primary measure of progress; documentation supports it but does not replace it."
              },
              {
                "question": "What is the core of agile, beyond the ceremonies?",
                "options": [
                  "Daily standups",
                  "A mindset of feedback and adaptation",
                  "Sticky notes",
                  "Two-week sprints"
                ],
                "answer": 1,
                "explanation": "Agile is about short feedback loops and adapting to change; the meetings are just the mechanism."
              }
            ],
            "exercise": {
              "title": "Apply the manifesto",
              "type": "multiple-choice",
              "instructions": "A customer asks for a change mid-sprint. What does agile say?",
              "starterCode": "",
              "solution": "Welcome the change — responding to change matters more than following the plan",
              "solutionExplanation": "The manifesto explicitly values responding to change over following a plan, and welcomes changing requirements even late in development.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "The manifesto's fourth value is the answer: respond to change over following the plan.",
                "approach": "Look for the option that welcomes the change.",
                "structure": "Structure: values over process — change is welcomed, not feared."
              },
              "options": [
                "Refuse — the plan is fixed",
                "Welcome the change — responding to change matters more than following the plan",
                "Ignore the customer",
                "Restart the whole project"
              ],
              "answerIndex": 1,
              "id": "agile-scrum-m1-l1-e1"
            }
          },
          {
            "id": "agile-scrum-m1-l2",
            "slug": "agile-scrum-m1-l2",
            "title": "Scrum Roles",
            "objectives": [
              "Explain what Scrum roles means and where it appears in real systems",
              "Apply Scrum roles to a small realistic problem",
              "Recognise the common mistakes people make with Scrum roles"
            ],
            "introduction": "Here you will get hands-on with Scrum roles: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Scrum has three roles, and each has one clear accountability. The Product Owner owns the product backlog and decides what gets built and in what order — they are the single voice of priority. The Scrum Master serves the team by removing impediments and protecting the process, not by managing people. The Developers are the cross-functional team that builds the increment each sprint, self-managing how the work gets done. There is no project manager in Scrum: the accountabilities are distributed, which is why role confusion — a Product Owner who also acts as Scrum Master, or a manager who overrides the team — breaks the framework.",
            "syntax": "Product Owner: what + order; Scrum Master: process + impediments; Developers: build",
            "analogy": "Scrum roles are like a film crew: the producer decides what film gets made (Product Owner), the assistant director keeps the shoot running (Scrum Master), and the crew makes the film (Developers).",
            "exampleCode": "print(\"Product Owner: owns the backlog, sets priorities\")\nprint(\"Scrum Master: removes impediments, protects the process\")\nprint(\"Developers: build the increment, self-managing\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where Scrum roles does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Letting one person hold two Scrum roles and confusing accountabilities.",
              "A manager assigning tasks instead of the team self-managing.",
              "A Product Owner who never talks to users."
            ],
            "debugging": {
              "prompt": "This team's manager assigns tasks to developers daily. What is wrong?",
              "buggyCode": "print(\"Manager assigns tasks daily\")",
              "fixedCode": "print(\"Developers self-manage how the work gets done\")",
              "explanation": "Scrum has no task-assigning manager: the Developers self-manage, and the Scrum Master removes impediments."
            },
            "miniChallenge": "Extend the exercise: apply Scrum roles to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Scrum has three roles: the Product Owner owns priorities, the Scrum Master removes impediments, and the Developers self-manage the build — with no project manager.",
            "quiz": [
              {
                "question": "Who decides the order of the product backlog?",
                "options": [
                  "The Scrum Master",
                  "The Product Owner",
                  "The Developers",
                  "The manager"
                ],
                "answer": 1,
                "explanation": "The Product Owner is the single voice of priority for what gets built and when."
              },
              {
                "question": "What does the Scrum Master do?",
                "options": [
                  "Manage the developers",
                  "Remove impediments and protect the process",
                  "Write the code",
                  "Set the priorities"
                ],
                "answer": 1,
                "explanation": "The Scrum Master serves the team by clearing obstacles and guarding the framework — not by managing people."
              }
            ],
            "exercise": {
              "title": "Sprint capacity",
              "type": "write-code",
              "instructions": "Write a program that reads the number of developers and story points each can complete per sprint, then prints exactly: Capacity: <n> points.",
              "starterCode": "devs = int(input())\nper = int(input())\nprint(f\"Capacity: {devs * per} points\")",
              "solution": "devs = int(input())\nper = int(input())\nprint(f\"Capacity: {devs * per} points\")",
              "solutionExplanation": "Sprint capacity is the team size times the points each developer can complete.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5 devs x 8 points",
                  "hidden": false,
                  "stdin": "5\n8\n",
                  "expectedStdout": "Capacity: 40 points"
                },
                {
                  "name": "3 devs x 5 points",
                  "hidden": true,
                  "stdin": "3\n5\n",
                  "expectedStdout": "Capacity: 15 points"
                }
              ],
              "hintNotes": {
                "concept": "Capacity is the team's output — developers times points per developer.",
                "approach": "Multiply devs by per and print with the label.",
                "structure": "Structure: read two numbers, then one print with the capacity."
              },
              "id": "agile-scrum-m1-l2-e1"
            }
          }
        ]
      },
      {
        "id": "agile-scrum-m2",
        "title": "Scrum Events",
        "description": "Sprint planning, standups, and retrospectives.",
        "level": "beginner",
        "order": 2,
        "lessons": [
          {
            "id": "agile-scrum-m2-l1",
            "slug": "agile-scrum-m2-l1",
            "title": "Sprint Planning",
            "objectives": [
              "Explain what sprint planning means and where it appears in real systems",
              "Apply sprint planning to a small realistic problem",
              "Recognise the common mistakes people make with sprint planning"
            ],
            "introduction": "In this lesson you will see sprint planning in action, work through a guided example, and practise it yourself.",
            "concept": "Sprint planning answers two questions: what will we build this sprint, and how will we build it? The Product Owner brings the prioritised backlog, the Developers select the work they can complete and break it into tasks, and the team agrees on a sprint goal — one sentence describing the outcome, which keeps the sprint coherent when details change. Planning is time-boxed (two hours per week of sprint length is the guide) and the output is a sprint backlog the team owns. The most common failure is over-commitment: a team that plans for 100% of its capacity has no room for the unexpected, and the unexpected always arrives.",
            "syntax": "what + how + sprint goal; time-boxed; plan for less than 100%",
            "analogy": "Sprint planning is like packing a suitcase: you choose what fits, you leave room for souvenirs, and you agree on where you are going before you zip it shut.",
            "exampleCode": "print(\"Question 1: what will we build? (Product Owner + backlog)\")\nprint(\"Question 2: how will we build it? (Developers + tasks)\")\nprint(\"Output: sprint backlog + one-sentence sprint goal\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how sprint planning is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Planning for 100% of capacity with no slack.",
              "Starting a sprint without a goal, so the work has no coherence.",
              "Letting the Product Owner dictate how the work gets done."
            ],
            "debugging": {
              "prompt": "This team planned 100% of capacity and a production bug hit on day two. What went wrong?",
              "buggyCode": "print(\"Planned 100%, no slack, bug derailed the sprint\")",
              "fixedCode": "print(\"Planned 80%, slack absorbed the bug\")",
              "explanation": "With no slack, any surprise derails the plan — plan for less than full capacity so the unexpected fits."
            },
            "miniChallenge": "Extend the exercise: apply sprint planning to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Sprint planning answers what and how, produces a sprint backlog and a one-sentence goal, and plans for less than full capacity so surprises fit.",
            "quiz": [
              {
                "question": "What is a sprint goal?",
                "options": [
                  "A list of tasks",
                  "One sentence describing the outcome the sprint should achieve",
                  "A deadline",
                  "A bug count"
                ],
                "answer": 1,
                "explanation": "The sprint goal gives the sprint coherence: it states the outcome, so the team can adapt the details while keeping the aim."
              },
              {
                "question": "Why should a team not plan for 100% of its capacity?",
                "options": [
                  "To be lazy",
                  "The unexpected always arrives, and there must be room for it",
                  "Planning is inaccurate",
                  "It is forbidden"
                ],
                "answer": 1,
                "explanation": "A sprint with no slack cannot absorb surprises — and surprises are guaranteed."
              }
            ],
            "exercise": {
              "title": "Plan with slack",
              "type": "write-code",
              "instructions": "Write a program that reads total capacity in points and prints exactly: Planned: <n> points. Plan for 80% of capacity, rounded down.",
              "starterCode": "capacity = int(input())\nprint(f\"Planned: {capacity * 80 // 100} points\")",
              "solution": "capacity = int(input())\nprint(f\"Planned: {capacity * 80 // 100} points\")",
              "solutionExplanation": "80% of capacity is capacity * 80 // 100; the remaining 20% is slack for the unexpected.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Capacity 40",
                  "hidden": false,
                  "stdin": "40\n",
                  "expectedStdout": "Planned: 32 points"
                },
                {
                  "name": "Capacity 25",
                  "hidden": true,
                  "stdin": "25\n",
                  "expectedStdout": "Planned: 20 points"
                }
              ],
              "hintNotes": {
                "concept": "Planning for 80% leaves slack for the surprises that always arrive.",
                "approach": "Compute capacity * 80 // 100.",
                "structure": "Structure: read the capacity, then one print with the planned points."
              },
              "id": "agile-scrum-m2-l1-e1"
            }
          },
          {
            "id": "agile-scrum-m2-l2",
            "slug": "agile-scrum-m2-l2",
            "title": "Daily Standups and Retrospectives",
            "objectives": [
              "Explain what standups and retrospectives means and where it appears in real systems",
              "Apply standups and retrospectives to a small realistic problem",
              "Recognise the common mistakes people make with standups and retrospectives"
            ],
            "introduction": "This lesson introduces standups and retrospectives. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "The daily standup is a 15-minute coordination meeting, not a status report: each person answers what they did, what they will do, and what is blocking them — and blockers get handled after, not during. The retrospective is the sprint's learning loop: the team asks what went well, what did not, and what to change, and commits to one or two concrete improvements for the next sprint. Retrospectives fail when they become complaint sessions with no action, or when the same improvement is agreed every sprint and never done. The discipline is small and specific: one improvement, one owner, one deadline.",
            "syntax": "standup: 15 min, did/will do/blocked; retro: what worked, what did not, one improvement with an owner",
            "analogy": "A standup is like a sports team's huddle: quick, focused on the next play, and over in a minute. A retrospective is the video review after the match: what worked, what did not, and one thing to fix.",
            "exampleCode": "print(\"Standup: did, will do, blocked — 15 minutes, blockers after\")\nprint(\"Retro: went well, did not, change — one improvement, one owner\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem standups and retrospectives solves in plain words.",
              "Follow the example step by step and note where standups and retrospectives changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Turning the standup into a status report for the manager.",
              "Solving problems in the standup instead of after it.",
              "Running retrospectives with no owned actions."
            ],
            "debugging": {
              "prompt": "This standup lasts 45 minutes and solves every problem in the meeting. What is wrong?",
              "buggyCode": "print(\"45-minute standup, problems solved in the meeting\")",
              "fixedCode": "print(\"15-minute standup, blockers handled after\")",
              "explanation": "The standup is time-boxed to 15 minutes for coordination; detailed problem-solving happens afterwards with only those involved."
            },
            "miniChallenge": "Extend the exercise: apply standups and retrospectives to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Standups coordinate in 15 minutes (did, will do, blocked); retrospectives learn from the sprint and commit to one owned improvement at a time.",
            "quiz": [
              {
                "question": "What is a standup for?",
                "options": [
                  "Status reporting to the manager",
                  "Coordination — surfacing blockers so the team can help",
                  "Planning the sprint",
                  "Performance reviews"
                ],
                "answer": 1,
                "explanation": "The standup coordinates the team: what is done, what is next, and what is blocked."
              },
              {
                "question": "What makes a retrospective work?",
                "options": [
                  "Long complaints",
                  "One or two concrete improvements, each with an owner and a deadline",
                  "Blaming individuals",
                  "Skipping it when busy"
                ],
                "answer": 1,
                "explanation": "A retro without an owned action is just a complaint session; one improvement done beats five agreed and forgotten."
              }
            ],
            "exercise": {
              "title": "Standup time check",
              "type": "write-code",
              "instructions": "Write a program that reads the standup length in minutes and prints TOO LONG if it exceeds 15, otherwise OK.",
              "starterCode": "minutes = int(input())\nprint(\"TOO LONG\" if minutes > 15 else \"OK\")",
              "solution": "minutes = int(input())\nprint(\"TOO LONG\" if minutes > 15 else \"OK\")",
              "solutionExplanation": "A standup is time-boxed to 15 minutes; longer means it has become a working meeting.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "15 minutes",
                  "hidden": false,
                  "stdin": "15\n",
                  "expectedStdout": "OK"
                },
                {
                  "name": "45 minutes",
                  "hidden": true,
                  "stdin": "45\n",
                  "expectedStdout": "TOO LONG"
                }
              ],
              "hintNotes": {
                "concept": "The standup's time-box is 15 minutes — coordination, not problem-solving.",
                "approach": "Compare the length with 15 and print the verdict.",
                "structure": "Structure: read the minutes, then one print with the comparison."
              },
              "id": "agile-scrum-m2-l2-e1"
            }
          }
        ]
      },
      {
        "id": "agile-scrum-m3",
        "title": "Backlog and Estimation",
        "description": "User stories, estimation, and velocity.",
        "level": "intermediate",
        "order": 3,
        "lessons": [
          {
            "id": "agile-scrum-m3-l1",
            "slug": "agile-scrum-m3-l1",
            "title": "User Stories",
            "objectives": [
              "Explain what user stories means and where it appears in real systems",
              "Apply user stories to a small realistic problem",
              "Recognise the common mistakes people make with user stories"
            ],
            "introduction": "Here you will get hands-on with user stories: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "A user story describes a feature from the user's point of view in one sentence: 'As a [user], I want [goal], so that [benefit].' The format forces the team to think about who benefits and why, instead of building features nobody asked for. Stories are refined with acceptance criteria — the specific, testable conditions that mean the story is done — and split until each one fits in a sprint. The INVEST guide says a good story is Independent, Negotiable, Valuable, Estimable, Small, and Testable. A story without acceptance criteria is a wish, not a plan.",
            "syntax": "As a [user], I want [goal], so that [benefit] + acceptance criteria; INVEST",
            "analogy": "A user story is like a restaurant order written for the kitchen: who it is for, what they want, and why — so the cook knows what success looks like.",
            "exampleCode": "print(\"As a shopper, I want to save my cart, so that I can finish checkout later.\")\nprint(\"Acceptance: cart persists after logout; restores on login.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where user stories does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Writing stories as technical tasks with no user or benefit.",
              "Skipping acceptance criteria, so 'done' is a matter of opinion.",
              "Keeping stories so big they cannot fit in a sprint."
            ],
            "debugging": {
              "prompt": "This 'story' has no user, no benefit, and no acceptance criteria. What is wrong?",
              "buggyCode": "print(\"Build the cart feature.\")",
              "fixedCode": "print(\"As a shopper, I want to save my cart, so that I can finish checkout later. Acceptance: cart persists after logout.\")",
              "explanation": "A story needs a user, a goal, a benefit, and testable acceptance criteria — otherwise it is a wish, not a plan."
            },
            "miniChallenge": "Extend the exercise: apply user stories to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "User stories are written for a user with a benefit, refined with testable acceptance criteria, and split until they fit a sprint (INVEST).",
            "quiz": [
              {
                "question": "What does the 'so that' part of a user story do?",
                "options": [
                  "It adds length",
                  "It states the benefit — why the user wants it",
                  "It names the developer",
                  "It sets the deadline"
                ],
                "answer": 1,
                "explanation": "The benefit explains the value, which is what lets the team prioritise and judge whether the story is worth building."
              },
              {
                "question": "What does INVEST stand for in a good story?",
                "options": [
                  "Independent, Negotiable, Valuable, Estimable, Small, Testable",
                  "Important, New, Valuable, Easy, Short, Tested",
                  "It is a bank",
                  "It is a framework for testing"
                ],
                "answer": 0,
                "explanation": "INVEST is the checklist for a story that can be planned, built, and verified in a sprint."
              }
            ],
            "exercise": {
              "title": "Story point total",
              "type": "write-code",
              "instructions": "Write a program that reads three story point estimates (space-separated) and prints exactly: Total: <n> points.",
              "starterCode": "points = [int(x) for x in input().split()]\nprint(f\"Total: {sum(points)} points\")",
              "solution": "points = [int(x) for x in input().split()]\nprint(f\"Total: {sum(points)} points\")",
              "solutionExplanation": "Add the three story point estimates to get the total for the sprint.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "3 5 8",
                  "hidden": false,
                  "stdin": "3 5 8\n",
                  "expectedStdout": "Total: 16 points"
                },
                {
                  "name": "1 2 3",
                  "hidden": true,
                  "stdin": "1 2 3\n",
                  "expectedStdout": "Total: 6 points"
                }
              ],
              "hintNotes": {
                "concept": "Story points add up — the total is the sprint's planned load.",
                "approach": "Sum the three numbers and print with the label.",
                "structure": "Structure: read the numbers, sum them, print the total."
              },
              "id": "agile-scrum-m3-l1-e1"
            }
          },
          {
            "id": "agile-scrum-m3-l2",
            "slug": "agile-scrum-m3-l2",
            "title": "Estimation and Velocity",
            "objectives": [
              "Explain what estimation and velocity means and where it appears in real systems",
              "Apply estimation and velocity to a small realistic problem",
              "Recognise the common mistakes people make with estimation and velocity"
            ],
            "introduction": "Here you will get hands-on with estimation and velocity: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Estimation in agile uses story points — relative sizes, not hours — because humans are better at comparing ('this is twice as big as that') than at absolute guessing. Planning poker makes the team estimate together, surfacing the different assumptions that cause the biggest errors. Velocity is the number of points a team completes per sprint, averaged over several sprints: it is a planning tool, not a performance target, and it must never be compared across teams. The most common mistake is treating points as hours and then wondering why the estimates are always wrong — points measure complexity and uncertainty, not time.",
            "syntax": "story points: relative size; velocity: points per sprint, for planning only",
            "analogy": "Story points are like T-shirt sizes: S, M, L, XL compare easily, while guessing the exact centimetres of every shirt is a fool's errand.",
            "exampleCode": "print(\"Points: relative size, not hours\")\nprint(\"Planning poker: estimate together, surface assumptions\")\nprint(\"Velocity: average points per sprint — planning, not a target\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where estimation and velocity does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Treating story points as hours.",
              "Comparing velocity across teams.",
              "Using velocity as a performance target, which inflates estimates."
            ],
            "debugging": {
              "prompt": "This manager compares two teams' velocities and rewards the faster one. What is wrong?",
              "buggyCode": "print(\"Team A: 40 points, Team B: 25 points — A is better\")",
              "fixedCode": "print(\"Velocity is for a team’s own planning, never for comparison\")",
              "explanation": "Points are relative to each team, so cross-team velocity comparison is meaningless — and rewarding it inflates the estimates."
            },
            "miniChallenge": "Extend the exercise: apply estimation and velocity to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Story points are relative sizes estimated together; velocity is the team's average points per sprint — a planning tool, never a target or a comparison.",
            "quiz": [
              {
                "question": "Why use story points instead of hours?",
                "options": [
                  "Points are faster",
                  "Humans compare sizes relatively far better than they guess absolute time",
                  "Points are more precise",
                  "Hours are banned"
                ],
                "answer": 1,
                "explanation": "Relative estimation ('twice as big as that') is far more reliable than absolute hour guesses."
              },
              {
                "question": "What is velocity for?",
                "options": [
                  "Judging developers",
                  "Planning how much the team can take on next sprint",
                  "Comparing teams",
                  "Setting salaries"
                ],
                "answer": 1,
                "explanation": "Velocity is a forecasting tool for the team's own planning — never a performance metric or a cross-team comparison."
              }
            ],
            "exercise": {
              "title": "Compute velocity",
              "type": "write-code",
              "instructions": "Write a program that reads three sprints' completed points (space-separated) and prints exactly: Velocity: <n> with one decimal place (the average).",
              "starterCode": "points = [int(x) for x in input().split()]\nprint(f\"Velocity: {sum(points) / len(points):.1f}\")",
              "solution": "points = [int(x) for x in input().split()]\nprint(f\"Velocity: {sum(points) / len(points):.1f}\")",
              "solutionExplanation": "Velocity is the average points completed per sprint over the recent sprints.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "30 40 35",
                  "hidden": false,
                  "stdin": "30 40 35\n",
                  "expectedStdout": "Velocity: 35.0"
                },
                {
                  "name": "20 20 20",
                  "hidden": true,
                  "stdin": "20 20 20\n",
                  "expectedStdout": "Velocity: 20.0"
                }
              ],
              "hintNotes": {
                "concept": "Velocity is an average over several sprints, not a single sprint's total.",
                "approach": "Sum the points, divide by the count, format with :.1f.",
                "structure": "Structure: read the numbers, average them, print the velocity."
              },
              "id": "agile-scrum-m3-l2-e1"
            }
          }
        ]
      },
      {
        "id": "agile-scrum-m4",
        "title": "Kanban and Scaling",
        "description": "Flow, WIP limits, and scaling agile.",
        "level": "intermediate",
        "order": 4,
        "lessons": [
          {
            "id": "agile-scrum-m4-l1",
            "slug": "agile-scrum-m4-l1",
            "title": "Kanban Boards and Flow",
            "objectives": [
              "Explain what Kanban boards and flow means and where it appears in real systems",
              "Apply Kanban boards and flow to a small realistic problem",
              "Recognise the common mistakes people make with Kanban boards and flow"
            ],
            "introduction": "Here you will get hands-on with Kanban boards and flow: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Kanban is agile without sprints: work flows continuously through a board (To Do, Doing, Done), and the key control is the work-in-progress limit — how many items may be in Doing at once. The limit forces focus: a team with a WIP limit of three cannot start a fourth thing until one finishes, which is exactly the point, because starting everything and finishing nothing is the most common failure of knowledge work. Flow is measured with lead time (idea to delivery) and cycle time (start to finish), and the goal is to make both short and predictable. Kanban suits support and operations work, where priorities change daily and sprints would be a straitjacket.",
            "syntax": "board + WIP limit + flow (lead time, cycle time); continuous, no sprints",
            "analogy": "Kanban is like a narrow bridge: only a few cars may be on it at once, so traffic flows steadily instead of jamming — the WIP limit is the bridge's width.",
            "exampleCode": "print(\"Board: To Do -> Doing -> Done\")\nprint(\"WIP limit: max items in Doing\")\nprint(\"Lead time: idea to delivery. Cycle time: start to finish.\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where Kanban boards and flow does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Setting a WIP limit and then ignoring it.",
              "Measuring speed while ignoring lead time.",
              "Using Kanban for work that needs the commitment of a sprint."
            ],
            "debugging": {
              "prompt": "This team has 12 items in progress and finishes nothing. What is wrong?",
              "buggyCode": "print(\"12 in progress, 0 finished\")",
              "fixedCode": "print(\"WIP limit 3, finish one before starting the next\")",
              "explanation": "Without a WIP limit the team starts everything and finishes nothing — the limit forces completion."
            },
            "miniChallenge": "Extend the exercise: apply Kanban boards and flow to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Kanban flows work continuously through a board with a WIP limit that forces finishing; lead time and cycle time measure how fast and predictably work flows.",
            "quiz": [
              {
                "question": "What does a WIP limit do?",
                "options": [
                  "It slows the team down",
                  "It forces focus by capping how many items are in progress at once",
                  "It bans new work",
                  "It measures speed"
                ],
                "answer": 1,
                "explanation": "A WIP limit stops the team starting everything and finishing nothing — finish one thing before starting the next."
              },
              {
                "question": "What is cycle time?",
                "options": [
                  "Idea to delivery",
                  "Start to finish for one item",
                  "Sprint length",
                  "Meeting time"
                ],
                "answer": 1,
                "explanation": "Cycle time measures how long an item takes once work starts; lead time includes the wait before it starts."
              }
            ],
            "exercise": {
              "title": "Check the WIP limit",
              "type": "write-code",
              "instructions": "Write a program that reads the WIP limit and the items currently in progress, then prints OVER LIMIT if in progress exceeds the limit, otherwise OK.",
              "starterCode": "limit = int(input())\nwip = int(input())\nprint(\"OVER LIMIT\" if wip > limit else \"OK\")",
              "solution": "limit = int(input())\nwip = int(input())\nprint(\"OVER LIMIT\" if wip > limit else \"OK\")",
              "solutionExplanation": "Compare the in-progress count with the WIP limit; exceeding it means the team must finish something before starting more.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Limit 3, WIP 5",
                  "hidden": false,
                  "stdin": "3\n5\n",
                  "expectedStdout": "OVER LIMIT"
                },
                {
                  "name": "Limit 3, WIP 2",
                  "hidden": true,
                  "stdin": "3\n2\n",
                  "expectedStdout": "OK"
                }
              ],
              "hintNotes": {
                "concept": "A WIP limit is a cap — exceeding it is the signal to finish, not to start.",
                "approach": "Compare wip with limit and print the verdict.",
                "structure": "Structure: read two numbers, then one print with the comparison."
              },
              "id": "agile-scrum-m4-l1-e1"
            }
          },
          {
            "id": "agile-scrum-m4-l2",
            "slug": "agile-scrum-m4-l2",
            "title": "Scaling Agile",
            "objectives": [
              "Explain what scaling Agile means and where it appears in real systems",
              "Apply scaling Agile to a small realistic problem",
              "Recognise the common mistakes people make with scaling Agile"
            ],
            "introduction": "Here you will get hands-on with scaling Agile: first the idea, then an example, then your own attempt in the exercise.",
            "concept": "Scaling agile means coordinating many teams on one product without losing the feedback loops that make agile work. The common patterns are a shared backlog with one Product Owner per area, a Scrum of Scrums where teams coordinate dependencies, and a regular cadence (like a quarterly planning event) where all teams align. The failure mode is scaling the ceremonies without the mindset: fifteen teams doing standups but never talking to each other is not scaled agile, it is scaled theatre. The test of any scaling framework is whether a team can still ship independently and get feedback quickly — if scaling slows delivery, the scaling is wrong.",
            "syntax": "shared backlog, Scrum of Scrums, quarterly alignment; ship independently",
            "analogy": "Scaling agile is like conducting an orchestra: each section plays its own part, but they share a score and a conductor, and the music only works if they listen to each other.",
            "exampleCode": "print(\"Shared backlog, one Product Owner per area\")\nprint(\"Scrum of Scrums: teams coordinate dependencies\")\nprint(\"Quarterly planning: all teams align\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Look at the example's input and output first, before reading the code.",
              "Trace the code and mark the exact line where scaling Agile does its work.",
              "Try a boundary input (zero, one, or a very large value) and see what happens."
            ],
            "commonMistakes": [
              "Scaling ceremonies without scaling coordination.",
              "Making teams depend on each other for every release.",
              "Choosing a framework before understanding the coordination problem."
            ],
            "debugging": {
              "prompt": "Fifteen teams do standups but never coordinate, and releases take months. What is wrong?",
              "buggyCode": "print(\"15 teams, no coordination, slow releases\")",
              "fixedCode": "print(\"Shared backlog, Scrum of Scrums, quarterly alignment\")",
              "explanation": "The ceremonies were scaled but not the coordination — teams need shared backlogs and cross-team sync to ship together."
            },
            "miniChallenge": "Extend the exercise: apply scaling Agile to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Scaling agile coordinates many teams through shared backlogs, Scrum of Scrums, and regular alignment — while keeping each team's ability to ship independently.",
            "quiz": [
              {
                "question": "What is a Scrum of Scrums?",
                "options": [
                  "A bigger standup",
                  "A coordination meeting where teams share dependencies and blockers",
                  "A retrospective for managers",
                  "A planning event"
                ],
                "answer": 1,
                "explanation": "Scrum of Scrums coordinates across teams: each team sends a representative to surface cross-team blockers."
              },
              {
                "question": "What is the test of a scaling framework?",
                "options": [
                  "More meetings",
                  "Teams can still ship independently and get feedback quickly",
                  "More teams",
                  "Longer sprints"
                ],
                "answer": 1,
                "explanation": "Scaling must preserve fast feedback and independent delivery — if it slows shipping, the scaling is wrong."
              }
            ],
            "exercise": {
              "title": "Count coordination meetings",
              "type": "write-code",
              "instructions": "Write a program that reads the number of teams and prints exactly: Scrum of Scrums reps: <n>. One representative per team attends.",
              "starterCode": "teams = int(input())\nprint(f\"Scrum of Scrums reps: {teams}\")",
              "solution": "teams = int(input())\nprint(f\"Scrum of Scrums reps: {teams}\")",
              "solutionExplanation": "Each team sends one representative to the Scrum of Scrums.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "5 teams",
                  "hidden": false,
                  "stdin": "5\n",
                  "expectedStdout": "Scrum of Scrums reps: 5"
                },
                {
                  "name": "8 teams",
                  "hidden": true,
                  "stdin": "8\n",
                  "expectedStdout": "Scrum of Scrums reps: 8"
                }
              ],
              "hintNotes": {
                "concept": "Coordination scales by representation — one rep per team.",
                "approach": "The count is just the number of teams.",
                "structure": "Structure: read the team count, then one print."
              },
              "id": "agile-scrum-m4-l2-e1"
            }
          }
        ]
      },
      {
        "id": "agile-scrum-m5",
        "title": "Agile in Practice",
        "description": "Running your first sprint and avoiding anti-patterns.",
        "level": "advanced",
        "order": 5,
        "lessons": [
          {
            "id": "agile-scrum-m5-l1",
            "slug": "agile-scrum-m5-l1",
            "title": "Running Your First Sprint",
            "objectives": [
              "Explain what running your first sprint means and where it appears in real systems",
              "Apply running your first sprint to a small realistic problem",
              "Recognise the common mistakes people make with running your first sprint"
            ],
            "introduction": "This lesson introduces running your first sprint. You will learn how it works, study a working example, and then try it in the exercise.",
            "concept": "Running a first sprint is mostly about keeping it small and honest: pick a one-week sprint, a goal the team can state in one sentence, and a backlog of three to five small stories. Hold the events but keep them short — planning under an hour, standups at 15 minutes, a demo at the end, and a retrospective with one improvement. The demo is the sprint's proof: show working software to a real stakeholder, not slides about progress. And expect the first sprint to go badly — the velocity will be wrong, the estimates will be off, and that is fine, because the retrospective exists to fix exactly those things for sprint two.",
            "syntax": "one week, one goal, 3-5 small stories, demo working software, expect imperfection",
            "analogy": "A first sprint is like a first rehearsal: the point is not a perfect performance but learning how the band plays together — and the demo is the audience hearing the song.",
            "exampleCode": "print(\"Sprint 1: one week, one goal, 3-5 small stories\")\nprint(\"Demo working software to a real stakeholder\")\nprint(\"Retro: one improvement for sprint 2\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Start by naming the problem running your first sprint solves in plain words.",
              "Follow the example step by step and note where running your first sprint changes the result.",
              "Re-run the idea with a different input and explain the output out loud."
            ],
            "commonMistakes": [
              "Planning twenty stories for a first sprint.",
              "Skipping the demo and showing slides instead.",
              "Treating the first sprint's velocity as a promise instead of a guess."
            ],
            "debugging": {
              "prompt": "This team's first sprint has 20 stories and no demo. What is wrong?",
              "buggyCode": "print(\"20 stories, no demo, two-week sprint\")",
              "fixedCode": "print(\"4 stories, one goal, demo at the end\")",
              "explanation": "A first sprint must be small and end with a demo of working software — twenty stories with no demo proves nothing."
            },
            "miniChallenge": "Extend the exercise: apply running your first sprint to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "A first sprint is small and honest: one week, one goal, a few small stories, a demo of working software, and a retrospective that fixes what went wrong.",
            "quiz": [
              {
                "question": "What is the demo for at the end of a sprint?",
                "options": [
                  "Showing slides about progress",
                  "Showing working software to a real stakeholder",
                  "Celebrating",
                  "Planning the next sprint"
                ],
                "answer": 1,
                "explanation": "The demo proves the sprint produced working software — it is the feedback moment with the people who use it."
              },
              {
                "question": "What should you expect from a first sprint?",
                "options": [
                  "Perfection",
                  "Wrong velocity and off estimates — the retrospective fixes them for sprint two",
                  "No problems",
                  "A finished product"
                ],
                "answer": 1,
                "explanation": "First sprints are for learning the rhythm; the retrospective turns the mistakes into improvements."
              }
            ],
            "exercise": {
              "title": "Sprint load check",
              "type": "write-code",
              "instructions": "Write a program that reads the number of stories planned and prints TOO MANY if there are more than 5, otherwise OK. (First sprints stay small: 3-5 stories.)",
              "starterCode": "stories = int(input())\nprint(\"TOO MANY\" if stories > 5 else \"OK\")",
              "solution": "stories = int(input())\nprint(\"TOO MANY\" if stories > 5 else \"OK\")",
              "solutionExplanation": "A first sprint holds three to five small stories; more than that is over-commitment.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "4 stories",
                  "hidden": false,
                  "stdin": "4\n",
                  "expectedStdout": "OK"
                },
                {
                  "name": "20 stories",
                  "hidden": true,
                  "stdin": "20\n",
                  "expectedStdout": "TOO MANY"
                }
              ],
              "hintNotes": {
                "concept": "A first sprint is small by design — a handful of stories and one goal.",
                "approach": "Compare the count with 5 and print the verdict.",
                "structure": "Structure: read the count, then one print with the comparison."
              },
              "id": "agile-scrum-m5-l1-e1"
            }
          },
          {
            "id": "agile-scrum-m5-l2",
            "slug": "agile-scrum-m5-l2",
            "title": "Agile Anti-Patterns",
            "objectives": [
              "Explain what Agile anti-patterns means and where it appears in real systems",
              "Apply Agile anti-patterns to a small realistic problem",
              "Recognise the common mistakes people make with Agile anti-patterns"
            ],
            "introduction": "In this lesson you will see Agile anti-patterns in action, work through a guided example, and practise it yourself.",
            "concept": "Anti-patterns are the ways agile goes wrong while looking right. Scrumfall is waterfall with standups: fixed scope, fixed dates, and sprints in name only. The 'agile' manager who assigns tasks and demands status reports has kept command-and-control and added meetings. Zombie Scrum is a team that does all the ceremonies and delivers nothing — the standup is a ritual, the retro changes nothing, and the demo shows slides. The cure is always the same: return to the manifesto's values and ask whether the team is actually getting feedback faster and delivering working software more often. If the answer is no, the process is theatre, whatever it is called.",
            "syntax": "Scrumfall, command-and-control 'agile', zombie Scrum — ceremonies without feedback",
            "analogy": "Agile anti-patterns are like a gym membership you never use: the card says you are fit, the ceremonies say you are agile, but nothing has actually changed.",
            "exampleCode": "print(\"Scrumfall: waterfall with standups\")\nprint(\"Command-and-control agile: manager assigns, meetings added\")\nprint(\"Zombie Scrum: all ceremonies, no delivery\")",
            "exampleLanguage": "python",
            "walkthrough": [
              "Read the example and trace how Agile anti-patterns is used, line by line.",
              "Identify the key decision in the example and why it was made that way.",
              "Change one input value, predict the new output, then check it."
            ],
            "commonMistakes": [
              "Calling fixed-scope waterfall 'agile' because it has standups.",
              "Doing ceremonies that change nothing.",
              "Measuring agile by meetings held instead of software delivered."
            ],
            "debugging": {
              "prompt": "This team holds every ceremony but ships nothing and never changes anything. What is it?",
              "buggyCode": "print(\"All ceremonies, no delivery, no change\")",
              "fixedCode": "print(\"Zombie Scrum — ceremonies without feedback or delivery\")",
              "explanation": "The ceremonies are theatre if they produce no feedback and no working software — the manifesto's values are the test."
            },
            "miniChallenge": "Extend the exercise: apply Agile anti-patterns to a new input of your own choosing and verify the result by hand before running it.",
            "summary": "Anti-patterns — Scrumfall, command-and-control agile, zombie Scrum — are ceremonies without the mindset; the test is always whether feedback is faster and software ships more often.",
            "quiz": [
              {
                "question": "What is Scrumfall?",
                "options": [
                  "Scrum done well",
                  "Waterfall with standups — fixed scope and dates, sprints in name only",
                  "A type of retrospective",
                  "A Kanban board"
                ],
                "answer": 1,
                "explanation": "Scrumfall keeps waterfall's fixed plan and adds agile meetings on top — the worst of both."
              },
              {
                "question": "What is zombie Scrum?",
                "options": [
                  "A Halloween event",
                  "A team that does all the ceremonies but delivers nothing",
                  "Scrum without a Product Owner",
                  "A fast team"
                ],
                "answer": 1,
                "explanation": "Zombie Scrum is ritual without results: standups, retros, and demos that change nothing."
              }
            ],
            "exercise": {
              "title": "Spot the anti-pattern",
              "type": "multiple-choice",
              "instructions": "A manager assigns tasks daily, demands status reports, and calls the team 'agile' because it holds standups. What is this?",
              "starterCode": "",
              "solution": "Command-and-control agile — the old hierarchy with meetings added",
              "solutionExplanation": "Agile has no task-assigning manager and no status reports; adding standups to command-and-control does not make it agile.",
              "complexity": "Easy",
              "tests": [
                {
                  "name": "Graded by answer",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Agile means self-managing teams — a manager assigning tasks is the opposite.",
                "approach": "Look for the option that names the old hierarchy with meetings added.",
                "structure": "Structure: ceremonies without the mindset are theatre."
              },
              "options": [
                "Proper Scrum",
                "Command-and-control agile — the old hierarchy with meetings added",
                "Kanban",
                "A healthy team"
              ],
              "answerIndex": 1,
              "id": "agile-scrum-m5-l2-e1"
            }
          }
        ]
      }
    ]
  }),
];

export const SHORT_ASSESSMENTS_CS: MasteryAssessment[] = [
  buildShortAssessment(
    "operating-systems",
    [
      {
        "id": "operating-systems-a1",
        "kind": "conceptual",
        "topic": "Kernel",
        "question": "What is the kernel?",
        "options": [
          "The desktop wallpaper program",
          "The privileged core of the OS that manages hardware",
          "A user application",
          "The compiler"
        ],
        "answer": 1,
        "explanation": "The kernel is the OS core running in privileged mode, managing hardware and mediating access."
      },
      {
        "id": "operating-systems-a2",
        "kind": "conceptual",
        "topic": "Scheduling",
        "question": "Which scheduler gives every ready process a short time slice in turn?",
        "options": [
          "FCFS",
          "SJF",
          "Round-robin",
          "Priority without preemption"
        ],
        "answer": 2,
        "explanation": "Round-robin cycles through ready processes, giving each a fixed quantum."
      },
      {
        "id": "operating-systems-a3",
        "kind": "conceptual",
        "topic": "Paging",
        "question": "Why does paging avoid external fragmentation?",
        "options": [
          "Pages are variable size",
          "All pages are the same size, so any free frame fits any page",
          "Page tables live on disk",
          "Frames are bigger than pages"
        ],
        "answer": 1,
        "explanation": "Fixed-size pages make every free frame interchangeable."
      },
      {
        "id": "operating-systems-a4",
        "kind": "conceptual",
        "topic": "Deadlock",
        "question": "Which is NOT one of the four deadlock conditions?",
        "options": [
          "Mutual exclusion",
          "Hold-and-wait",
          "Circular wait",
          "Fair scheduling"
        ],
        "answer": 3,
        "explanation": "Fair scheduling is not a Coffman condition; the four are mutual exclusion, hold-and-wait, no preemption, and circular wait."
      },
      {
        "id": "operating-systems-a5",
        "kind": "conceptual",
        "topic": "File systems",
        "question": "Where does a file's name live?",
        "options": [
          "Inside the inode",
          "In the directory entry that points to the inode",
          "In the file's first block",
          "In the kernel's memory only"
        ],
        "answer": 1,
        "explanation": "Directories map names to inode numbers; the inode itself holds metadata, not the name."
      },
      {
        "id": "operating-systems-a6",
        "kind": "code-reading",
        "topic": "Virtual memory",
        "question": "What does this print?\nint addr = 5000, size = 1024;\nprintf(\"%d %d\", addr / size, addr % size);",
        "options": [
          "4 904",
          "5 0",
          "4 5000",
          "5000 4"
        ],
        "answer": 0,
        "explanation": "5000 / 1024 = 4 and 5000 % 1024 = 904.",
        "code": "int addr = 5000, size = 1024;\nprintf(\"%d %d\", addr / size, addr % size);"
      },
      {
        "id": "operating-systems-a7",
        "kind": "code-reading",
        "topic": "Scheduling",
        "question": "For bursts 2, 4, 6 under FCFS, what is the average waiting time?",
        "options": [
          "2.00",
          "2.67",
          "4.00",
          "6.00"
        ],
        "answer": 1,
        "explanation": "Waiting times are 0, 2, 6; average (0+2+6)/3 = 2.67.",
        "code": "int b1=2, b2=4, b3=6; // FCFS waits: 0, b1, b1+b2"
      },
      {
        "id": "operating-systems-a8",
        "kind": "code-reading",
        "topic": "Threads",
        "question": "How many total increments do 3 threads performing 200 each produce?",
        "options": [
          "200",
          "600",
          "203",
          "3200"
        ],
        "answer": 1,
        "explanation": "Total work is 3 * 200 = 600 increments.",
        "code": "int threads = 3, per = 200; // total = threads * per"
      },
      {
        "id": "operating-systems-a9",
        "kind": "debugging",
        "topic": "Paging",
        "question": "This code should print the starting byte of page 2 with 4096-byte pages (8192). What is wrong?\nint page = 2, size = 4096;\nprintf(\"%d\", page + size);",
        "options": [
          "It adds instead of multiplying",
          "It uses the wrong page number",
          "printf needs %f",
          "size should be 1024"
        ],
        "answer": 0,
        "explanation": "The starting byte is page * size = 8192, not page + size.",
        "code": "int page = 2, size = 4096;\nprintf(\"%d\", page + size);"
      },
      {
        "id": "operating-systems-a10",
        "kind": "debugging",
        "topic": "Deadlock",
        "question": "This check should print SAFE when a request of 3 fits 5 available resources, but it prints DEADLOCK RISK. What is wrong?\nif (requested >= available) printf(\"SAFE\"); else printf(\"DEADLOCK RISK\");",
        "options": [
          "The comparison is backwards",
          "requested and available are swapped in the input",
          "printf is missing a newline",
          "SAFE should be printed in both branches"
        ],
        "answer": 0,
        "explanation": "SAFE requires requested <= available; the >= test inverts the decision.",
        "code": "if (requested >= available) printf(\"SAFE\"); else printf(\"DEADLOCK RISK\");"
      }
    ],
    {
      "title": "Count pages for a memory size",
      "type": "write-code",
      "instructions": "Write a program that reads a total memory size in bytes and a page size, then prints exactly: Pages: <n>. Assume the memory size is an exact multiple of the page size.",
      "starterCode": "#include <stdio.h>\nint main(void) {\n    int total, size;\n    scanf(\"%d %d\", &total, &size);\n    // print Pages: <total / size>\n    return 0;\n}",
      "solution": "#include <stdio.h>\nint main(void) {\n    int total, size;\n    scanf(\"%d %d\", &total, &size);\n    printf(\"Pages: %d\\n\", total / size);\n    return 0;\n}",
      "solutionExplanation": "Divide the total memory by the page size to get the number of pages.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "65536 bytes, 4096 pages",
          "hidden": false,
          "stdin": "65536 4096\n",
          "expectedStdout": "Pages: 16"
        },
        {
          "name": "32768 bytes, 1024 pages",
          "hidden": true,
          "stdin": "32768 1024\n",
          "expectedStdout": "Pages: 32"
        }
      ],
      "hintNotes": {
        "concept": "Paging divides memory into equal blocks, so the count is a simple division.",
        "approach": "Divide total by size and print the result with the Pages: label.",
        "structure": "Structure: read both numbers, then one printf with total / size."
      },
      "language": "c",
      "id": "operating-systems-assessment-e1"
    },
    {
      "title": "Mini operating system simulator",
      "description": "Build a small C program that simulates the core of an OS: a ready queue with FCFS scheduling, a page table that maps virtual pages to frames, and a lock that guards a shared counter.",
      "requirements": [
        "Simulate a ready queue of at least 3 processes and report each one's waiting time under FCFS",
        "Implement a page table lookup that converts a virtual page to a frame number",
        "Guard a shared counter with a lock concept and show the correct total after all threads finish",
        "Handle invalid inputs (negative burst, unknown page) with a clear error message"
      ],
      "rubric": [
        "FCFS waiting times are correct for the given bursts",
        "Page lookups return the right frame or a clear miss",
        "The shared counter total is correct with no lost updates",
        "Invalid input produces a clear error instead of crashing"
      ]
    },
  ),
  buildShortAssessment(
    "computer-networks",
    [
      {
        "id": "computer-networks-a1",
        "kind": "conceptual",
        "topic": "OSI model",
        "question": "Which OSI layer handles routing between networks?",
        "options": [
          "Data Link",
          "Network",
          "Transport",
          "Session"
        ],
        "answer": 1,
        "explanation": "The network layer routes packets across networks using IP addresses."
      },
      {
        "id": "computer-networks-a2",
        "kind": "conceptual",
        "topic": "TCP vs UDP",
        "question": "Which application is the best fit for UDP?",
        "options": [
          "File download",
          "Live video call",
          "Email",
          "Banking transaction"
        ],
        "answer": 1,
        "explanation": "Live media values low latency over reliability, which is UDP's trade-off."
      },
      {
        "id": "computer-networks-a3",
        "kind": "conceptual",
        "topic": "DNS",
        "question": "What does DNS resolve?",
        "options": [
          "IP addresses to MAC addresses",
          "Hostnames to IP addresses",
          "Ports to protocols",
          "URLs to passwords"
        ],
        "answer": 1,
        "explanation": "DNS translates hostnames like example.com into IP addresses."
      },
      {
        "id": "computer-networks-a4",
        "kind": "conceptual",
        "topic": "TLS",
        "question": "What does a TLS certificate prove?",
        "options": [
          "The site is honest",
          "The server owns the domain, vouched for by a trusted authority",
          "The site is fast",
          "The user's password is safe"
        ],
        "answer": 1,
        "explanation": "A certificate binds a key to a domain; it proves ownership, not honesty."
      },
      {
        "id": "computer-networks-a5",
        "kind": "conceptual",
        "topic": "NAT",
        "question": "What does NAT do?",
        "options": [
          "Encrypts traffic",
          "Lets many private devices share one public IP address",
          "Speeds up DNS",
          "Blocks all ports"
        ],
        "answer": 1,
        "explanation": "NAT rewrites private source addresses to the router's public address and tracks the mapping."
      },
      {
        "id": "computer-networks-a6",
        "kind": "code-reading",
        "topic": "Sockets",
        "question": "What does recvfrom() return?",
        "options": [
          "Only the data",
          "A tuple of (data, sender address)",
          "The socket object",
          "The port number"
        ],
        "answer": 1,
        "explanation": "recvfrom returns both the datagram and the address it came from.",
        "code": "data, addr = sock.recvfrom(4096)"
      },
      {
        "id": "computer-networks-a7",
        "kind": "code-reading",
        "topic": "Subnetting",
        "question": "How many usable hosts are in a network with 6 host bits?",
        "options": [
          "62",
          "64",
          "60",
          "126"
        ],
        "answer": 0,
        "explanation": "2**6 - 2 = 62 usable hosts.",
        "code": "usable = 2 ** host_bits - 2  # host_bits = 6"
      },
      {
        "id": "computer-networks-a8",
        "kind": "code-reading",
        "topic": "HTTP",
        "question": "Which status class does 503 belong to?",
        "options": [
          "Success",
          "Redirect",
          "Client error",
          "Server error"
        ],
        "answer": 3,
        "explanation": "5xx codes are server errors; 503 means the service is unavailable.",
        "code": "status = 503"
      },
      {
        "id": "computer-networks-a9",
        "kind": "debugging",
        "topic": "Sockets",
        "question": "This client crashes when sending. What is wrong?\ns.sendall(\"hello\")",
        "options": [
          "The string must be bytes",
          "sendall needs a port argument",
          "The socket is not a UDP socket",
          "hello is too long"
        ],
        "answer": 0,
        "explanation": "sendall requires bytes; use b\"hello\" or \"hello\".encode().",
        "code": "s.sendall(\"hello\")"
      },
      {
        "id": "computer-networks-a10",
        "kind": "debugging",
        "topic": "Diagnostics",
        "question": "This loss calculation prints 80% when 8 of 10 packets arrived. What is wrong?\nloss = received / sent * 100",
        "options": [
          "It computes the arrival rate, not the loss",
          "It should divide by received",
          "It needs integer division",
          "sent and received are swapped in the input"
        ],
        "answer": 0,
        "explanation": "Loss is (sent - received) / sent * 100; received / sent is the success rate.",
        "code": "loss = received / sent * 100"
      }
    ],
    {
      "title": "Subnet host calculator",
      "type": "write-code",
      "instructions": "Write a program that reads a prefix length (e.g. 24) and prints exactly: Usable hosts: <n>. Host bits = 32 - prefix; usable = 2**host_bits - 2.",
      "starterCode": "prefix = int(input())\n# host bits = 32 - prefix\n",
      "solution": "prefix = int(input())\nhost_bits = 32 - prefix\nprint(f\"Usable hosts: {2 ** host_bits - 2}\")",
      "solutionExplanation": "Subtract the prefix from 32 to get host bits, then compute 2**host_bits - 2.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "Prefix 24",
          "hidden": false,
          "stdin": "24\n",
          "expectedStdout": "Usable hosts: 254"
        },
        {
          "name": "Prefix 28",
          "hidden": true,
          "stdin": "28\n",
          "expectedStdout": "Usable hosts: 14"
        }
      ],
      "hintNotes": {
        "concept": "A /24 network leaves 8 host bits; the prefix tells you how many bits are network.",
        "approach": "Compute host_bits = 32 - prefix, then 2 ** host_bits - 2.",
        "structure": "Structure: read the prefix, compute host bits, then one print."
      },
      "language": "python",
      "id": "computer-networks-assessment-e1"
    },
    {
      "title": "Local chat client and server",
      "description": "Build a TCP client and server in Python that exchange messages on localhost, with a small UDP-based discovery message and a report of round-trip times.",
      "requirements": [
        "A TCP server that accepts a client, echoes each message back, and handles a clean disconnect",
        "A TCP client that connects, sends three messages, and prints each echo with its round-trip time",
        "A UDP datagram exchange showing the sender address returned by recvfrom",
        "A short written summary of when you would choose TCP over UDP for a real feature"
      ],
      "rubric": [
        "Client and server exchange all three messages correctly",
        "Round-trip times are measured and printed",
        "UDP exchange shows the sender address",
        "The TCP-vs-UDP summary names a real trade-off correctly"
      ]
    },
  ),
  buildShortAssessment(
    "system-design",
    [
      {
        "id": "system-design-a1",
        "kind": "conceptual",
        "topic": "Requirements",
        "question": "What is a non-functional requirement?",
        "options": [
          "A feature users can click",
          "A quality like availability or latency",
          "A database table",
          "A test case"
        ],
        "answer": 1,
        "explanation": "Non-functional requirements describe qualities of the system, not features."
      },
      {
        "id": "system-design-a2",
        "kind": "conceptual",
        "topic": "Caching",
        "question": "What is the main risk of caching?",
        "options": [
          "It is too slow",
          "Serving stale data",
          "It deletes the database",
          "It uses no memory"
        ],
        "answer": 1,
        "explanation": "Cached copies age; without TTLs or invalidation, users see out-of-date data."
      },
      {
        "id": "system-design-a3",
        "kind": "conceptual",
        "topic": "Sharding",
        "question": "What makes a good shard key?",
        "options": [
          "It concentrates data on one shard",
          "It spreads load evenly and keeps common queries on one shard",
          "It is a random string",
          "It never changes"
        ],
        "answer": 1,
        "explanation": "A good shard key balances load and localises the queries you actually run."
      },
      {
        "id": "system-design-a4",
        "kind": "conceptual",
        "topic": "CAP",
        "question": "During a network partition, a system must choose between what?",
        "options": [
          "Speed and cost",
          "Consistency and availability",
          "Security and usability",
          "Reads and writes"
        ],
        "answer": 1,
        "explanation": "CAP says a partitioned system cannot guarantee both consistency and availability."
      },
      {
        "id": "system-design-a5",
        "kind": "conceptual",
        "topic": "Queues",
        "question": "Why should queue messages be idempotent?",
        "options": [
          "To make them smaller",
          "A worker may process the same message twice after a crash",
          "To encrypt them",
          "To order them"
        ],
        "answer": 1,
        "explanation": "At-least-once delivery means duplicates happen; idempotent handlers make them harmless."
      },
      {
        "id": "system-design-a6",
        "kind": "code-reading",
        "topic": "Capacity",
        "question": "What is the average QPS for 1,728,000 actions per day?",
        "options": [
          "20.0",
          "2.0",
          "200.0",
          "0.2"
        ],
        "answer": 0,
        "explanation": "1,728,000 / 86400 = 20 requests per second.",
        "code": "qps = 1_728_000 / 86400"
      },
      {
        "id": "system-design-a7",
        "kind": "code-reading",
        "topic": "Load balancing",
        "question": "Which server handles request 5 with servers [s1, s2, s3] and 1-based numbering?",
        "options": [
          "s1",
          "s2",
          "s3",
          "None"
        ],
        "answer": 1,
        "explanation": "Request 5 maps to index (5-1) % 3 = 1, which is s2.",
        "code": "servers[(req - 1) % 3]  # req = 5"
      },
      {
        "id": "system-design-a8",
        "kind": "code-reading",
        "topic": "Caching",
        "question": "What is the hit rate for 900 hits out of 1000 requests?",
        "options": [
          "9.0%",
          "90.0%",
          "0.9%",
          "900%"
        ],
        "answer": 1,
        "explanation": "900 / 1000 * 100 = 90.0%.",
        "code": "hit_rate = 900 / 1000 * 100"
      },
      {
        "id": "system-design-a9",
        "kind": "debugging",
        "topic": "Capacity",
        "question": "This QPS estimate is 24x too high. What is wrong?\nqps = dau * actions / 3600",
        "options": [
          "It divides by seconds in an hour, not a day",
          "It multiplies instead of dividing",
          "dau should be squared",
          "actions should be subtracted"
        ],
        "answer": 0,
        "explanation": "A day has 86400 seconds; dividing by 3600 (one hour) inflates the result 24x.",
        "code": "qps = dau * actions / 3600"
      },
      {
        "id": "system-design-a10",
        "kind": "debugging",
        "topic": "Token bucket",
        "question": "This bucket allows 6 requests with only 5 tokens. What is wrong?\nif tokens >= 0: tokens -= 1",
        "options": [
          "The check should be tokens > 0",
          "tokens should start at 6",
          "The loop runs too few times",
          "Tokens should increase"
        ],
        "answer": 0,
        "explanation": "With >= 0 the bucket goes to -1 and allows one extra request; > 0 stops at zero.",
        "code": "if tokens >= 0: tokens -= 1"
      }
    ],
    {
      "title": "Estimate peak QPS",
      "type": "write-code",
      "instructions": "Write a program that reads daily active users, actions per user per day, and a peak factor, then prints exactly: Peak QPS: <n> with one decimal place. Peak QPS = dau * actions / 86400 * peak.",
      "starterCode": "dau = int(input())\nactions = int(input())\npeak = int(input())\n# peak qps = dau * actions / 86400 * peak\n",
      "solution": "dau = int(input())\nactions = int(input())\npeak = int(input())\nprint(f\"Peak QPS: {dau * actions / 86400 * peak:.1f}\")",
      "solutionExplanation": "Compute the average QPS from the daily totals, then multiply by the peak factor.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "1M users, 5 actions, peak 3",
          "hidden": false,
          "stdin": "1000000\n5\n3\n",
          "expectedStdout": "Peak QPS: 173.6"
        },
        {
          "name": "86400 users, 1 action, peak 2",
          "hidden": true,
          "stdin": "86400\n1\n2\n",
          "expectedStdout": "Peak QPS: 2.0"
        }
      ],
      "hintNotes": {
        "concept": "Peak traffic is the average rate times the peak factor, so compute the average first.",
        "approach": "Compute dau * actions / 86400 * peak and format with :.1f.",
        "structure": "Structure: read three numbers, then one print with the formula."
      },
      "language": "python",
      "id": "system-design-assessment-e1"
    },
    {
      "title": "Design a photo-sharing service",
      "description": "Produce a complete system design for a photo-sharing app with 10 million daily users: requirements, capacity estimates, a component diagram, and the key trade-offs, plus a small Python capacity calculator.",
      "requirements": [
        "State functional and non-functional requirements explicitly",
        "Estimate QPS, storage per day, and bandwidth with stated assumptions",
        "Draw the components (load balancer, app servers, storage, cache, queue) and their flows",
        "Name the sharding or partitioning choice and justify it",
        "Describe how the design behaves when a database replica fails"
      ],
      "rubric": [
        "Requirements separate functional from non-functional",
        "Capacity numbers follow from stated assumptions",
        "Components and flows are complete and consistent",
        "The sharding choice is justified with a trade-off",
        "Failure behaviour is described concretely"
      ]
    },
  ),
  buildShortAssessment(
    "ood",
    [
      {
        "id": "ood-a1",
        "kind": "conceptual",
        "topic": "Encapsulation",
        "question": "What does encapsulation protect?",
        "options": [
          "The source code from being read",
          "An object's internal state from invalid changes",
          "The program from running",
          "The database"
        ],
        "answer": 1,
        "explanation": "Encapsulation hides internals so state changes only through methods that enforce the rules."
      },
      {
        "id": "ood-a2",
        "kind": "conceptual",
        "topic": "SOLID",
        "question": "What does the Single Responsibility Principle say?",
        "options": [
          "A class should do everything",
          "A class should have one reason to change",
          "A class should have one method",
          "A class should never change"
        ],
        "answer": 1,
        "explanation": "SRP: one responsibility per class, so it changes for one reason only."
      },
      {
        "id": "ood-a3",
        "kind": "conceptual",
        "topic": "Patterns",
        "question": "What does a Factory do?",
        "options": [
          "It deletes objects",
          "It creates objects without the caller naming the concrete class",
          "It sorts objects",
          "It stores objects"
        ],
        "answer": 1,
        "explanation": "A factory centralises creation so callers ask for a kind and receive an object."
      },
      {
        "id": "ood-a4",
        "kind": "conceptual",
        "topic": "UML",
        "question": "What does a hollow triangle arrow mean in UML?",
        "options": [
          "Association",
          "Inheritance",
          "Composition",
          "Dependency"
        ],
        "answer": 1,
        "explanation": "The hollow triangle denotes generalisation: the subclass inherits from the pointed-to class."
      },
      {
        "id": "ood-a5",
        "kind": "conceptual",
        "topic": "Domain modelling",
        "question": "Where do candidate classes come from?",
        "options": [
          "The programming language",
          "The nouns in the requirements",
          "The test files",
          "The database schema"
        ],
        "answer": 1,
        "explanation": "Nouns in the problem description are the first candidates for classes."
      },
      {
        "id": "ood-a6",
        "kind": "code-reading",
        "topic": "Classes",
        "question": "What does this print?\nacc = BankAccount(100)\nacc.deposit(50)\nprint(acc.balance)",
        "options": [
          "50",
          "100",
          "150",
          "0"
        ],
        "answer": 2,
        "explanation": "deposit adds 50 to the starting 100, giving 150.",
        "code": "acc = BankAccount(100)\nacc.deposit(50)\nprint(acc.balance)"
      },
      {
        "id": "ood-a7",
        "kind": "code-reading",
        "topic": "Decorator",
        "question": "What is the cost of a coffee (2) wrapped in two Milk decorators (1 each)?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": 2,
        "explanation": "Each Milk adds 1: 2 + 1 + 1 = 4.",
        "code": "Milk(Milk(Coffee())).cost()"
      },
      {
        "id": "ood-a8",
        "kind": "code-reading",
        "topic": "Strategy",
        "question": "What does checkout with the Sale strategy return for amount 200?",
        "options": [
          "200",
          "160",
          "80",
          "20"
        ],
        "answer": 1,
        "explanation": "Sale pays 80% of 200, which is 160.",
        "code": "Sale().price(200)  # 80%"
      },
      {
        "id": "ood-a9",
        "kind": "debugging",
        "topic": "Encapsulation",
        "question": "This deposit accepts -50. What is missing?\ndef deposit(self, amount):\n    self._balance += amount",
        "options": [
          "A guard refusing non-positive amounts",
          "A return statement",
          "A print statement",
          "A new attribute"
        ],
        "answer": 0,
        "explanation": "The method needs `if amount > 0` before updating the balance.",
        "code": "def deposit(self, amount):\n    self._balance += amount"
      },
      {
        "id": "ood-a10",
        "kind": "debugging",
        "topic": "Observer",
        "question": "Only the last subscriber is notified. What is wrong?\ndef subscribe(self, fn):\n    self.listeners = [fn]",
        "options": [
          "It replaces the list instead of appending",
          "It appends twice",
          "It clears the list after publishing",
          "It never stores the function"
        ],
        "answer": 0,
        "explanation": "subscribe must append to the list; assigning [fn] discards earlier subscribers.",
        "code": "def subscribe(self, fn):\n    self.listeners = [fn]"
      }
    ],
    {
      "title": "Order total with discount",
      "type": "build-function",
      "instructions": "Write a program that reads an item count, a price per item, and a discount percent, then prints exactly: Total: <n>. Use an Order class with add_line and total methods; apply the discount to the total (integer result).",
      "starterCode": "class Order:\n    def __init__(self):\n        self.lines = []\n    def add_line(self, qty, price):\n        self.lines.append(qty * price)\n    def total(self):\n        return sum(self.lines)\n\nn = int(input())\nprice = int(input())\ndiscount = int(input())\norder = Order()\nfor _ in range(n):\n    order.add_line(1, price)\nresult = order.total() * (100 - discount) // 100\nprint(f\"Total: {result}\")",
      "solution": "class Order:\n    def __init__(self):\n        self.lines = []\n    def add_line(self, qty, price):\n        self.lines.append(qty * price)\n    def total(self):\n        return sum(self.lines)\n\nn = int(input())\nprice = int(input())\ndiscount = int(input())\norder = Order()\nfor _ in range(n):\n    order.add_line(1, price)\nresult = order.total() * (100 - discount) // 100\nprint(f\"Total: {result}\")",
      "solutionExplanation": "The Order sums its lines, then the program applies the discount percentage with integer arithmetic.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "2 items at 50, 10% off",
          "hidden": false,
          "stdin": "2\n50\n10\n",
          "expectedStdout": "Total: 90"
        },
        {
          "name": "4 items at 25, 20% off",
          "hidden": true,
          "stdin": "4\n25\n20\n",
          "expectedStdout": "Total: 80"
        }
      ],
      "hintNotes": {
        "concept": "Collect the lines in the Order, then apply the discount to the summed total.",
        "approach": "Use order.total() * (100 - discount) // 100 for the discounted total.",
        "structure": "Structure: the Order class, read the inputs, add lines, compute and print."
      },
      "language": "python",
      "id": "ood-assessment-e1"
    },
    {
      "title": "Design a ride-hailing system",
      "description": "Design the object model for a small ride-hailing app: riders, drivers, rides, payments, and ratings, with a working Python prototype of the core classes and one design pattern applied.",
      "requirements": [
        "A UML-style class list with relationships and ownership",
        "SOLID justification for at least two design decisions",
        "One design pattern used where it genuinely fits",
        "A working prototype: request a ride, assign a driver, complete it, and compute the fare",
        "Rules (driver availability, fare calculation) enforced inside the classes, not by callers"
      ],
      "rubric": [
        "The model mirrors the domain's nouns and rules",
        "SOLID decisions are named and justified",
        "The pattern is used correctly and fits the problem",
        "The prototype runs the full ride flow",
        "Rules live inside the classes"
      ]
    },
  ),
  buildShortAssessment(
    "functional-programming",
    [
      {
        "id": "functional-programming-a1",
        "kind": "conceptual",
        "topic": "Purity",
        "question": "What makes a function pure?",
        "options": [
          "It is fast",
          "Its result depends only on its arguments and it has no side effects",
          "It takes no arguments",
          "It never returns"
        ],
        "answer": 1,
        "explanation": "Pure functions are deterministic and effect-free: same inputs, same output, nothing changed."
      },
      {
        "id": "functional-programming-a2",
        "kind": "conceptual",
        "topic": "Immutability",
        "question": "What does {...user, age: 31} do?",
        "options": [
          "It changes user's age",
          "It creates a new object with age 31, leaving user unchanged",
          "It deletes user",
          "It freezes user"
        ],
        "answer": 1,
        "explanation": "Spread copies the object and overrides the field in the copy only."
      },
      {
        "id": "functional-programming-a3",
        "kind": "conceptual",
        "topic": "Map/filter/reduce",
        "question": "Which operation folds a list into a single value?",
        "options": [
          "map",
          "filter",
          "reduce",
          "forEach"
        ],
        "answer": 2,
        "explanation": "reduce folds elements into one result using an accumulator."
      },
      {
        "id": "functional-programming-a4",
        "kind": "conceptual",
        "topic": "Composition",
        "question": "What does compose(f, g)(x) compute?",
        "options": [
          "g(f(x))",
          "f(g(x))",
          "f(x) + g(x)",
          "f(x) then g(x) in parallel"
        ],
        "answer": 1,
        "explanation": "compose applies g first, then f: f(g(x))."
      },
      {
        "id": "functional-programming-a5",
        "kind": "conceptual",
        "topic": "Closures",
        "question": "What is a closure?",
        "options": [
          "A function that closes the program",
          "A function that remembers variables from the scope where it was created",
          "A loop that ends",
          "A private class"
        ],
        "answer": 1,
        "explanation": "A closure keeps a live reference to its birth scope's variables."
      },
      {
        "id": "functional-programming-a6",
        "kind": "code-reading",
        "topic": "Map",
        "question": "What does [1, 2, 3].map(x => x * 2) return?",
        "options": [
          "[1, 2, 3]",
          "[2, 4, 6]",
          "[3, 6, 9]",
          "6"
        ],
        "answer": 1,
        "explanation": "map doubles each element into a new array.",
        "code": "[1, 2, 3].map(x => x * 2)"
      },
      {
        "id": "functional-programming-a7",
        "kind": "code-reading",
        "topic": "Currying",
        "question": "What does add(5)(10) return when add = a => b => a + b?",
        "options": [
          "5",
          "10",
          "15",
          "50"
        ],
        "answer": 2,
        "explanation": "The curried add fixes a=5, then adds b=10, giving 15.",
        "code": "const add = (a) => (b) => a + b;\nadd(5)(10)"
      },
      {
        "id": "functional-programming-a8",
        "kind": "code-reading",
        "topic": "Recursion",
        "question": "What is fact(4) when fact = n => n <= 1 ? 1 : n * fact(n - 1)?",
        "options": [
          "4",
          "12",
          "24",
          "120"
        ],
        "answer": 2,
        "explanation": "4 * 3 * 2 * 1 = 24.",
        "code": "const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));\nfact(4)"
      },
      {
        "id": "functional-programming-a9",
        "kind": "debugging",
        "topic": "Filter",
        "question": "This should sum only orders >= 100 but sums everything. What is missing?\norders.reduce((s, x) => s + x, 0)",
        "options": [
          "A filter step before the reduce",
          "An initial value",
          "A map step",
          "A sort step"
        ],
        "answer": 0,
        "explanation": "Without filter, reduce sums all orders; filter(x => x >= 100) must come first.",
        "code": "orders.reduce((s, x) => s + x, 0)"
      },
      {
        "id": "functional-programming-a10",
        "kind": "debugging",
        "topic": "Closures",
        "question": "All three closures print 3 instead of 0, 1, 2. What is wrong?\nfor (var i = 0; i < 3; i++) fns.push(() => i);",
        "options": [
          "var shares one binding; use let",
          "The loop runs too many times",
          "push is wrong",
          "The closures need arguments"
        ],
        "answer": 0,
        "explanation": "var is function-scoped, so all closures share one i; let gives each iteration its own binding.",
        "code": "for (var i = 0; i < 3; i++) fns.push(() => i);"
      }
    ],
    {
      "title": "Pipeline: sum even squares",
      "type": "write-code",
      "instructions": "Write a program that reads numbers separated by spaces and prints the sum of the squares of the even numbers, using filter, map, and reduce.",
      "starterCode": "import * as fs from 'node:fs';\nconst nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\n// filter even, map to square, reduce to sum",
      "solution": "import * as fs from 'node:fs';\nconst nums = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).map(Number);\nconsole.log(nums.filter((x) => x % 2 === 0).map((x) => x * x).reduce((sum, x) => sum + x, 0));",
      "solutionExplanation": "Filter the evens, square each with map, and fold them with reduce starting at 0.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "1 2 3 4",
          "hidden": false,
          "stdin": "1 2 3 4\n",
          "expectedStdout": "20"
        },
        {
          "name": "1 3 5",
          "hidden": true,
          "stdin": "1 3 5\n",
          "expectedStdout": "0"
        }
      ],
      "hintNotes": {
        "concept": "The pipeline has three steps: keep the evens, square them, add them up.",
        "approach": "Chain filter, map, and reduce in that order.",
        "structure": "Structure: read the numbers, then one console.log with the chained pipeline."
      },
      "language": "javascript",
      "id": "functional-programming-assessment-e1"
    },
    {
      "title": "Functional data pipeline CLI",
      "description": "Build a small Node CLI that reads lines of sales records, validates them with pure functions, and reports totals per product using a map/filter/reduce pipeline — with no mutation anywhere.",
      "requirements": [
        "Parse each line into a record with a pure function",
        "Filter out malformed lines without crashing",
        "Aggregate totals per product with reduce",
        "Use composition or currying for at least one configured step",
        "Keep all I/O at the edges; the core must be pure functions"
      ],
      "rubric": [
        "Malformed lines are skipped, not fatal",
        "Totals per product are correct",
        "No mutation of inputs anywhere in the core",
        "A composed or curried step is used genuinely",
        "I/O is confined to the edges"
      ]
    },
  ),
  buildShortAssessment(
    "testing-tdd",
    [
      {
        "id": "testing-tdd-a1",
        "kind": "conceptual",
        "topic": "Why test",
        "question": "Why write tests even when the code seems to work?",
        "options": [
          "They make code faster",
          "They catch regressions, document behaviour, and make refactoring safe",
          "They are required by law",
          "They replace code review"
        ],
        "answer": 1,
        "explanation": "Tests prove behaviour, catch future breakage, and give confidence to change code."
      },
      {
        "id": "testing-tdd-a2",
        "kind": "conceptual",
        "topic": "Fixtures",
        "question": "What does a pytest fixture provide?",
        "options": [
          "Faster code",
          "Fresh, reusable setup per test",
          "A mock database",
          "A test report"
        ],
        "answer": 1,
        "explanation": "Fixtures build the setup each test needs, fresh per test."
      },
      {
        "id": "testing-tdd-a3",
        "kind": "conceptual",
        "topic": "TDD",
        "question": "Why must a TDD test fail first?",
        "options": [
          "To waste time",
          "A test that never failed might pass even with broken code",
          "To make the suite red",
          "It is tradition"
        ],
        "answer": 1,
        "explanation": "Seeing red proves the test actually exercises the code."
      },
      {
        "id": "testing-tdd-a4",
        "kind": "conceptual",
        "topic": "Test pyramid",
        "question": "Where do end-to-end tests belong in the test pyramid?",
        "options": [
          "At the base",
          "In the middle",
          "At the top — few and precious",
          "Nowhere"
        ],
        "answer": 2,
        "explanation": "E2E tests are slow and fragile, so only a handful cover the critical paths."
      },
      {
        "id": "testing-tdd-a5",
        "kind": "conceptual",
        "topic": "Coverage",
        "question": "What does 100% line coverage guarantee?",
        "options": [
          "The code is bug-free",
          "Every line ran at least once — nothing about whether results were checked",
          "Every branch was tested",
          "Tests are fast"
        ],
        "answer": 1,
        "explanation": "Coverage measures execution, not verification."
      },
      {
        "id": "testing-tdd-a6",
        "kind": "code-reading",
        "topic": "Assertions",
        "question": "What does this test check?\nassert total([1, 2, 3]) == 6",
        "options": [
          "That total returns 5",
          "That total([1, 2, 3]) equals 6",
          "That total is fast",
          "That the list is sorted"
        ],
        "answer": 1,
        "explanation": "The assert compares the function's result with the expected value 6.",
        "code": "assert total([1, 2, 3]) == 6"
      },
      {
        "id": "testing-tdd-a7",
        "kind": "code-reading",
        "topic": "Clamp",
        "question": "What does clamp(150, 1, 100) return?",
        "options": [
          "150",
          "100",
          "1",
          "0"
        ],
        "answer": 1,
        "explanation": "150 is above the high bound, so it clamps to 100.",
        "code": "clamp(150, 1, 100)  # max(low, min(high, value))"
      },
      {
        "id": "testing-tdd-a8",
        "kind": "code-reading",
        "topic": "Property",
        "question": "Which list fails the sorted property?",
        "options": [
          "[1, 2, 3]",
          "[1, 1, 2]",
          "[3, 1, 2]",
          "[2, 2, 2]"
        ],
        "answer": 2,
        "explanation": "[3, 1, 2] is not in non-decreasing order.",
        "code": "is_sorted([3, 1, 2])"
      },
      {
        "id": "testing-tdd-a9",
        "kind": "debugging",
        "topic": "Fixtures",
        "question": "Tests interfere with each other. What is wrong?\nshared = {'balance': 100}\n@pytest.fixture\ndef account():\n    return shared",
        "options": [
          "The fixture returns the same shared dict to every test",
          "The fixture is too slow",
          "The dict is empty",
          "pytest cannot use dicts"
        ],
        "answer": 0,
        "explanation": "A fixture must build fresh state per test; sharing one dict leaks changes between tests.",
        "code": "@pytest.fixture\ndef account():\n    return shared"
      },
      {
        "id": "testing-tdd-a10",
        "kind": "debugging",
        "topic": "Clamp",
        "question": "clamp(0, 1, 100) returns 0 instead of 1. What is missing?\ndef clamp(value, low, high):\n    return min(high, value)",
        "options": [
          "The max(low, ...) lower bound",
          "The min call",
          "The high bound",
          "A loop"
        ],
        "answer": 0,
        "explanation": "Without max(low, ...), values below low are never lifted up to low.",
        "code": "def clamp(value, low, high):\n    return min(high, value)"
      }
    ],
    {
      "title": "Test-report summary",
      "type": "write-code",
      "instructions": "Write a program that reads the number of tests run and the number that passed, then prints exactly: Passed: <p>/<t> (<pct>% with one decimal).",
      "starterCode": "total = int(input())\npassed = int(input())\n# pct = passed / total * 100\n",
      "solution": "total = int(input())\npassed = int(input())\nprint(f\"Passed: {passed}/{total} ({passed / total * 100:.1f}%)\")",
      "solutionExplanation": "Divide passed by total for the percentage and print the count and the percentage together.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "10 run, 9 passed",
          "hidden": false,
          "stdin": "10\n9\n",
          "expectedStdout": "Passed: 9/10 (90.0%)"
        },
        {
          "name": "4 run, 4 passed",
          "hidden": true,
          "stdin": "4\n4\n",
          "expectedStdout": "Passed: 4/4 (100.0%)"
        }
      ],
      "hintNotes": {
        "concept": "A test report is a count plus a percentage — both come from the same two numbers.",
        "approach": "Compute passed / total * 100 and format with :.1f inside the summary.",
        "structure": "Structure: read two numbers, then one print with the count and percentage."
      },
      "language": "python",
      "id": "testing-tdd-assessment-e1"
    },
    {
      "title": "Test a small library TDD-style",
      "description": "Build a tiny shopping-cart library using red-green-refactor, with unit tests, a fixture, a fake repository, and a CI-style gate script that blocks on any failure.",
      "requirements": [
        "Write the tests first for at least three behaviours (add, remove, total with discount)",
        "Use a fixture for a fresh cart per test",
        "Use a fake repository for persistence",
        "Add one parametrised boundary test (empty cart, discount 0%, discount 100%)",
        "Include a gate script that exits non-zero when any test fails"
      ],
      "rubric": [
        "Tests were written before the code for at least three behaviours",
        "The fixture gives each test a fresh cart",
        "Boundary cases are covered by parametrisation",
        "The fake repository is used, not the real database",
        "The gate script blocks on failure"
      ]
    },
  ),
  buildShortAssessment(
    "debugging-mastery",
    [
      {
        "id": "debugging-mastery-a1",
        "kind": "conceptual",
        "topic": "Method",
        "question": "Why reproduce a bug before fixing it?",
        "options": [
          "To waste time",
          "So you can verify the fix actually worked",
          "To show your manager",
          "Reproduction is optional"
        ],
        "answer": 1,
        "explanation": "Without a reliable reproduction you cannot tell whether the fix worked."
      },
      {
        "id": "debugging-mastery-a2",
        "kind": "conceptual",
        "topic": "Tracebacks",
        "question": "Where is the actual error in a traceback?",
        "options": [
          "The first line",
          "The last line — the error type and message",
          "The middle line",
          "The file name"
        ],
        "answer": 1,
        "explanation": "The last line names the exception; the stack above shows the call chain."
      },
      {
        "id": "debugging-mastery-a3",
        "kind": "conceptual",
        "topic": "pdb",
        "question": "What does breakpoint() do?",
        "options": [
          "It stops the program forever",
          "It drops you into an interactive debugger prompt at that line",
          "It prints variables",
          "It restarts the program"
        ],
        "answer": 1,
        "explanation": "breakpoint() pauses execution in pdb for inspection and stepping."
      },
      {
        "id": "debugging-mastery-a4",
        "kind": "conceptual",
        "topic": "Off-by-one",
        "question": "What does range(3) produce?",
        "options": [
          "1, 2, 3",
          "0, 1, 2",
          "0, 1, 2, 3",
          "3"
        ],
        "answer": 1,
        "explanation": "range(n) gives 0 through n-1."
      },
      {
        "id": "debugging-mastery-a5",
        "kind": "conceptual",
        "topic": "Race conditions",
        "question": "Why are race conditions hard to reproduce?",
        "options": [
          "They need special hardware",
          "The result depends on thread timing, which changes every run",
          "They only happen at night",
          "They need a special compiler"
        ],
        "answer": 1,
        "explanation": "Interleaving varies run to run, so the bug appears and disappears."
      },
      {
        "id": "debugging-mastery-a6",
        "kind": "code-reading",
        "topic": "Tracebacks",
        "question": "What error does this raise?\nitems = [1, 2, 3]\nitems[5]",
        "options": [
          "KeyError",
          "IndexError",
          "TypeError",
          "ValueError"
        ],
        "answer": 1,
        "explanation": "An out-of-range list index raises IndexError.",
        "code": "items = [1, 2, 3]\nitems[5]"
      },
      {
        "id": "debugging-mastery-a7",
        "kind": "code-reading",
        "topic": "Mutable default",
        "question": "What does the second call return?\ndef add_item(item, items=[]):\n    items.append(item)\n    return items\nadd_item('a'); add_item('b')",
        "options": [
          "['b']",
          "['a', 'b']",
          "[]",
          "Error"
        ],
        "answer": 1,
        "explanation": "The default list is shared across calls, so the second call sees both items.",
        "code": "def add_item(item, items=[]):\n    items.append(item)\n    return items"
      },
      {
        "id": "debugging-mastery-a8",
        "kind": "code-reading",
        "topic": "Clamp",
        "question": "What does max(1, min(100, 0)) return?",
        "options": [
          "0",
          "1",
          "100",
          "-1"
        ],
        "answer": 1,
        "explanation": "min(100, 0) is 0, then max(1, 0) lifts it to 1.",
        "code": "max(1, min(100, 0))"
      },
      {
        "id": "debugging-mastery-a9",
        "kind": "debugging",
        "topic": "Tracebacks",
        "question": "This code crashes instead of catching the error. What is wrong?\ntry:\n    print([1,2,3][5])\nexcept KeyError:\n    print('caught')",
        "options": [
          "It catches the wrong exception type",
          "The list is too short",
          "print cannot fail",
          "The try block is empty"
        ],
        "answer": 0,
        "explanation": "An out-of-range index raises IndexError, not KeyError.",
        "code": "try:\n    print([1,2,3][5])\nexcept KeyError:\n    print('caught')"
      },
      {
        "id": "debugging-mastery-a10",
        "kind": "debugging",
        "topic": "Off-by-one",
        "question": "This should print 1, 2, 3 but prints 0, 1, 2. What is wrong?\nfor i in range(3):\n    print(i)",
        "options": [
          "range(3) starts at 0; use range(1, 4)",
          "The loop runs too many times",
          "print is wrong",
          "i is the wrong variable"
        ],
        "answer": 0,
        "explanation": "range(3) is 0, 1, 2; range(1, 4) gives 1, 2, 3.",
        "code": "for i in range(3):\n    print(i)"
      }
    ],
    {
      "title": "Classify an error",
      "type": "write-code",
      "instructions": "Write a program that reads an error name (NameError, TypeError, IndexError, or KeyError) and prints the cause: NameError -> unknown name, TypeError -> wrong type, IndexError -> bad index, KeyError -> missing key.",
      "starterCode": "err = input().strip()\ncauses = {\"NameError\": \"unknown name\", \"TypeError\": \"wrong type\", \"IndexError\": \"bad index\", \"KeyError\": \"missing key\"}\nprint(causes[err])",
      "solution": "err = input().strip()\ncauses = {\"NameError\": \"unknown name\", \"TypeError\": \"wrong type\", \"IndexError\": \"bad index\", \"KeyError\": \"missing key\"}\nprint(causes[err])",
      "solutionExplanation": "Look the error name up in a dict mapping each exception to its cause.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "IndexError",
          "hidden": false,
          "stdin": "IndexError\n",
          "expectedStdout": "bad index"
        },
        {
          "name": "KeyError",
          "hidden": true,
          "stdin": "KeyError\n",
          "expectedStdout": "missing key"
        }
      ],
      "hintNotes": {
        "concept": "Each Python error type names a specific mistake — the last line of the traceback tells you which.",
        "approach": "Use a dict lookup from the error name to its cause.",
        "structure": "Structure: define the dict, read the name, print the lookup."
      },
      "language": "python",
      "id": "debugging-mastery-assessment-e1"
    },
    {
      "title": "Debug a broken program",
      "description": "You are given a small Python program with five planted bugs (an off-by-one, a mutable default, a wrong exception type, a shared-state race, and a missing guard). Find and fix each one using the scientific method, documenting each hypothesis and experiment.",
      "requirements": [
        "Reproduce each bug before fixing it",
        "Document the hypothesis and the experiment for each fix",
        "Fix the off-by-one, mutable default, wrong exception, race, and missing guard",
        "Add a regression test for each bug",
        "Leave the program with a clean log line per major action"
      ],
      "rubric": [
        "Every bug is reproduced before it is fixed",
        "Each fix has a documented hypothesis and experiment",
        "All five bugs are fixed",
        "Each bug has a regression test",
        "Logging is structured and useful"
      ]
    },
  ),
  buildShortAssessment(
    "algorithms-refresher",
    [
      {
        "id": "algorithms-refresher-a1",
        "kind": "conceptual",
        "topic": "Big-O",
        "question": "What does O(n^2) mean?",
        "options": [
          "It takes n squared seconds",
          "The cost grows with the square of the input size",
          "It uses n squared memory",
          "The input has n squared elements"
        ],
        "answer": 1,
        "explanation": "Big-O describes growth: doubling the input roughly quadruples an O(n^2) cost."
      },
      {
        "id": "algorithms-refresher-a2",
        "kind": "conceptual",
        "topic": "Binary search",
        "question": "What is required for binary search to work?",
        "options": [
          "The array must be sorted",
          "The array must be small",
          "The values must be unique",
          "The array must be a list"
        ],
        "answer": 0,
        "explanation": "Binary search relies on order to discard half the range at each step."
      },
      {
        "id": "algorithms-refresher-a3",
        "kind": "conceptual",
        "topic": "Hash maps",
        "question": "What is the average lookup time of a hash map?",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n^2)"
        ],
        "answer": 1,
        "explanation": "Hashing jumps straight to the bucket: average constant time."
      },
      {
        "id": "algorithms-refresher-a4",
        "kind": "conceptual",
        "topic": "DP",
        "question": "What are the two signals that a problem suits dynamic programming?",
        "options": [
          "It is hard and long",
          "Optimal substructure and overlapping subproblems",
          "It uses a graph and a tree",
          "It is recursive and slow"
        ],
        "answer": 1,
        "explanation": "DP works when answers build from smaller answers and those subproblems repeat."
      },
      {
        "id": "algorithms-refresher-a5",
        "kind": "conceptual",
        "topic": "Graphs",
        "question": "When should you use BFS instead of DFS?",
        "options": [
          "When you need the shortest path in an unweighted graph",
          "When the graph is a tree",
          "When you need to detect cycles",
          "When memory is tight"
        ],
        "answer": 0,
        "explanation": "BFS explores level by level, so the first visit is via the shortest path."
      },
      {
        "id": "algorithms-refresher-a6",
        "kind": "code-reading",
        "topic": "Binary search",
        "question": "How many steps does binary search need for 1024 sorted elements?",
        "options": [
          "1024",
          "10",
          "32",
          "512"
        ],
        "answer": 1,
        "explanation": "log2(1024) = 10 halvings.",
        "code": "n = 1024  # steps = log2(n)"
      },
      {
        "id": "algorithms-refresher-a7",
        "kind": "code-reading",
        "topic": "Memoisation",
        "question": "What does fib(5) return with memoisation?",
        "options": [
          "5",
          "8",
          "3",
          "13"
        ],
        "answer": 0,
        "explanation": "fib(5) = 5 (0, 1, 1, 2, 3, 5).",
        "code": "fib(5)  # 0,1,1,2,3,5"
      },
      {
        "id": "algorithms-refresher-a8",
        "kind": "code-reading",
        "topic": "Stacks",
        "question": "What does this print?\nstack = [1, 2, 3]\nstack.pop()",
        "options": [
          "1",
          "2",
          "3",
          "[1, 2]"
        ],
        "answer": 2,
        "explanation": "pop() removes and returns the last element, 3.",
        "code": "stack = [1, 2, 3]\nstack.pop()"
      },
      {
        "id": "algorithms-refresher-a9",
        "kind": "debugging",
        "topic": "Binary search",
        "question": "This binary search loops forever on some inputs. What is wrong?\nlow = mid  # when xs[mid] < target",
        "options": [
          "low must move to mid + 1",
          "mid is wrong",
          "high is wrong",
          "The loop condition is wrong"
        ],
        "answer": 0,
        "explanation": "low = mid can leave the range unchanged; low = mid + 1 guarantees progress.",
        "code": "low = mid  # when xs[mid] < target"
      },
      {
        "id": "algorithms-refresher-a10",
        "kind": "debugging",
        "topic": "Frequencies",
        "question": "This counts every letter once instead of its true frequency. What is wrong?\ncounts[ch] = 1",
        "options": [
          "It overwrites instead of adding to the count",
          "The dict is empty",
          "The loop is wrong",
          "ch is wrong"
        ],
        "answer": 0,
        "explanation": "It must add 1 to the existing count: counts[ch] = counts.get(ch, 0) + 1.",
        "code": "counts[ch] = 1"
      }
    ],
    {
      "title": "Two-sum check",
      "type": "write-code",
      "instructions": "Write a program that reads a target and then numbers separated by spaces, and prints YES if any two distinct numbers sum to the target, otherwise NO. Use a set of seen numbers.",
      "starterCode": "target = int(input())\nnums = [int(x) for x in input().split()]\nseen = set()\nfound = False\nfor x in nums:\n    if target - x in seen:\n        found = True\n        break\n    seen.add(x)\nprint(\"YES\" if found else \"NO\")",
      "solution": "target = int(input())\nnums = [int(x) for x in input().split()]\nseen = set()\nfound = False\nfor x in nums:\n    if target - x in seen:\n        found = True\n        break\n    seen.add(x)\nprint(\"YES\" if found else \"NO\")",
      "solutionExplanation": "For each number, check whether its complement (target - x) was already seen; the set makes each check O(1).",
      "complexity": "Easy",
      "tests": [
        {
          "name": "Target 9, has 2+7",
          "hidden": false,
          "stdin": "9\n2 7 11 15\n",
          "expectedStdout": "YES"
        },
        {
          "name": "Target 9, none",
          "hidden": true,
          "stdin": "9\n1 2 3\n",
          "expectedStdout": "NO"
        }
      ],
      "hintNotes": {
        "concept": "Two-sum is O(n) with a set: look up the complement instead of scanning pairs.",
        "approach": "Track seen numbers in a set and test target - x against it.",
        "structure": "Structure: read the target and the list, loop with the set, print YES or NO."
      },
      "language": "python",
      "id": "algorithms-refresher-assessment-e1"
    },
    {
      "title": "Algorithm toolkit",
      "description": "Build a small Python module with binary search, a memoised Fibonacci, a bracket checker using a stack, and BFS on an adjacency list — each with tests covering the boundary cases.",
      "requirements": [
        "Binary search with correct boundaries (empty list, single element, missing target)",
        "Memoised Fibonacci that handles n=0 and n=1",
        "A bracket checker that rejects mismatched and unbalanced input",
        "BFS returning nodes in visit order on a graph with a cycle",
        "A short Big-O note for each function"
      ],
      "rubric": [
        "All four functions are correct on boundary cases",
        "BFS handles cycles via a visited set",
        "The bracket checker uses a stack correctly",
        "Big-O notes are accurate",
        "Tests cover the boundaries"
      ]
    },
  ),
  buildShortAssessment(
    "interview-prep",
    [
      {
        "id": "interview-prep-a1",
        "kind": "conceptual",
        "topic": "Pipeline",
        "question": "What is the usual order of a technical hiring pipeline?",
        "options": [
          "On-site, screen, committee",
          "Recruiter screen, technical screen, on-site loop, hiring committee",
          "Committee, on-site, screen",
          "Technical screen, committee, on-site"
        ],
        "answer": 1,
        "explanation": "The pipeline narrows: recruiter screen, technical screen, on-site loop, committee decision."
      },
      {
        "id": "interview-prep-a2",
        "kind": "conceptual",
        "topic": "STAR",
        "question": "What is the most important part of a STAR answer?",
        "options": [
          "The Situation",
          "The Action — what you specifically did",
          "The Result",
          "The Task"
        ],
        "answer": 1,
        "explanation": "The Action is the evidence about you; the Situation is just context."
      },
      {
        "id": "interview-prep-a3",
        "kind": "conceptual",
        "topic": "Coding rounds",
        "question": "What does a coding round measure?",
        "options": [
          "Typing speed",
          "Problem solving under time pressure, communicated clearly",
          "Memory of syntax",
          "Trivia knowledge"
        ],
        "answer": 1,
        "explanation": "Coding rounds test how you think through a problem and explain it."
      },
      {
        "id": "interview-prep-a4",
        "kind": "conceptual",
        "topic": "Design interviews",
        "question": "What should you do in the first five minutes of a design interview?",
        "options": [
          "Draw the schema",
          "Clarify requirements and agree the scope",
          "Start coding",
          "List technologies"
        ],
        "answer": 1,
        "explanation": "Clarifying scope first prevents designing the wrong system."
      },
      {
        "id": "interview-prep-a5",
        "kind": "conceptual",
        "topic": "Negotiation",
        "question": "Why avoid naming a salary number first?",
        "options": [
          "It is rude",
          "Letting the company anchor first gives you their range to negotiate from",
          "It is illegal",
          "Numbers do not matter"
        ],
        "answer": 1,
        "explanation": "Whoever names a number first anchors the discussion."
      },
      {
        "id": "interview-prep-a6",
        "kind": "code-reading",
        "topic": "Two pointers",
        "question": "In two-sum on a sorted array, if nums[left] + nums[right] is too small, what do you do?",
        "options": [
          "Move right down",
          "Move left up",
          "Stop",
          "Restart"
        ],
        "answer": 1,
        "explanation": "A sum that is too small needs a bigger left value, so left moves up.",
        "code": "s = nums[left] + nums[right]  # s < target"
      },
      {
        "id": "interview-prep-a7",
        "kind": "code-reading",
        "topic": "STAR",
        "question": "Which timing is balanced for a STAR story (S/T/A/R seconds)?",
        "options": [
          "60/10/20/15",
          "20/10/60/15",
          "10/60/10/10",
          "25/25/25/25"
        ],
        "answer": 1,
        "explanation": "The Action should be the largest part — 60 seconds of action in a ~105 second story.",
        "code": "times = [20, 10, 60, 15]  # S, T, A, R"
      },
      {
        "id": "interview-prep-a8",
        "kind": "code-reading",
        "topic": "Time budget",
        "question": "Do phases 5/5/10/15/10 fit a 45-minute design interview?",
        "options": [
          "Yes, exactly 45",
          "No, 50 minutes",
          "No, 40 minutes",
          "No, 55 minutes"
        ],
        "answer": 0,
        "explanation": "5+5+10+15+10 = 45, exactly on budget.",
        "code": "sum([5, 5, 10, 15, 10])"
      },
      {
        "id": "interview-prep-a9",
        "kind": "debugging",
        "topic": "STAR",
        "question": "A STAR answer is all Situation and no Action. What is wrong?",
        "options": [
          "It is too short",
          "The interviewer learns nothing about what the candidate did",
          "It has no Result",
          "It is too long"
        ],
        "answer": 1,
        "explanation": "Without the Action, there is no evidence about the candidate's own behaviour.",
        "code": "answer = 'The situation was complex. The team was large...'"
      },
      {
        "id": "interview-prep-a10",
        "kind": "debugging",
        "topic": "Design interview",
        "question": "A candidate spent 25 minutes on the database schema. What went wrong?",
        "options": [
          "They were thorough",
          "They never reached the scaling discussion the interview measures",
          "Schemas are unimportant",
          "They should have coded"
        ],
        "answer": 1,
        "explanation": "One component consumed the interview, leaving no time for the deep-dive and bottlenecks.",
        "code": "time_on_schema = 25  # of 45 minutes"
      }
    ],
    {
      "title": "Interview scorecard",
      "type": "write-code",
      "instructions": "Write a program that reads three round scores (coding, design, behavioural) each out of 10, then prints exactly: Average: <n> with one decimal place.",
      "starterCode": "scores = [int(input()) for _ in range(3)]\nprint(f\"Average: {sum(scores) / len(scores):.1f}\")",
      "solution": "scores = [int(input()) for _ in range(3)]\nprint(f\"Average: {sum(scores) / len(scores):.1f}\")",
      "solutionExplanation": "Average the three round scores and format with one decimal place.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "8 7 9",
          "hidden": false,
          "stdin": "8\n7\n9\n",
          "expectedStdout": "Average: 8.0"
        },
        {
          "name": "6 6 6",
          "hidden": true,
          "stdin": "6\n6\n6\n",
          "expectedStdout": "Average: 6.0"
        }
      ],
      "hintNotes": {
        "concept": "A hiring decision weighs every round, so the average summarises the loop.",
        "approach": "Sum the three scores, divide by 3, format with :.1f.",
        "structure": "Structure: read three numbers, then one print with the average."
      },
      "language": "python",
      "id": "interview-prep-assessment-e1"
    },
    {
      "title": "Mock interview loop",
      "description": "Run a full mock loop on yourself: one coding problem solved out loud, one system design with the framework, and two STAR stories — recorded, reviewed, and improved.",
      "requirements": [
        "Solve a coding problem out loud, narrating the approach and complexity first",
        "Complete a system design using the clarify-estimate-sketch-deep-dive-bottlenecks framework",
        "Write two STAR stories under two minutes each",
        "Review the recording and list three concrete improvements",
        "Negotiate a mock offer with market data"
      ],
      "rubric": [
        "The coding solution is narrated, not silent",
        "The design follows the framework and names trade-offs",
        "STAR stories are under two minutes with the Action as the bulk",
        "The review names three concrete improvements",
        "The negotiation uses market data and the whole package"
      ]
    },
  ),
  buildShortAssessment(
    "open-source",
    [
      {
        "id": "open-source-a1",
        "kind": "conceptual",
        "topic": "Open source",
        "question": "What does a project's license file do?",
        "options": [
          "It lists contributors",
          "It states the legal terms for using and sharing the code",
          "It describes features",
          "It is the README"
        ],
        "answer": 1,
        "explanation": "The license is the legal permission slip for the code."
      },
      {
        "id": "open-source-a2",
        "kind": "conceptual",
        "topic": "First contribution",
        "question": "What is the best first contribution?",
        "options": [
          "A huge new feature",
          "A small, certain fix — a typo or a missing test",
          "A rewrite of the core",
          "A complaint"
        ],
        "answer": 1,
        "explanation": "Small first contributions build trust and teach the workflow with low risk."
      },
      {
        "id": "open-source-a3",
        "kind": "conceptual",
        "topic": "Forks",
        "question": "What is a fork?",
        "options": [
          "A branch",
          "Your own copy of a repository under your account",
          "A deleted repository",
          "A local folder"
        ],
        "answer": 1,
        "explanation": "A fork is a server-side copy you own, giving you somewhere to push."
      },
      {
        "id": "open-source-a4",
        "kind": "conceptual",
        "topic": "PRs",
        "question": "What should a PR description contain?",
        "options": [
          "Only the title",
          "What changed, why, the linked issue, and how it was tested",
          "The author's biography",
          "A copy of the code"
        ],
        "answer": 1,
        "explanation": "The description answers the reviewer's first questions."
      },
      {
        "id": "open-source-a5",
        "kind": "conceptual",
        "topic": "Licensing",
        "question": "What happens if a project has no license?",
        "options": [
          "It is public domain",
          "It is copyrighted by default and nobody may legally use it",
          "Anyone can do anything",
          "It is automatically MIT"
        ],
        "answer": 1,
        "explanation": "No license means default copyright with no permissions granted."
      },
      {
        "id": "open-source-a6",
        "kind": "code-reading",
        "topic": "Git",
        "question": "What does this do?\ngit checkout -b fix/typo",
        "options": [
          "It deletes a branch",
          "It creates and switches to a branch called fix/typo",
          "It merges a branch",
          "It commits"
        ],
        "answer": 1,
        "explanation": "checkout -b creates the branch and switches to it in one step.",
        "code": "git checkout -b fix/typo"
      },
      {
        "id": "open-source-a7",
        "kind": "code-reading",
        "topic": "Git",
        "question": "What does this verify?\ngit log --oneline | grep -q 'Fix typo'",
        "options": [
          "That the branch exists",
          "That a commit with 'Fix typo' exists in the log",
          "That the file exists",
          "That the remote is set"
        ],
        "answer": 1,
        "explanation": "grep -q searches the log output for the message; success means the commit exists.",
        "code": "git log --oneline | grep -q 'Fix typo'"
      },
      {
        "id": "open-source-a8",
        "kind": "code-reading",
        "topic": "Semver",
        "question": "What does a minor version bump (2.0.0 -> 2.1.0) mean?",
        "options": [
          "A breaking change",
          "A new backwards-compatible feature",
          "A bug fix only",
          "A rewrite"
        ],
        "answer": 1,
        "explanation": "Minor means new functionality without breaking existing users.",
        "code": "2.0.0 -> 2.1.0"
      },
      {
        "id": "open-source-a9",
        "kind": "debugging",
        "topic": "Git workflow",
        "question": "A contributor cloned the original repo and cannot push. What is wrong?",
        "options": [
          "Git is broken",
          "You cannot push to a project you do not own; push to your fork instead",
          "The repo is empty",
          "The branch name is wrong"
        ],
        "answer": 1,
        "explanation": "Pushes go to your fork (origin); the original is upstream, for pulling only.",
        "code": "git push origin main  # permission denied"
      },
      {
        "id": "open-source-a10",
        "kind": "debugging",
        "topic": "Review",
        "question": "A review says 'This code is stupid.' What is wrong with it?",
        "options": [
          "Nothing",
          "It attacks the person, not the code",
          "It is too short",
          "It is too polite"
        ],
        "answer": 1,
        "explanation": "Reviews must comment on the code, phrased as a question or suggestion.",
        "code": "Review: This code is stupid."
      }
    ],
    {
      "title": "Set up a contribution repo",
      "type": "write-code",
      "instructions": "Write a script that initialises a repo, configures a local user, creates README.md and CONTRIBUTING.md, commits them on a branch called docs/setup, and prints exactly: SETUP_OK if the commit exists.",
      "starterCode": "git init -q repo && cd repo && git config user.email \"a@b.c\" && git config user.name \"Ada\"\ngit checkout -qb docs/setup\necho \"# Project\" > README.md && echo \"# Contributing\" > CONTRIBUTING.md\ngit add . && git commit -qm \"Add docs\"\ngit log --oneline | grep -q \"Add docs\" && echo \"SETUP_OK\"",
      "solution": "git init -q repo && cd repo && git config user.email \"a@b.c\" && git config user.name \"Ada\"\ngit checkout -qb docs/setup\necho \"# Project\" > README.md && echo \"# Contributing\" > CONTRIBUTING.md\ngit add . && git commit -qm \"Add docs\"\ngit log --oneline | grep -q \"Add docs\" && echo \"SETUP_OK\"",
      "solutionExplanation": "Initialise the repo, create the branch and the two docs, commit them, and verify the commit in the log.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "Setup complete",
          "expectedContains": "SETUP_OK",
          "hidden": false
        },
        {
          "name": "Setup complete again",
          "expectedContains": "SETUP_OK",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "A contribution starts with the repo, the branch, and the docs that welcome others.",
        "approach": "Init, configure, branch, create the files, commit, and grep the log.",
        "structure": "Structure: one chained script, ending with the verification marker."
      },
      "language": "bash",
      "id": "open-source-assessment-e1"
    },
    {
      "title": "First real contribution",
      "description": "Make a real contribution to an open source project: find a healthy project you use, fix a small issue, and take the pull request through review to merge — documenting each step.",
      "requirements": [
        "Pick a project you use and record its health signals",
        "Open or claim a small issue and discuss the approach first",
        "Fork, branch, and commit the fix in small focused commits",
        "Write a PR with what, why, linked issue, and tests",
        "Respond to every review comment until merge (or a clear maintainer decision)"
      ],
      "rubric": [
        "The project choice is justified with health signals",
        "The change is small and focused",
        "The PR explains itself and is green in CI",
        "Every review comment got a response",
        "The process is documented step by step"
      ]
    },
  ),
  buildShortAssessment(
    "freelancing-career",
    [
      {
        "id": "freelancing-career-a1",
        "kind": "conceptual",
        "topic": "Freelancing",
        "question": "What is the honest financial test for freelancing?",
        "options": [
          "Do you own a laptop?",
          "Can you cover 3-6 months of expenses before the first invoice lands?",
          "Do you have a degree?",
          "Can you work from home?"
        ],
        "answer": 1,
        "explanation": "A runway of several months absorbs the gap between starting and getting paid."
      },
      {
        "id": "freelancing-career-a2",
        "kind": "conceptual",
        "topic": "First client",
        "question": "Why is warm outreach better than cold outreach?",
        "options": [
          "It is cheaper",
          "A message to someone who knows your work converts far better",
          "It is faster",
          "Cold outreach is illegal"
        ],
        "answer": 1,
        "explanation": "Trust is the bottleneck for a first client, and warm contacts already have it."
      },
      {
        "id": "freelancing-career-a3",
        "kind": "conceptual",
        "topic": "Pricing",
        "question": "Why does hourly pricing cap your income?",
        "options": [
          "It is illegal",
          "You can only sell as many hours as you have",
          "Clients hate it",
          "It is hard to calculate"
        ],
        "answer": 1,
        "explanation": "Hourly income is bounded by your time."
      },
      {
        "id": "freelancing-career-a4",
        "kind": "conceptual",
        "topic": "Contracts",
        "question": "What is scope creep?",
        "options": [
          "The project finishing early",
          "The slow expansion of 'just one more thing' until the project is unrecognisable",
          "A type of contract",
          "A payment method"
        ],
        "answer": 1,
        "explanation": "Scope creep is uncontrolled growth of requirements without matching time or pay."
      },
      {
        "id": "freelancing-career-a5",
        "kind": "conceptual",
        "topic": "Portfolio",
        "question": "What makes a portfolio entry strong?",
        "options": [
          "A screenshot",
          "A case study with the problem, your actions, and a measured result",
          "A long list of technologies",
          "A tutorial project"
        ],
        "answer": 1,
        "explanation": "Case studies with numbers prove you delivered real outcomes."
      },
      {
        "id": "freelancing-career-a6",
        "kind": "code-reading",
        "topic": "Runway",
        "question": "What is the runway for 12000 savings and 2000 monthly expenses?",
        "options": [
          "2 months",
          "6 months",
          "12 months",
          "24 months"
        ],
        "answer": 1,
        "explanation": "12000 // 2000 = 6 months.",
        "code": "runway = savings // expenses  # 12000, 2000"
      },
      {
        "id": "freelancing-career-a7",
        "kind": "code-reading",
        "topic": "Rate",
        "question": "What hourly rate covers 60000 costs over 1000 billable hours?",
        "options": [
          "30",
          "60",
          "100",
          "600"
        ],
        "answer": 1,
        "explanation": "60000 // 1000 = 60 per hour.",
        "code": "rate = costs // hours  # 60000, 1000"
      },
      {
        "id": "freelancing-career-a8",
        "kind": "code-reading",
        "topic": "Progress",
        "question": "What is the progress for 3 of 4 milestones?",
        "options": [
          "25.0%",
          "75.0%",
          "33.0%",
          "100.0%"
        ],
        "answer": 1,
        "explanation": "3 / 4 * 100 = 75.0%.",
        "code": "progress = 3 / 4 * 100"
      },
      {
        "id": "freelancing-career-a9",
        "kind": "debugging",
        "topic": "Pricing",
        "question": "A freelancer charges hourly and works slowly to earn more. What is wrong?",
        "options": [
          "Nothing",
          "Hourly pricing rewards slowness and punishes efficiency",
          "They should charge more",
          "They should work faster for free"
        ],
        "answer": 1,
        "explanation": "The incentive points the wrong way: hourly pay rewards taking longer.",
        "code": "pay = hours * rate  # slower = more pay"
      },
      {
        "id": "freelancing-career-a10",
        "kind": "debugging",
        "topic": "Contracts",
        "question": "A freelancer started work with no contract and no deposit. What is the risk?",
        "options": [
          "None",
          "No scope, no payment schedule, and no protection when the client adds work or disappears",
          "The work is slower",
          "The client is happier"
        ],
        "answer": 1,
        "explanation": "Without an agreement there is no scope or payment protection.",
        "code": "started = True; contract = None; deposit = 0"
      }
    ],
    {
      "title": "Freelance monthly income",
      "type": "write-code",
      "instructions": "Write a program that reads the number of projects, the price per project, and monthly expenses, then prints exactly: Profit: <n>. Profit = projects * price - expenses.",
      "starterCode": "projects = int(input())\nprice = int(input())\nexpenses = int(input())\nprint(f\"Profit: {projects * price - expenses}\")",
      "solution": "projects = int(input())\nprice = int(input())\nexpenses = int(input())\nprint(f\"Profit: {projects * price - expenses}\")",
      "solutionExplanation": "Revenue is projects times price; subtract expenses to get the profit.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "3 projects at 2000, expenses 1500",
          "hidden": false,
          "stdin": "3\n2000\n1500\n",
          "expectedStdout": "Profit: 4500"
        },
        {
          "name": "2 projects at 1000, expenses 500",
          "hidden": true,
          "stdin": "2\n1000\n500\n",
          "expectedStdout": "Profit: 1500"
        }
      ],
      "hintNotes": {
        "concept": "Profit is revenue minus expenses — the number that decides whether the month worked.",
        "approach": "Compute projects * price - expenses.",
        "structure": "Structure: read three numbers, then one print with the profit."
      },
      "language": "python",
      "id": "freelancing-career-assessment-e1"
    },
    {
      "title": "Launch a freelance practice",
      "description": "Launch a real freelance practice on paper: niche, pricing, first-client plan, contract template, and a 3-month financial plan with runway and rates.",
      "requirements": [
        "Choose a niche and justify it",
        "Set rates using cost-plus and market data",
        "Write a first-client outreach plan with three warm contacts",
        "Draft a contract covering scope, price, schedule, ownership, and changes",
        "Build a 3-month financial plan with runway, expected income, and tax reserve"
      ],
      "rubric": [
        "The niche is specific and justified",
        "Rates follow from costs and market data",
        "The outreach plan names real warm contacts",
        "The contract covers scope, price, and changes",
        "The financial plan includes runway and tax reserve"
      ]
    },
  ),
  buildShortAssessment(
    "technical-writing",
    [
      {
        "id": "technical-writing-a1",
        "kind": "conceptual",
        "topic": "Quality",
        "question": "What is the test of a good technical document?",
        "options": [
          "It reads beautifully",
          "A stranger can follow it to success without asking anyone",
          "It is long",
          "It uses impressive words"
        ],
        "answer": 1,
        "explanation": "Documentation succeeds when a reader can complete the task from it alone."
      },
      {
        "id": "technical-writing-a2",
        "kind": "conceptual",
        "topic": "Audience",
        "question": "Why write a persona before drafting?",
        "options": [
          "It is a formality",
          "It decides what you can assume, explain, and skip",
          "It makes the document longer",
          "Personas are for marketing"
        ],
        "answer": 1,
        "explanation": "The persona is the standard every sentence is tested against."
      },
      {
        "id": "technical-writing-a3",
        "kind": "conceptual",
        "topic": "Structure",
        "question": "Why organise by the reader's goal instead of the system's architecture?",
        "options": [
          "It is shorter",
          "Readers think in goals, not in modules",
          "It is a rule",
          "Architectures change"
        ],
        "answer": 1,
        "explanation": "Goal-based headings let readers find the section they need immediately."
      },
      {
        "id": "technical-writing-a4",
        "kind": "conceptual",
        "topic": "Plain language",
        "question": "Why prefer active voice in technical writing?",
        "options": [
          "It is shorter",
          "It names who does what, so instructions are unambiguous",
          "It sounds formal",
          "It is a rule"
        ],
        "answer": 1,
        "explanation": "Active voice names the actor and the action."
      },
      {
        "id": "technical-writing-a5",
        "kind": "conceptual",
        "topic": "API docs",
        "question": "Why generate API references from code?",
        "options": [
          "It is faster",
          "Hand-written references rot the moment the code changes",
          "It looks better",
          "It is required"
        ],
        "answer": 1,
        "explanation": "Generated references stay in sync with the code."
      },
      {
        "id": "technical-writing-a6",
        "kind": "code-reading",
        "topic": "Headings",
        "question": "Which heading is GOOD by the verb rule?",
        "options": [
          "Introduction",
          "Deploy the app",
          "Overview",
          "Notes"
        ],
        "answer": 1,
        "explanation": "Goal headings start with a verb; 'Deploy the app' names the reader's task.",
        "code": "heading = 'Deploy the app'  # first word in {Deploy, Install, Configure, Create}"
      },
      {
        "id": "technical-writing-a7",
        "kind": "code-reading",
        "topic": "Jargon",
        "question": "A document has 8 unexplained jargon terms. What is the verdict?",
        "options": [
          "OK",
          "TOO MUCH JARGON",
          "PERFECT",
          "TOO SHORT"
        ],
        "answer": 1,
        "explanation": "More than 5 unexplained terms means the document is written for the author, not the reader.",
        "code": "jargon = 8  # > 5"
      },
      {
        "id": "technical-writing-a8",
        "kind": "code-reading",
        "topic": "Freshness",
        "question": "Docs are 30 days old, code changed 5 days ago. What is the verdict?",
        "options": [
          "FRESH",
          "STALE",
          "UNKNOWN",
          "PERFECT"
        ],
        "answer": 1,
        "explanation": "The docs predate the code change, so they may not describe the current code.",
        "code": "docs_days = 30; code_days = 5"
      },
      {
        "id": "technical-writing-a9",
        "kind": "debugging",
        "topic": "Tutorials",
        "question": "A tutorial works on the author's machine and nowhere else. What is missing?",
        "options": [
          "More steps",
          "Listed prerequisites and testing from scratch by someone else",
          "More diagrams",
          "A longer introduction"
        ],
        "answer": 1,
        "explanation": "Unlisted prerequisites mean the tutorial assumes an environment only the author has.",
        "code": "# works here, fails elsewhere"
      },
      {
        "id": "technical-writing-a10",
        "kind": "debugging",
        "topic": "Runbooks",
        "question": "A runbook says 'restart the database if it seems broken.' What is wrong?",
        "options": [
          "Nothing",
          "It needs exact commands, expected output, and an escalation point",
          "It is too long",
          "It is too specific"
        ],
        "answer": 1,
        "explanation": "'If it seems broken' is not an instruction a tired engineer can follow at 3 a.m.",
        "code": "restart the database if it seems broken"
      }
    ],
    {
      "title": "Readability score",
      "type": "write-code",
      "instructions": "Write a program that reads the number of sentences and the number of words in a document, then prints exactly: Words per sentence: <n> with one decimal place. Short sentences are clearer.",
      "starterCode": "sentences = int(input())\nwords = int(input())\nprint(f\"Words per sentence: {words / sentences:.1f}\")",
      "solution": "sentences = int(input())\nwords = int(input())\nprint(f\"Words per sentence: {words / sentences:.1f}\")",
      "solutionExplanation": "Divide total words by total sentences to get the average sentence length.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "10 sentences, 150 words",
          "hidden": false,
          "stdin": "10\n150\n",
          "expectedStdout": "Words per sentence: 15.0"
        },
        {
          "name": "5 sentences, 50 words",
          "hidden": true,
          "stdin": "5\n50\n",
          "expectedStdout": "Words per sentence: 10.0"
        }
      ],
      "hintNotes": {
        "concept": "Short sentences are clearer — the average length is words divided by sentences.",
        "approach": "Compute words / sentences and format with :.1f.",
        "structure": "Structure: read two numbers, then one print with the average."
      },
      "language": "python",
      "id": "technical-writing-assessment-e1"
    },
    {
      "title": "Document a small API",
      "description": "Write complete documentation for a small API: a README with a quick start, a tutorial, a generated-style reference with examples, and a runbook for the most common incident — all in Markdown, reviewed by a peer.",
      "requirements": [
        "A README answering what, install, run, and help, with the quick start first",
        "A tutorial with a stated goal, prerequisites, and verifiable steps",
        "A reference with an example request and response per endpoint plus error codes",
        "A runbook with exact commands, expected output, and an escalation point",
        "Peer review asking 'could you follow this to success?'"
      ],
      "rubric": [
        "The README serves a stranger in thirty seconds",
        "The tutorial is tested from scratch by someone else",
        "Every endpoint has an example and error codes",
        "The runbook is exact and actionable under pressure",
        "Review feedback was addressed"
      ]
    },
  ),
  buildShortAssessment(
    "agile-scrum",
    [
      {
        "id": "agile-scrum-a1",
        "kind": "conceptual",
        "topic": "Manifesto",
        "question": "What does the manifesto value over comprehensive documentation?",
        "options": [
          "Nothing",
          "Working software",
          "More meetings",
          "Faster typing"
        ],
        "answer": 1,
        "explanation": "Working software is the primary measure of progress."
      },
      {
        "id": "agile-scrum-a2",
        "kind": "conceptual",
        "topic": "Roles",
        "question": "Who decides the order of the product backlog?",
        "options": [
          "The Scrum Master",
          "The Product Owner",
          "The Developers",
          "The manager"
        ],
        "answer": 1,
        "explanation": "The Product Owner is the single voice of priority."
      },
      {
        "id": "agile-scrum-a3",
        "kind": "conceptual",
        "topic": "Sprint planning",
        "question": "What is a sprint goal?",
        "options": [
          "A list of tasks",
          "One sentence describing the outcome the sprint should achieve",
          "A deadline",
          "A bug count"
        ],
        "answer": 1,
        "explanation": "The sprint goal gives the sprint coherence and lets details adapt."
      },
      {
        "id": "agile-scrum-a4",
        "kind": "conceptual",
        "topic": "Standups",
        "question": "What is a standup for?",
        "options": [
          "Status reporting to the manager",
          "Coordination — surfacing blockers so the team can help",
          "Planning the sprint",
          "Performance reviews"
        ],
        "answer": 1,
        "explanation": "The standup coordinates: done, next, blocked."
      },
      {
        "id": "agile-scrum-a5",
        "kind": "conceptual",
        "topic": "Stories",
        "question": "What does INVEST stand for?",
        "options": [
          "Independent, Negotiable, Valuable, Estimable, Small, Testable",
          "Important, New, Valuable, Easy, Short, Tested",
          "It is a bank",
          "It is a testing framework"
        ],
        "answer": 0,
        "explanation": "INVEST is the checklist for a story that fits a sprint."
      },
      {
        "id": "agile-scrum-a6",
        "kind": "code-reading",
        "topic": "Capacity",
        "question": "What is the capacity of 5 developers at 8 points each?",
        "options": [
          "13",
          "40",
          "5",
          "8"
        ],
        "answer": 1,
        "explanation": "5 * 8 = 40 points.",
        "code": "capacity = devs * per  # 5, 8"
      },
      {
        "id": "agile-scrum-a7",
        "kind": "code-reading",
        "topic": "Velocity",
        "question": "What is the velocity for sprints of 30, 40, and 35 points?",
        "options": [
          "35.0",
          "105.0",
          "30.0",
          "40.0"
        ],
        "answer": 0,
        "explanation": "(30 + 40 + 35) / 3 = 35.0.",
        "code": "velocity = sum([30, 40, 35]) / 3"
      },
      {
        "id": "agile-scrum-a8",
        "kind": "code-reading",
        "topic": "WIP",
        "question": "With a WIP limit of 3 and 5 items in progress, what is the verdict?",
        "options": [
          "OK",
          "OVER LIMIT",
          "UNDER LIMIT",
          "DONE"
        ],
        "answer": 1,
        "explanation": "5 > 3, so the limit is exceeded.",
        "code": "wip = 5; limit = 3"
      },
      {
        "id": "agile-scrum-a9",
        "kind": "debugging",
        "topic": "Planning",
        "question": "A team planned 100% of capacity and a bug derailed the sprint. What went wrong?",
        "options": [
          "They were unlucky",
          "With no slack, any surprise derails the plan",
          "The bug was too big",
          "Sprints are too short"
        ],
        "answer": 1,
        "explanation": "Planning for 100% leaves no room for the unexpected, which always arrives.",
        "code": "planned = capacity  # 100%"
      },
      {
        "id": "agile-scrum-a10",
        "kind": "debugging",
        "topic": "Anti-patterns",
        "question": "A team holds every ceremony but ships nothing. What is it?",
        "options": [
          "Proper Scrum",
          "Zombie Scrum — ceremonies without feedback or delivery",
          "Kanban",
          "Scrumfall"
        ],
        "answer": 1,
        "explanation": "Zombie Scrum is ritual without results.",
        "code": "# all ceremonies, no delivery"
      }
    ],
    {
      "title": "Sprint forecast",
      "type": "write-code",
      "instructions": "Write a program that reads the backlog points remaining and the team's velocity per sprint, then prints exactly: Sprints needed: <n>. Round up partial sprints.",
      "starterCode": "remaining = int(input())\nvelocity = int(input())\nprint(f\"Sprints needed: {(remaining + velocity - 1) // velocity}\")",
      "solution": "remaining = int(input())\nvelocity = int(input())\nprint(f\"Sprints needed: {(remaining + velocity - 1) // velocity}\")",
      "solutionExplanation": "Divide the remaining points by velocity, rounding up with ceiling division.",
      "complexity": "Easy",
      "tests": [
        {
          "name": "100 points at 35 per sprint",
          "hidden": false,
          "stdin": "100\n35\n",
          "expectedStdout": "Sprints needed: 3"
        },
        {
          "name": "60 points at 30 per sprint",
          "hidden": true,
          "stdin": "60\n30\n",
          "expectedStdout": "Sprints needed: 2"
        }
      ],
      "hintNotes": {
        "concept": "Forecasting is the backlog divided by velocity, rounded up — a partial sprint still counts.",
        "approach": "Use ceiling division: (remaining + velocity - 1) // velocity.",
        "structure": "Structure: read two numbers, then one print with the forecast."
      },
      "language": "python",
      "id": "agile-scrum-assessment-e1"
    },
    {
      "title": "Run a real sprint",
      "description": "Run a one-week sprint on a real side project with a team (or solo, playing all roles): a backlog, a sprint goal, planning, standups, a demo, and a retrospective with one owned improvement.",
      "requirements": [
        "A backlog of user stories with acceptance criteria",
        "A one-sentence sprint goal",
        "A sprint plan for 80% of capacity",
        "A demo of working software to a real stakeholder",
        "A retrospective with one concrete improvement, an owner, and a deadline"
      ],
      "rubric": [
        "Stories follow the user-story format with acceptance criteria",
        "The sprint goal is one sentence and was met or honestly missed",
        "The demo showed working software, not slides",
        "The retrospective produced one owned improvement",
        "The plan left slack for the unexpected"
      ]
    },
  ),
];
