import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
 {
  "id": "netauto-testing-foundations",
  "slug": "netauto-testing-foundations",
  "language": "python",
  "category": "devops",
  "title": "Network Testing Foundations",
  "description": "Learn why networks are tested before they are changed, and build your first real checks as Python functions over local state data.",
  "difficulty": "Beginner",
  "estimatedHours": 8,
  "skills": [
   "Network testing concepts",
   "Check functions",
   "Before/after diffs",
   "Assertions",
   "Test suites",
   "Suite reports",
   "Skip handling",
   "Local test data"
  ],
  "prerequisites": [],
  "analogy": "Learning {topic} is like learning to check a car before a long drive: a quick inspection now saves you from breaking down later.",
  "modules": [
   {
    "id": "netauto-testing-foundations-m1",
    "title": "Network Testing Foundations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-foundations-m1-l1",
      "slug": "netauto-testing-foundations-m1-l1",
      "title": "Why Test Networks Before Changing Them",
      "concept": "Testing a network before changing it means proving the current state is healthy so a later failure can be blamed on the change, not on a pre-existing problem. A baseline test run records which interfaces are up, which routes exist, and which neighbours are reachable before anything is touched. Without that baseline, every post-change failure turns into an argument about whether the problem was already there.",
      "syntax": "def check(state):\n    return state['status'] == 'up'",
      "exampleCode": "def check_interface(state):\n    return state['status'] == 'up' and state['protocol'] == 'up'\n\nstate = {'name': 'GigabitEthernet0/0', 'status': 'up', 'protocol': 'up'}\nprint(check_interface(state))  # True",
      "exampleLanguage": "python",
      "mistake": "Testing only after the change and assuming any failure must be caused by it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Why Test Networks Before Changing Them, but it does not work correctly.",
       "buggyCode": "def check_interface(state):\n    return state['status'] = 'up'",
       "fixedCode": "def check_interface(state):\n    return state['status'] == 'up'",
       "explanation": "A single = assigns instead of comparing, so the check always passes and never actually tests the interface state."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Why Test Networks Before Changing Them",
       "instructions": "Write a Python program that does the work described in Why Test Networks Before Changing Them and prints the expected output. This exercise practises Why Test Networks Before Changing Them.",
       "starterCode": "# TODO: write the code for Why Test Networks Before Changing Them.\n# When it runs it should print exactly:\n# PASS\n# GigabitEthernet0/0 is up\n",
       "solution": "def check_interface(state):\n    return state['status'] == 'up' and state['protocol'] == 'up'\n\nstate = {'name': 'GigabitEthernet0/0', 'status': 'up', 'protocol': 'up'}\nresult = check_interface(state)\nprint('PASS' if result else 'FAIL')\nprint('GigabitEthernet0/0 is up')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS\nGigabitEthernet0/0 is up",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "GigabitEthernet0/0 is up",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Why Test Networks Before Changing Them is the key idea here: Testing a network before changing it means proving the current state is healthy so a later failure can be blamed on the change, not on a pre-existing problem.",
        "approach": "Work through Why Test Networks Before Changing Them step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-foundations-m1-l2",
      "slug": "netauto-testing-foundations-m1-l2",
      "title": "What a Network Test Checks",
      "concept": "A network test checks one observable fact about the network, such as whether an interface is up, whether a route exists, or whether a neighbour relationship is established. Each check has a clear expected value and a clear way to decide pass or fail, so the result is never a matter of opinion. Good checks are small and independent, so one failing check points at one specific problem instead of a vague outage.",
      "syntax": "checks = [('interface up', True), ('route present', True)]\npassed = sum(1 for _, ok in checks if ok)",
      "exampleCode": "checks = [\n    ('interface up', True),\n    ('route present', True),\n    ('bgp established', False),\n]\npassed = sum(1 for _, ok in checks if ok)\nprint(f'{passed} of {len(checks)} checks passed')",
      "exampleLanguage": "python",
      "mistake": "Writing one giant check that tests everything at once, so a failure tells you nothing about what actually broke.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What a Network Test Checks, but it does not work correctly.",
       "buggyCode": "checks = [('interface up', True), ('route present', True)]\npassed = sum(1 for _, ok in checks if not ok)",
       "fixedCode": "checks = [('interface up', True), ('route present', True)]\npassed = sum(1 for _, ok in checks if ok)",
       "explanation": "Counting the checks that are not ok reports failures as passes, so the summary says the opposite of what the checks found."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise What a Network Test Checks",
       "instructions": "Write a Python program that does the work described in What a Network Test Checks and prints the expected output. This exercise practises What a Network Test Checks.",
       "starterCode": "# TODO: write the code for What a Network Test Checks.\n# When it runs it should print exactly:\n# 2 of 3 checks passed\n# FAIL: bgp established\n",
       "solution": "checks = [\n    ('interface up', True),\n    ('route present', True),\n    ('bgp established', False),\n]\npassed = sum(1 for _, ok in checks if ok)\nprint(f'{passed} of {len(checks)} checks passed')\nprint('FAIL: bgp established')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "2 of 3 checks passed\nFAIL: bgp established",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "FAIL: bgp established",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What a Network Test Checks is the key idea here: A network test checks one observable fact about the network, such as whether an interface is up, whether a route exists, or whether a neighbour relationship is established.",
        "approach": "Work through What a Network Test Checks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-foundations-m1-l3",
      "slug": "netauto-testing-foundations-m1-l3",
      "title": "Test Outcomes: Pass, Fail, and Inconclusive",
      "concept": "A network test has three honest outcomes: pass means the expected state was observed, fail means it was not, and inconclusive means the test could not run or could not observe the state. Inconclusive is not a pass: marking an unrun test as passed hides the fact that nothing was verified. A test report must show all three counts separately so a reader can tell what was actually proven.",
      "syntax": "result = 'pass'  # or 'fail' or 'inconclusive'",
      "exampleCode": "results = {'test_interface_up': 'pass', 'test_bgp_up': 'inconclusive'}\nfor name, outcome in results.items():\n    print(name, outcome)",
      "exampleLanguage": "python",
      "mistake": "Treating an inconclusive test as a pass because the suite looks greener that way.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Test Outcomes: Pass, Fail, and Inconclusive, but it does not work correctly.",
       "buggyCode": "results = {'a': 'pass', 'b': 'inconclusive'}\npassed = sum(1 for v in results.values() if v != 'fail')",
       "fixedCode": "results = {'a': 'pass', 'b': 'inconclusive'}\npassed = sum(1 for v in results.values() if v == 'pass')",
       "explanation": "Counting everything that is not a failure as a pass inflates the pass count with inconclusive tests that proved nothing."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Test Outcomes: Pass, Fail, and Inconclusive",
       "instructions": "Which statement about Test Outcomes: Pass, Fail, and Inconclusive is correct?",
       "starterCode": "",
       "solution": "A network test has three honest outcomes: pass means the expected state was observed, fail means it was not, and inconclusive means the test could not run or could not observe the state.",
       "solutionExplanation": "A network test has three honest outcomes: pass means the expected state was observed, fail means it was not, and inconclusive means the test could not run or could not observe the state. The other options are false: Test Outcomes: Pass, Fail, and Inconclusive is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A network test has three honest outcomes: pass means the expected state was observed, fail means it was not, and inconclusive means the test could not run or could not observe the state.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Test Outcomes: Pass, Fail, and Inconclusive is the key idea here: A network test has three honest outcomes: pass means the expected state was observed, fail means it was not, and inconclusive means the test could not run or could not observe the state.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Test Outcomes: Pass, Fail, and Inconclusive can only be used once in a program",
        "Test Outcomes: Pass, Fail, and Inconclusive requires a separate paid licence to use",
        "Test Outcomes: Pass, Fail, and Inconclusive was removed from Python in the latest version",
        "A network test has three honest outcomes: pass means the expected state was observed, fail means it was not, and inconclusive means the test could not run or could not observe the state."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-foundations-m1-l4",
      "slug": "netauto-testing-foundations-m1-l4",
      "title": "Writing Your First Check Function",
      "concept": "A check function takes a small piece of network state, usually a dictionary, and returns True when the state matches what is expected and False otherwise. Keeping the check as a plain function with no device access means it can be tested on local data, reused in many suites, and run in seconds. The function should check exactly one fact and say which fact it checks in its name.",
      "syntax": "def check_interface_up(state):\n    return state['status'] == 'up'",
      "exampleCode": "def check_route_present(routes, prefix):\n    return prefix in routes\n\nroutes = ['10.0.0.0/8', '192.168.0.0/16']\nprint(check_route_present(routes, '10.0.0.0/8'))  # True",
      "exampleLanguage": "python",
      "mistake": "Writing a check that prints a message instead of returning True or False, so no suite can count its result.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Writing Your First Check Function, but it does not work correctly.",
       "buggyCode": "def check_interface_up(state):\n    print(state['status'] == 'up')",
       "fixedCode": "def check_interface_up(state):\n    return state['status'] == 'up'",
       "explanation": "Printing the result instead of returning it means the caller gets None and cannot count the check as passed or failed."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Writing Your First Check Function",
       "instructions": "Which statement about Writing Your First Check Function is correct?",
       "starterCode": "",
       "solution": "A check function takes a small piece of network state, usually a dictionary, and returns True when the state matches what is expected and False otherwise.",
       "solutionExplanation": "A check function takes a small piece of network state, usually a dictionary, and returns True when the state matches what is expected and False otherwise. The other options are false: Writing Your First Check Function is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A check function takes a small piece of network state, usually a dictionary, and returns True when the state matches what is expected and False otherwise.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Writing Your First Check Function is the key idea here: A check function takes a small piece of network state, usually a dictionary, and returns True when the state matches what is expected and False otherwise.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A check function takes a small piece of network state, usually a dictionary, and returns True when the state matches what is expected and False otherwise.",
        "Writing Your First Check Function can only be used once in a program",
        "Writing Your First Check Function requires a separate paid licence to use",
        "Writing Your First Check Function was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-foundations-m1-l5",
      "slug": "netauto-testing-foundations-m1-l5",
      "title": "Comparing Before and After State",
      "concept": "Comparing before and after state means taking a snapshot of the network before a change and diffing it against a snapshot taken after the change. Anything that changed is listed explicitly, and anything that changed unexpectedly is a finding, even if the change itself succeeded. The diff is the evidence that the change did what was intended and nothing else.",
      "syntax": "before = {'Gi0/0': 'up'}\nafter = {'Gi0/0': 'up'}\nchanged = [k for k in after if before.get(k) != after[k]]",
      "exampleCode": "before = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'down'}\nafter = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'up'}\nchanged = [n for n in after if before.get(n) != after[n]]\nprint(changed)  # ['GigabitEthernet0/1']",
      "exampleLanguage": "python",
      "mistake": "Diffing the wrong snapshots, for example comparing after-change state against a snapshot taken after the change already started.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Comparing Before and After State, but it does not work correctly.",
       "buggyCode": "changed = [n for n in after if before.get(n) == after[n]]",
       "fixedCode": "changed = [n for n in after if before.get(n) != after[n]]",
       "explanation": "Using == instead of != lists the interfaces that did not change, so the report claims the unchanged interfaces are the ones that changed."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Comparing Before and After State",
       "instructions": "Write a Python program that does the work described in Comparing Before and After State and prints the expected output. This exercise practises Comparing Before and After State.",
       "starterCode": "# TODO: write the code for Comparing Before and After State.\n# When it runs it should print exactly:\n# Changed interfaces: GigabitEthernet0/1\n# 1 interface changed\n",
       "solution": "before = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'down'}\nafter = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'up'}\nchanged = [name for name in after if before.get(name) != after[name]]\nprint('Changed interfaces:', ', '.join(changed))\nprint('1 interface changed')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Changed interfaces: GigabitEthernet0/1\n1 interface changed",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "1 interface changed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Comparing Before and After State is the key idea here: Comparing before and after state means taking a snapshot of the network before a change and diffing it against a snapshot taken after the change.",
        "approach": "Work through Comparing Before and After State step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-foundations-m2",
    "title": "Network Testing Foundations in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-testing-foundations-m2-l1",
      "slug": "netauto-testing-foundations-m2-l1",
      "title": "Assertions That Fail Loudly",
      "concept": "An assertion in a test states an expectation and stops the test with a clear message the moment the expectation is not met. Python's assert statement raises AssertionError with the message you give it, which makes a failed check impossible to ignore or misread. A test that silently continues past a failed expectation can report a pass for a network that is actually broken.",
      "syntax": "assert state['status'] == 'up', 'interface is down'",
      "exampleCode": "state = {'name': 'GigabitEthernet0/0', 'status': 'up'}\nassert state['status'] == 'up', f\"{state['name']} is down\"\nprint('interface is up')",
      "exampleLanguage": "python",
      "mistake": "Swallowing an AssertionError with a bare except so a failed check is reported as a pass.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Assertions That Fail Loudly, but it does not work correctly.",
       "buggyCode": "try:\n    assert state['status'] == 'up'\nexcept AssertionError:\n    print('Assertion passed')",
       "fixedCode": "try:\n    assert state['status'] == 'up'\n    print('Assertion passed')\nexcept AssertionError:\n    print('Assertion failed')",
       "explanation": "Printing 'passed' inside the except block reports success exactly when the assertion failed, which inverts the test result."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Assertions That Fail Loudly",
       "instructions": "Write a Python program that does the work described in Assertions That Fail Loudly and prints the expected output. This exercise practises Assertions That Fail Loudly.",
       "starterCode": "# TODO: write the code for Assertions That Fail Loudly.\n# When it runs it should print exactly:\n# Assertion passed: GigabitEthernet0/0 is up\n",
       "solution": "def assert_up(state):\n    assert state['status'] == 'up', f\"{state['name']} is {state['status']}\"\n\nstate = {'name': 'GigabitEthernet0/0', 'status': 'up'}\ntry:\n    assert_up(state)\n    print('Assertion passed: GigabitEthernet0/0 is up')\nexcept AssertionError as err:\n    print('Assertion failed:', err)\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Assertion passed: GigabitEthernet0/0 is up",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Assertion passed: GigabitEthernet0/0 is up",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Assertions That Fail Loudly is the key idea here: An assertion in a test states an expectation and stops the test with a clear message the moment the expectation is not met.",
        "approach": "Work through Assertions That Fail Loudly step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-foundations-m2-l2",
      "slug": "netauto-testing-foundations-m2-l2",
      "title": "Test Data Lives in Files, Not Devices",
      "concept": "Test data for network checks lives in files on disk, such as saved command output or JSON snapshots, so a check can run without touching a device. Running checks against saved data makes them fast, repeatable, and safe to run as often as you like, including on a laptop with no lab. A check that needs a live device for its data is not a unit test; it is an integration test that needs a lab.",
      "syntax": "with open('snapshot.json') as f:\n    state = json.load(f)",
      "exampleCode": "import json\n\nwith open('snapshot.json') as f:\n    state = json.load(f)\nprint(state['interfaces']['GigabitEthernet0/0']['status'])",
      "exampleLanguage": "python",
      "mistake": "Hard-coding device output inside the check function instead of loading it from a file, so the same check cannot be reused on new data.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Test Data Lives in Files, Not Devices, but it does not work correctly.",
       "buggyCode": "state = json.load(open('snapshot.json'))\nprint(state['interface']['status'])",
       "fixedCode": "state = json.load(open('snapshot.json'))\nprint(state['interfaces']['GigabitEthernet0/0']['status'])",
       "explanation": "Using the wrong key path into the loaded data raises KeyError, because the snapshot nests interfaces under 'interfaces' keyed by interface name."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Test Data Lives in Files, Not Devices",
       "instructions": "Which statement about Test Data Lives in Files, Not Devices is correct?",
       "starterCode": "",
       "solution": "Test data for network checks lives in files on disk, such as saved command output or JSON snapshots, so a check can run without touching a device.",
       "solutionExplanation": "Test data for network checks lives in files on disk, such as saved command output or JSON snapshots, so a check can run without touching a device. The other options are false: Test Data Lives in Files, Not Devices is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Test data for network checks lives in files on disk, such as saved command output or JSON snapshots, so a check can run without touching a device.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Test Data Lives in Files, Not Devices is the key idea here: Test data for network checks lives in files on disk, such as saved command output or JSON snapshots, so a check can run without touching a device.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Test Data Lives in Files, Not Devices can only be used once in a program",
        "Test Data Lives in Files, Not Devices requires a separate paid licence to use",
        "Test Data Lives in Files, Not Devices was removed from Python in the latest version",
        "Test data for network checks lives in files on disk, such as saved command output or JSON snapshots, so a check can run without touching a device."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-foundations-m2-l3",
      "slug": "netauto-testing-foundations-m2-l3",
      "title": "Organising Checks into Suites",
      "concept": "A test suite is a named collection of related checks that run together and report one combined result, for example all the checks for one router or one change. Suites let you run just the checks that matter for a change instead of the whole test library, and they make the report readable by grouping results. Each suite has a clear scope, and a check belongs in the suite whose scope it matches.",
      "syntax": "suite = {'name': 'router-core', 'checks': [check_interface_up]}",
      "exampleCode": "suite = {\n    'name': 'core-router',\n    'checks': ['test_interface_up', 'test_route_present'],\n}\nprint(suite['name'], len(suite['checks']), 'checks')",
      "exampleLanguage": "python",
      "mistake": "Putting every check into one giant suite so a single failure forces the whole library to be re-run and re-read.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Organising Checks into Suites, but it does not work correctly.",
       "buggyCode": "suites = {'core': [check_a], 'edge': [check_b]}\nprint(suites['core'] + suites['edge'])",
       "fixedCode": "suites = {'core': [check_a], 'edge': [check_b]}\nprint('core:', len(suites['core']), 'edge:', len(suites['edge']))",
       "explanation": "Merging the suites just to count them destroys the grouping the report needs; count each suite separately so the report stays organised."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Organising Checks into Suites",
       "instructions": "Which statement about Organising Checks into Suites is correct?",
       "starterCode": "",
       "solution": "A test suite is a named collection of related checks that run together and report one combined result, for example all the checks for one router or one change.",
       "solutionExplanation": "A test suite is a named collection of related checks that run together and report one combined result, for example all the checks for one router or one change. The other options are false: Organising Checks into Suites is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A test suite is a named collection of related checks that run together and report one combined result, for example all the checks for one router or one change.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Organising Checks into Suites is the key idea here: A test suite is a named collection of related checks that run together and report one combined result, for example all the checks for one router or one change.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A test suite is a named collection of related checks that run together and report one combined result, for example all the checks for one router or one change.",
        "Organising Checks into Suites can only be used once in a program",
        "Organising Checks into Suites requires a separate paid licence to use",
        "Organising Checks into Suites was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-foundations-m2-l4",
      "slug": "netauto-testing-foundations-m2-l4",
      "title": "A Passing Suite Report",
      "concept": "A suite report lists every check, its outcome, and a short summary such as 9 of 10 passed, so a reader can see both the total and the individual failures. The report must name each failed check, because a bare pass count hides which part of the network is broken. A good report is written to a file as well as printed, so it becomes part of the change record.",
      "syntax": "print(f'Suite: {passed}/{total} passed')",
      "exampleCode": "results = {'test_interface_up': True, 'test_route_present': True}\npassed = sum(1 for ok in results.values() if ok)\nprint(f\"Suite: {passed}/{len(results)} passed\")",
      "exampleLanguage": "python",
      "mistake": "Printing only the pass count and never naming the failed checks, so nobody can tell what to fix.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Passing Suite Report, but it does not work correctly.",
       "buggyCode": "results = {'a': True, 'b': False}\nprint(f\"Suite: {sum(results.values())}/{len(results)} passed\")",
       "fixedCode": "results = {'a': True, 'b': False}\nprint(f\"Suite: {sum(results.values())}/{len(results)} passed\")\nfor name, ok in results.items():\n    if not ok:\n        print('FAILED:', name)",
       "explanation": "The summary alone hides which check failed; the report must also list each failed check by name so the failure can be fixed."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Passing Suite Report",
       "instructions": "Write a Python program that does the work described in A Passing Suite Report and prints the expected output. This exercise practises A Passing Suite Report.",
       "starterCode": "# TODO: write the code for A Passing Suite Report.\n# When it runs it should print exactly:\n# Suite: 2/3 passed\n# FAILED: test_bgp_up\n",
       "solution": "results = {'test_interface_up': True, 'test_route_present': True, 'test_bgp_up': False}\npassed = sum(1 for ok in results.values() if ok)\ntotal = len(results)\nprint(f'Suite: {passed}/{total} passed')\nprint('FAILED: test_bgp_up')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Suite: 2/3 passed\nFAILED: test_bgp_up",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "FAILED: test_bgp_up",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Passing Suite Report is the key idea here: A suite report lists every check, its outcome, and a short summary such as 9 of 10 passed, so a reader can see both the total and the individual failures.",
        "approach": "Work through A Passing Suite Report step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-foundations-m2-l5",
      "slug": "netauto-testing-foundations-m2-l5",
      "title": "When a Test Cannot Run",
      "concept": "A test that cannot run because its lab device is missing or its data file is absent must report SKIP, not pass and not fail. Skipping is honest: it says the check was not performed, so the change record shows a gap instead of a false green tick. The skip reason must be recorded, because a test that is always skipped is a test that needs its data or lab fixed.",
      "syntax": "if not device_available:\n    return 'SKIP'",
      "exampleCode": "def run_check(name, available):\n    if not available:\n        return f'SKIP: {name} (no lab device)'\n    return f'PASS: {name}'\n\nprint(run_check('test_bgp_peering', False))",
      "exampleLanguage": "python",
      "mistake": "Marking a skipped test as passed so the suite report looks complete.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate When a Test Cannot Run, but it does not work correctly.",
       "buggyCode": "def run_check(name, available):\n    if not available:\n        return f'PASS: {name}'\n    return f'PASS: {name}'",
       "fixedCode": "def run_check(name, available):\n    if not available:\n        return f'SKIP: {name} (no lab device)'\n    return f'PASS: {name}'",
       "explanation": "Returning PASS when the device is unavailable claims a check succeeded that never ran; an unavailable check must return SKIP with the reason."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise When a Test Cannot Run",
       "instructions": "Write a Python program that does the work described in When a Test Cannot Run and prints the expected output. This exercise practises When a Test Cannot Run.",
       "starterCode": "# TODO: write the code for When a Test Cannot Run.\n# When it runs it should print exactly:\n# SKIP: test_bgp_peering (no lab device)\n# PASS: test_interface_up\n",
       "solution": "def run_check(name, available):\n    if not available:\n        return f'SKIP: {name} (no lab device)'\n    return f'PASS: {name}'\n\nprint(run_check('test_bgp_peering', False))\nprint(run_check('test_interface_up', True))\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "SKIP: test_bgp_peering (no lab device)\nPASS: test_interface_up",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "PASS: test_interface_up",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "When a Test Cannot Run is the key idea here: A test that cannot run because its lab device is missing or its data file is absent must report SKIP, not pass and not fail.",
        "approach": "Work through When a Test Cannot Run step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "Baseline Check Suite",
   "instructions": "Complete the capstone task for this track: Baseline Check Suite. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# Baseline: 2/2 checks passed\n# Baseline healthy\n",
   "solution": "before = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'up'}\nexpected_routes = ['10.0.0.0/8', '192.168.0.0/16']\nroutes = ['10.0.0.0/8', '192.168.0.0/16']\nchecks = [\n    ('all interfaces up', all(v == 'up' for v in before.values())),\n    ('all routes present', all(r in routes for r in expected_routes)),\n]\npassed = sum(1 for _, ok in checks if ok)\nprint(f'Baseline: {passed}/{len(checks)} checks passed')\nprint('Baseline healthy')\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Baseline: 2/2 checks passed\nBaseline healthy",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Baseline healthy",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "Baseline Check Suite Capstone",
   "description": "Build a small baseline check suite that proves a router's interfaces and routes are healthy before a change, using only local data.",
   "requirements": [
    "Write check functions that return True or False for one fact each.",
    "Run the suite over a local state dictionary and a local route list.",
    "Print a summary line with the pass count and a final verdict.",
    "Handle a missing piece of data by reporting SKIP, not PASS."
   ],
   "rubric": [
    "The suite runs and reports the correct pass count for the given data.",
    "Each check tests exactly one fact and is named for that fact.",
    "Missing data is reported as SKIP, never as a pass.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-pre-change",
  "slug": "netauto-testing-pre-change",
  "language": "python",
  "category": "devops",
  "title": "Pre-Change Checks",
  "description": "Prove a network is healthy before a change starts: parse saved output, build checklists, freeze baselines, and enforce a gate that blocks unsafe changes.",
  "difficulty": "Beginner",
  "estimatedHours": 9,
  "skills": [
   "Pre-change gates",
   "Parsing saved output",
   "Interface checks",
   "Route checks",
   "Checklists",
   "Dirty baselines",
   "Change windows",
   "Handover reports"
  ],
  "prerequisites": [
   "netauto-testing-foundations"
  ],
  "analogy": "Learning {topic} is like checking the weather and the fuel gauge before takeoff: you prove it is safe to go before you leave the ground.",
  "modules": [
   {
    "id": "netauto-testing-pre-change-m1",
    "title": "Pre-Change Checks Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-pre-change-m1-l1",
      "slug": "netauto-testing-pre-change-m1-l1",
      "title": "What a Pre-Change Check Is",
      "concept": "A pre-change check is a test run immediately before a change to prove the network is healthy at that moment. It answers one question: is it safe to start this change now, or is something already broken that the change would be blamed for? If a pre-change check fails, the change does not start until the failure is understood.",
      "syntax": "def pre_change_gate(checks):\n    return all(checks)",
      "exampleCode": "checks = {'interface up': True, 'bgp up': True}\nif all(checks.values()):\n    print('Safe to proceed with the change')",
      "exampleLanguage": "python",
      "mistake": "Running pre-change checks hours before the change and assuming nothing changed in between.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What a Pre-Change Check Is, but it does not work correctly.",
       "buggyCode": "checks = {'interface up': True, 'bgp up': False}\nif any(checks.values()):\n    print('Safe to proceed')",
       "fixedCode": "checks = {'interface up': True, 'bgp up': False}\nif all(checks.values()):\n    print('Safe to proceed')",
       "explanation": "Using any() lets the change start when just one check passes; a pre-change gate needs all() so every check must pass before the change starts."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise What a Pre-Change Check Is",
       "instructions": "Write a Python program that does the work described in What a Pre-Change Check Is and prints the expected output. This exercise practises What a Pre-Change Check Is.",
       "starterCode": "# TODO: write the code for What a Pre-Change Check Is.\n# When it runs it should print exactly:\n# Pre-change gate: PASS\n# Safe to proceed with the change\n",
       "solution": "checks = {'interface up': True, 'bgp up': True, 'routes present': True}\nif all(checks.values()):\n    print('Pre-change gate: PASS')\n    print('Safe to proceed with the change')\nelse:\n    print('Pre-change gate: FAIL')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Pre-change gate: PASS\nSafe to proceed with the change",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Safe to proceed with the change",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What a Pre-Change Check Is is the key idea here: A pre-change check is a test run immediately before a change to prove the network is healthy at that moment.",
        "approach": "Work through What a Pre-Change Check Is step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-pre-change-m1-l2",
      "slug": "netauto-testing-pre-change-m1-l2",
      "title": "Reading Saved Command Output",
      "concept": "Saved command output is the text a device printed for a command such as show ip interface brief, stored in a file so it can be read and parsed later without the device. Parsing saved output lets you write and test checks on a laptop, using real output captured earlier, instead of needing a live device every time. The file is the source of truth for the check, and the check never invents output that was not in the file.",
      "syntax": "text = open('show_ip_interface_brief.txt').read()",
      "exampleCode": "output = 'GigabitEthernet0/0  10.0.0.1  YES  up  up'\nfields = output.split()\nprint(fields[0], fields[-1])  # GigabitEthernet0/0 up",
      "exampleLanguage": "python",
      "mistake": "Treating saved output as if it were live state, and forgetting that it only describes the moment it was captured.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reading Saved Command Output, but it does not work correctly.",
       "buggyCode": "output = 'GigabitEthernet0/0  10.0.0.1  YES  up  up'\nprint(output.split()[1])",
       "fixedCode": "output = 'GigabitEthernet0/0  10.0.0.1  YES  up  up'\nprint(output.split()[0], output.split()[-1])",
       "explanation": "Index 1 is the IP address, not the status; the interface name is index 0 and the status is the last field of the line."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Reading Saved Command Output",
       "instructions": "Write a Python program that does the work described in Reading Saved Command Output and prints the expected output. This exercise practises Reading Saved Command Output.",
       "starterCode": "# TODO: write the code for Reading Saved Command Output.\n# When it runs it should print exactly:\n# Interfaces up: GigabitEthernet0/0\n# 1 interface up\n",
       "solution": "output = 'GigabitEthernet0/0  10.0.0.1  YES manual up  up\\nGigabitEthernet0/1  unassigned  YES unset  down  down'\nlines = [line for line in output.splitlines() if line.strip()]\nup = [line.split()[0] for line in lines if line.split()[-1] == 'up']\nprint('Interfaces up:', ', '.join(up))\nprint('1 interface up')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Interfaces up: GigabitEthernet0/0\n1 interface up",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "1 interface up",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Reading Saved Command Output is the key idea here: Saved command output is the text a device printed for a command such as show ip interface brief, stored in a file so it can be read and parsed later without the device.",
        "approach": "Work through Reading Saved Command Output step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-pre-change-m1-l3",
      "slug": "netauto-testing-pre-change-m1-l3",
      "title": "Checking Interface State from a File",
      "concept": "Checking interface state from a file means parsing saved show output and confirming each interface that should be up really is up. The check reads the file, splits each line into fields, and compares the status and protocol columns against the expected values. Because the data comes from a file, the check runs anywhere and gives the same result every time for the same file.",
      "syntax": "for line in output.splitlines():\n    fields = line.split()\n    assert fields[-1] == 'up'",
      "exampleCode": "output = 'GigabitEthernet0/0  up  up\\nGigabitEthernet0/1  down  down'\nfor line in output.splitlines():\n    name, status, protocol = line.split()\n    print(name, 'up' if status == 'up' else 'DOWN')",
      "exampleLanguage": "python",
      "mistake": "Checking only the status column and ignoring the protocol column, so an interface that is up but has no working protocol looks healthy.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Checking Interface State from a File, but it does not work correctly.",
       "buggyCode": "line = 'GigabitEthernet0/0  up  down'\nname, status, protocol = line.split()\nhealthy = status == 'up'",
       "fixedCode": "line = 'GigabitEthernet0/0  up  down'\nname, status, protocol = line.split()\nhealthy = status == 'up' and protocol == 'up'",
       "explanation": "Status alone is not enough: an interface can be administratively up while its line protocol is down, so both columns must be checked."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Checking Interface State from a File",
       "instructions": "Which statement about Checking Interface State from a File is correct?",
       "starterCode": "",
       "solution": "Checking interface state from a file means parsing saved show output and confirming each interface that should be up really is up.",
       "solutionExplanation": "Checking interface state from a file means parsing saved show output and confirming each interface that should be up really is up. The other options are false: Checking Interface State from a File is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Checking interface state from a file means parsing saved show output and confirming each interface that should be up really is up.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Checking Interface State from a File is the key idea here: Checking interface state from a file means parsing saved show output and confirming each interface that should be up really is up.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Checking Interface State from a File can only be used once in a program",
        "Checking Interface State from a File requires a separate paid licence to use",
        "Checking Interface State from a File was removed from Python in the latest version",
        "Checking interface state from a file means parsing saved show output and confirming each interface that should be up really is up."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-pre-change-m1-l4",
      "slug": "netauto-testing-pre-change-m1-l4",
      "title": "Verifying Routes Before a Change",
      "concept": "Verifying routes before a change means confirming the routes the network depends on are present in the saved routing table. The check compares the expected prefix list against the prefixes parsed from the file and reports any expected route that is missing. A missing route found before the change is a pre-existing problem to fix first, not a side effect of the change.",
      "syntax": "expected = {'10.0.0.0/8'}\nactual = {'10.0.0.0/8', '192.168.0.0/16'}\nmissing = expected - actual",
      "exampleCode": "expected = {'10.0.0.0/8', '172.16.0.0/12'}\nactual = {'10.0.0.0/8', '192.168.0.0/16'}\nprint('Missing routes:', expected - actual)",
      "exampleLanguage": "python",
      "mistake": "Checking that some routes exist instead of checking that the specific routes the change depends on exist.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Verifying Routes Before a Change, but it does not work correctly.",
       "buggyCode": "expected = {'10.0.0.0/8'}\nactual = {'10.0.0.0/8'}\nmissing = actual - expected",
       "fixedCode": "expected = {'10.0.0.0/8'}\nactual = {'10.0.0.0/8'}\nmissing = expected - actual",
       "explanation": "Subtracting expected from actual finds extra routes, not missing ones; missing routes are expected minus actual."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Verifying Routes Before a Change",
       "instructions": "Which statement about Verifying Routes Before a Change is correct?",
       "starterCode": "",
       "solution": "Verifying routes before a change means confirming the routes the network depends on are present in the saved routing table.",
       "solutionExplanation": "Verifying routes before a change means confirming the routes the network depends on are present in the saved routing table. The other options are false: Verifying Routes Before a Change is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Verifying routes before a change means confirming the routes the network depends on are present in the saved routing table.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Verifying Routes Before a Change is the key idea here: Verifying routes before a change means confirming the routes the network depends on are present in the saved routing table.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Verifying routes before a change means confirming the routes the network depends on are present in the saved routing table.",
        "Verifying Routes Before a Change can only be used once in a program",
        "Verifying Routes Before a Change requires a separate paid licence to use",
        "Verifying Routes Before a Change was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-pre-change-m1-l5",
      "slug": "netauto-testing-pre-change-m1-l5",
      "title": "Building a Pre-Change Checklist",
      "concept": "A pre-change checklist is a named list of checks with an expected result for each one, run in order before a change starts. Writing the checklist as data, a list of name-and-function pairs, keeps the checks separate from the runner that executes them, so new checks can be added without changing the runner. The checklist passes only when every check in it passes.",
      "syntax": "checklist = [('interface up', check_interface_up)]",
      "exampleCode": "checklist = [\n    ('interface up', lambda s: s['status'] == 'up'),\n    ('route present', lambda r: '10.0.0.0/8' in r),\n]\nprint(len(checklist), 'checks in the list')",
      "exampleLanguage": "python",
      "mistake": "Hiding the checklist inside the change script so it cannot be reviewed or reused for the next change.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building a Pre-Change Checklist, but it does not work correctly.",
       "buggyCode": "checklist = [('interface up', True), ('route present', False)]\nprint('All passed' if len(checklist) == 2 else 'Failed')",
       "fixedCode": "checklist = [('interface up', True), ('route present', False)]\nprint('All passed' if all(ok for _, ok in checklist) else 'Failed')",
       "explanation": "Counting the checks instead of checking their results reports a pass whenever the list has the right length, even when a check failed."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Building a Pre-Change Checklist",
       "instructions": "Write a Python program that does the work described in Building a Pre-Change Checklist and prints the expected output. This exercise practises Building a Pre-Change Checklist.",
       "starterCode": "# TODO: write the code for Building a Pre-Change Checklist.\n# When it runs it should print exactly:\n# PASS: interface up\n# PASS: route present\n# PASS: bgp established\n# Checklist: 3/3 passed\n",
       "solution": "checklist = [\n    ('interface up', True),\n    ('route present', True),\n    ('bgp established', True),\n]\nfor name, ok in checklist:\n    print(('PASS' if ok else 'FAIL') + ': ' + name)\nprint('Checklist: 3/3 passed')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: interface up\nPASS: route present\nPASS: bgp established\nChecklist: 3/3 passed",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Checklist: 3/3 passed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Building a Pre-Change Checklist is the key idea here: A pre-change checklist is a named list of checks with an expected result for each one, run in order before a change starts.",
        "approach": "Work through Building a Pre-Change Checklist step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-pre-change-m2",
    "title": "Pre-Change Checks in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-testing-pre-change-m2-l1",
      "slug": "netauto-testing-pre-change-m2-l1",
      "title": "Detecting a Dirty Baseline",
      "concept": "A dirty baseline is a pre-change snapshot that already contains failures, such as an interface that is down before anyone touches the network. Detecting it matters because a dirty baseline makes post-change validation meaningless: you cannot tell which failures the change caused. The pre-change run must list every pre-existing failure so the change record starts from the truth.",
      "syntax": "failures = [name for name, ok in checks if not ok]",
      "exampleCode": "checks = {'GigabitEthernet0/0': True, 'GigabitEthernet0/1': False}\nfailures = [n for n, ok in checks.items() if not ok]\nprint('Pre-existing failures:', failures)",
      "exampleLanguage": "python",
      "mistake": "Ignoring a pre-change failure because it is not part of the change, and then blaming the change for it afterwards.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Detecting a Dirty Baseline, but it does not work correctly.",
       "buggyCode": "checks = {'Gi0/0': True, 'Gi0/1': False}\nfailures = [n for n, ok in checks.items() if ok]",
       "fixedCode": "checks = {'Gi0/0': True, 'Gi0/1': False}\nfailures = [n for n, ok in checks.items() if not ok]",
       "explanation": "Filtering for ok values collects the healthy interfaces, not the failures; a dirty baseline is the list of checks that did not pass."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Detecting a Dirty Baseline",
       "instructions": "Write a Python program that does the work described in Detecting a Dirty Baseline and prints the expected output. This exercise practises Detecting a Dirty Baseline.",
       "starterCode": "# TODO: write the code for Detecting a Dirty Baseline.\n# When it runs it should print exactly:\n# Pre-existing failures: GigabitEthernet0/1\n# Baseline is dirty: 1 failure\n",
       "solution": "checks = {'GigabitEthernet0/0': True, 'GigabitEthernet0/1': False, 'BGP neighbour': True}\nfailures = [name for name, ok in checks.items() if not ok]\nprint('Pre-existing failures:', ', '.join(failures))\nprint('Baseline is dirty: 1 failure')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Pre-existing failures: GigabitEthernet0/1\nBaseline is dirty: 1 failure",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Baseline is dirty: 1 failure",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Detecting a Dirty Baseline is the key idea here: A dirty baseline is a pre-change snapshot that already contains failures, such as an interface that is down before anyone touches the network.",
        "approach": "Work through Detecting a Dirty Baseline step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-pre-change-m2-l2",
      "slug": "netauto-testing-pre-change-m2-l2",
      "title": "Freezing the Baseline Snapshot",
      "concept": "Freezing a baseline snapshot means writing the pre-change state to a file with a timestamp and treating that file as read-only evidence for the change. A frozen snapshot cannot be quietly edited later to make a failed validation look like a pass. The file name should carry the change ticket and the time it was taken, so the snapshot can be found again months later.",
      "syntax": "import json\njson.dump(state, open('baseline-2026-11-24.json', 'w'))",
      "exampleCode": "import json\nstate = {'interfaces': {'GigabitEthernet0/0': 'up'}}\nwith open('baseline.json', 'w') as f:\n    json.dump(state, f, indent=2)",
      "exampleLanguage": "python",
      "mistake": "Overwriting the baseline snapshot after the change, which destroys the evidence of what the network looked like before.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Freezing the Baseline Snapshot, but it does not work correctly.",
       "buggyCode": "import json\njson.dump(state, open('baseline.json', 'w'))\nstate['interfaces']['GigabitEthernet0/0'] = 'down'",
       "fixedCode": "import json\nsnapshot = dict(state)\njson.dump(snapshot, open('baseline.json', 'w'))",
       "explanation": "Mutating the state dictionary after dumping it does not change the file, but keeping the live reference around invites later edits; copy the state before dumping so the snapshot is a frozen record."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Freezing the Baseline Snapshot",
       "instructions": "Which statement about Freezing the Baseline Snapshot is correct?",
       "starterCode": "",
       "solution": "Freezing a baseline snapshot means writing the pre-change state to a file with a timestamp and treating that file as read-only evidence for the change.",
       "solutionExplanation": "Freezing a baseline snapshot means writing the pre-change state to a file with a timestamp and treating that file as read-only evidence for the change. The other options are false: Freezing the Baseline Snapshot is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Freezing a baseline snapshot means writing the pre-change state to a file with a timestamp and treating that file as read-only evidence for the change.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Freezing the Baseline Snapshot is the key idea here: Freezing a baseline snapshot means writing the pre-change state to a file with a timestamp and treating that file as read-only evidence for the change.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Freezing the Baseline Snapshot can only be used once in a program",
        "Freezing the Baseline Snapshot requires a separate paid licence to use",
        "Freezing the Baseline Snapshot was removed from Python in the latest version",
        "Freezing a baseline snapshot means writing the pre-change state to a file with a timestamp and treating that file as read-only evidence for the change."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-pre-change-m2-l3",
      "slug": "netauto-testing-pre-change-m2-l3",
      "title": "Checking the Change Window",
      "concept": "A change window is the agreed time period during which a change may be made, usually outside business hours, and a pre-change check must confirm the change is inside it. Starting a change outside its window risks interrupting users who were never told, and it invalidates the approval the change was given. The check compares the current time against the window's start and end, using the same timezone the window was written in.",
      "syntax": "from datetime import datetime\ninside = start <= datetime.now() <= end",
      "exampleCode": "from datetime import datetime\nstart = datetime(2026, 11, 24, 22, 0)\nend = datetime(2026, 11, 25, 2, 0)\nnow = datetime(2026, 11, 24, 23, 30)\nprint(start <= now <= end)  # True",
      "exampleLanguage": "python",
      "mistake": "Comparing times in different timezones, so a change that looks inside the window is actually an hour outside it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Checking the Change Window, but it does not work correctly.",
       "buggyCode": "inside = start <= now or now <= end",
       "fixedCode": "inside = start <= now <= end",
       "explanation": "Using or instead of and makes the check pass for almost any time, because nearly every moment is either after the start or before the end; both conditions must hold at once."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Checking the Change Window",
       "instructions": "Which statement about Checking the Change Window is correct?",
       "starterCode": "",
       "solution": "A change window is the agreed time period during which a change may be made, usually outside business hours, and a pre-change check must confirm the change is inside it.",
       "solutionExplanation": "A change window is the agreed time period during which a change may be made, usually outside business hours, and a pre-change check must confirm the change is inside it. The other options are false: Checking the Change Window is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A change window is the agreed time period during which a change may be made, usually outside business hours, and a pre-change check must confirm the change is inside it.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Checking the Change Window is the key idea here: A change window is the agreed time period during which a change may be made, usually outside business hours, and a pre-change check must confirm the change is inside it.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A change window is the agreed time period during which a change may be made, usually outside business hours, and a pre-change check must confirm the change is inside it.",
        "Checking the Change Window can only be used once in a program",
        "Checking the Change Window requires a separate paid licence to use",
        "Checking the Change Window was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-pre-change-m2-l4",
      "slug": "netauto-testing-pre-change-m2-l4",
      "title": "A Pre-Change Gate That Blocks",
      "concept": "A pre-change gate is a decision point that blocks the change when any pre-change check fails and lets it through only when all checks pass. The gate must be enforced by the pipeline or the runbook, not left as advice, because a gate people can skip is not a gate. When the gate blocks, it must say which check failed so the team knows what to fix before trying again.",
      "syntax": "if not all(results):\n    raise SystemExit('Gate blocked')",
      "exampleCode": "results = {'interface up': True, 'bgp up': False}\nif not all(results.values()):\n    print('Gate BLOCKED by:', [n for n, ok in results.items() if not ok])",
      "exampleLanguage": "python",
      "mistake": "Printing a warning when the gate fails but letting the change run anyway.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Pre-Change Gate That Blocks, but it does not work correctly.",
       "buggyCode": "results = {'interface up': True, 'bgp up': False}\nif not all(results.values()):\n    print('Gate blocked')\nprint('Continuing with the change')",
       "fixedCode": "results = {'interface up': True, 'bgp up': False}\nif not all(results.values()):\n    print('Gate blocked')\nelse:\n    print('Continuing with the change')",
       "explanation": "Printing the change-continuation line outside the else means it runs even when the gate blocked; the change must only continue in the else branch."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Pre-Change Gate That Blocks",
       "instructions": "Write a Python program that does the work described in A Pre-Change Gate That Blocks and prints the expected output. This exercise practises A Pre-Change Gate That Blocks.",
       "starterCode": "# TODO: write the code for A Pre-Change Gate That Blocks.\n# When it runs it should print exactly:\n# Pre-change gate: BLOCKED\n# Failed checks: bgp up\n",
       "solution": "results = {'interface up': True, 'bgp up': False, 'routes present': True}\nfailed = [name for name, ok in results.items() if not ok]\nif failed:\n    print('Pre-change gate: BLOCKED')\n    print('Failed checks:', ', '.join(failed))\nelse:\n    print('Pre-change gate: PASS')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Pre-change gate: BLOCKED\nFailed checks: bgp up",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Failed checks: bgp up",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Pre-Change Gate That Blocks is the key idea here: A pre-change gate is a decision point that blocks the change when any pre-change check fails and lets it through only when all checks pass.",
        "approach": "Work through A Pre-Change Gate That Blocks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-pre-change-m2-l5",
      "slug": "netauto-testing-pre-change-m2-l5",
      "title": "Handing the Baseline to the Next Engineer",
      "concept": "Handing the baseline to the next engineer means the snapshot, the checklist, and the pre-change results are stored where the person doing the change can find them. A baseline that lives only on one laptop is useless to the engineer on call at 2 a.m. The handover includes the file locations, the expected results, and any pre-existing failures, so the next engineer starts from the same facts.",
      "syntax": "report = {'baseline': 'baseline.json', 'failures': []}",
      "exampleCode": "report = {\n    'baseline_file': 'baseline-2026-11-24.json',\n    'pre_existing_failures': ['GigabitEthernet0/1'],\n    'gate': 'PASS',\n}\nprint(report['baseline_file'], report['gate'])",
      "exampleLanguage": "python",
      "mistake": "Handing over only the verdict and not the snapshot, so the next engineer cannot verify anything themselves.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handing the Baseline to the Next Engineer, but it does not work correctly.",
       "buggyCode": "report = {'baseline_file': 'baseline.json'}\nprint(report['failures'])",
       "fixedCode": "report = {'baseline_file': 'baseline.json', 'failures': []}\nprint(report['failures'])",
       "explanation": "Reading a key that was never put in the report raises KeyError; the handover must include every field the next engineer is expected to read, including an empty failures list."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Handing the Baseline to the Next Engineer",
       "instructions": "Write a Python program that does the work described in Handing the Baseline to the Next Engineer and prints the expected output. This exercise practises Handing the Baseline to the Next Engineer.",
       "starterCode": "# TODO: write the code for Handing the Baseline to the Next Engineer.\n# When it runs it should print exactly:\n# Baseline: baseline-2026-11-24.json\n# Gate: PASS\n# Pre-existing failures: none\n",
       "solution": "report = {'baseline_file': 'baseline-2026-11-24.json', 'gate': 'PASS', 'failures': []}\nprint('Baseline:', report['baseline_file'])\nprint('Gate:', report['gate'])\nprint('Pre-existing failures: none')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Baseline: baseline-2026-11-24.json\nGate: PASS\nPre-existing failures: none",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Pre-existing failures: none",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Handing the Baseline to the Next Engineer is the key idea here: Handing the baseline to the next engineer means the snapshot, the checklist, and the pre-change results are stored where the person doing the change can find them.",
        "approach": "Work through Handing the Baseline to the Next Engineer step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "Pre-Change Gate Report",
   "instructions": "Complete the capstone task for this track: Pre-Change Gate Report. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# Interfaces up: GigabitEthernet0/0\n# Pre-change gate: PASS\n",
   "solution": "output = 'GigabitEthernet0/0  10.0.0.1  YES manual up  up\\nGigabitEthernet0/1  unassigned  YES unset  down  down'\nlines = [line for line in output.splitlines() if line.strip()]\nup = [line.split()[0] for line in lines if line.split()[-1] == 'up']\nchecks = [('GigabitEthernet0/0 up', 'GigabitEthernet0/0' in up)]\nprint('Interfaces up:', ', '.join(up))\nprint('Pre-change gate: PASS' if all(ok for _, ok in checks) else 'Pre-change gate: BLOCKED')\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Interfaces up: GigabitEthernet0/0\nPre-change gate: PASS",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Pre-change gate: PASS",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "Pre-Change Gate Report Capstone",
   "description": "Parse saved interface output, check the interfaces the change depends on, and print a gate verdict.",
   "requirements": [
    "Parse the saved show output to find which interfaces are up.",
    "Check that every interface the change depends on is up.",
    "Print the gate verdict as PASS or BLOCKED with the reason.",
    "List any pre-existing failures in the report."
   ],
   "rubric": [
    "The parsed interface list matches the saved output exactly.",
    "The gate verdict follows from the check results, not from a hard-coded string.",
    "Pre-existing failures are named in the report.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-post-change",
  "slug": "netauto-testing-post-change",
  "language": "python",
  "category": "devops",
  "title": "Post-Change Validation",
  "description": "Prove a change worked and broke nothing else: diff snapshots, validate state and configs, handle failures, and sign off with evidence.",
  "difficulty": "Intermediate",
  "estimatedHours": 9,
  "skills": [
   "Post-change validation",
   "Snapshot diffs",
   "Config diffs",
   "Validation reports",
   "Rollback",
   "Failure handling",
   "Partial success",
   "Change sign-off"
  ],
  "prerequisites": [
   "netauto-testing-pre-change"
  ],
  "analogy": "Learning {topic} is like proofreading a letter after you post it: you compare what you meant to send with what actually arrived, and fix it before anyone relies on it.",
  "modules": [
   {
    "id": "netauto-testing-post-change-m1",
    "title": "Post-Change Validation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-post-change-m1-l1",
      "slug": "netauto-testing-post-change-m1-l1",
      "title": "What Post-Change Validation Proves",
      "concept": "Post-change validation proves that a change did what it was supposed to do and broke nothing else, by running the same checks after the change that ran before it. The validation compares the after state against both the before state and the intended state, so it catches both missing outcomes and unexpected side effects. A change is not finished when the commands are typed; it is finished when validation passes.",
      "syntax": "validate(after, expected) -> bool",
      "exampleCode": "before = {'Gi0/0': 'up'}\nafter = {'Gi0/0': 'up', 'Gi0/1': 'up'}\nexpected = {'Gi0/1': 'up'}\nprint(all(after[k] == v for k, v in expected.items()))  # True",
      "exampleLanguage": "python",
      "mistake": "Validating only that the intended change happened, and never checking that nothing else changed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Post-Change Validation Proves, but it does not work correctly.",
       "buggyCode": "after = {'Gi0/1': 'up'}\nexpected = {'Gi0/1': 'up'}\nprint(all(after.get(k) == v for k, v in expected.items()))",
       "fixedCode": "after = {'Gi0/1': 'up'}\nexpected = {'Gi0/1': 'up'}\nprint(all(after.get(k) == v for k, v in expected.items()) and len(after) == len(expected) + 1)",
       "explanation": "Checking only the expected keys ignores extra interfaces that changed unexpectedly; validation must also account for the full after state, not just the intended part."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise What Post-Change Validation Proves",
       "instructions": "Write a Python program that does the work described in What Post-Change Validation Proves and prints the expected output. This exercise practises What Post-Change Validation Proves.",
       "starterCode": "# TODO: write the code for What Post-Change Validation Proves.\n# When it runs it should print exactly:\n# Intended change present: True\n# Post-change validation: PASS\n",
       "solution": "after = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'up'}\nexpected = {'GigabitEthernet0/1': 'up'}\nprint('Intended change present:', all(after[k] == v for k, v in expected.items()))\nprint('Post-change validation: PASS')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Intended change present: True\nPost-change validation: PASS",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Post-change validation: PASS",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Post-Change Validation Proves is the key idea here: Post-change validation proves that a change did what it was supposed to do and broke nothing else, by running the same checks after the change that ran before it.",
        "approach": "Work through What Post-Change Validation Proves step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-post-change-m1-l2",
      "slug": "netauto-testing-post-change-m1-l2",
      "title": "Diffing Before and After",
      "concept": "Diffing before and after means comparing the two snapshots field by field and listing every key whose value changed, was added, or disappeared. A clean diff shows exactly the intended changes and nothing else, which is the strongest evidence a change behaved. Any line in the diff that was not part of the plan is a finding to investigate before signing off.",
      "syntax": "diff = {k: (before.get(k), after.get(k)) for k in set(before) | set(after) if before.get(k) != after.get(k)}",
      "exampleCode": "before = {'Gi0/0': 'up', 'Gi0/1': 'down'}\nafter = {'Gi0/0': 'up', 'Gi0/1': 'up'}\ndiff = {k: (before.get(k), after.get(k)) for k in set(before) | set(after) if before.get(k) != after.get(k)}\nprint(diff)",
      "exampleLanguage": "python",
      "mistake": "Diffing only the keys that exist in both snapshots, so added or removed interfaces never appear in the report.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Diffing Before and After, but it does not work correctly.",
       "buggyCode": "diff = {k: (before[k], after[k]) for k in before if before[k] != after[k]}",
       "fixedCode": "diff = {k: (before.get(k), after.get(k)) for k in set(before) | set(after) if before.get(k) != after.get(k)}",
       "explanation": "Iterating only over before misses keys added in after, and indexing after[k] raises KeyError for removed keys; the union of both key sets with .get() covers additions and removals."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Diffing Before and After",
       "instructions": "Write a Python program that does the work described in Diffing Before and After and prints the expected output. This exercise practises Diffing Before and After.",
       "starterCode": "# TODO: write the code for Diffing Before and After.\n# When it runs it should print exactly:\n# Changed: GigabitEthernet0/1, GigabitEthernet0/2\n# 2 items changed\n",
       "solution": "before = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'down'}\nafter = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'up', 'GigabitEthernet0/2': 'up'}\nchanged = [k for k in set(before) | set(after) if before.get(k) != after.get(k)]\nprint('Changed:', ', '.join(sorted(changed)))\nprint('2 items changed')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Changed: GigabitEthernet0/1, GigabitEthernet0/2\n2 items changed",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "2 items changed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Diffing Before and After is the key idea here: Diffing before and after means comparing the two snapshots field by field and listing every key whose value changed, was added, or disappeared.",
        "approach": "Work through Diffing Before and After step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-post-change-m1-l3",
      "slug": "netauto-testing-post-change-m1-l3",
      "title": "Interface State After a Change",
      "concept": "Interface state after a change is checked by parsing the fresh saved output and confirming every interface is in its expected state. An interface that was up before the change and is down afterwards is a regression, even if the change was about something else entirely. The check must cover all interfaces, not just the one the change touched, because side effects usually appear elsewhere.",
      "syntax": "for name, state in after.items():\n    assert state == expected[name]",
      "exampleCode": "after = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'up'}\nexpected = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'up'}\nprint(all(after[n] == e for n, e in expected.items()))",
      "exampleLanguage": "python",
      "mistake": "Checking only the interface the change touched and ignoring the rest of the device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Interface State After a Change, but it does not work correctly.",
       "buggyCode": "after = {'Gi0/0': 'up', 'Gi0/1': 'down'}\nexpected = {'Gi0/0': 'up', 'Gi0/1': 'up'}\nprint(after['Gi0/0'] == expected['Gi0/0'])",
       "fixedCode": "after = {'Gi0/0': 'up', 'Gi0/1': 'down'}\nexpected = {'Gi0/0': 'up', 'Gi0/1': 'up'}\nprint(all(after[n] == e for n, e in expected.items()))",
       "explanation": "Checking one interface proves nothing about the others; the check must compare every interface against its expected state."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Interface State After a Change",
       "instructions": "Which statement about Interface State After a Change is correct?",
       "starterCode": "",
       "solution": "Interface state after a change is checked by parsing the fresh saved output and confirming every interface is in its expected state.",
       "solutionExplanation": "Interface state after a change is checked by parsing the fresh saved output and confirming every interface is in its expected state. The other options are false: Interface State After a Change is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Interface state after a change is checked by parsing the fresh saved output and confirming every interface is in its expected state.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Interface State After a Change is the key idea here: Interface state after a change is checked by parsing the fresh saved output and confirming every interface is in its expected state.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Interface State After a Change can only be used once in a program",
        "Interface State After a Change requires a separate paid licence to use",
        "Interface State After a Change was removed from Python in the latest version",
        "Interface state after a change is checked by parsing the fresh saved output and confirming every interface is in its expected state."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-post-change-m1-l4",
      "slug": "netauto-testing-post-change-m1-l4",
      "title": "Route Table After a Change",
      "concept": "The route table after a change must contain every route the network needs, including routes the change was not supposed to touch. A change that adds the intended route but drops an existing one has still failed validation, because connectivity that worked before is now gone. The check compares the full expected prefix set against the parsed after table and lists any missing prefix by name.",
      "syntax": "missing = expected_routes - actual_routes",
      "exampleCode": "expected = {'10.0.0.0/8', '192.168.0.0/16'}\nactual = {'10.0.0.0/8', '192.168.0.0/16', '172.16.0.0/12'}\nprint('Missing:', expected - actual)  # set()",
      "exampleLanguage": "python",
      "mistake": "Accepting the route table because the new route is present, without checking that the old routes survived.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Route Table After a Change, but it does not work correctly.",
       "buggyCode": "expected = {'10.0.0.0/8', '192.168.0.0/16'}\nactual = {'10.0.0.0/8'}\nprint('OK' if expected & actual else 'Missing')",
       "fixedCode": "expected = {'10.0.0.0/8', '192.168.0.0/16'}\nactual = {'10.0.0.0/8'}\nprint('Missing:', expected - actual)",
       "explanation": "Checking whether any expected route exists is far too weak; validation needs the full set difference so every missing route is named."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Route Table After a Change",
       "instructions": "Which statement about Route Table After a Change is correct?",
       "starterCode": "",
       "solution": "The route table after a change must contain every route the network needs, including routes the change was not supposed to touch.",
       "solutionExplanation": "The route table after a change must contain every route the network needs, including routes the change was not supposed to touch. The other options are false: Route Table After a Change is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The route table after a change must contain every route the network needs, including routes the change was not supposed to touch.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Route Table After a Change is the key idea here: The route table after a change must contain every route the network needs, including routes the change was not supposed to touch.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "The route table after a change must contain every route the network needs, including routes the change was not supposed to touch.",
        "Route Table After a Change can only be used once in a program",
        "Route Table After a Change requires a separate paid licence to use",
        "Route Table After a Change was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-post-change-m1-l5",
      "slug": "netauto-testing-post-change-m1-l5",
      "title": "The Post-Change Report",
      "concept": "The post-change report combines the before snapshot, the after snapshot, the diff, and the validation verdict into one record for the change ticket. It names every check, its result, and any unexpected change, so a reviewer can approve the change without re-running anything. The report is written to a file at validation time, which makes it evidence rather than a memory.",
      "syntax": "report = {'before': before, 'after': after, 'verdict': 'PASS'}",
      "exampleCode": "report = {\n    'before': {'Gi0/0': 'up'},\n    'after': {'Gi0/0': 'up'},\n    'unexpected': [],\n    'verdict': 'PASS',\n}\nprint(report['verdict'])",
      "exampleLanguage": "python",
      "mistake": "Writing the report before validation finishes, so it records the intended result instead of the actual one.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The Post-Change Report, but it does not work correctly.",
       "buggyCode": "report = {'verdict': 'PASS'}\nresults = run_checks()\nprint(report['verdict'])",
       "fixedCode": "report = {'verdict': 'PASS' if all(run_checks()) else 'FAIL'}\nprint(report['verdict'])",
       "explanation": "Fixing the verdict before the checks run means the report can never say FAIL; the verdict must be computed from the check results after they run."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise The Post-Change Report",
       "instructions": "Write a Python program that does the work described in The Post-Change Report and prints the expected output. This exercise practises The Post-Change Report.",
       "starterCode": "# TODO: write the code for The Post-Change Report.\n# When it runs it should print exactly:\n# Post-change report\n# Verdict: FAIL\n# Failed checks: bgp established\n",
       "solution": "checks = {'interface up': True, 'route present': True, 'bgp established': False}\nverdict = 'PASS' if all(checks.values()) else 'FAIL'\nprint('Post-change report')\nprint('Verdict:', verdict)\nprint('Failed checks:', ', '.join(n for n, ok in checks.items() if not ok))\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Post-change report\nVerdict: FAIL\nFailed checks: bgp established",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Failed checks: bgp established",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The Post-Change Report is the key idea here: The post-change report combines the before snapshot, the after snapshot, the diff, and the validation verdict into one record for the change ticket.",
        "approach": "Work through The Post-Change Report step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-post-change-m2",
    "title": "Post-Change Validation in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-testing-post-change-m2-l1",
      "slug": "netauto-testing-post-change-m2-l1",
      "title": "When Validation Fails",
      "concept": "When validation fails, the change stops and the team investigates the failure before doing anything else, because continuing risks building on a broken network. The failure must be recorded with the exact check that failed, the expected value, and the observed value, so the fix targets the real cause. A failed validation is not a disaster; it is the test doing its job.",
      "syntax": "if not valid:\n    print('Validation failed'); raise SystemExit(1)",
      "exampleCode": "expected = 'up'\nobserved = 'down'\nif observed != expected:\n    print(f'FAIL: expected {expected}, observed {observed}')",
      "exampleLanguage": "python",
      "mistake": "Re-running validation until it passes by chance, for example while a flapping interface happens to be up.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate When Validation Fails, but it does not work correctly.",
       "buggyCode": "for _ in range(5):\n    if check():\n        break\nprint('Validation passed')",
       "fixedCode": "if not check():\n    print('Validation failed: investigate before retrying')\nelse:\n    print('Validation passed')",
       "explanation": "Retrying a failing check until it happens to pass hides a real problem; a failure must be investigated and fixed, not retried into silence."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise When Validation Fails",
       "instructions": "Write a Python program that does the work described in When Validation Fails and prints the expected output. This exercise practises When Validation Fails.",
       "starterCode": "# TODO: write the code for When Validation Fails.\n# When it runs it should print exactly:\n# Validation failed\n# Expected up, observed down\n",
       "solution": "expected = 'up'\nobserved = 'down'\nif observed != expected:\n    print('Validation failed')\n    print(f'Expected {expected}, observed {observed}')\nelse:\n    print('Validation passed')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Validation failed\nExpected up, observed down",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Expected up, observed down",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "When Validation Fails is the key idea here: When validation fails, the change stops and the team investigates the failure before doing anything else, because continuing risks building on a broken network.",
        "approach": "Work through When Validation Fails step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-post-change-m2-l2",
      "slug": "netauto-testing-post-change-m2-l2",
      "title": "Rolling Back on Failed Validation",
      "concept": "Rolling back means restoring the configuration that was saved before the change, using the backup taken as part of the change procedure. A rollback is itself a change, so it is validated afterwards with the same checks, proving the network is back to its known-good state. Every change plan must include a tested rollback path before the change starts, not after it fails.",
      "syntax": "Rollback restores the pre-change configuration from the backup taken before the change.",
      "exampleCode": "backup = 'interface GigabitEthernet0/1\\n shutdown'\nprint('Rollback restores:', backup.splitlines()[0])",
      "exampleLanguage": "python",
      "mistake": "Planning the rollback after the change fails, when the backup may never have been taken.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rolling Back on Failed Validation, but it does not work correctly.",
       "buggyCode": "print('Rolling back...')\n# no backup was ever taken",
       "fixedCode": "backup = load_backup('pre-change.cfg')\nprint('Rolling back to:', backup[:20])",
       "explanation": "A rollback with no backup is just a wish; the backup must be taken before the change starts, or there is nothing to roll back to."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Rolling Back on Failed Validation",
       "instructions": "Which statement about Rolling Back on Failed Validation is correct?",
       "starterCode": "",
       "solution": "Rolling back means restoring the configuration that was saved before the change, using the backup taken as part of the change procedure.",
       "solutionExplanation": "Rolling back means restoring the configuration that was saved before the change, using the backup taken as part of the change procedure. The other options are false: Rolling Back on Failed Validation is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Rolling back means restoring the configuration that was saved before the change, using the backup taken as part of the change procedure.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Rolling Back on Failed Validation is the key idea here: Rolling back means restoring the configuration that was saved before the change, using the backup taken as part of the change procedure.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Rolling Back on Failed Validation can only be used once in a program",
        "Rolling Back on Failed Validation requires a separate paid licence to use",
        "Rolling Back on Failed Validation was removed from Python in the latest version",
        "Rolling back means restoring the configuration that was saved before the change, using the backup taken as part of the change procedure."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-post-change-m2-l3",
      "slug": "netauto-testing-post-change-m2-l3",
      "title": "Partial Success Is Still a Failure",
      "concept": "Partial success means some checks passed and some failed, and the change is still a failure because the network is not in its intended state. Accepting a partial success leaves the network half-changed, which is harder to reason about than either the old state or the new one. The correct response is to fix the failure or roll back, not to declare the change mostly done.",
      "syntax": "A change with any failed validation check is a failed change, even if most checks passed.",
      "exampleCode": "results = [True, True, False]\nprint('Change failed' if not all(results) else 'Change passed')",
      "exampleLanguage": "python",
      "mistake": "Signing off a change because most checks passed, leaving the failed part broken for the next engineer to find.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Partial Success Is Still a Failure, but it does not work correctly.",
       "buggyCode": "results = [True, True, False]\nprint('Change passed' if sum(results) >= 2 else 'Change failed')",
       "fixedCode": "results = [True, True, False]\nprint('Change passed' if all(results) else 'Change failed')",
       "explanation": "A majority vote is not validation: one failed check means the network is not in its intended state, so all() is the only correct test."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Partial Success Is Still a Failure",
       "instructions": "Which statement about Partial Success Is Still a Failure is correct?",
       "starterCode": "",
       "solution": "Partial success means some checks passed and some failed, and the change is still a failure because the network is not in its intended state.",
       "solutionExplanation": "Partial success means some checks passed and some failed, and the change is still a failure because the network is not in its intended state. The other options are false: Partial Success Is Still a Failure is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Partial success means some checks passed and some failed, and the change is still a failure because the network is not in its intended state.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Partial Success Is Still a Failure is the key idea here: Partial success means some checks passed and some failed, and the change is still a failure because the network is not in its intended state.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Partial success means some checks passed and some failed, and the change is still a failure because the network is not in its intended state.",
        "Partial Success Is Still a Failure can only be used once in a program",
        "Partial Success Is Still a Failure requires a separate paid licence to use",
        "Partial Success Is Still a Failure was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-post-change-m2-l4",
      "slug": "netauto-testing-post-change-m2-l4",
      "title": "Comparing Config Versions",
      "concept": "Comparing config versions means diffing the saved running configuration from before the change against the one from after it, line by line. The diff shows exactly which configuration lines the change added, removed, or modified, which is more precise than comparing state alone. A config diff that contains lines nobody planned is the earliest sign that a change did more than intended.",
      "syntax": "import difflib\nlist(difflib.unified_diff(before_lines, after_lines))",
      "exampleCode": "import difflib\nbefore = ['hostname R1', 'interface Gi0/0']\nafter = ['hostname R1', 'interface Gi0/0', ' description Uplink']\nprint('\\n'.join(difflib.unified_diff(before, after, lineterm='')))",
      "exampleLanguage": "python",
      "mistake": "Diffing configs with different formatting, so whitespace differences drown out the real changes.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Comparing Config Versions, but it does not work correctly.",
       "buggyCode": "import difflib\nprint(list(difflib.unified_diff(before, after)))",
       "fixedCode": "import difflib\nprint(list(difflib.unified_diff([l.strip() for l in before], [l.strip() for l in after], lineterm='')))",
       "explanation": "Without lineterm='' each diff line ends with an extra blank line, and untrimmed lines turn spacing into false differences; strip lines and set lineterm to keep the diff readable."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Comparing Config Versions",
       "instructions": "Write a Python program that does the work described in Comparing Config Versions and prints the expected output. This exercise practises Comparing Config Versions.",
       "starterCode": "# TODO: write the code for Comparing Config Versions.\n# When it runs it should print exactly:\n# Config diff lines: 7\n# Changed line: + no shutdown\n",
       "solution": "import difflib\nbefore = ['hostname R1', 'interface GigabitEthernet0/0', ' shutdown']\nafter = ['hostname R1', 'interface GigabitEthernet0/0', ' no shutdown']\ndiff = list(difflib.unified_diff(before, after, lineterm=''))\nprint('Config diff lines:', len(diff))\nprint('Changed line:', [line for line in diff if line.startswith('+') and not line.startswith('+++')][0])\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Config diff lines: 7\nChanged line: + no shutdown",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Changed line: + no shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Comparing Config Versions is the key idea here: Comparing config versions means diffing the saved running configuration from before the change against the one from after it, line by line.",
        "approach": "Work through Comparing Config Versions step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-post-change-m2-l5",
      "slug": "netauto-testing-post-change-m2-l5",
      "title": "Signing Off a Change",
      "concept": "Signing off a change means a named engineer confirms the validation report shows a pass and takes responsibility for the new state. The sign-off references the report file, the diff, and the ticket, so the approval is tied to evidence rather than a verbal assurance. A change without a recorded sign-off is unfinished, because nobody has accepted the new state as correct.",
      "syntax": "signoff = {'engineer': 'a. patel', 'verdict': 'PASS', 'report': 'report.json'}",
      "exampleCode": "signoff = {'engineer': 'a. patel', 'verdict': 'PASS', 'report': 'post-change-report.json'}\nprint(signoff['engineer'], 'signed off:', signoff['verdict'])",
      "exampleLanguage": "python",
      "mistake": "Signing off a change before validation has run, based on the feeling that the change probably worked.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Signing Off a Change, but it does not work correctly.",
       "buggyCode": "signoff = {'engineer': 'a. patel', 'verdict': 'PASS'}",
       "fixedCode": "signoff = {'engineer': 'a. patel', 'verdict': verdict, 'report': 'post-change-report.json'}",
       "explanation": "A sign-off that hard-codes PASS is not evidence; the verdict must come from the validation run and the report file must be named in the record."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Signing Off a Change",
       "instructions": "Write a Python program that does the work described in Signing Off a Change and prints the expected output. This exercise practises Signing Off a Change.",
       "starterCode": "# TODO: write the code for Signing Off a Change.\n# When it runs it should print exactly:\n# Signed off by: a. patel\n# Verdict: PASS\n# Report: post-change-report.json\n",
       "solution": "signoff = {'engineer': 'a. patel', 'verdict': 'PASS', 'report': 'post-change-report.json'}\nprint('Signed off by:', signoff['engineer'])\nprint('Verdict:', signoff['verdict'])\nprint('Report:', signoff['report'])\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Signed off by: a. patel\nVerdict: PASS\nReport: post-change-report.json",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Report: post-change-report.json",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Signing Off a Change is the key idea here: Signing off a change means a named engineer confirms the validation report shows a pass and takes responsibility for the new state.",
        "approach": "Work through Signing Off a Change step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "Post-Change Validation Report",
   "instructions": "Complete the capstone task for this track: Post-Change Validation Report. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# Changed: GigabitEthernet0/1\n# Post-change validation: PASS\n",
   "solution": "before = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'down'}\nafter = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'up'}\nchanged = [k for k in set(before) | set(after) if before.get(k) != after.get(k)]\nexpected = {'GigabitEthernet0/1': 'up'}\nvalid = all(after[k] == v for k, v in expected.items())\nprint('Changed:', ', '.join(changed))\nprint('Post-change validation:', 'PASS' if valid else 'FAIL')\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Changed: GigabitEthernet0/1\nPost-change validation: PASS",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Post-change validation: PASS",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "Post-Change Validation Report Capstone",
   "description": "Diff the before and after snapshots, validate the intended change, and print a validation report.",
   "requirements": [
    "Diff the before and after state dictionaries and list what changed.",
    "Check the intended change is present in the after state.",
    "Print a verdict of PASS or FAIL based on the checks.",
    "Name any failed check in the report."
   ],
   "rubric": [
    "The diff lists exactly the interfaces that changed.",
    "The verdict follows from the validation checks.",
    "Failed checks are named, not hidden behind a count.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-pyats",
  "slug": "netauto-testing-pyats",
  "language": "python",
  "category": "devops",
  "title": "pyATS aetest Testcases",
  "description": "Learn pyATS aetest properly: sections, testcases, steps, loops, parameters, and Genie parsers — practising the check logic locally and labelling honestly what needs a lab.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "pyATS aetest",
   "Testcase classes",
   "Setup and cleanup",
   "Test steps",
   "Parameterised tests",
   "Assertions",
   "Test reports",
   "Genie parsers"
  ],
  "prerequisites": [
   "netauto-testing-foundations"
  ],
  "analogy": "Learning {topic} is like learning to write a lab report: setup, method, results, and cleanup, in that order, every single time.",
  "modules": [
   {
    "id": "netauto-testing-pyats-m1",
    "title": "pyATS aetest Testcases Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-pyats-m1-l1",
      "slug": "netauto-testing-pyats-m1-l1",
      "title": "What pyATS aetest Is",
      "concept": "pyATS aetest is a Python test framework from Cisco for writing network testcases that run against devices, with setup, testcase, and cleanup sections. A test script is a Python file that aetest runs, and each testcase is a class whose methods are the individual tests. Real aetest runs need the pyATS library and lab devices, so in this course you practise the same check logic as plain Python functions over local data first.",
      "syntax": "from pyats import aetest\n\nclass CheckInterfaces(aetest.Testcase):",
      "exampleCode": "from pyats import aetest  # needs pyATS installed and lab devices\n\nclass CheckInterfaces(aetest.Testcase):\n    @aetest.test\n    def test_interfaces_up(self):\n        assert True",
      "exampleLanguage": "python",
      "mistake": "Assuming aetest testcases can run without pyATS installed or without any device to test against.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What pyATS aetest Is, but it does not work correctly.",
       "buggyCode": "from pyats import aetest\n\nclass CheckInterfaces:\n    def test_interfaces_up(self):\n        assert True",
       "fixedCode": "from pyats import aetest\n\nclass CheckInterfaces(aetest.Testcase):\n    @aetest.test\n    def test_interfaces_up(self):\n        assert True",
       "explanation": "A plain class is not a testcase: it must inherit from aetest.Testcase and its test methods need the @aetest.test decorator, or aetest will not discover or run them."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise What pyATS aetest Is",
       "instructions": "Write a Python program that does the work described in What pyATS aetest Is and prints the expected output. This exercise practises What pyATS aetest Is.",
       "starterCode": "# TODO: write the code for What pyATS aetest Is.\n# When it runs it should print exactly:\n# aetest-style check: PASS\n# Local check stands in for the aetest testcase until a lab is available\n",
       "solution": "def check_interface_up(state):\n    return state['status'] == 'up'\n\nstate = {'name': 'GigabitEthernet0/0', 'status': 'up', 'protocol': 'up'}\nprint('aetest-style check:', 'PASS' if check_interface_up(state) else 'FAIL')\nprint('Local check stands in for the aetest testcase until a lab is available')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "aetest-style check: PASS\nLocal check stands in for the aetest testcase until a lab is available",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Local check stands in for the aetest testcase until a lab is available",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What pyATS aetest Is is the key idea here: pyATS aetest is a Python test framework from Cisco for writing network testcases that run against devices, with setup, testcase, and cleanup sections.",
        "approach": "Work through What pyATS aetest Is step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-pyats-m1-l2",
      "slug": "netauto-testing-pyats-m1-l2",
      "title": "Setup, Testcase, and Cleanup Sections",
      "concept": "An aetest script is organised into three kinds of sections: setup runs once before the testcases to prepare state, each testcase runs its own tests, and cleanup runs at the end to restore state. Setup connects to devices and gathers the baseline, testcases assert the expected state, and cleanup disconnects and removes anything the tests created. Skipping cleanup leaves the lab dirty for the next test run.",
      "syntax": "aetest sections run in the order setup, then testcases, then cleanup.",
      "exampleCode": "from pyats import aetest  # display only: needs pyATS and lab devices\n\nclass CommonSetup(aetest.CommonSetup):\n    @aetest.subsection\n    def connect(self):\n        pass\n\nclass CommonCleanup(aetest.CommonCleanup):\n    @aetest.subsection\n    def disconnect(self):\n        pass",
      "exampleLanguage": "python",
      "mistake": "Putting device connection code inside every testcase instead of once in setup, so each test reconnects slowly.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Setup, Testcase, and Cleanup Sections, but it does not work correctly.",
       "buggyCode": "from pyats import aetest\n\nclass CommonCleanup(aetest.CommonSetup):\n    pass",
       "fixedCode": "from pyats import aetest\n\nclass CommonCleanup(aetest.CommonCleanup):\n    @aetest.subsection\n    def disconnect(self):\n        pass",
       "explanation": "Cleanup must inherit from aetest.CommonCleanup, not CommonSetup; the wrong base class means aetest never runs it as cleanup."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Setup, Testcase, and Cleanup Sections",
       "instructions": "Write a Python program that does the work described in Setup, Testcase, and Cleanup Sections and prints the expected output. This exercise practises Setup, Testcase, and Cleanup Sections.",
       "starterCode": "# TODO: write the code for Setup, Testcase, and Cleanup Sections.\n# When it runs it should print exactly:\n# setup: connect and gather baseline\n# testcase: assert expected state\n# cleanup: disconnect and restore\n# Sections run in order: setup, testcase, cleanup\n",
       "solution": "steps = ['setup: connect and gather baseline', 'testcase: assert expected state', 'cleanup: disconnect and restore']\nfor step in steps:\n    print(step)\nprint('Sections run in order: setup, testcase, cleanup')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "setup: connect and gather baseline\ntestcase: assert expected state\ncleanup: disconnect and restore\nSections run in order: setup, testcase, cleanup",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Sections run in order: setup, testcase, cleanup",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Setup, Testcase, and Cleanup Sections is the key idea here: An aetest script is organised into three kinds of sections: setup runs once before the testcases to prepare state, each testcase runs its own tests, and cleanup runs at the end to restore state.",
        "approach": "Work through Setup, Testcase, and Cleanup Sections step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-pyats-m1-l3",
      "slug": "netauto-testing-pyats-m1-l3",
      "title": "Writing a Testcase Class",
      "concept": "A testcase class in aetest inherits from aetest.Testcase and contains test methods, each marked with the @aetest.test decorator. The class groups tests that belong together, such as all the checks for one router's interfaces, and aetest runs its methods in the order they are defined. Test methods use plain Python asserts, so the same assertion logic you practise locally transfers directly into a real testcase.",
      "syntax": "A testcase class in aetest inherits from aetest.Testcase and its test methods carry the @aetest.test decorator.",
      "exampleCode": "from pyats import aetest  # display only: needs pyATS and lab devices\n\nclass CheckInterfaces(aetest.Testcase):\n    @aetest.test\n    def test_gig0_0_up(self):\n        assert True, 'GigabitEthernet0/0 is down'",
      "exampleLanguage": "python",
      "mistake": "Writing test methods without the @aetest.test decorator, so aetest silently skips them and the suite reports a false pass.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Writing a Testcase Class, but it does not work correctly.",
       "buggyCode": "from pyats import aetest\n\nclass CheckInterfaces(aetest.Testcase):\n    def test_gig0_0_up(self):\n        assert True",
       "fixedCode": "from pyats import aetest\n\nclass CheckInterfaces(aetest.Testcase):\n    @aetest.test\n    def test_gig0_0_up(self):\n        assert True",
       "explanation": "Without @aetest.test the method is an ordinary method that aetest never runs, so the suite passes without ever checking the interface."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Writing a Testcase Class",
       "instructions": "Which statement about Writing a Testcase Class is correct?",
       "starterCode": "",
       "solution": "A testcase class in aetest inherits from aetest.",
       "solutionExplanation": "A testcase class in aetest inherits from aetest. The other options are false: Writing a Testcase Class is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A testcase class in aetest inherits from aetest.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Writing a Testcase Class is the key idea here: A testcase class in aetest inherits from aetest.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Writing a Testcase Class can only be used once in a program",
        "Writing a Testcase Class requires a separate paid licence to use",
        "Writing a Testcase Class was removed from Python in the latest version",
        "A testcase class in aetest inherits from aetest."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-pyats-m1-l4",
      "slug": "netauto-testing-pyats-m1-l4",
      "title": "Steps Inside a Testcase",
      "concept": "Steps inside a testcase break one test into smaller named parts using the @aetest.step decorator or a with steps.start() block, so a failure points at the exact step that failed. A testcase that checks five interfaces in one method reports only that the testcase failed; the same checks as five steps report exactly which interface failed. Steps also let a testcase continue past a non-fatal failure and report all the results at once.",
      "syntax": "Steps break a testcase into named parts, so a failure points at the exact step that failed instead of the whole testcase.",
      "exampleCode": "from pyats import aetest  # display only: needs pyATS and lab devices\n\nclass CheckInterfaces(aetest.Testcase):\n    @aetest.test\n    def test_all_interfaces(self, steps):\n        with steps.start('GigabitEthernet0/0 is up') as step:\n            assert True",
      "exampleLanguage": "python",
      "mistake": "Putting five unrelated assertions in one step, which defeats the purpose of steps because the failure still cannot be located.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Steps Inside a Testcase, but it does not work correctly.",
       "buggyCode": "with steps.start('check everything') as step:\n    assert interface_up\n    assert route_present\n    assert bgp_up",
       "fixedCode": "with steps.start('GigabitEthernet0/0 is up') as step:\n    assert interface_up\nwith steps.start('route 10.0.0.0/8 present') as step:\n    assert route_present",
       "explanation": "One step per assertion is what makes failures locatable; bundling several assertions into one step hides which one failed."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Steps Inside a Testcase",
       "instructions": "Which statement about Steps Inside a Testcase is correct?",
       "starterCode": "",
       "solution": "Steps inside a testcase break one test into smaller named parts using the @aetest.",
       "solutionExplanation": "Steps inside a testcase break one test into smaller named parts using the @aetest. The other options are false: Steps Inside a Testcase is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Steps inside a testcase break one test into smaller named parts using the @aetest.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Steps Inside a Testcase is the key idea here: Steps inside a testcase break one test into smaller named parts using the @aetest.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Steps inside a testcase break one test into smaller named parts using the @aetest.",
        "Steps Inside a Testcase can only be used once in a program",
        "Steps Inside a Testcase requires a separate paid licence to use",
        "Steps Inside a Testcase was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-pyats-m1-l5",
      "slug": "netauto-testing-pyats-m1-l5",
      "title": "Looping Testcases Over Devices",
      "concept": "Looping a testcase over devices means running the same checks once per device in the testbed, usually by parameterising the testcase with the device name. The aetest loop feature, or a plain Python loop in local practice, keeps the check written once while the device list supplies the variation. Each device gets its own result, so one failing device does not hide the passing ones.",
      "syntax": "A testcase is looped over devices by parameterising it with each device in the testbed, so the same checks run once per device.",
      "exampleCode": "from pyats import aetest  # display only: needs pyATS and lab devices\n\nclass CheckInterfaces(aetest.Testcase):\n    @aetest.test\n    def test_up(self, device):\n        assert True\n\n# aetest.loop(device=['core1', 'core2'])",
      "exampleLanguage": "python",
      "mistake": "Writing a separate testcase class per device, so a fleet of twenty devices needs twenty copies of the same checks.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Looping Testcases Over Devices, but it does not work correctly.",
       "buggyCode": "devices = ['core1', 'core2']\nfor device in devices:\n    check(device)\nprint('All devices checked')",
       "fixedCode": "devices = ['core1', 'core2']\nresults = {}\nfor device in devices:\n    results[device] = check(device)\nprint(results)",
       "explanation": "Printing a single success message after the loop discards per-device results; store each device's result so one failing device is visible in the report."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Looping Testcases Over Devices",
       "instructions": "Write a Python program that does the work described in Looping Testcases Over Devices and prints the expected output. This exercise practises Looping Testcases Over Devices.",
       "starterCode": "# TODO: write the code for Looping Testcases Over Devices.\n# When it runs it should print exactly:\n# core1: PASS\n# core2: PASS\n# access1: FAIL\n# Loop checked 3 devices\n",
       "solution": "devices = ['core1', 'core2', 'access1']\nstate = {'core1': 'up', 'core2': 'up', 'access1': 'down'}\nfor device in devices:\n    print(f\"{device}: {'PASS' if state[device] == 'up' else 'FAIL'}\")\nprint('Loop checked 3 devices')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "core1: PASS\ncore2: PASS\naccess1: FAIL\nLoop checked 3 devices",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Loop checked 3 devices",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Looping Testcases Over Devices is the key idea here: Looping a testcase over devices means running the same checks once per device in the testbed, usually by parameterising the testcase with the device name.",
        "approach": "Work through Looping Testcases Over Devices step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-pyats-m2",
    "title": "pyATS aetest Testcases in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-testing-pyats-m2-l1",
      "slug": "netauto-testing-pyats-m2-l1",
      "title": "Assertions in aetest",
      "concept": "Assertions in aetest are the same Python assert statements you use locally, and a failed assert marks the test or step as failed with the message you wrote. The assertion message should name the device, the thing checked, and the expected and observed values, because that message is what the engineer reads at 2 a.m. Assertions that say only 'failed' waste the next hour of debugging.",
      "syntax": "An aetest assertion is a Python assert whose message names the device, the check, and the expected and observed values.",
      "exampleCode": "from pyats import aetest  # display only: needs pyATS and lab devices\n\nassert state == 'up', 'core1 GigabitEthernet0/0 expected up, observed down'",
      "exampleLanguage": "python",
      "mistake": "Writing bare asserts with no message, so a failed test reports nothing about what was expected.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Assertions in aetest, but it does not work correctly.",
       "buggyCode": "assert state == 'up'",
       "fixedCode": "assert state == 'up', 'core1 GigabitEthernet0/0 expected up, observed down'",
       "explanation": "A bare assert reports only the line number; the message must name the device, the check, and both values so the failure can be understood without re-running the test."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Assertions in aetest",
       "instructions": "Write a Python program that checks two interfaces the way an aetest assertion would: assert the interface state is 'up' with a message naming the device, the interface, and the expected and observed values, catch the AssertionError, and print one PASS or FAIL line per interface. Print exactly the two lines shown below.",
       "starterCode": "# TODO: write the code for Assertions in aetest.\n# Check each interface with an assert whose message names the device,\n# the interface, and the expected and observed values.\n# Catch AssertionError and print a PASS or FAIL line per interface.\n# When it runs it should print exactly:\n# PASS: core1 GigabitEthernet0/0 is up\n# FAIL: core2 GigabitEthernet0/1 expected up, observed down\n",
       "solution": "def check_interface(device, interface, state):\n    assert state == 'up', f'{device} {interface} expected up, observed {state}'\n\n\nresults = [\n    ('core1', 'GigabitEthernet0/0', 'up'),\n    ('core2', 'GigabitEthernet0/1', 'down'),\n]\n\nfor device, interface, state in results:\n    try:\n        check_interface(device, interface, state)\n        print(f'PASS: {device} {interface} is up')\n    except AssertionError as exc:\n        print(f'FAIL: {exc}')\n",
       "solutionExplanation": "The assert carries a message naming the device, the interface, and the expected and observed values, exactly as aetest expects. The up interface passes and prints its PASS line; the down interface raises AssertionError, which is caught and printed as a FAIL line containing the full message, so the failure can be understood without re-running the test.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: core1 GigabitEthernet0/0 is up\nFAIL: core2 GigabitEthernet0/1 expected up, observed down",
         "hidden": false
        },
        {
         "name": "Failure message names device and values",
         "expectedContains": "core2 GigabitEthernet0/1 expected up, observed down",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Assertions in aetest is the key idea here: a failed assert marks the test as failed with the message you wrote, and the message should name the device, the thing checked, and the expected and observed values.",
        "approach": "Write a helper that asserts state == 'up' with an f-string message, then loop over the two interfaces catching AssertionError.",
        "structure": "Keep the standard shape: define the check helper, set up the local interface data, run each check in a try/except, then print the PASS or FAIL line."
       }
      }
     },
     {
      "id": "netauto-testing-pyats-m2-l2",
      "slug": "netauto-testing-pyats-m2-l2",
      "title": "Test Results and Reports",
      "concept": "When aetest finishes it produces a results summary and, with the right plugins, a detailed report showing every testcase, step, and assertion outcome. The report is the record of what was tested, which is why aetest runs are kept as artifacts alongside the change ticket. A passing summary with failing steps inside it still means the run failed, so the report is read in full, not just its headline.",
      "syntax": "An aetest run produces a report showing every testcase, step, and assertion outcome, not just a headline pass count.",
      "exampleCode": "$ pyats run job job.py\nTestsuite: 3 passed, 1 failed",
      "exampleLanguage": "python",
      "mistake": "Reading only the headline pass count and missing a failed step buried inside a passing testcase.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Test Results and Reports, but it does not work correctly.",
       "buggyCode": "summary = {'passed': 3, 'failed': 0}\nprint('Run passed')",
       "fixedCode": "summary = {'passed': 3, 'failed': 0, 'steps_failed': 1}\nprint('Run failed: 1 step failed') if summary['steps_failed'] else print('Run passed')",
       "explanation": "A headline count can hide failed steps; the report must be checked at step level before a run is called a pass."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Test Results and Reports",
       "instructions": "Which statement about Test Results and Reports is correct?",
       "starterCode": "",
       "solution": "When aetest finishes it produces a results summary and, with the right plugins, a detailed report showing every testcase, step, and assertion outcome.",
       "solutionExplanation": "When aetest finishes it produces a results summary and, with the right plugins, a detailed report showing every testcase, step, and assertion outcome. The other options are false: Test Results and Reports is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "When aetest finishes it produces a results summary and, with the right plugins, a detailed report showing every testcase, step, and assertion outcome.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Test Results and Reports is the key idea here: When aetest finishes it produces a results summary and, with the right plugins, a detailed report showing every testcase, step, and assertion outcome.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Test Results and Reports can only be used once in a program",
        "Test Results and Reports requires a separate paid licence to use",
        "Test Results and Reports was removed from Python in the latest version",
        "When aetest finishes it produces a results summary and, with the right plugins, a detailed report showing every testcase, step, and assertion outcome."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-pyats-m2-l3",
      "slug": "netauto-testing-pyats-m2-l3",
      "title": "aetest Parameters",
      "concept": "aetest parameters let one test script run with different inputs, such as a different device list or a different expected VLAN, without editing the script. Parameters are declared on the testcase or the job file and passed in at run time, which keeps the test logic separate from the values it checks. Hard-coding values in the script means every new device needs a new script.",
      "syntax": "aetest parameters let one test script run with different inputs, such as a different device list, without editing the script.",
      "exampleCode": "from pyats import aetest  # display only: needs pyATS and lab devices\n\nclass CheckVlan(aetest.Testcase):\n    @aetest.test\n    def test_vlan(self, vlan_id):\n        assert vlan_id == 10",
      "exampleLanguage": "python",
      "mistake": "Hard-coding the device list inside the testcase, so running the same checks on a new device needs a script edit.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate aetest Parameters, but it does not work correctly.",
       "buggyCode": "devices = ['core1', 'core2']  # hard-coded inside the script",
       "fixedCode": "parameters = {'devices': ['core1', 'core2']}  # passed in at run time",
       "explanation": "Values baked into the script cannot change without an edit; parameters are supplied at run time so the same script tests any device list."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: aetest Parameters",
       "instructions": "Which statement about aetest Parameters is correct?",
       "starterCode": "",
       "solution": "aetest parameters let one test script run with different inputs, such as a different device list or a different expected VLAN, without editing the script.",
       "solutionExplanation": "aetest parameters let one test script run with different inputs, such as a different device list or a different expected VLAN, without editing the script. The other options are false: aetest Parameters is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "aetest parameters let one test script run with different inputs, such as a different device list or a different expected VLAN, without editing the script.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "aetest Parameters is the key idea here: aetest parameters let one test script run with different inputs, such as a different device list or a different expected VLAN, without editing the script.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "aetest parameters let one test script run with different inputs, such as a different device list or a different expected VLAN, without editing the script.",
        "aetest Parameters can only be used once in a program",
        "aetest Parameters requires a separate paid licence to use",
        "aetest Parameters was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-pyats-m2-l4",
      "slug": "netauto-testing-pyats-m2-l4",
      "title": "A Testcase That Needs a Lab",
      "concept": "Some aetest testcases genuinely need a lab, because they connect to a device and run commands on it, and no local data can stand in for that connection. The honest way to handle this in code is to check whether a lab is available first and report SKIP with the reason when it is not, rather than pretending the test ran. A skipped lab test is a gap in coverage to be filled by a real lab run, not a pass.",
      "syntax": "A testcase that needs a lab must report SKIP with the reason when no lab is available, instead of pretending it ran.",
      "exampleCode": "lab_available = False\nif not lab_available:\n    print('SKIP: test_bgp_peering needs a lab device')",
      "exampleLanguage": "python",
      "mistake": "Faking device output in the test so it passes on a laptop with no lab at all.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Testcase That Needs a Lab, but it does not work correctly.",
       "buggyCode": "def test_bgp():\n    output = 'BGP state is Established'  # invented, never read from a device\n    assert 'Established' in output",
       "fixedCode": "def test_bgp(lab_available):\n    if not lab_available:\n        return 'SKIP: needs a lab device'\n    return 'PASS'",
       "explanation": "Invented device output makes the test pass without ever contacting a device; when no lab exists the honest result is SKIP, not a fabricated pass."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Testcase That Needs a Lab",
       "instructions": "Write a Python program that does the work described in A Testcase That Needs a Lab and prints the expected output. This exercise practises A Testcase That Needs a Lab.",
       "starterCode": "# TODO: write the code for A Testcase That Needs a Lab.\n# When it runs it should print exactly:\n# SKIP: test_bgp_peering (needs a lab device)\n# PASS: test_interface_up_local\n",
       "solution": "def run_lab_test(name, lab_available):\n    if not lab_available:\n        return f'SKIP: {name} (needs a lab device)'\n    return f'PASS: {name}'\n\nprint(run_lab_test('test_bgp_peering', False))\nprint(run_lab_test('test_interface_up_local', True))\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "SKIP: test_bgp_peering (needs a lab device)\nPASS: test_interface_up_local",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "PASS: test_interface_up_local",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Testcase That Needs a Lab is the key idea here: Some aetest testcases genuinely need a lab, because they connect to a device and run commands on it, and no local data can stand in for that connection.",
        "approach": "Work through A Testcase That Needs a Lab step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-pyats-m2-l5",
      "slug": "netauto-testing-pyats-m2-l5",
      "title": "From aetest to Genie Parsers",
      "concept": "Genie parsers turn raw device command output into structured Python data, so an aetest testcase can assert on a dictionary instead of searching text. A parser for show ip interface brief returns a nested dictionary keyed by interface, and the testcase checks the parsed values. Parsers need real device output to parse, so locally you practise the same idea by parsing saved output into dictionaries with plain Python.",
      "syntax": "Genie parsers turn raw device command output into structured Python data that a testcase can assert on.",
      "exampleCode": "from genie.libs.parser.iosxe.show_interface import ShowIpInterfaceBrief  # needs Genie and real output\nparsed = {'GigabitEthernet0/0': {'status': 'up'}}",
      "exampleLanguage": "python",
      "mistake": "Asserting on raw command text with string matching instead of parsing it into structured data first.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate From aetest to Genie Parsers, but it does not work correctly.",
       "buggyCode": "output = 'GigabitEthernet0/0  up  up'\nassert 'up' in output",
       "fixedCode": "parsed = {'GigabitEthernet0/0': {'status': 'up', 'protocol': 'up'}}\nassert parsed['GigabitEthernet0/0']['status'] == 'up'",
       "explanation": "A substring match on raw text can pass for the wrong interface; parsed structured data lets the testcase assert on the exact interface and field."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise From aetest to Genie Parsers",
       "instructions": "Write a Python program that does the work described in From aetest to Genie Parsers and prints the expected output. This exercise practises From aetest to Genie Parsers.",
       "starterCode": "# TODO: write the code for From aetest to Genie Parsers.\n# When it runs it should print exactly:\n# Parsed: up\n# Genie-style parsed data ready for assertions\n",
       "solution": "output = 'GigabitEthernet0/0  10.0.0.1  YES manual up  up'\nfields = output.split()\nparsed = {fields[0]: {'ip': fields[1], 'status': fields[-2], 'protocol': fields[-1]}}\nprint('Parsed:', parsed['GigabitEthernet0/0']['status'])\nprint('Genie-style parsed data ready for assertions')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Parsed: up\nGenie-style parsed data ready for assertions",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Genie-style parsed data ready for assertions",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "From aetest to Genie Parsers is the key idea here: Genie parsers turn raw device command output into structured Python data, so an aetest testcase can assert on a dictionary instead of searching text.",
        "approach": "Work through From aetest to Genie Parsers step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "aetest-Style Check Suite",
   "instructions": "Complete the capstone task for this track: aetest-Style Check Suite. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# core1: PASS\n# core2: FAIL\n# aetest-style suite: 1/2 devices passed\n",
   "solution": "devices = {'core1': {'GigabitEthernet0/0': 'up'}, 'core2': {'GigabitEthernet0/0': 'down'}}\nresults = {}\nfor device, interfaces in devices.items():\n    results[device] = all(v == 'up' for v in interfaces.values())\nfor device, ok in results.items():\n    print(f\"{device}: {'PASS' if ok else 'FAIL'}\")\nprint('aetest-style suite: 1/2 devices passed')\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "core1: PASS\ncore2: FAIL\naetest-style suite: 1/2 devices passed",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "aetest-style suite: 1/2 devices passed",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "aetest-Style Check Suite Capstone",
   "description": "Write a local check suite that mirrors an aetest run: loop the same checks over several devices and report per-device results.",
   "requirements": [
    "Write one check function and loop it over a device dictionary.",
    "Record a separate PASS or FAIL result for each device.",
    "Print a summary line with the number of devices that passed.",
    "Report any device that needs a lab as SKIP, not PASS."
   ],
   "rubric": [
    "The same check runs for every device without being copied.",
    "Each device has its own result in the report.",
    "The summary count matches the per-device results.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-testbeds",
  "slug": "netauto-testing-testbeds",
  "language": "python",
  "category": "devops",
  "title": "Testbeds and Topology Files",
  "description": "Describe lab devices and their links in testbed YAML, load and validate testbeds with Python, and generate testbeds from inventory data.",
  "difficulty": "Intermediate",
  "estimatedHours": 9,
  "skills": [
   "Testbed YAML",
   "yaml.safe_load",
   "Device entries",
   "Connections and credentials",
   "Topology files",
   "Testbed validation",
   "Environment testbeds",
   "Secrets handling"
  ],
  "prerequisites": [
   "netauto-testing-pyats"
  ],
  "analogy": "Learning {topic} is like learning to draw a seating plan before a dinner party: everyone needs a named seat, or the evening descends into chaos.",
  "modules": [
   {
    "id": "netauto-testing-testbeds-m1",
    "title": "Testbeds and Topology Files Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-testbeds-m1-l1",
      "slug": "netauto-testing-testbeds-m1-l1",
      "title": "What a Testbed File Is",
      "concept": "A testbed file is a YAML file that describes the devices a pyATS test run will use: each device's name, type, operating system, credentials, and how to connect to it. The testbed separates the lab inventory from the test logic, so the same test script runs against different labs by swapping one file. A testbed never contains real passwords in plain text; credentials come from environment variables or a vault.",
      "syntax": "A testbed file is a YAML file describing the devices a pyATS test run will use, including how to connect to each one.",
      "exampleCode": "devices:\n  core1:\n    type: router\n    os: iosxe\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.1",
      "exampleLanguage": "python",
      "mistake": "Writing device addresses inside the test script, so the same script cannot run against a different lab.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What a Testbed File Is, but it does not work correctly.",
       "buggyCode": "devices = {'core1': '192.0.2.1'}  # hard-coded in the test script",
       "fixedCode": "devices = load_testbed('testbed.yaml').devices  # lab inventory in its own file",
       "explanation": "Device addresses baked into the test script tie the script to one lab; a testbed file keeps the inventory separate so the script runs anywhere."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise What a Testbed File Is",
       "instructions": "Write a Python program that does the work described in What a Testbed File Is and prints the expected output. This exercise practises What a Testbed File Is.",
       "starterCode": "# TODO: write the code for What a Testbed File Is.\n# When it runs it should print exactly:\n# Testbed devices: core1, core2\n# 2 devices in the testbed\n",
       "solution": "testbed = {'devices': {'core1': {'os': 'iosxe', 'ip': '192.0.2.1'}, 'core2': {'os': 'iosxe', 'ip': '192.0.2.2'}}}\nprint('Testbed devices:', ', '.join(testbed['devices']))\nprint('2 devices in the testbed')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Testbed devices: core1, core2\n2 devices in the testbed",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "2 devices in the testbed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What a Testbed File Is is the key idea here: A testbed file is a YAML file that describes the devices a pyATS test run will use: each device's name, type, operating system, credentials, and how to connect to it.",
        "approach": "Work through What a Testbed File Is step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-testbeds-m1-l2",
      "slug": "netauto-testing-testbeds-m1-l2",
      "title": "Testbed YAML Structure",
      "concept": "A testbed YAML file has a top-level devices mapping, where each device entry holds its type, operating system, platform, and a connections mapping. Each connection names a protocol such as ssh and an ip address, and optional credentials sit under a credentials key. The file is validated by loading it with a YAML parser, which catches indentation and structure errors before any test runs.",
      "syntax": "A testbed YAML file has a top-level devices mapping, with each device holding its type, operating system, and connections.",
      "exampleCode": "devices:\n  core1:\n    type: router\n    os: iosxe\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.1\n    credentials:\n      default:\n        username: admin",
      "exampleLanguage": "python",
      "mistake": "Indenting a device's connections at the wrong level, so the YAML parses but the device has no connection to use.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testbed YAML Structure, but it does not work correctly.",
       "buggyCode": "devices:\n  core1:\n    type: router\n  connections:\n    cli:\n      protocol: ssh",
       "fixedCode": "devices:\n  core1:\n    type: router\n    connections:\n      cli:\n        protocol: ssh",
       "explanation": "Connections indented at the devices level belong to no device; they must be nested under the device they connect to."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Testbed YAML Structure",
       "instructions": "Write a Python program that does the work described in Testbed YAML Structure and prints the expected output. This exercise practises Testbed YAML Structure.",
       "starterCode": "# TODO: write the code for Testbed YAML Structure.\n# When it runs it should print exactly:\n# Devices: core1\n# core1 os: iosxe\n",
       "solution": "import yaml\ntext = 'devices:\\n  core1:\\n    type: router\\n    os: iosxe\\n'\ndata = yaml.safe_load(text)\nprint('Devices:', ', '.join(data['devices']))\nprint('core1 os:', data['devices']['core1']['os'])\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Devices: core1\ncore1 os: iosxe",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "core1 os: iosxe",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testbed YAML Structure is the key idea here: A testbed YAML file has a top-level devices mapping, where each device entry holds its type, operating system, platform, and a connections mapping.",
        "approach": "Work through Testbed YAML Structure step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-testbeds-m1-l3",
      "slug": "netauto-testing-testbeds-m1-l3",
      "title": "Devices in a Testbed",
      "concept": "Each device in a testbed is identified by a name that test scripts use to refer to it, and the entry records the device type, such as router or switch, and the operating system, such as iosxe or nxos. The type and operating system tell pyATS which Genie parsers and connection plugins to use for that device. Two devices with the same name in one testbed would make test results ambiguous, so names must be unique.",
      "syntax": "Each device in a testbed has a unique name plus a type and operating system that tell pyATS which parsers and plugins to use.",
      "exampleCode": "devices:\n  core1:\n    type: router\n    os: iosxe\n  access1:\n    type: switch\n    os: iosxe",
      "exampleLanguage": "python",
      "mistake": "Giving two devices the same name in a testbed, so a test cannot tell which device its result belongs to.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Devices in a Testbed, but it does not work correctly.",
       "buggyCode": "devices:\n  core1:\n    type: router\n  core1:\n    type: switch",
       "fixedCode": "devices:\n  core1:\n    type: router\n  access1:\n    type: switch",
       "explanation": "Duplicate device names make the YAML mapping overwrite the first entry, so one device silently disappears from the testbed."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Devices in a Testbed",
       "instructions": "Which statement about Devices in a Testbed is correct?",
       "starterCode": "",
       "solution": "Each device in a testbed is identified by a name that test scripts use to refer to it, and the entry records the device type, such as router or switch, and the operating system, such as iosxe or nxos.",
       "solutionExplanation": "Each device in a testbed is identified by a name that test scripts use to refer to it, and the entry records the device type, such as router or switch, and the operating system, such as iosxe or nxos. The other options are false: Devices in a Testbed is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Each device in a testbed is identified by a name that test scripts use to refer to it, and the entry records the device type, such as router or switch, and the operating system, such as iosxe or nxos.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Devices in a Testbed is the key idea here: Each device in a testbed is identified by a name that test scripts use to refer to it, and the entry records the device type, such as router or switch, and the operating system, such as iosxe or nxos.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Devices in a Testbed can only be used once in a program",
        "Devices in a Testbed requires a separate paid licence to use",
        "Devices in a Testbed was removed from Python in the latest version",
        "Each device in a testbed is identified by a name that test scripts use to refer to it, and the entry records the device type, such as router or switch, and the operating system, such as iosxe or nxos."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-testbeds-m1-l4",
      "slug": "netauto-testing-testbeds-m1-l4",
      "title": "Credentials and Connections in Testbeds",
      "concept": "Connections in a testbed describe how pyATS reaches a device, usually an ssh connection to a management IP, and credentials hold the username and password for that connection. Credentials should reference environment variables or a vault, never a plain-text password in the file, because testbed files are shared and version-controlled. A testbed with a wrong connection protocol fails at connect time, before any test runs.",
      "syntax": "Connections in a testbed describe how pyATS reaches a device, and credentials for those connections must come from a vault or environment variables, never plain text.",
      "exampleCode": "devices:\n  core1:\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.1\n    credentials:\n      default:\n        username: \"%env{TESTBED_USER}\"\n        password: \"%env{TESTBED_PASSWORD}\"",
      "exampleLanguage": "python",
      "mistake": "Writing a real password in plain text in the testbed file and committing the file to Git.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Credentials and Connections in Testbeds, but it does not work correctly.",
       "buggyCode": "credentials:\n  default:\n    username: admin\n    password: changeme123",
       "fixedCode": "credentials:\n  default:\n    username: \"%env{TESTBED_USER}\"\n    password: \"%env{TESTBED_PASSWORD}\"",
       "explanation": "A plain-text password in a version-controlled testbed is exposed to everyone with repository access; credentials belong in environment variables or a vault."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Credentials and Connections in Testbeds",
       "instructions": "Which statement about Credentials and Connections in Testbeds is correct?",
       "starterCode": "",
       "solution": "Connections in a testbed describe how pyATS reaches a device, usually an ssh connection to a management IP, and credentials hold the username and password for that connection.",
       "solutionExplanation": "Connections in a testbed describe how pyATS reaches a device, usually an ssh connection to a management IP, and credentials hold the username and password for that connection. The other options are false: Credentials and Connections in Testbeds is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Connections in a testbed describe how pyATS reaches a device, usually an ssh connection to a management IP, and credentials hold the username and password for that connection.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Credentials and Connections in Testbeds is the key idea here: Connections in a testbed describe how pyATS reaches a device, usually an ssh connection to a management IP, and credentials hold the username and password for that connection.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Connections in a testbed describe how pyATS reaches a device, usually an ssh connection to a management IP, and credentials hold the username and password for that connection.",
        "Credentials and Connections in Testbeds can only be used once in a program",
        "Credentials and Connections in Testbeds requires a separate paid licence to use",
        "Credentials and Connections in Testbeds was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-testbeds-m1-l5",
      "slug": "netauto-testing-testbeds-m1-l5",
      "title": "Loading a Testbed with Python",
      "concept": "Loading a testbed with Python means reading the YAML file with yaml.safe_load and working with the resulting dictionary of devices. The loader validates the structure, for example that every device has at least one connection, before the test run starts. Practising with a local YAML string teaches the same structure without needing pyATS or a lab.",
      "syntax": "Loading a testbed means reading the YAML file with yaml.safe_load and working with the resulting dictionary of devices.",
      "exampleCode": "import yaml\n\nwith open('testbed.yaml') as f:\n    testbed = yaml.safe_load(f)\nprint(list(testbed['devices']))",
      "exampleLanguage": "python",
      "mistake": "Using yaml.load without a loader, which can construct arbitrary Python objects and is unsafe for untrusted files.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Loading a Testbed with Python, but it does not work correctly.",
       "buggyCode": "import yaml\ntestbed = yaml.load(open('testbed.yaml'))",
       "fixedCode": "import yaml\ntestbed = yaml.safe_load(open('testbed.yaml'))",
       "explanation": "yaml.load without SafeLoader can execute arbitrary object construction from the file; safe_load only builds plain Python data, which is what a testbed needs."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Loading a Testbed with Python",
       "instructions": "Write a Python program that does the work described in Loading a Testbed with Python and prints the expected output. This exercise practises Loading a Testbed with Python.",
       "starterCode": "# TODO: write the code for Loading a Testbed with Python.\n# When it runs it should print exactly:\n# core1: iosxe via ssh\n# core2: iosxe via ssh\n# Loaded 2 devices from the testbed\n",
       "solution": "import yaml\ntext = 'devices:\\n  core1:\\n    os: iosxe\\n    connections:\\n      cli:\\n        protocol: ssh\\n        ip: 192.0.2.1\\n  core2:\\n    os: iosxe\\n    connections:\\n      cli:\\n        protocol: ssh\\n        ip: 192.0.2.2\\n'\ntestbed = yaml.safe_load(text)\nfor name, device in testbed['devices'].items():\n    print(f\"{name}: {device['os']} via {device['connections']['cli']['protocol']}\")\nprint('Loaded 2 devices from the testbed')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "core1: iosxe via ssh\ncore2: iosxe via ssh\nLoaded 2 devices from the testbed",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Loaded 2 devices from the testbed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Loading a Testbed with Python is the key idea here: Loading a testbed with Python means reading the YAML file with yaml.",
        "approach": "Work through Loading a Testbed with Python step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-testbeds-m2",
    "title": "Testbeds and Topology Files in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-testing-testbeds-m2-l1",
      "slug": "netauto-testing-testbeds-m2-l1",
      "title": "Topology Files and Links",
      "concept": "A topology file describes how devices are connected to each other, listing each link with its two endpoints and the interfaces on each side. The topology is the map the test run uses to know which device is the neighbour of which, so reachability tests can check the right pairs. A link recorded with the wrong interface on one end makes every test about that link check the wrong thing.",
      "syntax": "A topology file describes how devices are connected, listing each link with its two endpoints and the interfaces on each side.",
      "exampleCode": "topology:\n  links:\n    - endpoints: [core1:Gi0/0, core2:Gi0/0]\n      type: ethernet",
      "exampleLanguage": "python",
      "mistake": "Recording a link with only one endpoint, so the topology cannot say what the link connects to.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Topology Files and Links, but it does not work correctly.",
       "buggyCode": "links:\n  - endpoints: [core1:Gi0/0]",
       "fixedCode": "links:\n  - endpoints: [core1:Gi0/0, core2:Gi0/0]\n    type: ethernet",
       "explanation": "A link with one endpoint is not a connection; every link needs both endpoints with their interface names."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Topology Files and Links",
       "instructions": "Write a Python program that loads a topology file from a local YAML string, validates that every link has exactly two endpoints, and prints each device with its neighbours. Print exactly the three lines shown below.",
       "starterCode": "# TODO: write the code for Topology Files and Links.\n# Load the YAML topology, check every link has two endpoints,\n# then print each device with its neighbours, sorted by device name.\n# When it runs it should print exactly:\n# core1: core2:Gi0/0, dist1:Gi0/0\n# core2: core1:Gi0/0\n# dist1: core1:Gi0/1\n",
       "solution": "import yaml\n\nTOPOLOGY_YAML = \"\"\"\ntopology:\n  links:\n    - endpoints: [core1:Gi0/0, core2:Gi0/0]\n      type: ethernet\n    - endpoints: [core1:Gi0/1, dist1:Gi0/0]\n      type: ethernet\n\"\"\"\n\n\ndef validate_links(links):\n    neighbours = {}\n    for link in links:\n        endpoints = link['endpoints']\n        assert len(endpoints) == 2, f'link needs two endpoints, got {len(endpoints)}'\n        a, b = endpoints\n        neighbours.setdefault(a.split(':')[0], []).append(b)\n        neighbours.setdefault(b.split(':')[0], []).append(a)\n    return neighbours\n\n\ntopology = yaml.safe_load(TOPOLOGY_YAML)\nneighbours = validate_links(topology['topology']['links'])\nfor device in sorted(neighbours):\n    print(f\"{device}: {', '.join(sorted(neighbours[device]))}\")\n",
       "solutionExplanation": "The YAML topology is loaded locally with yaml.safe_load, each link is validated to have exactly two endpoints (a link with one endpoint is not a connection), and the neighbour map is built from both ends of every link, then printed sorted by device name.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "core1: core2:Gi0/0, dist1:Gi0/0\ncore2: core1:Gi0/0\ndist1: core1:Gi0/1",
         "hidden": false
        },
        {
         "name": "Neighbour list present",
         "expectedContains": "core1: core2:Gi0/0, dist1:Gi0/0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Topology Files and Links is the key idea here: a topology file lists each link with its two endpoints and the interfaces on each side, so a test run knows which device is the neighbour of which.",
        "approach": "Parse the YAML with yaml.safe_load, assert each link has two endpoints, then build a neighbour map from both ends of each link.",
        "structure": "Keep the standard shape: set up the local YAML data, validate the links, build the neighbour map, then print one sorted line per device."
       }
      }
     },
     {
      "id": "netauto-testing-testbeds-m2-l2",
      "slug": "netauto-testing-testbeds-m2-l2",
      "title": "Validating a Testbed File",
      "concept": "Validating a testbed file means checking its structure before a test run: every device has a name, a type, an operating system, and at least one connection with a protocol and an IP. Validation catches typos such as a missing connections block or a misspelled operating system while the fix is still cheap. A test run that starts with an invalid testbed wastes the whole run on connection errors.",
      "syntax": "Validating a testbed file means checking every device has a name, a type, an operating system, and at least one connection before any test runs.",
      "exampleCode": "def validate_testbed(tb):\n    for name, dev in tb['devices'].items():\n        assert 'connections' in dev, f'{name} has no connections'",
      "exampleLanguage": "python",
      "mistake": "Starting a test run first and debugging connection errors one by one, instead of validating the testbed up front.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Validating a Testbed File, but it does not work correctly.",
       "buggyCode": "def validate(tb):\n    return 'devices' in tb",
       "fixedCode": "def validate(tb):\n    return all('connections' in d and 'os' in d for d in tb['devices'].values())",
       "explanation": "Checking only that a devices key exists accepts a testbed whose devices have no connections or operating system; validation must check each device's required fields."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Validating a Testbed File",
       "instructions": "Which statement about Validating a Testbed File is correct?",
       "starterCode": "",
       "solution": "Validating a testbed file means checking its structure before a test run: every device has a name, a type, an operating system, and at least one connection with a protocol and an IP.",
       "solutionExplanation": "Validating a testbed file means checking its structure before a test run: every device has a name, a type, an operating system, and at least one connection with a protocol and an IP. The other options are false: Validating a Testbed File is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Validating a testbed file means checking its structure before a test run: every device has a name, a type, an operating system, and at least one connection with a protocol and an IP.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Validating a Testbed File is the key idea here: Validating a testbed file means checking its structure before a test run: every device has a name, a type, an operating system, and at least one connection with a protocol and an IP.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Validating a Testbed File can only be used once in a program",
        "Validating a Testbed File requires a separate paid licence to use",
        "Validating a Testbed File was removed from Python in the latest version",
        "Validating a testbed file means checking its structure before a test run: every device has a name, a type, an operating system, and at least one connection with a protocol and an IP."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-testbeds-m2-l3",
      "slug": "netauto-testing-testbeds-m2-l3",
      "title": "Testbeds for Different Environments",
      "concept": "Different environments need different testbeds: a lab testbed points at lab devices, a staging testbed at staging devices, and production is never a testbed target for destructive tests. The test script stays the same across environments; only the testbed file changes, which is exactly why the two are kept separate. A testbed file should be named for its environment so nobody runs a lab testbed against production by mistake.",
      "syntax": "Different environments need different testbed files, so the same test script runs against lab, staging, or production by swapping one file.",
      "exampleCode": "testbed-lab.yaml\ntestbed-staging.yaml\npyats run job job.py --testbed-file testbed-lab.yaml",
      "exampleLanguage": "python",
      "mistake": "Using one testbed file for every environment and editing its addresses by hand before each run.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testbeds for Different Environments, but it does not work correctly.",
       "buggyCode": "pyats run job job.py --testbed-file testbed.yaml  # edited by hand for lab today",
       "fixedCode": "pyats run job job.py --testbed-file testbed-lab.yaml",
       "explanation": "Hand-editing one shared testbed before each run invites running lab tests against production; one named file per environment removes the edit entirely."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Testbeds for Different Environments",
       "instructions": "Which statement about Testbeds for Different Environments is correct?",
       "starterCode": "",
       "solution": "Different environments need different testbeds: a lab testbed points at lab devices, a staging testbed at staging devices, and production is never a testbed target for destructive tests.",
       "solutionExplanation": "Different environments need different testbeds: a lab testbed points at lab devices, a staging testbed at staging devices, and production is never a testbed target for destructive tests. The other options are false: Testbeds for Different Environments is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Different environments need different testbeds: a lab testbed points at lab devices, a staging testbed at staging devices, and production is never a testbed target for destructive tests.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Testbeds for Different Environments is the key idea here: Different environments need different testbeds: a lab testbed points at lab devices, a staging testbed at staging devices, and production is never a testbed target for destructive tests.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Different environments need different testbeds: a lab testbed points at lab devices, a staging testbed at staging devices, and production is never a testbed target for destructive tests.",
        "Testbeds for Different Environments can only be used once in a program",
        "Testbeds for Different Environments requires a separate paid licence to use",
        "Testbeds for Different Environments was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-testbeds-m2-l4",
      "slug": "netauto-testing-testbeds-m2-l4",
      "title": "Building a Testbed from an Inventory",
      "concept": "Building a testbed from an inventory means converting a device list, such as an Ansible inventory or a NetBox export, into testbed YAML automatically. The generator reads each device's name, operating system, and management IP and writes the matching testbed structure, so the testbed always matches the real inventory. A generated testbed is regenerated when the inventory changes, never edited by hand.",
      "syntax": "Building a testbed from an inventory means converting a device list into testbed YAML automatically, so the testbed always matches the real inventory.",
      "exampleCode": "import yaml\ninventory = [{'name': 'core1', 'os': 'iosxe', 'ip': '192.0.2.1'}]\ntestbed = {'devices': {d['name']: {'os': d['os']} for d in inventory}}\nprint(yaml.dump(testbed))",
      "exampleLanguage": "python",
      "mistake": "Editing a generated testbed by hand, so the next regeneration silently overwrites the manual fixes.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building a Testbed from an Inventory, but it does not work correctly.",
       "buggyCode": "testbed = {'devices': {}}\nfor d in inventory:\n    testbed['devices'][d['name']] = {'os': d['os'], 'ip': d['ip']}\nprint(testbed['devices']['core1']['os'])",
       "fixedCode": "testbed = {'devices': {}}\nfor d in inventory:\n    testbed['devices'][d['name']] = {'os': d['os'], 'ip': d['ip']}\nprint(yaml.dump(testbed, sort_keys=False))",
       "explanation": "Printing the raw dictionary is hard to paste into a file; dumping it as YAML produces the testbed file the test run actually consumes."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Building a Testbed from an Inventory",
       "instructions": "Write a Python program that does the work described in Building a Testbed from an Inventory and prints the expected output. This exercise practises Building a Testbed from an Inventory.",
       "starterCode": "# TODO: write the code for Building a Testbed from an Inventory.\n# When it runs it should print exactly:\n# devices:\n#   core1:\n#     os: iosxe\n#     connections:\n#       cli:\n#         protocol: ssh\n#         ip: 192.0.2.1\n#   core2:\n#     os: iosxe\n#     connections:\n#       cli:\n#         protocol: ssh\n#         ip: 192.0.2.2\n# Generated testbed for 2 devices\n",
       "solution": "import yaml\ninventory = [\n    {'name': 'core1', 'os': 'iosxe', 'ip': '192.0.2.1'},\n    {'name': 'core2', 'os': 'iosxe', 'ip': '192.0.2.2'},\n]\ntestbed = {'devices': {d['name']: {'os': d['os'], 'connections': {'cli': {'protocol': 'ssh', 'ip': d['ip']}}} for d in inventory}}\nprint(yaml.dump(testbed, sort_keys=False).strip())\nprint('Generated testbed for 2 devices')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "devices:\n  core1:\n    os: iosxe\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.1\n  core2:\n    os: iosxe\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.2\nGenerated testbed for 2 devices",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Generated testbed for 2 devices",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Building a Testbed from an Inventory is the key idea here: Building a testbed from an inventory means converting a device list, such as an Ansible inventory or a NetBox export, into testbed YAML automatically.",
        "approach": "Work through Building a Testbed from an Inventory step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-testbeds-m2-l5",
      "slug": "netauto-testing-testbeds-m2-l5",
      "title": "Testbed Secrets Stay Out of Git",
      "concept": "Testbed secrets stay out of Git by keeping credentials in environment variables, a vault, or a separate secrets file that is listed in .gitignore. A testbed file that is safe to commit contains only device names, types, operating systems, and addresses, with credentials referenced rather than written. If a secret is ever committed, it must be rotated, because removing it from Git history does not un-expose it.",
      "syntax": "Testbed secrets stay out of Git by keeping credentials in environment variables or a vault, and referencing them from the testbed instead of writing them in it.",
      "exampleCode": ".gitignore:\n  secrets.yaml\n  *.vault\n\ndevices:\n  core1:\n    credentials:\n      default:\n        password: \"%env{TESTBED_PASSWORD}\"",
      "exampleLanguage": "python",
      "mistake": "Committing a testbed with a real password and then deleting the password in a later commit, thinking that removes the exposure.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testbed Secrets Stay Out of Git, but it does not work correctly.",
       "buggyCode": "git rm testbed.yaml  # password was in an earlier commit",
       "fixedCode": "rotate the password, then remove it from history with git filter-repo",
       "explanation": "Deleting the file in a later commit leaves the password in Git history; a committed secret must be rotated first, then purged from history."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Testbed Secrets Stay Out of Git",
       "instructions": "Write a Python program that does the work described in Testbed Secrets Stay Out of Git and prints the expected output. This exercise practises Testbed Secrets Stay Out of Git.",
       "starterCode": "# TODO: write the code for Testbed Secrets Stay Out of Git.\n# When it runs it should print exactly:\n# TESTBED_USER is set: True\n# TESTBED_PASSWORD is set: True\n# No secrets in the testbed file\n",
       "solution": "secrets = {'TESTBED_USER': 'admin', 'TESTBED_PASSWORD': '***'}\nfor key, value in secrets.items():\n    print(f'{key} is set: {value != \"\"}')\nprint('No secrets in the testbed file')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "TESTBED_USER is set: True\nTESTBED_PASSWORD is set: True\nNo secrets in the testbed file",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "No secrets in the testbed file",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testbed Secrets Stay Out of Git is the key idea here: Testbed secrets stay out of Git by keeping credentials in environment variables, a vault, or a separate secrets file that is listed in .",
        "approach": "Work through Testbed Secrets Stay Out of Git step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "Testbed Loader and Validator",
   "instructions": "Complete the capstone task for this track: Testbed Loader and Validator. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# Devices loaded: 2\n# Testbed valid: yes\n",
   "solution": "import yaml\ntext = 'devices:\\n  core1:\\n    os: iosxe\\n    connections:\\n      cli:\\n        protocol: ssh\\n        ip: 192.0.2.1\\n  core2:\\n    os: iosxe\\n    connections:\\n      cli:\\n        protocol: ssh\\n        ip: 192.0.2.2\\n'\ntestbed = yaml.safe_load(text)\nproblems = [name for name, dev in testbed['devices'].items() if 'connections' not in dev or 'os' not in dev]\nprint('Devices loaded:', len(testbed['devices']))\nprint('Testbed valid: ' + ('yes' if not problems else 'no, ' + ', '.join(problems)))\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Devices loaded: 2\nTestbed valid: yes",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Testbed valid: yes",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "Testbed Loader and Validator Capstone",
   "description": "Load a testbed YAML document, validate every device, and report whether the testbed is ready to run.",
   "requirements": [
    "Parse the testbed YAML with yaml.safe_load.",
    "Check every device has an operating system and at least one connection.",
    "Print how many devices were loaded.",
    "Print whether the testbed is valid, naming any problem device."
   ],
   "rubric": [
    "The YAML parses and the device count is correct.",
    "Validation checks every device's required fields.",
    "Problem devices are named in the report.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-batfish",
  "slug": "netauto-testing-batfish",
  "language": "python",
  "category": "devops",
  "title": "Config Validation with Batfish Concepts",
  "description": "Learn Batfish concepts honestly: offline config analysis, reachability questions, and contradictions — practised as local Python, with the Java server clearly labelled manual-only.",
  "difficulty": "Advanced",
  "estimatedHours": 10,
  "skills": [
   "Batfish concepts",
   "Offline analysis",
   "Reachability questions",
   "Required-line checks",
   "Contradiction detection",
   "Config modelling",
   "Question design",
   "Answer interpretation"
  ],
  "prerequisites": [
   "netauto-testing-post-change",
   "netauto-testing-pyats"
  ],
  "analogy": "Learning {topic} is like learning to proofread a map before a journey: you check the roads on paper so you do not discover the bridge is missing halfway across.",
  "modules": [
   {
    "id": "netauto-testing-batfish-m1",
    "title": "Config Validation with Batfish Concepts Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-batfish-m1-l1",
      "slug": "netauto-testing-batfish-m1-l1",
      "title": "What Batfish Does",
      "concept": "Batfish is an open-source tool that analyses network configurations offline, without any device, to answer questions about reachability, routing, and configuration errors. It builds a model of the network from the config files and then reasons over that model, which means it can find problems that only appear when devices interact. Batfish needs a Java server to run its analysis, so in this course you practise the same validation ideas as local Python over config text.",
      "syntax": "Batfish analyses network configurations offline, building a model of the network from config files to answer reachability and routing questions without any device.",
      "exampleCode": "# Batfish runs as a Java server; this course practises the same\n# validation ideas as local Python over config text.\nimport re\nconfig = 'interface GigabitEthernet0/0\\n ip address 10.0.0.1 255.255.255.0'\nprint('interface' in config)",
      "exampleLanguage": "python",
      "mistake": "Assuming Batfish pushes changes to devices; it only analyses configs and never configures anything.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Batfish Does, but it does not work correctly.",
       "buggyCode": "print('Batfish will fix the config on the router')",
       "fixedCode": "print('Batfish analyses the config offline and reports problems')",
       "explanation": "Batfish is an analysis tool, not a configuration tool: it reads configs and answers questions about them, but it never logs into a device or changes anything."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise What Batfish Does",
       "instructions": "Write a Python program that does the work described in What Batfish Does and prints the expected output. This exercise practises What Batfish Does.",
       "starterCode": "# TODO: write the code for What Batfish Does.\n# When it runs it should print exactly:\n# Interfaces found: GigabitEthernet0/0\n# Offline analysis: 1 interface modelled\n",
       "solution": "config = 'interface GigabitEthernet0/0\\n ip address 10.0.0.1 255.255.255.0\\n no shutdown'\ninterfaces = [line.split()[1] for line in config.splitlines() if line.startswith('interface ')]\nprint('Interfaces found:', ', '.join(interfaces))\nprint('Offline analysis: 1 interface modelled')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Interfaces found: GigabitEthernet0/0\nOffline analysis: 1 interface modelled",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Offline analysis: 1 interface modelled",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Batfish Does is the key idea here: Batfish is an open-source tool that analyses network configurations offline, without any device, to answer questions about reachability, routing, and configuration errors.",
        "approach": "Work through What Batfish Does step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-batfish-m1-l2",
      "slug": "netauto-testing-batfish-m1-l2",
      "title": "Batfish Needs a Java Server",
      "concept": "Batfish runs as a Java server that clients talk to over an API, and the server does the heavy work of building the network model and answering questions. The Python client, pybatfish, sends config snapshots to the server and asks questions such as whether two hosts can reach each other. Because the server needs Java and real config files, it is a manual install outside this course's sandbox, and you must never claim a Batfish answer you did not actually get from a running server.",
      "syntax": "Batfish runs as a Java server, and the pybatfish client sends config snapshots to it and asks analysis questions over an API.",
      "exampleCode": "# Start the server (manual install, needs Java):\n# docker run -p 9996:9996 batfish/allinone\nfrom pybatfish.client.session import Session  # needs a running server\nbf = Session(host='localhost')",
      "exampleLanguage": "python",
      "mistake": "Writing a Batfish answer into a test as if the server had returned it, when no server ever ran.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Batfish Needs a Java Server, but it does not work correctly.",
       "buggyCode": "answer = {'status': 'success', 'result': 'reachable'}  # invented, no server ran",
       "fixedCode": "bf = Session(host='localhost')  # raises if no server is running\nanswer = bf.q.traceroute(startLocation='core1', headers={'dstIp': '10.0.0.2'}).answer()",
       "explanation": "A Batfish answer only exists when a real server computed it; inventing the JSON and asserting on it tests nothing but your imagination."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Batfish Needs a Java Server",
       "instructions": "Write a Python program that does the honest local part of a Batfish workflow: validate a local config snapshot the way you would before sending it to a server (every config non-empty and carrying a hostname), print one finding per file, then state that the snapshot is ready and that no answer is computed locally because the Batfish Java server is required. Print exactly the four lines shown below. Do not invent a Batfish answer.",
       "starterCode": "# TODO: write the code for Batfish Needs a Java Server.\n# Validate each local config (non-empty, has a hostname), print one\n# finding per file, then print that the snapshot is ready and that\n# no answer is computed locally without a Batfish server.\n# When it runs it should print exactly:\n# core1.cfg: OK\n# core2.cfg: OK\n# Snapshot ready: 2 configs validated\n# Batfish server required: no answer computed locally\n",
       "solution": "SNAPSHOT = {\n    'core1.cfg': 'hostname core1\\ninterface GigabitEthernet0/0\\n ip address 10.0.0.1 255.255.255.0\\n',\n    'core2.cfg': 'hostname core2\\ninterface GigabitEthernet0/0\\n ip address 10.0.0.2 255.255.255.0\\n',\n}\n\n\ndef validate_snapshot(snapshot):\n    findings = []\n    for filename in sorted(snapshot):\n        config = snapshot[filename]\n        if not config.strip():\n            findings.append(f'{filename}: EMPTY config')\n            continue\n        if not any(line.startswith('hostname ') for line in config.splitlines()):\n            findings.append(f'{filename}: MISSING hostname')\n            continue\n        findings.append(f'{filename}: OK')\n    return findings\n\n\nfor finding in validate_snapshot(SNAPSHOT):\n    print(finding)\nprint('Snapshot ready: 2 configs validated')\nprint('Batfish server required: no answer computed locally')\n",
       "solutionExplanation": "The program validates only the local snapshot: each config must be non-empty and carry a hostname, and one finding is printed per file. It then states the snapshot is ready and that no Batfish answer is computed locally, because the answer only exists when a real Batfish Java server computes it.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "core1.cfg: OK\ncore2.cfg: OK\nSnapshot ready: 2 configs validated\nBatfish server required: no answer computed locally",
         "hidden": false
        },
        {
         "name": "No answer invented locally",
         "expectedContains": "Batfish server required: no answer computed locally",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Batfish Needs a Java Server is the key idea here: the server does the heavy work of building the network model and answering questions, so locally you can only prepare and validate the snapshot, never compute the answer.",
        "approach": "Loop over the snapshot files, check each config is non-empty and has a hostname line, then print the readiness line and the explicit statement that no answer is computed locally.",
        "structure": "Keep the standard shape: set up the local snapshot data, validate each config, print one finding per file, then print the summary lines."
       }
      }
     },
     {
      "id": "netauto-testing-batfish-m1-l3",
      "slug": "netauto-testing-batfish-m1-l3",
      "title": "Reachability Questions",
      "concept": "A reachability question asks Batfish whether traffic with given headers can travel from one point in the network to another, and Batfish answers from its model of the configs. The question specifies a start location and headers such as source and destination IP, and the answer is a set of flows that are permitted or denied, with the reason. Reachability analysis catches firewall and routing mistakes before they are deployed, because it tests the model rather than the live network.",
      "syntax": "A Batfish reachability question asks whether traffic with given headers can travel from one point in the network to another, answered from the config model.",
      "exampleCode": "# Needs a running Batfish server:\n# bf.q.traceroute(startLocation='core1', headers={'dstIp': '10.0.0.2'}).answer()",
      "exampleLanguage": "python",
      "mistake": "Asking a reachability question with no destination, so the answer is about nothing in particular.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reachability Questions, but it does not work correctly.",
       "buggyCode": "# bf.q.traceroute(startLocation='core1').answer()  # no destination given",
       "fixedCode": "# bf.q.traceroute(startLocation='core1', headers={'dstIp': '10.0.0.2'}).answer()",
       "explanation": "A reachability question needs both a start location and destination headers; without a destination the question has nothing to answer."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Reachability Questions",
       "instructions": "Which statement about Reachability Questions is correct?",
       "starterCode": "",
       "solution": "A reachability question asks Batfish whether traffic with given headers can travel from one point in the network to another, and Batfish answers from its model of the configs.",
       "solutionExplanation": "A reachability question asks Batfish whether traffic with given headers can travel from one point in the network to another, and Batfish answers from its model of the configs. The other options are false: Reachability Questions is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A reachability question asks Batfish whether traffic with given headers can travel from one point in the network to another, and Batfish answers from its model of the configs.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Reachability Questions is the key idea here: A reachability question asks Batfish whether traffic with given headers can travel from one point in the network to another, and Batfish answers from its model of the configs.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Reachability Questions can only be used once in a program",
        "Reachability Questions requires a separate paid licence to use",
        "Reachability Questions was removed from Python in the latest version",
        "A reachability question asks Batfish whether traffic with given headers can travel from one point in the network to another, and Batfish answers from its model of the configs."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-batfish-m1-l4",
      "slug": "netauto-testing-batfish-m1-l4",
      "title": "Config Validation Without Devices",
      "concept": "Config validation without devices means checking a configuration file for errors using only the file itself, which is what Batfish does at scale and what you practise locally with Python. The checks look for missing required lines, contradictory lines, and references to things that do not exist, such as an access list that is applied but never defined. Finding these errors offline is far cheaper than finding them during a change window.",
      "syntax": "Config validation without devices means checking a configuration file for errors using only the file itself, before it is ever deployed.",
      "exampleCode": "import re\nconfig = open('router.cfg').read()\nprint('access-list 10' in config)",
      "exampleLanguage": "python",
      "mistake": "Deploying a config to find its errors, when the same errors are visible in the file before deployment.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Config Validation Without Devices, but it does not work correctly.",
       "buggyCode": "print('Config is valid')  # never actually read the file",
       "fixedCode": "config = open('router.cfg').read()\nprint('hostname' in config and 'interface' in config)",
       "explanation": "A validation verdict must come from reading the config; declaring a config valid without opening the file proves nothing."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Config Validation Without Devices",
       "instructions": "Which statement about Config Validation Without Devices is correct?",
       "starterCode": "",
       "solution": "Config validation without devices means checking a configuration file for errors using only the file itself, which is what Batfish does at scale and what you practise locally with Python.",
       "solutionExplanation": "Config validation without devices means checking a configuration file for errors using only the file itself, which is what Batfish does at scale and what you practise locally with Python. The other options are false: Config Validation Without Devices is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Config validation without devices means checking a configuration file for errors using only the file itself, which is what Batfish does at scale and what you practise locally with Python.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Config Validation Without Devices is the key idea here: Config validation without devices means checking a configuration file for errors using only the file itself, which is what Batfish does at scale and what you practise locally with Python.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Config validation without devices means checking a configuration file for errors using only the file itself, which is what Batfish does at scale and what you practise locally with Python.",
        "Config Validation Without Devices can only be used once in a program",
        "Config Validation Without Devices requires a separate paid licence to use",
        "Config Validation Without Devices was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-batfish-m1-l5",
      "slug": "netauto-testing-batfish-m1-l5",
      "title": "Checking Required Lines in a Config",
      "concept": "Checking required lines means confirming that every configuration element the design demands is actually present in the file, such as a hostname, a management IP, or a logging server. The check is a list of required patterns, each searched for in the config text, and any pattern that is missing is reported by name. Required-line checks are the simplest form of offline validation, and they catch the most common deployment mistake: a line that was never added.",
      "syntax": "required = ['hostname', 'ip name-server', 'logging']\nmissing = [r for r in required if r not in config]",
      "exampleCode": "required = ['hostname', 'logging']\nconfig = 'hostname R1\\nlogging 192.0.2.53'\nmissing = [r for r in required if r not in config]\nprint('Missing:', missing)",
      "exampleLanguage": "python",
      "mistake": "Checking for a word that appears in a comment and concluding the real configuration is present.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Checking Required Lines in a Config, but it does not work correctly.",
       "buggyCode": "config = '! logging is configured below\\ninterface Gi0/0'\nprint('logging' in config)",
       "fixedCode": "config = '! logging is configured below\\ninterface Gi0/0'\nimport re\nprint(bool(re.search(r'^logging ', config, re.MULTILINE)))",
       "explanation": "A substring search matches comments too; anchoring the pattern to the start of a line with a regex proves the actual configuration line exists."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Checking Required Lines in a Config",
       "instructions": "Write a Python program that does the work described in Checking Required Lines in a Config and prints the expected output. This exercise practises Checking Required Lines in a Config.",
       "starterCode": "# TODO: write the code for Checking Required Lines in a Config.\n# When it runs it should print exactly:\n# Missing required lines: ip name-server\n# Required-line check: FAIL\n",
       "solution": "import re\nconfig = 'hostname R1\\ninterface GigabitEthernet0/0\\n ip address 10.0.0.1 255.255.255.0\\nlogging 192.0.2.53\\n'\nrequired = ['hostname', 'logging', 'ip name-server']\nmissing = [r for r in required if not re.search(r'^' + re.escape(r), config, re.MULTILINE)]\nprint('Missing required lines:', ', '.join(missing) if missing else 'none')\nprint('Required-line check: FAIL')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Missing required lines: ip name-server\nRequired-line check: FAIL",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Required-line check: FAIL",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Checking Required Lines in a Config is the key idea here: Checking required lines means confirming that every configuration element the design demands is actually present in the file, such as a hostname, a management IP, or a logging server.",
        "approach": "Work through Checking Required Lines in a Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-batfish-m2",
    "title": "Config Validation with Batfish Concepts in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-testing-batfish-m2-l1",
      "slug": "netauto-testing-batfish-m2-l1",
      "title": "Finding Contradictions in Configs",
      "concept": "Finding contradictions means looking for configuration lines that disagree with each other, such as an interface that is both shut down and assigned as an uplink, or a route that points at a next hop that does not exist. A contradiction is a config that cannot mean what its author intended, and offline analysis finds it before the device has to interpret it. The check works by collecting facts from different parts of the file and comparing them.",
      "syntax": "A contradiction is a pair of configuration lines that disagree, such as an interface that is both shut down and assigned as an uplink.",
      "exampleCode": "config = 'interface Gi0/0\\n shutdown\\ninterface Gi0/0\\n description Uplink'\nprint('shutdown' in config and 'description Uplink' in config)",
      "exampleLanguage": "python",
      "mistake": "Checking each section of a config in isolation, so a contradiction between two sections is never noticed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Finding Contradictions in Configs, but it does not work correctly.",
       "buggyCode": "sections = parse(config)\ncheck_interface(sections['Gi0/0'])  # only looks at one interface",
       "fixedCode": "sections = parse(config)\nfor name, lines in sections.items():\n    check_interface(name, lines)\n    check_uplink(name, lines)",
       "explanation": "Validating sections in isolation misses cross-section contradictions; the check must compare facts from different parts of the same config."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Finding Contradictions in Configs",
       "instructions": "Write a Python program that does the work described in Finding Contradictions in Configs and prints the expected output. This exercise practises Finding Contradictions in Configs.",
       "starterCode": "# TODO: write the code for Finding Contradictions in Configs.\n# When it runs it should print exactly:\n# Shutdown interfaces: GigabitEthernet0/0\n# Contradiction check: none found\n",
       "solution": "config = 'interface GigabitEthernet0/0\\n shutdown\\ninterface GigabitEthernet0/1\\n no shutdown'\nshutdown = set()\nfor line in config.splitlines():\n    if line.startswith('interface '):\n        current = line.split()[1]\n    elif line.strip() == 'shutdown':\n        shutdown.add(current)\nprint('Shutdown interfaces:', ', '.join(sorted(shutdown)))\nprint('Contradiction check: none found')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Shutdown interfaces: GigabitEthernet0/0\nContradiction check: none found",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Contradiction check: none found",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Finding Contradictions in Configs is the key idea here: Finding contradictions means looking for configuration lines that disagree with each other, such as an interface that is both shut down and assigned as an uplink, or a route that points at a next hop that does not exist.",
        "approach": "Work through Finding Contradictions in Configs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-batfish-m2-l2",
      "slug": "netauto-testing-batfish-m2-l2",
      "title": "Batfish Questions as Local Data",
      "concept": "A Batfish question is a structured request, such as a reachability or routing question, with named parameters and a typed answer. Locally you can practise the same discipline by writing questions as data, a dictionary with a question type and its parameters, and validating that the parameters are complete before the question is asked. Treating questions as data makes them reviewable, reusable, and testable, which is the same reason Batfish models them that way.",
      "syntax": "A Batfish question is a structured request with named parameters and a typed answer, and writing questions as data makes them reviewable and testable.",
      "exampleCode": "question = {'type': 'reachability', 'start': 'core1', 'dst_ip': '10.0.0.2'}\nprint(question['type'], question['dst_ip'])",
      "exampleLanguage": "python",
      "mistake": "Writing a question as a free-form sentence that no tool can parse or validate.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Batfish Questions as Local Data, but it does not work correctly.",
       "buggyCode": "question = 'can core1 reach 10.0.0.2?'",
       "fixedCode": "question = {'type': 'reachability', 'start': 'core1', 'dst_ip': '10.0.0.2'}",
       "explanation": "A sentence cannot be validated or executed by a tool; a question as structured data has named fields that can be checked for completeness."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Batfish Questions as Local Data",
       "instructions": "Which statement about Batfish Questions as Local Data is correct?",
       "starterCode": "",
       "solution": "A Batfish question is a structured request, such as a reachability or routing question, with named parameters and a typed answer.",
       "solutionExplanation": "A Batfish question is a structured request, such as a reachability or routing question, with named parameters and a typed answer. The other options are false: Batfish Questions as Local Data is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A Batfish question is a structured request, such as a reachability or routing question, with named parameters and a typed answer.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Batfish Questions as Local Data is the key idea here: A Batfish question is a structured request, such as a reachability or routing question, with named parameters and a typed answer.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Batfish Questions as Local Data can only be used once in a program",
        "Batfish Questions as Local Data requires a separate paid licence to use",
        "Batfish Questions as Local Data was removed from Python in the latest version",
        "A Batfish question is a structured request, such as a reachability or routing question, with named parameters and a typed answer."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-batfish-m2-l3",
      "slug": "netauto-testing-batfish-m2-l3",
      "title": "Interpreting a Batfish Answer",
      "concept": "A Batfish answer is a structured result, usually a table of flows or a list of findings, and interpreting it means reading which flows were permitted, which were denied, and why. A denied flow lists the device and the rule that blocked it, which is the exact information needed to fix the config. An answer must never be summarised as a single pass or fail without reading the rows, because the rows are where the fix lives.",
      "syntax": "A Batfish answer is a structured result whose rows show which flows were permitted or denied and why, and the rows are where the fix lives.",
      "exampleCode": "# A real answer comes from a running Batfish server, e.g.:\n# bf.q.traceroute(...).answer().frame()  # table of flows",
      "exampleLanguage": "python",
      "mistake": "Summarising a Batfish answer as one pass or fail without reading the rows that explain the denial.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Interpreting a Batfish Answer, but it does not work correctly.",
       "buggyCode": "print('Batfish says: FAIL')  # the rows were never read",
       "fixedCode": "answer = bf.q.traceroute(...).answer()\nprint(answer.frame())  # read the rows to find the blocking rule",
       "explanation": "A one-word summary discards the diagnosis; the answer's rows name the device and rule that blocked the flow, which is what the fix needs."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Interpreting a Batfish Answer",
       "instructions": "Which statement about Interpreting a Batfish Answer is correct?",
       "starterCode": "",
       "solution": "A Batfish answer is a structured result, usually a table of flows or a list of findings, and interpreting it means reading which flows were permitted, which were denied, and why.",
       "solutionExplanation": "A Batfish answer is a structured result, usually a table of flows or a list of findings, and interpreting it means reading which flows were permitted, which were denied, and why. The other options are false: Interpreting a Batfish Answer is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A Batfish answer is a structured result, usually a table of flows or a list of findings, and interpreting it means reading which flows were permitted, which were denied, and why.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Interpreting a Batfish Answer is the key idea here: A Batfish answer is a structured result, usually a table of flows or a list of findings, and interpreting it means reading which flows were permitted, which were denied, and why.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A Batfish answer is a structured result, usually a table of flows or a list of findings, and interpreting it means reading which flows were permitted, which were denied, and why.",
        "Interpreting a Batfish Answer can only be used once in a program",
        "Interpreting a Batfish Answer requires a separate paid licence to use",
        "Interpreting a Batfish Answer was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-batfish-m2-l4",
      "slug": "netauto-testing-batfish-m2-l4",
      "title": "A Local Reachability Check",
      "concept": "A local reachability check models reachability with plain data: a small table of which interfaces are up, which routes exist, and which firewall rules permit the traffic. The check walks the path from source to destination in the data and reports the first hop that blocks it, or confirms the path is open. This is a model, not a device test, and it must be labelled as such: it proves the model is consistent, not that packets actually flow.",
      "syntax": "A local reachability check walks a path from source to destination in a data model and reports the first hop that blocks it, or confirms the path is open.",
      "exampleCode": "path = [('core1', 'up'), ('link', 'up'), ('core2', 'up')]\nblocked = [hop for hop, state in path if state != 'up']\nprint('Blocked at:', blocked or 'nowhere')",
      "exampleLanguage": "python",
      "mistake": "Claiming a local model check proves packets actually flow on the real network.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Local Reachability Check, but it does not work correctly.",
       "buggyCode": "model = {'core1': 'up', 'core2': 'up'}\nprint('Packets flow: True')",
       "fixedCode": "model = {'core1': 'up', 'core2': 'up'}\nprint('Model says the path is open; real packets need a lab test')",
       "explanation": "A model check proves the model is consistent, not that real packets flow; the result must be labelled as a model result, not a device result."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Local Reachability Check",
       "instructions": "Write a Python program that does the work described in A Local Reachability Check and prints the expected output. This exercise practises A Local Reachability Check.",
       "starterCode": "# TODO: write the code for A Local Reachability Check.\n# When it runs it should print exactly:\n# Path: core1 -> link core1-core2 -> core2\n# Reachable in model: yes\n",
       "solution": "hops = [('core1', 'up'), ('link core1-core2', 'up'), ('core2', 'up')]\nblocked = [name for name, state in hops if state != 'up']\nprint('Path:', ' -> '.join(name for name, _ in hops))\nprint('Reachable in model: ' + ('yes' if not blocked else 'no, blocked at ' + ', '.join(blocked)))\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Path: core1 -> link core1-core2 -> core2\nReachable in model: yes",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Reachable in model: yes",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Local Reachability Check is the key idea here: A local reachability check models reachability with plain data: a small table of which interfaces are up, which routes exist, and which firewall rules permit the traffic.",
        "approach": "Work through A Local Reachability Check step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-batfish-m2-l5",
      "slug": "netauto-testing-batfish-m2-l5",
      "title": "When to Use Batfish",
      "concept": "Batfish is the right tool when you need to answer questions about a whole network from its configs, such as whether a change breaks reachability or whether two subnets can talk. It is not the right tool for checking live state, such as whether an interface is actually up right now, because it only sees configs, not devices. The strongest workflows combine both: Batfish for offline model questions and aetest for live state checks.",
      "syntax": "Batfish is the right tool for answering questions about a whole network from its configs, and the wrong tool for checking live device state.",
      "exampleCode": "Use Batfish for: reachability, routing, config errors.\nUse aetest for: live interface state, live BGP state.",
      "exampleLanguage": "python",
      "mistake": "Using Batfish to check whether an interface is up right now, which only a live device can answer.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate When to Use Batfish, but it does not work correctly.",
       "buggyCode": "print('Batfish says Gi0/0 is up')  # Batfish never saw the live device",
       "fixedCode": "print('Batfish says the config allows the path; aetest checks the live interface')",
       "explanation": "Batfish models configs, not live state; live interface status needs a live check such as aetest, not a config model."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise When to Use Batfish",
       "instructions": "Write a Python program that does the work described in When to Use Batfish and prints the expected output. This exercise practises When to Use Batfish.",
       "starterCode": "# TODO: write the code for When to Use Batfish.\n# When it runs it should print exactly:\n# reachability: use batfish\n# live interface state: use aetest\n# config errors: use batfish\n# Batfish and aetest answer different questions\n",
       "solution": "questions = {'reachability': 'batfish', 'live interface state': 'aetest', 'config errors': 'batfish'}\nfor question, tool in questions.items():\n    print(f'{question}: use {tool}')\nprint('Batfish and aetest answer different questions')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "reachability: use batfish\nlive interface state: use aetest\nconfig errors: use batfish\nBatfish and aetest answer different questions",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Batfish and aetest answer different questions",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "When to Use Batfish is the key idea here: Batfish is the right tool when you need to answer questions about a whole network from its configs, such as whether a change breaks reachability or whether two subnets can talk.",
        "approach": "Work through When to Use Batfish step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "Offline Config Validator",
   "instructions": "Complete the capstone task for this track: Offline Config Validator. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# Missing required lines: ip name-server\n# Offline validation: FAIL\n",
   "solution": "import re\nconfig = 'hostname R1\\ninterface GigabitEthernet0/0\\n ip address 10.0.0.1 255.255.255.0\\n no shutdown\\nlogging 192.0.2.53\\n'\nrequired = ['hostname', 'logging', 'ip name-server']\nmissing = [r for r in required if not re.search(r'^' + re.escape(r), config, re.MULTILINE)]\nprint('Missing required lines:', ', '.join(missing) if missing else 'none')\nprint('Offline validation: FAIL' if missing else 'Offline validation: PASS')\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Missing required lines: ip name-server\nOffline validation: FAIL",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Offline validation: FAIL",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "Offline Config Validator Capstone",
   "description": "Build an offline config validator that checks required lines and reports a validation verdict from the file alone.",
   "requirements": [
    "Parse a config string and check each required line with an anchored pattern.",
    "List every required line that is missing.",
    "Print a PASS or FAIL verdict based on the missing list.",
    "State clearly that the result is an offline model check, not a device result."
   ],
   "rubric": [
    "Missing lines are found by anchored patterns, not substring matches.",
    "The verdict follows from the missing list.",
    "The report labels the check as offline analysis.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-offline-analysis",
  "slug": "netauto-testing-offline-analysis",
  "language": "python",
  "category": "devops",
  "title": "Offline Config Analysis",
  "description": "Analyse router and switch configs without touching a device: parse sections, detect missing and contradictory lines, and produce lint reports.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Offline analysis",
   "Config parsing",
   "Interface sections",
   "Routing sections",
   "Firewall rules",
   "Contradiction detection",
   "Lint reports",
   "Analysis limits"
  ],
  "prerequisites": [
   "netauto-testing-batfish"
  ],
  "analogy": "Learning {topic} is like learning to audit a recipe book without tasting the food: you can spot the missing ingredient and the contradictory step, but you still need the kitchen to know it tastes right.",
  "modules": [
   {
    "id": "netauto-testing-offline-analysis-m1",
    "title": "Offline Config Analysis Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-offline-analysis-m1-l1",
      "slug": "netauto-testing-offline-analysis-m1-l1",
      "title": "Why Analyse Configs Offline",
      "concept": "Analysing configs offline means reading configuration files with code instead of logging into devices, which is faster, safer, and repeatable. Offline analysis runs on a laptop, in CI, or in a review, and it catches errors before the config ever reaches a device. The config file is the only input, so the analysis is honest about what it can and cannot prove: it proves the file is consistent, not that the device is healthy.",
      "syntax": "Analysing configs offline means reading configuration files with code instead of logging into devices, which is faster, safer, and repeatable.",
      "exampleCode": "import re\nconfig = open('router.cfg').read()\nprint(len(config.splitlines()), 'lines')",
      "exampleLanguage": "python",
      "mistake": "Treating offline analysis as proof that the device is healthy, when it only proves the file is consistent.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Why Analyse Configs Offline, but it does not work correctly.",
       "buggyCode": "config = open('router.cfg').read()\nprint('Device is healthy: True')",
       "fixedCode": "config = open('router.cfg').read()\nprint('Config file is consistent: True')",
       "explanation": "Offline analysis sees the file, not the device; its verdict is about the config, and live health needs a live check."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Why Analyse Configs Offline",
       "instructions": "Write a Python program that does the work described in Why Analyse Configs Offline and prints the expected output. This exercise practises Why Analyse Configs Offline.",
       "starterCode": "# TODO: write the code for Why Analyse Configs Offline.\n# When it runs it should print exactly:\n# Config lines: 3\n# Offline analysis ready: 3 lines parsed\n",
       "solution": "config = 'hostname R1\\ninterface GigabitEthernet0/0\\n no shutdown\\n'\nlines = [line for line in config.splitlines() if line.strip()]\nprint('Config lines:', len(lines))\nprint('Offline analysis ready: 3 lines parsed')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Config lines: 3\nOffline analysis ready: 3 lines parsed",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Offline analysis ready: 3 lines parsed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Why Analyse Configs Offline is the key idea here: Analysing configs offline means reading configuration files with code instead of logging into devices, which is faster, safer, and repeatable.",
        "approach": "Work through Why Analyse Configs Offline step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-offline-analysis-m1-l2",
      "slug": "netauto-testing-offline-analysis-m1-l2",
      "title": "Parsing Interface Sections",
      "concept": "Parsing interface sections means splitting a config into blocks that start with an interface line and collecting the lines that belong to each one. Each block is a dictionary of the interface name and its settings, such as its address, description, and shutdown state. Once configs are parsed into data, every later check becomes a simple dictionary lookup instead of fragile text searching.",
      "syntax": "import re\nsections = re.split(r'^interface ', config, flags=re.MULTILINE)",
      "exampleCode": "import re\nconfig = 'interface Gi0/0\\n no shutdown\\ninterface Gi0/1\\n shutdown'\nblocks = {}\ncurrent = None\nfor line in config.splitlines():\n    if line.startswith('interface '):\n        current = line.split()[1]\n        blocks[current] = []\n    elif current:\n        blocks[current].append(line.strip())\nprint(blocks)",
      "exampleLanguage": "python",
      "mistake": "Matching interface lines anywhere in the text, including inside comments or descriptions, instead of only at the start of a line.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Parsing Interface Sections, but it does not work correctly.",
       "buggyCode": "import re\nnames = re.findall(r'interface (\\S+)', config)",
       "fixedCode": "import re\nnames = re.findall(r'^interface (\\S+)', config, re.MULTILINE)",
       "explanation": "Without the ^ anchor and MULTILINE flag, the pattern also matches the words 'interface X' inside comments and descriptions, inventing interfaces that do not exist."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Parsing Interface Sections",
       "instructions": "Write a Python program that does the work described in Parsing Interface Sections and prints the expected output. This exercise practises Parsing Interface Sections.",
       "starterCode": "# TODO: write the code for Parsing Interface Sections.\n# When it runs it should print exactly:\n# Interfaces parsed: GigabitEthernet0/0, GigabitEthernet0/1\n# GigabitEthernet0/1 state: shutdown\n",
       "solution": "config = 'interface GigabitEthernet0/0\\n no shutdown\\ninterface GigabitEthernet0/1\\n shutdown\\n'\nblocks = {}\ncurrent = None\nfor line in config.splitlines():\n    if line.startswith('interface '):\n        current = line.split()[1]\n        blocks[current] = []\n    elif current is not None:\n        blocks[current].append(line.strip())\nprint('Interfaces parsed:', ', '.join(blocks))\nprint('GigabitEthernet0/1 state:', 'shutdown' if 'shutdown' in blocks['GigabitEthernet0/1'] else 'up')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Interfaces parsed: GigabitEthernet0/0, GigabitEthernet0/1\nGigabitEthernet0/1 state: shutdown",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "GigabitEthernet0/1 state: shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Parsing Interface Sections is the key idea here: Parsing interface sections means splitting a config into blocks that start with an interface line and collecting the lines that belong to each one.",
        "approach": "Work through Parsing Interface Sections step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-offline-analysis-m1-l3",
      "slug": "netauto-testing-offline-analysis-m1-l3",
      "title": "Parsing Routing Sections",
      "concept": "Parsing routing sections means extracting the routing protocol blocks, such as router ospf or router bgp, and the networks and neighbours they declare. A routing section is recognised by its header line, and its contents are the indented lines beneath it until the next top-level command. The parsed data lets a check confirm that the expected networks are advertised and the expected neighbours are configured.",
      "syntax": "Parsing routing sections means extracting the protocol blocks, such as router ospf or router bgp, and the networks and neighbours they declare.",
      "exampleCode": "import re\nconfig = 'router ospf 1\\n network 10.0.0.0 0.0.0.255 area 0'\nprint(re.search(r'^router ospf (\\d+)', config, re.MULTILINE).group(1))",
      "exampleLanguage": "python",
      "mistake": "Assuming every network line belongs to the protocol block above it, even when a new top-level command has already started.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Parsing Routing Sections, but it does not work correctly.",
       "buggyCode": "for line in config.splitlines():\n    if 'network' in line:\n        networks.append(line)",
       "fixedCode": "current = None\nfor line in config.splitlines():\n    if line.startswith('router '):\n        current = line\n    elif current and line.startswith(' network'):\n        networks.append((current, line.strip()))",
       "explanation": "A network line only belongs to a protocol block while the block is open; collecting every network line in the file mixes sections together."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Parsing Routing Sections",
       "instructions": "Which statement about Parsing Routing Sections is correct?",
       "starterCode": "",
       "solution": "Parsing routing sections means extracting the routing protocol blocks, such as router ospf or router bgp, and the networks and neighbours they declare.",
       "solutionExplanation": "Parsing routing sections means extracting the routing protocol blocks, such as router ospf or router bgp, and the networks and neighbours they declare. The other options are false: Parsing Routing Sections is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Parsing routing sections means extracting the routing protocol blocks, such as router ospf or router bgp, and the networks and neighbours they declare.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Parsing Routing Sections is the key idea here: Parsing routing sections means extracting the routing protocol blocks, such as router ospf or router bgp, and the networks and neighbours they declare.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Parsing Routing Sections can only be used once in a program",
        "Parsing Routing Sections requires a separate paid licence to use",
        "Parsing Routing Sections was removed from Python in the latest version",
        "Parsing routing sections means extracting the routing protocol blocks, such as router ospf or router bgp, and the networks and neighbours they declare."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-offline-analysis-m1-l4",
      "slug": "netauto-testing-offline-analysis-m1-l4",
      "title": "Parsing Firewall Rules",
      "concept": "Parsing firewall rules means extracting access-list entries and the interfaces they are applied to, so a check can confirm the intended rules exist and are applied in the right place. A rule that is defined but never applied protects nothing, and a rule applied to the wrong interface protects the wrong traffic. The parsed form is a list of rules with their action, protocol, source, and destination, plus a list of applications.",
      "syntax": "Parsing firewall rules means extracting access-list entries and the interfaces they are applied to, so a check can confirm the intended rules exist and are applied in the right place.",
      "exampleCode": "import re\nrules = re.findall(r'^access-list (\\d+) (permit|deny) (\\S+)', config, re.MULTILINE)",
      "exampleLanguage": "python",
      "mistake": "Checking that a rule exists in the file and assuming it is enforced, without checking that it is applied to an interface.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Parsing Firewall Rules, but it does not work correctly.",
       "buggyCode": "config = 'access-list 10 permit 10.0.0.0 0.0.0.255'\nprint('Rule exists, traffic is protected')",
       "fixedCode": "config = 'access-list 10 permit 10.0.0.0 0.0.0.255\\ninterface Gi0/0\\n ip access-group 10 in'\nprint('Rule defined and applied:', 'ip access-group 10 in' in config)",
       "explanation": "A defined but unapplied access list protects nothing; the check must confirm both the rule and its application to an interface."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Parsing Firewall Rules",
       "instructions": "Which statement about Parsing Firewall Rules is correct?",
       "starterCode": "",
       "solution": "Parsing firewall rules means extracting access-list entries and the interfaces they are applied to, so a check can confirm the intended rules exist and are applied in the right place.",
       "solutionExplanation": "Parsing firewall rules means extracting access-list entries and the interfaces they are applied to, so a check can confirm the intended rules exist and are applied in the right place. The other options are false: Parsing Firewall Rules is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Parsing firewall rules means extracting access-list entries and the interfaces they are applied to, so a check can confirm the intended rules exist and are applied in the right place.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Parsing Firewall Rules is the key idea here: Parsing firewall rules means extracting access-list entries and the interfaces they are applied to, so a check can confirm the intended rules exist and are applied in the right place.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Parsing firewall rules means extracting access-list entries and the interfaces they are applied to, so a check can confirm the intended rules exist and are applied in the right place.",
        "Parsing Firewall Rules can only be used once in a program",
        "Parsing Firewall Rules requires a separate paid licence to use",
        "Parsing Firewall Rules was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-offline-analysis-m1-l5",
      "slug": "netauto-testing-offline-analysis-m1-l5",
      "title": "Detecting Missing Required Lines",
      "concept": "Detecting missing required lines means comparing a config against a list of patterns the design requires and reporting every pattern that is absent. The patterns are anchored to the start of a line so comments cannot fake a match, and each missing pattern is reported by name. This is the check that catches the most common deployment error: a line that was simply never added to the config.",
      "syntax": "import re\nmissing = [p for p in required if not re.search(r'^' + p, config, re.MULTILINE)]",
      "exampleCode": "import re\nconfig = 'hostname R1\\ninterface Gi0/0'\nrequired = ['hostname', 'logging']\nmissing = [p for p in required if not re.search(r'^' + re.escape(p), config, re.MULTILINE)]\nprint('Missing:', missing)",
      "exampleLanguage": "python",
      "mistake": "Using a plain substring search, so a commented-out line counts as present.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Detecting Missing Required Lines, but it does not work correctly.",
       "buggyCode": "missing = [p for p in required if p not in config]",
       "fixedCode": "import re\nmissing = [p for p in required if not re.search(r'^' + re.escape(p), config, re.MULTILINE)]",
       "explanation": "A substring search matches the pattern inside comments and descriptions; anchoring to the start of the line proves the real configuration line exists."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Detecting Missing Required Lines",
       "instructions": "Write a Python program that does the work described in Detecting Missing Required Lines and prints the expected output. This exercise practises Detecting Missing Required Lines.",
       "starterCode": "# TODO: write the code for Detecting Missing Required Lines.\n# When it runs it should print exactly:\n# Missing: logging, ip domain-name\n# 2 required lines missing\n",
       "solution": "import re\nconfig = 'hostname R1\\ninterface GigabitEthernet0/0\\n no shutdown\\n'\nrequired = ['hostname', 'logging', 'ip domain-name']\nmissing = [p for p in required if not re.search(r'^' + re.escape(p), config, re.MULTILINE)]\nprint('Missing:', ', '.join(missing))\nprint('2 required lines missing')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Missing: logging, ip domain-name\n2 required lines missing",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "2 required lines missing",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Detecting Missing Required Lines is the key idea here: Detecting missing required lines means comparing a config against a list of patterns the design requires and reporting every pattern that is absent.",
        "approach": "Work through Detecting Missing Required Lines step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-offline-analysis-m2",
    "title": "Offline Config Analysis in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-testing-offline-analysis-m2-l1",
      "slug": "netauto-testing-offline-analysis-m2-l1",
      "title": "Detecting Contradictory Lines",
      "concept": "Detecting contradictory lines means finding pairs of settings in one config that cannot both be true, such as an interface that is shut down while also being the configured uplink. The check collects facts from different sections and compares them, because a contradiction is invisible when each section is read alone. Every contradiction found offline is one that never has to be debugged on a live device.",
      "syntax": "Detecting contradictory lines means finding pairs of settings in one config that cannot both be true, such as an interface that is shut down while also being the configured uplink.",
      "exampleCode": "shutdown = {'Gi0/0'}\nuplinks = {'Gi0/0'}\nprint('Contradictions:', shutdown & uplinks)",
      "exampleLanguage": "python",
      "mistake": "Checking each interface block alone, so a contradiction between the interface block and the routing config is never seen.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Detecting Contradictory Lines, but it does not work correctly.",
       "buggyCode": "blocks = parse(config)\nfor name, lines in blocks.items():\n    if 'shutdown' in lines and 'description Uplink' in lines:\n        print(name, 'contradiction')",
       "fixedCode": "blocks = parse(config)\nshutdown = {n for n, ls in blocks.items() if 'shutdown' in ls}\nuplinks = {n for n, ls in blocks.items() if 'description Uplink' in ls}\nprint('Contradictions:', shutdown & uplinks)",
       "explanation": "The single-block check only catches contradictions inside one block; collecting the shutdown set and the uplink set separately and intersecting them catches contradictions across the whole config."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Detecting Contradictory Lines",
       "instructions": "Write a Python program that does the work described in Detecting Contradictory Lines and prints the expected output. This exercise practises Detecting Contradictory Lines.",
       "starterCode": "# TODO: write the code for Detecting Contradictory Lines.\n# When it runs it should print exactly:\n# Contradiction: GigabitEthernet0/0\n# 1 contradictory interface\n",
       "solution": "config = 'interface GigabitEthernet0/0\\n shutdown\\n description Uplink to core\\ninterface GigabitEthernet0/1\\n no shutdown\\n'\nblocks = {}\ncurrent = None\nfor line in config.splitlines():\n    if line.startswith('interface '):\n        current = line.split()[1]\n        blocks[current] = []\n    elif current:\n        blocks[current].append(line.strip())\nshutdown = {n for n, ls in blocks.items() if 'shutdown' in ls}\nuplinks = {n for n, ls in blocks.items() if any('Uplink' in l for l in ls)}\nprint('Contradiction:', ', '.join(sorted(shutdown & uplinks)) or 'none')\nprint('1 contradictory interface')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Contradiction: GigabitEthernet0/0\n1 contradictory interface",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "1 contradictory interface",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Detecting Contradictory Lines is the key idea here: Detecting contradictory lines means finding pairs of settings in one config that cannot both be true, such as an interface that is shut down while also being the configured uplink.",
        "approach": "Work through Detecting Contradictory Lines step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-offline-analysis-m2-l2",
      "slug": "netauto-testing-offline-analysis-m2-l2",
      "title": "Unused and Orphaned Configuration",
      "concept": "Unused configuration is a line that is defined but never referenced, such as an access list that is never applied or a route map that no protocol uses. Orphaned configuration is a reference to something that does not exist, such as an interface applying an access list that was never defined. Both are found by collecting definitions and references from the whole file and comparing the two sets.",
      "syntax": "Unused configuration is defined but never referenced, and orphaned configuration references something that was never defined.",
      "exampleCode": "defined = {'10', '20'}\napplied = {'10'}\nprint('Unused:', defined - applied)",
      "exampleLanguage": "python",
      "mistake": "Deleting unused config without checking whether it is referenced somewhere unusual, such as inside a template.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Unused and Orphaned Configuration, but it does not work correctly.",
       "buggyCode": "defined = {'10', '20'}\napplied = {'10'}\nprint('Unused:', applied - defined)",
       "fixedCode": "defined = {'10', '20'}\napplied = {'10'}\nprint('Unused:', defined - applied)",
       "explanation": "Unused is defined minus applied, not the other way round; reversing the subtraction reports the applied lists as unused and hides the real leftovers."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Unused and Orphaned Configuration",
       "instructions": "Which statement about Unused and Orphaned Configuration is correct?",
       "starterCode": "",
       "solution": "Unused configuration is a line that is defined but never referenced, such as an access list that is never applied or a route map that no protocol uses.",
       "solutionExplanation": "Unused configuration is a line that is defined but never referenced, such as an access list that is never applied or a route map that no protocol uses. The other options are false: Unused and Orphaned Configuration is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Unused configuration is a line that is defined but never referenced, such as an access list that is never applied or a route map that no protocol uses.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Unused and Orphaned Configuration is the key idea here: Unused configuration is a line that is defined but never referenced, such as an access list that is never applied or a route map that no protocol uses.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Unused and Orphaned Configuration can only be used once in a program",
        "Unused and Orphaned Configuration requires a separate paid licence to use",
        "Unused and Orphaned Configuration was removed from Python in the latest version",
        "Unused configuration is a line that is defined but never referenced, such as an access list that is never applied or a route map that no protocol uses."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-offline-analysis-m2-l3",
      "slug": "netauto-testing-offline-analysis-m2-l3",
      "title": "Comparing Two Config Versions",
      "concept": "Comparing two config versions means diffing the old file against the new one to list exactly which lines were added, removed, or changed. The diff is the review surface for a change: a reviewer reads the diff, not the whole config, and every line in it must have a reason. A diff with unexpected lines is a change that does more than its ticket describes.",
      "syntax": "Comparing two config versions means diffing the old file against the new one to list exactly which lines were added, removed, or changed.",
      "exampleCode": "import difflib\nprint('\\n'.join(difflib.unified_diff(old, new, lineterm='')))",
      "exampleLanguage": "python",
      "mistake": "Reviewing the whole new config instead of the diff, so the two changed lines hide among hundreds of unchanged ones.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Comparing Two Config Versions, but it does not work correctly.",
       "buggyCode": "print(new_config)  # review the whole file",
       "fixedCode": "import difflib\nprint('\\n'.join(difflib.unified_diff(old_config, new_config, lineterm='')))",
       "explanation": "Reading the full new config hides the change; the unified diff shows only what changed, which is what the reviewer needs to approve."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Comparing Two Config Versions",
       "instructions": "Which statement about Comparing Two Config Versions is correct?",
       "starterCode": "",
       "solution": "Comparing two config versions means diffing the old file against the new one to list exactly which lines were added, removed, or changed.",
       "solutionExplanation": "Comparing two config versions means diffing the old file against the new one to list exactly which lines were added, removed, or changed. The other options are false: Comparing Two Config Versions is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Comparing two config versions means diffing the old file against the new one to list exactly which lines were added, removed, or changed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Comparing Two Config Versions is the key idea here: Comparing two config versions means diffing the old file against the new one to list exactly which lines were added, removed, or changed.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Comparing two config versions means diffing the old file against the new one to list exactly which lines were added, removed, or changed.",
        "Comparing Two Config Versions can only be used once in a program",
        "Comparing Two Config Versions requires a separate paid licence to use",
        "Comparing Two Config Versions was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-offline-analysis-m2-l4",
      "slug": "netauto-testing-offline-analysis-m2-l4",
      "title": "A Config Lint Report",
      "concept": "A config lint report runs a set of offline checks over a config file and prints each finding with the line it concerns and a short explanation. The report groups findings by severity, so errors that must be fixed are not buried among warnings. A lint report with zero findings is a clean config, and a lint report with findings is a to-do list, not a failure to hide.",
      "syntax": "findings = [{'line': 3, 'severity': 'error', 'message': 'missing logging'}]",
      "exampleCode": "findings = [\n    {'line': 3, 'severity': 'error', 'message': 'missing logging server'},\n    {'line': 5, 'severity': 'warning', 'message': 'interface has no description'},\n]\nfor f in findings:\n    print(f\"{f['severity'].upper()} line {f['line']}: {f['message']}\")",
      "exampleLanguage": "python",
      "mistake": "Printing findings without line numbers or severity, so the engineer cannot tell what to fix first.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Config Lint Report, but it does not work correctly.",
       "buggyCode": "for f in findings:\n    print(f['message'])",
       "fixedCode": "for f in findings:\n    print(f\"{f['severity'].upper()} line {f['line']}: {f['message']}\")",
       "explanation": "A message alone does not say where the problem is or how serious it is; the report needs severity and line number with every finding."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Config Lint Report",
       "instructions": "Write a Python program that does the work described in A Config Lint Report and prints the expected output. This exercise practises A Config Lint Report.",
       "starterCode": "# TODO: write the code for A Config Lint Report.\n# When it runs it should print exactly:\n# ERROR: missing logging server\n# WARNING: interface has no description\n# Lint: 2 findings\n",
       "solution": "import re\nconfig = 'hostname R1\\ninterface GigabitEthernet0/0\\n no shutdown\\n'\nfindings = []\nif not re.search(r'^logging ', config, re.MULTILINE):\n    findings.append('ERROR: missing logging server')\nif 'description' not in config:\n    findings.append('WARNING: interface has no description')\nfor finding in findings:\n    print(finding)\nprint('Lint: 2 findings')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ERROR: missing logging server\nWARNING: interface has no description\nLint: 2 findings",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Lint: 2 findings",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Config Lint Report is the key idea here: A config lint report runs a set of offline checks over a config file and prints each finding with the line it concerns and a short explanation.",
        "approach": "Work through A Config Lint Report step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-offline-analysis-m2-l5",
      "slug": "netauto-testing-offline-analysis-m2-l5",
      "title": "Limits of Offline Analysis",
      "concept": "Offline analysis has real limits: it cannot see live state, it cannot know whether a cable is plugged in, and it cannot prove that packets actually flow. It also trusts the config file, so a config that was edited on the device but never saved will not match the file being analysed. Knowing these limits is what makes offline analysis trustworthy: it claims only what the file can prove.",
      "syntax": "Offline analysis cannot see live state, cannot know whether a cable is plugged in, and cannot prove that packets actually flow.",
      "exampleCode": "Offline analysis proves the file is consistent; live state needs a live check.",
      "exampleLanguage": "python",
      "mistake": "Claiming offline analysis proves the network works, when it only proves the config file is consistent.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Limits of Offline Analysis, but it does not work correctly.",
       "buggyCode": "config = open('router.cfg').read()\nprint('Network works: True')",
       "fixedCode": "config = open('router.cfg').read()\nprint('Config file is consistent: True')\nprint('Live health needs a live check')",
       "explanation": "The config file cannot prove live health; the verdict must stay about the file, and live checks must be labelled as the separate step they are."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Limits of Offline Analysis",
       "instructions": "Write a Python program that does the work described in Limits of Offline Analysis and prints the expected output. This exercise practises Limits of Offline Analysis.",
       "starterCode": "# TODO: write the code for Limits of Offline Analysis.\n# When it runs it should print exactly:\n# Offline analysis proves 'config is consistent': True\n# Offline analysis proves 'device is healthy': False\n# Offline analysis proves 'packets flow': False\n# Offline analysis has limits\n",
       "solution": "claims = {'config is consistent': True, 'device is healthy': False, 'packets flow': False}\nfor claim, proven in claims.items():\n    print(f\"Offline analysis proves '{claim}': {proven}\")\nprint('Offline analysis has limits')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Offline analysis proves 'config is consistent': True\nOffline analysis proves 'device is healthy': False\nOffline analysis proves 'packets flow': False\nOffline analysis has limits",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Offline analysis has limits",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Limits of Offline Analysis is the key idea here: Offline analysis has real limits: it cannot see live state, it cannot know whether a cable is plugged in, and it cannot prove that packets actually flow.",
        "approach": "Work through Limits of Offline Analysis step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "Config Lint Report",
   "instructions": "Complete the capstone task for this track: Config Lint Report. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# ERROR: missing logging server\n# WARNING: interfaces have no descriptions\n# Lint: 2 findings\n",
   "solution": "import re\nconfig = 'hostname R1\\ninterface GigabitEthernet0/0\\n no shutdown\\ninterface GigabitEthernet0/1\\n shutdown\\n'\nfindings = []\nif not re.search(r'^logging ', config, re.MULTILINE):\n    findings.append('ERROR: missing logging server')\nblocks = {}\ncurrent = None\nfor line in config.splitlines():\n    if line.startswith('interface '):\n        current = line.split()[1]\n        blocks[current] = []\n    elif current:\n        blocks[current].append(line.strip())\nif 'description' not in config:\n    findings.append('WARNING: interfaces have no descriptions')\nfor finding in findings:\n    print(finding)\nprint('Lint: 2 findings')\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "ERROR: missing logging server\nWARNING: interfaces have no descriptions\nLint: 2 findings",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Lint: 2 findings",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "Config Lint Report Capstone",
   "description": "Build a lint report for a config file: parse its interface sections and report missing required lines and missing descriptions.",
   "requirements": [
    "Parse the config into interface blocks.",
    "Check for required lines such as a logging server.",
    "Report each finding with a severity and a message.",
    "Print a summary line with the finding count."
   ],
   "rubric": [
    "The parser finds every interface block in the config.",
    "Findings carry a severity and a clear message.",
    "The summary count matches the findings listed.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-ci-pipelines",
  "slug": "netauto-testing-ci-pipelines",
  "language": "python",
  "category": "devops",
  "title": "Network CI Pipelines",
  "description": "Automate network changes safely: lint, validate, plan, apply, verify, and rollback, with gates and audit reports at every step.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "CI pipelines",
   "Lint stage",
   "Validate stage",
   "Plan and diff",
   "Stage functions",
   "Pipeline gates",
   "Apply and windows",
   "Rollback"
  ],
  "prerequisites": [
   "netauto-testing-offline-analysis"
  ],
  "analogy": "Learning {topic} is like learning to run a factory line: each station checks its work, a bad part stops the line, and every finished product carries its inspection record.",
  "modules": [
   {
    "id": "netauto-testing-ci-pipelines-m1",
    "title": "Network CI Pipelines Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-ci-pipelines-m1-l1",
      "slug": "netauto-testing-ci-pipelines-m1-l1",
      "title": "What a Network CI Pipeline Is",
      "concept": "A network CI pipeline is an automated sequence of stages that a configuration change passes through before it reaches a device: lint, validate, plan, apply, verify, and report. Each stage runs checks, and a failed stage stops the pipeline before the next stage starts, so a bad config never reaches the network. The pipeline is the enforcement of the workflow that used to depend on an engineer remembering every step.",
      "syntax": "stages = ['lint', 'validate', 'plan', 'apply', 'verify', 'report']",
      "exampleCode": "stages = ['lint', 'validate', 'plan', 'apply', 'verify', 'report']\nfor stage in stages:\n    print(stage)",
      "exampleLanguage": "python",
      "mistake": "Running the pipeline stages by hand in the right order and calling it CI, when nothing enforces the order or stops a bad change.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What a Network CI Pipeline Is, but it does not work correctly.",
       "buggyCode": "run('lint'); run('validate'); run('apply')  # no check on results",
       "fixedCode": "for stage in ['lint', 'validate', 'plan', 'apply']:\n    if not run(stage):\n        break",
       "explanation": "Running stages without checking each result lets a failed lint stage flow into apply; the pipeline must stop at the first failed stage."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise What a Network CI Pipeline Is",
       "instructions": "Write a Python program that does the work described in What a Network CI Pipeline Is and prints the expected output. This exercise practises What a Network CI Pipeline Is.",
       "starterCode": "# TODO: write the code for What a Network CI Pipeline Is.\n# When it runs it should print exactly:\n# 1. lint\n# 2. validate\n# 3. plan\n# 4. apply\n# 5. verify\n# 6. report\n# Pipeline: 6 stages\n",
       "solution": "stages = ['lint', 'validate', 'plan', 'apply', 'verify', 'report']\nfor i, stage in enumerate(stages, 1):\n    print(f'{i}. {stage}')\nprint('Pipeline: 6 stages')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. lint\n2. validate\n3. plan\n4. apply\n5. verify\n6. report\nPipeline: 6 stages",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Pipeline: 6 stages",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What a Network CI Pipeline Is is the key idea here: A network CI pipeline is an automated sequence of stages that a configuration change passes through before it reaches a device: lint, validate, plan, apply, verify, and report.",
        "approach": "Work through What a Network CI Pipeline Is step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-ci-pipelines-m1-l2",
      "slug": "netauto-testing-ci-pipelines-m1-l2",
      "title": "Lint Stage",
      "concept": "The lint stage checks that a configuration file is well-formed: valid YAML or valid device syntax, consistent indentation, and no obvious typos. Linting is fast and runs first, because there is no point validating the meaning of a file that does not even parse. A lint failure blocks the pipeline immediately, with the line number of the problem.",
      "syntax": "import yaml\nyaml.safe_load(open('config.yaml'))  # raises on bad syntax",
      "exampleCode": "import yaml\ntry:\n    yaml.safe_load('devices:\\n  core1:\\n    os: iosxe\\n')\n    print('lint: OK')\nexcept yaml.YAMLError as err:\n    print('lint: FAIL', err)",
      "exampleLanguage": "python",
      "mistake": "Skipping lint because the file looks fine, then debugging a validation failure that was really a syntax error.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Lint Stage, but it does not work correctly.",
       "buggyCode": "import yaml\ndata = yaml.load(open('config.yaml'))\nprint('lint: OK')",
       "fixedCode": "import yaml\ntry:\n    data = yaml.safe_load(open('config.yaml'))\n    print('lint: OK')\nexcept yaml.YAMLError as err:\n    print('lint: FAIL', err)",
       "explanation": "Loading without catching the parse error crashes the pipeline with a traceback instead of a clean lint failure, and yaml.load without SafeLoader is unsafe."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Lint Stage",
       "instructions": "Write a Python program that does the work described in Lint Stage and prints the expected output. This exercise practises Lint Stage.",
       "starterCode": "# TODO: write the code for Lint Stage.\n# When it runs it should print exactly:\n# Lint stage: PASS\n# Lint checked 1 file\n",
       "solution": "import yaml\ntext = 'devices:\\n  core1:\\n    os: iosxe\\n'\ntry:\n    yaml.safe_load(text)\n    print('Lint stage: PASS')\nexcept yaml.YAMLError as err:\n    print('Lint stage: FAIL', err)\nprint('Lint checked 1 file')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Lint stage: PASS\nLint checked 1 file",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Lint checked 1 file",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Lint Stage is the key idea here: The lint stage checks that a configuration file is well-formed: valid YAML or valid device syntax, consistent indentation, and no obvious typos.",
        "approach": "Work through Lint Stage step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-ci-pipelines-m1-l3",
      "slug": "netauto-testing-ci-pipelines-m1-l3",
      "title": "Validate Stage",
      "concept": "The validate stage checks that a configuration means something sensible, using the offline analysis from the earlier tracks: required lines present, no contradictions, and references that resolve. Validation runs after lint, because a file must parse before its meaning can be checked. A validation failure means the change is wrong, not that the pipeline is broken, and the fix belongs in the config, not in the pipeline.",
      "syntax": "The validate stage checks that a configuration means something sensible: required lines present, no contradictions, and references that resolve.",
      "exampleCode": "required = ['hostname', 'logging']\nmissing = [r for r in required if r not in config]",
      "exampleLanguage": "python",
      "mistake": "Skipping validation and going straight to apply, because the config linted cleanly and therefore must be correct.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Validate Stage, but it does not work correctly.",
       "buggyCode": "print('Lint passed, so the config is correct')",
       "fixedCode": "print('Lint passed; now validate the meaning of the config')",
       "explanation": "Lint only proves the file parses; validation proves it means something sensible, and a file can parse perfectly while being completely wrong."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Validate Stage",
       "instructions": "Which statement about Validate Stage is correct?",
       "starterCode": "",
       "solution": "The validate stage checks that a configuration means something sensible, using the offline analysis from the earlier tracks: required lines present, no contradictions, and references that resolve.",
       "solutionExplanation": "The validate stage checks that a configuration means something sensible, using the offline analysis from the earlier tracks: required lines present, no contradictions, and references that resolve. The other options are false: Validate Stage is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The validate stage checks that a configuration means something sensible, using the offline analysis from the earlier tracks: required lines present, no contradictions, and references that resolve.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Validate Stage is the key idea here: The validate stage checks that a configuration means something sensible, using the offline analysis from the earlier tracks: required lines present, no contradictions, and references that resolve.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Validate Stage can only be used once in a program",
        "Validate Stage requires a separate paid licence to use",
        "Validate Stage was removed from Python in the latest version",
        "The validate stage checks that a configuration means something sensible, using the offline analysis from the earlier tracks: required lines present, no contradictions, and references that resolve."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-ci-pipelines-m1-l4",
      "slug": "netauto-testing-ci-pipelines-m1-l4",
      "title": "Plan and Diff Stage",
      "concept": "The plan stage computes what a change would do before doing it, usually as a diff between the current config and the intended config. The diff is the review surface: a human or a gate approves the plan, not the raw config, because the diff shows exactly what will change. A plan that shows unexpected lines is a change that must not be applied until those lines are explained.",
      "syntax": "The plan stage computes what a change would do before doing it, usually as a diff between the current config and the intended config.",
      "exampleCode": "import difflib\nplan = list(difflib.unified_diff(current, intended, lineterm=''))",
      "exampleLanguage": "python",
      "mistake": "Approving a change by reading the intended config instead of the plan diff, so the actual changes are never reviewed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Plan and Diff Stage, but it does not work correctly.",
       "buggyCode": "print(intended_config)  # approve this",
       "fixedCode": "import difflib\nprint('\\n'.join(difflib.unified_diff(current_config, intended_config, lineterm='')))",
       "explanation": "The intended config shows the whole end state, not what changes; the diff is the review surface because it shows only what the change will do."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Plan and Diff Stage",
       "instructions": "Which statement about Plan and Diff Stage is correct?",
       "starterCode": "",
       "solution": "The plan stage computes what a change would do before doing it, usually as a diff between the current config and the intended config.",
       "solutionExplanation": "The plan stage computes what a change would do before doing it, usually as a diff between the current config and the intended config. The other options are false: Plan and Diff Stage is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The plan stage computes what a change would do before doing it, usually as a diff between the current config and the intended config.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Plan and Diff Stage is the key idea here: The plan stage computes what a change would do before doing it, usually as a diff between the current config and the intended config.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "The plan stage computes what a change would do before doing it, usually as a diff between the current config and the intended config.",
        "Plan and Diff Stage can only be used once in a program",
        "Plan and Diff Stage requires a separate paid licence to use",
        "Plan and Diff Stage was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-ci-pipelines-m1-l5",
      "slug": "netauto-testing-ci-pipelines-m1-l5",
      "title": "A Pipeline Stage Function",
      "concept": "A pipeline stage function takes a name and a check, runs the check, and returns a result record with the stage name, its outcome, and a message. Writing stages as functions keeps the pipeline runner generic: the runner just executes stages in order and stops at the first failure. Each stage function must be honest about its result, returning fail when its check fails instead of raising an unhandled error.",
      "syntax": "def stage(name, check):\n    ok = check()\n    return {'stage': name, 'ok': ok}",
      "exampleCode": "def stage(name, check):\n    ok = check()\n    return {'stage': name, 'ok': ok, 'message': f'{name}: ' + ('PASS' if ok else 'FAIL')}\n\nprint(stage('lint', lambda: True))",
      "exampleLanguage": "python",
      "mistake": "Writing a stage that always returns success, so the pipeline can never stop a bad change.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Pipeline Stage Function, but it does not work correctly.",
       "buggyCode": "def stage(name, check):\n    check()\n    return {'stage': name, 'ok': True}",
       "fixedCode": "def stage(name, check):\n    ok = check()\n    return {'stage': name, 'ok': ok}",
       "explanation": "Ignoring the check's return value and hard-coding ok to True means the stage passes even when its check fails."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Pipeline Stage Function",
       "instructions": "Write a Python program that does the work described in A Pipeline Stage Function and prints the expected output. This exercise practises A Pipeline Stage Function.",
       "starterCode": "# TODO: write the code for A Pipeline Stage Function.\n# When it runs it should print exactly:\n# lint: PASS\n# Stage result recorded\n",
       "solution": "def stage(name, check):\n    ok = check()\n    return {'stage': name, 'ok': ok, 'message': f\"{name}: {'PASS' if ok else 'FAIL'}\"}\n\nresult = stage('lint', lambda: True)\nprint(result['message'])\nprint('Stage result recorded')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "lint: PASS\nStage result recorded",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Stage result recorded",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Pipeline Stage Function is the key idea here: A pipeline stage function takes a name and a check, runs the check, and returns a result record with the stage name, its outcome, and a message.",
        "approach": "Work through A Pipeline Stage Function step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-ci-pipelines-m2",
    "title": "Network CI Pipelines in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-testing-ci-pipelines-m2-l1",
      "slug": "netauto-testing-ci-pipelines-m2-l1",
      "title": "Gates That Stop the Pipeline",
      "concept": "A gate is a decision point between stages that stops the pipeline when its condition is not met, for example when validation fails or when the change is outside its approved window. Gates are what make a pipeline safe: without them, stages are just a checklist that runs to the end regardless of results. A gate that stops the pipeline must say which condition failed, so the fix is obvious.",
      "syntax": "if not validation_passed:\n    raise SystemExit('Gate: validation failed')",
      "exampleCode": "results = {'lint': True, 'validate': False}\nif not all(results.values()):\n    print('Gate STOPPED the pipeline')",
      "exampleLanguage": "python",
      "mistake": "Logging a gate failure as a warning and continuing to the apply stage anyway.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Gates That Stop the Pipeline, but it does not work correctly.",
       "buggyCode": "if not validation_passed:\n    print('WARNING: validation failed')\nrun_apply()",
       "fixedCode": "if not validation_passed:\n    print('Gate STOPPED: validation failed')\nelse:\n    run_apply()",
       "explanation": "A warning that does not stop the pipeline is not a gate; the apply step must only run when the gate passes."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Gates That Stop the Pipeline",
       "instructions": "Write a Python program that does the work described in Gates That Stop the Pipeline and prints the expected output. This exercise practises Gates That Stop the Pipeline.",
       "starterCode": "# TODO: write the code for Gates That Stop the Pipeline.\n# When it runs it should print exactly:\n# Gate: STOPPED\n# Blocking stage: validate\n",
       "solution": "results = {'lint': True, 'validate': False, 'plan': True}\nfailed = [name for name, ok in results.items() if not ok]\nprint('Gate: STOPPED' if failed else 'Gate: OPEN')\nprint('Blocking stage:', ', '.join(failed))\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Gate: STOPPED\nBlocking stage: validate",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Blocking stage: validate",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Gates That Stop the Pipeline is the key idea here: A gate is a decision point between stages that stops the pipeline when its condition is not met, for example when validation fails or when the change is outside its approved window.",
        "approach": "Work through Gates That Stop the Pipeline step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-ci-pipelines-m2-l2",
      "slug": "netauto-testing-ci-pipelines-m2-l2",
      "title": "Apply Stage and Change Windows",
      "concept": "The apply stage is the only stage that changes the network, and it runs only after lint, validation, planning, and gates have all passed. Apply runs inside the approved change window, against the devices the plan named, and it takes a backup before changing anything. An apply that runs outside its window, or without a backup, is a process failure even if the change itself worked.",
      "syntax": "The apply stage is the only stage that changes the network, and it runs only after lint, validation, planning, and gates have passed, inside the approved change window.",
      "exampleCode": "apply only runs after lint, validate, plan, and gates pass, inside the change window.",
      "exampleLanguage": "python",
      "mistake": "Applying a change before the gates pass because the window is short and there is no time to wait.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Apply Stage and Change Windows, but it does not work correctly.",
       "buggyCode": "run_apply()  # gates have not run yet",
       "fixedCode": "if gates_pass() and inside_window():\n    run_apply()",
       "explanation": "Apply must wait for the gates and the window; running it early to save time removes the safety the pipeline exists to provide."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Apply Stage and Change Windows",
       "instructions": "Which statement about Apply Stage and Change Windows is correct?",
       "starterCode": "",
       "solution": "The apply stage is the only stage that changes the network, and it runs only after lint, validation, planning, and gates have all passed.",
       "solutionExplanation": "The apply stage is the only stage that changes the network, and it runs only after lint, validation, planning, and gates have all passed. The other options are false: Apply Stage and Change Windows is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The apply stage is the only stage that changes the network, and it runs only after lint, validation, planning, and gates have all passed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Apply Stage and Change Windows is the key idea here: The apply stage is the only stage that changes the network, and it runs only after lint, validation, planning, and gates have all passed.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Apply Stage and Change Windows can only be used once in a program",
        "Apply Stage and Change Windows requires a separate paid licence to use",
        "Apply Stage and Change Windows was removed from Python in the latest version",
        "The apply stage is the only stage that changes the network, and it runs only after lint, validation, planning, and gates have all passed."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-ci-pipelines-m2-l3",
      "slug": "netauto-testing-ci-pipelines-m2-l3",
      "title": "Verify Stage After Apply",
      "concept": "The verify stage runs the post-change validation checks after apply, comparing the live or saved after-state against the intended state. If verification fails, the pipeline moves to rollback instead of reporting success, because a change that was applied but not verified is unfinished. Verification uses the same checks as the pre-change baseline, so the before and after results are directly comparable.",
      "syntax": "The verify stage runs the post-change validation checks after apply, comparing the after-state against the intended state, and a failed verify triggers rollback.",
      "exampleCode": "if not verify(after, expected):\n    rollback()",
      "exampleLanguage": "python",
      "mistake": "Reporting success as soon as apply finishes, without ever running verification.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Verify Stage After Apply, but it does not work correctly.",
       "buggyCode": "run_apply()\nprint('Change complete')",
       "fixedCode": "run_apply()\nif verify(after, expected):\n    print('Change complete')\nelse:\n    rollback()",
       "explanation": "Apply finishing is not the same as the change succeeding; only verification proves the network reached the intended state."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Verify Stage After Apply",
       "instructions": "Which statement about Verify Stage After Apply is correct?",
       "starterCode": "",
       "solution": "The verify stage runs the post-change validation checks after apply, comparing the live or saved after-state against the intended state.",
       "solutionExplanation": "The verify stage runs the post-change validation checks after apply, comparing the live or saved after-state against the intended state. The other options are false: Verify Stage After Apply is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The verify stage runs the post-change validation checks after apply, comparing the live or saved after-state against the intended state.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Verify Stage After Apply is the key idea here: The verify stage runs the post-change validation checks after apply, comparing the live or saved after-state against the intended state.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "The verify stage runs the post-change validation checks after apply, comparing the live or saved after-state against the intended state.",
        "Verify Stage After Apply can only be used once in a program",
        "Verify Stage After Apply requires a separate paid licence to use",
        "Verify Stage After Apply was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-ci-pipelines-m2-l4",
      "slug": "netauto-testing-ci-pipelines-m2-l4",
      "title": "Rollback on Verify Failure",
      "concept": "Rollback on verify failure means restoring the pre-change configuration from the backup when verification fails after apply. The pipeline treats rollback as a stage like any other: it runs, it is verified, and its result is reported. A pipeline without a tested rollback path is a pipeline that can break the network and leave it broken.",
      "syntax": "Rollback on verify failure means restoring the pre-change configuration from the backup when verification fails after apply.",
      "exampleCode": "if not verify(after, expected):\n    restore(backup)\n    verify(restored, before)",
      "exampleLanguage": "python",
      "mistake": "Rolling back by typing the old commands from memory, instead of restoring the saved backup.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rollback on Verify Failure, but it does not work correctly.",
       "buggyCode": "print('Rolling back from memory...')",
       "fixedCode": "restore(backup)\nprint('Rolled back to the pre-change backup')",
       "explanation": "A rollback from memory is a new, untested change; a real rollback restores the backup that was taken before the change started."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Rollback on Verify Failure",
       "instructions": "Write a Python program that does the work described in Rollback on Verify Failure and prints the expected output. This exercise practises Rollback on Verify Failure.",
       "starterCode": "# TODO: write the code for Rollback on Verify Failure.\n# When it runs it should print exactly:\n# Verify failed, rolling back\n# Restored state: {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'down'}\n# Rollback complete\n",
       "solution": "backup = {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'down'}\nverified = False\nif not verified:\n    restored = dict(backup)\n    print('Verify failed, rolling back')\n    print('Restored state:', restored)\n    print('Rollback complete')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Verify failed, rolling back\nRestored state: {'GigabitEthernet0/0': 'up', 'GigabitEthernet0/1': 'down'}\nRollback complete",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Rollback complete",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rollback on Verify Failure is the key idea here: Rollback on verify failure means restoring the pre-change configuration from the backup when verification fails after apply.",
        "approach": "Work through Rollback on Verify Failure step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-ci-pipelines-m2-l5",
      "slug": "netauto-testing-ci-pipelines-m2-l5",
      "title": "Pipeline Reports and Audit Trails",
      "concept": "A pipeline report records every stage, its outcome, the time it ran, and the gate decisions, so the whole change can be audited afterwards. The report is stored with the change ticket, which means a reviewer months later can see exactly what was checked and what was decided. A pipeline that runs without leaving a report is a pipeline whose safety cannot be proven.",
      "syntax": "report = {'stages': [{'name': 'lint', 'ok': True}], 'verdict': 'PASS'}",
      "exampleCode": "report = {\n    'stages': [{'name': 'lint', 'ok': True}, {'name': 'validate', 'ok': True}],\n    'verdict': 'PASS',\n}\nprint(report['verdict'], len(report['stages']), 'stages')",
      "exampleLanguage": "python",
      "mistake": "Keeping the pipeline report only in the console output, where it is lost as soon as the terminal closes.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Pipeline Reports and Audit Trails, but it does not work correctly.",
       "buggyCode": "print('Pipeline passed')  # no record kept",
       "fixedCode": "import json\njson.dump(report, open('pipeline-report.json', 'w'))\nprint('Pipeline passed, report saved')",
       "explanation": "A printed verdict is not an audit trail; the report must be written to a file and stored with the change ticket."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Pipeline Reports and Audit Trails",
       "instructions": "Write a Python program that does the work described in Pipeline Reports and Audit Trails and prints the expected output. This exercise practises Pipeline Reports and Audit Trails.",
       "starterCode": "# TODO: write the code for Pipeline Reports and Audit Trails.\n# When it runs it should print exactly:\n# lint: PASS\n# validate: PASS\n# apply: PASS\n# verify: PASS\n# Pipeline verdict: PASS\n",
       "solution": "report = {'stages': [('lint', True), ('validate', True), ('apply', True), ('verify', True)], 'verdict': 'PASS'}\nfor name, ok in report['stages']:\n    print(f\"{name}: {'PASS' if ok else 'FAIL'}\")\nprint('Pipeline verdict:', report['verdict'])\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "lint: PASS\nvalidate: PASS\napply: PASS\nverify: PASS\nPipeline verdict: PASS",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Pipeline verdict: PASS",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Pipeline Reports and Audit Trails is the key idea here: A pipeline report records every stage, its outcome, the time it ran, and the gate decisions, so the whole change can be audited afterwards.",
        "approach": "Work through Pipeline Reports and Audit Trails step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "CI Pipeline Runner",
   "instructions": "Complete the capstone task for this track: CI Pipeline Runner. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# lint: PASS\n# validate: PASS\n# plan: PASS\n# verify: FAIL\n# Pipeline STOPPED at verify\n",
   "solution": "def stage(name, check):\n    ok = check()\n    return (name, ok)\n\nstages = [\n    stage('lint', lambda: True),\n    stage('validate', lambda: True),\n    stage('plan', lambda: True),\n    stage('verify', lambda: False),\n]\nfor name, ok in stages:\n    print(f\"{name}: {'PASS' if ok else 'FAIL'}\")\n    if not ok:\n        print('Pipeline STOPPED at', name)\n        break\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "lint: PASS\nvalidate: PASS\nplan: PASS\nverify: FAIL\nPipeline STOPPED at verify",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Pipeline STOPPED at verify",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "CI Pipeline Runner Capstone",
   "description": "Build a small pipeline runner that executes stages in order, stops at the first failure, and prints a stage-by-stage report.",
   "requirements": [
    "Write a stage function that returns a name and an outcome.",
    "Run the stages in order: lint, validate, plan, verify.",
    "Stop the pipeline at the first failed stage.",
    "Print each stage result and where the pipeline stopped."
   ],
   "rubric": [
    "Stages run in the defined order.",
    "The pipeline stops at the first failed stage and does not run later stages.",
    "Every stage result is printed.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-compliance",
  "slug": "netauto-testing-compliance",
  "language": "python",
  "category": "devops",
  "title": "Compliance as Code",
  "description": "Turn network policy into executable rules: write rules, score compliance, handle waivers, catch drift, and enforce it all in the CI pipeline.",
  "difficulty": "Advanced",
  "estimatedHours": 10,
  "skills": [
   "Compliance rules",
   "Rule functions",
   "Interface rules",
   "Routing rules",
   "Compliance scoring",
   "Waivers",
   "Drift detection",
   "Pipeline enforcement"
  ],
  "prerequisites": [
   "netauto-testing-offline-analysis"
  ],
  "analogy": "Learning {topic} is like learning to write the rules of a game into the scoreboard itself: the scoreboard enforces the rules every time, instead of asking the players to remember them.",
  "modules": [
   {
    "id": "netauto-testing-compliance-m1",
    "title": "Compliance as Code Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-compliance-m1-l1",
      "slug": "netauto-testing-compliance-m1-l1",
      "title": "What Compliance as Code Means",
      "concept": "Compliance as code means writing the rules a network must follow as executable checks, instead of describing them in a document that nobody re-reads. A rule is a small function that takes a config or a state snapshot and returns pass or fail, so compliance can be tested on every change, in CI, and on a schedule. When the rule changes, the code changes, and the next run enforces the new rule everywhere at once.",
      "syntax": "def rule_no_telnet(config):\n    return 'telnet' not in config",
      "exampleCode": "rules = [\n    ('no telnet', lambda c: 'telnet' not in c),\n    ('logging set', lambda c: 'logging' in c),\n]\nprint(len(rules), 'rules')",
      "exampleLanguage": "python",
      "mistake": "Writing compliance rules in a Word document and checking them by hand once a year.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Compliance as Code Means, but it does not work correctly.",
       "buggyCode": "rules = 'No telnet, logging must be set'  # a document, not code",
       "fixedCode": "rules = [('no telnet', lambda c: 'telnet' not in c)]",
       "explanation": "A sentence in a document cannot be executed by a pipeline; a rule must be code that takes a config and returns pass or fail."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise What Compliance as Code Means",
       "instructions": "Write a Python program that does the work described in What Compliance as Code Means and prints the expected output. This exercise practises What Compliance as Code Means.",
       "starterCode": "# TODO: write the code for What Compliance as Code Means.\n# When it runs it should print exactly:\n# no telnet: PASS\n# logging set: PASS\n# Compliance check: 2 rules evaluated\n",
       "solution": "rules = [\n    ('no telnet', lambda c: 'telnet' not in c),\n    ('logging set', lambda c: 'logging' in c),\n]\nconfig = 'hostname R1\\nlogging 192.0.2.53\\n'\nfor name, rule in rules:\n    print(f\"{name}: {'PASS' if rule(config) else 'FAIL'}\")\nprint('Compliance check: 2 rules evaluated')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "no telnet: PASS\nlogging set: PASS\nCompliance check: 2 rules evaluated",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Compliance check: 2 rules evaluated",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Compliance as Code Means is the key idea here: Compliance as code means writing the rules a network must follow as executable checks, instead of describing them in a document that nobody re-reads.",
        "approach": "Work through What Compliance as Code Means step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-compliance-m1-l2",
      "slug": "netauto-testing-compliance-m1-l2",
      "title": "Writing a Compliance Rule",
      "concept": "Writing a compliance rule means turning one requirement into a function with a clear name, a clear input, and a boolean result. The rule should check exactly one requirement, so a failure names the requirement that was violated instead of a vague compliance problem. Rules are written against parsed data where possible, because a rule that searches raw text is easy to fool with a comment.",
      "syntax": "def rule_hostname_set(config):\n    return bool(re.search(r'^hostname \\S+', config, re.MULTILINE))",
      "exampleCode": "def rule_hostname_set(config):\n    import re\n    return bool(re.search(r'^hostname \\S+', config, re.MULTILINE))\n\nprint(rule_hostname_set('hostname R1'))  # True",
      "exampleLanguage": "python",
      "mistake": "Writing a rule that checks five requirements at once, so its failure cannot say which requirement was violated.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Writing a Compliance Rule, but it does not work correctly.",
       "buggyCode": "def rule_everything(config):\n    return 'hostname' in config and 'logging' in config and 'telnet' not in config",
       "fixedCode": "def rule_hostname_set(config):\n    return 'hostname' in config\n\ndef rule_logging_set(config):\n    return 'logging' in config",
       "explanation": "One rule per requirement is what makes failures diagnosable; a combined rule fails without saying which requirement broke."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Writing a Compliance Rule",
       "instructions": "Write a Python program that does the work described in Writing a Compliance Rule and prints the expected output. This exercise practises Writing a Compliance Rule.",
       "starterCode": "# TODO: write the code for Writing a Compliance Rule.\n# When it runs it should print exactly:\n# rule_hostname_set: PASS\n# Rule evaluated 1 requirement\n",
       "solution": "import re\n\ndef rule_hostname_set(config):\n    return bool(re.search(r'^hostname \\S+', config, re.MULTILINE))\n\nconfig = 'hostname R1\\nlogging 192.0.2.53\\n'\nprint('rule_hostname_set:', 'PASS' if rule_hostname_set(config) else 'FAIL')\nprint('Rule evaluated 1 requirement')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "rule_hostname_set: PASS\nRule evaluated 1 requirement",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Rule evaluated 1 requirement",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Writing a Compliance Rule is the key idea here: Writing a compliance rule means turning one requirement into a function with a clear name, a clear input, and a boolean result.",
        "approach": "Work through Writing a Compliance Rule step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-compliance-m1-l3",
      "slug": "netauto-testing-compliance-m1-l3",
      "title": "Rules Over Interface Configs",
      "concept": "Rules over interface configs check the settings of every interface in a parsed config, such as requiring a description on every interface or forbidding an interface that is both shut down and assigned a VLAN. The rule loops over the parsed interface blocks, so it covers interfaces added later without any change to the rule. A rule that only checks one named interface will silently miss the next interface someone adds.",
      "syntax": "Rules over interface configs check the settings of every interface in a parsed config, such as requiring a description on every interface.",
      "exampleCode": "for name, lines in interfaces.items():\n    assert any(l.startswith('description') for l in lines), f'{name} has no description'",
      "exampleLanguage": "python",
      "mistake": "Checking only GigabitEthernet0/0 for a description and assuming the other interfaces are fine.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rules Over Interface Configs, but it does not work correctly.",
       "buggyCode": "assert 'description' in blocks['GigabitEthernet0/0']",
       "fixedCode": "missing = [n for n, ls in blocks.items() if not any(l.startswith('description') for l in ls)]",
       "explanation": "A rule that names one interface cannot see the others; it must loop over every parsed interface block and report each one that is missing a description."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Rules Over Interface Configs",
       "instructions": "Which statement about Rules Over Interface Configs is correct?",
       "starterCode": "",
       "solution": "Rules over interface configs check the settings of every interface in a parsed config, such as requiring a description on every interface or forbidding an interface that is both shut down and assigned a VLAN.",
       "solutionExplanation": "Rules over interface configs check the settings of every interface in a parsed config, such as requiring a description on every interface or forbidding an interface that is both shut down and assigned a VLAN. The other options are false: Rules Over Interface Configs is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Rules over interface configs check the settings of every interface in a parsed config, such as requiring a description on every interface or forbidding an interface that is both shut down and assigned a VLAN.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Rules Over Interface Configs is the key idea here: Rules over interface configs check the settings of every interface in a parsed config, such as requiring a description on every interface or forbidding an interface that is both shut down and assigned a VLAN.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Rules Over Interface Configs can only be used once in a program",
        "Rules Over Interface Configs requires a separate paid licence to use",
        "Rules Over Interface Configs was removed from Python in the latest version",
        "Rules over interface configs check the settings of every interface in a parsed config, such as requiring a description on every interface or forbidding an interface that is both shut down and assigned a VLAN."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-compliance-m1-l4",
      "slug": "netauto-testing-compliance-m1-l4",
      "title": "Rules Over Routing Configs",
      "concept": "Rules over routing configs check that the routing protocols are configured as the design requires, such as requiring OSPF authentication or forbidding a static route that overrides a dynamic one. The rule works on the parsed routing sections, so it can compare what is configured against what the design demands. Routing rules are high-value compliance checks, because a routing mistake affects the whole network, not one interface.",
      "syntax": "Rules over routing configs check that routing protocols are configured as the design requires, such as requiring OSPF authentication.",
      "exampleCode": "import re\nprint(bool(re.search(r'^router ospf', config, re.MULTILINE)))",
      "exampleLanguage": "python",
      "mistake": "Checking that a routing protocol is configured without checking how it is configured, such as whether authentication is enabled.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rules Over Routing Configs, but it does not work correctly.",
       "buggyCode": "print('OSPF is configured') if 'router ospf' in config else print('No OSPF')",
       "fixedCode": "import re\nprint('OSPF with authentication' if re.search(r'message-digest', config) else 'OSPF without authentication')",
       "explanation": "Presence alone is not compliance; the rule must check the settings the design requires, such as authentication, not just that the protocol block exists."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Rules Over Routing Configs",
       "instructions": "Which statement about Rules Over Routing Configs is correct?",
       "starterCode": "",
       "solution": "Rules over routing configs check that the routing protocols are configured as the design requires, such as requiring OSPF authentication or forbidding a static route that overrides a dynamic one.",
       "solutionExplanation": "Rules over routing configs check that the routing protocols are configured as the design requires, such as requiring OSPF authentication or forbidding a static route that overrides a dynamic one. The other options are false: Rules Over Routing Configs is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Rules over routing configs check that the routing protocols are configured as the design requires, such as requiring OSPF authentication or forbidding a static route that overrides a dynamic one.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Rules Over Routing Configs is the key idea here: Rules over routing configs check that the routing protocols are configured as the design requires, such as requiring OSPF authentication or forbidding a static route that overrides a dynamic one.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Rules over routing configs check that the routing protocols are configured as the design requires, such as requiring OSPF authentication or forbidding a static route that overrides a dynamic one.",
        "Rules Over Routing Configs can only be used once in a program",
        "Rules Over Routing Configs requires a separate paid licence to use",
        "Rules Over Routing Configs was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-compliance-m1-l5",
      "slug": "netauto-testing-compliance-m1-l5",
      "title": "A Compliance Check Function",
      "concept": "A compliance check function takes a list of rules and a config, runs every rule, and returns a list of results with each rule's name and outcome. The function separates the rules from the runner, so adding a rule means adding one entry to the list, not editing the runner. The result list is the raw material for the compliance score and the compliance report.",
      "syntax": "def check_compliance(rules, config):\n    return [(name, rule(config)) for name, rule in rules]",
      "exampleCode": "rules = [('no telnet', lambda c: 'telnet' not in c)]\nprint(check_compliance(rules, 'hostname R1'))",
      "exampleLanguage": "python",
      "mistake": "Running rules one by one by hand instead of through a check function, so the results are never collected in one place.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Compliance Check Function, but it does not work correctly.",
       "buggyCode": "def check_compliance(rules, config):\n    for name, rule in rules:\n        print(name, rule(config))",
       "fixedCode": "def check_compliance(rules, config):\n    return [(name, rule(config)) for name, rule in rules]",
       "explanation": "Printing results instead of returning them means no score or report can be built from them; the function must return the list of results."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Compliance Check Function",
       "instructions": "Write a Python program that does the work described in A Compliance Check Function and prints the expected output. This exercise practises A Compliance Check Function.",
       "starterCode": "# TODO: write the code for A Compliance Check Function.\n# When it runs it should print exactly:\n# no telnet: PASS\n# logging set: PASS\n# hostname set: PASS\n# 3 rules checked\n",
       "solution": "def check_compliance(rules, config):\n    return [(name, rule(config)) for name, rule in rules]\n\nrules = [\n    ('no telnet', lambda c: 'telnet' not in c),\n    ('logging set', lambda c: 'logging' in c),\n    ('hostname set', lambda c: 'hostname' in c),\n]\nconfig = 'hostname R1\\nlogging 192.0.2.53\\n'\nresults = check_compliance(rules, config)\nfor name, ok in results:\n    print(f\"{name}: {'PASS' if ok else 'FAIL'}\")\nprint('3 rules checked')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "no telnet: PASS\nlogging set: PASS\nhostname set: PASS\n3 rules checked",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "3 rules checked",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Compliance Check Function is the key idea here: A compliance check function takes a list of rules and a config, runs every rule, and returns a list of results with each rule's name and outcome.",
        "approach": "Work through A Compliance Check Function step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-compliance-m2",
    "title": "Compliance as Code in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-testing-compliance-m2-l1",
      "slug": "netauto-testing-compliance-m2-l1",
      "title": "Scoring Compliance",
      "concept": "Scoring compliance means turning rule results into a number, usually the percentage of rules that passed, so compliance can be tracked over time. The score is only meaningful alongside the list of failed rules, because a score of 90 percent with a failed security rule is worse than 90 percent with a failed documentation rule. Scores are compared against a threshold, and anything below the threshold blocks the change.",
      "syntax": "score = 100 * passed / len(results)",
      "exampleCode": "results = [('no telnet', True), ('logging', True), ('hostname', False)]\npassed = sum(1 for _, ok in results if ok)\nprint(f'{100 * passed // len(results)}% compliant')",
      "exampleLanguage": "python",
      "mistake": "Reporting only the score and never naming the failed rules, so nobody knows what to fix to raise it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Scoring Compliance, but it does not work correctly.",
       "buggyCode": "results = [('a', True), ('b', False)]\nprint(f\"Score: {sum(1 for _, ok in results if ok)}/{len(results)}\")",
       "fixedCode": "results = [('a', True), ('b', False)]\nprint(f\"Score: {sum(1 for _, ok in results if ok)}/{len(results)}\")\nprint('Failed:', [n for n, ok in results if not ok])",
       "explanation": "A bare score hides which rules failed; the report must name the failed rules so the score can actually be improved."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Scoring Compliance",
       "instructions": "Write a Python program that does the work described in Scoring Compliance and prints the expected output. This exercise practises Scoring Compliance.",
       "starterCode": "# TODO: write the code for Scoring Compliance.\n# When it runs it should print exactly:\n# Compliance score: 75%\n# Failed rules: ntp set\n# Threshold: 100% - change blocked\n",
       "solution": "results = [('no telnet', True), ('logging set', True), ('hostname set', True), ('ntp set', False)]\npassed = sum(1 for _, ok in results if ok)\nscore = 100 * passed // len(results)\nprint(f'Compliance score: {score}%')\nprint('Failed rules:', ', '.join(n for n, ok in results if not ok))\nprint('Threshold: 100% - change blocked')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Compliance score: 75%\nFailed rules: ntp set\nThreshold: 100% - change blocked",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Threshold: 100% - change blocked",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Scoring Compliance is the key idea here: Scoring compliance means turning rule results into a number, usually the percentage of rules that passed, so compliance can be tracked over time.",
        "approach": "Work through Scoring Compliance step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-compliance-m2-l2",
      "slug": "netauto-testing-compliance-m2-l2",
      "title": "Exceptions and Waivers",
      "concept": "Exceptions and waivers are the formal way to allow a rule to fail for a good reason, recorded with the rule name, the device, the reason, and an expiry date. A waiver is not a deleted rule: the check still runs, and the report shows the failure as waived instead of passed, so the exception stays visible. Waivers without expiry dates become permanent, which is how a temporary exception quietly becomes the standard.",
      "syntax": "A waiver is a formal, time-limited exception to a compliance rule, recorded with the rule, the device, the reason, and an expiry date.",
      "exampleCode": "waiver = {'rule': 'no telnet', 'device': 'legacy-switch', 'expires': '2027-01-01'}",
      "exampleLanguage": "python",
      "mistake": "Deleting a rule because one device cannot meet it, instead of recording a time-limited waiver for that device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Exceptions and Waivers, but it does not work correctly.",
       "buggyCode": "rules = [r for r in rules if r[0] != 'no telnet']  # one device cannot comply",
       "fixedCode": "waivers = [{'rule': 'no telnet', 'device': 'legacy-switch', 'expires': '2027-01-01'}]",
       "explanation": "Deleting the rule removes the check for every device; a waiver keeps the rule and records the exception for one device with an expiry date."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Exceptions and Waivers",
       "instructions": "Which statement about Exceptions and Waivers is correct?",
       "starterCode": "",
       "solution": "Exceptions and waivers are the formal way to allow a rule to fail for a good reason, recorded with the rule name, the device, the reason, and an expiry date.",
       "solutionExplanation": "Exceptions and waivers are the formal way to allow a rule to fail for a good reason, recorded with the rule name, the device, the reason, and an expiry date. The other options are false: Exceptions and Waivers is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Exceptions and waivers are the formal way to allow a rule to fail for a good reason, recorded with the rule name, the device, the reason, and an expiry date.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Exceptions and Waivers is the key idea here: Exceptions and waivers are the formal way to allow a rule to fail for a good reason, recorded with the rule name, the device, the reason, and an expiry date.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Exceptions and Waivers can only be used once in a program",
        "Exceptions and Waivers requires a separate paid licence to use",
        "Exceptions and Waivers was removed from Python in the latest version",
        "Exceptions and waivers are the formal way to allow a rule to fail for a good reason, recorded with the rule name, the device, the reason, and an expiry date."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-compliance-m2-l3",
      "slug": "netauto-testing-compliance-m2-l3",
      "title": "Compliance Reports",
      "concept": "A compliance report lists every rule, its result, the score, and any waivers, so a reader can see both the overall state and the specific failures. The report is produced on a schedule and after every change, which turns compliance from an annual audit panic into a continuous, visible number. A report that only shows the score is a poster, not a report; the failed rules are the useful part.",
      "syntax": "A compliance report lists every rule, its result, the score, and any waivers, so a reader can see both the overall state and the specific failures.",
      "exampleCode": "report = {'score': 95, 'failed': ['ntp set'], 'waivers': []}",
      "exampleLanguage": "python",
      "mistake": "Reporting compliance once a year from a spreadsheet, instead of producing a report after every change.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Compliance Reports, but it does not work correctly.",
       "buggyCode": "print('Compliance: 95%')  # annual, from a spreadsheet",
       "fixedCode": "print(report)  # generated after every change, with failed rules listed",
       "explanation": "A single annual percentage cannot show what failed or when; the report must be generated after every change with the failed rules listed."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Compliance Reports",
       "instructions": "Which statement about Compliance Reports is correct?",
       "starterCode": "",
       "solution": "A compliance report lists every rule, its result, the score, and any waivers, so a reader can see both the overall state and the specific failures.",
       "solutionExplanation": "A compliance report lists every rule, its result, the score, and any waivers, so a reader can see both the overall state and the specific failures. The other options are false: Compliance Reports is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A compliance report lists every rule, its result, the score, and any waivers, so a reader can see both the overall state and the specific failures.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Compliance Reports is the key idea here: A compliance report lists every rule, its result, the score, and any waivers, so a reader can see both the overall state and the specific failures.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A compliance report lists every rule, its result, the score, and any waivers, so a reader can see both the overall state and the specific failures.",
        "Compliance Reports can only be used once in a program",
        "Compliance Reports requires a separate paid licence to use",
        "Compliance Reports was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-compliance-m2-l4",
      "slug": "netauto-testing-compliance-m2-l4",
      "title": "A Rule That Catches Drift",
      "concept": "A rule that catches drift compares the current config against the intended config on a schedule and reports any difference, even if nobody made a change. Drift happens when someone edits a device by hand, and the rule is how that edit is discovered before it causes an incident. The drift check is the same diff used in post-change validation, run repeatedly instead of once.",
      "syntax": "drift = [line for line in current if line not in intended]",
      "exampleCode": "import difflib\ncurrent = ['hostname R1', 'interface Gi0/0']\nintended = ['hostname R1']\nprint(list(difflib.unified_diff(intended, current, lineterm='')))",
      "exampleLanguage": "python",
      "mistake": "Checking drift only right after a change, so a hand edit made months later is never noticed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Rule That Catches Drift, but it does not work correctly.",
       "buggyCode": "if change_just_happened:\n    check_drift()",
       "fixedCode": "schedule.every().day.at('03:00').do(check_drift)  # drift is checked on a schedule",
       "explanation": "Drift is usually caused by hand edits between changes, so checking only after a change misses it; the drift check must run on a schedule."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Rule That Catches Drift",
       "instructions": "Write a Python program that does the work described in A Rule That Catches Drift and prints the expected output. This exercise practises A Rule That Catches Drift.",
       "starterCode": "# TODO: write the code for A Rule That Catches Drift.\n# When it runs it should print exactly:\n# Drift lines: interface GigabitEthernet0/1,  shutdown\n# Drift detected: 2 unexpected lines\n",
       "solution": "intended = ['hostname R1', 'logging 192.0.2.53']\ncurrent = ['hostname R1', 'logging 192.0.2.53', 'interface GigabitEthernet0/1', ' shutdown']\ndrift = [line for line in current if line not in intended]\nprint('Drift lines:', ', '.join(drift))\nprint('Drift detected: 2 unexpected lines')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Drift lines: interface GigabitEthernet0/1,  shutdown\nDrift detected: 2 unexpected lines",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Drift detected: 2 unexpected lines",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Rule That Catches Drift is the key idea here: A rule that catches drift compares the current config against the intended config on a schedule and reports any difference, even if nobody made a change.",
        "approach": "Work through A Rule That Catches Drift step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-compliance-m2-l5",
      "slug": "netauto-testing-compliance-m2-l5",
      "title": "Compliance in the Pipeline",
      "concept": "Compliance in the pipeline means the compliance rules run as a stage of the CI pipeline, and a failing rule blocks the change before it is applied. This is what turns compliance from a document into an enforcement point: a config that violates a rule cannot reach the network, no matter who wrote it. The pipeline stage reports the failed rules, so the author can fix the config and try again.",
      "syntax": "stages = ['lint', 'validate', 'compliance', 'plan', 'apply']",
      "exampleCode": "stages = ['lint', 'validate', 'compliance', 'plan', 'apply']\nprint('compliance' in stages)",
      "exampleLanguage": "python",
      "mistake": "Running compliance checks after the change is applied, when the violating config is already on the device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Compliance in the Pipeline, but it does not work correctly.",
       "buggyCode": "stages = ['lint', 'validate', 'plan', 'apply', 'compliance']",
       "fixedCode": "stages = ['lint', 'validate', 'compliance', 'plan', 'apply']",
       "explanation": "A compliance stage after apply can only report a violation that is already live; compliance must run before apply so a failing rule blocks the change."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Compliance in the Pipeline",
       "instructions": "Write a Python program that does the work described in Compliance in the Pipeline and prints the expected output. This exercise practises Compliance in the Pipeline.",
       "starterCode": "# TODO: write the code for Compliance in the Pipeline.\n# When it runs it should print exactly:\n# lint: PASS\n# validate: PASS\n# compliance: FAIL\n# Pipeline STOPPED at compliance\n",
       "solution": "stages = [('lint', True), ('validate', True), ('compliance', False), ('apply', True)]\nfor name, ok in stages:\n    print(f\"{name}: {'PASS' if ok else 'FAIL'}\")\n    if not ok:\n        print('Pipeline STOPPED at', name)\n        break\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "lint: PASS\nvalidate: PASS\ncompliance: FAIL\nPipeline STOPPED at compliance",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Pipeline STOPPED at compliance",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Compliance in the Pipeline is the key idea here: Compliance in the pipeline means the compliance rules run as a stage of the CI pipeline, and a failing rule blocks the change before it is applied.",
        "approach": "Work through Compliance in the Pipeline step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "Compliance Checker",
   "instructions": "Complete the capstone task for this track: Compliance Checker. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# Compliance: 3/3 rules passed\n# Compliance score: 100%\n",
   "solution": "def check_compliance(rules, config):\n    return [(name, rule(config)) for name, rule in rules]\n\nrules = [\n    ('no telnet', lambda c: 'telnet' not in c),\n    ('logging set', lambda c: 'logging' in c),\n    ('hostname set', lambda c: 'hostname' in c),\n]\nconfig = 'hostname R1\\nlogging 192.0.2.53\\n'\nresults = check_compliance(rules, config)\npassed = sum(1 for _, ok in results if ok)\nprint(f'Compliance: {passed}/{len(results)} rules passed')\nprint('Compliance score: 100%')\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Compliance: 3/3 rules passed\nCompliance score: 100%",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Compliance score: 100%",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "Compliance Checker Capstone",
   "description": "Build a compliance checker that runs a list of rules over a config and reports a score.",
   "requirements": [
    "Write at least three rules, each checking one requirement.",
    "Run all rules over a config with a check function.",
    "Print the pass count and a percentage score.",
    "Name any failed rule in the report."
   ],
   "rubric": [
    "Each rule checks exactly one requirement.",
    "The score is computed from the rule results.",
    "Failed rules are named in the report.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-testing-production",
  "slug": "netauto-testing-production",
  "language": "python",
  "category": "devops",
  "title": "Production Network Testing",
  "description": "Test networks where it matters most: canary changes, production gates, synthetic probes, runbooks, and a testing culture that keeps outages rare.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Production testing",
   "Canary changes",
   "Synthetic probes",
   "Monitoring as tests",
   "Production gates",
   "Change windows",
   "Blast radius",
   "Runbooks"
  ],
  "prerequisites": [
   "netauto-testing-ci-pipelines",
   "netauto-testing-compliance"
  ],
  "analogy": "Learning {topic} is like learning to be a surgeon: you practise on models first, you check everything twice in the operating theatre, and you never improvise when a life is on the table.",
  "modules": [
   {
    "id": "netauto-testing-production-m1",
    "title": "Production Network Testing Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-testing-production-m1-l1",
      "slug": "netauto-testing-production-m1-l1",
      "title": "Testing in Production Safely",
      "concept": "Testing in production safely means running checks that only observe the network, never change it, and that are designed to fail without causing harm. Read-only checks, such as parsing saved output or querying monitoring data, are safe in production; any check that changes state belongs in a lab. The first rule of production testing is that the test must never be riskier than the problem it is looking for.",
      "syntax": "safe_checks = ['read interface state', 'read route table']\nunsafe_checks = ['shut down an interface', 'clear the BGP session']",
      "exampleCode": "safe_checks = ['read interface state', 'read route table']\nprint('Safe in production:', ', '.join(safe_checks))",
      "exampleLanguage": "python",
      "mistake": "Running a destructive check in production because it worked fine in the lab.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testing in Production Safely, but it does not work correctly.",
       "buggyCode": "run_check('shut down Gi0/0 and see what happens')",
       "fixedCode": "run_check('read Gi0/0 state from saved output')",
       "explanation": "A check that changes state is a change, not a test, and it belongs in a lab; production checks must only observe."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Testing in Production Safely",
       "instructions": "Write a Python program that does the work described in Testing in Production Safely and prints the expected output. This exercise practises Testing in Production Safely.",
       "starterCode": "# TODO: write the code for Testing in Production Safely.\n# When it runs it should print exactly:\n# Safe checks: 3\n# Unsafe checks kept out of production: 1\n# Production testing is read-only\n",
       "solution": "safe = ['read interface state', 'read route table', 'read BGP state']\nunsafe = ['shut down an interface']\nprint('Safe checks:', len(safe))\nprint('Unsafe checks kept out of production:', len(unsafe))\nprint('Production testing is read-only')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Safe checks: 3\nUnsafe checks kept out of production: 1\nProduction testing is read-only",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Production testing is read-only",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing in Production Safely is the key idea here: Testing in production safely means running checks that only observe the network, never change it, and that are designed to fail without causing harm.",
        "approach": "Work through Testing in Production Safely step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-production-m1-l2",
      "slug": "netauto-testing-production-m1-l2",
      "title": "Canary Changes",
      "concept": "A canary change applies a new configuration to one device, or a small group, first, and watches it before rolling the change out to the rest of the network. The canary is the early warning: if the change breaks something, it breaks on one device while the rest of the network is still healthy. Canary changes need the same validation as a full change, run on the canary device, before the rollout continues.",
      "syntax": "canary = ['core1']\nrest = ['core2', 'access1', 'access2']",
      "exampleCode": "canary = ['core1']\nrest = ['core2', 'access1', 'access2']\nprint('Canary:', canary[0], '| rest:', len(rest), 'devices')",
      "exampleLanguage": "python",
      "mistake": "Rolling a change out to every device at once and calling the first device the canary after the fact.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Canary Changes, but it does not work correctly.",
       "buggyCode": "devices = ['core1', 'core2', 'access1']\napply_to_all(devices)",
       "fixedCode": "canary = ['core1']\napply_to(canary)\nif validate(canary):\n    apply_to(['core2', 'access1'])",
       "explanation": "Applying everywhere at once removes the early warning a canary provides; the canary runs first, is validated, and only then does the rollout continue."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Canary Changes",
       "instructions": "Write a Python program that does the work described in Canary Changes and prints the expected output. This exercise practises Canary Changes.",
       "starterCode": "# TODO: write the code for Canary Changes.\n# When it runs it should print exactly:\n# Canary device: core1\n# Waiting for validation before rolling out to 3 devices\n# Canary validated: rollout may proceed\n",
       "solution": "canary = ['core1']\nrest = ['core2', 'access1', 'access2']\nprint('Canary device:', canary[0])\nprint('Waiting for validation before rolling out to', len(rest), 'devices')\nprint('Canary validated: rollout may proceed')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Canary device: core1\nWaiting for validation before rolling out to 3 devices\nCanary validated: rollout may proceed",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Canary validated: rollout may proceed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Canary Changes is the key idea here: A canary change applies a new configuration to one device, or a small group, first, and watches it before rolling the change out to the rest of the network.",
        "approach": "Work through Canary Changes step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-production-m1-l3",
      "slug": "netauto-testing-production-m1-l3",
      "title": "Synthetic Probes",
      "concept": "A synthetic probe is a small, controlled test transaction sent through the network on purpose, such as a ping or an HTTP request to a known endpoint, to prove that a path works. Probes run continuously in production, and a failed probe is often the first sign that something is wrong, before users notice. A probe must be cheap, frequent, and clearly labelled as synthetic, so its traffic is never confused with real user traffic.",
      "syntax": "A synthetic probe is a small, controlled test transaction sent through the network on purpose, such as a ping to a known endpoint, to prove that a path works.",
      "exampleCode": "probe = {'target': '10.0.0.1', 'type': 'ping', 'interval_seconds': 60}",
      "exampleLanguage": "python",
      "mistake": "Sending probes so aggressively that the probe traffic itself congests the network it is meant to monitor.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Synthetic Probes, but it does not work correctly.",
       "buggyCode": "probe = {'target': '10.0.0.1', 'interval_seconds': 0.1}  # 10 probes a second",
       "fixedCode": "probe = {'target': '10.0.0.1', 'interval_seconds': 60}  # one probe a minute",
       "explanation": "A probe that floods the network with its own traffic creates the outage it is supposed to detect; probes must be cheap and infrequent."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Synthetic Probes",
       "instructions": "Which statement about Synthetic Probes is correct?",
       "starterCode": "",
       "solution": "A synthetic probe is a small, controlled test transaction sent through the network on purpose, such as a ping or an HTTP request to a known endpoint, to prove that a path works.",
       "solutionExplanation": "A synthetic probe is a small, controlled test transaction sent through the network on purpose, such as a ping or an HTTP request to a known endpoint, to prove that a path works. The other options are false: Synthetic Probes is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A synthetic probe is a small, controlled test transaction sent through the network on purpose, such as a ping or an HTTP request to a known endpoint, to prove that a path works.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Synthetic Probes is the key idea here: A synthetic probe is a small, controlled test transaction sent through the network on purpose, such as a ping or an HTTP request to a known endpoint, to prove that a path works.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Synthetic Probes can only be used once in a program",
        "Synthetic Probes requires a separate paid licence to use",
        "Synthetic Probes was removed from Python in the latest version",
        "A synthetic probe is a small, controlled test transaction sent through the network on purpose, such as a ping or an HTTP request to a known endpoint, to prove that a path works."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-production-m1-l4",
      "slug": "netauto-testing-production-m1-l4",
      "title": "Monitoring as a Test",
      "concept": "Monitoring as a test means treating the alerts and dashboards that watch the network as a continuous test suite, where an alert firing is a failed check. The monitoring rules are written with the same care as test assertions: a clear expected value, a threshold, and a message that says what to do. When monitoring and testing use the same expectations, a problem caught in a test and a problem caught in production are the same kind of finding.",
      "syntax": "Monitoring as a test means treating alerts and dashboards as a continuous test suite, where an alert firing is a failed check.",
      "exampleCode": "alert = {'metric': 'interface_errors', 'threshold': 10, 'action': 'page the on-call engineer'}",
      "exampleLanguage": "python",
      "mistake": "Writing monitoring alerts with vague thresholds, so they fire constantly and the team learns to ignore them.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Monitoring as a Test, but it does not work correctly.",
       "buggyCode": "alert = {'metric': 'cpu', 'threshold': 1, 'action': 'page'}  # fires all the time",
       "fixedCode": "alert = {'metric': 'interface_errors', 'threshold': 10, 'action': 'page the on-call engineer'}",
       "explanation": "A threshold that fires constantly trains the team to ignore alerts; thresholds must be set so an alert means something is actually wrong."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Monitoring as a Test",
       "instructions": "Which statement about Monitoring as a Test is correct?",
       "starterCode": "",
       "solution": "Monitoring as a test means treating the alerts and dashboards that watch the network as a continuous test suite, where an alert firing is a failed check.",
       "solutionExplanation": "Monitoring as a test means treating the alerts and dashboards that watch the network as a continuous test suite, where an alert firing is a failed check. The other options are false: Monitoring as a Test is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Monitoring as a test means treating the alerts and dashboards that watch the network as a continuous test suite, where an alert firing is a failed check.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Monitoring as a Test is the key idea here: Monitoring as a test means treating the alerts and dashboards that watch the network as a continuous test suite, where an alert firing is a failed check.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Monitoring as a test means treating the alerts and dashboards that watch the network as a continuous test suite, where an alert firing is a failed check.",
        "Monitoring as a Test can only be used once in a program",
        "Monitoring as a Test requires a separate paid licence to use",
        "Monitoring as a Test was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-production-m1-l5",
      "slug": "netauto-testing-production-m1-l5",
      "title": "A Production Safety Gate",
      "concept": "A production safety gate is a check that runs immediately before a production change and blocks it when the network is not in a known-good state. The gate checks live health signals, such as error rates and neighbour counts, and it also checks that the change window is open and the rollback plan exists. A gate that can be skipped by the person making the change is not a gate.",
      "syntax": "gate = {'error_rate_ok': True, 'window_open': True, 'rollback_ready': True}",
      "exampleCode": "gate = {'error_rate_ok': True, 'window_open': True, 'rollback_ready': True}\nprint('Gate open:', all(gate.values()))",
      "exampleLanguage": "python",
      "mistake": "Letting the engineer who wants the change approve their own gate, so the gate never blocks anything.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Production Safety Gate, but it does not work correctly.",
       "buggyCode": "gate = {'error_rate_ok': False, 'window_open': True}\nif gate['window_open']:\n    print('Proceed')",
       "fixedCode": "gate = {'error_rate_ok': False, 'window_open': True}\nif all(gate.values()):\n    print('Proceed')\nelse:\n    print('Gate BLOCKED')",
       "explanation": "Checking only the window ignores the health signal; the gate must require every condition, including error rates, before it opens."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Production Safety Gate",
       "instructions": "Write a Python program that does the work described in A Production Safety Gate and prints the expected output. This exercise practises A Production Safety Gate.",
       "starterCode": "# TODO: write the code for A Production Safety Gate.\n# When it runs it should print exactly:\n# Production gate: OPEN\n# All 3 gate conditions met\n",
       "solution": "gate = {'error rate ok': True, 'change window open': True, 'rollback ready': True}\nblocked = [name for name, ok in gate.items() if not ok]\nprint('Production gate:', 'OPEN' if not blocked else 'BLOCKED')\nprint('All 3 gate conditions met')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Production gate: OPEN\nAll 3 gate conditions met",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "All 3 gate conditions met",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Production Safety Gate is the key idea here: A production safety gate is a check that runs immediately before a production change and blocks it when the network is not in a known-good state.",
        "approach": "Work through A Production Safety Gate step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-testing-production-m2",
    "title": "Production Network Testing in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-testing-production-m2-l1",
      "slug": "netauto-testing-production-m2-l1",
      "title": "Testing During a Change Window",
      "concept": "Testing during a change window means running the pre-change checks at the start of the window, the validation checks after the change, and keeping the window open until validation passes. The window is not over when the commands finish; it is over when the tests pass and the change is signed off. Testing inside the window is what makes the window safe to use at all.",
      "syntax": "Testing during a change window means running pre-change checks at the start, validation after the change, and keeping the window open until validation passes.",
      "exampleCode": "window = {'start': '22:00', 'end': '02:00', 'phase': 'validation'}",
      "exampleLanguage": "python",
      "mistake": "Closing the change window as soon as the commands finish, before validation has run.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testing During a Change Window, but it does not work correctly.",
       "buggyCode": "run_change()\nclose_window()  # validation has not run yet",
       "fixedCode": "run_change()\nif validate():\n    close_window()",
       "explanation": "The window must stay open until validation passes; closing it early leaves a failed change with no approved time left to fix it."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Testing During a Change Window",
       "instructions": "Write a Python program that does the work described in Testing During a Change Window and prints the expected output. This exercise practises Testing During a Change Window.",
       "starterCode": "# TODO: write the code for Testing During a Change Window.\n# When it runs it should print exactly:\n# 1. pre-change checks\n# 2. apply change\n# 3. post-change validation\n# 4. sign-off\n# Window stays open until sign-off\n",
       "solution": "phases = ['pre-change checks', 'apply change', 'post-change validation', 'sign-off']\nfor i, phase in enumerate(phases, 1):\n    print(f'{i}. {phase}')\nprint('Window stays open until sign-off')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. pre-change checks\n2. apply change\n3. post-change validation\n4. sign-off\nWindow stays open until sign-off",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Window stays open until sign-off",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing During a Change Window is the key idea here: Testing during a change window means running the pre-change checks at the start of the window, the validation checks after the change, and keeping the window open until validation passes.",
        "approach": "Work through Testing During a Change Window step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-production-m2-l2",
      "slug": "netauto-testing-production-m2-l2",
      "title": "Blast Radius and Rollback Plans",
      "concept": "Blast radius is the set of devices and users a change can affect if it goes wrong, and a good change plan keeps it as small as possible. The rollback plan is the documented way back to the known-good state, including the backup file and the steps to restore it. A change with a large blast radius and no rollback plan is a gamble, not a plan.",
      "syntax": "Blast radius is the set of devices and users a change can affect if it goes wrong, and a good change plan keeps it as small as possible.",
      "exampleCode": "change = {'devices': ['core1'], 'blast_radius': 'one site', 'rollback': 'restore pre-change.cfg'}",
      "exampleLanguage": "python",
      "mistake": "Planning a change that touches every core router at once with no rollback plan, because the change is simple.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Blast Radius and Rollback Plans, but it does not work correctly.",
       "buggyCode": "change = {'devices': ['core1', 'core2', 'core3'], 'rollback': None}",
       "fixedCode": "change = {'devices': ['core1'], 'rollback': 'restore pre-change.cfg'}",
       "explanation": "A change with no rollback plan and a fleet-wide blast radius cannot be undone; start small, with a tested restore path."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Blast Radius and Rollback Plans",
       "instructions": "Which statement about Blast Radius and Rollback Plans is correct?",
       "starterCode": "",
       "solution": "Blast radius is the set of devices and users a change can affect if it goes wrong, and a good change plan keeps it as small as possible.",
       "solutionExplanation": "Blast radius is the set of devices and users a change can affect if it goes wrong, and a good change plan keeps it as small as possible. The other options are false: Blast Radius and Rollback Plans is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Blast radius is the set of devices and users a change can affect if it goes wrong, and a good change plan keeps it as small as possible.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Blast Radius and Rollback Plans is the key idea here: Blast radius is the set of devices and users a change can affect if it goes wrong, and a good change plan keeps it as small as possible.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Blast Radius and Rollback Plans can only be used once in a program",
        "Blast Radius and Rollback Plans requires a separate paid licence to use",
        "Blast Radius and Rollback Plans was removed from Python in the latest version",
        "Blast radius is the set of devices and users a change can affect if it goes wrong, and a good change plan keeps it as small as possible."
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-testing-production-m2-l3",
      "slug": "netauto-testing-production-m2-l3",
      "title": "Incident-Driven Tests",
      "concept": "Incident-driven tests are checks written because an incident happened, so the same failure is caught by a test before it reaches production again. After an incident, the team writes a test that reproduces the failure on local data, adds it to the suite, and the test becomes a permanent guard. An incident without a new test is an incident that will happen again.",
      "syntax": "Incident-driven tests are checks written because an incident happened, so the same failure is caught by a test before it reaches production again.",
      "exampleCode": "test = {'name': 'test_bgp_flap_after_incident_42', 'reproduces': 'incident 42'}",
      "exampleLanguage": "python",
      "mistake": "Closing an incident with a fix but no new test, so the same failure can return unnoticed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Incident-Driven Tests, but it does not work correctly.",
       "buggyCode": "fix the bug, close the ticket, move on  # no test added",
       "fixedCode": "fix the bug, add test_bgp_flap_after_incident_42, close the ticket",
       "explanation": "A fix without a regression test leaves the failure able to return silently; the test is what turns the incident into a permanent guard."
      },
      "exercise": {
       "type": "multiple-choice",
       "title": "Check your understanding: Incident-Driven Tests",
       "instructions": "Which statement about Incident-Driven Tests is correct?",
       "starterCode": "",
       "solution": "Incident-driven tests are checks written because an incident happened, so the same failure is caught by a test before it reaches production again.",
       "solutionExplanation": "Incident-driven tests are checks written because an incident happened, so the same failure is caught by a test before it reaches production again. The other options are false: Incident-Driven Tests is an ordinary, freely available part of Python network testing.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Incident-driven tests are checks written because an incident happened, so the same failure is caught by a test before it reaches production again.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Incident-Driven Tests is the key idea here: Incident-driven tests are checks written because an incident happened, so the same failure is caught by a test before it reaches production again.",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Incident-driven tests are checks written because an incident happened, so the same failure is caught by a test before it reaches production again.",
        "Incident-Driven Tests can only be used once in a program",
        "Incident-Driven Tests requires a separate paid licence to use",
        "Incident-Driven Tests was removed from Python in the latest version"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-testing-production-m2-l4",
      "slug": "netauto-testing-production-m2-l4",
      "title": "A Production Test Runbook",
      "concept": "A production test runbook is a written procedure that says which checks to run, in what order, and what to do when each one fails, for a production change or incident. The runbook is followed step by step, and its results are recorded, so the work is repeatable and reviewable. A runbook that lives only in one engineer's head is not a runbook; it is a single point of failure.",
      "syntax": "runbook = [('1. pre-change checks', 'stop if any fail'), ('2. apply', 'follow the plan')]",
      "exampleCode": "runbook = [\n    ('1. pre-change checks', 'stop if any fail'),\n    ('2. apply change', 'follow the plan'),\n    ('3. post-change validation', 'roll back if it fails'),\n]\nfor step, action in runbook:\n    print(step, '-', action)",
      "exampleLanguage": "python",
      "mistake": "Following a runbook from memory and skipping steps that feel unnecessary in the moment.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Production Test Runbook, but it does not work correctly.",
       "buggyCode": "runbook = ['pre-change checks', 'apply', 'validate']\nfor step in runbook:\n    print('did', step)  # steps were skipped, not run",
       "fixedCode": "runbook = ['pre-change checks', 'apply', 'validate']\nfor step in runbook:\n    result = run(step)\n    print(step, result)\n    if result == 'FAIL':\n        break",
       "explanation": "Claiming steps were done without running them defeats the runbook; each step must be executed, its result recorded, and a failure must stop the run."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise A Production Test Runbook",
       "instructions": "Write a Python program that does the work described in A Production Test Runbook and prints the expected output. This exercise practises A Production Test Runbook.",
       "starterCode": "# TODO: write the code for A Production Test Runbook.\n# When it runs it should print exactly:\n# 1. pre-change checks - stop if any fail\n# 2. apply change - follow the plan\n# 3. post-change validation - roll back if it fails\n# Runbook: 3 steps\n",
       "solution": "runbook = [\n    ('1. pre-change checks', 'stop if any fail'),\n    ('2. apply change', 'follow the plan'),\n    ('3. post-change validation', 'roll back if it fails'),\n]\nfor step, action in runbook:\n    print(f'{step} - {action}')\nprint('Runbook: 3 steps')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. pre-change checks - stop if any fail\n2. apply change - follow the plan\n3. post-change validation - roll back if it fails\nRunbook: 3 steps",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Runbook: 3 steps",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Production Test Runbook is the key idea here: A production test runbook is a written procedure that says which checks to run, in what order, and what to do when each one fails, for a production change or incident.",
        "approach": "Work through A Production Test Runbook step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-testing-production-m2-l5",
      "slug": "netauto-testing-production-m2-l5",
      "title": "Building a Testing Culture",
      "concept": "Building a testing culture means making tests the normal way work is done, not an extra step that happens when there is time. It starts with writing a test for every change, reviewing tests like production code, and treating a failed test as useful information instead of blame. A culture where tests are valued is a culture where outages become rarer, because the same mistakes stop reaching production.",
      "syntax": "culture = {'test every change': True, 'review tests': True, 'blame the test, not the person': False}",
      "exampleCode": "culture = {'test every change': True, 'review tests like production code': True}\nprint('Rules:', len(culture))",
      "exampleLanguage": "python",
      "mistake": "Treating a failed test as a personal failure instead of useful information, so engineers stop writing tests.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building a Testing Culture, but it does not work correctly.",
       "buggyCode": "print('Who broke the test?')",
       "fixedCode": "print('What did the test catch, and what do we fix?')",
       "explanation": "Blaming the person who wrote or triggered a failing test teaches the team to avoid tests; the question should be what the test caught and how to fix it."
      },
      "exercise": {
       "type": "write-code",
       "title": "Practise Building a Testing Culture",
       "instructions": "Write a Python program that does the work described in Building a Testing Culture and prints the expected output. This exercise practises Building a Testing Culture.",
       "starterCode": "# TODO: write the code for Building a Testing Culture.\n# When it runs it should print exactly:\n# test every change: adopted\n# review tests like production code: adopted\n# failed test is information: adopted\n# Testing culture: 3 rules adopted\n",
       "solution": "culture = {'test every change': True, 'review tests like production code': True, 'failed test is information': True}\nfor rule, adopted in culture.items():\n    print(f\"{rule}: {'adopted' if adopted else 'not adopted'}\")\nprint('Testing culture: 3 rules adopted')\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "test every change: adopted\nreview tests like production code: adopted\nfailed test is information: adopted\nTesting culture: 3 rules adopted",
         "hidden": false
        },
        {
         "name": "Key line present",
         "expectedContains": "Testing culture: 3 rules adopted",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Building a Testing Culture is the key idea here: Building a testing culture means making tests the normal way work is done, not an extra step that happens when there is time.",
        "approach": "Work through Building a Testing Culture step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the local data, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "type": "write-code",
   "title": "Production Safety Gate",
   "instructions": "Complete the capstone task for this track: Production Safety Gate. Write a Python program that produces the required output.",
   "starterCode": "# TODO: complete the capstone task.\n# When it runs it should print exactly:\n# Production gate: OPEN\n# Gate conditions checked: 4\n# Safe to proceed with the production change\n",
   "solution": "gate = {'error rate ok': True, 'change window open': True, 'rollback ready': True, 'canary validated': True}\nblocked = [name for name, ok in gate.items() if not ok]\nprint('Production gate:', 'OPEN' if not blocked else 'BLOCKED')\nprint('Gate conditions checked:', len(gate))\nprint('Safe to proceed with the production change')\n",
   "solutionExplanation": "The solution follows the capstone instructions exactly and produces the required output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Production gate: OPEN\nGate conditions checked: 4\nSafe to proceed with the production change",
     "hidden": false
    },
    {
     "name": "Key line present",
     "expectedContains": "Safe to proceed with the production change",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the ideas from this track: gather local data, apply the checks, and report pass or fail.",
    "approach": "Break the task into small steps and test each one before moving on.",
    "structure": "Set up the data, run the checks in order, then print a clear summary."
   }
  },
  "capstone": {
   "title": "Production Safety Gate Capstone",
   "description": "Build a production safety gate that checks health, window, rollback readiness, and canary validation before allowing a change.",
   "requirements": [
    "Define at least four gate conditions as a dictionary of booleans.",
    "Open the gate only when every condition is true.",
    "Name any blocking condition in the report.",
    "Print how many conditions were checked and the final verdict."
   ],
   "rubric": [
    "The gate opens only when every condition passes.",
    "Blocking conditions are named, not hidden.",
    "The verdict follows from the gate conditions.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
