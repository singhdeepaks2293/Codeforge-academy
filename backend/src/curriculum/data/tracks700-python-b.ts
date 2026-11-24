import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
  {
    "id": "py-asyncio-basics",
    "slug": "py-asyncio-basics",
    "language": "python",
    "category": "languages",
    "title": "Asyncio Foundations",
    "description": "Learn Python's asyncio library from the ground up: coroutines, the event loop, tasks, timeouts, and queues, so you can write programs that wait on many things at once without threads.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "asyncio event loop",
      "Coroutines",
      "asyncio.run",
      "Creating tasks",
      "asyncio.gather",
      "Timeouts with wait_for",
      "asyncio.Queue",
      "Async locks"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to run a busy cafe kitchen: one cook, many orders, and no time wasted standing still while something boils.",
    "modules": [
      {
        "id": "py-asyncio-basics-m1",
        "title": "Fundamentals of Asyncio Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-asyncio-basics-m1-l1",
            "slug": "py-asyncio-basics-m1-l1",
            "title": "What Asyncio Is",
            "concept": "Asyncio is Python's built-in library for writing concurrent code with async and await, letting one thread juggle many waiting operations. It is designed for programs that spend most of their time waiting on network replies, files, or timers rather than doing heavy computation.",
            "syntax": "asyncio.run(main())",
            "exampleCode": "import asyncio\n\nasync def greet(name):\n    await asyncio.sleep(0)\n    return f\"hello {name}\"\n\nasync def main():\n    print(await greet(\"ada\"))\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Calling an async function without await and expecting its result, which only returns a coroutine object.",
            "bug": {
              "prompt": "The code below should greet one person and print the greeting, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def greet(name):\n    return f\"hello {name}\"\n\nprint(greet(\"ada\"))\n",
              "fixedCode": "import asyncio\n\nasync def greet(name):\n    return f\"hello {name}\"\n\nasync def main():\n    print(await greet(\"ada\"))\n\nasyncio.run(main())\n",
              "explanation": "Calling greet(\"ada\") without await returns a coroutine object instead of running the function, so the greeting is never produced."
            },
            "exercise": {
              "title": "Practise What Asyncio Is",
              "type": "write-code",
              "instructions": "Write an async main() that awaits a coroutine returning the number 42 and prints it.",
              "starterCode": "import asyncio\n\nasync def answer():\n    # TODO: return 42\n    return 0\n\nasync def main():\n    # TODO: await answer() and print the result\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio\n\nasync def answer():\n    return 42\n\nasync def main():\n    print(await answer())\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "What Asyncio Is is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-asyncio-basics-m1-l2",
            "slug": "py-asyncio-basics-m1-l2",
            "title": "The Event Loop",
            "concept": "The event loop is the engine inside asyncio that runs coroutines, switching between them whenever one awaits something. A single event loop can keep thousands of coroutines moving forward because it never blocks on one slow operation.",
            "syntax": "loop = asyncio.new_event_loop()",
            "exampleCode": "import asyncio\n\nasync def work(name):\n    await asyncio.sleep(0)\n    return name\n\nasync def main():\n    done = await asyncio.gather(work(\"a\"), work(\"b\"))\n    print(\",\".join(done))\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Trying to call asyncio.run() twice inside the same program without understanding that each call creates a fresh loop.",
            "bug": {
              "prompt": "The code below should run two small coroutines and print their results joined by a comma, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def work(name):\n    return name\n\nasync def main():\n    print(work(\"a\"), work(\"b\"))\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def work(name):\n    return name\n\nasync def main():\n    done = await asyncio.gather(work(\"a\"), work(\"b\"))\n    print(\",\".join(done))\n\nasyncio.run(main())\n",
              "explanation": "Printing the coroutine objects directly never runs them; gather awaits both and returns their real results."
            },
            "exercise": {
              "title": "Practise The Event Loop",
              "type": "write-code",
              "instructions": "Use asyncio.gather to run two coroutines returning 'red' and 'blue' and print them joined with a comma.",
              "starterCode": "import asyncio\n\nasync def colour(name):\n    return name\n\nasync def main():\n    # TODO: gather colour(\"red\") and colour(\"blue\"), print joined by comma\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio\n\nasync def colour(name):\n    return name\n\nasync def main():\n    done = await asyncio.gather(colour(\"red\"), colour(\"blue\"))\n    print(\",\".join(done))\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "red,blue",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "red,blue",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The Event Loop is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-asyncio-basics-m1-l3",
            "slug": "py-asyncio-basics-m1-l3",
            "title": "async and await Basics",
            "concept": "The async keyword marks a function as a coroutine and await pauses it until another coroutine finishes. Awaiting is what lets the event loop switch to other work instead of blocking the whole program.",
            "syntax": "async def fetch():\n    data = await get_data()",
            "exampleCode": "import asyncio\n\nasync def double(n):\n    await asyncio.sleep(0)\n    return n * 2\n\nasync def main():\n    print(await double(21))\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Using await outside an async function, which is a syntax error.",
            "bug": {
              "prompt": "The code below should double a number inside a coroutine and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "async def double(n):\n    return n * 2\n\nprint(double(21))\n",
              "fixedCode": "import asyncio\n\nasync def double(n):\n    return n * 2\n\nasync def main():\n    print(await double(21))\n\nasyncio.run(main())\n",
              "explanation": "A coroutine must be awaited inside another async function; printing it directly shows a coroutine object, not the doubled number."
            },
            "exercise": {
              "title": "Check your understanding of async and await Basics",
              "type": "multiple-choice",
              "instructions": "Which statement about async and await Basics is correct?",
              "starterCode": "",
              "solution": "The async keyword marks a function as a coroutine and await pauses it until another coroutine finishes.",
              "solutionExplanation": "The async keyword marks a function as a coroutine and await pauses it until another coroutine finishes. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The async keyword marks a function as a coroutine and await pauses it until another coroutine finishes.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what async and await Basics actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "The async keyword marks a function as a coroutine and await pauses it until another coroutine finishes.",
                "async and await Basics can only be used once in a program",
                "async and await Basics requires a separate paid licence to use",
                "async and await Basics only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-asyncio-basics-m1-l4",
            "slug": "py-asyncio-basics-m1-l4",
            "title": "Creating Tasks",
            "concept": "asyncio.create_task schedules a coroutine to run in the background while the current code keeps going. Tasks let a program start work early and collect the result later instead of waiting for each step in turn.",
            "syntax": "task = asyncio.create_task(coro())",
            "exampleCode": "import asyncio\n\nasync def slow():\n    await asyncio.sleep(0)\n    return 7\n\nasync def main():\n    task = asyncio.create_task(slow())\n    print(await task)\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Creating a task and forgetting to await it, so the program ends before the task finishes.",
            "bug": {
              "prompt": "The code below should start a task that returns 7 and print its result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def slow():\n    return 7\n\nasync def main():\n    asyncio.create_task(slow())\n    print(\"done\")\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def slow():\n    return 7\n\nasync def main():\n    task = asyncio.create_task(slow())\n    print(await task)\n\nasyncio.run(main())\n",
              "explanation": "A task that is never awaited may not finish before main returns, so its result is lost."
            },
            "exercise": {
              "title": "Practise Creating Tasks",
              "type": "write-code",
              "instructions": "Create a task for a coroutine that returns 99 and print the awaited result.",
              "starterCode": "import asyncio\n\nasync def value():\n    return 99\n\nasync def main():\n    # TODO: create a task for value() and print its awaited result\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio\n\nasync def value():\n    return 99\n\nasync def main():\n    task = asyncio.create_task(value())\n    print(await task)\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "99",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "99",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Creating Tasks is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-asyncio-basics-m1-l5",
            "slug": "py-asyncio-basics-m1-l5",
            "title": "Task Cancellation",
            "concept": "Cancelling a task raises CancelledError inside it at the next await point, which lets the task clean up and stop early. Code that catches CancelledError must re-raise it, or the cancellation is silently swallowed.",
            "syntax": "task.cancel()",
            "exampleCode": "import asyncio\n\nasync def worker():\n    try:\n        await asyncio.sleep(10)\n    except asyncio.CancelledError:\n        return \"stopped\"\n    return \"finished\"\n\nasync def main():\n    task = asyncio.create_task(worker())\n    task.cancel()\n    print(await task)\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Catching CancelledError and returning normally without re-raising it, which hides the cancellation.",
            "bug": {
              "prompt": "The code below should cancel a waiting task and print the cleanup message it returns, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def worker():\n    await asyncio.sleep(10)\n    return \"finished\"\n\nasync def main():\n    task = asyncio.create_task(worker())\n    task.cancel()\n    print(await task)\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def worker():\n    try:\n        await asyncio.sleep(10)\n    except asyncio.CancelledError:\n        return \"stopped\"\n    return \"finished\"\n\nasync def main():\n    task = asyncio.create_task(worker())\n    task.cancel()\n    print(await task)\n\nasyncio.run(main())\n",
              "explanation": "Without catching CancelledError the cancelled task raises instead of returning the cleanup message, so awaiting it raises the error."
            },
            "exercise": {
              "title": "Check your understanding of Task Cancellation",
              "type": "multiple-choice",
              "instructions": "Which statement about Task Cancellation is correct?",
              "starterCode": "",
              "solution": "Cancelling a task raises CancelledError inside it at the next await point, which lets the task clean up and stop early.",
              "solutionExplanation": "Cancelling a task raises CancelledError inside it at the next await point, which lets the task clean up and stop early. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Cancelling a task raises CancelledError inside it at the next await point, which lets the task clean up and stop early.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Task Cancellation actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Cancelling a task raises CancelledError inside it at the next await point, which lets the task clean up and stop early.",
                "Task Cancellation can only be used once in a program",
                "Task Cancellation requires a separate paid licence to use",
                "Task Cancellation only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-asyncio-basics-m2",
        "title": "Asyncio Foundations in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-asyncio-basics-m2-l1",
            "slug": "py-asyncio-basics-m2-l1",
            "title": "Gathering Results with gather",
            "concept": "asyncio.gather runs several awaitables at once and returns their results in the same order they were passed. It is the simplest way to fan work out to many coroutines and collect every answer in one place.",
            "syntax": "results = await asyncio.gather(coro1(), coro2())",
            "exampleCode": "import asyncio\n\nasync def square(n):\n    return n * n\n\nasync def main():\n    print(await asyncio.gather(square(2), square(3), square(4)))\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Assuming gather returns results in completion order instead of argument order.",
            "bug": {
              "prompt": "The code below should gather the squares of 2, 3 and 4 and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def square(n):\n    return n * n\n\nasync def main():\n    print(await asyncio.gather(square(2), square(3)))\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def square(n):\n    return n * n\n\nasync def main():\n    print(await asyncio.gather(square(2), square(3), square(4)))\n\nasyncio.run(main())\n",
              "explanation": "Gather was only given two of the three coroutines, so the square of 4 is missing from the printed list."
            },
            "exercise": {
              "title": "Practise Gathering Results with gather",
              "type": "write-code",
              "instructions": "Read three integers from stdin, gather their squares concurrently, and print the resulting list.",
              "starterCode": "import asyncio, sys\n\nasync def square(n):\n    return n * n\n\nasync def main():\n    # TODO: read ints from stdin, gather squares, print the list\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio, sys\n\nasync def square(n):\n    return n * n\n\nasync def main():\n    nums = [int(x) for x in sys.stdin.read().split()]\n    print(await asyncio.gather(*[square(n) for n in nums]))\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[4, 9, 16]",
                  "hidden": false,
                  "stdin": "2 3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[25, 36]",
                  "hidden": true,
                  "stdin": "5 6"
                }
              ],
              "hintNotes": {
                "concept": "Gathering Results with gather is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-asyncio-basics-m2-l2",
            "slug": "py-asyncio-basics-m2-l2",
            "title": "Timeouts with wait_for",
            "concept": "asyncio.wait_for wraps an awaitable with a deadline and raises TimeoutError if it does not finish in time. Timeouts stop a program from hanging forever on one slow operation.",
            "syntax": "await asyncio.wait_for(coro(), timeout=2.0)",
            "exampleCode": "import asyncio\n\nasync def quick():\n    return \"fast\"\n\nasync def main():\n    print(await asyncio.wait_for(quick(), timeout=1.0))\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that a timed-out task is cancelled, so its cleanup code may still run.",
            "bug": {
              "prompt": "The code below should wrap a quick coroutine in wait_for with a 1 second timeout and print its result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def quick():\n    return \"fast\"\n\nasync def main():\n    print(await quick())\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def quick():\n    return \"fast\"\n\nasync def main():\n    print(await asyncio.wait_for(quick(), timeout=1.0))\n\nasyncio.run(main())\n",
              "explanation": "Without wait_for there is no deadline at all, so a slow coroutine could hang the program forever."
            },
            "exercise": {
              "title": "Practise Timeouts with wait_for",
              "type": "write-code",
              "instructions": "Read a timeout in seconds from stdin, wrap a coroutine returning 'done' in wait_for, and print the result or 'timed out' on TimeoutError.",
              "starterCode": "import asyncio, sys\n\nasync def work():\n    await asyncio.sleep(0)\n    return \"done\"\n\nasync def main():\n    # TODO: read timeout, wait_for work(), print result or 'timed out'\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio, sys\n\nasync def work():\n    await asyncio.sleep(0)\n    return \"done\"\n\nasync def main():\n    timeout = float(sys.stdin.read().strip())\n    try:\n        print(await asyncio.wait_for(work(), timeout=timeout))\n    except TimeoutError:\n        print(\"timed out\")\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "done",
                  "hidden": false,
                  "stdin": "1"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "done",
                  "hidden": true,
                  "stdin": "0.0001"
                }
              ],
              "hintNotes": {
                "concept": "Timeouts with wait_for is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-asyncio-basics-m2-l3",
            "slug": "py-asyncio-basics-m2-l3",
            "title": "Queues Between Coroutines",
            "concept": "An asyncio.Queue lets coroutines pass work to each other safely, with producers putting items in and consumers taking them out. Queues decouple the producer from the consumer so neither has to know about the other.",
            "syntax": "queue = asyncio.Queue()",
            "exampleCode": "import asyncio\n\nasync def main():\n    q = asyncio.Queue()\n    await q.put(10)\n    print(await q.get())\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Calling queue.get_nowait() on an empty queue and crashing with QueueEmpty instead of awaiting get().",
            "bug": {
              "prompt": "The code below should put 10 into a queue and print the value taken out, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def main():\n    q = asyncio.Queue()\n    print(q.get_nowait())\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def main():\n    q = asyncio.Queue()\n    await q.put(10)\n    print(await q.get())\n\nasyncio.run(main())\n",
              "explanation": "get_nowait on an empty queue raises QueueEmpty immediately, while awaiting get waits until an item is available."
            },
            "exercise": {
              "title": "Check your understanding of Queues Between Coroutines",
              "type": "multiple-choice",
              "instructions": "Which statement about Queues Between Coroutines is correct?",
              "starterCode": "",
              "solution": "An asyncio.",
              "solutionExplanation": "An asyncio. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An asyncio.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Queues Between Coroutines actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "An asyncio.",
                "Queues Between Coroutines can only be used once in a program",
                "Queues Between Coroutines requires a separate paid licence to use",
                "Queues Between Coroutines only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-asyncio-basics-m2-l4",
            "slug": "py-asyncio-basics-m2-l4",
            "title": "Async Locks",
            "concept": "An asyncio.Lock lets coroutines take turns using shared state, so only one runs the protected section at a time. Unlike a thread lock, it never blocks the event loop because acquiring it is awaited.",
            "syntax": "async with lock:",
            "exampleCode": "import asyncio\n\nasync def main():\n    lock = asyncio.Lock()\n    async with lock:\n        print(\"inside\")\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Holding a lock across an await that never finishes, which deadlocks every other waiter.",
            "bug": {
              "prompt": "The code below should acquire a lock and print 'inside' while holding it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def main():\n    lock = asyncio.Lock()\n    lock.acquire()\n    print(\"inside\")\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def main():\n    lock = asyncio.Lock()\n    async with lock:\n        print(\"inside\")\n\nasyncio.run(main())\n",
              "explanation": "Calling the synchronous acquire() returns a coroutine that is never awaited, so the lock is never actually held and a warning is raised."
            },
            "exercise": {
              "title": "Practise Async Locks",
              "type": "write-code",
              "instructions": "Use an asyncio.Lock to guard increments of a shared counter by 3 coroutines, then print the final counter value.",
              "starterCode": "import asyncio\n\nasync def bump(counter, lock):\n    # TODO: acquire lock, increment counter[0], release\n    pass\n\nasync def main():\n    # TODO: run 3 bump tasks and print counter[0]\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio\n\nasync def bump(counter, lock):\n    async with lock:\n        counter[0] += 1\n\nasync def main():\n    counter = [0]\n    lock = asyncio.Lock()\n    await asyncio.gather(*[bump(counter, lock) for _ in range(3)])\n    print(counter[0])\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "3",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "3",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Async Locks is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-asyncio-basics-m2-l5",
            "slug": "py-asyncio-basics-m2-l5",
            "title": "Building a Tiny Async Pipeline",
            "concept": "An async pipeline chains stages together with queues, so each stage processes items as they arrive instead of waiting for the whole batch. Pipelines keep memory low and latency short because work flows through continuously.",
            "syntax": "await queue.put(item)",
            "exampleCode": "import asyncio\n\nasync def stage(q_in, q_out):\n    item = await q_in.get()\n    await q_out.put(item * 2)\n\nasync def main():\n    q1, q2 = asyncio.Queue(), asyncio.Queue()\n    await q1.put(21)\n    await stage(q1, q2)\n    print(await q2.get())\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to signal the end of a pipeline, so the consumer waits forever for more items.",
            "bug": {
              "prompt": "The code below should pass 21 through a doubling stage and print the output, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def stage(q_in, q_out):\n    item = await q_in.get()\n    await q_out.put(item + 1)\n\nasync def main():\n    q1, q2 = asyncio.Queue(), asyncio.Queue()\n    await q1.put(21)\n    await stage(q1, q2)\n    print(await q2.get())\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def stage(q_in, q_out):\n    item = await q_in.get()\n    await q_out.put(item * 2)\n\nasync def main():\n    q1, q2 = asyncio.Queue(), asyncio.Queue()\n    await q1.put(21)\n    await stage(q1, q2)\n    print(await q2.get())\n\nasyncio.run(main())\n",
              "explanation": "Adding 1 instead of doubling gives 22, not the 42 the pipeline promises."
            },
            "exercise": {
              "title": "Practise Building a Tiny Async Pipeline",
              "type": "write-code",
              "instructions": "Read integers from stdin, double each one through an async pipeline stage, and print the doubled values space-separated.",
              "starterCode": "import asyncio, sys\n\nasync def stage(q_in, q_out):\n    # TODO: take one item, double it, put it in q_out\n    pass\n\nasync def main():\n    # TODO: read ints, run them through the stage, print doubled values\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio, sys\n\nasync def stage(q_in, q_out):\n    item = await q_in.get()\n    await q_out.put(item * 2)\n\nasync def main():\n    nums = [int(x) for x in sys.stdin.read().split()]\n    q1, q2 = asyncio.Queue(), asyncio.Queue()\n    for n in nums:\n        await q1.put(n)\n    for _ in nums:\n        await stage(q1, q2)\n    out = [await q2.get() for _ in nums]\n    print(\" \".join(str(x) for x in out))\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "6 8 10",
                  "hidden": false,
                  "stdin": "3 4 5"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "20 40",
                  "hidden": true,
                  "stdin": "10 20"
                }
              ],
              "hintNotes": {
                "concept": "Building a Tiny Async Pipeline is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Async Fetcher",
      "type": "build-program",
      "instructions": "Build an async fetcher: read page names from stdin, 'fetch' each one concurrently (each fetch returns name and a size of len(name) * 10), and print 'name: size' lines sorted by name.",
      "starterCode": "import asyncio, sys\n\nasync def fetch(name):\n    # TODO: return (name, len(name) * 10)\n    return (name, 0)\n\nasync def main():\n    # TODO: read names, gather fetch results, print sorted 'name: size' lines\n    pass\n\nasyncio.run(main())\n",
      "solution": "import asyncio, sys\n\nasync def fetch(name):\n    await asyncio.sleep(0)\n    return (name, len(name) * 10)\n\nasync def main():\n    names = sys.stdin.read().split()\n    results = await asyncio.gather(*[fetch(n) for n in names])\n    for name, size in sorted(results):\n        print(f\"{name}: {size}\")\n\nasyncio.run(main())\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "alpha: 50\nbeta: 40\ngamma: 50",
          "hidden": false,
          "stdin": "alpha beta gamma"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "one: 30\ntwo: 30",
          "hidden": true,
          "stdin": "one two"
        }
      ],
      "hintNotes": {
        "concept": "Async Fetcher is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Async Fetcher Capstone Project",
      "description": "A small end-to-end async program that fetches several items concurrently and reports their sizes in order.",
      "requirements": [
        "Use asyncio.gather to fetch all items concurrently.",
        "Apply at least three of these skills: Coroutines, asyncio.run, Creating tasks, asyncio.gather.",
        "Handle empty input gracefully by printing nothing.",
        "Keep the code organised into clear functions with a single main() entry point."
      ],
      "rubric": [
        "Program runs and fetches all items concurrently.",
        "Code is clear, well-named, and organised into functions.",
        "Empty input and single-item input both work correctly.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-async-await",
    "slug": "py-async-await",
    "language": "python",
    "category": "languages",
    "title": "Async and Await in Depth",
    "description": "Go beyond the basics of async and await: async iterators, async generators, async context managers, error handling, and throttling, so you can write correct async code instead of code that only looks async.",
    "difficulty": "Intermediate",
    "estimatedHours": 15,
    "skills": [
      "Coroutines",
      "Async iterators",
      "Async generators",
      "Async context managers",
      "Awaiting with gather",
      "Coroutine error handling",
      "Shielding tasks",
      "Semaphores"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to conduct an orchestra: every player waits for your signal, and the music only works if nobody plays over anyone else.",
    "modules": [
      {
        "id": "py-async-await-m1",
        "title": "Fundamentals of Async and Await in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-async-await-m1-l1",
            "slug": "py-async-await-m1-l1",
            "title": "Coroutines vs Functions",
            "concept": "A coroutine function returns a coroutine object when called and does no work until it is awaited. A regular function runs immediately, so the difference is not syntax but when the work actually happens.",
            "syntax": "async def f(): ...",
            "exampleCode": "import asyncio\n\nasync def greet():\n    return \"hi\"\n\nprint(asyncio.run(greet()))\n",
            "exampleLanguage": "python",
            "mistake": "Treating a coroutine like a normal function and calling it in a loop without awaiting the results.",
            "bug": {
              "prompt": "The code below should run a coroutine that returns 'hi' and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "async def greet():\n    return \"hi\"\n\nprint(greet())\n",
              "fixedCode": "import asyncio\n\nasync def greet():\n    return \"hi\"\n\nprint(asyncio.run(greet()))\n",
              "explanation": "Calling greet() only builds a coroutine object, so printing it shows the object instead of 'hi'."
            },
            "exercise": {
              "title": "Practise Coroutines vs Functions",
              "type": "write-code",
              "instructions": "Write a coroutine that returns the string 'ready' and print it via asyncio.run.",
              "starterCode": "import asyncio\n\nasync def status():\n    # TODO: return 'ready'\n    return ''\n\n# TODO: print asyncio.run(status())\n",
              "solution": "import asyncio\n\nasync def status():\n    return \"ready\"\n\nprint(asyncio.run(status()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ready",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "ready",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Coroutines vs Functions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-async-await-m1-l2",
            "slug": "py-async-await-m1-l2",
            "title": "Awaiting Multiple Things",
            "concept": "Awaiting several coroutines one after another runs them in sequence, while gather runs them together. Choosing the wrong one is the most common async performance mistake: sequential awaits where concurrency was wanted.",
            "syntax": "await asyncio.gather(a(), b())",
            "exampleCode": "import asyncio\n\nasync def one():\n    return 1\n\nasync def two():\n    return 2\n\nasync def main():\n    print(await asyncio.gather(one(), two()))\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Awaiting coroutines in a loop when they are independent, which turns parallel work into sequential work.",
            "bug": {
              "prompt": "The code below should gather the results of coroutines returning 1 and 2 and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def one():\n    return 1\n\nasync def two():\n    return 2\n\nasync def main():\n    print([await one(), await two()])\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def one():\n    return 1\n\nasync def two():\n    return 2\n\nasync def main():\n    print(await asyncio.gather(one(), two()))\n\nasyncio.run(main())\n",
              "explanation": "Sequential awaits run one() fully before two() starts, so the two coroutines never overlap; gather runs them together."
            },
            "exercise": {
              "title": "Practise Awaiting Multiple Things",
              "type": "write-code",
              "instructions": "Read two integers from stdin, add them inside two coroutines, gather the results, and print their sum.",
              "starterCode": "import asyncio, sys\n\nasync def value(n):\n    return n\n\nasync def main():\n    # TODO: read two ints, gather value() for each, print the sum\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio, sys\n\nasync def value(n):\n    return n\n\nasync def main():\n    nums = [int(x) for x in sys.stdin.read().split()]\n    done = await asyncio.gather(*[value(n) for n in nums])\n    print(sum(done))\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42",
                  "hidden": false,
                  "stdin": "10 32"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "24",
                  "hidden": true,
                  "stdin": "7 8 9"
                }
              ],
              "hintNotes": {
                "concept": "Awaiting Multiple Things is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-async-await-m1-l3",
            "slug": "py-async-await-m1-l3",
            "title": "Async Comprehensions",
            "concept": "An async comprehension uses async for inside square brackets to collect values from an async iterable. It is the compact way to gather items from a stream without writing an explicit loop.",
            "syntax": "[x async for x in stream()]",
            "exampleCode": "import asyncio\n\nasync def gen():\n    for n in (1, 2, 3):\n        yield n\n\nasync def main():\n    print([n async for n in gen()])\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting the async keyword in the comprehension, which makes it a syntax error over an async iterable.",
            "bug": {
              "prompt": "The code below should collect values from an async generator with a comprehension and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def gen():\n    for n in (1, 2, 3):\n        yield n\n\nasync def main():\n    print([n for n in gen()])\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def gen():\n    for n in (1, 2, 3):\n        yield n\n\nasync def main():\n    print([n async for n in gen()])\n\nasyncio.run(main())\n",
              "explanation": "A plain for inside the comprehension cannot iterate an async generator; it needs async for."
            },
            "exercise": {
              "title": "Check your understanding of Async Comprehensions",
              "type": "multiple-choice",
              "instructions": "Which statement about Async Comprehensions is correct?",
              "starterCode": "",
              "solution": "An async comprehension uses async for inside square brackets to collect values from an async iterable.",
              "solutionExplanation": "An async comprehension uses async for inside square brackets to collect values from an async iterable. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An async comprehension uses async for inside square brackets to collect values from an async iterable.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Async Comprehensions actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "An async comprehension uses async for inside square brackets to collect values from an async iterable.",
                "Async Comprehensions can only be used once in a program",
                "Async Comprehensions requires a separate paid licence to use",
                "Async Comprehensions only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-async-await-m1-l4",
            "slug": "py-async-await-m1-l4",
            "title": "Async Iterators",
            "concept": "An async iterator defines __aiter__ and __anext__ so it can be used with async for, producing each item only when awaited. Async iterators are how streams of data, such as paginated API results, are consumed one page at a time.",
            "syntax": "async for item in stream:",
            "exampleCode": "import asyncio\n\nclass Counter:\n    def __init__(self):\n        self.n = 0\n    def __aiter__(self):\n        return self\n    async def __anext__(self):\n        self.n += 1\n        if self.n > 3:\n            raise StopAsyncIteration\n        return self.n\n\nasync def main():\n    print([n async for n in Counter()])\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Raising StopIteration instead of StopAsyncIteration, which breaks async iteration.",
            "bug": {
              "prompt": "The code below should iterate an async counter to 3 and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nclass Counter:\n    def __init__(self):\n        self.n = 0\n    def __aiter__(self):\n        return self\n    async def __anext__(self):\n        self.n += 1\n        if self.n > 3:\n            raise StopIteration\n        return self.n\n\nasync def main():\n    print([n async for n in Counter()])\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nclass Counter:\n    def __init__(self):\n        self.n = 0\n    def __aiter__(self):\n        return self\n    async def __anext__(self):\n        self.n += 1\n        if self.n > 3:\n            raise StopAsyncIteration\n        return self.n\n\nasync def main():\n    print([n async for n in Counter()])\n\nasyncio.run(main())\n",
              "explanation": "Async iteration ends with StopAsyncIteration; raising StopIteration inside __anext__ turns into a RuntimeError."
            },
            "exercise": {
              "title": "Practise Async Iterators",
              "type": "write-code",
              "instructions": "Write an async iterator that yields the numbers 1 to 3, collect them with async for, and print the list.",
              "starterCode": "import asyncio\n\nclass Counter:\n    # TODO: __aiter__ returns self; __anext__ yields 1, 2, 3 then StopAsyncIteration\n    pass\n\nasync def main():\n    # TODO: collect [n async for n in Counter()] and print it\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio\n\nclass Counter:\n    def __init__(self):\n        self.n = 0\n    def __aiter__(self):\n        return self\n    async def __anext__(self):\n        self.n += 1\n        if self.n > 3:\n            raise StopAsyncIteration\n        return self.n\n\nasync def main():\n    print([n async for n in Counter()])\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[1, 2, 3]",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[1, 2, 3]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Async Iterators is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-async-await-m1-l5",
            "slug": "py-async-await-m1-l5",
            "title": "Async Context Managers",
            "concept": "An async context manager defines __aenter__ and __aexit__ so it can be used with async with, doing async setup and cleanup around a block. They are the right tool for resources whose opening and closing both need to wait, such as network connections.",
            "syntax": "async with resource:",
            "exampleCode": "import asyncio\n\nclass Door:\n    async def __aenter__(self):\n        return \"open\"\n    async def __aexit__(self, *exc):\n        return False\n\nasync def main():\n    async with Door() as state:\n        print(state)\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Defining __enter__ instead of __aenter__ and then using the object with async with.",
            "bug": {
              "prompt": "The code below should enter an async context manager and print the state it returns, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nclass Door:\n    def __enter__(self):\n        return \"open\"\n    def __exit__(self, *exc):\n        return False\n\nasync def main():\n    async with Door() as state:\n        print(state)\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nclass Door:\n    async def __aenter__(self):\n        return \"open\"\n    async def __aexit__(self, *exc):\n        return False\n\nasync def main():\n    async with Door() as state:\n        print(state)\n\nasyncio.run(main())\n",
              "explanation": "async with looks for __aenter__ and __aexit__; a plain __enter__ is ignored and the block fails."
            },
            "exercise": {
              "title": "Check your understanding of Async Context Managers",
              "type": "multiple-choice",
              "instructions": "Which statement about Async Context Managers is correct?",
              "starterCode": "",
              "solution": "An async context manager defines __aenter__ and __aexit__ so it can be used with async with, doing async setup and cleanup around a block.",
              "solutionExplanation": "An async context manager defines __aenter__ and __aexit__ so it can be used with async with, doing async setup and cleanup around a block. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An async context manager defines __aenter__ and __aexit__ so it can be used with async with, doing async setup and cleanup around a block.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Async Context Managers actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "An async context manager defines __aenter__ and __aexit__ so it can be used with async with, doing async setup and cleanup around a block.",
                "Async Context Managers can only be used once in a program",
                "Async Context Managers requires a separate paid licence to use",
                "Async Context Managers only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-async-await-m2",
        "title": "Async and Await in Depth in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-async-await-m2-l1",
            "slug": "py-async-await-m2-l1",
            "title": "Async Generators",
            "concept": "An async generator uses async def with yield to produce values lazily, pausing between items. It is ideal for streaming data that arrives slowly, because the consumer processes each item as soon as it appears.",
            "syntax": "async def stream():\n    yield value",
            "exampleCode": "import asyncio\n\nasync def squares(nums):\n    for n in nums:\n        yield n * n\n\nasync def main():\n    print([n async for n in squares([1, 2, 3])])\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Using return with a value inside an async generator, which raises StopAsyncIteration with that value instead of yielding it.",
            "bug": {
              "prompt": "The code below should yield the squares of 1, 2 and 3 from an async generator and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def squares(nums):\n    for n in nums:\n        return n * n\n\nasync def main():\n    print([n async for n in squares([1, 2, 3])])\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def squares(nums):\n    for n in nums:\n        yield n * n\n\nasync def main():\n    print([n async for n in squares([1, 2, 3])])\n\nasyncio.run(main())\n",
              "explanation": "return inside a generator ends it immediately with no values, so the comprehension collects nothing."
            },
            "exercise": {
              "title": "Practise Async Generators",
              "type": "write-code",
              "instructions": "Read integers from stdin, yield their doubles from an async generator, and print the collected list.",
              "starterCode": "import asyncio, sys\n\nasync def doubles(nums):\n    # TODO: yield n * 2 for each n\n    pass\n\nasync def main():\n    # TODO: read ints, collect [n async for n in doubles(nums)], print it\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio, sys\n\nasync def doubles(nums):\n    for n in nums:\n        yield n * 2\n\nasync def main():\n    nums = [int(x) for x in sys.stdin.read().split()]\n    print([n async for n in doubles(nums)])\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[2, 4, 6]",
                  "hidden": false,
                  "stdin": "1 2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[10, 20]",
                  "hidden": true,
                  "stdin": "5 10"
                }
              ],
              "hintNotes": {
                "concept": "Async Generators is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-async-await-m2-l2",
            "slug": "py-async-await-m2-l2",
            "title": "Handling Errors in Coroutines",
            "concept": "An exception inside a coroutine only surfaces when the coroutine is awaited, so un-awaited coroutines can hide failures. Gathering with return_exceptions=True collects errors as results instead of letting the first failure cancel the rest.",
            "syntax": "await asyncio.gather(*tasks, return_exceptions=True)",
            "exampleCode": "import asyncio\n\nasync def risky():\n    raise ValueError(\"boom\")\n\nasync def main():\n    results = await asyncio.gather(risky(), return_exceptions=True)\n    print(type(results[0]).__name__)\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Letting one failing coroutine cancel a whole gather instead of using return_exceptions=True.",
            "bug": {
              "prompt": "The code below should gather a failing coroutine with return_exceptions=True and print the exception type name, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def risky():\n    raise ValueError(\"boom\")\n\nasync def main():\n    print(await asyncio.gather(risky()))\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def risky():\n    raise ValueError(\"boom\")\n\nasync def main():\n    results = await asyncio.gather(risky(), return_exceptions=True)\n    print(type(results[0]).__name__)\n\nasyncio.run(main())\n",
              "explanation": "Without return_exceptions=True the ValueError propagates out of gather and the program crashes instead of reporting the error type."
            },
            "exercise": {
              "title": "Practise Handling Errors in Coroutines",
              "type": "write-code",
              "instructions": "Read integers from stdin; a coroutine raises ValueError for negatives and returns the value otherwise. Gather with return_exceptions=True and print 'ok' or 'error' for each result in order.",
              "starterCode": "import asyncio, sys\n\nasync def check(n):\n    # TODO: raise ValueError if n < 0 else return n\n    pass\n\nasync def main():\n    # TODO: read ints, gather with return_exceptions=True, print ok/error per result\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio, sys\n\nasync def check(n):\n    if n < 0:\n        raise ValueError(\"negative\")\n    return n\n\nasync def main():\n    nums = [int(x) for x in sys.stdin.read().split()]\n    results = await asyncio.gather(*[check(n) for n in nums], return_exceptions=True)\n    print(\" \".join(\"error\" if isinstance(r, Exception) else \"ok\" for r in results))\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ok error ok",
                  "hidden": false,
                  "stdin": "3 -1 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "error ok",
                  "hidden": true,
                  "stdin": "-5 6"
                }
              ],
              "hintNotes": {
                "concept": "Handling Errors in Coroutines is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-async-await-m2-l3",
            "slug": "py-async-await-m2-l3",
            "title": "Shielding and Cancellation",
            "concept": "asyncio.shield protects an inner awaitable from cancellation of the outer task, so a critical operation can finish even when its caller is cancelled. Shielding is for work that must not be interrupted, such as saving state before shutdown.",
            "syntax": "await asyncio.shield(coro())",
            "exampleCode": "import asyncio\n\nasync def save():\n    await asyncio.sleep(0)\n    return \"saved\"\n\nasync def main():\n    print(await asyncio.shield(save()))\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Shielding every await, which defeats cancellation entirely and makes shutdown hang.",
            "bug": {
              "prompt": "The code below should shield a coroutine returning 'saved' and print its result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def save():\n    await asyncio.sleep(0)\n    return \"saved\"\n\nasync def main():\n    inner = asyncio.create_task(save())\n    inner.cancel()\n    print(await inner)\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def save():\n    await asyncio.sleep(0)\n    return \"saved\"\n\nasync def main():\n    inner = asyncio.create_task(save())\n    outer = asyncio.create_task(asyncio.shield(inner))\n    outer.cancel()\n    try:\n        await outer\n    except asyncio.CancelledError:\n        pass\n    print(await inner)\n\nasyncio.run(main())\n",
              "explanation": "Without shield, cancelling the outer task cancels the inner save as well, so awaiting it raises CancelledError instead of printing 'saved'."
            },
            "exercise": {
              "title": "Check your understanding of Shielding and Cancellation",
              "type": "multiple-choice",
              "instructions": "Which statement about Shielding and Cancellation is correct?",
              "starterCode": "",
              "solution": "asyncio.",
              "solutionExplanation": "asyncio. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "asyncio.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Shielding and Cancellation actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "asyncio.",
                "Shielding and Cancellation can only be used once in a program",
                "Shielding and Cancellation requires a separate paid licence to use",
                "Shielding and Cancellation only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-async-await-m2-l4",
            "slug": "py-async-await-m2-l4",
            "title": "Semaphores for Throttling",
            "concept": "An asyncio.Semaphore limits how many coroutines run a section at once, which stops a program from overwhelming a server or a resource. Acquiring the semaphore before the work and releasing it after keeps the concurrency bounded.",
            "syntax": "async with asyncio.Semaphore(3):",
            "exampleCode": "import asyncio\n\nasync def work(sem, n):\n    async with sem:\n        return n * 2\n\nasync def main():\n    sem = asyncio.Semaphore(2)\n    print(await asyncio.gather(*[work(sem, n) for n in (1, 2, 3)]))\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Creating a new semaphore inside each task, which limits nothing because every task has its own.",
            "bug": {
              "prompt": "The code below should run three doubling tasks through a semaphore of 2 and print the results, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def work(n):\n    async with asyncio.Semaphore(2):\n        return n * 2\n\nasync def main():\n    print(await asyncio.gather(*[work(n) for n in (1, 2, 3)]))\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def work(sem, n):\n    async with sem:\n        return n * 2\n\nasync def main():\n    sem = asyncio.Semaphore(2)\n    print(await asyncio.gather(*[work(sem, n) for n in (1, 2, 3)]))\n\nasyncio.run(main())\n",
              "explanation": "A semaphore created per task is never shared, so all three tasks run at once and the limit of 2 is never enforced."
            },
            "exercise": {
              "title": "Practise Semaphores for Throttling",
              "type": "write-code",
              "instructions": "Read integers from stdin, double each through a shared semaphore of size 2, and print the resulting list.",
              "starterCode": "import asyncio, sys\n\nasync def work(sem, n):\n    # TODO: acquire sem, return n * 2\n    pass\n\nasync def main():\n    # TODO: read ints, gather work() with one shared Semaphore(2), print list\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio, sys\n\nasync def work(sem, n):\n    async with sem:\n        return n * 2\n\nasync def main():\n    nums = [int(x) for x in sys.stdin.read().split()]\n    sem = asyncio.Semaphore(2)\n    print(await asyncio.gather(*[work(sem, n) for n in nums]))\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[2, 4, 6, 8]",
                  "hidden": false,
                  "stdin": "1 2 3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[10, 12]",
                  "hidden": true,
                  "stdin": "5 6"
                }
              ],
              "hintNotes": {
                "concept": "Semaphores for Throttling is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-async-await-m2-l5",
            "slug": "py-async-await-m2-l5",
            "title": "Async Retry Helper",
            "concept": "A retry helper awaits a coroutine, catches a chosen exception, waits briefly, and tries again up to a limit. Retries turn flaky operations into reliable ones, as long as the operation is safe to repeat.",
            "syntax": "for attempt in range(3):\n    try:\n        return await coro()\n    except ValueError:\n        continue",
            "exampleCode": "import asyncio\n\nasync def flaky(state):\n    state[0] += 1\n    if state[0] < 3:\n        raise ValueError(\"not yet\")\n    return \"done\"\n\nasync def main():\n    state = [0]\n    for _ in range(3):\n        try:\n            print(await flaky(state))\n            break\n        except ValueError:\n            continue\n\nasyncio.run(main())\n",
            "exampleLanguage": "python",
            "mistake": "Retrying forever with no limit, which turns a permanent failure into an infinite loop.",
            "bug": {
              "prompt": "The code below should retry a flaky coroutine up to 3 times and print its result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def flaky(state):\n    state[0] += 1\n    if state[0] < 3:\n        raise ValueError(\"not yet\")\n    return \"done\"\n\nasync def main():\n    state = [0]\n    while True:\n        try:\n            print(await flaky(state))\n            break\n        except ValueError:\n            continue\n\nasyncio.run(main())\n",
              "fixedCode": "import asyncio\n\nasync def flaky(state):\n    state[0] += 1\n    if state[0] < 3:\n        raise ValueError(\"not yet\")\n    return \"done\"\n\nasync def main():\n    state = [0]\n    for _ in range(3):\n        try:\n            print(await flaky(state))\n            break\n        except ValueError:\n            continue\n\nasyncio.run(main())\n",
              "explanation": "An unbounded while True retry loop never gives up, so a permanently failing operation hangs the program instead of failing after 3 tries."
            },
            "exercise": {
              "title": "Practise Async Retry Helper",
              "type": "write-code",
              "instructions": "Read an integer k from stdin. A coroutine fails while a counter is below k and then returns 'done'. Retry it up to 5 times and print the result or 'gave up'.",
              "starterCode": "import asyncio, sys\n\nasync def flaky(state, k):\n    # TODO: increment state[0]; raise ValueError while state[0] < k, else return 'done'\n    pass\n\nasync def main():\n    # TODO: read k, retry flaky up to 5 times, print result or 'gave up'\n    pass\n\nasyncio.run(main())\n",
              "solution": "import asyncio, sys\n\nasync def flaky(state, k):\n    state[0] += 1\n    if state[0] < k:\n        raise ValueError(\"not yet\")\n    return \"done\"\n\nasync def main():\n    k = int(sys.stdin.read().strip())\n    state = [0]\n    result = \"gave up\"\n    for _ in range(5):\n        try:\n            result = await flaky(state, k)\n            break\n        except ValueError:\n            continue\n    print(result)\n\nasyncio.run(main())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "done",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "gave up",
                  "hidden": true,
                  "stdin": "6"
                }
              ],
              "hintNotes": {
                "concept": "Async Retry Helper is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Async Retry Client",
      "type": "build-program",
      "instructions": "Build an async retry client: read an integer k from stdin; a coroutine fails while a shared counter is below k and then returns 'done'. Retry it up to 5 times and print the result or 'gave up'.",
      "starterCode": "import asyncio, sys\n\nasync def flaky(state, k):\n    # TODO: increment state[0]; raise ValueError while state[0] < k, else return 'done'\n    pass\n\nasync def main():\n    # TODO: read k, retry flaky up to 5 times, print result or 'gave up'\n    pass\n\nasyncio.run(main())\n",
      "solution": "import asyncio, sys\n\nasync def flaky(state, k):\n    state[0] += 1\n    if state[0] < k:\n        raise ValueError(\"not yet\")\n    return \"done\"\n\nasync def main():\n    k = int(sys.stdin.read().strip())\n    state = [0]\n    result = \"gave up\"\n    for _ in range(5):\n        try:\n            result = await flaky(state, k)\n            break\n        except ValueError:\n            continue\n    print(result)\n\nasyncio.run(main())\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "done",
          "hidden": false,
          "stdin": "3"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "gave up",
          "hidden": true,
          "stdin": "6"
        }
      ],
      "hintNotes": {
        "concept": "Async Retry Client is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Async Retry Client Capstone Project",
      "description": "A small end-to-end async program that retries a flaky operation until it succeeds or gives up.",
      "requirements": [
        "Retry a failing coroutine up to 5 times before giving up.",
        "Apply at least three of these skills: Coroutines, Coroutine error handling, Shielding tasks, Semaphores.",
        "Print 'gave up' when the operation never succeeds within the limit.",
        "Keep the retry logic in its own function, separate from main()."
      ],
      "rubric": [
        "Program runs and retries correctly within the limit.",
        "Code is clear, well-named, and organised into functions.",
        "Both success and give-up cases print the right message.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-threading",
    "slug": "py-threading",
    "language": "python",
    "category": "languages",
    "title": "Threading and Concurrency",
    "description": "Learn to use threads for I/O-bound work in Python: starting and joining threads, locks, queues, and the producer-consumer pattern, plus an honest look at the GIL and when threads do not help.",
    "difficulty": "Intermediate",
    "estimatedHours": 15,
    "skills": [
      "threading.Thread",
      "Joining threads",
      "threading.Lock",
      "Race conditions",
      "threading.local",
      "Daemon threads",
      "Condition variables",
      "queue.Queue"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to share one kitchen between several cooks: fast when everyone respects the rules, chaos when two people grab the same knife.",
    "modules": [
      {
        "id": "py-threading-m1",
        "title": "Fundamentals of Threading and Concurrency",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-threading-m1-l1",
            "slug": "py-threading-m1-l1",
            "title": "Threads vs Processes",
            "concept": "A thread shares memory with the other threads in its process, while a process has its own separate memory. Threads are cheap to start and good for waiting on I/O, but Python's GIL means they rarely speed up pure number crunching.",
            "syntax": "threading.Thread(target=work).start()",
            "exampleCode": "import threading\n\ndef work(results, n):\n    results.append(n * 2)\n\nresults = []\nt = threading.Thread(target=work, args=(results, 21))\nt.start()\nt.join()\nprint(results)\n",
            "exampleLanguage": "python",
            "mistake": "Assuming threads speed up CPU-bound Python code, which the GIL usually prevents.",
            "bug": {
              "prompt": "The code below should run a thread that appends 42 to a list and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\ndef work(results, n):\n    results.append(n + 2)\n\nresults = []\nt = threading.Thread(target=work, args=(results, 21))\nt.start()\nt.join()\nprint(results)\n",
              "fixedCode": "import threading\n\ndef work(results, n):\n    results.append(n * 2)\n\nresults = []\nt = threading.Thread(target=work, args=(results, 21))\nt.start()\nt.join()\nprint(results)\n",
              "explanation": "Adding 2 instead of doubling gives 23, not the 42 the task promises."
            },
            "exercise": {
              "title": "Practise Threads vs Processes",
              "type": "write-code",
              "instructions": "Read an integer from stdin, run a thread that appends its double to a list, join the thread, and print the list.",
              "starterCode": "import sys, threading\n\ndef work(results, n):\n    # TODO: append n * 2 to results\n    pass\n\n# TODO: read n, start and join a thread, print results\n",
              "solution": "import sys, threading\n\ndef work(results, n):\n    results.append(n * 2)\n\nn = int(sys.stdin.read().strip())\nresults = []\nt = threading.Thread(target=work, args=(results, n))\nt.start()\nt.join()\nprint(results)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[42]",
                  "hidden": false,
                  "stdin": "21"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[10]",
                  "hidden": true,
                  "stdin": "5"
                }
              ],
              "hintNotes": {
                "concept": "Threads vs Processes is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-threading-m1-l2",
            "slug": "py-threading-m1-l2",
            "title": "Starting and Joining Threads",
            "concept": "Starting a thread begins its work in the background, and joining waits until it has finished. Forgetting to join means the main program can end, or read results, before the thread has done its work.",
            "syntax": "t.start()\nt.join()",
            "exampleCode": "import threading\n\ndef work(out):\n    out.append(\"done\")\n\nout = []\nt = threading.Thread(target=work, args=(out,))\nt.start()\nt.join()\nprint(out)\n",
            "exampleLanguage": "python",
            "mistake": "Reading a result list before joining the thread that fills it.",
            "bug": {
              "prompt": "The code below should start a thread that appends 'done' and print the list after joining, but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\ndef work(out):\n    out.append(\"done\")\n\nout = []\nt = threading.Thread(target=work, args=(out,))\nt.start()\nprint(out)\n",
              "fixedCode": "import threading\n\ndef work(out):\n    out.append(\"done\")\n\nout = []\nt = threading.Thread(target=work, args=(out,))\nt.start()\nt.join()\nprint(out)\n",
              "explanation": "Without join the print can run before the thread appends, so the list may be empty."
            },
            "exercise": {
              "title": "Practise Starting and Joining Threads",
              "type": "write-code",
              "instructions": "Start 3 threads that each append their number to a shared list, join them all, and print the sorted list.",
              "starterCode": "import threading\n\ndef work(out, n):\n    # TODO: append n to out\n    pass\n\n# TODO: start 3 threads for 3, 1, 2; join them; print sorted(out)\n",
              "solution": "import threading\n\ndef work(out, n):\n    out.append(n)\n\nout = []\nthreads = [threading.Thread(target=work, args=(out, n)) for n in (3, 1, 2)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sorted(out))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[1, 2, 3]",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[1, 2, 3]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Starting and Joining Threads is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-threading-m1-l3",
            "slug": "py-threading-m1-l3",
            "title": "Sharing Data Safely",
            "concept": "Threads share the same objects, so two threads updating one value can step on each other and lose updates. Safe sharing needs a lock, a queue, or an atomic operation, never just hope.",
            "syntax": "with lock:\n    shared[0] += 1",
            "exampleCode": "import threading\n\ncounter = [0]\nlock = threading.Lock()\n\ndef bump():\n    with lock:\n        counter[0] += 1\n\nthreads = [threading.Thread(target=bump) for _ in range(5)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(counter[0])\n",
            "exampleLanguage": "python",
            "mistake": "Updating shared data from several threads without any lock or queue.",
            "bug": {
              "prompt": "The code below should increment a shared counter from 5 threads under a lock and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\ncounter = [0]\n\ndef bump():\n    counter[0] += 1\n\nthreads = [threading.Thread(target=bump) for _ in range(5)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(counter[0])\n",
              "fixedCode": "import threading\n\ncounter = [0]\nlock = threading.Lock()\n\ndef bump():\n    with lock:\n        counter[0] += 1\n\nthreads = [threading.Thread(target=bump) for _ in range(5)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(counter[0])\n",
              "explanation": "Without the lock the increments can interleave and lose updates, so the counter may end below 5."
            },
            "exercise": {
              "title": "Check your understanding of Sharing Data Safely",
              "type": "multiple-choice",
              "instructions": "Which statement about Sharing Data Safely is correct?",
              "starterCode": "",
              "solution": "Threads share the same objects, so two threads updating one value can step on each other and lose updates.",
              "solutionExplanation": "Threads share the same objects, so two threads updating one value can step on each other and lose updates. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Threads share the same objects, so two threads updating one value can step on each other and lose updates.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Sharing Data Safely actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Threads share the same objects, so two threads updating one value can step on each other and lose updates.",
                "Sharing Data Safely can only be used once in a program",
                "Sharing Data Safely requires a separate paid licence to use",
                "Sharing Data Safely only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-threading-m1-l4",
            "slug": "py-threading-m1-l4",
            "title": "Locks and Race Conditions",
            "concept": "A race condition happens when the result depends on which thread runs first, and a lock removes the race by making a block of code run atomically. The classic example is two threads both reading a counter, adding one, and writing back the same value.",
            "syntax": "lock = threading.Lock()",
            "exampleCode": "import threading\n\nbalance = [100]\nlock = threading.Lock()\n\ndef withdraw(amount):\n    with lock:\n        balance[0] -= amount\n\nthreads = [threading.Thread(target=withdraw, args=(30,)) for _ in range(2)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(balance[0])\n",
            "exampleLanguage": "python",
            "mistake": "Locking only the read or only the write, instead of the whole read-modify-write step.",
            "bug": {
              "prompt": "The code below should withdraw 30 twice from a balance of 100 under a lock and print the balance, but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\nbalance = [100]\nlock = threading.Lock()\n\ndef withdraw(amount):\n    with lock:\n        current = balance[0]\n    balance[0] = current - amount\n\nthreads = [threading.Thread(target=withdraw, args=(30,)) for _ in range(2)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(balance[0])\n",
              "fixedCode": "import threading\n\nbalance = [100]\nlock = threading.Lock()\n\ndef withdraw(amount):\n    with lock:\n        balance[0] -= amount\n\nthreads = [threading.Thread(target=withdraw, args=(30,)) for _ in range(2)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(balance[0])\n",
              "explanation": "Releasing the lock between reading the balance and writing it back lets both threads read 100, so both subtract from the same value and the result is 70 instead of 40."
            },
            "exercise": {
              "title": "Practise Locks and Race Conditions",
              "type": "write-code",
              "instructions": "Read an integer k from stdin. Start k threads, each withdrawing 10 from a balance of 1000 under one lock, and print the final balance.",
              "starterCode": "import sys, threading\n\nbalance = [1000]\nlock = threading.Lock()\n\ndef withdraw(amount):\n    # TODO: subtract amount from balance[0] under the lock\n    pass\n\n# TODO: read k, start k threads withdrawing 10, join, print balance[0]\n",
              "solution": "import sys, threading\n\nbalance = [1000]\nlock = threading.Lock()\n\ndef withdraw(amount):\n    with lock:\n        balance[0] -= amount\n\nk = int(sys.stdin.read().strip())\nthreads = [threading.Thread(target=withdraw, args=(10,)) for _ in range(k)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(balance[0])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "970",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "950",
                  "hidden": true,
                  "stdin": "5"
                }
              ],
              "hintNotes": {
                "concept": "Locks and Race Conditions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-threading-m1-l5",
            "slug": "py-threading-m1-l5",
            "title": "Deadlocks and How to Avoid Them",
            "concept": "A deadlock happens when two threads each hold a lock the other one is waiting for, so neither can ever proceed. The standard cure is to always acquire locks in the same order, or to hold only one lock at a time.",
            "syntax": "with lock_a:\n    with lock_b:",
            "exampleCode": "import threading\n\nlock_a, lock_b = threading.Lock(), threading.Lock()\n\ndef ordered():\n    with lock_a:\n        with lock_b:\n            return \"ok\"\n\nprint(ordered())\n",
            "exampleLanguage": "python",
            "mistake": "Acquiring the same two locks in opposite orders in different threads.",
            "bug": {
              "prompt": "The code below should acquire two locks in a fixed order and print 'ok', but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\nlock_a, lock_b = threading.Lock(), threading.Lock()\n\ndef ordered():\n    with lock_b:\n        with lock_a:\n            return \"ok\"\n\nprint(ordered())\n",
              "fixedCode": "import threading\n\nlock_a, lock_b = threading.Lock(), threading.Lock()\n\ndef ordered():\n    with lock_a:\n        with lock_b:\n            return \"ok\"\n\nprint(ordered())\n",
              "explanation": "Acquiring the locks in the opposite order to the rest of the program is exactly how a deadlock starts when another thread holds them the other way round."
            },
            "exercise": {
              "title": "Check your understanding of Deadlocks and How to Avoid Them",
              "type": "multiple-choice",
              "instructions": "Which statement about Deadlocks and How to Avoid Them is correct?",
              "starterCode": "",
              "solution": "A deadlock happens when two threads each hold a lock the other one is waiting for, so neither can ever proceed.",
              "solutionExplanation": "A deadlock happens when two threads each hold a lock the other one is waiting for, so neither can ever proceed. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A deadlock happens when two threads each hold a lock the other one is waiting for, so neither can ever proceed.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Deadlocks and How to Avoid Them actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A deadlock happens when two threads each hold a lock the other one is waiting for, so neither can ever proceed.",
                "Deadlocks and How to Avoid Them can only be used once in a program",
                "Deadlocks and How to Avoid Them requires a separate paid licence to use",
                "Deadlocks and How to Avoid Them only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-threading-m2",
        "title": "Threading and Concurrency in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-threading-m2-l1",
            "slug": "py-threading-m2-l1",
            "title": "Thread-Local Storage",
            "concept": "threading.local gives each thread its own private copy of an attribute, so threads stop overwriting each other's values. It is useful for per-thread state such as a database connection or a request identifier.",
            "syntax": "local = threading.local()",
            "exampleCode": "import threading\n\nlocal = threading.local()\n\ndef work(name):\n    local.name = name\n    return local.name\n\nresults = {}\n\ndef run(name):\n    results[name] = work(name)\n\nthreads = [threading.Thread(target=run, args=(n,)) for n in (\"a\", \"b\")]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sorted(results.values()))\n",
            "exampleLanguage": "python",
            "mistake": "Storing per-thread state in a plain global variable instead of threading.local.",
            "bug": {
              "prompt": "The code below should give two threads their own local name and print the sorted names, but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\nshared = {}\n\ndef work(name):\n    shared[\"name\"] = name\n    return shared[\"name\"]\n\nresults = {}\n\ndef run(name):\n    results[name] = work(name)\n\nthreads = [threading.Thread(target=run, args=(n,)) for n in (\"a\", \"b\")]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sorted(results.values()))\n",
              "fixedCode": "import threading\n\nlocal = threading.local()\n\ndef work(name):\n    local.name = name\n    return local.name\n\nresults = {}\n\ndef run(name):\n    results[name] = work(name)\n\nthreads = [threading.Thread(target=run, args=(n,)) for n in (\"a\", \"b\")]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sorted(results.values()))\n",
              "explanation": "A shared dict means the two threads overwrite each other's name, so both results can end up as the same value."
            },
            "exercise": {
              "title": "Practise Thread-Local Storage",
              "type": "write-code",
              "instructions": "Use threading.local so each of 3 threads stores its own number, then print the sorted numbers.",
              "starterCode": "import threading\n\nlocal = threading.local()\nresults = {}\n\ndef run(n):\n    # TODO: store n in local.value and record it in results[n]\n    pass\n\n# TODO: start threads for 30, 10, 20; join; print sorted(results.values())\n",
              "solution": "import threading\n\nlocal = threading.local()\nresults = {}\n\ndef run(n):\n    local.value = n\n    results[n] = local.value\n\nthreads = [threading.Thread(target=run, args=(n,)) for n in (30, 10, 20)]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sorted(results.values()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[10, 20, 30]",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[10, 20, 30]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Thread-Local Storage is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-threading-m2-l2",
            "slug": "py-threading-m2-l2",
            "title": "Daemon Threads",
            "concept": "A daemon thread is a background thread that is killed automatically when the main program ends. Daemon threads suit fire-and-forget background work, but they must never own data that has to be saved cleanly.",
            "syntax": "t = threading.Thread(target=work, daemon=True)",
            "exampleCode": "import threading\n\ndef background():\n    print(\"background ran\")\n\nt = threading.Thread(target=background, daemon=True)\nt.start()\nt.join()\nprint(\"main done\")\n",
            "exampleLanguage": "python",
            "mistake": "Making a thread a daemon when it writes a file that must be finished before exit.",
            "bug": {
              "prompt": "The code below should start a daemon thread that prints 'background ran' and join it before printing 'main done', but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\ndef background():\n    print(\"background ran\")\n\nt = threading.Thread(target=background)\nt.start()\nprint(\"main done\")\n",
              "fixedCode": "import threading\n\ndef background():\n    print(\"background ran\")\n\nt = threading.Thread(target=background, daemon=True)\nt.start()\nt.join()\nprint(\"main done\")\n",
              "explanation": "Without join the main thread can print 'main done' and exit before the background thread prints anything."
            },
            "exercise": {
              "title": "Practise Daemon Threads",
              "type": "write-code",
              "instructions": "Start a daemon thread that appends 'bg' to a list, join it, and print the list.",
              "starterCode": "import threading\n\nout = []\n\ndef background():\n    # TODO: append 'bg' to out\n    pass\n\n# TODO: start a daemon thread for background, join it, print out\n",
              "solution": "import threading\n\nout = []\n\ndef background():\n    out.append(\"bg\")\n\nt = threading.Thread(target=background, daemon=True)\nt.start()\nt.join()\nprint(out)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['bg']",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['bg']",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Daemon Threads is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-threading-m2-l3",
            "slug": "py-threading-m2-l3",
            "title": "Condition Variables",
            "concept": "A condition variable lets a thread wait until some state becomes true, instead of polling in a loop. One thread waits on the condition and another notifies it after changing the state, which is both efficient and race-free.",
            "syntax": "with cond:\n    cond.wait()\n    cond.notify()",
            "exampleCode": "import threading\n\ncond = threading.Condition()\nready = [False]\n\ndef waiter():\n    with cond:\n        while not ready[0]:\n            cond.wait()\n        print(\"go\")\n\ndef setter():\n    with cond:\n        ready[0] = True\n        cond.notify()\n\nt = threading.Thread(target=waiter)\nt.start()\nsetter()\nt.join()\n",
            "exampleLanguage": "python",
            "mistake": "Waiting on a condition without re-checking the state in a loop, which breaks on spurious wakeups.",
            "bug": {
              "prompt": "The code below should wait for a flag to become True via a condition and print 'go', but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\ncond = threading.Condition()\nready = [False]\n\ndef waiter():\n    with cond:\n        cond.wait()\n        print(\"go\")\n\ndef setter():\n    with cond:\n        ready[0] = True\n        cond.notify()\n\nt = threading.Thread(target=waiter)\nt.start()\nsetter()\nt.join()\n",
              "fixedCode": "import threading\n\ncond = threading.Condition()\nready = [False]\n\ndef waiter():\n    with cond:\n        while not ready[0]:\n            cond.wait()\n        print(\"go\")\n\ndef setter():\n    with cond:\n        ready[0] = True\n        cond.notify()\n\nt = threading.Thread(target=waiter)\nt.start()\nsetter()\nt.join()\n",
              "explanation": "A single wait with no loop can wake up before the flag is set, so the waiter prints 'go' too early."
            },
            "exercise": {
              "title": "Check your understanding of Condition Variables",
              "type": "multiple-choice",
              "instructions": "Which statement about Condition Variables is correct?",
              "starterCode": "",
              "solution": "A condition variable lets a thread wait until some state becomes true, instead of polling in a loop.",
              "solutionExplanation": "A condition variable lets a thread wait until some state becomes true, instead of polling in a loop. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A condition variable lets a thread wait until some state becomes true, instead of polling in a loop.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Condition Variables actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A condition variable lets a thread wait until some state becomes true, instead of polling in a loop.",
                "Condition Variables can only be used once in a program",
                "Condition Variables requires a separate paid licence to use",
                "Condition Variables only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-threading-m2-l4",
            "slug": "py-threading-m2-l4",
            "title": "Producer-Consumer with Queue",
            "concept": "A queue.Queue connects producer threads that add work with consumer threads that take it, handling all locking internally. The pattern scales cleanly because producers and consumers only ever talk to the queue.",
            "syntax": "q = queue.Queue()",
            "exampleCode": "import queue, threading\n\nq = queue.Queue()\n\ndef producer():\n    for n in (1, 2, 3):\n        q.put(n)\n    q.put(None)\n\ndef consumer(out):\n    while True:\n        item = q.get()\n        if item is None:\n            break\n        out.append(item * 10)\n\nout = []\nt1 = threading.Thread(target=producer)\nt2 = threading.Thread(target=consumer, args=(out,))\nt1.start()\nt2.start()\nt1.join()\nt2.join()\nprint(out)\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting the sentinel value that tells the consumer to stop, so it blocks forever.",
            "bug": {
              "prompt": "The code below should produce 1, 2, 3 through a queue, multiply by 10 in the consumer, and print the results, but it gives the wrong result. What is the bug?",
              "buggyCode": "import queue, threading\n\nq = queue.Queue()\n\ndef producer():\n    for n in (1, 2, 3):\n        q.put(n)\n\ndef consumer(out):\n    while True:\n        item = q.get()\n        out.append(item * 10)\n\nout = []\nt1 = threading.Thread(target=producer)\nt2 = threading.Thread(target=consumer, args=(out,))\nt1.start()\nt2.start()\nt1.join()\nt2.join()\nprint(out)\n",
              "fixedCode": "import queue, threading\n\nq = queue.Queue()\n\ndef producer():\n    for n in (1, 2, 3):\n        q.put(n)\n    q.put(None)\n\ndef consumer(out):\n    while True:\n        item = q.get()\n        if item is None:\n            break\n        out.append(item * 10)\n\nout = []\nt1 = threading.Thread(target=producer)\nt2 = threading.Thread(target=consumer, args=(out,))\nt1.start()\nt2.start()\nt1.join()\nt2.join()\nprint(out)\n",
              "explanation": "Without the None sentinel the consumer never stops, so joining it blocks forever."
            },
            "exercise": {
              "title": "Practise Producer-Consumer with Queue",
              "type": "write-code",
              "instructions": "Read integers from stdin, send them through a queue to a consumer that squares them, and print the squared values in order.",
              "starterCode": "import queue, sys, threading\n\n# TODO: producer puts stdin ints then None; consumer squares until None; print results\n",
              "solution": "import queue, sys, threading\n\nq = queue.Queue()\nout = []\n\ndef producer(nums):\n    for n in nums:\n        q.put(n)\n    q.put(None)\n\ndef consumer():\n    while True:\n        item = q.get()\n        if item is None:\n            break\n        out.append(item * item)\n\nnums = [int(x) for x in sys.stdin.read().split()]\nt1 = threading.Thread(target=producer, args=(nums,))\nt2 = threading.Thread(target=consumer)\nt1.start()\nt2.start()\nt1.join()\nt2.join()\nprint(out)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[4, 9, 16]",
                  "hidden": false,
                  "stdin": "2 3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[25, 36]",
                  "hidden": true,
                  "stdin": "5 6"
                }
              ],
              "hintNotes": {
                "concept": "Producer-Consumer with Queue is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-threading-m2-l5",
            "slug": "py-threading-m2-l5",
            "title": "A Threaded Downloader Simulation",
            "concept": "A threaded downloader starts one thread per download and collects the results as they finish, which is much faster than downloading one file at a time when the bottleneck is waiting. The simulation uses a lookup table instead of real network calls so it runs anywhere.",
            "syntax": "results = {}\nlock = threading.Lock()",
            "exampleCode": "import threading\n\nSIZES = {\"a.txt\": 100, \"b.txt\": 200}\nresults = {}\nlock = threading.Lock()\n\ndef fetch(name):\n    with lock:\n        results[name] = SIZES[name]\n\nthreads = [threading.Thread(target=fetch, args=(n,)) for n in SIZES]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sum(results.values()))\n",
            "exampleLanguage": "python",
            "mistake": "Starting one thread per item with no limit, which can exhaust memory or connections on large inputs.",
            "bug": {
              "prompt": "The code below should fetch two simulated files in threads and print the total size, but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\nSIZES = {\"a.txt\": 100, \"b.txt\": 200}\nresults = {}\n\ndef fetch(name):\n    results[name] = SIZES[name]\n\nthreads = [threading.Thread(target=fetch, args=(n,)) for n in SIZES]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sum(results.values()))\n",
              "fixedCode": "import threading\n\nSIZES = {\"a.txt\": 100, \"b.txt\": 200}\nresults = {}\nlock = threading.Lock()\n\ndef fetch(name):\n    with lock:\n        results[name] = SIZES[name]\n\nthreads = [threading.Thread(target=fetch, args=(n,)) for n in SIZES]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sum(results.values()))\n",
              "explanation": "Writing to a shared dict from several threads without a lock can lose entries, so the total may come out wrong."
            },
            "exercise": {
              "title": "Practise A Threaded Downloader Simulation",
              "type": "write-code",
              "instructions": "Read file names from stdin. A lookup table maps each name to len(name) * 100 bytes. Fetch each in its own thread under a lock and print the total bytes.",
              "starterCode": "import sys, threading\n\n# TODO: SIZES = {name: len(name) * 100}; fetch in threads under a lock; print total\n",
              "solution": "import sys, threading\n\nnames = sys.stdin.read().split()\nSIZES = {name: len(name) * 100 for name in names}\nresults = {}\nlock = threading.Lock()\n\ndef fetch(name):\n    with lock:\n        results[name] = SIZES[name]\n\nthreads = [threading.Thread(target=fetch, args=(n,)) for n in names]\nfor t in threads:\n    t.start()\nfor t in threads:\n    t.join()\nprint(sum(results.values()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "500",
                  "hidden": false,
                  "stdin": "aa bbb"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "500",
                  "hidden": true,
                  "stdin": "x yyyy"
                }
              ],
              "hintNotes": {
                "concept": "A Threaded Downloader Simulation is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Threaded Word Counter",
      "type": "build-program",
      "instructions": "Build a threaded word counter: read words from stdin, count them with 2 worker threads fed by a queue, and print the total word count and the number of distinct words as 'total: N distinct: M'.",
      "starterCode": "import queue, sys, threading\n\n# TODO: producer puts stdin words then None per worker; workers count into a shared dict under a lock; print totals\n",
      "solution": "import queue, sys, threading\nfrom collections import Counter\n\nwords = sys.stdin.read().split()\nq = queue.Queue()\ncounts = Counter()\nlock = threading.Lock()\n\ndef worker():\n    while True:\n        item = q.get()\n        if item is None:\n            break\n        with lock:\n            counts[item] += 1\n\nthreads = [threading.Thread(target=worker) for _ in range(2)]\nfor t in threads:\n    t.start()\nfor w in words:\n    q.put(w)\nfor _ in threads:\n    q.put(None)\nfor t in threads:\n    t.join()\nprint(f\"total: {sum(counts.values())} distinct: {len(counts)}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "total: 4 distinct: 3",
          "hidden": false,
          "stdin": "apple banana apple cherry"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "total: 3 distinct: 2",
          "hidden": true,
          "stdin": "one one two"
        }
      ],
      "hintNotes": {
        "concept": "Threaded Word Counter is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Threaded Word Counter Capstone Project",
      "description": "A small end-to-end threaded program that counts words with worker threads fed by a queue.",
      "requirements": [
        "Use a queue.Queue to feed work to exactly 2 worker threads.",
        "Apply at least three of these skills: threading.Thread, Joining threads, threading.Lock, queue.Queue.",
        "Protect the shared counter with a lock.",
        "Print the result in the exact format 'total: N distinct: M'."
      ],
      "rubric": [
        "Program runs and counts words correctly with 2 workers.",
        "Code is clear, well-named, and organised into functions.",
        "Empty input prints 'total: 0 distinct: 0'.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-multiprocessing",
    "slug": "py-multiprocessing",
    "language": "python",
    "category": "languages",
    "title": "Multiprocessing and Parallelism",
    "description": "Learn to use real processes for CPU-bound Python work: spawning processes, pools, queues, pipes, shared memory, and locks, and how to tell when processes beat threads.",
    "difficulty": "Advanced",
    "estimatedHours": 18,
    "skills": [
      "multiprocessing.Process",
      "Process pools",
      "multiprocessing.Queue",
      "Pipes",
      "Shared memory",
      "Process locks",
      "Chunksize tuning",
      "Parallel map"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to open extra kitchens instead of hiring more cooks for one: more space, more output, and a delivery door between them.",
    "modules": [
      {
        "id": "py-multiprocessing-m1",
        "title": "Fundamentals of Multiprocessing and Parallelism",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-multiprocessing-m1-l1",
            "slug": "py-multiprocessing-m1-l1",
            "title": "Processes vs Threads",
            "concept": "A process has its own memory and its own Python interpreter, so it is not limited by the GIL the way threads are. Processes cost more to start and cannot share objects directly, which makes them right for CPU-heavy work and wrong for tiny tasks.",
            "syntax": "mp.Process(target=work)",
            "exampleCode": "import multiprocessing as mp\n\ndef work(n, q):\n    q.put(n * 2)\n\nif __name__ == \"__main__\":\n    q = mp.Queue()\n    p = mp.Process(target=work, args=(21, q))\n    p.start()\n    print(q.get())\n    p.join()\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting the if __name__ == \"__main__\" guard, which can respawn processes endlessly on some platforms.",
            "bug": {
              "prompt": "The code below should run a process that doubles 21 through a queue and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef work(n, q):\n    q.put(n + 2)\n\nif __name__ == \"__main__\":\n    q = mp.Queue()\n    p = mp.Process(target=work, args=(21, q))\n    p.start()\n    print(q.get())\n    p.join()\n",
              "fixedCode": "import multiprocessing as mp\n\ndef work(n, q):\n    q.put(n * 2)\n\nif __name__ == \"__main__\":\n    q = mp.Queue()\n    p = mp.Process(target=work, args=(21, q))\n    p.start()\n    print(q.get())\n    p.join()\n",
              "explanation": "Adding 2 instead of doubling gives 23, not the 42 the task promises."
            },
            "exercise": {
              "title": "Practise Processes vs Threads",
              "type": "write-code",
              "instructions": "Run a process that puts the square of the stdin integer into a queue, then print the queued value.",
              "starterCode": "import multiprocessing as mp, sys\n\ndef work(n, q):\n    # TODO: put n * n into q\n    pass\n\n# TODO: read n, start a process, print q.get(), join\n",
              "solution": "import multiprocessing as mp, sys\n\ndef work(n, q):\n    q.put(n * n)\n\nif __name__ == \"__main__\":\n    n = int(sys.stdin.read().strip())\n    q = mp.Queue()\n    p = mp.Process(target=work, args=(n, q))\n    p.start()\n    print(q.get())\n    p.join()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "81",
                  "hidden": false,
                  "stdin": "9"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "49",
                  "hidden": true,
                  "stdin": "7"
                }
              ],
              "hintNotes": {
                "concept": "Processes vs Threads is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-multiprocessing-m1-l2",
            "slug": "py-multiprocessing-m1-l2",
            "title": "Spawning Processes",
            "concept": "Spawning a process copies the program into a fresh interpreter and runs the target function there. The parent keeps working while the child runs, and join waits for the child to finish.",
            "syntax": "p = mp.Process(target=f, args=(x,))\np.start()\np.join()",
            "exampleCode": "import multiprocessing as mp\n\ndef work(out, n):\n    out.append(n)\n\nif __name__ == \"__main__\":\n    manager = mp.Manager()\n    out = manager.list()\n    p = mp.Process(target=work, args=(out, 5))\n    p.start()\n    p.join()\n    print(list(out))\n",
            "exampleLanguage": "python",
            "mistake": "Passing a normal list to a child process and expecting the parent to see the changes.",
            "bug": {
              "prompt": "The code below should run a child process that appends 5 to a managed list and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef work(out, n):\n    out.append(n)\n\nif __name__ == \"__main__\":\n    out = []\n    p = mp.Process(target=work, args=(out, 5))\n    p.start()\n    p.join()\n    print(out)\n",
              "fixedCode": "import multiprocessing as mp\n\ndef work(out, n):\n    out.append(n)\n\nif __name__ == \"__main__\":\n    manager = mp.Manager()\n    out = manager.list()\n    p = mp.Process(target=work, args=(out, 5))\n    p.start()\n    p.join()\n    print(list(out))\n",
              "explanation": "A plain list is copied into the child process, so the parent's list stays empty; a managed list is shared through the manager."
            },
            "exercise": {
              "title": "Practise Spawning Processes",
              "type": "write-code",
              "instructions": "Read two integers from stdin, run a process that appends their sum to a managed list, and print the list.",
              "starterCode": "import multiprocessing as mp, sys\n\ndef work(out, a, b):\n    # TODO: append a + b to out\n    pass\n\n# TODO: read a and b, run a process with a managed list, print list(out)\n",
              "solution": "import multiprocessing as mp, sys\n\ndef work(out, a, b):\n    out.append(a + b)\n\nif __name__ == \"__main__\":\n    a, b = [int(x) for x in sys.stdin.read().split()]\n    manager = mp.Manager()\n    out = manager.list()\n    p = mp.Process(target=work, args=(out, a, b))\n    p.start()\n    p.join()\n    print(list(out))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[42]",
                  "hidden": false,
                  "stdin": "10 32"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[7]",
                  "hidden": true,
                  "stdin": "3 4"
                }
              ],
              "hintNotes": {
                "concept": "Spawning Processes is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-multiprocessing-m1-l3",
            "slug": "py-multiprocessing-m1-l3",
            "title": "Sharing Data with Queues",
            "concept": "A multiprocessing.Queue is the standard way for processes to send data to each other, because it serialises objects safely between separate memories. Producers put items in and consumers take them out, just like a queue between threads.",
            "syntax": "q = mp.Queue()",
            "exampleCode": "import multiprocessing as mp\n\ndef producer(q):\n    q.put(1)\n    q.put(2)\n\nif __name__ == \"__main__\":\n    q = mp.Queue()\n    p = mp.Process(target=producer, args=(q,))\n    p.start()\n    print([q.get(), q.get()])\n    p.join()\n",
            "exampleLanguage": "python",
            "mistake": "Calling q.get() with no timeout on a queue that may never receive another item.",
            "bug": {
              "prompt": "The code below should receive two numbers from a child process through a queue and print them as a list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef producer(q):\n    q.put(1)\n\nif __name__ == \"__main__\":\n    q = mp.Queue()\n    p = mp.Process(target=producer, args=(q,))\n    p.start()\n    print([q.get(), q.get()])\n    p.join()\n",
              "fixedCode": "import multiprocessing as mp\n\ndef producer(q):\n    q.put(1)\n    q.put(2)\n\nif __name__ == \"__main__\":\n    q = mp.Queue()\n    p = mp.Process(target=producer, args=(q,))\n    p.start()\n    print([q.get(), q.get()])\n    p.join()\n",
              "explanation": "The producer only sent one number, so the second get blocks forever waiting for an item that never arrives."
            },
            "exercise": {
              "title": "Check your understanding of Sharing Data with Queues",
              "type": "multiple-choice",
              "instructions": "Which statement about Sharing Data with Queues is correct?",
              "starterCode": "",
              "solution": "A multiprocessing.",
              "solutionExplanation": "A multiprocessing. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A multiprocessing.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Sharing Data with Queues actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A multiprocessing.",
                "Sharing Data with Queues can only be used once in a program",
                "Sharing Data with Queues requires a separate paid licence to use",
                "Sharing Data with Queues only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-multiprocessing-m1-l4",
            "slug": "py-multiprocessing-m1-l4",
            "title": "Pools and map",
            "concept": "A process pool keeps a fixed number of worker processes ready and distributes work with map, which applies a function to every item and returns the results in order. Pools remove the boilerplate of starting and joining processes by hand.",
            "syntax": "with mp.Pool(4) as pool:\n    results = pool.map(f, items)",
            "exampleCode": "import multiprocessing as mp\n\ndef square(n):\n    return n * n\n\nif __name__ == \"__main__\":\n    with mp.Pool(2) as pool:\n        print(pool.map(square, [1, 2, 3]))\n",
            "exampleLanguage": "python",
            "mistake": "Creating a new Pool for every single item, which costs more than the work itself.",
            "bug": {
              "prompt": "The code below should map square over 1, 2, 3 with a pool of 2 and print the results, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef square(n):\n    return n * n\n\nif __name__ == \"__main__\":\n    print([mp.Pool(2).map(square, [n]) for n in (1, 2, 3)])\n",
              "fixedCode": "import multiprocessing as mp\n\ndef square(n):\n    return n * n\n\nif __name__ == \"__main__\":\n    with mp.Pool(2) as pool:\n        print(pool.map(square, [1, 2, 3]))\n",
              "explanation": "Building a fresh pool per item returns a list of lists instead of one flat list, and pays the cost of starting workers three times."
            },
            "exercise": {
              "title": "Practise Pools and map",
              "type": "write-code",
              "instructions": "Read integers from stdin, map a doubling function over them with a Pool of 2, and print the resulting list.",
              "starterCode": "import multiprocessing as mp, sys\n\ndef double(n):\n    return n * 2\n\n# TODO: read ints, pool.map(double, nums) with Pool(2), print the list\n",
              "solution": "import multiprocessing as mp, sys\n\ndef double(n):\n    return n * 2\n\nif __name__ == \"__main__\":\n    nums = [int(x) for x in sys.stdin.read().split()]\n    with mp.Pool(2) as pool:\n        print(pool.map(double, nums))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[2, 4, 6]",
                  "hidden": false,
                  "stdin": "1 2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[8, 10]",
                  "hidden": true,
                  "stdin": "4 5"
                }
              ],
              "hintNotes": {
                "concept": "Pools and map is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-multiprocessing-m1-l5",
            "slug": "py-multiprocessing-m1-l5",
            "title": "Process Communication with Pipes",
            "concept": "A Pipe gives two processes a direct two-way channel, with one connection end in each process. Pipes are faster and simpler than queues for exactly two endpoints, but they only connect one pair.",
            "syntax": "parent_conn, child_conn = mp.Pipe()",
            "exampleCode": "import multiprocessing as mp\n\ndef child(conn):\n    conn.send(42)\n    conn.close()\n\nif __name__ == \"__main__\":\n    parent, child_end = mp.Pipe()\n    p = mp.Process(target=child, args=(child_end,))\n    p.start()\n    print(parent.recv())\n    p.join()\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to close the unused end of a pipe, which can make recv block forever.",
            "bug": {
              "prompt": "The code below should receive the number 42 from a child process over a pipe and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef child(conn):\n    conn.send(24)\n    conn.close()\n\nif __name__ == \"__main__\":\n    parent, child_end = mp.Pipe()\n    p = mp.Process(target=child, args=(child_end,))\n    p.start()\n    print(parent.recv())\n    p.join()\n",
              "fixedCode": "import multiprocessing as mp\n\ndef child(conn):\n    conn.send(42)\n    conn.close()\n\nif __name__ == \"__main__\":\n    parent, child_end = mp.Pipe()\n    p = mp.Process(target=child, args=(child_end,))\n    p.start()\n    print(parent.recv())\n    p.join()\n",
              "explanation": "The child sent 24 instead of 42, so the parent prints the wrong number."
            },
            "exercise": {
              "title": "Check your understanding of Process Communication with Pipes",
              "type": "multiple-choice",
              "instructions": "Which statement about Process Communication with Pipes is correct?",
              "starterCode": "",
              "solution": "A Pipe gives two processes a direct two-way channel, with one connection end in each process.",
              "solutionExplanation": "A Pipe gives two processes a direct two-way channel, with one connection end in each process. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A Pipe gives two processes a direct two-way channel, with one connection end in each process.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Process Communication with Pipes actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A Pipe gives two processes a direct two-way channel, with one connection end in each process.",
                "Process Communication with Pipes can only be used once in a program",
                "Process Communication with Pipes requires a separate paid licence to use",
                "Process Communication with Pipes only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-multiprocessing-m2",
        "title": "Multiprocessing and Parallelism in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-multiprocessing-m2-l1",
            "slug": "py-multiprocessing-m2-l1",
            "title": "Shared Memory Values",
            "concept": "multiprocessing.Value and Array live in memory shared between processes, so every process sees the same number. They are the fastest way to share a small amount of state, and they still need a lock for read-modify-write steps.",
            "syntax": "counter = mp.Value('i', 0)",
            "exampleCode": "import multiprocessing as mp\n\ndef bump(counter):\n    with counter.get_lock():\n        counter.value += 1\n\nif __name__ == \"__main__\":\n    counter = mp.Value(\"i\", 0)\n    ps = [mp.Process(target=bump, args=(counter,)) for _ in range(3)]\n    for p in ps:\n        p.start()\n    for p in ps:\n        p.join()\n    print(counter.value)\n",
            "exampleLanguage": "python",
            "mistake": "Updating a shared Value without its lock and losing increments.",
            "bug": {
              "prompt": "The code below should increment a shared Value from 3 processes under its lock and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef bump(counter):\n    counter.value += 1\n\nif __name__ == \"__main__\":\n    counter = mp.Value(\"i\", 0)\n    ps = [mp.Process(target=bump, args=(counter,)) for _ in range(3)]\n    for p in ps:\n        p.start()\n    for p in ps:\n        p.join()\n    print(counter.value)\n",
              "fixedCode": "import multiprocessing as mp\n\ndef bump(counter):\n    with counter.get_lock():\n        counter.value += 1\n\nif __name__ == \"__main__\":\n    counter = mp.Value(\"i\", 0)\n    ps = [mp.Process(target=bump, args=(counter,)) for _ in range(3)]\n    for p in ps:\n        p.start()\n    for p in ps:\n        p.join()\n    print(counter.value)\n",
              "explanation": "Without the lock the read and write of the value can interleave between processes, so increments can be lost and the result may be below 3."
            },
            "exercise": {
              "title": "Practise Shared Memory Values",
              "type": "write-code",
              "instructions": "Read an integer k from stdin. Start k processes, each adding 10 to a shared Value under its lock, and print the final value.",
              "starterCode": "import multiprocessing as mp, sys\n\ndef add(counter, amount):\n    # TODO: add amount to counter.value under counter.get_lock()\n    pass\n\n# TODO: read k, start k processes adding 10, join, print counter.value\n",
              "solution": "import multiprocessing as mp, sys\n\ndef add(counter, amount):\n    with counter.get_lock():\n        counter.value += amount\n\nif __name__ == \"__main__\":\n    k = int(sys.stdin.read().strip())\n    counter = mp.Value(\"i\", 0)\n    ps = [mp.Process(target=add, args=(counter, 10)) for _ in range(k)]\n    for p in ps:\n        p.start()\n    for p in ps:\n        p.join()\n    print(counter.value)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "30",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "40",
                  "hidden": true,
                  "stdin": "4"
                }
              ],
              "hintNotes": {
                "concept": "Shared Memory Values is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-multiprocessing-m2-l2",
            "slug": "py-multiprocessing-m2-l2",
            "title": "Locks Across Processes",
            "concept": "A multiprocessing.Lock works across processes the same way a thread lock works across threads: only one process holds it at a time. Shared state without a lock is just as racy between processes as it is between threads.",
            "syntax": "lock = mp.Lock()",
            "exampleCode": "import multiprocessing as mp\n\ndef work(total, lock):\n    with lock:\n        total.value += 5\n\nif __name__ == \"__main__\":\n    total = mp.Value(\"i\", 0)\n    lock = mp.Lock()\n    ps = [mp.Process(target=work, args=(total, lock)) for _ in range(2)]\n    for p in ps:\n        p.start()\n    for p in ps:\n        p.join()\n    print(total.value)\n",
            "exampleLanguage": "python",
            "mistake": "Creating a separate lock inside each child process instead of sharing one lock.",
            "bug": {
              "prompt": "The code below should add 5 twice to a shared total under one shared lock and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef work(total):\n    with mp.Lock():\n        total.value += 5\n\nif __name__ == \"__main__\":\n    total = mp.Value(\"i\", 0)\n    ps = [mp.Process(target=work, args=(total,)) for _ in range(2)]\n    for p in ps:\n        p.start()\n    for p in ps:\n        p.join()\n    print(total.value)\n",
              "fixedCode": "import multiprocessing as mp\n\ndef work(total, lock):\n    with lock:\n        total.value += 5\n\nif __name__ == \"__main__\":\n    total = mp.Value(\"i\", 0)\n    lock = mp.Lock()\n    ps = [mp.Process(target=work, args=(total, lock)) for _ in range(2)]\n    for p in ps:\n        p.start()\n    for p in ps:\n        p.join()\n    print(total.value)\n",
              "explanation": "A lock created inside each child is a different lock, so the two processes never actually exclude each other."
            },
            "exercise": {
              "title": "Practise Locks Across Processes",
              "type": "write-code",
              "instructions": "Read an integer k from stdin. Start k processes that each append their index to a managed list under a shared lock, then print the sorted list.",
              "starterCode": "import multiprocessing as mp, sys\n\ndef work(out, lock, n):\n    # TODO: append n to out under the lock\n    pass\n\n# TODO: read k, start k processes for 0..k-1 with a shared lock, print sorted list\n",
              "solution": "import multiprocessing as mp, sys\n\ndef work(out, lock, n):\n    with lock:\n        out.append(n)\n\nif __name__ == \"__main__\":\n    k = int(sys.stdin.read().strip())\n    manager = mp.Manager()\n    out = manager.list()\n    lock = mp.Lock()\n    ps = [mp.Process(target=work, args=(out, lock, n)) for n in range(k)]\n    for p in ps:\n        p.start()\n    for p in ps:\n        p.join()\n    print(sorted(out))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[0, 1, 2]",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[0, 1, 2, 3]",
                  "hidden": true,
                  "stdin": "4"
                }
              ],
              "hintNotes": {
                "concept": "Locks Across Processes is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-multiprocessing-m2-l3",
            "slug": "py-multiprocessing-m2-l3",
            "title": "Handling Worker Errors",
            "concept": "An exception inside a worker process does not crash the parent; with a pool it surfaces when the result is collected, and with a queue the worker can send back an error message instead. Either way, the parent must check for failure explicitly.",
            "syntax": "try:\n    result = pool.apply(f, (x,))\nexcept ValueError as e:\n    print(e)",
            "exampleCode": "import multiprocessing as mp\n\ndef risky(n):\n    if n < 0:\n        raise ValueError(\"negative\")\n    return n\n\nif __name__ == \"__main__\":\n    with mp.Pool(2) as pool:\n        try:\n            print(pool.map(risky, [1, -2]))\n        except ValueError as e:\n            print(\"caught:\", e)\n",
            "exampleLanguage": "python",
            "mistake": "Assuming a worker exception is silently ignored when the parent never collects the result.",
            "bug": {
              "prompt": "The code below should catch a ValueError raised by a pool worker and print 'caught: negative', but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef risky(n):\n    if n < 0:\n        raise ValueError(\"negative\")\n    return n\n\nif __name__ == \"__main__\":\n    with mp.Pool(2) as pool:\n        print(pool.map(risky, [1, -2]))\n",
              "fixedCode": "import multiprocessing as mp\n\ndef risky(n):\n    if n < 0:\n        raise ValueError(\"negative\")\n    return n\n\nif __name__ == \"__main__\":\n    with mp.Pool(2) as pool:\n        try:\n            print(pool.map(risky, [1, -2]))\n        except ValueError as e:\n            print(\"caught:\", e)\n",
              "explanation": "Without the try block the worker's ValueError propagates out of pool.map and crashes the parent instead of printing the caught message."
            },
            "exercise": {
              "title": "Check your understanding of Handling Worker Errors",
              "type": "multiple-choice",
              "instructions": "Which statement about Handling Worker Errors is correct?",
              "starterCode": "",
              "solution": "An exception inside a worker process does not crash the parent; with a pool it surfaces when the result is collected, and with a queue the worker can send back an error message instead.",
              "solutionExplanation": "An exception inside a worker process does not crash the parent; with a pool it surfaces when the result is collected, and with a queue the worker can send back an error message instead. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An exception inside a worker process does not crash the parent; with a pool it surfaces when the result is collected, and with a queue the worker can send back an error message instead.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Handling Worker Errors actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "An exception inside a worker process does not crash the parent; with a pool it surfaces when the result is collected, and with a queue the worker can send back an error message instead.",
                "Handling Worker Errors can only be used once in a program",
                "Handling Worker Errors requires a separate paid licence to use",
                "Handling Worker Errors only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-multiprocessing-m2-l4",
            "slug": "py-multiprocessing-m2-l4",
            "title": "Chunksize and Performance",
            "concept": "Chunksize controls how many items a pool sends to a worker at once, trading scheduling overhead against load balance. Big chunks are efficient for uniform work, while small chunks keep workers busy when some items take much longer than others.",
            "syntax": "pool.map(f, items, chunksize=10)",
            "exampleCode": "import multiprocessing as mp\n\ndef square(n):\n    return n * n\n\nif __name__ == \"__main__\":\n    with mp.Pool(2) as pool:\n        print(pool.map(square, [1, 2, 3], chunksize=1))\n",
            "exampleLanguage": "python",
            "mistake": "Using chunksize larger than the whole input, which sends everything to one worker.",
            "bug": {
              "prompt": "The code below should map square over 1, 2, 3 with chunksize 1 and print the results, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\n\ndef square(n):\n    return n * n\n\nif __name__ == \"__main__\":\n    with mp.Pool(2) as pool:\n        print(pool.map(square, [1, 2, 3], chunksize=10))\n",
              "fixedCode": "import multiprocessing as mp\n\ndef square(n):\n    return n * n\n\nif __name__ == \"__main__\":\n    with mp.Pool(2) as pool:\n        print(pool.map(square, [1, 2, 3], chunksize=1))\n",
              "explanation": "A chunksize of 10 on 3 items sends the whole job to a single worker, so the second worker sits idle and the pool gains nothing."
            },
            "exercise": {
              "title": "Practise Chunksize and Performance",
              "type": "write-code",
              "instructions": "Read integers from stdin, square them with a Pool of 2 using chunksize 1, and print the resulting list.",
              "starterCode": "import multiprocessing as mp, sys\n\ndef square(n):\n    return n * n\n\n# TODO: read ints, pool.map(square, nums, chunksize=1), print the list\n",
              "solution": "import multiprocessing as mp, sys\n\ndef square(n):\n    return n * n\n\nif __name__ == \"__main__\":\n    nums = [int(x) for x in sys.stdin.read().split()]\n    with mp.Pool(2) as pool:\n        print(pool.map(square, nums, chunksize=1))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[4, 9, 16]",
                  "hidden": false,
                  "stdin": "2 3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[25, 36]",
                  "hidden": true,
                  "stdin": "5 6"
                }
              ],
              "hintNotes": {
                "concept": "Chunksize and Performance is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-multiprocessing-m2-l5",
            "slug": "py-multiprocessing-m2-l5",
            "title": "A Parallel Word Counter",
            "concept": "A parallel word counter splits the text into chunks, counts each chunk in its own process, and merges the partial counts. Splitting the work is what makes the pool faster than a single process on large inputs.",
            "syntax": "partial = pool.map(count_chunk, chunks)",
            "exampleCode": "import multiprocessing as mp\nfrom collections import Counter\n\ndef count_chunk(words):\n    return Counter(words)\n\nif __name__ == \"__main__\":\n    chunks = [[\"a\", \"b\"], [\"a\", \"c\"]]\n    with mp.Pool(2) as pool:\n        total = sum(pool.map(count_chunk, chunks), Counter())\n    print(dict(sorted(total.items())))\n",
            "exampleLanguage": "python",
            "mistake": "Merging partial counts by overwriting instead of adding them, which loses counts from earlier chunks.",
            "bug": {
              "prompt": "The code below should count words in two chunks in a pool and print the merged counts sorted by word, but it gives the wrong result. What is the bug?",
              "buggyCode": "import multiprocessing as mp\nfrom collections import Counter\n\ndef count_chunk(words):\n    return Counter(words)\n\nif __name__ == \"__main__\":\n    chunks = [[\"a\", \"b\"], [\"a\", \"c\"]]\n    with mp.Pool(2) as pool:\n        parts = pool.map(count_chunk, chunks)\n    print(dict(sorted(parts[0].items())))\n",
              "fixedCode": "import multiprocessing as mp\nfrom collections import Counter\n\ndef count_chunk(words):\n    return Counter(words)\n\nif __name__ == \"__main__\":\n    chunks = [[\"a\", \"b\"], [\"a\", \"c\"]]\n    with mp.Pool(2) as pool:\n        total = sum(pool.map(count_chunk, chunks), Counter())\n    print(dict(sorted(total.items())))\n",
              "explanation": "Printing only the first chunk's counts drops the second chunk entirely, so 'a' shows 1 instead of 2 and 'c' is missing."
            },
            "exercise": {
              "title": "Practise A Parallel Word Counter",
              "type": "write-code",
              "instructions": "Read words from stdin, split them into 2 chunks, count each chunk in a pool, merge the counts, and print 'word: count' lines sorted by word.",
              "starterCode": "import multiprocessing as mp, sys\nfrom collections import Counter\n\ndef count_chunk(words):\n    # TODO: return Counter(words)\n    pass\n\n# TODO: read words, split into 2 chunks, pool.map, merge with sum(..., Counter()), print sorted lines\n",
              "solution": "import multiprocessing as mp, sys\nfrom collections import Counter\n\ndef count_chunk(words):\n    return Counter(words)\n\nif __name__ == \"__main__\":\n    words = sys.stdin.read().split()\n    mid = (len(words) + 1) // 2\n    chunks = [words[:mid], words[mid:]]\n    with mp.Pool(2) as pool:\n        total = sum(pool.map(count_chunk, chunks), Counter())\n    for word in sorted(total):\n        print(f\"{word}: {total[word]}\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "apple: 2\nbanana: 1\ncherry: 1",
                  "hidden": false,
                  "stdin": "apple banana apple cherry"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "one: 2\nthree: 1\ntwo: 1",
                  "hidden": true,
                  "stdin": "one two one three"
                }
              ],
              "hintNotes": {
                "concept": "A Parallel Word Counter is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Parallel Sum of Squares",
      "type": "build-program",
      "instructions": "Build a parallel sum of squares: read integers from stdin, square them in a Pool of 2, and print the total as 'total: N'.",
      "starterCode": "import multiprocessing as mp, sys\n\ndef square(n):\n    return n * n\n\n# TODO: read ints, pool.map(square, nums), print 'total: N'\n",
      "solution": "import multiprocessing as mp, sys\n\ndef square(n):\n    return n * n\n\nif __name__ == \"__main__\":\n    nums = [int(x) for x in sys.stdin.read().split()]\n    with mp.Pool(2) as pool:\n        print(f\"total: {sum(pool.map(square, nums))}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "total: 30",
          "hidden": false,
          "stdin": "1 2 3 4"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "total: 61",
          "hidden": true,
          "stdin": "5 6"
        }
      ],
      "hintNotes": {
        "concept": "Parallel Sum of Squares is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Parallel Sum of Squares Capstone Project",
      "description": "A small end-to-end parallel program that squares numbers in a process pool and totals them.",
      "requirements": [
        "Use a multiprocessing Pool to square the numbers.",
        "Apply at least three of these skills: Process pools, Parallel map, Chunksize tuning, Shared memory.",
        "Handle empty input by printing 'total: 0'.",
        "Guard the entry point with if __name__ == \"__main__\"."
      ],
      "rubric": [
        "Program runs and totals the squares correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Empty input prints 'total: 0'.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-pytest",
    "slug": "py-pytest",
    "language": "python",
    "category": "languages",
    "title": "Testing with pytest",
    "description": "Learn to test Python code the pytest way: assert-based tests, discovery rules, fixtures, parametrize, exception testing, and temporary files. pytest itself is not installed here, so every exercise runs its pytest-style tests with a tiny plain-Python runner from the standard library.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "Writing test functions",
      "assert statements",
      "Test discovery",
      "Fixtures",
      "Parametrized tests",
      "Testing exceptions",
      "Temporary files",
      "Organising test suites"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to proofread before publishing: a little discipline up front saves an embarrassing mistake later.",
    "modules": [
      {
        "id": "py-pytest-m1",
        "title": "Fundamentals of Testing with pytest",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-pytest-m1-l1",
            "slug": "py-pytest-m1-l1",
            "title": "Why Test Your Code",
            "concept": "A test is a small program that checks one behaviour of your code and fails loudly when that behaviour breaks. Tests turn bug hunting from guesswork into a repeatable check you can run after every change.",
            "syntax": "def test_add():\n    assert add(2, 3) == 5",
            "exampleCode": "def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n\ntest_add()\nprint(\"1 passed\")\n",
            "exampleLanguage": "python",
            "mistake": "Writing tests that only check the happy path and never the edge cases.",
            "bug": {
              "prompt": "The code below should test that add(2, 3) equals 5 and print '1 passed', but it gives the wrong result. What is the bug?",
              "buggyCode": "def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 6\n\ntest_add()\nprint(\"1 passed\")\n",
              "fixedCode": "def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n\ntest_add()\nprint(\"1 passed\")\n",
              "explanation": "The test asserts the wrong expected value, so a correct add function fails the test."
            },
            "exercise": {
              "title": "Practise Why Test Your Code",
              "type": "write-code",
              "instructions": "Read two integers from stdin, define add(a, b), assert add equals their sum in a test function, run it, and print '1 passed'.",
              "starterCode": "def add(a, b):\n    # TODO: return a + b\n    return 0\n\ndef test_add(a, b, expected):\n    # TODO: assert add(a, b) == expected\n    pass\n\n# TODO: read a, b; run test_add(a, b, a + b); print '1 passed'\n",
              "solution": "def add(a, b):\n    return a + b\n\ndef test_add(a, b, expected):\n    assert add(a, b) == expected\n\na, b = [int(x) for x in __import__(\"sys\").stdin.read().split()]\ntest_add(a, b, a + b)\nprint(\"1 passed\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "1 passed",
                  "hidden": false,
                  "stdin": "2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "1 passed",
                  "hidden": true,
                  "stdin": "10 20"
                }
              ],
              "hintNotes": {
                "concept": "Why Test Your Code is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-pytest-m1-l2",
            "slug": "py-pytest-m1-l2",
            "title": "Writing Your First Test Function",
            "concept": "A pytest test is a function whose name starts with test_ and whose body checks behaviour with assert. pytest finds these functions automatically, so no registration or boilerplate is needed.",
            "syntax": "def test_something():\n    assert ...",
            "exampleCode": "def double(n):\n    return n * 2\n\ndef test_double():\n    assert double(21) == 42\n\ntest_double()\nprint(\"1 passed\")\n",
            "exampleLanguage": "python",
            "mistake": "Naming a test function without the test_ prefix, so pytest never discovers it.",
            "bug": {
              "prompt": "The code below should test that double(21) equals 42 and print '1 passed', but it gives the wrong result. What is the bug?",
              "buggyCode": "def double(n):\n    return n * 2\n\ndef check_double():\n    assert double(21) == 42\n\ncheck_double()\nprint(\"1 passed\")\n",
              "fixedCode": "def double(n):\n    return n * 2\n\ndef test_double():\n    assert double(21) == 42\n\ntest_double()\nprint(\"1 passed\")\n",
              "explanation": "A function named check_double is never discovered by pytest, so the test silently never runs."
            },
            "exercise": {
              "title": "Practise Writing Your First Test Function",
              "type": "write-code",
              "instructions": "Read an integer from stdin, define is_even(n), write test_is_even asserting it on the input, run it, and print '1 passed'.",
              "starterCode": "def is_even(n):\n    # TODO: return n % 2 == 0\n    return False\n\ndef test_is_even(n):\n    # TODO: assert is_even(n) is True when n is even\n    pass\n\n# TODO: read n (even), run test_is_even(n), print '1 passed'\n",
              "solution": "def is_even(n):\n    return n % 2 == 0\n\ndef test_is_even(n):\n    assert is_even(n) is True\n\nn = int(__import__(\"sys\").stdin.read().strip())\ntest_is_even(n)\nprint(\"1 passed\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "1 passed",
                  "hidden": false,
                  "stdin": "4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "1 passed",
                  "hidden": true,
                  "stdin": "6"
                }
              ],
              "hintNotes": {
                "concept": "Writing Your First Test Function is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-pytest-m1-l3",
            "slug": "py-pytest-m1-l3",
            "title": "The assert Statement",
            "concept": "The assert statement checks a condition and raises AssertionError with a message when it is false. pytest rewrites asserts to show the actual values involved, which is why plain asserts are enough for most tests.",
            "syntax": "assert result == expected, \"message\"",
            "exampleCode": "def total(nums):\n    return sum(nums)\n\nassert total([1, 2, 3]) == 6, \"total should be 6\"\nprint(\"ok\")\n",
            "exampleLanguage": "python",
            "mistake": "Using assert for input validation in production code, where -O can strip it away.",
            "bug": {
              "prompt": "The code below should assert that total([1, 2, 3]) equals 6 and print 'ok', but it gives the wrong result. What is the bug?",
              "buggyCode": "def total(nums):\n    return sum(nums)\n\nassert total([1, 2, 3]) == 5, \"total should be 6\"\nprint(\"ok\")\n",
              "fixedCode": "def total(nums):\n    return sum(nums)\n\nassert total([1, 2, 3]) == 6, \"total should be 6\"\nprint(\"ok\")\n",
              "explanation": "The assertion checks the wrong expected value, so it fails even though total is correct."
            },
            "exercise": {
              "title": "Check your understanding of The assert Statement",
              "type": "multiple-choice",
              "instructions": "Which statement about The assert Statement is correct?",
              "starterCode": "",
              "solution": "The assert statement checks a condition and raises AssertionError with a message when it is false.",
              "solutionExplanation": "The assert statement checks a condition and raises AssertionError with a message when it is false. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The assert statement checks a condition and raises AssertionError with a message when it is false.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what The assert Statement actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "The assert statement checks a condition and raises AssertionError with a message when it is false.",
                "The assert Statement can only be used once in a program",
                "The assert Statement requires a separate paid licence to use",
                "The assert Statement only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-pytest-m1-l4",
            "slug": "py-pytest-m1-l4",
            "title": "Test Discovery Rules",
            "concept": "pytest discovers files named test_*.py or *_test.py and, inside them, functions named test_*. Following the naming rules is what makes a test run at all; a well-written test with the wrong name is invisible.",
            "syntax": "test_calculator.py\ndef test_add(): ...",
            "exampleCode": "tests = [name for name in [\"test_add\", \"check_add\", \"test_sub\"] if name.startswith(\"test_\")]\nprint(tests)\n",
            "exampleLanguage": "python",
            "mistake": "Putting tests in a file that does not match the test_*.py pattern.",
            "bug": {
              "prompt": "The code below should list the names starting with 'test_' from test_add, check_add and test_sub and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "tests = [name for name in [\"test_add\", \"check_add\", \"test_sub\"] if name.startswith(\"check\")]\nprint(tests)\n",
              "fixedCode": "tests = [name for name in [\"test_add\", \"check_add\", \"test_sub\"] if name.startswith(\"test_\")]\nprint(tests)\n",
              "explanation": "Filtering on the 'check' prefix keeps the wrong name and drops both real tests."
            },
            "exercise": {
              "title": "Practise Test Discovery Rules",
              "type": "write-code",
              "instructions": "Read space-separated names from stdin, keep the ones starting with 'test_', and print the list.",
              "starterCode": "import sys\n\n# TODO: read names, filter startswith('test_'), print the list\n",
              "solution": "import sys\n\nnames = sys.stdin.read().split()\nprint([name for name in names if name.startswith(\"test_\")])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['test_add', 'test_sub']",
                  "hidden": false,
                  "stdin": "test_add check_x test_sub"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['test_a', 'test_b']",
                  "hidden": true,
                  "stdin": "test_a foo test_b"
                }
              ],
              "hintNotes": {
                "concept": "Test Discovery Rules is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-pytest-m1-l5",
            "slug": "py-pytest-m1-l5",
            "title": "Fixtures in Plain Python",
            "concept": "A fixture is a helper that builds the object a test needs, such as a fresh list or a temporary database, so each test starts from a known state. In pytest a fixture is a function marked with @pytest.fixture; here the same idea is shown with a plain setup function.",
            "syntax": "@pytest.fixture\ndef sample():\n    return [1, 2, 3]",
            "exampleCode": "def make_cart():\n    return []\n\ndef test_cart():\n    cart = make_cart()\n    cart.append(\"book\")\n    assert cart == [\"book\"]\n\ntest_cart()\nprint(\"1 passed\")\n",
            "exampleLanguage": "python",
            "mistake": "Sharing one mutable fixture object between tests so they pollute each other.",
            "bug": {
              "prompt": "The code below should build a fresh cart with a fixture function, add 'book', assert it, and print '1 passed', but it gives the wrong result. What is the bug?",
              "buggyCode": "def make_cart():\n    return []\n\nshared = make_cart()\n\ndef test_cart():\n    shared.append(\"book\")\n    assert shared == [\"book\"]\n\ntest_cart()\nprint(\"1 passed\")\n",
              "fixedCode": "def make_cart():\n    return []\n\ndef test_cart():\n    cart = make_cart()\n    cart.append(\"book\")\n    assert cart == [\"book\"]\n\ntest_cart()\nprint(\"1 passed\")\n",
              "explanation": "Using one shared cart means a second test would see the 'book' left behind by the first, so tests stop being independent."
            },
            "exercise": {
              "title": "Check your understanding of Fixtures in Plain Python",
              "type": "multiple-choice",
              "instructions": "Which statement about Fixtures in Plain Python is correct?",
              "starterCode": "",
              "solution": "A fixture is a helper that builds the object a test needs, such as a fresh list or a temporary database, so each test starts from a known state.",
              "solutionExplanation": "A fixture is a helper that builds the object a test needs, such as a fresh list or a temporary database, so each test starts from a known state. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A fixture is a helper that builds the object a test needs, such as a fresh list or a temporary database, so each test starts from a known state.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Fixtures in Plain Python actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A fixture is a helper that builds the object a test needs, such as a fresh list or a temporary database, so each test starts from a known state.",
                "Fixtures in Plain Python can only be used once in a program",
                "Fixtures in Plain Python requires a separate paid licence to use",
                "Fixtures in Plain Python only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-pytest-m2",
        "title": "Testing with pytest in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-pytest-m2-l1",
            "slug": "py-pytest-m2-l1",
            "title": "Parametrize Patterns",
            "concept": "Parametrizing runs the same test body with many different inputs, so one test function covers a whole table of cases. It replaces copy-pasted test functions that differ only in their numbers.",
            "syntax": "@pytest.mark.parametrize(\"n,expected\", [(1, 1), (2, 4)])",
            "exampleCode": "def square(n):\n    return n * n\n\ncases = [(1, 1), (2, 4), (3, 9)]\nfor n, expected in cases:\n    assert square(n) == expected\nprint(\"3 passed\")\n",
            "exampleLanguage": "python",
            "mistake": "Writing a separate test function for each input instead of parametrizing one function.",
            "bug": {
              "prompt": "The code below should check square for 1, 2 and 3 against 1, 4 and 9 and print '3 passed', but it gives the wrong result. What is the bug?",
              "buggyCode": "def square(n):\n    return n * n\n\ncases = [(1, 1), (2, 4), (3, 8)]\nfor n, expected in cases:\n    assert square(n) == expected\nprint(\"3 passed\")\n",
              "fixedCode": "def square(n):\n    return n * n\n\ncases = [(1, 1), (2, 4), (3, 9)]\nfor n, expected in cases:\n    assert square(n) == expected\nprint(\"3 passed\")\n",
              "explanation": "The case table claims 3 squared is 8, so the parametrized run fails on the third case."
            },
            "exercise": {
              "title": "Practise Parametrize Patterns",
              "type": "write-code",
              "instructions": "Read integers from stdin, check that doubling each gives twice the input using a case table, and print 'N passed' with the count.",
              "starterCode": "import sys\n\ndef double(n):\n    return n * 2\n\n# TODO: read ints, build cases [(n, n * 2)], assert each, print f'{len(cases)} passed'\n",
              "solution": "import sys\n\ndef double(n):\n    return n * 2\n\nnums = [int(x) for x in sys.stdin.read().split()]\ncases = [(n, n * 2) for n in nums]\nfor n, expected in cases:\n    assert double(n) == expected\nprint(f\"{len(cases)} passed\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "3 passed",
                  "hidden": false,
                  "stdin": "1 2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2 passed",
                  "hidden": true,
                  "stdin": "4 5"
                }
              ],
              "hintNotes": {
                "concept": "Parametrize Patterns is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-pytest-m2-l2",
            "slug": "py-pytest-m2-l2",
            "title": "Testing Exceptions",
            "concept": "To test that code raises an error, pytest.raises checks the exception type and lets the test read the message. A test that only checks the happy path never proves the error handling works.",
            "syntax": "with pytest.raises(ValueError):\n    int(\"abc\")",
            "exampleCode": "import contextlib\n\ndef divide(a, b):\n    return a / b\n\ntry:\n    divide(1, 0)\n    print(\"no error\")\nexcept ZeroDivisionError:\n    print(\"raised ZeroDivisionError\")\n",
            "exampleLanguage": "python",
            "mistake": "Catching the exception inside the test instead of asserting that it is raised.",
            "bug": {
              "prompt": "The code below should call divide(1, 0), catch ZeroDivisionError, and print 'raised ZeroDivisionError', but it gives the wrong result. What is the bug?",
              "buggyCode": "def divide(a, b):\n    return a / b\n\ntry:\n    divide(1, 0)\nexcept ValueError:\n    print(\"raised ZeroDivisionError\")\n",
              "fixedCode": "def divide(a, b):\n    return a / b\n\ntry:\n    divide(1, 0)\n    print(\"no error\")\nexcept ZeroDivisionError:\n    print(\"raised ZeroDivisionError\")\n",
              "explanation": "Catching ValueError never matches the ZeroDivisionError that divide raises, so the exception escapes and the program crashes."
            },
            "exercise": {
              "title": "Practise Testing Exceptions",
              "type": "write-code",
              "instructions": "Read an integer divisor from stdin, call divide(10, d), and print 'raised ZeroDivisionError' if it raises, else print the result.",
              "starterCode": "def divide(a, b):\n    return a / b\n\n# TODO: read d; try divide(10, d); print result or 'raised ZeroDivisionError'\n",
              "solution": "import sys\n\ndef divide(a, b):\n    return a / b\n\nd = int(sys.stdin.read().strip())\ntry:\n    print(divide(10, d))\nexcept ZeroDivisionError:\n    print(\"raised ZeroDivisionError\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "raised ZeroDivisionError",
                  "hidden": false,
                  "stdin": "0"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "5.0",
                  "hidden": true,
                  "stdin": "2"
                }
              ],
              "hintNotes": {
                "concept": "Testing Exceptions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-pytest-m2-l3",
            "slug": "py-pytest-m2-l3",
            "title": "Using tmp Directories",
            "concept": "The tmp_path fixture gives each test its own empty temporary directory, so tests can create real files without touching the project. Files written there are cleaned up automatically when the test session ends.",
            "syntax": "def test_file(tmp_path):\n    p = tmp_path / \"data.txt\"",
            "exampleCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"data.txt\"\n    p.write_text(\"hello\")\n    print(p.read_text())\n",
            "exampleLanguage": "python",
            "mistake": "Writing test files into the project directory instead of a temporary one.",
            "bug": {
              "prompt": "The code below should write 'hello' to a temp file and print its contents, but it gives the wrong result. What is the bug?",
              "buggyCode": "import tempfile\nfrom pathlib import Path\n\np = Path(\"data.txt\")\np.write_text(\"hello\")\nprint(p.read_text())\n",
              "fixedCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"data.txt\"\n    p.write_text(\"hello\")\n    print(p.read_text())\n",
              "explanation": "Writing to data.txt in the working directory pollutes the project and leaves a stray file behind after the test."
            },
            "exercise": {
              "title": "Check your understanding of Using tmp Directories",
              "type": "multiple-choice",
              "instructions": "Which statement about Using tmp Directories is correct?",
              "starterCode": "",
              "solution": "The tmp_path fixture gives each test its own empty temporary directory, so tests can create real files without touching the project.",
              "solutionExplanation": "The tmp_path fixture gives each test its own empty temporary directory, so tests can create real files without touching the project. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The tmp_path fixture gives each test its own empty temporary directory, so tests can create real files without touching the project.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Using tmp Directories actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "The tmp_path fixture gives each test its own empty temporary directory, so tests can create real files without touching the project.",
                "Using tmp Directories can only be used once in a program",
                "Using tmp Directories requires a separate paid licence to use",
                "Using tmp Directories only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-pytest-m2-l4",
            "slug": "py-pytest-m2-l4",
            "title": "Organising a Test Suite",
            "concept": "A good test suite groups tests by module, keeps each test short and independent, and names tests after the behaviour they check. Organisation is what keeps a suite fast to run and easy to trust as it grows.",
            "syntax": "tests/test_calculator.py",
            "exampleCode": "import sys\n\ndef add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n\ndef test_add_zero():\n    assert add(0, 0) == 0\n\nfor t in (test_add, test_add_zero):\n    t()\nprint(\"2 passed\")\n",
            "exampleLanguage": "python",
            "mistake": "Letting tests depend on each other's execution order.",
            "bug": {
              "prompt": "The code below should run two independent add tests and print '2 passed', but it gives the wrong result. What is the bug?",
              "buggyCode": "def add(a, b):\n    return a + b\n\nstate = []\n\ndef test_add():\n    state.append(add(2, 3))\n    assert state[0] == 5\n\ndef test_add_zero():\n    assert add(0, 0) == state[0] - 5\n\nfor t in (test_add, test_add_zero):\n    t()\nprint(\"2 passed\")\n",
              "fixedCode": "import sys\n\ndef add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5\n\ndef test_add_zero():\n    assert add(0, 0) == 0\n\nfor t in (test_add, test_add_zero):\n    t()\nprint(\"2 passed\")\n",
              "explanation": "The second test reads state written by the first, so it fails if run alone or in a different order."
            },
            "exercise": {
              "title": "Practise Organising a Test Suite",
              "type": "write-code",
              "instructions": "Read two integers from stdin, run two independent tests (add and subtract) on them, and print '2 passed'.",
              "starterCode": "import sys\n\ndef add(a, b):\n    return a + b\n\ndef sub(a, b):\n    return a - b\n\n# TODO: read a, b; assert add(a, b) == a + b and sub(a, b) == a - b; print '2 passed'\n",
              "solution": "import sys\n\ndef add(a, b):\n    return a + b\n\ndef sub(a, b):\n    return a - b\n\na, b = [int(x) for x in sys.stdin.read().split()]\nassert add(a, b) == a + b\nassert sub(a, b) == a - b\nprint(\"2 passed\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "2 passed",
                  "hidden": false,
                  "stdin": "10 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2 passed",
                  "hidden": true,
                  "stdin": "7 2"
                }
              ],
              "hintNotes": {
                "concept": "Organising a Test Suite is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-pytest-m2-l5",
            "slug": "py-pytest-m2-l5",
            "title": "A Tested Mini Calculator",
            "concept": "A tested mini calculator combines the whole track: small pure functions, a test for each one, and a runner that reports how many passed. Pure functions are the easiest code to test because their result depends only on their inputs.",
            "syntax": "def test_all():\n    assert calc(\"2+3\") == 5",
            "exampleCode": "def calc(expr):\n    a, op, b = expr.split()\n    a, b = int(a), int(b)\n    return {\"+\": a + b, \"-\": a - b, \"*\": a * b}[op]\n\nassert calc(\"2 + 3\") == 5\nassert calc(\"6 - 1\") == 5\nprint(\"2 passed\")\n",
            "exampleLanguage": "python",
            "mistake": "Testing the calculator only through its user interface instead of its pure functions.",
            "bug": {
              "prompt": "The code below should assert calc('2 + 3') and calc('6 - 1') both equal 5 and print '2 passed', but it gives the wrong result. What is the bug?",
              "buggyCode": "def calc(expr):\n    a, op, b = expr.split()\n    a, b = int(a), int(b)\n    return {\"+\": a + b, \"-\": a - b, \"*\": a * b}[op]\n\nassert calc(\"2 + 3\") == 6\nassert calc(\"6 - 1\") == 5\nprint(\"2 passed\")\n",
              "fixedCode": "def calc(expr):\n    a, op, b = expr.split()\n    a, b = int(a), int(b)\n    return {\"+\": a + b, \"-\": a - b, \"*\": a * b}[op]\n\nassert calc(\"2 + 3\") == 5\nassert calc(\"6 - 1\") == 5\nprint(\"2 passed\")\n",
              "explanation": "The first assertion expects 6 from 2 + 3, so the test fails even though the calculator is correct."
            },
            "exercise": {
              "title": "Practise A Tested Mini Calculator",
              "type": "write-code",
              "instructions": "Read expressions like '2 + 3' (one per line) from stdin, evaluate each with a calc function, and print the results one per line.",
              "starterCode": "def calc(expr):\n    # TODO: split into a, op, b; return the computed int\n    return 0\n\n# TODO: read lines, print calc(line) for each\n",
              "solution": "import sys\n\ndef calc(expr):\n    a, op, b = expr.split()\n    a, b = int(a), int(b)\n    return {\"+\": a + b, \"-\": a - b, \"*\": a * b, \"/\": a // b}[op]\n\nfor line in sys.stdin.read().strip().splitlines():\n    print(calc(line))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "5\n5",
                  "hidden": false,
                  "stdin": "2 + 3\n6 - 1"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "20\n5",
                  "hidden": true,
                  "stdin": "4 * 5\n10 / 2"
                }
              ],
              "hintNotes": {
                "concept": "A Tested Mini Calculator is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Tested String Tools",
      "type": "build-program",
      "instructions": "Build tested string tools: read words from stdin, define reverse_word and count_vowels, assert both on the first word in test functions, then print the reversed first word and its vowel count as 'word: reversed vowels: N'.",
      "starterCode": "def reverse_word(w):\n    # TODO: return w reversed\n    return w\n\ndef count_vowels(w):\n    # TODO: return the number of vowels in w\n    return 0\n\n# TODO: read words; test both functions on words[0]; print f\"{words[0]}: {reverse_word(words[0])} vowels: {count_vowels(words[0])}\"\n",
      "solution": "import sys\n\ndef reverse_word(w):\n    return w[::-1]\n\ndef count_vowels(w):\n    return sum(1 for ch in w.lower() if ch in \"aeiou\")\n\ndef test_reverse_word():\n    assert reverse_word(\"abc\") == \"cba\"\n\ndef test_count_vowels():\n    assert count_vowels(\"hello\") == 2\n\nwords = sys.stdin.read().split()\ntest_reverse_word()\ntest_count_vowels()\nprint(f\"{words[0]}: {reverse_word(words[0])} vowels: {count_vowels(words[0])}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "hello: olleh vowels: 2",
          "hidden": false,
          "stdin": "hello world"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "python: nohtyp vowels: 1",
          "hidden": true,
          "stdin": "python code"
        }
      ],
      "hintNotes": {
        "concept": "Tested String Tools is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Tested String Tools Capstone Project",
      "description": "A small end-to-end tested program: string helper functions with tests and a printed report.",
      "requirements": [
        "Define reverse_word and count_vowels as pure functions.",
        "Apply at least three of these skills: Writing test functions, assert statements, Parametrized tests, Testing exceptions.",
        "Run a test function for each helper before printing.",
        "Print the result in the exact format 'word: reversed vowels: N'."
      ],
      "rubric": [
        "Program runs and prints the correct report.",
        "Code is clear, well-named, and organised into functions.",
        "Both test functions run and would fail on a wrong implementation.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-testing-advanced",
    "slug": "py-testing-advanced",
    "language": "python",
    "category": "languages",
    "title": "Advanced Testing: Mocks and Fixtures",
    "description": "Go further with testing: unittest.mock, patching, test doubles, fixture scopes, async test patterns, seeded property-style checks, and a tiny line-coverage tracer, all with the standard library only.",
    "difficulty": "Advanced",
    "estimatedHours": 16,
    "skills": [
      "unittest.mock",
      "Mock objects",
      "patch",
      "Test doubles",
      "Fixture scopes",
      "Async tests",
      "Property-style testing",
      "Line coverage tracing"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to rehearse a play with stand-ins: the understudies let you test every scene without the real actors present.",
    "modules": [
      {
        "id": "py-testing-advanced-m1",
        "title": "Fundamentals of Advanced Testing",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-testing-advanced-m1-l1",
            "slug": "py-testing-advanced-m1-l1",
            "title": "Test Doubles: Stubs and Fakes",
            "concept": "A test double stands in for a real dependency: a stub returns canned answers, a fake is a working lightweight version, and a mock records how it was used. Doubles let tests run fast and offline, without a database or a network.",
            "syntax": "class FakeDB:\n    def get(self, key):\n        return \"fake-value\"",
            "exampleCode": "class FakeDB:\n    def get(self, key):\n        return \"fake-\" + key\n\ndef lookup(db, key):\n    return db.get(key)\n\nassert lookup(FakeDB(), \"user\") == \"fake-user\"\nprint(\"1 passed\")\n",
            "exampleLanguage": "python",
            "mistake": "Using a double that behaves nothing like the real dependency, so the test proves nothing.",
            "bug": {
              "prompt": "The code below should look up 'user' in a fake database and assert the result is 'fake-user', then print '1 passed', but it gives the wrong result. What is the bug?",
              "buggyCode": "class FakeDB:\n    def get(self, key):\n        return \"wrong\"\n\ndef lookup(db, key):\n    return db.get(key)\n\nassert lookup(FakeDB(), \"user\") == \"fake-user\"\nprint(\"1 passed\")\n",
              "fixedCode": "class FakeDB:\n    def get(self, key):\n        return \"fake-\" + key\n\ndef lookup(db, key):\n    return db.get(key)\n\nassert lookup(FakeDB(), \"user\") == \"fake-user\"\nprint(\"1 passed\")\n",
              "explanation": "The fake ignores its key and always returns 'wrong', so the lookup assertion fails."
            },
            "exercise": {
              "title": "Practise Test Doubles: Stubs and Fakes",
              "type": "write-code",
              "instructions": "Read a key from stdin, look it up in a FakeDB whose get returns 'fake-' + key, assert the result, and print it.",
              "starterCode": "import sys\n\nclass FakeDB:\n    # TODO: get(key) returns 'fake-' + key\n    pass\n\n# TODO: read key, assert FakeDB().get(key) == 'fake-' + key, print the result\n",
              "solution": "import sys\n\nclass FakeDB:\n    def get(self, key):\n        return \"fake-\" + key\n\nkey = sys.stdin.read().strip()\nresult = FakeDB().get(key)\nassert result == \"fake-\" + key\nprint(result)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "fake-user",
                  "hidden": false,
                  "stdin": "user"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "fake-order",
                  "hidden": true,
                  "stdin": "order"
                }
              ],
              "hintNotes": {
                "concept": "Test Doubles: Stubs and Fakes is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-testing-advanced-m1-l2",
            "slug": "py-testing-advanced-m1-l2",
            "title": "unittest.mock Basics",
            "concept": "unittest.mock.Mock creates a fake object that records every call made to it, so a test can check that a function was called with the right arguments. Mocks are for verifying interactions, not return values.",
            "syntax": "from unittest.mock import Mock",
            "exampleCode": "from unittest.mock import Mock\n\nsender = Mock()\nsender.send(\"hi\")\nprint(sender.send.call_count)\nprint(sender.send.call_args[0][0])\n",
            "exampleLanguage": "python",
            "mistake": "Asserting on a mock's return value instead of on the calls it recorded.",
            "bug": {
              "prompt": "The code below should call a mock's send once with 'hi' and print the call count and the first argument, but it gives the wrong result. What is the bug?",
              "buggyCode": "from unittest.mock import Mock\n\nsender = Mock()\nsender.send(\"hi\")\nprint(sender.send.call_count)\nprint(sender.send.call_args[0][1])\n",
              "fixedCode": "from unittest.mock import Mock\n\nsender = Mock()\nsender.send(\"hi\")\nprint(sender.send.call_count)\nprint(sender.send.call_args[0][0])\n",
              "explanation": "call_args[0][1] reads a second positional argument that was never passed, so it raises IndexError."
            },
            "exercise": {
              "title": "Practise unittest.mock Basics",
              "type": "write-code",
              "instructions": "Read a word from stdin, call a Mock's notify method with it once, and print the call count and the recorded argument.",
              "starterCode": "import sys\nfrom unittest.mock import Mock\n\n# TODO: read word, call notifier.notify(word), print call count and call_args[0][0]\n",
              "solution": "import sys\nfrom unittest.mock import Mock\n\nnotifier = Mock()\nword = sys.stdin.read().strip()\nnotifier.notify(word)\nprint(notifier.notify.call_count)\nprint(notifier.notify.call_args[0][0])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "1\nhello",
                  "hidden": false,
                  "stdin": "hello"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "1\nalert",
                  "hidden": true,
                  "stdin": "alert"
                }
              ],
              "hintNotes": {
                "concept": "unittest.mock Basics is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-testing-advanced-m1-l3",
            "slug": "py-testing-advanced-m1-l3",
            "title": "Patching Functions",
            "concept": "Patching temporarily replaces a function or attribute with a mock for the duration of a test, then restores the original. It is how tests control things like the current time or a network call without changing production code.",
            "syntax": "with patch(\"module.get_time\", return_value=100):",
            "exampleCode": "from unittest.mock import patch\n\ndef greet(now):\n    return f\"time is {now}\"\n\nwith patch(__name__ + \".greet\", return_value=\"mocked\"):\n    print(greet(5))\n",
            "exampleLanguage": "python",
            "mistake": "Patching the name where it is defined instead of where it is used, so the test patches nothing.",
            "bug": {
              "prompt": "The code below should patch greet to return 'mocked' and print the patched call, but it gives the wrong result. What is the bug?",
              "buggyCode": "from unittest.mock import patch\n\ndef greet(now):\n    return f\"time is {now}\"\n\nwith patch(\"other_module.greet\", return_value=\"mocked\"):\n    print(greet(5))\n",
              "fixedCode": "from unittest.mock import patch\n\ndef greet(now):\n    return f\"time is {now}\"\n\nwith patch(__name__ + \".greet\", return_value=\"mocked\"):\n    print(greet(5))\n",
              "explanation": "Patching other_module.greet targets a name that does not exist, so patch raises AttributeError instead of replacing anything."
            },
            "exercise": {
              "title": "Check your understanding of Patching Functions",
              "type": "multiple-choice",
              "instructions": "Which statement about Patching Functions is correct?",
              "starterCode": "",
              "solution": "Patching temporarily replaces a function or attribute with a mock for the duration of a test, then restores the original.",
              "solutionExplanation": "Patching temporarily replaces a function or attribute with a mock for the duration of a test, then restores the original. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Patching temporarily replaces a function or attribute with a mock for the duration of a test, then restores the original.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Patching Functions actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Patching temporarily replaces a function or attribute with a mock for the duration of a test, then restores the original.",
                "Patching Functions can only be used once in a program",
                "Patching Functions requires a separate paid licence to use",
                "Patching Functions only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-testing-advanced-m1-l4",
            "slug": "py-testing-advanced-m1-l4",
            "title": "Mocking External Services",
            "concept": "Mocking an external service replaces a network call with a canned response, so tests run offline and deterministically. The mock should return the same shape as the real service, or the test proves nothing about the real integration.",
            "syntax": "mock_api = Mock(return_value={\"status\": \"ok\"})",
            "exampleCode": "from unittest.mock import Mock\n\ndef fetch_status(api):\n    return api.get(\"/status\")[\"status\"]\n\napi = Mock()\napi.get.return_value = {\"status\": \"ok\"}\nprint(fetch_status(api))\n",
            "exampleLanguage": "python",
            "mistake": "Mocking at the wrong level, so the code under test never actually runs.",
            "bug": {
              "prompt": "The code below should fetch a status through a mocked API and print 'ok', but it gives the wrong result. What is the bug?",
              "buggyCode": "from unittest.mock import Mock\n\ndef fetch_status(api):\n    return api.get(\"/status\")[\"status\"]\n\napi = Mock()\napi.get.return_value = {\"status\": \"down\"}\nprint(fetch_status(api))\n",
              "fixedCode": "from unittest.mock import Mock\n\ndef fetch_status(api):\n    return api.get(\"/status\")[\"status\"]\n\napi = Mock()\napi.get.return_value = {\"status\": \"ok\"}\nprint(fetch_status(api))\n",
              "explanation": "The mock returns 'down' instead of 'ok', so the test prints the wrong status."
            },
            "exercise": {
              "title": "Practise Mocking External Services",
              "type": "write-code",
              "instructions": "Read a status word from stdin, configure a Mock API whose get returns {'status': word}, fetch it through fetch_status, and print the status.",
              "starterCode": "import sys\nfrom unittest.mock import Mock\n\ndef fetch_status(api):\n    return api.get(\"/status\")[\"status\"]\n\n# TODO: read word, set api.get.return_value, print fetch_status(api)\n",
              "solution": "import sys\nfrom unittest.mock import Mock\n\ndef fetch_status(api):\n    return api.get(\"/status\")[\"status\"]\n\nword = sys.stdin.read().strip()\napi = Mock()\napi.get.return_value = {\"status\": word}\nprint(fetch_status(api))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ok",
                  "hidden": false,
                  "stdin": "ok"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "ready",
                  "hidden": true,
                  "stdin": "ready"
                }
              ],
              "hintNotes": {
                "concept": "Mocking External Services is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-testing-advanced-m1-l5",
            "slug": "py-testing-advanced-m1-l5",
            "title": "Fixture Scopes",
            "concept": "A fixture's scope decides how often it is built: function scope gives every test a fresh object, while module scope shares one object across tests in a file. Function scope is the safe default; wider scopes trade isolation for speed.",
            "syntax": "@pytest.fixture(scope=\"module\")",
            "exampleCode": "def make_counter():\n    return [0]\n\nc1 = make_counter()\nc2 = make_counter()\nc1[0] += 1\nprint(c1[0], c2[0])\n",
            "exampleLanguage": "python",
            "mistake": "Sharing a mutable module-scoped fixture between tests that mutate it.",
            "bug": {
              "prompt": "The code below should build two fresh counters, increment only the first, and print both values, but it gives the wrong result. What is the bug?",
              "buggyCode": "def make_counter():\n    return [0]\n\nshared = make_counter()\nc1 = shared\nc2 = shared\nc1[0] += 1\nprint(c1[0], c2[0])\n",
              "fixedCode": "def make_counter():\n    return [0]\n\nc1 = make_counter()\nc2 = make_counter()\nc1[0] += 1\nprint(c1[0], c2[0])\n",
              "explanation": "Both counters point at the same shared list, so incrementing the first also changes the second."
            },
            "exercise": {
              "title": "Check your understanding of Fixture Scopes",
              "type": "multiple-choice",
              "instructions": "Which statement about Fixture Scopes is correct?",
              "starterCode": "",
              "solution": "A fixture's scope decides how often it is built: function scope gives every test a fresh object, while module scope shares one object across tests in a file.",
              "solutionExplanation": "A fixture's scope decides how often it is built: function scope gives every test a fresh object, while module scope shares one object across tests in a file. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A fixture's scope decides how often it is built: function scope gives every test a fresh object, while module scope shares one object across tests in a file.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Fixture Scopes actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A fixture's scope decides how often it is built: function scope gives every test a fresh object, while module scope shares one object across tests in a file.",
                "Fixture Scopes can only be used once in a program",
                "Fixture Scopes requires a separate paid licence to use",
                "Fixture Scopes only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-testing-advanced-m2",
        "title": "Advanced Testing in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-testing-advanced-m2-l1",
            "slug": "py-testing-advanced-m2-l1",
            "title": "Monkeypatching with Mock",
            "concept": "Monkeypatching swaps an attribute at runtime so a test can control it, and the mock library's patch does the swapping and the restoring for you. It is the standard way to fake environment variables, clocks, and file access in tests.",
            "syntax": "with patch.dict(os.environ, {\"KEY\": \"value\"}):",
            "exampleCode": "import os\nfrom unittest.mock import patch\n\nwith patch.dict(os.environ, {\"MODE\": \"test\"}):\n    print(os.environ[\"MODE\"])\nprint(os.environ.get(\"MODE\", \"unset\"))\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that patch restores the original after the block, and reading the patched value outside it.",
            "bug": {
              "prompt": "The code below should patch MODE to 'test' inside a block, print it, then print the value outside the block, but it gives the wrong result. What is the bug?",
              "buggyCode": "import os\nfrom unittest.mock import patch\n\nwith patch.dict(os.environ, {\"MODE\": \"test\"}):\n    print(os.environ[\"MODE\"])\nprint(os.environ[\"MODE\"])\n",
              "fixedCode": "import os\nfrom unittest.mock import patch\n\nwith patch.dict(os.environ, {\"MODE\": \"test\"}):\n    print(os.environ[\"MODE\"])\nprint(os.environ.get(\"MODE\", \"unset\"))\n",
              "explanation": "The patch is undone when the block ends, so reading os.environ['MODE'] outside raises KeyError."
            },
            "exercise": {
              "title": "Practise Monkeypatching with Mock",
              "type": "write-code",
              "instructions": "Read a mode word from stdin, patch os.environ MODE to it inside a block, and print the patched value followed by the outside value ('unset').",
              "starterCode": "import os, sys\nfrom unittest.mock import patch\n\n# TODO: read word, patch.dict MODE to word, print inside value then outside .get('MODE', 'unset')\n",
              "solution": "import os, sys\nfrom unittest.mock import patch\n\nword = sys.stdin.read().strip()\nwith patch.dict(os.environ, {\"MODE\": word}):\n    print(os.environ[\"MODE\"])\nprint(os.environ.get(\"MODE\", \"unset\"))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "test\nunset",
                  "hidden": false,
                  "stdin": "test"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "live\nunset",
                  "hidden": true,
                  "stdin": "live"
                }
              ],
              "hintNotes": {
                "concept": "Monkeypatching with Mock is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-testing-advanced-m2-l2",
            "slug": "py-testing-advanced-m2-l2",
            "title": "Testing Async Code Without pytest",
            "concept": "Async code can be tested without pytest by running the coroutine with asyncio.run inside the test and asserting on its result. The pattern is the same as any other test: arrange, run, assert.",
            "syntax": "result = asyncio.run(coro())",
            "exampleCode": "import asyncio\n\nasync def fetch():\n    await asyncio.sleep(0)\n    return 42\n\nassert asyncio.run(fetch()) == 42\nprint(\"1 passed\")\n",
            "exampleLanguage": "python",
            "mistake": "Calling the coroutine in a test without awaiting or running it, so the test checks a coroutine object.",
            "bug": {
              "prompt": "The code below should run a coroutine returning 42 with asyncio.run, assert the result, and print '1 passed', but it gives the wrong result. What is the bug?",
              "buggyCode": "import asyncio\n\nasync def fetch():\n    await asyncio.sleep(0)\n    return 42\n\nassert fetch() == 42\nprint(\"1 passed\")\n",
              "fixedCode": "import asyncio\n\nasync def fetch():\n    await asyncio.sleep(0)\n    return 42\n\nassert asyncio.run(fetch()) == 42\nprint(\"1 passed\")\n",
              "explanation": "Comparing a coroutine object with 42 is always False, so the assertion fails without ever running the coroutine."
            },
            "exercise": {
              "title": "Practise Testing Async Code Without pytest",
              "type": "write-code",
              "instructions": "Read an integer from stdin, run an async coroutine that doubles it via asyncio.run, assert the result, and print it.",
              "starterCode": "import asyncio, sys\n\nasync def double(n):\n    return n * 2\n\n# TODO: read n, assert asyncio.run(double(n)) == n * 2, print the result\n",
              "solution": "import asyncio, sys\n\nasync def double(n):\n    return n * 2\n\nn = int(sys.stdin.read().strip())\nresult = asyncio.run(double(n))\nassert result == n * 2\nprint(result)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42",
                  "hidden": false,
                  "stdin": "21"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "16",
                  "hidden": true,
                  "stdin": "8"
                }
              ],
              "hintNotes": {
                "concept": "Testing Async Code Without pytest is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-testing-advanced-m2-l3",
            "slug": "py-testing-advanced-m2-l3",
            "title": "Property-Based Testing Ideas",
            "concept": "Property-based testing checks a property that must hold for many random inputs, instead of a handful of hand-picked examples. With a fixed random seed the same inputs are generated every run, so failures are reproducible.",
            "syntax": "random.seed(0)",
            "exampleCode": "import random\n\nrandom.seed(0)\nvalues = [random.randint(1, 100) for _ in range(3)]\nfor v in values:\n    assert 1 <= v <= 100\nprint(values)\n",
            "exampleLanguage": "python",
            "mistake": "Running property tests with no seed, so a failure cannot be reproduced.",
            "bug": {
              "prompt": "The code below should draw 3 seeded random numbers between 1 and 100, assert each is in range, and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import random\n\nvalues = [random.randint(1, 100) for _ in range(3)]\nfor v in values:\n    assert 1 <= v <= 100\nprint(values)\n",
              "fixedCode": "import random\n\nrandom.seed(0)\nvalues = [random.randint(1, 100) for _ in range(3)]\nfor v in values:\n    assert 1 <= v <= 100\nprint(values)\n",
              "explanation": "Without the seed the drawn numbers change on every run, so the printed list is not reproducible."
            },
            "exercise": {
              "title": "Check your understanding of Property-Based Testing Ideas",
              "type": "multiple-choice",
              "instructions": "Which statement about Property-Based Testing Ideas is correct?",
              "starterCode": "",
              "solution": "Property-based testing checks a property that must hold for many random inputs, instead of a handful of hand-picked examples.",
              "solutionExplanation": "Property-based testing checks a property that must hold for many random inputs, instead of a handful of hand-picked examples. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Property-based testing checks a property that must hold for many random inputs, instead of a handful of hand-picked examples.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Property-Based Testing Ideas actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Property-based testing checks a property that must hold for many random inputs, instead of a handful of hand-picked examples.",
                "Property-Based Testing Ideas can only be used once in a program",
                "Property-Based Testing Ideas requires a separate paid licence to use",
                "Property-Based Testing Ideas only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-testing-advanced-m2-l4",
            "slug": "py-testing-advanced-m2-l4",
            "title": "Measuring Coverage Concepts",
            "concept": "Line coverage measures which lines of code actually ran during the tests, and a tracer can collect that information with sys.settrace. Low coverage points at untested branches, though 100 percent coverage still does not prove the tests are good.",
            "syntax": "sys.settrace(tracer)",
            "exampleCode": "import sys\n\nseen = set()\n\ndef tracer(frame, event, arg):\n    if event == \"line\":\n        seen.add(frame.f_lineno)\n    return tracer\n\ndef add(a, b):\n    return a + b\n\nsys.settrace(tracer)\nadd(1, 2)\nsys.settrace(None)\nprint(len(seen) > 0)\n",
            "exampleLanguage": "python",
            "mistake": "Measuring coverage only on the happy path and concluding the code is fully tested.",
            "bug": {
              "prompt": "The code below should trace a call to add(1, 2) and print whether any lines were seen, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sys\n\nseen = set()\n\ndef tracer(frame, event, arg):\n    if event == \"line\":\n        seen.add(frame.f_lineno)\n    return tracer\n\ndef add(a, b):\n    return a + b\n\nadd(1, 2)\nprint(len(seen) > 0)\n",
              "fixedCode": "import sys\n\nseen = set()\n\ndef tracer(frame, event, arg):\n    if event == \"line\":\n        seen.add(frame.f_lineno)\n    return tracer\n\ndef add(a, b):\n    return a + b\n\nsys.settrace(tracer)\nadd(1, 2)\nsys.settrace(None)\nprint(len(seen) > 0)\n",
              "explanation": "Without calling sys.settrace the tracer is never installed, so no lines are recorded and the print says False."
            },
            "exercise": {
              "title": "Practise Measuring Coverage Concepts",
              "type": "write-code",
              "instructions": "Read an integer from stdin, trace a function that returns n * 3, and print the traced result and whether any lines were seen ('lines seen: True/False').",
              "starterCode": "import sys\n\n# TODO: install a line tracer, call triple(n), stop tracing, print result and 'lines seen: True/False'\n",
              "solution": "import sys\n\nseen = set()\n\ndef tracer(frame, event, arg):\n    if event == \"line\":\n        seen.add(frame.f_lineno)\n    return tracer\n\ndef triple(n):\n    return n * 3\n\nn = int(sys.stdin.read().strip())\nsys.settrace(tracer)\nresult = triple(n)\nsys.settrace(None)\nprint(result)\nprint(f\"lines seen: {len(seen) > 0}\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "21\nlines seen: True",
                  "hidden": false,
                  "stdin": "7"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "15\nlines seen: True",
                  "hidden": true,
                  "stdin": "5"
                }
              ],
              "hintNotes": {
                "concept": "Measuring Coverage Concepts is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-testing-advanced-m2-l5",
            "slug": "py-testing-advanced-m2-l5",
            "title": "Testing a Small CLI",
            "concept": "A CLI is easiest to test by calling its argument-parsing function with an explicit list of arguments instead of real command-line input. argparse's parse_args accepts a list, which makes the test deterministic and fast.",
            "syntax": "args = parser.parse_args([\"--count\", \"3\"])",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--count\", type=int, default=1)\nprint(parser.parse_args([\"--count\", \"3\"]).count)\n",
            "exampleLanguage": "python",
            "mistake": "Testing a CLI by running the whole program as a subprocess for every case.",
            "bug": {
              "prompt": "The code below should parse --count 3 from an explicit argument list and print the count, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--count\", type=int, default=1)\nprint(parser.parse_args([\"--count\", \"three\"]).count)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--count\", type=int, default=1)\nprint(parser.parse_args([\"--count\", \"3\"]).count)\n",
              "explanation": "Passing 'three' where an int is required makes argparse exit with an error instead of returning a count."
            },
            "exercise": {
              "title": "Practise Testing a Small CLI",
              "type": "write-code",
              "instructions": "Read an integer from stdin, parse it as --count from an explicit argument list, assert it matches, and print it.",
              "starterCode": "import argparse, sys\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--count\", type=int, default=1)\n# TODO: read n, parse ['--count', str(n)], assert count == n, print count\n",
              "solution": "import argparse, sys\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--count\", type=int, default=1)\nn = int(sys.stdin.read().strip())\nargs = parser.parse_args([\"--count\", str(n)])\nassert args.count == n\nprint(args.count)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "3",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "9",
                  "hidden": true,
                  "stdin": "9"
                }
              ],
              "hintNotes": {
                "concept": "Testing a Small CLI is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Mocked Weather Client",
      "type": "build-program",
      "instructions": "Build a mocked weather client: read a city name from stdin, use a Mock API whose get returns {'city': city, 'temp_c': len(city) * 2}, fetch it through get_weather, and print 'city: temp_c C'.",
      "starterCode": "import sys\nfrom unittest.mock import Mock\n\ndef get_weather(api, city):\n    # TODO: return api.get('/weather/' + city)\n    pass\n\n# TODO: read city, set api.get.return_value, print f\"{city}: {data['temp_c']} C\"\n",
      "solution": "import sys\nfrom unittest.mock import Mock\n\ndef get_weather(api, city):\n    return api.get(\"/weather/\" + city)\n\ncity = sys.stdin.read().strip()\napi = Mock()\napi.get.return_value = {\"city\": city, \"temp_c\": len(city) * 2}\ndata = get_weather(api, city)\napi.get.assert_called_once_with(\"/weather/\" + city)\nprint(f\"{data['city']}: {data['temp_c']} C\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "Oslo: 8 C",
          "hidden": false,
          "stdin": "Oslo"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "Tokyo: 10 C",
          "hidden": true,
          "stdin": "Tokyo"
        }
      ],
      "hintNotes": {
        "concept": "Mocked Weather Client is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Mocked Weather Client Capstone Project",
      "description": "A small end-to-end tested program: a weather client whose external API is replaced by a mock.",
      "requirements": [
        "Replace the external API with a unittest.mock Mock.",
        "Apply at least three of these skills: unittest.mock, Mock objects, patch, Test doubles.",
        "Assert that the mock was called with the right path.",
        "Print the result in the exact format 'city: temp_c C'."
      ],
      "rubric": [
        "Program runs and prints the mocked weather correctly.",
        "Code is clear, well-named, and organised into functions.",
        "The mock is verified with an assertion on its calls.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-csv-json",
    "slug": "py-csv-json",
    "language": "python",
    "category": "languages",
    "title": "Data Processing with csv and json",
    "description": "Learn to move tabular and structured data through Python with the csv and json standard-library modules: reading, writing, nested structures, custom types, and handling bad data gracefully.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "csv.reader",
      "csv.DictReader",
      "csv.writer",
      "json.loads",
      "json.dumps",
      "Nested JSON",
      "Custom JSON encoding",
      "Handling bad data"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to pack and unpack suitcases: the same belongings, just folded for a different kind of trip.",
    "modules": [
      {
        "id": "py-csv-json-m1",
        "title": "Fundamentals of Data Processing with csv and json",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-csv-json-m1-l1",
            "slug": "py-csv-json-m1-l1",
            "title": "Reading CSV Files",
            "concept": "The csv module reads comma-separated rows as lists of strings, handling quoted fields that contain commas. Reading with csv.reader is the safe alternative to splitting lines on commas by hand.",
            "syntax": "reader = csv.reader(file)",
            "exampleCode": "import csv, io\n\ntext = \"name,age\\nada,36\\n\"\nrows = list(csv.reader(io.StringIO(text)))\nprint(rows)\n",
            "exampleLanguage": "python",
            "mistake": "Splitting CSV lines on commas by hand, which breaks on quoted fields.",
            "bug": {
              "prompt": "The code below should read two CSV rows with csv.reader and print the list of rows, but it gives the wrong result. What is the bug?",
              "buggyCode": "import csv, io\n\ntext = \"name,age\\nada,36\\n\"\nrows = [line.split(\",\") for line in text.splitlines()]\nprint(rows)\n",
              "fixedCode": "import csv, io\n\ntext = \"name,age\\nada,36\\n\"\nrows = list(csv.reader(io.StringIO(text)))\nprint(rows)\n",
              "explanation": "Splitting on commas works for this simple text but breaks the moment a field contains a quoted comma, which csv.reader handles correctly."
            },
            "exercise": {
              "title": "Practise Reading CSV Files",
              "type": "write-code",
              "instructions": "Read CSV text from stdin, parse it with csv.reader, and print the list of rows.",
              "starterCode": "import csv, io, sys\n\n# TODO: read stdin text, list(csv.reader(io.StringIO(text))), print it\n",
              "solution": "import csv, io, sys\n\ntext = sys.stdin.read()\nprint(list(csv.reader(io.StringIO(text))))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[['a', 'b'], ['1', '2']]",
                  "hidden": false,
                  "stdin": "a,b\n1,2"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[['x', 'y'], ['3', '4']]",
                  "hidden": true,
                  "stdin": "x,y\n3,4"
                }
              ],
              "hintNotes": {
                "concept": "Reading CSV Files is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-csv-json-m1-l2",
            "slug": "py-csv-json-m1-l2",
            "title": "Writing CSV Files",
            "concept": "csv.writer writes rows and quotes fields automatically when they contain commas or quotes. Writing through the csv module guarantees the output can be read back by any CSV tool.",
            "syntax": "writer = csv.writer(file)",
            "exampleCode": "import csv, io\n\nbuf = io.StringIO()\nw = csv.writer(buf)\nw.writerow([\"name\", \"age\"])\nw.writerow([\"ada\", 36])\nprint(buf.getvalue().strip())\n",
            "exampleLanguage": "python",
            "mistake": "Joining fields with commas by hand instead of using csv.writer.",
            "bug": {
              "prompt": "The code below should write two rows with csv.writer and print the output, but it gives the wrong result. What is the bug?",
              "buggyCode": "import csv, io\n\nbuf = io.StringIO()\nbuf.write(\"name,age\\n\")\nbuf.write(\"ada,36\\n\")\nprint(buf.getvalue().strip())\n",
              "fixedCode": "import csv, io\n\nbuf = io.StringIO()\nw = csv.writer(buf)\nw.writerow([\"name\", \"age\"])\nw.writerow([\"ada\", 36])\nprint(buf.getvalue().strip())\n",
              "explanation": "Hand-joined output looks the same here but breaks as soon as a field contains a comma, while csv.writer quotes it automatically."
            },
            "exercise": {
              "title": "Practise Writing CSV Files",
              "type": "write-code",
              "instructions": "Read a name and an age from stdin (one per line), write them as a CSV row with csv.writer to a string, and print the stripped result.",
              "starterCode": "import csv, io, sys\n\n# TODO: read name and age lines, writerow([name, age]), print stripped buffer\n",
              "solution": "import csv, io, sys\n\nlines = sys.stdin.read().strip().splitlines()\nbuf = io.StringIO()\nw = csv.writer(buf)\nw.writerow([lines[0], lines[1]])\nprint(buf.getvalue().strip())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ada,36",
                  "hidden": false,
                  "stdin": "ada\n36"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "bob,25",
                  "hidden": true,
                  "stdin": "bob\n25"
                }
              ],
              "hintNotes": {
                "concept": "Writing CSV Files is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-csv-json-m1-l3",
            "slug": "py-csv-json-m1-l3",
            "title": "csv DictReader and DictWriter",
            "concept": "DictReader turns each CSV row into a dictionary keyed by the header names, so columns are accessed by name instead of position. DictWriter does the reverse, writing dictionaries as rows in a fixed field order.",
            "syntax": "reader = csv.DictReader(file)",
            "exampleCode": "import csv, io\n\ntext = \"name,age\\nada,36\\n\"\nrows = list(csv.DictReader(io.StringIO(text)))\nprint(rows[0][\"name\"], rows[0][\"age\"])\n",
            "exampleLanguage": "python",
            "mistake": "Accessing DictReader rows by numeric index instead of by column name.",
            "bug": {
              "prompt": "The code below should read one row with DictReader and print the name and age, but it gives the wrong result. What is the bug?",
              "buggyCode": "import csv, io\n\ntext = \"name,age\\nada,36\\n\"\nrows = list(csv.DictReader(io.StringIO(text)))\nprint(rows[0][0], rows[0][1])\n",
              "fixedCode": "import csv, io\n\ntext = \"name,age\\nada,36\\n\"\nrows = list(csv.DictReader(io.StringIO(text)))\nprint(rows[0][\"name\"], rows[0][\"age\"])\n",
              "explanation": "DictReader rows are dictionaries, so indexing them with 0 and 1 raises KeyError; the columns must be read by name."
            },
            "exercise": {
              "title": "Check your understanding of csv DictReader and DictWriter",
              "type": "multiple-choice",
              "instructions": "Which statement about csv DictReader and DictWriter is correct?",
              "starterCode": "",
              "solution": "DictReader turns each CSV row into a dictionary keyed by the header names, so columns are accessed by name instead of position.",
              "solutionExplanation": "DictReader turns each CSV row into a dictionary keyed by the header names, so columns are accessed by name instead of position. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "DictReader turns each CSV row into a dictionary keyed by the header names, so columns are accessed by name instead of position.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what csv DictReader and DictWriter actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "DictReader turns each CSV row into a dictionary keyed by the header names, so columns are accessed by name instead of position.",
                "csv DictReader and DictWriter can only be used once in a program",
                "csv DictReader and DictWriter requires a separate paid licence to use",
                "csv DictReader and DictWriter only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-csv-json-m1-l4",
            "slug": "py-csv-json-m1-l4",
            "title": "Parsing JSON",
            "concept": "json.loads turns a JSON string into Python objects: objects become dicts, arrays become lists, and numbers and booleans keep their types. It is the standard way to read data from APIs and config files.",
            "syntax": "data = json.loads(text)",
            "exampleCode": "import json\n\ntext = '{\"name\": \"ada\", \"age\": 36}'\ndata = json.loads(text)\nprint(data[\"name\"], data[\"age\"])\n",
            "exampleLanguage": "python",
            "mistake": "Parsing JSON with eval, which can execute arbitrary code hidden in the data.",
            "bug": {
              "prompt": "The code below should parse a JSON object and print its name and age, but it gives the wrong result. What is the bug?",
              "buggyCode": "import json\n\ntext = '{\"name\": \"ada\", \"age\": 36}'\ndata = eval(text)\nprint(data[\"name\"], data[\"age\"])\n",
              "fixedCode": "import json\n\ntext = '{\"name\": \"ada\", \"age\": 36}'\ndata = json.loads(text)\nprint(data[\"name\"], data[\"age\"])\n",
              "explanation": "eval runs whatever code is in the string, so a malicious JSON payload could execute anything; json.loads only builds data."
            },
            "exercise": {
              "title": "Practise Parsing JSON",
              "type": "write-code",
              "instructions": "Read a JSON object from stdin, parse it with json.loads, and print its 'name' and 'age' values separated by a space.",
              "starterCode": "import json, sys\n\n# TODO: read stdin, json.loads, print data['name'] and data['age']\n",
              "solution": "import json, sys\n\ndata = json.loads(sys.stdin.read())\nprint(data[\"name\"], data[\"age\"])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ada 36",
                  "hidden": false,
                  "stdin": "{\"name\": \"ada\", \"age\": 36}"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "bob 25",
                  "hidden": true,
                  "stdin": "{\"name\": \"bob\", \"age\": 25}"
                }
              ],
              "hintNotes": {
                "concept": "Parsing JSON is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-csv-json-m1-l5",
            "slug": "py-csv-json-m1-l5",
            "title": "Writing JSON",
            "concept": "json.dumps turns Python objects into a JSON string, with indent for readable output and sort_keys for stable ordering. Only JSON-compatible types can be dumped, so custom objects need a conversion step first.",
            "syntax": "text = json.dumps(data, indent=2)",
            "exampleCode": "import json\n\ndata = {\"name\": \"ada\", \"age\": 36}\nprint(json.dumps(data, sort_keys=True))\n",
            "exampleLanguage": "python",
            "mistake": "Dumping a set or a custom object directly, which json cannot represent.",
            "bug": {
              "prompt": "The code below should dump a dict to JSON with sorted keys and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import json\n\ndata = {\"name\": \"ada\", \"tags\": {\"a\", \"b\"}}\nprint(json.dumps(data, sort_keys=True))\n",
              "fixedCode": "import json\n\ndata = {\"name\": \"ada\", \"age\": 36}\nprint(json.dumps(data, sort_keys=True))\n",
              "explanation": "A set is not JSON-serialisable, so json.dumps raises TypeError instead of printing anything."
            },
            "exercise": {
              "title": "Check your understanding of Writing JSON",
              "type": "multiple-choice",
              "instructions": "Which statement about Writing JSON is correct?",
              "starterCode": "",
              "solution": "json.",
              "solutionExplanation": "json. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "json.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Writing JSON actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "json.",
                "Writing JSON can only be used once in a program",
                "Writing JSON requires a separate paid licence to use",
                "Writing JSON only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-csv-json-m2",
        "title": "Data Processing with csv and json in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-csv-json-m2-l1",
            "slug": "py-csv-json-m2-l1",
            "title": "Nested JSON Structures",
            "concept": "JSON data is often nested: dicts inside lists inside dicts, such as a user with a list of orders. Accessing nested values means chaining keys and indexes, with .get guarding against missing keys.",
            "syntax": "data[\"user\"][\"orders\"][0][\"total\"]",
            "exampleCode": "import json\n\ntext = '{\"user\": {\"orders\": [{\"total\": 10}, {\"total\": 20}]}}'\ndata = json.loads(text)\nprint(sum(o[\"total\"] for o in data[\"user\"][\"orders\"]))\n",
            "exampleLanguage": "python",
            "mistake": "Indexing straight into nested data without checking that each level exists.",
            "bug": {
              "prompt": "The code below should sum the totals of two nested orders and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import json\n\ntext = '{\"user\": {\"orders\": [{\"total\": 10}, {\"total\": 20}]}}'\ndata = json.loads(text)\nprint(data[\"user\"][\"orders\"][0][\"total\"])\n",
              "fixedCode": "import json\n\ntext = '{\"user\": {\"orders\": [{\"total\": 10}, {\"total\": 20}]}}'\ndata = json.loads(text)\nprint(sum(o[\"total\"] for o in data[\"user\"][\"orders\"]))\n",
              "explanation": "Reading only the first order gives 10 instead of the total of 30 across both orders."
            },
            "exercise": {
              "title": "Practise Nested JSON Structures",
              "type": "write-code",
              "instructions": "Read a JSON object with a 'scores' list from stdin and print the sum of the scores.",
              "starterCode": "import json, sys\n\n# TODO: read stdin, json.loads, print sum(data['scores'])\n",
              "solution": "import json, sys\n\ndata = json.loads(sys.stdin.read())\nprint(sum(data[\"scores\"]))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "60",
                  "hidden": false,
                  "stdin": "{\"scores\": [10, 20, 30]}"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "10",
                  "hidden": true,
                  "stdin": "{\"scores\": [5, 5]}"
                }
              ],
              "hintNotes": {
                "concept": "Nested JSON Structures is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-csv-json-m2-l2",
            "slug": "py-csv-json-m2-l2",
            "title": "JSON and Custom Types",
            "concept": "The json module only handles basic types, so custom objects need a default function that converts them to something serialisable, and a hook that rebuilds them on load. Dates are the classic example: they become ISO strings on the way out and dates again on the way in.",
            "syntax": "json.dumps(obj, default=str)",
            "exampleCode": "import json\nfrom datetime import date\n\nprint(json.dumps({\"day\": date(2026, 11, 24)}, default=str))\n",
            "exampleLanguage": "python",
            "mistake": "Dumping a date object without a default handler and crashing with TypeError.",
            "bug": {
              "prompt": "The code below should dump a dict containing a date using default=str and print the JSON, but it gives the wrong result. What is the bug?",
              "buggyCode": "import json\nfrom datetime import date\n\nprint(json.dumps({\"day\": date(2026, 11, 24)}))\n",
              "fixedCode": "import json\nfrom datetime import date\n\nprint(json.dumps({\"day\": date(2026, 11, 24)}, default=str))\n",
              "explanation": "A date is not JSON-serialisable on its own, so dumps raises TypeError without the default handler."
            },
            "exercise": {
              "title": "Practise JSON and Custom Types",
              "type": "write-code",
              "instructions": "Read a date string 'YYYY-MM-DD' from stdin, build a date object, dump {'day': date} with default=str, and print the JSON.",
              "starterCode": "import json, sys\nfrom datetime import date\n\n# TODO: read 'YYYY-MM-DD', build date, print json.dumps({'day': d}, default=str)\n",
              "solution": "import json, sys\nfrom datetime import date\n\ny, m, d = [int(x) for x in sys.stdin.read().strip().split(\"-\")]\nprint(json.dumps({\"day\": date(y, m, d)}, default=str))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "{\"day\": \"2026-11-24\"}",
                  "hidden": false,
                  "stdin": "2026-11-24"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "{\"day\": \"2025-01-05\"}",
                  "hidden": true,
                  "stdin": "2025-01-05"
                }
              ],
              "hintNotes": {
                "concept": "JSON and Custom Types is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-csv-json-m2-l3",
            "slug": "py-csv-json-m2-l3",
            "title": "Handling Bad Data",
            "concept": "Real data is messy, so parsing code should catch json.JSONDecodeError and csv errors and report the bad row instead of crashing. A program that dies on the first bad record is useless on a real dataset.",
            "syntax": "try:\n    data = json.loads(text)\nexcept json.JSONDecodeError:\n    data = {}",
            "exampleCode": "import json\n\nfor text in ['{\"a\": 1}', 'not json']:\n    try:\n        print(json.loads(text))\n    except json.JSONDecodeError:\n        print(\"bad json\")\n",
            "exampleLanguage": "python",
            "mistake": "Letting one bad record crash a whole batch instead of skipping it and continuing.",
            "bug": {
              "prompt": "The code below should parse a good JSON line and a bad one, printing the data or 'bad json', but it gives the wrong result. What is the bug?",
              "buggyCode": "import json\n\nfor text in ['{\"a\": 1}', 'not json']:\n    print(json.loads(text))\n",
              "fixedCode": "import json\n\nfor text in ['{\"a\": 1}', 'not json']:\n    try:\n        print(json.loads(text))\n    except json.JSONDecodeError:\n        print(\"bad json\")\n",
              "explanation": "Without the try block the second line raises JSONDecodeError and the program crashes before finishing."
            },
            "exercise": {
              "title": "Check your understanding of Handling Bad Data",
              "type": "multiple-choice",
              "instructions": "Which statement about Handling Bad Data is correct?",
              "starterCode": "",
              "solution": "Real data is messy, so parsing code should catch json.",
              "solutionExplanation": "Real data is messy, so parsing code should catch json. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Real data is messy, so parsing code should catch json.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Handling Bad Data actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Real data is messy, so parsing code should catch json.",
                "Handling Bad Data can only be used once in a program",
                "Handling Bad Data requires a separate paid licence to use",
                "Handling Bad Data only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-csv-json-m2-l4",
            "slug": "py-csv-json-m2-l4",
            "title": "CSV Dialects",
            "concept": "A CSV dialect is the set of formatting rules a file uses: the delimiter, the quote character, and the line ending. Sniffing the dialect lets a program read files from different tools without hard-coding one format.",
            "syntax": "csv.Sniffer().sniff(sample)",
            "exampleCode": "import csv, io\n\ntext = \"a;b\\n1;2\\n\"\ndialect = csv.Sniffer().sniff(text, delimiters=\";,\")\nprint(dialect.delimiter)\nrows = list(csv.reader(io.StringIO(text), dialect=dialect))\nprint(rows[1])\n",
            "exampleLanguage": "python",
            "mistake": "Assuming every CSV file uses commas, which fails on semicolon-separated exports.",
            "bug": {
              "prompt": "The code below should sniff the delimiter of a semicolon CSV and print the delimiter and the second row, but it gives the wrong result. What is the bug?",
              "buggyCode": "import csv, io\n\ntext = \"a;b\\n1;2\\n\"\nrows = list(csv.reader(io.StringIO(text)))\nprint(rows[1])\n",
              "fixedCode": "import csv, io\n\ntext = \"a;b\\n1;2\\n\"\ndialect = csv.Sniffer().sniff(text, delimiters=\";,\")\nprint(dialect.delimiter)\nrows = list(csv.reader(io.StringIO(text), dialect=dialect))\nprint(rows[1])\n",
              "explanation": "Reading with the default comma delimiter treats '1;2' as one field, so the row prints as ['1;2'] instead of ['1', '2']."
            },
            "exercise": {
              "title": "Practise CSV Dialects",
              "type": "write-code",
              "instructions": "Read CSV text from stdin, sniff its delimiter, parse it with that dialect, and print the number of fields in the first row.",
              "starterCode": "import csv, io, sys\n\n# TODO: read text, sniff delimiter, parse, print len of first row\n",
              "solution": "import csv, io, sys\n\ntext = sys.stdin.read()\ndialect = csv.Sniffer().sniff(text, delimiters=\";,\")\nrows = list(csv.reader(io.StringIO(text), dialect=dialect))\nprint(len(rows[0]))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "3",
                  "hidden": false,
                  "stdin": "a;b;c\n1;2;3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2",
                  "hidden": true,
                  "stdin": "a,b\n1,2"
                }
              ],
              "hintNotes": {
                "concept": "CSV Dialects is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-csv-json-m2-l5",
            "slug": "py-csv-json-m2-l5",
            "title": "A CSV-to-JSON Converter",
            "concept": "Converting CSV to JSON is a classic glue task: read rows with DictReader, collect them into a list of dicts, and dump the list with json.dumps. The converter is the pattern behind most small data pipelines.",
            "syntax": "json.dumps(list(csv.DictReader(f)))",
            "exampleCode": "import csv, io, json\n\ntext = \"name,age\\nada,36\\nbob,25\\n\"\nrows = list(csv.DictReader(io.StringIO(text)))\nprint(json.dumps(rows, sort_keys=True))\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that DictReader values are always strings, so ages stay strings in the JSON.",
            "bug": {
              "prompt": "The code below should convert two CSV rows to JSON and print the JSON with sorted keys, but it gives the wrong result. What is the bug?",
              "buggyCode": "import csv, io, json\n\ntext = \"name,age\\nada,36\\nbob,25\\n\"\nrows = list(csv.reader(io.StringIO(text)))\nprint(json.dumps(rows, sort_keys=True))\n",
              "fixedCode": "import csv, io, json\n\ntext = \"name,age\\nada,36\\nbob,25\\n\"\nrows = list(csv.DictReader(io.StringIO(text)))\nprint(json.dumps(rows, sort_keys=True))\n",
              "explanation": "Using plain reader produces lists including the header row, not a list of dicts keyed by column name."
            },
            "exercise": {
              "title": "Practise A CSV-to-JSON Converter",
              "type": "write-code",
              "instructions": "Read CSV text from stdin, convert it with DictReader to a list of dicts, and print json.dumps of the list with sort_keys=True.",
              "starterCode": "import csv, io, json, sys\n\n# TODO: read CSV text, DictReader to list, print json.dumps(rows, sort_keys=True)\n",
              "solution": "import csv, io, json, sys\n\ntext = sys.stdin.read()\nrows = list(csv.DictReader(io.StringIO(text)))\nprint(json.dumps(rows, sort_keys=True))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[{\"age\": \"36\", \"name\": \"ada\"}]",
                  "hidden": false,
                  "stdin": "name,age\nada,36"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[{\"city\": \"Oslo\", \"pop\": \"700000\"}]",
                  "hidden": true,
                  "stdin": "city,pop\nOslo,700000"
                }
              ],
              "hintNotes": {
                "concept": "A CSV-to-JSON Converter is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise CSV Grade Report",
      "type": "build-program",
      "instructions": "Build a CSV grade report: read CSV text from stdin with columns 'name,score', compute the average score, and print 'average: X' with one decimal place plus 'top: NAME' for the highest scorer.",
      "starterCode": "import csv, io, sys\n\n# TODO: DictReader the stdin CSV; print average with 1 decimal and the top scorer\n",
      "solution": "import csv, io, sys\n\nrows = list(csv.DictReader(io.StringIO(sys.stdin.read())))\nscores = [(r[\"name\"], int(r[\"score\"])) for r in rows]\navg = sum(s for _, s in scores) / len(scores)\ntop = max(scores, key=lambda t: t[1])[0]\nprint(f\"average: {avg:.1f}\")\nprint(f\"top: {top}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "average: 80.0\ntop: ada",
          "hidden": false,
          "stdin": "name,score\nada,90\nbob,70"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "average: 86.7\ntop: bob",
          "hidden": true,
          "stdin": "name,score\nada,80\nbob,95\ncy,85"
        }
      ],
      "hintNotes": {
        "concept": "CSV Grade Report is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "CSV Grade Report Capstone Project",
      "description": "A small end-to-end data program that reads grades from CSV and prints an average and a top scorer.",
      "requirements": [
        "Read the input with csv.DictReader.",
        "Apply at least three of these skills: csv.DictReader, json.dumps, Nested JSON, Handling bad data.",
        "Print the average with exactly one decimal place.",
        "Print the top scorer by name on a second line."
      ],
      "rubric": [
        "Program runs and reports the correct average and top scorer.",
        "Code is clear, well-named, and organised into functions.",
        "The average is formatted with one decimal place.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-stdlib-data",
    "slug": "py-stdlib-data",
    "language": "python",
    "category": "languages",
    "title": "Data Wrangling with the Standard Library",
    "description": "Learn to wrangle data using only the standard library: Counter, defaultdict, itertools, statistics, dates, sets, and heapq, so you can analyse real datasets without installing anything.",
    "difficulty": "Intermediate",
    "estimatedHours": 13,
    "skills": [
      "collections.Counter",
      "defaultdict",
      "itertools",
      "statistics",
      "datetime",
      "Set operations",
      "heapq",
      "Sorting with keys"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to organise a messy garage: the same stuff, but now you can actually find anything.",
    "modules": [
      {
        "id": "py-stdlib-data-m1",
        "title": "Fundamentals of Data Wrangling with the Standard Library",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-stdlib-data-m1-l1",
            "slug": "py-stdlib-data-m1-l1",
            "title": "Counting with Counter",
            "concept": "Counter counts how many times each item appears and offers helpers such as most_common to rank them. It turns a loop full of ifs into a single line.",
            "syntax": "counts = Counter(words)",
            "exampleCode": "from collections import Counter\n\nprint(Counter([\"a\", \"b\", \"a\", \"c\", \"a\"]))\n",
            "exampleLanguage": "python",
            "mistake": "Counting with a manual dict and forgetting to initialise missing keys.",
            "bug": {
              "prompt": "The code below should count the letters in a, b, a, c, a and print the Counter, but it gives the wrong result. What is the bug?",
              "buggyCode": "counts = {}\nfor ch in [\"a\", \"b\", \"a\", \"c\", \"a\"]:\n    counts[ch] += 1\nprint(counts)\n",
              "fixedCode": "from collections import Counter\n\nprint(Counter([\"a\", \"b\", \"a\", \"c\", \"a\"]))\n",
              "explanation": "A plain dict raises KeyError on the first unseen letter because the key was never initialised."
            },
            "exercise": {
              "title": "Practise Counting with Counter",
              "type": "write-code",
              "instructions": "Read words from stdin, count them with Counter, and print the most common word.",
              "starterCode": "import sys\nfrom collections import Counter\n\n# TODO: read words, Counter, print most_common(1)[0][0]\n",
              "solution": "import sys\nfrom collections import Counter\n\nwords = sys.stdin.read().split()\nprint(Counter(words).most_common(1)[0][0])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "apple",
                  "hidden": false,
                  "stdin": "apple banana apple cherry apple"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "one",
                  "hidden": true,
                  "stdin": "one two one"
                }
              ],
              "hintNotes": {
                "concept": "Counting with Counter is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-stdlib-data-m1-l2",
            "slug": "py-stdlib-data-m1-l2",
            "title": "Grouping with defaultdict",
            "concept": "defaultdict builds a missing value automatically when a key is first used, so grouping code never needs an if to check for the key. A defaultdict(list) is the standard way to group items by a key.",
            "syntax": "groups = defaultdict(list)",
            "exampleCode": "from collections import defaultdict\n\ngroups = defaultdict(list)\nfor word in [\"apple\", \"avocado\", \"banana\"]:\n    groups[word[0]].append(word)\nprint(dict(sorted(groups.items())))\n",
            "exampleLanguage": "python",
            "mistake": "Using a plain dict for grouping and writing the missing-key check by hand every time.",
            "bug": {
              "prompt": "The code below should group apple, avocado and banana by first letter and print the sorted dict, but it gives the wrong result. What is the bug?",
              "buggyCode": "groups = {}\nfor word in [\"apple\", \"avocado\", \"banana\"]:\n    groups[word[0]].append(word)\nprint(dict(sorted(groups.items())))\n",
              "fixedCode": "from collections import defaultdict\n\ngroups = defaultdict(list)\nfor word in [\"apple\", \"avocado\", \"banana\"]:\n    groups[word[0]].append(word)\nprint(dict(sorted(groups.items())))\n",
              "explanation": "A plain dict raises KeyError the first time a new letter is used, because the list was never created."
            },
            "exercise": {
              "title": "Practise Grouping with defaultdict",
              "type": "write-code",
              "instructions": "Read words from stdin, group them by their first letter with defaultdict(list), and print the group sizes sorted by letter as 'a: 2'.",
              "starterCode": "import sys\nfrom collections import defaultdict\n\n# TODO: group words by first letter, print 'letter: count' lines sorted by letter\n",
              "solution": "import sys\nfrom collections import defaultdict\n\ngroups = defaultdict(list)\nfor word in sys.stdin.read().split():\n    groups[word[0]].append(word)\nfor letter in sorted(groups):\n    print(f\"{letter}: {len(groups[letter])}\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "a: 2\nb: 1",
                  "hidden": false,
                  "stdin": "apple avocado banana"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "c: 2\nd: 1",
                  "hidden": true,
                  "stdin": "cat cow dog"
                }
              ],
              "hintNotes": {
                "concept": "Grouping with defaultdict is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-stdlib-data-m1-l3",
            "slug": "py-stdlib-data-m1-l3",
            "title": "Sorting with Key Functions",
            "concept": "The key argument to sorted tells Python what to sort by, such as the length of a string or the second element of a tuple. Sorting by a key is clearer and faster than writing a custom comparison.",
            "syntax": "sorted(items, key=len)",
            "exampleCode": "print(sorted([\"banana\", \"fig\", \"apple\"], key=len))\n",
            "exampleLanguage": "python",
            "mistake": "Writing a manual bubble sort instead of using sorted with a key.",
            "bug": {
              "prompt": "The code below should sort banana, fig and apple by length and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "print(sorted([\"banana\", \"fig\", \"apple\"], key=lambda w: -len(w)))\n",
              "fixedCode": "print(sorted([\"banana\", \"fig\", \"apple\"], key=len))\n",
              "explanation": "Sorting by negative length gives longest first, which is the opposite of the requested order."
            },
            "exercise": {
              "title": "Check your understanding of Sorting with Key Functions",
              "type": "multiple-choice",
              "instructions": "Which statement about Sorting with Key Functions is correct?",
              "starterCode": "",
              "solution": "The key argument to sorted tells Python what to sort by, such as the length of a string or the second element of a tuple.",
              "solutionExplanation": "The key argument to sorted tells Python what to sort by, such as the length of a string or the second element of a tuple. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The key argument to sorted tells Python what to sort by, such as the length of a string or the second element of a tuple.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Sorting with Key Functions actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "The key argument to sorted tells Python what to sort by, such as the length of a string or the second element of a tuple.",
                "Sorting with Key Functions can only be used once in a program",
                "Sorting with Key Functions requires a separate paid licence to use",
                "Sorting with Key Functions only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-stdlib-data-m1-l4",
            "slug": "py-stdlib-data-m1-l4",
            "title": "itertools: chaining and grouping",
            "concept": "itertools.chain joins several iterables into one stream without copying them, and groupby groups consecutive equal items. Both work lazily, so they handle large data without building big intermediate lists.",
            "syntax": "itertools.chain(a, b)",
            "exampleCode": "import itertools\n\nprint(list(itertools.chain([1, 2], [3, 4])))\nprint([k for k, _ in itertools.groupby([1, 1, 2, 2, 3])])\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that groupby only groups consecutive equal items, so unsorted input gives several small groups.",
            "bug": {
              "prompt": "The code below should chain [1, 2] and [3, 4] and print the combined list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import itertools\n\nprint(list(itertools.chain([1, 2])))\n",
              "fixedCode": "import itertools\n\nprint(list(itertools.chain([1, 2], [3, 4])))\n",
              "explanation": "Chaining only the first list leaves out [3, 4] entirely."
            },
            "exercise": {
              "title": "Practise itertools: chaining and grouping",
              "type": "write-code",
              "instructions": "Read two lines of integers from stdin, chain the two lists, and print the combined list.",
              "starterCode": "import itertools, sys\n\n# TODO: read two lines, chain the int lists, print list(chain(...))\n",
              "solution": "import itertools, sys\n\nlines = sys.stdin.read().strip().splitlines()\na = [int(x) for x in lines[0].split()]\nb = [int(x) for x in lines[1].split()]\nprint(list(itertools.chain(a, b)))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[1, 2, 3, 4]",
                  "hidden": false,
                  "stdin": "1 2\n3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[5, 6, 7]",
                  "hidden": true,
                  "stdin": "5\n6 7"
                }
              ],
              "hintNotes": {
                "concept": "itertools: chaining and grouping is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-stdlib-data-m1-l5",
            "slug": "py-stdlib-data-m1-l5",
            "title": "itertools: combinations and permutations",
            "concept": "combinations produces every way to choose k items from a collection, ignoring order, while permutations keeps every ordering. They replace nested loops when a problem needs all possible selections.",
            "syntax": "itertools.combinations(items, 2)",
            "exampleCode": "import itertools\n\nprint(list(itertools.combinations(\"abc\", 2)))\nprint(list(itertools.permutations(\"ab\")))\n",
            "exampleLanguage": "python",
            "mistake": "Writing nested loops to generate combinations and getting the duplicates wrong.",
            "bug": {
              "prompt": "The code below should print all 2-letter combinations of 'abc', but it gives the wrong result. What is the bug?",
              "buggyCode": "import itertools\n\nprint(list(itertools.permutations(\"abc\", 2)))\n",
              "fixedCode": "import itertools\n\nprint(list(itertools.combinations(\"abc\", 2)))\n",
              "explanation": "Permutations of 2 from 'abc' gives 6 ordered pairs, not the 3 unordered combinations."
            },
            "exercise": {
              "title": "Check your understanding of itertools: combinations and permutations",
              "type": "multiple-choice",
              "instructions": "Which statement about itertools: combinations and permutations is correct?",
              "starterCode": "",
              "solution": "combinations produces every way to choose k items from a collection, ignoring order, while permutations keeps every ordering.",
              "solutionExplanation": "combinations produces every way to choose k items from a collection, ignoring order, while permutations keeps every ordering. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "combinations produces every way to choose k items from a collection, ignoring order, while permutations keeps every ordering.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what itertools: combinations and permutations actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "combinations produces every way to choose k items from a collection, ignoring order, while permutations keeps every ordering.",
                "itertools: combinations and permutations can only be used once in a program",
                "itertools: combinations and permutations requires a separate paid licence to use",
                "itertools: combinations and permutations only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-stdlib-data-m2",
        "title": "Data Wrangling with the Standard Library in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-stdlib-data-m2-l1",
            "slug": "py-stdlib-data-m2-l1",
            "title": "statistics: Mean, Median, Mode",
            "concept": "The statistics module computes mean, median, and mode correctly, including the edge cases that hand-rolled code gets wrong. Using it avoids subtle bugs in the middle-value logic for even-sized lists.",
            "syntax": "statistics.mean(values)",
            "exampleCode": "import statistics\n\nvalues = [1, 2, 3, 4]\nprint(statistics.mean(values), statistics.median(values))\n",
            "exampleLanguage": "python",
            "mistake": "Computing the median by hand and forgetting to average the two middle values for even lists.",
            "bug": {
              "prompt": "The code below should print the mean and median of 1, 2, 3, 4, but it gives the wrong result. What is the bug?",
              "buggyCode": "import statistics\n\nvalues = [1, 2, 3, 4]\nprint(statistics.mean(values), values[len(values) // 2])\n",
              "fixedCode": "import statistics\n\nvalues = [1, 2, 3, 4]\nprint(statistics.mean(values), statistics.median(values))\n",
              "explanation": "Taking the element at index 2 gives 3, but the median of an even list is the average of the two middle values, 2.5."
            },
            "exercise": {
              "title": "Practise statistics: Mean, Median, Mode",
              "type": "write-code",
              "instructions": "Read numbers from stdin and print their mean and median separated by a space.",
              "starterCode": "import statistics, sys\n\n# TODO: read numbers, print statistics.mean and statistics.median\n",
              "solution": "import statistics, sys\n\nvalues = [float(x) for x in sys.stdin.read().split()]\nprint(statistics.mean(values), statistics.median(values))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "2.5 2.5",
                  "hidden": false,
                  "stdin": "1 2 3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "20.0 20.0",
                  "hidden": true,
                  "stdin": "10 20 30"
                }
              ],
              "hintNotes": {
                "concept": "statistics: Mean, Median, Mode is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-stdlib-data-m2-l2",
            "slug": "py-stdlib-data-m2-l2",
            "title": "Working with Dates and Times",
            "concept": "The datetime module parses, formats, and compares dates, and timedelta adds or subtracts spans of days. Date arithmetic with timedelta is exact, unlike adding 86400 seconds by hand across daylight-saving changes.",
            "syntax": "date(2026, 11, 24) + timedelta(days=7)",
            "exampleCode": "from datetime import date, timedelta\n\nprint(date(2026, 11, 24) + timedelta(days=7))\n",
            "exampleLanguage": "python",
            "mistake": "Parsing dates by splitting strings instead of using strptime.",
            "bug": {
              "prompt": "The code below should add 7 days to 2026-11-24 and print the new date, but it gives the wrong result. What is the bug?",
              "buggyCode": "from datetime import date, timedelta\n\nprint(date(2026, 11, 24) + timedelta(days=6))\n",
              "fixedCode": "from datetime import date, timedelta\n\nprint(date(2026, 11, 24) + timedelta(days=7))\n",
              "explanation": "Adding 6 days lands on 2026-11-30 instead of the requested 2026-12-01."
            },
            "exercise": {
              "title": "Practise Working with Dates and Times",
              "type": "write-code",
              "instructions": "Read a date 'YYYY-MM-DD' and a number of days from stdin (two lines), add the days, and print the new date in ISO format.",
              "starterCode": "import sys\nfrom datetime import date, timedelta\n\n# TODO: read date line and days line, add timedelta, print isoformat\n",
              "solution": "import sys\nfrom datetime import date, timedelta\n\nlines = sys.stdin.read().strip().splitlines()\ny, m, d = [int(x) for x in lines[0].split(\"-\")]\ndays = int(lines[1])\nprint((date(y, m, d) + timedelta(days=days)).isoformat())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "2026-12-01",
                  "hidden": false,
                  "stdin": "2026-11-24\n7"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2025-01-31",
                  "hidden": true,
                  "stdin": "2025-01-01\n30"
                }
              ],
              "hintNotes": {
                "concept": "Working with Dates and Times is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-stdlib-data-m2-l3",
            "slug": "py-stdlib-data-m2-l3",
            "title": "Sets for Deduplication",
            "concept": "A set keeps only unique items, so converting a list to a set removes duplicates in one step. Set operations such as intersection and difference answer 'what do these groups share' questions directly.",
            "syntax": "unique = set(items)",
            "exampleCode": "print(sorted(set([3, 1, 3, 2, 1])))\nprint(sorted({1, 2, 3} & {2, 3, 4}))\n",
            "exampleLanguage": "python",
            "mistake": "Deduplicating by hand with a loop and an if instead of using a set.",
            "bug": {
              "prompt": "The code below should print the sorted unique values of 3, 1, 3, 2, 1, but it gives the wrong result. What is the bug?",
              "buggyCode": "print(sorted([3, 1, 3, 2, 1]))\n",
              "fixedCode": "print(sorted(set([3, 1, 3, 2, 1])))\n",
              "explanation": "Sorting without converting to a set keeps the duplicates, so the result is [1, 1, 2, 3, 3] instead of [1, 2, 3]."
            },
            "exercise": {
              "title": "Check your understanding of Sets for Deduplication",
              "type": "multiple-choice",
              "instructions": "Which statement about Sets for Deduplication is correct?",
              "starterCode": "",
              "solution": "A set keeps only unique items, so converting a list to a set removes duplicates in one step.",
              "solutionExplanation": "A set keeps only unique items, so converting a list to a set removes duplicates in one step. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A set keeps only unique items, so converting a list to a set removes duplicates in one step.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Sets for Deduplication actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A set keeps only unique items, so converting a list to a set removes duplicates in one step.",
                "Sets for Deduplication can only be used once in a program",
                "Sets for Deduplication requires a separate paid licence to use",
                "Sets for Deduplication only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-stdlib-data-m2-l4",
            "slug": "py-stdlib-data-m2-l4",
            "title": "heapq: Smallest and Largest",
            "concept": "heapq keeps a list organised as a heap so the smallest item is always quick to find, and nlargest and nsmallest return the extremes without sorting everything. Heaps are the right tool for top-k problems.",
            "syntax": "heapq.nsmallest(2, values)",
            "exampleCode": "import heapq\n\nprint(heapq.nsmallest(2, [5, 1, 4, 2, 3]))\nprint(heapq.nlargest(2, [5, 1, 4, 2, 3]))\n",
            "exampleLanguage": "python",
            "mistake": "Sorting a huge list just to take the top 3, which wastes time and memory.",
            "bug": {
              "prompt": "The code below should print the 2 smallest values of 5, 1, 4, 2, 3, but it gives the wrong result. What is the bug?",
              "buggyCode": "import heapq\n\nprint(heapq.nlargest(2, [5, 1, 4, 2, 3]))\n",
              "fixedCode": "import heapq\n\nprint(heapq.nsmallest(2, [5, 1, 4, 2, 3]))\n",
              "explanation": "nlargest returns the biggest values, [5, 4], instead of the smallest ones."
            },
            "exercise": {
              "title": "Practise heapq: Smallest and Largest",
              "type": "write-code",
              "instructions": "Read integers from stdin and print the 3 largest values as a list.",
              "starterCode": "import heapq, sys\n\n# TODO: read ints, print heapq.nlargest(3, nums)\n",
              "solution": "import heapq, sys\n\nnums = [int(x) for x in sys.stdin.read().split()]\nprint(heapq.nlargest(3, nums))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[5, 4, 3]",
                  "hidden": false,
                  "stdin": "5 1 4 2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[40, 30, 20]",
                  "hidden": true,
                  "stdin": "10 20 30 40"
                }
              ],
              "hintNotes": {
                "concept": "heapq: Smallest and Largest is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-stdlib-data-m2-l5",
            "slug": "py-stdlib-data-m2-l5",
            "title": "A Small Data Report",
            "concept": "A small data report pulls the whole track together: read numbers, count them, find the extremes, and print a tidy summary. The report pattern is the same one used in real data jobs, just smaller.",
            "syntax": "Counter(values).most_common(1)",
            "exampleCode": "import statistics\nfrom collections import Counter\n\nvalues = [1, 2, 2, 3]\nprint(\"count:\", len(values))\nprint(\"mean:\", statistics.mean(values))\nprint(\"most common:\", Counter(values).most_common(1)[0][0])\n",
            "exampleLanguage": "python",
            "mistake": "Recomputing the same summary values in several places instead of once.",
            "bug": {
              "prompt": "The code below should print count, mean and most common value for 1, 2, 2, 3, but it gives the wrong result. What is the bug?",
              "buggyCode": "import statistics\nfrom collections import Counter\n\nvalues = [1, 2, 2, 3]\nprint(\"count:\", len(values))\nprint(\"mean:\", statistics.mean(values))\nprint(\"most common:\", Counter(values).most_common(1)[0][1])\n",
              "fixedCode": "import statistics\nfrom collections import Counter\n\nvalues = [1, 2, 2, 3]\nprint(\"count:\", len(values))\nprint(\"mean:\", statistics.mean(values))\nprint(\"most common:\", Counter(values).most_common(1)[0][0])\n",
              "explanation": "most_common returns (value, count) pairs, so index [1] prints the count 2 instead of the value 2."
            },
            "exercise": {
              "title": "Practise A Small Data Report",
              "type": "write-code",
              "instructions": "Read integers from stdin and print three lines: 'count: N', 'mean: X' and 'most common: V'.",
              "starterCode": "import statistics, sys\nfrom collections import Counter\n\n# TODO: read ints, print count, mean, most common value\n",
              "solution": "import statistics, sys\nfrom collections import Counter\n\nvalues = [int(x) for x in sys.stdin.read().split()]\nprint(f\"count: {len(values)}\")\nprint(f\"mean: {statistics.mean(values)}\")\nprint(f\"most common: {Counter(values).most_common(1)[0][0]}\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "count: 4\nmean: 2\nmost common: 2",
                  "hidden": false,
                  "stdin": "1 2 2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "count: 3\nmean: 5.333333333333333\nmost common: 5",
                  "hidden": true,
                  "stdin": "5 5 6"
                }
              ],
              "hintNotes": {
                "concept": "A Small Data Report is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Word Frequency Report",
      "type": "build-program",
      "instructions": "Build a word frequency report: read words from stdin, count them with Counter, and print the top 3 words as 'word: count' lines in most-common order.",
      "starterCode": "import sys\nfrom collections import Counter\n\n# TODO: read words, Counter, print top 3 as 'word: count' lines\n",
      "solution": "import sys\nfrom collections import Counter\n\nwords = sys.stdin.read().split()\nfor word, count in Counter(words).most_common(3):\n    print(f\"{word}: {count}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "apple: 3\nbanana: 2\ncherry: 1",
          "hidden": false,
          "stdin": "apple banana apple cherry apple banana"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "one: 3\ntwo: 2\nthree: 1",
          "hidden": true,
          "stdin": "one two one three two one"
        }
      ],
      "hintNotes": {
        "concept": "Word Frequency Report is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Word Frequency Report Capstone Project",
      "description": "A small end-to-end data program that reports the most frequent words in a text.",
      "requirements": [
        "Count words with collections.Counter.",
        "Apply at least three of these skills: collections.Counter, defaultdict, itertools, heapq.",
        "Print exactly the top 3 words in most-common order.",
        "Print each line in the format 'word: count'."
      ],
      "rubric": [
        "Program runs and reports the correct top 3 words.",
        "Code is clear, well-named, and organised into functions.",
        "Ties are handled by Counter's stable most-common order.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-http-apis",
    "slug": "py-http-apis",
    "language": "python",
    "category": "languages",
    "title": "Web APIs with urllib and http.server",
    "description": "Learn to talk to web APIs and build tiny ones with only the standard library: urllib requests, JSON payloads, query strings, error handling, and a small http.server that serves JSON.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "urllib.request",
      "urllib.parse",
      "JSON over HTTP",
      "HTTP error handling",
      "Query strings",
      "http.server",
      "Request routing",
      "POST requests"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to order food by phone: you ask in the right format, the kitchen replies, and you check the order before eating.",
    "modules": [
      {
        "id": "py-http-apis-m1",
        "title": "Fundamentals of Web APIs with urllib and http.server",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-http-apis-m1-l1",
            "slug": "py-http-apis-m1-l1",
            "title": "What a Web API Is",
            "concept": "A web API is a server that answers HTTP requests with data, usually JSON, instead of web pages. A client sends a request to a URL and reads the response, which is the same pattern behind almost every app that talks to the internet.",
            "syntax": "urllib.request.urlopen(url)",
            "exampleCode": "import urllib.request\n\nwith urllib.request.urlopen(\"data:text/plain,hello%20api\") as r:\n    print(r.read().decode())\n",
            "exampleLanguage": "python",
            "mistake": "Treating an API response as plain text without checking its content type or parsing it.",
            "bug": {
              "prompt": "The code below should fetch the text 'hello api' from a data URL and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import urllib.request\n\nwith urllib.request.urlopen(\"data:text/plain,hello%20api\") as r:\n    print(r.read())\n",
              "fixedCode": "import urllib.request\n\nwith urllib.request.urlopen(\"data:text/plain,hello%20api\") as r:\n    print(r.read().decode())\n",
              "explanation": "Reading the raw bytes prints b'hello api' with the bytes marker instead of the plain text."
            },
            "exercise": {
              "title": "Practise What a Web API Is",
              "type": "write-code",
              "instructions": "Use urllib to open the data URL 'data:text/plain,hello' and print the decoded text.",
              "starterCode": "import urllib.request\n\n# TODO: urlopen the data URL, read, decode, print\n",
              "solution": "import urllib.request\n\nwith urllib.request.urlopen(\"data:text/plain,hello\") as r:\n    print(r.read().decode())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "hello",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "hello",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "What a Web API Is is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-http-apis-m1-l2",
            "slug": "py-http-apis-m1-l2",
            "title": "Fetching JSON with urllib",
            "concept": "Fetching JSON means opening a URL, reading the bytes, decoding them, and parsing with json.loads. The steps are small, but skipping the decode or the parse is a common source of confusing errors.",
            "syntax": "json.loads(response.read().decode())",
            "exampleCode": "import json, urllib.request\n\nwith urllib.request.urlopen(\"data:application/json,%7B%22a%22%3A%201%7D\") as r:\n    data = json.loads(r.read().decode())\nprint(data[\"a\"])\n",
            "exampleLanguage": "python",
            "mistake": "Passing the raw bytes straight to json.loads without decoding them first.",
            "bug": {
              "prompt": "The code below should fetch a JSON object from a data URL and print the value of 'a', but it gives the wrong result. What is the bug?",
              "buggyCode": "import json, urllib.request\n\nwith urllib.request.urlopen(\"data:application/json,%7B%22a%22%3A%201%7D\") as r:\n    data = r.read().decode()\nprint(data[\"a\"])\n",
              "fixedCode": "import json, urllib.request\n\nwith urllib.request.urlopen(\"data:application/json,%7B%22a%22%3A%201%7D\") as r:\n    data = json.loads(r.read().decode())\nprint(data[\"a\"])\n",
              "explanation": "Skipping json.loads leaves data as a plain string, so indexing it with 'a' raises TypeError instead of returning 1."
            },
            "exercise": {
              "title": "Practise Fetching JSON with urllib",
              "type": "write-code",
              "instructions": "Fetch the JSON data URL 'data:application/json,%7B%22score%22%3A%2099%7D' with urllib, parse it, and print the score.",
              "starterCode": "import json, urllib.request\n\n# TODO: urlopen the data URL, parse JSON, print data['score']\n",
              "solution": "import json, urllib.request\n\nwith urllib.request.urlopen(\"data:application/json,%7B%22score%22%3A%2099%7D\") as r:\n    data = json.loads(r.read().decode())\nprint(data[\"score\"])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "99",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "99",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Fetching JSON with urllib is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-http-apis-m1-l3",
            "slug": "py-http-apis-m1-l3",
            "title": "Handling HTTP Errors",
            "concept": "A failed request raises urllib.error.HTTPError, which carries the status code, so a client can tell a missing page from a server crash. Catching the error and reading its code is what separates a robust client from a crashing one.",
            "syntax": "except urllib.error.HTTPError as e:\n    print(e.code)",
            "exampleCode": "import urllib.request, urllib.error\n\ntry:\n    urllib.request.urlopen(\"http://127.0.0.1:1/nope\")\nexcept urllib.error.URLError as e:\n    print(\"failed:\", type(e).__name__)\n",
            "exampleLanguage": "python",
            "mistake": "Catching a broad Exception and hiding the status code that explains what went wrong.",
            "bug": {
              "prompt": "The code below should try to open an unreachable address and print 'failed: URLError', but it gives the wrong result. What is the bug?",
              "buggyCode": "import urllib.request, urllib.error\n\ntry:\n    urllib.request.urlopen(\"http://127.0.0.1:1/nope\")\nexcept Exception:\n    print(\"failed: URLError\")\n",
              "fixedCode": "import urllib.request, urllib.error\n\ntry:\n    urllib.request.urlopen(\"http://127.0.0.1:1/nope\")\nexcept urllib.error.URLError as e:\n    print(\"failed:\", type(e).__name__)\n",
              "explanation": "Catching bare Exception hides the real error type, so the program cannot tell a refused connection from a bad URL."
            },
            "exercise": {
              "title": "Check your understanding of Handling HTTP Errors",
              "type": "multiple-choice",
              "instructions": "Which statement about Handling HTTP Errors is correct?",
              "starterCode": "",
              "solution": "A failed request raises urllib.",
              "solutionExplanation": "A failed request raises urllib. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A failed request raises urllib.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Handling HTTP Errors actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A failed request raises urllib.",
                "Handling HTTP Errors can only be used once in a program",
                "Handling HTTP Errors requires a separate paid licence to use",
                "Handling HTTP Errors only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-http-apis-m1-l4",
            "slug": "py-http-apis-m1-l4",
            "title": "Query Strings and Encoding",
            "concept": "A query string carries parameters after the ? in a URL, and urllib.parse.urlencode builds it safely by escaping spaces and special characters. Hand-built query strings break the moment a value contains an & or a space.",
            "syntax": "urllib.parse.urlencode({\"q\": \"hello world\"})",
            "exampleCode": "import urllib.parse\n\nprint(urllib.parse.urlencode({\"q\": \"hello world\", \"page\": 2}))\n",
            "exampleLanguage": "python",
            "mistake": "Building query strings by concatenating raw values without encoding them.",
            "bug": {
              "prompt": "The code below should encode q='hello world' and page=2 into a query string and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import urllib.parse\n\nprint(\"q=hello world&page=2\")\n",
              "fixedCode": "import urllib.parse\n\nprint(urllib.parse.urlencode({\"q\": \"hello world\", \"page\": 2}))\n",
              "explanation": "The raw string leaves the space unencoded, which produces an invalid URL that servers may reject or misread."
            },
            "exercise": {
              "title": "Practise Query Strings and Encoding",
              "type": "write-code",
              "instructions": "Read a search word from stdin, urlencode {'q': word, 'page': 1}, and print the query string.",
              "starterCode": "import sys, urllib.parse\n\n# TODO: read word, print urlencode({'q': word, 'page': 1})\n",
              "solution": "import sys, urllib.parse\n\nword = sys.stdin.read().strip()\nprint(urllib.parse.urlencode({\"q\": word, \"page\": 1}))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "q=hello+world&page=1",
                  "hidden": false,
                  "stdin": "hello world"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "q=cats&page=1",
                  "hidden": true,
                  "stdin": "cats"
                }
              ],
              "hintNotes": {
                "concept": "Query Strings and Encoding is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-http-apis-m1-l5",
            "slug": "py-http-apis-m1-l5",
            "title": "Posting Data",
            "concept": "Posting data sends a request with a body, usually JSON, and the right Content-Type header so the server knows how to read it. A POST without the header often fails because the server treats the body as form data.",
            "syntax": "req = urllib.request.Request(url, data=body, headers={\"Content-Type\": \"application/json\"})",
            "exampleCode": "import json, urllib.request\n\nbody = json.dumps({\"name\": \"ada\"}).encode()\nreq = urllib.request.Request(\"data:application/json,{}\", data=body, method=\"POST\")\nprint(req.get_method(), req.get_header(\"Content-type\"))\n",
            "exampleLanguage": "python",
            "mistake": "Sending a POST body as a plain string instead of bytes.",
            "bug": {
              "prompt": "The code below should build a POST request with a JSON body and print its method and content type, but it gives the wrong result. What is the bug?",
              "buggyCode": "import json, urllib.request\n\nbody = json.dumps({\"name\": \"ada\"})\nreq = urllib.request.Request(\"data:application/json,{}\", data=body, method=\"POST\")\nprint(req.get_method(), req.get_header(\"Content-type\"))\n",
              "fixedCode": "import json, urllib.request\n\nbody = json.dumps({\"name\": \"ada\"}).encode()\nreq = urllib.request.Request(\"data:application/json,{}\", data=body, method=\"POST\")\nprint(req.get_method(), req.get_header(\"Content-type\"))\n",
              "explanation": "Passing a str as data raises TypeError, because urllib needs bytes for the request body."
            },
            "exercise": {
              "title": "Check your understanding of Posting Data",
              "type": "multiple-choice",
              "instructions": "Which statement about Posting Data is correct?",
              "starterCode": "",
              "solution": "Posting data sends a request with a body, usually JSON, and the right Content-Type header so the server knows how to read it.",
              "solutionExplanation": "Posting data sends a request with a body, usually JSON, and the right Content-Type header so the server knows how to read it. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Posting data sends a request with a body, usually JSON, and the right Content-Type header so the server knows how to read it.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Posting Data actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Posting data sends a request with a body, usually JSON, and the right Content-Type header so the server knows how to read it.",
                "Posting Data can only be used once in a program",
                "Posting Data requires a separate paid licence to use",
                "Posting Data only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-http-apis-m2",
        "title": "Web APIs with urllib and http.server in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-http-apis-m2-l1",
            "slug": "py-http-apis-m2-l1",
            "title": "Building a Handler with http.server",
            "concept": "http.server turns a handler class into a working web server: each request calls do_GET or do_POST, which writes a status, headers, and a body. A few lines of handler code are enough to serve real JSON.",
            "syntax": "class Handler(BaseHTTPRequestHandler):\n    def do_GET(self): ...",
            "exampleCode": "from http.server import BaseHTTPRequestHandler\n\nclass Handler(BaseHTTPRequestHandler):\n    def do_GET(self):\n        self.send_response(200)\n        self.end_headers()\n        self.wfile.write(b\"hi\")\n    def log_message(self, *a):\n        pass\n\nprint(Handler.do_GET.__name__)\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to call end_headers before writing the body, which leaves the client hanging.",
            "bug": {
              "prompt": "The code below should define a handler with a do_GET method and print the method name, but it gives the wrong result. What is the bug?",
              "buggyCode": "from http.server import BaseHTTPRequestHandler\n\nclass Handler(BaseHTTPRequestHandler):\n    def do_GET(self):\n        self.wfile.write(b\"hi\")\n    def log_message(self, *a):\n        pass\n\nprint(Handler.do_GET.__name__)\n",
              "fixedCode": "from http.server import BaseHTTPRequestHandler\n\nclass Handler(BaseHTTPRequestHandler):\n    def do_GET(self):\n        self.send_response(200)\n        self.end_headers()\n        self.wfile.write(b\"hi\")\n    def log_message(self, *a):\n        pass\n\nprint(Handler.do_GET.__name__)\n",
              "explanation": "Writing the body without send_response and end_headers sends bytes before the headers, so a real client cannot parse the response."
            },
            "exercise": {
              "title": "Practise Building a Handler with http.server",
              "type": "write-code",
              "instructions": "Start a tiny JSON server that answers {'status': 'ok'} on any GET, fetch it with urllib, and print the status value.",
              "starterCode": "import json, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\nclass H(BaseHTTPRequestHandler):\n    # TODO: do_GET sends 200 + JSON {'status': 'ok'} with correct headers\n    def log_message(self, *a):\n        pass\n\n# TODO: serve on port 0 in a daemon thread, fetch, print status, shutdown\n",
              "solution": "import json, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\nclass H(BaseHTTPRequestHandler):\n    def do_GET(self):\n        body = json.dumps({\"status\": \"ok\"}).encode()\n        self.send_response(200)\n        self.send_header(\"Content-Type\", \"application/json\")\n        self.send_header(\"Content-Length\", str(len(body)))\n        self.end_headers()\n        self.wfile.write(body)\n    def log_message(self, *a):\n        pass\n\ns = ThreadingHTTPServer((\"127.0.0.1\", 0), H)\nthreading.Thread(target=s.serve_forever, daemon=True).start()\nprint(json.loads(urllib.request.urlopen(f\"http://127.0.0.1:{s.server_address[1]}/\").read())[\"status\"])\ns.shutdown()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ok",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "ok",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Building a Handler with http.server is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-http-apis-m2-l2",
            "slug": "py-http-apis-m2-l2",
            "title": "Routing Requests",
            "concept": "Routing means looking at the request path and choosing what to return for each one, with a 404 for anything unknown. A small dict that maps paths to handler functions is all the routing a tiny API needs.",
            "syntax": "routes = {\"/\": home, \"/items\": list_items}",
            "exampleCode": "from urllib.parse import urlparse\n\nroutes = {\"/\": \"home\", \"/items\": \"items\"}\npath = urlparse(\"http://x/items?page=2\").path\nprint(routes.get(path, \"404\"))\n",
            "exampleLanguage": "python",
            "mistake": "Matching routes with startswith, which makes /items match /items-extra by accident.",
            "bug": {
              "prompt": "The code below should look up the path of a URL in a routes dict and print the matched name or '404', but it gives the wrong result. What is the bug?",
              "buggyCode": "from urllib.parse import urlparse\n\nroutes = {\"/\": \"home\", \"/items\": \"items\"}\npath = urlparse(\"http://x/items-extra\").path\nprint(routes.get(path, \"404\"))\n",
              "fixedCode": "from urllib.parse import urlparse\n\nroutes = {\"/\": \"home\", \"/items\": \"items\"}\npath = urlparse(\"http://x/items?page=2\").path\nprint(routes.get(path, \"404\"))\n",
              "explanation": "The path /items-extra is not in the routes, so a correct lookup returns 404 instead of matching /items."
            },
            "exercise": {
              "title": "Practise Routing Requests",
              "type": "write-code",
              "instructions": "Read a URL path from stdin, look it up in {'/': 'home', '/items': 'items'}, and print the matched name or '404'.",
              "starterCode": "import sys\n\nroutes = {\"/\": \"home\", \"/items\": \"items\"}\n# TODO: read path, print routes.get(path, '404')\n",
              "solution": "import sys\n\nroutes = {\"/\": \"home\", \"/items\": \"items\"}\npath = sys.stdin.read().strip()\nprint(routes.get(path, \"404\"))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "items",
                  "hidden": false,
                  "stdin": "/items"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "404",
                  "hidden": true,
                  "stdin": "/nope"
                }
              ],
              "hintNotes": {
                "concept": "Routing Requests is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-http-apis-m2-l3",
            "slug": "py-http-apis-m2-l3",
            "title": "JSON Responses",
            "concept": "A JSON response is a dict dumped with json.dumps, sent with a Content-Type of application/json and a correct Content-Length. Clients rely on the header to know the body is JSON and on the length to know where it ends.",
            "syntax": "self.send_header(\"Content-Type\", \"application/json\")",
            "exampleCode": "import json\n\nbody = json.dumps({\"ok\": True}).encode()\nprint(len(body), body.decode())\n",
            "exampleLanguage": "python",
            "mistake": "Sending JSON without the application/json content type, so clients treat it as plain text.",
            "bug": {
              "prompt": "The code below should dump {'ok': True} to JSON bytes and print the length and the decoded text, but it gives the wrong result. What is the bug?",
              "buggyCode": "import json\n\nbody = json.dumps({\"ok\": True})\nprint(len(body), body)\n",
              "fixedCode": "import json\n\nbody = json.dumps({\"ok\": True}).encode()\nprint(len(body), body.decode())\n",
              "explanation": "Without .encode the body is a str, so its length counts characters and the printed value is the string itself rather than bytes."
            },
            "exercise": {
              "title": "Check your understanding of JSON Responses",
              "type": "multiple-choice",
              "instructions": "Which statement about JSON Responses is correct?",
              "starterCode": "",
              "solution": "A JSON response is a dict dumped with json.",
              "solutionExplanation": "A JSON response is a dict dumped with json. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A JSON response is a dict dumped with json.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what JSON Responses actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A JSON response is a dict dumped with json.",
                "JSON Responses can only be used once in a program",
                "JSON Responses requires a separate paid licence to use",
                "JSON Responses only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-http-apis-m2-l4",
            "slug": "py-http-apis-m2-l4",
            "title": "Headers and Content Types",
            "concept": "HTTP headers are the metadata of a request or response: Content-Type says what the body is, and Content-Length says how big it is. A server that forgets Content-Length can leave the client waiting for more data.",
            "syntax": "self.send_header(\"Content-Length\", str(len(body)))",
            "exampleCode": "from http.server import BaseHTTPRequestHandler\n\nprint(BaseHTTPRequestHandler.responses[200][0])\n",
            "exampleLanguage": "python",
            "mistake": "Setting Content-Length to the character count of a string instead of the byte count of the encoded body.",
            "bug": {
              "prompt": "The code below should print the standard reason phrase for status 200, but it gives the wrong result. What is the bug?",
              "buggyCode": "from http.server import BaseHTTPRequestHandler\n\nprint(BaseHTTPRequestHandler.responses[404][0])\n",
              "fixedCode": "from http.server import BaseHTTPRequestHandler\n\nprint(BaseHTTPRequestHandler.responses[200][0])\n",
              "explanation": "Looking up 404 prints 'Not Found' instead of the 'OK' for status 200."
            },
            "exercise": {
              "title": "Practise Headers and Content Types",
              "type": "write-code",
              "instructions": "Read an HTTP status code from stdin and print its standard reason phrase.",
              "starterCode": "import sys\nfrom http.server import BaseHTTPRequestHandler\n\n# TODO: read code, print BaseHTTPRequestHandler.responses[code][0]\n",
              "solution": "import sys\nfrom http.server import BaseHTTPRequestHandler\n\ncode = int(sys.stdin.read().strip())\nprint(BaseHTTPRequestHandler.responses[code][0])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "OK",
                  "hidden": false,
                  "stdin": "200"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "Not Found",
                  "hidden": true,
                  "stdin": "404"
                }
              ],
              "hintNotes": {
                "concept": "Headers and Content Types is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-http-apis-m2-l5",
            "slug": "py-http-apis-m2-l5",
            "title": "A Tiny JSON API Server",
            "concept": "A tiny JSON API server combines everything in this track: a handler, routing, JSON responses, and a client that fetches from it. Running the server in a thread and fetching with urllib proves the whole loop works in one program.",
            "syntax": "server = ThreadingHTTPServer((\"127.0.0.1\", 0), Handler)",
            "exampleCode": "import json, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\nclass H(BaseHTTPRequestHandler):\n    def do_GET(self):\n        body = json.dumps({\"status\": \"ok\"}).encode()\n        self.send_response(200)\n        self.send_header(\"Content-Type\", \"application/json\")\n        self.send_header(\"Content-Length\", str(len(body)))\n        self.end_headers()\n        self.wfile.write(body)\n    def log_message(self, *a):\n        pass\n\ns = ThreadingHTTPServer((\"127.0.0.1\", 0), H)\nthreading.Thread(target=s.serve_forever, daemon=True).start()\nprint(json.loads(urllib.request.urlopen(f\"http://127.0.0.1:{s.server_address[1]}/\").read())[\"status\"])\ns.shutdown()\n",
            "exampleLanguage": "python",
            "mistake": "Binding the server to a fixed port that may already be in use instead of port 0.",
            "bug": {
              "prompt": "The code below should start a tiny JSON server on an ephemeral port, fetch its status, and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import json, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\nclass H(BaseHTTPRequestHandler):\n    def do_GET(self):\n        body = json.dumps({\"status\": \"ok\"}).encode()\n        self.send_response(200)\n        self.send_header(\"Content-Type\", \"application/json\")\n        self.send_header(\"Content-Length\", str(len(body)))\n        self.end_headers()\n        self.wfile.write(body)\n    def log_message(self, *a):\n        pass\n\ns = ThreadingHTTPServer((\"127.0.0.1\", 8080), H)\nthreading.Thread(target=s.serve_forever, daemon=True).start()\nprint(json.loads(urllib.request.urlopen(\"http://127.0.0.1:8080/\").read())[\"status\"])\ns.shutdown()\n",
              "fixedCode": "import json, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\nclass H(BaseHTTPRequestHandler):\n    def do_GET(self):\n        body = json.dumps({\"status\": \"ok\"}).encode()\n        self.send_response(200)\n        self.send_header(\"Content-Type\", \"application/json\")\n        self.send_header(\"Content-Length\", str(len(body)))\n        self.end_headers()\n        self.wfile.write(body)\n    def log_message(self, *a):\n        pass\n\ns = ThreadingHTTPServer((\"127.0.0.1\", 0), H)\nthreading.Thread(target=s.serve_forever, daemon=True).start()\nprint(json.loads(urllib.request.urlopen(f\"http://127.0.0.1:{s.server_address[1]}/\").read())[\"status\"])\ns.shutdown()\n",
              "explanation": "A fixed port such as 8080 may already be taken, so the server fails to start; port 0 lets the system pick a free one."
            },
            "exercise": {
              "title": "Practise A Tiny JSON API Server",
              "type": "write-code",
              "instructions": "Start a tiny JSON server that answers {'status': 'ok'} on any GET, fetch it with urllib, and print the status value.",
              "starterCode": "import json, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\nclass H(BaseHTTPRequestHandler):\n    # TODO: do_GET sends 200 + JSON {'status': 'ok'} with correct headers\n    def log_message(self, *a):\n        pass\n\n# TODO: serve on port 0 in a daemon thread, fetch, print status, shutdown\n",
              "solution": "import json, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\nclass H(BaseHTTPRequestHandler):\n    def do_GET(self):\n        body = json.dumps({\"status\": \"ok\"}).encode()\n        self.send_response(200)\n        self.send_header(\"Content-Type\", \"application/json\")\n        self.send_header(\"Content-Length\", str(len(body)))\n        self.end_headers()\n        self.wfile.write(body)\n    def log_message(self, *a):\n        pass\n\ns = ThreadingHTTPServer((\"127.0.0.1\", 0), H)\nthreading.Thread(target=s.serve_forever, daemon=True).start()\nprint(json.loads(urllib.request.urlopen(f\"http://127.0.0.1:{s.server_address[1]}/\").read())[\"status\"])\ns.shutdown()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ok",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "ok",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "A Tiny JSON API Server is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Tiny Items API",
      "type": "build-program",
      "instructions": "Build a tiny items API: start a JSON server on an ephemeral port with routes '/items' (a JSON list read from stdin, one item per line) and anything else 404. Fetch '/items' with urllib and print the items joined by commas.",
      "starterCode": "import json, sys, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\n# TODO: handler serves ITEMS as JSON on /items and 404 elsewhere; fetch /items and print comma-joined items\n",
      "solution": "import json, sys, threading, urllib.request\nfrom http.server import BaseHTTPRequestHandler, ThreadingHTTPServer\n\nITEMS = sys.stdin.read().split()\n\nclass H(BaseHTTPRequestHandler):\n    def do_GET(self):\n        if self.path == \"/items\":\n            body = json.dumps(ITEMS).encode()\n            self.send_response(200)\n        else:\n            body = json.dumps({\"error\": \"not found\"}).encode()\n            self.send_response(404)\n        self.send_header(\"Content-Type\", \"application/json\")\n        self.send_header(\"Content-Length\", str(len(body)))\n        self.end_headers()\n        self.wfile.write(body)\n    def log_message(self, *a):\n        pass\n\ns = ThreadingHTTPServer((\"127.0.0.1\", 0), H)\nthreading.Thread(target=s.serve_forever, daemon=True).start()\nitems = json.loads(urllib.request.urlopen(f\"http://127.0.0.1:{s.server_address[1]}/items\").read())\ns.shutdown()\nprint(\",\".join(items))\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "apple,banana,cherry",
          "hidden": false,
          "stdin": "apple banana cherry"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "red,blue",
          "hidden": true,
          "stdin": "red blue"
        }
      ],
      "hintNotes": {
        "concept": "Tiny Items API is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Tiny Items API Capstone Project",
      "description": "A small end-to-end API program: a JSON server with routing and a urllib client that reads from it.",
      "requirements": [
        "Serve the items as JSON on the '/items' route.",
        "Apply at least three of these skills: urllib.request, http.server, Request routing, JSON over HTTP.",
        "Return 404 with a JSON error body for unknown paths.",
        "Fetch the items with urllib and print them comma-joined."
      ],
      "rubric": [
        "Program runs and prints the items fetched from its own server.",
        "Code is clear, well-named, and organised into functions.",
        "Unknown paths return a 404 JSON error.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-automation",
    "slug": "py-automation",
    "language": "python",
    "category": "languages",
    "title": "Automation and Scripting",
    "description": "Learn to automate everyday computer chores with Python scripts: command-line arguments, walking directories, bulk renaming, text search, backups, log parsing, and environment settings.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "sys.argv",
      "os.walk",
      "Bulk renaming",
      "Text search",
      "Environment variables",
      "shutil backups",
      "Log parsing",
      "Scheduling concepts"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to hire a tireless assistant: teach the computer once, and it does the boring job forever.",
    "modules": [
      {
        "id": "py-automation-m1",
        "title": "Fundamentals of Automation and Scripting",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-automation-m1-l1",
            "slug": "py-automation-m1-l1",
            "title": "Scripts vs Programs",
            "concept": "A script is a small program written to do one job right now, while a larger program is built to last and to be reused. Automation scripts favour clarity and a fast edit-run cycle over architecture.",
            "syntax": "if __name__ == \"__main__\":\n    main()",
            "exampleCode": "def main():\n    print(\"script ran\")\n\nif __name__ == \"__main__\":\n    main()\n",
            "exampleLanguage": "python",
            "mistake": "Writing a script with no main function, so importing it runs everything at once.",
            "bug": {
              "prompt": "The code below should run a script with a main() guard and print 'script ran', but it gives the wrong result. What is the bug?",
              "buggyCode": "print(\"script ran\")\n",
              "fixedCode": "def main():\n    print(\"script ran\")\n\nif __name__ == \"__main__\":\n    main()\n",
              "explanation": "A bare print at module level runs on import too, so another program importing this script would print 'script ran' by accident."
            },
            "exercise": {
              "title": "Practise Scripts vs Programs",
              "type": "write-code",
              "instructions": "Write a script with a main() function guarded by __name__ == '__main__' that prints 'script ran'.",
              "starterCode": "def main():\n    # TODO: print 'script ran'\n    pass\n\n# TODO: call main() under the __name__ guard\n",
              "solution": "def main():\n    print(\"script ran\")\n\nif __name__ == \"__main__\":\n    main()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "script ran",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "script ran",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Scripts vs Programs is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-automation-m1-l2",
            "slug": "py-automation-m1-l2",
            "title": "Reading Arguments from sys.argv",
            "concept": "sys.argv holds the command-line words that started the program, with argv[0] as the script name and the rest as arguments. Scripts read their inputs from argv instead of hard-coding values.",
            "syntax": "args = sys.argv[1:]",
            "exampleCode": "import sys\n\nprint(sys.argv[1:])\n",
            "exampleLanguage": "python",
            "mistake": "Reading sys.argv[0] as if it were the first real argument instead of the script name.",
            "bug": {
              "prompt": "The code below should print the arguments after the script name, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sys\n\nprint(sys.argv[0])\n",
              "fixedCode": "import sys\n\nprint(sys.argv[1:])\n",
              "explanation": "argv[0] is the script name, so printing it shows the program name instead of the arguments."
            },
            "exercise": {
              "title": "Practise Reading Arguments from sys.argv",
              "type": "write-code",
              "instructions": "Read space-separated words from stdin as simulated arguments and print them as a list.",
              "starterCode": "import sys\n\n# TODO: read stdin, split into args, print the list\n",
              "solution": "import sys\n\nargs = sys.stdin.read().split()\nprint(args)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['alpha', 'beta']",
                  "hidden": false,
                  "stdin": "alpha beta"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['one', 'two', 'three']",
                  "hidden": true,
                  "stdin": "one two three"
                }
              ],
              "hintNotes": {
                "concept": "Reading Arguments from sys.argv is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-automation-m1-l3",
            "slug": "py-automation-m1-l3",
            "title": "Walking Directory Trees",
            "concept": "os.walk visits every directory in a tree, yielding the path, the subdirectories, and the files at each level. It is the standard way to find files recursively without writing the recursion by hand.",
            "syntax": "for root, dirs, files in os.walk(path):",
            "exampleCode": "import os, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    (Path(d) / \"a.txt\").write_text(\"x\")\n    (Path(d) / \"b.txt\").write_text(\"y\")\n    found = sorted(f for _, _, files in os.walk(d) for f in files)\n    print(found)\n",
            "exampleLanguage": "python",
            "mistake": "Using os.listdir on one directory and missing all the files in subdirectories.",
            "bug": {
              "prompt": "The code below should walk a temp directory with two files and print the sorted file names, but it gives the wrong result. What is the bug?",
              "buggyCode": "import os, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    (Path(d) / \"a.txt\").write_text(\"x\")\n    (Path(d) / \"b.txt\").write_text(\"y\")\n    print(sorted(os.listdir(d)))\n",
              "fixedCode": "import os, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    (Path(d) / \"a.txt\").write_text(\"x\")\n    (Path(d) / \"b.txt\").write_text(\"y\")\n    found = sorted(f for _, _, files in os.walk(d) for f in files)\n    print(found)\n",
              "explanation": "listdir only sees the top level, so files hidden in subdirectories are missed entirely."
            },
            "exercise": {
              "title": "Check your understanding of Walking Directory Trees",
              "type": "multiple-choice",
              "instructions": "Which statement about Walking Directory Trees is correct?",
              "starterCode": "",
              "solution": "os.",
              "solutionExplanation": "os. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "os.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Walking Directory Trees actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "os.",
                "Walking Directory Trees can only be used once in a program",
                "Walking Directory Trees requires a separate paid licence to use",
                "Walking Directory Trees only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-automation-m1-l4",
            "slug": "py-automation-m1-l4",
            "title": "Renaming Files in Bulk",
            "concept": "Bulk renaming loops over files, builds each new name from the old one, and renames with os.rename or Path.rename. Building the new names first and renaming second avoids renaming a file twice.",
            "syntax": "Path(old).rename(new)",
            "exampleCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"old.txt\"\n    p.write_text(\"x\")\n    p.rename(Path(d) / \"new.txt\")\n    print(sorted(x.name for x in Path(d).iterdir()))\n",
            "exampleLanguage": "python",
            "mistake": "Renaming files while iterating over the same directory listing, which can rename a file twice.",
            "bug": {
              "prompt": "The code below should rename old.txt to new.txt in a temp directory and print the file names, but it gives the wrong result. What is the bug?",
              "buggyCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"old.txt\"\n    p.write_text(\"x\")\n    p.rename(Path(d) / \"old.txt\")\n    print(sorted(x.name for x in Path(d).iterdir()))\n",
              "fixedCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"old.txt\"\n    p.write_text(\"x\")\n    p.rename(Path(d) / \"new.txt\")\n    print(sorted(x.name for x in Path(d).iterdir()))\n",
              "explanation": "Renaming a file to its own name changes nothing, so the listing still shows old.txt."
            },
            "exercise": {
              "title": "Practise Renaming Files in Bulk",
              "type": "write-code",
              "instructions": "Read file names from stdin, create them in a temp directory, rename each by adding '.bak', and print the sorted new names.",
              "starterCode": "import sys, tempfile\nfrom pathlib import Path\n\n# TODO: create stdin names in a temp dir, rename each to name + '.bak', print sorted names\n",
              "solution": "import sys, tempfile\nfrom pathlib import Path\n\nnames = sys.stdin.read().split()\nwith tempfile.TemporaryDirectory() as d:\n    for name in names:\n        (Path(d) / name).write_text(\"x\")\n    for name in names:\n        (Path(d) / name).rename(Path(d) / (name + \".bak\"))\n    print(sorted(x.name for x in Path(d).iterdir()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['a.txt.bak', 'b.txt.bak']",
                  "hidden": false,
                  "stdin": "a.txt b.txt"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['x.log.bak']",
                  "hidden": true,
                  "stdin": "x.log"
                }
              ],
              "hintNotes": {
                "concept": "Renaming Files in Bulk is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-automation-m1-l5",
            "slug": "py-automation-m1-l5",
            "title": "Searching Text in Files",
            "concept": "Searching text in files means opening each file, reading it line by line, and keeping the lines that contain the search term. Line-by-line reading keeps memory low even on huge files.",
            "syntax": "if needle in line:\n    print(line)",
            "exampleCode": "import io\n\ntext = \"first line\\nerror: boom\\nlast line\\n\"\nprint([l for l in io.StringIO(text) if \"error\" in l])\n",
            "exampleLanguage": "python",
            "mistake": "Reading a whole file into memory with read() when a line-by-line loop would do.",
            "bug": {
              "prompt": "The code below should find the lines containing 'error' and print them as a list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import io\n\ntext = \"first line\\nerror: boom\\nlast line\\n\"\nprint([l for l in io.StringIO(text) if \"Error\" in l])\n",
              "fixedCode": "import io\n\ntext = \"first line\\nerror: boom\\nlast line\\n\"\nprint([l for l in io.StringIO(text) if \"error\" in l])\n",
              "explanation": "Matching 'Error' with a capital E finds nothing, because the log line uses lowercase 'error'."
            },
            "exercise": {
              "title": "Check your understanding of Searching Text in Files",
              "type": "multiple-choice",
              "instructions": "Which statement about Searching Text in Files is correct?",
              "starterCode": "",
              "solution": "Searching text in files means opening each file, reading it line by line, and keeping the lines that contain the search term.",
              "solutionExplanation": "Searching text in files means opening each file, reading it line by line, and keeping the lines that contain the search term. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Searching text in files means opening each file, reading it line by line, and keeping the lines that contain the search term.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Searching Text in Files actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Searching text in files means opening each file, reading it line by line, and keeping the lines that contain the search term.",
                "Searching Text in Files can only be used once in a program",
                "Searching Text in Files requires a separate paid licence to use",
                "Searching Text in Files only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-automation-m2",
        "title": "Automation and Scripting in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-automation-m2-l1",
            "slug": "py-automation-m2-l1",
            "title": "Scheduling Concepts",
            "concept": "Scheduling a script means running it automatically at set times, using cron on Linux or Task Scheduler on Windows. The script itself stays simple; the scheduler decides when it runs.",
            "syntax": "0 9 * * * python3 report.py",
            "exampleCode": "from datetime import datetime, timedelta\n\nnow = datetime(2026, 11, 24, 9, 0)\nprint(now + timedelta(days=1))\n",
            "exampleLanguage": "python",
            "mistake": "Scheduling a script that depends on the current working directory instead of using absolute paths.",
            "bug": {
              "prompt": "The code below should add one day to 2026-11-24 09:00 and print the new datetime, but it gives the wrong result. What is the bug?",
              "buggyCode": "from datetime import datetime, timedelta\n\nnow = datetime(2026, 11, 24, 9, 0)\nprint(now + timedelta(hours=1))\n",
              "fixedCode": "from datetime import datetime, timedelta\n\nnow = datetime(2026, 11, 24, 9, 0)\nprint(now + timedelta(days=1))\n",
              "explanation": "Adding one hour gives 10:00 the same day instead of 09:00 the next day."
            },
            "exercise": {
              "title": "Practise Scheduling Concepts",
              "type": "write-code",
              "instructions": "Read a date 'YYYY-MM-DD' and a number of days from stdin (two lines), add the days, and print the new date in ISO format.",
              "starterCode": "import sys\nfrom datetime import date, timedelta\n\n# TODO: read date + days lines, add timedelta, print isoformat\n",
              "solution": "import sys\nfrom datetime import date, timedelta\n\nlines = sys.stdin.read().strip().splitlines()\ny, m, d = [int(x) for x in lines[0].split(\"-\")]\ndays = int(lines[1])\nprint((date(y, m, d) + timedelta(days=days)).isoformat())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "2026-12-01",
                  "hidden": false,
                  "stdin": "2026-11-24\n7"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2025-01-31",
                  "hidden": true,
                  "stdin": "2025-01-01\n30"
                }
              ],
              "hintNotes": {
                "concept": "Scheduling Concepts is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-automation-m2-l2",
            "slug": "py-automation-m2-l2",
            "title": "Working with Environment Variables",
            "concept": "Environment variables pass settings into a program from outside, so the same script can run in development and production with different values. os.environ.get reads a variable with a safe default when it is missing.",
            "syntax": "os.environ.get(\"API_KEY\", \"not set\")",
            "exampleCode": "import os\n\nprint(os.environ.get(\"MISSING_VAR_XYZ\", \"not set\"))\n",
            "exampleLanguage": "python",
            "mistake": "Reading a secret from the environment and printing it into a log file.",
            "bug": {
              "prompt": "The code below should print the value of a missing variable with the default 'not set', but it gives the wrong result. What is the bug?",
              "buggyCode": "import os\n\nprint(os.environ[\"MISSING_VAR_XYZ\"])\n",
              "fixedCode": "import os\n\nprint(os.environ.get(\"MISSING_VAR_XYZ\", \"not set\"))\n",
              "explanation": "Indexing a missing variable raises KeyError, while .get returns the default instead."
            },
            "exercise": {
              "title": "Practise Working with Environment Variables",
              "type": "write-code",
              "instructions": "Read a variable name from stdin and print its value from the environment, or 'not set' if it is missing.",
              "starterCode": "import os, sys\n\n# TODO: read name, print os.environ.get(name, 'not set')\n",
              "solution": "import os, sys\n\nname = sys.stdin.read().strip()\nprint(os.environ.get(name, \"not set\"))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "not set",
                  "hidden": false,
                  "stdin": "MISSING_VAR_XYZ"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "C.UTF-8",
                  "hidden": true,
                  "stdin": "LANG"
                }
              ],
              "hintNotes": {
                "concept": "Working with Environment Variables is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-automation-m2-l3",
            "slug": "py-automation-m2-l3",
            "title": "Backing Up Files",
            "concept": "Backing up a file means copying it to a safe place with shutil.copy2, which also copies the metadata. A backup script that overwrites its only backup is worse than no backup at all.",
            "syntax": "shutil.copy2(src, dst)",
            "exampleCode": "import shutil, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    src = Path(d) / \"data.txt\"\n    src.write_text(\"hello\")\n    dst = Path(d) / \"data.txt.bak\"\n    shutil.copy2(src, dst)\n    print(dst.read_text())\n",
            "exampleLanguage": "python",
            "mistake": "Copying a file onto itself and truncating it.",
            "bug": {
              "prompt": "The code below should copy data.txt to data.txt.bak in a temp directory and print the backup contents, but it gives the wrong result. What is the bug?",
              "buggyCode": "import shutil, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    src = Path(d) / \"data.txt\"\n    src.write_text(\"hello\")\n    shutil.copy2(src, src)\n    print(src.read_text())\n",
              "fixedCode": "import shutil, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    src = Path(d) / \"data.txt\"\n    src.write_text(\"hello\")\n    dst = Path(d) / \"data.txt.bak\"\n    shutil.copy2(src, dst)\n    print(dst.read_text())\n",
              "explanation": "Copying a file onto itself is a no-op at best and a data loss at worst; the backup must be a different path."
            },
            "exercise": {
              "title": "Check your understanding of Backing Up Files",
              "type": "multiple-choice",
              "instructions": "Which statement about Backing Up Files is correct?",
              "starterCode": "",
              "solution": "Backing up a file means copying it to a safe place with shutil.",
              "solutionExplanation": "Backing up a file means copying it to a safe place with shutil. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Backing up a file means copying it to a safe place with shutil.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Backing Up Files actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Backing up a file means copying it to a safe place with shutil.",
                "Backing Up Files can only be used once in a program",
                "Backing Up Files requires a separate paid licence to use",
                "Backing Up Files only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-automation-m2-l4",
            "slug": "py-automation-m2-l4",
            "title": "Parsing Log Lines",
            "concept": "Parsing log lines means splitting each line into its parts, such as the timestamp, the level, and the message, so the lines can be counted and filtered. Regular expressions or simple splits both work, depending on how regular the format is.",
            "syntax": "level = line.split()[2]",
            "exampleCode": "import io\n\ntext = \"2026-11-24 INFO started\\n2026-11-24 ERROR failed\\n\"\nlevels = [line.split()[1] for line in io.StringIO(text)]\nprint(levels)\n",
            "exampleLanguage": "python",
            "mistake": "Splitting a log line on spaces when the message itself contains spaces.",
            "bug": {
              "prompt": "The code below should extract the level (second field) from two log lines and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import io\n\ntext = \"2026-11-24 INFO started\\n2026-11-24 ERROR failed\\n\"\nlevels = [line.split()[0] for line in io.StringIO(text)]\nprint(levels)\n",
              "fixedCode": "import io\n\ntext = \"2026-11-24 INFO started\\n2026-11-24 ERROR failed\\n\"\nlevels = [line.split()[1] for line in io.StringIO(text)]\nprint(levels)\n",
              "explanation": "Field 0 is the date, not the level, so the result is two dates instead of ['INFO', 'ERROR']."
            },
            "exercise": {
              "title": "Practise Parsing Log Lines",
              "type": "write-code",
              "instructions": "Read log lines from stdin, count how many contain 'ERROR', and print 'errors: N'.",
              "starterCode": "import sys\n\n# TODO: read lines, count those containing 'ERROR', print 'errors: N'\n",
              "solution": "import sys\n\nlines = sys.stdin.read().splitlines()\nprint(f\"errors: {sum(1 for line in lines if 'ERROR' in line)}\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "errors: 2",
                  "hidden": false,
                  "stdin": "INFO ok\nERROR boom\nERROR again"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "errors: 0",
                  "hidden": true,
                  "stdin": "INFO ok\nINFO done"
                }
              ],
              "hintNotes": {
                "concept": "Parsing Log Lines is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-automation-m2-l5",
            "slug": "py-automation-m2-l5",
            "title": "An Automation Script Capstone",
            "concept": "A complete automation script combines the track's tools: it walks a directory, finds the files it cares about, and reports what it found. Small scripts like this are the everyday workhorses of real engineering teams.",
            "syntax": "for root, dirs, files in os.walk(\".\"):",
            "exampleCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    (Path(d) / \"a.log\").write_text(\"x\")\n    (Path(d) / \"b.txt\").write_text(\"y\")\n    logs = sorted(p.name for p in Path(d).glob(\"*.log\"))\n    print(logs)\n",
            "exampleLanguage": "python",
            "mistake": "Writing a script that only works in one directory instead of taking the directory as an argument.",
            "bug": {
              "prompt": "The code below should list the .log files in a temp directory and print them, but it gives the wrong result. What is the bug?",
              "buggyCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    (Path(d) / \"a.log\").write_text(\"x\")\n    (Path(d) / \"b.txt\").write_text(\"y\")\n    logs = sorted(p.name for p in Path(d).glob(\"*.txt\"))\n    print(logs)\n",
              "fixedCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    (Path(d) / \"a.log\").write_text(\"x\")\n    (Path(d) / \"b.txt\").write_text(\"y\")\n    logs = sorted(p.name for p in Path(d).glob(\"*.log\"))\n    print(logs)\n",
              "explanation": "Globbing for *.txt finds b.txt instead of the .log files the task asks for."
            },
            "exercise": {
              "title": "Practise An Automation Script Capstone",
              "type": "write-code",
              "instructions": "Read file names from stdin, create them in a temp directory, and print the sorted names of the ones ending in '.log'.",
              "starterCode": "import sys, tempfile\nfrom pathlib import Path\n\n# TODO: create stdin names in temp dir, print sorted .log names\n",
              "solution": "import sys, tempfile\nfrom pathlib import Path\n\nnames = sys.stdin.read().split()\nwith tempfile.TemporaryDirectory() as d:\n    for name in names:\n        (Path(d) / name).write_text(\"x\")\n    print(sorted(p.name for p in Path(d).glob(\"*.log\")))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['a.log', 'c.log']",
                  "hidden": false,
                  "stdin": "a.log b.txt c.log"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['y.log']",
                  "hidden": true,
                  "stdin": "x.txt y.log"
                }
              ],
              "hintNotes": {
                "concept": "An Automation Script Capstone is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Log Error Reporter",
      "type": "build-program",
      "instructions": "Build a log error reporter: read log lines from stdin, count lines containing 'ERROR' and lines containing 'WARN', and print 'errors: E warnings: W'.",
      "starterCode": "import sys\n\n# TODO: read lines, count ERROR and WARN lines, print 'errors: E warnings: W'\n",
      "solution": "import sys\n\nlines = sys.stdin.read().splitlines()\nerrors = sum(1 for line in lines if \"ERROR\" in line)\nwarnings = sum(1 for line in lines if \"WARN\" in line)\nprint(f\"errors: {errors} warnings: {warnings}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "errors: 2 warnings: 1",
          "hidden": false,
          "stdin": "INFO ok\nERROR boom\nWARN low\nERROR again"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "errors: 0 warnings: 1",
          "hidden": true,
          "stdin": "INFO ok\nWARN low"
        }
      ],
      "hintNotes": {
        "concept": "Log Error Reporter is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Log Error Reporter Capstone Project",
      "description": "A small end-to-end automation script that summarises errors and warnings in a log.",
      "requirements": [
        "Count lines containing 'ERROR' and lines containing 'WARN'.",
        "Apply at least three of these skills: Text search, Log parsing, sys.argv, Environment variables.",
        "Print the result in the exact format 'errors: E warnings: W'.",
        "Handle empty input by printing 'errors: 0 warnings: 0'."
      ],
      "rubric": [
        "Program runs and counts errors and warnings correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Empty input prints 'errors: 0 warnings: 0'.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-cli-argparse",
    "slug": "py-cli-argparse",
    "language": "python",
    "category": "languages",
    "title": "CLI Tools with argparse",
    "description": "Learn to build friendly command-line tools with argparse: positional and optional arguments, types, choices, defaults, subcommands, help text, and argument groups.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "argparse.ArgumentParser",
      "Positional arguments",
      "Optional arguments",
      "Argument types",
      "Choices",
      "Subcommands",
      "Help text",
      "Argument groups"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to design a good dashboard: the controls should be obvious before anyone reads the manual.",
    "modules": [
      {
        "id": "py-cli-argparse-m1",
        "title": "Fundamentals of CLI Tools with argparse",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-cli-argparse-m1-l1",
            "slug": "py-cli-argparse-m1-l1",
            "title": "Why CLIs Need Parsers",
            "concept": "A command-line tool needs a parser to turn raw words into named values with types and defaults. argparse does that work and writes the help text for free, which is why it is the standard choice for Python CLIs.",
            "syntax": "parser = argparse.ArgumentParser()",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser(description=\"Greet\")\nparser.add_argument(\"name\")\nprint(parser.parse_args([\"ada\"]).name)\n",
            "exampleLanguage": "python",
            "mistake": "Parsing sys.argv by hand with indexes, which breaks the moment an argument is optional.",
            "bug": {
              "prompt": "The code below should parse a positional name 'ada' and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser(description=\"Greet\")\nparser.add_argument(\"name\")\nprint(parser.parse_args([]).name)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser(description=\"Greet\")\nparser.add_argument(\"name\")\nprint(parser.parse_args([\"ada\"]).name)\n",
              "explanation": "Parsing an empty list leaves the required positional argument missing, so argparse exits with an error instead of printing a name."
            },
            "exercise": {
              "title": "Practise Why CLIs Need Parsers",
              "type": "write-code",
              "instructions": "Build a parser with a positional 'name', parse ['ada'], and print the name.",
              "starterCode": "import argparse\n\n# TODO: ArgumentParser, add 'name', parse ['ada'], print args.name\n",
              "solution": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"name\")\nprint(parser.parse_args([\"ada\"]).name)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ada",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "ada",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Why CLIs Need Parsers is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-cli-argparse-m1-l2",
            "slug": "py-cli-argparse-m1-l2",
            "title": "Positional Arguments",
            "concept": "A positional argument is a required value given by its position, such as a file name. Positionals are simple to use but cannot be skipped, so they suit values the tool always needs.",
            "syntax": "parser.add_argument(\"filename\")",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"filename\")\nparser.add_argument(\"count\", type=int)\nargs = parser.parse_args([\"data.txt\", \"3\"])\nprint(args.filename, args.count)\n",
            "exampleLanguage": "python",
            "mistake": "Making every value positional, which forces users to remember a long order.",
            "bug": {
              "prompt": "The code below should parse filename 'data.txt' and count 3 and print them, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"filename\")\nparser.add_argument(\"count\", type=int)\nargs = parser.parse_args([\"data.txt\", \"three\"])\nprint(args.filename, args.count)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"filename\")\nparser.add_argument(\"count\", type=int)\nargs = parser.parse_args([\"data.txt\", \"3\"])\nprint(args.filename, args.count)\n",
              "explanation": "Passing 'three' where an int is required makes argparse exit with an error instead of parsing."
            },
            "exercise": {
              "title": "Practise Positional Arguments",
              "type": "write-code",
              "instructions": "Read a file name and a count from stdin (two lines), parse them as positionals, and print them separated by a space.",
              "starterCode": "import argparse, sys\n\n# TODO: read name + count lines, parse as positionals, print both\n",
              "solution": "import argparse, sys\n\nlines = sys.stdin.read().strip().splitlines()\nparser = argparse.ArgumentParser()\nparser.add_argument(\"filename\")\nparser.add_argument(\"count\", type=int)\nargs = parser.parse_args([lines[0], lines[1]])\nprint(args.filename, args.count)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "data.txt 3",
                  "hidden": false,
                  "stdin": "data.txt\n3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "notes.txt 5",
                  "hidden": true,
                  "stdin": "notes.txt\n5"
                }
              ],
              "hintNotes": {
                "concept": "Positional Arguments is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-cli-argparse-m1-l3",
            "slug": "py-cli-argparse-m1-l3",
            "title": "Optional Arguments and Flags",
            "concept": "An optional argument starts with dashes, such as --verbose, and can be given or left out. Flags with action='store_true' switch a feature on, while options with a value carry settings.",
            "syntax": "parser.add_argument(\"--verbose\", action=\"store_true\")",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--verbose\", action=\"store_true\")\nprint(parser.parse_args([\"--verbose\"]).verbose)\nprint(parser.parse_args([]).verbose)\n",
            "exampleLanguage": "python",
            "mistake": "Making an option required when it has a sensible default, which annoys users.",
            "bug": {
              "prompt": "The code below should parse --verbose once and no flags once, printing True then False, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--verbose\", action=\"store_true\")\nprint(parser.parse_args([]).verbose)\nprint(parser.parse_args([\"--verbose\"]).verbose)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--verbose\", action=\"store_true\")\nprint(parser.parse_args([\"--verbose\"]).verbose)\nprint(parser.parse_args([]).verbose)\n",
              "explanation": "The two prints are in the wrong order, so the output is False then True instead of True then False."
            },
            "exercise": {
              "title": "Check your understanding of Optional Arguments and Flags",
              "type": "multiple-choice",
              "instructions": "Which statement about Optional Arguments and Flags is correct?",
              "starterCode": "",
              "solution": "An optional argument starts with dashes, such as --verbose, and can be given or left out.",
              "solutionExplanation": "An optional argument starts with dashes, such as --verbose, and can be given or left out. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An optional argument starts with dashes, such as --verbose, and can be given or left out.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Optional Arguments and Flags actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "An optional argument starts with dashes, such as --verbose, and can be given or left out.",
                "Optional Arguments and Flags can only be used once in a program",
                "Optional Arguments and Flags requires a separate paid licence to use",
                "Optional Arguments and Flags only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-cli-argparse-m1-l4",
            "slug": "py-cli-argparse-m1-l4",
            "title": "Argument Types and Choices",
            "concept": "The type argument converts a string to a number or another type, and choices limits a value to a fixed set of options. Both turn user mistakes into clear error messages instead of strange behaviour later.",
            "syntax": "parser.add_argument(\"--level\", choices=[\"low\", \"high\"])",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--level\", choices=[\"low\", \"high\"], default=\"low\")\nprint(parser.parse_args([\"--level\", \"high\"]).level)\n",
            "exampleLanguage": "python",
            "mistake": "Accepting any string for a value that only has three valid options.",
            "bug": {
              "prompt": "The code below should parse --level high from the choices low/high and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--level\", choices=[\"low\", \"high\"], default=\"low\")\nprint(parser.parse_args([\"--level\", \"medium\"]).level)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--level\", choices=[\"low\", \"high\"], default=\"low\")\nprint(parser.parse_args([\"--level\", \"high\"]).level)\n",
              "explanation": "'medium' is not one of the choices, so argparse exits with an error instead of printing a level."
            },
            "exercise": {
              "title": "Practise Argument Types and Choices",
              "type": "write-code",
              "instructions": "Read a level from stdin, parse it as --level with choices low/high, and print it.",
              "starterCode": "import argparse, sys\n\n# TODO: read level, parse ['--level', level] with choices, print it\n",
              "solution": "import argparse, sys\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--level\", choices=[\"low\", \"high\"], default=\"low\")\nlevel = sys.stdin.read().strip()\nprint(parser.parse_args([\"--level\", level]).level)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "high",
                  "hidden": false,
                  "stdin": "high"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "low",
                  "hidden": true,
                  "stdin": "low"
                }
              ],
              "hintNotes": {
                "concept": "Argument Types and Choices is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-cli-argparse-m1-l5",
            "slug": "py-cli-argparse-m1-l5",
            "title": "Defaults and Required Arguments",
            "concept": "A default value is used when an optional argument is left out, and required=True makes an optional argument mandatory. Defaults keep simple uses simple, while required marks the values a tool cannot work without.",
            "syntax": "parser.add_argument(\"--output\", default=\"out.txt\")",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--output\", default=\"out.txt\")\nprint(parser.parse_args([]).output)\nprint(parser.parse_args([\"--output\", \"a.txt\"]).output)\n",
            "exampleLanguage": "python",
            "mistake": "Using None as a default and then forgetting to check for it before using the value.",
            "bug": {
              "prompt": "The code below should print the default output name and then an overridden one, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--output\", default=\"out.txt\")\nprint(parser.parse_args([\"--output\", \"a.txt\"]).output)\nprint(parser.parse_args([]).output)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--output\", default=\"out.txt\")\nprint(parser.parse_args([]).output)\nprint(parser.parse_args([\"--output\", \"a.txt\"]).output)\n",
              "explanation": "The two prints are swapped, so the output is a.txt then out.txt instead of out.txt then a.txt."
            },
            "exercise": {
              "title": "Check your understanding of Defaults and Required Arguments",
              "type": "multiple-choice",
              "instructions": "Which statement about Defaults and Required Arguments is correct?",
              "starterCode": "",
              "solution": "A default value is used when an optional argument is left out, and required=True makes an optional argument mandatory.",
              "solutionExplanation": "A default value is used when an optional argument is left out, and required=True makes an optional argument mandatory. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A default value is used when an optional argument is left out, and required=True makes an optional argument mandatory.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Defaults and Required Arguments actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A default value is used when an optional argument is left out, and required=True makes an optional argument mandatory.",
                "Defaults and Required Arguments can only be used once in a program",
                "Defaults and Required Arguments requires a separate paid licence to use",
                "Defaults and Required Arguments only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-cli-argparse-m2",
        "title": "CLI Tools with argparse in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-cli-argparse-m2-l1",
            "slug": "py-cli-argparse-m2-l1",
            "title": "Subcommands",
            "concept": "Subcommands let one tool do several jobs, such as git add and git commit, with each subcommand having its own arguments. add_subparsers builds the command tree, and dest records which command was chosen.",
            "syntax": "sub = parser.add_subparsers(dest=\"cmd\")",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser()\nsub = parser.add_subparsers(dest=\"cmd\")\np_add = sub.add_parser(\"add\")\np_add.add_argument(\"name\")\nprint(parser.parse_args([\"add\", \"ada\"]).cmd)\nprint(parser.parse_args([\"add\", \"ada\"]).name)\n",
            "exampleLanguage": "python",
            "mistake": "Putting all options at the top level instead of giving each subcommand its own parser.",
            "bug": {
              "prompt": "The code below should parse the 'add ada' subcommand and print the command and the name, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser()\nsub = parser.add_subparsers(dest=\"cmd\")\np_add = sub.add_parser(\"add\")\np_add.add_argument(\"name\")\nprint(parser.parse_args([\"add\", \"ada\"]).name)\nprint(parser.parse_args([\"add\", \"ada\"]).cmd)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser()\nsub = parser.add_subparsers(dest=\"cmd\")\np_add = sub.add_parser(\"add\")\np_add.add_argument(\"name\")\nprint(parser.parse_args([\"add\", \"ada\"]).cmd)\nprint(parser.parse_args([\"add\", \"ada\"]).name)\n",
              "explanation": "The prints are swapped, so the output is 'ada' then 'add' instead of 'add' then 'ada'."
            },
            "exercise": {
              "title": "Practise Subcommands",
              "type": "write-code",
              "instructions": "Read a name from stdin, parse it as the 'add' subcommand's positional, and print 'add' and the name on one line.",
              "starterCode": "import argparse, sys\n\n# TODO: build parser with 'add' subcommand taking 'name'; parse ['add', name]; print cmd and name\n",
              "solution": "import argparse, sys\n\nparser = argparse.ArgumentParser()\nsub = parser.add_subparsers(dest=\"cmd\")\np_add = sub.add_parser(\"add\")\np_add.add_argument(\"name\")\nname = sys.stdin.read().strip()\nargs = parser.parse_args([\"add\", name])\nprint(args.cmd, args.name)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "add ada",
                  "hidden": false,
                  "stdin": "ada"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "add bob",
                  "hidden": true,
                  "stdin": "bob"
                }
              ],
              "hintNotes": {
                "concept": "Subcommands is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-cli-argparse-m2-l2",
            "slug": "py-cli-argparse-m2-l2",
            "title": "Help Text and Descriptions",
            "concept": "Help text comes from the description and the help strings on each argument, and argparse prints it when the user passes --help. Good help text explains what each value means, not just its name.",
            "syntax": "parser.add_argument(\"--count\", help=\"how many items\")",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser(description=\"Count things\")\nparser.add_argument(\"--count\", type=int, help=\"how many items\")\nprint(parser.description)\n",
            "exampleLanguage": "python",
            "mistake": "Leaving help strings blank, so --help shows bare argument names with no explanation.",
            "bug": {
              "prompt": "The code below should print a parser's description 'Count things', but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser(description=\"Count stuff\")\nparser.add_argument(\"--count\", type=int, help=\"how many items\")\nprint(parser.description)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser(description=\"Count things\")\nparser.add_argument(\"--count\", type=int, help=\"how many items\")\nprint(parser.description)\n",
              "explanation": "The description says 'Count stuff' instead of 'Count things', so the printed text does not match."
            },
            "exercise": {
              "title": "Practise Help Text and Descriptions",
              "type": "write-code",
              "instructions": "Build a parser with description 'Count things', and print its description.",
              "starterCode": "import argparse\n\n# TODO: ArgumentParser(description='Count things'), print parser.description\n",
              "solution": "import argparse\n\nparser = argparse.ArgumentParser(description=\"Count things\")\nprint(parser.description)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "Count things",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "Count things",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Help Text and Descriptions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-cli-argparse-m2-l3",
            "slug": "py-cli-argparse-m2-l3",
            "title": "Reading from Files or stdin",
            "concept": "A CLI that reads from a file or stdin is more useful than one that only takes values on the command line. argparse's FileType opens the file for you, and '-' is the usual name for stdin.",
            "syntax": "parser.add_argument(\"input\", type=argparse.FileType(\"r\"))",
            "exampleCode": "import argparse, io\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"input\", type=argparse.FileType(\"r\"))\nargs = parser.parse_args([io.StringIO(\"hello\")])\nprint(\"parsed\")\n",
            "exampleLanguage": "python",
            "mistake": "Reading a file with open() inside the tool instead of letting argparse handle it.",
            "bug": {
              "prompt": "The code below should check that a parser accepts a FileType argument without crashing, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse, io\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"input\", type=argparse.FileType(\"r\"))\nargs = parser.parse_args([\"missing.txt\"])\nprint(\"parsed\")\n",
              "fixedCode": "import argparse, io\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"input\", type=argparse.FileType(\"r\"))\nargs = parser.parse_args([io.StringIO(\"hello\")])\nprint(\"parsed\")\n",
              "explanation": "Parsing 'missing.txt' makes FileType try to open a file that does not exist, so argparse exits with an error."
            },
            "exercise": {
              "title": "Check your understanding of Reading from Files or stdin",
              "type": "multiple-choice",
              "instructions": "Which statement about Reading from Files or stdin is correct?",
              "starterCode": "",
              "solution": "A CLI that reads from a file or stdin is more useful than one that only takes values on the command line.",
              "solutionExplanation": "A CLI that reads from a file or stdin is more useful than one that only takes values on the command line. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A CLI that reads from a file or stdin is more useful than one that only takes values on the command line.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Reading from Files or stdin actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A CLI that reads from a file or stdin is more useful than one that only takes values on the command line.",
                "Reading from Files or stdin can only be used once in a program",
                "Reading from Files or stdin requires a separate paid licence to use",
                "Reading from Files or stdin only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-cli-argparse-m2-l4",
            "slug": "py-cli-argparse-m2-l4",
            "title": "Argument Groups",
            "concept": "Argument groups organise related options under a shared heading in the help text, which keeps --help readable as a tool grows. Groups are cosmetic, but readable help is part of a good tool.",
            "syntax": "group = parser.add_argument_group(\"output\")",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser()\ngroup = parser.add_argument_group(\"output\")\ngroup.add_argument(\"--out\")\nprint([a.dest for a in parser._actions if a.dest != \"help\"])\n",
            "exampleLanguage": "python",
            "mistake": "Adding every option to one flat list so --help becomes a wall of text.",
            "bug": {
              "prompt": "The code below should add --out to an 'output' group and print the list of argument dests, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser()\ngroup = parser.add_argument_group(\"output\")\ngroup.add_argument(\"--out\")\nprint([a.dest for a in parser._actions])\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser()\ngroup = parser.add_argument_group(\"output\")\ngroup.add_argument(\"--out\")\nprint([a.dest for a in parser._actions if a.dest != \"help\"])\n",
              "explanation": "Including the automatic help action prints ['help', 'out'] instead of just ['out']."
            },
            "exercise": {
              "title": "Practise Argument Groups",
              "type": "write-code",
              "instructions": "Add --out and --verbose to an ArgumentParser, and print the sorted list of argument dests excluding 'help'.",
              "starterCode": "import argparse\n\n# TODO: add --out and --verbose; print sorted dests excluding 'help'\n",
              "solution": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"--out\")\nparser.add_argument(\"--verbose\", action=\"store_true\")\nprint(sorted(a.dest for a in parser._actions if a.dest != \"help\"))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['out', 'verbose']",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['out', 'verbose']",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Argument Groups is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-cli-argparse-m2-l5",
            "slug": "py-cli-argparse-m2-l5",
            "title": "Building a File Tool CLI",
            "concept": "A file tool CLI combines everything in this track: a positional file name, optional flags, and a clear help message. The parsing stays separate from the work, so the tool is easy to test and to extend.",
            "syntax": "parser.add_argument(\"file\")\nparser.add_argument(\"--upper\", action=\"store_true\")",
            "exampleCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"file\")\nparser.add_argument(\"--upper\", action=\"store_true\")\nargs = parser.parse_args([\"notes.txt\", \"--upper\"])\nprint(args.file, args.upper)\n",
            "exampleLanguage": "python",
            "mistake": "Mixing parsing code with file-processing code so the tool cannot be tested without running it.",
            "bug": {
              "prompt": "The code below should parse file 'notes.txt' with --upper and print the file and the flag, but it gives the wrong result. What is the bug?",
              "buggyCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"file\")\nparser.add_argument(\"--upper\", action=\"store_true\")\nargs = parser.parse_args([\"notes.txt\"])\nprint(args.file, args.upper)\n",
              "fixedCode": "import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument(\"file\")\nparser.add_argument(\"--upper\", action=\"store_true\")\nargs = parser.parse_args([\"notes.txt\", \"--upper\"])\nprint(args.file, args.upper)\n",
              "explanation": "Parsing without --upper leaves the flag False, so the output is 'notes.txt False' instead of 'notes.txt True'."
            },
            "exercise": {
              "title": "Practise Building a File Tool CLI",
              "type": "write-code",
              "instructions": "Read a file name and a flag word ('upper' or 'lower') from stdin, parse them as a positional and --upper/--lower store_true flags, and print the file name and True/False for upper.",
              "starterCode": "import argparse, sys\n\n# TODO: read file + flag lines; parse ['file'] + ['--upper'] if flag is upper; print file and args.upper\n",
              "solution": "import argparse, sys\n\nlines = sys.stdin.read().strip().splitlines()\nparser = argparse.ArgumentParser()\nparser.add_argument(\"file\")\nparser.add_argument(\"--upper\", action=\"store_true\")\nargv = [lines[0]] + ([\"--upper\"] if lines[1] == \"upper\" else [])\nargs = parser.parse_args(argv)\nprint(args.file, args.upper)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "notes.txt True",
                  "hidden": false,
                  "stdin": "notes.txt\nupper"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "a.txt False",
                  "hidden": true,
                  "stdin": "a.txt\nlower"
                }
              ],
              "hintNotes": {
                "concept": "Building a File Tool CLI is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Greet CLI",
      "type": "build-program",
      "instructions": "Build a greet CLI: read a name and a count from stdin (two lines), parse them as a positional name and --count (default 1), and print 'Hello, NAME!' count times, one per line.",
      "starterCode": "import argparse, sys\n\n# TODO: read name + count lines; parse [name, '--count', count]; print greeting count times\n",
      "solution": "import argparse, sys\n\nlines = sys.stdin.read().strip().splitlines()\nparser = argparse.ArgumentParser()\nparser.add_argument(\"name\")\nparser.add_argument(\"--count\", type=int, default=1)\nargs = parser.parse_args([lines[0], \"--count\", lines[1]])\nfor _ in range(args.count):\n    print(f\"Hello, {args.name}!\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "Hello, ada!\nHello, ada!",
          "hidden": false,
          "stdin": "ada\n2"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "Hello, bob!",
          "hidden": true,
          "stdin": "bob\n1"
        }
      ],
      "hintNotes": {
        "concept": "Greet CLI is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Greet CLI Capstone Project",
      "description": "A small end-to-end CLI program that greets a person a chosen number of times.",
      "requirements": [
        "Parse the name as a positional argument.",
        "Apply at least three of these skills: argparse.ArgumentParser, Positional arguments, Optional arguments, Argument types.",
        "Support --count with a default of 1.",
        "Print 'Hello, NAME!' exactly count times."
      ],
      "rubric": [
        "Program runs and prints the greeting the right number of times.",
        "Code is clear, well-named, and organised into functions.",
        "The default count of 1 works when --count is omitted.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-regex",
    "slug": "py-regex",
    "language": "python",
    "category": "languages",
    "title": "Regular Expressions",
    "description": "Learn regular expressions with the re module: literals, character classes, quantifiers, groups, anchors, findall, substitution, splitting, and compiled patterns for validating real input.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "re.search",
      "Character classes",
      "Quantifiers",
      "Groups",
      "Anchors",
      "re.findall",
      "re.sub",
      "re.compile"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to describe a face to a sketch artist: vague words fail, but the right details find the match.",
    "modules": [
      {
        "id": "py-regex-m1",
        "title": "Fundamentals of Regular Expressions",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-regex-m1-l1",
            "slug": "py-regex-m1-l1",
            "title": "What Regular Expressions Are",
            "concept": "A regular expression is a pattern that describes a set of strings, and the re module tests whether a string matches it. Regexes are the standard tool for validating and extracting structured text such as emails and dates.",
            "syntax": "re.search(pattern, text)",
            "exampleCode": "import re\n\nprint(bool(re.search(r\"\\d+\", \"abc123\")))\nprint(re.search(r\"\\d+\", \"abc123\").group())\n",
            "exampleLanguage": "python",
            "mistake": "Writing a regex for a job that a simple string method could do better.",
            "bug": {
              "prompt": "The code below should search for digits in 'abc123' and print the match, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nprint(bool(re.search(r\"\\d+\", \"abc\")))\nprint(re.search(r\"\\d+\", \"abc\"))\n",
              "fixedCode": "import re\n\nprint(bool(re.search(r\"\\d+\", \"abc123\")))\nprint(re.search(r\"\\d+\", \"abc123\").group())\n",
              "explanation": "There are no digits in 'abc', so the search returns None and calling .group() on it raises AttributeError."
            },
            "exercise": {
              "title": "Practise What Regular Expressions Are",
              "type": "write-code",
              "instructions": "Read a word from stdin, search for the first run of digits in it with r'\\d+', and print the match or 'none'.",
              "starterCode": "import re, sys\n\n# TODO: read word, search r'\\d+', print group or 'none'\n",
              "solution": "import re, sys\n\nword = sys.stdin.read().strip()\nm = re.search(r\"\\d+\", word)\nprint(m.group() if m else \"none\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "123",
                  "hidden": false,
                  "stdin": "abc123"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "none",
                  "hidden": true,
                  "stdin": "hello"
                }
              ],
              "hintNotes": {
                "concept": "What Regular Expressions Are is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-regex-m1-l2",
            "slug": "py-regex-m1-l2",
            "title": "Matching Literals and Character Classes",
            "concept": "A literal in a pattern matches itself, and a character class such as [a-z] matches any one character from a set. Character classes are how patterns describe 'a letter' or 'a digit' without listing every possibility.",
            "syntax": "re.search(r\"[a-z]+\", text)",
            "exampleCode": "import re\n\nprint(re.search(r\"[a-z]+\", \"123abc\").group())\nprint(re.search(r\"[^0-9]+\", \"123abc\").group())\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that a character class matches one character unless a quantifier follows it.",
            "bug": {
              "prompt": "The code below should find the first run of lowercase letters in '123abc' and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nprint(re.search(r\"[a-z]\", \"123abc\").group())\n",
              "fixedCode": "import re\n\nprint(re.search(r\"[a-z]+\", \"123abc\").group())\n",
              "explanation": "Without the + the class matches a single letter, so the result is 'a' instead of 'abc'."
            },
            "exercise": {
              "title": "Practise Matching Literals and Character Classes",
              "type": "write-code",
              "instructions": "Read a word from stdin, find the first run of lowercase letters with r'[a-z]+', and print it or 'none'.",
              "starterCode": "import re, sys\n\n# TODO: read word, search r'[a-z]+', print group or 'none'\n",
              "solution": "import re, sys\n\nword = sys.stdin.read().strip()\nm = re.search(r\"[a-z]+\", word)\nprint(m.group() if m else \"none\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "abc",
                  "hidden": false,
                  "stdin": "123abc"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "none",
                  "hidden": true,
                  "stdin": "123"
                }
              ],
              "hintNotes": {
                "concept": "Matching Literals and Character Classes is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-regex-m1-l3",
            "slug": "py-regex-m1-l3",
            "title": "Quantifiers",
            "concept": "Quantifiers say how many times a piece may repeat: + for one or more, * for zero or more, and ? for zero or one. Getting the quantifier wrong is the most common reason a pattern matches too much or too little.",
            "syntax": "re.findall(r\"\\d+\", text)",
            "exampleCode": "import re\n\nprint(re.findall(r\"\\d+\", \"a12 b3 c\"))\nprint(re.findall(r\"\\d*\", \"a12 b3 c\"))\n",
            "exampleLanguage": "python",
            "mistake": "Using * where + was meant, which matches empty strings everywhere.",
            "bug": {
              "prompt": "The code below should find all digit runs in 'a12 b3 c' and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nprint(re.findall(r\"\\d*\", \"a12 b3 c\"))\n",
              "fixedCode": "import re\n\nprint(re.findall(r\"\\d+\", \"a12 b3 c\"))\n",
              "explanation": "The * quantifier matches empty strings too, so findall returns extra empty matches between the real ones."
            },
            "exercise": {
              "title": "Check your understanding of Quantifiers",
              "type": "multiple-choice",
              "instructions": "Which statement about Quantifiers is correct?",
              "starterCode": "",
              "solution": "Quantifiers say how many times a piece may repeat: + for one or more, * for zero or more, and ?",
              "solutionExplanation": "Quantifiers say how many times a piece may repeat: + for one or more, * for zero or more, and ? The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Quantifiers say how many times a piece may repeat: + for one or more, * for zero or more, and ?",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Quantifiers actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Quantifiers say how many times a piece may repeat: + for one or more, * for zero or more, and ?",
                "Quantifiers can only be used once in a program",
                "Quantifiers requires a separate paid licence to use",
                "Quantifiers only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-regex-m1-l4",
            "slug": "py-regex-m1-l4",
            "title": "Groups and Capturing",
            "concept": "Parentheses group part of a pattern and capture what they match, so the program can pull out the pieces it needs. Groups turn a match from a yes-or-no answer into structured data.",
            "syntax": "m = re.search(r\"(\\w+)@(\\w+)\", text)",
            "exampleCode": "import re\n\nm = re.search(r\"(\\w+)@(\\w+)\", \"user@example\")\nprint(m.group(1), m.group(2))\n",
            "exampleLanguage": "python",
            "mistake": "Using group(0) when the captured piece is in group(1).",
            "bug": {
              "prompt": "The code below should capture the user and host parts of 'user@example' and print them, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nm = re.search(r\"(\\w+)@(\\w+)\", \"user@example\")\nprint(m.group(0))\n",
              "fixedCode": "import re\n\nm = re.search(r\"(\\w+)@(\\w+)\", \"user@example\")\nprint(m.group(1), m.group(2))\n",
              "explanation": "group(0) is the whole match 'user@example', not the two captured pieces."
            },
            "exercise": {
              "title": "Practise Groups and Capturing",
              "type": "write-code",
              "instructions": "Read an email-like 'user@host' string from stdin, capture the two parts, and print them separated by a space.",
              "starterCode": "import re, sys\n\n# TODO: read text, search r'(\\w+)@(\\w+)', print group(1) and group(2)\n",
              "solution": "import re, sys\n\ntext = sys.stdin.read().strip()\nm = re.search(r\"(\\w+)@(\\w+)\", text)\nprint(m.group(1), m.group(2))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ada example",
                  "hidden": false,
                  "stdin": "ada@example"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "bob mail",
                  "hidden": true,
                  "stdin": "bob@mail"
                }
              ],
              "hintNotes": {
                "concept": "Groups and Capturing is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-regex-m1-l5",
            "slug": "py-regex-m1-l5",
            "title": "Anchors and Boundaries",
            "concept": "Anchors tie a pattern to a position: ^ for the start, $ for the end, and \\b for a word boundary. Without anchors a pattern can match in the middle of a longer string and accept input it should reject.",
            "syntax": "re.fullmatch(r\"\\d+\", text)",
            "exampleCode": "import re\n\nprint(bool(re.fullmatch(r\"\\d+\", \"123\")))\nprint(bool(re.fullmatch(r\"\\d+\", \"12a\")))\n",
            "exampleLanguage": "python",
            "mistake": "Using search when fullmatch was needed, so extra characters slip through.",
            "bug": {
              "prompt": "The code below should check whether '123' and '12a' are all digits and print the two booleans, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nprint(bool(re.search(r\"\\d+\", \"123\")))\nprint(bool(re.search(r\"\\d+\", \"12a\")))\n",
              "fixedCode": "import re\n\nprint(bool(re.fullmatch(r\"\\d+\", \"123\")))\nprint(bool(re.fullmatch(r\"\\d+\", \"12a\")))\n",
              "explanation": "search finds digits inside '12a' and returns True, so the invalid input is wrongly accepted."
            },
            "exercise": {
              "title": "Check your understanding of Anchors and Boundaries",
              "type": "multiple-choice",
              "instructions": "Which statement about Anchors and Boundaries is correct?",
              "starterCode": "",
              "solution": "Anchors tie a pattern to a position: ^ for the start, $ for the end, and \\b for a word boundary.",
              "solutionExplanation": "Anchors tie a pattern to a position: ^ for the start, $ for the end, and \\b for a word boundary. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Anchors tie a pattern to a position: ^ for the start, $ for the end, and \\b for a word boundary.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Anchors and Boundaries actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Anchors tie a pattern to a position: ^ for the start, $ for the end, and \\b for a word boundary.",
                "Anchors and Boundaries can only be used once in a program",
                "Anchors and Boundaries requires a separate paid licence to use",
                "Anchors and Boundaries only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-regex-m2",
        "title": "Regular Expressions in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-regex-m2-l1",
            "slug": "py-regex-m2-l1",
            "title": "findall and finditer",
            "concept": "findall returns every non-overlapping match as a list, while finditer returns match objects one by one for large texts. Both beat a manual loop of repeated searches.",
            "syntax": "re.findall(r\"\\d+\", text)",
            "exampleCode": "import re\n\nprint(re.findall(r\"\\d+\", \"a1 b22 c333\"))\n",
            "exampleLanguage": "python",
            "mistake": "Calling search in a loop and forgetting to move past the last match, which loops forever.",
            "bug": {
              "prompt": "The code below should find all digit runs in 'a1 b22 c333' and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nprint(re.findall(r\"\\d\", \"a1 b22 c333\"))\n",
              "fixedCode": "import re\n\nprint(re.findall(r\"\\d+\", \"a1 b22 c333\"))\n",
              "explanation": "Without the + each digit is a separate match, so the result is ['1', '2', '2', '3', '3', '3'] instead of ['1', '22', '333']."
            },
            "exercise": {
              "title": "Practise findall and finditer",
              "type": "write-code",
              "instructions": "Read text from stdin, find all digit runs with re.findall, and print the list.",
              "starterCode": "import re, sys\n\n# TODO: read text, print re.findall(r'\\d+', text)\n",
              "solution": "import re, sys\n\ntext = sys.stdin.read()\nprint(re.findall(r\"\\d+\", text))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['1', '22', '333']",
                  "hidden": false,
                  "stdin": "a1 b22 c333"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[]",
                  "hidden": true,
                  "stdin": "no digits"
                }
              ],
              "hintNotes": {
                "concept": "findall and finditer is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-regex-m2-l2",
            "slug": "py-regex-m2-l2",
            "title": "Substitution with sub",
            "concept": "re.sub replaces every match of a pattern with new text, and a function as the replacement can compute each replacement from the match. Substitution is how text is cleaned and redacted.",
            "syntax": "re.sub(r\"\\d+\", \"#\", text)",
            "exampleCode": "import re\n\nprint(re.sub(r\"\\d+\", \"#\", \"a1 b22\"))\nprint(re.sub(r\"(\\d+)\", r\"[\\1]\", \"a1 b22\"))\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that sub replaces all matches by default, and expecting only the first to change.",
            "bug": {
              "prompt": "The code below should replace digit runs in 'a1 b22' with '#' and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nprint(re.sub(r\"\\d\", \"#\", \"a1 b22\"))\n",
              "fixedCode": "import re\n\nprint(re.sub(r\"\\d+\", \"#\", \"a1 b22\"))\n",
              "explanation": "Replacing single digits turns '22' into '##' instead of one '#' for the whole run."
            },
            "exercise": {
              "title": "Practise Substitution with sub",
              "type": "write-code",
              "instructions": "Read text from stdin, replace every digit run with '#', and print the result.",
              "starterCode": "import re, sys\n\n# TODO: read text, print re.sub(r'\\d+', '#', text)\n",
              "solution": "import re, sys\n\ntext = sys.stdin.read()\nprint(re.sub(r\"\\d+\", \"#\", text))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "a# b#",
                  "hidden": false,
                  "stdin": "a1 b22"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "call # now",
                  "hidden": true,
                  "stdin": "call 555 now"
                }
              ],
              "hintNotes": {
                "concept": "Substitution with sub is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-regex-m2-l3",
            "slug": "py-regex-m2-l3",
            "title": "Splitting with Patterns",
            "concept": "re.split breaks a string at every match of a pattern, which handles messy separators that str.split cannot. Splitting on \\s+ copes with any mix of spaces and tabs.",
            "syntax": "re.split(r\"\\s+\", text)",
            "exampleCode": "import re\n\nprint(re.split(r\"\\s+\", \"a  b\\tc\"))\n",
            "exampleLanguage": "python",
            "mistake": "Splitting on a single space when the text has tabs and double spaces.",
            "bug": {
              "prompt": "The code below should split 'a  b<TAB>c' on whitespace runs and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nprint(re.split(r\" \", \"a  b\\tc\"))\n",
              "fixedCode": "import re\n\nprint(re.split(r\"\\s+\", \"a  b\\tc\"))\n",
              "explanation": "Splitting on one space leaves empty strings and keeps the tab inside 'b\\tc'."
            },
            "exercise": {
              "title": "Check your understanding of Splitting with Patterns",
              "type": "multiple-choice",
              "instructions": "Which statement about Splitting with Patterns is correct?",
              "starterCode": "",
              "solution": "re.",
              "solutionExplanation": "re. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "re.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Splitting with Patterns actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "re.",
                "Splitting with Patterns can only be used once in a program",
                "Splitting with Patterns requires a separate paid licence to use",
                "Splitting with Patterns only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-regex-m2-l4",
            "slug": "py-regex-m2-l4",
            "title": "Compiling Patterns",
            "concept": "re.compile turns a pattern string into a reusable pattern object, which is faster when the same pattern is used many times and clearer when it has flags. Compilation is a small optimisation with a big readability win.",
            "syntax": "pattern = re.compile(r\"\\d+\")",
            "exampleCode": "import re\n\npat = re.compile(r\"\\d+\")\nprint(pat.findall(\"a1 b22\"))\nprint(pat.search(\"x9\").group())\n",
            "exampleLanguage": "python",
            "mistake": "Compiling a pattern inside a loop, which throws away the benefit.",
            "bug": {
              "prompt": "The code below should compile a digit pattern and find all digit runs in 'a1 b22', but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\nprint(re.compile(r\"\\d\").findall(\"a1 b22\"))\n",
              "fixedCode": "import re\n\npat = re.compile(r\"\\d+\")\nprint(pat.findall(\"a1 b22\"))\n",
              "explanation": "Compiling \\d without the + finds single digits, so the result is ['1', '2', '2'] instead of ['1', '22']."
            },
            "exercise": {
              "title": "Practise Compiling Patterns",
              "type": "write-code",
              "instructions": "Read text from stdin, compile r'\\d+', and print all matches found with it.",
              "starterCode": "import re, sys\n\n# TODO: read text, compile r'\\d+', print pat.findall(text)\n",
              "solution": "import re, sys\n\ntext = sys.stdin.read()\npat = re.compile(r\"\\d+\")\nprint(pat.findall(text))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['1', '22', '333']",
                  "hidden": false,
                  "stdin": "a1 b22 c333"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['9', '10']",
                  "hidden": true,
                  "stdin": "x9 y10"
                }
              ],
              "hintNotes": {
                "concept": "Compiling Patterns is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-regex-m2-l5",
            "slug": "py-regex-m2-l5",
            "title": "Validating Input with Regex",
            "concept": "Validating input means checking the whole string against a pattern with fullmatch, so partial matches cannot sneak through. A good validator rejects bad input loudly instead of guessing what the user meant.",
            "syntax": "re.fullmatch(r\"[A-Za-z0-9_]+@[A-Za-z]+\\.[a-z]+\", text)",
            "exampleCode": "import re\n\npat = re.compile(r\"[A-Za-z0-9_]+@[A-Za-z]+\\.[a-z]+\")\nprint(bool(pat.fullmatch(\"ada@example.com\")))\nprint(bool(pat.fullmatch(\"not-an-email\")))\n",
            "exampleLanguage": "python",
            "mistake": "Using search for validation, so 'xx ada@example.com yy' passes as a valid email.",
            "bug": {
              "prompt": "The code below should check 'ada@example.com' and 'not-an-email' against an email pattern and print the booleans, but it gives the wrong result. What is the bug?",
              "buggyCode": "import re\n\npat = re.compile(r\"[A-Za-z0-9_]+@[A-Za-z]+\\.[a-z]+\")\nprint(bool(pat.search(\"ada@example.com\")))\nprint(bool(pat.search(\"not-an-email\")))\n",
              "fixedCode": "import re\n\npat = re.compile(r\"[A-Za-z0-9_]+@[A-Za-z]+\\.[a-z]+\")\nprint(bool(pat.fullmatch(\"ada@example.com\")))\nprint(bool(pat.fullmatch(\"not-an-email\")))\n",
              "explanation": "search accepts a match anywhere inside the string, so an invalid string containing a valid email would wrongly pass."
            },
            "exercise": {
              "title": "Practise Validating Input with Regex",
              "type": "write-code",
              "instructions": "Read a word from stdin and print True if it is all lowercase letters (fullmatch r'[a-z]+') and False otherwise.",
              "starterCode": "import re, sys\n\n# TODO: read word, print bool(re.fullmatch(r'[a-z]+', word))\n",
              "solution": "import re, sys\n\nword = sys.stdin.read().strip()\nprint(bool(re.fullmatch(r\"[a-z]+\", word)))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "True",
                  "hidden": false,
                  "stdin": "hello"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "False",
                  "hidden": true,
                  "stdin": "Hello123"
                }
              ],
              "hintNotes": {
                "concept": "Validating Input with Regex is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Email Extractor",
      "type": "build-program",
      "instructions": "Build an email extractor: read text from stdin, find all email-like matches with a compiled pattern, and print each one on its own line.",
      "starterCode": "import re, sys\n\n# TODO: compile an email pattern, findall on stdin text, print each match\n",
      "solution": "import re, sys\n\npat = re.compile(r\"[A-Za-z0-9_]+@[A-Za-z]+\\.[a-z]+\")\ntext = sys.stdin.read()\nfor m in pat.findall(text):\n    print(m)\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "ada@example.com\nbob@mail.org",
          "hidden": false,
          "stdin": "contact ada@example.com or bob@mail.org today"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "",
          "hidden": true,
          "stdin": "no emails here"
        }
      ],
      "hintNotes": {
        "concept": "Email Extractor is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Email Extractor Capstone Project",
      "description": "A small end-to-end regex program that pulls email addresses out of free text.",
      "requirements": [
        "Use a compiled pattern with re.compile.",
        "Apply at least three of these skills: re.findall, Groups, Anchors, re.compile.",
        "Print each found email on its own line.",
        "Print nothing when the text contains no emails."
      ],
      "rubric": [
        "Program runs and extracts the correct emails.",
        "Code is clear, well-named, and organised into functions.",
        "Text without emails prints nothing.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-sqlite",
    "slug": "py-sqlite",
    "language": "python",
    "category": "languages",
    "title": "Databases with sqlite3",
    "description": "Learn to store and query data with SQLite through Python's sqlite3 module: tables, inserts, selects, filters, updates, aggregates, joins, and transactions, all in a single file database.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "sqlite3.connect",
      "CREATE TABLE",
      "INSERT",
      "SELECT",
      "WHERE filters",
      "UPDATE and DELETE",
      "Aggregates",
      "Transactions"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to run a tiny library: every book has its place, and the catalogue answers any question in seconds.",
    "modules": [
      {
        "id": "py-sqlite-m1",
        "title": "Fundamentals of Databases with sqlite3",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-sqlite-m1-l1",
            "slug": "py-sqlite-m1-l1",
            "title": "What SQLite Is",
            "concept": "SQLite is a complete database stored in a single file, with no server to install or run. Python ships it in the sqlite3 module, which makes it the easiest way to add persistent storage to a small program.",
            "syntax": "conn = sqlite3.connect(\"app.db\")",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nprint(conn.execute(\"SELECT 1 + 1\").fetchone()[0])\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Opening a new connection for every single query instead of reusing one.",
            "bug": {
              "prompt": "The code below should run SELECT 1 + 1 on an in-memory database and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nprint(conn.execute(\"SELECT 1 + 2\").fetchone()[0])\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nprint(conn.execute(\"SELECT 1 + 1\").fetchone()[0])\nconn.close()\n",
              "explanation": "The query adds 1 + 2 instead of 1 + 1, so it prints 3 instead of 2."
            },
            "exercise": {
              "title": "Practise What SQLite Is",
              "type": "write-code",
              "instructions": "Connect to an in-memory SQLite database, run SELECT 6 * 7, and print the result.",
              "starterCode": "import sqlite3\n\n# TODO: connect :memory:, SELECT 6 * 7, print the value, close\n",
              "solution": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nprint(conn.execute(\"SELECT 6 * 7\").fetchone()[0])\nconn.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "42",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "What SQLite Is is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-sqlite-m1-l2",
            "slug": "py-sqlite-m1-l2",
            "title": "Creating Tables",
            "concept": "A table is created with CREATE TABLE, naming each column and its type, such as INTEGER or TEXT. The schema is the contract that every later query relies on.",
            "syntax": "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)\")\nprint(conn.execute(\"SELECT name FROM sqlite_master WHERE type='table'\").fetchall())\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Creating a table without a primary key, which makes rows hard to identify later.",
            "bug": {
              "prompt": "The code below should create a users table and print the list of tables, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT)\")\nprint(conn.execute(\"SELECT name FROM sqlite_master WHERE type='table'\").fetchall())\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)\")\nprint(conn.execute(\"SELECT name FROM sqlite_master WHERE type='table'\").fetchall())\nconn.close()\n",
              "explanation": "The table was named 'user' instead of 'users', so the listing shows the wrong name."
            },
            "exercise": {
              "title": "Practise Creating Tables",
              "type": "write-code",
              "instructions": "Create a table called items with columns id INTEGER PRIMARY KEY and label TEXT, then print the list of table names.",
              "starterCode": "import sqlite3\n\n# TODO: CREATE TABLE items, then list tables from sqlite_master and print\n",
              "solution": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE items (id INTEGER PRIMARY KEY, label TEXT)\")\nprint(conn.execute(\"SELECT name FROM sqlite_master WHERE type='table'\").fetchall())\nconn.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[('items',)]",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[('items',)]",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Creating Tables is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-sqlite-m1-l3",
            "slug": "py-sqlite-m1-l3",
            "title": "Inserting Rows",
            "concept": "Rows are inserted with INSERT and placeholders, which keep values separate from the SQL text. Placeholders prevent SQL injection and handle quoting automatically.",
            "syntax": "conn.execute(\"INSERT INTO users (name) VALUES (?)\", (name,))",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT)\")\nconn.execute(\"INSERT INTO users (name) VALUES (?)\", (\"ada\",))\nprint(conn.execute(\"SELECT name FROM users\").fetchall())\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Building SQL by formatting values into the string, which invites SQL injection.",
            "bug": {
              "prompt": "The code below should insert 'ada' with a placeholder and print all names, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT)\")\nconn.execute(\"INSERT INTO users (name) VALUES ('ada')\")\nprint(conn.execute(\"SELECT name FROM users\").fetchall())\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT)\")\nconn.execute(\"INSERT INTO users (name) VALUES (?)\", (\"ada\",))\nprint(conn.execute(\"SELECT name FROM users\").fetchall())\n",
              "explanation": "Formatting the value straight into the SQL string works here but breaks on names with quotes and opens the door to SQL injection."
            },
            "exercise": {
              "title": "Check your understanding of Inserting Rows",
              "type": "multiple-choice",
              "instructions": "Which statement about Inserting Rows is correct?",
              "starterCode": "",
              "solution": "Rows are inserted with INSERT and placeholders, which keep values separate from the SQL text.",
              "solutionExplanation": "Rows are inserted with INSERT and placeholders, which keep values separate from the SQL text. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Rows are inserted with INSERT and placeholders, which keep values separate from the SQL text.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Inserting Rows actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Rows are inserted with INSERT and placeholders, which keep values separate from the SQL text.",
                "Inserting Rows can only be used once in a program",
                "Inserting Rows requires a separate paid licence to use",
                "Inserting Rows only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-sqlite-m1-l4",
            "slug": "py-sqlite-m1-l4",
            "title": "Querying with SELECT",
            "concept": "SELECT reads rows back, with fetchall for every row and fetchone for a single row. Choosing the right fetch method keeps code simple and memory low.",
            "syntax": "rows = conn.execute(\"SELECT name FROM users\").fetchall()",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT)\")\nconn.executemany(\"INSERT INTO users VALUES (?)\", [(\"ada\",), (\"bob\",)])\nprint([r[0] for r in conn.execute(\"SELECT name FROM users ORDER BY name\").fetchall()])\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Using fetchall on a huge result set instead of iterating the cursor.",
            "bug": {
              "prompt": "The code below should insert ada and bob, then print their names sorted, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT)\")\nconn.executemany(\"INSERT INTO users VALUES (?)\", [(\"ada\",), (\"bob\",)])\nprint([r[0] for r in conn.execute(\"SELECT name FROM users\").fetchall()])\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT)\")\nconn.executemany(\"INSERT INTO users VALUES (?)\", [(\"ada\",), (\"bob\",)])\nprint([r[0] for r in conn.execute(\"SELECT name FROM users ORDER BY name\").fetchall()])\nconn.close()\n",
              "explanation": "Without ORDER BY the database may return rows in any order, so the list is not guaranteed to be sorted."
            },
            "exercise": {
              "title": "Practise Querying with SELECT",
              "type": "write-code",
              "instructions": "Read names from stdin, insert them into a users table, and print the names sorted, one per line.",
              "starterCode": "import sqlite3, sys\n\n# TODO: create users table, insert stdin names, SELECT ORDER BY name, print each\n",
              "solution": "import sqlite3, sys\n\nnames = sys.stdin.read().split()\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT)\")\nconn.executemany(\"INSERT INTO users VALUES (?)\", [(n,) for n in names])\nfor (name,) in conn.execute(\"SELECT name FROM users ORDER BY name\"):\n    print(name)\nconn.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ada\nbob\ncy",
                  "hidden": false,
                  "stdin": "bob ada cy"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "amy\nzoe",
                  "hidden": true,
                  "stdin": "zoe amy"
                }
              ],
              "hintNotes": {
                "concept": "Querying with SELECT is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-sqlite-m1-l5",
            "slug": "py-sqlite-m1-l5",
            "title": "Filtering with WHERE",
            "concept": "WHERE filters rows before they are returned, so the database does the searching instead of Python. A placeholder in the WHERE clause keeps the filter value safe.",
            "syntax": "SELECT * FROM users WHERE age > ?",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT, age INTEGER)\")\nconn.executemany(\"INSERT INTO users VALUES (?, ?)\", [(\"ada\", 36), (\"bob\", 25), (\"cy\", 40)])\nprint([r[0] for r in conn.execute(\"SELECT name FROM users WHERE age > 30 ORDER BY name\")])\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Fetching every row and filtering in Python instead of using WHERE.",
            "bug": {
              "prompt": "The code below should print the names of users older than 30, sorted, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT, age INTEGER)\")\nconn.executemany(\"INSERT INTO users VALUES (?, ?)\", [(\"ada\", 36), (\"bob\", 25), (\"cy\", 40)])\nprint([r[0] for r in conn.execute(\"SELECT name FROM users WHERE age > 20 ORDER BY name\")])\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT, age INTEGER)\")\nconn.executemany(\"INSERT INTO users VALUES (?, ?)\", [(\"ada\", 36), (\"bob\", 25), (\"cy\", 40)])\nprint([r[0] for r in conn.execute(\"SELECT name FROM users WHERE age > 30 ORDER BY name\")])\nconn.close()\n",
              "explanation": "Filtering with age > 20 also includes bob, who is 25 and should not be in the result."
            },
            "exercise": {
              "title": "Check your understanding of Filtering with WHERE",
              "type": "multiple-choice",
              "instructions": "Which statement about Filtering with WHERE is correct?",
              "starterCode": "",
              "solution": "WHERE filters rows before they are returned, so the database does the searching instead of Python.",
              "solutionExplanation": "WHERE filters rows before they are returned, so the database does the searching instead of Python. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "WHERE filters rows before they are returned, so the database does the searching instead of Python.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Filtering with WHERE actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "WHERE filters rows before they are returned, so the database does the searching instead of Python.",
                "Filtering with WHERE can only be used once in a program",
                "Filtering with WHERE requires a separate paid licence to use",
                "Filtering with WHERE only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-sqlite-m2",
        "title": "Databases with sqlite3 in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-sqlite-m2-l1",
            "slug": "py-sqlite-m2-l1",
            "title": "Updating and Deleting",
            "concept": "UPDATE changes rows that match a WHERE clause, and DELETE removes them. Both are dangerous without a WHERE clause, because they then touch every row in the table.",
            "syntax": "UPDATE users SET age = ? WHERE name = ?",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT, age INTEGER)\")\nconn.execute(\"INSERT INTO users VALUES ('ada', 36)\")\nconn.execute(\"UPDATE users SET age = 37 WHERE name = 'ada'\")\nprint(conn.execute(\"SELECT age FROM users\").fetchone()[0])\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Running UPDATE or DELETE without a WHERE clause and changing every row.",
            "bug": {
              "prompt": "The code below should update ada's age to 37 and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT, age INTEGER)\")\nconn.execute(\"INSERT INTO users VALUES ('ada', 36)\")\nconn.execute(\"UPDATE users SET age = 37\")\nprint(conn.execute(\"SELECT age FROM users\").fetchone()[0])\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT, age INTEGER)\")\nconn.execute(\"INSERT INTO users VALUES ('ada', 36)\")\nconn.execute(\"UPDATE users SET age = 37 WHERE name = 'ada'\")\nprint(conn.execute(\"SELECT age FROM users\").fetchone()[0])\nconn.close()\n",
              "explanation": "Without the WHERE clause the update touches every row in the table, which is harmless here but dangerous with more users."
            },
            "exercise": {
              "title": "Practise Updating and Deleting",
              "type": "write-code",
              "instructions": "Read a name and a new age from stdin (two lines), insert the name with age 0, update the age, and print the new age.",
              "starterCode": "import sqlite3, sys\n\n# TODO: read name + age, insert with age 0, UPDATE age WHERE name, print age\n",
              "solution": "import sqlite3, sys\n\nlines = sys.stdin.read().strip().splitlines()\nname, age = lines[0], int(lines[1])\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE users (name TEXT, age INTEGER)\")\nconn.execute(\"INSERT INTO users VALUES (?, 0)\", (name,))\nconn.execute(\"UPDATE users SET age = ? WHERE name = ?\", (age, name))\nprint(conn.execute(\"SELECT age FROM users\").fetchone()[0])\nconn.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "37",
                  "hidden": false,
                  "stdin": "ada\n37"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "25",
                  "hidden": true,
                  "stdin": "bob\n25"
                }
              ],
              "hintNotes": {
                "concept": "Updating and Deleting is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-sqlite-m2-l2",
            "slug": "py-sqlite-m2-l2",
            "title": "Aggregates and GROUP BY",
            "concept": "Aggregate functions such as COUNT, SUM, and AVG summarise rows, and GROUP BY splits the rows into groups first. Aggregates answer 'how many' and 'how much' questions in a single query.",
            "syntax": "SELECT city, COUNT(*) FROM users GROUP BY city",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE sales (city TEXT, amount INTEGER)\")\nconn.executemany(\"INSERT INTO sales VALUES (?, ?)\", [(\"Oslo\", 10), (\"Oslo\", 20), (\"Bergen\", 5)])\nprint(conn.execute(\"SELECT city, SUM(amount) FROM sales GROUP BY city ORDER BY city\").fetchall())\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Summing values in Python after fetching every row instead of using SUM.",
            "bug": {
              "prompt": "The code below should print the total sales per city, sorted by city, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE sales (city TEXT, amount INTEGER)\")\nconn.executemany(\"INSERT INTO sales VALUES (?, ?)\", [(\"Oslo\", 10), (\"Oslo\", 20), (\"Bergen\", 5)])\nprint(conn.execute(\"SELECT city, COUNT(amount) FROM sales GROUP BY city ORDER BY city\").fetchall())\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE sales (city TEXT, amount INTEGER)\")\nconn.executemany(\"INSERT INTO sales VALUES (?, ?)\", [(\"Oslo\", 10), (\"Oslo\", 20), (\"Bergen\", 5)])\nprint(conn.execute(\"SELECT city, SUM(amount) FROM sales GROUP BY city ORDER BY city\").fetchall())\nconn.close()\n",
              "explanation": "COUNT counts the rows instead of adding the amounts, so Oslo shows 2 instead of 30."
            },
            "exercise": {
              "title": "Practise Aggregates and GROUP BY",
              "type": "write-code",
              "instructions": "Read 'city amount' pairs from stdin (one per line), insert them into a sales table, and print 'city: total' lines sorted by city.",
              "starterCode": "import sqlite3, sys\n\n# TODO: read city/amount lines, insert, GROUP BY city SUM, print 'city: total' sorted\n",
              "solution": "import sqlite3, sys\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE sales (city TEXT, amount INTEGER)\")\nfor line in sys.stdin.read().strip().splitlines():\n    city, amount = line.split()\n    conn.execute(\"INSERT INTO sales VALUES (?, ?)\", (city, int(amount)))\nfor city, total in conn.execute(\"SELECT city, SUM(amount) FROM sales GROUP BY city ORDER BY city\"):\n    print(f\"{city}: {total}\")\nconn.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "Bergen: 5\nOslo: 30",
                  "hidden": false,
                  "stdin": "Oslo 10\nOslo 20\nBergen 5"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "A: 10\nB: 4",
                  "hidden": true,
                  "stdin": "A 3\nB 4\nA 7"
                }
              ],
              "hintNotes": {
                "concept": "Aggregates and GROUP BY is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-sqlite-m2-l3",
            "slug": "py-sqlite-m2-l3",
            "title": "Joining Tables",
            "concept": "A JOIN combines rows from two tables by matching a shared column, such as an author id. Joins keep data normalised, so each fact lives in exactly one place.",
            "syntax": "SELECT books.title FROM books JOIN authors ON books.author_id = authors.id",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT)\")\nconn.execute(\"CREATE TABLE books (title TEXT, author_id INTEGER)\")\nconn.execute(\"INSERT INTO authors VALUES (1, 'ada')\")\nconn.execute(\"INSERT INTO books VALUES ('Guide', 1)\")\nprint(conn.execute(\"SELECT books.title FROM books JOIN authors ON books.author_id = authors.id WHERE authors.name = 'ada'\").fetchall())\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Storing the author name in every book row instead of joining to an authors table.",
            "bug": {
              "prompt": "The code below should join books to authors and print the titles by ada, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT)\")\nconn.execute(\"CREATE TABLE books (title TEXT, author_id INTEGER)\")\nconn.execute(\"INSERT INTO authors VALUES (1, 'ada')\")\nconn.execute(\"INSERT INTO books VALUES ('Guide', 1)\")\nprint(conn.execute(\"SELECT books.title FROM books JOIN authors ON books.author_id = authors.id WHERE authors.name = 'bob'\").fetchall())\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT)\")\nconn.execute(\"CREATE TABLE books (title TEXT, author_id INTEGER)\")\nconn.execute(\"INSERT INTO authors VALUES (1, 'ada')\")\nconn.execute(\"INSERT INTO books VALUES ('Guide', 1)\")\nprint(conn.execute(\"SELECT books.title FROM books JOIN authors ON books.author_id = authors.id WHERE authors.name = 'ada'\").fetchall())\nconn.close()\n",
              "explanation": "Filtering on 'bob' matches no author, so the join returns an empty list instead of the book."
            },
            "exercise": {
              "title": "Check your understanding of Joining Tables",
              "type": "multiple-choice",
              "instructions": "Which statement about Joining Tables is correct?",
              "starterCode": "",
              "solution": "A JOIN combines rows from two tables by matching a shared column, such as an author id.",
              "solutionExplanation": "A JOIN combines rows from two tables by matching a shared column, such as an author id. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A JOIN combines rows from two tables by matching a shared column, such as an author id.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Joining Tables actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A JOIN combines rows from two tables by matching a shared column, such as an author id.",
                "Joining Tables can only be used once in a program",
                "Joining Tables requires a separate paid licence to use",
                "Joining Tables only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-sqlite-m2-l4",
            "slug": "py-sqlite-m2-l4",
            "title": "Transactions",
            "concept": "A transaction groups several writes into one all-or-nothing unit: commit saves them, rollback undoes them. Transactions are what keep a database consistent when something fails halfway through.",
            "syntax": "conn.commit()",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t (n INTEGER)\")\nconn.execute(\"INSERT INTO t VALUES (1)\")\nconn.commit()\nprint(conn.execute(\"SELECT COUNT(*) FROM t\").fetchone()[0])\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to commit, so the writes vanish when the connection closes.",
            "bug": {
              "prompt": "The code below should insert 1, commit, and print the row count, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t (n INTEGER)\")\nconn.execute(\"INSERT INTO t VALUES (1)\")\nconn.rollback()\nprint(conn.execute(\"SELECT COUNT(*) FROM t\").fetchone()[0])\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t (n INTEGER)\")\nconn.execute(\"INSERT INTO t VALUES (1)\")\nconn.commit()\nprint(conn.execute(\"SELECT COUNT(*) FROM t\").fetchone()[0])\nconn.close()\n",
              "explanation": "Calling rollback instead of commit undoes the insert, so the count is 0 instead of 1."
            },
            "exercise": {
              "title": "Practise Transactions",
              "type": "write-code",
              "instructions": "Read an integer from stdin, insert it into a table inside a transaction, commit, and print the count of rows.",
              "starterCode": "import sqlite3, sys\n\n# TODO: create table, insert stdin int, commit, print COUNT(*)\n",
              "solution": "import sqlite3, sys\n\nn = int(sys.stdin.read().strip())\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t (n INTEGER)\")\nconn.execute(\"INSERT INTO t VALUES (?)\", (n,))\nconn.commit()\nprint(conn.execute(\"SELECT COUNT(*) FROM t\").fetchone()[0])\nconn.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "1",
                  "hidden": false,
                  "stdin": "42"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "1",
                  "hidden": true,
                  "stdin": "7"
                }
              ],
              "hintNotes": {
                "concept": "Transactions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-sqlite-m2-l5",
            "slug": "py-sqlite-m2-l5",
            "title": "A Tiny Address Book Database",
            "concept": "An address book database combines the whole track: a table, inserts, queries, and updates in one small program. It is the smallest useful database application, and the pattern scales to much bigger ones.",
            "syntax": "INSERT INTO contacts (name, phone) VALUES (?, ?)",
            "exampleCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE contacts (name TEXT, phone TEXT)\")\nconn.execute(\"INSERT INTO contacts VALUES ('ada', '555-1')\")\nprint(conn.execute(\"SELECT phone FROM contacts WHERE name = 'ada'\").fetchone()[0])\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Storing contacts in a list that disappears when the program ends.",
            "bug": {
              "prompt": "The code below should insert ada with phone 555-1 and print her phone number, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE contacts (name TEXT, phone TEXT)\")\nconn.execute(\"INSERT INTO contacts VALUES ('ada', '555-1')\")\nprint(conn.execute(\"SELECT phone FROM contacts WHERE name = 'bob'\").fetchone()[0])\nconn.close()\n",
              "fixedCode": "import sqlite3\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE contacts (name TEXT, phone TEXT)\")\nconn.execute(\"INSERT INTO contacts VALUES ('ada', '555-1')\")\nprint(conn.execute(\"SELECT phone FROM contacts WHERE name = 'ada'\").fetchone()[0])\nconn.close()\n",
              "explanation": "Looking up 'bob' returns no row, so fetchone gives None and indexing it raises TypeError."
            },
            "exercise": {
              "title": "Practise A Tiny Address Book Database",
              "type": "write-code",
              "instructions": "Read 'name phone' pairs from stdin (one per line), store them in a contacts table, and print all contacts sorted by name as 'name: phone'.",
              "starterCode": "import sqlite3, sys\n\n# TODO: read 'name phone' lines, insert, print 'name: phone' sorted by name\n",
              "solution": "import sqlite3, sys\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE contacts (name TEXT, phone TEXT)\")\nfor line in sys.stdin.read().strip().splitlines():\n    name, phone = line.split()\n    conn.execute(\"INSERT INTO contacts VALUES (?, ?)\", (name, phone))\nfor name, phone in conn.execute(\"SELECT name, phone FROM contacts ORDER BY name\"):\n    print(f\"{name}: {phone}\")\nconn.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ada: 555-1\nbob: 555-2",
                  "hidden": false,
                  "stdin": "bob 555-2\nada 555-1"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "ada: 555-1\ncy: 555-3",
                  "hidden": true,
                  "stdin": "cy 555-3\nada 555-1"
                }
              ],
              "hintNotes": {
                "concept": "A Tiny Address Book Database is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Address Book Lookup",
      "type": "build-program",
      "instructions": "Build an address book lookup: read 'name phone' pairs from stdin (one per line), store them, and print all contacts sorted by name as 'name: phone'.",
      "starterCode": "import sqlite3, sys\n\n# TODO: read 'name phone' lines, insert, print 'name: phone' sorted by name\n",
      "solution": "import sqlite3, sys\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE contacts (name TEXT, phone TEXT)\")\nfor line in sys.stdin.read().strip().splitlines():\n    name, phone = line.split()\n    conn.execute(\"INSERT INTO contacts VALUES (?, ?)\", (name, phone))\nfor name, phone in conn.execute(\"SELECT name, phone FROM contacts ORDER BY name\"):\n    print(f\"{name}: {phone}\")\nconn.close()\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "ada: 555-1\nbob: 555-2",
          "hidden": false,
          "stdin": "bob 555-2\nada 555-1"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "ada: 555-1\ncy: 555-3",
          "hidden": true,
          "stdin": "cy 555-3\nada 555-1"
        }
      ],
      "hintNotes": {
        "concept": "Address Book Lookup is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Address Book Lookup Capstone Project",
      "description": "A small end-to-end database program that stores contacts and prints them sorted by name.",
      "requirements": [
        "Store contacts in a SQLite table with placeholders.",
        "Apply at least three of these skills: sqlite3.connect, INSERT, SELECT, WHERE filters.",
        "Print contacts sorted by name.",
        "Print each contact in the format 'name: phone'."
      ],
      "rubric": [
        "Program runs and prints the contacts in the right order.",
        "Code is clear, well-named, and organised into functions.",
        "Values are inserted with placeholders, never string formatting.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-logging-config",
    "slug": "py-logging-config",
    "language": "python",
    "category": "languages",
    "title": "Logging and Configuration",
    "description": "Learn to replace print debugging with real logging and to configure programs properly: levels, loggers, handlers, formatters, file output, dictConfig, and config files.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "logging levels",
      "Loggers",
      "Handlers",
      "Formatters",
      "File logging",
      "dictConfig",
      "Config files",
      "Environment settings"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to keep a ship's log instead of shouting across the deck: the record survives, and anyone can read what happened.",
    "modules": [
      {
        "id": "py-logging-config-m1",
        "title": "Fundamentals of Logging and Configuration",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-logging-config-m1-l1",
            "slug": "py-logging-config-m1-l1",
            "title": "Why Print Is Not Logging",
            "concept": "Print statements mix debugging output with real output and cannot be switched off by severity. Logging records events with a level, a time, and a source, and each of those can be controlled separately.",
            "syntax": "logging.info(\"started\")",
            "exampleCode": "import logging\n\nlogging.basicConfig(level=logging.INFO)\nlogging.info(\"started\")\nprint(\"done\")\n",
            "exampleLanguage": "python",
            "mistake": "Leaving debug prints in production code that flood the logs.",
            "bug": {
              "prompt": "The code below should log 'started' at INFO level and print 'done', but it gives the wrong result. What is the bug?",
              "buggyCode": "import logging\n\nlogging.basicConfig(level=logging.WARNING)\nlogging.info(\"started\")\nprint(\"done\")\n",
              "fixedCode": "import logging\n\nlogging.basicConfig(level=logging.INFO)\nlogging.info(\"started\")\nprint(\"done\")\n",
              "explanation": "With the level set to WARNING the INFO message is hidden, so only 'done' appears."
            },
            "exercise": {
              "title": "Practise Why Print Is Not Logging",
              "type": "write-code",
              "instructions": "Configure logging at INFO level with a message-only format, log 'hello log', and print 'done'.",
              "starterCode": "import logging\n\n# TODO: basicConfig level INFO format '%(message)s'; logging.info('hello log'); print('done')\n",
              "solution": "import logging\n\nlogging.basicConfig(level=logging.INFO, format=\"%(message)s\")\nlogging.info(\"hello log\")\nprint(\"done\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "done",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "done",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Why Print Is Not Logging is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-logging-config-m1-l2",
            "slug": "py-logging-config-m1-l2",
            "title": "Log Levels",
            "concept": "Log levels rank messages from DEBUG to CRITICAL, and a logger only emits messages at or above its level. Setting the level is how a program stays quiet normally and chatty while debugging.",
            "syntax": "logging.DEBUG < logging.INFO < logging.WARNING",
            "exampleCode": "import logging\n\nprint(logging.DEBUG, logging.INFO, logging.WARNING, logging.ERROR, logging.CRITICAL)\n",
            "exampleLanguage": "python",
            "mistake": "Logging everything at ERROR level, which hides the information and abuses the severity.",
            "bug": {
              "prompt": "The code below should print the numeric values of DEBUG, INFO, WARNING, ERROR and CRITICAL, but it gives the wrong result. What is the bug?",
              "buggyCode": "import logging\n\nprint(logging.INFO, logging.DEBUG, logging.WARNING, logging.ERROR, logging.CRITICAL)\n",
              "fixedCode": "import logging\n\nprint(logging.DEBUG, logging.INFO, logging.WARNING, logging.ERROR, logging.CRITICAL)\n",
              "explanation": "The first two values are swapped, so the list starts 20, 10 instead of 10, 20."
            },
            "exercise": {
              "title": "Practise Log Levels",
              "type": "write-code",
              "instructions": "Print the numeric values of logging.DEBUG, logging.INFO and logging.WARNING separated by spaces.",
              "starterCode": "import logging\n\n# TODO: print DEBUG, INFO, WARNING values\n",
              "solution": "import logging\n\nprint(logging.DEBUG, logging.INFO, logging.WARNING)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "10 20 30",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "10 20 30",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Log Levels is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-logging-config-m1-l3",
            "slug": "py-logging-config-m1-l3",
            "title": "Loggers and Handlers",
            "concept": "A logger names the source of a message, and a handler decides where the message goes, such as the console or a file. Separating the two means one logger can feed several outputs at once.",
            "syntax": "logger = logging.getLogger(\"app\")",
            "exampleCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nlogger = logging.getLogger(\"demo\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\nlogger.info(\"hi\")\nprint(buf.getvalue().strip())\n",
            "exampleLanguage": "python",
            "mistake": "Using the root logger everywhere instead of a named logger per module.",
            "bug": {
              "prompt": "The code below should log 'hi' through a named logger to a string buffer and print the buffer, but it gives the wrong result. What is the bug?",
              "buggyCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nlogger = logging.getLogger(\"demo\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.WARNING)\nlogger.info(\"hi\")\nprint(buf.getvalue().strip())\n",
              "fixedCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nlogger = logging.getLogger(\"demo\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\nlogger.info(\"hi\")\nprint(buf.getvalue().strip())\n",
              "explanation": "With the level at WARNING the INFO message is dropped, so the buffer stays empty."
            },
            "exercise": {
              "title": "Check your understanding of Loggers and Handlers",
              "type": "multiple-choice",
              "instructions": "Which statement about Loggers and Handlers is correct?",
              "starterCode": "",
              "solution": "A logger names the source of a message, and a handler decides where the message goes, such as the console or a file.",
              "solutionExplanation": "A logger names the source of a message, and a handler decides where the message goes, such as the console or a file. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A logger names the source of a message, and a handler decides where the message goes, such as the console or a file.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Loggers and Handlers actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A logger names the source of a message, and a handler decides where the message goes, such as the console or a file.",
                "Loggers and Handlers can only be used once in a program",
                "Loggers and Handlers requires a separate paid licence to use",
                "Loggers and Handlers only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-logging-config-m1-l4",
            "slug": "py-logging-config-m1-l4",
            "title": "Formatting Log Records",
            "concept": "A formatter controls what a log line looks like, adding the time, the level, and the logger name around the message. A consistent format makes logs searchable and easy to scan.",
            "syntax": "logging.Formatter(\"%(levelname)s %(message)s\")",
            "exampleCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nhandler.setFormatter(logging.Formatter(\"%(levelname)s %(message)s\"))\nlogger = logging.getLogger(\"fmt\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\nlogger.warning(\"careful\")\nprint(buf.getvalue().strip())\n",
            "exampleLanguage": "python",
            "mistake": "Formatting log messages by hand with f-strings instead of letting the formatter do it.",
            "bug": {
              "prompt": "The code below should log a warning with a 'LEVEL message' format and print the formatted line, but it gives the wrong result. What is the bug?",
              "buggyCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nhandler.setFormatter(logging.Formatter(\"%(message)s\"))\nlogger = logging.getLogger(\"fmt\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\nlogger.warning(\"careful\")\nprint(buf.getvalue().strip())\n",
              "fixedCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nhandler.setFormatter(logging.Formatter(\"%(levelname)s %(message)s\"))\nlogger = logging.getLogger(\"fmt\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\nlogger.warning(\"careful\")\nprint(buf.getvalue().strip())\n",
              "explanation": "A message-only format drops the level, so the line prints just 'careful' instead of 'WARNING careful'."
            },
            "exercise": {
              "title": "Practise Formatting Log Records",
              "type": "write-code",
              "instructions": "Read a level name ('INFO' or 'WARNING') from stdin, log 'hello' at that level through a formatter '%(levelname)s %(message)s' to a buffer, and print the buffer stripped.",
              "starterCode": "import logging, io, sys\n\n# TODO: read level name, log 'hello' at that level with the LEVEL/message formatter, print buffer\n",
              "solution": "import logging, io, sys\n\nlevel = getattr(logging, sys.stdin.read().strip())\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nhandler.setFormatter(logging.Formatter(\"%(levelname)s %(message)s\"))\nlogger = logging.getLogger(\"fmt2\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.DEBUG)\nlogger.log(level, \"hello\")\nprint(buf.getvalue().strip())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "INFO hello",
                  "hidden": false,
                  "stdin": "INFO"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "WARNING hello",
                  "hidden": true,
                  "stdin": "WARNING"
                }
              ],
              "hintNotes": {
                "concept": "Formatting Log Records is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-logging-config-m1-l5",
            "slug": "py-logging-config-m1-l5",
            "title": "Logging to a File",
            "concept": "A FileHandler writes log records to a file so they survive after the program ends. File logging is what turns logs from a console curiosity into a record you can inspect later.",
            "syntax": "handler = logging.FileHandler(\"app.log\")",
            "exampleCode": "import logging, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    path = Path(d) / \"app.log\"\n    handler = logging.FileHandler(path)\n    logger = logging.getLogger(\"filelog\")\n    logger.addHandler(handler)\n    logger.setLevel(logging.INFO)\n    logger.info(\"saved\")\n    handler.close()\n    print(path.read_text().strip())\n",
            "exampleLanguage": "python",
            "mistake": "Opening a log file by hand and writing to it instead of using a handler.",
            "bug": {
              "prompt": "The code below should log 'saved' to a temp file with a FileHandler and print the file contents, but it gives the wrong result. What is the bug?",
              "buggyCode": "import logging, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    path = Path(d) / \"app.log\"\n    handler = logging.FileHandler(path)\n    logger = logging.getLogger(\"filelog\")\n    logger.addHandler(handler)\n    logger.setLevel(logging.WARNING)\n    logger.info(\"saved\")\n    handler.close()\n    print(path.read_text().strip())\n",
              "fixedCode": "import logging, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    path = Path(d) / \"app.log\"\n    handler = logging.FileHandler(path)\n    logger = logging.getLogger(\"filelog\")\n    logger.addHandler(handler)\n    logger.setLevel(logging.INFO)\n    logger.info(\"saved\")\n    handler.close()\n    print(path.read_text().strip())\n",
              "explanation": "With the level at WARNING the INFO message never reaches the file, so reading it prints an empty line."
            },
            "exercise": {
              "title": "Check your understanding of Logging to a File",
              "type": "multiple-choice",
              "instructions": "Which statement about Logging to a File is correct?",
              "starterCode": "",
              "solution": "A FileHandler writes log records to a file so they survive after the program ends.",
              "solutionExplanation": "A FileHandler writes log records to a file so they survive after the program ends. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A FileHandler writes log records to a file so they survive after the program ends.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Logging to a File actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A FileHandler writes log records to a file so they survive after the program ends.",
                "Logging to a File can only be used once in a program",
                "Logging to a File requires a separate paid licence to use",
                "Logging to a File only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-logging-config-m2",
        "title": "Logging and Configuration in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-logging-config-m2-l1",
            "slug": "py-logging-config-m2-l1",
            "title": "Logging Exceptions",
            "concept": "logger.exception logs the message together with the full traceback of the exception being handled. A bare error message without the traceback hides where the failure happened.",
            "syntax": "logger.exception(\"failed\")",
            "exampleCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nlogger = logging.getLogger(\"exc\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\ntry:\n    1 / 0\nexcept ZeroDivisionError:\n    logger.exception(\"failed\")\nprint(\"ZeroDivisionError\" in buf.getvalue())\n",
            "exampleLanguage": "python",
            "mistake": "Logging an exception with logger.error and no traceback, which hides the cause.",
            "bug": {
              "prompt": "The code below should log a caught ZeroDivisionError with logger.exception and print whether the traceback appears, but it gives the wrong result. What is the bug?",
              "buggyCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nlogger = logging.getLogger(\"exc\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\ntry:\n    1 / 0\nexcept ZeroDivisionError:\n    logger.error(\"failed\")\nprint(\"ZeroDivisionError\" in buf.getvalue())\n",
              "fixedCode": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nlogger = logging.getLogger(\"exc\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\ntry:\n    1 / 0\nexcept ZeroDivisionError:\n    logger.exception(\"failed\")\nprint(\"ZeroDivisionError\" in buf.getvalue())\n",
              "explanation": "logger.error records only the message, so the buffer never contains the exception name and the check prints False."
            },
            "exercise": {
              "title": "Practise Logging Exceptions",
              "type": "write-code",
              "instructions": "Divide by zero inside a try block, log it with logger.exception to a buffer, and print whether 'ZeroDivisionError' appears in the buffer.",
              "starterCode": "import logging, io\n\n# TODO: try 1/0, logger.exception('failed') to a buffer, print 'ZeroDivisionError' in buffer value\n",
              "solution": "import logging, io\n\nbuf = io.StringIO()\nhandler = logging.StreamHandler(buf)\nlogger = logging.getLogger(\"exc2\")\nlogger.addHandler(handler)\nlogger.setLevel(logging.INFO)\ntry:\n    1 / 0\nexcept ZeroDivisionError:\n    logger.exception(\"failed\")\nprint(\"ZeroDivisionError\" in buf.getvalue())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "True",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "True",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Logging Exceptions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-logging-config-m2-l2",
            "slug": "py-logging-config-m2-l2",
            "title": "Configuration with dictConfig",
            "concept": "dictConfig configures logging from a plain dictionary, which can come from a file or from code. Describing logging as data keeps the setup in one place and makes it easy to change without editing code.",
            "syntax": "logging.config.dictConfig(config)",
            "exampleCode": "import logging, logging.config, io\n\nbuf = io.StringIO()\nlogging.config.dictConfig({\n    \"version\": 1,\n    \"handlers\": {\"h\": {\"class\": \"logging.StreamHandler\", \"stream\": buf}},\n    \"root\": {\"level\": \"INFO\", \"handlers\": [\"h\"]},\n})\nlogging.info(\"configured\")\nprint(buf.getvalue().strip())\n",
            "exampleLanguage": "python",
            "mistake": "Calling basicConfig after handlers already exist, which silently does nothing.",
            "bug": {
              "prompt": "The code below should configure logging with dictConfig to a buffer and log 'configured', but it gives the wrong result. What is the bug?",
              "buggyCode": "import logging, logging.config, io\n\nbuf = io.StringIO()\nlogging.config.dictConfig({\n    \"version\": 1,\n    \"handlers\": {\"h\": {\"class\": \"logging.StreamHandler\", \"stream\": buf}},\n    \"root\": {\"level\": \"WARNING\", \"handlers\": [\"h\"]},\n})\nlogging.info(\"configured\")\nprint(buf.getvalue().strip())\n",
              "fixedCode": "import logging, logging.config, io\n\nbuf = io.StringIO()\nlogging.config.dictConfig({\n    \"version\": 1,\n    \"handlers\": {\"h\": {\"class\": \"logging.StreamHandler\", \"stream\": buf}},\n    \"root\": {\"level\": \"INFO\", \"handlers\": [\"h\"]},\n})\nlogging.info(\"configured\")\nprint(buf.getvalue().strip())\n",
              "explanation": "With the root level at WARNING the INFO message is dropped, so the buffer stays empty."
            },
            "exercise": {
              "title": "Practise Configuration with dictConfig",
              "type": "write-code",
              "instructions": "Read a level name from stdin, configure logging with dictConfig to a buffer at that level, log 'hi', and print the buffer stripped.",
              "starterCode": "import logging, logging.config, io, sys\n\n# TODO: read level, dictConfig root to a buffer at that level, log 'hi', print buffer\n",
              "solution": "import logging, logging.config, io, sys\n\nlevel = sys.stdin.read().strip()\nbuf = io.StringIO()\nlogging.config.dictConfig({\n    \"version\": 1,\n    \"handlers\": {\"h\": {\"class\": \"logging.StreamHandler\", \"stream\": buf}},\n    \"root\": {\"level\": level, \"handlers\": [\"h\"]},\n})\nlogging.info(\"hi\")\nprint(buf.getvalue().strip())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "hi",
                  "hidden": false,
                  "stdin": "INFO"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "",
                  "hidden": true,
                  "stdin": "WARNING"
                }
              ],
              "hintNotes": {
                "concept": "Configuration with dictConfig is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-logging-config-m2-l3",
            "slug": "py-logging-config-m2-l3",
            "title": "Reading Config Files",
            "concept": "Config files hold settings outside the code, and configparser reads INI-style files into sections and keys. Keeping settings in a file means the same program can run in different environments without code changes.",
            "syntax": "config = configparser.ConfigParser()\nconfig.read(\"app.ini\")",
            "exampleCode": "import configparser, io\n\nconfig = configparser.ConfigParser()\nconfig.read_string(\"[server]\\nhost = localhost\\nport = 8080\\n\")\nprint(config[\"server\"][\"host\"], config[\"server\"].getint(\"port\"))\n",
            "exampleLanguage": "python",
            "mistake": "Hard-coding settings that change between environments, such as host names and ports.",
            "bug": {
              "prompt": "The code below should read host and port from an INI string and print them, but it gives the wrong result. What is the bug?",
              "buggyCode": "import configparser, io\n\nconfig = configparser.ConfigParser()\nconfig.read_string(\"[server]\\nhost = localhost\\nport = 8080\\n\")\nprint(config[\"server\"][\"host\"], config[\"server\"][\"port\"])\n",
              "fixedCode": "import configparser, io\n\nconfig = configparser.ConfigParser()\nconfig.read_string(\"[server]\\nhost = localhost\\nport = 8080\\n\")\nprint(config[\"server\"][\"host\"], config[\"server\"].getint(\"port\"))\n",
              "explanation": "Reading the port as a plain string prints '8080' the same way here, but the value stays a string and later arithmetic on it would fail."
            },
            "exercise": {
              "title": "Check your understanding of Reading Config Files",
              "type": "multiple-choice",
              "instructions": "Which statement about Reading Config Files is correct?",
              "starterCode": "",
              "solution": "Config files hold settings outside the code, and configparser reads INI-style files into sections and keys.",
              "solutionExplanation": "Config files hold settings outside the code, and configparser reads INI-style files into sections and keys. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Config files hold settings outside the code, and configparser reads INI-style files into sections and keys.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Reading Config Files actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Config files hold settings outside the code, and configparser reads INI-style files into sections and keys.",
                "Reading Config Files can only be used once in a program",
                "Reading Config Files requires a separate paid licence to use",
                "Reading Config Files only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-logging-config-m2-l4",
            "slug": "py-logging-config-m2-l4",
            "title": "Environment-Based Settings",
            "concept": "Environment-based settings read configuration from os.environ with a default for each value, so the same code runs in development and production. Twelve-factor apps treat the environment as the source of settings.",
            "syntax": "os.environ.get(\"PORT\", \"8000\")",
            "exampleCode": "import os\n\nprint(os.environ.get(\"APP_PORT\", \"8000\"))\n",
            "exampleLanguage": "python",
            "mistake": "Reading a setting from the environment with no default and crashing when it is missing.",
            "bug": {
              "prompt": "The code below should print the APP_PORT setting with a default of '8000', but it gives the wrong result. What is the bug?",
              "buggyCode": "import os\n\nprint(os.environ[\"APP_PORT\"])\n",
              "fixedCode": "import os\n\nprint(os.environ.get(\"APP_PORT\", \"8000\"))\n",
              "explanation": "Indexing a missing variable raises KeyError, while .get falls back to the default."
            },
            "exercise": {
              "title": "Practise Environment-Based Settings",
              "type": "write-code",
              "instructions": "Read a setting name and a default (two lines) from stdin and print the environment value or the default.",
              "starterCode": "import os, sys\n\n# TODO: read name + default lines, print os.environ.get(name, default)\n",
              "solution": "import os, sys\n\nlines = sys.stdin.read().strip().splitlines()\nprint(os.environ.get(lines[0], lines[1]))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "8000",
                  "hidden": false,
                  "stdin": "APP_PORT\n8000"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "default-val",
                  "hidden": true,
                  "stdin": "MISSING_XYZ\ndefault-val"
                }
              ],
              "hintNotes": {
                "concept": "Environment-Based Settings is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-logging-config-m2-l5",
            "slug": "py-logging-config-m2-l5",
            "title": "A Configured Mini Application",
            "concept": "A configured mini application ties the track together: it reads settings, configures logging from them, and logs what it does. Configuration and logging are the two pieces that turn a script into a service.",
            "syntax": "logging.basicConfig(level=config_level)",
            "exampleCode": "import logging, io\n\nbuf = io.StringIO()\nlogging.basicConfig(level=logging.INFO, stream=buf, format=\"%(message)s\")\nlogging.info(\"app started\")\nprint(buf.getvalue().strip())\n",
            "exampleLanguage": "python",
            "mistake": "Configuring logging after the first log call, when basicConfig no longer has any effect.",
            "bug": {
              "prompt": "The code below should configure logging to a buffer and log 'app started', but it gives the wrong result. What is the bug?",
              "buggyCode": "import logging, io\n\nbuf = io.StringIO()\nlogging.info(\"app started\")\nlogging.basicConfig(level=logging.INFO, stream=buf, format=\"%(message)s\")\nprint(buf.getvalue().strip())\n",
              "fixedCode": "import logging, io\n\nbuf = io.StringIO()\nlogging.basicConfig(level=logging.INFO, stream=buf, format=\"%(message)s\")\nlogging.info(\"app started\")\nprint(buf.getvalue().strip())\n",
              "explanation": "Logging before basicConfig runs means the message goes to the default handler, not the buffer, so the buffer stays empty."
            },
            "exercise": {
              "title": "Practise A Configured Mini Application",
              "type": "write-code",
              "instructions": "Read a message from stdin, log it at INFO to a buffer with a message-only format, and print the buffer stripped.",
              "starterCode": "import logging, io, sys\n\n# TODO: read message, basicConfig to buffer, logging.info(message), print buffer\n",
              "solution": "import logging, io, sys\n\nmessage = sys.stdin.read().strip()\nbuf = io.StringIO()\nlogging.basicConfig(level=logging.INFO, stream=buf, format=\"%(message)s\")\nlogging.info(message)\nprint(buf.getvalue().strip())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "app started",
                  "hidden": false,
                  "stdin": "app started"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "job done",
                  "hidden": true,
                  "stdin": "job done"
                }
              ],
              "hintNotes": {
                "concept": "A Configured Mini Application is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Configured Greeter",
      "type": "build-program",
      "instructions": "Build a configured greeter: read a name and a log level (two lines) from stdin, configure logging to a buffer at that level, log 'greeted NAME' at INFO, and print the buffer stripped (empty if the level hides INFO).",
      "starterCode": "import logging, io, sys\n\n# TODO: read name + level, basicConfig to buffer at level, log 'greeted NAME', print buffer\n",
      "solution": "import logging, io, sys\n\nlines = sys.stdin.read().strip().splitlines()\nname, level = lines[0], getattr(logging, lines[1])\nbuf = io.StringIO()\nlogging.basicConfig(level=level, stream=buf, format=\"%(message)s\")\nlogging.info(f\"greeted {name}\")\nprint(buf.getvalue().strip())\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "greeted ada",
          "hidden": false,
          "stdin": "ada\nINFO"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "",
          "hidden": true,
          "stdin": "bob\nWARNING"
        }
      ],
      "hintNotes": {
        "concept": "Configured Greeter is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Configured Greeter Capstone Project",
      "description": "A small end-to-end configured program that logs a greeting at a chosen level.",
      "requirements": [
        "Configure logging from the input level.",
        "Apply at least three of these skills: logging levels, Loggers, Handlers, Formatters.",
        "Log 'greeted NAME' at INFO level.",
        "Print the buffer contents, which is empty when the level hides INFO."
      ],
      "rubric": [
        "Program runs and logs correctly at the chosen level.",
        "Code is clear, well-named, and organised into functions.",
        "A WARNING level correctly hides the INFO message.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-packaging",
    "slug": "py-packaging",
    "language": "python",
    "category": "languages",
    "title": "Packaging and pip",
    "description": "Learn how Python code is packaged and shared: modules, packages, pyproject.toml, entry points, versioning, wheels, requirements files, and virtual environments, using only the standard library.",
    "difficulty": "Advanced",
    "estimatedHours": 16,
    "skills": [
      "Modules and packages",
      "pyproject.toml",
      "Entry points",
      "Versioning",
      "Wheels",
      "Requirements files",
      "Virtual environments",
      "Publishing checklist"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to wrap a gift properly: the present matters, but nobody can use it until the box opens cleanly.",
    "modules": [
      {
        "id": "py-packaging-m1",
        "title": "Fundamentals of Packaging and pip",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-packaging-m1-l1",
            "slug": "py-packaging-m1-l1",
            "title": "How Python Finds Modules",
            "concept": "Python finds modules by searching sys.path, which starts with the script's directory and then the installed packages. Understanding sys.path explains most import errors.",
            "syntax": "import sys\nprint(sys.path[0])",
            "exampleCode": "import sys\n\nprint(isinstance(sys.path, list))\nprint(len(sys.path) > 0)\n",
            "exampleLanguage": "python",
            "mistake": "Importing a module from a directory that is not on sys.path and wondering why it fails.",
            "bug": {
              "prompt": "The code below should print whether sys.path is a list and whether it is non-empty, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sys\n\nprint(isinstance(sys.path, tuple))\nprint(len(sys.path) > 0)\n",
              "fixedCode": "import sys\n\nprint(isinstance(sys.path, list))\nprint(len(sys.path) > 0)\n",
              "explanation": "sys.path is a list, not a tuple, so the isinstance check with tuple prints False."
            },
            "exercise": {
              "title": "Practise How Python Finds Modules",
              "type": "write-code",
              "instructions": "Print True if sys.path is a list.",
              "starterCode": "import sys\n\n# TODO: print isinstance(sys.path, list)\n",
              "solution": "import sys\n\nprint(isinstance(sys.path, list))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "True",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "True",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "How Python Finds Modules is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-packaging-m1-l2",
            "slug": "py-packaging-m1-l2",
            "title": "Packages and __init__.py",
            "concept": "A package is a directory with an __init__.py file, which lets its modules be imported with dotted names. The __init__.py file can be empty or can expose the package's public names.",
            "syntax": "from mypkg import helper",
            "exampleCode": "import sys, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    pkg = Path(d) / \"mypkg\"\n    pkg.mkdir()\n    (pkg / \"__init__.py\").write_text(\"VALUE = 42\\n\")\n    (pkg / \"helper.py\").write_text(\"def double(n):\\n    return n * 2\\n\")\n    sys.path.insert(0, d)\n    import mypkg.helper as helper\n    print(mypkg.VALUE, helper.double(21))\n    sys.path.remove(d)\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting __init__.py in a package directory, so its modules cannot be imported as a package.",
            "bug": {
              "prompt": "The code below should create a package with VALUE 42 and a doubling helper, import it, and print both results, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sys, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    pkg = Path(d) / \"mypkg\"\n    pkg.mkdir()\n    (pkg / \"helper.py\").write_text(\"def double(n):\\n    return n * 2\\n\")\n    sys.path.insert(0, d)\n    import mypkg.helper as helper\n    print(helper.double(21))\n    sys.path.remove(d)\n",
              "fixedCode": "import sys, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    pkg = Path(d) / \"mypkg\"\n    pkg.mkdir()\n    (pkg / \"__init__.py\").write_text(\"VALUE = 42\\n\")\n    (pkg / \"helper.py\").write_text(\"def double(n):\\n    return n * 2\\n\")\n    sys.path.insert(0, d)\n    import mypkg.helper as helper\n    print(mypkg.VALUE, helper.double(21))\n    sys.path.remove(d)\n",
              "explanation": "Without __init__.py the directory is not a regular package, so importing mypkg.helper fails."
            },
            "exercise": {
              "title": "Practise Packages and __init__.py",
              "type": "write-code",
              "instructions": "Create a package 'calc' in a temp directory with add(a, b) in a submodule, import it, and print add(2, 3).",
              "starterCode": "import sys, tempfile\nfrom pathlib import Path\n\n# TODO: build calc package with ops.add, import, print add(2, 3)\n",
              "solution": "import sys, tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    pkg = Path(d) / \"calc\"\n    pkg.mkdir()\n    (pkg / \"__init__.py\").write_text(\"\")\n    (pkg / \"ops.py\").write_text(\"def add(a, b):\\n    return a + b\\n\")\n    sys.path.insert(0, d)\n    from calc import ops\n    print(ops.add(2, 3))\n    sys.path.remove(d)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "5",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "5",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Packages and __init__.py is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-packaging-m1-l3",
            "slug": "py-packaging-m1-l3",
            "title": "Reading pyproject.toml with tomllib",
            "concept": "pyproject.toml describes a project in TOML format, and tomllib in the standard library parses it into a dict. Reading the project table gives the name, version, and dependencies without any extra tool.",
            "syntax": "tomllib.loads(text)[\"project\"][\"name\"]",
            "exampleCode": "import tomllib\n\ntext = '[project]\\nname = \"demo\"\\nversion = \"1.2.3\"\\n'\ndata = tomllib.loads(text)\nprint(data[\"project\"][\"name\"], data[\"project\"][\"version\"])\n",
            "exampleLanguage": "python",
            "mistake": "Parsing TOML by hand with string splits instead of using tomllib.",
            "bug": {
              "prompt": "The code below should parse a pyproject snippet and print the project name and version, but it gives the wrong result. What is the bug?",
              "buggyCode": "import tomllib\n\ntext = '[project]\\nname = \"demo\"\\nversion = \"1.2.3\"\\n'\ndata = tomllib.loads(text)\nprint(data[\"project\"][\"version\"], data[\"project\"][\"name\"])\n",
              "fixedCode": "import tomllib\n\ntext = '[project]\\nname = \"demo\"\\nversion = \"1.2.3\"\\n'\ndata = tomllib.loads(text)\nprint(data[\"project\"][\"name\"], data[\"project\"][\"version\"])\n",
              "explanation": "The two values are printed in the wrong order, so the output is '1.2.3 demo' instead of 'demo 1.2.3'."
            },
            "exercise": {
              "title": "Check your understanding of Reading pyproject.toml with tomllib",
              "type": "multiple-choice",
              "instructions": "Which statement about Reading pyproject.toml with tomllib is correct?",
              "starterCode": "",
              "solution": "pyproject.",
              "solutionExplanation": "pyproject. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "pyproject.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Reading pyproject.toml with tomllib actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "pyproject.",
                "Reading pyproject.toml with tomllib can only be used once in a program",
                "Reading pyproject.toml with tomllib requires a separate paid licence to use",
                "Reading pyproject.toml with tomllib only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-packaging-m1-l4",
            "slug": "py-packaging-m1-l4",
            "title": "Entry Points",
            "concept": "An entry point turns a function into a command on the PATH, so users type a short name instead of python -m. The pyproject [project.scripts] table maps the command name to the function that runs it.",
            "syntax": "[project.scripts]\nmytool = \"mypkg.cli:main\"",
            "exampleCode": "import tomllib\n\ntext = '[project.scripts]\\nmytool = \"mypkg.cli:main\"\\n'\ndata = tomllib.loads(text)\nprint(data[\"project\"][\"scripts\"][\"mytool\"])\n",
            "exampleLanguage": "python",
            "mistake": "Pointing an entry point at a module instead of a function, so running the command fails.",
            "bug": {
              "prompt": "The code below should parse a [project.scripts] snippet and print the mytool target, but it gives the wrong result. What is the bug?",
              "buggyCode": "import tomllib\n\ntext = '[project.scripts]\\nmytool = \"mypkg.cli\"\\n'\ndata = tomllib.loads(text)\nprint(data[\"project\"][\"scripts\"][\"mytool\"])\n",
              "fixedCode": "import tomllib\n\ntext = '[project.scripts]\\nmytool = \"mypkg.cli:main\"\\n'\ndata = tomllib.loads(text)\nprint(data[\"project\"][\"scripts\"][\"mytool\"])\n",
              "explanation": "The target is missing the ':main' function part, so the entry point names a module instead of a callable."
            },
            "exercise": {
              "title": "Practise Entry Points",
              "type": "write-code",
              "instructions": "Read a command name and a target (two lines) from stdin, build a TOML [project.scripts] snippet, parse it with tomllib, and print the target for that command.",
              "starterCode": "import sys, tomllib\n\n# TODO: read name + target, build TOML, parse, print scripts[name]\n",
              "solution": "import sys, tomllib\n\nlines = sys.stdin.read().strip().splitlines()\ntext = f'[project.scripts]\\n{lines[0]} = \"{lines[1]}\"\\n'\ndata = tomllib.loads(text)\nprint(data[\"project\"][\"scripts\"][lines[0]])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "mypkg.cli:main",
                  "hidden": false,
                  "stdin": "mytool\nmypkg.cli:main"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "app:main",
                  "hidden": true,
                  "stdin": "run\napp:main"
                }
              ],
              "hintNotes": {
                "concept": "Entry Points is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-packaging-m1-l5",
            "slug": "py-packaging-m1-l5",
            "title": "Versioning a Package",
            "concept": "A version number such as 1.2.3 follows semantic versioning: major for breaking changes, minor for new features, and patch for fixes. Comparing versions as tuples of numbers avoids the trap of comparing them as strings.",
            "syntax": "(1, 2, 3) > (1, 2, 2)",
            "exampleCode": "print((1, 10, 0) > (1, 9, 0))\nprint(\"1.10.0\" > \"1.9.0\")\n",
            "exampleLanguage": "python",
            "mistake": "Comparing version strings alphabetically, where '1.10.0' sorts before '1.9.0'.",
            "bug": {
              "prompt": "The code below should compare versions 1.10.0 and 1.9.0 as tuples and as strings, and print both results, but it gives the wrong result. What is the bug?",
              "buggyCode": "print((1, 10, 0) > (1, 9, 0))\nprint(\"1.10.0\" < \"1.9.0\")\n",
              "fixedCode": "print((1, 10, 0) > (1, 9, 0))\nprint(\"1.10.0\" > \"1.9.0\")\n",
              "explanation": "As strings '1.10.0' is less than '1.9.0' because '1' sorts before '9', so the second comparison prints False."
            },
            "exercise": {
              "title": "Check your understanding of Versioning a Package",
              "type": "multiple-choice",
              "instructions": "Which statement about Versioning a Package is correct?",
              "starterCode": "",
              "solution": "A version number such as 1.",
              "solutionExplanation": "A version number such as 1. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A version number such as 1.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Versioning a Package actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A version number such as 1.",
                "Versioning a Package can only be used once in a program",
                "Versioning a Package requires a separate paid licence to use",
                "Versioning a Package only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-packaging-m2",
        "title": "Packaging and pip in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-packaging-m2-l1",
            "slug": "py-packaging-m2-l1",
            "title": "Building a Wheel Conceptually",
            "concept": "A wheel is a zip archive with a standard layout: the package files plus a .dist-info directory holding metadata. Building one is mostly copying files into the right shape, which is why tools do it for you.",
            "syntax": "zipfile.ZipFile(\"pkg-1.0-py3-none-any.whl\", \"w\")",
            "exampleCode": "import io, zipfile\n\nbuf = io.BytesIO()\nwith zipfile.ZipFile(buf, \"w\") as z:\n    z.writestr(\"mypkg/__init__.py\", \"\")\n    z.writestr(\"mypkg-1.0.dist-info/METADATA\", \"Name: mypkg\\n\")\nprint(sorted(zipfile.ZipFile(io.BytesIO(buf.getvalue())).namelist()))\n",
            "exampleLanguage": "python",
            "mistake": "Shipping a package as a loose folder of files instead of a wheel, which is hard to install reliably.",
            "bug": {
              "prompt": "The code below should build a wheel-like zip in memory and print its sorted file list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import io, zipfile\n\nbuf = io.BytesIO()\nwith zipfile.ZipFile(buf, \"w\") as z:\n    z.writestr(\"mypkg/__init__.py\", \"\")\nprint(sorted(zipfile.ZipFile(io.BytesIO(buf.getvalue())).namelist()))\n",
              "fixedCode": "import io, zipfile\n\nbuf = io.BytesIO()\nwith zipfile.ZipFile(buf, \"w\") as z:\n    z.writestr(\"mypkg/__init__.py\", \"\")\n    z.writestr(\"mypkg-1.0.dist-info/METADATA\", \"Name: mypkg\\n\")\nprint(sorted(zipfile.ZipFile(io.BytesIO(buf.getvalue())).namelist()))\n",
              "explanation": "Without the .dist-info METADATA file the archive has no package name or version, so installers cannot identify it."
            },
            "exercise": {
              "title": "Practise Building a Wheel Conceptually",
              "type": "write-code",
              "instructions": "Read a package name from stdin, build a wheel-like zip in memory containing '<name>/__init__.py' and '<name>-1.0.dist-info/METADATA', and print the sorted file list.",
              "starterCode": "import io, sys, zipfile\n\n# TODO: read name, build zip with __init__.py + METADATA, print sorted namelist\n",
              "solution": "import io, sys, zipfile\n\nname = sys.stdin.read().strip()\nbuf = io.BytesIO()\nwith zipfile.ZipFile(buf, \"w\") as z:\n    z.writestr(f\"{name}/__init__.py\", \"\")\n    z.writestr(f\"{name}-1.0.dist-info/METADATA\", f\"Name: {name}\\n\")\nprint(sorted(zipfile.ZipFile(io.BytesIO(buf.getvalue())).namelist()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['mypkg-1.0.dist-info/METADATA', 'mypkg/__init__.py']",
                  "hidden": false,
                  "stdin": "mypkg"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['demo-1.0.dist-info/METADATA', 'demo/__init__.py']",
                  "hidden": true,
                  "stdin": "demo"
                }
              ],
              "hintNotes": {
                "concept": "Building a Wheel Conceptually is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-packaging-m2-l2",
            "slug": "py-packaging-m2-l2",
            "title": "Requirements Files",
            "concept": "A requirements file lists the packages a project needs, one per line, optionally with version pins. Pinning versions makes installs reproducible, so the same file installs the same packages everywhere.",
            "syntax": "requests==2.31.0",
            "exampleCode": "lines = [\"flask==3.0.0\", \"requests>=2.0\", \"numpy\"]\nprint([line.split(\"==\")[0].split(\">=\")[0] for line in lines])\n",
            "exampleLanguage": "python",
            "mistake": "Pinning no versions at all, so a fresh install can pull breaking changes.",
            "bug": {
              "prompt": "The code below should extract the package names from three requirement lines and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "lines = [\"flask==3.0.0\", \"requests>=2.0\", \"numpy\"]\nprint([line.split(\"==\")[0] for line in lines])\n",
              "fixedCode": "lines = [\"flask==3.0.0\", \"requests>=2.0\", \"numpy\"]\nprint([line.split(\"==\")[0].split(\">=\")[0] for line in lines])\n",
              "explanation": "Splitting only on '==' leaves 'requests>=2.0' whole, so the name comes out with its version constraint attached."
            },
            "exercise": {
              "title": "Practise Requirements Files",
              "type": "write-code",
              "instructions": "Read requirement lines from stdin, strip version constraints (==, >=, <=, ~=, !=, >), and print the package names as a list.",
              "starterCode": "import re, sys\n\n# TODO: read lines, strip version specifiers, print names list\n",
              "solution": "import re, sys\n\nnames = [re.split(r\"[=<>~!]+\", line.strip())[0] for line in sys.stdin.read().strip().splitlines()]\nprint(names)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['flask', 'requests', 'numpy']",
                  "hidden": false,
                  "stdin": "flask==3.0.0\nrequests>=2.0\nnumpy"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['pandas', 'django']",
                  "hidden": true,
                  "stdin": "pandas~=2.0\ndjango"
                }
              ],
              "hintNotes": {
                "concept": "Requirements Files is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-packaging-m2-l3",
            "slug": "py-packaging-m2-l3",
            "title": "Virtual Environments",
            "concept": "A virtual environment is an isolated Python installation with its own packages, created with python -m venv. One environment per project stops packages from different projects fighting each other.",
            "syntax": "python3 -m venv .venv",
            "exampleCode": "import sysconfig\n\nprint(sorted(sysconfig.get_path_names()))\n",
            "exampleLanguage": "python",
            "mistake": "Installing project packages into the system Python instead of a virtual environment.",
            "bug": {
              "prompt": "The code below should print the sorted list of sysconfig path names, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sysconfig\n\nprint(sysconfig.get_path_names())\n",
              "fixedCode": "import sysconfig\n\nprint(sorted(sysconfig.get_path_names()))\n",
              "explanation": "The path names are not sorted, so the list order depends on the dict instead of being alphabetical."
            },
            "exercise": {
              "title": "Check your understanding of Virtual Environments",
              "type": "multiple-choice",
              "instructions": "Which statement about Virtual Environments is correct?",
              "starterCode": "",
              "solution": "A virtual environment is an isolated Python installation with its own packages, created with python -m venv.",
              "solutionExplanation": "A virtual environment is an isolated Python installation with its own packages, created with python -m venv. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A virtual environment is an isolated Python installation with its own packages, created with python -m venv.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Virtual Environments actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A virtual environment is an isolated Python installation with its own packages, created with python -m venv.",
                "Virtual Environments can only be used once in a program",
                "Virtual Environments requires a separate paid licence to use",
                "Virtual Environments only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-packaging-m2-l4",
            "slug": "py-packaging-m2-l4",
            "title": "Publishing Checklist",
            "concept": "Publishing a package means checking the name is free, the version is bumped, the README renders, and the wheel installs cleanly. A checklist turns a scary release into a routine one.",
            "syntax": "twine check dist/*",
            "exampleCode": "import tomllib\n\ntext = '[project]\\nname = \"demo\"\\nversion = \"0.1.0\"\\ndescription = \"A demo\"\\n'\ndata = tomllib.loads(text)\nproject = data[\"project\"]\nprint(project[\"name\"], project[\"version\"], \"description\" in project)\n",
            "exampleLanguage": "python",
            "mistake": "Publishing without a README or a description, so the package page is empty.",
            "bug": {
              "prompt": "The code below should parse a project table and print the name, version, and whether it has a description, but it gives the wrong result. What is the bug?",
              "buggyCode": "import tomllib\n\ntext = '[project]\\nname = \"demo\"\\nversion = \"0.1.0\"\\n'\ndata = tomllib.loads(text)\nproject = data[\"project\"]\nprint(project[\"name\"], project[\"version\"], \"description\" in project)\n",
              "fixedCode": "import tomllib\n\ntext = '[project]\\nname = \"demo\"\\nversion = \"0.1.0\"\\ndescription = \"A demo\"\\n'\ndata = tomllib.loads(text)\nproject = data[\"project\"]\nprint(project[\"name\"], project[\"version\"], \"description\" in project)\n",
              "explanation": "Without the description field the check prints False, which is exactly what the publishing checklist is meant to catch."
            },
            "exercise": {
              "title": "Practise Publishing Checklist",
              "type": "write-code",
              "instructions": "Read a project name and version from stdin (two lines), build a TOML project table with them, parse it, and print 'name version'.",
              "starterCode": "import sys, tomllib\n\n# TODO: read name + version, build TOML, parse, print name and version\n",
              "solution": "import sys, tomllib\n\nlines = sys.stdin.read().strip().splitlines()\ntext = f'[project]\\nname = \"{lines[0]}\"\\nversion = \"{lines[1]}\"\\n'\ndata = tomllib.loads(text)\nprint(data[\"project\"][\"name\"], data[\"project\"][\"version\"])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "demo 1.2.3",
                  "hidden": false,
                  "stdin": "demo\n1.2.3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "tool 0.1.0",
                  "hidden": true,
                  "stdin": "tool\n0.1.0"
                }
              ],
              "hintNotes": {
                "concept": "Publishing Checklist is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-packaging-m2-l5",
            "slug": "py-packaging-m2-l5",
            "title": "A Complete Package Layout",
            "concept": "A complete package layout has a source directory, a pyproject.toml, a README, and tests, all in the right places. The layout is the same whether the package is tiny or huge, which is why learning it once pays off forever.",
            "syntax": "mypkg/\n  __init__.py\npyproject.toml",
            "exampleCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    root = Path(d)\n    (root / \"mypkg\").mkdir()\n    (root / \"mypkg\" / \"__init__.py\").write_text(\"\")\n    (root / \"pyproject.toml\").write_text('[project]\\nname = \"mypkg\"\\n')\n    print(sorted(p.name for p in root.iterdir()))\n",
            "exampleLanguage": "python",
            "mistake": "Putting the package code at the top level instead of inside a package directory.",
            "bug": {
              "prompt": "The code below should create a package layout in a temp directory and print the sorted top-level names, but it gives the wrong result. What is the bug?",
              "buggyCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    root = Path(d)\n    (root / \"mypkg.py\").write_text(\"\")\n    (root / \"pyproject.toml\").write_text('[project]\\nname = \"mypkg\"\\n')\n    print(sorted(p.name for p in root.iterdir()))\n",
              "fixedCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    root = Path(d)\n    (root / \"mypkg\").mkdir()\n    (root / \"mypkg\" / \"__init__.py\").write_text(\"\")\n    (root / \"pyproject.toml\").write_text('[project]\\nname = \"mypkg\"\\n')\n    print(sorted(p.name for p in root.iterdir()))\n",
              "explanation": "A single mypkg.py module is not a package, so the layout is missing the package directory entirely."
            },
            "exercise": {
              "title": "Practise A Complete Package Layout",
              "type": "write-code",
              "instructions": "Read a package name from stdin, create a layout in a temp directory (package dir with __init__.py plus pyproject.toml), and print the sorted top-level names.",
              "starterCode": "import sys, tempfile\nfrom pathlib import Path\n\n# TODO: read name, build layout in temp dir, print sorted top-level names\n",
              "solution": "import sys, tempfile\nfrom pathlib import Path\n\nname = sys.stdin.read().strip()\nwith tempfile.TemporaryDirectory() as d:\n    root = Path(d)\n    (root / name).mkdir()\n    (root / name / \"__init__.py\").write_text(\"\")\n    (root / \"pyproject.toml\").write_text(f'[project]\\nname = \"{name}\"\\n')\n    print(sorted(p.name for p in root.iterdir()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['mypkg', 'pyproject.toml']",
                  "hidden": false,
                  "stdin": "mypkg"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['demo', 'pyproject.toml']",
                  "hidden": true,
                  "stdin": "demo"
                }
              ],
              "hintNotes": {
                "concept": "A Complete Package Layout is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Package Metadata Reader",
      "type": "build-program",
      "instructions": "Build a package metadata reader: read TOML text from stdin describing [project] with name, version, and dependencies, and print 'name version' plus 'deps: N'.",
      "starterCode": "import sys, tomllib\n\n# TODO: read TOML from stdin, parse, print 'name version' and 'deps: N'\n",
      "solution": "import sys, tomllib\n\ndata = tomllib.loads(sys.stdin.read())\nproject = data[\"project\"]\nprint(project[\"name\"], project[\"version\"])\nprint(f\"deps: {len(project.get('dependencies', []))}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "demo 1.2.3\ndeps: 2",
          "hidden": false,
          "stdin": "[project]\nname = \"demo\"\nversion = \"1.2.3\"\ndependencies = [\"requests\", \"click\"]"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "tool 0.1.0\ndeps: 0",
          "hidden": true,
          "stdin": "[project]\nname = \"tool\"\nversion = \"0.1.0\""
        }
      ],
      "hintNotes": {
        "concept": "Package Metadata Reader is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Package Metadata Reader Capstone Project",
      "description": "A small end-to-end packaging program that reads project metadata from pyproject.toml text.",
      "requirements": [
        "Parse the TOML with tomllib from the standard library.",
        "Apply at least three of these skills: pyproject.toml, Versioning, Requirements files, Modules and packages.",
        "Print the name and version on the first line.",
        "Print the dependency count as 'deps: N' on the second line."
      ],
      "rubric": [
        "Program runs and prints the correct name, version, and dep count.",
        "Code is clear, well-named, and organised into functions.",
        "A project without dependencies prints 'deps: 0'.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-performance",
    "slug": "py-performance",
    "language": "python",
    "category": "languages",
    "title": "Performance and Profiling",
    "description": "Learn to find and fix slow Python code: measuring correctly, profiling with cProfile, reading pstats, big-O thinking, caching, generators, slots, and choosing the right data structure.",
    "difficulty": "Advanced",
    "estimatedHours": 22,
    "skills": [
      "timeit",
      "cProfile",
      "pstats",
      "Big-O analysis",
      "functools.lru_cache",
      "Generators",
      "__slots__",
      "Data structure choice"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to tune a race car: measure first, change one thing at a time, and never trust a guess about what is slow.",
    "modules": [
      {
        "id": "py-performance-m1",
        "title": "Fundamentals of Performance and Profiling",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-performance-m1-l1",
            "slug": "py-performance-m1-l1",
            "title": "Measuring Time Correctly",
            "concept": "Correct measurement means timing a representative workload more than once and reporting counts or ratios, not a single wall-clock reading. One timing run is noise; many runs are evidence.",
            "syntax": "timeit.timeit(stmt, number=1000)",
            "exampleCode": "import timeit\n\nprint(timeit.timeit(\"sum(range(100))\", number=100) > 0)\n",
            "exampleLanguage": "python",
            "mistake": "Timing a single run and concluding the code is slow based on one noisy measurement.",
            "bug": {
              "prompt": "The code below should time summing range(100) one hundred times and print whether the time is positive, but it gives the wrong result. What is the bug?",
              "buggyCode": "import timeit\n\nprint(timeit.timeit(\"sum(range(100))\", number=100) == 0)\n",
              "fixedCode": "import timeit\n\nprint(timeit.timeit(\"sum(range(100))\", number=100) > 0)\n",
              "explanation": "A real timing is always greater than zero, so checking for equality with zero prints False."
            },
            "exercise": {
              "title": "Practise Measuring Time Correctly",
              "type": "write-code",
              "instructions": "Use timeit to time 'sum(range(100))' with number=100 and print True if the result is greater than 0.",
              "starterCode": "import timeit\n\n# TODO: print timeit.timeit('sum(range(100))', number=100) > 0\n",
              "solution": "import timeit\n\nprint(timeit.timeit(\"sum(range(100))\", number=100) > 0)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "True",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "True",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Measuring Time Correctly is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-performance-m1-l2",
            "slug": "py-performance-m1-l2",
            "title": "Profiling with cProfile",
            "concept": "cProfile records how many times each function is called and how long each call takes, which shows exactly where a program spends its time. Profiling replaces guessing with a ranked list of hot spots.",
            "syntax": "cProfile.run(\"main()\")",
            "exampleCode": "import cProfile, io, pstats\n\ndef work():\n    return sum(range(100))\n\npr = cProfile.Profile()\npr.enable()\nwork()\npr.disable()\nprint(pr.getstats() != [])\n",
            "exampleLanguage": "python",
            "mistake": "Optimising a function that profiling shows is rarely called.",
            "bug": {
              "prompt": "The code below should profile a call to work() and print whether any stats were recorded, but it gives the wrong result. What is the bug?",
              "buggyCode": "import cProfile, io, pstats\n\ndef work():\n    return sum(range(100))\n\npr = cProfile.Profile()\nwork()\nprint(pr.getstats() != [])\n",
              "fixedCode": "import cProfile, io, pstats\n\ndef work():\n    return sum(range(100))\n\npr = cProfile.Profile()\npr.enable()\nwork()\npr.disable()\nprint(pr.getstats() != [])\n",
              "explanation": "Without enabling the profiler no stats are recorded, so the check prints False."
            },
            "exercise": {
              "title": "Practise Profiling with cProfile",
              "type": "write-code",
              "instructions": "Profile a function that returns sum(range(50)) and print True if the profiler recorded any stats.",
              "starterCode": "import cProfile\n\ndef work():\n    return sum(range(50))\n\n# TODO: enable a Profile, call work(), disable, print pr.getstats() != []\n",
              "solution": "import cProfile\n\ndef work():\n    return sum(range(50))\n\npr = cProfile.Profile()\npr.enable()\nwork()\npr.disable()\nprint(pr.getstats() != [])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "True",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "True",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Profiling with cProfile is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-performance-m1-l3",
            "slug": "py-performance-m1-l3",
            "title": "Counting Calls with pstats",
            "concept": "pstats reads a profile and sorts it, so the most-called or slowest functions rise to the top. Call counts are exact, which makes them a reliable way to spot accidental quadratic behaviour.",
            "syntax": "stats = pstats.Stats(pr)\nstats.sort_stats(\"calls\")",
            "exampleCode": "import cProfile, pstats\n\ndef leaf():\n    return 1\n\ndef work():\n    for _ in range(3):\n        leaf()\n\npr = cProfile.Profile()\npr.enable()\nwork()\npr.disable()\nstats = pstats.Stats(pr)\nprint(stats.total_calls > 0)\n",
            "exampleLanguage": "python",
            "mistake": "Reading the total time column without checking the call counts that explain it.",
            "bug": {
              "prompt": "The code below should profile work() calling leaf() 3 times and print whether total_calls is greater than 0, but it gives the wrong result. What is the bug?",
              "buggyCode": "import cProfile, pstats\n\ndef leaf():\n    return 1\n\ndef work():\n    for _ in range(3):\n        leaf()\n\npr = cProfile.Profile()\nprint(pstats.Stats(pr).total_calls > 0)\n",
              "fixedCode": "import cProfile, pstats\n\ndef leaf():\n    return 1\n\ndef work():\n    for _ in range(3):\n        leaf()\n\npr = cProfile.Profile()\npr.enable()\nwork()\npr.disable()\nstats = pstats.Stats(pr)\nprint(stats.total_calls > 0)\n",
              "explanation": "Stats built from a profiler that never ran has zero calls, so the check prints False."
            },
            "exercise": {
              "title": "Check your understanding of Counting Calls with pstats",
              "type": "multiple-choice",
              "instructions": "Which statement about Counting Calls with pstats is correct?",
              "starterCode": "",
              "solution": "pstats reads a profile and sorts it, so the most-called or slowest functions rise to the top.",
              "solutionExplanation": "pstats reads a profile and sorts it, so the most-called or slowest functions rise to the top. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "pstats reads a profile and sorts it, so the most-called or slowest functions rise to the top.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Counting Calls with pstats actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "pstats reads a profile and sorts it, so the most-called or slowest functions rise to the top.",
                "Counting Calls with pstats can only be used once in a program",
                "Counting Calls with pstats requires a separate paid licence to use",
                "Counting Calls with pstats only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-performance-m1-l4",
            "slug": "py-performance-m1-l4",
            "title": "Big-O Thinking",
            "concept": "Big-O describes how work grows with input size: linear work doubles when the input doubles, while quadratic work quadruples. Knowing the complexity of an approach matters more than micro-optimising the wrong one.",
            "syntax": "O(n) vs O(n*n)",
            "exampleCode": "def linear(n):\n    return sum(range(n))\n\ndef quadratic(n):\n    return sum(1 for _ in range(n) for _ in range(n))\n\nprint(linear(5), quadratic(3))\n",
            "exampleLanguage": "python",
            "mistake": "Choosing a quadratic algorithm for a large input and then optimising its constants.",
            "bug": {
              "prompt": "The code below should print the results of a linear sum to 5 and a quadratic count for 3, but it gives the wrong result. What is the bug?",
              "buggyCode": "def linear(n):\n    return sum(range(n))\n\ndef quadratic(n):\n    return sum(1 for _ in range(n) for _ in range(n))\n\nprint(linear(5), quadratic(2))\n",
              "fixedCode": "def linear(n):\n    return sum(range(n))\n\ndef quadratic(n):\n    return sum(1 for _ in range(n) for _ in range(n))\n\nprint(linear(5), quadratic(3))\n",
              "explanation": "Counting with n=2 gives 4 instead of the 9 that n=3 produces."
            },
            "exercise": {
              "title": "Practise Big-O Thinking",
              "type": "write-code",
              "instructions": "Read an integer n from stdin, count pairs with a double loop (n*n iterations), and print the count.",
              "starterCode": "import sys\n\n# TODO: read n, print sum(1 for _ in range(n) for _ in range(n))\n",
              "solution": "import sys\n\nn = int(sys.stdin.read().strip())\nprint(sum(1 for _ in range(n) for _ in range(n)))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "9",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "16",
                  "hidden": true,
                  "stdin": "4"
                }
              ],
              "hintNotes": {
                "concept": "Big-O Thinking is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-performance-m1-l5",
            "slug": "py-performance-m1-l5",
            "title": "Caching with lru_cache",
            "concept": "functools.lru_cache remembers the results of pure function calls, so repeated calls with the same arguments return instantly. Caching turns exponential recursion into linear work when subproblems repeat.",
            "syntax": "@functools.lru_cache(maxsize=None)",
            "exampleCode": "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(10))\nprint(fib.cache_info().hits >= 0)\n",
            "exampleLanguage": "python",
            "mistake": "Caching a function with unhashable arguments, which raises TypeError.",
            "bug": {
              "prompt": "The code below should compute fib(10) with lru_cache and print the result and whether hits is at least 0, but it gives the wrong result. What is the bug?",
              "buggyCode": "import functools\n\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(10))\nprint(fib.cache_info().hits >= 0)\n",
              "fixedCode": "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(10))\nprint(fib.cache_info().hits >= 0)\n",
              "explanation": "Without the lru_cache decorator the function has no cache_info attribute, so the second print raises AttributeError."
            },
            "exercise": {
              "title": "Check your understanding of Caching with lru_cache",
              "type": "multiple-choice",
              "instructions": "Which statement about Caching with lru_cache is correct?",
              "starterCode": "",
              "solution": "functools.",
              "solutionExplanation": "functools. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "functools.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Caching with lru_cache actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "functools.",
                "Caching with lru_cache can only be used once in a program",
                "Caching with lru_cache requires a separate paid licence to use",
                "Caching with lru_cache only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-performance-m2",
        "title": "Performance and Profiling in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-performance-m2-l1",
            "slug": "py-performance-m2-l1",
            "title": "Avoiding Quadratic Loops",
            "concept": "A quadratic loop often hides inside innocent code, such as checking membership in a list inside another loop. Replacing the list with a set turns the inner check into constant time and the whole loop into linear time.",
            "syntax": "seen = set(items)",
            "exampleCode": "items = [1, 2, 3, 2, 1]\nprint(len(set(items)))\nprint(len([x for x in items if x in [1, 2, 3]]))\n",
            "exampleLanguage": "python",
            "mistake": "Using 'in' on a list inside a loop over a large input.",
            "bug": {
              "prompt": "The code below should print the number of unique items and the count of items found in [1, 2, 3], but it gives the wrong result. What is the bug?",
              "buggyCode": "items = [1, 2, 3, 2, 1]\nprint(len(set(items)))\nprint(len([x for x in items if x in [1, 2]]))\n",
              "fixedCode": "items = [1, 2, 3, 2, 1]\nprint(len(set(items)))\nprint(len([x for x in items if x in [1, 2, 3]]))\n",
              "explanation": "Checking against [1, 2] instead of [1, 2, 3] misses the 3, so the count is 4 instead of 5."
            },
            "exercise": {
              "title": "Practise Avoiding Quadratic Loops",
              "type": "write-code",
              "instructions": "Read integers from stdin, count how many are in a set of the first three values, and print the unique count and the match count.",
              "starterCode": "import sys\n\n# TODO: read ints; print len(set(nums)) and count of nums in set(nums[:3])\n",
              "solution": "import sys\n\nnums = [int(x) for x in sys.stdin.read().split()]\nprint(len(set(nums)))\nprint(sum(1 for x in nums if x in set(nums[:3])))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "3\n5",
                  "hidden": false,
                  "stdin": "1 2 3 2 1"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2\n3",
                  "hidden": true,
                  "stdin": "5 5 6"
                }
              ],
              "hintNotes": {
                "concept": "Avoiding Quadratic Loops is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-performance-m2-l2",
            "slug": "py-performance-m2-l2",
            "title": "Generators for Memory",
            "concept": "A generator produces values one at a time instead of building a whole list, so it uses almost no memory on large inputs. Replacing a list comprehension with a generator expression is often a one-word fix for memory problems.",
            "syntax": "(x * x for x in range(n))",
            "exampleCode": "import sys\n\nprint(sys.getsizeof([x for x in range(1000)]))\nprint(sys.getsizeof((x for x in range(1000))) < 1000)\n",
            "exampleLanguage": "python",
            "mistake": "Building a huge list just to iterate over it once.",
            "bug": {
              "prompt": "The code below should print whether a generator over 1000 items is smaller than 1000 bytes, but it gives the wrong result. What is the bug?",
              "buggyCode": "import sys\n\nprint(sys.getsizeof((x for x in range(1000))) > 1000)\n",
              "fixedCode": "import sys\n\nprint(sys.getsizeof([x for x in range(1000)]))\nprint(sys.getsizeof((x for x in range(1000))) < 1000)\n",
              "explanation": "A generator object is tiny, so checking whether it is bigger than 1000 bytes prints False."
            },
            "exercise": {
              "title": "Practise Generators for Memory",
              "type": "write-code",
              "instructions": "Read an integer n from stdin, sum the squares of 0..n-1 with a generator expression, and print the total.",
              "starterCode": "import sys\n\n# TODO: read n, print sum(x * x for x in range(n))\n",
              "solution": "import sys\n\nn = int(sys.stdin.read().strip())\nprint(sum(x * x for x in range(n)))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "30",
                  "hidden": false,
                  "stdin": "5"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "285",
                  "hidden": true,
                  "stdin": "10"
                }
              ],
              "hintNotes": {
                "concept": "Generators for Memory is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-performance-m2-l3",
            "slug": "py-performance-m2-l3",
            "title": "Slots and Memory",
            "concept": "Defining __slots__ in a class stops Python from giving each instance a dict, which saves memory when millions of objects exist. Slots are a trade-off: instances become smaller but can no longer gain new attributes.",
            "syntax": "class Point:\n    __slots__ = (\"x\", \"y\")",
            "exampleCode": "class Point:\n    __slots__ = (\"x\", \"y\")\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\np = Point(3, 4)\nprint(p.x, p.y, hasattr(p, \"__dict__\"))\n",
            "exampleLanguage": "python",
            "mistake": "Adding __slots__ to a class that needs dynamic attributes, which then breaks.",
            "bug": {
              "prompt": "The code below should create a slotted Point(3, 4) and print x, y, and whether it has a __dict__, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\np = Point(3, 4)\nprint(p.x, p.y, hasattr(p, \"__dict__\"))\n",
              "fixedCode": "class Point:\n    __slots__ = (\"x\", \"y\")\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\np = Point(3, 4)\nprint(p.x, p.y, hasattr(p, \"__dict__\"))\n",
              "explanation": "Without __slots__ every instance gets a __dict__, so hasattr prints True and each object uses more memory."
            },
            "exercise": {
              "title": "Check your understanding of Slots and Memory",
              "type": "multiple-choice",
              "instructions": "Which statement about Slots and Memory is correct?",
              "starterCode": "",
              "solution": "Defining __slots__ in a class stops Python from giving each instance a dict, which saves memory when millions of objects exist.",
              "solutionExplanation": "Defining __slots__ in a class stops Python from giving each instance a dict, which saves memory when millions of objects exist. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Defining __slots__ in a class stops Python from giving each instance a dict, which saves memory when millions of objects exist.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Slots and Memory actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Defining __slots__ in a class stops Python from giving each instance a dict, which saves memory when millions of objects exist.",
                "Slots and Memory can only be used once in a program",
                "Slots and Memory requires a separate paid licence to use",
                "Slots and Memory only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-performance-m2-l4",
            "slug": "py-performance-m2-l4",
            "title": "Choosing the Right Data Structure",
            "concept": "The right data structure decides performance: a set for membership tests, a dict for lookups by key, a deque for queues, and a list for ordered sequences. Picking the structure that matches the operations is the biggest easy win in Python performance.",
            "syntax": "if key in my_set:",
            "exampleCode": "data = {\"a\": 1, \"b\": 2}\nprint(\"a\" in data, data.get(\"c\", 0))\n",
            "exampleLanguage": "python",
            "mistake": "Using a list for membership tests on a large collection instead of a set.",
            "bug": {
              "prompt": "The code below should check 'a' in a dict and get 'c' with a default of 0, but it gives the wrong result. What is the bug?",
              "buggyCode": "data = {\"a\": 1, \"b\": 2}\nprint(\"c\" in data, data.get(\"c\", 0))\n",
              "fixedCode": "data = {\"a\": 1, \"b\": 2}\nprint(\"a\" in data, data.get(\"c\", 0))\n",
              "explanation": "Checking 'c' instead of 'a' prints False for the membership test instead of True."
            },
            "exercise": {
              "title": "Practise Choosing the Right Data Structure",
              "type": "write-code",
              "instructions": "Read words from stdin, build a set, and print True if 'target' (the last word) is in the set of the other words, else False.",
              "starterCode": "import sys\n\n# TODO: read words; target = last word; print target in set(words[:-1])\n",
              "solution": "import sys\n\nwords = sys.stdin.read().split()\ntarget = words[-1]\nprint(target in set(words[:-1]))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "False",
                  "hidden": false,
                  "stdin": "apple banana apple target"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "False",
                  "hidden": true,
                  "stdin": "apple banana cherry"
                }
              ],
              "hintNotes": {
                "concept": "Choosing the Right Data Structure is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-performance-m2-l5",
            "slug": "py-performance-m2-l5",
            "title": "Optimising a Slow Function",
            "concept": "Optimising a slow function starts with profiling, then fixes the algorithm, and only then touches the details. The classic wins are caching repeated work, avoiding repeated attribute lookups, and using the right data structure.",
            "syntax": "cache = {}\nif key in cache:\n    return cache[key]",
            "exampleCode": "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(15))\n",
            "exampleLanguage": "python",
            "mistake": "Micro-optimising a function before checking whether it is even the bottleneck.",
            "bug": {
              "prompt": "The code below should compute fib(15) with a cached function and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import functools\n\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(15))\nprint(fib.cache_info().hits)\n",
              "fixedCode": "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(15))\nprint(fib.cache_info().hits)\n",
              "explanation": "The uncached function has no cache to report, so accessing cache_info raises AttributeError instead of printing the hit count."
            },
            "exercise": {
              "title": "Practise Optimising a Slow Function",
              "type": "write-code",
              "instructions": "Read an integer n from stdin, compute fib(n) with an lru_cache, and print the result.",
              "starterCode": "import functools, sys\n\n# TODO: cached fib, read n, print fib(n)\n",
              "solution": "import functools, sys\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nn = int(sys.stdin.read().strip())\nprint(fib(n))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "610",
                  "hidden": false,
                  "stdin": "15"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "55",
                  "hidden": true,
                  "stdin": "10"
                }
              ],
              "hintNotes": {
                "concept": "Optimising a Slow Function is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Call Counter Profiler",
      "type": "build-program",
      "instructions": "Build a call counter profiler: read an integer n from stdin, profile a cached fib(n) call with cProfile, and print the total call count as 'calls: N'.",
      "starterCode": "import cProfile, functools, pstats, sys\n\n# TODO: cached fib, profile fib(n), print 'calls: N' from pstats total_calls\n",
      "solution": "import cProfile, functools, pstats, sys\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nn = int(sys.stdin.read().strip())\npr = cProfile.Profile()\npr.enable()\nprint(fib(n))\npr.disable()\nstats = pstats.Stats(pr)\nprint(f\"calls: {stats.total_calls}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "55\ncalls: 13",
          "hidden": false,
          "stdin": "10"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "5\ncalls: 8",
          "hidden": true,
          "stdin": "5"
        }
      ],
      "hintNotes": {
        "concept": "Call Counter Profiler is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Call Counter Profiler Capstone Project",
      "description": "A small end-to-end profiling program that counts the calls made while computing a Fibonacci number.",
      "requirements": [
        "Profile the computation with cProfile.",
        "Apply at least three of these skills: cProfile, pstats, functools.lru_cache, Big-O analysis.",
        "Print the Fibonacci result on the first line.",
        "Print the total call count as 'calls: N' on the second line."
      ],
      "rubric": [
        "Program runs and prints the correct Fibonacci number and call count.",
        "Code is clear, well-named, and organised into functions.",
        "The call count comes from pstats, not a guess.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-design-patterns",
    "slug": "py-design-patterns",
    "language": "python",
    "category": "languages",
    "title": "Design Patterns in Python",
    "description": "Learn the classic design patterns in Python: Singleton, Factory, Builder, Adapter, Observer, Strategy, Decorator, and Command, with working examples of when each one earns its place.",
    "difficulty": "Advanced",
    "estimatedHours": 24,
    "skills": [
      "Singleton",
      "Factory Method",
      "Builder",
      "Adapter",
      "Observer",
      "Strategy",
      "Decorator pattern",
      "Command pattern"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning the standard moves in chess: the same few ideas appear in every game, and recognising them makes you faster.",
    "modules": [
      {
        "id": "py-design-patterns-m1",
        "title": "Fundamentals of Design Patterns in Python",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-design-patterns-m1-l1",
            "slug": "py-design-patterns-m1-l1",
            "title": "What Design Patterns Are",
            "concept": "A design pattern is a named, reusable solution to a common design problem, such as creating objects or notifying listeners. Patterns give teams a shared vocabulary, so 'use an Observer here' says in three words what would otherwise take a paragraph.",
            "syntax": "class Observer:\n    def update(self, event): ...",
            "exampleCode": "class Greeter:\n    def greet(self):\n        return \"hello\"\n\nprint(Greeter().greet())\n",
            "exampleLanguage": "python",
            "mistake": "Applying a pattern where a plain function would do, which adds complexity for no benefit.",
            "bug": {
              "prompt": "The code below should create a Greeter class and print its greeting, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Greeter:\n    def greet(self):\n        return \"hi\"\n\nprint(Greeter().greet())\n",
              "fixedCode": "class Greeter:\n    def greet(self):\n        return \"hello\"\n\nprint(Greeter().greet())\n",
              "explanation": "The method returns 'hi' instead of the 'hello' the task asks for."
            },
            "exercise": {
              "title": "Practise What Design Patterns Are",
              "type": "write-code",
              "instructions": "Read a word from stdin, return it from a Greeter.greet method, and print the greeting.",
              "starterCode": "class Greeter:\n    def greet(self, word):\n        # TODO: return word\n        return ''\n\n# TODO: read word, print Greeter().greet(word)\n",
              "solution": "import sys\n\nclass Greeter:\n    def greet(self, word):\n        return word\n\nprint(Greeter().greet(sys.stdin.read().strip()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "hello",
                  "hidden": false,
                  "stdin": "hello"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "welcome",
                  "hidden": true,
                  "stdin": "welcome"
                }
              ],
              "hintNotes": {
                "concept": "What Design Patterns Are is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-design-patterns-m1-l2",
            "slug": "py-design-patterns-m1-l2",
            "title": "Singleton",
            "concept": "A Singleton guarantees that a class has only one instance, usually for something that must be shared, such as a configuration object. In Python it is often implemented with __new__ or a module-level instance.",
            "syntax": "class Config:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance",
            "exampleCode": "class Config:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n\nprint(Config() is Config())\n",
            "exampleLanguage": "python",
            "mistake": "Creating a new instance in __new__ every time instead of reusing the stored one.",
            "bug": {
              "prompt": "The code below should check whether two Config() calls return the same object and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Config:\n    def __new__(cls):\n        return super().__new__(cls)\n\nprint(Config() is Config())\n",
              "fixedCode": "class Config:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n\nprint(Config() is Config())\n",
              "explanation": "Without storing the instance, every call builds a fresh object, so the identity check prints False."
            },
            "exercise": {
              "title": "Practise Singleton",
              "type": "write-code",
              "instructions": "Implement a Singleton counter class whose instances share one value, increment it twice through two references, and print the shared value.",
              "starterCode": "class Counter:\n    _instance = None\n    # TODO: __new__ reuses the stored instance; __init__ sets value = 0 once\n    pass\n\n# TODO: create two references, increment value twice, print the shared value\n",
              "solution": "class Counter:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n            cls._instance.value = 0\n        return cls._instance\n\na = Counter()\nb = Counter()\na.value += 1\nb.value += 1\nprint(a.value)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "2",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Singleton is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-design-patterns-m1-l3",
            "slug": "py-design-patterns-m1-l3",
            "title": "Factory Method",
            "concept": "A Factory Method is a function or method that creates objects without naming their exact class, so the caller gets the right kind of object for its input. Factories keep creation logic in one place instead of scattered through the code.",
            "syntax": "def make_shape(kind):\n    if kind == \"circle\":\n        return Circle()",
            "exampleCode": "class Circle:\n    def area(self):\n        return 3.14\n\nclass Square:\n    def area(self):\n        return 4.0\n\ndef make_shape(kind):\n    return {\"circle\": Circle, \"square\": Square}[kind]()\n\nprint(make_shape(\"circle\").area())\n",
            "exampleLanguage": "python",
            "mistake": "Writing if-else chains that create objects all over the code instead of in one factory.",
            "bug": {
              "prompt": "The code below should make a circle through a factory and print its area, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Circle:\n    def area(self):\n        return 3.14\n\nclass Square:\n    def area(self):\n        return 4.0\n\ndef make_shape(kind):\n    return {\"circle\": Square, \"square\": Circle}[kind]()\n\nprint(make_shape(\"circle\").area())\n",
              "fixedCode": "class Circle:\n    def area(self):\n        return 3.14\n\nclass Square:\n    def area(self):\n        return 4.0\n\ndef make_shape(kind):\n    return {\"circle\": Circle, \"square\": Square}[kind]()\n\nprint(make_shape(\"circle\").area())\n",
              "explanation": "The factory map is swapped, so asking for a circle returns a square with area 4.0."
            },
            "exercise": {
              "title": "Check your understanding of Factory Method",
              "type": "multiple-choice",
              "instructions": "Which statement about Factory Method is correct?",
              "starterCode": "",
              "solution": "A Factory Method is a function or method that creates objects without naming their exact class, so the caller gets the right kind of object for its input.",
              "solutionExplanation": "A Factory Method is a function or method that creates objects without naming their exact class, so the caller gets the right kind of object for its input. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A Factory Method is a function or method that creates objects without naming their exact class, so the caller gets the right kind of object for its input.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Factory Method actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A Factory Method is a function or method that creates objects without naming their exact class, so the caller gets the right kind of object for its input.",
                "Factory Method can only be used once in a program",
                "Factory Method requires a separate paid licence to use",
                "Factory Method only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-design-patterns-m1-l4",
            "slug": "py-design-patterns-m1-l4",
            "title": "Builder",
            "concept": "A Builder constructs a complex object step by step, with one method per part and a final build step. Builders shine when an object has many optional parts that would make a constructor unreadable.",
            "syntax": "report = ReportBuilder().title(\"Q1\").body(\"...\").build()",
            "exampleCode": "class Report:\n    def __init__(self, title, body):\n        self.title, self.body = title, body\n\nclass ReportBuilder:\n    def __init__(self):\n        self.title = \"\"\n        self.body = \"\"\n    def with_title(self, title):\n        self.title = title\n        return self\n    def with_body(self, body):\n        self.body = body\n        return self\n    def build(self):\n        return Report(self.title, self.body)\n\nr = ReportBuilder().with_title(\"Q1\").with_body(\"ok\").build()\nprint(r.title, r.body)\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to return self from a builder method, which breaks the chain.",
            "bug": {
              "prompt": "The code below should build a report with title 'Q1' and body 'ok' and print both, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Report:\n    def __init__(self, title, body):\n        self.title, self.body = title, body\n\nclass ReportBuilder:\n    def __init__(self):\n        self.title = \"\"\n        self.body = \"\"\n    def with_title(self, title):\n        self.title = title\n    def with_body(self, body):\n        self.body = body\n        return self\n    def build(self):\n        return Report(self.title, self.body)\n\nr = ReportBuilder().with_title(\"Q1\").with_body(\"ok\").build()\nprint(r.title, r.body)\n",
              "fixedCode": "class Report:\n    def __init__(self, title, body):\n        self.title, self.body = title, body\n\nclass ReportBuilder:\n    def __init__(self):\n        self.title = \"\"\n        self.body = \"\"\n    def with_title(self, title):\n        self.title = title\n        return self\n    def with_body(self, body):\n        self.body = body\n        return self\n    def build(self):\n        return Report(self.title, self.body)\n\nr = ReportBuilder().with_title(\"Q1\").with_body(\"ok\").build()\nprint(r.title, r.body)\n",
              "explanation": "with_title returns None, so chaining .with_body on its result raises AttributeError."
            },
            "exercise": {
              "title": "Practise Builder",
              "type": "write-code",
              "instructions": "Read a title and a body from stdin (two lines), build a Report with a builder, and print 'title: body'.",
              "starterCode": "import sys\n\nclass Report:\n    def __init__(self, title, body):\n        self.title, self.body = title, body\n\nclass ReportBuilder:\n    # TODO: with_title/with_body return self; build() returns Report\n    pass\n\n# TODO: read title + body lines, build, print f'{r.title}: {r.body}'\n",
              "solution": "import sys\n\nclass Report:\n    def __init__(self, title, body):\n        self.title, self.body = title, body\n\nclass ReportBuilder:\n    def __init__(self):\n        self.title = \"\"\n        self.body = \"\"\n    def with_title(self, title):\n        self.title = title\n        return self\n    def with_body(self, body):\n        self.body = body\n        return self\n    def build(self):\n        return Report(self.title, self.body)\n\nlines = sys.stdin.read().strip().splitlines()\nr = ReportBuilder().with_title(lines[0]).with_body(lines[1]).build()\nprint(f\"{r.title}: {r.body}\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "Q1: ok",
                  "hidden": false,
                  "stdin": "Q1\nok"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "Annual: good",
                  "hidden": true,
                  "stdin": "Annual\ngood"
                }
              ],
              "hintNotes": {
                "concept": "Builder is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-design-patterns-m1-l5",
            "slug": "py-design-patterns-m1-l5",
            "title": "Adapter",
            "concept": "An Adapter translates one interface into another, so code written for one shape can use an object of a different shape. Adapters let new code work with old libraries without changing either side.",
            "syntax": "class Adapter:\n    def request(self):\n        return self.adaptee.specific()",
            "exampleCode": "class OldPrinter:\n    def print_old(self, text):\n        return f\"old: {text}\"\n\nclass PrinterAdapter:\n    def __init__(self, printer):\n        self.printer = printer\n    def print(self, text):\n        return self.printer.print_old(text)\n\nprint(PrinterAdapter(OldPrinter()).print(\"hi\"))\n",
            "exampleLanguage": "python",
            "mistake": "Changing the old class to fit the new interface instead of writing an adapter.",
            "bug": {
              "prompt": "The code below should adapt an old printer to a print() interface and print its output for 'hi', but it gives the wrong result. What is the bug?",
              "buggyCode": "class OldPrinter:\n    def print_old(self, text):\n        return f\"old: {text}\"\n\nclass PrinterAdapter:\n    def __init__(self, printer):\n        self.printer = printer\n    def print(self, text):\n        return f\"new: {text}\"\n\nprint(PrinterAdapter(OldPrinter()).print(\"hi\"))\n",
              "fixedCode": "class OldPrinter:\n    def print_old(self, text):\n        return f\"old: {text}\"\n\nclass PrinterAdapter:\n    def __init__(self, printer):\n        self.printer = printer\n    def print(self, text):\n        return self.printer.print_old(text)\n\nprint(PrinterAdapter(OldPrinter()).print(\"hi\"))\n",
              "explanation": "The adapter ignores the old printer and invents its own output, so the result is 'new: hi' instead of 'old: hi'."
            },
            "exercise": {
              "title": "Check your understanding of Adapter",
              "type": "multiple-choice",
              "instructions": "Which statement about Adapter is correct?",
              "starterCode": "",
              "solution": "An Adapter translates one interface into another, so code written for one shape can use an object of a different shape.",
              "solutionExplanation": "An Adapter translates one interface into another, so code written for one shape can use an object of a different shape. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "An Adapter translates one interface into another, so code written for one shape can use an object of a different shape.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Adapter actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "An Adapter translates one interface into another, so code written for one shape can use an object of a different shape.",
                "Adapter can only be used once in a program",
                "Adapter requires a separate paid licence to use",
                "Adapter only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-design-patterns-m2",
        "title": "Design Patterns in Python in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-design-patterns-m2-l1",
            "slug": "py-design-patterns-m2-l1",
            "title": "Observer",
            "concept": "An Observer pattern lets objects subscribe to a subject and get notified when it changes, without the subject knowing who they are. It is how event systems, GUIs, and pub-sub designs stay decoupled.",
            "syntax": "subject.attach(observer)\nsubject.notify(event)",
            "exampleCode": "class Subject:\n    def __init__(self):\n        self._observers = []\n    def attach(self, obs):\n        self._observers.append(obs)\n    def notify(self, event):\n        for obs in self._observers:\n            obs.update(event)\n\nclass Logger:\n    def __init__(self):\n        self.seen = []\n    def update(self, event):\n        self.seen.append(event)\n\ns = Subject()\nlog = Logger()\ns.attach(log)\ns.notify(\"start\")\nprint(log.seen)\n",
            "exampleLanguage": "python",
            "mistake": "Notifying observers while modifying the observer list, which can skip or repeat notifications.",
            "bug": {
              "prompt": "The code below should attach a logger to a subject, notify 'start', and print the seen events, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Subject:\n    def __init__(self):\n        self._observers = []\n    def attach(self, obs):\n        self._observers.append(obs)\n    def notify(self, event):\n        for obs in self._observers:\n            obs.update(event)\n\nclass Logger:\n    def __init__(self):\n        self.seen = []\n    def update(self, event):\n        self.seen.append(event)\n\ns = Subject()\nlog = Logger()\ns.notify(\"start\")\nprint(log.seen)\n",
              "fixedCode": "class Subject:\n    def __init__(self):\n        self._observers = []\n    def attach(self, obs):\n        self._observers.append(obs)\n    def notify(self, event):\n        for obs in self._observers:\n            obs.update(event)\n\nclass Logger:\n    def __init__(self):\n        self.seen = []\n    def update(self, event):\n        self.seen.append(event)\n\ns = Subject()\nlog = Logger()\ns.attach(log)\ns.notify(\"start\")\nprint(log.seen)\n",
              "explanation": "The logger was never attached, so the notification reaches nobody and seen stays empty."
            },
            "exercise": {
              "title": "Practise Observer",
              "type": "write-code",
              "instructions": "Read event words from stdin, attach a counting observer to a subject, notify it of each event, and print the count of seen events.",
              "starterCode": "import sys\n\nclass Subject:\n    # TODO: attach/notify over _observers\n    pass\n\nclass Counter:\n    # TODO: update(event) increments count\n    pass\n\n# TODO: read events, attach counter, notify each, print counter.count\n",
              "solution": "import sys\n\nclass Subject:\n    def __init__(self):\n        self._observers = []\n    def attach(self, obs):\n        self._observers.append(obs)\n    def notify(self, event):\n        for obs in self._observers:\n            obs.update(event)\n\nclass Counter:\n    def __init__(self):\n        self.count = 0\n    def update(self, event):\n        self.count += 1\n\ns = Subject()\nc = Counter()\ns.attach(c)\nfor event in sys.stdin.read().split():\n    s.notify(event)\nprint(c.count)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "3",
                  "hidden": false,
                  "stdin": "start stop go"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2",
                  "hidden": true,
                  "stdin": "a b"
                }
              ],
              "hintNotes": {
                "concept": "Observer is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-design-patterns-m2-l2",
            "slug": "py-design-patterns-m2-l2",
            "title": "Strategy",
            "concept": "A Strategy pattern puts each algorithm behind the same interface and lets the caller pick one at runtime. Strategies replace tangled if-else chains with small, swappable objects.",
            "syntax": "sorter = Sorter(QuickSort())\nsorter.sort(items)",
            "exampleCode": "class Add:\n    def run(self, a, b):\n        return a + b\n\nclass Multiply:\n    def run(self, a, b):\n        return a * b\n\nclass Calculator:\n    def __init__(self, strategy):\n        self.strategy = strategy\n    def compute(self, a, b):\n        return self.strategy.run(a, b)\n\nprint(Calculator(Add()).compute(3, 4))\nprint(Calculator(Multiply()).compute(3, 4))\n",
            "exampleLanguage": "python",
            "mistake": "Hard-coding the algorithm choice inside the caller instead of injecting a strategy.",
            "bug": {
              "prompt": "The code below should compute 3 + 4 with an Add strategy and 3 * 4 with a Multiply strategy, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Add:\n    def run(self, a, b):\n        return a + b\n\nclass Multiply:\n    def run(self, a, b):\n        return a * b\n\nclass Calculator:\n    def __init__(self, strategy):\n        self.strategy = strategy\n    def compute(self, a, b):\n        return self.strategy.run(a, b)\n\nprint(Calculator(Multiply()).compute(3, 4))\nprint(Calculator(Add()).compute(3, 4))\n",
              "fixedCode": "class Add:\n    def run(self, a, b):\n        return a + b\n\nclass Multiply:\n    def run(self, a, b):\n        return a * b\n\nclass Calculator:\n    def __init__(self, strategy):\n        self.strategy = strategy\n    def compute(self, a, b):\n        return self.strategy.run(a, b)\n\nprint(Calculator(Add()).compute(3, 4))\nprint(Calculator(Multiply()).compute(3, 4))\n",
              "explanation": "The two strategies are swapped, so the output is 12 then 7 instead of 7 then 12."
            },
            "exercise": {
              "title": "Practise Strategy",
              "type": "write-code",
              "instructions": "Read two integers and a strategy name ('add' or 'mul') from stdin, run the chosen strategy, and print the result.",
              "starterCode": "import sys\n\nclass Add:\n    def run(self, a, b):\n        return a + b\n\nclass Multiply:\n    def run(self, a, b):\n        return a * b\n\n# TODO: read a, b, name; pick strategy; print its run(a, b)\n",
              "solution": "import sys\n\nclass Add:\n    def run(self, a, b):\n        return a + b\n\nclass Multiply:\n    def run(self, a, b):\n        return a * b\n\nparts = sys.stdin.read().split()\na, b = int(parts[0]), int(parts[1])\nstrategy = Add() if parts[2] == \"add\" else Multiply()\nprint(strategy.run(a, b))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "7",
                  "hidden": false,
                  "stdin": "3 4 add"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "12",
                  "hidden": true,
                  "stdin": "3 4 mul"
                }
              ],
              "hintNotes": {
                "concept": "Strategy is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-design-patterns-m2-l3",
            "slug": "py-design-patterns-m2-l3",
            "title": "Decorator Pattern",
            "concept": "The Decorator pattern wraps an object to add behaviour without changing its class, such as logging every call or caching results. Decorators compose: each wrapper adds one concern and passes the rest through.",
            "syntax": "logged = LoggingDecorator(service)",
            "exampleCode": "class Service:\n    def run(self):\n        return \"done\"\n\nclass LoggingDecorator:\n    def __init__(self, wrapped):\n        self.wrapped = wrapped\n    def run(self):\n        return self.wrapped.run() + \"!\"\n\nprint(LoggingDecorator(Service()).run())\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to forward a method in the decorator, so the wrapped object loses behaviour.",
            "bug": {
              "prompt": "The code below should wrap a service in a logging decorator that appends '!' and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Service:\n    def run(self):\n        return \"done\"\n\nclass LoggingDecorator:\n    def __init__(self, wrapped):\n        self.wrapped = wrapped\n    def run(self):\n        return \"done\"\n\nprint(LoggingDecorator(Service()).run())\n",
              "fixedCode": "class Service:\n    def run(self):\n        return \"done\"\n\nclass LoggingDecorator:\n    def __init__(self, wrapped):\n        self.wrapped = wrapped\n    def run(self):\n        return self.wrapped.run() + \"!\"\n\nprint(LoggingDecorator(Service()).run())\n",
              "explanation": "The decorator ignores the wrapped service and hard-codes its own answer, so wrapping a different service would still print 'done'."
            },
            "exercise": {
              "title": "Check your understanding of Decorator Pattern",
              "type": "multiple-choice",
              "instructions": "Which statement about Decorator Pattern is correct?",
              "starterCode": "",
              "solution": "The Decorator pattern wraps an object to add behaviour without changing its class, such as logging every call or caching results.",
              "solutionExplanation": "The Decorator pattern wraps an object to add behaviour without changing its class, such as logging every call or caching results. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The Decorator pattern wraps an object to add behaviour without changing its class, such as logging every call or caching results.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Decorator Pattern actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "The Decorator pattern wraps an object to add behaviour without changing its class, such as logging every call or caching results.",
                "Decorator Pattern can only be used once in a program",
                "Decorator Pattern requires a separate paid licence to use",
                "Decorator Pattern only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-design-patterns-m2-l4",
            "slug": "py-design-patterns-m2-l4",
            "title": "Command Pattern",
            "concept": "A Command object wraps a request as data, so requests can be queued, logged, undone, or retried. Commands turn 'do it now' into 'here is the thing to do', which is the key to undo systems.",
            "syntax": "class Command:\n    def execute(self): ...",
            "exampleCode": "class AddCommand:\n    def __init__(self, total, amount):\n        self.total, self.amount = total, amount\n    def execute(self):\n        self.total[0] += self.amount\n\ntotal = [0]\nAddCommand(total, 5).execute()\nAddCommand(total, 3).execute()\nprint(total[0])\n",
            "exampleLanguage": "python",
            "mistake": "Executing commands directly instead of through the invoker that records them for undo.",
            "bug": {
              "prompt": "The code below should execute two add commands for 5 and 3 on a total and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "class AddCommand:\n    def __init__(self, total, amount):\n        self.total, self.amount = total, amount\n    def execute(self):\n        self.total[0] += self.amount\n\ntotal = [0]\nAddCommand(total, 5).execute()\nprint(total[0])\n",
              "fixedCode": "class AddCommand:\n    def __init__(self, total, amount):\n        self.total, self.amount = total, amount\n    def execute(self):\n        self.total[0] += self.amount\n\ntotal = [0]\nAddCommand(total, 5).execute()\nAddCommand(total, 3).execute()\nprint(total[0])\n",
              "explanation": "Only the first command runs, so the total is 5 instead of 8."
            },
            "exercise": {
              "title": "Practise Command Pattern",
              "type": "write-code",
              "instructions": "Read integers from stdin, execute an AddCommand for each on a shared total, and print the total.",
              "starterCode": "import sys\n\nclass AddCommand:\n    def __init__(self, total, amount):\n        self.total, self.amount = total, amount\n    def execute(self):\n        self.total[0] += self.amount\n\n# TODO: read ints, execute one AddCommand per value, print total[0]\n",
              "solution": "import sys\n\nclass AddCommand:\n    def __init__(self, total, amount):\n        self.total, self.amount = total, amount\n    def execute(self):\n        self.total[0] += self.amount\n\ntotal = [0]\nfor n in [int(x) for x in sys.stdin.read().split()]:\n    AddCommand(total, n).execute()\nprint(total[0])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "10",
                  "hidden": false,
                  "stdin": "5 3 2"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "30",
                  "hidden": true,
                  "stdin": "10 20"
                }
              ],
              "hintNotes": {
                "concept": "Command Pattern is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-design-patterns-m2-l5",
            "slug": "py-design-patterns-m2-l5",
            "title": "A Patterns Showcase",
            "concept": "A patterns showcase combines several patterns in one program: a factory builds strategies, a decorator logs them, and commands run them. Real systems mix patterns freely, choosing each one for the job it does best.",
            "syntax": "factory + strategy + command",
            "exampleCode": "class Add:\n    def run(self, a, b):\n        return a + b\n\ndef make(kind):\n    return {\"add\": Add}[kind]()\n\nprint(make(\"add\").run(2, 3))\n",
            "exampleLanguage": "python",
            "mistake": "Forcing every problem into a pattern instead of using the simplest code that works.",
            "bug": {
              "prompt": "The code below should build an Add strategy through a factory and print 2 + 3, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Add:\n    def run(self, a, b):\n        return a + b\n\ndef make(kind):\n    return {\"add\": Add}[kind]()\n\nprint(make(\"add\").run(2, 4))\n",
              "fixedCode": "class Add:\n    def run(self, a, b):\n        return a + b\n\ndef make(kind):\n    return {\"add\": Add}[kind]()\n\nprint(make(\"add\").run(2, 3))\n",
              "explanation": "The example adds 2 + 4 instead of 2 + 3, so it prints 6 instead of 5."
            },
            "exercise": {
              "title": "Practise A Patterns Showcase",
              "type": "write-code",
              "instructions": "Read two integers and a kind ('add' or 'mul') from stdin, build the strategy with a factory, run it, and print the result.",
              "starterCode": "import sys\n\nclass Add:\n    def run(self, a, b):\n        return a + b\n\nclass Multiply:\n    def run(self, a, b):\n        return a * b\n\ndef make(kind):\n    return {\"add\": Add, \"mul\": Multiply}[kind]()\n\n# TODO: read a, b, kind; print make(kind).run(a, b)\n",
              "solution": "import sys\n\nclass Add:\n    def run(self, a, b):\n        return a + b\n\nclass Multiply:\n    def run(self, a, b):\n        return a * b\n\ndef make(kind):\n    return {\"add\": Add, \"mul\": Multiply}[kind]()\n\nparts = sys.stdin.read().split()\nprint(make(parts[2]).run(int(parts[0]), int(parts[1])))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "5",
                  "hidden": false,
                  "stdin": "2 3 add"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "6",
                  "hidden": true,
                  "stdin": "2 3 mul"
                }
              ],
              "hintNotes": {
                "concept": "A Patterns Showcase is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Shape Area Factory",
      "type": "build-program",
      "instructions": "Build a shape area factory: read a shape kind ('circle' or 'square') and a size from stdin, build the shape with a factory, and print its area rounded to 2 decimals (circle: 3.14 * size * size, square: size * size).",
      "starterCode": "import sys\n\n# TODO: Circle/Square classes with area(); factory make(kind, size); print rounded area\n",
      "solution": "import sys\n\nclass Circle:\n    def __init__(self, size):\n        self.size = size\n    def area(self):\n        return 3.14 * self.size * self.size\n\nclass Square:\n    def __init__(self, size):\n        self.size = size\n    def area(self):\n        return self.size * self.size\n\ndef make(kind, size):\n    return {\"circle\": Circle, \"square\": Square}[kind](size)\n\nparts = sys.stdin.read().split()\nprint(f\"{make(parts[0], float(parts[1])).area():.2f}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "12.56",
          "hidden": false,
          "stdin": "circle 2"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "9.00",
          "hidden": true,
          "stdin": "square 3"
        }
      ],
      "hintNotes": {
        "concept": "Shape Area Factory is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Shape Area Factory Capstone Project",
      "description": "A small end-to-end patterns program that builds shapes through a factory and reports their areas.",
      "requirements": [
        "Create shapes through a factory function.",
        "Apply at least three of these skills: Factory Method, Strategy, Singleton, Builder.",
        "Support both 'circle' and 'square'.",
        "Print the area rounded to 2 decimal places."
      ],
      "rubric": [
        "Program runs and prints the correct area for both shapes.",
        "Code is clear, well-named, and organised into classes.",
        "The factory maps kinds to classes without if-else chains in main.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-functional",
    "slug": "py-functional",
    "language": "python",
    "category": "languages",
    "title": "Functional Programming in Python",
    "description": "Learn functional programming in Python: first-class functions, map and filter, reduce, lambdas, closures, partial application, composition, and pure functions, plus how to mix the style with ordinary Python.",
    "difficulty": "Advanced",
    "estimatedHours": 16,
    "skills": [
      "First-class functions",
      "map and filter",
      "functools.reduce",
      "Lambda expressions",
      "Closures",
      "functools.partial",
      "Function composition",
      "Pure functions"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to cook from recipes instead of memory: same ingredients, same steps, same result every time.",
    "modules": [
      {
        "id": "py-functional-m1",
        "title": "Fundamentals of Functional Programming",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-functional-m1-l1",
            "slug": "py-functional-m1-l1",
            "title": "Functions as Values",
            "concept": "In Python a function is a value: it can be stored in a variable, passed as an argument, and returned from another function. Treating functions as values is the foundation of the whole functional style.",
            "syntax": "def apply(f, x):\n    return f(x)",
            "exampleCode": "def double(n):\n    return n * 2\n\ndef apply(f, x):\n    return f(x)\n\nprint(apply(double, 21))\n",
            "exampleLanguage": "python",
            "mistake": "Calling the function when passing it, which passes its result instead of the function itself.",
            "bug": {
              "prompt": "The code below should apply double to 21 through a higher-order function and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "def double(n):\n    return n * 2\n\ndef apply(f, x):\n    return f(x)\n\nprint(apply(double(21), 21))\n",
              "fixedCode": "def double(n):\n    return n * 2\n\ndef apply(f, x):\n    return f(x)\n\nprint(apply(double, 21))\n",
              "explanation": "Passing double(21) calls the function immediately, so apply receives 42 instead of a function and fails when it tries to call it."
            },
            "exercise": {
              "title": "Practise Functions as Values",
              "type": "write-code",
              "instructions": "Read an integer from stdin, apply a tripling function through apply(f, x), and print the result.",
              "starterCode": "import sys\n\ndef triple(n):\n    return n * 3\n\ndef apply(f, x):\n    return f(x)\n\n# TODO: read n, print apply(triple, n)\n",
              "solution": "import sys\n\ndef triple(n):\n    return n * 3\n\ndef apply(f, x):\n    return f(x)\n\nprint(apply(triple, int(sys.stdin.read().strip())))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42",
                  "hidden": false,
                  "stdin": "14"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "15",
                  "hidden": true,
                  "stdin": "5"
                }
              ],
              "hintNotes": {
                "concept": "Functions as Values is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-functional-m1-l2",
            "slug": "py-functional-m1-l2",
            "title": "map and filter",
            "concept": "map applies a function to every item, and filter keeps only the items a predicate accepts. Together they replace many explicit loops with a clear statement of what to compute.",
            "syntax": "list(map(str, nums))",
            "exampleCode": "print(list(map(lambda n: n * 2, [1, 2, 3])))\nprint(list(filter(lambda n: n % 2 == 0, [1, 2, 3, 4])))\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that map and filter return lazy iterators that can only be consumed once.",
            "bug": {
              "prompt": "The code below should double 1, 2, 3 with map and keep the even numbers of 1, 2, 3, 4 with filter, but it gives the wrong result. What is the bug?",
              "buggyCode": "print(list(map(lambda n: n * 2, [1, 2, 3])))\nprint(list(filter(lambda n: n % 2 == 1, [1, 2, 3, 4])))\n",
              "fixedCode": "print(list(map(lambda n: n * 2, [1, 2, 3])))\nprint(list(filter(lambda n: n % 2 == 0, [1, 2, 3, 4])))\n",
              "explanation": "Filtering for odd numbers keeps [1, 3] instead of the even [2, 4]."
            },
            "exercise": {
              "title": "Practise map and filter",
              "type": "write-code",
              "instructions": "Read integers from stdin, double them with map, keep the even results with filter, and print the list.",
              "starterCode": "import sys\n\n# TODO: read ints, map double, filter even, print list\n",
              "solution": "import sys\n\nnums = [int(x) for x in sys.stdin.read().split()]\nprint(list(filter(lambda n: n % 2 == 0, map(lambda n: n * 2, nums))))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[2, 4, 6]",
                  "hidden": false,
                  "stdin": "1 2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[8, 10]",
                  "hidden": true,
                  "stdin": "4 5"
                }
              ],
              "hintNotes": {
                "concept": "map and filter is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-functional-m1-l3",
            "slug": "py-functional-m1-l3",
            "title": "Reducing with functools.reduce",
            "concept": "reduce folds a list into a single value by applying a function to the running result and each item in turn. It is the functional way to write sums, products, and other accumulations.",
            "syntax": "functools.reduce(operator.add, nums, 0)",
            "exampleCode": "import functools, operator\n\nprint(functools.reduce(operator.add, [1, 2, 3, 4], 0))\nprint(functools.reduce(operator.mul, [1, 2, 3, 4], 1))\n",
            "exampleLanguage": "python",
            "mistake": "Using reduce without an initial value on a list that might be empty.",
            "bug": {
              "prompt": "The code below should sum 1, 2, 3, 4 with reduce and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "import functools, operator\n\nprint(functools.reduce(operator.add, [1, 2, 3, 4]))\n",
              "fixedCode": "import functools, operator\n\nprint(functools.reduce(operator.add, [1, 2, 3, 4], 0))\n",
              "explanation": "Leaving out the initial value works here but raises TypeError on an empty list, which the initial value would have handled."
            },
            "exercise": {
              "title": "Check your understanding of Reducing with functools.reduce",
              "type": "multiple-choice",
              "instructions": "Which statement about Reducing with functools.reduce is correct?",
              "starterCode": "",
              "solution": "reduce folds a list into a single value by applying a function to the running result and each item in turn.",
              "solutionExplanation": "reduce folds a list into a single value by applying a function to the running result and each item in turn. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "reduce folds a list into a single value by applying a function to the running result and each item in turn.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Reducing with functools.reduce actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "reduce folds a list into a single value by applying a function to the running result and each item in turn.",
                "Reducing with functools.reduce can only be used once in a program",
                "Reducing with functools.reduce requires a separate paid licence to use",
                "Reducing with functools.reduce only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-functional-m1-l4",
            "slug": "py-functional-m1-l4",
            "title": "Lambda Expressions",
            "concept": "A lambda is a small anonymous function written in one expression, useful as a short argument to map, filter, or sorted. Lambdas are for tiny jobs; anything bigger deserves a named function.",
            "syntax": "sorted(words, key=lambda w: len(w))",
            "exampleCode": "print(sorted([\"banana\", \"fig\", \"apple\"], key=lambda w: len(w)))\n",
            "exampleLanguage": "python",
            "mistake": "Writing a long lambda with complex logic instead of a named function.",
            "bug": {
              "prompt": "The code below should sort banana, fig and apple by length with a lambda key and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "print(sorted([\"banana\", \"fig\", \"apple\"], key=lambda w: -len(w)))\n",
              "fixedCode": "print(sorted([\"banana\", \"fig\", \"apple\"], key=lambda w: len(w)))\n",
              "explanation": "Sorting by negative length gives longest first instead of shortest first."
            },
            "exercise": {
              "title": "Practise Lambda Expressions",
              "type": "write-code",
              "instructions": "Read words from stdin, sort them by length with a lambda key, and print the list.",
              "starterCode": "import sys\n\n# TODO: read words, print sorted(words, key=lambda w: len(w))\n",
              "solution": "import sys\n\nwords = sys.stdin.read().split()\nprint(sorted(words, key=lambda w: len(w)))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['fig', 'apple', 'banana']",
                  "hidden": false,
                  "stdin": "banana fig apple"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['dog', 'cat', 'elephant']",
                  "hidden": true,
                  "stdin": "dog elephant cat"
                }
              ],
              "hintNotes": {
                "concept": "Lambda Expressions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-functional-m1-l5",
            "slug": "py-functional-m1-l5",
            "title": "Closures",
            "concept": "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished. Closures are how Python builds small functions with baked-in settings.",
            "syntax": "def make_adder(n):\n    def add(x):\n        return x + n\n    return add",
            "exampleCode": "def make_adder(n):\n    def add(x):\n        return x + n\n    return add\n\nadd5 = make_adder(5)\nprint(add5(10))\n",
            "exampleLanguage": "python",
            "mistake": "Creating closures in a loop over a variable that changes, so every closure sees the final value.",
            "bug": {
              "prompt": "The code below should make an adder for 5, apply it to 10, and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "def make_adder(n):\n    def add(x):\n        return x + 5\n    return add\n\nadd5 = make_adder(99)\nprint(add5(10))\n",
              "fixedCode": "def make_adder(n):\n    def add(x):\n        return x + n\n    return add\n\nadd5 = make_adder(5)\nprint(add5(10))\n",
              "explanation": "Hard-coding 5 inside the closure ignores the argument, so make_adder(99) still adds 5."
            },
            "exercise": {
              "title": "Check your understanding of Closures",
              "type": "multiple-choice",
              "instructions": "Which statement about Closures is correct?",
              "starterCode": "",
              "solution": "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished.",
              "solutionExplanation": "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Closures actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished.",
                "Closures can only be used once in a program",
                "Closures requires a separate paid licence to use",
                "Closures only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-functional-m2",
        "title": "Functional Programming in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-functional-m2-l1",
            "slug": "py-functional-m2-l1",
            "title": "Partial Application",
            "concept": "functools.partial fixes some arguments of a function and returns a new function that takes the rest. Partial application turns a general function into a specialised one without writing a wrapper.",
            "syntax": "double = functools.partial(mul, 2)",
            "exampleCode": "import functools\n\ndef mul(a, b):\n    return a * b\n\ndouble = functools.partial(mul, 2)\nprint(double(21))\n",
            "exampleLanguage": "python",
            "mistake": "Using partial with keyword arguments in the wrong order and binding the wrong parameter.",
            "bug": {
              "prompt": "The code below should make a doubling function with partial and apply it to 21, but it gives the wrong result. What is the bug?",
              "buggyCode": "import functools\n\ndef mul(a, b):\n    return a * b\n\ndouble = functools.partial(mul, 3)\nprint(double(21))\n",
              "fixedCode": "import functools\n\ndef mul(a, b):\n    return a * b\n\ndouble = functools.partial(mul, 2)\nprint(double(21))\n",
              "explanation": "Binding 3 instead of 2 makes the function triple instead of double, so it prints 63."
            },
            "exercise": {
              "title": "Practise Partial Application",
              "type": "write-code",
              "instructions": "Read an integer from stdin, triple it with functools.partial(mul, 3), and print the result.",
              "starterCode": "import functools, sys\n\ndef mul(a, b):\n    return a * b\n\n# TODO: read n, print functools.partial(mul, 3)(n)\n",
              "solution": "import functools, sys\n\ndef mul(a, b):\n    return a * b\n\ntriple = functools.partial(mul, 3)\nprint(triple(int(sys.stdin.read().strip())))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42",
                  "hidden": false,
                  "stdin": "14"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "21",
                  "hidden": true,
                  "stdin": "7"
                }
              ],
              "hintNotes": {
                "concept": "Partial Application is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-functional-m2-l2",
            "slug": "py-functional-m2-l2",
            "title": "Composing Functions",
            "concept": "Function composition chains small functions so the output of one feeds the input of the next. Composed functions are easy to test one at a time and easy to rearrange.",
            "syntax": "def compose(f, g):\n    return lambda x: f(g(x))",
            "exampleCode": "def double(n):\n    return n * 2\n\ndef inc(n):\n    return n + 1\n\ndef compose(f, g):\n    return lambda x: f(g(x))\n\nprint(compose(double, inc)(10))\n",
            "exampleLanguage": "python",
            "mistake": "Composing functions in the wrong order, so the pipeline runs backwards.",
            "bug": {
              "prompt": "The code below should compose double after inc and apply to 10, printing the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "def double(n):\n    return n * 2\n\ndef inc(n):\n    return n + 1\n\ndef compose(f, g):\n    return lambda x: f(g(x))\n\nprint(compose(inc, double)(10))\n",
              "fixedCode": "def double(n):\n    return n * 2\n\ndef inc(n):\n    return n + 1\n\ndef compose(f, g):\n    return lambda x: f(g(x))\n\nprint(compose(double, inc)(10))\n",
              "explanation": "Composing inc after double computes (10 * 2) + 1 = 21 instead of (10 + 1) * 2 = 22."
            },
            "exercise": {
              "title": "Practise Composing Functions",
              "type": "write-code",
              "instructions": "Read an integer from stdin, apply inc then double via compose(double, inc), and print the result.",
              "starterCode": "import sys\n\ndef double(n):\n    return n * 2\n\ndef inc(n):\n    return n + 1\n\ndef compose(f, g):\n    return lambda x: f(g(x))\n\n# TODO: read n, print compose(double, inc)(n)\n",
              "solution": "import sys\n\ndef double(n):\n    return n * 2\n\ndef inc(n):\n    return n + 1\n\ndef compose(f, g):\n    return lambda x: f(g(x))\n\nprint(compose(double, inc)(int(sys.stdin.read().strip())))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "22",
                  "hidden": false,
                  "stdin": "10"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "12",
                  "hidden": true,
                  "stdin": "5"
                }
              ],
              "hintNotes": {
                "concept": "Composing Functions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-functional-m2-l3",
            "slug": "py-functional-m2-l3",
            "title": "Pure Functions and Side Effects",
            "concept": "A pure function depends only on its arguments and changes nothing outside itself, so it always returns the same result for the same inputs. Pure functions are the easiest code to test, cache, and run in parallel.",
            "syntax": "def pure_add(a, b):\n    return a + b",
            "exampleCode": "total = [0]\n\ndef pure_add(a, b):\n    return a + b\n\ndef impure_add(a):\n    total[0] += a\n    return total[0]\n\nprint(pure_add(2, 3), pure_add(2, 3))\n",
            "exampleLanguage": "python",
            "mistake": "Hiding a dependency on global state inside a function that looks pure.",
            "bug": {
              "prompt": "The code below should call a pure add twice with 2 and 3 and print both results, but it gives the wrong result. What is the bug?",
              "buggyCode": "total = [0]\n\ndef impure_add(a, b):\n    total[0] += a + b\n    return total[0]\n\nprint(impure_add(2, 3), impure_add(2, 3))\n",
              "fixedCode": "total = [0]\n\ndef pure_add(a, b):\n    return a + b\n\ndef impure_add(a):\n    total[0] += a\n    return total[0]\n\nprint(pure_add(2, 3), pure_add(2, 3))\n",
              "explanation": "The impure version accumulates into a global, so the second call prints 10 instead of 5."
            },
            "exercise": {
              "title": "Check your understanding of Pure Functions and Side Effects",
              "type": "multiple-choice",
              "instructions": "Which statement about Pure Functions and Side Effects is correct?",
              "starterCode": "",
              "solution": "A pure function depends only on its arguments and changes nothing outside itself, so it always returns the same result for the same inputs.",
              "solutionExplanation": "A pure function depends only on its arguments and changes nothing outside itself, so it always returns the same result for the same inputs. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A pure function depends only on its arguments and changes nothing outside itself, so it always returns the same result for the same inputs.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Pure Functions and Side Effects actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A pure function depends only on its arguments and changes nothing outside itself, so it always returns the same result for the same inputs.",
                "Pure Functions and Side Effects can only be used once in a program",
                "Pure Functions and Side Effects requires a separate paid licence to use",
                "Pure Functions and Side Effects only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-functional-m2-l4",
            "slug": "py-functional-m2-l4",
            "title": "Recursion Patterns",
            "concept": "Recursion expresses a problem in terms of smaller versions of itself, with a base case that stops the chain. Functional code favours recursion over loops for problems that split naturally, such as trees.",
            "syntax": "def fact(n):\n    return 1 if n <= 1 else n * fact(n - 1)",
            "exampleCode": "def fact(n):\n    return 1 if n <= 1 else n * fact(n - 1)\n\nprint(fact(5))\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting the base case, which recurses forever until the stack overflows.",
            "bug": {
              "prompt": "The code below should compute factorial 5 recursively and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "def fact(n):\n    return n * fact(n - 1)\n\nprint(fact(5))\n",
              "fixedCode": "def fact(n):\n    return 1 if n <= 1 else n * fact(n - 1)\n\nprint(fact(5))\n",
              "explanation": "Without the base case the recursion never stops and raises RecursionError."
            },
            "exercise": {
              "title": "Practise Recursion Patterns",
              "type": "write-code",
              "instructions": "Read an integer n from stdin, compute its factorial recursively, and print the result.",
              "starterCode": "import sys\n\ndef fact(n):\n    # TODO: return 1 if n <= 1 else n * fact(n - 1)\n    return 0\n\n# TODO: read n, print fact(n)\n",
              "solution": "import sys\n\ndef fact(n):\n    return 1 if n <= 1 else n * fact(n - 1)\n\nprint(fact(int(sys.stdin.read().strip())))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "120",
                  "hidden": false,
                  "stdin": "5"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "720",
                  "hidden": true,
                  "stdin": "6"
                }
              ],
              "hintNotes": {
                "concept": "Recursion Patterns is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-functional-m2-l5",
            "slug": "py-functional-m2-l5",
            "title": "A Functional Data Pipeline",
            "concept": "A functional data pipeline chains map, filter, and reduce so data flows through small pure steps. Each step is easy to understand alone, and the whole pipeline reads like a description of the result.",
            "syntax": "result = reduce(add, filter(even, map(double, nums)))",
            "exampleCode": "import functools, operator\n\nnums = [1, 2, 3, 4]\nresult = functools.reduce(operator.add, filter(lambda n: n % 2 == 0, map(lambda n: n * 2, nums)), 0)\nprint(result)\n",
            "exampleLanguage": "python",
            "mistake": "Writing the pipeline as one long nested expression that nobody can read or debug.",
            "bug": {
              "prompt": "The code below should double 1, 2, 3, 4, keep the even results, sum them, and print the total, but it gives the wrong result. What is the bug?",
              "buggyCode": "import functools, operator\n\nnums = [1, 2, 3, 4]\nresult = functools.reduce(operator.add, filter(lambda n: n % 2 == 1, map(lambda n: n * 2, nums)), 0)\nprint(result)\n",
              "fixedCode": "import functools, operator\n\nnums = [1, 2, 3, 4]\nresult = functools.reduce(operator.add, filter(lambda n: n % 2 == 0, map(lambda n: n * 2, nums)), 0)\nprint(result)\n",
              "explanation": "Filtering for odd numbers after doubling keeps nothing, because doubling always produces even numbers, so the sum is 0."
            },
            "exercise": {
              "title": "Practise A Functional Data Pipeline",
              "type": "write-code",
              "instructions": "Read integers from stdin, double them, keep the ones greater than 5, sum them with reduce, and print the total.",
              "starterCode": "import functools, operator, sys\n\n# TODO: read ints, map double, filter > 5, reduce add with 0, print total\n",
              "solution": "import functools, operator, sys\n\nnums = [int(x) for x in sys.stdin.read().split()]\nresult = functools.reduce(operator.add, filter(lambda n: n > 5, map(lambda n: n * 2, nums)), 0)\nprint(result)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "14",
                  "hidden": false,
                  "stdin": "1 2 3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "6",
                  "hidden": true,
                  "stdin": "2 3"
                }
              ],
              "hintNotes": {
                "concept": "A Functional Data Pipeline is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Functional Word Stats",
      "type": "build-program",
      "instructions": "Build functional word stats: read words from stdin, use map/filter/reduce to compute the total number of letters and the count of words longer than 3 letters, and print 'letters: N long: M'.",
      "starterCode": "import functools, operator, sys\n\n# TODO: read words; total letters via map+reduce; long words via filter; print 'letters: N long: M'\n",
      "solution": "import functools, operator, sys\n\nwords = sys.stdin.read().split()\nletters = functools.reduce(operator.add, map(len, words), 0)\nlong = len(list(filter(lambda w: len(w) > 3, words)))\nprint(f\"letters: {letters} long: {long}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "letters: 14 long: 2",
          "hidden": false,
          "stdin": "apple fig banana"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "letters: 14 long: 1",
          "hidden": true,
          "stdin": "cat dog elephant"
        }
      ],
      "hintNotes": {
        "concept": "Functional Word Stats is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Functional Word Stats Capstone Project",
      "description": "A small end-to-end functional program that summarises words with map, filter, and reduce.",
      "requirements": [
        "Use map, filter, and reduce in the solution.",
        "Apply at least three of these skills: map and filter, functools.reduce, Lambda expressions, Pure functions.",
        "Print the total letter count and the long-word count.",
        "Print the result in the exact format 'letters: N long: M'."
      ],
      "rubric": [
        "Program runs and prints the correct word statistics.",
        "Code is clear, well-named, and organised into functions.",
        "Empty input prints 'letters: 0 long: 0'.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-type-hints",
    "slug": "py-type-hints",
    "language": "python",
    "category": "languages",
    "title": "Type Hints and mypy",
    "description": "Learn to annotate Python code with type hints: basic annotations, Optional and Union, generics, TypedDict, protocols, dataclasses, narrowing, and reading hints at runtime with get_type_hints.",
    "difficulty": "Advanced",
    "estimatedHours": 16,
    "skills": [
      "Basic annotations",
      "Optional and Union",
      "Generics",
      "TypedDict",
      "Protocols",
      "Dataclasses",
      "Type narrowing",
      "get_type_hints"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to label the shelves in a workshop: the tools work the same, but nobody grabs the wrong one by mistake.",
    "modules": [
      {
        "id": "py-type-hints-m1",
        "title": "Fundamentals of Type Hints and mypy",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-type-hints-m1-l1",
            "slug": "py-type-hints-m1-l1",
            "title": "Why Add Type Hints",
            "concept": "Type hints describe what a function expects and returns, so a checker such as mypy can catch mistakes before the code runs. Hints are documentation that a tool can verify, which is why they pay off on larger codebases.",
            "syntax": "def add(a: int, b: int) -> int:",
            "exampleCode": "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(2, 3))\n",
            "exampleLanguage": "python",
            "mistake": "Adding hints but never running a checker, so the hints slowly go stale.",
            "bug": {
              "prompt": "The code below should define an annotated add function and print add(2, 3), but it gives the wrong result. What is the bug?",
              "buggyCode": "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(\"2\", \"3\"))\n",
              "fixedCode": "def add(a: int, b: int) -> int:\n    return a + b\n\nprint(add(2, 3))\n",
              "explanation": "Passing strings to an int-annotated function concatenates them to '23' instead of adding to 5, which is exactly what mypy would flag."
            },
            "exercise": {
              "title": "Practise Why Add Type Hints",
              "type": "write-code",
              "instructions": "Define add(a: int, b: int) -> int, read two integers from stdin, and print add(a, b).",
              "starterCode": "import sys\n\ndef add(a: int, b: int) -> int:\n    # TODO: return a + b\n    return 0\n\n# TODO: read a, b; print add(a, b)\n",
              "solution": "import sys\n\ndef add(a: int, b: int) -> int:\n    return a + b\n\na, b = [int(x) for x in sys.stdin.read().split()]\nprint(add(a, b))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "5",
                  "hidden": false,
                  "stdin": "2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "30",
                  "hidden": true,
                  "stdin": "10 20"
                }
              ],
              "hintNotes": {
                "concept": "Why Add Type Hints is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-type-hints-m1-l2",
            "slug": "py-type-hints-m1-l2",
            "title": "Basic Annotations",
            "concept": "A basic annotation writes the type after a colon for parameters and after an arrow for the return value. Annotations do not change how the code runs; they are information for readers and checkers.",
            "syntax": "name: str = \"ada\"",
            "exampleCode": "def greet(name: str) -> str:\n    return f\"hello {name}\"\n\nprint(greet(\"ada\"))\n",
            "exampleLanguage": "python",
            "mistake": "Annotating a variable with the wrong type and confusing every reader after you.",
            "bug": {
              "prompt": "The code below should define an annotated greet and print its result for 'ada', but it gives the wrong result. What is the bug?",
              "buggyCode": "def greet(name: int) -> str:\n    return f\"hello {name}\"\n\nprint(greet(\"ada\"))\n",
              "fixedCode": "def greet(name: str) -> str:\n    return f\"hello {name}\"\n\nprint(greet(\"ada\"))\n",
              "explanation": "Annotating name as int while passing a string contradicts the annotation, so a checker would flag the call."
            },
            "exercise": {
              "title": "Practise Basic Annotations",
              "type": "write-code",
              "instructions": "Define double(n: int) -> int, read an integer from stdin, and print double(n).",
              "starterCode": "import sys\n\ndef double(n: int) -> int:\n    # TODO: return n * 2\n    return 0\n\n# TODO: read n, print double(n)\n",
              "solution": "import sys\n\ndef double(n: int) -> int:\n    return n * 2\n\nprint(double(int(sys.stdin.read().strip())))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42",
                  "hidden": false,
                  "stdin": "21"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "16",
                  "hidden": true,
                  "stdin": "8"
                }
              ],
              "hintNotes": {
                "concept": "Basic Annotations is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-type-hints-m1-l3",
            "slug": "py-type-hints-m1-l3",
            "title": "Optional and Union Types",
            "concept": "Optional means a value may be None, and Union means it may be one of several types. Writing the real possibility in the annotation stops checkers from complaining about the None case you forgot.",
            "syntax": "def find(name: str) -> str | None:",
            "exampleCode": "def find(items: list[str], target: str) -> str | None:\n    return target if target in items else None\n\nprint(find([\"a\", \"b\"], \"b\"))\nprint(find([\"a\", \"b\"], \"z\"))\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting Optional and letting a checker complain every time the function returns None.",
            "bug": {
              "prompt": "The code below should find 'b' and 'z' in a list and print the results, but it gives the wrong result. What is the bug?",
              "buggyCode": "def find(items: list[str], target: str) -> str:\n    return target if target in items else \"missing\"\n\nprint(find([\"a\", \"b\"], \"b\"))\nprint(find([\"a\", \"b\"], \"z\"))\n",
              "fixedCode": "def find(items: list[str], target: str) -> str | None:\n    return target if target in items else None\n\nprint(find([\"a\", \"b\"], \"b\"))\nprint(find([\"a\", \"b\"], \"z\"))\n",
              "explanation": "Returning the string 'missing' instead of None changes the contract, so callers cannot tell a miss from a real value."
            },
            "exercise": {
              "title": "Check your understanding of Optional and Union Types",
              "type": "multiple-choice",
              "instructions": "Which statement about Optional and Union Types is correct?",
              "starterCode": "",
              "solution": "Optional means a value may be None, and Union means it may be one of several types.",
              "solutionExplanation": "Optional means a value may be None, and Union means it may be one of several types. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Optional means a value may be None, and Union means it may be one of several types.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Optional and Union Types actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Optional means a value may be None, and Union means it may be one of several types.",
                "Optional and Union Types can only be used once in a program",
                "Optional and Union Types requires a separate paid licence to use",
                "Optional and Union Types only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-type-hints-m1-l4",
            "slug": "py-type-hints-m1-l4",
            "title": "Generics with TypeVar",
            "concept": "A TypeVar lets a function work for many types while keeping the relationship between its inputs and outputs. A generic first() returns the same type it was given, whether that is a string or a number.",
            "syntax": "T = TypeVar(\"T\")\ndef first(items: list[T]) -> T:",
            "exampleCode": "from typing import TypeVar\n\nT = TypeVar(\"T\")\n\ndef first(items: list[T]) -> T:\n    return items[0]\n\nprint(first([1, 2, 3]), first([\"a\", \"b\"]))\n",
            "exampleLanguage": "python",
            "mistake": "Using Any everywhere instead of a TypeVar, which throws away the type relationship.",
            "bug": {
              "prompt": "The code below should return the first item of [1, 2, 3] and of ['a', 'b'] with a generic function, but it gives the wrong result. What is the bug?",
              "buggyCode": "from typing import TypeVar\n\nT = TypeVar(\"T\")\n\ndef first(items: list[T]) -> T:\n    return items[1]\n\nprint(first([1, 2, 3]), first([\"a\", \"b\"]))\n",
              "fixedCode": "from typing import TypeVar\n\nT = TypeVar(\"T\")\n\ndef first(items: list[T]) -> T:\n    return items[0]\n\nprint(first([1, 2, 3]), first([\"a\", \"b\"]))\n",
              "explanation": "Returning items[1] gives the second element instead of the first."
            },
            "exercise": {
              "title": "Practise Generics with TypeVar",
              "type": "write-code",
              "instructions": "Define a generic first(items) that returns items[0], read words from stdin, and print the first word.",
              "starterCode": "import sys\nfrom typing import TypeVar\n\nT = TypeVar(\"T\")\n\ndef first(items: list[T]) -> T:\n    # TODO: return items[0]\n    return items[0]\n\n# TODO: read words, print first(words)\n",
              "solution": "import sys\nfrom typing import TypeVar\n\nT = TypeVar(\"T\")\n\ndef first(items: list[T]) -> T:\n    return items[0]\n\nprint(first(sys.stdin.read().split()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "apple",
                  "hidden": false,
                  "stdin": "apple banana"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "red",
                  "hidden": true,
                  "stdin": "red blue"
                }
              ],
              "hintNotes": {
                "concept": "Generics with TypeVar is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-type-hints-m1-l5",
            "slug": "py-type-hints-m1-l5",
            "title": "TypedDict and NamedTuple",
            "concept": "A TypedDict gives a dict a fixed set of keys with known types, and a NamedTuple gives a tuple named fields. Both add structure to data that would otherwise be an untyped bag of values.",
            "syntax": "class User(TypedDict):\n    name: str\n    age: int",
            "exampleCode": "from typing import TypedDict\n\nclass User(TypedDict):\n    name: str\n    age: int\n\ndef show(user: User) -> str:\n    return f\"{user['name']} is {user['age']}\"\n\nprint(show({\"name\": \"ada\", \"age\": 36}))\n",
            "exampleLanguage": "python",
            "mistake": "Using a plain dict for structured data instead of a TypedDict, so typos in keys go unnoticed.",
            "bug": {
              "prompt": "The code below should define a User TypedDict and print 'ada is 36', but it gives the wrong result. What is the bug?",
              "buggyCode": "from typing import TypedDict\n\nclass User(TypedDict):\n    name: str\n    age: int\n\ndef show(user: User) -> str:\n    return f\"{user['name']} is {user['age']}\"\n\nprint(show({\"name\": \"ada\", \"age\": 35}))\n",
              "fixedCode": "from typing import TypedDict\n\nclass User(TypedDict):\n    name: str\n    age: int\n\ndef show(user: User) -> str:\n    return f\"{user['name']} is {user['age']}\"\n\nprint(show({\"name\": \"ada\", \"age\": 36}))\n",
              "explanation": "The age passed in is 35 instead of 36, so the printed text is wrong."
            },
            "exercise": {
              "title": "Check your understanding of TypedDict and NamedTuple",
              "type": "multiple-choice",
              "instructions": "Which statement about TypedDict and NamedTuple is correct?",
              "starterCode": "",
              "solution": "A TypedDict gives a dict a fixed set of keys with known types, and a NamedTuple gives a tuple named fields.",
              "solutionExplanation": "A TypedDict gives a dict a fixed set of keys with known types, and a NamedTuple gives a tuple named fields. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A TypedDict gives a dict a fixed set of keys with known types, and a NamedTuple gives a tuple named fields.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what TypedDict and NamedTuple actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A TypedDict gives a dict a fixed set of keys with known types, and a NamedTuple gives a tuple named fields.",
                "TypedDict and NamedTuple can only be used once in a program",
                "TypedDict and NamedTuple requires a separate paid licence to use",
                "TypedDict and NamedTuple only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-type-hints-m2",
        "title": "Type Hints and mypy in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-type-hints-m2-l1",
            "slug": "py-type-hints-m2-l1",
            "title": "Protocols and Structural Typing",
            "concept": "A Protocol describes the methods an object must have, and any object with those methods satisfies it without inheriting from anything. Structural typing is duck typing with a checker to back it up.",
            "syntax": "class Drawable(Protocol):\n    def draw(self) -> None: ...",
            "exampleCode": "from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> str: ...\n\nclass Circle:\n    def draw(self) -> str:\n        return \"circle\"\n\ndef render(item: Drawable) -> str:\n    return item.draw()\n\nprint(render(Circle()))\n",
            "exampleLanguage": "python",
            "mistake": "Making every class inherit from a base class when a Protocol would do.",
            "bug": {
              "prompt": "The code below should render a Circle through a Drawable protocol and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> str: ...\n\nclass Circle:\n    def draw(self) -> str:\n        return \"square\"\n\ndef render(item: Drawable) -> str:\n    return item.draw()\n\nprint(render(Circle()))\n",
              "fixedCode": "from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> str: ...\n\nclass Circle:\n    def draw(self) -> str:\n        return \"circle\"\n\ndef render(item: Drawable) -> str:\n    return item.draw()\n\nprint(render(Circle()))\n",
              "explanation": "The Circle draws 'square' instead of 'circle', so the rendered output is wrong."
            },
            "exercise": {
              "title": "Practise Protocols and Structural Typing",
              "type": "write-code",
              "instructions": "Define a Drawable protocol with draw() -> str and a Square class that draws 'square', then render it and print the result.",
              "starterCode": "from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> str: ...\n\nclass Square:\n    # TODO: draw() returns 'square'\n    pass\n\ndef render(item: Drawable) -> str:\n    return item.draw()\n\n# TODO: print render(Square())\n",
              "solution": "from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> str: ...\n\nclass Square:\n    def draw(self) -> str:\n        return \"square\"\n\ndef render(item: Drawable) -> str:\n    return item.draw()\n\nprint(render(Square()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "square",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "square",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Protocols and Structural Typing is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-type-hints-m2-l2",
            "slug": "py-type-hints-m2-l2",
            "title": "Dataclasses with Types",
            "concept": "A dataclass generates __init__ and other methods from annotated fields, so a small data class is a few lines instead of a page. The annotations are the fields, which makes the class self-documenting.",
            "syntax": "@dataclass\nclass Point:\n    x: int\n    y: int",
            "exampleCode": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nprint(Point(3, 4))\n",
            "exampleLanguage": "python",
            "mistake": "Writing __init__ by hand for a plain data holder instead of using a dataclass.",
            "bug": {
              "prompt": "The code below should create a Point(3, 4) dataclass and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nprint(Point(4, 3))\n",
              "fixedCode": "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nprint(Point(3, 4))\n",
              "explanation": "The coordinates are swapped, so the point prints as Point(x=4, y=3) instead of Point(x=3, y=4)."
            },
            "exercise": {
              "title": "Practise Dataclasses with Types",
              "type": "write-code",
              "instructions": "Read two integers from stdin, build a Point dataclass with them, and print the point.",
              "starterCode": "import sys\nfrom dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\n# TODO: read x, y; print Point(x, y)\n",
              "solution": "import sys\nfrom dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: int\n    y: int\n\nx, y = [int(v) for v in sys.stdin.read().split()]\nprint(Point(x, y))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "Point(x=3, y=4)",
                  "hidden": false,
                  "stdin": "3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "Point(x=1, y=2)",
                  "hidden": true,
                  "stdin": "1 2"
                }
              ],
              "hintNotes": {
                "concept": "Dataclasses with Types is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-type-hints-m2-l3",
            "slug": "py-type-hints-m2-l3",
            "title": "Type Narrowing",
            "concept": "Type narrowing is how a checker learns a value's type inside a branch, such as after an isinstance check or a None check. Narrowing turns a Union into a single type for the rest of the block.",
            "syntax": "if isinstance(value, str):\n    print(value.upper())",
            "exampleCode": "def shout(value: str | int) -> str:\n    if isinstance(value, str):\n        return value.upper()\n    return str(value)\n\nprint(shout(\"hi\"), shout(42))\n",
            "exampleLanguage": "python",
            "mistake": "Casting instead of narrowing, which hides the checker's warnings.",
            "bug": {
              "prompt": "The code below should shout 'hi' and 42 through a narrowing function and print both results, but it gives the wrong result. What is the bug?",
              "buggyCode": "def shout(value: str | int) -> str:\n    if isinstance(value, int):\n        return value.upper()\n    return str(value)\n\nprint(shout(\"hi\"), shout(42))\n",
              "fixedCode": "def shout(value: str | int) -> str:\n    if isinstance(value, str):\n        return value.upper()\n    return str(value)\n\nprint(shout(\"hi\"), shout(42))\n",
              "explanation": "Checking for int and then calling .upper() on it raises AttributeError, because integers have no upper method."
            },
            "exercise": {
              "title": "Check your understanding of Type Narrowing",
              "type": "multiple-choice",
              "instructions": "Which statement about Type Narrowing is correct?",
              "starterCode": "",
              "solution": "Type narrowing is how a checker learns a value's type inside a branch, such as after an isinstance check or a None check.",
              "solutionExplanation": "Type narrowing is how a checker learns a value's type inside a branch, such as after an isinstance check or a None check. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Type narrowing is how a checker learns a value's type inside a branch, such as after an isinstance check or a None check.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Type Narrowing actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Type narrowing is how a checker learns a value's type inside a branch, such as after an isinstance check or a None check.",
                "Type Narrowing can only be used once in a program",
                "Type Narrowing requires a separate paid licence to use",
                "Type Narrowing only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-type-hints-m2-l4",
            "slug": "py-type-hints-m2-l4",
            "title": "get_type_hints at Runtime",
            "concept": "typing.get_type_hints reads the annotations of a function or class at runtime, resolving string annotations into real types. It is how frameworks inspect annotated code to build validators and serializers.",
            "syntax": "typing.get_type_hints(func)",
            "exampleCode": "import typing\n\ndef add(a: \"int\", b: \"int\") -> \"int\":\n    return a + b\n\nprint(typing.get_type_hints(add))\n",
            "exampleLanguage": "python",
            "mistake": "Reading __annotations__ directly and getting strings instead of resolved types.",
            "bug": {
              "prompt": "The code below should print the type hints of an add function with string annotations, but it gives the wrong result. What is the bug?",
              "buggyCode": "import typing\n\ndef add(a: \"int\", b: \"int\") -> \"int\":\n    return a + b\n\nprint(add.__annotations__)\n",
              "fixedCode": "import typing\n\ndef add(a: \"int\", b: \"int\") -> \"int\":\n    return a + b\n\nprint(typing.get_type_hints(add))\n",
              "explanation": "Reading __annotations__ directly returns the raw strings {'a': 'int', 'b': 'int', 'return': 'int'} instead of the resolved types that get_type_hints returns."
            },
            "exercise": {
              "title": "Practise get_type_hints at Runtime",
              "type": "write-code",
              "instructions": "Define add(a: int, b: int) -> int and print its get_type_hints() dict.",
              "starterCode": "import typing\n\ndef add(a: int, b: int) -> int:\n    return a + b\n\n# TODO: print typing.get_type_hints(add)\n",
              "solution": "import typing\n\ndef add(a: int, b: int) -> int:\n    return a + b\n\nprint(typing.get_type_hints(add))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "{'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "{'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "get_type_hints at Runtime is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-type-hints-m2-l5",
            "slug": "py-type-hints-m2-l5",
            "title": "A Fully Typed Mini Module",
            "concept": "A fully typed mini module annotates every function, uses a dataclass for its data, and checks cleanly. Typed modules are easier to change because the checker points at every place a change ripples to.",
            "syntax": "def total(prices: list[float]) -> float:",
            "exampleCode": "from dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: float\n\ndef total(items: list[Item]) -> float:\n    return sum(item.price for item in items)\n\nprint(total([Item(\"a\", 10.0), Item(\"b\", 20.0)]))\n",
            "exampleLanguage": "python",
            "mistake": "Annotating the public functions but leaving the helpers untyped.",
            "bug": {
              "prompt": "The code below should total two items priced 10.0 and 20.0 and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "from dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: float\n\ndef total(items: list[Item]) -> float:\n    return sum(item.price for item in items)\n\nprint(total([Item(\"a\", 10.0), Item(\"b\", 15.0)]))\n",
              "fixedCode": "from dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: float\n\ndef total(items: list[Item]) -> float:\n    return sum(item.price for item in items)\n\nprint(total([Item(\"a\", 10.0), Item(\"b\", 20.0)]))\n",
              "explanation": "The second item is priced 15.0 instead of 20.0, so the total is 25.0 instead of 30.0."
            },
            "exercise": {
              "title": "Practise A Fully Typed Mini Module",
              "type": "write-code",
              "instructions": "Read 'name price' pairs from stdin (one per line), build Item dataclasses, total their prices, and print the total.",
              "starterCode": "import sys\nfrom dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: float\n\ndef total(items: list[Item]) -> float:\n    return sum(item.price for item in items)\n\n# TODO: read pairs, build items, print total(items)\n",
              "solution": "import sys\nfrom dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: float\n\ndef total(items: list[Item]) -> float:\n    return sum(item.price for item in items)\n\nitems = []\nfor line in sys.stdin.read().strip().splitlines():\n    name, price = line.split()\n    items.append(Item(name, float(price)))\nprint(total(items))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "30.0",
                  "hidden": false,
                  "stdin": "a 10.0\nb 20.0"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "10.0",
                  "hidden": true,
                  "stdin": "x 5.5\ny 4.5"
                }
              ],
              "hintNotes": {
                "concept": "A Fully Typed Mini Module is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Typed Inventory Total",
      "type": "build-program",
      "instructions": "Build a typed inventory total: read 'name price' pairs from stdin (one per line), build Item dataclasses, and print the total price and the item count as 'total: X items: N'.",
      "starterCode": "import sys\nfrom dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: float\n\ndef total(items: list[Item]) -> float:\n    return sum(item.price for item in items)\n\n# TODO: read pairs, build items, print f'total: {total(items)} items: {len(items)}'\n",
      "solution": "import sys\nfrom dataclasses import dataclass\n\n@dataclass\nclass Item:\n    name: str\n    price: float\n\ndef total(items: list[Item]) -> float:\n    return sum(item.price for item in items)\n\nitems = []\nfor line in sys.stdin.read().strip().splitlines():\n    name, price = line.split()\n    items.append(Item(name, float(price)))\nprint(f\"total: {total(items)} items: {len(items)}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "total: 30.0 items: 2",
          "hidden": false,
          "stdin": "a 10.0\nb 20.0"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "total: 5.0 items: 1",
          "hidden": true,
          "stdin": "x 5.0"
        }
      ],
      "hintNotes": {
        "concept": "Typed Inventory Total is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Typed Inventory Total Capstone Project",
      "description": "A small end-to-end typed program that totals an inventory of priced items.",
      "requirements": [
        "Use a dataclass with type annotations for items.",
        "Apply at least three of these skills: Basic annotations, Dataclasses, get_type_hints, Optional and Union.",
        "Compute the total with an annotated function.",
        "Print the result in the exact format 'total: X items: N'."
      ],
      "rubric": [
        "Program runs and prints the correct total and count.",
        "Code is clear, well-named, and organised into functions.",
        "Every function carries type annotations.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-context-managers",
    "slug": "py-context-managers",
    "language": "python",
    "category": "languages",
    "title": "Context Managers and Resource Management",
    "description": "Learn to manage resources safely with context managers: the with statement, __enter__ and __exit__, contextlib, suppressing exceptions, file safety, locks, and nested managers.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "with statement",
      "__enter__ and __exit__",
      "contextlib.contextmanager",
      "contextlib.suppress",
      "File safety",
      "Locks as context managers",
      "Nested managers",
      "Transaction managers"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to borrow a library book properly: you take it out, you use it, and it goes back on the shelf even if you trip on the way.",
    "modules": [
      {
        "id": "py-context-managers-m1",
        "title": "Fundamentals of Context Managers and Resource Management",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-context-managers-m1-l1",
            "slug": "py-context-managers-m1-l1",
            "title": "What a Context Manager Is",
            "concept": "A context manager is an object that sets something up when a with block starts and cleans it up when the block ends, even if an error happens. Files, locks, and database connections are all managed this way.",
            "syntax": "with open(\"data.txt\") as f:",
            "exampleCode": "import io\n\nwith io.StringIO(\"hello\") as buf:\n    print(buf.read())\n",
            "exampleLanguage": "python",
            "mistake": "Opening a resource and forgetting to close it when an error interrupts the code.",
            "bug": {
              "prompt": "The code below should read 'hello' from a StringIO inside a with block and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import io\n\nbuf = io.StringIO(\"hello\")\nprint(buf.read())\n",
              "fixedCode": "import io\n\nwith io.StringIO(\"hello\") as buf:\n    print(buf.read())\n",
              "explanation": "Without the with block the buffer is never closed, which leaks the resource if an error happens first."
            },
            "exercise": {
              "title": "Practise What a Context Manager Is",
              "type": "write-code",
              "instructions": "Read a word from stdin, write it into a StringIO inside a with block, and print the buffer's value.",
              "starterCode": "import io, sys\n\n# TODO: read word, with StringIO() write word, print getvalue\n",
              "solution": "import io, sys\n\nword = sys.stdin.read().strip()\nwith io.StringIO() as buf:\n    buf.write(word)\n    print(buf.getvalue())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "hello",
                  "hidden": false,
                  "stdin": "hello"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "world",
                  "hidden": true,
                  "stdin": "world"
                }
              ],
              "hintNotes": {
                "concept": "What a Context Manager Is is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-context-managers-m1-l2",
            "slug": "py-context-managers-m1-l2",
            "title": "The with Statement",
            "concept": "The with statement runs the setup, then the block, then the cleanup, in that order and no matter how the block ends. It replaces try-finally boilerplate with one readable line.",
            "syntax": "with lock:\n    ...",
            "exampleCode": "import threading\n\nlock = threading.Lock()\nwith lock:\n    print(\"held\")\nprint(lock.locked())\n",
            "exampleLanguage": "python",
            "mistake": "Acquiring a lock with acquire() and forgetting release() on an error path.",
            "bug": {
              "prompt": "The code below should hold a lock in a with block, print 'held', then print whether it is still locked, but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\nlock = threading.Lock()\nlock.acquire()\nprint(\"held\")\nprint(lock.locked())\n",
              "fixedCode": "import threading\n\nlock = threading.Lock()\nwith lock:\n    print(\"held\")\nprint(lock.locked())\n",
              "explanation": "Acquiring without a with block leaves the lock held after the print, so locked() reports True instead of False."
            },
            "exercise": {
              "title": "Practise The with Statement",
              "type": "write-code",
              "instructions": "Use a threading.Lock in a with block, print 'held' inside, and print lock.locked() after the block.",
              "starterCode": "import threading\n\nlock = threading.Lock()\n# TODO: with lock: print 'held'; then print lock.locked()\n",
              "solution": "import threading\n\nlock = threading.Lock()\nwith lock:\n    print(\"held\")\nprint(lock.locked())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "held\nFalse",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "held\nFalse",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "The with Statement is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-context-managers-m1-l3",
            "slug": "py-context-managers-m1-l3",
            "title": "Writing __enter__ and __exit__",
            "concept": "A class becomes a context manager by defining __enter__ for setup and __exit__ for cleanup, with __exit__ receiving the exception details. Returning True from __exit__ suppresses the exception; returning False lets it propagate.",
            "syntax": "def __enter__(self): ...\ndef __exit__(self, *exc): ...",
            "exampleCode": "class Door:\n    def __enter__(self):\n        print(\"opened\")\n        return self\n    def __exit__(self, *exc):\n        print(\"closed\")\n        return False\n\nwith Door():\n    print(\"inside\")\n",
            "exampleLanguage": "python",
            "mistake": "Returning True from __exit__ by accident and silently swallowing real errors.",
            "bug": {
              "prompt": "The code below should enter a Door, print 'inside', and print 'opened' and 'closed' around it, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Door:\n    def __enter__(self):\n        print(\"opened\")\n        return self\n    def __exit__(self, *exc):\n        print(\"closed\")\n        return True\n\nwith Door():\n    print(\"inside\")\n",
              "fixedCode": "class Door:\n    def __enter__(self):\n        print(\"opened\")\n        return self\n    def __exit__(self, *exc):\n        print(\"closed\")\n        return False\n\nwith Door():\n    print(\"inside\")\n",
              "explanation": "Returning True from __exit__ would swallow any exception raised inside the block, hiding real errors."
            },
            "exercise": {
              "title": "Check your understanding of Writing __enter__ and __exit__",
              "type": "multiple-choice",
              "instructions": "Which statement about Writing __enter__ and __exit__ is correct?",
              "starterCode": "",
              "solution": "A class becomes a context manager by defining __enter__ for setup and __exit__ for cleanup, with __exit__ receiving the exception details.",
              "solutionExplanation": "A class becomes a context manager by defining __enter__ for setup and __exit__ for cleanup, with __exit__ receiving the exception details. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A class becomes a context manager by defining __enter__ for setup and __exit__ for cleanup, with __exit__ receiving the exception details.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Writing __enter__ and __exit__ actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A class becomes a context manager by defining __enter__ for setup and __exit__ for cleanup, with __exit__ receiving the exception details.",
                "Writing __enter__ and __exit__ can only be used once in a program",
                "Writing __enter__ and __exit__ requires a separate paid licence to use",
                "Writing __enter__ and __exit__ only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-context-managers-m1-l4",
            "slug": "py-context-managers-m1-l4",
            "title": "contextlib.contextmanager",
            "concept": "The contextmanager decorator turns a generator function into a context manager: the code before yield is the setup and the code after is the cleanup. It is the quickest way to write a small manager without a class.",
            "syntax": "@contextlib.contextmanager\ndef managed():\n    yield value",
            "exampleCode": "import contextlib\n\n@contextlib.contextmanager\ndef greeting(name):\n    print(f\"hello {name}\")\n    yield name\n    print(f\"goodbye {name}\")\n\nwith greeting(\"ada\") as name:\n    print(f\"inside {name}\")\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting the try-finally around the yield, so an exception skips the cleanup.",
            "bug": {
              "prompt": "The code below should run a greeting manager for 'ada' and print the three lines, but it gives the wrong result. What is the bug?",
              "buggyCode": "import contextlib\n\n@contextlib.contextmanager\ndef greeting(name):\n    print(f\"hello {name}\")\n    yield name\n    print(f\"goodbye {name}\")\n\nwith greeting(\"bob\") as name:\n    print(f\"inside {name}\")\n",
              "fixedCode": "import contextlib\n\n@contextlib.contextmanager\ndef greeting(name):\n    print(f\"hello {name}\")\n    yield name\n    print(f\"goodbye {name}\")\n\nwith greeting(\"ada\") as name:\n    print(f\"inside {name}\")\n",
              "explanation": "The manager was called with 'bob' instead of 'ada', so all three lines name the wrong person."
            },
            "exercise": {
              "title": "Practise contextlib.contextmanager",
              "type": "write-code",
              "instructions": "Read a name from stdin, run a contextmanager that prints 'hello NAME', yields, then prints 'goodbye NAME', and print 'inside NAME' in the block.",
              "starterCode": "import contextlib, sys\n\n@contextlib.contextmanager\ndef greeting(name):\n    # TODO: print hello, yield name, print goodbye\n    yield name\n\n# TODO: read name, use greeting(name), print f'inside {name}'\n",
              "solution": "import contextlib, sys\n\n@contextlib.contextmanager\ndef greeting(name):\n    print(f\"hello {name}\")\n    yield name\n    print(f\"goodbye {name}\")\n\nname = sys.stdin.read().strip()\nwith greeting(name) as who:\n    print(f\"inside {who}\")\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "hello ada\ninside ada\ngoodbye ada",
                  "hidden": false,
                  "stdin": "ada"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "hello bob\ninside bob\ngoodbye bob",
                  "hidden": true,
                  "stdin": "bob"
                }
              ],
              "hintNotes": {
                "concept": "contextlib.contextmanager is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-context-managers-m1-l5",
            "slug": "py-context-managers-m1-l5",
            "title": "Suppressing Exceptions",
            "concept": "contextlib.suppress ignores chosen exceptions inside its block, so expected failures stay quiet while unexpected ones still surface. Suppressing the wrong exception hides real bugs, so the list must stay narrow.",
            "syntax": "with contextlib.suppress(FileNotFoundError):",
            "exampleCode": "import contextlib\n\nwith contextlib.suppress(ValueError):\n    int(\"abc\")\nprint(\"continued\")\n",
            "exampleLanguage": "python",
            "mistake": "Suppressing Exception itself, which hides every error including bugs.",
            "bug": {
              "prompt": "The code below should suppress ValueError from int('abc') and print 'continued', but it gives the wrong result. What is the bug?",
              "buggyCode": "import contextlib\n\nwith contextlib.suppress(TypeError):\n    int(\"abc\")\nprint(\"continued\")\n",
              "fixedCode": "import contextlib\n\nwith contextlib.suppress(ValueError):\n    int(\"abc\")\nprint(\"continued\")\n",
              "explanation": "int('abc') raises ValueError, not TypeError, so the wrong suppress lets the error escape and crash the program."
            },
            "exercise": {
              "title": "Check your understanding of Suppressing Exceptions",
              "type": "multiple-choice",
              "instructions": "Which statement about Suppressing Exceptions is correct?",
              "starterCode": "",
              "solution": "contextlib.",
              "solutionExplanation": "contextlib. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "contextlib.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Suppressing Exceptions actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "contextlib.",
                "Suppressing Exceptions can only be used once in a program",
                "Suppressing Exceptions requires a separate paid licence to use",
                "Suppressing Exceptions only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-context-managers-m2",
        "title": "Context Managers and Resource Management in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-context-managers-m2-l1",
            "slug": "py-context-managers-m2-l1",
            "title": "Managing Files Safely",
            "concept": "Opening a file with with guarantees it is closed when the block ends, even if reading raises an error. Unclosed files leak handles and can lose buffered writes.",
            "syntax": "with open(path) as f:\n    data = f.read()",
            "exampleCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"data.txt\"\n    p.write_text(\"hello\")\n    with open(p) as f:\n        print(f.read())\n",
            "exampleLanguage": "python",
            "mistake": "Opening a file without with and forgetting to close it after an early return.",
            "bug": {
              "prompt": "The code below should write 'hello' to a temp file, read it back with a with block, and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"data.txt\"\n    p.write_text(\"hello\")\n    f = open(p)\n    print(f.read())\n",
              "fixedCode": "import tempfile\nfrom pathlib import Path\n\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"data.txt\"\n    p.write_text(\"hello\")\n    with open(p) as f:\n        print(f.read())\n",
              "explanation": "Opening without with leaves the file handle open after the read, which leaks the handle."
            },
            "exercise": {
              "title": "Practise Managing Files Safely",
              "type": "write-code",
              "instructions": "Read a word from stdin, write it to a temp file, read it back with a with block, and print it.",
              "starterCode": "import sys, tempfile\nfrom pathlib import Path\n\n# TODO: read word, write to temp file, read with open() in a with block, print it\n",
              "solution": "import sys, tempfile\nfrom pathlib import Path\n\nword = sys.stdin.read().strip()\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"data.txt\"\n    p.write_text(word)\n    with open(p) as f:\n        print(f.read())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "hello",
                  "hidden": false,
                  "stdin": "hello"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "world",
                  "hidden": true,
                  "stdin": "world"
                }
              ],
              "hintNotes": {
                "concept": "Managing Files Safely is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-context-managers-m2-l2",
            "slug": "py-context-managers-m2-l2",
            "title": "Locks as Context Managers",
            "concept": "A lock used with with is acquired on entry and released on exit, even if the block raises. The pattern is so common that using acquire and release by hand is almost always a mistake.",
            "syntax": "with lock:\n    counter[0] += 1",
            "exampleCode": "import threading\n\nlock = threading.Lock()\ncounter = [0]\nwith lock:\n    counter[0] += 1\nprint(counter[0])\n",
            "exampleLanguage": "python",
            "mistake": "Holding a lock while calling code that tries to acquire the same lock again, which deadlocks.",
            "bug": {
              "prompt": "The code below should increment a counter under a lock and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import threading\n\nlock = threading.Lock()\ncounter = [0]\nlock.acquire()\ncounter[0] += 1\nprint(counter[0])\n",
              "fixedCode": "import threading\n\nlock = threading.Lock()\ncounter = [0]\nwith lock:\n    counter[0] += 1\nprint(counter[0])\n",
              "explanation": "Acquiring by hand and never releasing leaves the lock held, so the next user of it blocks forever."
            },
            "exercise": {
              "title": "Practise Locks as Context Managers",
              "type": "write-code",
              "instructions": "Read an integer from stdin, add it to a counter under a lock in a with block, and print the counter.",
              "starterCode": "import sys, threading\n\nlock = threading.Lock()\ncounter = [0]\n# TODO: read n, with lock add n to counter[0], print counter[0]\n",
              "solution": "import sys, threading\n\nlock = threading.Lock()\ncounter = [0]\nn = int(sys.stdin.read().strip())\nwith lock:\n    counter[0] += n\nprint(counter[0])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "5",
                  "hidden": false,
                  "stdin": "5"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "10",
                  "hidden": true,
                  "stdin": "10"
                }
              ],
              "hintNotes": {
                "concept": "Locks as Context Managers is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-context-managers-m2-l3",
            "slug": "py-context-managers-m2-l3",
            "title": "Temporary Directory Changes",
            "concept": "Changing the working directory temporarily is a job for a context manager that restores the old directory on exit. Forgetting the restore leaves every later file operation in the wrong place.",
            "syntax": "with chdir(path):",
            "exampleCode": "import contextlib, os, tempfile\n\n@contextlib.contextmanager\ndef chdir(path):\n    old = os.getcwd()\n    os.chdir(path)\n    try:\n        yield\n    finally:\n        os.chdir(old)\n\nwith tempfile.TemporaryDirectory() as d:\n    with chdir(d):\n        print(os.path.basename(os.getcwd()) == os.path.basename(d))\n    print(os.getcwd() != d)\n",
            "exampleLanguage": "python",
            "mistake": "Changing directory with os.chdir and never changing back.",
            "bug": {
              "prompt": "The code below should change into a temp directory and print whether the cwd matches it, then print whether it was restored, but it gives the wrong result. What is the bug?",
              "buggyCode": "import contextlib, os, tempfile\n\n@contextlib.contextmanager\ndef chdir(path):\n    os.chdir(path)\n    yield\n\nwith tempfile.TemporaryDirectory() as d:\n    with chdir(d):\n        print(os.path.basename(os.getcwd()) == os.path.basename(d))\n    print(os.getcwd() != d)\n",
              "fixedCode": "import contextlib, os, tempfile\n\n@contextlib.contextmanager\ndef chdir(path):\n    old = os.getcwd()\n    os.chdir(path)\n    try:\n        yield\n    finally:\n        os.chdir(old)\n\nwith tempfile.TemporaryDirectory() as d:\n    with chdir(d):\n        print(os.path.basename(os.getcwd()) == os.path.basename(d))\n    print(os.getcwd() != d)\n",
              "explanation": "Without saving and restoring the old directory, the second print shows the program is still inside the temp directory."
            },
            "exercise": {
              "title": "Check your understanding of Temporary Directory Changes",
              "type": "multiple-choice",
              "instructions": "Which statement about Temporary Directory Changes is correct?",
              "starterCode": "",
              "solution": "Changing the working directory temporarily is a job for a context manager that restores the old directory on exit.",
              "solutionExplanation": "Changing the working directory temporarily is a job for a context manager that restores the old directory on exit. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Changing the working directory temporarily is a job for a context manager that restores the old directory on exit.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Temporary Directory Changes actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Changing the working directory temporarily is a job for a context manager that restores the old directory on exit.",
                "Temporary Directory Changes can only be used once in a program",
                "Temporary Directory Changes requires a separate paid licence to use",
                "Temporary Directory Changes only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-context-managers-m2-l4",
            "slug": "py-context-managers-m2-l4",
            "title": "Nested Context Managers",
            "concept": "Several managers can be combined in one with line, separated by commas, or with contextlib.ExitStack for a dynamic number of them. Nested managers clean up in reverse order, innermost first.",
            "syntax": "with open(a) as f, open(b) as g:",
            "exampleCode": "import io\n\nwith io.StringIO(\"a\") as f, io.StringIO(\"b\") as g:\n    print(f.read() + g.read())\n",
            "exampleLanguage": "python",
            "mistake": "Nesting with blocks so deeply that the code becomes hard to read.",
            "bug": {
              "prompt": "The code below should read 'a' and 'b' from two StringIOs in one with line and print them joined, but it gives the wrong result. What is the bug?",
              "buggyCode": "import io\n\nf = io.StringIO(\"a\")\ng = io.StringIO(\"b\")\nprint(f.read() + g.read())\n",
              "fixedCode": "import io\n\nwith io.StringIO(\"a\") as f, io.StringIO(\"b\") as g:\n    print(f.read() + g.read())\n",
              "explanation": "Opening the buffers without with leaves both of them unclosed after the read, leaking the resources."
            },
            "exercise": {
              "title": "Practise Nested Context Managers",
              "type": "write-code",
              "instructions": "Read two words from stdin, write each to its own StringIO in one with line, and print them joined with a space.",
              "starterCode": "import io, sys\n\n# TODO: read two words, with two StringIOs in one line, print values joined\n",
              "solution": "import io, sys\n\na, b = sys.stdin.read().split()\nwith io.StringIO(a) as f, io.StringIO(b) as g:\n    print(f.read() + \" \" + g.read())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "hello world",
                  "hidden": false,
                  "stdin": "hello world"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "foo bar",
                  "hidden": true,
                  "stdin": "foo bar"
                }
              ],
              "hintNotes": {
                "concept": "Nested Context Managers is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-context-managers-m2-l5",
            "slug": "py-context-managers-m2-l5",
            "title": "A Transaction Context Manager",
            "concept": "A transaction context manager commits on a clean exit and rolls back when an exception escapes the block. It turns error handling into structure: the block either fully succeeds or fully undoes itself.",
            "syntax": "with transaction(conn):\n    ...",
            "exampleCode": "import contextlib, sqlite3\n\n@contextlib.contextmanager\ndef transaction(conn):\n    try:\n        yield conn\n        conn.commit()\n    except Exception:\n        conn.rollback()\n        raise\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t (n INTEGER)\")\nwith transaction(conn) as c:\n    c.execute(\"INSERT INTO t VALUES (1)\")\nprint(conn.execute(\"SELECT COUNT(*) FROM t\").fetchone()[0])\nconn.close()\n",
            "exampleLanguage": "python",
            "mistake": "Committing inside the block instead of on exit, which commits partial work before an error.",
            "bug": {
              "prompt": "The code below should insert 1 inside a transaction manager and print the row count, but it gives the wrong result. What is the bug?",
              "buggyCode": "import contextlib, sqlite3\n\n@contextlib.contextmanager\ndef transaction(conn):\n    try:\n        yield conn\n        conn.commit()\n    except Exception:\n        conn.rollback()\n        raise\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t (n INTEGER)\")\nwith transaction(conn) as c:\n    c.execute(\"INSERT INTO t VALUES (1)\")\n    conn.commit()\nprint(conn.execute(\"SELECT COUNT(*) FROM t\").fetchone()[0])\nconn.close()\n",
              "fixedCode": "import contextlib, sqlite3\n\n@contextlib.contextmanager\ndef transaction(conn):\n    try:\n        yield conn\n        conn.commit()\n    except Exception:\n        conn.rollback()\n        raise\n\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t (n INTEGER)\")\nwith transaction(conn) as c:\n    c.execute(\"INSERT INTO t VALUES (1)\")\nprint(conn.execute(\"SELECT COUNT(*) FROM t\").fetchone()[0])\nconn.close()\n",
              "explanation": "Committing inside the block saves the row before the block finishes, so a later error in the same block could no longer roll it back."
            },
            "exercise": {
              "title": "Practise A Transaction Context Manager",
              "type": "write-code",
              "instructions": "Read an integer from stdin, insert it into an in-memory table inside a transaction manager, and print the row count.",
              "starterCode": "import contextlib, sqlite3, sys\n\n@contextlib.contextmanager\ndef transaction(conn):\n    try:\n        yield conn\n        conn.commit()\n    except Exception:\n        conn.rollback()\n        raise\n\n# TODO: create table, read n, insert inside transaction, print COUNT(*)\n",
              "solution": "import contextlib, sqlite3, sys\n\n@contextlib.contextmanager\ndef transaction(conn):\n    try:\n        yield conn\n        conn.commit()\n    except Exception:\n        conn.rollback()\n        raise\n\nn = int(sys.stdin.read().strip())\nconn = sqlite3.connect(\":memory:\")\nconn.execute(\"CREATE TABLE t (n INTEGER)\")\nwith transaction(conn) as c:\n    c.execute(\"INSERT INTO t VALUES (?)\", (n,))\nprint(conn.execute(\"SELECT COUNT(*) FROM t\").fetchone()[0])\nconn.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "1",
                  "hidden": false,
                  "stdin": "42"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "1",
                  "hidden": true,
                  "stdin": "7"
                }
              ],
              "hintNotes": {
                "concept": "A Transaction Context Manager is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Safe File Writer",
      "type": "build-program",
      "instructions": "Build a safe file writer: read a word from stdin, write it to a temp file inside a with block, read it back with a with block, and print it.",
      "starterCode": "import sys, tempfile\nfrom pathlib import Path\n\n# TODO: read word, write to temp file in with block, read back in with block, print it\n",
      "solution": "import sys, tempfile\nfrom pathlib import Path\n\nword = sys.stdin.read().strip()\nwith tempfile.TemporaryDirectory() as d:\n    p = Path(d) / \"data.txt\"\n    with open(p, \"w\") as f:\n        f.write(word)\n    with open(p) as f:\n        print(f.read())\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "hello",
          "hidden": false,
          "stdin": "hello"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "world",
          "hidden": true,
          "stdin": "world"
        }
      ],
      "hintNotes": {
        "concept": "Safe File Writer is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Safe File Writer Capstone Project",
      "description": "A small end-to-end resource-management program that writes and reads a file safely with context managers.",
      "requirements": [
        "Use with blocks for both writing and reading.",
        "Apply at least three of these skills: with statement, File safety, contextlib.contextmanager, Nested managers.",
        "Write the stdin word to a temporary file.",
        "Print the word read back from the file."
      ],
      "rubric": [
        "Program runs and prints the word read back correctly.",
        "Code is clear, well-named, and organised into functions.",
        "Both file operations use with blocks.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-decorators",
    "slug": "py-decorators",
    "language": "python",
    "category": "languages",
    "title": "Decorators and Metaprogramming",
    "description": "Learn decorators deeply: functions returning functions, arguments, functools.wraps, stacking, class decorators, counting and caching decorators, properties, and the metaprogramming ideas behind them.",
    "difficulty": "Advanced",
    "estimatedHours": 21,
    "skills": [
      "Decorator basics",
      "Decorators with arguments",
      "functools.wraps",
      "Stacking decorators",
      "Class decorators",
      "Counting decorators",
      "Caching decorators",
      "property"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to gift-wrap: the present inside stays the same, but the wrapping adds the message.",
    "modules": [
      {
        "id": "py-decorators-m1",
        "title": "Fundamentals of Decorators and Metaprogramming",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-decorators-m1-l1",
            "slug": "py-decorators-m1-l1",
            "title": "Functions That Return Functions",
            "concept": "A function that returns another function is the building block of decorators: the outer function sets things up and the inner one does the work. Returning the function, not calling it, is the key detail.",
            "syntax": "def outer():\n    def inner():\n        return 42\n    return inner",
            "exampleCode": "def make():\n    def inner():\n        return 42\n    return inner\n\nprint(make()())\n",
            "exampleLanguage": "python",
            "mistake": "Returning inner() instead of inner, which runs the function too early.",
            "bug": {
              "prompt": "The code below should return an inner function that gives 42 and print its result, but it gives the wrong result. What is the bug?",
              "buggyCode": "def make():\n    def inner():\n        return 42\n    return inner()\n\nprint(make())\n",
              "fixedCode": "def make():\n    def inner():\n        return 42\n    return inner\n\nprint(make()())\n",
              "explanation": "Returning inner() calls the function inside make, so make returns 42 instead of a function and make()() would fail."
            },
            "exercise": {
              "title": "Practise Functions That Return Functions",
              "type": "write-code",
              "instructions": "Write a function that returns an inner function adding 5 to its argument, then print the result of calling it with 10.",
              "starterCode": "def make_adder():\n    # TODO: define inner(x) returning x + 5, return inner\n    pass\n\n# TODO: print make_adder()(10)\n",
              "solution": "def make_adder():\n    def inner(x):\n        return x + 5\n    return inner\n\nprint(make_adder()(10))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "15",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "15",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Functions That Return Functions is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-decorators-m1-l2",
            "slug": "py-decorators-m1-l2",
            "title": "Writing Your First Decorator",
            "concept": "A decorator is a function that takes a function and returns a new function that usually calls the original. The @ syntax applies it at definition time, which keeps the decoration visible next to the function.",
            "syntax": "def logged(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper",
            "exampleCode": "def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@shout\ndef greet():\n    return \"hello\"\n\nprint(greet())\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to return the wrapper from the decorator, so the decorated name becomes None.",
            "bug": {
              "prompt": "The code below should decorate a greet function to upper-case its result and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n\n@shout\ndef greet():\n    return \"hello\"\n\nprint(greet())\n",
              "fixedCode": "def shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@shout\ndef greet():\n    return \"hello\"\n\nprint(greet())\n",
              "explanation": "Without returning the wrapper the decorator returns None, so calling greet raises TypeError."
            },
            "exercise": {
              "title": "Practise Writing Your First Decorator",
              "type": "write-code",
              "instructions": "Write a decorator that doubles a function's numeric result, apply it to a function returning the stdin integer, and print the result.",
              "starterCode": "import sys\n\ndef double_result(func):\n    # TODO: wrapper returns func() * 2\n    pass\n\n# TODO: read n, define value() returning n with @double_result, print value()\n",
              "solution": "import sys\n\ndef double_result(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\nn = int(sys.stdin.read().strip())\n\n@double_result\ndef value():\n    return n\n\nprint(value())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42",
                  "hidden": false,
                  "stdin": "21"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "20",
                  "hidden": true,
                  "stdin": "10"
                }
              ],
              "hintNotes": {
                "concept": "Writing Your First Decorator is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-decorators-m1-l3",
            "slug": "py-decorators-m1-l3",
            "title": "Decorators with Arguments",
            "concept": "A decorator with arguments is a function that returns a decorator: one extra level of nesting. The outer call takes the settings and the inner decorator does the wrapping.",
            "syntax": "def repeat(times):\n    def decorator(func):\n        ...\n    return decorator",
            "exampleCode": "def repeat(times):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            return [func(*args, **kwargs) for _ in range(times)]\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef hi():\n    return \"hi\"\n\nprint(hi())\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting the middle level, so the decorator receives the function where it expected an argument.",
            "bug": {
              "prompt": "The code below should repeat a hi function 3 times with a decorator factory and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "def repeat(times):\n    def wrapper(*args, **kwargs):\n        return [func(*args, **kwargs) for _ in range(times)]\n    return wrapper\n\n@repeat(3)\ndef hi():\n    return \"hi\"\n\nprint(hi())\n",
              "fixedCode": "def repeat(times):\n    def decorator(func):\n        def wrapper(*args, **kwargs):\n            return [func(*args, **kwargs) for _ in range(times)]\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef hi():\n    return \"hi\"\n\nprint(hi())\n",
              "explanation": "Without the middle level the name func is undefined inside the wrapper, so the decorator crashes with NameError."
            },
            "exercise": {
              "title": "Check your understanding of Decorators with Arguments",
              "type": "multiple-choice",
              "instructions": "Which statement about Decorators with Arguments is correct?",
              "starterCode": "",
              "solution": "A decorator with arguments is a function that returns a decorator: one extra level of nesting.",
              "solutionExplanation": "A decorator with arguments is a function that returns a decorator: one extra level of nesting. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A decorator with arguments is a function that returns a decorator: one extra level of nesting.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Decorators with Arguments actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A decorator with arguments is a function that returns a decorator: one extra level of nesting.",
                "Decorators with Arguments can only be used once in a program",
                "Decorators with Arguments requires a separate paid licence to use",
                "Decorators with Arguments only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-decorators-m1-l4",
            "slug": "py-decorators-m1-l4",
            "title": "Preserving Metadata with wraps",
            "concept": "functools.wraps copies the original function's name, docstring, and module onto the wrapper, so decorated functions still look like themselves. Without it, every decorated function reports the name 'wrapper'.",
            "syntax": "@functools.wraps(func)",
            "exampleCode": "import functools\n\ndef deco(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@deco\ndef greet():\n    \"\"\"Say hello.\"\"\"\n    return \"hello\"\n\nprint(greet.__name__)\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting wraps, so help() and stack traces show 'wrapper' instead of the real name.",
            "bug": {
              "prompt": "The code below should decorate a greet function with wraps and print its __name__, but it gives the wrong result. What is the bug?",
              "buggyCode": "import functools\n\ndef deco(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@deco\ndef greet():\n    \"\"\"Say hello.\"\"\"\n    return \"hello\"\n\nprint(greet.__name__)\n",
              "fixedCode": "import functools\n\ndef deco(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@deco\ndef greet():\n    \"\"\"Say hello.\"\"\"\n    return \"hello\"\n\nprint(greet.__name__)\n",
              "explanation": "Without wraps the wrapper keeps its own name, so __name__ prints 'wrapper' instead of 'greet'."
            },
            "exercise": {
              "title": "Practise Preserving Metadata with wraps",
              "type": "write-code",
              "instructions": "Decorate a function named 'original' with a wraps-preserving decorator and print its __name__.",
              "starterCode": "import functools\n\ndef deco(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@deco\ndef original():\n    return 1\n\n# TODO: print original.__name__\n",
              "solution": "import functools\n\ndef deco(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@deco\ndef original():\n    return 1\n\nprint(original.__name__)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "original",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "original",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Preserving Metadata with wraps is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-decorators-m1-l5",
            "slug": "py-decorators-m1-l5",
            "title": "Stacking Decorators",
            "concept": "Stacked decorators apply bottom-up: the decorator closest to the function runs first. Order matters, because each wrapper sees the result of the one below it.",
            "syntax": "@upper\n@exclaim\ndef greet(): ...",
            "exampleCode": "def exclaim(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\ndef twice(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@twice\n@exclaim\ndef greet():\n    return \"hello\"\n\nprint(greet())\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that stacked decorators apply bottom-up, so the order of the wrappers is the reverse of the order they are written.",
            "bug": {
              "prompt": "The code below should stack twice over exclaim on greet and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "def exclaim(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\ndef twice(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@exclaim\n@twice\ndef greet():\n    return \"hello\"\n\nprint(greet())\n",
              "fixedCode": "def exclaim(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + \"!\"\n    return wrapper\n\ndef twice(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@twice\n@exclaim\ndef greet():\n    return \"hello\"\n\nprint(greet())\n",
              "explanation": "With exclaim on top, the doubling happens first and the mark is added once, giving 'hellohello!'; with twice on top the mark is added first and the whole thing doubles to 'hello!hello!'."
            },
            "exercise": {
              "title": "Check your understanding of Stacking Decorators",
              "type": "multiple-choice",
              "instructions": "Which statement about Stacking Decorators is correct?",
              "starterCode": "",
              "solution": "Stacked decorators apply bottom-up: the decorator closest to the function runs first.",
              "solutionExplanation": "Stacked decorators apply bottom-up: the decorator closest to the function runs first. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Stacked decorators apply bottom-up: the decorator closest to the function runs first.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Stacking Decorators actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Stacked decorators apply bottom-up: the decorator closest to the function runs first.",
                "Stacking Decorators can only be used once in a program",
                "Stacking Decorators requires a separate paid licence to use",
                "Stacking Decorators only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-decorators-m2",
        "title": "Decorators and Metaprogramming in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-decorators-m2-l1",
            "slug": "py-decorators-m2-l1",
            "title": "Class-Based Decorators",
            "concept": "A class can be a decorator by defining __call__, which lets the decorator keep state between calls, such as a call count. Class decorators suit stateful wrappers that a closure would make awkward.",
            "syntax": "class Counter:\n    def __call__(self, func): ...",
            "exampleCode": "class CountCalls:\n    def __init__(self, func):\n        self.func = func\n        self.calls = 0\n    def __call__(self, *args, **kwargs):\n        self.calls += 1\n        return self.func(*args, **kwargs)\n\n@CountCalls\ndef greet():\n    return \"hi\"\n\ngreet()\ngreet()\nprint(greet.calls)\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to store the wrapped function on the instance, so the decorator cannot call it.",
            "bug": {
              "prompt": "The code below should count two calls to a decorated greet and print the count, but it gives the wrong result. What is the bug?",
              "buggyCode": "class CountCalls:\n    def __init__(self, func):\n        self.calls = 0\n    def __call__(self, *args, **kwargs):\n        self.calls += 1\n        return self.func(*args, **kwargs)\n\n@CountCalls\ndef greet():\n    return \"hi\"\n\ngreet()\ngreet()\nprint(greet.calls)\n",
              "fixedCode": "class CountCalls:\n    def __init__(self, func):\n        self.func = func\n        self.calls = 0\n    def __call__(self, *args, **kwargs):\n        self.calls += 1\n        return self.func(*args, **kwargs)\n\n@CountCalls\ndef greet():\n    return \"hi\"\n\ngreet()\ngreet()\nprint(greet.calls)\n",
              "explanation": "Without storing func the decorator has nothing to call, so the first greet raises AttributeError."
            },
            "exercise": {
              "title": "Practise Class-Based Decorators",
              "type": "write-code",
              "instructions": "Read an integer k from stdin, call a CountCalls-decorated function k times, and print its call count.",
              "starterCode": "import sys\n\nclass CountCalls:\n    def __init__(self, func):\n        self.func = func\n        self.calls = 0\n    def __call__(self, *args, **kwargs):\n        self.calls += 1\n        return self.func(*args, **kwargs)\n\n@CountCalls\ndef work():\n    return \"done\"\n\n# TODO: read k, call work() k times, print work.calls\n",
              "solution": "import sys\n\nclass CountCalls:\n    def __init__(self, func):\n        self.func = func\n        self.calls = 0\n    def __call__(self, *args, **kwargs):\n        self.calls += 1\n        return self.func(*args, **kwargs)\n\n@CountCalls\ndef work():\n    return \"done\"\n\nk = int(sys.stdin.read().strip())\nfor _ in range(k):\n    work()\nprint(work.calls)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "3",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "5",
                  "hidden": true,
                  "stdin": "5"
                }
              ],
              "hintNotes": {
                "concept": "Class-Based Decorators is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-decorators-m2-l2",
            "slug": "py-decorators-m2-l2",
            "title": "Decorators for Counting Calls",
            "concept": "A counting decorator wraps a function and increments a counter on every call, which is useful for profiling and for rate limiting. The count lives on the wrapper, so each decorated function has its own.",
            "syntax": "wrapper.calls += 1",
            "exampleCode": "def count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef work():\n    return 1\n\nwork()\nwork()\nprint(work.calls)\n",
            "exampleLanguage": "python",
            "mistake": "Resetting the counter inside the wrapper instead of outside it.",
            "bug": {
              "prompt": "The code below should call a counted work function twice and print the count, but it gives the wrong result. What is the bug?",
              "buggyCode": "def count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls = 0\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef work():\n    return 1\n\nwork()\nwork()\nprint(work.calls)\n",
              "fixedCode": "def count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef work():\n    return 1\n\nwork()\nwork()\nprint(work.calls)\n",
              "explanation": "Resetting the counter on every call means it never gets past 1, so the print shows 1 instead of 2."
            },
            "exercise": {
              "title": "Practise Decorators for Counting Calls",
              "type": "write-code",
              "instructions": "Read an integer k from stdin, call a counted function k times, and print the call count.",
              "starterCode": "import sys\n\ndef count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef work():\n    return 1\n\n# TODO: read k, call work() k times, print work.calls\n",
              "solution": "import sys\n\ndef count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef work():\n    return 1\n\nk = int(sys.stdin.read().strip())\nfor _ in range(k):\n    work()\nprint(work.calls)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "4",
                  "hidden": false,
                  "stdin": "4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "2",
                  "hidden": true,
                  "stdin": "2"
                }
              ],
              "hintNotes": {
                "concept": "Decorators for Counting Calls is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-decorators-m2-l3",
            "slug": "py-decorators-m2-l3",
            "title": "Property Decorators",
            "concept": "The @property decorator turns a method into an attribute that is computed on access, with a setter for controlled writes. Properties keep the simple attribute syntax while adding validation behind it.",
            "syntax": "@property\ndef area(self):",
            "exampleCode": "class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    @property\n    def radius(self):\n        return self._radius\n    @radius.setter\n    def radius(self, value):\n        if value < 0:\n            raise ValueError(\"negative\")\n        self._radius = value\n\nc = Circle(3)\nprint(c.radius)\nc.radius = 5\nprint(c.radius)\n",
            "exampleLanguage": "python",
            "mistake": "Writing a property getter that calls itself by using the property name instead of the private attribute.",
            "bug": {
              "prompt": "The code below should read a circle radius through a property, set it to 5, and print both values, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    @property\n    def radius(self):\n        return self.radius\n    @radius.setter\n    def radius(self, value):\n        if value < 0:\n            raise ValueError(\"negative\")\n        self._radius = value\n\nc = Circle(3)\nprint(c.radius)\n",
              "fixedCode": "class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    @property\n    def radius(self):\n        return self._radius\n    @radius.setter\n    def radius(self, value):\n        if value < 0:\n            raise ValueError(\"negative\")\n        self._radius = value\n\nc = Circle(3)\nprint(c.radius)\nc.radius = 5\nprint(c.radius)\n",
              "explanation": "The getter reads self.radius, which calls the property again, so it recurses forever until RecursionError."
            },
            "exercise": {
              "title": "Check your understanding of Property Decorators",
              "type": "multiple-choice",
              "instructions": "Which statement about Property Decorators is correct?",
              "starterCode": "",
              "solution": "The @property decorator turns a method into an attribute that is computed on access, with a setter for controlled writes.",
              "solutionExplanation": "The @property decorator turns a method into an attribute that is computed on access, with a setter for controlled writes. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The @property decorator turns a method into an attribute that is computed on access, with a setter for controlled writes.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Property Decorators actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "The @property decorator turns a method into an attribute that is computed on access, with a setter for controlled writes.",
                "Property Decorators can only be used once in a program",
                "Property Decorators requires a separate paid licence to use",
                "Property Decorators only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-decorators-m2-l4",
            "slug": "py-decorators-m2-l4",
            "title": "Caching Decorators",
            "concept": "A caching decorator stores a function's results in a dict keyed by its arguments, so repeated calls return instantly. functools.lru_cache is the standard version, with a size limit and statistics built in.",
            "syntax": "@functools.lru_cache(maxsize=None)",
            "exampleCode": "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(10), fib.cache_info().misses)\n",
            "exampleLanguage": "python",
            "mistake": "Caching a function that depends on changing outside state, so it returns stale results.",
            "bug": {
              "prompt": "The code below should compute fib(10) with lru_cache and print the result and the miss count, but it gives the wrong result. What is the bug?",
              "buggyCode": "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(10), fib.cache_info().hits)\n",
              "fixedCode": "import functools\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(10), fib.cache_info().misses)\n",
              "explanation": "The first call to fib(10) has 11 misses and 0 hits, so printing hits shows 0 instead of 11."
            },
            "exercise": {
              "title": "Practise Caching Decorators",
              "type": "write-code",
              "instructions": "Read an integer n from stdin, compute fib(n) with lru_cache, and print the result and the cache miss count.",
              "starterCode": "import functools, sys\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\n# TODO: read n, print fib(n) and fib.cache_info().misses\n",
              "solution": "import functools, sys\n\n@functools.lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nn = int(sys.stdin.read().strip())\nprint(fib(n), fib.cache_info().misses)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "55 11",
                  "hidden": false,
                  "stdin": "10"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "5 6",
                  "hidden": true,
                  "stdin": "5"
                }
              ],
              "hintNotes": {
                "concept": "Caching Decorators is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-decorators-m2-l5",
            "slug": "py-decorators-m2-l5",
            "title": "A Decorator Toolkit",
            "concept": "A decorator toolkit collects small reusable decorators, such as timing, counting, and retrying, into one module. Each decorator does one job well, and they compose freely on any function.",
            "syntax": "from decorators import retry, timed",
            "exampleCode": "import functools\n\ndef twice(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@twice\ndef five():\n    return 5\n\nprint(five())\n",
            "exampleLanguage": "python",
            "mistake": "Writing one giant decorator that does timing, logging, and retrying all at once.",
            "bug": {
              "prompt": "The code below should double the result of a five() function with a decorator and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "import functools\n\ndef twice(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + 2\n    return wrapper\n\n@twice\ndef five():\n    return 5\n\nprint(five())\n",
              "fixedCode": "import functools\n\ndef twice(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@twice\ndef five():\n    return 5\n\nprint(five())\n",
              "explanation": "Adding 2 instead of doubling gives 7 instead of 10."
            },
            "exercise": {
              "title": "Practise A Decorator Toolkit",
              "type": "write-code",
              "instructions": "Read an integer from stdin, apply a decorator that adds 10 to a function's result, and print the decorated result.",
              "starterCode": "import sys\n\ndef add_ten(func):\n    # TODO: wrapper returns func() + 10\n    pass\n\n# TODO: read n, define value() returning n with @add_ten, print value()\n",
              "solution": "import sys\n\ndef add_ten(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) + 10\n    return wrapper\n\nn = int(sys.stdin.read().strip())\n\n@add_ten\ndef value():\n    return n\n\nprint(value())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "15",
                  "hidden": false,
                  "stdin": "5"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "42",
                  "hidden": true,
                  "stdin": "32"
                }
              ],
              "hintNotes": {
                "concept": "A Decorator Toolkit is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Retry Decorator",
      "type": "build-program",
      "instructions": "Build a retry decorator: read an integer k from stdin; a function fails while a counter is below k and then returns 'done'. Decorate it with a retry decorator that tries up to 5 times and print the result or 'gave up'.",
      "starterCode": "import sys\n\ndef retry(func):\n    # TODO: wrapper tries func up to 5 times, catching ValueError\n    pass\n\n# TODO: read k, define flaky with a counter, decorate, print result or 'gave up'\n",
      "solution": "import sys\n\ndef retry(func):\n    def wrapper(*args, **kwargs):\n        for _ in range(5):\n            try:\n                return func(*args, **kwargs)\n            except ValueError:\n                continue\n        return \"gave up\"\n    return wrapper\n\nk = int(sys.stdin.read().strip())\nstate = [0]\n\n@retry\ndef flaky():\n    state[0] += 1\n    if state[0] < k:\n        raise ValueError(\"not yet\")\n    return \"done\"\n\nprint(flaky())\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "done",
          "hidden": false,
          "stdin": "3"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "gave up",
          "hidden": true,
          "stdin": "6"
        }
      ],
      "hintNotes": {
        "concept": "Retry Decorator is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Retry Decorator Capstone Project",
      "description": "A small end-to-end decorators program that retries a flaky function until it succeeds or gives up.",
      "requirements": [
        "Implement the retry logic as a decorator.",
        "Apply at least three of these skills: Decorator basics, Decorators with arguments, functools.wraps, Stacking decorators.",
        "Retry up to 5 times before giving up.",
        "Print 'done' on success or 'gave up' on failure."
      ],
      "rubric": [
        "Program runs and prints the right result for both cases.",
        "Code is clear, well-named, and organised into functions.",
        "The retry logic lives in the decorator, not in main.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-oop-advanced",
    "slug": "py-oop-advanced",
    "language": "python",
    "category": "languages",
    "title": "Advanced OOP: Descriptors and Metaclasses",
    "description": "Go deep into Python's object model: descriptors, properties under the hood, class and static methods, inheritance and MRO, abstract base classes, slots, metaclasses, and operator overloading.",
    "difficulty": "Advanced",
    "estimatedHours": 18,
    "skills": [
      "Descriptors",
      "Properties",
      "Class methods",
      "Method resolution order",
      "Abstract base classes",
      "__slots__",
      "Metaclasses",
      "Operator overloading"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning how the engine works after years of driving: the car drives the same, but now you know why.",
    "modules": [
      {
        "id": "py-oop-advanced-m1",
        "title": "Fundamentals of Advanced OOP",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-oop-advanced-m1-l1",
            "slug": "py-oop-advanced-m1-l1",
            "title": "Classes Beyond the Basics",
            "concept": "Advanced classes use special methods to control how objects behave: construction, representation, comparison, and cleanup. The data model is what makes Python objects feel like native values.",
            "syntax": "def __repr__(self): ...",
            "exampleCode": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f\"Point({self.x}, {self.y})\"\n\nprint(Point(3, 4))\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting __repr__, so debugging prints a useless memory address.",
            "bug": {
              "prompt": "The code below should create a Point(3, 4) with a __repr__ and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\nprint(Point(3, 4))\n",
              "fixedCode": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f\"Point({self.x}, {self.y})\"\n\nprint(Point(3, 4))\n",
              "explanation": "Without __repr__ the print shows a default like <__main__.Point object at 0x...>, which carries no useful information."
            },
            "exercise": {
              "title": "Practise Classes Beyond the Basics",
              "type": "write-code",
              "instructions": "Read two integers from stdin, build a Point with a __repr__ of 'Point(x, y)', and print it.",
              "starterCode": "import sys\n\nclass Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f\"Point({self.x}, {self.y})\"\n\n# TODO: read x, y; print Point(x, y)\n",
              "solution": "import sys\n\nclass Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __repr__(self):\n        return f\"Point({self.x}, {self.y})\"\n\nx, y = [int(v) for v in sys.stdin.read().split()]\nprint(Point(x, y))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "Point(3, 4)",
                  "hidden": false,
                  "stdin": "3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "Point(1, 2)",
                  "hidden": true,
                  "stdin": "1 2"
                }
              ],
              "hintNotes": {
                "concept": "Classes Beyond the Basics is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-oop-advanced-m1-l2",
            "slug": "py-oop-advanced-m1-l2",
            "title": "Descriptors and __get__",
            "concept": "A descriptor is an object with __get__, __set__, or __delete__ that controls attribute access on another class. Properties, methods, and static methods are all built on descriptors, so learning them explains how Python itself works.",
            "syntax": "class Descriptor:\n    def __get__(self, obj, objtype): ...",
            "exampleCode": "class Ten:\n    def __get__(self, obj, objtype=None):\n        return 10\n\nclass Holder:\n    value = Ten()\n\nprint(Holder().value)\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting that a descriptor must be a class attribute, not an instance attribute.",
            "bug": {
              "prompt": "The code below should read a value through a descriptor that always returns 10 and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Ten:\n    def __get__(self, obj, objtype=None):\n        return 10\n\nclass Holder:\n    def __init__(self):\n        self.value = Ten()\n\nprint(Holder().value)\n",
              "fixedCode": "class Ten:\n    def __get__(self, obj, objtype=None):\n        return 10\n\nclass Holder:\n    value = Ten()\n\nprint(Holder().value)\n",
              "explanation": "A descriptor stored on the instance is just an ordinary attribute, so reading it returns the Ten object itself instead of 10."
            },
            "exercise": {
              "title": "Practise Descriptors and __get__",
              "type": "write-code",
              "instructions": "Define a descriptor that returns the string 'ten' on access, attach it as a class attribute, and print the value read through an instance.",
              "starterCode": "class Ten:\n    # TODO: __get__ returns 'ten'\n    pass\n\nclass Holder:\n    value = Ten()\n\n# TODO: print Holder().value\n",
              "solution": "class Ten:\n    def __get__(self, obj, objtype=None):\n        return \"ten\"\n\nclass Holder:\n    value = Ten()\n\nprint(Holder().value)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ten",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "ten",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Descriptors and __get__ is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-oop-advanced-m1-l3",
            "slug": "py-oop-advanced-m1-l3",
            "title": "Properties Under the Hood",
            "concept": "A property is a data descriptor: its __get__ runs the getter and its __set__ runs the setter. Knowing this explains why a property on a class cannot be bypassed by writing to the instance dict.",
            "syntax": "prop = property(getter, setter)",
            "exampleCode": "class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    @property\n    def radius(self):\n        return self._radius\n\nprint(Circle(3).radius)\n",
            "exampleLanguage": "python",
            "mistake": "Storing the value under the property's own name, which recurses forever.",
            "bug": {
              "prompt": "The code below should read a circle radius through a property and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    @property\n    def radius(self):\n        return self.radius\n\nprint(Circle(3).radius)\n",
              "fixedCode": "class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    @property\n    def radius(self):\n        return self._radius\n\nprint(Circle(3).radius)\n",
              "explanation": "Assigning to self.radius inside __init__ calls the property setter, which does not exist, so it raises AttributeError."
            },
            "exercise": {
              "title": "Check your understanding of Properties Under the Hood",
              "type": "multiple-choice",
              "instructions": "Which statement about Properties Under the Hood is correct?",
              "starterCode": "",
              "solution": "A property is a data descriptor: its __get__ runs the getter and its __set__ runs the setter.",
              "solutionExplanation": "A property is a data descriptor: its __get__ runs the getter and its __set__ runs the setter. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A property is a data descriptor: its __get__ runs the getter and its __set__ runs the setter.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Properties Under the Hood actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A property is a data descriptor: its __get__ runs the getter and its __set__ runs the setter.",
                "Properties Under the Hood can only be used once in a program",
                "Properties Under the Hood requires a separate paid licence to use",
                "Properties Under the Hood only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-oop-advanced-m1-l4",
            "slug": "py-oop-advanced-m1-l4",
            "title": "Class Methods and Static Methods",
            "concept": "A classmethod receives the class and is the standard way to write alternative constructors, while a staticmethod receives neither self nor cls and is a plain function that lives on the class. Choosing the right one keeps the intent clear.",
            "syntax": "@classmethod\ndef from_string(cls, text): ...",
            "exampleCode": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    @classmethod\n    def origin(cls):\n        return cls(0, 0)\n    @staticmethod\n    def describe():\n        return \"a point\"\n\nprint(Point.origin().x, Point.origin().y, Point.describe())\n",
            "exampleLanguage": "python",
            "mistake": "Using a staticmethod for an alternative constructor, which cannot create the right subclass.",
            "bug": {
              "prompt": "The code below should build the origin point with a classmethod and print its coordinates and a static description, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    @staticmethod\n    def origin():\n        return Point(0, 0)\n    @staticmethod\n    def describe():\n        return \"a point\"\n\nprint(Point.origin().x, Point.origin().y, Point.describe())\n",
              "fixedCode": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    @classmethod\n    def origin(cls):\n        return cls(0, 0)\n    @staticmethod\n    def describe():\n        return \"a point\"\n\nprint(Point.origin().x, Point.origin().y, Point.describe())\n",
              "explanation": "The staticmethod version hard-codes Point, so a subclass calling origin would get a Point instead of an instance of the subclass."
            },
            "exercise": {
              "title": "Practise Class Methods and Static Methods",
              "type": "write-code",
              "instructions": "Read two integers from stdin, build a Point with a from_pair classmethod, and print its coordinates.",
              "starterCode": "import sys\n\nclass Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    @classmethod\n    def from_pair(cls, pair):\n        # TODO: return cls(pair[0], pair[1])\n        pass\n\n# TODO: read x, y; print from_pair coordinates\n",
              "solution": "import sys\n\nclass Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    @classmethod\n    def from_pair(cls, pair):\n        return cls(pair[0], pair[1])\n\nx, y = [int(v) for v in sys.stdin.read().split()]\np = Point.from_pair((x, y))\nprint(p.x, p.y)\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "3 4",
                  "hidden": false,
                  "stdin": "3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "1 2",
                  "hidden": true,
                  "stdin": "1 2"
                }
              ],
              "hintNotes": {
                "concept": "Class Methods and Static Methods is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-oop-advanced-m1-l5",
            "slug": "py-oop-advanced-m1-l5",
            "title": "Inheritance and MRO",
            "concept": "The method resolution order is the sequence Python searches when looking up a method, and it follows the C3 linearisation of the class hierarchy. Understanding MRO explains which method wins in multiple inheritance.",
            "syntax": "ClassName.__mro__",
            "exampleCode": "class A:\n    def who(self):\n        return \"A\"\n\nclass B(A):\n    def who(self):\n        return \"B\"\n\nclass C(B):\n    pass\n\nprint(C().who())\nprint([c.__name__ for c in C.__mro__])\n",
            "exampleLanguage": "python",
            "mistake": "Calling a parent method directly by class name instead of using super(), which breaks cooperative inheritance.",
            "bug": {
              "prompt": "The code below should print which class answers who() for C and the MRO class names, but it gives the wrong result. What is the bug?",
              "buggyCode": "class A:\n    def who(self):\n        return \"A\"\n\nclass B(A):\n    def who(self):\n        return \"B\"\n\nclass C(B):\n    pass\n\nprint(C().who())\nprint([c.__name__ for c in B.__mro__])\n",
              "fixedCode": "class A:\n    def who(self):\n        return \"A\"\n\nclass B(A):\n    def who(self):\n        return \"B\"\n\nclass C(B):\n    pass\n\nprint(C().who())\nprint([c.__name__ for c in C.__mro__])\n",
              "explanation": "Printing B's MRO instead of C's gives ['B', 'A', 'object'] and misses the C at the front."
            },
            "exercise": {
              "title": "Check your understanding of Inheritance and MRO",
              "type": "multiple-choice",
              "instructions": "Which statement about Inheritance and MRO is correct?",
              "starterCode": "",
              "solution": "The method resolution order is the sequence Python searches when looking up a method, and it follows the C3 linearisation of the class hierarchy.",
              "solutionExplanation": "The method resolution order is the sequence Python searches when looking up a method, and it follows the C3 linearisation of the class hierarchy. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The method resolution order is the sequence Python searches when looking up a method, and it follows the C3 linearisation of the class hierarchy.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Inheritance and MRO actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "The method resolution order is the sequence Python searches when looking up a method, and it follows the C3 linearisation of the class hierarchy.",
                "Inheritance and MRO can only be used once in a program",
                "Inheritance and MRO requires a separate paid licence to use",
                "Inheritance and MRO only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-oop-advanced-m2",
        "title": "Advanced OOP in Practice",
        "level": "advanced",
        "lessons": [
          {
            "id": "py-oop-advanced-m2-l1",
            "slug": "py-oop-advanced-m2-l1",
            "title": "Abstract Base Classes",
            "concept": "An abstract base class marks methods that subclasses must implement, so a missing method fails at instantiation instead of at runtime. ABCs turn 'you forgot to implement this' into an immediate error.",
            "syntax": "class Shape(ABC):\n    @abstractmethod\n    def area(self): ...",
            "exampleCode": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\nprint(Square(3).area())\n",
            "exampleLanguage": "python",
            "mistake": "Instantiating an abstract class directly, which raises TypeError.",
            "bug": {
              "prompt": "The code below should implement a Square subclass of an abstract Shape and print its area for side 3, but it gives the wrong result. What is the bug?",
              "buggyCode": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\nprint(Square(3).area())\n",
              "fixedCode": "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\nprint(Square(3).area())\n",
              "explanation": "The Square never implements area, so it stays abstract and instantiating it raises TypeError."
            },
            "exercise": {
              "title": "Practise Abstract Base Classes",
              "type": "write-code",
              "instructions": "Read a side length from stdin, build a Square subclass of an abstract Shape, and print its area.",
              "starterCode": "import sys\nfrom abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\n# TODO: read side, print Square(side).area()\n",
              "solution": "import sys\nfrom abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side * self.side\n\nprint(Square(int(sys.stdin.read().strip())).area())\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "9",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "16",
                  "hidden": true,
                  "stdin": "4"
                }
              ],
              "hintNotes": {
                "concept": "Abstract Base Classes is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-oop-advanced-m2-l2",
            "slug": "py-oop-advanced-m2-l2",
            "title": "Slots",
            "concept": "Slots replace the per-instance dict with a fixed set of attributes, which saves memory and makes attribute access slightly faster. The cost is that instances can no longer gain attributes that are not listed.",
            "syntax": "class Point:\n    __slots__ = (\"x\", \"y\")",
            "exampleCode": "class Point:\n    __slots__ = (\"x\", \"y\")\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\np = Point(3, 4)\nprint(p.x, p.y, hasattr(p, \"__dict__\"))\n",
            "exampleLanguage": "python",
            "mistake": "Adding __slots__ to a class that inherits from a class without slots, which gains nothing.",
            "bug": {
              "prompt": "The code below should create a slotted Point(3, 4) and print x, y, and whether it has a __dict__, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\np = Point(3, 4)\nprint(p.x, p.y, hasattr(p, \"__dict__\"))\n",
              "fixedCode": "class Point:\n    __slots__ = (\"x\", \"y\")\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n\np = Point(3, 4)\nprint(p.x, p.y, hasattr(p, \"__dict__\"))\n",
              "explanation": "Without __slots__ every instance gets a __dict__, so the check prints True instead of False."
            },
            "exercise": {
              "title": "Practise Slots",
              "type": "write-code",
              "instructions": "Define a slotted class with one attribute 'value', set it from stdin, and print the value and hasattr(instance, '__dict__').",
              "starterCode": "import sys\n\nclass Box:\n    __slots__ = (\"value\",)\n    def __init__(self, value):\n        self.value = value\n\n# TODO: read n, print Box(n).value and hasattr(Box(n), '__dict__')\n",
              "solution": "import sys\n\nclass Box:\n    __slots__ = (\"value\",)\n    def __init__(self, value):\n        self.value = value\n\nn = int(sys.stdin.read().strip())\nbox = Box(n)\nprint(box.value, hasattr(box, \"__dict__\"))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "42 False",
                  "hidden": false,
                  "stdin": "42"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "7 False",
                  "hidden": true,
                  "stdin": "7"
                }
              ],
              "hintNotes": {
                "concept": "Slots is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-oop-advanced-m2-l3",
            "slug": "py-oop-advanced-m2-l3",
            "title": "Metaclasses",
            "concept": "A metaclass is the class of a class: it controls how the class itself is created. Most programs never need one, but frameworks use metaclasses to register classes or inject behaviour at definition time.",
            "syntax": "class Meta(type):\n    def __new__(mcs, name, bases, attrs): ...",
            "exampleCode": "class Meta(type):\n    def __new__(mcs, name, bases, attrs):\n        attrs[\"kind\"] = name.lower()\n        return super().__new__(mcs, name, bases, attrs)\n\nclass Widget(metaclass=Meta):\n    pass\n\nprint(Widget.kind)\n",
            "exampleLanguage": "python",
            "mistake": "Reaching for a metaclass when a class decorator or __init_subclass__ would do the same job.",
            "bug": {
              "prompt": "The code below should create a Widget class with a metaclass that sets kind to the lowercase class name and print it, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Meta(type):\n    def __new__(mcs, name, bases, attrs):\n        attrs[\"kind\"] = name.upper()\n        return super().__new__(mcs, name, bases, attrs)\n\nclass Widget(metaclass=Meta):\n    pass\n\nprint(Widget.kind)\n",
              "fixedCode": "class Meta(type):\n    def __new__(mcs, name, bases, attrs):\n        attrs[\"kind\"] = name.lower()\n        return super().__new__(mcs, name, bases, attrs)\n\nclass Widget(metaclass=Meta):\n    pass\n\nprint(Widget.kind)\n",
              "explanation": "The metaclass upper-cases the name, so kind is 'WIDGET' instead of 'widget'."
            },
            "exercise": {
              "title": "Check your understanding of Metaclasses",
              "type": "multiple-choice",
              "instructions": "Which statement about Metaclasses is correct?",
              "starterCode": "",
              "solution": "A metaclass is the class of a class: it controls how the class itself is created.",
              "solutionExplanation": "A metaclass is the class of a class: it controls how the class itself is created. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A metaclass is the class of a class: it controls how the class itself is created.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Metaclasses actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A metaclass is the class of a class: it controls how the class itself is created.",
                "Metaclasses can only be used once in a program",
                "Metaclasses requires a separate paid licence to use",
                "Metaclasses only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-oop-advanced-m2-l4",
            "slug": "py-oop-advanced-m2-l4",
            "title": "Operator Overloading",
            "concept": "Operator overloading lets a class define what + or == mean for its objects by implementing dunder methods such as __add__ and __eq__. Well-designed operators make custom types feel like built-ins.",
            "syntax": "def __add__(self, other): ...",
            "exampleCode": "class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f\"Vector({self.x}, {self.y})\"\n\nprint(Vector(1, 2) + Vector(3, 4))\n",
            "exampleLanguage": "python",
            "mistake": "Overloading an operator to do something surprising, such as making + subtract.",
            "bug": {
              "prompt": "The code below should add Vector(1, 2) and Vector(3, 4) and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x - other.x, self.y - other.y)\n    def __repr__(self):\n        return f\"Vector({self.x}, {self.y})\"\n\nprint(Vector(1, 2) + Vector(3, 4))\n",
              "fixedCode": "class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f\"Vector({self.x}, {self.y})\"\n\nprint(Vector(1, 2) + Vector(3, 4))\n",
              "explanation": "The __add__ method subtracts instead of adding, so the result is Vector(-2, -2) instead of Vector(4, 6)."
            },
            "exercise": {
              "title": "Practise Operator Overloading",
              "type": "write-code",
              "instructions": "Read four integers from stdin, add Vector(a, b) and Vector(c, d), and print the resulting vector.",
              "starterCode": "import sys\n\nclass Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f\"Vector({self.x}, {self.y})\"\n\n# TODO: read a b c d, print Vector(a, b) + Vector(c, d)\n",
              "solution": "import sys\n\nclass Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f\"Vector({self.x}, {self.y})\"\n\na, b, c, d = [int(v) for v in sys.stdin.read().split()]\nprint(Vector(a, b) + Vector(c, d))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "Vector(4, 6)",
                  "hidden": false,
                  "stdin": "1 2 3 4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "Vector(10, 10)",
                  "hidden": true,
                  "stdin": "5 5 5 5"
                }
              ],
              "hintNotes": {
                "concept": "Operator Overloading is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-oop-advanced-m2-l5",
            "slug": "py-oop-advanced-m2-l5",
            "title": "A Small Framework with Metaclasses",
            "concept": "A small framework with metaclasses shows the pattern in action: a metaclass registers every model class in a central registry as it is defined. Registration at definition time is what makes frameworks feel automatic.",
            "syntax": "REGISTRY = {}\nclass ModelMeta(type): ...",
            "exampleCode": "REGISTRY = {}\n\nclass ModelMeta(type):\n    def __new__(mcs, name, bases, attrs):\n        cls = super().__new__(mcs, name, bases, attrs)\n        if name != \"Base\":\n            REGISTRY[name] = cls\n        return cls\n\nclass Base(metaclass=ModelMeta):\n    pass\n\nclass User(Base):\n    pass\n\nprint(sorted(REGISTRY))\n",
            "exampleLanguage": "python",
            "mistake": "Registering classes by hand in a list that someone always forgets to update.",
            "bug": {
              "prompt": "The code below should register a User model through a metaclass and print the sorted registry keys, but it gives the wrong result. What is the bug?",
              "buggyCode": "REGISTRY = {}\n\nclass ModelMeta(type):\n    def __new__(mcs, name, bases, attrs):\n        cls = super().__new__(mcs, name, bases, attrs)\n        REGISTRY[name] = cls\n        return cls\n\nclass Base(metaclass=ModelMeta):\n    pass\n\nclass User(Base):\n    pass\n\nprint(sorted(REGISTRY))\n",
              "fixedCode": "REGISTRY = {}\n\nclass ModelMeta(type):\n    def __new__(mcs, name, bases, attrs):\n        cls = super().__new__(mcs, name, bases, attrs)\n        if name != \"Base\":\n            REGISTRY[name] = cls\n        return cls\n\nclass Base(metaclass=ModelMeta):\n    pass\n\nclass User(Base):\n    pass\n\nprint(sorted(REGISTRY))\n",
              "explanation": "Registering every class including Base pollutes the registry with the base class itself, so the list is ['Base', 'User'] instead of ['User']."
            },
            "exercise": {
              "title": "Practise A Small Framework with Metaclasses",
              "type": "write-code",
              "instructions": "Read model names from stdin, register each as a class through a metaclass, and print the sorted registry keys.",
              "starterCode": "import sys\n\nREGISTRY = {}\n\nclass ModelMeta(type):\n    def __new__(mcs, name, bases, attrs):\n        cls = super().__new__(mcs, name, bases, attrs)\n        if name != \"Base\":\n            REGISTRY[name] = cls\n        return cls\n\nclass Base(metaclass=ModelMeta):\n    pass\n\n# TODO: read names, create one class per name with type(name, (Base,), {}), print sorted(REGISTRY)\n",
              "solution": "import sys\n\nREGISTRY = {}\n\nclass ModelMeta(type):\n    def __new__(mcs, name, bases, attrs):\n        cls = super().__new__(mcs, name, bases, attrs)\n        if name != \"Base\":\n            REGISTRY[name] = cls\n        return cls\n\nclass Base(metaclass=ModelMeta):\n    pass\n\nfor name in sys.stdin.read().split():\n    type(name, (Base,), {})\nprint(sorted(REGISTRY))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['Post', 'User']",
                  "hidden": false,
                  "stdin": "User Post"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['Order']",
                  "hidden": true,
                  "stdin": "Order"
                }
              ],
              "hintNotes": {
                "concept": "A Small Framework with Metaclasses is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Vector Math",
      "type": "build-program",
      "instructions": "Build vector math: read four integers from stdin, add Vector(a, b) and Vector(c, d) with __add__, and print the result and its length as 'Vector(x, y) length: L' with L rounded to 2 decimals.",
      "starterCode": "import math, sys\n\n# TODO: Vector with __add__ and __repr__; read a b c d; print vector and its length\n",
      "solution": "import math, sys\n\nclass Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f\"Vector({self.x}, {self.y})\"\n\na, b, c, d = [int(v) for v in sys.stdin.read().split()]\nv = Vector(a, b) + Vector(c, d)\nprint(f\"{v} length: {math.hypot(v.x, v.y):.2f}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "Vector(4, 6) length: 7.21",
          "hidden": false,
          "stdin": "1 2 3 4"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "Vector(3, 4) length: 5.00",
          "hidden": true,
          "stdin": "3 4 0 0"
        }
      ],
      "hintNotes": {
        "concept": "Vector Math is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Vector Math Capstone Project",
      "description": "A small end-to-end OOP program that adds vectors and reports their length.",
      "requirements": [
        "Implement Vector with __add__ and __repr__.",
        "Apply at least three of these skills: Descriptors, Operator overloading, Method resolution order, __slots__.",
        "Read the four coordinates from stdin.",
        "Print the result in the format 'Vector(x, y) length: L' with 2 decimals."
      ],
      "rubric": [
        "Program runs and prints the correct vector and length.",
        "Code is clear, well-named, and organised into classes.",
        "The length is computed with math.hypot and rounded to 2 decimals.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  },
  {
    "id": "py-generators",
    "slug": "py-generators",
    "language": "python",
    "category": "languages",
    "title": "Generators and Iterators in Depth",
    "description": "Learn generators and iterators deeply: iterables versus iterators, yield, yield from, infinite generators, generator expressions, send(), closing, pipelining, and lazy file reading.",
    "difficulty": "Intermediate",
    "estimatedHours": 13,
    "skills": [
      "Iterators",
      "yield",
      "yield from",
      "Infinite generators",
      "Generator expressions",
      "send()",
      "Generator close",
      "Lazy pipelines"
    ],
    "prerequisites": [
      "Python Programming"
    ],
    "analogy": "Learning {topic} is like learning to pour water from a tap instead of carrying buckets: you get exactly as much as you need, when you need it.",
    "modules": [
      {
        "id": "py-generators-m1",
        "title": "Fundamentals of Generators and Iterators in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-generators-m1-l1",
            "slug": "py-generators-m1-l1",
            "title": "Iterables vs Iterators",
            "concept": "An iterable can be looped over many times, while an iterator remembers its position and is exhausted after one pass. Knowing which one you hold explains why a second loop over the same object sometimes yields nothing.",
            "syntax": "it = iter([1, 2, 3])",
            "exampleCode": "it = iter([1, 2, 3])\nprint(next(it), next(it))\nprint(list(it))\n",
            "exampleLanguage": "python",
            "mistake": "Looping over an iterator twice and expecting the second loop to produce values.",
            "bug": {
              "prompt": "The code below should take two items from an iterator over [1, 2, 3] and print the rest as a list, but it gives the wrong result. What is the bug?",
              "buggyCode": "it = iter([1, 2, 3])\nprint(next(it), next(it))\nprint(list(iter([1, 2, 3])))\n",
              "fixedCode": "it = iter([1, 2, 3])\nprint(next(it), next(it))\nprint(list(it))\n",
              "explanation": "Creating a fresh iterator for the last print gives [1, 2, 3] again instead of the remaining [3]."
            },
            "exercise": {
              "title": "Practise Iterables vs Iterators",
              "type": "write-code",
              "instructions": "Read integers from stdin, create an iterator, take the first item with next(), and print the first item and the remaining list.",
              "starterCode": "import sys\n\n# TODO: read ints, it = iter(nums), print next(it) and list(it)\n",
              "solution": "import sys\n\nnums = [int(x) for x in sys.stdin.read().split()]\nit = iter(nums)\nprint(next(it))\nprint(list(it))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "1\n[2, 3]",
                  "hidden": false,
                  "stdin": "1 2 3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "5\n[6]",
                  "hidden": true,
                  "stdin": "5 6"
                }
              ],
              "hintNotes": {
                "concept": "Iterables vs Iterators is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-generators-m1-l2",
            "slug": "py-generators-m1-l2",
            "title": "Writing a Generator Function",
            "concept": "A generator function uses yield to produce values one at a time, pausing between them. Calling it returns a generator object; no code runs until the first next() call.",
            "syntax": "def gen():\n    yield 1",
            "exampleCode": "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))\n",
            "exampleLanguage": "python",
            "mistake": "Using return with a value inside a generator and expecting it to be yielded.",
            "bug": {
              "prompt": "The code below should yield 3, 2, 1 from a countdown generator and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "def countdown(n):\n    while n > 0:\n        return n\n        n -= 1\n\nprint(list(countdown(3)))\n",
              "fixedCode": "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(3)))\n",
              "explanation": "return ends the generator immediately with no values, so the list is empty instead of [3, 2, 1]."
            },
            "exercise": {
              "title": "Practise Writing a Generator Function",
              "type": "write-code",
              "instructions": "Read an integer n from stdin, yield n down to 1 from a generator, and print the list.",
              "starterCode": "import sys\n\ndef countdown(n):\n    # TODO: yield n, n-1, ... down to 1\n    pass\n\n# TODO: read n, print list(countdown(n))\n",
              "solution": "import sys\n\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nprint(list(countdown(int(sys.stdin.read().strip()))))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[3, 2, 1]",
                  "hidden": false,
                  "stdin": "3"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[5, 4, 3, 2, 1]",
                  "hidden": true,
                  "stdin": "5"
                }
              ],
              "hintNotes": {
                "concept": "Writing a Generator Function is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-generators-m1-l3",
            "slug": "py-generators-m1-l3",
            "title": "yield from",
            "concept": "yield from delegates to another iterable or generator, yielding each of its values in turn. It flattens nested generators without a manual loop.",
            "syntax": "yield from other_gen()",
            "exampleCode": "def inner():\n    yield 1\n    yield 2\n\ndef outer():\n    yield 0\n    yield from inner()\n    yield 3\n\nprint(list(outer()))\n",
            "exampleLanguage": "python",
            "mistake": "Yielding the inner generator object itself instead of delegating with yield from.",
            "bug": {
              "prompt": "The code below should delegate from an outer generator to an inner one and print the full list, but it gives the wrong result. What is the bug?",
              "buggyCode": "def inner():\n    yield 1\n    yield 2\n\ndef outer():\n    yield 0\n    yield inner()\n    yield 3\n\nprint(list(outer()))\n",
              "fixedCode": "def inner():\n    yield 1\n    yield 2\n\ndef outer():\n    yield 0\n    yield from inner()\n    yield 3\n\nprint(list(outer()))\n",
              "explanation": "Yielding the generator object itself puts a generator in the list instead of its values 1 and 2."
            },
            "exercise": {
              "title": "Check your understanding of yield from",
              "type": "multiple-choice",
              "instructions": "Which statement about yield from is correct?",
              "starterCode": "",
              "solution": "yield from delegates to another iterable or generator, yielding each of its values in turn.",
              "solutionExplanation": "yield from delegates to another iterable or generator, yielding each of its values in turn. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "yield from delegates to another iterable or generator, yielding each of its values in turn.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what yield from actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "yield from delegates to another iterable or generator, yielding each of its values in turn.",
                "yield from can only be used once in a program",
                "yield from requires a separate paid licence to use",
                "yield from only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-generators-m1-l4",
            "slug": "py-generators-m1-l4",
            "title": "Infinite Generators",
            "concept": "An infinite generator never ends, producing values forever until the consumer stops asking. Infinite generators model streams, counters, and sequences that have no natural end.",
            "syntax": "def naturals():\n    n = 0\n    while True:\n        yield n\n        n += 1",
            "exampleCode": "import itertools\n\ndef naturals():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\nprint(list(itertools.islice(naturals(), 4)))\n",
            "exampleLanguage": "python",
            "mistake": "Converting an infinite generator to a list, which never finishes.",
            "bug": {
              "prompt": "The code below should take the first 4 natural numbers from an infinite generator and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "import itertools\n\ndef naturals():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\nprint(list(naturals()))\n",
              "fixedCode": "import itertools\n\ndef naturals():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\nprint(list(itertools.islice(naturals(), 4)))\n",
              "explanation": "list() on an infinite generator never returns, so the program hangs instead of printing."
            },
            "exercise": {
              "title": "Practise Infinite Generators",
              "type": "write-code",
              "instructions": "Read an integer k from stdin, take the first k even numbers from an infinite generator with islice, and print the list.",
              "starterCode": "import itertools, sys\n\ndef evens():\n    # TODO: yield 0, 2, 4, ... forever\n    pass\n\n# TODO: read k, print list(islice(evens(), k))\n",
              "solution": "import itertools, sys\n\ndef evens():\n    n = 0\n    while True:\n        yield n\n        n += 2\n\nprint(list(itertools.islice(evens(), int(sys.stdin.read().strip()))))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "[0, 2, 4, 6]",
                  "hidden": false,
                  "stdin": "4"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "[0, 2, 4]",
                  "hidden": true,
                  "stdin": "3"
                }
              ],
              "hintNotes": {
                "concept": "Infinite Generators is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-generators-m1-l5",
            "slug": "py-generators-m1-l5",
            "title": "Generator Expressions",
            "concept": "A generator expression is a comprehension with round brackets that produces values lazily instead of building a list. It uses the same syntax as a list comprehension but almost no memory.",
            "syntax": "(x * x for x in range(n))",
            "exampleCode": "print(sum(x * x for x in range(5)))\nprint([x * x for x in range(5)])\n",
            "exampleLanguage": "python",
            "mistake": "Using a generator expression twice, forgetting it is exhausted after the first use.",
            "bug": {
              "prompt": "The code below should sum the squares of 0 to 4 with a generator expression and print the result, but it gives the wrong result. What is the bug?",
              "buggyCode": "print(sum(x * x for x in range(4)))\n",
              "fixedCode": "print(sum(x * x for x in range(5)))\n",
              "explanation": "Summing over range(4) stops at 3 squared, so the total is 14 instead of 30."
            },
            "exercise": {
              "title": "Check your understanding of Generator Expressions",
              "type": "multiple-choice",
              "instructions": "Which statement about Generator Expressions is correct?",
              "starterCode": "",
              "solution": "A generator expression is a comprehension with round brackets that produces values lazily instead of building a list.",
              "solutionExplanation": "A generator expression is a comprehension with round brackets that produces values lazily instead of building a list. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A generator expression is a comprehension with round brackets that produces values lazily instead of building a list.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Generator Expressions actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "A generator expression is a comprehension with round brackets that produces values lazily instead of building a list.",
                "Generator Expressions can only be used once in a program",
                "Generator Expressions requires a separate paid licence to use",
                "Generator Expressions only works on Windows"
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "py-generators-m2",
        "title": "Generators and Iterators in Depth in Practice",
        "level": "intermediate",
        "lessons": [
          {
            "id": "py-generators-m2-l1",
            "slug": "py-generators-m2-l1",
            "title": "Sending Values with send()",
            "concept": "A generator's send() method passes a value back into the paused generator, where it becomes the result of the yield expression. Send turns a generator into a two-way channel, which is the basis of coroutines.",
            "syntax": "value = yield result",
            "exampleCode": "def echo():\n    while True:\n        received = yield \"ready\"\n        yield f\"got {received}\"\n\ng = echo()\nprint(next(g))\nprint(g.send(\"hello\"))\n",
            "exampleLanguage": "python",
            "mistake": "Calling send() on a fresh generator, which raises TypeError because it has not started yet.",
            "bug": {
              "prompt": "The code below should prime an echo generator, send 'hello', and print both responses, but it gives the wrong result. What is the bug?",
              "buggyCode": "def echo():\n    while True:\n        received = yield \"ready\"\n        yield f\"got {received}\"\n\ng = echo()\nprint(g.send(\"hello\"))\n",
              "fixedCode": "def echo():\n    while True:\n        received = yield \"ready\"\n        yield f\"got {received}\"\n\ng = echo()\nprint(next(g))\nprint(g.send(\"hello\"))\n",
              "explanation": "Sending to a generator that has never been started raises TypeError; it must be primed with next() first."
            },
            "exercise": {
              "title": "Practise Sending Values with send()",
              "type": "write-code",
              "instructions": "Read a word from stdin, prime an accumulator generator, send the word into it, and print the echoed response.",
              "starterCode": "import sys\n\ndef echo():\n    # TODO: yield 'ready', then yield f'got {received}'\n    pass\n\n# TODO: read word, prime with next(), send word, print the response\n",
              "solution": "import sys\n\ndef echo():\n    while True:\n        received = yield \"ready\"\n        yield f\"got {received}\"\n\ng = echo()\nprint(next(g))\nprint(g.send(sys.stdin.read().strip()))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "ready\ngot hello",
                  "hidden": false,
                  "stdin": "hello"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "ready\ngot world",
                  "hidden": true,
                  "stdin": "world"
                }
              ],
              "hintNotes": {
                "concept": "Sending Values with send() is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-generators-m2-l2",
            "slug": "py-generators-m2-l2",
            "title": "Closing Generators",
            "concept": "Closing a generator raises GeneratorExit at its current yield point, which lets it clean up and stop early. A generator that ignores the close can keep running, so cleanup code must handle GeneratorExit properly.",
            "syntax": "gen.close()",
            "exampleCode": "def gen():\n    try:\n        yield 1\n        yield 2\n    finally:\n        print(\"cleaned up\")\n\ng = gen()\nprint(next(g))\ng.close()\n",
            "exampleLanguage": "python",
            "mistake": "Forgetting to close a generator that holds a resource, such as an open file.",
            "bug": {
              "prompt": "The code below should take one value from a generator, close it, and print the cleanup message, but it gives the wrong result. What is the bug?",
              "buggyCode": "def gen():\n    try:\n        yield 1\n        yield 2\n    finally:\n        print(\"cleaned up\")\n\ng = gen()\nprint(next(g))\nprint(next(g))\n",
              "fixedCode": "def gen():\n    try:\n        yield 1\n        yield 2\n    finally:\n        print(\"cleaned up\")\n\n\ng = gen()\nprint(next(g))\ng.close()\n",
              "explanation": "Taking the second value instead of closing prints 2 and never runs the cleanup, so 'cleaned up' never appears."
            },
            "exercise": {
              "title": "Practise Closing Generators",
              "type": "write-code",
              "instructions": "Create a generator that yields 1 then 2 with a finally that prints 'cleaned up', take one value, close it, and print both lines.",
              "starterCode": "def gen():\n    try:\n        yield 1\n        yield 2\n    finally:\n        print(\"cleaned up\")\n\n# TODO: g = gen(); print(next(g)); g.close()\n",
              "solution": "def gen():\n    try:\n        yield 1\n        yield 2\n    finally:\n        print(\"cleaned up\")\n\ng = gen()\nprint(next(g))\ng.close()\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "1\ncleaned up",
                  "hidden": false
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "1\ncleaned up",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Closing Generators is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-generators-m2-l3",
            "slug": "py-generators-m2-l3",
            "title": "Pipelining Generators",
            "concept": "Pipelining generators chains them so each stage transforms the stream and passes it on, with no stage ever holding the whole dataset. Pipelines are the lazy equivalent of shell pipes.",
            "syntax": "doubled = (x * 2 for x in source)",
            "exampleCode": "nums = (n for n in range(6))\ndoubled = (n * 2 for n in nums)\nevens = (n for n in doubled if n % 4 == 0)\nprint(list(evens))\n",
            "exampleLanguage": "python",
            "mistake": "Materialising the stream into a list between pipeline stages, which throws away the laziness.",
            "bug": {
              "prompt": "The code below should double 0..5, keep multiples of 4, and print the list, but it gives the wrong result. What is the bug?",
              "buggyCode": "nums = (n for n in range(6))\ndoubled = (n * 2 for n in nums)\nevens = (n for n in doubled if n % 3 == 0)\nprint(list(evens))\n",
              "fixedCode": "nums = (n for n in range(6))\ndoubled = (n * 2 for n in nums)\nevens = (n for n in doubled if n % 4 == 0)\nprint(list(evens))\n",
              "explanation": "Filtering for multiples of 3 keeps [0, 6] instead of the multiples of 4, [0, 4, 8]."
            },
            "exercise": {
              "title": "Check your understanding of Pipelining Generators",
              "type": "multiple-choice",
              "instructions": "Which statement about Pipelining Generators is correct?",
              "starterCode": "",
              "solution": "Pipelining generators chains them so each stage transforms the stream and passes it on, with no stage ever holding the whole dataset.",
              "solutionExplanation": "Pipelining generators chains them so each stage transforms the stream and passes it on, with no stage ever holding the whole dataset. The other options describe limits that do not exist for this feature.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Pipelining generators chains them so each stage transforms the stream and passes it on, with no stage ever holding the whole dataset.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Think about what Pipelining Generators actually does in a Python program, not what it sounds like it might do.",
                "approach": "Rule out any option that claims a hard limit, a licence, or a removal, then check the remaining claim against the lesson.",
                "structure": "Read each option as a factual claim and pick the one that matches the definition given in the lesson."
              },
              "options": [
                "Pipelining generators chains them so each stage transforms the stream and passes it on, with no stage ever holding the whole dataset.",
                "Pipelining Generators can only be used once in a program",
                "Pipelining Generators requires a separate paid licence to use",
                "Pipelining Generators only works on Windows"
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "py-generators-m2-l4",
            "slug": "py-generators-m2-l4",
            "title": "Lazy File Reading",
            "concept": "Reading a file lazily means yielding one line at a time instead of loading the whole file, so even huge files fit in memory. A generator over a file object is the standard pattern for log processing.",
            "syntax": "def read_lines(path):\n    with open(path) as f:\n        yield from f",
            "exampleCode": "import io\n\ndef lines(text):\n    yield from io.StringIO(text)\n\nprint([line.strip() for line in lines(\"a\\nb\\nc\\n\")])\n",
            "exampleLanguage": "python",
            "mistake": "Reading a whole log file with readlines() when only one line is needed at a time.",
            "bug": {
              "prompt": "The code below should yield lines from a three-line text and print them stripped, but it gives the wrong result. What is the bug?",
              "buggyCode": "import io\n\ndef lines(text):\n    yield from io.StringIO(text)\n\nprint([line.strip() for line in lines(\"a\\nb\\n\")])\n",
              "fixedCode": "import io\n\ndef lines(text):\n    yield from io.StringIO(text)\n\nprint([line.strip() for line in lines(\"a\\nb\\nc\\n\")])\n",
              "explanation": "The text is missing the third line, so the result is ['a', 'b'] instead of ['a', 'b', 'c']."
            },
            "exercise": {
              "title": "Practise Lazy File Reading",
              "type": "write-code",
              "instructions": "Read lines from stdin, yield them stripped from a generator, and print the resulting list.",
              "starterCode": "import sys\n\ndef lines(text):\n    # TODO: yield each stripped line\n    pass\n\n# TODO: read stdin text, print [line for line in lines(text)]\n",
              "solution": "import sys\n\ndef lines(text):\n    for line in text.splitlines():\n        yield line.strip()\n\nprint(list(lines(sys.stdin.read())))\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "['a', 'b', 'c']",
                  "hidden": false,
                  "stdin": "a\nb\nc"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "['x', 'y']",
                  "hidden": true,
                  "stdin": "x\ny"
                }
              ],
              "hintNotes": {
                "concept": "Lazy File Reading is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          },
          {
            "id": "py-generators-m2-l5",
            "slug": "py-generators-m2-l5",
            "title": "A Streaming Word Counter",
            "concept": "A streaming word counter reads words lazily from a generator, counts them with a Counter, and never holds the whole text in memory. It is the pattern behind every log-analysis tool that handles files bigger than RAM.",
            "syntax": "Counter(word_stream)",
            "exampleCode": "from collections import Counter\n\ndef words(text):\n    yield from text.split()\n\nprint(Counter(words(\"a b a c a\")))\n",
            "exampleLanguage": "python",
            "mistake": "Counting words by loading the whole file into memory first.",
            "bug": {
              "prompt": "The code below should count the words in 'a b a c a' with a streaming generator and print the Counter, but it gives the wrong result. What is the bug?",
              "buggyCode": "from collections import Counter\n\ndef words(text):\n    yield from text.split()\n\nprint(Counter(words(\"a b a c\")))\n",
              "fixedCode": "from collections import Counter\n\ndef words(text):\n    yield from text.split()\n\nprint(Counter(words(\"a b a c a\")))\n",
              "explanation": "The text is missing the final 'a', so the count for 'a' is 2 instead of 3."
            },
            "exercise": {
              "title": "Practise A Streaming Word Counter",
              "type": "write-code",
              "instructions": "Read words from stdin, count them with Counter over a generator, and print the most common word.",
              "starterCode": "import sys\nfrom collections import Counter\n\ndef words(text):\n    yield from text.split()\n\n# TODO: read text, print Counter(words(text)).most_common(1)[0][0]\n",
              "solution": "import sys\nfrom collections import Counter\n\ndef words(text):\n    yield from text.split()\n\nprint(Counter(words(sys.stdin.read())).most_common(1)[0][0])\n",
              "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
              "tests": [
                {
                  "name": "Runs on the example input",
                  "expectedStdout": "a",
                  "hidden": false,
                  "stdin": "a b a c a"
                },
                {
                  "name": "Runs on a second input",
                  "expectedStdout": "x",
                  "hidden": true,
                  "stdin": "x y x"
                }
              ],
              "hintNotes": {
                "concept": "A Streaming Word Counter is the key idea here: think about what value the program must produce before you write any code.",
                "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
                "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Practise Streaming Line Counter",
      "type": "build-program",
      "instructions": "Build a streaming line counter: read lines from stdin, count them lazily with a generator, and print 'lines: N words: M'.",
      "starterCode": "import sys\n\ndef lines(text):\n    # TODO: yield each line\n    pass\n\n# TODO: read text, count lines and words lazily, print 'lines: N words: M'\n",
      "solution": "import sys\n\ndef lines(text):\n    yield from text.splitlines()\n\ntext = sys.stdin.read()\nline_list = list(lines(text))\nwords = sum(len(line.split()) for line in line_list)\nprint(f\"lines: {len(line_list)} words: {words}\")\n",
      "solutionExplanation": "The solution follows the instructions exactly: it reads the input, performs the computation described, and prints the result in the required format.",
      "tests": [
        {
          "name": "Runs on the example input",
          "expectedStdout": "lines: 3 words: 6",
          "hidden": false,
          "stdin": "a b\nc d e\nf"
        },
        {
          "name": "Runs on a second input",
          "expectedStdout": "lines: 2 words: 3",
          "hidden": true,
          "stdin": "one\ntwo three"
        }
      ],
      "hintNotes": {
        "concept": "Streaming Line Counter is the key idea here: think about what value the program must produce before you write any code.",
        "approach": "Read the input first, then work out the result on paper for the example input, and only then write the Python code.",
        "structure": "Keep the standard shape: read the input, compute the result, and print exactly what the tests expect."
      }
    },
    "capstone": {
      "title": "Streaming Line Counter Capstone Project",
      "description": "A small end-to-end streaming program that counts lines and words without loading the whole input at once.",
      "requirements": [
        "Read the input lazily through a generator.",
        "Apply at least three of these skills: yield, Generator expressions, Lazy pipelines, Iterators.",
        "Count both lines and words.",
        "Print the result in the exact format 'lines: N words: M'."
      ],
      "rubric": [
        "Program runs and prints the correct line and word counts.",
        "Code is clear, well-named, and organised into functions.",
        "The input is consumed through a generator, not a single read into a list.",
        "The solution shows understanding of the track's key ideas, not just copied example code."
      ]
    }
  }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
