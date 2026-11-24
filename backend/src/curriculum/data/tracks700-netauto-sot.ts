import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
 {
  "id": "netauto-sot-foundations",
  "slug": "netauto-sot-foundations",
  "language": "python",
  "category": "devops",
  "title": "Source of Truth Foundations",
  "description": "Learn what a source of truth is, why spreadsheets fail, and how to model network data as structured records with naming conventions, sites and a readiness checklist.",
  "difficulty": "Beginner",
  "estimatedHours": 8,
  "skills": [
   "Source of truth concepts",
   "Structured network data",
   "Naming conventions",
   "Sites and tenancy",
   "Data validation",
   "Change history",
   "Readiness checklists"
  ],
  "prerequisites": [],
  "analogy": "Learning {topic} is like keeping the master copy of a recipe book: everyone cooks from the same page, so every kitchen produces the same dish.",
  "modules": [
   {
    "id": "netauto-sot-foundations-m1",
    "title": "Source of Truth Foundations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-foundations-m1-l1",
      "slug": "netauto-sot-foundations-m1-l1",
      "title": "What Is a Source of Truth?",
      "concept": "A source of truth is the one place where the intended state of the network is recorded, and every tool reads from it instead of keeping its own copy. When the source of truth says a device is a core switch in the HQ site, that is the fact every automation run uses. Without one, each script invents its own version of the network and they slowly disagree.",
      "syntax": "device = {\"hostname\": \"core-sw-01\", \"role\": \"core switch\"}",
      "exampleCode": "device = {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\"}\nprint(device[\"hostname\"])\nprint(device[\"role\"])",
      "exampleLanguage": "python",
      "mistake": "Storing the same device fact in two places and updating only one of them.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is a Source of Truth?, but it does not work correctly.",
       "buggyCode": "device = {\"hostname\": \"core-sw-01\", \"role\": \"core switch\"}\nprint(device[\"name\"])",
       "fixedCode": "device = {\"hostname\": \"core-sw-01\", \"role\": \"core switch\"}\nprint(device[\"hostname\"])",
       "explanation": "The dictionary has a 'hostname' key, not a 'name' key, so looking up device['name'] raises a KeyError; the source of truth is only useful when every reader uses the same field names."
      },
      "exercise": {
       "title": "Practise What Is a Source of Truth?",
       "type": "write-code",
       "instructions": "Model one device as a dictionary with hostname, role, site and management IP, then print a sentence describing it and its management IP.",
       "starterCode": "device = {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\", \"mgmt_ip\": \"10.0.0.1\"}\n# TODO: print a sentence describing the device and its management IP.\n",
       "solution": "device = {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\", \"mgmt_ip\": \"10.0.0.1\"}\nprint(f\"{device['hostname']} is a {device['role']} in {device['site']}\")\nprint(f\"Management IP: {device['mgmt_ip']}\")",
       "solutionExplanation": "The solution model one device as a dictionary with hostname, role, site and management IP, then print a sentence describing it and its management IP. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "core-sw-01 is a core switch in hq\nManagement IP: 10.0.0.1",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Management IP: 10.0.0.1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Is a Source of Truth? is the key idea here: A source of truth is the one place where the intended state of the network is recorded, and every tool reads from it instead of keeping its own copy.",
        "approach": "Work through What Is a Source of Truth? step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-foundations-m1-l2",
      "slug": "netauto-sot-foundations-m1-l2",
      "title": "Spreadsheets vs a Real Source of Truth",
      "concept": "A spreadsheet can hold network data, but it cannot stop two people editing the same row, enforce that every device has a management IP, or tell you what changed last Tuesday. A real source of truth adds structure, validation and history on top of the same rows, so the data stays trustworthy as the team grows. Spreadsheets are where network data goes to become stale.",
      "syntax": "devices = [\"edge-rtr-01\", \"core-sw-01\", \"edge-rtr-01\"]",
      "exampleCode": "devices = [\"edge-rtr-01\", \"core-sw-01\", \"edge-rtr-01\"]\nprint(len(devices))\nprint(len(set(devices)))",
      "exampleLanguage": "python",
      "mistake": "Assuming a spreadsheet has no duplicate hostnames just because nobody has noticed one yet.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Spreadsheets vs a Real Source of Truth, but it does not work correctly.",
       "buggyCode": "devices = [\"edge-rtr-01\", \"core-sw-01\", \"edge-rtr-01\"]\nprint(f\"Devices: {len(devices)}\")",
       "fixedCode": "devices = [\"edge-rtr-01\", \"core-sw-01\", \"edge-rtr-01\"]\nprint(f\"Devices: {len(set(devices))}\")",
       "explanation": "Counting the raw list counts the duplicated hostname twice; a source of truth enforces uniqueness, so the honest count uses the set of distinct names."
      },
      "exercise": {
       "title": "Practise Spreadsheets vs a Real Source of Truth",
       "type": "write-code",
       "instructions": "Given a list of hostnames copied from a spreadsheet, find every duplicated hostname, print each one, and print how many unique devices there really are.",
       "starterCode": "devices = [\"edge-rtr-01\", \"core-sw-01\", \"edge-rtr-01\", \"acc-sw-02\", \"core-sw-01\"]\n# TODO: find the duplicated hostnames and count the unique devices.\n",
       "solution": "devices = [\"edge-rtr-01\", \"core-sw-01\", \"edge-rtr-01\", \"acc-sw-02\", \"core-sw-01\"]\nseen = set()\nduplicates = []\nfor name in devices:\n    if name in seen and name not in duplicates:\n        duplicates.append(name)\n    seen.add(name)\nfor name in sorted(duplicates):\n    print(f\"Duplicate hostname: {name}\")\nprint(f\"Unique devices: {len(seen)}\")",
       "solutionExplanation": "The solution given a list of hostnames copied from a spreadsheet, find every duplicated hostname, print each one, and print how many unique devices there really are. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Duplicate hostname: core-sw-01\nDuplicate hostname: edge-rtr-01\nUnique devices: 3",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Unique devices: 3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Spreadsheets vs a Real Source of Truth is the key idea here: A spreadsheet can hold network data, but it cannot stop two people editing the same row, enforce that every device has a management IP, or tell you what changed last Tuesday.",
        "approach": "Work through Spreadsheets vs a Real Source of Truth step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-foundations-m1-l3",
      "slug": "netauto-sot-foundations-m1-l3",
      "title": "The Single Source of Truth Rule",
      "concept": "The single source of truth rule means every fact about the network lives in exactly one place, and every tool reads it from there. If the management IP of a switch changes, it changes in the source of truth once, and the monitoring, backup and config tools all see the new value. The rule is what turns a database into a discipline.",
      "syntax": "sot = {\"core-sw-01\": {\"mgmt_ip\": \"10.0.0.1\"}}",
      "exampleCode": "sot = {\"core-sw-01\": {\"mgmt_ip\": \"10.0.0.1\"}}\nprint(sot[\"core-sw-01\"][\"mgmt_ip\"])",
      "exampleLanguage": "python",
      "mistake": "Keeping a second copy of the data 'just for this one script' and letting it drift.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The Single Source of Truth Rule, but it does not work correctly.",
       "buggyCode": "sot = {\"core-sw-01\": {\"mgmt_ip\": \"10.0.0.1\"}}\ncopy = {\"core-sw-01\": {\"mgmt_ip\": \"10.0.0.9\"}}\nprint(sot[\"core-sw-01\"][\"mgmt_ip\"])",
       "fixedCode": "sot = {\"core-sw-01\": {\"mgmt_ip\": \"10.0.0.1\"}}\nprint(sot[\"core-sw-01\"][\"mgmt_ip\"])",
       "explanation": "The local copy disagrees with the source of truth, so the script would connect to the wrong address; with one source of truth there is no second copy to disagree."
      },
      "exercise": {
       "title": "Check your understanding: The Single Source of Truth Rule",
       "type": "multiple-choice",
       "instructions": "Which statement about The Single Source of Truth Rule is correct?",
       "starterCode": "",
       "solution": "The single source of truth rule means every fact about the network lives in exactly one place, and every tool reads it from there.",
       "solutionExplanation": "The single source of truth rule means every fact about the network lives in exactly one place, and every tool reads it from there. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The single source of truth rule means every fact about the network lives in exactly one place, and every tool reads it from there.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of The Single Source of Truth Rule from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "The single source of truth rule means every engineer keeps their own copy of the network data.",
        "The single source of truth rule means every fact about the network lives in exactly one place, and every tool reads it from there.",
        "The single source of truth rule means the source of truth is only updated once a year.",
        "The single source of truth rule means spreadsheets are the only allowed source of truth."
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-sot-foundations-m1-l4",
      "slug": "netauto-sot-foundations-m1-l4",
      "title": "What Belongs in the Source of Truth",
      "concept": "The source of truth holds intended state: device names, roles, IP addresses, VLANs and cabling, which are facts the team decides in advance. It does not hold live measurements such as current CPU load or interface counters, which change every second and belong in monitoring. Mixing the two kinds of data makes the source of truth noisy and untrustworthy.",
      "syntax": "intended = {\"hostname\": \"core-sw-01\", \"vlans\": [10, 20]}",
      "exampleCode": "intended = {\"hostname\": \"core-sw-01\", \"vlans\": [10, 20]}\nprint(intended[\"vlans\"])",
      "exampleLanguage": "python",
      "mistake": "Recording live measurements such as CPU load in the source of truth, where they are stale the moment they are written.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Belongs in the Source of Truth, but it does not work correctly.",
       "buggyCode": "sot = {\"core-sw-01\": {\"cpu\": 42, \"vlans\": [10, 20]}}\nprint(sot[\"core-sw-01\"][\"cpu\"])",
       "fixedCode": "sot = {\"core-sw-01\": {\"vlans\": [10, 20]}}\nprint(sot[\"core-sw-01\"][\"vlans\"])",
       "explanation": "CPU load is a live measurement that is stale the moment it is written, so it does not belong in the source of truth; intended state such as VLANs does."
      },
      "exercise": {
       "title": "Check your understanding: What Belongs in the Source of Truth",
       "type": "multiple-choice",
       "instructions": "Which statement about What Belongs in the Source of Truth is correct?",
       "starterCode": "",
       "solution": "The source of truth holds intended state: device names, roles, IP addresses, VLANs and cabling, which are facts the team decides in advance.",
       "solutionExplanation": "The source of truth holds intended state: device names, roles, IP addresses, VLANs and cabling, which are facts the team decides in advance. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The source of truth holds intended state: device names, roles, IP addresses, VLANs and cabling, which are facts the team decides in advance.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of What Belongs in the Source of Truth from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "The source of truth holds intended state: device names, roles, IP addresses, VLANs and cabling, which are facts the team decides in advance.",
        "The source of truth should store live CPU load and interface counters for every device.",
        "The source of truth should store every log line each device has ever produced.",
        "The source of truth only holds the names of devices, never their addresses or VLANs."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-foundations-m1-l5",
      "slug": "netauto-sot-foundations-m1-l5",
      "title": "Naming and Structure Conventions",
      "concept": "A naming convention is a written rule for how device names are formed, such as role-site-number, so core-sw-01 is instantly recognisable as the first core switch. Conventions make names searchable, sortable and safe to use in scripts, and they stop every engineer inventing a slightly different spelling. A name that a script cannot predict is a name that automation cannot trust.",
      "syntax": "import re\npattern = re.compile(r\"^[a-z]{2,4}-[a-z]{2,4}-\\d{2}$\")",
      "exampleCode": "import re\npattern = re.compile(r\"^[a-z]+-[a-z]+-\\d{2}$\")\nprint(bool(pattern.match(\"core-sw-01\")))",
      "exampleLanguage": "python",
      "mistake": "Allowing free-form device names with spaces and capitals, which break scripts that build hostnames from parts.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Naming and Structure Conventions, but it does not work correctly.",
       "buggyCode": "import re\npattern = re.compile(r\"^[a-z]+-[a-z]+-\\d{2}$\")\nprint(pattern.match(\"Core_SW_1\"))",
       "fixedCode": "import re\npattern = re.compile(r\"^[a-z]+-[a-z]+-\\d{2}$\")\nprint(bool(pattern.match(\"Core_SW_1\")))",
       "explanation": "match() returns None for a non-matching name, and printing None hides whether the name passed; converting to bool makes the check explicit and readable."
      },
      "exercise": {
       "title": "Practise Naming and Structure Conventions",
       "type": "write-code",
       "instructions": "Check each hostname in the list against the convention of lowercase words joined by hyphens and ending in two digits, and print OK or INVALID for each one.",
       "starterCode": "import re\npattern = re.compile(r\"^[a-z]{2,4}-[a-z]{2,4}-\\d{2}$\")\nnames = [\"core-sw-01\", \"Core_SW_1\", \"edge-rtr-02\", \"bad name\", \"acc-sw-03\"]\n# TODO: print OK or INVALID for each name.\n",
       "solution": "import re\npattern = re.compile(r\"^[a-z]{2,4}-[a-z]{2,4}-\\d{2}$\")\nnames = [\"core-sw-01\", \"Core_SW_1\", \"edge-rtr-02\", \"bad name\", \"acc-sw-03\"]\nfor name in names:\n    if pattern.match(name):\n        print(f\"OK: {name}\")\n    else:\n        print(f\"INVALID: {name}\")",
       "solutionExplanation": "The solution check each hostname in the list against the convention of lowercase words joined by hyphens and ending in two digits, and print OK or INVALID for each one. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "OK: core-sw-01\nINVALID: Core_SW_1\nOK: edge-rtr-02\nINVALID: bad name\nOK: acc-sw-03",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "INVALID: bad name",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Naming and Structure Conventions is the key idea here: A naming convention is a written rule for how device names are formed, such as role-site-number, so core-sw-01 is instantly recognisable as the first core switch.",
        "approach": "Work through Naming and Structure Conventions step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-foundations-m2",
    "title": "Source of Truth Foundations in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-sot-foundations-m2-l6",
      "slug": "netauto-sot-foundations-m2-l6",
      "title": "Sites, Locations and Tenancy",
      "concept": "Sites organise the network by place, so every device belongs to exactly one site such as HQ or branch-a, and sites can be grouped into regions. Tenancy adds a second grouping by owner, so one team's devices can be reported and permissioned separately from another team's. Together, sites and tenants let a large network be sliced into pieces small enough to manage safely.",
      "syntax": "devices = [(\"core-sw-01\", \"hq\"), (\"acc-sw-01\", \"branch-a\")]",
      "exampleCode": "devices = [(\"core-sw-01\", \"hq\"), (\"acc-sw-01\", \"branch-a\")]\nprint([d for d, s in devices if s == \"hq\"])",
      "exampleLanguage": "python",
      "mistake": "Assigning a device to two sites at once, so reports double-count it and nobody knows where it really is.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Sites, Locations and Tenancy, but it does not work correctly.",
       "buggyCode": "devices = [(\"core-sw-01\", \"hq\"), (\"core-sw-01\", \"branch-a\")]\nprint(len(devices))",
       "fixedCode": "devices = [(\"core-sw-01\", \"hq\"), (\"acc-sw-01\", \"branch-a\")]\nprint(len({d for d, _ in devices}))",
       "explanation": "Listing the same device under two sites double-counts it; each device belongs to exactly one site, so the distinct set is the honest count."
      },
      "exercise": {
       "title": "Practise Sites, Locations and Tenancy",
       "type": "write-code",
       "instructions": "Group the devices by site, then print each site with its device count, sorted alphabetically by site name.",
       "starterCode": "devices = [(\"core-sw-01\", \"hq\"), (\"edge-rtr-01\", \"hq\"), (\"acc-sw-01\", \"branch-a\"), (\"acc-sw-02\", \"branch-a\"), (\"acc-sw-03\", \"branch-b\")]\n# TODO: count devices per site and print the counts sorted by site.\n",
       "solution": "devices = [(\"core-sw-01\", \"hq\"), (\"edge-rtr-01\", \"hq\"), (\"acc-sw-01\", \"branch-a\"), (\"acc-sw-02\", \"branch-a\"), (\"acc-sw-03\", \"branch-b\")]\ncounts = {}\nfor _, site in devices:\n    counts[site] = counts.get(site, 0) + 1\nfor site in sorted(counts):\n    print(f\"{site}: {counts[site]} devices\")",
       "solutionExplanation": "The solution group the devices by site, then print each site with its device count, sorted alphabetically by site name. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "branch-a: 2 devices\nbranch-b: 1 devices\nhq: 2 devices",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "hq: 2 devices",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Sites, Locations and Tenancy is the key idea here: Sites organise the network by place, so every device belongs to exactly one site such as HQ or branch-a, and sites can be grouped into regions.",
        "approach": "Work through Sites, Locations and Tenancy step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-foundations-m2-l7",
      "slug": "netauto-sot-foundations-m2-l7",
      "title": "Change History and Accountability",
      "concept": "A source of truth keeps a history of who changed what and when, so a bad change can be traced back to its author and reversed. History turns the source of truth from a snapshot into a story, and it is what makes automation auditable in a real organisation. Without history, a broken network has no explanation and no one to ask.",
      "syntax": "history = [(\"ana\", \"added vlan 20\"), (\"ben\", \"moved acc-sw-01\")]",
      "exampleCode": "history = [(\"ana\", \"added vlan 20\"), (\"ben\", \"moved acc-sw-01\")]\nprint(history[-1])",
      "exampleLanguage": "python",
      "mistake": "Changing data without recording who made the change, so a bad edit cannot be traced or undone.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Change History and Accountability, but it does not work correctly.",
       "buggyCode": "history = []\nhistory.append(\"added vlan 20\")\nprint(history[-1])",
       "fixedCode": "history = [(\"ana\", \"added vlan 20\")]\nprint(history[-1])",
       "explanation": "Recording only the change text and not the author loses accountability; history entries must carry who made the change as well as what changed."
      },
      "exercise": {
       "title": "Check your understanding: Change History and Accountability",
       "type": "multiple-choice",
       "instructions": "Which statement about Change History and Accountability is correct?",
       "starterCode": "",
       "solution": "A source of truth keeps a history of who changed what and when, so any bad change can be traced back to its author and reversed.",
       "solutionExplanation": "A source of truth keeps a history of who changed what and when, so any bad change can be traced back to its author and reversed. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A source of truth keeps a history of who changed what and when, so any bad change can be traced back to its author and reversed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Change History and Accountability from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A source of truth keeps a history of who changed what and when, so any bad change can be traced back to its author and reversed.",
        "A source of truth should overwrite old values immediately so no history is kept.",
        "Change history is only useful for billing, never for fixing networks.",
        "A source of truth keeps history only for devices, never for IP addresses or VLANs."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-foundations-m2-l8",
      "slug": "netauto-sot-foundations-m2-l8",
      "title": "Source of Truth Anti-Patterns",
      "concept": "Keeping device data in three spreadsheets, a wiki page and an engineer's laptop is an anti-pattern, because no copy can be trusted as current. Other anti-patterns are editing devices directly without updating the source of truth, and storing secrets next to device data in plain text. Each anti-pattern has the same cost: the team stops believing the data and automation stops working.",
      "syntax": "copies = [\"spreadsheet\", \"wiki\", \"laptop\"]",
      "exampleCode": "copies = [\"spreadsheet\", \"wiki\", \"laptop\"]\nprint(len(copies))",
      "exampleLanguage": "python",
      "mistake": "Treating the running config on a device as the source of truth, because it is 'what is really there'.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Source of Truth Anti-Patterns, but it does not work correctly.",
       "buggyCode": "truth = \"running config on the device\"\nprint(truth)",
       "fixedCode": "truth = \"the recorded intended state\"\nprint(truth)",
       "explanation": "The running config is the current state, which may contain unrecorded manual edits; the source of truth records the intended state that automation aims for."
      },
      "exercise": {
       "title": "Check your understanding: Source of Truth Anti-Patterns",
       "type": "multiple-choice",
       "instructions": "Which statement about Source of Truth Anti-Patterns is correct?",
       "starterCode": "",
       "solution": "Keeping device data in three spreadsheets, a wiki page and an engineer's laptop is an anti-pattern, because no copy can be trusted as current.",
       "solutionExplanation": "Keeping device data in three spreadsheets, a wiki page and an engineer's laptop is an anti-pattern, because no copy can be trusted as current. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Keeping device data in three spreadsheets, a wiki page and an engineer's laptop is an anti-pattern, because no copy can be trusted as current.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Source of Truth Anti-Patterns from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Keeping device data in three spreadsheets, a wiki page and an engineer's laptop is an anti-pattern, because no copy can be trusted as current.",
        "Keeping one copy of the data in a version-controlled source of truth is an anti-pattern.",
        "Updating the source of truth before changing a device is an anti-pattern.",
        "Recording who changed what is an anti-pattern because it slows engineers down."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-foundations-m2-l9",
      "slug": "netauto-sot-foundations-m2-l9",
      "title": "Your First Source of Truth Data Model",
      "concept": "A first source of truth data model is a nested dictionary: sites map to lists of devices, and each device is a dictionary of fields such as role and management IP. The shape is deliberately simple, because a model the team can read is a model the team will actually keep up to date. Every larger system, including NetBox, is this same idea with more tables and more rules.",
      "syntax": "sot = {\"hq\": [\"core-sw-01\"], \"branch-a\": [\"acc-sw-01\"]}",
      "exampleCode": "sot = {\"hq\": [\"core-sw-01\"], \"branch-a\": [\"acc-sw-01\"]}\nprint(sot[\"hq\"])",
      "exampleLanguage": "python",
      "mistake": "Nesting the data so deeply that a simple question needs five levels of lookups.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Your First Source of Truth Data Model, but it does not work correctly.",
       "buggyCode": "sot = {\"hq\": {\"devices\": {\"core\": {\"switches\": [\"core-sw-01\"]}}}}\nprint(sot[\"hq\"][\"devices\"][\"core\"][\"switches\"])",
       "fixedCode": "sot = {\"hq\": [\"core-sw-01\"]}\nprint(sot[\"hq\"])",
       "explanation": "Deep nesting makes every lookup fragile and hard to read; a flat mapping from site to device list answers the same question with one lookup."
      },
      "exercise": {
       "title": "Practise Your First Source of Truth Data Model",
       "type": "write-code",
       "instructions": "Build a source of truth dictionary mapping each site to its device list, print each site with its devices, then print the total device count.",
       "starterCode": "sot = {\"hq\": [\"core-sw-01\", \"edge-rtr-01\"], \"branch-a\": [\"acc-sw-01\"]}\n# TODO: print each site with its devices, then the total count.\n",
       "solution": "sot = {\"hq\": [\"core-sw-01\", \"edge-rtr-01\"], \"branch-a\": [\"acc-sw-01\"]}\nfor site in sorted(sot):\n    print(f\"{site}: {', '.join(sot[site])}\")\ntotal = sum(len(v) for v in sot.values())\nprint(f\"Total devices: {total}\")",
       "solutionExplanation": "The solution build a source of truth dictionary mapping each site to its device list, print each site with its devices, then print the total device count. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "branch-a: acc-sw-01\nhq: core-sw-01, edge-rtr-01\nTotal devices: 3",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Total devices: 3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Your First Source of Truth Data Model is the key idea here: A first source of truth data model is a nested dictionary: sites map to lists of devices, and each device is a dictionary of fields such as role and management IP.",
        "approach": "Work through Your First Source of Truth Data Model step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-foundations-m2-l10",
      "slug": "netauto-sot-foundations-m2-l10",
      "title": "Source of Truth Readiness Checklist",
      "concept": "A readiness checklist verifies that a source of truth record is complete before it is used: every device needs a hostname, a role, a site and a management IP. Records that fail the checklist are reported, not silently skipped, because automation built on missing data fails in confusing ways. The checklist is the cheapest validation a team can run, and it catches the most common mistakes.",
      "syntax": "required = [\"hostname\", \"role\", \"site\", \"mgmt_ip\"]",
      "exampleCode": "device = {\"hostname\": \"core-sw-01\"}\nprint(\"mgmt_ip\" in device)",
      "exampleLanguage": "python",
      "mistake": "Treating a record as complete because it has a hostname, while the role, site and IP are all missing.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Source of Truth Readiness Checklist, but it does not work correctly.",
       "buggyCode": "device = {\"hostname\": \"core-sw-01\"}\nprint(\"complete\" if \"hostname\" in device else \"incomplete\")",
       "fixedCode": "device = {\"hostname\": \"core-sw-01\"}\nrequired = [\"hostname\", \"role\", \"site\", \"mgmt_ip\"]\nprint(\"complete\" if all(f in device for f in required) else \"incomplete\")",
       "explanation": "Checking only the hostname calls an incomplete record complete; completeness means every required field is present, not just one."
      },
      "exercise": {
       "title": "Practise Source of Truth Readiness Checklist",
       "type": "write-code",
       "instructions": "Check the device record against the required fields, print each missing field, and print how many fields are missing in total.",
       "starterCode": "device = {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\", \"mgmt_ip\": \"\"}\nrequired = [\"hostname\", \"role\", \"site\", \"mgmt_ip\"]\n# TODO: print each missing or empty required field, then the missing count.\n",
       "solution": "device = {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\", \"mgmt_ip\": \"\"}\nrequired = [\"hostname\", \"role\", \"site\", \"mgmt_ip\"]\nmissing = [f for f in required if not device.get(f)]\nif missing:\n    for f in missing:\n        print(f\"Missing: {f}\")\nelse:\n    print(\"Record complete\")\nprint(f\"Missing fields: {len(missing)}\")",
       "solutionExplanation": "The solution check the device record against the required fields, print each missing field, and print how many fields are missing in total. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Missing: mgmt_ip\nMissing fields: 1",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Missing fields: 1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Source of Truth Readiness Checklist is the key idea here: A readiness checklist verifies that a source of truth record is complete before it is used: every device needs a hostname, a role, a site and a management IP.",
        "approach": "Work through Source of Truth Readiness Checklist step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Build a Source of Truth Inventory",
   "type": "write-code",
   "instructions": "Build a small source of truth with three devices across two sites, validate every record against the required fields, print OK or the missing fields for each device, then print the totals checked and with problems.",
   "starterCode": "devices = [\n    {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\", \"mgmt_ip\": \"10.0.0.1\"},\n    {\"hostname\": \"edge-rtr-01\", \"role\": \"edge router\", \"site\": \"hq\", \"mgmt_ip\": \"10.0.0.2\"},\n    {\"hostname\": \"acc-sw-01\", \"role\": \"access switch\", \"site\": \"branch-a\", \"mgmt_ip\": \"\"},\n]\nrequired = [\"hostname\", \"role\", \"site\", \"mgmt_ip\"]\n# TODO: validate every record and print the totals.\n",
   "solution": "devices = [\n    {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\", \"mgmt_ip\": \"10.0.0.1\"},\n    {\"hostname\": \"edge-rtr-01\", \"role\": \"edge router\", \"site\": \"hq\", \"mgmt_ip\": \"10.0.0.2\"},\n    {\"hostname\": \"acc-sw-01\", \"role\": \"access switch\", \"site\": \"branch-a\", \"mgmt_ip\": \"\"},\n]\nrequired = [\"hostname\", \"role\", \"site\", \"mgmt_ip\"]\nproblems = 0\nfor d in devices:\n    missing = [f for f in required if not d.get(f)]\n    if missing:\n        problems += 1\n        print(f\"{d['hostname']}: missing {', '.join(missing)}\")\n    else:\n        print(f\"{d['hostname']}: OK\")\nprint(f\"Devices checked: {len(devices)}\")\nprint(f\"Devices with problems: {problems}\")",
   "solutionExplanation": "The solution build a small source of truth with three devices across two sites, validate every record against the required fields, print OK or the missing fields for each device, then print the totals checked and with problems. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "core-sw-01: OK\nedge-rtr-01: OK\nacc-sw-01: missing mgmt_ip\nDevices checked: 3\nDevices with problems: 1",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Devices with problems: 1",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Source of Truth Foundations capstone is the key idea here: A source of truth is the one place where the intended state of the network is recorded, and every tool reads from it instead of keeping its own copy.",
    "approach": "Work through Source of Truth Foundations capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Build a Source of Truth Inventory",
   "description": "Design a small source of truth for two sites, validate every record, and produce a readiness report that names exactly which records are incomplete.",
   "requirements": [
    "Model at least three devices across at least two sites",
    "Validate every record against hostname, role, site and management IP",
    "Report each incomplete record by name with its missing fields",
    "Print total devices checked and devices with problems"
   ],
   "rubric": [
    "Every device record carries all four required fields or is reported missing",
    "Devices are grouped by site",
    "The report names each problem record precisely",
    "Totals match the records checked"
   ]
  }
 },
 {
  "id": "netauto-sot-netbox",
  "slug": "netauto-sot-netbox",
  "language": "python",
  "category": "devops",
  "title": "NetBox Data Model",
  "description": "Learn the NetBox data model hands-on: regions, sites, device types and roles, interfaces and cables, IPAM prefixes, VLANs, VRFs, tags, tenants and circuits.",
  "difficulty": "Beginner",
  "estimatedHours": 9,
  "skills": [
   "NetBox sites and regions",
   "Device types and roles",
   "Interfaces and cables",
   "IPAM prefixes",
   "VLANs and VRFs",
   "Tags and custom fields",
   "Tenants",
   "Circuits",
   "NetBox API basics"
  ],
  "prerequisites": [
   "netauto-sot-foundations"
  ],
  "analogy": "Learning {topic} is like learning the shelves of a library: once you know where each kind of book lives, you can find anything without searching the whole building.",
  "modules": [
   {
    "id": "netauto-sot-netbox-m1",
    "title": "NetBox Data Model Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-netbox-m1-l1",
      "slug": "netauto-sot-netbox-m1-l1",
      "title": "Sites, Regions and Locations",
      "concept": "NetBox organises geography in three levels: regions contain sites, and sites contain locations such as rooms or floors. A device always belongs to one site, so a report can answer which devices live in London without scanning the whole inventory. Getting the geography right first makes every later report simple.",
      "syntax": "regions = {\"emea\": [\"hq-london\", \"branch-paris\"]}",
      "exampleCode": "regions = {\"emea\": [\"hq-london\", \"branch-paris\"], \"amer\": [\"branch-nyc\"]}\nprint(regions[\"emea\"])",
      "exampleLanguage": "python",
      "mistake": "Creating a site for every room instead of grouping rooms under one site.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Sites, Regions and Locations, but it does not work correctly.",
       "buggyCode": "sites = [\"hq-room-1\", \"hq-room-2\", \"hq-room-3\"]\nprint(len(sites))",
       "fixedCode": "sites = [\"hq-london\"]\nlocations = [\"room-1\", \"room-2\", \"room-3\"]\nprint(len(sites))",
       "explanation": "Rooms are locations inside a site, not sites themselves; making every room a site fragments reporting and hides which devices share a building."
      },
      "exercise": {
       "title": "Practise Sites, Regions and Locations",
       "type": "write-code",
       "instructions": "Model regions mapping to their sites, print each region and site as region/site, then print the total number of sites.",
       "starterCode": "regions = {\"emea\": [\"hq-london\", \"branch-paris\"], \"amer\": [\"branch-nyc\"]}\n# TODO: print every region/site pair and the total site count.\n",
       "solution": "regions = {\"emea\": [\"hq-london\", \"branch-paris\"], \"amer\": [\"branch-nyc\"]}\nfor region in sorted(regions):\n    for site in sorted(regions[region]):\n        print(f\"{region}/{site}\")\nprint(f\"Total sites: {sum(len(v) for v in regions.values())}\")",
       "solutionExplanation": "The solution model regions mapping to their sites, print each region and site as region/site, then print the total number of sites. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "amer/branch-nyc\nemea/branch-paris\nemea/hq-london\nTotal sites: 3",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Total sites: 3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Sites, Regions and Locations is the key idea here: NetBox organises geography in three levels: regions contain sites, and sites contain locations such as rooms or floors.",
        "approach": "Work through Sites, Regions and Locations step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-netbox-m1-l2",
      "slug": "netauto-sot-netbox-m1-l2",
      "title": "Device Types, Manufacturers and Roles",
      "concept": "In NetBox a device type describes a hardware model from one manufacturer, such as a 48-port switch, while a role describes what the device does, such as core switch or edge router. The same device type can serve different roles in different sites, and the same role can be filled by different hardware. Keeping type and role separate is what makes the inventory searchable by either question.",
      "syntax": "device = {\"type\": \"EX4300-48P\", \"manufacturer\": \"Juniper\", \"role\": \"core switch\"}",
      "exampleCode": "device = {\"type\": \"EX4300-48P\", \"manufacturer\": \"Juniper\", \"role\": \"core switch\"}\nprint(device[\"role\"])",
      "exampleLanguage": "python",
      "mistake": "Using the device type as the role, so a report cannot tell a core switch from an access switch of the same model.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Device Types, Manufacturers and Roles, but it does not work correctly.",
       "buggyCode": "devices = [(\"core-sw-01\", \"EX4300\"), (\"acc-sw-01\", \"EX4300\")]\nprint(devices[0][1] == devices[1][1])",
       "fixedCode": "devices = [(\"core-sw-01\", \"core switch\"), (\"acc-sw-01\", \"access switch\")]\nprint(devices[0][1] != devices[1][1])",
       "explanation": "Two switches can share a hardware model while serving different roles; only the role field distinguishes a core switch from an access switch."
      },
      "exercise": {
       "title": "Practise Device Types, Manufacturers and Roles",
       "type": "write-code",
       "instructions": "Count the devices by role and print each role with its count, sorted alphabetically by role.",
       "starterCode": "devices = [(\"core-sw-01\", \"core switch\"), (\"acc-sw-01\", \"access switch\"), (\"acc-sw-02\", \"access switch\"), (\"edge-rtr-01\", \"edge router\")]\n# TODO: count devices per role and print the counts sorted by role.\n",
       "solution": "devices = [(\"core-sw-01\", \"core switch\"), (\"acc-sw-01\", \"access switch\"), (\"acc-sw-02\", \"access switch\"), (\"edge-rtr-01\", \"edge router\")]\ncounts = {}\nfor _, role in devices:\n    counts[role] = counts.get(role, 0) + 1\nfor role in sorted(counts):\n    print(f\"{role}: {counts[role]}\")",
       "solutionExplanation": "The solution count the devices by role and print each role with its count, sorted alphabetically by role. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "access switch: 2\ncore switch: 1\nedge router: 1",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "access switch: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Device Types, Manufacturers and Roles is the key idea here: In NetBox a device type describes a hardware model from one manufacturer, such as a 48-port switch, while a role describes what the device does, such as core switch or edge router.",
        "approach": "Work through Device Types, Manufacturers and Roles step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-netbox-m1-l3",
      "slug": "netauto-sot-netbox-m1-l3",
      "title": "Devices, Interfaces and Cables",
      "concept": "A NetBox device owns interfaces, and a cable connects exactly two interfaces, which is how the physical topology is recorded. When both ends of a cable are recorded, NetBox can trace a path from a server through a switch to a router without anyone opening a rack. A cable with only one end recorded is a dangling connection that the model cannot trace.",
      "syntax": "link = (\"core-sw-01:xe-0/0/0\", \"edge-rtr-01:ge-0/0/0\")",
      "exampleCode": "link = (\"core-sw-01:xe-0/0/0\", \"edge-rtr-01:ge-0/0/0\")\nprint(link[0], \"<->\", link[1])",
      "exampleLanguage": "python",
      "mistake": "Recording a cable on one interface only and assuming the other end is obvious.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Devices, Interfaces and Cables, but it does not work correctly.",
       "buggyCode": "cable = {\"a\": \"core-sw-01:xe-0/0/0\", \"b\": None}\nprint(cable[\"b\"])",
       "fixedCode": "cable = {\"a\": \"core-sw-01:xe-0/0/0\", \"b\": \"edge-rtr-01:ge-0/0/0\"}\nprint(cable[\"b\"])",
       "explanation": "A cable needs both termination points recorded; with one end missing, no tool can trace the path through that link."
      },
      "exercise": {
       "title": "Check your understanding: Devices, Interfaces and Cables",
       "type": "multiple-choice",
       "instructions": "Which statement about Devices, Interfaces and Cables is correct?",
       "starterCode": "",
       "solution": "A NetBox device owns interfaces, and a cable connects exactly two interfaces, which is how the physical topology is recorded.",
       "solutionExplanation": "A NetBox device owns interfaces, and a cable connects exactly two interfaces, which is how the physical topology is recorded. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A NetBox device owns interfaces, and a cable connects exactly two interfaces, which is how the physical topology is recorded.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Devices, Interfaces and Cables from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A NetBox device owns cables directly, and interfaces are only used for IP addresses.",
        "A NetBox device owns interfaces, and a cable connects exactly two interfaces, which is how the physical topology is recorded.",
        "A cable in NetBox connects three interfaces at once, forming a triangle.",
        "Cables in NetBox are recorded only as free text, so the topology cannot be traced."
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-sot-netbox-m1-l4",
      "slug": "netauto-sot-netbox-m1-l4",
      "title": "IPAM Prefixes and IP Addresses",
      "concept": "In NetBox IPAM, a prefix is a block of addresses, and an IP address object records one address plus its status, role and the device or interface it belongs to. A prefix such as 10.0.0.0/24 nests inside larger prefixes, so a site prefix can be carved out of a regional supernet without overlap. An address that exists on a device but not in IPAM is invisible to every report.",
      "syntax": "prefix = \"10.0.0.0/24\"",
      "exampleCode": "import ipaddress\nprint(ipaddress.ip_network(\"10.0.0.0/24\").num_addresses)",
      "exampleLanguage": "python",
      "mistake": "Recording IP addresses as plain strings with no link to a prefix, so nothing can check whether an address is inside the right network.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate IPAM Prefixes and IP Addresses, but it does not work correctly.",
       "buggyCode": "address = \"10.0.0.300\"\nprint(address)",
       "fixedCode": "import ipaddress\nprint(ipaddress.ip_address(\"10.0.0.5\"))",
       "explanation": "A bare string cannot be validated, so 10.0.0.300 looks like an address; parsing it with the ipaddress module proves whether it is a real address inside a prefix."
      },
      "exercise": {
       "title": "Check your understanding: IPAM Prefixes and IP Addresses",
       "type": "multiple-choice",
       "instructions": "Which statement about IPAM Prefixes and IP Addresses is correct?",
       "starterCode": "",
       "solution": "In NetBox IPAM, a prefix is a block of addresses, and an IP address object records one address plus its status, role and the device or interface it belongs to.",
       "solutionExplanation": "In NetBox IPAM, a prefix is a block of addresses, and an IP address object records one address plus its status, role and the device or interface it belongs to. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "In NetBox IPAM, a prefix is a block of addresses, and an IP address object records one address plus its status, role and the device or interface it belongs to.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of IPAM Prefixes and IP Addresses from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "In NetBox IPAM, a prefix is a block of addresses, and an IP address object records one address plus its status, role and the device or interface it belongs to.",
        "In NetBox IPAM, a prefix is a single device and an IP address is the name of a site.",
        "In NetBox IPAM, prefixes cannot contain other prefixes and addresses are never linked to devices.",
        "In NetBox IPAM, IP addresses are stored only as text notes with no status or role."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-netbox-m1-l5",
      "slug": "netauto-sot-netbox-m1-l5",
      "title": "VLANs and VRFs",
      "concept": "A VLAN in NetBox belongs to a site and carries a numeric ID and a name, while a VRF is a separate routing table that keeps overlapping address space apart. The same VLAN ID can mean different networks in different sites, and the same prefix can appear in two VRFs without colliding. Confusing VLANs with VRFs is the fastest way to design a network that cannot be built.",
      "syntax": "vlan = {\"id\": 10, \"name\": \"users\", \"site\": \"hq\"}",
      "exampleCode": "vlan = {\"id\": 10, \"name\": \"users\", \"site\": \"hq\"}\nprint(vlan[\"id\"], vlan[\"name\"])",
      "exampleLanguage": "python",
      "mistake": "Reusing the same VLAN ID for two different networks in one site, so devices on both networks hear each other's traffic.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate VLANs and VRFs, but it does not work correctly.",
       "buggyCode": "vlans = {10: \"users\", 10: \"servers\"}\nprint(vlans[10])",
       "fixedCode": "vlans = {10: \"users\", 20: \"servers\"}\nprint(vlans[10], vlans[20])",
       "explanation": "A dictionary silently drops the first VLAN 10 when the key is repeated, which mirrors the real problem: one VLAN ID in one site can only be one network."
      },
      "exercise": {
       "title": "Practise VLANs and VRFs",
       "type": "write-code",
       "instructions": "Check whether 10.10.0.5 falls inside 10.10.0.0/24, then print every VLAN ID with its prefix, sorted by VLAN ID.",
       "starterCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.10.0.0/24\")\nvlans = {10: \"10.10.0.0/24\", 20: \"10.20.0.0/24\"}\naddress = ipaddress.ip_address(\"10.10.0.5\")\n# TODO: check the address against the network and print the VLAN table.\n",
       "solution": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.10.0.0/24\")\nvlans = {10: \"10.10.0.0/24\", 20: \"10.20.0.0/24\"}\naddress = ipaddress.ip_address(\"10.10.0.5\")\nprint(f\"Address {address} in 10.10.0.0/24: {address in network}\")\nfor vid, prefix in sorted(vlans.items()):\n    print(f\"VLAN {vid}: {prefix}\")",
       "solutionExplanation": "The solution check whether 10.10.0.5 falls inside 10.10.0.0/24, then print every VLAN ID with its prefix, sorted by VLAN ID. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Address 10.10.0.5 in 10.10.0.0/24: True\nVLAN 10: 10.10.0.0/24\nVLAN 20: 10.20.0.0/24",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "VLAN 20: 10.20.0.0/24",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "VLANs and VRFs is the key idea here: A VLAN in NetBox belongs to a site and carries a numeric ID and a name, while a VRF is a separate routing table that keeps overlapping address space apart.",
        "approach": "Work through VLANs and VRFs step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-netbox-m2",
    "title": "NetBox Data Model in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-sot-netbox-m2-l6",
      "slug": "netauto-sot-netbox-m2-l6",
      "title": "Tags and Custom Fields",
      "concept": "Tags are free-form labels such as critical or wan that can be attached to any NetBox object, while custom fields are typed extra attributes such as a support contract date defined per object type. Tags answer ad-hoc questions such as which devices are critical, and custom fields answer structured ones such as which contracts expire this quarter. Both extend the model without changing its core tables.",
      "syntax": "device = {\"hostname\": \"core-sw-01\", \"tags\": [\"core\", \"critical\"]}",
      "exampleCode": "device = {\"hostname\": \"core-sw-01\", \"tags\": [\"core\", \"critical\"]}\nprint(\"critical\" in device[\"tags\"])",
      "exampleLanguage": "python",
      "mistake": "Using tags for structured data such as contract dates, which cannot be sorted or compared as text labels.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Tags and Custom Fields, but it does not work correctly.",
       "buggyCode": "device = {\"tags\": [\"contract-2027-01-01\"]}\nprint(device[\"tags\"])",
       "fixedCode": "device = {\"custom_fields\": {\"contract_expiry\": \"2027-01-01\"}}\nprint(device[\"custom_fields\"][\"contract_expiry\"])",
       "explanation": "A date hidden inside a tag string cannot be compared or sorted reliably; a typed custom field stores the date as a date so expiry reports work."
      },
      "exercise": {
       "title": "Practise Tags and Custom Fields",
       "type": "write-code",
       "instructions": "Print every device that carries the 'core' tag, one per line.",
       "starterCode": "devices = [\n    {\"hostname\": \"core-sw-01\", \"tags\": [\"core\", \"critical\"]},\n    {\"hostname\": \"acc-sw-01\", \"tags\": [\"access\"]},\n    {\"hostname\": \"edge-rtr-01\", \"tags\": [\"core\", \"wan\"]},\n]\n# TODO: print the hostnames of devices tagged 'core'.\n",
       "solution": "devices = [\n    {\"hostname\": \"core-sw-01\", \"tags\": [\"core\", \"critical\"]},\n    {\"hostname\": \"acc-sw-01\", \"tags\": [\"access\"]},\n    {\"hostname\": \"edge-rtr-01\", \"tags\": [\"core\", \"wan\"]},\n]\nfor d in devices:\n    if \"core\" in d[\"tags\"]:\n        print(f\"Core device: {d['hostname']}\")",
       "solutionExplanation": "The solution print every device that carries the 'core' tag, one per line. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Core device: core-sw-01\nCore device: edge-rtr-01",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Core device: edge-rtr-01",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Tags and Custom Fields is the key idea here: Tags are free-form labels such as critical or wan that can be attached to any NetBox object, while custom fields are typed extra attributes such as a support contract date defined per object type.",
        "approach": "Work through Tags and Custom Fields step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-netbox-m2-l7",
      "slug": "netauto-sot-netbox-m2-l7",
      "title": "Tenants and Contacts",
      "concept": "Tenants group NetBox objects by the team or customer that owns them, so reports and permissions can be scoped to one tenant without mixing in another team's devices. Contacts record the people responsible for a tenant or a site, so an incident at 3 a.m. has a name and a phone number attached. Tenancy is how one NetBox instance safely serves many teams.",
      "syntax": "tenant = {\"name\": \"network-ops\", \"devices\": [\"core-sw-01\"]}",
      "exampleCode": "tenant = {\"name\": \"network-ops\", \"devices\": [\"core-sw-01\"]}\nprint(tenant[\"name\"])",
      "exampleLanguage": "python",
      "mistake": "Leaving every object unassigned to a tenant, so no report can say which team owns a device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Tenants and Contacts, but it does not work correctly.",
       "buggyCode": "device = {\"hostname\": \"core-sw-01\", \"tenant\": None}\nprint(device[\"tenant\"])",
       "fixedCode": "device = {\"hostname\": \"core-sw-01\", \"tenant\": \"network-ops\"}\nprint(device[\"tenant\"])",
       "explanation": "An unassigned tenant means ownership is unknown; assigning the tenant makes the device appear in that team's reports and permission scope."
      },
      "exercise": {
       "title": "Check your understanding: Tenants and Contacts",
       "type": "multiple-choice",
       "instructions": "Which statement about Tenants and Contacts is correct?",
       "starterCode": "",
       "solution": "Tenants group NetBox objects by the team or customer that owns them, so reports and permissions can be scoped to one tenant without mixing in another team's devices.",
       "solutionExplanation": "Tenants group NetBox objects by the team or customer that owns them, so reports and permissions can be scoped to one tenant without mixing in another team's devices. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Tenants group NetBox objects by the team or customer that owns them, so reports and permissions can be scoped to one tenant without mixing in another team's devices.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Tenants and Contacts from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Tenants group NetBox objects by the team or customer that owns them, so reports and permissions can be scoped to one tenant without mixing in another team's devices.",
        "Tenants are physical racks that hold devices in a data centre.",
        "Tenants are a kind of cable used to connect two sites together.",
        "Tenants replace sites entirely, so a device needs either a tenant or a site but never both."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-netbox-m2-l8",
      "slug": "netauto-sot-netbox-m2-l8",
      "title": "Circuits and Providers",
      "concept": "A circuit in NetBox records a connection from a provider, with a circuit ID, type and termination points, so the team knows exactly which provider link serves each site. Circuits link to cables at each end, which means a provider outage can be traced from the circuit to the affected sites in one query. Without circuits, provider links are just rumours in an inbox.",
      "syntax": "circuit = {\"cid\": \"CIR-1001\", \"provider\": \"ExampleTel\", \"type\": \"Internet\"}",
      "exampleCode": "circuit = {\"cid\": \"CIR-1001\", \"provider\": \"ExampleTel\", \"type\": \"Internet\"}\nprint(circuit[\"cid\"])",
      "exampleLanguage": "python",
      "mistake": "Recording a provider link as a free-text note on a site instead of a circuit object, so it cannot be linked to cables or terminations.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Circuits and Providers, but it does not work correctly.",
       "buggyCode": "site = {\"name\": \"hq\", \"notes\": \"internet link from ExampleTel\"}\nprint(site[\"notes\"])",
       "fixedCode": "circuit = {\"cid\": \"CIR-1001\", \"provider\": \"ExampleTel\", \"type\": \"Internet\"}\nprint(circuit[\"cid\"])",
       "explanation": "A note cannot be linked to terminations or queried by provider; a circuit object records the link as structured data that other objects can reference."
      },
      "exercise": {
       "title": "Check your understanding: Circuits and Providers",
       "type": "multiple-choice",
       "instructions": "Which statement about Circuits and Providers is correct?",
       "starterCode": "",
       "solution": "A circuit in NetBox records a connection from a provider, with a circuit ID, type and termination points, so the team knows exactly which provider link serves each site.",
       "solutionExplanation": "A circuit in NetBox records a connection from a provider, with a circuit ID, type and termination points, so the team knows exactly which provider link serves each site. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A circuit in NetBox records a connection from a provider, with a circuit ID, type and termination points, so the team knows exactly which provider link serves each site.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Circuits and Providers from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A circuit in NetBox records a connection from a provider, with a circuit ID, type and termination points, so the team knows exactly which provider link serves each site.",
        "A circuit in NetBox is a type of VLAN used only inside one rack.",
        "A circuit in NetBox is a user account that can log into the web UI.",
        "A circuit in NetBox is a backup file created automatically every night."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-netbox-m2-l9",
      "slug": "netauto-sot-netbox-m2-l9",
      "title": "The NetBox API at a Glance",
      "concept": "The NetBox REST API exposes every object over HTTP at paths like /api/dcim/devices/, and each request must carry an API token in the Authorization header. The same API powers the web UI, so anything visible in the browser can be read or changed by a script. Running the examples in this lesson needs a real NetBox instance, such as a local install or a lab server, because there is no NetBox server in this learning environment.",
      "syntax": "import pynetbox\napi = pynetbox.api(\"https://netbox.example.local\", token=\"YOUR-TOKEN\")",
      "exampleCode": "import pynetbox\napi = pynetbox.api(\"https://netbox.example.local\", token=\"YOUR-TOKEN\")\nprint(api.dcim.devices.all())",
      "exampleLanguage": "python",
      "mistake": "Hard-coding a real API token into a script and committing it to Git.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The NetBox API at a Glance, but it does not work correctly.",
       "buggyCode": "import pynetbox\napi = pynetbox.api(\"https://netbox.example.local\", token=\"abc123-real-token\")",
       "fixedCode": "import os, pynetbox\napi = pynetbox.api(\"https://netbox.example.local\", token=os.environ[\"NETBOX_TOKEN\"])",
       "explanation": "A token committed to Git is exposed to everyone with repository access; reading it from an environment variable keeps the secret out of the code."
      },
      "exercise": {
       "title": "Practise The NetBox API at a Glance",
       "type": "write-code",
       "instructions": "Build the request for fetching one device by name: print the method and full path with its query string, print the Authorization header name with the token source, and print a note that this runs against a real NetBox instance.",
       "starterCode": "request = {\"method\": \"GET\", \"path\": \"/api/dcim/devices/\", \"params\": {\"name\": \"core-sw-01\"}}\n# TODO: print the request line, the auth header, and the note.\n",
       "solution": "request = {\"method\": \"GET\", \"path\": \"/api/dcim/devices/\", \"params\": {\"name\": \"core-sw-01\"}}\nquery = \"&\".join(f\"{k}={v}\" for k, v in sorted(request[\"params\"].items()))\nprint(f\"{request['method']} {request['path']}?{query}\")\nprint(\"Header: Authorization: Token <from NETBOX_TOKEN>\")\nprint(\"Note: send this request to a real NetBox instance; no server is contacted here.\")",
       "solutionExplanation": "The solution build the request for fetching one device by name: print the method and full path with its query string, print the Authorization header name with the token source, and print a note that this runs against a real NetBox instance. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GET /api/dcim/devices/?name=core-sw-01\nHeader: Authorization: Token <from NETBOX_TOKEN>\nNote: send this request to a real NetBox instance; no server is contacted here.",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Header: Authorization: Token <from NETBOX_TOKEN>",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The NetBox API at a Glance is the key idea here: The NetBox REST API exposes every object over HTTP at paths like /api/dcim/devices/, and each request must carry an API token in the Authorization header.",
        "approach": "Work through The NetBox API at a Glance step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-netbox-m2-l10",
      "slug": "netauto-sot-netbox-m2-l10",
      "title": "Modelling a Branch Office in NetBox",
      "concept": "Modelling a branch office means creating one site, its devices with roles and types, one prefix for its users, and its VLANs, all linked together. The branch model is small enough to check by hand and complete enough to practise every object type in NetBox. A branch modelled well becomes the template every later branch copies.",
      "syntax": "branch = {\"site\": \"branch-a\", \"devices\": [\"acc-sw-01\"], \"prefix\": \"10.20.0.0/24\"}",
      "exampleCode": "branch = {\"site\": \"branch-a\", \"devices\": [\"acc-sw-01\", \"acc-sw-02\"], \"prefix\": \"10.20.0.0/24\"}\nprint(branch[\"site\"])",
      "exampleLanguage": "python",
      "mistake": "Modelling the branch devices but forgetting the prefix, so the branch has switches and no addresses to give out.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Modelling a Branch Office in NetBox, but it does not work correctly.",
       "buggyCode": "branch = {\"site\": \"branch-a\", \"devices\": [\"acc-sw-01\"]}\nprint(branch.get(\"prefix\"))",
       "fixedCode": "branch = {\"site\": \"branch-a\", \"devices\": [\"acc-sw-01\"], \"prefix\": \"10.20.0.0/24\"}\nprint(branch[\"prefix\"])",
       "explanation": "A branch without a prefix has no address space for its users; the model is only complete when the site, devices, prefix and VLANs are all recorded."
      },
      "exercise": {
       "title": "Practise Modelling a Branch Office in NetBox",
       "type": "write-code",
       "instructions": "Print a summary of the branch model: the site name, the device count, the prefix, and the VLAN list.",
       "starterCode": "branch = {\"site\": \"branch-a\", \"devices\": [\"acc-sw-01\", \"acc-sw-02\"], \"prefix\": \"10.20.0.0/24\", \"vlans\": [20, 21]}\n# TODO: print the branch summary.\n",
       "solution": "branch = {\"site\": \"branch-a\", \"devices\": [\"acc-sw-01\", \"acc-sw-02\"], \"prefix\": \"10.20.0.0/24\", \"vlans\": [20, 21]}\nprint(f\"Site: {branch['site']}\")\nprint(f\"Devices: {len(branch['devices'])}\")\nprint(f\"Prefix: {branch['prefix']}\")\nprint(f\"VLANs: {', '.join(str(v) for v in branch['vlans'])}\")",
       "solutionExplanation": "The solution print a summary of the branch model: the site name, the device count, the prefix, and the VLAN list. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Site: branch-a\nDevices: 2\nPrefix: 10.20.0.0/24\nVLANs: 20, 21",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "VLANs: 20, 21",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Modelling a Branch Office in NetBox is the key idea here: Modelling a branch office means creating one site, its devices with roles and types, one prefix for its users, and its VLANs, all linked together.",
        "approach": "Work through Modelling a Branch Office in NetBox step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Model a Site in NetBox Style",
   "type": "write-code",
   "instructions": "Build a small NetBox-style model with a site, devices, a prefix and VLANs, validate that every device has a site and a role, and print an inventory report with counts.",
   "starterCode": "model = {\n    \"site\": \"hq\",\n    \"devices\": [\n        {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\"},\n        {\"hostname\": \"acc-sw-01\", \"role\": \"access switch\", \"site\": \"hq\"},\n        {\"hostname\": \"edge-rtr-01\", \"role\": \"\", \"site\": \"hq\"},\n    ],\n    \"prefix\": \"10.0.0.0/24\",\n    \"vlans\": [10, 20],\n}\n# TODO: validate the devices and print the inventory report.\n",
   "solution": "model = {\n    \"site\": \"hq\",\n    \"devices\": [\n        {\"hostname\": \"core-sw-01\", \"role\": \"core switch\", \"site\": \"hq\"},\n        {\"hostname\": \"acc-sw-01\", \"role\": \"access switch\", \"site\": \"hq\"},\n        {\"hostname\": \"edge-rtr-01\", \"role\": \"\", \"site\": \"hq\"},\n    ],\n    \"prefix\": \"10.0.0.0/24\",\n    \"vlans\": [10, 20],\n}\nprint(f\"Site: {model['site']}\")\nprint(f\"Prefix: {model['prefix']}\")\nprint(f\"VLANs: {len(model['vlans'])}\")\nproblems = 0\nfor d in model[\"devices\"]:\n    if not d.get(\"role\") or not d.get(\"site\"):\n        problems += 1\n        print(f\"{d['hostname']}: missing role or site\")\n    else:\n        print(f\"{d['hostname']}: OK\")\nprint(f\"Devices: {len(model['devices'])}\")\nprint(f\"Devices with problems: {problems}\")",
   "solutionExplanation": "The solution build a small NetBox-style model with a site, devices, a prefix and VLANs, validate that every device has a site and a role, and print an inventory report with counts. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Site: hq\nPrefix: 10.0.0.0/24\nVLANs: 2\ncore-sw-01: OK\nacc-sw-01: OK\nedge-rtr-01: missing role or site\nDevices: 3\nDevices with problems: 1",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Devices with problems: 1",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "NetBox Data Model capstone is the key idea here: In NetBox a device type describes a hardware model from one manufacturer, while a role describes what the device does.",
    "approach": "Work through NetBox Data Model capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Model a Site in NetBox Style",
   "description": "Build a complete NetBox-style model of one site — devices, roles, prefix and VLANs — validate it, and print an inventory report.",
   "requirements": [
    "Model one site with at least three devices",
    "Every device carries a role and a site",
    "Include one prefix and at least two VLANs",
    "Report every device that fails validation and print totals"
   ],
   "rubric": [
    "All model objects are linked: devices belong to the site",
    "Validation names each incomplete device",
    "Counts for devices, prefix and VLANs are correct",
    "The report is readable without extra explanation"
   ]
  }
 },
 {
  "id": "netauto-sot-pynetbox",
  "slug": "netauto-sot-pynetbox",
  "language": "python",
  "category": "devops",
  "title": "pynetbox in Practice",
  "description": "Use pynetbox to talk to the NetBox API: connecting with a token, reading and filtering devices, creating and updating objects idempotently, IPAM lookups, error handling and sync plans.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "pynetbox Api object",
   "API tokens",
   "Reading devices",
   "Filtering",
   "Creating objects",
   "Idempotent updates",
   "IPAM lookups",
   "API error handling",
   "Sync plans"
  ],
  "prerequisites": [
   "netauto-sot-foundations",
   "netauto-sot-netbox"
  ],
  "analogy": "Learning {topic} is like learning to order from a menu in another language: once you know the phrases for read, create and update, you can ask the kitchen for anything.",
  "modules": [
   {
    "id": "netauto-sot-pynetbox-m1",
    "title": "pynetbox in Practice Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-pynetbox-m1-l1",
      "slug": "netauto-sot-pynetbox-m1-l1",
      "title": "Connecting to NetBox with pynetbox",
      "concept": "pynetbox connects to NetBox by creating an Api object with the NetBox URL and an API token, and every call it makes is an HTTPS request to the NetBox REST API. The token identifies the user, so the script can only do what that user is allowed to do. Running the examples in this lesson needs a real NetBox instance, such as a local install or a lab server, because there is no NetBox server in this learning environment.",
      "syntax": "import pynetbox\napi = pynetbox.api(URL, token=TOKEN)",
      "exampleCode": "import pynetbox\napi = pynetbox.api(\"https://netbox.example.local\", token=\"YOUR-TOKEN\")\nprint(api)",
      "exampleLanguage": "python",
      "mistake": "Creating the Api object without a token and wondering why every call is rejected.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Connecting to NetBox with pynetbox, but it does not work correctly.",
       "buggyCode": "import pynetbox\napi = pynetbox.api(\"https://netbox.example.local\")\nprint(api.dcim.devices.all())",
       "fixedCode": "import pynetbox\napi = pynetbox.api(\"https://netbox.example.local\", token=\"YOUR-TOKEN\")\nprint(api.dcim.devices.all())",
       "explanation": "Without a token the request is unauthenticated and NetBox rejects it; the Api object must be created with a valid API token."
      },
      "exercise": {
       "title": "Practise Connecting to NetBox with pynetbox",
       "type": "write-code",
       "instructions": "Validate a local example of connection settings: print the NetBox URL, whether a token is provided, and whether the settings are ready to connect, then print a note that connecting needs a real NetBox instance.",
       "starterCode": "settings = {\"url\": \"https://netbox.example.local\", \"token\": \"TOKEN-FROM-ENVIRONMENT\"}\n# TODO: validate the settings and print the results.\n",
       "solution": "settings = {\"url\": \"https://netbox.example.local\", \"token\": \"TOKEN-FROM-ENVIRONMENT\"}\nprint(f\"NetBox URL: {settings['url']}\")\nprint(f\"Token provided: {'yes' if settings['token'] else 'no'}\")\nready = settings[\"url\"].startswith(\"https://\") and bool(settings[\"token\"])\nprint(f\"Ready to connect: {'yes' if ready else 'no'}\")\nprint(\"Note: connecting needs a real NetBox instance; no server is contacted here.\")",
       "solutionExplanation": "The solution validate a local example of connection settings: print the NetBox URL, whether a token is provided, and whether the settings are ready to connect, then print a note that connecting needs a real NetBox instance. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "NetBox URL: https://netbox.example.local\nToken provided: yes\nReady to connect: yes\nNote: connecting needs a real NetBox instance; no server is contacted here.",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Ready to connect: yes",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Connecting to NetBox with pynetbox is the key idea here: pynetbox connects to NetBox by creating an Api object with the NetBox URL and an API token, and every call it makes is an HTTPS request to the NetBox REST API.",
        "approach": "Work through Connecting to NetBox with pynetbox step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pynetbox-m1-l2",
      "slug": "netauto-sot-pynetbox-m1-l2",
      "title": "Reading Devices with the API",
      "concept": "Calling the devices all method returns every device object, and each object carries attributes such as name, device_role and site that mirror the fields in the NetBox web UI. The objects are live: changing an attribute and calling save() writes the change back to NetBox. Reading first and writing second is the safe order for any automation script.",
      "syntax": "devices = api.dcim.devices.all()\nfor d in devices:\n    print(d.name)",
      "exampleCode": "devices = api.dcim.devices.all()\nfor d in devices:\n    print(d.name, d.device_role)",
      "exampleLanguage": "python",
      "mistake": "Assuming .all() returns dictionaries and indexing with d[\"name\"] instead of reading the attribute.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reading Devices with the API, but it does not work correctly.",
       "buggyCode": "devices = api.dcim.devices.all()\nprint(devices[0][\"name\"])",
       "fixedCode": "devices = api.dcim.devices.all()\nprint(devices[0].name)",
       "explanation": "pynetbox returns objects with attributes, not dictionaries, so the name is read as d.name; dictionary indexing raises an error."
      },
      "exercise": {
       "title": "Practise Reading Devices with the API",
       "type": "write-code",
       "instructions": "Model one device record locally as a dictionary with the same fields the API exposes — name, device role, site and status — and print each field on its own line.",
       "starterCode": "device = {\"name\": \"core-sw-01\", \"device_role\": \"core switch\", \"site\": \"hq\", \"status\": \"active\"}\n# TODO: print the device name, role, site and status.\n",
       "solution": "device = {\"name\": \"core-sw-01\", \"device_role\": \"core switch\", \"site\": \"hq\", \"status\": \"active\"}\nprint(f\"Device: {device['name']}\")\nprint(f\"Role: {device['device_role']}\")\nprint(f\"Site: {device['site']}\")\nprint(f\"Status: {device['status']}\")",
       "solutionExplanation": "The solution model one device record locally as a dictionary with the same fields the API exposes — name, device role, site and status — and print each field on its own line. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Device: core-sw-01\nRole: core switch\nSite: hq\nStatus: active",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Status: active",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Reading Devices with the API is the key idea here: Calling the devices all method returns every device object, and each object carries attributes such as name, device role and site that mirror the fields in the NetBox web UI.",
        "approach": "Work through Reading Devices with the API step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pynetbox-m1-l3",
      "slug": "netauto-sot-pynetbox-m1-l3",
      "title": "Filtering and Searching Objects",
      "concept": "pynetbox filters with keyword arguments, so a filter call asking for one role in one site returns only the devices matching both conditions. Filtering on the server is far cheaper than fetching everything and filtering locally, especially once the inventory holds thousands of objects. The filter names match the API field names, not the labels shown in the web UI.",
      "syntax": "api.dcim.devices.filter(role=\"core-switch\", site=\"hq\")",
      "exampleCode": "core = api.dcim.devices.filter(role=\"core-switch\")\nprint(len(core))",
      "exampleLanguage": "python",
      "mistake": "Fetching every device with .all() and filtering in Python when the API could have filtered on the server.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Filtering and Searching Objects, but it does not work correctly.",
       "buggyCode": "devices = api.dcim.devices.all()\ncore = [d for d in devices if d.device_role.slug == \"core-switch\"]",
       "fixedCode": "core = api.dcim.devices.filter(role=\"core-switch\")",
       "explanation": "Filtering locally downloads the whole inventory on every run; passing the filter to the API lets NetBox return only the matching devices."
      },
      "exercise": {
       "title": "Check your understanding: Filtering and Searching Objects",
       "type": "multiple-choice",
       "instructions": "Which statement about Filtering and Searching Objects is correct?",
       "starterCode": "",
       "solution": "pynetbox filters with keyword arguments, so a filter call asking for one role in one site returns only the devices matching both conditions.",
       "solutionExplanation": "pynetbox filters with keyword arguments, so a filter call asking for one role in one site returns only the devices matching both conditions. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "pynetbox filters with keyword arguments, so a filter call asking for one role in one site returns only the devices matching both conditions.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Filtering and Searching Objects from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "pynetbox filters with keyword arguments, so a filter call asking for one role in one site returns only the devices matching both conditions.",
        "pynetbox cannot filter at all, so every script must fetch all objects and sort them by hand.",
        "pynetbox filters by editing the NetBox database directly with SQL statements.",
        "pynetbox filters only work on device names, never on roles or sites."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-pynetbox-m1-l4",
      "slug": "netauto-sot-pynetbox-m1-l4",
      "title": "Creating Objects Safely",
      "concept": "Creating a NetBox object with pynetbox means building a dictionary of its fields and passing it to the create method, and NetBox validates the fields before saving anything. A create call that references a site or role that does not exist fails cleanly instead of creating a broken object. The safe pattern is to validate the payload locally first, then create, then read the object back to confirm it exists.",
      "syntax": "api.dcim.devices.create({\"name\": \"acc-sw-09\", \"site\": 1})",
      "exampleCode": "payload = {\"name\": \"acc-sw-09\", \"device_type\": 3, \"device_role\": 2, \"site\": 1}\napi.dcim.devices.create(payload)",
      "exampleLanguage": "python",
      "mistake": "Creating the same device twice because the script never checks whether it already exists.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Creating Objects Safely, but it does not work correctly.",
       "buggyCode": "api.dcim.devices.create({\"name\": \"acc-sw-09\", \"site\": 1})\napi.dcim.devices.create({\"name\": \"acc-sw-09\", \"site\": 1})",
       "fixedCode": "existing = api.dcim.devices.filter(name=\"acc-sw-09\")\nif not existing:\n    api.dcim.devices.create({\"name\": \"acc-sw-09\", \"site\": 1})",
       "explanation": "Creating blindly makes a duplicate when the script runs twice; checking for the device first makes the script safe to re-run."
      },
      "exercise": {
       "title": "Practise Creating Objects Safely",
       "type": "write-code",
       "instructions": "Build the create payload for a new device as a dictionary, check that every required field is present, print whether the payload is valid, then print the payload as sorted JSON.",
       "starterCode": "import json\npayload = {\"name\": \"acc-sw-09\", \"device_type\": 3, \"device_role\": 2, \"site\": 1, \"status\": \"active\"}\nrequired = [\"name\", \"device_type\", \"device_role\", \"site\"]\n# TODO: validate the payload and print it as sorted JSON.\n",
       "solution": "import json\npayload = {\"name\": \"acc-sw-09\", \"device_type\": 3, \"device_role\": 2, \"site\": 1, \"status\": \"active\"}\nrequired = [\"name\", \"device_type\", \"device_role\", \"site\"]\nmissing = [k for k in required if k not in payload]\nprint(\"Payload valid\" if not missing else f\"Missing: {missing}\")\nprint(json.dumps(payload, sort_keys=True))",
       "solutionExplanation": "The solution build the create payload for a new device as a dictionary, check that every required field is present, print whether the payload is valid, then print the payload as sorted JSON. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Payload valid\n{\"device_role\": 2, \"device_type\": 3, \"name\": \"acc-sw-09\", \"site\": 1, \"status\": \"active\"}",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Payload valid",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Creating Objects Safely is the key idea here: Creating a NetBox object with pynetbox means building a dictionary of its fields and passing it to the create method, and NetBox validates the fields before saving anything.",
        "approach": "Work through Creating Objects Safely step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pynetbox-m1-l5",
      "slug": "netauto-sot-pynetbox-m1-l5",
      "title": "Updating Objects and Idempotency",
      "concept": "An idempotent update is one that can run twice with the same result, which pynetbox achieves by comparing the desired fields with the current object and only writing what changed. When nothing changed, the script reports no changes instead of writing the same values again. Idempotency is what makes a script safe to run on a schedule.",
      "syntax": "device.status = \"planned\"\ndevice.save()",
      "exampleCode": "device = api.dcim.devices.get(name=\"acc-sw-01\")\ndevice.status = \"planned\"\ndevice.save()",
      "exampleLanguage": "python",
      "mistake": "Writing every field on every run, so the audit log fills with changes that changed nothing.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Updating Objects and Idempotency, but it does not work correctly.",
       "buggyCode": "device = api.dcim.devices.get(name=\"acc-sw-01\")\ndevice.status = \"active\"\ndevice.save()",
       "fixedCode": "device = api.dcim.devices.get(name=\"acc-sw-01\")\nif device.status != \"planned\":\n    device.status = \"planned\"\n    device.save()",
       "explanation": "Saving unconditionally writes an audit entry even when the value is already correct; comparing first and saving only on a real change keeps the script idempotent."
      },
      "exercise": {
       "title": "Practise Updating Objects and Idempotency",
       "type": "write-code",
       "instructions": "Compare the desired device fields with the current ones, print each field that would change as 'old -> new', then print how many changes are needed.",
       "starterCode": "current = {\"name\": \"acc-sw-01\", \"status\": \"active\", \"role\": \"access switch\"}\ndesired = {\"name\": \"acc-sw-01\", \"status\": \"planned\", \"role\": \"access switch\"}\n# TODO: find the fields that differ and print the changes.\n",
       "solution": "current = {\"name\": \"acc-sw-01\", \"status\": \"active\", \"role\": \"access switch\"}\ndesired = {\"name\": \"acc-sw-01\", \"status\": \"planned\", \"role\": \"access switch\"}\nchanges = {k: v for k, v in desired.items() if current.get(k) != v}\nfor k in sorted(changes):\n    print(f\"Change {k}: {current[k]} -> {changes[k]}\")\nprint(f\"Changes needed: {len(changes)}\")",
       "solutionExplanation": "The solution compare the desired device fields with the current ones, print each field that would change as 'old -> new', then print how many changes are needed. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Change status: active -> planned\nChanges needed: 1",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Changes needed: 1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Updating Objects and Idempotency is the key idea here: An idempotent update is one that can run twice with the same result, which pynetbox achieves by comparing the desired fields with the current object and only writing what changed.",
        "approach": "Work through Updating Objects and Idempotency step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-pynetbox-m2",
    "title": "pynetbox in Practice in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-sot-pynetbox-m2-l6",
      "slug": "netauto-sot-pynetbox-m2-l6",
      "title": "IPAM Lookups in Code",
      "concept": "An IPAM lookup finds the next free address in a prefix by listing the usable hosts and skipping the ones already recorded in NetBox. The lookup must run against the source of truth, not against a guess, because two scripts allocating from the same prefix at the same time can otherwise hand out the same address. Allocating through the API keeps the assignment and the record in one step.",
      "syntax": "network = ipaddress.ip_network(\"10.0.1.0/29\")",
      "exampleCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.0.1.0/29\")\nprint(list(network.hosts())[0])",
      "exampleLanguage": "python",
      "mistake": "Picking the first host address of a prefix without checking whether it is already used.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate IPAM Lookups in Code, but it does not work correctly.",
       "buggyCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.0.1.0/29\")\nprint(list(network.hosts())[0])",
       "fixedCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.0.1.0/29\")\nused = {\"10.0.1.1\"}\nfree = next(str(h) for h in network.hosts() if str(h) not in used)\nprint(free)",
       "explanation": "The first host may already be assigned, so the lookup must skip used addresses and return the first free one."
      },
      "exercise": {
       "title": "Practise IPAM Lookups in Code",
       "type": "write-code",
       "instructions": "Find the first free host address in 10.0.1.0/29 given the used set, print it, and print how many usable addresses the prefix has.",
       "starterCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.0.1.0/29\")\nused = {\"10.0.1.1\", \"10.0.1.2\", \"10.0.1.3\"}\n# TODO: find the first free host address and count the usable hosts.\n",
       "solution": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.0.1.0/29\")\nused = {\"10.0.1.1\", \"10.0.1.2\", \"10.0.1.3\"}\nfree = None\nfor host in network.hosts():\n    if str(host) not in used:\n        free = str(host)\n        break\nprint(f\"Next free address: {free}\")\nprint(f\"Usable addresses: {len(list(network.hosts()))}\")",
       "solutionExplanation": "The solution find the first free host address in 10.0.1.0/29 given the used set, print it, and print how many usable addresses the prefix has. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Next free address: 10.0.1.4\nUsable addresses: 6",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Usable addresses: 6",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "IPAM Lookups in Code is the key idea here: An IPAM lookup finds the next free address in a prefix by listing the usable hosts and skipping the ones already recorded in NetBox.",
        "approach": "Work through IPAM Lookups in Code step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pynetbox-m2-l7",
      "slug": "netauto-sot-pynetbox-m2-l7",
      "title": "Handling API Errors",
      "concept": "When NetBox rejects a request, pynetbox raises an exception carrying the HTTP status and the error detail, so a script should catch it, log the detail and stop instead of assuming the change worked. A 400 means the data was invalid, a 403 means the token lacks permission, and a 404 means the referenced object does not exist. Scripts that ignore errors report success for changes that never happened.",
      "syntax": "try:\n    api.dcim.devices.create(payload)\nexcept Exception as e:\n    print(e)",
      "exampleCode": "try:\n    api.dcim.devices.create({\"name\": \"x\"})\nexcept Exception as e:\n    print(f\"Failed: {e}\")",
      "exampleLanguage": "python",
      "mistake": "Letting an exception crash the script mid-run, leaving half the changes applied and half skipped.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handling API Errors, but it does not work correctly.",
       "buggyCode": "for payload in payloads:\n    api.dcim.devices.create(payload)",
       "fixedCode": "for payload in payloads:\n    try:\n        api.dcim.devices.create(payload)\n    except Exception as e:\n        print(f\"Failed {payload['name']}: {e}\")",
       "explanation": "One bad payload should not silently stop the whole run or crash it; catching the error per object logs the failure and lets the script report exactly what succeeded."
      },
      "exercise": {
       "title": "Check your understanding: Handling API Errors",
       "type": "multiple-choice",
       "instructions": "Which statement about Handling API Errors is correct?",
       "starterCode": "",
       "solution": "When NetBox rejects a request, pynetbox raises an exception carrying the HTTP status and the error detail, so a script should catch it, log the detail and stop instead of assuming the change worked.",
       "solutionExplanation": "When NetBox rejects a request, pynetbox raises an exception carrying the HTTP status and the error detail, so a script should catch it, log the detail and stop instead of assuming the change worked. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "When NetBox rejects a request, pynetbox raises an exception carrying the HTTP status and the error detail, so a script should catch it, log the detail and stop instead of assuming the change worked.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Handling API Errors from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "When NetBox rejects a request, pynetbox raises an exception carrying the HTTP status and the error detail, so a script should catch it, log the detail and stop instead of assuming the change worked.",
        "When NetBox rejects a request, pynetbox silently fixes the data and retries forever.",
        "When NetBox rejects a request, pynetbox returns a success message anyway.",
        "NetBox never rejects a request, so pynetbox scripts never need error handling."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-pynetbox-m2-l8",
      "slug": "netauto-sot-pynetbox-m2-l8",
      "title": "Tokens and Permissions",
      "concept": "A NetBox API token belongs to one user and inherits that user's permissions, so a token for a read-only user cannot create devices no matter what the script asks for. Tokens should be scoped to the smallest permission the job needs, and a token that is leaked must be revoked and replaced. Treating tokens as passwords that can be shared is how a small leak becomes a large incident.",
      "syntax": "api = pynetbox.api(URL, token=os.environ[\"NETBOX_TOKEN\"])",
      "exampleCode": "import os\ntoken = os.environ[\"NETBOX_TOKEN\"]\nprint(\"token set:\", bool(token))",
      "exampleLanguage": "python",
      "mistake": "Sharing one admin token across every script, so a compromised script can do anything in NetBox.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Tokens and Permissions, but it does not work correctly.",
       "buggyCode": "TOKEN = \"admin-token-shared-by-all-scripts\"",
       "fixedCode": "import os\nTOKEN = os.environ[\"NETBOX_TOKEN\"]",
       "explanation": "A shared admin token gives every script full power and cannot be revoked for one job without breaking all of them; each job should use its own token with the smallest permissions it needs."
      },
      "exercise": {
       "title": "Check your understanding: Tokens and Permissions",
       "type": "multiple-choice",
       "instructions": "Which statement about Tokens and Permissions is correct?",
       "starterCode": "",
       "solution": "A NetBox API token belongs to one user and inherits that user's permissions, so a token for a read-only user cannot create devices no matter what the script asks for.",
       "solutionExplanation": "A NetBox API token belongs to one user and inherits that user's permissions, so a token for a read-only user cannot create devices no matter what the script asks for. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A NetBox API token belongs to one user and inherits that user's permissions, so a token for a read-only user cannot create devices no matter what the script asks for.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Tokens and Permissions from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A NetBox API token belongs to one user and inherits that user's permissions, so a token for a read-only user cannot create devices no matter what the script asks for.",
        "A NetBox API token gives every script full admin rights regardless of the user it belongs to.",
        "A NetBox API token is the same for every user and never expires.",
        "A NetBox API token is only used for logging into the web UI, never for scripts."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-pynetbox-m2-l9",
      "slug": "netauto-sot-pynetbox-m2-l9",
      "title": "A Local pynetbox Practice Harness",
      "concept": "A practice harness for pynetbox work lets you build and check the request a script would send, such as the API path and the filter parameters, without contacting any server. The harness proves the query is well-formed before it runs against a real NetBox instance, which is where the request actually executes. Practising the request shape locally is honest preparation, while inventing a server response would be pretending the query already ran.",
      "syntax": "request = {\"method\": \"GET\", \"path\": \"/api/dcim/devices/\"}",
      "exampleCode": "request = {\"method\": \"GET\", \"path\": \"/api/dcim/devices/\", \"params\": {\"role\": \"core-switch\"}}\nprint(request[\"path\"])",
      "exampleLanguage": "python",
      "mistake": "Writing a fake JSON response into the script and treating it as proof the query works.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Local pynetbox Practice Harness, but it does not work correctly.",
       "buggyCode": "response = {\"results\": [{\"name\": \"core-sw-01\"}]}\nprint(response[\"results\"][0][\"name\"])",
       "fixedCode": "request = {\"method\": \"GET\", \"path\": \"/api/dcim/devices/\"}\nprint(request[\"path\"])",
       "explanation": "A hard-coded response proves nothing about the real server; the honest local check is the request itself, which can be inspected and then sent to a real NetBox instance."
      },
      "exercise": {
       "title": "Practise A Local pynetbox Practice Harness",
       "type": "write-code",
       "instructions": "Build the request plan for listing core switches in HQ: print the method and path, print the filter parameters as sorted JSON, and print a note that this runs against a real NetBox instance.",
       "starterCode": "import json\nrequest = {\"method\": \"GET\", \"path\": \"/api/dcim/devices/\", \"params\": {\"role\": \"core-switch\", \"site\": \"hq\", \"limit\": 50}}\n# TODO: print the request line, the parameters as sorted JSON, and the note.\n",
       "solution": "import json\nrequest = {\"method\": \"GET\", \"path\": \"/api/dcim/devices/\", \"params\": {\"role\": \"core-switch\", \"site\": \"hq\", \"limit\": 50}}\nprint(f\"{request['method']} {request['path']}\")\nprint(json.dumps(request[\"params\"], sort_keys=True))\nprint(\"Note: send this request to a real NetBox instance; no server is contacted here.\")",
       "solutionExplanation": "The solution build the request plan for listing core switches in HQ: print the method and path, print the filter parameters as sorted JSON, and print a note that this runs against a real NetBox instance. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GET /api/dcim/devices/\n{\"limit\": 50, \"role\": \"core-switch\", \"site\": \"hq\"}\nNote: send this request to a real NetBox instance; no server is contacted here.",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Note: send this request to a real NetBox instance; no server is contacted here.",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Local pynetbox Practice Harness is the key idea here: A practice harness for pynetbox work lets you build and check the request a script would send, such as the API path and the filter parameters, without contacting any server.",
        "approach": "Work through A Local pynetbox Practice Harness step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pynetbox-m2-l10",
      "slug": "netauto-sot-pynetbox-m2-l10",
      "title": "pynetbox Script Patterns",
      "concept": "A good pynetbox script follows one pattern: read the desired state from local data, read the current state from NetBox, compute the difference, and apply only the changes. The plan is printed before anything is written, so the operator can see creates, updates and deletes in advance. Scripts that write first and ask later are how inventories get damaged.",
      "syntax": "desired = {\"acc-sw-01\", \"acc-sw-02\"}\ncurrent = {\"acc-sw-01\"}",
      "exampleCode": "desired = {\"acc-sw-01\", \"acc-sw-02\"}\ncurrent = {\"acc-sw-01\"}\nprint(sorted(desired - current))",
      "exampleLanguage": "python",
      "mistake": "Applying changes without printing a plan first, so nobody can review what the script is about to do.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate pynetbox Script Patterns, but it does not work correctly.",
       "buggyCode": "for name in desired:\n    api.dcim.devices.create({\"name\": name, \"site\": 1})",
       "fixedCode": "to_create = sorted(desired - current)\nprint(to_create)",
       "explanation": "Computing and printing the plan before applying it lets an operator review the changes; writing first hides mistakes until they are already in NetBox."
      },
      "exercise": {
       "title": "Practise pynetbox Script Patterns",
       "type": "write-code",
       "instructions": "Given the desired and current device name sets, print each planned CREATE and DELETE, then print the counts of planned creates and deletes.",
       "starterCode": "current = {\"acc-sw-01\", \"acc-sw-02\"}\ndesired = {\"acc-sw-01\", \"acc-sw-02\", \"acc-sw-03\"}\n# TODO: compute the plan and print it with counts.\n",
       "solution": "current = {\"acc-sw-01\", \"acc-sw-02\"}\ndesired = {\"acc-sw-01\", \"acc-sw-02\", \"acc-sw-03\"}\nto_create = sorted(desired - current)\nto_delete = sorted(current - desired)\nfor name in to_create:\n    print(f\"CREATE: {name}\")\nfor name in to_delete:\n    print(f\"DELETE: {name}\")\nprint(f\"Planned creates: {len(to_create)}\")\nprint(f\"Planned deletes: {len(to_delete)}\")",
       "solutionExplanation": "The solution given the desired and current device name sets, print each planned CREATE and DELETE, then print the counts of planned creates and deletes. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "CREATE: acc-sw-03\nPlanned creates: 1\nPlanned deletes: 0",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Planned deletes: 0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "pynetbox Script Patterns is the key idea here: A good pynetbox script follows one pattern: read the desired state from local data, read the current state from NetBox, compute the difference, and apply only the changes.",
        "approach": "Work through pynetbox Script Patterns step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Plan a NetBox Sync",
   "type": "write-code",
   "instructions": "Build a sync plan from a desired device list and a current device list held as local data, print each planned CREATE, UPDATE and DELETE with reasons, then print the totals.",
   "starterCode": "desired = [\n    {\"hostname\": \"acc-sw-01\", \"role\": \"access switch\"},\n    {\"hostname\": \"acc-sw-02\", \"role\": \"access switch\"},\n    {\"hostname\": \"acc-sw-03\", \"role\": \"core switch\"},\n]\ncurrent = [\n    {\"hostname\": \"acc-sw-01\", \"role\": \"access switch\"},\n    {\"hostname\": \"acc-sw-02\", \"role\": \"core switch\"},\n    {\"hostname\": \"acc-sw-09\", \"role\": \"access switch\"},\n]\n# TODO: compute the sync plan and print it with totals.\n",
   "solution": "desired = [\n    {\"hostname\": \"acc-sw-01\", \"role\": \"access switch\"},\n    {\"hostname\": \"acc-sw-02\", \"role\": \"access switch\"},\n    {\"hostname\": \"acc-sw-03\", \"role\": \"core switch\"},\n]\ncurrent = [\n    {\"hostname\": \"acc-sw-01\", \"role\": \"access switch\"},\n    {\"hostname\": \"acc-sw-02\", \"role\": \"core switch\"},\n    {\"hostname\": \"acc-sw-09\", \"role\": \"access switch\"},\n]\ncur = {d[\"hostname\"]: d for d in current}\ndes = {d[\"hostname\"]: d for d in desired}\ncreates = sorted(set(des) - set(cur))\ndeletes = sorted(set(cur) - set(des))\nupdates = sorted(n for n in des if n in cur and des[n][\"role\"] != cur[n][\"role\"])\nfor n in creates:\n    print(f\"CREATE: {n}\")\nfor n in updates:\n    print(f\"UPDATE: {n} role {cur[n]['role']} -> {des[n]['role']}\")\nfor n in deletes:\n    print(f\"DELETE: {n}\")\nprint(f\"Creates: {len(creates)}\")\nprint(f\"Updates: {len(updates)}\")\nprint(f\"Deletes: {len(deletes)}\")",
   "solutionExplanation": "The solution build a sync plan from a desired device list and a current device list held as local data, print each planned CREATE, UPDATE and DELETE with reasons, then print the totals. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "CREATE: acc-sw-03\nUPDATE: acc-sw-02 role core switch -> access switch\nDELETE: acc-sw-09\nCreates: 1\nUpdates: 1\nDeletes: 1",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Deletes: 1",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "pynetbox in Practice capstone is the key idea here: A good pynetbox script follows one pattern: read the desired state from local data, read the current state from NetBox, compute the difference, and apply only the changes.",
    "approach": "Work through pynetbox in Practice capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Plan a NetBox Sync",
   "description": "Write a sync planner that compares desired device data with current data, produces a create/update/delete plan, and prints it for review before anything is applied.",
   "requirements": [
    "Read desired and current device lists from local data",
    "Compute creates, updates and deletes by hostname",
    "Print each planned action with its reason",
    "Print totals for creates, updates and deletes"
   ],
   "rubric": [
    "Creates are exactly the devices in desired but not current",
    "Updates name the field that differs",
    "Deletes are exactly the devices in current but not desired",
    "Totals match the printed actions"
   ]
  }
 },
 {
  "id": "netauto-sot-jinja2",
  "slug": "netauto-sot-jinja2",
  "language": "python",
  "category": "devops",
  "title": "Jinja2 Templates from Source of Truth Data",
  "description": "Render device configs from source of truth data with Jinja2: variables, loops, conditionals, filters, inheritance, whitespace control, macros, strict undefined handling and a role-based template library.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "Jinja2 variables",
   "Template loops",
   "Conditionals",
   "Filters",
   "Template inheritance",
   "Whitespace control",
   "Macros",
   "StrictUndefined",
   "Template libraries",
   "Config rendering"
  ],
  "prerequisites": [
   "netauto-sot-foundations",
   "netauto-sot-netbox"
  ],
  "analogy": "Learning {topic} is like learning to write a form letter: one template with blanks for the name and address produces a personal letter for everyone on the list.",
  "modules": [
   {
    "id": "netauto-sot-jinja2-m1",
    "title": "Jinja2 Templates from Source of Truth Data Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-jinja2-m1-l1",
      "slug": "netauto-sot-jinja2-m1-l1",
      "title": "Jinja2 Basics: Variables and Output",
      "concept": "Jinja2 renders text by replacing {{ variable }} placeholders with values passed to render(), so a template and a data record together produce one device config. The template holds the fixed structure and the data holds what changes per device, which is the whole idea of generating configs from a source of truth. A variable that is never passed renders as an empty string unless strict mode is on.",
      "syntax": "Template(\"hostname {{ hostname }}\").render(hostname=\"core-sw-01\")",
      "exampleCode": "from jinja2 import Template\nprint(Template(\"hostname {{ hostname }}\").render(hostname=\"core-sw-01\"))",
      "exampleLanguage": "python",
      "mistake": "Writing the hostname directly into the template instead of using a variable, so the template only works for one device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Jinja2 Basics: Variables and Output, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nprint(Template(\"hostname core-sw-01\").render())",
       "fixedCode": "from jinja2 import Template\nprint(Template(\"hostname {{ hostname }}\").render(hostname=\"core-sw-01\"))",
       "explanation": "A hard-coded hostname makes the template single-use; a variable lets the same template render a config for any device."
      },
      "exercise": {
       "title": "Practise Jinja2 Basics: Variables and Output",
       "type": "write-code",
       "instructions": "Render the template 'hostname {{ hostname }}' with the hostname core-sw-01 and print the result.",
       "starterCode": "from jinja2 import Template\ntemplate = Template(\"hostname {{ hostname }}\")\n# TODO: render the template for core-sw-01 and print it.\n",
       "solution": "from jinja2 import Template\ntemplate = Template(\"hostname {{ hostname }}\")\nprint(template.render(hostname=\"core-sw-01\"))",
       "solutionExplanation": "The solution render the template 'hostname {{ hostname }}' with the hostname core-sw-01 and print the result. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname core-sw-01",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "hostname core-sw-01",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Jinja2 Basics: Variables and Output is the key idea here: Jinja2 renders text by replacing {{ variable }} placeholders with values passed to render(), so a template and a data record together produce one device config.",
        "approach": "Work through Jinja2 Basics: Variables and Output step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-jinja2-m1-l2",
      "slug": "netauto-sot-jinja2-m1-l2",
      "title": "Loops: Rendering Interface Lists",
      "concept": "A Jinja2 for loop repeats a block once per item in a list, so one interface stanza in the template becomes one stanza per interface in the rendered config. Loops are how a template handles any number of interfaces, VLANs or neighbours without being rewritten for each device. The loop variable holds the current item, and loop.index counts from one.",
      "syntax": "{% for iface in interfaces %}interface {{ iface }}{% endfor %}",
      "exampleCode": "from jinja2 import Template\nt = Template(\"{% for i in interfaces %}{{ i }} {% endfor %}\")\nprint(t.render(interfaces=[\"Gi0/0\", \"Gi0/1\"]))",
      "exampleLanguage": "python",
      "mistake": "Copying the interface stanza by hand for each interface instead of looping over the list.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Loops: Rendering Interface Lists, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nt = Template(\"interface Gi0/0\\ninterface Gi0/1\")\nprint(t.render())",
       "fixedCode": "from jinja2 import Template\nt = Template(\"{% for i in interfaces %}interface {{ i }}\\n{% endfor %}\")\nprint(t.render(interfaces=[\"Gi0/0\", \"Gi0/1\"]))",
       "explanation": "Hand-copied stanzas break when the interface list changes; a loop renders exactly one stanza per item in the data, however long the list is."
      },
      "exercise": {
       "title": "Practise Loops: Rendering Interface Lists",
       "type": "write-code",
       "instructions": "Render one 'interface X' line plus a ' no shutdown' line for each interface in the list, and print the rendered config without trailing blank lines.",
       "starterCode": "from jinja2 import Template\ntemplate = Template(\"{% for iface in interfaces %}interface {{ iface }}\\n no shutdown\\n{% endfor %}\")\n# TODO: render for the two interfaces and print the result.\n",
       "solution": "from jinja2 import Template\ntemplate = Template(\"{% for iface in interfaces %}interface {{ iface }}\\n no shutdown\\n{% endfor %}\")\nprint(template.render(interfaces=[\"GigabitEthernet0/0\", \"GigabitEthernet0/1\"]).rstrip())",
       "solutionExplanation": "The solution render one 'interface X' line plus a ' no shutdown' line for each interface in the list, and print the rendered config without trailing blank lines. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interface GigabitEthernet0/0\n no shutdown\ninterface GigabitEthernet0/1\n no shutdown",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "no shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Loops: Rendering Interface Lists is the key idea here: A Jinja2 for loop repeats a block once per item in a list, so one interface stanza in the template becomes one stanza per interface in the rendered config.",
        "approach": "Work through Loops: Rendering Interface Lists step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-jinja2-m1-l3",
      "slug": "netauto-sot-jinja2-m1-l3",
      "title": "Conditionals: Optional Configuration",
      "concept": "A Jinja2 if block includes a section only when its condition is true, so optional features such as an NTP server appear in the config only for devices that have one. Conditionals keep one template serving devices with different features, instead of forking a template per device. An if without an else simply omits the section when the condition is false.",
      "syntax": "{% if ntp_server %}ntp server {{ ntp_server }}{% endif %}",
      "exampleCode": "from jinja2 import Template\nt = Template(\"{% if ntp %}ntp server {{ ntp }}{% endif %}\")\nprint(t.render(ntp=\"10.0.0.53\"))",
      "exampleLanguage": "python",
      "mistake": "Testing a variable that may be missing with a plain if, which renders nothing but hides the missing data.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Conditionals: Optional Configuration, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nt = Template(\"{% if ntp %}ntp {{ ntp }}{% endif %}\")\nprint(repr(t.render()))",
       "fixedCode": "from jinja2 import Template\nt = Template(\"{% if ntp is defined and ntp %}ntp {{ ntp }}{% else %}no ntp configured{% endif %}\")\nprint(t.render())",
       "explanation": "A bare if silently skips missing data, which can hide a mistake; testing 'is defined' and providing an else branch makes the missing value visible."
      },
      "exercise": {
       "title": "Practise Conditionals: Optional Configuration",
       "type": "write-code",
       "instructions": "Render the config for a device with an NTP server and then for one without, printing both results separated by a line of three dashes.",
       "starterCode": "from jinja2 import Template\ntemplate = Template(\"hostname {{ hostname }}\\n{% if ntp_server %}ntp server {{ ntp_server }}\\n{% endif %}ip domain-name example.local\")\n# TODO: render for edge-rtr-01 with and without an NTP server.\n",
       "solution": "from jinja2 import Template\ntemplate = Template(\"hostname {{ hostname }}\\n{% if ntp_server %}ntp server {{ ntp_server }}\\n{% endif %}ip domain-name example.local\")\nprint(template.render(hostname=\"edge-rtr-01\", ntp_server=\"10.0.0.53\").strip())\nprint(\"---\")\nprint(template.render(hostname=\"edge-rtr-01\", ntp_server=None).strip())",
       "solutionExplanation": "The solution render the config for a device with an NTP server and then for one without, printing both results separated by a line of three dashes. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname edge-rtr-01\nntp server 10.0.0.53\nip domain-name example.local\n---\nhostname edge-rtr-01\nip domain-name example.local",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "ip domain-name example.local",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Conditionals: Optional Configuration is the key idea here: A Jinja2 if block includes a section only when its condition is true, so optional features such as an NTP server appear in the config only for devices that have one.",
        "approach": "Work through Conditionals: Optional Configuration step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-jinja2-m1-l4",
      "slug": "netauto-sot-jinja2-m1-l4",
      "title": "Filters: Transforming Data in Templates",
      "concept": "A Jinja2 filter transforms a value inside the template, written after a pipe, so {{ hostname | upper }} prints the hostname in capitals and {{ vlans | join(', ') }} turns a list into a comma-separated string. Filters keep formatting in the template and raw data in the source of truth, so the same record can render differently in different templates. The default filter supplies a fallback when a value is missing.",
      "syntax": "{{ hostname | upper }}",
      "exampleCode": "from jinja2 import Template\nprint(Template(\"{{ name | upper }}\").render(name=\"acc-sw-01\"))",
      "exampleLanguage": "python",
      "mistake": "Pre-formatting values in the data, such as storing the hostname already upper-cased, instead of formatting in the template.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Filters: Transforming Data in Templates, but it does not work correctly.",
       "buggyCode": "device = {\"hostname\": \"ACC-SW-01\"}\nprint(device[\"hostname\"])",
       "fixedCode": "from jinja2 import Template\nprint(Template(\"{{ hostname | upper }}\").render(hostname=\"acc-sw-01\"))",
       "explanation": "Storing a formatted value in the data corrupts the source of truth; keeping the raw value and applying a filter at render time leaves the data clean."
      },
      "exercise": {
       "title": "Practise Filters: Transforming Data in Templates",
       "type": "write-code",
       "instructions": "Render the hostname in upper case, the VLAN list joined with commas, and the description with a default fallback, then print the result.",
       "starterCode": "from jinja2 import Template\ntemplate = Template(\"{{ hostname | upper }}: {{ vlans | join(', ') }} ({{ description | default('no description') }})\")\n# TODO: render for acc-sw-01 with VLANs 10, 20 and 30.\n",
       "solution": "from jinja2 import Template\ntemplate = Template(\"{{ hostname | upper }}: {{ vlans | join(', ') }} ({{ description | default('no description') }})\")\nprint(template.render(hostname=\"acc-sw-01\", vlans=[10, 20, 30]))",
       "solutionExplanation": "The solution render the hostname in upper case, the VLAN list joined with commas, and the description with a default fallback, then print the result. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ACC-SW-01: 10, 20, 30 (no description)",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "ACC-SW-01: 10, 20, 30 (no description)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Filters: Transforming Data in Templates is the key idea here: A Jinja2 filter transforms a value inside the template, written after a pipe, so {{ hostname | upper }} prints the hostname in capitals and {{ vlans | join(', ') }} turns a list into a comma-separated string.",
        "approach": "Work through Filters: Transforming Data in Templates step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-jinja2-m1-l5",
      "slug": "netauto-sot-jinja2-m1-l5",
      "title": "Template Inheritance and Includes",
      "concept": "Template inheritance lets a child template extend a base template and fill in named blocks, so every device config shares the same header while each role supplies its own sections. Includes insert a shared fragment, such as a standard banner, into any template that needs it. Both features keep common text in one place, so a change to the banner is made once instead of in every template.",
      "syntax": "{% extends \"base.j2\" %}{% block interfaces %}{% endblock %}",
      "exampleCode": "from jinja2 import DictLoader, Environment\nenv = Environment(loader=DictLoader({\"base.j2\": \"hostname {{ hostname }}\"}))\nprint(env.get_template(\"base.j2\").render(hostname=\"sw-01\"))",
      "exampleLanguage": "python",
      "mistake": "Copying the shared header into every device template instead of extending a base template.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Template Inheritance and Includes, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nprint(Template(\"hostname {{ hostname }}\\nlogging buffered\").render(hostname=\"sw-01\"))",
       "fixedCode": "from jinja2 import DictLoader, Environment\nloader = DictLoader({\"base.j2\": \"hostname {{ hostname }}\\nlogging buffered\"})\nprint(Environment(loader=loader).get_template(\"base.j2\").render(hostname=\"sw-01\"))",
       "explanation": "A copied header drifts when one template is updated and the others are not; a base template holds the shared text once and every child inherits it."
      },
      "exercise": {
       "title": "Practise Template Inheritance and Includes",
       "type": "write-code",
       "instructions": "Build a base template with a hostname line and an interfaces block, extend it in a switch template that fills the block, render it for acc-sw-01 and print the result.",
       "starterCode": "from jinja2 import DictLoader, Environment\nloader = DictLoader({\n    \"base.j2\": \"hostname {{ hostname }}\\n{% block interfaces %}{% endblock %}\",\n    \"switch.j2\": '{% extends \"base.j2\" %}{% block interfaces %}interface Gi0/0\\n no shutdown{% endblock %}',\n})\n# TODO: render switch.j2 for acc-sw-01 and print it.\n",
       "solution": "from jinja2 import DictLoader, Environment\nloader = DictLoader({\n    \"base.j2\": \"hostname {{ hostname }}\\n{% block interfaces %}{% endblock %}\",\n    \"switch.j2\": '{% extends \"base.j2\" %}{% block interfaces %}interface Gi0/0\\n no shutdown{% endblock %}',\n})\nenv = Environment(loader=loader)\nprint(env.get_template(\"switch.j2\").render(hostname=\"acc-sw-01\").strip())",
       "solutionExplanation": "The solution build a base template with a hostname line and an interfaces block, extend it in a switch template that fills the block, render it for acc-sw-01 and print the result. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname acc-sw-01\ninterface Gi0/0\n no shutdown",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "interface Gi0/0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Template Inheritance and Includes is the key idea here: Template inheritance lets a child template extend a base template and fill in named blocks, so every device config shares the same header while each role supplies its own sections.",
        "approach": "Work through Template Inheritance and Includes step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-jinja2-m2",
    "title": "Jinja2 Templates from Source of Truth Data in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-sot-jinja2-m2-l6",
      "slug": "netauto-sot-jinja2-m2-l6",
      "title": "Whitespace Control",
      "concept": "Jinja2 whitespace control removes the blank lines that loops and blocks leave behind, using trim_blocks to drop the newline after a block tag and lstrip_blocks to strip indentation before one. Clean output matters because a config full of stray blank lines is hard to read and harder to diff. Whitespace control is set on the Environment, so it applies to every template it renders.",
      "syntax": "Environment(trim_blocks=True, lstrip_blocks=True)",
      "exampleCode": "from jinja2 import Environment\nenv = Environment(trim_blocks=True)\nprint(env.from_string(\"{% for v in [10] %}\\nvlan {{ v }}\\n{% endfor %}\").render())",
      "exampleLanguage": "python",
      "mistake": "Leaving stray blank lines in rendered configs, which makes diffs noisy and reviews harder.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Whitespace Control, but it does not work correctly.",
       "buggyCode": "from jinja2 import Environment\nprint(repr(Environment().from_string(\"{% for v in [10] %}\\nvlan {{ v }}\\n{% endfor %}\").render()))",
       "fixedCode": "from jinja2 import Environment\nprint(repr(Environment(trim_blocks=True, lstrip_blocks=True).from_string(\"{% for v in [10] %}\\nvlan {{ v }}\\n{% endfor %}\").render()))",
       "explanation": "Without whitespace control the loop leaves a blank line before each stanza; trim_blocks and lstrip_blocks remove it so the output is clean and diffs stay small."
      },
      "exercise": {
       "title": "Practise Whitespace Control",
       "type": "write-code",
       "instructions": "Render a VLAN stanza for VLANs 10 and 20 with trim_blocks and lstrip_blocks enabled, and print the clean output.",
       "starterCode": "from jinja2 import Environment\nenv = Environment(trim_blocks=True, lstrip_blocks=True)\ntemplate = env.from_string(\"{% for vlan in vlans %}\\nvlan {{ vlan }}\\n name VLAN-{{ vlan }}\\n{% endfor %}\")\n# TODO: render for VLANs 10 and 20 and print the result.\n",
       "solution": "from jinja2 import Environment\nenv = Environment(trim_blocks=True, lstrip_blocks=True)\ntemplate = env.from_string(\"{% for vlan in vlans %}\\nvlan {{ vlan }}\\n name VLAN-{{ vlan }}\\n{% endfor %}\")\nprint(template.render(vlans=[10, 20]).strip())",
       "solutionExplanation": "The solution render a VLAN stanza for VLANs 10 and 20 with trim_blocks and lstrip_blocks enabled, and print the clean output. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "vlan 10\n name VLAN-10\nvlan 20\n name VLAN-20",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "name VLAN-20",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Whitespace Control is the key idea here: Jinja2 whitespace control removes the blank lines that loops and blocks leave behind, using trim_blocks to drop the newline after a block tag and lstrip_blocks to strip indentation before one.",
        "approach": "Work through Whitespace Control step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-jinja2-m2-l7",
      "slug": "netauto-sot-jinja2-m2-l7",
      "title": "Macros for Repeated Blocks",
      "concept": "A Jinja2 macro is a reusable template function, so an interface stanza written once as a macro can be called for every interface instead of being copied and pasted. Macros take arguments, which means one macro can render an access port, a trunk port or a routed interface depending on what it is passed. A macro used twice already pays for itself in consistency.",
      "syntax": "{% macro interface(name) %}interface {{ name }}{% endmacro %}",
      "exampleCode": "from jinja2 import Template\nt = Template(\"{% macro hi(n) %}hello {{ n }}{% endmacro %}{{ hi('world') }}\")\nprint(t.render())",
      "exampleLanguage": "python",
      "mistake": "Copying a five-line interface stanza for every port instead of writing one macro and calling it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Macros for Repeated Blocks, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nt = Template(\"interface Gi0/0\\n no shutdown\\ninterface Gi0/1\\n no shutdown\")\nprint(t.render())",
       "fixedCode": "from jinja2 import Template\nt = Template(\"{% macro iface(n) %}interface {{ n }}\\n no shutdown{% endmacro %}{{ iface('Gi0/0') }}\")\nprint(t.render())",
       "explanation": "Copied stanzas drift apart when one is edited and the others are not; a macro renders every stanza from the same definition."
      },
      "exercise": {
       "title": "Check your understanding: Macros for Repeated Blocks",
       "type": "multiple-choice",
       "instructions": "Which statement about Macros for Repeated Blocks is correct?",
       "starterCode": "",
       "solution": "A Jinja2 macro is a reusable template function, so an interface stanza written once as a macro can be called for every interface instead of being copied and pasted.",
       "solutionExplanation": "A Jinja2 macro is a reusable template function, so an interface stanza written once as a macro can be called for every interface instead of being copied and pasted. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A Jinja2 macro is a reusable template function, so an interface stanza written once as a macro can be called for every interface instead of being copied and pasted.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Macros for Repeated Blocks from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A Jinja2 macro is a reusable template function, so an interface stanza written once as a macro can be called for every interface instead of being copied and pasted.",
        "A Jinja2 macro is a Python function that runs on the network device itself.",
        "A Jinja2 macro can only be used once per template and then disappears.",
        "A Jinja2 macro replaces the source of truth and stores device data inside the template."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-jinja2-m2-l8",
      "slug": "netauto-sot-jinja2-m2-l8",
      "title": "Rendering a Full Switch Config",
      "concept": "A full switch config is rendered by combining one data record per device with templates for hostname, VLANs, interfaces and routing, so each device gets its own complete file from the same template set. The sections are rendered in a fixed order, which makes the output deterministic and easy to diff against the running config. One template set and many data records is the whole config generation pipeline in miniature.",
      "syntax": "Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")",
      "exampleCode": "from jinja2 import Template\nt = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")\nprint(t.render(hostname=\"sw-01\", vlans=[10, 20]))",
      "exampleLanguage": "python",
      "mistake": "Rendering each section with a separate template and concatenating the pieces by hand, so section order depends on the script.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rendering a Full Switch Config, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nprint(Template(\"hostname {{ h }}\").render(h=\"sw-01\"))\nprint(Template(\"vlan 10\").render())",
       "fixedCode": "from jinja2 import Template\nt = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")\nprint(t.render(hostname=\"sw-01\", vlans=[10, 20]))",
       "explanation": "Separate renders concatenated by hand can reorder sections by accident; one template with fixed section order renders a complete, deterministic config."
      },
      "exercise": {
       "title": "Check your understanding: Rendering a Full Switch Config",
       "type": "multiple-choice",
       "instructions": "Which statement about Rendering a Full Switch Config is correct?",
       "starterCode": "",
       "solution": "A full switch config is rendered by combining one data record per device with templates for hostname, VLANs, interfaces and routing, so each device gets its own complete file from the same template set.",
       "solutionExplanation": "A full switch config is rendered by combining one data record per device with templates for hostname, VLANs, interfaces and routing, so each device gets its own complete file from the same template set. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A full switch config is rendered by combining one data record per device with templates for hostname, VLANs, interfaces and routing, so each device gets its own complete file from the same template set.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Rendering a Full Switch Config from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A full switch config is rendered by combining one data record per device with templates for hostname, VLANs, interfaces and routing, so each device gets its own complete file from the same template set.",
        "A full switch config is rendered by typing it fresh for every device with no templates at all.",
        "A full switch config is rendered by copying the running config from a device and editing it by hand.",
        "A full switch config needs a different template for every single interface on the device."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-jinja2-m2-l9",
      "slug": "netauto-sot-jinja2-m2-l9",
      "title": "Template Safety: Undefined Variables",
      "concept": "StrictUndefined makes Jinja2 raise an error the moment a template uses a variable that was not passed, instead of silently rendering an empty string. A missing management IP rendered as an empty string produces a config that looks complete and fails on the device; the same mistake with strict mode fails loudly at render time, where it is cheap to fix. Safety in templates is failing fast, not failing quietly.",
      "syntax": "Environment(undefined=StrictUndefined)",
      "exampleCode": "from jinja2 import Environment, StrictUndefined\nenv = Environment(undefined=StrictUndefined)\nprint(env.from_string(\"{{ hostname }}\").render(hostname=\"sw-01\"))",
      "exampleLanguage": "python",
      "mistake": "Rendering with the default undefined behaviour, so a missing variable silently becomes an empty string in the config.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Template Safety: Undefined Variables, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nprint(repr(Template(\"ip address {{ mgmt_ip }}\").render()))",
       "fixedCode": "from jinja2 import Environment, StrictUndefined, UndefinedError\ntry:\n    Environment(undefined=StrictUndefined).from_string(\"{{ mgmt_ip }}\").render()\nexcept UndefinedError:\n    print(\"missing variable\")",
       "explanation": "The default undefined renders a missing variable as an empty string, producing a broken config line; StrictUndefined raises an error so the missing data is caught before anything is deployed."
      },
      "exercise": {
       "title": "Practise Template Safety: Undefined Variables",
       "type": "write-code",
       "instructions": "Render a template that needs hostname and mgmt_interface, passing only the hostname, catch the UndefinedError, and print an error naming the missing variable.",
       "starterCode": "from jinja2 import Environment, StrictUndefined, UndefinedError\nenv = Environment(undefined=StrictUndefined)\ntemplate = env.from_string(\"hostname {{ hostname }}\\ninterface {{ mgmt_interface }}\")\n# TODO: render with only the hostname and handle the missing variable.\n",
       "solution": "from jinja2 import Environment, StrictUndefined, UndefinedError\nenv = Environment(undefined=StrictUndefined)\ntemplate = env.from_string(\"hostname {{ hostname }}\\ninterface {{ mgmt_interface }}\")\ntry:\n    print(template.render(hostname=\"core-sw-01\"))\nexcept UndefinedError:\n    print(\"ERROR: missing variable 'mgmt_interface'\")",
       "solutionExplanation": "The solution render a template that needs hostname and mgmt_interface, passing only the hostname, catch the UndefinedError, and print an error naming the missing variable. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ERROR: missing variable 'mgmt_interface'",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "ERROR: missing variable 'mgmt_interface'",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Template Safety: Undefined Variables is the key idea here: StrictUndefined makes Jinja2 raise an error the moment a template uses a variable that was not passed, instead of silently rendering an empty string.",
        "approach": "Work through Template Safety: Undefined Variables step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-jinja2-m2-l10",
      "slug": "netauto-sot-jinja2-m2-l10",
      "title": "Organising a Template Library",
      "concept": "A template library organises templates by device role, so routers render from the router template and switches from the switch template, with shared fragments kept in one place. The script picks the template from the device's role field in the source of truth, which means adding a new role is adding one template, not rewriting the script. A library that mirrors the roles in the source of truth stays in step with the network it serves.",
      "syntax": "env.get_template(f\"{role}.j2\")",
      "exampleCode": "from jinja2 import DictLoader, Environment\nenv = Environment(loader=DictLoader({\"switch.j2\": \"hostname {{ hostname }}\"}))\nprint(env.get_template(\"switch.j2\").render(hostname=\"sw-01\"))",
      "exampleLanguage": "python",
      "mistake": "Using one giant template with an if branch per role, which grows unreadable as roles are added.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Organising a Template Library, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nt = Template(\"{% if role == 'switch' %}spanning-tree{% endif %}\")\nprint(t.render(role=\"switch\"))",
       "fixedCode": "from jinja2 import DictLoader, Environment\nenv = Environment(loader=DictLoader({\"switch.j2\": \"spanning-tree mode rapid-pvst\"}))\nprint(env.get_template(\"switch.j2\").render())",
       "explanation": "Role branches inside one template grow with every new role; one template per role keeps each file short and lets the role field pick the right one."
      },
      "exercise": {
       "title": "Practise Organising a Template Library",
       "type": "write-code",
       "instructions": "Render each device with the template matching its role, printing a header line naming the device and role, then the rendered config.",
       "starterCode": "from jinja2 import DictLoader, Environment\nloader = DictLoader({\n    \"router.j2\": \"hostname {{ hostname }}\\nrouter ospf 1\",\n    \"switch.j2\": \"hostname {{ hostname }}\\nspanning-tree mode rapid-pvst\",\n})\nenv = Environment(loader=loader)\ndevices = [(\"edge-rtr-01\", \"router\"), (\"acc-sw-01\", \"switch\")]\n# TODO: render each device with its role template and print the results.\n",
       "solution": "from jinja2 import DictLoader, Environment\nloader = DictLoader({\n    \"router.j2\": \"hostname {{ hostname }}\\nrouter ospf 1\",\n    \"switch.j2\": \"hostname {{ hostname }}\\nspanning-tree mode rapid-pvst\",\n})\nenv = Environment(loader=loader)\ndevices = [(\"edge-rtr-01\", \"router\"), (\"acc-sw-01\", \"switch\")]\nfor hostname, role in devices:\n    rendered = env.get_template(f\"{role}.j2\").render(hostname=hostname).strip()\n    print(f\"--- {hostname} ({role}) ---\")\n    print(rendered)",
       "solutionExplanation": "The solution render each device with the template matching its role, printing a header line naming the device and role, then the rendered config. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "--- edge-rtr-01 (router) ---\nhostname edge-rtr-01\nrouter ospf 1\n--- acc-sw-01 (switch) ---\nhostname acc-sw-01\nspanning-tree mode rapid-pvst",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "spanning-tree mode rapid-pvst",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Organising a Template Library is the key idea here: A template library organises templates by device role, so routers render from the router template and switches from the switch template, with shared fragments kept in one place.",
        "approach": "Work through Organising a Template Library step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Render a Full Switch Config from Data",
   "type": "write-code",
   "instructions": "Render a complete switch config from a device record using loops, a conditional for the NTP server and filters, then print the rendered config.",
   "starterCode": "from jinja2 import Template\ndevice = {\"hostname\": \"acc-sw-01\", \"vlans\": [10, 20], \"ntp_server\": \"10.0.0.53\", \"interfaces\": [\"GigabitEthernet0/0\", \"GigabitEthernet0/1\"]}\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}{% if ntp_server %}ntp server {{ ntp_server }}\\n{% endif %}{% for i in interfaces %}interface {{ i }}\\n no shutdown\\n{% endfor %}\")\n# TODO: render the full config and print it.\n",
   "solution": "from jinja2 import Template\ndevice = {\"hostname\": \"acc-sw-01\", \"vlans\": [10, 20], \"ntp_server\": \"10.0.0.53\", \"interfaces\": [\"GigabitEthernet0/0\", \"GigabitEthernet0/1\"]}\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}{% if ntp_server %}ntp server {{ ntp_server }}\\n{% endif %}{% for i in interfaces %}interface {{ i }}\\n no shutdown\\n{% endfor %}\")\nprint(template.render(**device).strip())",
   "solutionExplanation": "The solution render a complete switch config from a device record using loops, a conditional for the NTP server and filters, then print the rendered config. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "hostname acc-sw-01\nvlan 10\nvlan 20\nntp server 10.0.0.53\ninterface GigabitEthernet0/0\n no shutdown\ninterface GigabitEthernet0/1\n no shutdown",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "ntp server 10.0.0.53",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Jinja2 Templates capstone is the key idea here: Jinja2 renders text by replacing {{ variable }} placeholders with values passed to render(), so a template and a data record together produce one device config.",
    "approach": "Work through Jinja2 Templates capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Render a Full Switch Config from Data",
   "description": "Take one device record from the source of truth and render its complete switch configuration with Jinja2, using loops, a conditional and filters.",
   "requirements": [
    "Render hostname, VLANs, NTP server and interfaces from one data record",
    "Use a loop for VLANs and a loop for interfaces",
    "Include the NTP line only when an NTP server is present",
    "Print the complete rendered config"
   ],
   "rubric": [
    "Every value in the output comes from the data record, not hard-coded text",
    "Loops produce one stanza per item",
    "The conditional behaves correctly for the given data",
    "The output is a complete, readable switch config"
   ]
  }
 },
 {
  "id": "netauto-sot-pipeline",
  "slug": "netauto-sot-pipeline",
  "language": "python",
  "category": "devops",
  "title": "Config Generation Pipelines",
  "description": "Chain the stages of a config generation pipeline: loading YAML data, validating input, rendering per-device configs, validating output, diffing with difflib, staging for review and checking idempotency.",
  "difficulty": "Intermediate",
  "estimatedHours": 11,
  "skills": [
   "Pipeline stages",
   "YAML loading",
   "Input validation",
   "Per-device rendering",
   "Output validation",
   "difflib diffs",
   "Staging",
   "Failure modes",
   "Idempotency"
  ],
  "prerequisites": [
   "netauto-sot-foundations",
   "netauto-sot-netbox",
   "netauto-sot-jinja2"
  ],
  "analogy": "Learning {topic} is like running a factory line: raw material enters at one end, each station does one job, and a finished, inspected product comes out the other end.",
  "modules": [
   {
    "id": "netauto-sot-pipeline-m1",
    "title": "Config Generation Pipelines Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-pipeline-m1-l1",
      "slug": "netauto-sot-pipeline-m1-l1",
      "title": "From Data to Config: The Pipeline Idea",
      "concept": "A config generation pipeline turns source of truth data into device configs in fixed stages: load the data, validate it, render the templates, validate the output, and write the files. Each stage has one job, so a failure names the stage that failed instead of producing a mystery. A pipeline that always runs the same stages in the same order produces the same configs every time.",
      "syntax": "data -> validate -> render -> validate -> write",
      "exampleCode": "from jinja2 import Template\nprint(Template(\"hostname {{ h }}\").render(h=\"sw-01\"))",
      "exampleLanguage": "python",
      "mistake": "Rendering templates straight from raw data with no validation stage, so one bad record produces a broken config.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate From Data to Config: The Pipeline Idea, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nprint(Template(\"hostname {{ h }}\").render(h=\"\"))",
       "fixedCode": "from jinja2 import Template\ndevice = {\"hostname\": \"sw-01\"}\nassert device[\"hostname\"], \"hostname is required\"\nprint(Template(\"hostname {{ hostname }}\").render(**device))",
       "explanation": "Rendering without validation turns an empty hostname into a broken config line; asserting the required data first fails fast with a clear message."
      },
      "exercise": {
       "title": "Practise From Data to Config: The Pipeline Idea",
       "type": "write-code",
       "instructions": "Render a hostname line and one VLAN line per VLAN from the device record, and print the rendered config.",
       "starterCode": "from jinja2 import Template\ndevice = {\"hostname\": \"acc-sw-01\", \"vlans\": [10, 20]}\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")\n# TODO: render the config from the device record and print it.\n",
       "solution": "from jinja2 import Template\ndevice = {\"hostname\": \"acc-sw-01\", \"vlans\": [10, 20]}\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")\nprint(template.render(**device).strip())",
       "solutionExplanation": "The solution render a hostname line and one VLAN line per VLAN from the device record, and print the rendered config. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname acc-sw-01\nvlan 10\nvlan 20",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "vlan 20",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "From Data to Config: The Pipeline Idea is the key idea here: A config generation pipeline turns source of truth data into device configs in fixed stages: load the data, validate it, render the templates, validate the output, and write the files.",
        "approach": "Work through From Data to Config: The Pipeline Idea step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pipeline-m1-l2",
      "slug": "netauto-sot-pipeline-m1-l2",
      "title": "Loading YAML Data Files",
      "concept": "YAML is the usual format for source of truth data files, because it is readable by humans and parseable by machines, and the safe loader turns a YAML document into Python dictionaries and lists. safe_load is used instead of load because it refuses to construct arbitrary Python objects, which makes it safe for files from other people. A YAML file that fails to parse stops the pipeline before any config is rendered.",
      "syntax": "yaml.safe_load(open(\"devices.yaml\"))",
      "exampleCode": "import yaml\nprint(yaml.safe_load(\"hostname: sw-01\\nvlans: [10, 20]\"))",
      "exampleLanguage": "python",
      "mistake": "Using yaml.load without a safe loader, which can construct arbitrary Python objects from a crafted file.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Loading YAML Data Files, but it does not work correctly.",
       "buggyCode": "import yaml\nprint(yaml.load(\"hostname: sw-01\"))",
       "fixedCode": "import yaml\nprint(yaml.safe_load(\"hostname: sw-01\"))",
       "explanation": "yaml.load without a Loader can execute arbitrary object construction from a malicious file; safe_load parses only plain data and is the safe default."
      },
      "exercise": {
       "title": "Practise Loading YAML Data Files",
       "type": "write-code",
       "instructions": "Parse the YAML document, then print the hostname, the site, and how many VLANs the device has.",
       "starterCode": "import yaml\ndata = yaml.safe_load(\"hostname: acc-sw-01\\nsite: hq\\nvlans: [10, 20]\\n\")\n# TODO: print the hostname, site and VLAN count.\n",
       "solution": "import yaml\ndata = yaml.safe_load(\"hostname: acc-sw-01\\nsite: hq\\nvlans: [10, 20]\\n\")\nprint(f\"Hostname: {data['hostname']}\")\nprint(f\"Site: {data['site']}\")\nprint(f\"VLAN count: {len(data['vlans'])}\")",
       "solutionExplanation": "The solution parse the YAML document, then print the hostname, the site, and how many VLANs the device has. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Hostname: acc-sw-01\nSite: hq\nVLAN count: 2",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "VLAN count: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Loading YAML Data Files is the key idea here: YAML is the usual format for source of truth data files, because it is readable by humans and parseable by machines, and the safe loader turns a YAML document into Python dictionaries and lists.",
        "approach": "Work through Loading YAML Data Files step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pipeline-m1-l3",
      "slug": "netauto-sot-pipeline-m1-l3",
      "title": "Validating Data Before Rendering",
      "concept": "Data validation runs before any template is rendered, checking that required fields exist and values are in range, so a bad record fails fast instead of producing a broken config. A validator reports every problem it finds, not just the first, so the author can fix the record in one pass. Validation is the stage that turns a typo into a helpful error instead of an outage.",
      "syntax": "required = [\"hostname\", \"role\", \"site\", \"mgmt_ip\"]",
      "exampleCode": "device = {\"hostname\": \"sw-01\"}\nprint([f for f in [\"hostname\", \"role\"] if f not in device])",
      "exampleLanguage": "python",
      "mistake": "Validating only the first record in a file and assuming the rest are fine.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Validating Data Before Rendering, but it does not work correctly.",
       "buggyCode": "devices = [{\"hostname\": \"sw-01\"}, {\"hostname\": \"sw-02\"}]\nprint(\"hostname\" in devices[0])",
       "fixedCode": "devices = [{\"hostname\": \"sw-01\"}, {\"hostname\": \"sw-02\"}]\nprint(all(\"hostname\" in d for d in devices))",
       "explanation": "Checking only the first record leaves bad records later in the file undiscovered; validation must run over every record before rendering starts."
      },
      "exercise": {
       "title": "Check your understanding: Validating Data Before Rendering",
       "type": "multiple-choice",
       "instructions": "Which statement about Validating Data Before Rendering is correct?",
       "starterCode": "",
       "solution": "Data validation runs before any template is rendered, checking that required fields exist and values are in range, so a bad record fails fast instead of producing a broken config.",
       "solutionExplanation": "Data validation runs before any template is rendered, checking that required fields exist and values are in range, so a bad record fails fast instead of producing a broken config. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Data validation runs before any template is rendered, checking that required fields exist and values are in range, so a bad record fails fast instead of producing a broken config.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Validating Data Before Rendering from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Data validation runs before any template is rendered, checking that required fields exist and values are in range, so a bad record fails fast instead of producing a broken config.",
        "Data validation runs after the config is deployed, so bad data is found by the device itself.",
        "Data validation means deleting any record that looks unusual without telling anyone.",
        "Data validation is unnecessary because templates never produce broken configs."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-pipeline-m1-l4",
      "slug": "netauto-sot-pipeline-m1-l4",
      "title": "Rendering Per-Device Configs",
      "concept": "A generation pipeline renders one config file per device by feeding each device's record through the same templates, so a hundred devices produce a hundred consistent files. The output filename comes from the device name, which keeps the files findable and makes a missing file obvious. Rendering per device also means one bad record fails one file, not the whole run.",
      "syntax": "for device in devices:\n    render(device)",
      "exampleCode": "from jinja2 import Template\nt = Template(\"hostname {{ hostname }}\")\nfor h in [\"sw-01\", \"sw-02\"]:\n    print(t.render(hostname=h))",
      "exampleLanguage": "python",
      "mistake": "Rendering every device into one big file, so a mistake in one device's data corrupts the output for all of them.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rendering Per-Device Configs, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nt = Template(\"hostname {{ hostname }}\")\nprint(t.render(hostname=\"sw-01\") + t.render(hostname=\"sw-02\"))",
       "fixedCode": "from jinja2 import Template\nt = Template(\"hostname {{ hostname }}\")\nfor h in [\"sw-01\", \"sw-02\"]:\n    print(f\"--- {h}.cfg ---\")\n    print(t.render(hostname=h))",
       "explanation": "One combined file mixes every device together and hides which lines belong to which device; one file per device keeps each config separate and reviewable."
      },
      "exercise": {
       "title": "Check your understanding: Rendering Per-Device Configs",
       "type": "multiple-choice",
       "instructions": "Which statement about Rendering Per-Device Configs is correct?",
       "starterCode": "",
       "solution": "A generation pipeline renders one config file per device by feeding each device's record through the same templates, so a hundred devices produce a hundred consistent files.",
       "solutionExplanation": "A generation pipeline renders one config file per device by feeding each device's record through the same templates, so a hundred devices produce a hundred consistent files. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A generation pipeline renders one config file per device by feeding each device's record through the same templates, so a hundred devices produce a hundred consistent files.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Rendering Per-Device Configs from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A generation pipeline renders one config file per device by feeding each device's record through the same templates, so a hundred devices produce a hundred consistent files.",
        "A generation pipeline renders all devices into one shared file with no separation.",
        "A generation pipeline renders each device with a different template chosen at random.",
        "A generation pipeline renders configs only for the first device and copies its file to the rest."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-pipeline-m1-l5",
      "slug": "netauto-sot-pipeline-m1-l5",
      "title": "Validating Rendered Configs",
      "concept": "Validating a rendered config means checking the output itself: every required line is present, every address parses as a real IP, and no banned command slipped in. Data validation catches bad input, but output validation catches template mistakes, so the two stages protect different failures. A config that fails output validation is never written to the deploy folder.",
      "syntax": "ipaddress.ip_address(\"10.10.0.1\")",
      "exampleCode": "import ipaddress\nprint(ipaddress.ip_address(\"10.10.0.1\"))",
      "exampleLanguage": "python",
      "mistake": "Checking that the config is non-empty and calling that validation, while a missing hostname line goes unnoticed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Validating Rendered Configs, but it does not work correctly.",
       "buggyCode": "config = \"vlan 10\\n\"\nprint(len(config) > 0)",
       "fixedCode": "config = \"vlan 10\\n\"\nprint(\"hostname \" in config)",
       "explanation": "A non-empty config can still be missing its hostname line; output validation must check for the specific lines the device needs, not just that something was rendered."
      },
      "exercise": {
       "title": "Practise Validating Rendered Configs",
       "type": "write-code",
       "instructions": "Extract the IP address from the config lines, check it parses as a real address, check a hostname line is present, and print both results.",
       "starterCode": "import ipaddress\nconfig_lines = [\"hostname acc-sw-01\", \"interface Vlan10\", \" ip address 10.10.0.1 255.255.255.0\"]\n# TODO: validate the address and the hostname line, then print the results.\n",
       "solution": "import ipaddress\nconfig_lines = [\"hostname acc-sw-01\", \"interface Vlan10\", \" ip address 10.10.0.1 255.255.255.0\"]\naddress = None\nfor line in config_lines:\n    if \"ip address\" in line:\n        address = line.split()[2]\nvalid = False\ntry:\n    ipaddress.ip_address(address)\n    valid = True\nexcept ValueError:\n    valid = False\nprint(f\"Address {address}: {'valid' if valid else 'invalid'}\")\nprint(f\"Hostname present: {any(l.startswith('hostname ') for l in config_lines)}\")",
       "solutionExplanation": "The solution extract the IP address from the config lines, check it parses as a real address, check a hostname line is present, and print both results. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Address 10.10.0.1: valid\nHostname present: True",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Hostname present: True",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating Rendered Configs is the key idea here: Validating a rendered config means checking the output itself: every required line is present, every address parses as a real IP, and no banned command slipped in.",
        "approach": "Work through Validating Rendered Configs step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-pipeline-m2",
    "title": "Config Generation Pipelines in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-sot-pipeline-m2-l6",
      "slug": "netauto-sot-pipeline-m2-l6",
      "title": "Diffing Configs with difflib",
      "concept": "Python's difflib compares two lists of config lines and produces a unified diff, with minus lines for what was removed and plus lines for what was added. Diffs are the reviewable form of a change: a human can read ten changed lines far more easily than two whole files. The pipeline diffs the new config against the last deployed one, so every run reports exactly what would change.",
      "syntax": "difflib.unified_diff(old, new, lineterm=\"\")",
      "exampleCode": "import difflib\nprint(list(difflib.unified_diff([\"a\"], [\"b\"], lineterm=\"\")))",
      "exampleLanguage": "python",
      "mistake": "Comparing configs with == and reporting only that they differ, with no detail about what changed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Diffing Configs with difflib, but it does not work correctly.",
       "buggyCode": "old = [\"vlan 10\"]\nnew = [\"vlan 20\"]\nprint(old == new)",
       "fixedCode": "import difflib\nprint(\"\\n\".join(difflib.unified_diff([\"vlan 10\"], [\"vlan 20\"], lineterm=\"\")))",
       "explanation": "Equality only says the configs differ; a unified diff names the exact lines removed and added, which is what a reviewer needs."
      },
      "exercise": {
       "title": "Practise Diffing Configs with difflib",
       "type": "write-code",
       "instructions": "Produce the unified diff between the old and new config line lists and print it, one line per line.",
       "starterCode": "import difflib\nold = [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 20\"]\nnew = [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 30\"]\n# TODO: print the unified diff between old and new.\n",
       "solution": "import difflib\nold = [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 20\"]\nnew = [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 30\"]\ndiff = list(difflib.unified_diff(old, new, lineterm=\"\"))\nfor line in diff:\n    print(line)",
       "solutionExplanation": "The solution produce the unified diff between the old and new config line lists and print it, one line per line. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "--- \n+++ \n@@ -1,3 +1,3 @@\n hostname acc-sw-01\n vlan 10\n-vlan 20\n+vlan 30",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "+vlan 30",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Diffing Configs with difflib is the key idea here: Python's difflib compares two lists of config lines and produces a unified diff, with minus lines for what was removed and plus lines for what was added.",
        "approach": "Work through Diffing Configs with difflib step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pipeline-m2-l7",
      "slug": "netauto-sot-pipeline-m2-l7",
      "title": "Staging Outputs for Review",
      "concept": "Staging writes rendered configs to a review folder or a branch instead of pushing them to devices, so a human or a CI job can inspect the diff before anything is deployed. The staged output is the exact artifact that will deploy, which means reviewing it is reviewing the real change. Nothing leaves staging until the review passes.",
      "syntax": "staged = {\"acc-sw-01.cfg\": \"hostname acc-sw-01\"}",
      "exampleCode": "staged = {\"acc-sw-01.cfg\": \"hostname acc-sw-01\"}\nprint(list(staged))",
      "exampleLanguage": "python",
      "mistake": "Deploying straight from the render step with no staging, so the first review happens on the live device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Staging Outputs for Review, but it does not work correctly.",
       "buggyCode": "print(\"deploying rendered config directly\")",
       "fixedCode": "staged = {\"acc-sw-01.cfg\": \"hostname acc-sw-01\"}\nprint(f\"staged for review: {list(staged)}\")",
       "explanation": "Deploying without staging removes the only chance to catch a bad config before it reaches a device; staging holds the output for review first."
      },
      "exercise": {
       "title": "Check your understanding: Staging Outputs for Review",
       "type": "multiple-choice",
       "instructions": "Which statement about Staging Outputs for Review is correct?",
       "starterCode": "",
       "solution": "Staging writes rendered configs to a review folder or a branch instead of pushing them to devices, so a human or a CI job can inspect the diff before anything is deployed.",
       "solutionExplanation": "Staging writes rendered configs to a review folder or a branch instead of pushing them to devices, so a human or a CI job can inspect the diff before anything is deployed. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Staging writes rendered configs to a review folder or a branch instead of pushing them to devices, so a human or a CI job can inspect the diff before anything is deployed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Staging Outputs for Review from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Staging writes rendered configs to a review folder or a branch instead of pushing them to devices, so a human or a CI job can inspect the diff before anything is deployed.",
        "Staging means deploying the config to devices immediately and reviewing it afterwards.",
        "Staging means deleting the rendered configs once they have been checked.",
        "Staging means rendering configs only on the device itself, never on a workstation."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-pipeline-m2-l8",
      "slug": "netauto-sot-pipeline-m2-l8",
      "title": "Pipeline Failure Modes",
      "concept": "A generation pipeline fails loudly when its input data is missing or invalid, and it never writes a half-rendered config, so a bad run cannot silently deploy broken output. The common failure modes are a YAML file that does not parse, a record missing a required field, and a template referencing a variable nobody passed. Each failure stops the run at the stage where it was found, with the error naming the cause.",
      "syntax": "try:\n    data = yaml.safe_load(text)\nexcept yaml.YAMLError as e:\n    print(e)",
      "exampleCode": "import yaml\ntry:\n    yaml.safe_load(\"hostname: [unclosed\")\nexcept yaml.YAMLError:\n    print(\"bad yaml\")",
      "exampleLanguage": "python",
      "mistake": "Catching a render error and continuing with the previous config, so the deploy proceeds with stale data and nobody notices.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Pipeline Failure Modes, but it does not work correctly.",
       "buggyCode": "try:\n    config = render(device)\nexcept Exception:\n    config = old_config",
       "fixedCode": "try:\n    config = render(device)\nexcept Exception as e:\n    print(f\"render failed: {e}\")\n    raise",
       "explanation": "Falling back to a stale config hides the failure and deploys data nobody reviewed; a failed render must stop the run loudly instead."
      },
      "exercise": {
       "title": "Check your understanding: Pipeline Failure Modes",
       "type": "multiple-choice",
       "instructions": "Which statement about Pipeline Failure Modes is correct?",
       "starterCode": "",
       "solution": "A generation pipeline fails loudly when its input data is missing or invalid, and it never writes a half-rendered config, so a bad run cannot silently deploy broken output.",
       "solutionExplanation": "A generation pipeline fails loudly when its input data is missing or invalid, and it never writes a half-rendered config, so a bad run cannot silently deploy broken output. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A generation pipeline fails loudly when its input data is missing or invalid, and it never writes a half-rendered config, so a bad run cannot silently deploy broken output.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Pipeline Failure Modes from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A generation pipeline fails loudly when its input data is missing or invalid, and it never writes a half-rendered config, so a bad run cannot silently deploy broken output.",
        "A generation pipeline silently writes half-rendered configs so the deploy can continue.",
        "A generation pipeline ignores bad input data and renders whatever it can.",
        "A generation pipeline never fails, because templates always produce valid configs."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-pipeline-m2-l9",
      "slug": "netauto-sot-pipeline-m2-l9",
      "title": "A Complete Generation Pipeline",
      "concept": "A complete generation pipeline chains every stage: load the YAML data, validate the records, render each device's config, validate the rendered output, and print a summary of what passed and what failed. The summary is the pipeline's report card, and it is what an operator reads before deciding to deploy. A pipeline without a summary leaves the operator guessing whether the run worked.",
      "syntax": "load -> validate -> render -> validate -> report",
      "exampleCode": "import yaml\nprint(yaml.safe_load(\"hostname: sw-01\"))",
      "exampleLanguage": "python",
      "mistake": "Skipping the output validation stage because the input validation already passed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Complete Generation Pipeline, but it does not work correctly.",
       "buggyCode": "device = {\"hostname\": \"sw-01\"}\nprint(\"input valid\")",
       "fixedCode": "from jinja2 import Template\nconfig = Template(\"hostname {{ hostname }}\").render(hostname=\"sw-01\")\nprint(\"hostname \" in config)",
       "explanation": "Input validation cannot catch a template mistake, so a pipeline that skips output validation can still produce a broken config from good data."
      },
      "exercise": {
       "title": "Practise A Complete Generation Pipeline",
       "type": "write-code",
       "instructions": "Load the YAML data for two devices, validate each record, render each config, check the hostname line is present, and print a per-device PASS or FAIL plus a summary count.",
       "starterCode": "import yaml\nfrom jinja2 import Template\nyaml_text = \"devices:\\n  - hostname: acc-sw-01\\n    vlans: [10, 20]\\n  - hostname: acc-sw-02\\n    vlans: [10]\\n\"\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")\n# TODO: run the full pipeline and print per-device results plus a summary.\n",
       "solution": "import yaml\nfrom jinja2 import Template\nyaml_text = \"devices:\\n  - hostname: acc-sw-01\\n    vlans: [10, 20]\\n  - hostname: acc-sw-02\\n    vlans: [10]\\n\"\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")\ndata = yaml.safe_load(yaml_text)\npassed = 0\nfor device in data[\"devices\"]:\n    valid = bool(device.get(\"hostname\")) and bool(device.get(\"vlans\"))\n    config = template.render(**device) if valid else \"\"\n    ok = valid and \"hostname \" in config\n    passed += 1 if ok else 0\n    print(f\"{device.get('hostname', 'unknown')}: {'PASS' if ok else 'FAIL'}\")\nprint(f\"Passed: {passed}/{len(data['devices'])}\")",
       "solutionExplanation": "The solution load the YAML data for two devices, validate each record, render each config, check the hostname line is present, and print a per-device PASS or FAIL plus a summary count. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "acc-sw-01: PASS\nacc-sw-02: PASS\nPassed: 2/2",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Passed: 2/2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Complete Generation Pipeline is the key idea here: A complete generation pipeline chains every stage: load the YAML data, validate the records, render each device's config, validate the rendered output, and print a summary of what passed and what failed.",
        "approach": "Work through A Complete Generation Pipeline step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-pipeline-m2-l10",
      "slug": "netauto-sot-pipeline-m2-l10",
      "title": "Pipeline Idempotency Checks",
      "concept": "A pipeline is idempotent when running it twice produces identical output, which proves the render depends only on the input data and not on the time, random values or leftover state. The check is simple: render twice and compare the two outputs byte for byte. A pipeline that fails the check has a hidden input, such as the current date in a comment, that must be removed or pinned.",
      "syntax": "render(data) == render(data)",
      "exampleCode": "from jinja2 import Template\nt = Template(\"hostname {{ h }}\")\nprint(t.render(h=\"sw-01\") == t.render(h=\"sw-01\"))",
      "exampleLanguage": "python",
      "mistake": "Including the current timestamp in a rendered config, so every run produces different output even though nothing changed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Pipeline Idempotency Checks, but it does not work correctly.",
       "buggyCode": "from jinja2 import Template\nfrom datetime import datetime\nprint(Template(\"! generated {{ now }}\").render(now=datetime.now()))",
       "fixedCode": "from jinja2 import Template\nprint(Template(\"! generated from source of truth\").render())",
       "explanation": "A timestamp makes every render different, so diffs can never show 'no change' and reviews drown in noise; generated configs should carry the data version instead."
      },
      "exercise": {
       "title": "Practise Pipeline Idempotency Checks",
       "type": "write-code",
       "instructions": "Render the same device record twice, print the length of each run, and print whether the two runs are identical.",
       "starterCode": "from jinja2 import Template\ndevice = {\"hostname\": \"acc-sw-01\", \"vlans\": [10, 20]}\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")\n# TODO: render twice, print both lengths, and report whether they match.\n",
       "solution": "from jinja2 import Template\ndevice = {\"hostname\": \"acc-sw-01\", \"vlans\": [10, 20]}\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}\")\nfirst = template.render(**device)\nsecond = template.render(**device)\nprint(f\"First run length: {len(first)}\")\nprint(f\"Second run length: {len(second)}\")\nprint(\"Idempotent: yes\" if first == second else \"Idempotent: no\")",
       "solutionExplanation": "The solution render the same device record twice, print the length of each run, and print whether the two runs are identical. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "First run length: 35\nSecond run length: 35\nIdempotent: yes",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Idempotent: yes",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Pipeline Idempotency Checks is the key idea here: A pipeline is idempotent when running it twice produces identical output, which proves the render depends only on the input data and not on the time, random values or leftover state.",
        "approach": "Work through Pipeline Idempotency Checks step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Build a Config Generation Pipeline",
   "type": "write-code",
   "instructions": "Run the full pipeline on YAML data for two devices plus one broken record: validate, render, validate the output, print a per-device result, and print how many configs are deployable.",
   "starterCode": "import yaml\nfrom jinja2 import Template\nyaml_text = \"devices:\\n  - hostname: acc-sw-01\\n    vlans: [10, 20]\\n    mgmt_ip: 10.0.0.11\\n  - hostname: acc-sw-02\\n    vlans: [10]\\n    mgmt_ip: 10.0.0.12\\n  - hostname: ''\\n    vlans: [10]\\n    mgmt_ip: 10.0.0.13\\n\"\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}interface Vlan10\\n ip address {{ mgmt_ip }} 255.255.255.0\")\n# TODO: run the pipeline and print per-device results and the deployable count.\n",
   "solution": "import yaml\nimport ipaddress\nfrom jinja2 import Template\nyaml_text = \"devices:\\n  - hostname: acc-sw-01\\n    vlans: [10, 20]\\n    mgmt_ip: 10.0.0.11\\n  - hostname: acc-sw-02\\n    vlans: [10]\\n    mgmt_ip: 10.0.0.12\\n  - hostname: ''\\n    vlans: [10]\\n    mgmt_ip: 10.0.0.13\\n\"\ntemplate = Template(\"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v }}\\n{% endfor %}interface Vlan10\\n ip address {{ mgmt_ip }} 255.255.255.0\")\ndata = yaml.safe_load(yaml_text)\ndeployable = 0\nfor device in data[\"devices\"]:\n    name = device.get(\"hostname\") or \"(missing hostname)\"\n    try:\n        ipaddress.ip_address(device.get(\"mgmt_ip\", \"\"))\n        ip_ok = True\n    except ValueError:\n        ip_ok = False\n    valid = bool(device.get(\"hostname\")) and ip_ok and bool(device.get(\"vlans\"))\n    config = template.render(**device) if valid else \"\"\n    ok = valid and \"hostname \" in config\n    deployable += 1 if ok else 0\n    print(f\"{name}: {'DEPLOYABLE' if ok else 'REJECTED'}\")\nprint(f\"Deployable configs: {deployable}/{len(data['devices'])}\")",
   "solutionExplanation": "The solution run the full pipeline on YAML data for two devices plus one broken record: validate, render, validate the output, print a per-device result, and print how many configs are deployable. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "acc-sw-01: DEPLOYABLE\nacc-sw-02: DEPLOYABLE\n(missing hostname): REJECTED\nDeployable configs: 2/3",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Deployable configs: 2/3",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Config Generation Pipelines capstone is the key idea here: A config generation pipeline turns source of truth data into device configs in fixed stages: load the data, validate it, render the templates, validate the output, and write the files.",
    "approach": "Work through Config Generation Pipelines capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Build a Config Generation Pipeline",
   "description": "Build a complete pipeline that loads YAML device data, validates it, renders configs, validates the output, and reports which configs are deployable.",
   "requirements": [
    "Load device data from YAML with yaml.safe_load",
    "Validate hostname, VLANs and management IP for every record",
    "Render each config with Jinja2",
    "Validate the rendered output before marking it deployable",
    "Report deployable versus rejected counts"
   ],
   "rubric": [
    "Every stage of the pipeline runs in order",
    "The broken record is rejected with a clear reason",
    "Valid records produce complete configs",
    "The deployable count matches the per-device results"
   ]
  }
 },
 {
  "id": "netauto-sot-gitops",
  "slug": "netauto-sot-gitops",
  "language": "python",
  "category": "devops",
  "title": "GitOps for Networks",
  "description": "Run networks the GitOps way: config as code, branches and pull requests, CI and review gates, merging and deploying, rollback with Git, secrets handling and multi-site change planning.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Config as code",
   "Branches and pull requests",
   "CI gates",
   "Review gates",
   "Four-eyes principle",
   "Merge and deploy",
   "Git rollback",
   "Secrets management",
   "Change lifecycle",
   "Multi-site planning"
  ],
  "prerequisites": [
   "netauto-sot-foundations",
   "netauto-sot-pipeline"
  ],
  "analogy": "Learning {topic} is like running a newspaper: every story is drafted, edited, checked and approved before it is printed, and a correction is just another edition.",
  "modules": [
   {
    "id": "netauto-sot-gitops-m1",
    "title": "GitOps for Networks Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-gitops-m1-l1",
      "slug": "netauto-sot-gitops-m1-l1",
      "title": "Config as Code",
      "concept": "Config as code means network configuration lives in version-controlled files, so every change is a commit with an author, a message and a history. The repository becomes the record of what the network should be, and the devices are brought into line with it. A config that exists only on a device is not as code, and it is not recoverable when the device fails.",
      "syntax": "repo = {\"devices/acc-sw-01.cfg\": \"hostname acc-sw-01\"}",
      "exampleCode": "repo = {\"devices/acc-sw-01.cfg\": \"hostname acc-sw-01\"}\nprint(list(repo))",
      "exampleLanguage": "python",
      "mistake": "Keeping the authoritative config only on the device and treating the repository as a backup that may be out of date.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Config as Code, but it does not work correctly.",
       "buggyCode": "device_config = \"hostname acc-sw-01\\nvlan 99\"\nrepo_config = \"hostname acc-sw-01\"\nprint(device_config == repo_config)",
       "fixedCode": "device_config = \"hostname acc-sw-01\"\nrepo_config = \"hostname acc-sw-01\"\nprint(device_config == repo_config)",
       "explanation": "When the device and the repository disagree, the repository cannot be trusted as the record; config as code requires the repository to be the authority the device is reconciled to."
      },
      "exercise": {
       "title": "Practise Config as Code",
       "type": "write-code",
       "instructions": "Print every tracked file path in the repository, sorted alphabetically, then print the total number of tracked files.",
       "starterCode": "repo = {\"README.md\": \"network configs\", \"devices/acc-sw-01.cfg\": \"hostname acc-sw-01\", \"devices/edge-rtr-01.cfg\": \"hostname edge-rtr-01\", \"templates/switch.j2\": \"hostname {{ hostname }}\"}\n# TODO: print every tracked path sorted, then the total count.\n",
       "solution": "repo = {\"README.md\": \"network configs\", \"devices/acc-sw-01.cfg\": \"hostname acc-sw-01\", \"devices/edge-rtr-01.cfg\": \"hostname edge-rtr-01\", \"templates/switch.j2\": \"hostname {{ hostname }}\"}\nfor path in sorted(repo):\n    print(path)\nprint(f\"Tracked files: {len(repo)}\")",
       "solutionExplanation": "The solution print every tracked file path in the repository, sorted alphabetically, then print the total number of tracked files. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "README.md\ndevices/acc-sw-01.cfg\ndevices/edge-rtr-01.cfg\ntemplates/switch.j2\nTracked files: 4",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Tracked files: 4",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Config as Code is the key idea here: Config as code means network configuration lives in version-controlled files, so every change is a commit with an author, a message and a history.",
        "approach": "Work through Config as Code step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-gitops-m1-l2",
      "slug": "netauto-sot-gitops-m1-l2",
      "title": "Branches and Pull Requests for Networks",
      "concept": "A branch is a copy of the repository where one change is prepared in isolation, and a pull request is the proposal to merge that change into the main branch for review. Branches keep half-finished work off the main line, and pull requests give the change a place to be discussed, checked and approved. A change with no branch and no review is a change nobody can stop.",
      "syntax": "main = {\"acc-sw-01.cfg\": \"vlan 10\"}\nbranch = {\"acc-sw-01.cfg\": \"vlan 10\\nvlan 20\"}",
      "exampleCode": "main = {\"a.cfg\": \"vlan 10\"}\nbranch = {\"a.cfg\": \"vlan 10\\nvlan 20\"}\nprint([f for f in branch if branch[f] != main.get(f)])",
      "exampleLanguage": "python",
      "mistake": "Committing straight to the main branch, so a half-finished change is live for everyone immediately.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Branches and Pull Requests for Networks, but it does not work correctly.",
       "buggyCode": "main = {\"a.cfg\": \"vlan 10\"}\nmain[\"a.cfg\"] = \"vlan 10\\nvlan 20 # unfinished\"\nprint(main[\"a.cfg\"])",
       "fixedCode": "branch = {\"a.cfg\": \"vlan 10\\nvlan 20 # unfinished\"}\nmain = {\"a.cfg\": \"vlan 10\"}\nprint(main[\"a.cfg\"])",
       "explanation": "Committing to main publishes unfinished work to everyone; a branch holds the work aside until it is finished and reviewed."
      },
      "exercise": {
       "title": "Practise Branches and Pull Requests for Networks",
       "type": "write-code",
       "instructions": "Compare the branch file contents with the main branch, print each changed file, then print how many files changed.",
       "starterCode": "main = {\"acc-sw-01.cfg\": \"hostname acc-sw-01\\nvlan 10\", \"edge-rtr-01.cfg\": \"hostname edge-rtr-01\"}\nbranch = {\"acc-sw-01.cfg\": \"hostname acc-sw-01\\nvlan 10\\nvlan 20\", \"edge-rtr-01.cfg\": \"hostname edge-rtr-01\"}\n# TODO: print the changed files and the count.\n",
       "solution": "main = {\"acc-sw-01.cfg\": \"hostname acc-sw-01\\nvlan 10\", \"edge-rtr-01.cfg\": \"hostname edge-rtr-01\"}\nbranch = {\"acc-sw-01.cfg\": \"hostname acc-sw-01\\nvlan 10\\nvlan 20\", \"edge-rtr-01.cfg\": \"hostname edge-rtr-01\"}\nchanged = [f for f in branch if branch[f] != main.get(f)]\nfor f in sorted(changed):\n    print(f\"Changed: {f}\")\nprint(f\"Files changed: {len(changed)}\")",
       "solutionExplanation": "The solution compare the branch file contents with the main branch, print each changed file, then print how many files changed. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Changed: acc-sw-01.cfg\nFiles changed: 1",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Files changed: 1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Branches and Pull Requests for Networks is the key idea here: A branch is a copy of the repository where one change is prepared in isolation, and a pull request is the proposal to merge that change into the main branch for review.",
        "approach": "Work through Branches and Pull Requests for Networks step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-gitops-m1-l3",
      "slug": "netauto-sot-gitops-m1-l3",
      "title": "CI Gates for Network Changes",
      "concept": "A CI gate runs automated checks on every pull request — syntax checks, rendering and validation — and blocks the merge when any check fails, so broken configs never reach the main branch. Gates run the same checks every time, which removes the argument about whether a change was tested. A pull request that skips its gates is a change that was never checked.",
      "syntax": "gates = {\"syntax\": True, \"render\": True, \"validate\": False}",
      "exampleCode": "gates = {\"syntax\": True, \"render\": True, \"validate\": False}\nprint(all(gates.values()))",
      "exampleLanguage": "python",
      "mistake": "Merging a pull request even though a CI gate failed, because the change 'looks fine'.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate CI Gates for Network Changes, but it does not work correctly.",
       "buggyCode": "gates = {\"syntax\": True, \"validate\": False}\nprint(\"merge allowed\" if True else \"blocked\")",
       "fixedCode": "gates = {\"syntax\": True, \"validate\": False}\nprint(\"merge allowed\" if all(gates.values()) else \"blocked\")",
       "explanation": "Ignoring a failed gate defeats the purpose of the gate; the merge decision must depend on every gate passing."
      },
      "exercise": {
       "title": "Check your understanding: CI Gates for Network Changes",
       "type": "multiple-choice",
       "instructions": "Which statement about CI Gates for Network Changes is correct?",
       "starterCode": "",
       "solution": "A CI gate runs automated checks on every pull request — syntax checks, rendering and validation — and blocks the merge when any check fails, so broken configs never reach the main branch.",
       "solutionExplanation": "A CI gate runs automated checks on every pull request — syntax checks, rendering and validation — and blocks the merge when any check fails, so broken configs never reach the main branch. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A CI gate runs automated checks on every pull request — syntax checks, rendering and validation — and blocks the merge when any check fails, so broken configs never reach the main branch.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of CI Gates for Network Changes from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A CI gate runs automated checks on every pull request — syntax checks, rendering and validation — and blocks the merge when any check fails, so broken configs never reach the main branch.",
        "A CI gate approves every pull request automatically without running any checks.",
        "A CI gate only runs after a change has been deployed to production.",
        "A CI gate checks the spelling of commit messages and nothing else."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-gitops-m1-l4",
      "slug": "netauto-sot-gitops-m1-l4",
      "title": "Review Gates and Approvals",
      "concept": "A review gate requires an approval from someone other than the change author before a network change can merge, which is the four-eyes principle applied to pull requests. The reviewer checks the change against the ticket, the risk and the blast radius, and their approval is recorded with the merge. Self-approval is not approval, and a gate that allows it is no gate at all.",
      "syntax": "approvals = [\"ben\"]\nauthor = \"ana\"",
      "exampleCode": "approvals = [\"ben\"]\nauthor = \"ana\"\nprint(any(a != author for a in approvals))",
      "exampleLanguage": "python",
      "mistake": "Letting the author approve their own pull request, so the review gate is satisfied without any review happening.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Review Gates and Approvals, but it does not work correctly.",
       "buggyCode": "author = \"ana\"\napprovals = [\"ana\"]\nprint(len(approvals) > 0)",
       "fixedCode": "author = \"ana\"\napprovals = [\"ana\"]\nprint(any(a != author for a in approvals))",
       "explanation": "Counting any approval, including the author's own, makes the gate meaningless; the check must require an approver who is not the author."
      },
      "exercise": {
       "title": "Check your understanding: Review Gates and Approvals",
       "type": "multiple-choice",
       "instructions": "Which statement about Review Gates and Approvals is correct?",
       "starterCode": "",
       "solution": "A review gate requires an approval from someone other than the change author before a network change can merge, which is the four-eyes principle applied to pull requests.",
       "solutionExplanation": "A review gate requires an approval from someone other than the change author before a network change can merge, which is the four-eyes principle applied to pull requests. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A review gate requires an approval from someone other than the change author before a network change can merge, which is the four-eyes principle applied to pull requests.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Review Gates and Approvals from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A review gate requires an approval from someone other than the change author before a network change can merge, which is the four-eyes principle applied to pull requests.",
        "A review gate lets the author approve their own change, which counts as a full review.",
        "A review gate approves changes based on how many files they touch, not who reviewed them.",
        "A review gate is only needed for emergency changes, never for planned ones."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-gitops-m1-l5",
      "slug": "netauto-sot-gitops-m1-l5",
      "title": "Merging and Deploying Changes",
      "concept": "Merging applies the reviewed change to the main branch, and deploying pushes the merged configs to the devices, ideally in small waves with checks between them. Merge and deploy are separate steps on purpose: a merged change can wait for a maintenance window, and a failed deploy can be stopped before the next wave starts. Deploying straight from a branch skips the review that merging is supposed to guarantee.",
      "syntax": "deployed = {}\ndeployed[\"acc-sw-01\"] = \"vlan 10\\nvlan 20\"",
      "exampleCode": "deployed = {\"acc-sw-01\": \"vlan 10\"}\ndeployed[\"acc-sw-01\"] = \"vlan 10\\nvlan 20\"\nprint(deployed[\"acc-sw-01\"])",
      "exampleLanguage": "python",
      "mistake": "Deploying a change to all devices at once with no wave and no check between them.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Merging and Deploying Changes, but it does not work correctly.",
       "buggyCode": "devices = [\"sw-01\", \"sw-02\", \"sw-03\"]\nfor d in devices:\n    print(f\"deploy {d}\")",
       "fixedCode": "devices = [\"sw-01\", \"sw-02\", \"sw-03\"]\nprint(f\"deploy wave 1: {devices[0]}\")\nprint(\"check wave 1, then continue\")",
       "explanation": "Deploying everywhere at once turns a bad change into a network-wide outage; waves with checks between them limit the blast radius of a mistake."
      },
      "exercise": {
       "title": "Practise Merging and Deploying Changes",
       "type": "write-code",
       "instructions": "Apply each change to the deployed state, print each device with its new line count, then print the total number of deployed devices.",
       "starterCode": "deployed = {\"acc-sw-01\": \"vlan 10\"}\nchanges = {\"acc-sw-01\": \"vlan 10\\nvlan 20\", \"acc-sw-02\": \"vlan 10\"}\n# TODO: apply the changes and print the deploy summary.\n",
       "solution": "deployed = {\"acc-sw-01\": \"vlan 10\"}\nchanges = {\"acc-sw-01\": \"vlan 10\\nvlan 20\", \"acc-sw-02\": \"vlan 10\"}\nfor device, config in sorted(changes.items()):\n    deployed[device] = config\n    print(f\"Deployed {device}: {len(config.splitlines())} lines\")\nprint(f\"Devices deployed: {len(deployed)}\")",
       "solutionExplanation": "The solution apply each change to the deployed state, print each device with its new line count, then print the total number of deployed devices. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Deployed acc-sw-01: 2 lines\nDeployed acc-sw-02: 1 lines\nDevices deployed: 2",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Devices deployed: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Merging and Deploying Changes is the key idea here: Merging applies the reviewed change to the main branch, and deploying pushes the merged configs to the devices, ideally in small waves with checks between them.",
        "approach": "Work through Merging and Deploying Changes step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-gitops-m2",
    "title": "GitOps for Networks in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-sot-gitops-m2-l6",
      "slug": "netauto-sot-gitops-m2-l6",
      "title": "Rollback with Git",
      "concept": "Rollback with Git means returning the repository to the last known good commit, which restores the configs that were deployed from it. Because every deployed config came from a commit, the previous good state is always one revert away, and the rollback itself is a new commit with its own review. A network that cannot roll back is a network that can only move forward into trouble.",
      "syntax": "history = [\"v1\", \"v2\", \"v3\"]",
      "exampleCode": "history = [\"v1\", \"v2\", \"v3\"]\nprint(history[-2])",
      "exampleLanguage": "python",
      "mistake": "Rolling back by editing the device by hand instead of reverting in Git, so the repository and the device disagree again.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rollback with Git, but it does not work correctly.",
       "buggyCode": "print(\"fixed the device by hand\")",
       "fixedCode": "history = [\"v1\", \"v2\", \"v3\"]\nprint(f\"reverted to {history[-2]}\")",
       "explanation": "A manual fix on the device leaves the repository wrong, so the next deploy reintroduces the bug; reverting in Git keeps the repository and the device in agreement."
      },
      "exercise": {
       "title": "Practise Rollback with Git",
       "type": "write-code",
       "instructions": "Print the current version, print the version a rollback would restore, and print how many versions are kept in history.",
       "starterCode": "history = [\"v1: vlan 10\", \"v2: vlan 10, vlan 20\", \"v3: vlan 10, vlan 20, vlan 30\"]\n# TODO: print the current version, the rollback target and the history size.\n",
       "solution": "history = [\"v1: vlan 10\", \"v2: vlan 10, vlan 20\", \"v3: vlan 10, vlan 20, vlan 30\"]\nprint(f\"Current: {history[-1]}\")\nprint(f\"Rolled back to: {history[-2]}\")\nprint(f\"Versions kept: {len(history)}\")",
       "solutionExplanation": "The solution print the current version, print the version a rollback would restore, and print how many versions are kept in history. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Current: v3: vlan 10, vlan 20, vlan 30\nRolled back to: v2: vlan 10, vlan 20\nVersions kept: 3",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Versions kept: 3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rollback with Git is the key idea here: Rollback with Git means returning the repository to the last known good commit, which restores the configs that were deployed from it.",
        "approach": "Work through Rollback with Git step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-gitops-m2-l7",
      "slug": "netauto-sot-gitops-m2-l7",
      "title": "GitOps Anti-Patterns",
      "concept": "Editing a device directly and never committing the change back is a GitOps anti-pattern, because the repository stops matching reality and the next deploy overwrites the manual fix. Other anti-patterns are committing secrets, merging without review, and keeping the source of truth outside version control. Each one breaks the same promise: that the repository is the truth about the network.",
      "syntax": "anti_patterns = [\"direct device edits\", \"committed secrets\", \"unreviewed merges\"]",
      "exampleCode": "print([\"direct device edits\", \"committed secrets\"])",
      "exampleLanguage": "python",
      "mistake": "Treating a direct device edit as harmless because the change was small.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate GitOps Anti-Patterns, but it does not work correctly.",
       "buggyCode": "print(\"small change, no need to commit it\")",
       "fixedCode": "print(\"every change goes through Git, however small\")",
       "explanation": "A small uncommitted change still makes the repository wrong, and the next deploy will silently undo it; size does not exempt a change from the process."
      },
      "exercise": {
       "title": "Check your understanding: GitOps Anti-Patterns",
       "type": "multiple-choice",
       "instructions": "Which statement about GitOps Anti-Patterns is correct?",
       "starterCode": "",
       "solution": "Editing a device directly and never committing the change back is a GitOps anti-pattern, because the repository stops matching reality and the next deploy overwrites the manual fix.",
       "solutionExplanation": "Editing a device directly and never committing the change back is a GitOps anti-pattern, because the repository stops matching reality and the next deploy overwrites the manual fix. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Editing a device directly and never committing the change back is a GitOps anti-pattern, because the repository stops matching reality and the next deploy overwrites the manual fix.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of GitOps Anti-Patterns from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Editing a device directly and never committing the change back is a GitOps anti-pattern, because the repository stops matching reality and the next deploy overwrites the manual fix.",
        "Committing every change with a clear message is a GitOps anti-pattern.",
        "Reviewing a pull request before merging it is a GitOps anti-pattern.",
        "Keeping configs in version control is a GitOps anti-pattern."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-gitops-m2-l8",
      "slug": "netauto-sot-gitops-m2-l8",
      "title": "Secrets in GitOps",
      "concept": "Secrets such as passwords and API tokens must never be committed to Git; they live in a secrets manager or an encrypted vault and are injected at deploy time. A secret in Git history is compromised forever, because history can be read by anyone with repository access and cannot be fully erased. The rule is simple: if it unlocks something, it does not belong in a commit.",
      "syntax": "token = os.environ[\"NETBOX_TOKEN\"]",
      "exampleCode": "import os\nprint(bool(os.environ.get(\"NETBOX_TOKEN\")))",
      "exampleLanguage": "python",
      "mistake": "Committing a real API token to the repository 'temporarily' and planning to remove it later.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Secrets in GitOps, but it does not work correctly.",
       "buggyCode": "print(\"token = 'abc123-real-token'  # TODO remove later\")",
       "fixedCode": "import os\nprint(\"token = os.environ['NETBOX_TOKEN']\")",
       "explanation": "A token committed even once lives in Git history forever; reading it from the environment keeps the secret out of every commit."
      },
      "exercise": {
       "title": "Check your understanding: Secrets in GitOps",
       "type": "multiple-choice",
       "instructions": "Which statement about Secrets in GitOps is correct?",
       "starterCode": "",
       "solution": "Secrets such as passwords and API tokens must never be committed to Git; they live in a secrets manager or an encrypted vault and are injected at deploy time.",
       "solutionExplanation": "Secrets such as passwords and API tokens must never be committed to Git; they live in a secrets manager or an encrypted vault and are injected at deploy time. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Secrets such as passwords and API tokens must never be committed to Git; they live in a secrets manager or an encrypted vault and are injected at deploy time.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Secrets in GitOps from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Secrets such as passwords and API tokens must never be committed to Git; they live in a secrets manager or an encrypted vault and are injected at deploy time.",
        "Secrets should be committed to Git so every engineer can see them.",
        "Secrets should be written directly into device configs in plain text.",
        "Secrets only matter in production, so committing them to a lab repository is safe."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-gitops-m2-l9",
      "slug": "netauto-sot-gitops-m2-l9",
      "title": "A GitOps Change Lifecycle",
      "concept": "A GitOps change lifecycle moves a change through fixed states: draft, open for review, approved, merged and deployed, with gates between each step. The state of a change is visible to the whole team, so nobody has to ask whether a change is ready or already live. A lifecycle with no visible states is a process nobody can follow.",
      "syntax": "states = [\"draft\", \"open\", \"approved\", \"merged\", \"deployed\"]",
      "exampleCode": "states = [\"draft\", \"open\", \"approved\", \"merged\", \"deployed\"]\nprint(states[0], \"->\", states[-1])",
      "exampleLanguage": "python",
      "mistake": "Skipping the review state and moving a change straight from draft to deployed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A GitOps Change Lifecycle, but it does not work correctly.",
       "buggyCode": "states = [\"draft\", \"deployed\"]\nprint(states)",
       "fixedCode": "states = [\"draft\", \"open\", \"approved\", \"merged\", \"deployed\"]\nprint(\" -> \".join(states))",
       "explanation": "Skipping review removes the only human check in the lifecycle; the states exist in order so that no change reaches deployment unreviewed."
      },
      "exercise": {
       "title": "Practise A GitOps Change Lifecycle",
       "type": "write-code",
       "instructions": "Move change PR-42 through each lifecycle state after draft, printing its state at each step, then print the final state.",
       "starterCode": "states = [\"draft\", \"open\", \"approved\", \"merged\", \"deployed\"]\nchange = {\"id\": \"PR-42\", \"state\": \"draft\"}\n# TODO: advance the change through the states and print each step.\n",
       "solution": "states = [\"draft\", \"open\", \"approved\", \"merged\", \"deployed\"]\nchange = {\"id\": \"PR-42\", \"state\": \"draft\"}\nfor nxt in states[1:]:\n    change[\"state\"] = nxt\n    print(f\"{change['id']}: {nxt}\")\nprint(f\"Final state: {change['state']}\")",
       "solutionExplanation": "The solution move change PR-42 through each lifecycle state after draft, printing its state at each step, then print the final state. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PR-42: open\nPR-42: approved\nPR-42: merged\nPR-42: deployed\nFinal state: deployed",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Final state: deployed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A GitOps Change Lifecycle is the key idea here: A GitOps change lifecycle moves a change through fixed states: draft, open for review, approved, merged and deployed, with gates between each step.",
        "approach": "Work through A GitOps Change Lifecycle step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-gitops-m2-l10",
      "slug": "netauto-sot-gitops-m2-l10",
      "title": "GitOps for a Multi-Site Network",
      "concept": "GitOps for a multi-site network plans one change per site from a single change request, so the same VLAN addition is rendered for HQ and for each branch with their own data. A per-site plan shows the blast radius before anything deploys, and a failure at one site does not block the others. One request, many sites, and a plan that names each of them is how GitOps scales.",
      "syntax": "change = {\"vlans\": [30], \"sites\": [\"hq\", \"branch-a\"]}",
      "exampleCode": "change = {\"vlans\": [30], \"sites\": [\"hq\", \"branch-a\"]}\nprint(len(change[\"sites\"]))",
      "exampleLanguage": "python",
      "mistake": "Deploying a multi-site change to every site at once with no per-site plan, so a bad render hits all sites together.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate GitOps for a Multi-Site Network, but it does not work correctly.",
       "buggyCode": "print(\"deploying VLAN 30 everywhere at once\")",
       "fixedCode": "sites = [\"hq\", \"branch-a\"]\nfor site in sites:\n    print(f\"plan {site}: add VLAN 30\")",
       "explanation": "Deploying everywhere at once turns one mistake into a multi-site outage; a per-site plan lets each site be checked and deployed on its own."
      },
      "exercise": {
       "title": "Practise GitOps for a Multi-Site Network",
       "type": "write-code",
       "instructions": "Print the per-site plan lines for the change, then print how many sites are affected.",
       "starterCode": "change = {\"vlans\": [30], \"sites\": [\"hq\", \"branch-a\"]}\n# TODO: print the plan line for each site and the affected count.\n",
       "solution": "change = {\"vlans\": [30], \"sites\": [\"hq\", \"branch-a\"]}\nfor site in sorted(change[\"sites\"]):\n    print(f\"{site}: add VLAN {change['vlans'][0]}\")\nprint(f\"Sites affected: {len(change['sites'])}\")",
       "solutionExplanation": "The solution print the per-site plan lines for the change, then print how many sites are affected. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "branch-a: add VLAN 30\nhq: add VLAN 30\nSites affected: 2",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Sites affected: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "GitOps for a Multi-Site Network is the key idea here: GitOps for a multi-site network plans one change per site from a single change request, so the same VLAN addition is rendered for HQ and for each branch with their own data.",
        "approach": "Work through GitOps for a Multi-Site Network step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Review and Merge a Network Change",
   "type": "write-code",
   "instructions": "Evaluate a pull request: run the CI gates, check for an approver who is not the author, check for open review comments, and print each gate result plus the final merge decision.",
   "starterCode": "pr = {\n    \"id\": \"PR-42\",\n    \"author\": \"ana\",\n    \"gates\": {\"syntax\": True, \"render\": True, \"validate\": True},\n    \"approvals\": [\"ben\"],\n    \"open_comments\": 0,\n}\n# TODO: evaluate every gate and print the merge decision.\n",
   "solution": "pr = {\n    \"id\": \"PR-42\",\n    \"author\": \"ana\",\n    \"gates\": {\"syntax\": True, \"render\": True, \"validate\": True},\n    \"approvals\": [\"ben\"],\n    \"open_comments\": 0,\n}\nprint(f\"{pr['id']} by {pr['author']}\")\nfor gate in sorted(pr[\"gates\"]):\n    print(f\"Gate {gate}: {'PASS' if pr['gates'][gate] else 'FAIL'}\")\nreview_ok = any(a != pr[\"author\"] for a in pr[\"approvals\"])\nprint(f\"Review approval: {'yes' if review_ok else 'no'}\")\nprint(f\"Open comments: {pr['open_comments']}\")\nmerge = all(pr[\"gates\"].values()) and review_ok and pr[\"open_comments\"] == 0\nprint(f\"Merge decision: {'MERGE' if merge else 'BLOCKED'}\")",
   "solutionExplanation": "The solution evaluate a pull request: run the CI gates, check for an approver who is not the author, check for open review comments, and print each gate result plus the final merge decision. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "PR-42 by ana\nGate render: PASS\nGate syntax: PASS\nGate validate: PASS\nReview approval: yes\nOpen comments: 0\nMerge decision: MERGE",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Merge decision: MERGE",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "GitOps for Networks capstone is the key idea here: Config as code means network configuration lives in version-controlled files, so every change is a commit with an author, a message and a history.",
    "approach": "Work through GitOps for Networks capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Review and Merge a Network Change",
   "description": "Evaluate a network pull request end to end: CI gates, independent review approval and open comments, then issue the merge decision.",
   "requirements": [
    "Run every CI gate and report each result",
    "Require an approver who is not the author",
    "Block the merge while review comments are open",
    "Print the final MERGE or BLOCKED decision with reasons"
   ],
   "rubric": [
    "Every gate result is reported by name",
    "Self-approval does not satisfy the review gate",
    "Open comments block the merge",
    "The decision follows from the gate results"
   ]
  }
 },
 {
  "id": "netauto-sot-drift",
  "slug": "netauto-sot-drift",
  "language": "python",
  "category": "devops",
  "title": "Drift Detection",
  "description": "Detect and manage configuration drift: comparing intended and running state, diffing, severity triage, drift reports, scheduled checks, false positives, remediation choices and production scanning.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Configuration drift",
   "Intended vs running state",
   "Diff-based detection",
   "Drift severity",
   "Drift reports",
   "Scheduled checks",
   "False positives",
   "Reconcile or accept",
   "Multi-device drift",
   "Production drift scanning"
  ],
  "prerequisites": [
   "netauto-sot-foundations",
   "netauto-sot-pipeline"
  ],
  "analogy": "Learning {topic} is like checking a library against its catalogue: the catalogue says what should be on the shelves, and the check finds the books that moved.",
  "modules": [
   {
    "id": "netauto-sot-drift-m1",
    "title": "Drift Detection Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-drift-m1-l1",
      "slug": "netauto-sot-drift-m1-l1",
      "title": "What Is Configuration Drift?",
      "concept": "Configuration drift is the gap between the intended state in the source of truth and the running state on a device, caused by manual edits, failed deploys or changes nobody recorded. Drift is normal in any real network; the problem is not that it happens, but that it goes unnoticed. Detecting drift early keeps small differences from becoming outages.",
      "syntax": "intended = {\"vlan 10\", \"vlan 20\"}\nactual = {\"vlan 10\", \"vlan 99\"}",
      "exampleCode": "intended = {\"vlan 10\", \"vlan 20\"}\nactual = {\"vlan 10\", \"vlan 99\"}\nprint(actual - intended)",
      "exampleLanguage": "python",
      "mistake": "Assuming a device matches the source of truth because it was configured from it once, months ago.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is Configuration Drift?, but it does not work correctly.",
       "buggyCode": "print(\"configured from source of truth in January, so it must still match\")",
       "fixedCode": "intended = {\"vlan 10\"}\nactual = {\"vlan 10\", \"vlan 99\"}\nprint(f\"drift: {actual - intended}\")",
       "explanation": "A device configured once can drift at any time through manual edits; only a fresh comparison proves it still matches."
      },
      "exercise": {
       "title": "Practise What Is Configuration Drift?",
       "type": "write-code",
       "instructions": "Compare the intended and actual config line sets, print each unexpected line, print each missing line, then print the total number of drifted lines.",
       "starterCode": "intended = {\"hostname acc-sw-01\", \"vlan 10\", \"vlan 20\"}\nactual = {\"hostname acc-sw-01\", \"vlan 10\", \"vlan 99\"}\n# TODO: print unexpected lines, missing lines, and the drift total.\n",
       "solution": "intended = {\"hostname acc-sw-01\", \"vlan 10\", \"vlan 20\"}\nactual = {\"hostname acc-sw-01\", \"vlan 10\", \"vlan 99\"}\ndrift = sorted(actual - intended)\nfor line in drift:\n    print(f\"Unexpected line: {line}\")\nmissing = sorted(intended - actual)\nfor line in missing:\n    print(f\"Missing line: {line}\")\nprint(f\"Drifted lines: {len(drift) + len(missing)}\")",
       "solutionExplanation": "The solution compare the intended and actual config line sets, print each unexpected line, print each missing line, then print the total number of drifted lines. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Unexpected line: vlan 99\nMissing line: vlan 20\nDrifted lines: 2",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Drifted lines: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Is Configuration Drift? is the key idea here: Configuration drift is the gap between the intended state in the source of truth and the running state on a device, caused by manual edits, failed deploys or changes nobody recorded.",
        "approach": "Work through What Is Configuration Drift? step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-drift-m1-l2",
      "slug": "netauto-sot-drift-m1-l2",
      "title": "Intended State vs Running State",
      "concept": "Intended state is what the source of truth says a device should be, and running state is what the device actually is right now. The two are compared line by line: lines in the running config but not the intended one are extras, and lines in the intended config but not the running one are missing. A device is in sync only when both sets are empty.",
      "syntax": "intended = [\"vlan 10\"]\nrunning = [\"vlan 10\", \"vlan 99\"]",
      "exampleCode": "intended = [\"vlan 10\"]\nrunning = [\"vlan 10\", \"vlan 99\"]\nprint([l for l in running if l not in intended])",
      "exampleLanguage": "python",
      "mistake": "Comparing only the line counts, so a config with the same number of lines but different contents looks in sync.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Intended State vs Running State, but it does not work correctly.",
       "buggyCode": "intended = [\"vlan 10\", \"vlan 20\"]\nrunning = [\"vlan 10\", \"vlan 99\"]\nprint(len(intended) == len(running))",
       "fixedCode": "intended = [\"vlan 10\", \"vlan 20\"]\nrunning = [\"vlan 10\", \"vlan 99\"]\nprint(set(intended) == set(running))",
       "explanation": "Equal line counts say nothing about content; only comparing the actual sets of lines proves the configs match."
      },
      "exercise": {
       "title": "Practise Intended State vs Running State",
       "type": "write-code",
       "instructions": "Find the lines present in the running config but not in the intended config, print how many there are, print each one, and print whether the device is in sync.",
       "starterCode": "intended = [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 20\"]\nrunning = [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 20\", \"vlan 99\"]\n# TODO: find the extra running lines and report sync status.\n",
       "solution": "intended = [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 20\"]\nrunning = [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 20\", \"vlan 99\"]\nextra = [l for l in running if l not in intended]\nprint(f\"Extra lines in running config: {len(extra)}\")\nfor l in extra:\n    print(f\"Extra: {l}\")\nprint(\"In sync: no\" if extra else \"In sync: yes\")",
       "solutionExplanation": "The solution find the lines present in the running config but not in the intended config, print how many there are, print each one, and print whether the device is in sync. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Extra lines in running config: 1\nExtra: vlan 99\nIn sync: no",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "In sync: no",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Intended State vs Running State is the key idea here: Intended state is what the source of truth says a device should be, and running state is what the device actually is right now.",
        "approach": "Work through Intended State vs Running State step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-drift-m1-l3",
      "slug": "netauto-sot-drift-m1-l3",
      "title": "Detecting Drift with Diffing",
      "concept": "Drift detection compares the intended config from the source of truth with the running config line by line, and every line that differs is reported as drift. The comparison is usually a unified diff, which shows removals and additions in context so a reviewer can judge each one. Detection runs on a schedule, not once, because drift can appear at any time.",
      "syntax": "difflib.unified_diff(intended_lines, running_lines)",
      "exampleCode": "import difflib\nprint(list(difflib.unified_diff([\"vlan 10\"], [\"vlan 20\"], lineterm=\"\")))",
      "exampleLanguage": "python",
      "mistake": "Running drift detection once after a deploy and never again, so later manual edits go unnoticed for months.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Detecting Drift with Diffing, but it does not work correctly.",
       "buggyCode": "print(\"drift check ran once after deploy\")",
       "fixedCode": "print(\"drift check runs every 24 hours\")",
       "explanation": "Drift can appear at any time after a deploy, so a one-off check proves nothing about today; detection must run on a schedule."
      },
      "exercise": {
       "title": "Check your understanding: Detecting Drift with Diffing",
       "type": "multiple-choice",
       "instructions": "Which statement about Detecting Drift with Diffing is correct?",
       "starterCode": "",
       "solution": "Drift detection compares the intended config from the source of truth with the running config line by line, and every line that differs is reported as drift.",
       "solutionExplanation": "Drift detection compares the intended config from the source of truth with the running config line by line, and every line that differs is reported as drift. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Drift detection compares the intended config from the source of truth with the running config line by line, and every line that differs is reported as drift.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Detecting Drift with Diffing from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Drift detection compares the intended config from the source of truth with the running config line by line, and every line that differs is reported as drift.",
        "Drift detection rewrites the running config to match the source of truth without reporting anything.",
        "Drift detection only counts config lines and never looks at what they say.",
        "Drift detection deletes the source of truth whenever it finds a difference."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-drift-m1-l4",
      "slug": "netauto-sot-drift-m1-l4",
      "title": "Drift Severity and Triage",
      "concept": "Not all drift is equal: an unexpected VLAN is low risk, while an unexpected routing change is high risk, so drift reports rank findings by severity before anyone acts on them. Triage means deciding which findings need action now, which can wait for the next window, and which are harmless and should be accepted into the source of truth. A report that treats every finding as an emergency is a report nobody reads.",
      "syntax": "severity = \"high\" if \"router\" in line else \"low\"",
      "exampleCode": "line = \"router bgp 65001\"\nprint(\"high\" if \"router\" in line else \"low\")",
      "exampleLanguage": "python",
      "mistake": "Treating every drift finding as equally urgent, so the team is flooded with alerts about harmless differences.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Drift Severity and Triage, but it does not work correctly.",
       "buggyCode": "findings = [\"vlan 99\", \"router bgp 65001\"]\nprint([\"urgent\"] * len(findings))",
       "fixedCode": "findings = [\"vlan 99\", \"router bgp 65001\"]\nprint([\"high\" if \"router\" in f else \"low\" for f in findings])",
       "explanation": "Routing drift and a stray VLAN carry very different risk; ranking findings by severity lets the team act on the dangerous ones first."
      },
      "exercise": {
       "title": "Check your understanding: Drift Severity and Triage",
       "type": "multiple-choice",
       "instructions": "Which statement about Drift Severity and Triage is correct?",
       "starterCode": "",
       "solution": "Not all drift is equal: an unexpected VLAN is low risk, while an unexpected routing change is high risk, so drift reports rank findings by severity before anyone acts on them.",
       "solutionExplanation": "Not all drift is equal: an unexpected VLAN is low risk, while an unexpected routing change is high risk, so drift reports rank findings by severity before anyone acts on them. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Not all drift is equal: an unexpected VLAN is low risk, while an unexpected routing change is high risk, so drift reports rank findings by severity before anyone acts on them.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Drift Severity and Triage from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Not all drift is equal: an unexpected VLAN is low risk, while an unexpected routing change is high risk, so drift reports rank findings by severity before anyone acts on them.",
        "All drift is equally severe, so every finding must trigger a full incident response.",
        "Drift severity is decided by the age of the device, not by what changed.",
        "Drift severity is irrelevant because drift never causes outages."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-drift-m1-l5",
      "slug": "netauto-sot-drift-m1-l5",
      "title": "Drift Reports",
      "concept": "A drift report summarises a detection run: how many devices were checked, how many drifted, which lines differ, and the severity of each finding. The report is written for a human to act on, so it names devices and lines precisely instead of giving a vague warning. A good report ends with the next step, whether that is reconciling a device or accepting a change into the source of truth.",
      "syntax": "report = {\"devices_checked\": 3, \"drifted\": 2}",
      "exampleCode": "report = {\"devices_checked\": 3, \"drifted\": 2}\nprint(report[\"drifted\"])",
      "exampleLanguage": "python",
      "mistake": "Writing a drift report that only says 'drift found' without naming the device or the differing lines.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Drift Reports, but it does not work correctly.",
       "buggyCode": "print(\"drift found somewhere\")",
       "fixedCode": "print(\"acc-sw-01: unexpected line 'vlan 99'\")",
       "explanation": "A report without device names and lines cannot be acted on; the report must name exactly what drifted and where."
      },
      "exercise": {
       "title": "Practise Drift Reports",
       "type": "write-code",
       "instructions": "Summarise the findings: print the total finding count, then print the count for each severity level, sorted alphabetically.",
       "starterCode": "findings = [(\"acc-sw-01\", \"high\"), (\"acc-sw-01\", \"low\"), (\"edge-rtr-01\", \"high\")]\n# TODO: print the total and the per-severity counts.\n",
       "solution": "findings = [(\"acc-sw-01\", \"high\"), (\"acc-sw-01\", \"low\"), (\"edge-rtr-01\", \"high\")]\ncounts = {}\nfor _, sev in findings:\n    counts[sev] = counts.get(sev, 0) + 1\nprint(f\"Total findings: {len(findings)}\")\nfor sev in sorted(counts):\n    print(f\"{sev}: {counts[sev]}\")",
       "solutionExplanation": "The solution summarise the findings: print the total finding count, then print the count for each severity level, sorted alphabetically. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Total findings: 3\nhigh: 2\nlow: 1",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "low: 1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Drift Reports is the key idea here: A drift report summarises a detection run: how many devices were checked, how many drifted, which lines differ, and the severity of each finding.",
        "approach": "Work through Drift Reports step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-drift-m2",
    "title": "Drift Detection in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-sot-drift-m2-l6",
      "slug": "netauto-sot-drift-m2-l6",
      "title": "Scheduled Drift Checks",
      "concept": "A scheduled drift check runs on a fixed interval, such as every 24 hours, and compares every device against the source of truth whether or not anyone changed anything. The schedule is the safety net: it catches the manual edit made at 2 a.m. that nobody remembered to record. When a check is overdue, that itself is reported, because a missed check is a blind spot.",
      "syntax": "interval_hours = 24\nlast_check_hours_ago = 26",
      "exampleCode": "interval_hours = 24\nprint(f\"check every {interval_hours} hours\")",
      "exampleLanguage": "python",
      "mistake": "Running drift checks only after an incident, when the damage is already done.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Scheduled Drift Checks, but it does not work correctly.",
       "buggyCode": "print(\"drift check runs after incidents only\")",
       "fixedCode": "print(\"drift check runs every 24 hours\")",
       "explanation": "Checking only after incidents finds drift when it is already an outage; a schedule finds it while it is still a small difference."
      },
      "exercise": {
       "title": "Practise Scheduled Drift Checks",
       "type": "write-code",
       "instructions": "Given the check interval and how long ago the last check ran, print whether the check is overdue and by how many hours, then print the interval.",
       "starterCode": "last_check_hours_ago = 26\ninterval_hours = 24\n# TODO: report whether the drift check is overdue.\n",
       "solution": "last_check_hours_ago = 26\ninterval_hours = 24\nif last_check_hours_ago > interval_hours:\n    print(f\"Drift check overdue by {last_check_hours_ago - interval_hours} hours\")\nelse:\n    print(\"Drift check up to date\")\nprint(f\"Check interval: {interval_hours} hours\")",
       "solutionExplanation": "The solution given the check interval and how long ago the last check ran, print whether the check is overdue and by how many hours, then print the interval. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Drift check overdue by 2 hours\nCheck interval: 24 hours",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Check interval: 24 hours",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Scheduled Drift Checks is the key idea here: A scheduled drift check runs on a fixed interval, such as every 24 hours, and compares every device against the source of truth whether or not anyone changed anything.",
        "approach": "Work through Scheduled Drift Checks step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-drift-m2-l7",
      "slug": "netauto-sot-drift-m2-l7",
      "title": "False Positives in Drift Detection",
      "concept": "A false positive happens when the detector flags a harmless difference, such as a reordered line or a timestamp, so good detectors normalise the config before comparing it. Normalisation sorts lines that have no meaningful order and strips volatile values such as uptime counters. Every false positive the team has to dismiss by hand makes the next real finding easier to ignore.",
      "syntax": "normalised = sorted(line for line in config if \"uptime\" not in line)",
      "exampleCode": "config = [\"vlan 10\", \"uptime is 5 days\"]\nprint([l for l in config if \"uptime\" not in l])",
      "exampleLanguage": "python",
      "mistake": "Comparing raw configs including timestamps and counters, so every run reports drift even when nothing meaningful changed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate False Positives in Drift Detection, but it does not work correctly.",
       "buggyCode": "old = [\"uptime is 5 days\"]\nnew = [\"uptime is 6 days\"]\nprint(old != new)",
       "fixedCode": "old = [\"uptime is 5 days\"]\nnew = [\"uptime is 6 days\"]\nstrip = lambda lines: [l for l in lines if \"uptime\" not in l]\nprint(strip(old) == strip(new))",
       "explanation": "Volatile lines such as uptime change on every run, so comparing them raw reports phantom drift; stripping them before comparison removes the noise."
      },
      "exercise": {
       "title": "Check your understanding: False Positives in Drift Detection",
       "type": "multiple-choice",
       "instructions": "Which statement about False Positives in Drift Detection is correct?",
       "starterCode": "",
       "solution": "A false positive happens when the detector flags a harmless difference, such as a reordered line or a timestamp, so good detectors normalise the config before comparing it.",
       "solutionExplanation": "A false positive happens when the detector flags a harmless difference, such as a reordered line or a timestamp, so good detectors normalise the config before comparing it. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A false positive happens when the detector flags a harmless difference, such as a reordered line or a timestamp, so good detectors normalise the config before comparing it.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of False Positives in Drift Detection from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A false positive happens when the detector flags a harmless difference, such as a reordered line or a timestamp, so good detectors normalise the config before comparing it.",
        "A false positive happens when the detector misses a real routing change.",
        "A false positive happens when the source of truth is deleted by accident.",
        "False positives are impossible because configs never contain timestamps."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-drift-m2-l8",
      "slug": "netauto-sot-drift-m2-l8",
      "title": "Remediation: Reconcile or Accept",
      "concept": "When drift is found, the team either reconciles the device back to the intended state or accepts the change by updating the source of truth, and silently ignoring drift is never an option. Reconciliation is right when the change was a mistake or an emergency fix that should not stay; acceptance is right when the change was deliberate and the record was simply not updated. Either way, the decision is recorded, so the next check starts from agreement.",
      "syntax": "decision = \"reconcile\" if accidental else \"accept\"",
      "exampleCode": "print(\"reconcile\" if True else \"accept\")",
      "exampleLanguage": "python",
      "mistake": "Silently ignoring a drift finding because the device 'seems to work fine'.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Remediation: Reconcile or Accept, but it does not work correctly.",
       "buggyCode": "print(\"drift found, ignoring it\")",
       "fixedCode": "print(\"drift found, reconciling device to intended state\")",
       "explanation": "Ignoring drift leaves the source of truth wrong, so every later check reports the same finding and real new drift hides among the ignored ones."
      },
      "exercise": {
       "title": "Check your understanding: Remediation: Reconcile or Accept",
       "type": "multiple-choice",
       "instructions": "Which statement about Remediation: Reconcile or Accept is correct?",
       "starterCode": "",
       "solution": "When drift is found, the team either reconciles the device back to the intended state or accepts the change by updating the source of truth, and silently ignoring drift is never an option.",
       "solutionExplanation": "When drift is found, the team either reconciles the device back to the intended state or accepts the change by updating the source of truth, and silently ignoring drift is never an option. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "When drift is found, the team either reconciles the device back to the intended state or accepts the change by updating the source of truth, and silently ignoring drift is never an option.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Remediation: Reconcile or Accept from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "When drift is found, the team either reconciles the device back to the intended state or accepts the change by updating the source of truth, and silently ignoring drift is never an option.",
        "When drift is found, the team should always delete the device and start over.",
        "When drift is found, the team should always accept it without any review.",
        "When drift is found, the team should stop running drift checks so the reports stay clean."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-drift-m2-l9",
      "slug": "netauto-sot-drift-m2-l9",
      "title": "Drift Across Many Devices",
      "concept": "Drift across many devices is summarised per device, so the report shows which devices drifted, by how many lines, and which device is worst. The per-device view lets the team prioritise: one device with twenty drifted lines matters more than twenty devices with one line each. Aggregating the counts also shows whether drift is a single incident or a pattern across the fleet.",
      "syntax": "devices = {\"acc-sw-01\": ([\"vlan 10\"], [\"vlan 10\", \"vlan 99\"])}",
      "exampleCode": "devices = {\"acc-sw-01\": ([\"vlan 10\"], [\"vlan 10\", \"vlan 99\"])} \nprint(devices[\"acc-sw-01\"])",
      "exampleLanguage": "python",
      "mistake": "Reporting only the total drifted lines across the fleet, so nobody can tell which device needs attention.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Drift Across Many Devices, but it does not work correctly.",
       "buggyCode": "print(\"total drifted lines: 3\")",
       "fixedCode": "results = {\"acc-sw-01\": 2, \"acc-sw-02\": 0}\nfor name in sorted(results):\n    print(f\"{name}: {results[name]}\")",
       "explanation": "A fleet total hides which device drifted; per-device counts show where the problem is and which device to fix first."
      },
      "exercise": {
       "title": "Practise Drift Across Many Devices",
       "type": "write-code",
       "instructions": "For each device, count the drifted lines between its intended and actual configs, print the per-device counts sorted by device, then print the total.",
       "starterCode": "devices = {\n    \"acc-sw-01\": ([\"vlan 10\"], [\"vlan 10\", \"vlan 99\"]),\n    \"acc-sw-02\": ([\"vlan 10\"], [\"vlan 10\"]),\n    \"edge-rtr-01\": ([\"router ospf 1\"], [\"router ospf 1\", \"router bgp 65001\"]),\n}\n# TODO: print per-device drift counts and the total.\n",
       "solution": "devices = {\n    \"acc-sw-01\": ([\"vlan 10\"], [\"vlan 10\", \"vlan 99\"]),\n    \"acc-sw-02\": ([\"vlan 10\"], [\"vlan 10\"]),\n    \"edge-rtr-01\": ([\"router ospf 1\"], [\"router ospf 1\", \"router bgp 65001\"]),\n}\ntotal = 0\nfor name in sorted(devices):\n    intended, actual = devices[name]\n    drift = len(set(actual) - set(intended)) + len(set(intended) - set(actual))\n    total += drift\n    print(f\"{name}: {drift} drifted lines\")\nprint(f\"Total drifted lines: {total}\")",
       "solutionExplanation": "The solution for each device, count the drifted lines between its intended and actual configs, print the per-device counts sorted by device, then print the total. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "acc-sw-01: 1 drifted lines\nacc-sw-02: 0 drifted lines\nedge-rtr-01: 1 drifted lines\nTotal drifted lines: 2",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Total drifted lines: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Drift Across Many Devices is the key idea here: Drift across many devices is summarised per device, so the report shows which devices drifted, by how many lines, and which device is worst.",
        "approach": "Work through Drift Across Many Devices step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-drift-m2-l10",
      "slug": "netauto-sot-drift-m2-l10",
      "title": "Drift Detection in Production",
      "concept": "Drift detection in production runs continuously and quietly, reporting to a dashboard instead of paging anyone for every finding, and paging only when a high-severity finding appears. The production setup separates detection from remediation: the checker only reports, and a human or a controlled job decides what to fix. A detector that auto-fixes in production is a deploy pipeline with no review.",
      "syntax": "results = {\"acc-sw-01\": 2, \"acc-sw-02\": 0, \"edge-rtr-01\": 1}",
      "exampleCode": "results = {\"acc-sw-01\": 2, \"acc-sw-02\": 0}\nprint(max(results, key=results.get))",
      "exampleLanguage": "python",
      "mistake": "Letting the drift detector automatically rewrite device configs in production with no human approval.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Drift Detection in Production, but it does not work correctly.",
       "buggyCode": "print(\"auto-fixing all drift now\")",
       "fixedCode": "print(\"drift reported; a human approves each fix\")",
       "explanation": "Auto-fixing in production deploys changes nobody reviewed, which is exactly the failure drift detection exists to prevent; detection reports, and fixes are approved."
      },
      "exercise": {
       "title": "Practise Drift Detection in Production",
       "type": "write-code",
       "instructions": "Print the scan summary: devices scanned, devices with drift, the device with the most drift, and the total drifted lines.",
       "starterCode": "results = {\"acc-sw-01\": 2, \"acc-sw-02\": 0, \"edge-rtr-01\": 1}\n# TODO: print the production drift scan summary.\n",
       "solution": "results = {\"acc-sw-01\": 2, \"acc-sw-02\": 0, \"edge-rtr-01\": 1}\nworst = max(results, key=results.get)\nprint(f\"Devices scanned: {len(results)}\")\nprint(f\"Devices with drift: {sum(1 for v in results.values() if v > 0)}\")\nprint(f\"Most drift: {worst} ({results[worst]} lines)\")\nprint(f\"Total drifted lines: {sum(results.values())}\")",
       "solutionExplanation": "The solution print the scan summary: devices scanned, devices with drift, the device with the most drift, and the total drifted lines. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Devices scanned: 3\nDevices with drift: 2\nMost drift: acc-sw-01 (2 lines)\nTotal drifted lines: 3",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Total drifted lines: 3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Drift Detection in Production is the key idea here: Drift detection in production runs continuously and quietly, reporting to a dashboard instead of paging anyone for every finding, and paging only when a high-severity finding appears.",
        "approach": "Work through Drift Detection in Production step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Build a Drift Scanner",
   "type": "write-code",
   "instructions": "Scan three devices for drift, classify each differing line as high severity when it mentions routing and low otherwise, and print a report with per-device counts, severity totals and the worst device.",
   "starterCode": "devices = {\n    \"acc-sw-01\": ([\"hostname acc-sw-01\", \"vlan 10\"], [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 99\"]),\n    \"acc-sw-02\": ([\"hostname acc-sw-02\", \"vlan 10\"], [\"hostname acc-sw-02\", \"vlan 10\"]),\n    \"edge-rtr-01\": ([\"router ospf 1\"], [\"router ospf 1\", \"router bgp 65001\"]),\n}\n# TODO: scan for drift, classify severity, and print the report.\n",
   "solution": "devices = {\n    \"acc-sw-01\": ([\"hostname acc-sw-01\", \"vlan 10\"], [\"hostname acc-sw-01\", \"vlan 10\", \"vlan 99\"]),\n    \"acc-sw-02\": ([\"hostname acc-sw-02\", \"vlan 10\"], [\"hostname acc-sw-02\", \"vlan 10\"]),\n    \"edge-rtr-01\": ([\"router ospf 1\"], [\"router ospf 1\", \"router bgp 65001\"]),\n}\nhigh = 0\nlow = 0\nworst = None\nworst_count = -1\nfor name in sorted(devices):\n    intended, actual = devices[name]\n    diff = sorted(set(actual) - set(intended)) + sorted(set(intended) - set(actual))\n    for line in diff:\n        if \"router\" in line or \"bgp\" in line or \"ospf\" in line:\n            high += 1\n        else:\n            low += 1\n    if len(diff) > worst_count:\n        worst_count = len(diff)\n        worst = name\n    print(f\"{name}: {len(diff)} drifted lines\")\nprint(f\"High severity: {high}\")\nprint(f\"Low severity: {low}\")\nprint(f\"Worst device: {worst} ({worst_count} lines)\")",
   "solutionExplanation": "The solution scan three devices for drift, classify each differing line as high severity when it mentions routing and low otherwise, and print a report with per-device counts, severity totals and the worst device. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "acc-sw-01: 1 drifted lines\nacc-sw-02: 0 drifted lines\nedge-rtr-01: 1 drifted lines\nHigh severity: 1\nLow severity: 1\nWorst device: acc-sw-01 (1 lines)",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Worst device: acc-sw-01 (1 lines)",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Drift Detection capstone is the key idea here: Configuration drift is the gap between the intended state in the source of truth and the running state on a device, caused by manual edits, failed deploys or changes nobody recorded.",
    "approach": "Work through Drift Detection capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Build a Drift Scanner",
   "description": "Build a drift scanner that compares intended and running configs for several devices, classifies findings by severity, and prints a prioritised report.",
   "requirements": [
    "Compare intended and running configs per device",
    "Classify routing drift as high severity and other drift as low",
    "Print per-device drift counts",
    "Print severity totals and name the worst device"
   ],
   "rubric": [
    "Drift counts match the line differences exactly",
    "Routing lines are classified high and VLAN lines low",
    "The worst device is the one with the most drifted lines",
    "The report is complete enough to act on"
   ]
  }
 },
 {
  "id": "netauto-sot-review",
  "slug": "netauto-sot-review",
  "language": "python",
  "category": "devops",
  "title": "Config Review Workflows",
  "description": "Run config reviews that catch real mistakes: checklists, the four-eyes principle, reading diffs, automated checks, risk scoring, review conversations, emergency changes, review metrics and blameless postmortems.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Review checklists",
   "Four-eyes principle",
   "Diff review",
   "Automated review checks",
   "Risk scoring",
   "Review comments",
   "Emergency changes",
   "Review metrics",
   "Workflow engines",
   "Blameless postmortems"
  ],
  "prerequisites": [
   "netauto-sot-foundations",
   "netauto-sot-gitops"
  ],
  "analogy": "Learning {topic} is like proofreading before publishing: the second read catches the errors the writer can no longer see, and the printed page is better for it.",
  "modules": [
   {
    "id": "netauto-sot-review-m1",
    "title": "Config Review Workflows Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-review-m1-l1",
      "slug": "netauto-sot-review-m1-l1",
      "title": "Why Review Network Changes?",
      "concept": "Review exists because a network change can take down more than the device it touches, and a second pair of eyes catches the mistake the author stopped seeing. A checklist makes the review concrete: the change needs a ticket, a description and a rollback plan before anyone approves it. Review is not distrust; it is the team protecting itself from its own typos.",
      "syntax": "checklist = [\"description\", \"ticket\", \"rollback\"]",
      "exampleCode": "change = {\"description\": \"Add VLAN 30\", \"ticket\": \"NET-123\"}\nprint(\"rollback\" in change)",
      "exampleLanguage": "python",
      "mistake": "Approving a change that has no ticket and no rollback plan because the author is in a hurry.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Why Review Network Changes?, but it does not work correctly.",
       "buggyCode": "change = {\"description\": \"Add VLAN 30\"}\nprint(\"approved\")",
       "fixedCode": "change = {\"description\": \"Add VLAN 30\", \"ticket\": \"NET-123\", \"rollback\": \"remove VLAN 30\"}\nprint(\"approved\")",
       "explanation": "A change without a ticket cannot be traced and without a rollback cannot be undone; the checklist exists to stop approvals that skip both."
      },
      "exercise": {
       "title": "Practise Why Review Network Changes?",
       "type": "write-code",
       "instructions": "Check the change against the checklist, print each missing item, then print whether the checklist is complete.",
       "starterCode": "change = {\"description\": \"Add VLAN 30\", \"ticket\": \"NET-123\", \"rollback\": \"\"}\nchecklist = [\"description\", \"ticket\", \"rollback\"]\n# TODO: print the missing checklist items and whether the checklist is complete.\n",
       "solution": "change = {\"description\": \"Add VLAN 30\", \"ticket\": \"NET-123\", \"rollback\": \"\"}\nchecklist = [\"description\", \"ticket\", \"rollback\"]\nmissing = [item for item in checklist if not change.get(item)]\nfor item in missing:\n    print(f\"Missing: {item}\")\nprint(f\"Checklist complete: {'yes' if not missing else 'no'}\")",
       "solutionExplanation": "The solution check the change against the checklist, print each missing item, then print whether the checklist is complete. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Missing: rollback\nChecklist complete: no",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Checklist complete: no",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Why Review Network Changes? is the key idea here: Review exists because a network change can take down more than the device it touches, and a second pair of eyes catches the mistake the author stopped seeing.",
        "approach": "Work through Why Review Network Changes? step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-review-m1-l2",
      "slug": "netauto-sot-review-m1-l2",
      "title": "The Four-Eyes Principle",
      "concept": "The four-eyes principle says no change goes live on the say-so of one person alone: at least one other engineer must read the change and approve it. The approver is responsible for the review, not just a rubber stamp, and their name is recorded with the change. Four eyes do not guarantee perfection, but they catch the errors one tired engineer misses at the end of a long day.",
      "syntax": "author = \"ana\"\napprovals = [\"ben\"]",
      "exampleCode": "author = \"ana\"\napprovals = [\"ben\"]\nprint(any(a != author for a in approvals))",
      "exampleLanguage": "python",
      "mistake": "Counting the author's own approval as the second pair of eyes.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The Four-Eyes Principle, but it does not work correctly.",
       "buggyCode": "author = \"ana\"\napprovals = [\"ana\", \"ben\"]\nprint(len(approvals) >= 2)",
       "fixedCode": "author = \"ana\"\napprovals = [\"ana\", \"ben\"]\nprint(len({a for a in approvals if a != author}) >= 1)",
       "explanation": "Two approvals from the same person are still one pair of eyes; the rule needs an approver who is not the author."
      },
      "exercise": {
       "title": "Practise The Four-Eyes Principle",
       "type": "write-code",
       "instructions": "Print the total approval count, the count of valid approvals from people other than the author, and whether the four-eyes rule is satisfied.",
       "starterCode": "author = \"ana\"\napprovals = [\"ben\", \"ana\"]\n# TODO: count approvals, count valid ones, and report the four-eyes result.\n",
       "solution": "author = \"ana\"\napprovals = [\"ben\", \"ana\"]\nvalid = [a for a in approvals if a != author]\nprint(f\"Approvals: {len(approvals)}\")\nprint(f\"Valid approvals: {len(valid)}\")\nprint(f\"Four-eyes satisfied: {'yes' if len(set(valid)) >= 1 else 'no'}\")",
       "solutionExplanation": "The solution print the total approval count, the count of valid approvals from people other than the author, and whether the four-eyes rule is satisfied. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Approvals: 2\nValid approvals: 1\nFour-eyes satisfied: yes",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Four-eyes satisfied: yes",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The Four-Eyes Principle is the key idea here: The four-eyes principle says no change goes live on the say-so of one person alone: at least one other engineer must read the change and approve it.",
        "approach": "Work through The Four-Eyes Principle step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-review-m1-l3",
      "slug": "netauto-sot-review-m1-l3",
      "title": "Reviewing a Config Diff",
      "concept": "Reviewing a config diff means reading the added and removed lines in order, checking each change against the ticket, and asking whether any line could break traffic before approving it. The reviewer reads the diff, not the whole config, because the diff is the change and everything else is already known good. A review that skims the diff is a review that missed the one dangerous line.",
      "syntax": "diff = [\"-vlan 20\", \"+vlan 30\"]",
      "exampleCode": "diff = [\"-vlan 20\", \"+vlan 30\"]\nprint([l for l in diff if l.startswith(\"+\")])",
      "exampleLanguage": "python",
      "mistake": "Approving a diff without reading the removed lines, so a deleted route goes unnoticed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reviewing a Config Diff, but it does not work correctly.",
       "buggyCode": "diff = [\"-router bgp 65001\", \"+vlan 30\"]\nprint([l for l in diff if l.startswith(\"+\")])",
       "fixedCode": "diff = [\"-router bgp 65001\", \"+vlan 30\"]\nprint([l for l in diff if l.startswith(\"-\")])",
       "explanation": "Removed lines are where outages hide, so a reviewer who only reads additions misses the deleted route; both sides of the diff must be read."
      },
      "exercise": {
       "title": "Check your understanding: Reviewing a Config Diff",
       "type": "multiple-choice",
       "instructions": "Which statement about Reviewing a Config Diff is correct?",
       "starterCode": "",
       "solution": "Reviewing a config diff means reading the added and removed lines in order, checking each change against the ticket, and asking whether any line could break traffic before approving it.",
       "solutionExplanation": "Reviewing a config diff means reading the added and removed lines in order, checking each change against the ticket, and asking whether any line could break traffic before approving it. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Reviewing a config diff means reading the added and removed lines in order, checking each change against the ticket, and asking whether any line could break traffic before approving it.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Reviewing a Config Diff from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Reviewing a config diff means reading the added and removed lines in order, checking each change against the ticket, and asking whether any line could break traffic before approving it.",
        "Reviewing a config diff means reading only the added lines and ignoring the removed ones.",
        "Reviewing a config diff means approving any change that touches fewer than ten lines.",
        "Reviewing a config diff means checking the author's job title instead of the change itself."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-review-m1-l4",
      "slug": "netauto-sot-review-m1-l4",
      "title": "Automated Review Checks",
      "concept": "Automated review checks lint every proposed config for required lines, banned commands and valid addresses, so reviewers spend their time on judgement calls instead of typos. The checks run on every pull request and report violations inline, which means the author can fix them before a human ever looks. Automation does not replace review; it clears the routine work out of the reviewer's way.",
      "syntax": "banned = [\"no ip routing\", \"password 7\"]",
      "exampleCode": "config = [\"hostname sw-01\", \"password 7 secret\"]\nprint([l for l in config if \"password 7\" in l])",
      "exampleLanguage": "python",
      "mistake": "Relying on automated checks alone and skipping human review, so a change that passes the linter but breaks the design still goes live.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Automated Review Checks, but it does not work correctly.",
       "buggyCode": "print(\"linter passed, deploying without review\")",
       "fixedCode": "print(\"linter passed, waiting for human review\")",
       "explanation": "A linter catches typos and banned commands, not design mistakes; automated checks prepare a change for review, they do not replace it."
      },
      "exercise": {
       "title": "Check your understanding: Automated Review Checks",
       "type": "multiple-choice",
       "instructions": "Which statement about Automated Review Checks is correct?",
       "starterCode": "",
       "solution": "Automated review checks lint every proposed config for required lines, banned commands and valid addresses, so reviewers spend their time on judgement calls instead of typos.",
       "solutionExplanation": "Automated review checks lint every proposed config for required lines, banned commands and valid addresses, so reviewers spend their time on judgement calls instead of typos. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Automated review checks lint every proposed config for required lines, banned commands and valid addresses, so reviewers spend their time on judgement calls instead of typos.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Automated Review Checks from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Automated review checks lint every proposed config for required lines, banned commands and valid addresses, so reviewers spend their time on judgement calls instead of typos.",
        "Automated review checks replace human review entirely, so no reviewer is ever needed.",
        "Automated review checks only run on changes that have already been deployed.",
        "Automated review checks approve changes based on their size, not their content."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-review-m1-l5",
      "slug": "netauto-sot-review-m1-l5",
      "title": "Risk Scoring for Changes",
      "concept": "Risk scoring turns a change into a number by weighing its features: how many devices it touches, whether it changes routing, and whether it runs during peak hours. The score bands the change as low, medium or high risk, and high-risk changes get more reviewers and a maintenance window. Scoring does not make a risky change safe; it makes the risk visible before anyone approves it.",
      "syntax": "score = 2 + 3\nband = \"high\" if score >= 5 else \"low\"",
      "exampleCode": "score = 5\nprint(\"high\" if score >= 5 else \"low\")",
      "exampleLanguage": "python",
      "mistake": "Scoring a change only by its size, so a one-line routing change looks low risk.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Risk Scoring for Changes, but it does not work correctly.",
       "buggyCode": "change = {\"lines\": 1, \"adds_routing\": True}\nprint(\"low risk\" if change[\"lines\"] < 5 else \"high risk\")",
       "fixedCode": "change = {\"lines\": 1, \"adds_routing\": True}\nscore = (3 if change[\"adds_routing\"] else 0) + (1 if change[\"lines\"] < 5 else 2)\nprint(score)",
       "explanation": "One line can remove a whole routing protocol, so size alone misleads; the score must weigh what the change does, not just how big it is."
      },
      "exercise": {
       "title": "Practise Risk Scoring for Changes",
       "type": "write-code",
       "instructions": "Compute the risk score for the change, print the score, then print its risk band.",
       "starterCode": "change = {\"devices\": 12, \"adds_routing\": True, \"peak_hours\": False}\n# TODO: score the change and print the score and band.\n",
       "solution": "change = {\"devices\": 12, \"adds_routing\": True, \"peak_hours\": False}\nscore = 0\nscore += 2 if change[\"devices\"] > 10 else 1\nscore += 3 if change[\"adds_routing\"] else 0\nscore += 2 if change[\"peak_hours\"] else 0\nband = \"high\" if score >= 5 else (\"medium\" if score >= 3 else \"low\")\nprint(f\"Risk score: {score}\")\nprint(f\"Risk band: {band}\")",
       "solutionExplanation": "The solution compute the risk score for the change, print the score, then print its risk band. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Risk score: 5\nRisk band: high",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Risk band: high",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Risk Scoring for Changes is the key idea here: Risk scoring turns a change into a number by weighing its features: how many devices it touches, whether it changes routing, and whether it runs during peak hours.",
        "approach": "Work through Risk Scoring for Changes step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-review-m2",
    "title": "Config Review Workflows in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-sot-review-m2-l6",
      "slug": "netauto-sot-review-m2-l6",
      "title": "Review Comments and Conversations",
      "concept": "Review comments are the conversation around a change: the reviewer asks a question on a specific line, the author answers or fixes it, and the thread is resolved when both agree. A change with open comments is not ready to merge, because an unanswered question is an unreviewed risk. Resolved threads stay on the pull request as the record of why a decision was made.",
      "syntax": "comments = [(\"ben\", \"resolved\"), (\"cara\", \"open\")]",
      "exampleCode": "comments = [(\"ben\", \"resolved\"), (\"cara\", \"open\")]\nprint([c for c in comments if c[1] == \"open\"])",
      "exampleLanguage": "python",
      "mistake": "Merging a pull request while review comments are still open and unanswered.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Review Comments and Conversations, but it does not work correctly.",
       "buggyCode": "comments = [(\"cara\", \"open\")]\nprint(\"merging anyway\")",
       "fixedCode": "comments = [(\"cara\", \"open\")]\nprint(\"blocked: open comments\" if any(c[1] == \"open\" for c in comments) else \"ready\")",
       "explanation": "An open comment is an unanswered question about the change; merging with open comments ships a change whose risks were never resolved."
      },
      "exercise": {
       "title": "Practise Review Comments and Conversations",
       "type": "write-code",
       "instructions": "Print the total comment count, the open comment count, and the author of each open comment.",
       "starterCode": "comments = [(\"ben\", \"resolved\"), (\"cara\", \"open\"), (\"dan\", \"open\")]\n# TODO: print the totals and who still has open comments.\n",
       "solution": "comments = [(\"ben\", \"resolved\"), (\"cara\", \"open\"), (\"dan\", \"open\")]\nopen_comments = [c for c in comments if c[1] == \"open\"]\nprint(f\"Total comments: {len(comments)}\")\nprint(f\"Open comments: {len(open_comments)}\")\nfor author, _ in open_comments:\n    print(f\"Waiting on: {author}\")",
       "solutionExplanation": "The solution print the total comment count, the open comment count, and the author of each open comment. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Total comments: 3\nOpen comments: 2\nWaiting on: cara\nWaiting on: dan",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Waiting on: dan",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Review Comments and Conversations is the key idea here: Review comments are the conversation around a change: the reviewer asks a question on a specific line, the author answers or fixes it, and the thread is resolved when both agree.",
        "approach": "Work through Review Comments and Conversations step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-review-m2-l7",
      "slug": "netauto-sot-review-m2-l7",
      "title": "Emergency Changes and Break-Glass",
      "concept": "An emergency change still gets recorded and reviewed after the fact, because break-glass access without a follow-up review leaves the network with changes nobody can explain. Break-glass means the normal gates are bypassed to restore service fast, not that the change is exempt from the process forever. The post-incident review decides whether the change stays, is reverted, or is redone properly.",
      "syntax": "emergency = {\"change\": \"removed bad route\", \"reviewed_after\": True}",
      "exampleCode": "emergency = {\"change\": \"removed bad route\", \"reviewed_after\": True}\nprint(emergency[\"reviewed_after\"])",
      "exampleLanguage": "python",
      "mistake": "Treating an emergency change as finished once the outage is over, with no record and no follow-up review.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Emergency Changes and Break-Glass, but it does not work correctly.",
       "buggyCode": "print(\"outage fixed, nothing to record\")",
       "fixedCode": "print(\"outage fixed, change recorded for post-incident review\")",
       "explanation": "An unrecorded emergency fix becomes unexplained drift the next morning; recording it and reviewing it afterwards closes the loop."
      },
      "exercise": {
       "title": "Check your understanding: Emergency Changes and Break-Glass",
       "type": "multiple-choice",
       "instructions": "Which statement about Emergency Changes and Break-Glass is correct?",
       "starterCode": "",
       "solution": "An emergency change still gets recorded and reviewed after the fact, because break-glass access without a follow-up review leaves the network with changes nobody can explain.",
       "solutionExplanation": "An emergency change still gets recorded and reviewed after the fact, because break-glass access without a follow-up review leaves the network with changes nobody can explain. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "An emergency change still gets recorded and reviewed after the fact, because break-glass access without a follow-up review leaves the network with changes nobody can explain.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Emergency Changes and Break-Glass from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "An emergency change still gets recorded and reviewed after the fact, because break-glass access without a follow-up review leaves the network with changes nobody can explain.",
        "An emergency change never needs to be recorded, because emergencies are exempt from all process.",
        "An emergency change should be made by editing the repository history to hide it.",
        "An emergency change is only allowed if it is approved in advance by three managers."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-review-m2-l8",
      "slug": "netauto-sot-review-m2-l8",
      "title": "Review Metrics",
      "concept": "Review metrics such as time-to-first-review and approval rate show whether the review process is a helpful safety net or a bottleneck that pushes engineers to skip review. A healthy process reviews quickly and approves most changes, with rejections that teach the author something. Metrics that punish reviewers for rejecting changes destroy the safety net they are meant to measure.",
      "syntax": "reviews = [{\"hours_to_review\": 2}, {\"hours_to_review\": 5}]",
      "exampleCode": "reviews = [{\"hours_to_review\": 2}, {\"hours_to_review\": 5}]\nprint(sum(r[\"hours_to_review\"] for r in reviews) / len(reviews))",
      "exampleLanguage": "python",
      "mistake": "Measuring reviewers by how fast they approve, which rewards rubber-stamping and punishes careful review.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Review Metrics, but it does not work correctly.",
       "buggyCode": "print(\"reviewer of the month: fastest approver\")",
       "fixedCode": "print(\"reviewer of the month: most useful review comments\")",
       "explanation": "Rewarding speed alone turns review into a race to approve; the metric should value useful review, not fast approval."
      },
      "exercise": {
       "title": "Check your understanding: Review Metrics",
       "type": "multiple-choice",
       "instructions": "Which statement about Review Metrics is correct?",
       "starterCode": "",
       "solution": "Review metrics such as time-to-first-review and approval rate show whether the review process is a helpful safety net or a bottleneck that pushes engineers to skip review.",
       "solutionExplanation": "Review metrics such as time-to-first-review and approval rate show whether the review process is a helpful safety net or a bottleneck that pushes engineers to skip review. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Review metrics such as time-to-first-review and approval rate show whether the review process is a helpful safety net or a bottleneck that pushes engineers to skip review.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Review Metrics from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Review metrics such as time-to-first-review and approval rate show whether the review process is a helpful safety net or a bottleneck that pushes engineers to skip review.",
        "Review metrics should reward reviewers for approving changes as fast as possible.",
        "Review metrics should count how many changes bypass review entirely.",
        "Review metrics are only useful for billing, never for improving the process."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-review-m2-l9",
      "slug": "netauto-sot-review-m2-l9",
      "title": "A Review Workflow Engine",
      "concept": "A review workflow engine moves a change through its states with code: draft to in-review, in-review to approved, approved to deployed, with each transition checking its gate. The engine enforces the order, so a change cannot jump from draft to deployed no matter who asks. State machines make the process visible and enforceable instead of a policy document nobody reads.",
      "syntax": "transitions = {\"draft\": \"in-review\", \"in-review\": \"approved\"}",
      "exampleCode": "state = \"draft\"\nprint({\"draft\": \"in-review\"}[state])",
      "exampleLanguage": "python",
      "mistake": "Allowing a change to move from any state to any other state, so draft can jump straight to deployed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Review Workflow Engine, but it does not work correctly.",
       "buggyCode": "print(\"draft -> deployed\")",
       "fixedCode": "transitions = {\"draft\": \"in-review\", \"in-review\": \"approved\", \"approved\": \"deployed\"}\nprint(transitions[\"draft\"])",
       "explanation": "Free-form transitions let a change skip review entirely; a fixed transition table enforces that every state is visited in order."
      },
      "exercise": {
       "title": "Practise A Review Workflow Engine",
       "type": "write-code",
       "instructions": "Start the change in draft, follow the transition table to the end printing each new state, then print the final state.",
       "starterCode": "transitions = {\"draft\": \"in-review\", \"in-review\": \"approved\", \"approved\": \"deployed\"}\nstate = \"draft\"\n# TODO: follow the transitions and print each state.\n",
       "solution": "transitions = {\"draft\": \"in-review\", \"in-review\": \"approved\", \"approved\": \"deployed\"}\nstate = \"draft\"\nprint(f\"Start: {state}\")\nwhile state in transitions:\n    state = transitions[state]\n    print(f\"Next: {state}\")\nprint(f\"Final state: {state}\")",
       "solutionExplanation": "The solution start the change in draft, follow the transition table to the end printing each new state, then print the final state. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Start: draft\nNext: in-review\nNext: approved\nNext: deployed\nFinal state: deployed",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Final state: deployed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Review Workflow Engine is the key idea here: A review workflow engine moves a change through its states with code: draft to in-review, in-review to approved, approved to deployed, with each transition checking its gate.",
        "approach": "Work through A Review Workflow Engine step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-review-m2-l10",
      "slug": "netauto-sot-review-m2-l10",
      "title": "Review Culture and Blameless Postmortems",
      "concept": "A blameless postmortem asks what in the process allowed a mistake, not who made it, because a culture that punishes errors teaches engineers to hide them. The postmortem records the cause, the impact and one concrete follow-up action, such as requiring review for all VLAN changes. Teams that review their failures openly make the same mistake once; teams that blame make it quietly, again and again.",
      "syntax": "incident = {\"id\": \"INC-7\", \"cause\": \"unreviewed VLAN change\"}",
      "exampleCode": "incident = {\"id\": \"INC-7\", \"cause\": \"unreviewed VLAN change\"}\nprint(incident[\"cause\"])",
      "exampleLanguage": "python",
      "mistake": "Writing a postmortem that names the engineer who made the mistake instead of the process gap that let it through.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Review Culture and Blameless Postmortems, but it does not work correctly.",
       "buggyCode": "print(\"cause: ana made a mistake\")",
       "fixedCode": "print(\"cause: VLAN changes had no review gate\")",
       "explanation": "Blaming a person ends the investigation at the first human error; asking which process gap allowed it produces a fix that protects the next engineer."
      },
      "exercise": {
       "title": "Practise Review Culture and Blameless Postmortems",
       "type": "write-code",
       "instructions": "Print the postmortem summary: the incident ID, the cause, the impact, and the follow-up action.",
       "starterCode": "incident = {\"id\": \"INC-7\", \"cause\": \"unreviewed VLAN change\", \"impact\": \"branch-a offline 20 minutes\", \"action\": \"require review for all VLAN changes\"}\n# TODO: print the postmortem summary.\n",
       "solution": "incident = {\"id\": \"INC-7\", \"cause\": \"unreviewed VLAN change\", \"impact\": \"branch-a offline 20 minutes\", \"action\": \"require review for all VLAN changes\"}\nprint(f\"Incident: {incident['id']}\")\nprint(f\"Cause: {incident['cause']}\")\nprint(f\"Impact: {incident['impact']}\")\nprint(f\"Follow-up: {incident['action']}\")",
       "solutionExplanation": "The solution print the postmortem summary: the incident ID, the cause, the impact, and the follow-up action. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Incident: INC-7\nCause: unreviewed VLAN change\nImpact: branch-a offline 20 minutes\nFollow-up: require review for all VLAN changes",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Follow-up: require review for all VLAN changes",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Review Culture and Blameless Postmortems is the key idea here: A blameless postmortem asks what in the process allowed a mistake, not who made it, because a culture that punishes errors teaches engineers to hide them.",
        "approach": "Work through Review Culture and Blameless Postmortems step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Review a Network Change End to End",
   "type": "write-code",
   "instructions": "Evaluate a change for review: compute its risk score, check the checklist, check for an independent approver, check for open comments, and print the final APPROVED or BLOCKED verdict with reasons.",
   "starterCode": "change = {\n    \"id\": \"CHG-88\",\n    \"author\": \"ana\",\n    \"devices\": 12,\n    \"adds_routing\": True,\n    \"peak_hours\": False,\n    \"checklist\": {\"description\": True, \"ticket\": True, \"rollback\": True},\n    \"approvals\": [\"ben\"],\n    \"open_comments\": 0,\n}\n# TODO: evaluate the change and print the verdict.\n",
   "solution": "change = {\n    \"id\": \"CHG-88\",\n    \"author\": \"ana\",\n    \"devices\": 12,\n    \"adds_routing\": True,\n    \"peak_hours\": False,\n    \"checklist\": {\"description\": True, \"ticket\": True, \"rollback\": True},\n    \"approvals\": [\"ben\"],\n    \"open_comments\": 0,\n}\nscore = 0\nscore += 2 if change[\"devices\"] > 10 else 1\nscore += 3 if change[\"adds_routing\"] else 0\nscore += 2 if change[\"peak_hours\"] else 0\nband = \"high\" if score >= 5 else (\"medium\" if score >= 3 else \"low\")\nprint(f\"{change['id']} by {change['author']}\")\nprint(f\"Risk score: {score} ({band})\")\nmissing = [k for k, v in change[\"checklist\"].items() if not v]\nprint(f\"Checklist complete: {'yes' if not missing else 'no'}\")\nreview_ok = any(a != change[\"author\"] for a in change[\"approvals\"])\nprint(f\"Independent approval: {'yes' if review_ok else 'no'}\")\nprint(f\"Open comments: {change['open_comments']}\")\nverdict = \"APPROVED\" if (not missing and review_ok and change[\"open_comments\"] == 0) else \"BLOCKED\"\nprint(f\"Verdict: {verdict}\")",
   "solutionExplanation": "The solution evaluate a change for review: compute its risk score, check the checklist, check for an independent approver, check for open comments, and print the final APPROVED or BLOCKED verdict with reasons. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "CHG-88 by ana\nRisk score: 5 (high)\nChecklist complete: yes\nIndependent approval: yes\nOpen comments: 0\nVerdict: APPROVED",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Verdict: APPROVED",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Config Review Workflows capstone is the key idea here: Review exists because a network change can take down more than the device it touches, and a second pair of eyes catches the mistake the author stopped seeing.",
    "approach": "Work through Config Review Workflows capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Review a Network Change End to End",
   "description": "Evaluate a network change the way a reviewer would: risk score, checklist, independent approval and open comments, then issue a verdict.",
   "requirements": [
    "Compute the risk score and band from the change features",
    "Verify the description, ticket and rollback checklist",
    "Require an approver who is not the author",
    "Block the verdict while comments are open",
    "Print APPROVED or BLOCKED with the reasons"
   ],
   "rubric": [
    "The risk score follows the stated scoring rules",
    "Every gate is reported before the verdict",
    "Self-approval does not satisfy the review gate",
    "The verdict follows from the gate results"
   ]
  }
 },
 {
  "id": "netauto-sot-ipam-dcim",
  "slug": "netauto-sot-ipam-dcim",
  "language": "python",
  "category": "devops",
  "title": "IPAM and DCIM Automation",
  "description": "Automate IP address management and data centre infrastructure: free-address allocation, subnetting, VLAN assignment, rack and power tracking, cable validation, reconciliation, DNS generation and capacity planning.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "IPAM concepts",
   "Free address allocation",
   "Subnetting",
   "VLAN assignment",
   "Rack and power tracking",
   "Cable validation",
   "IPAM reconciliation",
   "DNS generation",
   "Capacity planning",
   "Audit reports"
  ],
  "prerequisites": [
   "netauto-sot-foundations",
   "netauto-sot-netbox"
  ],
  "analogy": "Learning {topic} is like running a car park: every space is numbered, every car is recorded against its space, and the board at the entrance always shows how many spaces are left.",
  "modules": [
   {
    "id": "netauto-sot-ipam-dcim-m1",
    "title": "IPAM and DCIM Automation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-ipam-dcim-m1-l1",
      "slug": "netauto-sot-ipam-dcim-m1-l1",
      "title": "IPAM Automation Concepts",
      "concept": "IPAM automation manages the lifecycle of addresses: planning prefixes, allocating the next free address, recording who owns it, and reclaiming it when it is released. The ipaddress module does the arithmetic in Python, listing usable hosts and testing whether an address falls inside a prefix. Automation removes the spreadsheet where two engineers once allocated the same address on the same afternoon.",
      "syntax": "ipaddress.ip_network(\"10.0.0.0/29\").hosts()",
      "exampleCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.0.0.0/29\")\nprint(len(list(network.hosts())))",
      "exampleLanguage": "python",
      "mistake": "Allocating addresses by picking numbers that 'look free' instead of checking the recorded assignments.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate IPAM Automation Concepts, but it does not work correctly.",
       "buggyCode": "print(\"10.0.0.7 looks free, using it\")",
       "fixedCode": "import ipaddress\nused = {\"10.0.0.7\"}\nfree = next(str(h) for h in ipaddress.ip_network(\"10.0.0.0/29\").hosts() if str(h) not in used)\nprint(free)",
       "explanation": "An address that looks free may already be recorded as used; allocation must check the recorded assignments and pick the first genuinely free host."
      },
      "exercise": {
       "title": "Practise IPAM Automation Concepts",
       "type": "write-code",
       "instructions": "Print the network, how many usable addresses it has, and its first and last usable addresses.",
       "starterCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.0.0.0/29\")\n# TODO: print the network, usable count, first and last usable addresses.\n",
       "solution": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.0.0.0/29\")\nhosts = list(network.hosts())\nprint(f\"Network: {network}\")\nprint(f\"Usable addresses: {len(hosts)}\")\nprint(f\"First usable: {hosts[0]}\")\nprint(f\"Last usable: {hosts[-1]}\")",
       "solutionExplanation": "The solution print the network, how many usable addresses it has, and its first and last usable addresses. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Network: 10.0.0.0/29\nUsable addresses: 6\nFirst usable: 10.0.0.1\nLast usable: 10.0.0.6",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Last usable: 10.0.0.6",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "IPAM Automation Concepts is the key idea here: IPAM automation manages the lifecycle of addresses: planning prefixes, allocating the next free address, recording who owns it, and reclaiming it when it is released.",
        "approach": "Work through IPAM Automation Concepts step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-ipam-dcim-m1-l2",
      "slug": "netauto-sot-ipam-dcim-m1-l2",
      "title": "Allocating the Next Free IP",
      "concept": "Allocating the next free IP means listing the usable hosts of a prefix in order and returning the first one that is not already recorded as used. The allocation is only safe when the check and the record happen together, so the address is marked used the moment it is handed out. A free address found from a stale list is a duplicate waiting to happen.",
      "syntax": "next(str(h) for h in network.hosts() if str(h) not in used)",
      "exampleCode": "import ipaddress\nused = {\"10.1.0.1\"}\nprint(next(str(h) for h in ipaddress.ip_network(\"10.1.0.0/28\").hosts() if str(h) not in used))",
      "exampleLanguage": "python",
      "mistake": "Returning the network address or the broadcast address as a usable host.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Allocating the Next Free IP, but it does not work correctly.",
       "buggyCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.1.0.0/28\")\nprint(str(network.network_address))",
       "fixedCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.1.0.0/28\")\nprint(str(list(network.hosts())[0]))",
       "explanation": "The network and broadcast addresses cannot be assigned to a host; hosts() already excludes them, so allocation must iterate over hosts(), not over all addresses in the prefix."
      },
      "exercise": {
       "title": "Practise Allocating the Next Free IP",
       "type": "write-code",
       "instructions": "Find the first free host address in 10.1.0.0/28 given the used set, print it, and print how many addresses are already used.",
       "starterCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.1.0.0/28\")\nused = {\"10.1.0.1\", \"10.1.0.2\", \"10.1.0.3\", \"10.1.0.4\"}\n# TODO: find the first free host and print the used count.\n",
       "solution": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.1.0.0/28\")\nused = {\"10.1.0.1\", \"10.1.0.2\", \"10.1.0.3\", \"10.1.0.4\"}\nfree = next(str(h) for h in network.hosts() if str(h) not in used)\nprint(f\"Next free address: {free}\")\nprint(f\"Used addresses: {len(used)}\")",
       "solutionExplanation": "The solution find the first free host address in 10.1.0.0/28 given the used set, print it, and print how many addresses are already used. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Next free address: 10.1.0.5\nUsed addresses: 4",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Used addresses: 4",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Allocating the Next Free IP is the key idea here: Allocating the next free IP means listing the usable hosts of a prefix in order and returning the first one that is not already recorded as used.",
        "approach": "Work through Allocating the Next Free IP step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-ipam-dcim-m1-l3",
      "slug": "netauto-sot-ipam-dcim-m1-l3",
      "title": "Prefix Planning and Subnetting",
      "concept": "Subnetting splits a large prefix into smaller ones, so a /24 can become four /26 networks, and each subnet can be assigned to one site or VLAN without overlap. The subnets() method of a network object produces the smaller networks in order, and each one is a real prefix that can be recorded in IPAM. Planning prefixes on paper first is what stops two sites sharing the same addresses.",
      "syntax": "list(ipaddress.ip_network(\"10.0.0.0/24\").subnets(new_prefix=26))",
      "exampleCode": "import ipaddress\nprint(list(ipaddress.ip_network(\"10.0.0.0/24\").subnets(new_prefix=26)))",
      "exampleLanguage": "python",
      "mistake": "Carving subnets by hand with arithmetic instead of using the subnets() method, and getting a boundary wrong.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Prefix Planning and Subnetting, but it does not work correctly.",
       "buggyCode": "print([\"10.0.0.0/26\", \"10.0.0.64/26\", \"10.0.0.128/26\", \"10.0.0.192/26\"])  # hand-computed",
       "fixedCode": "import ipaddress\nprint([str(s) for s in ipaddress.ip_network(\"10.0.0.0/24\").subnets(new_prefix=26)])",
       "explanation": "Hand-computed boundaries are easy to get wrong by one address; subnets() computes the exact boundaries from the prefix length."
      },
      "exercise": {
       "title": "Check your understanding: Prefix Planning and Subnetting",
       "type": "multiple-choice",
       "instructions": "Which statement about Prefix Planning and Subnetting is correct?",
       "starterCode": "",
       "solution": "Subnetting splits a large prefix into smaller ones, so a /24 can become four /26 networks, and each subnet can be assigned to one site or VLAN without overlap.",
       "solutionExplanation": "Subnetting splits a large prefix into smaller ones, so a /24 can become four /26 networks, and each subnet can be assigned to one site or VLAN without overlap. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Subnetting splits a large prefix into smaller ones, so a /24 can become four /26 networks, and each subnet can be assigned to one site or VLAN without overlap.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Prefix Planning and Subnetting from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Subnetting splits a large prefix into smaller ones, so a /24 can become four /26 networks, and each subnet can be assigned to one site or VLAN without overlap.",
        "Subnetting merges small prefixes into one large prefix that every site shares.",
        "Subnetting assigns the same addresses to every site so they can communicate directly.",
        "Subnetting only works on IPv6 networks and has no meaning for IPv4."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-ipam-dcim-m1-l4",
      "slug": "netauto-sot-ipam-dcim-m1-l4",
      "title": "VLAN Assignment Automation",
      "concept": "VLAN assignment automation picks the next free VLAN ID from a defined pool and records it in the source of truth, so two teams never accidentally reuse the same VLAN. The pool defines the allowed range, and the assignment records the site, the purpose and the requester alongside the ID. An assigned VLAN that is not recorded is a VLAN that will be assigned twice.",
      "syntax": "pool = set(range(100, 200))\nfree = min(pool - used)",
      "exampleCode": "pool = set(range(100, 200))\nused = {100, 101}\nprint(min(pool - used))",
      "exampleLanguage": "python",
      "mistake": "Picking a VLAN ID that is already in use because the check looked at a different site's pool.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate VLAN Assignment Automation, but it does not work correctly.",
       "buggyCode": "used = {100}\nprint(102)",
       "fixedCode": "pool = set(range(100, 200))\nused = {100, 101}\nprint(min(pool - used))",
       "explanation": "Guessing an ID skips the check entirely; the assignment must subtract the used IDs for that site from the pool and take the lowest remaining one."
      },
      "exercise": {
       "title": "Check your understanding: VLAN Assignment Automation",
       "type": "multiple-choice",
       "instructions": "Which statement about VLAN Assignment Automation is correct?",
       "starterCode": "",
       "solution": "VLAN assignment automation picks the next free VLAN ID from a defined pool and records it in the source of truth, so two teams never accidentally reuse the same VLAN.",
       "solutionExplanation": "VLAN assignment automation picks the next free VLAN ID from a defined pool and records it in the source of truth, so two teams never accidentally reuse the same VLAN. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "VLAN assignment automation picks the next free VLAN ID from a defined pool and records it in the source of truth, so two teams never accidentally reuse the same VLAN.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of VLAN Assignment Automation from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "VLAN assignment automation picks the next free VLAN ID from a defined pool and records it in the source of truth, so two teams never accidentally reuse the same VLAN.",
        "VLAN assignment automation lets every team pick any ID they like without recording it.",
        "VLAN assignment automation reuses the same VLAN ID for every network in a site.",
        "VLAN assignment automation only works for VLAN 1, which is the default on every switch."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-ipam-dcim-m1-l5",
      "slug": "netauto-sot-ipam-dcim-m1-l5",
      "title": "DCIM: Racks and Power",
      "concept": "DCIM tracks the physical data centre: racks with numbered units, devices mounted in those units, and the power each device draws. A rack unit is either free or occupied, and the model refuses to mount two devices in the same unit, which is exactly the mistake a spreadsheet cannot prevent. Power totals per rack warn the team before a new device trips a breaker.",
      "syntax": "rack_units = 42\nused = {1, 2, 3}",
      "exampleCode": "rack_units = 42\nused = {1, 2, 3}\nprint([u for u in range(1, 6) if u not in used])",
      "exampleLanguage": "python",
      "mistake": "Recording a device in a rack unit that is already occupied, because the check looked at a different rack.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate DCIM: Racks and Power, but it does not work correctly.",
       "buggyCode": "used = {1, 2}\nprint(\"mounting device in unit 2\")",
       "fixedCode": "used = {1, 2}\nunit = 3\nprint(f\"mounting in unit {unit}\" if unit not in used else \"unit occupied\")",
       "explanation": "Mounting without checking the unit for that specific rack creates a physical clash; the check must test the exact rack and unit before assigning it."
      },
      "exercise": {
       "title": "Practise DCIM: Racks and Power",
       "type": "write-code",
       "instructions": "Print the rack size, the used unit count, the first free unit, and the total number of free units.",
       "starterCode": "rack_units = 42\nused = {1, 2, 3, 4, 5, 10, 11, 12}\n# TODO: report the rack capacity and the free units.\n",
       "solution": "rack_units = 42\nused = {1, 2, 3, 4, 5, 10, 11, 12}\nfree = [u for u in range(1, rack_units + 1) if u not in used]\nprint(f\"Rack units: {rack_units}\")\nprint(f\"Used units: {len(used)}\")\nprint(f\"First free unit: {free[0]}\")\nprint(f\"Free units: {len(free)}\")",
       "solutionExplanation": "The solution print the rack size, the used unit count, the first free unit, and the total number of free units. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Rack units: 42\nUsed units: 8\nFirst free unit: 6\nFree units: 34",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Free units: 34",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "DCIM: Racks and Power is the key idea here: DCIM tracks the physical data centre: racks with numbered units, devices mounted in those units, and the power each device draws.",
        "approach": "Work through DCIM: Racks and Power step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-ipam-dcim-m2",
    "title": "IPAM and DCIM Automation in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-sot-ipam-dcim-m2-l6",
      "slug": "netauto-sot-ipam-dcim-m2-l6",
      "title": "Cable and Connection Tracking",
      "concept": "Cable tracking records every physical connection as a pair of endpoints, so the team knows which switch port connects to which router port without tracing cables by hand. A cable whose far end names a device that does not exist is dangling, and the model flags it instead of letting it look connected. Accurate cable records are what make remote troubleshooting possible at all.",
      "syntax": "devices = {\"core-sw-01\", \"acc-sw-01\"}\ncables = [(\"core-sw-01\", \"acc-sw-01\")]",
      "exampleCode": "devices = {\"core-sw-01\", \"acc-sw-01\"}\ncables = [(\"core-sw-01\", \"acc-sw-01\")]\nprint(all(a in devices and b in devices for a, b in cables))",
      "exampleLanguage": "python",
      "mistake": "Recording a cable to a device that was decommissioned, so the model shows a live link to a device that no longer exists.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Cable and Connection Tracking, but it does not work correctly.",
       "buggyCode": "devices = {\"core-sw-01\"}\ncables = [(\"core-sw-01\", \"ghost-sw-99\")]\nprint(cables)",
       "fixedCode": "devices = {\"core-sw-01\"}\ncables = [(\"core-sw-01\", \"ghost-sw-99\")]\nprint([(a, b) for a, b in cables if a not in devices or b not in devices])",
       "explanation": "A cable to a missing device looks connected until someone checks; validating both endpoints against the device list flags the dangling link."
      },
      "exercise": {
       "title": "Practise Cable and Connection Tracking",
       "type": "write-code",
       "instructions": "Check each cable: print OK for cables whose both endpoints exist, and DANGLING for cables with a missing endpoint.",
       "starterCode": "devices = {\"core-sw-01\", \"acc-sw-01\", \"edge-rtr-01\"}\ncables = [(\"core-sw-01\", \"acc-sw-01\"), (\"core-sw-01\", \"ghost-sw-99\")]\n# TODO: validate each cable and print its status.\n",
       "solution": "devices = {\"core-sw-01\", \"acc-sw-01\", \"edge-rtr-01\"}\ncables = [(\"core-sw-01\", \"acc-sw-01\"), (\"core-sw-01\", \"ghost-sw-99\")]\nfor a, b in cables:\n    if a in devices and b in devices:\n        print(f\"OK: {a} <-> {b}\")\n    else:\n        print(f\"DANGLING: {a} <-> {b}\")",
       "solutionExplanation": "The solution check each cable: print OK for cables whose both endpoints exist, and DANGLING for cables with a missing endpoint. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "OK: core-sw-01 <-> acc-sw-01\nDANGLING: core-sw-01 <-> ghost-sw-99",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "DANGLING: core-sw-01 <-> ghost-sw-99",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Cable and Connection Tracking is the key idea here: Cable tracking records every physical connection as a pair of endpoints, so the team knows which switch port connects to which router port without tracing cables by hand.",
        "approach": "Work through Cable and Connection Tracking step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-ipam-dcim-m2-l7",
      "slug": "netauto-sot-ipam-dcim-m2-l7",
      "title": "IPAM Reconciliation",
      "concept": "IPAM reconciliation compares the addresses recorded in the source of truth with the addresses actually seen on the network, and any address found live but unrecorded is an orphan to investigate. Reconciliation also finds the reverse: addresses recorded as used that nothing answers on, which are candidates for reclaiming. The process keeps the record honest, because a record nobody checks rots.",
      "syntax": "live = {\"10.0.0.1\", \"10.0.0.9\"}\nrecorded = {\"10.0.0.1\"}",
      "exampleCode": "live = {\"10.0.0.1\", \"10.0.0.9\"}\nrecorded = {\"10.0.0.1\"}\nprint(live - recorded)",
      "exampleLanguage": "python",
      "mistake": "Assuming every live address is recorded, so orphans are never looked for.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate IPAM Reconciliation, but it does not work correctly.",
       "buggyCode": "print(\"all live addresses are in IPAM\")",
       "fixedCode": "live = {\"10.0.0.1\", \"10.0.0.9\"}\nrecorded = {\"10.0.0.1\"}\nprint(f\"orphans: {live - recorded}\")",
       "explanation": "Live addresses that are not recorded are orphans, and they stay invisible until someone compares the live set with the recorded set."
      },
      "exercise": {
       "title": "Check your understanding: IPAM Reconciliation",
       "type": "multiple-choice",
       "instructions": "Which statement about IPAM Reconciliation is correct?",
       "starterCode": "",
       "solution": "IPAM reconciliation compares the addresses recorded in the source of truth with the addresses actually seen on the network, and any address found live but unrecorded is an orphan to investigate.",
       "solutionExplanation": "IPAM reconciliation compares the addresses recorded in the source of truth with the addresses actually seen on the network, and any address found live but unrecorded is an orphan to investigate. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "IPAM reconciliation compares the addresses recorded in the source of truth with the addresses actually seen on the network, and any address found live but unrecorded is an orphan to investigate.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of IPAM Reconciliation from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "IPAM reconciliation compares the addresses recorded in the source of truth with the addresses actually seen on the network, and any address found live but unrecorded is an orphan to investigate.",
        "IPAM reconciliation deletes every address that is currently in use.",
        "IPAM reconciliation only checks the source of truth against itself, never against the live network.",
        "IPAM reconciliation means assigning the same address to every device so nothing can be missed."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-ipam-dcim-m2-l8",
      "slug": "netauto-sot-ipam-dcim-m2-l8",
      "title": "DNS and IPAM Together",
      "concept": "DNS records are generated from IPAM data, so when an address is allocated in the source of truth, the matching A record is created automatically and the name always resolves to the right device. Generating DNS from IPAM removes the second manual step where names and addresses drift apart. A name that resolves to a decommissioned address is the classic symptom of DNS and IPAM maintained separately.",
      "syntax": "records = {\"acc-sw-01.example.local\": \"10.0.0.11\"}",
      "exampleCode": "records = {\"acc-sw-01.example.local\": \"10.0.0.11\"}\nprint(records)",
      "exampleLanguage": "python",
      "mistake": "Maintaining DNS records by hand in a separate file, so a reallocated address keeps its old name.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate DNS and IPAM Together, but it does not work correctly.",
       "buggyCode": "print(\"acc-sw-01.example.local -> 10.0.0.99  # updated by hand\")",
       "fixedCode": "ipam = {\"acc-sw-01\": \"10.0.0.11\"}\nprint(f\"acc-sw-01.example.local -> {ipam['acc-sw-01']}\")",
       "explanation": "A hand-maintained DNS file drifts from IPAM the first time an address changes; generating the record from the IPAM entry keeps name and address in step."
      },
      "exercise": {
       "title": "Check your understanding: DNS and IPAM Together",
       "type": "multiple-choice",
       "instructions": "Which statement about DNS and IPAM Together is correct?",
       "starterCode": "",
       "solution": "DNS records are generated from IPAM data, so when an address is allocated in the source of truth, the matching A record is created automatically and the name always resolves to the right device.",
       "solutionExplanation": "DNS records are generated from IPAM data, so when an address is allocated in the source of truth, the matching A record is created automatically and the name always resolves to the right device. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "DNS records are generated from IPAM data, so when an address is allocated in the source of truth, the matching A record is created automatically and the name always resolves to the right device.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of DNS and IPAM Together from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "DNS records are generated from IPAM data, so when an address is allocated in the source of truth, the matching A record is created automatically and the name always resolves to the right device.",
        "DNS records must always be written by hand in a separate file from IPAM.",
        "DNS records and IPAM data have nothing to do with each other.",
        "DNS records should point every hostname at the same address for simplicity."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-ipam-dcim-m2-l9",
      "slug": "netauto-sot-ipam-dcim-m2-l9",
      "title": "Capacity Planning from IPAM Data",
      "concept": "Capacity planning reads utilisation from IPAM data: used addresses divided by prefix size, per prefix, with a warning when a prefix passes eighty percent. The warning comes while there is still time to plan a new prefix, not when the last address is handed out. Planning from real utilisation beats guessing, because growth is visible in the numbers before it is visible as an outage.",
      "syntax": "pct = used * 100 // size",
      "exampleCode": "used, size = 220, 256\nprint(used * 100 // size)",
      "exampleLanguage": "python",
      "mistake": "Waiting until a prefix is completely full before planning more space, so new devices cannot be added.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Capacity Planning from IPAM Data, but it does not work correctly.",
       "buggyCode": "print(\"prefix full, no addresses left\")",
       "fixedCode": "used, size = 220, 256\nprint(f\"{used * 100 // size}% used: plan a new prefix\" if used * 100 // size >= 80 else \"ok\")",
       "explanation": "At one hundred percent there is nothing left to allocate; warning at eighty percent leaves time to plan and deploy a new prefix."
      },
      "exercise": {
       "title": "Practise Capacity Planning from IPAM Data",
       "type": "write-code",
       "instructions": "For each prefix, print its utilisation percentage and whether it is OK or needs a WARNING, sorted by prefix name.",
       "starterCode": "prefixes = {\"hq-users\": (220, 256), \"branch-a\": (30, 64)}\n# TODO: print the utilisation percentage and status for each prefix.\n",
       "solution": "prefixes = {\"hq-users\": (220, 256), \"branch-a\": (30, 64)}\nfor name in sorted(prefixes):\n    used, size = prefixes[name]\n    pct = used * 100 // size\n    status = \"WARNING\" if pct >= 80 else \"OK\"\n    print(f\"{name}: {pct}% used ({status})\")",
       "solutionExplanation": "The solution for each prefix, print its utilisation percentage and whether it is OK or needs a WARNING, sorted by prefix name. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "branch-a: 46% used (OK)\nhq-users: 85% used (WARNING)",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "branch-a: 46% used (OK)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Capacity Planning from IPAM Data is the key idea here: Capacity planning reads utilisation from IPAM data: used addresses divided by prefix size, per prefix, with a warning when a prefix passes eighty percent.",
        "approach": "Work through Capacity Planning from IPAM Data step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-ipam-dcim-m2-l10",
      "slug": "netauto-sot-ipam-dcim-m2-l10",
      "title": "IPAM/DCIM Audit Report",
      "concept": "An IPAM and DCIM audit report combines the checks into one document: duplicate addresses, dangling cables, orphaned addresses and prefix utilisation, each with a pass or fail. The audit runs on a schedule, and its failures become tickets, not ignored warnings. A network that audits itself regularly is a network whose records can be believed.",
      "syntax": "duplicates = [a for a in addresses if addresses.count(a) > 1]",
      "exampleCode": "addresses = [\"10.0.0.1\", \"10.0.0.1\"]\nprint(len(set(addresses)) != len(addresses))",
      "exampleLanguage": "python",
      "mistake": "Auditing only the addresses and never the cables, so dangling connections accumulate unnoticed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate IPAM/DCIM Audit Report, but it does not work correctly.",
       "buggyCode": "print(\"audit: addresses only\")",
       "fixedCode": "print(\"audit: addresses, cables, racks and utilisation\")",
       "explanation": "An audit that checks one thing misses the failures in everything else; the report must cover addresses, cables, racks and utilisation together."
      },
      "exercise": {
       "title": "Practise IPAM/DCIM Audit Report",
       "type": "write-code",
       "instructions": "Check the address list for duplicates, print how many addresses were checked, how many duplicates were found, each duplicate, and the overall audit result.",
       "starterCode": "addresses = [\"10.0.0.1\", \"10.0.0.2\", \"10.0.0.1\"]\n# TODO: find duplicates and print the audit report.\n",
       "solution": "addresses = [\"10.0.0.1\", \"10.0.0.2\", \"10.0.0.1\"]\nduplicates = sorted({a for a in addresses if addresses.count(a) > 1})\nprint(f\"Addresses checked: {len(addresses)}\")\nprint(f\"Duplicate addresses: {len(duplicates)}\")\nfor a in duplicates:\n    print(f\"Duplicate: {a}\")\nprint(f\"Audit result: {'FAIL' if duplicates else 'PASS'}\")",
       "solutionExplanation": "The solution check the address list for duplicates, print how many addresses were checked, how many duplicates were found, each duplicate, and the overall audit result. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Addresses checked: 3\nDuplicate addresses: 1\nDuplicate: 10.0.0.1\nAudit result: FAIL",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Audit result: FAIL",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "IPAM/DCIM Audit Report is the key idea here: An IPAM and DCIM audit report combines the checks into one document: duplicate addresses, dangling cables, orphaned addresses and prefix utilisation, each with a pass or fail.",
        "approach": "Work through IPAM/DCIM Audit Report step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Run an IPAM Audit and Allocate Addresses",
   "type": "write-code",
   "instructions": "Run an IPAM audit: allocate the next free address for three new devices in 10.2.0.0/28, check the full address list for duplicates, compute prefix utilisation, and print the audit report.",
   "starterCode": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.2.0.0/28\")\nused = {\"10.2.0.1\", \"10.2.0.2\", \"10.2.0.3\"}\nnew_devices = [\"acc-sw-03\", \"acc-sw-04\", \"acc-sw-05\"]\n# TODO: allocate addresses, check duplicates, compute utilisation, print the report.\n",
   "solution": "import ipaddress\nnetwork = ipaddress.ip_network(\"10.2.0.0/28\")\nused = {\"10.2.0.1\", \"10.2.0.2\", \"10.2.0.3\"}\nnew_devices = [\"acc-sw-03\", \"acc-sw-04\", \"acc-sw-05\"]\nallocations = {}\nfor name in new_devices:\n    free = next(str(h) for h in network.hosts() if str(h) not in used)\n    allocations[name] = free\n    used.add(free)\n    print(f\"{name}: {free}\")\nall_addresses = sorted(used)\nduplicates = sorted({a for a in all_addresses if all_addresses.count(a) > 1})\nprint(f\"Duplicate addresses: {len(duplicates)}\")\nusable = len(list(network.hosts()))\npct = len(used) * 100 // usable\nprint(f\"Utilisation: {pct}% ({len(used)}/{usable})\")\nprint(f\"Audit result: {'FAIL' if duplicates else 'PASS'}\")",
   "solutionExplanation": "The solution run an IPAM audit: allocate the next free address for three new devices in 10.2.0.0/28, check the full address list for duplicates, compute prefix utilisation, and print the audit report. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "acc-sw-03: 10.2.0.4\nacc-sw-04: 10.2.0.5\nacc-sw-05: 10.2.0.6\nDuplicate addresses: 0\nUtilisation: 42% (6/14)\nAudit result: PASS",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Audit result: PASS",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "IPAM and DCIM Automation capstone is the key idea here: IPAM automation manages the lifecycle of addresses: planning prefixes, allocating the next free address, recording who owns it, and reclaiming it when it is released.",
    "approach": "Work through IPAM and DCIM Automation capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Run an IPAM Audit and Allocate Addresses",
   "description": "Allocate addresses for new devices from a prefix, verify there are no duplicates, compute utilisation, and print a complete audit report.",
   "requirements": [
    "Allocate the next free address for each new device in order",
    "Never allocate an address that is already used",
    "Check the full address list for duplicates",
    "Compute and report prefix utilisation"
   ],
   "rubric": [
    "Each new device gets the lowest free address available",
    "No address is allocated twice",
    "The duplicate check covers every address",
    "Utilisation is computed from the usable host count"
   ]
  }
 },
 {
  "id": "netauto-sot-production",
  "slug": "netauto-sot-production",
  "language": "python",
  "category": "devops",
  "title": "Production Source of Truth Operations",
  "description": "Operate a source of truth in production: component health, backups and restore, upgrades and migrations, access control and audit logs, webhooks, scaling with pagination, multi-team governance, incident response and metrics.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Production health checks",
   "Backups and restore",
   "Upgrades and migrations",
   "Access control",
   "Audit logs",
   "Webhooks",
   "Pagination at scale",
   "Multi-team governance",
   "Incident response",
   "SoT metrics"
  ],
  "prerequisites": [
   "netauto-sot-foundations",
   "netauto-sot-netbox",
   "netauto-sot-pynetbox",
   "netauto-sot-gitops",
   "netauto-sot-drift"
  ],
  "analogy": "Learning {topic} is like running a hospital: the equipment must be checked, the records must be complete, and when something goes wrong the team must know exactly what happened and who to call.",
  "modules": [
   {
    "id": "netauto-sot-production-m1",
    "title": "Production Source of Truth Operations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-sot-production-m1-l1",
      "slug": "netauto-sot-production-m1-l1",
      "title": "Running NetBox in Production",
      "concept": "Running NetBox in production means its components — database, cache, web workers and background workers — are all healthy, monitored and backed by a plan for when one fails. A health check reads each component's status and reports an overall verdict, so the team knows the source of truth is trustworthy before relying on it. A source of truth that is down is worse than no source of truth, because automation fails while everyone assumes it works.",
      "syntax": "components = {\"database\": \"ok\", \"redis\": \"ok\", \"web\": \"ok\"}",
      "exampleCode": "components = {\"database\": \"ok\", \"redis\": \"ok\"}\nprint(all(s == \"ok\" for s in components.values()))",
      "exampleLanguage": "python",
      "mistake": "Checking only the web page and assuming the database and workers are fine.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Running NetBox in Production, but it does not work correctly.",
       "buggyCode": "print(\"web page loads, NetBox is healthy\")",
       "fixedCode": "components = {\"database\": \"ok\", \"redis\": \"ok\", \"web\": \"ok\", \"worker\": \"degraded\"}\nprint(\"healthy\" if all(s == \"ok\" for s in components.values()) else \"degraded\")",
       "explanation": "A loading web page says nothing about the worker that processes webhooks; health means every component reports ok, not just the one in front of you."
      },
      "exercise": {
       "title": "Practise Running NetBox in Production",
       "type": "write-code",
       "instructions": "Print each component with its status, then print the overall status: healthy only when every component is ok.",
       "starterCode": "components = {\"database\": \"ok\", \"redis\": \"ok\", \"web\": \"ok\", \"worker\": \"degraded\"}\n# TODO: print each component status and the overall verdict.\n",
       "solution": "components = {\"database\": \"ok\", \"redis\": \"ok\", \"web\": \"ok\", \"worker\": \"degraded\"}\nbad = [c for c, s in components.items() if s != \"ok\"]\nfor name in sorted(components):\n    print(f\"{name}: {components[name]}\")\nprint(f\"Overall: {'degraded' if bad else 'healthy'}\")",
       "solutionExplanation": "The solution print each component with its status, then print the overall status: healthy only when every component is ok. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "database: ok\nredis: ok\nweb: ok\nworker: degraded\nOverall: degraded",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Overall: degraded",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Running NetBox in Production is the key idea here: Running NetBox in production means its components — database, cache, web workers and background workers — are all healthy, monitored and backed by a plan for when one fails.",
        "approach": "Work through Running NetBox in Production step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-production-m1-l2",
      "slug": "netauto-sot-production-m1-l2",
      "title": "Backups and Restore",
      "concept": "A NetBox backup captures the database, the uploaded media files and the configuration, because restoring only the database leaves a system with records pointing at files that no longer exist. Backups are verified by checking that every required piece is present, and a backup that has never been restored is a hope, not a plan. The restore test is the only proof a backup works.",
      "syntax": "required = [\"database.sql\", \"media.tar.gz\", \"config.py\"]",
      "exampleCode": "required = [\"database.sql\", \"media.tar.gz\", \"config.py\"]\npresent = {\"database.sql\"}\nprint([f for f in required if f not in present])",
      "exampleLanguage": "python",
      "mistake": "Backing up the database but not the media files, so a restore brings back records with missing attachments.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Backups and Restore, but it does not work correctly.",
       "buggyCode": "print(\"backed up database.sql\")",
       "fixedCode": "required = [\"database.sql\", \"media.tar.gz\", \"config.py\"]\nprint(f\"backing up: {', '.join(required)}\")",
       "explanation": "A database-only backup restores records that reference files that are gone; the backup must cover the database, media and configuration together."
      },
      "exercise": {
       "title": "Practise Backups and Restore",
       "type": "write-code",
       "instructions": "Check the required backup files against the files present, print each missing one, then print whether the backups are complete.",
       "starterCode": "required = [\"database.sql\", \"media.tar.gz\", \"config.py\"]\npresent = {\"database.sql\", \"media.tar.gz\"}\n# TODO: print missing backup files and whether backups are complete.\n",
       "solution": "required = [\"database.sql\", \"media.tar.gz\", \"config.py\"]\npresent = {\"database.sql\", \"media.tar.gz\"}\nmissing = [f for f in required if f not in present]\nfor f in missing:\n    print(f\"Missing backup: {f}\")\nprint(f\"Backups complete: {'yes' if not missing else 'no'}\")",
       "solutionExplanation": "The solution check the required backup files against the files present, print each missing one, then print whether the backups are complete. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Missing backup: config.py\nBackups complete: no",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Backups complete: no",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Backups and Restore is the key idea here: A NetBox backup captures the database, the uploaded media files and the configuration, because restoring only the database leaves a system with records pointing at files that no longer exist.",
        "approach": "Work through Backups and Restore step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-production-m1-l3",
      "slug": "netauto-sot-production-m1-l3",
      "title": "Upgrades and Migrations",
      "concept": "A NetBox upgrade runs database migrations that reshape stored data to the new version, so a backup is taken first and the upgrade is tested on a copy before it touches production. Migrations run in order and cannot be skipped, which is why the upgrade path matters: jumping versions can mean running dozens of migrations at once. A tested upgrade is routine; an untested one is a gamble with the source of truth.",
      "syntax": "versions = [\"4.0\", \"4.1\", \"4.2\"]",
      "exampleCode": "versions = [\"4.0\", \"4.1\", \"4.2\"]\nprint(versions.index(\"4.2\") - versions.index(\"4.0\"))",
      "exampleLanguage": "python",
      "mistake": "Upgrading production without a backup, because the upgrade 'always works'.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Upgrades and Migrations, but it does not work correctly.",
       "buggyCode": "print(\"upgrading without a backup\")",
       "fixedCode": "print(\"backup taken, upgrade tested on a copy, then upgrading\")",
       "explanation": "An upgrade that fails midway leaves a half-migrated database; the backup taken first is what makes recovery possible."
      },
      "exercise": {
       "title": "Check your understanding: Upgrades and Migrations",
       "type": "multiple-choice",
       "instructions": "Which statement about Upgrades and Migrations is correct?",
       "starterCode": "",
       "solution": "A NetBox upgrade runs database migrations that reshape stored data to the new version, so a backup is taken first and the upgrade is tested on a copy before it touches production.",
       "solutionExplanation": "A NetBox upgrade runs database migrations that reshape stored data to the new version, so a backup is taken first and the upgrade is tested on a copy before it touches production. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A NetBox upgrade runs database migrations that reshape stored data to the new version, so a backup is taken first and the upgrade is tested on a copy before it touches production.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Upgrades and Migrations from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "A NetBox upgrade runs database migrations that reshape stored data to the new version, so a backup is taken first and the upgrade is tested on a copy before it touches production.",
        "A NetBox upgrade never changes the database, so backups are unnecessary.",
        "A NetBox upgrade deletes all stored data and starts from an empty database.",
        "A NetBox upgrade can skip migrations, so the version order does not matter."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-production-m1-l4",
      "slug": "netauto-sot-production-m1-l4",
      "title": "Access Control and Audit Logs",
      "concept": "NetBox records every change in an audit log with the user, the object and the old and new values, so a bad change can be traced to its author and reversed. Access control decides who can make changes in the first place, scoping permissions by object type and tenant so a branch engineer cannot edit core devices. Logs without access control record damage; access control without logs hides it.",
      "syntax": "audit = [{\"user\": \"ana\", \"object\": \"acc-sw-01\", \"action\": \"updated\"}]",
      "exampleCode": "audit = [{\"user\": \"ana\", \"object\": \"acc-sw-01\"}, {\"user\": \"ben\", \"object\": \"core-sw-01\"}]\nprint([e for e in audit if e[\"user\"] == \"ana\"])",
      "exampleLanguage": "python",
      "mistake": "Giving every engineer full admin rights because setting up permissions 'takes too long'.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Access Control and Audit Logs, but it does not work correctly.",
       "buggyCode": "print(\"everyone is an admin\")",
       "fixedCode": "print(\"ana: read-only on core devices, edit on branch devices\")",
       "explanation": "Full admin for everyone means any mistake can touch any object; scoped permissions limit the blast radius of one engineer's error."
      },
      "exercise": {
       "title": "Check your understanding: Access Control and Audit Logs",
       "type": "multiple-choice",
       "instructions": "Which statement about Access Control and Audit Logs is correct?",
       "starterCode": "",
       "solution": "NetBox records every change in an audit log with the user, the object and the old and new values, so a bad change can be traced to its author and reversed.",
       "solutionExplanation": "NetBox records every change in an audit log with the user, the object and the old and new values, so a bad change can be traced to its author and reversed. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "NetBox records every change in an audit log with the user, the object and the old and new values, so a bad change can be traced to its author and reversed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Access Control and Audit Logs from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "NetBox records every change in an audit log with the user, the object and the old and new values, so a bad change can be traced to its author and reversed.",
        "NetBox audit logs only record logins, never changes to objects.",
        "NetBox audit logs are deleted automatically after every change.",
        "NetBox audit logs record changes but never say who made them."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-production-m1-l5",
      "slug": "netauto-sot-production-m1-l5",
      "title": "Webhooks and Event-Driven Sync",
      "concept": "A webhook is an HTTP request NetBox sends when an object changes, carrying a payload that names the event, the object and who changed it, so other systems can react without polling. Event-driven sync uses webhooks to keep monitoring, DNS or config generation up to date the moment the source of truth changes. A webhook payload is a notification about a change, not a copy of the whole database.",
      "syntax": "payload = {\"event\": \"dcim.device.updated\", \"device\": \"acc-sw-01\"}",
      "exampleCode": "payload = {\"event\": \"dcim.device.updated\", \"device\": \"acc-sw-01\"}\nprint(payload[\"event\"])",
      "exampleLanguage": "python",
      "mistake": "Polling the whole device list every minute instead of reacting to webhooks, which wastes API calls and delays every update.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Webhooks and Event-Driven Sync, but it does not work correctly.",
       "buggyCode": "print(\"polling all devices every minute\")",
       "fixedCode": "print(\"listening for webhooks on device changes\")",
       "explanation": "Polling re-reads everything to find one change; a webhook delivers exactly the change that happened, the moment it happens."
      },
      "exercise": {
       "title": "Practise Webhooks and Event-Driven Sync",
       "type": "write-code",
       "instructions": "Build the webhook payload from the change event as sorted JSON, print it, then print the event name.",
       "starterCode": "import json\nevent = {\"event\": \"dcim.device.updated\", \"object\": \"acc-sw-01\", \"user\": \"ana\"}\n# TODO: build the payload dict and print it as sorted JSON plus the event.\n",
       "solution": "import json\nevent = {\"event\": \"dcim.device.updated\", \"object\": \"acc-sw-01\", \"user\": \"ana\"}\npayload = {\"event\": event[\"event\"], \"device\": event[\"object\"], \"changed_by\": event[\"user\"]}\nprint(json.dumps(payload, sort_keys=True))\nprint(f\"Event: {event['event']}\")",
       "solutionExplanation": "The solution build the webhook payload from the change event as sorted JSON, print it, then print the event name. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\"changed_by\": \"ana\", \"device\": \"acc-sw-01\", \"event\": \"dcim.device.updated\"}\nEvent: dcim.device.updated",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Event: dcim.device.updated",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Webhooks and Event-Driven Sync is the key idea here: A webhook is an HTTP request NetBox sends when an object changes, carrying a payload that names the event, the object and who changed it, so other systems can react without polling.",
        "approach": "Work through Webhooks and Event-Driven Sync step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-sot-production-m2",
    "title": "Production Source of Truth Operations in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-sot-production-m2-l6",
      "slug": "netauto-sot-production-m2-l6",
      "title": "Scaling the Source of Truth",
      "concept": "Scaling the source of truth means the API stays fast as the inventory grows, which is achieved with pagination: the API returns objects in pages of a fixed size instead of all at once. A script that asks for everything in one request slows down as the inventory grows and can time out; a script that walks page by page stays fast at any size. Pagination is the difference between a tool that works at fifty devices and one that works at fifty thousand.",
      "syntax": "pages = (total + page_size - 1) // page_size",
      "exampleCode": "total, page_size = 120, 50\nprint((total + page_size - 1) // page_size)",
      "exampleLanguage": "python",
      "mistake": "Fetching every object in one API call and hoping the inventory never grows large enough to time out.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Scaling the Source of Truth, but it does not work correctly.",
       "buggyCode": "print(api.dcim.devices.all())",
       "fixedCode": "print(\"fetching devices page by page, 50 at a time\")",
       "explanation": "One giant fetch slows down with the inventory and can time out; paging through results keeps each request small and fast."
      },
      "exercise": {
       "title": "Practise Scaling the Source of Truth",
       "type": "write-code",
       "instructions": "Compute the pagination for 120 devices at 50 per page: print the total, the page size, the page count, and the size of the last page.",
       "starterCode": "devices = [f\"device-{i:02d}\" for i in range(1, 121)]\npage_size = 50\n# TODO: compute the page count and last page size, then print the summary.\n",
       "solution": "devices = [f\"device-{i:02d}\" for i in range(1, 121)]\npage_size = 50\npages = (len(devices) + page_size - 1) // page_size\nprint(f\"Total devices: {len(devices)}\")\nprint(f\"Page size: {page_size}\")\nprint(f\"Pages: {pages}\")\nprint(f\"Last page size: {len(devices) - page_size * (pages - 1)}\")",
       "solutionExplanation": "The solution compute the pagination for 120 devices at 50 per page: print the total, the page size, the page count, and the size of the last page. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Total devices: 120\nPage size: 50\nPages: 3\nLast page size: 20",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Last page size: 20",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Scaling the Source of Truth is the key idea here: Scaling the source of truth means the API stays fast as the inventory grows, which is achieved with pagination: the API returns objects in pages of a fixed size instead of all at once.",
        "approach": "Work through Scaling the Source of Truth step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-production-m2-l7",
      "slug": "netauto-sot-production-m2-l7",
      "title": "Multi-Team SoT Governance",
      "concept": "Multi-team governance gives each team ownership of its own objects in the source of truth, with clear rules for shared objects, so one team's change cannot silently break another team's network. Ownership is recorded on the objects themselves, and changes to shared objects need agreement from every owning team. Governance is what lets one NetBox instance serve a whole organisation instead of one team.",
      "syntax": "owners = {\"hq\": \"network-ops\", \"branch-a\": \"branch-team\"}",
      "exampleCode": "owners = {\"hq\": \"network-ops\", \"branch-a\": \"branch-team\"}\nprint(owners[\"hq\"])",
      "exampleLanguage": "python",
      "mistake": "Letting any team edit any object, so a branch change can accidentally reconfigure a core device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Multi-Team SoT Governance, but it does not work correctly.",
       "buggyCode": "print(\"everyone can edit everything\")",
       "fixedCode": "print(\"branch-team edits branch-a only; core changes need network-ops\")",
       "explanation": "Without ownership rules, one team's routine edit can break another team's network; scoping edits by owner keeps each team's blast radius inside its own objects."
      },
      "exercise": {
       "title": "Check your understanding: Multi-Team SoT Governance",
       "type": "multiple-choice",
       "instructions": "Which statement about Multi-Team SoT Governance is correct?",
       "starterCode": "",
       "solution": "Multi-team governance gives each team ownership of its own objects in the source of truth, with clear rules for shared objects, so one team's change cannot silently break another team's network.",
       "solutionExplanation": "Multi-team governance gives each team ownership of its own objects in the source of truth, with clear rules for shared objects, so one team's change cannot silently break another team's network. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Multi-team governance gives each team ownership of its own objects in the source of truth, with clear rules for shared objects, so one team's change cannot silently break another team's network.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Multi-Team SoT Governance from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Multi-team governance gives each team ownership of its own objects in the source of truth, with clear rules for shared objects, so one team's change cannot silently break another team's network.",
        "Multi-team governance means every team shares one login and one permission set.",
        "Multi-team governance means each team runs its own separate NetBox with no sharing at all.",
        "Multi-team governance means the largest team decides everything for all the others."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-production-m2-l8",
      "slug": "netauto-sot-production-m2-l8",
      "title": "Incident Response with SoT Data",
      "concept": "During an incident, the source of truth answers the blast-radius question fast — which devices share the failed circuit or prefix — because every dependency is already recorded in one place. The responder looks up the failed object, lists everything connected to it, and knows the scope before touching anything. An incident without a source of truth is a guessing game played against the clock.",
      "syntax": "affected = [d for d in devices if d[\"circuit\"] == failed_circuit]",
      "exampleCode": "devices = [{\"name\": \"sw-01\", \"circuit\": \"CIR-1001\"}]\nprint([d[\"name\"] for d in devices if d[\"circuit\"] == \"CIR-1001\"])",
      "exampleLanguage": "python",
      "mistake": "Starting an incident response by logging into devices one by one instead of asking the source of truth what is affected.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Incident Response with SoT Data, but it does not work correctly.",
       "buggyCode": "print(\"logging into each device to see what is down\")",
       "fixedCode": "print(\"querying the source of truth for everything on CIR-1001\")",
       "explanation": "Logging into devices one by one is slow and shows only one device at a time; the source of truth lists everything on the failed circuit in one query."
      },
      "exercise": {
       "title": "Check your understanding: Incident Response with SoT Data",
       "type": "multiple-choice",
       "instructions": "Which statement about Incident Response with SoT Data is correct?",
       "starterCode": "",
       "solution": "During an incident, the source of truth answers the blast-radius question fast — which devices share the failed circuit or prefix — because every dependency is already recorded in one place.",
       "solutionExplanation": "During an incident, the source of truth answers the blast-radius question fast — which devices share the failed circuit or prefix — because every dependency is already recorded in one place. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "During an incident, the source of truth answers the blast-radius question fast — which devices share the failed circuit or prefix — because every dependency is already recorded in one place.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Incident Response with SoT Data from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "During an incident, the source of truth answers the blast-radius question fast — which devices share the failed circuit or prefix — because every dependency is already recorded in one place.",
        "During an incident, the source of truth is useless because it only holds planned data, never live state.",
        "During an incident, the source of truth should be ignored until the outage is over.",
        "During an incident, the source of truth automatically fixes the failed device."
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-sot-production-m2-l9",
      "slug": "netauto-sot-production-m2-l9",
      "title": "SoT Metrics and Reporting",
      "concept": "Source of truth metrics measure the health of the record itself: what percentage of devices have complete records, how many objects lack an owner, and how long changes wait for review. Coverage below one hundred percent means automation is building on gaps, and the metric names exactly where the gaps are. A source of truth that is not measured is a source of truth that is quietly rotting.",
      "syntax": "coverage = complete * 100 // total",
      "exampleCode": "complete, total = 3, 4\nprint(complete * 100 // total)",
      "exampleLanguage": "python",
      "mistake": "Reporting only the total device count and calling it a metric, while completeness and ownership go unmeasured.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate SoT Metrics and Reporting, but it does not work correctly.",
       "buggyCode": "print(\"devices: 480\")",
       "fixedCode": "print(\"devices: 480, complete records: 96%\")",
       "explanation": "A raw count says nothing about record quality; coverage metrics show how much of the data is actually complete and trustworthy."
      },
      "exercise": {
       "title": "Practise SoT Metrics and Reporting",
       "type": "write-code",
       "instructions": "Compute the coverage: print the device count, the complete record count, and the coverage percentage.",
       "starterCode": "devices = [\n    {\"hostname\": \"a\", \"fields\": 4}, {\"hostname\": \"b\", \"fields\": 3}, {\"hostname\": \"c\", \"fields\": 4}, {\"hostname\": \"d\", \"fields\": 4},\n]\n# TODO: count complete records and print the coverage metrics.\n",
       "solution": "devices = [\n    {\"hostname\": \"a\", \"fields\": 4}, {\"hostname\": \"b\", \"fields\": 3}, {\"hostname\": \"c\", \"fields\": 4}, {\"hostname\": \"d\", \"fields\": 4},\n]\ncomplete = sum(1 for d in devices if d[\"fields\"] == 4)\npct = complete * 100 // len(devices)\nprint(f\"Devices: {len(devices)}\")\nprint(f\"Complete records: {complete}\")\nprint(f\"Coverage: {pct}%\")",
       "solutionExplanation": "The solution compute the coverage: print the device count, the complete record count, and the coverage percentage. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Devices: 4\nComplete records: 3\nCoverage: 75%",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Coverage: 75%",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "SoT Metrics and Reporting is the key idea here: Source of truth metrics measure the health of the record itself: what percentage of devices have complete records, how many objects lack an owner, and how long changes wait for review.",
        "approach": "Work through SoT Metrics and Reporting step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     },
     {
      "id": "netauto-sot-production-m2-l10",
      "slug": "netauto-sot-production-m2-l10",
      "title": "Operating SoT at Scale",
      "concept": "Operating a source of truth at scale means watching one dashboard that combines health, backups, drift and coverage, so the team sees the whole system in one glance. The dashboard is built from the same checks this track taught, run on a schedule and reported together. Scale does not change the checks; it changes how often they run and how visibly their results are shared.",
      "syntax": "stats = {\"devices\": 480, \"prefixes\": 96, \"vlans\": 210, \"drifted\": 7}",
      "exampleCode": "stats = {\"devices\": 480, \"drifted\": 7}\nprint(stats[\"drifted\"] * 100 // stats[\"devices\"])",
      "exampleLanguage": "python",
      "mistake": "Running the health, backup, drift and coverage checks by hand whenever someone remembers, so the dashboard is usually out of date.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Operating SoT at Scale, but it does not work correctly.",
       "buggyCode": "print(\"checks run when someone remembers\")",
       "fixedCode": "print(\"checks run on a schedule and feed one dashboard\")",
       "explanation": "Manual checks are forgotten under pressure; scheduled checks feeding one dashboard keep the picture current without relying on memory."
      },
      "exercise": {
       "title": "Practise Operating SoT at Scale",
       "type": "write-code",
       "instructions": "Print the operations dashboard: device, prefix and VLAN counts, devices with drift, and the drift rate as a percentage.",
       "starterCode": "stats = {\"devices\": 480, \"prefixes\": 96, \"vlans\": 210, \"drifted\": 7}\n# TODO: print the dashboard summary including the drift rate.\n",
       "solution": "stats = {\"devices\": 480, \"prefixes\": 96, \"vlans\": 210, \"drifted\": 7}\nprint(f\"Devices: {stats['devices']}\")\nprint(f\"Prefixes: {stats['prefixes']}\")\nprint(f\"VLANs: {stats['vlans']}\")\nprint(f\"Devices with drift: {stats['drifted']}\")\nprint(f\"Drift rate: {stats['drifted'] * 100 // stats['devices']}%\")",
       "solutionExplanation": "The solution print the operations dashboard: device, prefix and VLAN counts, devices with drift, and the drift rate as a percentage. It prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Devices: 480\nPrefixes: 96\nVLANs: 210\nDevices with drift: 7\nDrift rate: 1%",
         "hidden": false
        },
        {
         "name": "Output includes key result",
         "expectedContains": "Drift rate: 1%",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Operating SoT at Scale is the key idea here: Operating a source of truth at scale means watching one dashboard that combines health, backups, drift and coverage, so the team sees the whole system in one glance.",
        "approach": "Work through Operating SoT at Scale step by step, checking each intermediate result before moving on.",
        "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Write the Daily SoT Operations Report",
   "type": "write-code",
   "instructions": "Build the daily operations report: check component health, backup completeness, drift counts and record coverage, then print each section and an overall status.",
   "starterCode": "health = {\"database\": \"ok\", \"redis\": \"ok\", \"web\": \"ok\", \"worker\": \"ok\"}\nrequired_backups = [\"database.sql\", \"media.tar.gz\", \"config.py\"]\npresent_backups = {\"database.sql\", \"media.tar.gz\", \"config.py\"}\ndrift = {\"acc-sw-01\": 2, \"acc-sw-02\": 0, \"edge-rtr-01\": 0}\nrecords = [{\"hostname\": \"a\", \"fields\": 4}, {\"hostname\": \"b\", \"fields\": 4}, {\"hostname\": \"c\", \"fields\": 3}]\n# TODO: print the daily operations report with an overall status.\n",
   "solution": "health = {\"database\": \"ok\", \"redis\": \"ok\", \"web\": \"ok\", \"worker\": \"ok\"}\nrequired_backups = [\"database.sql\", \"media.tar.gz\", \"config.py\"]\npresent_backups = {\"database.sql\", \"media.tar.gz\", \"config.py\"}\ndrift = {\"acc-sw-01\": 2, \"acc-sw-02\": 0, \"edge-rtr-01\": 0}\nrecords = [{\"hostname\": \"a\", \"fields\": 4}, {\"hostname\": \"b\", \"fields\": 4}, {\"hostname\": \"c\", \"fields\": 3}]\nbad = [c for c, s in health.items() if s != \"ok\"]\nprint(f\"Health: {'healthy' if not bad else 'degraded'}\")\nmissing = [f for f in required_backups if f not in present_backups]\nprint(f\"Backups complete: {'yes' if not missing else 'no'}\")\ndrifted = sum(1 for v in drift.values() if v > 0)\nprint(f\"Devices with drift: {drifted}/{len(drift)}\")\ncomplete = sum(1 for r in records if r[\"fields\"] == 4)\nprint(f\"Record coverage: {complete * 100 // len(records)}%\")\noverall = \"GREEN\" if (not bad and not missing and drifted == 0 and complete == len(records)) else \"AMBER\"\nprint(f\"Overall status: {overall}\")",
   "solutionExplanation": "The solution build the daily operations report: check component health, backup completeness, drift counts and record coverage, then print each section and an overall status. It prints exactly the expected output.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "Health: healthy\nBackups complete: yes\nDevices with drift: 1/3\nRecord coverage: 66%\nOverall status: AMBER",
     "hidden": false
    },
    {
     "name": "Output includes key result",
     "expectedContains": "Overall status: AMBER",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Production Source of Truth Operations capstone is the key idea here: Running NetBox in production means its components — database, cache, web workers and background workers — are all healthy, monitored and backed by a plan for when one fails.",
    "approach": "Work through Production Source of Truth Operations capstone step by step, checking each intermediate result before moving on.",
    "structure": "Set up the data, apply the lesson's rule, then print the result so it can be checked line by line."
   }
  },
  "capstone": {
   "title": "Write the Daily SoT Operations Report",
   "description": "Combine health, backup, drift and coverage checks into one daily operations report with an overall status for the source of truth.",
   "requirements": [
    "Check every component's health and report the verdict",
    "Verify every required backup file is present",
    "Count devices with drift",
    "Compute record coverage",
    "Print an overall GREEN or AMBER status"
   ],
   "rubric": [
    "Every section of the report is present and correct",
    "The overall status follows from the section results",
    "Coverage is computed from complete versus total records",
    "The report names the failing area when status is AMBER"
   ]
  }
 }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
